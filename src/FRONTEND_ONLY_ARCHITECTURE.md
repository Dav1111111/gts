# 🎨 GTS Platform - Frontend-Only Architecture

## 📋 Обзор

**Grand Tour Sochi Platform** теперь полностью работает как **frontend-only приложение** без каких-либо backend зависимостей. Вся функциональность реализована через систему mock-данных с персистентностью в localStorage.

---

## 🏗️ Архитектура

### Структура данных

```
┌────────────────────────────────────────┐
│         React Application              │
│  ┌──────────────────────────────────┐  │
│  │  Components & Pages              │  │
│  │  - GTSRouter                     │  │
│  │  - Executive Panel               │  │
│  │  - CRM System                    │  │
│  │  - Client Portal                 │  │
│  │  - Partner Portal                │  │
│  └──────────────────────────────────┘  │
│              ↓ ↑                       │
│  ┌──────────────────────────────────┐  │
│  │  Context Layer                   │  │
│  │  - GTSAuthContext                │  │
│  │  - SessionManagement             │  │
│  └──────────────────────────────────┘  │
│              ↓ ↑                       │
│  ┌──────────────────────────────────┐  │
│  │  Custom Hooks                    │  │
│  │  - useBookingSystem              │  │
│  │  - useMockData                   │  │
│  │  - usePushNotifications          │  │
│  └──────────────────────────────────┘  │
│              ↓ ↑                       │
│  ┌──────────────────────────────────┐  │
│  │  Mock Data Layer                 │  │
│  │  - mockDataStore (Singleton)     │  │
│  │  - CRUD Operations               │  │
│  │  - Data Validation               │  │
│  └──────────────────────────────────┘  │
│              ↓ ↑                       │
│  ┌──────────────────────────────────┐  │
│  │  localStorage Persistence        │  │
│  │  - gts-mock-users                │  │
│  │  - gts-mock-clients              │  │
│  │  - gts-mock-bookings             │  │
│  │  - gts-demo-session              │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
```

---

## 🔑 Ключевые компоненты

### 1. GTSAuthContext (`/contexts/GTSAuthContext.tsx`)

**Функции:**
- ✅ Mock-аутентификация без backend
- ✅ Управление сессиями через localStorage
- ✅ Role-based access control (RBAC)
- ✅ Поддержка всех ролей пользователей

**Роли:**
```typescript
type UserRole = 
  | 'executive'      // Руководство
  | 'staff'          // Персонал
  | 'partner'        // Партнеры
  | 'member'         // Клиенты (Bronze/Silver/Gold/Platinum)
  | 'guest'          // Гости
  | 'admin';         // Администраторы
```

**Использование:**
```typescript
import { useGTSAuth } from './contexts/GTSAuthContext';

function MyComponent() {
  const { user, login, logout, hasRole } = useGTSAuth();
  
  // Проверка роли
  if (hasRole('executive')) {
    // Показать админ панель
  }
  
  // Вход
  await login('member@gts.ru', 'any-password');
  
  // Выход
  await logout();
}
```

---

### 2. Mock Data Store (`/utils/mockData.ts`)

**Функции:**
- ✅ Централизованное хранилище данных
- ✅ Full CRUD операции
- ✅ Персистентность в localStorage
- ✅ Фильтрация и сортировка
- ✅ Пагинация

**Доступные таблицы:**
- `users` - Пользователи системы
- `clients` - Клиенты
- `deals` - Сделки
- `activities` - Активности
- `bookings` - Бронирования
- `fleet` - Флот техники
- `partners` - Партнеры
- `revenue` - Данные о выручке
- `weather` - Погодные условия

**Примеры использования:**

```typescript
import { mockDataStore, MockAPI } from './utils/mockData';

// SELECT - Получение данных
const allClients = mockDataStore.select('clients');

const activeClients = mockDataStore.select('clients', {
  where: { status: 'active' },
  orderBy: 'created_at desc',
  limit: 10
});

// INSERT - Создание
const newClient = mockDataStore.insert('clients', {
  name: 'Иван Иванов',
  email: 'ivan@example.com',
  status: 'lead',
  value: 500000
});

// UPDATE - Обновление
const updated = mockDataStore.update('clients', 'client-1', {
  status: 'active',
  value: 1000000
});

// DELETE - Удаление
const success = mockDataStore.delete('clients', 'client-1');

// Симуляция задержки API
await MockAPI.delay(300); // 300ms задержка
```

---

### 3. useBookingSystem Hook (`/hooks/useBookingSystem.ts`)

**Функции:**
- ✅ Управление бронированиями
- ✅ Real-time обновления (эмуляция)
- ✅ Уведомления
- ✅ Фильтрация и поиск

