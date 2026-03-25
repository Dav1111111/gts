import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Switch } from '../../ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { 
  ArrowLeft, Plus, Settings, CheckCircle, XCircle, AlertCircle,
  BarChart3, TrendingUp, Calendar, Mail, Bell, Download,
  Globe, RefreshCw, Play, Pause, Edit, Trash2, Copy,
  Key, Database, Cloud, Zap, Activity, Target, DollarSign,
  Users, Eye, Clock, Send, FileText, Filter, Search,
  ExternalLink, Upload, Save, AlertTriangle, MonitorSpeaker,
  Webhook, Code, Shield, Server, Smartphone, MessageSquare,
  Instagram, Youtube, Phone, CreditCard, LineChart, Building2
} from 'lucide-react';

interface APIIntegrationsProps {
  userRole: string;
}

interface Integration {
  id: string;
  name: string;
  category: 'crm' | 'marketing' | 'analytics' | 'payment' | 'telephony' | 'other';
  provider: string;
  status: 'connected' | 'disconnected' | 'error' | 'development';
  lastSync?: string;
  description: string;
  icon: React.ReactNode;
  metrics?: {
    requests: number;
    success: number;
    errors: number;
  };
  config?: Record<string, any>;
}

interface Webhook {
  id: string;
  name: string;
  event: string;
  url: string;
  method: 'POST' | 'PUT' | 'PATCH';
  active: boolean;
  format: 'json' | 'xml' | 'form';
  successCount: number;
  errorCount: number;
  lastTrigger?: string;
  responseTime: number;
}

interface Automation {
  id: string;
  name: string;
  trigger: string;
  action: string;
  active: boolean;
  triggerCount: number;
  errorCount: number;
  lastRun?: string;
  description: string;
}

interface APIKey {
  id: string;
  name: string;
  environment: 'test' | 'production';
  key: string;
  permissions: string[];
  lastUsed?: string;
  created: string;
  expiresAt?: string;
}

