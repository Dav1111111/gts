# 🎬 GTS Animations System

Комплексная система анимаций для Grand Tour Sochi с плавным скроллом и богатыми визуальными эффектами.

## ✨ Что добавлено

### 1. Плавный скролл

- **Глобальный smooth scroll** во всём приложении
- **Scroll padding** для фиксированного хедера (80px)
- **Кастомные скроллбары** в тёмной теме
- **Scroll progress bar** - индикатор прогресса прокрутки
- **Scroll to top button** - плавная кнопка прокрутки наверх
- **Поддержка prefers-reduced-motion** для доступности

### 2. CSS Анимации

Добавлено **50+ готовых CSS классов** в `design-tokens.css`:

#### Базовые анимации
- `gts-animate-fade-in` / `gts-animate-fade-out`
- `gts-animate-slide-up` / `slide-down` / `slide-left` / `slide-right`
- `gts-animate-scale-in` / `scale-out`
- `gts-animate-bounce-in`

#### Бесконечные анимации
- `gts-animate-pulse` - пульсация
- `gts-animate-spin` - вращение
- `gts-animate-glow` - свечение
- `gts-animate-float` - плавание
- `gts-animate-shimmer` - мерцание (для loading)

#### Hover эффекты
- `gts-hover-lift` - поднимается при наведении
- `gts-hover-scale` - увеличивается
- `gts-hover-glow` - светится
- `gts-hover-brightness` - становится ярче

#### Stagger эффект
- `gts-stagger-item` - автоматическая задержка для элементов списка (до 10 элементов)

### 3. Motion (Framer Motion) Анимации

Создан `/utils/gts-animations.ts` с полным набором:

- **Variants** для всех типов анимаций
- **Durations** (instant → slowest)
- **Easing functions** (7 типов)
- **Preset configurations** для типовых случаев

### 4. Готовые компоненты

**Базовые компоненты** (`/components/ui-kit/GTSAnimated.tsx`):
- `<GTSAnimated>` - универсальный компонент
- `<GTSStaggerList>` + `<GTSStaggerItem>` - списки с задержкой
- `<GTSAnimatedCard>` - интерактивные карточки
- `<GTSAnimatedButton>` - кнопки с эффектами
- `<GTSAnimatedPage>` - для страниц
- `<GTSAnimatedModal>` - модальные окна
- `<GTSAnimatedNotification>` - уведомления
- `<GTSFadeInView>` - анимация при скролле

**🌟 Продвинутые компоненты** (`/components/ui-kit/GTSAdvancedAnimations.tsx`):
- `<GTSScaleUpView>` - объекты увеличиваются с маленького размера
- `<GTSWaveReveal>` - элементы всплывают волной снизу вверх
- `<GTSParallaxSlide>` - элемент выезжает с параллакс эффектом
- `<GTSRotateReveal>` - появление с вращением
- `<GTSSpringPop>` - "выпрыгивание" с пружинным эффектом
- `<GTSBlurReveal>` - появление с эффектом размытия
- `<GTSLayerStack>` - элементы выезжают из-под друг друга (карты из колоды)
- `<GTSGradientReveal>` - появление с градиентной маской
- `<GTSZoomBounce>` - увеличение с отскоком
- `<GTSFlipReveal>` - переворот при появлении
- `<GTSMultiSlide>` - дочерние элементы выезжают с разных сторон

### 5. Utility компоненты

- `<GTSScrollProgress>` - индикатор прогресса прокрутки страницы
- `<GTSScrollToTop>` - кнопка плавной прокрутки наверх

## 🚀 Быстрый старт

### CSS анимации

```tsx
// Простая fade-in анимация
<div className="gts-animate-fade-in">
  Контент
</div>

// Slide up анимация
<div className="gts-animate-slide-up">
  Контент
</div>

// Hover эффект
<div className="gts-hover-lift">
  Поднимается при наведении
</div>

// Stagger список
<div>
  {items.map(item => (
    <div className="gts-stagger-item" key={item.id}>
      {item.name}
    </div>
  ))}
</div>
```

### Motion анимации

