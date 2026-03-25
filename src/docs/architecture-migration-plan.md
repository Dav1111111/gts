# 🚀 GTS Platform Architecture Migration Plan

**Цель**: Привести кодовую базу в соответствие с принципами `rules.json`  
**Статус**: 🔴 КРИТИЧЕСКИЙ → 🟢 СООТВЕТСТВУЕТ  
**Временные рамки**: 6-8 недель

---

## 🎯 Приоритетная матрица исправлений

| Исправление | Влияние | Сложность | Приоритет | Время |
|-------------|---------|-----------|-----------|-------|
| App.tsx рефакторинг | 🔴 ВЫСОКОЕ | 🟡 СРЕДНЯЯ | 1 | 3 дня |
| FSD архитектура | 🔴 ВЫСОКОЕ | 🔴 ВЫСОКАЯ | 2 | 2 недели |
| Performance optimization | 🔴 ВЫСОКОЕ | 🟡 СРЕДНЯЯ | 3 | 1 неделя |
| Security базовый | 🔴 ВЫСОКОЕ | 🟡 СРЕДНЯЯ | 4 | 1 неделя |
| A11y критичные | 🟡 СРЕДНЕ | 🟡 СРЕДНЯЯ | 5 | 1 неделя |
| TypeScript строгость | 🟡 СРЕДНЕ | 🟢 НИЗКАЯ | 6 | 3 дня |

---

## 📅 ЭТАП 1: Критические исправления (Неделя 1-2)

### 🔥 1.1 App.tsx рефакторинг (3 дня)

**Проблемы**:
```typescript
// ❌ Текущий App.tsx
- DOM манипуляции
- Множественная ответственность  
- Отсутствие Error Boundary
- Client-side only
```

**Решение**:
```typescript
// ✅ Новая архитектура App.tsx
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── error.tsx           # Error boundary
│   ├── loading.tsx         # Loading states
│   ├── providers.tsx       # Context providers
│   └── page.tsx           # Home page
```

**Конкретный план**:

**День 1**: Создание базовой FSD структуры
```bash
mkdir -p src/{app,pages,widgets,features,entities,shared}
mkdir -p src/shared/{ui,lib,api,config,constants,hooks}
```

**День 2**: Рефакторинг App.tsx
```typescript
// src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" className="dark">
      <body className="bg-background text-foreground">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

**День 3**: Миграция провайдеров и роутинга

### 🔥 1.2 Критические Performance исправления (4 дня)

**Проблема**: Bundle > 400KB (лимит 200KB)

**Решения**:

**День 1-2**: Code-splitting
```typescript
// src/pages/executive/page.tsx
const ExecutivePortal = lazy(() => import('@/widgets/ExecutivePortal'))
const PartnerPortal = lazy(() => import('@/widgets/PartnerPortal'))

// Bundle analysis
const portalModules = {
  executive: () => import('@/widgets/executive'),
  partner: () => import('@/widgets/partner'),
  client: () => import('@/widgets/client')
}
```

**День 3-4**: Lazy loading и оптимизация
```typescript
// src/shared/lib/performance.ts
export const withLazyLoading = <T>(
  importFn: () => Promise<{ default: T }>,
  fallback?: React.ComponentType
) => {
  return lazy(importFn)
}
```

### 🔥 1.3 Security базовые меры (3 дня)

**День 1**: CSP headers
```typescript
// src/app/layout.tsx
export const metadata = {
  other: {
    'Content-Security-Policy': 
      "script-src 'self' 'strict-dynamic' https:; object-src 'none'; base-uri 'none'"
  }
}
```

**День 2-3**: RBAC основы
```typescript
// src/entities/user/model.ts
export interface UserRole {
  id: string
  permissions: Permission[]
}

// src/features/auth/lib/rbac.ts
export const checkPermission = (
  user: User, 
  permission: Permission
): boolean => {
  return user.roles.some(role => 
    role.permissions.includes(permission)
  )
}
```

---

## 📅 ЭТАП 2: Архитектурные улучшения (Неделя 3-4)

### 🏗️ 2.1 Feature-Sliced Design полная миграция (10 дней)

**Новая структура**:
```typescript
src/
├── app/                    # App initialization
│   ├── layout.tsx
│   ├── providers.tsx
│   └── globals.css
├── pages/                  # Route pages
│   ├── executive/
│   ├── partner/
│   ├── client/
│   └── landing/
├── widgets/                # UI compositions
│   ├── ExecutiveDashboard/
│   ├── PartnerPortal/
│   └── ClientClub/
├── features/               # Business features
│   ├── auth/
│   ├── booking/
│   ├── crm/
│   └── finance/
├── entities/               # Business entities
│   ├── user/
│   ├── booking/
│   ├── partner/
│   └── client/
└── shared/                 # Reusable code
    ├── ui/                 # UI kit
    ├── lib/                # Utilities
    ├── api/                # API layer
    ├── config/             # Configuration
    └── hooks/              # Shared hooks
