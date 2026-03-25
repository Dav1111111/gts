import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  MessageSquare,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  AlertCircle,
  Search,
  Plus,
  Send,
  Paperclip,
  ExternalLink
} from "lucide-react";

export function GTSContractorSupport() {
  const [newTicketSubject, setNewTicketSubject] = useState("");
  const [newTicketMessage, setNewTicketMessage] = useState("");
  const [selectedPriority, setSelectedPriority] = useState("medium");
  const [selectedCategory, setSelectedCategory] = useState("technical");

  // Mock support data
  const supportTickets = [
    {
      id: "TICKET-001",
      subject: "Проблема с системой бронирования",
      category: "technical",
      priority: "high" as const,
      status: "open" as const,
      created: "2024-02-12",
      lastUpdate: "2024-02-12 15:30",
      messages: 3,
      assignedTo: "Техническая поддержка"
    },
    {
      id: "TICKET-002",
      subject: "Вопрос по комиссионной структуре",
      category: "billing",
      priority: "medium" as const,
      status: "in_progress" as const,
      created: "2024-02-10",
      lastUpdate: "2024-02-11 09:15",
      messages: 5,
      assignedTo: "Финансовый отдел"
    },
    {
      id: "TICKET-003",
      subject: "Обновление документов",
      category: "general",
      priority: "low" as const,
      status: "resolved" as const,
      created: "2024-02-08",
      lastUpdate: "2024-02-09 14:20",
      messages: 2,
      assignedTo: "Администрация"
    }
  ];

  const faqItems = [
    {
      id: "faq-1",
      question: "Как обновить расписание доступности техники?",
      answer: "Перейдите в раздел 'Мой флот', выберите нужную единицу техники и нажмите кнопку 'Обновить доступность'. Все изменения проходят модерацию перед публикацией.",
      category: "fleet"
    },
    {
      id: "faq-2",
      question: "Когда происходят выплаты?",
      answer: "Выплаты производятся два раза в месяц - 15 и 30 числа. Обработка занимает 1-3 рабочих дня после подтверждения всех документов.",
      category: "billing"
    },
    {
      id: "faq-3",
      question: "Что делать при поломке техники во время аренды?",
      answer: "Немедленно свяжитесь с диспетчерской службой по телефону +7 (862) 555-DISP. Обеспечьте безопасность клиентов и следуйте инструкциям оператора.",
      category: "emergency"
    },
    {
      id: "faq-4",
      question: "Как загрузить новые документы?",
      answer: "В разделе 'Документы' нажмите 'Загрузить документ', выберите категорию и загрузите файл. Документы проходят проверку в течение 2-5 рабочих дней.",
      category: "documents"
    }
  ];

  const contactInfo = [
    {
      type: "emergency",
      title: "Экстренная служба",
      description: "24/7 помощь при инцидентах",
      contact: "+7 (800) 911-000",
      icon: AlertCircle,
      color: "#E5484D"
    },
    {
      type: "technical",
      title: "Техническая поддержка",
      description: "Помощь по системе и документам",
      contact: "+7 (800) 555-TECH",
      icon: MessageSquare,
      color: "#0EA5E9"
    },
    {
      type: "billing",
      title: "Финансовые вопросы",
      description: "Выплаты и комиссии",
      contact: "finance@gts-sochi.ru",
      icon: Mail,
      color: "#2BB673"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return '#F5A623';
      case 'in_progress': return '#0EA5E9';
      case 'resolved': return '#2BB673';
      case 'closed': return '#A6A7AA';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'open': return 'Открыт';
      case 'in_progress': return 'В работе';
      case 'resolved': return 'Решен';
      case 'closed': return 'Закрыт';
      default: return 'Неизвестно';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#E5484D';
      case 'medium': return '#F5A623';
      case 'low': return '#2BB673';
      default: return '#A6A7AA';
    }
  };

  const handleCreateTicket = () => {
    // Handle ticket creation
    setNewTicketSubject("");
    setNewTicketMessage("");
    setSelectedPriority("medium");
    setSelectedCategory("technical");
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ 
            fontFamily: 'Nokia.Kokia, Inter, sans-serif',
            color: '#FFFFFF'
          }}
        >
          Поддержка
        </h1>
        <p 
          className="text-lg"
          style={{ 
            color: '#A6A7AA',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          Техническая поддержка и помощь
        </p>
      </div>

      {/* Quick Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {contactInfo.map((contact) => {
          const Icon = contact.icon;
          return (
            <Card 
              key={contact.type}
              className="p-6 border-0 hover:shadow-lg transition-shadow cursor-pointer"
              style={{ backgroundColor: '#17181A' }}
            >
              <div className="text-center">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: contact.color }}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 
                  className="font-bold mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                  }}
                >
                  {contact.title}
                </h3>
                <p 
                  className="text-sm mb-3"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {contact.description}
                </p>
                <p 
                  className="font-medium"
                  style={{ 
                    color: contact.color,
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {contact.contact}
                </p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="tickets" className="space-y-6">
        <TabsList 
          className="grid w-full grid-cols-3"
          style={{ backgroundColor: '#121214' }}
        >
          <TabsTrigger value="tickets">Мои обращения</TabsTrigger>
          <TabsTrigger value="new-ticket">Новое обращение</TabsTrigger>
          <TabsTrigger value="faq">База знаний</TabsTrigger>
        </TabsList>

        {/* Support Tickets */}
        <TabsContent value="tickets">
          <Card 
            className="border-0"
            style={{ backgroundColor: '#17181A' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#232428' }}>
              <div className="flex items-center justify-between">
                <h3 
                  className="text-lg font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                  }}
                >
                  История обращений
                </h3>
                <div className="flex items-center gap-3">
                  <span 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Всего: {supportTickets.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {supportTickets.map((ticket) => (
                  <div 
                    key={ticket.id}
                    className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer"
                    style={{ 
                      backgroundColor: '#121214',
                      borderColor: '#232428'
                    }}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h4 
                            className="font-medium"
                            style={{ 
                              color: '#FFFFFF',
                              fontFamily: 'Gilroy, Inter, sans-serif'
                            }}
                          >
                            {ticket.subject}
                          </h4>
                          <Badge 
                            className="text-xs"
                            style={{ 
                              backgroundColor: getPriorityColor(ticket.priority),
                              color: '#FFFFFF'
                            }}
                          >
                            {ticket.priority === 'high' ? 'Высокий' :
                             ticket.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>
                        
                        <p 
                          className="text-sm"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          #{ticket.id} • {ticket.assignedTo}
                        </p>
                      </div>

                      <Badge 
                        style={{ 
                          backgroundColor: getStatusColor(ticket.status),
                          color: '#FFFFFF'
                        }}
                      >
                        {getStatusText(ticket.status)}
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-4">
                        <span 
                          className="flex items-center gap-1"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          <MessageSquare className="w-3 h-3" />
                          {ticket.messages} сообщений
                        </span>
                        <span 
                          className="flex items-center gap-1"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          <Clock className="w-3 h-3" />
                          Создан {new Date(ticket.created).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      
                      <span 
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        Обновлен {ticket.lastUpdate}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* New Ticket */}
        <TabsContent value="new-ticket">
          <Card 
            className="p-6 border-0"
            style={{ backgroundColor: '#17181A' }}
          >
            <h3 
              className="text-lg font-medium mb-6"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Создать обращение
            </h3>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Категория
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger 
                      className="border-0"
                      style={{ 
                        backgroundColor: '#121214',
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                      <SelectItem value="technical">Техническая поддержка</SelectItem>
                      <SelectItem value="billing">Финансовые вопросы</SelectItem>
                      <SelectItem value="fleet">Управление флотом</SelectItem>
                      <SelectItem value="documents">Документы</SelectItem>
                      <SelectItem value="general">Общие вопросы</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label 
                    className="block text-sm font-medium mb-2"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Приоритет
                  </label>
                  <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                    <SelectTrigger 
                      className="border-0"
                      style={{ 
                        backgroundColor: '#121214',
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                      <SelectItem value="low">Низкий</SelectItem>
                      <SelectItem value="medium">Средний</SelectItem>
                      <SelectItem value="high">Высокий</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Тема обращения
                </label>
                <Input
                  value={newTicketSubject}
                  onChange={(e) => setNewTicketSubject(e.target.value)}
                  placeholder="Кратко опишите проблему..."
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Описание проблемы
                </label>
                <Textarea
                  value={newTicketMessage}
                  onChange={(e) => setNewTicketMessage(e.target.value)}
                  placeholder="Подробно опишите проблему или вопрос..."
                  rows={6}
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                />
              </div>

              <div 
                className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-800/20"
                style={{ borderColor: '#232428' }}
              >
                <Paperclip className="w-6 h-6 mx-auto mb-2" style={{ color: '#A6A7AA' }} />
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Прикрепить файлы (необязательно)
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Сохранить черновик
                </Button>
                <Button
                  onClick={handleCreateTicket}
                  className="flex-1"
                  style={{ 
                    backgroundColor: '#91040C',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Отправить обращение
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq">
          <Card 
            className="border-0"
            style={{ backgroundColor: '#17181A' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#232428' }}>
              <div className="flex items-center justify-between">
                <h3 
                  className="text-lg font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                  }}
                >
                  Часто задаваемые вопросы
                </h3>
                
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                  <Input
                    placeholder="Поиск по вопросам..."
                    className="pl-10 border-0 w-64"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {faqItems.map((item) => (
                  <div 
                    key={item.id}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: '#121214' }}
                  >
                    <h4 
                      className="font-medium mb-2"
                      style={{ 
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {item.question}
                    </h4>
                    <p 
                      className="text-sm"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-center">
                <Button
                  variant="outline"
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Полная база знаний
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}