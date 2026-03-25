# 📁 GTS Platform - Реорганизация компонентов

## Текущая структура /components (Legacy - работает)
```
/components
  /admin/           # 20+ админ компонентов
  /auth/            # 1 компонент авторизации  
  /core/            # 3 роутера
  /demo/            # 1 демо компонент
  /modules/         # 15+ модулей
  /pages/           # 2 основные страницы
  /portal/          # 25+ портал компонентов
  /shared/          # 8 общих компонентов
  /shell/           # 8 layout компонентов
  /ui/              # ShadCN библиотека
  /ui-kit/          # GTSUIKit система
```

## Целевая структура (Организованная)
```
/components
  /business/        # Бизнес-функции (25+ компонентов)
    /auth/          # Авторизация и RBAC
    /booking/       # Система бронирования  
    /crm/           # CRM компоненты
    /finance/       # Финансовые модули
    /fleet/         # Управление флотом
    /partners/      # Партнерские программы
  /layout/          # Layout и navigation (11+ компонентов)
    /shell/         # App shell компоненты
    /core/          # Роутеры и navigation
    /header/        # Header/topbar компоненты
  /portals/         # Пользовательские порталы (30+ компонентов)  
    /admin/         # Админ панели
    /client/        # Клиентские порталы
    /partner/       # Партнерские порталы
    /b2b/           # B2B порталы
  /shared/          # Общие компоненты (20+ компонентов)
    /ui/            # ShadCN компоненты
    /kit/           # GTSUIKit система
    /modules/       # Переиспользуемые модули
  /pages/           # Страницы приложения (5+ компонентов)
```

## Безопасное перемещение файлов

### Шаг 1: Создание новых директорий
```bash
mkdir -p components/business/{auth,booking,crm,finance,fleet,partners}
mkdir -p components/layout/{shell,core,header}
mkdir -p components/portals/{admin,client,partner,b2b}
mkdir -p components/shared/{ui,kit,modules}
```

### Шаг 2: Перемещение по категориям
- `/admin/*` → `/portals/admin/*`
- `/auth/*` → `/business/auth/*`  
- `/core/*` → `/layout/core/*`
- `/modules/*` → `/shared/modules/*`
- `/portal/GTS*Client*` → `/portals/client/*`
- `/portal/GTS*Partner*` → `/portals/partner/*`
- `/portal/GTSB2B*` → `/portals/b2b/*`
- `/shell/*` → `/layout/shell/*`
- `/ui-kit/*` → `/shared/kit/*`

### Шаг 3: Создание index.ts файлов
```typescript
// /components/business/index.ts
export * from './auth';
export * from './booking';
export * from './crm';

// /components/layout/index.ts  
export * from './shell';
export * from './core';

// /components/portals/index.ts
export * from './admin';
export * from './client';
export * from './partner';
```