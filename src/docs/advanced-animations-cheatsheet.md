# 🌟 GTS Advanced Animations - Шпаргалка

Быстрый справочник по продвинутым анимациям Grand Tour Sochi

## 📦 Импорт

```tsx
import {
  GTSScaleUpView,      // Увеличение
  GTSWaveReveal,       // Волна
  GTSParallaxSlide,    // Параллакс
  GTSRotateReveal,     // Вращение
  GTSSpringPop,        // Пружина
  GTSBlurReveal,       // Размытие
  GTSLayerStack,       // Карты из колоды
  GTSGradientReveal,   // Градиент
  GTSZoomBounce,       // Отскок
  GTSFlipReveal,       // Переворот
  GTSMultiSlide,       // Разные стороны
} from './components/ui-kit';
```

## 🎯 GTSScaleUpView

**Что делает:** Объект плавно увеличивается с маленького размера

```tsx
<GTSScaleUpView 
  scale={0.8}        // начальный размер (0-1)
  duration={0.6}     // длительность в секундах
  delay={0}          // задержка
>
  <div>Контент</div>
</GTSScaleUpView>
```

**Когда использовать:**
- Hero секции
- Важные call-to-action
- Центральные элементы страницы

---

## 🌊 GTSWaveReveal

**Что делает:** Элементы всплывают волной снизу вверх с elastic эффектом

```tsx
<GTSWaveReveal
  distance={80}      // расстояние подъема в px
  delay={0}
>
  <div>Контент</div>
</GTSWaveReveal>
```

**Когда использовать:**
- Секции контента
- Footer
- Карточки информации

---

## 📐 GTSParallaxSlide

**Что делает:** Элемент выезжает с параллакс эффектом и легким масштабированием

```tsx
<GTSParallaxSlide
  direction="left"   // 'left' | 'right' | 'up' | 'down'
  distance={100}     // расстояние в px
  delay={0}
>
  <div>Контент</div>
</GTSParallaxSlide>
```

**Когда использовать:**
- Чередующиеся секции
- Изображения с текстом
- Боковые панели

---

## 🎪 GTSRotateReveal

**Что делает:** Элемент появляется с вращением и bounce эффектом

```tsx
<GTSRotateReveal
  rotation={-15}     // градусы вращения
  delay={0}
>
  <div>Контент</div>
</GTSRotateReveal>
```

**Когда использовать:**
- Игривые элементы
- Карточки товаров
- Иконки и бейджи

---

## 💫 GTSSpringPop

**Что делает:** Элемент "выпрыгивает" с настоящей пружинной физикой

```tsx
<GTSSpringPop delay={0}>
  <div>Контент</div>
</GTSSpringPop>
```

**Настройки пружины:** stiffness: 200, damping: 15

**Когда использовать:**
- Кнопки действий
- Модальные окна
- Уведомления
- Всплывающие подсказки

---

## 🎨 GTSBlurReveal

**Что делает:** Появление с плавным снятием размытия

```tsx
<GTSBlurReveal delay={0}>
  <div>Контент</div>
</GTSBlurReveal>
```

**Когда использовать:**
- Изображения
- Видео фоны
- Галереи
- Премиальный контент

---

## 📦 GTSLayerStack

**Что делает:** Элементы выезжают из-под друг друга как карты из колоды

```tsx
<GTSLayerStack 
  staggerDelay={0.15}
  className="space-y-4"
>
  <div>Элемент 1</div>
  <div>Элемент 2</div>
  <div>Элемент 3</div>
</GTSLayerStack>
```

**Эффект:** rotateX: 10 → 0, легкий 3D эффект

**Когда использовать:**
- Списки функций
- Шаги процесса
- Временные линии
- FAQ секции

---

## 🌈 GTSGradientReveal

**Что делает:** Секция появляется с градиентной маской (wipe эффект)

```tsx
<GTSGradientReveal
  direction="bottom"  // 'top' | 'bottom' | 'left' | 'right'
  delay={0}
>
  <div>Контент</div>
</GTSGradientReveal>
```

**Когда использовать:**
- Переходы между секциями
- Reveal эффекты
- Презентации

---

## 🎯 GTSZoomBounce

**Что делает:** Быстрое увеличение с отскоком (spring animation)

```tsx
<GTSZoomBounce delay={0}>
  <div>Контент</div>
</GTSZoomBounce>
```

**Настройки:** stiffness: 260, damping: 20 (более резкий bounce)

