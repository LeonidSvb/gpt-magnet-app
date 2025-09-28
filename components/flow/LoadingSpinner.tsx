'use client';

import { useState, useEffect } from 'react';

interface LoadingSpinnerProps {
  message?: string;
  category?: string;
}

const GENERATION_MESSAGES = [
  "Analyzing your responses...",
  "Creating personalized content...",
  "Gathering industry insights...",
  "Crafting your lead magnet...",
  "Adding finishing touches...",
  "Almost ready..."
];

const CATEGORY_FACTS = {
  'business': [
    "80% of successful businesses have a clear value proposition",
    "Companies with documented processes are 50% more efficient",
    "Lead magnets increase conversion rates by up to 40%"
  ],
  'life-wellness': [
    "Regular goal-setting increases success rate by 42%",
    "Personalized content drives 80% higher engagement",
    "Wellness programs improve productivity by 25%"
  ],
  'services': [
    "Service businesses with clear processes scale 3x faster",
    "Client retention costs 5x less than acquisition",
    "Automated workflows save 20+ hours per week"
  ],
  'content': [
    "Content creators with systems produce 300% more",
    "Consistent posting increases audience by 67%",
    "Educational content drives 70% more engagement"
  ]
};

export function LoadingSpinner({ message, category }: LoadingSpinnerProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  const facts = category ? CATEGORY_FACTS[category as keyof typeof CATEGORY_FACTS] || [] : [];

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % GENERATION_MESSAGES.length);
    }, 3000);

    const factInterval = setInterval(() => {
      if (facts.length > 0) {
        setCurrentFact((prev) => (prev + 1) % facts.length);
      }
    }, 7000);

    return () => {
      clearInterval(messageInterval);
      clearInterval(factInterval);
    };
  }, [facts.length]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-lg shadow-lg p-8">
      {/* Animated spinner */}
      <div className="relative mb-8">
        {/* Outer ring */}
        <div className="w-20 h-20 border-4 border-blue-200 rounded-full animate-spin">
          <div className="w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        </div>

        {/* Inner ring */}
        <div className="absolute inset-2 w-16 h-16 border-4 border-indigo-200 rounded-full animate-spin" style={{ animationDuration: '2s' }}>
          <div className="w-full h-full border-4 border-transparent border-t-indigo-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }} />
        </div>

        {/* Center dot */}
        <div className="absolute inset-6 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-pulse" />
      </div>

      {/* Main message */}
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        {message || "Creating Your Lead Magnet"}
      </h3>

      {/* Rotating status messages */}
      <div className="h-8 mb-6">
        <p
          key={currentMessage}
          className="text-gray-600 text-center animate-fade-in"
        >
          {GENERATION_MESSAGES[currentMessage]}
        </p>
      </div>

      {/* Category-specific facts */}
      {facts.length > 0 && (
        <div className="max-w-md text-center">
          <p className="text-sm text-gray-500 mb-2">Did you know?</p>
          <div className="h-12">
            <p
              key={currentFact}
              className="text-blue-600 font-medium animate-fade-in"
            >
              {facts[currentFact]}
            </p>
          </div>
        </div>
      )}

      {/* Progress dots */}
      <div className="flex space-x-2 mt-8">
        {[0, 1, 2].map((dot) => (
          <div
            key={dot}
            className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            style={{
              animationDelay: `${dot * 0.3}s`,
              animationDuration: '1.5s'
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}