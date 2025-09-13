from fastapi import FastAPI, HTTPException, Depends, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from sqlalchemy.orm import Session
from typing import List, Optional
from contextlib import asynccontextmanager
from pydantic import BaseModel
import os
import httpx
import google.generativeai as genai
from elevenlabs import generate, save, set_api_key
from datetime import datetime, timedelta
from dotenv import load_dotenv
import json
import uuid

from database import get_db, User, Transaction, Goal, Achievement, ChatHistory, BankAccount
from models import (
    ChatMessage, ChatResponse, DashboardData,
    Transaction as TransactionSchema,
    Goal as GoalSchema, GoalCreate, GoalUpdate,
    Achievement as AchievementSchema
)

class PurchaseAssistantMessage(BaseModel):
    message: str
    user_id: Optional[int] = 1

class DailySummaryRequest(BaseModel):
    user_id: Optional[int] = 1
import mock_data

load_dotenv()

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    mock_data.create_mock_data()
    yield
    # Shutdown (if needed)

app = FastAPI(title="CrediAI API", version="1.0.0", lifespan=lifespan)

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


@app.get("/")
async def root():
    return {"message": "CrediAI API is running", "version": "1.0.0"}

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(
    chat_message: ChatMessage,
    db: Session = Depends(get_db)
):
    try:
        # Get user
        user = db.query(User).filter(User.id == chat_message.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Create financial context for the AI
        context = f"""You're CrediAI for {user.username}, {user.age}yo from Sri Lanka.
        Talk like Gen Z - super short, no cap, use slang. Max 30 words per response.
        Be direct: "bet", "W", "L", "lowkey", "fr", "bussin", "mid", "slay", "ngl", "finna".
        Use emojis. Talk money in LKR. Keep it real."""
        
        if GEMINI_API_KEY:
            # Use Gemini API with 2.5 Flash model
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            full_prompt = f"{context}\n\nUser: {chat_message.message}\n\nAssistant:"
            response = model.generate_content(full_prompt)
            ai_response = response.text
        else:
            # Fallback response if no API key
            ai_response = f"Hey {user.username}! 💰 I'm here to help you with your finances. You asked: '{chat_message.message}'. Let's talk about smart money management!"
        
        # Save to chat history
        chat_history = ChatHistory(
            user_id=user.id,
            message=chat_message.message,
            response=ai_response
        )
        db.add(chat_history)
        db.commit()
        
        return ChatResponse(response=ai_response)
        
    except Exception as e:
        print(f"Chat error: {str(e)}")
        return ChatResponse(
            response="I'm having trouble connecting right now. Let me still help you with your financial questions! 🤔"
        )

@app.post("/api/voice-response")
async def voice_response_endpoint(
    chat_message: ChatMessage,
    db: Session = Depends(get_db)
):
    try:
        # First get the chat response
        chat_response = await chat_endpoint(chat_message, db)
        
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
                # Log the error but don't fail the request
                print(f"Voice synthesis failed (will continue without audio): {str(voice_error)}")
                audio_url = None
        
        return {
            "response": chat_response.response,
            "audio_url": audio_url
        }
            
    except Exception as e:
        print(f"Voice response error: {str(e)}")
        # Return a fallback response even if something fails
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
async def get_dashboard(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Calculate dashboard metrics
    transactions = db.query(Transaction).filter(Transaction.user_id == user_id).all()
    
    # Calculate totals for the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    recent_transactions = [t for t in transactions if t.date >= thirty_days_ago]
    
    monthly_income = sum(t.amount for t in recent_transactions if t.transaction_type == "income")
    monthly_expenses = sum(t.amount for t in recent_transactions if t.transaction_type == "expense")
    total_balance = monthly_income - monthly_expenses
    savings_rate = (monthly_income - monthly_expenses) / monthly_income * 100 if monthly_income > 0 else 0
    
    # Get recent transactions (last 10)
    recent = sorted(transactions, key=lambda x: x.date, reverse=True)[:10]
    
    # Get active goals
    active_goals = db.query(Goal).filter(
        Goal.user_id == user_id,
        Goal.completed == False
    ).all()
    
    # Calculate total points from achievements
    achievements = db.query(Achievement).filter(
        Achievement.user_id == user_id,
        Achievement.unlocked == True
    ).all()
    total_points = sum(a.points for a in achievements)
    
    return DashboardData(
        total_balance=total_balance,
        monthly_income=monthly_income,
        monthly_expenses=monthly_expenses,
        savings_rate=round(savings_rate, 2),
        recent_transactions=recent,
        active_goals=active_goals,
        total_points=total_points
    )

@app.get("/api/transactions", response_model=List[TransactionSchema])
async def get_transactions(
    user_id: int = 1,
    limit: int = 50,
    db: Session = Depends(get_db)
):
    transactions = db.query(Transaction).filter(
        Transaction.user_id == user_id
    ).order_by(Transaction.date.desc()).limit(limit).all()
    
    return transactions

@app.post("/api/transactions", response_model=TransactionSchema)
async def create_transaction(
    transaction: TransactionSchema,
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    db_transaction = Transaction(
        user_id=user_id,
        amount=transaction.amount,
        category=transaction.category,
        description=transaction.description,
        transaction_type=transaction.transaction_type
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    
    return db_transaction

@app.get("/api/goals", response_model=List[GoalSchema])
async def get_goals(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    goals = db.query(Goal).filter(Goal.user_id == user_id).all()
    return goals

@app.post("/api/goals", response_model=GoalSchema)
async def create_goal(
    goal: GoalCreate,
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    db_goal = Goal(
        user_id=user_id,
        title=goal.title,
        target_amount=goal.target_amount,
        deadline=goal.deadline,
        current_amount=0,
        completed=False
    )
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    
    return db_goal

@app.put("/api/goals/{goal_id}", response_model=GoalSchema)
async def update_goal(
    goal_id: int,
    goal_update: GoalUpdate,
    db: Session = Depends(get_db)
):
    goal = db.query(Goal).filter(Goal.id == goal_id).first()
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    if goal_update.current_amount is not None:
        goal.current_amount = goal_update.current_amount
    if goal_update.completed is not None:
        goal.completed = goal_update.completed
    
    db.commit()
    db.refresh(goal)
    
    return goal

@app.get("/api/achievements", response_model=List[AchievementSchema])
async def get_achievements(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    achievements = db.query(Achievement).filter(Achievement.user_id == user_id).all()
    return achievements

@app.post("/api/achievements/{achievement_id}/unlock")
async def unlock_achievement(
    achievement_id: int,
    db: Session = Depends(get_db)
):
    achievement = db.query(Achievement).filter(Achievement.id == achievement_id).first()
    if not achievement:
        raise HTTPException(status_code=404, detail="Achievement not found")
    
    if not achievement.unlocked:
        achievement.unlocked = True
        achievement.unlocked_at = datetime.utcnow()
        db.commit()
        
    return {"message": "Achievement unlocked!", "points": achievement.points}

@app.post("/api/daily-summary")
async def get_daily_summary(
    request: DailySummaryRequest,
    db: Session = Depends(get_db)
):
    try:
        user = db.query(User).filter(User.id == request.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Get today's transactions
        today = datetime.utcnow().date()
        today_transactions = db.query(Transaction).filter(
            Transaction.user_id == request.user_id,
            Transaction.date >= today
        ).all()
        
        # Get goals progress
        goals = db.query(Goal).filter(
            Goal.user_id == request.user_id,
            Goal.completed == False
        ).all()
        
        # Create context for AI
        transactions_summary = ""
        if today_transactions:
            income = sum(t.amount for t in today_transactions if t.transaction_type == "income")
            expenses = sum(t.amount for t in today_transactions if t.transaction_type == "expense")
            transactions_summary = f"Today: +LKR {income:.2f} income, -LKR {expenses:.2f} expenses. "
            transactions_summary += f"Transactions: {', '.join([f'{t.description} (LKR {t.amount})' for t in today_transactions[:3]])}"
        else:
            transactions_summary = "No transactions today yet."
        
        goals_summary = f"Active goals: {len(goals)}. " if goals else "No active goals. "
        if goals:
            closest_goal = min(goals, key=lambda g: abs(g.deadline - datetime.utcnow()))
            progress = (closest_goal.current_amount / closest_goal.target_amount) * 100
            goals_summary += f"Closest goal: {closest_goal.title} ({progress:.1f}% complete)."
        
        context = f"""You're CrediAI. {user.username}'s daily vibe check. Gen Z style, max 40 words.
        
        Data: {transactions_summary} {goals_summary}
        
        Say if they're winning/losing. One tip. Use: "W", "L", "bet", "fr", "bussin". Emojis only. LKR."""
        
        if GEMINI_API_KEY:
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            response = model.generate_content(context)
            ai_summary = response.text
        else:
            ai_summary = f"Hey {user.username}! 🌟 Your financial summary: {transactions_summary} Keep tracking your spending and stay focused on your goals! 💪 Pro tip: Every rupee saved is a rupee earned! 🇱🇰💰"
        
        return {"summary": ai_summary}
        
    except Exception as e:
        print(f"Daily summary error: {str(e)}")
        return {"summary": "Hey! Keep up the good work with your finances today! 💪🇱🇰"}

@app.post("/api/purchase-assistant")
async def purchase_assistant(
    message: PurchaseAssistantMessage,
    db: Session = Depends(get_db)
):
    try:
        user = db.query(User).filter(User.id == message.user_id).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        # Context for purchase assistant
        context = f"""You're shopping plug for {user.username}. Find cheap stuff in SL.
        
        They want: {message.message}
        
        Max 50 words. Say: cheapest option, where (Daraz/ikman), price range in LKR.
        Use: "cop this", "mid", "bussin deal", "W find". Be quick."""
        
        ai_response = ""
        
        if GEMINI_API_KEY:
            model = genai.GenerativeModel('gemini-2.0-flash-exp')
            response = model.generate_content(context)
            ai_response = response.text
        
        # Try to get additional search results from Perplexity if available
        perplexity_results = ""
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
                            "content": "You are a helpful assistant that finds cheap products and alternatives in Sri Lanka."
                        },
                        {
                            "role": "user", 
                            "content": f"Find cheap alternatives and best deals for '{message.message}' in Sri Lanka. Include online stores, local shops, and budget options with prices in LKR."
                        }
                    ],
                    "max_tokens": 500
                }
                
                async with httpx.AsyncClient() as client:
                    perplexity_response = await client.post(
                        "https://api.perplexity.ai/chat/completions",
                        headers=headers,
                        json=data,
                        timeout=10.0
                    )
                    if perplexity_response.status_code == 200:
                        result = perplexity_response.json()
                        if result.get("choices") and len(result["choices"]) > 0:
                            perplexity_results = result["choices"][0]["message"]["content"]
            except Exception as perp_error:
                print(f"Perplexity API error: {str(perp_error)}")
        
        # Combine responses
        if not ai_response and not perplexity_results:
            ai_response = f"Looking for {message.message}? 🛍️ Check out Daraz.lk, ikman.lk, and local stores like Odel, Fashion Bug for deals! Compare prices online vs in-store. Look for sales and discounts! 💰🇱🇰"
        
        combined_response = ai_response
        if perplexity_results:
            combined_response += f"\n\n🔍 **Live Search Results:**\n{perplexity_results}"
        
        return {"response": combined_response}
        
    except Exception as e:
        print(f"Purchase assistant error: {str(e)}")
        return {"response": f"I can help you find deals for {message.message}! Try checking Daraz.lk, ikman.lk, and local stores. Compare prices and look for discounts! 🛍️💰"}

@app.get("/api/bank-accounts")
async def get_bank_accounts(
    user_id: int = 1,
    db: Session = Depends(get_db)
):
    accounts = db.query(BankAccount).filter(BankAccount.user_id == user_id).all()
    return accounts

@app.post("/api/bank-accounts/{account_id}/update-balance")
async def update_bank_balance(
    account_id: int,
    amount: float,
    transaction_type: str,  # 'spend' or 'save'
    db: Session = Depends(get_db)
):
    account = db.query(BankAccount).filter(BankAccount.id == account_id).first()
    if not account:
        raise HTTPException(status_code=404, detail="Account not found")
    
    if transaction_type == 'spend':
        if amount > account.daily_limit:
            return {"error": "Exceeds daily limit", "limit": account.daily_limit}
        if amount > account.balance:
            return {"error": "Insufficient balance", "balance": account.balance}
        account.balance -= amount
    elif transaction_type == 'save':
        if amount > account.balance:
            return {"error": "Insufficient balance to save", "balance": account.balance}
        account.balance -= amount
        account.savings_balance += amount
    
    db.commit()
    return {
        "balance": account.balance,
        "savings_balance": account.savings_balance,
        "daily_limit": account.daily_limit
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)