// 🎯 GTS Components - Главный экспорт всех компонентов
// Централизованный доступ к организованной структуре компонентов

// Business Components - Бизнес-функции
export * from './business';

// Layout Components - Layout и navigation  
export * from './layout';

// Portal Components - Пользовательские порталы
export * from './portals';

// Shared Components - Общие компоненты
export * from './shared';

// Pages - Страницы приложения
export * from './pages';

// Backward compatibility exports (временные до завершения миграции)
export { GTSPageRouter } from './pages/GTSPageRouter';
export { GTSDemoRouter } from './core/GTSDemoRouter';
export { GTSLoginRolePicker } from './auth/GTSLoginRolePicker';

// Most used components for easy import
export { GTSExecutivePanel } from './admin/GTSExecutivePanel';
export { GTSUnifiedAppShell } from './shell/GTSUnifiedAppShell';
export { GTSUIKit } from './ui-kit/GTSUIKit';