```tsx
import { motion } from 'motion/react';
import { gtsAnimations } from '../utils/gts-animations';

// Базовая анимация
<motion.div
  variants={gtsAnimations.variants.slideUp}
  initial="hidden"
  animate="visible"
>
  Контент
</motion.div>

// Hover и Tap
<motion.button
  whileHover={gtsAnimations.hover.lift}
  whileTap={gtsAnimations.tap.scale}
>
  Кнопка
</motion.button>

// Stagger список
<motion.div variants={gtsAnimations.stagger.container} initial="hidden" animate="visible">
  {items.map(item => (
    <motion.div key={item.id} variants={gtsAnimations.stagger.item}>
      {item.name}
    </motion.div>
  ))}
</motion.div>
```

### Готовые компоненты (базовые)

```tsx
import { 
  GTSAnimated, 
  GTSStaggerList, 
  GTSStaggerItem,
  GTSAnimatedCard,
  GTSFadeInView 
} from './components/ui-kit';

// Универсальная анимация
<GTSAnimated variant="slideUp" delay={0.2}>
  <div>Контент</div>
</GTSAnimated>

// Stagger список
<GTSStaggerList staggerDelay={0.1}>
  {items.map(item => (
    <GTSStaggerItem key={item.id}>
      <div>{item.name}</div>
    </GTSStaggerItem>
  ))}
</GTSStaggerList>

// Интерактивная карточка
<GTSAnimatedCard interactive className="p-6 bg-[var(--gts-portal-card)]">
  <h3>Заголовок</h3>
  <p>Текст</p>
</GTSAnimatedCard>

// Анимация при скролле
<GTSFadeInView delay={0.1}>
  <section>Появится при скролле</section>
</GTSFadeInView>
```

### 🌟 Продвинутые анимации (NEW!)

```tsx
import { 
  GTSScaleUpView,
  GTSWaveReveal,
  GTSParallaxSlide,
  GTSSpringPop,
  GTSBlurReveal,
  GTSLayerStack,
  GTSZoomBounce,
  GTSFlipReveal
} from './components/ui-kit';

// Увеличение с маленького размера
<GTSScaleUpView scale={0.8} duration={0.6}>
  <div>Плавно увеличивается</div>
</GTSScaleUpView>

// Волновое всплытие
<GTSWaveReveal distance={80}>
  <div>Всплывает волной</div>
</GTSWaveReveal>

// Параллакс выезжание
<GTSParallaxSlide direction="left" distance={100}>
  <div>Выезжает слева с параллаксом</div>
</GTSParallaxSlide>

// Пружинный эффект
<GTSSpringPop>
  <div>Выпрыгивает с пружиной</div>
</GTSSpringPop>

// Размытие
<GTSBlurReveal>
  <div>Появляется из размытия</div>
</GTSBlurReveal>

// Карты из-под друг друга
<GTSLayerStack staggerDelay={0.15}>
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</GTSLayerStack>

// Отскок
<GTSZoomBounce>
  <div>Отскакивает при появлении</div>
</GTSZoomBounce>

// Переворот
<GTSFlipReveal axis="y">
  <div>Переворачивается</div>
</GTSFlipReveal>
```

### Scroll Utilities

```tsx
import { GTSScrollProgress, GTSScrollToTop } from './components/shared';

// Индикатор прогресса прокрутки
<GTSScrollProgress position="top" height={3} color="var(--gts-portal-accent)" />

// Кнопка прокрутки наверх
<GTSScrollToTop showAfter={400} />
```

## 📁 Структура файлов

```
/styles/
  ├── globals.css          # Smooth scroll + custom scrollbars
  └── design-tokens.css    # CSS анимации + keyframes

/utils/
  └── gts-animations.ts    # Motion variants + presets

/components/ui-kit/
  ├── GTSAnimated.tsx              # Базовые анимированные компоненты
  ├── GTSAdvancedAnimations.tsx    # 🌟 Продвинутые анимации
  └── index.ts                     # Экспорт компонентов

/components/shared/
  ├── GTSScrollProgress.tsx        # Индикатор прогресса
  └── GTSScrollToTop.tsx           # Кнопка наверх

/components/demo/
  └── GTSAnimationsDemo.tsx # Демо всех анимаций

/docs/
  └── animations-guide.md  # Полное руководство
```

## 🎯 Обновлённые компоненты

