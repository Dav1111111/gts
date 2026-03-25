import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
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
  Cell,
  AreaChart,
  Area
} from "recharts";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  Calendar,
  Eye,
  Download,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Crown,
  Star,
  Trophy,
  Target,
  Briefcase,
  PieChart as PieChartIcon,
  BarChart3,
  Activity,
  Globe,
  UserCheck,
  CreditCard,
  Zap
} from "lucide-react";

interface FinancialData {
  revenue: {
    total: number;
    monthly: number;
    growth: number;
    forecast: number;
  };
  bookings: {
    total: number;
    monthly: number;
    growth: number;
    avgValue: number;
  };
  costs: {
    operational: number;
    marketing: number;
    maintenance: number;
    staff: number;
  };
  profit: {
    gross: number;
    net: number;
    margin: number;
  };
}

interface UserInsights {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  churnRate: number;
  membershipTiers: {
    bronze: number;
    silver: number;
    gold: number;
    platinum: number;
  };
  satisfaction: number;
  retention: number;
}

const mockFinancialData: FinancialData = {
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

const mockUserInsights: UserInsights = {
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

export function ManagementAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "financial" | "users" | "performance">("overview");
  const [timeRange, setTimeRange] = useState("month");

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Bronze": return "text-amber-400";
      case "Silver": return "text-gray-300";
      case "Gold": return "text-yellow-400";
      case "Platinum": return "text-gray-100";
      default: return "text-gray-400";
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case "Bronze": return <Trophy className="w-4 h-4" />;
      case "Platinum": case "Gold": return <Crown className="w-4 h-4" />;
      case "Silver": return <Star className="w-4 h-4" />;
      default: return <Target className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Панель управления</h1>
          <p className="text-gray-400">Обзор руководителя и бизнес-аналитика</p>
        </div>
        <div className="flex items-center space-x-3">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32 bg-gray-800 border-gray-700 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Эта неделя</SelectItem>
              <SelectItem value="month">Этот месяц</SelectItem>
              <SelectItem value="quarter">Этот квартал</SelectItem>
              <SelectItem value="year">Этот год</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Экспорт отчёта
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Обзор" },
            { id: "financial", label: "Финансы" },
            { id: "users", label: "Пользователи" },
            { id: "performance", label: "Показатели" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-[#91040C] text-[#91040C]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
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
          {/* Executive KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Общая выручка</p>
                  <p className="text-2xl font-semibold text-white">
                    {(mockFinancialData.revenue.total / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+{mockFinancialData.revenue.growth}%</span>
                <span className="text-gray-400 ml-1">к прошлому периоду</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Активные пользователи</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockUserInsights.activeUsers.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+{mockUserInsights.newUsers}</span>
                <span className="text-gray-400 ml-1">новых в этом месяце</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Маржа прибыли</p>
                  <p className="text-2xl font-semibold text-white">{mockFinancialData.profit.margin}%</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <PieChartIcon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+2.3%</span>
                <span className="text-gray-400 ml-1">к прошлому периоду</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Удовлетворённость клиентов</p>
                  <p className="text-2xl font-semibold text-white">{mockUserInsights.satisfaction}/5.0</p>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+0.2</span>
                <span className="text-gray-400 ml-1">к прошлому периоду</span>
              </div>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Тренд выручки</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value: any) => [`${(value / 1000000).toFixed(2)}M₽`, 'Выручка']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#10B981" 
                      fill="#10B981" 
                      fillOpacity={0.2}
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Распределение участников</h3>
              </div>
              <div className="p-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
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
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151', 
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                      formatter={(value: any, name: string) => [
                        `${value}% (${membershipData.find(d => d.name === name)?.count} members)`, 
                        name
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex flex-wrap gap-4 mt-4">
                  {membershipData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-sm text-gray-400">{item.name}</span>
                      <span className="text-sm text-white">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Service Performance</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {servicePerformance.map((service, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div>
                        <h4 className="font-medium text-white">{service.service}</h4>
                        <p className="text-sm text-gray-400">{service.bookings} bookings</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
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

            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Top Customers</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {topCustomers.map((customer, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ${getTierColor(customer.tier)}`}>
                          {getTierIcon(customer.tier)}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{customer.name}</h4>
                          <p className="text-sm text-gray-400">{customer.tier} Member</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">
                          {customer.revenue.toLocaleString()}₽
                        </p>
                        <p className="text-sm text-gray-400">{customer.bookings} bookings</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Financial Tab */}
      {activeTab === "financial" && (
        <div className="space-y-6">
          {/* Financial KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Gross Revenue</p>
                  <p className="text-2xl font-semibold text-white">
                    {(mockFinancialData.revenue.total / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Net Profit</p>
                  <p className="text-2xl font-semibold text-white">
                    {(mockFinancialData.profit.net / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Costs</p>
                  <p className="text-2xl font-semibold text-white">
                    {((mockFinancialData.costs.operational + mockFinancialData.costs.marketing + 
                       mockFinancialData.costs.maintenance + mockFinancialData.costs.staff) / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg. Booking Value</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockFinancialData.bookings.avgValue.toLocaleString()}₽
                  </p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <CreditCard className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Revenue vs Costs Chart */}
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Revenue vs Costs</h3>
            </div>
            <div className="p-6">
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#fff'
                    }}
                    formatter={(value: any, name: string) => [
                      `${(value / 1000000).toFixed(2)}M₽`, 
                      name === 'revenue' ? 'Revenue' : 'Costs'
                    ]}
                  />
                  <Bar dataKey="revenue" fill="#10B981" />
                  <Bar dataKey="costs" fill="#EF4444" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Cost Breakdown */}
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Cost Breakdown</h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-blue-500/10 p-4 rounded-lg mb-3">
                    <Briefcase className="w-8 h-8 text-blue-400 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Operational</p>
                  <p className="text-xl font-semibold text-white">
                    {(mockFinancialData.costs.operational / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-purple-500/10 p-4 rounded-lg mb-3">
                    <Target className="w-8 h-8 text-purple-400 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Marketing</p>
                  <p className="text-xl font-semibold text-white">
                    {(mockFinancialData.costs.marketing / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-yellow-500/10 p-4 rounded-lg mb-3">
                    <Zap className="w-8 h-8 text-yellow-400 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Maintenance</p>
                  <p className="text-xl font-semibold text-white">
                    {(mockFinancialData.costs.maintenance / 1000000).toFixed(1)}M₽
                  </p>
                </div>
                <div className="text-center">
                  <div className="bg-green-500/10 p-4 rounded-lg mb-3">
                    <Users className="w-8 h-8 text-green-400 mx-auto" />
                  </div>
                  <p className="text-sm text-gray-400 mb-1">Staff</p>
                  <p className="text-xl font-semibold text-white">
                    {(mockFinancialData.costs.staff / 1000000).toFixed(1)}M₽
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Users Tab */}
      {activeTab === "users" && (
        <div className="space-y-6">
          {/* User KPIs */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Users</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockUserInsights.totalUsers.toLocaleString()}
                  </p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockUserInsights.activeUsers.toLocaleString()}
                  </p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <UserCheck className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Retention Rate</p>
                  <p className="text-2xl font-semibold text-white">{mockUserInsights.retention}%</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Churn Rate</p>
                  <p className="text-2xl font-semibold text-white">{mockUserInsights.churnRate}%</p>
                </div>
                <div className="bg-red-500/10 p-3 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-red-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Customer Segmentation */}
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Customer Segmentation</h3>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Customer</TableHead>
                    <TableHead className="text-gray-400">Tier</TableHead>
                    <TableHead className="text-gray-400">Total Bookings</TableHead>
                    <TableHead className="text-gray-400">Total Revenue</TableHead>
                    <TableHead className="text-gray-400">Last Visit</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topCustomers.map((customer, index) => (
                    <TableRow key={index} className="border-gray-800">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center ${getTierColor(customer.tier)}`}>
                            {getTierIcon(customer.tier)}
                          </div>
                          <span>{customer.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getTierColor(customer.tier)} bg-transparent border`}>
                          {customer.tier}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{customer.bookings}</TableCell>
                      <TableCell className="text-white">{customer.revenue.toLocaleString()}₽</TableCell>
                      <TableCell className="text-white">
                        {new Date(customer.lastVisit).toLocaleDateString('ru-RU')}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500 text-white">Active</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="space-y-6">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Service Performance Metrics</h3>
            </div>
            <div className="p-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Service</TableHead>
                    <TableHead className="text-gray-400">Bookings</TableHead>
                    <TableHead className="text-gray-400">Revenue</TableHead>
                    <TableHead className="text-gray-400">Growth</TableHead>
                    <TableHead className="text-gray-400">Avg. Rating</TableHead>
                    <TableHead className="text-gray-400">Utilization</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {servicePerformance.map((service, index) => (
                    <TableRow key={index} className="border-gray-800">
                      <TableCell className="text-white font-medium">{service.service}</TableCell>
                      <TableCell className="text-white">{service.bookings}</TableCell>
                      <TableCell className="text-white">
                        {(service.revenue / 1000000).toFixed(1)}M₽
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          {service.growth > 0 ? (
                            <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                          ) : (
                            <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                          )}
                          <span className={service.growth > 0 ? "text-green-400" : "text-red-400"}>
                            {service.growth > 0 ? "+" : ""}{service.growth}%
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">4.{8 + index}/5.0</TableCell>
                      <TableCell className="text-white">{85 - index * 5}%</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}