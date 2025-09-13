from datetime import datetime, timedelta
from database import SessionLocal, User, Transaction, Goal, Achievement, BankAccount
import random

def create_mock_data():
    db = SessionLocal()
    
    # Check if data already exists
    existing_user = db.query(User).first()
    if existing_user:
        print("Mock data already exists")
        return
    
    # Create mock user
    user = User(
        username="yusuf_farhan",
        email="yusuf.farhan@example.com",
        age=17
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    
    # Create mock transactions
    categories = ["Food", "Entertainment", "Transport", "Shopping", "Education", "Savings"]
    descriptions = {
        "Food": ["Lunch at school", "Pizza with friends", "Starbucks", "Groceries"],
        "Entertainment": ["Movie tickets", "Netflix subscription", "Video game", "Concert ticket"],
        "Transport": ["Bus pass", "Uber ride", "Gas money", "Bike repair"],
        "Shopping": ["New shoes", "School supplies", "Birthday gift", "Clothes"],
        "Education": ["Online course", "Books", "School trip", "Art supplies"],
        "Savings": ["Weekly savings", "Birthday money", "Part-time job", "Allowance"]
    }
    
    for i in range(50):
        days_ago = random.randint(0, 30)
        category = random.choice(categories)
        transaction_type = "income" if category == "Savings" and random.random() > 0.3 else "expense"
        amount = random.uniform(150, 6000) if transaction_type == "expense" else random.uniform(600, 15000)
        
        transaction = Transaction(
            user_id=user.id,
            amount=amount,
            category=category,
            description=random.choice(descriptions[category]),
            transaction_type=transaction_type,
            date=datetime.utcnow() - timedelta(days=days_ago)
        )
        db.add(transaction)
    
    # Create mock goals
    goals = [
        {"title": "New Gaming Console", "target_amount": 150000, "current_amount": 70500, "deadline": 60},
        {"title": "Summer Trip Fund", "target_amount": 300000, "current_amount": 126000, "deadline": 90},
        {"title": "Emergency Fund", "target_amount": 90000, "current_amount": 54000, "deadline": 30},
        {"title": "Birthday Gift for Mom", "target_amount": 30000, "current_amount": 22500, "deadline": 15}
    ]
    
    for goal_data in goals:
        goal = Goal(
            user_id=user.id,
            title=goal_data["title"],
            target_amount=goal_data["target_amount"],
            current_amount=goal_data["current_amount"],
            deadline=datetime.utcnow() + timedelta(days=goal_data["deadline"]),
            completed=False
        )
        db.add(goal)
    
    # Create mock achievements
    achievements = [
        {"title": "First Saver", "description": "Save your first $10", "icon": "🎯", "points": 10, "unlocked": True},
        {"title": "Budget Master", "description": "Track expenses for 7 days", "icon": "📊", "points": 25, "unlocked": True},
        {"title": "Goal Getter", "description": "Complete your first savings goal", "icon": "🏆", "points": 50, "unlocked": False},
        {"title": "Money Wise", "description": "Learn 5 financial concepts", "icon": "🧠", "points": 30, "unlocked": True},
        {"title": "Streak Keeper", "description": "Log in for 30 days straight", "icon": "🔥", "points": 100, "unlocked": False},
        {"title": "Smart Spender", "description": "Stay under budget for a month", "icon": "💰", "points": 75, "unlocked": False}
    ]
    
    for ach_data in achievements:
        achievement = Achievement(
            user_id=user.id,
            title=ach_data["title"],
            description=ach_data["description"],
            icon=ach_data["icon"],
            points=ach_data["points"],
            unlocked=ach_data["unlocked"],
            unlocked_at=datetime.utcnow() if ach_data["unlocked"] else None
        )
        db.add(achievement)
    
    # Create bank account
    bank_account = BankAccount(
        user_id=user.id,
        bank_name="HNB",
        account_type="Teen+ Card",
        card_number="****4567",
        balance=45000,
        daily_limit=10000,
        monthly_limit=150000,
        savings_balance=125000
    )
    db.add(bank_account)
    
    db.commit()
    print("Mock data created successfully")
    db.close()

if __name__ == "__main__":
    create_mock_data()