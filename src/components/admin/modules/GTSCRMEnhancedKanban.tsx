import { useState, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { 
  ArrowLeft, Plus, Search, Calendar, DollarSign, Clock, TrendingUp,
  User, Edit, Eye, Phone, Mail, Building2, Target, Activity,
  Zap, Bell, Users, MessageSquare
} from "lucide-react";

// Import react-dnd for drag and drop
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider, useDrag, useDrop } from "react-dnd";

interface GTSCRMEnhancedKanbanProps {
  onBack: () => void;
  onScheduleMeeting: (dealId: string, contact: string) => void;
  onSendNotification: (message: string, type: 'deal_moved' | 'meeting_scheduled' | 'deadline_approaching') => void;
}

// Enhanced Deal interface with more tracking data
interface Deal {
  id: string;
  title: string;
  client: string;
  contact: string;
  value: number;
  stage: string;
  probability: number;
  closeDate: string;
  owner: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  tags: string[];
  lastActivity: string;
  nextAction: string;
  communications: CommunicationRecord[];
  salesFunnelStep: number;
  customerScore: number;
}

interface CommunicationRecord {
  id: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  title: string;
  date: string;
  status: 'completed' | 'scheduled' | 'pending';
  outcome?: string;
}

// Enhanced mock data with more tracking information
const mockDealsEnhanced: Deal[] = [
  {
    id: "deal-001",
    title: "Корпоративный яхт-пакет",
    client: "TechCorp LLC",
    contact: "Александр Петров", 
    value: 450000,
    stage: "offer",
    probability: 75,
    closeDate: "2024-12-15",
    owner: "Maria Smirnova",
    priority: "high",
    tags: ["корпоратив", "vip", "повторный"],
    lastActivity: "2 часа назад",
    nextAction: "Презентация условий 14.12",
    salesFunnelStep: 4,
    customerScore: 92,
    communications: [
      { id: "comm-001", type: "call", title: "Обсуждение деталей пакета", date: "2024-12-01 14:30", status: "completed", outcome: "Положительная реакция, ждет коммерческое предложение" },
      { id: "comm-002", type: "email", title: "Отправлено КП", date: "2024-12-01 16:00", status: "completed" },
      { id: "comm-003", type: "meeting", title: "Презентация условий", date: "2024-12-14 15:00", status: "scheduled" }
    ]
  },
  {
    id: "deal-002",
    title: "Серия вертолетных туров",
    client: "Premium Events",
    contact: "Ольга Козлова",
    value: 280000,
    stage: "qualified", 
    probability: 60,
    closeDate: "2024-12-20",
    owner: "Dmitri Volkov",
    priority: "medium",
    tags: ["события", "серия"],
    lastActivity: "1 день назад",
    nextAction: "Звонок по бюджету 12.12",
    salesFunnelStep: 3,
    customerScore: 78,
    communications: [
      { id: "comm-004", type: "email", title: "Первичная заявка", date: "2024-11-29 10:00", status: "completed" },
      { id: "comm-005", type: "call", title: "Уточнение требований", date: "2024-11-30 14:00", status: "completed", outcome: "Интересует пакет на 3 даты" }
    ]
  },
  {
    id: "deal-003",
    title: "Багги-приключения на выходные",
    client: "Adventure Club",
    contact: "Виктор Кузнецов",
    value: 125000,
    stage: "new",
    probability: 40,
    closeDate: "2024-12-30", 
    owner: "Alex Petrov",
    priority: "low",
    tags: ["активный отдых", "группа"],
    lastActivity: "3 дня назад",
    nextAction: "Первичный звонок",
    salesFunnelStep: 1,
    customerScore: 45,
    communications: [
      { id: "comm-006", type: "email", title: "Заявка через сайт", date: "2024-11-28 12:00", status: "completed" }
    ]
  },
  {
    id: "deal-004",
    title: "VIP спорткар-тур",
    client: "Luxury Motors",
    contact: "Елена Соколова",
    value: 520000,
    stage: "prepaid",
    probability: 95,
    closeDate: "2024-12-10",
    owner: "Maria Smirnova",
    priority: "urgent",
    tags: ["vip", "luxury", "срочно"],
    lastActivity: "30 минут назад",
    nextAction: "Подтверждение деталей маршрута",
    salesFunnelStep: 5,
    customerScore: 98,
    communications: [
      { id: "comm-007", type: "meeting", title: "VIP консультация", date: "2024-11-25 16:00", status: "completed", outcome: "Подписан договор, внесена предоплата" },
      { id: "comm-008", type: "call", title: "Уточнение маршрута", date: "2024-12-01 17:30", status: "completed" }
    ]
  }
];

