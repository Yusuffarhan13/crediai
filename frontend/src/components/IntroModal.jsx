import React, { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft, AlertCircle, Home, MessageSquare, Target, Trophy, BookOpen, CreditCard, Bell } from 'lucide-react';
import '../styles/IntroModal.css';

const IntroModal = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTour, setShowTour] = useState(false);

  const tourSteps = [
    {
      title: "Welcome to CrediAI",
      icon: <AlertCircle size={48} />,
      description: "This is an MVP demonstration using sample data for testing purposes. All financial data, transactions, and AI responses shown are simulated for demonstration only.",
      highlight: null
    },
    {
      title: "Dashboard Overview",
      icon: <Home size={48} />,
      description: "Your central hub for financial insights. View your credit score, spending trends, recent transactions, and personalized AI recommendations all in one place.",
      highlight: "dashboard"
    },
    {
      title: "AI Financial Assistant",
      icon: <MessageSquare size={48} />,
      description: "Get instant, personalized financial advice. Ask questions about budgeting, credit improvement, investment strategies, or any financial topic.",
      highlight: "chat"
    },
    {
      title: "Transactions Tracker",
      icon: <CreditCard size={48} />,
      description: "Monitor all your financial transactions in real-time. Categorize expenses, track spending patterns, and identify areas for savings.",
      highlight: "transactions"
    },
    {
      title: "Financial Goals",
      icon: <Target size={48} />,
      description: "Set and track your financial objectives. Whether it's saving for a house, paying off debt, or building an emergency fund, we help you stay on track.",
      highlight: "goals"
    },
    {
      title: "Achievements & Rewards",
      icon: <Trophy size={48} />,
      description: "Gamify your financial journey! Earn badges and rewards for reaching milestones, maintaining good habits, and improving your financial health.",
      highlight: "achievements"
    },
    {
      title: "Learning Hub",
      icon: <BookOpen size={48} />,
      description: "Access curated financial education resources. From beginner basics to advanced strategies, expand your financial knowledge at your own pace.",
      highlight: "learning"
    },
    {
      title: "Smart Notifications",
      icon: <Bell size={48} />,
      description: "Stay informed with intelligent alerts about important financial events, bill reminders, unusual spending, and opportunities to save.",
      highlight: "notifications"
    }
  ];

  const handleNext = () => {
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('introCompleted', 'true');
    onComplete();
  };

  const handleStartTour = () => {
    setShowTour(true);
    setCurrentStep(1);
  };

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem('introCompleted');
    if (hasSeenIntro) {
      onComplete();
    }
  }, [onComplete]);

  const currentStepData = tourSteps[currentStep];

  return (
    <div className="intro-modal-overlay">
      <div className="intro-modal">
        <button className="intro-close" onClick={handleComplete}>
          <X size={24} />
        </button>

        <div className="intro-content">
          <div className="intro-icon">
            {currentStepData.icon}
          </div>

          <h2 className="intro-title">{currentStepData.title}</h2>
          
          <p className="intro-description">
            {currentStepData.description}
          </p>

          {currentStep === 0 && (
            <div className="disclaimer-box">
              <AlertCircle size={20} />
              <p>
                <strong>Important:</strong> This is a demonstration environment. 
                The data structure and features will be significantly enhanced in the production version.
              </p>
            </div>
          )}

          <div className="intro-progress">
            {tourSteps.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
              />
            ))}
          </div>

          <div className="intro-actions">
            {currentStep > 0 && (
              <button className="intro-btn secondary" onClick={handlePrevious}>
                <ChevronLeft size={20} />
                Previous
              </button>
            )}

            {currentStep === 0 ? (
              <button className="intro-btn primary" onClick={handleStartTour}>
                Start Tour
                <ChevronRight size={20} />
              </button>
            ) : (
              <button className="intro-btn primary" onClick={handleNext}>
                {currentStep === tourSteps.length - 1 ? 'Get Started' : 'Next'}
                <ChevronRight size={20} />
              </button>
            )}
          </div>

          <button className="intro-skip" onClick={handleComplete}>
            Skip Tour
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntroModal;