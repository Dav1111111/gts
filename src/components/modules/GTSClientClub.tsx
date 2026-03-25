import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  CreditCard,
  Calendar,
  Star,
  Gift,
  MessageCircle,
  Trophy,
  MapPin,
  Clock,
  Users,
  Repeat,
  ArrowLeft,
  Coins,
  Crown,
  Zap,
  Heart,
  Camera,
  Share2,
  Phone,
  Mail,
  Bell,
  Anchor,
  Car,
  Plane,
  Target
} from "lucide-react";

interface GTSClientClubProps {
  onBackToHome: () => void;
}

const membershipTiers = {
  bronze: { name: 'Bronze', icon: '🥉', color: 'from-amber-600 to-amber-700', points: 0, benefits: ['Базовые скидки 5%', 'Приоритетная поддержка'] },
  silver: { name: 'Silver', icon: '🥈', color: 'from-gray-500 to-gray-600', points: 1000, benefits: ['Скидки 10%', 'Досрочное бронирование'] },
  gold: { name: 'Gold', icon: '🥇', color: 'from-yellow-500 to-yellow-600', points: 5000, benefits: ['Скидки 15%', 'Персональный менеджер', 'Эксклюзивные мероприятия'] },
  platinum: { name: 'Platinum', icon: '💎', color: 'from-purple-500 to-purple-600', points: 15000, benefits: ['Скидки 25%', 'VIP-обслуживание', 'Индивидуальные маршруты'] }
};

const mockMemberData = {
  membership: 'gold' as keyof typeof membershipTiers,
  points: 7450,
  nextTierPoints: 15000,
  joinDate: '2023-01-15',
  totalBookings: 23,
  favoriteActivity: 'Морские прогулки',
  totalSpent: 580000,
  savedAmount: 87000
};

const bookingHistory = [
  {
    id: '1',
    date: '2024-01-15',
    type: 'Катер',
    resource: 'Yamaha 252S',
    duration: '3 часа',
    guests: 4,
    cost: 45000,
    originalCost: 53000,
    status: 'completed',
    rating: 5,
    favorite: true,
    photos: 12,
    review: 'Потрясающая прогулка! Команда профессиональная, катер в отличном состоянии.',
    icon: Anchor
  },
  {
    id: '2',
    date: '2024-01-08',
    type: 'Багги',
    resource: 'Honda Talon',
    duration: '2 часа',
    guests: 2,
    cost: 25000,
    originalCost: 29500,
    status: 'completed',
    rating: 4,
    favorite: false,
    photos: 8,
    review: 'Отличные эмоции, но хотелось бы больше экстрима.',
    icon: Car
  },
  {
    id: '3',
    date: '2024-01-03',
    type: 'Вертолет',
    resource: 'Robinson R44',
    duration: '1 час',
    guests: 3,
    cost: 85000,
    originalCost: 100000,
    status: 'completed',
    rating: 5,
    favorite: true,
    photos: 25,
    review: 'Незабываемые впечатления! Вид на Сочи с высоты птичьего полета.',
    icon: Plane
  },
  {
    id: '4',
    date: '2023-12-20',
    type: 'Slingshot',
    resource: 'Polaris Slingshot',
    duration: '2 часа',
    guests: 2,
    cost: 18000,
    originalCost: 22000,
    status: 'completed',
    rating: 4,
    favorite: false,
    photos: 15,
    review: 'Адреналин зашкаливает! Обязательно повторим.',
    icon: Target
  }
];

const upcomingEvents = [
  {
    id: '1',
    title: 'VIP Морская Регата',
    date: '2024-02-15',
    time: '14:00',
    location: 'Яхт-клуб Сочи',
    type: 'exclusive',
    attendees: 24,
    maxAttendees: 30,
    description: 'Эксклюзивная регата для Gold и Platinum членов клуба',
    prize: 'Главный приз - недельный круиз по Черному морю'
  },
  {
    id: '2',
    title: 'Мастер-класс по яхтингу',
    date: '2024-02-20',
    time: '10:00',
    location: 'Порт Сочи',
    type: 'educational',
    attendees: 12,
    maxAttendees: 15,
    description: 'Обучение основам управления яхтой от профессиональных капитанов',
    prize: null
  },
  {
    id: '3',
    title: 'Закрытая вечеринка Gold+',
    date: '2024-02-28',
    time: '19:00',
    location: 'Ресторан "Морской бриз"',
    type: 'social',
    attendees: 45,
    maxAttendees: 50,
    description: 'Торжественный ужин для привилегированных членов клуба',
    prize: 'Розыгрыш бесплатной морской прогулки'
  }
];

