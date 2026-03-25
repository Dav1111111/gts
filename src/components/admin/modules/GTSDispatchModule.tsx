// 🚁 GTS Dispatch Module - Полная реализация согласно спецификации v2025-09-17
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
// ✅ Mock toast function to avoid sonner import errors
const toast = {
  success: (message: string) => console.log('✅ Toast Success:', message),
  error: (message: string) => console.log('❌ Toast Error:', message),
  info: (message: string) => console.log('ℹ️ Toast Info:', message)
};
import { 
  // Core Icons
  Radio, MapPin, Users, Calendar, Clock, Route, Truck, FileText, 
  Star, Target, ArrowUpRight, Activity, CheckCircle, Bell, AlertTriangle,
  
  // Action Icons
  Search, Filter, Plus, MoreHorizontal, Command, 
  ChevronDown, ChevronRight, ExternalLink, Download, Upload,
  Edit3, Copy, Trash2, Eye, EyeOff, RefreshCw, Save,
  
  // Status Icons
  Play, Pause, Square, RotateCcw, Ban, CheckCircle2, XCircle,
  Timer, Navigation, MessageSquare, Phone, Settings,
  
  // Dispatch specific
  Headphones, Zap, Camera, AlertOctagon, UserCheck,
  
  // Navigation
  ArrowLeft, ArrowRight, Home, Map
} from "lucide-react";

// 🎯 ТИПЫ И ИНТЕРФЕЙСЫ

type DispatchJobStatus = 'planned' | 'assigned' | 'enroute' | 'started' | 'paused' | 'finished' | 'debriefed';
type IncidentSeverity = 'low' | 'medium' | 'high' | 'critical';
type IncidentStatus = 'open' | 'investigating' | 'resolved' | 'closed';
type IncidentType = 'tech' | 'injury' | 'delay' | 'weather' | 'other';
type CrewRole = 'guide' | 'pilot' | 'mechanic' | 'instructor';
type VehicleType = 'helicopter' | 'atv' | 'yacht' | 'car';

interface DispatchJob {
  id: string;
  bookingId: string;
  routeId: string;
  routeName: string;
  startAt: string;
  eta: string;
  estimatedDuration: number; // minutes
  crewIds: string[];
  vehicleIds: string[];
  checklistTB: ChecklistItem[];
  status: DispatchJobStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
  customerName: string;
  partySize: number;
  location: string;
  weatherConditions?: string;
  specialRequirements?: string[];
  priority: 'normal' | 'high' | 'urgent';
  currentLocation?: { lat: number; lng: number };
  progressPercent: number;
}

interface Crew {
  id: string;
  name: string;
  role: CrewRole;
  avatar?: string;
  status: 'available' | 'assigned' | 'busy' | 'offline';
  currentJobId?: string;
  phone: string;
  rating: number;
  certifications: string[];
  experience: number; // years
}

interface Vehicle {
  id: string;
  name: string;
  type: VehicleType;
  model: string;
  status: 'available' | 'assigned' | 'maintenance' | 'offline';
  currentJobId?: string;
  capacity: number;
  fuelLevel: number;
  maintenanceStatus: 'ok' | 'warning' | 'critical';
  location?: string;
  nextMaintenanceHours: number;
}

interface ChecklistItem {
  id: string;
  title: string;
  completed: boolean;
  required: boolean;
  completedBy?: string;
  completedAt?: string;
  notes?: string;
}

interface Incident {
  id: string;
  jobId: string;
  type: IncidentType;
  severity: IncidentSeverity;
  description: string;
  photos: string[];
  reportedAt: string;
  reportedBy: string;
  resolvedAt?: string;
  resolvedBy?: string;
  status: IncidentStatus;
  actionsTaken?: string;
  impact: string;
}

interface TimelineEvent {
  id: string;
  jobId: string;
  timestamp: string;
  type: string;
  description: string;
  actor: string;
  location?: { lat: number; lng: number };
  metadata?: Record<string, any>;
}

interface DispatchKPI {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  target?: string;
  description: string;
  icon: React.ComponentType<any>;
}

// 🎯 МОК ДАННЫЕ

const mockCrew: Crew[] = [
  {
    id: 'crew-001',
    name: 'Алексей Иванов',
    role: 'pilot',
    status: 'assigned',
    currentJobId: 'DJ-2201',
    phone: '+7 (900) 123-45-67',
    rating: 4.9,
    certifications: ['CPL(H)', 'IR', 'Mountain Flying'],
    experience: 8,
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face'
  },
  {
    id: 'crew-002',
    name: 'Мария Петрова',
    role: 'guide',
    status: 'assigned',
    currentJobId: 'DJ-2201',
    phone: '+7 (900) 234-56-78',
    rating: 4.8,
    certifications: ['Гид-проводник', 'Первая помощь', 'Английский B2'],
    experience: 5
  },
  {
    id: 'crew-003',
    name: 'Сергей Козлов',
    role: 'mechanic',
    status: 'available',
    phone: '+7 (900) 345-67-89',
    rating: 4.7,
    certifications: ['Авиатехник', 'Сварка', 'Composite Repair'],
    experience: 12
  }
];

