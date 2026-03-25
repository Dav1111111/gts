import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  MoreVertical,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Edit,
  Target,
  Activity,
  Users,
  Send,
  Bot,
  Smile,
  Frown,
  Meh,
  Paperclip,
  Image,
  Mic,
  MoreHorizontal,
  UserPlus,
  BookOpen,
  Brain,
  Settings,
  Eye,
  ArrowUpRight,
  AlertTriangle,
  ExternalLink,
  UserCheck,
  CircleDot,
  Briefcase,
  CheckCircle2,
  XCircle,
  Timer,
  RotateCcw,
  Anchor,
  Plane,
  Car,
  Users2,
  MapPin
} from "lucide-react";
import { GTSClientCard } from "./GTSClientCard";
import { GTSDealCard } from "./GTSDealCard";
import { GTSQualityTrendsDashboard } from "./GTSQualityTrendsDashboard";
import { GTSEnhancedBookingModal } from "./GTSEnhancedBookingModal";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Alert, AlertDescription } from "../../ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";

interface GTSCRMWithOmniInboxProps {
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

// Mock data for CRM - Enhanced with SLA and UTM tracking
const mockLeads = [
  {
    id: "lead-001",
    name: "Александр Петров",
    company: "TechCorp LLC",
    email: "a.petrov@techcorp.ru",
    phone: "+7 905 123-45-67",
    source: "Website",
    utmSource: "google",
    utmMedium: "cpc",
    utmCampaign: "luxury_helicopters",
    status: "hot",
    score: 92,
    owner: "Maria Smirnova",
    createdAt: "2024-12-01T10:00:00Z",
    lastActivity: "2024-12-01T14:30:00Z",
    lastResponseTime: "2024-12-01T14:32:00Z", // 2 минуты ответа - норма
    value: 450000,
    slaStatus: "normal",
    isDuplicate: false,
    duplicateOf: null,
    timeline: [
      { id: 1, type: "call", description: "Входящий звонок", timestamp: "2024-12-01T10:00:00Z", agent: "System" },
      { id: 2, type: "email", description: "Отправлено коммерческое предложение", timestamp: "2024-12-01T14:30:00Z", agent: "Maria Smirnova" },
      { id: 3, type: "whatsapp", description: "Подтверждение интереса в WhatsApp", timestamp: "2024-12-01T14:32:00Z", agent: "Maria Smirnova" }
    ]
  },
  {
    id: "lead-002",
    name: "Ольга Козлова", 
    company: "Premium Events",
    email: "o.kozlova@events.ru",
    phone: "+7 903 987-65-43",
    source: "Instagram",
    utmSource: "instagram",
    utmMedium: "social",
    utmCampaign: "yacht_summer",
    status: "warm",
    score: 78,
    owner: "Dmitri Volkov",
    createdAt: "2024-11-29T15:20:00Z",
    lastActivity: "2024-11-30T09:15:00Z",
    lastResponseTime: null, // Нет ответа еще
    value: 280000,
    slaStatus: "critical", // Более 10 минут без ответа
    isDuplicate: false,
    duplicateOf: null,
    timeline: [
      { id: 1, type: "form", description: "Заполнена форма на сайте", timestamp: "2024-11-29T15:20:00Z", agent: "System" },
      { id: 2, type: "call", description: "Попытка дозвона - недоступен", timestamp: "2024-11-30T09:15:00Z", agent: "Dmitri Volkov" }
    ]
  },
  {
    id: "lead-003",
    name: "Михаил Соколов",
    company: "Event Plus",
    email: "m.sokolov@eventplus.ru",
    phone: "+7 905 123-45-67", // Дубликат номера с первым лидом
    source: "Telegram",
    utmSource: "telegram",
    utmMedium: "messenger", 
    utmCampaign: "winter_tours",
    status: "cold",
    score: 45,
    owner: "Anna Kuznetsova",
    createdAt: "2024-12-01T16:45:00Z",
    lastActivity: "2024-12-01T16:45:00Z",
    lastResponseTime: null,
    value: 180000,
    slaStatus: "warning", // 5-10 минут
    isDuplicate: true,
    duplicateOf: "lead-001", // Дубликат первого лида по телефону
    timeline: [
      { id: 1, type: "message", description: "Сообщение в Telegram боте", timestamp: "2024-12-01T16:45:00Z", agent: "Bot" }
    ]
  },
  {
    id: "lead-004",
    name: "Елена Михайлова",
    company: "Luxury Travel",
    email: "e.mikhaylova@luxtravel.com",
    phone: "+7 912 555-77-88",
    source: "Referral Partner",
    utmSource: "partner",
    utmMedium: "referral",
    utmCampaign: "vip_network",
    status: "hot",
    score: 89,
    owner: "Maria Smirnova",
    createdAt: "2024-12-01T11:30:00Z",
    lastActivity: "2024-12-01T13:15:00Z", 
    lastResponseTime: "2024-12-01T13:17:00Z", // 2 минуты ответа
    value: 750000,
    slaStatus: "normal",
    isDuplicate: false,
    duplicateOf: null,
    timeline: [
      { id: 1, type: "referral", description: "Рекомендация от партнера", timestamp: "2024-12-01T11:30:00Z", agent: "Partner Bot" },
      { id: 2, type: "call", description: "Личный звонок менеджера", timestamp: "2024-12-01T13:15:00Z", agent: "Maria Smirnova" },
      { id: 3, type: "meeting", description: "Назначена встреча на завтра", timestamp: "2024-12-01T13:17:00Z", agent: "Maria Smirnova" }
    ]
  }
];

// Mock data for Deals Kanban - Enhanced with B2C and B2B pipelines
const mockDeals = [
  {
    id: "deal-001",
    clientName: "Александр Петров",
    company: "TechCorp LLC",
    value: 450000,
    deadline: "2024-12-20T00:00:00Z",
    source: "Website",
    pipeline: "B2C",
    stage: "qualified",
    risk: "low",
    owner: "Maria Smirnova",
    createdAt: "2024-12-01T10:00:00Z",
    movedToStageAt: "2024-12-01T16:30:00Z", // 8 days ago - normal
    description: "Вертолетная экскурсия для корпоративного мероприятия"
  },
  {
    id: "deal-002", 
    clientName: "Ольга Козлова",
    company: "Premium Events",
    value: 1250000,
    deadline: "2024-12-15T00:00:00Z",
    source: "Referral",
    pipeline: "B2B",
    stage: "proposal",
    risk: "medium",
    owner: "Dmitri Volkov",
    createdAt: "2024-11-15T09:00:00Z",
    movedToStageAt: "2024-11-17T14:20:00Z", // 16 days ago - STUCK
    description: "Комплексный пакет для свадебного агентства"
  },
  {
    id: "deal-003",
    clientName: "Михаил Соколов", 
    company: "Event Plus",
    value: 350000,
    deadline: "2024-12-25T00:00:00Z",
    source: "Instagram",
    pipeline: "B2C",
    stage: "prepaid",
    risk: "low",
    owner: "Anna Kuznetsova",
    createdAt: "2024-11-25T11:30:00Z",
    movedToStageAt: "2024-12-01T10:45:00Z", // 2 days ago - normal
    description: "Яхтенная прогулка на Новый год"
  },
  {
    id: "deal-004",
    clientName: "Елена Михайлова",
    company: "Luxury Travel",
    value: 2800000,
    deadline: "2025-01-10T00:00:00Z", 
    source: "Partner",
    pipeline: "B2B",
    stage: "negotiation",
    risk: "high",
    owner: "Maria Smirnova",
    createdAt: "2024-11-20T08:00:00Z",
    movedToStageAt: "2024-11-22T12:15:00Z", // 12 days ago - normal
    description: "Годовой контракт на VIP обслуживание"
  },
  {
    id: "deal-005",
    clientName: "Сергей Иванов",
    company: "Personal",
    value: 180000,
    deadline: "2024-12-30T00:00:00Z",
    source: "Telegram",
    pipeline: "B2C", 
    stage: "new",
    risk: "medium",
    owner: "Anna Kuznetsova",
    createdAt: "2024-12-02T15:00:00Z",
    movedToStageAt: "2024-12-02T15:00:00Z", // just created - normal
    description: "Катер на день рождения"
  },
  {
    id: "deal-006",
    clientName: "Корпорация АСТ",
    company: "AST Corporation",
    value: 4500000,
    deadline: "2025-02-01T00:00:00Z",
    source: "Cold Call",
    pipeline: "B2B",
    stage: "discovery",
    risk: "high",
    owner: "Dmitri Volkov",
    createdAt: "2024-10-15T14:30:00Z",
    movedToStageAt: "2024-10-20T09:00:00Z", // 45+ days ago - VERY STUCK
    description: "Корпоративные мероприятия на весь год"
  }
];

const b2cPipeline = [
  { id: 'new', name: 'Новый', color: '#6B7280' },
  { id: 'qualified', name: 'Квалифицированный', color: '#3B82F6' },
  { id: 'offer', name: 'Предложение', color: '#F59E0B' },
  { id: 'prepaid', name: 'Предоплата', color: '#8B5CF6' },
  { id: 'booked', name: 'Забронировано', color: '#10B981' },
  { id: 'completed', name: 'Выполнено', color: '#059669' },
  { id: 'lost', name: 'Проиграно', color: '#EF4444' }
];

const b2bPipeline = [
  { id: 'new', name: 'Новый', color: '#6B7280' },
  { id: 'discovery', name: 'Выявление потребностей', color: '#3B82F6' },
  { id: 'proposal', name: 'Коммерческое предложение', color: '#F59E0B' },
  { id: 'negotiation', name: 'Переговоры', color: '#8B5CF6' },
  { id: 'po-prepaid', name: 'Договор/Предоплата', color: '#10B981' },
  { id: 'fulfilled', name: 'Исполнено', color: '#059669' },
  { id: 'lost', name: 'Проиграно', color: '#EF4444' }
];

// Mock data for Communications
const mockConversations = [
  {
    id: '1',
    channel: { type: 'whatsapp', icon: '📱', color: '#25D366' },
    client: {
      id: 'c1',
      name: 'Александр Петров',
      avatar: '',
      tier: 'VIP',
      totalBookings: 15,
      lastBooking: '2024-01-10',
      phone: '+7 (900) 123-45-67',
      email: 'alexandr.petrov@email.com'
    },
    status: 'agent' as const,
    assignedAgent: 'Анна Смирнова',
    slaTimer: { remaining: 1800, status: 'normal' as const },
    sentiment: 'positive' as const,
    lastMessage: {
      text: 'Отличный сервис! Хочу забронировать вертолетную экскурсию на следующие выходные',
      timestamp: '2024-01-15T14:30:00Z',
      sender: 'client' as const
    },
    unreadCount: 2,
    priority: 'high' as const,
    tags: ['VIP', 'Helicopter', 'Weekend']
  },
  {
    id: '2',
    channel: { type: 'telegram', icon: '✈️', color: '#0088CC' },
    client: {
      id: 'c2',
      name: 'Мария Козлова',
      avatar: '',
      tier: 'Premium',
      totalBookings: 8,
      lastBooking: '2023-12-22',
      phone: '+7 (905) 876-54-32',
      email: 'maria.kozlova@email.com'
    },
    status: 'bot' as const,
    slaTimer: { remaining: 600, status: 'warning' as const },
    sentiment: 'neutral' as const,
    lastMessage: {
      text: 'Есть ли скидки для постоянных клиентов?',
      timestamp: '2024-01-15T14:25:00Z',
      sender: 'client' as const
    },
    unreadCount: 1,
    priority: 'medium' as const,
    tags: ['Premium', 'Discount', 'Loyalty']
  },
  {
    id: '3',
    channel: { type: 'website', icon: '🌐', color: '#6B7280' },
    client: {
      id: 'c3',
      name: 'Дмитрий Иванов',
      avatar: '',
      tier: 'Standard',
      totalBookings: 2,
      lastBooking: '2023-08-15',
      phone: '+7 (912) 345-67-89',
      email: 'dmitry.ivanov@email.com'
    },
    status: 'pending' as const,
    slaTimer: { remaining: 120, status: 'critical' as const },
    sentiment: 'negative' as const,
    lastMessage: {
      text: 'Очень недоволен отменой бронирования! Требую возврат средств',
      timestamp: '2024-01-15T14:20:00Z',
      sender: 'client' as const
    },
    unreadCount: 3,
    priority: 'high' as const,
    tags: ['Complaint', 'Refund', 'Cancellation']
  }
];

const mockMessages = [
  {
    id: 'm1',
    conversationId: '1',
    sender: 'client' as const,
    senderName: 'Александр Петров',
    text: 'Добрый день! Интересует вертолетная экскурсия',
    timestamp: '2024-01-15T13:00:00Z',
    type: 'text' as const,
    isRead: true
  },
  {
    id: 'm2',
    conversationId: '1',
    sender: 'agent' as const,
    senderName: 'Анна Смирнова',
    text: 'Здравствуйте! Конечно, с радостью помогу с бронированием. Какую дату вы рассматриваете?',
    timestamp: '2024-01-15T13:05:00Z',
    type: 'text' as const,
    isRead: true
  },
  {
    id: 'm3',
    conversationId: '1',
    sender: 'client' as const,
    senderName: 'Александр Петров',
    text: 'Следующие выходные подойдут. 20-21 января',
    timestamp: '2024-01-15T13:10:00Z',
    type: 'text' as const,
    isRead: true
  },
  {
    id: 'm4',
    conversationId: '1',
    sender: 'agent' as const,
    senderName: 'Анна Смирнова',
    text: 'Отлично! У нас есть свободное время в субботу в 14:00 и в воскресенье в 11:00. Длительность полета 45 минут. Стоимость 45,000 рублей.',
    timestamp: '2024-01-15T13:15:00Z',
    type: 'text' as const,
    isRead: true
  },
  {
    id: 'm5',
    conversationId: '1',
    sender: 'client' as const,
    senderName: 'Александр Петров',
    text: 'Отличный сервис! Хочу забронировать вертолетную экскурсию на следующие выходные',
    timestamp: '2024-01-15T14:30:00Z',
    type: 'text' as const,
    isRead: false
  }
];

const mockAIInsights: Record<string, any> = {
  '1': {
    summary: 'VIP клиент заинтересован в вертолетной экскурсии на выходные. Показывает высокий уровень удовлетворенности сервисом. Готов к бронированию.',
    intents: [
      { intent: 'Booking Request', confidence: 0.95, description: 'Клиент хочет забронировать вертолетную экскурсию' },
      { intent: 'Weekend Preference', confidence: 0.87, description: 'Предпочитает бронирование на выходные' },
      { intent: 'Service Satisfaction', confidence: 0.92, description: 'Выражает удовлетворение качеством сервиса' }
    ],
    nextActions: [
      { action: 'Create Helicopter Booking', priority: 'high', description: 'Создать бронирование вертолета на выходные', eta: '15 минут' },
      { action: 'Send Payment Link', priority: 'high', description: 'Отправить ссылку на оплату', eta: '5 минут' },
      { action: 'Follow-up Message', priority: 'medium', description: 'Отправить подтверждение и детали', eta: '30 минут' }
    ],
    sentiment: {
      score: 0.8,
      trend: 'improving',
      factors: ['Положительные отзывы о сервисе', 'Готовность к повторному бронированию', 'VIP статус клиента']
    }
  }
};

const quickReplies = [
  'Спасибо за обращение! Сейчас подберу лучшие варианты.',
  'Проверю наличие свободных слотов и свяжусь с вами.',
  'Отправлю детальное предложение в течение 15 минут.',
  'Оформлю бронирование. Потребуется предоплата 30%.',
  'К сожалению, на эту дату нет свободных мест. Предложу альтернативы.'
];

// Mock data for booking resources and crew
const mockResources = [
  { id: 'helicopter-r44', name: 'Robinson R44', type: 'helicopter', capacity: 3, pricePerHour: 85000 },
  { id: 'helicopter-as350', name: 'Airbus AS350', type: 'helicopter', capacity: 5, pricePerHour: 120000 },
  { id: 'yacht-azimut', name: 'Azimut 55', type: 'yacht', capacity: 12, pricePerHour: 45000 },
  { id: 'yacht-princess', name: 'Princess 62', type: 'yacht', capacity: 16, pricePerHour: 65000 },
  { id: 'buggy-polaris', name: 'Polaris RZR XP', type: 'buggy', capacity: 2, pricePerHour: 8000 },
  { id: 'buggy-canam', name: 'Can-Am Maverick X3', type: 'buggy', capacity: 4, pricePerHour: 12000 }
];

const mockCrewMembers = [
  { id: 'pilot-1', name: 'Капитан Андрей Волков', role: 'pilot', specialization: 'helicopter', available: true },
  { id: 'pilot-2', name: 'Капитан Сергей Петров', role: 'pilot', specialization: 'helicopter', available: false },
  { id: 'captain-1', name: 'Капитан Дмитрий Козлов', role: 'captain', specialization: 'yacht', available: true },
  { id: 'captain-2', name: 'Капитан Михаил Сидоров', role: 'captain', specialization: 'yacht', available: true },
  { id: 'guide-1', name: 'Гид Елена Смирнова', role: 'guide', specialization: 'buggy', available: true },
  { id: 'guide-2', name: 'Гид Алексей Иванов', role: 'guide', specialization: 'buggy', available: false }
];

const bookingStatuses = [
  { id: 'tentative', name: 'Предварительное', color: '#F59E0B', description: 'Бронь удерживается с таймером' },
  { id: 'confirmed', name: 'Подтверждено', color: '#10B981', description: 'Подтверждено предоплатой' },
  { id: 'expired', name: 'Истекло', color: '#6B7280', description: 'Время удержания истекло' }
];

export function GTSCRMWithOmniInbox({ onBack, onNavigateToCalendar }: GTSCRMWithOmniInboxProps) {
  const [activeTab, setActiveTab] = useState("leads");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [leadSheetOpen, setLeadSheetOpen] = useState(false);
  const [selectedLeadForSheet, setSelectedLeadForSheet] = useState<string | null>(null);
  const [activePipeline, setActivePipeline] = useState<'B2C' | 'B2B'>('B2C');
  const [dealSheetOpen, setDealSheetOpen] = useState(false);
  const [selectedDealForSheet, setSelectedDealForSheet] = useState<string | null>(null);
  const [createBookingOpen, setCreateBookingOpen] = useState(false);
  const [selectedDealForBooking, setSelectedDealForBooking] = useState<string | null>(null);
  
  // Booking form state
  const [bookingForm, setBookingForm] = useState({
    resource: '',
    date: '',
    time: '',
    duration: '2',
    crew: '',
    price: '',
    notes: '',
    status: 'tentative' as 'tentative' | 'confirmed' | 'expired'
  });

  // Helper functions
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString('ru-RU', { 
      day: 'numeric',
      month: 'short'
    });
  };

