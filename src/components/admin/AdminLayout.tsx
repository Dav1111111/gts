import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { 
  LayoutDashboard,
  Users,
  Settings,
  Menu,
  Crown,
  Car,
  TrendingUp,
  Settings2,
  Globe,
  Building2,
  UserCog
} from "lucide-react";

interface AdminLayoutProps {
  children: React.ReactNode;
  currentRole: "partner" | "staff" | "marketing" | "management" | "portals";
  onRoleChange: (role: "partner" | "staff" | "marketing" | "management" | "portals") => void;
  onBackToHome: () => void;
  onNavigateToPartnerAgent?: () => void;
  onNavigateToContractor?: () => void;
}

const roleConfig = {
  partner: {
    title: "Администратор партнёров",
    icon: Crown,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10"
  },
  staff: {
    title: "Администратор персонала", 
    icon: Car,
    color: "text-green-400",
    bgColor: "bg-green-500/10"
  },
  marketing: {
    title: "Администратор маркетинга",
    icon: TrendingUp,
    color: "text-purple-400", 
    bgColor: "bg-purple-500/10"
  },
  management: {
    title: "Администратор управления",
    icon: Settings2,
    color: "text-[#91040C]",
    bgColor: "bg-[#91040C]/10"
  },
  portals: {
    title: "Управление порталами",
    icon: Globe,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10"
  }
};

export function AdminLayout({ children, currentRole, onRoleChange, onBackToHome, onNavigateToPartnerAgent, onNavigateToContractor }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const currentConfig = roleConfig[currentRole];
  const Icon = currentConfig.icon;

  const mockUser = {
    id: "admin-001",
    name: "Администратор",
    email: "admin@gts.com",
    role: "sys-admin" as const
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Unified Admin Header */}
      <GTSUnifiedAdminHeader
        user={mockUser}
        currentRole="Системный админ"
        currentPage={currentConfig.title}
        notificationCount={3}
        onSearch={(query) => console.log('Search:', query)}
        onLogin={() => console.log('Login clicked')}
        onLogout={() => console.log('Logout clicked')}
        onBackToHome={onBackToHome}
      />
      
      {/* Role Info Bar */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 ${currentConfig.bgColor} rounded-lg flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${currentConfig.color}`} />
          </div>
          <div>
            <div className="text-[--gts-portal-text] font-medium">{currentConfig.title}</div>
            <div className="text-sm text-[--gts-portal-muted]">Системная панель администратора</div>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[--gts-portal-surface] border-r border-[--gts-portal-border] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b border-[--gts-portal-border]">
              <h2 className="text-lg font-medium text-[--gts-portal-text] mb-4">Панель администратора</h2>
              
              {/* Role Switcher */}
              <div className="space-y-2">
                {Object.entries(roleConfig).map(([role, config]) => {
                  const RoleIcon = config.icon;
                  const isActive = role === currentRole;
                  
                  return (
                    <button
                      key={role}
                      onClick={() => {
                        onRoleChange(role as any);
                        setSidebarOpen(false);
                      }}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                        isActive 
                          ? `bg-[--gts-portal-card] text-[--gts-portal-text] ${config.bgColor}` 
                          : 'text-[--gts-portal-muted] hover:text-[--gts-portal-text] hover:bg-[--gts-portal-card]'
                      }`}
                    >
                      <div className={`w-6 h-6 ${isActive ? config.bgColor : 'bg-gray-800'} rounded flex items-center justify-center`}>
                        <RoleIcon className={`w-3 h-3 ${isActive ? config.color : 'text-gray-500'}`} />
                      </div>
                      <span>{config.title}</span>
                      {isActive && (
                        <Badge className="ml-auto bg-[#91040C] text-white text-xs">Ак��ивно</Badge>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <nav className="flex-1 p-4">
              <div className="space-y-2">
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Панель управления</span>
                </a>
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  <Users className="w-4 h-4" />
                  <span>Пользователи</span>
                </a>
                {currentRole === "portals" && (onNavigateToPartnerAgent || onNavigateToContractor) && (
                  <>
                    <div className="pt-4 pb-2 border-t border-gray-800 mt-4">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Быстрый доступ к порталам</p>
                    </div>
                    {onNavigateToPartnerAgent && (
                      <button 
                        onClick={onNavigateToPartnerAgent}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        <Building2 className="w-4 h-4" />
                        <span>Partner-Agent Portal</span>
                      </button>
                    )}
                    {onNavigateToContractor && (
                      <button 
                        onClick={onNavigateToContractor}
                        className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors"
                      >
                        <UserCog className="w-4 h-4" />
                        <span>Contractor Portal</span>
                      </button>
                    )}
                  </>
                )}
                <a href="#" className="flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
                  <Settings className="w-4 h-4" />
                  <span>Настройки</span>
                </a>
              </div>
            </nav>

            <div className="p-4 border-t border-gray-800">
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-2">Статус системы</p>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs text-gray-300">Все системы работают</span>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 min-h-screen lg:ml-0">
          <div className="p-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}