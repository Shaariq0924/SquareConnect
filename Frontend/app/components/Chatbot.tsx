"use client";

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, User } from 'lucide-react';
import '../styles/chatbot.css';

type Message = {
  id: string;
  sender: 'user' | 'bot';
  text: string;
};

// Extremely basic FAQ automated response logic
const generateBotResponse = (userInput: string): string => {
  const input = userInput.toLowerCase();
  
  if (input.includes('price') || input.includes('cost') || input.includes('quote') || input.includes('fee')) {
    return "Our rates vary depending on distance and vehicle type (e.g. SUV, 7-seater, or Sedan). Please use our booking form for an instant exact quote!";
  }
  if (input.includes('airport')) {
    return "Yes! We specialize in Sydney Airport transfers. We monitor flight times so your driver will be there even if your flight is delayed. Need to book a ride to the airport?";
  }
  if (input.includes('baby') || input.includes('seat') || input.includes('child')) {
    return "We prioritize safety and provide complimentary, pre-installed baby seats, booster seats, and toddler seats compliant with Australian standards. Just let us know during booking!";
  }
  if (input.includes('book') || input.includes('reserve')) {
    return "You can book easily right here on our website! Head over to our Booking page from the main menu, fill in your trip details, and we'll confirm your ride in minutes.";
  }
  if (input.includes('how many') || input.includes('passengers') || input.includes('fleet')) {
    return "We have Premium Sedans (up to 4 passengers), Luxury SUVs (up to 4 passengers with lots of luggage), 7-Seaters, and 11-Seater minibuses. Which one do you need?";
  }
  if (input.includes('hello') || input.includes('hi') || input.includes('hey')) {
    return "Hello there! Welcome to SquareConnect. How can I help you with your transport needs today?";
  }
  if (input.includes('contact') || input.includes('call') || input.includes('phone') || input.includes('whatsapp')) {
    return "You can reach us immediately by clicking the WhatsApp icon on the screen, or call us directly at +61 423699909.";
  }

  // Fallback response
  return "Thanks for your message! For detailed inquiries or complex bookings, I recommend chatting directly with our human dispatch team by clicking the WhatsApp floating icon!";
};

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'bot',
      text: 'Hi there! 👋 Welcome to SquareConnect. Do you have any questions about our vehicles, baby seats, or airport transfers?'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputValue.trim()
    };
    
    setMessages(prev => [...prev, userMsg]);
    const currentInput = inputValue.trim();
    setInputValue("");
    setIsTyping(true);

    // 2. Simulate bot "thinking" and respond
    setTimeout(() => {
      const botResponse = generateBotResponse(currentInput);
      setMessages(prev => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          text: botResponse
        }
      ]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // 1-2 second delay for realism
  };

  return (
    <div className="chatbot-container">
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button 
          className="chatbot-toggle" 
          onClick={() => setIsOpen(true)}
          aria-label="Open chat"
        >
          <MessageCircle size={28} />
        </button>
      )}

      {/* Expanded Chat Window */}
      {isOpen && (
        <div className="chatbot-window">
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <div className="chatbot-avatar">SC</div>
              <div className="chatbot-title">
                <h3>Support Assistant</h3>
                <p>Typically replies instantly</p>
              </div>
            </div>
            <button 
              className="chatbot-close" 
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="chatbot-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chatbot-message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            
            {isTyping && (
              <div className="chatbot-message bot message-typing">
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
                <span className="typing-dot"></span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form className="chatbot-input-container" onSubmit={handleSendMessage}>
            <input
              type="text"
              className="chatbot-input"
              placeholder="Type your question..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              autoFocus
            />
            <button 
              type="submit" 
              className="chatbot-send" 
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
