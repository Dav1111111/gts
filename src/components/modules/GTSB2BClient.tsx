import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Building,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Settings,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  ArrowLeft,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MapPin,
  Star,
  Anchor,
  Car,
  Plane,
  Target,
  BookOpen,
  TrendingUp,
  Trophy
} from "lucide-react";

interface GTSB2BClientProps {
  onBackToHome: () => void;
}

const companyInfo = {
  name: 'ООО "Технологии Будущего"',
  inn: '7743013901',
  kpp: '774301001',
  address: 'г. Москва, ул. Тверская, д. 15, офис 200',
  phone: '+7 (495) 123-45-67',
  email: 'info@techfuture.ru',
  contactPerson: 'Александр Петров',
  position: 'Генеральный директор',
  manager: 'Елена Сидорова',
  managerPhone: '+7 (988) 123-45-67',
  contractNumber: 'GTS-B2B-2024-001',
  contractDate: '2024-01-15',
  paymentTerms: '14 дней',
  discount: '15%',
  rating: 4.8,
  totalSpent: 2450000,
  eventsCount: 12
};

const bookingHistory = [
  {
    id: '1',
    title: 'Корпоративная регата "Победа"',
    type: 'Морские прогулки',
    date: '2024-01-15',
    time: '14:00',
    participants: 25,
    budget: 150000,
    actualCost: 127500,
    status: 'completed',
    description: 'Празднование дня рождения компании для сотрудников и партнеров',
    created: '2024-01-05',
    services: ['Морская прогулка', 'Кейтеринг', 'Фотограф', 'Призы'],
    rating: 5,
    photos: 45,
    icon: Anchor,
    feedback: 'Превосходная организация! Команда довольна результатом.'
  },
  {
    id: '2',
    title: 'Деловая встреча с инвесторами',
    type: 'Авиационные услуги',
    date: '2024-01-08',
    time: '10:00',
    participants: 4,
    budget: 200000,
    actualCost: 170000,
    status: 'completed',
    description: 'VIP прогулка для переговоров с китайскими партнерами',
    created: '2023-12-28',
    services: ['Вертолетная экскурсия', 'Переводчик', 'Деловой ужин'],
    rating: 5,
    photos: 20,
    icon: Plane,
    feedback: 'Партнеры были в восторге от уровня сервиса!'
  },
  {
    id: '3',
    title: 'Тимбилдинг отдела продаж',
    type: 'Экстремальные развлечения',
    date: '2023-12-20',
    time: '12:00',
    participants: 12,
    budget: 80000,
    actualCost: 68000,
    status: 'completed',
    description: 'Активный отдых для команды продаж',
    created: '2023-12-10',
    services: ['Багги-тур', 'Обед', 'Командные игры'],
    rating: 4,
    photos: 35,
    icon: Car,
    feedback: 'Отличная программа для сплочения команды.'
  },
  {
    id: '4',
    title: 'Презентация нового продукта',
    type: 'Корпоративные мероприятия',
    date: '2023-11-25',
    time: '18:00',
    participants: 50,
    budget: 220000,
    actualCost: 187000,
    status: 'completed',
    description: 'Презентация новой линейки продуктов для клиентов и прессы',
    created: '2023-11-10',
    services: ['Аренда площадки', 'Техническое оборудование', 'Кейтеринг', 'Фотосъемка'],
    rating: 5,
    photos: 60,
    icon: Target,
    feedback: 'Мероприятие прошло на высшем уровне, много положительных отзывов.'
  }
];

const upcomingBookings = [
  {
    id: '5',
    title: 'Корпоративный квартальный отчет',
    type: 'Деловое мероприятие',
    date: '2024-02-20',
    time: '14:00',
    participants: 30,
    budget: 180000,
    status: 'confirmed',
    description: 'Презентация квартальных результатов для акционеров',
    services: ['Аренда яхты', 'Презентационное оборудование', 'Банкет'],
    icon: Trophy
  },
  {
    id: '6',
    title: 'Встреча с международными партнерами',
    type: 'VIP мероприятие',
    date: '2024-02-28',
    time: '16:00',
    participants: 8,
    budget: 320000,
    status: 'pending',
    description: 'Переговоры с европейскими партнерами',
    services: ['Вертолетный тур', 'Ужин в ресторане', 'Переводчик'],
    icon: Plane
  }
];