```

**Миграционная карта**:

**День 1-2**: Shared слой
```typescript
// Миграция: components/ui/* → src/shared/ui/*
// Создание: src/shared/lib/index.ts (публичный API)
```

**День 3-4**: Entities слой
```typescript
// src/entities/user/index.ts
export { User } from './model'
export { UserCard } from './ui'
export { useUser } from './hooks'

// src/entities/booking/index.ts
export { Booking } from './model'
export { BookingCard } from './ui'
export { useBooking } from './hooks'
```

**День 5-6**: Features слой
```typescript
// src/features/auth/index.ts
export { LoginForm } from './ui'
export { useAuth } from './hooks'
export { authApi } from './api'

// src/features/booking/index.ts
export { BookingForm } from './ui'
export { useBookingCreate } from './hooks'
export { bookingApi } from './api'
```

**День 7-8**: Widgets слой
```typescript
// src/widgets/ExecutiveDashboard/index.ts
export { ExecutiveDashboard } from './ui'

// Composition example:
import { CRMStats } from '@/features/crm'
import { FinanceOverview } from '@/features/finance'
import { UserProfile } from '@/entities/user'
```

**День 9-10**: Pages и публичные API

### 🔧 2.2 TypeScript строгость (3 дня)

**День 1**: Zod валидация
```typescript
// src/shared/lib/validation.ts
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  role: z.enum(['executive', 'partner', 'client'])
})

export type User = z.infer<typeof UserSchema>
```

**День 2**: Публичные интерфейсы
```typescript
// src/entities/user/model/types.ts
export interface UserRepository {
  getById(id: string): Promise<User>
  create(data: CreateUserData): Promise<User>
  update(id: string, data: UpdateUserData): Promise<User>
}
```

**День 3**: Контракты модулей
```typescript
// src/features/auth/api/contracts.ts
export interface AuthAPI {
  login(credentials: LoginCredentials): Promise<AuthResult>
  logout(): Promise<void>
  refresh(): Promise<AuthResult>
}
```

---

## 📅 ЭТАП 3: Advanced Features (Неделя 5-6)

### ⚡ 3.1 Performance продвинутые (7 дней)

**День 1-2**: SSR/RSC миграция
```typescript
// src/app/executive/page.tsx (Server Component)
export default async function ExecutivePage() {
  const userData = await getUserData() // Server-side
  
  return (
    <ExecutiveDashboard 
      userData={userData}
      // Client Components только для интерактивности
    />
  )
}
```

**День 3-4**: Виртуализация списков
```typescript
// src/shared/ui/VirtualizedTable/index.ts
import { useVirtualizer } from '@tanstack/react-virtual'

export const VirtualizedTable = ({ items, renderItem }) => {
  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
  })
  
  return (
    // Виртуализированный рендеринг
  )
}
```

**День 5-7**: Bundle optimization и prefetching

### 🎨 3.2 Design Tokens W3C (5 дней)

**День 1-2**: W3C JSON формат
```json
// src/shared/config/tokens.json
{
  "color": {
    "brand": {
      "red": {
        "value": "#91040C",
        "type": "color"
      },
      "black": {
        "value": "#000000", 
        "type": "color"
      }
    },
    "portal": {
      "background": {
        "value": "#0B0B0C",
        "type": "color"
      }
    }
  }
}
```

**День 3-4**: Автогенерация CSS
```typescript
// src/shared/lib/tokens/generator.ts
export const generateCSS = (tokens: DesignTokens): string => {
  return Object.entries(tokens.color).map(([name, token]) => 
    `--color-${name}: ${token.value};`
  ).join('\n')
}
```

**День 5**: Tailwind конфигурация из токенов

### 🛡️ 3.3 A11y критичные (5 дней)

**День 1-2**: Keyboard navigation
```typescript
// src/shared/hooks/useKeyboardNavigation.ts
export const useKeyboardNavigation = (items: NavItem[]) => {
  const [activeIndex, setActiveIndex] = useState(0)
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowDown':
          setActiveIndex(prev => (prev + 1) % items.length)
          break
        case 'ArrowUp':
          setActiveIndex(prev => (prev - 1 + items.length) % items.length)
          break
      }
    }
    
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [items.length])
  
  return { activeIndex, setActiveIndex }
}
```

**День 3-4**: ARIA атрибуты
```typescript
// src/shared/ui/Button/index.tsx
interface ButtonProps {
  'aria-label'?: string
  'aria-describedby'?: string
  role?: string
}

export const Button = ({ 
  children, 
  'aria-label': ariaLabel,
  ...props 
}: ButtonProps) => (
  <button
    aria-label={ariaLabel}
    className="focus-visible:ring-2 focus-visible:ring-accent"
    {...props}
  >
    {children}
  </button>
)
```

**День 5**: Focus management и screen readers

---

## 📅 ЭТАП 4: Testing & QA (Неделя 7-8)

### 🧪 4.1 Testing инфраструктура (7 дней)

**День 1-2**: Unit тесты (Vitest)
```typescript
// src/entities/user/model/user.test.ts
import { describe, it, expect } from 'vitest'
import { User } from './user'

