'use client';

import { useEffect } from 'react';
import { BusinessTypeSelector } from './BusinessTypeSelector';
import { NewQuestionFlow } from './NewQuestionFlow';
import { ResultDisplay } from './ResultDisplay';
import { ProgressBar } from './ProgressBar';
import { LoadingSpinner } from './LoadingSpinner';
import { LeadCapture } from './LeadCapture';
import { useFlowState } from '@/lib/flow-state';
import { trackEvent } from '@/lib/analytics';

export type FlowStep = 'business-type' | 'questions' | 'generating' | 'lead-capture' | 'result';

export function FlowContainer() {
  const {
    currentStep,
    setCurrentStep,
    selectedBusinessType,
    answers,
    sessionId,
    result,
    resetFlow,
    setSource,
    setResult,
    setBusinessType
  } = useFlowState();

  useEffect(() => {
    // Check URL parameters for Telegram source
    const urlParams = new URLSearchParams(window.location.search);
    const source = urlParams.get('source');
    const userId = urlParams.get('user_id');

    if (source === 'telegram' && userId) {
      setSource('telegram');
    }

    trackEvent('flow_started', { sessionId, source: source || 'web' });
  }, [sessionId, setSource]);

  const handleBusinessTypeSelect = (businessType: string) => {
    trackEvent('business_type_selected', {
      businessType,
      sessionId
    });
    setBusinessType(businessType);
  };

  const handleQuestionsComplete = async () => {
    trackEvent('questions_completed', {
      businessType: selectedBusinessType,
      answerCount: Object.keys(answers).length,
      sessionId
    });

    setCurrentStep('generating');

    try {
      // Mock successful submission for UI testing
      const mockResult = `# Your Personalized Lead Magnet

## The Ultimate Guide for ${selectedBusinessType} Professionals

Based on your answers, here's your customized lead magnet content...

### Key Benefits:
- Solves your clients' main struggles
- Positions you as an expert
- Generates qualified leads

*This is a demo result. Full integration coming soon!*`;

      setResult(mockResult);
      setCurrentStep('lead-capture');
    } catch (error) {
      console.error('Flow error:', error);
      trackEvent('flow_error', {
        error: error.message,
        step: 'generating',
        sessionId
      });
    }
  };

  const handleLeadSubmit = async (leadData: { name: string; email?: string; telegram_id?: string }) => {
    trackEvent('lead_submitted', {
      contactType: leadData.email ? 'email' : 'telegram',
      sessionId
    });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          name: leadData.name,
          contactType: leadData.email ? 'email' : 'telegram',
          contactValue: leadData.email || leadData.telegram_id
        })
      });

      if (!response.ok) throw new Error('Failed to submit lead');

      setCurrentStep('result');
      trackEvent('flow_completed', { sessionId });
    } catch (error) {
      console.error('Lead submission error:', error);
      trackEvent('lead_error', {
        error: error.message,
        sessionId
      });
    }
  };

  const getStepNumber = () => {
    switch (currentStep) {
      case 'business-type': return 1;
      case 'questions': return 2;
      case 'generating': return 3;
      case 'lead-capture': return 4;
      case 'result': return 5;
      default: return 1;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="mt-8">
          {currentStep === 'business-type' && (
            <BusinessTypeSelector onSelect={handleBusinessTypeSelect} sessionId={sessionId} />
          )}

          {currentStep === 'questions' && (
            <NewQuestionFlow
              businessType={selectedBusinessType!}
              onComplete={handleQuestionsComplete}
              onBack={() => setCurrentStep('business-type')}
              sessionId={sessionId}
            />
          )}

          {currentStep === 'generating' && (
            <LoadingSpinner
              message="Creating your personalized lead magnet..."
              businessType={selectedBusinessType!}
            />
          )}

          {currentStep === 'lead-capture' && (
            <LeadCapture onSubmit={handleLeadSubmit} />
          )}

          {currentStep === 'result' && result && (
            <ResultDisplay content={result} />
          )}
        </div>

        {currentStep !== 'business-type' && (
          <button
            onClick={resetFlow}
            className="mt-8 text-sm text-gray-500 hover:text-gray-700 underline"
          >
            Start Over
          </button>
        )}
      </div>
    </div>
  );
}