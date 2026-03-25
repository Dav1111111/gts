# 📊 GTS Platform - Структурированное резюме проекта

## 🎯 Обзор проекта

**Grand Tour Sochi (GTS) Platform** - премиальная платформа клуба активного отдыха с арендой техники, включающая полную экосистему управления бизнесом от лендинга до enterprise-админки.

**Архитектура**: Frontend-only React платформа с 14 основными экранами, единой темной дизайн-системой и централизованным управлением.

---

## 📄 1. МАНИФЕСТ ДАННЫХ

### 🎨 Дизайн-система

- **Цвета**: Черный #000000, Белый #FFFFFF, Красный #91040C
- **Фоны**: Portal BG #0B0B0C, Surface #121214, Cards #17181A
- **Шрифты**: Nokia.Kokia (заголовки), Gilroy (текст)

### 🏗️ Основные сущности данных

#### 👤 **User (Пользователь)**

**Атрибуты:**

- `id` - уникальный идентификатор
- `name` - имя пользователя
- `email` - электронная почта
- `role` - роль в системе
- `avatar` - аватар пользователя
- `permissions[]` - права доступа
- `phone` - телефон
- `membership_status` - статус членства (bronze/silver/gold/platinum)
- `created_at` - дата регистрации

**Роли:**

- Executive (руководство)
- Crew (captain, pilot, guide, mechanic)
- Client (member-bronze/silver/gold/platinum, user)
- B2B Client (b2b-client, corporate-manager, company-admin)
- Partner (agent, contractor, brand-partner)
- Staff (dispatcher, operator)

#### 📅 **Booking (Бронирование)**

**Атрибуты:**

- `id` - номер заказа
- `client_id` - клиент
- `service_type` - тип услуги (авиация/водный/наземный транспорт)
- `equipment_id` - техника/транспорт
- `date_time` - дата и время
- `duration` - продолжительность
- `status` - статус (hold/confirmed/cancelled/completed)
- `price` - стоимость
- `prepayment` - предоплата
- `route_id` - маршрут
- `crew_assigned[]` - назначенный экипаж
- `utm_source` - источник
- `special_requests` - особые пожелания

#### 🚁 **Equipment (Техника)**

**Атрибуты:**

- `id` - идентификатор техники
- `type` - тип (helicopter/yacht/car/buggy/jetski)
- `model` - модель (R66 Turbine, Azimut 68, McLaren 720S)
- `capacity` - вместимость
- `status` - статус (available/busy/maintenance/broken)
- `location` - текущее местоположение
- `fuel_level` - уровень топлива
- `maintenance_date` - дата ТО
- `vin_serial` - VIN/серийный номер
- `insurance_valid_until` - страховка до

#### 👥 **Partner (Партнер)**

**Атрибуты:**

- `id` - ID партнера
- `type` - тип (agent/contractor/brand_partner)
- `company_name` - название компании
- `contact_person` - контактное лицо
- `commission_rate` - ставка комиссии
- `status` - статус партнерства
- `contracts[]` - договоры
- `api_access` - доступ к API
- `bookings_count` - количество заказов

#### 💰 **Financial Transaction (Финансовая операция)**

**Атрибуты:**

- `id` - ID транзакции
- `booking_id` - связанное бронирование
- `amount` - сумма
- `type` - тип (payment/refund/commission/payout)
- `status` - статус (pending/completed/failed)
- `payment_method` - метод оплаты
- `commission` - комиссия
- `created_at` - дата создания

#### 🎯 **Lead (Лид)**

**Атрибуты:**

- `id` - ID лида
- `name` - имя клиента
- `phone` - телефон
- `email` - email
- `source` - источник (website/avito/facebook/phone)
- `status` - статус (new/qualified/proposal/negotiation/closed)
- `interest_type` - интерес к услугам
- `budget` - бюджет
- `utm_data` - UTM метки
- `assigned_manager` - назначенный менеджер

