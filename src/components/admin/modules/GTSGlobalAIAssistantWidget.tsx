import React, { useState, useEffect } from 'react';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { ScrollArea } from '../../ui/scroll-area';
import { Badge } from '../../ui/badge';
import { 
  Bot, Send, Minimize2, Maximize2, Settings, Mic, MicOff,
  MessageCircle, Sparkles, Calendar, Users, BarChart3, 
  FileText, Search, XCircle, RefreshCw, Volume2, VolumeX
} from 'lucide-react';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  actions?: AIAction[];
}

interface AIAction {
  id: string;
  label: string;
  action: string;
  data?: any;
}

interface GlobalAIAssistantProps {
  userRole: string;
}

export function GTSGlobalAIAssistantWidget({ userRole }: GlobalAIAssistantProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messages, setMessages] = useState<AIMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  // Инициализация с приветствием
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const welcomeMessage: AIMessage = {
        id: 'welcome-001',
        type: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString(),
        actions: getQuickActions()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen, userRole]);

  const getWelcomeMessage = () => {
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Доброе утро' : hour < 18 ? 'Добрый день' : 'Добрый вечер';
    
    return `${greeting}! Я ваш AI-ассистент Grand Tour Sochi. Готов помочь с управлением бизнесом, аналитикой и поиском информации. Что вас интересует?`;
  };

  const getQuickActions = (): AIAction[] => {
    const commonActions = [
      { id: 'bookings-today', label: 'Сегодняшние бронирования', action: 'show_bookings' },
      { id: 'client-analytics', label: 'Аналитика клиентов', action: 'show_analytics' },
      { id: 'knowledge-search', label: 'Поиск в базе знаний', action: 'search_knowledge' }
    ];

    if (['executive', 'manager'].includes(userRole)) {
      return [
        ...commonActions,
        { id: 'generate-report', label: 'Создать отчёт', action: 'generate_report' },
        { id: 'fleet-status', label: 'Статус флота', action: 'show_fleet' }
      ];
    }

    if (['marketing-manager', 'content-editor'].includes(userRole)) {
      return [
        ...commonActions,
        { id: 'generate-content', label: 'Генерировать контент', action: 'open_generator' },
        { id: 'social-analytics', label: 'Аналитика соцсетей', action: 'show_social' }
      ];
    }

    return commonActions;
  };

  const handleSendMessage = () => {
    if (!currentMessage.trim()) return;

    const userMessage: AIMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content: currentMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setCurrentMessage('');
    setIsTyping(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const aiResponse: AIMessage = {
        id: `msg-${Date.now() + 1}`,
        type: 'assistant',
        content: generateAIResponse(currentMessage),
        timestamp: new Date().toISOString(),
        actions: generateContextActions(currentMessage)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Звуковое уведомление
      if (isSoundEnabled) {
        playNotificationSound();
      }
    }, Math.random() * 1000 + 500); // 0.5-1.5 секунд
  };

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Аналитика бронирований
    if (message.includes('бронирован') || message.includes('booking')) {
      return `📊 Сегодня ${new Date().toLocaleDateString('ru-RU')}:\n\n• 23 активных бронирования\n• Общая сумма: 1 850 000 ₽\n• Самое крупное: Azimut 68 на 8 часов\n• Завтра запланировано: 18 бронирований\n\nХотите подробную информацию по конкретному бронированию?`;
    }
    
    // Аналитика клиентов
    if (message.includes('клиент') || message.includes('customer') || message.includes('аналитик')) {
      return `👥 Клиентская аналитика:\n\n• Всего активных клиентов: 1,247\n• VIP клиенты: 89 (38% выручки)\n• Новые клиенты за месяц: 47\n• Средний чек: 125,000 ₽\n• Retention rate: 78.5%\n\n🎯 Рекомендация: обратите внимание на сегмент корпоративных клиентов - рост 22%`;
    }
    
    // Флот и техника
    if (message.includes('флот') || message.includes('fleet') || message.includes('яхт') || message.includes('катер')) {
      return `⛵ Статус флота:\n\n• Загрузка: 78% (выше среднего)\n• Доступно сейчас: 12 единиц техники\n• На техобслуживании: 3 яхты\n• Самые популярные: Azimut серия, Riva\n• Планируемое ТО на завтра: 2 катера\n\nВозможны ли конфликты в расписании?`;
    }
    
    // Финансы и выручка
    if (message.includes('выручк') || message.includes('revenue') || message.includes('деньги') || message.includes('прибыль')) {
      return `💰 Финансовая сводка:\n\n• Выручка за месяц: 28.5М ₽ (+18%)\n• План выполнен на: 112%\n• Средняя маржинальность: 67%\n• Топ услуга: VIP туры (45% выручки)\n• Прогноз на следующий месяц: 32.1М ₽\n\nНужен детальный финансовый отчёт?`;
    }
    
    // Персонал и команда
    if (message.includes('персонал') || message.includes('staff') || message.includes('капитан') || message.includes('команд')) {
      return `👨‍✈️ Статус персонала:\n\n• Всего сотрудников: 47\n• На смене сегодня: 23\n• Капитаны доступны: 8 из 12\n• Больничные: 1 человек\n• Отпуска: 3 человека\n\nПланируете назначить экипаж на конкретный рейс?`;
    }
    
    // Маркетинг и контент
    if (message.includes('контент') || message.includes('content') || message.includes('реклам') || message.includes('маркетинг')) {
      return `📝 Контент и маркетинг:\n\n• Сгенерировано материалов: 247\n• Опубликовано: 189\n• Средняя оценка качества: 4.7/5\n• Популярные темы: новости флота, маршруты\n\n🎯 Могу создать:\n• Статьи для блога\n• Посты для соцсетей\n• Email-рассылки\n• Описания маршрутов`;
    }
    
    // Погода и условия
    if (message.includes('погод') || message.includes('weather') || message.includes('море') || message.includes('ветер')) {
      return `🌤️ Погодные условия:\n\n• Сегодня в Сочи: +28°C, солнечно\n• Ветер: 3-5 м/с (благоприятный)\n• Видимость: отличная (15+ км)\n• Высота волны: 0.3-0.5 м\n• Прогноз на завтра: +30°C, переменная облачность\n\n✅ Условия отличные для всех типов маршрутов`;
    }
    
    // База знаний и поиск
    if (message.includes('найти') || message.includes('search') || message.includes('инструкц') || message.includes('как')) {
      return `🔍 Поиск в базе знаний:\n\nМогу помочь найти:\n• Процедуры и инструкции\n• Регламенты безопасности\n• Контакты поставщиков\n• Обучающие материалы\n• FAQ по услугам\n\nУточните, что именно ищете, и я найду релевантную информацию из базы знаний.`;
    }
    
    // Помощь и возможности
    if (message.includes('помощь') || message.includes('help') || message.includes('что умеешь') || message.includes('возможност')) {
      return `🤖 Мои возможности:\n\n📊 Аналитика:\n• Бронирования и выручка\n• Клиентские сегменты\n• Прогнозы и тренды\n\n⚙️ Операции:\n• Статус флота и персонала\n• Планирование ресурсов\n• Поиск в базе данных\n\n📝 Контент:\n• Генерация текстов\n• Переводы\n• SEO оптимизация\n\nПросто опишите задачу, и я помогу её решить!`;
    }
    
    // Общий ответ
    return `Понял ваш запрос о "${userMessage}". Могу помочь с:\n\n• Поиском информации в системе\n• Аналитикой и отчётами\n• Созданием контента\n• Планированием ресурсов\n\nУточните, пожалуйста, что именно вам нужно?`;
  };

  const generateContextActions = (userMessage: string): AIAction[] => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('бронирован')) {
      return [
        { id: 'booking-details', label: 'Детали бронирований', action: 'show_booking_details' },
        { id: 'create-booking', label: 'Создать бронирование', action: 'create_booking' },
        { id: 'booking-calendar', label: 'Календарь бронирований', action: 'open_calendar' }
      ];
    }
    
    if (message.includes('клиент')) {
      return [
        { id: 'client-segments', label: 'Сегменты клиентов', action: 'show_segments' },
        { id: 'client-insights', label: 'Инсайты клиентов', action: 'show_insights' },
        { id: 'crm-dashboard', label: 'Открыть CRM', action: 'open_crm' }
      ];
    }
    
    if (message.includes('флот')) {
      return [
        { id: 'fleet-status', label: 'Статус флота', action: 'show_fleet_status' },
        { id: 'maintenance', label: 'График ТО', action: 'show_maintenance' },
        { id: 'fleet-planning', label: 'Планирование флота', action: 'open_fleet_planning' }
      ];
    }
    
    if (message.includes('контент')) {
      return [
        { id: 'generate-content', label: 'Генератор контента', action: 'open_generator' },
        { id: 'content-history', label: 'История генерации', action: 'show_content_history' },
        { id: 'cms-dashboard', label: 'Открыть CMS', action: 'open_cms' }
      ];
    }
    
    return [
      { id: 'more-help', label: 'Больше возможностей', action: 'show_capabilities' },
      { id: 'examples', label: 'Примеры запросов', action: 'show_examples' }
    ];
  };

  const handleActionClick = (action: AIAction) => {
    const response = handleAIAction(action);
    
    const actionMessage: AIMessage = {
      id: `action-${Date.now()}`,
      type: 'assistant',
      content: response,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, actionMessage]);
  };

  const handleAIAction = (action: AIAction): string => {
    switch (action.action) {
      case 'show_bookings':
        return '📋 Переход к модулю бронирований...\n\nСегодняшние бронирования:\n• 09:00 - Azimut 55 (VIP тур, 6 часов)\n• 11:30 - Riva 63 (семейная прогулка, 4 часа)\n• 14:00 - Princess 60 (корпоратив, 8 часов)\n\nВсего: 23 бронирования на сумму 1,850,000 ₽';
        
      case 'show_analytics':
        return '📊 Открываю аналитический центр...\n\nКлючевые метрики:\n• Конверсия лидов: 23.5% (+3.2%)\n• Средний LTV: 247,000 ₽\n• Повторные клиенты: 67%\n• NPS: 8.9/10\n\nТренды: рост интереса к VIP турам (+28%)';
        
      case 'search_knowledge':
        return '🔍 База знаний готова к поиску.\n\nДоступные разделы:\n• Процедуры бронирования\n• Техника безопасности\n• Обслуживание флота\n• Работа с клиентами\n• Партнёрские программы\n\nО чём хотите узнать подробнее?';
        
      case 'open_generator':
        return '✨ Запускаю AI генератор контента...\n\nМогу создать:\n• Статьи для блога (500-2000 слов)\n• Посты для Instagram/Facebook\n• Email-рассылки\n• Описания маршрутов\n• Новости о флоте\n\nВыберите тип контента и тему!';
        
      case 'show_fleet_status':
        return '⛵ Статус флота в реальном времени:\n\n🟢 Доступно (12):\n• Azimut 68, 55, 42\n• Princess 60, 50\n• Riva 63, 52\n• И ещё 5 единиц\n\n🔴 Занято (8):\n• На маршрутах до 18:00\n\n🟡 ТО (3):\n• Возврат завтра утром';
        
      case 'generate_report':
        return '📊 Создаю отчёт...\n\nДоступные отчёты:\n• Ежедневная сводка\n• Финансовый отчёт\n• Загрузка флота\n• Клиентская аналитика\n• Отчёт по персоналу\n\nКакой отчёт нужен? Могу сделать в PDF, Excel или презентацию.';
        
      case 'show_capabilities':
        return '🚀 Полный список возможностей:\n\n📈 Аналитика: метрики, прогнозы, инсайты\n⚙️ Операции: бронирования, флот, персонал\n💬 Контент: генерация, переводы, SEO\n🔍 Поиск: база знаний, клиенты, история\n📊 Отчёты: автоматические сводки\n🎯 Рекомендации: на основе AI анализа';
        
      default:
        return 'Функция в разработке. Скоро будет доступна!';
    }
  };

  const playNotificationSound = () => {
    // Простой звук уведомления
    const audio = new Audio('data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmYeBS2Py/HPgywHHWq+8N2QQAoTXrPo66JUFAVF');
    audio.volume = 0.3;
    audio.play().catch(() => {}); // Игнорируем ошибки воспроизведения
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ru-RU', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <>
      {/* Кнопка открытия ассистента */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          <Button
            size="lg"
            className="rounded-full w-16 h-16 shadow-lg hover:shadow-xl transition-all"
            onClick={() => setIsOpen(true)}
          >
            <Bot className="w-6 h-6" />
          </Button>
          {/* Индикатор активности */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
        </div>
      )}

      {/* Виджет ассистента */}
      {isOpen && (
        <div className={`fixed bottom-6 right-6 bg-card border rounded-lg shadow-xl z-50 transition-all ${
          isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
        }`}>
          {/* Заголовок */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Bot className="w-5 h-5 text-primary" />
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-background" />
              </div>
              <div>
                <h4 className="font-medium">AI Ассистент</h4>
                {!isMinimized && (
                  <p className="text-xs text-muted-foreground">Онлайн • Время ответа: ~1с</p>
                )}
              </div>
            </div>
            
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                className="text-muted-foreground"
              >
                {isSoundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="text-muted-foreground"
              >
                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground"
              >
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Содержимое чата */}
          {!isMinimized && (
            <>
              <ScrollArea className="h-[460px] p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[85%] p-3 rounded-lg text-sm ${
                          message.type === 'user'
                            ? 'bg-primary text-primary-foreground ml-8'
                            : 'bg-muted mr-8'
                        }`}
                      >
                        <div className="whitespace-pre-line">{message.content}</div>
                        <div className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {formatTime(message.timestamp)}
                        </div>
                        
                        {/* Быстрые действия */}
                        {message.actions && message.actions.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {message.actions.map((action) => (
                              <Button
                                key={action.id}
                                variant="outline"
                                size="sm"
                                className="text-xs h-6"
                                onClick={() => handleActionClick(action)}
                              >
                                {action.label}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* Индикатор печати */}
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted p-3 rounded-lg mr-8">
                        <div className="flex items-center gap-1">
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                          <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Панель ввода */}
              <div className="flex gap-2 p-4 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsVoiceActive(!isVoiceActive)}
                  className={`${isVoiceActive ? 'text-red-500' : 'text-muted-foreground'}`}
                >
                  {isVoiceActive ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Input
                  placeholder="Спросите AI ассистента..."
                  value={currentMessage}
                  onChange={(e) => setCurrentMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  className="flex-1"
                  disabled={isTyping}
                />
                <Button 
                  onClick={handleSendMessage} 
                  size="sm"
                  disabled={!currentMessage.trim() || isTyping}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}