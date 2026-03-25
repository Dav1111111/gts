import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "../../ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Skeleton } from "../../ui/skeleton";
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
  MapPin,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Star,
  Edit,
  Trash2,
  Eye,
  ChevronDown,
  ChevronRight,
  Settings,
  PlayCircle,
  PauseCircle,
  AlertCircle,
  CheckCircle2,
  XCircle,
  Target,
  Zap,
  Activity,
  Users,
  Building2,
  Briefcase,
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
  ThumbsUp,
  ThumbsDown
} from "lucide-react";
import { NewLeadForm, NewDealForm, CRMAnalytics, AutomationRuleBuilder, CRMErrorState } from "./GTSCRMComponents";

interface GTSCRMModuleCompleteProps {
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

// Mock data
const mockLeads = [
  {
    id: "lead-001",
    name: "Александр Петров",
    company: "TechCorp LLC",
    email: "a.petrov@techcorp.ru",
    phone: "+7 905 123-45-67",
    source: "Website",
    utm: "utm_campaign=premium&utm_source=google",
    status: "hot",
    score: 92,
    owner: "Maria Smirnova",
    createdAt: "2024-12-01",
    lastActivity: "2 часа назад",
    value: 450000,
    notes: "Заинтересован в корпоративном пакете для team building",
    activities: [
      { type: "email", title: "Отправлен коммерческий расчет", date: "2024-12-01 14:30", status: "sent" },
      { type: "call", title: "Звонок - обсуждение требований", date: "2024-12-01 11:00", status: "completed" },
      { type: "meeting", title: "Встреча назначена", date: "2024-12-02 15:00", status: "scheduled" }
    ]
  },
  {
    id: "lead-002",
    name: "Ольга Козлова",
    company: "Premium Events",
    email: "o.kozlova@events.ru",
    phone: "+7 903 987-65-43",
    source: "Referral",
    utm: "utm_source=partner&utm_medium=referral",
    status: "warm",
    score: 78,
    owner: "Dmitri Volkov",
    createdAt: "2024-11-29",
    lastActivity: "1 день назад",
    value: 280000,
    notes: "Планирует серию вертолетных туров для VIP-клиентов"
  }
];

const mockDeals = [
  {
    id: "deal-001",
    title: "Корпоративный яхт-пакет",
    client: "TechCorp LLC",
    contact: "Александр Петров",
    value: 450000,
    stage: "offer",
    probability: 75,
    closeDate: "2024-12-15",
    owner: "Maria Smirnova",
    source: "Website",
    createdAt: "2024-11-15"
  },
  {
    id: "deal-002",
    title: "Серия вертолетных туров",
    client: "Premium Events", 
    contact: "Ольга Козлова",
    value: 280000,
    stage: "qualified",
    probability: 60,
    closeDate: "2024-12-20",
    owner: "Dmitri Volkov",
    source: "Referral",
    createdAt: "2024-11-20"
  },
  {
    id: "deal-003",
    title: "Багги-приключения на выходные",
    client: "Adventure Club",
    contact: "Виктор Кузнецов", 
    value: 125000,
    stage: "new",
    probability: 40,
    closeDate: "2024-12-30",
    owner: "Alex Petrov",
    source: "Social Media",
    createdAt: "2024-11-25"
  },
  {
    id: "deal-004",
    title: "VIP спорткар-тур",
    client: "Luxury Motors",
    contact: "Елена Соколова",
    value: 520000,
    stage: "prepaid",
    probability: 95,
    closeDate: "2024-12-10",
    owner: "Maria Smirnova", 
    source: "Partner",
    createdAt: "2024-10-15"
  }
];

const mockClients = [
  {
    id: "client-001",
    name: "TechCorp LLC",
    contact: "Александр Петров",
    email: "contact@techcorp.ru",
    phone: "+7 905 123-45-67", 
    ltv: 850000,
    totalBookings: 12,
    lastActivity: "2024-12-01",
    status: "active",
    category: "Enterprise",
    segment: "High-Value",
    registrationDate: "2023-06-15",
    loyaltyPoints: 2450
  },
  {
    id: "client-002", 
    name: "Premium Events",
    contact: "Ольга Козлова",
    email: "info@premiumevents.ru", 
    phone: "+7 903 987-65-43",
    ltv: 425000,
    totalBookings: 8,
    lastActivity: "2024-11-29",
    status: "active", 
    category: "Premium",
    segment: "Regular",
    registrationDate: "2023-08-20",
    loyaltyPoints: 1280
  }
];

const mockAutomations = [
  {
    id: "auto-001",
    name: "Приветственная серия",
    description: "Автоматическая последовательность писем для новых лидов",
    trigger: "Новый лид создан",
    action: "Отправить серию из 5 писем с интервалом 2 дня",
    status: "active",
    triggersToday: 12,
    conversions: 5,
    conversionRate: 41.7
  },
  {
    id: "auto-002", 
    name: "Реактивация клиентов",
    description: "Напоминание неактивным клиентам о наших услугах",
    trigger: "Клиент не активен 60 дней",
    action: "Отправить персональное предложение со скидкой",
    status: "active", 
    triggersToday: 3,
    conversions: 2,
    conversionRate: 66.7
  },
  {
    id: "auto-003",
    name: "Следующий шаг после встречи", 
    description: "Автоматическое планирование следующих шагов после встреч",
    trigger: "Встреча завершена",
    action: "Создать задачу и отправить summary клиенту",
    status: "paused",
    triggersToday: 0,
    conversions: 0,
    conversionRate: 0
  }
];

// Communications mock data
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

export function GTSCRMModuleComplete({ onBack, onNavigateToCalendar }: GTSCRMModuleCompleteProps) {
  const [activeTab, setActiveTab] = useState("leads");
  const [selectedLead, setSelectedLead] = useState<string | null>(null);
  const [selectedDeal, setSelectedDeal] = useState<string | null>(null);
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [leadsFilter, setLeadsFilter] = useState({ source: "all", status: "all", date: "all" });
  const [clientsFilter, setClientsFilter] = useState({ category: "all", segment: "all", status: "all" });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Modal states
  const [showNewLeadForm, setShowNewLeadForm] = useState(false);
  const [showNewDealForm, setShowNewDealForm] = useState(false);
  const [showAutomationBuilder, setShowAutomationBuilder] = useState(false);
  
  // Communications states
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState("");
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [communicationsFilter, setCommunicationsFilter] = useState({ channel: "all", status: "all", sentiment: "all" });
  
  // Form handlers
  const handleNewLead = (data: any) => {
    console.log("New lead data:", data);
    // Here you would typically call an API to create the lead
  };
  
  const handleNewDeal = (data: any) => {
    console.log("New deal data:", data);
    // Here you would typically call an API to create the deal
  };
  
  const handleNewAutomation = (data: any) => {
    console.log("New automation data:", data);
    // Here you would typically call an API to create the automation
  };

  // Deal stages for Kanban
  const dealStages = [
    { id: "new", name: "Новые", color: "bg-gray-500" },
    { id: "qualified", name: "Квалифицированы", color: "bg-blue-500" },
    { id: "offer", name: "Предложение", color: "bg-yellow-500" },
    { id: "prepaid", name: "Предоплата", color: "bg-orange-500" },
    { id: "completed", name: "Завершено", color: "bg-green-500" }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      hot: "text-red-400 bg-red-500/10",
      warm: "text-yellow-400 bg-yellow-500/10", 
      cold: "text-blue-400 bg-blue-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      Enterprise: "text-purple-400 bg-purple-500/10",
      Premium: "text-yellow-400 bg-yellow-500/10",
      Standard: "text-blue-400 bg-blue-500/10"
    };
    return colors[category as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSource = leadsFilter.source === "all" || lead.source.toLowerCase() === leadsFilter.source;
    const matchesStatus = leadsFilter.status === "all" || lead.status === leadsFilter.status;
    return matchesSearch && matchesSource && matchesStatus;
  });

