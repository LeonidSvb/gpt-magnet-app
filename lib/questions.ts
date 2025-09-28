// ===== LEAD MAGNET GENERATOR - MVP STRUCTURE =====
// Optimized for maximum personalization with minimum complexity

export interface Question {
  id: string;
  text: string;
  type: 'text' | 'single-choice' | 'multiple-choice' | 'multi-with-other';
  options?: string[];
  required: boolean;
  placeholder?: string;
  hint?: string;           // 💡 Smart hints for better answers
  helpText?: string;       // Why we ask this question
  fieldSize?: 'small' | 'medium' | 'large'; // Text field size
  hasOtherOption?: boolean; // For multi-with-other type
}

export interface BusinessType {
  id: string;
  name: string;
  description: string;
  active: boolean;         // Feature flag for gradual rollout
}

// BUSINESS TYPES - Start with Soft Coach only
export const BUSINESS_TYPES: BusinessType[] = [
  { id: 'soft-coach', name: 'Soft Coach', description: 'Relationships, health, personal growth, mindset', active: true },
  { id: 'hard-coach', name: 'Hard Coach', description: 'Business, sales, performance, results-focused', active: false },
  { id: 'agency', name: 'Agency Owner', description: 'Running agency/service business', active: false },
  { id: 'other', name: 'Other Professional', description: 'Consultant, creator, specialist', active: false }
];

// Get only active business types for UI
export const getActiveBusinessTypes = () => BUSINESS_TYPES.filter(type => type.active);

// SOFT COACH NICHES (10 main specialties)
export const SOFT_COACH_NICHES = [
  { id: 'relationships-dating', name: 'Relationships & Dating', description: 'Finding love, improving marriage, dating confidence' },
  { id: 'health-wellness', name: 'Health & Wellness', description: 'Weight loss, fitness, mental health, stress management' },
  { id: 'personal-development', name: 'Personal Development', description: 'Confidence, habits, productivity, life purpose' },
  { id: 'mindset-psychology', name: 'Mindset & Psychology', description: 'Limiting beliefs, confidence, emotional intelligence' },
  { id: 'parenting-family', name: 'Parenting & Family', description: 'Raising kids, family dynamics, work-life balance' },
  { id: 'spirituality-purpose', name: 'Spirituality & Purpose', description: 'Life meaning, meditation, spiritual growth' },
  { id: 'career-transitions', name: 'Career Transitions', description: 'Job changes, finding passion, career pivots' },
  { id: 'womens-empowerment', name: 'Women\'s Empowerment', description: 'Female leadership, confidence, breaking barriers' },
  { id: 'addiction-recovery', name: 'Addiction & Recovery', description: 'Overcoming addictions, building healthy habits' },
  { id: 'senior-life', name: 'Senior Life Coaching', description: 'Retirement planning, aging gracefully, second careers' }
];

// ===== SOFT COACH QUESTIONS (MVP) =====
// 10 questions optimized for maximum lead magnet personalization

