# 🎬 GTS Animations Guide

Полное руководство по использованию системы анимаций в Grand Tour Sochi

## 📚 Содержание

1. [Плавный скролл](#плавный-скролл)
2. [CSS анимации](#css-анимации)
3. [Motion анимации](#motion-анимации)
4. [Готовые компоненты](#готовые-компоненты)
5. [Примеры использования](#примеры-использования)

---

## 🌊 Плавный скролл

### Глобальный smooth scroll

Плавный скролл включен глобально через `globals.css`:

```css
html {
  scroll-behavior: smooth;
  scroll-padding-top: 80px; /* для фиксированного хедера */
}
```

### Программный скролл

```tsx
// Плавный переход к элементу
const scrollToElement = (elementId: string) => {
  document.getElementById(elementId)?.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

// Плавный переход к верху страницы
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
```

---

## 🎨 CSS Анимации

### Готовые классы

Все анимации доступны через CSS классы из `design-tokens.css`:

#### Fade анимации
```tsx
<div className="gts-animate-fade-in">Появляется</div>
<div className="gts-animate-fade-out">Исчезает</div>
```

#### Slide анимации
```tsx
<div className="gts-animate-slide-up">Снизу вверх</div>
<div className="gts-animate-slide-down">Сверху вниз</div>
<div className="gts-animate-slide-left">Справа налево</div>
<div className="gts-animate-slide-right">Слева направо</div>
```

#### Scale анимации
```tsx
<div className="gts-animate-scale-in">Масштабирование</div>
<div className="gts-animate-bounce-in">Bounce эффект</div>
```

#### Бесконечные анимации
```tsx
<div className="gts-animate-pulse">Пульсация</div>
<div className="gts-animate-spin">Вращение</div>
<div className="gts-animate-glow">Свечение</div>
<div className="gts-animate-float">Плавание</div>
```

#### Hover эффекты
```tsx
<div className="gts-hover-lift">Поднимается при наведении</div>
<div className="gts-hover-scale">Увеличивается</div>
<div className="gts-hover-glow">Светится</div>
<div className="gts-hover-brightness">Становится ярче</div>
```

### Stagger эффект для списков

```tsx
<div>
  {items.map((item, index) => (
    <div key={index} className="gts-stagger-item">
      {item.name}
    </div>
  ))}
</div>
```

### Loading skeleton

```tsx
<div className="gts-loading-skeleton h-20 w-full" />
```

---

## 🎬 Motion Анимации

### Импорт

```tsx
import { motion } from 'motion/react';
import { gtsAnimations } from '../utils/gts-animations';
```

### Базовое использование

#### Fade анимация
```tsx
<motion.div
  variants={gtsAnimations.variants.fade}
  initial="hidden"
  animate="visible"
  exit="exit"
>
  Контент
</motion.div>
```

#### Slide анимации
```tsx
// Снизу вверх
<motion.div variants={gtsAnimations.variants.slideUp} initial="hidden" animate="visible">
  Контент
</motion.div>

// Сверху вниз
<motion.div variants={gtsAnimations.variants.slideDown} initial="hidden" animate="visible">
  Контент
</motion.div>
```

#### Scale анимация
```tsx
<motion.div
  variants={gtsAnimations.variants.scale}
  initial="hidden"
  animate="visible"
>
  Контент
</motion.div>
```

### Stagger анимации

```tsx
<motion.div
  variants={gtsAnimations.stagger.container}
  initial="hidden"
  animate="visible"
>
  {items.map((item) => (
    <motion.div
      key={item.id}
      variants={gtsAnimations.stagger.item}
    >
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Hover и Tap

```tsx
<motion.button
  whileHover={gtsAnimations.hover.lift}
  whileTap={gtsAnimations.tap.scale}
>
  Кнопка
</motion.button>
```

### Анимация при скролле

```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: gtsAnimations.durations.normal,
    ease: gtsAnimations.easing.out,
  }}
>
  Появится при скролле
</motion.div>
```

---

## 📦 Готовые компоненты

### GTSAnimated

Универсальный компонент для простых анимаций:

```tsx
import { GTSAnimated } from '../components/ui-kit';

<GTSAnimated variant="slideUp" delay={0.2}>
  <div>Контент</div>
</GTSAnimated>
```

**Варианты:** `fade`, `slideUp`, `slideDown`, `slideLeft`, `slideRight`, `scale`, `bounce`

### GTSStaggerList

Для анимации списков с задержкой:

```tsx
import { GTSStaggerList, GTSStaggerItem } from '../components/ui-kit';

<GTSStaggerList staggerDelay={0.05}>
  {items.map((item) => (
    <GTSStaggerItem key={item.id}>
      <div>{item.name}</div>
    </GTSStaggerItem>
  ))}
</GTSStaggerList>
```

### GTSAnimatedCard

Интерактивная карточка с анимациями:

```tsx
import { GTSAnimatedCard } from '../components/ui-kit';

<GTSAnimatedCard 
  interactive={true}
  className="p-6 bg-[var(--gts-portal-card)] rounded-lg"
>
  <h3>Заголовок</h3>
  <p>Текст карточки</p>
</GTSAnimatedCard>
```

### GTSAnimatedButton

Кнопка с анимациями:

```tsx
import { GTSAnimatedButton } from '../components/ui-kit';

<GTSAnimatedButton 
  variant="glow"
  className="px-4 py-2 bg-[var(--gts-portal-accent)] rounded"
>
  Нажми меня
</GTSAnimatedButton>
```

**Варианты:** `default`, `scale`, `glow`

### GTSAnimatedPage

Для анимации страниц:

```tsx
import { GTSAnimatedPage } from '../components/ui-kit';

<GTSAnimatedPage>
  <h1>Моя страница</h1>
  <p>Контент...</p>
</GTSAnimatedPage>
```

### GTSAnimatedModal

Модальное окно с анимациями:

```tsx
import { GTSAnimatedModal } from '../components/ui-kit';

<GTSAnimatedModal 
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  className="p-6 bg-[var(--gts-portal-surface)] rounded-lg"
>
  <h2>Модальное окно</h2>
  <p>Контент...</p>
</GTSAnimatedModal>
```

### GTSFadeInView

Анимация при появлении в зоне видимости:

```tsx
import { GTSFadeInView } from '../components/ui-kit';

<GTSFadeInView delay={0.1}>
  <div>Появится при скролле</div>
</GTSFadeInView>
```

### AnimatePresence

Для анимации монтирования/размонтирования:

```tsx
import { AnimatePresence } from '../components/ui-kit';

<AnimatePresence mode="wait">
  {isVisible && (
    <GTSAnimated variant="fade">
      <div>Контент</div>
    </GTSAnimated>
  )}
</AnimatePresence>
```

---

## 💡 Примеры использования

### Пример 1: Анимированный список новостей

```tsx
import { GTSStaggerList, GTSStaggerItem, GTSAnimatedCard } from '../components/ui-kit';

const NewsList = ({ news }) => {
  return (
    <GTSStaggerList staggerDelay={0.1}>
      {news.map((item) => (
        <GTSStaggerItem key={item.id}>
          <GTSAnimatedCard className="p-6 mb-4 bg-[var(--gts-portal-card)]">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </GTSAnimatedCard>
        </GTSStaggerItem>
      ))}
    </GTSStaggerList>
  );
};
```

### Пример 2: Анимированная кнопка действия

```tsx
import { GTSAnimatedButton } from '../components/ui-kit';
import { motion } from 'motion/react';
import { gtsAnimations } from '../utils/gts-animations';

const ActionButton = ({ onClick, children }) => {
  return (
    <GTSAnimatedButton
      variant="glow"
      onClick={onClick}
      className="px-6 py-3 bg-[var(--gts-portal-accent)] text-white rounded-lg"
    >
      {children}
    </GTSAnimatedButton>
  );
};
```

### Пример 3: Модальное окно с анимацией

```tsx
import { useState } from 'react';
import { GTSAnimatedModal, AnimatePresence } from '../components/ui-kit';

const MyModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Открыть</button>
      
      <AnimatePresence>
        <GTSAnimatedModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          className="p-8 bg-[var(--gts-portal-surface)] rounded-xl max-w-md"
        >
          <h2 className="text-2xl mb-4">Заголовок</h2>
          <p className="mb-4">Текст модального окна</p>
          <button onClick={() => setIsOpen(false)}>Закрыть</button>
        </GTSAnimatedModal>
      </AnimatePresence>
    </>
  );
};
```

### Пример 4: Плавное появление секций при скролле

```tsx
import { GTSFadeInView } from '../components/ui-kit';

const LandingPage = () => {
  return (
    <div>
      <GTSFadeInView delay={0}>
        <section>Секция 1</section>
      </GTSFadeInView>

      <GTSFadeInView delay={0.1}>
        <section>Секция 2</section>
      </GTSFadeInView>

      <GTSFadeInView delay={0.2}>
        <section>Секция 3</section>
      </GTSFadeInView>
    </div>
  );
};
```

### Пример 5: Кастомная анимация с гибкими настройками

```tsx
import { motion } from 'motion/react';
import { gtsAnimations } from '../utils/gts-animations';

const CustomAnimation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      exit={{ opacity: 0, scale: 0.8, rotate: 10 }}
      transition={{
        duration: gtsAnimations.durations.slow,
        ease: gtsAnimations.easing.bounce,
      }}
      whileHover={{
        scale: 1.05,
        rotate: 5,
        transition: { duration: gtsAnimations.durations.fast },
      }}
    >
      Кастомная анимация
    </motion.div>
  );
};
```

---

## ⚙️ Настройка анимаций

### Токены длительности

Из `gtsAnimations.durations`:
- `instant`: 0.1s
- `fast`: 0.2s
- `normal`: 0.3s
- `slow`: 0.5s
- `slower`: 0.7s
- `slowest`: 1.0s

### Функции easing

Из `gtsAnimations.easing`:
- `inOut`: [0.4, 0, 0.2, 1]
- `out`: [0, 0, 0.2, 1]
- `in`: [0.4, 0, 1, 1]
- `sharp`: [0.4, 0, 0.6, 1]
- `smooth`: [0.25, 0.46, 0.45, 0.94]
- `bounce`: [0.68, -0.55, 0.265, 1.55]
- `elastic`: [0.175, 0.885, 0.32, 1.275]

---

## ♿ Доступность

### Respect для prefers-reduced-motion

Система автоматически отключает анимации для пользователей с `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

