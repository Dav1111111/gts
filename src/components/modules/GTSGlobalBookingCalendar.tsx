import { useState, useMemo, useEffect } from "react";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { GTSRealTimeStatus } from "./GTSRealTimeStatus";
import { GTSNotificationsPanel } from "./GTSNotificationsPanel";
import { GTSResourcePlanningPanel } from "./GTSResourcePlanningPanel";
import useBookingSystem from "../../hooks/useBookingSystem";
import { usePushNotifications } from "../../hooks/usePushNotifications";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  Calendar,
  Clock,
  Users,
  MapPin,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  BarChart3,
  Eye,
  Edit,
  Trash2,
  MoreVertical,
  Settings,
  Anchor,
  Plane,
  Car,
  User,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  FileText,
  DollarSign,
  Download
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

// Types
type ViewMode = 'month' | 'week' | 'day' | 'resource';
type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
type ResourceType = 'boat' | 'helicopter' | 'buggy' | 'staff';
type UserRole = 'executive' | 'dispatcher' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'partner';
type WeatherCondition = 'sunny' | 'cloudy' | 'partly_cloudy' | 'rainy' | 'windy';

interface Booking {
  id: string;
  title: string;
  client: {
    name: string;
    company?: string;
    phone: string;
    email: string;
  };
  resource: {
    id: string;
    name: string;
    type: ResourceType;
  };
  crew: {
    id: string;
    name: string;
    role: string;
  }[];
  partner?: {
    id: string;
    name: string;
    commission: number;
  };
  datetime: {
    start: string;
    end: string;
    date: string;
  };
  guests: number;
  status: BookingStatus;
  price: number;
  weather: {
    temp: number;
    condition: WeatherCondition;
    wind: number;
    warnings?: string[];
  };
  documents: {
    contract?: string;
    insurance?: string;
    permits?: string[];
  };
  notes?: string;
}

interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: 'available' | 'booked' | 'maintenance' | 'offline';
  location: string;
  capacity: number;
  assignedCrew?: string[];
  partnerId?: string;
}

interface GTSGlobalBookingCalendarProps {
  userRole: UserRole;
  onLogin: () => void;
  onBack?: () => void;
}

// Mock data
const mockBookings: Booking[] = [
  {
    id: '1',
    title: 'VIP Морская прогулка',
    client: {
      name: 'Иванов Александр Михайлович',
      company: 'ООО "Альфа-Строй"',
      phone: '+7 (999) 123-45-67',
      email: 'ivanov@alfastroy.ru'
    },
    resource: {
      id: 'boat-001',
      name: 'Катер "Морской Волк"',
      type: 'boat'
    },
    crew: [
      { id: 'crew-001', name: 'Капитан Петров', role: 'Капитан' },
      { id: 'crew-002', name: 'Матрос Сидоров', role: 'Матрос' }
    ],
    partner: {
      id: 'partner-001',
      name: 'Сочи Тур Агент',
      commission: 15
    },
    datetime: {
      start: '10:00',
      end: '14:00',
      date: '2024-02-15'
    },
    guests: 8,
    status: 'confirmed',
    price: 120000,
    weather: {
      temp: 22,
      condition: 'sunny',
      wind: 8,
      warnings: []
    },
    documents: {
      contract: 'contract_001.pdf',
      insurance: 'insurance_001.pdf',
      permits: ['permit_sea_001.pdf']
    },
    notes: 'Корпоративное мероприятие, нужен фуршет на борту'
  },
  {
    id: '2',
    title: 'Вертолётная экскурсия',
    client: {
      name: 'Смирнова Ольга Владимировна',
      phone: '+7 (999) 234-56-78',
      email: 'o.smirnova@email.com'
    },
    resource: {
      id: 'helicopter-001',
      name: 'Вертолёт Robinson R44',
      type: 'helicopter'
    },
    crew: [
      { id: 'crew-003', name: 'Пилот Козлов', role: 'Пилот' }
    ],
    datetime: {
      start: '09:00',
      end: '10:30',
      date: '2024-02-16'
    },
    guests: 3,
    status: 'pending',
    price: 180000,
    weather: {
      temp: 18,
      condition: 'cloudy',
      wind: 15,
      warnings: ['Сильный ветер, возможна отмена']
    },
    documents: {
      contract: 'contract_002.pdf'
    }
  },
  {
    id: '3',
    title: 'Багги-приключение',
    client: {
      name: 'Команда "Экстрим"',
      company: 'Adventure Team',
      phone: '+7 (999) 345-67-89',
      email: 'info@extremteam.ru'
    },
    resource: {
      id: 'buggy-001',
      name: 'Багги Polaris RZR XP',
      type: 'buggy'
    },
    crew: [
      { id: 'crew-004', name: 'Инструктор Волков', role: 'Инструктор' }
    ],
    datetime: {
      start: '15:00',
      end: '18:00',
      date: '2024-02-15'
    },
    guests: 4,
    status: 'confirmed',
    price: 45000,
    weather: {
      temp: 20,
      condition: 'partly_cloudy',
      wind: 12
    },
    documents: {
      contract: 'contract_003.pdf',
      insurance: 'insurance_003.pdf'
    }
  }
];

