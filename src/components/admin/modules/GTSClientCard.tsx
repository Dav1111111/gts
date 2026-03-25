import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { Progress } from "../../ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  MessageSquare,
  FileText,
  Star,
  Gift,
  Clock,
  MapPin,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Target,
  Users,
  Brain,
  Plus,
  Send,
  History,
  StickyNote,
  UserPlus,
  Shield,
  RefreshCw,
  Crown,
  Award,
  Download,
  ExternalLink,
  Copy,
  Upload,
  Eye,
  Smile,
  Frown,
  Meh
} from "lucide-react";

interface GTSClientCardProps {
  clientId: string;
  userRole?: string;
  onBack: () => void;
  onNavigateToCalendar: () => void;
  onCreateDeal?: () => void;
  onCreateBooking?: () => void;
}

// Club tier definitions
const CLUB_TIERS = {
  Bronze: { color: "#CD7F32", icon: Award, level: 1 },
  Silver: { color: "#C0C0C0", icon: Star, level: 2 },
  Gold: { color: "#FFD700", icon: Crown, level: 3 },
  Platinum: { color: "#E5E4E2", icon: Crown, level: 4 }
} as const;

type ClubTier = keyof typeof CLUB_TIERS;

// Mock client data
const mockClient = {
  id: "client-001",
  name: "Александр Петров",
  company: "TechCorp LLC",
  email: "a.petrov@techcorp.ru",
  phone: "+7 905 123-45-67",
  whatsapp: "+7 905 123-45-67",
  telegram: "@a_petrov",
  tier: "Platinum" as ClubTier,
  totalBookings: 27,
  totalSpent: 2450000,
  lifetimeValue: 3850000,
  lastBooking: "2024-12-01",
  lastBookingDaysAgo: 12,
  registrationDate: "2022-03-15",
  bonusBalance: 12750,
  referralsCount: 12,
  status: "active",
  segment: "VIP",
  location: "Москва",
  preferredContact: "whatsapp",
  satisfaction: 96,
  churnProbability: 8,
  upsellSuggestion: "Эксклюзивный яхт-тур с личным шеф-поваром"
};

// Mock communications data
const mockCommunications = [
  {
    id: "comm-001",
    type: "chat",
    channel: "whatsapp",
    date: "2024-12-10T14:30:00Z",
    participants: ["Александр Петров", "Анна Смирнова"],
    summary: {
      intent: "New Booking Request",
      outcome: "Converted",
      sentiment: "positive",
      aiConfidence: 97
    },
    aiSummary: "VIP клиент заинтересован в аренде яхты на корпоратив в новогодние праздники.",
    keyIntents: ["yacht_booking", "corporate_event", "premium_service"]
  },
  {
    id: "comm-002", 
    type: "call",
    channel: "phone",
    date: "2024-12-08T16:20:00Z",
    duration: "23m",
    participants: ["Александр Петров", "Мария Козлова"],
    summary: {
      intent: "Service Consultation",
      outcome: "Scheduled Follow-up",
      sentiment: "positive",
      aiConfidence: 91
    },
    aiSummary: "Консультация по вертолетным турам. Клиент интересуется безопасностью.",
    keyIntents: ["safety_inquiry", "custom_itinerary", "premium_experience"]
  }
];

// Mock bookings data
const mockBookings = [
  {
    id: "booking-001",
    date: "2024-12-25",
    service: "Yacht Charter Premium",
    status: "confirmed",
    amount: 450000,
    duration: "8h",
    participants: 12,
    deal: "deal-456",
    payment: "paid",
    notes: "Новогодний корпоратив TechCorp"
  },
  {
    id: "booking-002",
    date: "2024-12-01",
    service: "Helicopter VIP Tour",
    status: "completed",
    amount: 85000,
    duration: "2h",
    participants: 4,
    deal: "deal-445",
    payment: "paid",
    notes: "Обзорный полет над Сочи"
  },
  {
    id: "booking-003",
    date: "2024-11-15",
    service: "Buggy Adventure",
    status: "cancelled",
    amount: 25000,
    duration: "3h",
    participants: 6,
    deal: "deal-430",
    payment: "refunded",
    notes: "Отменено из-за погодных условий"
  }
];

