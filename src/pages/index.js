import Head from 'next/head'
import { useState, useEffect } from 'react'
import BeliefAnalysisResult from '../components/assessment/BeliefAnalysisResult'
import ProtocolExecution from '../components/protocols/ProtocolExecution'
import PowerDevelopment from '../components/power/PowerDevelopment'
import PowerExercise from '../components/power/PowerExercise'
import ApiKeySetup from '../components/common/ApiKeySetup'
import { SpeechToText } from '../components/common/SpeechUtils'
import AccessibilitySettings from '../components/common/AccessibilitySettings';

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [beliefText, setBeliefText] = useState('');
  const [beliefIntensity, setBeliefIntensity] = useState(7);
  const [selectedProtocol, setSelectedProtocol] = useState('');
  const [selectedPowerArea, setSelectedPowerArea] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);

  // Check for API key on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('straico_api_key');
    if (storedKey) {
      setHasApiKey(true);
    }
  }, []);

  const handleStartAssessment = () => {
    setCurrentView('assessment');
  };

  const handleAnalyzeBelief = () => {
    if (beliefText.trim().length < 3) {
      alert('Please enter a belief to analyze');
      return;
    }
    setCurrentView('analysis-results');
  };

  const handleSelectProtocol = (protocolId) => {
    setSelectedProtocol(protocolId);
    setCurrentView('protocol');
  };

  const handleProtocolComplete = () => {
    setCurrentView('protocol-complete');
  };

  const handleStartPowerExercise = (areaId) => {
    setSelectedPowerArea(areaId);
    setCurrentView('power-exercise');
  };

  const handlePowerExerciseComplete = () => {
    setCurrentView('power-exercise-complete');
  };

  const handleApiKeySetupComplete = () => {
    setHasApiKey(true);
    setCurrentView('home');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NLP Mind Reprogramming</title>
        <meta name="description" content="Transform limiting beliefs and develop personal power" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

     <header className="bg-white shadow-sm">
  <div className="container mx-auto px-4 py-4 flex justify-between items-center">
    <h1 className="text-2xl font-bold text-primary-700">
      NLP Mind Reprogramming
    </h1>
    <nav className="flex items-center space-x-4">
      <button 
        onClick={() => setShowAccessibility(true)}
        className="text-gray-600 hover:text-primary-700 flex items-center"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
        </svg>
        Accessibility
      </button>
      <button 
        onClick={()  => setCurrentView('api-setup')}
        className="text-gray-600 hover:text-primary-700 flex items-center"
      >
        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        </svg>
        {hasApiKey ? 'API Settings' : 'Set Up API Key'}
      </button>
    </nav>
    {showAccessibility && (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
      <AccessibilitySettings onClose={()  => setShowAccessibility(false)} />
    </div>
  </div>
)}
  </div>
</header>


      <main className="container mx-auto px-4 py-8">
        {currentView === 'home' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Transform Your Limiting Beliefs</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Identify and reprogram limiting beliefs using proven NLP techniques, and develop your personal power.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-primary-600">
                <div className="text-3xl mb-4">🔄</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Belief Reprogramming</h3>
                <p className="text-gray-600 mb-6">
                  Identify limiting beliefs that are holding you back and transform them using powerful NLP protocols.
                </p>
                <button 
                  onClick={handleStartAssessment}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Start Belief Assessment
                </button>
              </div>
              
              <div className="bg-white rounded-lg shadow-md p-8 border-t-4 border-primary-600">
                <div className="text-3xl mb-4">✨</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Personal Power Development</h3>
                <p className="text-gray-600 mb-6">
                  Develop your personal power across multiple dimensions to increase your influence and effectiveness.
                </p>
                <button 
                  onClick={()  => setCurrentView('power-development')}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                  Develop Personal Power
                </button>
              </div>
            </div>
            
            {!hasApiKey && (
              <div className="mt-12 bg-primary-50 rounded-lg p-6 border border-primary-100">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mt-1 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <h3 className="text-lg font-medium text-primary-800 mb-2">Set Up Your Straico API Key</h3>
                    <p className="text-primary-700 mb-4">
                      For the best experience, connect your Straico API key to enable AI-powered belief analysis and personalized guidance.
                    </p>
                    <button 
                      onClick={()  => setCurrentView('api-setup')}
                      className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                      Set Up API Key
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {currentView === 'assessment' && (
          <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Belief Assessment</h2>
            <p className="text-gray-600 mb-6">
              Identify a limiting belief you'd like to transform:
            </p>
            <textarea 
              className="w-full p-3 border border-gray-300 rounded-md mb-4" 
              rows="4"
              placeholder="Enter your limiting belief here..."
              value={beliefText}
              onChange={(e) => setBeliefText(e.target.value)}>
            </textarea>
            <SpeechToText 
              onTranscript={(text) => setBeliefText(text)}
              placeholder="Click to speak your limiting belief..."            

            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-700 mb-2">How strongly do you hold this belief?</h3>
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={beliefIntensity}
                  onChange={(e) => setBeliefIntensity(parseInt(e.target.value))}
                  className="w-full mr-4" 
                />
                <span className="text-gray-700">{beliefIntensity}/10</span>
              </div>
            </div>
            
            <div className="flex justify-between">
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors">
                Back
              </button>
              <button 
                onClick={handleAnalyzeBelief}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Analyze Belief
              </button>
            </div>
          </div>
        )}

        {currentView === 'analysis-results' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Belief Analysis</h2>
            
            <BeliefAnalysisResult 
              belief={beliefText}
              intensity={beliefIntensity}
              onSelectProtocol={handleSelectProtocol}
            />
            
            <div className="mt-8 flex justify-between">
              <button 
                onClick={() => setCurrentView('assessment')}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition-colors">
                Back to Assessment
              </button>
              <button 
                onClick={() => setCurrentView('home')}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors">
                Return Home
              </button>
            </div>
          </div>
        )}

        {currentView === 'protocol' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Protocol Execution</h2>
            
            <ProtocolExecution 
              protocolId={selectedProtocol}
              belief={beliefText}
              intensity={beliefIntensity}
              onComplete={handleProtocolComplete}
            />
          </div>
        )}

        {currentView === 'protocol-complete' && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Protocol Complete!</h2>
            <p className="text-gray-600 mb-8">
              Congratulations on completing the protocol. Your belief transformation journey has begun. 
              Notice how your relationship with this belief changes over the coming days.
            </p>
            <div className="space-y-4">
              <button 
                onClick={()  => setCurrentView('assessment')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Start New Assessment
              </button>
              <button 
                onClick={() => setCurrentView('home')}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors">
                Return Home
              </button>
            </div>
          </div>
        )}

        {currentView === 'power-development' && (
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Power Development</h2>
            
            <PowerDevelopment 
              onStartExercise={handleStartPowerExercise}
              onReturnHome={() => setCurrentView('home')}
            />
          </div>
        )}

        {currentView === 'power-exercise' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Power Exercise</h2>
            
            <PowerExercise 
              areaId={selectedPowerArea}
              onComplete={handlePowerExerciseComplete}
              onBack={() => setCurrentView('power-development')}
            />
          </div>
        )}

        {currentView === 'power-exercise-complete' && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Exercise Complete!</h2>
            <p className="text-gray-600 mb-8">
              Great job completing this personal power exercise. Regular practice will help you develop 
              stronger personal power in this area. Your notes have been saved.
            </p>
            <div className="space-y-4">
              <button 
                onClick={()  => setCurrentView('power-development')}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                More Power Exercises
              </button>
              <button 
                onClick={() => setCurrentView('home')}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors">
                Return Home
              </button>
            </div>
          </div>
        )}

        {currentView === 'api-setup' && (
          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">API Key Setup</h2>
            
            <ApiKeySetup 
              onComplete={handleApiKeySetupComplete}
              onBack={() => setCurrentView('home')}
            />
          </div>
        )}
      </main>

      <footer className="mt-12 py-6 bg-gray-800 text-white text-center">
        <p>© 2025 NLP Mind Reprogramming</p>
      </footer>
    </div>
  )
}
