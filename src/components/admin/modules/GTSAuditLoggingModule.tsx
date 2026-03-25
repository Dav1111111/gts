import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../../ui/dialog";
import { 
  ArrowLeft, 
  Search, 
  Filter,
  Eye,
  Calendar,
  User,
  Shield,
  Activity,
  AlertCircle,
  Clock,
  Database,
  FileText,
  Users,
  DollarSign,
  Settings,
  Download,
  RefreshCw,
  ChevronRight,
  Zap,
  TrendingUp,
  Award
} from "lucide-react";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useAuth } from "../../../contexts/AuthContext";
import { Separator } from "../../ui/separator";
import { Avatar, AvatarFallback } from "../../ui/avatar";

interface GTSAuditLoggingModuleProps {
  onBack: () => void;
}

type UserRole = 'executive' | 'finance' | 'partner' | 'staff' | 'operator' | 'crew' | 'it';

type AuditModule = 'crm' | 'finance' | 'staff' | 'documents' | 'calendar' | 'partners' | 'cms' | 'iam' | 'analytics' | 'api';

interface AuditLogEntry {
  id: string;
  timestamp: string;
  user: string;
  userId: string;
  userRole: UserRole;
  action: string;
  module: AuditModule;
  entity: string;
  entityId: string;
  details: string;
  ipAddress: string;
  userAgent: string;
  sessionId: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  changes?: {
    field: string;
    oldValue: any;
    newValue: any;
  }[];
}

