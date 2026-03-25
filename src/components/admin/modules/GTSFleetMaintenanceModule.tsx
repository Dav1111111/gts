// 🚗 GTS Fleet & Maintenance Module - Полная реализация согласно спецификации v2025-09-17
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
  Truck, Wrench, Clock, DollarSign, Calendar, AlertTriangle, 
  Star, Target, ArrowUpRight, Activity, CheckCircle, Bell,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  Timer, Navigation, MessageSquare, Phone, Settings,
  
  // Fleet specific
  Car, Zap, Fuel, Gauge, Shield, FileText, Camera,
  MapPin, Package, Users, CreditCard, BarChart3,
  
  // Maintenance specific
  Tool, Cog, AlertOctagon, Calendar as CalendarIcon,
  ClipboardList, HardHat, Battery, Thermometer,
  
  // Navigation
  ArrowLeft, ArrowRight, Home, Layers
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type AssetType = 'buggy' | 'atv' | 'boat' | 'helicopter' | 'car' | 'yacht' | 'snowmobile' | 'jetski';
type AssetStatus = 'available' | 'reserved' | 'in_service' | 'maintenance' | 'damaged' | 'offline';
type WorkOrderStatus = 'open' | 'in_progress' | 'waiting_parts' | 'done' | 'archived';
type WorkOrderType = 'preventive' | 'corrective' | 'emergency' | 'inspection' | 'upgrade';
type DamageType = 'mechanical' | 'electrical' | 'structural' | 'cosmetic' | 'accident';
type DamageSeverity = 'minor' | 'moderate' | 'major' | 'critical';
type MaintenanceInterval = 'hours' | 'kilometers' | 'days' | 'months';

interface Asset {
  id: string;
  type: AssetType;
  model: string;
  manufacturer: string;
  year: number;
  vin?: string;
  regNumber: string;
  status: AssetStatus;
  location: string;
  acquiredAt: string;
  purchasePrice: number;
  currentValue: number;
  
  // Meters
  engineHours: number;
  odometer: number; // км
  lastServiceAt: string;
  nextServiceDue: {
    hours?: number;
    kilometers?: number;
    date?: string;
  };
  
  // Specifications
  specs: {
    maxSpeed: number;
    fuelCapacity: number;
    passengers: number;
    cargoCapacity?: number;
    engineType: string;
    transmission: string;
  };
  
  // Documentation
  docs: {
    registration?: string;
    insurance?: string;
    techPassport?: string;
    photos: string[];
  };
  
  // Current status
  assignedTo?: string; // crew/route ID
  currentTrip?: string;
  lastInspection?: string;
  fuelLevel: number; // percentage
  batteryLevel?: number; // percentage
  
  // Maintenance metrics
  totalDowntime: number; // hours
  mtbfHours: number; // Mean Time Between Failures
  totalMaintenanceCost: number;
  avgCostPerHour: number;
  damageHistory: string[]; // damage IDs
  
  createdAt: string;
  updatedAt: string;
}

interface WorkOrder {
  id: string;
  assetId: string;
  type: WorkOrderType;
  title: string;
  description: string;
  status: WorkOrderStatus;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  
  // Scheduling
  scheduledDate: string;
  startedAt?: string;
  completedAt?: string;
  estimatedHours: number;
  actualHours?: number;
  
  // Resources
  assignedTechnician?: string;
  parts: PartUsage[];
  laborCost: number;
  partsCost: number;
  totalCost: number;
  
  // Details
  instructions?: string;
  notes?: string;
  photos: string[];
  completionNotes?: string;
  
  // Follow-up
  nextService?: {
    type: WorkOrderType;
    dueAt: string;
    interval: number;
    unit: MaintenanceInterval;
  };
  
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

interface PartUsage {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  unitCost: number;
  totalCost: number;
  supplier?: string;
  warrantyMonths?: number;
  installedAt?: string;
}

interface Damage {
  id: string;
  assetId: string;
  workOrderId?: string;
  type: DamageType;
  severity: DamageSeverity;
  description: string;
  location: string; // on vehicle
  
  // Incident details
  reportedAt: string;
  reportedBy: string;
  discoveredDuring?: string; // route, inspection, etc.
  cause?: string;
  
  // Assessment
  repairEstimate?: number;
  insuranceClaim?: {
    claimNumber: string;
    status: 'pending' | 'approved' | 'denied' | 'paid';
    amount: number;
    deductible: number;
  };
  
  // Resolution
  resolvedAt?: string;
  repairCost?: number;
  partsCost?: number;
  laborCost?: number;
  
  photos: string[];
  documents: string[];
  notes?: string;
  
  // Impact
  downtimeHours: number;
  preventsFuture?: boolean;
}

interface MaintenancePlan {
  id: string;
  assetType: AssetType;
  manufacturer?: string;
  model?: string;
  name: string;
  description: string;
  
