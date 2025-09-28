// ===== WHITE-LABEL THEME CONFIGURATION =====
// Меняй эти параметры для каждого клиента - всё обновится автоматически

export interface ThemeConfig {
  // Brand Colors
  colors: {
    primary: string;           // Основной цвет кнопок
    primaryHover: string;       // При наведении
    background: string;         // Фон виджета
    cardBackground: string;     // Фон карточек/инпутов
    accent: string;             // Акцентный цвет
    text: string;               // Основной текст
    textLight: string;          // Вторичный текст
    textMuted: string;          // Приглушенный текст
    border: string;             // Границы элементов
  };

  // Avatar Settings
  avatar: {
    src: string;                // Путь к изображению аватара
    alt: string;                // Alt text для аватара
    size: number;               // Размер в px (обычный)
    largeSize: number;          // Размер в px (большой)
  };

  // Typography
  typography: {
    fontFamily: string;         // Шрифт
    questionSize: string;       // Размер вопроса
    hintSize: string;           // Размер подсказки
  };

  // Spacing
  spacing: {
    containerPadding: string;   // Отступы контейнера
    borderRadius: string;       // Скругление углов
    buttonPadding: string;      // Отступы кнопок
  };
}

// ===== ТЕКУЩАЯ ТЕМА (DEFAULT - Бело-голубая) =====
export const DEFAULT_THEME: ThemeConfig = {
  colors: {
    primary: '#4A90E2',
    primaryHover: '#357ABD',
    background: '#F8FAFB',
    cardBackground: '#FFFFFF',
    accent: '#5DA3F5',
    text: '#2C3E50',
    textLight: '#5A6C7D',
    textMuted: '#95A5A6',
    border: '#E0E7EE'
  },
  avatar: {
    src: '/images/assistant-avatar.png',  // Нейтральное имя
    alt: 'Assistant',
    size: 56,
    largeSize: 64
  },
  typography: {
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif",
    questionSize: '20px',
    hintSize: '14px'
  },
  spacing: {
    containerPadding: '30px',
    borderRadius: '18px',
    buttonPadding: '12px 24px'
  }
};

// ===== ПРИМЕРЫ ДРУГИХ ТЕМ =====

// Зелёная тема (старая Alfie)
export const ALFIE_GREEN_THEME: ThemeConfig = {
  ...DEFAULT_THEME,
  colors: {
    primary: '#4FBDBA',
    primaryHover: '#3A7A4C',
    background: '#C1F0ED',
    cardBackground: '#C8F7C5',
    accent: '#FF8C42',
    text: '#2D4A47',
    textLight: '#405A56',
    textMuted: '#6B7B78',
    border: '#4FBDBA'
  },
  avatar: {
    ...DEFAULT_THEME.avatar,
    src: '/images/alfie-avatar.png',
    alt: 'Alfie'
  }
};

// Фиолетовая тема (пример для клиента)
export const PURPLE_THEME: ThemeConfig = {
  ...DEFAULT_THEME,
  colors: {
    primary: '#7C3AED',
    primaryHover: '#6D28D9',
    background: '#FAF5FF',
    cardBackground: '#FFFFFF',
    accent: '#A78BFA',
    text: '#1F2937',
    textLight: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#E9D5FF'
  }
};

// Оранжевая тема (пример для клиента)
export const ORANGE_THEME: ThemeConfig = {
  ...DEFAULT_THEME,
  colors: {
    primary: '#F97316',
    primaryHover: '#EA580C',
    background: '#FFF7ED',
    cardBackground: '#FFFFFF',
    accent: '#FB923C',
    text: '#1F2937',
    textLight: '#6B7280',
    textMuted: '#9CA3AF',
    border: '#FED7AA'
  }
};

// ===== АКТИВНАЯ ТЕМА =====
// Меняй только эту строку чтобы сменить тему для всего виджета
export const ACTIVE_THEME = DEFAULT_THEME;

// ===== ГЕНЕРАЦИЯ CSS ПЕРЕМЕННЫХ =====
export function generateCSSVariables(theme: ThemeConfig): string {
  return `
    --widget-primary: ${theme.colors.primary};
    --widget-primary-hover: ${theme.colors.primaryHover};
    --widget-background: ${theme.colors.background};
    --widget-card-background: ${theme.colors.cardBackground};
    --widget-accent: ${theme.colors.accent};
    --widget-text: ${theme.colors.text};
    --widget-text-light: ${theme.colors.textLight};
    --widget-text-muted: ${theme.colors.textMuted};
    --widget-border: ${theme.colors.border};

    --widget-avatar-size: ${theme.avatar.size}px;
    --widget-avatar-large-size: ${theme.avatar.largeSize}px;

    --widget-font-family: ${theme.typography.fontFamily};
    --widget-question-size: ${theme.typography.questionSize};
    --widget-hint-size: ${theme.typography.hintSize};

    --widget-container-padding: ${theme.spacing.containerPadding};
    --widget-border-radius: ${theme.spacing.borderRadius};
    --widget-button-padding: ${theme.spacing.buttonPadding};
  `.trim();
}

// ===== ХЕЛПЕРЫ =====
export function getAvatarConfig() {
  return ACTIVE_THEME.avatar;
}

export function getThemeColors() {
  return ACTIVE_THEME.colors;
}