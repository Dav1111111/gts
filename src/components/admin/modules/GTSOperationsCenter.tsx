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
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";
import { Alert, AlertDescription } from "../../ui/alert";
import { GTSWeatherWidget } from "./GTSWeatherWidget";
import { 
  Plus, Search, Filter, Settings, Download, Upload, Edit, Trash, Eye,
  Plane, Anchor, Car, Zap, MapPin, Clock, Calendar, Users, Activity,
  AlertTriangle, CheckCircle, Timer, Navigation, Radio, Shield,
  Phone, Mail, ArrowRight, MoreHorizontal, Play, Pause, Square,
  Headphones, Wifi, Signal, Battery, Map, Route, Target,
  Bell, AlertCircle, Info, ExternalLink, RefreshCw, Power,
  Gauge, Fuel, Wrench, UserCheck, MessageSquare, Send,
  FileText, Camera, Video, Mic, Volume2, VolumeX, Maximize
} from "lucide-react";

// Types
interface Flight {
  id: string;
  callSign: string;
  name: string;
  vehicleType: 'helicopter' | 'boat' | 'buggy' | 'atv' | 'slingshot';
  vehicleId: string;
  vehicleName: string;
  status: 'preparing' | 'active' | 'enroute' | 'landed' | 'completed' | 'delayed' | 'cancelled';
  priority: 'normal' | 'high' | 'urgent';
  startTime: string;
  endTime: string;
  estimatedEndTime?: string;
  currentLocation?: { lat: number; lng: number; description: string };
  route: string[];
  passengers: Passenger[];
  crew: CrewMember[];
  client: Client;
  bookingId: string;
  communication: CommunicationStatus;
  safety: SafetyStatus;
  fuel: number;
  progress: number;
  notes?: string;
  weatherRestrictions?: string[];
  lastUpdate: string;
}

interface Passenger {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  weight?: number;
  specialRequirements?: string[];
  seatAssignment?: string;
  documents: PassengerDocument[];
}

interface PassengerDocument {
  type: 'passport' | 'license' | 'medical' | 'waiver';
  number: string;
  expiryDate: string;
  verified: boolean;
}

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'captain' | 'instructor' | 'guide' | 'mechanic';
  phone: string;
  email: string;
  avatar?: string;
  status: 'ready' | 'busy' | 'unavailable' | 'off-duty';
  currentLocation?: string;
  lastContact: string;
  certifications: string[];
}

interface Client {
  id: string;
  name: string;
  phone: string;
  email: string;
  type: 'individual' | 'corporate';
  emergencyContact?: {
    name: string;
    phone: string;
    relation: string;
  };
}

interface CommunicationStatus {
  radio: 'connected' | 'weak' | 'lost';
  gps: 'active' | 'weak' | 'lost';
  cellular: 'connected' | 'weak' | 'lost';
  lastContact: string;
  frequency?: string;
}

interface SafetyStatus {
  emergencyBeacon: boolean;
  lifeSafety: boolean;
  weatherClearance: boolean;
  flightPlan: boolean;
  checklistComplete: boolean;
  lastSafetyCheck: string;
}

interface User {
  role: string;
  permissions: string[];
}

interface GTSOperationsCenterProps {
  user: User;
}

type FlightFilter = 'all' | 'active' | 'preparing' | 'completed' | 'delayed';
type VehicleFilter = 'all' | 'helicopter' | 'boat' | 'buggy' | 'atv' | 'slingshot';

