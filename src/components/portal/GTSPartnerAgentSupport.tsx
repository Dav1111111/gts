import { useState } from "react";
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Paperclip, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  ExternalLink,
  Filter
} from "lucide-react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";

interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  created: string;
  lastUpdate: string;
  messages: Message[];
}

interface Message {
  id: string;
  sender: 'agent' | 'support';
  senderName: string;
  content: string;
  timestamp: string;
  attachments?: string[];
}

const mockTickets: Ticket[] = [
  {
    id: "TIC-2024-001",
    subject: "Комиссия не начислена за бронирование GTS-2024-045",
    status: "in_progress",
    priority: "medium",
    category: "Commissions",
    created: "2024-02-20",
    lastUpdate: "2024-02-22",
    messages: [
      {
        id: "MSG-001",
        sender: "agent",
        senderName: "You",
        content: "Здравствуйте! Клиент совершил бронирование 3 дня назад, но комиссия до сих пор не начислена. Номер бронирования: GTS-2024-045.",
        timestamp: "2024-02-20 14:30"
      },
      {
        id: "MSG-002",
        sender: "support",
        senderName: "Анна Петрова",
        content: "Добрый день! Проверяем информацию по вашему бронированию. Обычно обработка занимает 2-3 рабочих дня. Свяжемся с вами в течение дня.",
        timestamp: "2024-02-21 10:15"
      },
      {
        id: "MSG-003",
        sender: "support",
        senderName: "Анна Петрова",
        content: "Комиссия по бронированию начислена. Задержка была связана с техническими неполадками. Приносим извинения за неудобства.",
        timestamp: "2024-02-22 09:45"
      }
    ]
  },
  {
    id: "TIC-2024-002",
    subject: "Проблема с генерацией промо-ссылки",
    status: "resolved",
    priority: "low",
    category: "Technical",
    created: "2024-02-18",
    lastUpdate: "2024-02-19",
    messages: [
      {
        id: "MSG-004",
        sender: "agent",
        senderName: "You",
        content: "При попытке создать промо-ссылку возникает ошибка. Можете помочь?",
        timestamp: "2024-02-18 16:20"
      },
      {
        id: "MSG-005",
        sender: "support",
        senderName: "Дмитрий Козлов",
        content: "Проблема исправлена. Теперь генерация ссылок работает корректно. Спасибо за обращение!",
        timestamp: "2024-02-19 11:30"
      }
    ]
  }
];

const faqItems = [
  {
    question: "Как начисляется комиссия?",
    answer: "Комиссия начисляется автоматически после подтверждения бронирования клиентом. Обычно это происходит в течение 24-48 часов после успешного завершения услуги."
  },
  {
    question: "Когда я могу запросить выплату?",
    answer: "Выплаты можно запрашивать при накоплении суммы от 10,000 рублей. Обработка запроса занимает 3-5 рабочих дней."
  },
  {
    question: "Как отследить эффективность промо-ссылок?",
    answer: "Статистика по каждой промо-ссылке доступна в разделе 'Promo Tools'. Вы можете видеть количество кликов, конверсий и общую эффективность кампаний."
  },
  {
    question: "Могу ли я изменить реквизиты для выплат?",
    answer: "Да, реквизиты можно изменить в профиле или при создании запроса на выплату. Изменения вступают в силу с следующей выплаты."
  },
  {
    question: "Как добавить клиента в систему?",
    answer: "Клиенты добавляются автоматически при первом бронировании по вашей промо-ссылке. Вручную добавлять клиентов не требуется."
  }
];

const statusConfig = {
  open: { label: "Open", color: "var(--gts-portal-warning)", icon: Clock },
  in_progress: { label: "In Progress", color: "var(--gts-portal-accent)", icon: AlertCircle },
  resolved: { label: "Resolved", color: "var(--gts-portal-success)", icon: CheckCircle },
  closed: { label: "Closed", color: "var(--gts-portal-muted)", icon: CheckCircle }
};

const priorityConfig = {
  low: { label: "Low", color: "var(--gts-portal-muted)" },
  medium: { label: "Medium", color: "var(--gts-portal-warning)" },
  high: { label: "High", color: "var(--gts-portal-accent)" },
  urgent: { label: "Urgent", color: "var(--gts-portal-error)" }
};

