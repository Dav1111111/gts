import { useState } from "react";
import { GTSContractorDashboard } from "./GTSContractorDashboard";
import { GTSContractorFleet } from "./GTSContractorFleet";
import { GTSContractorBookings } from "./GTSContractorBookings";
import { GTSContractorFinance } from "./GTSContractorFinance";
import { GTSContractorTerms } from "./GTSContractorTerms";
import { GTSContractorLogs } from "./GTSContractorLogs";
import { GTSContractorDocuments } from "./GTSContractorDocuments";
import { GTSContractorSupport } from "./GTSContractorSupport";
import { GTSContractorSidebar } from "./GTSContractorSidebar";
import { GTSPortalTopbar } from "./GTSPortalTopbar";

interface GTSContractorPortalProps {
  onBackToAdmin: () => void;
}

export function GTSContractorPortal({ onBackToAdmin }: GTSContractorPortalProps) {
  const [activeSection, setActiveSection] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // Mock user data for contractor
  const mockUser = {
    id: "contractor-1",
    name: "Михаил Соколов",
    email: "m.sokolov@contractor.gts",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NzAzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const mockRole = {
    id: "contractor-role",
    name: "Подрядчик",
    type: "contractor" as const,
    description: "Владелец техники и услуг",
    permissions: [
      "Управление флотом",
      "Просмотр бронирований",
      "Финансовая отчетность",
      "Журналы операций"
    ],
    organization: "GTS Contractor Network",
    status: "active" as const,
    lastAccessed: "Сегодня в 14:20"
  };

  const mockNotifications = [
    {
      id: "notif-1",
      title: "Новое бронирование",
      message: "Robinson R44 забронирован на завтра 10:00",
      time: "10 минут назад",
      read: false,
      type: "info" as const
    },
    {
      id: "notif-2", 
      title: "Истекает страховка",
      message: "Yamaha 252S - страховка истекает через 7 дней",
      time: "2 часа назад",
      read: false,
      type: "warning" as const
    },
    {
      id: "notif-3",
      title: "Техобслуживание завершено",
      message: "Honda Talon - плановое ТО выполнено",
      time: "5 часов назад",
      read: true,
      type: "success" as const
    }
  ];

  const handleMenuItemClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleToggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const handleSignOut = () => {
    onBackToAdmin();
  };

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <GTSContractorDashboard />;
      case "fleet":
        return <GTSContractorFleet />;
      case "bookings":
        return <GTSContractorBookings />;
      case "finance":
        return <GTSContractorFinance />;
      case "terms":
        return <GTSContractorTerms />;
      case "logs":
        return <GTSContractorLogs />;
      case "documents":
        return <GTSContractorDocuments />;
      case "support":
        return <GTSContractorSupport />;
      default:
        return <GTSContractorDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      {/* Topbar */}
      <GTSPortalTopbar
        title="Contractor Portal"
        subtitle="Управление флотом и финансами"
        currentRole={mockRole}
        breadcrumbs={[
          { label: "Contractor Portal", href: "/contractor" },
          { 
            label: activeSection === "dashboard" ? "Дашборд" :
                   activeSection === "fleet" ? "Мой флот" :
                   activeSection === "bookings" ? "Бронирования" :
                   activeSection === "finance" ? "Финансы" :
                   activeSection === "terms" ? "Условия" :
                   activeSection === "logs" ? "Журналы" :
                   activeSection === "documents" ? "Документы" :
                   activeSection === "support" ? "Поддержка" : "Дашборд"
          }
        ]}
        user={mockUser}
        notifications={mockNotifications}
        onToggleSidebar={handleToggleSidebar}
        onRoleSwitch={() => {}}
        onProfileClick={() => alert("Профиль")}
        onDocumentsClick={() => setActiveSection("documents")}
        onSecurityClick={() => alert("Безопасность")}
        onSignOut={handleSignOut}
        onBack={onBackToAdmin}
      />

      {/* Main Layout */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <GTSContractorSidebar
          activeItem={activeSection}
          isCollapsed={sidebarCollapsed}
          onItemClick={handleMenuItemClick}
          onToggleCollapse={handleToggleSidebar}
        />

        {/* Main Content */}
        <main className="flex-1 overflow-auto bg-gray-950">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}