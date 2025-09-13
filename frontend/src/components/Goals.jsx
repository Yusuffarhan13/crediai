import React, { useState, useEffect } from 'react';
import { Target, Plus, TrendingUp, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import axios from 'axios';
import './Goals.css';

const Goals = () => {
  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState(null);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target_amount: '',
    deadline: ''
  });
  const [updateAmount, setUpdateAmount] = useState('');

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      const response = await axios.get('/api/goals?user_id=1');
      setGoals(response.data);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddGoal = async () => {
    if (!newGoal.title || !newGoal.target_amount || !newGoal.deadline) {
      alert('Please fill in all fields');
      return;
    }

    try {
      await axios.post('/api/goals?user_id=1', {
        title: newGoal.title,
        target_amount: parseFloat(newGoal.target_amount),
        deadline: new Date(newGoal.deadline).toISOString()
      });
      
      fetchGoals();
      setShowAddModal(false);
      setNewGoal({ title: '', target_amount: '', deadline: '' });
    } catch (error) {
      console.error('Error adding goal:', error);
    }
  };

  const handleUpdateProgress = async () => {
    if (!updateAmount || !selectedGoal) return;

    try {
      await axios.put(`/api/goals/${selectedGoal.id}`, {
        current_amount: parseFloat(updateAmount)
      });
      
      fetchGoals();
      setShowUpdateModal(false);
      setSelectedGoal(null);
      setUpdateAmount('');
    } catch (error) {
      console.error('Error updating goal:', error);
    }
  };

  const handleCompleteGoal = async (goalId) => {
    try {
      await axios.put(`/api/goals/${goalId}`, {
        completed: true
      });
      fetchGoals();
    } catch (error) {
      console.error('Error completing goal:', error);
    }
  };

  const calculateDaysLeft = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProgressColor = (progress) => {
    if (progress >= 75) return '#4ade80';
    if (progress >= 50) return '#fbbf24';
    if (progress >= 25) return '#ff8555';
    return '#ef4444';
  };

  if (loading) {
    return (
      <div className="goals-loading">
        <div className="loading"></div>
      </div>
    );
  }

  const activeGoals = goals.filter(g => !g.completed);
  const completedGoals = goals.filter(g => g.completed);

  return (
    <div className="goals">
      <div className="goals-header">
        <div>
          <h1>Savings Goals</h1>
          <p className="goals-subtitle">Set targets and track your progress</p>
        </div>
        <button className="btn" onClick={() => setShowAddModal(true)}>
          <Plus size={20} />
          New Goal
        </button>
      </div>

      <div className="goals-stats">
        <div className="stat">
          <Target size={20} />
          <div>
            <h3>{activeGoals.length}</h3>
            <p>Active Goals</p>
          </div>
        </div>
        <div className="stat">
          <CheckCircle size={20} />
          <div>
            <h3>{completedGoals.length}</h3>
            <p>Completed</p>
          </div>
        </div>
        <div className="stat">
          <DollarSign size={20} />
          <div>
            <h3>${activeGoals.reduce((sum, g) => sum + g.current_amount, 0).toFixed(0)}</h3>
            <p>Total Saved</p>
          </div>
        </div>
        <div className="stat">
          <TrendingUp size={20} />
          <div>
            <h3>{activeGoals.length > 0 ? Math.round(activeGoals.reduce((sum, g) => sum + (g.current_amount / g.target_amount * 100), 0) / activeGoals.length) : 0}%</h3>
            <p>Avg Progress</p>
          </div>
        </div>
      </div>

      <div className="goals-section">
        <h2>Active Goals</h2>
        <div className="goals-grid">
          {activeGoals.map((goal) => {
            const progress = (goal.current_amount / goal.target_amount) * 100;
            const daysLeft = calculateDaysLeft(goal.deadline);
            
            return (
              <div key={goal.id} className="goal-card">
                <div className="goal-header">
                  <Target size={20} style={{ color: getProgressColor(progress) }} />
                  <h3>{goal.title}</h3>
                </div>
                
                <div className="goal-amount">
                  <span className="current">${goal.current_amount.toFixed(2)}</span>
                  <span className="separator">/</span>
                  <span className="target">${goal.target_amount.toFixed(2)}</span>
                </div>
                
                <div className="goal-progress">
                  <div className="progress-bar">
                    <div 
                      className="progress-fill"
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        background: getProgressColor(progress)
                      }}
                    />
                  </div>
                  <span className="progress-text">{progress.toFixed(1)}%</span>
                </div>
                
                <div className="goal-deadline">
                  <Calendar size={14} />
                  <span className={daysLeft < 7 ? 'urgent' : ''}>
                    {daysLeft > 0 ? `${daysLeft} days left` : 'Overdue'}
                  </span>
                </div>
                
                <div className="goal-actions">
                  <button 
                    className="btn-secondary"
                    onClick={() => {
                      setSelectedGoal(goal);
                      setUpdateAmount(goal.current_amount.toString());
                      setShowUpdateModal(true);
                    }}
                  >
                    Update Progress
                  </button>
                  {progress >= 100 && (
                    <button 
                      className="btn"
                      onClick={() => handleCompleteGoal(goal.id)}
                    >
                      Mark Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {completedGoals.length > 0 && (
        <div className="goals-section">
          <h2>Completed Goals</h2>
          <div className="completed-goals">
            {completedGoals.map((goal) => (
              <div key={goal.id} className="completed-goal">
                <CheckCircle size={20} className="completed-icon" />
                <div className="completed-info">
                  <h4>{goal.title}</h4>
                  <p>Saved ${goal.target_amount.toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Create New Goal</h2>
            
            <div className="form-group">
              <label>Goal Title</label>
              <input
                type="text"
                className="input"
                placeholder="e.g., New Gaming Console"
                value={newGoal.title}
                onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Target Amount ($)</label>
              <input
                type="number"
                className="input"
                placeholder="500.00"
                value={newGoal.target_amount}
                onChange={(e) => setNewGoal({...newGoal, target_amount: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label>Deadline</label>
              <input
                type="date"
                className="input"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
              />
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowAddModal(false)}>
                Cancel
              </button>
              <button className="btn" onClick={handleAddGoal}>
                Create Goal
              </button>
            </div>
          </div>
        </div>
      )}

      {showUpdateModal && selectedGoal && (
        <div className="modal-overlay" onClick={() => setShowUpdateModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Update Progress: {selectedGoal.title}</h2>
            
            <div className="form-group">
              <label>Current Amount Saved ($)</label>
              <input
                type="number"
                className="input"
                placeholder="0.00"
                value={updateAmount}
                onChange={(e) => setUpdateAmount(e.target.value)}
              />
              <p className="form-hint">
                Target: ${selectedGoal.target_amount.toFixed(2)}
              </p>
            </div>

            <div className="modal-actions">
              <button className="btn-secondary" onClick={() => setShowUpdateModal(false)}>
                Cancel
              </button>
              <button className="btn" onClick={handleUpdateProgress}>
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Goals;