import { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Separator } from "../ui/separator";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import { 
  Home,
  BarChart3,
  DollarSign,
  Users,
  Car,
  Megaphone,
  FileText,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Settings,
  Wrench,
  Calendar,
  Package,
  TrendingUp,
  CreditCard,
  UserCheck,
  ClipboardList,
  MessageSquare,
  Briefcase,
  GraduationCap,
  Award,
  Target
} from "lucide-react";

interface MenuItem {
  id: string;
  label: string;
  icon: any;
  href?: string;
  badge?: {
    text: string;
    variant: "default" | "success" | "warning" | "error";
  };
  submenu?: MenuItem[];
  roles?: string[]; // Which roles can see this menu item
}

interface GTSPortalSidebarProps {
  currentRole: {
    id: string;
    name: string;
    type: "partner-agent" | "contractor" | "brand-partner";
  };
  activeItem: string;
  isCollapsed: boolean;
  onItemClick: (itemId: string) => void;
  onToggleCollapse: () => void;
}

const menuItems: MenuItem[] = [
  {
    id: "dashboard",
    label: "Дашборд",
    icon: Home,
    href: "/dashboard"
  },
  {
    id: "operations",
    label: "Операции",
    icon: Briefcase,
    submenu: [
      {
        id: "bookings",
        label: "Бронирования",
        icon: Calendar,
        roles: ["partner-agent"],
        badge: { text: "12", variant: "warning" }
      },
      {
        id: "maintenance",
        label: "Обслуживание",
        icon: Wrench,
        roles: ["contractor"],
        badge: { text: "5", variant: "error" }
      },
      {
        id: "campaigns",
        label: "Кампании",
        icon: Target,
        roles: ["brand-partner"],
        badge: { text: "3", variant: "success" }
      },
      {
        id: "tasks",
        label: "Задачи",
        icon: ClipboardList,
        badge: { text: "8", variant: "default" }
      }
    ]
  },
  {
    id: "finance",
    label: "Финансы",
    icon: DollarSign,
    submenu: [
      {
        id: "earnings",
        label: "Доходы",
        icon: TrendingUp,
        roles: ["partner-agent"]
      },
      {
        id: "payments",
        label: "Платежи",
        icon: CreditCard,
        roles: ["contractor"]
      },
      {
        id: "budget",
        label: "Бюджет",
        icon: Package,
        roles: ["brand-partner"]
      },
      {
        id: "invoices",
        label: "Счета",
        icon: FileText
      }
    ]
  },
  {
    id: "clients-assets",
    label: "Клиенты/Активы",
    icon: Users,
    submenu: [
      {
        id: "clients",
        label: "Клиенты",
        icon: UserCheck,
        roles: ["partner-agent", "brand-partner"]
      },
      {
        id: "fleet",
        label: "Техника",
        icon: Car,
        roles: ["contractor"]
      },
      {
        id: "assets",
        label: "Активы",
        icon: Package
      }
    ]
  },
  {
    id: "promotions",
    label: "Продвижение",
    icon: Megaphone,
    roles: ["brand-partner"],
    submenu: [
      {
        id: "marketing-materials",
        label: "Материалы",
        icon: FileText
      },
      {
        id: "analytics",
        label: "Аналитика",
        icon: BarChart3
      },
      {
        id: "partnerships",
        label: "Партнёрства",
        icon: Award
      }
    ]
  },
  {
    id: "documents",
    label: "Документы",
    icon: FileText,
    submenu: [
      {
        id: "contracts",
        label: "Договоры",
        icon: FileText
      },
      {
        id: "certificates",
        label: "Сертификаты",
        icon: Award
      },
      {
        id: "reports",
        label: "Отчёты",
        icon: BarChart3
      }
    ]
  },
  {
    id: "support",
    label: "Поддержка",
    icon: HelpCircle,
    submenu: [
      {
        id: "tickets",
        label: "Заявки",
        icon: MessageSquare,
        badge: { text: "2", variant: "warning" }
      },
      {
        id: "knowledge-base",
        label: "База знаний",
        icon: FileText
      },
      {
        id: "training",
        label: "Обучение",
        icon: GraduationCap
      }
    ]
  }
];

