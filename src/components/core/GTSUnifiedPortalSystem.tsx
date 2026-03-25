// 🎯 GTS Unified Portal System - AI-Friendly Architecture
import React, { useState } from "react";
// 🎨 REAL COMPONENTS - Extracted from existing portals
import { GTSVIPBookingsComponent } from "../portal/unified/GTSVIPBookingsComponent";
import { GTSConciergeServiceComponent } from "../portal/unified/GTSConciergeServiceComponent";
import { GTSLoyaltyProgramComponent } from "../portal/unified/GTSLoyaltyProgramComponent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../ui/tabs";
import {
  Users,
  Building2,
  Crown,
  Briefcase,
  Wrench,
  UserCheck,
  BarChart3,
  Settings,
  Calendar,
  DollarSign,
  FileText,
  MessageSquare,
  Bell,
  Search,
  Filter,
  Plus,
  ArrowLeft,
} from "lucide-react";

// 🎯 UNIFIED PORTAL TYPES
export type PortalRole =
  | "client-vip" // VIP клиенты (премиум услуги)
  | "client-standard" // Стандартные клиенты
  | "business-client" // B2B корпоративные клиенты
  | "brand-partner" // Брендовые партнеры
  | "agent-partner" // Партнеры-агенты
  | "contractor" // Подрядчики и поставщики
  | "staff" // Сотрудники компании
  | "admin"; // Администраторы

export interface PortalConfig {
  role: PortalRole;
  name: string;
  description: string;
  primaryColor: string;
  features: PortalFeature[];
  layout: PortalLayout;
  permissions: string[];
}

export interface PortalFeature {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  component: React.ComponentType<any>;
  enabled: boolean;
  requiresPermission?: string;
}

export interface PortalLayout {
  sidebar: boolean;
  topbar: boolean;
  notifications: boolean;
  search: boolean;
  profileMenu: boolean;
}

