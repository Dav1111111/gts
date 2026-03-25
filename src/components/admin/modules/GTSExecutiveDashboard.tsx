import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Separator } from "../../ui/separator";
import { Input } from "../../ui/input";
import { 
  TrendingUp, TrendingDown, Calendar, Users, DollarSign, Activity, 
  Star, AlertTriangle, AlertCircle, CheckCircle, Clock, MoreHorizontal,
  Plus, Search, Filter, Eye, UserPlus, Settings, Target, Bell,
  ArrowUpRight, ArrowDownRight, ExternalLink, Timer, UserCheck,
  Plane, Anchor, Truck, Zap, Fuel, Wrench, Crown, Phone, MapPin
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  permissions: string[];
}

interface GTSExecutiveDashboardProps {
  user: User;
}

// KPI Data Structure
interface KPICard {
  id: string;
  title: string;
  subtitle: string;
  value: string;
  previousValue: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ComponentType<any>;
  color: string;
  bgGradient: string;
  category: 'financial' | 'operational' | 'client' | 'ai';
  description: string;
  chartData?: any[];
}

// Alert Data Structure
interface Alert {
  id: string;
  type: 'error' | 'warning' | 'success' | 'info';
  category: string;
  title: string;
  message: string;
  location: string;
  time: string;
  urgent: boolean;
  assignee: string;
  actionRequired: string;
  entityId?: string;
  entityType?: 'lead' | 'deal' | 'booking' | 'equipment';
}

// Task Data Structure
interface Task {
  id: string;
  title: string;
  dueDate: string;
  dueDateFormatted: string;
  relatedEntity: {
    type: 'Lead' | 'Deal' | 'Booking' | 'Equipment';
    id: string;
    name: string;
  };
  priority: 'high' | 'medium' | 'low';
  status: 'due-today' | 'overdue' | 'completed' | 'pending';
  assignee: string;
  description?: string;
  checklist?: Array<{ id: string; text: string; completed: boolean }>;
  comments?: Array<{ id: string; author: string; text: string; time: string }>;
}

type TimePeriod = 'week' | 'month' | 'quarter' | 'year';
type TaskFilter = 'all' | 'due-today' | 'overdue' | 'completed' | 'pending';

