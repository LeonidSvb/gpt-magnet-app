import posthog from 'posthog-js';

// Initialize PostHog
export const initAnalytics = () => {
  if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com',
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') {
          console.log('PostHog loaded');
        }
      },
      capture_pageview: false, // We'll handle pageviews manually
      capture_pageleave: true,
      session_recording: {
        recordCrossOriginIframes: true,
      },
    });
  }
};

// Track events with enhanced data
export const trackEvent = (event: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    const enhancedProperties = {
      ...properties,
      timestamp: new Date().toISOString(),
      source: 'gpt-magnet',
      version: '1.0.0'
    };

    posthog.capture(event, enhancedProperties);

    if (process.env.NODE_ENV === 'development') {
      console.log('Tracked event:', event, enhancedProperties);
    }
  }
};

// Identify user (for leads)
export const identifyUser = (userId: string, traits?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.identify(userId, traits);
  }
};

// Track page views
export const trackPageView = (page: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && posthog) {
    posthog.capture('$pageview', {
      $current_url: window.location.href,
      page,
      ...properties
    });
  }
};

// Flow-specific tracking helpers
export const flowEvents = {
  // Flow lifecycle
  flowStarted: (sessionId: string) =>
    trackEvent('flow_started', { sessionId }),

  categorySelected: (category: string, niche: string, sessionId: string) =>
    trackEvent('category_selected', { category, niche, sessionId }),

  questionAnswered: (questionId: string, answer: any, sessionId: string, category: string) =>
    trackEvent('question_answered', {
      questionId,
      answer: typeof answer === 'object' ? JSON.stringify(answer) : answer,
      sessionId,
      category
    }),

  questionsCompleted: (category: string, niche: string, answerCount: number, sessionId: string) =>
    trackEvent('questions_completed', {
      category,
      niche,
      answerCount,
      sessionId
    }),

  generationStarted: (category: string, niche: string, sessionId: string) =>
    trackEvent('generation_started', { category, niche, sessionId }),

  generationCompleted: (category: string, niche: string, sessionId: string, duration?: number) =>
    trackEvent('generation_completed', {
      category,
      niche,
      sessionId,
      duration_seconds: duration
    }),

  leadCaptureShown: (sessionId: string, source: 'web' | 'telegram') =>
    trackEvent('lead_capture_shown', { sessionId, source }),

  leadSubmitted: (sessionId: string, contactType: 'email' | 'telegram') =>
    trackEvent('lead_submitted', { sessionId, contactType }),

  flowCompleted: (sessionId: string, category: string, niche: string) =>
    trackEvent('flow_completed', { sessionId, category, niche }),

  // Error tracking
  flowError: (error: string, step: string, sessionId: string) =>
    trackEvent('flow_error', { error, step, sessionId }),

  apiError: (endpoint: string, error: string, sessionId?: string) =>
    trackEvent('api_error', { endpoint, error, sessionId }),

  // User behavior
  backButtonClicked: (fromStep: string, toStep: string, sessionId: string) =>
    trackEvent('back_button_clicked', { fromStep, toStep, sessionId }),

  stepAbandoned: (step: string, timeSpent: number, sessionId: string) =>
    trackEvent('step_abandoned', { step, timeSpentSeconds: timeSpent, sessionId }),

  // Performance tracking
  loadTime: (component: string, duration: number) =>
    trackEvent('load_time', { component, durationMs: duration }),
};

// Legacy functions for backward compatibility
export const initPostHog = initAnalytics;

export default posthog;