import { useState } from "react";
import { GTSLoginRolePicker } from "../auth/GTSLoginRolePicker";
import { GTSAppShell } from "../shell/GTSAppShell";
import { GTSUIKit } from "../ui-kit/GTSUIKit";
import { GTSExecutiveDashboard } from "../modules/GTSExecutiveDashboard";

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

interface GTSUnifiedSystemProps {
  onBackToHome?: () => void;
}

/**
 * GTSUnifiedSystem - Центральная точка входа в унифицированную систему GTS
 * 
 * Объединяет:
 * - 01_Login_RolePicker - выбор роли
 * - 02_App_Shell - единый каркас
 * - 03_Executive_Dashboard и другие модули
 * 
 * Заменяет разрозненные:
 * - [LEGACY] GTSUnifiedAdminPortal
 * - [LEGACY] AdminDashboard  
 * - [LEGACY] различные порталы
 */

export function GTSUnifiedSystem({ onBackToHome }: GTSUnifiedSystemProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleRoleSelect = (role: UserRole) => {
    // Mock user creation based on role
    const mockUser: User = {
      id: `user_${Date.now()}`,
      name: getMockUserName(role),
      email: getMockUserEmail(role),
      role: role
    };
    
    setCurrentUser(mockUser);
    setIsAuthenticated(true);
    setCurrentPath(getDefaultPath(role));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
    setCurrentPath('/dashboard');
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  // If showing UI Kit
  if (currentPath === '/ui-kit') {
    return <GTSUIKit />;
  }

  // If not authenticated, show role picker
  if (!isAuthenticated || !currentUser) {
    return (
      <GTSLoginRolePicker 
        onRoleSelect={handleRoleSelect}
        onBackToHome={onBackToHome}
      />
    );
  }

  // Render appropriate content based on current path
  const renderContent = () => {
    switch (currentPath) {
      case '/dashboard':
        if (currentUser.role === 'executive') {
          return <GTSExecutiveDashboard />;
        }
        return <ModulePlaceholder title="Dashboard" description={`Dashboard для роли ${currentUser.role}`} />;
      
      case '/calendar':
        return <ModulePlaceholder title="Global Calendar" description="Система управления бронированиями и ресурсами" />;
      
      case '/crm':
        return <ModulePlaceholder title="CRM" description="Управление лидами, клиентами и сделками" />;
      
      case '/partners':
        return <ModulePlaceholder title="Partners" description="Управление агентами, подрядчиками и брендами" />;
      
      case '/staff':
        return <ModulePlaceholder title="Staff & IAM" description="Управление персоналом и правами доступа" />;
      
      case '/finance':
        return <ModulePlaceholder title="Finance" description="Финансовые отчеты и выплаты" />;
      
      case '/documents':
        return <ModulePlaceholder title="Documents & Inbox" description="Документооборот и уведомления" />;
      
      case '/cms':
        return <ModulePlaceholder title="CMS" description="Управление контентом и предложениями" />;
      
      case '/settings':
        return <ModulePlaceholder title="Settings & Integrations" description="Настройки системы и интеграции" />;
      
      default:
        return <ModulePlaceholder title="В разработке" description={`Модуль ${currentPath} находится в разработке`} />;
    }
  };

  return (
    <GTSAppShell
      user={currentUser}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onLogout={handleLogout}
      onBackToHome={onBackToHome}
    >
      {renderContent()}
    </GTSAppShell>
  );
}

// Helper function to render module placeholders
function ModulePlaceholder({ title, description }: { title: string; description: string }) {
  return (
    <div className="p-6">
      <div className="bg-[--gts-portal-surface] border border-[--gts-portal-border] rounded-lg p-8 text-center">
        <h1 className="text-2xl text-[--gts-portal-text] mb-4" style={{ fontFamily: 'var(--font-heading)' }}>
          {title}
        </h1>
        <p className="text-[--gts-portal-muted]">{description}</p>
        <div className="mt-6 text-sm text-[--gts-portal-muted]">
          Модуль будет реализован на следующем этапе разработки
        </div>
      </div>
    </div>
  );
}

// Helper functions for mock data
function getMockUserName(role: UserRole): string {
  const names: Record<UserRole, string> = {
    'guest': 'Гость',
    'user': 'Иван Петров',
    'member-bronze': 'Анна Сидорова',
    'member-silver': 'Михаил Иванов',
    'member-gold': 'Елена Козлова',
    'member-platinum': 'Александр Смирнов',
    'partner-agent': 'Дмитрий Агентов',
    'contractor': 'Сергей Подрядчиков',
    'brand-partner': 'Ольга Брендовна',
    'ambassador': 'Игорь Амбассадоров',
    'operator': 'Мария Операторова',
    'dispatcher': 'Андрей Диспетчеров',
    'site-admin': 'Татьяна Админова',
    'captain': 'Капитан Морской',
    'pilot': 'Пилот Воздушный',
    'guide': 'Гид Экскурсионный',
    'mechanic': 'Механик Технический',
    'support': 'Поддержка Клиентская',
    'marketing': 'Маркетолог Промо',
    'finance': 'Финансист Отчётный',
    'executive': 'Руководитель Главный',
    'sys-admin': 'Системный Администратор',
    'b2b-owner': 'Владелец Компании',
    'b2b-finance': 'Финдиректор Корпорации',
    'b2b-coordinator': 'Координатор Мероприятий'
  };
  return names[role] || 'Пользователь';
}

function getMockUserEmail(role: UserRole): string {
  const domains = {
    'executive': 'ceo@gts.ru',
    'marketing': 'marketing@gts.ru',
    'finance': 'finance@gts.ru',
    'sys-admin': 'admin@gts.ru'
  };
  return domains[role as keyof typeof domains] || `${role}@gts.ru`;
}

function getDefaultPath(role: UserRole): string {
  // Most roles start with dashboard
  if (['captain', 'pilot', 'guide', 'mechanic'].includes(role)) {
    return '/today'; // Crew starts with Today view
  }
  
  if (['operator', 'dispatcher', 'site-admin'].includes(role)) {
    return '/operations'; // Operations staff starts with Operations Today
  }
  
  return '/dashboard'; // Default for all other roles
}