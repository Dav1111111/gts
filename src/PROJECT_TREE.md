# 🌳 GTS Platform - Дерево проекта

**Краткая визуализация структуры проекта**

```
📦 GTS Platform (Frontend-Only)
│
├── 📄 Корневые файлы конфигурации
│   ├── index.html
│   ├── main.tsx
│   ├── package.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
│
├── 📚 Документация (50+ MD файлов)
│   ├── GTS_PLATFORM_ANALYSIS.md
│   ├── FRONTEND_ONLY_ARCHITECTURE.md
│   ├── LOGIN_CREDENTIALS.md
│   ├── PROJECT_STRUCTURE.md
│   ├── PROJECT_TREE.md (этот файл)
│   ├── SUPABASE_REMOVAL_LOG.md
│   └── [другие документы...]
│
├── 📂 components/ (270+ компонентов)
│   │
│   ├── 🎨 Основные компоненты (32 файла)
│   │   ├── GTSRouter.tsx ⭐ (главный роутер)
│   │   ├── GTSHeroSection.tsx
│   │   ├── GTSCatalogPage.tsx
│   │   ├── GTSMembershipPage.tsx
│   │   └── [другие секции...]
│   │
│   ├── 🎛️ admin/ (Admin панель)
│   │   ├── GTSExecutivePanel.tsx ⭐
│   │   ├── GTSUnifiedAdminPortal.tsx
│   │   ├── GTSOperatorPanel.tsx
│   │   └── modules/ (62 модуля)
│   │       ├── GTSCRMModule.tsx
│   │       ├── GTSBookingsModule.tsx
│   │       ├── GTSFinanceCenterModule.tsx
│   │       ├── GTSFleetManagement.tsx
│   │       ├── GTSAnalyticsExtended.tsx
│   │       └── [58 других модулей...]
│   │
│   ├── 🚪 portal/ (44 портала)
│   │   ├── GTSClientClubPortalFinal.tsx ⭐
│   │   ├── GTSPartnerAgentPortal.tsx ⭐
│   │   ├── GTSB2BClientPortal.tsx ⭐
│   │   ├── GTSBrandPartnerPortal.tsx
│   │   ├── GTSContractorPortal.tsx
│   │   ├── GTSPortalLogin.tsx
│   │   └── unified/
│   │       ├── GTSConciergeServiceComponent.tsx
│   │       ├── GTSLoyaltyProgramComponent.tsx
│   │       └── GTSVIPBookingsComponent.tsx
│   │
│   ├── 📄 pages/ (11 страниц)
│   │   ├── GTSLandingPage.tsx ⭐
│   │   ├── GTSLoginPage.tsx ⭐
│   │   ├── GTSExperiencesPage.tsx
│   │   ├── GTSAboutPage.tsx
│   │   └── [другие страницы...]
│   │
│   ├── 🔧 modules/ (20 системных модулей)
│   │   ├── GTSGlobalBookingCalendar.tsx ⭐
│   │   ├── GTSCRMSystem.tsx ⭐
│   │   ├── GTSFinanceSystem.tsx ⭐
│   │   ├── GTSPartnersSystem.tsx
│   │   ├── GTSCrewAppMobile.tsx
│   │   ├── GTSGlobalAIAssistant.tsx
│   │   └── [другие модули...]
│   │
│   ├── 🐚 shell/ (8 shell компонентов)
│   │   ├── GTSUnifiedAppShell.tsx
│   │   ├── GTSUnifiedSidebar.tsx
│   │   ├── GTSUnifiedTopbar.tsx
│   │   └── GTSUnifiedAdminHeader.tsx
│   │
│   ├── 🎭 ui/ (38 Shadcn компонентов)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── table.tsx
│   │   ├── form.tsx
│   │   └── [33 других компонента...]
│   │
│   ├── 🎨 ui-kit/ (10 кастомных компонентов)
│   │   ├── GTSUIKit.tsx ⭐
│   │   ├── GTSAdvancedAnimations.tsx ⭐
│   │   ├── GTSScrollAnimation.tsx
│   │   └── [другие UI компоненты...]
│   │
│   ├── 🤝 shared/ (10 общих компонентов)
│   │   ├── GTSSharedSidebar.tsx
│   │   ├── GTSSharedTopbar.tsx
│   │   └── [другие shared компоненты...]
│   │
│   ├── 🔐 auth/ (2 компонента)
│   │   └── GTSLoginRolePicker.tsx
│   │
│   ├── 🎯 core/ (3 компонента)
│   │   ├── GTSUnifiedSystem.tsx
│   │   └── GTSUnifiedPortalSystem.tsx
│   │
│   ├── 🧪 demo/ (2 демо)
│   │   └── GTSPrototypeDemo.tsx
│   │
│   ├── 📦 archive/ (архив)
│   │   └── GTSLegacyArchive.tsx
│   │
│   └── 🧪 test/ (3 теста)
│       ├── PortalsDiagnostic.tsx
│       └── PortalsNavigationTest.tsx
│
├── 🎯 contexts/ (2 контекста)
│   ├── GTSAuthContext.tsx ⭐ (основной)
│   └── AuthContext.tsx (legacy)
│
├── 🪝 hooks/ (4 хука)
│   ├── useBookingSystem.ts ⭐ (основной)
│   ├── useMockData.ts
│   ├── useNavigation.ts
│   └── usePushNotifications.ts
│
├── 🛠️ utils/ (9 утилит)
│   ├── mockData.ts ⭐ (Mock Data Store)
│   ├── navigation.ts
│   ├── gts-animations.ts
│   ├── gts-styles.ts
│   └── [другие утилиты...]
│
├── 🎨 styles/ (2 файла)
│   ├── design-tokens.css ⭐
│   └── globals.css
│
├── 📚 docs/ (17 документов)
│   ├── README.md
│   ├── auth-system-guide.md
│   ├── animations-guide.md
│   ├── design-system.md
│   └── [другие доки...]
│
├── ⚛️ src/ (FSD архитектура - 45 файлов)
│   │
│   ├── 📱 app/ (8 файлов)
│   │   ├── App.tsx
│   │   ├── router.tsx
│   │   ├── providers.tsx
│   │   └── [другие...]
│   │
│   ├── 🎯 entities/ (user entity)
│   │   └── user/
│   │       ├── hooks/ (4 хука)
│   │       ├── model/
│   │       └── ui/ (3 компонента)
│   │
│   ├── ✨ features/
│   │   ├── auth/
│   │   │   ├── hooks/
│   │   │   └── ui/
│   │   └── navigation/
│   │       └── hooks/
│   │
│   ├── 📄 pages/
│   │   ├── admin/
│   │   ├── auth/
│   │   └── home/
│   │
│   ├── 🔧 shared/
│   │   ├── lib/ (7 утилит)
│   │   ├── styles/ (2 CSS)
│   │   └── ui/ (3 провайдера)
│   │
│   └── 🧩 widgets/
│       └── demo/
│
├── 🌐 public/
│   └── sw.js (Service Worker)
│
├── 📝 guidelines/
│   └── Guidelines.md
│
└── 🗄️ supabase/ (системные файлы, не используются)
    └── functions/server/
        ├── index.tsx
        └── kv_store.tsx

```

