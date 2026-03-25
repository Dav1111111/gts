import { useState, useEffect } from "react";
import { Card } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

import { Separator } from "../../ui/separator";
import { ScrollArea } from "../../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { 
  MessageSquare, 
  Phone, 
  Mail, 
  Send, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal,
  Bot,
  User,
  Clock,
  Smile,
  Frown,
  Meh,
  AlertCircle,
  CheckCircle2,
  Calendar,
  DollarSign,
  FileText,
  Star,
  TrendingUp,
  Users,
  Zap,
  ArrowLeft,
  Settings,
  Paperclip,
  Mic,
  Image,
  UserPlus,
  Target,
  BookOpen,
  Brain,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Edit3,
  Trash2,
  Flag
} from "lucide-react";

interface GTSOmniInboxModuleProps {
  onBack: () => void;
}

interface Conversation {
  id: string;
  channel: {
    type: 'whatsapp' | 'telegram' | 'instagram' | 'website' | 'phone' | 'email';
    icon: string;
    color: string;
  };
  client: {
    id: string;
    name: string;
    avatar?: string;
    tier: 'VIP' | 'Premium' | 'Standard';
    totalBookings: number;
    lastBooking?: string;
    phone?: string;
    email?: string;
  };
  status: 'bot' | 'agent' | 'pending';
  assignedAgent?: string;
  slaTimer: {
    remaining: number;
    status: 'normal' | 'warning' | 'critical';
  };
  sentiment: 'positive' | 'neutral' | 'negative';
  lastMessage: {
    text: string;
    timestamp: string;
    sender: 'client' | 'agent' | 'bot';
  };
  unreadCount: number;
  priority: 'high' | 'medium' | 'low';
  tags: string[];
}

interface Message {
  id: string;
  conversationId: string;
  sender: 'client' | 'agent' | 'bot';
  senderName: string;
  text: string;
  timestamp: string;
  type: 'text' | 'image' | 'file' | 'voice' | 'system';
  attachments?: Array<{
    type: string;
    url: string;
    name: string;
    size: string;
  }>;
  reactions?: Array<{
    emoji: string;
    userId: string;
  }>;
  isRead: boolean;
}

interface AIInsight {
  summary: string;
  intents: Array<{
    intent: string;
    confidence: number;
    description: string;
  }>;
  nextActions: Array<{
    action: string;
    priority: 'high' | 'medium' | 'low';
    description: string;
    eta?: string;
  }>;
  sentiment: {
    score: number;
    trend: 'improving' | 'stable' | 'declining';
    factors: string[];
  };
}

// Mock data
const mockConversations: Conversation[] = [
  {
    id: '1',
    channel: { type: 'whatsapp', icon: '📱', color: '#25D366' },
    client: {
      id: 'c1',
      name: 'Александр Петров',
      avatar: '',
      tier: 'VIP',
      totalBookings: 15,
      lastBooking: '2024-01-10',
      phone: '+7 (900) 123-45-67',
      email: 'alexandr.petrov@email.com'
    },
    status: 'agent',
    assignedAgent: 'Анна Смирнова',
    slaTimer: { remaining: 1800, status: 'normal' },
    sentiment: 'positive',
    lastMessage: {
      text: 'Отличный сервис! Хочу забронировать вертолетную экскурсию на следующие выходные',
      timestamp: '2024-01-15T14:30:00Z',
      sender: 'client'
    },
    unreadCount: 2,
    priority: 'high',
    tags: ['VIP', 'Helicopter', 'Weekend']
  },
  {
    id: '2',
    channel: { type: 'telegram', icon: '✈️', color: '#0088CC' },
    client: {
      id: 'c2',
      name: 'Мария Козлова',
      avatar: '',
      tier: 'Premium',
      totalBookings: 8,
      lastBooking: '2023-12-22',
      phone: '+7 (905) 876-54-32',
      email: 'maria.kozlova@email.com'
    },
    status: 'bot',
    slaTimer: { remaining: 600, status: 'warning' },
    sentiment: 'neutral',
    lastMessage: {
      text: 'Есть ли скидки для постоянных клиентов?',
      timestamp: '2024-01-15T14:25:00Z',
      sender: 'client'
    },
    unreadCount: 1,
    priority: 'medium',
    tags: ['Premium', 'Discount', 'Loyalty']
  },
  {
    id: '3',
    channel: { type: 'website', icon: '🌐', color: '#6B7280' },
    client: {
      id: 'c3',
      name: 'Дмитрий Иванов',
      avatar: '',
      tier: 'Standard',
      totalBookings: 2,
      lastBooking: '2023-08-15',
      phone: '+7 (912) 345-67-89',
      email: 'dmitry.ivanov@email.com'
    },
    status: 'pending',
    slaTimer: { remaining: 120, status: 'critical' },
    sentiment: 'negative',
    lastMessage: {
      text: 'Очень недоволен отменой бронирования! Требую возврат средств',
      timestamp: '2024-01-15T14:20:00Z',
      sender: 'client'
    },
    unreadCount: 3,
    priority: 'high',
    tags: ['Complaint', 'Refund', 'Cancellation']
  }
];

