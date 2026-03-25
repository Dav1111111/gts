import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar } from "../ui/avatar";
import { 
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

interface GTSUnifiedAdminHeaderProps {
  user?: User;
  currentRole?: string;
  currentPage?: string;
  notificationCount?: number;
  onSearch?: (query: string) => void;
  onLogin: () => void;
  onLogout?: () => void;
  onBackToHome?: () => void;
  className?: string;
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

export function GTSUnifiedAdminHeader({ 
  user,
  currentRole,
  currentPage,
  notificationCount = 0,
  onSearch,
  onLogin,
  onLogout,
  onBackToHome,
  className = ""
}: GTSUnifiedAdminHeaderProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <div className={`bg-[#0B0B0C] border-b border-[#232428] ${className}`.trim()}>
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Side: Logo + Breadcrumbs */}
        <div className="flex items-center gap-6">
          {/* GTS Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#91040C] to-red-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">GTS</span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-white font-semibold text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                Grand Tour Sochi
              </h1>
            </div>
          </div>
          
          {/* Breadcrumbs */}
          {(currentRole || currentPage) && (
            <div className="hidden lg:flex items-center gap-2 text-sm">
              {currentRole && (
                <>
                  <span className="text-white font-medium">{currentRole}</span>
                  {currentPage && <span className="text-[#A6A7AA]">→</span>}
                </>
              )}
              {currentPage && (
                <span className="text-[#A6A7AA]">{currentPage}</span>
              )}
            </div>
          )}
        </div>

        {/* Right Side: Search + Notifications + Profile + Login Button */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <form onSubmit={handleSearch} className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A7AA]" />
            <Input
              type="text"
              placeholder="Поиск..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 pl-10 pr-4 py-2 bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA] focus:border-[#91040C] focus:ring-1 focus:ring-[#91040C]"
            />
          </form>
          
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="text-white hover:bg-[#121214] relative"
          >
            <Bell className="w-5 h-5" />
            {notificationCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#91040C] rounded-full text-xs text-white flex items-center justify-center">
                {notificationCount > 9 ? '9+' : notificationCount}
              </span>
            )}
          </Button>

          {/* User Profile (if authenticated) */}
          {user && onLogout && (
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="text-white hover:bg-[#121214] flex items-center gap-2"
              >
                <Avatar className="w-6 h-6">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                    <span className="text-white text-xs font-medium">{user.name[0]}</span>
                  </div>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-white text-sm font-medium">{user.name}</div>
                  <div className="text-[#A6A7AA] text-xs">{getRoleName(user.role)}</div>
                </div>
                <ChevronDown className="w-4 h-4" />
              </Button>

              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-[#121214] border border-[#232428] rounded-lg shadow-lg z-50">
                  <div className="p-3 border-b border-[#232428]">
                    <div className="text-white text-sm font-medium">{user.name}</div>
                    <div className="text-[#A6A7AA] text-xs">{user.email}</div>
                    <div className="text-[#91040C] text-xs font-medium mt-1">{getRoleName(user.role)}</div>
                  </div>
                  <div className="p-2">
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        // Navigate to settings
                      }}
                      className="w-full flex items-center gap-2 p-2 text-white hover:bg-[#17181A] rounded text-sm transition-colors"
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
                        className="w-full flex items-center gap-2 p-2 text-white hover:bg-[#17181A] rounded text-sm transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        На главную
                      </button>
                    )}
                    <div className="my-1 border-t border-[#232428]"></div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full flex items-center gap-2 p-2 text-white hover:bg-[#17181A] rounded text-sm transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Выйти
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Login Button */}
          <Button
            onClick={onLogin}
            className="bg-[#91040C] hover:bg-[#91040C]/90 text-white font-medium px-4 py-2"
          >
            Вход
          </Button>
        </div>
      </div>

      {/* Mobile Breadcrumbs */}
      {(currentRole || currentPage) && (
        <div className="lg:hidden px-6 pb-3 flex items-center gap-2 text-sm overflow-x-auto">
          {currentRole && (
            <>
              <span className="text-white font-medium whitespace-nowrap">{currentRole}</span>
              {currentPage && <span className="text-[#A6A7AA]">→</span>}
            </>
          )}
          {currentPage && (
            <span className="text-[#A6A7AA] whitespace-nowrap">{currentPage}</span>
          )}
        </div>
      )}
    </div>
  );
}