import Head from 'next/head'
import { useState, useEffect, useRef } from 'react'
import { SpeechToText } from '../components/common/SpeechUtils'
import ClientOnly from '../components/common/ClientOnly'

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);
  const messagesEndRef = useRef(null);

  // Suggestion chips
  const suggestions = [
    { text: "Identify a limiting belief", icon: "📝", action: () => startBeliefAssessment() },
    { text: "Develop personal power", icon: "💪", action: () => startPowerDevelopment() },
    { text: "Run Submodality Belief Change", icon: "🔄", action: () => startSpecificProtocol('submodality') },
    { text: "Run Timeline Reimprinting", icon: "⏱️", action: () => startSpecificProtocol('timeline') },
    { text: "Run Walking Belief Change", icon: "👣", action: () => startSpecificProtocol('walking') }
  ];

  // Initialize with empty chat on first load
  useEffect(() => {
    if (messages.length === 0) {
      resetChat();
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

  const resetChat = () => {
    setMessages([
      { role: 'assistant', content: 'Hello! I\'m your NLP Mind Reprogramming assistant. I can help you identify and transform limiting beliefs, or develop your personal power. All features are available for free. How would you like to begin today?' }
    ]);
    setCurrentSession(null);
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <Head>
        <title>NLP Mind Reprogramming</title>
        <meta name="description" content="Transform limiting beliefs and develop personal power" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-between">
        {/* Messages Area */}
        {messages.length > 0 ? (
          <div className="w-full max-w-3xl px-4 py-6 flex-1 overflow-y-auto">
            <div className="space-y-6">
              {messages.map((message, index) => (
                <div key={index} className="flex flex-col">
                  <div className="flex items-start">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center mr-3 mt-1 ${
                      message.role === 'user' ? 'bg-[#5436DA] text-white' : 'bg-[#10a37f] text-white'
                    }`}>
                      {message.role === 'user' ? 'U' : 'A'}
                    </div>
                    <div className="flex-1">
                      <div className="text-gray-800 whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex items-start">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center mr-3 mt-1 bg-[#10a37f] text-white">
                    A
                  </div>
                  <div className="flex-1">
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
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center w-full max-w-3xl px-4">
            <h1 className="text-3xl font-semibold text-center mb-8">What can I help with?</h1>
          </div>
        )}

        {/* Input Area */}
        <div className="w-full border-t border-gray-200">
          <div className="max-w-3xl mx-auto p-4">
            {/* Suggestion chips */}
            {messages.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 justify-center">
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 rounded-md text-sm border border-gray-200 flex items-center"
                  >
                    <span className="mr-2">{suggestion.icon}</span>
                    {suggestion.text}
                  </button>
                ))}
              </div>
            )}
            
            <div className="relative rounded-md shadow-sm border border-gray-300">
              <textarea
                className="w-full rounded-md py-3 pl-4 pr-12 focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:border-transparent resize-none"
                rows="1"
                placeholder={messages.length === 0 ? "What can I help with?" : "Message NLP Mind Reprogramming..."}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              ></textarea>
              <div className="absolute right-2 bottom-2.5 flex">
                <button
                  className="text-gray-500 hover:text-gray-700 p-1"
                  onClick={handleSendMessage}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <div className="flex space-x-2">
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                  </svg>
                </button>
                <button className="text-gray-500 hover:text-gray-700 p-1">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  </svg>
                </button>
              </div>
              <ClientOnly>
                <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-1 px-3 rounded-md text-sm flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                  </svg>
                  Voice
                </button>
              </ClientOnly>
            </div>
          </div>
        </div>
      </main>
    </div>
  ) 
}
