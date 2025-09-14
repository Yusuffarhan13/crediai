// Static data for CrediAI - All data built into the UI
// No database or API calls needed

const generateTransactionId = () => Math.random().toString(36).substr(2, 9);
const generateGoalId = () => Math.random().toString(36).substr(2, 9);

// Get dates for realistic data
const today = new Date();
const getDateDaysAgo = (days) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split('T')[0];
};

// Initial static transactions data
export const staticTransactions = [
  // Recent transactions (last 30 days)
  { id: generateTransactionId(), date: getDateDaysAgo(0), amount: 2500, category: 'Food', description: 'Lunch at Pizza Hut', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(0), amount: 15000, category: 'Savings', description: 'Monthly savings deposit', transaction_type: 'income', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(1), amount: 800, category: 'Transport', description: 'PickMe ride to Colombo', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(1), amount: 3500, category: 'Shopping', description: 'New headphones from Daraz', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(2), amount: 1200, category: 'Food', description: 'Dinner at KFC', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(2), amount: 5000, category: 'Other', description: 'Freelance project payment', transaction_type: 'income', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(3), amount: 500, category: 'Entertainment', description: 'Netflix subscription', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(4), amount: 2000, category: 'Education', description: 'Online course on Udemy', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(5), amount: 50000, category: 'Other', description: 'Monthly allowance', transaction_type: 'income', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(5), amount: 1500, category: 'Food', description: 'Groceries from Keells', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(6), amount: 3000, category: 'Entertainment', description: 'Movie tickets', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(7), amount: 600, category: 'Transport', description: 'Bus pass renewal', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(8), amount: 8000, category: 'Shopping', description: 'New shoes from Fashion Bug', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(9), amount: 1800, category: 'Food', description: 'Burger King meal', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(10), amount: 10000, category: 'Savings', description: 'Emergency fund deposit', transaction_type: 'income', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(11), amount: 2500, category: 'Entertainment', description: 'Gaming credits', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(12), amount: 1200, category: 'Food', description: 'Subway sandwich', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(13), amount: 4500, category: 'Shopping', description: 'T-shirts from ODEL', transaction_type: 'expense', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(14), amount: 15000, category: 'Other', description: 'Birthday gift money', transaction_type: 'income', user_id: 1 },
  { id: generateTransactionId(), date: getDateDaysAgo(15), amount: 900, category: 'Transport', description: 'Uber ride', transaction_type: 'expense', user_id: 1 },
];

// Static goals data
export const staticGoals = [
  {
    id: generateGoalId(),
    title: 'New Gaming PC',
    description: 'Save for RTX 4060 gaming setup',
    target_amount: 350000,
    current_amount: 125000,
    deadline: '2024-06-30',
    status: 'active',
    category: 'Tech',
    user_id: 1
  },
  {
    id: generateGoalId(),
    title: 'Europe Trip',
    description: 'Backpacking through Europe next summer',
    target_amount: 500000,
    current_amount: 75000,
    deadline: '2024-12-31',
    status: 'active',
    category: 'Travel',
    user_id: 1
  },
  {
    id: generateGoalId(),
    title: 'Emergency Fund',
    description: 'Build 6 months of expenses',
    target_amount: 200000,
    current_amount: 80000,
    deadline: '2024-09-30',
    status: 'active',
    category: 'Savings',
    user_id: 1
  },
  {
    id: generateGoalId(),
    title: 'iPhone 15 Pro',
    description: 'Upgrade my phone',
    target_amount: 450000,
    current_amount: 450000,
    deadline: '2024-03-31',
    status: 'completed',
    category: 'Tech',
    user_id: 1
  },
  {
    id: generateGoalId(),
    title: 'Motorcycle Down Payment',
    description: 'Honda CB350 initial payment',
    target_amount: 150000,
    current_amount: 45000,
    deadline: '2024-08-31',
    status: 'active',
    category: 'Transport',
    user_id: 1
  }
];

