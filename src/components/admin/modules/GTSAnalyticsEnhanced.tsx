import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList, ScatterChart, Scatter, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Sankey, ComposedChart
} from "recharts";
import { 
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Target, Activity,
  Calendar, Clock, Award, Zap, Eye, Phone, Mail, MessageSquare,
  BarChart3, PieChart as PieChartIcon, Download, Filter, RefreshCw,
  ArrowUp, ArrowDown, Percent, Hash, Star, Trophy, Crown,
  Building, Briefcase, Globe, MapPin, ChevronRight
} from "lucide-react";

interface GTSAnalyticsEnhancedProps {
  onBack: () => void;
}

// Enhanced sales funnel data with detailed tracking
const salesFunnelData = [
  { 
    name: 'Лиды', 
    value: 12450, 
    fill: '#3B82F6',
    conversion: 100,
    averageValue: 0,
    timeSpent: 0,
    sources: {
      organic: 4520,
      ads: 3890,
      social: 2140,
      referral: 1900
    }
  },
  { 
    name: 'Квалифицированные', 
    value: 5980, 
    fill: '#8B5CF6',
    conversion: 48.1,
    averageValue: 125000,
    timeSpent: 3.2,
    dropoff: 6470,
    dropoffReasons: {
      budget: 2870,
      timing: 1980,
      competition: 1620
    }
  },
  { 
    name: 'Предложения', 
    value: 2890, 
    fill: '#F59E0B',
    conversion: 23.2,
    averageValue: 245000,
    timeSpent: 7.5,
    dropoff: 3090,
    dropoffReasons: {
      price: 1450,
      features: 980,
      other: 660
    }
  },
  { 
    name: 'Переговоры', 
    value: 1450, 
    fill: '#EF4444',
    conversion: 11.6,
    averageValue: 485000,
    timeSpent: 12.3,
    dropoff: 1440,
    dropoffReasons: {
      terms: 680,
      timeline: 450,
      approval: 310
    }
  },
  { 
    name: 'Закрытые сделки', 
    value: 720, 
    fill: '#22C55E',
    conversion: 5.8,
    averageValue: 675000,
    timeSpent: 18.7,
    totalRevenue: 486000000
  }
];

// Multi-touch attribution data
const attributionData = [
  {
    customerId: 'cust-001',
    customerValue: 850000,
    touchpoints: [
      { channel: 'organic', timestamp: '2024-10-15', value: 30 },
      { channel: 'social', timestamp: '2024-10-18', value: 15 },
      { channel: 'email', timestamp: '2024-10-22', value: 25 },
      { channel: 'direct', timestamp: '2024-10-25', value: 30 }
    ],
    conversionDate: '2024-10-25'
  },
  {
    customerId: 'cust-002', 
    customerValue: 425000,
    touchpoints: [
      { channel: 'ads', timestamp: '2024-10-12', value: 40 },
      { channel: 'social', timestamp: '2024-10-14', value: 20 },
      { channel: 'email', timestamp: '2024-10-20', value: 40 }
    ],
    conversionDate: '2024-10-20'
  }
];

