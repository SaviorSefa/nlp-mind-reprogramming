import React, { useState } from 'react';
import { TextToSpeech } from '../common/SpeechUtils';

export default function ProtocolExecution({ protocolId, belief, intensity, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [userResponses, setUserResponses] = useState({});
  const [currentResponse, setCurrentResponse] = useState('');

  // Protocol data - in a real app, this would come from the API
  const protocols = {
    'submodality': {
      name: 'Submodality Belief Change',
      steps: [
        {
          title: 'Identify Your Limiting Belief',
          instruction: `Your current limiting belief is: "${belief}". Take a moment to notice how you represent this belief in your mind. Where do you see it? Is it an image, words, or a feeling?`,
          requiresInput: true
        },
        {
          title: 'Find a Belief You Don\'t Hold',
          instruction: 'Think of a statement that you know is NOT true for you. For example, "The sky is green" or "I am a penguin." Notice how you represent this doubtful belief in your mind.',
          requiresInput: true
        },
        {
          title: 'Create Your New Empowering Belief',
          instruction: `What would be a more empowering belief to replace "${belief}"? Write down a positive alternative that feels slightly challenging but possible.`,
          requiresInput: true
        },
        {
          title: 'Change the Submodalities',
          instruction: 'Visualize your limiting belief and notice its characteristics (location, size, brightness, etc.). Now, change these characteristics to match how you represent beliefs you don\'t hold. Make it smaller, dimmer, or move it away.',
          requiresInput: false
        },
        {
          title: 'Install the New Belief',
          instruction: 'Take your new empowering belief and give it the submodalities of something you know to be true. Make it bright, close, and compelling. Take a deep breath and allow this new belief to integrate.',
          requiresInput: false
        },
        {
          title: 'Test the Change',
          instruction: 'Think about the original limiting belief. Notice if it feels different now. On a scale of 1-10, how strongly do you hold the new belief instead?',
          requiresInput: true
        }
      ]
    },
    'timeline': {
      name: 'Timeline Reimprinting',
      steps: [
        {
          title: 'Access Your Timeline',
          instruction: 'Imagine your timeline stretching out before and behind you. The past is behind you, the future is in front. Take a moment to sense this line of time.',
          requiresInput: false
        },
        {
          title: 'Identify Origin of Belief',
          instruction: `When did you first start believing "${belief}"? Float above your timeline and drift back to find the earliest memory where this belief was formed.`,
          requiresInput: true
        },
        {
          title: 'Gather Resources',
          instruction: 'What resources, wisdom, or strengths do you have now that you didn\'t have then? List at least three resources that would have changed how you interpreted that event.',
          requiresInput: true
        },
        {
          title: 'Reimprint the Memory',
          instruction: 'Float down into that memory with your new resources. Experience it differently with your adult wisdom. Notice how the interpretation changes.',
          requiresInput: false
        },
        {
          title: 'Create a New Belief',
          instruction: 'With this new perspective, what belief would you have formed instead? Write down this new empowering belief.',
          requiresInput: true
        },
        {
          title: 'Bring the Resources Forward',
          instruction: 'Return to the present, bringing these resources and new belief with you. Notice how events along your timeline shift and change as this new belief ripples forward to the present.',
          requiresInput: false
        }
      ]
    },
    'walking': {
      name: 'The Walking Belief Change Pattern',
      steps: [
        {
          title: 'Set Up Your Space',
          instruction: 'Find a space where you can walk in a straight line for about 6-10 steps. This will be your belief change line.',
          requiresInput: false
        },
        {
          title: 'Identify Current State',
          instruction: `Stand at the beginning of your line. Fully associate into the feeling of believing "${belief}". Notice how it feels in your body.`,
          requiresInput: true
        },
        {
          title: 'Define Desired State',
          instruction: 'What would you prefer to believe instead? Create a positive statement that directly counters your limiting belief.',
          requiresInput: true
        },
        {
          title: 'Walk the Line',
          instruction: 'Begin walking slowly along your line. With each step, feel the limiting belief weakening and the new belief strengthening. Allow your physiology to change as you move.',
          requiresInput: false
        },
        {
          title: 'Fully Embody the New Belief',
          instruction: 'At the end of your line, fully step into the new belief. Stand tall, breathe deeply, and embody the feeling of completely believing your new empowering belief.',
          requiresInput: false
        },
        {
          title: 'Anchor the New State',
          instruction: 'Create a physical anchor for this new belief - perhaps a gesture or touch on your wrist. Use this anchor while stating your new belief out loud three times.',
          requiresInput: true
        }
      ]
    }
  };

  const protocol = protocols[protocolId] || protocols['submodality'];
  const currentStepData = protocol.steps[currentStep];
  const totalSteps = protocol.steps.length;

  const handleNextStep = () => {
    if (currentStepData.requiresInput && !currentResponse.trim()) {
      alert('Please provide a response before continuing');
      return;
    }

    if (currentStepData.requiresInput) {
      setUserResponses({
        ...userResponses,
        [currentStep]: currentResponse
      });
      setCurrentResponse('');
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      setCurrentResponse(userResponses[currentStep - 1] || '');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-primary-50 p-4 rounded-md">
        <h3 className="text-xl font-medium text-primary-800 mb-2">{protocol.name}</h3>
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
          {currentStepData.title}
        </h4>
        <p className="text-gray-700 mb-6">
        {currentStepData.instruction}
        </p>
        <TextToSpeech text={currentStepData.instruction} />

        {currentStepData.requiresInput && (
          <textarea
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            rows="4"
            placeholder="Enter your response here..."
            value={currentResponse}
            onChange={(e) => setCurrentResponse(e.target.value)}
          ></textarea>
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
            {currentStep === totalSteps - 1 ? 'Complete Protocol' : 'Next Step'}
          </button>
        </div>
      </div>
    </div>
  );
}
