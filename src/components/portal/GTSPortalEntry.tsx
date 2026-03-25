import { useState } from "react";
import { GTSPortalLogin } from "./GTSPortalLogin";
import { GTSPortal2FA } from "./GTSPortal2FA";
import { GTSPortalRoleConsent } from "./GTSPortalRoleConsent";
import { GTSPortalRoleSwitcher } from "./GTSPortalRoleSwitcher";
import { GTSPortalTopbar } from "./GTSPortalTopbar";
import { GTSPortalSidebar } from "./GTSPortalSidebar";
import { GTSPartnerAgentPortal } from "./GTSPartnerAgentPortal";
import { GTSContractorPortal } from "./GTSContractorPortal";
import { Card } from "../ui/card";

type AuthStep = "login" | "2fa" | "role-consent" | "role-switcher" | "authenticated";

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  isFirstTime: boolean;
  roles: Role[];
}

interface Role {
  id: string;
  name: string;
  type: "partner-agent" | "contractor" | "brand-partner";
  description: string;
  permissions: string[];
  organization: string;
  status: "active" | "pending" | "suspended";
  lastAccessed?: string;
  stats?: {
    label: string;
    value: string;
  };
}

const mockUser: User = {
  id: "user-1",
  name: "Александр Волков",
  email: "a.volkov@partner.gts",
  avatar: "https://images.unsplash.com/photo-1628608577164-8533a3dddbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ2VudGxlbWFuJTIwcG9ydHJhaXQlMjBsdXh1cnklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU2MjA1MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080",
  isFirstTime: false,
  roles: [
    {
      id: "role-1",
      name: "Партнёр-Агент",
      type: "partner-agent",
      description: "Управление продажами и клиентскими отношениями",
      permissions: [
        "Просмотр каталога услуг",
        "Создание и управление бронированиями",
        "Доступ к маркетинговым материалам",
        "Отчёты по продажам",
        "Система комиссионных"
      ],
      organization: "GTS Partner Network",
      status: "active",
      lastAccessed: "Вчера в 18:30",
      stats: {
        label: "Продаж в месяце",
        value: "12"
      }
    },
    {
      id: "role-2",
      name: "Подрядчик",
      type: "contractor",
      description: "Техническое обслуживание и ремонт техники",
      permissions: [
        "Управление техническим обслуживанием",
        "Контроль состояния техники",
        "Планирование работ",
        "Отчёты о выполненных работах",
        "Доступ к техническим спецификациям"
      ],
      organization: "GTS Technical Services",
      status: "active",
      lastAccessed: "3 дня назад",
      stats: {
        label: "Активных заявок",
        value: "7"
      }
    }
  ]
};

const mockNotifications = [
  {
    id: "notif-1",
    title: "Новое бронирование",
    message: "Клиент забронировал Yamaha 252S на завтра",
    time: "5 минут назад",
    read: false,
    type: "info" as const
  },
  {
    id: "notif-2",
    title: "Техобслуживание завершено",
    message: "Honda Talon 1000R готов к эксплуатации",
    time: "1 час назад", 
    read: false,
    type: "success" as const
  },
  {
    id: "notif-3",
    title: "Требуется внимание",
    message: "Проверьте договор с клиентом #1247",
    time: "2 часа назад",
    read: true,
    type: "warning" as const
  }
];

interface GTSPortalEntryProps {
  onBackToMain?: () => void;
}