  schedules: MaintenanceSchedule[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

interface MaintenanceSchedule {
  id: string;
  type: WorkOrderType;
  title: string;
  description: string;
  interval: number;
  unit: MaintenanceInterval;
  estimatedHours: number;
  estimatedCost: number;
  
  // Tasks
  tasks: MaintenanceTask[];
  parts: string[]; // part numbers
  tools: string[];
  skills: string[];
}

interface MaintenanceTask {
  id: string;
  title: string;
  description: string;
  estimatedMinutes: number;
  required: boolean;
  category: string;
}

// 🎯 МОК ДАННЫЕ

const mockAssets: Asset[] = [
  {
    id: 'A-101',
    type: 'buggy',
    model: 'Honda Talon 1000R',
    manufacturer: 'Honda',
    year: 2023,
    vin: '1HFSC1070PA000001',
    regNumber: 'В123АА23',
    status: 'available',
    location: 'База Красная Поляна',
    acquiredAt: '2023-04-15T10:00:00Z',
    purchasePrice: 2500000,
    currentValue: 2100000,
    
    engineHours: 485,
    odometer: 12450,
    lastServiceAt: '2025-08-15T09:00:00Z',
    nextServiceDue: {
      hours: 500,
      kilometers: 15000,
      date: '2025-10-15T09:00:00Z'
    },
    
    specs: {
      maxSpeed: 120,
      fuelCapacity: 45,
      passengers: 2,
      cargoCapacity: 150,
      engineType: 'V-Twin 999cc',
      transmission: 'Automatic CVT'
    },
    
    docs: {
      registration: 'REG-2023-001',
      insurance: 'INS-2023-001',
      techPassport: 'TECH-2023-001',
      photos: [
        'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop',
        'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop'
      ]
    },
    
    fuelLevel: 85,
    batteryLevel: 98,
    
    totalDowntime: 24,
    mtbfHours: 120,
    totalMaintenanceCost: 85000,
    avgCostPerHour: 175,
    damageHistory: ['D-001'],
    
    createdAt: '2023-04-15T10:00:00Z',
    updatedAt: '2025-09-16T14:30:00Z'
  },
  {
    id: 'A-102',
    type: 'helicopter',
    model: 'Robinson R66',
    manufacturer: 'Robinson',
    year: 2022,
    vin: 'R66-2022-001',
    regNumber: 'RA-07485',
    status: 'maintenance',
    location: 'Сочи Аэропорт',
    acquiredAt: '2022-06-01T10:00:00Z',
    purchasePrice: 45000000,
    currentValue: 42000000,
    
    engineHours: 890,
    odometer: 45200,
    lastServiceAt: '2025-09-01T08:00:00Z',
    nextServiceDue: {
      hours: 1000,
      date: '2025-10-01T08:00:00Z'
    },
    
    specs: {
      maxSpeed: 240,
      fuelCapacity: 300,
      passengers: 4,
      engineType: 'Rolls-Royce RR300',
      transmission: 'Direct Drive'
    },
    
    docs: {
      registration: 'REG-HELI-2022-001',
      insurance: 'INS-HELI-2022-001',
      photos: [
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=400&h=300&fit=crop'
      ]
    },
    
    assignedTo: 'WO-001',
    fuelLevel: 75,
    
    totalDowntime: 48,
    mtbfHours: 150,
    totalMaintenanceCost: 450000,
    avgCostPerHour: 505,
    damageHistory: [],
    
    createdAt: '2022-06-01T10:00:00Z',
    updatedAt: '2025-09-17T09:00:00Z'
  },
  {
    id: 'A-103',
    type: 'yacht',
    model: 'Azimut 68',
    manufacturer: 'Azimut',
    year: 2021,
    regNumber: 'СЧ-1234',
    status: 'in_service',
    location: 'Морской порт Сочи',
    acquiredAt: '2021-03-20T12:00:00Z',
    purchasePrice: 85000000,
    currentValue: 75000000,
    
    engineHours: 1250,
    odometer: 8500,
    lastServiceAt: '2025-07-10T10:00:00Z',
    nextServiceDue: {
      hours: 1500,
      date: '2025-11-10T10:00:00Z'
    },
    
    specs: {
      maxSpeed: 65,
      fuelCapacity: 3800,
      passengers: 12,
      engineType: 'Twin Caterpillar C18',
      transmission: 'ZF Marine'
    },
    
    docs: {
      registration: 'REG-YACHT-2021-001',
      insurance: 'INS-YACHT-2021-001',
      photos: [
        'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400&h=300&fit=crop'
      ]
    },
    
    currentTrip: 'TRIP-2025-089',
    fuelLevel: 60,
    
    totalDowntime: 72,
    mtbfHours: 200,
    totalMaintenanceCost: 950000,
    avgCostPerHour: 760,
    damageHistory: ['D-002'],
    
    createdAt: '2021-03-20T12:00:00Z',
    updatedAt: '2025-09-17T11:30:00Z'
  },
  {
    id: 'A-104',
    type: 'atv',
    model: 'CF Moto X8',
    manufacturer: 'CF Moto',
    year: 2024,
    regNumber: 'В456АА23',
    status: 'damaged',
    location: 'Сервисный центр',
    acquiredAt: '2024-02-10T11:00:00Z',
    purchasePrice: 850000,
    currentValue: 800000,
    
    engineHours: 120,
    odometer: 2800,
    lastServiceAt: '2025-06-01T09:00:00Z',
    nextServiceDue: {
      hours: 250,
      kilometers: 5000
    },
    
    specs: {
      maxSpeed: 90,
      fuelCapacity: 22,
      passengers: 2,
      engineType: '800cc V-Twin',
      transmission: 'CVT Automatic'
    },
    
    docs: {
      registration: 'REG-ATV-2024-001',
      insurance: 'INS-ATV-2024-001',
      photos: []
    },
    
    fuelLevel: 40,
    
    totalDowntime: 96,
    mtbfHours: 80,
    totalMaintenanceCost: 45000,
    avgCostPerHour: 375,
    damageHistory: ['D-003', 'D-004'],
    
    createdAt: '2024-02-10T11:00:00Z',
    updatedAt: '2025-09-17T08:15:00Z'
  }
];

const mockWorkOrders: WorkOrder[] = [
  {
    id: 'WO-001',
    assetId: 'A-102',
    type: 'preventive',
    title: '100-часовое ТО вертолета',
    description: 'Плановое техническое обслуживание согласно регламенту производителя',
    status: 'in_progress',
    priority: 'medium',
    
    scheduledDate: '2025-09-17T08:00:00Z',
    startedAt: '2025-09-17T08:30:00Z',
    estimatedHours: 8,
    actualHours: 5.5,
    
    assignedTechnician: 'TECH-001',
    parts: [
      {
        id: 'P-001',
        partNumber: 'RR300-FILTER-001',
        description: 'Масляный фильтр двигателя',
        quantity: 2,
        unitCost: 15000,
        totalCost: 30000,
        supplier: 'Rolls-Royce',
        warrantyMonths: 12
      },
      {
        id: 'P-002',
        partNumber: 'RR300-OIL-001',
        description: 'Масло авиационное 20л',
        quantity: 1,
        unitCost: 25000,
        totalCost: 25000,
        supplier: 'Shell'
      }
    ],
    laborCost: 40000,
    partsCost: 55000,
    totalCost: 95000,
    
    instructions: 'Следовать процедуре согласно Service Manual RR300-SM-001',
    notes: 'Проверить состояние лопастей особенно тщательно',
    photos: [],
    
    nextService: {
      type: 'preventive',
      dueAt: '2025-12-17T08:00:00Z',
      interval: 100,
      unit: 'hours'
    },
    
    createdBy: 'user:tech-lead',
    createdAt: '2025-09-15T14:00:00Z',
    updatedAt: '2025-09-17T11:00:00Z'
  },
  {
    id: 'WO-002',
    assetId: 'A-104',
    type: 'corrective',
    title: 'Ремонт повреждения передней подвески',
    description: 'Замена поврежденных амортизаторов после инцидента',
    status: 'waiting_parts',
    priority: 'high',
    
    scheduledDate: '2025-09-16T10:00:00Z',
    startedAt: '2025-09-16T10:30:00Z',
    estimatedHours: 6,
    actualHours: 3,
    
    assignedTechnician: 'TECH-002',
    parts: [
      {
        id: 'P-003',
        partNumber: 'CFM-X8-SHOCK-001',
        description: 'Амортизатор передний левый',
        quantity: 1,
        unitCost: 12000,
        totalCost: 12000,
        supplier: 'CF Moto'
      },
      {
        id: 'P-004',
        partNumber: 'CFM-X8-SHOCK-002',
        description: 'Амортизатор передний правый',
        quantity: 1,
        unitCost: 12000,
        totalCost: 12000,
        supplier: 'CF Moto'
      }
    ],
    laborCost: 15000,
    partsCost: 24000,
    totalCost: 39000,
    
    notes: 'Запчасти заказаны, ожидается поставка в течение 3-5 дней',
    photos: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
    ],
    
    createdBy: 'user:supervisor',
    createdAt: '2025-09-16T09:00:00Z',
    updatedAt: '2025-09-17T09:00:00Z'
  },
  {
    id: 'WO-003',
    assetId: 'A-101',
    type: 'inspection',
    title: 'Предсезонная инспекция',
    description: 'Комплексная проверка готовности к сезону',
    status: 'done',
    priority: 'medium',
    
    scheduledDate: '2025-09-10T09:00:00Z',
    startedAt: '2025-09-10T09:15:00Z',
    completedAt: '2025-09-10T11:30:00Z',
    estimatedHours: 2,
    actualHours: 2.25,
    
    assignedTechnician: 'TECH-003',
    parts: [],
    laborCost: 5000,
    partsCost: 0,
    totalCost: 5000,
    
    completionNotes: 'Все системы в отличном состоянии. Рекомендуется замена тормозных колодок через 50 моточасов.',
    photos: [],
    
    nextService: {
      type: 'preventive',
      dueAt: '2025-10-15T09:00:00Z',
      interval: 50,
      unit: 'hours'
    },
    
    createdBy: 'user:maintenance-mgr',
    createdAt: '2025-09-09T16:00:00Z',
    updatedAt: '2025-09-10T11:30:00Z'
  }
];

const mockDamages: Damage[] = [
  {
    id: 'D-001',
    assetId: 'A-101',
    workOrderId: 'WO-004',
    type: 'cosmetic',
    severity: 'minor',
    description: 'Царапина на левом крыле',
    location: 'Левое переднее крыло',
    
    reportedAt: '2025-08-20T14:30:00Z',
    reportedBy: 'GUIDE-001',
    discoveredDuring: 'Послерейсовый осмотр',
    cause: 'Контакт с веткой дерева',
    
    repairEstimate: 8000,
    
    resolvedAt: '2025-08-22T16:00:00Z',
    repairCost: 7500,
    partsCost: 2000,
    laborCost: 5500,
    
    photos: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=400&h=300&fit=crop'
    ],
    documents: [],
    notes: 'Повреждение поверхностное, структурная целостность не нарушена',
    
    downtimeHours: 4,
    preventsFuture: false
  },
  {
    id: 'D-002',
    assetId: 'A-103',
    type: 'mechanical',
    severity: 'moderate',
    description: 'Утечка гидравлической жидкости',
    location: 'Гидравлическая система рулевого управления',
    
    reportedAt: '2025-09-05T11:15:00Z',
    reportedBy: 'CAPTAIN-001',
    discoveredDuring: 'Предрейсовый осмотр',
    cause: 'Износ уплотнения',
    
    repairEstimate: 35000,
    insuranceClaim: {
      claimNumber: 'INS-2025-089',
      status: 'approved',
      amount: 30000,
      deductible: 5000
    },
    
    resolvedAt: '2025-09-08T17:00:00Z',
    repairCost: 32000,
    partsCost: 18000,
    laborCost: 14000,
    
    photos: [
      'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop'
    ],
    documents: ['INS-CLAIM-2025-089.pdf'],
    notes: 'Замена уплотнения и промывка системы выполнена',
    
    downtimeHours: 18,
    preventsFuture: true
  },
  {
    id: 'D-003',
    assetId: 'A-104',
    type: 'structural',
    severity: 'major',
    description: 'Деформация рамы после падения',
    location: 'Передняя часть рамы',
    
    reportedAt: '2025-09-12T16:45:00Z',
    reportedBy: 'GUIDE-002',
    discoveredDuring: 'Инцидент на маршруте',
    cause: 'Опрокидывание на склоне',
    
    repairEstimate: 75000,
    insuranceClaim: {
      claimNumber: 'INS-2025-092',
      status: 'pending',
      amount: 70000,
      deductible: 10000
    },
    
    photos: [
      'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop'
    ],
    documents: ['INCIDENT-REPORT-2025-092.pdf'],
    notes: 'Требуется оценка возможности восстановления vs списание',
    
    downtimeHours: 120,
    preventsFuture: true
  }
];

// 🎯 KPI КОНФИГУРАЦИЯ

interface FleetKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  description: string;
  icon: React.ComponentType<any>;
}

