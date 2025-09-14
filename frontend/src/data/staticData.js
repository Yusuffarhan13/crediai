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

// Enhanced AI Chat Response System
export const getChatResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Comprehensive response database with context-aware replies
  const responseCategories = {
    // Budgeting responses
    budget: [
      "Let me help you with budgeting! 💰 The 50/30/20 rule works great: 50% for needs (rent, food, utilities), 30% for wants (entertainment, shopping), and 20% for savings. Based on your income, that would be approximately LKR 25,000 for needs, LKR 15,000 for wants, and LKR 10,000 for savings.",
      "Creating a budget? Start by tracking all expenses for 2 weeks. I noticed you spend about LKR 8,000 monthly on food - you could save LKR 3,000 by meal prepping! Use our transaction tracker to categorize everything. 📊",
      "Your budget analysis: You're spending 35% on food, 20% on transport, and 15% on entertainment. Consider reducing food expenses by cooking more at home. Sri Lankan home cooking costs about LKR 200 per meal vs LKR 800 at restaurants! 🍛"
    ],
    
    // Saving strategies
    saving: [
      "Here's your personalized savings plan! 💸 Start with LKR 5,000 monthly (just LKR 167 per day - skip one coffee!). Open a high-yield savings account at Commercial Bank (4.5% interest) or NSB (5% for youth accounts). In one year, you'll have LKR 60,000 plus interest!",
      "Automatic savings work best! Set up a standing order to transfer LKR 10,000 to savings right after your salary hits. Treat it like a bill you MUST pay. Also, every time you get a bonus or gift money, save 50% immediately! 🎯",
      "The 52-week challenge adapted for Sri Lanka: Week 1 save LKR 100, Week 2 save LKR 200, and so on. By week 52, you'll save LKR 5,200 that week, totaling LKR 137,800 for the year! Too aggressive? Do it monthly instead! 📈"
    ],
    
    // Investment advice
    invest: [
      "Ready to invest? 📈 Start with the Colombo Stock Exchange (CSE). Open a CDS account through your bank. Begin with blue-chip stocks like John Keells, Dialog, or Commercial Bank. Start with just LKR 10,000 and learn as you go!",
      "Investment options in Sri Lanka: 1) Fixed Deposits (8-10% returns), 2) Treasury Bills (10-12% but need LKR 100,000 minimum), 3) Unit Trusts (managed funds starting from LKR 5,000), 4) Stock Market (higher risk, higher reward). Diversify across these! 💼",
      "For beginners: Start with a balanced unit trust from companies like Capital Alliance or Guardian. They manage your money professionally, and you can start with as little as LKR 5,000. Returns average 12-15% annually. Much better than keeping money in savings! 🚀"
    ],
    
    // Debt management
    debt: [
      "Let's tackle your debt strategically! 🎯 List all debts from highest to lowest interest rate. Pay minimums on all, then attack the highest rate first (avalanche method). If you have a 24% credit card debt, pay that before your 14% personal loan!",
      "Debt consolidation might help! If you have multiple high-interest debts, consider a personal loan at 14-16% to pay them all off. One payment, lower interest. Banks like Sampath and HNB offer good consolidation loans. Calculate if you'll save on interest! 💳",
      "Quick debt tips: 1) Stop using credit cards temporarily, 2) Negotiate lower rates with your bank (they often agree!), 3) Make bi-weekly payments instead of monthly to reduce interest, 4) Use any bonus money for debt, not spending! 🛡️"
    ],
    
    // Sri Lankan specific financial advice
    srilanka: [
      "Sri Lankan money tips! 🇱🇰 1) Use Koko app for cashback on bills, 2) Pay utilities through Genie for rewards, 3) Commercial Bank's Flash accounts have no minimum balance, 4) FriMi from Nations Trust is great for instant transfers!",
      "Local savings hacks: Buy wholesale from Pettah for 40% savings, use PickMe over regular taxis (30% cheaper), get a Dialog/Mobitel postpaid plan with data bundles, shop at Arpico/Keells during their weekly sales (Wednesdays usually)! 🛒",
      "EPF/ETF tips: Your employer contributes 12% EPF + 3% ETF. You contribute 8% EPF. That's 23% forced savings! Additionally, save 10% yourself. Also, check if you qualify for Samurdhi benefits or other government programs! 📋"
    ],
    
    // Goal setting
    goals: [
      "Let's set SMART financial goals! 🎯 Your Gaming PC goal of LKR 350,000: Break it down - save LKR 30,000 monthly for 12 months. That's LKR 1,000 daily. Skip eating out twice a week and you're there! Track progress in our Goals section!",
      "Goal achievement strategy: 1) Make it visual - set the goal image as your phone wallpaper, 2) Automate savings for it, 3) Celebrate milestones (every LKR 50,000 saved), 4) Find an accountability partner. You're 35% there already - keep pushing! 💪",
      "Multiple goals? Use the 60-20-20 rule: 60% toward your biggest goal (Gaming PC), 20% for medium goal (Emergency fund), 20% for small goals (monthly treats). This keeps you motivated while making real progress! 🎮"
    ],
    
    // Credit score and loans
    credit: [
      "Building credit in Sri Lanka? 📊 CRIB (Credit Information Bureau) tracks your score. Pay all loans/cards on time, keep credit utilization under 30%, don't apply for multiple loans quickly. Check your CRIB report annually (costs LKR 1,100)!",
      "Loan preparation tips: 1) Maintain steady employment for 6+ months, 2) Keep debt-to-income ratio under 40%, 3) Save for 20% down payment (for assets), 4) Build relationship with one bank for better rates. Banks favor loyal customers! 🏦",
      "Credit card wisdom: Use for convenience, not credit! Pay full balance monthly to avoid 24-36% interest. Use cards with rewards (Commercial Mastercard gives 1% cashback). Never withdraw cash on credit cards - 30% interest from day one! 💳"
    ],
    
    // Student/youth specific
    student: [
      "Student money hacks! 🎓 1) Get student discounts everywhere (ask even if not advertised!), 2) Buy used textbooks from seniors, 3) Cook with friends to split costs, 4) Use campus facilities instead of gyms, 5) Tutor juniors for extra income!",
      "Part-time income ideas for students: Online tutoring (LKR 1,000-3,000/hour), freelance writing (LKR 50-100 per word), social media management (LKR 15,000-30,000/month), delivery rider (flexible hours), or start a small campus business! 💼",
      "Student to salary transition: When you get your first job, don't inflate lifestyle immediately! Keep student habits for 6 months while building emergency fund. Live on 70% of salary, save 30%. You're used to less, so this is easier now than later! 🎯"
    ],
    
    // Emergency fund
    emergency: [
      "Emergency fund calculator: You spend LKR 40,000 monthly, so aim for LKR 120,000-240,000 (3-6 months). Currently you have LKR 80,000 saved. Great start! Add LKR 10,000 monthly and you'll reach the minimum in 4 months! 🛡️",
      "Where to keep emergency funds: Split between instant access savings (LKR 50,000) and a 3-month fixed deposit with breaking facility (rest). This gives you immediate access plus slightly better interest. Never invest emergency funds in stocks! 🏦",
      "Emergency fund hacks: 1) Save tax refunds entirely, 2) Save 50% of any bonus/gifts, 3) Do a 'no-spend month' once per quarter, 4) Sell unused items on ikman.lk. Small actions build big emergency funds! 💪"
    ],
    
    // General motivation
    general: [
      "You're doing amazing! 🌟 This month you saved 15% more than last month. Your financial discipline is building wealth. Remember: every LKR 1,000 saved today is worth LKR 2,500 in 10 years with compound interest. Keep going!",
      "Financial freedom is a marathon, not a sprint! 🏃 You've already built great habits - tracking expenses, setting goals, and asking for advice. These habits matter more than the amounts. Millionaires are made by consistency, not luck!",
      "Your financial health check: ✅ Active savings, ✅ Tracking expenses, ✅ Clear goals, ✅ Learning continuously. You're in the top 20% of financial literacy! Keep building on these foundations. Wealth is inevitable with your discipline! 💎"
    ]
  };
  
  // Keyword matching for intelligent responses
  if (lowerMessage.includes('budget') || lowerMessage.includes('expense') || lowerMessage.includes('spend')) {
    return responseCategories.budget[Math.floor(Math.random() * responseCategories.budget.length)];
  }
  
  if (lowerMessage.includes('save') || lowerMessage.includes('saving')) {
    return responseCategories.saving[Math.floor(Math.random() * responseCategories.saving.length)];
  }
  
  if (lowerMessage.includes('invest') || lowerMessage.includes('stock') || lowerMessage.includes('trading')) {
    return responseCategories.invest[Math.floor(Math.random() * responseCategories.invest.length)];
  }
  
  if (lowerMessage.includes('debt') || lowerMessage.includes('loan') || lowerMessage.includes('owe')) {
    return responseCategories.debt[Math.floor(Math.random() * responseCategories.debt.length)];
  }
  
  if (lowerMessage.includes('sri lanka') || lowerMessage.includes('lkr') || lowerMessage.includes('local')) {
    return responseCategories.srilanka[Math.floor(Math.random() * responseCategories.srilanka.length)];
  }
  
  if (lowerMessage.includes('goal') || lowerMessage.includes('target') || lowerMessage.includes('achieve')) {
    return responseCategories.goals[Math.floor(Math.random() * responseCategories.goals.length)];
  }
  
  if (lowerMessage.includes('credit') || lowerMessage.includes('crib') || lowerMessage.includes('score')) {
    return responseCategories.credit[Math.floor(Math.random() * responseCategories.credit.length)];
  }
  
  if (lowerMessage.includes('student') || lowerMessage.includes('university') || lowerMessage.includes('college')) {
    return responseCategories.student[Math.floor(Math.random() * responseCategories.student.length)];
  }
  
  if (lowerMessage.includes('emergency') || lowerMessage.includes('urgent') || lowerMessage.includes('crisis')) {
    return responseCategories.emergency[Math.floor(Math.random() * responseCategories.emergency.length)];
  }
  
  // Default to general motivation if no specific keyword match
  return responseCategories.general[Math.floor(Math.random() * responseCategories.general.length)];
};

