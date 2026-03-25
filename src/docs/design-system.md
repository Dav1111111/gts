# GTS Design System

Единая система дизайна для всех модулей проекта Grand Tour Sochi.

## 🎯 Цель

Обеспечить единый визуальный язык во всех компонентах системы и исключить использование хардкодированных цветов и стилей.

## 📁 Структура

```
/styles/
  └── design-tokens.css      # Централизованные дизайн-токены
  └── globals.css           # Основные стили (импортирует design-tokens.css)

/utils/
  └── gts-styles.ts         # Утилиты и константы стилей

/components/ui-kit/
  └── GTSUIKit.tsx          # Система дизайна (00_UI_Kit)
```

## 🎨 Цветовая схема

### Основные цвета портала (темная схема)
```css
--gts-portal-bg: #0B0B0C           /* Основной фон */
--gts-portal-surface: #121214      /* Поверхности */
--gts-portal-card: #17181A         /* Карточки */
--gts-portal-text: #FFFFFF         /* Основной текст */
--gts-portal-text-muted: #A6A7AA   /* Второстепенный текст */
--gts-portal-border: #232428       /* Границы */
--gts-portal-accent: #91040C       /* Акценты */
```

### Бренд цвета
```css
--gts-brand-black: #000000
--gts-brand-white: #ffffff  
--gts-brand-red: #91040C
```

### Статусные цвета
```css
--gts-portal-success: #2BB673
--gts-portal-warning: #F5A623
--gts-portal-error: #E5484D
--gts-portal-info: #3B82F6
```

## 📝 Типографика

### Шрифты
```css
--gts-font-heading: 'Nokia.Kokia', 'Inter', system-ui, sans-serif;
--gts-font-body: 'Gilroy', 'Inter', system-ui, sans-serif;
--gts-font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Размеры
```css
--gts-text-xs: 0.75rem    /* 12px */
--gts-text-sm: 0.875rem   /* 14px */
--gts-text-base: 1rem     /* 16px */
--gts-text-lg: 1.125rem   /* 18px */
--gts-text-xl: 1.25rem    /* 20px */
--gts-text-2xl: 1.5rem    /* 24px */
--gts-text-3xl: 1.875rem  /* 30px */
```

## 🧩 Использование в компонентах

### 1. Импорт утилит
```tsx
import { GTSStyles, GTSComponents, getStatusColor, getStatusText } from "../../utils/gts-styles";
```

### 2. Основная структура страницы
```tsx
<div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
  {/* Header */}
  <div className={GTSComponents.pageHeader}>
    <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
      Заголовок страницы
    </h1>
    <p className={GTSComponents.pageSubtitle}>
      Описание страницы
    </p>
  </div>
  
  {/* Content */}
  <div className="p-6">
    <Card className={GTSComponents.contentCard}>
      <h3 className={GTSComponents.cardTitle}>Заголовок карточки</h3>
      <p className={GTSComponents.cardBody}>Содержимое карточки</p>
    </Card>
  </div>
</div>
```

### 3. Кнопки
```tsx
{/* Основная кнопка */}
<Button className={GTSStyles.buttons.primary}>
  Основное действие
</Button>

{/* Второстепенная кнопка */}
<Button variant="outline" className={GTSStyles.buttons.secondary}>
  Второстепенное действие
</Button>

{/* Минимальная кнопка */}
<Button variant="ghost" className={GTSStyles.buttons.ghost}>
  Минимальное действие
</Button>
```

### 4. Поля ввода
```tsx
{/* Обычное поле */}
<input className={GTSStyles.inputs.default} placeholder="Введите текст" />

{/* Поле поиска */}
<div className="relative">
  <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[--gts-portal-muted]" />
  <input className={GTSStyles.inputs.search} placeholder="Поиск..." />
</div>
```

### 5. Статусные элементы
```tsx
{/* Автоматическое определение цвета и текста */}
<Badge className={`${getStatusColor(status)} text-white`}>
  {getStatusText(status)}
</Badge>
```

### 6. Типографика
```tsx
<h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
  Заголовок с Nokia.Kokia
</h1>

<p className={GTSComponents.cardBody}>
  Основной текст с Gilroy
</p>

<span className={GTSComponents.metaText}>
  Второстепенный текст
</span>

<span className={GTSComponents.timestampText}>
  Мелкий текст
