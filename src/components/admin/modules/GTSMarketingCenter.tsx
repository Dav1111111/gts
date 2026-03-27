import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Progress } from "../../ui/progress";
import { Switch } from "../../ui/switch";
import { Alert, AlertDescription } from "../../ui/alert";
import { Separator } from "../../ui/separator";
import { 
  Plus, Search, Filter, Settings, Download, Upload, Edit, Trash, Eye,
  TrendingUp, TrendingDown, Target, Users, MousePointer, DollarSign,
  BarChart3, PieChart, Activity, AlertTriangle, CheckCircle, Clock,
  ExternalLink, Share2, Calendar, FileText, Video, Image, MessageSquare,
  Instagram, Youtube, Send, Globe, Zap, ArrowRight, ArrowUp, ArrowDown,
  PlayCircle, Pause, RotateCcw, RefreshCw, Bell, AlertCircle, Info,
  Lightbulb, Brain, Sparkles, ThumbsUp, ThumbsDown, Eye as EyeIcon,
  Heart, MessageCircle, Share, Bookmark, Star, Award, Flame, Trophy,
  MapPin, Phone, Mail, Calendar as CalendarIcon, Coins, CreditCard,
  ChevronRight, MoreHorizontal, Maximize, Minimize, X, Copy, LinkIcon
} from "lucide-react";

// Types
interface TrafficSource {
  id: string;
  name: string;
  type: 'social' | 'marketplace' | 'ads' | 'direct' | 'content' | 'messenger';
  icon: string;
  metrics: SourceMetrics;
  budget: SourceBudget;
  campaigns: Campaign[];
  integration: Integration;
  lastUpdate: string;
}

interface SourceMetrics {
  impressions?: number;
  reach?: number;
  views?: number;
  clicks: number;
  leads: number;
  bookings: number;
  revenue: number;
  ctr: number;
  conversionRate: number;
  cpl: number; // Cost per lead
  roas: number; // Return on ad spend
  engagement?: number;
  followers?: number;
  subscribers?: number;
  openRate?: number;
  reads?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  sessions?: number;
  pageViews?: number;
  bounceRate?: number;
  avgSessionDuration?: number;
}

interface SourceBudget {
  planned: number;
  spent: number;
  remaining: number;
  dailyLimit?: number;
  monthlyLimit: number;
  alerts: BudgetAlert[];
}

interface BudgetAlert {
  type: 'budget_exhausted' | 'low_roi' | 'high_cpl' | 'performance_drop';
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
}

interface Campaign {
  id: string;
  name: string;
  status: 'active' | 'paused' | 'completed' | 'draft';
  startDate: string;
  endDate: string;
  budget: number;
  spent: number;
  metrics: SourceMetrics;
  targetAudience: Audience;
  creative: Creative;
}

interface Audience {
  geo: string[];
  interests: string[];
  demographics: {
    ageMin: number;
    ageMax: number;
    gender: 'all' | 'male' | 'female';
  };
  clubMembers: boolean;
  lookalike: boolean;
}

interface Creative {
  type: 'image' | 'video' | 'carousel' | 'text';
  title: string;
  description: string;
  mediaUrl?: string;
  cta: string;
}

interface Integration {
  status: 'connected' | 'disconnected' | 'error' | 'manual';
  apiConnected: boolean;
  lastSync: string;
  autoSync: boolean;
  credentials: boolean;
}

interface ConversionFunnel {
  stage: string;
  visitors: number;
  conversionRate: number;
  previousRate?: number;
}

interface ABTest {
  id: string;
  name: string;
  status: 'running' | 'completed' | 'paused' | 'draft';
  startDate: string;
  endDate?: string;
  variants: TestVariant[];
  winner?: string;
  confidence: number;
  traffic: number; // percentage
  metrics: string[];
}

interface TestVariant {
  id: string;
  name: string;
  traffic: number;
  metrics: {
    visitors: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
    timeOnPage: number;
    bounceRate: number;
  };
}

interface WebsiteAnalytics {
  totalVisitors: number;
  uniqueVisitors: number;
  pageViews: number;
  avgTimeOnSite: number;
  bounceRate: number;
  conversionRate: number;
  topPages: PageAnalytics[];
  trafficSources: TrafficAnalytics[];
}

interface PageAnalytics {
  url: string;
  pageViews: number;
  uniqueViews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  conversionRate: number;
}

interface TrafficAnalytics {
  source: string;
  visitors: number;
  percentage: number;
  avgTimeOnSite: number;
  bounceRate: number;
  conversionRate: number;
}

interface User {
  role: string;
  permissions: string[];
}

interface GTSMarketingCenterProps {
  user: User;
}

type PeriodFilter = '7d' | '30d' | '90d' | '1y';
type ChannelFilter = 'all' | 'social' | 'marketplace' | 'ads' | 'direct' | 'content';

