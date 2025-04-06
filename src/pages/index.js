import Head from 'next/head'
import { useState } from 'react'
import BeliefAnalysisResult from '../components/assessment/BeliefAnalysisResult'
import ProtocolExecution from '../components/protocols/ProtocolExecution'

export default function Home() {
  const [currentView, setCurrentView] = useState('home');
  const [beliefText, setBeliefText] = useState('');
  const [beliefIntensity, setBeliefIntensity] = useState(7);
  const [selectedProtocol, setSelectedProtocol] = useState('');

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>NLP Mind Reprogramming</title>
        <meta name="description" content="Transform limiting beliefs and develop personal power" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-primary-700 mb-8">
          NLP Mind Reprogramming
        </h1>
        <p className="text-xl text-center text-gray-700 mb-12">
          Transform Your Limiting Beliefs & Develop Personal Power
        </p>
        
        {currentView === 'home' && (
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-6">
              Begin your journey to transform limiting beliefs and develop personal power.
            </p>
            <div className="space-y-4">
              <button 
                onClick={handleStartAssessment}
                className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors">
                Start Belief Assessment
              </button>
              <button 
                onClick={() => setCurrentView('power-development')}
                className="w-full bg-white border border-primary-600 hover:bg-primary-50 text-primary-700 font-medium py-3 px-4 rounded-md transition-colors">
                Develop Personal Power
              </button>
              <button 
                onClick={() => setCurrentView('api-setup')}
                className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors">
                API Key Setup
              </button>
            </div>
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
      </main>

      <footer className="mt-12 py-6 bg-gray-800 text-white text-center">
        <p>© 2025 NLP Mind Reprogramming</p>
      </footer>
    </div>
  )
}
