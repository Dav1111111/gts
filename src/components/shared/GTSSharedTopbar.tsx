import React from 'react';
import { Bell, ChevronDown, User, Settings, LogOut, Menu } from 'lucide-react';
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb';

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface GTSSharedTopbarProps {
  currentRole: Role;
  availableRoles: Role[];
  onRoleChange: (roleId: string) => void;
  breadcrumbs: BreadcrumbItem[];
  notificationCount: number;
  onNotificationsClick: () => void;
  onProfileClick: () => void;
  onSettingsClick: () => void;
  onLogout: () => void;
  onMenuToggle: () => void;
  userInfo: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export function GTSSharedTopbar({
  currentRole,
  availableRoles,
  onRoleChange,
  breadcrumbs,
  notificationCount,
  onNotificationsClick,
  onProfileClick,
  onSettingsClick,
  onLogout,
  onMenuToggle,
  userInfo
}: GTSSharedTopbarProps) {
  return (
    <header className="bg-[var(--gts-portal-surface)] border-b border-[var(--gts-portal-border)] px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left section - Menu, Logo, Breadcrumbs */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="text-xl font-heading text-[var(--gts-portal-text)]">GTS</div>
            <div className="h-6 w-[1px] bg-[var(--gts-portal-border)]" />
            
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink 
                          href={item.href}
                          className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                        >
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage className="text-[var(--gts-portal-text)]">
                          {item.label}
                        </BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* Right section - Role Switcher, Notifications, User Menu */}
        <div className="flex items-center gap-3">
          {/* Role Switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm"
                className="flex items-center gap-2 text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
              >
                <div className={`w-2 h-2 rounded-full ${currentRole.color}`} />
                <span className="hidden sm:inline">{currentRole.name}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
              {availableRoles.map((role) => (
                <DropdownMenuItem
                  key={role.id}
                  onClick={() => onRoleChange(role.id)}
                  className={`flex items-center gap-2 text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)] ${
                    currentRole.id === role.id ? 'bg-[var(--gts-portal-card)]' : ''
                  }`}
                >
                  {role.icon}
                  <span>{role.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onNotificationsClick}
            className="relative text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
          >
            <Bell className="h-5 w-5" />
            {notificationCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-[var(--gts-portal-accent)]"
              >
                {notificationCount > 99 ? '99+' : notificationCount}
              </Badge>
            )}
          </Button>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-2 text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
                  <AvatarFallback className="bg-[var(--gts-portal-card)] text-[var(--gts-portal-text)]">
                    {userInfo.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block text-left">
                  <div className="text-sm">{userInfo.name}</div>
                  <div className="text-xs text-[var(--gts-portal-muted)]">{userInfo.email}</div>
                </div>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
              <DropdownMenuItem
                onClick={onProfileClick}
                className="flex items-center gap-2 text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
              >
                <User className="h-4 w-4" />
                <span>Профиль</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={onSettingsClick}
                className="flex items-center gap-2 text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-card)]"
              >
                <Settings className="h-4 w-4" />
                <span>Настройки</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-[var(--gts-portal-border)]" />
              <DropdownMenuItem
                onClick={onLogout}
                className="flex items-center gap-2 text-[var(--gts-portal-error)] hover:bg-[var(--gts-portal-card)]"
              >
                <LogOut className="h-4 w-4" />
                <span>Выйти</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}