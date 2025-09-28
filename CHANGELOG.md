# GPT Lead Magnet - Changelog

Все изменения в проекте GPT Lead Magnet будут документированы в этом файле.

## [v0.2.1] - 2025-09-28 (UI/UX Improvements & Bug Fixes) ✅ READY FOR TESTING

### 🎨 UI/UX IMPROVEMENTS
- **Fixed ProgressBar Duplication**: Removed external ProgressBar, kept only inside widget
- **Enlarged Avatars**: Increased avatar size from 32px to 48px for better visibility
- **Improved Text Fields**: Increased height (small: 60px, medium: 120px, large: 180px)
- **Unified LoadingSpinner**: Integrated with Alfie design system, reduced spacing
- **Fixed Component Architecture**: Updated from category/niche to businessType structure

### 🔧 TECHNICAL FIXES
- **API Integration**: Updated submit route to use businessType instead of category/niche
- **Component Imports**: Fixed all broken imports after refactoring (CategorySelector → BusinessTypeSelector)
- **Flow State**: Updated flow-state.tsx to support new businessType architecture
- **Mock API**: Added temporary mock responses for UI testing

### 🎯 CSS CUSTOMIZATION SYSTEM
- **Organized Variables**: Created easy-to-modify CSS variables in globals.css:
  - `--alfie-primary`: Main button and accent color
  - `--alfie-background`: Widget background
  - `--alfie-card-background`: Card and input field background
  - `--alfie-avatar-size`: Avatar sizing controls
- **Legacy Support**: Maintained backward compatibility with existing variable names

### ⚡ PERFORMANCE & DEVELOPMENT
- **Fast TypeScript Checking**: Use `npx tsc --noEmit` instead of full build for quick error checking
- **Port Management**: Follow frontend.md rules - random ports 3000-6000, kill unused processes
- **Error Handling**: Added graceful error handling with user-friendly messages

### 🚀 TESTING STATUS
- ✅ UI Components: All working correctly
- ✅ Progress Flow: Business type → Questions → Loading → Lead capture → Results
- ✅ Responsive Design: Mobile and desktop compatible
- ⏳ API Integration: Mock responses active, real integration pending
- ⏳ Database: Supabase connection needs configuration

## [v0.2.0] - 2025-09-28 (MVP Question System Implementation) 🚧 REQUIRES TESTING

### 🎯 NEW QUESTION ARCHITECTURE
- **Complete Questions Rewrite**: New questions.ts with MVP structure for Soft Coach niche
- **10 Optimized Questions**: Focused on lead magnet generation instead of generic assessment
- **Smart Field Types**: text/single-choice/multiple-choice/multi-with-other with proper validation
- **Business Type Structure**: Modular system supporting Soft Coach, Hard Coach, Agency, Other Professional

### 🎨 UI/UX OVERHAUL - IMPORTED FROM OUTDOOR PROJECT
- **QuestionCard Component**: Complete rewrite with Alfie-style design and iframe compatibility
- **ProgressBar Component**: Emoji milestones, animated progress dots, proper mobile support
- **Comprehensive CSS**: Full Alfie color palette and component styles imported
- **Smart Hints System**: Question-specific hints and help text for better user guidance

### 🧠 INTELLIGENT QUESTION DESIGN
- **Target-Focused Questions**: Ask about their CLIENTS, not about the coach themselves
- **Lead Magnet Specific**: Questions designed to generate personalized lead magnets
- **Field Size Optimization**: Small/medium/large text fields based on expected answer length
- **Qualification Questions**: Average price and client load for segmentation

### 🔧 COMPONENT ARCHITECTURE
- **BusinessTypeSelector**: Clean selection interface with descriptions
- **NewQuestionFlow**: Complete flow with analytics and state management
- **TestQuestionsPage**: Built-in testing interface at /test-questions
- **Modular Structure**: Easy to add new business types in the future

### ⚠️ BREAKING CHANGES & DEPRECATIONS
- **REMOVED**: CategorySelector.tsx, QuestionFlow.tsx, old questions/ folder
- **DEPRECATED**: getQuestionsForNiche() - use getQuestionsForBusinessType()
- **NEW**: All components now use new Question interface with hint/helpText/fieldSize

### 🧪 TESTING INFRASTRUCTURE
- **Test Page**: /test-questions route for manual testing
- **Analytics Integration**: Full tracking of question progression and answers
- **Development Ready**: Runs on localhost:3007 with hot reload

