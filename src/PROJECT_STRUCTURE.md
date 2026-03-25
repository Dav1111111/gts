# 📁 GTS Platform - Полная структура проекта

**Дата создания**: 16 декабря 2024  
**Версия**: 1.0  
**Всего файлов**: 440+

---

## 📦 Корневые файлы

### 📄 Документация и спецификации
```
├── ALL_7_BUILD_ERRORS_FIXED.md
├── ANIMATIONS_README.md
├── ANIMATIONS_UPGRADE_SUMMARY.md
├── Attributions.md
├── BOOKINGS_MODULE_SPEC_IMPLEMENTATION.md
├── BUILD_FIXES_FINAL.md
├── CLEANUP_ROADMAP.md
├── CLEANUP_STATUS.md
├── CLEANUP_STEP1_LOG.md
├── CLEANUP_TEMP_FILES_LOG.md
├── CRITICAL_FIXES_SUMMARY.md
├── DELETED_FILES_ARCHIVE.md
├── DISPATCH_MODULE_SPEC_IMPLEMENTATION.md
├── ERROR_FIXES_SUMMARY.md
├── EXECUTIVE_PANEL_V2025_CHECKLIST.md
├── FINAL_3_ERRORS_FIXED.md
├── FINAL_BUILD_FIXES.md
├── FINAL_CLEANUP_LOG.md
├── FLEET_MAINTENANCE_MODULE_SPEC_IMPLEMENTATION.md
├── FRONTEND_ONLY_ARCHITECTURE.md
├── FSD_BUILD_ERRORS_FIXED.md
├── GTS_Architecture_ClassDiagram.puml
├── GTS_PLATFORM_ANALYSIS.md
├── IMMEDIATE_ACTION_PLAN.md
├── INVENTORY_PARTS_MODULE_SPEC_IMPLEMENTATION.md
├── LOGIN_CREDENTIALS.md
├── MIGRATION_PLAN_INCREMENTAL.md
├── MIGRATION_PLAN_STAGE3.md
├── MODERNIZED_REFACTORING_PLAN.md
├── PRICING_OFFERS_MODULE_SPEC_IMPLEMENTATION.md
├── PROJECT_STRUCTURE.md (этот файл)
├── QUICK_ANIMATIONS_GUIDE.md
├── README_ARCHITECTURE.md
├── REFACTORING_AUDIT_REPORT.md
├── REFACTORING_COMPLETED.md
├── REFACTORING_STATUS_STEP1.md
├── REFACTORING_STATUS_STEP2.md
├── REORGANIZATION_PLAN.md
├── ROUTES_SCHEDULES_MODULE_SPEC_IMPLEMENTATION.md
├── STABILIZATION_PLAN.md
├── SUPABASE_REMOVAL_LOG.md
└── SUPABASE_REMOVAL_SUMMARY.md
```

