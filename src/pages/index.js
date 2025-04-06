import Head from 'next/head';
import { useState, useEffect, useRef } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize with empty chat on first load
  useEffect(() => {
    if (messages.length === 0) {
      // Initial empty state
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (text) => {
    if (inputValue.trim()) {
      // Add user message
      const userMessage = { role: 'user', content: inputValue };
      setMessages(prev => [...prev, userMessage]);
      setInputValue('');
      setIsProcessing(true);

      // Process the message
      setTimeout(() => {
        processUserMessage(userMessage.content);
      }, 500);
    }
  };

  const handleStartBeliefAssessment = () => {
    const assistantMessage = {
      role: 'assistant',
      content: "Let's identify and transform a limiting belief that might be holding you back.\n\nPlease share a belief you have about yourself or the world that you feel may be limiting your potential. For example:\n- \"I'm not good enough to succeed in my career\"\n- \"I don't deserve love and happiness\"\n- \"I'm too old to start something new\"\n- \"I can't handle difficult situations\"\n\nWhat limiting belief would you like to work on today?"
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleStartPowerDevelopment = () => {
    const assistantMessage = {
      role: 'assistant',
      content: "I'd be happy to help you develop your personal power. Personal power is your ability to influence your environment and achieve your goals.\n\nAll personal power development features are available for free. I can guide you in developing several aspects of personal power:\n\n1. **Self-Awareness** - Understand your patterns, emotions, and triggers\n2. **Vision & Purpose** - Clarify your direction and connect with meaningful goals\n3. **Communication & Influence** - Enhance your ability to connect with and impact others\n4. **Resilience & Adaptability** - Build your capacity to bounce back from setbacks\n5. **Strategic Thinking** - Develop advanced planning and decision-making skills\n6. **Personal Presence** - Cultivate charisma and command attention\n\nWhich area would you like to focus on today?"
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleNLPProtocols = () => {
    const assistantMessage = {
      role: 'assistant',
      content: "I can help you with several things:\n\n1. **Identify and transform limiting beliefs** - I'll guide you through a process to recognize beliefs that may be holding you back\n\n2. **Develop personal power** - I can help you build your personal power in areas like self-awareness, communication, resilience\n\n3. **Run specific NLP protocols** - I can guide you through protocols like Submodality Belief Change, Timeline Reimprinting, or Swish Pattern\n\nWhat would you like to focus on today?"
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const processUserMessage = (content) => {
    // General response
    const assistantMessage = {
      role: 'assistant',
      content: "I can help you with several things:\n\n1. **Identify and transform limiting beliefs** - I'll guide you through a process to recognize beliefs that may be holding you back\n\n2. **Develop personal power** - I can help you build your personal power in areas like self-awareness, communication, resilience\n\n3. **Run specific NLP protocols** - I can guide you through protocols like Submodality Belief Change, Timeline Reimprinting, or Swish Pattern\n\nWhat would you like to focus on today?"
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Head>
        <title>Mind Reprogramming Assistant</title>
        <meta name="description" content="NLP Mind Reprogramming Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-3xl px-4">
          <h1 className="text-3xl font-medium text-center mt-8 mb-4 text-gray-800">
            What Mental Programs Can We Reprogram Today?
          </h1>
          
          <div className="flex-1 overflow-y-auto space-y-4 min-h-[400px] max-h-[500px] mb-8">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-sm ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          <div className="w-full mb-12 fixed bottom-0 left-0 right-0 max-w-3xl mx-auto px-4">
            <div className="relative w-full mb-4">
              <input
                type="text"
                placeholder="Ask anything"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage(inputValue);
                  }
                }}
                className="w-full p-4 pl-5 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base shadow-sm"
              />
            </div>
            
            <div className="flex justify-center space-x-2 mt-4">
              <button 
                onClick={handleStartBeliefAssessment}
                className="px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Identify Beliefs
              </button>
              <button 
                onClick={handleStartPowerDevelopment}
                className="px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                Develop Power
              </button>
              <button 
                onClick={handleNLPProtocols}
                className="px-5 py-2.5 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors text-sm font-medium"
              >
                NLP Protocols
              </button>
            </div>
            
            {/* Speech to text button */}
            <div className="absolute right-4 top-4">
              <button 
                className="text-gray-400 hover:text-gray-600"
                title="Voice input"
                onClick={() => {
                  // Speech recognition functionality can be implemented here
                  // This is a placeholder that preserves the button's presence
                  alert('Voice input functionality');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="w-full text-center text-sm text-gray-500 py-4 mt-auto">
        <p>By messaging, you agree to our Terms and have read our Privacy Policy</p>
      </footer>
    </div>
  );
}