const mockMessages: Message[] = [
  {
    id: 'm1',
    conversationId: '1',
    sender: 'client',
    senderName: 'Александр Петров',
    text: 'Добрый день! Интересует вертолетная экскурсия',
    timestamp: '2024-01-15T13:00:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'm2',
    conversationId: '1',
    sender: 'agent',
    senderName: 'Анна Смирнова',
    text: 'Здравствуйте! Конечно, с радостью помогу с бронированием. Какую дату вы рассматриваете?',
    timestamp: '2024-01-15T13:05:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'm3',
    conversationId: '1',
    sender: 'client',
    senderName: 'Александр Петров',
    text: 'Следующие выходные подойдут. 20-21 января',
    timestamp: '2024-01-15T13:10:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'm4',
    conversationId: '1',
    sender: 'agent',
    senderName: 'Анна Смирнова',
    text: 'Отлично! У нас есть свободное время в субботу в 14:00 и в воскресенье в 11:00. Длительность полета 45 минут. Стоимость 45,000 рублей.',
    timestamp: '2024-01-15T13:15:00Z',
    type: 'text',
    isRead: true
  },
  {
    id: 'm5',
    conversationId: '1',
    sender: 'client',
    senderName: 'Александр Петров',
    text: 'Отличный сервис! Хочу забронировать вертолетную экскурсию на следующие выходные',
    timestamp: '2024-01-15T14:30:00Z',
    type: 'text',
    isRead: false
  }
];

const mockAIInsights: Record<string, AIInsight> = {
  '1': {
    summary: 'VIP клиент заинтересован в вертолетной экскурсии на выходные. Показывает высокий уровень удовлетворенности сервисом. Готов к бронированию.',
    intents: [
      { intent: 'Booking Request', confidence: 0.95, description: 'Клиент хочет забронировать вертолетную экскурсию' },
      { intent: 'Weekend Preference', confidence: 0.87, description: 'Предпочитает бронирование на выходные' },
      { intent: 'Service Satisfaction', confidence: 0.92, description: 'Выражает удовлетворение качеством сервиса' }
    ],
    nextActions: [
      { action: 'Create Helicopter Booking', priority: 'high', description: 'Создать бронирование вертолета на выходные', eta: '15 минут' },
      { action: 'Send Payment Link', priority: 'high', description: 'Отправить ссылку на оплату', eta: '5 минут' },
      { action: 'Follow-up Message', priority: 'medium', description: 'Отправить подтверждение и детали', eta: '30 минут' }
    ],
    sentiment: {
      score: 0.8,
      trend: 'improving',
      factors: ['Положительные отзывы о сервисе', 'Готовность к повторному бронированию', 'VIP статус клиента']
    }
  }
};

