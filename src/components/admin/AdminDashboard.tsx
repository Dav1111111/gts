import { useState } from "react";
import { AdminLayout } from "./AdminLayout";
import { PartnerAdminDashboard } from "./PartnerAdminDashboard";
import { StaffAdminDashboard } from "./StaffAdminDashboard";
import { MarketingAdminDashboard } from "./MarketingAdminDashboard";
import { ManagementAdminDashboard } from "./ManagementAdminDashboard";
import { PortalsAdminDashboard } from "./PortalsAdminDashboard";
import { GTSPartnerCreation } from "./GTSPartnerCreation";
import { GTSPartnersManagement } from "./GTSPartnersManagement";

interface AdminDashboardProps {
  onBackToHome: () => void;
  onNavigateToPartnerAgent?: () => void;
  onNavigateToContractor?: () => void;
  onNavigateToBrandPartner?: () => void;
}

export function AdminDashboard({ onBackToHome, onNavigateToPartnerAgent, onNavigateToContractor, onNavigateToBrandPartner }: AdminDashboardProps) {
  const [currentRole, setCurrentRole] = useState<"partner" | "staff" | "marketing" | "management" | "portals">("management");
  const [currentPage, setCurrentPage] = useState<"dashboard" | "create-partner" | "partners-management">("dashboard");

  // Handle Partners Management page
  if (currentPage === "partners-management") {
    return (
      <GTSPartnersManagement
        onBack={() => setCurrentPage("dashboard")}
      />
    );
  }

  // Handle Partner Creation page
  if (currentPage === "create-partner") {
    return (
      <GTSPartnerCreation
        onBack={() => setCurrentPage("dashboard")}
        onSuccess={(partnerId) => {
          console.log('Partner created:', partnerId);
          setCurrentPage("dashboard");
        }}
      />
    );
  }

  const renderDashboard = () => {
    switch (currentRole) {
      case "partner":
        return <PartnerAdminDashboard onCreatePartner={() => setCurrentPage("partners-management")} />;
      case "staff":
        return <StaffAdminDashboard />;
      case "marketing":
        return <MarketingAdminDashboard />;
      case "management":
        return <ManagementAdminDashboard />;
      case "portals":
        return <PortalsAdminDashboard 
          onNavigateToPartnerAgent={onNavigateToPartnerAgent}
          onNavigateToContractor={onNavigateToContractor}
          onNavigateToBrandPartner={onNavigateToBrandPartner}
        />;
      default:
        return <ManagementAdminDashboard />;
    }
  };

  return (
    <AdminLayout
      currentRole={currentRole}
      onRoleChange={setCurrentRole}
      onBackToHome={onBackToHome}
      onNavigateToPartnerAgent={onNavigateToPartnerAgent}
      onNavigateToContractor={onNavigateToContractor}
      onNavigateToBrandPartner={onNavigateToBrandPartner}
    >
      {renderDashboard()}
    </AdminLayout>
  );
}