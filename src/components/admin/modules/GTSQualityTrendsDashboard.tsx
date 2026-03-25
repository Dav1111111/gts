import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Progress } from "../../ui/progress";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { ScrollArea } from "../../ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from "recharts";
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Clock,
  MessageSquare,
  Users,
  Star,
  Target,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Eye,
  BarChart3,
  PieChart as PieChartIcon,
  Calendar,
  Filter,
  Download,
  RefreshCw,
  Zap,
  Phone,
  Mail,
  Bot,
  UserCheck,
  Timer,
  Award,
  ThumbsUp,
  ThumbsDown,
  ArrowUp,
  ArrowDown,
  Minus,
  Brain,
  Headphones,
  ShoppingCart,
  Plane,
  Car,
  Waves,
  Crown,
  MapPin,
  DollarSign
} from "lucide-react";

interface GTSQualityTrendsDashboardProps {
  onBack?: () => void;
}

// Mock KPI data
const kpiData = {
  autoReplyRate: {
    current: 87.3,
    previous: 82.1,
    target: 85.0,
    trend: "up"
  },
  avgResponseTime: {
    current: 2.4, // in minutes
    previous: 3.1,
    target: 3.0,
    trend: "up"
  },
  csat: {
    current: 4.6,
    previous: 4.3,
    target: 4.5,
    trend: "up"
  },
  nps: {
    current: 72,
    previous: 68,
    target: 70,
    trend: "up"
  },
  conversionRate: {
    dialog: 34.2,
    deal: 78.5,
    booking: 92.1,
    overall: 24.8,
    trend: "up"
  }
};

// Mock trends data
const responseTimeTrends = [
  { date: "Jan", avgTime: 3.2, autoReply: 78, manual: 22 },
  { date: "Feb", avgTime: 2.9, autoReply: 82, manual: 18 },
  { date: "Mar", avgTime: 2.7, autoReply: 84, manual: 16 },
  { date: "Apr", avgTime: 2.5, autoReply: 86, manual: 14 },
  { date: "May", avgTime: 2.4, autoReply: 87, manual: 13 }
];

const satisfactionTrends = [
  { date: "Jan", csat: 4.2, nps: 65, responses: 234 },
  { date: "Feb", csat: 4.3, nps: 67, responses: 267 },
  { date: "Mar", csat: 4.4, nps: 69, responses: 298 },
  { date: "Apr", csat: 4.5, nps: 71, responses: 312 },
  { date: "May", csat: 4.6, nps: 72, responses: 345 }
];

const conversionFunnelData = [
  { stage: "Dialogs", count: 1250, rate: 100, color: "#3B82F6" },
  { stage: "Qualified", count: 875, rate: 70, color: "#06B6D4" },
  { stage: "Deals", count: 428, rate: 34.2, color: "#10B981" },
  { stage: "Proposals", count: 336, rate: 78.5, color: "#F59E0B" },
  { stage: "Bookings", count: 310, rate: 92.1, color: "#91040C" }
];

// Top intents data
const topIntentsData = [
  { intent: "Helicopter Tours", count: 342, percentage: 28.5, trend: "+12%", sentiment: "positive" },
  { intent: "Pricing Inquiry", count: 289, percentage: 24.1, trend: "+8%", sentiment: "neutral" },
  { intent: "Availability Check", count: 234, percentage: 19.5, trend: "+5%", sentiment: "positive" },
  { intent: "Booking Change", count: 156, percentage: 13.0, trend: "-2%", sentiment: "neutral" },
  { intent: "Cancellation", count: 98, percentage: 8.2, trend: "-15%", sentiment: "negative" },
  { intent: "Support Request", count: 81, percentage: 6.7, trend: "+3%", sentiment: "neutral" }
];

// Product demand data
const productDemandData = [
  { product: "Helicopter VIP", demand: 342, revenue: 15400000, growth: 18.5 },
  { product: "Yacht Charter", demand: 234, revenue: 8760000, growth: 12.3 },
  { product: "Sports Car", demand: 189, revenue: 5670000, growth: 8.7 },
  { product: "Buggy Adventure", demand: 156, revenue: 1872000, growth: 15.2 },
  { product: "Jet Ski", demand: 123, revenue: 984000, growth: 22.1 },
  { product: "Wakeboard", demand: 89, revenue: 534000, growth: 6.8 }
];

// SLA breaches data
const slaBreachesData = [
  { date: "Week 1", critical: 2, high: 5, medium: 12, total: 19 },
  { date: "Week 2", critical: 1, high: 8, medium: 15, total: 24 },
  { date: "Week 3", critical: 3, high: 6, medium: 18, total: 27 },
  { date: "Week 4", critical: 1, high: 4, medium: 9, total: 14 },
  { date: "Week 5", critical: 0, high: 3, medium: 7, total: 10 }
];

