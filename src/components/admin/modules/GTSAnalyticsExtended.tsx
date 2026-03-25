import React, { useState, useMemo } from 'react';
import { ImageWithFallback } from '../../figma/ImageWithFallback';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Progress } from '../../ui/progress';
import { Switch } from '../../ui/switch';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Separator } from '../../ui/separator';
import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer 
} from 'recharts';
import { 
  TrendingUp, TrendingDown, DollarSign, Users, Calendar, MapPin,
  Filter, Download, Settings, Bell, Target, Brain, AlertTriangle,
  BarChart3, PieChart as PieChartIcon, Activity, Zap, Clock,
  ArrowUpRight, ArrowDownRight, Eye, FileText, Mail, Smartphone
} from 'lucide-react';

interface AnalyticsProps {
  userRole: string;
}

interface KPIMetric {
  id: string;
  title: string;
  value: string | number;
  change: number;
  changeType: 'increase' | 'decrease' | 'neutral';
  icon: React.ReactNode;
  description: string;
  category: 'revenue' | 'bookings' | 'clients' | 'operations';
}

interface ChartDataPoint {
  name: string;
  bookings: number;
  revenue: number;
  boats: number;
  buggies: number;
  helicopters: number;
  slingshot: number;
  swampBuggies: number;
  margin: number;
  cost: number;
}

interface ClientSegment {
  name: string;
  value: number;
  color: string;
  growth: number;
}

interface StaffMetric {
  name: string;
  bookingsHandled: number;
  conversion: number;
  revenue: number;
  responseTime: number;
  rating: number;
  tasksCompleted: number;
}

interface ForecastData {
  period: string;
  bookings: number;
  revenue: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

interface AIInsight {
  id: string;
  type: 'opportunity' | 'warning' | 'info';
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  action?: string;
}

export function GTSAnalyticsExtended({ userRole }: AnalyticsProps) {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedManager, setSelectedManager] = useState('all');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [forecastPeriod, setForecastPeriod] = useState('3months');
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [reportsSchedule, setReportsSchedule] = useState('weekly');
  const [drillDownData, setDrillDownData] = useState<any>(null);

  // Mock KPI данные
  const kpiMetrics: KPIMetric[] = [
    {
      id: 'total-bookings',
      title: 'Всего бронирований',
      value: '2,847',
      change: 12.5,
      changeType: 'increase',
      icon: <Calendar className="w-5 h-5" />,
      description: 'За текущий месяц',
      category: 'bookings'
    },
    {
      id: 'total-revenue',
      title: 'Общая выручка',
      value: '₽15,420,000',
      change: 8.3,
      changeType: 'increase',
      icon: <DollarSign className="w-5 h-5" />,
      description: 'За текущий месяц',
      category: 'revenue'
    },
    {
      id: 'revenue-per-client',
      title: 'Доход на клиента',
      value: '₽64,200',
      change: -2.1,
      changeType: 'decrease',
      icon: <Users className="w-5 h-5" />,
      description: 'Total Revenue / Unique Clients',
      category: 'clients'
    },
    {
      id: 'average-check',
      title: 'Средний чек',
      value: '₽42,800',
      change: 5.7,
      changeType: 'increase',
      icon: <Target className="w-5 h-5" />,
      description: 'Average Revenue per Booking',
      category: 'revenue'
    },
    {
      id: 'fleet-utilization',
      title: 'Загрузка техники',
      value: '78%',
      change: 3.2,
      changeType: 'increase',
      icon: <Activity className="w-5 h-5" />,
      description: 'Средняя загрузка парка',
      category: 'operations'
    },
    {
      id: 'nps-score',
      title: 'NPS',
      value: '72',
      change: 1.8,
      changeType: 'increase',
      icon: <TrendingUp className="w-5 h-5" />,
      description: 'Net Promoter Score',
      category: 'clients'
    }
  ];

  // Mock данные для графиков
  const chartData: ChartDataPoint[] = [
    { name: 'Янв', bookings: 186, revenue: 8500000, boats: 45, buggies: 67, helicopters: 23, slingshot: 32, swampBuggies: 19, margin: 3400000, cost: 5100000 },
    { name: 'Фев', bookings: 205, revenue: 9200000, boats: 52, buggies: 71, helicopters: 28, slingshot: 35, swampBuggies: 19, margin: 3680000, cost: 5520000 },
    { name: 'Мар', bookings: 237, revenue: 11800000, boats: 58, buggies: 89, helicopters: 35, slingshot: 42, swampBuggies: 13, margin: 4720000, cost: 7080000 },
    { name: 'Апр', bookings: 289, revenue: 14200000, boats: 67, buggies: 105, helicopters: 45, slingshot: 52, swampBuggies: 20, margin: 5680000, cost: 8520000 },
    { name: 'Май', bookings: 324, revenue: 16800000, boats: 78, buggies: 125, helicopters: 52, slingshot: 58, swampBuggies: 11, margin: 6720000, cost: 10080000 },
    { name: 'Июн', bookings: 378, revenue: 19500000, boats: 89, buggies: 142, helicopters: 65, slingshot: 67, swampBuggies: 15, margin: 7800000, cost: 11700000 }
  ];

