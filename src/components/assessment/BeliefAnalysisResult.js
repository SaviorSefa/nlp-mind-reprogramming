import React from 'react';

export default function BeliefAnalysisResult({ belief, intensity, onSelectProtocol }) {
  // This would normally come from the API, but we're simulating results
  const analysisResult = {
    category: 'self-worth',
    rootCause: 'Early childhood experiences of criticism',
    impact: 'Affects confidence in professional settings and relationships',
    recommendedProtocols: [
      {
        id: 'submodality',
        name: 'Submodality Belief Change',
        suitability: 85,
        description: 'Change how you represent beliefs in your mind'
      },
      {
        id: 'timeline',
        name: 'Timeline Reimprinting',
        suitability: 78,
        description: 'Address the root causes of limiting beliefs'
      },
      {
        id: 'walking',
        name: 'The Walking Belief Change Pattern',
        suitability: 72,
        description: 'Use physical movement to anchor new beliefs'
      }
    ]
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md border border-primary-200">
        <h3 className="text-lg font-medium text-primary-800 mb-2">Analysis Results</h3>
        <p className="text-gray-700 mb-1"><span className="font-medium">Belief:</span> "{belief}"</p>
        <p className="text-gray-700 mb-1"><span className="font-medium">Intensity:</span> {intensity}/10</p>
        <p className="text-gray-700 mb-1"><span className="font-medium">Category:</span> {analysisResult.category}</p>
        <p className="text-gray-700 mb-1"><span className="font-medium">Root Cause:</span> {analysisResult.rootCause}</p>
        <p className="text-gray-700"><span className="font-medium">Impact:</span> {analysisResult.impact}</p>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-800 mb-3">Recommended Protocols</h3>
        <div className="space-y-4">
          {analysisResult.recommendedProtocols.map((protocol) => (
            <div 
              key={protocol.id}
              className="border border-gray-200 rounded-md p-4 hover:border-primary-300 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <h4 className="text-md font-medium text-gray-800">{protocol.name}</h4>
                <span className="bg-primary-100 text-primary-800 text-sm px-2 py-1 rounded-full">
                  {protocol.suitability}% Match
                </span>
              </div>
              <p className="text-gray-600 mb-3">{protocol.description}</p>
              <button
                onClick={() => onSelectProtocol(protocol.id)}
                className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Start Protocol
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
