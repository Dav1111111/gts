import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { GTSUnifiedAppShell } from "../shell/GTSUnifiedAppShell";
// ✅ Temporary mock for GTSStyles during migration
const GTSStyles = {
  layout: { page: 'min-h-screen bg-[#0B0B0C] text-white' },
  backgrounds: { 
    main: 'bg-[#0B0B0C]',
    card: 'bg-[#17181A]' 
  },
  cards: { 
    default: 'bg-[#121214] border border-[#232428]',
    content: 'bg-[#121214] border border-[#232428]'
  },
  text: { 
    primary: 'text-white',
    muted: 'text-[#A6A7AA]',
    accent: 'text-[#91040C]'
  },
  buttons: { 
    secondary: 'border-[#232428] text-white hover:bg-[#17181A]',
    ghost: 'text-white hover:bg-[#17181A]'
  },
  borders: { default: 'border-[#232428]' },
  transitions: { default: 'transition-all duration-200' }
}

const GTSComponents = {
  pageTitle: 'text-2xl font-bold text-white',
  pageSubtitle: 'text-[#A6A7AA]',
  pageHeader: 'p-4 border-b border-[#232428]',
  cardTitle: 'text-lg font-semibold text-white'
}
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign, 
  Calendar, 
  Users, 
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Download,
  Filter,
  RefreshCw,
  Shield,
  UserCheck,
  Building,
  MessageSquare,
  FileText,
  Globe,
  Zap,
  Crown,
  Trophy,
  Star,
  Target,
  PieChart,
  CreditCard,
  Briefcase,
  Settings,
  Brain
} from "lucide-react";
// ✅ Mock chart components to avoid recharts import errors
const ResponsiveContainer = ({ children, width, height }: any) => (
  <div style={{ width, height }} className="bg-[#17181A] rounded-lg flex items-center justify-center">
    <p className="text-[#A6A7AA]">📊 Chart Component (Mock)</p>
  </div>
);

const AreaChart = ({ children, data }: any) => <div>{children}</div>;
const Area = (props: any) => null;
const RechartsPieChart = ({ children }: any) => <div>{children}</div>;
const Pie = (props: any) => null;
const Cell = (props: any) => null;
const XAxis = (props: any) => null;
const YAxis = (props: any) => null;
const CartesianGrid = (props: any) => null;
const Tooltip = (props: any) => null;

/**
 * 03_Executive_Dashboard - Интегрированная панель руководителя
 * 
 * МИГРАЦИЯ: Объединяет контент из legacy admin панелей:
 * - [LEGACY] AdminDashboard → ManagementAdminDashboard KPI + Charts
 * - [LEGACY] GTSExtendedAdminPortal → Quick Stats + Module Access
 * - [LEGACY] GTSUnifiedAdminPortal → Recent Activity
 * 
 * ✅ Применён GTSUnifiedAppShell
 * ✅ Компактные KPI-карты
 * ✅ Удалены дубли
 */

interface GTSExecutiveDashboardProps {
  onBackToHome?: () => void;
  onNavigateToModule?: (module: string) => void;
}

// Migrated financial data from ManagementAdminDashboard
const mockFinancialData = {
  revenue: {
    total: 15750000,
    monthly: 2625000,
    growth: 12.5,
    forecast: 18500000
  },
  bookings: {
    total: 342,
    monthly: 57,
    growth: 8.3,
    avgValue: 46052
  },
  costs: {
    operational: 6200000,
    marketing: 1800000,
    maintenance: 980000,
    staff: 2400000
  },
  profit: {
    gross: 9550000,
    net: 4370000,
    margin: 27.7
  }
};

// Migrated user insights from ManagementAdminDashboard
const mockUserInsights = {
  totalUsers: 12400,
  activeUsers: 8950,
  newUsers: 1250,
  churnRate: 3.2,
  membershipTiers: {
    bronze: 45,
    silver: 28,
    gold: 18,
    platinum: 9
  },
  satisfaction: 4.8,
  retention: 89.5
};

