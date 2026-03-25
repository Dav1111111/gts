import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Crown, 
  Star, 
  Calendar, 
  Clock, 
  MapPin, 
  Gift, 
  MessageCircle,
  Send,
  X,
  ChevronLeft,
  CreditCard,
  Trophy,
  Zap,
  Check,
  ArrowRight,
  Phone,
  Mail,
  User,
  Settings,
  QrCode,
  Users,
  Coins,
  Repeat,
  FileText,
  Edit3,
  Copy,
  Share2,
  Bot,
  Anchor,
  Plane,
  Car,
  Mountain
} from "lucide-react";

interface Booking {
  id: string;
  vehicleTitle: string;
  vehicleImage: string;
  date: string;
  price: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  location: string;
  duration: string;
  category: "boats" | "helicopters" | "buggies" | "slingshot";
}

interface ClubEvent {
  id: string;
  title: string;
  image: string;
  date: string;
  location: string;
  spotsLeft: number;
  maxSpots: number;
  description: string;
}

interface AIRecommendation {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  category: string;
  icon: any;
}

const mockBookings: Booking[] = [
  {
    id: "1",
    vehicleTitle: "Yamaha 252S Premium",
    vehicleImage: "https://images.unsplash.com/photo-1705829344720-564ac4eaff4b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHNlYSUyMHN1bnNldHxlbnwxfHx8fDE3NTYyMDY4MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2025-09-15",
    price: 28000,
    status: "confirmed",
    location: "Сочи Марина",
    duration: "6 часов",
    category: "boats"
  },
  {
    id: "2",
    vehicleTitle: "Robinson R44 Raven II",
    vehicleImage: "https://images.unsplash.com/photo-1639578656444-5d79da997032?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwbW91bnRhaW4lMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU2MjA2ODI3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2025-09-18",
    price: 55000,
    status: "pending",
    location: "Аэропорт Адлер",
    duration: "90 мин",
    category: "helicopters"
  },
  {
    id: "3",
    vehicleTitle: "Honda Talon 1000R",
    vehicleImage: "https://images.unsplash.com/photo-1709841951941-f5b804e5971f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZyb2FkJTIwYnVnZ3klMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU2MjA2ODMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2025-08-28",
    price: 18000,
    status: "completed",
    location: "Красная Поляна",
    duration: "4 часа",
    category: "buggies"
  },
  {
    id: "4",
    vehicleTitle: "Polaris Slingshot R",
    vehicleImage: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "2025-08-25",
    price: 15000,
    status: "completed",
    location: "Набережная Сочи",
    duration: "3 часа",
    category: "slingshot"
  }
];

const clubEvents: ClubEvent[] = [
  {
    id: "1",
    title: "Закрытый показ Монако GP",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbHViJTIwZXZlbnQlMjBwYXJ0eXxlbnwxfHx8fDE3NTY2NTQ2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "15 сен",
    location: "VIP-зал GTS",
    spotsLeft: 3,
    maxSpots: 25,
    description: "Эксклюзивный просмотр гонки с шампанским"
  },
  {
    id: "2",
    title: "Мастер-класс навигации",
    image: "https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhuYXZpZ2F0aW9uJTIwY29tcGFzcyUyMGx1eHVyeXxlbnwxfHx8fDE3NTY2NTQ3NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "22 сен",
    location: "Учебный центр",
    spotsLeft: 8,
    maxSpots: 15,
    description: "Профессиональная навигация для яхтинга"
  },
  {
    id: "3", 
    title: "Дегустация в MEER",
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjByZXN0YXVyYW50JTIwZGluaW5nfGVufDF8fHx8MTc1NjY1NDc2OHww&ixlib=rb-4.1.0&q=80&w=1080",
    date: "28 сен",
    location: "MEER Restaurant",
    spotsLeft: 5,
    maxSpots: 12,
    description: "Эксклюзивное меню от шеф-повара"
  }
];

