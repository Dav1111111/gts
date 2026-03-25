import { BarChart3, Gift, Megaphone, Wrench, MapPin, Settings, FileText, HelpCircle } from "lucide-react";

type Section = "dashboard" | "loyalty" | "promotions" | "tools" | "locations" | "api" | "documents" | "support";

interface GTSBrandPartnerSidebarProps {
  activeSection: Section;
  onSectionChange: (section: Section) => void;
}

export function GTSBrandPartnerSidebar({ activeSection, onSectionChange }: GTSBrandPartnerSidebarProps) {
  const menuItems = [
    { id: "dashboard" as Section, label: "Dashboard", icon: BarChart3 },
    { id: "loyalty" as Section, label: "Программа лояльности", icon: Gift },
    { id: "promotions" as Section, label: "Совместные промо", icon: Megaphone },
    { id: "tools" as Section, label: "Промо-инструменты", icon: Wrench },
    { id: "locations" as Section, label: "Локации", icon: MapPin },
    { id: "api" as Section, label: "API & Интеграции", icon: Settings },
    { id: "documents" as Section, label: "Документы", icon: FileText },
    { id: "support" as Section, label: "Поддержка", icon: HelpCircle },
  ];

  return (
    <aside 
      className="w-64 h-[calc(100vh-64px)] border-r overflow-y-auto"
      style={{ 
        backgroundColor: "var(--gts-portal-surface)",
        borderColor: "var(--gts-portal-border)"
      }}
    >
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                isActive 
                  ? 'text-white' 
                  : 'hover:bg-opacity-50'
              }`}
              style={{
                backgroundColor: isActive ? "var(--gts-portal-accent)" : "transparent",
                color: isActive ? "white" : "var(--gts-portal-text)"
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "var(--gts-portal-card)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                }
              }}
            >
              <Icon size={20} />
              <span className="text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
}