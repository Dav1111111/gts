import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  FunnelChart, Funnel, LabelList
} from "recharts";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  TrendingUp,
  TrendingDown,
  Eye,
  Users,
  Target,
  DollarSign,
  MousePointer,
  Calendar,
  Globe,
  Hash,
  Facebook,
  Instagram,
  Youtube,
  Play,
  Pause,
  Edit,
  Trash2,
  Copy,
  Share2,
  Download,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  Settings,
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Award,
  Percent,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  MoreHorizontal
} from "lucide-react";

interface GTSMarketingTrafficModuleProps {
  onBack: () => void;
}

// Mock data for traffic dashboard
const trafficData = [
  { month: 'Янв', organic: 45000, ads: 32000, social: 18000, partners: 12000, total: 107000 },
  { month: 'Фев', organic: 48000, ads: 35000, social: 22000, partners: 15000, total: 120000 },
  { month: 'Мар', organic: 52000, ads: 38000, social: 25000, partners: 18000, total: 133000 },
  { month: 'Апр', organic: 49000, ads: 42000, social: 28000, partners: 20000, total: 139000 },
  { month: 'Май', organic: 55000, ads: 45000, social: 30000, partners: 22000, total: 152000 },
  { month: 'Июн', organic: 58000, ads: 48000, social: 32000, partners: 25000, total: 163000 }
];

const channelDistribution = [
  { name: 'Organic Search', value: 35, color: '#22C55E' },
  { name: 'Google Ads', value: 28, color: '#3B82F6' },
  { name: 'Social Media', value: 20, color: '#8B5CF6' },
  { name: 'Partners', value: 17, color: '#F59E0B' }
];

const conversionFunnel = [
  { name: 'Визиты', value: 163000, fill: '#3B82F6' },
  { name: 'Лиды', value: 8150, fill: '#8B5CF6' },
  { name: 'Сделки', value: 1630, fill: '#F59E0B' },
  { name: 'Бронирования', value: 815, fill: '#22C55E' }
];

const hourlyHeatmapData = [
  { hour: '00', monday: 2, tuesday: 1, wednesday: 1, thursday: 2, friday: 3, saturday: 8, sunday: 6 },
  { hour: '01', monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 2, saturday: 5, sunday: 4 },
  { hour: '02', monday: 1, tuesday: 0, wednesday: 1, thursday: 1, friday: 1, saturday: 3, sunday: 2 },
  { hour: '03', monday: 0, tuesday: 0, wednesday: 0, thursday: 1, friday: 1, saturday: 2, sunday: 1 },
  { hour: '04', monday: 1, tuesday: 1, wednesday: 1, thursday: 1, friday: 1, saturday: 2, sunday: 2 },
  { hour: '05', monday: 2, tuesday: 2, wednesday: 2, thursday: 2, friday: 2, saturday: 3, sunday: 3 },
  { hour: '06', monday: 5, tuesday: 5, wednesday: 5, thursday: 5, friday: 4, saturday: 4, sunday: 4 },
  { hour: '07', monday: 8, tuesday: 8, wednesday: 8, thursday: 8, friday: 6, saturday: 5, sunday: 5 },
  { hour: '08', monday: 12, tuesday: 12, wednesday: 12, thursday: 12, friday: 8, saturday: 6, sunday: 6 },
  { hour: '09', monday: 15, tuesday: 15, wednesday: 15, thursday: 15, friday: 10, saturday: 8, sunday: 7 },
  { hour: '10', monday: 18, tuesday: 18, wednesday: 18, thursday: 18, friday: 12, saturday: 10, sunday: 9 },
  { hour: '11', monday: 20, tuesday: 20, wednesday: 20, thursday: 20, friday: 14, saturday: 12, sunday: 11 },
  { hour: '12', monday: 22, tuesday: 22, wednesday: 22, thursday: 22, friday: 16, saturday: 14, sunday: 13 },
  { hour: '13', monday: 24, tuesday: 24, wednesday: 24, thursday: 24, friday: 18, saturday: 16, sunday: 15 },
  { hour: '14', monday: 26, tuesday: 26, wednesday: 26, thursday: 26, friday: 20, saturday: 18, sunday: 17 },
  { hour: '15', monday: 24, tuesday: 24, wednesday: 24, thursday: 24, friday: 22, saturday: 20, sunday: 19 },
  { hour: '16', monday: 22, tuesday: 22, wednesday: 22, thursday: 22, friday: 24, saturday: 22, sunday: 21 },
  { hour: '17', monday: 20, tuesday: 20, wednesday: 20, thursday: 20, friday: 26, saturday: 24, sunday: 23 },
  { hour: '18', monday: 18, tuesday: 18, wednesday: 18, thursday: 18, friday: 24, saturday: 26, sunday: 25 },
  { hour: '19', monday: 16, tuesday: 16, wednesday: 16, thursday: 16, friday: 22, saturday: 28, sunday: 27 },
  { hour: '20', monday: 14, tuesday: 14, wednesday: 14, thursday: 14, friday: 20, saturday: 30, sunday: 29 },
  { hour: '21', monday: 12, tuesday: 12, wednesday: 12, thursday: 12, friday: 18, saturday: 25, sunday: 24 },
  { hour: '22', monday: 10, tuesday: 10, wednesday: 10, thursday: 10, friday: 15, saturday: 20, sunday: 19 },
  { hour: '23', monday: 6, tuesday: 6, wednesday: 6, thursday: 6, friday: 10, saturday: 15, sunday: 14 }
];

