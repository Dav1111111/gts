// 💰 GTS Pricing & Offers Module - Полная реализация согласно спецификации v2025-09-17
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
  DollarSign, Percent, Gift, Package, Calendar, AlertTriangle,
  Star, Target, ArrowUpRight, Activity, CheckCircle, Bell,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  Timer, Navigation, MessageSquare, Phone, Settings,
  
  // Pricing specific
  Calculator, Tag, TrendingUp, TrendingDown, BarChart3,
  Zap, Clock, Users, CreditCard, ShoppingCart,
  
  // Offer specific
  Sparkles, Flame, Crown, Gem, Award, Heart,
  Calendar as CalendarIcon, MapPin, Building,
  
  // Navigation
  ArrowLeft, ArrowRight, Home, Layers, FileText
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type PriceListStatus = 'draft' | 'published' | 'archived';
type OfferStatus = 'planned' | 'active' | 'expired' | 'paused' | 'cancelled';
type OfferType = 'discount' | 'bonus' | 'bundle' | 'freebie' | 'upgrade';
type DiscountType = 'percentage' | 'fixed' | 'buy_x_get_y' | 'tiered';
type Channel = 'website' | 'mobile_app' | 'call_center' | 'partner' | 'b2b' | 'crm';
type Season = 'winter' | 'spring' | 'summer' | 'autumn' | 'year_round';
type Segment = 'premium' | 'standard' | 'budget' | 'vip' | 'corporate' | 'first_time';
type Currency = 'RUB' | 'USD' | 'EUR';

interface PriceRule {
  id: string;
  serviceId: string;
  serviceName: string;
  category: string;
  basePrice: number;
  
  // Условия применения
  minDuration?: number;        // Минимальная продолжительность (часы)
  maxDuration?: number;        // Максимальная продолжительность
  minGroupSize?: number;       // Минимальный размер группы
  maxGroupSize?: number;       // Максимальный размер группы
  weekdays?: number[];         // Дни недели (0-6)
  timeSlots?: string[];        // Временные слоты
  validFrom?: string;          // Действует с
  validTo?: string;            // Действует до
  
  // Модификаторы цены
  seasonMultiplier?: number;   // Сезонный коэффициент
  weekendMultiplier?: number;  // Коэффициент выходных
  groupDiscountRules?: {       // Групповые скидки
    minSize: number;
    discount: number;
  }[];
  
  // Дополнительные услуги
  addOns?: {
    id: string;
    name: string;
    price: number;
    required: boolean;
  }[];
  
  isActive: boolean;
}

interface PriceList {
  id: string;
  name: string;
  description?: string;
  season: Season;
  channel: Channel;
  segment: Segment;
  currency: Currency;
  
  rules: PriceRule[];
  
  // Версионность
  version: number;
  parentId?: string;           // Ссылка на родительскую версию
  
  // Метаданные
  status: PriceListStatus;
  validFrom: string;
  validTo?: string;
  
  // Аудит
  createdBy: string;
  createdAt: string;
  publishedBy?: string;
  publishedAt?: string;
  updatedAt: string;
  
  // Статистика
  bookingsCount?: number;      // Количество бронирований
  totalRevenue?: number;       // Общая выручка
  avgOrderValue?: number;      // Средний чек
}

interface Offer {
  id: string;
  name: string;
  description: string;
  type: OfferType;
  
  // Настройки скидки
  discountType: DiscountType;
  discountValue: number;       // Значение скидки (% или фиксированная сумма)
  maxDiscountAmount?: number;  // Максимальная сумма скидки
  
  // Условия применения
  minOrderAmount?: number;     // Минимальная сумма заказа
  maxUsageCount?: number;      // Максимальное количество использований
  maxUsagePerUser?: number;    // Максимальное использование на пользователя
  
  // Применимость
  applicableServices: string[]; // ID применимых услуг
  applicableChannels: Channel[]; // Применимые каналы
  applicableSegments: Segment[]; // Применимые сегменты
  
  // Временные рамки
  validFrom: string;
  validTo: string;
  
  // Комбинируемость
  combinableWithOthers: boolean; // Можно ли комбинировать с другими акциями
  priority: number;            // Приоритет применения (1-10)
  
  // Промо материалы
  imageUrl?: string;
  bannerText?: string;
  terms?: string;
  previewLink?: string;
  
  // Статус и метаданные
  status: OfferStatus;
  createdBy: string;
  createdAt: string;
  activatedAt?: string;
  deactivatedAt?: string;
  
  // Статистика
  usageCount: number;          // Количество использований
  revenue: number;             // Выручка по акции
  conversionRate?: number;     // Конверсия
}

interface PromoCode {
  id: string;
  code: string;                // Промо-код
  offerId: string;             // Связанная акция
  
  // Дополнительные ограничения
  maxUses?: number;            // Максимальное количество использований
  usedCount: number;           // Количество использований
  
  // Персонализация
  assignedUserIds?: string[];  // Персональные коды
  oneTimeUse: boolean;         // Одноразовое использование
  
  // Статус
  isActive: boolean;
  createdAt: string;
  lastUsedAt?: string;
}

interface Bundle {
  id: string;
  name: string;
  description: string;
  
  // Состав пакета
  services: {
    serviceId: string;
    serviceName: string;
    quantity: number;
    originalPrice: number;
  }[];
  
  // Ценообразование
  originalTotalPrice: number;  // Сумма без скидки
  bundlePrice: number;         // Цена пакета
  savings: number;             // Экономия
  discountPercentage: number;  // Процент скидки
  
  // Настройки
  minAdvanceBooking?: number;  // Минимальное время бронирования заранее (дни)
  validityPeriod?: number;     // Срок действия пакета (дни)
  transferable: boolean;       // Можно ли передать другому лицу
  
  // Применимость
  applicableChannels: Channel[];
  applicableSegments: Segment[];
  
  // Временные рамки
  validFrom: string;
  validTo: string;
  
  // Статус
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  
  // Статистика
  salesCount: number;
  totalRevenue: number;
}

interface PriceConflict {
  id: string;
  type: 'overlap' | 'gap' | 'inconsistency';
  severity: 'low' | 'medium' | 'high';
  description: string;
  affectedRules: string[];
  suggestedFix?: string;
}

interface PriceSimulation {
  serviceId: string;
  serviceName: string;
  duration: number;
  groupSize: number;
  date: string;
  channel: Channel;
  segment: Segment;
  
  // Результат расчета
  basePrice: number;
  appliedModifiers: {
    name: string;
    multiplier: number;
    amount: number;
  }[];
  finalPrice: number;
  
  // Применимые акции
  applicableOffers: {
    offerId: string;
    offerName: string;
    discountAmount: number;
    finalPriceWithOffer: number;
  }[];
}

// 🎯 МОК ДАННЫЕ

const mockServices = [
  { id: 'SVC-001', name: 'Багги-тур Красная Поляна', category: 'Extreme' },
  { id: 'SVC-002', name: 'Вертолетная экскурсия', category: 'Premium' },
  { id: 'SVC-003', name: 'Яхтенная прогулка', category: 'Premium' },
  { id: 'SVC-004', name: 'Квадроциклы в горах', category: 'Extreme' },
  { id: 'SVC-005', name: 'Дегустационный тур', category: 'Cultural' },
  { id: 'SVC-006', name: 'Фотосессия на природе', category: 'Cultural' }
];

