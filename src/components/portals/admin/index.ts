// 🛡️ GTS Admin Portal Components - Админ панели и управление
// Централизованный экспорт всех admin компонентов

// Главные панели управления
export { GTSExecutivePanel } from "../../admin/GTSExecutivePanel";
export { GTSUnifiedAdminPortal } from "../../admin/GTSUnifiedAdminPortal";
export { GTSExtendedAdminPortal } from "../../admin/GTSExtendedAdminPortal";
export { AdminDashboard } from "../../admin/AdminDashboard";
export { AdminLayout } from "../../admin/AdminLayout";

// Специализированные дашборды
export { ManagementAdminDashboard } from "../../admin/ManagementAdminDashboard";
export { MarketingAdminDashboard } from "../../admin/MarketingAdminDashboard";
export { PartnerAdminDashboard } from "../../admin/PartnerAdminDashboard";
export { PortalsAdminDashboard } from "../../admin/PortalsAdminDashboard";
export { StaffAdminDashboard } from "../../admin/StaffAdminDashboard";

// Операционные панели
export { GTSOperatorPanel } from "../../admin/GTSOperatorPanel";
export { GTSCrewApp } from "../../admin/GTSCrewApp";

// AI и модули управления
export { GTSAIModulesDashboard } from "../../admin/GTSAIModulesDashboard";
export { GTSCleanupCenter } from "../../admin/GTSCleanupCenter";

// Партнерское управление
export { GTSPartnerCreation } from "../../admin/GTSPartnerCreation";
export { GTSPartnersManagement } from "../../admin/GTSPartnersManagement";
export { GTSPartnerPortalUnified } from "../../admin/GTSPartnerPortalUnified";

// B2B управление (временно в admin, потом перенести в /portals/b2b)
export { GTSB2BPortal } from "../../admin/GTSB2BPortal";

// Клиентское управление (временно в admin, потом перенести в /portals/client)  
export { GTSClientClubPortal } from "../../admin/GTSClientClubPortal";

// Авторизация и доступы
export { GTSUnifiedLogin } from "../../admin/GTSUnifiedLogin";

// Временные/патч файлы (исключены из экспорта до очистки)
// GTSExecutivePanel_patch.tsx
// GTSExecutivePanel_temp.tsx
// GTSExecutivePanel_CRM_Reports_patch.tsx
// GTSExecutivePanel_Enhanced_Notifications.tsx
// GTSExecutivePanel_v2025.tsx