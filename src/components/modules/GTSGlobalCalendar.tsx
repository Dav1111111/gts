import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Calendar,
  Clock,
  Users,
  MapPin,
  Filter,
  Plus,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Grid3X3,
  List,
  Search,
  Settings,
  Cloud,
  CloudRain,
  Sun,
  Wind,
  Thermometer,
  Eye,
  Edit,
  Trash2,
  Anchor,
  Plane,
  Car,
  Bike
} from "lucide-react";

interface GTSGlobalCalendarProps {
  onBackToHome: () => void;
  navigationContext?: any;
}

const mockBookings = [
  {
    id: '1',
    title: 'Морская прогулка VIP',
    client: 'Иванов А.М.',
    resource: 'Yamaha 252S #001',
    crew: 'Капитан Петров',
    time: '10:00-13:00',
    date: '2024-02-15',
    guests: 6,
    status: 'confirmed',
    type: 'boat',
    price: 25000,
    weather: { temp: 22, condition: 'sunny', wind: 8 }
  },
  {
    id: '2', 
    title: 'Корпоративный тимбилдинг',
    client: 'ООО "Техсервис"',
    resource: 'Honda Talon #003',
    crew: 'Инструктор Сидоров',
    time: '14:00-17:00',
    date: '2024-02-15',
    guests: 8,
    status: 'pending',
    type: 'buggy',
    price: 18000,
    weather: { temp: 20, condition: 'partly_cloudy', wind: 12 }
  },
  {
    id: '3',
    title: 'Авиационная экскурсия',
    client: 'Смирнова О.В.',
    resource: 'Robinson R44',
    crew: 'Пилот Козлов',
    time: '09:00-10:00',
    date: '2024-02-16',
    guests: 3,
    status: 'confirmed',
    type: 'helicopter',
    price: 45000,
    weather: { temp: 18, condition: 'cloudy', wind: 15 }
  },
  {
    id: '4',
    title: 'Романтическая поездка',
    client: 'Петров В.С.',
    resource: 'Polaris Slingshot #002',
    crew: 'Самостоятельно',
    time: '16:00-19:00',
    date: '2024-02-16',
    guests: 2,
    status: 'confirmed',
    type: 'slingshot',
    price: 12000,
    weather: { temp: 25, condition: 'sunny', wind: 5 }
  }
];

const resources = [
  { id: '1', name: 'Yamaha 252S #001', type: 'boat', status: 'available', crew: 'Капитан Петров', location: 'Причал A-1' },
  { id: '2', name: 'Yamaha 252S #002', type: 'boat', status: 'maintenance', crew: '-', location: 'Сервис' },
  { id: '3', name: 'Honda Talon #003', type: 'buggy', status: 'booked', crew: 'Инструктор Сидоров', location: 'База Красная поляна' },
  { id: '4', name: 'Honda Talon #004', type: 'buggy', status: 'available', crew: 'Инструктор Иванов', location: 'База Красная поляна' },
  { id: '5', name: 'Robinson R44', type: 'helicopter', status: 'available', crew: 'Пилот Козлов', location: 'Вертолётная площадка' },
  { id: '6', name: 'Polaris Slingshot #002', type: 'slingshot', status: 'available', crew: '-', location: 'Стоянка B-3' }
];

const weatherData = [
  { date: '2024-02-15', temp: 22, condition: 'sunny', wind: 8, humidity: 65 },
  { date: '2024-02-16', temp: 18, condition: 'cloudy', wind: 15, humidity: 78 },
  { date: '2024-02-17', temp: 15, condition: 'rainy', wind: 20, humidity: 85 },
  { date: '2024-02-18', temp: 25, condition: 'sunny', wind: 5, humidity: 55 },
];