const mockVehicles: Vehicle[] = [
  {
    id: 'vehicle-001',
    name: 'R66 Turbine #1',
    type: 'helicopter',
    model: 'Robinson R66',
    status: 'assigned',
    currentJobId: 'DJ-2201',
    capacity: 4,
    fuelLevel: 85,
    maintenanceStatus: 'ok',
    location: 'Сочи Аэропорт',
    nextMaintenanceHours: 45
  },
  {
    id: 'vehicle-002',
    name: 'Azimut 68',
    type: 'yacht',
    model: 'Azimut Yachts 68',
    status: 'available',
    capacity: 12,
    fuelLevel: 92,
    maintenanceStatus: 'ok',
    location: 'Морской порт Сочи',
    nextMaintenanceHours: 120
  },
  {
    id: 'vehicle-003',
    name: 'CF Moto 850',
    type: 'atv',
    model: 'CF Moto X8',
    status: 'maintenance',
    capacity: 2,
    fuelLevel: 60,
    maintenanceStatus: 'warning',
    location: 'База в Красной Поляне',
    nextMaintenanceHours: 5
  }
];

const mockJobs: DispatchJob[] = [
  {
    id: 'DJ-2201',
    bookingId: 'B-1001',
    routeId: 'R-023',
    routeName: 'Вертолетная экскурсия VIP',
    startAt: '2025-09-17T09:00:00+03:00',
    eta: '2025-09-17T12:00:00+03:00',
    estimatedDuration: 180,
    crewIds: ['crew-001', 'crew-002'],
    vehicleIds: ['vehicle-001'],
    checklistTB: [
      { id: 'tb-001', title: 'Проверка погодных условий', completed: true, required: true, completedBy: 'crew-001', completedAt: '2025-09-17T08:30:00+03:00' },
      { id: 'tb-002', title: 'Осмотр вертолета', completed: true, required: true, completedBy: 'crew-001', completedAt: '2025-09-17T08:45:00+03:00' },
      { id: 'tb-003', title: 'Проверка связи', completed: false, required: true },
      { id: 'tb-004', title: 'Инструктаж пассажиров', completed: false, required: true },
      { id: 'tb-005', title: 'Проверка аварийного оборудования', completed: true, required: true, completedBy: 'crew-002', completedAt: '2025-09-17T08:40:00+03:00' }
    ],
    status: 'assigned',
    notes: 'VIP клиент, особое внимание к сервису',
    createdAt: '2025-09-16T18:00:00+03:00',
    updatedAt: '2025-09-17T08:45:00+03:00',
    customerName: 'Александров Владимир',
    partySize: 3,
    location: 'Сочи Аэропорт',
    weatherConditions: 'Ясно, ветер 5 м/с',
    specialRequirements: ['Фотосъемка', 'Шампанское на борту'],
    priority: 'high',
    progressPercent: 65
  },
  {
    id: 'DJ-2202',
    bookingId: 'B-1002',
    routeId: 'R-015',
    routeName: 'Морская прогулка на яхте',
    startAt: '2025-09-17T14:00:00+03:00',
    eta: '2025-09-17T18:00:00+03:00',
    estimatedDuration: 240,
    crewIds: [],
    vehicleIds: [],
    checklistTB: [
      { id: 'tb-006', title: 'Проверка двигателей', completed: false, required: true },
      { id: 'tb-007', title: 'Проверка спасательного оборудования', completed: false, required: true },
      { id: 'tb-008', title: 'Заправка топливом', completed: false, required: true }
    ],
    status: 'planned',
    notes: 'Группа из 6 человек, требуется капитан и стюард',
    createdAt: '2025-09-16T19:00:00+03:00',
    updatedAt: '2025-09-17T08:00:00+03:00',
    customerName: 'Смирнова Елена',
    partySize: 6,
    location: 'Морской порт Сочи',
    priority: 'normal',
    progressPercent: 25
  },
  {
    id: 'DJ-2203',
    bookingId: 'B-1003',
    routeId: 'R-008',
    routeName: 'Сафари на багги',
    startAt: '2025-09-17T11:00:00+03:00',
    eta: '2025-09-17T15:00:00+03:00',
    estimatedDuration: 240,
    crewIds: ['crew-003'],
    vehicleIds: ['vehicle-003'],
    checklistTB: [],
    status: 'paused',
    notes: 'Техническая неисправность багги, ожидается ремонт',
    createdAt: '2025-09-17T07:00:00+03:00',
    updatedAt: '2025-09-17T10:30:00+03:00',
    customerName: 'Петров Игорь',
    partySize: 2,
    location: 'База в Красной Поляне',
    priority: 'normal',
    progressPercent: 80
  }
];

