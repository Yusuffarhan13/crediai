import React, { useState, useEffect } from 'react';
import { Plus, Search, Filter, TrendingUp, TrendingDown, Calendar, CreditCard, PiggyBank, AlertCircle } from 'lucide-react';
import axios from 'axios';
import './Transactions.css';

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [bankAccounts, setBankAccounts] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    category: 'Food',
    description: '',
    transaction_type: 'expense'
  });

  const categories = ['Food', 'Entertainment', 'Transport', 'Shopping', 'Education', 'Savings', 'Other'];

  useEffect(() => {
    fetchTransactions();
    fetchBankAccounts();
  }, []);

  useEffect(() => {
    filterTransactions();
  }, [transactions, searchTerm, filterCategory]);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get('/api/transactions?user_id=1');
      setTransactions(response.data);
      setFilteredTransactions(response.data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBankAccounts = async () => {
    try {
      const response = await axios.get('/api/bank-accounts?user_id=1');
      setBankAccounts(response.data);
    } catch (error) {
      console.error('Error fetching bank accounts:', error);
    }
  };

  const filterTransactions = () => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterCategory !== 'all') {
      filtered = filtered.filter(t => t.category === filterCategory);
    }

    setFilteredTransactions(filtered);
  };

  const handleAddTransaction = async () => {
    if (!newTransaction.amount || !newTransaction.description) {
      alert('Fill everything fam! 📝');
      return;
    }

    try {
      await axios.post('/api/transactions?user_id=1', {
        ...newTransaction,
        amount: parseFloat(newTransaction.amount)
      });
      
      // Update bank balance if spending
      if (bankAccounts.length > 0 && newTransaction.transaction_type === 'expense') {
        await axios.post(`/api/bank-accounts/${bankAccounts[0].id}/update-balance`, null, {
          params: {
            amount: parseFloat(newTransaction.amount),
            transaction_type: 'spend'
          }
        });
      }
      
      fetchTransactions();
      fetchBankAccounts();
      setShowAddModal(false);
      setNewTransaction({
        amount: '',
        category: 'Food',
        description: '',
        transaction_type: 'expense'
      });
    } catch (error) {
      console.error('Error adding transaction:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric'
    });
  };

  const calculateTotals = () => {
    const income = filteredTransactions
      .filter(t => t.transaction_type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const expenses = filteredTransactions
      .filter(t => t.transaction_type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    return { income, expenses, net: income - expenses };
  };

  const totals = calculateTotals();
  const mainAccount = bankAccounts[0];

  if (loading) {
    return (
      <div className="transactions-loading">
        <div className="loading"></div>
      </div>
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <h1>Money Tracker 💸</h1>
          <p className="transactions-subtitle">Track ur bag</p>
        </div>
        <button className="btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          Add
        </button>
      </div>

      {mainAccount && (
        <div className="bank-card-section">
          <div className="bank-card">
            <div className="bank-card-header">
              <div className="bank-logo">HNB</div>
              <div className="card-type">{mainAccount.account_type}</div>
            </div>
            <div className="card-number">{mainAccount.card_number}</div>
            <div className="card-details">
              <div className="card-stat">
                <span className="label">Balance</span>
                <h3>LKR {mainAccount.balance?.toFixed(2)}</h3>
              </div>
              <div className="card-stat">
                <span className="label">Savings</span>
                <h3>LKR {mainAccount.savings_balance?.toFixed(2)}</h3>
              </div>
              <div className="card-stat">
                <span className="label">Daily Limit</span>
                <h3>LKR {mainAccount.daily_limit?.toFixed(0)}</h3>
              </div>
            </div>
            {mainAccount.balance < 10000 && (
              <div className="low-balance-alert">
                <AlertCircle size={16} />
                Low balance fr! Top up soon 💀
              </div>
            )}
          </div>
        </div>
      )}

      <div className="transactions-summary">
        <div className="summary-card income">
          <TrendingUp size={20} />
          <div>
            <p>In</p>
            <h3>LKR {totals.income.toFixed(2)}</h3>
          </div>
        </div>
        <div className="summary-card expense">
          <TrendingDown size={20} />
          <div>
            <p>Out</p>
            <h3>LKR {totals.expenses.toFixed(2)}</h3>
          </div>
        </div>
        <div className="summary-card net">
          <Calendar size={20} />
          <div>
            <p>Net</p>
            <h3 className={totals.net >= 0 ? 'positive' : 'negative'}>
              LKR {Math.abs(totals.net).toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      <div className="transactions-controls">
        <div className="search-box">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-box">
          <Filter size={20} />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
          >
            <option value="all">All</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>What</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{formatDate(transaction.date)}</td>
                <td>{transaction.description}</td>
                <td>
                  <span className="category-tag">{transaction.category}</span>
                </td>
                <td>
                  <span className={`type-badge ${transaction.transaction_type}`}>
                    {transaction.transaction_type === 'income' ? 
                      <TrendingUp size={14} /> : 
                      <TrendingDown size={14} />
                    }
                    {transaction.transaction_type === 'income' ? 'in' : 'out'}
                  </span>
                </td>
                <td className={transaction.transaction_type === 'income' ? 'amount-positive' : 'amount-negative'}>
                  {transaction.transaction_type === 'income' ? '+' : '-'}LKR {transaction.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Add Transaction</h2>
            
            <div className="form-group">
              <label>Type</label>
              <div className="type-selector">
                <button
                  className={`type-btn ${newTransaction.transaction_type === 'income' ? 'active' : ''}`}
                  onClick={() => setNewTransaction({...newTransaction, transaction_type: 'income'})}
                >
                  <TrendingUp size={16} />
                  Money In
                </button>
                <button
                  className={`type-btn ${newTransaction.transaction_type === 'expense' ? 'active' : ''}`}
                  onClick={() => setNewTransaction({...newTransaction, transaction_type: 'expense'})}
                >
                  <TrendingDown size={16} />
                  Money Out
                </button>
              </div>
            </div>

            <div className="form-group">
              <label>LKR</label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({...newTransaction, amount: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                className="input"
                value={newTransaction.category}
                onChange={(e) => setNewTransaction({...newTransaction, category: e.target.value})}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>What's it for?</label>
              <input
                type="text"
                className="input"
                placeholder="Quick description..."
                value={newTransaction.description}
                onChange={(e) => setNewTransaction({...newTransaction, description: e.target.value})}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Nah
              </button>
              <button className="btn" onClick={handleAddTransaction}>
                Add it 🔥
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Transactions;