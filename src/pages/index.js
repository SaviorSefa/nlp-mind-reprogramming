import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { SpeechToText } from '../components/common/SpeechUtils'
import ClientOnly from '../components/common/ClientOnly'

export default function Home() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello! I\'m your NLP Mind Reprogramming assistant. I can help you identify and transform limiting beliefs, or develop your personal power. All features are available for free. How would you like to begin today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef(null);

  // Suggestion chips
  const suggestions = [
    { text: "Identify a limiting belief", action: () => startBeliefAssessment() },
    { text: "Develop personal power", action: () => startPowerDevelopment() },
    { text: "Run Submodality Belief Change", action: () => startSpecificProtocol('submodality') },
    { text: "Run Timeline Reimprinting", action: () => startSpecificProtocol('timeline') },
    { text: "Run Walking Belief Change", action: () => startSpecificProtocol('walking') }
  ];

  // Check for API key on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('straico_api_key');
    if (storedKey) {
      setHasApiKey(true);
    }
  }, []);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    // Add user message
    const userMessage = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsProcessing(true);
    
    // Process the message
    setTimeout(() => {
      processUserMessage(userMessage.content);
    }, 500);
  };

  const handleSuggestionClick = (suggestion) => {
    // Add user message with the suggestion text
    const userMessage = { role: 'user', content: suggestion.text };
    setMessages(prev => [...prev, userMessage]);
    
    // Execute the suggestion action
    setIsProcessing(true);
    setTimeout(() => {
      suggestion.action();
    }, 500);
  };

  const processUserMessage = (content) => {
    const lowerContent = content.toLowerCase();
    
    // Check for session-specific responses
    if (currentSession) {
      handleSessionMessage(content);
      return;
    }
    
    // Handle different intents
    if (lowerContent.includes('limiting belief') || lowerContent.includes('belief') || lowerContent.includes('transform')) {
      startBeliefAssessment();
    } else if (lowerContent.includes('personal power') || lowerContent.includes('develop power')) {
      startPowerDevelopment();
    } else if (lowerContent.includes('submodality')) {
      startSpecificProtocol('submodality');
    } else if (lowerContent.includes('timeline')) {
      startSpecificProtocol('timeline');
    } else if (lowerContent.includes('walking')) {
      startSpecificProtocol('walking');
    } else if (lowerContent.includes('api') || lowerContent.includes('key') || lowerContent.includes('setup')) {
      startApiSetup();
    } else {
      // General response
      const assistantMessage = {
        role: 'assistant',
        content: `I can help you with several things:
        
1. **Identify and transform limiting beliefs** - I'll guide you through a process to recognize beliefs that may be holding you back, and help you change them using proven NLP techniques.

2. **Develop personal power** - I can help you build your personal power in areas like self-awareness, communication, resilience, and more.

3. **Run specific NLP protocols** - I can guide you through protocols like Submodality Belief Change, Timeline Reimprinting, or the Walking Belief Change Pattern.

What would you like to focus on today?`
      };
      setMessages(prev => [...prev, assistantMessage]);
    }
    
    setIsProcessing(false);
  };

  const handleSessionMessage = (content) => {
    if (currentSession === 'belief_assessment') {
      handleBeliefAssessmentSession(content);
    } else if (currentSession === 'power_development') {
      handlePowerDevelopmentSession(content);
    } else if (currentSession === 'api_setup') {
      handleApiSetupSession(content);
    } else if (currentSession === 'protocol') {
      handleProtocolSession(content);
    }
  };

  const startBeliefAssessment = () => {
    setCurrentSession('belief_assessment');
    const assistantMessage = {
      role: 'assistant',
      content: `Let's identify and transform a limiting belief that might be holding you back. 

Please share a belief you have about yourself or the world that you feel may be limiting your potential. For example:
- "I'm not good enough to succeed in my career"
- "I don't deserve love and happiness"
- "I'm too old to start something new"
- "I can't handle difficult situations"

What limiting belief would you like to work on today?`
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleBeliefAssessmentSession = (content) => {
    // This is a simplified version - in a real app, you would have more complex logic
    // to handle the multi-step belief assessment process
    const assistantMessage = {
      role: 'assistant',
      content: `I notice that your limiting belief is: "${content}"

This belief appears to be related to self-worth and capability. On a scale of 1-10, how strongly do you hold this belief?

All protocols and features are available for free. You have full access to:
- Submodality Belief Change Process
- Timeline Reimprinting
- The Walking Belief Change Pattern
- Mind-Lines Reframing
- Meta-State Belief Change
- And all other advanced protocols`
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    
    // Update the session to the next step
    setCurrentSession('belief_intensity');
    setIsProcessing(false);
  };

  const startPowerDevelopment = () => {
    setCurrentSession('power_development');
    const assistantMessage = {
      role: 'assistant',
      content: `I'd be happy to help you develop your personal power. Personal power is your ability to influence your environment, achieve your goals, and create the life you desire.

All personal power development features are available for free. I can guide you in developing several aspects of personal power:

1. **Self-Awareness** - Understand your patterns, emotions, and triggers
2. **Vision & Purpose** - Clarify your direction and connect with meaningful goals
3. **Communication & Influence** - Enhance your ability to connect with and impact others
4. **Resilience & Adaptability** - Build your capacity to bounce back from setbacks
5. **Strategic Thinking** - Develop advanced planning and decision-making skills
6. **Personal Presence** - Cultivate charisma and command attention

Which area would you like to focus on today?`
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const startSpecificProtocol = (protocolType) => {
    setCurrentSession('protocol');
    
    let protocolName = "NLP Protocol";
    let protocolDescription = "This protocol will help you transform your limiting beliefs.";
    
    if (protocolType === 'submodality') {
      protocolName = "Submodality Belief Change";
      protocolDescription = "This protocol works by changing how you represent beliefs in your mind, altering the submodalities (visual, auditory, and kinesthetic qualities) to transform limiting beliefs into empowering ones.";
    } else if (protocolType === 'timeline') {
      protocolName = "Timeline Reimprinting";
      protocolDescription = "This protocol helps you identify when a limiting belief was formed, and reimprint that moment with new resources and perspectives to create a more empowering belief.";
    } else if (protocolType === 'walking') {
      protocolName = "Walking Belief Change Pattern";
      protocolDescription = "This protocol uses physical movement to anchor new beliefs, creating a kinesthetic experience of transformation as you literally walk from your limiting belief to your new empowering belief.";
    }
    
    const assistantMessage = {
      role: 'assistant',
      content: `I'll guide you through the ${protocolName} Protocol.

${protocolDescription}

To begin, please share a limiting belief you'd like to transform using this protocol.`
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleProtocolSession = (content) => {
    // Simplified protocol response
    const assistantMessage = {
      role: 'assistant',
      content: `Thank you for sharing your limiting belief: "${content}"

Now, let's begin the protocol. I'll guide you through each step:

1. First, take a moment to notice how you currently represent this belief in your mind. Where do you see it? Is it an image, words, or a feeling?

2. Next, think about what you would prefer to believe instead. What would be a more empowering alternative?

Please share what you would prefer to believe instead.`
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handlePowerDevelopmentSession = (content) => {
    // Simplified power development response
    const lowerContent = content.toLowerCase();
    let area = "self-awareness"; // Default
    
    if (lowerContent.includes("vision") || lowerContent.includes("purpose")) {
      area = "vision";
    } else if (lowerContent.includes("communication") || lowerContent.includes("influence")) {
      area = "communication";
    } else if (lowerContent.includes("resilience") || lowerContent.includes("adaptability")) {
      area = "resilience";
    } else if (lowerContent.includes("strategic") || lowerContent.includes("thinking")) {
      area = "strategic";
    } else if (lowerContent.includes("presence") || lowerContent.includes("charisma")) {
      area = "presence";
    }
    
    const assistantMessage = {
      role: 'assistant',
      content: `Great choice! Let's work on developing your ${area}. 

I'll guide you through a series of exercises designed to strengthen this aspect of your personal power. These exercises are based on proven techniques from psychology, NLP, and leadership development.

Are you ready to begin the first exercise? (Type "yes" when you're ready)`
    };
    
    setMessages(prev => [...prev, assistantMessage]);
    setCurrentSession('power_exercise');
    setIsProcessing(false);
  };

  const startApiSetup = () => {
    setCurrentSession('api_setup');
    const assistantMessage = {
      role: 'assistant',
      content: `To enhance your experience with AI-powered belief analysis and personalized guidance, you can connect your Straico API key.

${hasApiKey ? 
  "It looks like you already have an API key set up. Would you like to update it?" : 
  "You don't have an API key set up yet. Would you like to add one now?"}

Your API key is stored securely on your device and is never sent to our servers.

To get a Straico API key, visit straico.com and sign up for an account.`
    };
    setMessages(prev => [...prev, assistantMessage]);
    setIsProcessing(false);
  };

  const handleApiSetupSession = (content) => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes("yes") || lowerContent.includes("update") || lowerContent.includes("add")) {
      const assistantMessage = {
        role: 'assistant',
        content: `Please enter your Straico API key below. It should look something like:
sk-xxxxxxxxxxxxxxxxxxxxxxxx`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setCurrentSession('api_key_input');
    } else {
      const assistantMessage = {
        role: 'assistant',
        content: `No problem. You can set up your API key anytime by typing "setup API key" in the chat.

Is there something else I can help you with today?`
      };
      setMessages(prev => [...prev, assistantMessage]);
      setCurrentSession(null);
    }
    
    setIsProcessing(false);
  };

  const resetChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! I\'m your NLP Mind Reprogramming assistant. I can help you identify and transform limiting beliefs, or develop your personal power. All features are available for free. How would you like to begin today?' }
    ]);
    setCurrentSession(null);
  };

  return (
    <div className="flex flex-col h-screen bg-chatgpt-light-gray">
      <Head>
        <title>NLP Mind Reprogramming</title>
        <meta name="description" content="Transform limiting beliefs and develop personal power" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className="bg-chatgpt-dark py-3 px-6">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">NLP Mind Reprogramming</h1>
          <div className="flex space-x-4">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </button>
            <button 
              onClick={resetChat}
              className="text-gray-300 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="bg-chatgpt-dark-gray border-b border-gray-700">
          <div className="max-w-5xl mx-auto py-4 px-6">
            <h2 className="text-lg font-medium text-white mb-3">Settings</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <label className="text-gray-300">API Key Status</label>
                <span className={`px-2 py-1 rounded-full text-xs ${hasApiKey ? 'bg-green-900 text-green-100' : 'bg-yellow-900 text-yellow-100'}`}>
                  {hasApiKey ? 'Connected' : 'Not Connected'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <label className="text-gray-300">Theme</label>
                <select className="bg-chatgpt-dark border border-gray-700 rounded-md px-2 py-1 text-sm text-white">
                  <option>Dark</option>
                  <option>Light</option>
                  <option>System</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      ) }

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div 
              key={index} 
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] rounded-lg px-4 py-3 ${
                  message.role === 'user' 
                    ? 'bg-chatgpt-user-bubble text-white' 
                    : 'bg-chatgpt-assistant-bubble text-chatgpt-text'
                }`}
              >
                <div className="whitespace-pre-wrap">{message.content}</div>
              </div>
            </div>
          ))}
          {isProcessing && (
            <div className="flex justify-start">
              <div className="bg-chatgpt-assistant-bubble rounded-lg px-4 py-3 text-chatgpt-text">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-700 bg-chatgpt-dark px-4 py-4">
        <div className="max-w-3xl mx-auto">
          {/* Suggestion chips */}
          <div className="flex flex-wrap gap-2 mb-3">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-3 py-1.5 bg-chatgpt-dark-gray text-gray-300 rounded-md text-sm hover:bg-gray-700 transition-colors border border-gray-700"
              >
                {suggestion.text}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <textarea
              className="w-full bg-chatgpt-dark-gray border border-gray-700 rounded-lg px-4 py-3 pr-12 resize-none focus:outline-none focus:ring-2 focus:ring-chatgpt-user-bubble focus:border-transparent text-white"
              rows="2"
              placeholder="Message NLP Mind Reprogramming..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            ></textarea>
            <button
              className="absolute right-3 bottom-3 text-gray-400 hover:text-white"
              onClick={handleSendMessage}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
          <div className="flex justify-between items-center mt-2 text-xs text-gray-500">
            <ClientOnly>
              <SpeechToText 
                onTranscript={(text)  => setInputValue(text)}
                placeholder="Click to speak"
              />
            </ClientOnly>
            <span className="text-gray-500">Press Enter to send</span>
          </div>
        </div>
      </div>
    </div>
  )
}
