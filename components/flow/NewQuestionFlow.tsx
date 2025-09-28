'use client';

import { useState } from 'react';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { getQuestionsForBusinessType, getTotalQuestions } from '@/lib/questions';
import { trackEvent } from '@/lib/analytics';

interface NewQuestionFlowProps {
  businessType: string;
  onComplete: (answers: Record<string, any>) => void;
  onBack: () => void;
  sessionId: string;
}

export function NewQuestionFlow({
  businessType,
  onComplete,
  onBack,
  sessionId
}: NewQuestionFlowProps) {
  const questions = getQuestionsForBusinessType(businessType);
  const totalQuestions = getTotalQuestions(businessType);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, any>>({});

  const currentQuestion = questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleAnswerChange = (value: any) => {
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: value
    };
    setAnswers(newAnswers);

    // Track answer for analytics
    trackEvent('question_answered', {
      questionId: currentQuestion.id,
      questionText: currentQuestion.text,
      answerValue: typeof value === 'string' ? value : JSON.stringify(value),
      sessionId,
      businessType,
      questionIndex: currentQuestionIndex
    });
  };

  const isAnswerValid = () => {
    const answer = answers[currentQuestion.id];

    if (!currentQuestion.required) return true;

    if (currentQuestion.type === 'text') {
      return answer && answer.trim().length > 0;
    }

    if (currentQuestion.type === 'single-choice') {
      return answer && answer.length > 0;
    }

    if (currentQuestion.type === 'multiple-choice' || currentQuestion.type === 'multi-with-other') {
      return Array.isArray(answer) && answer.length > 0;
    }

    return !!answer;
  };

  const handleNext = () => {
    if (!isAnswerValid()) return;

    if (isLastQuestion) {
      trackEvent('questionnaire_completed', {
        totalQuestions: questions.length,
        businessType,
        sessionId,
        answers: JSON.stringify(answers)
      });
      onComplete(answers);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      trackEvent('question_progressed', {
        fromIndex: currentQuestionIndex,
        toIndex: currentQuestionIndex + 1,
        sessionId,
        businessType
      });
    }
  };

  const handlePrev = () => {
    if (isFirstQuestion) {
      onBack();
    } else {
      setCurrentQuestionIndex(prev => prev - 1);
      trackEvent('question_back', {
        fromIndex: currentQuestionIndex,
        toIndex: currentQuestionIndex - 1,
        sessionId,
        businessType
      });
    }
  };

  if (!currentQuestion) {
    return <div>Loading questions...</div>;
  }

  return (
    <div className="alfie-embedded-chat">
      <ProgressBar
        current={currentQuestionIndex + 1}
        total={totalQuestions}
      />

      <QuestionCard
        question={currentQuestion}
        value={answers[currentQuestion.id]}
        onChange={handleAnswerChange}
        onNext={handleNext}
        onPrev={handlePrev}
        isFirst={isFirstQuestion}
        isLast={isLastQuestion}
        isValid={isAnswerValid()}
      />
    </div>
  );
}