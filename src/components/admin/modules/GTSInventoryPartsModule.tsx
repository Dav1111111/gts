// 📦 GTS Inventory & Parts Module - Полная реализация согласно спецификации v2025-09-17
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
  Package, Warehouse, TrendingUp, DollarSign, Calendar, AlertTriangle,
  Star, Target, ArrowUpRight, Activity, CheckCircle, Bell,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  Timer, Navigation, MessageSquare, Phone, Settings,
  
  // Inventory specific
  Box, BarChart3, ShoppingCart, Truck, Package2, 
  PackageOpen, PackageCheck, Calculator, FileSpreadsheet,
  
  // Movement specific
  ArrowDown, ArrowUp, RotateCw, Minus, Building,
  MapPin, Users, CreditCard, Wrench, Factory,
  
  // Navigation
  ArrowLeft, ArrowRight, Home, Layers
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type MovementType = 'in' | 'out' | 'adjust' | 'reserve' | 'unreserve' | 'transfer';
type ABCClass = 'A' | 'B' | 'C' | 'N'; // N = New/Not classified
type Unit = 'pcs' | 'kg' | 'l' | 'm' | 'm2' | 'set' | 'box';
type StockStatus = 'in_stock' | 'low_stock' | 'out_of_stock' | 'overstock';
type MovementStatus = 'pending' | 'posted' | 'cancelled';
type LocationType = 'warehouse' | 'mobile_unit' | 'service_center' | 'office';

interface Item {
  id: string;
  sku: string;                   // Артикул
  name: string;                  // Наименование
  description?: string;          // Описание
  category: string;              // Категория запчастей
  unit: Unit;                    // Единица измерения
  abcClass: ABCClass;           // ABC-классификация
  minLevel: number;             // Минимальный остаток
  maxLevel?: number;            // Максимальный остаток
  reorderPoint: number;         // Точка заказа
  
  // Стоимостные характеристики
  avgCost: number;              // Средняя стоимость
  lastCost: number;             // Последняя стоимость закупки
  standardCost?: number;        // Стандартная стоимость
  
  // Характеристики товара
  weight?: number;              // Вес (кг)
  dimensions?: {                // Размеры
    length: number;
    width: number;
    height: number;
  };
  
  // Поставка
  leadTimeDays: number;         // Время поставки в днях
  defaultSupplierId?: string;   // Основной поставщик
  alternativeSuppliers: string[]; // Альтернативные поставщики
  
  // Совместимость
  compatibleAssets: string[];   // Совместимые активы
  partNumbers: string[];        // Номера производителей
  
  // Метаданные
  barcode?: string;             // Штрихкод
  serialTracked: boolean;       // Отслеживание серийных номеров
  batchTracked: boolean;        // Отслеживание партий
  expirationTracked: boolean;   // Отслеживание сроков годности
  
  isActive: boolean;            // Активность позиции
  createdAt: string;
  updatedAt: string;
}

interface Stock {
  itemId: string;
  locationId: string;
  qty: number;                  // Текущий остаток
  reservedQty: number;          // Зарезервированное количество
  availableQty: number;         // Доступное количество
  
  // Стоимостная оценка
  totalValue: number;           // Общая стоимость остатка
  avgCost: number;              // Средняя стоимость единицы
  
  // Последние движения
  lastMovementAt?: string;      // Последнее движение
  lastCountAt?: string;         // Последняя инвентаризация
  
  updatedAt: string;
}

interface Movement {
  id: string;
  itemId: string;
  locationId: string;
  type: MovementType;
  qty: number;                  // Количество (+ для прихода, - для расхода)
  cost: number;                 // Стоимость за единицу
  totalCost: number;            // Общая стоимость
  
  // Основание для движения
  workOrderId?: string;         // Связанный наряд
  purchaseOrderId?: string;     // Заказ поставщику
  transferId?: string;          // Перемещение между локациями
  adjustmentReason?: string;    // Причина корректировки
  
  // Детали движения
  reference?: string;           // Номер документа
  notes?: string;               // Примечания
  batchNumber?: string;         // Номер партии
  serialNumbers?: string[];     // Серийные номера
  expirationDate?: string;      // Срок годности
  
  // Статус и метаданные
  status: MovementStatus;
  createdBy: string;
  approvedBy?: string;
  createdAt: string;
  postedAt?: string;
}

interface Supplier {
  id: string;
  name: string;
  code: string;                 // Код поставщика
  type: 'manufacturer' | 'distributor' | 'local_dealer';
  
  // Контакты
  contactPerson?: string;
  email?: string;
  phone?: string;
  website?: string;
  
  // Адрес
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  
  // Условия работы
  paymentTerms: string;         // Условия оплаты
  deliveryTerms: string;        // Условия доставки
  minOrderAmount?: number;      // Минимальная сумма заказа
  leadTimeDays: number;         // Время поставки
  
  // Качество и рейтинги
  qualityRating: number;        // Рейтинг качества (1-5)
  deliveryRating: number;       // Рейтинг поставок (1-5)
  priceRating: number;          // Рейтинг цен (1-5)
  
