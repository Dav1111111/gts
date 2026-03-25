import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Zap,
  User,
  Bell,
  Home
} from "lucide-react";

type CrewRole = 'captain' | 'pilot' | 'guide' | 'mechanic';

interface MenuItem {
  id: string;
  name: string;
  shortName: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  badge?: string | number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: CrewRole;
  avatar?: string;
}

interface GTSCrewMobileBottomNavProps {
  user: User;
  currentPath: string;
  children: ReactNode;
  onNavigate: (path: string) => void;
  onBackToHome?: () => void;
  onLogout?: () => void;
}

function getRoleName(role: CrewRole): string {
  const roleNames: Record<CrewRole, string> = {
    captain: 'Капитан',
    pilot: 'Пилот',
    guide: 'Гид',
    mechanic: 'Механик'
  };
  return roleNames[role];
}

function getCrewMenuItems(role: CrewRole): MenuItem[] {
  // Unified crew bottom nav - focused on daily tasks
  return [
    { 
      id: 'today', 
      name: 'Сегодня', 
      shortName: 'Сегодня',
      icon: Calendar, 
      path: '/today', 
      badge: 3 
    },
    { 
      id: 'checklists', 
      name: 'Списки', 
      shortName: 'Списки',
      icon: FileText, 
      path: '/checklists' 
    },
    { 
      id: 'guests', 
      name: 'Гости', 
      shortName: 'Гости',
      icon: Users, 
      path: '/guests' 
    },
    { 
      id: 'chat', 
      name: 'Чат', 
      shortName: 'Чат',
      icon: MessageSquare, 
      path: '/chat' 
    },
    { 
      id: 'alerts', 
      name: 'Оповещения', 
      shortName: 'SOS',
      icon: Zap, 
      path: '/alerts' 
    }
  ];
}

export function GTSCrewMobileBottomNav({ 
  user, 
  currentPath, 
  children, 
  onNavigate,
  onBackToHome,
  onLogout 
}: GTSCrewMobileBottomNavProps) {
  const menuItems = getCrewMenuItems(user.role);

  return (
    <div className={`min-h-screen ${GTSStyles.backgrounds.main} flex flex-col`}>
      {/* Mobile Header */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} px-4 py-3 safe-area-top`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#91040C] to-red-700 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-sm">GTS</span>
            </div>
            <div>
              <h1 className={`${GTSStyles.text.primary} font-medium text-lg`} style={{ fontFamily: 'var(--font-heading)' }}>
                Crew App
              </h1>
              <p className={`text-sm ${GTSStyles.text.muted}`}>
                {getRoleName(user.role)} • {user.name}
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Status Indicator */}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className={`text-sm ${GTSStyles.text.muted}`}>На связи</span>
            </div>

            {/* Emergency Button */}
            <Button 
              size="sm" 
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
            >
              SOS
            </Button>

            {/* User Menu */}
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <span className="text-white text-sm font-medium">{user.name[0]}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`${GTSStyles.backgrounds.surface} border-t ${GTSStyles.borders.default} safe-area-bottom`}>
        <div className="grid grid-cols-5 px-2 py-2">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className={`flex flex-col items-center justify-center gap-1 p-3 rounded-xl ${GTSStyles.transitions.default} ${
                  isActive 
                    ? `${GTSStyles.backgrounds.accent} text-white` 
                    : `${GTSStyles.text.muted} hover:${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card}`
                }`}
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5" />
                  {item.badge && (
                    <Badge className={`absolute -top-2 -right-2 w-5 h-5 p-0 text-xs flex items-center justify-center ${
                      isActive ? 'bg-white text-[#91040C]' : 'bg-[#91040C] text-white'
                    }`}>
                      {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                    </Badge>
                  )}
                </div>
                <span className="text-xs font-medium leading-tight">
                  {item.shortName}
                </span>
              </button>
            );
          })}
        </div>

        {/* Quick Actions Bar */}
        <div className={`px-4 py-2 border-t ${GTSStyles.borders.default} bg-white/5`}>
          <div className="flex items-center justify-center gap-4">
            {onBackToHome && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onBackToHome}
                className={`${GTSStyles.buttons.ghost} text-xs`}
              >
                <Home className="w-4 h-4 mr-1" />
                Главная
              </Button>
            )}
            
            <Button
              size="sm"
              variant="ghost" 
              className={`${GTSStyles.buttons.ghost} text-xs`}
            >
              <User className="w-4 h-4 mr-1" />
              Профиль
            </Button>

            {onLogout && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onLogout}
                className={`${GTSStyles.buttons.ghost} text-xs`}
              >
                Выйти
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}