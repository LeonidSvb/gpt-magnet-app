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

// ===== SHARED CONSTANTS (DRY - Don't Repeat Yourself) =====
// Reused across multiple business types

export const PRICE_RANGES = [
  'Under $500',
  '$500 - $2,000',
  '$2,000 - $5,000',
  '$5,000 - $10,000',
  '$10,000+'
];

export const CLIENT_LOAD_OPTIONS = [
  'Looking for my first clients',
  '1-5 active clients',
  '6-15 active clients',
  '15+ active clients',
  'Waitlist/fully booked'
];

export interface BusinessType {
  id: string;
  name: string;
  description: string;
  active: boolean;         // Feature flag for gradual rollout
}

// BUSINESS TYPES - All active
export const BUSINESS_TYPES: BusinessType[] = [
  { id: 'soft-coach', name: 'Soft Coach', description: 'Relationships, health, personal growth, mindset', active: true },
  { id: 'hard-coach', name: 'Hard Coach', description: 'Business, sales, performance, results-focused', active: true },
  { id: 'agency', name: 'Agency Owner', description: 'Running agency/service business', active: true },
  { id: 'other', name: 'Other Professional', description: 'Consultant, creator, specialist', active: true }
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
    options: PRICE_RANGES,
    helpText: 'Helps us match your magnet sophistication to your service level',
    required: true
  },
  {
    id: 'client_load',
    text: 'Current client load',
    type: 'single-choice',
    options: CLIENT_LOAD_OPTIONS,
    helpText: 'Helps us understand your business stage for follow-up',
    required: true
  }
];

// ===== HARD COACH NICHES =====
export const HARD_COACH_NICHES = [
  { id: 'business-growth', name: 'Business Growth & Scaling', description: 'Revenue growth, scaling operations, strategic expansion' },
  { id: 'sales-performance', name: 'Sales Performance', description: 'Sales training, closing deals, pipeline management' },
  { id: 'leadership-management', name: 'Leadership & Management', description: 'Team leadership, executive presence, decision-making' },
  { id: 'entrepreneurship', name: 'Entrepreneurship & Startups', description: 'Starting businesses, funding, product-market fit' },
  { id: 'productivity-performance', name: 'Productivity & Performance', description: 'Time management, peak performance, efficiency systems' },
  { id: 'finance-investing', name: 'Finance & Investing', description: 'Wealth building, investment strategy, financial planning' },
  { id: 'real-estate', name: 'Real Estate', description: 'Property investing, real estate business, market analysis' },
  { id: 'ecommerce-online', name: 'E-commerce & Online Business', description: 'Online stores, digital products, marketplace selling' },
  { id: 'corporate-consulting', name: 'Corporate Consulting', description: 'Strategy consulting, process optimization, change management' },
  { id: 'performance-athletes', name: 'Performance Coaching (Athletes/Executives)', description: 'High-performance mindset, competition, peak state' }
];

