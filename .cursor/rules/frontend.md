---
description: Frontend Development Rules - TypeScript, React, Next.js, Tailwind
globs: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
alwaysApply: true
---

# Frontend Development Rules

## Core Principles

- Write clean, readable TypeScript code with accurate examples
- Use functional and declarative programming patterns; avoid classes
- Prefer early returns and guard clauses for better readability
- Use descriptive variable names with auxiliary verbs (e.g., isLoading, hasError)
- Focus on simplicity over performance optimization

## Naming Conventions

- **Variables & Functions**: camelCase (e.g., `handleClick`, `isLoading`)
- **Components**: PascalCase (e.g., `UserProfile`, `LeadForm`)
- **Files**: kebab-case (e.g., `user-profile.tsx`, `lead-form.tsx`)
- **Event handlers**: Prefix with "handle" (e.g., `handleSubmit`, `handleKeyDown`)
- **Boolean variables**: Use verbs (e.g., `isVisible`, `hasError`, `canSubmit`)

## TypeScript Usage

- Use TypeScript for all code; prefer interfaces over types
- Avoid `any` - create proper types instead
- Use functional components with TypeScript interfaces
- Define types for all props, state, and function parameters
- Use `const` instead of `function` for components: `const Button = () => {}`

## React/Next.js Best Practices

- Use Next.js 15 App Router structure
- Minimize 'use client' - prefer Server Components
- Use functional components with hooks
- Implement proper error boundaries
- Use Suspense with fallback for async components
- Structure files: component, subcomponents, helpers, types

## UI and Styling

- **Always use Tailwind classes** for styling - avoid CSS files
- Use mobile-first responsive design approach
- Implement proper accessibility features:
  - Add `tabindex="0"`, `aria-label` for interactive elements
  - Support keyboard navigation with `onKeyDown`
  - Ensure proper color contrast

## Code Structure

- Keep components under 200-300 lines
- Extract reusable logic into custom hooks
- Use early returns to avoid deep nesting
- Place static content and types at file end
- One export per file (prefer named exports)

## Form Handling

- Use React Hook Form with Zod validation
- Implement proper error handling and user feedback
- Use controlled components for form inputs
- Handle loading states during form submission

## Performance

- Use React.memo() for expensive components
- Implement proper image optimization (WebP, lazy loading)
- Use dynamic imports for code splitting
- Avoid inline functions in render methods

## Apply when:
- Working with .tsx, .ts, .jsx, .js files
- Building React components
- Implementing user interfaces
- Writing Next.js pages and API routes