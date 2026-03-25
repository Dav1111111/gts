# 📚 GTS Platform Documentation

Добро пожаловать в документацию платформы **Grand Tour Sochi** - премиального клуба активного отдыха с полнофункциональной системой управления.

## 🎯 Навигация по документации

### 🏗️ **Архитектура и диаграммы**

| Документ                                                           | Описание                                      | Формат              |
| ------------------------------------------------------------------ | --------------------------------------------- | ------------------- |
| [📊 Data Architecture Diagram](./GTS_Data_Architecture_Diagram.md) | Полная диаграмма связанности данных в Mermaid | Markdown + Mermaid  |
| [🏗️ Technical Architecture](./GTS_Technical_Architecture.puml)     | Техническая архитектура в PlantUML            | PlantUML            |
| [🔄 Data Flow Analysis](./GTS_Data_Flow_Analysis.md)               | Анализ потоков данных и зависимостей          | Markdown + Diagrams |

### 📋 **Спецификации модулей**

| Модуль                    | Документ                                                                                              | Статус       |
| ------------------------- | ----------------------------------------------------------------------------------------------------- | ------------ |
| 🚁 **Dispatch**           | [DISPATCH_MODULE_SPEC_IMPLEMENTATION.md](../DISPATCH_MODULE_SPEC_IMPLEMENTATION.md)                   | ✅ 88% Ready |
| 📅 **Bookings**           | [BOOKINGS_MODULE_SPEC_IMPLEMENTATION.md](../BOOKINGS_MODULE_SPEC_IMPLEMENTATION.md)                   | ✅ 90% Ready |
| 🚗 **Fleet Maintenance**  | [FLEET_MAINTENANCE_MODULE_SPEC_IMPLEMENTATION.md](../FLEET_MAINTENANCE_MODULE_SPEC_IMPLEMENTATION.md) | ✅ 90% Ready |
| 📦 **Inventory & Parts**  | [INVENTORY_PARTS_MODULE_SPEC_IMPLEMENTATION.md](../INVENTORY_PARTS_MODULE_SPEC_IMPLEMENTATION.md)     | ✅ 92% Ready |
| 💵 **Pricing & Offers**   | [PRICING_OFFERS_MODULE_SPEC_IMPLEMENTATION.md](../PRICING_OFFERS_MODULE_SPEC_IMPLEMENTATION.md)       | ✅ 94% Ready |
| 🗺️ **Routes & Schedules** | [ROUTES_SCHEDULES_MODULE_SPEC_IMPLEMENTATION.md](../ROUTES_SCHEDULES_MODULE_SPEC_IMPLEMENTATION.md)   | ✅ 86% Ready |

### 🎨 **Дизайн-система**

| Компонент                  | Путь                                   | Описание                      |
| -------------------------- | -------------------------------------- | ----------------------------- |
| 🎨 **Design Tokens**       | `/styles/design-tokens.css`            | Центральные токены дизайна    |
| 🌐 **Global Styles**       | `/styles/globals.css`                  | Глобальные стили и темы       |
| 🎯 **UI Kit**              | `/components/ui-kit/GTSUIKit.tsx`      | Библиотека UI компонентов     |
| 📖 **Design System Guide** | [design-system.md](./design-system.md) | Руководство по дизайн-системе |

### 🔐 **Безопасность и доступ**

| Документ                                     | Описание                                               |
| -------------------------------------------- | ------------------------------------------------------ |
| [🔒 IAM Access Guide](./IAM_Access_Guide.md) | Руководство по управлению доступом                     |
| 👤 **Roles & Permissions**                   | `/components/admin/modules/GTSIAMRolesPermissions.tsx` |

### 🗂️ **Управление проектом**

| Документ                                                              | Назначение              | Статус   |
| --------------------------------------------------------------------- | ----------------------- | -------- |
| [🧹 Cleanup Roadmap](../CLEANUP_ROADMAP.md)                           | План очистки проекта    | ✅ Готов |
| [📊 Cleanup Status](../CLEANUP_STATUS.md)                             | Статус очистки          | ✅ Готов |
| [📦 Migration Plan](../MIGRATION_PLAN_STAGE3.md)                      | План миграции Stage 3   | ✅ Готов |
| [✅ Executive Panel Checklist](../EXECUTIVE_PANEL_V2025_CHECKLIST.md) | Чеклист Executive Panel | ✅ Готов |

### 🏗️ **Архитектурная миграция** (НОВОЕ)

| Документ                                                | Назначение                      | Статус         |
| ------------------------------------------------------- | ------------------------------- | -------------- |
| [📋 rules.json](./rules.json)                           | Стандарты и правила архитектуры | ✅ Готов       |
| [🔍 Architecture Audit](./architecture-audit-report.md) | Полный аудит соответствия       | ✅ Завершен    |
| [🚀 Migration Plan](./architecture-migration-plan.md)   | План миграции на 6-8 недель     | ✅ Готов       |
| [🔧 Immediate Fixes](./immediate-fixes-examples.md)     | Примеры исправлений             | ✅ Готов       |
| [📈 Migration Progress](./migration-progress.md)        | Прогресс выполнения             | 🔄 В процессе  |
| [✅ Daily Tasks](./daily-tasks-checklist.md)            | Ежедневные задачи               | 🔄 Обновляется |

## 🔄 Архитектурный обзор

### 🎯 **Основные компоненты**