  // Статистика
  totalOrders: number;
  totalValue: number;
  onTimeDeliveryRate: number;   // Процент поставок в срок
  
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Location {
  id: string;
  name: string;
  code: string;
  type: LocationType;
  
  // Адрес и контакты
  address?: string;
  manager?: string;
  phone?: string;
  
  // Характеристики
  capacity?: number;            // Вместимость
  description?: string;
  
  isActive: boolean;
}

interface InventoryAlert {
  id: string;
  type: 'low_stock' | 'out_of_stock' | 'overstock' | 'expired' | 'slow_moving';
  itemId: string;
  locationId: string;
  message: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
  acknowledged?: boolean;
  acknowledgedBy?: string;
  acknowledgedAt?: string;
}

// 🎯 МОК ДАННЫЕ

const mockLocations: Location[] = [
  {
    id: 'LOC-001',
    name: 'Основной склад',
    code: 'MAIN',
    type: 'warehouse',
    address: 'г. Сочи, ул. Складская, 15',
    manager: 'Иванов П.С.',
    phone: '+7 (900) 123-45-67',
    capacity: 1000,
    isActive: true
  },
  {
    id: 'LOC-002',
    name: 'База Красная Поляна',
    code: 'KP',
    type: 'service_center',
    address: 'Красная Поляна, сервисная база',
    manager: 'Петров А.И.',
    phone: '+7 (900) 234-56-78',
    capacity: 200,
    isActive: true
  },
  {
    id: 'LOC-003',
    name: 'Морской терминал',
    code: 'SEA',
    type: 'service_center',
    address: 'Морской порт Сочи',
    manager: 'Сидоров В.В.',
    phone: '+7 (900) 345-67-89',
    capacity: 150,
    isActive: true
  },
  {
    id: 'LOC-004',
    name: 'Мобильная единица #1',
    code: 'MOB1',
    type: 'mobile_unit',
    manager: 'Техник-001',
    capacity: 50,
    isActive: true
  }
];

const mockItems: Item[] = [
  {
    id: 'P-5501',
    sku: 'FLT-BR-002',
    name: 'Колодки тормозные передние',
    description: 'Комплект тормозных колодок для ATV',
    category: 'Тормозная система',
    unit: 'set',
    abcClass: 'A',
    minLevel: 4,
    maxLevel: 20,
    reorderPoint: 6,
    
    avgCost: 2500,
    lastCost: 2600,
    standardCost: 2400,
    
    weight: 2.5,
    dimensions: {
      length: 150,
      width: 100,
      height: 20
    },
    
    leadTimeDays: 7,
    defaultSupplierId: 'SUP-001',
    alternativeSuppliers: ['SUP-002'],
    
    compatibleAssets: ['A-101', 'A-104'],
    partNumbers: ['BR-FRT-ATV-001', 'BRAKE-PAD-ATV'],
    
    barcode: '4607177123456',
    serialTracked: false,
    batchTracked: true,
    expirationTracked: false,
    
    isActive: true,
    createdAt: '2025-01-15T10:00:00Z',
    updatedAt: '2025-09-16T14:30:00Z'
  },
  {
    id: 'P-5502',
    sku: 'ENG-OIL-001',
    name: 'Масло моторное 5W-30',
    description: 'Синтетическое моторное масло для вертолетов',
    category: 'ГСМ',
    unit: 'l',
    abcClass: 'A',
    minLevel: 50,
    maxLevel: 200,
    reorderPoint: 75,
    
    avgCost: 1200,
    lastCost: 1250,
    standardCost: 1150,
    
    weight: 1.0,
    
    leadTimeDays: 3,
    defaultSupplierId: 'SUP-003',
    alternativeSuppliers: ['SUP-001'],
    
    compatibleAssets: ['A-102'],
    partNumbers: ['RR300-OIL-5W30', 'AVIATION-OIL-001'],
    
    barcode: '4607177123457',
    serialTracked: false,
    batchTracked: true,
    expirationTracked: true,
    
    isActive: true,
    createdAt: '2025-02-01T10:00:00Z',
    updatedAt: '2025-09-15T11:00:00Z'
  },
  {
    id: 'P-5503',
    sku: 'HYD-SEAL-003',
    name: 'Уплотнение гидравлическое',
    description: 'Уплотнительное кольцо для гидросистемы яхт',
    category: 'Гидравлика',
    unit: 'pcs',
    abcClass: 'B',
    minLevel: 10,
    maxLevel: 50,
    reorderPoint: 15,
    
    avgCost: 450,
    lastCost: 480,
    standardCost: 420,
    
    weight: 0.1,
    dimensions: {
      length: 50,
      width: 50,
      height: 5
    },
    
    leadTimeDays: 14,
    defaultSupplierId: 'SUP-002',
    alternativeSuppliers: [],
    
    compatibleAssets: ['A-103'],
    partNumbers: ['HYD-RING-50MM', 'SEAL-YACHT-001'],
    
    serialTracked: false,
    batchTracked: false,
    expirationTracked: false,
    
    isActive: true,
    createdAt: '2025-03-10T10:00:00Z',
    updatedAt: '2025-09-10T09:00:00Z'
  },
  {
    id: 'P-5504',
    sku: 'ELC-BAT-001',
    name: 'Аккумулятор 12V 100Ah',
    description: 'Свинцово-кислотный аккумулятор для морской техники',
    category: 'Электрооборудование',
    unit: 'pcs',
    abcClass: 'A',
    minLevel: 2,
    maxLevel: 8,
    reorderPoint: 3,
    
    avgCost: 15000,
    lastCost: 15500,
    standardCost: 14500,
    
    weight: 28.0,
    dimensions: {
      length: 330,
      width: 173,
      height: 220
    },
    
    leadTimeDays: 5,
    defaultSupplierId: 'SUP-004',
    alternativeSuppliers: ['SUP-001'],
    
    compatibleAssets: ['A-103', 'A-101'],
    partNumbers: ['BAT-12V-100AH', 'MARINE-BATTERY-001'],
    
    barcode: '4607177123458',
    serialTracked: true,
    batchTracked: false,
    expirationTracked: false,
    
    isActive: true,
    createdAt: '2025-04-20T10:00:00Z',
    updatedAt: '2025-09-12T16:00:00Z'
  },
  {
    id: 'P-5505',
    sku: 'AIR-FLT-001',
    name: 'Фильтр воздушный',
    description: 'Воздушный фильтр для двигателей багги',
    category: 'Фильтры',
    unit: 'pcs',
    abcClass: 'B',
    minLevel: 8,
    maxLevel: 30,
    reorderPoint: 12,
    
    avgCost: 800,
    lastCost: 850,
    standardCost: 750,
    
    weight: 0.5,
    
    leadTimeDays: 10,
    defaultSupplierId: 'SUP-002',
    alternativeSuppliers: ['SUP-001'],
    
    compatibleAssets: ['A-101'],
    partNumbers: ['AIR-FILTER-BUGGY', 'HONDA-AIR-001'],
    
    serialTracked: false,
    batchTracked: false,
    expirationTracked: false,
    
    isActive: true,
    createdAt: '2025-05-15T10:00:00Z',
    updatedAt: '2025-09-14T13:30:00Z'
  },
  {
    id: 'P-5506',
    sku: 'WIN-SEAL-002',
    name: 'Уплотнитель стекла',
    description: 'Резиновый уплотнитель для лобового стекла',
    category: 'Кузовные детали',
    unit: 'm',
    abcClass: 'C',
    minLevel: 20,
    maxLevel: 100,
    reorderPoint: 30,
    
    avgCost: 150,
    lastCost: 160,
    standardCost: 140,
    
    weight: 0.3,
    
    leadTimeDays: 21,
    defaultSupplierId: 'SUP-005',
    alternativeSuppliers: [],
    
    compatibleAssets: ['A-101', 'A-104'],
    partNumbers: ['WINDSHIELD-SEAL-001'],
    
    serialTracked: false,
    batchTracked: false,
    expirationTracked: false,
    
    isActive: true,
    createdAt: '2025-06-01T10:00:00Z',
    updatedAt: '2025-08-20T11:00:00Z'
  }
];

const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'ТехноПарт Авто',
    code: 'TPA',
    type: 'distributor',
    
