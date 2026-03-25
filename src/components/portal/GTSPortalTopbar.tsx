import { useState } from "react";
import { Button } from "../ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../ui/breadcrumb";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { 
  Bell,
  ChevronDown,
  User,
  FileText,
  Shield,
  LogOut,
  Settings,
  RefreshCw,
  Menu,
  ArrowLeft,
  Home
} from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "warning" | "success" | "error";
}

interface GTSPortalTopbarProps {
  currentRole?: {
    id: string;
    name: string;
    type: "partner-agent" | "contractor" | "brand-partner";
  };
  breadcrumbs?: BreadcrumbItem[];
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  notifications?: NotificationItem[];
  onToggleSidebar?: () => void;
  onRoleSwitch?: () => void;
  onProfileClick?: () => void;
  onDocumentsClick?: () => void;
  onSecurityClick?: () => void;
  onSignOut?: () => void;
  onBackToEntry?: () => void;
  title?: string;
  subtitle?: string;
  userRole?: string;
  userName?: string;
  onBack?: () => void;
}

export function GTSPortalTopbar({
  currentRole,
  breadcrumbs = [],
  user,
  notifications = [],
  onToggleSidebar,
  onRoleSwitch,
  onProfileClick,
  onDocumentsClick,
  onSecurityClick,
  onSignOut,
  onBackToEntry,
  title,
  subtitle,
  userRole,
  userName,
  onBack
}: GTSPortalTopbarProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const getRoleBadgeColor = (type: string) => {
    switch (type) {
      case "partner-agent": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "contractor": return "bg-orange-500/20 text-orange-400 border-orange-500/30";
      case "brand-partner": return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning": return "⚠️";
      case "success": return "✅";
      case "error": return "❌";
      default: return "ℹ️";
    }
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 bg-gray-900 backdrop-blur-sm">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        
        {/* Left Side - Logo, Sidebar Toggle, Breadcrumbs */}
        <div className="flex items-center space-x-6">
          {/* Back to Admin Button */}
          {(onBack || onBackToEntry) && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack || onBackToEntry}
              className="text-gray-400 hover:text-white hover:bg-gray-800"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Панель управления</span>
              <span className="sm:hidden">Назад</span>
            </Button>
          )}

          {/* Mobile Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleSidebar}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <Menu className="w-5 h-5" />
          </Button>

          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="text-2xl font-bold tracking-wider text-white">
              GTS
            </div>
            <div className="hidden sm:block w-px h-6 bg-gray-700"></div>
          </div>

          {/* Role Badge */}
          {currentRole && (
            <Badge 
              className={`hidden sm:flex text-xs rounded-lg cursor-pointer ${getRoleBadgeColor(currentRole.type)}`}
              onClick={onRoleSwitch}
            >
              {currentRole.name}
              <RefreshCw className="w-3 h-3 ml-1" />
            </Badge>
          )}
          
          {/* Portal Title */}
          {title && (
            <div className="hidden sm:block">
              <h1 className="text-lg font-semibold text-white">
                {title}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-400 mt-0.5">
                  {subtitle}
                </p>
              )}
            </div>
          )}

          {/* Breadcrumbs - Hidden on mobile */}
          <div className="hidden md:block">
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => (
                  <div key={index} className="flex items-center">
                    {index > 0 && (
                      <BreadcrumbSeparator style={{ color: '#A6A7AA' }} />
                    )}
                    <BreadcrumbItem>
                      {crumb.href ? (
                        <BreadcrumbLink 
                          href={crumb.href}
                          className="text-sm text-gray-400"
                        >
                          {crumb.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-sm text-white">
                          {crumb.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </div>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right Side - Notifications, User Menu */}
        <div className="flex items-center space-x-4">
          
          {/* Notifications */}
          <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="relative text-gray-400 hover:text-white"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs font-medium flex items-center justify-center bg-[#91040C] text-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-80 bg-gray-800 border-gray-700 text-white"
            >
              <div className="p-3 border-b border-gray-700">
                <h3 className="font-medium text-white">
                  Уведомления
                </h3>
                <p className="text-sm text-gray-400">
                  {unreadCount} новых уведомлений
                </p>
              </div>
              
              <div className="max-h-80 overflow-y-auto">
                {notifications.slice(0, 5).map((notification) => (
                  <div 
                    key={notification.id}
                    className={`p-3 border-b border-gray-700 cursor-pointer hover:bg-gray-700/50 ${
                      !notification.read ? 'bg-gray-700/30' : ''
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="text-sm flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-white">
                          {notification.title}
                        </p>
                        <p className="text-xs mt-1 text-gray-400">
                          {notification.message}
                        </p>
                        <p className="text-xs mt-1 text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                      {!notification.read && (
                        <div className="w-2 h-2 rounded-full flex-shrink-0 mt-2 bg-[#91040C]" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-3 border-t border-gray-700">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="w-full text-[#91040C] hover:bg-[#91040C]/10"
                >
                  Показать все уведомления
                </Button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                className="flex items-center space-x-3 px-2"
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || userName} />
                  <AvatarFallback className="text-sm font-medium bg-gray-800 text-white">
                    {(user?.name || userName || 'U').split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden sm:block text-left">
                  <p 
                    className="text-sm font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {user?.name || userName}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {user?.email || userRole}
                  </p>
                </div>
                <ChevronDown className="w-4 h-4" style={{ color: '#A6A7AA' }} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              align="end" 
              className="w-56"
              style={{ 
                backgroundColor: '#17181A', 
                borderColor: '#232428',
                color: '#FFFFFF'
              }}
            >
              <div className="p-3 border-b" style={{ borderColor: '#232428' }}>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {user?.name || userName}
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {user?.email || userRole}
                </p>
                {currentRole && (
                  <Badge 
                    className={`mt-2 text-xs rounded-lg ${getRoleBadgeColor(currentRole.type)}`}
                    style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                  >
                    {currentRole.name}
                  </Badge>
                )}
              </div>
              
              {onProfileClick && (
                <DropdownMenuItem 
                  onClick={onProfileClick}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <User className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Профиль
                  </span>
                </DropdownMenuItem>
              )}
              
              {onDocumentsClick && (
                <DropdownMenuItem 
                  onClick={onDocumentsClick}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Документы
                  </span>
                </DropdownMenuItem>
              )}
              
              {onSecurityClick && (
                <DropdownMenuItem 
                  onClick={onSecurityClick}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Shield className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Безопасность
                  </span>
                </DropdownMenuItem>
              )}

              {onRoleSwitch && (
                <DropdownMenuItem 
                  onClick={onRoleSwitch}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Сменить роль
                  </span>
                </DropdownMenuItem>
              )}

              {(onBackToEntry || onBack) && (
                <DropdownMenuItem 
                  onClick={onBackToEntry || onBack}
                  className="cursor-pointer"
                  style={{ color: '#FFFFFF' }}
                >
                  <Home className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Панель управления
                  </span>
                </DropdownMenuItem>
              )}
              
              <DropdownMenuSeparator style={{ backgroundColor: '#232428' }} />
              
              {onSignOut && (
                <DropdownMenuItem 
                  onClick={onSignOut}
                  className="cursor-pointer"
                  style={{ color: '#E5484D' }}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  <span style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Выйти
                  </span>
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}