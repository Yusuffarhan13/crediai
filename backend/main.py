from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime, timedelta
from dotenv import load_dotenv
import os
import httpx
import google.generativeai as genai
from elevenlabs import generate, save, set_api_key
import uuid
import json

# Import static data
from static_data import (
    USER_DATA, TRANSACTIONS_DATA, GOALS_DATA, 
    ACHIEVEMENTS_DATA, BANK_ACCOUNT_DATA, 
    CHAT_HISTORY_DATA, LEARNING_HUB_DATA
)

# Pydantic models
class ChatMessage(BaseModel):
    message: str
    user_id: Optional[int] = 1

class ChatResponse(BaseModel):
    response: str

class Transaction(BaseModel):
    id: Optional[int] = None
    amount: float
    category: str
    description: str
    transaction_type: str
    date: Optional[str] = None

class Goal(BaseModel):
    id: Optional[int] = None
    title: str
    target_amount: float
    current_amount: float
    deadline: str
    completed: bool

class GoalCreate(BaseModel):
    title: str
    target_amount: float
    deadline: str

class GoalUpdate(BaseModel):
    current_amount: Optional[float] = None
    completed: Optional[bool] = None

class Achievement(BaseModel):
    id: int
    title: str
    description: str
    icon: str
    points: int
    unlocked: bool
    unlocked_at: Optional[str] = None

class DashboardData(BaseModel):
    total_balance: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    recent_transactions: List[dict]
    active_goals: List[dict]
    total_points: int

class PurchaseAssistantMessage(BaseModel):
    message: str
    user_id: Optional[int] = 1

class DailySummaryRequest(BaseModel):
    user_id: Optional[int] = 1

load_dotenv()