const fleetKpis: FleetKPI[] = [
  {
    title: "Fleet Uptime",
    value: "94.2%",
    change: "+2.1%",
    trend: "up",
    target: "95%",
    description: "Процент времени готовности техники к работе",
    icon: Activity
  },
  {
    title: "MTBF",
    value: "156 ч",
    change: "+12 ч",
    trend: "up",
    target: "150 ч",
    description: "Среднее время между поломками",
    icon: Timer
  },
  {
    title: "Стоимость км/час",
    value: "₽385",
    change: "-₽25",
    trend: "up",
    target: "< ₽400",
    description: "Средняя стоимость эксплуатации",
    icon: DollarSign
  },
  {
    title: "Активных нарядов",
    value: "8",
    change: "+2",
    trend: "neutral",
    target: "< 10",
    description: "Количество открытых work orders",
    icon: ClipboardList
  }
];

// 🎯 КОНФИГУРАЦИЯ СТАТУСОВ

const assetStatusConfig = {
  'available': { label: 'Доступна', color: 'bg-green-500/10 text-green-400', icon: CheckCircle },
  'reserved': { label: 'Зарезервирована', color: 'bg-blue-500/10 text-blue-400', icon: Clock },
  'in_service': { label: 'На маршруте', color: 'bg-purple-500/10 text-purple-400', icon: Play },
  'maintenance': { label: 'ТО', color: 'bg-orange-500/10 text-orange-400', icon: Wrench },
  'damaged': { label: 'Повреждена', color: 'bg-red-500/10 text-red-400', icon: AlertTriangle },
  'offline': { label: 'Вне эксплуатации', color: 'bg-gray-500/10 text-gray-400', icon: XCircle }
};

