import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Switch } from "../../ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { 
  ArrowLeft, Plus, Settings, CheckCircle, XCircle, AlertCircle,
  BarChart3, TrendingUp, Calendar, Mail, Bell, Download,
  Globe, Facebook, RefreshCw, Play, Pause, Edit, Trash2,
  Key, Database, Cloud, Zap, Activity, Target, DollarSign,
  Users, Eye, Clock, Send, FileText, Filter, Search,
  ExternalLink, Copy, Share2, Upload, Save, AlertTriangle
} from "lucide-react";

interface GTSAPIIntegrationsModuleProps {
  onBack: () => void;
}

// API Integration status and configuration
interface APIIntegration {
  id: string;
  name: string;
  provider: string;
  status: 'connected' | 'disconnected' | 'error' | 'syncing';
  lastSync: string;
  dataPoints: number;
  errorMessage?: string;
  config: {
    apiKey?: string;
    accountId?: string;
    propertyId?: string;
    refreshToken?: string;
    webhookUrl?: string;
  };
  metrics: {
    dailyApiCalls: number;
    monthlyLimit: number;
    dataAccuracy: number;
    responseTime: number;
  };
  features: string[];
}

// Automated report configuration
interface AutomatedReport {
  id: string;
  name: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  recipients: string[];
  dataSources: string[];
  sections: string[];
  nextRun: string;
  lastRun?: string;
  status: 'active' | 'paused' | 'error';
  template: string;
  customFilters: Record<string, any>;
}

// Mock integrations data
const mockIntegrations: APIIntegration[] = [
  {
    id: "ga4",
    name: "Google Analytics 4",
    provider: "Google",
    status: "connected",
    lastSync: "2024-12-01T15:30:00Z",
    dataPoints: 1247856,
    config: {
      propertyId: "GA4-123456789",
      apiKey: "AIza***************",
      refreshToken: "1//04***************"
    },
    metrics: {
      dailyApiCalls: 2850,
      monthlyLimit: 50000,
      dataAccuracy: 98.7,
      responseTime: 145
    },
    features: [
      "Real-time analytics",
      "Custom conversions",
      "Audience insights", 
      "Attribution modeling",
      "Enhanced ecommerce"
    ]
  },
  {
    id: "facebook-ads",
    name: "Facebook Ads API",
    provider: "Meta",
    status: "connected",
    lastSync: "2024-12-01T15:25:00Z",
    dataPoints: 456789,
    config: {
      apiKey: "EAA***************",
      accountId: "act_123456789"
    },
    metrics: {
      dailyApiCalls: 1245,
      monthlyLimit: 20000,
      dataAccuracy: 96.3,
      responseTime: 89
    },
    features: [
      "Campaign performance",
      "Audience insights",
      "Creative analytics",
      "Attribution data",
      "Budget optimization"
    ]
  },
  {
    id: "google-ads",
    name: "Google Ads API",
    provider: "Google",
    status: "syncing",
    lastSync: "2024-12-01T15:20:00Z",
    dataPoints: 789123,
    config: {
      apiKey: "AIza***************",
      accountId: "123-456-7890",
      refreshToken: "1//04***************"
    },
    metrics: {
      dailyApiCalls: 1890,
      monthlyLimit: 25000,
      dataAccuracy: 99.1,
      responseTime: 67
    },
    features: [
      "Campaign management",
      "Keyword performance",
      "Quality score",
      "Conversion tracking",
      "Smart bidding"
    ]
  },
  {
    id: "yandex-metrika",
    name: "Yandex Metrika",
    provider: "Yandex",
    status: "error",
    lastSync: "2024-11-30T10:15:00Z",
    dataPoints: 234567,
    errorMessage: "Authentication token expired",
    config: {
      apiKey: "AgA***************",
      accountId: "98765432"
    },
    metrics: {
      dailyApiCalls: 0,
      monthlyLimit: 10000,
      dataAccuracy: 0,
      responseTime: 0
    },
    features: [
      "Website analytics",
      "Heat maps",
      "Session recordings",
      "Form analytics",
      "Conversion funnels"
    ]
  }
];