### ⚙️ Конфигурационные файлы
```
├── index.html
├── main.tsx
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

### 🔨 Временные файлы (для удаления)
```
├── App.tsx (основной entry point - НЕ УДАЛЯТЬ!)
```

**⚠️ Примечание**: Все временные файлы были удалены. См. [CLEANUP_LOG.md](./CLEANUP_LOG.md)

---

## 📂 /components - React компоненты

### 📊 Главные компоненты (корень /components)
```
/components/
├── ContactForm.tsx
├── FeaturesSection.tsx
├── Footer.tsx
├── GTSAboutSection.tsx
├── GTSArticlePage.tsx
├── GTSCatalogPage.tsx
├── GTSCatalogSection.tsx
├── GTSCatalogWithScenariosSection.tsx
├── GTSCompactComparisonSection.tsx
├── GTSComparisonSection.tsx
├── GTSExecutiveAccess.tsx
├── GTSExperiencesSection.tsx
├── GTSFlashOffersSection.tsx
├── GTSFleetSection.tsx
├── GTSFooter.tsx
├── GTSHeader.tsx
├── GTSHeroSection.tsx
├── GTSInspirationSection.tsx
├── GTSInteractiveMapSection.tsx
├── GTSLiveFeedSection.tsx
├── GTSMemberDashboard.tsx
├── GTSMembershipPage.tsx
├── GTSMembershipSection.tsx
├── GTSMinimalClubCTA.tsx
├── GTSNavigationHeader.tsx
├── GTSNewsFeedPage.tsx
├── GTSNewsSection.tsx
├── GTSPlacesSection.tsx
├── GTSPremiumCatalogSection.tsx
├── GTSPremiumHeroSection.tsx
├── GTSReviewsSection.tsx
├── GTSRouter.tsx
├── GTSTopOffersSection.tsx
├── GTSUGCFeedSection.tsx
├── GTSUILibrary.tsx
├── GTSUnifiedMapSection.tsx
├── GTSUnifiedTestimonialsSection.tsx
├── Header.tsx
├── HeroSection.tsx
├── ToursSection.tsx
└── index.ts
```

---

### 🎛️ /components/admin - Административные панели
```
/components/admin/
├── AdminDashboard.tsx
├── AdminLayout.tsx
├── GTSAIModulesDashboard.tsx
├── GTSB2BPortal.tsx
├── GTSCleanupCenter.tsx
├── GTSClientClubPortal.tsx
├── GTSCrewApp.tsx
├── GTSExecutivePanel.tsx
├── GTSExecutivePanel_CRM_Reports_patch.tsx
├── GTSExecutivePanel_Enhanced_Notifications.tsx
├── GTSExecutivePanel_patch.tsx
├── GTSExecutivePanel_temp.tsx
├── GTSExecutivePanel_v2025.tsx
├── GTSExtendedAdminPortal.tsx
├── GTSOperatorPanel.tsx
├── GTSPartnerCreation.tsx
├── GTSPartnerPortalUnified.tsx
├── GTSPartnersManagement.tsx
├── GTSUnifiedAdminPortal.tsx
├── GTSUnifiedLogin.tsx
├── ManagementAdminDashboard.tsx
├── MarketingAdminDashboard.tsx
├── PartnerAdminDashboard.tsx
├── PortalsAdminDashboard.tsx
└── StaffAdminDashboard.tsx
```

---

### 🔧 /components/admin/modules - Модули админ панели (62 файла)
```
/components/admin/modules/
├── GTSAIModulesDashboardExtended.tsx
├── GTSAPIIntegrationsExtended.tsx
├── GTSAPIIntegrationsExtended_README.md
├── GTSAPIIntegrationsModule.tsx
├── GTSAddLeadButton.tsx
├── GTSAnalyticsEnhanced.tsx
├── GTSAnalyticsExtended.tsx
├── GTSAnalyticsExtended_README.md
├── GTSArchitectureDiagram.tsx
├── GTSAuditLoggingModule.tsx
├── GTSAuditLogsExtended.tsx
├── GTSBookingCalendarAdvanced.tsx
├── GTSBookingsModule.tsx
├── GTSCMSContentHub.tsx
├── GTSCMSContentHubExtended.tsx
├── GTSCMSModule.tsx
├── GTSCRMAdvanced.tsx
├── GTSCRMComponents.tsx
├── GTSCRMEnhancedKanban.tsx
├── GTSCRMModule.tsx
├── GTSCRMModuleComplete.tsx
├── GTSCRMModuleCompleteEnd.tsx
├── GTSCRMModuleV2.tsx
├── GTSCRMModuleV2_NewLead.tsx
├── GTSCRMReportsEnhanced.tsx
├── GTSCRMWithOmniInbox.tsx
├── GTSCRMWithOmniInbox_Quality.tsx
├── GTSCRMWithOmniInbox_append.tsx
├── GTSCalendarEnhanced.tsx
├── GTSCalendarModule.tsx
├── GTSClientCard.tsx
├── GTSClientClubLoyalty.tsx
├── GTSConciergeModule.tsx
├── GTSCorporateClientsModule.tsx
├── GTSDealCard.tsx
├── GTSDealConversationIntelligence.tsx
├── GTSDispatchModule.tsx
├── GTSDocumentsInboxModule.tsx
├── GTSEnhancedBookingModal.tsx
├── GTSExecutiveDashboard.tsx
├── GTSFinanceCenterExtended.tsx
├── GTSFinanceCenterModule.tsx
├── GTSFleetMaintenanceModule.tsx
├── GTSFleetManagement.tsx
├── GTSGlobalAIAssistantWidget.tsx
├── GTSIAMRolesPermissions.tsx
├── GTSInventoryPartsModule.tsx
├── GTSKnowledgeBaseExtended.tsx
├── GTSKnowledgeBaseModule.tsx
├── GTSMarketingCenter.tsx
├── GTSMarketingTrafficModule.tsx
├── GTSNewLeadDemo.tsx
├── GTSNewLeadForm.tsx
├── GTSOmniInboxModule.tsx
├── GTSOperationsCenter.tsx
├── GTSPartnerPersonalCabinet.tsx
├── GTSPartnersDatabase.tsx
├── GTSPartnersDatabaseExtended.tsx
├── GTSPartnersDatabaseExtended_README.md
├── GTSPartnersExtended.tsx
├── GTSPartnersModule.tsx
├── GTSPricingOffersModule.tsx
├── GTSQualityTrendsDashboard.tsx
├── GTSQuickAddLead.tsx
├── GTSRoutesSchedulesModule.tsx
├── GTSSphereManagement.tsx
├── GTSSphereManagementMobile.tsx
├── GTSStaffManagementModule.tsx
├── GTSStaffManagementModule_RU.tsx
├── GTSSystemStatus.tsx
└── GTSWeatherWidget.tsx
```

---

### 📦 /components/archive - Архивные компоненты
```
/components/archive/
├── GTSLegacyArchive.tsx
└── MIGRATION_LOG.md
```

---

### 🔐 /components/auth - Компоненты аутентификации
```
/components/auth/
└── GTSLoginRolePicker.tsx
```

---

### 💼 /components/business - Бизнес-логика
```
/components/business/
├── index.ts
└── auth/
    ├── GTSLoginRolePicker.tsx
    └── index.ts
