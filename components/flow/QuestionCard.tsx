import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Question } from '@/lib/questions';

export interface QuestionCardProps {
  question: Question;
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onPrev?: () => void;
  isFirst: boolean;
  isLast: boolean;
  isValid: boolean;
}

export default function QuestionCard({
  question,
  value,
  onChange,
  onNext,
  onPrev,
  isFirst,
  isLast,
  isValid
}: QuestionCardProps) {
  const [otherText, setOtherText] = useState('');
  const [userJustClicked, setUserJustClicked] = useState(false);

  // Auto-advance for single-choice - only if user just clicked
  useEffect(() => {
    if (question.type === 'single-choice' && value && isValid && userJustClicked) {
      const timer = setTimeout(() => {
        onNext();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [value, question.type, isValid, onNext, userJustClicked]);

  // Clear state when question changes
  useEffect(() => {
    setOtherText('');
    setUserJustClicked(false);
  }, [question.id]);

  const handlePrev = () => {
    if (onPrev) onPrev();
  };

  const handleSingleChoice = (option: string) => {
    setUserJustClicked(true);
    onChange(option);
  };

  const handleMultipleChoice = (option: string) => {
    const currentValue = Array.isArray(value) ? value : [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter(v => v !== option)
      : [...currentValue, option];
    onChange(newValue);
  };

  const handleMultiWithOther = (option: string) => {
    const currentValue = Array.isArray(value) ? value : [];
    const newValue = currentValue.includes(option)
      ? currentValue.filter(v => v !== option)
      : [...currentValue, option];
    onChange(newValue);
  };

  const handleOtherTextChange = (text: string) => {
    setOtherText(text);
    if (text.trim()) {
      const currentValue = Array.isArray(value) ? value : [];
      // Remove any previous "other" entries and add new one
      const filteredValue = currentValue.filter(v => !v.startsWith('Other: '));
      const newValue = [...filteredValue, `Other: ${text.trim()}`];
      onChange(newValue);
    } else {
      // Remove other entry if text is empty
      const currentValue = Array.isArray(value) ? value : [];
      const filteredValue = currentValue.filter(v => !v.startsWith('Other: '));
      onChange(filteredValue);
    }
  };

  const handleTextChange = (text: string) => {
    onChange(text);
  };

  const getTextFieldHeight = (size: Question['fieldSize']) => {
    switch (size) {
      case 'small': return '60px';
      case 'medium': return '120px';
      case 'large': return '180px';
      default: return '60px';
    }
  };

  const renderInput = () => {
    switch (question.type) {
      case 'single-choice':
        return (
          <>
            {question.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleSingleChoice(option)}
                className={`alfie-option-button ${value === option ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </>
        );

      case 'multiple-choice':
        return (
          <>
            {question.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleMultipleChoice(option)}
                className={`alfie-multi-option-button ${Array.isArray(value) && value.includes(option) ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}
          </>
        );

      case 'multi-with-other':
        return (
          <>
            {question.options?.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleMultiWithOther(option)}
                className={`alfie-multi-option-button ${Array.isArray(value) && value.includes(option) ? 'selected' : ''}`}
              >
                {option}
              </button>
            ))}

            {question.hasOtherOption && (
              <div className="alfie-other-input-container">
                <input
                  key={`${question.id}-other`}
                  type="text"
                  value={otherText}
                  onChange={(e) => handleOtherTextChange(e.target.value)}
                  placeholder="Type your answer here..."
                  className="alfie-other-input"
                />
              </div>
            )}
          </>
        );

      case 'text':
        const isTextarea = question.fieldSize === 'medium' || question.fieldSize === 'large';
        return (
          <div className="alfie-custom-input" style={{gridColumn: '1 / -1'}}>
            {isTextarea ? (
              <textarea
                key={question.id}
                value={value || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={question.placeholder}
                className="alfie-input alfie-textarea"
                style={{
                  height: getTextFieldHeight(question.fieldSize),
                  resize: 'vertical',
                  minHeight: '60px'
                }}
              />
            ) : (
              <input
                key={question.id}
                type="text"
                value={value || ''}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder={question.placeholder}
                className="alfie-input"
              />
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="alfie-questions-section">
      {/* Question Display */}
      <div className="alfie-question-display-simple">
        <Image
          src="/images/alfie-avatar.png"
          alt="Coach Assistant"
          width={48}
          height={48}
          className="alfie-question-avatar"
          priority
        />
        <div className="alfie-question-content">
          <h2 className="alfie-question-text-simple">
            {question.text}
          </h2>

          {/* Hint display */}
          {question.hint && (
            <p style={{
              fontSize: '14px',
              color: 'var(--alfie-text-light)',
              margin: '8px 0 0 0',
              fontStyle: 'italic'
            }}>
              {question.hint}
            </p>
          )}

          {/* Multi-select hint */}
          {(question.type === 'multiple-choice' || question.type === 'multi-with-other') && !question.hint && (
            <p style={{
              fontSize: '14px',
              color: 'var(--alfie-text-light)',
              margin: '8px 0 0 0',
              fontStyle: 'italic'
            }}>
              select as many as you like
            </p>
          )}

          {/* Help text */}
          {question.helpText && (
            <p style={{
              fontSize: '12px',
              color: 'var(--alfie-text-muted)',
              margin: '4px 0 0 0',
              opacity: 0.7
            }}>
              {question.helpText}
            </p>
          )}
        </div>
      </div>

      {/* Answer Options */}
      <div className="alfie-answer-options">
        {renderInput()}
      </div>

      {/* Navigation - for all types except single-choice */}
      {(question.type === 'multiple-choice' || question.type === 'multi-with-other' || question.type === 'text') && (
        <div className="alfie-navigation">
          <button
            onClick={handlePrev}
            className="alfie-nav-button"
          >
            {isFirst ? '← Back to Start' : '← Back'}
          </button>
          <button
            onClick={onNext}
            disabled={!isValid}
            className={`alfie-nav-button ${isValid ? 'primary' : ''}`}
          >
            {isLast ? '✓ Generate My Lead Magnet' : 'Next →'}
          </button>
        </div>
      )}

      {/* Navigation for single-choice - only back button */}
      {question.type === 'single-choice' && (
        <div className="alfie-navigation" style={{ justifyContent: 'flex-start' }}>
          <button
            onClick={handlePrev}
            className="alfie-nav-button"
          >
            {isFirst ? '← Back to Start' : '← Back'}
          </button>
        </div>
      )}
    </div>
  );
}