# Animation Viewport Fixes Applied

## Изменения для более раннего срабатывания анимаций

### Глобальные изменения в GTSAdvancedAnimations.tsx

Все компоненты продвинутых анимаций обновлены:

**Было:** `amount: 0.2-0.3` (20-30% видимости)
**Стало:** `amount: 0.05-0.1` (5-10% видимости)

- GTSScaleUpView: 0.3 → 0.1
- GTSWaveReveal: 0.2 → 0.05
- GTSParallaxSlide: 0.3 → 0.1
- GTSRotateReveal: 0.3 → 0.1
- GTSSpringPop: 0.3 → 0.1
- GTSBlurReveal: 0.3 → 0.1
- GTSLayerStack: 0.2 → 0.05
- GTSGradientReveal: 0.2 → 0.05
- GTSZoomBounce: 0.3 → 0.1
- GTSFlipReveal: 0.3 → 0.1
- GTSMultiSlide: 0.2 → 0.05

### Изменения в GTSLiveFeedSection.tsx

**Было:**
```tsx
transition={{ delay: index * 0.1, duration: 0.4 }}
viewport={{ once: true }}
```

**Стало:**
```tsx
transition={{ delay: index * 0.05, duration: 0.4 }}
viewport={{ once: true, amount: 0.1 }}
```

### Изменения в GTSExperiencesSection.tsx

**Experiences grid:**
```tsx
// Было: delay: index * 0.1
// Стало: delay: index * 0.05, amount: 0.1
```

**Scenarios:**
```tsx
// Было: delay: index * 0.15
// Стало: delay: index * 0.08, amount: 0.1
```

### Изменения в GTSAboutPage.tsx

**Values section:**
```tsx
// Было: delay: index * 0.1
// Стало: delay: index * 0.05, amount: 0.1
```

## Для ручного исправления остальных файлов:

### Паттерн поиска:
```
viewport={{ once: true }}
```

### Заменить на:
```
viewport={{ once: true, amount: 0.1 }}
```

### Также уменьшить задержки:
```
delay: index * 0.1  →  delay: index * 0.05
delay: index * 0.15 →  delay: index * 0.08
```

## Файлы требующие ручного исправления:

- [ ] /components/pages/GTSAboutPage.tsx (achievements, team members, timeline)
- [ ] /components/pages/GTSExperiencesPage.tsx
- [ ] /components/pages/GTSStoriesPage.tsx
- [ ] /components/pages/GTSAuthExperiencesPage.tsx
- [ ] /components/pages/GTSAuthStoriesPage.tsx

## Результат:

Анимации теперь срабатывают когда элемент едва появляется в области видимости (5-10% вместо 20-30%), что создает более плавный и отзывчивый опыт.
