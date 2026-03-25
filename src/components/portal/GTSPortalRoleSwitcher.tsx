import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Users,
  Building,
  Star,
  ArrowRight,
  CheckCircle,
  Settings,
  BarChart3,
  Wrench,
  Megaphone,
  ChevronRight,
  Loader2,
  User
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  type: "partner-agent" | "contractor" | "brand-partner";
  description: string;
  organization: string;
  status: "active" | "pending" | "suspended";
  lastAccessed?: string;
  stats?: {
    label: string;
    value: string;
  };
}

interface GTSPortalRoleSwitcherProps {
  onSelectRole: (roleId: string) => void;
  roles: Role[];
  userEmail?: string;
  isLoading?: boolean;
  selectedRoleId?: string;
}

const mockRoles: Role[] = [
  {
    id: "role-1",
    name: "Партнёр-Агент",
    type: "partner-agent",
    description: "Управление продажами и клиентскими отношениями",
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
    organization: "GTS Technical Services",
    status: "active",
    lastAccessed: "3 дня назад",
    stats: {
      label: "Активных заявок",
      value: "7"
    }
  },
  {
    id: "role-3",
    name: "Бренд-Партнёр",
    type: "brand-partner",
    description: "Маркетинговые кампании и продвижение бренда",
    organization: "GTS Marketing Division",
    status: "pending",
    lastAccessed: "Никогда",
    stats: {
      label: "Кампаний",
      value: "3"
    }
  }
];