**Использование:**
```typescript
import useBookingSystem from './hooks/useBookingSystem';

function BookingCalendar() {
  const {
    bookings,           // Список бронирований
    loading,            // Статус загрузки
    error,              // Ошибки
    fetchBookings,      // Получить бронирования
    createBooking,      // Создать бронирование
    updateBooking,      // Обновить
    deleteBooking,      // Удалить
    refresh,            // Обновить данные
    unreadCount,        // Непрочитанные уведомления
    todayBookings       // Сегодняшние бронирования
  } = useBookingSystem({
    enableRealTime: true,
    pollInterval: 30000,
    autoRefresh: true
  });

  // Получить бронирования за период
  await fetchBookings({
    date_from: '2024-12-01',
    date_to: '2024-12-31',
    status: 'confirmed'
  });

  // Создать новое бронирование
  await createBooking({
    title: 'VIP тур',
    client: { ... },
    resource: { ... },
    // ... остальные поля
  });
}
```

---

## 🔐 Аутентификация

### Данные для входа

Все пользователи могут войти с **любым паролем**. Система определяет роль по email:

```
📧 Email                  | 🎭 Роль      | 🔑 Пароль
──────────────────────────┼──────────────┼───────────
member@gts.ru             │ Member       │ любой
guest@gts.ru              │ Guest        │ любой
staff@gts.ru              │ Staff        │ любой
partner@gts.ru            │ Partner      │ любой
admin@gts.com             │ Admin        │ любой
executive@gts.com         │ Executive    │ любой
```

См. полный список в [LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md)

### Процесс аутентификации

1. Пользователь вводит email
2. Система определяет роль по домену/префиксу
3. Создается mock-сессия в localStorage
4. Пользователь перенаправляется на соответствующий портал

---

## 📊 Данные и персистентность

### localStorage Keys

```
gts-mock-users          // Пользователи
gts-mock-clients        // Клиенты
gts-mock-deals          // Сделки
gts-mock-activities     // Активности
gts-mock-bookings       // Бронирования
gts-mock-fleet          // Флот
gts-mock-partners       // Партнеры
gts-mock-revenue        // Выручка
gts-mock-weather        // Погода
gts-demo-session        // Текущая сессия
```

### Инициализация данных

При первом запуске система автоматически:
1. Генерирует демо-данные для всех таблиц
2. Сохраняет их в localStorage
3. Использует их при последующих запусках

### Сброс данных

```typescript
// Очистить все данные
localStorage.clear();

// Удалить конкретную таблицу
localStorage.removeItem('gts-mock-clients');

// После перезагрузки страницы данные будут сгенерированы заново
```

---

## 🎯 Основные функции

### ✅ Полностью работают

- **Аутентификация** - вход/выход, смена ролей
- **CRM** - управление клиентами и лидами
- **Бронирования** - создание, редактирование, отмена
- **Финансы** - учет транзакций
- **Партнеры** - управление партнерами
- **Флот** - управление техникой
- **Аналитика** - дашборды с графиками
- **Уведомления** - push-уведомления (если разрешено браузером)
- **Поиск и фильтрация** - по всем сущностям
- **Экспорт данных** - в JSON (через console)

### 🎨 UI/UX Features

- **Dark Theme** - темная тема для порталов
- **Responsive Design** - адаптивность для всех устройств
- **Animations** - плавные анимации (Motion/React)
- **Real-time Updates** - эмуляция real-time через polling
- **Loading States** - индикаторы загрузки
- **Error Handling** - обработка ошибок
- **Toast Notifications** - всплывающие уведомления

---

## 🚀 Развертывание

### Development Mode

```bash
npm install
npm run dev
```

Приложение откроется на `http://localhost:5173`

### Production Build

```bash
npm run build
npm run preview
```

### Static Hosting

Приложение полностью статическое и может быть размещено на:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages
- ✅ AWS S3 + CloudFront
- ✅ Any static hosting

---

## 📦 Структура проекта

```
/
├── components/              # React компоненты
│   ├── admin/              # Админ панель
│   ├── modules/            # Модули системы
│   ├── pages/              # Страницы
│   ├── portal/             # Порталы
│   ├── shell/              # Shell компоненты
│   ├── ui/                 # UI библиотека (shadcn)
│   └── ui-kit/             # Кастомный UI Kit
├── contexts/               # React Contexts
│   ├── GTSAuthContext.tsx  # Аутентификация
│   └── AuthContext.tsx     # Legacy auth (deprecated)
├── hooks/                  # Custom hooks
│   ├── useBookingSystem.ts # Система бронирований
│   ├── useMockData.ts      # Mock данные
│   └── usePushNotifications.ts # Push уведомления
├── utils/                  # Утилиты
│   ├── mockData.ts         # Mock Data Store
│   ├── navigation.ts       # Навигация
│   └── cleanup-manager.ts  # Управление очисткой
├── styles/                 # Стили
│   ├── globals.css         # Глобальные стили
│   └── design-tokens.css   # Дизайн токены
├── App.tsx                 # Главный компонент
├── main.tsx                # Entry point
└── package.json            # Зависимости
```