// Mock automated reports
const mockReports: AutomatedReport[] = [
  {
    id: "report-001",
    name: "Еженедельный отчет по маркетингу",
    description: "Комплексная аналитика по всем каналам привлечения с ROI и конверсиями",
    frequency: "weekly",
    recipients: ["ceo@gts.ru", "marketing@gts.ru", "analytics@gts.ru"],
    dataSources: ["ga4", "facebook-ads", "google-ads"],
    sections: ["traffic", "conversions", "roi", "channels", "campaigns"],
    nextRun: "2024-12-08T09:00:00Z",
    lastRun: "2024-12-01T09:00:00Z",
    status: "active",
    template: "executive-summary",
    customFilters: {
      dateRange: "7d",
      minConversions: 1,
      channels: ["all"]
    }
  },
  {
    id: "report-002", 
    name: "Ежемесячный финансовый отчет",
    description: "Детальная финансовая аналитика с прогнозами и бюджетированием",
    frequency: "monthly",
    recipients: ["cfo@gts.ru", "finance@gts.ru"],
    dataSources: ["ga4", "facebook-ads", "google-ads", "crm"],
    sections: ["revenue", "costs", "profit", "forecasts", "budget"],
    nextRun: "2024-12-31T23:59:00Z",
    lastRun: "2024-11-30T23:59:00Z",
    status: "active",
    template: "financial-detailed",
    customFilters: {
      dateRange: "30d",
      includeForecast: true,
      currency: "RUB"
    }
  },
  {
    id: "report-003",
    name: "Ежедневная сводка по лидам",
    description: "Оперативная информация о новых лидах и их источниках",
    frequency: "daily",
    recipients: ["sales@gts.ru", "manager@gts.ru"],
    dataSources: ["ga4", "crm", "facebook-ads"],
    sections: ["leads", "sources", "quality", "assignments"],
    nextRun: "2024-12-02T08:00:00Z",
    lastRun: "2024-12-01T08:00:00Z",
    status: "active",
    template: "leads-summary",
    customFilters: {
      dateRange: "1d",
      minLeadScore: 50,
      includeMQL: true
    }
  },
  {
    id: "report-004",
    name: "Квартальный стратегический отчет",
    description: "Комплексный анализ для принятия стратегических решений",
    frequency: "quarterly",
    recipients: ["ceo@gts.ru", "board@gts.ru"],
    dataSources: ["ga4", "facebook-ads", "google-ads", "crm", "finance"],
    sections: ["performance", "trends", "opportunities", "recommendations", "benchmarks"],
    nextRun: "2024-12-31T18:00:00Z",
    lastRun: "2024-09-30T18:00:00Z",
    status: "paused",
    template: "strategic-analysis",
    customFilters: {
      dateRange: "90d",
      includeYoY: true,
      benchmarkData: true
    }
  }
];

