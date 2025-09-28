'use client';

import { useState } from 'react';
import { useFlowState } from '@/lib/flow-state';
import { getContactFields } from '@/lib/questions';
import { flowEvents } from '@/lib/analytics';

interface LeadCaptureProps {
  onSubmit: (leadData: { name: string; email?: string; telegram_id?: string }) => void;
}

export function LeadCapture({ onSubmit }: LeadCaptureProps) {
  const { source, sessionId } = useFlowState();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [telegramId, setTelegramId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactFields = getContactFields(source);
  const isFormValid = name.trim() && (
    source === 'telegram' ? telegramId.trim() : email.trim()
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid || isSubmitting) return;

    setIsSubmitting(true);

    try {
      flowEvents.leadCaptureShown(sessionId, source);

      const leadData = {
        name: name.trim(),
        ...(source === 'telegram'
          ? { telegram_id: telegramId.trim() }
          : { email: email.trim() }
        )
      };

      await onSubmit(leadData);
    } catch (error) {
      console.error('Lead submission error:', error);
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">
          Get Your Lead Magnet! 🎯
        </h3>
        <p className="text-gray-600">
          Enter your details to receive your personalized content
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name field */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Your Name *
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your full name"
            required
          />
        </div>

        {/* Email or Telegram field based on source */}
        {source === 'telegram' ? (
          <div>
            <label htmlFor="telegram" className="block text-sm font-medium text-gray-700 mb-1">
              Telegram Username *
            </label>
            <input
              type="text"
              id="telegram"
              value={telegramId}
              onChange={(e) => setTelegramId(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="@username or telegram ID"
              required
            />
          </div>
        ) : (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address *
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your@email.com"
              required
            />
          </div>
        )}

        {/* Privacy notice */}
        <div className="text-xs text-gray-500 bg-gray-50 p-3 rounded-md">
          <p>
            🔒 Your information is secure and will only be used to deliver your lead magnet.
            We respect your privacy and won't spam you.
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isFormValid || isSubmitting}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-md hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Processing...
            </div>
          ) : (
            <>
              Get My Lead Magnet
              <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </>
          )}
        </button>
      </form>

      {/* Features */}
      <div className="mt-6 grid grid-cols-3 gap-4 text-center">
        <div className="text-sm">
          <div className="text-green-500 mb-1">⚡</div>
          <span className="text-gray-600">Instant Delivery</span>
        </div>
        <div className="text-sm">
          <div className="text-blue-500 mb-1">🎯</div>
          <span className="text-gray-600">Personalized</span>
        </div>
        <div className="text-sm">
          <div className="text-purple-500 mb-1">📱</div>
          <span className="text-gray-600">Ready to Use</span>
        </div>
      </div>
    </div>
  );
}