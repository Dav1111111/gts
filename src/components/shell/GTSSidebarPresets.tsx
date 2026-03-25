import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  BarChart3,
  Calendar,
  Users,
  Building,
  UserCheck,
  DollarSign,
  FileText,
  Globe,
  MessageSquare,
  Zap,
  Shield,
  Settings,
  Search,
  CreditCard,
  Home
} from "lucide-react";

type UserRole = 
  | 'executive' | 'operator' | 'captain' | 'partner-agent' | 'contractor' 
  | 'brand-partner' | 'marketing' | 'finance' | 'sys-admin' | 'b2b-owner' | 'member-gold';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string | number;
  separator?: boolean;
}

interface SidebarPreset {
  role: UserRole;
  roleName: string;
  description: string;
  menuItems: MenuItem[];
}

const sidebarPresets: SidebarPreset[] = [
  {
    role: 'executive',
    roleName: 'Executive',
    description: 'Полный доступ ко всем модулям системы',
    menuItems: [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/calendar' },
      { id: 'crm', name: 'CRM', icon: Users, path: '/crm' },
      { id: 'partners', name: 'Partners', icon: Building, path: '/partners' },
      { id: 'staff', name: 'Staff', icon: UserCheck, path: '/staff' },
      { id: 'finance', name: 'Finance', icon: DollarSign, path: '/finance' },
      { id: 'documents', name: 'Documents', icon: FileText, path: '/documents' },
      { id: 'cms', name: 'CMS', icon: Globe, path: '/cms' },
      { id: 'operations', name: 'Operations Today', icon: Zap, path: '/operations', badge: 12 },
      { id: 'integrations', name: 'Integrations', icon: Settings, path: '/integrations' },
      { id: 'inbox', name: 'Inbox', icon: MessageSquare, path: '/inbox', badge: 3 },
      { id: 'iam', name: 'IAM', icon: Shield, path: '/iam' }
    ]
  },
  {
    role: 'operator',
    roleName: 'Operator/Dispatcher/SiteAdmin',
    description: 'Оперативное управление и контроль',
    menuItems: [
      { id: 'operations', name: 'Operations Today', icon: Zap, path: '/operations', badge: 8 },
      { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/calendar' },
      { id: 'bookings', name: 'Bookings', icon: Calendar, path: '/bookings' },
      { id: 'clients', name: 'Clients', icon: Users, path: '/clients' },
      { id: 'incidents', name: 'Incidents', icon: FileText, path: '/incidents' },
      { id: 'documents', name: 'Documents', icon: FileText, path: '/documents' },
      { id: 'inbox', name: 'Inbox', icon: MessageSquare, path: '/inbox', badge: 2 }
    ]
  },
  {
    role: 'captain',
    roleName: 'Crew (Mobile)',
    description: 'Мобильный интерфейс для экипажа',
    menuItems: [
      { id: 'today', name: 'Today', icon: Calendar, path: '/today', badge: 3 },
      { id: 'checklists', name: 'Checklists', icon: FileText, path: '/checklists' },
      { id: 'guests', name: 'Guests', icon: Users, path: '/guests' },
      { id: 'chat', name: 'Chat', icon: MessageSquare, path: '/chat' },
      { id: 'incident', name: 'Incident', icon: Zap, path: '/incident' }
    ]
  },
  {
    role: 'partner-agent',
    roleName: 'Partner-Agent',
    description: 'Управление лидами и комиссиями',
    menuItems: [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'bookings', name: 'Bookings', icon: Calendar, path: '/bookings' },
      { id: 'commissions', name: 'Commissions', icon: DollarSign, path: '/commissions' },
      { id: 'payouts', name: 'Payouts', icon: DollarSign, path: '/payouts' },
      { id: 'promo-tools', name: 'Promo Tools', icon: Zap, path: '/promo-tools' },
      { id: 'documents', name: 'Documents', icon: FileText, path: '/documents' },
      { id: 'support', name: 'Support', icon: MessageSquare, path: '/support' }
    ]
  },
  {
    role: 'contractor',
    roleName: 'Contractor',
    description: 'Управление флотом и услугами',
    menuItems: [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'fleet', name: 'My Fleet/Services', icon: Building, path: '/fleet' },
      { id: 'bookings', name: 'Bookings', icon: Calendar, path: '/bookings' },
      { id: 'finance', name: 'Finance/Payouts', icon: DollarSign, path: '/finance' },
      { id: 'sla', name: 'SLA & Docs', icon: FileText, path: '/sla' },
      { id: 'support', name: 'Support', icon: MessageSquare, path: '/support' }
    ]
  },
  {
    role: 'brand-partner',
    roleName: 'Brand',
    description: 'Брендинг и лояльность',
    menuItems: [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'loyalty', name: 'Loyalty', icon: CreditCard, path: '/loyalty' },
      { id: 'promotions', name: 'Promotions', icon: Zap, path: '/promotions' },
      { id: 'qr-tools', name: 'QR/UTM Tools', icon: Settings, path: '/qr-tools' },
      { id: 'locations', name: 'Locations', icon: Building, path: '/locations' },
      { id: 'api', name: 'API', icon: Settings, path: '/api' },
      { id: 'documents', name: 'Documents', icon: FileText, path: '/documents' },
      { id: 'support', name: 'Support', icon: MessageSquare, path: '/support' }
    ]
  },
  {
    role: 'marketing',
    roleName: 'Marketing',
    description: 'Контент и кампании',
    menuItems: [
      { id: 'cms', name: 'CMS/Content', icon: Globe, path: '/cms' },
      { id: 'campaigns', name: 'Campaigns/UTM', icon: Zap, path: '/campaigns' },
      { id: 'ab-testing', name: 'A/B Testing', icon: BarChart3, path: '/ab-testing' },
      { id: 'news', name: 'News/Blog', icon: FileText, path: '/news' },
      { id: 'seo', name: 'SEO', icon: Search, path: '/seo' },
      { id: 'inbox', name: 'Inbox', icon: MessageSquare, path: '/inbox' }
    ]
  },
  {
    role: 'finance',
    roleName: 'Finance',
    description: 'Финансовая отчетность',
    menuItems: [
      { id: 'revenue', name: 'Revenue', icon: DollarSign, path: '/revenue' },
      { id: 'costs', name: 'Costs', icon: DollarSign, path: '/costs' },
      { id: 'payouts', name: 'Payouts', icon: DollarSign, path: '/payouts' },
      { id: 'reports', name: 'Reports', icon: FileText, path: '/reports' }
    ]
  },
  {
    role: 'sys-admin',
    roleName: 'SysAdmin',
    description: 'Системное администрирование',
    menuItems: [
      { id: 'iam', name: 'IAM/Roles', icon: Shield, path: '/iam' },
      { id: 'users', name: 'Users', icon: Users, path: '/users' },
      { id: 'integrations', name: 'Integrations', icon: Settings, path: '/integrations' },
      { id: 'audit', name: 'Audit Logs', icon: FileText, path: '/audit' },
      { id: 'health', name: 'System Health', icon: Zap, path: '/health' }
    ]
  },
  {
    role: 'b2b-owner',
    roleName: 'B2B',
    description: 'Корпоративные клиенты',
    menuItems: [
      { id: 'company', name: 'Company', icon: Building, path: '/company' },
      { id: 'requests', name: 'Requests/Deals', icon: Calendar, path: '/requests' },
      { id: 'documents', name: 'Documents', icon: FileText, path: '/documents' },
      { id: 'schedule', name: 'Schedule', icon: Calendar, path: '/schedule' },
      { id: 'participants', name: 'Participants', icon: Users, path: '/participants' }
    ]
  },
  {
    role: 'member-gold',
    roleName: 'ClientClub',
    description: 'Клиентский клуб',
    menuItems: [
      { id: 'membership', name: 'Membership', icon: CreditCard, path: '/membership' },
      { id: 'bookings', name: 'My Bookings', icon: Calendar, path: '/bookings' },
      { id: 'events', name: 'Events', icon: Calendar, path: '/events' },
      { id: 'wallet', name: 'Wallet', icon: DollarSign, path: '/wallet' },
      { id: 'concierge', name: 'Concierge', icon: MessageSquare, path: '/concierge' }
    ]
  }
];

