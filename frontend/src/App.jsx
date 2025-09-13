import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Goals from './components/Goals';
import Achievements from './components/Achievements';
import LearningHub from './components/LearningHub';
import IntroModal from './components/IntroModal';
import './styles/App.css';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('introCompleted');
    if (hasSeenIntro) {
      setShowIntro(false);
    }
  }, []);

  return (
    <Router>
      <div className="app">
        {showIntro && <IntroModal onComplete={() => setShowIntro(false)} />}
        <Sidebar 
          activeView={activeView} 
          setActiveView={setActiveView}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <main className={`main-content ${!isSidebarOpen ? 'sidebar-collapsed' : ''}`}>
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/goals" element={<Goals />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/learning-hub" element={<LearningHub />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;