#### 🗺️ **Route (Маршрут)**

**Атрибуты:**

- `id` - ID маршрута
- `name` - название маршрута
- `type` - тип (helicopter/yacht/car_tour)
- `duration` - длительность
- `checkpoints[]` - точки маршрута
- `weather_restrictions` - погодные ограничения
- `equipment_requirements` - требования к технике
- `price_base` - базовая цена
- `seasonal_multiplier` - сезонный коэффициент

#### 📈 **Analytics Event (Событие аналитики)**

**Атрибуты:**

- `id` - ID события
- `event_type` - тип события
- `user_id` - пользователь
- `timestamp` - время
- `data` - данные события
- `page_url` - URL страницы
- `session_id` - ID сессии

#### 🔧 **Settings (Настройки)**

**Атрибуты:**

- `module` - модуль системы
- `key` - ключ настройки
- `value` - значение
- `type` - тип данных
- `description` - описание
- `updated_by` - кто обновил

---

## 🗺️ 2. ДИАГРАММА ИНФОРМАЦИОННОЙ АРХИТЕКТУРЫ

### 📱 Основные экраны/страницы

#### 🏠 **Landing & Marketing**

1. **Landing Page** - главная страница сайта
2. **Catalog Page** - каталог услуг
3. **Membership Page** - членство в клубе
4. **Article Page** - статьи и новости

#### 🔐 **Authentication**

5. **Login Page** - авторизация с выбором роли
6. **Role Picker** - выбор роли пользователя

#### 🎯 **Executive Management**

7. **Executive Dashboard** - главная панель руководства
8. **Executive Panel** - полный модуль управления (19 подмодулей)

#### 📊 **Core Modules**

9. **CRM System** - управление клиентами и лидами
10. **Finance System** - финансовое управление
11. **Booking Calendar** - календарь бронирований
12. **Fleet Management** - управление техникой (в составе Executive Panel)

#### 🚪 **Портальные интерфейсы**

13. **Client Club Portal** - портал клиентов клуба
14. **Partner Portal** - портал партнеров (агенты, подрядчики, бренд-партнеры)
15. **B2B Client Portal** - портал корпоративных клиентов
16. **Crew Mobile App** - мобильное приложение экипажа

#### ⚙️ **System & Tools**

17. **IAM System** - управление доступом
18. **AI Modules Dashboard** - ИИ модули
19. **Demo Center** - демонстрационный центр
20. **UI Kit** - библиотека компонентов

### 🔄 Переходы между экранами

```
Landing → Login → Role Selection → Destination Portal
    ↓         ↓          ↓              ↓
Catalog   Role Picker  Executive → Executive Panel
    ↓         ↓         Client → Client Portal
Articles  2FA Auth     Partner → Partner Portal
                      B2B → B2B Portal
                      Crew → Mobile App
```

### 🎛️ Executive Panel (19 модулей)

1. **Dashboard** - обзорная панель
2. **Bookings** - управление заказами
3. **Dispatch** - диспетчерская
4. **Routes & Schedules** - маршруты
5. **Fleet & Maintenance** - флот и ТО
6. **Inventory & Parts** - склад запчастей
7. **Pricing & Offers** - ценообразование
8. **CRM & Loyalty** - CRM и лояльность
9. **Sales Channels** - каналы продаж
10. **Content/Media** - контент
11. **Finance & Billing** - финансы
12. **HR & Scheduling** - персонал
13. **Compliance/Docs** - документооборот
14. **Analytics** - аналитика
15. **Settings & Integrations** - настройки
16. **Notifications & Support** - уведомления
17. **AI Modules** - ИИ модули
18. **Quality & Trends** - качество
19. **Audit & Logs** - аудит

---

## 📋 3. МАТРИЦА СТРАНИЦА–СУЩНОСТЬ

