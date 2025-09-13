import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Target, Trophy, Activity, Plus, ShoppingCart, Sparkles, X, Send, PiggyBank, Brain, MessageCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import './Dashboard.css';

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chartData, setChartData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [showChatWidget, setShowChatWidget] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatResponse, setChatResponse] = useState('');
  const [showQuickAction, setShowQuickAction] = useState(null);
  const [quickActionData, setQuickActionData] = useState({
    amount: '',
    description: '',
    category: 'Savings'
  });
  const [dailySummary, setDailySummary] = useState('');
  const [summaryLoading, setSummaryLoading] = useState(false);
  const [showPurchaseAssistant, setShowPurchaseAssistant] = useState(false);
  const [purchaseQuery, setPurchaseQuery] = useState('');
  const [purchaseResponse, setPurchaseResponse] = useState('');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('/api/dashboard?user_id=1');
      setDashboardData(response.data);
      
      // Process data for charts
      processChartData(response.data.recent_transactions);
      processCategoryData(response.data.recent_transactions);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const processChartData = (transactions) => {
    const dailyData = {};
    const today = new Date();
    
    // Initialize last 7 days
    for (let i = 6; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      dailyData[key] = { date: key, income: 0, expense: 0 };
    }

    // Aggregate transactions
    transactions.forEach(transaction => {
      const date = new Date(transaction.date);
      const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      if (dailyData[key]) {
        if (transaction.transaction_type === 'income') {
          dailyData[key].income += transaction.amount;
        } else {
          dailyData[key].expense += transaction.amount;
        }
      }
    });

    setChartData(Object.values(dailyData));
  };

  const processCategoryData = (transactions) => {
    const categories = {};
    
    transactions.forEach(transaction => {
      if (transaction.transaction_type === 'expense') {
        if (!categories[transaction.category]) {
          categories[transaction.category] = 0;
        }
        categories[transaction.category] += transaction.amount;
      }
    });

    const data = Object.entries(categories).map(([name, value]) => ({
      name,
      value: Math.round(value)
    }));

    setCategoryData(data);
  };

  const handleQuickChat = async () => {
    if (!chatMessage.trim()) return;
    
    try {
      const response = await axios.post('/api/chat', {
        message: chatMessage,
        user_id: 1
      });
      setChatResponse(response.data.response);
    } catch (error) {
      setChatResponse("Hey! I'm here to help with your money questions! 💸");
    }
  };

  const getDailySummary = async () => {
    setSummaryLoading(true);
    try {
      const response = await axios.post('/api/daily-summary', {
        user_id: 1
      });
      setDailySummary(response.data.summary);
    } catch (error) {
      setDailySummary("Hey Yusuf! Keep crushing your financial goals today! 💪🇱🇰");
    } finally {
      setSummaryLoading(false);
    }
  };

  const handlePurchaseAssistant = async () => {
    if (!purchaseQuery.trim()) return;
    
    try {
      const response = await axios.post('/api/purchase-assistant', {
        message: purchaseQuery,
        user_id: 1
      });
      setPurchaseResponse(response.data.response);
    } catch (error) {
      setPurchaseResponse("I can help you find deals! Try checking Daraz.lk, ikman.lk for best prices! 🛍️💰");
    }
  };

  const handleQuickAction = async (type) => {
    if (!quickActionData.amount || !quickActionData.description) {
      alert('Please fill in all fields! 📝');
      return;
    }

    try {
      await axios.post('/api/transactions?user_id=1', {
        amount: parseFloat(quickActionData.amount),
        category: type === 'savings' ? 'Savings' : 'Shopping',
        description: quickActionData.description,
        transaction_type: type === 'savings' ? 'income' : 'expense'
      });
      
      fetchDashboardData();
      setShowQuickAction(null);
      setQuickActionData({ amount: '', description: '', category: 'Savings' });
      alert(type === 'savings' ? 'Money saved! Keep it up! 🎯' : 'Purchase added! 🛍️');
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const COLORS = ['#ff6b35', '#ff8555', '#ffa575', '#ffc595', '#ffe5b5'];

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1>What's good, Yusuf! 👋</h1>
          <p className="dashboard-subtitle">Let's check your money moves today 💸</p>
        </div>
        <div className="quick-actions">
          <button 
            className="quick-btn savings"
            onClick={() => setShowQuickAction('savings')}
          >
            <PiggyBank size={18} />
            Add to Savings
          </button>
          <button 
            className="quick-btn purchase"
            onClick={() => setShowQuickAction('purchase')}
          >
            <ShoppingCart size={18} />
            Add Purchase
          </button>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon balance">
            <DollarSign size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Your Bag 💰</p>
            <h3 className="stat-value">LKR {dashboardData?.total_balance?.toFixed(2) || '0.00'}</h3>
            <span className="stat-change positive">
              <TrendingUp size={16} />
              +12% this month (W!)
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon income">
            <TrendingUp size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Money In 📈</p>
            <h3 className="stat-value">LKR {dashboardData?.monthly_income?.toFixed(2) || '0.00'}</h3>
            <span className="stat-change positive">
              <TrendingUp size={16} />
              +8% vs last month
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon expense">
            <TrendingDown size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Money Out 📉</p>
            <h3 className="stat-value">LKR {dashboardData?.monthly_expenses?.toFixed(2) || '0.00'}</h3>
            <span className="stat-change negative">
              <TrendingDown size={16} />
              -5% (nice save!)
            </span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon savings">
            <Target size={24} />
          </div>
          <div className="stat-content">
            <p className="stat-label">Savings Rate 🎯</p>
            <h3 className="stat-value">{dashboardData?.savings_rate?.toFixed(1) || '0'}%</h3>
            <span className="stat-change positive">
              <TrendingUp size={16} />
              You're crushing it!
            </span>
          </div>
        </div>
      </div>

      <div className="ai-summary-section">
        <div className="ai-summary-card">
          <div className="summary-header">
            <div className="summary-title">
              <Brain size={20} />
              <h3>AI Summary for Today</h3>
            </div>
            <button 
              className="summary-btn"
              onClick={getDailySummary}
              disabled={summaryLoading}
            >
              {summaryLoading ? '🔄' : '✨'} Get AI Summary
            </button>
          </div>
          {dailySummary && (
            <div className="summary-content">
              <p>{dailySummary}</p>
            </div>
          )}
        </div>

        <div className="purchase-assistant-card">
          <div className="assistant-header">
            <div className="assistant-title">
              <ShoppingCart size={20} />
              <h3>Purchasing Assistant</h3>
            </div>
          </div>
          <div className="assistant-input">
            <input
              type="text"
              placeholder="What do you want to buy? I'll find cheap alternatives! 🛍️"
              value={purchaseQuery}
              onChange={(e) => setPurchaseQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handlePurchaseAssistant()}
            />
            <button onClick={handlePurchaseAssistant}>
              <Send size={16} />
            </button>
          </div>
          {purchaseResponse && (
            <div className="assistant-response">
              <h4>🛍️ Here's what I found:</h4>
              <p>{purchaseResponse}</p>
            </div>
          )}
        </div>
      </div>

      <div className="teen-tip-card">
        <div className="tip-icon">💡</div>
        <div className="tip-content">
          <h4>Pro Tip for Today</h4>
          <p>Skip that LKR 1500 coffee and invest in crypto or stocks instead. Small moves = big gains! 📈🇱🇰</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Your Money Flow 💵</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#3a3a3a" />
              <XAxis dataKey="date" stroke="#6b6b6b" />
              <YAxis stroke="#6b6b6b" />
              <Tooltip 
                contentStyle={{ background: '#2a2a2a', border: '1px solid #3a3a3a' }}
                labelStyle={{ color: '#f4f4f4' }}
              />
              <Line type="monotone" dataKey="income" stroke="#4ade80" strokeWidth={2} />
              <Line type="monotone" dataKey="expense" stroke="#ff6b35" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h3>Where Your Money Goes 🍕</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: '#2a2a2a', border: '1px solid #3a3a3a' }}
                labelStyle={{ color: '#f4f4f4' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="activity-section">
        <div className="recent-activity">
          <h3>Recent Moves 📱</h3>
          <div className="transaction-list">
            {dashboardData?.recent_transactions?.slice(0, 5).map((transaction, index) => (
              <div key={index} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.transaction_type === 'income' ? 
                    <TrendingUp size={16} className="income-icon" /> : 
                    <TrendingDown size={16} className="expense-icon" />
                  }
                </div>
                <div className="transaction-details">
                  <p className="transaction-description">{transaction.description}</p>
                  <span className="transaction-category">{transaction.category}</span>
                </div>
                <div className="transaction-amount">
                  <span className={transaction.transaction_type === 'income' ? 'positive' : 'negative'}>
                    {transaction.transaction_type === 'income' ? '+' : '-'}LKR {transaction.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="goals-summary">
          <h3>Your Goals 🎯</h3>
          <div className="goals-list">
            {dashboardData?.active_goals?.slice(0, 3).map((goal, index) => (
              <div key={index} className="goal-item">
                <div className="goal-header">
                  <Target size={16} className="goal-icon" />
                  <span className="goal-title">{goal.title}</span>
                </div>
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ width: `${(goal.current_amount / goal.target_amount) * 100}%` }}
                    />
                  </div>
                  <span className="progress-text">
                    LKR {goal.current_amount} / LKR {goal.target_amount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="achievements-banner">
        <Trophy size={20} />
        <span>You've earned {dashboardData?.total_points || 0} points! Keep grinding! 🔥</span>
        <button className="btn-secondary">View Achievements</button>
      </div>

      {/* AI Chat Widget */}
      <div className={`chat-widget ${showChatWidget ? 'open' : ''}`}>
        {!showChatWidget ? (
          <button className="chat-widget-trigger" onClick={() => setShowChatWidget(true)}>
            <Sparkles size={20} />
            <span>Get AI Support</span>
          </button>
        ) : (
          <div className="chat-widget-content">
            <div className="chat-widget-header">
              <div className="chat-widget-title">
                <Sparkles size={16} />
                <span>AI Money Coach</span>
              </div>
              <button className="chat-widget-close" onClick={() => setShowChatWidget(false)}>
                <X size={16} />
              </button>
            </div>
            <div className="chat-widget-body">
              {chatResponse ? (
                <div className="chat-response">{chatResponse}</div>
              ) : (
                <div className="chat-welcome">
                  Hey Yusuf! 👋 Need help with your money? Ask me anything!
                </div>
              )}
            </div>
            <div className="chat-widget-input">
              <input
                type="text"
                placeholder="Ask about saving, investing, budgeting in LKR..."
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickChat()}
              />
              <button onClick={handleQuickChat}>
                <Send size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Action Modals */}
      {showQuickAction && (
        <div className="modal-overlay" onClick={() => setShowQuickAction(null)}>
          <div className="modal quick-action-modal" onClick={(e) => e.stopPropagation()}>
            <h2>{showQuickAction === 'savings' ? '💰 Add to Savings' : '🛍️ Add Purchase'}</h2>
            
            <div className="form-group">
              <label>Amount (LKR)</label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                value={quickActionData.amount}
                onChange={(e) => setQuickActionData({...quickActionData, amount: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>What's it for?</label>
              <input
                type="text"
                className="input"
                placeholder={showQuickAction === 'savings' ? 'Side hustle money, birthday cash...' : 'New kicks, food, games...'}
                value={quickActionData.description}
                onChange={(e) => setQuickActionData({...quickActionData, description: e.target.value})}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowQuickAction(null)}>
                Cancel
              </button>
              <button className="btn" onClick={() => handleQuickAction(showQuickAction)}>
                {showQuickAction === 'savings' ? 'Save It! 💸' : 'Add It! 📝'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;