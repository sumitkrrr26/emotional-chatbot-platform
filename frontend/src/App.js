// Updated frontend/src/App.js with joke generator route

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import PersonaSelector from './components/PersonaSelector';
import ChatInterface from './components/ChatInterface';
import JokeGenerator from './components/JokeGenerator';

function App() {
  const [selectedPersona, setSelectedPersona] = useState(null);
  const [personas, setPersonas] = useState([]);
  const [currentPage, setCurrentPage] = useState('home'); // 'home', 'chat', 'jokes'

  useEffect(() => {
    // Fetch personas from backend
    const fetchPersonas = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5000'}/api/personas`
        );
        setPersonas(response.data);
      } catch (error) {
        console.error('Failed to fetch personas:', error);
      }
    };

    fetchPersonas();
  }, []);

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedPersona(null);
  };

  const handleSelectPersona = (personaId) => {
    setSelectedPersona(personaId);
    setCurrentPage('chat');
  };

  const handleOpenJokes = () => {
    setCurrentPage('jokes');
  };

  if (currentPage === 'chat' && selectedPersona) {
    return (
      <ChatInterface
        personaId={selectedPersona}
        persona={personas[selectedPersona]}
        onBack={handleBackToHome}
      />
    );
  }

  if (currentPage === 'jokes') {
    return (
      <div>
        <JokeGenerator />
        <button
          className="back-to-home-btn"
          onClick={handleBackToHome}
          style={{
            position: 'fixed',
            bottom: '20px',
            left: '20px',
            zIndex: 1000
          }}
        >
          ← Back Home
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="home-page">
        <div className="home-header">
          <h1>💬 Welcome to Emotional Chatbot</h1>
          <p>Your personal companion for meaningful conversations</p>
        </div>

        <div className="home-options">
          <div className="option-card chat-option" onClick={() => handleOpenJokes()}>
            <div className="option-emoji">😂</div>
            <h3>Joke Generator</h3>
            <p>Get random jokes to brighten your day</p>
          </div>

          <div className="option-card chat-option" onClick={handleBackToHome}>
            <div className="option-emoji">💬</div>
            <h3>Chat with Personas</h3>
            <p>Talk to different personas anytime</p>
          </div>
        </div>

        {/* Personas Grid */}
        <div className="personas-section">
          <h2>Who do you want to talk to?</h2>
          <div className="persona-grid">
            {Object.values(personas).map((persona) => (
              <div
                key={persona.id}
                className="persona-card"
                style={{ borderColor: persona.color }}
                onClick={() => handleSelectPersona(persona.id)}
              >
                <div className="persona-emoji">{persona.emoji}</div>
                <h3>{persona.name}</h3>
                <p>{persona.description}</p>
                <button className="start-chat-btn">Start Chat</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