// Agent performance data
const agentPerformanceData = [
  {
    id: "agent-001",
    name: "Анна Смирнова",
    avatar: "",
    dialogs: 156,
    avgResponseTime: 1.8,
    csat: 4.8,
    conversions: 42,
    conversionRate: 26.9,
    rating: "excellent"
  },
  {
    id: "agent-002", 
    name: "Дмитрий Волков",
    avatar: "",
    dialogs: 134,
    avgResponseTime: 2.1,
    csat: 4.6,
    conversions: 35,
    conversionRate: 26.1,
    rating: "excellent"
  },
  {
    id: "agent-003",
    name: "Мария Козлова",
    avatar: "",
    dialogs: 128,
    avgResponseTime: 2.4,
    csat: 4.5,
    conversions: 29,
    conversionRate: 22.7,
    rating: "good"
  },
  {
    id: "agent-004",
    name: "Алексей Петров",
    avatar: "",
    dialogs: 98,
    avgResponseTime: 2.9,
    csat: 4.2,
    conversions: 18,
    conversionRate: 18.4,
    rating: "average"
  },
  {
    id: "agent-005",
    name: "Елена Сидорова",
    avatar: "",
    dialogs: 87,
    avgResponseTime: 3.2,
    csat: 4.0,
    conversions: 14,
    conversionRate: 16.1,
    rating: "needs_improvement"
  }
];

const COLORS = ["#91040C", "#3B82F6", "#10B981", "#F59E0B", "#8B5CF6", "#06B6D4"];