// ===== HARD COACH QUESTIONS =====
const HARD_COACH_QUESTIONS: Question[] = [
  {
    id: 'niche',
    text: 'What\'s your coaching niche?',
    type: 'single-choice',
    options: HARD_COACH_NICHES.map(niche => niche.name),
    required: true,
    helpText: 'This helps us customize your lead magnet language and examples'
  },
  {
    id: 'ideal_clients',
    text: 'Who are your ideal clients?',
    type: 'text',
    placeholder: 'e.g., B2B SaaS founders with $500K-$2M ARR who are stuck at a revenue plateau and need systems to scale',
    hint: '💡 Be specific about industry, revenue range, and business stage. The more detail, the better your magnet!',
    helpText: 'We\'ll use this to write in your clients\' language',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'main_struggle',
    text: 'What\'s their main struggle?',
    type: 'text',
    placeholder: 'e.g., They\'re working 70+ hours but revenue is flat. They lack systems, their team is chaotic, and they\'re the bottleneck in every decision. They fear they built a job, not a business.',
    hint: '💡 Focus on business pain points and metrics. What\'s costing them money or time?',
    helpText: 'This becomes the core problem your magnet solves',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'transformation',
    text: 'What transformation do you provide?',
    type: 'text',
    placeholder: 'e.g., From overwhelmed founder working IN the business → Strategic CEO working ON the business. Revenue grows 2-3x while working 30% less. They have systems, a strong team, and predictable growth.',
    hint: '💡 Include specific metrics, timeframes, or ROI. Show the business impact clearly',
    helpText: 'This becomes your magnet\'s main promise',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_method',
    text: 'What\'s your unique method or approach?',
    type: 'text',
    placeholder: 'e.g., The SCALE Framework: S-Systems audit, C-Core metrics, A-Automate operations, L-Leadership team, E-Exit-ready business. Gets clients to 7-figures in 18 months.',
    hint: '💡 Give it a name if you have one. Include key steps and expected results',
    helpText: 'This becomes the framework inside your lead magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_advantage',
    text: 'What makes you different from other coaches?',
    type: 'text',
    placeholder: 'e.g., I scaled 3 SaaS companies to 8-figures and exited twice. I combine operational systems from McKinsey with real founder experience in the trenches.',
    hint: '💡 Your track record, exits, certifications, or unique background. What results have YOU achieved?',
    helpText: 'This adds credibility and authority to your magnet',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'discovery_questions',
    text: 'What key questions do you ask new clients?',
    type: 'text',
    placeholder: 'e.g., What\'s your current monthly revenue and profit margin? Where are you the bottleneck? If you disappeared for 30 days, would the business survive? What\'s your exit goal and timeline?',
    hint: '💡 List 3-5 diagnostic questions that reveal their business health and readiness',
    helpText: 'We\'ll include these as self-assessment tools in your magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'surprising_insight',
    text: 'What\'s one surprising insight about your niche?',
    type: 'text',
    placeholder: 'e.g., 80% of businesses that hit $1M revenue never reach $3M - not because of marketing, but because founders refuse to fire themselves from operations',
    hint: '💡 What myth do you bust? What counterintuitive truth separates winners from losers?',
    helpText: 'This creates a unique angle that makes your magnet stand out',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'average_price',
    text: 'Average service price',
    type: 'single-choice',
    options: [
      'Under $1,000',
      '$1,000 - $3,000',
      '$3,000 - $10,000',
      '$10,000 - $25,000',
      '$25,000+'
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
      '1-3 active clients',
      '4-10 active clients',
      '10-20 active clients',
      'Waitlist/fully booked'
    ],
    helpText: 'Helps us understand your business stage for follow-up',
    required: true
  }
];

// ===== AGENCY NICHES =====
export const AGENCY_NICHES = [
  { id: 'digital-marketing', name: 'Digital Marketing Agency', description: 'Full-funnel marketing, ads, growth strategy' },
  { id: 'web-development', name: 'Web Development Agency', description: 'Websites, web apps, custom development' },
  { id: 'design-agency', name: 'Design Agency', description: 'Branding, UI/UX, graphic design' },
  { id: 'seo-ppc', name: 'SEO/PPC Agency', description: 'Search optimization, paid ads, performance marketing' },
  { id: 'social-media', name: 'Social Media Agency', description: 'Social strategy, content creation, community management' },
  { id: 'video-production', name: 'Video Production Agency', description: 'Video content, commercials, brand films' },
  { id: 'content-agency', name: 'Content Agency', description: 'Content strategy, copywriting, content marketing' },
  { id: 'pr-agency', name: 'PR Agency', description: 'Public relations, media coverage, reputation management' },
  { id: 'branding-agency', name: 'Branding Agency', description: 'Brand strategy, identity, positioning' },
  { id: 'full-service', name: 'Full-Service Agency', description: 'End-to-end marketing and creative services' }
];