    contactPerson: 'Кузнецов Игорь Владимирович',
    email: 'i.kuznetsov@technopart.ru',
    phone: '+7 (495) 123-45-67',
    website: 'https://technopart.ru',
    
    address: {
      street: 'ул. Автозаводская, д. 15',
      city: 'Москва',
      region: 'Московская область',
      postalCode: '115280',
      country: 'Россия'
    },
    
    paymentTerms: 'Предоплата 30%, остальное в течение 14 дней',
    deliveryTerms: 'EXW склад Москва',
    minOrderAmount: 50000,
    leadTimeDays: 7,
    
    qualityRating: 4.5,
    deliveryRating: 4.2,
    priceRating: 4.0,
    
    totalOrders: 45,
    totalValue: 2850000,
    onTimeDeliveryRate: 89,
    
    isActive: true,
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2025-09-15T14:00:00Z'
  },
  {
    id: 'SUP-002',
    name: 'Морские Системы',
    code: 'MSS',
    type: 'manufacturer',
    
    contactPerson: 'Белов Андрей Сергеевич',
    email: 'a.belov@marine-systems.ru',
    phone: '+7 (812) 456-78-90',
    website: 'https://marine-systems.ru',
    
    address: {
      street: 'Кораблестроителей пр., д. 32',
      city: 'Санкт-Петербург',
      region: 'Ленинградская область',
      postalCode: '199226',
      country: 'Россия'
    },
    
    paymentTerms: 'Оплата по факту поставки',
    deliveryTerms: 'DDP до склада клиента',
    minOrderAmount: 100000,
    leadTimeDays: 14,
    
    qualityRating: 4.8,
    deliveryRating: 4.0,
    priceRating: 3.5,
    
    totalOrders: 28,
    totalValue: 3200000,
    onTimeDeliveryRate: 82,
    
    isActive: true,
    createdAt: '2025-01-10T10:00:00Z',
    updatedAt: '2025-09-12T11:30:00Z'
  },
  {
    id: 'SUP-003',
    name: 'АвиаОйл Сервис',
    code: 'AOS',
    type: 'distributor',
    
    contactPerson: 'Федоров Максим Юрьевич',
    email: 'm.fedorov@aviaoil.ru',
    phone: '+7 (495) 789-01-23',
    
    address: {
      street: 'ш. Энтузиастов, д. 78',
      city: 'Москва',
      region: 'Московская область',
      postalCode: '111024',
      country: 'Россия'
    },
    
    paymentTerms: 'Предоплата 100%',
    deliveryTerms: 'FCA склад поставщика',
    minOrderAmount: 25000,
    leadTimeDays: 3,
    
    qualityRating: 4.9,
    deliveryRating: 4.7,
    priceRating: 4.3,
    
    totalOrders: 67,
    totalValue: 1950000,
    onTimeDeliveryRate: 94,
    
    isActive: true,
    createdAt: '2025-02-05T10:00:00Z',
    updatedAt: '2025-09-16T09:15:00Z'
  },
  {
    id: 'SUP-004',
    name: 'БатарейКа',
    code: 'BTK',
    type: 'local_dealer',
    
    contactPerson: 'Григорьев Олег Николаевич',
    email: 'o.grigoriev@batareyka-sochi.ru',
    phone: '+7 (862) 234-56-78',
    
    address: {
      street: 'ул. Промышленная, д. 42',
      city: 'Сочи',
      region: 'Краснодарский край',
      postalCode: '354000',
      country: 'Россия'
    },
    
    paymentTerms: 'Наличная оплата при получении',
    deliveryTerms: 'Доставка по Сочи бесплатно',
    leadTimeDays: 1,
    
    qualityRating: 4.0,
    deliveryRating: 4.8,
    priceRating: 3.8,
    
    totalOrders: 89,
    totalValue: 890000,
    onTimeDeliveryRate: 96,
    
    isActive: true,
    createdAt: '2025-03-01T10:00:00Z',
    updatedAt: '2025-09-17T08:20:00Z'
  },
  {
    id: 'SUP-005',
    name: 'РезинТех Плюс',
    code: 'RTP',
    type: 'manufacturer',
    
    contactPerson: 'Новиков Дмитрий Александрович',
    email: 'd.novikov@rezintech.ru',
    phone: '+7 (4732) 567-89-01',
    
    address: {
      street: 'пр. Революции, д. 128',
      city: 'Воронеж',
      region: 'Воронежская область',
      postalCode: '394036',
      country: 'Россия'
    },
    
    paymentTerms: 'Отсрочка платежа 30 дней',
    deliveryTerms: 'FCA завод-изготовитель',
    minOrderAmount: 15000,
    leadTimeDays: 21,
    
    qualityRating: 4.3,
    deliveryRating: 3.8,
    priceRating: 4.5,
    
    totalOrders: 12,
    totalValue: 245000,
    onTimeDeliveryRate: 75,
    
    isActive: true,
    createdAt: '2025-06-15T10:00:00Z',
    updatedAt: '2025-08-30T15:45:00Z'
  }
];

