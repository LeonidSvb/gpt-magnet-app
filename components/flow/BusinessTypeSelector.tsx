'use client';

import { getActiveBusinessTypes } from '@/lib/questions';
import { trackEvent } from '@/lib/analytics';
import { getAvatarConfig } from '@/lib/theme';
import ProgressBar from './ProgressBar';

interface BusinessTypeSelectorProps {
  onSelect: (businessType: string) => void;
  sessionId: string;
}

export function BusinessTypeSelector({ onSelect, sessionId }: BusinessTypeSelectorProps) {
  const businessTypes = getActiveBusinessTypes();
  const avatar = getAvatarConfig();

  const handleSelect = (businessType: string) => {
    trackEvent('business_type_selected', {
      businessType,
      sessionId
    });
    onSelect(businessType);
  };

  return (
    <div className="widget-container">
      <ProgressBar current={1} total={5} />

      <div className="widget-question-display">
        <img
          src={avatar.src}
          alt={avatar.alt}
          width={avatar.size}
          height={avatar.size}
          className="widget-question-avatar"
        />
        <div className="widget-question-content">
          <h2 className="widget-question-text">
            What type of professional are you?
          </h2>
          <p style={{
            fontSize: '14px',
            color: 'var(--widget-text-light)',
            margin: '8px 0 0 0',
            fontStyle: 'italic'
          }}>
            💡 This helps us create the perfect lead magnet for your specific audience
          </p>
        </div>
      </div>

      <div className="widget-answer-options">
        {businessTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className="widget-option-button"
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