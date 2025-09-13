# CrediAI - AI-Powered Financial Assistant 💳🤖

An intelligent financial management platform designed for young adults to track spending, save money, and receive personalized AI-driven financial advice.

## 🌟 Features

### Core Features
- **🤖 AI Financial Assistant**: Chat with an AI that provides personalized financial advice
- **📊 Interactive Dashboard**: Real-time overview of your financial health with charts and metrics
- **💳 Transaction Tracking**: Monitor, categorize, and analyze your spending patterns
- **🎯 Goal Setting & Tracking**: Set financial goals and track progress
- **🏆 Gamified Achievements**: Earn rewards and badges for good financial habits
- **📚 Learning Hub**: Curated financial education resources
- **🎤 Voice Assistant**: Optional voice interaction for hands-free queries

### New in Latest Update
- **🚀 Intro Tour System**: Interactive onboarding tour showcasing all features
- **⚠️ MVP Disclaimer**: Clear notification about demo data usage
- **💬 Enhanced Chat**: Improved error handling with offline fallback responses
- **📱 Mobile Responsive**: Fully responsive design for all devices

## 🛠️ Tech Stack

### Frontend
- React 18 with Vite
- React Router v6
- Recharts for data visualization
- Lucide React for icons
- Modern CSS with gradients and animations

### Backend
- FastAPI (Python)
- SQLAlchemy ORM
- SQLite database
- Google Gemini AI (optional)
- ElevenLabs Voice API (optional)

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ and npm
- Python 3.8+
- Git

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/crediai.git
cd crediai
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
pip install -r requirements.txt
```

4. **Set up environment variables**
```bash
cp .env.example .env
# Edit .env and add your API keys (optional)
```

5. **Start the backend server**
```bash
python backend/main.py
```

6. **Start the frontend (in a new terminal)**
```bash
npm start
```

7. **Open your browser**
Navigate to `http://localhost:3000`

## 🔑 API Configuration (Optional)

The app works without API keys using fallback responses. For full AI features:

1. **Google Gemini API**
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Generate an API key
   - Add to `.env` as `GEMINI_API_KEY`

2. **ElevenLabs Voice API** (for voice responses)
   - Sign up at [ElevenLabs](https://elevenlabs.io/)
   - Get your API key
   - Add to `.env` as `ELEVENLABS_API_KEY`

## 🚂 Railway Deployment

This project is configured for easy deployment on Railway:

1. **Fork or push this repository to GitHub**

2. **Connect to Railway**
   - Go to [Railway](https://railway.app/)
   - Create a new project
   - Connect your GitHub repository

3. **Configure Environment Variables**
   - Add your API keys in Railway dashboard
   - Set `PORT` variable (Railway provides this automatically)

4. **Deploy**
   - Railway will automatically build and deploy your app
   - Access your app at the provided Railway URL

### Railway Configuration Files
- `railway.json` - Railway deployment configuration
- `Procfile` - Specifies the start command
- Package.json includes `start:prod` script for production

## 📁 Project Structure

```
crediai/
├── frontend/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── styles/         # Component styles
│   │   ├── App.jsx         # Main app component
│   │   └── main.jsx        # Entry point
│   └── index.html
├── backend/
│   ├── main.py            # FastAPI server
│   ├── database.py        # Database models
│   ├── models.py          # Pydantic schemas
│   └── mock_data.py       # Demo data generator
├── package.json           # Frontend dependencies
├── requirements.txt       # Backend dependencies
├── vite.config.js        # Vite configuration
├── railway.json          # Railway deployment config
└── Procfile             # Railway start command
```

## 🎮 Usage Guide

### First Time Users
1. On first visit, you'll see an introduction modal
2. Follow the interactive tour to learn about all features
3. The tour can be skipped or revisited anytime

### Chat Assistant
- Ask any financial question
- Get personalized advice based on your profile
- Works offline with smart fallback responses

### Dashboard
- View credit score, spending trends
- See recent transactions
- Get AI recommendations

### Features
- **Transactions**: Track and categorize expenses
- **Goals**: Set savings targets with deadlines
- **Achievements**: Unlock badges for financial milestones
- **Learning Hub**: Access educational content

## 🧪 Demo Mode

This is an MVP with simulated data for demonstration:
- All financial data is randomly generated
- AI responses are contextual but not connected to real accounts
- Perfect for testing and development

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🆘 Support

For issues or questions:
- Open an issue on GitHub
- Contact the development team

## 🎯 Roadmap

- [ ] Real banking API integration
- [ ] Multi-currency support
- [ ] Advanced budgeting tools
- [ ] Investment tracking
- [ ] Bill reminders
- [ ] Expense predictions
- [ ] Social features (compare with peers)
- [ ] Mobile app (React Native)

---

Built with ❤️ for financial empowerment of young adults