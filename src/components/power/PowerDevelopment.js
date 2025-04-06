import React, { useState } from 'react';

export default function PowerDevelopment({ onStartExercise, onReturnHome }) {
  const powerAreas = [
    {
      id: 'self-awareness',
      name: 'Self-Awareness',
      description: 'Develop deeper understanding of your patterns, emotions, and triggers',
      icon: '🧠',
      premium: false
    },
    {
      id: 'vision',
      name: 'Vision & Purpose',
      description: 'Clarify your direction and connect with meaningful goals',
      icon: '🔭',
      premium: false
    },
    {
      id: 'communication',
      name: 'Communication & Influence',
      description: 'Enhance your ability to connect with and impact others',
      icon: '🗣️',
      premium: false
    },
    {
      id: 'resilience',
      name: 'Resilience & Adaptability',
      description: 'Build your capacity to bounce back from setbacks',
      icon: '🌊',
      premium: true
    },
    {
      id: 'strategic',
      name: 'Strategic Thinking',
      description: 'Develop advanced planning and decision-making skills',
      icon: '♟️',
      premium: true
    },
    {
      id: 'presence',
      name: 'Personal Presence',
      description: 'Cultivate charisma and command attention in any room',
      icon: '✨',
      premium: true
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-primary-50 p-6 rounded-lg border border-primary-100">
        <h3 className="text-xl font-semibold text-primary-800 mb-3">Personal Power Development</h3>
        <p className="text-gray-700">
          Personal power is your ability to influence your environment, achieve your goals, and create the life you desire. 
          Select an area below to begin developing your personal power through targeted exercises.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {powerAreas.map((area) => (
          <div 
            key={area.id}
            className={`p-6 rounded-lg border ${
              area.premium 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-primary-100 hover:border-primary-300'
            } transition-colors`}
          >
            <div className="text-3xl mb-3">{area.icon}</div>
            <h4 className="text-lg font-medium text-gray-800 mb-2">
              {area.name}
              {area.premium && (
                <span className="ml-2 text-xs font-medium bg-gray-200 text-gray-700 py-1 px-2 rounded-full">
                  PREMIUM
                </span>
              )}
            </h4>
            <p className="text-gray-600 mb-4">{area.description}</p>
            <button
              onClick={() => area.premium ? onStartExercise('premium') : onStartExercise(area.id)}
              className={`w-full py-2 px-4 rounded-md font-medium ${
                area.premium
                  ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  : 'bg-primary-600 text-white hover:bg-primary-700'
              } transition-colors`}
            >
              {area.premium ? 'Upgrade to Access' : 'Start Exercises'}
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <button
          onClick={onReturnHome}
          className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium py-2 px-6 rounded-md transition-colors"
        >
          Return Home
        </button>
      </div>
    </div>
  );
}