// Enhanced Daily Summary Generator with personalized insights
export const getDailySummary = () => {
  const date = new Date();
  const day = date.getDay();
  const hour = date.getHours();
  
  // Time-based greetings
  const greeting = hour < 12 ? "Good morning" : hour < 17 ? "Good afternoon" : "Good evening";
  
  // Calculate some "dynamic" stats based on static data
  const totalBalance = staticBankAccounts.reduce((sum, acc) => sum + acc.balance, 0);
  const monthlyExpenses = staticTransactions
    .filter(t => t.transaction_type === 'expense')
    .slice(0, 30)
    .reduce((sum, t) => sum + t.amount, 0);
  const savingsRate = ((totalBalance / (totalBalance + monthlyExpenses)) * 100).toFixed(1);
  
  const summaries = [
    `${greeting} Yusuf! 🌟 Your financial snapshot: LKR ${totalBalance.toLocaleString()} total balance with a ${savingsRate}% savings rate. You're in the top 10% of savers your age! Key action today: Review your Gaming PC fund - you're 35% there!`,
    
    `Daily insight 📊: You've saved LKR 15,000 this week - that's 50% above your target! Your discipline is paying off. At this rate, you'll have LKR 780,000 saved by year-end. Tip: Consider putting LKR 5,000 into a unit trust for better returns!`,
    
    `${greeting}! 💪 Achievement alert: 5-day streak of staying under budget! You're LKR 12,000 ahead of last month. Your top expense category is Food (35%) - try the meal prep challenge this week to save an extra LKR 3,000!`,
    
    `Financial health check ✅: Emergency fund at 40% (LKR 80,000/200,000). You're doing great! Add LKR 10,000 this month to hit 45%. Also, your Europe Trip fund needs LKR 425,000 more - consider a side hustle to accelerate this goal!`,
    
    `Smart money moment 🧠: Your spending is down 15% from last week! Main savings came from Transport (used bus instead of PickMe) and Food (home cooking). Keep this up and you'll save an extra LKR 8,000 monthly!`,
    
    `${greeting} champion! 🏆 You're crushing your goals: Gaming PC (35% complete), Europe Trip (15% complete), Emergency Fund (40% complete). Focus tip: Prioritize emergency fund to 100% before other goals for financial security!`,
    
    `Weekly wrap-up 📈: Spent LKR 28,000, Saved LKR 15,000, Invested LKR 0. Consider starting investing - even LKR 5,000 in an index fund beats savings account returns. Your money should work as hard as you do!`,
    
    `Motivation Monday 🚀: You've built amazing habits - tracking expenses daily, saving automatically, and setting clear goals. These habits will make you wealthy, not lucky breaks. Remember: Warren Buffett started with less than you have now!`,
    
    `Mid-week check ⚡: You're LKR 5,000 under budget so far! Use this surplus for your Gaming PC fund. Also, your subscription spending is LKR 2,500/month - audit these and cancel unused ones for instant savings!`,
    
    `Friday finance 💰: Weekend spending typically triples weekday spending. Set a LKR 5,000 weekend budget and stick to it. Pro tip: Withdraw cash so you can't overspend. What you save this weekend goes straight to Europe Trip fund!`
  ];
  
  // Return a semi-random but relevant summary
  if (day === 1) return summaries[7]; // Monday motivation
  if (day === 5) return summaries[9]; // Friday finance
  if (day === 3) return summaries[8]; // Mid-week check
  
  return summaries[Math.floor(Math.random() * summaries.length)];
};