// Mock campaigns data
const mockCampaigns = [
  {
    id: "camp-001",
    name: "Летняя яхтенная кампания 2024",
    channel: "Google Ads",
    status: "active",
    budget: 500000,
    spent: 425000,
    impressions: 2500000,
    clicks: 125000,
    leads: 2500,
    bookings: 125,
    revenue: 6250000,
    cpl: 170,
    roi: 1268,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    creative: "yacht_summer_hero.jpg",
    abTests: [
      { variant: "A", name: "Эмоциональный заголовок", ctr: 5.2, conversion: 2.1 },
      { variant: "B", name: "Рациональный заголовок", ctr: 4.8, conversion: 1.9 }
    ]
  },
  {
    id: "camp-002", 
    name: "Социальные сети - Премиум сегмент",
    channel: "Social Media",
    status: "active",
    budget: 300000,
    spent: 280000,
    impressions: 1800000,
    clicks: 72000,
    leads: 1440,
    bookings: 86,
    revenue: 4300000,
    cpl: 194,
    roi: 1436,
    startDate: "2024-05-15",
    endDate: "2024-12-31",
    creative: "social_premium.mp4",
    abTests: [
      { variant: "A", name: "Видео креатив", ctr: 4.2, conversion: 2.3 },
      { variant: "B", name: "Карусель изображений", ctr: 3.8, conversion: 1.8 }
    ]
  },
  {
    id: "camp-003",
    name: "Партнерская программа - Отели",
    channel: "Partners",
    status: "paused",
    budget: 200000,
    spent: 145000,
    impressions: 850000,
    clicks: 34000,
    leads: 680,
    bookings: 41,
    revenue: 2050000,
    cpl: 213,
    roi: 1314,
    startDate: "2024-04-01",
    endDate: "2024-11-30",
    creative: "partner_hotels.jpg",
    abTests: [
      { variant: "A", name: "Комиссия 8%", ctr: 4.1, conversion: 2.0 },
      { variant: "B", name: "Комиссия 10%", ctr: 3.9, conversion: 2.2 }
    ]
  },
  {
    id: "camp-004",
    name: "SEO оптимизация - Органика",
    channel: "Organic",
    status: "active",
    budget: 150000,
    spent: 125000,
    impressions: 3200000,
    clicks: 160000,
    leads: 3200,
    bookings: 192,
    revenue: 9600000,
    cpl: 39,
    roi: 7580,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    creative: "seo_content.jpg",
    abTests: []
  }
];

