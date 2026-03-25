import { useState } from "react";
import { GTSPortalTopbar } from "./GTSPortalTopbar";
import { GTSBrandPartnerSidebar } from "./GTSBrandPartnerSidebar";
import { GTSBrandPartnerDashboard } from "./GTSBrandPartnerDashboard";
import { GTSBrandPartnerLoyalty } from "./GTSBrandPartnerLoyalty";
import { GTSBrandPartnerPromotions } from "./GTSBrandPartnerPromotions";
import { GTSBrandPartnerTools } from "./GTSBrandPartnerTools";
import { GTSBrandPartnerAPI } from "./GTSBrandPartnerAPI";
import { GTSBrandPartnerDocuments } from "./GTSBrandPartnerDocuments";
import { GTSBrandPartnerSupport } from "./GTSBrandPartnerSupport";

type Section = "dashboard" | "loyalty" | "promotions" | "tools" | "locations" | "api" | "documents" | "support";

interface GTSBrandPartnerPortalProps {
  onBackToAdmin: () => void;
}

export function GTSBrandPartnerPortal({ onBackToAdmin }: GTSBrandPartnerPortalProps) {
  const [activeSection, setActiveSection] = useState<Section>("dashboard");

  // Mock user data for brand partner
  const mockUser = {
    name: "Анна Петрова",
    email: "a.petrova@brandpartner.gts",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b8c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjB3b21hbiUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY3MDMwMXww&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const mockRole = {
    id: "brand-partner-role",
    name: "Бренд-Партнёр",
    type: "brand-partner" as const
  };

  const mockNotifications = [
    {
      id: "notif-1",
      title: "Новая промо-кампания",
      message: "Летняя кампания готова к запуску",
      time: "15 минут назад",
      read: false,
      type: "info" as const
    },
    {
      id: "notif-2", 
      title: "Обновление баланса",
      message: "Поступление 50,000 бонусных баллов",
      time: "1 час назад",
      read: false,
      type: "success" as const
    }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return <GTSBrandPartnerDashboard />;
      case "loyalty":
        return <GTSBrandPartnerLoyalty />;
      case "promotions":
        return <GTSBrandPartnerPromotions />;
      case "tools":
        return <GTSBrandPartnerTools />;
      case "locations":
        return <GTSBrandPartnerTools />; // Locations integrated in tools
      case "api":
        return <GTSBrandPartnerAPI />;
      case "documents":
        return <GTSBrandPartnerDocuments />;
      case "support":
        return <GTSBrandPartnerSupport />;
      default:
        return <GTSBrandPartnerDashboard />;
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--gts-portal-bg)" }}>
      <GTSPortalTopbar 
        title="Brand-Partner Portal"
        subtitle="Кросс-промо и программа лояльности"
        currentRole={mockRole}
        user={mockUser}
        notifications={mockNotifications}
        onProfileClick={() => alert("Профиль")}
        onDocumentsClick={() => setActiveSection("documents")}
        onSecurityClick={() => alert("Безопасность")}
        onSignOut={onBackToAdmin}
        onBack={onBackToAdmin}
      />
      
      <div className="flex">
        <GTSBrandPartnerSidebar 
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        
        <main className="flex-1 min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}