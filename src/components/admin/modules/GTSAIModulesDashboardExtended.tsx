import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Switch } from '../../ui/switch';
import { Slider } from '../../ui/slider';
import { 
  Bot, Brain, Sparkles, Wand2, MessageCircle, Users, TrendingUp, 
  FileText, Eye, Target, BarChart3, Lightbulb, Zap, Star,
  ChevronRight, ChevronDown, ChevronUp, Send, Mic, MicOff,
  Calendar, Clock, Globe, Languages, Image, Video, Download,
  Upload, Copy, Share2, Archive, Bookmark, Search, Filter,
  Settings, Sliders, RotateCcw, RefreshCw, Play, Pause,
  CheckCircle, AlertTriangle, XCircle, Info, ArrowRight,
  Monitor, Smartphone, Tablet, Headphones, Camera, Code,
  Database, Cloud, Lock, Unlock, Key, Shield, Building,
  Mail, Phone, MapPin, Link, Hash, Flag, Award, Gift,
  Heart, ThumbsUp, ThumbsDown, MessageSquare, Bell, Wrench,
  PieChart, LineChart, Activity, Gauge, Layers, Grid,
  Folder, FolderOpen, Package, Truck, Plane, Ship, Car
} from 'lucide-react';

interface AIModulesDashboardProps {
  userRole: string;
}

type Language = 'ru' | 'en';
type ContentType = 'article' | 'news' | 'social' | 'product' | 'route' | 'email' | 'sms';
type Tone = 'professional' | 'friendly' | 'persuasive' | 'informative' | 'casual' | 'luxury';
type Length = 'short' | 'medium' | 'long';
type CustomerSegment = 'vip' | 'frequent' | 'corporate' | 'first-time' | 'inactive';
type PredictionType = 'bookings' | 'revenue' | 'fleet-load' | 'staff-load' | 'demand';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  attachments?: string[];
  actions?: AIAction[];
}

interface AIAction {
  id: string;
  label: string;
  action: string;
  data?: any;
}

interface ContentGenerationRequest {
  id: string;
  topic: string;
  language: Language;
  type: ContentType;
  tone: Tone;
  length: Length;
  keywords: string[];
  targetAudience: string;
  additionalNotes: string;
  generatedContent?: string;
  status: 'pending' | 'generated' | 'edited' | 'published';
  createdAt: string;
}

interface CustomerInsight {
  id: string;
  segment: CustomerSegment;
  name: string;
  description: string;
  size: number;
  growth: number;
  avgValue: number;
  frequency: number;
  preferences: string[];
  recommendations: string[];
  lastUpdated: string;
}

interface PredictionModel {
  id: string;
  type: PredictionType;
  name: string;
  description: string;
  accuracy: number;
  lastTrained: string;
  predictions: PredictionData[];
  confidence: number;
  status: 'active' | 'training' | 'deprecated';
}

interface PredictionData {
  period: string;
  value: number;
  confidence: number;
  factors: string[];
  scenario: 'optimistic' | 'realistic' | 'pessimistic';
}

interface AISettings {
  language: Language;
  assistantPersonality: 'professional' | 'friendly' | 'concise';
  autoTranslate: boolean;
  voiceEnabled: boolean;
  smartSuggestions: boolean;
  proactiveInsights: boolean;
  notificationEmail: boolean;
  notificationTelegram: boolean;
}

