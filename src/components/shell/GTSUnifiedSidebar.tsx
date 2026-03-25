import { ReactNode } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
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
  LogOut,
  Search,
  CreditCard,
  Home
} from "lucide-react";

type UserRole = 
  | 'guest' | 'user' | 'member-bronze' | 'member-silver' | 'member-gold' | 'member-platinum'
  | 'partner-agent' | 'contractor' | 'brand-partner' | 'ambassador'
  | 'operator' | 'dispatcher' | 'site-admin' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'support'
  | 'marketing' | 'finance' | 'executive' | 'sys-admin'
  | 'b2b-owner' | 'b2b-finance' | 'b2b-coordinator';

interface MenuItem {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string | number;
  separator?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface GTSUnifiedSidebarProps {
  user: User;
  currentPath: string;
  isCollapsed: boolean;
  onNavigate: (path: string) => void;
  onLogout: () => void;
  onBackToHome?: () => void;
}

function getRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    'guest': 'Гость',
    'user': 'Пользователь', 
    'member-bronze': 'Bronze Member',
    'member-silver': 'Silver Member',
    'member-gold': 'Gold Member',
    'member-platinum': 'Platinum Member',
    'partner-agent': 'Партнёр-агент',
    'contractor': 'Подрядчик',
    'brand-partner': 'Бренд-партнёр',
    'ambassador': 'Амбассадор',
    'operator': 'Оператор',
    'dispatcher': 'Диспетчер',
    'site-admin': 'Админ площадки',
    'captain': 'Капитан',
    'pilot': 'Пилот',
    'guide': 'Гид',
    'mechanic': 'Механик',
    'support': 'Поддержка',
    'marketing': 'Маркетолог',
    'finance': 'Финансист',
    'executive': 'Руководитель',
    'sys-admin': 'Системный админ',
    'b2b-owner': 'B2B Владелец',
    'b2b-finance': 'B2B Финансы',
    'b2b-coordinator': 'B2B Координатор'
  };
  return roleNames[role] || role;
}

// Simplified Menu Presets - only essential sections for each role
function getMenuItems(role: UserRole): MenuItem[] {
  // CREW ROLES: No sidebar menu - they use mobile bottom navigation only
  if (['captain', 'pilot', 'guide', 'mechanic'].includes(role)) {
    return []; // Empty array - crew uses mobile bottom nav only
  }

  // Management: All executive and operational roles
  if (['executive', 'operator', 'dispatcher', 'site-admin', 'marketing', 'finance', 'sys-admin'].includes(role)) {
    return [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'calendar', name: 'Calendar', icon: Calendar, path: '/calendar' },
      { id: 'crm', name: 'CRM', icon: Users, path: '/crm' },
      { id: 'finance', name: 'Finance', icon: DollarSign, path: '/finance' }
    ];
  }

  // Partners: External stakeholders
  if (['partner-agent', 'contractor', 'brand-partner'].includes(role)) {
    return [
      { id: 'dashboard', name: 'Dashboard', icon: BarChart3, path: '/dashboard' },
      { id: 'calendar', name: 'Bookings', icon: Calendar, path: '/calendar' },
      { id: 'finance', name: 'Payouts', icon: DollarSign, path: '/finance' }
    ];
  }

  // Clients: All client types including B2B
  if (['b2b-owner', 'b2b-finance', 'b2b-coordinator', 'member-bronze', 'member-silver', 'member-gold', 'member-platinum', 'user'].includes(role)) {
    return [
      { id: 'club', name: 'Club', icon: Building, path: '/client-club' },
      { id: 'calendar', name: 'Bookings', icon: Calendar, path: '/calendar' }
    ];
  }

  // Default minimal menu
  return [
    { id: 'dashboard', name: 'Dashboard', icon: Home, path: '/dashboard' }
  ];
}

export function GTSUnifiedSidebar({ 
  user, 
  currentPath, 
  isCollapsed, 
  onNavigate, 
  onLogout, 
  onBackToHome 
}: GTSUnifiedSidebarProps) {
  const menuItems = getMenuItems(user.role);

  return (
    <div className={`${isCollapsed ? 'w-16' : 'w-64'} ${GTSStyles.backgrounds.surface} border-r ${GTSStyles.borders.default} ${GTSStyles.transitions.default} flex flex-col h-full`}>
      {/* Logo Section */}
      <div className={`p-4 border-b ${GTSStyles.borders.default}`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[--gts-portal-accent] to-red-700 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">GTS</span>
          </div>
          {!isCollapsed && (
            <div>
              <h1 className={`${GTSStyles.text.primary} font-semibold text-sm`} style={{ fontFamily: 'var(--font-heading)' }}>
                {getRoleName(user.role)}
              </h1>
              <p className={`text-xs ${GTSStyles.text.muted}`}>Панель управления</p>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 p-4 overflow-auto">
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <div key={item.id}>
                {item.separator && !isCollapsed && (
                  <div className={`my-3 border-t ${GTSStyles.borders.default}`}></div>
                )}
                <button
                  onClick={() => onNavigate(item.path)}
                  className={`w-full flex items-center gap-3 p-3 rounded-lg ${GTSStyles.transitions.default} ${
                    isActive 
                      ? GTSStyles.buttons.primary
                      : `${GTSStyles.text.muted} hover:${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card}`
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <IconComponent className="w-5 h-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <div className="flex items-center justify-between w-full">
                      <span className="font-medium text-sm">{item.name}</span>
                      {item.badge && (
                        <Badge className={`${GTSStyles.badges.default} text-xs`}>
                          {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                        </Badge>
                      )}
                    </div>
                  )}
                  {isCollapsed && item.badge && (
                    <span className={`absolute top-2 right-2 w-2 h-2 ${GTSStyles.badges.default} rounded-full`}></span>
                  )}
                </button>
              </div>
            );
          })}
        </nav>
      </div>

      {/* User Section */}
      <div className={`p-4 border-t ${GTSStyles.borders.default}`}>
        <div className="flex items-center gap-3 mb-3">
          <Avatar className="w-8 h-8 flex-shrink-0">
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user.name[0]}</span>
            </div>
          </Avatar>
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <div className={`${GTSStyles.text.primary} text-sm font-medium truncate`}>{user.name}</div>
              <div className={`text-xs ${GTSStyles.text.muted} truncate`}>{user.email}</div>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <div className="flex gap-2">
            {onBackToHome && (
              <Button
                variant="outline"
                size="sm"
                onClick={onBackToHome}
                className={`flex-1 ${GTSStyles.buttons.secondary}`}
              >
                Главная
              </Button>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={onLogout}
              className={GTSStyles.buttons.secondary}
              title="Выйти"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}