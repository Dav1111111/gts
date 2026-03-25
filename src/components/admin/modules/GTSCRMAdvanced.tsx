import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  Users, Plus, Phone, MessageSquare, Mail, Star, Clock, Calendar,
  TrendingUp, TrendingDown, Eye, MoreHorizontal, Filter, Search,
  Bot, Settings, Edit, Trash, ArrowRight, Send, Paperclip,
  Award, CreditCard, MapPin, Target, Zap, Brain, CheckCircle,
  AlertCircle, Timer, DollarSign, Percent, User, Building2,
  Crown, Shield, Gem, Circle, PhoneCall, Video, MessageCircle
} from "lucide-react";

// Types
interface Deal {
  id: string;
  title: string;
  client: Client;
  value: number;
  stage: DealStage;
  source: 'call' | 'website' | 'telegram' | 'whatsapp' | 'referral';
  assignee: string;
  createdAt: string;
  updatedAt: string;
  priority: 'high' | 'medium' | 'low';
  description: string;
  nextAction: string;
  equipment?: string[];
  dates?: string;
  budget?: number;
  notes: Note[];
  tasks: Task[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  clubLevel: 'none' | 'silver' | 'gold' | 'platinum';
  clubExpiry?: string;
  points: number;
  totalBookings: number;
  totalSpent: number;
  avatar?: string;
  isVIP: boolean;
  isCorporate: boolean;
  companyName?: string;
  lastActivity: string;
  tags: string[];
}

interface Note {
  id: string;
  content: string;
  author: string;
  timestamp: string;
  type: 'call' | 'email' | 'meeting' | 'note';
  aiSummary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
}

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  assignee: string;
  status: 'pending' | 'completed' | 'overdue';
  priority: 'high' | 'medium' | 'low';
}

interface Message {
  id: string;
  channel: 'telegram' | 'whatsapp' | 'email' | 'call';
  from: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  clientId: string;
  aiSummary?: string;
  sentiment?: 'positive' | 'neutral' | 'negative';
  attachments?: string[];
}

interface StaffMember {
  id: string;
  name: string;
  avatar?: string;
  role: string;
  responseTime: number; // in minutes
  dealsCount: number;
  npsScore: number;
  rating: number;
  isOnline: boolean;
}

type DealStage = 'new' | 'prequalified' | 'proposal' | 'negotiation' | 'payment' | 'service' | 'postsale' | 'vip-brief' | 'vip-tender' | 'vip-approval';

const dealStages = [
  { id: 'new', name: 'Новое обращение', color: 'bg-blue-500' },
  { id: 'prequalified', name: 'Пре-квалификация', color: 'bg-purple-500' },
  { id: 'proposal', name: 'Предложение', color: 'bg-orange-500' },
  { id: 'negotiation', name: 'Переговоры', color: 'bg-yellow-500' },
  { id: 'payment', name: 'Оплата', color: 'bg-green-500' },
  { id: 'service', name: 'Исполнение', color: 'bg-teal-500' },
  { id: 'postsale', name: 'Пост-продажа', color: 'bg-indigo-500' }
];

const vipStages = [
  { id: 'vip-brief', name: 'Бриф', color: 'bg-pink-500' },
  { id: 'vip-tender', name: 'Тендер', color: 'bg-rose-500' },
  { id: 'vip-approval', name: 'Согласование', color: 'bg-red-500' }
];