export function GTSQualityTrendsDashboard({ onBack }: GTSQualityTrendsDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [activeTab, setActiveTab] = useState("overview");

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB', 
      minimumFractionDigits: 0,
      maximumFractionDigits: 0 
    }).format(value);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <ArrowUp className="w-3 h-3 text-green-400" />;
      case "down": return <ArrowDown className="w-3 h-3 text-red-400" />;
      default: return <Minus className="w-3 h-3 text-[#A6A7AA]" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "up": return "text-green-400";
      case "down": return "text-red-400";
      default: return "text-[#A6A7AA]";
    }
  };

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case "excellent": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "good": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "average": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "needs_improvement": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "positive": return "text-green-400";
      case "negative": return "text-red-400";
      default: return "text-yellow-400";
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-heading text-white">
                Quality & Trends Dashboard
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Аналитика качества обслуживания и трендов конверсии
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-32 bg-[#17181A] border-[#232428] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#17181A] border-[#232428]">
                <SelectItem value="7d">7 дней</SelectItem>
                <SelectItem value="30d">30 дней</SelectItem>
                <SelectItem value="90d">90 дней</SelectItem>
                <SelectItem value="1y">1 год</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
            <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428] mb-6">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Обзор
            </TabsTrigger>
            <TabsTrigger value="conversion" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Конверсии
            </TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Качество
            </TabsTrigger>
            <TabsTrigger value="agents" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Агенты
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {/* Auto-reply Rate */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4 text-blue-400" />
                      <span className="text-xs text-[#A6A7AA]">Auto-reply %</span>
                    </div>
                    {getTrendIcon(kpiData.autoReplyRate.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-heading text-white">{kpiData.autoReplyRate.current}%</div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${getTrendColor(kpiData.autoReplyRate.trend)}`}>
                        +{(kpiData.autoReplyRate.current - kpiData.autoReplyRate.previous).toFixed(1)}%
                      </span>
                      <span className="text-xs text-[#A6A7AA]">vs target {kpiData.autoReplyRate.target}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Avg Response Time */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Timer className="w-4 h-4 text-green-400" />
                      <span className="text-xs text-[#A6A7AA]">Avg Response</span>
                    </div>
                    {getTrendIcon(kpiData.avgResponseTime.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-heading text-white">{kpiData.avgResponseTime.current}m</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">
                        -{(kpiData.avgResponseTime.previous - kpiData.avgResponseTime.current).toFixed(1)}m
                      </span>
                      <span className="text-xs text-[#A6A7AA]">target {kpiData.avgResponseTime.target}m</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* CSAT */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400" />
                      <span className="text-xs text-[#A6A7AA]">CSAT</span>
                    </div>
                    {getTrendIcon(kpiData.csat.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-heading text-white">{kpiData.csat.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">
                        +{(kpiData.csat.current - kpiData.csat.previous).toFixed(1)}
                      </span>
                      <span className="text-xs text-[#A6A7AA]">target {kpiData.csat.target}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* NPS */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <ThumbsUp className="w-4 h-4 text-purple-400" />
                      <span className="text-xs text-[#A6A7AA]">NPS</span>
                    </div>
                    {getTrendIcon(kpiData.nps.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-heading text-white">{kpiData.nps.current}</div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-green-400">
                        +{kpiData.nps.current - kpiData.nps.previous}
                      </span>
                      <span className="text-xs text-[#A6A7AA]">target {kpiData.nps.target}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Overall Conversion */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#91040C]" />
                      <span className="text-xs text-[#A6A7AA]">Conversion</span>
                    </div>
                    {getTrendIcon(kpiData.conversionRate.trend)}
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-heading text-white">{kpiData.conversionRate.overall}%</div>
                    <div className="text-xs text-[#A6A7AA]">
                      Dialog → Booking
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Top Intents */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Brain className="w-5 h-5 text-purple-400" />
                    Top Intents
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Наиболее часто встречающиеся намерения клиентов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {topIntentsData.map((intent, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#17181A] rounded">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm font-medium text-white">{intent.intent}</span>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getSentimentColor(intent.sentiment)}`}>
                                {intent.sentiment}
                              </span>
                              <span className={`text-xs ${intent.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                                {intent.trend}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-[#A6A7AA]">{intent.count} mentions</span>
                            <span className="text-xs text-white">{intent.percentage}%</span>
                          </div>
                          <Progress value={intent.percentage} className="h-1 mt-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Product Demand */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5 text-green-400" />
                    Demand by Product
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Спрос и доходы по продуктам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={productDemandData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis 
                        dataKey="product" 
                        tick={{ fill: '#A6A7AA', fontSize: 11 }}
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428', 
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value, name) => [
                          name === 'demand' ? value : formatCurrency(Number(value)),
                          name === 'demand' ? 'Заявки' : 'Доход'
                        ]}
                      />
                      <Bar dataKey="demand" fill="#91040C" radius={[2, 2, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Conversion Tab */}
          <TabsContent value="conversion" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Conversion Funnel */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Target className="w-5 h-5 text-[#91040C]" />
                    Dialog → Deal → Booking Conversion
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Воронка конверсий от первого контакта до бронирования
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conversionFunnelData.map((stage, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-white">{stage.stage}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-white">{stage.count}</span>
                            <span className="text-xs text-[#A6A7AA]">({stage.rate}%)</span>
                          </div>
                        </div>
                        <div className="relative">
                          <div className="w-full bg-[#17181A] rounded-full h-3">
                            <div 
                              className="h-3 rounded-full"
                              style={{ 
                                width: `${stage.rate}%`, 
                                backgroundColor: stage.color 
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Response Time Trends */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Clock className="w-5 h-5 text-blue-400" />
                    Response Time Trends
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Тренды времени ответа и автоматизации
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={responseTimeTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="date" tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428', 
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="avgTime" 
                        stroke="#3B82F6" 
                        strokeWidth={2}
                        name="Avg Response Time (min)"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="autoReply" 
                        stroke="#10B981" 
                        strokeWidth={2}
                        name="Auto-reply Rate (%)"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Quality Tab */}
          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* CSAT/NPS Trends */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400" />
                    CSAT/NPS Trends
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Динамика удовлетворенности клиентов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={satisfactionTrends}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="date" tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428', 
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="csat" 
                        stackId="1"
                        stroke="#F59E0B" 
                        fill="#F59E0B"
                        fillOpacity={0.3}
                        name="CSAT"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="nps" 
                        stackId="2"
                        stroke="#8B5CF6" 
                        fill="#8B5CF6"
                        fillOpacity={0.3}
                        name="NPS"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* SLA Breaches */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    SLA Breaches
                  </CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Нарушения SLA по уровням критичности
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={slaBreachesData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="date" tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <YAxis tick={{ fill: '#A6A7AA', fontSize: 11 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428', 
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Bar dataKey="critical" stackId="a" fill="#E5484D" name="Critical" />
                      <Bar dataKey="high" stackId="a" fill="#F59E0B" name="High" />
                      <Bar dataKey="medium" stackId="a" fill="#10B981" name="Medium" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agents Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Users className="w-5 h-5 text-blue-400" />
                  Agent Performance
                </CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Подробная аналитика производительности агентов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {agentPerformanceData.map((agent) => (
                    <Card key={agent.id} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#232428] text-white">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium text-white">{agent.name}</h4>
                              <Badge className={`text-xs ${getRatingColor(agent.rating)}`}>
                                {agent.rating.replace('_', ' ')}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-white font-medium">{agent.conversionRate}%</div>
                            <div className="text-xs text-[#A6A7AA]">conversion rate</div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <MessageSquare className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-[#A6A7AA]">Диалоги</span>
                            </div>
                            <div className="text-sm font-medium text-white">{agent.dialogs}</div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <Clock className="w-3 h-3 text-green-400" />
                              <span className="text-xs text-[#A6A7AA]">Avg Response</span>
                            </div>
                            <div className="text-sm font-medium text-white">{agent.avgResponseTime}m</div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <Star className="w-3 h-3 text-yellow-400" />
                              <span className="text-xs text-[#A6A7AA]">CSAT</span>
                            </div>
                            <div className="text-sm font-medium text-white">{agent.csat}</div>
                          </div>
                          
                          <div>
                            <div className="flex items-center gap-1 mb-1">
                              <Target className="w-3 h-3 text-[#91040C]" />
                              <span className="text-xs text-[#A6A7AA]">Conversions</span>
                            </div>
                            <div className="text-sm font-medium text-white">{agent.conversions}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}