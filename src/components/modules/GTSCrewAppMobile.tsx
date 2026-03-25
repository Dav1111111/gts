import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GTSCrewMobileBottomNav } from "../shell/GTSCrewMobileBottomNav";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Clock,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Phone,
  ArrowLeft,
  Navigation,
  Thermometer,
  Wind,
  Eye,
  Camera,
  FileText,
  Radio,
  Battery,
  Wifi,
  Signal,
  MessageSquare,
  Zap
} from "lucide-react";

interface GTSCrewAppMobileProps {
  onBackToHome: () => void;
}

const todayShifts = [
  {
    id: '1',
    time: '09:00-17:00',
    position: 'Капитан',
    vessel: 'Yamaha 252S #001',
    status: 'active',
    location: 'Порт Сочи',
    clients: [
      { name: 'Иванов А.М.', guests: 4, status: 'checked-in' },
      { name: 'Петрова О.В.', guests: 2, status: 'pending' }
    ]
  }
];

const weatherConditions = {
  temperature: 24,
  windSpeed: 8,
  windDirection: 'С-В',
  visibility: 10,
  waveHeight: 0.5,
  conditions: 'Ясно',
  warnings: []
};

const safetyChecklist = [
  { id: 1, item: 'Проверка топлива', completed: true },
  { id: 2, item: 'Проверка двигателя', completed: true },
  { id: 3, item: 'Проверка спасательных жилетов', completed: true },
  { id: 4, item: 'Проверка радиосвязи', completed: false },
  { id: 5, item: 'Проверка навигационного оборудования', completed: false },
  { id: 6, item: 'Проверка аптечки', completed: false }
];

export function GTSCrewAppMobile({ onBackToHome }: GTSCrewAppMobileProps) {
  const [currentPath, setCurrentPath] = useState('/today');
  const [checklistItems, setChecklistItems] = useState(safetyChecklist);

  const handleChecklistToggle = (itemId: number) => {
    setChecklistItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const completedChecklist = checklistItems.filter(item => item.completed).length;
  const totalChecklist = checklistItems.length;

  // Mock crew user
  const user = {
    id: 'crew1',
    name: 'Иван Петров',
    email: 'i.petrov@gts.com',
    role: 'captain' as const
  };

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const renderContent = () => {
    switch (currentPath) {
      case '/today':
        return <TodayView checklistItems={checklistItems} completedChecklist={completedChecklist} totalChecklist={totalChecklist} onToggleChecklist={handleChecklistToggle} />;
      case '/checklists':
        return <ChecklistView checklistItems={checklistItems} onToggleChecklist={handleChecklistToggle} completedChecklist={completedChecklist} totalChecklist={totalChecklist} />;
      case '/guests':
        return <GuestsView />;
      case '/chat':
        return <ChatView />;
      case '/alerts':
        return <AlertsView />;
      default:
        return <TodayView checklistItems={checklistItems} completedChecklist={completedChecklist} totalChecklist={totalChecklist} onToggleChecklist={handleChecklistToggle} />;
    }
  };

  return (
    <GTSCrewMobileBottomNav
      user={user}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onBackToHome={onBackToHome}
      onLogout={() => console.log('Crew logout')}
    >
      {renderContent()}
    </GTSCrewMobileBottomNav>
  );
}

// Today View Component
function TodayView({ checklistItems, completedChecklist, totalChecklist, onToggleChecklist }: any) {
  return (
    <div className="p-4 space-y-4">
      {/* Current Trip */}
      <Card className={GTSStyles.cards.surface}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className={GTSComponents.cardTitle}>Текущий рейс</h2>
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">В работе</Badge>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Clock className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{todayShifts[0].time}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Navigation className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{todayShifts[0].vessel}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <MapPin className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{todayShifts[0].location}</span>
            </div>
            
            <div className="flex items-center gap-2">
              <Users className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{todayShifts[0].clients.reduce((acc, client) => acc + client.guests, 0)} гостей</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Weather Conditions */}
      <Card className={GTSStyles.cards.surface}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className={GTSComponents.cardTitle}>Погодные условия</h3>
            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Безопасно</Badge>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Thermometer className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{weatherConditions.temperature}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Wind className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{weatherConditions.windSpeed} м/с</span>
            </div>
            <div className="flex items-center gap-2">
              <Eye className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>{weatherConditions.visibility} км</span>
            </div>
            <div className="flex items-center gap-2">
              <Navigation className={`w-4 h-4 ${GTSStyles.text.muted}`} />
              <span className={GTSStyles.text.primary}>Волна {weatherConditions.waveHeight} м</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3">
        <Button className={`${GTSStyles.buttons.primary} py-6`}>
          <FileText className="w-5 h-5 mr-2" />
          Чек-лист
          <Badge className="ml-2 bg-white/20 text-white text-xs">
            {completedChecklist}/{totalChecklist}
          </Badge>
        </Button>
        
        <Button className={`${GTSStyles.buttons.secondary} py-6`}>
          <Camera className="w-5 h-5 mr-2" />
          Фото
        </Button>
      </div>
    </div>
  );
}