export function GTSCRMAdvanced() {
  const [activeTab, setActiveTab] = useState('pipeline');
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stageFilter, setStageFilter] = useState<string>('all');
  const [isVIPMode, setIsVIPMode] = useState(false);
  const [newMessage, setNewMessage] = useState('');

  // Mock data
  const mockDeals: Deal[] = [
    {
      id: 'deal-1',
      title: 'Вертолётная экскурсия на 3 дня',
      client: {
        id: 'client-1',
        name: 'Михайлов Александр',
        email: 'alex@example.com',
        phone: '+7 (903) 123-45-67',
        clubLevel: 'gold',
        clubExpiry: '2024-12-31',
        points: 2500,
        totalBookings: 8,
        totalSpent: 650000,
        isVIP: true,
        isCorporate: false,
        lastActivity: '5 мин назад',
        tags: ['Постоянный клиент', 'Любит авиацию']
      },
      value: 450000,
      stage: 'negotiation',
      source: 'telegram',
      assignee: 'Смирнова К.А.',
      createdAt: '2024-01-15T10:30:00',
      updatedAt: '2024-01-15T14:20:00',
      priority: 'high',
      description: 'Клиент заинтересован в 3-дневном туре с вертолётными экскурсиями',
      nextAction: 'Подготовить финальное предложение',
      equipment: ['Bell 407', 'R66 Turbine'],
      dates: '20-22 февраля',
      budget: 500000,
      notes: [
        {
          id: 'note-1',
          content: 'Клиент подтвердил интерес к маршруту по Кавказу. Обсудили варианты размещения.',
          author: 'Смирнова К.А.',
          timestamp: '2024-01-15T14:20:00',
          type: 'call',
          aiSummary: 'Положительный интерес к маршруту, обсуждение деталей размещения',
          sentiment: 'positive'
        }
      ],
      tasks: [
        {
          id: 'task-1',
          title: 'Подготовить детальный маршрут',
          description: 'Составить подробную программу на 3 дня',
          dueDate: '2024-01-16T18:00:00',
          assignee: 'Смирнова К.А.',
          status: 'pending',
          priority: 'high'
        }
      ]
    },
    {
      id: 'deal-2',
      title: 'Корпоративное мероприятие',
      client: {
        id: 'client-2',
        name: 'ООО "ТехноСтрой"',
        email: 'events@technostroy.ru',
        phone: '+7 (495) 777-88-99',
        clubLevel: 'platinum',
        points: 15000,
        totalBookings: 25,
        totalSpent: 2800000,
        isVIP: true,
        isCorporate: true,
        companyName: 'ООО "ТехноСтрой"',
        lastActivity: '2 часа назад',
        tags: ['Корпоративный клиент', 'Крупные мероприятия']
      },
      value: 1200000,
      stage: 'vip-tender',
      source: 'call',
      assignee: 'Петров И.С.',
      createdAt: '2024-01-14T09:00:00',
      updatedAt: '2024-01-15T11:30:00',
      priority: 'high',
      description: 'Организация корпоративного мероприятия для 50 сотрудников',
      nextAction: 'Презентация тендера руководству',
      equipment: ['Azimut 68', 'Princess 62', 'McLaren 720S'],
      dates: '15-16 марта',
      budget: 1500000,
      notes: [],
      tasks: []
    }
  ];

  const mockMessages: Message[] = [
    {
      id: 'msg-1',
      channel: 'telegram',
      from: 'Михайлов Александр',
      content: 'Добрый день! Интересует вертолётная экскурсия на выходные. Можете предложить варианты?',
      timestamp: '2024-01-15T14:30:00',
      isRead: false,
      clientId: 'client-1',
      aiSummary: 'Запрос на вертолётную экскурсию на выходные',
      sentiment: 'positive'
    },
    {
      id: 'msg-2',
      channel: 'whatsapp',
      from: 'Анна Петрова',
      content: 'Здравствуйте! Хотела бы забронировать яхту на день рождения. 15 человек.',
      timestamp: '2024-01-15T13:45:00',
      isRead: true,
      clientId: 'client-3',
      aiSummary: 'Запрос на аренду яхты для празднования дня рождения',
      sentiment: 'positive'
    }
  ];

  const mockStaff: StaffMember[] = [
    {
      id: 'staff-1',
      name: 'Смирнова К.А.',
      role: 'Старший менеджер',
      responseTime: 15,
      dealsCount: 28,
      npsScore: 9.2,
      rating: 4.8,
      isOnline: true
    },
    {
      id: 'staff-2',
      name: 'Петров И.С.',
      role: 'VIP менеджер',
      responseTime: 8,
      dealsCount: 15,
      npsScore: 9.5,
      rating: 4.9,
      isOnline: true
    }
  ];

  // Filter deals
  const filteredDeals = useMemo(() => {
    let filtered = mockDeals;
    
    if (searchQuery) {
      filtered = filtered.filter(deal => 
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.client.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    if (stageFilter !== 'all') {
      filtered = filtered.filter(deal => deal.stage === stageFilter);
    }
    
    return filtered;
  }, [searchQuery, stageFilter]);

  // Get club level display
  const getClubLevelDisplay = (level: Client['clubLevel']) => {
    const levels = {
      none: { name: 'Нет', icon: Circle, color: 'text-gray-400' },
      silver: { name: 'Silver', icon: Shield, color: 'text-gray-500' },
      gold: { name: 'Gold', icon: Award, color: 'text-yellow-500' },
      platinum: { name: 'Platinum', icon: Crown, color: 'text-purple-500' }
    };
    return levels[level];
  };

  // Get source icon
  const getSourceIcon = (source: Deal['source']) => {
    const icons = {
      call: Phone,
      website: Eye,
      telegram: MessageSquare,
      whatsapp: MessageCircle,
      referral: Users
    };
    return icons[source];
  };

  // Render Kanban board
  const renderKanbanBoard = () => {
    const stages = isVIPMode ? vipStages : dealStages;
    
    return (
      <div className="flex gap-6 overflow-x-auto pb-4">
        {stages.map(stage => {
          const stageDeals = filteredDeals.filter(deal => deal.stage === stage.id);
          
          return (
            <div key={stage.id} className="min-w-[320px] flex-shrink-0">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                  <h3 className="font-medium text-white">{stage.name}</h3>
                  <Badge variant="secondary" className="ml-auto">
                    {stageDeals.length}
                  </Badge>
                </div>
              </div>
              
              <div className="space-y-3">
                {stageDeals.map(deal => (
                  <Card 
                    key={deal.id}
                    className="bg-[#17181A] border-[#232428] hover:border-[#91040C] transition-colors cursor-pointer"
                    onClick={() => setSelectedDeal(deal)}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-medium text-white text-sm mb-1">{deal.title}</h4>
                          <p className="text-xs text-[#A6A7AA]">{deal.client.name}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {deal.priority === 'high' && (
                            <AlertCircle className="w-4 h-4 text-red-500" />
                          )}
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-[#17181A] border-[#232428]">
                              <DropdownMenuItem>
                                <Edit className="h-4 w-4 mr-2" />
                                Редактировать
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <ArrowRight className="h-4 w-4 mr-2" />
                                Переместить
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-400">
                                <Trash className="h-4 w-4 mr-2" />
                                Удалить
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          {(() => {
                            const SourceIcon = getSourceIcon(deal.source);
                            return <SourceIcon className="w-3 h-3 text-[#A6A7AA]" />;
                          })()}
                          <span className="text-xs text-[#A6A7AA]">{deal.assignee}</span>
                        </div>
                        <span className="text-sm font-medium text-green-400">
                          ₽{deal.value.toLocaleString()}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        {(() => {
                          const clubLevel = getClubLevelDisplay(deal.client.clubLevel);
                          const LevelIcon = clubLevel.icon;
                          return (
                            <>
                              <LevelIcon className={`w-3 h-3 ${clubLevel.color}`} />
                              <span className="text-xs text-[#A6A7AA]">{clubLevel.name}</span>
                            </>
                          );
                        })()}
                        {deal.client.isVIP && (
                          <Badge className="text-xs bg-[#91040C]/20 text-[#91040C]">VIP</Badge>
                        )}
                        {deal.client.isCorporate && (
                          <Badge className="text-xs bg-blue-500/20 text-blue-400">B2B</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
                
                <Button
                  variant="outline"
                  className="w-full border-dashed border-[#232428] text-[#A6A7AA] hover:border-[#91040C] hover:text-white"
                  onClick={() => {/* Add new deal logic */}}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить сделку
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  // Render Omni Inbox
  const renderOmniInbox = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Omni Inbox</h3>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" className="border-[#232428]">
            <Bot className="w-4 h-4 mr-2" />
            Настроить ботов
          </Button>
          <Button size="sm" variant="outline" className="border-[#232428]">
            <Settings className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5 bg-[#17181A]">
          <TabsTrigger value="all">Все</TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Telegram
          </TabsTrigger>
          <TabsTrigger value="whatsapp" className="flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="email" className="flex items-center gap-2">
            <Mail className="w-4 h-4" />
            Email
          </TabsTrigger>
          <TabsTrigger value="calls" className="flex items-center gap-2">
            <Phone className="w-4 h-4" />
            Звонки
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="space-y-3 mt-4">
          {mockMessages.map(message => (
            <Card key={message.id} className={`bg-[#17181A] border-[#232428] ${!message.isRead ? 'border-l-4 border-l-[#91040C]' : ''}`}>
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="bg-[#232428] text-white text-xs">
                      {message.from.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-white text-sm">{message.from}</span>
                      {(() => {
                        const ChannelIcon = {
                          telegram: MessageSquare,
                          whatsapp: MessageCircle,
                          email: Mail,
                          call: Phone
                        }[message.channel];
                        return <ChannelIcon className="w-3 h-3 text-[#A6A7AA]" />;
                      })()}
                      <span className="text-xs text-[#A6A7AA]">
                        {new Date(message.timestamp).toLocaleTimeString('ru-RU', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                    
                    <p className="text-sm text-[#A6A7AA] mb-2">{message.content}</p>
                    
                    {message.aiSummary && (
                      <div className="bg-[#232428] rounded-lg p-2 mb-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Brain className="w-3 h-3 text-blue-400" />
                          <span className="text-xs text-blue-400">AI Summary</span>
                        </div>
                        <p className="text-xs text-[#A6A7AA]">{message.aiSummary}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs border-[#232428]">
                        <Send className="w-3 h-3 mr-1" />
                        Ответить
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs">
                        <User className="w-3 h-3 mr-1" />
                        В CRM
                      </Button>
                      {message.sentiment && (
                        <Badge className={`text-xs ${
                          message.sentiment === 'positive' ? 'bg-green-500/20 text-green-400' :
                          message.sentiment === 'negative' ? 'bg-red-500/20 text-red-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {message.sentiment === 'positive' ? '😊' : message.sentiment === 'negative' ? '😞' : '😐'}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );

  // Render deal details
  const renderDealDetails = () => {
    if (!selectedDeal) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-xl font-heading text-white mb-2">{selectedDeal.title}</h2>
            <div className="flex items-center gap-4 text-sm text-[#A6A7AA]">
              <span>Создано: {new Date(selectedDeal.createdAt).toLocaleDateString('ru-RU')}</span>
              <span>Обновлено: {new Date(selectedDeal.updatedAt).toLocaleDateString('ru-RU')}</span>
              <Badge className={`${dealStages.find(s => s.id === selectedDeal.stage)?.color} text-white`}>
                {dealStages.find(s => s.id === selectedDeal.stage)?.name}
              </Badge>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-heading text-green-400 mb-1">
              ₽{selectedDeal.value.toLocaleString()}
            </div>
            <div className="text-sm text-[#A6A7AA]">
              Бюджет: ₽{selectedDeal.budget?.toLocaleString()}
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="client">Клиент</TabsTrigger>
            <TabsTrigger value="tasks">Задачи</TabsTrigger>
            <TabsTrigger value="history">История</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Детали сделки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Описание</label>
                  <p className="text-white">{selectedDeal.description}</p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Техника</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedDeal.equipment?.map(item => (
                        <Badge key={item} variant="outline" className="border-[#232428]">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Даты</label>
                    <p className="text-white">{selectedDeal.dates}</p>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Следующее действие</label>
                  <p className="text-white">{selectedDeal.nextAction}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="client" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Информация о клиенте</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarFallback className="bg-[#232428] text-white">
                      {selectedDeal.client.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-white mb-1">
                      {selectedDeal.client.name}
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      {(() => {
                        const clubLevel = getClubLevelDisplay(selectedDeal.client.clubLevel);
                        const LevelIcon = clubLevel.icon;
                        return (
                          <>
                            <LevelIcon className={`w-4 h-4 ${clubLevel.color}`} />
                            <span className="text-sm text-[#A6A7AA]">{clubLevel.name}</span>
                          </>
                        );
                      })()}
                      {selectedDeal.client.isVIP && (
                        <Badge className="bg-[#91040C]/20 text-[#91040C]">VIP</Badge>
                      )}
                      {selectedDeal.client.isCorporate && (
                        <Badge className="bg-blue-500/20 text-blue-400">Корпоративный</Badge>
                      )}
                    </div>
                    <div className="space-y-1 text-sm text-[#A6A7AA]">
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {selectedDeal.client.email}
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        {selectedDeal.client.phone}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center p-3 bg-[#232428] rounded-lg">
                    <div className="text-xl font-heading text-white mb-1">
                      {selectedDeal.client.points.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#A6A7AA]">Баллы</div>
                  </div>
                  <div className="text-center p-3 bg-[#232428] rounded-lg">
                    <div className="text-xl font-heading text-white mb-1">
                      {selectedDeal.client.totalBookings}
                    </div>
                    <div className="text-xs text-[#A6A7AA]">Бронирований</div>
                  </div>
                  <div className="text-center p-3 bg-[#232428] rounded-lg">
                    <div className="text-xl font-heading text-green-400 mb-1">
                      ₽{selectedDeal.client.totalSpent.toLocaleString()}
                    </div>
                    <div className="text-xs text-[#A6A7AA]">Потрачено</div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">Теги</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedDeal.client.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="border-[#232428]">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-[#0B0B0C] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            CRM & Omni Inbox
          </h1>
          <p className="text-[#A6A7AA]">
            Управление клиентами и всеми каналами коммуникации
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Button
              variant={!isVIPMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVIPMode(false)}
              className={!isVIPMode ? "bg-[#91040C]" : "border-[#232428]"}
            >
              Стандартная воронка
            </Button>
            <Button
              variant={isVIPMode ? "default" : "outline"}
              size="sm"
              onClick={() => setIsVIPMode(true)}
              className={isVIPMode ? "bg-[#91040C]" : "border-[#232428]"}
            >
              <Crown className="w-4 h-4 mr-2" />
              VIP / B2B
            </Button>
          </div>
          
          <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/80">
            <Plus className="w-4 h-4 mr-2" />
            Новая сделка
          </Button>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
          <Input
            placeholder="Поиск сделок и клиентов..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
          />
        </div>
        
        <Select value={stageFilter} onValueChange={setStageFilter}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все этапы</SelectItem>
            {(isVIPMode ? vipStages : dealStages).map(stage => (
              <SelectItem key={stage.id} value={stage.id}>
                {stage.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Main content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
          <TabsTrigger value="pipeline">Воронка продаж</TabsTrigger>
          <TabsTrigger value="inbox">Omni Inbox</TabsTrigger>
          <TabsTrigger value="analytics">Аналитика</TabsTrigger>
          <TabsTrigger value="staff">Сотрудники</TabsTrigger>
        </TabsList>

        <TabsContent value="pipeline" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              {renderKanbanBoard()}
            </div>
            <div>
              {selectedDeal ? renderDealDetails() : (
                <Card className="bg-[#17181A] border-[#232428] h-full flex items-center justify-center">
                  <CardContent className="text-center">
                    <Target className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Выберите сделку
                    </h3>
                    <p className="text-[#A6A7AA]">
                      Нажмите на карточку сделки для просмотра деталей
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="inbox" className="mt-6">
          {renderOmniInbox()}
        </TabsContent>

        <TabsContent value="analytics" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Конверсия воронки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Новые обращения</span>
                    <span className="text-white">145</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Квалифицированные</span>
                    <span className="text-white">89 (61%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#A6A7AA]">Закрытые сделки</span>
                    <span className="text-green-400">32 (22%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Источники лидов</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-blue-400" />
                      <span className="text-[#A6A7AA]">Telegram</span>
                    </div>
                    <span className="text-white">42%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-green-400" />
                      <span className="text-[#A6A7AA]">Звонки</span>
                    </div>
                    <span className="text-white">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-purple-400" />
                      <span className="text-[#A6A7AA]">Сайт</span>
                    </div>
                    <span className="text-white">30%</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Средний чек</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-3xl font-heading text-green-400 mb-2">
                    ₽428,000
                  </div>
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">+18.5%</span>
                    <span className="text-[#A6A7AA]">за месяц</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="staff" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockStaff.map(staff => (
              <Card key={staff.id} className="bg-[#17181A] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <Avatar className="w-12 h-12">
                        <AvatarFallback className="bg-[#232428] text-white">
                          {staff.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {staff.isOnline && (
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#17181A]" />
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-white mb-1">{staff.name}</h3>
                      <p className="text-sm text-[#A6A7AA] mb-3">{staff.role}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A6A7AA]">Время ответа</span>
                          <span className="text-white">{staff.responseTime} мин</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A6A7AA]">Сделок в месяц</span>
                          <span className="text-white">{staff.dealsCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A6A7AA]">NPS</span>
                          <span className="text-green-400">{staff.npsScore}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-[#A6A7AA]">Рейтинг</span>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 text-yellow-400 fill-current" />
                            <span className="text-white">{staff.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}