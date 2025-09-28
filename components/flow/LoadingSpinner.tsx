'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface LoadingSpinnerProps {
  message?: string;
  businessType?: string;
}

const GENERATION_MESSAGES = [
  "Analyzing your responses...",
  "Creating personalized content...",
  "Gathering industry insights...",
  "Crafting your lead magnet...",
  "Adding finishing touches...",
  "Almost ready..."
];

const BUSINESS_TYPE_FACTS = {
  'soft-coach': [
    "Personal coaches with clear systems earn 3x more",
    "80% of clients prefer structured coaching approaches",
    "Lead magnets increase coaching conversion rates by 40%"
  ],
  'hard-coach': [
    "Business coaches with proven frameworks retain 90% more clients",
    "Companies with documented processes are 50% more efficient",
    "ROI-focused coaching drives 3x better results"
  ],
  'agency': [
    "Agencies with clear value propositions scale 5x faster",
    "Service-based businesses with processes scale 3x faster",
    "Client retention costs 5x less than acquisition"
  ],
  'other-professional': [
    "Professional services with clear systems grow 200% faster",
    "Consistent content drives 67% more engagement",
    "Educational content drives 70% more engagement"
  ]
};

export function LoadingSpinner({ message, businessType }: LoadingSpinnerProps) {
  const [currentMessage, setCurrentMessage] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);

  const facts = businessType ? BUSINESS_TYPE_FACTS[businessType as keyof typeof BUSINESS_TYPE_FACTS] || [] : [];

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
    <div className="widget-container">
      <div className="widget-question-display">
        <Image
          src="/images/alfie-avatar.png"
          alt="Coach Assistant"
          width={48}
          height={48}
          className="widget-question-avatar"
          priority
        />
        <div className="widget-question-content">
          {/* Animated spinner */}
          <div className="relative mb-4 flex justify-center">
            {/* Outer ring */}
            <div className="w-12 h-12 border-3 border-blue-200 rounded-full animate-spin">
              <div className="w-full h-full border-3 border-transparent border-t-blue-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
            </div>
          </div>

          {/* Main message */}
          <h2 className="widget-question-text text-center mb-2">
            {message || "Creating Your Lead Magnet"}
          </h2>

          {/* Rotating status messages */}
          <p
            key={currentMessage}
            className="text-center animate-fade-in"
            style={{
              fontSize: '14px',
              color: 'var(--widget-text-light)',
              margin: '8px 0'
            }}
          >
            {GENERATION_MESSAGES[currentMessage]}
          </p>

          {/* Category-specific facts */}
          {facts.length > 0 && (
            <div className="text-center mt-4">
              <p style={{
                fontSize: '12px',
                color: 'var(--widget-text-muted)',
                margin: '0 0 4px 0'
              }}>
                Did you know?
              </p>
              <p
                key={currentFact}
                className="animate-fade-in"
                style={{
                  fontSize: '14px',
                  color: 'var(--alfie-primary)',
                  fontWeight: '500'
                }}
              >
                {facts[currentFact]}
              </p>
            </div>
          )}
        </div>
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