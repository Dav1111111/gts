# GTS UI Kit - Унифицированная система дизайна

Единая система компонентов для всех модулей проекта Grand Tour Sochi.

## 🎨 Дизайн-система

### Цветовая схема
```css
/* Основные цвета */
--gts-portal-bg: #0B0B0C;        /* Основной фон */
--gts-portal-surface: #121214;   /* Поверхности */
--gts-portal-card: #17181A;      /* Карточки */
--gts-portal-text: #FFFFFF;      /* Основной текст */
--gts-portal-muted: #A6A7AA;     /* Второстепенный текст */
--gts-portal-border: #232428;    /* Границы */
--gts-portal-accent: #91040C;    /* Акценты */
```

### Отступы
- **Cards**: 24-28px padding
- **Table toolbar**: 16px padding  
- **Form elements**: 12px padding
- **Buttons**: 12px horizontal, 8px vertical

### Радиусы
- **Cards**: 16-20px (rounded-xl)
- **Inputs**: 12px (rounded-lg)
- **Buttons**: 8px (rounded-md)
- **Small elements**: 4px (rounded)

## 📊 Унифицированные компоненты

### GTSTableToolbar
Стандартный тулбар для таблиц с поиском, фильтрами и действиями.

```tsx
import { GTSTableToolbar } from './ui-kit';

<GTSTableToolbar
  searchPlaceholder="Поиск клиентов..."
  filterOptions={[
    { value: "all", label: "Все" },
    { value: "active", label: "Активные" }
  ]}
  onSearch={(value) => console.log(value)}
  onFilter={(value) => console.log(value)}
  onExport={() => console.log('Export')}
  onAdd={() => console.log('Add')}
/>
```

### GTSDataTable
Универсальная таблица с состояниями загрузки, ошибок и пустых данных.

```tsx
import { GTSDataTable } from './ui-kit';

const columns = [
  { key: 'name', label: 'Название' },
  { key: 'status', label: 'Статус', render: (value) => <Badge>{value}</Badge> },
  { key: 'date', label: 'Дата' }
];

<GTSDataTable
  columns={columns}
  data={data}
  loading={false}
  selectable={true}
  onRowSelect={(selectedRows) => console.log(selectedRows)}
  actions={(row) => (
    <div className="flex gap-1">
      <Button size="sm" variant="ghost">
        <Eye className="w-4 h-4" />
      </Button>
    </div>
  )}
/>
```

### GTSChart
Унифицированные графики с тёмной темой.

```tsx
import { GTSChart } from './ui-kit';

<GTSChart
  type="area"
  data={chartData}
  title="Динамика продаж"
  height={300}
/>
```

### GTSMobileCard
Мобильная карточка для замены таблиц на мобильных устройствах.

```tsx
import { GTSMobileCard } from './ui-kit';

<GTSMobileCard
  title="Александр Петров"
  subtitle="alex@example.com"
  avatar={<Avatar>AC</Avatar>}
  status={{ label: "Активен", variant: "success" }}
  metadata={[
    { label: "Дата", value: "15.11.2024" },
    { label: "Сумма", value: "₽ 125,000" }
  ]}
  actions={<Button size="sm">Действия</Button>}
  onClick={() => console.log('Card clicked')}
/>
```

### GTSBottomTabbar
Мобильная навигация для CrewApp и ClientClub.

```tsx
import { GTSBottomTabbar } from './ui-kit';

<GTSBottomTabbar
  tabs={[
    { 
      id: 'home', 
      label: 'Главная', 
      icon: <Home className="w-4 h-4" />, 
      active: true 
    },
    { 
      id: 'calendar', 
      label: 'Календарь', 
      icon: <Calendar className="w-4 h-4" />,
      badge: 3
    }
  ]}
  onTabChange={(tabId) => console.log(tabId)}
/>
```

### GTSStatsCard
Карточки статистики с иконками и трендами.

```tsx
import { GTSStatsCard } from './ui-kit';

<GTSStatsCard
  title="Общий доход"
  value="₽ 2,847,500"
  icon={<DollarSign className="w-8 h-8" />}
  trend={{ value: "+12%", direction: "up" }}
  color="accent"
/>
```

### GTSLoadingSpinner
Унифицированный индикатор загрузки.

```tsx
import { GTSLoadingSpinner } from './ui-kit';

<GTSLoadingSpinner size="md" />
```

### GTSEmptyState
Стандартное пустое состояние.

```tsx
import { GTSEmptyState } from './ui-kit';

<GTSEmptyState
  icon={<Database className="w-12 h-12" />}
  title="Нет данных"
  description="Данные отсутствуют или не найдены"
  action={{
    label: "Добавить данные",
    onClick: () => console.log('Add data')
  }}
/>
```

## 📱 Мобильная адаптация

### Принципы
1. **Таблицы** → **Stacked Rows** на мобильных устройствах
2. **Меню** → **Bottom Tabbar** для CrewApp/ClientClub
3. **Карточки** с анимациями и жестами
4. **Оптимизированные отступы** для мобильных экранов

### Брекпоинты
- **Mobile**: 390px (4 колонки)
- **Tablet**: 768px (8 колонок)  
- **Desktop**: 1440px (12 колонок)
- **Wide**: 1920px+ (16 колонок)

## 🔄 Состояния компонентов

### Loading
```tsx
<Skeleton className="h-4 w-full bg-[--gts-portal-card]" />
```

### Empty
```tsx
<div className="text-center py-8">
  <Database className="w-12 h-12 text-[--gts-portal-muted] mx-auto mb-3" />
  <p className="text-[--gts-portal-muted] text-sm">Нет данных</p>
</div>
```

### Error
```tsx
<div className="text-center py-8">
  <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
  <p className="text-red-400 text-sm">Ошибка загрузки</p>
</div>
```

## ✅ Правила использования

### Рекомендации
- ✅ Использовать единые компоненты из GTSUIKit
- ✅ Следовать установленным paddings
- ✅ Использовать CSS-переменные для цветов
- ✅ Применять mobile-first подход

### Избегать
- ❌ Хардкодированные стили и цвета
- ❌ Локальные кнопки/инпуты/таблицы
- ❌ Несогласованные отступы
- ❌ Смешение стилей из разных систем

## 🚀 Обновления

### v2.1.0 - Unified Complete
- ✅ Добавлены все унифицированные компоненты
- ✅ Мобильные адаптации для таблиц
- ✅ Bottom tabbar для мобильной навигации
- ✅ Тёмная тема для графиков
- ✅ Состояния loading/empty/error
- ✅ Стандартизированные отступы