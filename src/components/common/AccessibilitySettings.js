import React, { useState, useEffect } from 'react';

export default function AccessibilitySettings({ onClose }) {
  const [autoRead, setAutoRead] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [largeText, setLargeText] = useState(false);
  
  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('accessibility_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setAutoRead(settings.autoRead || false);
      setHighContrast(settings.highContrast || false);
      setLargeText(settings.largeText || false);
      
      // Apply settings
      applySettings(settings);
    }
  }, []);
  
  // Save and apply settings when they change
  useEffect(() => {
    const settings = { autoRead, highContrast, largeText };
    localStorage.setItem('accessibility_settings', JSON.stringify(settings));
    applySettings(settings);
  }, [autoRead, highContrast, largeText]);
  
  const applySettings = (settings) => {
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Apply large text
    if (settings.largeText) {
      document.documentElement.classList.add('large-text');
    } else {
      document.documentElement.classList.remove('large-text');
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Accessibility Settings</h3>
      
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Auto-read content</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-primary-600 checked:translate-x-6"
              checked={autoRead}
              onChange={(e) => setAutoRead(e.target.checked)}
            />
            <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-200 peer-checked:bg-primary-200"></span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-gray-700">High contrast mode</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-primary-600 checked:translate-x-6"
              checked={highContrast}
              onChange={(e) => setHighContrast(e.target.checked)}
            />
            <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-200 peer-checked:bg-primary-200"></span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <label className="text-gray-700">Large text</label>
          <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
            <input
              type="checkbox"
              className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-gray-300 checked:border-primary-600 checked:translate-x-6"
              checked={largeText}
              onChange={(e) => setLargeText(e.target.checked)}
            />
            <span className="absolute inset-0 transition duration-200 ease-in-out rounded-full bg-gray-200 peer-checked:bg-primary-200"></span>
          </div>
        </div>
      </div>
      
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={onClose}
          className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
        >
          Save Settings
        </button>
      </div>
    </div>
  );
}