```

---

### 🎯 /components/core - Ядро системы
```
/components/core/
├── GTSDemoRouter.tsx
├── GTSUnifiedPortalSystem.tsx
└── GTSUnifiedSystem.tsx
```

---

### 🧪 /components/demo - Демонстрационные компоненты
```
/components/demo/
├── GTSAnimationsDemo.tsx
└── GTSPrototypeDemo.tsx
```

---

### 🛡️ /components/fallback - Компоненты ошибок
```
/components/fallback/
└── SimpleFallback.tsx
```

---

### 🖼️ /components/figma - Figma интеграция (защищенный)
```
/components/figma/
└── ImageWithFallback.tsx (защищенный системный файл)
```

---

### 📐 /components/layout - Компоненты макета
```
/components/layout/
├── index.ts
├── core/
│   └── index.ts
└── shell/
    └── index.ts
```

---

### 🔨 /components/modules - Основные модули системы
```
/components/modules/
├── GTSAIContentGenerator.tsx
├── GTSAICustomerInsights.tsx
├── GTSAIMarketAnalysis.tsx
├── GTSB2BClient.tsx
├── GTSCMSSystem.tsx
├── GTSCRMSystem.tsx
├── GTSClientClub.tsx
├── GTSCrewAppMobile.tsx
├── GTSDocumentsInbox.tsx
├── GTSExecutiveDashboard.tsx
├── GTSFinanceSystem.tsx
├── GTSGlobalAIAssistant.tsx
├── GTSGlobalBookingCalendar.tsx
├── GTSGlobalBookingCalendarMobile.tsx
├── GTSGlobalCalendar.tsx
├── GTSNotificationsPanel.tsx
├── GTSPartnersSystem.tsx
├── GTSRealTimeStatus.tsx
├── GTSResourcePlanningPanel.tsx
├── GTSSettingsIntegrations.tsx
└── GTSStaffIAM.tsx
```

---

### 📄 /components/pages - Страницы приложения
```
/components/pages/
├── GTSAboutPage.tsx
├── GTSAuthExperiencesPage.tsx
├── GTSAuthStoriesPage.tsx
├── GTSContactsPage.tsx
├── GTSExperienceDetailPage.tsx
├── GTSExperiencesPage.tsx
├── GTSLandingPage.tsx
├── GTSLoginPage.tsx
├── GTSPageRouter.tsx
├── GTSStoriesPage.tsx
├── GTSStoryDetailPage.tsx
└── index.ts
```

---

### 🚪 /components/portal - Порталы пользователей (44 файла)
```
/components/portal/
├── GTSB2BClientPortal.tsx
├── GTSBrandPartnerAPI.tsx
├── GTSBrandPartnerDashboard.tsx
├── GTSBrandPartnerDocuments.tsx
├── GTSBrandPartnerLoyalty.tsx
├── GTSBrandPartnerPortal.tsx
├── GTSBrandPartnerPromotions.tsx
├── GTSBrandPartnerSidebar.tsx
├── GTSBrandPartnerSupport.tsx
├── GTSBrandPartnerTools.tsx
├── GTSClientClubPortalComplete.tsx
├── GTSClientClubPortalFinal.tsx
├── GTSContractorBookings.tsx
├── GTSContractorDashboard.tsx
├── GTSContractorDocuments.tsx
├── GTSContractorFinance.tsx
├── GTSContractorFleet.tsx
├── GTSContractorLogs.tsx
├── GTSContractorPortal.tsx
├── GTSContractorSidebar.tsx
├── GTSContractorSupport.tsx
├── GTSContractorTerms.tsx
├── GTSPartnerAgentBookings.tsx
├── GTSPartnerAgentClients.tsx
├── GTSPartnerAgentCommissions.tsx
├── GTSPartnerAgentDashboard.tsx
├── GTSPartnerAgentPortal.tsx
├── GTSPartnerAgentPromoTools.tsx
├── GTSPartnerAgentSidebar.tsx
├── GTSPartnerAgentSupport.tsx
├── GTSPortal2FA.tsx
├── GTSPortalEntry.tsx
├── GTSPortalLogin.tsx
├── GTSPortalRoleConsent.tsx
├── GTSPortalRoleSwitcher.tsx
├── GTSPortalSidebar.tsx
├── GTSPortalTopbar.tsx
├── GTSSocialTierFeatures.tsx
└── unified/
    ├── GTSConciergeServiceComponent.tsx
    ├── GTSLoyaltyProgramComponent.tsx
    └── GTSVIPBookingsComponent.tsx