export function GTSPortalRoleSwitcher({ 
  onSelectRole,
  roles = mockRoles,
  userEmail = "partner@example.com",
  isLoading = false,
  selectedRoleId
}: GTSPortalRoleSwitcherProps) {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  const getRoleIcon = (type: string) => {
    switch (type) {
      case "partner-agent": return Users;
      case "contractor": return Building;
      case "brand-partner": return Star;
      default: return Users;
    }
  };

  const getRoleSecondaryIcon = (type: string) => {
    switch (type) {
      case "partner-agent": return BarChart3;
      case "contractor": return Wrench;
      case "brand-partner": return Megaphone;
      default: return Settings;
    }
  };

  const getRoleBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "suspended": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Активна";
      case "pending": return "Настройка";
      case "suspended": return "Приостановлена";
      default: return status;
    }
  };

  const getRoleGradient = (type: string) => {
    switch (type) {
      case "partner-agent": return "from-blue-600/20 to-blue-400/10";
      case "contractor": return "from-orange-600/20 to-orange-400/10";  
      case "brand-partner": return "from-purple-600/20 to-purple-400/10";
      default: return "from-gray-600/20 to-gray-400/10";
    }
  };

  const handleRoleSelect = async (roleId: string) => {
    if (roles.find(r => r.id === roleId)?.status !== "active") return;
    
    setLoadingRole(roleId);
    // Simulate loading
    await new Promise(resolve => setTimeout(resolve, 1500));
    onSelectRole(roleId);
  };

  const activeRoles = roles.filter(role => role.status === "active");
  const inactiveRoles = roles.filter(role => role.status !== "active");

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: '#0B0B0C' }}
    >
      <div className="w-full max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center"
            style={{ backgroundColor: '#17181A' }}
          >
            <User className="w-8 h-8" style={{ color: '#91040C' }} />
          </div>
          <h1 
            className="text-3xl font-bold mb-3"
            style={{ 
              fontFamily: 'Nokia.Kokia, Inter, sans-serif',
              color: '#FFFFFF'
            }}
          >
            Выберите роль
          </h1>
          <p 
            className="text-lg mb-2"
            style={{ 
              fontFamily: 'Gilroy, Inter, sans-serif',
              color: '#A6A7AA'
            }}
          >
            {userEmail}
          </p>
          <p 
            className="text-sm"
            style={{ 
              fontFamily: 'Gilroy, Inter, sans-serif',
              color: '#A6A7AA'
            }}
          >
            У вас есть доступ к {roles.length} {roles.length === 1 ? 'роли' : roles.length < 5 ? 'ролям' : 'ролям'} в системе
          </p>
        </div>

        {/* Active Roles */}
        {activeRoles.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-lg font-medium mb-6"
              style={{ 
                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                color: '#FFFFFF'
              }}
            >
              Доступные роли
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeRoles.map((role) => {
                const IconComponent = getRoleIcon(role.type);
                const SecondaryIcon = getRoleSecondaryIcon(role.type);
                const isHovered = hoveredRole === role.id;
                const isLoading = loadingRole === role.id;

                return (
                  <Card 
                    key={role.id}
                    className={`relative overflow-hidden border-0 transition-all duration-300 cursor-pointer ${
                      isHovered ? 'transform scale-[1.02]' : ''
                    }`}
                    style={{ 
                      backgroundColor: '#17181A',
                      border: isHovered ? '2px solid #91040C' : '2px solid #232428'
                    }}
                    onMouseEnter={() => setHoveredRole(role.id)}
                    onMouseLeave={() => setHoveredRole(null)}
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    {/* Background Gradient */}
                    <div 
                      className={`absolute inset-0 bg-gradient-to-br ${getRoleGradient(role.type)} opacity-50`}
                    />
                    
                    <div className="relative p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div 
                            className="w-14 h-14 rounded-xl mr-4 flex items-center justify-center transition-all"
                            style={{ 
                              backgroundColor: isHovered ? '#91040C' : '#121214'
                            }}
                          >
                            <IconComponent 
                              className="w-7 h-7" 
                              style={{ color: isHovered ? '#FFFFFF' : '#91040C' }} 
                            />
                          </div>
                          <div>
                            <h3 
                              className="text-xl font-bold mb-1"
                              style={{ 
                                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                                color: '#FFFFFF'
                              }}
                            >
                              {role.name}
                            </h3>
                            <p 
                              className="text-sm"
                              style={{ 
                                color: '#A6A7AA',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {role.organization}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs rounded-lg ${getRoleBadgeColor(role.status)}`}
                          style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                        >
                          {getStatusText(role.status)}
                        </Badge>
                      </div>

                      {/* Description */}
                      <p 
                        className="text-sm mb-4"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif',
                          lineHeight: '1.6'
                        }}
                      >
                        {role.description}
                      </p>

                      {/* Stats and Last Access */}
                      <div className="flex items-center justify-between mb-4">
                        {role.stats && (
                          <div className="flex items-center">
                            <SecondaryIcon className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                            <span 
                              className="text-sm font-medium mr-1"
                              style={{ 
                                color: '#FFFFFF',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {role.stats.value}
                            </span>
                            <span 
                              className="text-xs"
                              style={{ 
                                color: '#A6A7AA',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {role.stats.label}
                            </span>
                          </div>
                        )}
                        {role.lastAccessed && (
                          <span 
                            className="text-xs"
                            style={{ 
                              color: '#A6A7AA',
                              fontFamily: 'Gilroy, Inter, sans-serif'
                            }}
                          >
                            {role.lastAccessed}
                          </span>
                        )}
                      </div>

                      {/* Action Button */}
                      <Button
                        className="w-full rounded-xl font-medium transition-all"
                        style={{ 
                          backgroundColor: isHovered ? '#91040C' : '#121214',
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                        disabled={isLoading}
                      >
                        {isLoading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            Загрузка роли...
                          </>
                        ) : (
                          <>
                            Войти как {role.name}
                            <ChevronRight className="w-4 h-4 ml-2" />
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Inactive Roles */}
        {inactiveRoles.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-lg font-medium mb-6"
              style={{ 
                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                color: '#FFFFFF'
              }}
            >
              Роли в настройке
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inactiveRoles.map((role) => {
                const IconComponent = getRoleIcon(role.type);

                return (
                  <Card 
                    key={role.id}
                    className="border-0 opacity-60"
                    style={{ 
                      backgroundColor: '#17181A',
                      border: '2px solid #232428'
                    }}
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div 
                            className="w-14 h-14 rounded-xl mr-4 flex items-center justify-center"
                            style={{ backgroundColor: '#121214' }}
                          >
                            <IconComponent className="w-7 h-7" style={{ color: '#A6A7AA' }} />
                          </div>
                          <div>
                            <h3 
                              className="text-xl font-bold mb-1"
                              style={{ 
                                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                                color: '#A6A7AA'
                              }}
                            >
                              {role.name}
                            </h3>
                            <p 
                              className="text-sm"
                              style={{ 
                                color: '#A6A7AA',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {role.organization}
                            </p>
                          </div>
                        </div>
                        <Badge 
                          className={`text-xs rounded-lg ${getRoleBadgeColor(role.status)}`}
                          style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                        >
                          {getStatusText(role.status)}
                        </Badge>
                      </div>

                      <p 
                        className="text-sm mb-4"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif',
                          lineHeight: '1.6'
                        }}
                      >
                        {role.description}
                      </p>

                      <Button
                        disabled
                        className="w-full rounded-xl font-medium"
                        style={{ 
                          backgroundColor: '#121214',
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {role.status === "pending" ? "Ожидает настройки" : "Недоступна"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center">
          <p 
            className="text-sm mb-4"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Вы можете переключаться между ролями в любое время в настройках профиля
          </p>
          <div className="flex justify-center space-x-6 text-sm">
            <button 
              className="hover:underline"
              style={{ 
                color: '#91040C',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Настройки профиля
            </button>
            <button 
              className="hover:underline"
              style={{ 
                color: '#91040C',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Поддержка
            </button>
            <button 
              className="hover:underline"
              style={{ 
                color: '#91040C',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Документация
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}