export function GTSPartnerAgentSupport() {
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [newTicketOpen, setNewTicketOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newMessage, setNewMessage] = useState("");
  
  // New ticket form
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketCategory, setTicketCategory] = useState("");
  const [ticketPriority, setTicketPriority] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");

  const filteredTickets = mockTickets.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ticket.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || ticket.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const sendMessage = () => {
    if (!newMessage.trim() || !selectedTicket) return;
    
    // In a real implementation, you would send the message to the server
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 
            className="text-2xl font-bold"
            style={{ 
              color: 'var(--gts-portal-text)',
              fontFamily: 'var(--font-heading)'
            }}
          >
            Support Center
          </h1>
          <p 
            className="mt-2"
            style={{ color: 'var(--gts-portal-muted)' }}
          >
            Get help from our support team and access helpful resources
          </p>
        </div>
        
        <Dialog open={newTicketOpen} onOpenChange={setNewTicketOpen}>
          <DialogTrigger asChild>
            <Button 
              className="flex items-center gap-2"
              style={{
                backgroundColor: 'var(--gts-portal-accent)',
                color: 'white'
              }}
            >
              <Plus className="w-4 h-4" />
              New Ticket
            </Button>
          </DialogTrigger>
          <DialogContent 
            className="max-w-2xl"
            style={{ 
              backgroundColor: 'var(--gts-portal-surface)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <DialogHeader>
              <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
                Create New Support Ticket
              </DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Subject</Label>
                <Input
                  placeholder="Briefly describe your issue"
                  value={ticketSubject}
                  onChange={(e) => setTicketSubject(e.target.value)}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label style={{ color: 'var(--gts-portal-text)' }}>Category</Label>
                  <Select value={ticketCategory} onValueChange={setTicketCategory}>
                    <SelectTrigger 
                      style={{
                        backgroundColor: 'var(--gts-portal-surface)',
                        borderColor: 'var(--gts-portal-border)',
                        color: 'var(--gts-portal-text)'
                      }}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="commissions">Commissions</SelectItem>
                      <SelectItem value="payouts">Payouts</SelectItem>
                      <SelectItem value="technical">Technical Issue</SelectItem>
                      <SelectItem value="account">Account</SelectItem>
                      <SelectItem value="general">General</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label style={{ color: 'var(--gts-portal-text)' }}>Priority</Label>
                  <Select value={ticketPriority} onValueChange={setTicketPriority}>
                    <SelectTrigger 
                      style={{
                        backgroundColor: 'var(--gts-portal-surface)',
                        borderColor: 'var(--gts-portal-border)',
                        color: 'var(--gts-portal-text)'
                      }}
                    >
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div>
                <Label style={{ color: 'var(--gts-portal-text)' }}>Description</Label>
                <Textarea
                  placeholder="Provide detailed information about your issue..."
                  value={ticketDescription}
                  onChange={(e) => setTicketDescription(e.target.value)}
                  rows={6}
                  style={{
                    backgroundColor: 'var(--gts-portal-surface)',
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline"
                  onClick={() => setNewTicketOpen(false)}
                  style={{
                    borderColor: 'var(--gts-portal-border)',
                    color: 'var(--gts-portal-text)'
                  }}
                >
                  Cancel
                </Button>
                <Button 
                  style={{
                    backgroundColor: 'var(--gts-portal-accent)',
                    color: 'white'
                  }}
                  onClick={() => setNewTicketOpen(false)}
                >
                  Create Ticket
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Tickets List */}
        <div className="lg:col-span-1">
          <Card 
            style={{ 
              backgroundColor: 'var(--gts-portal-card)',
              borderColor: 'var(--gts-portal-border)'
            }}
          >
            <div className="p-4 border-b" style={{ borderColor: 'var(--gts-portal-border)' }}>
              <div className="space-y-3">
                <div className="relative">
                  <Search 
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                    style={{ color: 'var(--gts-portal-muted)' }}
                  />
                  <Input
                    placeholder="Search tickets..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    style={{
                      backgroundColor: 'var(--gts-portal-surface)',
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  />
                </div>
                
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger 
                    style={{
                      backgroundColor: 'var(--gts-portal-surface)',
                      borderColor: 'var(--gts-portal-border)',
                      color: 'var(--gts-portal-text)'
                    }}
                  >
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="open">Open</SelectItem>
                    <SelectItem value="in_progress">In Progress</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="closed">Closed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="divide-y" style={{ borderColor: 'var(--gts-portal-border)' }}>
              {filteredTickets.map((ticket) => {
                const statusConfig_ = statusConfig[ticket.status];
                const priorityConfig_ = priorityConfig[ticket.priority];
                const StatusIcon = statusConfig_.icon;
                
                return (
                  <div
                    key={ticket.id}
                    className={`p-4 cursor-pointer hover:bg-opacity-50 ${
                      selectedTicket?.id === ticket.id ? 'border-l-4' : ''
                    }`}
                    style={{ 
                      backgroundColor: selectedTicket?.id === ticket.id 
                        ? 'var(--gts-portal-surface)' 
                        : 'transparent',
                      borderLeftColor: selectedTicket?.id === ticket.id 
                        ? 'var(--gts-portal-accent)' 
                        : 'transparent'
                    }}
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span 
                        className="text-xs font-mono"
                        style={{ color: 'var(--gts-portal-muted)' }}
                      >
                        {ticket.id}
                      </span>
                      <Badge 
                        className="text-xs"
                        style={{
                          backgroundColor: `${priorityConfig_.color}20`,
                          color: priorityConfig_.color
                        }}
                      >
                        {priorityConfig_.label}
                      </Badge>
                    </div>
                    
                    <h4 
                      className="font-medium text-sm mb-2 line-clamp-2"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {ticket.subject}
                    </h4>
                    
                    <div className="flex items-center justify-between">
                      <Badge 
                        className="flex items-center gap-1 text-xs"
                        style={{
                          backgroundColor: `${statusConfig_.color}20`,
                          color: statusConfig_.color
                        }}
                      >
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig_.label}
                      </Badge>
                      <span 
                        className="text-xs"
                        style={{ color: 'var(--gts-portal-muted)' }}
                      >
                        {ticket.lastUpdate}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Ticket Detail / FAQ */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <Card 
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              {/* Ticket Header */}
              <div className="p-6 border-b" style={{ borderColor: 'var(--gts-portal-border)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 
                      className="text-lg font-semibold mb-2"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      {selectedTicket.subject}
                    </h2>
                    <div className="flex items-center gap-4 text-sm">
                      <span style={{ color: 'var(--gts-portal-muted)' }}>
                        ID: {selectedTicket.id}
                      </span>
                      <span style={{ color: 'var(--gts-portal-muted)' }}>
                        Category: {selectedTicket.category}
                      </span>
                      <span style={{ color: 'var(--gts-portal-muted)' }}>
                        Created: {selectedTicket.created}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge 
                      style={{
                        backgroundColor: `${statusConfig[selectedTicket.status].color}20`,
                        color: statusConfig[selectedTicket.status].color
                      }}
                    >
                      {statusConfig[selectedTicket.status].label}
                    </Badge>
                    <Badge 
                      style={{
                        backgroundColor: `${priorityConfig[selectedTicket.priority].color}20`,
                        color: priorityConfig[selectedTicket.priority].color
                      }}
                    >
                      {priorityConfig[selectedTicket.priority].label}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="p-6">
                <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                  {selectedTicket.messages.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${
                        message.sender === 'agent' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div 
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'agent'
                            ? 'bg-blue-500 text-white'
                            : ''
                        }`}
                        style={{
                          backgroundColor: message.sender === 'agent' 
                            ? 'var(--gts-portal-accent)' 
                            : 'var(--gts-portal-surface)',
                          color: message.sender === 'agent' 
                            ? 'white' 
                            : 'var(--gts-portal-text)'
                        }}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span 
                            className={`text-sm font-medium ${
                              message.sender === 'agent' ? 'text-blue-100' : ''
                            }`}
                            style={{
                              color: message.sender === 'agent' 
                                ? 'rgba(255,255,255,0.8)' 
                                : 'var(--gts-portal-text)'
                            }}
                          >
                            {message.senderName}
                          </span>
                          <span 
                            className={`text-xs ${
                              message.sender === 'agent' ? 'text-blue-100' : ''
                            }`}
                            style={{
                              color: message.sender === 'agent' 
                                ? 'rgba(255,255,255,0.6)' 
                                : 'var(--gts-portal-muted)'
                            }}
                          >
                            {message.timestamp}
                          </span>
                        </div>
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                {selectedTicket.status !== 'closed' && (
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <Textarea
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        rows={3}
                        style={{
                          backgroundColor: 'var(--gts-portal-surface)',
                          borderColor: 'var(--gts-portal-border)',
                          color: 'var(--gts-portal-text)'
                        }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Button 
                        size="sm"
                        variant="outline"
                        style={{
                          borderColor: 'var(--gts-portal-border)',
                          color: 'var(--gts-portal-text)'
                        }}
                      >
                        <Paperclip className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm"
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        style={{
                          backgroundColor: 'var(--gts-portal-accent)',
                          color: 'white'
                        }}
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          ) : (
            <Card 
              style={{ 
                backgroundColor: 'var(--gts-portal-card)',
                borderColor: 'var(--gts-portal-border)'
              }}
            >
              <div className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <HelpCircle className="w-5 h-5" style={{ color: 'var(--gts-portal-accent)' }} />
                  <h3 
                    className="text-lg font-semibold"
                    style={{ color: 'var(--gts-portal-text)' }}
                  >
                    Frequently Asked Questions
                  </h3>
                </div>
                
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger 
                        style={{ color: 'var(--gts-portal-text)' }}
                      >
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent 
                        style={{ color: 'var(--gts-portal-muted)' }}
                      >
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
                
                <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-surface)' }}>
                  <div className="text-center">
                    <h4 
                      className="font-medium mb-2"
                      style={{ color: 'var(--gts-portal-text)' }}
                    >
                      Still need help?
                    </h4>
                    <p 
                      className="text-sm mb-4"
                      style={{ color: 'var(--gts-portal-muted)' }}
                    >
                      Can't find what you're looking for? Our support team is here to help.
                    </p>
                    <Button 
                      onClick={() => setNewTicketOpen(true)}
                      style={{
                        backgroundColor: 'var(--gts-portal-accent)',
                        color: 'white'
                      }}
                    >
                      Create Support Ticket
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}