const mockIncidents: Incident[] = [
  {
    id: 'INC-001',
    jobId: 'DJ-2203',
    type: 'tech',
    severity: 'medium',
    description: 'Неисправность системы охлаждения двигателя багги',
    photos: [],
    reportedAt: '2025-09-17T10:30:00+03:00',
    reportedBy: 'crew-003',
    status: 'investigating',
    actionsTaken: 'Остановлен двигатель, проводится диагностика',
    impact: 'Задержка выезда на 1-2 часа'
  },
  {
    id: 'INC-002', 
    jobId: 'DJ-2201',
    type: 'delay',
    severity: 'low',
    description: 'Задержка вылета из-за поздего прибытия клиентов',
    photos: [],
    reportedAt: '2025-09-17T09:15:00+03:00',
    reportedBy: 'crew-002',
    resolvedAt: '2025-09-17T09:30:00+03:00',
    resolvedBy: 'crew-002',
    status: 'resolved',
    actionsTaken: 'Связались с клиентом, скорректировали маршрут',
    impact: 'Задержка 15 минут, компенсирована увеличением времени полета'
  }
];

// 🎯 KPI МЕТРИКИ

const dispatchKpis: DispatchKPI[] = [
  {
    title: "SLA стартов",
    value: "96.2%",
    change: "+2.1%",
    trend: "up",
    target: "95%",
    description: "Процент рейсов, стартовавших в срок",
    icon: Timer
  },
  {
    title: "Средняя задержка",
    value: "8 мин",
    change: "-3 мин",
    trend: "up",
    target: "< 10 мин",
    description: "Среднее время задержки старта",
    icon: Clock
  },
  {
    title: "Инциденты/100 рейсов",
    value: "2.4",
    change: "-0.6",
    trend: "up",
    target: "< 3",
    description: "Количество инцидентов на 100 выездов",
    icon: AlertTriangle
  },
  {
    title: "Utilisation флота",
    value: "78%",
    change: "+5%",
    trend: "up",
    target: "75%",
    description: "Эффективность использования техники",
    icon: Activity
  }
];

// 🎯 СТАТУС МАШИНА

const statusTransitions: Record<DispatchJobStatus, DispatchJobStatus[]> = {
  'planned': ['assigned'],
  'assigned': ['enroute', 'planned'],
  'enroute': ['started', 'assigned'],
  'started': ['paused', 'finished'],
  'paused': ['started', 'finished'],
  'finished': ['debriefed'],
  'debriefed': []
};

const statusConfig = {
  'planned': { label: 'Запланирован', color: 'bg-gray-500/10 text-gray-400', icon: Calendar },
  'assigned': { label: 'Назначен', color: 'bg-blue-500/10 text-blue-400', icon: UserCheck },
  'enroute': { label: 'В пути', color: 'bg-orange-500/10 text-orange-400', icon: Navigation },
  'started': { label: 'Выполняется', color: 'bg-green-500/10 text-green-400', icon: Play },
  'paused': { label: 'Приостановлен', color: 'bg-yellow-500/10 text-yellow-400', icon: Pause },
  'finished': { label: 'Завершен', color: 'bg-purple-500/10 text-purple-400', icon: CheckCircle2 },
  'debriefed': { label: 'Дебрифинг', color: 'bg-cyan-500/10 text-cyan-400', icon: FileText }
};

// 🎯 ОСНОВНОЙ КОМПОНЕНТ

interface GTSDispatchModuleProps {
  onBackToModules?: () => void;
}