const mockPriceLists: PriceList[] = [
  {
    id: 'PL-2025S',
    name: 'Летний прайс-лист 2025',
    description: 'Основные тарифы на летний сезон',
    season: 'summer',
    channel: 'website',
    segment: 'standard',
    currency: 'RUB',
    version: 2,
    parentId: 'PL-2025S-V1',
    
    rules: [
      {
        id: 'PR-001',
        serviceId: 'SVC-001',
        serviceName: 'Багги-тур Красная Поляна',
        category: 'Extreme',
        basePrice: 8500,
        minDuration: 2,
        maxDuration: 6,
        minGroupSize: 2,
        maxGroupSize: 8,
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        timeSlots: ['09:00', '14:00', '17:00'],
        seasonMultiplier: 1.2,
        weekendMultiplier: 1.15,
        groupDiscountRules: [
          { minSize: 4, discount: 0.05 },
          { minSize: 6, discount: 0.10 },
          { minSize: 8, discount: 0.15 }
        ],
        addOns: [
          { id: 'AO-001', name: 'Профессиональная фотосъемка', price: 3000, required: false },
          { id: 'AO-002', name: 'Страховка экстрим', price: 500, required: true }
        ],
        isActive: true
      },
      {
        id: 'PR-002',
        serviceId: 'SVC-002',
        serviceName: 'Вертолетная экскурсия',
        category: 'Premium',
        basePrice: 45000,
        minDuration: 1,
        maxDuration: 3,
        minGroupSize: 1,
        maxGroupSize: 6,
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        timeSlots: ['10:00', '13:00', '16:00'],
        seasonMultiplier: 1.0,
        weekendMultiplier: 1.1,
        addOns: [
          { id: 'AO-003', name: 'VIP трансфер', price: 8000, required: false },
          { id: 'AO-004', name: 'Шампанское на борту', price: 5000, required: false }
        ],
        isActive: true
      },
      {
        id: 'PR-003',
        serviceId: 'SVC-003',
        serviceName: 'Яхтенная прогулка',
        category: 'Premium',
        basePrice: 25000,
        minDuration: 3,
        maxDuration: 8,
        minGroupSize: 2,
        maxGroupSize: 12,
        weekdays: [1, 2, 3, 4, 5, 6, 0],
        seasonMultiplier: 1.1,
        weekendMultiplier: 1.2,
        groupDiscountRules: [
          { minSize: 6, discount: 0.05 },
          { minSize: 10, discount: 0.12 }
        ],
        isActive: true
      }
    ],
    
    status: 'published',
    validFrom: '2025-06-01T00:00:00Z',
    validTo: '2025-08-31T23:59:59Z',
    
    createdBy: 'user:pricing-mgr',
    createdAt: '2025-05-15T10:00:00Z',
    publishedBy: 'user:exec-1',
    publishedAt: '2025-05-20T14:30:00Z',
    updatedAt: '2025-09-15T16:45:00Z',
    
    bookingsCount: 1247,
    totalRevenue: 18650000,
    avgOrderValue: 14960
  },
  {
    id: 'PL-2025A',
    name: 'Осенний прайс-лист 2025',
    description: 'Тарифы на осенний сезон с учетом погодных условий',
    season: 'autumn',
    channel: 'website',
    segment: 'standard',
    currency: 'RUB',
    version: 1,
    
    rules: [
      {
        id: 'PR-004',
        serviceId: 'SVC-001',
        serviceName: 'Багги-тур Красная Поляна',
        category: 'Extreme',
        basePrice: 7500,
        minDuration: 2,
        maxDuration: 6,
        seasonMultiplier: 0.9,
        weekendMultiplier: 1.1,
        isActive: true
      },
      {
        id: 'PR-005',
        serviceId: 'SVC-005',
        serviceName: 'Дегустационный тур',
        category: 'Cultural',
        basePrice: 4500,
        minDuration: 3,
        maxDuration: 5,
        seasonMultiplier: 1.15, // Повышенный спрос осенью
        isActive: true
      }
    ],
    
    status: 'draft',
    validFrom: '2025-09-01T00:00:00Z',
    validTo: '2025-11-30T23:59:59Z',
    
    createdBy: 'user:pricing-mgr',
    createdAt: '2025-08-20T11:00:00Z',
    updatedAt: '2025-09-17T09:30:00Z'
  }
];

const mockOffers: Offer[] = [
  {
    id: 'OFF-001',
    name: 'Раннее бронирование -15%',
    description: 'Скидка 15% при бронировании за 30 дней до даты поездки',
    type: 'discount',
    discountType: 'percentage',
    discountValue: 15,
    
    minOrderAmount: 10000,
    maxUsagePerUser: 2,
    
    applicableServices: ['SVC-001', 'SVC-002', 'SVC-003'],
    applicableChannels: ['website', 'mobile_app'],
    applicableSegments: ['standard', 'premium'],
    
    validFrom: '2025-06-01T00:00:00Z',
    validTo: '2025-08-31T23:59:59Z',
    
    combinableWithOthers: false,
    priority: 8,
    
    bannerText: '🎯 Планируй заранее и экономь!',
    terms: 'Акция действует при бронировании не менее чем за 30 дней до даты поездки. Не суммируется с другими акциями.',
    previewLink: '/offers/early-booking',
    
    status: 'active',
    createdBy: 'user:marketing-mgr',
    createdAt: '2025-05-10T14:00:00Z',
    activatedAt: '2025-06-01T00:00:00Z',
    
    usageCount: 89,
    revenue: 875000,
    conversionRate: 12.3
  },
  {
    id: 'OFF-002',
    name: 'Первый раз со скидкой',
    description: 'Скидка 20% для новых клиентов',
    type: 'discount',
    discountType: 'percentage',
    discountValue: 20,
    maxDiscountAmount: 5000,
    
    applicableServices: ['SVC-001', 'SVC-004', 'SVC-005'],
    applicableChannels: ['website', 'mobile_app', 'call_center'],
    applicableSegments: ['first_time'],
    
    validFrom: '2025-01-01T00:00:00Z',
    validTo: '2025-12-31T23:59:59Z',
    
    combinableWithOthers: true,
    priority: 9,
    
    bannerText: '🎉 Добро пожаловать в GTS!',
    terms: 'Скидка для клиентов, которые бронируют впервые. Максимальная скидка 5000 руб.',
    
    status: 'active',
    createdBy: 'user:marketing-mgr',
    createdAt: '2025-01-15T10:00:00Z',
    activatedAt: '2025-01-01T00:00:00Z',
    
    usageCount: 234,
    revenue: 1250000,
    conversionRate: 18.7
  },
  {
    id: 'OFF-003',
    name: 'Майские праздники 2x1',
    description: 'При заказе двух экскурсий третья в подарок',
    type: 'bonus',
    discountType: 'buy_x_get_y',
    discountValue: 100, // 100% скидка на третью услугу
    
    applicableServices: ['SVC-001', 'SVC-004', 'SVC-005', 'SVC-006'],
    applicableChannels: ['website', 'mobile_app'],
    applicableSegments: ['standard', 'premium'],
    
    validFrom: '2025-05-01T00:00:00Z',
    validTo: '2025-05-12T23:59:59Z',
    
    combinableWithOthers: false,
    priority: 10,
    
    bannerText: '🎊 Майские праздники: 2+1 в подарок!',
    terms: 'При заказе двух любых экскурсий третья (самая дешевая) предоставляется бесплатно.',
    
    status: 'expired',
    createdBy: 'user:marketing-mgr',
    createdAt: '2025-04-15T12:00:00Z',
    activatedAt: '2025-05-01T00:00:00Z',
    deactivatedAt: '2025-05-12T23:59:59Z',
    
    usageCount: 156,
    revenue: 2100000,
    conversionRate: 24.1
  },
  {
    id: 'OFF-004',
    name: 'VIP пакет со скидкой',
    description: 'Скидка 10% на премиум услуги для VIP клиентов',
    type: 'discount',
    discountType: 'percentage',
    discountValue: 10,
    
    minOrderAmount: 30000,
    
    applicableServices: ['SVC-002', 'SVC-003'],
    applicableChannels: ['website', 'call_center', 'crm'],
    applicableSegments: ['vip', 'premium'],
    
    validFrom: '2025-06-01T00:00:00Z',
    validTo: '2025-12-31T23:59:59Z',
    
    combinableWithOthers: true,
    priority: 6,
    
    bannerText: '👑 VIP привилегии',
    terms: 'Персональная скидка для VIP клиентов на премиум услуги.',
    
    status: 'planned',
    createdBy: 'user:vip-mgr',
    createdAt: '2025-09-15T16:00:00Z',
    
    usageCount: 0,
    revenue: 0
  }
];

