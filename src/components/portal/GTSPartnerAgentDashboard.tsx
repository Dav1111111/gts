import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar, 
  DollarSign, 
  Percent,
  Link,
  Settings,
  CreditCard,
  MessageSquare,
  Eye,
  ArrowRight,
  MousePointer
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, FunnelChart, Funnel, LabelList } from "recharts";

const kpiData = [
  {
    title: "Leads This Month",
    value: "247",
    delta: "+23%",
    trend: "up",
    icon: Users,
    color: "var(--gts-portal-success)"
  },
  {
    title: "Bookings",
    value: "89/12",
    subtitle: "Done/Canceled",
    delta: "+15%", 
    trend: "up",
    icon: Calendar,
    color: "var(--gts-portal-accent)"
  },
  {
    title: "GMV (Turnover)",
    value: "₽2.4M",
    delta: "+8%",
    trend: "up", 
    icon: DollarSign,
    color: "var(--gts-portal-warning)"
  },
  {
    title: "Commission",
    value: "₽156K",
    subtitle: "Accrued: ₽89K | Paid: ₽67K",
    delta: "-3%",
    trend: "down",
    icon: Percent,
    color: "var(--gts-portal-error)"
  }
];

const monthlyTurnoverData = [
  { month: 'Jan', turnover: 1800000 },
  { month: 'Feb', turnover: 2100000 },
  { month: 'Mar', turnover: 1950000 },
  { month: 'Apr', turnover: 2300000 },
  { month: 'May', turnover: 2150000 },
  { month: 'Jun', turnover: 2400000 },
];

const funnelData = [
  { name: 'Views', value: 15420, fill: 'var(--gts-portal-accent)' },
  { name: 'Leads', value: 2470, fill: 'var(--gts-portal-warning)' },
  { name: 'Bookings', value: 890, fill: 'var(--gts-portal-success)' },
];

const sourcesData = [
  { name: 'UTM Links', value: 45, fill: 'var(--gts-portal-accent)' },
  { name: 'Campaigns', value: 30, fill: 'var(--gts-portal-warning)' },
  { name: 'Ref Links', value: 25, fill: 'var(--gts-portal-success)' },
];

const quickActions = [
  {
    title: "Generate Promo Link",
    description: "Create trackable promotional links",
    icon: Link,
    color: "var(--gts-portal-accent)"
  },
  {
    title: "Create UTM",
    description: "Build custom campaign parameters",
    icon: Settings,
    color: "var(--gts-portal-warning)"
  },
  {
    title: "Request Payout",
    description: "Withdraw earned commissions",
    icon: CreditCard,
    color: "var(--gts-portal-success)"
  },
  {
    title: "Open Support",
    description: "Get help from our team",
    icon: MessageSquare,
    color: "var(--gts-portal-muted)"
  }
];

export function GTSPartnerAgentDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 
          className="text-2xl font-bold"
          style={{ 
            color: 'var(--gts-portal-text)',
            fontFamily: 'var(--font-heading)'
          }}
        >
          Agent Dashboard
        </h1>
        <p 
          className="mt-2"
          style={{ color: 'var(--gts-portal-muted)' }}
        >
          Track your performance and manage your agent activities
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={index}
              className="p-6"
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div 
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: `${kpi.color}20` }}
                >
                  <Icon 
                    className="w-5 h-5" 
                    style={{ color: kpi.color }}
                  />
                </div>
                <div 
                  className={`flex items-center gap-1 text-sm ${
                    kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'
                  }`}
                >
                  <TrendIcon className="w-4 h-4" />
                  {kpi.delta}
                </div>
              </div>
              
              <div>
                <h3 
                  className="text-2xl font-bold mb-1"
                  style={{ color: 'var(--gts-portal-text)' }}
                >
                  {kpi.value}
                </h3>
                <p 
                  className="text-sm"
                  style={{ color: 'var(--gts-portal-muted)' }}
                >
                  {kpi.title}
                </p>
                {kpi.subtitle && (
                  <p 
                    className="text-xs mt-1"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  >
                    {kpi.subtitle}
                  </p>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Monthly Turnover */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Monthly Turnover
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyTurnoverData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gts-portal-border)" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--gts-portal-muted)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'var(--gts-portal-muted)', fontSize: 12 }}
                  tickFormatter={(value) => `₽${(value / 1000000).toFixed(1)}M`}
                />
                <Bar 
                  dataKey="turnover" 
                  fill="var(--gts-portal-accent)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Conversion Funnel */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Conversion Funnel
          </h3>
          <div className="space-y-4">
            {funnelData.map((item, index) => (
              <div key={item.name} className="flex items-center gap-4">
                <div 
                  className="w-4 h-4 rounded"
                  style={{ backgroundColor: item.fill }}
                />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span 
                      className="text-sm font-medium"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {item.name}
                    </span>
                    <span 
                      className="text-sm"
                      style={{ color: 'var(--gts-portal-muted)' }}
                    >
                      {item.value.toLocaleString()}
                    </span>
                  </div>
                  <div 
                    className="w-full h-2 rounded mt-1"
                    style={{ backgroundColor: 'var(--gts-portal-surface)' }}
                  >
                    <div 
                      className="h-full rounded"
                      style={{ 
                        backgroundColor: item.fill,
                        width: `${(item.value / funnelData[0].value) * 100}%`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Traffic Sources */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: 'var(--gts-portal-card)',
            borderColor: 'var(--gts-portal-border)'
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ color: 'var(--gts-portal-text)' }}
          >
            Traffic Sources
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourcesData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sourcesData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 mt-4">
            {sourcesData.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span 
                    className="text-sm"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    {item.name}
                  </span>
                </div>
                <span 
                  className="text-sm font-medium"
                  style={{ color: 'var(--gts-portal-muted)' }}
                >
                  {item.value}%
                </span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 
          className="text-xl font-semibold mb-4"
          style={{ color: 'var(--gts-portal-text)' }}
        >
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon;
            
            return (
              <Card 
                key={index}
                className="p-4 cursor-pointer hover:shadow-lg transition-shadow"
                style={{ 
                  backgroundColor: 'var(--gts-portal-card)',
                  borderColor: 'var(--gts-portal-border)'
                }}
              >
                <div className="flex items-center gap-3">
                  <div 
                    className="p-2 rounded-lg"
                    style={{ backgroundColor: `${action.color}20` }}
                  >
                    <Icon 
                      className="w-5 h-5" 
                      style={{ color: action.color }}
                    />
                  </div>
                  <div className="flex-1">
                    <h4 
                      className="font-medium text-sm"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {action.title}
                    </h4>
                    <p 
                      className="text-xs mt-1"
                      style={{ color: 'var(--gts-portal-muted)' }}
                    >
                      {action.description}
                    </p>
                  </div>
                  <ArrowRight 
                    className="w-4 h-4" 
                    style={{ color: 'var(--gts-portal-muted)' }}
                  />
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}