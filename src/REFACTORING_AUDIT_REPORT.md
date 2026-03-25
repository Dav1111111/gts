# 🏗️ GTS Platform - Аудит FSD Рефакторинга

## 📊 Статус миграции: 30% завершено

### ✅ Что успешно мигрировано

#### 1. **Архитектурный Фундамент** 
- ✅ Создана полная FSD структура `/src/{app,pages,widgets,features,entities,shared}`
- ✅ Новый `/src/app/App.tsx` с правильной архитектурой (без DOM манипуляций)
- ✅ Правильный `ErrorBoundary` на уровне app
- ✅ `ThemeProvider` вместо ручных DOM манипуляций
- ✅ Разделение на `router.tsx` и `providers.tsx`

#### 2. **Навигационная система**
- ✅ Фича `/src/features/navigation` с proper public API
- ✅ Хук `useNavigation` мигрирован в features
- ✅ TypeScript типы в `navigation/types.ts`
- ✅ Централизованная логика роутинга в `app/router.tsx`

#### 3. **Shared слой**
- ✅ `/src/shared/lib` с утилитами (theme, constants, utils)
- ✅ `/src/shared/ui` с базовыми компонентами (ErrorBoundary, ThemeProvider)
- ✅ Правильный ErrorBoundary как class component
- ✅ Централизованные стили в `/src/shared/styles`

#### 4. **Entities слой**
- ✅ Начата миграция `user` entity
- ✅ Хуки `useUser.ts`, `useUsers.ts` с mock данными
- ✅ Правильная структура с model/ui/hooks

#### 5. **Entry Point**
- ✅ `main.tsx` обновлен для использования `/src/app/App.tsx`
- ✅ Глобальная обработка ошибок
- ✅ Fallback рендеринг при критических ошибках

---

## ❌ Критические проблемы

### 1. **Legacy App.tsx** - Множественные нарушения архитектуры
```typescript
// ❌ /App.tsx - 148 строк архитектурных нарушений
- Direct DOM manipulation (lines 25-33, 58-67)
- Multiple responsibilities (SRP violation) 
- Client-side only routing
- No proper Error Boundary
- Theme manipulation through DOM
- Business logic in App component
- Too many props (component responsibility)
```

### 2. **Двойная точка входа**
- ❌ Работает старый `/App.tsx` (проблемный)
- ✅ Есть новый `/src/app/App.tsx` (правильный)
- ⚠️ Неопределенность какой используется

### 3. **Pages слой не мигрирован**
```typescript
// ❌ /src/pages/GTSPageRouter.tsx - только proxy
import { GTSPageRouter as LegacyGTSPageRouter } from '../../components/pages/GTSPageRouter'
```

---

## 🎯 План дальнейшей миграции

### **ЭТАП 1: Завершение базовой структуры (1-2 дня)**

#### A. Переключение на новый App.tsx
```bash
# 1. Переименовать старый App.tsx
mv /App.tsx /App.tsx.legacy.backup

# 2. Создать symlink или переместить новый App.tsx
cp /src/app/App.tsx /App.tsx

# 3. Обновить импорты в main.tsx
# import App from './App'
```

#### B. Миграция Pages слоя
```
/src/pages/
├── home/                 # Landing page
│   ├── ui/
│   │   ├── HomePage.tsx
│   │   └── index.ts
│   └── index.ts
├── admin/               # Executive access
│   ├── ui/
│   │   ├── AdminPage.tsx
│   │   └── index.ts
│   └── index.ts
├── portal/              # Partner/Client portals
└── auth/                # Login/Role picker
```

#### C. Исправление импортов
```typescript
// ❌ Текущие legacy импорты
import { GTSPageRouter } from '../../components/pages/GTSPageRouter'

// ✅ Правильные FSD импорты  
import { HomePage } from '@/pages/home'
import { AdminPage } from '@/pages/admin'
```

### **ЭТАП 2: Миграция крупных компонентов (3-5 дней)**

#### A. Widgets слой
```
/src/widgets/
├── executive-panel/     # GTSExecutivePanel
├── crm-dashboard/       # CRM related widgets  
├── booking-calendar/    # Calendar widgets
├── partner-dashboard/   # Partner portal widgets
└── client-dashboard/    # Client portal widgets
```

#### B. Features слой
```
/src/features/
├── navigation/          # ✅ Уже есть
├── auth/               # Login, role selection
├── booking/            # Booking related features
├── crm/                # CRM features
└── finance/            # Finance features
```

### **ЭТАП 3: Очистка legacy структуры (2-3 дня)**

#### A. Миграция оставшихся компонентов из `/components`
- 150+ компонентов в `/components` нужно распределить по FSD слоям
- Приоритет: самые используемые компоненты первыми

#### B. Обновление всех импортов
- Поиск и замена всех legacy импортов
- Обновление barrel exports (`index.ts` файлов)

---

## 🔧 Immediate Actions Required

### 1. **Переключить на новый App.tsx** (30 минут)
```bash
# Backup old App.tsx
mv App.tsx App.tsx.legacy.backup

# Use new App.tsx as main entry
cp src/app/App.tsx App.tsx

# Verify main.tsx imports correctly
```

### 2. **Включить strict TypeScript** (15 минут)
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,              // ✅ Включить обратно
    "noUnusedLocals": true,      // ✅ Включить обратно
    "noUnusedParameters": true   // ✅ Включить обратно
  }
}
```

### 3. **Создать простой Pages роутер** (1 час)
```typescript  
// /src/pages/index.ts
export { HomePage } from './home'
export { AdminPage } from './admin'  
export { LoginPage } from './auth'

// /src/app/router.tsx - упростить логику
const routes = {
  'home': HomePage,
  'admin': AdminPage, 
  'login': LoginPage
}
```

---

## 📈 Метрики прогресса

| Компонент | Статус | Приоритет |
|-----------|--------|-----------|
| App.tsx | ⚠️ Dual entry point | CRITICAL |
| Navigation | ✅ Migrated | - |
| Pages Router | ❌ Proxy only | HIGH |
| Error Boundary | ✅ Proper implementation | - |
| Theme System | ✅ Provider pattern | - |
| User Entity | ✅ Basic structure | - |
| Legacy Components | ❌ 150+ not migrated | MEDIUM |

## 🎯 Success Metrics

- [ ] Single App.tsx entry point
- [ ] Strict TypeScript enabled
- [ ] All pages in FSD structure
- [ ] Zero legacy imports in new code
- [ ] All widgets in proper layer
- [ ] Features properly isolated
- [ ] Shared lib fully organized

---

## 💡 Рекомендации

1. **Постепенная миграция**: Не мигрировать все сразу, использовать proxy pattern
2. **Типизация первым делом**: Strict TypeScript поможет найти проблемы
3. **Barrel exports**: Использовать `index.ts` для clean imports
4. **Feature flags**: Для плавного переключения между old/new компонентами
5. **Automated refactoring**: Использовать IDE для bulk import updates

---

*Последнее обновление: 18 сентября 2025*