export function GTSAIModulesDashboardExtended({ userRole }: AIModulesDashboardProps) {
  const [activeTab, setActiveTab] = useState('assistant');
  const [language, setLanguage] = useState<Language>('ru');
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [assistantMessages, setAssistantMessages] = useState<AIMessage[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isContentGeneratorOpen, setIsContentGeneratorOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedInsight, setSelectedInsight] = useState<CustomerInsight | null>(null);
  const [selectedModel, setSelectedModel] = useState<PredictionModel | null>(null);

  // Language labels
  const languageLabels: Record<Language, string> = {
    ru: 'Русский',
    en: 'English'
  };

  // Mock данные для AI ассистента
  const initialMessages: AIMessage[] = [
    {
      id: 'msg-001',
      type: 'assistant',
      content: 'Привет! Я ваш AI-ассистент Grand Tour Sochi. Готов помочь с любыми вопросами по бизнесу. Что вас интересует?',
      timestamp: '2024-06-24T10:00:00Z',
      actions: [
        { id: 'action-1', label: 'Показать сегодняшние бронирования', action: 'show_bookings', data: { date: 'today' } },
        { id: 'action-2', label: 'Создать новый лид', action: 'create_lead' },
        { id: 'action-3', label: 'Аналитика по клиентам', action: 'show_analytics' },
        { id: 'action-4', label: 'Генерировать контент', action: 'open_generator' }
      ]
    }
  ];

  // Mock данные для генерации контента
  const contentHistory: ContentGenerationRequest[] = [
    {
      id: 'gen-001',
      topic: 'Новые яхты в флоте 2024',
      language: 'ru',
      type: 'article',
      tone: 'professional',
      length: 'medium',
      keywords: ['яхты', 'флот', 'премиум', 'новинки'],
      targetAudience: 'VIP клиенты',
      additionalNotes: 'Акцент на эксклюзивность и премиум-сервис',
      generatedContent: 'Grand Tour Sochi расширяет свой флот эксклюзивными яхтами премиум-класса...',
      status: 'published',
      createdAt: '2024-06-20T14:30:00Z'
    },
    {
      id: 'gen-002',
      topic: 'Summer sailing routes Sochi',
      language: 'en',
      type: 'social',
      tone: 'friendly',
      length: 'short',
      keywords: ['sailing', 'routes', 'summer', 'Sochi'],
      targetAudience: 'International tourists',
      additionalNotes: 'Focus on scenic beauty and unique experiences',
      generatedContent: 'Discover the most breathtaking sailing routes along the Black Sea coast...',
      status: 'generated',
      createdAt: '2024-06-22T11:15:00Z'
    }
  ];

  // Mock данные для клиентских инсайтов
  const customerInsights: CustomerInsight[] = [
    {
      id: 'insight-001',
      segment: 'vip',
      name: 'VIP клиенты',
      description: 'Премиальные клиенты с высоким чеком и частыми бронированиями',
      size: 89,
      growth: 12.5,
      avgValue: 245000,
      frequency: 4.2,
      preferences: ['Яхты класса люкс', 'Персональный капитан', 'Премиум-маршруты', 'Эксклюзивные локации'],
      recommendations: [
        'Предложить членство в Platinum Club',
        'Персональные предложения на праздники',
        'Ранний доступ к новым яхтам',
        'Индивидуальные маршруты'
      ],
      lastUpdated: '2024-06-24T08:00:00Z'
    },
    {
      id: 'insight-002',
      segment: 'frequent',
      name: 'Частые клиенты',
      description: 'Регулярны�� клиенты с умеренным чеком',
      size: 267,
      growth: 8.3,
      avgValue: 85000,
      frequency: 2.1,
      preferences: ['Катера среднего класса', 'Групповые туры', 'Стандартные маршруты', 'Семейный отдых'],
      recommendations: [
        'Программа лояльности с накопительными скидками',
        'Семейные пакеты со скидкой',
        'Сезонные абонементы',
        'Реферальная программа'
      ],
      lastUpdated: '2024-06-24T08:00:00Z'
    },
    {
      id: 'insight-003',
      segment: 'corporate',
      name: 'Корпоративные клиенты',
      description: 'B2B клиенты для корпоративных мероприятий',
      size: 43,
      growth: 22.1,
      avgValue: 180000,
      frequency: 1.8,
      preferences: ['Большие яхты', 'Конференц-залы', 'Кейтеринг', 'Тимбилдинг программы'],
      recommendations: [
        'Корпоративные пакеты с фиксированной стоимостью',
        'Долгосрочные контракты со скидкой',
        'Дополнительные бизнес-услуги',
        'Персональный менеджер для крупных клиентов'
      ],
      lastUpdated: '2024-06-24T08:00:00Z'
    }
  ];

  // Mock данные для предсказательной аналитики
  const predictionModels: PredictionModel[] = [
    {
      id: 'model-001',
      type: 'bookings',
      name: 'Прогноз бронирований',
      description: 'Предсказание количества бронирований на основе исторических данных и внешних факторов',
      accuracy: 89.3,
      lastTrained: '2024-06-20T00:00:00Z',
      confidence: 85,
      status: 'active',
      predictions: [
        {
          period: 'Июль 2024',
          value: 234,
          confidence: 87,
          factors: ['Высокий сезон', 'Хорошая погода', 'Маркетинговая кампания'],
          scenario: 'realistic'
        },
        {
          period: 'Август 2024',
          value: 267,
          confidence: 84,
          factors: ['Пик сезона', 'Отпускной период', 'Фестивали в Сочи'],
          scenario: 'optimistic'
        },
        {
          period: 'Сентябрь 2024',
          value: 189,
          confidence: 81,
          factors: ['Конец высокого сезона', 'Школьный сезон', 'Снижение туристического потока'],
          scenario: 'realistic'
        }
      ]
    },
    {
      id: 'model-002',
      type: 'revenue',
      name: 'Прогноз выручки',
      description: 'Предсказание месячной выручки с учётом сезонности и маркетинговых активностей',
      accuracy: 91.7,
      lastTrained: '2024-06-21T00:00:00Z',
      confidence: 88,
      status: 'active',
      predictions: [
        {
          period: 'Июль 2024',
          value: 28500000,
          confidence: 89,
          factors: ['Высокие цены в сезон', 'Больше VIP клиентов', 'Новые яхты премиум-класса'],
          scenario: 'realistic'
        },
        {
          period: 'Август 2024',
          value: 32100000,
          confidence: 86,
          factors: ['Пиковые цены', 'Максимальная загрузка', 'Корпоративные события'],
          scenario: 'optimistic'
        }
      ]
    },
    {
      id: 'model-003',
      type: 'fleet-load',
      name: 'Загрузка флота',
      description: 'Прогноз загрузки каждой единицы техники для оптимального планирования',
      accuracy: 86.2,
      lastTrained: '2024-06-19T00:00:00Z',
      confidence: 83,
      status: 'active',
      predictions: [
        {
          period: 'Июль 2024',
          value: 78,
          confidence: 85,
          factors: ['Предпочтения клиентов', 'Техническое состояние', 'Сезонный спрос'],
          scenario: 'realistic'
        }
      ]
    }
  ];

  // AI Settings
  const [aiSettings, setAISettings] = useState<AISettings>({
    language: 'ru',
    assistantPersonality: 'professional',
    autoTranslate: true,
    voiceEnabled: false,
    smartSuggestions: true,
    proactiveInsights: true,
    notificationEmail: true,
    notificationTelegram: false
  });

  // Инициализация сообщений
  useEffect(() => {
    setAssistantMessages(initialMessages);
  }, []);

  // Функции утилиты
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString('ru-RU');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const getSegmentBadge = (segment: CustomerSegment) => {
    switch (segment) {
      case 'vip':
        return <Badge className="bg-purple-500/10 text-purple-500"><Star className="w-3 h-3 mr-1" />VIP</Badge>;
      case 'frequent':
        return <Badge className="bg-blue-500/10 text-blue-500"><Users className="w-3 h-3 mr-1" />Частые</Badge>;
      case 'corporate':
        return <Badge className="bg-green-500/10 text-green-500"><Building className="w-3 h-3 mr-1" />Корпоративные</Badge>;
      case 'first-time':
        return <Badge variant="outline"><Users className="w-3 h-3 mr-1" />Новые</Badge>;
      case 'inactive':
        return <Badge variant="secondary"><Users className="w-3 h-3 mr-1" />Неактивные</Badge>;
      default:
        return <Badge variant="outline">Неопределён</Badge>;
    }
  };

  const getModelStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Активна</Badge>;
      case 'training':
        return <Badge className="bg-yellow-500/10 text-yellow-500"><RefreshCw className="w-3 h-3 mr-1" />Обучение</Badge>;
      case 'deprecated':
        return <Badge variant="secondary"><Archive className="w-3 h-3 mr-1" />Устарела</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getContentStatusBadge = (status: string) => {
    switch (status) {
      case 'generated':
        return <Badge className="bg-blue-500/10 text-blue-500"><Bot className="w-3 h-3 mr-1" />Сгенерировано</Badge>;
      case 'edited':
        return <Badge className="bg-yellow-500/10 text-yellow-500"><FileText className="w-3 h-3 mr-1" />Отредактировано</Badge>;
      case 'published':
        return <Badge className="bg-green-500/10 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Опубликовано</Badge>;
      case 'pending':
        return <Badge variant="outline"><Clock className="w-3 h-3 mr-1" />Ожидание</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setAssistantMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'assistant',
        content: generateAIResponse(currentMessage),
        timestamp: new Date().toISOString(),
        actions: generateAIActions(currentMessage)
      };
      setAssistantMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('бронирован') || message.includes('booking')) {
      return 'Сегодня у нас 23 активных бронирования на общую сумму 1 850 000 ₽. Самое крупное - аренда яхты Azimut 68 на 8 часов.';
    }
    if (message.includes('клиент') || message.includes('customer')) {
      return 'В нашей базе 1,247 активных клиентов. 89 VIP-клиентов принесли 38% выручки за месяц. Рекомендую обратить внимание на сегмент корпоративных клиентов - рост 22%.';
    }
    if (message.includes('аналитик') || message.includes('analytics')) {
      return 'За последний месяц: выручка выросла на 18%, количество бронирований на 12%. Прогноз на июль - 234 бронирования с выручкой 28.5М ₽.';
    }
    if (message.includes('контент') || message.includes('content')) {
      return 'Готов создать контент! Могу сгенерировать статьи, посты для соцсетей, описания маршрутов на русском и английском языках.';
    }
    if (message.includes('флот') || message.includes('fleet')) {
      return 'Флот загружен на 78%. Самые популярные - яхты Azimut и катера Riva. На техобслуживании 3 единицы техники.';
    }
    
    return 'Понял ваш запрос! Могу помочь с аналитикой, генерацией контента, поиском информации в базе знаний или управлением данными. Что конкретно нужно?';
  };

  const generateAIActions = (userMessage: string): AIAction[] => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('бронирован')) {
      return [
        { id: 'action-bookings', label: 'Показать детали бронирований', action: 'show_booking_details' },
        { id: 'action-create-booking', label: 'Создать новое бронирование', action: 'create_booking' }
      ];
    }
    if (message.includes('клиент')) {
      return [
        { id: 'action-segments', label: 'Анализ сегментов клиентов', action: 'show_segments' },
        { id: 'action-insights', label: 'Детальные инсайты', action: 'show_insights' }
      ];
    }
    
    return [
      { id: 'action-help', label: 'Показать возможности', action: 'show_capabilities' },
      { id: 'action-examples', label: 'Примеры запросов', action: 'show_examples' }
    ];
  };

  const canManageAI = () => {
    return ['executive', 'manager', 'ai-admin'].includes(userRole);
  };

  const canUseGenerator = () => {
    return ['executive', 'manager', 'marketing-manager', 'content-editor'].includes(userRole);
  };

  const canViewInsights = () => {
    return ['executive', 'manager', 'crm-manager', 'marketing-manager'].includes(userRole);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1>AI Modules Dashboard</h1>
          <p className="text-muted-foreground">
            Искусственный интеллект для автоматизации и аналитики бизнеса
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Переключатель языков */}
          <Select value={language} onValueChange={(value: Language) => setLanguage(value)}>
            <SelectTrigger className="w-36">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languageLabels).map(([code, label]) => (
                <SelectItem key={code} value={code}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {canManageAI() && (
            <Button variant="outline" onClick={() => setIsSettingsOpen(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Настройки AI
            </Button>
          )}
          
          <Button onClick={() => setIsAssistantOpen(true)}>
            <Bot className="w-4 h-4 mr-2" />
            AI Ассистент
          </Button>
        </div>
      </div>

      {/* Обзорная панель */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">AI Модели</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">7</span>
              <p className="text-xs text-muted-foreground">активных моделей</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Генерация контента</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">247</span>
              <p className="text-xs text-muted-foreground">материалов создано</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Инсайты клиентов</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">89.3%</span>
              <p className="text-xs text-muted-foreground">точность сегментации</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-yellow-500" />
              <span className="text-sm font-medium">Предсказания</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">91.7%</span>
              <p className="text-xs text-muted-foreground">точность прогнозов</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assistant">
            <Bot className="w-4 h-4 mr-2" />
            AI Ассистент
          </TabsTrigger>
          <TabsTrigger value="generator">
            <Sparkles className="w-4 h-4 mr-2" />
            Генерация контента
          </TabsTrigger>
          <TabsTrigger value="insights">
            <Users className="w-4 h-4 mr-2" />
            Инсайты клиентов
          </TabsTrigger>
          <TabsTrigger value="predictions">
            <TrendingUp className="w-4 h-4 mr-2" />
            Предсказательная аналитика
          </TabsTrigger>
        </TabsList>

        {/* AI Ассистент */}
        <TabsContent value="assistant" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* История чата */}
            <div className="lg:col-span-2">
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3>Чат с AI ассистентом</h3>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVoiceActive(!isVoiceActive)}
                        className={isVoiceActive ? 'text-red-500' : ''}
                      >
                        {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <ScrollArea className="h-96 border rounded-lg p-4">
                    <div className="space-y-4">
                      {assistantMessages.map((message) => (
                        <div
                          key={message.id}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-[80%] p-3 rounded-lg ${
                              message.type === 'user'
                                ? 'bg-primary text-primary-foreground ml-4'
                                : 'bg-muted mr-4'
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <p className="text-xs opacity-70 mt-1">
                              {formatDateTime(message.timestamp)}
                            </p>
                            
                            {message.actions && message.actions.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-3">
                                {message.actions.map((action) => (
                                  <Button
                                    key={action.id}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>

                  <div className="flex gap-2">
                    <Input
                      placeholder="Задайте вопрос AI ассистенту..."
                      value={currentMessage}
                      onChange={(e) => setCurrentMessage(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage}>
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            {/* Быстрые команды */}
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="mb-3">Быстрые команды</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Calendar className="w-4 h-4 mr-2" />
                    Показать сегодняшние бронирования
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Анализ клиентской базы
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Показать аналитику
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Создать отчёт
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Sparkles className="w-4 h-4 mr-2" />
                    Генерировать контент
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Search className="w-4 h-4 mr-2" />
                    Найти в базе знаний
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="mb-3">Активность AI</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Обработано запросов сегодня</span>
                    <Badge variant="outline">47</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Среднее время ответа</span>
                    <Badge variant="outline">0.8с</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Точность ответов</span>
                    <Badge className="bg-green-500/10 text-green-500">94%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Генерация контента */}
        <TabsContent value="generator" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>AI генератор контента</h3>
              <p className="text-sm text-muted-foreground">
                Автоматическое создание текстов для сайта, соцсетей и маркетинга
              </p>
            </div>
            {canUseGenerator() && (
              <Button onClick={() => setIsContentGeneratorOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать контент
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* История генерации */}
            <div className="lg:col-span-2 space-y-4">
              {contentHistory.map((request) => (
                <Card key={request.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <h4>{request.topic}</h4>
                        <div className="flex items-center gap-2">
                          {getContentStatusBadge(request.status)}
                          <Badge variant="outline">{languageLabels[request.language]}</Badge>
                          <Badge variant="outline">{request.type}</Badge>
                          <Badge variant="outline">{request.tone}</Badge>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {request.generatedContent && (
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm line-clamp-3">{request.generatedContent}</p>
                      </div>
                    )}

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Целевая аудитория: {request.targetAudience}</span>
                      <span>•</span>
                      <span>Создано: {formatDateTime(request.createdAt)}</span>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {request.keywords.map((keyword) => (
                        <Badge key={keyword} variant="outline" className="text-xs">
                          {keyword}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Статистика и шаблоны */}
            <div className="space-y-4">
              <Card className="p-4">
                <h4 className="mb-3">Статистика генерации</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Всего сгенерировано</span>
                    <Badge variant="outline">247</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>За этот месяц</span>
                    <Badge variant="outline">34</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Опубликовано</span>
                    <Badge className="bg-green-500/10 text-green-500">189</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Средняя оценка качества</span>
                    <Badge className="bg-blue-500/10 text-blue-500">4.7/5</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="mb-3">Популярные шаблоны</h4>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <FileText className="w-4 h-4 mr-2" />
                    Новость о флоте
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    Пост в соцсети
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Mail className="w-4 h-4 mr-2" />
                    Email-рассылка
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Ship className="w-4 h-4 mr-2" />
                    Описание маршрута
                  </Button>
                  <Button variant="outline" className="w-full justify-start" size="sm">
                    <Star className="w-4 h-4 mr-2" />
                    Промо материал
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h4 className="mb-3">Языки</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Русский</span>
                    <Progress value={75} className="w-16 h-2" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">English</span>
                    <Progress value={25} className="w-16 h-2" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </TabsContent>

        {/* Инсайты клиентов */}
        <TabsContent value="insights" className="space-y-6">
          <div>
            <h3>AI аналитика клиентов</h3>
            <p className="text-sm text-muted-foreground">
              Автоматическая сегментация и рекомендации на основе поведения клиентов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {customerInsights.map((insight) => (
              <Card key={insight.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedInsight(insight)}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4>{insight.name}</h4>
                    {getSegmentBadge(insight.segment)}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {insight.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Размер сегмента</p>
                      <p className="text-lg font-semibold">{insight.size} клиентов</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Рост</p>
                      <p className="text-lg font-semibold text-green-600">+{insight.growth}%</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Средний чек</p>
                      <p className="text-lg font-semibold">{formatCurrency(insight.avgValue)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Частота</p>
                      <p className="text-lg font-semibold">{insight.frequency} раз/год</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Топ предпочтения:</p>
                    <div className="flex flex-wrap gap-1">
                      {insight.preferences.slice(0, 2).map((pref) => (
                        <Badge key={pref} variant="outline" className="text-xs">
                          {pref}
                        </Badge>
                      ))}
                      {insight.preferences.length > 2 && (
                        <Badge variant="outline" className="text-xs">
                          +{insight.preferences.length - 2}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    <Eye className="w-4 h-4 mr-2" />
                    Подробнее
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Общая аналитика */}
          <Card className="p-6">
            <h4 className="mb-4">Общие инсайты</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Общий LTV</p>
                <p className="text-2xl font-bold">{formatCurrency(1247000)}</p>
                <p className="text-xs text-green-600">+15% за квартал</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Retention Rate</p>
                <p className="text-2xl font-bold">78.5%</p>
                <p className="text-xs text-green-600">+5.2% за месяц</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Средний AOV</p>
                <p className="text-2xl font-bold">{formatCurrency(125000)}</p>
                <p className="text-xs text-blue-600">стабильно</p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Конверсия в VIP</p>
                <p className="text-2xl font-bold">12.3%</p>
                <p className="text-xs text-green-600">+2.1% за месяц</p>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Предсказательная аналитика */}
        <TabsContent value="predictions" className="space-y-6">
          <div>
            <h3>Предсказательная аналитика</h3>
            <p className="text-sm text-muted-foreground">
              AI модели для прогнозирования бизнес-метрик и планирования ресурсов
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {predictionModels.map((model) => (
              <Card key={model.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    onClick={() => setSelectedModel(model)}>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4>{model.name}</h4>
                    {getModelStatusBadge(model.status)}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {model.description}
                  </p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Точность модели</span>
                      <Badge className="bg-green-500/10 text-green-500">
                        {model.accuracy}%
                      </Badge>
                    </div>
                    <Progress value={model.accuracy} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Уверенность</span>
                      <span>{model.confidence}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>Последнее обучение</span>
                      <span>{formatDate(model.lastTrained)}</span>
                    </div>
                  </div>

                  {model.predictions.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Последний прогноз:</p>
                      <div className="p-3 bg-muted/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">{model.predictions[0].period}</span>
                          <span className="font-semibold">
                            {model.type === 'revenue' 
                              ? formatCurrency(model.predictions[0].value)
                              : formatNumber(model.predictions[0].value)
                            }
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          Уверенность: {model.predictions[0].confidence}%
                        </p>
                      </div>
                    </div>
                  )}

                  <Button variant="outline" className="w-full">
                    <BarChart3 className="w-4 h-4 mr-2" />
                    Детальный прогноз
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Сводка прогнозов */}
          <Card className="p-6">
            <h4 className="mb-4">Сводка прогнозов на ближайшие 3 месяца</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <h5 className="font-medium">Июль 2024</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Бронирования</span>
                    <span className="font-semibold">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Выручка</span>
                    <span className="font-semibold">28.5М ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Загрузка флота</span>
                    <span className="font-semibold">78%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-medium">Август 2024</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Бронирования</span>
                    <span className="font-semibold">267</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Выручка</span>
                    <span className="font-semibold">32.1М ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Загрузка флота</span>
                    <span className="font-semibold">85%</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h5 className="font-medium">Сентябрь 2024</h5>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Бронирования</span>
                    <span className="font-semibold">189</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Выручка</span>
                    <span className="font-semibold">22.3М ₽</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Загрузка флота</span>
                    <span className="font-semibold">62%</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Глобальный AI ассистент (виджет) */}
      {isAssistantOpen && (
        <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-card border rounded-lg shadow-xl z-50">
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <Bot className="w-5 h-5 text-primary" />
              <h4>AI Ассистент</h4>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setIsAssistantOpen(false)}>
              <XCircle className="w-4 h-4" />
            </Button>
          </div>
          
          <ScrollArea className="h-[380px] p-4">
            <div className="space-y-4">
              {assistantMessages.slice(-5).map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 p-4 border-t">
            <Input
              placeholder="Спросите AI..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Диалог генератора контента */}
      <Dialog open={isContentGeneratorOpen} onOpenChange={setIsContentGeneratorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>AI генератор контента</DialogTitle>
            <DialogDescription>
              Создайте качественный контент с помощью искусственного интеллекта
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Тема контента</Label>
                <Textarea 
                  placeholder="Опишите, о чём должен быть контент..."
                  rows={2}
                />
              </div>
              <div>
                <Label>Целевая аудитория</Label>
                <Input placeholder="VIP клиенты, туристы, корпоративные клиенты..." />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label>Язык</Label>
                <Select defaultValue="ru">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ru">Русский</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тип контента</Label>
                <Select defaultValue="article">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Статья</SelectItem>
                    <SelectItem value="news">Новость</SelectItem>
                    <SelectItem value="social">Пост в соцсети</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="route">Описание маршрута</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тональность</Label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональная</SelectItem>
                    <SelectItem value="friendly">Дружелюбная</SelectItem>
                    <SelectItem value="luxury">Люксовая</SelectItem>
                    <SelectItem value="casual">Неформальная</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Длина</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Короткий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="long">Длинный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Ключевые слова</Label>
              <Input placeholder="яхты, премиум, аренда, Сочи (через запятую)" />
            </div>

            <div>
              <Label>Дополнительные требования</Label>
              <Textarea 
                placeholder="Укажите специальные требования, стиль, акценты..."
                rows={2}
              />
            </div>

            <div className="space-y-3">
              <Label>Дополнительные опции</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="seo-optimize" defaultChecked />
                  <Label htmlFor="seo-optimize">SEO оптимизация</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="auto-translate" />
                  <Label htmlFor="auto-translate">Автоперевод на другой язык</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="include-cta" defaultChecked />
                  <Label htmlFor="include-cta">Включить призыв к действию</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsContentGeneratorOpen(false)}>
                Отменить
              </Button>
              <Button className="flex-1" onClick={() => setIsContentGeneratorOpen(false)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Генерировать контент
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог настроек AI */}
      <Dialog open={isSettingsOpen} onOpenChange={setIsSettingsOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Настройки AI модулей</DialogTitle>
            <DialogDescription>
              Конфигурация искусственного интеллекта и уведомлений
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <h4 className="mb-4">Общие настройки</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Язык по умолчанию</Label>
                    <Select value={aiSettings.language} onValueChange={(value: Language) => 
                      setAISettings({...aiSettings, language: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ru">Русский</SelectItem>
                        <SelectItem value="en">English</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Личность ассистента</Label>
                    <Select value={aiSettings.assistantPersonality} onValueChange={(value: any) => 
                      setAISettings({...aiSettings, assistantPersonality: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="professional">Профессиональная</SelectItem>
                        <SelectItem value="friendly">Дружелюбная</SelectItem>
                        <SelectItem value="concise">Краткая</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Функции</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Автоматический перевод</Label>
                    <p className="text-sm text-muted-foreground">Автоперевод контента между языками</p>
                  </div>
                  <Switch checked={aiSettings.autoTranslate} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, autoTranslate: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Голосовое управление</Label>
                    <p className="text-sm text-muted-foreground">Голосовые команды для ассистента</p>
                  </div>
                  <Switch checked={aiSettings.voiceEnabled} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, voiceEnabled: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Умные предложения</Label>
                    <p className="text-sm text-muted-foreground">Проактивные рекомендации от AI</p>
                  </div>
                  <Switch checked={aiSettings.smartSuggestions} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, smartSuggestions: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Проактивные инсайты</Label>
                    <p className="text-sm text-muted-foreground">Автоматические уведомления об аномалиях</p>
                  </div>
                  <Switch checked={aiSettings.proactiveInsights} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, proactiveInsights: checked})} />
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4">Уведомления</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email уведомления</Label>
                    <p className="text-sm text-muted-foreground">Отправлять важные инсайты на email</p>
                  </div>
                  <Switch checked={aiSettings.notificationEmail} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, notificationEmail: checked})} />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Telegram уведомления</Label>
                    <p className="text-sm text-muted-foreground">Быстрые уведомления в Telegram</p>
                  </div>
                  <Switch checked={aiSettings.notificationTelegram} onCheckedChange={(checked) => 
                    setAISettings({...aiSettings, notificationTelegram: checked})} />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
                Отменить
              </Button>
              <Button onClick={() => setIsSettingsOpen(false)}>
                Сохранить настройки
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}