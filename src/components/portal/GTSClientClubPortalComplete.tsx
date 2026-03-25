import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { Separator } from "../ui/separator";
import { 
  Calendar,
  Gift,
  Star,
  Trophy,
  Crown,
  CreditCard,
  QrCode,
  MapPin,
  Clock,
  User,
  Phone,
  Mail,
  ChevronRight,
  Tag,
  Percent,
  Users,
  Sparkles,
  Heart,
  Plane,
  Anchor,
  Car,
  MessageCircle
} from "lucide-react";
import { GTSSocialTierFeatures } from "./GTSSocialTierFeatures";

interface GTSClientClubPortalCompleteProps {
  onBack?: () => void;
}

// Tier colors
const tierColors = {
  bronze: { bg: "#8C6239", text: "#FFFFFF", light: "#B8804D" },
  silver: { bg: "#C0C0C0", text: "#000000", light: "#D4D4D4" },
  gold: { bg: "#FFD700", text: "#000000", light: "#FFE55C" },
  platinum: { bg: "#E5E4E2", text: "#000000", light: "#F0EFED" }
};

// Mock current user data
const currentUser = {
  id: "member-001",
  name: "Александр Петров",
  email: "a.petrov@techcorp.ru",
  phone: "+7 905 123-45-67",
  tier: "platinum" as keyof typeof tierColors,
  bonusBalance: 15420,
  totalSpent: 2850000,
  joinDate: "2022-03-15",
  lastBooking: "2024-12-01",
  avatar: "АП",
  lifetimeBookings: 47,
  membershipId: "GTS-PLT-001",
  nextTierProgress: 100,
  privileges: ["Priority Support", "Free Upgrades", "Exclusive Events", "Concierge Service"]
};

// Mock bookings data
const mockBookings = [
  {
    id: "booking-001",
    type: "yacht",
    title: "Яхта Azimut 68S",
    date: "2024-12-15",
    time: "10:00",
    duration: "8 часов",
    location: "Марина Сочи",
    status: "confirmed",
    price: 89000,
    bonusesEarned: 712,
    image: "🛥️"
  },
  {
    id: "booking-002", 
    type: "helicopter",
    title: "Вертолетная экскурсия",
    date: "2024-11-28",
    time: "14:30",
    duration: "45 минут",
    location: "Красная Поляна",
    status: "completed",
    price: 45000,
    bonusesEarned: 360,
    image: "🚁"
  },
  {
    id: "booking-003",
    type: "car",
    title: "Ferrari 488 Spider",
    date: "2024-11-20",
    time: "16:00", 
    duration: "3 дня",
    location: "Центр Сочи",
    status: "completed",
    price: 125000,
    bonusesEarned: 1000,
    image: "🏎️"
  }
];

// Mock bonus transactions
const mockBonusTransactions = [
  {
    id: "tx-001",
    type: "earned",
    amount: 712,
    description: "Бронирование яхты - Черное море",
    date: "2024-12-01",
    icon: "🛥️"
  },
  {
    id: "tx-002",
    type: "redeemed",
    amount: -500,
    description: "Скидка на вертолетный тур",
    date: "2024-11-28",
    icon: "🚁"
  },
  {
    id: "tx-003",
    type: "bonus",
    amount: 1000,
    description: "Юбилейный бонус - 2 года членства",
    date: "2024-11-15",
    icon: "🎉"
  }
];

// Mock events
const mockEvents = [
  {
    id: "event-001",
    title: "Эксклюзивная презентация новых яхт",
    date: "2024-12-20",
    time: "19:00",
    location: "Яхт-клуб Сочи",
    tier: "platinum",
    description: "Закрытая презентация новинок сезона 2025 для платиновых участников",
    image: "🛥️",
    spots: "Осталось 5 мест"
  },
  {
    id: "event-002",
    title: "Мастер-класс по яхтингу",
    date: "2024-12-25",
    time: "14:00", 
    location: "Марина",
    tier: "gold",
    description: "Обучение основам управления яхтой от профессиональных капитанов",
    image: "⛵",
    spots: "Регистрация открыта"
  },
  {
    id: "event-003",
    title: "Новогодняя вечеринка ClientClub",
    date: "2024-12-31",
    time: "20:00",
    location: "Отель Роза Хутор",
    tier: "silver",
    description: "Празднование Нового года для участников программы лояльности",
    image: "🎊",
    spots: "Подтвердите участие"
  }
];