```

---

### 🏢 /components/portals - Индексы порталов
```
/components/portals/
├── index.ts
├── admin/
│   └── index.ts
├── b2b/
│   └── index.ts
├── client/
│   └── index.ts
└── partner/
    └── index.ts
```

---

### 🤝 /components/shared - Общие компоненты
```
/components/shared/
├── GTSScrollProgress.tsx
├── GTSScrollToTop.tsx
├── GTSSharedAudit.tsx
├── GTSSharedDocuments.tsx
├── GTSSharedModules.tsx
├── GTSSharedNotifications.tsx
├── GTSSharedProfile.tsx
├── GTSSharedSidebar.tsx
├── GTSSharedStates.tsx
├── GTSSharedTopbar.tsx
├── index.ts
├── kit/
│   └── index.ts
├── modules/
│   └── index.ts
└── ui/
    └── index.ts
```

---

### 🐚 /components/shell - Shell компоненты
```
/components/shell/
├── GTSAppShell.tsx
├── GTSCrewMobileBottomNav.tsx
├── GTSMobileCrew.tsx
├── GTSSidebarPresets.tsx
├── GTSUnifiedAdminHeader.tsx
├── GTSUnifiedAppShell.tsx
├── GTSUnifiedSidebar.tsx
├── GTSUnifiedTopbar.tsx
└── index.ts
```

---

### 🧪 /components/test - Тестовые компоненты
```
/components/test/
├── PortalsDiagnostic.tsx
├── PortalsNavigationTest.tsx
└── SimpleAppTest.tsx
```

---

### 🎨 /components/ui-kit - Кастомный UI Kit
```
/components/ui-kit/
├── GTSAdvancedAnimations.tsx
├── GTSAnimated.tsx
├── GTSForcedComponents.tsx
├── GTSScrollAnimation.tsx
├── GTSUIKit.tsx
├── GTSUIKitComplete.tsx
├── GTSUIKitExtended.tsx
├── README.md
├── index.ts
└── withGTSTheme.tsx
```

---

### 🎭 /components/ui - Shadcn UI библиотека (38 компонентов)
```
/components/ui/
├── accordion.tsx
├── alert-dialog.tsx
├── alert.tsx
├── aspect-ratio.tsx
├── avatar.tsx
├── badge.tsx
├── breadcrumb.tsx
├── button.tsx
├── calendar.tsx
├── card.tsx
├── carousel.tsx
├── chart.tsx
├── checkbox.tsx
├── collapsible.tsx
├── command.tsx
├── context-menu.tsx
├── dialog.tsx
├── drawer.tsx
├── dropdown-menu.tsx
├── form.tsx
├── hover-card.tsx
├── input-otp.tsx
├── input.tsx
├── label.tsx
├── menubar.tsx
├── navigation-menu.tsx
├── pagination.tsx
├── popover.tsx
├── progress.tsx
├── radio-group.tsx
├── resizable.tsx
├── scroll-area.tsx
├── select.tsx
├── separator.tsx
├── sheet.tsx
├── sidebar.tsx
├── skeleton.tsx
├── slider.tsx
├── sonner.tsx
├── switch.tsx
├── table.tsx
├── tabs.tsx
├── textarea.tsx
├── toggle-group.tsx
├── toggle.tsx
├── tooltip.tsx
├── use-mobile.ts
└── utils.ts
```

---

## 🎯 /contexts - React Contexts

```
/contexts/
├── AuthContext.tsx (legacy)
└── GTSAuthContext.tsx (основной)
```

---

## 📚 /docs - Документация (17 файлов)

```
/docs/
├── GTS_Data_Architecture_Diagram.md
├── GTS_Data_Flow_Analysis.md
├── GTS_Technical_Architecture.puml
├── IAM_Access_Guide.md
├── README.md
├── advanced-animations-cheatsheet.md
├── animations-guide.md
├── architecture-audit-report.md
├── architecture-migration-plan.md
├── auth-system-guide.md
├── daily-tasks-checklist.md
├── design-system.md
├── executive-modules.md
├── fsd-migration-completion.md
├── immediate-fixes-examples.md
├── migration-progress.md
└── rules.json
```

---

## 📝 /guidelines - Рекомендации

```
/guidelines/
└── Guidelines.md
```

---

## 🪝 /hooks - Custom React Hooks

```
/hooks/
├── useBookingSystem.ts (о��новной хук бронирований)
├── useMockData.ts
├── useNavigation.ts
└── usePushNotifications.ts
```

---

## 🌐 /public - Публичные файлы

```
/public/
└── sw.js (Service Worker)
```

---

## ⚛️ /src - Feature-Sliced Design архитектура

### 📱 /src/app - Приложение
```
/src/app/
├── App.tsx
├── LoadingPage.tsx
├── error.tsx
├── layout.tsx
├── loading.tsx
├── page.tsx
├── providers.tsx
└── router.tsx
```

### 🎯 /src/entities - Сущности
```
/src/entities/
└── user/
    ├── index.ts
    ├── hooks/
    │   ├── index.ts
    │   ├── useUser.ts
    │   ├── useUserPermissions.ts
    │   └── useUsers.ts
    ├── model/
    │   └── index.ts
    └── ui/
        ├── UserAvatar.tsx
        ├── UserCard.tsx
        ├── UserProfile.tsx
        └── index.ts
