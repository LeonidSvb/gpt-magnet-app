'use client';

import { getActiveBusinessTypes } from '@/lib/questions';
import { trackEvent } from '@/lib/analytics';
import ProgressBar from './ProgressBar';

interface BusinessTypeSelectorProps {
  onSelect: (businessType: string) => void;
  sessionId: string;
}

export function BusinessTypeSelector({ onSelect, sessionId }: BusinessTypeSelectorProps) {
  const businessTypes = getActiveBusinessTypes();

  const handleSelect = (businessType: string) => {
    trackEvent('business_type_selected', {
      businessType,
      sessionId
    });
    onSelect(businessType);
  };

  return (
    <div className="alfie-embedded-chat">
      <ProgressBar current={1} total={5} />

      <div className="alfie-question-display-simple">
        <img
          src="/images/alfie-avatar.png"
          alt="Coach Assistant"
          width={48}
          height={48}
          className="alfie-question-avatar"
        />
        <div className="alfie-question-content">
          <h2 className="alfie-question-text-simple">
            What type of professional are you?
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--alfie-text-light)',
            margin: '8px 0 0 0',
            fontStyle: 'italic'
          }}>
            💡 This helps us create the perfect lead magnet for your specific audience
          </p>
        </div>
      </div>

      <div className="alfie-answer-options">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className="alfie-option-button"
            style={{ gridColumn: '1 / -1' }}
          >
            <div>
              <div style={{ fontWeight: '600', marginBottom: '4px' }}>{type.name}</div>
              <div style={{ fontSize: '12px', opacity: 0.8 }}>{type.description}</div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}