// Migrated chart data from ManagementAdminDashboard
const revenueData = [
  { month: 'Jan', revenue: 1850000, bookings: 45, costs: 780000 },
  { month: 'Feb', revenue: 2100000, bookings: 52, costs: 820000 },
  { month: 'Mar', revenue: 1950000, bookings: 48, costs: 790000 },
  { month: 'Apr', revenue: 2300000, bookings: 56, costs: 850000 },
  { month: 'May', revenue: 2450000, bookings: 61, costs: 880000 },
  { month: 'Jun', revenue: 2650000, bookings: 68, costs: 920000 },
  { month: 'Jul', revenue: 2800000, bookings: 72, costs: 950000 },
  { month: 'Aug', revenue: 2625000, bookings: 67, costs: 890000 }
];

const membershipData = [
  { name: 'Bronze', value: 45, color: '#CD7F32', count: 1980 },
  { name: 'Silver', value: 28, color: '#C0C0C0', count: 1232 },
  { name: 'Gold', value: 18, color: '#FFD700', count: 792 },
  { name: 'Platinum', value: 9, color: '#E5E4E2', count: 396 }
];

const servicePerformance = [
  { service: 'Yacht Charter', bookings: 156, revenue: 3900000, growth: 15.2 },
  { service: 'Helicopter Tours', bookings: 89, revenue: 4005000, growth: 22.1 },
  { service: 'Buggy Adventures', bookings: 67, revenue: 1005000, growth: -3.5 },
  { service: 'Slingshot Rides', bookings: 30, revenue: 360000, growth: 8.7 }
];

const topCustomers = [
  { name: 'Александр Волков', tier: 'Gold', bookings: 12, revenue: 540000, lastVisit: '2024-08-25' },
  { name: 'Екатерина Морозова', tier: 'Platinum', bookings: 8, revenue: 720000, lastVisit: '2024-08-23' },
  { name: 'Дмитрий Соколов', tier: 'Silver', bookings: 15, revenue: 390000, lastVisit: '2024-08-27' },
  { name: 'Анна Петрова', tier: 'Gold', bookings: 9, revenue: 495000, lastVisit: '2024-08-20' },
  { name: 'Михаил Козлов', tier: 'Platinum', bookings: 6, revenue: 810000, lastVisit: '2024-08-22' }
];

// Migrated recent activity from GTSExtendedAdminPortal
const recentActivity = [
  { type: "booking", message: "Создано новое бронирование #BK-2024-001", time: "2 мин назад", icon: Calendar },
  { type: "lead", message: "Высокоценный лид конвертирован в сделку", time: "5 мин назад", icon: Users },
  { type: "alert", message: "Требуется продление лицензии для Вертолёта R44", time: "15 мин назад", icon: AlertTriangle },
  { type: "finance", message: "Обработана выплата партнёру: ₽45,000", time: "1 час назад", icon: DollarSign }
];

