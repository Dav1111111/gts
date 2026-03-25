import React, { useState } from 'react';
import { User, Building, FileText, Bell, Activity, Home, Users, Settings, Shield, MessageSquare, CreditCard } from 'lucide-react';
import { GTSSharedTopbar } from './GTSSharedTopbar';
import { GTSSharedSidebar } from './GTSSharedSidebar';
import { GTSSharedProfile } from './GTSSharedProfile';
import { GTSSharedDocuments } from './GTSSharedDocuments';
import { GTSSharedNotifications } from './GTSSharedNotifications';
import { GTSSharedAudit } from './GTSSharedAudit';
import { 
  GTSPortalLayout, 
  GTSLoadingSpinner, 
  GTSEmptyState, 
  GTSErrorState, 
  GTSNoPermission,
  getDefaultMobileNavItems
} from './GTSSharedStates';

// Types for role and permissions
type UserRole = 'partner-agent' | 'contractor' | 'brand-partner' | 'admin';

interface Role {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface GTSSharedModulesProps {
  currentUser: User;
  availableRoles: Role[];
  onRoleChange: (roleId: string) => void;
  onBackToPortal?: () => void;
  onLogout: () => void;
}

// Mock data for demonstration
const mockProfileData = {
  firstName: 'Александр',
  lastName: 'Петров',
  email: 'alexander.petrov@example.com',
  phone: '+7 (999) 123-45-67',
  position: 'Менеджер по развитию бизнеса',
  avatar: undefined
};

const mockCompanyData = {
  name: 'ООО "Активный отдых"',
  legalName: 'Общество с ограниченной ответственностью "Активный отдых"',
  inn: '7707083893',
  kpp: '770701001',
  ogrn: '1027700132195',
  address: 'г. Сочи, ул. Морская, д. 15',
  legalAddress: 'г. Сочи, ул. Морская, д. 15',
  phone: '+7 (862) 555-01-23',
  email: 'info@activerest.com',
  website: 'https://activerest.com'
};

const mockBankingData = {
  bankName: 'ПАО Сбербанк',
  bik: '044525225',
  accountNumber: '40702810555000123456',
  correspondentAccount: '30101810400000000225'
};

const mockNotificationSettings = {
  emailBookings: true,
  emailPromotions: false,
  emailNews: true,
  whatsappBookings: true,
  whatsappPromotions: false,
  whatsappNews: false
};

const mockSecuritySettings = {
  twoFactorEnabled: false,
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
};

const mockDocuments = [
  {
    id: 'doc1',
    name: 'Договор партнерства GTS-2024-001',
    type: 'contract' as const,
    status: 'active' as const,
    createdDate: '2024-01-15',
    validUntil: '2024-12-31',
    size: '2.3 MB',
    downloadUrl: '/documents/contract-001.pdf',
    description: 'Основной договор партнерства на 2024 год'
  },
  {
    id: 'doc2',
    name: 'Акт выполненных работ за январь 2024',
    type: 'act' as const,
    status: 'pending' as const,
    createdDate: '2024-02-01',
    size: '1.8 MB',
    downloadUrl: '/documents/act-jan-2024.pdf'
  }
];

const mockNotifications = [
  {
    id: 'notif1',
    title: 'Новое бронирование',
    message: 'Получено новое бронирование катера Yamaha 252S на 15 марта',
    type: 'info' as const,
    timestamp: '2024-03-01T10:30:00Z',
    read: false,
    actionUrl: '/bookings/new',
    actionLabel: 'Просмотреть'
  },
  {
    id: 'notif2',
    title: 'Требуется подпись документа',
    message: 'Акт выполненных работ за февраль готов к подписанию',
    type: 'warning' as const,
    timestamp: '2024-03-01T09:15:00Z',
    read: false,
    actionUrl: '/documents/sign',
    actionLabel: 'Подписать'
  }
];

const mockTickets = [
  {
    id: 'tick1',
    subject: 'Проблемы с загрузкой документов',
    status: 'open' as const,
    priority: 'medium' as const,
    category: 'technical' as const,
    createdAt: '2024-02-28T14:20:00Z',
    updatedAt: '2024-03-01T08:45:00Z',
    assignee: {
      name: 'Анна Смирнова',
      avatar: undefined
    },
    messagesCount: 3
  }
];

const mockAuditEntries = [
  {
    id: 'audit1',
    timestamp: '2024-03-01T11:30:00Z',
    action: 'Вход в систему',
    page: '/dashboard',
    actor: {
      id: 'user1',
      name: 'Александр Петров',
      avatar: undefined,
      role: 'Partner Agent'
    },
    details: 'Успешная аутентификация пользователя',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    level: 'info' as const,
    category: 'auth' as const
  },
  {
    id: 'audit2',
    timestamp: '2024-03-01T11:25:00Z',
    action: 'Обновление профиля',
    page: '/profile',
    actor: {
      id: 'user1',
      name: 'Александр Петров',
      avatar: undefined,
      role: 'Partner Agent'
    },
    details: 'Изменены контактные данные пользователя',
    ip: '192.168.1.100',
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    level: 'success' as const,
    category: 'profile' as const
  }
];

export function GTSSharedModules({
  currentUser,
  availableRoles,
  onRoleChange,
  onBackToPortal,
  onLogout
}: GTSSharedModulesProps) {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'profile' | 'documents' | 'notifications' | 'audit'>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Find current role
  const currentRole = availableRoles.find(role => role.id === currentUser.role) || availableRoles[0];

  // Breadcrumbs based on current page
  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [
      { label: 'GTS Portal', href: '/portal' }
    ];

    switch (currentPage) {
      case 'dashboard':
        return [...baseBreadcrumbs, { label: 'Главная' }];
      case 'profile':
        return [...baseBreadcrumbs, { label: 'Профиль' }];
      case 'documents':
        return [...baseBreadcrumbs, { label: 'Документы' }];
      case 'notifications':
        return [...baseBreadcrumbs, { label: 'Уведомления' }];
      case 'audit':
        return [...baseBreadcrumbs, { label: 'Журнал активности' }];
      default:
        return baseBreadcrumbs;
    }
  };

