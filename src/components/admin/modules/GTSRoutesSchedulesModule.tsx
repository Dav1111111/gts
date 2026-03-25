// 🗺️ GTS Routes & Schedules Module - Полная реализация согласно спецификации v2025-09-17
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuTrigger, 
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from "../../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Checkbox } from "../../ui/checkbox";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Alert, AlertDescription } from "../../ui/alert";
import { ScrollArea } from "../../ui/scroll-area";
import { toast } from "sonner@2.0.3";
import { 
  // Core Icons
  MapPin, Route, Calendar, Clock, Mountain, Waves, Users, Star,
  Target, ArrowUpRight, Activity, CheckCircle, Bell, AlertTriangle,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  Timer, Navigation, MessageSquare, Phone, Settings,
  
  // Routes specific
  Map, Compass, TreePine, Navigation2, CloudSnow, Sun,
  Wind, Thermometer, Zap, Calendar as CalendarIcon,
  
  // Navigation
  ArrowLeft, ArrowRight, Home, LayersIcon
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type RouteStatus = 'draft' | 'published' | 'archived';
type Difficulty = 'E' | 'M' | 'H' | 'X'; // Easy, Medium, Hard, Extreme
type Terrain = 'sand' | 'rock' | 'mud' | 'snow' | 'water' | 'mixed';
type RiskLevel = 'low' | 'medium' | 'high' | 'extreme';
type SlotStatus = 'active' | 'blocked' | 'cancelled';
type WeatherCondition = 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'snowy' | 'foggy';
type VehicleType = 'helicopter' | 'atv' | 'yacht' | 'car' | 'snowmobile' | 'jetski';

interface Route {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  durationMin: number;
  distanceKm: number;
  terrain: Terrain[];
  minAge: number;
  maxParticipants: number;
  requirements: string[]; // license, experience levels
  season: {
    start: string; // MM-DD format
    end: string;   // MM-DD format
  };
  weatherLimits: {
    maxWind: number; // km/h
    maxPrecipitation: number; // mm/h
    minVisibility: number; // km
    allowedConditions: WeatherCondition[];
  };
  status: RouteStatus;
  version: number;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
  tags: string[];
  price: {
    base: number;
    currency: 'RUB';
    seasonal?: {
      high: number;
      low: number;
    };
  };
  compatibleVehicles: VehicleType[];
  photos: string[];
  featured: boolean;
  marketingActive: boolean;
}

interface Checkpoint {
  id: string;
  routeId: string;
  name: string;
  description?: string;
  lat: number;
  lng: number;
  order: number;
  estimatedArrivalMin: number; // from start
  notes?: string;
  riskLevel: RiskLevel;
  services?: string[]; // fuel, food, medical, repair
  mandatory: boolean;
  photos: string[];
}

interface ScheduleTemplate {
  id: string;
  routeId: string;
  name: string;
  weekdays: number[]; // 0-6, Sunday = 0
  timeSlots: TimeSlot[];
  blackoutDates: string[]; // ISO dates
  seasonalOverrides: {
    period: string;
    maxCapacity?: number;
    priceMultiplier?: number;
  }[];
  active: boolean;
  createdAt: string;
}

interface TimeSlot {
  id: string;
  startTime: string; // HH:MM format
  capacity: number;
  priceMultiplier: number;
  status: SlotStatus;
  bookedCount: number;
  minimumBooking?: number;
}

interface WeatherRestriction {
  id: string;
  routeId: string;
  condition: WeatherCondition;
  severity: 'warning' | 'block';
  message: string;
  autoBlock: boolean;
}

interface RouteMetrics {
  routeId: string;
  occupancyRate: number; // percentage
  avgDuration: number; // minutes
  weatherCancellations: number;
  customerRating: number;
  revenueTotal: number;
  popularityRank: number;
}

// 🎯 MОК ДАННЫЕ

const mockRoutes: Route[] = [
  {
    id: 'R-023',
    title: 'Горный серпантин',
    description: 'Захватывающий маршрут по горным дорогам с живописными видами на Кавказские горы',
    difficulty: 'M',
    durationMin: 180,
    distanceKm: 45,
    terrain: ['rock', 'mixed'],
    minAge: 16,
    maxParticipants: 6,
    requirements: ['driving_license', 'off_road_experience'],
    season: {
      start: '04-01',
      end: '10-31'
    },
    weatherLimits: {
      maxWind: 50,
      maxPrecipitation: 5,
      minVisibility: 2,
      allowedConditions: ['sunny', 'cloudy']
    },
    status: 'published',
    version: 3,
    createdAt: '2025-03-15T10:00:00Z',
    updatedAt: '2025-09-10T14:30:00Z',
    publishedAt: '2025-04-01T09:00:00Z',
    tags: ['mountain', 'scenic', 'adventure', 'off-road'],
    price: {
      base: 15000,
      currency: 'RUB',
      seasonal: {
        high: 18000,
        low: 12000
      }
    },
    compatibleVehicles: ['atv', 'car'],
    photos: [
      'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop'
    ],
    featured: true,
    marketingActive: true
  },
  {
    id: 'R-015',
    title: 'Морская прогулка VIP',
    description: 'Эксклюзивный маршрут вдоль побережья Черного моря с остановкой в живописных бухтах',
    difficulty: 'E',
    durationMin: 240,
    distanceKm: 25,
    terrain: ['water'],
    minAge: 12,
    maxParticipants: 12,
    requirements: ['swimming_ability'],
    season: {
      start: '05-01',
      end: '09-30'
    },
    weatherLimits: {
      maxWind: 25,
      maxPrecipitation: 1,
      minVisibility: 5,
      allowedConditions: ['sunny', 'cloudy']
    },
    status: 'published',
    version: 2,
    createdAt: '2025-02-20T11:00:00Z',
    updatedAt: '2025-08-15T16:00:00Z',
    publishedAt: '2025-05-01T10:00:00Z',
    tags: ['sea', 'luxury', 'vip', 'relaxation'],
    price: {
      base: 25000,
      currency: 'RUB',
      seasonal: {
        high: 30000,
        low: 20000
      }
    },
    compatibleVehicles: ['yacht'],
    photos: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
    ],
    featured: true,
    marketingActive: true
  },
  {
    id: 'R-008',
    title: 'Вертолетная экскурсия',
    description: 'Панорамный облет достопримечательностей Сочи с посадкой на горной вершине',
    difficulty: 'E',
    durationMin: 90,
    distanceKm: 80,
    terrain: ['mixed'],
    minAge: 8,
    maxParticipants: 3,
    requirements: [],
    season: {
      start: '01-01',
      end: '12-31'
    },
    weatherLimits: {
      maxWind: 40,
      maxPrecipitation: 0,
      minVisibility: 10,
      allowedConditions: ['sunny', 'cloudy']
    },
    status: 'published',
    version: 4,
    createdAt: '2025-01-10T09:00:00Z',
    updatedAt: '2025-09-05T12:00:00Z',
    publishedAt: '2025-01-15T10:00:00Z',
    tags: ['helicopter', 'aerial', 'sightseeing', 'premium'],
    price: {
      base: 45000,
      currency: 'RUB'
    },
    compatibleVehicles: ['helicopter'],
    photos: [
      'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'
    ],
    featured: false,
    marketingActive: true
  },
  {
    id: 'R-031',
    title: 'Зимнее сафари на снегоходах',
    description: 'Экстремальный маршрут по заснеженным склонам с посещением горных приютов',
    difficulty: 'H',
    durationMin: 300,
    distanceKm: 60,
    terrain: ['snow', 'rock'],
    minAge: 18,
    maxParticipants: 8,
    requirements: ['snowmobile_license', 'winter_experience'],
    season: {
      start: '12-01',
      end: '03-31'
    },
    weatherLimits: {
      maxWind: 60,
      maxPrecipitation: 10,
      minVisibility: 1,
      allowedConditions: ['sunny', 'cloudy', 'snowy']
    },
    status: 'draft',
    version: 1,
    createdAt: '2025-09-01T14:00:00Z',
    updatedAt: '2025-09-16T10:00:00Z',
    tags: ['winter', 'snowmobile', 'extreme', 'mountain'],
    price: {
      base: 22000,
      currency: 'RUB'
    },
    compatibleVehicles: ['snowmobile'],
    photos: [],
    featured: false,
    marketingActive: false
  }
];

