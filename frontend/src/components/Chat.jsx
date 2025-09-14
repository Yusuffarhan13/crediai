import React, { useState, useEffect, useRef } from 'react';
import { Send, Mic, MicOff, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { getChatResponse } from '../data/staticData';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Initialize with a welcome message
    setMessages([{
      type: 'ai',
      content: "Hey there! I'm CrediAI, your personal financial assistant. I'm here to help you manage your money, save for your goals, and learn about smart financial habits. What would you like to know?",
      timestamp: new Date()
    }]);

    // Setup speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        if (event.results[0].isFinal) {
          setInputMessage(transcript);
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const responseText = getChatResponse(inputMessage);

      const aiMessage = {
        type: 'ai',
        content: responseText,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);

      // Voice functionality disabled in static mode
      // if (voiceEnabled && response.data.audio_url) {
      //   playAudio(response.data.audio_url);
      // }
    } catch (error) {
      console.error('Error sending message:', error);
      // Generate a fallback response based on the message
      const fallbackResponses = {
        'budget': "💰 Here's a quick tip: Follow the 50/30/20 rule - 50% needs, 30% wants, 20% savings. Track every expense to see where your money goes!",
        'save': "🎯 Start small! Save just LKR 100 daily and you'll have LKR 36,500 in a year. Automate it so you don't even think about it!",
        'credit': "📈 To boost your credit score: Pay bills on time, keep credit utilization under 30%, and don't close old accounts. Consistency is key!",
        'invest': "📊 New to investing? Start with index funds or ETFs. They're diversified and beginner-friendly. Remember: time in the market beats timing the market!",
        'debt': "🎪 Try the avalanche method: Pay minimums on all debts, then attack the highest interest rate first. You'll save money in the long run!",
        'expense': "✂️ Cut expenses by reviewing subscriptions monthly, meal prepping, and using the 24-hour rule before any non-essential purchase!"
      };
      
      let responseContent = "I'm currently offline but I can still help! ";
      const lowerMessage = inputMessage.toLowerCase();
      
      // Find relevant fallback response
      for (const [key, value] of Object.entries(fallbackResponses)) {
        if (lowerMessage.includes(key)) {
          responseContent = value;
          break;
        }
      }
      
      // If no specific match, give general advice
      if (responseContent === "I'm currently offline but I can still help! ") {
        responseContent += "💡 Remember: Track expenses, save consistently, and invest in your financial education. Every small step counts towards financial freedom!";
      }
      
      const errorMessage = {
        type: 'ai',
        content: responseContent,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const playAudio = (audioUrl) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setIsSpeaking(true);
    audioRef.current.onended = () => {
      setIsSpeaking(false);
    };
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleVoice = () => {
    setVoiceEnabled(!voiceEnabled);
    if (audioRef.current && isSpeaking) {
      audioRef.current.pause();
      setIsSpeaking(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <div className="chat-title">
          <Sparkles size={20} className="chat-icon" />
          <h2>AI Financial Assistant</h2>
        </div>
        <button 
          className={`voice-toggle ${voiceEnabled ? 'active' : ''}`}
          onClick={toggleVoice}
        >
          {voiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </button>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.type}`}>
            <div className="message-avatar">
              {message.type === 'user' ? 'AT' : 'AI'}
            </div>
            <div className="message-content">
              <p>{message.content}</p>
              <span className="message-time">
                {message.timestamp.toLocaleTimeString([], { 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </span>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message ai">
            <div className="message-avatar">AI</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-container">
        <div className="chat-input-wrapper">
          <textarea
            className="chat-input"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Ask me anything about managing your money..."
            rows="1"
          />
          <div className="chat-actions">
            <button 
              className={`action-btn ${isListening ? 'listening' : ''}`}
              onClick={toggleListening}
            >
              {isListening ? <MicOff size={20} /> : <Mic size={20} />}
            </button>
            <button 
              className="send-btn"
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isLoading}
            >
              <Send size={20} />
            </button>
          </div>
        </div>
        <div className="input-hint">
          Press Enter to send • {isListening ? 'Listening...' : 'Click mic to speak'}
        </div>
      </div>
    </div>
  );
};

export default Chat;