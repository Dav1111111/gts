import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList, ComposedChart
} from "recharts";
import { 
  ArrowLeft, TrendingUp, TrendingDown, DollarSign, Users, Target, Activity,
  Calendar, Clock, Award, Eye, Phone, Mail, MessageSquare,
  BarChart3, PieChart as PieChartIcon, Download, Filter, RefreshCw,
  ArrowUp, ArrowDown, Percent, Hash, Star, Trophy, Crown,
  Building, Briefcase, Globe, MapPin, ChevronRight
} from "lucide-react";

interface GTSCRMReportsEnhancedProps {
  onBack: () => void;
}

// CRM Funnel Data - Leads → Deals → Prepaid → Bookings → Completed
const crmFunnelData = [
  { 
    name: 'Лиды', 
    value: 8540, 
    fill: '#3B82F6',
    conversion: 100,
    avgTime: 0,
    dropoffRate: 0
  },
  { 
    name: 'Сделки', 
    value: 3890, 
    fill: '#8B5CF6',
    conversion: 45.5,
    avgTime: 2.5,
    dropoffRate: 54.5
  },
  { 
    name: 'Предоплата', 
    value: 2145, 
    fill: '#F59E0B',
    conversion: 25.1,
    avgTime: 7.2,
    dropoffRate: 44.9
  },
  { 
    name: 'Бронирования', 
    value: 1678, 
    fill: '#EF4444',
    conversion: 19.6,
    avgTime: 12.8,
    dropoffRate: 21.8
  },
  { 
    name: 'Завершено', 
    value: 1456, 
    fill: '#22C55E',
    conversion: 17.0,
    avgTime: 18.5,
    dropoffRate: 13.2
  }
];

// CRM KPI Data
const crmKPIData = {
  averageDealValue: 485000,
  lifetimeValue: 875000,
  repeatBookingRate: 68.5,
  totalRevenue: 706360000,
  avgSalesTime: 18.5,
  winRate: 17.0
};

// UTM Sources Data (Pie Chart)
const utmSourcesData = [
  { name: 'Google Organic', value: 2850, fill: '#4285F4', percentage: 33.4 },
  { name: 'Direct', value: 2140, fill: '#34A853', percentage: 25.1 },
  { name: 'Google Ads', value: 1680, fill: '#FBBC05', percentage: 19.7 },
  { name: 'Social Media', value: 890, fill: '#EA4335', percentage: 10.4 },
  { name: 'Email Marketing', value: 640, fill: '#9AA0A6', percentage: 7.5 },
  { name: 'Referral', value: 340, fill: '#FF6D01', percentage: 4.0 }
];

// Deal Values by Channel Data (Pie Chart)
const dealValuesByChannelData = [
  { channel: 'Direct Sales', value: 285600000, percentage: 40.4, fill: '#22C55E' },
  { channel: 'Partner Network', value: 169360000, percentage: 24.0, fill: '#3B82F6' },
  { channel: 'Online Booking', value: 127272000, percentage: 18.0, fill: '#8B5CF6' },
  { channel: 'Corporate Sales', value: 91218000, percentage: 12.9, fill: '#F59E0B' },
  { channel: 'Referral Program', value: 32908000, percentage: 4.7, fill: '#EF4444' }
];

// Conversion Rates per Stage
const conversionRatesData = [
  { stage: 'Лиды → Сделки', rate: 45.5, change: +2.3, target: 48.0 },
  { stage: 'Сделки → Предоплата', rate: 55.1, change: -1.2, target: 58.0 },
  { stage: 'Предоплата → Бронирования', rate: 78.2, change: +3.8, target: 75.0 },
  { stage: 'Бронирования → Завершено', rate: 86.8, change: +1.5, target: 85.0 }
];

