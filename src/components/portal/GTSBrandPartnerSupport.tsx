import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { HelpCircle, Plus, MessageCircle, Paperclip, Eye, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export function GTSBrandPartnerSupport() {
  const tickets = [
    {
      id: "TIC-2024-0089",
      title: "Проблема с начислением баллов за акцию 'Летние приключения'",
      category: "loyalty",
      priority: "high",
      status: "open",
      created: "2024-01-20",
      updated: "2024-01-20",
      messages: 3
    },
    {
      id: "TIC-2024-0088",
      title: "Запрос на изменение промо-материалов",
      category: "promotions",
      priority: "medium",
      status: "in_progress",
      created: "2024-01-19",
      updated: "2024-01-20",
      messages: 7
    },
    {
      id: "TIC-2024-0087",
      title: "Не отображается новая локация на карте",
      category: "technical",
      priority: "medium",
      status: "waiting_response",
      created: "2024-01-18",
      updated: "2024-01-19",
      messages: 4
    },
    {
      id: "TIC-2024-0086",
      title: "Вопрос по API интеграции для вебхуков",
      category: "technical",
      priority: "low",
      status: "resolved",
      created: "2024-01-15",
      updated: "2024-01-17",
      messages: 12
    }
  ];

  const faqItems = [
    {
      question: "Как начисляются баллы за кросс-промо?",
      answer: "Баллы начисляются автоматически при подтверждении бронирования с вашего сайта. Время зачисления: 1-3 рабочих дня.",
      category: "loyalty"
    },
    {
      question: "Можно ли изменить промо-материалы после запуска?",
      answer: "Да, но изменения требуют согласования. Создайте тикет с пометкой 'материалы' и приложите новые файлы.",
      category: "promotions"
    },
    {
      question: "Как добавить новую локацию в систему?",
      answer: "Используйте раздел 'Промо-инструменты' → 'Локации' → 'Добавить локацию'. Новые локации проходят модерацию 1-2 дня.",
      category: "locations"
    },
    {
      question: "Что делать если API возвращает ошибку 401?",
      answer: "Проверьте корректность API ключа и его права доступа. Если проблема не решается, создайте тикет с деталями запроса.",
      category: "technical"
    }
  ];

  const supportContacts = [
    {
      type: "Техническая поддержка",
      contact: "tech-support@grandtoursochi.ru",
      hours: "24/7",
      response: "до 4 часов"
    },
    {
      type: "Менеджер партнерств",
      contact: "partnerships@grandtoursochi.ru", 
      hours: "9:00-18:00 МСК",
      response: "до 24 часов"
    },
    {
      type: "Экстренная линия",
      contact: "+7 (800) 555-0199",
      hours: "24/7",
      response: "немедленно"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open": return "var(--gts-portal-error)";
      case "in_progress": return "var(--gts-portal-warning)";
      case "waiting_response": return "var(--gts-portal-muted)";
      case "resolved": return "var(--gts-portal-success)";
      default: return "var(--gts-portal-muted)";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "open": return "Открыт";
      case "in_progress": return "В работе";
      case "waiting_response": return "Ждет ответа";
      case "resolved": return "Решен";
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open": return AlertCircle;
      case "in_progress": return Clock;
      case "waiting_response": return Clock;
      case "resolved": return CheckCircle2;
      default: return HelpCircle;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "var(--gts-portal-error)";
      case "medium": return "var(--gts-portal-warning)";
      case "low": return "var(--gts-portal-success)";
      default: return "var(--gts-portal-muted)";
    }
  };

  const getCategoryText = (category: string) => {
    switch (category) {
      case "loyalty": return "Лояльность";
      case "promotions": return "Промо";
      case "technical": return "Техническая";
      case "materials": return "Материалы";
      case "locations": return "Локации";
      default: return category;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Поддержка
          </h1>
          <p style={{ color: "var(--gts-portal-muted)" }}>
            Тикеты поддержки, FAQ и контакты для решения вопросов
          </p>
        </div>
        <Button 
          style={{ 
            backgroundColor: "var(--gts-portal-accent)",
            color: "white"
          }}
        >
          <Plus size={16} className="mr-2" />
          Создать тикет
        </Button>
      </div>

      {/* Support Contacts */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <h3 className="text-lg mb-4" style={{ color: "var(--gts-portal-text)" }}>
          Контакты поддержки
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportContacts.map((contact, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: "var(--gts-portal-surface)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
                {contact.type}
              </h4>
              <div className="space-y-1 text-sm">
                <p style={{ color: "var(--gts-portal-text)" }}>
                  {contact.contact}
                </p>
                <p style={{ color: "var(--gts-portal-muted)" }}>
                  Часы работы: {contact.hours}
                </p>
                <p style={{ color: "var(--gts-portal-muted)" }}>
                  Ответ: {contact.response}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Current Tickets */}
      <Card 
        className="p-0 overflow-hidden"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="p-6 pb-0">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Мои тикеты
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Текущие и завершенные обращения в поддержку
          </p>
        </div>

        <div className="p-6 pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--gts-portal-border)" }}>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Тикет</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Категория</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Приоритет</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Статус</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Создан</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Сообщения</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tickets.map((ticket) => {
                  const StatusIcon = getStatusIcon(ticket.status);
                  
                  return (
                    <TableRow key={ticket.id} style={{ borderColor: "var(--gts-portal-border)" }}>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm" style={{ color: "var(--gts-portal-text)" }}>
                            {ticket.id}
                          </p>
                          <p className="text-xs mt-1" style={{ color: "var(--gts-portal-muted)" }}>
                            {ticket.title}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: "var(--gts-portal-border)",
                            color: "var(--gts-portal-muted)"
                          }}
                        >
                          {getCategoryText(ticket.category)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: getPriorityColor(ticket.priority),
                            color: getPriorityColor(ticket.priority)
                          }}
                        >
                          {ticket.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <StatusIcon size={16} style={{ color: getStatusColor(ticket.status) }} />
                          <span className="text-sm" style={{ color: getStatusColor(ticket.status) }}>
                            {getStatusText(ticket.status)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: "var(--gts-portal-text)" }}>
                        {ticket.created}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <MessageCircle size={14} style={{ color: "var(--gts-portal-muted)" }} />
                          <span className="text-sm" style={{ color: "var(--gts-portal-text)" }}>
                            {ticket.messages}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm">
                          <Eye size={14} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Create New Ticket */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <h3 className="text-lg mb-4" style={{ color: "var(--gts-portal-text)" }}>
          Создать новый тикет
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="ticket-title" style={{ color: "var(--gts-portal-text)" }}>
                Заголовок *
              </Label>
              <Input 
                id="ticket-title"
                placeholder="Кратко опишите проблему"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              />
            </div>

            <div>
              <Label htmlFor="ticket-category" style={{ color: "var(--gts-portal-text)" }}>
                Категория *
              </Label>
              <select 
                id="ticket-category"
                className="w-full px-3 py-2 rounded-md border"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              >
                <option value="">Выберите категорию</option>
                <option value="loyalty">Программа лояльности</option>
                <option value="promotions">Промо-акции</option>
                <option value="technical">Техническая поддержка</option>
                <option value="materials">Материалы и утверждения</option>
                <option value="locations">Локации</option>
                <option value="other">Другое</option>
              </select>
            </div>

            <div>
              <Label htmlFor="ticket-priority" style={{ color: "var(--gts-portal-text)" }}>
                Приоритет
              </Label>
              <select 
                id="ticket-priority"
                className="w-full px-3 py-2 rounded-md border"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              >
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="ticket-description" style={{ color: "var(--gts-portal-text)" }}>
                Описание *
              </Label>
              <Textarea 
                id="ticket-description"
                placeholder="Подробно опишите проблему или вопрос"
                rows={6}
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              />
            </div>

            <div>
              <Label style={{ color: "var(--gts-portal-text)" }}>
                Прикрепить файлы
              </Label>
              <div 
                className="border-2 border-dashed rounded-lg p-4 text-center"
                style={{ borderColor: "var(--gts-portal-border)" }}
              >
                <Paperclip size={24} className="mx-auto mb-2" style={{ color: "var(--gts-portal-muted)" }} />
                <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
                  Перетащите файлы сюда или нажмите для выбора
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button 
            style={{ 
              backgroundColor: "var(--gts-portal-accent)",
              color: "white"
            }}
          >
            Создать тикет
          </Button>
        </div>
      </Card>

      {/* FAQ */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <h3 className="text-lg mb-4" style={{ color: "var(--gts-portal-text)" }}>
          Часто задаваемые вопросы
        </h3>

        <div className="space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: "var(--gts-portal-surface)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-start gap-3">
                <HelpCircle size={20} className="mt-0.5" style={{ color: "var(--gts-portal-accent)" }} />
                <div className="flex-1">
                  <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
                    {item.question}
                  </h4>
                  <p className="text-sm mb-2" style={{ color: "var(--gts-portal-muted)" }}>
                    {item.answer}
                  </p>
                  <Badge 
                    variant="outline"
                    className="text-xs"
                    style={{ 
                      borderColor: "var(--gts-portal-border)",
                      color: "var(--gts-portal-muted)"
                    }}
                  >
                    {getCategoryText(item.category)}
                  </Badge>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}