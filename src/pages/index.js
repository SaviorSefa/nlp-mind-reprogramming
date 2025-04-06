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
    <div className="flex flex-col h-screen">
      <Head>
        <title>Mind Reprogramming Assistant</title>
        <meta name="description" content="NLP Mind Reprogramming Assistant" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-between flex-1 w-full overflow-hidden">
        <div className="w-full max-w-4xl px-4 flex flex-col h-full">
          <h1 className="text-2xl font-medium text-center mt-8 mb-4">What Mental Programs Can We Reprogram Today?</h1>
          
          <div className="flex-1 overflow-y-auto mb-4 space-y-4">
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
          
          <div className="w-full mb-6">
            <div className="relative w-full">
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
                className="w-full p-3 border rounded-full border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div className="flex justify-center space-x-3 mt-4">
              <button 
                onClick={handleStartBeliefAssessment}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Identify Beliefs
              </button>
              <button 
                onClick={handleStartPowerDevelopment}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                Develop Power
              </button>
              <button 
                onClick={handleNLPProtocols}
                className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
              >
                NLP Protocols
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
