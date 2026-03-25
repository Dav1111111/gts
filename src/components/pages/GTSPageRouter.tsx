// GTS Page Router - Handles all page routing logic

import { GTSUIKit } from "../ui-kit/GTSUIKit";
import { GTSLoginRolePicker } from "../auth/GTSLoginRolePicker";
import { GTSExecutiveDashboard } from "../modules/GTSExecutiveDashboard";
import { GTSGlobalBookingCalendar } from "../modules/GTSGlobalBookingCalendar";
import { GTSGlobalBookingCalendarMobile } from "../modules/GTSGlobalBookingCalendarMobile";
import { GTSCRMSystem } from "../modules/GTSCRMSystem";
import { GTSFinanceSystem } from "../modules/GTSFinanceSystem";
import { GTSCrewAppMobile } from "../modules/GTSCrewAppMobile";
import { GTSClientClub } from "../modules/GTSClientClub";
import { GTSPrototypeDemo } from "../demo/GTSPrototypeDemo";
import { GTSLandingPage } from "./GTSLandingPage";
import { GTSSphereManagement } from "../admin/modules/GTSSphereManagement";
import { GTSIAMRolesPermissions } from "../admin/modules/GTSIAMRolesPermissions";
import { GTSAIModulesDashboard } from "../admin/GTSAIModulesDashboard";
import { GTSExecutivePanel } from "../admin/GTSExecutivePanel";
import { GTSB2BClientPortal } from "../portal/GTSB2BClientPortal";
import { GTSNewLeadDemo } from "../admin/modules/GTSNewLeadDemo";
import { GTSPartnerPortalUnified } from "../admin/GTSPartnerPortalUnified";
import { GTSClientClubPortal } from "../admin/GTSClientClubPortal";
import { GTSCrewApp } from "../admin/GTSCrewApp";

import { PageType, NavigationContext } from "../../utils/navigation";

interface GTSPageRouterProps {
  currentPage: PageType;
  navigationContext: NavigationContext;
  onRoleSelected: (role: string) => void;
  onBackToHome: () => void;
  onLogin: () => void;
  onNavigateToUIKit: () => void;
  onNavigateToDemo: () => void;
  navigateToModule: (targetModule: string, context?: NavigationContext) => void;
  onNavigateToB2BPortal?: () => void;
  onNavigateToNewLeadDemo?: () => void;
  onNavigateToDemoById?: (demoId: string) => void;
}

