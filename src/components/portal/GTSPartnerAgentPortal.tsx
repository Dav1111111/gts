import { useState } from "react";
import { GTSPortalTopbar } from "./GTSPortalTopbar";
import { GTSPartnerAgentSidebar } from "./GTSPartnerAgentSidebar";
import { GTSPartnerAgentDashboard } from "./GTSPartnerAgentDashboard";
import { GTSPartnerAgentBookings } from "./GTSPartnerAgentBookings";
import { GTSPartnerAgentClients } from "./GTSPartnerAgentClients";
import { GTSPartnerAgentCommissions } from "./GTSPartnerAgentCommissions";
import { GTSPartnerAgentPromoTools } from "./GTSPartnerAgentPromoTools";
import { GTSPartnerAgentSupport } from "./GTSPartnerAgentSupport";

interface GTSPartnerAgentPortalProps {
  onBackToAdmin: () => void;
}

export type PartnerAgentSection = 
  | "dashboard" 
  | "bookings" 
  | "clients" 
  | "commissions" 
  | "promo-tools" 
  | "support" 
  | "profile";

export function GTSPartnerAgentPortal({ onBackToAdmin }: GTSPartnerAgentPortalProps) {
  const [currentSection, setCurrentSection] = useState<PartnerAgentSection>("dashboard");

  // Mock user data for partner agent
  const mockUser = {
    name: "Дмитрий Агентов",
    email: "d.agentov@partners.gts",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBtYW4lMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NzAzMDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const mockRole = {
    id: "partner-agent-role",
    name: "Партнёр-Агент",
    type: "partner-agent" as const
  };

  const mockNotifications = [
    {
      id: "notif-1",
      title: "Новый клиент",
      message: "Александр Иванов заинтересован в аренде Yamaha 252S",
      time: "5 минут назад",
      read: false,
      type: "info" as const
    },
    {
      id: "notif-2", 
      title: "Комиссия начислена",
      message: "Получена комиссия 15,000₽ за бронирование",
      time: "30 минут назад",
      read: false,
      type: "success" as const
    }
  ];

  const renderContent = () => {
    switch (currentSection) {
      case "dashboard":
        return <GTSPartnerAgentDashboard />;
      case "bookings":
        return <GTSPartnerAgentBookings />;
      case "clients":  
        return <GTSPartnerAgentClients />;
      case "commissions":
        return <GTSPartnerAgentCommissions />;
      case "promo-tools":
        return <GTSPartnerAgentPromoTools />;
      case "support":
        return <GTSPartnerAgentSupport />;
      default:
        return <GTSPartnerAgentDashboard />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-950">
      <GTSPortalTopbar 
        title="Partner Agent Portal"
        subtitle="Агентская программа и комиссии"
        currentRole={mockRole}
        user={mockUser}
        notifications={mockNotifications}
        onProfileClick={() => alert("Профиль")}
        onDocumentsClick={() => alert("Документы")}
        onSecurityClick={() => alert("Безопасность")}
        onSignOut={onBackToAdmin}
        onBack={onBackToAdmin}
      />
      
      <div className="flex flex-1">
        <GTSPartnerAgentSidebar 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
        />
        
        <main className="flex-1 overflow-auto">
          <div className="p-6">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}