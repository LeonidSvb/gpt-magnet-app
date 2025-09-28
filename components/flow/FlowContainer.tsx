'use client';

import { useEffect } from 'react';
import { CategorySelector } from './CategorySelector';
import { QuestionFlow } from './QuestionFlow';
import { ResultDisplay } from './ResultDisplay';
import { ProgressBar } from './ProgressBar';
import { LoadingSpinner } from './LoadingSpinner';
import { LeadCapture } from './LeadCapture';
import { useFlowState } from '@/lib/flow-state';
import { trackEvent } from '@/lib/analytics';

export type FlowStep = 'category' | 'questions' | 'generating' | 'lead-capture' | 'result';

export function FlowContainer() {
  const {
    currentStep,
    setCurrentStep,
    selectedCategory,
    selectedNiche,
    answers,
    sessionId,
    result,
    resetFlow,
    setSource,
    setResult,
    setCategory
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

  const handleCategorySelect = (category: string, niche: string) => {
    trackEvent('category_selected', {
      category,
      niche,
      sessionId
    });
    setCategory(category, niche);
  };

  const handleQuestionsComplete = async () => {
    trackEvent('questions_completed', {
      category: selectedCategory,
      niche: selectedNiche,
      answerCount: Object.keys(answers).length,
      sessionId
    });

    setCurrentStep('generating');

    try {
      // Submit answers to create session
      const submitResponse = await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: selectedCategory,
          niche: selectedNiche,
          answers
        })
      });

      if (!submitResponse.ok) throw new Error('Failed to submit');

      const { sessionId: newSessionId } = await submitResponse.json();

      // Generate content
      const generateResponse = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId: newSessionId })
      });

      if (!generateResponse.ok) throw new Error('Failed to generate');

      const { markdown } = await generateResponse.json();
      setResult(markdown);

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
      case 'category': return 1;
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
        <ProgressBar
          currentStep={getStepNumber()}
          totalSteps={5}
          labels={['Category', 'Questions', 'Generating', 'Contact', 'Result']}
        />

        <div className="mt-8">
          {currentStep === 'category' && (
            <CategorySelector onSelect={handleCategorySelect} />
          )}

          {currentStep === 'questions' && (
            <QuestionFlow
              category={selectedCategory!}
              niche={selectedNiche!}
              onComplete={handleQuestionsComplete}
            />
          )}

          {currentStep === 'generating' && (
            <LoadingSpinner
              message="Creating your personalized lead magnet..."
              category={selectedCategory!}
            />
          )}

          {currentStep === 'lead-capture' && (
            <LeadCapture onSubmit={handleLeadSubmit} />
          )}

          {currentStep === 'result' && result && (
            <ResultDisplay content={result} />
          )}
        </div>

        {currentStep !== 'category' && (
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