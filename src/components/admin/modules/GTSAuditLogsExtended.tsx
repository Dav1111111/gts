import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
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
  Shield, AlertTriangle, CheckCircle, XCircle, Info, FileText,
  Search, Filter, Download, Upload, Eye, Settings, Clock,
  User, Users, Building, Globe, Monitor, Smartphone, Tablet,
  Lock, Unlock, Key, Bell, Mail, MessageSquare, Phone,
  Calendar, MapPin, Flag, Archive, Database, Server,
  Activity, Zap, TrendingUp, BarChart3, PieChart, Gauge,
  LogOut, LogIn, Edit, Trash2, Plus, Minus, RefreshCw,
  ExternalLink, Share2, Copy, Save, Folder, FolderOpen,
  HardDrive, Cpu, MemoryStick, Wifi, WifiOff, AlertCircle,
  CheckCircle2, XOctagon, Pause, Play, SkipForward,
  ChevronRight, ChevronDown, ChevronUp, ChevronLeft,
  MoreHorizontal, Layers, Grid, List, Calendar as CalendarIcon,
  Clock3, Timer, Hash, Tag, Link, Code, Terminal, Wrench
} from 'lucide-react';

interface AuditLogsProps {
  userRole: string;
}

type LogLevel = 'info' | 'warning' | 'error' | 'critical' | 'debug';
type ActionType = 'login' | 'logout' | 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'system';
type SystemModule = 'crm' | 'fleet' | 'booking' | 'finance' | 'api' | 'ai' | 'cms' | 'auth' | 'notification' | 'system';
type SecurityEventType = 'failed_login' | 'blocked_account' | 'password_reset' | 'session_expired' | 'suspicious_activity' | 'data_breach';

interface SystemLog {
  id: string;
  timestamp: string;
  level: LogLevel;
  module: SystemModule;
  source: string;
  message: string;
  details: Record<string, any>;
  context?: Record<string, any>;
  stackTrace?: string;
  resolved: boolean;
  tags: string[];
}

interface UserAction {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: string;
  userIP: string;
  userAgent: string;
  actionType: ActionType;
  module: SystemModule;
  objectType: string;
  objectId: string;
  objectName: string;
  status: 'success' | 'failed' | 'partial';
  changes?: {
    before: Record<string, any>;
    after: Record<string, any>;
  };
  reason?: string;
  sessionId: string;
  location?: string;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
  };
}

interface SecurityEvent {
  id: string;
  timestamp: string;
  type: SecurityEventType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  userId?: string;
  userName?: string;
  ipAddress: string;
  userAgent: string;
  location?: string;
  details: Record<string, any>;
  resolved: boolean;
  resolvedBy?: string;
  resolvedAt?: string;
  notes?: string;
}

interface ActiveSession {
  id: string;
  userId: string;
  userName: string;
  userRole: string;
  loginTime: string;
  lastActivity: string;
  ipAddress: string;
  location?: string;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    os: string;
    browser: string;
  };
  activities: number;
  isActive: boolean;
}

