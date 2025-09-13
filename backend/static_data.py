from datetime import datetime, timedelta

# Static user data
USER_DATA = {
    "id": 1,
    "username": "yusuf_farhan",
    "email": "yusuf.farhan@example.com",
    "age": 17,
    "credit_score": 720,
    "member_since": "2024-01-15"
}

# Static transactions data
TRANSACTIONS_DATA = [
    {"id": 1, "amount": 2500, "category": "Food", "description": "Lunch at school", "transaction_type": "expense", "date": "2024-12-13T10:30:00"},
    {"id": 2, "amount": 15000, "category": "Savings", "description": "Part-time job", "transaction_type": "income", "date": "2024-12-12T14:00:00"},
    {"id": 3, "amount": 4500, "category": "Entertainment", "description": "Movie tickets", "transaction_type": "expense", "date": "2024-12-11T19:00:00"},
    {"id": 4, "amount": 1800, "category": "Transport", "description": "Bus pass", "transaction_type": "expense", "date": "2024-12-10T08:00:00"},
    {"id": 5, "amount": 8500, "category": "Shopping", "description": "New shoes", "transaction_type": "expense", "date": "2024-12-09T16:30:00"},
    {"id": 6, "amount": 3200, "category": "Food", "description": "Pizza with friends", "transaction_type": "expense", "date": "2024-12-08T20:00:00"},
    {"id": 7, "amount": 10000, "category": "Savings", "description": "Weekly savings", "transaction_type": "income", "date": "2024-12-07T09:00:00"},
    {"id": 8, "amount": 5600, "category": "Education", "description": "Online course", "transaction_type": "expense", "date": "2024-12-06T11:00:00"},
    {"id": 9, "amount": 2100, "category": "Food", "description": "Starbucks", "transaction_type": "expense", "date": "2024-12-05T15:30:00"},
    {"id": 10, "amount": 12000, "category": "Entertainment", "description": "Concert ticket", "transaction_type": "expense", "date": "2024-12-04T18:00:00"},
    {"id": 11, "amount": 3500, "category": "Transport", "description": "Uber ride", "transaction_type": "expense", "date": "2024-12-03T22:00:00"},
    {"id": 12, "amount": 25000, "category": "Savings", "description": "Birthday money", "transaction_type": "income", "date": "2024-12-02T10:00:00"},
    {"id": 13, "amount": 6800, "category": "Shopping", "description": "School supplies", "transaction_type": "expense", "date": "2024-12-01T13:00:00"},
    {"id": 14, "amount": 1500, "category": "Food", "description": "Groceries", "transaction_type": "expense", "date": "2024-11-30T17:00:00"},
    {"id": 15, "amount": 4200, "category": "Entertainment", "description": "Netflix subscription", "transaction_type": "expense", "date": "2024-11-29T12:00:00"},
    {"id": 16, "amount": 8000, "category": "Savings", "description": "Allowance", "transaction_type": "income", "date": "2024-11-28T09:00:00"},
    {"id": 17, "amount": 3600, "category": "Education", "description": "Books", "transaction_type": "expense", "date": "2024-11-27T14:30:00"},
    {"id": 18, "amount": 2800, "category": "Food", "description": "Lunch at school", "transaction_type": "expense", "date": "2024-11-26T12:30:00"},
    {"id": 19, "amount": 9500, "category": "Shopping", "description": "Birthday gift", "transaction_type": "expense", "date": "2024-11-25T16:00:00"},
    {"id": 20, "amount": 1900, "category": "Transport", "description": "Gas money", "transaction_type": "expense", "date": "2024-11-24T08:30:00"},
    {"id": 21, "amount": 15000, "category": "Savings", "description": "Part-time job", "transaction_type": "income", "date": "2024-11-23T15:00:00"},
    {"id": 22, "amount": 5200, "category": "Entertainment", "description": "Video game", "transaction_type": "expense", "date": "2024-11-22T19:00:00"},
    {"id": 23, "amount": 3100, "category": "Food", "description": "Pizza with friends", "transaction_type": "expense", "date": "2024-11-21T20:30:00"},
    {"id": 24, "amount": 7500, "category": "Shopping", "description": "Clothes", "transaction_type": "expense", "date": "2024-11-20T14:00:00"},
    {"id": 25, "amount": 2400, "category": "Transport", "description": "Bike repair", "transaction_type": "expense", "date": "2024-11-19T10:00:00"},
    {"id": 26, "amount": 10000, "category": "Savings", "description": "Weekly savings", "transaction_type": "income", "date": "2024-11-18T09:00:00"},
    {"id": 27, "amount": 4800, "category": "Education", "description": "School trip", "transaction_type": "expense", "date": "2024-11-17T11:00:00"},
    {"id": 28, "amount": 2200, "category": "Food", "description": "Starbucks", "transaction_type": "expense", "date": "2024-11-16T15:00:00"},
    {"id": 29, "amount": 6500, "category": "Entertainment", "description": "Movie tickets", "transaction_type": "expense", "date": "2024-11-15T19:30:00"},
    {"id": 30, "amount": 3300, "category": "Shopping", "description": "School supplies", "transaction_type": "expense", "date": "2024-11-14T13:00:00"}
]