const mockResources: Resource[] = [
  {
    id: 'boat-001',
    name: 'Катер "Морской Волк"',
    type: 'boat',
    status: 'booked',
    location: 'Пирс А1',
    capacity: 12,
    assignedCrew: ['crew-001', 'crew-002']
  },
  {
    id: 'boat-002',
    name: 'Катер "Белый Парус"',
    type: 'boat',
    status: 'available',
    location: 'Пирс А2',
    capacity: 8,
    assignedCrew: ['crew-005']
  },
  {
    id: 'helicopter-001',
    name: 'Вертолёт Robinson R44',
    type: 'helicopter',
    status: 'available',
    location: 'Площадка H1',
    capacity: 4,
    assignedCrew: ['crew-003']
  },
  {
    id: 'buggy-001',
    name: 'Багги Polaris RZR XP',
    type: 'buggy',
    status: 'available',
    location: 'База Красная поляна',
    capacity: 2,
    assignedCrew: ['crew-004']
  },
  {
    id: 'buggy-002',
    name: 'Багги Honda Talon',
    type: 'buggy',
    status: 'maintenance',
    location: 'Сервис',
    capacity: 4,
    assignedCrew: []
  }
];

const weatherData = [
  { date: '2024-02-15', temp: 22, condition: 'sunny' as WeatherCondition, wind: 8, humidity: 65 },
  { date: '2024-02-16', temp: 18, condition: 'cloudy' as WeatherCondition, wind: 15, humidity: 78 },
  { date: '2024-02-17', temp: 15, condition: 'rainy' as WeatherCondition, wind: 20, humidity: 85 },
  { date: '2024-02-18', temp: 25, condition: 'sunny' as WeatherCondition, wind: 5, humidity: 55 },
];

const resourceTypeIcons = {
  boat: Anchor,
  helicopter: Plane,
  buggy: Car,
  staff: User
};

const statusColors = {
  pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  confirmed: "bg-green-500/20 text-green-400 border-green-500/30",
  completed: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  cancelled: "bg-red-500/20 text-red-400 border-red-500/30"
};

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  partly_cloudy: Cloud,
  rainy: CloudRain,
  windy: Wind
};