export function GTSGlobalCalendar({ onBackToHome, navigationContext }: GTSGlobalCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'resource'>('resource');
  const [selectedResource, setSelectedResource] = useState<string>('1');
  const [showWeather, setShowWeather] = useState(true);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('ru-RU', { 
      month: 'long', 
      year: 'numeric' 
    }).format(date);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getResourceStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'booked': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'maintenance': return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'boat': return <Anchor className={GTSStyles.icons.small} />;
      case 'buggy': return <Car className={GTSStyles.icons.small} />;
      case 'helicopter': return <Plane className={GTSStyles.icons.small} />;
      case 'slingshot': return <Bike className={GTSStyles.icons.small} />;
      default: return <Calendar className={GTSStyles.icons.small} />;
    }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'sunny': return <Sun className="w-4 h-4 text-yellow-400" />;
      case 'cloudy': return <Cloud className="w-4 h-4 text-gray-400" />;
      case 'partly_cloudy': return <Cloud className="w-4 h-4 text-blue-400" />;
      case 'rainy': return <CloudRain className="w-4 h-4 text-blue-500" />;
      default: return <Cloud className="w-4 h-4 text-gray-400" />;
    }
  };

  const getWeatherCondition = (condition: string) => {
    switch (condition) {
      case 'sunny': return 'Солнечно';
      case 'cloudy': return 'Облачно';
      case 'partly_cloudy': return 'Переменная облачность';
      case 'rainy': return 'Дождь';
      default: return 'Неизвестно';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает';
      case 'cancelled': return 'Отменено';
      default: return status;
    }
  };

  const getResourceStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступно';
      case 'booked': return 'Занято';
      case 'maintenance': return 'Обслуживание';
      default: return status;
    }
  };

  const filteredBookings = mockBookings.filter(booking => {
    if (filterStatus === 'all') return true;
    return booking.status === filterStatus;
  });

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
            
            <div>
              <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                Глобальный календарь
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Ресурсный вид с погодными условиями
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`${GTSStyles.icons.small} absolute left-3 top-1/2 -translate-y-1/2 text-white/60`} />
              <input
                type="text"
                placeholder="Поиск бронирований..."
                className={`w-64 pl-10 pr-4 py-2 ${GTSStyles.inputs.default}`}
              />
            </div>
            
            <Button className={GTSStyles.buttons.primary}>
              <Plus className={GTSStyles.icons.button} />
              Новое бронирование
            </Button>
          </div>
        </div>
      </div>

      {/* Calendar Controls */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const prev = new Date(currentDate);
                  prev.setMonth(prev.getMonth() - 1);
                  setCurrentDate(prev);
                }}
                className={GTSStyles.buttons.ghost}
              >
                <ChevronLeft className={GTSStyles.icons.button} />
              </Button>
              
              <h2 className={`text-lg ${GTSStyles.text.primary} font-medium min-w-[200px] text-center`}>
                {formatDate(currentDate)}
              </h2>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  const next = new Date(currentDate);
                  next.setMonth(next.getMonth() + 1);
                  setCurrentDate(next);
                }}
                className={GTSStyles.buttons.ghost}
              >
                <ChevronRight className={GTSStyles.icons.button} />
              </Button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentDate(new Date())}
              className={GTSStyles.buttons.secondary}
            >
              Сегодня
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <div className={`flex items-center ${GTSStyles.backgrounds.card} rounded-xl p-1`}>
              <Button
                variant={viewMode === 'resource' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('resource')}
                className={viewMode === 'resource' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Ресурсы
              </Button>
              <Button
                variant={viewMode === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('month')}
                className={viewMode === 'month' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Месяц
              </Button>
              <Button
                variant={viewMode === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('week')}
                className={viewMode === 'week' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Неделя
              </Button>
            </div>

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent className={GTSStyles.cards.content}>
                <SelectItem value="all">Все</SelectItem>
                <SelectItem value="confirmed">Подтверждено</SelectItem>
                <SelectItem value="pending">Ожидает</SelectItem>
                <SelectItem value="cancelled">Отменено</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowWeather(!showWeather)}
              className={showWeather ? GTSStyles.buttons.primary : GTSStyles.buttons.secondary}
            >
              <Cloud className={GTSStyles.icons.button} />
              Погода
            </Button>
          </div>
        </div>
      </div>

      {/* Weather Bar */}
      {showWeather && (
        <div className={`${GTSStyles.backgrounds.card} border-b ${GTSStyles.borders.default} p-4`}>
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center gap-6 overflow-x-auto">
              {weatherData.map((weather, index) => (
                <div key={index} className={`flex items-center gap-3 ${GTSStyles.cards.content} p-3 rounded-xl min-w-[180px]`}>
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.condition)}
                    <div>
                      <div className={`text-sm ${GTSStyles.text.primary} font-medium`}>
                        {new Date(weather.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                      </div>
                      <div className={`text-xs ${GTSStyles.text.muted}`}>
                        {getWeatherCondition(weather.condition)}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <Thermometer className="w-3 h-3 text-orange-400" />
                    <span className={`text-sm ${GTSStyles.text.primary}`}>{weather.temp}°C</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Wind className="w-3 h-3 text-blue-400" />
                    <span className={`text-xs ${GTSStyles.text.muted}`}>{weather.wind}м/с</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={viewMode} className="space-y-6">
          {/* Resource View - Enhanced */}
          <TabsContent value="resource">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Resources List */}
              <Card className={GTSStyles.cards.surface}>
                <div className="p-4 border-b border-[#232428]">
                  <h3 className={GTSComponents.cardTitle}>Ресурсы ({resources.length})</h3>
                </div>
                
                <div className="p-4 space-y-3">
                  {resources.map((resource) => (
                    <div 
                      key={resource.id}
                      className={`p-3 rounded-xl border cursor-pointer transition-all duration-200 ${
                        selectedResource === resource.id
                          ? `${GTSStyles.borders.accent} bg-[#91040C]/10`
                          : `${GTSStyles.cards.hover}`
                      }`}
                      onClick={() => setSelectedResource(resource.id)}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#91040C]/20 flex items-center justify-center">
                            {getTypeIcon(resource.type)}
                          </div>
                          <div>
                            <div className={`${GTSStyles.text.primary} font-medium text-sm`}>{resource.name}</div>
                            <div className={`text-xs ${GTSStyles.text.muted} capitalize`}>{resource.type}</div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Badge className={`${getResourceStatusColor(resource.status)} text-xs border rounded-lg`}>
                          {getResourceStatusText(resource.status)}
                        </Badge>
                        <div className={`text-xs ${GTSStyles.text.muted}`}>
                          {resource.crew}
                        </div>
                      </div>

                      <div className={`text-xs ${GTSStyles.text.muted} mt-1 flex items-center gap-1`}>
                        <MapPin className="w-3 h-3" />
                        {resource.location}
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Resource Schedule */}
              <Card className={`lg:col-span-3 ${GTSStyles.cards.surface}`}>
                <div className="p-4 border-b border-[#232428]">
                  <div className="flex items-center justify-between">
                    <h3 className={GTSComponents.cardTitle}>
                      {selectedResource ? 
                        `Расписание: ${resources.find(r => r.id === selectedResource)?.name}` : 
                        'Выберите ресурс'
                      }
                    </h3>
                    {selectedResource && (
                      <Button size="sm" className={GTSStyles.buttons.primary}>
                        <Plus className={GTSStyles.icons.button} />
                        Добавить бронирование
                      </Button>
                    )}
                  </div>
                </div>

                <div className="p-4">
                  {selectedResource ? (
                    <div className="space-y-4">
                      {filteredBookings
                        .filter(booking => 
                          resources.find(r => r.id === selectedResource)?.name === booking.resource
                        )
                        .map((booking) => (
                          <div 
                            key={booking.id}
                            className={`${GTSStyles.cards.content} p-4 ${GTSStyles.cards.hover}`}
                          >
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-xl bg-[#91040C]/20 flex items-center justify-center">
                                  {getTypeIcon(booking.type)}
                                </div>
                                <div>
                                  <h4 className={`${GTSStyles.text.primary} font-medium`}>{booking.title}</h4>
                                  <p className={`text-sm ${GTSStyles.text.muted}`}>{booking.client}</p>
                                  <div className={`text-lg ${GTSStyles.text.primary} font-medium mt-1`}>
                                    ₽{booking.price.toLocaleString()}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Badge className={`${getStatusColor(booking.status)} border rounded-lg`}>
                                  {getStatusText(booking.status)}
                                </Badge>
                                <div className="flex gap-1">
                                  <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                    <Eye className={GTSStyles.icons.button} />
                                  </Button>
                                  <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                    <Edit className={GTSStyles.icons.button} />
                                  </Button>
                                  <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                    <Trash2 className={GTSStyles.icons.button} />
                                  </Button>
                                </div>
                              </div>
                            </div>
                            
                            {/* Booking Details */}
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                              <div className="flex items-center gap-2">
                                <Clock className={GTSStyles.icons.small} />
                                <span className={GTSStyles.text.muted}>{booking.time}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Users className={GTSStyles.icons.small} />
                                <span className={GTSStyles.text.muted}>{booking.guests} гостей</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Calendar className={GTSStyles.icons.small} />
                                <span className={GTSStyles.text.muted}>
                                  {new Date(booking.date).toLocaleDateString('ru-RU')}
                                </span>
                              </div>
                              <div className="flex items-center gap-2">
                                <MapPin className={GTSStyles.icons.small} />
                                <span className={GTSStyles.text.muted}>{booking.crew}</span>
                              </div>
                            </div>

                            {/* Weather Info */}
                            {booking.weather && (
                              <div className={`mt-3 pt-3 border-t ${GTSStyles.borders.default} flex items-center gap-4`}>
                                <div className="flex items-center gap-2">
                                  {getWeatherIcon(booking.weather.condition)}
                                  <span className={`text-sm ${GTSStyles.text.muted}`}>
                                    {getWeatherCondition(booking.weather.condition)}
                                  </span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Thermometer className="w-4 h-4 text-orange-400" />
                                  <span className={`text-sm ${GTSStyles.text.muted}`}>{booking.weather.temp}°C</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Wind className="w-4 h-4 text-blue-400" />
                                  <span className={`text-sm ${GTSStyles.text.muted}`}>{booking.weather.wind}м/с</span>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      
                      {filteredBookings.filter(booking => 
                        resources.find(r => r.id === selectedResource)?.name === booking.resource
                      ).length === 0 && (
                        <div className="text-center py-12">
                          <Calendar className={`w-12 h-12 mx-auto mb-3 ${GTSStyles.text.muted} opacity-50`} />
                          <p className={GTSStyles.text.muted}>Нет бронирований для этого ресурса</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Grid3X3 className={`w-16 h-16 mx-auto mb-4 ${GTSStyles.text.muted} opacity-50`} />
                      <p className={GTSStyles.text.muted}>Выберите ресурс для просмотра расписания</p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Month View */}
          <TabsContent value="month">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6">
                <div className="grid grid-cols-7 gap-4 mb-4">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map((day) => (
                    <div 
                      key={day} 
                      className={`text-center py-2 ${GTSStyles.text.muted} font-medium`}
                    >
                      {day}
                    </div>
                  ))}
                </div>
                
                <div className="grid grid-cols-7 gap-4">
                  {Array.from({ length: 35 }, (_, i) => {
                    const dayNumber = i - 4; // Adjust for month start
                    const isCurrentMonth = dayNumber > 0 && dayNumber <= 28;
                    const hasBooking = isCurrentMonth && Math.random() > 0.7;
                    
                    return (
                      <div 
                        key={i}
                        className={`min-h-[100px] p-2 border ${GTSStyles.borders.default} rounded-xl ${
                          isCurrentMonth ? GTSStyles.cards.content : `${GTSStyles.backgrounds.surface} opacity-50`
                        }`}
                      >
                        {isCurrentMonth && (
                          <>
                            <div className={`${GTSStyles.text.primary} font-medium mb-2`}>{dayNumber}</div>
                            {hasBooking && (
                              <div className="space-y-1">
                                <div className="text-xs bg-blue-500 text-white px-2 py-1 rounded truncate">
                                  10:00 Морская прогулка
                                </div>
                                <div className="text-xs bg-green-500 text-white px-2 py-1 rounded truncate">
                                  14:00 Багги тур
                                </div>
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Week View */}
          <TabsContent value="week">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6">
                <div className={`text-center ${GTSStyles.text.muted} py-12`}>
                  <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Недельный вид календаря в разработке</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}