import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import {
  Globe,
  Building2,
  UserCog,
  Users,
  Activity,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  ExternalLink,
  Download,
  Settings,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  MessageSquare,
  FileText,
  Zap,
  Calendar
} from "lucide-react";

interface PortalsAdminDashboardProps {
  onNavigateToPartnerAgent?: () => void;
  onNavigateToContractor?: () => void;
  onNavigateToBrandPartner?: () => void;
}

export function PortalsAdminDashboard({ onNavigateToPartnerAgent, onNavigateToContractor, onNavigateToBrandPartner }: PortalsAdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "usage" | "users" | "performance">("overview");

  // Mock portal data
  const portalsOverview = {
    totalPortals: 3,
    activeUsers: 203,
    totalSessions: 3542,
    avgSessionTime: "15:18"
  };

  const portalStats = [
    {
      id: "partner-agent",
      name: "Partner-Agent Portal",
      icon: Building2,
      color: "#0EA5E9",
      users: 89,
      sessions: 1654,
      avgSessionTime: "16:45",
      status: "active" as const,
      version: "v2.1.4",
      lastUpdate: "2024-02-10",
      features: ["Dashboard", "Clients", "Bookings", "Commissions", "Promo Tools", "Support"]
    },
    {
      id: "contractor",
      name: "Contractor Portal", 
      icon: UserCog,
      color: "#F59E0B",
      users: 67,
      sessions: 1193,
      avgSessionTime: "12:18",
      status: "active" as const,
      version: "v1.0.2",
      lastUpdate: "2024-02-12",
      features: ["Dashboard", "Fleet", "Bookings", "Finance", "Terms", "Logs", "Documents", "Support"]
    },
    {
      id: "brand-partner",
      name: "Brand-Partner Portal",
      icon: Globe,
      color: "#91040C",
      users: 47,
      sessions: 695,
      avgSessionTime: "18:25",
      status: "active" as const,
      version: "v1.0.0",
      lastUpdate: "2024-02-15",
      features: ["Dashboard", "Loyalty", "Promotions", "Tools", "Locations", "API", "Documents", "Support"]
    }
  ];

  const usageData = [
    { month: 'Jan', partnerAgent: 1200, contractor: 800, brandPartner: 450 },
    { month: 'Feb', partnerAgent: 1400, contractor: 950, brandPartner: 520 },
    { month: 'Mar', partnerAgent: 1650, contractor: 1100, brandPartner: 580 },
    { month: 'Apr', partnerAgent: 1550, contractor: 1250, brandPartner: 625 },
    { month: 'May', partnerAgent: 1800, contractor: 1400, brandPartner: 670 },
    { month: 'Jun', partnerAgent: 1654, contractor: 1193, brandPartner: 695 }
  ];

  const userDistribution = [
    { name: 'Partner-Agent', value: 44, color: '#0EA5E9' },
    { name: 'Contractor', value: 33, color: '#F59E0B' },
    { name: 'Brand-Partner', value: 23, color: '#91040C' }
  ];

  const recentActivities = [
    {
      id: "act-1",
      portal: "Partner-Agent",
      user: "Алексей Морозов",
      action: "Создал новое бронирование",
      time: "5 минут назад",
      type: "booking" as const
    },
    {
      id: "act-2",
      portal: "Contractor", 
      user: "Сергей Волков",
      action: "Обновил расписание техники",
      time: "12 минут назад",
      type: "fleet" as const
    },
    {
      id: "act-3",
      portal: "Partner-Agent",
      user: "Екатерина Белова",
      action: "Просмотрела комиссионные",
      time: "23 минуты назад", 
      type: "finance" as const
    },
    {
      id: "act-4",
      portal: "Contractor",
      user: "Игорь Морской",
      action: "Добавил журнал ТО",
      time: "1 час назад",
      type: "maintenance" as const
    }
  ];

  const systemHealth = [
    {
      service: "Partner-Agent Portal",
      status: "operational" as const,
      uptime: "99.8%",
      responseTime: "124ms",
      lastIncident: "7 дней назад"
    },
    {
      service: "Contractor Portal",
      status: "operational" as const,
      uptime: "99.9%", 
      responseTime: "98ms",
      lastIncident: "14 дней назад"
    },
    {
      service: "Authentication Service",
      status: "operational" as const,
      uptime: "99.7%",
      responseTime: "67ms", 
      lastIncident: "3 дня назад"
    },
    {
      service: "File Storage",
      status: "degraded" as const,
      uptime: "98.2%",
      responseTime: "234ms",
      lastIncident: "2 часа назад"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return '#2BB673';
      case 'degraded': return '#F5A623';
      case 'down': return '#E5484D';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'operational': return 'Работает';
      case 'degraded': return 'Снижена';
      case 'down': return 'Недоступен';
      default: return 'Неизвестно';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'fleet': return <UserCog className="w-4 h-4" />;
      case 'finance': return <DollarSign className="w-4 h-4" />;
      case 'maintenance': return <Settings className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Управление порталами</h1>
          <p className="text-gray-400">Администрирование Partner-Agent и Contractor порталов</p>
        </div>
        <div className="flex items-center space-x-3">
          {onNavigateToPartnerAgent && (
            <Button 
              onClick={onNavigateToPartnerAgent}
              variant="outline" 
              className="border-gray-700 text-gray-300"
            >
              <Building2 className="w-4 h-4 mr-2" />
              Partner-Agent
            </Button>
          )}
          {onNavigateToContractor && (
            <Button 
              onClick={onNavigateToContractor}
              variant="outline" 
              className="border-gray-700 text-gray-300"
            >
              <UserCog className="w-4 h-4 mr-2" />
              Contractor
            </Button>
          )}
          {onNavigateToBrandPartner && (
            <Button 
              onClick={onNavigateToBrandPartner}
              variant="outline" 
              className="border-gray-700 text-gray-300"
            >
              <Globe className="w-4 h-4 mr-2" />
              Brand-Partner
            </Button>
          )}
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Экспорт данных
          </Button>
        </div>
      </div>

      {/* Overview KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Всего порталов</p>
              <p className="text-2xl font-semibold text-white">{portalsOverview.totalPortals}</p>
            </div>
            <div className="bg-blue-500/10 p-3 rounded-lg">
              <Globe className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Активные пользователи</p>
              <p className="text-2xl font-semibold text-white">{portalsOverview.activeUsers}</p>
            </div>
            <div className="bg-green-500/10 p-3 rounded-lg">
              <Users className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Всег�� сессий</p>
              <p className="text-2xl font-semibold text-white">{portalsOverview.totalSessions.toLocaleString()}</p>
            </div>
            <div className="bg-purple-500/10 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Средняя сессия</p>
              <p className="text-2xl font-semibold text-white">{portalsOverview.avgSessionTime}</p>
            </div>
            <div className="bg-orange-500/10 p-3 rounded-lg">
              <Clock className="w-6 h-6 text-orange-400" />
            </div>
          </div>
        </Card>
      </div>

      {/* Portals Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {portalStats.map((portal) => {
          const Icon = portal.icon;
          return (
            <Card key={portal.id} className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${portal.color}20` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: portal.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">{portal.name}</h3>
                      <p className="text-sm text-gray-400">{portal.version}</p>
                    </div>
                  </div>
                  <Badge 
                    style={{ 
                      backgroundColor: getStatusColor(portal.status),
                      color: '#FFFFFF'
                    }}
                  >
                    {getStatusText(portal.status)}
                  </Badge>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{portal.users}</p>
                    <p className="text-xs text-gray-400">Пользователей</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{portal.sessions.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Сессий</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-semibold text-white">{portal.avgSessionTime}</p>
                    <p className="text-xs text-gray-400">Среднее время</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-400 mb-2">Функции</p>
                  <div className="flex flex-wrap gap-1">
                    {portal.features.map((feature, index) => (
                      <Badge 
                        key={index}
                        variant="outline"
                        className="text-xs"
                        style={{ 
                          borderColor: portal.color,
                          color: portal.color
                        }}
                      >
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xs text-gray-400">Последнее обновление</p>
                    <p className="text-sm text-white">{new Date(portal.lastUpdate).toLocaleDateString('ru-RU')}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-gray-700 text-gray-300"
                    >
                      <Eye className="w-4 h-4" />
                    </Button>
                    {portal.id === "partner-agent" && onNavigateToPartnerAgent && (
                      <Button 
                        onClick={onNavigateToPartnerAgent}
                        size="sm"
                        style={{ 
                          backgroundColor: portal.color,
                          color: '#FFFFFF'
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {portal.id === "contractor" && onNavigateToContractor && (
                      <Button 
                        onClick={onNavigateToContractor}
                        size="sm"
                        style={{ 
                          backgroundColor: portal.color,
                          color: '#FFFFFF'
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                    {portal.id === "brand-partner" && onNavigateToBrandPartner && (
                      <Button 
                        onClick={onNavigateToBrandPartner}
                        size="sm"
                        style={{ 
                          backgroundColor: portal.color,
                          color: '#FFFFFF'
                        }}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as any)} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-gray-800">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="usage">Использование</TabsTrigger>
          <TabsTrigger value="users">Пользователи</TabsTrigger>
          <TabsTrigger value="performance">Производительность</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Usage Chart */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Использование порталов</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Bar dataKey="partnerAgent" fill="#0EA5E9" name="Partner-Agent" />
                    <Bar dataKey="contractor" fill="#F59E0B" name="Contractor" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* User Distribution */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Распределение пользователей</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={userDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {userDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value: any, name: string) => [`${value}%`, name]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {userDistribution.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-400">{item.name}</span>
                      <span className="text-sm text-white">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Активность пользователей</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div 
                    key={activity.id}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                        {getActivityIcon(activity.type)}
                      </div>
                      <div>
                        <p className="font-medium text-white">{activity.user}</p>
                        <p className="text-sm text-gray-400">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="text-xs">
                        {activity.portal}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="users">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Статистика пользователей</h3>
            </div>
            <div className="p-6">
              <div className="text-center py-8">
                <Users className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                <p className="text-gray-400">Детальная статистика пользователей будет доступна в следующем обновлении</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Состояние системы</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {systemHealth.map((service, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-4 bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: getStatusColor(service.status) }}
                      ></div>
                      <div>
                        <h4 className="font-medium text-white">{service.service}</h4>
                        <p className="text-sm text-gray-400">
                          Uptime: {service.uptime} • Response: {service.responseTime}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        style={{ 
                          backgroundColor: getStatusColor(service.status),
                          color: '#FFFFFF'
                        }}
                      >
                        {getStatusText(service.status)}
                      </Badge>
                      <p className="text-xs text-gray-400 mt-1">
                        Последний инцидент: {service.lastIncident}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}