const mockCheckpoints: Checkpoint[] = [
  {
    id: 'CP-001',
    routeId: 'R-023',
    name: 'Стартовая площадка Красная Поляна',
    description: 'Основная база с полным сервисом',
    lat: 43.6844,
    lng: 40.2067,
    order: 1,
    estimatedArrivalMin: 0,
    notes: 'Брифинг, проверка техники, выдача снаряжения',
    riskLevel: 'low',
    services: ['fuel', 'food', 'medical', 'repair'],
    mandatory: true,
    photos: ['https://images.unsplash.com/photo-1551632811-561732d1e306?w=300&h=200&fit=crop']
  },
  {
    id: 'CP-002',
    routeId: 'R-023',
    name: 'Смотровая площадка "Орлиные скалы"',
    description: 'Первая остановка с панорамным видом',
    lat: 43.6900,
    lng: 40.2200,
    order: 2,
    estimatedArrivalMin: 45,
    notes: 'Фотосессия, короткий отдых 15 минут',
    riskLevel: 'medium',
    services: [],
    mandatory: true,
    photos: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop']
  },
  {
    id: 'CP-003',
    routeId: 'R-023',
    name: 'Горное озеро Кардывач',
    description: 'Высокогорное озеро на высоте 1838м',
    lat: 43.7100,
    lng: 40.2400,
    order: 3,
    estimatedArrivalMin: 120,
    notes: 'Обед, купание (по желанию), отдых 45 минут',
    riskLevel: 'high',
    services: ['food'],
    mandatory: true,
    photos: ['https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=200&fit=crop']
  },
  {
    id: 'CP-004',
    routeId: 'R-023',
    name: 'Возврат на базу',
    description: 'Финишная точка маршрута',
    lat: 43.6844,
    lng: 40.2067,
    order: 4,
    estimatedArrivalMin: 180,
    notes: 'Дебрифинг, сдача снаряжения',
    riskLevel: 'low',
    services: ['fuel', 'repair'],
    mandatory: true,
    photos: []
  }
];

