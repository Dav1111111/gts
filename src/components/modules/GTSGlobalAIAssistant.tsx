import { useState, useRef, useEffect } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { 
  MessageCircle, 
  X, 
  Send, 
  Minimize2, 
  Maximize2, 
  Bot, 
  User, 
  Sparkles, 
  Calendar,
  DollarSign,
  Users,
  Settings,
  HelpCircle,
  BarChart3,
  Clock,
  AlertCircle,
  CheckCircle,
  Info,
  Zap,
  Brain,
  Search,
  FileText,
  Phone
} from "lucide-react";

interface Message {
  id: string;
  type: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: Array<{
    label: string;
    action: string;
    data?: any;
  }>;
}

interface QuickAction {
  id: string;
  label: string;
  category: string;
  icon: any;
  query: string;
}

export function GTSGlobalAIAssistant({ userRole = "executive" }: { userRole?: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Role-based quick actions
  const quickActions: Record<string, QuickAction[]> = {
    executive: [
      { id: "kpi", label: "KPI за месяц", category: "Analytics", icon: BarChart3, query: "Покажи основные KPI за текущий месяц" },
      { id: "revenue", label: "Выручка", category: "Finance", icon: DollarSign, query: "Какая выручка за последнюю неделю?" },
      { id: "bookings", label: "Бронирования", category: "Operations", icon: Calendar, query: "Сколько новых бронирований сегодня?" },
      { id: "team", label: "Команда", category: "Staff", icon: Users, query: "Статус команды и загрузка персонала" }
    ],
    partner: [
      { id: "my-bookings", label: "Мои бронирования", category: "Bookings", icon: Calendar, query: "Покажи мои активные бронирования" },
      { id: "commissions", label: "Комиссии", category: "Finance", icon: DollarSign, query: "Моя комиссия за этот месяц" },
      { id: "clients", label: "Клиенты", category: "CRM", icon: Users, query: "Список моих клиентов" },
      { id: "support", label: "Поддержка", category: "Help", icon: HelpCircle, query: "Как связаться с поддержкой?" }
    ],
    operator: [
      { id: "schedule", label: "Расписание", category: "Schedule", icon: Clock, query: "Моё расписание на сегодня" },
      { id: "equipment", label: "Техника", category: "Equipment", icon: Settings, query: "Статус оборудования" },
      { id: "tasks", label: "Задачи", category: "Tasks", icon: FileText, query: "Мои текущие задачи" },
      { id: "reports", label: "Отчеты", category: "Reports", icon: BarChart3, query: "Как подать отчет о работе?" }
    ],
    client: [
      { id: "book", label: "Забронировать", category: "Booking", icon: Calendar, query: "Хочу забронировать тур" },
      { id: "status", label: "Мои брони", category: "Status", icon: Info, query: "Статус моих бронирований" },
      { id: "weather", label: "Погода", category: "Info", icon: Info, query: "Какая погода для туров?" },
      { id: "contact", label: "Контакты", category: "Support", icon: Phone, query: "Контакты для связи" }
    ]
  };

  const currentQuickActions = quickActions[userRole] || quickActions.client;

  const initialMessage: Message = {
    id: "1",
    type: "assistant",
    content: getRoleBasedGreeting(userRole),
    timestamp: new Date()
  };

  function getRoleBasedGreeting(role: string): string {
    const greetings = {
      executive: "Привет! Я ваш AI-ассистент. Готов предоставить аналитику, KPI, финансовые отчеты и информацию о команде. Что вас интересует?",
      partner: "Добро пожаловать! Помогу с вашими бронированиями, комиссиями, клиентской базой и технической поддержкой. Чем могу помочь?",
      operator: "Здравствуйте! Готов помочь с расписанием, статусом оборудования, задачами и отчетностью. О чем хотите узнать?",
      client: "Привет! Я помогу забронировать тур, проверить статус брони, узнать о погоде и получить контакты. Что вас интересует?",
      default: "Добро пожаловать в GTS AI Assistant! Готов ответить на ваши вопросы о бронированиях, услугах и работе системы."
    };
    return (greetings as Record<string, string>)[role] || greetings.default;
  }

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([initialMessage]);
    }
  }, [userRole]);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const generateResponse = (query: string): Message => {
    const responses = {
      kpi: {
        content: `📊 **KPI за текущий месяц:**\n\n• Выручка: ₽2,450,000 (+12%)\n• Новые клиенты: 156 (+8%)\n• Конверсия: 3.2% (+0.4%)\n• NPS: 87 (+3)\n• Средний чек: ₽15,700 (+5%)`,
        actions: [
          { label: "Детальный отчет", action: "detailed_report", data: { type: "kpi" } },
          { label: "Экспорт данных", action: "export", data: { format: "excel" } }
        ]
      },
      revenue: {
        content: `💰 **Выручка за неделю:**\n\n• Общая выручка: ₽420,000\n• Среднедневная: ₽60,000\n• Лучший день: Суббота (₽85,000)\n• Рост к прошлой неделе: +15%\n\n**По категориям:**\n• Яхты: ₽180,000\n• ATV: ₽120,000\n• Вертолеты: ₽120,000`,
        actions: [
          { label: "График выручки", action: "show_chart", data: { type: "revenue" } }
        ]
      },
      bookings: {
        content: `📅 **Бронирования сегодня:**\n\n• Новые брони: 8\n• Подтвержденные: 12\n• Отмененные: 2\n• На рассмотрении: 3\n\n**Горячие лиды:**\n• VIP яхт-тур на завтра\n• Корпоратив на 15 человек\n• Вертолетная экскурсия`,
        actions: [
          { label: "Открыть календарь", action: "open_calendar" },
          { label: "Горячие лиды", action: "hot_leads" }
        ]
      },
      team: {
        content: `👥 **Статус команды:**\n\n• Всего сотрудников: 24\n• На смене: 18\n• Доступны: 12\n• Загружены: 6\n\n**Алерты:**\n⚠️ Дефицит гидов на выходные\n✅ Все техники на месте\n🔔 День рождения у Анны (отдел продаж)`,
        actions: [
          { label: "Управление персоналом", action: "staff_management" },
          { label: "Расписание смен", action: "schedule" }
        ]
      },
      "my-bookings": {
        content: `📋 **Ваши активные бронирования:**\n\n**Сегодня:**\n• 14:00 - Яхт-тур (семья Ивановых)\n• 16:30 - ATV тур (группа 4 чел.)\n\n**Завтра:**\n• 10:00 - Вертолетная экскурсия\n• 15:00 - Горный тур на квадроциклах\n\n💰 Потенциальная комиссия: ₽8,400`,
        actions: [
          { label: "Детали бронирований", action: "booking_details" },
          { label: "Добавить клиента", action: "add_client" }
        ]
      },
      default: {
        content: "Понял ваш запрос. Обрабатываю информацию...",
        actions: []
      }
    };

    const key = Object.keys(responses).find(k => query.toLowerCase().includes(k.replace("-", ""))) || "default";
    const response = (responses as unknown as Record<string, typeof responses.default>)[key] || responses.default;

    return {
      id: Date.now().toString(),
      type: "assistant",
      content: response.content,
      timestamp: new Date(),
      actions: response.actions
    };
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const response = generateResponse(inputValue);
      setMessages(prev => [...prev, response]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: QuickAction) => {
    setInputValue(action.query);
    handleSendMessage();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#91040C] hover:bg-[#91040C]/80 shadow-lg z-50 p-0"
      >
        <MessageCircle className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${
      isMinimized ? 'w-80 h-16' : 'w-96 h-[600px]'
    }`}>
      <Card className="bg-[#121214] border-[#232428] h-full flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-[#232428]">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-[#91040C]/20 rounded-lg">
              <Bot className="w-4 h-4 text-[#91040C]" />
            </div>
            <div>
              <h3 className="text-white font-semibold">GTS AI Assistant</h3>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-[#A6A7AA] text-xs">Онлайн</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-[#A6A7AA] hover:text-white hover:bg-[#232428] h-8 w-8 p-0"
            >
              {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsOpen(false)}
              className="text-[#A6A7AA] hover:text-white hover:bg-[#232428] h-8 w-8 p-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {!isMinimized && (
          <>
            {/* Quick Actions */}
            <div className="p-4 border-b border-[#232428]">
              <h4 className="text-white text-sm font-medium mb-2">Быстрые действия:</h4>
              <div className="grid grid-cols-2 gap-2">
                {currentQuickActions.slice(0, 4).map((action) => (
                  <Button
                    key={action.id}
                    size="sm"
                    variant="outline"
                    onClick={() => handleQuickAction(action)}
                    className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428] justify-start h-8 text-xs"
                  >
                    <action.icon className="w-3 h-3 mr-1" />
                    {action.label}
                  </Button>
                ))}
              </div>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {message.type === "assistant" && (
                      <div className="p-1.5 bg-[#91040C]/20 rounded-lg flex-shrink-0 mt-1">
                        <Bot className="w-4 h-4 text-[#91040C]" />
                      </div>
                    )}
                    
                    <div className={`max-w-[80%] ${message.type === "user" ? "order-1" : ""}`}>
                      <div className={`p-3 rounded-lg ${
                        message.type === "user" 
                          ? "bg-[#91040C] text-white" 
                          : "bg-[#17181A] text-white"
                      }`}>
                        <div className="whitespace-pre-line text-sm">{message.content}</div>
                      </div>
                      
                      {message.actions && message.actions.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {message.actions.map((action, index) => (
                            <Button
                              key={index}
                              size="sm"
                              variant="outline"
                              className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428] h-6 text-xs"
                            >
                              {action.label}
                            </Button>
                          ))}
                        </div>
                      )}
                      
                      <div className="text-[#A6A7AA] text-xs mt-1">
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>

                    {message.type === "user" && (
                      <div className="p-1.5 bg-[#232428] rounded-lg flex-shrink-0 mt-1">
                        <User className="w-4 h-4 text-[#A6A7AA]" />
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-3 justify-start">
                    <div className="p-1.5 bg-[#91040C]/20 rounded-lg flex-shrink-0 mt-1">
                      <Bot className="w-4 h-4 text-[#91040C]" />
                    </div>
                    <div className="bg-[#17181A] p-3 rounded-lg">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-[#A6A7AA] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#A6A7AA] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#A6A7AA] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-[#232428]">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Задайте вопрос..."
                  className="bg-[#17181A] border-[#232428] text-white flex-1"
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim()}
                  className="bg-[#91040C] hover:bg-[#91040C]/80 h-10 w-10 p-0"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}