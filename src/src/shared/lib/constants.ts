// 📋 Shared Constants
// ✅ Централизованные константы согласно rules.json

// ✅ User roles and permissions
export const USER_ROLES = {
  EXECUTIVE: 'executive',
  PARTNER: 'partner', 
  CLIENT: 'client',
  CREW: 'crew',
  CONTRACTOR: 'contractor'
} as const

export type UserRole = 'executive' | 'partner' | 'client' | 'crew' | 'contractor'

// ✅ Service types
export const SERVICE_TYPES = {
  HELICOPTER: 'helicopter',
  YACHT: 'yacht', 
  CAR: 'car',
  TOUR: 'tour'
} as const

export type ServiceType = typeof SERVICE_TYPES[keyof typeof SERVICE_TYPES]

// ✅ Booking statuses
export const BOOKING_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed', 
  IN_PROGRESS: 'in_progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
} as const

export type BookingStatus = typeof BOOKING_STATUSES[keyof typeof BOOKING_STATUSES]

// ✅ Lead statuses  
export const LEAD_STATUSES = {
  NEW: 'new',
  CONTACTED: 'contacted',
  QUALIFIED: 'qualified', 
  PROPOSAL: 'proposal',
  WON: 'won',
  LOST: 'lost'
} as const

export type LeadStatus = typeof LEAD_STATUSES[keyof typeof LEAD_STATUSES]

// ✅ Navigation routes
export const ROUTES = {
  HOME: '/',
  EXECUTIVE: '/executive',
  PARTNER: '/partner',
  CLIENT: '/client', 
  CREW: '/crew',
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    FORGOT_PASSWORD: '/auth/forgot-password'
  }
} as const

// ✅ API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/auth/login',
    LOGOUT: '/api/auth/logout',
    REFRESH: '/api/auth/refresh'
  },
  USERS: '/api/users',
  BOOKINGS: '/api/bookings',
  LEADS: '/api/leads'
} as const

// ✅ Permissions
export const PERMISSIONS = {
  // CRM
  CRM_READ: 'crm:read',
  CRM_WRITE: 'crm:write',
  CRM_DELETE: 'crm:delete',
  
  // Finance
  FINANCE_READ: 'finance:read',
  FINANCE_WRITE: 'finance:write',
  
  // Bookings
  BOOKING_READ: 'booking:read', 
  BOOKING_WRITE: 'booking:write',
  BOOKING_CANCEL: 'booking:cancel',
  
  // Fleet
  FLEET_READ: 'fleet:read',
  FLEET_MANAGE: 'fleet:manage',
  
  // Users
  USER_READ: 'user:read',
  USER_MANAGE: 'user:manage'
} as const

export type Permission = typeof PERMISSIONS[keyof typeof PERMISSIONS]

// ✅ Role permissions mapping
export const ROLE_PERMISSIONS: Record<UserRole, Permission[]> = {
  executive: [
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE, 
    PERMISSIONS.CRM_DELETE,
    PERMISSIONS.FINANCE_READ,
    PERMISSIONS.FINANCE_WRITE,
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.BOOKING_WRITE,
    PERMISSIONS.BOOKING_CANCEL,
    PERMISSIONS.FLEET_READ,
    PERMISSIONS.FLEET_MANAGE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_MANAGE
  ],
  partner: [
    PERMISSIONS.CRM_READ,
    PERMISSIONS.CRM_WRITE,
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.BOOKING_WRITE,
    PERMISSIONS.USER_READ
  ],
  client: [
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.USER_READ
  ],
  crew: [
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.FLEET_READ,
    PERMISSIONS.USER_READ
  ],
  contractor: [
    PERMISSIONS.BOOKING_READ,
    PERMISSIONS.FLEET_READ,
    PERMISSIONS.USER_READ
  ]
}