const mockStock: Stock[] = [
  {
    itemId: 'P-5501',
    locationId: 'LOC-001',
    qty: 12,
    reservedQty: 4,
    availableQty: 8,
    totalValue: 30000,
    avgCost: 2500,
    lastMovementAt: '2025-09-15T14:30:00Z',
    lastCountAt: '2025-08-01T09:00:00Z',
    updatedAt: '2025-09-15T14:30:00Z'
  },
  {
    itemId: 'P-5501',
    locationId: 'LOC-002',
    qty: 3,
    reservedQty: 0,
    availableQty: 3,
    totalValue: 7500,
    avgCost: 2500,
    lastMovementAt: '2025-09-10T11:00:00Z',
    updatedAt: '2025-09-10T11:00:00Z'
  },
  {
    itemId: 'P-5502',
    locationId: 'LOC-001',
    qty: 85,
    reservedQty: 20,
    availableQty: 65,
    totalValue: 102000,
    avgCost: 1200,
    lastMovementAt: '2025-09-16T16:00:00Z',
    updatedAt: '2025-09-16T16:00:00Z'
  },
  {
    itemId: 'P-5503',
    locationId: 'LOC-001',
    qty: 8,
    reservedQty: 2,
    availableQty: 6,
    totalValue: 3600,
    avgCost: 450,
    lastMovementAt: '2025-09-12T13:15:00Z',
    updatedAt: '2025-09-12T13:15:00Z'
  },
  {
    itemId: 'P-5503',
    locationId: 'LOC-003',
    qty: 15,
    reservedQty: 0,
    availableQty: 15,
    totalValue: 6750,
    avgCost: 450,
    lastMovementAt: '2025-09-08T10:30:00Z',
    updatedAt: '2025-09-08T10:30:00Z'
  },
  {
    itemId: 'P-5504',
    locationId: 'LOC-001',
    qty: 1,
    reservedQty: 1,
    availableQty: 0,
    totalValue: 15000,
    avgCost: 15000,
    lastMovementAt: '2025-09-14T12:00:00Z',
    updatedAt: '2025-09-14T12:00:00Z'
  },
  {
    itemId: 'P-5505',
    locationId: 'LOC-001',
    qty: 6,
    reservedQty: 0,
    availableQty: 6,
    totalValue: 4800,
    avgCost: 800,
    lastMovementAt: '2025-09-11T15:45:00Z',
    updatedAt: '2025-09-11T15:45:00Z'
  },
  {
    itemId: 'P-5506',
    locationId: 'LOC-001',
    qty: 45,
    reservedQty: 0,
    availableQty: 45,
    totalValue: 6750,
    avgCost: 150,
    lastMovementAt: '2025-08-25T09:30:00Z',
    updatedAt: '2025-08-25T09:30:00Z'
  }
];

const mockMovements: Movement[] = [
  {
    id: 'MOV-001',
    itemId: 'P-5502',
    locationId: 'LOC-001',
    type: 'in',
    qty: 50,
    cost: 1250,
    totalCost: 62500,
    purchaseOrderId: 'PO-2025-089',
    reference: 'ПН-001234',
    notes: 'Поставка согласно договору №45 от АвиаОйл Сервис',
    batchNumber: 'BATCH-2025-09-001',
    status: 'posted',
    createdBy: 'user:warehouse-mgr',
    approvedBy: 'user:exec-1',
    createdAt: '2025-09-16T16:00:00Z',
    postedAt: '2025-09-16T16:15:00Z'
  },
  {
    id: 'MOV-002',
    itemId: 'P-5501',
    locationId: 'LOC-001',
    type: 'out',
    qty: -4,
    cost: 2500,
    totalCost: -10000,
    workOrderId: 'WO-001',
    reference: 'WO-001',
    notes: 'Списание на ремонт вертолета A-102',
    status: 'posted',
    createdBy: 'user:tech-001',
    approvedBy: 'user:fleet-mgr',
    createdAt: '2025-09-15T14:30:00Z',
    postedAt: '2025-09-15T14:35:00Z'
  },
  {
    id: 'MOV-003',
    itemId: 'P-5503',
    locationId: 'LOC-001',
    type: 'reserve',
    qty: 2,
    cost: 450,
    totalCost: 900,
    workOrderId: 'WO-002',
    reference: 'WO-002',
    notes: 'Резерв под ремонт гидросистемы яхты',
    status: 'posted',
    createdBy: 'user:dispatcher',
    createdAt: '2025-09-12T13:15:00Z',
    postedAt: '2025-09-12T13:20:00Z'
  },
  {
    id: 'MOV-004',
    itemId: 'P-5504',
    locationId: 'LOC-001',
    type: 'adjust',
    qty: -1,
    cost: 15000,
    totalCost: -15000,
    adjustmentReason: 'Брак при получении - трещина корпуса',
    reference: 'ADJ-001',
    notes: 'Возврат поставщику по акту несоответствия',
    status: 'posted',
    createdBy: 'user:warehouse-mgr',
    approvedBy: 'user:exec-1',
    createdAt: '2025-09-14T12:00:00Z',
    postedAt: '2025-09-14T12:30:00Z'
  },
  {
    id: 'MOV-005',
    itemId: 'P-5505',
    locationId: 'LOC-001',
    type: 'transfer',
    qty: -2,
    cost: 800,
    totalCost: -1600,
    transferId: 'TR-001',
    reference: 'TR-001',
    notes: 'Перемещение на базу Красная Поляна',
    status: 'posted',
    createdBy: 'user:logistics',
    createdAt: '2025-09-11T15:45:00Z',
    postedAt: '2025-09-11T16:00:00Z'
  },
  {
    id: 'MOV-006',
    itemId: 'P-5505',
    locationId: 'LOC-002',
    type: 'transfer',
    qty: 2,
    cost: 800,
    totalCost: 1600,
    transferId: 'TR-001',
    reference: 'TR-001',
    notes: 'Получение с основного склада',
    status: 'posted',
    createdBy: 'user:logistics',
    createdAt: '2025-09-11T16:00:00Z',
    postedAt: '2025-09-11T16:05:00Z'
  },
  {
    id: 'MOV-007',
    itemId: 'P-5502',
    locationId: 'LOC-001',
    type: 'reserve',
    qty: 20,
    cost: 1200,
    totalCost: 24000,
    workOrderId: 'WO-003',
    reference: 'WO-003',
    notes: 'Резерв под профилактическое ТО',
    status: 'pending',
    createdBy: 'user:dispatcher',
    createdAt: '2025-09-17T09:30:00Z'
  }
];

