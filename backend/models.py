from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class UserBase(BaseModel):
    username: str
    email: str
    age: int

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    created_at: datetime
    
    class Config:
        from_attributes = True

class TransactionBase(BaseModel):
    amount: float
    category: str
    description: str
    transaction_type: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int
    date: datetime
    
    class Config:
        from_attributes = True

class GoalBase(BaseModel):
    title: str
    target_amount: float
    deadline: datetime

class GoalCreate(GoalBase):
    pass

class GoalUpdate(BaseModel):
    current_amount: Optional[float] = None
    completed: Optional[bool] = None

class Goal(GoalBase):
    id: int
    user_id: int
    current_amount: float
    completed: bool
    created_at: datetime
    
    class Config:
        from_attributes = True

class AchievementBase(BaseModel):
    title: str
    description: str
    icon: str
    points: int

class Achievement(AchievementBase):
    id: int
    user_id: int
    unlocked: bool
    unlocked_at: Optional[datetime]
    
    class Config:
        from_attributes = True

class ChatMessage(BaseModel):
    message: str
    user_id: Optional[int] = 1

class ChatResponse(BaseModel):
    response: str
    audio_url: Optional[str] = None

class DashboardData(BaseModel):
    total_balance: float
    monthly_income: float
    monthly_expenses: float
    savings_rate: float
    recent_transactions: List[Transaction]
    active_goals: List[Goal]
    total_points: int