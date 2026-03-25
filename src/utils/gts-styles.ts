/**
 * GTS Styled Components Utility
 * Центральные стилевые константы для всех компонентов системы
 * 
 * Использование: import { GTSStyles } from '@/utils/gts-styles';
 */

export const GTSStyles = {
  // Основные цвета и фоны
  backgrounds: {
    main: 'bg-[var(--gts-portal-bg)]',
    surface: 'bg-[var(--gts-portal-surface)]', 
    card: 'bg-[var(--gts-portal-card)]',
    accent: 'bg-[var(--gts-portal-accent)]',
    success: 'bg-[var(--gts-portal-success)]',
    warning: 'bg-[var(--gts-portal-warning)]',
    error: 'bg-[var(--gts-portal-error)]',
  },

  // Цвета текста
  text: {
    primary: 'text-[var(--gts-portal-text)]',
    muted: 'text-[var(--gts-portal-text-muted)]',
    accent: 'text-[var(--gts-portal-accent)]',
    success: 'text-[var(--gts-portal-success)]',
    warning: 'text-[var(--gts-portal-warning)]',
    error: 'text-[var(--gts-portal-error)]',
    white: 'text-white',
  },

  // Границы
  borders: {
    default: 'border-[var(--gts-portal-border)]',
    accent: 'border-[var(--gts-portal-accent)]',
    success: 'border-[var(--gts-portal-success)]',
    warning: 'border-[var(--gts-portal-warning)]',
    error: 'border-[var(--gts-portal-error)]',
  },

  // Кнопки (стилизованные GTS, без системных белых кнопок)
  buttons: {
    primary: 'bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    secondary: 'bg-[#17181A] border-[#232428] border text-white hover:bg-[#1E1F21] hover:border-[#91040C]/30 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    ghost: 'text-white/60 hover:text-white hover:bg-white/10 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    outline: 'bg-transparent border-[#91040C] border text-[#91040C] hover:bg-[#91040C] hover:text-white font-medium rounded-xl px-4 py-2 transition-all duration-200',
    success: 'bg-[#2BB673] hover:bg-[#2BB673]/90 text-white border-0 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    warning: 'bg-[#F5A623] hover:bg-[#F5A623]/90 text-white border-0 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    error: 'bg-[#E5484D] hover:bg-[#E5484D]/90 text-white border-0 font-medium rounded-xl px-4 py-2 transition-all duration-200',
    dark: 'bg-[#0B0B0C] hover:bg-[#121214] text-white border-[#232428] border font-medium rounded-xl px-4 py-2 transition-all duration-200',
  },

  // Карточки (единый дизайн: #17181A, радиус 16px, белый текст, красные акценты)
  cards: {
    default: 'bg-[#17181A] border-[#232428] border rounded-2xl text-white',
    surface: 'bg-[#121214] border-[#232428] border rounded-2xl text-white',
    content: 'bg-[#17181A] border-[#232428] border rounded-2xl text-white',
    accent: 'bg-gradient-to-br from-[#91040C] to-[#7A0308] border-[#91040C] border rounded-2xl text-white',
    hover: 'hover:bg-[#1E1F21] hover:border-[#91040C]/30 transition-all duration-200',
    interactive: 'bg-[#17181A] border-[#232428] border rounded-2xl text-white cursor-pointer hover:bg-[#1E1F21] hover:border-[#91040C]/30 transition-all duration-200',
  },

  // Формы
  inputs: {
    default: 'bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] placeholder:text-[var(--gts-portal-text-muted)]',
    search: 'pl-10 bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)] placeholder:text-[var(--gts-portal-text-muted)]',
  },

  // Badges
  badges: {
    default: 'bg-[var(--gts-portal-accent)] text-white',
    success: 'bg-green-500 text-white',
    warning: 'bg-yellow-500 text-white', 
    error: 'bg-red-500 text-white',
    outline: 'border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]',
  },

  // Типографика
  typography: {
    h1: 'text-3xl text-[var(--gts-portal-text)] font-medium',
    h2: 'text-xl text-[var(--gts-portal-text)] font-medium',
    h3: 'text-lg text-[var(--gts-portal-text)] font-medium',
    body: 'text-base text-[var(--gts-portal-text)]',
    caption: 'text-sm text-[var(--gts-portal-text-muted)]',
    small: 'text-xs text-[var(--gts-portal-text-muted)]',
    headingFont: "font-family: 'var(--gts-font-heading)'",
    bodyFont: "font-family: 'var(--gts-font-body)'",
  },

  // Состояния
  states: {
    loading: 'opacity-50 pointer-events-none',
    disabled: 'opacity-50 cursor-not-allowed',
    hidden: 'hidden',
    visible: 'block',
  },

  // Переходы
  transitions: {
    default: 'transition-colors duration-200',
    all: 'transition-all duration-200',
    fast: 'transition-all duration-150',
    slow: 'transition-all duration-300',
  },

  // Тени
  shadows: {
    card: 'shadow-md',
    modal: 'shadow-xl',
    dropdown: 'shadow-lg',
  },

  // Иконки (единый стиль: тонкие контурные, 20/24px, белые с красным акцентом)
  icons: {
    small: 'w-4 h-4 stroke-2 text-white/60',
    medium: 'w-5 h-5 stroke-2 text-white/80',
    large: 'w-6 h-6 stroke-2 text-white',
    accent: 'w-5 h-5 stroke-2 text-[#91040C]',
    accentLarge: 'w-6 h-6 stroke-2 text-[#91040C]',
    interactive: 'w-5 h-5 stroke-2 text-white/60 hover:text-[#91040C] transition-colors duration-200',
    nav: 'w-5 h-5 stroke-2',
    button: 'w-4 h-4 stroke-2',
  },

  // Расположение (Layout)
  layout: {
    container: 'max-w-7xl mx-auto',
    page: 'min-h-screen',
    section: 'space-y-6',
    grid2: 'grid grid-cols-1 md:grid-cols-2 gap-4',
    grid3: 'grid grid-cols-1 md:grid-cols-3 gap-4', 
    grid4: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
    flexCenter: 'flex items-center justify-center',
    flexBetween: 'flex items-center justify-between',
  },
} as const;

/**
 * Функция для получения цвета статуса
 */
export const getStatusColor = (status: string): string => {
  const statusColors: Record<string, string> = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    pending: 'bg-yellow-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500',
    draft: 'bg-gray-500',
    published: 'bg-green-500',
    approved: 'bg-green-500',
    rejected: 'bg-red-500',
    cancelled: 'bg-red-500',
    completed: 'bg-blue-500',
    scheduled: 'bg-blue-500',
    confirmed: 'bg-green-500',
    overdue: 'bg-red-500',
    paid: 'bg-green-500',
    unpaid: 'bg-red-500',
    new: 'bg-blue-500',
    qualified: 'bg-green-500',
    contacted: 'bg-yellow-500',
    converted: 'bg-purple-500',
    lost: 'bg-red-500',
    connected: 'bg-green-500',
    disconnected: 'bg-gray-500',
    syncing: 'bg-blue-500',
    signed: 'bg-purple-500',
    archived: 'bg-gray-500',
    featured: 'bg-yellow-500',
  };
  
  return statusColors[status] || 'bg-gray-500';
};

/**
 * Функция для получения текста статуса
 */
export const getStatusText = (status: string): string => {
  const statusTexts: Record<string, string> = {
    active: 'Активен',
    inactive: 'Неактивен',
    pending: 'Ожидает',
    success: 'Успешно',
    error: 'Ошибка',
    warning: 'Предупреждение',
    draft: 'Черновик',
    published: 'Опубликовано',
    approved: 'Одобрено',
    rejected: 'Отклонено',
    cancelled: 'Отменено',
    completed: 'Завершено',
    scheduled: 'Запланировано',
    confirmed: 'Подтверждено',
    overdue: 'Просрочено',
    paid: 'Оплачено',
    unpaid: 'Не оплачено',
    new: 'Новый',
    qualified: 'Квалифицирован',
    contacted: 'Контакт',
    converted: 'Конверсия',
    lost: 'Потерян',
    connected: 'Подключено',
    disconnected: 'Отключено',
    syncing: 'Синхронизация',
    signed: 'Подписано',
    archived: 'Архив',
    featured: 'Рекомендуемое',
  };
  
  return statusTexts[status] || status;
};

/**
 * Функция для создания комбинированных стилей
 */
export const combineStyles = (...styles: string[]): string => {
  return styles.filter(Boolean).join(' ');
};

/**
 * Предустановленные компоненты с полными стилями
 */
export const GTSComponents = {
  // Заголовки страниц
  pageHeader: `${GTSStyles.backgrounds.surface} ${GTSStyles.borders.default} border-b p-4`,
  pageTitle: `${GTSStyles.typography.h2}`,
  pageSubtitle: `${GTSStyles.typography.caption}`,
  
  // Навигационные панели
  statsBar: `${GTSStyles.backgrounds.surface} ${GTSStyles.borders.default} border-b p-4`,
  statCard: `text-center`,
  statValue: `text-2xl ${GTSStyles.text.primary} font-semibold`,
  statLabel: `${GTSStyles.typography.caption}`,
  
  // Карточки содержимого
  contentCard: `${GTSStyles.cards.default} p-4`,
  cardHeader: `${GTSStyles.layout.flexBetween} mb-3`,
  cardTitle: `${GTSStyles.typography.h3}`,
  cardBody: `${GTSStyles.typography.body}`,
  
  // Кнопки
  primaryButton: `${GTSStyles.buttons.primary}`,
  secondaryButton: `${GTSStyles.buttons.secondary}`,
  ghostButton: `${GTSStyles.buttons.ghost}`,
  
  // Поля ввода
  searchInput: `${GTSStyles.inputs.search}`,
  textInput: `${GTSStyles.inputs.default}`,
  
  // Мета-информация
  metaText: `${GTSStyles.typography.caption}`,
  timestampText: `${GTSStyles.typography.small}`,
} as const;