  // Mock данные клиентских сегментов
  const clientSegments: ClientSegment[] = [
    { name: 'Club Platinum', value: 35, color: '#91040C', growth: 15.2 },
    { name: 'Club Gold', value: 28, color: '#FF6B6B', growth: 8.7 },
    { name: 'Club Silver', value: 22, color: '#4ECDC4', growth: 12.1 },
    { name: 'VIP клиенты', value: 10, color: '#45B7D1', growth: 23.5 },
    { name: 'Разовые', value: 5, color: '#96CEB4', growth: -5.3 }
  ];

  // Mock данные по персоналу
  const staffMetrics: StaffMetric[] = [
    { name: 'Иванов А.', bookingsHandled: 156, conversion: 68, revenue: 8200000, responseTime: 12, rating: 4.8, tasksCompleted: 94 },
    { name: 'Петрова М.', bookingsHandled: 143, conversion: 72, revenue: 7800000, responseTime: 8, rating: 4.9, tasksCompleted: 97 },
    { name: 'Сидоров В.', bookingsHandled: 134, conversion: 65, revenue: 7100000, responseTime: 15, rating: 4.6, tasksCompleted: 89 },
    { name: 'Козлова Е.', bookingsHandled: 128, conversion: 75, revenue: 6900000, responseTime: 10, rating: 4.7, tasksCompleted: 92 }
  ];

  // Mock данные прогнозов
  const forecastData: ForecastData[] = [
    { period: 'Июл 2024', bookings: 420, revenue: 22100000, confidence: 85, trend: 'up' },
    { period: 'Авг 2024', bookings: 465, revenue: 24800000, confidence: 82, trend: 'up' },
    { period: 'Сен 2024', bookings: 398, revenue: 20900000, confidence: 78, trend: 'down' },
    { period: 'Окт 2024', bookings: 342, revenue: 18200000, confidence: 75, trend: 'down' },
    { period: 'Ноя 2024', bookings: 289, revenue: 15600000, confidence: 72, trend: 'down' },
    { period: 'Дек 2024', bookings: 356, revenue: 19800000, confidence: 69, trend: 'up' }
  ];

  // Mock AI инсайты
  const aiInsights: AIInsight[] = [
    {
      id: '1',
      type: 'opportunity',
      title: 'Рост спроса на вертолётные туры',
      description: 'Спрос на вертолётные экскурсии вырос на 45% за последний месяц',
      impact: 'high',
      action: 'Увеличить парк вертолётов'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Падение конверсии у менеджера Сидорова В.',
      description: 'Конверсия снизилась на 12% за последние 2 недели',
      impact: 'medium',
      action: 'Провести дополнительное обучение'
    },
    {
      id: '3',
      type: 'info',
      title: 'Сезонный пик приближается',
      description: 'Ожидается увеличение бронирований на 60% в августе',
      impact: 'high',
      action: 'Подготовить дополнительный персонал'
    }
  ];

  // Топ-10 маршрутов
  const topRoutes = [
    { name: 'Красная Поляна VIP', revenue: 2800000, bookings: 45, growth: 23.5 },
    { name: 'Морской круиз Deluxe', revenue: 2600000, bookings: 52, growth: 18.2 },
    { name: 'Горный экстрим', revenue: 2200000, bookings: 67, growth: 15.8 },
    { name: 'Вертолётная экскурсия', revenue: 1900000, bookings: 38, growth: 45.3 },
    { name: 'Багги-сафари', revenue: 1800000, bookings: 89, growth: 12.1 }
  ];