export function GTSAPIIntegrationsExtended({ userRole }: APIIntegrationsProps) {
  const [activeTab, setActiveTab] = useState('integrations');
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [environment, setEnvironment] = useState<'test' | 'production'>('test');
  const [webhookFilter, setWebhookFilter] = useState('all');
  const [isTestingWebhook, setIsTestingWebhook] = useState<string | null>(null);

  // Mock данные интеграций
  const integrations: Integration[] = [
    {
      id: 'yclients',
      name: 'YClients CRM',
      category: 'crm',
      provider: 'YClients',
      status: 'connected',
      lastSync: '2024-06-20T14:30:00Z',
      description: 'Синхронизация лидов и бронирований',
      icon: <Building2 className="w-5 h-5" />,
      metrics: { requests: 1247, success: 1205, errors: 42 },
      config: { apiKey: '***hidden***', syncInterval: '15min' }
    },
    {
      id: 'avito',
      name: 'Avito API',
      category: 'marketing',
      provider: 'Avito',
      status: 'connected',
      lastSync: '2024-06-20T13:15:00Z',
      description: 'Автоматическое размещение объявлений',
      icon: <Target className="w-5 h-5" />,
      metrics: { requests: 89, success: 87, errors: 2 }
    },
    {
      id: 'instagram',
      name: 'Instagram Business',
      category: 'marketing',
      provider: 'Meta',
      status: 'connected',
      lastSync: '2024-06-20T15:45:00Z',
      description: 'Публикация контента и получение статистики',
      icon: <Instagram className="w-5 h-5" />,
      metrics: { requests: 234, success: 230, errors: 4 }
    },
    {
      id: 'telegram',
      name: 'Telegram Bot',
      category: 'marketing',
      provider: 'Telegram',
      status: 'connected',
      lastSync: '2024-06-20T16:00:00Z',
      description: 'Уведомления и бот поддержки',
      icon: <MessageSquare className="w-5 h-5" />,
      metrics: { requests: 567, success: 567, errors: 0 }
    },
    {
      id: 'yandex-metrica',
      name: 'Яндекс.Метрика',
      category: 'analytics',
      provider: 'Yandex',
      status: 'connected',
      lastSync: '2024-06-20T16:30:00Z',
      description: 'Веб-аналитика и статистика',
      icon: <LineChart className="w-5 h-5" />,
      metrics: { requests: 45, success: 45, errors: 0 }
    },
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'analytics',
      provider: 'Google',
      status: 'error',
      lastSync: '2024-06-19T12:00:00Z',
      description: 'Детальная аналитика посещений',
      icon: <BarChart3 className="w-5 h-5" />,
      metrics: { requests: 23, success: 0, errors: 23 }
    },
    {
      id: 'youtube',
      name: 'YouTube API',
      category: 'marketing',
      provider: 'Google',
      status: 'connected',
      lastSync: '2024-06-20T11:20:00Z',
      description: 'Публикация видео и статистика',
      icon: <Youtube className="w-5 h-5" />,
      metrics: { requests: 12, success: 12, errors: 0 }
    },
    {
      id: 'payment',
      name: 'Платёжные системы',
      category: 'payment',
      provider: 'Various',
      status: 'development',
      description: 'Интеграция с платёжными провайдерами',
      icon: <CreditCard className="w-5 h-5" />
    },
    {
      id: 'telephony',
      name: 'IP-телефония',
      category: 'telephony',
      provider: 'VoIP Provider',
      status: 'development',
      description: 'Интеграция с телефонной системой',
      icon: <Phone className="w-5 h-5" />
    }
  ];

  // Mock данные вебхуков
  const webhooks: Webhook[] = [
    {
      id: 'new-booking',
      name: 'Новая бронь',
      event: 'booking.created',
      url: 'https://api.partner.com/bookings',
      method: 'POST',
      active: true,
      format: 'json',
      successCount: 156,
      errorCount: 3,
      lastTrigger: '2024-06-20T16:45:00Z',
      responseTime: 245
    },
    {
      id: 'booking-status',
      name: 'Изменение статуса брони',
      event: 'booking.updated',
      url: 'https://crm.gts.ru/webhooks/booking-update',
      method: 'POST',
      active: true,
      format: 'json',
      successCount: 89,
      errorCount: 1,
      lastTrigger: '2024-06-20T15:30:00Z',
      responseTime: 180
    },
    {
      id: 'new-lead',
      name: 'Новый лид',
      event: 'lead.created',
      url: 'https://marketing.gts.ru/leads',
      method: 'POST',
      active: true,
      format: 'json',
      successCount: 234,
      errorCount: 12,
      lastTrigger: '2024-06-20T16:50:00Z',
      responseTime: 320
    },
    {
      id: 'fleet-update',
      name: 'Обновление техники',
      event: 'fleet.updated',
      url: 'https://partners.gts.ru/fleet-sync',
      method: 'PUT',
      active: false,
      format: 'json',
      successCount: 45,
      errorCount: 0,
      lastTrigger: '2024-06-19T14:20:00Z',
      responseTime: 156
    },
    {
      id: 'crm-import',
      name: 'Импорт данных CRM',
      event: 'crm.import.completed',
      url: 'https://notifications.gts.ru/import-complete',
      method: 'POST',
      active: true,
      format: 'json',
      successCount: 12,
      errorCount: 0,
      lastTrigger: '2024-06-20T09:00:00Z',
      responseTime: 89
    }
  ];

  // Mock данные автоматизаций
  const automations: Automation[] = [
    {
      id: 'lead-to-slack',
      name: 'Уведомление о новом лиде',
      trigger: 'Новый лид в CRM',
      action: 'Отправить сообщение в Slack #marketing',
      active: true,
      triggerCount: 156,
      errorCount: 2,
      lastRun: '2024-06-20T16:50:00Z',
      description: 'Автоматически уведомляет маркетинговую команду о новых лидах'
    },
    {
      id: 'booking-to-avito',
      name: 'Обновление объявлений Avito',
      trigger: 'Изменение доступности техники',
      action: 'Обновить статус в Avito',
      active: true,
      triggerCount: 89,
      errorCount: 5,
      lastRun: '2024-06-20T15:30:00Z',
      description: 'Синхронизирует доступность техники с объявлениями'
    },
    {
      id: 'daily-import',
      name: 'Ежедневный импорт CRM',
      trigger: 'Расписание: каждый день в 09:00',
      action: 'Импорт данных из YClients',
      active: true,
      triggerCount: 30,
      errorCount: 1,
      lastRun: '2024-06-20T09:00:00Z',
      description: 'Автоматический импорт новых данных из CRM системы'
    },
    {
      id: 'hourly-stats',
      name: 'Обновление статистики',
      trigger: 'Расписание: каждый час',
      action: 'Получить данные из аналитики',
      active: false,
      triggerCount: 120,
      errorCount: 8,
      lastRun: '2024-06-20T15:00:00Z',
      description: 'Регулярное обновление аналитических данных'
    }
  ];

  // Mock данные API ключей
  const apiKeys: APIKey[] = [
    {
      id: 'mobile-app',
      name: 'Mobile App API',
      environment: 'production',
      key: 'gts_prod_***************',
      permissions: ['bookings:read', 'fleet:read', 'users:read'],
      lastUsed: '2024-06-20T16:45:00Z',
      created: '2024-01-15T10:00:00Z',
      expiresAt: '2025-01-15T10:00:00Z'
    },
    {
      id: 'partner-portal',
      name: 'Partner Portal',
      environment: 'production',
      key: 'gts_prod_***************',
      permissions: ['bookings:read', 'fleet:read', 'reports:read'],
      lastUsed: '2024-06-20T14:20:00Z',
      created: '2024-02-01T12:00:00Z'
    },
    {
      id: 'testing-env',
      name: 'Development Testing',
      environment: 'test',
      key: 'gts_test_***************',
      permissions: ['*'],
      lastUsed: '2024-06-20T11:30:00Z',
      created: '2024-06-18T09:00:00Z',
      expiresAt: '2024-12-31T23:59:59Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'text-green-500';
      case 'disconnected': return 'text-gray-500';
      case 'error': return 'text-red-500';
      case 'development': return 'text-yellow-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <CheckCircle className="w-4 h-4" />;
      case 'disconnected': return <XCircle className="w-4 h-4" />;
      case 'error': return <AlertCircle className="w-4 h-4" />;
      case 'development': return <Clock className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected': return <Badge className="bg-green-500/10 text-green-500">Подключено</Badge>;
      case 'disconnected': return <Badge variant="secondary">Отключено</Badge>;
      case 'error': return <Badge variant="destructive">Ошибка</Badge>;
      case 'development': return <Badge variant="outline" className="text-yellow-600">В разработке</Badge>;
      default: return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'Никогда';
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const testWebhook = async (webhookId: string) => {
    setIsTestingWebhook(webhookId);
    // Симуляция тестирования
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsTestingWebhook(null);
  };

  const filteredIntegrations = integrations.filter(integration => {
    if (userRole === 'manager' && integration.category === 'payment') return false;
    return true;
  });

  const filteredWebhooks = webhooks.filter(webhook => {
    if (webhookFilter === 'all') return true;
    if (webhookFilter === 'active') return webhook.active;
    if (webhookFilter === 'inactive') return !webhook.active;
    if (webhookFilter === 'errors') return webhook.errorCount > 0;
    return true;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1>API Интеграции</h1>
          <p className="text-muted-foreground">
            Управление внешними подключениями, вебхуками и автоматизацией
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={environment} onValueChange={(value: 'test' | 'production') => setEnvironment(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="test">Test</SelectItem>
              <SelectItem value="production">Production</SelectItem>
            </SelectContent>
          </Select>
          <Badge variant={environment === 'production' ? 'destructive' : 'outline'}>
            {environment === 'production' ? 'PROD' : 'TEST'}
          </Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="integrations">Интеграции</TabsTrigger>
          <TabsTrigger value="webhooks">Вебхуки</TabsTrigger>
          <TabsTrigger value="automations">Автоматизация</TabsTrigger>
          <TabsTrigger value="monitoring">Мониторинг</TabsTrigger>
          <TabsTrigger value="keys">API Ключи</TabsTrigger>
        </TabsList>

        {/* Каталог интеграций */}
        <TabsContent value="integrations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Каталог интеграций</h2>
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Добавить интеграцию
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить новую интеграцию</DialogTitle>
                  <DialogDescription>
                    Настройте подключение к внешнему сервису
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>Тип интеграции</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="crm">CRM</SelectItem>
                        <SelectItem value="marketing">Маркетинг</SelectItem>
                        <SelectItem value="analytics">Аналитика</SelectItem>
                        <SelectItem value="other">Другое</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Название</Label>
                    <Input placeholder="Название интеграции" />
                  </div>
                  <div>
                    <Label>URL</Label>
                    <Input placeholder="https://api.example.com" />
                  </div>
                  <div>
                    <Label>API ключ</Label>
                    <Input type="password" placeholder="Введите API ключ" />
                  </div>
                  <Button className="w-full">
                    <Zap className="w-4 h-4 mr-2" />
                    Протестировать подключение
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map((integration) => (
              <Card key={integration.id} className="hover:shadow-lg transition-all duration-200 cursor-pointer">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        integration.status === 'connected' ? 'bg-green-500/10' :
                        integration.status === 'error' ? 'bg-red-500/10' :
                        integration.status === 'development' ? 'bg-yellow-500/10' :
                        'bg-gray-500/10'
                      }`}>
                        {integration.icon}
                      </div>
                      <div>
                        <h3 className="font-medium">{integration.name}</h3>
                        <p className="text-sm text-muted-foreground">{integration.provider}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(integration.status)}`}>
                      {getStatusIcon(integration.status)}
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4">{integration.description}</p>

                  <div className="space-y-3">
                    {getStatusBadge(integration.status)}
                    
                    {integration.lastSync && (
                      <div className="text-xs text-muted-foreground">
                        Последняя синхронизация: {formatDate(integration.lastSync)}
                      </div>
                    )}

                    {integration.metrics && (
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Запросы</p>
                          <p className="font-medium">{integration.metrics.requests}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Успешно</p>
                          <p className="font-medium text-green-500">{integration.metrics.success}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Ошибки</p>
                          <p className="font-medium text-red-500">{integration.metrics.errors}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2">
                      {integration.status !== 'development' && (
                        <>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Settings className="w-3 h-3 mr-1" />
                            Настроить
                          </Button>
                          <Button variant="outline" size="sm">
                            <RefreshCw className="w-3 h-3" />
                          </Button>
                        </>
                      )}
                      {integration.status === 'development' && (
                        <Button variant="outline" size="sm" className="w-full" disabled>
                          <Clock className="w-3 h-3 mr-1" />
                          В разработке
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Управление вебхуками */}
        <TabsContent value="webhooks" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Управление вебхуками</h2>
            <div className="flex items-center gap-3">
              <Select value={webhookFilter} onValueChange={setWebhookFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="inactive">Неактивные</SelectItem>
                  <SelectItem value="errors">С ошибками</SelectItem>
                </SelectContent>
              </Select>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить вебхук
              </Button>
            </div>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Событие</TableHead>
                  <TableHead>URL</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Статистика</TableHead>
                  <TableHead>Время ответа</TableHead>
                  <TableHead>Последний вызов</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWebhooks.map((webhook) => (
                  <TableRow key={webhook.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{webhook.name}</p>
                        <p className="text-sm text-muted-foreground">{webhook.event}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {webhook.method}
                        </code>
                        <span className="text-sm truncate max-w-48">{webhook.url}</span>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={webhook.active} size="sm" />
                        <Badge variant={webhook.active ? "default" : "secondary"}>
                          {webhook.active ? 'Активен' : 'Отключен'}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-green-500">{webhook.successCount}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="text-red-500">{webhook.errorCount}</span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {webhook.format.toUpperCase()}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <span className={webhook.responseTime < 200 ? 'text-green-500' : 
                                        webhook.responseTime < 500 ? 'text-yellow-500' : 'text-red-500'}>
                          {webhook.responseTime}ms
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        {formatDate(webhook.lastTrigger)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => testWebhook(webhook.id)}
                          disabled={isTestingWebhook === webhook.id}
                        >
                          {isTestingWebhook === webhook.id ? (
                            <RefreshCw className="w-3 h-3 animate-spin" />
                          ) : (
                            <Zap className="w-3 h-3" />
                          )}
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Автоматизации процессов */}
        <TabsContent value="automations" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Автоматизации процессов</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать сценарий
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {automations.map((automation) => (
              <Card key={automation.id} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">{automation.name}</h3>
                  <div className="flex items-center gap-2">
                    <Switch checked={automation.active} size="sm" />
                    <Badge variant={automation.active ? "default" : "secondary"}>
                      {automation.active ? 'Активен' : 'Отключен'}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4">{automation.description}</p>

                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-blue-500/10 rounded-full">
                      <Play className="w-4 h-4 text-blue-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Триггер</p>
                      <p className="text-xs text-muted-foreground">{automation.trigger}</p>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <ArrowLeft className="w-4 h-4 text-muted-foreground rotate-90" />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-green-500/10 rounded-full">
                      <Zap className="w-4 h-4 text-green-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Действие</p>
                      <p className="text-xs text-muted-foreground">{automation.action}</p>
                    </div>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Выполнено</p>
                    <p className="font-medium">{automation.triggerCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Ошибки</p>
                    <p className="font-medium text-red-500">{automation.errorCount}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Последний запуск</p>
                    <p className="font-medium text-xs">{formatDate(automation.lastRun)}</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Edit className="w-3 h-3 mr-1" />
                    Редактировать
                  </Button>
                  <Button variant="outline" size="sm">
                    <Play className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Мониторинг API */}
        <TabsContent value="monitoring" className="space-y-6">
          <h2>Мониторинг API</h2>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <BarChart3 className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего запросов</p>
                  <p className="text-2xl font-semibold">2,456</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Успешных</p>
                  <p className="text-2xl font-semibold">2,346</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-500/10 rounded-lg">
                  <XCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Ошибок</p>
                  <p className="text-2xl font-semibold">110</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Среднее время</p>
                  <p className="text-2xl font-semibold">245ms</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Статус интеграций</h3>
              <div className="space-y-3">
                {integrations.filter(i => i.status !== 'development').map((integration) => (
                  <div key={integration.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {integration.icon}
                      <span className="font-medium">{integration.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        integration.status === 'connected' ? 'bg-green-500' :
                        integration.status === 'error' ? 'bg-red-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm text-muted-foreground">
                        {integration.metrics?.requests || 0} запросов
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Последние ошибки</h3>
              <ScrollArea className="h-64">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Google Analytics API</p>
                      <p className="text-xs text-muted-foreground">
                        401 Unauthorized - Invalid credentials
                      </p>
                      <p className="text-xs text-muted-foreground">
                        20.06.2024 16:45
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Instagram Business API</p>
                      <p className="text-xs text-muted-foreground">
                        Rate limit exceeded
                      </p>
                      <p className="text-xs text-muted-foreground">
                        20.06.2024 15:30
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-3 border rounded-lg">
                    <AlertTriangle className="w-4 h-4 text-red-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Webhook: booking.created</p>
                      <p className="text-xs text-muted-foreground">
                        Timeout after 30s
                      </p>
                      <p className="text-xs text-muted-foreground">
                        20.06.2024 14:20
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollArea>
            </Card>
          </div>
        </TabsContent>

        {/* Управление ключами */}
        <TabsContent value="keys" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2>Управление API ключами</h2>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Создать ключ
            </Button>
          </div>

          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название</TableHead>
                  <TableHead>Среда</TableHead>
                  <TableHead>Ключ</TableHead>
                  <TableHead>Права доступа</TableHead>
                  <TableHead>Последнее использование</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{key.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Создан: {formatDate(key.created)}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={key.environment === 'production' ? 'destructive' : 'outline'}>
                        {key.environment === 'production' ? 'PROD' : 'TEST'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <code className="text-xs bg-muted px-2 py-1 rounded">
                          {key.key}
                        </code>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {key.permissions.slice(0, 2).map((permission, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {permission}
                          </Badge>
                        ))}
                        {key.permissions.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{key.permissions.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        {formatDate(key.lastUsed)}
                        {key.expiresAt && (
                          <p className="text-xs text-muted-foreground">
                            Истекает: {formatDate(key.expiresAt)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <RefreshCw className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Настройки доступа</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Executive</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Полный доступ к интеграциям и настройкам
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="default" className="text-xs">Все действия</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Разработчики</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Создание интеграций и управление ключами
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Создание</Badge>
                    <Badge variant="outline" className="text-xs">Настройка</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">Менеджеры</h4>
                  <p className="text-sm text-muted-foreground mb-3">
                    Просмотр статуса и основных метрик
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="secondary" className="text-xs">Только чтение</Badge>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}