</span>
```

## 🎛️ Предустановленные компоненты

### GTSComponents
```tsx
GTSComponents.pageHeader       // Заголовок страницы
GTSComponents.pageTitle        // Заголовок страницы
GTSComponents.pageSubtitle     // Подзаголовок страницы
GTSComponents.contentCard      // Карточка контента
GTSComponents.cardTitle        // Заголовок карточки
GTSComponents.cardBody         // Содержимое карточки
GTSComponents.primaryButton    // Основная кнопка
GTSComponents.secondaryButton  // Второстепенная кнопка
GTSComponents.metaText         // Мета-информация
GTSComponents.timestampText    // Временные метки
```

### GTSStyles
```tsx
GTSStyles.backgrounds.main     // Основной фон
GTSStyles.backgrounds.surface  // Поверхности
GTSStyles.backgrounds.card     // Карточки
GTSStyles.text.primary         // Основной текст
GTSStyles.text.muted           // Второстепенный текст
GTSStyles.buttons.primary      // Стили основной кнопки
GTSStyles.buttons.secondary    // Стили второстепенной кнопки
GTSStyles.layout.flexBetween   // Flex space-between
GTSStyles.layout.grid2         // Сетка 2 колонки
GTSStyles.layout.grid3         // Сетка 3 колонки
GTSStyles.layout.grid4         // Сетка 4 колонки
```

## 🚀 CSS Utility Classes

Можно использовать готовые CSS классы:

```css
.gts-bg-main            /* background: var(--gts-portal-bg) */
.gts-bg-surface         /* background: var(--gts-portal-surface) */
.gts-bg-card            /* background: var(--gts-portal-card) */
.gts-text-primary       /* color: var(--gts-portal-text) */
.gts-text-muted         /* color: var(--gts-portal-text-muted) */
.gts-border-default     /* border-color: var(--gts-portal-border) */
.gts-font-heading       /* font-family: var(--gts-font-heading) */
.gts-font-body          /* font-family: var(--gts-font-body) */
```

## 📐 Сетка и отступы

### Брекпоинты
```css
--gts-breakpoint-mobile: 390px
--gts-breakpoint-tablet: 768px
--gts-breakpoint-desktop: 1440px
--gts-breakpoint-wide: 1920px
```

### Отступы
```css
--gts-spacing-card-padding: 24px
--gts-spacing-form-padding: 12px
--gts-spacing-button-x: 12px
--gts-spacing-button-y: 8px
```

### Радиусы
```css
--gts-radius-card: 16px      /* Карточки */
--gts-radius-input: 12px     /* Поля ввода */
--gts-radius-button: 8px     /* Кнопки */
--gts-radius-badge: 4px      /* Бейджи */
```

## ⚡ Анимации

```css
--gts-duration-fast: 150ms
--gts-duration-normal: 300ms
--gts-transition-colors: color 150ms ease-in-out, background-color 150ms ease-in-out
```

## 🔧 Миграция legacy компонентов

### Было:
```tsx
<div className="min-h-screen bg-[--gts-portal-bg]">
  <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
    <h1 className="text-xl text-[--gts-portal-text]" style={{ fontFamily: 'var(--font-heading)' }}>
      Заголовок
    </h1>
    <Button className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white">
      Кнопка
    </Button>
  </div>
</div>
```

### Стало:
```tsx
<div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
  <div className={GTSComponents.pageHeader}>
    <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
      Заголовок
    </h1>
    <Button className={GTSStyles.buttons.primary}>
      Кнопка
    </Button>
  </div>
</div>
```

## 📋 Чек-лист для разработчиков

- [ ] Импортировать `GTSStyles` и `GTSComponents` в начале компонента
- [ ] Использовать `GTSComponents` для основных элементов страницы
- [ ] Использовать `GTSStyles` для кастомных стилей
- [ ] Использовать `getStatusColor()` и `getStatusText()` для статусов
- [ ] Избегать хардкодированных цветов и размеров
- [ ] Использовать `var(--font-heading)` для заголовков
- [ ] Проверить компонент в UI Kit (00_UI_Kit) перед релизом

## 🔍 Дебаг

Для проверки использования дизайн-системы откройте страницу **00_UI_Kit**, где можно:
- Посмотреть все доступные цвета и токены
- Скопировать CSS переменные и классы
- Проверить корректность отображения компонентов
- Изучить примеры использования

---

**Важно:** Все новые компоненты ДОЛЖНЫ использовать только токены из дизайн-системы. Хардкодированные цвета и стили запрещены!