```
┌─────────────────────────────────────────────────────────────┐
│                    🚀 App.tsx                               │
│                  Main Entry Point                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────────────┐
│                 🧭 GTSPageRouter                            │
│              Navigation & Routing                          │
└─────────────────────┬───────────────────────────────────────┘
                      │
          ┌───────────┼───────────┐
          │           │           │
┌─────────▼─┐  ┌─────▼─────┐  ┌─▼────────┐
│👑 Executive│  │🤝 Partner │  │💎 Client │
│   Portal   │  │  Portal   │  │ Portal   │
└─────────┬─┘  └─────┬─────┘  └─┬────────┘
          │          │          │
┌─────────▼──────────▼──────────▼─────────────────────┐
│              💼 Business Modules                     │
│  CRM • Finance • Booking • Fleet • Dispatch        │
└─────────────────────┬───────────────────────────────┘
                      │
┌─────────────────────▼───────────────────────────────┐
│               🤖 AI Intelligence Layer               │
│    AI Assistant • Insights • Content • Analysis    │
└─────────────────────────────────────────────────────┘
```

### 📊 **Статистика проекта**

| Метрика          | Значение                       |
| ---------------- | ------------------------------ |
| **Всего файлов** | 200+ компонентов               |
| **Строк кода**   | 50,000+ строк                  |
| **Модулей**      | 19 основных модулей            |
| **Порталов**     | 7 пользовательских порталов    |
| **AI модулей**   | 5 AI-компонентов               |
| **Готовность**   | 90%+ основной функциональности |

### 🎯 **Ключевые особенности**

- ✅ **Frontend-only архитектура** с мок-данными
- ✅ **Role-based доступ** через специализированные порталы
- ✅ **AI-enhanced функциональность** во всех модулях
- ✅ **Единая дизайн-система** GTS UI Kit
- ✅ **Responsive дизайн** для всех устройств
- ✅ **Модульная архитектура** для простого расширения

## 🚀 Быстрый старт

### 📱 **Доступные порталы**

1. **👑 Executive Portal** - полное управление платформой
   - Путь: `/executive-access`
   - Все 19 модулей управления

2. **🤝 Partner Portal** - управление партнерами
   - Путь: `/partner-portal`
   - Партнерская сеть и комиссии

3. **💎 Client Club Portal** - премиум клиенты
   - Путь: `/client-club-portal`
   - Лояльность и VIP сервисы

4. **🏢 B2B Client Portal** - корпоративные клиенты
   - Путь: `/b2b-client-portal`
   - Корпоративные контракты

5. **⚡ Crew Mobile App** - мобильные операции
   - Путь: `/crew-app`
   - Полевые операции

### 🔄 **Навигация по AI**

Используйте AI Navigation Helper для б��строго поиска компонентов:

```typescript
// Поиск компонентов
AINavigationHelper.findComponent("crm");
AINavigationHelper.findComponent("booking");
AINavigationHelper.findComponent("partner");

// Получение компонентов по категориям
AINavigationHelper.getComponentsByCategory("portal");
AINavigationHelper.getActiveComponents();
```

## 🎨 Дизайн-система

### 🌚 **Цветовая схема (Темная тема)**

```css
/* Основные цвета */
Background: #0B0B0C    /* Главный фон */
Surface:    #121214    /* Поверхности */
Cards:      #17181A    /* Карточки */
Borders:    #232428    /* Границы */
Text:       #FFFFFF    /* Основной текст */
Accent:     #91040C    /* Акцентный (красный) */
```

### 🎯 **Типографика**

```css
/* Шрифты */
Headings: Nokia.Kokia    /* Заголовки */
Body:     Gilroy         /* Основной текст */
```

### 📏 **Отступы (Padding)**

```css
/* Стандартные отступы */
Cards:         24px/28px
Tables:        16px
Toolbar:       16px
Containers:    20px/24px
```

## 🔮 Планы развития

### 📈 **Phase 1: Core Platform** (✅ Завершена)

- Основные порталы
- CRM и Finance системы
- Booking и Fleet управление
- AI интеграция

### 🏗️ **Phase 2: Architecture Migration** (🔄 В ПРОЦЕССЕ)

- **✅ Аудит завершен** - 8 критических нарушений выявлено в App.tsx
- **🔄 FSD миграция** - Feature-Sliced Design структура (0% → цель 100%)
- **🔄 Performance** - Bundle size 400KB → цель 200KB
- **📋 Security** - CSP headers, RBAC система (20% → цель 90%)
- **📋 A11y** - Keyboard nav, ARIA атрибуты (10% → цель 90%)

### 🚀 **Phase 3: Advanced Features** (📋 Планируется)

- Расширенная аналитика
- Продвинутые AI функции
- Мобильные приложения
- API интеграции

### 🌟 **Phase 4: Enterprise Scale** (📋 Планируется)

- Multi-tenant архитектура
- Advanced reporting
- External integrations
- Production optimization

### 📊 **Текущий прогресс миграции**

- **Общий прогресс**: 5% от плана (аудит и планирование завершены)
- **Архитектура**: 25% → 40% (нарушения выявлены и задокументированы)
- **Performance**: 30% → 35% (план оптимизации готов)
- **Security**: 20% → 25% (требования определены)
- **Следующий этап**: Создание FSD структуры и рефакторинг App.tsx

---

## 📞 Поддержка

Для вопросов по архитектуре и документации:

- 📧 **Technical Questions**: Используйте AI Navigation Helper
- 🐛 **Bug Reports**: Проверьте Cleanup Status
- 💡 **Feature Requests**: См. Migration Plan
- 📖 **Documentation**: Следуйте Design System Guide

---

## 📄 Лицензия

GTS Platform - Proprietary Software  
© 2025 Grand Tour Sochi. All rights reserved.