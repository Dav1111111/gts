import { useState, ReactNode, useEffect } from "react";
import { GTSUnifiedTopbar } from "./GTSUnifiedTopbar";
import { GTSUnifiedSidebar } from "./GTSUnifiedSidebar";
import { GTSMobileCrew } from "./GTSMobileCrew";
import { GTSStyles } from "../../utils/gts-styles";

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

interface GTSUnifiedAppShellProps {
  user: User;
  currentPath: string;
  children: ReactNode;
  onNavigate: (path: string) => void;
  onSearch?: (query: string) => void;
  onLogout: () => void;
  onBackToHome?: () => void;
  notificationCount?: number;
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

function getBreadcrumbs(currentPath: string, role: UserRole): { name: string; path: string }[] {
  const roleDisplayName = getRoleName(role);
  const pathSegments = currentPath.split('/').filter(Boolean);
  
  const breadcrumbs = [
    { name: roleDisplayName, path: '/' }
  ];

  if (pathSegments.length > 0) {
    const currentPage = pathSegments[pathSegments.length - 1];
    const pageNames: Record<string, string> = {
      'dashboard': 'Dashboard',
      'calendar': 'Календарь',
      'crm': 'CRM',
      'partners': 'Партнёры',
      'staff': 'Персонал',
      'finance': 'Финансы',
      'documents': 'Документы',
      'cms': 'CMS',
      'operations': 'Операции',
      'integrations': 'Интеграции',
      'inbox': 'Входящие',
      'iam': 'Права доступа',
      'bookings': 'Бронирования',
      'clients': 'Клиенты',
      'incidents': 'Инциденты',
      'today': 'Сегодня',
      'checklists': 'Чек-листы',
      'guests': 'Гости',
      'chat': 'Чат',
      'incident': 'Инцидент',
      'commissions': 'Комиссии',
      'payouts': 'Выплаты',
      'promo-tools': 'Промо-инструменты',
      'support': 'Поддержка',
      'fleet': 'Флот',
      'sla': 'SLA',
      'loyalty': 'Лояльность',
      'promotions': 'Промо',
      'qr-tools': 'QR/UTM',
      'locations': 'Локации',
      'api': 'API',
      'campaigns': 'Кампании',
      'ab-testing': 'A/B тесты',
      'news': 'Новости',
      'seo': 'SEO',
      'revenue': 'Выручка',
      'costs': 'Расходы',
      'reports': 'Отчёты',
      'users': 'Пользователи',
      'audit': 'Аудит',
      'health': 'Здоровье системы',
      'company': 'Компания',
      'requests': 'Заявки',
      'schedule': 'Расписание',
      'participants': 'Участники',
      'membership': 'Членство',
      'events': 'Мероприятия',
      'wallet': 'Кошелек',
      'concierge': 'Консьерж',
      'settings': 'Настройки'
    };
    
    breadcrumbs.push({
      name: pageNames[currentPage] || currentPage,
      path: currentPath
    });
  }

  return breadcrumbs;
}

export function GTSUnifiedAppShell({ 
  user, 
  currentPath, 
  children, 
  onNavigate, 
  onSearch,
  onLogout, 
  onBackToHome,
  notificationCount = 0 
}: GTSUnifiedAppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  
  const breadcrumbs = getBreadcrumbs(currentPath, user.role);
  const isMobileCrew = ['captain', 'pilot', 'guide', 'mechanic'].includes(user.role);

  // Handle responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mobile Crew Layout
  if (isMobileCrew) {
    return (
      <GTSMobileCrew
        user={user as any}
        currentPath={currentPath}
        onNavigate={onNavigate}
      >
        {children}
      </GTSMobileCrew>
    );
  }

  // Desktop/Tablet Layout
  return (
    <div className={`min-h-screen ${GTSStyles.backgrounds.main} flex`}>
      {/* Sidebar */}
      <GTSUnifiedSidebar
        user={user}
        currentPath={currentPath}
        isCollapsed={sidebarCollapsed}
        onNavigate={onNavigate}
        onLogout={onLogout}
        onBackToHome={onBackToHome}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <GTSUnifiedTopbar
          user={user}
          currentPath={currentPath}
          breadcrumbs={breadcrumbs}
          notificationCount={notificationCount}
          onToggleSidebar={() => setSidebarCollapsed(!sidebarCollapsed)}
          onNavigate={onNavigate}
          onSearch={onSearch}
          onLogout={onLogout}
          onBackToHome={onBackToHome}
        />

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}