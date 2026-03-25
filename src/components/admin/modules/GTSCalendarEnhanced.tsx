import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";
import { usePushNotifications } from "../../../hooks/usePushNotifications";
import { 
  ArrowLeft, Plus, Search, Calendar, Clock, User, MapPin, Bell,
  Phone, Mail, Video, Users, AlertTriangle, CheckCircle,
  Edit, Trash2, Copy, Share2, ExternalLink, Settings,
  Zap, Target, Activity, TrendingUp, ChevronLeft, ChevronRight,
  Filter, Download, Upload, RefreshCw
} from "lucide-react";

interface GTSCalendarEnhancedProps {
  onBack: () => void;
  initialMeeting?: {
    dealId: string;
    contact: string;
    title?: string;
  } | null;
}

interface CalendarEvent {
  id: string;
  title: string;
  type: 'meeting' | 'call' | 'presentation' | 'demo' | 'negotiation' | 'followup';
  client: string;
  contact: string;
  attendees: string[];
  startTime: string;
  endTime: string;
  date: string;
  location?: string;
  isOnline: boolean;
  meetingLink?: string;
  description: string;
  status: 'scheduled' | 'confirmed' | 'completed' | 'cancelled' | 'rescheduled';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dealId?: string;
  dealValue?: number;
  probability?: number;
  preparationTime: number; // minutes before meeting for prep
  reminderSent: boolean;
  outcome?: string;
  nextSteps?: string;
  createdBy: string;
  lastModified: string;
}

// Enhanced mock data with CRM integration
const mockEvents: CalendarEvent[] = [
  {
    id: "event-001",
    title: "Презентация яхт-пакета TechCorp",
    type: "presentation",
    client: "TechCorp LLC",
    contact: "Александр Петров",
    attendees: ["maria.smirnova@gts.com", "a.petrov@techcorp.ru"],
    startTime: "15:00",
    endTime: "16:30",
    date: "2024-12-14",
    location: "Офис GTS, переговорная Azimut",
    isOnline: false,
    description: "Презентация корпоративного яхт-пакета с демонстрацией флота и условий обслуживания",
    status: "confirmed",
    priority: "high",
    dealId: "deal-001",
    dealValue: 450000,
    probability: 75,
    preparationTime: 30,
    reminderSent: false,
    createdBy: "Maria Smirnova",
    lastModified: "2024-12-01T14:30:00Z"
  },
  {
    id: "event-002",
    title: "Звонок по бюджету - Premium Events",
    type: "call",
    client: "Premium Events",
    contact: "Ольга Козлова",
    attendees: ["dmitri.volkov@gts.com", "o.kozlova@events.ru"],
    startTime: "11:00",
    endTime: "11:45",
    date: "2024-12-12",
    isOnline: true,
    meetingLink: "https://meet.google.com/abc-defg-hij",
    description: "Обсуждение бюджета и финальных условий для серии вертолетных туров",
    status: "scheduled",
    priority: "medium",
    dealId: "deal-002",
    dealValue: 280000,
    probability: 60,
    preparationTime: 15,
    reminderSent: false,
    createdBy: "Dmitri Volkov",
    lastModified: "2024-12-01T09:15:00Z"
  },
  {
    id: "event-003",
    title: "Демо-поездка VIP спорткары",
    type: "demo",
    client: "Luxury Motors",
    contact: "Елена Соколова",
    attendees: ["maria.smirnova@gts.com", "e.sokolova@luxury.ru", "driver.team@gts.com"],
    startTime: "10:00",
    endTime: "14:00",
    date: "2024-12-15",
    location: "Автодром Сочи",
    isOnline: false,
    description: "Демонстрационная поездка на спорткарах с профессиональным инструктором",
    status: "confirmed",
    priority: "urgent",
    dealId: "deal-004",
    dealValue: 520000,
    probability: 95,
    preparationTime: 60,
    reminderSent: true,
    outcome: "Клиент в восторге от демо, готов финализировать детали",
    nextSteps: "Подготовить итоговый договор и план маршрута",
    createdBy: "Maria Smirnova",
    lastModified: "2024-12-01T16:45:00Z"
  },
  {
    id: "event-004",
    title: "Переговоры с Adventure Club",
    type: "negotiation",
    client: "Adventure Club",
    contact: "Виктор Кузнецов",
    attendees: ["alex.petrov@gts.com", "v.kuznetsov@adventure.ru"],
    startTime: "14:00",
    endTime: "15:30",
    date: "2024-12-13",
    isOnline: true,
    meetingLink: "https://zoom.us/j/123456789",
    description: "Обсуждение условий группового багги-тура для клуба активного отдыха",
    status: "scheduled",
    priority: "low",
    dealId: "deal-003",
    dealValue: 125000,
    probability: 40,
    preparationTime: 20,
    reminderSent: false,
    createdBy: "Alex Petrov",
    lastModified: "2024-12-01T12:00:00Z"
  }
];