const invoicesDocuments = [
  {
    id: 'INV-2024-001',
    type: 'Счет',
    date: '2024-01-28',
    amount: 127500,
    status: 'paid',
    service: 'Корпоративная регата "Победа"',
    dueDate: '2024-02-11',
    paidDate: '2024-02-05',
    downloadUrl: '#'
  },
  {
    id: 'ACT-2024-001',
    type: 'Акт',
    date: '2024-02-05',
    amount: 127500,
    status: 'signed',
    service: 'Корпоративная регата "Победа"',
    dueDate: null,
    paidDate: null,
    downloadUrl: '#'
  },
  {
    id: 'INV-2024-002',
    type: 'Счет',
    date: '2024-01-25',
    amount: 170000,
    status: 'paid',
    service: 'Деловая встреча с инвесторами',
    dueDate: '2024-02-08',
    paidDate: '2024-02-07',
    downloadUrl: '#'
  },
  {
    id: 'INV-2024-003',
    type: 'Счет',
    date: '2024-02-15',
    amount: 180000,
    status: 'pending',
    service: 'Корпоративный квартальный отчет',
    dueDate: '2024-03-01',
    paidDate: null,
    downloadUrl: '#'
  }
];

const eventTemplates = [
  {
    id: '1',
    name: 'Корпоративная регата',
    description: 'Морская прогулка с элементами соревнований',
    duration: '6 часов',
    capacity: '30 человек',
    price: 180000,
    includes: ['Катер', 'Инструкторы', 'Призы', 'Фуршет'],
    category: 'Морские мероприятия'
  },
  {
    id: '2',
    name: 'Бизнес-завтрак в небе',
    description: 'Деловая встреча во время вертолетной экскурсии',
    duration: '2 часа',
    capacity: '4 человека',
    price: 220000,
    includes: ['Вертолет', 'Пилот', 'Завтрак', 'Переводчик'],
    category: 'VIP мероприятия'
  },
  {
    id: '3',
    name: 'Экстрим тимбилдинг',
    description: 'Активный отдых на багги с командными играми',
    duration: '4 часа',
    capacity: '20 человек',
    price: 95000,
    includes: ['Багги', 'Инструкторы', 'Игры', 'Обед'],
    category: 'Командообразование'
  },
  {
    id: '4',
    name: 'Презентационный пакет',
    description: 'Полный комплекс для презентации продуктов',
    duration: '8 часов',
    capacity: '50 человек',
    price: 280000,
    includes: ['Площадка', 'Техника', 'Кейтеринг', 'Фотосъемка'],
    category: 'Корпоративные события'
  }
];