// Mock loyalty history
const mockLoyaltyHistory = [
  {
    id: "loyalty-001",
    date: "2024-12-01",
    type: "accrual",
    amount: 4500,
    description: "Начислено за бронирование Helicopter VIP Tour"
  },
  {
    id: "loyalty-002", 
    date: "2024-11-20",
    type: "redemption",
    amount: -2000,
    description: "Скидка на Buggy Adventure"
  }
];

// Mock documents
const mockDocuments = [
  {
    id: "doc-001",
    name: "Договор на яхт-чартер",
    type: "contract",
    date: "2024-12-10",
    status: "signed",
    size: "2.4 MB"
  },
  {
    id: "doc-002",
    name: "Страховой полис",
    type: "insurance",
    date: "2024-12-01",
    status: "active",
    size: "1.1 MB"
  }
];

// Mock notes and tasks
const mockNotes = [
  {
    id: "note-001",
    date: "2024-12-10",
    author: "Анна Смирнова",
    type: "note",
    content: "Клиент особенно ценит персональный подход.",
    priority: "info"
  },
  {
    id: "note-002",
    date: "2024-12-08",
    author: "Мария Козлова", 
    type: "task",
    content: "Подготовить персональное предложение по яхт-чартеру.",
    priority: "high",
    completed: false,
    dueDate: "2024-12-15"
  }
];