export function GTSPortalSidebar({
  currentRole,
  activeItem,
  isCollapsed,
  onItemClick,
  onToggleCollapse
}: GTSPortalSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["operations"]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const getBadgeVariant = (variant: string) => {
    switch (variant) {
      case "success": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "warning": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";  
      case "error": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-blue-500/20 text-blue-400 border-blue-500/30";
    }
  };

  const shouldShowMenuItem = (item: MenuItem) => {
    if (!item.roles) return true;
    return item.roles.includes(currentRole.type);
  };

  const filteredMenuItems = menuItems.map(item => ({
    ...item,
    submenu: item.submenu?.filter(shouldShowMenuItem)
  })).filter(item => shouldShowMenuItem(item) || (item.submenu && item.submenu.length > 0));

  const renderMenuItem = (item: MenuItem, level = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeItem === item.id;
    const hasSubmenu = item.submenu && item.submenu.length > 0;
    const IconComponent = item.icon;

    if (hasSubmenu) {
      return (
        <Collapsible key={item.id} open={isExpanded} onOpenChange={() => toggleExpanded(item.id)}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className={`w-full justify-start px-3 py-2 h-auto mb-1 ${
                isActive ? 'bg-gray-800' : 'hover:bg-gray-800/50'
              } ${isCollapsed ? 'px-2' : ''}`}
              style={{ color: isActive ? '#FFFFFF' : '#A6A7AA' }}
            >
              <IconComponent className={`flex-shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
              {!isCollapsed && (
                <>
                  <span 
                    className="flex-1 text-left text-sm font-medium"
                    style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                  >
                    {item.label}
                  </span>
                  {item.badge && (
                    <Badge 
                      className={`ml-2 text-xs px-2 py-0.5 ${getBadgeVariant(item.badge.variant)}`}
                      style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                    >
                      {item.badge.text}
                    </Badge>
                  )}
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 ml-2" />
                  ) : (
                    <ChevronRight className="w-4 h-4 ml-2" />
                  )}
                </>
              )}
            </Button>
          </CollapsibleTrigger>
          {!isCollapsed && (
            <CollapsibleContent className="space-y-1">
              <div className="pl-6 space-y-1">
                {item.submenu!.map(subItem => renderMenuItem(subItem, level + 1))}
              </div>
            </CollapsibleContent>
          )}
        </Collapsible>
      );
    }

    return (
      <Button
        key={item.id}
        variant="ghost"
        onClick={() => onItemClick(item.id)}
        className={`w-full justify-start px-3 py-2 h-auto mb-1 ${
          isActive ? 'bg-gray-800' : 'hover:bg-gray-800/50'
        } ${isCollapsed ? 'px-2' : ''}`}
        style={{ color: isActive ? '#FFFFFF' : '#A6A7AA' }}
      >
        <IconComponent className={`flex-shrink-0 ${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'}`} />
        {!isCollapsed && (
          <>
            <span 
              className="flex-1 text-left text-sm font-medium"
              style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              {item.label}
            </span>
            {item.badge && (
              <Badge 
                className={`ml-2 text-xs px-2 py-0.5 ${getBadgeVariant(item.badge.variant)}`}
                style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
              >
                {item.badge.text}
              </Badge>
            )}
          </>
        )}
      </Button>
    );
  };

  return (
    <aside 
      className={`flex flex-col border-r transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
      style={{ 
        backgroundColor: '#121214',
        borderColor: '#232428',
        height: 'calc(100vh - 64px)' // Subtract topbar height
      }}
    >
      {/* Sidebar Header */}
      <div className="p-4 border-b" style={{ borderColor: '#232428' }}>
        {!isCollapsed && (
          <div className="mb-3">
            <h2 
              className="text-lg font-bold"
              style={{ 
                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                color: '#FFFFFF'
              }}
            >
              Навигация
            </h2>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              {currentRole.name}
            </p>
          </div>
        )}
        
        {/* Collapse Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleCollapse}
          className={`${isCollapsed ? 'w-full' : ''}`}
          style={{ color: '#A6A7AA' }}
        >
          <Settings className="w-4 h-4" />
          {!isCollapsed && (
            <span 
              className="ml-2 text-sm"
              style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
            >
              Свернуть
            </span>
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {filteredMenuItems.map(item => renderMenuItem(item))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t" style={{ borderColor: '#232428' }}>
        {!isCollapsed && (
          <div className="text-center">
            <p 
              className="text-xs mb-2"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              GTS Partner Portal v2.1.0
            </p>
            <div className="flex justify-center space-x-2 text-xs">
              <button 
                className="hover:underline"
                style={{ 
                  color: '#91040C',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                API
              </button>
              <span style={{ color: '#A6A7AA' }}>•</span>
              <button 
                className="hover:underline"
                style={{ 
                  color: '#91040C',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Поддержка
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}