  const filteredClients = mockClients.filter(client => {
    const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         client.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = clientsFilter.category === "all" || client.category === clientsFilter.category;
    const matchesSegment = clientsFilter.segment === "all" || client.segment === clientsFilter.segment;
    const matchesStatus = clientsFilter.status === "all" || client.status === clientsFilter.status;
    return matchesSearch && matchesCategory && matchesSegment && matchesStatus;
  });

  // Communications helper functions
  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
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

  const filteredConversations = mockConversations.filter(conv => 
    conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedConv = mockConversations.find(c => c.id === selectedConversation);
  const conversationMessages = mockMessages.filter(m => m.conversationId === selectedConversation);
  const aiInsight = selectedConversation ? mockAIInsights[selectedConversation] : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;
    console.log('Sending message:', newMessage);
    setNewMessage('');
  };

  const renderLoadingState = () => (
    <div className="space-y-4">
      {[1, 2, 3].map(i => (
        <Card key={i} className="bg-[#17181A] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <Skeleton className="h-12 w-12 rounded-full bg-[#232428]" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px] bg-[#232428]" />
                <Skeleton className="h-4 w-[200px] bg-[#232428]" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  const renderEmptyState = (title: string, description: string) => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardContent className="p-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-[#A6A7AA]" />
        <h3 className="text-lg font-heading text-white mb-2">{title}</h3>
        <p className="text-[#A6A7AA] mb-4">{description}</p>
        <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
          <Plus className="h-4 w-4 mr-2" />
          Создать новую запись
        </Button>
      </CardContent>
    </Card>
  );

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
            <Button onClick={() => setShowNewLeadForm(true)} className="bg-[#91040C] hover:bg-[#91040C]/90">
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
                  <p className="text-sm text-[#A6A7AA]">Средний чек</p>
                  <p className="text-2xl font-heading text-white">₽285K</p>
                  <p className="text-xs text-green-400">+8.3% к прошлому месяцу</p>
                </div>
                <DollarSign className="h-8 w-8 text-emerald-400" />
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
            <TabsTrigger value="automations" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Автоматизация
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Leads Tab */}
          <TabsContent value="leads" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-white">База лидов</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                          <Input 
                            placeholder="Поиск по имени или компании..." 
                            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Select value={leadsFilter.source} onValueChange={(value) => setLeadsFilter({...leadsFilter, source: value})}>
                            <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                              <SelectValue placeholder="Источник" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#17181A] border-[#232428]">
                              <SelectItem value="all">Все источники</SelectItem>
                              <SelectItem value="website">Website</SelectItem>
                              <SelectItem value="referral">Referral</SelectItem>
                              <SelectItem value="social media">Social Media</SelectItem>
                            </SelectContent>
                          </Select>
                          <Select value={leadsFilter.status} onValueChange={(value) => setLeadsFilter({...leadsFilter, status: value})}>
                            <SelectTrigger className="w-[120px] bg-[#17181A] border-[#232428] text-white">
                              <SelectValue placeholder="Статус" />
                            </SelectTrigger>
                            <SelectContent className="bg-[#17181A] border-[#232428]">
                              <SelectItem value="all">Все</SelectItem>
                              <SelectItem value="hot">Горячие</SelectItem>
                              <SelectItem value="warm">Теплые</SelectItem>
                              <SelectItem value="cold">Холодные</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {isLoading ? (
                      renderLoadingState()
                    ) : filteredLeads.length === 0 ? (
                      renderEmptyState("Лидов не найдено", "Попробуйте изменить фильтры или создать новый лид")
                    ) : (
                      <div className="space-y-3">
                        {filteredLeads.map(lead => (
                          <Card 
                            key={lead.id}
                            className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                            onClick={() => setSelectedLead(lead.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-[#232428] text-white">
                                      {lead.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-heading text-white">{lead.name}</h4>
                                    <p className="text-sm text-[#A6A7AA]">{lead.company}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                                        {lead.status.toUpperCase()}
                                      </Badge>
                                      <span className="text-xs text-[#A6A7AA]">{lead.source}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="text-sm text-white">Score: {lead.score}</span>
                                    <Progress value={lead.score} className="w-16" />
                                  </div>
                                  <p className="text-xs text-[#A6A7AA]">Владелец: {lead.owner}</p>
                                  <p className="text-xs text-[#A6A7AA]">{lead.createdAt}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Lead Detail Drawer */}
              {selectedLead && (
                <div className="lg:w-80">
                  <Card className="bg-[#121214] border-[#232428]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Детали лида</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedLead(null)}
                          className="text-[#A6A7AA] hover:text-white"
                        >
                          ×
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {mockLeads.find(l => l.id === selectedLead) && (
                        <div className="space-y-6">
                          {(() => {
                            const lead = mockLeads.find(l => l.id === selectedLead)!;
                            return (
                              <>
                                {/* Lead Info */}
                                <div className="text-center">
                                  <Avatar className="h-16 w-16 mx-auto mb-3">
                                    <AvatarFallback className="bg-[#232428] text-white text-lg">
                                      {lead.name.split(' ').map(n => n[0]).join('')}
                                    </AvatarFallback>
                                  </Avatar>
                                  <h3 className="font-heading text-white">{lead.name}</h3>
                                  <p className="text-sm text-[#A6A7AA]">{lead.company}</p>
                                  <Badge className={`mt-2 ${getStatusColor(lead.status)}`}>
                                    {lead.status.toUpperCase()} • {lead.score}%
                                  </Badge>
                                </div>

                                <Separator className="bg-[#232428]" />

                                {/* Contact Info */}
                                <div className="space-y-3">
                                  <h4 className="font-medium text-white">Контакты</h4>
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <Mail className="h-4 w-4 text-[#A6A7AA]" />
                                      <span className="text-sm text-white">{lead.email}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Phone className="h-4 w-4 text-[#A6A7AA]" />
                                      <span className="text-sm text-white">{lead.phone}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <Clock className="h-4 w-4 text-[#A6A7AA]" />
                                      <span className="text-sm text-white">{lead.lastActivity}</span>
                                    </div>
                                  </div>
                                </div>

                                <Separator className="bg-[#232428]" />

                                {/* Quick Actions */}
                                <div className="space-y-3">
                                  <h4 className="font-medium text-white">Быстрые действия</h4>
                                  <div className="grid grid-cols-2 gap-2">
                                    <Button 
                                      size="sm" 
                                      className="bg-blue-500 hover:bg-blue-600"
                                      onClick={onNavigateToCalendar}
                                    >
                                      <Calendar className="h-4 w-4 mr-1" />
                                      Встреча
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                                      <Phone className="h-4 w-4 mr-1" />
                                      Звонок
                                    </Button>
                                    <Button size="sm" className="bg-green-500 hover:bg-green-600">
                                      <Plus className="h-4 w-4 mr-1" />
                                      Сделка
                                    </Button>
                                    <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                                      <Mail className="h-4 w-4 mr-1" />
                                      Email
                                    </Button>
                                  </div>
                                </div>

                                <Separator className="bg-[#232428]" />

                                {/* Communication History */}
                                <div className="space-y-3">
                                  <h4 className="font-medium text-white">История коммуникаций</h4>
                                  <div className="space-y-3">
                                    {lead.activities?.map((activity, index) => (
                                      <div key={index} className="flex items-start gap-3">
                                        <div className={`w-2 h-2 rounded-full mt-2 ${
                                          activity.status === 'completed' ? 'bg-green-400' : 
                                          activity.status === 'scheduled' ? 'bg-blue-400' : 'bg-yellow-400'
                                        }`} />
                                        <div className="flex-1">
                                          <p className="text-sm text-white">{activity.title}</p>
                                          <p className="text-xs text-[#A6A7AA]">{activity.date}</p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                {/* Notes */}
                                {lead.notes && (
                                  <>
                                    <Separator className="bg-[#232428]" />
                                    <div className="space-y-2">
                                      <h4 className="font-medium text-white">Заметки</h4>
                                      <p className="text-sm text-[#A6A7AA]">{lead.notes}</p>
                                    </div>
                                  </>
                                )}
                              </>
                            );
                          })()}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Deals Tab - Kanban Board */}
          <TabsContent value="deals" className="mt-6">
            <Card className="bg-[#121214] border-[#232428] mb-4">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Воронка продаж</CardTitle>
                  <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                    <Plus className="h-4 w-4 mr-2" />
                    Новая сделка
                  </Button>
                </div>
              </CardHeader>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {dealStages.map((stage) => (
                <Card key={stage.id} className="bg-[#121214] border-[#232428]">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-sm text-white capitalize">
                        {stage.name}
                      </CardTitle>
                      <Badge className={`${stage.color} text-white text-xs`}>
                        {mockDeals.filter(deal => deal.stage === stage.id).length}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {mockDeals.length === 0 ? (
                      <div className="text-center py-8">
                        <AlertCircle className="h-8 w-8 mx-auto mb-2 text-[#A6A7AA]" />
                        <p className="text-sm text-[#A6A7AA]">Нет сделок</p>
                      </div>
                    ) : (
                      mockDeals
                        .filter(deal => deal.stage === stage.id)
                        .map(deal => (
                          <Card 
                            key={deal.id} 
                            className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                            onClick={() => setSelectedDeal(deal.id)}
                          >
                            <CardContent className="p-4">
                              <div className="space-y-2">
                                <h4 className="font-heading text-white text-sm">
                                  {deal.title}
                                </h4>
                                <p className="text-xs text-[#A6A7AA]">
                                  {deal.client}
                                </p>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-heading text-green-400">
                                    ₽{(deal.value / 1000).toFixed(0)}K
                                  </span>
                                  <Badge variant="secondary" className="text-xs bg-[#232428] text-white">
                                    {deal.probability}%
                                  </Badge>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#A6A7AA]">
                                  <Calendar className="h-3 w-3" />
                                  {deal.closeDate}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-[#A6A7AA]">
                                  <User className="h-3 w-3" />
                                  {deal.owner}
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Clients Tab */}
          <TabsContent value="clients" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="text-white">База клиентов</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                      <Input 
                        placeholder="Поиск клиентов..." 
                        className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-full sm:w-64"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                    </div>
                    <Select value={clientsFilter.category} onValueChange={(value) => setClientsFilter({...clientsFilter, category: value})}>
                      <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                        <SelectValue placeholder="Категория" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#17181A] border-[#232428]">
                        <SelectItem value="all">Все категории</SelectItem>
                        <SelectItem value="Enterprise">Enterprise</SelectItem>
                        <SelectItem value="Premium">Premium</SelectItem>
                        <SelectItem value="Standard">Standard</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  renderLoadingState()
                ) : filteredClients.length === 0 ? (
                  renderEmptyState("Клиентов не найдено", "Попробуйте изменить фильтры поиска")
                ) : (
                  <div className="space-y-4">
                    {filteredClients.map(client => (
                      <Card 
                        key={client.id}
                        className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                        onClick={() => setSelectedClient(client.id)}
                      >
                        <CardContent className="p-6">
                          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                            <div className="md:col-span-2">
                              <div className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarFallback className="bg-[#232428] text-white">
                                    {client.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h3 className="font-heading text-white">{client.name}</h3>
                                  <p className="text-sm text-[#A6A7AA]">{client.contact}</p>
                                </div>
                              </div>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-heading text-green-400">₽{(client.ltv / 1000).toFixed(0)}K</p>
                              <p className="text-xs text-[#A6A7AA]">LTV</p>
                            </div>
                            <div className="text-center">
                              <p className="text-lg font-heading text-white">{client.totalBookings}</p>
                              <p className="text-xs text-[#A6A7AA]">Бронирований</p>
                            </div>
                            <div className="text-center">
                              <Badge className={getCategoryColor(client.category)}>
                                {client.category}
                              </Badge>
                              <p className="text-xs text-[#A6A7AA] mt-1">{client.lastActivity}</p>
                            </div>
                            <div className="flex gap-2 justify-center">
                              <Button 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateToCalendar();
                                }}
                                className="bg-blue-500 hover:bg-blue-600"
                              >
                                <Calendar className="h-4 w-4 mr-1" />
                                Бронировать
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-[#232428] text-white hover:bg-[#17181A]"
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Client Profile Modal/Sheet */}
            {selectedClient && (
              <Sheet open={!!selectedClient} onOpenChange={() => setSelectedClient(null)}>
                <SheetContent className="bg-[#0B0B0C] border-[#232428] text-white w-full sm:max-w-lg">
                  <SheetHeader>
                    <SheetTitle className="text-white">Профиль клиента</SheetTitle>
                    <SheetDescription className="text-[#A6A7AA]">
                      Полная информация о клиенте и история взаимодействий
                    </SheetDescription>
                  </SheetHeader>
                  {mockClients.find(c => c.id === selectedClient) && (
                    <div className="mt-6 space-y-6">
                      {(() => {
                        const client = mockClients.find(c => c.id === selectedClient)!;
                        return (
                          <Tabs defaultValue="overview" className="w-full">
                            <TabsList className="grid w-full grid-cols-4 bg-[#121214]">
                              <TabsTrigger value="overview" className="data-[state=active]:bg-[#17181A]">Обзор</TabsTrigger>
                              <TabsTrigger value="bookings" className="data-[state=active]:bg-[#17181A]">Бронирования</TabsTrigger>
                              <TabsTrigger value="loyalty" className="data-[state=active]:bg-[#17181A]">Лояльность</TabsTrigger>
                              <TabsTrigger value="documents" className="data-[state=active]:bg-[#17181A]">Документы</TabsTrigger>
                            </TabsList>
                            
                            <TabsContent value="overview" className="space-y-4">
                              <Card className="bg-[#121214] border-[#232428]">
                                <CardContent className="p-4">
                                  <div className="space-y-4">
                                    <div className="text-center">
                                      <Avatar className="h-16 w-16 mx-auto mb-2">
                                        <AvatarFallback className="bg-[#232428] text-white text-lg">
                                          {client.name.split(' ').map(n => n[0]).join('')}
                                        </AvatarFallback>
                                      </Avatar>
                                      <h3 className="font-heading text-white">{client.name}</h3>
                                      <p className="text-sm text-[#A6A7AA]">{client.contact}</p>
                                    </div>
                                    
                                    <Separator className="bg-[#232428]" />
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                      <div className="text-center">
                                        <p className="text-2xl font-heading text-green-400">₽{(client.ltv / 1000).toFixed(0)}K</p>
                                        <p className="text-xs text-[#A6A7AA]">Lifetime Value</p>
                                      </div>
                                      <div className="text-center">
                                        <p className="text-2xl font-heading text-white">{client.totalBookings}</p>
                                        <p className="text-xs text-[#A6A7AA]">Всего бронирований</p>
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-[#A6A7AA]" />
                                        <span className="text-sm text-white">{client.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-[#A6A7AA]" />
                                        <span className="text-sm text-white">{client.phone}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Calendar className="h-4 w-4 text-[#A6A7AA]" />
                                        <span className="text-sm text-white">Регистрация: {client.registrationDate}</span>
                                      </div>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="bookings">
                              <Card className="bg-[#121214] border-[#232428]">
                                <CardContent className="p-4 text-center">
                                  <Building2 className="h-12 w-12 mx-auto mb-4 text-[#A6A7AA]" />
                                  <p className="text-[#A6A7AA]">История бронирований будет здесь</p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="loyalty">
                              <Card className="bg-[#121214] border-[#232428]">
                                <CardContent className="p-4">
                                  <div className="text-center">
                                    <Star className="h-12 w-12 mx-auto mb-4 text-yellow-400" />
                                    <p className="text-2xl font-heading text-yellow-400">{client.loyaltyPoints}</p>
                                    <p className="text-sm text-[#A6A7AA]">Накопленные баллы</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </TabsContent>
                            
                            <TabsContent value="documents">
                              <Card className="bg-[#121214] border-[#232428]">
                                <CardContent className="p-4 text-center">
                                  <FileText className="h-12 w-12 mx-auto mb-4 text-[#A6A7AA]" />
                                  <p className="text-[#A6A7AA]">Документы клиента будут здесь</p>
                                </CardContent>
                              </Card>
                            </TabsContent>
                          </Tabs>
                        );
                      })()}
                    </div>
                  )}
                </SheetContent>
              </Sheet>
            )}
          </TabsContent>

          {/* Automations Tab */}
          <TabsContent value="automations" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-white">Автоматизация маркетинга</CardTitle>
                      <CardDescription className="text-[#A6A7AA]">
                        If/Then правила для автоматической работы с клиентами
                      </CardDescription>
                    </div>
                    <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                      <Plus className="h-4 w-4 mr-2" />
                      Новое правило
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {mockAutomations.length === 0 ? (
                      <div className="col-span-2">
                        {renderEmptyState("Нет активных автоматизаций", "Создайте первое правило для автоматической работы с клиентами")}
                      </div>
                    ) : (
                      mockAutomations.map((automation) => (
                        <Card key={automation.id} className="bg-[#17181A] border-[#232428]">
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <Zap className="h-5 w-5 text-yellow-400" />
                                <h4 className="font-heading text-white">{automation.name}</h4>
                              </div>
                              <div className="flex items-center gap-2">
                                {automation.status === 'active' ? (
                                  <Badge className="bg-green-500/10 text-green-400">
                                    <PlayCircle className="h-3 w-3 mr-1" />
                                    Активно
                                  </Badge>
                                ) : (
                                  <Badge className="bg-yellow-500/10 text-yellow-400">
                                    <PauseCircle className="h-3 w-3 mr-1" />
                                    Пауза
                                  </Badge>
                                )}
                              </div>
                            </div>
                            
                            <p className="text-sm text-[#A6A7AA] mb-4">{automation.description}</p>
                            
                            <div className="space-y-3">
                              <div className="p-3 bg-[#0B0B0C] rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Target className="h-4 w-4 text-blue-400" />
                                  <span className="text-sm font-medium text-white">ЕСЛИ</span>
                                </div>
                                <p className="text-sm text-[#A6A7AA]">{automation.trigger}</p>
                              </div>
                              
                              <div className="p-3 bg-[#0B0B0C] rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <Zap className="h-4 w-4 text-green-400" />
                                  <span className="text-sm font-medium text-white">ТО</span>
                                </div>
                                <p className="text-sm text-[#A6A7AA]">{automation.action}</p>
                              </div>
                            </div>
                            
                            <Separator className="bg-[#232428] my-4" />
                            
                            <div className="grid grid-cols-3 gap-4 text-center">
                              <div>
                                <p className="text-lg font-heading text-white">{automation.triggersToday}</p>
                                <p className="text-xs text-[#A6A7AA]">Сегодня</p>
                              </div>
                              <div>
                                <p className="text-lg font-heading text-green-400">{automation.conversions}</p>
                                <p className="text-xs text-[#A6A7AA]">Конверсий</p>
                              </div>
                              <div>
                                <p className="text-lg font-heading text-blue-400">{automation.conversionRate.toFixed(1)}%</p>
                                <p className="text-xs text-[#A6A7AA]">Конверсия</p>
                              </div>
                            </div>
                            
                            <div className="flex justify-between mt-4">
                              <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#232428]">
                                <Edit className="h-4 w-4 mr-2" />
                                Изменить
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                className={automation.status === 'active' ? 
                                  'border-yellow-500 text-yellow-400 hover:bg-yellow-500/10' : 
                                  'border-green-500 text-green-400 hover:bg-green-500/10'
                                }
                              >
                                {automation.status === 'active' ? (
                                  <>
                                    <PauseCircle className="h-4 w-4 mr-2" />
                                    Пауза
                                  </>
                                ) : (
                                  <>
                                    <PlayCircle className="h-4 w-4 mr-2" />
                                    Запустить
                                  </>
                                )}
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Templates Section */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Шаблоны коммуникаций</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Готовые шаблоны для email, WhatsApp и чат-сообщений
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { type: "email", title: "Приветственное письмо", usage: 45, icon: Mail },
                      { type: "whatsapp", title: "Напоминание о встрече", usage: 23, icon: MessageSquare },
                      { type: "chat", title: "Персональное предложение", usage: 12, icon: MessageSquare }
                    ].map((template, index) => (
                      <Card key={index} className="bg-[#17181A] border-[#232428]">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <template.icon className="h-5 w-5 text-blue-400" />
                            <div>
                              <h4 className="font-medium text-white">{template.title}</h4>
                              <p className="text-xs text-[#A6A7AA] capitalize">{template.type}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-[#A6A7AA]">Использований: {template.usage}</span>
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:bg-blue-500/10">
                              <Edit className="h-4 w-4" />
                            </Button>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Воронка продаж</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { stage: "Лиды", count: 147, conversion: 100, color: "bg-blue-500" },
                      { stage: "Квалифицированы", count: 98, conversion: 66.7, color: "bg-green-500" },
                      { stage: "Предложение", count: 45, conversion: 30.6, color: "bg-yellow-500" },
                      { stage: "Предоплата", count: 23, conversion: 15.6, color: "bg-orange-500" },
                      { stage: "Завершено", count: 12, conversion: 8.2, color: "bg-emerald-500" }
                    ].map((item, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm text-white">{item.stage}</span>
                          <span className="text-sm text-[#A6A7AA]">{item.count} ({item.conversion}%)</span>
                        </div>
                        <Progress value={item.conversion} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Источники лидов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Website", count: 67, percentage: 45.6, color: "bg-blue-500" },
                      { source: "Referrals", count: 34, percentage: 23.1, color: "bg-green-500" },
                      { source: "Social Media", count: 28, percentage: 19.0, color: "bg-purple-500" },
                      { source: "Partners", count: 18, percentage: 12.2, color: "bg-yellow-500" }
                    ].map((item, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className={`w-3 h-3 rounded-full ${item.color}`} />
                          <span className="text-sm text-white">{item.source}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-sm text-white">{item.count}</span>
                          <span className="text-xs text-[#A6A7AA] ml-1">({item.percentage}%)</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}