describe('User entity', () => {
  it('should create user with valid data', () => {
    const user = new User({
      id: '1',
      email: 'test@example.com',
      role: 'client'
    })
    
    expect(user.id).toBe('1')
    expect(user.email).toBe('test@example.com')
  })
})
```

**День 3-4**: Component тесты
```typescript
// src/shared/ui/Button/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from './Button'

describe('Button component', () => {
  it('should render with correct aria-label', () => {
    render(<Button aria-label="Save">Save</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Save')
  })
})
```

**День 5-7**: E2E тесты (Playwright)
```typescript
// tests/e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test('executive portal authentication flow', async ({ page }) => {
  await page.goto('/executive')
  await page.fill('[data-testid="email"]', 'admin@gts.com')
  await page.fill('[data-testid="password"]', 'password')
  await page.click('[data-testid="login"]')
  
  await expect(page).toHaveURL('/executive/dashboard')
})
```

### 📊 4.2 Performance testing (3 дня)

**День 1**: Lighthouse CI
```typescript
// lighthouse.config.js
module.exports = {
  ci: {
    collect: {
      url: ['http://localhost:3000/', 'http://localhost:3000/executive'],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        'categories:performance': ['error', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.9 }],
      },
    },
  },
}
```

**День 2-3**: Bundle analysis и оптимизация

---

## 🎯 Критерии успеха

### 📊 Метрики производительности

| Метрика | Текущее | Цель | Статус |
|---------|---------|------|---------|
| Mobile Bundle | 400KB | 200KB | 🔴 |
| Desktop Bundle | 500KB | 300KB | 🔴 |
| LCP | 4s | <2.5s | 🔴 |
| FID | 150ms | <100ms | 🟡 |
| CLS | 0.2 | <0.1 | 🔴 |

### 🏗️ Архитектурные метрики

| Критерий | Цель | Проверка |
|----------|------|----------|
| FSD соответствие | 100% | Структура папок |
| Public API покрытие | 100% | index.ts файлы |
| TypeScript strict | 100% | ESLint правила |
| A11y покрытие | 90% | axe-core тесты |

### 🛡️ Security checklist

- [ ] CSP headers настроены
- [ ] RBAC система реализована
- [ ] XSS защита включена
- [ ] Безопасные cookies
- [ ] Input sanitization

---

## 🚨 Риски и митигация

### 🔥 Высокие риски

**1. Breaking changes при миграции FSD**
- **Риск**: Поломка существующего функционала
- **Митигация**: Поэтапная миграция с тестированием
- **План B**: Rollback стратегия

**2. Performance regression**
- **Риск**: Замедление при рефакторинге
- **Митигация**: Постоянный мониторинг метрик
- **План B**: Cherry-pick оптимизации

**3. Compatibility issues**
- **Риск**: Конфликты зависимостей
- **Митигация**: Тщательная проверка package.json
- **План B**: Версионирование зависимостей

### 🟡 Средние риски

**1. Learning curve для команды**
- **Митигация**: Документация и воркшопы
- **Время**: +1 неделя на обучение

**2. Регрессии в UI**
- **Митигация**: Visual regression тесты
- **Инструменты**: Chromatic/Percy

---

## 📋 Чек-лист готовности к продакшену

### 🏗️ Архитектура
- [ ] FSD структура реализована
- [ ] Публичные API созданы
- [ ] Импорты через алиасы
- [ ] Границы модулей соблюдены

### ⚡ Performance
- [ ] Bundle size <200KB mobile
- [ ] Code-splitting реализован
- [ ] Lazy loading включен
- [ ] SSR/RSC настроены

### 🛡️ Security
- [ ] CSP headers
- [ ] RBAC система
- [ ] Secure cookies
- [ ] Input validation

### 🎨 UI/UX
- [ ] Design tokens W3C
- [ ] Responsive design
- [ ] A11y compliance
- [ ] Dark/Light themes

### 🧪 Testing
- [ ] Unit tests >80%
- [ ] Component tests
- [ ] E2E critical flows
- [ ] Performance budgets

---

## 🎯 Следующие шаги

**Немедленно** (сегодня):
1. Создать ветку `architecture-migration`
2. Начать рефакторинг App.tsx
3. Настроить новую структуру FSD

**На этой неделе**:
1. Завершить ЭТАП 1
2. Провести код-ревью
3. Запустить базовые тесты

**В следующем месяце**:
1. Завершить все 4 этапа
2. Провести нагрузочное тестирование
3. Подготовить к продакшену

---

**Ответственный за миграцию**: Tech Lead  
**Контроль качества**: Senior Developer  
**Тестирование**: QA Engineer  
**Ревью архитектуры**: Tech Architect