  const handleDrillDown = (data: any, type: string) => {
    setDrillDownData({ ...data, type });
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral') => {
    switch (type) {
      case 'increase': return <ArrowUpRight className="w-4 h-4 text-green-500" />;
      case 'decrease': return <ArrowDownRight className="w-4 h-4 text-red-500" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getInsightIcon = (type: 'opportunity' | 'warning' | 'info') => {
    switch (type) {
      case 'opportunity': return <TrendingUp className="w-5 h-5 text-green-500" />;
      case 'warning': return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'info': return <Brain className="w-5 h-5 text-blue-500" />;
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок и фильтры */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Расширенная аналитика</h1>
          <p className="text-muted-foreground">
            Комплексный анализ эффективности бизнеса и прогнозирование
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="boats">Катера</SelectItem>
              <SelectItem value="buggies">Багги</SelectItem>
              <SelectItem value="helicopters">Вертолёты</SelectItem>
              <SelectItem value="slingshot">Slingshot</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
        </div>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="dashboard">KPI Дашборд</TabsTrigger>
          <TabsTrigger value="charts">Графики</TabsTrigger>
          <TabsTrigger value="reports">Отчёты</TabsTrigger>
          <TabsTrigger value="forecast">AI-Прогнозы</TabsTrigger>
          <TabsTrigger value="settings">Настройки</TabsTrigger>
        </TabsList>

        {/* KPI Дашборд */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Основные KPI метрики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kpiMetrics.map((metric) => (
              <Card key={metric.id} className="p-6 hover:shadow-lg transition-all duration-200 cursor-pointer hover:border-accent/50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-xl ${
                      metric.changeType === 'increase' ? 'bg-green-500/10 text-green-500' :
                      metric.changeType === 'decrease' ? 'bg-red-500/10 text-red-500' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {metric.icon}
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{metric.title}</p>
                      <p className="text-2xl font-semibold tracking-tight">{metric.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getChangeIcon(metric.changeType)}
                    <span className={`text-sm font-medium ${
                      metric.changeType === 'increase' ? 'text-green-500' : 
                      metric.changeType === 'decrease' ? 'text-red-500' : 'text-muted-foreground'
                    }`}>
                      {Math.abs(metric.change)}%
                    </span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">{metric.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Топ-10 маршрутов */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3>Топ-5 маршрутов по выручке</h3>
                <p className="text-sm text-muted-foreground">Лидеры продаж за текущий период</p>
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Activity className="w-3 h-3" />
                Июнь 2024
              </Badge>
            </div>
            <div className="space-y-4">
              {topRoutes.map((route, index) => (
                <div key={route.name} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/20 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      index === 0 ? 'bg-yellow-500/20 text-yellow-600' :
                      index === 1 ? 'bg-gray-400/20 text-gray-600' :
                      index === 2 ? 'bg-orange-500/20 text-orange-600' :
                      'bg-accent/10 text-accent'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium">{route.name}</p>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{route.bookings} бронирований</span>
                        <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                        <span>Средний чек: {formatCurrency(route.revenue / route.bookings)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-lg">{formatCurrency(route.revenue)}</p>
                    <div className="flex items-center gap-1 justify-end">
                      <TrendingUp className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500 font-medium">+{route.growth}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-border/50">
              <Button variant="outline" className="w-full">
                <Eye className="w-4 h-4 mr-2" />
                Посмотреть все маршруты
              </Button>
            </div>
          </Card>

          {/* Быстрые действия */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-5 h-5 text-blue-500" />
                <h4>Быстрый экспорт</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Скачать готовые отчёты по основным метрикам
              </p>
              <div className="space-y-2">
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  KPI за месяц (PDF)
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Download className="w-4 h-4 mr-2" />
                  Детализация (Excel)
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Bell className="w-5 h-5 text-orange-500" />
                <h4>Уведомления</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Активные оповещения по KPI
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs">Выручка выше плана</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-xs">Загрузка техники 78%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs">NPS ниже нормы</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Brain className="w-5 h-5 text-purple-500" />
                <h4>AI Ассистент</h4>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Персональные инсайты и рекомендации
              </p>
              <Button variant="outline" size="sm" className="w-full">
                <Zap className="w-4 h-4 mr-2" />
                Задать вопрос AI
              </Button>
            </Card>
          </div>
        </TabsContent>

        {/* Графики и разрезы */}
        <TabsContent value="charts" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Бронирования во времени */}
            <Card className="p-6">
              <h3 className="mb-4">Динамика бронирований</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="boats" stroke="#91040C" name="Катера" />
                  <Line type="monotone" dataKey="buggies" stroke="#FF6B6B" name="Багги" />
                  <Line type="monotone" dataKey="helicopters" stroke="#4ECDC4" name="Вертолёты" />
                  <Line type="monotone" dataKey="slingshot" stroke="#45B7D1" name="Slingshot" />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Выручка и маржа */}
            <Card className="p-6">
              <h3 className="mb-4">Выручка и маржа</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <Bar dataKey="revenue" fill="#91040C" name="Выручка" />
                  <Bar dataKey="margin" fill="#4ECDC4" name="Маржа" />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Клиентская аналитика */}
            <Card className="p-6">
              <h3 className="mb-4">Сегментация клиентов</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={clientSegments}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {clientSegments.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Card>

            {/* Показатели персонала */}
            <Card className="p-6">
              <h3 className="mb-4">Эффективность менеджеров</h3>
              <div className="space-y-4">
                {staffMetrics.map((staff) => (
                  <div key={staff.name} className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{staff.name}</span>
                      <Badge variant={staff.conversion > 70 ? "default" : "secondary"}>
                        {staff.conversion}% конверсия
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Обработано</p>
                        <p className="font-medium">{staff.bookingsHandled} заявок</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Выручка</p>
                        <p className="font-medium">{formatCurrency(staff.revenue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Отклик</p>
                        <p className="font-medium">{staff.responseTime} мин</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Рейтинг</p>
                        <p className="font-medium">{staff.rating}/5.0</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Интерактивные отчёты */}
        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Конструктор отчётов</h3>
              <div className="space-y-4">
                <div>
                  <Label>Метрика</Label>
                  <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Выручка</SelectItem>
                      <SelectItem value="bookings">Бронирования</SelectItem>
                      <SelectItem value="clients">Клиенты</SelectItem>
                      <SelectItem value="margin">Маржа</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Срез данных</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите срез" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="category">По категории техники</SelectItem>
                      <SelectItem value="manager">По менеджеру</SelectItem>
                      <SelectItem value="location">По локации</SelectItem>
                      <SelectItem value="club">По клубному статусу</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Период</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите период" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 дней</SelectItem>
                      <SelectItem value="30d">30 дней</SelectItem>
                      <SelectItem value="90d">90 дней</SelectItem>
                      <SelectItem value="1y">1 год</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Построить отчёт
                </Button>
              </div>
            </Card>

            <Card className="lg:col-span-2 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Результат анализа</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Excel
                  </Button>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area type="monotone" dataKey="revenue" stroke="#91040C" fill="#91040C" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          </div>

          {/* Drill-down данные */}
          {drillDownData && (
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Детализация: {drillDownData.type}</h3>
                <Button variant="outline" size="sm" onClick={() => setDrillDownData(null)}>
                  <Eye className="w-4 h-4 mr-2" />
                  Закрыть
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Детальные бронирования</p>
                  <p className="text-xl font-semibold">247 записей</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Уникальные клиенты</p>
                  <p className="text-xl font-semibold">189 клиентов</p>
                </div>
                <div className="border rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">Средний чек</p>
                  <p className="text-xl font-semibold">₽47,300</p>
                </div>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* AI-Прогнозирование */}
        <TabsContent value="forecast" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Прогноз бронирований */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3>Прогноз бронирований</h3>
                <Select value={forecastPeriod} onValueChange={setForecastPeriod}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3months">3 месяца</SelectItem>
                    <SelectItem value="6months">6 месяцев</SelectItem>
                    <SelectItem value="12months">12 месяцев</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="bookings" stroke="#91040C" strokeDasharray="5 5" name="Прогноз" />
                </LineChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm">
                  <span>Доверительный интервал</span>
                  <span className="text-muted-foreground">75-85%</span>
                </div>
                <Progress value={80} className="mt-2" />
              </div>
            </Card>

            {/* Прогноз выручки */}
            <Card className="p-6">
              <h3 className="mb-4">Прогноз выручки</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={forecastData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="period" />
                  <YAxis />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Area type="monotone" dataKey="revenue" stroke="#4ECDC4" fill="#4ECDC4" fillOpacity={0.6} />
                </AreaChart>
              </ResponsiveContainer>
              <div className="mt-4">
                <div className="text-sm text-muted-foreground">Ожидаемая выручка за 6 месяцев</div>
                <div className="text-2xl font-semibold">₽127,400,000</div>
              </div>
            </Card>
          </div>

          {/* AI Инсайты */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>AI Инсайты и рекомендации</h3>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">AI работает</span>
              </div>
            </div>
            <div className="space-y-4">
              {aiInsights.map((insight) => (
                <div key={insight.id} className="border rounded-lg p-4 hover:bg-muted/20 transition-colors">
                  <div className="flex items-start gap-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{insight.title}</h4>
                        <Badge variant={insight.impact === 'high' ? 'destructive' : insight.impact === 'medium' ? 'default' : 'secondary'}>
                          {insight.impact === 'high' ? 'Высокий' : insight.impact === 'medium' ? 'Средний' : 'Низкий'} приоритет
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{insight.description}</p>
                      {insight.action && (
                        <Button variant="outline" size="sm" className="hover:bg-accent">
                          <Zap className="w-4 h-4 mr-2" />
                          {insight.action}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* AI обучение визуализация */}
            <div className="mt-6 p-4 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-lg border">
              <div className="flex items-center gap-3 mb-3">
                <Brain className="w-5 h-5 text-blue-500" />
                <span className="font-medium">Модель машинного обучения</span>
                <Badge variant="outline" className="text-xs">v2.1 Обучена</Badge>
              </div>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Точность прогнозов</p>
                  <p className="font-semibold">87.3%</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Обучающих данных</p>
                  <p className="font-semibold">2.4M записей</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Последнее обновление</p>
                  <p className="font-semibold">2 часа назад</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Прогноз нагрузки на персонал */}
          <Card className="p-6">
            <h3 className="mb-4">Прогноз нагрузки на персонал</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="font-medium">Высокий сезон</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Июль-Август 2024</p>
                <p className="text-lg font-semibold">+3 менеджера</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Пиковая нагрузка</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Август 2024</p>
                <p className="text-lg font-semibold">165%</p>
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="font-medium">Рекомендация</span>
                </div>
                <p className="text-sm text-muted-foreground mb-2">Подготовка к сезону</p>
                <p className="text-lg font-semibold">За 4 недели</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Настройки и уведомления */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Пороговые значения */}
            <Card className="p-6">
              <h3 className="mb-4">Пороговые значения KPI</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Минимальное число бронирований</Label>
                    <p className="text-sm text-muted-foreground">Уведомление при падении ниже</p>
                  </div>
                  <Input type="number" defaultValue="200" className="w-20" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Минимальный средний чек</Label>
                    <p className="text-sm text-muted-foreground">₽ за бронирование</p>
                  </div>
                  <Input type="number" defaultValue="35000" className="w-24" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Критическая загрузка техники</Label>
                    <p className="text-sm text-muted-foreground">% загрузки парка</p>
                  </div>
                  <Input type="number" defaultValue="90" className="w-20" />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Минимальный NPS</Label>
                    <p className="text-sm text-muted-foreground">Балл удовлетворённости</p>
                  </div>
                  <Input type="number" defaultValue="60" className="w-20" />
                </div>
              </div>
            </Card>

            {/* Уведомления */}
            <Card className="p-6">
              <h3 className="mb-4">Настройки уведомлений</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push-уведомления</Label>
                    <p className="text-sm text-muted-foreground">Критические изменения KPI</p>
                  </div>
                  <Switch checked={alertsEnabled} onCheckedChange={setAlertsEnabled} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email отчёты</Label>
                    <p className="text-sm text-muted-foreground">admin@gts.ru</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Telegram уведомления</Label>
                    <p className="text-sm text-muted-foreground">@gts_alerts_bot</p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Slack интеграция</Label>
                    <p className="text-sm text-muted-foreground">#analytics канал</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </Card>

            {/* Регулярные отчёты */}
            <Card className="p-6">
              <h3 className="mb-4">Автоматические отчёты</h3>
              <div className="space-y-4">
                <div>
                  <Label>Частота отправки</Label>
                  <Select value={reportsSchedule} onValueChange={setReportsSchedule}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Ежедневно</SelectItem>
                      <SelectItem value="weekly">Еженедельно</SelectItem>
                      <SelectItem value="monthly">Ежемесячно</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Формат отчёта</Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel</SelectItem>
                      <SelectItem value="both">PDF + Excel</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Получатели</Label>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline">
                      <Mail className="w-3 h-3 mr-1" />
                      alex@gts.ru
                    </Badge>
                    <Badge variant="outline">
                      <Smartphone className="w-3 h-3 mr-1" />
                      Telegram
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Права доступа */}
            <Card className="p-6">
              <h3 className="mb-4">Управление доступом</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Executive</p>
                    <p className="text-sm text-muted-foreground">Полный доступ к аналитике</p>
                  </div>
                  <Badge>Полный</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Финансовый директор</p>
                    <p className="text-sm text-muted-foreground">Финансовые метрики</p>
                  </div>
                  <Badge variant="secondary">Финансы</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Маркетинг-менеджер</p>
                    <p className="text-sm text-muted-foreground">Клиентские метрики</p>
                  </div>
                  <Badge variant="outline">Клиенты</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">Менеджер</p>
                    <p className="text-sm text-muted-foreground">Личные показатели</p>
                  </div>
                  <Badge variant="outline">Свои данные</Badge>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}