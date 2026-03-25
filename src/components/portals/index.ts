// 🚪 GTS Portal Components - Пользовательские порталы 
// Централизованный экспорт всех portal компонентов

// Admin Portals
export * from './admin';

// Client Portals
export * from './client';

// Partner Portals  
export * from './partner';

// B2B Portals
export * from './b2b';

// Portal Unified Components (могут использоваться во всех порталах)
export { GTSPortalEntry } from '../portal/GTSPortalEntry';
export { GTSPortalLogin } from '../portal/GTSPortalLogin';
export { GTSPortal2FA } from '../portal/GTSPortal2FA';
export { GTSPortalRoleConsent } from '../portal/GTSPortalRoleConsent';
export { GTSPortalRoleSwitcher } from '../portal/GTSPortalRoleSwitcher';
export { GTSPortalSidebar } from '../portal/GTSPortalSidebar';
export { GTSPortalTopbar } from '../portal/GTSPortalTopbar';