// ===== AGENCY QUESTIONS =====
const AGENCY_QUESTIONS: Question[] = [
  {
    id: 'niche',
    text: 'What type of agency do you run?',
    type: 'single-choice',
    options: AGENCY_NICHES.map(niche => niche.name),
    required: true,
    helpText: 'This helps us customize your lead magnet language and examples'
  },
  {
    id: 'ideal_clients',
    text: 'Who are your ideal clients?',
    type: 'text',
    placeholder: 'e.g., E-commerce brands doing $2M-$10M annual revenue who need to scale their paid ads profitably while maintaining ROAS above 3x',
    hint: '💡 Be specific about industry, revenue, and their main goal. The more detail, the better your magnet!',
    helpText: 'We\'ll use this to write in your clients\' language',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'main_struggle',
    text: 'What\'s their main struggle?',
    type: 'text',
    placeholder: 'e.g., They\'ve tried 3-4 agencies that overpromised and underdelivered. They\'re wasting $20K+/month on ads with inconsistent results. They don\'t trust agencies anymore and need proof before committing.',
    hint: '💡 What pain did previous agencies cause? What are they losing money on?',
    helpText: 'This becomes the core problem your magnet solves',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'transformation',
    text: 'What transformation do you provide?',
    type: 'text',
    placeholder: 'e.g., From inconsistent ad results and wasted budget → Predictable 4-5x ROAS with profitable scaling. They go from $50K to $200K monthly ad spend while maintaining margins. Full transparency and weekly ROI reports.',
    hint: '💡 Include specific metrics, ROAS, revenue impact. Show the business results clearly',
    helpText: 'This becomes your magnet\'s main promise',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_method',
    text: 'What\'s your unique method or approach?',
    type: 'text',
    placeholder: 'e.g., The PROFIT Framework: P-Pixel perfect tracking, R-ROAS benchmarking, O-Offer testing, F-Funnel optimization, I-Incremental scaling, T-Transparent reporting. Guaranteed 3x ROAS or money back.',
    hint: '💡 Give it a name if you have one. Explain your process and guarantees',
    helpText: 'This becomes the framework inside your lead magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_advantage',
    text: 'What makes you different from other agencies?',
    type: 'text',
    placeholder: 'e.g., We\'ve managed $50M+ in ad spend across 200+ e-commerce brands. Unlike typical agencies, we only take 10 clients max and guarantee results. Former Facebook ads manager on the team.',
    hint: '💡 Your track record, case studies, team credentials. What results have you delivered?',
    helpText: 'This adds credibility and authority to your magnet',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'discovery_questions',
    text: 'What key questions do you ask new clients?',
    type: 'text',
    placeholder: 'e.g., What\'s your current monthly ad spend and ROAS? What\'s your average order value and customer LTV? What offers have you tested? What\'s your biggest bottleneck - traffic, conversion, or retention?',
    hint: '💡 List 3-5 diagnostic questions that reveal if they\'re a good fit',
    helpText: 'We\'ll include these as self-assessment tools in your magnet',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'surprising_insight',
    text: 'What\'s one surprising insight about your niche?',
    type: 'text',
    placeholder: 'e.g., 90% of failed ad campaigns aren\'t due to bad creative or targeting - they fail because the offer itself doesn\'t match what the market actually wants to buy',
    hint: '💡 What myth do you bust? What do most agencies get wrong?',
    helpText: 'This creates a unique angle that makes your magnet stand out',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'average_price',
    text: 'Average monthly retainer',
    type: 'single-choice',
    options: [
      'Under $2,000/month',
      '$2,000 - $5,000/month',
      '$5,000 - $15,000/month',
      '$15,000 - $50,000/month',
      '$50,000+/month'
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
      '1-3 active clients',
      '4-8 active clients',
      '8-15 active clients',
      'Waitlist/fully booked'
    ],
    helpText: 'Helps us understand your business stage for follow-up',
    required: true
  }
];

// ===== OTHER PROFESSIONAL NICHES =====
// Note: "Other Professional" doesn't use niche dropdown anymore
// Instead, users type their profession directly (more flexible for fallback category)
export const OTHER_PROFESSIONAL_NICHES = [
  { id: 'other', name: 'Other Professional', description: 'Any professional service or expertise' }
];