const mockScheduleTemplates: ScheduleTemplate[] = [
  {
    id: 'ST-001',
    routeId: 'R-023',
    name: 'Летнее расписание',
    weekdays: [1, 2, 3, 4, 5, 6], // Пн-Сб
    timeSlots: [
      {
        id: 'TS-001',
        startTime: '09:00',
        capacity: 6,
        priceMultiplier: 1.0,
        status: 'active',
        bookedCount: 4,
        minimumBooking: 2
      },
      {
        id: 'TS-002',
        startTime: '14:00',
        capacity: 6,
        priceMultiplier: 1.1,
        status: 'active',
        bookedCount: 2,
        minimumBooking: 2
      }
    ],
    blackoutDates: ['2025-12-31', '2025-01-01'],
    seasonalOverrides: [
      {
        period: 'high-season',
        maxCapacity: 8,
        priceMultiplier: 1.5
      }
    ],
    active: true,
    createdAt: '2025-04-01T09:00:00Z'
  },
  {
    id: 'ST-002',
    routeId: 'R-015',
    name: 'Морское расписание',
    weekdays: [0, 1, 2, 3, 4, 5, 6], // Ежедневно
    timeSlots: [
      {
        id: 'TS-003',
        startTime: '10:00',
        capacity: 12,
        priceMultiplier: 1.0,
        status: 'active',
        bookedCount: 8,
        minimumBooking: 4
      },
      {
        id: 'TS-004',
        startTime: '15:00',
        capacity: 12,
        priceMultiplier: 1.2,
        status: 'active',
        bookedCount: 6,
        minimumBooking: 4
      }
    ],
    blackoutDates: ['2025-10-01', '2025-04-30'],
    seasonalOverrides: [],
    active: true,
    createdAt: '2025-05-01T10:00:00Z'
  }
];

const mockRouteMetrics: RouteMetrics[] = [
  {
    routeId: 'R-023',
    occupancyRate: 78,
    avgDuration: 185,
    weatherCancellations: 3,
    customerRating: 4.8,
    revenueTotal: 450000,
    popularityRank: 2
  },
  {
    routeId: 'R-015',
    occupancyRate: 92,
    avgDuration: 240,
    weatherCancellations: 1,
    customerRating: 4.9,
    revenueTotal: 720000,
    popularityRank: 1
  },
  {
    routeId: 'R-008',
    occupancyRate: 65,
    avgDuration: 85,
    weatherCancellations: 8,
    customerRating: 4.7,
    revenueTotal: 380000,
    popularityRank: 3
  }
];

// 🎯 KPI КОНФИГУРАЦИЯ

interface RoutesKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  description: string;
  icon: React.ComponentType<any>;
}

const routesKpis: RoutesKPI[] = [
  {
    title: "Средняя заполняемость",
    value: "78.3%",
    change: "+5.2%",
    trend: "up",
    target: "75%",
    description: "Заполняемость маршрутов за последний месяц",
    icon: Target
  },
  {
    title: "Отмены из-за погоды",
    value: "4.1%",
    change: "-1.3%",
    trend: "up",
    target: "< 5%",
    description: "Процент отмененных поездок по погодным условиям",
    icon: CloudSnow
  },
  {
    title: "Средняя длительность",
    value: "185 мин",
    change: "+8 мин",
    trend: "up",
    target: "180 мин",
    description: "Фактическая длительность против плановой",
    icon: Timer
  },
  {
    title: "Активных маршрутов",
    value: "23",
    change: "+3",
    trend: "up",
    target: "25",
    description: "Количество опубликованных маршрутов",
    icon: Route
  }
];

