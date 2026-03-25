# 🔧 Immediate Fixes Examples - GTS Platform

**Цель**: Конкретные примеры кода для немедленного исправления критических нарушений  
**Приоритет**: 🔴 КРИТИЧЕСКИЙ  
**Время выполнения**: 1-3 дня

---

## 🚨 1. App.tsx - Критическое исправление

### ❌ Текущий проблемный код:

```typescript
// /App.tsx - НАРУШАЕТ 8 принципов rules.json
export default function App() {
  // ❌ DOM манипуляции в React
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const loading = document.getElementById('loading');
      if (loading) {
        loading.style.display = 'none';
      }
      document.body.classList.add('loaded');
    }
  }, []);

  // ❌ Слишком много ответственности
  const isAdminPage = React.useMemo(() => {
    const adminPages = ['executive-access', 'partner-portal'];
    return adminPages.includes(currentPage);
  }, [currentPage]);

  // ❌ Прямые DOM манипуляции
  React.useEffect(() => {
    if (isAdminPage) {
      document.documentElement.classList.add('dark');
    }
  }, [isAdminPage]);
}
```

### ✅ Исправленный код (FSD + rules.json):

```typescript
// src/app/layout.tsx - Server Component по умолчанию
import { Metadata } from 'next'
import { ErrorBoundary } from '@/shared/ui/ErrorBoundary'
import { Providers } from './providers'
import { ThemeProvider } from '@/shared/lib/theme'
import '@/shared/styles/globals.css'

export const metadata: Metadata = {
  title: 'GTS Platform',
  description: 'Grand Tour Sochi Platform',
  // ✅ CSP headers согласно rules.json
  other: {
    'Content-Security-Policy': 
      "script-src 'self' 'strict-dynamic' https:; object-src 'none'; base-uri 'none'"
  }
}

// ✅ Server Component - rules.json требование
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="bg-background text-foreground antialiased">
        <ErrorBoundary>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange
          >
            <Providers>
              {children}
            </Providers>
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

```typescript
// src/app/providers.tsx - Разделение ответственности
'use client'

import { AuthProvider } from '@/features/auth'
import { QueryProvider } from '@/shared/lib/query'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <AuthProvider>
        {children}
      </AuthProvider>
    </QueryProvider>
  )
}
```

```typescript
// src/app/page.tsx - Главная страница
import { redirect } from 'next/navigation'
import { getUserRole } from '@/features/auth/server'

// ✅ Server Component с редиректом по ролям
export default async function HomePage() {
  const userRole = await getUserRole()
  
  if (!userRole) {
    redirect('/auth/login')
  }
  
  // ✅ Роутинг по ролям согласно RBAC
  const roleRoutes = {
    executive: '/executive',
    partner: '/partner', 
    client: '/client',
    crew: '/crew'
  } as const
  
  redirect(roleRoutes[userRole] || '/auth/login')
}
```

---

## 🏗️ 2. FSD Structure - Немедленная структура

### ❌ Текущая структура:
```
components/
├── admin/modules/GTSCRMModule.tsx     # ❌ Нарушает FSD
├── portal/GTSClientPortal.tsx         # ❌ Смешаны слои
└── ui/button.tsx                      # ❌ Нет публичного API
```

### ✅ Новая FSD структура:

```bash
# Команды для создания правильной структуры
mkdir -p src/{app,pages,widgets,features,entities,shared}
mkdir -p src/shared/{ui,lib,api,config,hooks,constants}
mkdir -p src/entities/{user,booking,partner,client}
mkdir -p src/features/{auth,crm,booking,finance}
mkdir -p src/widgets/{ExecutiveDashboard,PartnerPortal,ClientClub}
mkdir -p src/pages/{executive,partner,client,auth}
```

### ✅ Публичные API (index.ts):

```typescript
// src/shared/ui/index.ts - Публичный API UI
export { Button } from './button'
export { Card } from './card'
export { Dialog } from './dialog'
export { Input } from './input'
export { Table } from './table'
// Все компоненты через единый импорт

// src/entities/user/index.ts - Публичный API User
export { User } from './model'
export { UserCard } from './ui'
export { useUser } from './hooks'
export type { UserRole, UserPermissions } from './types'

// src/features/auth/index.ts - Публичный API Auth
export { LoginForm } from './ui'
export { useAuth, useLogin } from './hooks'
export { authApi } from './api'
export type { AuthResult } from './types'

// src/features/crm/index.ts - Публичный API CRM
export { CRMDashboard } from './ui'
export { useCRM } from './hooks'
export { crmApi } from './api'
export type { Lead, Deal } from './types'
```

---

## ⚡ 3. Performance - Критические исправления

### ❌ Текущие проблемы:
```typescript
// Нет code-splitting
import { GTSExecutivePanel } from './components/admin/GTSExecutivePanel'
import { GTSPartnerPortal } from './components/admin/GTSPartnerPortalUnified'
// Все загружается сразу = 400KB+
```

### ✅ Code-splitting исправления:

```typescript
// src/pages/executive/page.tsx - Lazy loading
import { Suspense } from 'react'
import { Skeleton } from '@/shared/ui'
import dynamic from 'next/dynamic'