export function GTSClientCard({ 
  clientId, 
  userRole = "Executive", 
  onBack, 
  onNavigateToCalendar,
  onCreateDeal,
  onCreateBooking 
}: GTSClientCardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [error, setError] = useState<string | null>(null);
  const [showNoteDialog, setShowNoteDialog] = useState(false);
  const [newNote, setNewNote] = useState("");

  // Permission checks
  const hasAccess = (requiredRole: string) => {
    const roleHierarchy = { "Staff": 1, "Manager": 2, "Executive": 3 };
    const userLevel = roleHierarchy[userRole as keyof typeof roleHierarchy] || 0;
    const requiredLevel = roleHierarchy[requiredRole as keyof typeof roleHierarchy] || 0;
    return userLevel >= requiredLevel;
  };

  // Helper functions
  const formatDate = (dateString: string, includeTime = false) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { 
      style: 'currency', 
      currency: 'RUB',
      minimumFractionDigits: 0 
    }).format(amount);
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-400" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-400" />;
      default: return <Meh className="w-4 h-4 text-yellow-400" />;
    }
  };

  const getChannelIcon = (channel: string) => {
    const icons = {
      whatsapp: <MessageSquare className="w-4 h-4 text-green-400" />,
      telegram: <Send className="w-4 h-4 text-blue-400" />,
      phone: <Phone className="w-4 h-4 text-purple-400" />,
      email: <Mail className="w-4 h-4 text-orange-400" />
    };
    return icons[channel as keyof typeof icons] || <MessageSquare className="w-4 h-4 text-gray-400" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "text-green-400 bg-green-500/10",
      pending: "text-yellow-400 bg-yellow-500/10",
      completed: "text-blue-400 bg-blue-500/10",
      cancelled: "text-red-400 bg-red-500/10",
      paid: "text-green-400 bg-green-500/10",
      active: "text-green-400 bg-green-500/10",
      signed: "text-green-400 bg-green-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getTierIcon = (tier: ClubTier) => {
    const TierIcon = CLUB_TIERS[tier].icon;
    return <TierIcon className="w-4 h-4" style={{ color: CLUB_TIERS[tier].color }} />;
  };

  // Quick actions
  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'create_deal':
        onCreateDeal?.();
        break;
      case 'create_booking':
        onCreateBooking?.();
        break;
    }
  };

  const isNewClient = mockClient.totalBookings === 0;

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к CRM
            </Button>
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-[#232428] text-white text-lg font-medium">
                  {mockClient.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl font-heading text-white">{mockClient.name}</h1>
                  <Badge 
                    className="flex items-center gap-1 px-3 py-1"
                    style={{ 
                      backgroundColor: `${CLUB_TIERS[mockClient.tier].color}20`,
                      color: CLUB_TIERS[mockClient.tier].color,
                      borderColor: `${CLUB_TIERS[mockClient.tier].color}40`
                    }}
                  >
                    {getTierIcon(mockClient.tier)}
                    {mockClient.tier}
                  </Badge>
                </div>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-[#A6A7AA]">{mockClient.company}</span>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#A6A7AA]" />
                    <span className="text-sm text-white">{mockClient.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#A6A7AA]" />
                    <span className="text-sm text-white">{mockClient.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-green-400">WhatsApp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Send className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-blue-400">Telegram</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-6 p-6">
        {/* Sidebar - KPI Cards */}
        <div className="w-80 space-y-4">
          {/* LTV KPI Card */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <h3 className="font-heading text-white">Lifetime Value</h3>
                </div>
                <TrendingUp className="w-4 h-4 text-green-400" />
              </div>
              <div className="text-2xl font-heading text-white mb-1">
                {formatCurrency(mockClient.lifetimeValue)}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-green-400">+12.5%</span>
                <span className="text-xs text-[#A6A7AA]">vs прошлый год</span>
              </div>
            </CardContent>
          </Card>

          {/* Last Booking KPI Card */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <h3 className="font-heading text-white">Последнее бронирование</h3>
                </div>
                <Clock className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-heading text-white mb-1">
                {mockClient.lastBookingDaysAgo} дней
              </div>
              <div className="text-xs text-[#A6A7AA]">
                {formatDate(mockClient.lastBooking)}
              </div>
            </CardContent>
          </Card>

          {/* Churn Probability KPI Card */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-400" />
                  <h3 className="font-heading text-white">Риск оттока</h3>
                </div>
                <TrendingDown className="w-4 h-4 text-yellow-400" />
              </div>
              <div className="text-2xl font-heading text-white mb-1">
                {mockClient.churnProbability}%
              </div>
              <div className="flex items-center gap-2">
                <div className="w-full bg-[#232428] rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ width: `${mockClient.churnProbability}%` }}
                  ></div>
                </div>
              </div>
              <div className="text-xs text-yellow-400 mt-1">Низкий риск</div>
            </CardContent>
          </Card>

          {/* Upsell Suggestion KPI Card */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-purple-400" />
                  <h3 className="font-heading text-white">Рекомендация</h3>
                </div>
                <Brain className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-sm text-white mb-3">
                {mockClient.upsellSuggestion}
              </div>
              <Button 
                size="sm" 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white"
                onClick={() => handleQuickAction('create_deal')}
              >
                Создать предложение
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Star className="w-5 h-5 text-[#91040C]" />
                Быстрые действия
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button 
                className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                onClick={() => handleQuickAction('create_booking')}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Новое бронирование
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#232428] text-white hover:bg-[#17181A]"
                onClick={() => handleQuickAction('create_deal')}
              >
                <DollarSign className="w-4 h-4 mr-2" />
                Создать сделку
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#232428] text-white hover:bg-[#17181A]"
                onClick={onNavigateToCalendar}
              >
                <Clock className="w-4 h-4 mr-2" />
                Открыть календарь
              </Button>
            </CardContent>
          </Card>

          {/* Client Tier Progress */}
          <Card className="bg-[#121214] border-[#232428]">
            <CardHeader className="pb-4">
              <CardTitle className="text-white flex items-center gap-2">
                <Crown className="w-5 h-5" style={{ color: CLUB_TIERS[mockClient.tier].color }} />
                Прогресс уровня
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#A6A7AA]">Текущий уровень</span>
                  <Badge 
                    style={{ 
                      backgroundColor: `${CLUB_TIERS[mockClient.tier].color}20`,
                      color: CLUB_TIERS[mockClient.tier].color 
                    }}
                  >
                    {mockClient.tier}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-[#A6A7AA]">До следующего уровня</span>
                    <span className="text-white">150K₽</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <div className="text-xs text-[#A6A7AA]">
                    Осталось потратить 150,000₽ до повышения
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Error State */}
          {error && (
            <Alert className="mb-6 bg-red-500/10 border-red-500/20">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <AlertDescription className="text-red-400">
                {error}
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="ml-2 border-red-500/20 text-red-400 hover:bg-red-500/10"
                  onClick={() => setError(null)}
                >
                  <RefreshCw className="w-4 h-4 mr-1" />
                  Повторить
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {/* Empty State for New Clients */}
          {isNewClient && (
            <Alert className="mb-6 bg-blue-500/10 border-blue-500/20">
              <UserPlus className="h-4 w-4 text-blue-400" />
              <AlertDescription className="text-blue-400">
                Новый клиент. Начните взаимодействие, создав первое бронирование или связавшись с клиентом.
              </AlertDescription>
            </Alert>
          )}

          {/* Main Tabs */}
          <Card className="bg-[#121214] border-[#232428]">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <div className="border-b border-[#232428] px-6 pt-6">
                <TabsList className="grid w-full grid-cols-6 bg-transparent border-none h-auto gap-1">
                  <TabsTrigger 
                    value="overview" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Обзор
                  </TabsTrigger>
                  <TabsTrigger 
                    value="loyalty" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                  >
                    <Star className="w-4 h-4 mr-2" />
                    Лояльность
                  </TabsTrigger>
                  <TabsTrigger 
                    value="communication" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Коммуникации
                  </TabsTrigger>
                  <TabsTrigger 
                    value="bookings" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Бронирования
                  </TabsTrigger>
                  <TabsTrigger 
                    value="documents" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                    disabled={!hasAccess("Manager")}
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Документы
                  </TabsTrigger>
                  <TabsTrigger 
                    value="notes" 
                    className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none rounded-lg px-4 py-2"
                  >
                    <StickyNote className="w-4 h-4 mr-2" />
                    Заметки
                  </TabsTrigger>
                </TabsList>
              </div>

              {/* Overview Tab */}
              <TabsContent value="overview" className="p-6">
                <div className="space-y-6">
                  {/* Basic Info */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Основная информация
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Компания</p>
                          <p className="text-white">{mockClient.company}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Локация</p>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-[#A6A7AA]" />
                            <span className="text-white">{mockClient.location}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Дата регистрации</p>
                          <p className="text-white">{formatDate(mockClient.registrationDate)}</p>
                        </div>
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Сегмент клиента</p>
                          <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                            {mockClient.segment}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Удовлетворенность</p>
                          <div className="flex items-center gap-2">
                            <Progress value={mockClient.satisfaction} className="flex-1 h-2" />
                            <span className="text-white font-medium">{mockClient.satisfaction}%</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-[#A6A7AA] mb-1">Реферралы</p>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-blue-400" />
                            <span className="text-white">{mockClient.referralsCount} человек</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Bookings */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Недавние бронирования
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockBookings.slice(0, 2).map((booking) => (
                          <Card key={booking.id} className="bg-[#232428] border-[#2A2B2F]">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <h4 className="text-white font-medium">{booking.service}</h4>
                                  <p className="text-sm text-[#A6A7AA]">{formatDate(booking.date)} • {booking.duration}</p>
                                </div>
                                <div className="text-right">
                                  <p className="text-white font-medium">{formatCurrency(booking.amount)}</p>
                                  <Badge className={getStatusColor(booking.status)}>
                                    {booking.status}
                                  </Badge>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                      
                      <Button 
                        variant="outline" 
                        className="w-full mt-4 border-[#232428] text-white hover:bg-[#17181A]"
                        onClick={() => setActiveTab("bookings")}
                      >
                        Посмотреть все бронирования
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Loyalty Tab */}
              <TabsContent value="loyalty" className="p-6">
                <div className="space-y-6">
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <Star className="w-5 h-5" style={{ color: CLUB_TIERS[mockClient.tier].color }} />
                        Статус лояльности
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="mb-4">
                          {getTierIcon(mockClient.tier)}
                          <h3 className="text-2xl font-heading text-white mt-2" style={{ color: CLUB_TIERS[mockClient.tier].color }}>
                            {mockClient.tier}
                          </h3>
                        </div>
                        <p className="text-sm text-[#A6A7AA]">Текущий уровень</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-heading text-white mb-2">{mockClient.bonusBalance.toLocaleString()}</div>
                        <p className="text-sm text-[#A6A7AA]">Бонусных баллов</p>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-2xl font-heading text-white mb-2">{formatCurrency(mockClient.lifetimeValue)}</div>
                        <p className="text-sm text-[#A6A7AA]">Lifetime Value</p>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center gap-2">
                        <History className="w-5 h-5" />
                        История операций
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mockLoyaltyHistory.map((transaction) => (
                          <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#232428] rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                                transaction.type === 'accrual' ? 'bg-green-500/20' : 'bg-red-500/20'
                              }`}>
                                {transaction.type === 'accrual' ? 
                                  <Plus className="w-4 h-4 text-green-400" /> :
                                  <DollarSign className="w-4 h-4 text-red-400" />
                                }
                              </div>
                              <div>
                                <p className="text-white font-medium">{transaction.description}</p>
                                <p className="text-sm text-[#A6A7AA]">{formatDate(transaction.date)}</p>
                              </div>
                            </div>
                            <div className={`text-lg font-heading ${
                              transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount.toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              {/* Communication Tab */}
              <TabsContent value="communication" className="p-6">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center gap-2">
                      <MessageSquare className="w-5 h-5" />
                      История коммуникаций
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockCommunications.map((comm) => (
                        <Card key={comm.id} className="bg-[#232428] border-[#2A2B2F]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {getChannelIcon(comm.channel)}
                                <div>
                                  <Badge className={`text-xs ${
                                    comm.type === 'chat' ? 'bg-blue-500/20 text-blue-400' :
                                    comm.type === 'call' ? 'bg-purple-500/20 text-purple-400' :
                                    'bg-orange-500/20 text-orange-400'
                                  }`}>
                                    {comm.type.toUpperCase()}
                                  </Badge>
                                  {comm.duration && (
                                    <span className="text-xs text-[#A6A7AA] ml-2">{comm.duration}</span>
                                  )}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                {getSentimentIcon(comm.summary.sentiment)}
                                <span className="text-xs text-[#A6A7AA]">{formatDate(comm.date, true)}</span>
                              </div>
                            </div>

                            <Card className="bg-[#17181A] border-[#232428] mb-3">
                              <CardContent className="p-3">
                                <div className="flex items-center gap-2 mb-2">
                                  <Brain className="w-4 h-4 text-purple-400" />
                                  <span className="text-xs font-medium text-purple-400">AI Анализ</span>
                                  <Badge variant="secondary" className="text-xs bg-purple-500/20 text-purple-400">
                                    {comm.summary.aiConfidence}%
                                  </Badge>
                                </div>
                                <p className="text-sm text-white">{comm.aiSummary}</p>
                              </CardContent>
                            </Card>

                            <div className="flex flex-wrap gap-1">
                              {comm.keyIntents.map((intent, idx) => (
                                <Badge key={idx} variant="secondary" className="text-xs bg-[#2A2B2F] text-[#A6A7AA]">
                                  {intent}
                                </Badge>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Bookings Tab */}
              <TabsContent value="bookings" className="p-6">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Все бронирования
                      </CardTitle>
                      <Button 
                        className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                        onClick={() => handleQuickAction('create_booking')}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Новое бронирование
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBookings.map((booking) => (
                        <Card key={booking.id} className="bg-[#232428] border-[#2A2B2F]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-3">
                              <div>
                                <h4 className="text-white font-medium">{booking.service}</h4>
                                <p className="text-sm text-[#A6A7AA]">{formatDate(booking.date)} • {booking.duration} • {booking.participants} чел.</p>
                              </div>
                              <div className="text-right">
                                <p className="text-white font-medium">{formatCurrency(booking.amount)}</p>
                                <Badge className={getStatusColor(booking.status)}>
                                  {booking.status}
                                </Badge>
                              </div>
                            </div>
                            {booking.notes && (
                              <p className="text-sm text-[#A6A7AA] bg-[#17181A] p-2 rounded">{booking.notes}</p>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Documents Tab */}
              <TabsContent value="documents" className="p-6">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        Документы
                      </CardTitle>
                      <Button 
                        variant="outline"
                        className="border-[#232428] text-white hover:bg-[#17181A]"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Загрузить
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockDocuments.map((doc) => (
                        <Card key={doc.id} className="bg-[#232428] border-[#2A2B2F]">
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <FileText className="w-8 h-8 text-blue-400" />
                                <div>
                                  <h4 className="text-white font-medium">{doc.name}</h4>
                                  <p className="text-sm text-[#A6A7AA]">{formatDate(doc.date)} • {doc.size}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge className={getStatusColor(doc.status)}>
                                  {doc.status}
                                </Badge>
                                <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white">
                                  <Download className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white">
                                  <Eye className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Notes & Tasks Tab */}
              <TabsContent value="notes" className="p-6">
                <Card className="bg-[#17181A] border-[#232428]">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <StickyNote className="w-5 h-5" />
                        Заметки и задачи
                      </CardTitle>
                      <Dialog open={showNoteDialog} onOpenChange={setShowNoteDialog}>
                        <DialogTrigger asChild>
                          <Button className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                            <Plus className="w-4 h-4 mr-2" />
                            Добавить
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#121214] border-[#232428] text-white">
                          <DialogHeader>
                            <DialogTitle>Новая заметка</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <Textarea
                              value={newNote}
                              onChange={(e) => setNewNote(e.target.value)}
                              placeholder="Введите заметку..."
                              className="bg-[#0B0B0C] border-[#232428] text-white min-h-[100px]"
                            />
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" onClick={() => setShowNoteDialog(false)}>
                                Отмена
                              </Button>
                              <Button 
                                className="bg-[#91040C] hover:bg-[#91040C]/90"
                                onClick={() => {
                                  // Here would be note saving logic
                                  setNewNote("");
                                  setShowNoteDialog(false);
                                }}
                              >
                                Сохранить
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockNotes.map((note) => (
                        <Card key={note.id} className="bg-[#232428] border-[#2A2B2F]">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                {note.type === 'task' ? (
                                  <CheckCircle className="w-5 h-5 text-blue-400" />
                                ) : (
                                  <StickyNote className="w-5 h-5 text-yellow-400" />
                                )}
                                <Badge className={`text-xs ${
                                  note.type === 'task' ? 'bg-blue-500/20 text-blue-400' : 'bg-yellow-500/20 text-yellow-400'
                                }`}>
                                  {note.type === 'task' ? 'ЗАДАЧА' : 'ЗАМЕТКА'}
                                </Badge>
                                {note.priority === 'high' && (
                                  <Badge className="text-xs bg-red-500/20 text-red-400">
                                    ВЫСОКИЙ ПРИОРИТЕТ
                                  </Badge>
                                )}
                              </div>
                              <span className="text-xs text-[#A6A7AA]">{formatDate(note.date, true)}</span>
                            </div>
                            <p className="text-white mb-2">{note.content}</p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-[#A6A7AA]">Автор: {note.author}</span>
                              {note.dueDate && (
                                <span className="text-xs text-orange-400">До: {formatDate(note.dueDate)}</span>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}