const mockAlerts: InventoryAlert[] = [
  {
    id: 'ALT-001',
    type: 'low_stock',
    itemId: 'P-5503',
    locationId: 'LOC-001',
    message: 'Остаток уплотнений гидравлических ниже минимального уровня (8 < 10)',
    severity: 'medium',
    createdAt: '2025-09-12T13:15:00Z'
  },
  {
    id: 'ALT-002',
    type: 'out_of_stock',
    itemId: 'P-5504',
    locationId: 'LOC-001',
    message: 'Аккумуляторы 12V 100Ah закончились на основном складе',
    severity: 'high',
    createdAt: '2025-09-14T12:30:00Z'
  },
  {
    id: 'ALT-003',
    type: 'slow_moving',
    itemId: 'P-5506',
    locationId: 'LOC-001',
    message: 'Уплотнитель стекла не перемещался более 20 дней',
    severity: 'low',
    createdAt: '2025-09-15T10:00:00Z',
    acknowledged: true,
    acknowledgedBy: 'user:warehouse-mgr',
    acknowledgedAt: '2025-09-15T14:00:00Z'
  }
];

// 🎯 KPI КОНФИГУРАЦИЯ

interface InventoryKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  description: string;
  icon: React.ComponentType<any>;
}

const inventoryKpis: InventoryKPI[] = [
  {
    title: "Оборачиваемость",
    value: "6.2x",
    change: "+0.4x",
    trend: "up",
    target: "6.0x",
    description: "Количество оборотов склада в год",
    icon: RotateCw
  },
  {
    title: "Out-of-Stock",
    value: "2.1%",
    change: "-0.8%",
    trend: "up",
    target: "< 3%",
    description: "Процент позиций без остатков",
    icon: AlertTriangle
  },
  {
    title: "Стоимость склада",
    value: "₽485К",
    change: "+₽23К",
    trend: "neutral",
    target: "₽500К",
    description: "Общая стоимость остатков на складе",
    icon: DollarSign
  },
  {
    title: "ABC-A позиций",
    value: "18%",
    change: "+2%",
    trend: "up",
    target: "20%",
    description: "Доля высокооборотных позиций",
    icon: TrendingUp
  }
];

// 🎯 КОНФИГУРАЦИЯ СТАТУСОВ

const movementTypeConfig = {
  'in': { label: 'Приход', color: 'bg-green-500/10 text-green-400', icon: ArrowDown },
  'out': { label: 'Расход', color: 'bg-red-500/10 text-red-400', icon: ArrowUp },
  'adjust': { label: 'Корректировка', color: 'bg-blue-500/10 text-blue-400', icon: RotateCw },
  'reserve': { label: 'Резерв', color: 'bg-orange-500/10 text-orange-400', icon: Minus },
  'unreserve': { label: 'Снятие резерва', color: 'bg-purple-500/10 text-purple-400', icon: Plus },
  'transfer': { label: 'Перемещение', color: 'bg-cyan-500/10 text-cyan-400', icon: Navigation }
};

const abcClassConfig = {
  'A': { label: 'A (высокооборотные)', color: 'bg-green-500/10 text-green-400' },
  'B': { label: 'B (среднеоборотные)', color: 'bg-yellow-500/10 text-yellow-400' },
  'C': { label: 'C (низкооборотные)', color: 'bg-orange-500/10 text-orange-400' },
  'N': { label: 'N (не классифицировано)', color: 'bg-gray-500/10 text-gray-400' }
};

const stockStatusConfig = {
  'in_stock': { label: 'В наличии', color: 'bg-green-500/10 text-green-400' },
  'low_stock': { label: 'Мало на складе', color: 'bg-yellow-500/10 text-yellow-400' },
  'out_of_stock': { label: 'Нет в наличии', color: 'bg-red-500/10 text-red-400' },
  'overstock': { label: 'Переизбыток', color: 'bg-blue-500/10 text-blue-400' }
};

const alertSeverityConfig = {
  'low': { label: 'Низкая', color: 'bg-blue-500/10 text-blue-400' },
  'medium': { label: 'Средняя', color: 'bg-yellow-500/10 text-yellow-400' },
  'high': { label: 'Высокая', color: 'bg-orange-500/10 text-orange-400' },
  'critical': { label: 'Критическая', color: 'bg-red-500/10 text-red-400' }
};

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSInventoryPartsModuleProps {
  onBackToModules?: () => void;
}