---

## 🎯 Best Practices

1. **Используйте готовые компоненты** для стандартных случаев
2. **CSS классы** для простых анимаций
3. **Motion** для сложных интерактивных анимаций
4. **Не переборщите** - слишком много анимаций отвлекают
5. **Тестируйте производительность** на мобильных устройствах
6. **Используйте AnimatePresence** для правильного unmount
7. **Добавляйте `will-change`** для сложных анимаций:
   ```tsx
   <motion.div style={{ willChange: 'transform' }}>
   ```

---

## 🔧 Кастомизация

### Создание своей анимации

```tsx
import { Variants } from 'motion/react';
import { gtsAnimations } from '../utils/gts-animations';

const myCustomVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -100,
    rotate: -90,
  },
  visible: {
    opacity: 1,
    x: 0,
    rotate: 0,
    transition: {
      duration: gtsAnimations.durations.slow,
      ease: gtsAnimations.easing.elastic,
    },
  },
};
```

### Расширение существующих токенов

Добавьте в `/styles/design-tokens.css`:

```css
:root {
  /* Добавьте свои токены */
  --my-custom-duration: 800ms;
  --my-custom-easing: cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

---

## 📚 Дополнительные ресурсы

- [Motion Documentation](https://motion.dev/)
- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Easing Functions Cheatsheet](https://easings.net/)

---

**Версия:** 1.0.0  
**Дата обновления:** 28 октября 2025  
**Автор:** GTS Development Team
