import React, { useState, useEffect } from 'react';
import { Trophy, Lock, Unlock, Star, Award, Zap } from 'lucide-react';
import { dataManager } from '../data/staticData';
import './Achievements.css';

const Achievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPoints, setTotalPoints] = useState(0);
  const [level, setLevel] = useState(1);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = () => {
    try {
      const achievementsData = dataManager.getAchievements();
      setAchievements(achievementsData);
      
      const points = achievementsData
        .filter(a => a.earned)
        .reduce((sum, a) => sum + a.points, 0);
      setTotalPoints(points);
      setLevel(Math.floor(points / 100) + 1);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUnlock = (achievementId) => {
    try {
      // In static mode, achievements are pre-determined
      // This function is kept for UI interaction but doesn't actually unlock
      alert('Achievement progress is tracked automatically!');
    } catch (error) {
      console.error('Error unlocking achievement:', error);
    }
  };

  const getLevelProgress = () => {
    const currentLevelPoints = totalPoints % 100;
    return currentLevelPoints;
  };

  const getNextLevelPoints = () => {
    return 100 - getLevelProgress();
  };

  if (loading) {
    return (
      <div className="achievements-loading">
        <div className="loading"></div>
      </div>
    );
  }

  const unlockedAchievements = achievements.filter(a => a.earned);
  const lockedAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="achievements">
      <div className="achievements-header">
        <div>
          <h1>Achievements</h1>
          <p className="achievements-subtitle">Earn points and unlock rewards as you improve your financial habits</p>
        </div>
      </div>

      <div className="level-card">
        <div className="level-info">
          <div className="level-badge">
            <Award size={32} />
            <span className="level-number">{level}</span>
          </div>
          <div className="level-details">
            <h2>Level {level} Financial Expert</h2>
            <p>{totalPoints} total points earned</p>
          </div>
        </div>
        
        <div className="level-progress">
          <div className="progress-header">
            <span>Progress to Level {level + 1}</span>
            <span>{getLevelProgress()}/100 XP</span>
          </div>
          <div className="xp-bar">
            <div 
              className="xp-fill"
              style={{ width: `${getLevelProgress()}%` }}
            />
          </div>
          <p className="progress-hint">
            {getNextLevelPoints()} points to next level
          </p>
        </div>
      </div>

      <div className="achievements-stats">
        <div className="stat">
          <Trophy size={20} />
          <div>
            <h3>{unlockedAchievements.length}</h3>
            <p>Unlocked</p>
          </div>
        </div>
        <div className="stat">
          <Lock size={20} />
          <div>
            <h3>{lockedAchievements.length}</h3>
            <p>Locked</p>
          </div>
        </div>
        <div className="stat">
          <Star size={20} />
          <div>
            <h3>{totalPoints}</h3>
            <p>Total Points</p>
          </div>
        </div>
        <div className="stat">
          <Zap size={20} />
          <div>
            <h3>{Math.round((unlockedAchievements.length / achievements.length) * 100)}%</h3>
            <p>Completion</p>
          </div>
        </div>
      </div>

      <div className="achievements-section">
        <h2>Unlocked Achievements</h2>
        <div className="achievements-grid">
          {unlockedAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card unlocked">
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-footer">
                  <span className="points">+{achievement.points} points</span>
                  <span className="unlocked-date">
                    Unlocked {new Date(achievement.earned_date || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <Unlock size={20} className="unlock-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="achievements-section">
        <h2>Locked Achievements</h2>
        <div className="achievements-grid">
          {lockedAchievements.map((achievement) => (
            <div key={achievement.id} className="achievement-card locked">
              <div className="achievement-icon locked">{achievement.icon}</div>
              <div className="achievement-content">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
                <div className="achievement-footer">
                  <span className="points">+{achievement.points} points</span>
                  <button 
                    className="unlock-btn"
                    onClick={() => handleUnlock(achievement.id)}
                  >
                    Unlock
                  </button>
                </div>
              </div>
              <Lock size={20} className="lock-icon" />
            </div>
          ))}
        </div>
      </div>

      <div className="rewards-section">
        <h2>Rewards & Benefits</h2>
        <div className="rewards-grid">
          <div className="reward-card">
            <div className="reward-level">Level 5</div>
            <h4>Budget Master</h4>
            <p>Unlock advanced budgeting tools and insights</p>
          </div>
          <div className="reward-card">
            <div className="reward-level">Level 10</div>
            <h4>Investment Guru</h4>
            <p>Access investment tracking and portfolio analysis</p>
          </div>
          <div className="reward-card">
            <div className="reward-level">Level 15</div>
            <h4>Financial Champion</h4>
            <p>Get personalized financial coaching sessions</p>
          </div>
          <div className="reward-card">
            <div className="reward-level">Level 20</div>
            <h4>Money Wizard</h4>
            <p>Unlock all premium features and exclusive content</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Achievements;