  // Sidebar items based on role
  const getSidebarItems = () => {
    const commonItems = [
      {
        id: 'dashboard',
        label: 'Главная',
        icon: <Home className="h-5 w-5" />,
        onClick: () => setCurrentPage('dashboard')
      },
      {
        id: 'profile',
        label: 'Профиль',
        icon: <User className="h-5 w-5" />,
        onClick: () => setCurrentPage('profile')
      },
      {
        id: 'documents',
        label: 'Документы',
        icon: <FileText className="h-5 w-5" />,
        onClick: () => setCurrentPage('documents')
      },
      {
        id: 'notifications',
        label: 'Уведомления',
        icon: <Bell className="h-5 w-5" />,
        onClick: () => setCurrentPage('notifications'),
        badge: '2'
      }
    ];

    // Add audit for admin users
    if (currentUser.role === 'admin') {
      commonItems.push({
        id: 'audit',
        label: 'Журнал активности',
        icon: <Activity className="h-5 w-5" />,
        onClick: () => setCurrentPage('audit')
      });
    }

    return commonItems;
  };

  // Mobile navigation items
  const mobileNavItems = getDefaultMobileNavItems(
    currentUser.role,
    (page: string) => setCurrentPage(page as any),
    2 // notification count
  );

  // Handlers
  const handleSaveProfile = (data: any) => {
    setLoading(true);
    setTimeout(() => {
      console.log('Saving profile:', data);
      setLoading(false);
    }, 1000);
  };

  const handleSaveCompany = (data: any) => {
    console.log('Saving company:', data);
  };

  const handleSaveBanking = (data: any) => {
    console.log('Saving banking:', data);
  };

  const handleSaveNotifications = (settings: any) => {
    console.log('Saving notification settings:', settings);
  };

  const handleSaveSecurity = (settings: any) => {
    console.log('Saving security settings:', settings);
  };

  const handleAvatarUpload = (file: File) => {
    console.log('Uploading avatar:', file);
  };

  // Render page content
  const renderPageContent = () => {
    if (loading) {
      return <GTSLoadingSpinner message="Загрузка данных..." />;
    }

    switch (currentPage) {
      case 'dashboard':
        return (
          <div className="p-6">
            <h1 className="text-2xl font-heading text-[var(--gts-portal-text)] mb-4">
              Добро пожаловать, {currentUser.name}!
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-[var(--gts-portal-card)] border border-[var(--gts-portal-border)] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--gts-portal-accent)]/20 rounded-lg">
                    <User className="h-6 w-6 text-[var(--gts-portal-accent)]" />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">Профиль</h3>
                </div>
                <p className="text-[var(--gts-portal-muted)] mb-4">
                  Управление личными данными и настройками
                </p>
                <button
                  onClick={() => setCurrentPage('profile')}
                  className="text-[var(--gts-portal-accent)] hover:underline"
                >
                  Перейти к профилю →
                </button>
              </div>

              <div className="bg-[var(--gts-portal-card)] border border-[var(--gts-portal-border)] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <FileText className="h-6 w-6 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">Документы</h3>
                </div>
                <p className="text-[var(--gts-portal-muted)] mb-4">
                  Центр управления документами и договорами
                </p>
                <button
                  onClick={() => setCurrentPage('documents')}
                  className="text-[var(--gts-portal-accent)] hover:underline"
                >
                  Открыть документы →
                </button>
              </div>

              <div className="bg-[var(--gts-portal-card)] border border-[var(--gts-portal-border)] rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-[var(--gts-portal-warning)]/20 rounded-lg">
                    <Bell className="h-6 w-6 text-[var(--gts-portal-warning)]" />
                  </div>
                  <h3 className="text-lg font-medium text-[var(--gts-portal-text)]">Уведомления</h3>
                </div>
                <p className="text-[var(--gts-portal-muted)] mb-4">
                  Управление уведомлениями и поддержкой
                </p>
                <button
                  onClick={() => setCurrentPage('notifications')}
                  className="text-[var(--gts-portal-accent)] hover:underline"
                >
                  Просмотреть уведомления →
                </button>
              </div>
            </div>
          </div>
        );

