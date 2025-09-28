'use client';

import { useState } from 'react';
import { BusinessTypeSelector } from '@/components/flow/BusinessTypeSelector';
import { NewQuestionFlow } from '@/components/flow/NewQuestionFlow';
import { getQuestionsForBusinessType } from '@/lib/questions';

export default function TestQuestionsPage() {
  const [selectedBusinessType, setSelectedBusinessType] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, any> | null>(null);

  const handleBusinessTypeSelect = (businessType: string) => {
    setSelectedBusinessType(businessType);
    setAnswers(null);
  };

  const handleQuestionnaireComplete = (questionnaireAnswers: Record<string, any>) => {
    setAnswers(questionnaireAnswers);
    console.log('Questionnaire completed:', questionnaireAnswers);
  };

  const handleReset = () => {
    setSelectedBusinessType(null);
    setAnswers(null);
  };

  const handleBackToBusiness = () => {
    setSelectedBusinessType(null);
  };

  if (answers) {
    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="alfie-embedded-chat">
          <h2 className="alfie-question-text-simple mb-4">✅ Questionnaire Complete!</h2>

          <div className="bg-green-50 p-4 rounded-lg mb-4">
            <h3 className="font-semibold mb-2">Answers Summary:</h3>
            <pre className="text-sm overflow-auto">
              {JSON.stringify(answers, null, 2)}
            </pre>
          </div>

          <button
            onClick={handleReset}
            className="alfie-nav-button w-full"
          >
            🔄 Test Again
          </button>
        </div>
      </div>
    );
  }

  if (selectedBusinessType) {
    const questions = getQuestionsForBusinessType(selectedBusinessType);

    return (
      <div className="container mx-auto p-4 max-w-2xl">
        <div className="mb-4 text-center">
          <h1 className="text-2xl font-bold mb-2">Testing Questions for: {selectedBusinessType}</h1>
          <p className="text-gray-600">Total Questions: {questions.length}</p>
        </div>

        <NewQuestionFlow
          businessType={selectedBusinessType}
          onComplete={handleQuestionnaireComplete}
          onBack={handleBackToBusiness}
          sessionId="test-session"
        />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <div className="mb-4 text-center">
        <h1 className="text-2xl font-bold mb-2">🧪 Lead Magnet Generator - Test Mode</h1>
        <p className="text-gray-600">Testing new question structure with improved UX</p>
      </div>

      <BusinessTypeSelector
        onSelect={handleBusinessTypeSelect}
        sessionId="test-session"
      />
    </div>
  );
}