**Когда использовать:**
- Награды и достижения
- Успешные действия
- Важные метрики
- Цены и офферы

---

## 🔄 GTSFlipReveal

**Что делает:** Элемент переворачивается при появлении (3D flip)

```tsx
<GTSFlipReveal
  axis="y"          // 'x' | 'y'
  delay={0}
>
  <div>Контент</div>
</GTSFlipReveal>
```

**Когда использовать:**
- Карточки с двумя сторонами
- Интерактивные элементы
- Игровые механики

---

## 🎪 GTSMultiSlide

**Что делает:** Дочерние элементы выезжают с чередующихся сторон

```tsx
<GTSMultiSlide
  pattern="alternate"  // 'alternate' | 'wave' | 'random'
  staggerDelay={0.1}
>
  <div>Слева</div>
  <div>Справа</div>
  <div>Слева</div>
  <div>Справа</div>
</GTSMultiSlide>
```

**Паттерны:**
- `alternate` - чередование лево/право
- `wave` - волновой паттерн
- `random` - случайный порядок

**Когда использовать:**
- Длинные списки
- Сравнение элементов
- Зигзаг-макеты

---

## 🎨 Комбинации

### Hero Section
```tsx
<GTSScaleUpView scale={0.9} duration={0.8}>
  <HeroContent />
</GTSScaleUpView>
```

### Features List
```tsx
<GTSLayerStack staggerDelay={0.15}>
  {features.map(feature => (
    <FeatureCard key={feature.id} {...feature} />
  ))}
</GTSLayerStack>
```

### Alternating Sections
```tsx
<GTSParallaxSlide direction="left">
  <Section1 />
</GTSParallaxSlide>

<GTSParallaxSlide direction="right">
  <Section2 />
</GTSParallaxSlide>
```

### Gallery Grid
```tsx
{images.map((img, i) => (
  <GTSBlurReveal key={i} delay={i * 0.1}>
    <Image src={img} />
  </GTSBlurReveal>
))}
```

---

## ⚙️ Параметры по умолчанию

| Компонент | Duration | Easing | Особенности |
|-----------|----------|--------|-------------|
| ScaleUpView | 0.6s | smooth | scale: 0.8 |
| WaveReveal | 0.8s | elastic | distance: 60px |
| ParallaxSlide | 0.7s | smooth | distance: 80px |
| RotateReveal | 0.7s | bounce | rotation: -15° |
| SpringPop | dynamic | spring | stiffness: 200 |
| BlurReveal | 0.8s | smooth | blur: 10px |
| LayerStack | 0.6s | smooth | rotateX: 10° |
| GradientReveal | 1.0s | smooth | clip-path |
| ZoomBounce | dynamic | spring | stiffness: 260 |
| FlipReveal | 0.8s | smooth | rotate: 90° |
| MultiSlide | 0.7s | smooth | alternating |

---

## 🎯 Best Practices

### ✅ DO
- Используйте ScaleUpView для hero секций
- WaveReveal для секций контента
- ParallaxSlide для чередующихся секций
- SpringPop для модальных окон
- LayerStack для вертикальных списков

### ❌ DON'T
- Не используйте более 1 типа анимации на одной секции
- Не делайте delay > 0.3s без причины
- Не комбинируйте слишком много разных эффектов
- Не забывайте про mobile performance

---

## 📱 Mobile Considerations

Все анимации адаптивны, но:
- На mobile автоматически уменьшаются `distance` значения
- `useInView` с `amount: 0.2-0.3` для срабатывания раньше
- `once: true` чтобы анимация не повторялась

---

## ♿ Accessibility

Все компоненты уважают `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  animation-duration: 0.01ms !important;
  transition-duration: 0.01ms !important;
}
```

---

## 🚀 Performance Tips

1. **will-change** уже добавлен где нужно
2. Используйте `transform` и `opacity` для GPU acceleration
3. Избегайте анимации `width`, `height`, `padding`
4. Для списков > 10 элементов уменьшите staggerDelay
5. На слабых устройствах используйте более простые анимации

---

## 🎬 Demo

Смотрите все анимации в действии:
```tsx
import { GTSAnimationsDemo } from './components/demo/GTSAnimationsDemo';

<GTSAnimationsDemo />
```

Выберите вкладку "🌟 Продвинутые" для интерактивных примеров!

---

**Версия:** 1.0.0  
**Обновлено:** 28 октября 2025
