import { ReactNode } from "react";
import { Badge } from "../ui/badge";
import { GTSStyles } from "../../utils/gts-styles";
import { 
  Calendar,
  FileText,
  Users,
  MessageSquare,
  Zap
} from "lucide-react";

type CrewRole = 'captain' | 'pilot' | 'guide' | 'mechanic';

interface MenuItem {
  id: string;
  name: string;
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

interface GTSMobileCrewProps {
  user: User;
  currentPath: string;
  children: ReactNode;
  onNavigate: (path: string) => void;
}

function getCrewMenuItems(role: CrewRole): MenuItem[] {
  // Crew (Mobile): Today, Checklists, Guests, Chat, Incident
  return [
    { id: 'today', name: 'Today', icon: Calendar, path: '/today', badge: 3 },
    { id: 'checklists', name: 'Lists', icon: FileText, path: '/checklists' },
    { id: 'guests', name: 'Guests', icon: Users, path: '/guests' },
    { id: 'chat', name: 'Chat', icon: MessageSquare, path: '/chat' },
    { id: 'incident', name: 'Incident', icon: Zap, path: '/incident' }
  ];
}

export function GTSMobileCrew({ user, currentPath, children, onNavigate }: GTSMobileCrewProps) {
  const menuItems = getCrewMenuItems(user.role);

  return (
    <div className={`min-h-screen ${GTSStyles.backgrounds.main} flex flex-col`}>
      {/* Mobile Header */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[--gts-portal-accent] to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GTS</span>
            </div>
            <div>
              <h1 className={`${GTSStyles.text.primary} font-semibold text-sm`} style={{ fontFamily: 'var(--font-heading)' }}>
                Crew App
              </h1>
              <p className={`text-xs ${GTSStyles.text.muted}`}>{user.name}</p>
            </div>
          </div>
          
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className={`text-xs ${GTSStyles.text.muted}`}>Online</span>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {children}
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`${GTSStyles.backgrounds.surface} border-t ${GTSStyles.borders.default} p-2 safe-area-bottom`}>
        <div className="grid grid-cols-5 gap-1">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentPath === item.path;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.path)}
                className={`flex flex-col items-center gap-1 p-2 rounded-lg ${GTSStyles.transitions.default} ${
                  isActive 
                    ? GTSStyles.text.accent
                    : GTSStyles.text.muted
                }`}
              >
                <div className="relative">
                  <IconComponent className="w-5 h-5" />
                  {item.badge && (
                    <span className={`absolute -top-1 -right-1 w-4 h-4 ${GTSStyles.badges.default} rounded-full text-xs flex items-center justify-center`}>
                      {typeof item.badge === 'number' && item.badge > 9 ? '9+' : item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}