const quickReplies = [
  'Спасибо за обращение! Сейчас подберу лучшие варианты.',
  'Проверю наличие свободных слотов и свяжусь с вами.',
  'Отправлю детальное предложение в течение 15 минут.',
  'Оформлю бронирование. Потребуется предоплата 30%.',
  'К сожалению, на эту дату нет свободных мест. Предложу альтернативы.'
];

export function GTSOmniInboxModule({ onBack }: GTSOmniInboxModuleProps) {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [showAIInsights, setShowAIInsights] = useState(true);
  const [appState, setAppState] = useState<'loading' | 'ready' | 'empty' | 'no-channels' | 'error'>('loading');
  const [connectedChannels, setConnectedChannels] = useState<string[]>([]);

  // Simulate initialization
  useEffect(() => {
    const initializeInbox = async () => {
      setIsLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate different states based on mock conditions
      const mockChannelsConnected = ['whatsapp', 'telegram']; // Simulate connected channels
      setConnectedChannels(mockChannelsConnected);
      
      if (mockChannelsConnected.length === 0) {
        setAppState('no-channels');
      } else if (mockConversations.length === 0) {
        setAppState('empty');
      } else {
        setAppState('ready');
        setConversations(mockConversations);
      }
      
      setIsLoading(false);
    };

    initializeInbox();
  }, []);

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatSLATimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const getSentimentIcon = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return <Smile className="w-4 h-4 text-green-500" />;
      case 'negative': return <Frown className="w-4 h-4 text-red-500" />;
      default: return <Meh className="w-4 h-4 text-yellow-500" />;
    }
  };

  const getChannelIcon = (type: string) => {
    const icons = {
      whatsapp: '📱',
      telegram: '✈️',
      instagram: '📷',
      website: '🌐',
      phone: '📞',
      email: '📧'
    };
    return icons[type as keyof typeof icons] || '💬';
  };

  const selectedConv = conversations.find(c => c.id === selectedConversation);
  const conversationMessages = messages.filter(m => m.conversationId === selectedConversation);
  const aiInsight = selectedConversation ? mockAIInsights[selectedConversation] : null;

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    const message: Message = {
      id: `m${Date.now()}`,
      conversationId: selectedConversation,
      sender: 'agent',
      senderName: 'Вы',
      text: newMessage,
      timestamp: new Date().toISOString(),
      type: 'text',
      isRead: true
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };

  const filteredConversations = conversations.filter(conv => 
    conv.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.lastMessage.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Loading State
  if (isLoading) {
    return (
      <div className="flex h-screen bg-background dark">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
            <div>
              <h3 className="font-medium text-lg">Загрузка Omni-Inbox</h3>
              <p className="text-muted-foreground">Подключение к каналам связи...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // No Channels Connected State
  if (appState === 'no-channels') {
    return (
      <div className="flex h-screen bg-background dark">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto">
              <MessageSquare className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-xl mb-2">Каналы не подключены</h3>
              <p className="text-muted-foreground mb-4">
                Для начала работы с Omni-Inbox необходимо подключить хотя бы один канал связи
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Настроить каналы
              </Button>
              <Button variant="outline" className="w-full" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к Dashboard
              </Button>
              {/* Demo buttons for testing states */}
              <div className="pt-4 border-t border-border">
                <p className="text-xs text-muted-foreground mb-2">Demo режим:</p>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="secondary" onClick={() => { setAppState('ready'); setConversations(mockConversations); }}>
                    Ready
                  </Button>
                  <Button size="sm" variant="secondary" onClick={() => setAppState('empty')}>
                    Empty
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Empty State (channels connected but no conversations)
  if (appState === 'empty') {
    return (
      <div className="flex h-screen bg-background dark">
        <div className="w-96 border-r border-border flex flex-col bg-card">
          {/* Header */}
          <div className="p-4 border-b border-border bg-card">
            <div className="flex items-center gap-3 mb-4">
              <Button variant="ghost" size="sm" onClick={onBack}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <div>
                <h1 className="gts-heading-2">Omni-Inbox</h1>
                <p className="text-xs text-muted-foreground">Управление коммуникациями</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge variant="secondary" className="text-xs">
                Каналов: {connectedChannels.length}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Разговоров: 0
              </Badge>
            </div>
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="text-center">
              <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-medium mb-2">Нет активных разговоров</h3>
              <p className="text-sm text-muted-foreground">
                Как только клиенты начнут писать, их сообщения появятся здесь
              </p>
            </div>
          </div>
        </div>
        <div className="flex-1 flex items-center justify-center bg-secondary/20">
          <div className="text-center space-y-4">
            <div className="w-24 h-24 bg-card rounded-full flex items-center justify-center mx-auto">
              <Users className="w-12 h-12 text-muted-foreground" />
            </div>
            <div>
              <h3 className="font-medium text-lg">Ожидаем клиентов</h3>
              <p className="text-muted-foreground">
                Каналы подключены и готовы к приему сообщений
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (appState === 'error') {
    return (
      <div className="flex h-screen bg-background dark">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-6 max-w-md">
            <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-12 h-12 text-destructive" />
            </div>
            <div>
              <h3 className="font-medium text-xl mb-2">Ошибка подключения</h3>
              <p className="text-muted-foreground mb-4">
                Не удалось подключиться к системе сообщений. Проверьте соединение и попробуйте снова.
              </p>
            </div>
            <div className="space-y-3">
              <Button 
                className="w-full"
                onClick={() => window.location.reload()}
              >
                <Settings className="w-4 h-4 mr-2" />
                Повторить подключение
              </Button>
              <Button variant="outline" className="w-full" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Назад к Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-background dark">
      {/* Conversations List */}
      <div className="w-96 border-r border-border flex flex-col bg-card">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card">
          <div className="flex items-center gap-3 mb-4">
            <Button variant="ghost" size="sm" onClick={onBack}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className="gts-heading-2">Omni-Inbox</h1>
              <p className="text-xs text-muted-foreground">Управление коммуникациями</p>
            </div>
          </div>

          <div className="flex gap-2 mb-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Поиск разговоров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex gap-2">
            <Badge variant="secondary" className="text-xs">
              Всего: {conversations.length}
            </Badge>
            <Badge variant="destructive" className="text-xs">
              Срочных: {conversations.filter(c => c.slaTimer.status === 'critical').length}
            </Badge>
          </div>
        </div>

        {/* Conversations */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {filteredConversations.map((conv) => (
              <Card 
                key={conv.id}
                className={`p-3 cursor-pointer transition-all hover:bg-secondary/50 ${
                  selectedConversation === conv.id ? 'bg-accent/10 border-accent' : ''
                }`}
                onClick={() => setSelectedConversation(conv.id)}
              >
                <div className="flex items-start gap-3">
                  {/* Channel & Avatar */}
                  <div className="relative">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback>{conv.client.name[0]}</AvatarFallback>
                    </Avatar>
                    <div 
                      className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs"
                      style={{ backgroundColor: conv.channel.color }}
                    >
                      {getChannelIcon(conv.channel.type)}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium text-sm truncate">{conv.client.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {conv.client.tier}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {getSentimentIcon(conv.sentiment)}
                        {conv.unreadCount > 0 && (
                          <Badge className="bg-accent text-white text-xs min-w-[1.25rem] h-5 flex items-center justify-center">
                            {conv.unreadCount}
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Status & SLA */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {conv.status === 'agent' && <User className="w-3 h-3 text-green-500" />}
                        {conv.status === 'bot' && <Bot className="w-3 h-3 text-blue-500" />}
                        {conv.status === 'pending' && <Clock className="w-3 h-3 text-yellow-500" />}
                        <span className="text-xs text-muted-foreground">
                          {conv.status === 'agent' ? conv.assignedAgent : 
                           conv.status === 'bot' ? 'AI Assistant' : 'Ожидает'}
                        </span>
                      </div>
                      <div className={`text-xs px-2 py-1 rounded ${
                        conv.slaTimer.status === 'critical' ? 'bg-red-500/20 text-red-400' :
                        conv.slaTimer.status === 'warning' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {formatSLATimer(conv.slaTimer.remaining)}
                      </div>
                    </div>

                    {/* Last Message */}
                    <p className="text-xs text-muted-foreground truncate mb-2">
                      {conv.lastMessage.text}
                    </p>

                    {/* Tags & Time */}
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        {conv.tags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(conv.lastMessage.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Conversation View */}
      {selectedConversation ? (
        <div className="flex-1 flex">
          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-border bg-card">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{selectedConv?.client.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h2 className="font-medium">{selectedConv?.client.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>{selectedConv?.client.tier} клиент</span>
                      <Separator orientation="vertical" className="h-4" />
                      <span>{selectedConv?.client.totalBookings} бронирований</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Calendar className="w-4 h-4 mr-1" />
                    Создать бронирование
                  </Button>
                  <Button variant="outline" size="sm">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Создать сделку
                  </Button>
                  <Button variant="outline" size="sm">
                    <FileText className="w-4 h-4 mr-1" />
                    Добавить задачу
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {conversationMessages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.sender === 'agent' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.sender === 'agent'
                          ? 'bg-accent text-white'
                          : message.sender === 'bot'
                          ? 'bg-blue-500/10 text-blue-300 border border-blue-500/20'
                          : 'bg-secondary'
                      }`}
                    >
                      {message.sender !== 'agent' && (
                        <div className="flex items-center gap-2 mb-1">
                          {message.sender === 'bot' ? (
                            <Bot className="w-3 h-3" />
                          ) : (
                            <User className="w-3 h-3" />
                          )}
                          <span className="text-xs font-medium">{message.senderName}</span>
                        </div>
                      )}
                      <p className="text-sm">{message.text}</p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs opacity-70">
                          {formatTime(message.timestamp)}
                        </span>
                        {!message.isRead && message.sender === 'client' && (
                          <Badge className="bg-accent text-white text-xs">
                            Новое
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Quick Replies */}
            <div className="p-3 border-t border-border bg-card">
              <div className="flex gap-2 mb-3 overflow-x-auto">
                {quickReplies.map((reply, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className="whitespace-nowrap text-xs"
                    onClick={() => setNewMessage(reply)}
                  >
                    {reply.slice(0, 30)}...
                  </Button>
                ))}
              </div>
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-3">
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Image className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <div className="flex-1 flex gap-2">
                  <Textarea
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="resize-none"
                    rows={1}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Client Profile & AI Insights Sidebar */}
          {showAIInsights && (
            <div className="w-80 border-l border-border bg-card overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-4 space-y-6">
                  {/* Client Mini Profile */}
                  <Card className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium">Профиль клиента</h3>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>

                    {selectedConv && (
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback>{selectedConv.client.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium">{selectedConv.client.name}</h4>
                            <Badge variant="outline">{selectedConv.client.tier}</Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-muted-foreground">Бронирований:</span>
                            <div className="font-medium">{selectedConv.client.totalBookings}</div>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Последнее:</span>
                            <div className="font-medium">{selectedConv.client.lastBooking}</div>
                          </div>
                        </div>

                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4 text-muted-foreground" />
                            <span>{selectedConv.client.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4 text-muted-foreground" />
                            <span className="text-xs">{selectedConv.client.email}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <UserPlus className="w-4 h-4 mr-1" />
                            CRM
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <BookOpen className="w-4 h-4 mr-1" />
                            История
                          </Button>
                        </div>
                      </div>
                    )}
                  </Card>

                  {/* AI Insights */}
                  {aiInsight && (
                    <Card className="p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Brain className="w-5 h-5 text-purple-500" />
                        <h3 className="font-medium">AI Инсайты</h3>
                      </div>

                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                          <TabsTrigger value="summary">Сводка</TabsTrigger>
                          <TabsTrigger value="intents">Цели</TabsTrigger>
                          <TabsTrigger value="actions">Действия</TabsTrigger>
                        </TabsList>

                        <TabsContent value="summary" className="mt-3">
                          <div className="space-y-3">
                            <div>
                              <h5 className="text-sm font-medium mb-2">Краткая сводка</h5>
                              <p className="text-sm text-muted-foreground">{aiInsight.summary}</p>
                            </div>

                            <div>
                              <h5 className="text-sm font-medium mb-2">Настроение клиента</h5>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-16 bg-secondary rounded-full h-2">
                                  <div 
                                    className="bg-green-500 h-2 rounded-full" 
                                    style={{ width: `${aiInsight.sentiment.score * 100}%` }}
                                  />
                                </div>
                                <span className="text-sm">{Math.round(aiInsight.sentiment.score * 100)}%</span>
                                <TrendingUp className="w-4 h-4 text-green-500" />
                              </div>
                              <div className="space-y-1">
                                {aiInsight.sentiment.factors.map((factor, idx) => (
                                  <div key={idx} className="text-xs text-muted-foreground">
                                    • {factor}
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </TabsContent>

                        <TabsContent value="intents" className="mt-3">
                          <div className="space-y-3">
                            {aiInsight.intents.map((intent, idx) => (
                              <Card key={idx} className="p-3">
                                <div className="flex items-center justify-between mb-2">
                                  <h5 className="text-sm font-medium">{intent.intent}</h5>
                                  <Badge variant="outline" className="text-xs">
                                    {Math.round(intent.confidence * 100)}%
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground">{intent.description}</p>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>

                        <TabsContent value="actions" className="mt-3">
                          <div className="space-y-3">
                            {aiInsight.nextActions.map((action, idx) => (
                              <Card key={idx} className="p-3">
                                <div className="flex items-start justify-between mb-2">
                                  <h5 className="text-sm font-medium flex-1">{action.action}</h5>
                                  <Badge 
                                    variant={action.priority === 'high' ? 'destructive' : 
                                            action.priority === 'medium' ? 'default' : 'secondary'}
                                    className="text-xs"
                                  >
                                    {action.priority}
                                  </Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mb-2">{action.description}</p>
                                {action.eta && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Clock className="w-3 h-3" />
                                    ETA: {action.eta}
                                  </div>
                                )}
                                <Button variant="outline" size="sm" className="w-full mt-2">
                                  <Zap className="w-3 h-3 mr-1" />
                                  Выполнить
                                </Button>
                              </Card>
                            ))}
                          </div>
                        </TabsContent>
                      </Tabs>
                    </Card>
                  )}

                  {/* Quick Actions */}
                  <Card className="p-4">
                    <h3 className="font-medium mb-3">Быстрые действия</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-1" />
                        Booking
                      </Button>
                      <Button variant="outline" size="sm">
                        <DollarSign className="w-4 h-4 mr-1" />
                        Deal
                      </Button>
                      <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-1" />
                        Task
                      </Button>
                      <Button variant="outline" size="sm">
                        <Flag className="w-4 h-4 mr-1" />
                        Flag
                      </Button>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          )}
        </div>
      ) : (
        // Empty State
        <div className="flex-1 flex items-center justify-center bg-secondary/20">
          <div className="text-center space-y-4">
            <MessageSquare className="w-16 h-16 text-muted-foreground mx-auto" />
            <div>
              <h3 className="font-medium text-lg">Выберите разговор</h3>
              <p className="text-muted-foreground">
                Выберите разговор из списка слева, чтобы начать работу
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}