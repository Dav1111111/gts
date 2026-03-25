import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Input } from "../../ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ScrollArea } from "../../ui/scroll-area";
import { 
  Calendar, ChevronLeft, ChevronRight, Plus, Filter, Search, Settings,
  Plane, Anchor, Car, Clock, MapPin, User, Users, AlertTriangle,
  CheckCircle, Wrench, Fuel, Crown, Building2, Edit, Trash, Copy,
  MoreHorizontal, ArrowRight, Bell, Phone, Mail, MessageSquare,
  CalendarDays, Timer, Target, Zap, Activity, DollarSign
} from "lucide-react";
import { format, addDays, startOfWeek, endOfWeek, addWeeks, subWeeks, isSameDay, parseISO } from 'date-fns';
import { ru } from 'date-fns/locale';

// Types
interface Equipment {
  id: string;
  name: string;
  type: 'helicopter' | 'yacht' | 'car' | 'jetski' | 'buggy';
  location: string;
  capacity: number;
  status: 'available' | 'maintenance' | 'booked' | 'fueling';
  nextMaintenance?: string;
  currentLocation?: string;
}

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'captain' | 'driver' | 'guide' | 'mechanic';
  specializations: string[];
  isOnline: boolean;
  currentAssignment?: string;
  phoneNumber: string;
  email: string;
  rating: number;
  totalFlights?: number;
  totalTrips?: number;
  avatar?: string;
}

interface Booking {
  id: string;
  title: string;
  client: {
    id: string;
    name: string;
    clubLevel: 'none' | 'silver' | 'gold' | 'platinum';
    isVIP: boolean;
    isCorporate: boolean;
    phone: string;
    email: string;
  };
  equipment: Equipment;
  crew: CrewMember[];
  startTime: string;
  endTime: string;
  status: 'hold' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  value: number;
  notes?: string;
  route?: string;
  passengers: number;
  crmDealId?: string;
  createdBy: string;
  createdAt: string;
  priority: 'high' | 'medium' | 'low';
  prepTime: number; // minutes
  cleanupTime: number; // minutes
}

