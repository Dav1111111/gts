import { useState } from "react";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { GTSExecutiveDashboard } from "./modules/GTSExecutiveDashboard";
import { GTSCRMAdvanced } from "./modules/GTSCRMAdvanced";
import { GTSBookingCalendarAdvanced } from "./modules/GTSBookingCalendarAdvanced";
import { GTSFleetManagement } from "./modules/GTSFleetManagement";
import { GTSOperationsCenter } from "./modules/GTSOperationsCenter";
import { GTSSystemStatus } from "./modules/GTSSystemStatus";
import { GTSMarketingCenter } from "./modules/GTSMarketingCenter";
import { GTSAnalyticsExtended } from "./modules/GTSAnalyticsExtended";
import { GTSAPIIntegrationsExtended } from "./modules/GTSAPIIntegrationsExtended";


import { GTSAuditLoggingModule } from "./modules/GTSAuditLoggingModule";
import { GTSStaffManagementModule } from "./modules/GTSStaffManagementModule";
import { GTSPartnersExtended } from "./modules/GTSPartnersExtended";
import { GTSFinanceCenterExtended } from "./modules/GTSFinanceCenterExtended";
import { GTSKnowledgeBaseExtended } from "./modules/GTSKnowledgeBaseExtended";
import { GTSIAMRolesPermissions } from "./modules/GTSIAMRolesPermissions";
import { GTSAIModulesDashboard } from "./GTSAIModulesDashboard";
import { GTSAIModulesDashboardExtended } from "./modules/GTSAIModulesDashboardExtended";
import { GTSGlobalAIAssistantWidget } from "./modules/GTSGlobalAIAssistantWidget";
import { GTSB2BClientPortal } from "../portal/GTSB2BClientPortal";
import { GTSQualityTrendsDashboard } from "./modules/GTSQualityTrendsDashboard";
import { GTSArchitectureDiagram } from "./modules/GTSArchitectureDiagram";
import { GTSAuditLogsExtended } from "./modules/GTSAuditLogsExtended";
import { GTSExpeditionsAdmin } from "./GTSExpeditionsAdmin";
import { GTSContentAdmin } from "./GTSContentAdmin";
import { Route } from "../GTSRouter";
import { 
  BarChart3, 
  Calendar, 
  Users, 
  Building, 
  DollarSign, 
  FileText, 
  Settings, 
  TrendingUp,
  Activity,
  Globe,
  Shield,
  MousePointer,
  Brain,
  Target,
  Zap,
  // Fleet & Operations icons
  Plane,
  Anchor,
  Truck,
  Radio,
  CloudRain,
  Network,
  Compass
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSExecutivePanelProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
  onNavigate?: (route: Route) => void;
}

const modules = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    description: 'Главная панель с аналитикой',
    icon: BarChart3,
    active: true
  },
  {
    id: 'crm',
    name: 'CRM & Omni Inbox',
    description: 'Управление клиентами',
    icon: Users,
    active: false
  },
  {
    id: 'calendar',
    name: 'Booking Calendar',
    description: 'Календарь бронирования',
    icon: Calendar,
    active: false
  },
  {
    id: 'fleet',
    name: 'Fleet Management',
    description: 'Управление парком',
    icon: Activity,
    active: false
  },
  {
    id: 'operations',
    name: 'Operations Center',
    description: 'Центр операций и погода',
    icon: Radio,
    active: false
  },
  {
    id: 'weather',
    name: 'Weather & Conditions',
    description: 'Погода и условия безопасности',
    icon: CloudRain,
    active: false
  },
  {
    id: 'marketing',
    name: 'Marketing',
    description: 'Трафик и маркетинг',
    icon: MousePointer,
    active: false
  },
  {
    id: 'analytics',
    name: 'Analytics',
    description: 'Расширенная аналитика с AI-прогнозами',
    icon: BarChart3,
    active: false
  },
  {
    id: 'integrations',
    name: 'Integrations',
    description: 'API, вебхуки и автоматизация',
    icon: Zap,
    active: false
  },

  {
    id: 'partners',
    name: 'Partners',
    description: 'Партнеры и агенты',
    icon: Building,
    active: false
  },
  {
    id: 'staff',
    name: 'Staff',
    description: 'Управление персоналом',
    icon: Users,
    active: false
  },
  {
    id: 'finance',
    name: 'Finance',
    description: 'Финансовые отчеты',
    icon: DollarSign,
    active: false
  },
  {
    id: 'knowledge',
    name: 'Knowledge Base',
    description: 'База знаний и документация',
    icon: FileText,
    active: false
  },
  {
    id: 'cms',
    name: 'CMS',
    description: 'Управление контентом',
    icon: Globe,
    active: false
  },
  {
    id: 'iam',
    name: 'IAM',
    description: 'Права доступа',
    icon: Shield,
    active: false
  },
  {
    id: 'ai',
    name: 'AI Modules',
    description: 'Искусственный интеллект',
    icon: Brain,
    active: false
  },
  {
    id: 'audit',
    name: 'Audit & Logs',
    description: 'Аудит системы и логирование',
    icon: Activity,
    active: false
  },
  {
    id: 'quality',
    name: 'Quality & Trends',
    description: 'Качество обслуживания и тренды',
    icon: TrendingUp,
    active: false
  },
  {
    id: 'b2b-portal',
    name: 'B2B Client Portal',
    description: 'Корпоративные клиенты',
    icon: Building,
    active: false
  },
  {
    id: 'architecture',
    name: 'System Architecture',
    description: 'Диаграмма архитектуры проекта',
    icon: Network,
    active: false
  },
  {
    id: 'system',
    name: 'System Status',
    description: 'Состояние системы GTS',
    icon: Activity,
    active: false
  },
  {
    id: 'expeditions',
    name: 'Expeditions',
    description: 'Управление экспедициями',
    icon: Compass,
    active: false
  }
];

