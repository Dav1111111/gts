// Navigation types and utilities for GTS system

export type PageType = 
  | "home" 
  | "login" 
  | "dashboard" 
  | "calendar" 
  | "crm" 
  | "finance" 
  | "crew-mobile" 
  | "client-club"
  | "ui-kit"
  | "demo"
  | "sphere-management"
  | "iam"
  | "ai-modules"
  | "executive-panel"
  | "executive-access"
  | "partner-portal"
  | "client-club-portal"
  | "b2b-client-portal"
  | "crew-app"
  | "demo-center"
  | "new-lead-demo";

export interface NavigationContext {
  sourceModule?: string;
  targetData?: any;
  action?: string;
  userRole?: UserRole;
}

export type UserRole = string;

// Role categories for routing logic
export const CREW_ROLES = ['captain', 'pilot', 'guide', 'mechanic'];
export const CLIENT_ROLES = ['member-bronze', 'member-silver', 'member-gold', 'member-platinum', 'user'];
export const B2B_CLIENT_ROLES = ['b2b-client', 'corporate-manager', 'company-admin'];

export function getDefaultPageForRole(role: UserRole): PageType {
  if (CREW_ROLES.includes(role)) {
    return "crew-mobile";
  } else if (CLIENT_ROLES.includes(role)) {
    return "client-club";
  } else if (B2B_CLIENT_ROLES.includes(role)) {
    return "b2b-client-portal";
  } else if (['dispatcher', 'operator'].includes(role)) {
    return "calendar";
  } else if (role === 'executive') {
    return "executive-access";
  } else {
    return "dashboard";
  }
}