const workOrderStatusConfig = {
  'open': { label: 'Открыт', color: 'bg-blue-500/10 text-blue-400', icon: FileText },
  'in_progress': { label: 'Выполняется', color: 'bg-orange-500/10 text-orange-400', icon: Cog },
  'waiting_parts': { label: 'Ожидание запчастей', color: 'bg-yellow-500/10 text-yellow-400', icon: Package },
  'done': { label: 'Выполнен', color: 'bg-green-500/10 text-green-400', icon: CheckCircle2 },
  'archived': { label: 'Архивирован', color: 'bg-gray-500/10 text-gray-400', icon: XCircle }
};

const assetTypeConfig = {
  'buggy': { label: 'Багги', icon: Car },
  'atv': { label: 'Квадроцикл', icon: Car },
  'boat': { label: 'Катер', icon: Navigation },
  'helicopter': { label: 'Вертолет', icon: Zap },
  'car': { label: 'Автомобиль', icon: Car },
  'yacht': { label: 'Яхта', icon: Navigation },
  'snowmobile': { label: 'Снегоход', icon: Car },
  'jetski': { label: 'Гидроцикл', icon: Navigation }
};

const damageTypeConfig = {
  'mechanical': { label: 'Механическое', color: 'bg-orange-500/10 text-orange-400' },
  'electrical': { label: 'Электрическое', color: 'bg-yellow-500/10 text-yellow-400' },
  'structural': { label: 'Структурное', color: 'bg-red-500/10 text-red-400' },
  'cosmetic': { label: 'Косметическое', color: 'bg-blue-500/10 text-blue-400' },
  'accident': { label: 'ДТП', color: 'bg-purple-500/10 text-purple-400' }
};

const damageSeverityConfig = {
  'minor': { label: 'Незначительное', color: 'bg-green-500/10 text-green-400' },
  'moderate': { label: 'Умеренное', color: 'bg-yellow-500/10 text-yellow-400' },
  'major': { label: 'Серьезное', color: 'bg-orange-500/10 text-orange-400' },
  'critical': { label: 'Критическое', color: 'bg-red-500/10 text-red-400' }
};

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSFleetMaintenanceModuleProps {
  onBackToModules?: () => void;
}

