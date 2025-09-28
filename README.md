# GPT Lead Magnet

Custom GPT-powered lead magnet application with web and Telegram support.

## Стек технологий

- **Frontend:** Next.js 14 (App Router), React 18, TypeScript
- **Styling:** Tailwind CSS, Radix UI
- **Backend:** Next.js API Routes (Serverless)
- **Database:** Supabase (PostgreSQL)
- **AI:** OpenAI GPT-4o-mini
- **Analytics:** PostHog
- **Integrations:** n8n (webhooks)
- **Deployment:** Vercel

## Быстрый старт

### 1. Установка зависимостей

```bash
npm install
```

### 2. Настройка окружения

Создай `.env.local` на основе `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Заполни переменные окружения:

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...

OPENAI_API_KEY=sk-...

NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/...

TELEGRAM_BOT_TOKEN=123456:ABC-DEF...
```

### 3. Настройка Supabase

1. Зарегистрируйся на [supabase.com](https://supabase.com)
2. Создай новый проект
3. Выполни SQL из `sql/001_init.sql` в Supabase SQL Editor
4. Скопируй URL и anon key в `.env.local`

### 4. Запуск dev сервера

```bash
npm run dev
```

Открой [http://localhost:3000](http://localhost:3000)

## Структура проекта

```
gpt-magnet/
├── app/
│   ├── widget/              # Универсальный виджет (веб + Telegram)
│   │   ├── page.tsx
│   │   └── components/
│   │       ├── Wizard.tsx         # Пошаговый опросник
│   │       ├── ResultView.tsx     # Отображение результата
│   │       └── LeadForm.tsx       # Форма захвата email
│   │
│   ├── telegram/            # Telegram Mini App обертка
│   │   └── page.tsx
│   │
│   ├── dashboard/           # Dashboard для просмотра лидов
│   │   ├── page.tsx
│   │   ├── leads/
│   │   ├── analytics/
│   │   └── settings/
│   │
│   └── api/                 # API Routes
│       ├── submit/route.ts        # Сохранение ответов
│       ├── generate/route.ts      # Генерация через OpenAI
│       ├── lead/route.ts          # Сохранение лида + n8n
│       └── telegram/webhook/route.ts  # Telegram Bot webhook
│
├── components/
│   ├── ui/                  # Переиспользуемые UI компоненты
│   └── shared/              # Общие компоненты
│
├── lib/
│   ├── supabase.ts          # Supabase client
│   ├── openai.ts            # OpenAI client
│   ├── prompts.ts           # AI prompt templates
│   ├── analytics.ts         # PostHog wrapper
│   ├── n8n.ts               # n8n webhook sender
│   ├── schema.ts            # Zod schemas для валидации
│   └── utils.ts             # Utility функции
│
├── types/
│   ├── index.ts             # Основные типы
│   └── database.ts          # Supabase типы
│
├── sql/
│   └── 001_init.sql         # Начальная схема БД
│
└── public/
    └── embed.js             # Скрипт для встраивания виджета
```

## Основные фичи

### ✅ Универсальный виджет
- Работает как веб-версия (iframe)
- Работает как Telegram Mini App
- Единая кодовая база

### ✅ AI-генерация результатов
- OpenAI GPT-4o-mini
- Кастомные промпты через `lib/prompts.ts`
- Markdown форматирование

### ✅ Захват лидов
- Email для веб-версии
- Telegram ID для Telegram версии
- Автоматическая отправка в CRM через n8n

### ✅ Analytics
- PostHog events tracking
- Конверсия воронки
- A/B тестирование (готово к использованию)

## Разработка

### Добавление новых вопросов

Измени конфигурацию в `app/widget/page.tsx`:

```tsx
const questions: Question[] = [
  {
    id: 'question_1',
    type: 'text',
    question: 'Ваш вопрос?',
    placeholder: 'Введите ответ...',
    required: true,
  },
]
```

### Кастомизация AI промпта

Измени `lib/prompts.ts`:

```typescript
export const DEFAULT_RESULT_TEMPLATE = `
Based on the following answers:
{{question_1}}
{{question_2}}

Generate a personalized result...
`
```

### Настройка Telegram бота

1. Создай бота через [@BotFather](https://t.me/BotFather)
2. Получи `TELEGRAM_BOT_TOKEN`
3. Настрой webhook: `/setMenuButton` → Web App URL
4. Добавь токен в `.env.local`

## Деплой

### Vercel (рекомендуется)

```bash
npm install -g vercel
vercel
```

Добавь environment variables в Vercel dashboard.

### Встраивание виджета на сайт

```html
<div id="gpt-magnet-widget"></div>
<script src="https://your-domain.vercel.app/embed.js"></script>
```

## TODO для доработки

- [ ] Реализовать логику в `app/widget/components/Wizard.tsx`
- [ ] Добавить UI компоненты в `components/ui/`
- [ ] Настроить dashboard в `app/dashboard/`
- [ ] Добавить PDF генерацию для результатов
- [ ] Настроить Telegram Bot в `app/api/telegram/webhook/route.ts`
- [ ] Добавить тесты

## Лицензия

MIT