// Mock UTM data
const utmLeadsData = [
  {
    id: "lead-001",
    name: "Анна Волкова",
    email: "a.volkova@example.com",
    phone: "+7 905 123-45-67",
    source: "google",
    medium: "cpc",
    campaign: "summer_yacht_2024",
    content: "hero_banner",
    term: "аренда яхты сочи",
    channel: "Google Ads",
    value: 50000,
    status: "qualified",
    createdAt: "2024-12-01"
  },
  {
    id: "lead-002",
    name: "Михаил Петров",
    email: "m.petrov@example.com", 
    phone: "+7 903 987-65-43",
    source: "facebook",
    medium: "social",
    campaign: "premium_social_q4",
    content: "video_creative_a",
    term: "",
    channel: "Social Media",
    value: 75000,
    status: "converted",
    createdAt: "2024-11-28"
  },
  {
    id: "lead-003",
    name: "Елена Сидорова",
    email: "e.sidorova@example.com",
    phone: "+7 902 555-44-33",
    source: "partner_hotels",
    medium: "referral",
    campaign: "hotel_partnership",
    content: "booking_page",
    term: "",
    channel: "Partners",
    value: 35000,
    status: "new",
    createdAt: "2024-11-25"
  }
];

export function GTSMarketingTrafficModule({ onBack }: GTSMarketingTrafficModuleProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [channelFilter, setChannelFilter] = useState("all");
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);

  const getChannelColor = (channel: string) => {
    const colors = {
      "Google Ads": "#3B82F6",
      "Social Media": "#8B5CF6", 
      "Partners": "#F59E0B",
      "Organic": "#22C55E"
    };
    return colors[channel as keyof typeof colors] || "#6B7280";
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "text-green-400 bg-green-500/10",
      paused: "text-yellow-400 bg-yellow-500/10",
      completed: "text-blue-400 bg-blue-500/10",
      draft: "text-gray-400 bg-gray-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesChannel = channelFilter === "all" || campaign.channel === channelFilter;
    return matchesSearch && matchesChannel;
  });

  const selectedCampaignData = selectedCampaign ? mockCampaigns.find(c => c.id === selectedCampaign) : null;

  const getHeatmapColor = (value: number) => {
    const intensity = Math.min(value / 30, 1);
    const red = Math.floor(145 + intensity * 110);
    const green = Math.floor(4 + intensity * 0);
    const blue = Math.floor(12 + intensity * 0);
    return `rgb(${red}, ${green}, ${blue})`;
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                Marketing & Traffic
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Аналитика трафика, управление кампаниями и ROI
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
              <Download className="h-4 w-4 mr-2" />
              Экспорт
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Новая кампания
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428]">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Дашборд трафика
            </TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Target className="h-4 w-4 mr-2" />
              Кампании
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              UTM → Лиды
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Activity className="h-4 w-4 mr-2" />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Traffic Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#A6A7AA]">Визиты</p>
                      <p className="text-2xl font-heading text-white">163K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">+12.5%</span>
                      </div>
                    </div>
                    <Eye className="h-8 w-8 text-blue-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#A6A7AA]">Лиды</p>
                      <p className="text-2xl font-heading text-white">8.15K</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">+8.3%</span>
                      </div>
                    </div>
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#A6A7AA]">Конверсия</p>
                      <p className="text-2xl font-heading text-white">5.0%</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingDown className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-red-400">-0.3%</span>
                      </div>
                    </div>
                    <Target className="h-8 w-8 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-[#121214] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-[#A6A7AA]">CPL</p>
                      <p className="text-2xl font-heading text-white">₽154</p>
                      <div className="flex items-center gap-1 mt-1">
                        <TrendingDown className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">-5.2%</span>
                      </div>
                    </div>
                    <DollarSign className="h-8 w-8 text-yellow-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Traffic by Channel */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Трафик по каналам</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Динамика посещений за последние 6 месяцев
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={trafficData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                      <XAxis dataKey="month" stroke="#A6A7AA" />
                      <YAxis stroke="#A6A7AA" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                      />
                      <Legend />
                      <Area type="monotone" dataKey="organic" stackId="1" stroke="#22C55E" fill="#22C55E" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="ads" stackId="1" stroke="#3B82F6" fill="#3B82F6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="social" stackId="1" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.6} />
                      <Area type="monotone" dataKey="partners" stackId="1" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.6} />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Channel Distribution */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Распределение по каналам</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Доля каждого канала в общем трафике
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={channelDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {channelDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                        <LabelList dataKey="value" position="outside" fill="#FFFFFF" formatter={(value: number) => `${value}%`} />
                      </Pie>
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#17181A', 
                          border: '1px solid #232428',
                          borderRadius: '8px',
                          color: '#FFFFFF'
                        }}
                        formatter={(value: number) => [`${value}%`, 'Доля']}
                      />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Traffic Sources Details */}
            <Card className="bg-[#121214] border-[#232428] mt-6">
              <CardHeader>
                <CardTitle className="text-white">Детализация по источникам</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { name: "Organic Search", visits: "58K", leads: "2.9K", conversion: "5.0%", cpl: "₽39", color: "#22C55E" },
                    { name: "Google Ads", visits: "48K", leads: "2.4K", conversion: "5.0%", cpl: "₽177", color: "#3B82F6" },
                    { name: "Social Media", visits: "32K", leads: "1.3K", conversion: "4.1%", cpl: "₽215", color: "#8B5CF6" },
                    { name: "Partners", visits: "25K", leads: "1.3K", conversion: "5.2%", cpl: "₽111", color: "#F59E0B" }
                  ].map((source, index) => (
                    <Card key={index} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: source.color }}
                          />
                          <h4 className="font-medium text-white text-sm">{source.name}</h4>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-[#A6A7AA]">Визиты:</span>
                            <span className="text-white">{source.visits}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#A6A7AA]">Лиды:</span>
                            <span className="text-white">{source.leads}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#A6A7AA]">Конверсия:</span>
                            <span className="text-white">{source.conversion}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-[#A6A7AA]">CPL:</span>
                            <span className="text-white">{source.cpl}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Campaigns Tab */}
          <TabsContent value="campaigns" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-white">Кампании</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                          <Input 
                            placeholder="Поиск кампаний..." 
                            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={channelFilter} onValueChange={setChannelFilter}>
                          <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                            <SelectValue placeholder="Канал" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#17181A] border-[#232428]">
                            <SelectItem value="all">Все каналы</SelectItem>
                            <SelectItem value="Google Ads">Google Ads</SelectItem>
                            <SelectItem value="Social Media">Social Media</SelectItem>
                            <SelectItem value="Partners">Partners</SelectItem>
                            <SelectItem value="Organic">Organic</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredCampaigns.map(campaign => (
                        <Card 
                          key={campaign.id}
                          className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                          onClick={() => setSelectedCampaign(campaign.id)}
                        >
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h4 className="font-heading text-white">{campaign.name}</h4>
                                  <Badge className={getStatusColor(campaign.status)}>
                                    {campaign.status === "active" ? "Активна" : 
                                     campaign.status === "paused" ? "Приостановлена" : 
                                     campaign.status === "completed" ? "Завершена" : "Черновик"}
                                  </Badge>
                                </div>
                                
                                <div className="flex items-center gap-4 text-sm text-[#A6A7AA]">
                                  <span className="flex items-center gap-1">
                                    <div 
                                      className="w-2 h-2 rounded-full"
                                      style={{ backgroundColor: getChannelColor(campaign.channel) }}
                                    />
                                    {campaign.channel}
                                  </span>
                                  <span>Бюджет: {formatCurrency(campaign.budget)}</span>
                                  <span>ROI: {campaign.roi}%</span>
                                </div>
                                
                                <div className="mt-2">
                                  <div className="flex justify-between text-xs text-[#A6A7AA] mb-1">
                                    <span>Потрачено: {formatCurrency(campaign.spent)}</span>
                                    <span>{Math.round((campaign.spent / campaign.budget) * 100)}%</span>
                                  </div>
                                  <Progress 
                                    value={(campaign.spent / campaign.budget) * 100} 
                                    className="h-1"
                                    style={{ backgroundColor: '#232428' }}
                                  />
                                </div>
                              </div>
                              
                              <div className="text-right ml-4">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#A6A7AA]">Лиды:</span>
                                    <span className="text-sm text-white">{campaign.leads.toLocaleString()}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#A6A7AA]">CPL:</span>
                                    <span className="text-sm text-white">₽{campaign.cpl}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <span className="text-xs text-[#A6A7AA]">Доход:</span>
                                    <span className="text-sm text-green-400">{formatCurrency(campaign.revenue)}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Detail Panel */}
              {selectedCampaignData && (
                <div className="lg:w-80">
                  <Card className="bg-[#121214] border-[#232428]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Детали кампании</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedCampaign(null)}
                          className="text-[#A6A7AA] hover:text-white"
                        >
                          ×
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Campaign Info */}
                      <div>
                        <h3 className="font-heading text-white mb-2">{selectedCampaignData.name}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getStatusColor(selectedCampaignData.status)}>
                            {selectedCampaignData.status === "active" ? "Активна" : 
                             selectedCampaignData.status === "paused" ? "Приостановлена" : "Завершена"}
                          </Badge>
                          <Badge 
                            style={{ 
                              backgroundColor: getChannelColor(selectedCampaignData.channel) + '20',
                              color: getChannelColor(selectedCampaignData.channel)
                            }}
                          >
                            {selectedCampaignData.channel}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#A6A7AA] space-y-1">
                          <p>Период: {selectedCampaignData.startDate} - {selectedCampaignData.endDate}</p>
                          <p>Креатив: {selectedCampaignData.creative}</p>
                        </div>
                      </div>

                      <Separator className="bg-[#232428]" />

                      {/* Key Metrics */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Ключевые метрики</h4>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="text-center p-3 bg-[#17181A] rounded-lg">
                            <p className="text-lg font-heading text-white">{formatNumber(selectedCampaignData.impressions)}</p>
                            <p className="text-xs text-[#A6A7AA]">Показы</p>
                          </div>
                          <div className="text-center p-3 bg-[#17181A] rounded-lg">
                            <p className="text-lg font-heading text-white">{formatNumber(selectedCampaignData.clicks)}</p>
                            <p className="text-xs text-[#A6A7AA]">Клики</p>
                          </div>
                          <div className="text-center p-3 bg-[#17181A] rounded-lg">
                            <p className="text-lg font-heading text-white">{selectedCampaignData.leads.toLocaleString()}</p>
                            <p className="text-xs text-[#A6A7AA]">Лиды</p>
                          </div>
                          <div className="text-center p-3 bg-[#17181A] rounded-lg">
                            <p className="text-lg font-heading text-white">{selectedCampaignData.bookings}</p>
                            <p className="text-xs text-[#A6A7AA]">Бронирования</p>
                          </div>
                        </div>
                      </div>

                      {/* A/B Tests */}
                      {selectedCampaignData.abTests.length > 0 && (
                        <>
                          <Separator className="bg-[#232428]" />
                          
                          <div className="space-y-3">
                            <h4 className="font-medium text-white">A/B тесты</h4>
                            <div className="space-y-2">
                              {selectedCampaignData.abTests.map((test, index) => (
                                <div key={index} className="p-3 bg-[#17181A] rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-white">Вариант {test.variant}</span>
                                    <Badge variant="outline" className="border-[#232428] text-[#A6A7AA]">
                                      CTR: {test.ctr}%
                                    </Badge>
                                  </div>
                                  <p className="text-xs text-[#A6A7AA] mb-2">{test.name}</p>
                                  <div className="flex justify-between text-xs">
                                    <span className="text-[#A6A7AA]">Конверсия:</span>
                                    <span className="text-white">{test.conversion}%</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator className="bg-[#232428]" />

                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Действия</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Edit className="h-4 w-4 mr-1" />
                            Изменить
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Copy className="h-4 w-4 mr-1" />
                            Дублировать
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Pause className="h-4 w-4 mr-1" />
                            Пауза
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Отчет
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* UTM → Leads Tab */}
          <TabsContent value="leads" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">UTM → CRM Интеграция</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Отслеживание источников лидов и их атрибуция
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {utmLeadsData.map(lead => (
                    <Card key={lead.id} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-heading text-white">{lead.name}</h4>
                              <Badge className={getStatusColor(lead.status)}>
                                {lead.status === "new" ? "Новый" :
                                 lead.status === "qualified" ? "Квалифицирован" : "Конвертирован"}
                              </Badge>
                              <Badge 
                                style={{ 
                                  backgroundColor: getChannelColor(lead.channel) + '20',
                                  color: getChannelColor(lead.channel)
                                }}
                              >
                                {lead.channel}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div>
                                <span className="text-[#A6A7AA]">Источник:</span>
                                <p className="text-white">{lead.source}</p>
                              </div>
                              <div>
                                <span className="text-[#A6A7AA]">Кампания:</span>
                                <p className="text-white">{lead.campaign}</p>
                              </div>
                              <div>
                                <span className="text-[#A6A7AA]">Контент:</span>
                                <p className="text-white">{lead.content}</p>
                              </div>
                              <div>
                                <span className="text-[#A6A7AA]">Ключевые слова:</span>
                                <p className="text-white">{lead.term || "—"}</p>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mt-2 text-sm text-[#A6A7AA]">
                              <span className="flex items-center gap-1">
                                <Mail className="h-3 w-3" />
                                {lead.email}
                              </span>
                              <span className="flex items-center gap-1">
                                <Phone className="h-3 w-3" />
                                {lead.phone}
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {lead.createdAt}
                              </span>
                            </div>
                          </div>
                          
                          <div className="text-right ml-4">
                            <p className="text-lg font-heading text-green-400">{formatCurrency(lead.value)}</p>
                            <p className="text-xs text-[#A6A7AA]">Потенциальная стоимость</p>
                            <Button size="sm" className="mt-2 bg-[#91040C] hover:bg-[#91040C]/90">
                              <ExternalLink className="h-3 w-3 mr-1" />
                              В CRM
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="space-y-6">
              {/* Conversion Funnel */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Воронка конверсий</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      От визитов до бронирований
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
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
                          data={conversionFunnel}
                          isAnimationActive
                        >
                          <LabelList position="center" fill="#fff" stroke="none" />
                        </Funnel>
                      </FunnelChart>
                    </ResponsiveContainer>
                    
                    <div className="mt-4 space-y-2">
                      {conversionFunnel.map((item, index) => {
                        const nextItem = conversionFunnel[index + 1];
                        const conversionRate = nextItem ? ((nextItem.value / item.value) * 100).toFixed(1) : null;
                        
                        return (
                          <div key={item.name} className="flex items-center justify-between p-2 bg-[#17181A] rounded">
                            <div className="flex items-center gap-2">
                              <div 
                                className="w-3 h-3 rounded"
                                style={{ backgroundColor: item.fill }}
                              />
                              <span className="text-white">{item.name}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-white">{formatNumber(item.value)}</span>
                              {conversionRate && (
                                <span className="text-xs text-[#A6A7AA]">→ {conversionRate}%</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                {/* ROI by Channel */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">ROI по каналам</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      Эффективность инвестиций в маркетинг
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart 
                        data={[
                          { channel: 'Organic', roi: 7580, color: '#22C55E' },
                          { channel: 'Partners', roi: 1436, color: '#F59E0B' },
                          { channel: 'Social', roi: 1314, color: '#8B5CF6' },
                          { channel: 'Ads', roi: 1268, color: '#3B82F6' }
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
                        <XAxis dataKey="channel" stroke="#A6A7AA" />
                        <YAxis stroke="#A6A7AA" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#17181A', 
                            border: '1px solid #232428',
                            borderRadius: '8px',
                            color: '#FFFFFF'
                          }}
                          formatter={(value: number) => [`${value}%`, 'ROI']}
                        />
                        <Bar dataKey="roi" fill="#3B82F6">
                          {[
                            { channel: 'Organic', roi: 7580, color: '#22C55E' },
                            { channel: 'Partners', roi: 1436, color: '#F59E0B' },
                            { channel: 'Social', roi: 1314, color: '#8B5CF6' },
                            { channel: 'Ads', roi: 1268, color: '#3B82F6' }
                          ].map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              {/* Time-based Heatmap */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Тепловая карта активности</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Интенсивность трафика по дням недели и часам
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="grid grid-cols-8 gap-1 min-w-[600px]">
                      {/* Header */}
                      <div className="text-xs text-[#A6A7AA] p-2"></div>
                      {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                        <div key={day} className="text-xs text-[#A6A7AA] p-2 text-center">{day}</div>
                      ))}
                      
                      {/* Heatmap grid */}
                      {hourlyHeatmapData.map(hourData => (
                        <>
                          <div key={`hour-${hourData.hour}`} className="text-xs text-[#A6A7AA] p-2 text-right">
                            {hourData.hour}:00
                          </div>
                          {['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].map(day => {
                            const value = hourData[day as keyof typeof hourData] as number;
                            return (
                              <div
                                key={`${hourData.hour}-${day}`}
                                className="p-1 rounded text-xs text-center text-white cursor-pointer hover:opacity-80 transition-opacity"
                                style={{
                                  backgroundColor: getHeatmapColor(value),
                                  minHeight: '20px',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center'
                                }}
                                title={`${day} ${hourData.hour}:00 - ${value} визитов`}
                              >
                                {value}
                              </div>
                            );
                          })}
                        </>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 text-sm">
                    <span className="text-[#A6A7AA]">Меньше</span>
                    <div className="flex items-center gap-1">
                      {[0, 0.2, 0.4, 0.6, 0.8, 1].map(intensity => (
                        <div
                          key={intensity}
                          className="w-3 h-3 rounded"
                          style={{ backgroundColor: getHeatmapColor(intensity * 30) }}
                        />
                      ))}
                    </div>
                    <span className="text-[#A6A7AA]">Больше</span>
                  </div>
                </CardContent>
              </Card>

              {/* Performance Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white">Лучший канал</h3>
                      <Award className="h-5 w-5 text-yellow-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-heading text-white">Organic Search</p>
                      <p className="text-sm text-[#A6A7AA]">ROI: 7,580% • CPL: ₽39</p>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-green-400" />
                        <span className="text-xs text-green-400">+15% к прошлому месяцу</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white">Пиковое время</h3>
                      <Clock className="h-5 w-5 text-blue-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-heading text-white">20:00 - 21:00</p>
                      <p className="text-sm text-[#A6A7AA]">Суббота и воскресенье</p>
                      <div className="flex items-center gap-1">
                        <Activity className="h-3 w-3 text-blue-400" />
                        <span className="text-xs text-blue-400">Средняя активность: 28 визитов/час</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-medium text-white">Конверсия</h3>
                      <Target className="h-5 w-5 text-purple-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-2xl font-heading text-white">5.0%</p>
                      <p className="text-sm text-[#A6A7AA]">8,150 лидов из 163K визитов</p>
                      <div className="flex items-center gap-1">
                        <TrendingDown className="h-3 w-3 text-red-400" />
                        <span className="text-xs text-red-400">-0.3% к прошлому месяцу</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Campaign Creation Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Создать новую кампанию</DialogTitle>
            <DialogDescription className="text-[#A6A7AA]">
              Настройте параметры маркетинговой кампании
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Название кампании</Label>
              <Input 
                placeholder="Введите название..."
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Канал</Label>
              <Select>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите канал" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="google-ads">Google Ads</SelectItem>
                  <SelectItem value="social-media">Social Media</SelectItem>
                  <SelectItem value="partners">Partners</SelectItem>
                  <SelectItem value="organic">Organic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Бюджет</Label>
              <Input 
                type="number"
                placeholder="0"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Период</Label>
              <Select>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите период" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="week">1 неделя</SelectItem>
                  <SelectItem value="month">1 месяц</SelectItem>
                  <SelectItem value="quarter">3 месяца</SelectItem>
                  <SelectItem value="custom">Настроить</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Описание</Label>
            <Textarea 
              placeholder="Описание кампании..."
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => setShowCampaignDialog(false)}
              className="border-[#232428] text-white hover:bg-[#17181A]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              Создать кампанию
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}