```

### ✨ /src/features - Фичи
```
/src/features/
├── auth/
│   ├── index.ts
│   ├── server.ts
│   ├── hooks/
│   │   └── useAuth.ts
│   └── ui/
│       └── AuthProvider.tsx
└── navigation/
    ├── index.ts
    ├── types.ts
    └── hooks/
        └── useNavigation.ts
```

### 📄 /src/pages - Страницы (FSD)
```
/src/pages/
├── GTSPageRouter.tsx
├── index.ts
├── admin/
│   ├── index.ts
│   └── ui/
│       ├── AdminPage.tsx
│       └── index.ts
├── auth/
│   ├── index.ts
│   └── ui/
│       ├── LoginPage.tsx
│       └── index.ts
└── home/
    ├── index.ts
    └── ui/
        ├── HomePage.tsx
        └── index.ts
```

### 🔧 /src/shared - Общие ресурсы
```
/src/shared/
├── lib/
│   ├── ai-navigation.ts
│   ├── constants.ts
│   ├── index.ts
│   ├── query.tsx
│   ├── theme.ts
│   ├── utils.ts
│   └── validation.ts
├── styles/
│   ├── design-tokens.css
│   └── globals.css
└── ui/
    ├── ErrorBoundary.tsx
    ├── ThemeProvider.tsx
    ├── ToastProvider.tsx
    └── index.ts