// ===== OTHER PROFESSIONAL QUESTIONS =====
// Generic fallback questions for any professional not covered by specific categories
const OTHER_PROFESSIONAL_QUESTIONS: Question[] = [
  {
    id: 'profession',
    text: 'What is your profession or area of expertise?',
    type: 'text',
    placeholder: 'e.g., Financial advisor, Therapist, Real estate agent, Nutritionist, Interior designer, Lawyer...',
    hint: '💡 Be specific - this helps us tailor your lead magnet to your industry',
    helpText: 'We use this to customize language and examples for your field',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'ideal_clients',
    text: 'Who are the people you work with or serve?',
    type: 'text',
    placeholder: 'Describe them: age range, profession, life stage, income level, location, specific situation...',
    hint: '💡 Paint a picture of your ideal person - who benefits most from your expertise?',
    helpText: 'The more specific you are, the better we can personalize your lead magnet',
    fieldSize: 'medium',
    required: true
  },
  {
    id: 'main_struggle',
    text: 'What are the top 3 challenges or problems they face?',
    type: 'text',
    placeholder: 'List their biggest struggles, pain points, or frustrations related to what you help with...',
    hint: '💡 What keeps them up at night? What problem brought them to you?',
    helpText: 'This becomes the core problem your lead magnet addresses',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'transformation',
    text: 'What outcome or transformation do people experience after working with you?',
    type: 'text',
    placeholder: 'Describe the "before and after" - what changes for them? What do they achieve or become?',
    hint: '💡 Focus on results and impact, not just your process. What\'s different in their life?',
    helpText: 'This becomes your lead magnet\'s value proposition',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'services_offered',
    text: 'What services or solutions do you provide?',
    type: 'text',
    placeholder: 'Describe what you offer and how you help solve their problems...',
    hint: '💡 Your core offering - what do people hire you for or buy from you?',
    helpText: 'This helps us understand your business model',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'unique_approach',
    text: 'What makes your approach or method unique?',
    type: 'text',
    placeholder: 'What do you do differently than others in your field? Your philosophy, methodology, or secret sauce...',
    hint: '💡 Your unique perspective, proprietary process, or special framework',
    helpText: 'This differentiates your lead magnet from generic content',
    fieldSize: 'large',
    required: true
  },
  {
    id: 'common_objections',
    text: 'What doubts or concerns do people have before working with you?',
    type: 'text',
    placeholder: 'E.g., "Too expensive", "Not sure it will work for me", "No time", "Already tried similar things"...',
    hint: '💡 What stops people from saying yes? What questions do they ask?',
    helpText: 'Understanding objections helps create a more persuasive lead magnet',
    fieldSize: 'large',
    required: false
  },
  {
    id: 'industry_specifics',
    text: 'Is there anything specific about your industry or niche we should know?',
    type: 'text',
    placeholder: 'Regulations, trends, common misconceptions, seasonal factors, terminology...',
    hint: '💡 Context that helps us understand your market better',
    helpText: 'Industry-specific details make your lead magnet more relevant and credible',
    fieldSize: 'large',
    required: false
  },
  {
    id: 'lead_magnet_goal',
    text: 'What do you want to achieve with your lead magnet?',
    type: 'single-choice',
    options: [
      'Build email list',
      'Qualify leads for my service',
      'Educate prospects about my approach',
      'Pre-sell or warm up for offer',
      'Establish authority in my niche'
    ],
    helpText: 'Your main goal shapes the type and content of your lead magnet',
    required: true
  },
  {
    id: 'average_price',
    text: 'Average service price',
    type: 'single-choice',
    options: PRICE_RANGES,
    helpText: 'Helps us match your magnet sophistication to your service level',
    required: true
  },
  {
    id: 'client_load',
    text: 'Current client load',
    type: 'single-choice',
    options: CLIENT_LOAD_OPTIONS,
    helpText: 'Helps us understand your business stage',
    required: true
  }
];

// ===== MAIN FUNCTION: Get Questions by Business Type =====
export const getQuestionsForBusinessType = (businessType: string): Question[] => {
  switch (businessType) {
    case 'soft-coach':
      return SOFT_COACH_QUESTIONS;
    case 'hard-coach':
      return HARD_COACH_QUESTIONS;
    case 'agency':
      return AGENCY_QUESTIONS;
    case 'other':
      return OTHER_PROFESSIONAL_QUESTIONS;
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
    case 'hard-coach':
      return HARD_COACH_NICHES.map(niche => niche.name);
    case 'agency':
      return AGENCY_NICHES.map(niche => niche.name);
    case 'other':
      return OTHER_PROFESSIONAL_NICHES.map(niche => niche.name);
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