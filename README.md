# CrediAI - AI Financial Assistant for Teenagers

A polished web-based MVP featuring an AI-powered financial assistant designed specifically for teenagers. Built with a Claude AI-inspired dark theme for a professional and modern look.

## Features

- **AI Chat Assistant**: Conversational AI powered by Gemini API for financial guidance
- **Voice Integration**: 
  - Text-to-speech using ElevenLabs API
  - Voice input using Web Speech API
- **Financial Dashboard**: Real-time overview of finances with charts and metrics
- **Transaction Management**: Track income and expenses with categorization
- **Savings Goals**: Set and monitor progress toward financial goals
- **Gamification**: Achievements system with points and levels
- **Claude AI-Inspired UI**: Professional dark theme with smooth animations

## Tech Stack

- **Backend**: FastAPI (Python)
- **Frontend**: React.js with Vite
- **Database**: SQLite with mock data
- **AI Integration**: Google Gemini API
- **Voice**: ElevenLabs API & Web Speech API
- **Styling**: Custom CSS with Claude AI-inspired design

## Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- API Keys (optional but recommended):
  - Google Gemini API key
  - ElevenLabs API key

### Backend Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env and add your API keys (optional - app works without them)
```

3. Run the FastAPI server:
```bash
cd backend
python main.py
```

The backend will start on http://localhost:8000

### Frontend Setup

1. Install Node dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm start
```

The frontend will start on http://localhost:3000

## Usage

1. Open http://localhost:3000 in your browser
2. Navigate through the sidebar:
   - **AI Assistant**: Chat with the financial AI assistant
   - **Dashboard**: View financial overview and metrics
   - **Transactions**: Manage income and expenses
   - **Goals**: Set and track savings goals
   - **Achievements**: View progress and unlock rewards

## API Endpoints

- `POST /api/chat` - Process chat messages
- `POST /api/voice-response` - Get voice response
- `GET /api/dashboard` - Get dashboard data
- `GET /api/transactions` - List transactions
- `POST /api/transactions` - Add transaction
- `GET /api/goals` - List goals
- `POST /api/goals` - Create goal
- `PUT /api/goals/{id}` - Update goal
- `GET /api/achievements` - List achievements
- `POST /api/achievements/{id}/unlock` - Unlock achievement

## Features Without API Keys

The app is fully functional without API keys:
- Chat will provide helpful financial advice (without Gemini AI)
- Voice features will be disabled but chat remains functional
- All other features work normally with mock data

## Mock Data

The app comes with pre-populated mock data including:
- Sample user profile (Alex Teen, age 16)
- 50 sample transactions across various categories
- 4 active savings goals
- 6 achievements (some locked, some unlocked)

## Development

- Backend runs on port 8000
- Frontend runs on port 3000
- Vite proxy configured to forward /api requests to backend
- Hot reload enabled for both frontend and backend

## License

MIT