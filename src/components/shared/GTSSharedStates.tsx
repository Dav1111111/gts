import React from 'react';
import { Loader2, FileX, AlertTriangle, Shield, Wifi, RefreshCw, Home, Users, FileText, Settings, Bell } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

// Loading States
export function GTSLoadingSpinner({ message = "Загрузка..." }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <Loader2 className="h-8 w-8 animate-spin text-[var(--gts-portal-accent)]" />
      <p className="text-[var(--gts-portal-muted)]">{message}</p>
    </div>
  );
}

export function GTSLoadingCard() {
  return (
    <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center space-x-4">
          <Skeleton className="h-12 w-12 rounded-full bg-[var(--gts-portal-surface)]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px] bg-[var(--gts-portal-surface)]" />
            <Skeleton className="h-4 w-[200px] bg-[var(--gts-portal-surface)]" />
          </div>
        </div>
        <Skeleton className="h-4 w-full bg-[var(--gts-portal-surface)]" />
        <Skeleton className="h-4 w-3/4 bg-[var(--gts-portal-surface)]" />
      </CardContent>
    </Card>
  );
}

export function GTSLoadingTable({ rows = 5, columns = 4 }: { rows?: number; columns?: number }) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: columns }).map((_, i) => (
          <Skeleton key={i} className="h-6 bg-[var(--gts-portal-surface)]" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4">
          {Array.from({ length: columns }).map((_, j) => (
            <Skeleton key={j} className="h-8 bg-[var(--gts-portal-surface)]" />
          ))}
        </div>
      ))}
    </div>
  );
}

// Empty States
interface GTSEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function GTSEmptyState({ 
  icon = <FileX className="h-12 w-12" />, 
  title, 
  description, 
  action 
}: GTSEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="text-[var(--gts-portal-muted)]">
        {icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">{title}</h3>
        <p className="text-[var(--gts-portal-muted)] max-w-sm">{description}</p>
      </div>
      {action && (
        <Button 
          onClick={action.onClick}
          className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}

// Error States
interface GTSErrorStateProps {
  title?: string;
  description?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  type?: 'network' | 'server' | 'generic';
}

export function GTSErrorState({ 
  title, 
  description, 
  showRetry = true, 
  onRetry,
  type = 'generic'
}: GTSErrorStateProps) {
  const getErrorContent = () => {
    switch (type) {
      case 'network':
        return {
          icon: <Wifi className="h-12 w-12" />,
          title: title || 'Проблемы с подключением',
          description: description || 'Проверьте подключение к интернету и попробуйте снова'
        };
      case 'server':
        return {
          icon: <AlertTriangle className="h-12 w-12" />,
          title: title || 'Ошибка сервера',
          description: description || 'Произошла ошибка на сервере. Попробуйте позже'
        };
      default:
        return {
          icon: <AlertTriangle className="h-12 w-12" />,
          title: title || 'Что-то пошло не так',
          description: description || 'Произошла неожиданная ошибка'
        };
    }
  };

  const errorContent = getErrorContent();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="text-[var(--gts-portal-error)]">
        {errorContent.icon}
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">{errorContent.title}</h3>
        <p className="text-[var(--gts-portal-muted)] max-w-sm">{errorContent.description}</p>
      </div>
      {showRetry && onRetry && (
        <Button 
          onClick={onRetry}
          variant="outline"
          className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Попробовать снова
        </Button>
      )}
    </div>
  );
}

// No Permission State
interface GTSNoPermissionProps {
  title?: string;
  description?: string;
  requiredRole?: string;
  contactSupport?: boolean;
  onContactSupport?: () => void;
}

export function GTSNoPermission({ 
  title = 'Нет доступа',
  description = 'У вас недостаточно прав для просмотра этой страницы',
  requiredRole,
  contactSupport = true,
  onContactSupport
}: GTSNoPermissionProps) {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="text-[var(--gts-portal-warning)]">
        <Shield className="h-12 w-12" />
      </div>
      <div className="space-y-2">
        <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">{title}</h3>
        <p className="text-[var(--gts-portal-muted)] max-w-sm">{description}</p>
        {requiredRole && (
          <p className="text-sm text-[var(--gts-portal-warning)]">
            Необходимая роль: {requiredRole}
          </p>
        )}
      </div>
      {contactSupport && onContactSupport && (
        <Button 
          onClick={onContactSupport}
          variant="outline"
          className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
        >
          Связаться с поддержкой
        </Button>
      )}
    </div>
  );
}

// Mobile Bottom Navigation
interface MobileNavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: number;
  onClick: () => void;
}