const mockPromoCodes: PromoCode[] = [
  {
    id: 'PC-001',
    code: 'SUMMER2025',
    offerId: 'OFF-001',
    maxUses: 500,
    usedCount: 89,
    oneTimeUse: false,
    isActive: true,
    createdAt: '2025-05-10T14:30:00Z',
    lastUsedAt: '2025-09-16T18:25:00Z'
  },
  {
    id: 'PC-002', 
    code: 'WELCOME20',
    offerId: 'OFF-002',
    maxUses: 1000,
    usedCount: 234,
    oneTimeUse: true,
    isActive: true,
    createdAt: '2025-01-15T10:30:00Z',
    lastUsedAt: '2025-09-17T14:15:00Z'
  },
  {
    id: 'PC-003',
    code: 'MAY2PLUS1',
    offerId: 'OFF-003',
    maxUses: 200,
    usedCount: 156,
    oneTimeUse: false,
    isActive: false,
    createdAt: '2025-04-15T12:30:00Z',
    lastUsedAt: '2025-05-12T20:45:00Z'
  },
  {
    id: 'PC-004',
    code: 'VIPEXCLUSIVE',
    offerId: 'OFF-004',
    assignedUserIds: ['USER-VIP-001', 'USER-VIP-002', 'USER-VIP-003'],
    usedCount: 0,
    oneTimeUse: true,
    isActive: true,
    createdAt: '2025-09-15T16:30:00Z'
  }
];

const mockBundles: Bundle[] = [
  {
    id: 'BND-001',
    name: 'Экстрим Уикенд',
    description: 'Идеальный пакет для любителей адреналина: багги + квадроциклы + фотосессия',
    
    services: [
      { serviceId: 'SVC-001', serviceName: 'Багги-тур Красная Поляна', quantity: 1, originalPrice: 8500 },
      { serviceId: 'SVC-004', serviceName: 'Квадроциклы в горах', quantity: 1, originalPrice: 7000 },
      { serviceId: 'SVC-006', serviceName: 'Фотосессия на природе', quantity: 1, originalPrice: 3500 }
    ],
    
    originalTotalPrice: 19000,
    bundlePrice: 16000,
    savings: 3000,
    discountPercentage: 15.8,
    
    minAdvanceBooking: 3,
    validityPeriod: 30,
    transferable: true,
    
    applicableChannels: ['website', 'mobile_app'],
    applicableSegments: ['standard', 'premium'],
    
    validFrom: '2025-06-01T00:00:00Z',
    validTo: '2025-08-31T23:59:59Z',
    
    isActive: true,
    createdBy: 'user:product-mgr',
    createdAt: '2025-05-25T11:00:00Z',
    
    salesCount: 67,
    totalRevenue: 1072000
  },
  {
    id: 'BND-002',
    name: 'Премиум Романтик',
    description: 'Роскошный пакет для особых случаев: вертолет + яхта + дегустация',
    
    services: [
      { serviceId: 'SVC-002', serviceName: 'Вертолетная экскурсия', quantity: 1, originalPrice: 45000 },
      { serviceId: 'SVC-003', serviceName: 'Яхтенная прогулка', quantity: 1, originalPrice: 25000 },
      { serviceId: 'SVC-005', serviceName: 'Дегустационный тур', quantity: 1, originalPrice: 4500 }
    ],
    
    originalTotalPrice: 74500,
    bundlePrice: 65000,
    savings: 9500,
    discountPercentage: 12.8,
    
    minAdvanceBooking: 7,
    validityPeriod: 60,
    transferable: false,
    
    applicableChannels: ['website', 'call_center', 'crm'],
    applicableSegments: ['premium', 'vip'],
    
    validFrom: '2025-06-01T00:00:00Z',
    validTo: '2025-12-31T23:59:59Z',
    
    isActive: true,
    createdBy: 'user:product-mgr',
    createdAt: '2025-05-30T14:00:00Z',
    
    salesCount: 23,
    totalRevenue: 1495000
  },
  {
    id: 'BND-003',
    name: 'Культурная Программа',
    description: 'Познавательный пакет: дегустация + фотосессия с гидом',
    
    services: [
      { serviceId: 'SVC-005', serviceName: 'Дегустационный тур', quantity: 1, originalPrice: 4500 },
      { serviceId: 'SVC-006', serviceName: 'Фотосессия на природе', quantity: 1, originalPrice: 3500 }
    ],
    
    originalTotalPrice: 8000,
    bundlePrice: 7000,
    savings: 1000,
    discountPercentage: 12.5,
    
    minAdvanceBooking: 1,
    validityPeriod: 14,
    transferable: true,
    
    applicableChannels: ['website', 'mobile_app', 'partner'],
    applicableSegments: ['standard', 'budget'],
    
    validFrom: '2025-09-01T00:00:00Z',
    validTo: '2025-11-30T23:59:59Z',
    
    isActive: true,
    createdBy: 'user:product-mgr',
    createdAt: '2025-08-15T09:00:00Z',
    
    salesCount: 12,
    totalRevenue: 84000
  }
];

// 🎯 KPI КОНФИГУРАЦИЯ

interface PricingKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  description: string;
  icon: React.ComponentType<any>;
}

const pricingKpis: PricingKPI[] = [
  {
    title: "Конверсия",
    value: "15.4%",
    change: "+2.1%",
    trend: "up",
    target: "16%",
    description: "Процент завершенных бронирований",
    icon: TrendingUp
  },
  {
    title: "Средняя маржа",
    value: "68.5%",
    change: "+1.8%",
    trend: "up",
    target: "70%",
    description: "Средняя маржинальность услуг",
    icon: Percent
  },
  {
    title: "Выручка по акциям",
    value: "₽4.2М",
    change: "+₽680К",
    trend: "up",
    target: "₽5М",
    description: "Доход от акционных предложений",
    icon: Gift
  },
  {
    title: "Использование промокодов",
    value: "23.7%",
    change: "+5.2%",
    trend: "up",
    target: "25%",
    description: "Процент заказов с промокодами",
    icon: Tag
  }
];

// 🎯 КОНФИГУРАЦИЯ СТАТУСОВ