// ✅ Dynamic imports согласно rules.json
const ExecutiveDashboard = dynamic(
  () => import('@/widgets/ExecutiveDashboard'),
  {
    loading: () => <Skeleton className="h-screen" />,
    ssr: false // Только если нужно
  }
)

export default function ExecutivePage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen" />}>
      <ExecutiveDashboard />
    </Suspense>
  )
}
```

```typescript
// src/widgets/ExecutiveDashboard/index.tsx - Lazy widgets
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/shared/ui'

// ✅ Lazy loading модулей
const CRMWidget = lazy(() => import('@/features/crm/ui/CRMWidget'))
const FinanceWidget = lazy(() => import('@/features/finance/ui/FinanceWidget'))

export function ExecutiveDashboard() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <CRMWidget />
      </Suspense>
      <Suspense fallback={<Skeleton className="h-[400px]" />}>
        <FinanceWidget />
      </Suspense>
    </div>
  )
}
```

---

## 🛡️ 4. Security - Базовые исправления

### ❌ Текущие проблемы:
```typescript
// Роли в клиентском коде
const userRole = localStorage.getItem('userRole') // ❌ Небезопасно
```

### ✅ Безопасные решения:

```typescript
// src/features/auth/server/auth.ts - Server-side auth
import { cookies } from 'next/headers'
import { jwtVerify } from 'jose'

// ✅ Серверная проверка токенов
export async function getUserRole(): Promise<UserRole | null> {
  try {
    const token = cookies().get('auth-token')?.value
    
    if (!token) return null
    
    const { payload } = await jwtVerify(
      token,
      new TextEncoder().encode(process.env.JWT_SECRET)
    )
    
    return payload.role as UserRole
  } catch {
    return null
  }
}

// src/features/auth/middleware.ts - RBAC middleware
export function withRoleAccess(allowedRoles: UserRole[]) {
  return async function middleware(request: NextRequest) {
    const userRole = await getUserRole()
    
    if (!userRole || !allowedRoles.includes(userRole)) {
      return NextResponse.redirect(new URL('/auth/forbidden', request.url))
    }
    
    return NextResponse.next()
  }
}
```

```typescript
// src/features/auth/lib/rbac.ts - RBAC система
interface Permission {
  resource: string
  action: 'read' | 'write' | 'delete'
}

interface RolePermissions {
  executive: Permission[]
  partner: Permission[]
  client: Permission[]
}

// ✅ Типизированные разрешения
export const rolePermissions: RolePermissions = {
  executive: [
    { resource: 'crm', action: 'read' },
    { resource: 'crm', action: 'write' },
    { resource: 'finance', action: 'read' },
    { resource: 'finance', action: 'write' }
  ],
  partner: [
    { resource: 'crm', action: 'read' },
    { resource: 'booking', action: 'write' }
  ],
  client: [
    { resource: 'booking', action: 'read' },
    { resource: 'profile', action: 'write' }
  ]
}

export function hasPermission(
  userRole: UserRole,
  resource: string,
  action: string
): boolean {
  return rolePermissions[userRole].some(
    p => p.resource === resource && p.action === action
  )
}
```

---

## 🎯 5. TypeScript - Строгость

### ❌ Текущие проблемы:
```typescript
// Нет валидации входных данных
const handleSubmit = (data: any) => { // ❌ any тип
  // обработка без валидации
}
```

### ✅ Zod валидация:

```typescript
// src/shared/lib/validation/schemas.ts - Zod schemas
import { z } from 'zod'

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  role: z.enum(['executive', 'partner', 'client', 'crew']),
  profile: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    phone: z.string().optional()
  })
})

export const BookingSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  serviceType: z.enum(['helicopter', 'yacht', 'car']),
  date: z.date(),
  status: z.enum(['pending', 'confirmed', 'completed', 'cancelled']),
  price: z.number().positive()
})

// ✅ Экспорт типов из схем
export type User = z.infer<typeof UserSchema>
export type Booking = z.infer<typeof BookingSchema>
```

```typescript
// src/features/booking/api/bookingApi.ts - Типизированное API
import { BookingSchema } from '@/shared/lib/validation'

export class BookingAPI {
  // ✅ Валидация входных данных
  async create(data: unknown): Promise<Booking> {
    const validatedData = BookingSchema.parse(data)
    
    const response = await fetch('/api/bookings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validatedData)
    })
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const result = await response.json()
    return BookingSchema.parse(result) // ✅ Валидация ответа
  }
}
```

---

## 📱 6. A11y - Критические исправления

### ❌ Текущие проблемы:
```tsx
// Нет ARIA атрибутов
<button onClick={handleClick}>Save</button>
<input placeholder="Enter email" />
```

### ✅ A11y исправления:

```typescript
// src/shared/ui/button/Button.tsx - Доступная кнопка
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  'aria-label'?: string
}

