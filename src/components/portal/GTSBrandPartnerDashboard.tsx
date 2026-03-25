import { Card } from "../ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";
import { TrendingUp, TrendingDown, Users, Gift, Scan, MousePointer } from "lucide-react";

export function GTSBrandPartnerDashboard() {
  const kpiData = [
    {
      title: "GTS → Partner клиенты",
      value: "1,247",
      change: "+18%",
      trend: "up",
      icon: Users,
      description: "За текущий месяц"
    },
    {
      title: "Partner → GTS клиенты", 
      value: "892",
      change: "+12%",
      trend: "up",
      icon: Users,
      description: "За текущий месяц"
    },
    {
      title: "Выданные бонусы",
      value: "45,720",
      change: "+25%",
      trend: "up",
      icon: Gift,
      description: "Общая сумма баллов"
    },
    {
      title: "Использованные бонусы",
      value: "38,450",
      change: "-5%",
      trend: "down",
      icon: Gift,
      description: "Общая сумма баллов"
    }
  ];

  const qrScanData = [
    { month: "Янв", scans: 450, clicks: 320 },
    { month: "Фев", scans: 520, clicks: 380 },
    { month: "Мар", scans: 680, clicks: 420 },
    { month: "Апр", scans: 750, clicks: 510 },
    { month: "Май", scans: 890, clicks: 630 },
    { month: "Июн", scans: 1100, clicks: 780 }
  ];

  const conversionData = [
    { name: "QR сканы", value: 1100, color: "#91040C" },
    { name: "Переходы на сайт", value: 780, color: "#A6A7AA" },
    { name: "Регистрации", value: 420, color: "#2BB673" },
    { name: "Использования", value: 315, color: "#F5A623" }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
          Dashboard
        </h1>
        <p style={{ color: "var(--gts-portal-muted)" }}>
          Обзор эффективности кросс-промо активностей
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {kpiData.map((kpi, index) => {
          const Icon = kpi.icon;
          const TrendIcon = kpi.trend === "up" ? TrendingUp : TrendingDown;
          
          return (
            <Card 
              key={index}
              className="p-6"
              style={{ 
                backgroundColor: "var(--gts-portal-card)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <Icon 
                  size={24} 
                  style={{ color: "var(--gts-portal-accent)" }}
                />
                <div className={`flex items-center gap-1 text-sm ${
                  kpi.trend === "up" ? "text-green-500" : "text-red-500"
                }`}>
                  <TrendIcon size={16} />
                  {kpi.change}
                </div>
              </div>
              
              <div className="space-y-1">
                <p className="text-2xl font-semibold" style={{ color: "var(--gts-portal-text)" }}>
                  {kpi.value}
                </p>
                <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
                  {kpi.title}
                </p>
                <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                  {kpi.description}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* QR Scans & Clicks Chart */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="mb-4">
            <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
              QR сканы и переходы
            </h3>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              Активность по промо-материалам
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={qrScanData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--gts-portal-border)" />
                <XAxis 
                  dataKey="month" 
                  tick={{ fill: "var(--gts-portal-muted)", fontSize: 12 }}
                />
                <YAxis 
                  tick={{ fill: "var(--gts-portal-muted)", fontSize: 12 }}
                />
                <Bar dataKey="scans" fill="var(--gts-portal-accent)" name="QR сканы" />
                <Bar dataKey="clicks" fill="var(--gts-portal-muted)" name="Клики по ссылкам" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Conversion Funnel */}
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="mb-4">
            <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
              Воронка конверсии
            </h3>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              От сканирования до использования
            </p>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={conversionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {conversionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-4 mt-4">
            {conversionData.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <div>
                  <p className="text-sm" style={{ color: "var(--gts-portal-text)" }}>
                    {item.value}
                  </p>
                  <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                    {item.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="mb-4">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Последняя активность
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            События за последние 24 часа
          </p>
        </div>
        
        <div className="space-y-4">
          {[
            { icon: Scan, text: "27 QR сканов промо-акции 'Летние приключения'", time: "2 часа назад" },
            { icon: Gift, text: "Начислено 1,250 бонусных баллов новым клиентам", time: "4 часа назад" },
            { icon: MousePointer, text: "89 переходов по реферальным ссылкам", time: "6 часов назад" },
            { icon: Users, text: "15 новых регистраций через партнерскую программу", time: "8 часов назад" }
          ].map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg" style={{ backgroundColor: "var(--gts-portal-surface)" }}>
                <Icon size={20} style={{ color: "var(--gts-portal-accent)" }} />
                <div className="flex-1">
                  <p className="text-sm" style={{ color: "var(--gts-portal-text)" }}>
                    {activity.text}
                  </p>
                  <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                    {activity.time}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}