app = FastAPI(title="CrediAI API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize APIs
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
ELEVENLABS_API_KEY = os.getenv("ELEVENLABS_API_KEY")
ELEVENLABS_VOICE_ID = os.getenv("ELEVENLABS_VOICE_ID", "21m00Tcm4TlvDq8ikWAM")
PERPLEXITY_API_KEY = os.getenv("PERPLEXITY_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
    
if ELEVENLABS_API_KEY:
    set_api_key(ELEVENLABS_API_KEY)

# In-memory storage for dynamic data
chat_history = list(CHAT_HISTORY_DATA)
transactions = list(TRANSACTIONS_DATA)
goals = list(GOALS_DATA)
achievements = list(ACHIEVEMENTS_DATA)

@app.get("/")
async def root():
    return {"message": "CrediAI API is running", "version": "1.0.0"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(chat_message: ChatMessage):
    try:
        user = USER_DATA
        
        # Create financial context for the AI
        context = f"""You're CrediAI for {user['username']}, {user['age']}yo from Sri Lanka.
        Talk like Gen Z - super short, no cap, use slang. Max 30 words per response.
        Be direct: "bet", "W", "L", "lowkey", "fr", "bussin", "mid", "slay", "ngl", "finna".
        Use emojis. Talk money in LKR. Keep it real."""
        
        if GEMINI_API_KEY:
            # Use Gemini API with 2.0 Flash model
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            full_prompt = f"{context}\n\nUser: {chat_message.message}\n\nAssistant:"
            response = model.generate_content(full_prompt)
            ai_response = response.text
        else:
            # Fallback response if no API key
            ai_response = f"Hey {user['username']}! 💰 I'm here to help you with your finances. You asked: '{chat_message.message}'. Let's talk about smart money management!"
        
        # Save to chat history
        chat_entry = {
            "id": len(chat_history) + 1,
            "message": chat_message.message,
            "response": ai_response,
            "timestamp": datetime.utcnow().isoformat()
        }
        chat_history.append(chat_entry)
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return ChatResponse(
            response="I'm having trouble connecting right now. Let me still help you with your financial questions! 🤔"
        )

@app.post("/api/voice-response")
async def voice_response_endpoint(chat_message: ChatMessage):
    try:
        # First get the chat response
        chat_response = await chat_endpoint(chat_message)
        
        # Try to generate audio, but don't fail if it doesn't work
        audio_url = None
        if ELEVENLABS_API_KEY:
            try:
                # Generate audio using ElevenLabs
                audio = generate(
                    text=chat_response.response,
                    voice=ELEVENLABS_VOICE_ID,
                    model="eleven_monolingual_v1"
                )
                
                # Save audio file
                audio_filename = f"audio_{uuid.uuid4()}.mp3"
                audio_path = f"./audio_files/{audio_filename}"
                os.makedirs("./audio_files", exist_ok=True)
                save(audio, audio_path)
                audio_url = f"/api/audio/{audio_filename}"
            except Exception as voice_error:
                print(f"Voice synthesis failed: {str(voice_error)}")
                audio_url = None
        
        return {
            "response": chat_response.response,
            "audio_url": audio_url
        }
            
    except Exception as e:
        print(f"Voice response error: {str(e)}")
        return {
            "response": "I'm here to help with your financial questions! Please try again.",
            "audio_url": None
        }

@app.get("/api/audio/{filename}")
async def get_audio(filename: str):
    audio_path = f"./audio_files/{filename}"
    if os.path.exists(audio_path):
        return FileResponse(audio_path, media_type="audio/mpeg")
    raise HTTPException(status_code=404, detail="Audio file not found")

@app.get("/api/dashboard", response_model=DashboardData)
async def get_dashboard(user_id: int = 1):
    # Calculate dashboard metrics from static data
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    
    # Filter recent transactions
    recent_transactions = []
    monthly_income = 0
    monthly_expenses = 0
    
    for t in transactions:
        trans_date = datetime.fromisoformat(t["date"])
        if trans_date >= thirty_days_ago:
            if t["transaction_type"] == "income":
                monthly_income += t["amount"]
            else:
                monthly_expenses += t["amount"]
        recent_transactions.append(t)
    
    # Sort and limit recent transactions
    recent_transactions = sorted(recent_transactions, key=lambda x: x["date"], reverse=True)[:10]
    
    total_balance = monthly_income - monthly_expenses
    savings_rate = (monthly_income - monthly_expenses) / monthly_income * 100 if monthly_income > 0 else 0
    
    # Get active goals
    active_goals = [g for g in goals if not g["completed"]]
    
    # Calculate total points from achievements
    total_points = sum(a["points"] for a in achievements if a["unlocked"])
    
    return DashboardData(
        total_balance=total_balance,
        monthly_income=monthly_income,
        monthly_expenses=monthly_expenses,
        savings_rate=round(savings_rate, 2),
        recent_transactions=recent_transactions,
        active_goals=active_goals,
        total_points=total_points
    )

@app.get("/api/transactions")
async def get_transactions(user_id: int = 1, limit: int = 50):
    sorted_transactions = sorted(transactions, key=lambda x: x["date"], reverse=True)
    return sorted_transactions[:limit]

@app.post("/api/transactions")
async def create_transaction(transaction: Transaction, user_id: int = 1):
    new_transaction = {
        "id": len(transactions) + 1,
        "amount": transaction.amount,
        "category": transaction.category,
        "description": transaction.description,
        "transaction_type": transaction.transaction_type,
        "date": transaction.date or datetime.utcnow().isoformat()
    }
    transactions.append(new_transaction)
    return new_transaction

@app.get("/api/goals")
async def get_goals(user_id: int = 1):
    return goals

@app.post("/api/goals")
async def create_goal(goal: GoalCreate, user_id: int = 1):
    new_goal = {
        "id": len(goals) + 1,
        "title": goal.title,
        "target_amount": goal.target_amount,
        "current_amount": 0,
        "deadline": goal.deadline,
        "completed": False
    }
    goals.append(new_goal)
    return new_goal

@app.put("/api/goals/{goal_id}")
async def update_goal(goal_id: int, goal_update: GoalUpdate):
    for goal in goals:
        if goal["id"] == goal_id:
            if goal_update.current_amount is not None:
                goal["current_amount"] = goal_update.current_amount
            if goal_update.completed is not None:
                goal["completed"] = goal_update.completed
            return goal
    raise HTTPException(status_code=404, detail="Goal not found")

@app.get("/api/achievements")
async def get_achievements(user_id: int = 1):
    return achievements

@app.post("/api/achievements/{achievement_id}/unlock")
async def unlock_achievement(achievement_id: int):
    for achievement in achievements:
        if achievement["id"] == achievement_id:
            if not achievement["unlocked"]:
                achievement["unlocked"] = True
                achievement["unlocked_at"] = datetime.utcnow().isoformat()
            return {"message": "Achievement unlocked!", "points": achievement["points"]}
    raise HTTPException(status_code=404, detail="Achievement not found")

@app.post("/api/daily-summary")
async def get_daily_summary(request: DailySummaryRequest):
    try:
        user = USER_DATA
        
        # Get today's transactions
        today = datetime.utcnow().date()
        today_transactions = [t for t in transactions if datetime.fromisoformat(t["date"]).date() == today]
        
        # Get active goals
        active_goals = [g for g in goals if not g["completed"]]
        
        # Create summary
        transactions_summary = ""
        if today_transactions:
            income = sum(t["amount"] for t in today_transactions if t["transaction_type"] == "income")
            expenses = sum(t["amount"] for t in today_transactions if t["transaction_type"] == "expense")
            transactions_summary = f"Today: +LKR {income:.2f} income, -LKR {expenses:.2f} expenses."
        else:
            transactions_summary = "No transactions today yet."
        
        goals_summary = f"Active goals: {len(active_goals)}." if active_goals else "No active goals."
        
        context = f"""You're CrediAI. {user['username']}'s daily vibe check. Gen Z style, max 40 words.
        
        Data: {transactions_summary} {goals_summary}
        
        Say if they're winning/losing. One tip. Use: "W", "L", "bet", "fr", "bussin". Emojis only. LKR."""
        
        if GEMINI_API_KEY:
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            response = model.generate_content(context)
            ai_summary = response.text
        else:
            ai_summary = f"Hey {user['username']}! 🌟 Your financial summary: {transactions_summary} Keep tracking your spending and stay focused on your goals! 💪"
        
        return {"summary": ai_summary}
        
    except Exception as e:
        print(f"Daily summary error: {str(e)}")
        return {"summary": "Hey! Keep up the good work with your finances today! 💪🇱🇰"}

@app.post("/api/purchase-assistant")
async def purchase_assistant(message: PurchaseAssistantMessage):
    try:
        user = USER_DATA
        
        context = f"""You're shopping plug for {user['username']}. Find cheap stuff in SL.
        
        They want: {message.message}
        
        Max 50 words. Say: cheapest option, where (Daraz/ikman), price range in LKR.
        Use: "cop this", "mid", "bussin deal", "W find". Be quick."""
        
        ai_response = ""
        
        if GEMINI_API_KEY:
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            response = model.generate_content(context)
            ai_response = response.text
        else:
            ai_response = f"Looking for {message.message}? 🛍️ Check Daraz.lk for deals around LKR 2,000-5,000. ikman.lk has used options cheaper. Local stores like Odel might have sales. Compare prices first! 💰"
        
        # Try Perplexity for live results if available
        if PERPLEXITY_API_KEY:
            try:
                headers = {
                    "Authorization": f"Bearer {PERPLEXITY_API_KEY}",
                    "Content-Type": "application/json"
                }
                data = {
                    "model": "llama-3.1-sonar-small-128k-online",
                    "messages": [
                        {
                            "role": "system",
                            "content": "Find cheap products in Sri Lanka with prices in LKR."
                        },
                        {
                            "role": "user",
                            "content": f"Find best deals for '{message.message}' in Sri Lanka."
                        }
                    ],
                    "max_tokens": 200
                }
                
                async with httpx.AsyncClient() as client:
                    perp_response = await client.post(
                        "https://api.perplexity.ai/chat/completions",
                        headers=headers,
                        json=data,
                        timeout=10.0
                    )
                    if perp_response.status_code == 200:
                        result = perp_response.json()
                        if result.get("choices"):
                            ai_response += f"\n\n🔍 Live Results:\n{result['choices'][0]['message']['content']}"
            except Exception as e:
                print(f"Perplexity error: {str(e)}")
        
        return {"response": ai_response}
        
    except Exception as e:
        print(f"Purchase assistant error: {str(e)}")
        return {"response": f"Check Daraz.lk and ikman.lk for {message.message}! Compare prices and look for discounts! 🛍️"}

@app.get("/api/bank-accounts")
async def get_bank_accounts(user_id: int = 1):
    return [BANK_ACCOUNT_DATA]

@app.post("/api/bank-accounts/{account_id}/update-balance")
async def update_bank_balance(
    account_id: int,
    amount: float,
    transaction_type: str
):
    if transaction_type == 'spend':
        if amount > BANK_ACCOUNT_DATA["daily_limit"]:
            return {"error": "Exceeds daily limit", "limit": BANK_ACCOUNT_DATA["daily_limit"]}
        if amount > BANK_ACCOUNT_DATA["balance"]:
            return {"error": "Insufficient balance", "balance": BANK_ACCOUNT_DATA["balance"]}
        BANK_ACCOUNT_DATA["balance"] -= amount
    elif transaction_type == 'save':
        if amount > BANK_ACCOUNT_DATA["balance"]:
            return {"error": "Insufficient balance to save", "balance": BANK_ACCOUNT_DATA["balance"]}
        BANK_ACCOUNT_DATA["balance"] -= amount
        BANK_ACCOUNT_DATA["savings_balance"] += amount
    
    return {
        "balance": BANK_ACCOUNT_DATA["balance"],
        "savings_balance": BANK_ACCOUNT_DATA["savings_balance"],
        "daily_limit": BANK_ACCOUNT_DATA["daily_limit"]
    }

@app.get("/api/learning-hub")
async def get_learning_hub():
    return LEARNING_HUB_DATA

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)