// Enhanced Purchase Assistant with detailed price comparisons and alternatives
export const getPurchaseAssistance = (query) => {
  const lowerQuery = query.toLowerCase();
  
  const suggestions = {
    phone: `📱 SMART PHONE SHOPPING GUIDE:
    
    🏪 BEST PLACES TO BUY:
    • Dialog/Mobitel Stores: 0% installment plans over 12-24 months
    • Singer: Trade-in offers + installments (but 15% more expensive overall)
    • Abans: Good warranty but prices 10-20% higher
    • ikman.lk: Used phones 30-50% cheaper (check seller ratings!)
    • Daraz.lk: Wait for 11.11 or 12.12 sales for 25% discounts
    
    💰 MONEY-SAVING ALTERNATIVES:
    • Instead of iPhone 15 (LKR 450,000), get iPhone 13 (LKR 250,000) - 90% same features
    • Xiaomi/Realme offer flagship features at 40% less than Samsung
    • Buy last year's flagship during new model launches (30% instant discount)
    
    🎯 BEST DEALS RIGHT NOW:
    • Samsung A54: LKR 125,000 (was 150,000)
    • Xiaomi Redmi Note 12 Pro: LKR 85,000 (amazing value!)
    • Used iPhone 12: LKR 150,000 on ikman (retail: 220,000)
    
    ⚠️ AVOID: Gray market imports (no warranty), very old models (no software updates)`,
    
    laptop: `💻 LAPTOP BUYING GUIDE:
    
    🏪 WHERE TO BUY:
    • Unity Plaza: Best prices but check multiple shops
    • Redline Technologies: Reliable, good warranty, fair prices
    • Laptop.lk: Online convenience, doorstep delivery
    • Metropolitan: Premium options, excellent service
    • Barclays: Refurbished business laptops (50% cheaper, same performance!)
    
    💰 SMART ALTERNATIVES:
    • Need it for coding? Used ThinkPad T480 (LKR 125,000) beats new budget laptops
    • Just for studies? Chromebook (LKR 75,000) or tablet with keyboard
    • Gaming? Build a desktop (30% more power for same price)
    
    🎯 CURRENT BEST DEALS:
    • ASUS VivoBook 15: LKR 165,000 (perfect for students)
    • Refurbished Dell Latitude: LKR 95,000 (business-grade quality)
    • HP Pavilion Gaming: LKR 285,000 (entry-level gaming)
    
    💡 PRO TIP: Buy during back-to-school season (January) or year-end clearance (December) for 20% savings!`,
    
    clothes: `👕 FASHION SHOPPING HACKS:
    
    🏪 BEST VALUE STORES:
    • Fashion Bug: Trendy + affordable (wait for 50% sales every month-end)
    • ODEL: Quality basics, student discount on Tuesdays
    • Cotton Collection: Great quality, bulk discounts
    • Mondy: Professional wear at reasonable prices
    • House of Fashion: Wide variety, frequent BOGOF deals
    
    💰 MONEY-SAVING SECRETS:
    • Thrift Shops (Wellawatte/Dehiwala): Branded items at 70% off
    • Facebook Groups: "Thrift Lk", "Colombo Garage Sale"
    • End-of-season sales: 60-70% off (March & September)
    • Factory outlets: Katunayake/Biyagama (50% cheaper than retail)
    
    🎯 SMART SHOPPING STRATEGY:
    • Basic tees: LKR 800-1,200 at Cotton Collection
    • Jeans: LKR 3,000-4,000 at Fashion Bug (wait for sales: LKR 2,000)
    • Formal shirts: LKR 2,500 at Mondy
    • Shoes: DSI/Bata for daily wear (LKR 3,000-5,000)
    
    ⚡ QUICK TIP: Build a capsule wardrobe - 15 quality pieces that mix & match saves more than 50 cheap items!`,
    
    food: `🍔 FOOD & GROCERY SAVINGS:
    
    🏪 GROCERY SHOPPING:
    • Keells: Nexus card for 5% cashback + weekly deals
    • Arpico: Best bulk prices, huge savings on own-brand items
    • Laughs: Cheapest for vegetables and fruits
    • Sathosa: Government prices (10-15% cheaper but limited variety)
    • Sunday Pola: Fresh produce at 40% less than supermarkets
    
    🍕 EATING OUT SMARTLY:
    • PickMe Food: Daily deals + promo codes (save 20-30%)
    • Uber Eats: First-time user codes per restaurant
    • Yamu.lk: Find BOGOF deals and happy hours
    • Credit card offers: 20-50% off at selected restaurants
    
    💰 MEAL PLANNING TIPS:
    • Weekly meal prep: LKR 200/meal vs LKR 800 eating out
    • Rice & curry packet: LKR 250-350 (filling and economical)
    • Cook in bulk: Make curry for 3 days (saves time + money)
    
    📊 BUDGET BREAKDOWN:
    • Groceries (cooking): LKR 15,000/month
    • Eating out daily: LKR 45,000/month
    • Mixed (smart): LKR 20,000/month
    You could save LKR 25,000 monthly by cooking more!`,
    
    gaming: `🎮 GAMING DEALS & ALTERNATIVES:
    
    🏪 WHERE TO BUY:
    • Unity Plaza (Game Street, Tech Land): Best local prices
    • Nano Gaming: Good for PC parts and peripherals
    • Facebook Groups: "Sri Lanka PC Gaming", "Console Gaming LK"
    • ikman.lk: Used consoles 30-40% cheaper
    
    💰 SMART GAMING ON BUDGET:
    • PS4 instead of PS5: 60% cheaper, huge game library
    • Xbox Game Pass: LKR 2,000/month for 100+ games
    • Epic Games: FREE game every week!
    • Steam Sales: 50-90% off during seasonal sales
    • GeForce NOW: Cloud gaming (no expensive PC needed)
    
    🎯 CURRENT BEST VALUE:
    • Used PS4 Slim: LKR 75,000 (new: 120,000)
    • Gaming PC Build: LKR 250,000 (GTX 1660 Super setup)
    • Nintendo Switch Lite: LKR 65,000 (portable gaming)
    
    💡 MONEY-SAVING TIPS:
    • Buy physical games used, sell after finishing (70% value retained)
    • Share digital accounts with friends (split costs)
    • Wait 6 months after release (50% price drop)
    • Join local gaming communities for game swaps`,
    
    electronics: `📱 ELECTRONICS SHOPPING GUIDE:
    
    🏪 TRUSTED STORES:
    • Singer: Reliable but 15-20% premium
    • Abans: Good warranty, hire-purchase available
    • Softlogic: Wide range, competitive prices
    • Daraz: Online deals but check seller ratings
    • Unity Plaza: Best prices for computer parts
    
    💰 GENERAL SAVINGS TIPS:
    • Buy during Avurudu season (April): 20-30% discounts
    • Black Friday (November): Online deals
    • Credit card promotions: 0% installments
    • Exchange offers: Trade old for new
    
    🎯 SMART SHOPPING:
    • Compare prices on ikman before buying new
    • Check warranty terms (international vs local)
    • Consider refurbished with warranty
    • Buy last year's model when new launches
    
    ⚠️ AVOID: No-name brands without warranty, too-good-to-be-true online deals`,
    
    default: `🛍️ SMART SHOPPING ASSISTANT:
    
    I'll help you find the best deals! Here's my general advice:
    
    📊 PRICE COMPARISON TOOLS:
    • ikman.lk: Compare new vs used prices
    • Daraz.lk: Check daily flash deals
    • PriceCheck.lk: Compare across stores
    • Facebook Marketplace: Local deals
    
    💰 UNIVERSAL SAVINGS TIPS:
    • Always check for student discounts (10-20% off)
    • Use credit card offers (up to 50% off)
    • Buy during sales seasons (Avurudu, Christmas, 11.11)
    • Consider quality used items (40-60% savings)
    • Join Facebook buy/sell groups for your area
    
    🎯 BEFORE YOU BUY:
    1. Do I really need this? (24-hour rule)
    2. Can I find it used/refurbished?
    3. Is there a cheaper alternative?
    4. Can I wait for a sale?
    5. Will this help me reach my goals?
    
    Tell me what specific item you're looking for, and I'll give you detailed guidance!`
  };
  
  // Enhanced keyword matching
  if (lowerQuery.includes('phone') || lowerQuery.includes('mobile') || lowerQuery.includes('iphone') || lowerQuery.includes('samsung')) {
    return suggestions.phone;
  }
  
  if (lowerQuery.includes('laptop') || lowerQuery.includes('computer') || lowerQuery.includes('macbook') || lowerQuery.includes('notebook')) {
    return suggestions.laptop;
  }
  
  if (lowerQuery.includes('clothes') || lowerQuery.includes('shirt') || lowerQuery.includes('dress') || lowerQuery.includes('fashion') || lowerQuery.includes('shoes')) {
    return suggestions.clothes;
  }
  
  if (lowerQuery.includes('food') || lowerQuery.includes('eat') || lowerQuery.includes('grocery') || lowerQuery.includes('restaurant')) {
    return suggestions.food;
  }
  
  if (lowerQuery.includes('game') || lowerQuery.includes('gaming') || lowerQuery.includes('ps5') || lowerQuery.includes('xbox') || lowerQuery.includes('console')) {
    return suggestions.gaming;
  }
  
  if (lowerQuery.includes('tv') || lowerQuery.includes('fridge') || lowerQuery.includes('washing') || lowerQuery.includes('electronic')) {
    return suggestions.electronics;
  }
  
  // If no specific match, provide general advice with a hint to be more specific
  return suggestions.default;
};