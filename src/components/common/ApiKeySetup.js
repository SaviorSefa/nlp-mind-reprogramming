import React, { useState, useEffect } from 'react';

export default function ApiKeySetup({ onComplete, onBack }) {
  const [apiKey, setApiKey] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState(null);
  const [savedApiKey, setSavedApiKey] = useState(null);

  // Check for existing API key on component mount
  useEffect(() => {
    const storedKey = localStorage.getItem('straico_api_key');
    if (storedKey) {
      setSavedApiKey(storedKey);
      setApiKey(storedKey);
    }
  }, []);

  const handleVerifyApiKey = async () => {
    if (!apiKey.trim()) {
      alert('Please enter an API key');
      return;
    }

    setIsVerifying(true);
    setVerificationStatus(null);

    try {
      // In a real app, this would call the Straico API
      // For this demo, we'll simulate a verification process
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Store the API key in localStorage
      localStorage.setItem('straico_api_key', apiKey);
      setSavedApiKey(apiKey);
      setVerificationStatus('success');
    } catch (error) {
      console.error('API key verification failed:', error);
      setVerificationStatus('error');
    } finally {
      setIsVerifying(false);
    }
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('straico_api_key');
    setSavedApiKey(null);
    setApiKey('');
    setVerificationStatus(null);
  };

  return (
    <div className="space-y-8">
      <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
        <h3 className="text-xl font-semibold text-primary-800 mb-3">Straico API Integration</h3>
        <p className="text-gray-700">
          Connect your Straico API key to enable AI-powered belief analysis and personalized guidance. 
          Your API key is stored securely on your device and is never sent to our servers.
        </p>
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">API Key Setup</h4>
        
        {savedApiKey && verificationStatus !== 'error' ? (
          <div className="space-y-6">
            <div className="flex items-center p-4 bg-green-50 rounded-md border border-green-200">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className="text-green-700">API key is set up and verified</span>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your API Key
              </label>
              <input
                type="password"
                value={savedApiKey}
                disabled
                className="w-full p-3 bg-gray-50 border border-gray-300 rounded-md mb-2"
              />
              <p className="text-xs text-gray-500">
                Your API key is stored securely on your device.
              </p>
            </div>
            
            <div className="flex space-x-4">
              <button
                onClick={handleClearApiKey}
                className="bg-white border border-red-300 hover:bg-red-50 text-red-600 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Remove API Key
              </button>
              <button
                onClick={onComplete}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Continue
              </button>
            </div>
          </div>
        )  : (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Enter your Straico API Key
              </label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-xxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full p-3 border border-gray-300 rounded-md mb-2"
              />
              <p className="text-xs text-gray-500">
                Don't have an API key? Visit <a href="https://straico.com" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:text-primary-800">straico.com</a> to sign up and get your key.
              </p>
            </div>
            
            {verificationStatus === 'error' && (
              <div className="p-4 bg-red-50 rounded-md border border-red-200 text-red-700">
                API key verification failed. Please check your key and try again.
              </div>
            ) }
            
            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-4 rounded-md transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleVerifyApiKey}
                disabled={isVerifying || !apiKey.trim()}
                className={`flex items-center justify-center bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors ${
                  isVerifying || !apiKey.trim() ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isVerifying ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Verifying...
                  </>
                )  : (
                  'Verify API Key'
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-4">About Straico API</h4>
        <p className="text-gray-600 mb-4">
          The Straico API provides advanced natural language processing capabilities that power the AI features in this application:
        </p>
        <ul className="list-disc pl-5 space-y-2 text-gray-600">
          <li>Personalized belief analysis and categorization</li>
          <li>Custom protocol recommendations based on your specific beliefs</li>
          <li>Step-by-step guidance through NLP protocols</li>
          <li>Personal power assessment and development recommendations</li>
        </ul>
      </div>
    </div>
  );
}
