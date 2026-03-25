import { 
  LayoutDashboard,
  Car,
  Calendar,
  DollarSign,
  FileText,
  ClipboardList,
  FolderOpen,
  MessageSquare,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "../ui/tooltip";

interface GTSContractorSidebarProps {
  activeItem: string;
  isCollapsed: boolean;
  onItemClick: (itemId: string) => void;
  onToggleCollapse: () => void;
}

export function GTSContractorSidebar({
  activeItem,
  isCollapsed,
  onItemClick,
  onToggleCollapse
}: GTSContractorSidebarProps) {
  const menuItems = [
    {
      id: "dashboard",
      label: "Дашборд",
      icon: LayoutDashboard,
      description: "Общая статистика и KPI"
    },
    {
      id: "fleet",
      label: "Мой флот",
      icon: Car,
      description: "Управление техникой и услугами"
    },
    {
      id: "bookings",
      label: "Бронирования",
      icon: Calendar,
      description: "Бронирования моей техники"
    },
    {
      id: "finance",
      label: "Финансы",
      icon: DollarSign,
      description: "Выплаты и финансовые отчеты"
    },
    {
      id: "terms",
      label: "Условия",
      icon: FileText,
      description: "Тарифы и соглашения"
    },
    {
      id: "logs",
      label: "Журналы",
      icon: ClipboardList,
      description: "Операционные журналы"
    },
    {
      id: "documents",
      label: "Документы",
      icon: FolderOpen,
      description: "Лицензии и сертификаты"
    },
    {
      id: "support",
      label: "Поддержка",
      icon: MessageSquare,
      description: "Техническая поддержка"
    }
  ];

  const renderMenuItem = (item: typeof menuItems[0]) => {
    const Icon = item.icon;
    const isActive = activeItem === item.id;

    const menuButton = (
      <Button
        onClick={() => onItemClick(item.id)}
        variant="ghost"
        className={`w-full justify-start rounded-xl py-3 px-3 transition-all ${
          isActive 
            ? 'text-white shadow-sm' 
            : 'text-gray-400 hover:text-gray-300 hover:bg-gray-800/50'
        }`}
        style={{ 
          backgroundColor: isActive ? '#91040C' : 'transparent',
          fontFamily: 'Gilroy, Inter, sans-serif'
        }}
      >
        <Icon className={`${isCollapsed ? 'w-5 h-5' : 'w-5 h-5 mr-3'} flex-shrink-0`} />
        {!isCollapsed && (
          <span className="truncate">{item.label}</span>
        )}
      </Button>
    );

    if (isCollapsed) {
      return (
        <Tooltip key={item.id}>
          <TooltipTrigger asChild>
            {menuButton}
          </TooltipTrigger>
          <TooltipContent side="right" className="ml-2">
            <p className="font-medium">{item.label}</p>
            <p className="text-sm text-gray-400">{item.description}</p>
          </TooltipContent>
        </Tooltip>
      );
    }

    return (
      <div key={item.id}>
        {menuButton}
      </div>
    );
  };

  return (
    <TooltipProvider>
      <div 
        className={`flex flex-col border-r transition-all duration-300 ${
          isCollapsed ? 'w-16' : 'w-64'
        }`}
        style={{ 
          backgroundColor: '#121214',
          borderColor: '#232428'
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: '#232428' }}>
          {!isCollapsed && (
            <div>
              <h2 
                className="font-bold text-lg"
                style={{ 
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                  color: '#FFFFFF'
                }}
              >
                Contractor
              </h2>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#A6A7AA'
                }}
              >
                Portal
              </p>
            </div>
          )}
          
          <Button
            onClick={onToggleCollapse}
            variant="ghost"
            size="sm"
            className="p-2 hover:bg-gray-800/50"
          >
            {isCollapsed ? (
              <ChevronRight className="w-4 h-4" style={{ color: '#A6A7AA' }} />
            ) : (
              <ChevronLeft className="w-4 h-4" style={{ color: '#A6A7AA' }} />
            )}
          </Button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 p-4 space-y-2">
          {menuItems.map(renderMenuItem)}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t" style={{ borderColor: '#232428' }}>
          {!isCollapsed && (
            <div className="text-center">
              <p 
                className="text-xs"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#A6A7AA'
                }}
              >
                GTS Contractor Portal v2.0
              </p>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}