interface CompliancePolicy {
  id: string;
  name: string;
  description: string;
  retentionDays: number;
  categories: string[];
  autoDelete: boolean;
  requiresApproval: boolean;
  notificationDays: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export function GTSAuditLogsExtended({ userRole }: AuditLogsProps) {
  const [activeTab, setActiveTab] = useState('system');
  const [searchTerm, setSearchTerm] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [moduleFilter, setModuleFilter] = useState('all');
  const [dateRange, setDateRange] = useState('today');
  const [selectedLog, setSelectedLog] = useState<SystemLog | null>(null);
  const [selectedAction, setSelectedAction] = useState<UserAction | null>(null);
  const [selectedSecurity, setSelectedSecurity] = useState<SecurityEvent | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [isExportDialogOpen, setIsExportDialogOpen] = useState(false);

  // Mock данные системных логов
  const systemLogs: SystemLog[] = [
    {
      id: 'log-001',
      timestamp: '2024-06-24T15:30:00Z',
      level: 'error',
      module: 'api',
      source: 'BookingAPI',
      message: 'Ошибка соединения с внешним API партнёра',
      details: {
        endpoint: '/api/partners/bookings',
        errorCode: 'CONNECTION_TIMEOUT',
        retryAttempts: 3,
        duration: 30000
      },
      context: {
        partnerId: 'partner-123',
        bookingId: 'booking-456',
        userId: 'user-789'
      },
      stackTrace: 'Error: Connection timeout\n  at BookingAPI.js:45\n  at retry.js:23',
      resolved: false,
      tags: ['critical', 'api', 'partner', 'timeout']
    },
    {
      id: 'log-002',
      timestamp: '2024-06-24T15:25:00Z',
      level: 'warning',
      module: 'crm',
      source: 'LeadProcessor',
      message: 'Дублирующийся лид обнаружен в системе',
      details: {
        leadId: 'lead-789',
        duplicateOf: 'lead-456',
        confidence: 0.95,
        fields: ['email', 'phone']
      },
      resolved: true,
      tags: ['duplicate', 'crm', 'lead']
    },
    {
      id: 'log-003',
      timestamp: '2024-06-24T15:20:00Z',
      level: 'info',
      module: 'fleet',
      source: 'MaintenanceScheduler',
      message: 'Плановое ТО яхты Azimut 68 запланировано',
      details: {
        yachtId: 'yacht-123',
        maintenanceType: 'routine',
        scheduledDate: '2024-06-30',
        estimatedHours: 8
      },
      resolved: false,
      tags: ['maintenance', 'fleet', 'scheduled']
    },
    {
      id: 'log-004',
      timestamp: '2024-06-24T15:15:00Z',
      level: 'critical',
      module: 'system',
      source: 'DatabaseMonitor',
      message: 'Высокое использование CPU на сервере базы данных',
      details: {
        cpuUsage: 95,
        threshold: 85,
        duration: 300,
        affectedQueries: 12
      },
      resolved: false,
      tags: ['performance', 'database', 'cpu', 'critical']
    }
  ];

  // Mock данные действий пользователей
  const userActions: UserAction[] = [
    {
      id: 'action-001',
      timestamp: '2024-06-24T15:45:00Z',
      userId: 'user-123',
      userName: 'Мария Петрова',
      userRole: 'manager',
      userIP: '192.168.1.100',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      actionType: 'update',
      module: 'crm',
      objectType: 'Бронирование',
      objectId: 'booking-456',
      objectName: 'Аренда яхты Azimut 55',
      status: 'success',
      changes: {
        before: { status: 'confirmed', amount: 150000 },
        after: { status: 'confirmed', amount: 180000, notes: 'Доплата за дополнительные услуги' }
      },
      sessionId: 'session-789',
      location: 'Сочи, Россия',
      device: {
        type: 'desktop',
        os: 'Windows 10',
        browser: 'Chrome 126'
      }
    },
    {
      id: 'action-002',
      timestamp: '2024-06-24T15:40:00Z',
      userId: 'user-456',
      userName: 'Алексей Волков',
      userRole: 'operator',
      userIP: '192.168.1.101',
      userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X)',
      actionType: 'create',
      module: 'crm',
      objectType: 'Лид',
      objectId: 'lead-789',
      objectName: 'Корпоративный клиент - IT компания',
      status: 'success',
      sessionId: 'session-890',
      location: 'Москва, Россия',
      device: {
        type: 'mobile',
        os: 'iOS 17.5',
        browser: 'Safari Mobile'
      }
    },
    {
      id: 'action-003',
      timestamp: '2024-06-24T15:35:00Z',
      userId: 'user-789',
      userName: 'Сергей Иванов',
      userRole: 'executive',
      userIP: '192.168.1.102',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
      actionType: 'export',
      module: 'finance',
      objectType: 'Отчёт',
      objectId: 'report-123',
      objectName: 'Финансовый отчёт за май 2024',
      status: 'success',
      sessionId: 'session-901',
      location: 'Сочи, Россия',
      device: {
        type: 'desktop',
        os: 'macOS Sonoma',
        browser: 'Chrome 126'
      }
    }
  ];

  // Mock данные событий безопасности
  const securityEvents: SecurityEvent[] = [
    {
      id: 'security-001',
      timestamp: '2024-06-24T14:30:00Z',
      type: 'failed_login',
      severity: 'medium',
      userId: 'user-unknown',
      userName: 'admin@gts.ru',
      ipAddress: '123.45.67.89',
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36',
      location: 'Неизвестно',
      details: {
        attempts: 5,
        lastAttempt: '2024-06-24T14:30:00Z',
        password: 'incorrect',
        accountLocked: false
      },
      resolved: false
    },
    {
      id: 'security-002',
      timestamp: '2024-06-24T13:15:00Z',
      type: 'suspicious_activity',
      severity: 'high',
      userId: 'user-123',
      userName: 'Мария Петрова',
      ipAddress: '45.67.89.123',
      userAgent: 'curl/7.68.0',
      location: 'США, Калифорния',
      details: {
        reason: 'Необычная геолокация',
        normalLocation: 'Сочи, Россия',
        activityType: 'API access',
        riskScore: 85
      },
      resolved: true,
      resolvedBy: 'Алексей Иванов',
      resolvedAt: '2024-06-24T13:45:00Z',
      notes: 'Подтверждено пользователем. Командировка.'
    },
    {
      id: 'security-003',
      timestamp: '2024-06-24T12:00:00Z',
      type: 'blocked_account',
      severity: 'critical',
      userId: 'user-999',
      userName: 'test@example.com',
      ipAddress: '111.222.333.444',
      userAgent: 'bot/1.0',
      details: {
        reason: 'Превышено количество попыток входа',
        attempts: 10,
        blockDuration: 3600,
        automated: true
      },
      resolved: true,
      resolvedBy: 'Система',
      resolvedAt: '2024-06-24T13:00:00Z'
    }
  ];