const priceListStatusConfig = {
  'draft': { label: 'Черновик', color: 'bg-gray-500/10 text-gray-400', icon: FileText },
  'published': { label: 'Опубликован', color: 'bg-green-500/10 text-green-400', icon: CheckCircle },
  'archived': { label: 'Архивирован', color: 'bg-orange-500/10 text-orange-400', icon: XCircle }
};

const offerStatusConfig = {
  'planned': { label: 'Запланирована', color: 'bg-blue-500/10 text-blue-400', icon: Clock },
  'active': { label: 'Активна', color: 'bg-green-500/10 text-green-400', icon: Play },
  'expired': { label: 'Истекла', color: 'bg-red-500/10 text-red-400', icon: XCircle },
  'paused': { label: 'Приостановлена', color: 'bg-yellow-500/10 text-yellow-400', icon: Pause },
  'cancelled': { label: 'Отменена', color: 'bg-gray-500/10 text-gray-400', icon: Ban }
};

const offerTypeConfig = {
  'discount': { label: 'Скидка', color: 'bg-red-500/10 text-red-400', icon: Percent },
  'bonus': { label: 'Бонус', color: 'bg-green-500/10 text-green-400', icon: Gift },
  'bundle': { label: 'Пакет', color: 'bg-blue-500/10 text-blue-400', icon: Package },
  'freebie': { label: 'Подарок', color: 'bg-purple-500/10 text-purple-400', icon: Heart },
  'upgrade': { label: 'Апгрейд', color: 'bg-orange-500/10 text-orange-400', icon: Crown }
};

const channelConfig = {
  'website': { label: 'Сайт', icon: ExternalLink },
  'mobile_app': { label: 'Мобильное приложение', icon: Phone },
  'call_center': { label: 'Call-центр', icon: Phone },
  'partner': { label: 'Партнеры', icon: Users },
  'b2b': { label: 'B2B', icon: Building },
  'crm': { label: 'CRM', icon: Users }
};

const segmentConfig = {
  'premium': { label: 'Премиум', color: 'bg-purple-500/10 text-purple-400' },
  'standard': { label: 'Стандарт', color: 'bg-blue-500/10 text-blue-400' },
  'budget': { label: 'Бюджет', color: 'bg-green-500/10 text-green-400' },
  'vip': { label: 'VIP', color: 'bg-yellow-500/10 text-yellow-400' },
  'corporate': { label: 'Корпоративный', color: 'bg-gray-500/10 text-gray-400' },
  'first_time': { label: 'Новый клиент', color: 'bg-pink-500/10 text-pink-400' }
};

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSPricingOffersModuleProps {
  onBackToModules?: () => void;
}

