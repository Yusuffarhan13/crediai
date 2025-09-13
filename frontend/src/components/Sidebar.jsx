import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  MessageSquare, 
  LayoutDashboard, 
  Receipt, 
  Target, 
  Trophy,
  BookOpen,
  Menu,
  X,
  DollarSign
} from 'lucide-react';
import './Sidebar.css';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  
  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { path: '/learning-hub', icon: BookOpen, label: 'Learning Hub' },
    { path: '/transactions', icon: Receipt, label: 'Money Tracker' },
    { path: '/goals', icon: Target, label: 'Savings Goals' },
    { path: '/achievements', icon: Trophy, label: 'Achievements' },
    { path: '/chat', icon: MessageSquare, label: 'AI Support' }
  ];

  return (
    <div className={`sidebar ${!isOpen ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <DollarSign size={24} className="logo-icon" />
          {isOpen && <span className="logo-text">CrediAI</span>}
        </div>
        <button 
          className="toggle-btn"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map(({ path, icon: Icon, label }) => (
          <Link
            key={path}
            to={path}
            className={`nav-item ${location.pathname === path ? 'active' : ''}`}
          >
            <Icon size={20} />
            {isOpen && <span>{label}</span>}
          </Link>
        ))}
      </nav>
      
      {isOpen && (
        <div className="sidebar-footer">
          <div className="user-info">
            <div className="user-avatar">YF</div>
            <div className="user-details">
              <div className="user-name">Yusuf Farhan</div>
              <div className="user-status">Level 3 Money Maker 💰</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;