export function GTSMarketingCenter({ user }: GTSMarketingCenterProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [periodFilter, setPeriodFilter] = useState<PeriodFilter>('30d');
  const [channelFilter, setChannelFilter] = useState<ChannelFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSource, setSelectedSource] = useState<TrafficSource | null>(null);
  const [showCampaignDialog, setShowCampaignDialog] = useState(false);
  const [showBudgetDialog, setShowBudgetDialog] = useState(false);
  const [showABTestDialog, setShowABTestDialog] = useState(false);

  // Mock data
  const mockTrafficSources: TrafficSource[] = [
    {
      id: 'avito',
      name: 'Avito',
      type: 'marketplace',
      icon: '🏪',
      metrics: {
        impressions: 45600,
        views: 8900,
        clicks: 890,
        leads: 67,
        bookings: 23,
        revenue: 1450000,
        ctr: 10.0,
        conversionRate: 7.5,
        cpl: 3500,
        roas: 4.2
      },
      budget: {
        planned: 350000,
        spent: 234500,
        remaining: 115500,
        monthlyLimit: 350000,
        alerts: [
          {
            type: 'low_roi',
            message: 'ROI снизился на 15% за последнюю неделю',
            severity: 'medium',
            timestamp: '2024-01-20T10:30:00'
          }
        ]
      },
      campaigns: [
        {
          id: 'avito-1',
          name: 'Вертолётные экскурсии - Премиум',
          status: 'active',
          startDate: '2024-01-01',
          endDate: '2024-01-31',
          budget: 150000,
          spent: 89500,
          metrics: {
            clicks: 450,
            leads: 34,
            bookings: 12,
            revenue: 720000,
            ctr: 8.5,
            conversionRate: 7.6,
            cpl: 2600,
            roas: 4.8
          },
          targetAudience: {
            geo: ['Сочи', 'Адлер', 'Красная Поляна'],
            interests: ['Экстрим', 'Туризм', 'Роскошь'],
            demographics: { ageMin: 25, ageMax: 55, gender: 'all' },
            clubMembers: false,
            lookalike: true
          },
          creative: {
            type: 'image',
            title: 'Вертолётная экскурсия над Сочи',
            description: 'Незабываемые виды на Красную Поляну и Черное море',
            cta: 'Забронировать'
          }
        }
      ],
      integration: {
        status: 'manual',
        apiConnected: false,
        lastSync: '2024-01-20T09:00:00',
        autoSync: false,
        credentials: false
      },
      lastUpdate: '2024-01-20T11:30:00'
    },
    {
      id: 'instagram',
      name: 'Instagram',
      type: 'social',
      icon: '📸',
      metrics: {
        reach: 125000,
        impressions: 198000,
        clicks: 3200,
        leads: 89,
        bookings: 31,
        revenue: 1950000,
        ctr: 1.6,
        conversionRate: 2.8,
        cpl: 2800,
        roas: 5.8,
        engagement: 8900,
        followers: 45600,
        likes: 12400,
        comments: 890,
        shares: 234
      },
      budget: {
        planned: 280000,
        spent: 189600,
        remaining: 90400,
        dailyLimit: 12000,
        monthlyLimit: 280000,
        alerts: []
      },
      campaigns: [
        {
          id: 'ig-1',
          name: 'Stories - Морские прогулки',
          status: 'active',
          startDate: '2024-01-15',
          endDate: '2024-02-15',
          budget: 120000,
          spent: 67800,
          metrics: {
            reach: 67000,
            clicks: 1800,
            leads: 45,
            bookings: 16,
            revenue: 980000,
            ctr: 2.7,
            conversionRate: 2.5,
            cpl: 1500,
            roas: 8.2
          },
          targetAudience: {
            geo: ['Сочи', 'Краснодар', 'Ростов-на-Дону'],
            interests: ['Яхтинг', 'Море', 'Отдых'],
            demographics: { ageMin: 23, ageMax: 45, gender: 'all' },
            clubMembers: false,
            lookalike: true
          },
          creative: {
            type: 'video',
            title: 'Морская прогулка на яхте',
            description: 'Роскошный отдых на воде в Сочи',
            cta: 'Узнать больше'
          }
        }
      ],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T11:00:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T11:00:00'
    },
    {
      id: 'vk',
      name: 'VKontakte',
      type: 'social',
      icon: '🔵',
      metrics: {
        reach: 89000,
        impressions: 145000,
        clicks: 2100,
        leads: 56,
        bookings: 19,
        revenue: 1180000,
        ctr: 1.4,
        conversionRate: 2.7,
        cpl: 3200,
        roas: 4.9,
        engagement: 5600,
        followers: 23400,
        likes: 8900,
        comments: 567,
        shares: 189
      },
      budget: {
        planned: 180000,
        spent: 124500,
        remaining: 55500,
        monthlyLimit: 180000,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T10:45:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T10:45:00'
    },
    {
      id: 'youtube',
      name: 'YouTube',
      type: 'social',
      icon: '📺',
      metrics: {
        views: 234000,
        clicks: 4500,
        leads: 78,
        bookings: 29,
        revenue: 1830000,
        ctr: 1.9,
        conversionRate: 1.7,
        cpl: 2900,
        roas: 6.1,
        subscribers: 12800,
        likes: 18700,
        comments: 1240,
        shares: 567
      },
      budget: {
        planned: 320000,
        spent: 298500,
        remaining: 21500,
        monthlyLimit: 320000,
        alerts: [
          {
            type: 'budget_exhausted',
            message: 'Бюджет почти исчерпан (93% использовано)',
            severity: 'high',
            timestamp: '2024-01-20T08:00:00'
          }
        ]
      },
      campaigns: [],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T11:15:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T11:15:00'
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      type: 'social',
      icon: '🎵',
      metrics: {
        views: 456000,
        clicks: 6780,
        leads: 123,
        bookings: 41,
        revenue: 2450000,
        ctr: 1.5,
        conversionRate: 1.8,
        cpl: 1800,
        roas: 8.9,
        followers: 34500,
        likes: 45600,
        comments: 2340,
        shares: 1890
      },
      budget: {
        planned: 220000,
        spent: 156800,
        remaining: 63200,
        monthlyLimit: 220000,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'manual',
        apiConnected: false,
        lastSync: '2024-01-20T09:30:00',
        autoSync: false,
        credentials: false
      },
      lastUpdate: '2024-01-20T09:30:00'
    },
    {
      id: 'yandex-direct',
      name: 'Яндекс.Директ',
      type: 'ads',
      icon: '🟡',
      metrics: {
        impressions: 123000,
        clicks: 2890,
        leads: 87,
        bookings: 34,
        revenue: 2100000,
        ctr: 2.3,
        conversionRate: 3.0,
        cpl: 2600,
        roas: 5.2
      },
      budget: {
        planned: 450000,
        spent: 367800,
        remaining: 82200,
        dailyLimit: 15000,
        monthlyLimit: 450000,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T11:30:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T11:30:00'
    },
    {
      id: 'google-ads',
      name: 'Google Ads',
      type: 'ads',
      icon: '🔍',
      metrics: {
        impressions: 198000,
        clicks: 4560,
        leads: 134,
        bookings: 52,
        revenue: 3200000,
        ctr: 2.3,
        conversionRate: 2.9,
        cpl: 2100,
        roas: 6.8
      },
      budget: {
        planned: 520000,
        spent: 423600,
        remaining: 96400,
        dailyLimit: 18000,
        monthlyLimit: 520000,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T11:25:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T11:25:00'
    },
    {
      id: 'telegram',
      name: 'Telegram',
      type: 'messenger',
      icon: '✈️',
      metrics: {
        subscribers: 8900,
        reach: 7234,
        clicks: 456,
        leads: 23,
        bookings: 8,
        revenue: 480000,
        openRate: 81.3,
        ctr: 6.3,
        conversionRate: 5.0,
        cpl: 4800,
        roas: 3.2
      },
      budget: {
        planned: 80000,
        spent: 67200,
        remaining: 12800,
        monthlyLimit: 80000,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'manual',
        apiConnected: false,
        lastSync: '2024-01-20T10:00:00',
        autoSync: false,
        credentials: false
      },
      lastUpdate: '2024-01-20T10:00:00'
    },
    {
      id: 'direct',
      name: 'Прямые переходы',
      type: 'direct',
      icon: '🔗',
      metrics: {
        sessions: 12400,
        pageViews: 34500,
        clicks: 890,
        leads: 45,
        bookings: 18,
        revenue: 1120000,
        bounceRate: 23.4,
        avgSessionDuration: 185,
        conversionRate: 5.1,
        ctr: 7.2,
        cpl: 0,
        roas: 999
      },
      budget: {
        planned: 0,
        spent: 0,
        remaining: 0,
        monthlyLimit: 0,
        alerts: []
      },
      campaigns: [],
      integration: {
        status: 'connected',
        apiConnected: true,
        lastSync: '2024-01-20T11:30:00',
        autoSync: true,
        credentials: true
      },
      lastUpdate: '2024-01-20T11:30:00'
    }
  ];

  const mockConversionFunnel: ConversionFunnel[] = [
    { stage: 'Посетители', visitors: 45600, conversionRate: 100, previousRate: 100 },
    { stage: 'Лиды', visitors: 2890, conversionRate: 6.3, previousRate: 5.8 },
    { stage: 'Квалифицированные', visitors: 1734, conversionRate: 60.0, previousRate: 58.2 },
    { stage: 'Сделки', visitors: 289, conversionRate: 16.7, previousRate: 15.1 }
  ];

  const mockABTests: ABTest[] = [
    {
      id: 'test-1',
      name: 'Лендинг вертолётов - Заголовок',
      status: 'running',
      startDate: '2024-01-15',
      endDate: '2024-02-15',
      variants: [
        {
          id: 'control',
          name: 'Контрольная группа',
          traffic: 50,
          metrics: {
            visitors: 2340,
            conversions: 89,
            conversionRate: 3.8,
            revenue: 534000,
            timeOnPage: 145,
            bounceRate: 34.2
          }
        },
        {
          id: 'variant-a',
          name: 'Новый заголовок',
          traffic: 50,
          metrics: {
            visitors: 2298,
            conversions: 112,
            conversionRate: 4.9,
            revenue: 672000,
            timeOnPage: 178,
            bounceRate: 28.7
          }
        }
      ],
      winner: 'variant-a',
      confidence: 95.2,
      traffic: 100,
      metrics: ['conversionRate', 'revenue', 'timeOnPage']
    }
  ];

  const mockWebsiteAnalytics: WebsiteAnalytics = {
    totalVisitors: 45600,
    uniqueVisitors: 38900,
    pageViews: 123400,
    avgTimeOnSite: 167,
    bounceRate: 31.2,
    conversionRate: 4.2,
    topPages: [
      {
        url: '/helicopter-tours',
        pageViews: 23400,
        uniqueViews: 19800,
        avgTimeOnPage: 189,
        bounceRate: 26.7,
        conversionRate: 6.8
      },
      {
        url: '/yacht-rental',
        pageViews: 18900,
        uniqueViews: 16200,
        avgTimeOnPage: 156,
        bounceRate: 32.1,
        conversionRate: 4.9
      },
      {
        url: '/buggy-adventures',
        pageViews: 12300,
        uniqueViews: 10800,
        avgTimeOnPage: 134,
        bounceRate: 38.4,
        conversionRate: 3.2
      }
    ],
    trafficSources: [
      { source: 'Google Ads', visitors: 12800, percentage: 28.1, avgTimeOnSite: 178, bounceRate: 24.3, conversionRate: 5.8 },
      { source: 'Instagram', visitors: 9870, percentage: 21.6, avgTimeOnSite: 145, bounceRate: 35.7, conversionRate: 4.2 },
      { source: 'Прямые переходы', visitors: 8900, percentage: 19.5, avgTimeOnSite: 201, bounceRate: 18.9, conversionRate: 6.9 },
      { source: 'Яндекс.Директ', visitors: 6780, percentage: 14.9, avgTimeOnSite: 167, bounceRate: 28.4, conversionRate: 4.7 },
      { source: 'Avito', visitors: 4560, percentage: 10.0, avgTimeOnSite: 123, bounceRate: 45.2, conversionRate: 3.1 },
      { source: 'Остальные', visitors: 2690, percentage: 5.9, avgTimeOnSite: 98, bounceRate: 52.3, conversionRate: 2.4 }
    ]
  };

  // Utility functions
  const getChannelIcon = (type: TrafficSource['type']) => {
    const icons = {
      social: Share2,
      marketplace: Globe,
      ads: Target,
      direct: LinkIcon,
      content: FileText,
      messenger: MessageSquare
    };
    return icons[type];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: 'bg-green-500/20 text-green-400 border-green-500',
      paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
      completed: 'bg-gray-500/20 text-gray-400 border-gray-500',
      draft: 'bg-blue-500/20 text-blue-400 border-blue-500',
      connected: 'bg-green-500/20 text-green-400 border-green-500',
      disconnected: 'bg-red-500/20 text-red-400 border-red-500',
      manual: 'bg-orange-500/20 text-orange-400 border-orange-500',
      error: 'bg-red-500/20 text-red-400 border-red-500'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  const getAlertColor = (severity: string) => {
    const colors = {
      low: 'border-blue-500 bg-blue-500/10 text-blue-400',
      medium: 'border-yellow-500 bg-yellow-500/10 text-yellow-400',
      high: 'border-orange-500 bg-orange-500/10 text-orange-400',
      critical: 'border-red-500 bg-red-500/10 text-red-400'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const formatNumber = (num: number, suffix: string = '') => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}M${suffix}`;
    } else if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K${suffix}`;
    }
    return `${num.toLocaleString()}${suffix}`;
  };

  const formatCurrency = (amount: number) => {
    return `₽${amount.toLocaleString()}`;
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Filter sources
  const filteredSources = useMemo(() => {
    let filtered = mockTrafficSources;

    if (channelFilter !== 'all') {
      filtered = filtered.filter(source => source.type === channelFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(source =>
        source.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [channelFilter, searchQuery]);

  // Calculate totals
  const totals = useMemo(() => {
    return filteredSources.reduce((acc, source) => {
      acc.budget += source.budget.planned;
      acc.spent += source.budget.spent;
      acc.clicks += source.metrics.clicks;
      acc.leads += source.metrics.leads;
      acc.bookings += source.metrics.bookings;
      acc.revenue += source.metrics.revenue;
      return acc;
    }, {
      budget: 0,
      spent: 0,
      clicks: 0,
      leads: 0,
      bookings: 0,
      revenue: 0
    });
  }, [filteredSources]);

  // Get AI recommendations
  const getAIRecommendations = () => {
    return [
      {
        type: 'performance',
        icon: TrendingUp,
        title: 'Увеличьте бюджет на TikTok',
        description: 'ROI 8.9 - самый высокий среди всех каналов. Рекомендуем увеличить бюджет на 40%.',
        priority: 'high'
      },
      {
        type: 'conversion',
        icon: Target,
        title: 'Оптимизируйте воронку',
        description: 'Переход Лиды → Квалифицированные увеличился до 60%. Сократите время отклика до 15 минут.',
        priority: 'medium'
      },
      {
        type: 'budget',
        icon: DollarSign,
        title: 'Перераспределите бюджет',
        description: 'YouTube исчерпал 93% бюджета с хорошим ROI. Рассмотрите увеличение лимита.',
        priority: 'high'
      },
      {
        type: 'creative',
        icon: Lightbulb,
        title: 'A/B тест показывает результат',
        description: 'Новый заголовок на лендинге вертолётов увеличил конверсию на 29%. Внедрите изменения.',
        priority: 'high'
      }
    ];
  };

  // Check permissions
  const canEdit = user.permissions.includes('marketing') || user.role === 'executive';
  const canView = canEdit || user.role === 'manager';

  if (!canView) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Доступ запрещён</h3>
          <p className="text-[#A6A7AA]">У вас нет прав для просмотра маркетинговых данных</p>
        </div>
      </div>
    );
  }

  // Render traffic source card
  const renderSourceCard = (source: TrafficSource) => {
    const ChannelIcon = getChannelIcon(source.type);
    const budgetUsed = (source.budget.spent / source.budget.planned) * 100;
    
    return (
      <Card 
        key={source.id}
        className="bg-[#17181A] border-[#232428] hover:border-[#91040C] transition-colors cursor-pointer"
        onClick={() => setSelectedSource(source)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#232428] rounded-lg">
                <ChannelIcon className="w-5 h-5 text-[#A6A7AA]" />
              </div>
              <div>
                <CardTitle className="text-white flex items-center gap-2">
                  <span className="text-lg">{source.icon}</span>
                  {source.name}
                </CardTitle>
                <CardDescription className="capitalize">
                  {source.type === 'social' ? 'Социальные сети' :
                   source.type === 'marketplace' ? 'Маркетплейс' :
                   source.type === 'ads' ? 'Реклама' :
                   source.type === 'direct' ? 'Прямые переходы' :
                   source.type === 'content' ? 'Контент' : 'Мессенджер'}
                </CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(source.integration.status)}>
                {source.integration.status === 'connected' ? 'Подключен' :
                 source.integration.status === 'manual' ? 'Ручной' :
                 source.integration.status === 'error' ? 'Ошибка' : 'Отключен'}
              </Badge>
              {source.budget.alerts.length > 0 && (
                <Badge className="bg-red-500/20 text-red-400">
                  {source.budget.alerts.length}
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">Клики</span>
                <span className="text-white font-medium">{formatNumber(source.metrics.clicks)}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">Лиды</span>
                <span className="text-white font-medium">{source.metrics.leads}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">Брони</span>
                <span className="text-white font-medium">{source.metrics.bookings}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">CTR</span>
                <span className="text-white font-medium">{source.metrics.ctr}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">Конверсия</span>
                <span className="text-white font-medium">{source.metrics.conversionRate}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#A6A7AA]">ROAS</span>
                <span className="text-green-400 font-medium">{source.metrics.roas}x</span>
              </div>
            </div>
          </div>

          <Separator className="bg-[#232428]" />

          {/* Budget */}
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-[#A6A7AA]">Бюджет</span>
              <span className="text-white">
                {formatCurrency(source.budget.spent)} / {formatCurrency(source.budget.planned)}
              </span>
            </div>
            <div className="w-full bg-[#232428] rounded-full h-2">
              <div 
                className={`h-2 rounded-full transition-all duration-300 ${
                  budgetUsed > 90 ? 'bg-red-500' :
                  budgetUsed > 70 ? 'bg-yellow-500' : 'bg-green-500'
                }`}
                style={{ width: `${Math.min(budgetUsed, 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs mt-1">
              <span className="text-[#A6A7AA]">{budgetUsed.toFixed(1)}% использовано</span>
              <span className="text-[#A6A7AA]">Осталось: {formatCurrency(source.budget.remaining)}</span>
            </div>
          </div>

          {/* Revenue */}
          <div className="flex items-center justify-between p-3 bg-[#232428] rounded-lg">
            <div>
              <div className="text-sm text-[#A6A7AA]">Выручка</div>
              <div className="text-lg font-medium text-green-400">{formatCurrency(source.metrics.revenue)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#A6A7AA]">CPL</div>
              <div className="text-sm text-white">{formatCurrency(source.metrics.cpl)}</div>
            </div>
          </div>

          {/* Specific Metrics */}
          {source.type === 'social' && (
            <div className="grid grid-cols-3 gap-2 text-xs">
              {source.metrics.reach && (
                <div className="text-center">
                  <div className="text-white font-medium">{formatNumber(source.metrics.reach)}</div>
                  <div className="text-[#A6A7AA]">Охват</div>
                </div>
              )}
              {source.metrics.engagement && (
                <div className="text-center">
                  <div className="text-white font-medium">{formatNumber(source.metrics.engagement)}</div>
                  <div className="text-[#A6A7AA]">Вовлечение</div>
                </div>
              )}
              {source.metrics.followers && (
                <div className="text-center">
                  <div className="text-white font-medium">{formatNumber(source.metrics.followers)}</div>
                  <div className="text-[#A6A7AA]">Подписчики</div>
                </div>
              )}
            </div>
          )}

          {/* Alerts */}
          {source.budget.alerts.length > 0 && (
            <Alert className={getAlertColor(source.budget.alerts[0].severity)}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription className="text-sm">
                {source.budget.alerts[0].message}
              </AlertDescription>
            </Alert>
          )}

          {/* Last Update */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#A6A7AA]">
              Обновлено: {new Date(source.lastUpdate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </span>
            {source.integration.autoSync && (
              <Badge className="text-xs bg-green-500/20 text-green-400">
                Авто-синхронизация
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render conversion funnel
  const renderConversionFunnel = () => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardHeader>
        <CardTitle className="text-white">Воронка конверсии</CardTitle>
        <CardDescription>Переходы пользователей по этапам воронки</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockConversionFunnel.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index === 0 ? 'bg-blue-500 text-white' :
                    index === 1 ? 'bg-green-500 text-white' :
                    index === 2 ? 'bg-yellow-500 text-white' :
                    'bg-red-500 text-white'
                  }`}>
                    {index + 1}
                  </div>
                  <div>
                    <h4 className="font-medium text-white">{stage.stage}</h4>
                    <p className="text-sm text-[#A6A7AA]">{formatNumber(stage.visitors)} пользователей</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">{stage.conversionRate}%</span>
                    {stage.previousRate && (
                      <div className={`flex items-center gap-1 text-sm ${
                        stage.conversionRate > stage.previousRate ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {stage.conversionRate > stage.previousRate ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
                        {Math.abs(stage.conversionRate - stage.previousRate).toFixed(1)}%
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="w-full bg-[#232428] rounded-full h-3 mb-2">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    index === 0 ? 'bg-blue-500' :
                    index === 1 ? 'bg-green-500' :
                    index === 2 ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}
                  style={{ width: `${stage.conversionRate}%` }}
                />
              </div>

              {index < mockConversionFunnel.length - 1 && (
                <div className="flex justify-center">
                  <ArrowDown className="w-4 h-4 text-[#A6A7AA]" />
                </div>
              )}
            </div>
          ))}
        </div>

        <Separator className="bg-[#232428] my-6" />

        {/* AI Recommendations */}
        <div>
          <h4 className="font-medium text-white mb-4 flex items-center gap-2">
            <Brain className="w-4 h-4 text-purple-400" />
            AI-рекомендации
          </h4>
          <div className="space-y-3">
            {getAIRecommendations().slice(0, 2).map((rec, index) => (
              <Alert key={index} className="border-purple-500 bg-purple-500/10">
                <rec.icon className="h-4 w-4 text-purple-400" />
                <AlertDescription>
                  <div className="font-medium text-purple-400 mb-1">{rec.title}</div>
                  <div className="text-sm text-white">{rec.description}</div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  // Render ROI table
  const renderROITable = () => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardHeader>
        <CardTitle className="text-white">ROI по каналам</CardTitle>
        <CardDescription>Эффективность каждого канала привлечения</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#232428]">
              <TableHead className="text-[#A6A7AA]">Канал</TableHead>
              <TableHead className="text-[#A6A7AA]">Расходы</TableHead>
              <TableHead className="text-[#A6A7AA]">Выручка</TableHead>
              <TableHead className="text-[#A6A7AA]">Брони</TableHead>
              <TableHead className="text-[#A6A7AA]">ROAS</TableHead>
              <TableHead className="text-[#A6A7AA]">CPL</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredSources
              .sort((a, b) => b.metrics.roas - a.metrics.roas)
              .map(source => (
                <TableRow key={source.id} className="border-[#232428]">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{source.icon}</span>
                      <span className="text-white font-medium">{source.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{formatCurrency(source.budget.spent)}</TableCell>
                  <TableCell className="text-green-400">{formatCurrency(source.metrics.revenue)}</TableCell>
                  <TableCell className="text-white">{source.metrics.bookings}</TableCell>
                  <TableCell>
                    <div className={`font-medium ${
                      source.metrics.roas > 5 ? 'text-green-400' :
                      source.metrics.roas > 3 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {source.metrics.roas}x
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{formatCurrency(source.metrics.cpl)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Render AB tests
  const renderABTests = () => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">A/B тестирование</CardTitle>
            <CardDescription>Активные и завершённые тесты</CardDescription>
          </div>
          {canEdit && (
            <Button 
              size="sm" 
              className="bg-[#91040C] hover:bg-[#91040C]/80"
              onClick={() => setShowABTestDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать тест
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockABTests.map(test => (
            <div key={test.id} className="p-4 bg-[#232428] rounded-lg">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="font-medium text-white">{test.name}</h4>
                  <div className="flex items-center gap-4 mt-1 text-sm text-[#A6A7AA]">
                    <span>{test.startDate} - {test.endDate}</span>
                    <Badge className={getStatusColor(test.status)}>
                      {test.status === 'running' ? 'Активен' :
                       test.status === 'completed' ? 'Завершён' :
                       test.status === 'paused' ? 'Приостановлен' : 'Черновик'}
                    </Badge>
                    {test.winner && (
                      <Badge className="bg-green-500/20 text-green-400">
                        Есть победитель (достоверность {test.confidence}%)
                      </Badge>
                    )}
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-[#17181A] border-[#232428]" align="end">
                    <DropdownMenuItem>
                      <Eye className="w-4 h-4 mr-2" />
                      Подробности
                    </DropdownMenuItem>
                    {canEdit && (
                      <>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" />
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          {test.status === 'running' ? <Pause className="w-4 h-4 mr-2" /> : <PlayCircle className="w-4 h-4 mr-2" />}
                          {test.status === 'running' ? 'Приостановить' : 'Запустить'}
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {test.variants.map(variant => (
                  <div key={variant.id} className={`p-3 rounded border ${
                    test.winner === variant.id ? 'border-green-500 bg-green-500/5' : 'border-[#17181A] bg-[#17181A]'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-white">{variant.name}</h5>
                      {test.winner === variant.id && (
                        <Trophy className="w-4 h-4 text-green-400" />
                      )}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-[#A6A7AA]">Посетители:</span>
                        <span className="text-white ml-2">{formatNumber(variant.metrics.visitors)}</span>
                      </div>
                      <div>
                        <span className="text-[#A6A7AA]">Конверсии:</span>
                        <span className="text-white ml-2">{variant.metrics.conversions}</span>
                      </div>
                      <div>
                        <span className="text-[#A6A7AA]">Конверсия:</span>
                        <span className={`ml-2 font-medium ${
                          test.winner === variant.id ? 'text-green-400' : 'text-white'
                        }`}>
                          {variant.metrics.conversionRate}%
                        </span>
                      </div>
                      <div>
                        <span className="text-[#A6A7AA]">Выручка:</span>
                        <span className="text-white ml-2">{formatCurrency(variant.metrics.revenue)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  // Render website analytics
  const renderWebsiteAnalytics = () => (
    <div className="space-y-6">
      {/* Overall Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatNumber(mockWebsiteAnalytics.totalVisitors)}</div>
                <div className="text-xs text-[#A6A7AA]">Посетители</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <EyeIcon className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatNumber(mockWebsiteAnalytics.pageViews)}</div>
                <div className="text-xs text-[#A6A7AA]">Просмотры</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatDuration(mockWebsiteAnalytics.avgTimeOnSite)}</div>
                <div className="text-xs text-[#A6A7AA]">Время на сайте</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-lg font-heading text-white">{mockWebsiteAnalytics.bounceRate}%</div>
                <div className="text-xs text-[#A6A7AA]">Отказы</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Target className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-lg font-heading text-white">{mockWebsiteAnalytics.conversionRate}%</div>
                <div className="text-xs text-[#A6A7AA]">Конверсия</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatNumber(mockWebsiteAnalytics.uniqueVisitors)}</div>
                <div className="text-xs text-[#A6A7AA]">Уникальные</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Pages */}
      <Card className="bg-[#17181A] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Топ страниц</CardTitle>
          <CardDescription>Самые популярные страницы сайта</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-[#232428]">
                <TableHead className="text-[#A6A7AA]">Страница</TableHead>
                <TableHead className="text-[#A6A7AA]">Просмотры</TableHead>
                <TableHead className="text-[#A6A7AA]">Время на странице</TableHead>
                <TableHead className="text-[#A6A7AA]">Отказы</TableHead>
                <TableHead className="text-[#A6A7AA]">Конверсия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockWebsiteAnalytics.topPages.map((page, index) => (
                <TableRow key={index} className="border-[#232428]">
                  <TableCell className="text-white font-medium">{page.url}</TableCell>
                  <TableCell className="text-white">{formatNumber(page.pageViews)}</TableCell>
                  <TableCell className="text-white">{formatDuration(page.avgTimeOnPage)}</TableCell>
                  <TableCell className="text-white">{page.bounceRate}%</TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      page.conversionRate > 5 ? 'text-green-400' :
                      page.conversionRate > 3 ? 'text-yellow-400' : 'text-red-400'
                    }`}>
                      {page.conversionRate}%
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Traffic Sources */}
      <Card className="bg-[#17181A] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Источники трафика</CardTitle>
          <CardDescription>Откуда приходят пользователи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {mockWebsiteAnalytics.trafficSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[#232428] rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-white">{source.source}</h4>
                    <span className="text-sm text-[#A6A7AA]">{source.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#17181A] rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${source.percentage}%` }}
                    />
                  </div>
                </div>
                <div className="ml-6 text-right">
                  <div className="text-white font-medium">{formatNumber(source.visitors)}</div>
                  <div className="text-sm text-[#A6A7AA]">посетителей</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6 p-6 bg-[#0B0B0C] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            Маркетинг и Трафик
          </h1>
          <p className="text-[#A6A7AA]">
            Полный обзор эффективности маркетинговых каналов и ROI анализ
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#232428]">
            <Download className="w-4 h-4 mr-2" />
            Экспорт отчёта
          </Button>
          {canEdit && (
            <Button 
              size="sm" 
              className="bg-[#91040C] hover:bg-[#91040C]/80"
              onClick={() => setShowCampaignDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать кампанию
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
          <Input
            placeholder="Поиск по каналам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
          />
        </div>

        <Select value={periodFilter} onValueChange={(value) => setPeriodFilter(value as PeriodFilter)}>
          <SelectTrigger className="w-40 bg-[#17181A] border-[#232428] text-white">
            <Calendar className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="7d">7 дней</SelectItem>
            <SelectItem value="30d">30 дней</SelectItem>
            <SelectItem value="90d">90 дней</SelectItem>
            <SelectItem value="1y">1 год</SelectItem>
          </SelectContent>
        </Select>

        <Select value={channelFilter} onValueChange={(value) => setChannelFilter(value as ChannelFilter)}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все каналы</SelectItem>
            <SelectItem value="social">Социальные сети</SelectItem>
            <SelectItem value="marketplace">Маркетплейсы</SelectItem>
            <SelectItem value="ads">Реклама</SelectItem>
            <SelectItem value="direct">Прямые переходы</SelectItem>
            <SelectItem value="content">Контент</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatCurrency(totals.budget)}</div>
                <div className="text-xs text-[#A6A7AA]">Общий бюджет</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatCurrency(totals.spent)}</div>
                <div className="text-xs text-[#A6A7AA]">Потрачено</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <MousePointer className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatNumber(totals.clicks)}</div>
                <div className="text-xs text-[#A6A7AA]">Клики</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-yellow-400" />
              <div>
                <div className="text-lg font-heading text-white">{totals.leads}</div>
                <div className="text-xs text-[#A6A7AA]">Лиды</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-purple-400" />
              <div>
                <div className="text-lg font-heading text-white">{totals.bookings}</div>
                <div className="text-xs text-[#A6A7AA]">Брони</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-heading text-white">{formatCurrency(totals.revenue)}</div>
                <div className="text-xs text-[#A6A7AA]">Выручка</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-[#17181A]">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="sources">Каналы</TabsTrigger>
          <TabsTrigger value="funnel">Воронка</TabsTrigger>
          <TabsTrigger value="roi">ROI</TabsTrigger>
          <TabsTrigger value="testing">A/B тесты</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              {renderConversionFunnel()}
            </div>
            <div className="space-y-6">
              {renderROITable()}
              
              {/* AI Recommendations */}
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    AI-рекомендации
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {getAIRecommendations().map((rec, index) => (
                      <Alert key={index} className="border-purple-500 bg-purple-500/10">
                        <rec.icon className="h-4 w-4 text-purple-400" />
                        <AlertDescription>
                          <div className="font-medium text-purple-400 mb-1">{rec.title}</div>
                          <div className="text-sm text-white">{rec.description}</div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="sources" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSources.map(source => renderSourceCard(source))}
          </div>
        </TabsContent>

        <TabsContent value="funnel" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {renderConversionFunnel()}
            </div>
            <div>
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Фильтры воронки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Канал</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#17181A] border-[#232428]">
                        <SelectItem value="all">Все каналы</SelectItem>
                        <SelectItem value="instagram">Instagram</SelectItem>
                        <SelectItem value="google-ads">Google Ads</SelectItem>
                        <SelectItem value="avito">Avito</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Сегмент</label>
                    <Select defaultValue="all">
                      <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#17181A] border-[#232428]">
                        <SelectItem value="all">Все пользователи</SelectItem>
                        <SelectItem value="new">Новые</SelectItem>
                        <SelectItem value="returning">Возвращающиеся</SelectItem>
                        <SelectItem value="club">Клубные</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch />
                    <label className="text-sm text-[#A6A7AA]">
                      Показать только клубных участников
                    </label>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="roi" className="mt-6">
          <div className="space-y-6">
            {renderROITable()}
            
            {/* Budget Management */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Управление бюджетами</CardTitle>
                    <CardDescription>Распределение и контроль расходов по каналам</CardDescription>
                  </div>
                  {canEdit && (
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="border-[#232428]"
                      onClick={() => setShowBudgetDialog(true)}
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Настроить бюджеты
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredSources
                    .filter(source => source.budget.planned > 0)
                    .map(source => {
                      const budgetUsed = (source.budget.spent / source.budget.planned) * 100;
                      return (
                        <div key={source.id} className="p-4 bg-[#232428] rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg">{source.icon}</span>
                              <h4 className="font-medium text-white">{source.name}</h4>
                            </div>
                            {source.budget.alerts.length > 0 && (
                              <Badge className="bg-red-500/20 text-red-400">
                                {source.budget.alerts.length} алертов
                              </Badge>
                            )}
                          </div>
                          
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-[#A6A7AA]">Потрачено</span>
                              <span className="text-white">
                                {formatCurrency(source.budget.spent)} / {formatCurrency(source.budget.planned)}
                              </span>
                            </div>
                            
                            <Progress value={budgetUsed} className="h-2" />
                            
                            <div className="flex justify-between text-xs">
                              <span className="text-[#A6A7AA]">{budgetUsed.toFixed(1)}%</span>
                              <span className="text-[#A6A7AA]">
                                Остаток: {formatCurrency(source.budget.remaining)}
                              </span>
                            </div>
                            
                            {source.budget.dailyLimit && (
                              <div className="text-xs text-[#A6A7AA] mt-2">
                                Дневной лимит: {formatCurrency(source.budget.dailyLimit)}
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
        </TabsContent>

        <TabsContent value="testing" className="mt-6">
          <div className="space-y-6">
            {renderABTests()}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          {renderWebsiteAnalytics()}
        </TabsContent>
      </Tabs>

      {/* Campaign Dialog */}
      <Dialog open={showCampaignDialog} onOpenChange={setShowCampaignDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-3xl">
          <DialogHeader>
            <DialogTitle>Создать маркетинговую кампанию</DialogTitle>
            <DialogDescription>
              Настройте новую кампанию для продвижения услуг
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Название кампании
                </label>
                <Input
                  placeholder="Например: Летние вертолётные туры"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Дата начала
                  </label>
                  <Input
                    type="date"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Дата окончания
                  </label>
                  <Input
                    type="date"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Канал
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите канал" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="google-ads">Google Ads</SelectItem>
                    <SelectItem value="vk">VKontakte</SelectItem>
                    <SelectItem value="youtube">YouTube</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Бюджет
                </label>
                <Input
                  type="number"
                  placeholder="Бюджет в рублях"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Целевая аудитория
                </label>
                <div className="space-y-3">
                  <Select>
                    <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                      <SelectValue placeholder="Географическое таргетирование" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#17181A] border-[#232428]">
                      <SelectItem value="sochi">Сочи</SelectItem>
                      <SelectItem value="krasnodar">Краснодарский край</SelectItem>
                      <SelectItem value="russia">Россия</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Возраст от"
                      className="bg-[#232428] border-[#232428] text-white"
                    />
                    <Input
                      type="number"
                      placeholder="Возраст до"
                      className="bg-[#232428] border-[#232428] text-white"
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <label className="text-sm text-[#A6A7AA]">
                      Только клубные участники
                    </label>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Switch />
                    <label className="text-sm text-[#A6A7AA]">
                      Lookalike аудитория
                    </label>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Креатив
                </label>
                <Textarea
                  placeholder="Описание креатива, заголовок, призыв к действию"
                  className="bg-[#232428] border-[#232428] text-white"
                  rows={4}
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowCampaignDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Создать кампанию
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* AB Test Dialog */}
      <Dialog open={showABTestDialog} onOpenChange={setShowABTestDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать A/B тест</DialogTitle>
            <DialogDescription>
              Настройте тест для сравнения различных вариантов
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Название теста
              </label>
              <Input
                placeholder="Например: Тест заголовка лендинга багги"
                className="bg-[#232428] border-[#232428] text-white"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Дата начала
                </label>
                <Input
                  type="date"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Дата окончания
                </label>
                <Input
                  type="date"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Распределение трафика
              </label>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <label className="text-xs text-[#A6A7AA]">Контрольная группа</label>
                  <Input
                    type="number"
                    defaultValue="50"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
                <div className="flex-1">
                  <label className="text-xs text-[#A6A7AA]">Вариант A</label>
                  <Input
                    type="number"
                    defaultValue="50"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Метрики для отслеживания
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <label className="text-sm text-[#A6A7AA]">Конверсия в заявку</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked />
                  <label className="text-sm text-[#A6A7AA]">Конверсия в бронь</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <label className="text-sm text-[#A6A7AA]">Время на странице</label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch />
                  <label className="text-sm text-[#A6A7AA]">Показатель отказов</label>
                </div>
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Описание изменений
              </label>
              <Textarea
                placeholder="Опишите, что будет тестироваться (заголовок, кнопка, изображение и т.д.)"
                className="bg-[#232428] border-[#232428] text-white"
                rows={3}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowABTestDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Запустить тест
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}