interface CompactKPICardProps {
  title: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

function CompactKPICard({ title, value, change, trend, icon: Icon, color }: CompactKPICardProps) {
  return (
    <Card className={GTSStyles.cards.content + ' p-4'}>
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <p className={`text-xs ${GTSStyles.text.muted} mb-1`}>{title}</p>
          <p className={`text-xl ${GTSStyles.text.primary} font-medium mb-1`}>{value}</p>
          {change && (
            <div className="flex items-center gap-1">
              {trend === 'up' ? (
                <TrendingUp className="w-3 h-3 text-green-400" />
              ) : (
                <TrendingDown className="w-3 h-3 text-red-400" />
              )}
              <span className={`text-xs ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                {change}
              </span>
            </div>
          )}
        </div>
        <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center flex-shrink-0`}>
          <Icon className="w-5 h-5 text-white" />
        </div>
      </div>
    </Card>
  );
}

function getTierIcon(tier: string) {
  switch (tier) {
    case "Bronze": return <Trophy className="w-4 h-4" />;
    case "Platinum": case "Gold": return <Crown className="w-4 h-4" />;
    case "Silver": return <Star className="w-4 h-4" />;
    default: return <Target className="w-4 h-4" />;
  }
}

function getTierColor(tier: string) {
  switch (tier) {
    case "Bronze": return "text-amber-400";
    case "Silver": return "text-gray-300";
    case "Gold": return "text-yellow-400";
    case "Platinum": return "text-gray-100";
    default: return "text-gray-400";
  }
}

export function GTSExecutiveDashboard({ onBackToHome, onNavigateToModule }: GTSExecutiveDashboardProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "financial" | "operations" | "analytics">("overview");
  const [timeRange, setTimeRange] = useState("month");
  const [currentPath] = useState("/dashboard");

  const handleNavigate = (path: string) => {
    console.log(`Navigate to ${path}`);
    if (onNavigateToModule) {
      // Map paths to module names
      const moduleMap: { [key: string]: string } = {
        '/calendar': 'calendar',
        '/crm': 'crm',
        '/finance': 'finance',
        '/iam': 'iam',
        '/sphere': 'sphere-management',
        '/ai': 'ai-modules'
      };
      const module = moduleMap[path];
      if (module) {
        onNavigateToModule(module);
      }
    }
  };

  const handleSearch = (query: string) => {
    console.log('Search:', query);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  // Mock user for shell
  const user = {
    id: 'exec1',
    name: 'Анна Иванова', 
    email: 'anna.ivanova@gts.com',
    role: 'executive' as const
  };

  const dashboardContent = (
    <div className="p-6 space-y-6">
      {/* Header with Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
            Executive Dashboard
          </h1>
          <p className={GTSComponents.pageSubtitle}>
            Комплексная аналитика и управление за {new Date().toLocaleDateString('ru-RU')}
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className={`w-32 ${GTSStyles.backgrounds.card} border-[--gts-portal-border] ${GTSStyles.text.primary}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Эта неделя</SelectItem>
              <SelectItem value="month">Этот месяц</SelectItem>
              <SelectItem value="quarter">Этот квартал</SelectItem>
              <SelectItem value="year">Этот год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className={GTSStyles.buttons.secondary}>
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className={`border-b ${GTSStyles.borders.default}`}>
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Обзор" },
            { id: "financial", label: "Финансы" },
            { id: "operations", label: "Операции" },
            { id: "analytics", label: "Аналитика" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 text-sm font-medium ${GTSStyles.transitions.default} ${
                activeTab === tab.id
                  ? `border-[--gts-portal-accent] ${GTSStyles.text.accent}`
                  : `border-transparent ${GTSStyles.text.muted} hover:${GTSStyles.text.primary}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Executive KPIs - Migrated from ManagementAdminDashboard */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            <CompactKPICard
              title="Общая выручка"
              value={`${(mockFinancialData.revenue.total / 1000000).toFixed(1)}M₽`}
              change={`+${mockFinancialData.revenue.growth}%`}
              trend="up"
              icon={DollarSign}
              color="bg-green-500"
            />
            <CompactKPICard
              title="Активные пользователи"
              value={mockUserInsights.activeUsers.toLocaleString()}
              change={`+${mockUserInsights.newUsers}`}
              trend="up"
              icon={Users}
              color="bg-blue-500"
            />
            <CompactKPICard
              title="Маржа прибыли"
              value={`${mockFinancialData.profit.margin}%`}
              change="+2.3%"
              trend="up"
              icon={PieChart}
              color="bg-purple-500"
            />
            <CompactKPICard
              title="Удовлетворённость"
              value={`${mockUserInsights.satisfaction}/5.0`}
              change="+0.2"
              trend="up"
              icon={Activity}
              color="bg-orange-500"
            />
            <CompactKPICard
              title="Операции сегодня"
              value="23"
              change="+12%"
              trend="up"
              icon={Zap}
              color="bg-yellow-500"
            />
            <Button 
              onClick={() => handleNavigate("/calendar")}
              className="bg-[#91040C] hover:bg-[#91040C]/90 text-white h-full flex items-center justify-center min-h-[80px] rounded-lg"
            >
              <div className="text-center">
                <Calendar className="w-6 h-6 mx-auto mb-1" />
                <div className="text-sm font-medium">Календарь</div>
                <div className="text-xs opacity-80">Глобальные бронирования</div>
              </div>
            </Button>
          </div>

          {/* System Management Quick Access */}
          <Card className={GTSStyles.cards.default}>
            <div className="p-6 border-b border-[--gts-portal-border]">
              <h3 className={`${GTSComponents.cardTitle} mb-2`}>Системное управление</h3>
              <p className="text-sm text-[var(--gts-portal-muted)]">Быстрый доступ к административным модулям</p>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <Button 
                  onClick={() => handleNavigate("/iam")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] hover:border-[var(--gts-portal-accent)]"
                >
                  <Shield className="w-6 h-6 text-[var(--gts-portal-accent)]" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--gts-portal-text)]">IAM</div>
                    <div className="text-xs text-[var(--gts-portal-muted)]">Роли и разрешения</div>
                  </div>
                </Button>
                
                <Button 
                  onClick={() => handleNavigate("/crm")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] hover:border-[var(--gts-portal-accent)]"
                >
                  <Users className="w-6 h-6 text-blue-400" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--gts-portal-text)]">CRM</div>
                    <div className="text-xs text-[var(--gts-portal-muted)]">Клиенты и лиды</div>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleNavigate("/finance")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] hover:border-[var(--gts-portal-accent)]"
                >
                  <DollarSign className="w-6 h-6 text-green-400" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--gts-portal-text)]">Финансы</div>
                    <div className="text-xs text-[var(--gts-portal-muted)]">Центр финансов</div>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleNavigate("/sphere")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] hover:border-[var(--gts-portal-accent)]"
                >
                  <Globe className="w-6 h-6 text-purple-400" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--gts-portal-text)]">SphereM</div>
                    <div className="text-xs text-[var(--gts-portal-muted)]">Управление ресурсами</div>
                  </div>
                </Button>

                <Button 
                  onClick={() => handleNavigate("/ai")}
                  variant="outline"
                  className="h-20 flex flex-col items-center justify-center space-y-2 border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] hover:border-[var(--gts-portal-accent)]"
                >
                  <Brain className="w-6 h-6 text-yellow-400" />
                  <div className="text-center">
                    <div className="text-sm font-medium text-[var(--gts-portal-text)]">AI Modules</div>
                    <div className="text-xs text-[var(--gts-portal-muted)]">Искусственный интеллект</div>
                  </div>
                </Button>
              </div>
            </div>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4" style={{ display: 'none' }}>
            {/* Hide original button row */}
          </div>

          {/* Charts Row - Migrated from ManagementAdminDashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={GTSStyles.cards.default}>
              <div className="p-6 border-b border-[--gts-portal-border]">
                <h3 className={`${GTSComponents.cardTitle} mb-2`}>Тренд выручки</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--gts-portal-border)" />
                    <XAxis dataKey="month" stroke="var(--gts-portal-muted)" />
                    <YAxis stroke="var(--gts-portal-muted)" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--gts-portal-surface)', 
                        border: '1px solid var(--gts-portal-border)', 
                        borderRadius: '8px',
                        color: 'var(--gts-portal-text)'
                      }}
                      formatter={(value: any) => [`${(value / 1000000).toFixed(2)}M₽`, 'Выручка']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="var(--gts-portal-accent)" 
                      fill="var(--gts-portal-accent)" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className={GTSStyles.cards.default}>
              <div className="p-6 border-b border-[--gts-portal-border]">
                <h3 className={`${GTSComponents.cardTitle} mb-2`}>Распределение участников</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <RechartsPieChart>
                    <Pie
                      data={membershipData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {membershipData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--gts-portal-surface)', 
                        border: '1px solid var(--gts-portal-border)', 
                        borderRadius: '8px',
                        color: 'var(--gts-portal-text)'
                      }}
                      formatter={(value: any, name: string) => [
                        `${value}% (${membershipData.find(d => d.name === name)?.count} members)`, 
                        name
                      ]}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4">
                  {membershipData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className={`text-sm ${GTSStyles.text.muted}`}>{item.name}</span>
                      <span className={`text-sm ${GTSStyles.text.primary}`}>{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Performance & Customers - Migrated from ManagementAdminDashboard */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className={GTSStyles.cards.default}>
              <div className="p-6 border-b border-[--gts-portal-border]">
                <h3 className={`${GTSComponents.cardTitle} mb-2`}>Производительность услуг</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {servicePerformance.map((service, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
                      <div>
                        <h4 className={`font-medium ${GTSStyles.text.primary}`}>{service.service}</h4>
                        <p className={`text-sm ${GTSStyles.text.muted}`}>{service.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${GTSStyles.text.primary}`}>
                          {(service.revenue / 1000000).toFixed(1)}M₽
                        </p>
                        <div className="flex items-center text-sm">
                          {service.growth > 0 ? (
                            <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                          )}
                          <span className={service.growth > 0 ? "text-green-400" : "text-red-400"}>
                            {service.growth > 0 ? "+" : ""}{service.growth}%
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className={GTSStyles.cards.default}>
              <div className="p-6 border-b border-[--gts-portal-border]">
                <h3 className={`${GTSComponents.cardTitle} mb-2`}>Топ клиенты</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className={`flex items-center justify-between p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ${getTierColor(customer.tier)}`}>
                          {getTierIcon(customer.tier)}
                        </div>
                        <div>
                          <h4 className={`font-medium ${GTSStyles.text.primary}`}>{customer.name}</h4>
                          <p className={`text-sm ${GTSStyles.text.muted}`}>{customer.tier} Member</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium ${GTSStyles.text.primary}`}>
                          {customer.revenue.toLocaleString()}₽
                        </p>
                        <p className={`text-sm ${GTSStyles.text.muted}`}>{customer.bookings} bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity - Migrated from GTSExtendedAdminPortal */}
          <Card className={GTSStyles.cards.default}>
            <div className="p-6 border-b border-[--gts-portal-border]">
              <h3 className={`${GTSComponents.cardTitle} mb-2`}>Последняя активность</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className={`flex items-center gap-3 p-3 rounded-lg ${GTSStyles.backgrounds.card}`}>
                    <div className="p-2 rounded-lg bg-blue-500/10">
                      <activity.icon className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${GTSStyles.text.primary}`}>{activity.message}</p>
                      <p className={`text-xs ${GTSStyles.text.muted}`}>{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Other tabs content... */}
      {activeTab === "financial" && (
        <div className="text-center py-12">
          <p className={GTSStyles.text.muted}>Финансовая аналитика - в разработке</p>
        </div>
      )}

      {activeTab === "operations" && (
        <div className="text-center py-12">
          <p className={GTSStyles.text.muted}>Операционная панель - в разработке</p>
        </div>
      )}

      {activeTab === "analytics" && (
        <div className="text-center py-12">
          <p className={GTSStyles.text.muted}>Углубленная аналитика - в разработке</p>
        </div>
      )}
    </div>
  );

  if (onBackToHome) {
    // Standalone mode for demo
    return (
      <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
        <div className={GTSComponents.pageHeader}>
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToHome} className={GTSStyles.buttons.ghost}>
              <ArrowUpRight className="w-4 h-4" />
            </Button>
            <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
              03_Executive_Dashboard
            </h1>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {dashboardContent}
        </div>
      </div>
    );
  }

  // Integrated with shell
  return (
    <GTSUnifiedAppShell
      user={user}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      onLogout={handleLogout}
      notificationCount={3}
    >
      {dashboardContent}
    </GTSUnifiedAppShell>
  );
}