1. **App.tsx** - добавлены `<GTSScrollProgress>` и `<GTSScrollToTop>`
2. **GTSLandingPage** - все секции используют продвинутые анимации:
   - Hero: `<GTSScaleUpView>` - увеличение
   - About: `<GTSWaveReveal>` - волна
   - Top Offers: `<GTSParallaxSlide direction="left">` - параллакс слева
   - Experiences: `<GTSBlurReveal>` - размытие
   - Live Feed: `<GTSSpringPop>` - пружинный эффект
   - Map: `<GTSParallaxSlide direction="right">` - параллакс справа
   - Testimonials: `<GTSWaveReveal>` - волна
   - Membership: `<GTSScaleUpView>` - увеличение
   - Footer: `<GTSWaveReveal>` - волна
3. **GTSRouter** - добавлен `<AnimatePresence>` для плавной смены страниц
4. **GTSNavigationHeader** - использует Motion анимации

## 🎨 Демонстрация

Запустите демо-страницу для просмотра всех анимаций:

```tsx
import { GTSAnimationsDemo } from './components/demo/GTSAnimationsDemo';

<GTSAnimationsDemo />
```

Демо включает:
- ✅ Все CSS классы с примерами
- ✅ Motion базовые variants
- ✅ 🌟 Продвинутые анимации (11 типов!)
- ✅ Готовые компоненты
- ✅ Интерактивные примеры
- ✅ Переключение между 4 вкладками

## 📖 Полная документация

Смотрите `/docs/animations-guide.md` для:
- Подробных примеров
- Best practices
- Кастомизации
- Accessibility
- Performance tips

## ⚙️ Токены анимаций

### Длительность
```ts
instant: 0.1s
fast: 0.2s
normal: 0.3s
slow: 0.5s
slower: 0.7s
slowest: 1.0s
```

### Easing
```ts
inOut: [0.4, 0, 0.2, 1]
out: [0, 0, 0.2, 1]
smooth: [0.25, 0.46, 0.45, 0.94]
bounce: [0.68, -0.55, 0.265, 1.55]
elastic: [0.175, 0.885, 0.32, 1.275]
```

## ♿ Доступность

Система автоматически учитывает `prefers-reduced-motion`:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## 🎯 Best Practices

1. ✅ Используйте CSS классы для простых анимаций
2. ✅ Motion для сложных интерактивных анимаций
3. ✅ Готовые компоненты для типовых случаев
4. ✅ `<AnimatePresence>` для правильного unmount
5. ⚠️ Не переборщите - слишком много анимаций отвлекают
6. ⚠️ Тестируйте на мобильных устройствах

## 🚀 Производительность

- **will-change** уже добавлен в критичные анимации
- **GPU acceleration** через transform/opacity
- **Минимальное использование layout-triggering свойств**
- **Debounce** для scroll-based анимаций

## 📦 Что экспортируется

```tsx
// Из /components/ui-kit
export {
  GTSAnimated,
  GTSStaggerList,
  GTSStaggerItem,
  GTSAnimatedCard,
  GTSAnimatedButton,
  GTSAnimatedPage,
  GTSAnimatedModal,
  GTSAnimatedNotification,
  GTSFadeInView,
  AnimatePresence
};

// Из /utils/gts-animations
export {
  gtsAnimations,       // Всё в одном объекте
  gtsDurations,
  gtsEasing,
  gtsFadeVariants,
  gtsSlideUpVariants,
  // ... все остальные variants
};
```

## 🎬 Примеры использования

### Анимация секций лендинга
```tsx
<GTSFadeInView delay={0.1}>
  <section id="about">
    <GTSAboutSection />
  </section>
</GTSFadeInView>
```

### Анимация карточек в списке
```tsx
<GTSStaggerList staggerDelay={0.05}>
  {items.map(item => (
    <GTSStaggerItem key={item.id}>
      <GTSAnimatedCard interactive>
        {item.content}
      </GTSAnimatedCard>
    </GTSStaggerItem>
  ))}
</GTSStaggerList>
```

### Переход между страницами
```tsx
<AnimatePresence mode="wait">
  <GTSAnimatedPage key={currentPage}>
    {renderPage()}
  </GTSAnimatedPage>
</AnimatePresence>
```

---

**Версия:** 1.0.0  
**Дата:** 28 октября 2025  
**Статус:** ✅ Готово к использованию

## 🔗 Ссылки

- [Motion Documentation](https://motion.dev/)
- [CSS Animations MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations)
- [Animations Guide](/docs/animations-guide.md)