  // Mock данные активных сессий
  const activeSessions: ActiveSession[] = [
    {
      id: 'session-789',
      userId: 'user-123',
      userName: 'Мария Петрова',
      userRole: 'manager',
      loginTime: '2024-06-24T09:00:00Z',
      lastActivity: '2024-06-24T15:45:00Z',
      ipAddress: '192.168.1.100',
      location: 'Сочи, Россия',
      device: {
        type: 'desktop',
        os: 'Windows 10',
        browser: 'Chrome 126'
      },
      activities: 47,
      isActive: true
    },
    {
      id: 'session-890',
      userId: 'user-456',
      userName: 'Алексей Волков',
      userRole: 'operator',
      loginTime: '2024-06-24T10:30:00Z',
      lastActivity: '2024-06-24T15:40:00Z',
      ipAddress: '192.168.1.101',
      location: 'Москва, Россия',
      device: {
        type: 'mobile',
        os: 'iOS 17.5',
        browser: 'Safari Mobile'
      },
      activities: 23,
      isActive: true
    },
    {
      id: 'session-901',
      userId: 'user-789',
      userName: 'Сергей Иванов',
      userRole: 'executive',
      loginTime: '2024-06-24T08:15:00Z',
      lastActivity: '2024-06-24T15:35:00Z',
      ipAddress: '192.168.1.102',
      location: 'Сочи, Россия',
      device: {
        type: 'desktop',
        os: 'macOS Sonoma',
        browser: 'Chrome 126'
      },
      activities: 89,
      isActive: true
    }
  ];

  // Mock данные политик соответствия
  const compliancePolicies: CompliancePolicy[] = [
    {
      id: 'policy-001',
      name: 'Общие системные логи',
      description: 'Стандартные логи системы и приложений',
      retentionDays: 90,
      categories: ['info', 'warning', 'error'],
      autoDelete: true,
      requiresApproval: false,
      notificationDays: 7,
      active: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-06-01T00:00:00Z'
    },
    {
      id: 'policy-002',
      name: 'Финансовые операции',
      description: 'Логи финансовых операций и транзакций',
      retentionDays: 2555, // 7 лет
      categories: ['finance', 'payment', 'booking'],
      autoDelete: false,
      requiresApproval: true,
      notificationDays: 30,
      active: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-06-01T00:00:00Z'
    },
    {
      id: 'policy-003',
      name: 'Безопасность и доступ',
      description: 'События безопасности и изменения доступа',
      retentionDays: 365,
      categories: ['security', 'auth', 'iam'],
      autoDelete: false,
      requiresApproval: true,
      notificationDays: 14,
      active: true,
      createdAt: '2024-01-15T00:00:00Z',
      updatedAt: '2024-06-01T00:00:00Z'
    }
  ];

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
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatDuration = (startTime: string, endTime: string) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    const diff = Math.floor((end.getTime() - start.getTime()) / 1000 / 60); // минуты
    