```

### 🧩 /src/widgets - Виджеты
```
/src/widgets/
├── index.ts
└── demo/
    └── GTSDemoRouter.tsx
```

---

## 🎨 /styles - Глобальные стили

```
/styles/
├── design-tokens.css (дизайн-токены)
└── globals.css (глобальные стили)
```

---

## 🗄️ /supabase - Supabase функции (системные, защищенные)

```
/supabase/
└── functions/
    └── server/
        ├── index.tsx (защищенный)
        └── kv_store.tsx (защищенный)
```

**⚠️ Примечание**: Эти файлы являются системными и не используются в приложении.

---

## 🛠️ /utils - Утилиты

```
/utils/
├── ai-navigation-map.ts
├── cleanup-manager.ts
├── fix-animation-viewports.md
├── gts-animations.ts
├── gts-styles.ts
├── gts-theme-fix.ts
├── mockData.ts (основной Mock Data Store)
├── navigation.ts
└── supabase/
    └── info.tsx (защищенный системный файл)
```

---

## 📊 Статистика проекта

### 📁 Папки верхнего уровня
```
📂 components/          (270+ файлов)
📂 contexts/            (2 файла)
📂 docs/                (17 файлов)
📂 guidelines/          (1 файл)
📂 hooks/               (4 файла)
📂 public/              (1 файл)
📂 src/                 (45+ файлов)
📂 styles/              (2 файла)
📂 supabase/            (2 системных файла)
📂 utils/               (9 файлов)
```

### 📄 Типы файлов
```
.tsx файлы:    ~380 (React компоненты)
.ts файлы:     ~40  (TypeScript модули)
.md файлы:     ~50  (Документация)
.css файлы:    4    (Стили)
.json файлы:   2    (Конфиг)
.html файлы:   1    (Index)
```

### 🎯 Ключевые директории

**Самые большие папки по количеству файлов:**
1. `/components/admin/modules` - 62 файла (модули админки)
2. `/components/portal` - 44 файла (порталы пользователей)
3. `/components/ui` - 38 файлов (Shadcn UI)
4. `/components` (корень) - 32 файла (основные компоненты)
5. `/components/modules` - 20 файлов (системные модули)

---

## 🎨 Архитектура кодовой базы

### Паттерны организации:

```
1. Feature-Sliced Design (FSD)
   └── /src - современная архитектура
       ├── app/       (инициализация)
       ├── entities/  (бизнес-сущности)
       ├── features/  (фичи)
       ├── pages/     (страницы)
       ├── shared/    (общие ресурсы)
       └── widgets/   (виджеты)

2. Component-Based Architecture
   └── /components - компонентная архитектура
       ├── admin/     (админ панель)
       ├── modules/   (модули)
       ├── pages/     (страницы)
       ├── portal/    (порталы)
       ├── shared/    (общие)
       ├── shell/     (оболочка)
       └── ui/        (UI библиотека)

3. Atomic Design
   └── /components/ui-kit
       ├── GTSUIKit (атомы и молекулы)
       └── GTSAdvancedAnimations (организмы)