---

## 🔧 Переменные окружения

Приложение **не требует** переменных окружения для работы. Все настройки захардкожены для упрощения развертывания.

Опционально можно создать `.env`:
```env
VITE_APP_NAME=GTS Platform
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

---

## 📚 API Mock Documentation

### MockDataStore API

#### select(table, query?)
Получает данные из таблицы

```typescript
mockDataStore.select('clients', {
  where: { status: 'active' },
  limit: 10,
  orderBy: 'created_at desc'
});
```

#### insert(table, data)
Создает новую запись

```typescript
mockDataStore.insert('clients', {
  name: 'New Client',
  email: 'client@example.com'
});
```

#### update(table, id, data)
Обновляет запись

```typescript
mockDataStore.update('clients', 'client-1', {
  status: 'vip'
});
```

#### delete(table, id)
Удаляет запись

```typescript
mockDataStore.delete('clients', 'client-1');
```

### MockAPI Utilities

#### delay(ms)
Симулирует задержку API

```typescript
await MockAPI.delay(500); // 500ms задержка
```

#### paginate(data, page, limit)
Пагинация данных

```typescript
const result = MockAPI.paginate(clients, 1, 10);
// { data: [...], total: 100, page: 1, pages: 10 }
```

---

## 🎓 Best Practices

### 1. Работа с данными

```typescript
// ✅ Хорошо - используй mockDataStore
const clients = mockDataStore.select('clients');

// ❌ Плохо - не обращайся к localStorage напрямую
const clients = JSON.parse(localStorage.getItem('gts-mock-clients'));
```

### 2. Симуляция задержек

```typescript
// ✅ Хорошо - добавь задержку для реалистичности
async function fetchData() {
  await MockAPI.delay(300);
  return mockDataStore.select('clients');
}

// ❌ Плохо - синхронные операции выглядят нереалистично
function fetchData() {
  return mockDataStore.select('clients');
}
```

### 3. Обработка ошибок

```typescript
// ✅ Хорошо
try {
  await createBooking(data);
} catch (error) {
  console.error('Booking creation failed:', error);
  toast.error('Не удалось создать бронирование');
}
```

---

## 🔄 Миграция на реальный Backend

Когда понадобится реальный backend, следуй этому плану:

### Фаза 1: Абстракция
Создай data abstraction layer:

```typescript
// /hooks/useClients.ts
export function useClients() {
  const isDevelopment = import.meta.env.DEV;
  
  if (isDevelopment) {
    return useMockClients();
  } else {
    return useAPIClients();
  }
}
```

### Фаза 2: API Layer
Добавь API клиент:

```typescript
// /api/client.ts
import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```

### Фаза 3: Gradual Migration
Постепенно заменяй mock на реальные вызовы API:

```typescript
// useClients.ts
export function useClients() {
  const { data, isLoading } = useQuery('clients', async () => {
    if (import.meta.env.DEV) {
      return mockDataStore.select('clients');
    } else {
      const response = await apiClient.get('/clients');
      return response.data;
    }
  });
  
  return { clients: data, loading: isLoading };
}
```

---

## 📖 Дополнительные ресурсы

- [GTS_PLATFORM_ANALYSIS.md](./GTS_PLATFORM_ANALYSIS.md) - Полный анализ платформы
- [SUPABASE_REMOVAL_LOG.md](./SUPABASE_REMOVAL_LOG.md) - Журнал удаления Supabase
- [LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md) - Учетные данные для входа
- [ANIMATIONS_README.md](./ANIMATIONS_README.md) - Документация по анимациям

---

## ✅ Чеклист готовности

- [x] ✅ Все Supabase зависимости удалены
- [x] ✅ Mock Data Store реализован и работает
- [x] ✅ Аутентификация через GTSAuthContext
- [x] ✅ localStorage персистентность
- [x] ✅ Все основные модули функционируют
- [x] ✅ CRUD операции работают
- [x] ✅ Документация обновлена
- [x] ✅ Готово к демонстрации

---

**Версия**: 1.0  
**Дата**: 16 декабря 2024  
**Статус**: ✅ Production Ready (Frontend-Only)