export function GTSExecutiveDashboard({ user }: GTSExecutiveDashboardProps) {
  // Tasks Data - moved to top to avoid initialization error
  const tasksData: Task[] = [
    {
      id: 'task-1',
      title: 'Подтвердить бронирование яхты Azimut 68',
      dueDate: '2024-01-15T14:00:00',
      dueDateFormatted: 'Сегодня, 14:00',
      relatedEntity: {
        type: 'Booking',
        id: 'BK-4521',
        name: 'Михайлов А.В. - Azimut 68'
      },
      priority: 'high',
      status: 'due-today',
      assignee: 'Смирнова К.А.',
      description: 'Клиент ожидает подтверждения бронирования на завтра',
      checklist: [
        { id: 'c1', text: 'Проверить доступность яхты', completed: true },
        { id: 'c2', text: 'Связаться с капитаном', completed: false },
        { id: 'c3', text: 'Подготовить документы', completed: false }
      ]
    },
    {
      id: 'task-2',
      title: 'Обработать лид из Facebook',
      dueDate: '2024-01-15T16:30:00',
      dueDateFormatted: 'Сегодня, 16:30',
      relatedEntity: {
        type: 'Lead',
        id: 'LD-9832',
        name: 'Петрова С.К. - Вертолётная экскурсия'
      },
      priority: 'medium',
      status: 'due-today',
      assignee: 'Иванов П.М.',
      description: 'Первичный контакт с лидом по экскурсии на вертолёте'
    },
    {
      id: 'task-3',
      title: 'Закрыть сделку по аренде McLaren 720S',
      dueDate: '2024-01-14T18:00:00',
      dueDateFormatted: 'Вчера, 18:00',
      relatedEntity: {
        type: 'Deal',
        id: 'DL-6754',
        name: 'Сидоров И.Н. - McLaren 720S'
      },
      priority: 'high',
      status: 'overdue',
      assignee: 'Козлов А.В.',
      description: 'Сделка просрочена на 1 день, клиент не отвечает на звонки'
    },
    {
      id: 'task-4',
      title: 'Провести презентацию для корпоративного клиента',
      dueDate: '2024-01-13T15:00:00',
      dueDateFormatted: '2 дня назад, 15:00',
      relatedEntity: {
        type: 'Deal',
        id: 'DL-8821',
        name: 'ООО "Стройинвест" - Корпоративные услуги'
      },
      priority: 'high',
      status: 'overdue',
      assignee: 'Федорова М.И.',
      description: 'Презентация перенесена уже дважды, нужно срочно назначить встречу'
    },
    {
      id: 'task-5',
      title: 'Подготовить документы для VIP клиента',
      dueDate: '2024-01-14T12:00:00',
      dueDateFormatted: 'Завершено вчера',
      relatedEntity: {
        type: 'Booking',
        id: 'BK-3344',
        name: 'Александров В.П. - VIP пакет'
      },
      priority: 'medium',
      status: 'completed',
      assignee: 'Смирнова К.А.',
      description: 'Все документы подготовлены и переданы клиенту'
    }
  ];

  const [timePeriod, setTimePeriod] = useState<TimePeriod>('month');
  const [taskFilter, setTaskFilter] = useState<TaskFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hiddenSections, setHiddenSections] = useState<string[]>([]);
  const [tasks, setTasks] = useState<Task[]>(tasksData);

  // KPI Cards Data - filtered by role
  const getKPICards = (): KPICard[] => {
    const allCards: KPICard[] = [
      {
        id: 'revenue',
        title: 'Общая выручка',
        subtitle: getTimePeriodLabel(),
        value: timePeriod === 'week' ? '₽3,200,000' : timePeriod === 'month' ? '₽12,450,000' : timePeriod === 'quarter' ? '₽36,800,000' : '₽148,200,000',
        previousValue: timePeriod === 'week' ? '₽2,800,000' : timePeriod === 'month' ? '₽10,800,000' : '₽32,100,000',
        change: '+15.2%',
        trend: 'up' as const,
        icon: DollarSign,
        color: '#2BB673',
        bgGradient: 'from-green-500/10 to-green-600/5',
        category: 'financial',
        description: 'Совокупная выручка от всех услуг',
        chartData: [
          { name: 'Пн', value: 450000 },
          { name: 'Вт', value: 520000 },
          { name: 'Ср', value: 480000 },
          { name: 'Чт', value: 620000 },
          { name: 'Пт', value: 780000 },
          { name: 'Сб', value: 920000 },
          { name: 'Вс', value: 850000 }
        ]
      },
      {
        id: 'bookings',
        title: 'Активные бронирования',
        subtitle: 'Подтвержденных заявок',
        value: timePeriod === 'week' ? '342' : timePeriod === 'month' ? '1,247' : '3,654',
        previousValue: timePeriod === 'week' ? '298' : '1,149',
        change: '+8.5%',
        trend: 'up' as const,
        icon: Calendar,
        color: '#3B82F6',
        bgGradient: 'from-blue-500/10 to-blue-600/5',
        category: 'operational',
        description: 'Количество активных бронирований в системе'
      },
      {
        id: 'new-clients',
        title: 'Новые клиенты',
        subtitle: 'За последние 7 дней',
        value: '342',
        previousValue: '353',
        change: '-3.2%',
        trend: 'down' as const,
        icon: UserPlus,
        color: '#F59E0B',
        bgGradient: 'from-orange-500/10 to-orange-600/5',
        category: 'client',
        description: 'Количество новых зарегистрированных клиентов'
      },
      {
        id: 'fleet-utilization',
        title: 'Загрузка флота',
        subtitle: 'Среднее использование',
        value: '87%',
        previousValue: '78%',
        change: '+12.1%',
        trend: 'up' as const,
        icon: Activity,
        color: '#8B5CF6',
        bgGradient: 'from-purple-500/10 to-purple-600/5',
        category: 'operational',
        description: 'Процент использования доступной техники'
      },
      {
        id: 'ai-efficiency',
        title: 'Эффективность AI',
        subtitle: 'Точность рекомендаций',
        value: '93%',
        previousValue: '91%',
        change: '+2.8%',
        trend: 'up' as const,
        icon: Zap,
        color: '#EC4899',
        bgGradient: 'from-pink-500/10 to-pink-600/5',
        category: 'ai',
        description: 'Точность AI-рекомендаций и прогнозов'
      },
      {
        id: 'nps',
        title: 'NPS Score',
        subtitle: 'Удовлетворенность клиентов',
        value: '8.7',
        previousValue: '8.2',
        change: '+6.1%',
        trend: 'up' as const,
        icon: Star,
        color: '#91040C',
        bgGradient: 'from-red-500/10 to-red-600/5',
        category: 'client',
        description: 'Индекс удовлетворенности клиентов'
      }
    ];

    // Filter by role
    if (user.role === 'accountant') {
      return allCards.filter(card => card.category === 'financial');
    }
    if (user.role === 'manager') {
      return allCards.filter(card => ['operational', 'client'].includes(card.category));
    }
    return allCards; // executive gets all
  };

  function getTimePeriodLabel(): string {
    switch (timePeriod) {
      case 'week': return 'За неделю';
      case 'month': return 'За месяц';
      case 'quarter': return 'За квартал';
      case 'year': return 'За год';
      default: return 'За месяц';
    }
  }

  // Real-time Alerts Data
  const alertsData: Alert[] = [
    {
      id: '1',
      type: 'warning',
      category: 'CRM',
      title: '3 удержания истекают через 2 часа',
      message: 'Клиенты Михайлов А.В., Петрова С.К. и Сидоров И.Н. имеют удержания, которые истекают через 2 часа.',
      location: 'CRM → Сделки → Удержания',
      time: '5 мин назад',
      urgent: true,
      assignee: 'Менеджер Смирнова К.А.',
      actionRequired: 'Срочно связаться с клиентами',
      entityType: 'deal'
    },
    {
      id: '2',
      type: 'error',
      category: 'CRM',
      title: '2 сделки застряли в "Квалифицированные" >14 дней',
      message: 'Сделки #4521 и #4389 находятся в статусе "Квалифицированные" более 14 дней без движения.',
      location: 'CRM → Воронка → Квалифицированные',
      time: '1 час назад',
      urgent: true,
      assignee: 'Руководитель отдела продаж',
      actionRequired: 'Проверить причины задержки',
      entityType: 'deal'
    },
    {
      id: '3',
      type: 'error',
      category: 'Техника',
      title: 'Критическая неисправность вертолета',
      message: 'Вертолет R66 требует немедленного техобслуживания. Обнаружена неисправность двигателя.',
      location: 'Ангар А, стоянка 3',
      time: '2 мин назад',
      urgent: true,
      assignee: 'Техник Петров А.В.',
      actionRequired: 'Немедленная остановка эксплуатации',
      entityType: 'equipment'
    },
    {
      id: '4',
      type: 'warning',
      category: 'Топливо',
      title: 'Низкий уровень топлива катера',
      message: 'Катер Yamaha FX252 требует дозаправки перед следующим выходом.',
      location: 'Причал Б, место 7',
      time: '8 мин назад',
      urgent: true,
      assignee: 'Механик Иванов С.М.',
      actionRequired: 'Заправка до 14:00',
      entityType: 'equipment'
    },
    {
      id: '5',
      type: 'success',
      category: 'VIP',
      title: 'VIP бронирование подтверждено',
      message: 'Клиент Александров забронировал эксклюзивный тур на 3 дня с полным сервисом.',
      location: 'Пентхаус отель "Radisson"',
      time: '15 мин назад',
      urgent: false,
      assignee: 'Менеджер Смирнова К.А.',
      actionRequired: 'Подготовка VIP программы',
      entityType: 'booking'
    }
  ];



  // Quick Actions Data
  const quickActions = [
    { id: 'new-booking', title: 'Создать бронь', icon: Calendar, action: () => console.log('New booking') },
    { id: 'new-partner', title: 'Новый партнёр', icon: Users, action: () => console.log('New partner') },
    { id: 'new-task', title: 'Новая задача', icon: Plus, action: () => console.log('New task') },
    { id: 'emergency', title: 'Экстренная связь', icon: Phone, action: () => console.log('Emergency') }
  ];

  // Filter tasks
  const filteredTasks = useMemo(() => {
    let filtered = tasks;
    
    if (taskFilter !== 'all') {
      filtered = filtered.filter(task => task.status === taskFilter);
    }
    
    if (searchQuery) {
      filtered = filtered.filter(task => 
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.relatedEntity.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.assignee.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    return filtered;
  }, [tasks, taskFilter, searchQuery]);

  // Task counts
  const taskCounts = {
    'due-today': tasks.filter(t => t.status === 'due-today').length,
    'overdue': tasks.filter(t => t.status === 'overdue').length,
    'completed': tasks.filter(t => t.status === 'completed').length,
    'pending': tasks.filter(t => t.status === 'pending').length,
    'all': tasks.length
  };

  // Utility functions
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-500 bg-red-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'overdue': return 'border-l-red-500 bg-red-500/5';
      case 'due-today': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'completed': return 'border-l-green-500 bg-green-500/5';
      case 'pending': return 'border-l-blue-500 bg-blue-500/5';
      default: return 'border-l-gray-500';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'error': return AlertCircle;
      case 'warning': return AlertTriangle;
      case 'success': return CheckCircle;
      case 'info': return Bell;
      default: return AlertTriangle;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'error': return 'border-l-red-500 bg-red-500/5';
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'success': return 'border-l-green-500 bg-green-500/5';
      case 'info': return 'border-l-blue-500 bg-blue-500/5';
      default: return 'border-l-gray-500';
    }
  };

  // Task actions
  const markTaskDone = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'completed' as const } : task
    ));
  };

  const snoozeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { 
        ...task, 
        dueDate: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
        dueDateFormatted: 'Через 1 час'
      } : task
    ));
  };

  const reassignTask = (taskId: string, newAssignee: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, assignee: newAssignee } : task
    ));
  };

  const toggleSection = (sectionId: string) => {
    setHiddenSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const isHidden = (sectionId: string) => hiddenSections.includes(sectionId);

  return (
    <div className="space-y-6 p-6">
      {/* Header with Period Selector */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            Панель управления
          </h1>
          <p className="text-[#A6A7AA]">
            {user.role === 'executive' && 'Исполнительное управление • Полный доступ'}
            {user.role === 'manager' && 'Операционное управление • Операционные показатели'}
            {user.role === 'accountant' && 'Финансовое управление • Финансовые показатели'}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Select value={timePeriod} onValueChange={(value) => setTimePeriod(value as TimePeriod)}>
            <SelectTrigger className="w-40 bg-[#17181A] border-[#232428] text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-[#17181A] border-[#232428]">
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="sm" className="border-[#232428] text-white hover:bg-[#17181A]">
            <Settings className="w-4 h-4 mr-2" />
            Настроить
          </Button>
        </div>
      </div>

      {/* Global Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
        <Input
          placeholder="Глобальный поиск..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
        />
      </div>

      {/* KPI Cards */}
      {!isHidden('kpi') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-white">Ключевые показатели</h2>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('kpi')}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getKPICards().map((kpi) => {
              const IconComponent = kpi.icon;
              const TrendIcon = kpi.trend === 'up' ? TrendingUp : TrendingDown;
              
              return (
                <Card 
                  key={kpi.id}
                  className="bg-[#121214] border-[#232428] hover:border-[#91040C] transition-colors cursor-pointer"
                  onClick={() => console.log(`Open details for ${kpi.id}`)}
                >
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-[#A6A7AA]">
                      {kpi.title}
                    </CardTitle>
                    <div className={`p-2 rounded-lg bg-gradient-to-br ${kpi.bgGradient}`}>
                      <IconComponent className="h-4 w-4" style={{ color: kpi.color }} />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-heading text-white">
                        {kpi.value}
                      </div>
                      <div className="flex items-center text-xs">
                        <TrendIcon 
                          className={`h-3 w-3 mr-1 ${kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}`} 
                        />
                        <span className={kpi.trend === 'up' ? 'text-green-500' : 'text-red-500'}>
                          {kpi.change}
                        </span>
                        <span className="text-[#A6A7AA] ml-2">
                          от предыдущего периода
                        </span>
                      </div>
                      <p className="text-xs text-[#A6A7AA]">
                        {kpi.subtitle}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!isHidden('quick-actions') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-white">Быстрые действия</h2>
            <Button variant="ghost" size="sm" onClick={() => toggleSection('quick-actions')}>
              <Eye className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {quickActions.map((action) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  variant="outline"
                  className="h-16 border-[#232428] text-white hover:bg-[#17181A] hover:border-[#91040C] flex flex-col gap-2"
                  onClick={action.action}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs">{action.title}</span>
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Real-time Alerts */}
      {!isHidden('alerts') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-white">Критические уведомления</h2>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {alertsData.filter(a => a.urgent).length} срочных
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => toggleSection('alerts')}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-3">
            {alertsData.slice(0, 5).map((alert) => {
              const IconComponent = getAlertIcon(alert.type);
              
              return (
                <Card 
                  key={alert.id}
                  className={`${getAlertColor(alert.type)} border-l-4 hover:shadow-lg transition-all duration-200`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3 flex-1">
                        <div className={`p-2 rounded-lg ${alert.type === 'error' ? 'bg-red-500/10' : alert.type === 'warning' ? 'bg-yellow-500/10' : alert.type === 'success' ? 'bg-green-500/10' : 'bg-blue-500/10'}`}>
                          <IconComponent className={`h-4 w-4 ${alert.type === 'error' ? 'text-red-500' : alert.type === 'warning' ? 'text-yellow-500' : alert.type === 'success' ? 'text-green-500' : 'text-blue-500'}`} />
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium text-white">{alert.title}</h3>
                            {alert.urgent && (
                              <Badge variant="destructive" className="text-xs">
                                Срочно
                              </Badge>
                            )}
                            <Badge variant="outline" className="text-xs">
                              {alert.category}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-[#A6A7AA] mb-2">
                            {alert.message}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {alert.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {alert.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <UserCheck className="h-3 w-3" />
                              {alert.assignee}
                            </span>
                          </div>
                          
                          <div className="mt-3 flex items-center gap-2">
                            <Button size="sm" variant="default" className="text-xs">
                              Перейти к событию
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs border-[#232428]">
                              Назначить ответственного
                            </Button>
                            <Button size="sm" variant="ghost" className="text-xs">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Выполнено
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Tasks Dashboard */}
      {!isHidden('tasks') && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-heading text-white">Система задач</h2>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="default">
                <Plus className="w-4 h-4 mr-2" />
                Новая задача
              </Button>
              <Button variant="ghost" size="sm" onClick={() => toggleSection('tasks')}>
                <Eye className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Task Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {[
              { key: 'all', label: 'Все задачи', count: taskCounts.all },
              { key: 'due-today', label: 'На сегодня', count: taskCounts['due-today'] },
              { key: 'overdue', label: 'Просроченные', count: taskCounts.overdue },
              { key: 'completed', label: 'Выполненные', count: taskCounts.completed },
              { key: 'pending', label: 'В ожидании', count: taskCounts.pending }
            ].map((filter) => (
              <Button
                key={filter.key}
                variant={taskFilter === filter.key ? "default" : "outline"}
                size="sm"
                onClick={() => setTaskFilter(filter.key as TaskFilter)}
                className="flex items-center gap-2"
              >
                {filter.label}
                <Badge variant="secondary" className="text-xs">
                  {filter.count}
                </Badge>
              </Button>
            ))}
          </div>

          {/* Tasks List */}
          <div className="space-y-3">
            {filteredTasks.map((task) => (
              <Card 
                key={task.id}
                className={`${getStatusColor(task.status)} border-l-4 hover:shadow-lg transition-all duration-200`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium text-white">{task.title}</h3>
                        <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                          {task.priority === 'high' ? 'Высокий' : task.priority === 'medium' ? 'Средний' : 'Низкий'}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.relatedEntity.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-4 text-xs text-[#A6A7AA] mb-2">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {task.dueDateFormatted}
                        </span>
                        <span className="flex items-center gap-1">
                          <UserCheck className="h-3 w-3" />
                          {task.assignee}
                        </span>
                        <span className="flex items-center gap-1">
                          <Target className="h-3 w-3" />
                          {task.relatedEntity.name}
                        </span>
                      </div>
                      
                      {task.description && (
                        <p className="text-sm text-[#A6A7AA] mb-3">
                          {task.description}
                        </p>
                      )}
                      
                      {task.checklist && (
                        <div className="mb-3">
                          <p className="text-xs text-[#A6A7AA] mb-2">Чек-лист:</p>
                          <div className="space-y-1">
                            {task.checklist.map((item) => (
                              <div key={item.id} className="flex items-center gap-2 text-xs">
                                <input 
                                  type="checkbox" 
                                  checked={item.completed}
                                  className="rounded"
                                  readOnly
                                />
                                <span className={item.completed ? 'line-through text-[#A6A7AA]' : 'text-white'}>
                                  {item.text}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {task.status !== 'completed' && (
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="default" className="text-xs">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Выполнено
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs border-[#232428]">
                            <Timer className="h-3 w-3 mr-1" />
                            Отложить
                          </Button>
                          <Button size="sm" variant="ghost" className="text-xs">
                            <UserCheck className="h-3 w-3 mr-1" />
                            Переназначить
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-40 bg-[#17181A] border-[#232428]">
                        <DropdownMenuItem onClick={() => markTaskDone(task.id)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Выполнено
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => snoozeTask(task.id)}>
                          <Timer className="h-4 w-4 mr-2" />
                          Отложить
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => reassignTask(task.id, 'Новый исполнитель')}>
                          <UserCheck className="h-4 w-4 mr-2" />
                          Переназначить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default GTSExecutiveDashboard;