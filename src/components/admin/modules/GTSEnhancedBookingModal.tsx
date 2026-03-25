import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Separator } from "../../ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { 
  Calendar,
  Clock,
  DollarSign,
  Anchor,
  Plane,
  Car,
  Users2,
  MapPin,
  Timer,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from "lucide-react";

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

interface GTSEnhancedBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  dealId: string | null;
  dealData: any;
}

export function GTSEnhancedBookingModal({ 
  isOpen, 
  onClose, 
  dealId, 
  dealData 
}: GTSEnhancedBookingModalProps) {
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

  const [holdTimer, setHoldTimer] = useState<Date | null>(null);

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
    const selectedResource = mockResources.find(r => r.id === bookingForm.resource);
    const selectedCrew = mockCrewMembers.find(c => c.id === bookingForm.crew);
    const expiryTime = bookingForm.status === 'tentative' ? getHoldExpiryTime() : null;
    
    if (expiryTime) {
      setHoldTimer(expiryTime);
    }
    
    console.log('Submitting booking:', {
      deal: dealData,
      resource: selectedResource,
      crew: selectedCrew,
      booking: bookingForm,
      expiryTime
    });

    // Here would be actual booking creation logic
    // For demo, we'll close the modal
    setTimeout(() => onClose(), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'tentative':
        return <Badge className="text-yellow-400 bg-yellow-500/10"><Timer className="w-3 h-3 mr-1" />Предварительно</Badge>;
      case 'confirmed':
        return <Badge className="text-green-400 bg-green-500/10"><CheckCircle2 className="w-3 h-3 mr-1" />Подтверждено</Badge>;
      case 'expired':
        return <Badge className="text-gray-400 bg-gray-500/10"><XCircle className="w-3 h-3 mr-1" />Истекло</Badge>;
      default:
        return null;
    }
  };

  const selectedResource = mockResources.find(r => r.id === bookingForm.resource);
  const availableCrew = mockCrewMembers.filter(crew => 
    selectedResource ? crew.specialization === selectedResource.type && crew.available : true
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-[#121214] border-[#232428] text-white max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-heading text-white flex items-center gap-2">
            <Calendar className="w-5 h-5 text-[#91040C]" />
            Создание бронирования
          </DialogTitle>
          <DialogDescription className="text-[#A6A7AA]">
            {dealData ? `Сделка: ${dealData.clientName} - ${dealData.description}` : 'Новое бронирование'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Booking Details */}
          <div className="space-y-6">
            {/* Resource Selection */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#91040C]" />
                  Выбор ресурса
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Тип транспорта</Label>
                  <Select 
                    value={bookingForm.resource} 
                    onValueChange={(value) => handleBookingFormChange('resource', value)}
                  >
                    <SelectTrigger className="bg-[#0B0B0C] border-[#232428] text-white">
                      <SelectValue placeholder="Выберите транспорт" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      {mockResources.map(resource => (
                        <SelectItem key={resource.id} value={resource.id} className="text-white hover:bg-[#17181A]">
                          <div className="flex items-center gap-2">
                            {getResourceIcon(resource.type)}
                            <span>{resource.name}</span>
                            <Badge variant="outline" className="ml-2 text-xs">
                              до {resource.capacity} чел
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedResource && (
                  <Alert className="bg-[#0B0B0C] border-[#232428]">
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-[#A6A7AA]">
                      Вместимость: {selectedResource.capacity} чел. | 
                      Цена: ₽{selectedResource.pricePerHour.toLocaleString()} за час
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>

            {/* Date & Time */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#91040C]" />
                  Дата и время
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-white">Дата</Label>
                    <Input
                      type="date"
                      value={bookingForm.date}
                      onChange={(e) => handleBookingFormChange('date', e.target.value)}
                      className="bg-[#0B0B0C] border-[#232428] text-white"
                    />
                  </div>
                  <div>
                    <Label className="text-white">Время</Label>
                    <Input
                      type="time"
                      value={bookingForm.time}
                      onChange={(e) => handleBookingFormChange('time', e.target.value)}
                      className="bg-[#0B0B0C] border-[#232428] text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-white">Продолжительность (часы)</Label>
                  <Select 
                    value={bookingForm.duration} 
                    onValueChange={(value) => handleBookingFormChange('duration', value)}
                  >
                    <SelectTrigger className="bg-[#0B0B0C] border-[#232428] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="0.5" className="text-white hover:bg-[#17181A]">30 минут</SelectItem>
                      <SelectItem value="1" className="text-white hover:bg-[#17181A]">1 час</SelectItem>
                      <SelectItem value="2" className="text-white hover:bg-[#17181A]">2 часа</SelectItem>
                      <SelectItem value="3" className="text-white hover:bg-[#17181A]">3 часа</SelectItem>
                      <SelectItem value="4" className="text-white hover:bg-[#17181A]">4 часа</SelectItem>
                      <SelectItem value="6" className="text-white hover:bg-[#17181A]">6 часов</SelectItem>
                      <SelectItem value="8" className="text-white hover:bg-[#17181A]">8 часов</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Crew Assignment */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Users2 className="w-4 h-4 text-[#91040C]" />
                  Назначение экипажа
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label className="text-white">Выберите специалиста</Label>
                  <Select 
                    value={bookingForm.crew} 
                    onValueChange={(value) => handleBookingFormChange('crew', value)}
                    disabled={!selectedResource}
                  >
                    <SelectTrigger className="bg-[#0B0B0C] border-[#232428] text-white">
                      <SelectValue placeholder={selectedResource ? "Выберите специалиста" : "Сначала выберите транспорт"} />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      {availableCrew.map(crew => (
                        <SelectItem key={crew.id} value={crew.id} className="text-white hover:bg-[#17181A]">
                          <div className="flex flex-col">
                            <span>{crew.name}</span>
                            <span className="text-xs text-[#A6A7AA]">{crew.role}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Status & Pricing */}
          <div className="space-y-6">
            {/* Booking Status */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <Timer className="w-4 h-4 text-[#91040C]" />
                  Статус бронирования
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[#A6A7AA]">Текущий статус:</span>
                  {getStatusBadge(bookingForm.status)}
                </div>

                {bookingForm.status === 'tentative' && (
                  <Alert className="bg-yellow-500/10 border-yellow-500/20">
                    <Timer className="h-4 w-4 text-yellow-400" />
                    <AlertDescription className="text-yellow-200">
                      {holdTimer ? (
                        <>Бронирование удерживается до {formatExpiryTime(holdTimer)}</>
                      ) : (
                        <>Бронирование будет удерживаться в течение 30 минут</>
                      )}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label className="text-white">Изменить статус</Label>
                  <Select 
                    value={bookingForm.status} 
                    onValueChange={(value) => handleBookingFormChange('status', value as any)}
                  >
                    <SelectTrigger className="bg-[#0B0B0C] border-[#232428] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#121214] border-[#232428]">
                      <SelectItem value="tentative" className="text-white hover:bg-[#17181A]">
                        <div className="flex items-center gap-2">
                          <Timer className="w-3 h-3 text-yellow-400" />
                          Предварительное
                        </div>
                      </SelectItem>
                      <SelectItem value="confirmed" className="text-white hover:bg-[#17181A]">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="w-3 h-3 text-green-400" />
                          Подтверждено
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            {/* Pricing */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#91040C]" />
                  Стоимость
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-white">Общая стоимость (₽)</Label>
                  <Input
                    value={bookingForm.price}
                    onChange={(e) => handleBookingFormChange('price', e.target.value)}
                    className="bg-[#0B0B0C] border-[#232428] text-white text-xl font-heading"
                    placeholder="0"
                    readOnly={!!selectedResource}
                  />
                  {selectedResource && (
                    <p className="text-xs text-[#A6A7AA] mt-1">
                      Автоматически рассчитано: {selectedResource.pricePerHour.toLocaleString()} × {bookingForm.duration}ч
                    </p>
                  )}
                </div>

                <Separator className="bg-[#232428]" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A6A7AA]">Базовая стоимость:</span>
                    <span className="text-white">₽{parseInt(bookingForm.price || '0').toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A6A7AA]">Предоплата (30%):</span>
                    <span className="text-yellow-400">₽{Math.floor(parseInt(bookingForm.price || '0') * 0.3).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span className="text-white">К доплате:</span>
                    <span className="text-green-400">₽{Math.ceil(parseInt(bookingForm.price || '0') * 0.7).toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Client Message */}
            {bookingForm.status === 'tentative' && (
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white flex items-center gap-2">
                    <Timer className="w-4 h-4 text-yellow-400" />
                    Сообщение клиенту
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Alert className="bg-yellow-500/10 border-yellow-500/20">
                    <AlertDescription className="text-yellow-200">
                      "Your booking is held until {holdTimer ? formatExpiryTime(holdTimer) : '[время]'}. Confirm with payment."
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            )}

            {/* Notes */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white">Заметки</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={bookingForm.notes}
                  onChange={(e) => handleBookingFormChange('notes', e.target.value)}
                  className="bg-[#0B0B0C] border-[#232428] text-white min-h-[80px]"
                  placeholder="Дополнительные пожелания клиента или особенности бронирования..."
                />
              </CardContent>
            </Card>
          </div>
        </div>

        <DialogFooter className="gap-2">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-[#232428] text-white hover:bg-[#17181A]"
          >
            Отмена
          </Button>
          <Button 
            onClick={handleSubmitBooking}
            disabled={!bookingForm.resource || !bookingForm.date || !bookingForm.time}
            className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
          >
            {bookingForm.status === 'tentative' ? 'Создать предварительное бронирование' : 'Подтвердить бронирование'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}