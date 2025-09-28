import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
}

export default function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const progress = Math.min(Math.max((current / total) * 100, 0), 100);

  // Progress milestones with emojis - customized for lead magnet generation
  const milestones = [
    { emoji: '🎯', threshold: 0, label: 'Getting started' },
    { emoji: '👥', threshold: 20, label: 'Understanding your clients' },
    { emoji: '💡', threshold: 40, label: 'Defining your method' },
    { emoji: '🔥', threshold: 60, label: 'Crafting your advantage' },
    { emoji: '🚀', threshold: 80, label: 'Almost ready!' },
    { emoji: '✅', threshold: 100, label: 'Lead magnet ready!' }
  ];

  const currentMilestone = [...milestones].reverse().find(m => progress >= m.threshold) || milestones[0];
  const showCelebration = progress === 100;

  return (
    <div className={`alfie-progress-container ${className}`}>
      <div className="alfie-progress-header">
        <span className="alfie-progress-milestone">
          {currentMilestone.emoji} {currentMilestone.label}
        </span>
        {showCelebration && <span className="alfie-celebration">🎉✨</span>}
      </div>
      <div className="alfie-progress-track">
        <div
          className="alfie-progress-bar"
          style={{ width: `${progress}%` }}
        />
        <div className="alfie-progress-dots">
          {Array.from({ length: 5 }, (_, i) => {
            const dotProgress = (i + 1) * 20;
            const isActive = progress >= dotProgress;
            return (
              <div
                key={i}
                className={`alfie-progress-dot ${isActive ? 'active' : ''}`}
                style={{ left: `${dotProgress}%` }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}