# ⚡ GTS Animations - Quick Guide

Шпаргалка по быстрому использованию анимаций

## 🎯 Выбор анимации за 10 секунд

```
Hero секция?           → GTSScaleUpView
Секция контента?       → GTSWaveReveal  
Боковой блок слева?    → GTSParallaxSlide direction="left"
Боковой блок справа?   → GTSParallaxSlide direction="right"
Модальное окно?        → GTSSpringPop
Изображения?           → GTSBlurReveal
Список пунктов?        → GTSLayerStack
Важная кнопка?         → GTSZoomBounce
Просто появление?      → GTSFadeInView
```

## 📦 Импорт

```tsx
import { GTSScaleUpView, GTSWaveReveal, GTSParallaxSlide } from './components/ui-kit';
```

## 🚀 Примеры копипаст

### Hero секция
```tsx
<GTSScaleUpView scale={0.9} duration={0.8}>
  <HeroSection />
</GTSScaleUpView>
```

### Обычная секция
```tsx
<GTSWaveReveal>
  <AboutSection />
</GTSWaveReveal>
```

### Чередующиеся секции
```tsx
<GTSParallaxSlide direction="left">
  <Section1 />
</GTSParallaxSlide>

<GTSParallaxSlide direction="right">
  <Section2 />
</GTSParallaxSlide>
```

### Список карточек
```tsx
<GTSLayerStack>
  <Card1 />
  <Card2 />
  <Card3 />
</GTSLayerStack>
```

### Модальное окно
```tsx
<GTSSpringPop>
  <Modal />
</GTSSpringPop>
```

## ⚙️ Параметры

```tsx
// Задержка
<GTSWaveReveal delay={0.2}>

// Расстояние подъема
<GTSWaveReveal distance={100}>

// Начальный размер
<GTSScaleUpView scale={0.7}>

// Длительность
<GTSScaleUpView duration={1.0}>

// Направление
<GTSParallaxSlide direction="left">
<GTSParallaxSlide direction="right">
<GTSParallaxSlide direction="up">
<GTSParallaxSlide direction="down">
```

## 🎨 Полный лендинг

```tsx
<GTSScaleUpView scale={0.9}>
  <Hero />
</GTSScaleUpView>

<GTSWaveReveal>
  <About />
</GTSWaveReveal>

<GTSParallaxSlide direction="left">
  <Features />
</GTSParallaxSlide>

<GTSBlurReveal>
  <Gallery />
</GTSBlurReveal>

<GTSLayerStack>
  <Step1 />
  <Step2 />
  <Step3 />
</GTSLayerStack>

<GTSWaveReveal>
  <Footer />
</GTSWaveReveal>
```

## 📚 Полная документация

- `/ANIMATIONS_README.md` - полное описание
- `/docs/advanced-animations-cheatsheet.md` - детальная шпаргалка
- `/docs/animations-guide.md` - руководство