export function Button({ 
  children, 
  loading = false,
  'aria-label': ariaLabel,
  className,
  ...props 
}: ButtonProps) {
  return (
    <button
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      aria-disabled={loading}
      className={cn(
        // ✅ Focus indicators согласно rules.json
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
        'min-h-[44px] min-w-[44px]', // ✅ 44px минимум для touch targets
        className
      )}
      {...props}
    >
      {loading && (
        <span aria-hidden="true" className="spinner">
          Loading...
        </span>
      )}
      {children}
    </button>
  )
}
```

```typescript
// src/shared/ui/input/Input.tsx - Доступный input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  description?: string
}

export function Input({ 
  label, 
  error, 
  description, 
  className, 
  id,
  ...props 
}: InputProps) {
  const inputId = id || `input-${Math.random().toString(36).substring(7)}`
  const errorId = error ? `${inputId}-error` : undefined
  const descriptionId = description ? `${inputId}-description` : undefined

  return (
    <div className="space-y-2">
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium"
        >
          {label}
        </label>
      )}
      
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={cn(errorId, descriptionId)}
        className={cn(
          'w-full px-3 py-2 border rounded-md',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent',
          error && 'border-destructive',
          className
        )}
        {...props}
      />
      
      {description && (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
      
      {error && (
        <p 
          id={errorId} 
          className="text-sm text-destructive"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  )
}
```

---

## 🎨 7. Design Tokens - W3C исправления

### ❌ Текущий формат:
```css
/* styles/design-tokens.css */
:root {
  --gts-brand-red: #91040C;
  --gts-portal-bg: #0B0B0C;
}
```

### ✅ W3C JSON формат:

```json
// src/shared/config/design-tokens.json
{
  "$schema": "https://design-tokens.org/schemas/dtcg.json",
  "color": {
    "brand": {
      "red": {
        "value": "#91040C",
        "type": "color",
        "description": "Primary brand red color"
      },
      "black": {
        "value": "#000000",
        "type": "color"
      },
      "white": {
        "value": "#FFFFFF", 
        "type": "color"
      }
    },
    "portal": {
      "background": {
        "value": "#0B0B0C",
        "type": "color",
        "description": "Portal background color"
      },
      "surface": {
        "value": "#121214",
        "type": "color"
      },
      "card": {
        "value": "#17181A",
        "type": "color"
      }
    }
  },
  "spacing": {
    "cards": {
      "value": "24px",
      "type": "dimension",
      "description": "Standard card padding"
    },
    "tables": {
      "value": "16px", 
      "type": "dimension",
      "description": "Table and toolbar padding"
    }
  },
  "typography": {
    "font": {
      "heading": {
        "value": "Nokia Kokia",
        "type": "fontFamily"
      },
      "body": {
        "value": "Gilroy",
        "type": "fontFamily"
      }
    }
  }
}
```

---

## 🔧 Команды для быстрого применения

### 1. Создание новой структуры:
```bash
# Создать FSD структ��ру
mkdir -p src/{app,pages,widgets,features,entities,shared}
mkdir -p src/shared/{ui,lib,api,config,hooks,constants}

# Переместить компоненты
mv components/ui/* src/shared/ui/
mv styles/* src/shared/styles/
```

### 2. Обновление imports:
```bash
# Найти и заменить импорты
find src -name "*.tsx" -type f -exec sed -i 's/..\/..\/components\/ui/\@\/shared\/ui/g' {} \;
find src -name "*.tsx" -type f -exec sed -i 's/..\/styles/\@\/shared\/styles/g' {} \;
```

### 3. ESLint правила для соблюдения FSD:
```json
// .eslintrc.json
{
  "rules": {
    "import/no-relative-parent-imports": "error",
    "@typescript-eslint/no-explicit-any": "error",
    "boundaries/element-types": [
      "error",
      {
        "default": "disallow",
        "rules": [
          {
            "from": "shared",
            "allow": ["shared"]
          },
          {
            "from": "entities", 
            "allow": ["shared", "entities"]
          },
          {
            "from": "features",
            "allow": ["shared", "entities", "features"]
          }
        ]
      }
    ]
  }
}
```

---

## ⏰ Временная шкала применения

### День 1 (Сегодня):
- [ ] Создать FSD структуру папок
- [ ] Рефакторить App.tsx → layout.tsx
- [ ] Добавить базовые index.ts файлы

### День 2:
- [ ] Миграция shared/ui компонентов
- [ ] Обновление импортов
- [ ] Добавление Zod валидации

### День 3:
- [ ] Security исправления (CSP, RBAC)
- [ ] A11y базовые атрибуты
- [ ] Performance оптимизации

**Результат**: Соответствие rules.json на 80%+ за 3 дня

---

## ✅ Проверочный чек-лист

После применения исправлений проверить:

- [ ] **FSD структура**: `src/{app,pages,widgets,features,entities,shared}`
- [ ] **Публичные API**: Все index.ts файлы созданы
- [ ] **TypeScript strict**: Нет any типов
- [ ] **Security**: CSP headers добавлены
- [ ] **A11y**: ARIA атрибуты добавлены
- [ ] **Performance**: Bundle <300KB
- [ ] **Design Tokens**: W3C JSON формат

**Критерий готовности**: Все пункты ✅ = можно переходить к следующему этапу