const aiRecommendations: AIRecommendation[] = [
  {
    id: "1",
    title: "Морской круиз на закате",
    description: "Идеально для романтического вечера",
    image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdW5zZXQlMjBib2F0JTIwcm9tYW50aWN8ZW58MXx8fHwxNzU2NjU0ODEzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "25,000₽",
    category: "boats",
    icon: Anchor
  },
  {
    id: "2",
    title: "Вертолётная экскурсия",
    description: "Панорамы Кавказских гор",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "45,000₽",
    category: "helicopters",
    icon: Plane
  },
  {
    id: "3",
    title: "Горный маршрут на багги",
    description: "Приключение в Красной Поляне",
    image: "https://images.unsplash.com/photo-1646273470766-38e066a0d146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NoaSUyMG1vdW50YWlucyUyMGx1eHVyeSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "18,000₽",
    category: "buggies",
    icon: Mountain
  }
];

interface GTSMemberDashboardProps {
  onBackToHome: () => void;
}

export function GTSMemberDashboard({ onBackToHome }: GTSMemberDashboardProps) {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [chatOpen, setChatOpen] = useState(false);
  const [referralCopied, setReferralCopied] = useState(false);

  const memberData = {
    name: "Александр Волков",
    tier: "Gold",
    memberSince: "2022",
    memberNumber: "GTS-0547",
    bonusPoints: 2850,
    nextTierPoints: 1150,
    totalBookings: 15,
    currentDiscount: 15,
    joinDate: "Февраль 2022",
    avatar: "https://images.unsplash.com/photo-1628608577164-8533a3dddbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ2VudGxlbWFuJTIwcG9ydHJhaXQlMjBsdXh1cnklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU2MjA1MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
  };

  const getTierGradient = (tier: string) => {
    switch (tier) {
      case "Bronze": return "from-amber-600 via-amber-500 to-amber-400";
      case "Silver": return "from-slate-400 via-slate-300 to-slate-200";
      case "Gold": return "from-yellow-600 via-yellow-500 to-yellow-400";
      case "Platinum": return "from-slate-600 via-slate-500 to-slate-400";
      default: return "from-gray-600 via-gray-500 to-gray-400";
    }
  };

  const getTierPrivileges = (tier: string) => {
    const privileges = {
      Bronze: ["Базовая скидка 5%", "Приоритетная поддержка", "Доступ к новостям клуба"],
      Silver: ["Скидка 10%", "Приоритетное бронирование", "Доступ к мероприятиям", "Партнёрские предложения"],
      Gold: ["Скидка 15%", "Персональный менеджер", "VIP-мероприятия", "Бесплатная отмена", "Премиум-техника"],
      Platinum: ["Скидка 20%", "Консьерж-сервис", "Эксклюзивные события", "Персональные маршруты", "Трансфер включён", "Приоритет №1"]
    };
    return privileges[tier] || [];
  };

  const getNextTierPrivileges = (tier: string) => {
    const nextTier = tier === "Gold" ? "Platinum" : "Gold";
    return getTierPrivileges(nextTier).slice(getTierPrivileges(tier).length);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed": return "bg-[#91040C] text-white";
      case "pending": return "bg-amber-500 text-white";
      case "completed": return "bg-green-600 text-white";
      case "cancelled": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed": return "Подтверждено";
      case "pending": return "Ожидает";
      case "completed": return "Завершено";
      case "cancelled": return "Отменено";
      default: return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "boats": return Anchor;
      case "helicopters": return Plane;
      case "buggies": return Mountain;
      case "slingshot": return Car;
      default: return Car;
    }
  };

  const filterBookingsByTab = (tab: string) => {
    switch (tab) {
      case "upcoming": 
        return mockBookings.filter(b => b.status === "confirmed" || b.status === "pending");
      case "past":
        return mockBookings.filter(b => b.status === "completed");
      case "cancelled":
        return mockBookings.filter(b => b.status === "cancelled");
      default:
        return mockBookings;
    }
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText("https://gts-club.com/join?ref=GTS0547");
    setReferralCopied(true);
    setTimeout(() => setReferralCopied(false), 2000);
  };

  const recentBookings = mockBookings.filter(b => b.status === "completed").slice(0, 3);
  const progress = Math.round((memberData.bonusPoints / (memberData.bonusPoints + memberData.nextTierPoints)) * 100);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-gray-800">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBackToHome}
                className="text-white hover:text-[#91040C] hover:bg-gray-900"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                На главную
              </Button>
              <div className="hidden md:block w-px h-6 bg-gray-700"></div>
              <h1 className="text-xl lg:text-2xl font-light tracking-wider text-white">
                ЛИЧНЫЙ КАБИНЕТ
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-white hover:bg-gray-900">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8 space-y-8">
        
        {/* 1. MEMBERSHIP CARD - Main Visual Element */}
        <Card className="bg-gray-900 border-gray-800 overflow-hidden">
          <div className={`h-2 bg-gradient-to-r ${getTierGradient(memberData.tier)}`}></div>
          <div className="p-8">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full overflow-hidden">
                    <ImageWithFallback
                      src={memberData.avatar}
                      alt={memberData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r ${getTierGradient(memberData.tier)} rounded-full flex items-center justify-center`}>
                    <Crown className="w-4 h-4 text-black/70" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-medium text-white mb-1">{memberData.name}</h2>
                  <div className="flex items-center space-x-4">
                    <p className="text-[#91040C] font-medium text-lg">{memberData.tier} Member</p>
                    <Badge variant="outline" className="border-gray-600 text-gray-300">
                      {memberData.memberNumber}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 mt-1">Член клуба с {memberData.joinDate}</p>
                </div>
              </div>
              <div className="text-right">
                <QrCode className="w-16 h-16 text-gray-600 mb-2 ml-auto" />
                <p className="text-xs text-gray-500">Цифровая карта</p>
              </div>
            </div>

            {/* Progress to Next Tier */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-400">До уровня Platinum</span>
                <span className="text-[#91040C] font-medium">{memberData.nextTierPoints} баллов осталось</span>
              </div>
              <Progress 
                value={progress} 
                className="h-3 bg-gray-800"
              />
              <p className="text-xs text-gray-500 mt-2">
                {progress < 50 ? "2 бронирования до Gold" : "1 бронирование до Platinum"}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-800">
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">{memberData.bonusPoints.toLocaleString()}</div>
                <div className="text-xs text-gray-400">Бонусных баллов</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">{memberData.totalBookings}</div>
                <div className="text-xs text-gray-400">Поездок</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-light text-white mb-1">{memberData.currentDiscount}%</div>
                <div className="text-xs text-gray-400">Текущая скидка</div>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. QUICK ACTIONS */}
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-white flex items-center">
                <Zap className="w-5 h-5 text-[#91040C] mr-2" />
                Быстрые действия
              </h3>
              
              {/* Recent Bookings */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {recentBookings.map(booking => {
                  const IconComponent = getCategoryIcon(booking.category);
                  return (
                    <Card key={booking.id} className="bg-gray-900 border-gray-700 overflow-hidden group hover:border-gray-600 transition-all">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={booking.vehicleImage}
                          alt={booking.vehicleTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                        <div className="absolute bottom-3 left-3 right-3">
                          <h4 className="text-white font-medium text-sm mb-1">{booking.vehicleTitle}</h4>
                          <p className="text-xs text-gray-300 mb-2">{new Date(booking.date).toLocaleDateString('ru-RU')}</p>
                          <Button size="sm" className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                            <Repeat className="w-3 h-3 mr-1" />
                            Повторить
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* 3. MY BOOKINGS */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-xl font-medium text-white mb-6 flex items-center">
                  <CreditCard className="w-5 h-5 text-[#91040C] mr-2" />
                  Мои бронирования
                </h3>
                
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3 mb-6 bg-gray-800">
                    <TabsTrigger value="upcoming" className="data-[state=active]:bg-[#91040C]">
                      Предстоящие ({mockBookings.filter(b => b.status === "confirmed" || b.status === "pending").length})
                    </TabsTrigger>
                    <TabsTrigger value="past" className="data-[state=active]:bg-[#91040C]">
                      Прошлые ({mockBookings.filter(b => b.status === "completed").length})
                    </TabsTrigger>
                    <TabsTrigger value="cancelled" className="data-[state=active]:bg-[#91040C]">
                      Отменённые ({mockBookings.filter(b => b.status === "cancelled").length})
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value={activeTab}>
                    <div className="space-y-4">
                      {filterBookingsByTab(activeTab).map(booking => (
                        <Card key={booking.id} className="bg-gray-800 border-gray-700">
                          <div className="p-4">
                            <div className="flex items-center space-x-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <ImageWithFallback
                                  src={booking.vehicleImage}
                                  alt={booking.vehicleTitle}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between">
                                  <div>
                                    <h4 className="text-white font-medium">{booking.vehicleTitle}</h4>
                                    <div className="flex items-center space-x-4 text-sm text-gray-400 mt-1">
                                      <div className="flex items-center">
                                        <Calendar className="w-4 h-4 mr-1" />
                                        {new Date(booking.date).toLocaleDateString('ru-RU')}
                                      </div>
                                      <div className="flex items-center">
                                        <Clock className="w-4 h-4 mr-1" />
                                        {booking.duration}
                                      </div>
                                      <div className="flex items-center">
                                        <MapPin className="w-4 h-4 mr-1" />
                                        {booking.location}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <Badge className={getStatusColor(booking.status)}>
                                      {getStatusText(booking.status)}
                                    </Badge>
                                    <p className="text-white font-medium mt-1">{booking.price.toLocaleString()}₽</p>
                                  </div>
                                </div>
                                <div className="flex items-center space-x-3 mt-3">
                                  {booking.status === "completed" && (
                                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                      <Repeat className="w-3 h-3 mr-1" />
                                      Повторить
                                    </Button>
                                  )}
                                  {(booking.status === "confirmed" || booking.status === "pending") && (
                                    <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                      <Edit3 className="w-3 h-3 mr-1" />
                                      Изменить
                                    </Button>
                                  )}
                                  <Button variant="outline" size="sm" className="border-gray-600 text-gray-300 hover:bg-gray-700">
                                    <FileText className="w-3 h-3 mr-1" />
                                    Документы
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>

            {/* 4. CLUB EVENTS */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-xl font-medium text-white mb-6 flex items-center">
                  <Users className="w-5 h-5 text-[#91040C] mr-2" />
                  Эксклюзивные мероприятия клуба
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {clubEvents.map(event => (
                    <Card key={event.id} className="bg-gray-800 border-gray-700 overflow-hidden">
                      <div className="aspect-[4/3] overflow-hidden">
                        <ImageWithFallback
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="border-[#91040C] text-[#91040C]">
                            {event.date}
                          </Badge>
                          <span className="text-xs text-gray-400">
                            {event.spotsLeft} из {event.maxSpots} мест
                          </span>
                        </div>
                        <h4 className="text-white font-medium mb-2">{event.title}</h4>
                        <p className="text-sm text-gray-400 mb-2">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-400 mb-4">
                          <MapPin className="w-4 h-4 mr-1" />
                          {event.location}
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                          disabled={event.spotsLeft === 0}
                        >
                          {event.spotsLeft > 0 ? "Забронировать место" : "Мест нет"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            
            {/* AI CONCIERGE */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Bot className="w-5 h-5 text-[#91040C] mr-2" />
                  AI Консьерж
                </h3>
                <p className="text-sm text-gray-400 mb-4">Персональные рекомендации для вас</p>
                
                <div className="space-y-4">
                  {aiRecommendations.map(rec => (
                    <Card key={rec.id} className="bg-gray-800 border-gray-700">
                      <div className="p-4">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-12 h-12 rounded-lg overflow-hidden">
                            <ImageWithFallback
                              src={rec.image}
                              alt={rec.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm">{rec.title}</h4>
                            <p className="text-xs text-gray-400">{rec.description}</p>
                          </div>
                          <div className="text-right">
                            <rec.icon className="w-4 h-4 text-[#91040C] ml-auto mb-1" />
                            <p className="text-xs text-[#91040C] font-medium">{rec.price}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="w-full border-[#91040C] text-[#91040C] hover:bg-[#91040C] hover:text-white">
                          Забронировать
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </Card>

            {/* 5. PRIVILEGES */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Crown className="w-5 h-5 text-[#91040C] mr-2" />
                  Привилегии {memberData.tier}
                </h3>
                
                <div className="space-y-3 mb-6">
                  {getTierPrivileges(memberData.tier).map((privilege, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm text-white">{privilege}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-gray-800">
                  <p className="text-sm text-gray-400 mb-3">Получите доступ к Platinum:</p>
                  <div className="space-y-2">
                    {getNextTierPrivileges(memberData.tier).slice(0, 3).map((privilege, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <Check className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <span className="text-sm text-gray-500">{privilege}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* 6. POINTS WALLET */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Coins className="w-5 h-5 text-[#91040C] mr-2" />
                  Кошелёк баллов
                </h3>
                
                <div className="text-center mb-6">
                  <div className="text-3xl font-light text-white mb-2">
                    {memberData.bonusPoints.toLocaleString()}
                  </div>
                  <p className="text-sm text-gray-400">Доступно к трате</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm text-white">30 мин Slingshot</p>
                      <p className="text-xs text-gray-400">Прогулка по набережной</p>
                    </div>
                    <Badge className="bg-[#91040C] text-white">1,250 б.</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-800 rounded-lg">
                    <div>
                      <p className="text-sm text-white">Ужин в MEER</p>
                      <p className="text-xs text-gray-400">На двоих с вином</p>
                    </div>
                    <Badge className="bg-[#91040C] text-white">2,800 б.</Badge>
                  </div>
                </div>

                <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                  Потратить баллы
                </Button>
              </div>
            </Card>

            {/* 7. REFERRAL PROGRAM */}
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6">
                <h3 className="text-lg font-medium text-white mb-4 flex items-center">
                  <Share2 className="w-5 h-5 text-[#91040C] mr-2" />
                  Пригласить друзей
                </h3>
                
                <div className="text-center mb-6">
                  <QrCode className="w-20 h-20 text-gray-600 mx-auto mb-3" />
                  <p className="text-sm text-[#91040C] mb-2">+500 баллов за каждого друга</p>
                  <p className="text-xs text-gray-400">или +1 уровень статуса</p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <Input 
                      value="https://gts-club.com/join?ref=GTS0547" 
                      readOnly 
                      className="bg-gray-800 border-gray-700 text-white text-xs"
                    />
                    <Button 
                      size="sm" 
                      onClick={copyReferralLink}
                      className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                    >
                      {referralCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </Button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-2">Приглашено друзей: 3</p>
                    <p className="text-xs text-green-500">Получено: 1,500 баллов</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Support Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        <Dialog open={chatOpen} onOpenChange={setChatOpen}>
          <DialogTrigger asChild>
            <Button 
              size="lg"
              className="w-14 h-14 rounded-full bg-[#91040C] hover:bg-[#91040C]/90 text-white shadow-2xl"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm bg-gray-900 border-gray-800 text-white">
            <div className="p-4">
              <h3 className="text-lg font-medium mb-2">Поддержка GTS</h3>
              <p className="text-sm text-gray-400">Персональная поддержка Gold-членов</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}