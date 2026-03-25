// 🎯 GTS Bookings Module - Полная реализация согласно спецификации v2025-09-17
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
  DropdownMenuCheckboxItem,
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
  Package, Calendar, Users, Building2, DollarSign, FileText, Clock, 
  Star, Target, ArrowUpRight, Activity, CheckCircle, Bell, AlertTriangle,
  CreditCard,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  
  // Communication Icons
  Phone, Mail, MessageSquare, Send,
  
  // Document Icons
  FileText as DocumentIcon, PaperclipIcon, Download as DownloadIcon,
  
  // Navigation
  ArrowLeft, ArrowRight, Home
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type BookingStatus = 'draft' | 'hold' | 'confirmed' | 'cancelled' | 'completed' | 'refunded';
type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'refunded' | 'failed';
type DocumentStatus = 'pending' | 'signed' | 'expired';
type Channel = 'website' | 'phone' | 'avito' | 'partner' | 'repeat';

interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  serviceId: string;
  serviceName: string;
  date: string;
  slotId: string;
  slotTime: string;
  partySize: number;
  price: number;
  prepayment: number;
  channel: Channel;
  status: BookingStatus;
  tags: string[];
  notes: string;
  createdAt: string;
  updatedAt: string;
  assignedTo?: string;
  equipment?: string[];
  instructor?: string;
  location?: string;
}

interface Payment {
  id: string;
  bookingId: string;
  method: 'card' | 'cash' | 'transfer';
  amount: number;
  currency: string;
  status: PaymentStatus;
  txnId?: string;
  createdAt: string;
}

interface Document {
  id: string;
  bookingId: string;
  type: 'offer' | 'consent' | 'act' | 'waiver';
  status: DocumentStatus;
  fileId?: string;
  signedAt?: string;
}

interface BookingEvent {
  id: string;
  bookingId: string;
  type: string;
  actor: string;
  timestamp: string;
  metadata: Record<string, any>;
}

// 🎯 МОК ДАННЫЕ

const mockBookings: Booking[] = [
  {
    id: 'B-1001',
    customerId: 'C-001',
    customerName: 'Александров Владимир',
    customerPhone: '+7 (900) 123-45-67',
    customerEmail: 'aleksandrov@email.com',
    serviceId: 'S-023',
    serviceName: 'Вертолетная экскурсия VIP',
    date: '2025-10-02',
    slotId: 'SL-001',
    slotTime: '09:00-12:00',
    partySize: 3,
    price: 85000,
    prepayment: 25500,
    channel: 'website',
    status: 'hold',
    tags: ['VIP', 'Повторный клиент'],
    notes: 'Клиент просит русскоговорящего гида',
    createdAt: '2025-09-17T10:30:00Z',
    updatedAt: '2025-09-17T10:30:00Z',
    assignedTo: 'Петров А.И.',
    equipment: ['R66 Turbine'],
    instructor: 'Иванов С.М.',
    location: 'Сочи Аэропорт'
  },
  {
    id: 'B-1002',
    customerId: 'C-002',
    customerName: 'Смирнова Елена',
    customerPhone: '+7 (900) 234-56-78',
    customerEmail: 'smirnova@email.com',
    serviceId: 'S-015',
    serviceName: 'Морская прогулка на яхте',
    date: '2025-10-03',
    slotId: 'SL-002',
    slotTime: '14:00-18:00',
    partySize: 6,
    price: 45000,
    prepayment: 15000,
    channel: 'phone',
    status: 'confirmed',
    tags: ['Группа'],
    notes: '',
    createdAt: '2025-09-16T15:20:00Z',
    updatedAt: '2025-09-17T09:15:00Z',
    assignedTo: 'Козлов В.П.',
    equipment: ['Azimut 68'],
    instructor: 'Федоров М.А.'
  },
  {
    id: 'B-1003',
    customerId: 'C-003',
    customerName: 'Петров Игорь',
    customerPhone: '+7 (900) 345-67-89',
    customerEmail: 'petrov@email.com',
    serviceId: 'S-008',
    serviceName: 'Сафари на багги',
    date: '2025-09-18',
    slotId: 'SL-003',
    slotTime: '11:00-15:00',
    partySize: 2,
    price: 28000,
    prepayment: 8400,
    channel: 'avito',
    status: 'cancelled',
    tags: ['Отмена по погоде'],
    notes: 'Клиент согласился на перенос',
    createdAt: '2025-09-15T11:45:00Z',
    updatedAt: '2025-09-17T08:00:00Z'
  }
];