const bonusOffers = [
  {
    id: '1',
    title: 'Двойные баллы за морские прогулки',
    description: 'Получайте x2 бонусных балла за все морские активности',
    validUntil: '2024-02-29',
    pointsMultiplier: 2,
    category: 'Морские прогулки'
  },
  {
    id: '2',
    title: 'Скидка 20% на вертолетные экскурсии',
    description: 'Специальная скидка для Gold членов на все авиационные услуги',
    validUntil: '2024-03-15',
    discount: 20,
    category: 'Авиация'
  },
  {
    id: '3',
    title: 'Бесплатный фотограф',
    description: 'Профессиональная фотосъемка в подарок при бронировании от 3 часов',
    validUntil: '2024-02-20',
    freeService: 'Фотосъемка',
    category: 'Все активности'
  }
];

export function GTSClientClub({ onBackToHome }: GTSClientClubProps) {
  const [activeTab, setActiveTab] = useState('bookings');
  const currentTier = membershipTiers[mockMemberData.membership];
  const progressToNext = ((mockMemberData.points - currentTier.points) / (mockMemberData.nextTierPoints - currentTier.points)) * 100;

  const handleRepeatBooking = (bookingId: string) => {
    console.log('Repeat booking:', bookingId);
  };

  const handleJoinEvent = (eventId: string) => {
    console.log('Join event:', eventId);
  };

  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={GTSComponents.pageHeader}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className={GTSStyles.buttons.ghost}
            >
              <ArrowLeft className={GTSStyles.icons.button} />
            </Button>
            
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${currentTier.color} flex items-center justify-center`}>
                <span className="text-lg">{currentTier.icon}</span>
              </div>
              <div>
                <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                  GTS Club
                </h1>
                <p className={GTSComponents.pageSubtitle}>
                  {currentTier.name} Member • Александр Петров
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className={`${GTSStyles.text.primary} text-sm font-medium`}>{mockMemberData.points.toLocaleString()} баллов</div>
              <div className={`text-xs ${GTSStyles.text.muted}`}>Член клуба с {new Date(mockMemberData.joinDate).getFullYear()}</div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                className={GTSStyles.buttons.ghost}
              >
                <Bell className={GTSStyles.icons.button} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={GTSStyles.buttons.ghost}
              >
                <MessageCircle className={GTSStyles.icons.button} />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>{mockMemberData.totalBookings}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Всего поездок</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>₽{(mockMemberData.totalSpent / 1000).toFixed(0)}K</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Потрачено</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-green-400 font-semibold">₽{(mockMemberData.savedAmount / 1000).toFixed(0)}K</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Сэкономлено</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>4.9</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Средняя оценка</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`${GTSStyles.cards.surface} grid grid-cols-4 w-full max-w-2xl mx-auto`}>
            <TabsTrigger value="bookings" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Calendar className={GTSStyles.icons.small} />
              Бронирования
            </TabsTrigger>
            <TabsTrigger value="membership" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <CreditCard className={GTSStyles.icons.small} />
              Членство
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Star className={GTSStyles.icons.small} />
              Мероприятия
            </TabsTrigger>
            <TabsTrigger value="bonuses" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Gift className={GTSStyles.icons.small} />
              Бонусы
            </TabsTrigger>
          </TabsList>

          {/* Bookings History - Real Template */}
          <TabsContent value="bookings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                История бронирований ({bookingHistory.length})
              </h2>
              <Button className={GTSStyles.buttons.primary}>
                <Calendar className={GTSStyles.icons.button} />
                Новое бронирование
              </Button>
            </div>

            <div className="space-y-4">
              {bookingHistory.map((booking) => {
                const IconComponent = booking.icon;
                return (
                  <Card key={booking.id} className={`${GTSStyles.cards.content} p-6 ${GTSStyles.cards.hover}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-2xl bg-[#91040C]/20 flex items-center justify-center">
                          <IconComponent className={`${GTSStyles.icons.large} text-[#91040C]`} />
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`${GTSStyles.text.primary} font-medium text-lg`}>{booking.type}</h3>
                            {booking.favorite && <Heart className="w-5 h-5 text-red-400 fill-current" />}
                            <Badge className={`${GTSStyles.badges.success} text-xs`}>
                              Завершено
                            </Badge>
                          </div>
                          
                          <p className={`${GTSStyles.text.muted} mb-3`}>{booking.resource} • {booking.duration}</p>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4 text-white/40" />
                              <span className={GTSStyles.text.muted}>
                                {new Date(booking.date).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-white/40" />
                              <span className={GTSStyles.text.muted}>{booking.guests} гостей</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Camera className="w-4 h-4 text-white/40" />
                              <span className={GTSStyles.text.muted}>{booking.photos} фото</span>
                            </div>
                            <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-4 h-4 ${
                                    i < booking.rating ? 'text-yellow-400 fill-current' : 'text-white/20'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                          
                          <div className={`${GTSStyles.cards.surface} p-3 rounded-xl`}>
                            <p className={`${GTSStyles.text.primary} text-sm italic`}>
                              "{booking.review}"
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <div className="mb-4">
                          <div className={`text-xl ${GTSStyles.text.primary} font-semibold`}>
                            ₽{booking.cost.toLocaleString()}
                          </div>
                          <div className={`text-sm ${GTSStyles.text.muted} line-through`}>
                            ₽{booking.originalCost.toLocaleString()}
                          </div>
                          <div className="text-sm text-green-400">
                            Экономия ₽{(booking.originalCost - booking.cost).toLocaleString()}
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-2">
                          <Button
                            size="sm"
                            onClick={() => handleRepeatBooking(booking.id)}
                            className={GTSStyles.buttons.primary}
                          >
                            <Repeat className={GTSStyles.icons.button} />
                            Повторить
                          </Button>
                          <div className="flex gap-1">
                            <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                              <Camera className={GTSStyles.icons.button} />
                            </Button>
                            <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                              <Share2 className={GTSStyles.icons.button} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={GTSStyles.cards.content}>
                <div className="p-4 text-center">
                  <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
                    {bookingHistory.filter(b => b.favorite).length}
                  </div>
                  <div className={`${GTSStyles.text.muted} text-sm`}>В избранном</div>
                </div>
              </Card>
              
              <Card className={GTSStyles.cards.content}>
                <div className="p-4 text-center">
                  <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
                    {bookingHistory.reduce((sum, b) => sum + b.photos, 0)}
                  </div>
                  <div className={`${GTSStyles.text.muted} text-sm`}>Фото сделано</div>
                </div>
              </Card>
              
              <Card className={GTSStyles.cards.content}>
                <div className="p-4 text-center">
                  <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
                    {(bookingHistory.reduce((sum, b) => sum + b.rating, 0) / bookingHistory.length).toFixed(1)}
                  </div>
                  <div className={`${GTSStyles.text.muted} text-sm`}>Средняя оценка</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Membership Digital Card */}
          <TabsContent value="membership" className="space-y-6">
            <Card className={`bg-gradient-to-br ${currentTier.color} p-8 text-white relative overflow-hidden`}>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">GTS Club</h2>
                    <p className="text-white/80 text-lg">{currentTier.name} Member</p>
                  </div>
                  <div className="text-right">
                    <div className="text-4xl mb-2">{currentTier.icon}</div>
                    <div className="text-xs text-white/60">ID: GTS{mockMemberData.joinDate.replace(/-/g, '')}</div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="text-2xl font-medium mb-1">Александр Петров</h3>
                  <p className="text-white/80">alexander.petrov@email.com</p>
                </div>
                
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <p className="text-white/60 text-sm">Баллы</p>
                    <p className="text-xl font-semibold">{mockMemberData.points.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Поездок</p>
                    <p className="text-xl font-semibold">{mockMemberData.totalBookings}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white/60 text-sm">Член с</p>
                    <p className="text-lg">{new Date(mockMemberData.joinDate).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute top-0 right-0 w-40 h-40 opacity-10">
                <div className="w-full h-full rounded-full border-4 border-white"></div>
              </div>
            </Card>

            {/* Progress to Next Tier */}
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`${GTSStyles.text.primary} font-medium`}>Прогресс до Platinum</h3>
                  <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                    {mockMemberData.nextTierPoints - mockMemberData.points} баллов до повышения
                  </Badge>
                </div>
                
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-white/60 mb-2">
                    <span>{currentTier.name} ({currentTier.points})</span>
                    <span>Platinum ({mockMemberData.nextTierPoints})</span>
                  </div>
                  <div className="w-full bg-[#232428] rounded-full h-4">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                      style={{ width: `${progressToNext}%` }}
                    ></div>
                  </div>
                </div>
                
                <p className={`text-sm ${GTSStyles.text.muted}`}>
                  Вы на {progressToNext.toFixed(0)}% пути к следующему уровню членства
                </p>
              </div>
            </Card>

            {/* Benefits */}
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6">
                <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Ваши привилегии ({currentTier.name})</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentTier.benefits.map((benefit, index) => (
                    <div key={index} className="p-4 rounded-xl border border-green-500/30 bg-green-500/10">
                      <div className="flex items-center gap-3">
                        <Crown className="w-5 h-5 text-green-400" />
                        <span className={`${GTSStyles.text.primary} text-sm`}>{benefit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Exclusive Events */}
          <TabsContent value="events" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                Эксклюзивные мероприятия
              </h2>
              <Badge className="bg-[#91040C]/20 text-[#91040C] border border-[#91040C]/30">
                {upcomingEvents.length} предстоящих
              </Badge>
            </div>

            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className={`${GTSStyles.cards.content} p-6 ${GTSStyles.cards.hover}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <h3 className={`${GTSStyles.text.primary} font-medium text-lg`}>{event.title}</h3>
                        <Badge className={`text-xs ${
                          event.type === 'exclusive' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          event.type === 'educational' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          'bg-green-500/20 text-green-400 border-green-500/30'
                        } border`}>
                          {event.type === 'exclusive' ? 'VIP' : 
                           event.type === 'educational' ? 'Обучение' : 'Социальное'}
                        </Badge>
                      </div>
                      
                      <p className={`${GTSStyles.text.muted} mb-4`}>{event.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-white/40" />
                          <span className={GTSStyles.text.muted}>
                            {new Date(event.date).toLocaleDateString('ru-RU')} в {event.time}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-white/40" />
                          <span className={GTSStyles.text.muted}>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-white/40" />
                          <span className={GTSStyles.text.muted}>
                            {event.attendees}/{event.maxAttendees} участников
                          </span>
                        </div>
                      </div>
                      
                      {event.prize && (
                        <div className={`${GTSStyles.cards.surface} p-3 rounded-xl mt-3`}>
                          <div className="flex items-center gap-2">
                            <Trophy className="w-4 h-4 text-yellow-400" />
                            <span className={`${GTSStyles.text.primary} text-sm`}>{event.prize}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-right ml-6">
                      <Button
                        onClick={() => handleJoinEvent(event.id)}
                        className={event.attendees >= event.maxAttendees ? GTSStyles.buttons.secondary : GTSStyles.buttons.primary}
                        disabled={event.attendees >= event.maxAttendees}
                      >
                        {event.attendees >= event.maxAttendees ? 'Мест нет' : 'Участвовать'}
                      </Button>
                      <div className={`text-xs ${GTSStyles.text.muted} mt-2`}>
                        {event.maxAttendees - event.attendees} мест осталось
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Bonus System */}
          <TabsContent value="bonuses" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className={GTSStyles.cards.content}>
                <div className="p-6 text-center">
                  <Coins className="w-12 h-12 mx-auto mb-3 text-yellow-400" />
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-2`}>Бонусные баллы</h3>
                  <p className={`text-3xl ${GTSStyles.text.primary} font-semibold mb-1`}>
                    {mockMemberData.points.toLocaleString()}
                  </p>
                  <p className={`${GTSStyles.text.muted} text-sm`}>
                    ≈ ₽{(mockMemberData.points * 0.5).toLocaleString()} в скидках
                  </p>
                </div>
              </Card>

              <Card className={GTSStyles.cards.content}>
                <div className="p-6 text-center">
                  <Gift className="w-12 h-12 mx-auto mb-3 text-green-400" />
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-2`}>Доступные бонусы</h3>
                  <p className={`text-3xl ${GTSStyles.text.primary} font-semibold mb-1`}>₽23,500</p>
                  <Button size="sm" className="bg-green-500 hover:bg-green-600 text-white mt-2">
                    Использовать
                  </Button>
                </div>
              </Card>

              <Card className={GTSStyles.cards.content}>
                <div className="p-6 text-center">
                  <Zap className="w-12 h-12 mx-auto mb-3 text-blue-400" />
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-2`}>Множитель</h3>
                  <p className={`text-3xl ${GTSStyles.text.primary} font-semibold mb-1`}>×2</p>
                  <p className={`${GTSStyles.text.muted} text-sm`}>
                    За следующие покупки
                  </p>
                </div>
              </Card>
            </div>

            {/* Special Offers */}
            <div>
              <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Специальные предложения</h3>
              <div className="space-y-4">
                {bonusOffers.map((offer) => (
                  <Card key={offer.id} className={`${GTSStyles.cards.content} p-4 ${GTSStyles.cards.hover}`}>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>{offer.title}</h4>
                        <p className={`${GTSStyles.text.muted} mb-3`}>{offer.description}</p>
                        
                        <div className="flex items-center gap-6 text-sm">
                          <span className={GTSStyles.text.muted}>Категория: {offer.category}</span>
                          <span className={GTSStyles.text.muted}>
                            До: {new Date(offer.validUntil).toLocaleDateString('ru-RU')}
                          </span>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        {offer.pointsMultiplier && (
                          <div className="text-xl text-blue-400 font-semibold mb-2">×{offer.pointsMultiplier}</div>
                        )}
                        {offer.discount && (
                          <div className="text-xl text-green-400 font-semibold mb-2">-{offer.discount}%</div>
                        )}
                        {offer.freeService && (
                          <div className="text-xl text-purple-400 font-semibold mb-2">Бесплатно</div>
                        )}
                        
                        <Button size="sm" className={GTSStyles.buttons.primary}>
                          Активировать
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}