  const formatSLATimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getSLAStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400 animate-pulse';
      default: return 'text-gray-400';
    }
  };

  const getSLATimer = (lead: any) => {
    if (!lead.lastActivity) return "N/A";
    
    const now = new Date();
    const lastActivity = new Date(lead.lastActivity);
    const timeDiff = Math.floor((now.getTime() - lastActivity.getTime()) / (1000 * 60)); // minutes
    
    if (lead.lastResponseTime) {
      const responseTime = new Date(lead.lastResponseTime);
      const responseTimeDiff = Math.floor((responseTime.getTime() - lastActivity.getTime()) / (1000 * 60));
      return `${responseTimeDiff}м`;
    }
    
    return `${timeDiff}м`;
  };

  const handleLeadRowClick = (leadId: string) => {
    setSelectedLeadForSheet(leadId);
    setLeadSheetOpen(true);
  };

  const handleCreateDeal = (leadId: string) => {
    console.log('Creating deal from lead:', leadId);
    setLeadSheetOpen(false);
    setActiveTab('deals');
    // Here would be actual deal creation logic
  };

  const handleAssignOwner = (leadId: string) => {
    console.log('Assigning owner to lead:', leadId);
    // Here would be owner assignment logic
  };

  const handleSendWhatsApp = (leadId: string) => {
    const lead = mockLeads.find(l => l.id === leadId);
    if (lead) {
      const phoneNumber = lead.phone.replace(/[^\d]/g, '');
      const message = encodeURIComponent("Здравствуйте! Это Grand Tour Sochi. Благодарим за интерес к нашим услугам.");
      window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    }
  };

  const getTimelineIcon = (type: string) => {
    switch (type) {
      case 'call': return <Phone className="w-4 h-4" />;
      case 'email': return <Mail className="w-4 h-4" />;
      case 'whatsapp': return <MessageSquare className="w-4 h-4" />;
      case 'meeting': return <Calendar className="w-4 h-4" />;
      case 'form': return <FileText className="w-4 h-4" />;
      case 'message': return <MessageSquare className="w-4 h-4" />;
      case 'referral': return <UserPlus className="w-4 h-4" />;
      default: return <CircleDot className="w-4 h-4" />;
    }
  };

  // Deal helpers
  const getDealsByStageAndPipeline = (stage: string, pipeline: string) => {
    return mockDeals.filter(deal => deal.stage === stage && deal.pipeline === pipeline);
  };

  const getStageTotal = (stage: string, pipeline: string) => {
    const deals = getDealsByStageAndPipeline(stage, pipeline);
    return deals.reduce((sum, deal) => sum + deal.value, 0);
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-400 bg-green-500/10';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10';
      case 'high': return 'text-red-400 bg-red-500/10';
      default: return 'text-gray-400 bg-gray-500/10';
    }
  };

  const isStuckDeal = (deal: any) => {
    const now = new Date();
    const movedAt = new Date(deal.movedToStageAt);
    const daysDiff = Math.floor((now.getTime() - movedAt.getTime()) / (1000 * 60 * 60 * 24));
    return daysDiff > 14;
  };

  const handleDealClick = (dealId: string) => {
    setSelectedDealForSheet(dealId);
    setDealSheetOpen(true);
  };

  const handleCreateBooking = (dealId: string) => {
    console.log('Creating booking for deal:', dealId);
    setSelectedDealForBooking(dealId);
    setCreateBookingOpen(true);
    // Reset form
    setBookingForm({
      resource: '',
      date: '',
      time: '',
      duration: '2',
      crew: '',
      price: '',
      notes: '',
      status: 'tentative'
    });
  };

  const handleAddTask = (dealId: string) => {
    console.log('Adding task for deal:', dealId);
    // Here would be task creation logic
  };

  const handleAttachDocument = (dealId: string) => {
    console.log('Attaching document to deal:', dealId);
    // Here would be document attachment logic
  };

  // Booking helpers
  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'helicopter': return <Plane className="w-4 h-4" />;
      case 'yacht': return <Anchor className="w-4 h-4" />;
      case 'buggy': return <Car className="w-4 h-4" />;
      default: return <MapPin className="w-4 h-4" />;
    }
  };

  const calculateBookingPrice = (resourceId: string, duration: number) => {
    const resource = mockResources.find(r => r.id === resourceId);
    return resource ? resource.pricePerHour * duration : 0;
  };

  const getHoldExpiryTime = () => {
    const now = new Date();
    const expiry = new Date(now.getTime() + 30 * 60 * 1000); // 30 minutes from now
    return expiry;
  };

  const formatExpiryTime = (date: Date) => {
    return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
  };

  const handleBookingFormChange = (field: string, value: string) => {
    setBookingForm(prev => {
      const updated = { ...prev, [field]: value };
      
      // Auto-calculate price when resource or duration changes
      if (field === 'resource' || field === 'duration') {
        const resourceId = field === 'resource' ? value : updated.resource;
        const duration = field === 'duration' ? parseFloat(value) : parseFloat(updated.duration);
        if (resourceId && duration) {
          updated.price = calculateBookingPrice(resourceId, duration).toString();
        }
      }
      
      return updated;
    });
  };

  const handleSubmitBooking = () => {
    const selectedDeal = mockDeals.find(d => d.id === selectedDealForBooking);
    const selectedResource = mockResources.find(r => r.id === bookingForm.resource);
    const selectedCrew = mockCrewMembers.find(c => c.id === bookingForm.crew);
    
    console.log('Submitting booking:', {
      deal: selectedDeal,
      resource: selectedResource,
      crew: selectedCrew,
      booking: bookingForm,
      expiryTime: bookingForm.status === 'tentative' ? getHoldExpiryTime() : null
    });

    // Here would be actual booking creation logic
    setCreateBookingOpen(false);
    setSelectedDealForBooking(null);
  };

  const getChannelIcon = (type: string) => {
    const icons = {
      whatsapp: '📱',
      telegram: '✈️',
      instagram: '📷',
      website: '🌐',
      phone: '📞',
      email: '📧'
    };
    return icons[type as keyof typeof icons] || '💬';
  };

  const getStatusColor = (status: string) => {
    const colors = {
      hot: "text-red-400 bg-red-500/10",
      warm: "text-yellow-400 bg-yellow-500/10", 
      cold: "text-blue-400 bg-blue-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);
  const conversationMessages = mockMessages.filter(m => m.conversationId === selectedConversation);
  const aiInsight = selectedConversation ? mockAIInsights[selectedConversation] : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  // Render Client Card if selected
  if (selectedClient) {
    return (
      <GTSClientCard 
        clientId={selectedClient}
        onBack={() => setSelectedClient(null)}
        onNavigateToCalendar={onNavigateToCalendar}
      />
    );
  }

  // Render Deal Card if selected
  if (selectedDeal) {
    return (
      <GTSDealCard 
        dealId={selectedDeal}
        onBack={() => setSelectedDeal(null)}
        onNavigateToCalendar={onNavigateToCalendar}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                CRM - Управление взаимоотношениями с клиентами
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Полноценная система управления лидами, сделками и клиентами
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCalendar}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Календарь
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Новый лид
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Воронка продаж</p>
                  <p className="text-2xl font-heading text-white">₽1.35M</p>
                  <p className="text-xs text-green-400">+12.5% к прошлому месяцу</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Активные лиды</p>
                  <p className="text-2xl font-heading text-white">47</p>
                  <p className="text-xs text-blue-400">23 горячих</p>
                </div>
                <User className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Конверсия</p>
                  <p className="text-2xl font-heading text-white">34.2%</p>
                  <p className="text-xs text-green-400">+2.1% к прошлому месяцу</p>
                </div>
                <Target className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Активные чаты</p>
                  <p className="text-2xl font-heading text-white">23</p>
                  <p className="text-xs text-red-400">5 требуют внимания</p>
                </div>
                <MessageSquare className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-[#121214] border-[#232428]">
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Лиды
            </TabsTrigger>
            <TabsTrigger value="deals" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Сделки
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="communications" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <MessageSquare className="w-4 h-4 mr-1" />
              Коммуникации
            </TabsTrigger>
            <TabsTrigger value="quality" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <TrendingUp className="w-4 h-4 mr-1" />
              Quality & Trends
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab - Enhanced Table View */}
          <TabsContent value="leads" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-white">База лидов - Расширенная таблица</CardTitle>
                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                      <Input 
                        placeholder="Поиск по имени, компании или UTM..." 
                        className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                      <Filter className="h-4 w-4 mr-2" />
                      Фильтр
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Table Header Stats */}
                <div className="grid grid-cols-4 gap-4 mb-6 p-4 bg-[#17181A] rounded-lg border border-[#232428]">
                  <div className="text-center">
                    <div className="text-lg font-heading text-white">{mockLeads.length}</div>
                    <div className="text-xs text-[#A6A7AA]">Всего лидов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading text-red-400">{mockLeads.filter(l => l.slaStatus === 'critical').length}</div>
                    <div className="text-xs text-[#A6A7AA]">Нарушения SLA</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading text-yellow-400">{mockLeads.filter(l => l.isDuplicate).length}</div>
                    <div className="text-xs text-[#A6A7AA]">Дубликатов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading text-green-400">{mockLeads.filter(l => l.status === 'hot').length}</div>
                    <div className="text-xs text-[#A6A7AA]">Горячих</div>
                  </div>
                </div>

                {/* Enhanced Leads Table */}
                <div className="rounded-lg border border-[#232428] overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-[#232428] bg-[#17181A]">
                        <TableHead className="text-[#A6A7AA] font-medium">Имя</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">Канал/UTM</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">Статус</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">SLA Таймер</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">Владелец</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">Создан</TableHead>
                        <TableHead className="text-[#A6A7AA] font-medium">Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockLeads.map(lead => (
                        <TableRow 
                          key={lead.id}
                          className={`border-[#232428] hover:bg-[#17181A] cursor-pointer transition-colors ${
                            lead.slaStatus === 'critical' ? 'bg-red-500/5' : 
                            lead.isDuplicate ? 'bg-yellow-500/5' : ''
                          }`}
                          onClick={() => handleLeadRowClick(lead.id)}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback className="bg-[#232428] text-white text-xs">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium text-white flex items-center gap-2">
                                  {lead.name}
                                  {lead.isDuplicate && (
                                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                                  )}
                                </div>
                                <div className="text-xs text-[#A6A7AA]">{lead.company}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-white text-sm">{lead.source}</div>
                              <div className="text-xs text-[#A6A7AA]">
                                {lead.utmSource && `${lead.utmSource}/${lead.utmMedium}`}
                              </div>
                              <div className="text-xs text-[#A6A7AA]">
                                {lead.utmCampaign}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                              {lead.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className={`flex items-center gap-2 ${getSLAStatusColor(lead.slaStatus)}`}>
                              <Clock className="h-4 w-4" />
                              <span className="text-sm">{getSLATimer(lead)}</span>
                              {lead.slaStatus === 'critical' && (
                                <AlertTriangle className="h-4 w-4 text-red-400" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="text-white text-sm">{lead.owner}</div>
                          </TableCell>
                          <TableCell>
                            <div className="text-white text-sm">
                              {new Date(lead.createdAt).toLocaleDateString('ru-RU', {
                                day: '2-digit',
                                month: '2-digit',
                                year: '2-digit'
                              })}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleLeadRowClick(lead.id);
                              }}
                              className="text-[#91040C] hover:bg-[#91040C]/10"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>

            {/* Lead Details Sheet */}
            <Sheet open={leadSheetOpen} onOpenChange={setLeadSheetOpen}>
              <SheetContent className="bg-[#121214] border-[#232428] w-[90vw] max-w-2xl overflow-y-auto">
                {selectedLeadForSheet && mockLeads.find(l => l.id === selectedLeadForSheet) && (
                  <>
                    {(() => {
                      const lead = mockLeads.find(l => l.id === selectedLeadForSheet)!;
                      return (
                        <>
                          <SheetHeader className="border-b border-[#232428] pb-4">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarFallback className="bg-[#232428] text-white text-lg">
                                  {lead.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <SheetTitle className="text-white text-xl flex items-center gap-2">
                                  {lead.name}
                                  {lead.isDuplicate && (
                                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                                  )}
                                </SheetTitle>
                                <SheetDescription className="text-[#A6A7AA]">
                                  {lead.company} • {lead.source}
                                </SheetDescription>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                                    {lead.status.toUpperCase()}
                                  </Badge>
                                  <Badge variant="outline" className="text-xs border-[#232428] text-[#A6A7AA]">
                                    Score: {lead.score}
                                  </Badge>
                                  {lead.slaStatus === 'critical' && (
                                    <Badge variant="destructive" className="text-xs bg-red-500/20 text-red-400">
                                      SLA Нарушен
                                    </Badge>
                                  )}
                                </div>
                              </div>
                            </div>
                          </SheetHeader>

                          <div className="py-6 space-y-6">
                            {/* Duplicate Warning */}
                            {lead.isDuplicate && (
                              <Alert className="border-yellow-500/20 bg-yellow-500/5">
                                <AlertTriangle className="h-4 w-4 text-yellow-400" />
                                <AlertDescription className="text-yellow-200">
                                  Обнаружен дубликат контакта. Номер телефона совпадает с лидом {lead.duplicateOf}.
                                </AlertDescription>
                              </Alert>
                            )}

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h3 className="font-heading text-white mb-4">Контактная информация</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <Mail className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">{lead.email}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Phone className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">{lead.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <User className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">Владелец: {lead.owner}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <DollarSign className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">Потенциал: ₽{lead.value.toLocaleString('ru-RU')}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h3 className="font-heading text-white mb-4">UTM Данные</h3>
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <ExternalLink className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">Источник: {lead.utmSource}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Target className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">Канал: {lead.utmMedium}</span>
                                  </div>
                                  <div className="flex items-center gap-3">
                                    <Activity className="h-4 w-4 text-[#A6A7AA]" />
                                    <span className="text-white">Кампания: {lead.utmCampaign}</span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Timeline */}
                            <div>
                              <h3 className="font-heading text-white mb-4">Таймлайн активности</h3>
                              <div className="space-y-3">
                                {lead.timeline.map((event) => (
                                  <div key={event.id} className="flex items-start gap-3 p-3 bg-[#17181A] rounded-lg border border-[#232428]">
                                    <div className="mt-1 text-[#A6A7AA]">
                                      {getTimelineIcon(event.type)}
                                    </div>
                                    <div className="flex-1">
                                      <div className="text-white text-sm">{event.description}</div>
                                      <div className="text-xs text-[#A6A7AA] mt-1">
                                        {new Date(event.timestamp).toLocaleString('ru-RU')} • {event.agent}
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="border-t border-[#232428] pt-6">
                              <h3 className="font-heading text-white mb-4">Быстрые действия</h3>
                              <div className="grid grid-cols-2 gap-3">
                                <Button 
                                  className="bg-green-500 hover:bg-green-600"
                                  onClick={() => handleCreateDeal(lead.id)}
                                >
                                  <Plus className="h-4 w-4 mr-2" />
                                  Создать сделку
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-[#232428] text-white hover:bg-[#17181A]"
                                  onClick={() => handleAssignOwner(lead.id)}
                                >
                                  <UserCheck className="h-4 w-4 mr-2" />
                                  Назначить владельца
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-[#232428] text-white hover:bg-[#17181A]"
                                  onClick={() => handleSendWhatsApp(lead.id)}
                                >
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  WhatsApp
                                </Button>
                                <Button 
                                  variant="outline" 
                                  className="border-[#232428] text-white hover:bg-[#17181A]"
                                  onClick={onNavigateToCalendar}
                                >
                                  <Calendar className="h-4 w-4 mr-2" />
                                  Встреча
                                </Button>
                              </div>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </>
                )}
              </SheetContent>
            </Sheet>


          </TabsContent>

          {/* Communications Tab - Full Omni-Inbox */}
          <TabsContent value="communications" className="mt-6">
            <div className="flex h-[calc(100vh-300px)]">
              {/* Conversations List */}
              <div className="w-96 border-r border-[#232428] flex flex-col bg-[#121214]">
                {/* Header */}
                <div className="p-4 border-b border-[#232428] bg-[#121214]">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="w-5 h-5 text-[#91040C]" />
                    <div>
                      <h2 className="gts-heading-2 text-white">Omni-Inbox</h2>
                      <p className="text-xs text-[#A6A7AA]">Управление коммуникациями</p>
                    </div>
                  </div>

                  <div className="relative mb-3">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#A6A7AA]" />
                    <Input
                      placeholder="Поиск разговоров..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9 bg-[#17181A] border-[#232428] text-white"
                    />
                  </div>

                  <div className="flex gap-2">
                    <Badge variant="secondary" className="text-xs bg-[#232428] text-[#A6A7AA]">
                      Всего: {mockConversations.length}
                    </Badge>
                    <Badge variant="destructive" className="text-xs bg-red-500/20 text-red-400">
                      Срочных: {mockConversations.filter(c => c.slaTimer.status === 'critical').length}
                    </Badge>
                  </div>
                </div>

                {/* Conversations */}
                <ScrollArea className="flex-1">
                  <div className="p-2 space-y-2">
                    {mockConversations.map((conv) => (
                      <Card 
                        key={conv.id}
                        className={`p-3 cursor-pointer transition-all hover:bg-[#17181A] ${
                          selectedConversation === conv.id ? 'bg-[#91040C]/10 border-[#91040C]' : 'bg-[#17181A] border-[#232428]'
                        }`}
                        onClick={() => setSelectedConversation(conv.id)}
                      >
                        <div className="flex items-start gap-3">
                          <div className="relative">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback className="bg-[#232428] text-white">
                                {conv.client.name[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div 
                              className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                              style={{ backgroundColor: conv.channel.color }}
                            >
                              {getChannelIcon(conv.channel.type)}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium text-sm text-white truncate">{conv.client.name}</h3>
                                <Badge variant="outline" className="text-xs border-[#232428] text-[#A6A7AA]">
                                  {conv.client.tier}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-1">
                                {getSentimentIcon(conv.sentiment)}
                                {conv.unreadCount > 0 && (
                                  <Badge className="bg-[#91040C] text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
                                    {conv.unreadCount}
                                  </Badge>
                                )}
                              </div>
                            </div>

                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                {conv.status === 'agent' && <User className="w-3 h-3 text-green-500" />}
                                {conv.status === 'bot' && <Bot className="w-3 h-3 text-blue-500" />}
                                {conv.status === 'pending' && <Clock className="w-3 h-3 text-yellow-500" />}
                                <span className="text-xs text-[#A6A7AA]">
                                  {conv.status === 'agent' ? conv.assignedAgent : 
                                   conv.status === 'bot' ? 'AI Assistant' : 'Ожидает'}
                                </span>
                              </div>
                              <div className={`text-xs px-2 py-1 rounded ${
                                conv.slaTimer.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                                conv.slaTimer.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-green-500/20 text-green-400'
                              }`}>
                                {formatSLATimer(conv.slaTimer.remaining)}
                              </div>
                            </div>

                            <p className="text-xs text-[#A6A7AA] truncate mb-2">
                              {conv.lastMessage.text}
                            </p>

                            <div className="flex items-center justify-between">
                              <div className="flex gap-1">
                                {conv.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs bg-[#232428] text-[#A6A7AA]">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                              <span className="text-xs text-[#A6A7AA]">
                                {formatTime(conv.lastMessage.timestamp)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Chat Area */}
              {selectedConversation ? (
                <div className="flex-1 flex">
                  {/* Messages */}
                  <div className="flex-1 flex flex-col">
                    {/* Chat Header */}
                    <div className="p-4 border-b border-[#232428] bg-[#121214]">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-[#232428] text-white">
                              {selectedConv?.client.name[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h2 className="font-medium text-white">{selectedConv?.client.name}</h2>
                            <div className="flex items-center gap-2 text-sm text-[#A6A7AA]">
                              <span>{selectedConv?.client.tier} клиент</span>
                              <Separator orientation="vertical" className="h-4 bg-[#232428]" />
                              <span>{selectedConv?.client.totalBookings} бронирований</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Calendar className="w-4 h-4 mr-1" />
                            Создать бронирование
                          </Button>
                          <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <DollarSign className="w-4 h-4 mr-1" />
                            Создать сделку
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <ScrollArea className="flex-1 p-4">
                      <div className="space-y-4">
                        {conversationMessages.map((message) => (
                          <div
                            key={message.id}
                            className={`flex ${
                              message.sender === 'agent' ? 'justify-end' : 'justify-start'
                            }`}
                          >
                            <div
                              className={`max-w-[70%] rounded-lg p-3 ${
                                message.sender === 'agent'
                                  ? 'bg-[#91040C] text-white'
                                  : message.sender === 'bot'
                                  ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                                  : 'bg-[#17181A] text-white'
                              }`}
                            >
                              {message.sender !== 'agent' && (
                                <div className="flex items-center gap-2 mb-1">
                                  {message.sender === 'bot' ? (
                                    <Bot className="w-3 h-3" />
                                  ) : (
                                    <User className="w-3 h-3" />
                                  )}
                                  <span className="text-xs font-medium">{message.senderName}</span>
                                </div>
                              )}
                              <p className="text-sm">{message.text}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs opacity-70">
                                  {formatTime(message.timestamp)}
                                </span>
                                {!message.isRead && message.sender === 'client' && (
                                  <Badge className="bg-[#91040C] text-white text-xs">
                                    Новое
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>

                    {/* Quick Replies */}
                    <div className="p-3 border-t border-[#232428] bg-[#121214]">
                      <div className="flex gap-2 mb-3 overflow-x-auto">
                        {quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            className="whitespace-nowrap text-xs border-[#232428] text-white hover:bg-[#17181A]"
                            onClick={() => setNewMessage(reply)}
                          >
                            {reply.slice(0, 30)}...
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Message Input */}
                    <div className="p-4 border-t border-[#232428] bg-[#121214]">
                      <div className="flex gap-3">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Image className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Mic className="w-4 h-4" />
                          </Button>
                        </div>
                        <div className="flex-1 flex gap-2">
                          <Textarea
                            placeholder="Введите сообщение..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            className="resize-none bg-[#17181A] border-[#232428] text-white"
                            rows={1}
                            onKeyPress={(e) => {
                              if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                              }
                            }}
                          />
                          <Button onClick={handleSendMessage} className="bg-[#91040C] hover:bg-[#91040C]/90">
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Client Profile & AI Insights Sidebar */}
                  {showAIInsights && (
                    <div className="w-80 border-l border-[#232428] bg-[#121214] overflow-hidden">
                      <ScrollArea className="h-full">
                        <div className="p-4 space-y-6">
                          {/* Client Mini Profile */}
                          <Card className="bg-[#17181A] border-[#232428] p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h3 className="font-medium text-white">Профиль клиента</h3>
                              <Button variant="ghost" size="sm">
                                <Eye className="w-4 h-4" />
                              </Button>
                            </div>

                            {selectedConv && (
                              <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                  <Avatar className="w-12 h-12">
                                    <AvatarFallback className="bg-[#232428] text-white">
                                      {selectedConv.client.name[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-medium text-white">{selectedConv.client.name}</h4>
                                    <Badge variant="outline" className="border-[#232428] text-[#A6A7AA]">
                                      {selectedConv.client.tier}
                                    </Badge>
                                  </div>
                                </div>

                                <div className="grid grid-cols-2 gap-3 text-sm">
                                  <div>
                                    <span className="text-[#A6A7AA]">Бронирований:</span>
                                    <div className="font-medium text-white">{selectedConv.client.totalBookings}</div>
                                  </div>
                                  <div>
                                    <span className="text-[#A6A7AA]">Последнее:</span>
                                    <div className="font-medium text-white">{selectedConv.client.lastBooking}</div>
                                  </div>
                                </div>

                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#A6A7AA]" />
                                    <span className="text-white">{selectedConv.client.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Mail className="w-4 h-4 text-[#A6A7AA]" />
                                    <span className="text-xs text-white">{selectedConv.client.email}</span>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button variant="outline" size="sm" className="flex-1 border-[#232428] text-white hover:bg-[#17181A]">
                                    <UserPlus className="w-4 h-4 mr-1" />
                                    CRM
                                  </Button>
                                  <Button variant="outline" size="sm" className="flex-1 border-[#232428] text-white hover:bg-[#17181A]">
                                    <BookOpen className="w-4 h-4 mr-1" />
                                    История
                                  </Button>
                                </div>
                              </div>
                            )}
                          </Card>

                          {/* AI Insights */}
                          {aiInsight && (
                            <Card className="bg-[#17181A] border-[#232428] p-4">
                              <div className="flex items-center gap-2 mb-3">
                                <Brain className="w-5 h-5 text-purple-500" />
                                <h3 className="font-medium text-white">AI Инсайты</h3>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-white">Краткая сводка</h5>
                                  <p className="text-sm text-[#A6A7AA]">{aiInsight.summary}</p>
                                </div>

                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-white">Настроение клиента</h5>
                                  <div className="flex items-center gap-2 mb-2">
                                    <div className="w-16 bg-[#232428] rounded-full h-2">
                                      <div 
                                        className="bg-green-500 h-2 rounded-full" 
                                        style={{ width: `${aiInsight.sentiment.score * 100}%` }}
                                      />
                                    </div>
                                    <span className="text-sm text-white">{Math.round(aiInsight.sentiment.score * 100)}%</span>
                                    <TrendingUp className="w-4 h-4 text-green-500" />
                                  </div>
                                </div>

                                <div>
                                  <h5 className="text-sm font-medium mb-2 text-white">Следующие действия</h5>
                                  <div className="space-y-2">
                                    {aiInsight.nextActions.slice(0, 2).map((action: any, idx: number) => (
                                      <div key={idx} className="bg-[#232428] p-2 rounded">
                                        <div className="flex items-start justify-between mb-1">
                                          <h6 className="text-xs font-medium text-white">{action.action}</h6>
                                          <Badge 
                                            variant={action.priority === 'high' ? 'destructive' : 'secondary'}
                                            className="text-xs"
                                          >
                                            {action.priority}
                                          </Badge>
                                        </div>
                                        <p className="text-xs text-[#A6A7AA]">{action.description}</p>
                                        <Button variant="outline" size="sm" className="w-full mt-2 border-[#232428] text-white hover:bg-[#17181A]">
                                          Выполнить
                                        </Button>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </Card>
                          )}
                        </div>
                      </ScrollArea>
                    </div>
                  )}
                </div>
              ) : (
                // Empty State
                <div className="flex-1 flex items-center justify-center bg-[#17181A]/20">
                  <div className="text-center space-y-4">
                    <MessageSquare className="w-16 h-16 text-[#A6A7AA] mx-auto" />
                    <div>
                      <h3 className="font-medium text-lg text-white">Выберите разговор</h3>
                      <p className="text-[#A6A7AA]">
                        Выберите разговор из списка слева, чтобы начать работу
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Deals Tab */}
          <TabsContent value="deals" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">Pipeline сделок</CardTitle>
                    <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Новая сделка
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Mock deals data */}
                    {[
                      {
                        id: "deal-001",
                        title: "Корпоративный VIP пакет",
                        client: "TechCorp LLC",
                        contact: "Александр Петров",
                        value: 450000,
                        stage: "negotiation",
                        probability: 75,
                        closeDate: "2024-01-25",
                        owner: "Анна Смирнова",
                        aiScore: 92,
                        riskLevel: "low"
                      },
                      {
                        id: "deal-002",
                        title: "Серия вертолетных туров",
                        client: "Premium Events", 
                        contact: "Ольга Козлова",
                        value: 280000,
                        stage: "qualified",
                        probability: 60,
                        closeDate: "2024-02-20",
                        owner: "Dmitri Volkov",
                        aiScore: 78,
                        riskLevel: "medium"
                      },
                      {
                        id: "deal-003",
                        title: "VIP спорткар-тур",
                        client: "Luxury Motors",
                        contact: "Елена Соколова",
                        value: 520000,
                        stage: "proposal",
                        probability: 85,
                        closeDate: "2024-02-10",
                        owner: "Maria Smirnova", 
                        aiScore: 88,
                        riskLevel: "low"
                      }
                    ].map((deal) => (
                      <Card 
                        key={deal.id}
                        className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                        onClick={() => setSelectedDeal(deal.id)}
                      >
                        <CardContent className="p-4">
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <Badge className={`text-xs ${
                                deal.stage === 'negotiation' ? 'bg-orange-500/20 text-orange-400 border-orange-500/30' :
                                deal.stage === 'qualified' ? 'bg-green-500/20 text-green-400 border-green-500/30' :
                                deal.stage === 'proposal' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                                'bg-gray-500/20 text-gray-400 border-gray-500/30'
                              }`}>
                                {deal.stage.toUpperCase()}
                              </Badge>
                              <div className="flex items-center gap-1">
                                <Brain className="w-3 h-3 text-purple-400" />
                                <span className="text-xs text-purple-400">{deal.aiScore}</span>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-heading text-white text-sm mb-1">{deal.title}</h4>
                              <p className="text-xs text-[#A6A7AA]">{deal.client} • {deal.contact}</p>
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="text-white font-heading">₽{(deal.value / 1000).toFixed(0)}K</div>
                              <div className="flex items-center gap-2">
                                <span className="text-xs text-white">{deal.probability}%</span>
                                <div className={`w-2 h-2 rounded-full ${
                                  deal.riskLevel === 'low' ? 'bg-green-400' :
                                  deal.riskLevel === 'medium' ? 'bg-yellow-400' :
                                  'bg-red-400'
                                }`} />
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs text-[#A6A7AA]">
                              <span>Владелец: {deal.owner}</span>
                              <span>{formatDate(deal.closeDate)}</span>
                            </div>
                            
                            {/* AI Intelligence Preview */}
                            <div className="flex items-center gap-2 p-2 bg-[#232428] rounded">
                              <Brain className="w-3 h-3 text-purple-400" />
                              <span className="text-xs text-purple-400">AI Intelligence доступен</span>
                              <ArrowUpRight className="w-3 h-3 text-[#A6A7AA]" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="mt-6">
            <div className="space-y-4">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white">База клиентов</CardTitle>
                    <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                      <Plus className="w-4 h-4 mr-2" />
                      Новый клиент
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockConversations.map((conv) => (
                      <Card 
                        key={conv.id}
                        className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                        onClick={() => setSelectedClient(conv.client.id)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-[#232428] text-white">
                                  {conv.client.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h4 className="font-heading text-white">{conv.client.name}</h4>
                                <p className="text-sm text-[#A6A7AA]">{conv.client.email}</p>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge className="text-xs bg-[#91040C]/20 text-[#91040C] border-[#91040C]/30">
                                    {conv.client.tier}
                                  </Badge>
                                  <span className="text-xs text-[#A6A7AA]">{conv.client.totalBookings} бронирований</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <div className="text-right">
                                <div className="text-sm text-white">Last: {formatTime(conv.lastMessage.timestamp)}</div>
                                <div className="text-xs text-[#A6A7AA]">Sentiment: {conv.sentiment}</div>
                              </div>
                              <ArrowUpRight className="w-5 h-5 text-[#A6A7AA]" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Activity className="h-12 w-12 mx-auto mb-4 text-[#A6A7AA]" />
                  <h3 className="text-lg font-heading text-white mb-2">Аналитика</h3>
                  <p className="text-[#A6A7AA] mb-4">Аналитический модуль находится в разработке</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          {/* Quality & Trends Tab */}
          <TabsContent value="quality" className="mt-6">
            <GTSQualityTrendsDashboard />
          </TabsContent>

        </Tabs>
      </div>

      {/* Enhanced Create Booking Modal */}
      <GTSEnhancedBookingModal
        isOpen={createBookingOpen}
        onClose={() => {
          setCreateBookingOpen(false);
          setSelectedDealForBooking(null);
        }}
        dealId={selectedDealForBooking}
        dealData={mockDeals.find(d => d.id === selectedDealForBooking)}
      />
    </div>
  );
}