// Deal stages with enhanced analytics
const dealStages = [
  { id: "new", name: "Новые", color: "bg-gray-500", conversionRate: 40, avgTimeInStage: 3 },
  { id: "qualified", name: "Квалифицированы", color: "bg-blue-500", conversionRate: 65, avgTimeInStage: 5 },
  { id: "offer", name: "Предложение", color: "bg-yellow-500", conversionRate: 75, avgTimeInStage: 7 },
  { id: "prepaid", name: "Предоплата", color: "bg-orange-500", conversionRate: 92, avgTimeInStage: 2 },
  { id: "completed", name: "Завершено", color: "bg-green-500", conversionRate: 100, avgTimeInStage: 0 }
];

// Drag and Drop Types
const ITEM_TYPE = "DEAL";

// Draggable Deal Card Component
function DraggableDealCard({ deal, onScheduleMeeting }: { deal: Deal; onScheduleMeeting: (dealId: string, contact: string) => void }) {
  const [{ isDragging }, drag] = useDrag({
    type: ITEM_TYPE,
    item: { id: deal.id, stage: deal.stage },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: "text-gray-400 bg-gray-500/10",
      medium: "text-blue-400 bg-blue-500/10",
      high: "text-orange-400 bg-orange-500/10",
      urgent: "text-red-400 bg-red-500/10"
    };
    return colors[priority as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  return (
    <Card 
      ref={drag}
      className={`bg-[#17181A] border-[#232428] cursor-move transition-all duration-200 ${
        isDragging ? 'opacity-50 transform rotate-2 scale-105' : 'hover:bg-[#1A1B1D] hover:shadow-lg'
      }`}
      style={{
        transform: isDragging ? 'rotate(5deg) scale(1.05)' : 'none',
      }}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          {/* Header with priority */}
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h4 className="font-heading text-white text-sm line-clamp-2">{deal.title}</h4>
              <p className="text-xs text-[#A6A7AA] mt-1">{deal.client}</p>
            </div>
            <Badge className={`text-xs ${getPriorityColor(deal.priority)} ml-2`}>
              {deal.priority.toUpperCase()}
            </Badge>
          </div>
          
          {/* Value and Probability */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-heading text-white">{formatCurrency(deal.value)}</span>
            <div className="flex items-center gap-1">
              <span className="text-xs text-[#A6A7AA]">{deal.probability}%</span>
              <Progress value={deal.probability} className="w-12 h-1" />
            </div>
          </div>
          
          {/* Tags */}
          {deal.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {deal.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} className="text-xs bg-[#232428] text-[#A6A7AA] hover:bg-[#2A2B30]">
                  {tag}
                </Badge>
              ))}
              {deal.tags.length > 2 && (
                <Badge className="text-xs bg-[#232428] text-[#A6A7AA]">
                  +{deal.tags.length - 2}
                </Badge>
              )}
            </div>
          )}
          
          {/* Owner and Date */}
          <div className="flex items-center justify-between text-xs text-[#A6A7AA]">
            <div className="flex items-center gap-1">
              <User className="h-3 w-3" />
              <span>{deal.owner}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{deal.closeDate}</span>
            </div>
          </div>
          
          {/* Next Action */}
          <div className="bg-[#232428] rounded p-2">
            <p className="text-xs text-[#A6A7AA]">Следующий шаг:</p>
            <p className="text-xs text-white mt-1">{deal.nextAction}</p>
          </div>
          
          {/* Quick Actions */}
          <div className="flex gap-1">
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-7 text-xs border-[#232428] text-white hover:bg-[#232428]"
              onClick={(e) => {
                e.stopPropagation();
                onScheduleMeeting(deal.id, deal.contact);
              }}
            >
              <Calendar className="h-3 w-3 mr-1" />
              Встреча
            </Button>
            <Button 
              size="sm" 
              variant="outline" 
              className="flex-1 h-7 text-xs border-[#232428] text-white hover:bg-[#232428]"
            >
              <Eye className="h-3 w-3 mr-1" />
              Детали
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Droppable Stage Column Component
function DroppableStageColumn({ 
  stage, 
  deals, 
  onDropDeal, 
  onScheduleMeeting 
}: { 
  stage: any; 
  deals: Deal[]; 
  onDropDeal: (dealId: string, newStage: string) => void;
  onScheduleMeeting: (dealId: string, contact: string) => void;
}) {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ITEM_TYPE,
    drop: (item: { id: string; stage: string }) => {
      if (item.stage !== stage.id) {
        onDropDeal(item.id, stage.id);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const stageDeals = deals.filter(deal => deal.stage === stage.id);
  const stageTotalValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  return (
    <div 
      ref={drop}
      className={`space-y-4 transition-all duration-200 ${
        isOver && canDrop ? 'bg-[#17181A]/50 rounded-lg p-2' : ''
      }`}
    >
      <Card className={`bg-[#121214] border-[#232428] ${isOver && canDrop ? 'border-[#91040C] shadow-lg' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm text-white capitalize flex items-center gap-2">
              {stage.name}
              <Badge className={`${stage.color} text-white text-xs`}>
                {stageDeals.length}
              </Badge>
            </CardTitle>
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-xs text-[#A6A7AA]">
              <span>Общая сумма:</span>
              <span className="text-white font-medium">{formatCurrency(stageTotalValue)}</span>
            </div>
            <div className="flex justify-between text-xs text-[#A6A7AA]">
              <span>Конверсия:</span>
              <span className="text-green-400">{stage.conversionRate}%</span>
            </div>
            <div className="flex justify-between text-xs text-[#A6A7AA]">
              <span>Ср. время:</span>
              <span className="text-blue-400">{stage.avgTimeInStage} дн.</span>
            </div>
          </div>
        </CardHeader>
      </Card>
      
      {/* Drop Zone Indicator */}
      {isOver && canDrop && (
        <div className="border-2 border-dashed border-[#91040C] rounded-lg p-4 text-center">
          <p className="text-sm text-[#91040C]">Переместить сюда</p>
        </div>
      )}
      
      <div className="space-y-3">
        {stageDeals.map(deal => (
          <DraggableDealCard 
            key={deal.id} 
            deal={deal} 
            onScheduleMeeting={onScheduleMeeting}
          />
        ))}
      </div>
      
      {stageDeals.length === 0 && !isOver && (
        <div className="text-center py-8 text-[#A6A7AA]">
          <Target className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">Нет сделок</p>
        </div>
      )}
    </div>
  );
}

export function GTSCRMEnhancedKanban({ onBack, onScheduleMeeting, onSendNotification }: GTSCRMEnhancedKanbanProps) {
  const [deals, setDeals] = useState<Deal[]>(mockDealsEnhanced);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);
  const [selectedDealForMeeting, setSelectedDealForMeeting] = useState<{ dealId: string; contact: string } | null>(null);

  // Enhanced drag and drop handler with notifications
  const handleDropDeal = useCallback((dealId: string, newStage: string) => {
    setDeals(prevDeals => {
      const updatedDeals = prevDeals.map(deal => {
        if (deal.id === dealId) {
          const oldStage = deal.stage;
          
          // Send notification about stage change
          if (oldStage !== newStage) {
            const stageNames = {
              new: "Новые",
              qualified: "Квалифицированы", 
              offer: "Предложение",
              prepaid: "Предоплата",
              completed: "Завершено"
            };
            
            onSendNotification(
              `Сделка "${deal.title}" перемещена из "${stageNames[oldStage as keyof typeof stageNames]}" в "${stageNames[newStage as keyof typeof stageNames]}"`,
              'deal_moved'
            );
          }
          
          return { ...deal, stage: newStage };
        }
        return deal;
      });
      return updatedDeals;
    });
  }, [onSendNotification]);

  // Handle meeting scheduling
  const handleScheduleMeetingClick = useCallback((dealId: string, contact: string) => {
    setSelectedDealForMeeting({ dealId, contact });
    setShowMeetingDialog(true);
  }, []);

  const handleConfirmMeeting = useCallback(() => {
    if (selectedDealForMeeting) {
      onScheduleMeeting(selectedDealForMeeting.dealId, selectedDealForMeeting.contact);
      onSendNotification(
        `Запланирована встреча с ${selectedDealForMeeting.contact}`,
        'meeting_scheduled'
      );
      setShowMeetingDialog(false);
      setSelectedDealForMeeting(null);
    }
  }, [selectedDealForMeeting, onScheduleMeeting, onSendNotification]);

  // Filter deals based on search and priority
  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         deal.contact.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = selectedPriority === "all" || deal.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  // Calculate summary statistics
  const totalValue = filteredDeals.reduce((sum, deal) => sum + deal.value, 0);
  const avgProbability = filteredDeals.reduce((sum, deal) => sum + deal.probability, 0) / filteredDeals.length;
  const expectedValue = filteredDeals.reduce((sum, deal) => sum + (deal.value * deal.probability / 100), 0);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="min-h-screen bg-[#0B0B0C]">
        {/* Enhanced Header */}
        <div className="border-b bg-[#121214] border-[#232428]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Назад
              </Button>
              <div>
                <h1 className="text-2xl font-heading text-white">
                  Интерактивная воронка продаж
                </h1>
                <p className="text-sm text-[#A6A7AA]">
                  Drag & Drop управление сделками с интеграцией календаря
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Calendar className="h-4 w-4 mr-2" />
                Календарь встреч
              </Button>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                <Plus className="h-4 w-4 mr-2" />
                Новая сделка
              </Button>
            </div>
          </div>
        </div>

        <div className="p-6">
          {/* Enhanced Analytics Dashboard */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A6A7AA]">Общая сумма</p>
                    <p className="text-lg font-heading text-white">{formatCurrency(totalValue)}</p>
                  </div>
                  <DollarSign className="h-6 w-6 text-green-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A6A7AA]">Ожидаемая выручка</p>
                    <p className="text-lg font-heading text-white">{formatCurrency(expectedValue)}</p>
                  </div>
                  <Target className="h-6 w-6 text-blue-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A6A7AA]">Средн. вероятность</p>
                    <p className="text-lg font-heading text-white">{avgProbability.toFixed(1)}%</p>
                  </div>
                  <TrendingUp className="h-6 w-6 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A6A7AA]">Активные сделки</p>
                    <p className="text-lg font-heading text-white">{filteredDeals.length}</p>
                  </div>
                  <Activity className="h-6 w-6 text-purple-400" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-[#A6A7AA]">Срочных сделок</p>
                    <p className="text-lg font-heading text-white">
                      {filteredDeals.filter(d => d.priority === 'urgent').length}
                    </p>
                  </div>
                  <Zap className="h-6 w-6 text-red-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Filters */}
          <Card className="bg-[#121214] border-[#232428] mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                  <Input 
                    placeholder="Поиск по названию, клиенту или контакту..." 
                    className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2">
                  {['all', 'urgent', 'high', 'medium', 'low'].map(priority => (
                    <Button
                      key={priority}
                      size="sm"
                      variant={selectedPriority === priority ? "default" : "outline"}
                      className={selectedPriority === priority ? "bg-[#91040C] text-white" : "border-[#232428] text-white hover:bg-[#17181A]"}
                      onClick={() => setSelectedPriority(priority)}
                    >
                      {priority === 'all' ? 'Все' : priority.toUpperCase()}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced Kanban Board */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {dealStages.map((stage) => (
              <DroppableStageColumn
                key={stage.id}
                stage={stage}
                deals={filteredDeals}
                onDropDeal={handleDropDeal}
                onScheduleMeeting={handleScheduleMeetingClick}
              />
            ))}
          </div>
        </div>

        {/* Meeting Scheduling Dialog */}
        <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
          <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Запланировать встречу</DialogTitle>
              <DialogDescription className="text-[#A6A7AA]">
                Встреча с {selectedDealForMeeting?.contact}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="p-4 bg-[#17181A] rounded-lg">
                <p className="text-sm text-white mb-2">Встреча будет создана в календаре</p>
                <div className="flex items-center gap-2 text-sm text-[#A6A7AA]">
                  <Users className="h-4 w-4" />
                  <span>Участник: {selectedDealForMeeting?.contact}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#A6A7AA] mt-1">
                  <Calendar className="h-4 w-4" />
                  <span>Дата и время будут выбраны в календаре</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowMeetingDialog(false)}
                  className="border-[#232428] text-white hover:bg-[#17181A]"
                >
                  Отмена
                </Button>
                <Button onClick={handleConfirmMeeting} className="bg-[#91040C] hover:bg-[#91040C]/90">
                  <Calendar className="h-4 w-4 mr-2" />
                  Открыть календарь
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DndProvider>
  );
}