// Static achievements data
export const staticAchievements = [
  {
    id: 1,
    title: 'First Saver',
    description: 'Made your first savings deposit',
    points: 100,
    earned: true,
    earned_date: getDateDaysAgo(30),
    icon: '💰',
    level: 'bronze'
  },
  {
    id: 2,
    title: 'Goal Getter',
    description: 'Created your first financial goal',
    points: 150,
    earned: true,
    earned_date: getDateDaysAgo(25),
    icon: '🎯',
    level: 'bronze'
  },
  {
    id: 3,
    title: 'Budget Boss',
    description: 'Stayed under budget for a month',
    points: 300,
    earned: true,
    earned_date: getDateDaysAgo(15),
    icon: '📊',
    level: 'silver'
  },
  {
    id: 4,
    title: 'Savings Streak',
    description: 'Saved money for 7 days straight',
    points: 200,
    earned: true,
    earned_date: getDateDaysAgo(10),
    icon: '🔥',
    level: 'bronze'
  },
  {
    id: 5,
    title: 'Goal Crusher',
    description: 'Completed your first goal',
    points: 500,
    earned: true,
    earned_date: getDateDaysAgo(5),
    icon: '🏆',
    level: 'gold'
  },
  {
    id: 6,
    title: 'Money Master',
    description: 'Reached LKR 100,000 in total savings',
    points: 1000,
    earned: false,
    icon: '👑',
    level: 'platinum'
  },
  {
    id: 7,
    title: 'Expense Tracker',
    description: 'Logged 50 transactions',
    points: 250,
    earned: false,
    icon: '📝',
    level: 'silver'
  },
  {
    id: 8,
    title: 'Investment Guru',
    description: 'Started your investment journey',
    points: 750,
    earned: false,
    icon: '📈',
    level: 'gold'
  }
];

// Static bank accounts data
export const staticBankAccounts = [
  {
    id: 1,
    bank_name: 'Commercial Bank',
    account_type: 'Savings',
    account_number: '****4521',
    balance: 125000,
    user_id: 1
  },
  {
    id: 2,
    bank_name: 'Sampath Bank',
    account_type: 'Current',
    account_number: '****7892',
    balance: 45000,
    user_id: 1
  }
];

// Static learning hub content
export const staticLearningContent = [
  {
    id: 1,
    title: 'Budgeting Basics for Teens',
    category: 'Budgeting',
    difficulty: 'Beginner',
    duration: '5 min',
    description: 'Learn the 50/30/20 rule and start managing your money like a pro',
    content: 'The 50/30/20 rule is simple: 50% for needs, 30% for wants, 20% for savings...',
    completed: true
  },
  {
    id: 2,
    title: 'Start Investing with LKR 1000',
    category: 'Investing',
    difficulty: 'Beginner',
    duration: '8 min',
    description: 'How to start investing in the Colombo Stock Exchange with small amounts',
    content: 'You don\'t need millions to start investing. Here\'s how to begin with just LKR 1000...',
    completed: false
  },
  {
    id: 3,
    title: 'Crypto for Sri Lankan Beginners',
    category: 'Crypto',
    difficulty: 'Intermediate',
    duration: '10 min',
    description: 'Understanding Bitcoin, Ethereum, and how to buy crypto in Sri Lanka',
    content: 'Cryptocurrency is digital money. Here\'s what you need to know...',
    completed: false
  },
  {
    id: 4,
    title: 'Side Hustles for Students',
    category: 'Income',
    difficulty: 'Beginner',
    duration: '7 min',
    description: 'Top 10 ways to make money while studying in Sri Lanka',
    content: 'From freelancing to tutoring, here are proven ways to earn...',
    completed: true
  },
  {
    id: 5,
    title: 'Credit Cards: Good or Bad?',
    category: 'Credit',
    difficulty: 'Intermediate',
    duration: '6 min',
    description: 'Understanding credit cards and how to use them wisely',
    content: 'Credit cards can be powerful tools or dangerous traps. Learn the difference...',
    completed: false
  }
];