interface GTSSidebarPresetsProps {
  onBackToHome?: () => void;
}

export function GTSSidebarPresets({ onBackToHome }: GTSSidebarPresetsProps) {
  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      <div className={GTSComponents.pageHeader}>
        <div className="max-w-7xl mx-auto">
          <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
            Sidebar Presets - Конфигурации меню
          </h1>
          <p className={GTSComponents.pageSubtitle}>
            Предустановленные конфигурации sidebar для различных ролей пользователей
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {sidebarPresets.map((preset) => (
            <Card key={preset.role} className={GTSStyles.cards.default + ' p-6'}>
              <div className="mb-4">
                <h3 className={`${GTSComponents.cardTitle} mb-2`} style={{ fontFamily: 'var(--font-heading)' }}>
                  {preset.roleName}
                </h3>
                <p className={`${GTSStyles.text.muted} text-sm`}>
                  {preset.description}
                </p>
              </div>

              <div className="space-y-1">
                {preset.menuItems.map((item) => {
                  const IconComponent = item.icon;
                  
                  return (
                    <div key={item.id} className={`flex items-center gap-3 p-2 rounded-lg ${GTSStyles.backgrounds.card}`}>
                      <IconComponent className="w-4 h-4 flex-shrink-0 text-[--gts-portal-accent]" />
                      <div className="flex items-center justify-between w-full">
                        <span className={`${GTSStyles.text.primary} text-sm font-medium`}>
                          {item.name}
                        </span>
                        {item.badge && (
                          <Badge className={`${GTSStyles.badges.default} text-xs`}>
                            {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className={`mt-4 pt-4 border-t ${GTSStyles.borders.default}`}>
                <div className={`text-xs ${GTSStyles.text.muted}`}>
                  <strong>{preset.menuItems.length}</strong> пунктов меню
                  {preset.role === 'captain' && (
                    <div className="mt-1 text-[--gts-portal-accent]">
                      📱 Мобильная версия
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className={GTSStyles.cards.default + ' p-6 mt-8'}>
          <h3 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
            📋 Архитектура меню
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>Executive</h4>
              <p className={`${GTSStyles.text.muted} text-sm`}>
                Dashboard, Calendar, CRM, Partners, Staff, Finance, Documents, CMS, Operations Today, Integrations, Inbox, Settings, IAM
              </p>
            </div>
            <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>Operations</h4>
              <p className={`${GTSStyles.text.muted} text-sm`}>
                Operations Today, Calendar, Bookings, Clients(read), Incidents, Documents(read), Inbox
              </p>
            </div>
            <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>Partners</h4>
              <p className={`${GTSStyles.text.muted} text-sm`}>
                Dashboard, специализированные инструменты по типу партнера, Documents, Support
              </p>
            </div>
            <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>Специализированные</h4>
              <p className={`${GTSStyles.text.muted} text-sm`}>
                Marketing, Finance, SysAdmin, B2B, ClientClub - узкоспециализированные интерфейсы
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}