const mockPayments: Payment[] = [
  {
    id: 'P-001',
    bookingId: 'B-1001',
    method: 'card',
    amount: 25500,
    currency: 'RUB',
    status: 'captured',
    txnId: 'TXN-001',
    createdAt: '2025-09-17T10:31:00Z'
  },
  {
    id: 'P-002',
    bookingId: 'B-1002',
    method: 'cash',
    amount: 45000,
    currency: 'RUB',
    status: 'captured',
    createdAt: '2025-09-17T09:16:00Z'
  }
];

const mockDocuments: Document[] = [
  {
    id: 'D-001',
    bookingId: 'B-1001',
    type: 'offer',
    status: 'signed',
    fileId: 'F-001',
    signedAt: '2025-09-17T10:32:00Z'
  },
  {
    id: 'D-002',
    bookingId: 'B-1002',
    type: 'consent',
    status: 'signed',
    fileId: 'F-002',
    signedAt: '2025-09-17T09:17:00Z'
  }
];

// 🎯 ФИЛЬТРЫ И ПРЕДСТАВЛЕНИЯ

const savedViews = [
  { id: 'today', name: 'Сегодня', count: 12, active: false },
  { id: 'problematic', name: 'Проблемные', count: 5, active: false },
  { id: 'channels', name: 'По каналам', count: 18, active: false },
  { id: 'holds', name: 'На подтверждении', count: 8, active: true },
  { id: 'vip', name: 'VIP клиенты', count: 3, active: false }
];

// 🎯 СТАТУС МАШИНЫ

const statusTransitions: Record<BookingStatus, BookingStatus[]> = {
  'draft': ['hold', 'cancelled'],
  'hold': ['confirmed', 'cancelled'],
  'confirmed': ['completed', 'cancelled'],
  'cancelled': ['hold'],
  'completed': ['refunded'],
  'refunded': []
};

const statusConfig = {
  'draft': { label: 'Черновик', color: 'bg-gray-500/10 text-gray-400', icon: Edit3 },
  'hold': { label: 'Hold', color: 'bg-yellow-500/10 text-yellow-400', icon: Pause },
  'confirmed': { label: 'Подтверждено', color: 'bg-green-500/10 text-green-400', icon: CheckCircle2 },
  'cancelled': { label: 'Отменено', color: 'bg-red-500/10 text-red-400', icon: XCircle },
  'completed': { label: 'Выполнено', color: 'bg-blue-500/10 text-blue-400', icon: CheckCircle },
  'refunded': { label: 'Возврат', color: 'bg-purple-500/10 text-purple-400', icon: RotateCcw }
};

// 🎯 KPI МЕТРИКИ

const bookingKpis = [
  {
    title: "Конверсия Lead → Hold",
    value: "73%",
    change: "+5.2%",
    trend: "up",
    icon: Target,
    description: "За последние 30 дней"
  },
  {
    title: "Средний чек",
    value: "₽52,400",
    change: "+12.1%", 
    trend: "up",
    icon: DollarSign,
    description: "Рост к прошлому месяцу"
  },
  {
    title: "No-show rate",
    value: "3.2%",
    change: "-1.8%",
    trend: "down",
    icon: AlertTriangle,
    description: "Снижение благодаря напоминаниям"
  },
  {
    title: "Время Hold → Confirmed",
    value: "2.4ч",
    change: "-0.6ч",
    trend: "down", 
    icon: Clock,
    description: "Среднее время подтверждения"
  }
];

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSBookingsModuleProps {
  onBackToModules?: () => void;
}

