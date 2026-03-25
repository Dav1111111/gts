import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { 
  Settings,
  Plug,
  Shield,
  Bell,
  Palette,
  Database,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Key,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Globe,
  Smartphone,
  Mail,
  CreditCard,
  Activity,
  Server,
  Wifi,
  HardDrive,
  Cpu,
  MemoryStick
} from "lucide-react";

interface GTSSettingsIntegrationsProps {
  onBackToHome: () => void;
  onSendToInbox?: (alertData: any) => void;
}

const systemSettings = [
  {
    category: 'Общие настройки',
    settings: [
      { key: 'company_name', label: 'Название компании', value: 'Grand Tour Sochi', type: 'text' },
      { key: 'company_email', label: 'Email компании', value: 'info@gts.com', type: 'email' },
      { key: 'company_phone', label: 'Телефон', value: '+7 (862) 555-0123', type: 'tel' },
      { key: 'timezone', label: 'Часовой пояс', value: 'Europe/Moscow', type: 'select' },
      { key: 'currency', label: 'Валюта', value: 'RUB', type: 'select' },
      { key: 'language', label: 'Язык системы', value: 'ru', type: 'select' }
    ]
  },
  {
    category: 'Бронирования',
    settings: [
      { key: 'booking_advance_days', label: 'Бронирование за (дней)', value: '90', type: 'number' },
      { key: 'min_booking_time', label: 'Мин. время до начала', value: '2', type: 'number' },
      { key: 'auto_confirm', label: 'Автоподтверждение', value: 'true', type: 'boolean' },
      { key: 'send_reminders', label: 'Отправлять напоминания', value: 'true', type: 'boolean' }
    ]
  },
  {
    category: 'Платежи',
    settings: [
      { key: 'payment_methods', label: 'Способы оплаты', value: 'card,cash,transfer', type: 'multiselect' },
      { key: 'prepayment_percent', label: 'Предоплата (%)', value: '30', type: 'number' },
      { key: 'refund_policy', label: 'Политика возврата', value: '7', type: 'number' }
    ]
  }
];

const integrations = [
  {
    id: '1',
    name: 'Яндекс.Карты',
    description: 'Интеграция с картографическим сервисом',
    category: 'Карты',
    status: 'connected',
    icon: '🗺️',
    lastSync: '2024-02-12 14:30',
    settings: ['API ключ', 'Регион отображения']
  },
  {
    id: '2',
    name: 'Сбербанк Эквайринг',
    description: 'Прием онлайн платежей',
    category: 'Платежи',
    status: 'connected',
    icon: '💳',
    lastSync: '2024-02-12 15:45',
    settings: ['Merchant ID', 'Секретный ключ', 'Webhook URL']
  },
  {
    id: '3',
    name: 'Телеграм бот',
    description: 'Уведомления и поддержка в Telegram',
    category: 'Мессенджеры',
    status: 'disconnected',
    icon: '📱',
    lastSync: null,
    settings: ['Bot Token', 'Chat ID админов']
  },
  {
    id: '4',
    name: 'Email (SMTP)',
    description: 'Отправка email уведомлений',
    category: 'Email',
    status: 'connected',
    icon: '📧',
    lastSync: '2024-02-12 16:20',
    settings: ['SMTP сервер', 'Порт', 'Логин', 'Пароль']
  },
  {
    id: '5',
    name: 'Google Analytics',
    description: 'Аналитика веб-сайта',
    category: 'Аналитика',
    status: 'pending',
    icon: '📊',
    lastSync: null,
    settings: ['Tracking ID', 'Measurement ID']
  },
  {
    id: '6',
    name: '1С:Предприятие',
    description: 'Синхронизация с учетной системой',
    category: 'Учет',
    status: 'error',
    icon: '🏢',
    lastSync: '2024-02-10 09:15',
    settings: ['URL базы', 'Логин', 'Пароль', 'Справочники']
  }
];

const apiKeys = [
  {
    id: '1',
    name: 'Mobile App API',
    key: 'gts_mobile_***********',
    created: '2024-01-15',
    lastUsed: '2024-02-12',
    permissions: ['bookings', 'crew', 'notifications'],
    status: 'active'
  },
  {
    id: '2',
    name: 'Partner Portal API',
    key: 'gts_partner_***********',
    created: '2024-01-20',
    lastUsed: '2024-02-11',
    permissions: ['partners', 'commissions', 'reports'],
    status: 'active'
  },
  {
    id: '3',
    name: 'Webhook Test',
    key: 'gts_webhook_***********',
    created: '2024-02-01',
    lastUsed: null,
    permissions: ['webhooks'],
    status: 'inactive'
  }
];