export function GTSFleetMaintenanceModule({ onBackToModules }: GTSFleetMaintenanceModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState<'overview' | 'assets' | 'workorders' | 'damages' | 'analytics'>('overview');
  const [selectedAssets, setSelectedAssets] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<AssetStatus | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<AssetType | 'all'>('all');
  const [showAssetModal, setShowAssetModal] = useState(false);
  const [showWorkOrderModal, setShowWorkOrderModal] = useState(false);
  const [showDamageModal, setShowDamageModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [selectedWorkOrder, setSelectedWorkOrder] = useState<WorkOrder | null>(null);
  const [selectedDamage, setSelectedDamage] = useState<Damage | null>(null);
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [workOrders, setWorkOrders] = useState<WorkOrder[]>(mockWorkOrders);
  const [damages, setDamages] = useState<Damage[]>(mockDamages);

  // Фильтрация активов
  const filteredAssets = useMemo(() => {
    return assets.filter(asset => {
      const matchesSearch = 
        asset.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.regNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        asset.id.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
      const matchesType = typeFilter === 'all' || asset.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    });
  }, [assets, searchQuery, statusFilter, typeFilter]);

  // Обработчики действий
  const handleStatusChange = async (assetId: string, newStatus: AssetStatus) => {
    const asset = assets.find(a => a.id === assetId);
    if (!asset) return;

    // Валидация переходов
    if (newStatus === 'available' && asset.status === 'maintenance') {
      const openWorkOrders = workOrders.filter(wo => 
        wo.assetId === assetId && ['open', 'in_progress', 'waiting_parts'].includes(wo.status)
      );
      if (openWorkOrders.length > 0) {
        toast.error('Нельзя перевести в "Доступна" при открытых нарядах на ТО');
        return;
      }
    }

    if (newStatus === 'available' && asset.status === 'damaged') {
      const openDamages = damages.filter(d => 
        d.assetId === assetId && !d.resolvedAt
      );
      if (openDamages.length > 0) {
        toast.error('Нельзя перевести в "Доступна" при неустраненных повреждениях');
        return;
      }
    }

    setAssets(prev => prev.map(a => 
      a.id === assetId 
        ? { ...a, status: newStatus, updatedAt: new Date().toISOString() }
        : a
    ));

    toast.success(`Статус изменен на "${assetStatusConfig[newStatus].label}"`);
    
    // Логирование события
    console.log({
      type: newStatus === 'maintenance' ? 'AssetUnavailable' : 'AssetStatusChanged',
      assetId,
      oldStatus: asset.status,
      newStatus,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleCreateWorkOrder = (assetId: string, type: WorkOrderType = 'preventive') => {
    const newWorkOrder: WorkOrder = {
      id: `WO-${Date.now()}`,
      assetId,
      type,
      title: `${type === 'preventive' ? 'Плановое ТО' : 'Ремонтные работы'}`,
      description: 'Новый наряд на работы',
      status: 'open',
      priority: 'medium',
      scheduledDate: new Date(Date.now() + 24*60*60*1000).toISOString(),
      estimatedHours: 4,
      parts: [],
      laborCost: 0,
      partsCost: 0,
      totalCost: 0,
      photos: [],
      createdBy: 'user:exec-1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setWorkOrders(prev => [newWorkOrder, ...prev]);
    
    // Автоматический перевод в maintenance если это ТО
    if (type === 'preventive') {
      handleStatusChange(assetId, 'maintenance');
    }
    
    toast.success('Наряд на работы создан');
    
    console.log({
      type: 'WorkOrderOpened',
      workOrderId: newWorkOrder.id,
      assetId,
      workOrderType: type,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleCompleteWorkOrder = (workOrderId: string) => {
    const workOrder = workOrders.find(wo => wo.id === workOrderId);
    if (!workOrder) return;

    setWorkOrders(prev => prev.map(wo => 
      wo.id === workOrderId 
        ? { 
            ...wo, 
            status: 'done' as WorkOrderStatus, 
            completedAt: new Date().toISOString(),
            actualHours: wo.estimatedHours,
            updatedAt: new Date().toISOString()
          }
        : wo
    ));

    // Если это было ТО, переводим актив в available
    if (workOrder.type === 'preventive') {
      handleStatusChange(workOrder.assetId, 'available');
    }

    toast.success('Наряд выполнен');
    
    console.log({
      type: 'WorkOrderClosed',
      workOrderId,
      assetId: workOrder.assetId,
      completedAt: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleReportDamage = (assetId: string) => {
    const description = prompt('Описание повреждения:');
    if (!description) return;

    const newDamage: Damage = {
      id: `D-${Date.now()}`,
      assetId,
      type: 'mechanical',
      severity: 'moderate',
      description,
      location: 'Требует уточнения',
      reportedAt: new Date().toISOString(),
      reportedBy: 'user:exec-1',
      photos: [],
      documents: [],
      downtimeHours: 0,
      preventsFuture: false
    };

    setDamages(prev => [newDamage, ...prev]);
    
    // Автоматический перевод в damaged
    handleStatusChange(assetId, 'damaged');
    
    toast.success('Повреждение зарегистрировано');
  };

  const handleAddPart = (workOrderId: string, part: PartUsage) => {
    setWorkOrders(prev => prev.map(wo => 
      wo.id === workOrderId 
        ? { 
            ...wo, 
            parts: [...wo.parts, part],
            partsCost: wo.partsCost + part.totalCost,
            totalCost: wo.laborCost + wo.partsCost + part.totalCost,
            updatedAt: new Date().toISOString()
          }
        : wo
    ));
    
    toast.success('Запчасть добавлена в наряд');
  };

  // Компоненты значков
  const AssetStatusBadge = ({ status }: { status: AssetStatus }) => {
    const config = assetStatusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const WorkOrderStatusBadge = ({ status }: { status: WorkOrderStatus }) => {
    const config = workOrderStatusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const AssetTypeBadge = ({ type }: { type: AssetType }) => {
    const config = assetTypeConfig[type];
    const IconComponent = config.icon;
    
    return (
      <Badge variant="outline" className="text-xs">
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  // Обзорный экран
  const OverviewScreen = () => (
    <div className="space-y-6">
      {/* Критические алерты */}
      <Card className="bg-[#121214] border-[#232428] border-red-500/20">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            Требуют внимания
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets.filter(asset => asset.status === 'damaged' || asset.status === 'maintenance').map((asset) => (
              <Alert key={asset.id} className="border-orange-500/20 bg-orange-500/5">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{asset.model} ({asset.regNumber})</div>
                      <p className="text-[#A6A7AA] text-sm">
                        {asset.status === 'damaged' ? 'Повреждение требует ремонта' : 'Плановое ТО в процессе'}
                      </p>
                      <p className="text-xs text-[#A6A7AA]">
                        Простой: {asset.totalDowntime} часов
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <AssetStatusBadge status={asset.status} />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSelectedAsset(asset);
                          setShowAssetModal(true);
                        }}
                      >
                        Подробнее
                      </Button>
                    </div>
                  </div>
                </AlertDescription>
              </Alert>
            ))}
            
            {workOrders.filter(wo => wo.status === 'waiting_parts').map((workOrder) => (
              <Alert key={workOrder.id} className="border-yellow-500/20 bg-yellow-500/5">
                <Package className="h-4 w-4" />
                <AlertDescription>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-white font-medium">{workOrder.title}</div>
                      <p className="text-[#A6A7AA] text-sm">
                        Ожидание запчастей для завершения работ
                      </p>
                      <p className="text-xs text-[#A6A7AA]">
                        Наряд: {workOrder.id} • Техника: {assets.find(a => a.id === workOrder.assetId)?.regNumber}
                      </p>
                    </div>
                    <WorkOrderStatusBadge status={workOrder.status} />
                  </div>
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Активные наряды */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-blue-400" />
            Активные наряды
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {workOrders
              .filter(wo => ['open', 'in_progress'].includes(wo.status))
              .slice(0, 5)
              .map((workOrder) => {
                const asset = assets.find(a => a.id === workOrder.assetId);
                return (
                  <div 
                    key={workOrder.id}
                    className="p-4 rounded-lg border border-[#232428] bg-[#17181A] hover:bg-[#1F2024] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedWorkOrder(workOrder);
                      setShowWorkOrderModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{workOrder.title}</span>
                          <WorkOrderStatusBadge status={workOrder.status} />
                          <Badge className={
                            workOrder.priority === 'urgent' ? 'bg-red-500/10 text-red-400' :
                            workOrder.priority === 'high' ? 'bg-orange-500/10 text-orange-400' :
                            workOrder.priority === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                            'bg-gray-500/10 text-gray-400'
                          }>
                            {workOrder.priority}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#A6A7AA]">
                          Техника: {asset?.model} ({asset?.regNumber}) • Планируемо: {workOrder.estimatedHours}ч
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-[#A6A7AA]">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {workOrder.assignedTechnician || 'Не назначен'}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            {workOrder.totalCost.toLocaleString('ru-RU')} ₽
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(workOrder.scheduledDate).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {workOrder.status === 'in_progress' && (
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCompleteWorkOrder(workOrder.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Завершить
                          </Button>
                        )}
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
                              <Package className="w-4 h-4 mr-2" />
                              Добавить запчасти
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Календарь ТО на ближайшие дни */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-purple-400" />
            Календарь ТО
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {assets
              .filter(asset => asset.nextServiceDue.date)
              .sort((a, b) => new Date(a.nextServiceDue.date!).getTime() - new Date(b.nextServiceDue.date!).getTime())
              .slice(0, 4)
              .map((asset) => {
                const dueDate = new Date(asset.nextServiceDue.date!);
                const daysUntilDue = Math.ceil((dueDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
                const overdue = daysUntilDue < 0;
                
                return (
                  <div 
                    key={asset.id}
                    className={`p-3 rounded-lg border transition-colors ${
                      overdue 
                        ? 'border-red-500/30 bg-red-500/5' 
                        : daysUntilDue <= 7
                        ? 'border-orange-500/30 bg-orange-500/5'
                        : 'border-[#232428] bg-[#17181A]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-white font-medium">{asset.model}</span>
                          <span className="text-[#A6A7AA] text-sm">({asset.regNumber})</span>
                          <AssetTypeBadge type={asset.type} />
                        </div>
                        <div className="text-sm text-[#A6A7AA] mt-1">
                          {overdue ? 'Просрочено на' : 'Осталось'}: {Math.abs(daysUntilDue)} дней
                        </div>
                        <div className="text-xs text-[#A6A7AA]">
                          Моточасы: {asset.engineHours}/{asset.nextServiceDue.hours || '—'}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Badge className={
                          overdue ? 'bg-red-500/10 text-red-400' :
                          daysUntilDue <= 7 ? 'bg-orange-500/10 text-orange-400' :
                          'bg-green-500/10 text-green-400'
                        }>
                          {dueDate.toLocaleDateString('ru-RU')}
                        </Badge>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCreateWorkOrder(asset.id, 'preventive')}
                        >
                          Создать ТО
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
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
              <span className="text-sm">Добавить технику</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <Wrench className="w-5 h-5 mb-2" />
              <span className="text-sm">Создать наряд</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <AlertTriangle className="w-5 h-5 mb-2" />
              <span className="text-sm">Сообщить повреждение</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <BarChart3 className="w-5 h-5 mb-2" />
              <span className="text-sm">Отчеты</span>
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
            <span className="text-white">Fleet & Maintenance</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Парк техники и ТО</h1>
          <p className="text-[#A6A7AA]">
            Управление парком техники, техобслуживанием и повреждениями • {filteredAssets.length} единиц
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-400">
            <Activity className="w-3 h-3 mr-1" />
            {assets.filter(a => a.status === 'available').length} доступно
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Добавить технику
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {fleetKpis.map((kpi, index) => {
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
                <Layers className="w-4 h-4 mr-2" />
                Обзор
              </TabsTrigger>
              <TabsTrigger value="assets" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Truck className="w-4 h-4 mr-2" />
                Техника
              </TabsTrigger>
              <TabsTrigger value="workorders" className="text-[#A6A7AA] data-[state=active]:text-white">
                <ClipboardList className="w-4 h-4 mr-2" />
                Наряды
              </TabsTrigger>
              <TabsTrigger value="damages" className="text-[#A6A7AA] data-[state=active]:text-white">
                <AlertTriangle className="w-4 h-4 mr-2" />
                Повреждения
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-[#A6A7AA] data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewScreen />
            </TabsContent>

            <TabsContent value="assets" className="mt-6">
              <div className="space-y-4">
                {/* Фильтры */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск техники..."
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
                      <SelectItem value="available">Доступна</SelectItem>
                      <SelectItem value="maintenance">ТО</SelectItem>
                      <SelectItem value="damaged">Повреждена</SelectItem>
                      <SelectItem value="in_service">На маршруте</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
                    <SelectTrigger className="w-40 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Тип" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все типы</SelectItem>
                      <SelectItem value="buggy">Багги</SelectItem>
                      <SelectItem value="helicopter">Вертолет</SelectItem>
                      <SelectItem value="yacht">Яхта</SelectItem>
                      <SelectItem value="atv">Квадроцикл</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Список техники */}
                <div className="grid gap-4">
                  {filteredAssets.map((asset) => (
                    <Card key={asset.id} className="bg-[#121214] border-[#232428] hover:border-[#91040C]/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-medium text-white">{asset.model}</h3>
                              <AssetStatusBadge status={asset.status} />
                              <AssetTypeBadge type={asset.type} />
                              <Badge variant="outline" className="text-xs">
                                {asset.regNumber}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Моточасы</Label>
                                <div className="text-white text-sm">{asset.engineHours}ч</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Пробег</Label>
                                <div className="text-white text-sm">{asset.odometer.toLocaleString('ru-RU')} км</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Топливо</Label>
                                <div className="flex items-center gap-2">
                                  <Progress value={asset.fuelLevel} className="w-16 h-1" />
                                  <span className="text-white text-sm">{asset.fuelLevel}%</span>
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Местоположение</Label>
                                <div className="text-white text-sm">{asset.location}</div>
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-4 mb-3">
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Последнее ТО</Label>
                                <div className="text-white text-sm">
                                  {new Date(asset.lastServiceAt).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Следующее ТО</Label>
                                <div className="text-white text-sm">
                                  {asset.nextServiceDue.date 
                                    ? new Date(asset.nextServiceDue.date).toLocaleDateString('ru-RU')
                                    : `${asset.nextServiceDue.hours || asset.nextServiceDue.kilometers}${asset.nextServiceDue.hours ? 'ч' : 'км'}`
                                  }
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">MTBF</Label>
                                <div className="text-white text-sm">{asset.mtbfHours}ч</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Стоимость/час</Label>
                                <div className="text-white text-sm">₽{asset.avgCostPerHour}</div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-[#A6A7AA]">
                              {asset.manufacturer} {asset.year} • VIN: {asset.vin || 'Не указан'}
                            </div>
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
                                    setSelectedAsset(asset);
                                    setShowAssetModal(true);
                                  }}
                                  className="text-white hover:bg-[#17181A]"
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  Подробная карточка
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleCreateWorkOrder(asset.id, 'preventive')}
                                  className="text-white hover:bg-[#17181A]"
                                >
                                  <Wrench className="w-4 h-4 mr-2" />
                                  Создать ТО
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  onClick={() => handleReportDamage(asset.id)}
                                  className="text-white hover:bg-[#17181A]"
                                >
                                  <AlertTriangle className="w-4 h-4 mr-2" />
                                  Сообщить повреждение
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-[#232428]" />
                                <DropdownMenuLabel className="text-[#A6A7AA]">Изменить статус</DropdownMenuLabel>
                                {Object.entries(assetStatusConfig).map(([status, config]) => (
                                  <DropdownMenuItem 
                                    key={status}
                                    onClick={() => handleStatusChange(asset.id, status as AssetStatus)}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    {React.createElement(config.icon, { className: "w-4 h-4 mr-2" })}
                                    {config.label}
                                  </DropdownMenuItem>
                                ))}
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

            <TabsContent value="workorders" className="mt-6">
              <div className="text-center py-12">
                <ClipboardList className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Управление нарядами</h3>
                <p className="text-[#A6A7AA]">
                  Создание, планирование и отслеживание работ по ТО
                </p>
              </div>
            </TabsContent>

            <TabsContent value="damages" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Управление повреждениями</h3>
                
                <div className="grid gap-4">
                  {damages.map((damage) => {
                    const asset = assets.find(a => a.id === damage.assetId);
                    return (
                      <Card key={damage.id} className="bg-[#121214] border-[#232428]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <Badge className={damageTypeConfig[damage.type].color}>
                                  {damageTypeConfig[damage.type].label}
                                </Badge>
                                <Badge className={damageSeverityConfig[damage.severity].color}>
                                  {damageSeverityConfig[damage.severity].label}
                                </Badge>
                                {damage.insuranceClaim && (
                                  <Badge variant="outline" className="text-xs">
                                    Страховой случай
                                  </Badge>
                                )}
                              </div>
                              <h4 className="text-white font-medium mb-1">{damage.description}</h4>
                              <p className="text-sm text-[#A6A7AA]">
                                Техника: {asset?.model} ({asset?.regNumber}) • 
                                Локация: {damage.location}
                              </p>
                              <p className="text-xs text-[#A6A7AA] mt-1">
                                {new Date(damage.reportedAt).toLocaleString('ru-RU')} • 
                                Простой: {damage.downtimeHours}ч
                              </p>
                              {damage.repairEstimate && (
                                <p className="text-xs text-blue-400 mt-1">
                                  Оценка ремонта: ₽{damage.repairEstimate.toLocaleString('ru-RU')}
                                </p>
                              )}
                            </div>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => {
                                setSelectedDamage(damage);
                                setShowDamageModal(true);
                              }}
                            >
                              Подробнее
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Аналитика парка</h3>
                <p className="text-[#A6A7AA]">
                  Детальная статистика по эффективности и затратам
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Модальное окно карточки техники */}
      {selectedAsset && (
        <Dialog open={showAssetModal} onOpenChange={setShowAssetModal}>
          <DialogContent className="max-w-6xl bg-[#121214] border-[#232428] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl text-white">
                    {selectedAsset.model} ({selectedAsset.regNumber})
                  </DialogTitle>
                  <DialogDescription className="text-[#A6A7AA]">
                    {selectedAsset.manufacturer} {selectedAsset.year} • ID: {selectedAsset.id}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <AssetStatusBadge status={selectedAsset.status} />
                  <AssetTypeBadge type={selectedAsset.type} />
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
                <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="maintenance" className="text-[#A6A7AA] data-[state=active]:text-white">
                  ТО и ремонт
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Документы
                </TabsTrigger>
                <TabsTrigger value="analytics" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Аналитика
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#A6A7AA]">Модель</Label>
                          <div className="text-white">{selectedAsset.model}</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Производитель</Label>
                          <div className="text-white">{selectedAsset.manufacturer}</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Год выпуска</Label>
                          <div className="text-white">{selectedAsset.year}</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">VIN</Label>
                          <div className="text-white font-mono text-sm">{selectedAsset.vin || 'Не указан'}</div>
                        </div>
                      </div>
                      
                      <Separator className="bg-[#232428]" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#A6A7AA]">Местоположение</Label>
                          <div className="text-white">{selectedAsset.location}</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Дата приобретения</Label>
                          <div className="text-white">
                            {new Date(selectedAsset.acquiredAt).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Стоимость приобретения</Label>
                          <div className="text-white">
                            ₽{selectedAsset.purchasePrice.toLocaleString('ru-RU')}
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Текущая стоимость</Label>
                          <div className="text-white">
                            ₽{selectedAsset.currentValue.toLocaleString('ru-RU')}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Техническое состояние</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#A6A7AA]">Моточасы</Label>
                          <div className="text-white text-xl font-medium">{selectedAsset.engineHours}ч</div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Пробег</Label>
                          <div className="text-white text-xl font-medium">
                            {selectedAsset.odometer.toLocaleString('ru-RU')} км
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <Label className="text-[#A6A7AA]">Уровень топлива</Label>
                          <div className="flex items-center gap-3 mt-1">
                            <Progress value={selectedAsset.fuelLevel} className="flex-1" />
                            <span className="text-white text-sm">{selectedAsset.fuelLevel}%</span>
                          </div>
                        </div>
                        
                        {selectedAsset.batteryLevel && (
                          <div>
                            <Label className="text-[#A6A7AA]">Заряд аккумулятора</Label>
                            <div className="flex items-center gap-3 mt-1">
                              <Progress value={selectedAsset.batteryLevel} className="flex-1" />
                              <span className="text-white text-sm">{selectedAsset.batteryLevel}%</span>
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <Separator className="bg-[#232428]" />
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-[#A6A7AA]">Последнее ТО</Label>
                          <div className="text-white">
                            {new Date(selectedAsset.lastServiceAt).toLocaleDateString('ru-RU')}
                          </div>
                        </div>
                        <div>
                          <Label className="text-[#A6A7AA]">Следующее ТО</Label>
                          <div className="text-white">
                            {selectedAsset.nextServiceDue.date 
                              ? new Date(selectedAsset.nextServiceDue.date).toLocaleDateString('ru-RU')
                              : `${selectedAsset.nextServiceDue.hours || selectedAsset.nextServiceDue.kilometers}${selectedAsset.nextServiceDue.hours ? 'ч' : 'км'}`
                            }
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Характеристики</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-[#A6A7AA]">Максимальная скорость</Label>
                        <div className="text-white">{selectedAsset.specs.maxSpeed} км/ч</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Объем топливного бака</Label>
                        <div className="text-white">{selectedAsset.specs.fuelCapacity} л</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Пассажиры</Label>
                        <div className="text-white">{selectedAsset.specs.passengers}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Тип двигателя</Label>
                        <div className="text-white">{selectedAsset.specs.engineType}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Трансмиссия</Label>
                        <div className="text-white">{selectedAsset.specs.transmission}</div>
                      </div>
                      {selectedAsset.specs.cargoCapacity && (
                        <div>
                          <Label className="text-[#A6A7AA]">Грузоподъемность</Label>
                          <div className="text-white">{selectedAsset.specs.cargoCapacity} кг</div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="maintenance" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <Wrench className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">История ТО и ремонтов</h3>
                  <p className="text-[#A6A7AA]">
                    Все работы по техническому обслуживанию данной единицы
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Документы и страховка</h3>
                  <p className="text-[#A6A7AA]">
                    Регистрационные документы, страховые полисы, техпаспорт
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="analytics" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Аналитика использования</h3>
                  <p className="text-[#A6A7AA]">
                    Статистика простоев, затрат и эффективности данной единицы
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

export default GTSFleetMaintenanceModule;