export function GTSB2BClient({ onBackToHome }: GTSB2BClientProps) {
  const [activeTab, setActiveTab] = useState('bookings');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'confirmed': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paid': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'signed': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'overdue': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'На рассмотрении';
      case 'confirmed': return 'Подтверждено';
      case 'completed': return 'Завершено';
      case 'paid': return 'Оплачено';
      case 'signed': return 'Подписано';
      case 'overdue': return 'Просрочено';
      default: return status;
    }
  };

  const totalSavings = bookingHistory.reduce((sum, booking) => 
    sum + (booking.budget - booking.actualCost), 0
  );

  const averageRating = bookingHistory.reduce((sum, booking) => 
    sum + booking.rating, 0
  ) / bookingHistory.length;

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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
                <Building className={`${GTSStyles.icons.medium} text-white`} />
              </div>
              <div>
                <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                  B2B Portal
                </h1>
                <p className={GTSComponents.pageSubtitle}>
                  Корпоративные мероприятия и услуги
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className={`${GTSStyles.text.primary} font-medium`}>{companyInfo.contactPerson}</div>
              <div className={`text-sm ${GTSStyles.text.muted}`}>{companyInfo.position}</div>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className={GTSStyles.text.primary}>{companyInfo.rating}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>{companyInfo.eventsCount}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Мероприятий проведено</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>₽{(companyInfo.totalSpent / 1000000).toFixed(1)}M</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Общая сумма заказов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-green-400 font-semibold">₽{(totalSavings / 1000).toFixed(0)}K</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Сэкономлено с скидкой</div>
          </div>
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>{averageRating.toFixed(1)}</div>
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
            <TabsTrigger value="profile" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Building className={GTSStyles.icons.small} />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="documents" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <FileText className={GTSStyles.icons.small} />
              Документы
            </TabsTrigger>
            <TabsTrigger value="templates" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <BookOpen className={GTSStyles.icons.small} />
              Шаблоны
            </TabsTrigger>
          </TabsList>

          {/* Bookings & History - Real Template */}
          <TabsContent value="bookings" className="space-y-6">
            {/* Upcoming Bookings */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                  Предстоящие мероприятия ({upcomingBookings.length})
                </h2>
                <Button className={GTSStyles.buttons.primary}>
                  <Plus className={GTSStyles.icons.button} />
                  Новая заявка
                </Button>
              </div>

              <div className="space-y-4">
                {upcomingBookings.map((booking) => {
                  const IconComponent = booking.icon;
                  return (
                    <Card key={booking.id} className={`${GTSStyles.cards.content} p-6 ${GTSStyles.cards.hover}`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                            <IconComponent className={`${GTSStyles.icons.large} text-blue-400`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`${GTSStyles.text.primary} font-medium text-lg`}>{booking.title}</h3>
                              <Badge className={`${getStatusColor(booking.status)} border text-xs`}>
                                {getStatusText(booking.status)}
                              </Badge>
                            </div>
                            
                            <p className={`${GTSStyles.text.muted} mb-3`}>{booking.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>
                                  {new Date(booking.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>{booking.participants} участников</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>₽{booking.budget.toLocaleString()}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-6">
                          <div className={`text-xl ${GTSStyles.text.primary} font-semibold mb-4`}>
                            ₽{booking.budget.toLocaleString()}
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className={GTSStyles.buttons.primary}>
                              <Edit className={GTSStyles.icons.button} />
                              Изменить
                            </Button>
                            <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                              <Eye className={GTSStyles.icons.button} />
                              Подробнее
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* History */}
            <div>
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium mb-4`}>
                История мероприятий ({bookingHistory.length})
              </h2>

              <div className="space-y-4">
                {bookingHistory.map((booking) => {
                  const IconComponent = booking.icon;
                  return (
                    <Card key={booking.id} className={`${GTSStyles.cards.content} p-6`}>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-16 h-16 rounded-2xl bg-green-500/20 flex items-center justify-center">
                            <IconComponent className={`${GTSStyles.icons.large} text-green-400`} />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className={`${GTSStyles.text.primary} font-medium text-lg`}>{booking.title}</h3>
                              <Badge className={`${getStatusColor(booking.status)} border text-xs`}>
                                {getStatusText(booking.status)}
                              </Badge>
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
                            
                            <p className={`${GTSStyles.text.muted} mb-3`}>{booking.description}</p>
                            
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-3 text-sm">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>
                                  {new Date(booking.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>{booking.participants} участников</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>₽{booking.actualCost.toLocaleString()}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-white/40" />
                                <span className={GTSStyles.text.muted}>{booking.photos} фото</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-400" />
                                <span className="text-green-400">
                                  Экономия ₽{(booking.budget - booking.actualCost).toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <div className={`${GTSStyles.cards.surface} p-3 rounded-xl`}>
                              <p className={`${GTSStyles.text.primary} text-sm italic`}>
                                "{booking.feedback}"
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="text-right ml-6">
                          <div className="mb-4">
                            <div className={`text-xl ${GTSStyles.text.primary} font-semibold`}>
                              ₽{booking.actualCost.toLocaleString()}
                            </div>
                            <div className={`text-sm ${GTSStyles.text.muted} line-through`}>
                              ₽{booking.budget.toLocaleString()}
                            </div>
                            <div className="text-sm text-green-400">
                              Скидка {companyInfo.discount}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2">
                            <Button size="sm" className={GTSStyles.buttons.secondary}>
                              Повторить заказ
                            </Button>
                            <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                              <Eye className={GTSStyles.icons.button} />
                              Фотоотчет
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          </TabsContent>

          {/* Company Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <div className="flex items-center justify-between">
                  <h2 className={GTSComponents.cardTitle}>Профиль компании</h2>
                  <div className="flex items-center gap-3">
                    <Badge className={`${GTSStyles.badges.default} bg-purple-500/20 text-purple-400 border-purple-500/30`}>
                      Премиум клиент
                    </Badge>
                    <Button size="sm" className={GTSStyles.buttons.secondary}>
                      <Edit className={GTSStyles.icons.button} />
                      Редактировать
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div>
                      <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>Название компании</label>
                      <p className={`${GTSStyles.text.primary} font-medium text-lg`}>{companyInfo.name}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>ИНН</label>
                        <p className={GTSStyles.text.primary}>{companyInfo.inn}</p>
                      </div>
                      <div>
                        <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>КПП</label>
                        <p className={GTSStyles.text.primary}>{companyInfo.kpp}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>Юридический адрес</label>
                      <p className={GTSStyles.text.primary}>{companyInfo.address}</p>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>Контактное лицо</label>
                      <p className={`${GTSStyles.text.primary} font-medium text-lg`}>{companyInfo.contactPerson}</p>
                      <p className={GTSStyles.text.muted}>{companyInfo.position}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center gap-3">
                        <Phone className="w-4 h-4 text-white/40" />
                        <span className={GTSStyles.text.primary}>{companyInfo.phone}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="w-4 h-4 text-white/40" />
                        <span className={GTSStyles.text.primary}>{companyInfo.email}</span>
                      </div>
                    </div>
                    
                    <div>
                      <label className={`${GTSStyles.text.muted} text-sm block mb-2`}>Персональный менеджер</label>
                      <p className={`${GTSStyles.text.primary} font-medium`}>{companyInfo.manager}</p>
                      <p className={GTSStyles.text.muted}>{companyInfo.managerPhone}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Contract Info */}
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h3 className={GTSComponents.cardTitle}>Условия договора</h3>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>{companyInfo.contractNumber}</div>
                    <div className={`${GTSStyles.text.muted} text-sm`}>Номер договора</div>
                  </div>
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>
                      {new Date(companyInfo.contractDate).toLocaleDateString('ru-RU')}
                    </div>
                    <div className={`${GTSStyles.text.muted} text-sm`}>Дата заключения</div>
                  </div>
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>{companyInfo.paymentTerms}</div>
                    <div className={`${GTSStyles.text.muted} text-sm`}>Условия оплаты</div>
                  </div>
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className="text-green-400 font-medium mb-1">{companyInfo.discount}</div>
                    <div className={`${GTSStyles.text.muted} text-sm`}>Персональная скидка</div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                Документы и счета ({invoicesDocuments.length})
              </h2>
              <div className="flex gap-3">
                <Button className={GTSStyles.buttons.secondary}>
                  <Upload className={GTSStyles.icons.button} />
                  Загрузить документы
                </Button>
                <Button className={GTSStyles.buttons.secondary}>
                  <Download className={GTSStyles.icons.button} />
                  Скачать отчет
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {invoicesDocuments.map((doc) => (
                <Card key={doc.id} className={`${GTSStyles.cards.content} p-4 ${GTSStyles.cards.hover}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-[#91040C]/20 flex items-center justify-center">
                        <FileText className={`${GTSStyles.icons.medium} text-[#91040C]`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`${GTSStyles.text.primary} font-medium`}>{doc.id}</h3>
                          <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                        <p className={`${GTSStyles.text.muted} mb-2`}>{doc.service}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-white/40" />
                            <span className={GTSStyles.text.muted}>
                              {new Date(doc.date).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          {doc.dueDate && (
                            <div className="flex items-center gap-2">
                              <Clock className="w-4 h-4 text-yellow-400" />
                              <span className={GTSStyles.text.muted}>
                                Срок: {new Date(doc.dueDate).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          )}
                          {doc.paidDate && (
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-4 h-4 text-green-400" />
                              <span className="text-green-400">
                                Оплачено: {new Date(doc.paidDate).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="text-right ml-6">
                      <div className={`text-xl ${GTSStyles.text.primary} font-semibold mb-2`}>
                        ₽{doc.amount.toLocaleString()}
                      </div>
                      <Badge className={`${getStatusColor(doc.status)} border text-xs mb-3`}>
                        {getStatusText(doc.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                          <Download className={GTSStyles.icons.button} />
                        </Button>
                        <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                          <Eye className={GTSStyles.icons.button} />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Event Templates */}
          <TabsContent value="templates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                Готовые решения для корпоративных мероприятий
              </h2>
              <Button className={GTSStyles.buttons.primary}>
                Создать индивидуальное предложение
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {eventTemplates.map((template) => (
                <Card key={template.id} className={`${GTSStyles.cards.content} p-6 ${GTSStyles.cards.hover}`}>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className={`${GTSStyles.text.primary} font-medium text-lg`}>{template.name}</h3>
                      <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30 text-xs">
                        {template.category}
                      </Badge>
                    </div>
                    <p className={`${GTSStyles.text.muted} mb-4`}>{template.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-white/40" />
                        <span className={GTSStyles.text.muted}>{template.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-white/40" />
                        <span className={GTSStyles.text.muted}>{template.capacity}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-3`}>
                      ₽{template.price.toLocaleString()}
                    </div>
                    
                    <div>
                      <div className={`${GTSStyles.text.primary} font-medium mb-2`}>Включено в стоимость:</div>
                      <div className="space-y-1">
                        {template.includes.map((item, index) => (
                          <div key={index} className={`flex items-center gap-2 text-sm ${GTSStyles.text.muted}`}>
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button className={`${GTSStyles.buttons.primary} flex-1`}>
                      Заказать
                    </Button>
                    <Button variant="ghost" className={GTSStyles.buttons.ghost}>
                      <Eye className={GTSStyles.icons.button} />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}