export function GTSOperationsCenter({ user }: GTSOperationsCenterProps) {
  const [activeTab, setActiveTab] = useState('operations');
  const [flightFilter, setFlightFilter] = useState<FlightFilter>('all');
  const [vehicleFilter, setVehicleFilter] = useState<VehicleFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [showMap, setShowMap] = useState(false);
  const [showPassengerDetails, setShowPassengerDetails] = useState(true);
  const [showEmergencyDialog, setShowEmergencyDialog] = useState(false);
  const [showScheduleDialog, setShowScheduleDialog] = useState(false);

  // Mock data
  const mockFlights: Flight[] = [
    {
      id: 'GTS-001',
      callSign: 'GTS-001',
      name: 'Экскурсия по Красной Поляне',
      vehicleType: 'helicopter',
      vehicleId: 'heli-001',
      vehicleName: 'Небесный странник',
      status: 'active',
      priority: 'normal',
      startTime: '2024-01-20T10:00:00',
      endTime: '2024-01-20T12:00:00',
      estimatedEndTime: '2024-01-20T12:15:00',
      currentLocation: { lat: 43.6853, lng: 40.2754, description: 'Над Красной Поляной, высота 1200м' },
      route: ['Адлер', 'Красная Поляна', 'Роза Хутор', 'Адлер'],
      passengers: [
        {
          id: 'pass-1',
          name: 'Михайлов Алексей Владимирович',
          phone: '+7 (903) 123-45-67',
          email: 'mikhailov@example.com',
          weight: 85,
          seatAssignment: '1A',
          documents: [
            { type: 'passport', number: '1234567890', expiryDate: '2025-12-01', verified: true },
            { type: 'waiver', number: 'W-2024-001', expiryDate: '2024-12-31', verified: true }
          ]
        },
        {
          id: 'pass-2',
          name: 'Михайлова Елена Сергеевна',
          phone: '+7 (903) 123-45-68',
          email: 'elena@example.com',
          weight: 65,
          seatAssignment: '1B',
          documents: [
            { type: 'passport', number: '0987654321', expiryDate: '2026-06-15', verified: true },
            { type: 'waiver', number: 'W-2024-002', expiryDate: '2024-12-31', verified: true }
          ]
        }
      ],
      crew: [
        {
          id: 'crew-1',
          name: 'Смирнов Андрей Викторович',
          role: 'pilot',
          phone: '+7 (903) 234-56-78',
          email: 'pilot1@gts.ru',
          status: 'busy',
          currentLocation: 'В полёте',
          lastContact: '2024-01-20T11:45:00',
          certifications: ['CPL-H', 'IR', 'Mountain Flying']
        }
      ],
      client: {
        id: 'client-1',
        name: 'Михайлов А.В.',
        phone: '+7 (903) 123-45-67',
        email: 'mikhailov@example.com',
        type: 'individual',
        emergencyContact: {
          name: 'Михайлова Е.С.',
          phone: '+7 (903) 123-45-68',
          relation: 'Супруга'
        }
      },
      bookingId: 'book-001',
      communication: {
        radio: 'connected',
        gps: 'active',
        cellular: 'connected',
        lastContact: '2024-01-20T11:45:00',
        frequency: '121.5 MHz'
      },
      safety: {
        emergencyBeacon: true,
        lifeSafety: true,
        weatherClearance: true,
        flightPlan: true,
        checklistComplete: true,
        lastSafetyCheck: '2024-01-20T09:45:00'
      },
      fuel: 75,
      progress: 60,
      notes: 'Полёт проходит согласно плану. Пассажиры довольны.',
      lastUpdate: '2024-01-20T11:45:00'
    },
    {
      id: 'GTS-002',
      callSign: 'GTS-002',
      name: 'Морская прогулка',
      vehicleType: 'boat',
      vehicleId: 'boat-001',
      vehicleName: 'Морской волк',
      status: 'preparing',
      priority: 'normal',
      startTime: '2024-01-20T14:00:00',
      endTime: '2024-01-20T18:00:00',
      route: ['Порт Адлер', 'Мыс Видный', 'Бухта Инал', 'Порт Адлер'],
      passengers: [
        {
          id: 'pass-3',
          name: 'Петрова Светлана Константиновна',
          phone: '+7 (903) 345-67-89',
          email: 'petrova@example.com',
          weight: 70,
          documents: [
            { type: 'passport', number: '5555666677', expiryDate: '2027-03-20', verified: true }
          ]
        }
      ],
      crew: [
        {
          id: 'crew-2',
          name: 'Петров Игорь Сергеевич',
          role: 'captain',
          phone: '+7 (903) 345-67-90',
          email: 'captain1@gts.ru',
          status: 'ready',
          currentLocation: 'Порт Адлер',
          lastContact: '2024-01-20T11:30:00',
          certifications: ['Master Mariner', 'RYA/MCA Yachtmaster']
        }
      ],
      client: {
        id: 'client-2',
        name: 'Петрова С.К.',
        phone: '+7 (903) 345-67-89',
        email: 'petrova@example.com',
        type: 'individual'
      },
      bookingId: 'book-002',
      communication: {
        radio: 'connected',
        gps: 'active',
        cellular: 'connected',
        lastContact: '2024-01-20T11:30:00',
        frequency: 'VHF Ch 16'
      },
      safety: {
        emergencyBeacon: true,
        lifeSafety: true,
        weatherClearance: true,
        flightPlan: true,
        checklistComplete: false,
        lastSafetyCheck: '2024-01-20T11:00:00'
      },
      fuel: 100,
      progress: 0,
      weatherRestrictions: ['Ветер 18 м/с после 16:00'],
      lastUpdate: '2024-01-20T11:30:00'
    },
    {
      id: 'GTS-003',
      callSign: 'GTS-003',
      name: 'Трек по горам',
      vehicleType: 'buggy',
      vehicleId: 'car-001',
      vehicleName: 'Красная молния',
      status: 'delayed',
      priority: 'high',
      startTime: '2024-01-20T09:00:00',
      endTime: '2024-01-20T13:00:00',
      estimatedEndTime: '2024-01-20T14:00:00',
      route: ['База GTS', 'Горная дорога', 'Видовая площадка', 'База GTS'],
      passengers: [
        {
          id: 'pass-4',
          name: 'Сидоров Дмитрий Игоревич',
          phone: '+7 (903) 456-78-90',
          email: 'sidorov@example.com',
          documents: [
            { type: 'license', number: '77АА123456', expiryDate: '2025-08-15', verified: true }
          ]
        }
      ],
      crew: [
        {
          id: 'crew-3',
          name: 'Орлов Сергей Александрович',
          role: 'guide',
          phone: '+7 (903) 456-78-91',
          email: 'guide1@gts.ru',
          status: 'busy',
          currentLocation: 'На маршруте',
          lastContact: '2024-01-20T11:00:00',
          certifications: ['Mountain Guide', 'First Aid']
        }
      ],
      client: {
        id: 'client-3',
        name: 'Сидоров Д.И.',
        phone: '+7 (903) 456-78-90',
        email: 'sidorov@example.com',
        type: 'individual'
      },
      bookingId: 'book-003',
      communication: {
        radio: 'weak',
        gps: 'active',
        cellular: 'weak',
        lastContact: '2024-01-20T11:00:00'
      },
      safety: {
        emergencyBeacon: true,
        lifeSafety: true,
        weatherClearance: true,
        flightPlan: true,
        checklistComplete: true,
        lastSafetyCheck: '2024-01-20T08:45:00'
      },
      fuel: 45,
      progress: 75,
      notes: 'Задержка из-за технических проблем. Клиент проинформирован.',
      lastUpdate: '2024-01-20T11:00:00'
    }
  ];

  // Utility functions
  const getVehicleIcon = (type: Flight['vehicleType']) => {
    const icons = {
      helicopter: Plane,
      boat: Anchor,
      buggy: Car,
      atv: Car,
      slingshot: Zap
    };
    return icons[type];
  };

  const getStatusColor = (status: Flight['status']) => {
    const colors = {
      preparing: 'bg-blue-500/20 text-blue-400 border-blue-500',
      active: 'bg-green-500/20 text-green-400 border-green-500',
      enroute: 'bg-purple-500/20 text-purple-400 border-purple-500',
      landed: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
      completed: 'bg-gray-500/20 text-gray-400 border-gray-500',
      delayed: 'bg-orange-500/20 text-orange-400 border-orange-500',
      cancelled: 'bg-red-500/20 text-red-400 border-red-500'
    };
    return colors[status];
  };

  const getStatusName = (status: Flight['status']) => {
    const names = {
      preparing: 'Подготовка',
      active: 'В полёте',
      enroute: 'На маршруте',
      landed: 'Приземлился',
      completed: 'Завершён',
      delayed: 'Задержка',
      cancelled: 'Отменён'
    };
    return names[status];
  };

  const getPriorityColor = (priority: Flight['priority']) => {
    const colors = {
      normal: 'text-[#A6A7AA]',
      high: 'text-yellow-400',
      urgent: 'text-red-400'
    };
    return colors[priority];
  };

  const getCommunicationColor = (status: 'connected' | 'weak' | 'lost') => {
    const colors = {
      connected: 'text-green-400',
      weak: 'text-yellow-400',
      lost: 'text-red-400'
    };
    return colors[status];
  };

  // Filter flights
  const filteredFlights = useMemo(() => {
    let filtered = mockFlights;

    if (flightFilter !== 'all') {
      filtered = filtered.filter(flight => flight.status === flightFilter);
    }

    if (vehicleFilter !== 'all') {
      filtered = filtered.filter(flight => flight.vehicleType === vehicleFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(flight =>
        flight.callSign.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.vehicleName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        flight.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [flightFilter, vehicleFilter, searchQuery]);

  // Get statistics
  const flightStats = useMemo(() => {
    return {
      total: mockFlights.length,
      active: mockFlights.filter(f => f.status === 'active' || f.status === 'enroute').length,
      preparing: mockFlights.filter(f => f.status === 'preparing').length,
      completed: mockFlights.filter(f => f.status === 'completed').length,
      delayed: mockFlights.filter(f => f.status === 'delayed').length,
      alerts: mockFlights.filter(f => f.priority === 'urgent' || f.communication.radio === 'lost').length
    };
  }, []);

  // Check permissions
  const canEdit = user.permissions.includes('operations') || user.role === 'executive' || user.role === 'dispatcher';
  const canView = canEdit || user.role === 'manager' || user.role === 'operator';

  if (!canView) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Доступ запрещён</h3>
          <p className="text-[#A6A7AA]">У вас нет прав для просмотра центра операций</p>
        </div>
      </div>
    );
  }

  // Render flight card
  const renderFlightCard = (flight: Flight) => {
    const VehicleIcon = getVehicleIcon(flight.vehicleType);
    const isActive = flight.status === 'active' || flight.status === 'enroute';
    
    return (
      <Card 
        key={flight.id}
        className="bg-[#17181A] border-[#232428] hover:border-[#91040C] transition-colors cursor-pointer"
        onClick={() => setSelectedFlight(flight)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#232428] rounded-lg">
                <VehicleIcon className="w-5 h-5 text-[#A6A7AA]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <CardTitle className="text-white">{flight.callSign}</CardTitle>
                  {flight.priority !== 'normal' && (
                    <AlertTriangle className={`w-4 h-4 ${getPriorityColor(flight.priority)}`} />
                  )}
                </div>
                <CardDescription>{flight.name}</CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor(flight.status)}>
              {getStatusName(flight.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Vehicle and Time */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#A6A7AA]">Техника:</span>
              <p className="text-white">{flight.vehicleName}</p>
            </div>
            <div>
              <span className="text-[#A6A7AA]">Время:</span>
              <p className="text-white">
                {new Date(flight.startTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - 
                {new Date(flight.estimatedEndTime || flight.endTime).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>

          {/* Progress and Fuel */}
          {isActive && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#A6A7AA]">Прогресс</span>
                  <span className="text-white">{flight.progress}%</span>
                </div>
                <div className="w-full bg-[#232428] rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${flight.progress}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-[#A6A7AA]">Топливо</span>
                  <span className="text-white">{flight.fuel}%</span>
                </div>
                <div className="w-full bg-[#232428] rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-300 ${
                      flight.fuel > 50 ? 'bg-green-500' :
                      flight.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${flight.fuel}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          <Separator className="bg-[#232428]" />

          {/* Crew and Passengers */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A6A7AA]" />
                <span className="text-[#A6A7AA]">Экипаж:</span>
              </div>
              <span className="text-white">{flight.crew[0]?.name}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#A6A7AA]" />
                <span className="text-[#A6A7AA]">Пассажиры:</span>
              </div>
              <span className="text-white">{flight.passengers.length} чел.</span>
            </div>
          </div>

          {/* Communication Status */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <Radio className={`w-4 h-4 ${getCommunicationColor(flight.communication.radio)}`} />
                <span className="text-xs text-[#A6A7AA]">Радио</span>
              </div>
              <div className="flex items-center gap-1">
                <Navigation className={`w-4 h-4 ${getCommunicationColor(flight.communication.gps)}`} />
                <span className="text-xs text-[#A6A7AA]">GPS</span>
              </div>
              <div className="flex items-center gap-1">
                <Signal className={`w-4 h-4 ${getCommunicationColor(flight.communication.cellular)}`} />
                <span className="text-xs text-[#A6A7AA]">Сеть</span>
              </div>
            </div>
            <span className="text-xs text-[#A6A7AA]">
              {new Date(flight.lastUpdate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>

          {/* Weather Restrictions */}
          {flight.weatherRestrictions && flight.weatherRestrictions.length > 0 && (
            <Alert className="border-yellow-500 bg-yellow-500/10">
              <AlertTriangle className="h-4 w-4 text-yellow-400" />
              <AlertDescription className="text-yellow-400 text-sm">
                {flight.weatherRestrictions[0]}
              </AlertDescription>
            </Alert>
          )}

          {/* Current Location */}
          {flight.currentLocation && (
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[#A6A7AA]" />
              <span className="text-[#A6A7AA]">Местоположение:</span>
              <span className="text-white">{flight.currentLocation.description}</span>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  // Render detailed flight view
  const renderFlightDetails = () => {
    if (!selectedFlight) return null;

    const VehicleIcon = getVehicleIcon(selectedFlight.vehicleType);

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#232428] rounded-lg">
              <VehicleIcon className="w-6 h-6 text-[#A6A7AA]" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-white">{selectedFlight.callSign}</h2>
              <p className="text-[#A6A7AA]">{selectedFlight.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(selectedFlight.status)}>
              {getStatusName(selectedFlight.status)}
            </Badge>
            {canEdit && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-[#232428]">
                    <Settings className="w-4 h-4 mr-2" />
                    Действия
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#17181A] border-[#232428]" align="end">
                  <DropdownMenuItem onClick={() => setShowScheduleDialog(true)}>
                    <Edit className="w-4 h-4 mr-2" />
                    Изменить расписание
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Users className="w-4 h-4 mr-2" />
                    Изменить экипаж
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Отправить сообщение
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="w-4 h-4 mr-2" />
                    Перейти к брони
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="passengers">Пассажиры</TabsTrigger>
            <TabsTrigger value="crew">Экипаж</TabsTrigger>
            <TabsTrigger value="safety">Безопасность</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            {/* Flight Information */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Информация о рейсе</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Техника</label>
                      <p className="text-white">{selectedFlight.vehicleName}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Маршрут</label>
                      <p className="text-white">{selectedFlight.route.join(' → ')}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Клиент</label>
                      <p className="text-white">{selectedFlight.client.name}</p>
                      <p className="text-sm text-[#A6A7AA]">{selectedFlight.client.phone}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Время полёта</label>
                      <p className="text-white">
                        {new Date(selectedFlight.startTime).toLocaleString('ru-RU')} - 
                        {new Date(selectedFlight.estimatedEndTime || selectedFlight.endTime).toLocaleString('ru-RU')}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Статус</label>
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(selectedFlight.status)}>
                          {getStatusName(selectedFlight.status)}
                        </Badge>
                        {selectedFlight.priority !== 'normal' && (
                          <Badge className="bg-red-500/20 text-red-400">
                            {selectedFlight.priority === 'high' ? 'Высокий приоритет' : 'Срочно'}
                          </Badge>
                        )}
                      </div>
                    </div>
                    {selectedFlight.currentLocation && (
                      <div>
                        <label className="text-sm text-[#A6A7AA]">Текущее местоположение</label>
                        <p className="text-white">{selectedFlight.currentLocation.description}</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedFlight.notes && (
                  <div>
                    <label className="text-sm text-[#A6A7AA]">Заметки</label>
                    <p className="text-white bg-[#232428] p-3 rounded-lg">{selectedFlight.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Progress and Status */}
            {(selectedFlight.status === 'active' || selectedFlight.status === 'enroute') && (
              <div className="grid grid-cols-2 gap-6">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Прогресс</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#A6A7AA]">Выполнено</span>
                          <span className="text-white">{selectedFlight.progress}%</span>
                        </div>
                        <div className="w-full bg-[#232428] rounded-full h-3">
                          <div 
                            className="bg-green-500 h-3 rounded-full transition-all duration-300"
                            style={{ width: `${selectedFlight.progress}%` }}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-[#A6A7AA]">Топливо</span>
                          <span className="text-white">{selectedFlight.fuel}%</span>
                        </div>
                        <div className="w-full bg-[#232428] rounded-full h-3">
                          <div 
                            className={`h-3 rounded-full transition-all duration-300 ${
                              selectedFlight.fuel > 50 ? 'bg-green-500' :
                              selectedFlight.fuel > 25 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${selectedFlight.fuel}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">Связь</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Radio className={`w-4 h-4 ${getCommunicationColor(selectedFlight.communication.radio)}`} />
                          <span className="text-[#A6A7AA]">Радиосвязь</span>
                        </div>
                        <span className={`text-sm ${getCommunicationColor(selectedFlight.communication.radio)}`}>
                          {selectedFlight.communication.radio === 'connected' ? 'Есть связь' :
                           selectedFlight.communication.radio === 'weak' ? 'Слабый сигнал' : 'Нет связи'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Navigation className={`w-4 h-4 ${getCommunicationColor(selectedFlight.communication.gps)}`} />
                          <span className="text-[#A6A7AA]">GPS</span>
                        </div>
                        <span className={`text-sm ${getCommunicationColor(selectedFlight.communication.gps)}`}>
                          {selectedFlight.communication.gps === 'active' ? 'Активен' :
                           selectedFlight.communication.gps === 'weak' ? 'Слабый сигнал' : 'Потерян'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Signal className={`w-4 h-4 ${getCommunicationColor(selectedFlight.communication.cellular)}`} />
                          <span className="text-[#A6A7AA]">Сотовая связь</span>
                        </div>
                        <span className={`text-sm ${getCommunicationColor(selectedFlight.communication.cellular)}`}>
                          {selectedFlight.communication.cellular === 'connected' ? 'Есть сеть' :
                           selectedFlight.communication.cellular === 'weak' ? 'Слабый сигнал' : 'Нет сети'}
                        </span>
                      </div>
                      {selectedFlight.communication.frequency && (
                        <div className="pt-2 border-t border-[#232428]">
                          <span className="text-sm text-[#A6A7AA]">Частота: {selectedFlight.communication.frequency}</span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="passengers" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">
                    Пассажиры ({selectedFlight.passengers.length})
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#A6A7AA]">Показать детали</span>
                    <Switch 
                      checked={showPassengerDetails}
                      onCheckedChange={setShowPassengerDetails}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedFlight.passengers.map((passenger, index) => (
                    <div key={passenger.id} className="p-4 bg-[#232428] rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-white">{passenger.name}</h4>
                          {showPassengerDetails && (
                            <div className="text-sm text-[#A6A7AA] mt-1 space-y-1">
                              {passenger.phone && <div>Телефон: {passenger.phone}</div>}
                              {passenger.email && <div>Email: {passenger.email}</div>}
                              {passenger.weight && <div>Вес: {passenger.weight} кг</div>}
                            </div>
                          )}
                        </div>
                        <div className="text-right">
                          {passenger.seatAssignment && (
                            <Badge className="bg-blue-500/20 text-blue-400">
                              Место {passenger.seatAssignment}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {showPassengerDetails && passenger.documents.length > 0 && (
                        <div>
                          <h5 className="text-sm font-medium text-[#A6A7AA] mb-2">Документы</h5>
                          <div className="space-y-2">
                            {passenger.documents.map((doc, docIndex) => (
                              <div key={docIndex} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                  <FileText className="w-3 h-3 text-[#A6A7AA]" />
                                  <span className="text-white">
                                    {doc.type === 'passport' ? 'Паспорт' :
                                     doc.type === 'license' ? 'Водительское удостоверение' :
                                     doc.type === 'medical' ? 'Медицинская справка' : 'Соглашение'}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-[#A6A7AA]">{doc.number}</span>
                                  {doc.verified ? (
                                    <CheckCircle className="w-3 h-3 text-green-400" />
                                  ) : (
                                    <AlertCircle className="w-3 h-3 text-red-400" />
                                  )}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {passenger.specialRequirements && passenger.specialRequirements.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#17181A]">
                          <h5 className="text-sm font-medium text-[#A6A7AA] mb-1">Особые требования</h5>
                          <ul className="text-sm text-white">
                            {passenger.specialRequirements.map((req, reqIndex) => (
                              <li key={reqIndex}>• {req}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crew" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Экипаж ({selectedFlight.crew.length})</CardTitle>
                  {canEdit && (
                    <Button size="sm" variant="outline" className="border-[#232428]">
                      <Edit className="w-4 h-4 mr-2" />
                      Изменить состав
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {selectedFlight.crew.map(member => (
                    <div key={member.id} className="p-4 bg-[#232428] rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#17181A] text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{member.name}</h4>
                            <p className="text-sm text-[#A6A7AA] capitalize">
                              {member.role === 'pilot' ? 'Пилот' :
                               member.role === 'captain' ? 'Капитан' :
                               member.role === 'instructor' ? 'Инструктор' :
                               member.role === 'guide' ? 'Гид' : 'Механик'}
                            </p>
                          </div>
                        </div>
                        <Badge className={
                          member.status === 'ready' ? 'bg-green-500/20 text-green-400' :
                          member.status === 'busy' ? 'bg-yellow-500/20 text-yellow-400' :
                          member.status === 'unavailable' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }>
                          {member.status === 'ready' ? 'Готов' :
                           member.status === 'busy' ? 'Занят' :
                           member.status === 'unavailable' ? 'Недоступен' : 'Не на смене'}
                        </Badge>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="flex items-center gap-2 text-[#A6A7AA] mb-1">
                            <Phone className="w-3 h-3" />
                            {member.phone}
                          </div>
                          <div className="flex items-center gap-2 text-[#A6A7AA]">
                            <Mail className="w-3 h-3" />
                            {member.email}
                          </div>
                        </div>
                        <div>
                          <div className="text-[#A6A7AA] mb-1">
                            Местоположение: <span className="text-white">{member.currentLocation}</span>
                          </div>
                          <div className="text-[#A6A7AA]">
                            Последний контакт: <span className="text-white">
                              {new Date(member.lastContact).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </span>
                          </div>
                        </div>
                      </div>

                      {member.certifications.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-[#17181A]">
                          <h5 className="text-sm font-medium text-[#A6A7AA] mb-2">Сертификаты</h5>
                          <div className="flex flex-wrap gap-1">
                            {member.certifications.map((cert, index) => (
                              <Badge key={index} className="text-xs bg-blue-500/20 text-blue-400">
                                {cert}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="safety" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Безопасность полёта
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A6A7AA]">Аварийный маяк</span>
                      <div className="flex items-center gap-2">
                        {selectedFlight.safety.emergencyBeacon ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">
                          {selectedFlight.safety.emergencyBeacon ? 'Активен' : 'Неактивен'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#A6A7AA]">Спасательное оборудование</span>
                      <div className="flex items-center gap-2">
                        {selectedFlight.safety.lifeSafety ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">
                          {selectedFlight.safety.lifeSafety ? 'Проверено' : 'Не проверено'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#A6A7AA]">Метеоразрешение</span>
                      <div className="flex items-center gap-2">
                        {selectedFlight.safety.weatherClearance ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">
                          {selectedFlight.safety.weatherClearance ? 'Получено' : 'Не получено'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[#A6A7AA]">План полёта</span>
                      <div className="flex items-center gap-2">
                        {selectedFlight.safety.flightPlan ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">
                          {selectedFlight.safety.flightPlan ? 'Подан' : 'Не подан'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-[#A6A7AA]">Чек-лист</span>
                      <div className="flex items-center gap-2">
                        {selectedFlight.safety.checklistComplete ? (
                          <CheckCircle className="w-4 h-4 text-green-400" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-red-400" />
                        )}
                        <span className="text-white">
                          {selectedFlight.safety.checklistComplete ? 'Выполнен' : 'Не выполнен'}
                        </span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[#A6A7AA]">Последняя проверка</span>
                      <p className="text-white">
                        {new Date(selectedFlight.safety.lastSafetyCheck).toLocaleString('ru-RU')}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="mt-6 pt-6 border-t border-[#232428]">
                  <h4 className="text-white font-medium mb-3">Экстренный контакт</h4>
                  {selectedFlight.client.emergencyContact ? (
                    <div className="p-3 bg-[#232428] rounded-lg">
                      <div className="font-medium text-white">{selectedFlight.client.emergencyContact.name}</div>
                      <div className="text-sm text-[#A6A7AA]">{selectedFlight.client.emergencyContact.relation}</div>
                      <div className="text-sm text-[#A6A7AA] mt-1">{selectedFlight.client.emergencyContact.phone}</div>
                    </div>
                  ) : (
                    <div className="text-[#A6A7AA]">Экстренный контакт не указан</div>
                  )}
                </div>

                {/* Emergency Button */}
                <div className="mt-6 pt-6 border-t border-[#232428]">
                  <Button 
                    size="lg"
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                    onClick={() => setShowEmergencyDialog(true)}
                  >
                    <AlertTriangle className="w-5 h-5 mr-2" />
                    ЭКСТРЕННАЯ СИТУАЦИЯ (SOS)
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-[#0B0B0C] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            Центр операций
          </h1>
          <p className="text-[#A6A7AA]">
            Мониторинг активных рейсов и оперативное управление
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#232428]">
            <Download className="w-4 h-4 mr-2" />
            Отчёт
          </Button>
          {canEdit && (
            <Button 
              size="sm" 
              className="bg-[#91040C] hover:bg-[#91040C]/80"
              onClick={() => setShowScheduleDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать рейс
            </Button>
          )}
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.total}</div>
                <div className="text-xs text-[#A6A7AA]">Всего рейсов</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Play className="w-5 h-5 text-green-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.active}</div>
                <div className="text-xs text-[#A6A7AA]">Активные</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Timer className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.preparing}</div>
                <div className="text-xs text-[#A6A7AA]">Подготовка</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-gray-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.completed}</div>
                <div className="text-xs text-[#A6A7AA]">Завершено</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-orange-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.delayed}</div>
                <div className="text-xs text-[#A6A7AA]">Задержки</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <div>
                <div className="text-lg font-heading text-white">{flightStats.alerts}</div>
                <div className="text-xs text-[#A6A7AA]">Предупреждения</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
          <Input
            placeholder="Поиск по позывному, названию, клиенту..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
          />
        </div>

        <Select value={flightFilter} onValueChange={(value) => setFlightFilter(value as FlightFilter)}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все рейсы</SelectItem>
            <SelectItem value="active">Активные</SelectItem>
            <SelectItem value="preparing">Подготовка</SelectItem>
            <SelectItem value="completed">Завершённые</SelectItem>
            <SelectItem value="delayed">Задержанные</SelectItem>
          </SelectContent>
        </Select>

        <Select value={vehicleFilter} onValueChange={(value) => setVehicleFilter(value as VehicleFilter)}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все типы</SelectItem>
            <SelectItem value="helicopter">Вертолёты</SelectItem>
            <SelectItem value="boat">Катера</SelectItem>
            <SelectItem value="buggy">Багги</SelectItem>
            <SelectItem value="atv">Болотоходы</SelectItem>
            <SelectItem value="slingshot">Slingshot</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex items-center gap-2">
          <Switch checked={showMap} onCheckedChange={setShowMap} />
          <span className="text-sm text-[#A6A7AA]">Показать карту</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-4 gap-6">
        {/* Operations List */}
        <div className="col-span-2">
          <div className="space-y-4">
            {filteredFlights.map(flight => renderFlightCard(flight))}
            
            {filteredFlights.length === 0 && (
              <Card className="bg-[#17181A] border-[#232428] h-64 flex items-center justify-center">
                <CardContent className="text-center">
                  <Activity className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    Рейсы не найдены
                  </h3>
                  <p className="text-[#A6A7AA]">
                    Попробуйте изменить фильтры поиска
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Details and Weather */}
        <div className="col-span-2 space-y-6">
          {/* Flight Details */}
          {selectedFlight ? (
            <div className="bg-[#17181A] border border-[#232428] rounded-lg p-6">
              {renderFlightDetails()}
            </div>
          ) : (
            <Card className="bg-[#17181A] border-[#232428] h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <Eye className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">
                  Выберите рейс
                </h3>
                <p className="text-[#A6A7AA]">
                  Нажмите на карточку рейса для просмотра деталей
                </p>
              </CardContent>
            </Card>
          )}

          {/* Weather Widget */}
          <GTSWeatherWidget 
            location="Сочи, Адлер"
            showAlerts={true}
            showForecast={false}
            className="mt-6"
          />

          {/* Map Placeholder */}
          {showMap && (
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Map className="w-5 h-5" />
                  Карта полётов
                </CardTitle>
              </CardHeader>
              <CardContent className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">
                    GPS-трекинг
                  </h3>
                  <p className="text-[#A6A7AA]">
                    Интеграция с картами в разработке
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Schedule Dialog */}
      <Dialog open={showScheduleDialog} onOpenChange={setShowScheduleDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Изменить расписание</DialogTitle>
            <DialogDescription>
              Обновите время рейса и назначьте экипаж
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Время начала
                </label>
                <Input
                  type="datetime-local"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Время окончания
                </label>
                <Input
                  type="datetime-local"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Экипаж
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите экипаж" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="pilot1">Смирнов А.В. (Пилот)</SelectItem>
                    <SelectItem value="captain1">Петров И.С. (Капитан)</SelectItem>
                    <SelectItem value="guide1">Орлов С.А. (Гид)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Приоритет
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="normal">Обычный</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="urgent">Срочный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Комментарий
                </label>
                <Textarea
                  placeholder="Причина изменения расписания"
                  className="bg-[#232428] border-[#232428] text-white"
                  rows={3}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch />
                <label className="text-sm text-[#A6A7AA]">
                  Уведомить всех участников
                </label>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowScheduleDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Сохранить изменения
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Emergency Dialog */}
      <Dialog open={showEmergencyDialog} onOpenChange={setShowEmergencyDialog}>
        <DialogContent className="bg-[#17181A] border-red-500 text-white max-w-xl">
          <DialogHeader>
            <DialogTitle className="text-red-400 flex items-center gap-2">
              <AlertTriangle className="w-6 h-6" />
              ЭКСТРЕННАЯ СИТУАЦИЯ
            </DialogTitle>
            <DialogDescription className="text-red-300">
              Запуск протокола экстренного реагирования
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Alert className="border-red-500 bg-red-500/10">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-300">
                Этот протокол запустит экстренные процедуры и уведомит службы спасения
              </AlertDescription>
            </Alert>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Тип чрезвычайной ситуации
              </label>
              <Select>
                <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите тип ЧС" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="emergency-landing">Экстренная посадка</SelectItem>
                  <SelectItem value="communication-loss">Потеря связи</SelectItem>
                  <SelectItem value="medical">Медицинская помощь</SelectItem>
                  <SelectItem value="technical">Техническая неисправность</SelectItem>
                  <SelectItem value="weather">Погодные условия</SelectItem>
                  <SelectItem value="other">Другое</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Описание ситуации
              </label>
              <Textarea
                placeholder="Подробное описание чрезвычайной ситуации"
                className="bg-[#232428] border-[#232428] text-white"
                rows={4}
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowEmergencyDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-red-600 hover:bg-red-700">
              ЗАПУСТИТЬ ПРОТОКОЛ SOS
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}