      case 'profile':
        return (
          <GTSSharedProfile
            profileData={mockProfileData}
            companyData={mockCompanyData}
            bankingData={mockBankingData}
            notificationSettings={mockNotificationSettings}
            securitySettings={mockSecuritySettings}
            onSaveProfile={handleSaveProfile}
            onSaveCompany={handleSaveCompany}
            onSaveBanking={handleSaveBanking}
            onSaveNotifications={handleSaveNotifications}
            onSaveSecurity={handleSaveSecurity}
            onAvatarUpload={handleAvatarUpload}
          />
        );

      case 'documents':
        return (
          <GTSSharedDocuments
            documents={mockDocuments}
            stats={{
              total: 15,
              active: 12,
              pending: 2,
              expired: 1
            }}
            onDownload={(docId) => console.log('Download:', docId)}
            onView={(docId) => console.log('View:', docId)}
            userRole={currentUser.role}
          />
        );

      case 'notifications':
        return (
          <GTSSharedNotifications
            notifications={mockNotifications}
            tickets={mockTickets}
            onMarkNotificationRead={(id) => console.log('Mark read:', id)}
            onMarkAllNotificationsRead={() => console.log('Mark all read')}
            onNotificationAction={(id, url) => console.log('Action:', id, url)}
            onCreateTicket={(ticket) => console.log('Create ticket:', ticket)}
            onViewTicket={(id) => console.log('View ticket:', id)}
          />
        );

      case 'audit':
        if (currentUser.role !== 'admin') {
          return (
            <GTSNoPermission
              title="Доступ ограничен"
              description="Журнал активности доступен только администраторам"
              requiredRole="Администратор"
              onContactSupport={() => console.log('Contact support')}
            />
          );
        }
        return (
          <GTSSharedAudit
            entries={mockAuditEntries}
            stats={{
              totalEntries: 1247,
              todayEntries: 23,
              uniqueUsers: 8,
              criticalEvents: 0
            }}
            userRole={currentUser.role}
            canViewFullDetails={true}
          />
        );

      default:
        return (
          <GTSEmptyState
            title="Страница не найдена"
            description="Запрашиваемая страница не существует"
            action={{
              label: 'Вернуться на главную',
              onClick: () => setCurrentPage('dashboard')
            }}
          />
        );
    }
  };

  const topbar = (
    <GTSSharedTopbar
      currentRole={currentRole}
      availableRoles={availableRoles}
      onRoleChange={onRoleChange}
      breadcrumbs={getBreadcrumbs()}
      notificationCount={2}
      onNotificationsClick={() => setCurrentPage('notifications')}
      onProfileClick={() => setCurrentPage('profile')}
      onSettingsClick={() => console.log('Settings')}
      onLogout={onLogout}
      onMenuToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      userInfo={{
        name: currentUser.name,
        email: currentUser.email,
        avatar: currentUser.avatar
      }}
    />
  );

  const sidebar = (
    <GTSSharedSidebar
      isCollapsed={sidebarCollapsed}
      onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      activeItemId={currentPage}
      onItemClick={(itemId) => setCurrentPage(itemId as any)}
      items={getSidebarItems()}
      logo={
        <div className="flex items-center gap-2">
          <div className="text-xl font-heading text-[var(--gts-portal-text)]">GTS</div>
          <div className="text-sm text-[var(--gts-portal-muted)]">Portal</div>
        </div>
      }
    />
  );

  return (
    <GTSPortalLayout
      topbar={topbar}
      sidebar={sidebar}
      mobileNavItems={mobileNavItems}
      activeMobileNavId={currentPage}
    >
      {renderPageContent()}
    </GTSPortalLayout>
  );
}