export function GTSBookingsModule({ onBackToModules }: GTSBookingsModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState('holds');
  const [selectedBookings, setSelectedBookings] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [channelFilter, setChannelFilter] = useState<Channel | 'all'>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);

  // Хоткеи
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // C - Confirm
      if (e.key === 'c' && selectedBookings.length > 0) {
        e.preventDefault();
        handleBulkConfirm();
      }
      // H - Hold
      if (e.key === 'h' && selectedBookings.length > 0) {
        e.preventDefault();
        handleBulkHold();
      }
      // R - Reschedule
      if (e.key === 'r' && selectedBookings.length === 1) {
        e.preventDefault();
        handleReschedule(selectedBookings[0]);
      }
      // ⌘E - Edit
      if ((e.metaKey || e.ctrlKey) && e.key === 'e' && selectedBookings.length === 1) {
        e.preventDefault();
        const booking = bookings.find(b => b.id === selectedBookings[0]);
        if (booking) {
          setSelectedBooking(booking);
          setShowBookingModal(true);
        }
      }
      // ⌘⇧F - Filters
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'F') {
        e.preventDefault();
        // Focus на фильтр
        document.getElementById('booking-filters')?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedBookings, bookings]);

  // Фильтрация бронирований
  const filteredBookings = useMemo(() => {
    return bookings.filter(booking => {
      const matchesSearch = 
        booking.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.serviceName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
      const matchesChannel = channelFilter === 'all' || booking.channel === channelFilter;
      
      let matchesDate = true;
      if (dateFilter === 'today') {
        const today = new Date().toISOString().split('T')[0];
        matchesDate = booking.date === today;
      } else if (dateFilter === 'week') {
        const weekFromNow = new Date();
        weekFromNow.setDate(weekFromNow.getDate() + 7);
        matchesDate = new Date(booking.date) <= weekFromNow;
      }

      return matchesSearch && matchesStatus && matchesChannel && matchesDate;
    });
  }, [bookings, searchQuery, statusFilter, channelFilter, dateFilter]);

  // Действия
  const handleStatusChange = async (bookingId: string, newStatus: BookingStatus) => {
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    // Проверка допустимых переходов
    if (!statusTransitions[booking.status].includes(newStatus)) {
      toast.error(`Переход ${booking.status} → ${newStatus} недопустим`);
      return;
    }

    // Обновление с optimistic UI
    setBookings(prev => prev.map(b => 
      b.id === bookingId 
        ? { ...b, status: newStatus, updatedAt: new Date().toISOString() }
        : b
    ));

    // Симуляция API вызова
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`Статус изменен на "${statusConfig[newStatus].label}"`);
      
      // Логирование события
      console.log({
        type: 'BookingStatusChanged',
        bookingId,
        oldStatus: booking.status,
        newStatus,
        timestamp: new Date().toISOString(),
        actor: 'user:exec-1'
      });
    } catch (error) {
      // Откат при ошибке
      setBookings(prev => prev.map(b => 
        b.id === bookingId ? booking : b
      ));
      toast.error('Ошибка при изменении статуса');
    }
  };

  const handleBulkConfirm = async () => {
    const confirmableBookings = selectedBookings.filter(id => {
      const booking = bookings.find(b => b.id === id);
      return booking && statusTransitions[booking.status].includes('confirmed');
    });

    if (confirmableBookings.length === 0) {
      toast.error('Нет бронирований для подтверждения');
      return;
    }

    // Bulk операция
    setBookings(prev => prev.map(booking => 
      confirmableBookings.includes(booking.id)
        ? { ...booking, status: 'confirmed' as BookingStatus, updatedAt: new Date().toISOString() }
        : booking
    ));

    toast.success(`Подтверждено ${confirmableBookings.length} бронирований`);
    setSelectedBookings([]);
  };

  const handleBulkHold = async () => {
    const holdableBookings = selectedBookings.filter(id => {
      const booking = bookings.find(b => b.id === id);
      return booking && statusTransitions[booking.status].includes('hold');
    });

    setBookings(prev => prev.map(booking => 
      holdableBookings.includes(booking.id)
        ? { ...booking, status: 'hold' as BookingStatus, updatedAt: new Date().toISOString() }
        : booking
    ));

    toast.success(`${holdableBookings.length} бронирований переведено в Hold`);
    setSelectedBookings([]);
  };

  const handleReschedule = (bookingId: string) => {
    toast.info('Открывается модуль переноса даты...');
    // Интеграция с модулем календаря
  };

  const handleSendDocument = (bookingId: string, docType: string) => {
    toast.success(`Документ "${docType}" отправлен клиенту`);
  };

  const handleCreateDispatch = (bookingId: string) => {
    toast.info('Создается задача в Dispatch...');
    // Интеграция с модулем Dispatch
  };

  // Компонент статуса
  const StatusBadge = ({ status }: { status: BookingStatus }) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  // Компонент канала
  const ChannelBadge = ({ channel }: { channel: Channel }) => {
    const channelConfig = {
      'website': { label: 'Сайт', color: 'bg-blue-500/10 text-blue-400' },
      'phone': { label: 'Телефон', color: 'bg-green-500/10 text-green-400' },
      'avito': { label: 'Avito', color: 'bg-orange-500/10 text-orange-400' },
      'partner': { label: 'Партнер', color: 'bg-purple-500/10 text-purple-400' },
      'repeat': { label: 'Повторный', color: 'bg-cyan-500/10 text-cyan-400' }
    };

    return (
      <Badge variant="outline" className={channelConfig[channel].color}>
        {channelConfig[channel].label}
      </Badge>
    );
  };

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
            <span className="text-white">Bookings</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Управление бронированиями</h1>
          <p className="text-[#A6A7AA]">
            Заказы, платежи, документооборот • {filteredBookings.length} из {bookings.length} записей
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/10 text-blue-400">
            <Activity className="w-3 h-3 mr-1" />
            Обновлено 2 мин назад
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Новое бронирование
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {bookingKpis.map((kpi, index) => {
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
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Сохраненные представления */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Eye className="w-4 h-4 text-[#A6A7AA]" />
            <span className="font-medium text-white">Сохраненные представления</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {savedViews.map((view) => (
              <button
                key={view.id}
                onClick={() => setActiveView(view.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeView === view.id
                    ? 'bg-[#91040C] text-white'
                    : 'bg-[#17181A] text-[#A6A7AA] hover:bg-[#1F2024] hover:text-white'
                }`}
              >
                {view.name}
                <Badge variant="outline" className="ml-2 text-xs">
                  {view.count}
                </Badge>
              </button>
            ))}
            <Button variant="outline" size="sm" className="border-[#232428] text-[#A6A7AA] hover:bg-[#17181A] hover:text-white">
              <Plus className="w-3 h-3 mr-1" />
              Новое представление
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Фильтры и поиск */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#A6A7AA] h-4 w-4" />
              <Input
                id="booking-filters"
                placeholder="Поиск по клиенту, ID, услуге, email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#17181A] border-[#232428] text-white"
              />
            </div>
            
            {/* Фильтр по статусу */}
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-40 bg-[#17181A] border-[#232428] text-white">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent className="bg-[#121214] border-[#232428]">
                <SelectItem value="all" className="text-white">Все статусы</SelectItem>
                <SelectItem value="hold" className="text-white">Hold</SelectItem>
                <SelectItem value="confirmed" className="text-white">Подтверждено</SelectItem>
                <SelectItem value="cancelled" className="text-white">Отменено</SelectItem>
                <SelectItem value="completed" className="text-white">Выполнено</SelectItem>
              </SelectContent>
            </Select>

            {/* Фильтр по каналу */}
            <Select value={channelFilter} onValueChange={(value: any) => setChannelFilter(value)}>
              <SelectTrigger className="w-40 bg-[#17181A] border-[#232428] text-white">
                <SelectValue placeholder="Канал" />
              </SelectTrigger>
              <SelectContent className="bg-[#121214] border-[#232428]">
                <SelectItem value="all" className="text-white">Все каналы</SelectItem>
                <SelectItem value="website" className="text-white">Сайт</SelectItem>
                <SelectItem value="phone" className="text-white">Телефон</SelectItem>
                <SelectItem value="avito" className="text-white">Avito</SelectItem>
                <SelectItem value="partner" className="text-white">Партнеры</SelectItem>
              </SelectContent>
            </Select>

            {/* Фильтр по дате */}
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-40 bg-[#17181A] border-[#232428] text-white">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent className="bg-[#121214] border-[#232428]">
                <SelectItem value="all" className="text-white">Все даты</SelectItem>
                <SelectItem value="today" className="text-white">Сегодня</SelectItem>
                <SelectItem value="week" className="text-white">Эта неделя</SelectItem>
                <SelectItem value="month" className="text-white">Этот месяц</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
              <Filter className="w-4 h-4 mr-2" />
              Больше фильтров
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Действия и статистика */}
      {selectedBookings.length > 0 && (
        <Card className="bg-[#121214] border-[#232428] border-[#91040C]/30">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-white font-medium">
                  Выбрано: {selectedBookings.length} бронирований
                </span>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    onClick={handleBulkConfirm}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle2 className="w-4 h-4 mr-1" />
                    Подтвердить (C)
                  </Button>
                  <Button 
                    size="sm" 
                    onClick={handleBulkHold}
                    variant="outline" 
                    className="border-yellow-600 text-yellow-400 hover:bg-yellow-600/10"
                  >
                    <Pause className="w-4 h-4 mr-1" />
                    Hold (H)
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-[#232428] text-white hover:bg-[#17181A]"
                  >
                    <Ban className="w-4 h-4 mr-1" />
                    Отменить
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                        Еще <ChevronDown className="w-4 h-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="bg-[#121214] border-[#232428]">
                      <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                        <Download className="w-4 h-4 mr-2" />
                        Экспорт выбранных
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Массовая рассылка
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-[#232428]" />
                      <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                        <Copy className="w-4 h-4 mr-2" />
                        Дублировать
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSelectedBookings([])}
                className="text-[#A6A7AA] hover:text-white"
              >
                Отменить выбор
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Таблица бронирований */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white">Список бронирований</CardTitle>
              <CardDescription className="text-[#A6A7AA]">
                Отфильтровано {filteredBookings.length} из {bookings.length} записей
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                <Upload className="w-4 h-4 mr-2" />
                Импорт
              </Button>
              <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                <Download className="w-4 h-4 mr-2" />
                Экспорт CSV
              </Button>
              <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                <RefreshCw className="w-4 h-4 mr-2" />
                Обновить
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[#232428] hover:bg-transparent">
                  <TableHead className="w-12">
                    <Checkbox
                      checked={selectedBookings.length === filteredBookings.length}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedBookings(filteredBookings.map(b => b.id));
                        } else {
                          setSelectedBookings([]);
                        }
                      }}
                    />
                  </TableHead>
                  <TableHead className="text-[#A6A7AA]">ID / Дата</TableHead>
                  <TableHead className="text-[#A6A7AA]">Клиент</TableHead>
                  <TableHead className="text-[#A6A7AA]">Услуга</TableHead>
                  <TableHead className="text-[#A6A7AA]">Статус</TableHead>
                  <TableHead className="text-[#A6A7AA]">Канал</TableHead>
                  <TableHead className="text-[#A6A7AA]">Сумма</TableHead>
                  <TableHead className="text-[#A6A7AA]">Гости</TableHead>
                  <TableHead className="text-[#A6A7AA] w-12">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBookings.map((booking) => (
                  <TableRow 
                    key={booking.id}
                    className="border-[#232428] hover:bg-[#17181A]/50 cursor-pointer"
                    onClick={() => {
                      setSelectedBooking(booking);
                      setShowBookingModal(true);
                    }}
                  >
                    <TableCell>
                      <Checkbox
                        checked={selectedBookings.includes(booking.id)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedBookings(prev => [...prev, booking.id]);
                          } else {
                            setSelectedBookings(prev => prev.filter(id => id !== booking.id));
                          }
                        }}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-mono text-white text-sm">{booking.id}</div>
                        <div className="text-[#A6A7AA] text-xs">
                          {new Date(booking.date).toLocaleDateString('ru-RU')} • {booking.slotTime}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-white font-medium">{booking.customerName}</div>
                        <div className="text-[#A6A7AA] text-sm">{booking.customerPhone}</div>
                        {booking.tags.length > 0 && (
                          <div className="flex gap-1 mt-1">
                            {booking.tags.slice(0, 2).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-white">{booking.serviceName}</div>
                        <div className="text-[#A6A7AA] text-sm">
                          {booking.equipment && booking.equipment.join(', ')}
                        </div>
                        {booking.instructor && (
                          <div className="text-[#A6A7AA] text-xs">
                            Инструктор: {booking.instructor}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={booking.status} />
                    </TableCell>
                    <TableCell>
                      <ChannelBadge channel={booking.channel} />
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-white font-medium">
                          ₽{booking.price.toLocaleString()}
                        </div>
                        {booking.prepayment > 0 && (
                          <div className="text-[#A6A7AA] text-sm">
                            Предоплата: ₽{booking.prepayment.toLocaleString()}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4 text-[#A6A7AA]" />
                        <span className="text-white">{booking.partySize}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 text-[#A6A7AA] hover:text-white hover:bg-[#17181A]"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                          <DropdownMenuLabel className="text-[#A6A7AA]">Действия</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-[#232428]" />
                          
                          {/* Переходы по статусам */}
                          {statusTransitions[booking.status].map(newStatus => (
                            <DropdownMenuItem 
                              key={newStatus}
                              className="text-white hover:bg-[#17181A]"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleStatusChange(booking.id, newStatus);
                              }}
                            >
                              {React.createElement(statusConfig[newStatus].icon, { className: "w-4 h-4 mr-2" })}
                              {statusConfig[newStatus].label}
                            </DropdownMenuItem>
                          ))}
                          
                          <DropdownMenuSeparator className="bg-[#232428]" />
                          
                          <DropdownMenuItem 
                            className="text-white hover:bg-[#17181A]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleReschedule(booking.id);
                            }}
                          >
                            <Calendar className="w-4 h-4 mr-2" />
                            Перенести (R)
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="text-white hover:bg-[#17181A]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSendDocument(booking.id, 'offer');
                            }}
                          >
                            <Send className="w-4 h-4 mr-2" />
                            Отправить оферту
                          </DropdownMenuItem>
                          
                          <DropdownMenuItem 
                            className="text-white hover:bg-[#17181A]"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCreateDispatch(booking.id);
                            }}
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Создать выезд
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredBookings.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">Бронирования не найдены</h3>
              <p className="text-[#A6A7AA] mb-4">
                Попробуйте изменить фильтры или создать новое бронирование
              </p>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                <Plus className="w-4 h-4 mr-2" />
                Создать бронирование
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Модальное окно карточки бронирования */}
      {selectedBooking && (
        <Dialog open={showBookingModal} onOpenChange={setShowBookingModal}>
          <DialogContent className="max-w-4xl bg-[#121214] border-[#232428] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl text-white">
                    Бронирование {selectedBooking.id}
                  </DialogTitle>
                  <DialogDescription className="text-[#A6A7AA]">
                    Создано {new Date(selectedBooking.createdAt).toLocaleString('ru-RU')}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedBooking.status} />
                  <ChannelBadge channel={selectedBooking.channel} />
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-5 bg-[#17181A]">
                <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="payments" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Платежи
                </TabsTrigger>
                <TabsTrigger value="communications" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Связь
                </TabsTrigger>
                <TabsTrigger value="documents" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Документы
                </TabsTrigger>
                <TabsTrigger value="history" className="text-[#A6A7AA] data-[state=active]:text-white">
                  История
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Информация о клиенте */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Клиент</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-[#A6A7AA]">Имя</Label>
                        <div className="text-white font-medium">{selectedBooking.customerName}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Телефон</Label>
                        <div className="text-white">{selectedBooking.customerPhone}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Email</Label>
                        <div className="text-white">{selectedBooking.customerEmail}</div>
                      </div>
                      {selectedBooking.tags.length > 0 && (
                        <div>
                          <Label className="text-[#A6A7AA]">Теги</Label>
                          <div className="flex gap-1 mt-1">
                            {selectedBooking.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Информация об услуге */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Услуга</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-[#A6A7AA]">Название</Label>
                        <div className="text-white font-medium">{selectedBooking.serviceName}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Дата и время</Label>
                        <div className="text-white">
                          {new Date(selectedBooking.date).toLocaleDateString('ru-RU')} • {selectedBooking.slotTime}
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Количество гостей</Label>
                        <div className="text-white">{selectedBooking.partySize}</div>
                      </div>
                      {selectedBooking.location && (
                        <div>
                          <Label className="text-[#A6A7AA]">Место встречи</Label>
                          <div className="text-white">{selectedBooking.location}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Финансовая информация */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Оплата</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-[#A6A7AA]">Стоимость</Label>
                        <div className="text-white font-bold text-xl">
                          ₽{selectedBooking.price.toLocaleString()}
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Предоплата</Label>
                        <div className="text-white">₽{selectedBooking.prepayment.toLocaleString()}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Остаток</Label>
                        <div className="text-white">
                          ₽{(selectedBooking.price - selectedBooking.prepayment).toLocaleString()}
                        </div>
                      </div>
                      <Progress 
                        value={(selectedBooking.prepayment / selectedBooking.price) * 100} 
                        className="h-2"
                      />
                    </CardContent>
                  </Card>

                  {/* Исполнители */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Исполнители</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {selectedBooking.assignedTo && (
                        <div>
                          <Label className="text-[#A6A7AA]">Менеджер</Label>
                          <div className="text-white">{selectedBooking.assignedTo}</div>
                        </div>
                      )}
                      {selectedBooking.instructor && (
                        <div>
                          <Label className="text-[#A6A7AA]">Инструктор</Label>
                          <div className="text-white">{selectedBooking.instructor}</div>
                        </div>
                      )}
                      {selectedBooking.equipment && selectedBooking.equipment.length > 0 && (
                        <div>
                          <Label className="text-[#A6A7AA]">Техника</Label>
                          <div className="text-white">{selectedBooking.equipment.join(', ')}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Заметки */}
                {selectedBooking.notes && (
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Заметки</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-white">{selectedBooking.notes}</div>
                    </CardContent>
                  </Card>
                )}

                {/* Действия */}
                <div className="flex items-center gap-2 pt-4">
                  {statusTransitions[selectedBooking.status].map(newStatus => (
                    <Button
                      key={newStatus}
                      onClick={() => handleStatusChange(selectedBooking.id, newStatus)}
                      className={
                        newStatus === 'confirmed' 
                          ? "bg-green-600 hover:bg-green-700" 
                          : newStatus === 'cancelled'
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-[#91040C] hover:bg-[#91040C]/90"
                      }
                    >
                      {React.createElement(statusConfig[newStatus].icon, { className: "w-4 h-4 mr-2" })}
                      {statusConfig[newStatus].label}
                    </Button>
                  ))}
                  <Button 
                    variant="outline" 
                    className="border-[#232428] text-white hover:bg-[#17181A]"
                    onClick={() => handleReschedule(selectedBooking.id)}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Перенести
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-[#232428] text-white hover:bg-[#17181A]"
                    onClick={() => handleCreateDispatch(selectedBooking.id)}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Создать выезд
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="payments" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <CreditCard className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Платежи и возвраты</h3>
                  <p className="text-[#A6A7AA]">
                    История транзакций, возвраты, комиссии
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="communications" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">История общения</h3>
                  <p className="text-[#A6A7AA]">
                    SMS, email, звонки, уведомления
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="documents" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <DocumentIcon className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Документооборот</h3>
                  <p className="text-[#A6A7AA]">
                    Оферты, согласия, акты, подписи
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Журнал изменений</h3>
                  <p className="text-[#A6A7AA]">
                    Все действия и изменения по заказу
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Хоткеи подсказка */}
      <Card className="bg-[#121214] border-[#232428] fixed bottom-4 right-4 w-80 z-50">
        <CardContent className="p-3">
          <div className="text-xs text-[#A6A7AA] space-y-1">
            <div><kbd className="bg-[#17181A] px-1 rounded">C</kbd> Подтвердить • <kbd className="bg-[#17181A] px-1 rounded">H</kbd> Hold • <kbd className="bg-[#17181A] px-1 rounded">R</kbd> Перенести</div>
            <div><kbd className="bg-[#17181A] px-1 rounded">⌘E</kbd> Редактировать • <kbd className="bg-[#17181A] px-1 rounded">⌘⇧F</kbd> Фильтры</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GTSBookingsModule;