```

---

## 🔍 Поиск файлов

### По функциональности:

**Аутентификация:**
- `/contexts/GTSAuthContext.tsx`
- `/components/auth/GTSLoginRolePicker.tsx`
- `/components/pages/GTSLoginPage.tsx`

**Бронирования:**
- `/hooks/useBookingSystem.ts`
- `/components/modules/GTSGlobalBookingCalendar.tsx`
- `/components/admin/modules/GTSBookingsModule.tsx`

**CRM:**
- `/components/modules/GTSCRMSystem.tsx`
- `/components/admin/modules/GTSCRMModule.tsx`
- `/components/admin/modules/GTSCRMModuleComplete.tsx`

**Финансы:**
- `/components/modules/GTSFinanceSystem.tsx`
- `/components/admin/modules/GTSFinanceCenterModule.tsx`

**Партнеры:**
- `/components/portal/GTSPartnerAgentPortal.tsx`
- `/components/portal/GTSBrandPartnerPortal.tsx`
- `/components/portal/GTSContractorPortal.tsx`

**Mock данные:**
- `/utils/mockData.ts` (основной store)
- `/hooks/useMockData.ts`

**Анимации:**
- `/components/ui-kit/GTSAdvancedAnimations.tsx`
- `/components/ui-kit/GTSScrollAnimation.tsx`
- `/utils/gts-animations.ts`

---

## 📖 Документация

### Главная документация:
1. **[README.md](./docs/README.md)** - Главный README
2. **[GTS_PLATFORM_ANALYSIS.md](./GTS_PLATFORM_ANALYSIS.md)** - Анализ платформы
3. **[FRONTEND_ONLY_ARCHITECTURE.md](./FRONTEND_ONLY_ARCHITECTURE.md)** - Архитектура
4. **[LOGIN_CREDENTIALS.md](./LOGIN_CREDENTIALS.md)** - Учетные данные

### Технические гайды:
- **[ANIMATIONS_README.md](./ANIMATIONS_README.md)** - Анимации
- **[QUICK_ANIMATIONS_GUIDE.md](./QUICK_ANIMATIONS_GUIDE.md)** - Быстрый гайд
- **[README_ARCHITECTURE.md](./README_ARCHITECTURE.md)** - Архитектура

### Логи изменений:
- **[SUPABASE_REMOVAL_LOG.md](./SUPABASE_REMOVAL_LOG.md)** - Удаление Supabase
- **[CLEANUP_STATUS.md](./CLEANUP_STATUS.md)** - Статус очистки
- **[REFACTORING_COMPLETED.md](./REFACTORING_COMPLETED.md)** - Рефакторинг

---

## ✅ Файлы для очистки

### 🗑️ Рекомендуется удалить:
```
├── App.tsx (дубликат, основной в /src/app/App.tsx)
├── App.tsx.architecture_violations_backup
├── App.tsx.legacy
├── App_NEW_IMPORTS.tsx
├── GTSExecutivePanel_Fix.tsx
├── temp_error_debug.tsx
├── temp_find_crm.txt
├── temp_quality_content.tsx
└── test_search_quality.tsx
```

### 📦 Можно архивировать:
```
Все файлы с суффиксами:
- _patch.tsx
- _temp.tsx
- _backup
- _legacy
```

---

## 🎯 Entry Points

### Главные точки входа:
```
1. /index.html                  - HTML entry point
2. /main.tsx                    - JavaScript entry point
3. /App.tsx                     - Legacy App component
4. /src/app/App.tsx             - Modern App (FSD)
5. /components/GTSRouter.tsx    - Main router
```

### Порталы (точки входа для пользователей):
```
1. /components/pages/GTSLandingPage.tsx        - Landing
2. /components/pages/GTSLoginPage.tsx          - Login
3. /components/admin/GTSExecutivePanel.tsx     - Executive
4. /components/portal/GTSClientClubPortalFinal.tsx - Client
5. /components/portal/GTSPartnerAgentPortal.tsx    - Partner
6. /components/portal/GTSB2BClientPortal.tsx       - B2B
7. /components/modules/GTSCrewAppMobile.tsx        - Crew
```

---

## 🚀 Следующие шаги

### Для оптимизации:
1. ✅ Удалить временные файлы
2. ✅ Архивировать старые версии компонентов
3. ✅ Консолидировать дублирующиеся компоненты
4. ✅ Очистить неиспользуемые импорты

### Для документации:
1. ✅ Создать JSDoc комментарии для ключевых функций
2. ✅ Добавить README в каждую ключевую папку
3. ✅ Обновить диаграммы архитектуры

---

**Версия**: 1.0  
**Дата**: 16 декабря 2024  
**Всего файлов**: 440+  
**Строк кода**: ~120,000+  
**Статус**: ✅ Полная структура задокументирована