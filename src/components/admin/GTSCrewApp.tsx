import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { 
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  Navigation,
  Thermometer,
  Wind,
  Eye,
  Camera,
  FileText,
  Radio
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSCrewAppProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

const todayRides = [
  {
    id: '1',
    time: '09:00 - 12:00',
    type: 'Катер',
    resource: 'Yamaha 252S #001',
    client: 'Иванов А.М.',
    guests: [
      { name: 'Иванов А.М.', age: 35, status: 'checked-in' },
      { name: 'Иванова Е.В.', age: 32, status: 'checked-in' },
      { name: 'Иванов М.А.', age: 12, status: 'checked-in' },
      { name: 'Петрова С.И.', age: 28, status: 'pending' }
    ],
    status: 'active',
    route: 'Порт Сочи → Бухта Инал → Порт Сочи',
    checkedIn: true,
    preflightDone: true,
    postflightDone: false
  },
  {
    id: '2',
    time: '14:00 - 16:30',
    type: 'Катер',
    resource: 'Yamaha 252S #001',
    client: 'ООО "Восток"',
    guests: [
      { name: 'Сидоров П.П.', age: 45, status: 'pending' },
      { name: 'Козлов В.А.', age: 38, status: 'pending' },
      { name: 'Морозов И.И.', age: 41, status: 'pending' }
    ],
    status: 'scheduled',
    route: 'Порт Сочи → Аше → Порт Сочи',
    checkedIn: false,
    preflightDone: false,
    postflightDone: false
  }
];

const weatherData = {
  temperature: 24,
  windSpeed: 8,
  windDirection: 'С-В',
  visibility: 10,
  waveHeight: 0.5,
  conditions: 'Ясно',
  warnings: []
};

const preflightChecklist = [
  { id: 1, item: 'Проверка топлива', completed: true },
  { id: 2, item: 'Проверка двигателя', completed: true },
  { id: 3, item: 'Проверка спасательных жилетов', completed: true },
  { id: 4, item: 'Проверка навигационного оборудования', completed: true },
  { id: 5, item: 'Проверка радиосвязи', completed: false },
  { id: 6, item: 'Проверка аптечки', completed: false }
];

const postflightChecklist = [
  { id: 1, item: 'Выключение двигателя', completed: false },
  { id: 2, item: 'Швартовка', completed: false },
  { id: 3, item: 'Уборка салона', completed: false },
  { id: 4, item: 'Проверка повреждений', completed: false },
  { id: 5, item: 'Заправка топлива', completed: false },
  { id: 6, item: 'Обновление журнала', completed: false }
];

export function GTSCrewApp({ user, onLogout, onBackToHome }: GTSCrewAppProps) {
  const [activeRide, setActiveRide] = useState(todayRides[0]);
  const [showChecklist, setShowChecklist] = useState<'pre' | 'post' | null>(null);
  const [checklistItems, setChecklistItems] = useState(preflightChecklist);
  const [guestStatuses, setGuestStatuses] = useState<Record<string, string>>({});

  const handleChecklistToggle = (itemId: number, type: 'pre' | 'post') => {
    if (type === 'pre') {
      setChecklistItems(prev => 
        prev.map(item => 
          item.id === itemId ? { ...item, completed: !item.completed } : item
        )
      );
    }
  };

  const handleGuestCheckIn = (guestName: string, status: 'checked-in' | 'no-show') => {
    setGuestStatuses(prev => ({ ...prev, [guestName]: status }));
  };

  const currentTime = new Date().toLocaleTimeString('ru-RU', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });

  return (
    <div className="min-h-screen bg-[--gts-portal-bg] max-w-md mx-auto">
      {/* Mobile Unified Admin Header */}
      <div className="sticky top-0 z-10">
        <GTSUnifiedAdminHeader
          user={user}
          currentRole="Экипаж"
          currentPage="GTS Crew"
          notificationCount={0}
          onSearch={(query) => console.log('Search:', query)}
          onLogin={() => console.log('Login clicked')}
          onLogout={onLogout}
          onBackToHome={onBackToHome}
          className="max-w-md mx-auto"
        />
      </div>

      {/* Status Bar */}
      <div className="bg-[--gts-portal-accent] p-3">
        <div className="text-center">
          <div className="text-white font-medium">{user.name}</div>
          <div className="text-white/80 text-sm">Капитан • Смена до 18:00</div>
        </div>
      </div>

      {/* Current Ride */}
      <div className="p-4">
        <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[--gts-portal-text] font-medium">Текущий рейс</h2>
            <Badge className={`${
              activeRide.status === 'active' ? 'bg-green-500' : 'bg-blue-500'
            } text-white`}>
              {activeRide.status === 'active' ? 'В работе' : 'Запланировано'}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-[--gts-portal-muted]">
              <Clock className="w-4 h-4" />
              <span>{activeRide.time}</span>
            </div>
            
            <div className="flex items-center gap-2 text-[--gts-portal-muted]">
              <Navigation className="w-4 h-4" />
              <span>{activeRide.resource}</span>
            </div>
            
            <div className="flex items-center gap-2 text-[--gts-portal-muted]">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{activeRide.route}</span>
            </div>
            
            <div className="flex items-center gap-2 text-[--gts-portal-muted]">
              <Users className="w-4 h-4" />
              <span>{activeRide.guests.length} гостей</span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            {!activeRide.checkedIn ? (
              <Button 
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                onClick={() => {/* Handle check-in */}}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Регистрация
              </Button>
            ) : (
              <Button 
                variant="outline"
                className="border-green-500 text-green-500 hover:bg-green-500/10"
                disabled
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Зарегистрирован
              </Button>
            )}
            
            <Button 
              variant="outline"
              className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
              onClick={() => {/* Handle emergency */}}
            >
              <Phone className="w-4 h-4 mr-2" />
              Диспетчер
            </Button>
          </div>
        </Card>

        {/* Weather Alert */}
        <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 mb-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-[--gts-portal-text] font-medium">Погодные условия</h3>
            <Badge variant="outline" className="text-green-500 border-green-500">
              Безопасно
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-[--gts-portal-muted]" />
              <span className="text-[--gts-portal-text]">{weatherData.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className="w-4 h-4 text-[--gts-portal-muted]" />
              <span className="text-[--gts-portal-text]">{weatherData.windSpeed} м/с {weatherData.windDirection}</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-[--gts-portal-muted]" />
              <span className="text-[--gts-portal-text]">{weatherData.visibility} км</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className="w-4 h-4 text-[--gts-portal-muted]" />
              <span className="text-[--gts-portal-text]">Волна {weatherData.waveHeight} м</span>
            </div>
          </div>
        </Card>

        {/* Guest List */}
        <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 mb-4">
          <h3 className="text-[--gts-portal-text] font-medium mb-3">Список гостей</h3>
          
          <div className="space-y-3">
            {activeRide.guests.map((guest, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-[--gts-portal-card] rounded-lg">
                <div>
                  <div className="text-[--gts-portal-text] font-medium">{guest.name}</div>
                  <div className="text-[--gts-portal-muted] text-sm">{guest.age} лет</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {guest.status === 'checked-in' || guestStatuses[guest.name] === 'checked-in' ? (
                    <Badge className="bg-green-500 text-white">Прибыл</Badge>
                  ) : guestStatuses[guest.name] === 'no-show' ? (
                    <Badge className="bg-red-500 text-white">Не явился</Badge>
                  ) : (
                    <div className="flex gap-1">
                      <Button
                        size="sm"
                        onClick={() => handleGuestCheckIn(guest.name, 'checked-in')}
                        className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 text-xs"
                      >
                        <CheckCircle className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleGuestCheckIn(guest.name, 'no-show')}
                        className="border-red-500 text-red-500 hover:bg-red-500/10 px-2 py-1 text-xs"
                      >
                        <XCircle className="w-3 h-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Checklists */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <Button
            variant="outline"
            className={`border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card] ${
              activeRide.preflightDone ? 'border-green-500 text-green-500' : ''
            }`}
            onClick={() => setShowChecklist('pre')}
          >
            <FileText className="w-4 h-4 mr-2" />
            Pre-flight
            {activeRide.preflightDone && <CheckCircle className="w-4 h-4 ml-2" />}
          </Button>
          
          <Button
            variant="outline"
            className={`border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card] ${
              activeRide.postflightDone ? 'border-green-500 text-green-500' : ''
            }`}
            onClick={() => setShowChecklist('post')}
            disabled={!activeRide.checkedIn}
          >
            <FileText className="w-4 h-4 mr-2" />
            Post-flight
            {activeRide.postflightDone && <CheckCircle className="w-4 h-4 ml-2" />}
          </Button>
        </div>

        {/* Emergency Button */}
        <Button
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 text-lg"
          onClick={() => {/* Handle emergency */}}
        >
          <AlertTriangle className="w-5 h-5 mr-2" />
          ЭКСТРЕННАЯ СВЯЗЬ
        </Button>

        {/* Checklist Modal */}
        {showChecklist && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-end">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] w-full rounded-t-lg p-4 max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[--gts-portal-text] font-medium">
                  {showChecklist === 'pre' ? 'Pre-flight Checklist' : 'Post-flight Checklist'}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowChecklist(null)}
                  className="text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <XCircle className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-3">
                {(showChecklist === 'pre' ? preflightChecklist : postflightChecklist).map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 bg-[--gts-portal-card] rounded-lg"
                  >
                    <span className="text-[--gts-portal-text]">{item.item}</span>
                    <Button
                      size="sm"
                      variant={item.completed ? "default" : "outline"}
                      onClick={() => handleChecklistToggle(item.id, showChecklist)}
                      className={item.completed ? 
                        "bg-green-500 hover:bg-green-600 text-white" : 
                        "border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      }
                    >
                      {item.completed ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </Button>
                  </div>
                ))}
              </div>

              <Button
                className="w-full mt-4 bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                onClick={() => setShowChecklist(null)}
              >
                Сохранить
              </Button>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}