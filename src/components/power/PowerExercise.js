import React, { useState } from 'react';

export default function PowerExercise({ areaId, onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [notes, setNotes] = useState('');

  // Exercise data - in a real app, this would come from the API
  const exercises = {
    'self-awareness': {
      name: 'Self-Awareness Practice',
      description: 'This exercise helps you develop deeper self-awareness by identifying your core patterns, strengths, and areas for growth.',
      steps: [
        'Find a quiet space where you won\'t be disturbed for 15-20 minutes.',
        'Take several deep breaths to center yourself.',
        'Reflect on a recent challenging situation where you felt triggered or reactive.',
        'Notice what thoughts, emotions, and physical sensations arose during this situation.',
        'Identify any patterns or themes that connect to similar past experiences.',
        'Consider what this pattern reveals about your core beliefs and values.',
        'Identify one strength you demonstrated in this situation.',
        'Identify one area where you could grow or respond differently next time.'
      ]
    },
    'vision': {
      name: 'Vision & Purpose Development',
      description: 'This exercise helps you clarify your personal vision and connect with your deeper sense of purpose.',
      steps: [
        'Find a comfortable space where you can think creatively for 20-30 minutes.',
        'Imagine it\'s 5 years in the future and you\'re living your ideal life.',
        'Visualize specific details: Where are you? What are you doing? Who is with you?',
        'Notice what feels most energizing and meaningful in this vision.',
        'Write down 3-5 key elements that are essential to your ideal future.',
        'For each element, identify why it matters to you at a deep level.',
        'Consider what these elements reveal about your core values and purpose.',
        'Create a short purpose statement that captures the essence of how you want to contribute and what matters most to you.'
      ]
    },
    'communication': {
      name: 'Communication & Influence Skills',
      description: 'This exercise helps you develop more powerful communication skills and increase your influence with others.',
      steps: [
        'Identify an upcoming conversation where you want to be influential.',
        'Clarify your specific outcome: What do you want the other person to understand, feel, or do?',
        'Consider the other person\'s perspective, needs, and values.',
        'Prepare 2-3 key points that will resonate with their perspective.',
        'Practice delivering these points with confidence (use a mirror or record yourself).',
        'Pay attention to your body language, tone, and pacing.',
        'Prepare for potential objections or resistance with respectful responses.',
        'After the conversation, reflect on what worked well and what you could improve next time.'
      ]
    },
    'premium': {
      name: 'Premium Feature',
      description: 'This is a premium feature. Upgrade to access advanced personal power development exercises.',
      steps: []
    }
  };

  const exercise = exercises[areaId] || exercises['self-awareness'];
  const totalSteps = exercise.steps.length;

  const handleNextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  if (areaId === 'premium') {
    return (
      <div className="text-center py-8">
        <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <span className="text-3xl">✨</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Premium Feature</h3>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          This is a premium feature. Upgrade your account to access advanced personal power development exercises.
        </p>
        <div className="space-y-4 max-w-xs mx-auto">
          <button 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-3 px-4 rounded-md transition-colors"
          >
            Upgrade Now
          </button>
          <button 
            onClick={onBack}
            className="w-full bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-3 px-4 rounded-md transition-colors"
          >
            Back to Power Development
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md">
        <h3 className="text-xl font-medium text-primary-800 mb-2">{exercise.name}</h3>
        <p className="text-gray-700 mb-4">{exercise.description}</p>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-primary-600 h-2.5 rounded-full" 
            style={{ width: `${((currentStep + 1) / totalSteps) * 100}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-600">Step {currentStep + 1} of {totalSteps}</p>
      </div>

      <div className="bg-white p-6 rounded-md border border-gray-200">
        <h4 className="text-lg font-medium text-gray-800 mb-3">
          Step {currentStep + 1}
        </h4>
        <p className="text-gray-700 mb-6">
          {exercise.steps[currentStep]}
        </p>

        {currentStep === totalSteps - 1 && (
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Reflection Notes
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="4"
              placeholder="Record your thoughts, insights, and experiences..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousStep}
            disabled={currentStep === 0}
            className={`px-4 py-2 rounded-md font-medium ${
              currentStep === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
            }`}
          >
            Previous
          </button>
          <button
            onClick={handleNextStep}
            className="bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md"
          >
            {currentStep === totalSteps - 1 ? 'Complete Exercise' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