const SOFT_COACH_QUESTIONS: Question[] = [
  {
    id: 'niche',
    text: 'What\'s your coaching niche?',
    type: 'single-choice',
    options: SOFT_COACH_NICHES.map(niche => niche.name),
    required: true,
    helpText: 'This helps us customize your lead magnet language and examples'
  },
  {
    id: 'ideal_clients',
    text: 'Who are your ideal clients?',
    type: 'text',
    placeholder: 'e.g., Busy working moms in their 30s who struggle with self-care and confidence',
    hint: '💡 Be specific about age, situation, and background. The more detail, the better your magnet!',
    helpText: 'We\'ll use this to write in your clients\' language',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'main_struggle',
    text: 'What\'s their main struggle?',
    type: 'text',
    placeholder: 'e.g., They feel overwhelmed, guilty about taking time for themselves, and lost their sense of identity beyond being a mom',
    hint: '💡 Use emotional words they actually say. What keeps them up at night?',
    helpText: 'This becomes the core problem your magnet solves',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'transformation',
    text: 'What transformation do you provide?',
    type: 'text',
    placeholder: 'e.g., From feeling overwhelmed and invisible → Confident, energized mom who prioritizes herself and shows up powerfully for her family. They go from hiding in sweatpants to feeling beautiful and purposeful again.',
    hint: '💡 Paint the before/after picture. Include emotions, not just actions',
    helpText: 'This becomes your magnet\'s main promise',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_method',
    text: 'What\'s your unique method or approach?',
    type: 'text',
    placeholder: 'e.g., The SHINE Method: S-Self awareness, H-Healthy boundaries, I-Inner confidence, N-Nurturing habits, E-Empowered action',
    hint: '💡 Give it a name if you have one. Explain your key steps or principles',
    helpText: 'This becomes the framework inside your lead magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_advantage',
    text: 'What makes you different from other coaches?',
    type: 'text',
    placeholder: 'e.g., I\'m a former corporate executive turned mom who overcame postpartum depression. I combine business strategy with emotional healing.',
    hint: '💡 Your story, credentials, or unique perspective. What\'s your unfair advantage?',
    helpText: 'This adds credibility and authority to your magnet',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'discovery_questions',
    text: 'What key questions do you ask new clients?',
    type: 'text',
    placeholder: 'e.g., What does your ideal day look like? When did you last feel truly confident? What would change if you put yourself first? What\'s your biggest fear about taking time for yourself?',
    hint: '💡 List 3-5 powerful questions that get to the heart of their situation',
    helpText: 'We\'ll include these as self-assessment tools in your magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'surprising_insight',
    text: 'What\'s one surprising insight about your niche?',
    type: 'text',
    placeholder: 'e.g., Most moms think self-care is selfish, but studies show children of mothers who prioritize self-care have higher emotional intelligence',
    hint: '💡 What myth do you bust? What do people get wrong? Your contrarian viewpoint?',
    helpText: 'This creates a unique angle that makes your magnet stand out',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'average_price',
    text: 'Average service price',
    type: 'single-choice',
    options: [
      'Under $500',
      '$500 - $2,000',
      '$2,000 - $5,000',
      '$5,000 - $10,000',
      '$10,000+'
    ],
    helpText: 'Helps us match your magnet sophistication to your service level',
    required: true
  },
  {
    id: 'client_load',
    text: 'Current client load',
    type: 'single-choice',
    options: [
      'Looking for my first clients',
      '1-5 active clients',
      '6-15 active clients',
      '15+ active clients',
      'Waitlist/fully booked'
    ],
    helpText: 'Helps us understand your business stage for follow-up',
    required: true
  }
];

// ===== FUTURE: OTHER BUSINESS TYPE QUESTIONS =====
// Will be added in Phase 2 and 3

const HARD_COACH_QUESTIONS: Question[] = [
  // TODO: Add hard coach questions in Phase 2
];

const AGENCY_QUESTIONS: Question[] = [
  // TODO: Add agency questions in Phase 2
];

const OTHER_PROFESSIONAL_QUESTIONS: Question[] = [
  // TODO: Add other professional questions in Phase 3
];

// ===== MAIN FUNCTION: Get Questions by Business Type =====
export const getQuestionsForBusinessType = (businessType: string): Question[] => {
  switch (businessType) {
    case 'soft-coach':
      return SOFT_COACH_QUESTIONS;
    case 'hard-coach':
      return HARD_COACH_QUESTIONS; // Empty for now
    case 'agency':
      return AGENCY_QUESTIONS;     // Empty for now
    case 'other':
      return OTHER_PROFESSIONAL_QUESTIONS; // Empty for now
    default:
      return SOFT_COACH_QUESTIONS; // Default to soft coach
  }
};

// ===== UTILITY FUNCTIONS =====
export const getTotalQuestions = (businessType: string): number => {
  return getQuestionsForBusinessType(businessType).length;
};

export const getNicheOptions = (businessType: string): string[] => {
  switch (businessType) {
    case 'soft-coach':
      return SOFT_COACH_NICHES.map(niche => niche.name);
    default:
      return [];
  }
};

// ===== LEGACY COMPATIBILITY =====
// These exports maintain compatibility with existing components
// TODO: Remove these after migrating all components to new structure

export interface Category {
  id: string;
  name: string;
  description: string;
  niches: { id: string; name: string; description: string; }[];
}

export const CATEGORIES: Category[] = [
  {
    id: 'soft-coach',
    name: 'Soft Coach',
    description: 'Relationships, health, personal growth, mindset',
    niches: SOFT_COACH_NICHES
  }
];

// Legacy function - will be removed after migration
export const getQuestionsForNiche = (category: string, niche: string): Question[] => {
  console.warn('getQuestionsForNiche is deprecated. Use getQuestionsForBusinessType instead.');
  return getQuestionsForBusinessType('soft-coach');
};

export const getContactFields = (source: 'web' | 'telegram') => {
  if (source === 'telegram') {
    return [
      { id: 'name', label: 'Your Name', type: 'text', required: true },
      { id: 'telegram_id', label: 'Telegram Username', type: 'text', required: true }
    ];
  }
  return [
    { id: 'name', label: 'Your Name', type: 'email', required: true },
    { id: 'email', label: 'Email Address', type: 'email', required: true }
  ];
};

// Export main function as default
export default getQuestionsForBusinessType;