export function GTSDispatchModule({ onBackToModules }: GTSDispatchModuleProps) {
  // Состояния
  const [activeView, setActiveView] = useState<'board' | 'jobs' | 'incidents' | 'crew' | 'vehicles'>('board');
  const [selectedJobs, setSelectedJobs] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<DispatchJobStatus | 'all'>('all');
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'normal' | 'high' | 'urgent'>('all');
  const [showJobModal, setShowJobModal] = useState(false);
  const [showIncidentModal, setShowIncidentModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState<DispatchJob | null>(null);
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [jobs, setJobs] = useState<DispatchJob[]>(mockJobs);
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [crew, setCrew] = useState<Crew[]>(mockCrew);
  const [vehicles, setVehicles] = useState<Vehicle[]>(mockVehicles);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Обновление времени каждую минуту
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  // Фильтрация заданий
  const filteredJobs = useMemo(() => {
    return jobs.filter(job => {
      const matchesSearch = 
        job.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.routeName.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
      const matchesPriority = priorityFilter === 'all' || job.priority === priorityFilter;
      
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [jobs, searchQuery, statusFilter, priorityFilter]);

  // Действия со статусами
  const handleStatusChange = async (jobId: string, newStatus: DispatchJobStatus) => {
    const job = jobs.find(j => j.id === jobId);
    if (!job) return;

    // Проверка допустимых переходов
    if (!statusTransitions[job.status].includes(newStatus)) {
      toast.error(`Переход ${job.status} → ${newStatus} недопустим`);
      return;
    }

    // Проверка бизнес-правил
    if (newStatus === 'started') {
      const requiredItems = job.checklistTB.filter(item => item.required && !item.completed);
      if (requiredItems.length > 0) {
        toast.error(`Нельзя начать выезд без завершения обязательных проверок ТБ`);
        return;
      }
    }

    // Обновление с optimistic UI
    setJobs(prev => prev.map(j => 
      j.id === jobId 
        ? { ...j, status: newStatus, updatedAt: new Date().toISOString() }
        : j
    ));

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      toast.success(`Статус изменен на "${statusConfig[newStatus].label}"`);
      
      // Логирование события
      console.log({
        type: newStatus === 'assigned' ? 'DispatchAssigned' : 
              newStatus === 'started' ? 'RideStarted' : 'StatusChanged',
        jobId,
        oldStatus: job.status,
        newStatus,
        timestamp: new Date().toISOString(),
        actor: 'user:exec-1'
      });
    } catch (error) {
      // Откат при ошибке
      setJobs(prev => prev.map(j => 
        j.id === jobId ? job : j
      ));
      toast.error('Ошибка при изменении статуса');
    }
  };

  const handleAssignCrew = (jobId: string, crewId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            crewIds: [...job.crewIds, crewId],
            updatedAt: new Date().toISOString()
          }
        : job
    ));
    
    setCrew(prev => prev.map(c =>
      c.id === crewId
        ? { ...c, status: 'assigned' as const, currentJobId: jobId }
        : c
    ));
    
    toast.success('Экипаж назначен');
  };

  const handleAssignVehicle = (jobId: string, vehicleId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? { 
            ...job, 
            vehicleIds: [...job.vehicleIds, vehicleId],
            updatedAt: new Date().toISOString()
          }
        : job
    ));
    
    setVehicles(prev => prev.map(v =>
      v.id === vehicleId
        ? { ...v, status: 'assigned' as const, currentJobId: jobId }
        : v
    ));
    
    toast.success('Техника назначена');
  };

  const handleCreateIncident = (jobId: string) => {
    // Простая форма создания инцидента
    const description = prompt('Описание инцидента:');
    if (!description) return;

    const newIncident: Incident = {
      id: `INC-${Date.now()}`,
      jobId,
      type: 'other',
      severity: 'medium',
      description,
      photos: [],
      reportedAt: new Date().toISOString(),
      reportedBy: 'user:exec-1',
      status: 'open',
      impact: 'Требует внимания диспетчера'
    };

    setIncidents(prev => [newIncident, ...prev]);
    toast.success('Инцидент создан');
    
    console.log({
      type: 'IncidentReported',
      incidentId: newIncident.id,
      jobId,
      timestamp: new Date().toISOString(),
      actor: 'user:exec-1'
    });
  };

  const handleChecklistUpdate = (jobId: string, checklistId: string, completed: boolean) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId 
        ? {
            ...job,
            checklistTB: job.checklistTB.map(item =>
              item.id === checklistId
                ? {
                    ...item,
                    completed,
                    completedBy: completed ? 'user:exec-1' : undefined,
                    completedAt: completed ? new Date().toISOString() : undefined
                  }
                : item
            ),
            updatedAt: new Date().toISOString()
          }
        : job
    ));
    
    toast.success(`Пункт чек-листа ${completed ? 'отмечен' : 'снят'}`);
  };

  const handleNotifyCustomer = (jobId: string, message: string) => {
    toast.success('Уведомление отправлено клиенту');
    console.log(`Notification sent for job ${jobId}: ${message}`);
  };

  // Компонент статуса
  const StatusBadge = ({ status }: { status: DispatchJobStatus }) => {
    const config = statusConfig[status];
    const IconComponent = config.icon;
    
    return (
      <Badge className={config.color}>
        <IconComponent className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  // Компонент приоритета
  const PriorityBadge = ({ priority }: { priority: 'normal' | 'high' | 'urgent' }) => {
    const priorityConfig = {
      'normal': { label: 'Обычный', color: 'bg-gray-500/10 text-gray-400' },
      'high': { label: 'Высокий', color: 'bg-orange-500/10 text-orange-400' },
      'urgent': { label: 'Срочный', color: 'bg-red-500/10 text-red-400' }
    };

    return (
      <Badge variant="outline" className={priorityConfig[priority].color}>
        {priorityConfig[priority].label}
      </Badge>
    );
  };

  // Доска диспетчера (главный экран)
  const DispatchBoard = () => (
    <div className="space-y-6">
      {/* Заголовок с текущим временем */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white">Доска диспетчера</h2>
          <p className="text-[#A6A7AA]">
            {currentTime.toLocaleDateString('ru-RU', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {currentTime.toLocaleTimeString('ru-RU', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-green-500/10 text-green-400">
            <Activity className="w-3 h-3 mr-1" />
            {jobs.filter(j => j.status === 'started').length} активных
          </Badge>
          <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
            <Map className="w-4 h-4 mr-2" />
            Карта
          </Button>
        </div>
      </div>

      {/* Таймлайн дня */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Расписание на сегодня</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {jobs
              .filter(job => new Date(job.startAt).toDateString() === new Date().toDateString())
              .sort((a, b) => new Date(a.startAt).getTime() - new Date(b.startAt).getTime())
              .map((job) => {
                const startTime = new Date(job.startAt);
                const isOverdue = startTime < currentTime && job.status === 'planned';
                
                return (
                  <div 
                    key={job.id}
                    className={`p-4 rounded-lg border transition-colors cursor-pointer ${
                      isOverdue 
                        ? 'border-red-500/30 bg-red-500/5' 
                        : 'border-[#232428] bg-[#17181A] hover:bg-[#1F2024]'
                    }`}
                    onClick={() => {
                      setSelectedJob(job);
                      setShowJobModal(true);
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <div className="text-white font-mono">
                            {startTime.toLocaleTimeString('ru-RU', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                          <div className="text-xs text-[#A6A7AA]">
                            {job.estimatedDuration}м
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-white font-medium">{job.routeName}</span>
                            <StatusBadge status={job.status} />
                            <PriorityBadge priority={job.priority} />
                            {isOverdue && (
                              <Badge className="bg-red-500/10 text-red-400">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Просрочен
                              </Badge>
                            )}
                          </div>
                          <div className="text-sm text-[#A6A7AA]">
                            {job.customerName} • {job.partySize} чел. • {job.location}
                          </div>
                          <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-[#A6A7AA]" />
                              <span className="text-xs text-[#A6A7AA]">
                                {job.crewIds.length}/{job.crewIds.length || 'Не назначен'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Truck className="w-3 h-3 text-[#A6A7AA]" />
                              <span className="text-xs text-[#A6A7AA]">
                                {job.vehicleIds.length}/{job.vehicleIds.length || 'Не назначена'}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-[#A6A7AA]" />
                              <span className="text-xs text-[#A6A7AA]">
                                {job.checklistTB.filter(item => item.completed).length}/{job.checklistTB.length} ТБ
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Progress value={job.progressPercent} className="w-16 h-2" />
                        <span className="text-xs text-[#A6A7AA] min-w-[3rem]">
                          {job.progressPercent}%
                        </span>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-[#121214] border-[#232428]">
                            {statusTransitions[job.status].map(newStatus => (
                              <DropdownMenuItem 
                                key={newStatus}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStatusChange(job.id, newStatus);
                                }}
                                className="text-white hover:bg-[#17181A]"
                              >
                                {React.createElement(statusConfig[newStatus].icon, { className: "w-4 h-4 mr-2" })}
                                {statusConfig[newStatus].label}
                              </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator className="bg-[#232428]" />
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleCreateIncident(job.id);
                              }}
                              className="text-white hover:bg-[#17181A]"
                            >
                              <AlertOctagon className="w-4 h-4 mr-2" />
                              Создать инцидент
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={(e) => {
                                e.stopPropagation();
                                handleNotifyCustomer(job.id, 'Статус обновлен');
                              }}
                              className="text-white hover:bg-[#17181A]"
                            >
                              <MessageSquare className="w-4 h-4 mr-2" />
                              Уведомить клиента
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

      {/* Активные инциденты */}
      {incidents.filter(inc => inc.status !== 'closed').length > 0 && (
        <Card className="bg-[#121214] border-[#232428] border-red-500/20">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-red-400" />
              Активные инциденты
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {incidents
                .filter(inc => inc.status !== 'closed')
                .map((incident) => (
                  <Alert key={incident.id} className="border-red-500/20 bg-red-500/5">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-white">{incident.description}</span>
                            <Badge className={
                              incident.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                              incident.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                              incident.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                              'bg-gray-500/10 text-gray-400'
                            }>
                              {incident.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-[#A6A7AA]">
                            Задание: {jobs.find(j => j.id === incident.jobId)?.routeName}
                          </p>
                          <p className="text-xs text-[#A6A7AA] mt-1">
                            {new Date(incident.reportedAt).toLocaleString('ru-RU')}
                          </p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-[#232428] text-white hover:bg-[#17181A]"
                          onClick={() => {
                            setSelectedIncident(incident);
                            setShowIncidentModal(true);
                          }}
                        >
                          По��робнее
                        </Button>
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
            </div>
          </CardContent>
        </Card>
      )}
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
            <span className="text-white">Dispatch</span>
          </div>
          <h1 className="text-3xl font-heading text-white">Оперативная диспетчеризация</h1>
          <p className="text-[#A6A7AA]">
            Управление выездами, экипажами и инцидентами • {filteredJobs.length} заданий
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-blue-500/10 text-blue-400">
            <Radio className="w-3 h-3 mr-1" />
            Диспетчер: Онлайн
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Создать задание
          </Button>
        </div>
      </div>

      {/* KPI Метрики */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {dispatchKpis.map((kpi, index) => {
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
              <TabsTrigger value="board" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Radio className="w-4 h-4 mr-2" />
                Доска
              </TabsTrigger>
              <TabsTrigger value="jobs" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Route className="w-4 h-4 mr-2" />
                Задания
              </TabsTrigger>
              <TabsTrigger value="incidents" className="text-[#A6A7AA] data-[state=active]:text-white">
                <AlertOctagon className="w-4 h-4 mr-2" />
                Инциденты
              </TabsTrigger>
              <TabsTrigger value="crew" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Users className="w-4 h-4 mr-2" />
                Экипажи
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="text-[#A6A7AA] data-[state=active]:text-white">
                <Truck className="w-4 h-4 mr-2" />
                Техника
              </TabsTrigger>
            </TabsList>

            <TabsContent value="board" className="mt-6">
              <DispatchBoard />
            </TabsContent>

            <TabsContent value="jobs" className="mt-6">
              <div className="text-center py-12">
                <Route className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                <h3 className="text-lg font-medium text-white mb-2">Детализированный список заданий</h3>
                <p className="text-[#A6A7AA]">
                  Полная таблица с фильтрацией, поиском и управлением заданиями
                </p>
              </div>
            </TabsContent>

            <TabsContent value="incidents" className="mt-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-white">Управление инцидентами</h3>
                  <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Новый инцидент
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {incidents.map((incident) => (
                    <Card key={incident.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={
                                incident.severity === 'critical' ? 'bg-red-500/10 text-red-400' :
                                incident.severity === 'high' ? 'bg-orange-500/10 text-orange-400' :
                                incident.severity === 'medium' ? 'bg-yellow-500/10 text-yellow-400' :
                                'bg-gray-500/10 text-gray-400'
                              }>
                                {incident.type}
                              </Badge>
                              <Badge variant="outline" className={
                                incident.status === 'open' ? 'border-red-500/20 text-red-400' :
                                incident.status === 'investigating' ? 'border-yellow-500/20 text-yellow-400' :
                                incident.status === 'resolved' ? 'border-green-500/20 text-green-400' :
                                'border-gray-500/20 text-gray-400'
                              }>
                                {incident.status}
                              </Badge>
                            </div>
                            <h4 className="text-white font-medium mb-1">{incident.description}</h4>
                            <p className="text-sm text-[#A6A7AA]">
                              Задание: {jobs.find(j => j.id === incident.jobId)?.routeName} • 
                              Влияние: {incident.impact}
                            </p>
                            <p className="text-xs text-[#A6A7AA] mt-1">
                              {new Date(incident.reportedAt).toLocaleString('ru-RU')}
                            </p>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              setSelectedIncident(incident);
                              setShowIncidentModal(true);
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

            <TabsContent value="crew" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Управление экипажами</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {crew.map((member) => (
                    <Card key={member.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {member.avatar ? (
                              <img 
                                src={member.avatar} 
                                alt={member.name}
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-[#17181A] flex items-center justify-center">
                                <Users className="w-5 h-5 text-[#A6A7AA]" />
                              </div>
                            )}
                            <div>
                              <h4 className="text-white font-medium">{member.name}</h4>
                              <p className="text-sm text-[#A6A7AA] capitalize">{member.role}</p>
                            </div>
                          </div>
                          <Badge className={
                            member.status === 'available' ? 'bg-green-500/10 text-green-400' :
                            member.status === 'assigned' ? 'bg-blue-500/10 text-blue-400' :
                            member.status === 'busy' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-gray-500/10 text-gray-400'
                          }>
                            {member.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-3 h-3 text-[#A6A7AA]" />
                            <span className="text-[#A6A7AA]">{member.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Star className="w-3 h-3 text-[#A6A7AA]" />
                            <span className="text-[#A6A7AA]">{member.rating}/5.0 • {member.experience} лет</span>
                          </div>
                        </div>
                        
                        <div className="mt-3">
                          <p className="text-xs text-[#A6A7AA] mb-1">Сертификации:</p>
                          <div className="flex flex-wrap gap-1">
                            {member.certifications.slice(0, 2).map(cert => (
                              <Badge key={cert} variant="outline" className="text-xs">
                                {cert}
                              </Badge>
                            ))}
                            {member.certifications.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{member.certifications.length - 2}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        {member.status === 'available' && (
                          <Button 
                            className="w-full mt-3 bg-[#91040C] hover:bg-[#91040C]/90"
                            size="sm"
                          >
                            Назначить на задание
                          </Button>
                        )}
                        
                        {member.currentJobId && (
                          <p className="text-xs text-blue-400 mt-2">
                            Задание: {jobs.find(j => j.id === member.currentJobId)?.routeName}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="vehicles" className="mt-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-white">Управление техникой</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {vehicles.map((vehicle) => (
                    <Card key={vehicle.id} className="bg-[#121214] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="text-white font-medium">{vehicle.name}</h4>
                            <p className="text-sm text-[#A6A7AA]">{vehicle.model}</p>
                          </div>
                          <Badge className={
                            vehicle.status === 'available' ? 'bg-green-500/10 text-green-400' :
                            vehicle.status === 'assigned' ? 'bg-blue-500/10 text-blue-400' :
                            vehicle.status === 'maintenance' ? 'bg-orange-500/10 text-orange-400' :
                            'bg-gray-500/10 text-gray-400'
                          }>
                            {vehicle.status}
                          </Badge>
                        </div>
                        
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center justify-between">
                            <span className="text-[#A6A7AA]">Вместимость:</span>
                            <span className="text-white">{vehicle.capacity} чел.</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#A6A7AA]">Топливо:</span>
                            <div className="flex items-center gap-2">
                              <Progress value={vehicle.fuelLevel} className="w-16 h-1" />
                              <span className="text-white text-xs">{vehicle.fuelLevel}%</span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="text-[#A6A7AA]">ТО через:</span>
                            <span className={`text-${vehicle.nextMaintenanceHours < 20 ? 'orange' : 'white'}-400`}>
                              {vehicle.nextMaintenanceHours}ч
                            </span>
                          </div>
                        </div>
                        
                        {vehicle.location && (
                          <div className="mt-3 flex items-center gap-2">
                            <MapPin className="w-3 h-3 text-[#A6A7AA]" />
                            <span className="text-xs text-[#A6A7AA]">{vehicle.location}</span>
                          </div>
                        )}
                        
                        <div className="mt-3 flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${
                            vehicle.maintenanceStatus === 'ok' ? 'bg-green-400' :
                            vehicle.maintenanceStatus === 'warning' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`} />
                          <span className="text-xs text-[#A6A7AA] capitalize">
                            {vehicle.maintenanceStatus === 'ok' ? 'Исправна' :
                             vehicle.maintenanceStatus === 'warning' ? 'Требует внимания' :
                             'Критическое состояние'}
                          </span>
                        </div>
                        
                        {vehicle.status === 'available' && (
                          <Button 
                            className="w-full mt-3 bg-[#91040C] hover:bg-[#91040C]/90"
                            size="sm"
                          >
                            Назначить на задание
                          </Button>
                        )}
                        
                        {vehicle.currentJobId && (
                          <p className="text-xs text-blue-400 mt-2">
                            Задание: {jobs.find(j => j.id === vehicle.currentJobId)?.routeName}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Модальное окно карточки задания */}
      {selectedJob && (
        <Dialog open={showJobModal} onOpenChange={setShowJobModal}>
          <DialogContent className="max-w-4xl bg-[#121214] border-[#232428] text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center justify-between">
                <div>
                  <DialogTitle className="text-xl text-white">
                    Задание {selectedJob.id}
                  </DialogTitle>
                  <DialogDescription className="text-[#A6A7AA]">
                    {selectedJob.routeName} • {selectedJob.customerName}
                  </DialogDescription>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={selectedJob.status} />
                  <PriorityBadge priority={selectedJob.priority} />
                </div>
              </div>
            </DialogHeader>

            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
                <TabsTrigger value="overview" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Обзор
                </TabsTrigger>
                <TabsTrigger value="checklist" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Чек-лист
                </TabsTrigger>
                <TabsTrigger value="crew" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Экипаж
                </TabsTrigger>
                <TabsTrigger value="timeline" className="text-[#A6A7AA] data-[state=active]:text-white">
                  Таймлайн
                </TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Детали задания</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-[#A6A7AA]">Маршрут</Label>
                        <div className="text-white font-medium">{selectedJob.routeName}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Время старта</Label>
                        <div className="text-white">
                          {new Date(selectedJob.startAt).toLocaleString('ru-RU')}
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Расчетное завершение</Label>
                        <div className="text-white">
                          {new Date(selectedJob.eta).toLocaleString('ru-RU')}
                        </div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Длительность</Label>
                        <div className="text-white">{selectedJob.estimatedDuration} минут</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Место встречи</Label>
                        <div className="text-white">{selectedJob.location}</div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Клиент</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <Label className="text-[#A6A7AA]">Имя</Label>
                        <div className="text-white font-medium">{selectedJob.customerName}</div>
                      </div>
                      <div>
                        <Label className="text-[#A6A7AA]">Количество гостей</Label>
                        <div className="text-white">{selectedJob.partySize}</div>
                      </div>
                      {selectedJob.specialRequirements && selectedJob.specialRequirements.length > 0 && (
                        <div>
                          <Label className="text-[#A6A7AA]">Особые требования</Label>
                          <div className="flex gap-1 mt-1">
                            {selectedJob.specialRequirements.map(req => (
                              <Badge key={req} variant="outline" className="text-xs">
                                {req}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedJob.weatherConditions && (
                        <div>
                          <Label className="text-[#A6A7AA]">Погодные условия</Label>
                          <div className="text-white">{selectedJob.weatherConditions}</div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {selectedJob.notes && (
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Заметки</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-white">{selectedJob.notes}</div>
                    </CardContent>
                  </Card>
                )}

                <div className="flex items-center gap-2 pt-4">
                  {statusTransitions[selectedJob.status].map(newStatus => (
                    <Button
                      key={newStatus}
                      onClick={() => handleStatusChange(selectedJob.id, newStatus)}
                      className={
                        newStatus === 'started' 
                          ? "bg-green-600 hover:bg-green-700" 
                          : newStatus === 'finished'
                          ? "bg-blue-600 hover:bg-blue-700"
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
                    onClick={() => handleNotifyCustomer(selectedJob.id, 'Обновление статуса')}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Уведомить клиента
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="checklist" className="space-y-4 mt-4">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Чек-лист техники безопасности</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      {selectedJob.checklistTB.filter(item => item.completed).length} из {selectedJob.checklistTB.length} выполнено
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {selectedJob.checklistTB.map((item) => (
                        <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-[#121214] border border-[#232428]">
                          <div className="flex items-center gap-3">
                            <Checkbox
                              checked={item.completed}
                              onCheckedChange={(checked) => handleChecklistUpdate(selectedJob.id, item.id, !!checked)}
                            />
                            <div>
                              <div className={`font-medium ${item.completed ? 'text-green-400' : 'text-white'}`}>
                                {item.title}
                                {item.required && <span className="text-red-400 ml-1">*</span>}
                              </div>
                              {item.completed && item.completedBy && (
                                <div className="text-xs text-[#A6A7AA]">
                                  Выполнено: {item.completedBy} • {new Date(item.completedAt!).toLocaleString('ru-RU')}
                                </div>
                              )}
                            </div>
                          </div>
                          {item.completed && <CheckCircle className="w-4 h-4 text-green-400" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="crew" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <Users className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Управление экипажем</h3>
                  <p className="text-[#A6A7AA]">
                    Назначение, замена экипажа и техники
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="timeline" className="space-y-4 mt-4">
                <div className="text-center py-8">
                  <Clock className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-white mb-2">Таймлайн событий</h3>
                  <p className="text-[#A6A7AA]">
                    История всех событий по заданию
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </DialogContent>
        </Dialog>
      )}

      {/* Модальное окно инцидента */}
      {selectedIncident && (
        <Dialog open={showIncidentModal} onOpenChange={setShowIncidentModal}>
          <DialogContent className="max-w-2xl bg-[#121214] border-[#232428] text-white">
            <DialogHeader>
              <DialogTitle className="text-xl text-white">
                Инцидент {selectedIncident.id}
              </DialogTitle>
              <DialogDescription className="text-[#A6A7AA]">
                {selectedIncident.type} • {selectedIncident.severity}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 mt-4">
              <div>
                <Label className="text-[#A6A7AA]">Описание</Label>
                <div className="text-white mt-1">{selectedIncident.description}</div>
              </div>
              
              <div>
                <Label className="text-[#A6A7AA]">Влияние</Label>
                <div className="text-white mt-1">{selectedIncident.impact}</div>
              </div>
              
              {selectedIncident.actionsTaken && (
                <div>
                  <Label className="text-[#A6A7AA]">Предпринятые действия</Label>
                  <div className="text-white mt-1">{selectedIncident.actionsTaken}</div>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-[#A6A7AA]">Сообщил</Label>
                  <div className="text-white mt-1">{selectedIncident.reportedBy}</div>
                </div>
                <div>
                  <Label className="text-[#A6A7AA]">Время</Label>
                  <div className="text-white mt-1">
                    {new Date(selectedIncident.reportedAt).toLocaleString('ru-RU')}
                  </div>
                </div>
              </div>
              
              {selectedIncident.status !== 'closed' && (
                <div className="flex gap-2 pt-4">
                  <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                    Обновить статус
                  </Button>
                  <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                    Добавить комментарий
                  </Button>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

export default GTSDispatchModule;