// Resource Type Performance
const resourceTypePerformance = [
  {
    type: 'Яхты',
    leads: 3420,
    deals: 1540,
    bookings: 1205,
    completed: 1087,
    revenue: 423680000,
    avgValue: 389750,
    conversionRate: 31.8
  },
  {
    type: 'Вертолёты',
    leads: 2890,
    deals: 1320,
    bookings: 985,
    completed: 856,
    revenue: 178240000,
    avgValue: 208178,
    conversionRate: 29.6
  },
  {
    type: 'Автомобили',
    leads: 1540,
    deals: 780,
    bookings: 615,
    completed: 578,
    revenue: 86420000,
    avgValue: 149516,
    conversionRate: 37.5
  },
  {
    type: 'Недвижимость',
    leads: 690,
    deals: 250,
    bookings: 178,
    completed: 135,
    revenue: 18020000,
    avgValue: 133481,
    conversionRate: 19.6
  }
];

// Monthly Performance Trend
const monthlyTrendData = [
  { month: 'Янв', leads: 720, deals: 340, bookings: 265, completed: 230, revenue: 52800000 },
  { month: 'Фев', leads: 685, deals: 320, bookings: 248, completed: 215, revenue: 49600000 },
  { month: 'Мар', leads: 890, deals: 425, bookings: 330, completed: 285, revenue: 68400000 },
  { month: 'Апр', leads: 945, deals: 480, bookings: 365, completed: 320, revenue: 74200000 },
  { month: 'Май', leads: 1020, deals: 520, bookings: 405, completed: 350, revenue: 81500000 },
  { month: 'Июн', leads: 1150, deals: 580, bookings: 450, completed: 390, revenue: 89700000 }
];