// 🎯 КОНФИГУРАЦИЯ СТАТУСОВ И СЛОЖНОСТИ

const statusConfig = {
  'draft': { label: 'Черновик', color: 'bg-gray-500/10 text-gray-400', icon: Edit3 },
  'published': { label: 'Опубликован', color: 'bg-green-500/10 text-green-400', icon: CheckCircle2 },
  'archived': { label: 'Архивирован', color: 'bg-orange-500/10 text-orange-400', icon: XCircle }
};

const difficultyConfig = {
  'E': { label: 'Легкий', color: 'bg-green-500/10 text-green-400', icon: Users },
  'M': { label: 'Средний', color: 'bg-yellow-500/10 text-yellow-400', icon: Mountain },
  'H': { label: 'Сложный', color: 'bg-orange-500/10 text-orange-400', icon: TreePine },
  'X': { label: 'Экстрим', color: 'bg-red-500/10 text-red-400', icon: Zap }
};

const terrainConfig = {
  'sand': { label: 'Песок', icon: Sun },
  'rock': { label: 'Скалы', icon: Mountain },
  'mud': { label: 'Грязь', icon: Waves },
  'snow': { label: 'Снег', icon: CloudSnow },
  'water': { label: 'Вода', icon: Waves },
  'mixed': { label: 'Смешанный', icon: Compass }
};

const riskLevelConfig = {
  'low': { label: 'Низкий', color: 'bg-green-500/10 text-green-400' },
  'medium': { label: 'Средний', color: 'bg-yellow-500/10 text-yellow-400' },
  'high': { label: 'Высокий', color: 'bg-orange-500/10 text-orange-400' },
  'extreme': { label: 'Экстремальный', color: 'bg-red-500/10 text-red-400' }
};

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSRoutesSchedulesModuleProps {
  onBackToModules?: () => void;
}

