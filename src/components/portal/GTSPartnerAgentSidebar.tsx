import { 
  BarChart3, 
  Calendar, 
  Users, 
  DollarSign, 
  Megaphone, 
  MessageSquare, 
  User,
  CreditCard
} from "lucide-react";
import { Button } from "../ui/button";
import { PartnerAgentSection } from "./GTSPartnerAgentPortal";

interface GTSPartnerAgentSidebarProps {
  currentSection: PartnerAgentSection;
  onSectionChange: (section: PartnerAgentSection) => void;
}

const sidebarItems = [
  { id: "dashboard", label: "Dashboard", icon: BarChart3 },
  { id: "bookings", label: "My Bookings", icon: Calendar },
  { id: "clients", label: "Clients", icon: Users },
  { id: "commissions", label: "Commissions", icon: DollarSign },
  { id: "promo-tools", label: "Promo Tools", icon: Megaphone },
  { id: "support", label: "Support", icon: MessageSquare },
  { id: "profile", label: "Profile", icon: User },
] as const;

export function GTSPartnerAgentSidebar({ currentSection, onSectionChange }: GTSPartnerAgentSidebarProps) {
  return (
    <div 
      className="w-64 border-r flex flex-col"
      style={{ 
        backgroundColor: 'var(--gts-portal-surface)',
        borderColor: 'var(--gts-portal-border)'
      }}
    >
      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentSection === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id as PartnerAgentSection)}
              className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                isActive 
                  ? 'text-white' 
                  : 'hover:bg-opacity-50'
              }`}
              style={{
                backgroundColor: isActive ? 'var(--gts-portal-accent)' : 'transparent',
                color: isActive ? 'white' : 'var(--gts-portal-text)',
              }}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Sticky Action Button */}
      <div className="p-4 border-t" style={{ borderColor: 'var(--gts-portal-border)' }}>
        <Button 
          className="w-full flex items-center gap-2"
          style={{
            backgroundColor: 'var(--gts-portal-accent)',
            color: 'white'
          }}
        >
          <CreditCard className="w-4 h-4" />
          Request Payout
        </Button>
      </div>
    </div>
  );
}