// Customer journey stages with detailed analytics
const customerJourneyData = [
  {
    stage: 'Awareness',
    visitors: 45000,
    conversionRate: 15.2,
    avgTimeSpent: '2:34',
    topSources: ['Organic Search', 'Social Media', 'Paid Ads'],
    keyActions: ['Page views', 'Content consumption', 'Social shares'],
    dropoffRate: 84.8
  },
  {
    stage: 'Interest', 
    visitors: 6840,
    conversionRate: 28.7,
    avgTimeSpent: '8:15',
    topSources: ['Direct', 'Email', 'Referral'],
    keyActions: ['Form fills', 'Brochure downloads', 'Video views'],
    dropoffRate: 71.3
  },
  {
    stage: 'Consideration',
    visitors: 1963,
    conversionRate: 45.2,
    avgTimeSpent: '15:42',
    topSources: ['Direct', 'Email', 'Phone calls'],
    keyActions: ['Quote requests', 'Consultations', 'Comparisons'],
    dropoffRate: 54.8
  },
  {
    stage: 'Intent',
    visitors: 887,
    conversionRate: 62.1,
    avgTimeSpent: '22:18',
    topSources: ['Direct', 'Phone', 'In-person'],
    keyActions: ['Demos', 'Trials', 'Negotiations'],
    dropoffRate: 37.9
  },
  {
    stage: 'Purchase',
    visitors: 551,
    conversionRate: 78.4,
    avgTimeSpent: '45:33',
    topSources: ['Direct', 'Phone', 'In-person'],
    keyActions: ['Contract signing', 'Payment', 'Onboarding'],
    dropoffRate: 21.6
  },
  {
    stage: 'Loyalty',
    visitors: 432,
    conversionRate: 89.3,
    avgTimeSpent: 'Ongoing',
    topSources: ['Direct', 'Email', 'App'],
    keyActions: ['Repeat bookings', 'Referrals', 'Reviews'],
    dropoffRate: 10.7
  }
];

// Cohort analysis data
const cohortData = [
  {
    month: 'Январь 2024',
    newCustomers: 145,
    retention: {
      month1: 89.7,
      month3: 76.5,
      month6: 68.2,
      month12: 58.6
    },
    ltv: 485000
  },
  {
    month: 'Февраль 2024',
    newCustomers: 167,
    retention: {
      month1: 91.2,
      month3: 78.9,
      month6: 71.3,
      month12: 0 // Not yet measured
    },
    ltv: 512000
  },
  {
    month: 'Март 2024',
    newCustomers: 189,
    retention: {
      month1: 88.4,
      month3: 75.1,
      month6: 0,
      month12: 0
    },
    ltv: 467000
  }
];

// Channel performance with detailed attribution
const channelPerformanceData = [
  {
    channel: 'Organic Search',
    visits: 58000,
    leads: 2850,
    customers: 456,
    revenue: 243500000,
    cpa: 0,
    ltv: 534000,
    roi: 'Infinite',
    attribution: {
      firstTouch: 35,
      lastTouch: 42,
      linear: 38,
      timeDecay: 40,
      positionBased: 39
    },
    touchpointJourney: [
      { position: 'First', percentage: 45 },
      { position: 'Middle', percentage: 35 },
      { position: 'Last', percentage: 20 }
    ]
  },
  {
    channel: 'Google Ads',
    visits: 48000,
    leads: 2240,
    customers: 358,
    revenue: 195600000,
    cpa: 1456,
    ltv: 546000,
    roi: 375,
    attribution: {
      firstTouch: 28,
      lastTouch: 32,
      linear: 30,
      timeDecay: 31,
      positionBased: 30
    },
    touchpointJourney: [
      { position: 'First', percentage: 55 },
      { position: 'Middle', percentage: 30 },
      { position: 'Last', percentage: 15 }
    ]
  },
  {
    channel: 'Social Media',
    visits: 32000,
    leads: 1280,
    customers: 205,
    revenue: 98400000,
    cpa: 890,
    ltv: 480000,
    roi: 539,
    attribution: {
      firstTouch: 22,
      lastTouch: 18,
      linear: 20,
      timeDecay: 19,
      positionBased: 20
    },
    touchpointJourney: [
      { position: 'First', percentage: 40 },
      { position: 'Middle', percentage: 45 },
      { position: 'Last', percentage: 15 }
    ]
  },
  {
    channel: 'Partners',
    visits: 25000,
    leads: 1125,
    customers: 180,
    revenue: 86400000,
    cpa: 1234,
    ltv: 480000,
    roi: 389,
    attribution: {
      firstTouch: 15,
      lastTouch: 8,
      linear: 12,
      timeDecay: 10,
      positionBased: 11
    },
    touchpointJourney: [
      { position: 'First', percentage: 25 },
      { position: 'Middle', percentage: 35 },
      { position: 'Last', percentage: 40 }
    ]
  }
];

