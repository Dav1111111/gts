# 🚀 Grand Tour Sochi Platform

**Premium Frontend-Only Web Application для клуба активного отдыха**

[![Status](https://img.shields.io/badge/status-production%20ready-green)]()
[![Version](https://img.shields.io/badge/version-1.0-blue)]()
[![Architecture](https://img.shields.io/badge/architecture-frontend--only-orange)]()

---

## 📋 О проекте

**GTS Platform** - полнофункциональная система управления клубом активного отдыха с арендой премиальной техники (вертолеты, яхты, спорткары). Включает 14 основных экранов, 7 порталов для разных типов пользователей, CRM, финансовый модуль, систему бронирований и 90+ готовых компонентов.

### ✨ Ключевые особенности

- 🎨 **Premium дизайн** - темная минималистичная тема
- 🔐 **7 ролей пользователей** - от гостей до executive
- 📊 **90+ модулей** - CRM, финансы, бронирования, аналитика
- 💾 **Frontend-only** - работает без backend, mock-данные
- 🎭 **Продвинутые анимации** - Motion/React
- 📱 **Адаптивный дизайн** - desktop + mobile
- ⚡ **Мгновенный старт** - не требует настройки

---

## 🚀 Быстрый старт

### 1️⃣ Установка

```bash
# Клонировать репозиторий (если есть)
git clone [your-repo-url]
cd gts-platform

# Установить зависимости
npm install
```

### 2️⃣ Запуск

```bash
# Запустить development сервер
npm run dev

# Открыть в браузере
# → http://localhost:5173
```

### 3️⃣ Вход в систему

Используйте любой из email-адресов с **любым паролем**:

| Email | Роль | Доступ |
|-------|------|--------|
| `member@gts.ru` | Member | Client Portal |
| `guest@gts.ru` | Guest | Guest Portal |
| `staff@gts.ru` | Staff | Staff Portal |
| `partner@gts.ru` | Partner | Partner Portal |
| `admin@gts.com` | Admin | Admin Dashboard |
| `executive@gts.com` | Executive | Executive Panel |

**📖 Полный список логинов**: [LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md)

---

## 📚 Документация

### 🎯 Начните отсюда

| Документ | Описание | Для кого |
|----------|----------|----------|
| **[INDEX.md](./INDEX.md)** | Главный индекс всей документации | 🔥 Все |
| **[GTS_PLATFORM_ANALYSIS.md](./GTS_PLATFORM_ANALYSIS.md)** | Полный анализ платформы | 🔥 Разработчики |
| **[FRONTEND_ONLY_ARCHITECTURE.md](./FRONTEND_ONLY_ARCHITECTURE.md)** | Архитектура и API | ⭐ Разработчики |
| **[PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)** | Структура файлов | ⭐ Все |
| **[PROJECT_TREE.md](./PROJECT_TREE.md)** | Дерево проекта | ✅ Все |

### 📖 Дополнительно

- **[ANIMATIONS_README.md](./ANIMATIONS_README.md)** - Руководство по анимациям
- **[docs/design-system.md](./docs/design-system.md)** - Дизайн-система
- **[docs/auth-system-guide.md](./docs/auth-system-guide.md)** - Аутентификация
- **[SUPABASE_REMOVAL_LOG.md](./SUPABASE_REMOVAL_LOG.md)** - История миграции

**📚 Полный список**: [INDEX.md](./INDEX.md)

---

## 🏗️ Архитектура

### Frontend-Only Stack

```
┌─────────────────────────────────────┐
│       React + TypeScript            │
├─────────────────────────────────────┤
│  GTSAuthContext (аутентификация)    │
├─────────────────────────────────────┤
│  Custom Hooks (бизнес-логика)       │
├─────────────────────────────────────┤
│  mockDataStore (CRUD операции)      │
├─────────────────────────────────────┤
│  localStorage (персистентность)     │
└─────────────────────────────────────┘
```

### Технологии

```yaml
Frontend:
  - React 18
  - TypeScript
  - Tailwind CSS v4
  - Vite

UI Components:
  - Shadcn/ui (38 компонентов)
  - Custom UI Kit (10+ компонентов)
  - Lucide Icons

Animations:
  - Motion/React
  - Custom scroll animations

State Management:
  - React Context API
  - localStorage
  - Mock Data Store
```

---

## 📦 Структура проекта

```
📦 GTS Platform
│
├── 📂 components/          # 270+ React компонентов
│   ├── admin/             # Админ панель (62 модуля)
│   ├── portal/            # Порталы (44 файла)
│   ├── modules/           # Системные модули (20 файлов)
│   ├── pages/             # Страницы (11 файлов)
│   ├── ui/                # Shadcn UI (38 компонентов)
│   └── ui-kit/            # Custom UI Kit
│
├── 🎯 contexts/           # React Contexts
│   └── GTSAuthContext.tsx # Аутентификация
│
├── 🪝 hooks/              # Custom hooks
│   └── useBookingSystem.ts # Бронирования
│
├── 🛠️ utils/              # Утилиты
│   └── mockData.ts        # Mock Data Store
│
├── 🎨 styles/             # Стили
│   └── design-tokens.css  # Дизайн-токены
│
├── ⚛️ src/                # FSD архитектура
│   ├── app/               # Приложение
│   ├── entities/          # Сущности
│   ├── features/          # Фичи
│   └── shared/            # Общие ресурсы
│
└── 📚 docs/               # Документация

📊 Статистика:
   • 440+ файлов
   • 270+ компонентов
   • ~120,000 строк кода
   • 50+ документов
```

**Подробнее**: [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md)

---

## 🎨 Дизайн-система

### Цветовая палитра

```css
/* Основные цвета */
Черный:  #000000
Белый:   #FFFFFF
Красный: #91040C

/* Фоны порталов */
Background: #0B0B0C
Surface:    #121214
Card:       #17181A
```

### Типографика

```css
Заголовки: Nokia.Kokia
Текст:     Gilroy
```

### Компоненты

- ✅ 38 Shadcn/ui компонентов
- ✅ 10+ кастомных компонентов
- ✅ Единая дизайн-система
- ✅ Адаптивный дизайн

**Подробнее**: [docs/design-system.md](./docs/design-system.md)

---

## 🚪 Порталы и модули

### 7 порталов для разных ролей

| Портал | Описание | Роль |
|--------|----------|------|
| 🏠 **Landing** | Главная страница | Публичная |
| 🔐 **Login** | Авторизация | Публичная |
| 👑 **Executive Panel** | Полное управление (19 модулей) | Executive |
| 💼 **Admin Dashboard** | Административная панель | Admin |
| 🤵 **Client Portal** | Портал клиентов клуба | Member |
| 🤝 **Partner Portal** | Портал партнеров | Partner |
| 🏢 **B2B Portal** | Корпоративный портал | B2B Client |

### 19 модулей Executive Panel

1. Dashboard (обзор)
2. Bookings (бронирования)
3. Dispatch (диспетчерская)
4. Routes & Schedules
5. Fleet & Maintenance
6. Inventory & Parts
7. Pricing & Offers
8. CRM & Loyalty
9. Sales Channels
10. Content/Media
11. Finance & Billing
12. HR & Scheduling
13. Compliance/Docs
14. Analytics
15. Settings & Integrations
16. Notifications & Support
17. AI Modules
18. Quality & Trends
19. Audit & Logs

---

## 💾 Mock-данные

### Функциональность без backend

Все функции работают полностью автономно:

```typescript
import { mockDataStore } from './utils/mockData';

// Получение данных
const clients = mockDataStore.select('clients');

// Создание
const newClient = mockDataStore.insert('clients', {
  name: 'Иван Иванов',
  email: 'ivan@example.com'
});

// Обновление
mockDataStore.update('clients', id, { status: 'vip' });

// Удаление
mockDataStore.delete('clients', id);
```

### Доступные таблицы

- `users` - пользователи
- `clients` - клиенты
- `deals` - сделки
- `bookings` - бронирования
- `fleet` - флот техники
- `partners` - партнеры
- `revenue` - выручка
- `activities` - активности

**Подробнее**: [FRONTEND_ONLY_ARCHITECTURE.md](./FRONTEND_ONLY_ARCHITECTURE.md)

---

## 🛠️ Команды разработки

### Development

```bash
npm run dev      # Запуск dev сервера (localhost:5173)
npm run build    # Production сборка → dist/
npm run preview  # Просмотр production сборки
```

### Code Quality

```bash
npm run lint     # ESLint проверка
npm run format   # Prettier форматирование (если настроен)
```

### Deployment

```bash
npm run build    # Создать production build
# Папка dist/ готова для deployment
```

**Совместимо с**:
- ✅ Vercel
- ✅ Netlify
- ✅ GitHub Pages
- ✅ AWS S3 + CloudFront
- ✅ Любой static hosting

---

## 📊 Статистика

```
📂 Папок:              ~80
📄 Файлов:             440+
💻 TypeScript:         ~420 файлов
📝 Документация:       ~50 файлов
🎨 CSS:                4 файла

📏 Строк кода:         ~120,000+
🎨 Компонентов:        270+
🪝 Хуков:              10+
🎯 Контекстов:         2
📦 Модулей:            90+
🚪 Порталов:           7
```

---

## ✅ Готовые функции

### ✨ Полностью работают

- [x] Аутентификация (7 ролей)
- [x] CRM (клиенты, лиды, сделки)
- [x] Бронирования (CRUD + календарь)
- [x] Финансы (транзакции, отчеты)
- [x] Партнеры (3 типа партнеров)
- [x] Флот (техника, ТО)
- [x] Аналитика (дашборды, графики)
- [x] Уведомления (push, toast)
- [x] Поиск и фильтрация
- [x] Экспорт данных
- [x] Адаптивный дизайн
- [x] Темная тема
- [x] Анимации (Motion/React)

---

## 🎯 Ключевые файлы

### Для разработчиков

```
Entry Points:
  /index.html
  /main.tsx
  /components/GTSRouter.tsx

Core:
  /contexts/GTSAuthContext.tsx      - Аутентификация
  /hooks/useBookingSystem.ts        - Бронирования
  /utils/mockData.ts                - Mock Data Store

UI:
  /components/ui-kit/GTSUIKit.tsx   - UI Kit
  /styles/design-tokens.css         - Токены
```

### Для дизайнеров

```
Design System:
  /styles/design-tokens.css         - Токены
  /styles/globals.css               - Глобальные стили
  /docs/design-system.md            - Документация

UI Kit:
  /components/ui-kit/               - Кастомные компоненты
  /components/ui/                   - Shadcn компоненты
```

---

## 📖 Полезные ссылки

### Внешние ресурсы
- [React Docs](https://react.dev)
- [TypeScript](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com)
- [Shadcn/ui](https://ui.shadcn.com)
- [Motion](https://motion.dev)

### Внутренняя документация
- [INDEX.md](./INDEX.md) - Главный индекс
- [GTS_PLATFORM_ANALYSIS.md](./GTS_PLATFORM_ANALYSIS.md) - Анализ
- [FRONTEND_ONLY_ARCHITECTURE.md](./FRONTEND_ONLY_ARCHITECTURE.md) - Архитектура

---

## 🤝 Контрибьюция

### Структура коммитов

```
feat: добавить новый компонент
fix: исправить ошибку в компоненте
docs: обновить документацию
style: изменить стили
refactor: рефакторинг кода
test: добавить тесты
```

### Рекомендации

1. Следуйте дизайн-системе
2. Используйте TypeScript
3. Документируйте компоненты
4. Тестируйте на всех ролях
5. Проверяйте адаптивность

**Подробнее**: [guidelines/Guidelines.md](./guidelines/Guidelines.md)

---

## 📋 Roadmap

### ✅ Готово (v1.0)
- [x] Frontend-only архитектура
- [x] 7 порталов
- [x] 90+ модулей
- [x] Mock Data Store
- [x] Система аутентификации
- [x] Адаптивный дизайн
- [x] Анимации

### 🔄 В планах (v2.0)
- [ ] Real-time updates (WebSocket эмуляция)
- [ ] Расширенная аналитика
- [ ] Больше AI модулей
- [ ] Mobile app версии
- [ ] API для интеграций

---

## 📝 Лицензия

См. [Attributions.md](./Attributions.md)

---

## 💬 Поддержка

### Есть вопросы?

1. **Прочитайте документацию**: [INDEX.md](./INDEX.md)
2. **Изучите примеры**: `/components/`
3. **Проверьте FAQ**: [docs/README.md](./docs/README.md)

---

## 🎉 Начните прямо сейчас!

```bash
# 1. Установите зависимости
npm install

# 2. Запустите проект
npm run dev

# 3. Откройте браузер
http://localhost:5173

# 4. Войдите как member
Email: member@gts.ru
Password: any
```

**Готово! Добро пожаловать в GTS Platform! 🚀**

---

**© 2024 Grand Tour Sochi Platform**  
**Version**: 1.0 | **Status**: Production Ready | **Architecture**: Frontend-Only

[![Made with React](https://img.shields.io/badge/Made%20with-React-61DAFB)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6)]()
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-38B2AC)]()