---

## 🎯 Ключевые файлы (⭐)

### Entry Points
```
1. /index.html              - HTML точка входа
2. /main.tsx                - JS точка входа
3. /components/GTSRouter.tsx - Главный роутер
```

### Core Systems
```
1. /contexts/GTSAuthContext.tsx            - Аутентификация
2. /hooks/useBookingSystem.ts              - Бронирования
3. /utils/mockData.ts                      - Mock Data Store
4. /components/ui-kit/GTSUIKit.tsx         - UI Kit
```

### Main Pages
```
1. /components/pages/GTSLandingPage.tsx    - Landing
2. /components/pages/GTSLoginPage.tsx      - Login
3. /components/admin/GTSExecutivePanel.tsx - Executive
```

### Portals
```
1. /components/portal/GTSClientClubPortalFinal.tsx - Client
2. /components/portal/GTSPartnerAgentPortal.tsx    - Partner
3. /components/portal/GTSB2BClientPortal.tsx       - B2B
```

### Core Modules
```
1. /components/modules/GTSGlobalBookingCalendar.tsx - Календарь
2. /components/modules/GTSCRMSystem.tsx             - CRM
3. /components/modules/GTSFinanceSystem.tsx         - Финансы
```

### Styles
```
1. /styles/design-tokens.css               - Дизайн токены
2. /styles/globals.css                     - Глобальные стили
```

---

## 📊 Статистика

```
📂 Всего папок:        ~80
📄 Всего файлов:       440+
💻 .tsx/.ts файлов:    ~420
📝 .md файлов:         ~50
🎨 .css файлов:        4
⚙️ Config файлов:      5

Строк кода:            ~120,000+
Компонентов:           270+
Хуков:                 10+
Контекстов:            2
Модулей:               90+
```

---

## 🗂️ Организация по типам

### По функциональности
```
🏠 Landing & Marketing:  ~30 компонентов
🔐 Authentication:       ~5 компонентов
🎛️ Admin & Executive:    ~80 компонентов
🚪 Portals:              ~45 компонентов
📊 Modules:              ~90 компонентов
🎨 UI Components:        ~50 компонентов
🧪 Tests & Demos:        ~5 компонентов
```

### По архитектуре
```
🏛️ Legacy Architecture:  /components (270+ файлов)
⚛️ FSD Architecture:      /src (45 файлов)
🎨 UI Library:            /components/ui (38 файлов)
🛠️ Utilities:             /utils (9 файлов)
📚 Documentation:         /docs + root (50+ файлов)
```

---

## 🔍 Быстрый поиск

### Нужно найти...

**Аутентификацию?**
→ `/contexts/GTSAuthContext.tsx`

**Бронирования?**
→ `/hooks/useBookingSystem.ts`
→ `/components/modules/GTSGlobalBookingCalendar.tsx`

**CRM?**
→ `/components/modules/GTSCRMSystem.tsx`
→ `/components/admin/modules/GTSCRMModule.tsx`

**Порталы?**
→ `/components/portal/` (44 файла)

**UI компоненты?**
→ `/components/ui/` (Shadcn)
→ `/components/ui-kit/` (Custom)

**Стили?**
→ `/styles/design-tokens.css`

**Документацию?**
→ `/docs/README.md`
→ `/FRONTEND_ONLY_ARCHITECTURE.md`

**Mock данные?**
→ `/utils/mockData.ts`

**Анимации?**
→ `/components/ui-kit/GTSAdvancedAnimations.tsx`

---

## 📖 Документация

**Главные документы:**
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) - Полная структура
- [GTS_PLATFORM_ANALYSIS.md](./GTS_PLATFORM_ANALYSIS.md) - Анализ
- [FRONTEND_ONLY_ARCHITECTURE.md](./FRONTEND_ONLY_ARCHITECTURE.md) - Архитектура
- [LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md) - Логины

---

**Версия**: 1.0  
**Дата**: 16 декабря 2024  
**Статус**: ✅ Полное дерево проекта