export function GTSGlobalBookingCalendar({ userRole, onLogin, onBack }: GTSGlobalBookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('resource');
  const [selectedResource, setSelectedResource] = useState<string>('boat-001');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showWeather, setShowWeather] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [showBookingDetails, setShowBookingDetails] = useState(false);
  const [utilizationData, setUtilizationData] = useState<any>(null);
  const [planningRecommendations, setPlanningRecommendations] = useState<any[]>([]);

  // Supabase integration
  const {
    bookings,
    notifications,
    loading,
    error,
    connected,
    lastUpdated,
    fetchBookings,
    createBooking,
    updateBooking,
    deleteBooking,
    refresh,
    unreadCount,
    todayBookings,
    markNotificationAsRead,
    fetchNotifications
  } = useBookingSystem({
    enableRealTime: true,
    pollInterval: 30000, // 30 seconds
    autoRefresh: true
  });

  // Push notifications
  const {
    supported: pushSupported,
    permission: pushPermission,
    subscribe: subscribeToPush,
    showNotification,
    canNotify
  } = usePushNotifications({
    enableOnLogin: true,
    autoRequestPermission: true
  });

  // Role-based access control
  const canEdit = ['executive', 'dispatcher'].includes(userRole);
  const canViewAll = ['executive', 'dispatcher', 'partner'].includes(userRole);
  
  // Initial data load
  useEffect(() => {
    const loadData = async () => {
      const today = new Date().toISOString().split('T')[0];
      const weekLater = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      await fetchBookings({
        date_from: today,
        date_to: weekLater
      });
    };
    
    loadData();
  }, [fetchBookings]);

  // Auto-refresh when date changes
  useEffect(() => {
    const dateStr = currentDate.toISOString().split('T')[0];
    const filters: any = { date_from: dateStr, date_to: dateStr };
    
    if (selectedResource !== 'all') {
      filters.resource_id = selectedResource;
    }
    
    fetchBookings(filters);
    fetchUtilizationData();
  }, [currentDate, selectedResource, fetchBookings]);

  // Handle push notifications
  useEffect(() => {
    if (notifications.length > 0 && canNotify) {
      const latestNotification = notifications[0];
      if (!latestNotification.read) {
        showNotification(
          'GTS Booking Update',
          {
            body: latestNotification.message,
            icon: '/favicon.ico',
            tag: `booking-${latestNotification.booking_id}`,
            data: { bookingId: latestNotification.booking_id }
          }
        );
      }
    }
  }, [notifications, canNotify, showNotification]);



  // Filter bookings based on role and search
  const filteredBookings = useMemo(() => {
    let filteredData = bookings;
    
    // Role-based filtering
    if (userRole === 'captain') {
      filteredData = filteredData.filter(b => 
        b.resource.type === 'boat' || 
        b.crew.some(c => c.role === 'Капитан')
      );
    } else if (userRole === 'pilot') {
      filteredData = filteredData.filter(b => 
        b.resource.type === 'helicopter' || 
        b.crew.some(c => c.role === 'Пилот')
      );
    } else if (userRole === 'guide') {
      filteredData = filteredData.filter(b => 
        b.crew.some(c => c.role === 'Инструктор' || c.role === 'Гид')
      );
    } else if (userRole === 'partner') {
      filteredData = filteredData.filter(b => b.partner?.id === 'partner-001');
    }
    
    // Search filter
    if (searchQuery) {
      filteredData = filteredData.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.resource.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      filteredData = filteredData.filter(b => b.status === statusFilter);
    }
    
    return filteredData;
  }, [bookings, searchQuery, statusFilter, userRole]);

  // Filter resources based on role
  const filteredResources = useMemo(() => {
    let resources = mockResources;
    
    if (userRole === 'captain') {
      resources = resources.filter(r => r.type === 'boat');
    } else if (userRole === 'pilot') {
      resources = resources.filter(r => r.type === 'helicopter');
    } else if (userRole === 'guide') {
      resources = resources.filter(r => r.type === 'buggy');
    } else if (userRole === 'partner') {
      resources = resources.filter(r => r.partnerId === 'partner-001');
    }
    
    return resources;
  }, [userRole]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const getStatusText = (status: BookingStatus) => {
    switch (status) {
      case 'pending': return 'Ожидает';
      case 'confirmed': return 'Подтверждено';
      case 'completed': return 'Завершено';
      case 'cancelled': return 'Отменено';
      default: return status;
    }
  };

  const getWeatherIcon = (condition: WeatherCondition) => {
    const IconComponent = weatherIcons[condition];
    return <IconComponent className="w-4 h-4" />;
  };

  const getWeatherCondition = (condition: WeatherCondition) => {
    switch (condition) {
      case 'sunny': return 'Солнечно';
      case 'cloudy': return 'Облачно';
      case 'partly_cloudy': return 'Переменная облачность';
      case 'rainy': return 'Дождь';
      case 'windy': return 'Ветрено';
      default: return 'Неизвестно';
    }
  };

  const handleBookingClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setShowBookingDetails(true);
  };

  const handleCreateBooking = async () => {
    // TODO: Show booking creation form
    console.log('Create booking clicked');
  };

  const handleEditBooking = async (booking: Booking, updates: Partial<Booking>) => {
    try {
      const result = await updateBooking(booking.id, updates);
      if (result.success) {
        setShowBookingDetails(false);
        if (canNotify) {
          showNotification('Booking Updated', {
            body: `${booking.title} has been updated`,
            icon: '/favicon.ico'
          });
        }
      }
    } catch (err) {
      console.error('Failed to update booking:', err);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const result = await deleteBooking(bookingId);
      if (result.success) {
        setShowBookingDetails(false);
        if (canNotify) {
          showNotification('Booking Cancelled', {
            body: 'The booking has been cancelled',
            icon: '/favicon.ico'
          });
        }
      }
    } catch (err) {
      console.error('Failed to delete booking:', err);
    }
  };

  const handleRefresh = async () => {
    await refresh({
      date_from: currentDate.toISOString().split('T')[0],
      date_to: currentDate.toISOString().split('T')[0]
    });
    await fetchUtilizationData();
  };

  const fetchUtilizationData = async () => {
    // Always use demo mode - no API calls
    console.log('Demo mode: Using mock utilization data');
    
    // Generate mock utilization data for demo
    const mockUtilization = {
      date: currentDate.toISOString().split('T')[0],
      resource_utilization: {
        'boat-001': 6.5,
        'boat-002': 3.2,
        'helicopter-001': 8.5,
        'buggy-001': 4.1,
        'buggy-002': 0.5 // maintenance
      },
      crew_utilization: {
        'crew-001': 6.5,
        'crew-002': 6.5,
        'crew-003': 8.5,
        'crew-004': 4.1,
        'crew-005': 3.2
      },
      total_bookings: 3,
      calculated_at: new Date().toISOString()
    };
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    setUtilizationData(mockUtilization);
    generatePlanningRecommendations(mockUtilization);
  };

  const generatePlanningRecommendations = (utilization: any) => {
    const recommendations = [];
    
    if (utilization?.resource_utilization) {
      for (const [resourceId, hours] of Object.entries(utilization.resource_utilization)) {
        const utilizationHours = hours as number;
        
        if (utilizationHours > 8) {
          recommendations.push({
            type: 'resource_rebalance',
            resource_id: resourceId,
            resource_name: `Ресурс ${resourceId}`,
            message: `Ресурс перегружен (${utilizationHours} часов). Рекомендуется перераспределить нагрузку или добавить дополнительные единицы.`,
            priority: 'high',
            estimated_impact: 'Снижение перегрузки на 40%, повышение качества обслуживания',
            action_required: true
          });
        } else if (utilizationHours < 2) {
          recommendations.push({
            type: 'capacity_alert',
            resource_id: resourceId,
            resource_name: `Ресурс ${resourceId}`,
            message: `Низкая загруженность ресурса (${utilizationHours} часов). Возможна оптимизация расписания или временное исключение из работы.`,
            priority: 'low',
            estimated_impact: 'Экономия операционных затрат до 25%',
            action_required: false
          });
        }
      }
    }

    if (utilization?.crew_utilization) {
      for (const [crewId, hours] of Object.entries(utilization.crew_utilization)) {
        const utilizationHours = hours as number;
        
        if (utilizationHours > 8) {
          recommendations.push({
            type: 'crew_reassign',
            resource_id: crewId,
            resource_name: `Сотрудник ${crewId}`,
            message: `Сотрудник работает сверхурочно (${utilizationHours} часов). Рекомендуется перераспределить задачи или привлечь дополнительный персонал.`,
            priority: 'high',
            estimated_impact: 'Предотвращение выгорания персонала, соблюдение трудового кодекса',
            action_required: true
          });
        }
      }
    }

    setPlanningRecommendations(recommendations);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <GTSUnifiedAdminHeader
        currentRole="Calendar"
        currentPage="Глобальный календарь бронирований"
        onLogin={onLogin}
        onBackToHome={onBack}
      />
      
      <div className="p-6">
        {/* Header Controls */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-[#121214] p-2"
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Глобальный календарь
              </h1>
              <p className="text-[#A6A7AA] text-sm">Управление бронированиями и ресурсами</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A7AA]" />
              <Input
                placeholder="Поиск бронирований..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64 bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            {/* Real-time Status */}
            <GTSRealTimeStatus
              connected={connected}
              loading={loading}
              error={error}
              lastUpdated={lastUpdated}
              unreadCount={unreadCount}
              todayBookings={todayBookings}
              pushEnabled={canNotify}
              onRefresh={handleRefresh}
              onEnablePush={subscribeToPush}
              onShowNotifications={() => {/* Handled by GTSNotificationsPanel */}}
            />
            
            {/* Notifications Panel */}
            <GTSNotificationsPanel
              notifications={notifications}
              unreadCount={unreadCount}
              loading={loading}
              onMarkAsRead={markNotificationAsRead}
              onMarkAllAsRead={async () => {
                // Mark all notifications as read
                for (const notification of notifications.filter(n => !n.read)) {
                  await markNotificationAsRead(notification.id);
                }
              }}
              onRefresh={fetchNotifications}
            />
            
            {/* Resource Planning Panel */}
            {canEdit && (
              <GTSResourcePlanningPanel
                utilization={utilizationData}
                recommendations={planningRecommendations}
                loading={loading}
                onRefresh={fetchUtilizationData}
                onApplyRecommendation={(recommendation) => {
                  console.log('Apply recommendation:', recommendation);
                  // TODO: Implement recommendation application
                }}
              />
            )}
            
            {canEdit && (
              <Button 
                className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                onClick={handleCreateBooking}
                disabled={loading}
              >
                <Plus className="w-4 h-4 mr-2" />
                Новое бронирование
              </Button>
            )}
          </div>
        </div>

        {/* View Controls */}
        <Card className="bg-[#17181A] border-[#232428] p-4 mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Date Navigation */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const prev = new Date(currentDate);
                    prev.setMonth(prev.getMonth() - 1);
                    setCurrentDate(prev);
                  }}
                  className="text-white hover:bg-[#121214]"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                
                <h2 className="text-lg text-white font-medium min-w-[200px] text-center">
                  {formatDate(currentDate)}
                </h2>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    const next = new Date(currentDate);
                    next.setMonth(next.getMonth() + 1);
                    setCurrentDate(next);
                  }}
                  className="text-white hover:bg-[#121214]"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentDate(new Date())}
                className="border-[#232428] text-white hover:bg-[#121214]"
              >
                Сегодня
              </Button>
            </div>

            {/* View Mode & Filters */}
            <div className="flex items-center gap-3">
              {/* View Mode Tabs */}
              <div className="flex items-center bg-[#121214] rounded-xl p-1">
                <Button
                  variant={viewMode === 'resource' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('resource')}
                  className={viewMode === 'resource' ? 
                    'bg-[#91040C] text-white hover:bg-[#91040C]/90' : 
                    'text-white hover:bg-[#17181A]'
                  }
                >
                  <BarChart3 className="w-4 h-4 mr-1" />
                  Ресурсы
                </Button>
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className={viewMode === 'month' ? 
                    'bg-[#91040C] text-white hover:bg-[#91040C]/90' : 
                    'text-white hover:bg-[#17181A]'
                  }
                >
                  <Grid3X3 className="w-4 h-4 mr-1" />
                  Месяц
                </Button>
                <Button
                  variant={viewMode === 'week' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('week')}
                  className={viewMode === 'week' ? 
                    'bg-[#91040C] text-white hover:bg-[#91040C]/90' : 
                    'text-white hover:bg-[#17181A]'
                  }
                >
                  <List className="w-4 h-4 mr-1" />
                  Неделя
                </Button>
              </div>

              {/* Filters */}
              <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus | 'all')}>
                <SelectTrigger className="w-40 bg-[#121214] border-[#232428] text-white">
                  <SelectValue placeholder="Статус" />
                </SelectTrigger>
                <SelectContent className="bg-[#121214] border-[#232428]">
                  <SelectItem value="all" className="text-white">Все статусы</SelectItem>
                  <SelectItem value="pending" className="text-white">Ожидает</SelectItem>
                  <SelectItem value="confirmed" className="text-white">Подтверждено</SelectItem>
                  <SelectItem value="completed" className="text-white">Завершено</SelectItem>
                  <SelectItem value="cancelled" className="text-white">Отменено</SelectItem>
                </SelectContent>
              </Select>

              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowWeather(!showWeather)}
                className={`border-[#232428] ${showWeather ? 'bg-[#91040C] text-white border-[#91040C]' : 'text-white hover:bg-[#121214]'}`}
              >
                <Cloud className="w-4 h-4 mr-1" />
                Погода
              </Button>
            </div>
          </div>
        </Card>

        {/* Weather Bar */}
        {showWeather && (
          <Card className="bg-[#17181A] border-[#232428] p-4 mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Cloud className="w-4 h-4 text-[#91040C]" />
              <h3 className="text-white font-medium">Прогноз погоды</h3>
            </div>
            <div className="flex items-center gap-6 overflow-x-auto">
              {weatherData.map((weather, index) => (
                <div key={index} className="flex items-center gap-3 bg-[#121214] p-3 rounded-xl min-w-[180px]">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.condition)}
                    <div>
                      <div className="text-sm text-white font-medium">
                        {new Date(weather.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className="text-xs text-[#A6A7AA]">
                        {getWeatherCondition(weather.condition)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-orange-400" />
                    <span className="text-sm text-white">{weather.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-blue-400" />
                    <span className="text-xs text-[#A6A7AA]">{weather.wind}м/с</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Main Content */}
        {viewMode === 'resource' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Resources Sidebar */}
            <Card className="bg-[#17181A] border-[#232428]">
              <div className="p-4 border-b border-[#232428]">
                <h3 className="text-white font-medium">Ресурсы ({filteredResources.length})</h3>
              </div>
              
              <div className="p-4 space-y-3 max-h-[600px] overflow-y-auto">
                {filteredResources.map((resource) => {
                  const IconComponent = resourceTypeIcons[resource.type];
                  return (
                    <div 
                      key={resource.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        selectedResource === resource.id
                          ? 'border-[#91040C] bg-[#91040C]/10'
                          : 'border-[#232428] hover:border-[#91040C]/50 hover:bg-[#1A1B1D]'
                      }`}
                      onClick={() => setSelectedResource(resource.id)}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#91040C]/20 flex items-center justify-center">
                          <IconComponent className="w-4 h-4 text-[#91040C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-white font-medium text-sm truncate">{resource.name}</div>
                          <div className="text-xs text-[#A6A7AA] capitalize">{resource.type}</div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-2">
                        <Badge className={`${statusColors[resource.status === 'booked' ? 'confirmed' : 'pending']} text-xs`}>
                          {resource.status === 'available' ? 'Доступно' : 
                           resource.status === 'booked' ? 'Занято' :
                           resource.status === 'maintenance' ? 'Обслуживание' : 'Отключен'}
                        </Badge>
                        <div className="text-xs text-[#A6A7AA]">
                          <Users className="w-3 h-3 inline mr-1" />
                          {resource.capacity}
                        </div>
                      </div>

                      <div className="text-xs text-[#A6A7AA] flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {resource.location}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Resource Timeline */}
            <Card className="lg:col-span-3 bg-[#17181A] border-[#232428]">
              <div className="p-4 border-b border-[#232428]">
                <div className="flex items-center justify-between">
                  <h3 className="text-white font-medium">
                    {selectedResource ? 
                      `Расписание: ${filteredResources.find(r => r.id === selectedResource)?.name}` : 
                      'Выберите ресурс'
                    }
                  </h3>
                  {selectedResource && canEdit && (
                    <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить бронирование
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-4">
                {selectedResource ? (
                  <div className="space-y-4 max-h-[600px] overflow-y-auto">
                    {filteredBookings
                      .filter(booking => booking.resource.id === selectedResource)
                      .map((booking) => {
                        const IconComponent = resourceTypeIcons[booking.resource.type];
                        const hasWeatherWarnings = booking.weather?.warnings && booking.weather.warnings.length > 0;
                        
                        return (
                          <div 
                            key={booking.id}
                            className="bg-[#121214] p-4 rounded-xl hover:bg-[#1A1B1D] transition-colors cursor-pointer border border-[#232428] hover:border-[#91040C]/50"
                            onClick={() => handleBookingClick(booking as any)}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#91040C]/20 flex items-center justify-center">
                                  <IconComponent className="w-5 h-5 text-[#91040C]" />
                                </div>
                                <div>
                                  <h4 className="text-white font-medium">{booking.title}</h4>
                                  <p className="text-sm text-[#A6A7AA]">{booking.client.name}</p>
                                  {booking.client.company && (
                                    <p className="text-xs text-[#A6A7AA]">{booking.client.company}</p>
                                  )}
                                  <div className="text-lg text-white font-medium mt-1">
                                    ₽{booking.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={`${statusColors[booking.status]} border rounded-lg`}>
                                  {getStatusText(booking.status)}
                                </Badge>
                                {hasWeatherWarnings && (
                                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                                )}
                                {canEdit && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white h-8 w-8 p-0">
                                        <MoreVertical className="w-4 h-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="bg-[#121214] border-[#232428]">
                                      <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                        <Eye className="w-4 h-4 mr-2" />
                                        Просмотр
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                                        <Edit className="w-4 h-4 mr-2" />
                                        Редактировать
                                      </DropdownMenuItem>
                                      <DropdownMenuSeparator className="bg-[#232428]" />
                                      <DropdownMenuItem className="text-red-400 hover:bg-red-500/20">
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Отменить
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            </div>
                            
                            {/* Booking Details */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm mb-3">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-[#A6A7AA]" />
                                <span className="text-[#A6A7AA]">{booking.datetime.start} - {booking.datetime.end}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-[#A6A7AA]" />
                                <span className="text-[#A6A7AA]">{booking.guests} гостей</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#A6A7AA]" />
                                <span className="text-[#A6A7AA]">
                                  {new Date(booking.datetime.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <User className="w-4 h-4 text-[#A6A7AA]" />
                                <span className="text-[#A6A7AA]">
                                  {booking.crew.map(c => c.name).join(', ')}
                                </span>
                              </div>
                            </div>

                            {/* Weather Info */}
                            <div className="flex items-center justify-between pt-3 border-t border-[#232428]">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                  {getWeatherIcon(booking.weather?.condition as any)}
                                  <span className="text-sm text-[#A6A7AA]">
                                    {getWeatherCondition(booking.weather?.condition as any)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Thermometer className="w-4 h-4 text-orange-400" />
                                  <span className="text-sm text-[#A6A7AA]">{booking.weather?.temp}°C</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Wind className="w-4 h-4 text-blue-400" />
                                  <span className="text-sm text-[#A6A7AA]">{booking.weather?.wind}м/с</span>
                                </div>
                              </div>
                              
                              {hasWeatherWarnings && (
                                <div className="flex items-center gap-1 text-yellow-400">
                                  <AlertTriangle className="w-4 h-4" />
                                  <span className="text-xs">Предупреждение о погоде</span>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    
                    {filteredBookings.filter(booking => booking.resource.id === selectedResource).length === 0 && (
                      <div className="text-center py-12">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-[#A6A7AA] opacity-50" />
                        <p className="text-[#A6A7AA]">Нет бронирований для этого ресурса</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Grid3X3 className="w-16 h-16 mx-auto mb-4 text-[#A6A7AA] opacity-50" />
                    <p className="text-[#A6A7AA]">��ыберите ресурс для просмотра расписания</p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        )}

        {/* Other View Modes */}
        {viewMode === 'month' && (
          <Card className="bg-[#17181A] border-[#232428] p-6">
            <div className="text-center py-12">
              <Grid3X3 className="w-16 h-16 mx-auto mb-4 text-[#A6A7AA] opacity-50" />
              <p className="text-[#A6A7AA]">Месячный вид календаря в разработке</p>
            </div>
          </Card>
        )}

        {viewMode === 'week' && (
          <Card className="bg-[#17181A] border-[#232428] p-6">
            <div className="text-center py-12">
              <List className="w-16 h-16 mx-auto mb-4 text-[#A6A7AA] opacity-50" />
              <p className="text-[#A6A7AA]">Недельный вид календаря в разработке</p>
            </div>
          </Card>
        )}

        {viewMode === 'day' && (
          <Card className="bg-[#17181A] border-[#232428] p-6">
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 mx-auto mb-4 text-[#A6A7AA] opacity-50" />
              <p className="text-[#A6A7AA]">Дневной вид календаря в разработке</p>
            </div>
          </Card>
        )}
      </div>

      {/* Booking Detail Drawer */}
      <Dialog open={showBookingDetails} onOpenChange={setShowBookingDetails}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">
              Детали бронирования
            </DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <BookingDetailView 
              booking={selectedBooking} 
              canEdit={canEdit}
              onClose={() => setShowBookingDetails(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Booking Detail View Component
function BookingDetailView({ 
  booking, 
  canEdit, 
  onClose 
}: { 
  booking: Booking; 
  canEdit: boolean;
  onClose: () => void;
}) {
  const IconComponent = resourceTypeIcons[booking.resource.type];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#91040C]/20 flex items-center justify-center">
            <IconComponent className="w-6 h-6 text-[#91040C]" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">{booking.title}</h2>
            <Badge className={`${statusColors[booking.status]} mt-2`}>
              {booking.status === 'pending' ? 'Ожидает' :
               booking.status === 'confirmed' ? 'Подтверждено' :
               booking.status === 'completed' ? 'Завершено' : 'Отменено'}
            </Badge>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-semibold text-white">
            ₽{booking.price.toLocaleString()}
          </div>
          {booking.partner && (
            <div className="text-sm text-[#A6A7AA]">
              Партнёр: {booking.partner.name} ({booking.partner.commission}%)
            </div>
          )}
        </div>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#121214]">
          <TabsTrigger value="general" className="text-white data-[state=active]:bg-[#91040C]">
            Основное
          </TabsTrigger>
          <TabsTrigger value="client" className="text-white data-[state=active]:bg-[#91040C]">
            Клиент
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-white data-[state=active]:bg-[#91040C]">
            Документы
          </TabsTrigger>
          <TabsTrigger value="weather" className="text-white data-[state=active]:bg-[#91040C]">
            Погода
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Ресурс</label>
                <div className="bg-[#121214] rounded-lg p-3">
                  <div className="text-white font-medium">{booking.resource.name}</div>
                  <div className="text-sm text-[#A6A7AA] capitalize">{booking.resource.type}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Дата и время</label>
                <div className="bg-[#121214] rounded-lg p-3">
                  <div className="text-white font-medium">
                    {new Date(booking.datetime.date).toLocaleDateString('ru-RU')}
                  </div>
                  <div className="text-sm text-[#A6A7AA]">
                    {booking.datetime.start} - {booking.datetime.end}
                  </div>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Количество гостей</label>
                <div className="bg-[#121214] rounded-lg p-3">
                  <div className="text-white font-medium">{booking.guests} гостей</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Экипаж</label>
                <div className="space-y-2">
                  {booking.crew.map((member) => (
                    <div key={member.id} className="bg-[#121214] rounded-lg p-3 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{member.name}</div>
                        <div className="text-sm text-[#A6A7AA]">{member.role}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {booking.notes && (
                <div>
                  <label className="text-sm text-[#A6A7AA] mb-2 block">Заметки</label>
                  <div className="bg-[#121214] rounded-lg p-3">
                    <div className="text-white">{booking.notes}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="client" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Имя клиента</label>
                <div className="bg-[#121214] rounded-lg p-3">
                  <div className="text-white font-medium">{booking.client.name}</div>
                </div>
              </div>
              
              {booking.client.company && (
                <div>
                  <label className="text-sm text-[#A6A7AA] mb-2 block">Компания</label>
                  <div className="bg-[#121214] rounded-lg p-3">
                    <div className="text-white">{booking.client.company}</div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Телефон</label>
                <div className="bg-[#121214] rounded-lg p-3 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A6A7AA]" />
                  <div className="text-white">{booking.client.phone}</div>
                </div>
              </div>
              
              <div>
                <label className="text-sm text-[#A6A7AA] mb-2 block">Email</label>
                <div className="bg-[#121214] rounded-lg p-3">
                  <div className="text-white">{booking.client.email}</div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="documents" className="mt-6">
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {booking.documents.contract && (
                <div className="bg-[#121214] rounded-lg p-4 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-blue-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Договор</div>
                    <div className="text-sm text-[#A6A7AA]">{booking.documents.contract}</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#121214]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
              
              {booking.documents.insurance && (
                <div className="bg-[#121214] rounded-lg p-4 flex items-center gap-3">
                  <FileText className="w-8 h-8 text-green-400" />
                  <div className="flex-1">
                    <div className="text-white font-medium">Страховка</div>
                    <div className="text-sm text-[#A6A7AA]">{booking.documents.insurance}</div>
                  </div>
                  <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#121214]">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </div>
            
            {booking.documents.permits && booking.documents.permits.length > 0 && (
              <div>
                <label className="text-sm text-[#A6A7AA] mb-3 block">Разрешения</label>
                <div className="space-y-2">
                  {booking.documents.permits.map((permit, index) => (
                    <div key={index} className="bg-[#121214] rounded-lg p-4 flex items-center gap-3">
                      <FileText className="w-8 h-8 text-yellow-400" />
                      <div className="flex-1">
                        <div className="text-white font-medium">Разрешение #{index + 1}</div>
                        <div className="text-sm text-[#A6A7AA]">{permit}</div>
                      </div>
                      <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#121214]">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="weather" className="mt-6">
          <div className="space-y-4">
            <div className="bg-[#121214] rounded-lg p-6">
              <div className="flex items-center gap-4 mb-4">
                {booking.weather.condition && (
                  <div className="w-16 h-16 rounded-full bg-[#91040C]/20 flex items-center justify-center">
                    {(() => {
                      const WeatherIcon = weatherIcons[booking.weather.condition];
                      return <WeatherIcon className="w-8 h-8 text-[#91040C]" />;
                    })()}
                  </div>
                )}
                <div>
                  <h3 className="text-xl font-semibold text-white">
                    {booking.weather.condition === 'sunny' ? 'Солнечно' :
                     booking.weather.condition === 'cloudy' ? 'Облачно' :
                     booking.weather.condition === 'partly_cloudy' ? 'Переменная облачность' :
                     booking.weather.condition === 'rainy' ? 'Дождь' : 'Ветрено'}
                  </h3>
                  <p className="text-[#A6A7AA]">Прогноз на день бронирования</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3">
                  <Thermometer className="w-6 h-6 text-orange-400" />
                  <div>
                    <div className="text-white font-medium">{booking.weather.temp}°C</div>
                    <div className="text-sm text-[#A6A7AA]">Температура</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Wind className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-white font-medium">{booking.weather.wind} м/с</div>
                    <div className="text-sm text-[#A6A7AA]">Скорость ветра</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <Cloud className="w-6 h-6 text-gray-400" />
                  <div>
                    <div className="text-white font-medium">
                      {booking.weather.condition === 'sunny' ? 'Отличные' :
                       booking.weather.condition === 'cloudy' ? 'Хорошие' :
                       booking.weather.condition === 'rainy' ? 'Плохие' : 'Удовлетворительные'}
                    </div>
                    <div className="text-sm text-[#A6A7AA]">Условия</div>
                  </div>
                </div>
              </div>
              
              {booking.weather.warnings && booking.weather.warnings.length > 0 && (
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-5 h-5 text-yellow-400" />
                    <span className="text-yellow-400 font-medium">Предупреждения</span>
                  </div>
                  <ul className="space-y-1">
                    {booking.weather.warnings.map((warning, index) => (
                      <li key={index} className="text-yellow-300 text-sm">{warning}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Action Buttons */}
      {canEdit && (
        <div className="flex items-center gap-3 pt-4 border-t border-[#232428]">
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
            <Edit className="w-4 h-4 mr-2" />
            Редактировать
          </Button>
          <Button variant="outline" className="border-[#232428] text-white hover:bg-[#121214]">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
          <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/10">
            <XCircle className="w-4 h-4 mr-2" />
            Отменить бронирование
          </Button>
        </div>
      )}
    </div>
  );
}