// Helper functions to calculate dashboard data
export const calculateDashboardData = () => {
  const now = new Date();
  const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  
  // Filter this month's transactions
  const thisMonthTransactions = staticTransactions.filter(t => 
    new Date(t.date) >= thisMonthStart
  );
  
  // Calculate totals
  const monthlyIncome = thisMonthTransactions
    .filter(t => t.transaction_type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const monthlyExpenses = thisMonthTransactions
    .filter(t => t.transaction_type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);
    
  const totalBalance = staticBankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  
  const savingsRate = monthlyIncome > 0 
    ? ((monthlyIncome - monthlyExpenses) / monthlyIncome * 100) 
    : 0;
    
  const totalPoints = staticAchievements
    .filter(a => a.earned)
    .reduce((sum, a) => sum + a.points, 0);
  
  return {
    total_balance: totalBalance,
    monthly_income: monthlyIncome,
    monthly_expenses: monthlyExpenses,
    savings_rate: savingsRate,
    recent_transactions: staticTransactions.slice(0, 10),
    active_goals: staticGoals.filter(g => g.status === 'active'),
    total_points: totalPoints
  };
};

// Data management functions (simulate API behavior)
export const dataManager = {
  // Transactions
  getTransactions: () => [...staticTransactions],
  
  addTransaction: (transaction) => {
    const newTransaction = {
      ...transaction,
      id: generateTransactionId(),
      date: new Date().toISOString().split('T')[0],
      user_id: 1
    };
    staticTransactions.unshift(newTransaction);
    return newTransaction;
  },
  
  deleteTransaction: (id) => {
    const index = staticTransactions.findIndex(t => t.id === id);
    if (index > -1) {
      staticTransactions.splice(index, 1);
      return true;
    }
    return false;
  },
  
  // Goals
  getGoals: () => [...staticGoals],
  
  addGoal: (goal) => {
    const newGoal = {
      ...goal,
      id: generateGoalId(),
      current_amount: 0,
      status: 'active',
      user_id: 1
    };
    staticGoals.push(newGoal);
    return newGoal;
  },
  
  updateGoal: (id, updates) => {
    const goal = staticGoals.find(g => g.id === id);
    if (goal) {
      Object.assign(goal, updates);
      return goal;
    }
    return null;
  },
  
  // Achievements
  getAchievements: () => [...staticAchievements],
  
  // Bank Accounts
  getBankAccounts: () => [...staticBankAccounts],
  
  // Learning Content
  getLearningContent: () => [...staticLearningContent],
  
  markLessonComplete: (id) => {
    const lesson = staticLearningContent.find(l => l.id === id);
    if (lesson) {
      lesson.completed = true;
      return lesson;
    }
    return null;
  },
  
  // Dashboard
  getDashboardData: () => calculateDashboardData()
};

// Chat responses (simulate AI responses)
export const getChatResponse = (message) => {
  const responses = [
    "Great question about saving! Try the 50/30/20 rule - it's perfect for beginners! 💰",
    "Smart thinking! Investing early is key. Start with index funds or ETFs for safety 📈",
    "Pro tip: Track every expense for a week. You'll be surprised where your money goes! 📝",
    "Emergency funds are crucial! Aim for 3-6 months of expenses saved up 🛡️",
    "Compound interest is your best friend! Even small amounts grow big over time 🚀",
    "Consider a high-yield savings account for better returns on your emergency fund 🏦",
    "Budgeting apps can help! But our built-in tracker works great too 📱",
    "Remember: It's not about how much you earn, but how much you keep! 💡"
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

// Daily summary generator
export const getDailySummary = () => {
  const summaries = [
    "You're on fire today! 🔥 Your savings rate is up 15% this week. Keep that momentum going!",
    "Smart moves today! You're LKR 5,000 closer to your Gaming PC goal. That RTX 4060 is calling! 🎮",
    "Budget boss alert! 📊 You've stayed under budget for 5 days straight. New achievement unlocked soon!",
    "Pro tip: You spent LKR 3,500 on food yesterday. Try meal prep to save more! 🍱",
    "Your emergency fund is at 40%! Push for 50% this month and earn the Safety Net achievement! 🛡️",
    "Investment opportunity: With your current savings rate, you could start investing LKR 5,000 monthly! 📈",
    "You're crushing it! At this rate, you'll hit your Europe Trip goal 2 months early! ✈️"
  ];
  
  return summaries[Math.floor(Math.random() * summaries.length)];
};

// Purchase assistant responses
export const getPurchaseAssistance = (query) => {
  const suggestions = {
    default: "I found some great deals! Check Daraz.lk for 20% off electronics, and ikman.lk has second-hand options that could save you 40%! 🛍️",
    phone: "For phones, check Dialog or Mobitel stores for installment plans. Singer has 0% interest deals! Also check ikman.lk for barely-used phones at 30% less! 📱",
    laptop: "Best laptop deals: Redline Technologies, Unity Plaza, or check Daraz during sales. Consider refurbished from Barclays - same warranty, 40% cheaper! 💻",
    clothes: "Fashion deals: ODEL, Fashion Bug, and Cotton Collection have student discounts! Also check Thrift shops in Wellawatte for branded items at 70% off! 👕",
    food: "Food savings: Use PickMe Food for discounts, Uber Eats has promo codes for first orders. Keells and Arpico have loyalty programs for regular savings! 🍔",
    gaming: "Gaming deals: Game Street in Unity Plaza, or check Facebook marketplace. Steam sales can save you 75% on games! Consider Epic Games free weekly games! 🎮"
  };
  
  // Simple keyword matching
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes('phone') || lowerQuery.includes('mobile')) return suggestions.phone;
  if (lowerQuery.includes('laptop') || lowerQuery.includes('computer')) return suggestions.laptop;
  if (lowerQuery.includes('clothes') || lowerQuery.includes('shirt') || lowerQuery.includes('dress')) return suggestions.clothes;
  if (lowerQuery.includes('food') || lowerQuery.includes('eat')) return suggestions.food;
  if (lowerQuery.includes('game') || lowerQuery.includes('gaming')) return suggestions.gaming;
  
  return suggestions.default;
};