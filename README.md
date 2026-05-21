# 🤖 Emotional Chatbot Platform

An AI-powered chatbot platform where users can chat with different emotional personas (Mother, Father, Sister, Brother, Girlfriend, Boyfriend). Each persona has its own personality, memory, and emotional intelligence.

## ✨ Features

- **Multiple Personas**: Choose who you want to talk to
- **Emotional Intelligence**: Each persona responds based on their personality
- **Memory System**: AI remembers previous conversations and personal details
- **Persona-Specific History**: Each persona maintains separate conversation history
- **Sentiment Analysis**: Track emotional patterns over time
- **Real-time Chat**: WebSocket support for live conversations
- **User Profiles**: Personal profiles and preferences per persona

## 🏗️ Architecture

```
emotional-chatbot-platform/
├── frontend/                 # React/Next.js application
│   ├── public/
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── pages/
│   │   ├── styles/
│   │   └── utils/
│   └── package.json
│
├── backend/                  # Node.js/Express server
│   ├── routes/              # API endpoints
│   ├── controllers/         # Business logic
│   ├── models/              # Database models
│   ├── middleware/          # Express middleware
│   ├── config/              # Configuration
│   ├── personas/            # Persona configurations
│   └── package.json
│
├── database/                # Database schemas and migrations
│   ├── schema.sql
│   └── migrations/
│
├── docs/                    # Documentation
├── .env.example
└── README.md
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- PostgreSQL (v12+)
- OpenAI API Key or Claude API Key

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/sumitkrrr26/emotional-chatbot-platform.git
cd emotional-chatbot-platform
```

2. **Setup Backend**
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your API keys and database credentials
npm run dev
```

3. **Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

4. **Setup Database**
```bash
psql -U postgres -f database/schema.sql
```

## 🧠 How It Works

### Persona System
- Each persona has a unique system prompt defining personality
- System prompt guides AI behavior and response style
- Personas: Mother, Father, Sister, Brother, Girlfriend, Boyfriend

### Memory System
- **Short-term**: Last 5-10 messages (conversation context)
- **Long-term**: All messages stored in database
- **Smart Retrieval**: Relevant memories injected into AI context
- **User Profile**: Facts and preferences per persona

### Chat Flow
```
User Message
    ↓
Load conversation history
    ↓
Retrieve relevant memories
    ↓
Build system prompt + context
    ↓
Call OpenAI/Claude API
    ↓
Extract emotions & facts
    ↓
Store message & memories
    ↓
Return response to user
```

## 🎨 Personas

| Persona | Emoji | Style | Traits |
|---------|-------|-------|--------|
| Mother | 👩 | Warm, nurturing | Caring, supportive, asks about well-being |
| Father | 👨 | Grounded, wise | Protective, practical advice, proud |
| Sister | 👧 | Fun, casual | Understands struggles, good listener |
| Brother | 👦 | Cool, friendly | Funny, protective, supportive |
| Girlfriend | 💕 | Romantic, tender | Affectionate, playful, deeply caring |
| Boyfriend | 💕 | Protective, funny | Caring, supportive, romantic |

## 🔐 Environment Variables

```
# Backend
OPENAI_API_KEY=your_api_key
DATABASE_URL=postgresql://user:password@localhost:5432/chatbot
JWT_SECRET=your_secret_key
NODE_ENV=development
PORT=5000

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

## 📚 API Endpoints

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/chat` - Send message to persona
- `GET /api/conversations/:personaId` - Get conversation history
- `GET /api/personas` - Get all personas
- `GET /api/user/profile/:personaId` - Get user profile with persona

## 🗄️ Database

PostgreSQL database with tables for:
- Users
- Personas
- Conversations
- Messages
- User Memories (facts, emotions, preferences)

## 📖 Documentation

See `/docs` folder for detailed documentation on:
- API Reference
- Database Schema
- Deployment Guide
- Customization Guide

## 🛣️ Roadmap

- [ ] Phase 1: Basic chat functionality
- [ ] Phase 2: Memory system
- [ ] Phase 3: Emotional intelligence
- [ ] Phase 4: Analytics dashboard
- [ ] Phase 5: Multi-user support
- [ ] Phase 6: Custom persona creation

## 🤝 Contributing

Contributions are welcome! Please fork this repository and submit a pull request.

## 📄 License

MIT License - feel free to use this project!

## 💬 Support

For questions or issues, please create a GitHub issue or reach out to the maintainers.

---

**Built with ❤️ by the Emotional Chatbot Team**