// 🏗️ PORTAL CONFIGURATIONS
export const PORTAL_CONFIGS: Record<PortalRole, PortalConfig> =
  {
    "client-vip": {
      role: "client-vip",
      name: "GTS Client Club",
      description: "Премиум портал для VIP клиентов",
      primaryColor: "#91040C",
      features: [
        {
          id: "bookings",
          name: "Мои бронирования",
          icon: Calendar,
          component: VIPBookings,
          enabled: true,
        },
        {
          id: "concierge",
          name: "Консьерж-сервис",
          icon: UserCheck,
          component: ConciergeService,
          enabled: true,
        },
        {
          id: "loyalty",
          name: "Программа лояльности",
          icon: Crown,
          component: LoyaltyProgram,
          enabled: true,
        },
        {
          id: "exclusive",
          name: "Эксклюзивные предложения",
          icon: BarChart3,
          component: ExclusiveOffers,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: true,
        profileMenu: true,
      },
      permissions: [
        "view_vip_content",
        "book_premium",
        "access_concierge",
      ],
    },

    "client-standard": {
      role: "client-standard",
      name: "GTS Client Portal",
      description: "Портал для стандартных клиентов",
      primaryColor: "#3B82F6",
      features: [
        {
          id: "bookings",
          name: "Мои бронирования",
          icon: Calendar,
          component: StandardBookings,
          enabled: true,
        },
        {
          id: "services",
          name: "Услуги",
          icon: Briefcase,
          component: ServiceCatalog,
          enabled: true,
        },
        {
          id: "support",
          name: "Поддержка",
          icon: MessageSquare,
          component: ClientSupport,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: false,
        profileMenu: true,
      },
      permissions: ["view_standard_content", "book_basic"],
    },

    "business-client": {
      role: "business-client",
      name: "GTS Business Portal",
      description: "Корпоративный портал для B2B клиентов",
      primaryColor: "#059669",
      features: [
        {
          id: "corporate-bookings",
          name: "Корпоративные заказы",
          icon: Building2,
          component: CorporateBookings,
          enabled: true,
        },
        {
          id: "team-management",
          name: "Управление командой",
          icon: Users,
          component: TeamManagement,
          enabled: true,
        },
        {
          id: "reports",
          name: "Отчеты",
          icon: BarChart3,
          component: BusinessReports,
          enabled: true,
        },
        {
          id: "contracts",
          name: "Договоры",
          icon: FileText,
          component: ContractManagement,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: true,
        profileMenu: true,
      },
      permissions: [
        "view_business_content",
        "manage_corporate_bookings",
        "view_reports",
      ],
    },

    "brand-partner": {
      role: "brand-partner",
      name: "GTS Brand Partner Portal",
      description: "Портал для брендовых партнеров",
      primaryColor: "#8B5CF6",
      features: [
        {
          id: "campaigns",
          name: "Кампании",
          icon: BarChart3,
          component: PartnerCampaigns,
          enabled: true,
        },
        {
          id: "analytics",
          name: "Аналитика",
          icon: BarChart3,
          component: PartnerAnalytics,
          enabled: true,
        },
        {
          id: "resources",
          name: "Ресурсы",
          icon: FileText,
          component: BrandResources,
          enabled: true,
        },
        {
          id: "commissions",
          name: "Комиссии",
          icon: DollarSign,
          component: CommissionTracking,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: true,
        profileMenu: true,
      },
      permissions: [
        "view_partner_content",
        "manage_campaigns",
        "view_analytics",
      ],
    },

    "agent-partner": {
      role: "agent-partner",
      name: "GTS Agent Portal",
      description: "Портал для партнеров-агентов",
      primaryColor: "#F59E0B",
      features: [
        {
          id: "referrals",
          name: "Рефералы",
          icon: Users,
          component: ReferralManagement,
          enabled: true,
        },
        {
          id: "bookings",
          name: "Бронирования клиентов",
          icon: Calendar,
          component: AgentBookings,
          enabled: true,
        },
        {
          id: "commissions",
          name: "Комиссии",
          icon: DollarSign,
          component: CommissionTracking,
          enabled: true,
        },
        {
          id: "tools",
          name: "Маркетинговые инструменты",
          icon: Settings,
          component: MarketingTools,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: false,
        profileMenu: true,
      },
      permissions: [
        "view_agent_content",
        "manage_referrals",
        "view_commissions",
      ],
    },

    contractor: {
      role: "contractor",
      name: "GTS Contractor Portal",
      description: "Портал для подрядчиков",
      primaryColor: "#6B7280",
      features: [
        {
          id: "orders",
          name: "Заказы",
          icon: FileText,
          component: ContractorOrders,
          enabled: true,
        },
        {
          id: "schedule",
          name: "Расписание",
          icon: Calendar,
          component: ContractorSchedule,
          enabled: true,
        },
        {
          id: "fleet",
          name: "Техника",
          icon: Wrench,
          component: ContractorFleet,
          enabled: true,
        },
        {
          id: "finance",
          name: "Финансы",
          icon: DollarSign,
          component: ContractorFinance,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: false,
        profileMenu: true,
      },
      permissions: [
        "view_contractor_content",
        "manage_orders",
        "view_schedule",
      ],
    },

    staff: {
      role: "staff",
      name: "GTS Staff Portal",
      description: "Внутренний портал для сотрудников",
      primaryColor: "#10B981",
      features: [
        {
          id: "tasks",
          name: "Задачи",
          icon: FileText,
          component: StaffTasks,
          enabled: true,
        },
        {
          id: "schedule",
          name: "Расписание",
          icon: Calendar,
          component: StaffSchedule,
          enabled: true,
        },
        {
          id: "clients",
          name: "Клиенты",
          icon: Users,
          component: ClientManagement,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: true,
        profileMenu: true,
      },
      permissions: ["view_staff_content", "manage_clients"],
    },

    admin: {
      role: "admin",
      name: "GTS Admin Portal",
      description: "Административный портал",
      primaryColor: "#EF4444",
      features: [
        {
          id: "dashboard",
          name: "Dashboard",
          icon: BarChart3,
          component: AdminDashboard,
          enabled: true,
        },
        {
          id: "users",
          name: "Пользователи",
          icon: Users,
          component: UserManagement,
          enabled: true,
        },
        {
          id: "settings",
          name: "Настройки",
          icon: Settings,
          component: SystemSettings,
          enabled: true,
        },
      ],
      layout: {
        sidebar: true,
        topbar: true,
        notifications: true,
        search: true,
        profileMenu: true,
      },
      permissions: [
        "admin_access",
        "manage_users",
        "system_settings",
      ],
    },
  };

// 🎨 REAL COMPONENTS FOR VIP CLIENT PORTAL
const VIPBookings = ({ user }: { user?: any }) => <GTSVIPBookingsComponent user={user} />;
const ConciergeService = ({ user }: { user?: any }) => <GTSConciergeServiceComponent user={user} />;
const LoyaltyProgram = ({ user }: { user?: any }) => {
  // Transform user data for loyalty component
  const loyaltyUser = {
    ...user,
    tier: 'platinum' as const,
    bonusBalance: 15420,
    totalSpent: 2850000,
    joinDate: '2022-03-15',
    nextTierProgress: 100,
    privileges: ['Priority Support', 'Free Upgrades', 'Exclusive Events', 'Concierge Service']
  };
  return <GTSLoyaltyProgramComponent user={loyaltyUser} />;
};
const ExclusiveOffers = () => (
  <div className="p-6">Exclusive Offers Component</div>
);
const StandardBookings = () => (
  <div className="p-6">Standard Bookings Component</div>
);
const ServiceCatalog = () => (
  <div className="p-6">Service Catalog Component</div>
);
const ClientSupport = () => (
  <div className="p-6">Client Support Component</div>
);
const CorporateBookings = () => (
  <div className="p-6">Corporate Bookings Component</div>
);
const TeamManagement = () => (
  <div className="p-6">Team Management Component</div>
);
const BusinessReports = () => (
  <div className="p-6">Business Reports Component</div>
);
const ContractManagement = () => (
  <div className="p-6">Contract Management Component</div>
);
const PartnerCampaigns = () => (
  <div className="p-6">Partner Campaigns Component</div>
);
const PartnerAnalytics = () => (
  <div className="p-6">Partner Analytics Component</div>
);
const BrandResources = () => (
  <div className="p-6">Brand Resources Component</div>
);
const CommissionTracking = () => (
  <div className="p-6">Commission Tracking Component</div>
);
const ReferralManagement = () => (
  <div className="p-6">Referral Management Component</div>
);
const AgentBookings = () => (
  <div className="p-6">Agent Bookings Component</div>
);
const MarketingTools = () => (
  <div className="p-6">Marketing Tools Component</div>
);
const ContractorOrders = () => (
  <div className="p-6">Contractor Orders Component</div>
);
const ContractorSchedule = () => (
  <div className="p-6">Contractor Schedule Component</div>
);
const ContractorFleet = () => (
  <div className="p-6">Contractor Fleet Component</div>
);
const ContractorFinance = () => (
  <div className="p-6">Contractor Finance Component</div>
);
const StaffTasks = () => (
  <div className="p-6">Staff Tasks Component</div>
);
const StaffSchedule = () => (
  <div className="p-6">Staff Schedule Component</div>
);
const ClientManagement = () => (
  <div className="p-6">Client Management Component</div>
);
const AdminDashboard = () => (
  <div className="p-6">Admin Dashboard Component</div>
);
const UserManagement = () => (
  <div className="p-6">User Management Component</div>
);
const SystemSettings = () => (
  <div className="p-6">System Settings Component</div>
);

interface UnifiedPortalProps {
  role: PortalRole;
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    permissions: string[];
  };
  onBack?: () => void;
  onLogout?: () => void;
}

export function GTSUnifiedPortalSystem({
  role,
  user,
  onBack,
  onLogout,
}: UnifiedPortalProps) {
  const [activeFeature, setActiveFeature] =
    useState<string>("");
  const [searchQuery, setSearchQuery] = useState("");

  const config = PORTAL_CONFIGS[role];

  // Set default active feature
  React.useEffect(() => {
    if (!activeFeature && config.features.length > 0) {
      setActiveFeature(config.features[0].id);
    }
  }, [config.features, activeFeature]);

  const currentFeature = config.features.find(
    (f) => f.id === activeFeature,
  );

  const hasPermission = (permission?: string) => {
    if (!permission) return true;
    return user.permissions.includes(permission);
  };

  const availableFeatures = config.features.filter(
    (feature) =>
      feature.enabled &&
      hasPermission(feature.requiresPermission),
  );

  return (
    <div className="min-h-screen bg-[#0B0B0C] dark">
      {/* Topbar */}
      {config.layout.topbar && (
        <div className="border-b bg-[#121214] border-[#232428]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {onBack && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBack}
                  className="text-white hover:bg-[#17181A]"
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Назад
                </Button>
              )}
              <div>
                <h1 className="text-xl font-heading text-white">
                  {config.name}
                </h1>
                <p className="text-sm text-[#A6A7AA]">
                  {config.description}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Search */}
              {config.layout.search && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A6A7AA] h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Поиск..."
                    value={searchQuery}
                    onChange={(e) =>
                      setSearchQuery(e.target.value)
                    }
                    className="pl-10 pr-4 py-2 bg-[#17181A] border border-[#232428] rounded-lg text-white placeholder-[#A6A7AA] focus:border-[#91040C] focus:outline-none"
                  />
                </div>
              )}

              {/* Notifications */}
              {config.layout.notifications && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="relative text-white hover:bg-[#17181A]"
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-[#91040C] rounded-full text-xs flex items-center justify-center text-white">
                    3
                  </span>
                </Button>
              )}

              {/* Profile Menu */}
              {config.layout.profileMenu && (
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <p className="text-sm font-medium text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#A6A7AA]">
                      {user.email}
                    </p>
                  </div>
                  {onLogout && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onLogout}
                      className="text-white hover:bg-[#17181A]"
                    >
                      Выйти
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex">
        {/* Sidebar */}
        {config.layout.sidebar && (
          <div className="w-64 bg-[#121214] border-r border-[#232428] min-h-screen">
            <div className="p-4">
              <div className="space-y-2">
                {availableFeatures.map((feature) => {
                  const IconComponent = feature.icon;
                  return (
                    <button
                      key={feature.id}
                      onClick={() =>
                        setActiveFeature(feature.id)
                      }
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeFeature === feature.id
                          ? "bg-[#91040C] text-white"
                          : "text-[#A6A7AA] hover:bg-[#17181A] hover:text-white"
                      }`}
                    >
                      <IconComponent className="h-5 w-5" />
                      {feature.name}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="flex-1">
          {currentFeature && (
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <currentFeature.icon className="h-6 w-6 text-[#91040C]" />
                <h2 className="text-xl font-heading text-white">
                  {currentFeature.name}
                </h2>
              </div>

              <currentFeature.component user={user} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default GTSUnifiedPortalSystem;