interface ServiceBlock {
  id: string;
  equipmentId: string;
  type: 'maintenance' | 'fueling' | 'cleaning' | 'inspection';
  startTime: string;
  endTime: string;
  description: string;
  assignedTo?: string;
  status: 'scheduled' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

type ViewMode = 'month' | 'week' | 'day';
type FilterType = 'all' | 'helicopter' | 'yacht' | 'car' | 'jetski' | 'buggy';

export function GTSBookingCalendarAdvanced() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<ViewMode>('week');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewBookingDialog, setShowNewBookingDialog] = useState(false);
  const [draggedBooking, setDraggedBooking] = useState<Booking | null>(null);

  // Mock data
  const mockEquipment: Equipment[] = [
    {
      id: 'heli-1',
      name: 'R66 Turbine',
      type: 'helicopter',
      location: 'Ангар А',
      capacity: 4,
      status: 'available',
      nextMaintenance: '2024-02-15',
      currentLocation: 'Аэропорт Сочи'
    },
    {
      id: 'heli-2',
      name: 'Bell 407',
      type: 'helicopter',
      location: 'Ангар А',
      capacity: 6,
      status: 'maintenance',
      nextMaintenance: '2024-01-20'
    },
    {
      id: 'yacht-1',
      name: 'Azimut 68',
      type: 'yacht',
      location: 'Причал А',
      capacity: 12,
      status: 'available',
      currentLocation: 'Марина Сочи'
    },
    {
      id: 'yacht-2',
      name: 'Princess 62',
      type: 'yacht',
      location: 'Причал А',
      capacity: 10,
      status: 'fueling',
      currentLocation: 'Марина Сочи'
    },
    {
      id: 'car-1',
      name: 'McLaren 720S',
      type: 'car',
      location: 'Гараж Premium',
      capacity: 2,
      status: 'available'
    },
    {
      id: 'buggy-1',
      name: 'Polaris RZR XP4',
      type: 'buggy',
      location: 'База багги',
      capacity: 4,
      status: 'available'
    }
  ];

  const mockCrew: CrewMember[] = [
    {
      id: 'crew-1',
      name: 'Смирнов А.В.',
      role: 'pilot',
      specializations: ['R66', 'Bell 407', 'AS350'],
      isOnline: true,
      phoneNumber: '+7 (903) 123-45-67',
      email: 'pilot@gts.ru',
      rating: 4.9,
      totalFlights: 245
    },
    {
      id: 'crew-2',
      name: 'Петров И.С.',
      role: 'captain',
      specializations: ['Azimut', 'Princess', 'Ferretti'],
      isOnline: true,
      phoneNumber: '+7 (903) 234-56-78',
      email: 'captain@gts.ru',
      rating: 4.8,
      totalTrips: 180
    },
    {
      id: 'crew-3',
      name: 'Козлов Д.М.',
      role: 'driver',
      specializations: ['McLaren', 'Ferrari', 'Lamborghini'],
      isOnline: false,
      phoneNumber: '+7 (903) 345-67-89',
      email: 'driver@gts.ru',
      rating: 4.7,
      totalTrips: 320
    }
  ];

  const mockBookings: Booking[] = [
    {
      id: 'booking-1',
      title: 'Вертолётная экскурсия по Кавказу',
      client: {
        id: 'client-1',
        name: 'Михайлов А.В.',
        clubLevel: 'gold',
        isVIP: true,
        isCorporate: false,
        phone: '+7 (903) 123-45-67',
        email: 'alex@example.com'
      },
      equipment: mockEquipment[0],
      crew: [mockCrew[0]],
      startTime: '2024-01-16T10:00:00',
      endTime: '2024-01-16T14:00:00',
      status: 'confirmed',
      value: 450000,
      route: 'Сочи - Красная Поляна - Роза Хутор',
      passengers: 3,
      crmDealId: 'deal-1',
      createdBy: 'Смирнова К.А.',
      createdAt: '2024-01-15T09:30:00',
      priority: 'high',
      prepTime: 30,
      cleanupTime: 15
    },
    {
      id: 'booking-2',
      title: 'Морская прогулка на день рождения',
      client: {
        id: 'client-2',
        name: 'Петрова С.К.',
        clubLevel: 'silver',
        isVIP: false,
        isCorporate: false,
        phone: '+7 (903) 987-65-43',
        email: 'svetlana@example.com'
      },
      equipment: mockEquipment[2],
      crew: [mockCrew[1]],
      startTime: '2024-01-17T15:00:00',
      endTime: '2024-01-17T19:00:00',
      status: 'hold',
      value: 280000,
      route: 'Сочи - Адлер - залив',
      passengers: 8,
      createdBy: 'Иванов П.М.',
      createdAt: '2024-01-16T11:15:00',
      priority: 'medium',
      prepTime: 45,
      cleanupTime: 30
    }
  ];

  const mockServiceBlocks: ServiceBlock[] = [
    {
      id: 'service-1',
      equipmentId: 'heli-2',
      type: 'maintenance',
      startTime: '2024-01-16T08:00:00',
      endTime: '2024-01-16T17:00:00',
      description: 'Плановое техобслуживание двигателя',
      assignedTo: 'Техник Сидоров В.И.',
      status: 'in-progress',
      priority: 'high'
    },
    {
      id: 'service-2',
      equipmentId: 'yacht-2',
      type: 'fueling',
      startTime: '2024-01-16T09:00:00',
      endTime: '2024-01-16T10:00:00',
      description: 'Заправка топливом',
      assignedTo: 'Механик Орлов С.А.',
      status: 'scheduled',
      priority: 'medium'
    }
  ];

  // Utility functions
  const getEquipmentIcon = (type: Equipment['type']) => {
    const icons = {
      helicopter: Plane,
      yacht: Anchor,
      car: Car,
      jetski: Anchor,
      buggy: Car
    };
    return icons[type];
  };

  const getStatusColor = (status: Booking['status'] | ServiceBlock['status']) => {
    const colors = {
      hold: 'bg-yellow-500/20 border-yellow-500 text-yellow-400',
      confirmed: 'bg-green-500/20 border-green-500 text-green-400',
      'in-progress': 'bg-blue-500/20 border-blue-500 text-blue-400',
      completed: 'bg-gray-500/20 border-gray-500 text-gray-400',
      cancelled: 'bg-red-500/20 border-red-500 text-red-400',
      scheduled: 'bg-purple-500/20 border-purple-500 text-purple-400',
      maintenance: 'bg-orange-500/20 border-orange-500 text-orange-400'
    };
    return colors[status] || colors.hold;
  };

  const getClubLevelIcon = (level: string) => {
    const levels = {
      none: { icon: User, color: 'text-gray-400' },
      silver: { icon: User, color: 'text-gray-500' },
      gold: { icon: Crown, color: 'text-yellow-500' },
      platinum: { icon: Crown, color: 'text-purple-500' }
    };
    return levels[level] || levels.none;
  };

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    let filtered = mockEquipment;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(eq => eq.type === filterType);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(eq => 
        eq.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [filterType, searchQuery]);

  // Get time slots for the current view
  const getTimeSlots = () => {
    if (viewMode === 'day') {
      const slots = [];
      for (let hour = 8; hour <= 20; hour++) {
        slots.push(`${hour.toString().padStart(2, '0')}:00`);
      }
      return slots;
    }
    return [];
  };

  // Get date range for current view
  const getDateRange = () => {
    if (viewMode === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      const days = [];
      let current = start;
      while (current <= end) {
        days.push(current);
        current = addDays(current, 1);
      }
      return days;
    }
    return [currentDate];
  };

  // Navigation functions
  const navigatePrevious = () => {
    if (viewMode === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else if (viewMode === 'day') {
      setCurrentDate(addDays(currentDate, -1));
    }
  };

  const navigateNext = () => {
    if (viewMode === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else if (viewMode === 'day') {
      setCurrentDate(addDays(currentDate, 1));
    }
  };

  // Get bookings for specific equipment and date
  const getBookingsForEquipmentAndDate = (equipmentId: string, date: Date) => {
    return mockBookings.filter(booking => 
      booking.equipment.id === equipmentId &&
      isSameDay(parseISO(booking.startTime), date)
    );
  };

  // Get service blocks for specific equipment and date
  const getServiceBlocksForEquipmentAndDate = (equipmentId: string, date: Date) => {
    return mockServiceBlocks.filter(service => 
      service.equipmentId === equipmentId &&
      isSameDay(parseISO(service.startTime), date)
    );
  };

  // Render calendar header
  const renderCalendarHeader = () => (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={navigatePrevious}
            className="border-[#232428]"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-xl font-heading text-white min-w-[200px] text-center">
            {viewMode === 'week' ? (
              `${format(getDateRange()[0], 'd MMM', { locale: ru })} - ${format(getDateRange()[6], 'd MMM yyyy', { locale: ru })}`
            ) : (
              format(currentDate, 'd MMMM yyyy', { locale: ru })
            )}
          </h2>
          
          <Button
            variant="outline"
            size="sm"
            onClick={navigateNext}
            className="border-[#232428]"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentDate(new Date())}
          className="border-[#232428]"
        >
          Сегодня
        </Button>
      </div>
      
      <div className="flex items-center gap-2">
        <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as ViewMode)}>
          <TabsList className="bg-[#17181A]">
            <TabsTrigger value="week">Неделя</TabsTrigger>
            <TabsTrigger value="day">День</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );

  // Render filters
  const renderFilters = () => (
    <div className="flex items-center gap-4 mb-6">
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
        <Input
          placeholder="Поиск техники..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
        />
      </div>
      
      <Select value={filterType} onValueChange={(value) => setFilterType(value as FilterType)}>
        <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
          <Filter className="w-4 h-4 mr-2" />
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="bg-[#17181A] border-[#232428]">
          <SelectItem value="all">Вся техника</SelectItem>
          <SelectItem value="helicopter">Вертолёты</SelectItem>
          <SelectItem value="yacht">Яхты</SelectItem>
          <SelectItem value="car">Автомобили</SelectItem>
          <SelectItem value="buggy">Багги</SelectItem>
          <SelectItem value="jetski">Гидроциклы</SelectItem>
        </SelectContent>
      </Select>
      
      <Button
        size="sm"
        className="bg-[#91040C] hover:bg-[#91040C]/80"
        onClick={() => setShowNewBookingDialog(true)}
      >
        <Plus className="w-4 h-4 mr-2" />
        Новое бронирование
      </Button>
    </div>
  );

  // Render booking card
  const renderBookingCard = (booking: Booking) => {
    const clubLevel = getClubLevelIcon(booking.client.clubLevel);
    const ClubIcon = clubLevel.icon;
    
    return (
      <div
        key={booking.id}
        className={`p-2 rounded-md border cursor-pointer hover:opacity-80 transition-opacity ${getStatusColor(booking.status)}`}
        onClick={() => setSelectedBooking(booking)}
        draggable
        onDragStart={() => setDraggedBooking(booking)}
      >
        <div className="text-xs font-medium mb-1 truncate">
          {booking.title}
        </div>
        <div className="flex items-center gap-1 text-xs opacity-75 mb-1">
          <ClubIcon className={`w-3 h-3 ${clubLevel.color}`} />
          <span className="truncate">{booking.client.name}</span>
          {booking.client.isVIP && (
            <Crown className="w-3 h-3 text-yellow-400" />
          )}
        </div>
        <div className="text-xs opacity-75">
          {format(parseISO(booking.startTime), 'HH:mm')} - {format(parseISO(booking.endTime), 'HH:mm')}
        </div>
        <div className="text-xs font-medium text-green-400">
          ₽{booking.value.toLocaleString()}
        </div>
      </div>
    );
  };

  // Render service block card
  const renderServiceBlockCard = (service: ServiceBlock) => (
    <div
      key={service.id}
      className={`p-2 rounded-md border ${getStatusColor(service.status)}`}
    >
      <div className="flex items-center gap-1 text-xs font-medium mb-1">
        <Wrench className="w-3 h-3" />
        <span className="truncate">{service.type === 'maintenance' ? 'ТО' : 'Заправка'}</span>
      </div>
      <div className="text-xs opacity-75 mb-1 truncate">
        {service.description}
      </div>
      <div className="text-xs opacity-75">
        {format(parseISO(service.startTime), 'HH:mm')} - {format(parseISO(service.endTime), 'HH:mm')}
      </div>
    </div>
  );

  // Render week view
  const renderWeekView = () => {
    const dateRange = getDateRange();
    
    return (
      <div className="grid grid-cols-8 gap-2">
        {/* Header row */}
        <div className="p-3 text-sm font-medium text-[#A6A7AA]">
          Техника
        </div>
        {dateRange.map((date, index) => (
          <div key={index} className="p-3 text-center">
            <div className="text-sm font-medium text-white">
              {format(date, 'EEE', { locale: ru })}
            </div>
            <div className="text-xs text-[#A6A7AA]">
              {format(date, 'd MMM', { locale: ru })}
            </div>
          </div>
        ))}
        
        {/* Equipment rows */}
        {filteredEquipment.map(equipment => {
          const EquipmentIcon = getEquipmentIcon(equipment.type);
          
          return (
            <React.Fragment key={equipment.id}>
              {/* Equipment info */}
              <Card className="bg-[#17181A] border-[#232428] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <EquipmentIcon className="w-4 h-4 text-[#A6A7AA]" />
                  <span className="font-medium text-white text-sm truncate">
                    {equipment.name}
                  </span>
                </div>
                <div className="text-xs text-[#A6A7AA] mb-1">
                  {equipment.location}
                </div>
                <Badge
                  className={`text-xs ${
                    equipment.status === 'available' ? 'bg-green-500/20 text-green-400' :
                    equipment.status === 'maintenance' ? 'bg-orange-500/20 text-orange-400' :
                    equipment.status === 'booked' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {equipment.status === 'available' ? 'Свободно' :
                   equipment.status === 'maintenance' ? 'ТО' :
                   equipment.status === 'booked' ? 'Занято' : 'Заправка'}
                </Badge>
              </Card>
              
              {/* Daily slots */}
              {dateRange.map((date, dateIndex) => {
                const bookings = getBookingsForEquipmentAndDate(equipment.id, date);
                const services = getServiceBlocksForEquipmentAndDate(equipment.id, date);
                
                return (
                  <Card
                    key={`${equipment.id}-${dateIndex}`}
                    className="bg-[#17181A] border-[#232428] p-2 min-h-[120px]"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (draggedBooking) {
                        // Handle booking move logic here
                        console.log('Move booking', draggedBooking.id, 'to', equipment.id, format(date, 'yyyy-MM-dd'));
                        setDraggedBooking(null);
                      }
                    }}
                  >
                    <div className="space-y-1">
                      {bookings.map(booking => renderBookingCard(booking))}
                      {services.map(service => renderServiceBlockCard(service))}
                    </div>
                  </Card>
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    );
  };

  // Render day view
  const renderDayView = () => {
    const timeSlots = getTimeSlots();
    
    return (
      <div className="grid grid-cols-1 gap-4">
        {filteredEquipment.map(equipment => {
          const EquipmentIcon = getEquipmentIcon(equipment.type);
          const bookings = getBookingsForEquipmentAndDate(equipment.id, currentDate);
          const services = getServiceBlocksForEquipmentAndDate(equipment.id, currentDate);
          
          return (
            <Card key={equipment.id} className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <EquipmentIcon className="w-5 h-5 text-[#A6A7AA]" />
                    <div>
                      <CardTitle className="text-white">{equipment.name}</CardTitle>
                      <CardDescription>{equipment.location}</CardDescription>
                    </div>
                  </div>
                  <Badge
                    className={`${
                      equipment.status === 'available' ? 'bg-green-500/20 text-green-400' :
                      equipment.status === 'maintenance' ? 'bg-orange-500/20 text-orange-400' :
                      equipment.status === 'booked' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {equipment.status === 'available' ? 'Свободно' :
                     equipment.status === 'maintenance' ? 'ТО' :
                     equipment.status === 'booked' ? 'Занято' : 'Заправка'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-13 gap-1">
                  {timeSlots.map(time => (
                    <div key={time} className="text-center">
                      <div className="text-xs text-[#A6A7AA] mb-2">{time}</div>
                      <div className="h-16 bg-[#232428] rounded border-2 border-dashed border-transparent hover:border-[#91040C] transition-colors">
                        {/* Time slot content would go here */}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 space-y-2">
                  {bookings.map(booking => renderBookingCard(booking))}
                  {services.map(service => renderServiceBlockCard(service))}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  // Render crew sidebar
  const renderCrewSidebar = () => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Users className="w-5 h-5" />
          Экипажи
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {mockCrew.map(crew => (
              <div key={crew.id} className="p-3 bg-[#232428] rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-[#17181A] text-white text-xs">
                        {crew.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    {crew.isOnline && (
                      <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-[#232428]" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <h4 className="font-medium text-white text-sm mb-1">
                      {crew.name}
                    </h4>
                    <p className="text-xs text-[#A6A7AA] mb-2">
                      {crew.role === 'pilot' ? 'Пилот' :
                       crew.role === 'captain' ? 'Капитан' :
                       crew.role === 'driver' ? 'Водитель' :
                       crew.role === 'guide' ? 'Гид' : 'Механик'}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3 text-yellow-400" />
                        <span className="text-xs text-white">{crew.rating}</span>
                      </div>
                      <div className="text-xs text-[#A6A7AA]">
                        {crew.totalFlights ? `${crew.totalFlights} полётов` : 
                         crew.totalTrips ? `${crew.totalTrips} поездок` : ''}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 text-xs text-[#A6A7AA]">
                      <Phone className="w-3 h-3" />
                      <span>{crew.phoneNumber}</span>
                    </div>
                    
                    {crew.currentAssignment && (
                      <div className="mt-2">
                        <Badge className="text-xs bg-blue-500/20 text-blue-400">
                          Назначен: {crew.currentAssignment}
                        </Badge>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 p-6 bg-[#0B0B0C] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            Календарь бронирования
          </h1>
          <p className="text-[#A6A7AA]">
            Управление расписанием техники и экипажей
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#232428]">
            <Settings className="w-4 h-4 mr-2" />
            Настройки
          </Button>
          <Button variant="outline" size="sm" className="border-[#232428]">
            <CalendarDays className="w-4 h-4 mr-2" />
            Экспорт iCal
          </Button>
        </div>
      </div>

      {renderCalendarHeader()}
      {renderFilters()}

      {/* Main content */}
      <div className="grid grid-cols-4 gap-6">
        <div className="col-span-3">
          {viewMode === 'week' && renderWeekView()}
          {viewMode === 'day' && renderDayView()}
        </div>
        
        <div>
          {renderCrewSidebar()}
        </div>
      </div>

      {/* New Booking Dialog */}
      <Dialog open={showNewBookingDialog} onOpenChange={setShowNewBookingDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Новое бронирование</DialogTitle>
            <DialogDescription>
              Создание нового бронирования техники
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Клиент
                </label>
                <Input
                  placeholder="Введите имя клиента"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Техника
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите технику" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    {mockEquipment.map(eq => (
                      <SelectItem key={eq.id} value={eq.id}>
                        {eq.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Дата и время
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="datetime-local"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                  <Input
                    type="datetime-local"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Экипаж
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите экипаж" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    {mockCrew.map(crew => (
                      <SelectItem key={crew.id} value={crew.id}>
                        {crew.name} - {crew.role}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Маршрут
                </label>
                <Input
                  placeholder="Описание маршрута"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Пассажиры
                  </label>
                  <Input
                    type="number"
                    placeholder="Количество"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Стоимость
                  </label>
                  <Input
                    type="number"
                    placeholder="₽"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowNewBookingDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Создать бронирование
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Details Dialog */}
      {selectedBooking && (
        <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
          <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle>{selectedBooking.title}</DialogTitle>
              <DialogDescription>
                Детали бронирования #{selectedBooking.id}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-2">Информация о клиенте</h3>
                  <div className="p-3 bg-[#232428] rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const clubLevel = getClubLevelIcon(selectedBooking.client.clubLevel);
                        const ClubIcon = clubLevel.icon;
                        return <ClubIcon className={`w-4 h-4 ${clubLevel.color}`} />;
                      })()}
                      <span className="font-medium">{selectedBooking.client.name}</span>
                      {selectedBooking.client.isVIP && (
                        <Crown className="w-4 h-4 text-yellow-400" />
                      )}
                    </div>
                    <div className="text-sm text-[#A6A7AA]">
                      <div>📞 {selectedBooking.client.phone}</div>
                      <div>📧 {selectedBooking.client.email}</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Техника и экипаж</h3>
                  <div className="p-3 bg-[#232428] rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      {(() => {
                        const EquipmentIcon = getEquipmentIcon(selectedBooking.equipment.type);
                        return <EquipmentIcon className="w-4 h-4 text-[#A6A7AA]" />;
                      })()}
                      <span>{selectedBooking.equipment.name}</span>
                    </div>
                    <div className="text-sm text-[#A6A7AA]">
                      📍 {selectedBooking.equipment.location}
                    </div>
                    <div>
                      {selectedBooking.crew.map(crew => (
                        <div key={crew.id} className="text-sm">
                          👨‍✈️ {crew.name} ({crew.role})
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-white mb-2">Детали поездки</h3>
                  <div className="p-3 bg-[#232428] rounded-lg space-y-2">
                    <div className="text-sm">
                      <strong>Время:</strong> {format(parseISO(selectedBooking.startTime), 'dd.MM.yyyy HH:mm')} - {format(parseISO(selectedBooking.endTime), 'HH:mm')}
                    </div>
                    <div className="text-sm">
                      <strong>Маршрут:</strong> {selectedBooking.route}
                    </div>
                    <div className="text-sm">
                      <strong>Пассажиры:</strong> {selectedBooking.passengers} чел.
                    </div>
                    <div className="text-sm">
                      <strong>Стоимость:</strong> <span className="text-green-400">₽{selectedBooking.value.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium text-white mb-2">Статус</h3>
                  <div className="p-3 bg-[#232428] rounded-lg">
                    <Badge className={getStatusColor(selectedBooking.status)}>
                      {selectedBooking.status === 'hold' ? 'Удержание' :
                       selectedBooking.status === 'confirmed' ? 'Подтверждено' :
                       selectedBooking.status === 'in-progress' ? 'Выполняется' :
                       selectedBooking.status === 'completed' ? 'Завершено' : 'Отменено'}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
            
            <DialogFooter>
              <Button variant="outline" className="border-[#232428]">
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </Button>
              <Button variant="outline" className="border-[#232428]">
                <Copy className="w-4 h-4 mr-2" />
                Дублировать
              </Button>
              <Button variant="outline" className="border-red-500 text-red-400">
                <Trash className="w-4 h-4 mr-2" />
                Отменить
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}