| Страница                | User | Booking | Equipment | Partner | Financial | Lead | Route | Analytics | Settings |
| ----------------------- | ---- | ------- | --------- | ------- | --------- | ---- | ----- | --------- | -------- |
| **Landing Page**        | ➖   | ➖      | ✅        | ➖      | ➖        | ✅   | ✅    | ✅        | ➖       |
| **Login Page**          | ✅   | ➖      | ➖        | ➖      | ➖        | ➖   | ➖    | ✅        | ✅       |
| **Executive Dashboard** | ✅   | ✅      | ✅        | ✅      | ✅        | ✅   | ✅    | ✅        | ✅       |
| **Executive Panel**     | ✅   | ✅      | ✅        | ✅      | ✅        | ✅   | ✅    | ✅        | ✅       |
| **CRM System**          | ✅   | ✅      | ➖        | ✅      | ✅        | ✅   | ➖    | ✅        | ➖       |
| **Finance System**      | ✅   | ✅      | ➖        | ✅      | ✅        | ➖   | ➖    | ✅        | ➖       |
| **Booking Calendar**    | ✅   | ✅      | ✅        | ➖      | ✅        | ➖   | ✅    | ✅        | ➖       |
| **Client Club Portal**  | ✅   | ✅      | ✅        | ➖      | ✅        | ➖   | ✅    | ✅        | ✅       |
| **Partner Portal**      | ✅   | ✅      | ➖        | ✅      | ✅        | ➖   | ➖    | ✅        | ➖       |
| **B2B Client Portal**   | ✅   | ✅      | ✅        | ➖      | ✅        | ➖   | ✅    | ✅        | ➖       |
| **Crew Mobile App**     | ✅   | ✅      | ✅        | ➖      | ➖        | ➖   | ✅    | ➖        | ➖       |
| **IAM System**          | ✅   | ➖      | ➖        | ✅      | ➖        | ➖   | ➖    | ✅        | ✅       |

**Легенда:**

- ✅ = Основная сущность (CRUD операции)
- ➖ = Не используется или только чтение

---

## 🔍 4. КЛЮЧЕВЫЕ ПАТТЕРНЫ И ОСОБЕННОСТИ

### 🎨 **Дизайн-система**

- **Унифицированная тема**: Темная для порталов, светлая для лендинга
- **Централизованные токены**: `/styles/design-tokens.css`
- **Responsive**: Адаптивность под mobile/desktop
- **Component Library**: Shadcn/ui + GTSUIKit

### 🏗️ **Архитектурные решения**

- **Frontend-only архитектура**: Полностью клиентская реализация с mock-данными для демонстрации функциональности
- **Role-based routing**: Маршрутизация на основе ролей
- **Модульная структура**: 90+ компонентов в логических категориях
- **Централизованные экспорты**: index.ts файлы

### 🚀 **Техническая база**

- **React + TypeScript**: Основной стек
- **Tailwind V4**: Стилизация
- **Vite**: Сборка проекта
- **Lucide Icons**: Иконки
- **Motion/React**: Анимации

### 📊 **Бизнес-логика**

- **Multi-tenant**: Поддержка разных типов пользователей
- **Enterprise-ready**: Готовность к промышленной эксплуатации
- **AI-enhanced**: ИИ модули для улучшения UX
- **Analytics-first**: Встроенная аналитика для всех действий

---

## 🎯 5. ROADMAP И РАЗВИТИЕ

### ✅ **Готово (Ready)**

- Executive Dashboard & Panel
- CRM System
- Finance System
- Client Club Portal
- Partner Portal
- B2B Client Portal
- Booking System
- IAM System
- Crew Mobile App

### 🔄 **В разработке (Beta)**

- AI Assistant
- AI Content Generator
- Advanced Analytics

### 📋 **Планируется**

- Real-time tracking
- Mobile apps для клиентов
- API для партнеров
- Advanced AI insights

---

**Резюме**: GTS Platform представляет собой комплексную enterprise-систему управления клубом активного отдыха с современной архитектурой, ролевой моделью доступа и готовностью к масштабированию.