'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { nanoid } from 'nanoid';

export type FlowStep = 'category' | 'questions' | 'generating' | 'lead-capture' | 'result';

export interface FlowState {
  currentStep: FlowStep;
  selectedCategory: string | null;
  selectedNiche: string | null;
  answers: Record<string, any>;
  sessionId: string;
  result: string | null;
  source: 'web' | 'telegram';
}

interface FlowContextType extends FlowState {
  setCurrentStep: (step: FlowStep) => void;
  setCategory: (category: string, niche: string) => void;
  updateAnswers: (questionId: string, answer: any) => void;
  setResult: (result: string) => void;
  resetFlow: () => void;
  setSource: (source: 'web' | 'telegram') => void;
}

const FlowContext = createContext<FlowContextType | undefined>(undefined);

const STORAGE_KEY = 'gpt-magnet-flow-state';

export function FlowProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<FlowState>({
    currentStep: 'category',
    selectedCategory: null,
    selectedNiche: null,
    answers: {},
    sessionId: nanoid(),
    result: null,
    source: 'web'
  });

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setState(parsed);
      } catch (error) {
        console.error('Failed to parse saved flow state:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const setCurrentStep = (step: FlowStep) => {
    setState(prev => ({ ...prev, currentStep: step }));
  };

  const setCategory = (category: string, niche: string) => {
    setState(prev => ({
      ...prev,
      selectedCategory: category,
      selectedNiche: niche,
      currentStep: 'questions'
    }));
  };

  const updateAnswers = (questionId: string, answer: any) => {
    setState(prev => ({
      ...prev,
      answers: {
        ...prev.answers,
        [questionId]: answer
      }
    }));
  };

  const setResult = (result: string) => {
    setState(prev => ({ ...prev, result }));
  };

  const setSource = (source: 'web' | 'telegram') => {
    setState(prev => ({ ...prev, source }));
  };

  const resetFlow = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      currentStep: 'category',
      selectedCategory: null,
      selectedNiche: null,
      answers: {},
      sessionId: nanoid(),
      result: null,
      source: 'web'
    });
  };

  const value: FlowContextType = {
    ...state,
    setCurrentStep,
    setCategory,
    updateAnswers,
    setResult,
    resetFlow,
    setSource
  };

  return (
    <FlowContext.Provider value={value}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlowState() {
  const context = useContext(FlowContext);
  if (context === undefined) {
    throw new Error('useFlowState must be used within a FlowProvider');
  }
  return context;
}