import { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { 
  Search, 
  Filter, 
  Plus,
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  MapPin,
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
  ChevronRight,
  ChevronDown,
  List,
  Grid3X3,
  BarChart3
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";

// Types (same as desktop version)
type ViewMode = 'list' | 'timeline';
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
}

interface GTSGlobalBookingCalendarMobileProps {
  userRole: UserRole;
  onBack?: () => void;
}

// Mock data (simplified from desktop)
const mockBookings: Booking[] = [
  {
    id: '1',
    title: 'VIP Морская прогулка',
    client: {
      name: 'Иванов А.М.',
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
      { id: 'crew-001', name: 'Капитан Петров', role: 'Капитан' }
    ],
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
    }
  },
  {
    id: '2',
    title: 'Вертолётная экскурсия',
    client: {
      name: 'Смирнова О.В.',
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
    }
  },
  {
    id: '3',
    title: 'Багги-приключение',
    client: {
      name: 'Команда "Экстрим"',
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
    }
  }
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

export function GTSGlobalBookingCalendarMobile({ userRole, onBack }: GTSGlobalBookingCalendarMobileProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<BookingStatus | 'all'>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  // Role-based access control
  const canEdit = ['executive', 'dispatcher'].includes(userRole);
  
  // Filter bookings based on role
  const filteredBookings = useMemo(() => {
    let bookings = mockBookings;
    
    // Role-based filtering
    if (userRole === 'captain') {
      bookings = bookings.filter(b => 
        b.resource.type === 'boat' || 
        b.crew.some(c => c.role === 'Капитан')
      );
    } else if (userRole === 'pilot') {
      bookings = bookings.filter(b => 
        b.resource.type === 'helicopter' || 
        b.crew.some(c => c.role === 'Пилот')
      );
    } else if (userRole === 'guide') {
      bookings = bookings.filter(b => 
        b.crew.some(c => c.role === 'Инструктор' || c.role === 'Гид')
      );
    }
    
    // Search filter
    if (searchQuery) {
      bookings = bookings.filter(b => 
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.resource.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Status filter
    if (statusFilter !== 'all') {
      bookings = bookings.filter(b => b.status === statusFilter);
    }
    
    return bookings;
  }, [searchQuery, statusFilter, userRole]);

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

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Mobile Header */}
      <div className="bg-[#0B0B0C] border-b border-[#232428] sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-[#121214] p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                Календарь
              </h1>
              <p className="text-xs text-[#A6A7AA]">
                {filteredBookings.length} бронирований
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white hover:bg-[#121214] p-2"
            >
              <Filter className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setViewMode(viewMode === 'list' ? 'timeline' : 'list')}
              className="text-white hover:bg-[#121214] p-2"
            >
              {viewMode === 'list' ? <BarChart3 className="w-5 h-5" /> : <List className="w-5 h-5" />}
            </Button>
            {canEdit && (
              <Button 
                size="sm"
                className="bg-[#91040C] hover:bg-[#91040C]/90 text-white px-3"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A7AA]" />
            <Input
              placeholder="Поиск бронирований..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA]"
            />
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-4 pb-4 space-y-3 border-t border-[#232428] pt-4">
            <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as BookingStatus | 'all')}>
              <SelectTrigger className="bg-[#121214] border-[#232428] text-white">
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
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 pb-20 space-y-3">
        {filteredBookings.map((booking) => {
          const IconComponent = resourceTypeIcons[booking.resource.type];
          const hasWeatherWarnings = booking.weather.warnings && booking.weather.warnings.length > 0;
          const isExpanded = selectedBooking === booking.id;
          
          return (
            <Card 
              key={booking.id}
              className="bg-[#17181A] border-[#232428] overflow-hidden"
            >
              <Collapsible open={isExpanded} onOpenChange={() => 
                setSelectedBooking(isExpanded ? null : booking.id)
              }>
                <CollapsibleTrigger asChild>
                  <div className="p-4 cursor-pointer active:bg-[#1A1B1D] transition-colors">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <div className="w-10 h-10 bg-[#91040C]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                          <IconComponent className="w-5 h-5 text-[#91040C]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-white font-medium truncate">{booking.title}</h3>
                          <p className="text-sm text-[#A6A7AA] truncate">{booking.client.name}</p>
                          <div className="text-lg text-white font-medium mt-1">
                            ₽{booking.price.toLocaleString()}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <Badge className={`${statusColors[booking.status]} text-xs`}>
                          {getStatusText(booking.status)}
                        </Badge>
                        {hasWeatherWarnings && (
                          <AlertTriangle className="w-4 h-4 text-yellow-400" />
                        )}
                        <ChevronDown className={`w-4 h-4 text-[#A6A7AA] transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-[#A6A7AA]" />
                        <span className="text-[#A6A7AA] text-xs">{booking.datetime.start} - {booking.datetime.end}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-3 h-3 text-[#A6A7AA]" />
                        <span className="text-[#A6A7AA] text-xs">{booking.guests} гостей</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3 h-3 text-[#A6A7AA]" />
                        <span className="text-[#A6A7AA] text-xs">
                          {new Date(booking.datetime.date).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {getWeatherIcon(booking.weather.condition)}
                        <span className="text-[#A6A7AA] text-xs">{booking.weather.temp}°C</span>
                      </div>
                    </div>
                  </div>
                </CollapsibleTrigger>
                
                <CollapsibleContent>
                  <div className="px-4 pb-4 border-t border-[#232428] pt-4 space-y-4">
                    {/* Resource Details */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Ресурс</h4>
                      <div className="bg-[#121214] rounded-lg p-3">
                        <div className="text-white text-sm">{booking.resource.name}</div>
                        <div className="text-xs text-[#A6A7AA] capitalize">{booking.resource.type}</div>
                      </div>
                    </div>

                    {/* Crew */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Экипаж</h4>
                      <div className="space-y-2">
                        {booking.crew.map((member) => (
                          <div key={member.id} className="bg-[#121214] rounded-lg p-3 flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center">
                              <User className="w-3 h-3 text-blue-400" />
                            </div>
                            <div>
                              <div className="text-white text-sm">{member.name}</div>
                              <div className="text-xs text-[#A6A7AA]">{member.role}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Weather */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Погода</h4>
                      <div className="bg-[#121214] rounded-lg p-3">
                        <div className="flex items-center gap-3 mb-2">
                          {getWeatherIcon(booking.weather.condition)}
                          <div>
                            <div className="text-white text-sm">{getWeatherCondition(booking.weather.condition)}</div>
                            <div className="text-xs text-[#A6A7AA]">{booking.weather.temp}°C, ветер {booking.weather.wind}м/с</div>
                          </div>
                        </div>
                        
                        {hasWeatherWarnings && (
                          <div className="mt-2 p-2 bg-yellow-500/10 border border-yellow-500/30 rounded">
                            <div className="flex items-center gap-1 mb-1">
                              <AlertTriangle className="w-3 h-3 text-yellow-400" />
                              <span className="text-yellow-400 text-xs font-medium">Предупреждение</span>
                            </div>
                            {booking.weather.warnings!.map((warning, index) => (
                              <div key={index} className="text-yellow-300 text-xs">{warning}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Client Contact */}
                    <div>
                      <h4 className="text-white font-medium mb-2">Контакт клиента</h4>
                      <div className="bg-[#121214] rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-1">
                          <Phone className="w-3 h-3 text-[#A6A7AA]" />
                          <span className="text-white text-sm">{booking.client.phone}</span>
                        </div>
                        <div className="text-xs text-[#A6A7AA]">{booking.client.email}</div>
                        {booking.client.company && (
                          <div className="text-xs text-[#A6A7AA] mt-1">{booking.client.company}</div>
                        )}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    {canEdit && (
                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1 bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                          Редактировать
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1 border-[#232428] text-white hover:bg-[#121214]">
                          Детали
                        </Button>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </Card>
          );
        })}
        
        {filteredBookings.length === 0 && (
          <Card className="bg-[#17181A] border-[#232428] p-8 text-center">
            <div className="w-16 h-16 bg-[#A6A7AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Calendar className="w-8 h-8 text-[#A6A7AA]" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Бронирования не найдены</h3>
            <p className="text-[#A6A7AA] text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
          </Card>
        )}
      </div>
    </div>
  );
}