export function GTSAPIIntegrationsModule({ onBack }: GTSAPIIntegrationsModuleProps) {
  const [activeTab, setActiveTab] = useState("integrations");
  const [integrations, setIntegrations] = useState<APIIntegration[]>(mockIntegrations);
  const [reports, setReports] = useState<AutomatedReport[]>(mockReports);
  const [showIntegrationDialog, setShowIntegrationDialog] = useState(false);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<APIIntegration | null>(null);
  const [selectedReport, setSelectedReport] = useState<AutomatedReport | null>(null);
  const [isCreatingReport, setIsCreatingReport] = useState(false);

  // Real-time sync status simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIntegrations(prev => prev.map(integration => {
        if (integration.status === 'syncing') {
          return {
            ...integration,
            lastSync: new Date().toISOString(),
            dataPoints: integration.dataPoints + Math.floor(Math.random() * 100)
          };
        }
        return integration;
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      connected: "text-green-400 bg-green-500/10",
      disconnected: "text-gray-400 bg-gray-500/10",
      error: "text-red-400 bg-red-500/10",
      syncing: "text-blue-400 bg-blue-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return CheckCircle;
      case 'disconnected': return XCircle;
      case 'error': return AlertCircle;
      case 'syncing': return RefreshCw;
      default: return AlertCircle;
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Только что';
    if (diffInMinutes < 60) return `${diffInMinutes}м назад`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}ч назад`;
    return `${Math.floor(diffInMinutes / 1440)}д назад`;
  };

  const handleSyncIntegration = useCallback((integrationId: string) => {
    setIntegrations(prev => prev.map(integration => 
      integration.id === integrationId
        ? { ...integration, status: 'syncing' as const }
        : integration
    ));

    // Simulate sync completion
    setTimeout(() => {
      setIntegrations(prev => prev.map(integration => 
        integration.id === integrationId
          ? { 
              ...integration, 
              status: 'connected' as const,
              lastSync: new Date().toISOString(),
              dataPoints: integration.dataPoints + Math.floor(Math.random() * 1000)
            }
          : integration
      ));
    }, 3000);
  }, []);

  const handleToggleReport = useCallback((reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId
        ? { 
            ...report, 
            status: report.status === 'active' ? 'paused' : 'active'
          }
        : report
    ));
  }, []);

  const handleRunReport = useCallback((reportId: string) => {
    setReports(prev => prev.map(report => 
      report.id === reportId
        ? { 
            ...report, 
            lastRun: new Date().toISOString()
          }
        : report
    ));
  }, []);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                API интеграции и автоматизация
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Подключение внешних сервисов и настройка автоматических отчетов
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
              <Settings className="h-4 w-4 mr-2" />
              Настройки
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Добавить интеграцию
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Активные интеграции</p>
                  <p className="text-xl font-heading text-white">
                    {integrations.filter(i => i.status === 'connected').length}
                  </p>
                  <p className="text-xs text-green-400">из {integrations.length} подключений</p>
                </div>
                <Cloud className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Данных обработано</p>
                  <p className="text-xl font-heading text-white">
                    {formatNumber(integrations.reduce((sum, i) => sum + i.dataPoints, 0))}
                  </p>
                  <p className="text-xs text-blue-400">за все время</p>
                </div>
                <Database className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Автоотчеты</p>
                  <p className="text-xl font-heading text-white">
                    {reports.filter(r => r.status === 'active').length}
                  </p>
                  <p className="text-xs text-purple-400">активных отчетов</p>
                </div>
                <FileText className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">API вызовов сегодня</p>
                  <p className="text-xl font-heading text-white">
                    {formatNumber(integrations.reduce((sum, i) => sum + i.metrics.dailyApiCalls, 0))}
                  </p>
                  <p className="text-xs text-yellow-400">из лимитов</p>
                </div>
                <Zap className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 bg-[#121214] border-[#232428]">
            <TabsTrigger value="integrations" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Globe className="h-4 w-4 mr-2" />
              Интеграции
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <FileText className="h-4 w-4 mr-2" />
              Автоматические отчеты
            </TabsTrigger>
            <TabsTrigger value="webhooks" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              <Zap className="h-4 w-4 mr-2" />
              Webhooks и события
            </TabsTrigger>
          </TabsList>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="mt-6">
            <div className="space-y-4">
              {integrations.map(integration => {
                const StatusIcon = getStatusIcon(integration.status);
                return (
                  <Card key={integration.id} className="bg-[#121214] border-[#232428]">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-[#17181A] flex items-center justify-center">
                            {integration.provider === 'Google' && <Globe className="h-6 w-6 text-blue-400" />}
                            {integration.provider === 'Meta' && <Facebook className="h-6 w-6 text-blue-600" />}
                            {integration.provider === 'Yandex' && <BarChart3 className="h-6 w-6 text-red-500" />}
                          </div>
                          <div>
                            <h3 className="text-lg font-heading text-white mb-1">{integration.name}</h3>
                            <div className="flex items-center gap-3">
                              <Badge className={getStatusColor(integration.status)}>
                                <StatusIcon className={`h-3 w-3 mr-1 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
                                {integration.status === 'connected' ? 'Подключено' :
                                 integration.status === 'disconnected' ? 'Отключено' :
                                 integration.status === 'error' ? 'Ошибка' : 'Синхронизация'}
                              </Badge>
                              <span className="text-sm text-[#A6A7AA]">
                                Синхронизация: {formatTimeAgo(integration.lastSync)}
                              </span>
                            </div>
                            {integration.errorMessage && (
                              <p className="text-sm text-red-400 mt-1">{integration.errorMessage}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-heading text-white">
                            {formatNumber(integration.dataPoints)}
                          </p>
                          <p className="text-sm text-[#A6A7AA]">точек данных</p>
                          <div className="flex gap-2 mt-2">
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-[#232428] text-white hover:bg-[#17181A]"
                              onClick={() => handleSyncIntegration(integration.id)}
                              disabled={integration.status === 'syncing'}
                            >
                              <RefreshCw className={`h-3 w-3 mr-1 ${integration.status === 'syncing' ? 'animate-spin' : ''}`} />
                              Синхронизация
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-[#232428] text-white hover:bg-[#17181A]"
                              onClick={() => {
                                setSelectedIntegration(integration);
                                setShowIntegrationDialog(true);
                              }}
                            >
                              <Settings className="h-3 w-3 mr-1" />
                              Настройки
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Integration metrics */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t border-[#232428]">
                        <div className="text-center">
                          <p className="text-sm text-[#A6A7AA] mb-1">API вызовы</p>
                          <p className="text-white font-medium">{integration.metrics.dailyApiCalls}</p>
                          <div className="w-full bg-[#232428] rounded-full h-1 mt-1">
                            <div 
                              className="bg-blue-500 h-1 rounded-full"
                              style={{ width: `${(integration.metrics.dailyApiCalls / integration.metrics.monthlyLimit) * 100}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#A6A7AA] mb-1">Точность</p>
                          <p className="text-green-400 font-medium">{integration.metrics.dataAccuracy}%</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#A6A7AA] mb-1">Отклик</p>
                          <p className="text-white font-medium">{integration.metrics.responseTime}ms</p>
                        </div>
                        <div className="text-center">
                          <p className="text-sm text-[#A6A7AA] mb-1">Функции</p>
                          <p className="text-white font-medium">{integration.features.length}</p>
                        </div>
                      </div>
                      
                      {/* Features list */}
                      <div className="mt-4">
                        <p className="text-sm text-[#A6A7AA] mb-2">Доступные функции:</p>
                        <div className="flex flex-wrap gap-1">
                          {integration.features.map((feature, index) => (
                            <Badge key={index} className="text-xs bg-[#232428] text-[#A6A7AA]">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Automated Reports Tab */}
          <TabsContent value="reports" className="mt-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-heading text-white">Автоматические отчеты</h2>
                <p className="text-[#A6A7AA]">Настройка регулярных отчетов по email</p>
              </div>
              <Button 
                onClick={() => {
                  setIsCreatingReport(true);
                  setSelectedReport(null);
                  setShowReportDialog(true);
                }}
                className="bg-[#91040C] hover:bg-[#91040C]/90"
              >
                <Plus className="h-4 w-4 mr-2" />
                Создать отчет
              </Button>
            </div>

            <div className="space-y-4">
              {reports.map(report => (
                <Card key={report.id} className="bg-[#121214] border-[#232428]">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-heading text-white">{report.name}</h3>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status === 'active' ? 'Активен' : 
                             report.status === 'paused' ? 'Приостановлен' : 'Ошибка'}
                          </Badge>
                          <Badge className="bg-blue-500/10 text-blue-400">
                            {report.frequency === 'daily' ? 'Ежедневно' :
                             report.frequency === 'weekly' ? 'Еженедельно' :
                             report.frequency === 'monthly' ? 'Ежемесячно' : 'Ежеквартально'}
                          </Badge>
                        </div>
                        <p className="text-[#A6A7AA] mb-3">{report.description}</p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-[#A6A7AA]">Получатели:</span>
                            <p className="text-white">{report.recipients.length} адресов</p>
                          </div>
                          <div>
                            <span className="text-[#A6A7AA]">Источники данных:</span>
                            <p className="text-white">{report.dataSources.length} интеграций</p>
                          </div>
                          <div>
                            <span className="text-[#A6A7AA]">Следующая отправка:</span>
                            <p className="text-white">
                              {new Date(report.nextRun).toLocaleDateString('ru-RU')}
                            </p>
                          </div>
                          <div>
                            <span className="text-[#A6A7AA]">Последняя отправка:</span>
                            <p className="text-white">
                              {report.lastRun ? formatTimeAgo(report.lastRun) : 'Никогда'}
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-2 ml-4">
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#232428] text-white hover:bg-[#17181A]"
                            onClick={() => handleRunReport(report.id)}
                          >
                            <Send className="h-3 w-3 mr-1" />
                            Отправить сейчас
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#232428] text-white hover:bg-[#17181A]"
                            onClick={() => {
                              setSelectedReport(report);
                              setIsCreatingReport(false);
                              setShowReportDialog(true);
                            }}
                          >
                            <Edit className="h-3 w-3 mr-1" />
                            Изменить
                          </Button>
                        </div>
                        <div className="flex items-center justify-center">
                          <Switch
                            checked={report.status === 'active'}
                            onCheckedChange={() => handleToggleReport(report.id)}
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Report sections */}
                    <div className="mt-4 pt-4 border-t border-[#232428]">
                      <p className="text-sm text-[#A6A7AA] mb-2">Разделы отчета:</p>
                      <div className="flex flex-wrap gap-1">
                        {report.sections.map((section, index) => (
                          <Badge key={index} className="text-xs bg-purple-500/10 text-purple-400">
                            {section === 'traffic' ? 'Трафик' :
                             section === 'conversions' ? 'Конверсии' :
                             section === 'roi' ? 'ROI' :
                             section === 'revenue' ? 'Выручка' :
                             section === 'leads' ? 'Лиды' : section}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Webhook конфигурация</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Настройка событий для real-time интеграций
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: 'Новый лид', endpoint: '/webhooks/new-lead', events: ['lead.created'], status: 'active' },
                      { name: 'Сделка закрыта', endpoint: '/webhooks/deal-closed', events: ['deal.won'], status: 'active' },
                      { name: 'Отмена бронирования', endpoint: '/webhooks/booking-cancelled', events: ['booking.cancelled'], status: 'paused' },
                      { name: 'Платеж получен', endpoint: '/webhooks/payment-received', events: ['payment.completed'], status: 'active' }
                    ].map((webhook, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-[#17181A] rounded-lg">
                        <div>
                          <h4 className="font-medium text-white">{webhook.name}</h4>
                          <p className="text-sm text-[#A6A7AA]">{webhook.endpoint}</p>
                          <div className="flex gap-1 mt-1">
                            {webhook.events.map((event, idx) => (
                              <Badge key={idx} className="text-xs bg-[#232428] text-[#A6A7AA]">
                                {event}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(webhook.status)}>
                            {webhook.status === 'active' ? 'Активен' : 'Приостановлен'}
                          </Badge>
                          <Switch
                            checked={webhook.status === 'active'}
                            onCheckedChange={() => {}}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Event Log */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Журнал событий</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Последние webhook события
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { event: 'lead.created', timestamp: '2024-12-01T15:45:00Z', status: 'success', payload: 'New lead: Михаил Смирнов' },
                      { event: 'deal.won', timestamp: '2024-12-01T15:30:00Z', status: 'success', payload: 'Deal closed: ₽450,000' },
                      { event: 'payment.completed', timestamp: '2024-12-01T15:15:00Z', status: 'success', payload: 'Payment: ₽125,000' },
                      { event: 'lead.created', timestamp: '2024-12-01T15:00:00Z', status: 'failed', payload: 'Endpoint timeout' }
                    ].map((log, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-[#17181A] rounded">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${
                            log.status === 'success' ? 'bg-green-400' : 'bg-red-400'
                          }`} />
                          <div>
                            <p className="text-sm text-white">{log.payload}</p>
                            <p className="text-xs text-[#A6A7AA]">{log.event} • {formatTimeAgo(log.timestamp)}</p>
                          </div>
                        </div>
                        <Badge className={log.status === 'success' ? getStatusColor('connected') : getStatusColor('error')}>
                          {log.status === 'success' ? 'Успешно' : 'Ошибка'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Integration Configuration Dialog */}
      <Dialog open={showIntegrationDialog} onOpenChange={setShowIntegrationDialog}>
        <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Настройка интеграции</DialogTitle>
            <DialogDescription className="text-[#A6A7AA]">
              {selectedIntegration?.name} - конфигурация подключения
            </DialogDescription>
          </DialogHeader>
          
          {selectedIntegration && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">API ключ</Label>
                  <div className="relative">
                    <Input 
                      type="password"
                      defaultValue={selectedIntegration.config.apiKey}
                      className="bg-[#17181A] border-[#232428] text-white pr-10"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 p-0"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-white">Account ID</Label>
                  <Input 
                    defaultValue={selectedIntegration.config.accountId}
                    className="bg-[#17181A] border-[#232428] text-white"
                  />
                </div>
              </div>
              
              {selectedIntegration.config.propertyId && (
                <div className="space-y-2">
                  <Label className="text-white">Property ID</Label>
                  <Input 
                    defaultValue={selectedIntegration.config.propertyId}
                    className="bg-[#17181A] border-[#232428] text-white"
                  />
                </div>
              )}
              
              <div className="p-4 bg-[#17181A] rounded-lg">
                <h4 className="font-medium text-white mb-2">Статистика использования</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-[#A6A7AA]">API вызовов сегодня:</span>
                    <p className="text-white">{selectedIntegration.metrics.dailyApiCalls}</p>
                  </div>
                  <div>
                    <span className="text-[#A6A7AA]">Месячный лимит:</span>
                    <p className="text-white">{selectedIntegration.metrics.monthlyLimit}</p>
                  </div>
                </div>
                <Progress 
                  value={(selectedIntegration.metrics.dailyApiCalls / selectedIntegration.metrics.monthlyLimit) * 100} 
                  className="mt-2"
                />
              </div>
              
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setShowIntegrationDialog(false)}
                  className="border-[#232428] text-white hover:bg-[#17181A]"
                >
                  Отмена
                </Button>
                <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                  <Save className="h-4 w-4 mr-2" />
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Report Configuration Dialog */}
      <Dialog open={showReportDialog} onOpenChange={setShowReportDialog}>
        <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white">
              {isCreatingReport ? 'Создать автоматический отчет' : 'Настройка отчета'}
            </DialogTitle>
            <DialogDescription className="text-[#A6A7AA]">
              Конфигурация автоматической отправки отчетов
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Название отчета</Label>
                <Input 
                  defaultValue={selectedReport?.name || ''}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="Введите название отчета"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-white">Частота отправки</Label>
                <Select defaultValue={selectedReport?.frequency || 'weekly'}>
                  <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="daily">Ежедневно</SelectItem>
                    <SelectItem value="weekly">Еженедельно</SelectItem>
                    <SelectItem value="monthly">Ежемесячно</SelectItem>
                    <SelectItem value="quarterly">Ежеквартально</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Описание</Label>
              <Textarea 
                defaultValue={selectedReport?.description || ''}
                className="bg-[#17181A] border-[#232428] text-white"
                placeholder="Краткое описание содержания отчета"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Email получатели</Label>
              <Textarea 
                defaultValue={selectedReport?.recipients.join(', ') || ''}
                className="bg-[#17181A] border-[#232428] text-white"
                placeholder="email1@company.com, email2@company.com"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Источники данных</Label>
                <div className="space-y-2">
                  {integrations.filter(i => i.status === 'connected').map(integration => (
                    <div key={integration.id} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={integration.id}
                        defaultChecked={selectedReport?.dataSources.includes(integration.id)}
                        className="rounded border-[#232428] bg-[#17181A]"
                      />
                      <label htmlFor={integration.id} className="text-sm text-white">
                        {integration.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Разделы отчета</Label>
                <div className="space-y-2">
                  {['traffic', 'conversions', 'roi', 'revenue', 'leads', 'costs'].map(section => (
                    <div key={section} className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id={section}
                        defaultChecked={selectedReport?.sections.includes(section)}
                        className="rounded border-[#232428] bg-[#17181A]"
                      />
                      <label htmlFor={section} className="text-sm text-white">
                        {section === 'traffic' ? 'Трафик' :
                         section === 'conversions' ? 'Конверсии' :
                         section === 'roi' ? 'ROI' :
                         section === 'revenue' ? 'Выручка' :
                         section === 'leads' ? 'Лиды' : 'Расходы'}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowReportDialog(false)}
                className="border-[#232428] text-white hover:bg-[#17181A]"
              >
                Отмена
              </Button>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                <Save className="h-4 w-4 mr-2" />
                {isCreatingReport ? 'Создать отчет' : 'Сохранить изменения'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}