interface GTSMobileNavProps {
  items: MobileNavItem[];
  activeItemId: string;
}

export function GTSMobileNav({ items, activeItemId }: GTSMobileNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[var(--gts-portal-surface)] border-t border-[var(--gts-portal-border)] p-2 md:hidden z-50">
      <div className="flex justify-around items-center">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={item.onClick}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-colors relative ${
              activeItemId === item.id
                ? 'text-[var(--gts-portal-accent)] bg-[var(--gts-portal-accent)]/10'
                : 'text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]'
            }`}
          >
            <div className="relative">
              {item.icon}
              {item.badge && item.badge > 0 && (
                <span className="absolute -top-2 -right-2 bg-[var(--gts-portal-error)] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </div>
            <span className="text-xs mt-1 font-medium">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Combined Portal Layout with Mobile Support
interface GTSPortalLayoutProps {
  children: React.ReactNode;
  sidebar: React.ReactNode;
  topbar: React.ReactNode;
  mobileNavItems?: MobileNavItem[];
  activeMobileNavId?: string;
  className?: string;
}

export function GTSPortalLayout({ 
  children, 
  sidebar, 
  topbar, 
  mobileNavItems,
  activeMobileNavId,
  className = ""
}: GTSPortalLayoutProps) {
  return (
    <div className={`min-h-screen bg-[var(--gts-portal-bg)] ${className}`}>
      {/* Desktop Layout */}
      <div className="hidden md:flex h-screen">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          {sidebar}
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Topbar */}
          {topbar}
          
          {/* Content */}
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Topbar */}
        {topbar}
        
        {/* Content with bottom padding for mobile nav */}
        <main className="pb-20">
          {children}
        </main>
        
        {/* Mobile Navigation */}
        {mobileNavItems && activeMobileNavId && (
          <GTSMobileNav 
            items={mobileNavItems} 
            activeItemId={activeMobileNavId} 
          />
        )}
      </div>
    </div>
  );
}

// Default Mobile Nav Items for different roles
export const getDefaultMobileNavItems = (
  role: 'partner-agent' | 'contractor' | 'brand-partner' | 'admin',
  onNavigate: (page: string) => void,
  notificationCount = 0
): MobileNavItem[] => {
  const commonItems: MobileNavItem[] = [
    {
      id: 'dashboard',
      label: 'Главная',
      icon: <Home className="h-5 w-5" />,
      onClick: () => onNavigate('dashboard')
    },
    {
      id: 'profile',
      label: 'Профиль',
      icon: <Users className="h-5 w-5" />,
      onClick: () => onNavigate('profile')
    },
    {
      id: 'documents',
      label: 'Документы',
      icon: <FileText className="h-5 w-5" />,
      onClick: () => onNavigate('documents')
    }
  ];

  // Add notifications with badge
  if (notificationCount > 0) {
    commonItems.push({
      id: 'notifications',
      label: 'Уведомления',
      icon: <Bell className="h-5 w-5" />,
      badge: notificationCount,
      onClick: () => onNavigate('notifications')
    });
  } else {
    commonItems.push({
      id: 'notifications',
      label: 'Уведомления',
      icon: <Bell className="h-5 w-5" />,
      onClick: () => onNavigate('notifications')
    });
  }

  // Add settings
  commonItems.push({
    id: 'settings',
    label: 'Настройки',
    icon: <Settings className="h-5 w-5" />,
    onClick: () => onNavigate('settings')
  });

  return commonItems;
};