import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { 
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Phone,
  Radio,
  Activity,
  RefreshCw,
  Filter
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSOperatorPanelProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

const todayOperations = [
  {
    id: '1',
    time: '09:00',
    type: 'Катер',
    resource: 'Yamaha 252S #001',
    client: 'Иванов А.М.',
    crew: 'Капитан Петров',
    status: 'active',
    location: 'Порт Сочи',
    duration: '3 часа',
    guests: 6
  },
  {
    id: '2',
    time: '10:30',
    type: 'Багги',
    resource: 'Honda Talon #003',
    client: 'ООО "Восток"',
    crew: 'Инструктор Сидоров',
    status: 'preparing',
    location: 'База Красная Поляна',
    duration: '2 часа',
    guests: 4
  },
  {
    id: '3',
    time: '14:00',
    type: 'Вертолет',
    resource: 'Robinson R44',
    client: 'Смирнова О.В.',
    crew: 'Пилот Козлов',
    status: 'scheduled',
    location: 'Аэропорт Адлер',
    duration: '1 час',
    guests: 3
  },
  {
    id: '4',
    time: '16:00',
    type: 'Slingshot',
    resource: 'Polaris R #002',
    client: 'Николаев Д.С.',
    crew: 'Инструктор Морозов',
    status: 'delayed',
    location: 'Олимпийский парк',
    duration: '1.5 часа',
    guests: 2
  }
];

const crewMembers = [
  {
    id: '1',
    name: 'Петров И.С.',
    role: 'Капитан',
    status: 'active',
    location: 'Порт Сочи',
    experience: '15 лет',
    rating: 4.9,
    currentBooking: 'Yamaha 252S #001'
  },
  {
    id: '2',
    name: 'Сидоров М.В.',
    role: 'Инструктор',
    status: 'preparing',
    location: 'База Красная Поляна',
    experience: '8 лет',
    rating: 4.7,
    currentBooking: 'Honda Talon #003'
  },
  {
    id: '3',
    name: 'Козлов А.А.',
    role: 'Пилот',
    status: 'standby',
    location: 'Аэропорт Адлер',
    experience: '12 лет',
    rating: 5.0,
    currentBooking: null
  },
  {
    id: '4',
    name: 'Морозов В.Н.',
    role: 'Инструктор',
    status: 'break',
    location: 'Олимпийский парк',
    experience: '6 лет',
    rating: 4.8,
    currentBooking: null
  }
];

const incidentTypes = [
  'Техническая неисправность',
  'Погодные условия',
  'Медицинский случай',
  'Опоздание клиента',
  'Повреждение оборудования',
  'Другое'
];

export function GTSOperatorPanel({ user, onLogout, onBackToHome }: GTSOperatorPanelProps) {
  const [activeTab, setActiveTab] = useState('operations');
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incidentData, setIncidentData] = useState({
    type: '',
    description: '',
    severity: 'medium',
    resourceId: ''
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'preparing': return 'bg-yellow-500';
      case 'scheduled': return 'bg-blue-500';
      case 'delayed': return 'bg-red-500';
      case 'standby': return 'bg-gray-500';
      case 'break': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'В работе';
      case 'preparing': return 'Подготовка';
      case 'scheduled': return 'Запланировано';
      case 'delayed': return 'Задержка';
      case 'standby': return 'Ожидание';
      case 'break': return 'Перерыв';
      default: return status;
    }
  };

  const handleIncidentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here would be the API call to submit the incident
    console.log('Incident submitted:', incidentData);
    setShowIncidentForm(false);
    setIncidentData({ type: '', description: '', severity: 'medium', resourceId: '' });
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Unified Admin Header */}
      <GTSUnifiedAdminHeader
        user={user}
        currentRole="Оператор"
        currentPage="Диспетчерская служба"
        notificationCount={2}
        onSearch={(query) => console.log('Search:', query)}
        onLogin={() => console.log('Login clicked')}
        onLogout={onLogout}
        onBackToHome={onBackToHome}
      />

      {/* Shift Status Bar */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] px-6 py-2">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-[--gts-portal-text]">Смена: 08:00 - 20:00</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="operations" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              Операции сегодня
            </TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Календарь ресурсов
            </TabsTrigger>
            <TabsTrigger value="crew" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Экипажи
            </TabsTrigger>
            <TabsTrigger value="incidents" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <AlertTriangle className="w-4 h-4 mr-2" />
              Инциденты
            </TabsTrigger>
          </TabsList>

          {/* Operations Board */}
          <TabsContent value="operations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Операции на {new Date().toLocaleDateString('ru-RU')}</h2>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтр
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Обновить
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {todayOperations.map((operation) => (
                <Card 
                  key={operation.id} 
                  className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 cursor-pointer hover:bg-[--gts-portal-card] transition-colors"
                  onClick={() => setSelectedOperation(operation.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-[--gts-portal-text] font-medium">{operation.time}</div>
                        <div className="text-xs text-[--gts-portal-muted]">{operation.duration}</div>
                      </div>
                      
                      <div className={`w-1 h-12 rounded-full ${getStatusColor(operation.status)}`}></div>
                      
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[--gts-portal-text] font-medium">{operation.type}</span>
                          <Badge variant="outline" className="text-xs">
                            {operation.resource}
                          </Badge>
                        </div>
                        <div className="text-sm text-[--gts-portal-muted] mt-1">
                          Клиент: {operation.client}
                        </div>
                        <div className="text-sm text-[--gts-portal-muted]">
                          Экипаж: {operation.crew}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={`${getStatusColor(operation.status)} text-white mb-2`}>
                        {getStatusText(operation.status)}
                      </Badge>
                      <div className="text-sm text-[--gts-portal-muted]">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {operation.location}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Users className="w-3 h-3" />
                          {operation.guests} гостей
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Resource Calendar */}
          <TabsContent value="calendar">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] text-lg mb-4">Календарь ресурсов</h3>
              <div className="text-center text-[--gts-portal-muted] py-12">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Календарь ресурсов в разработке</p>
              </div>
            </Card>
          </TabsContent>

          {/* Crew Management */}
          <TabsContent value="crew" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Экипажи на смене</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
              >
                <Phone className="w-4 h-4 mr-2" />
                Общая связь
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {crewMembers.map((crew) => (
                <Card key={crew.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-[--gts-portal-text] font-medium">{crew.name}</h3>
                      <p className="text-sm text-[--gts-portal-muted]">{crew.role}</p>
                    </div>
                    <Badge className={`${getStatusColor(crew.status)} text-white`}>
                      {getStatusText(crew.status)}
                    </Badge>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-[--gts-portal-muted]">
                      <MapPin className="w-3 h-3" />
                      {crew.location}
                    </div>
                    <div className="flex items-center gap-2 text-[--gts-portal-muted]">
                      <Clock className="w-3 h-3" />
                      Опыт: {crew.experience}
                    </div>
                    {crew.currentBooking && (
                      <div className="flex items-center gap-2 text-[--gts-portal-muted]">
                        <Activity className="w-3 h-3" />
                        {crew.currentBooking}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1">
                      <span className="text-yellow-500">★</span>
                      <span className="text-[--gts-portal-text] text-sm">{crew.rating}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Phone className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Radio className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Incident Reports */}
          <TabsContent value="incidents" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Отчеты об инцидентах</h2>
              <Button
                onClick={() => setShowIncidentForm(true)}
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Новый инцидент
              </Button>
            </div>

            {showIncidentForm && (
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] text-lg mb-4">Создать отчет об инциденте</h3>
                <form onSubmit={handleIncidentSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[--gts-portal-text] mb-2">Тип инцидента</label>
                      <select
                        value={incidentData.type}
                        onChange={(e) => setIncidentData(prev => ({ ...prev, type: e.target.value }))}
                        className="w-full p-2 bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg text-[--gts-portal-text]"
                        required
                      >
                        <option value="">Выберите тип</option>
                        {incidentTypes.map((type) => (
                          <option key={type} value={type}>{type}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm text-[--gts-portal-text] mb-2">Ресурс</label>
                      <select
                        value={incidentData.resourceId}
                        onChange={(e) => setIncidentData(prev => ({ ...prev, resourceId: e.target.value }))}
                        className="w-full p-2 bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg text-[--gts-portal-text]"
                        required
                      >
                        <option value="">Выберите ресурс</option>
                        <option value="yamaha-001">Yamaha 252S #001</option>
                        <option value="honda-003">Honda Talon #003</option>
                        <option value="robinson">Robinson R44</option>
                        <option value="polaris-002">Polaris R #002</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[--gts-portal-text] mb-2">Описание инцидента</label>
                    <textarea
                      value={incidentData.description}
                      onChange={(e) => setIncidentData(prev => ({ ...prev, description: e.target.value }))}
                      rows={4}
                      className="w-full p-2 bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg text-[--gts-portal-text] placeholder:text-[--gts-portal-muted]"
                      placeholder="Подробное описание произошедшего инцидента..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[--gts-portal-text] mb-2">Уровень серьезности</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="severity"
                          value="low"
                          checked={incidentData.severity === 'low'}
                          onChange={(e) => setIncidentData(prev => ({ ...prev, severity: e.target.value }))}
                          className="text-[--gts-portal-accent]"
                        />
                        <span className="text-[--gts-portal-text]">Низкий</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="severity"
                          value="medium"
                          checked={incidentData.severity === 'medium'}
                          onChange={(e) => setIncidentData(prev => ({ ...prev, severity: e.target.value }))}
                          className="text-[--gts-portal-accent]"
                        />
                        <span className="text-[--gts-portal-text]">Средний</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="severity"
                          value="high"
                          checked={incidentData.severity === 'high'}
                          onChange={(e) => setIncidentData(prev => ({ ...prev, severity: e.target.value }))}
                          className="text-[--gts-portal-accent]"
                        />
                        <span className="text-[--gts-portal-text]">Высокий</span>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowIncidentForm(false)}
                      className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                    >
                      Отмена
                    </Button>
                    <Button
                      type="submit"
                      className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                    >
                      Создать отчет
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <div className="text-center text-[--gts-portal-muted] py-8">
                <AlertTriangle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Инцидентов за сегодня не зарегистрировано</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}