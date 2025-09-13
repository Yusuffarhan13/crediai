import React, { useState } from 'react';
import { BookOpen, TrendingUp, DollarSign, Play, Clock, Star, Lock, Unlock, Youtube, Code, Camera, Palette, Music, PenTool, Zap, Target } from 'lucide-react';
import './LearningHub.css';

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const categories = [
    { id: 'all', name: 'All Skills', icon: BookOpen },
    { id: 'tech', name: 'Tech & Coding', icon: Code },
    { id: 'creative', name: 'Creative', icon: Palette },
    { id: 'business', name: 'Business', icon: TrendingUp },
    { id: 'content', name: 'Content Creation', icon: Camera }
  ];

  const skills = [
    {
      id: 1,
      category: 'tech',
      title: 'Web Development',
      description: 'Build websites and earn $500-5000 per project',
      earnings: '$50-150/hour',
      duration: '3 months',
      level: 'Beginner',
      rating: 4.8,
      students: '15.2k',
      icon: Code,
      modules: [
        'HTML/CSS Basics',
        'JavaScript Fundamentals',
        'React.js',
        'Backend with Node.js',
        'Freelancing Tips'
      ],
      locked: false
    },
    {
      id: 2,
      category: 'content',
      title: 'TikTok Content Creation',
      description: 'Go viral and monetize your content',
      earnings: '$1k-10k/month',
      duration: '4 weeks',
      level: 'Beginner',
      rating: 4.9,
      students: '28.5k',
      icon: Youtube,
      modules: [
        'Finding Your Niche',
        'Viral Content Formula',
        'Editing Like a Pro',
        'Brand Partnerships',
        'Monetization Strategies'
      ],
      locked: false
    },
    {
      id: 3,
      category: 'creative',
      title: 'Digital Art & NFTs',
      description: 'Create and sell digital art as NFTs',
      earnings: '$100-10k per piece',
      duration: '6 weeks',
      level: 'Intermediate',
      rating: 4.7,
      students: '8.3k',
      icon: Palette,
      modules: [
        'Digital Art Basics',
        'Popular Art Styles',
        'NFT Marketplaces',
        'Marketing Your Art',
        'Building a Following'
      ],
      locked: false
    },
    {
      id: 4,
      category: 'business',
      title: 'Dropshipping Business',
      description: 'Start your e-commerce empire with zero inventory',
      earnings: '$2k-20k/month',
      duration: '2 months',
      level: 'Beginner',
      rating: 4.6,
      students: '12.1k',
      icon: DollarSign,
      modules: [
        'Finding Winning Products',
        'Setting Up Shopify',
        'Facebook Ads Mastery',
        'TikTok Marketing',
        'Scaling Your Store'
      ],
      locked: false
    },
    {
      id: 5,
      category: 'creative',
      title: 'Music Production',
      description: 'Produce beats and sell to artists worldwide',
      earnings: '$100-1k per beat',
      duration: '3 months',
      level: 'Intermediate',
      rating: 4.8,
      students: '6.7k',
      icon: Music,
      modules: [
        'FL Studio Basics',
        'Music Theory',
        'Mixing & Mastering',
        'Beat Selling Platforms',
        'Building Your Brand'
      ],
      locked: true
    },
    {
      id: 6,
      category: 'tech',
      title: 'AI & ChatGPT Mastery',
      description: 'Use AI tools to offer services and automate income',
      earnings: '$30-100/hour',
      duration: '1 month',
      level: 'Beginner',
      rating: 4.9,
      students: '32.4k',
      icon: Zap,
      modules: [
        'AI Tools Overview',
        'Prompt Engineering',
        'AI Content Creation',
        'Automation Workflows',
        'Selling AI Services'
      ],
      locked: false
    },
    {
      id: 7,
      category: 'content',
      title: 'YouTube Automation',
      description: 'Build faceless YouTube channels that earn passively',
      earnings: '$500-10k/month',
      duration: '2 months',
      level: 'Intermediate',
      rating: 4.7,
      students: '9.8k',
      icon: Youtube,
      modules: [
        'Niche Selection',
        'Content Research',
        'Video Creation Tools',
        'SEO & Thumbnails',
        'Monetization Methods'
      ],
      locked: true
    },
    {
      id: 8,
      category: 'creative',
      title: 'Graphic Design',
      description: 'Design logos, social media posts, and more',
      earnings: '$25-75/hour',
      duration: '2 months',
      level: 'Beginner',
      rating: 4.8,
      students: '18.9k',
      icon: PenTool,
      modules: [
        'Design Principles',
        'Canva Pro Mastery',
        'Adobe Creative Suite',
        'Client Management',
        'Portfolio Building'
      ],
      locked: false
    }
  ];

  const filteredSkills = selectedCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  const handleEnroll = (skillId) => {
    if (!enrolledCourses.includes(skillId)) {
      setEnrolledCourses([...enrolledCourses, skillId]);
      alert('Enrolled successfully! Let\'s get that bread! 💰');
    }
  };

  return (
    <div className="learning-hub">
      <div className="hub-header">
        <div>
          <h1>Learning Hub 🚀</h1>
          <p className="hub-subtitle">Learn skills that actually make money. No cap. 💯</p>
        </div>
        <div className="hub-stats">
          <div className="stat-badge">
            <Star size={16} />
            <span>3 Courses Completed</span>
          </div>
          <div className="stat-badge">
            <DollarSign size={16} />
            <span>$2,450 Earned</span>
          </div>
        </div>
      </div>

      <div className="motivation-banner">
        <div className="motivation-content">
          <h3>🔥 Hot Take</h3>
          <p>While your friends are scrolling, you could be learning a skill that pays $1000+ per month. The best time to start was yesterday. The second best time is now!</p>
        </div>
        <div className="motivation-stats">
          <div className="stat">
            <h4>82%</h4>
            <p>of teens who complete courses earn money within 3 months</p>
          </div>
          <div className="stat">
            <h4>$850</h4>
            <p>average first month earnings</p>
          </div>
        </div>
      </div>

      <div className="category-filter">
        {categories.map(category => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <Icon size={16} />
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>

      <div className="skills-grid">
        {filteredSkills.map(skill => {
          const Icon = skill.icon;
          const isEnrolled = enrolledCourses.includes(skill.id);
          
          return (
            <div key={skill.id} className={`skill-card ${skill.locked ? 'locked' : ''}`}>
              <div className="skill-header">
                <div className="skill-icon">
                  <Icon size={24} />
                </div>
                <div className="skill-meta">
                  <span className="skill-level">{skill.level}</span>
                  <span className="skill-duration">
                    <Clock size={12} />
                    {skill.duration}
                  </span>
                </div>
              </div>

              <h3 className="skill-title">{skill.title}</h3>
              <p className="skill-description">{skill.description}</p>

              <div className="skill-earnings">
                <DollarSign size={16} />
                <span>Potential: {skill.earnings}</span>
              </div>

              <div className="skill-stats">
                <div className="stat">
                  <Star size={14} />
                  <span>{skill.rating}</span>
                </div>
                <div className="stat">
                  <span>{skill.students} students</span>
                </div>
              </div>

              <div className="skill-modules">
                <h4>What you'll learn:</h4>
                <ul>
                  {skill.modules.slice(0, 3).map((module, index) => (
                    <li key={index}>{module}</li>
                  ))}
                  {skill.modules.length > 3 && (
                    <li className="more">+{skill.modules.length - 3} more modules</li>
                  )}
                </ul>
              </div>

              <div className="skill-action">
                {skill.locked ? (
                  <button className="btn-locked">
                    <Lock size={16} />
                    Unlock with 500 points
                  </button>
                ) : isEnrolled ? (
                  <button className="btn-continue">
                    <Play size={16} />
                    Continue Learning
                  </button>
                ) : (
                  <button className="btn-enroll" onClick={() => handleEnroll(skill.id)}>
                    Start Learning
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="success-stories">
        <h2>Success Stories 🏆</h2>
        <div className="stories-grid">
          <div className="story-card">
            <div className="story-header">
              <div className="story-avatar">JM</div>
              <div className="story-info">
                <h4>Jake M., 17</h4>
                <p>Web Development</p>
              </div>
            </div>
            <p className="story-content">
              "Started learning web dev 3 months ago. Just landed my first $2000 freelance project! This is literally life-changing fr fr"
            </p>
            <div className="story-earnings">💰 $3,500 earned</div>
          </div>

          <div className="story-card">
            <div className="story-header">
              <div className="story-avatar">AS</div>
              <div className="story-info">
                <h4>Aisha S., 16</h4>
                <p>TikTok Creator</p>
              </div>
            </div>
            <p className="story-content">
              "Went from 0 to 100k followers in 2 months! Now making $1500/month from brand deals. Better than any part-time job!"
            </p>
            <div className="story-earnings">💰 $4,200 earned</div>
          </div>

          <div className="story-card">
            <div className="story-header">
              <div className="story-avatar">CL</div>
              <div className="story-info">
                <h4>Carlos L., 18</h4>
                <p>Dropshipping</p>
              </div>
            </div>
            <p className="story-content">
              "My store hit $10k in sales last month! Paying for college myself now. Parents are shook lol"
            </p>
            <div className="story-earnings">💰 $15,000 earned</div>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Level Up? 📈</h2>
        <p>Join 50,000+ teens who are learning skills and securing the bag</p>
        <div className="cta-buttons">
          <button className="btn">Browse All Courses</button>
          <button className="btn-secondary">Get Personalized Recommendations</button>
        </div>
      </div>
    </div>
  );
};

export default LearningHub;