export function GTSPricingOffersModule({ onBackToModules }: GTSPricingOffersModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState<'overview' | 'pricelists' | 'offers' | 'promocodes' | 'bundles' | 'simulator' | 'analytics'>('overview');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [channelFilter, setChannelFilter] = useState<string>('all');
  const [showPriceListModal, setShowPriceListModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState(false);
  const [showSimulatorModal, setShowSimulatorModal] = useState(false);
  const [selectedPriceList, setSelectedPriceList] = useState<PriceList | null>(null);
  const [selectedOffer, setSelectedOffer] = useState<Offer | null>(null);
  const [priceLists, setPriceLists] = useState<PriceList[]>(mockPriceLists);
  const [offers, setOffers] = useState<Offer[]>(mockOffers);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>(mockPromoCodes);
  const [bundles, setBundles] = useState<Bundle[]>(mockBundles);
  const [conflicts, setConflicts] = useState<PriceConflict[]>([]);

  // Симулятор цен
  const [simulatorParams, setSimulatorParams] = useState({
    serviceId: '',
    duration: 3,
    groupSize: 2,
    date: new Date().toISOString().split('T')[0],
    channel: 'website' as Channel,
    segment: 'standard' as Segment
  });

  // Фильтрация данных
  const filteredPriceLists = useMemo(() => {
    return priceLists.filter(pl => {
      const matchesSearch = 
        pl.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pl.description?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || pl.status === statusFilter;
      const matchesChannel = channelFilter === 'all' || pl.channel === channelFilter;
      
      return matchesSearch && matchesStatus && matchesChannel;
    });
  }, [priceLists, searchQuery, statusFilter, channelFilter]);

  const filteredOffers = useMemo(() => {
    return offers.filter(offer => {
      const matchesSearch = 
        offer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        offer.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || offer.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });
  }, [offers, searchQuery, statusFilter]);

  // Обработчики действий
  const handlePublishPriceList = async (priceListId: string) => {
    const priceList = priceLists.find(pl => pl.id === priceListId);
    if (!priceList || priceList.status !== 'draft') return;

    // Проверка конфликтов
    const priceConflicts = checkPriceConflicts(priceList);
    if (priceConflicts.some(c => c.severity === 'high')) {
      toast.error('Обнаружены критические конфликты в правилах ценообразования');
      setConflicts(priceConflicts);
      return;
    }

    // Архивирование предыдущей версии
    if (priceList.parentId) {
      setPriceLists(prev => prev.map(pl => 
        pl.id === priceList.parentId 
          ? { ...pl, status: 'archived' as PriceListStatus }
          : pl
      ));
    }

    // Публикация новой версии
    setPriceLists(prev => prev.map(pl => 
      pl.id === priceListId 
        ? { 
            ...pl, 
            status: 'published' as PriceListStatus,
            publishedBy: 'user:exec-1',
            publishedAt: new Date().toISOString()
          }
        : pl
    ));

    toast.success('Прайс-лист успешно опубликован');
    
    // Логирование события
    console.log({
      type: 'PriceListPublished',
      priceListId,
      version: priceList.version,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleActivateOffer = async (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer || offer.status !== 'planned') return;

    setOffers(prev => prev.map(o => 
      o.id === offerId 
        ? { 
            ...o, 
            status: 'active' as OfferStatus,
            activatedAt: new Date().toISOString()
          }
        : o
    ));

    toast.success('Акция активирована');
    
    console.log({
      type: 'OfferActivated',
      offerId,
      offerName: offer.name,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handlePauseOffer = async (offerId: string) => {
    setOffers(prev => prev.map(o => 
      o.id === offerId 
        ? { ...o, status: 'paused' as OfferStatus }
        : o
    ));

    toast.success('Акция приостановлена');
  };

  const handleCreatePromoCode = (offerId: string) => {
    const offer = offers.find(o => o.id === offerId);
    if (!offer) return;

    const code = `PROMO${Date.now()}`.toUpperCase();
    const newPromoCode: PromoCode = {
      id: `PC-${Date.now()}`,
      code,
      offerId,
      maxUses: 100,
      usedCount: 0,
      oneTimeUse: false,
      isActive: true,
      createdAt: new Date().toISOString()
    };

    setPromoCodes(prev => [newPromoCode, ...prev]);
    toast.success(`Промокод ${code} создан`);
  };

  const checkPriceConflicts = (priceList: PriceList): PriceConflict[] => {
    const conflicts: PriceConflict[] = [];
    
    // Проверка пересекающихся правил
    for (let i = 0; i < priceList.rules.length; i++) {
      for (let j = i + 1; j < priceList.rules.length; j++) {
        const rule1 = priceList.rules[i];
        const rule2 = priceList.rules[j];
        
        if (rule1.serviceId === rule2.serviceId && rule1.isActive && rule2.isActive) {
          // Проверка пересечения временных слотов
          const overlappingTimeSlots = rule1.timeSlots?.some(slot => 
            rule2.timeSlots?.includes(slot)
          );
          
          if (overlappingTimeSlots) {
            conflicts.push({
              id: `CONFLICT-${Date.now()}-${i}-${j}`,
              type: 'overlap',
              severity: 'medium',
              description: `Правила ${rule1.id} и ${rule2.id} имеют пересекающиеся временные слоты для услуги ${rule1.serviceName}`,
              affectedRules: [rule1.id, rule2.id],
              suggestedFix: 'Разделите временные слоты или объедините правила'
            });
          }
        }
      }
    }
    
    // Проверка ценовых разрывов
    const groupedByService = priceList.rules.reduce((acc, rule) => {
      if (!acc[rule.serviceId]) acc[rule.serviceId] = [];
      acc[rule.serviceId].push(rule);
      return acc;
    }, {} as Record<string, PriceRule[]>);
    
    Object.entries(groupedByService).forEach(([serviceId, rules]) => {
      if (rules.length > 1) {
        const prices = rules.map(r => r.basePrice);
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        
        if ((maxPrice - minPrice) / minPrice > 0.5) { // Разница более 50%
          conflicts.push({
            id: `CONFLICT-GAP-${serviceId}`,
            type: 'gap',
            severity: 'low',
            description: `Большой разброс цен для услуги ${rules[0].serviceName}: от ₽${minPrice} до ₽${maxPrice}`,
            affectedRules: rules.map(r => r.id),
            suggestedFix: 'Проверьте обоснованность различий в ценах'
          });
        }
      }
    });
    
    return conflicts;
  };

  const simulatePrice = (params: any): PriceSimulation => {
    const service = mockServices.find(s => s.id === params.serviceId);
    if (!service) {
      return {
        serviceId: params.serviceId,
        serviceName: 'Услуга не найдена',
        duration: params.duration,
        groupSize: params.groupSize,
        date: params.date,
        channel: params.channel,
        segment: params.segment,
        basePrice: 0,
        appliedModifiers: [],
        finalPrice: 0,
        applicableOffers: []
      };
    }

    // Поиск применимого правила ценообразования
    const applicableRule = priceLists
      .flatMap(pl => pl.rules)
      .find(rule => 
        rule.serviceId === params.serviceId && 
        rule.isActive &&
        (!rule.minDuration || params.duration >= rule.minDuration) &&
        (!rule.maxDuration || params.duration <= rule.maxDuration) &&
        (!rule.minGroupSize || params.groupSize >= rule.minGroupSize) &&
        (!rule.maxGroupSize || params.groupSize <= rule.maxGroupSize)
      );

    if (!applicableRule) {
      return {
        serviceId: params.serviceId,
        serviceName: service.name,
        duration: params.duration,
        groupSize: params.groupSize,
        date: params.date,
        channel: params.channel,
        segment: params.segment,
        basePrice: 0,
        appliedModifiers: [],
        finalPrice: 0,
        applicableOffers: []
      };
    }

    let currentPrice = applicableRule.basePrice;
    const appliedModifiers: any[] = [];

    // Применение сезонного коэффициента
    if (applicableRule.seasonMultiplier && applicableRule.seasonMultiplier !== 1) {
      const seasonalAmount = currentPrice * (applicableRule.seasonMultiplier - 1);
      currentPrice *= applicableRule.seasonMultiplier;
      appliedModifiers.push({
        name: 'Сезонный коэффициент',
        multiplier: applicableRule.seasonMultiplier,
        amount: seasonalAmount
      });
    }

    // Применение коэффициента выходных
    const isWeekend = new Date(params.date).getDay() === 0 || new Date(params.date).getDay() === 6;
    if (isWeekend && applicableRule.weekendMultiplier && applicableRule.weekendMultiplier !== 1) {
      const weekendAmount = currentPrice * (applicableRule.weekendMultiplier - 1);
      currentPrice *= applicableRule.weekendMultiplier;
      appliedModifiers.push({
        name: 'Коэффициент выходных',
        multiplier: applicableRule.weekendMultiplier,
        amount: weekendAmount
      });
    }

    // Применение групповых скидок
    if (applicableRule.groupDiscountRules) {
      const applicableGroupDiscount = applicableRule.groupDiscountRules
        .filter(gdr => params.groupSize >= gdr.minSize)
        .sort((a, b) => b.discount - a.discount)[0]; // Максимальная скидка
      
      if (applicableGroupDiscount) {
        const discountAmount = currentPrice * applicableGroupDiscount.discount;
        currentPrice -= discountAmount;
        appliedModifiers.push({
          name: `Групповая скидка (${params.groupSize} чел.)`,
          multiplier: 1 - applicableGroupDiscount.discount,
          amount: -discountAmount
        });
      }
    }

    // Поиск применимых акций
    const applicableOffers = offers
      .filter(offer => 
        offer.status === 'active' &&
        offer.applicableServices.includes(params.serviceId) &&
        offer.applicableChannels.includes(params.channel) &&
        offer.applicableSegments.includes(params.segment) &&
        (!offer.minOrderAmount || currentPrice >= offer.minOrderAmount) &&
        new Date(offer.validFrom) <= new Date(params.date) &&
        new Date(offer.validTo) >= new Date(params.date)
      )
      .sort((a, b) => b.priority - a.priority)
      .map(offer => {
        let discountAmount = 0;
        
        if (offer.discountType === 'percentage') {
          discountAmount = currentPrice * (offer.discountValue / 100);
          if (offer.maxDiscountAmount) {
            discountAmount = Math.min(discountAmount, offer.maxDiscountAmount);
          }
        } else if (offer.discountType === 'fixed') {
          discountAmount = offer.discountValue;
        }
        
        return {
          offerId: offer.id,
          offerName: offer.name,
          discountAmount,
          finalPriceWithOffer: currentPrice - discountAmount
        };
      });

    return {
      serviceId: params.serviceId,
      serviceName: service.name,
      duration: params.duration,
      groupSize: params.groupSize,
      date: params.date,
      channel: params.channel,
      segment: params.segment,
      basePrice: applicableRule.basePrice,
      appliedModifiers,
      finalPrice: currentPrice,
      applicableOffers
    };
  };

  // Компоненты значков
  const PriceListStatusBadge = ({ status }: { status: PriceListStatus }) => {
    const config = priceListStatusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const OfferStatusBadge = ({ status }: { status: OfferStatus }) => {
    const config = offerStatusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const OfferTypeBadge = ({ type }: { type: OfferType }) => {
    const config = offerTypeConfig[type];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const ChannelBadge = ({ channel }: { channel: Channel }) => {
    const config = channelConfig[channel];
    const IconComponent = config.icon;
    
    return (
      <Badge variant="outline" className="text-xs">
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const SegmentBadge = ({ segment }: { segment: Segment }) => {
    const config = segmentConfig[segment];
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  // Обзорный экран
  const OverviewScreen = () => (
    <div className="space-y-6">
      {/* Активные акции */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            Активные акции
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {offers
              .filter(offer => offer.status === 'active')
              .slice(0, 4)
              .map((offer) => (
                <div 
                  key={offer.id}
                  className="p-4 rounded-lg border border-[#232428] bg-[#17181A] hover:bg-[#1F2024] transition-colors cursor-pointer"
                  onClick={() => {
                    setSelectedOffer(offer);
                    setShowOfferModal(true);
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-medium">{offer.name}</span>
                        <OfferTypeBadge type={offer.type} />
                        <OfferStatusBadge status={offer.status} />
                        {offer.combinableWithOthers && (
                          <Badge variant="outline" className="text-xs">
                            Комбинируется
                          </Badge>
                        )}
                      </div>
                      <div className="text-sm text-[#A6A7AA] mb-2">
                        {offer.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                        <div className="flex items-center gap-1">
                          <Tag className="w-3 h-3" />
                          {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₽${offer.discountValue}`}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {offer.usageCount} использований
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ₽{offer.revenue.toLocaleString('ru-RU')}
                        </div>
                        <div className="flex items-center gap-1">
                          <TrendingUp className="w-3 h-3" />
                          {offer.conversionRate}% конверсия
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={
                        new Date(offer.validTo) < new Date(Date.now() + 7*24*60*60*1000) 
                          ? 'bg-orange-500/10 text-orange-400' 
                          : 'bg-green-500/10 text-green-400'
                      }>
                        До {new Date(offer.validTo).toLocaleDateString('ru-RU')}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePauseOffer(offer.id);
                            }}
                            className="text-white hover:bg-[#17181A]"
                          >
                            <Pause className="w-4 h-4 mr-2" />
                            Приостановить
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCreatePromoCode(offer.id);
                            }}
                            className="text-white hover:bg-[#17181A]"
                          >
                            <Tag className="w-4 h-4 mr-2" />
                            Создать промокод
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Актуальные прайс-листы */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calculator className="w-5 h-5 text-blue-400" />
            Актуальные прайс-листы
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {priceLists
              .filter(pl => pl.status === 'published')
              .slice(0, 3)
              .map((priceList) => (
                <div key={priceList.id} className="p-4 rounded-lg border border-[#232428] bg-[#17181A]">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-white font-medium">{priceList.name}</span>
                        <PriceListStatusBadge status={priceList.status} />
                        <ChannelBadge channel={priceList.channel} />
                        <SegmentBadge segment={priceList.segment} />
                      </div>
                      <div className="text-sm text-[#A6A7AA] mb-2">
                        {priceList.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                        <div>Правил: {priceList.rules.length}</div>
                        <div>Валюта: {priceList.currency}</div>
                        <div>Версия: {priceList.version}</div>
                        <div>Действует до: {priceList.validTo ? new Date(priceList.validTo).toLocaleDateString('ru-RU') : '∞'}</div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white text-sm">
                        {priceList.bookingsCount || 0} бронирований
                      </div>
                      <div className="text-xs text-[#A6A7AA]">
                        ₽{((priceList.totalRevenue || 0) / 1000000).toFixed(1)}М выручка
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Популярные бандлы */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-purple-400" />
            Популярные пакеты
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {bundles
              .filter(bundle => bundle.isActive)
              .sort((a, b) => b.salesCount - a.salesCount)
              .slice(0, 3)
              .map((bundle) => (
                <div key={bundle.id} className="p-4 rounded-lg border border-[#232428] bg-[#17181A]">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-white font-medium">{bundle.name}</span>
                        <Badge className="bg-green-500/10 text-green-400">
                          -{bundle.discountPercentage.toFixed(1)}%
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {bundle.services.length} услуг
                        </Badge>
                      </div>
                      <div className="text-sm text-[#A6A7AA] mb-2">
                        {bundle.description}
                      </div>
                      <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                        <div className="flex items-center gap-1">
                          <ShoppingCart className="w-3 h-3" />
                          {bundle.salesCount} продаж
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          ₽{bundle.totalRevenue.toLocaleString('ru-RU')}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {bundle.validityPeriod} дней действия
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-white text-lg font-medium">
                        ₽{bundle.bundlePrice.toLocaleString('ru-RU')}
                      </div>
                      <div className="text-xs text-[#A6A7AA] line-through">
                        ₽{bundle.originalTotalPrice.toLocaleString('ru-RU')}
                      </div>
                      <div className="text-xs text-green-400">
                        Экономия ₽{bundle.savings.toLocaleString('ru-RU')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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
              <span className="text-sm">Новый прайс-лист</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <Gift className="w-5 h-5 mb-2" />
              <span className="text-sm">Создать акцию</span>
            </Button>
            <Button 
              variant="outline" 
              className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col"
              onClick={() => setShowSimulatorModal(true)}
            >
              <Calculator className="w-5 h-5 mb-2" />
              <span className="text-sm">Симулятор цен</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <BarChart3 className="w-5 h-5 mb-2" />
              <span className="text-sm">Аналитика</span>
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
            <span className="text-white">Pricing & Offers</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Ценообразование и акции</h1>
          <p className="text-[#A6A7AA]">
            Управление тарифами, акциями, промокодами и пакетами услуг • {filteredPriceLists.length} прайс-листов • {filteredOffers.length} акций
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-400">
            <Activity className="w-3 h-3 mr-1" />
            {offers.filter(o => o.status === 'active').length} активных акций
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Новый прайс-лист
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {pricingKpis.map((kpi, index) => {
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
            <TabsList className="grid w-full grid-cols-7 bg-[#17181A]">
              <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Layers className="w-4 h-4 mr-2" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="pricelists" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Calculator className="w-4 h-4 mr-2" />
                Прайс-листы
              </TabsTrigger>
              <TabsTrigger value="offers" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Gift className="w-4 h-4 mr-2" />
                Акции
              </TabsTrigger>
              <TabsTrigger value="promocodes" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Tag className="w-4 h-4 mr-2" />
                Промокоды
              </TabsTrigger>
              <TabsTrigger value="bundles" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Package className="w-4 h-4 mr-2" />
                Пакеты
              </TabsTrigger>
              <TabsTrigger value="simulator" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Zap className="w-4 h-4 mr-2" />
                Симулятор
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-[#A6A7AA] data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewScreen />
            </TabsContent>

            <TabsContent value="pricelists" className="mt-6">
              <div className="space-y-4">
                {/* Фильтры */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск прайс-листов..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#17181A] border-[#232428]"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
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
                  <Select value={channelFilter} onValueChange={setChannelFilter}>
                    <SelectTrigger className="w-48 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Канал" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все каналы</SelectItem>
                      <SelectItem value="website">Сайт</SelectItem>
                      <SelectItem value="mobile_app">Мобильное приложение</SelectItem>
                      <SelectItem value="call_center">Call-центр</SelectItem>
                      <SelectItem value="partner">Партнеры</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Список прайс-листов */}
                <div className="grid gap-4">
                  {filteredPriceLists.map((priceList) => (
                    <Card key={priceList.id} className="bg-[#121214] border-[#232428] hover:border-[#91040C]/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-medium text-white">{priceList.name}</h3>
                              <PriceListStatusBadge status={priceList.status} />
                              <ChannelBadge channel={priceList.channel} />
                              <SegmentBadge segment={priceList.segment} />
                              <Badge variant="outline" className="text-xs">
                                v{priceList.version}
                              </Badge>
                            </div>
                            
                            <div className="text-sm text-[#A6A7AA] mb-3">
                              {priceList.description}
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Правил ценообразования</Label>
                                <div className="text-white text-sm">{priceList.rules.length}</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Сезон</Label>
                                <div className="text-white text-sm capitalize">{priceList.season}</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Валюта</Label>
                                <div className="text-white text-sm">{priceList.currency}</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Действует до</Label>
                                <div className="text-white text-sm">
                                  {priceList.validTo ? new Date(priceList.validTo).toLocaleDateString('ru-RU') : '∞'}
                                </div>
                              </div>
                            </div>
                            
                            {priceList.bookingsCount && (
                              <div className="flex items-center gap-4 mb-3">
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Бронирований</Label>
                                  <div className="text-white text-sm">{priceList.bookingsCount}</div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Выручка</Label>
                                  <div className="text-white text-sm">
                                    ₽{((priceList.totalRevenue || 0) / 1000000).toFixed(1)}М
                                  </div>
                                </div>
                                <div>
                                  <Label className="text-[#A6A7AA] text-xs">Средний чек</Label>
                                  <div className="text-white text-sm">
                                    ₽{(priceList.avgOrderValue || 0).toLocaleString('ru-RU')}
                                  </div>
                                </div>
                              </div>
                            )}
                            
                            <div className="text-sm text-[#A6A7AA]">
                              Создан: {new Date(priceList.createdAt).toLocaleDateString('ru-RU')} • 
                              Автор: {priceList.createdBy}
                              {priceList.publishedAt && (
                                <> • Опубликован: {new Date(priceList.publishedAt).toLocaleDateString('ru-RU')}</>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2 ml-4">
                            {priceList.status === 'draft' && (
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handlePublishPriceList(priceList.id)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Опубликовать
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                                <DropdownMenuItem 
                                  onClick={() => {
                                    setSelectedPriceList(priceList);
                                    setShowPriceListModal(true);
                                  }}
                                  className="text-white hover:bg-[#17181A]"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Просмотр
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                  <Copy className="w-4 h-4 mr-2" />
                                  Создать версию
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                  <Download className="w-4 h-4 mr-2" />
                                  Экспорт
                                </DropdownMenuItem>
                                {priceList.status === 'published' && (
                                  <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                    <RotateCcw className="w-4 h-4 mr-2" />
                                    Откатить версию
                                  </DropdownMenuItem>
                                )}
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="offers" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Управление акциями</h3>
                
                <div className="grid gap-4">
                  {filteredOffers.map((offer) => (
                    <Card key={offer.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white font-medium">{offer.name}</h4>
                              <OfferStatusBadge status={offer.status} />
                              <OfferTypeBadge type={offer.type} />
                              {offer.combinableWithOthers && (
                                <Badge variant="outline" className="text-xs">
                                  Комбинируется
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-[#A6A7AA] mb-2">
                              {offer.description}
                            </p>
                            <div className="flex items-center gap-4 mb-2 text-xs text-[#A6A7AA]">
                              <div className="flex items-center gap-1">
                                <Tag className="w-3 h-3" />
                                {offer.discountType === 'percentage' ? `${offer.discountValue}%` : `₽${offer.discountValue}`}
                              </div>
                              <div className="flex items-center gap-1">
                                <Users className="w-3 h-3" />
                                {offer.usageCount} использований
                              </div>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-3 h-3" />
                                ₽{offer.revenue.toLocaleString('ru-RU')}
                              </div>
                              {offer.conversionRate && (
                                <div className="flex items-center gap-1">
                                  <TrendingUp className="w-3 h-3" />
                                  {offer.conversionRate}% конверсия
                                </div>
                              )}
                            </div>
                            <div className="text-xs text-[#A6A7AA]">
                              {new Date(offer.validFrom).toLocaleDateString('ru-RU')} — {new Date(offer.validTo).toLocaleDateString('ru-RU')} • 
                              Приоритет: {offer.priority}
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            {offer.status === 'planned' && (
                              <Button 
                                size="sm"
                                className="bg-green-600 hover:bg-green-700"
                                onClick={() => handleActivateOffer(offer.id)}
                              >
                                <Play className="w-4 h-4 mr-1" />
                                Активировать
                              </Button>
                            )}
                            {offer.status === 'active' && (
                              <Button 
                                size="sm"
                                variant="outline"
                                onClick={() => handlePauseOffer(offer.id)}
                              >
                                <Pause className="w-4 h-4 mr-1" />
                                Пауза
                              </Button>
                            )}
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedOffer(offer);
                                setShowOfferModal(true);
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="promocodes" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Промокоды</h3>
                
                <div className="grid gap-4">
                  {promoCodes.map((promoCode) => {
                    const offer = offers.find(o => o.id === promoCode.offerId);
                    const usagePercent = promoCode.maxUses ? (promoCode.usedCount / promoCode.maxUses) * 100 : 0;
                    
                    return (
                      <Card key={promoCode.id} className="bg-[#121214] border-[#232428]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="text-white font-mono text-lg">{promoCode.code}</span>
                                <Badge className={promoCode.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}>
                                  {promoCode.isActive ? 'Активен' : 'Неактивен'}
                                </Badge>
                                {promoCode.oneTimeUse && (
                                  <Badge variant="outline" className="text-xs">
                                    Одноразовый
                                  </Badge>
                                )}
                                {promoCode.assignedUserIds && (
                                  <Badge className="bg-purple-500/10 text-purple-400">
                                    Персональный
                                  </Badge>
                                )}
                              </div>
                              
                              <div className="text-sm text-[#A6A7AA] mb-2">
                                Акция: {offer?.name || 'Неизвестная акция'}
                              </div>
                              
                              <div className="flex items-center gap-4 mb-2">
                                <div className="text-xs text-[#A6A7AA]">
                                  Использований: {promoCode.usedCount}
                                  {promoCode.maxUses && ` / ${promoCode.maxUses}`}
                                </div>
                                {promoCode.maxUses && (
                                  <div className="flex items-center gap-2">
                                    <Progress value={usagePercent} className="w-24 h-2" />
                                    <span className="text-xs text-[#A6A7AA]">{usagePercent.toFixed(0)}%</span>
                                  </div>
                                )}
                              </div>
                              
                              <div className="text-xs text-[#A6A7AA]">
                                Создан: {new Date(promoCode.createdAt).toLocaleDateString('ru-RU')}
                                {promoCode.lastUsedAt && (
                                  <> • Последнее использование: {new Date(promoCode.lastUsedAt).toLocaleDateString('ru-RU')}</>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => {
                                  navigator.clipboard.writeText(promoCode.code);
                                  toast.success('Промокод скопирован');
                                }}
                              >
                                <Copy className="w-4 h-4 mr-1" />
                                Копировать
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                                  <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                    <Edit3 className="w-4 h-4 mr-2" />
                                    Редактировать
                                  </DropdownMenuItem>
                                  <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                    <Ban className="w-4 h-4 mr-2" />
                                    {promoCode.isActive ? 'Деактивировать' : 'Активировать'}
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

            <TabsContent value="bundles" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Пакеты услуг</h3>
                
                <div className="grid gap-4">
                  {bundles.map((bundle) => (
                    <Card key={bundle.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white font-medium text-lg">{bundle.name}</h4>
                              <Badge className={bundle.isActive ? 'bg-green-500/10 text-green-400' : 'bg-gray-500/10 text-gray-400'}>
                                {bundle.isActive ? 'Активен' : 'Неактивен'}
                              </Badge>
                              <Badge className="bg-purple-500/10 text-purple-400">
                                -{bundle.discountPercentage.toFixed(1)}%
                              </Badge>
                            </div>
                            
                            <p className="text-sm text-[#A6A7AA] mb-3">
                              {bundle.description}
                            </p>
                            
                            <div className="mb-4">
                              <Label className="text-[#A6A7AA] text-xs mb-2 block">Состав пакета:</Label>
                              <div className="space-y-2">
                                {bundle.services.map((service, index) => (
                                  <div key={index} className="flex items-center justify-between text-sm">
                                    <span className="text-white">{service.serviceName}</span>
                                    <div className="text-[#A6A7AA]">
                                      {service.quantity}x ₽{service.originalPrice.toLocaleString('ru-RU')}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Продаж</Label>
                                <div className="text-white text-sm">{bundle.salesCount}</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Выручка</Label>
                                <div className="text-white text-sm">
                                  ₽{bundle.totalRevenue.toLocaleString('ru-RU')}
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Срок действия</Label>
                                <div className="text-white text-sm">{bundle.validityPeriod} дней</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Передача</Label>
                                <div className="text-white text-sm">
                                  {bundle.transferable ? 'Разрешена' : 'Запрещена'}
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-[#A6A7AA]">
                              Действует: {new Date(bundle.validFrom).toLocaleDateString('ru-RU')} — {new Date(bundle.validTo).toLocaleDateString('ru-RU')}
                            </div>
                          </div>
                          
                          <div className="text-right ml-4">
                            <div className="text-2xl font-medium text-white">
                              ₽{bundle.bundlePrice.toLocaleString('ru-RU')}
                            </div>
                            <div className="text-sm text-[#A6A7AA] line-through">
                              ₽{bundle.originalTotalPrice.toLocaleString('ru-RU')}
                            </div>
                            <div className="text-sm text-green-400">
                              Экономия ₽{bundle.savings.toLocaleString('ru-RU')}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="simulator" className="mt-6">
              <div className="text-center py-12">
                <Calculator className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Симулятор ценообразования</h3>
                <p className="text-[#A6A7AA] mb-4">
                  Протестируйте правила ценообразования и посмотрите, как применяются акции
                </p>
                <Button 
                  className="bg-[#91040C] hover:bg-[#91040C]/90"
                  onClick={() => setShowSimulatorModal(true)}
                >
                  <Zap className="w-4 h-4 mr-2" />
                  Открыть симулятор
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Аналитика ценообразования</h3>
                <p className="text-[#A6A7AA]">
                  Детальная статистика по конверсии, марже и эффективности акций
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Модальное окно симулятора */}
      {showSimulatorModal && (
        <Dialog open={showSimulatorModal} onOpenChange={setShowSimulatorModal}>
          <DialogContent className="max-w-4xl bg-[#121214] border-[#232428] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">Симулятор ценообразования</DialogTitle>
              <DialogDescription className="text-[#A6A7AA]">
                Введите параметры заказа для расчета итоговой стоимости
              </DialogDescription>
            </DialogHeader>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              {/* Параметры */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Параметры заказа</h4>
                
                <div>
                  <Label className="text-[#A6A7AA]">Услуга</Label>
                  <Select 
                    value={simulatorParams.serviceId} 
                    onValueChange={(value) => setSimulatorParams(prev => ({ ...prev, serviceId: value }))}
                  >
                    <SelectTrigger className="bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Выберите услугу" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      {mockServices.map(service => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#A6A7AA]">Продолжительность (ч)</Label>
                    <Input
                      type="number"
                      value={simulatorParams.duration}
                      onChange={(e) => setSimulatorParams(prev => ({ ...prev, duration: Number(e.target.value) }))}
                      className="bg-[#17181A] border-[#232428]"
                    />
                  </div>
                  <div>
                    <Label className="text-[#A6A7AA]">Размер группы</Label>
                    <Input
                      type="number"
                      value={simulatorParams.groupSize}
                      onChange={(e) => setSimulatorParams(prev => ({ ...prev, groupSize: Number(e.target.value) }))}
                      className="bg-[#17181A] border-[#232428]"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-[#A6A7AA]">Дата</Label>
                  <Input
                    type="date"
                    value={simulatorParams.date}
                    onChange={(e) => setSimulatorParams(prev => ({ ...prev, date: e.target.value }))}
                    className="bg-[#17181A] border-[#232428]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label className="text-[#A6A7AA]">Канал</Label>
                    <Select 
                      value={simulatorParams.channel} 
                      onValueChange={(value: Channel) => setSimulatorParams(prev => ({ ...prev, channel: value }))}
                    >
                      <SelectTrigger className="bg-[#17181A] border-[#232428]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121214] border-[#232428]">
                        <SelectItem value="website">Сайт</SelectItem>
                        <SelectItem value="mobile_app">Мобильное приложение</SelectItem>
                        <SelectItem value="call_center">Call-центр</SelectItem>
                        <SelectItem value="partner">Партнеры</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-[#A6A7AA]">Сегмент</Label>
                    <Select 
                      value={simulatorParams.segment} 
                      onValueChange={(value: Segment) => setSimulatorParams(prev => ({ ...prev, segment: value }))}
                    >
                      <SelectTrigger className="bg-[#17181A] border-[#232428]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-[#121214] border-[#232428]">
                        <SelectItem value="standard">Стандарт</SelectItem>
                        <SelectItem value="premium">Премиум</SelectItem>
                        <SelectItem value="vip">VIP</SelectItem>
                        <SelectItem value="budget">Бюджет</SelectItem>
                        <SelectItem value="first_time">Новый клиент</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Результат */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-white">Результат расчета</h4>
                
                {simulatorParams.serviceId && (() => {
                  const simulation = simulatePrice(simulatorParams);
                  
                  return (
                    <div className="space-y-4">
                      <Card className="bg-[#17181A] border-[#232428]">
                        <CardContent className="p-4">
                          <h5 className="text-white font-medium mb-2">{simulation.serviceName}</h5>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-[#A6A7AA]">Базовая цена:</span>
                              <span className="text-white">₽{simulation.basePrice.toLocaleString('ru-RU')}</span>
                            </div>
                            
                            {simulation.appliedModifiers.map((modifier, index) => (
                              <div key={index} className="flex justify-between text-sm">
                                <span className="text-[#A6A7AA]">{modifier.name}:</span>
                                <span className={modifier.amount > 0 ? 'text-red-400' : 'text-green-400'}>
                                  {modifier.amount > 0 ? '+' : ''}₽{modifier.amount.toLocaleString('ru-RU')}
                                </span>
                              </div>
                            ))}
                            
                            <Separator className="bg-[#232428]" />
                            <div className="flex justify-between font-medium">
                              <span className="text-white">Итого:</span>
                              <span className="text-white text-lg">₽{simulation.finalPrice.toLocaleString('ru-RU')}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>

                      {simulation.applicableOffers.length > 0 && (
                        <Card className="bg-[#17181A] border-[#232428]">
                          <CardContent className="p-4">
                            <h5 className="text-white font-medium mb-2">Применимые акции</h5>
                            <div className="space-y-2">
                              {simulation.applicableOffers.map((offer, index) => (
                                <div key={index} className="flex justify-between text-sm">
                                  <span className="text-[#A6A7AA]">{offer.offerName}:</span>
                                  <div className="text-right">
                                    <div className="text-green-400">
                                      -₽{offer.discountAmount.toLocaleString('ru-RU')}
                                    </div>
                                    <div className="text-white">
                                      = ₽{offer.finalPriceWithOffer.toLocaleString('ru-RU')}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  );
                })()}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default GTSPricingOffersModule;