export function GTSPageRouter({
  currentPage,
  navigationContext,
  onRoleSelected,
  onBackToHome,
  onLogin,
  onNavigateToUIKit,
  onNavigateToDemo,
  navigateToModule,
  onNavigateToB2BPortal,
  onNavigateToNewLeadDemo,
  onNavigateToDemoById
}: GTSPageRouterProps) {
  
  // Login - Role-based routing
  if (currentPage === "login") {
    return (
      <GTSLoginRolePicker 
        onBackToHome={onBackToHome}
        onRoleSelected={onRoleSelected}
      />
    );
  }

  // Dashboard - All-in-one management interface
  if (currentPage === "dashboard") {
    return <GTSExecutiveDashboard 
      onBackToHome={onBackToHome} 
      onNavigateToModule={(module) => navigateToModule(module)}
    />;
  }

  // Calendar - Unified booking and event management
  if (currentPage === "calendar") {
    // Check if mobile (simplified logic for demo) - with safety check
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    
    if (isMobile) {
      return (
        <GTSGlobalBookingCalendarMobile 
          userRole={navigationContext.userRole as any || 'executive'}
          onBack={onBackToHome}
        />
      );
    }
    
    return (
      <GTSGlobalBookingCalendar 
        userRole={navigationContext.userRole as any || 'executive'}
        onLogin={onLogin}
        onBack={onBackToHome}
      />
    );
  }

  // CRM - Customer and lead management (includes partners, staff, docs)
  if (currentPage === "crm") {
    return (
      <GTSCRMSystem 
        onBackToHome={onBackToHome}
        onCreateBooking={(dealData) => navigateToModule("calendar", {
          targetData: { dealData, prefilledData: dealData },
          action: "createBookingFromDeal"
        })}
        navigationContext={navigationContext}
      />
    );
  }

  // Finance - Financial management (includes payouts, reports)
  if (currentPage === "finance") {
    return (
      <GTSFinanceSystem 
        onBackToHome={onBackToHome}
        navigationContext={navigationContext}
      />
    );
  }

  // Crew Mobile - Mobile-only interface for field staff
  if (currentPage === "crew-mobile") {
    return <GTSCrewAppMobile onBackToHome={onBackToHome} />;
  }

  // Client Club - Member portal and B2B clients
  if (currentPage === "client-club") {
    return <GTSClientClub onBackToHome={onBackToHome} />;
  }

  // UI Kit - Design system (dev only)
  if (currentPage === "ui-kit") {
    return <GTSUIKit onBackToHome={onBackToHome} />;
  }

  // Demo - Prototype demonstration
  if (currentPage === "demo") {
    return <GTSPrototypeDemo onBackToHome={onBackToHome} />;
  }

  // SphereM - Resource Management System
  if (currentPage === "sphere-management") {
    return (
      <GTSSphereManagement 
        userRole={navigationContext.userRole as any || 'executive'}
        onLogin={onLogin}
        onBack={onBackToHome}
      />
    );
  }

  // IAM - Identity and Access Management
  if (currentPage === "iam") {
    return (
      <GTSIAMRolesPermissions 
        userRole={navigationContext.userRole as any || 'Executive'}
        onBack={onBackToHome}
      />
    );
  }

  // AI Modules - Artificial Intelligence Dashboard
  if (currentPage === "ai-modules") {
    return (
      <GTSAIModulesDashboard 
        userRole={navigationContext.userRole as any || 'executive'}
      />
    );
  }

  // Executive Panel - Advanced Executive Management Interface
  if (currentPage === "executive-panel") {
    const mockUser = {
      id: 'exec-001',
      name: 'Анна Иванова',
      email: 'anna.ivanova@gts.com',
      role: 'Executive',
      permissions: ['all']
    };
    
    return (
      <GTSExecutivePanel 
        user={mockUser}
        onLogout={() => console.log('Logout from Executive Panel')}
        onBackToHome={onBackToHome}
      />
    );
  }

  // Executive Access - Advanced Executive Management Interface (alternative route)
  if (currentPage === "executive-access") {
    const mockUser = {
      id: 'exec-001',
      name: 'Анна Иванова',
      email: 'anna.ivanova@gts.com',
      role: 'Executive',
      permissions: ['all']
    };
    
    return (
      <GTSExecutivePanel 
        user={mockUser}
        onLogout={() => console.log('Logout from Executive Panel')}
        onBackToHome={onBackToHome}
      />
    );
  }

  // B2B Client Portal - Corporate client management interface
  if (currentPage === "b2b-client-portal") {
    return <GTSB2BClientPortal />;
  }

  // New Lead Demo - Testing new lead creation functionality
  if (currentPage === "new-lead-demo") {
    return <GTSNewLeadDemo onBack={onBackToHome} />;
  }

  // Partner Portal - Unified partner management interface
  if (currentPage === "partner-portal") {
    return <GTSPartnerPortalUnified onBack={onBackToHome} />;
  }

  // Client Club Portal - Premium member interface
  if (currentPage === "client-club-portal") {
    return <GTSClientClubPortal onBack={onBackToHome} />;
  }

  // Crew App - Field crew management interface
  if (currentPage === "crew-app") {
    return <GTSCrewApp onBack={onBackToHome} />;
  }

  // Default: Landing Page
  return (
    <GTSLandingPage 
      onLogin={onLogin}
      onNavigateToUIKit={onNavigateToUIKit}
      onNavigateToDemo={onNavigateToDemo}
      onNavigateToB2BPortal={onNavigateToB2BPortal}
      onNavigateToNewLeadDemo={onNavigateToNewLeadDemo}
      onNavigateToDemoById={onNavigateToDemoById}
    />
  );
}