// Real-time metrics simulation
const realTimeMetrics = {
  activeUsers: 1247,
  sessionsToday: 3856,
  conversionRateToday: 4.8,
  revenueToday: 1285000,
  topPages: [
    { page: '/yacht-rentals', views: 856, conversions: 24 },
    { page: '/helicopter-tours', views: 632, conversions: 18 },
    { page: '/luxury-cars', views: 478, conversions: 15 }
  ],
  liveLeads: [
    { name: 'Михаил К.', action: 'Запросил цену на яхту', time: '2 мин назад', value: 450000 },
    { name: 'Елена В.', action: 'Заполнила форму', time: '5 мин назад', value: 125000 },
    { name: 'Андрей С.', action: 'Позвонил в отдел продаж', time: '8 мин назад', value: 280000 }
  ]
};

export function GTSAnalyticsEnhanced({ onBack }: GTSAnalyticsEnhancedProps) {
  const [activeTab, setActiveTab] = useState("funnel");
  const [dateRange, setDateRange] = useState("30d");
  const [selectedAttribution, setSelectedAttribution] = useState("linear");
  const [realTimeData, setRealTimeData] = useState(realTimeMetrics);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
        sessionsToday: prev.sessionsToday + Math.floor(Math.random() * 5),
        revenueToday: prev.revenueToday + Math.floor(Math.random() * 50000)
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  // Calculate conversion rates between stages
  const getConversionRate = (current: number, previous: number) => {
    return ((current / previous) * 100).toFixed(1);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Enhanced Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                Расширенная аналитика
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Воронка продаж, атрибуция и многоканальная аналитика
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#17181A] border-[#232428]">
                <SelectItem value="7d">7 дней</SelectItem>
                <SelectItem value="30d">30 дней</SelectItem>
                <SelectItem value="90d">90 дней</SelectItem>
                <SelectItem value="12m">12 месяцев</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <RefreshCw className="h-4 w-4 mr-2" />
              Обновить
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Real-time Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428] relative overflow-hidden">
            <div className="absolute top-2 right-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Онлайн сейчас</p>
                  <p className="text-xl font-heading text-white">{realTimeData.activeUsers.toLocaleString()}</p>
                  <p className="text-xs text-green-400">пользователей</p>
                </div>
                <Eye className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Сессии сегодня</p>
                  <p className="text-xl font-heading text-white">{realTimeData.sessionsToday.toLocaleString()}</p>
                  <p className="text-xs text-blue-400">+12% к вчера</p>
                </div>
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Конверсия сегодня</p>
                  <p className="text-xl font-heading text-white">{realTimeData.conversionRateToday}%</p>
                  <p className="text-xs text-yellow-400">+0.3% к вчера</p>
                </div>
                <Target className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Доход сегодня</p>
                  <p className="text-xl font-heading text-white">{formatCurrency(realTimeData.revenueToday)}</p>
                  <p className="text-xs text-emerald-400">+8.7% к вчера</p>
                </div>
                <DollarSign className="h-6 w-6 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-[#121214] border-[#232428]">
            <TabsTrigger value="crm-reports" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              CRM Reports
            </TabsTrigger>
            <TabsTrigger value="funnel" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Воронка продаж
            </TabsTrigger>
            <TabsTrigger value="attribution" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Атрибуция
            </TabsTrigger>
            <TabsTrigger value="journey" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Customer Journey
            </TabsTrigger>
            <TabsTrigger value="cohorts" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Когорты
            </TabsTrigger>
            <TabsTrigger value="realtime" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Реальное время
            </TabsTrigger>
          </TabsList>

          {/* Sales Funnel Tab */}
          <TabsContent value="funnel" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Расширенная воронка продаж</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      Детальная аналитика с причинами отказов и временем на каждом этапе
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={400}>
                      <FunnelChart>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#17181A', 
                            border: '1px solid #232428',
                            borderRadius: '8px',
                            color: '#FFFFFF'
                          }}
                        />
                        <Funnel
                          dataKey="value"
                          data={salesFunnelData}
                          isAnimationActive
                        >
                          <LabelList position="center" fill="#fff" stroke="none" />
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>

                    {/* Enhanced funnel metrics */}
                    <div className="mt-6 space-y-4">
                      {salesFunnelData.map((stage, index) => {
                        const nextStage = salesFunnelData[index + 1];
                        const conversionRate = nextStage ? 
                          ((nextStage.value / stage.value) * 100).toFixed(1) : null;
                        
                        return (
                          <div key={stage.name} className="p-4 bg-[#17181A] rounded-lg">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-medium text-white flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded"
                                  style={{ backgroundColor: stage.fill }}
                                />
                                {stage.name}
                              </h4>
                              <div className="flex items-center gap-4 text-sm">
                                <span className="text-white font-medium">{formatNumber(stage.value)}</span>
                                <span className="text-[#A6A7AA]">{stage.conversion}%</span>
                                {conversionRate && (
                                  <Badge className="bg-green-500/10 text-green-400">
                                    →{conversionRate}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                              {stage.averageValue > 0 && (
                                <div>
                                  <span className="text-[#A6A7AA]">Ср. сумма:</span>
                                  <p className="text-white font-medium">{formatCurrency(stage.averageValue)}</p>
                                </div>
                              )}
                              {stage.timeSpent > 0 && (
                                <div>
                                  <span className="text-[#A6A7AA]">Ср. время:</span>
                                  <p className="text-white font-medium">{stage.timeSpent} дн.</p>
                                </div>
                              )}
                              {stage.dropoff && (
                                <div>
                                  <span className="text-[#A6A7AA]">Отказы:</span>
                                  <p className="text-red-400 font-medium">{formatNumber(stage.dropoff)}</p>
                                </div>
                              )}
                              {stage.totalRevenue && (
                                <div>
                                  <span className="text-[#A6A7AA]">Общий доход:</span>
                                  <p className="text-green-400 font-medium">{formatCurrency(stage.totalRevenue)}</p>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Funnel insights sidebar */}
              <div className="space-y-4">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Ключевые метрики</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Общая конверсия:</span>
                        <span className="text-white font-medium">5.8%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Ср. время цикла:</span>
                        <span className="text-white font-medium">41.7 дней</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">LTV:</span>
                        <span className="text-white font-medium">{formatCurrency(675000)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Общий доход:</span>
                        <span className="text-green-400 font-medium">{formatCurrency(486000000)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Основные причины отказов</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {[
                      { reason: 'Высокая цена', percentage: 32, color: 'bg-red-500' },
                      { reason: 'Неподходящее время', percentage: 24, color: 'bg-orange-500' },
                      { reason: 'Бюджетные ограничения', percentage: 21, color: 'bg-yellow-500' },
                      { reason: 'Конкуренты', percentage: 23, color: 'bg-blue-500' }
                    ].map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white">{item.reason}</span>
                          <span className="text-[#A6A7AA]">{item.percentage}%</span>
                        </div>
                        <div className="h-2 bg-[#232428] rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${item.color} transition-all duration-500`}
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Multi-touch Attribution Tab */}
          <TabsContent value="attribution" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Multi-touch атрибуция</CardTitle>
                      <CardDescription className="text-[#A6A7AA]">
                        Влияние каналов на разных этапах пути клиента
                      </CardDescription>
                    </div>
                    <Select value={selectedAttribution} onValueChange={setSelectedAttribution}>
                      <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#17181A] border-[#232428]">
                        <SelectItem value="firstTouch">Первое касание</SelectItem>
                        <SelectItem value="lastTouch">Последнее касание</SelectItem>
                        <SelectItem value="linear">Линейная</SelectItem>
                        <SelectItem value="timeDecay">Временное затухание</SelectItem>
                        <SelectItem value="positionBased">По позициям</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {channelPerformanceData.map((channel, index) => {
                      const attributionValue = channel.attribution[selectedAttribution as keyof typeof channel.attribution];
                      
                      return (
                        <div key={index} className="p-4 bg-[#17181A] rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">{channel.channel}</h4>
                            <div className="text-right">
                              <span className="text-lg font-heading text-white">{attributionValue}%</span>
                              <p className="text-xs text-[#A6A7AA]">атрибуция</p>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-3 gap-4 text-xs">
                            <div>
                              <span className="text-[#A6A7AA]">Доход:</span>
                              <p className="text-green-400 font-medium">{formatCurrency(channel.revenue)}</p>
                            </div>
                            <div>
                              <span className="text-[#A6A7AA]">ROI:</span>
                              <p className="text-white font-medium">
                                {typeof channel.roi === 'string' ? channel.roi : `${channel.roi}%`}
                              </p>
                            </div>
                            <div>
                              <span className="text-[#A6A7AA]">LTV:</span>
                              <p className="text-white font-medium">{formatCurrency(channel.ltv)}</p>
                            </div>
                          </div>
                          
                          <div className="mt-3 h-2 bg-[#232428] rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-700"
                              style={{ width: `${attributionValue}%` }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Touchpoint Position Analysis */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Анализ позиций касаний</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Роль каналов в начале, середине и конце пути клиента
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={channelPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="channel" stroke="#A6A7AA" fontSize={12} />
                      <YAxis stroke="#A6A7AA" fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Legend />
                      <Bar dataKey="touchpointJourney[0].percentage" name="Первое касание" fill="#3B82F6" />
                      <Bar dataKey="touchpointJourney[1].percentage" name="Середина пути" fill="#8B5CF6" />
                      <Bar dataKey="touchpointJourney[2].percentage" name="Последнее касание" fill="#22C55E" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Customer Journey Tab */}
          <TabsContent value="journey" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Детальный путь клиента</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Анализ поведения и конверсий на каждом этапе
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {customerJourneyData.map((stage, index) => (
                    <div key={index} className="relative">
                      {/* Connection line */}
                      {index < customerJourneyData.length - 1 && (
                        <div className="absolute left-6 top-16 w-0.5 h-24 bg-[#232428]"></div>
                      )}
                      
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#91040C] flex items-center justify-center flex-shrink-0">
                          <span className="text-white font-bold">{index + 1}</span>
                        </div>
                        
                        <Card className="flex-1 bg-[#17181A] border-[#232428]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-heading text-white">{stage.stage}</h3>
                              <div className="flex items-center gap-4">
                                <Badge className="bg-blue-500/10 text-blue-400">
                                  {formatNumber(stage.visitors)} посетителей
                                </Badge>
                                <Badge className="bg-green-500/10 text-green-400">
                                  {stage.conversionRate}% конверсия
                                </Badge>
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                              <div>
                                <p className="text-xs text-[#A6A7AA] mb-1">Время на этапе</p>
                                <p className="text-white font-medium">{stage.avgTimeSpent}</p>
                              </div>
                              <div>
                                <p className="text-xs text-[#A6A7AA] mb-1">Топ источники</p>
                                <div className="flex flex-wrap gap-1">
                                  {stage.topSources.slice(0, 2).map((source, idx) => (
                                    <Badge key={idx} className="text-xs bg-[#232428] text-[#A6A7AA]">
                                      {source}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-[#A6A7AA] mb-1">Ключевые действия</p>
                                <div className="flex flex-wrap gap-1">
                                  {stage.keyActions.slice(0, 2).map((action, idx) => (
                                    <Badge key={idx} className="text-xs bg-purple-500/10 text-purple-400">
                                      {action}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div>
                                <p className="text-xs text-[#A6A7AA] mb-1">Отток</p>
                                <div className="flex items-center gap-2">
                                  <span className="text-red-400 font-medium">{stage.dropoffRate}%</span>
                                  <div className="flex-1 h-2 bg-[#232428] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-red-500"
                                      style={{ width: `${stage.dropoffRate}%` }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cohort Analysis Tab */}
          <TabsContent value="cohorts" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Когортный анализ</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Удержание и LTV по месяцам регистрации
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-[#232428]">
                        <th className="text-left p-3 text-[#A6A7AA] text-sm">Когорта</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">Новые клиенты</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">1 месяц</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">3 месяца</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">6 месяцев</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">12 месяцев</th>
                        <th className="text-center p-3 text-[#A6A7AA] text-sm">LTV</th>
                      </tr>
                    </thead>
                    <tbody>
                      {cohortData.map((cohort, index) => (
                        <tr key={index} className="border-b border-[#232428]">
                          <td className="p-3 text-white font-medium">{cohort.month}</td>
                          <td className="p-3 text-center text-white">{cohort.newCustomers}</td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-white">{cohort.retention.month1}%</span>
                              <div className="w-12 h-2 bg-[#232428] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-green-500"
                                  style={{ width: `${cohort.retention.month1}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            <div className="flex items-center justify-center gap-2">
                              <span className="text-white">{cohort.retention.month3}%</span>
                              <div className="w-12 h-2 bg-[#232428] rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-yellow-500"
                                  style={{ width: `${cohort.retention.month3}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="p-3 text-center">
                            {cohort.retention.month6 > 0 ? (
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-white">{cohort.retention.month6}%</span>
                                <div className="w-12 h-2 bg-[#232428] rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-orange-500"
                                    style={{ width: `${cohort.retention.month6}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-[#A6A7AA]">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center">
                            {cohort.retention.month12 > 0 ? (
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-white">{cohort.retention.month12}%</span>
                                <div className="w-12 h-2 bg-[#232428] rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${cohort.retention.month12}%` }}
                                  />
                                </div>
                              </div>
                            ) : (
                              <span className="text-[#A6A7AA]">—</span>
                            )}
                          </td>
                          <td className="p-3 text-center text-green-400 font-medium">
                            {formatCurrency(cohort.ltv)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Real-time Analytics Tab */}
          <TabsContent value="realtime" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Активность в реальном времени
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 bg-[#17181A] rounded-lg">
                      <p className="text-2xl font-heading text-white">{realTimeData.activeUsers}</p>
                      <p className="text-xs text-[#A6A7AA]">Активные пользователи</p>
                    </div>
                    <div className="text-center p-3 bg-[#17181A] rounded-lg">
                      <p className="text-2xl font-heading text-white">{realTimeData.sessionsToday}</p>
                      <p className="text-xs text-[#A6A7AA]">Сессии сегодня</p>
                    </div>
                    <div className="text-center p-3 bg-[#17181A] rounded-lg">
                      <p className="text-2xl font-heading text-white">{realTimeData.conversionRateToday}%</p>
                      <p className="text-xs text-[#A6A7AA]">Конверсия</p>
                    </div>
                  </div>

                  <Separator className="bg-[#232428]" />

                  <div>
                    <h4 className="font-medium text-white mb-3">Топ страницы прямо сейчас</h4>
                    <div className="space-y-2">
                      {realTimeData.topPages.map((page, index) => (
                        <div key={index} className="flex items-center justify-between p-2 bg-[#17181A] rounded">
                          <div>
                            <p className="text-sm text-white">{page.page}</p>
                            <p className="text-xs text-[#A6A7AA]">{page.views} просмотров</p>
                          </div>
                          <Badge className="bg-green-500/10 text-green-400">
                            {page.conversions} конверсий
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Живая лента лидов</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Последние действия потенциальных клиентов
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {realTimeData.liveLeads.map((lead, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-[#17181A] rounded-lg">
                      <Avatar className="h-8 w-8 mt-1">
                        <AvatarFallback className="bg-[#232428] text-white text-xs">
                          {lead.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="text-sm text-white">
                          <span className="font-medium">{lead.name}</span> {lead.action}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <p className="text-xs text-[#A6A7AA]">{lead.time}</p>
                          <Badge className="bg-yellow-500/10 text-yellow-400 text-xs">
                            {formatCurrency(lead.value)}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div className="text-center py-4">
                    <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                      <RefreshCw className="h-3 w-3 mr-2" />
                      Обновить ленту
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}