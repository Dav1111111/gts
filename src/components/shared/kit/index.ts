// 🎨 GTS UI Kit - Дизайн-система компонентов
// Централизованный экспорт всех UI Kit компонентов

// Главные UI Kit компоненты
export { GTSUIKit } from "../../ui-kit/GTSUIKit";
export { GTSUIKitComplete } from "../../ui-kit/GTSUIKitComplete";
export * from "../../ui-kit/GTSUIKitExtended";

// Форсированные компоненты и хелперы
export * from "../../ui-kit/GTSForcedComponents";
export { withGTSTheme } from "../../ui-kit/withGTSTheme";

// Re-export index for backward compatibility
export * from "../../ui-kit";