    if (diff < 60) return `${diff} мин`;
    if (diff < 1440) return `${Math.floor(diff / 60)}ч ${diff % 60}м`;
    return `${Math.floor(diff / 1440)}д ${Math.floor((diff % 1440) / 60)}ч`;
  };

  const getLogLevelBadge = (level: LogLevel) => {
    switch (level) {
      case 'critical':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Критический</Badge>;
      case 'error':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Ошибка</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500/10 text-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Предупреждение</Badge>;
      case 'info':
        return <Badge className="bg-blue-500/10 text-blue-500"><Info className="w-3 h-3 mr-1" />Информация</Badge>;
      case 'debug':
        return <Badge variant="secondary"><Code className="w-3 h-3 mr-1" />Отладка</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getModuleBadge = (module: SystemModule) => {
    const moduleMap = {
      crm: { icon: Users, label: 'CRM' },
      fleet: { icon: Activity, label: 'Флот' },
      booking: { icon: Calendar, label: 'Бронирования' },
      finance: { icon: BarChart3, label: 'Финансы' },
      api: { icon: Database, label: 'API' },
      ai: { icon: Zap, label: 'AI' },
      cms: { icon: FileText, label: 'CMS' },
      auth: { icon: Shield, label: 'Авторизация' },
      notification: { icon: Bell, label: 'Уведомления' },
      system: { icon: Server, label: 'Система' }
    };
    
    const config = moduleMap[module];
    if (!config) return <Badge variant="outline">Неизвестно</Badge>;
    
    const Icon = config.icon;
    return <Badge variant="outline"><Icon className="w-3 h-3 mr-1" />{config.label}</Badge>;
  };

  const getActionTypeBadge = (actionType: ActionType) => {
    switch (actionType) {
      case 'login':
        return <Badge className="bg-green-500/10 text-green-500"><LogIn className="w-3 h-3 mr-1" />Вход</Badge>;
      case 'logout':
        return <Badge className="bg-gray-500/10 text-gray-500"><LogOut className="w-3 h-3 mr-1" />Выход</Badge>;
      case 'create':
        return <Badge className="bg-blue-500/10 text-blue-500"><Plus className="w-3 h-3 mr-1" />Создание</Badge>;
      case 'update':
        return <Badge className="bg-yellow-500/10 text-yellow-600"><Edit className="w-3 h-3 mr-1" />Изменение</Badge>;
      case 'delete':
        return <Badge variant="destructive"><Trash2 className="w-3 h-3 mr-1" />Удаление</Badge>;
      case 'view':
        return <Badge variant="outline"><Eye className="w-3 h-3 mr-1" />Просмотр</Badge>;
      case 'export':
        return <Badge variant="outline"><Download className="w-3 h-3 mr-1" />Экспорт</Badge>;
      case 'import':
        return <Badge variant="outline"><Upload className="w-3 h-3 mr-1" />Импорт</Badge>;
      case 'system':
        return <Badge variant="secondary"><Settings className="w-3 h-3 mr-1" />Система</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500/10 text-green-500"><CheckCircle className="w-3 h-3 mr-1" />Успех</Badge>;
      case 'failed':
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" />Ошибка</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-500/10 text-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Частично</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getSecuritySeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive"><AlertTriangle className="w-3 h-3 mr-1" />Критический</Badge>;
      case 'high':
        return <Badge className="bg-red-500/10 text-red-500"><AlertCircle className="w-3 h-3 mr-1" />Высокий</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500/10 text-yellow-600"><AlertTriangle className="w-3 h-3 mr-1" />Средний</Badge>;
      case 'low':
        return <Badge className="bg-blue-500/10 text-blue-500"><Info className="w-3 h-3 mr-1" />Низкий</Badge>;
      default:
        return <Badge variant="outline">Неизвестно</Badge>;
    }
  };

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'tablet':
        return <Tablet className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  // Функции доступа
  const canViewAllLogs = () => {
    return ['executive', 'audit-admin', 'security-officer'].includes(userRole);
  };

  const canManagePolicies = () => {
    return ['audit-admin'].includes(userRole);
  };

  const canViewSecurity = () => {
    return ['executive', 'audit-admin', 'security-officer'].includes(userRole);
  };

  const canTerminateSessions = () => {
    return ['audit-admin', 'security-officer'].includes(userRole);
  };

  // Фильтрация данных
  const filteredSystemLogs = systemLogs.filter(log => {
    const matchesSearch = log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.source.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         log.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesLevel = levelFilter === 'all' || log.level === levelFilter;
    const matchesModule = moduleFilter === 'all' || log.module === moduleFilter;
    
    return matchesSearch && matchesLevel && matchesModule;
  });

  const filteredUserActions = userActions.filter(action => {
    if (!canViewAllLogs() && action.userRole !== userRole) return false;
    
    const matchesSearch = action.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.objectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         action.userIP.includes(searchTerm);
    const matchesModule = moduleFilter === 'all' || action.module === moduleFilter;
    
    return matchesSearch && matchesModule;
  });

  const filteredSecurityEvents = securityEvents.filter(event => {
    if (!canViewSecurity()) return false;
    
    const matchesSearch = (event.userName?.toLowerCase().includes(searchTerm.toLowerCase()) || false) ||
                         event.ipAddress.includes(searchTerm) ||
                         event.type.includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Audit & Logs</h1>
          <p className="text-muted-foreground">
            Системное логирование, аудит действий и мониторинг безопасности
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setIsExportDialogOpen(true)}>
            <Download className="w-4 h-4 mr-2" />
            Экспорт данных
          </Button>
          {canManagePolicies() && (
            <Button variant="outline" onClick={() => setIsPolicyDialogOpen(true)}>
              <Settings className="w-4 h-4 mr-2" />
              Политики
            </Button>
          )}
          <Button variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            Обновить
          </Button>
        </div>
      </div>

      {/* Обзорная панель */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium">Системные логи</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">{systemLogs.length}</span>
              <p className="text-xs text-muted-foreground">за сегодня</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium">Действия пользователей</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">{userActions.length}</span>
              <p className="text-xs text-muted-foreground">за сегодня</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-red-500" />
              <span className="text-sm font-medium">События безопасности</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">{securityEvents.filter(e => !e.resolved).length}</span>
              <p className="text-xs text-muted-foreground">требуют внимания</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium">Активные сессии</span>
            </div>
            <div className="space-y-1">
              <span className="text-2xl font-bold">{activeSessions.filter(s => s.isActive).length}</span>
              <p className="text-xs text-muted-foreground">пользователей онлайн</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Панель поиска и фильтров */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Поиск по логам, пользователям, IP адресам..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={levelFilter} onValueChange={setLevelFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="critical">Критический</SelectItem>
                <SelectItem value="error">Ошибка</SelectItem>
                <SelectItem value="warning">Предупреждение</SelectItem>
                <SelectItem value="info">Информация</SelectItem>
                <SelectItem value="debug">Отладка</SelectItem>
              </SelectContent>
            </Select>
            <Select value={moduleFilter} onValueChange={setModuleFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все модули</SelectItem>
                <SelectItem value="crm">CRM</SelectItem>
                <SelectItem value="fleet">Флот</SelectItem>
                <SelectItem value="booking">Бронирования</SelectItem>
                <SelectItem value="finance">Финансы</SelectItem>
                <SelectItem value="api">API</SelectItem>
                <SelectItem value="ai">AI</SelectItem>
                <SelectItem value="cms">CMS</SelectItem>
                <SelectItem value="auth">Авторизация</SelectItem>
                <SelectItem value="system">Система</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="yesterday">Вчера</SelectItem>
                <SelectItem value="week">Неделя</SelectItem>
                <SelectItem value="month">Месяц</SelectItem>
                <SelectItem value="custom">Выбрать период</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="system">
            <Server className="w-4 h-4 mr-2" />
            Системные логи
          </TabsTrigger>
          <TabsTrigger value="audit">
            <Users className="w-4 h-4 mr-2" />
            Аудит действий
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="w-4 h-4 mr-2" />
            Безопасность
          </TabsTrigger>
          <TabsTrigger value="compliance">
            <FileText className="w-4 h-4 mr-2" />
            Соответствие
          </TabsTrigger>
        </TabsList>

        {/* Системные логи */}
        <TabsContent value="system" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3>Системные логи</h3>
              <div className="space-y-3">
                {filteredSystemLogs.map((log) => (
                  <div
                    key={log.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      setSelectedLog(log);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">
                          {formatDateTime(log.timestamp)}
                        </span>
                        {getLogLevelBadge(log.level)}
                        {getModuleBadge(log.module)}
                        {!log.resolved && log.level === 'error' && (
                          <Badge variant="outline" className="text-red-500">
                            <AlertTriangle className="w-3 h-3 mr-1" />
                            Требует решения
                          </Badge>
                        )}
                      </div>
                      <p className="font-medium">{log.message}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Источник: {log.source}</span>
                        {log.context && Object.keys(log.context).length > 0 && (
                          <span>Контекст: {Object.keys(log.context).length} объектов</span>
                        )}
                        {log.tags.length > 0 && (
                          <div className="flex gap-1">
                            {log.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                            {log.tags.length > 3 && (
                              <Badge variant="outline" className="text-xs">
                                +{log.tags.length - 3}
                              </Badge>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Аудит действий пользователей */}
        <TabsContent value="audit" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <h3>Аудит действий пользователей</h3>
              <div className="space-y-3">
                {filteredUserActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => {
                      setSelectedAction(action);
                      setIsDetailsOpen(true);
                    }}
                  >
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-muted-foreground">
                          {formatDateTime(action.timestamp)}
                        </span>
                        {getActionTypeBadge(action.actionType)}
                        {getModuleBadge(action.module)}
                        {getStatusBadge(action.status)}
                      </div>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-medium">{action.userName}</span>
                        <Badge variant="outline" className="text-xs">{action.userRole}</Badge>
                        {getDeviceIcon(action.device.type)}
                        <span className="text-sm text-muted-foreground">{action.device.os}</span>
                      </div>
                      <p>
                        {action.actionType === 'create' ? 'Создал' :
                         action.actionType === 'update' ? 'Изменил' :
                         action.actionType === 'delete' ? 'Удалил' :
                         action.actionType === 'view' ? 'Просмотрел' : 'Выполнил действие с'} {action.objectType}: <span className="font-medium">{action.objectName}</span>
                      </p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>IP: {action.userIP}</span>
                        {action.location && <span>{action.location}</span>}
                        {action.changes && (
                          <span>Изменены поля: {Object.keys(action.changes.after).length}</span>
                        )}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Безопасность и мониторинг */}
        <TabsContent value="security" className="space-y-6">
          {canViewSecurity() ? (
            <>
              {/* События безопасности */}
              <Card className="p-6">
                <div className="space-y-4">
                  <h3>События безопасности</h3>
                  <div className="space-y-3">
                    {filteredSecurityEvents.map((event) => (
                      <div
                        key={event.id}
                        className="flex items-start gap-4 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                        onClick={() => {
                          setSelectedSecurity(event);
                          setIsDetailsOpen(true);
                        }}
                      >
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <span className="font-mono text-sm text-muted-foreground">
                              {formatDateTime(event.timestamp)}
                            </span>
                            {getSecuritySeverityBadge(event.severity)}
                            {event.resolved ? (
                              <Badge className="bg-green-500/10 text-green-500">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Решено
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="text-red-500">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Требует внимания
                              </Badge>
                            )}
                          </div>
                          <p className="font-medium">
                            {event.type === 'failed_login' ? 'Неудачная попытка входа' :
                             event.type === 'blocked_account' ? 'Блокировка аккаунта' :
                             event.type === 'password_reset' ? 'Сброс пароля' :
                             event.type === 'session_expired' ? 'Истечение сессии' :
                             event.type === 'suspicious_activity' ? 'Подозрительная активность' :
                             event.type === 'data_breach' ? 'Нарушение безопасности данных' : event.type}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            {event.userName && <span>Пользователь: {event.userName}</span>}
                            <span>IP: {event.ipAddress}</span>
                            {event.location && <span>{event.location}</span>}
                          </div>
                          {event.resolved && event.resolvedBy && (
                            <p className="text-sm text-green-600">
                              Решено {event.resolvedBy} в {formatDateTime(event.resolvedAt!)}
                            </p>
                          )}
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Активные сессии */}
              <Card className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3>Активные сессии ({activeSessions.filter(s => s.isActive).length})</h3>
                    {canTerminateSessions() && (
                      <Button variant="outline" size="sm">
                        <XCircle className="w-4 h-4 mr-2" />
                        Завершить все сессии
                      </Button>
                    )}
                  </div>
                  <div className="space-y-3">
                    {activeSessions.filter(session => session.isActive).map((session) => (
                      <div key={session.id} className="flex items-center gap-4 p-4 border rounded-lg">
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              <span className="font-medium">{session.userName}</span>
                              <Badge variant="outline" className="text-xs">{session.userRole}</Badge>
                            </div>
                            <div className="flex items-center gap-2">
                              {getDeviceIcon(session.device.type)}
                              <span className="text-sm text-muted-foreground">
                                {session.device.os} • {session.device.browser}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Вход: {formatDateTime(session.loginTime)}</span>
                            <span>Активность: {formatDateTime(session.lastActivity)}</span>
                            <span>Длительность: {formatDuration(session.loginTime, session.lastActivity)}</span>
                            <span>Действий: {session.activities}</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>IP: {session.ipAddress}</span>
                            {session.location && <span>{session.location}</span>}
                          </div>
                        </div>
                        {canTerminateSessions() && (
                          <Button variant="outline" size="sm">
                            <XCircle className="w-4 h-4 mr-2" />
                            Завершить
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </>
          ) : (
            <Card className="p-6">
              <div className="text-center py-8">
                <Shield className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="mb-2">Доступ ограничен</h3>
                <p className="text-muted-foreground">
                  У вас нет прав для просмотра информации о безопасности
                </p>
              </div>
            </Card>
          )}
        </TabsContent>

        {/* Соответствие требованиям */}
        <TabsContent value="compliance" className="space-y-6">
          <Card className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3>Политики хранения данных</h3>
                {canManagePolicies() && (
                  <Button variant="outline" size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Добавить политику
                  </Button>
                )}
              </div>
              <div className="space-y-3">
                {compliancePolicies.map((policy) => (
                  <Card key={policy.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <h4>{policy.name}</h4>
                          <p className="text-sm text-muted-foreground">{policy.description}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          {policy.active ? (
                            <Badge className="bg-green-500/10 text-green-500">
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Активна
                            </Badge>
                          ) : (
                            <Badge variant="secondary">
                              <Pause className="w-3 h-3 mr-1" />
                              Неактивна
                            </Badge>
                          )}
                          {canManagePolicies() && (
                            <Button variant="ghost" size="sm">
                              <Settings className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <Label className="text-xs text-muted-foreground">Срок хранения</Label>
                          <p className="font-medium">
                            {policy.retentionDays === 2555 ? '7 лет' : 
                             policy.retentionDays >= 365 ? `${Math.floor(policy.retentionDays / 365)} год(а)` :
                             `${policy.retentionDays} дней`}
                          </p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Автоудаление</Label>
                          <p className="font-medium">{policy.autoDelete ? 'Включено' : 'Отключено'}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Требует одобрения</Label>
                          <p className="font-medium">{policy.requiresApproval ? 'Да' : 'Нет'}</p>
                        </div>
                        <div>
                          <Label className="text-xs text-muted-foreground">Уведомление за</Label>
                          <p className="font-medium">{policy.notificationDays} дней</p>
                        </div>
                      </div>

                      <div>
                        <Label className="text-xs text-muted-foreground">Категории данных</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {policy.categories.map(category => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </Card>

          {/* Статистика соответствия */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Archive className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Общий объём данных</span>
                </div>
                <span className="text-2xl font-bold">1.2 ТБ</span>
                <p className="text-xs text-muted-foreground">в системе логирования</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Требует очистки</span>
                </div>
                <span className="text-2xl font-bold">47 ГБ</span>
                <p className="text-xs text-muted-foreground">истёк срок хранения</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Соответствие</span>
                </div>
                <span className="text-2xl font-bold">98.5%</span>
                <p className="text-xs text-muted-foreground">политикам хранения</p>
              </div>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Диалог детальной информации */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedLog ? 'Детали системного лога' :
               selectedAction ? 'Детали действия пользователя' :
               selectedSecurity ? 'Детали события безопасности' : 'Детали'}
            </DialogTitle>
            <DialogDescription>
              Подробная информация о выбранном событии
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {selectedLog && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Время события</Label>
                    <p className="font-mono">{formatDateTime(selectedLog.timestamp)}</p>
                  </div>
                  <div>
                    <Label>Уровень важности</Label>
                    <div className="mt-1">{getLogLevelBadge(selectedLog.level)}</div>
                  </div>
                  <div>
                    <Label>Модуль</Label>
                    <div className="mt-1">{getModuleBadge(selectedLog.module)}</div>
                  </div>
                  <div>
                    <Label>Источник</Label>
                    <p>{selectedLog.source}</p>
                  </div>
                </div>

                <div>
                  <Label>Сообщение</Label>
                  <p className="mt-1 p-3 bg-muted rounded-lg">{selectedLog.message}</p>
                </div>

                {selectedLog.details && Object.keys(selectedLog.details).length > 0 && (
                  <div>
                    <Label>Детали</Label>
                    <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(selectedLog.details, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.context && Object.keys(selectedLog.context).length > 0 && (
                  <div>
                    <Label>Контекст</Label>
                    <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      {JSON.stringify(selectedLog.context, null, 2)}
                    </pre>
                  </div>
                )}

                {selectedLog.stackTrace && (
                  <div>
                    <Label>Stack Trace</Label>
                    <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                      {selectedLog.stackTrace}
                    </pre>
                  </div>
                )}

                <div>
                  <Label>Теги</Label>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {selectedLog.tags.map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {selectedAction && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Время действия</Label>
                    <p className="font-mono">{formatDateTime(selectedAction.timestamp)}</p>
                  </div>
                  <div>
                    <Label>Статус</Label>
                    <div className="mt-1">{getStatusBadge(selectedAction.status)}</div>
                  </div>
                  <div>
                    <Label>Пользователь</Label>
                    <p>{selectedAction.userName} ({selectedAction.userRole})</p>
                  </div>
                  <div>
                    <Label>IP адрес</Label>
                    <p>{selectedAction.userIP}</p>
                  </div>
                  <div>
                    <Label>Модуль</Label>
                    <div className="mt-1">{getModuleBadge(selectedAction.module)}</div>
                  </div>
                  <div>
                    <Label>Тип действия</Label>
                    <div className="mt-1">{getActionTypeBadge(selectedAction.actionType)}</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Объект</Label>
                    <p>{selectedAction.objectType}: {selectedAction.objectName}</p>
                  </div>
                  <div>
                    <Label>ID объекта</Label>
                    <p className="font-mono">{selectedAction.objectId}</p>
                  </div>
                </div>

                <div>
                  <Label>Устройство</Label>
                  <div className="flex items-center gap-2 mt-1">
                    {getDeviceIcon(selectedAction.device.type)}
                    <span>{selectedAction.device.os} • {selectedAction.device.browser}</span>
                  </div>
                </div>

                {selectedAction.location && (
                  <div>
                    <Label>Геолокация</Label>
                    <p>{selectedAction.location}</p>
                  </div>
                )}

                {selectedAction.changes && (
                  <div>
                    <Label>Изменения</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">До изменения</Label>
                        <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                          {JSON.stringify(selectedAction.changes.before, null, 2)}
                        </pre>
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">После изменения</Label>
                        <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                          {JSON.stringify(selectedAction.changes.after, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {selectedSecurity && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Время события</Label>
                    <p className="font-mono">{formatDateTime(selectedSecurity.timestamp)}</p>
                  </div>
                  <div>
                    <Label>Серьёзность</Label>
                    <div className="mt-1">{getSecuritySeverityBadge(selectedSecurity.severity)}</div>
                  </div>
                  <div>
                    <Label>Тип события</Label>
                    <p>{selectedSecurity.type}</p>
                  </div>
                  <div>
                    <Label>IP адрес</Label>
                    <p>{selectedSecurity.ipAddress}</p>
                  </div>
                </div>

                {selectedSecurity.userName && (
                  <div>
                    <Label>Пользователь</Label>
                    <p>{selectedSecurity.userName}</p>
                  </div>
                )}

                {selectedSecurity.location && (
                  <div>
                    <Label>Геолокация</Label>
                    <p>{selectedSecurity.location}</p>
                  </div>
                )}

                <div>
                  <Label>User Agent</Label>
                  <p className="font-mono text-sm break-all">{selectedSecurity.userAgent}</p>
                </div>

                <div>
                  <Label>Детали события</Label>
                  <pre className="mt-1 p-3 bg-muted rounded-lg text-sm overflow-x-auto">
                    {JSON.stringify(selectedSecurity.details, null, 2)}
                  </pre>
                </div>

                {selectedSecurity.resolved && (
                  <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                    <h4 className="font-medium text-green-700 dark:text-green-400">Событие решено</h4>
                    <p className="text-sm text-green-600 dark:text-green-500 mt-1">
                      Решено {selectedSecurity.resolvedBy} в {formatDateTime(selectedSecurity.resolvedAt!)}
                    </p>
                    {selectedSecurity.notes && (
                      <p className="text-sm mt-2">{selectedSecurity.notes}</p>
                    )}
                  </div>
                )}
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
                Закрыть
              </Button>
              <Button variant="outline">
                <Copy className="w-4 h-4 mr-2" />
                Копировать
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог экспорта */}
      <Dialog open={isExportDialogOpen} onOpenChange={setIsExportDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Экспорт данных аудита</DialogTitle>
            <DialogDescription>
              Экспорт логов и аудита для внешних проверок
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label>Тип данных</Label>
              <div className="space-y-2 mt-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-logs" defaultChecked />
                  <Label htmlFor="export-logs">Системные логи</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-actions" defaultChecked />
                  <Label htmlFor="export-actions">Действия пользователей</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="export-security" />
                  <Label htmlFor="export-security">События безопасности</Label>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Формат</Label>
                <Select defaultValue="csv">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="xlsx">Excel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Период</Label>
                <Select defaultValue="month">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Сегодня</SelectItem>
                    <SelectItem value="week">Неделя</SelectItem>
                    <SelectItem value="month">Месяц</SelectItem>
                    <SelectItem value="quarter">Квартал</SelectItem>
                    <SelectItem value="year">Год</SelectItem>
                    <SelectItem value="custom">Выбрать период</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Дополнительные опции</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="include-context" defaultChecked />
                  <Label htmlFor="include-context">Включить контекстную информацию</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="anonymize" />
                  <Label htmlFor="anonymize">Анонимизировать персональные данные</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="compress" defaultChecked />
                  <Label htmlFor="compress">Сжать архив</Label>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsExportDialogOpen(false)}>
                Отменить
              </Button>
              <Button onClick={() => setIsExportDialogOpen(false)}>
                <Download className="w-4 h-4 mr-2" />
                Экспортировать
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}