// Checklist View Component  
function ChecklistView({ checklistItems, onToggleChecklist, completedChecklist, totalChecklist }: any) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Проверочный лист</h2>
        <div className={`text-sm ${GTSStyles.text.muted}`}>
          {completedChecklist}/{totalChecklist} выполнено
        </div>
      </div>

      <div className="space-y-3">
        {checklistItems.map((item: any) => (
          <Card key={item.id} className={GTSStyles.cards.surface}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <span className={GTSStyles.text.primary}>{item.item}</span>
                <Button
                  size="sm"
                  onClick={() => onToggleChecklist(item.id)}
                  className={item.completed ? 
                    "bg-green-500 hover:bg-green-600 text-white" : 
                    GTSStyles.buttons.secondary
                  }
                >
                  {item.completed ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {completedChecklist === totalChecklist && (
        <Card className="bg-green-500/10 border border-green-500/30">
          <div className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-green-400" />
              <div>
                <div className="text-green-400 font-medium">Все проверки выполнены!</div>
                <div className={`${GTSStyles.text.muted} text-sm`}>Можно приступать к работе</div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}

// Guests View Component
function GuestsView() {
  return (
    <div className="p-4 space-y-4">
      <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Список гостей</h2>
      
      <div className="space-y-3">
        {todayShifts[0].clients.map((client, index) => (
          <Card key={index} className={GTSStyles.cards.surface}>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${GTSStyles.text.primary} font-medium`}>{client.name}</div>
                  <div className={`${GTSStyles.text.muted} text-sm`}>{client.guests} гостей</div>
                </div>
                
                <div className="flex items-center gap-2">
                  {client.status === 'checked-in' ? (
                    <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">Прибыл</Badge>
                  ) : (
                    <Button size="sm" className={GTSStyles.buttons.primary}>
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Прибыл
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Chat View Component  
function ChatView() {
  return (
    <div className="p-4 space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Мои ресурсы</h2>
        <Button 
          size="sm" 
          className={GTSStyles.buttons.primary}
          onClick={() => console.log('Navigate to SphereM')}
        >
          SphereM
        </Button>
      </div>
      
      {/* Quick link to SphereM for crew */}
      <Card className={GTSStyles.cards.surface}>
        <div className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#91040C]/20 rounded-lg flex items-center justify-center">
              <Navigation className="w-5 h-5 text-[#91040C]" />
            </div>
            <div>
              <h3 className={GTSStyles.text.primary}>Управление ресурсами</h3>
              <p className={`${GTSStyles.text.muted} text-sm`}>SphereM System</p>
            </div>
          </div>
          <p className={`${GTSStyles.text.muted} text-sm mb-3`}>
            Просмотр назначенных ресурсов и обновление статуса
          </p>
          <Button 
            size="sm" 
            className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white"
            onClick={() => console.log('Open SphereM Mobile')}
          >
            Открыть SphereM
          </Button>
        </div>
      </Card>
      
      <div className="text-center py-8">
        <MessageSquare className={`w-12 h-12 mx-auto mb-4 ${GTSStyles.text.muted} opacity-50`} />
        <h3 className={`${GTSStyles.text.primary} text-lg mb-2`}>Чат команды</h3>
        <p className={GTSStyles.text.muted}>Здесь будут сообщения от диспетчера</p>
      </div>
    </div>
  );
}

// Alerts View Component
function AlertsView() {
  return (
    <div className="p-4 space-y-4">
      <div className="text-center mb-6">
        <AlertTriangle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        <h2 className={`${GTSStyles.text.primary} text-xl mb-2`}>Экстренная связь</h2>
        <p className={GTSStyles.text.muted}>
          Используйте только в критических ситуациях
        </p>
      </div>

      <div className="space-y-4">
        <Button className="w-full bg-red-500 hover:bg-red-600 text-white py-6 text-lg">
          <Phone className="w-6 h-6 mr-3" />
          ЭКСТРЕННЫЙ ВЫЗОВ
        </Button>

        <div className="grid grid-cols-2 gap-3">
          <Button className="border-red-500 text-red-400 hover:bg-red-500/10 py-4" variant="outline">
            <Radio className="w-5 h-5 mr-2" />
            Радиосвязь
          </Button>
          
          <Button className="border-red-500 text-red-400 hover:bg-red-500/10 py-4" variant="outline">
            <MapPin className="w-5 h-5 mr-2" />
            Координаты
          </Button>
        </div>

        <Card className="bg-red-500/10 border border-red-500/30">
          <div className="p-4">
            <h3 className="text-red-400 font-medium mb-2">Экстренные контакты</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-red-400">Диспетчер GTS:</span>
                <span className="text-red-400 font-mono">+7 (999) 123-45-67</span>
              </div>
              <div className="flex justify-between">
                <span className="text-red-400">Спасательная служба:</span>
                <span className="text-red-400 font-mono">112</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );

}