const eventTypeColors = {
  meeting: "bg-blue-500",
  call: "bg-green-500",
  presentation: "bg-purple-500", 
  demo: "bg-orange-500",
  negotiation: "bg-yellow-500",
  followup: "bg-gray-500"
};

const eventTypeLabels = {
  meeting: "Встреча",
  call: "Звонок",
  presentation: "Презентация",
  demo: "Демонстрация",
  negotiation: "Переговоры", 
  followup: "Следование"
};

const priorityColors = {
  low: "text-gray-400 bg-gray-500/10",
  medium: "text-blue-400 bg-blue-500/10",
  high: "text-orange-400 bg-orange-500/10",
  urgent: "text-red-400 bg-red-500/10"
};

const statusColors = {
  scheduled: "text-blue-400 bg-blue-500/10",
  confirmed: "text-green-400 bg-green-500/10",
  completed: "text-purple-400 bg-purple-500/10",
  cancelled: "text-red-400 bg-red-500/10",
  rescheduled: "text-yellow-400 bg-yellow-500/10"
};

export function GTSCalendarEnhanced({ onBack, initialMeeting }: GTSCalendarEnhancedProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [events, setEvents] = useState<CalendarEvent[]>(mockEvents);
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [filterType, setFilterType] = useState<string>("all");
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Push notifications hook
  const { 
    isSupported, 
    isSubscribed, 
    subscribe, 
    sendNotification,
    requestPermission 
  } = usePushNotifications();

  // Initialize with meeting from CRM if provided
  useEffect(() => {
    if (initialMeeting) {
      setIsCreatingEvent(true);
      setShowEventDialog(true);
      setSelectedEvent({
        id: '',
        title: initialMeeting.title || `Встреча с ${initialMeeting.contact}`,
        type: 'meeting',
        client: initialMeeting.contact,
        contact: initialMeeting.contact,
        attendees: [],
        startTime: '',
        endTime: '',
        date: '',
        isOnline: false,
        description: '',
        status: 'scheduled',
        priority: 'medium',
        dealId: initialMeeting.dealId,
        preparationTime: 15,
        reminderSent: false,
        createdBy: 'Current User',
        lastModified: new Date().toISOString()
      });
    }
  }, [initialMeeting]);

  // Auto-setup push notifications (disabled in preview environments)
  useEffect(() => {
    if (isSupported && !isSubscribed && typeof window !== 'undefined') {
      // Only attempt to setup notifications if not in iframe/preview
      const isPreviewEnvironment = window.location.hostname.includes('figma') || 
                                   window.location.hostname.includes('preview') ||
                                   document.referrer.includes('figma');
      
      if (!isPreviewEnvironment) {
        requestPermission()
          .then((permission) => {
            if (permission === 'granted') {
              return subscribe();
            }
          })
          .catch(error => {
            console.warn('Push notifications setup failed:', error);
          });
      } else {
        console.log('Push notifications disabled in preview environment');
      }
    }
  }, [isSupported, isSubscribed, requestPermission, subscribe]);

  // Reminder system
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      events.forEach(event => {
        if (!event.reminderSent && event.status === 'confirmed') {
          const eventDateTime = new Date(`${event.date}T${event.startTime}`);
          const reminderTime = new Date(eventDateTime.getTime() - event.preparationTime * 60000);
          
          if (now >= reminderTime && now < eventDateTime) {
            sendMeetingReminder(event);
            markReminderSent(event.id);
          }
        }
      });
    };

    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [events]);

  const sendMeetingReminder = useCallback((event: CalendarEvent) => {
    const message = `Через ${event.preparationTime} мин: ${event.title} с ${event.contact}`;
    try {
      sendNotification('Напоминание о встрече', message, 'meeting_reminder');
    } catch (error) {
      console.warn('Failed to send meeting reminder notification:', error);
    }
  }, [sendNotification]);

  const markReminderSent = useCallback((eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...event, reminderSent: true } : event
    ));
  }, []);

  // Calendar navigation
  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  // Filter events
  const filteredEvents = events.filter(event => {
    const matchesSearch = (event.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.client || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
                         (event.contact || '').toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || event.type === filterType;
    const matchesPriority = filterPriority === "all" || event.priority === filterPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  // Get events for selected date
  const getEventsForDate = (date: string) => {
    return filteredEvents.filter(event => event.date === date);
  };

  // Generate calendar days for current month
  const generateCalendarDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Previous month days
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month - 1, lastDay.getDate() - i);
      days.push({
        date: prevDate.toISOString().split('T')[0],
        day: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    // Current month days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateStr = date.toISOString().split('T')[0];
      const isToday = dateStr === new Date().toISOString().split('T')[0];
      
      days.push({
        date: dateStr,
        day,
        isCurrentMonth: true,
        isToday
      });
    }
    
    // Next month days to fill the grid
    const remainingDays = 42 - days.length; // 6 weeks * 7 days
    for (let day = 1; day <= remainingDays; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate.toISOString().split('T')[0],
        day: nextDate.getDate(),
        isCurrentMonth: false,
        isToday: false
      });
    }
    
    return days;
  };

  const calendarDays = generateCalendarDays();

  // Event creation/editing
  const handleSaveEvent = (eventData: Partial<CalendarEvent>) => {
    if (isCreatingEvent) {
      const newEvent: CalendarEvent = {
        id: `event-${Date.now()}`,
        ...eventData as CalendarEvent,
        lastModified: new Date().toISOString()
      };
      setEvents(prev => [...prev, newEvent]);
      
      // Send notification about new event
      try {
        sendNotification(
          'Новая встреча запланирована', 
          `${newEvent.title} - ${newEvent.date} в ${newEvent.startTime}`,
          'meeting_scheduled'
        );
      } catch (error) {
        console.warn('Failed to send meeting scheduled notification:', error);
      }
    } else if (selectedEvent) {
      setEvents(prev => prev.map(event => 
        event.id === selectedEvent.id 
          ? { ...event, ...eventData, lastModified: new Date().toISOString() }
          : event
      ));
    }
    
    setShowEventDialog(false);
    setSelectedEvent(null);
    setIsCreatingEvent(false);
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
    setShowEventDialog(false);
    setSelectedEvent(null);
  };

  // Calculate analytics
  const upcomingEvents = events.filter(e => new Date(`${e.date}T${e.startTime}`) > new Date());
  const todayEvents = events.filter(e => e.date === new Date().toISOString().split('T')[0]);
  const urgentEvents = events.filter(e => e.priority === 'urgent' && e.status !== 'completed');
  const totalDealValue = events.reduce((sum, event) => sum + (event.dealValue || 0), 0);

  return (
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
                Умный календарь встреч
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Интеграция с CRM и push-уведомлениями
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              disabled={!isSupported}
              className={`border-[#232428] text-white hover:bg-[#17181A] ${
                isSubscribed ? 'bg-green-500/10 border-green-500' : ''
              } ${!isSupported ? 'opacity-50 cursor-not-allowed' : ''}`}
              title={!isSupported ? 'Уведомления недоступны в режиме предварительного просмотра' : ''}
            >
              <Bell className="h-4 w-4 mr-2" />
              {!isSupported ? 'Уведомления недоступны' : 
               isSubscribed ? 'Уведомления ВКЛ' : 'Включить уведомления'}
            </Button>
            <Button 
              onClick={() => {
                setIsCreatingEvent(true);
                setSelectedEvent(null);
                setShowEventDialog(true);
              }}
              className="bg-[#91040C] hover:bg-[#91040C]/90"
            >
              <Plus className="h-4 w-4 mr-2" />
              Новая встреча
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Сегодня</p>
                  <p className="text-xl font-heading text-white">{todayEvents.length}</p>
                  <p className="text-xs text-blue-400">встреч</p>
                </div>
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Предстоящие</p>
                  <p className="text-xl font-heading text-white">{upcomingEvents.length}</p>
                  <p className="text-xs text-green-400">события</p>
                </div>
                <Clock className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Срочные</p>
                  <p className="text-xl font-heading text-white">{urgentEvents.length}</p>
                  <p className="text-xs text-red-400">требуют внимания</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Сумма сделок</p>
                  <p className="text-xl font-heading text-white">{formatCurrency(totalDealValue)}</p>
                  <p className="text-xs text-yellow-400">в календаре</p>
                </div>
                <Target className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card className="bg-[#121214] border-[#232428] mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                  <Input 
                    placeholder="Поиск событий..." 
                    className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                    <SelectValue placeholder="Тип" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="all">Все типы</SelectItem>
                    <SelectItem value="meeting">Встречи</SelectItem>
                    <SelectItem value="call">Звонки</SelectItem>
                    <SelectItem value="presentation">Презентации</SelectItem>
                    <SelectItem value="demo">Демо</SelectItem>
                    <SelectItem value="negotiation">Переговоры</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterPriority} onValueChange={setFilterPriority}>
                  <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                    <SelectValue placeholder="Приоритет" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="all">Все</SelectItem>
                    <SelectItem value="urgent">Срочные</SelectItem>
                    <SelectItem value="high">Высокие</SelectItem>
                    <SelectItem value="medium">Средние</SelectItem>
                    <SelectItem value="low">Низкие</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 bg-[#17181A] rounded-lg p-1">
                  {['month', 'week', 'day'].map(mode => (
                    <Button
                      key={mode}
                      size="sm"
                      variant={viewMode === mode ? "default" : "ghost"}
                      className={viewMode === mode ? "bg-[#91040C] text-white" : "text-[#A6A7AA] hover:text-white hover:bg-[#232428]"}
                      onClick={() => setViewMode(mode as 'month' | 'week' | 'day')}
                    >
                      {mode === 'month' ? 'Месяц' : mode === 'week' ? 'Неделя' : 'День'}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Calendar Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigateMonth('prev')}
                      className="text-white hover:bg-[#17181A]"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <CardTitle className="text-white">
                      {currentDate.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                    </CardTitle>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      onClick={() => navigateMonth('next')}
                      className="text-white hover:bg-[#17181A]"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button
                    size="sm"
                    onClick={() => setCurrentDate(new Date())}
                    className="bg-blue-500 hover:bg-blue-600"
                  >
                    Сегодня
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Calendar Header */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'].map(day => (
                    <div key={day} className="text-center text-sm font-medium text-[#A6A7AA] p-2">
                      {day}
                    </div>
                  ))}
                </div>
                
                {/* Calendar Days */}
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    const dayEvents = getEventsForDate(day.date);
                    const isSelected = selectedDate === day.date;
                    
                    return (
                      <div
                        key={index}
                        className={`min-h-[80px] p-2 rounded-lg cursor-pointer transition-all ${
                          day.isCurrentMonth 
                            ? isSelected 
                              ? 'bg-[#91040C]/20 border border-[#91040C]' 
                              : day.isToday
                                ? 'bg-blue-500/20 border border-blue-500'
                                : 'bg-[#17181A] hover:bg-[#1A1B1D]'
                            : 'bg-[#13131A] opacity-50'
                        }`}
                        onClick={() => setSelectedDate(day.date)}
                      >
                        <div className={`text-sm font-medium mb-1 ${
                          day.isCurrentMonth 
                            ? day.isToday 
                              ? 'text-blue-400' 
                              : 'text-white'
                            : 'text-[#A6A7AA]'
                        }`}>
                          {day.day}
                        </div>
                        
                        {/* Event indicators */}
                        <div className="space-y-1">
                          {dayEvents.slice(0, 2).map((event, eventIndex) => (
                            <div
                              key={eventIndex}
                              className={`text-xs px-1 py-0.5 rounded text-white truncate ${
                                eventTypeColors[event.type]
                              }`}
                              title={event.title}
                            >
                              {event.startTime} {event.title}
                            </div>
                          ))}
                          {dayEvents.length > 2 && (
                            <div className="text-xs text-[#A6A7AA]">
                              +{dayEvents.length - 2} еще
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Event Details Sidebar */}
          <div className="space-y-4">
            {selectedDate && (
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-sm">
                    События на {new Date(selectedDate).toLocaleDateString('ru-RU')}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {getEventsForDate(selectedDate).length === 0 ? (
                    <div className="text-center py-4 text-[#A6A7AA]">
                      <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Нет событий</p>
                      <Button
                        size="sm"
                        className="mt-2 bg-[#91040C] hover:bg-[#91040C]/90"
                        onClick={() => {
                          setSelectedEvent({
                            date: selectedDate,
                            startTime: '10:00',
                            endTime: '11:00'
                          } as CalendarEvent);
                          setIsCreatingEvent(true);
                          setShowEventDialog(true);
                        }}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Создать
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {getEventsForDate(selectedDate).map(event => (
                        <Card 
                          key={event.id} 
                          className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D]"
                          onClick={() => {
                            setSelectedEvent(event);
                            setIsCreatingEvent(false);
                            setShowEventDialog(true);
                          }}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-start justify-between mb-2">
                              <Badge className={`text-xs ${eventTypeColors[event.type]} text-white`}>
                                {eventTypeLabels[event.type]}
                              </Badge>
                              <Badge className={`text-xs ${priorityColors[event.priority]}`}>
                                {event.priority.toUpperCase()}
                              </Badge>
                            </div>
                            <h4 className="text-sm text-white font-medium mb-1 line-clamp-2">
                              {event.title}
                            </h4>
                            <div className="space-y-1 text-xs text-[#A6A7AA]">
                              <div className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                <span>{event.startTime} - {event.endTime}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{event.contact}</span>
                              </div>
                              {event.dealValue && (
                                <div className="flex items-center gap-1">
                                  <Target className="h-3 w-3" />
                                  <span>{formatCurrency(event.dealValue)}</span>
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Quick Stats */}
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader className="pb-4">
                <CardTitle className="text-white text-sm">Быстрая статистика</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A6A7AA]">Всего событий:</span>
                  <span className="text-white">{events.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#A6A7AA]">Завершенных:</span>
                  <span className="text-green-400">
                    {events.filter(e => e.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#A6A7AA]">Отмененных:</span>
                  <span className="text-red-400">
                    {events.filter(e => e.status === 'cancelled').length}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#A6A7AA]">Конверсия:</span>
                  <span className="text-blue-400">
                    {((events.filter(e => e.status === 'completed').length / events.length) * 100).toFixed(1)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Dialog */}
      <Dialog open={showEventDialog} onOpenChange={setShowEventDialog}>
        <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {isCreatingEvent ? 'Создать событие' : 'Детали события'}
            </DialogTitle>
            <DialogDescription className="text-[#A6A7AA]">
              {isCreatingEvent ? 'Заполните данные для нового события' : 'Просмотр и редактирование события'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedEvent && (
            <div className="space-y-4">
              {/* Event form would go here - simplified for brevity */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Название</Label>
                  <Input 
                    defaultValue={selectedEvent.title}
                    className="bg-[#17181A] border-[#232428] text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Тип события</Label>
                  <Select defaultValue={selectedEvent.type}>
                    <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-[#17181A] border-[#232428]">
                      <SelectItem value="meeting">Встреча</SelectItem>
                      <SelectItem value="call">Звонок</SelectItem>
                      <SelectItem value="presentation">Презентация</SelectItem>
                      <SelectItem value="demo">Демонстрация</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              {!isCreatingEvent && selectedEvent.outcome && (
                <div className="p-4 bg-[#17181A] rounded-lg">
                  <h4 className="font-medium text-white mb-2">Результат встречи</h4>
                  <p className="text-sm text-[#A6A7AA] mb-2">{selectedEvent.outcome}</p>
                  {selectedEvent.nextSteps && (
                    <>
                      <h4 className="font-medium text-white mb-2">Следующие шаги</h4>
                      <p className="text-sm text-[#A6A7AA]">{selectedEvent.nextSteps}</p>
                    </>
                  )}
                </div>
              )}
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEventDialog(false)}
                  className="border-[#232428] text-white hover:bg-[#17181A]"
                >
                  Отмена
                </Button>
                {!isCreatingEvent && (
                  <Button 
                    variant="outline" 
                    onClick={() => handleDeleteEvent(selectedEvent.id)}
                    className="border-red-500 text-red-400 hover:bg-red-500/10"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Удалить
                  </Button>
                )}
                <Button 
                  onClick={() => handleSaveEvent(selectedEvent)}
                  className="bg-[#91040C] hover:bg-[#91040C]/90"
                >
                  {isCreatingEvent ? 'Создать' : 'Сохранить'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}