export function GTSRoutesSchedulesModule({ onBackToModules }: GTSRoutesSchedulesModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState<'overview' | 'routes' | 'schedules' | 'analytics' | 'settings'>('overview');
  const [selectedRoutes, setSelectedRoutes] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<RouteStatus | 'all'>('all');
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty | 'all'>('all');
  const [showRouteModal, setShowRouteModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ScheduleTemplate | null>(null);
  const [routes, setRoutes] = useState<Route[]>(mockRoutes);
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>(mockCheckpoints);
  const [scheduleTemplates, setScheduleTemplates] = useState<ScheduleTemplate[]>(mockScheduleTemplates);
  const [routeMetrics, setRouteMetrics] = useState<RouteMetrics[]>(mockRouteMetrics);

  // Фильтрация маршрутов
  const filteredRoutes = useMemo(() => {
    return routes.filter(route => {
      const matchesSearch = 
        route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        route.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesStatus = statusFilter === 'all' || route.status === statusFilter;
      const matchesDifficulty = difficultyFilter === 'all' || route.difficulty === difficultyFilter;
      
      return matchesSearch && matchesStatus && matchesDifficulty;
    });
  }, [routes, searchQuery, statusFilter, difficultyFilter]);

  // Обработчики действий
  const handleStatusChange = async (routeId: string, newStatus: RouteStatus) => {
    // Проверка возможности перехода
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    // Валидация для публикации
    if (newStatus === 'published') {
      const routeCheckpoints = checkpoints.filter(cp => cp.routeId === routeId);
      if (routeCheckpoints.length < 2) {
        toast.error('Для публикации маршрута нужно минимум 2 чек-пойнта');
        return;
      }

      const templates = scheduleTemplates.filter(t => t.routeId === routeId && t.active);
      if (templates.length === 0) {
        toast.error('Для публикации маршрута нужно активное расписание');
        return;
      }
    }

    setRoutes(prev => prev.map(r => 
      r.id === routeId 
        ? { 
            ...r, 
            status: newStatus, 
            updatedAt: new Date().toISOString(),
            publishedAt: newStatus === 'published' ? new Date().toISOString() : r.publishedAt
          }
        : r
    ));

    toast.success(`Маршрут ${statusConfig[newStatus].label.toLowerCase()}`);
    
    // Логирование события
    console.log({
      type: newStatus === 'published' ? 'RoutePublished' : 'RouteStatusChanged',
      routeId,
      oldStatus: route.status,
      newStatus,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleCreateVersion = (routeId: string) => {
    const route = routes.find(r => r.id === routeId);
    if (!route) return;

    const newRoute: Route = {
      ...route,
      id: `${route.id}-v${route.version + 1}`,
      version: route.version + 1,
      status: 'draft',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      publishedAt: undefined
    };

    setRoutes(prev => [newRoute, ...prev]);
    toast.success(`Создана версия ${newRoute.version} маршрута`);
  };

  const handleToggleFeatured = (routeId: string) => {
    setRoutes(prev => prev.map(r => 
      r.id === routeId 
        ? { ...r, featured: !r.featured, updatedAt: new Date().toISOString() }
        : r
    ));
    
    const route = routes.find(r => r.id === routeId);
    toast.success(`Маршрут ${route?.featured ? 'убран из' : 'добавлен в'} рекомендуемые`);
  };

  const handleBlockSlot = (templateId: string, slotId: string, reason: string) => {
    setScheduleTemplates(prev => prev.map(template =>
      template.id === templateId
        ? {
            ...template,
            timeSlots: template.timeSlots.map(slot =>
              slot.id === slotId
                ? { ...slot, status: 'blocked' as SlotStatus }
                : slot
            )
          }
        : template
    ));
    
    toast.success('Слот заблокирован');
    
    console.log({
      type: 'SlotBlocked',
      templateId,
      slotId,
      reason,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  // Компоненты статусов и значков
  const StatusBadge = ({ status }: { status: RouteStatus }) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const DifficultyBadge = ({ difficulty }: { difficulty: Difficulty }) => {
    const config = difficultyConfig[difficulty];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const TerrainChips = ({ terrain }: { terrain: Terrain[] }) => (
    <div className="flex gap-1 flex-wrap">
      {terrain.map(t => {
        const config = terrainConfig[t];
        const IconComponent = config.icon;
        return (
          <Badge key={t} variant="outline" className="text-xs">
            <IconComponent className="w-3 h-3 mr-1" />
            {config.label}
          </Badge>
        );
      })}
    </div>
  );

  // Обзорный экран
  const OverviewScreen = () => (
    <div className="space-y-6">
      {/* Популярные маршруты */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-400" />
            Популярные маршруты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {routes
              .filter(route => route.featured && route.status === 'published')
              .slice(0, 3)
              .map((route) => {
                const metrics = routeMetrics.find(m => m.routeId === route.id);
                return (
                  <Card 
                    key={route.id} 
                    className="bg-[#17181A] border-[#232428] hover:border-[#91040C]/50 transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedRoute(route);
                      setShowRouteModal(true);
                    }}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video mb-3 rounded-lg overflow-hidden bg-[#121214]">
                        {route.photos[0] ? (
                          <img 
                            src={route.photos[0]} 
                            alt={route.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Map className="w-8 h-8 text-[#A6A7AA]" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="text-white font-medium text-sm line-clamp-1">{route.title}</h4>
                        <DifficultyBadge difficulty={route.difficulty} />
                      </div>
                      
                      <div className="flex items-center gap-3 text-xs text-[#A6A7AA] mb-2">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {Math.floor(route.durationMin / 60)}ч {route.durationMin % 60}м
                        </div>
                        <div className="flex items-center gap-1">
                          <Navigation className="w-3 h-3" />
                          {route.distanceKm}км
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {route.maxParticipants}
                        </div>
                      </div>
                      
                      {metrics && (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400" />
                            <span className="text-xs text-[#A6A7AA]">{metrics.customerRating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Target className="w-3 h-3 text-green-400" />
                            <span className="text-xs text-green-400">{metrics.occupancyRate}%</span>
                          </div>
                        </div>
                      )}
                      
                      <div className="mt-3 pt-3 border-t border-[#232428]">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium">
                            {route.price.base.toLocaleString('ru-RU')} ₽
                          </span>
                          <Badge variant="outline" className="text-xs">
                            #{metrics?.popularityRank || '—'}
                          </Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Текущие ограничения */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-orange-400" />
            Текущие ограничения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert className="border-orange-500/20 bg-orange-500/5">
              <CloudSnow className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Маршрут R-031 "Зимнее сафари"</div>
                    <p className="text-[#A6A7AA] text-sm">
                      Заблокирован до улучшения погодных условий • Ветер 65 км/ч
                    </p>
                  </div>
                  <Badge className="bg-orange-500/10 text-orange-400">
                    Погода
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
            
            <Alert className="border-blue-500/20 bg-blue-500/5">
              <Settings className="h-4 w-4" />
              <AlertDescription>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-white font-medium">Маршрут R-008 "Вертолетная экскурсия"</div>
                    <p className="text-[#A6A7AA] text-sm">
                      Плановое ТО техники • Ограничена вместимость до 15 октября
                    </p>
                  </div>
                  <Badge className="bg-blue-500/10 text-blue-400">
                    Техническое
                  </Badge>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        </CardContent>
      </Card>

      {/* Быстрые действия */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Быстрые действия</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90 h-auto p-4 flex-col">
              <Plus className="w-5 h-5 mb-2" />
              <span className="text-sm">Новый маршрут</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <Calendar className="w-5 h-5 mb-2" />
              <span className="text-sm">Расписание</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <MapPin className="w-5 h-5 mb-2" />
              <span className="text-sm">Чек-пойнты</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <Eye className="w-5 h-5 mb-2" />
              <span className="text-sm">Предпросмотр</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 text-sm text-[#A6A7AA] mb-2">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onBackToModules}
              className="p-0 text-[#A6A7AA] hover:text-white"
            >
              <Home className="w-4 h-4 mr-1" />
              Dashboard
            </Button>
            <ChevronRight className="w-4 h-4" />
            <span className="text-white">Routes & Schedules</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Маршруты и расписания</h1>
          <p className="text-[#A6A7AA]">
            Управление маршрутами, чек-пойнтами и расписаниями • {filteredRoutes.length} маршрутов
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/10 text-blue-400">
            <Map className="w-3 h-3 mr-1" />
            {routes.filter(r => r.status === 'published').length} активных
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Создать маршрут
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {routesKpis.map((kpi, index) => {
          const IconComponent = kpi.icon;
          const isPositive = kpi.trend === 'up';
          
          return (
            <Card key={index} className="bg-[#121214] border-[#232428] hover:border-[#91040C]/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <IconComponent className="w-5 h-5 text-[#A6A7AA]" />
                  <div className="flex items-center gap-1">
                    <ArrowUpRight className={`w-3 h-3 ${isPositive ? 'text-green-400' : 'text-red-400'} ${!isPositive && 'rotate-90'}`} />
                    <span className={`text-xs ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className="mb-1">
                  <div className="text-xl font-heading text-white">{kpi.value}</div>
                  <div className="text-sm font-medium text-[#A6A7AA]">{kpi.title}</div>
                </div>
                <div className="text-xs text-[#A6A7AA]">{kpi.description}</div>
                {kpi.target && (
                  <div className="text-xs text-blue-400 mt-1">Цель: {kpi.target}</div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Навигация по разделам */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardContent className="p-4">
          <Tabs value={activeView} onValueChange={(value: any) => setActiveView(value)} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-[#17181A]">
              <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                <LayersIcon className="w-4 h-4 mr-2" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="routes" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Route className="w-4 h-4 mr-2" />
                Маршруты
              </TabsTrigger>
              <TabsTrigger value="schedules" className="text-[#A6A7AA] data-[state=active]:text-white">
                <CalendarIcon className="w-4 h-4 mr-2" />
                Расписания
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Аналитика
              </TabsTrigger>
              <TabsTrigger value="settings" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Settings className="w-4 h-4 mr-2" />
                Настройки
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewScreen />
            </TabsContent>

            <TabsContent value="routes" className="mt-6">
              <div className="space-y-4">
                {/* Фильтры и поиск */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск маршрутов..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#17181A] border-[#232428]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
                    <SelectTrigger className="w-40 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="draft">Черновик</SelectItem>
                      <SelectItem value="published">Опубликован</SelectItem>
                      <SelectItem value="archived">Архивирован</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={difficultyFilter} onValueChange={(value: any) => setDifficultyFilter(value)}>
                    <SelectTrigger className="w-40 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Сложность" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все уровни</SelectItem>
                      <SelectItem value="E">Легкий</SelectItem>
                      <SelectItem value="M">Средний</SelectItem>
                      <SelectItem value="H">Сложный</SelectItem>
                      <SelectItem value="X">Экстрим</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Список маршрутов */}
                <div className="grid gap-4">
                  {filteredRoutes.map((route) => {
                    const metrics = routeMetrics.find(m => m.routeId === route.id);
                    const routeCheckpoints = checkpoints.filter(cp => cp.routeId === route.id);
                    const routeTemplates = scheduleTemplates.filter(t => t.routeId === route.id);
                    
                    return (
                      <Card key={route.id} className="bg-[#121214] border-[#232428] hover:border-[#91040C]/50 transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className="text-lg font-medium text-white">{route.title}</h3>
                                <StatusBadge status={route.status} />
                                <DifficultyBadge difficulty={route.difficulty} />
                                {route.featured && (
                                  <Badge className="bg-yellow-500/10 text-yellow-400">
                                    <Star className="w-3 h-3 mr-1" />
                                    Рекомендуемый
                                  </Badge>
                                )}
                              </div>
                              
                              <p className="text-[#A6A7AA] text-sm mb-3 line-clamp-2">
                                {route.description}
                              </p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Длительность</Label>
                                  <div className="text-white text-sm">
                                    {Math.floor(route.durationMin / 60)}ч {route.durationMin % 60}м
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Расстояние</Label>
                                  <div className="text-white text-sm">{route.distanceKm} км</div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Участники</Label>
                                  <div className="text-white text-sm">до {route.maxParticipants}</div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Цена</Label>
                                  <div className="text-white text-sm">{route.price.base.toLocaleString('ru-RU')} ₽</div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-4 mb-3">
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Чек-пойнты</Label>
                                  <div className="text-white text-sm">{routeCheckpoints.length}</div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Расписания</Label>
                                  <div className="text-white text-sm">{routeTemplates.length}</div>
                                </div>
                                {metrics && (
                                  <>
                                    <div>
                                      <Label className="text-[#A6A7AA] text-xs">Заполняемость</Label>
                                      <div className="text-white text-sm">{metrics.occupancyRate}%</div>
                                    </div>
                                    <div>
                                      <Label className="text-[#A6A7AA] text-xs">Рейтинг</Label>
                                      <div className="text-white text-sm flex items-center gap-1">
                                        <Star className="w-3 h-3 text-yellow-400" />
                                        {metrics.customerRating}
                                      </div>
                                    </div>
                                  </>
                                )}
                              </div>
                              
                              <TerrainChips terrain={route.terrain} />
                            </div>
                            
                            <div className="flex items-center gap-2 ml-4">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                                  <DropdownMenuItem 
                                    onClick={() => {
                                      setSelectedRoute(route);
                                      setShowRouteModal(true);
                                    }}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <Eye className="w-4 h-4 mr-2" />
                                    Подробнее
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleCreateVersion(route.id)}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <Copy className="w-4 h-4 mr-2" />
                                    Создать версию
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator className="bg-[#232428]" />
                                  {route.status === 'draft' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleStatusChange(route.id, 'published')}
                                      className="text-white hover:bg-[#17181A]"
                                    >
                                      <CheckCircle2 className="w-4 h-4 mr-2" />
                                      Опубликовать
                                    </DropdownMenuItem>
                                  )}
                                  {route.status === 'published' && (
                                    <DropdownMenuItem 
                                      onClick={() => handleToggleFeatured(route.id)}
                                      className="text-white hover:bg-[#17181A]"
                                    >
                                      <Star className="w-4 h-4 mr-2" />
                                      {route.featured ? 'Убрать из рекомендуемых' : 'Добавить в рекомендуемые'}
                                    </DropdownMenuItem>
                                  )}
                                  <DropdownMenuItem 
                                    onClick={() => handleStatusChange(route.id, 'archived')}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <XCircle className="w-4 h-4 mr-2" />
                                    Архивировать
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="schedules" className="mt-6">
              <div className="text-center py-12">
                <CalendarIcon className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Управление расписаниями</h3>
                <p className="text-[#A6A7AA]">
                  Настройка слотов, шаблонов расписания и блокировок
                </p>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Аналитика маршрутов</h3>
                <p className="text-[#A6A7AA]">
                  Детальная статистика по производительности и популярности
                </p>
              </div>
            </TabsContent>

            <TabsContent value="settings" className="mt-6">
              <div className="text-center py-12">
                <Settings className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Настройки системы</h3>
                <p className="text-[#A6A7AA]">
                  Глобальные настр��йки маршрутов и ограничений
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Модальное окно карточки маршрута */}
      {selectedRoute && (
        <Dialog open={showRouteModal} onOpenChange={setShowRouteModal}>
          <DialogContent className="max-w-6xl bg-[#121214] border-[#232428] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl text-white">
                    {selectedRoute.title}
                  </DialogTitle>
                  <DialogDescription className="text-[#A6A7AA]">
                    Версия {selectedRoute.version} • Создан {new Date(selectedRoute.createdAt).toLocaleDateString('ru-RU')}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedRoute.status} />
                  <DifficultyBadge difficulty={selectedRoute.difficulty} />
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-5 bg-[#17181A]">
                <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="map" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Карта
                </TabsTrigger>
                <TabsTrigger value="checkpoints" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Чек-пойнты
                </TabsTrigger>
                <TabsTrigger value="restrictions" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Ограничения
                </TabsTrigger>
                <TabsTrigger value="preview" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Предпросмотр
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-[#A6A7AA]">Описание</Label>
                        <div className="text-white">{selectedRoute.description}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#A6A7AA]">Длительность</Label>
                          <div className="text-white">
                            {Math.floor(selectedRoute.durationMin / 60)}ч {selectedRoute.durationMin % 60}м
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Расстояние</Label>
                          <div className="text-white">{selectedRoute.distanceKm} км</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Мин. возраст</Label>
                          <div className="text-white">{selectedRoute.minAge} лет</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Макс. участники</Label>
                          <div className="text-white">{selectedRoute.maxParticipants}</div>
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Тип местности</Label>
                        <div className="mt-1">
                          <TerrainChips terrain={selectedRoute.terrain} />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Коммерческие данные</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-[#A6A7AA]">Базовая цена</Label>
                        <div className="text-white text-xl font-medium">
                          {selectedRoute.price.base.toLocaleString('ru-RU')} ₽
                        </div>
                      </div>
                      {selectedRoute.price.seasonal && (
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-[#A6A7AA]">Высокий сезон</Label>
                            <div className="text-white">
                              {selectedRoute.price.seasonal.high.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                          <div>
                            <Label className="text-[#A6A7AA]">Низкий сезон</Label>
                            <div className="text-white">
                              {selectedRoute.price.seasonal.low.toLocaleString('ru-RU')} ₽
                            </div>
                          </div>
                        </div>
                      )}
                      <div>
                        <Label className="text-[#A6A7AA]">Сезон</Label>
                        <div className="text-white">
                          {selectedRoute.season.start} — {selectedRoute.season.end}
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Совместимая техника</Label>
                        <div className="flex gap-2 mt-1">
                          {selectedRoute.compatibleVehicles.map(vehicle => (
                            <Badge key={vehicle} variant="outline" className="text-xs">
                              {vehicle}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {selectedRoute.requirements.length > 0 && (
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Требования</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-2 flex-wrap">
                        {selectedRoute.requirements.map(req => (
                          <Badge key={req} variant="outline" className="text-sm">
                            {req}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="map" className="space-y-4 mt-4">
                <div className="text-center py-12">
                  <Map className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Интерактивная карта</h3>
                  <p className="text-[#A6A7AA]">
                    Отображение маршрута с чек-пойнтами и зонами ограничений
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="checkpoints" className="space-y-4 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium text-white">Чек-пойнты маршрута</h3>
                    <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить чек-пойнт
                    </Button>
                  </div>
                  
                  <div className="space-y-3">
                    {checkpoints
                      .filter(cp => cp.routeId === selectedRoute.id)
                      .sort((a, b) => a.order - b.order)
                      .map((checkpoint) => (
                        <Card key={checkpoint.id} className="bg-[#17181A] border-[#232428]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <div className="w-8 h-8 bg-[#91040C] rounded-full flex items-center justify-center text-white text-sm font-medium">
                                    {checkpoint.order}
                                  </div>
                                  <div>
                                    <h4 className="text-white font-medium">{checkpoint.name}</h4>
                                    <p className="text-[#A6A7AA] text-sm">
                                      {checkpoint.estimatedArrivalMin}мин от старта
                                    </p>
                                  </div>
                                  <Badge className={riskLevelConfig[checkpoint.riskLevel].color}>
                                    {riskLevelConfig[checkpoint.riskLevel].label}
                                  </Badge>
                                  {checkpoint.mandatory && (
                                    <Badge className="bg-blue-500/10 text-blue-400">
                                      Обязательный
                                    </Badge>
                                  )}
                                </div>
                                
                                {checkpoint.description && (
                                  <p className="text-[#A6A7AA] text-sm mb-2">
                                    {checkpoint.description}
                                  </p>
                                )}
                                
                                <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                                  <div className="flex items-center gap-1">
                                    <MapPin className="w-3 h-3" />
                                    {checkpoint.lat.toFixed(4)}, {checkpoint.lng.toFixed(4)}
                                  </div>
                                  {checkpoint.services && checkpoint.services.length > 0 && (
                                    <div className="flex items-center gap-1">
                                      <Settings className="w-3 h-3" />
                                      {checkpoint.services.join(', ')}
                                    </div>
                                  )}
                                </div>
                                
                                {checkpoint.notes && (
                                  <div className="mt-2 p-2 bg-[#121214] rounded text-sm text-[#A6A7AA]">
                                    {checkpoint.notes}
                                  </div>
                                )}
                              </div>
                              
                              <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white">
                                <Edit3 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="restrictions" className="space-y-4 mt-4">
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Ограничения и правила</h3>
                  <p className="text-[#A6A7AA]">
                    Погодные условия, сезонные ограничения и требования безопасности
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4 mt-4">
                <div className="text-center py-12">
                  <Eye className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Предпросмотр витрины</h3>
                  <p className="text-[#A6A7AA]">
                    Как маршрут будет выглядеть для клиентов на сайте
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default GTSRoutesSchedulesModule;