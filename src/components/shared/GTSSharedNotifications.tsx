import React, { useState } from 'react';
import { Bell, MessageSquare, AlertCircle, CheckCircle, Clock, Paperclip, Send, Filter, Search, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface Ticket {
  id: string;
  subject: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'general' | 'feature';
  createdAt: string;
  updatedAt: string;
  assignee?: {
    name: string;
    avatar?: string;
  };
  messagesCount: number;
}

export interface TicketMessage {
  id: string;
  content: string;
  timestamp: string;
  author: {
    name: string;
    avatar?: string;
    isSupport: boolean;
  };
  attachments?: Array<{
    name: string;
    url: string;
    size: string;
  }>;
}

interface GTSSharedNotificationsProps {
  notifications: Notification[];
  tickets: Ticket[];
  onMarkNotificationRead: (notificationId: string) => void;
  onMarkAllNotificationsRead: () => void;
  onNotificationAction: (notificationId: string, actionUrl: string) => void;
  onCreateTicket: (ticket: Omit<Ticket, 'id' | 'createdAt' | 'updatedAt' | 'messagesCount'>) => void;
  onViewTicket: (ticketId: string) => void;
}

const notificationTypeColors = {
  info: 'bg-blue-500',
  warning: 'bg-[var(--gts-portal-warning)]',
  error: 'bg-[var(--gts-portal-error)]',
  success: 'bg-[var(--gts-portal-success)]'
};

const ticketStatusColors = {
  open: 'bg-blue-500 text-white',
  'in-progress': 'bg-[var(--gts-portal-warning)] text-white',
  resolved: 'bg-[var(--gts-portal-success)] text-white',
  closed: 'bg-gray-500 text-white'
};

const ticketPriorityColors = {
  low: 'bg-gray-500 text-white',
  medium: 'bg-blue-500 text-white',
  high: 'bg-[var(--gts-portal-warning)] text-white',
  urgent: 'bg-[var(--gts-portal-error)] text-white'
};

export function GTSSharedNotifications({
  notifications,
  tickets,
  onMarkNotificationRead,
  onMarkAllNotificationsRead,
  onNotificationAction,
  onCreateTicket,
  onViewTicket
}: GTSSharedNotificationsProps) {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationFilter, setNotificationFilter] = useState('all');
  const [ticketFilter, setTicketFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateTicket, setShowCreateTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({
    subject: '',
    category: 'general' as const,
    priority: 'medium' as const,
    status: 'open' as const
  });

  const unreadNotifications = notifications.filter(n => !n.read);

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = notificationFilter === 'all' || 
                         (notificationFilter === 'unread' && !notification.read) ||
                         (notificationFilter === 'read' && notification.read) ||
                         notification.type === notificationFilter;
    
    const matchesSearch = notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const filteredTickets = tickets.filter(ticket => {
    const matchesFilter = ticketFilter === 'all' || ticket.status === ticketFilter;
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleCreateTicket = () => {
    if (newTicket.subject.trim()) {
      onCreateTicket(newTicket);
      setNewTicket({
        subject: '',
        category: 'general',
        priority: 'medium',
        status: 'open'
      });
      setShowCreateTicket(false);
    }
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'info':
        return <Bell className="h-5 w-5" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5" />;
      case 'error':
        return <AlertCircle className="h-5 w-5" />;
      case 'success':
        return <CheckCircle className="h-5 w-5" />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading text-[var(--gts-portal-text)]">
            Уведомления и поддержка
          </h1>
          <p className="text-[var(--gts-portal-muted)]">
            Управление уведомлениями и тикетами поддержки
          </p>
        </div>
        {unreadNotifications.length > 0 && (
          <Badge className="bg-[var(--gts-portal-accent)] text-white">
            {unreadNotifications.length} новых
          </Badge>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid grid-cols-2 bg-[var(--gts-portal-card)]">
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Уведомления
            {unreadNotifications.length > 0 && (
              <Badge variant="destructive" className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                {unreadNotifications.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="tickets" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Тикеты поддержки
          </TabsTrigger>
        </TabsList>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--gts-portal-text)]">Уведомления</CardTitle>
                {unreadNotifications.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onMarkAllNotificationsRead}
                    className="text-[var(--gts-portal-text)] border-[var(--gts-portal-border)]"
                  >
                    Отметить все как прочитанные
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--gts-portal-muted)]" />
                  <Input
                    placeholder="Поиск уведомлений..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <Select value={notificationFilter} onValueChange={setNotificationFilter}>
                  <SelectTrigger className="w-48 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                    <SelectItem value="all">Все уведомления</SelectItem>
                    <SelectItem value="unread">Непрочитанные</SelectItem>
                    <SelectItem value="read">Прочитанные</SelectItem>
                    <SelectItem value="info">Информационные</SelectItem>
                    <SelectItem value="warning">Предупреждения</SelectItem>
                    <SelectItem value="error">Ошибки</SelectItem>
                    <SelectItem value="success">Успешные</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <ScrollArea className="h-96">
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 rounded-lg border ${
                        notification.read 
                          ? 'bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]' 
                          : 'bg-[var(--gts-portal-card)] border-[var(--gts-portal-accent)]/50'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${notificationTypeColors[notification.type]} text-white`}>
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-[var(--gts-portal-text)] font-medium">
                              {notification.title}
                            </h4>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-[var(--gts-portal-muted)]">
                                {new Date(notification.timestamp).toLocaleString('ru-RU')}
                              </span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => onMarkNotificationRead(notification.id)}
                                  className="text-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-surface)]"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-[var(--gts-portal-muted)] mb-3">
                            {notification.message}
                          </p>
                          {notification.actionUrl && notification.actionLabel && (
                            <Button
                              size="sm"
                              onClick={() => onNotificationAction(notification.id, notification.actionUrl!)}
                              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {filteredNotifications.length === 0 && (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-[var(--gts-portal-muted)] mx-auto mb-4" />
                  <div className="text-[var(--gts-portal-text)] font-medium mb-2">
                    Уведомления не найдены
                  </div>
                  <div className="text-[var(--gts-portal-muted)]">
                    Попробуйте изменить параметры фильтра
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tickets Tab */}
        <TabsContent value="tickets" className="space-y-6">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--gts-portal-text)]">Тикеты поддержки</CardTitle>
                <Button
                  onClick={() => setShowCreateTicket(true)}
                  className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Создать тикет
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {showCreateTicket && (
                <div className="mb-6 p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-[var(--gts-portal-text)] font-medium">Создать новый тикет</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowCreateTicket(false)}
                      className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="space-y-4">
                    <Input
                      placeholder="Тема тикета"
                      value={newTicket.subject}
                      onChange={(e) => setNewTicket({...newTicket, subject: e.target.value})}
                      className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Select value={newTicket.category} onValueChange={(value: any) => setNewTicket({...newTicket, category: value})}>
                        <SelectTrigger className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Техническая поддержка</SelectItem>
                          <SelectItem value="billing">Биллинг</SelectItem>
                          <SelectItem value="general">Общие вопросы</SelectItem>
                          <SelectItem value="feature">Новые функции</SelectItem>
                        </SelectContent>
                      </Select>
                      <Select value={newTicket.priority} onValueChange={(value: any) => setNewTicket({...newTicket, priority: value})}>
                        <SelectTrigger className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Низкий</SelectItem>
                          <SelectItem value="medium">Средний</SelectItem>
                          <SelectItem value="high">Высокий</SelectItem>
                          <SelectItem value="urgent">Срочный</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        onClick={handleCreateTicket}
                        className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
                      >
                        Создать тикет
                      </Button>
                      <Button
                        variant="outline"
                        onClick={() => setShowCreateTicket(false)}
                        className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                      >
                        Отмена
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--gts-portal-muted)]" />
                  <Input
                    placeholder="Поиск тикетов..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                  />
                </div>
                <Select value={ticketFilter} onValueChange={setTicketFilter}>
                  <SelectTrigger className="w-48 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                    <SelectItem value="all">Все тикеты</SelectItem>
                    <SelectItem value="open">Открытые</SelectItem>
                    <SelectItem value="in-progress">В работе</SelectItem>
                    <SelectItem value="resolved">Решенные</SelectItem>
                    <SelectItem value="closed">Закрытые</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                {filteredTickets.map((ticket) => (
                  <div
                    key={ticket.id}
                    className="p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)] hover:border-[var(--gts-portal-accent)]/50 cursor-pointer transition-colors"
                    onClick={() => onViewTicket(ticket.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="text-[var(--gts-portal-text)] font-medium">
                          {ticket.subject}
                        </h4>
                        <Badge className={ticketStatusColors[ticket.status]}>
                          {ticket.status === 'open' && 'Открыт'}
                          {ticket.status === 'in-progress' && 'В работе'}
                          {ticket.status === 'resolved' && 'Решен'}
                          {ticket.status === 'closed' && 'Закрыт'}
                        </Badge>
                        <Badge className={ticketPriorityColors[ticket.priority]}>
                          {ticket.priority === 'low' && 'Низкий'}
                          {ticket.priority === 'medium' && 'Средний'}
                          {ticket.priority === 'high' && 'Высокий'}
                          {ticket.priority === 'urgent' && 'Срочный'}
                        </Badge>
                      </div>
                      <span className="text-sm text-[var(--gts-portal-muted)]">
                        #{ticket.id}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-[var(--gts-portal-muted)]">
                        <span>Создан: {new Date(ticket.createdAt).toLocaleDateString('ru-RU')}</span>
                        <span>Обновлен: {new Date(ticket.updatedAt).toLocaleDateString('ru-RU')}</span>
                        <span>{ticket.messagesCount} сообщений</span>
                      </div>
                      {ticket.assignee && (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarImage src={ticket.assignee.avatar} alt={ticket.assignee.name} />
                            <AvatarFallback className="bg-[var(--gts-portal-card)] text-[var(--gts-portal-text)] text-xs">
                              {ticket.assignee.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className="text-sm text-[var(--gts-portal-muted)]">
                            {ticket.assignee.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {filteredTickets.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-[var(--gts-portal-muted)] mx-auto mb-4" />
                  <div className="text-[var(--gts-portal-text)] font-medium mb-2">
                    Тикеты не найдены
                  </div>
                  <div className="text-[var(--gts-portal-muted)]">
                    Попробуйте изменить параметры фильтра
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}