### ⚠️ KNOWN LIMITATIONS (Requires Testing)
- **Untested**: Manual testing required for all question flows
- **Single Business Type**: Only Soft Coach is active, others disabled
- **No Integration**: Lead magnet generation not yet connected
- **Potential Bugs**: New component interactions may have edge cases
- **Mobile Testing**: Responsive design needs validation
- **Analytics**: PostHog tracking events need verification

### 📊 TECHNICAL DETAILS
- **Files Added**: 6 new components, 1 test page, updated CSS
- **Files Removed**: 4 legacy components and question subfolder
- **Lines of Code**: ~800 lines of new React/TypeScript code
- **Dependencies**: No new packages, uses existing Next.js/React stack

### 🚀 NEXT STEPS REQUIRED
1. **Manual Testing**: Test all question flows and validation
2. **Mobile Testing**: Verify responsive design on different devices
3. **Integration**: Connect to lead magnet generation API
4. **Business Types**: Activate and test Hard Coach, Agency, Other Professional
5. **Edge Cases**: Test question navigation, back button, form validation

## [v0.1.0] - 2025-01-28 (Начальная архитектура проекта)

### 🚀 Создание проекта с нуля
- **Next.js 14 Setup**: Инициализация с TypeScript, Tailwind CSS, ESLint
- **Структура проекта**: app/, components/, lib/, types/, sql/ директории
- **Базовые зависимости**: Supabase, OpenAI, PostHog, Radix UI, react-hook-form, Zod

### 🗄️ Архитектура базы данных Supabase
- **3-табличная структура**: sessions, leads, results с правильными foreign keys
- **Sessions**: UUID primary keys, JSONB answers, статусы (started/completed/abandoned)
- **Leads**: Контактная информация с constraint email OR telegram_id
- **Results**: AI-сгенерированный markdown с метриками стоимости

### 🛠️ Типизированный слой базы данных
- **TypeScript типы**: Полная типизация Database interface в types/database.ts
- **CRUD библиотека**: lib/supabase-queries.ts с 15+ функциями для всех операций
- **Управление сессиями**: createSession(), updateSessionAnswers(), completeSession()
- **Управление лидами**: createLead(), getLead(), updateLeadStatus()

### 📊 Двойная аналитика
- **PostHog**: Поведенческая аналитика (воронки, A/B тесты, feature flags)
- **Supabase**: Бизнес-данные (лиды, AI результаты, стоимость генерации)
- **Разделение данных**: События в PostHog, бизнес-данные в Supabase

### 📋 Полная документация
- **ADR**: 4 Architecture Decision Records с техническими решениями
- **PRD**: Product Requirements Document с пользовательскими сценариями
- **SQL схема**: sql/001_init.sql готова к развертыванию в Supabase

### ✅ Готовая инфраструктура
- **Placeholder компоненты**: Структурированный скелет для реализации
- **API routes**: Заготовки для submit, generate, lead, telegram webhook
- **Environment template**: .env.local.example со всеми переменными
- **Build success**: Все TypeScript ошибки исправлены, Vercel deployment готов

### 🎯 Установленные метрики успеха
- **Lead Capture Rate**: >40% пользователей, завершивших опросник, оставляют email
- **Session Completion**: >60% пользователей, начавших опросник, завершают его
- **Cost per Generation**: <$0.01 за AI результат с GPT-4o-mini
- **CRM Integration**: 100% лидов попадают в n8n webhook без ошибок

---

## Архитектурные решения (ADR)

### ADR-0001: Next.js 14 + Supabase + Vercel
**Статус**: Принято
**Контекст**: Выбор основного стека для GPT Lead Magnet SaaS
**Решение**: Next.js 14 (App Router) + Supabase PostgreSQL + Vercel serverless
**Обоснование**: Быстрая разработка, бесплатный tier, автомасштабирование

### ADR-0002: OpenAI GPT-4o-mini
**Статус**: Принято
**Контекст**: Выбор AI модели для генерации лид-магнетов
**Решение**: GPT-4o-mini ($0.00015/1K tokens vs $0.03/1K для GPT-4)
**Обоснование**: Оптимальное соотношение цена/качество для массового использования

### ADR-0003: 3-табличная структура с JSONB
**Статус**: Принято
**Контекст**: Дизайн базы данных для гибких опросников
**Решение**: sessions + leads + results с JSONB для ответов
**Обоснование**: Гибкость опросников + производительность + нормализация бизнес-данных

### ADR-0004: Двойная аналитика PostHog + Supabase
**Статус**: Принято
**Контекст**: Аналитика без дублирования данных
**Решение**: PostHog для поведения, Supabase для бизнес-данных
**Обоснование**: Специализированные инструменты, нет дублирования, unified session_id