// Mock personalized offers
const mockOffers = [
  {
    id: "offer-001",
    title: "Скидка 30% на премиум яхты",
    description: "Специальное предложение для платиновых участников на аренду класса люкс",
    discount: 30,
    validUntil: "2024-12-31",
    category: "yacht",
    tier: "platinum",
    image: "🛥️",
    originalPrice: 120000,
    discountedPrice: 84000
  },
  {
    id: "offer-002",
    title: "Бесплатный апгрейд до бизнес-класса",
    description: "При бронировании вертолетных туров получите улучшение класса обслуживания",
    discount: 0,
    validUntil: "2024-12-25",
    category: "helicopter", 
    tier: "platinum",
    image: "🚁",
    badge: "Бесплатный апгрейд"
  },
  {
    id: "offer-003",
    title: "Удвоенные бонусы на выходных",
    description: "Получайте двойные бонусные баллы за любые бронирования в субботу и воскресенье",
    discount: 0,
    validUntil: "2024-12-22",
    category: "bonus",
    tier: "gold",
    image: "⭐",
    badge: "x2 бонуса"
  }
];

export function GTSClientClubPortalComplete({ onBack }: GTSClientClubPortalCompleteProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [showMembershipCard, setShowMembershipCard] = useState(false);
  const [showSocialFeatures, setShowSocialFeatures] = useState(false);

  const getTierInfo = (tier: keyof typeof tierColors) => {
    return tierColors[tier];
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getTierDisplayName = (tier: keyof typeof tierColors) => {
    const names = {
      bronze: "Бронза",
      silver: "Серебро", 
      gold: "Золото",
      platinum: "Платина"
    };
    return names[tier];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "text-green-400 bg-green-500/10",
      completed: "text-blue-400 bg-blue-500/10",
      cancelled: "text-red-400 bg-red-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-[#232428] text-white text-lg">
                  {currentUser.avatar}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-xl font-heading text-white">
                  Добро пожаловать, {currentUser.name.split(' ')[0]}!
                </h1>
                <div className="flex items-center gap-2">
                  <Badge 
                    className="text-xs"
                    style={{ 
                      backgroundColor: getTierInfo(currentUser.tier).bg, 
                      color: getTierInfo(currentUser.tier).text 
                    }}
                  >
                    {getTierDisplayName(currentUser.tier)} Member
                  </Badge>
                  <span className="text-sm text-[#A6A7AA]">{currentUser.membershipId}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowMembershipCard(true)}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Моя карта
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Бонусный баланс</p>
                  <p className="text-2xl font-heading text-white">{currentUser.bonusBalance.toLocaleString()}</p>
                  <p className="text-xs text-green-400">баллов</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Всего бронирований</p>
                  <p className="text-2xl font-heading text-white">{currentUser.lifetimeBookings}</p>
                  <p className="text-xs text-blue-400">за все время</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Потрачено всего</p>
                  <p className="text-2xl font-heading text-white">₽{(currentUser.totalSpent / 1000000).toFixed(1)}M</p>
                  <p className="text-xs" style={{ color: getTierInfo(currentUser.tier).bg }}>
                    {getTierDisplayName(currentUser.tier)} уровень
                  </p>
                </div>
                <Trophy className="h-8 w-8" style={{ color: getTierInfo(currentUser.tier).bg }} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Последнее бронирование</p>
                  <p className="text-lg font-heading text-white">{currentUser.lastBooking}</p>
                  <p className="text-xs text-green-400">Яхта Azimut</p>
                </div>
                <Sparkles className="h-8 w-8 text-emerald-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 bg-[#121214] border-[#232428]">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Обзор
            </TabsTrigger>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Мои бронирования
            </TabsTrigger>
            <TabsTrigger value="bonuses" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Мои бонусы
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              События
            </TabsTrigger>
            <TabsTrigger value="offers" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Предложения
            </TabsTrigger>
            <TabsTrigger value="social" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <MessageCircle className="h-4 w-4 mr-2" />
              Сообщество
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Membership Status */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Crown className="h-5 w-5" style={{ color: getTierInfo(currentUser.tier).bg }} />
                    Статус членства
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                      style={{ backgroundColor: getTierInfo(currentUser.tier).bg }}
                    >
                      <Crown className="h-10 w-10" style={{ color: getTierInfo(currentUser.tier).text }} />
                    </div>
                    <h3 className="font-heading text-white text-lg">{getTierDisplayName(currentUser.tier)}</h3>
                    <p className="text-sm text-[#A6A7AA]">Участник с {currentUser.joinDate}</p>
                  </div>
                  
                  {currentUser.tier !== "platinum" && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-white">До следующего уровня</span>
                        <span className="text-[#A6A7AA]">{currentUser.nextTierProgress}%</span>
                      </div>
                      <Progress value={currentUser.nextTierProgress} className="h-2" />
                    </div>
                  )}
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Ваши привилегии:</h4>
                    <div className="space-y-1">
                      {currentUser.privileges.map((privilege, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <Star className="h-3 w-3 text-yellow-400" />
                          <span className="text-white">{privilege}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Недавняя активность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {mockBookings.slice(0, 3).map((booking) => (
                    <div key={booking.id} className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                      <div className="text-2xl">{booking.image}</div>
                      <div className="flex-1">
                        <p className="text-sm text-white">{booking.title}</p>
                        <p className="text-xs text-[#A6A7AA]">{booking.date} • {booking.location}</p>
                      </div>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status === "confirmed" ? "Подтверждено" : 
                         booking.status === "completed" ? "Завершено" : "Отменено"}
                      </Badge>
                    </div>
                  ))}
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#232428] text-white hover:bg-[#17181A]"
                    onClick={() => setActiveTab("bookings")}
                  >
                    Показать все бронирования
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Быстрые действия</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90 justify-start">
                    <Calendar className="h-4 w-4 mr-3" />
                    Новое бронирование
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#232428] text-white hover:bg-[#17181A] justify-start"
                    onClick={() => setActiveTab("bonuses")}
                  >
                    <Gift className="h-4 w-4 mr-3" />
                    Использовать бонусы
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#232428] text-white hover:bg-[#17181A] justify-start"
                    onClick={() => setActiveTab("events")}
                  >
                    <Users className="h-4 w-4 mr-3" />
                    События и акции
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="w-full border-[#232428] text-white hover:bg-[#17181A] justify-start"
                  >
                    <Phone className="h-4 w-4 mr-3" />
                    Поддержка 24/7
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Мои бронирования</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  История всех ваших бронирований и предстоящие поездки
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <Card key={booking.id} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-4xl">{booking.image}</div>
                            <div>
                              <h4 className="font-heading text-white text-lg">{booking.title}</h4>
                              <div className="flex items-center gap-4 text-sm text-[#A6A7AA] mt-1">
                                <div className="flex items-center gap-1">
                                  <Calendar className="h-4 w-4" />
                                  {booking.date} в {booking.time}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {booking.duration}
                                </div>
                                <div className="flex items-center gap-1">
                                  <MapPin className="h-4 w-4" />
                                  {booking.location}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-heading text-white">{formatCurrency(booking.price)}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(booking.status)}>
                                {booking.status === "confirmed" ? "Подтверждено" : 
                                 booking.status === "completed" ? "Завершено" : "Отменено"}
                              </Badge>
                            </div>
                            {booking.bonusesEarned > 0 && (
                              <p className="text-xs text-green-400 mt-1">
                                +{booking.bonusesEarned} бонусов
                              </p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Bonuses Tab */}
          <TabsContent value="bonuses" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Bonus Balance Card */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Gift className="h-5 w-5 text-yellow-400" />
                    Бонусный баланс
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div>
                    <p className="text-4xl font-heading text-white">{currentUser.bonusBalance.toLocaleString()}</p>
                    <p className="text-lg text-yellow-400">бонусных баллов</p>
                  </div>
                  
                  <div className="p-3 bg-[#17181A] rounded-lg">
                    <p className="text-sm text-[#A6A7AA]">Эквивалент в рублях:</p>
                    <p className="text-lg font-heading text-green-400">
                      {formatCurrency(currentUser.bonusBalance)}
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-[#A6A7AA]">Накопление бонусов:</p>
                    <p className="text-lg text-white">8% от стоимости</p>
                    <p className="text-xs text-[#A6A7AA]">Платиновый уровень</p>
                  </div>
                  
                  <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-black">
                    Использовать бонусы
                  </Button>
                </CardContent>
              </Card>

              {/* Bonus History */}
              <div className="lg:col-span-2">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader>
                    <CardTitle className="text-white">История бонусов</CardTitle>
                    <CardDescription className="text-[#A6A7AA]">
                      Последние операции с бонусными баллами
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockBonusTransactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#17181A] rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{transaction.icon}</div>
                            <div>
                              <p className="text-sm text-white">{transaction.description}</p>
                              <p className="text-xs text-[#A6A7AA]">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-heading text-lg ${
                              transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount} б.
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <Separator className="bg-[#232428] my-4" />
                    
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-[#17181A] rounded-lg">
                        <p className="text-lg font-heading text-green-400">+2,072</p>
                        <p className="text-xs text-[#A6A7AA]">За месяц</p>
                      </div>
                      <div className="p-3 bg-[#17181A] rounded-lg">
                        <p className="text-lg font-heading text-red-400">-500</p>
                        <p className="text-xs text-[#A6A7AA]">Использовано</p>
                      </div>
                      <div className="p-3 bg-[#17181A] rounded-lg">
                        <p className="text-lg font-heading text-white">15,420</p>
                        <p className="text-xs text-[#A6A7AA]">Баланс</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Events Tab */}
          <TabsContent value="events" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Эксклюзивные события</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Специальные мероприятия для участников программы лояльности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => {
                    const canAttend = currentUser.tier === event.tier || 
                      (currentUser.tier === "platinum") ||
                      (currentUser.tier === "gold" && (event.tier === "silver" || event.tier === "bronze")) ||
                      (currentUser.tier === "silver" && event.tier === "bronze");
                    
                    return (
                      <Card 
                        key={event.id} 
                        className={`${canAttend ? 'bg-[#17181A]' : 'bg-[#13131A]'} border-[#232428] ${
                          canAttend ? 'opacity-100' : 'opacity-60'
                        }`}
                      >
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="text-4xl">{event.image}</div>
                              <div>
                                <h4 className="font-heading text-white text-lg">{event.title}</h4>
                                <p className="text-sm text-[#A6A7AA] mb-2">{event.description}</p>
                                <div className="flex items-center gap-4 text-sm text-[#A6A7AA]">
                                  <div className="flex items-center gap-1">
                                    <Calendar className="h-4 w-4" />
                                    {event.date} в {event.time}
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <MapPin className="h-4 w-4" />
                                    {event.location}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="text-right space-y-2">
                              <Badge 
                                style={{ 
                                  backgroundColor: getTierInfo(event.tier as keyof typeof tierColors).bg, 
                                  color: getTierInfo(event.tier as keyof typeof tierColors).text 
                                }}
                              >
                                {getTierDisplayName(event.tier as keyof typeof tierColors)}+
                              </Badge>
                              <p className="text-xs text-[#A6A7AA]">{event.spots}</p>
                              {canAttend ? (
                                <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90">
                                  Регистрация
                                </Button>
                              ) : (
                                <Button size="sm" variant="outline" disabled className="border-[#232428] text-[#A6A7AA]">
                                  Недоступно
                                </Button>
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Offers Tab */}
          <TabsContent value="offers" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Персональные предложения</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Эксклюзивные предложения и скидки для вашего уровня
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockOffers.map((offer) => {
                    const canUse = currentUser.tier === offer.tier || currentUser.tier === "platinum";
                    
                    return (
                      <Card 
                        key={offer.id} 
                        className={`${canUse ? 'bg-[#17181A]' : 'bg-[#13131A]'} border-[#232428] ${
                          canUse ? 'opacity-100' : 'opacity-60'
                        } relative overflow-hidden`}
                      >
                        {offer.discount > 0 && (
                          <div className="absolute top-4 right-4 bg-[#91040C] text-white px-2 py-1 rounded-full text-xs font-medium">
                            -{offer.discount}%
                          </div>
                        )}
                        
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <div className="text-4xl">{offer.image}</div>
                            <div className="flex-1">
                              <h4 className="font-heading text-white text-lg mb-2">{offer.title}</h4>
                              <p className="text-sm text-[#A6A7AA] mb-3">{offer.description}</p>
                              
                              {offer.originalPrice && offer.discountedPrice && (
                                <div className="flex items-center gap-2 mb-3">
                                  <span className="text-lg font-heading text-white">{formatCurrency(offer.discountedPrice)}</span>
                                  <span className="text-sm text-[#A6A7AA] line-through">{formatCurrency(offer.originalPrice)}</span>
                                </div>
                              )}
                              
                              {offer.badge && (
                                <Badge className="mb-3 bg-yellow-500/10 text-yellow-400">
                                  {offer.badge}
                                </Badge>
                              )}
                              
                              <div className="flex items-center justify-between">
                                <div className="text-xs text-[#A6A7AA]">
                                  Действует до: {offer.validUntil}
                                </div>
                                {canUse ? (
                                  <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90">
                                    Использовать
                                  </Button>
                                ) : (
                                  <Button size="sm" variant="outline" disabled className="border-[#232428] text-[#A6A7AA]">
                                    Недоступно
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Virtual Membership Card Modal */}
      {showMembershipCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowMembershipCard(false)}>
          <div className="bg-[#0B0B0C] border border-[#232428] rounded-lg p-6 max-w-md w-full mx-4" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-heading text-white">Моя членская карта</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowMembershipCard(false)} className="text-[#A6A7AA] hover:text-white">
                ×
              </Button>
            </div>
            
            {/* Virtual Membership Card */}
            <div className="relative mx-auto w-full h-48 rounded-xl overflow-hidden shadow-2xl mb-4">
              {/* Card Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${getTierInfo(currentUser.tier).bg} 0%, ${getTierInfo(currentUser.tier).light} 100%)`
                }}
              />
              
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute top-8 right-8 w-8 h-8 border border-white/20 rounded-full" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-full" />
              </div>
              
              {/* Card Content */}
              <div className="relative h-full p-6 flex flex-col justify-between" style={{ color: getTierInfo(currentUser.tier).text }}>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg">GTS ClientClub</h3>
                    <Crown className="h-6 w-6" />
                  </div>
                  <p className="text-sm opacity-80">{getTierDisplayName(currentUser.tier)} Member</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-80">ID: {currentUser.membershipId}</p>
                  <p className="font-heading text-lg">{currentUser.name}</p>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs opacity-80">Баланс бонусов</p>
                    <p className="font-heading text-lg">{currentUser.bonusBalance.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-black/20 rounded flex items-center justify-center">
                    <QrCode className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <QrCode className="h-4 w-4 mr-2" />
                Показать QR
              </Button>
              <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                Скачать
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}