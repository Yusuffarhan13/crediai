import React, { useState, useEffect } from 'react';
import { Bell, X, Check, AlertCircle, Info, AlertTriangle, DollarSign, TrendingUp, Calendar, CreditCard } from 'lucide-react';
import '../styles/NotificationSystem.css';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showPanel, setShowPanel] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const notificationTypes = {
    success: { icon: <Check size={20} />, color: '#4caf50' },
    warning: { icon: <AlertTriangle size={20} />, color: '#ff9800' },
    info: { icon: <Info size={20} />, color: '#2196f3' },
    error: { icon: <AlertCircle size={20} />, color: '#f44336' },
    payment: { icon: <DollarSign size={20} />, color: '#9c27b0' },
    trend: { icon: <TrendingUp size={20} />, color: '#00bcd4' },
    reminder: { icon: <Calendar size={20} />, color: '#ff5722' },
    card: { icon: <CreditCard size={20} />, color: '#607d8b' }
  };

  useEffect(() => {
    const sampleNotifications = [
      {
        id: 1,
        type: 'success',
        title: 'Credit Score Improved!',
        message: 'Your credit score has increased by 15 points this month.',
        timestamp: new Date(Date.now() - 1000 * 60 * 5),
        read: false
      },
      {
        id: 2,
        type: 'reminder',
        title: 'Bill Payment Due',
        message: 'Your electricity bill of $125 is due in 3 days.',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        read: false
      },
      {
        id: 3,
        type: 'warning',
        title: 'Unusual Spending Detected',
        message: 'You\'ve spent 40% more on dining this week compared to your average.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60),
        read: false
      },
      {
        id: 4,
        type: 'info',
        title: 'New Feature Available',
        message: 'Check out our new budgeting tools in the Goals section!',
        timestamp: new Date(Date.now() - 1000 * 60 * 120),
        read: true
      },
      {
        id: 5,
        type: 'payment',
        title: 'Payment Received',
        message: 'Your salary of $3,500 has been credited to your account.',
        timestamp: new Date(Date.now() - 1000 * 60 * 180),
        read: true
      }
    ];

    setNotifications(sampleNotifications);
    updateUnreadCount(sampleNotifications);

    const interval = setInterval(() => {
      const randomNotifications = [
        {
          type: 'trend',
          title: 'Spending Trend Alert',
          message: 'Your monthly expenses are trending 12% lower than last month!'
        },
        {
          type: 'card',
          title: 'Card Reward Earned',
          message: 'You\'ve earned 500 reward points on your credit card.'
        },
        {
          type: 'info',
          title: 'Market Update',
          message: 'Interest rates have changed. Check how this affects your loans.'
        }
      ];

      const newNotification = {
        id: Date.now(),
        ...randomNotifications[Math.floor(Math.random() * randomNotifications.length)],
        timestamp: new Date(),
        read: false
      };

      setNotifications(prev => [newNotification, ...prev].slice(0, 20));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const updateUnreadCount = (notificationsList) => {
    const unread = notificationsList.filter(n => !n.read).length;
    setUnreadCount(unread);
  };

  const markAsRead = (id) => {
    setNotifications(prev => {
      const updated = prev.map(n =>
        n.id === id ? { ...n, read: true } : n
      );
      updateUnreadCount(updated);
      return updated;
    });
  };

  const markAllAsRead = () => {
    setNotifications(prev => {
      const updated = prev.map(n => ({ ...n, read: true }));
      updateUnreadCount(updated);
      return updated;
    });
  };

  const deleteNotification = (id) => {
    setNotifications(prev => {
      const updated = prev.filter(n => n.id !== id);
      updateUnreadCount(updated);
      return updated;
    });
  };

  const clearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const formatTimestamp = (date) => {
    const now = new Date();
    const diff = now - date;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };

  const addNotification = (type, title, message) => {
    const newNotification = {
      id: Date.now(),
      type,
      title,
      message,
      timestamp: new Date(),
      read: false
    };
    setNotifications(prev => [newNotification, ...prev]);
    setUnreadCount(prev => prev + 1);
  };

  useEffect(() => {
    window.addNotification = addNotification;
    return () => {
      delete window.addNotification;
    };
  }, []);

  return (
    <>
      <div className="notification-bell" onClick={() => setShowPanel(!showPanel)}>
        <Bell size={24} />
        {unreadCount > 0 && (
          <span className="notification-badge">{unreadCount > 9 ? '9+' : unreadCount}</span>
        )}
      </div>

      {showPanel && (
        <div className="notification-panel">
          <div className="notification-header">
            <h3>Notifications</h3>
            <div className="notification-actions">
              {unreadCount > 0 && (
                <button onClick={markAllAsRead} className="mark-all-read">
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button onClick={clearAll} className="clear-all">
                  Clear all
                </button>
              )}
              <button onClick={() => setShowPanel(false)} className="close-panel">
                <X size={20} />
              </button>
            </div>
          </div>

          <div className="notification-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">
                <Bell size={48} />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${!notification.read ? 'unread' : ''}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div 
                    className="notification-icon"
                    style={{ color: notificationTypes[notification.type].color }}
                  >
                    {notificationTypes[notification.type].icon}
                  </div>
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {formatTimestamp(notification.timestamp)}
                    </span>
                  </div>
                  <button
                    className="notification-delete"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(notification.id);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationSystem;