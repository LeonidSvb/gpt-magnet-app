---
description: GPT Lead Magnet Project Specific Rules
globs: ["app/**/*", "components/**/*", "lib/**/*"]
alwaysApply: true
---

# GPT Lead Magnet Project Rules

## Project Context

This is a SaaS platform for creating AI-powered lead magnets. Users complete questionnaires, receive personalized AI-generated results, and businesses capture qualified leads.

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **UI**: Tailwind CSS 4, Radix UI, Shadcn components
- **Backend**: Supabase (PostgreSQL), OpenAI API
- **Analytics**: PostHog + Supabase dual tracking
- **Deployment**: Vercel

## File Structure Conventions

```
app/
├── page.tsx                    # Main landing/demo page
├── widget/                     # Embeddable widget
├── dashboard/                  # Business owner dashboard
├── api/                        # API routes
└── layout.tsx                  # Root layout

components/
├── flow/                       # Question flow components
├── ui/                         # Reusable UI components
└── providers/                  # Context providers

lib/
├── supabase.ts                 # Database client
├── openai.ts                   # AI generation
├── analytics.ts               # PostHog tracking
└── prompts.ts                  # AI prompts
```

## Component Patterns

### Flow Components
- Keep flow logic in `components/flow/`
- Use consistent naming: `QuestionCard`, `ProgressBar`, `ResultDisplay`
- Handle state with React Context or Zustand
- Always include loading and error states

### Widget Components
- Must work within iframe constraints
- Minimize bundle size for fast embedding
- Use scoped CSS classes to avoid conflicts
- Test responsive behavior across screen sizes

### UI Components
- Follow Radix UI + Tailwind patterns
- Implement proper accessibility features
- Use consistent spacing and color tokens
- Support both light and dark themes

## Data Flow Rules

### Database Operations
- Use type-safe Supabase client in `lib/supabase.ts`
- Follow three-table architecture: `sessions`, `leads`, `results`
- Store answers as JSONB for flexibility
- Always handle database errors gracefully

### AI Integration
- Use GPT-4o-mini for cost efficiency (<$0.01 per generation)
- Track token usage in `results` table
- Implement timeout handling (10s max)
- Store prompts used for audit trail

### Analytics Tracking
- **PostHog**: User behavior events (`wizard_started`, `question_answered`, etc.)
- **Supabase**: Business data (full answers, lead info, costs)
- Never duplicate data between systems
- Use session_id to correlate across platforms

## Business Logic Rules

### Question Flow
- Support different business types with dynamic questions
- Validate answers before AI generation
- Allow users to go back and edit answers
- Track completion rate and drop-off points

### Lead Capture
- Require email OR telegram_id (not both)
- Validate email format client and server-side
- Handle CRM integration via webhooks
- Provide immediate value before asking for contact info

### Result Generation
- Generate personalized recommendations based on answers
- Format output as markdown for rich display
- Include actionable next steps
- Allow re-generation if user unsatisfied

## Environment-Specific Rules

### Development
- Use random ports 3000-6000 for testing
- Close unused ports to avoid accumulation
- Test with real data, not mock data
- Use environment variables for all secrets

### Widget Embedding
- Test iframe embedding on different domains
- Ensure CORS headers are properly configured
- Minimize JavaScript bundle size
- Handle parent window communication safely

## Error Handling

- Provide user-friendly error messages
- Log detailed errors for debugging
- Implement graceful degradation for API failures
- Use error boundaries for React component errors

## Testing Requirements

- Test critical user flows with Playwright
- Ensure cross-browser compatibility
- Test responsive design on mobile devices
- Validate form submission and data persistence

## Apply when:
- Working in app/, components/, or lib/ directories
- Implementing questionnaire flows
- Integrating with Supabase or OpenAI
- Building embeddable widgets
- Handling user analytics and lead capture