export function GTSPortalEntry({ onBackToMain }: GTSPortalEntryProps) {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login");
  const [user, setUser] = useState<User | null>(null);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState("dashboard");

  // Auth handlers
  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock validation
      if (email.includes("invalid")) {
        throw new Error("Неверный email или пароль");
      }
      
      setUser(mockUser);
      setCurrentStep("2fa");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка входа");
    } finally {
      setIsLoading(false);
    }
  };

  const handle2FA = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation
      if (code !== "123456" && code !== "backup123") {
        throw new Error("Неверный код подтверждения");
      }
      
      if (user?.isFirstTime) {
        setCurrentStep("role-consent");
      } else if (user && user.roles.length > 1) {
        setCurrentStep("role-switcher");
      } else {
        // Single role user
        setCurrentRole(user?.roles[0] || null);
        setCurrentStep("authenticated");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка проверки кода");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleConsent = async (agreedRoles: string[]) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user && user.roles.length > 1) {
        setCurrentStep("role-switcher");
      } else {
        setCurrentRole(user?.roles[0] || null);
        setCurrentStep("authenticated");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ошибка настройки ролей");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleSwitch = async (roleId: string) => {
    const selectedRole = user?.roles.find(role => role.id === roleId);
    if (selectedRole) {
      setCurrentRole(selectedRole);
      setCurrentStep("authenticated");
    }
  };

  const handleSignOut = () => {
    setUser(null);
    setCurrentRole(null);
    setCurrentStep("login");
    setError(null);
  };

  const handleBackToLogin = () => {
    setCurrentStep("login");
    setError(null);
  };

  const handleForgotPassword = () => {
    alert("Функция восстановления пароля будет реализована");
  };

  const handleSSO = () => {
    alert("SSO авторизация будет реализована");
  };

  const handleSkipAuth = () => {
    // Set mock user and partner-agent role for quick access
    setUser(mockUser);
    setCurrentRole(mockUser.roles.find(role => role.type === "partner-agent") || mockUser.roles[0]);
    setCurrentStep("authenticated");
  };

  const handleResendCode = () => {
    alert("Код отправлен повторно");
  };

  const handleUseBackupCode = () => {
    alert("Используйте резервный код");
  };

  // Authenticated app handlers
  const handleMenuItemClick = (itemId: string) => {
    setActiveMenuItem(itemId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Render current step
  if (currentStep === "login") {
    return (
      <GTSPortalLogin
        onLogin={handleLogin}
        onForgotPassword={handleForgotPassword}
        onSSO={handleSSO}
        onSkipAuth={handleSkipAuth}
        isLoading={isLoading}
        error={error || undefined}
      />
    );
  }

  if (currentStep === "2fa") {
    return (
      <GTSPortal2FA
        onVerify={handle2FA}
        onBackToLogin={handleBackToLogin}
        onResendCode={handleResendCode}
        onUseBackupCode={handleUseBackupCode}
        isLoading={isLoading}
        error={error || undefined}
        email={user?.email}
      />
    );
  }

  if (currentStep === "role-consent") {
    return (
      <GTSPortalRoleConsent
        onContinue={handleRoleConsent}
        onDecline={handleBackToLogin}
        roles={user?.roles || []}
        userEmail={user?.email}
        isLoading={isLoading}
      />
    );
  }

  if (currentStep === "role-switcher") {
    return (
      <GTSPortalRoleSwitcher
        onSelectRole={handleRoleSwitch}
        roles={user?.roles || []}
        userEmail={user?.email}
        isLoading={isLoading}
      />
    );
  }

  if (currentStep === "authenticated" && user && currentRole) {
    // Render Partner-Agent Portal for partner-agent role
    if (currentRole.type === "partner-agent") {
      return (
        <GTSPartnerAgentPortal 
          onBackToEntry={() => setCurrentStep("role-switcher")}
        />
      );
    }

    // Render Contractor Portal for contractor role
    if (currentRole.type === "contractor") {
      return (
        <GTSContractorPortal 
          onBackToEntry={() => setCurrentStep("role-switcher")}
        />
      );
    }

    // Default portal layout for other roles
    return (
      <div 
        className="min-h-screen flex flex-col"
        style={{ backgroundColor: '#0B0B0C' }}
      >
        {/* Topbar */}
        <GTSPortalTopbar
          currentRole={currentRole}
          breadcrumbs={[
            { label: currentRole.name, href: "/dashboard" },
            { label: "Дашборд" }
          ]}
          user={user}
          notifications={mockNotifications}
          onToggleSidebar={handleToggleSidebar}
          onRoleSwitch={() => setCurrentStep("role-switcher")}
          onProfileClick={() => alert("Профиль")}
          onDocumentsClick={() => alert("Документы")}
          onSecurityClick={() => alert("Безопасность")}
          onSignOut={handleSignOut}
        />

        {/* Main Layout */}
        <div className="flex flex-1">
          {/* Sidebar */}
          <GTSPortalSidebar
            currentRole={currentRole}
            activeItem={activeMenuItem}
            isCollapsed={sidebarCollapsed}
            onItemClick={handleMenuItemClick}
            onToggleCollapse={handleToggleSidebar}
          />

          {/* Main Content */}
          <main 
            className="flex-1 p-6 overflow-auto"
            style={{ backgroundColor: '#0B0B0C' }}
          >
            {/* Dashboard Content Placeholder */}
            <div className="space-y-6">
              {/* Page Header */}
              <div>
                <h1 
                  className="text-3xl font-bold mb-2"
                  style={{ 
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                    color: '#FFFFFF'
                  }}
                >
                  Дашборд {currentRole.name}
                </h1>
                <p 
                  className="text-lg"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Добро пожаловать в партнёрский портал GTS
                </p>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card 
                  className="p-6 border-0"
                  style={{ backgroundColor: '#17181A' }}
                >
                  <h3 
                    className="text-lg font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    Активные задачи
                  </h3>
                  <p 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#91040C',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    {currentRole.stats?.value || "0"}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {currentRole.stats?.label || "Нет данных"}
                  </p>
                </Card>

                <Card 
                  className="p-6 border-0"
                  style={{ backgroundColor: '#17181A' }}
                >
                  <h3 
                    className="text-lg font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    Уведомления
                  </h3>
                  <p 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#91040C',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    {mockNotifications.filter(n => !n.read).length}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Непрочитанных
                  </p>
                </Card>

                <Card 
                  className="p-6 border-0"
                  style={{ backgroundColor: '#17181A' }}
                >
                  <h3 
                    className="text-lg font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    Статус
                  </h3>
                  <p 
                    className="text-3xl font-bold"
                    style={{ 
                      color: '#2BB673',
                      fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                    }}
                  >
                    Активен
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Последний вход: {currentRole.lastAccessed || "Сегодня"}
                  </p>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card 
                className="p-6 border-0"
                style={{ backgroundColor: '#17181A' }}
              >
                <h3 
                  className="text-lg font-medium mb-4"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                  }}
                >
                  Недавняя активность
                </h3>
                <div className="space-y-3">
                  {mockNotifications.slice(0, 3).map((notification) => (
                    <div 
                      key={notification.id}
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{ backgroundColor: '#121214' }}
                    >
                      <div>
                        <p 
                          className="font-medium"
                          style={{ 
                            color: '#FFFFFF',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {notification.title}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {notification.message}
                        </p>
                      </div>
                      <span 
                        className="text-sm"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {notification.time}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return null;
}