export function GTSAuditLoggingModule({ onBack }: GTSAuditLoggingModuleProps) {
  const { userRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [moduleFilter, setModuleFilter] = useState<AuditModule | "all">("all");
  const [userFilter, setUserFilter] = useState("all");
  const [dateRangeFilter, setDateRangeFilter] = useState("7d");
  const [selectedLog, setSelectedLog] = useState<AuditLogEntry | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  // Текущий пользователь
  const currentUser = {
    id: "user-001",
    name: "Viktor Kuznetsov",
    role: userRole || 'executive' as UserRole
  };

  // Проверка доступа
  const hasAccess = currentUser.role === 'executive' || currentUser.role === 'it';

  // Данные аудит логов
  const auditLogs: AuditLogEntry[] = [
    {
      id: "log-001",
      timestamp: "2024-12-03T14:30:25Z",
      user: "Viktor Kuznetsov",
      userId: "user-001",
      userRole: "executive",
      action: "CLIENT_CREATED",
      module: "crm",
      entity: "Client",
      entityId: "client-456",
      details: "Created new VIP client profile: Premium Travel Group",
      ipAddress: "192.168.1.10",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      sessionId: "sess-abc123",
      severity: "low",
      changes: [
        { field: "name", oldValue: null, newValue: "Premium Travel Group" },
        { field: "status", oldValue: null, newValue: "VIP" },
        { field: "phone", oldValue: null, newValue: "+7 900 123 45 67" }
      ]
    },
    {
      id: "log-002",
      timestamp: "2024-12-03T14:15:12Z",
      user: "Maria Volkova",
      userId: "user-002",
      userRole: "finance",
      action: "PAYMENT_PROCESSED",
      module: "finance",
      entity: "Payment",
      entityId: "pay-789",
      details: "Processed payment for yacht tour booking #YT-2024-001",
      ipAddress: "192.168.1.15",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      sessionId: "sess-def456",
      severity: "medium",
      changes: [
        { field: "amount", oldValue: 0, newValue: 125000 },
        { field: "status", oldValue: "pending", newValue: "completed" },
        { field: "paymentMethod", oldValue: null, newValue: "bank_transfer" }
      ]
    },
    {
      id: "log-003",
      timestamp: "2024-12-03T13:45:33Z",
      user: "Alex Petrov",
      userId: "user-003",
      userRole: "it",
      action: "API_KEY_GENERATED",
      module: "api",
      entity: "APIKey",
      entityId: "key-321",
      details: "Generated new API key for partner integration",
      ipAddress: "192.168.1.20",
      userAgent: "Mozilla/5.0 (X11; Linux x86_64)",
      sessionId: "sess-ghi789",
      severity: "high",
      changes: [
        { field: "keyId", oldValue: null, newValue: "ak_live_123456789" },
        { field: "permissions", oldValue: null, newValue: ["read:bookings", "write:bookings"] },
        { field: "partner", oldValue: null, newValue: "Premium Travel Agency" }
      ]
    },
    {
      id: "log-004",
      timestamp: "2024-12-03T13:20:15Z",
      user: "Elena Volkova",
      userId: "user-004",
      userRole: "staff",
      action: "DOCUMENT_UPLOADED",
      module: "documents",
      entity: "Document",
      entityId: "doc-654",
      details: "Uploaded insurance policy renewal document",
      ipAddress: "192.168.1.25",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      sessionId: "sess-jkl012",
      severity: "low",
      changes: [
        { field: "fileName", oldValue: null, newValue: "insurance_policy_2024.pdf" },
        { field: "fileSize", oldValue: null, newValue: "2.3MB" },
        { field: "category", oldValue: null, newValue: "insurance" }
      ]
    },
    {
      id: "log-005",
      timestamp: "2024-12-03T12:55:40Z",
      user: "Viktor Kuznetsov",
      userId: "user-001",
      userRole: "executive",
      action: "USER_ROLE_CHANGED",
      module: "iam",
      entity: "User",
      entityId: "user-007",
      details: "Changed user role from staff to operator for Marina Semenova",
      ipAddress: "192.168.1.10",
      userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)",
      sessionId: "sess-abc123",
      severity: "critical",
      changes: [
        { field: "role", oldValue: "staff", newValue: "operator" },
        { field: "permissions", oldValue: ["view:documents"], newValue: ["view:documents", "manage:bookings", "view:fleet"] }
      ]
    },
    {
      id: "log-006",
      timestamp: "2024-12-03T12:30:22Z",
      user: "Sergey Morozov",
      userId: "user-005",
      userRole: "staff",
      action: "BOOKING_UPDATED",
      module: "calendar",
      entity: "Booking",
      entityId: "book-987",
      details: "Updated helicopter tour booking - changed date and participants count",
      ipAddress: "192.168.1.30",
      userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)",
      sessionId: "sess-mno345",
      severity: "medium",
      changes: [
        { field: "date", oldValue: "2024-12-15", newValue: "2024-12-20" },
        { field: "participants", oldValue: 2, newValue: 4 },
        { field: "vehicle", oldValue: "Robinson R44", newValue: "Bell 407" }
      ]
    },
    {
      id: "log-007",
      timestamp: "2024-12-03T11:45:18Z",
      user: "Anna Komarova",
      userId: "user-006",
      userRole: "staff",
      action: "CONTENT_PUBLISHED",
      module: "cms",
      entity: "Article",
      entityId: "art-246",
      details: "Published new blog article: 'Winter Helicopter Tours in Sochi'",
      ipAddress: "192.168.1.35",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      sessionId: "sess-pqr678",
      severity: "low",
      changes: [
        { field: "status", oldValue: "draft", newValue: "published" },
        { field: "publishDate", oldValue: null, newValue: "2024-12-03T11:45:18Z" },
        { field: "seoTitle", oldValue: "", newValue: "Зимние вертолетные туры в Сочи - Grand Tour Sochi" }
      ]
    },
    {
      id: "log-008",
      timestamp: "2024-12-03T11:20:45Z",
      user: "Maria Volkova",
      userId: "user-002",
      userRole: "finance",
      action: "PARTNER_PAYOUT",
      module: "finance",
      entity: "Payout",
      entityId: "payout-159",
      details: "Processed partner commission payout to Premium Travel Agency",
      ipAddress: "192.168.1.15",
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      sessionId: "sess-def456",
      severity: "high",
      changes: [
        { field: "amount", oldValue: 0, newValue: 87500 },
        { field: "partner", oldValue: null, newValue: "Premium Travel Agency" },
        { field: "period", oldValue: null, newValue: "November 2024" }
      ]
    }
  ];

  // Статистика пользователей
  const userStats = useMemo(() => {
    const userActivity = auditLogs.reduce((acc, log) => {
      acc[log.user] = (acc[log.user] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(userActivity)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([user, count]) => ({
        user,
        count,
        lastActive: auditLogs.find(log => log.user === user)?.timestamp || ""
      }));
  }, [auditLogs]);

  // Статистика модулей
  const moduleStats = useMemo(() => {
    const moduleActivity = auditLogs.reduce((acc, log) => {
      acc[log.module] = (acc[log.module] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(moduleActivity)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([module, count]) => ({ module, count }));
  }, [auditLogs]);

  // Фильтрация логов
  const filteredLogs = useMemo(() => {
    let filtered = auditLogs;

    // Фильтр по поиску
    if (searchQuery) {
      filtered = filtered.filter(log => 
        log.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.entity.toLowerCase().includes(searchQuery.toLowerCase()) ||
        log.details.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по модулю
    if (moduleFilter !== 'all') {
      filtered = filtered.filter(log => log.module === moduleFilter);
    }

    // Фильтр по пользователю
    if (userFilter !== 'all') {
      filtered = filtered.filter(log => log.user === userFilter);
    }

    // Фильтр по дате
    const now = new Date();
    let dateThreshold = new Date();
    
    switch (dateRangeFilter) {
      case '1d':
        dateThreshold.setDate(now.getDate() - 1);
        break;
      case '7d':
        dateThreshold.setDate(now.getDate() - 7);
        break;
      case '30d':
        dateThreshold.setDate(now.getDate() - 30);
        break;
      case '90d':
        dateThreshold.setDate(now.getDate() - 90);
        break;
    }

    if (dateRangeFilter !== 'all') {
      filtered = filtered.filter(log => new Date(log.timestamp) >= dateThreshold);
    }

    return filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [auditLogs, searchQuery, moduleFilter, userFilter, dateRangeFilter]);

  const getModuleIcon = (module: AuditModule) => {
    const icons = {
      crm: <Users className="h-4 w-4" />,
      finance: <DollarSign className="h-4 w-4" />,
      staff: <User className="h-4 w-4" />,
      documents: <FileText className="h-4 w-4" />,
      calendar: <Calendar className="h-4 w-4" />,
      partners: <Shield className="h-4 w-4" />,
      cms: <FileText className="h-4 w-4" />,
      iam: <Shield className="h-4 w-4" />,
      analytics: <Activity className="h-4 w-4" />,
      api: <Database className="h-4 w-4" />
    };
    return icons[module];
  };

  const getModuleName = (module: AuditModule) => {
    const names = {
      crm: "CRM",
      finance: "Finance",
      staff: "Staff Management", 
      documents: "Documents",
      calendar: "Calendar",
      partners: "Partners",
      cms: "CMS",
      iam: "IAM",
      analytics: "Analytics",
      api: "API"
    };
    return names[module];
  };

  const getSeverityColor = (severity: string) => {
    const colors = {
      low: "bg-green-500/20 text-green-400",
      medium: "bg-yellow-500/20 text-yellow-400",
      high: "bg-orange-500/20 text-orange-400",
      critical: "bg-red-500/20 text-red-400"
    };
    return colors[severity as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const getRoleColor = (role: UserRole) => {
    const colors = {
      executive: "bg-purple-500/20 text-purple-400",
      finance: "bg-green-500/20 text-green-400",
      it: "bg-blue-500/20 text-blue-400",
      staff: "bg-gray-500/20 text-gray-400",
      operator: "bg-orange-500/20 text-orange-400",
      crew: "bg-cyan-500/20 text-cyan-400",
      partner: "bg-pink-500/20 text-pink-400"
    };
    return colors[role];
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const formatActionName = (action: string) => {
    return action.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase());
  };

  const handleViewDetails = (log: AuditLogEntry) => {
    setSelectedLog(log);
    setShowDetailsDialog(true);
  };

  if (!hasAccess) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
        <div className="flex items-center justify-center h-screen">
          <Card className="p-8 text-center" style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
            <h2 style={{ color: 'var(--gts-portal-text)' }}>Access Denied</h2>
            <p style={{ color: 'var(--gts-portal-muted)' }} className="mt-2">
              This module is only accessible to Executive and IT roles.
            </p>
            <Button onClick={onBack} className="mt-4" variant="outline">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--gts-portal-surface)', 
        borderColor: 'var(--gts-portal-border)' 
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--gts-portal-text)' }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portal
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Audit & Logging
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                System activity monitoring and transparency
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Logs
            </Button>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
            <Badge variant="outline" style={{ color: 'var(--gts-portal-text)' }}>
              {filteredLogs.length} events
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Events Today</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {auditLogs.length}
                  </p>
                </div>
                <Activity className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Active Users</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {userStats.length}
                  </p>
                </div>
                <Users className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Critical Events</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {auditLogs.filter(log => log.severity === 'critical').length}
                  </p>
                </div>
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Most Active Module</p>
                  <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {moduleStats[0]?.module.toUpperCase() || 'N/A'}
                  </p>
                </div>
                <TrendingUp className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6" style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
          <CardContent className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                <Input
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={moduleFilter} onValueChange={setModuleFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Modules" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Modules</SelectItem>
                  <SelectItem value="crm">CRM</SelectItem>
                  <SelectItem value="finance">Finance</SelectItem>
                  <SelectItem value="staff">Staff Management</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                  <SelectItem value="calendar">Calendar</SelectItem>
                  <SelectItem value="partners">Partners</SelectItem>
                  <SelectItem value="cms">CMS</SelectItem>
                  <SelectItem value="iam">IAM</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="api">API</SelectItem>
                </SelectContent>
              </Select>

              <Select value={userFilter} onValueChange={setUserFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Users" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Users</SelectItem>
                  {Array.from(new Set(auditLogs.map(log => log.user))).map(user => (
                    <SelectItem key={user} value={user}>{user}</SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1d">Last 24 hours</SelectItem>
                  <SelectItem value="7d">Last 7 days</SelectItem>
                  <SelectItem value="30d">Last 30 days</SelectItem>
                  <SelectItem value="90d">Last 90 days</SelectItem>
                  <SelectItem value="all">All time</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Advanced
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Audit Log Table */}
          <div className="lg:col-span-2">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Audit Log</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Detailed system activity and user actions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredLogs.length === 0 ? (
                    <div className="text-center py-8">
                      <Activity className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--gts-portal-muted)' }} />
                      <p style={{ color: 'var(--gts-portal-muted)' }}>
                        No audit logs found matching your criteria
                      </p>
                    </div>
                  ) : (
                    filteredLogs.map(log => (
                      <div 
                        key={log.id}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-opacity-50 cursor-pointer"
                        style={{ backgroundColor: 'var(--gts-portal-card)' }}
                        onClick={() => handleViewDetails(log)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2">
                              {getModuleIcon(log.module)}
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                {getModuleName(log.module)}
                              </span>
                            </div>
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
                            </Badge>
                            <Badge className={getRoleColor(log.userRole)}>
                              {log.userRole}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {formatActionName(log.action)}
                            </h4>
                            <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              by {log.user}
                            </span>
                          </div>
                          
                          <p className="text-sm mb-2" style={{ color: 'var(--gts-portal-muted)' }}>
                            {log.details}
                          </p>
                          
                          <div className="flex items-center gap-4 text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {formatTimestamp(log.timestamp)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Database className="h-3 w-3" />
                              {log.entity} #{log.entityId}
                            </div>
                          </div>
                        </div>
                        
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Stats */}
          <div className="space-y-6">
            {/* Top 5 Active Users */}
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5" />
                    Top Active Users
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userStats.map((user, index) => (
                    <div key={user.user} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                          {index + 1}
                        </div>
                        <Avatar className="w-8 h-8">
                          <AvatarFallback className="text-xs">
                            {user.user.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {user.user}
                          </p>
                          <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                            {formatTimestamp(user.lastActive)}
                          </p>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {user.count} events
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Most Edited Modules */}
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>
                  <div className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Most Active Modules
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {moduleStats.map((module, index) => (
                    <div key={module.module} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/20 text-green-400 text-xs">
                          {index + 1}
                        </div>
                        <div className="flex items-center gap-2">
                          {getModuleIcon(module.module as AuditModule)}
                          <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {getModuleName(module.module as AuditModule)}
                          </span>
                        </div>
                      </div>
                      <Badge variant="outline">
                        {module.count} events
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as CSV
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="h-4 w-4 mr-2" />
                    Export as JSON
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Settings className="h-4 w-4 mr-2" />
                    Audit Settings
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Alert Rules
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Event Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl" style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
          <DialogHeader>
            <DialogTitle style={{ color: 'var(--gts-portal-text)' }}>
              Event Details
            </DialogTitle>
            <DialogDescription style={{ color: 'var(--gts-portal-muted)' }}>
              Complete information about this audit log entry
            </DialogDescription>
          </DialogHeader>
          
          {selectedLog && (
            <div className="space-y-4">
              {/* Event Overview */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Action</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {formatActionName(selectedLog.action)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Severity</label>
                  <Badge className={`mt-1 ${getSeverityColor(selectedLog.severity)}`}>
                    {selectedLog.severity}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>User</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.user}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Role</label>
                  <Badge className={`mt-1 ${getRoleColor(selectedLog.userRole)}`}>
                    {selectedLog.userRole}
                  </Badge>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Module</label>
                  <div className="flex items-center gap-2 mt-1">
                    {getModuleIcon(selectedLog.module)}
                    <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                      {getModuleName(selectedLog.module)}
                    </span>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Timestamp</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {formatTimestamp(selectedLog.timestamp)}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Description */}
              <div>
                <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Description</label>
                <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                  {selectedLog.details}
                </p>
              </div>

              {/* Entity Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Entity Type</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.entity}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Entity ID</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.entityId}
                  </p>
                </div>
              </div>

              {/* Changes */}
              {selectedLog.changes && selectedLog.changes.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Changes Made</label>
                    <div className="mt-2 space-y-2">
                      {selectedLog.changes.map((change, index) => (
                        <div 
                          key={index}
                          className="p-3 rounded-lg"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {change.field}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span style={{ color: 'var(--gts-portal-muted)' }}>From: </span>
                              <span style={{ color: 'var(--gts-portal-text)' }}>
                                {change.oldValue === null ? 'null' : String(change.oldValue)}
                              </span>
                            </div>
                            <div>
                              <span style={{ color: 'var(--gts-portal-muted)' }}>To: </span>
                              <span style={{ color: 'var(--gts-portal-text)' }}>
                                {change.newValue === null ? 'null' : String(change.newValue)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <Separator />

              {/* Technical Details */}
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>IP Address</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.ipAddress}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>User Agent</label>
                  <p className="text-sm mt-1 break-all" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.userAgent}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Session ID</label>
                  <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                    {selectedLog.sessionId}
                  </p>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}