export function GTSCRMReportsEnhanced({ onBack }: GTSCRMReportsEnhancedProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [timeFilter, setTimeFilter] = useState("30d");
  const [channelFilter, setChannelFilter] = useState("all");
  const [resourceFilter, setResourceFilter] = useState("all");

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                CRM Reports Dashboard
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Детальная аналитика воронки продаж, конверсий и эффективности каналов
              </p>
            </div>
          </div>
          
          {/* Filters */}
          <div className="flex items-center gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-[120px] bg-[#17181A] border-[#232428] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#17181A] border-[#232428]">
                <SelectItem value="7d">7 дней</SelectItem>
                <SelectItem value="30d">30 дней</SelectItem>
                <SelectItem value="90d">90 дней</SelectItem>
                <SelectItem value="12m">12 месяцев</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={channelFilter} onValueChange={setChannelFilter}>
              <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#17181A] border-[#232428]">
                <SelectItem value="all">Все каналы</SelectItem>
                <SelectItem value="organic">Organic</SelectItem>
                <SelectItem value="ads">Реклама</SelectItem>
                <SelectItem value="social">Соцсети</SelectItem>
                <SelectItem value="direct">Direct</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={resourceFilter} onValueChange={setResourceFilter}>
              <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-[#17181A] border-[#232428]">
                <SelectItem value="all">Все ресурсы</SelectItem>
                <SelectItem value="yachts">Яхты</SelectItem>
                <SelectItem value="helicopters">Вертолёты</SelectItem>
                <SelectItem value="cars">Автомобили</SelectItem>
                <SelectItem value="properties">Недвижимость</SelectItem>
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
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Средняя сумма сделки</p>
                  <p className="text-lg font-heading text-white">{formatCurrency(crmKPIData.averageDealValue)}</p>
                  <p className="text-xs text-green-400">+8.5% к пред. месяцу</p>
                </div>
                <DollarSign className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">LTV</p>
                  <p className="text-lg font-heading text-white">{formatCurrency(crmKPIData.lifetimeValue)}</p>
                  <p className="text-xs text-blue-400">+12.3% к пред. месяцу</p>
                </div>
                <Trophy className="h-5 w-5 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Repeat Booking %</p>
                  <p className="text-lg font-heading text-white">{crmKPIData.repeatBookingRate}%</p>
                  <p className="text-xs text-purple-400">+2.8% к пред. месяцу</p>
                </div>
                <Activity className="h-5 w-5 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Win Rate</p>
                  <p className="text-lg font-heading text-white">{crmKPIData.winRate}%</p>
                  <p className="text-xs text-emerald-400">+1.2% к пред. месяцу</p>
                </div>
                <Target className="h-5 w-5 text-emerald-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Время продажи</p>
                  <p className="text-lg font-heading text-white">{crmKPIData.avgSalesTime} дн.</p>
                  <p className="text-xs text-orange-400">-2.1 дн. к пред. месяцу</p>
                </div>
                <Clock className="h-5 w-5 text-orange-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Общий доход</p>
                  <p className="text-lg font-heading text-white">{formatCurrency(crmKPIData.totalRevenue)}</p>
                  <p className="text-xs text-green-400">+15.7% к пред. месяцу</p>
                </div>
                <Award className="h-5 w-5 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Analytics */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Обзор
            </TabsTrigger>
            <TabsTrigger value="funnel" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Воронка CRM
            </TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Источники и каналы
            </TabsTrigger>
            <TabsTrigger value="performance" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Ресурсы
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Trend */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Динамика по месяцам</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Тренд основных метрик CRM
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <ComposedChart data={monthlyTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="month" stroke="#A6A7AA" />
                      <YAxis yAxisId="left" stroke="#A6A7AA" />
                      <YAxis yAxisId="right" orientation="right" stroke="#A6A7AA" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428',
                          borderRadius: '8px'
                        }}
                      />
                      <Legend />
                      <Bar yAxisId="left" dataKey="leads" fill="#3B82F6" name="Лиды" />
                      <Bar yAxisId="left" dataKey="deals" fill="#8B5CF6" name="Сделки" />
                      <Bar yAxisId="left" dataKey="completed" fill="#22C55E" name="Завершено" />
                      <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#F59E0B" strokeWidth={3} name="Доход" />
                    </ComposedChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Conversion Rates */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Конверсии по этапам</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Эффективность перехода между этапами
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {conversionRatesData.map((stage, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white text-sm">{stage.stage}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{stage.rate}%</span>
                          <span className={`text-xs flex items-center ${
                            stage.change > 0 ? 'text-green-400' : 'text-red-400'
                          }`}>
                            {stage.change > 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                            {Math.abs(stage.change)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={stage.rate} className="flex-1 h-2" />
                        <span className="text-xs text-[#A6A7AA]">
                          Цель: {stage.target}%
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* CRM Funnel Tab */}
          <TabsContent value="funnel" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Воронка CRM: Leads → Deals → Prepaid → Bookings → Completed</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      Полная воронка продаж с детализацией по этапам
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
                          data={crmFunnelData}
                          isAnimationActive
                        >
                          <LabelList position="center" fill="#fff" stroke="none" />
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>

                    {/* Detailed Funnel Metrics */}
                    <div className="mt-6 space-y-4">
                      {crmFunnelData.map((stage, index) => {
                        const nextStage = crmFunnelData[index + 1];
                        const stageConversion = nextStage ? 
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
                                {stageConversion && (
                                  <Badge className="bg-green-500/10 text-green-400">
                                    →{stageConversion}%
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs">
                              {stage.avgTime > 0 && (
                                <div>
                                  <span className="text-[#A6A7AA]">Ср. время:</span>
                                  <p className="text-white font-medium">{stage.avgTime} дн.</p>
                                </div>
                              )}
                              {stage.dropoffRate > 0 && (
                                <div>
                                  <span className="text-[#A6A7AA]">Отток:</span>
                                  <p className="text-red-400 font-medium">{stage.dropoffRate}%</p>
                                </div>
                              )}
                              <div>
                                <span className="text-[#A6A7AA]">Конверсия:</span>
                                <p className="text-white font-medium">{stage.conversion}%</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Funnel Summary */}
              <div className="space-y-4">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Сводка по воронке</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Общая конверсия:</span>
                        <span className="text-white font-medium">17.0%</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Время цикла:</span>
                        <span className="text-white font-medium">18.5 дней</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Всего лидов:</span>
                        <span className="text-white font-medium">{formatNumber(crmFunnelData[0].value)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#A6A7AA]">Завершено сделок:</span>
                        <span className="text-green-400 font-medium">{formatNumber(crmFunnelData[4].value)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-sm">Узкие места</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm font-medium">Лиды → Сделки</p>
                      <p className="text-xs text-[#A6A7AA]">54.5% отток на данном этапе</p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                      <p className="text-yellow-400 text-sm font-medium">Сделки → Предоплата</p>
                      <p className="text-xs text-[#A6A7AA]">44.9% отток требует внимания</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Sources & Channels Tab */}
          <TabsContent value="sources" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* UTM Sources */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Источники трафика (UTM)</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Распределение лидов по источникам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={utmSourcesData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {utmSourcesData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#17181A', 
                            border: '1px solid #232428',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-3">
                      {utmSourcesData.map((source, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: source.fill }}
                            />
                            <span className="text-white text-sm">{source.name}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{source.value}</p>
                            <p className="text-xs text-[#A6A7AA]">{source.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Deal Values by Channel */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Сумма сделок по каналам</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Распределение выручки по каналам продаж
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                        <Pie
                          data={dealValuesByChannelData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ channel, percentage }) => `${channel}: ${percentage}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {dealValuesByChannelData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip 
                          formatter={(value) => [formatCurrency(Number(value)), 'Выручка']}
                          contentStyle={{ 
                            backgroundColor: '#17181A', 
                            border: '1px solid #232428',
                            borderRadius: '8px'
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>

                    <div className="space-y-3">
                      {dealValuesByChannelData.map((channel, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded"
                              style={{ backgroundColor: channel.fill }}
                            />
                            <span className="text-white text-sm">{channel.channel}</span>
                          </div>
                          <div className="text-right">
                            <p className="text-white font-medium">{formatCurrency(channel.value)}</p>
                            <p className="text-xs text-[#A6A7AA]">{channel.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Resource Performance Tab */}
          <TabsContent value="performance" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Эффективность по типам ресурсов</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Сравнительный анализ конверсий и выручки по категориям
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {resourceTypePerformance.map((resource, index) => (
                    <Card key={index} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-white font-medium flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-500 rounded" />
                            {resource.type}
                          </h3>
                          <div className="text-right">
                            <p className="text-lg font-heading text-white">{resource.conversionRate}%</p>
                            <p className="text-xs text-[#A6A7AA]">конверсия</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Лиды</p>
                            <p className="text-white font-medium">{resource.leads}</p>
                          </div>
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Сделки</p>
                            <p className="text-blue-400 font-medium">{resource.deals}</p>
                          </div>
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Бронирования</p>
                            <p className="text-yellow-400 font-medium">{resource.bookings}</p>
                          </div>
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Завершено</p>
                            <p className="text-green-400 font-medium">{resource.completed}</p>
                          </div>
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Выручка</p>
                            <p className="text-white font-medium">{formatCurrency(resource.revenue)}</p>
                          </div>
                          <div>
                            <p className="text-[#A6A7AA] text-xs">Средний чек</p>
                            <p className="text-white font-medium">{formatCurrency(resource.avgValue)}</p>
                          </div>
                        </div>

                        <div className="mt-3 h-2 bg-[#232428] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-700"
                            style={{ width: `${resource.conversionRate}%` }}
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Performance Comparison Chart */}
                <div className="mt-6">
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-sm">Сравнение выручки по ресурсам</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={resourceTypePerformance}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                          <XAxis dataKey="type" stroke="#A6A7AA" />
                          <YAxis stroke="#A6A7AA" />
                          <Tooltip 
                            formatter={(value) => [formatCurrency(Number(value)), 'Выручка']}
                            contentStyle={{ 
                              backgroundColor: '#17181A', 
                              border: '1px solid #232428',
                              borderRadius: '8px'
                            }}
                          />
                          <Bar dataKey="revenue" fill="#22C55E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}