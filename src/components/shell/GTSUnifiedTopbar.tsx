import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Menu, 
  Search, 
  Bell, 
  Settings, 
  LogOut, 
  ChevronDown,
  Home
} from "lucide-react";

type UserRole = 
  | 'guest' | 'user' | 'member-bronze' | 'member-silver' | 'member-gold' | 'member-platinum'
  | 'partner-agent' | 'contractor' | 'brand-partner' | 'ambassador'
  | 'operator' | 'dispatcher' | 'site-admin' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'support'
  | 'marketing' | 'finance' | 'executive' | 'sys-admin'
  | 'b2b-owner' | 'b2b-finance' | 'b2b-coordinator';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface GTSUnifiedTopbarProps {
  user: User;
  currentPath: string;
  breadcrumbs: { name: string; path: string }[];
  notificationCount?: number;
  onToggleSidebar: () => void;
  onNavigate: (path: string) => void;
  onSearch?: (query: string) => void;
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

export function GTSUnifiedTopbar({ 
  user, 
  currentPath, 
  breadcrumbs, 
  notificationCount = 0,
  onToggleSidebar, 
  onNavigate, 
  onSearch,
  onLogout, 
  onBackToHome 
}: GTSUnifiedTopbarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
      <div className="flex items-center justify-between">
        {/* Left Side: Menu Toggle + Logo + Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className={GTSStyles.buttons.ghost}
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          {/* GTS Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[--gts-portal-accent] to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GTS</span>
            </div>
            <div className="hidden md:block">
              <h1 className={`${GTSStyles.text.primary} font-semibold text-sm`} style={{ fontFamily: 'var(--font-heading)' }}>
                Grand Tour Sochi
              </h1>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          <div className="hidden lg:flex items-center gap-2">
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center gap-2">
                {index > 0 && <span className={GTSStyles.text.muted}>/</span>}
                <button
                  onClick={() => index === 0 ? onNavigate('/') : onNavigate(crumb.path)}
                  className={`text-sm ${GTSStyles.transitions.default} ${
                    index === breadcrumbs.length - 1
                      ? `${GTSStyles.text.primary} font-medium`
                      : `${GTSStyles.text.muted} hover:${GTSStyles.text.primary}`
                  }`}
                >
                  {crumb.name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Search + Notifications + User Menu */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 ${GTSStyles.text.muted}`} />
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-64 pl-10 pr-4 py-2 ${GTSStyles.backgrounds.card} border-[--gts-portal-border] ${GTSStyles.text.primary} placeholder:${GTSStyles.text.muted}`}
            />
          </form>
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className={`${GTSStyles.buttons.ghost} relative`}
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className={`absolute -top-1 -right-1 w-5 h-5 ${GTSStyles.badges.default} rounded-full text-xs flex items-center justify-center`}>
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className={`${GTSStyles.buttons.ghost} flex items-center gap-2`}
            >
              <Avatar className="w-6 h-6">
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs font-medium">{user.name[0]}</span>
                </div>
              </Avatar>
              <div className="hidden md:block text-left">
                <div className={`${GTSStyles.text.primary} text-sm font-medium`}>{user.name}</div>
                <div className={`${GTSStyles.text.muted} text-xs`}>{getRoleName(user.role)}</div>
              </div>
              <ChevronDown className="w-4 h-4" />
            </Button>

            {userMenuOpen && (
              <div className={`absolute right-0 top-full mt-2 w-48 ${GTSStyles.backgrounds.surface} border ${GTSStyles.borders.default} rounded-lg shadow-lg z-50`}>
                <div className={`p-3 border-b ${GTSStyles.borders.default}`}>
                  <div className={`${GTSStyles.text.primary} text-sm font-medium`}>{user.name}</div>
                  <div className={`${GTSStyles.text.muted} text-xs`}>{user.email}</div>
                  <div className={`${GTSStyles.text.accent} text-xs font-medium mt-1`}>{getRoleName(user.role)}</div>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onNavigate('/settings');
                    }}
                    className={`w-full flex items-center gap-2 p-2 ${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} rounded text-sm ${GTSStyles.transitions.default}`}
                  >
                    <Settings className="w-4 h-4" />
                    Настройки
                  </button>
                  {onBackToHome && (
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onBackToHome();
                      }}
                      className={`w-full flex items-center gap-2 p-2 ${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} rounded text-sm ${GTSStyles.transitions.default}`}
                    >
                      <Home className="w-4 h-4" />
                      На главную
                    </button>
                  )}
                  <div className={`my-1 border-t ${GTSStyles.borders.default}`}></div>
                  <button
                    onClick={() => {
                      setUserMenuOpen(false);
                      onLogout();
                    }}
                    className={`w-full flex items-center gap-2 p-2 ${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} rounded text-sm ${GTSStyles.transitions.default}`}
                  >
                    <LogOut className="w-4 h-4" />
                    Выйти
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Breadcrumbs */}
      <div className="lg:hidden mt-3 flex items-center gap-2 overflow-x-auto">
        {breadcrumbs.map((crumb, index) => (
          <div key={index} className="flex items-center gap-2 whitespace-nowrap">
            {index > 0 && <span className={GTSStyles.text.muted}>/</span>}
            <button
              onClick={() => index === 0 ? onNavigate('/') : onNavigate(crumb.path)}
              className={`text-sm ${GTSStyles.transitions.default} ${
                index === breadcrumbs.length - 1
                  ? `${GTSStyles.text.primary} font-medium`
                  : `${GTSStyles.text.muted} hover:${GTSStyles.text.primary}`
              }`}
            >
              {crumb.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}