# Static goals data
GOALS_DATA = [
    {
        "id": 1,
        "title": "New Gaming Console",
        "target_amount": 150000,
        "current_amount": 70500,
        "deadline": "2025-02-15T00:00:00",
        "completed": False
    },
    {
        "id": 2,
        "title": "Summer Trip Fund",
        "target_amount": 300000,
        "current_amount": 126000,
        "deadline": "2025-03-15T00:00:00",
        "completed": False
    },
    {
        "id": 3,
        "title": "Emergency Fund",
        "target_amount": 90000,
        "current_amount": 54000,
        "deadline": "2025-01-15T00:00:00",
        "completed": False
    },
    {
        "id": 4,
        "title": "Birthday Gift for Mom",
        "target_amount": 30000,
        "current_amount": 22500,
        "deadline": "2025-01-01T00:00:00",
        "completed": False
    }
]

# Static achievements data
ACHIEVEMENTS_DATA = [
    {
        "id": 1,
        "title": "First Saver",
        "description": "Save your first LKR 1000",
        "icon": "🎯",
        "points": 10,
        "unlocked": True,
        "unlocked_at": "2024-11-01T10:00:00"
    },
    {
        "id": 2,
        "title": "Budget Master",
        "description": "Track expenses for 7 days",
        "icon": "📊",
        "points": 25,
        "unlocked": True,
        "unlocked_at": "2024-11-15T14:00:00"
    },
    {
        "id": 3,
        "title": "Goal Getter",
        "description": "Complete your first savings goal",
        "icon": "🏆",
        "points": 50,
        "unlocked": False,
        "unlocked_at": None
    },
    {
        "id": 4,
        "title": "Money Wise",
        "description": "Learn 5 financial concepts",
        "icon": "🧠",
        "points": 30,
        "unlocked": True,
        "unlocked_at": "2024-12-01T16:00:00"
    },
    {
        "id": 5,
        "title": "Streak Keeper",
        "description": "Log in for 30 days straight",
        "icon": "🔥",
        "points": 100,
        "unlocked": False,
        "unlocked_at": None
    },
    {
        "id": 6,
        "title": "Smart Spender",
        "description": "Stay under budget for a month",
        "icon": "💰",
        "points": 75,
        "unlocked": False,
        "unlocked_at": None
    }
]

# Static bank account data
BANK_ACCOUNT_DATA = {
    "id": 1,
    "bank_name": "HNB",
    "account_type": "Teen+ Card",
    "card_number": "****4567",
    "balance": 45000,
    "daily_limit": 10000,
    "monthly_limit": 150000,
    "savings_balance": 125000
}

# Static chat history (sample)
CHAT_HISTORY_DATA = [
    {
        "id": 1,
        "message": "How can I save more money?",
        "response": "Start with the 50/30/20 rule! Put 50% for needs, 30% for wants, and 20% for savings. Track every expense to see where your money goes!",
        "timestamp": "2024-12-10T14:30:00"
    },
    {
        "id": 2,
        "message": "What's a good budget for a teenager?",
        "response": "For teens, try 40% savings, 30% entertainment/social, 20% personal needs, 10% emergency fund. Adjust based on your income and goals!",
        "timestamp": "2024-12-11T16:00:00"
    }
]

# Learning hub content
LEARNING_HUB_DATA = {
    "categories": [
        {
            "id": "budgeting",
            "title": "Budgeting Basics",
            "description": "Learn how to create and stick to a budget",
            "articles": [
                {
                    "id": 1,
                    "title": "The 50/30/20 Rule",
                    "content": "A simple budgeting framework that divides your income into needs (50%), wants (30%), and savings (20%).",
                    "readTime": "5 min"
                },
                {
                    "id": 2,
                    "title": "Zero-Based Budgeting",
                    "content": "Every rupee has a purpose. Allocate all your income to expenses, savings, and investments.",
                    "readTime": "7 min"
                }
            ]
        },
        {
            "id": "saving",
            "title": "Saving Strategies",
            "description": "Smart ways to save money",
            "articles": [
                {
                    "id": 3,
                    "title": "Pay Yourself First",
                    "content": "Automatically save a portion of your income before spending on anything else.",
                    "readTime": "4 min"
                },
                {
                    "id": 4,
                    "title": "The 52-Week Challenge",
                    "content": "Save incrementally each week - LKR 100 in week 1, LKR 200 in week 2, and so on.",
                    "readTime": "6 min"
                }
            ]
        },
        {
            "id": "investing",
            "title": "Investment Basics",
            "description": "Introduction to investing for beginners",
            "articles": [
                {
                    "id": 5,
                    "title": "Compound Interest",
                    "content": "Understanding how your money grows over time through the power of compounding.",
                    "readTime": "8 min"
                },
                {
                    "id": 6,
                    "title": "Risk vs Reward",
                    "content": "Learn about different investment options and their risk levels.",
                    "readTime": "10 min"
                }
            ]
        }
    ]
}