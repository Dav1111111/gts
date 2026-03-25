import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Alert, AlertDescription } from "../ui/alert";
import { 
  Calendar,
  Clock,
  User,
  MapPin,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  MessageSquare,
  FileText,
  Search,
  Filter,
  CloudRain,
  Users,
  Phone
} from "lucide-react";

export function GTSContractorBookings() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterService, setFilterService] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [actionModalOpen, setActionModalOpen] = useState(false);
  const [actionType, setActionType] = useState<"confirm" | "alternative" | "cancel" | null>(null);

  // Mock bookings data
  const bookingsData = [
    {
      id: "booking-001",
      client: "Александр Иванов",
      clientPhone: "+7 (918) 123-45-67",
      service: "Robinson R44",
      route: "Экскурсия над Сочи",
      date: "2024-02-12",
      time: "10:00",
      duration: "2 часа",
      location: "Аэропорт Сочи",
      amount: 85000,
      status: "pending" as const,
      weatherRisk: false,
      notes: "Первый полет, требуется инструктаж"
    },
    {
      id: "booking-002", 
      client: "GTS Premium Tour",
      clientPhone: "+7 (800) 555-01-02",
      service: "Yamaha 252S",
      route: "Морская прогулка VIP",
      date: "2024-02-15",
      time: "14:00",
      duration: "4 часа",
      location: "Морской порт Сочи",
      amount: 120000,
      status: "confirmed" as const,
      weatherRisk: true,
      notes: "Корпоративное мероприятие"
    },
    {
      id: "booking-003",
      client: "Михаил Петров",
      clientPhone: "+7 (918) 234-56-78",
      service: "Honda Talon",
      route: "Горный экстрим-тур",
      date: "2024-02-16",
      time: "09:00",
      duration: "6 часов",
      location: "КП Роза Хутор",
      amount: 45000,
      status: "confirmed" as const,
      weatherRisk: false,
      notes: "Опытный водитель"
    },
    {
      id: "booking-004",
      client: "Елена Сидорова",
      clientPhone: "+7 (918) 345-67-89",
      service: "Slingshot Polaris R",
      route: "Прибрежная поездка",
      date: "2024-02-14",
      time: "16:00",
      duration: "3 часа",
      location: "Сочи Парк",
      amount: 65000,
      status: "cancelled" as const,
      weatherRisk: false,
      notes: "Отменено клиентом"
    },
    {
      id: "booking-005",
      client: "Игорь Козлов",
      clientPhone: "+7 (918) 456-78-90",
      service: "Robinson R44",
      route: "Свадебная фотосессия",
      date: "2024-02-18",
      time: "11:00",
      duration: "1.5 часа",
      location: "Аэропорт Сочи",
      amount: 95000,
      status: "pending" as const,
      weatherRisk: false,
      notes: "Требуется особая осторожность"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return '#2BB673';
      case 'pending': return '#F5A623';
      case 'cancelled': return '#E5484D';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'confirmed': return 'Подтверждено';
      case 'pending': return 'Ожидает';
      case 'cancelled': return 'Отменено';
      default: return 'Неизвестно';
    }
  };

  const filteredBookings = bookingsData.filter(booking => {
    const matchesStatus = filterStatus === "all" || booking.status === filterStatus;
    const matchesService = filterService === "all" || booking.service.includes(filterService);
    const matchesSearch = searchQuery === "" || 
      booking.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesService && matchesSearch;
  });

  const selectedBookingData = selectedBooking ? bookingsData.find(b => b.id === selectedBooking) : null;

  const handleAction = (bookingId: string, action: "confirm" | "alternative" | "cancel") => {
    setSelectedBooking(bookingId);
    setActionType(action);
    setActionModalOpen(true);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', { 
      day: 'numeric', 
      month: 'long',
      weekday: 'short'
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ 
            fontFamily: 'Nokia.Kokia, Inter, sans-serif',
            color: '#FFFFFF'
          }}
        >
          Бронирования
        </h1>
        <p 
          className="text-lg"
          style={{ 
            color: '#A6A7AA',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          Управление бронированиями моей техники
        </p>
      </div>

      {/* Weather Alert */}
      <Alert className="border-0" style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}>
        <CloudRain className="h-4 w-4" style={{ color: '#F5A623' }} />
        <AlertDescription style={{ color: '#F5A623', fontFamily: 'Gilroy, Inter, sans-serif' }}>
          Внимание: Прогноз дождя на 15 февраля. Бронирование Yamaha 252S может потребовать переноса.
        </AlertDescription>
      </Alert>

      {/* Filters */}
      <Card 
        className="p-4 border-0"
        style={{ backgroundColor: '#17181A' }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
            <Input
              placeholder="Поиск по клиенту, технике или номеру..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-0"
              style={{ 
                backgroundColor: '#121214',
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            />
          </div>
          
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger 
              className="w-full lg:w-40 border-0"
              style={{ 
                backgroundColor: '#121214',
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              <Filter className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="pending">Ожидает</SelectItem>
              <SelectItem value="confirmed">Подтверждено</SelectItem>
              <SelectItem value="cancelled">Отменено</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterService} onValueChange={setFilterService}>
            <SelectTrigger 
              className="w-full lg:w-40 border-0"
              style={{ 
                backgroundColor: '#121214',
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
              <SelectItem value="all">Вся техника</SelectItem>
              <SelectItem value="Robinson">Robinson R44</SelectItem>
              <SelectItem value="Yamaha">Yamaha 252S</SelectItem>
              <SelectItem value="Honda">Honda Talon</SelectItem>
              <SelectItem value="Slingshot">Slingshot Polaris</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bookings Table */}
      <Card 
        className="border-0 overflow-hidden"
        style={{ backgroundColor: '#17181A' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b" style={{ borderColor: '#232428' }}>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  #
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Клиент
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Услуга / Маршрут
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Дата / Время
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Локация
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Сумма
                </th>
                <th 
                  className="text-left py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Статус
                </th>
                <th 
                  className="text-right py-4 px-6"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Действия
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.map((booking) => (
                <tr 
                  key={booking.id}
                  className="border-b hover:bg-gray-800/20"
                  style={{ borderColor: '#232428' }}
                >
                  <td 
                    className="py-4 px-6 font-mono text-sm"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {booking.id}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-8 h-8 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: '#91040C' }}
                      >
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <p 
                          className="font-medium"
                          style={{ 
                            color: '#FFFFFF',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {booking.client}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {booking.clientPhone}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div>
                      <p 
                        className="font-medium"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {booking.service}
                      </p>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {booking.route}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {booking.weatherRisk && (
                        <CloudRain className="w-4 h-4" style={{ color: '#F5A623' }} />
                      )}
                      <div>
                        <p 
                          className="font-medium"
                          style={{ 
                            color: '#FFFFFF',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {formatDate(booking.date)}
                        </p>
                        <p 
                          className="text-sm"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {booking.time} • {booking.duration}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td 
                    className="py-4 px-6"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {booking.location}
                  </td>
                  <td 
                    className="py-4 px-6 font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {booking.amount.toLocaleString('ru-RU')} ₽
                  </td>
                  <td className="py-4 px-6">
                    <Badge 
                      style={{ 
                        backgroundColor: getStatusColor(booking.status),
                        color: '#FFFFFF'
                      }}
                    >
                      {getStatusText(booking.status)}
                    </Badge>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex justify-end gap-2">
                      {booking.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleAction(booking.id, "confirm")}
                            size="sm"
                            style={{ 
                              backgroundColor: '#2BB673',
                              color: '#FFFFFF'
                            }}
                          >
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => handleAction(booking.id, "alternative")}
                            variant="outline"
                            size="sm"
                            className="border-0"
                            style={{ 
                              backgroundColor: '#121214',
                              color: '#FFFFFF'
                            }}
                          >
                            <Calendar className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      
                      <Button
                        onClick={() => handleAction(booking.id, "cancel")}
                        variant="outline"
                        size="sm"
                        className="border-0"
                        style={{ 
                          backgroundColor: booking.status === 'cancelled' ? '#121214' : 'transparent',
                          color: '#E5484D'
                        }}
                        disabled={booking.status === 'cancelled'}
                      >
                        <XCircle className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-0"
                        style={{ 
                          backgroundColor: '#121214',
                          color: '#FFFFFF'
                        }}
                      >
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-0"
                        style={{ 
                          backgroundColor: '#121214',
                          color: '#FFFFFF'
                        }}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Action Modal */}
      <Dialog open={actionModalOpen} onOpenChange={setActionModalOpen}>
        <DialogContent 
          className="max-w-md border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <DialogHeader>
            <DialogTitle 
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {actionType === 'confirm' && 'Подтвердить бронирование'}
              {actionType === 'alternative' && 'Предложить альтернативу'}
              {actionType === 'cancel' && 'Отменить бронирование'}
            </DialogTitle>
          </DialogHeader>

          {selectedBookingData && (
            <div className="space-y-4">
              {/* Booking Details */}
              <div 
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#121214' }}
              >
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Бронирование #{selectedBookingData.id}
                </p>
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {selectedBookingData.service} • {selectedBookingData.client}
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {formatDate(selectedBookingData.date)} в {selectedBookingData.time}
                </p>
              </div>

              {/* Action Form */}
              {actionType === 'cancel' && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Причина отмены
                  </label>
                  <Textarea
                    placeholder="Укажите причину отмены бронирования..."
                    className="border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  />
                </div>
              )}

              {actionType === 'alternative' && (
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Альтернативное предложение
                  </label>
                  <Textarea
                    placeholder="Предложите альтернативную дату или время..."
                    className="border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  />
                </div>
              )}

              {/* Weather Warning */}
              {selectedBookingData.weatherRisk && actionType === 'confirm' && (
                <Alert className="border-0" style={{ backgroundColor: 'rgba(245, 166, 35, 0.1)' }}>
                  <AlertTriangle className="h-4 w-4" style={{ color: '#F5A623' }} />
                  <AlertDescription style={{ color: '#F5A623', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                    Внимание: Неблагоприятные погодные условия на дату бронирования
                  </AlertDescription>
                </Alert>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setActionModalOpen(false)}
                  variant="outline"
                  className="flex-1 border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Отмена
                </Button>
                <Button
                  onClick={() => setActionModalOpen(false)}
                  className="flex-1"
                  style={{ 
                    backgroundColor: actionType === 'cancel' ? '#E5484D' : '#91040C',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {actionType === 'confirm' && 'Подтвердить'}
                  {actionType === 'alternative' && 'Отправить'}
                  {actionType === 'cancel' && 'Отменить'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}