export function GTSSettingsIntegrations({ onBackToHome, onSendToInbox }: GTSSettingsIntegrationsProps) {
  const [activeTab, setActiveTab] = useState('settings');
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<{[key: string]: "success" | "error" | "warning"}>({});

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected':
      case 'active': return 'bg-green-500';
      case 'pending': return 'bg-yellow-500';
      case 'disconnected':
      case 'inactive': return 'bg-gray-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'connected': return 'Подключено';
      case 'pending': return 'Настройка';
      case 'disconnected': return 'Отключено';
      case 'error': return 'Ошибка';
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      default: return status;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Карты': return Globe;
      case 'Платежи': return CreditCard;
      case 'Мессенджеры': return Smartphone;
      case 'Email': return Mail;
      case 'Аналитика': return Settings;
      case 'Учет': return Database;
      default: return Plug;
    }
  };

  // System Health Functions - migrated from PortalsDiagnostic
  const runSystemDiagnostics = async () => {
    const results: {[key: string]: "success" | "error" | "warning"} = {};

    // Test core system components
    const coreComponents = [
      'GTSUnifiedAppShell',
      'GTSExecutiveDashboard', 
      'GTSPartnersSystem',
      'GTSCRMSystem',
      'GTSStaffIAM',
      'GTSFinanceSystem',
      'GTSSettingsIntegrations'
    ];

    for (const component of coreComponents) {
      try {
        // Simulate component health check
        await new Promise(resolve => setTimeout(resolve, 100));
        results[component] = Math.random() > 0.1 ? "success" : "warning";
      } catch (error) {
        results[component] = "error";
      }
    }

    // Test UI components
    try {
      const { Button } = await import("../ui/button");
      results["Button"] = "success";
    } catch (error) {
      results["Button"] = "error";
    }

    try {
      const { Card } = await import("../ui/card");
      results["Card"] = "success";
    } catch (error) {
      results["Card"] = "error";
    }

    // Test portal components
    try {
      const { GTSPartnersSystem } = await import("./GTSPartnersSystem");
      results["GTSPartnersSystem"] = "success";
    } catch (error) {
      results["GTSPartnersSystem"] = "error";
    }

    setDiagnostics(results);
  };

  const getHealthStatusIcon = (status: "success" | "error" | "warning" | undefined) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 bg-gray-500 rounded-full" />;
    }
  };

  const systemComponents = [
    { name: "GTSUnifiedAppShell", description: "Главная оболочка приложения", category: "Core" },
    { name: "GTSExecutiveDashboard", description: "Панель руководителя", category: "Core" },
    { name: "GTSPartnersSystem", description: "Система партнеров", category: "Core" },
    { name: "GTSCRMSystem", description: "CRM система", category: "Core" },
    { name: "GTSStaffIAM", description: "Управление персоналом", category: "Core" },
    { name: "GTSFinanceSystem", description: "Финансовая система", category: "Core" },
    { name: "Button", description: "UI компонент Button", category: "UI" },
    { name: "Card", description: "UI компонент Card", category: "UI" }
  ];

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Header */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div>
              <h1 className="text-xl text-[--gts-portal-text]" style={{ fontFamily: 'var(--font-heading)' }}>
                Настройки и интеграции
              </h1>
              <p className="text-sm text-[--gts-portal-muted]">
                Системные настройки • Интеграции • API
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              <Shield className="w-4 h-4 mr-2" />
              Безопасность
            </Button>
            <Button
              className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
            >
              Сохранить изменения
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="settings" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
            <TabsTrigger value="integrations" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Plug className="w-4 h-4 mr-2" />
              Интеграции
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Key className="w-4 h-4 mr-2" />
              API ключи
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Уведомления
            </TabsTrigger>
            <TabsTrigger value="health" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Activity className="w-4 h-4 mr-2" />
              System Health
            </TabsTrigger>
          </TabsList>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            {systemSettings.map((category, categoryIndex) => (
              <Card key={categoryIndex} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">{category.category}</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.settings.map((setting, settingIndex) => (
                    <div key={settingIndex} className="space-y-2">
                      <label className="text-sm text-[--gts-portal-text] font-medium">
                        {setting.label}
                      </label>
                      
                      {setting.type === 'boolean' ? (
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={setting.value === 'true'}
                            onCheckedChange={(checked) => {
                              // Handle setting change
                              console.log(`${setting.key}: ${checked}`);
                            }}
                          />
                          <span className="text-sm text-[--gts-portal-muted]">
                            {setting.value === 'true' ? 'Включено' : 'Отключено'}
                          </span>
                        </div>
                      ) : (
                        <input
                          type={setting.type}
                          defaultValue={setting.value}
                          className="w-full p-2 bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg text-[--gts-portal-text]"
                          onChange={(e) => {
                            // Handle setting change
                            console.log(`${setting.key}: ${e.target.value}`);
                          }}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Внешние интеграции</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить интеграцию
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {integrations.map((integration) => {
                const IconComponent = getCategoryIcon(integration.category);
                return (
                  <Card 
                    key={integration.id} 
                    className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 cursor-pointer hover:bg-[--gts-portal-card] transition-colors"
                    onClick={() => setSelectedIntegration(integration.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[--gts-portal-card] rounded-lg flex items-center justify-center">
                          <span className="text-lg">{integration.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-[--gts-portal-text] font-medium">{integration.name}</h3>
                          <p className="text-xs text-[--gts-portal-muted]">{integration.category}</p>
                        </div>
                      </div>
                      <Badge className={`${getStatusColor(integration.status)} text-white text-xs`}>
                        {getStatusText(integration.status)}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-[--gts-portal-muted] mb-3">{integration.description}</p>
                    
                    {integration.lastSync && (
                      <p className="text-xs text-[--gts-portal-muted]">
                        Последняя синхронизация: {integration.lastSync}
                      </p>
                    )}
                    
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1 border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Settings className="w-3 h-3 mr-1" />
                        Настроить
                      </Button>
                      {integration.status === 'connected' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          Отключить
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                        >
                          Подключить
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* API Keys */}
          <TabsContent value="api" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">API ключи</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Создать ключ
              </Button>
            </div>

            <div className="grid gap-4">
              {apiKeys.map((apiKey) => (
                <Card key={apiKey.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[--gts-portal-text] font-medium">{apiKey.name}</h3>
                        <Badge className={`${getStatusColor(apiKey.status)} text-white text-xs`}>
                          {getStatusText(apiKey.status)}
                        </Badge>
                      </div>
                      
                      <div className="space-y-1 text-sm text-[--gts-portal-muted]">
                        <div className="font-mono text-[--gts-portal-text]">{apiKey.key}</div>
                        <div>Создан: {new Date(apiKey.created).toLocaleDateString('ru-RU')}</div>
                        {apiKey.lastUsed && (
                          <div>Последнее использование: {new Date(apiKey.lastUsed).toLocaleDateString('ru-RU')}</div>
                        )}
                        <div>Права: {apiKey.permissions.join(', ')}</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        Копировать
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500 text-red-500 hover:bg-red-500/10"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] font-medium mb-4">Настройки уведомлений</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[--gts-portal-text] font-medium mb-3">Email уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Новые бронирования</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Отмены бронирований</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Истечение документов</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Финансовые отчеты</span>
                      <Switch />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[--gts-portal-text] font-medium mb-3">SMS уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Экстренные ситуации</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Напоминания о сменах</span>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-[--gts-portal-text] font-medium mb-3">Push уведомления</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Новые сообщения</span>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-[--gts-portal-text]">Системные обновления</span>
                      <Switch />
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* System Health / Diagnostics - migrated from PortalsDiagnostic */}
          <TabsContent value="health" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg text-[--gts-portal-text]">System Health / Diagnostics</h2>
                <p className="text-sm text-[--gts-portal-muted]">
                  Диагностика компонентов системы и проверка работоспособности
                </p>
              </div>
              <Button
                onClick={runSystemDiagnostics}
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Activity className="w-4 h-4 mr-2" />
                Запустить диагностику
              </Button>
            </div>

            {/* System Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[--gts-portal-muted]">Системы</p>
                    <p className="text-2xl text-[--gts-portal-text] font-semibold">
                      {Object.values(diagnostics).filter(v => v === "success").length}/
                      {Object.keys(diagnostics).length || 8}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[--gts-portal-muted]">Uptime</p>
                    <p className="text-2xl text-[--gts-portal-text] font-semibold">99.9%</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Server className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[--gts-portal-muted]">Memory</p>
                    <p className="text-2xl text-[--gts-portal-text] font-semibold">2.1GB</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                    <MemoryStick className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-[--gts-portal-muted]">Response</p>
                    <p className="text-2xl text-[--gts-portal-text] font-semibold">120ms</p>
                  </div>
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                    <Wifi className="w-5 h-5 text-orange-400" />
                  </div>
                </div>
              </Card>
            </div>

            {/* Component Health Status */}
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] font-medium mb-4">Статус компонентов</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {systemComponents.map((component) => (
                  <div 
                    key={component.name} 
                    className="flex items-center justify-between p-3 bg-[--gts-portal-card] rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      {getHealthStatusIcon(diagnostics[component.name])}
                      <div>
                        <div className="text-[--gts-portal-text] font-medium text-sm">
                          {component.name}
                        </div>
                        <div className="text-[--gts-portal-muted] text-xs">
                          {component.description}
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge className={`${getStatusColor(diagnostics[component.name] || 'pending')} text-white text-xs`}>
                        {getStatusText(diagnostics[component.name] || 'pending')}
                      </Badge>
                      <div className="text-[--gts-portal-muted] text-xs mt-1">
                        {component.category}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* System Logs */}
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[--gts-portal-text] font-medium">Системные логи</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  Скачать логи
                </Button>
              </div>
              
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-start gap-3">
                  <span className="text-[--gts-portal-muted] text-xs whitespace-nowrap">
                    2024-02-12 16:45:12
                  </span>
                  <span className="text-green-400">[INFO]</span>
                  <span className="text-[--gts-portal-text]">
                    GTSUnifiedAppShell: Application shell initialized successfully
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[--gts-portal-muted] text-xs whitespace-nowrap">
                    2024-02-12 16:44:58
                  </span>
                  <span className="text-blue-400">[DEBUG]</span>
                  <span className="text-[--gts-portal-text]">
                    GTSPartnersSystem: Partners data loaded (47 partners)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[--gts-portal-muted] text-xs whitespace-nowrap">
                    2024-02-12 16:44:45
                  </span>
                  <span className="text-yellow-400">[WARN]</span>
                  <span className="text-[--gts-portal-text]">
                    GTSCRMSystem: High memory usage detected (1.8GB)
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[--gts-portal-muted] text-xs whitespace-nowrap">
                    2024-02-12 16:44:30
                  </span>
                  <span className="text-green-400">[INFO]</span>
                  <span className="text-[--gts-portal-text]">
                    GTSExecutiveDashboard: Financial data updated
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-[--gts-portal-muted] text-xs whitespace-nowrap">
                    2024-02-12 16:44:15
                  </span>
                  <span className="text-green-400">[INFO]</span>
                  <span className="text-[--gts-portal-text]">
                    GTSStaffIAM: User role permissions refreshed
                  </span>
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Производительность</h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[--gts-portal-muted]">CPU Usage</span>
                      <span className="text-[--gts-portal-text]">45%</span>
                    </div>
                    <div className="w-full bg-[--gts-portal-card] rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[--gts-portal-muted]">Memory Usage</span>
                      <span className="text-[--gts-portal-text]">68%</span>
                    </div>
                    <div className="w-full bg-[--gts-portal-card] rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[--gts-portal-muted]">Disk Usage</span>
                      <span className="text-[--gts-portal-text]">23%</span>
                    </div>
                    <div className="w-full bg-[--gts-portal-card] rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Сетевая активность</h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[--gts-portal-muted] text-sm">Активные соединения</span>
                    <span className="text-[--gts-portal-text] font-medium">47</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[--gts-portal-muted] text-sm">Входящий трафик</span>
                    <span className="text-[--gts-portal-text] font-medium">1.2 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[--gts-portal-muted] text-sm">Исходящий трафик</span>
                    <span className="text-[--gts-portal-text] font-medium">0.8 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[--gts-portal-muted] text-sm">API запросы/мин</span>
                    <span className="text-[--gts-portal-text] font-medium">234</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[--gts-portal-muted] text-sm">Ошибки API</span>
                    <span className="text-red-400 font-medium">3</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* Diagnostic Results Summary */}
            {Object.keys(diagnostics).length > 0 && (
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Результаты диагностики</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div>
                    <div className="text-2xl text-[--gts-portal-text] font-semibold">
                      {Object.keys(diagnostics).length}
                    </div>
                    <div className="text-sm text-[--gts-portal-muted]">Проверено компонентов</div>
                  </div>
                  <div>
                    <div className="text-2xl text-green-400 font-semibold">
                      {Object.values(diagnostics).filter(v => v === "success").length}
                    </div>
                    <div className="text-sm text-[--gts-portal-muted]">Работает нормально</div>
                  </div>
                  <div>
                    <div className="text-2xl text-yellow-400 font-semibold">
                      {Object.values(diagnostics).filter(v => v === "warning").length}
                    </div>
                    <div className="text-sm text-[--gts-portal-muted]">Предупреждения</div>
                  </div>
                  <div>
                    <div className="text-2xl text-red-400 font-semibold">
                      {Object.values(diagnostics).filter(v => v === "error").length}
                    </div>
                    <div className="text-sm text-[--gts-portal-muted]">Ошибки</div>
                  </div>
                </div>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}