export function GTSInventoryPartsModule({ onBackToModules }: GTSInventoryPartsModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState<'overview' | 'stock' | 'movements' | 'suppliers' | 'analytics'>('overview');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [abcFilter, setAbcFilter] = useState<ABCClass | 'all'>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [showItemModal, setShowItemModal] = useState(false);
  const [showMovementModal, setShowMovementModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [selectedMovement, setSelectedMovement] = useState<Movement | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [items, setItems] = useState<Item[]>(mockItems);
  const [stock, setStock] = useState<Stock[]>(mockStock);
  const [movements, setMovements] = useState<Movement[]>(mockMovements);
  const [suppliers, setSuppliers] = useState<Supplier[]>(mockSuppliers);
  const [alerts, setAlerts] = useState<InventoryAlert[]>(mockAlerts);

  // Вычисляемые данные
  const stockWithItems = useMemo(() => {
    return stock.map(s => {
      const item = items.find(i => i.id === s.itemId);
      const location = mockLocations.find(l => l.id === s.locationId);
      
      let status: StockStatus = 'in_stock';
      if (s.availableQty === 0) {
        status = 'out_of_stock';
      } else if (item && s.availableQty <= item.minLevel) {
        status = 'low_stock';
      } else if (item && item.maxLevel && s.qty > item.maxLevel) {
        status = 'overstock';
      }
      
      return {
        ...s,
        item,
        location,
        status
      };
    });
  }, [stock, items]);

  // Фильтрация
  const filteredStockItems = useMemo(() => {
    return stockWithItems.filter(stockItem => {
      if (!stockItem.item) return false;
      
      const matchesSearch = 
        stockItem.item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stockItem.item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stockItem.item.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = categoryFilter === 'all' || stockItem.item.category === categoryFilter;
      const matchesABC = abcFilter === 'all' || stockItem.item.abcClass === abcFilter;
      const matchesLocation = locationFilter === 'all' || stockItem.locationId === locationFilter;
      
      return matchesSearch && matchesCategory && matchesABC && matchesLocation;
    });
  }, [stockWithItems, searchQuery, categoryFilter, abcFilter, locationFilter]);

  // Получение уникальных категорий
  const categories = useMemo(() => {
    return Array.from(new Set(items.map(item => item.category)));
  }, [items]);

  // Обработчики действий
  const handleCreateMovement = async (
    itemId: string, 
    locationId: string, 
    type: MovementType, 
    qty: number, 
    cost: number,
    reference?: string,
    notes?: string
  ) => {
    const item = items.find(i => i.id === itemId);
    if (!item) return;

    // Валидация для расходных операций
    if ((type === 'out' || type === 'reserve') && qty > 0) {
      const currentStock = stock.find(s => s.itemId === itemId && s.locationId === locationId);
      if (!currentStock || currentStock.availableQty < qty) {
        toast.error('Недостаточно товара на складе для списания/резерва');
        return;
      }
    }

    const newMovement: Movement = {
      id: `MOV-${Date.now()}`,
      itemId,
      locationId,
      type,
      qty: type === 'out' ? -qty : qty,
      cost,
      totalCost: (type === 'out' ? -qty : qty) * cost,
      reference: reference || `${type.toUpperCase()}-${Date.now()}`,
      notes,
      status: 'pending',
      createdBy: 'user:exec-1',
      createdAt: new Date().toISOString()
    };

    setMovements(prev => [newMovement, ...prev]);
    
    // Автоматическое проведение для простых операций
    if (type !== 'adjust') {
      await handlePostMovement(newMovement.id);
    }
    
    toast.success(`Движение "${movementTypeConfig[type].label}" создано`);
    
    // Логирование события
    console.log({
      type: type === 'out' ? 'PartIssued' : 'StockMovement',
      movementId: newMovement.id,
      itemId,
      movementType: type,
      quantity: qty,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handlePostMovement = async (movementId: string) => {
    const movement = movements.find(m => m.id === movementId);
    if (!movement || movement.status !== 'pending') return;

    // Обновление остатков
    const stockIndex = stock.findIndex(s => 
      s.itemId === movement.itemId && s.locationId === movement.locationId
    );

    if (stockIndex >= 0) {
      setStock(prev => prev.map((s, index) => {
        if (index === stockIndex) {
          const newQty = s.qty + movement.qty;
          const newReserved = movement.type === 'reserve' ? 
            s.reservedQty + Math.abs(movement.qty) :
            movement.type === 'unreserve' ?
            s.reservedQty - Math.abs(movement.qty) :
            s.reservedQty;
          
          return {
            ...s,
            qty: newQty,
            reservedQty: Math.max(0, newReserved),
            availableQty: newQty - Math.max(0, newReserved),
            totalValue: newQty * s.avgCost,
            lastMovementAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      }));
    } else if (movement.qty > 0) {
      // Создание новой записи остатка
      const newStock: Stock = {
        itemId: movement.itemId,
        locationId: movement.locationId,
        qty: movement.qty,
        reservedQty: movement.type === 'reserve' ? movement.qty : 0,
        availableQty: movement.type === 'reserve' ? 0 : movement.qty,
        totalValue: movement.totalCost,
        avgCost: movement.cost,
        lastMovementAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      setStock(prev => [...prev, newStock]);
    }

    // Обновление статуса движения
    setMovements(prev => prev.map(m => 
      m.id === movementId 
        ? { 
            ...m, 
            status: 'posted' as MovementStatus,
            postedAt: new Date().toISOString(),
            approvedBy: 'user:exec-1'
          }
        : m
    ));

    // Проверка алертов
    checkStockAlerts(movement.itemId, movement.locationId);

    toast.success('Движение проведено');
  };

  const checkStockAlerts = (itemId: string, locationId: string) => {
    const item = items.find(i => i.id === itemId);
    const stockItem = stock.find(s => s.itemId === itemId && s.locationId === locationId);
    
    if (!item || !stockItem) return;

    // Проверка на минимальный остаток
    if (stockItem.availableQty <= item.minLevel && stockItem.availableQty > 0) {
      const existingAlert = alerts.find(a => 
        a.type === 'low_stock' && a.itemId === itemId && a.locationId === locationId
      );
      
      if (!existingAlert) {
        const newAlert: InventoryAlert = {
          id: `ALT-${Date.now()}`,
          type: 'low_stock',
          itemId,
          locationId,
          message: `Остаток "${item.name}" ниже минимального уровня (${stockItem.availableQty} < ${item.minLevel})`,
          severity: 'medium',
          createdAt: new Date().toISOString()
        };
        
        setAlerts(prev => [newAlert, ...prev]);
        
        console.log({
          type: 'StockLow',
          alertId: newAlert.id,
          itemId,
          locationId,
          currentQty: stockItem.availableQty,
          minLevel: item.minLevel,
          timestamp: new Date().toISOString(),
          actor: 'system'
        });
      }
    }

    // Проверка на отсутствие остатка
    if (stockItem.availableQty === 0) {
      const existingAlert = alerts.find(a => 
        a.type === 'out_of_stock' && a.itemId === itemId && a.locationId === locationId
      );
      
      if (!existingAlert) {
        const newAlert: InventoryAlert = {
          id: `ALT-${Date.now()}`,
          type: 'out_of_stock',
          itemId,
          locationId,
          message: `Товар "${item.name}" закончился на складе`,
          severity: 'high',
          createdAt: new Date().toISOString()
        };
        
        setAlerts(prev => [newAlert, ...prev]);
      }
    }
  };

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert =>
      alert.id === alertId
        ? {
            ...alert,
            acknowledged: true,
            acknowledgedBy: 'user:exec-1',
            acknowledgedAt: new Date().toISOString()
          }
        : alert
    ));
    
    toast.success('Предупреждение отмечено как прочитанное');
  };

  // Компоненты значков
  const MovementTypeBadge = ({ type }: { type: MovementType }) => {
    const config = movementTypeConfig[type];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  const ABCClassBadge = ({ abcClass }: { abcClass: ABCClass }) => {
    const config = abcClassConfig[abcClass];
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  const StockStatusBadge = ({ status }: { status: StockStatus }) => {
    const config = stockStatusConfig[status];
    
    return (
      <Badge className={config.color}>
        {config.label}
      </Badge>
    );
  };

  // Обзорный экран
  const OverviewScreen = () => (
    <div className="space-y-6">
      {/* Критические алерты */}
      {alerts.filter(alert => !alert.acknowledged && alert.severity !== 'low').length > 0 && (
        <Card className="bg-[#121214] border-[#232428] border-red-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              Требуют внимания
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts
                .filter(alert => !alert.acknowledged && alert.severity !== 'low')
                .slice(0, 5)
                .map((alert) => {
                  const item = items.find(i => i.id === alert.itemId);
                  const location = mockLocations.find(l => l.id === alert.locationId);
                  
                  return (
                    <Alert key={alert.id} className={
                      alert.severity === 'critical' ? 'border-red-500/20 bg-red-500/5' :
                      alert.severity === 'high' ? 'border-orange-500/20 bg-orange-500/5' :
                      'border-yellow-500/20 bg-yellow-500/5'
                    }>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white font-medium">{item?.name}</div>
                            <p className="text-[#A6A7AA] text-sm">{alert.message}</p>
                            <p className="text-xs text-[#A6A7AA]">
                              {location?.name} • {new Date(alert.createdAt).toLocaleString('ru-RU')}
                            </p>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={alertSeverityConfig[alert.severity].color}>
                              {alertSeverityConfig[alert.severity].label}
                            </Badge>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleAcknowledgeAlert(alert.id)}
                            >
                              Принято
                            </Button>
                          </div>
                        </div>
                      </AlertDescription>
                    </Alert>
                  );
                })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Последние движения */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Activity className="w-5 h-5 text-blue-400" />
            Последние движения
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {movements
              .slice(0, 8)
              .map((movement) => {
                const item = items.find(i => i.id === movement.itemId);
                const location = mockLocations.find(l => l.id === movement.locationId);
                
                return (
                  <div 
                    key={movement.id}
                    className="p-4 rounded-lg border border-[#232428] bg-[#17181A] hover:bg-[#1F2024] transition-colors cursor-pointer"
                    onClick={() => {
                      setSelectedMovement(movement);
                      setShowMovementModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{item?.name}</span>
                          <MovementTypeBadge type={movement.type} />
                          <Badge className={
                            movement.status === 'posted' ? 'bg-green-500/10 text-green-400' :
                            movement.status === 'pending' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-gray-500/10 text-gray-400'
                          }>
                            {movement.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-[#A6A7AA]">
                          {location?.name} • Количество: {Math.abs(movement.qty)} {item?.unit} • 
                          Сумма: ₽{Math.abs(movement.totalCost).toLocaleString('ru-RU')}
                        </div>
                        <div className="flex items-center gap-4 mt-1 text-xs text-[#A6A7AA]">
                          <div className="flex items-center gap-1">
                            <Users className="w-3 h-3" />
                            {movement.createdBy}
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(movement.createdAt).toLocaleString('ru-RU')}
                          </div>
                          {movement.reference && (
                            <div className="flex items-center gap-1">
                              <FileSpreadsheet className="w-3 h-3" />
                              {movement.reference}
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {movement.status === 'pending' && (
                          <Button 
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePostMovement(movement.id);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Провести
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
                              <Eye className="w-4 h-4 mr-2" />
                              Подробнее
                            </DropdownMenuItem>
                            {movement.status === 'pending' && (
                              <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                <Edit3 className="w-4 h-4 mr-2" />
                                Редактировать
                              </DropdownMenuItem>
                            )}
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

      {/* Топ ABC-A позиций */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-green-400" />
            ABC-A позиции (высокооборотные)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {items
              .filter(item => item.abcClass === 'A')
              .slice(0, 5)
              .map((item) => {
                const totalStock = stock
                  .filter(s => s.itemId === item.id)
                  .reduce((sum, s) => sum + s.qty, 0);
                const totalValue = stock
                  .filter(s => s.itemId === item.id)
                  .reduce((sum, s) => sum + s.totalValue, 0);
                
                return (
                  <div key={item.id} className="p-3 rounded-lg border border-[#232428] bg-[#17181A]">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white font-medium">{item.name}</span>
                          <ABCClassBadge abcClass={item.abcClass} />
                        </div>
                        <div className="text-sm text-[#A6A7AA]">
                          SKU: {item.sku} • Категория: {item.category}
                        </div>
                        <div className="text-xs text-[#A6A7AA] mt-1">
                          Общий остаток: {totalStock} {item.unit} • 
                          Стоимость: ₽{totalValue.toLocaleString('ru-RU')}
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-white text-sm">
                          ₽{item.avgCost.toLocaleString('ru-RU')}
                        </div>
                        <div className="text-xs text-[#A6A7AA]">за {item.unit}</div>
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
              <ArrowDown className="w-5 h-5 mb-2" />
              <span className="text-sm">Приход товара</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <ArrowUp className="w-5 h-5 mb-2" />
              <span className="text-sm">Списание</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <RotateCw className="w-5 h-5 mb-2" />
              <span className="text-sm">Корректировка</span>
            </Button>
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A] h-auto p-4 flex-col">
              <FileSpreadsheet className="w-5 h-5 mb-2" />
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
            <span className="text-white">Inventory & Parts</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Склад запчастей</h1>
          <p className="text-[#A6A7AA]">
            Управление складскими остатками и движениями запчастей • {filteredStockItems.length} позиций
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-400">
            <Package className="w-3 h-3 mr-1" />
            {stock.reduce((sum, s) => sum + s.qty, 0)} единиц
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Новая позиция
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryKpis.map((kpi, index) => {
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
              <TabsTrigger value="stock" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Warehouse className="w-4 h-4 mr-2" />
                Остатки
              </TabsTrigger>
              <TabsTrigger value="movements" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Activity className="w-4 h-4 mr-2" />
                Движения
              </TabsTrigger>
              <TabsTrigger value="suppliers" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Factory className="w-4 h-4 mr-2" />
                Поставщики
              </TabsTrigger>
              <TabsTrigger value="analytics" className="text-[#A6A7AA] data-[state=active]:text-white">
                <BarChart3 className="w-4 h-4 mr-2" />
                Аналитика
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <OverviewScreen />
            </TabsContent>

            <TabsContent value="stock" className="mt-6">
              <div className="space-y-4">
                {/* Фильтры */}
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <Input
                      placeholder="Поиск запчастей..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="bg-[#17181A] border-[#232428]"
                    />
                  </div>
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-48 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Категория" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все категории</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={abcFilter} onValueChange={(value: any) => setAbcFilter(value)}>
                    <SelectTrigger className="w-40 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="ABC" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все ABC</SelectItem>
                      <SelectItem value="A">Класс A</SelectItem>
                      <SelectItem value="B">Класс B</SelectItem>
                      <SelectItem value="C">Класс C</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={locationFilter} onValueChange={setLocationFilter}>
                    <SelectTrigger className="w-48 bg-[#17181A] border-[#232428]">
                      <SelectValue placeholder="Локация" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="all">Все локации</SelectItem>
                      {mockLocations.map(location => (
                        <SelectItem key={location.id} value={location.id}>{location.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Таблица остатков */}
                <Card className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-0">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-[#232428] hover:bg-[#17181A]/50">
                          <TableHead className="text-[#A6A7AA]">Наименование</TableHead>
                          <TableHead className="text-[#A6A7AA]">SKU</TableHead>
                          <TableHead className="text-[#A6A7AA]">Локация</TableHead>
                          <TableHead className="text-[#A6A7AA]">Остаток</TableHead>
                          <TableHead className="text-[#A6A7AA]">Резерв</TableHead>
                          <TableHead className="text-[#A6A7AA]">Доступно</TableHead>
                          <TableHead className="text-[#A6A7AA]">Статус</TableHead>
                          <TableHead className="text-[#A6A7AA]">ABC</TableHead>
                          <TableHead className="text-[#A6A7AA]">Стоимость</TableHead>
                          <TableHead className="text-[#A6A7AA]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredStockItems.map((stockItem) => (
                          <TableRow 
                            key={`${stockItem.itemId}-${stockItem.locationId}`}
                            className="border-[#232428] hover:bg-[#17181A]/50 cursor-pointer"
                            onClick={() => {
                              setSelectedItem(stockItem.item!);
                              setShowItemModal(true);
                            }}
                          >
                            <TableCell>
                              <div>
                                <div className="text-white font-medium">{stockItem.item?.name}</div>
                                <div className="text-sm text-[#A6A7AA]">{stockItem.item?.category}</div>
                              </div>
                            </TableCell>
                            <TableCell className="text-white font-mono">{stockItem.item?.sku}</TableCell>
                            <TableCell className="text-white">{stockItem.location?.name}</TableCell>
                            <TableCell>
                              <div className="text-white font-medium">
                                {stockItem.qty} {stockItem.item?.unit}
                              </div>
                              <div className="text-xs text-[#A6A7AA]">
                                мин: {stockItem.item?.minLevel}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="text-orange-400">
                                {stockItem.reservedQty} {stockItem.item?.unit}
                              </span>
                            </TableCell>
                            <TableCell>
                              <span className="text-green-400">
                                {stockItem.availableQty} {stockItem.item?.unit}
                              </span>
                            </TableCell>
                            <TableCell>
                              <StockStatusBadge status={stockItem.status} />
                            </TableCell>
                            <TableCell>
                              <ABCClassBadge abcClass={stockItem.item?.abcClass!} />
                            </TableCell>
                            <TableCell>
                              <div className="text-white">
                                ₽{stockItem.totalValue.toLocaleString('ru-RU')}
                              </div>
                              <div className="text-xs text-[#A6A7AA]">
                                ₽{stockItem.avgCost} за {stockItem.item?.unit}
                              </div>
                            </TableCell>
                            <TableCell>
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
                                      // Приход
                                      const qty = Number(prompt('Количество для прихода:'));
                                      const cost = Number(prompt('Стоимость за единицу:'));
                                      if (qty > 0 && cost > 0) {
                                        handleCreateMovement(stockItem.itemId, stockItem.locationId, 'in', qty, cost);
                                      }
                                    }}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <ArrowDown className="w-4 h-4 mr-2" />
                                    Приход
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Списание
                                      const qty = Number(prompt('Количество для списания:'));
                                      if (qty > 0) {
                                        handleCreateMovement(stockItem.itemId, stockItem.locationId, 'out', qty, stockItem.avgCost);
                                      }
                                    }}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <ArrowUp className="w-4 h-4 mr-2" />
                                    Списание
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      // Резерв
                                      const qty = Number(prompt('Количество для резерва:'));
                                      if (qty > 0) {
                                        handleCreateMovement(stockItem.itemId, stockItem.locationId, 'reserve', qty, stockItem.avgCost, '', 'Резерв под заказ');
                                      }
                                    }}
                                    className="text-white hover:bg-[#17181A]"
                                  >
                                    <Minus className="w-4 h-4 mr-2" />
                                    Резерв
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="movements" className="mt-6">
              <div className="text-center py-12">
                <Activity className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Журнал движений</h3>
                <p className="text-[#A6A7AA]">
                  Детальная история всех операций с запчастями
                </p>
              </div>
            </TabsContent>

            <TabsContent value="suppliers" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Управление поставщиками</h3>
                
                <div className="grid gap-4">
                  {suppliers.map((supplier) => (
                    <Card key={supplier.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="text-white font-medium">{supplier.name}</h4>
                              <Badge variant="outline" className="text-xs">
                                {supplier.code}
                              </Badge>
                              <Badge className={
                                supplier.type === 'manufacturer' ? 'bg-green-500/10 text-green-400' :
                                supplier.type === 'distributor' ? 'bg-blue-500/10 text-blue-400' :
                                'bg-purple-500/10 text-purple-400'
                              }>
                                {supplier.type === 'manufacturer' ? 'Производитель' :
                                 supplier.type === 'distributor' ? 'Дистрибьютор' : 'Местный дилер'}
                              </Badge>
                            </div>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Качество</Label>
                                <div className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-400" />
                                  <span className="text-white text-sm">{supplier.qualityRating}</span>
                                </div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Поставки</Label>
                                <div className="text-white text-sm">{supplier.onTimeDeliveryRate}%</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Заказов</Label>
                                <div className="text-white text-sm">{supplier.totalOrders}</div>
                              </div>
                              <div>
                                <Label className="text-[#A6A7AA] text-xs">Сумма</Label>
                                <div className="text-white text-sm">
                                  ₽{(supplier.totalValue / 1000000).toFixed(1)}М
                                </div>
                              </div>
                            </div>
                            
                            <div className="text-sm text-[#A6A7AA]">
                              {supplier.contactPerson} • {supplier.phone} • 
                              Время поставки: {supplier.leadTimeDays} дней
                            </div>
                            <div className="text-xs text-[#A6A7AA] mt-1">
                              {supplier.address.city}, {supplier.address.region}
                            </div>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedSupplier(supplier);
                              setShowSupplierModal(true);
                            }}
                          >
                            Подробнее
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="text-center py-12">
                <BarChart3 className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Аналитика склада</h3>
                <p className="text-[#A6A7AA]">
                  ABC/XYZ анализ, оборачиваемость и прогнозирование потребности
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

export default GTSInventoryPartsModule;