// Placeholder components for modules that don't exist yet
const PlaceholderModule = ({ title, description }: { title: string; description: string }) => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="text-center">
      <div className="w-16 h-16 bg-[#91040C]/10 rounded-lg flex items-center justify-center mx-auto mb-4">
        <Settings className="w-8 h-8 text-[#91040C]" />
      </div>
      <h2 className="text-xl font-heading text-white mb-2">{title}</h2>
      <p className="text-[#A6A7AA]">{description}</p>
      <p className="text-sm text-[#A6A7AA] mt-2">Модуль в разработке</p>
    </div>
  </div>
);

export function GTSExecutivePanel({ user, onLogout, onBackToHome, onNavigate }: GTSExecutivePanelProps) {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <GTSExecutiveDashboard user={user as any} />;
      case 'crm':
        return <GTSCRMAdvanced />;
      case 'calendar':
        return <GTSBookingCalendarAdvanced />;
      case 'fleet':
        return <GTSFleetManagement user={user} />;
      case 'operations':
        return <GTSOperationsCenter user={user} />;
      case 'system':
        return <GTSSystemStatus />;
      case 'marketing':
        return <GTSMarketingCenter user={user} />;
      case 'analytics':
        return <GTSAnalyticsExtended userRole={user.role} />;
      case 'integrations':
        return <GTSAPIIntegrationsExtended userRole={user.role} />;
      case 'finance':
        return <GTSFinanceCenterExtended userRole={user.role} />;
      case 'knowledge':
        return <GTSKnowledgeBaseExtended userRole={user.role} />;
      case 'audit':
        return <GTSAuditLogsExtended userRole={user.role} />;
      case 'staff':
        return <GTSStaffManagementModule />;
      case 'partners':
        return <GTSPartnersExtended userRole={user.role} />;
      case 'cms':
        return <GTSContentAdmin onNavigate={onNavigate} />;
      case 'iam':
        return <GTSIAMRolesPermissions />;
      case 'ai':
        return <GTSAIModulesDashboardExtended userRole={user.role} />;
      case 'quality':
        return <GTSQualityTrendsDashboard />;
      case 'b2b-portal':
        return <GTSB2BClientPortal />;
      case 'architecture':
        return <GTSArchitectureDiagram />;
      case 'weather':
        return <PlaceholderModule title="Weather & Conditions" description="Погода и условия безопасности" />;
      case 'expeditions':
        return <GTSExpeditionsAdmin onNavigate={onNavigate} />;
      default:
        return <GTSExecutiveDashboard user={user as any} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] dark">
      <GTSUnifiedAdminHeader
        user={user}
        onLogout={onLogout}
        onBackToHome={onBackToHome}
        modules={modules}
        activeModule={activeModule}
        onModuleChange={setActiveModule}
        sidebarOpen={sidebarOpen}
        onSidebarToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        {sidebarOpen && (
          <div className="w-full border-b border-[#232428] bg-[#121214] lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
            <div className="overflow-x-auto p-3 lg:p-4">
              <nav className="flex min-w-max gap-2 lg:block lg:min-w-0 lg:space-y-2">
                {modules.map((module) => {
                  const IconComponent = module.icon;
                  return (
                    <button
                      key={module.id}
                      onClick={() => setActiveModule(module.id)}
                      className={`flex min-w-[220px] items-center gap-3 rounded-lg px-3 py-2 text-left transition-colors lg:w-full lg:min-w-0 ${
                        activeModule === module.id
                          ? 'bg-[#91040C] text-white'
                          : 'text-[#A6A7AA] hover:bg-[#17181A] hover:text-white'
                      }`}
                    >
                      <IconComponent className="w-5 h-5 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm">{module.name}</div>
                        <div className="text-xs opacity-75 truncate">{module.description}</div>
                      </div>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          {renderModule()}
        </div>
      </div>

      {/* Глобальный AI ассистент */}
      <GTSGlobalAIAssistantWidget userRole={user.role} />
    </div>
  );
}
