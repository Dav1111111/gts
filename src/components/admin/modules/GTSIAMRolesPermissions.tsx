import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Switch } from '../../ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ScrollArea } from '../../ui/scroll-area';
import { Separator } from '../../ui/separator';
import { Alert, AlertDescription } from '../../ui/alert';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Save,
  Users,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Settings,
  Eye,
  UserCheck,
  UserX,
  Activity,
  Calendar,
  FileText,
  DollarSign,
  Archive,
  Globe,
  MapPin,
  User,
  Building,
  Briefcase,
  Star,
  Crown,
  Gem,
  Zap,
  Headphones,
  Wrench,
  Car,
  Plane,
  Anchor,
  Radio,
  Monitor,
  ChevronRight,
  MoreHorizontal,
  Copy,
  History,
  AlertCircle,
  Lock,
  Unlock,
  ArrowLeft
} from 'lucide-react';

// Define all modules in the system
const MODULES = [
  { id: 'crm', name: 'CRM', icon: Users, description: 'Управление клиентами и лидами' },
  { id: 'calendar', name: 'Calendar', icon: Calendar, description: 'Глобальный календарь бронирований' },
  { id: 'sphere', name: 'SphereM', icon: Globe, description: 'Sphere Management' },
  { id: 'partners', name: 'Partners', icon: Briefcase, description: 'База данных партнеров' },
  { id: 'staff', name: 'Staff', icon: UserCheck, description: 'Управление персоналом' },
  { id: 'finance', name: 'Finance', icon: DollarSign, description: 'Финансовый центр' },
  { id: 'docs', name: 'Docs', icon: FileText, description: 'Документы и входящие' },
  { id: 'cms', name: 'CMS', icon: Edit, description: 'Система управления контентом' }
];

// Define all actions
const ACTIONS = [
  { id: 'view', name: 'View', description: 'Просмотр', color: 'text-blue-500' },
  { id: 'create', name: 'Create', description: 'Создание', color: 'text-green-500' },
  { id: 'edit', name: 'Edit', description: 'Редактирование', color: 'text-yellow-500' },
  { id: 'delete', name: 'Delete', description: 'Удаление', color: 'text-red-500' },
  { id: 'approve', name: 'Approve', description: 'Утверждение', color: 'text-purple-500' }
];

// Define all roles with their properties
const ROLES_DATA = {
  // Client Roles
  user: { 
    id: 'user', 
    name: 'User', 
    category: 'Client', 
    icon: User, 
    color: 'bg-gray-500', 
    description: 'Базовый пользователь',
    defaultScope: 'Own'
  },
  bronze: { 
    id: 'bronze', 
    name: 'Bronze', 
    category: 'Client', 
    icon: Star, 
    color: 'bg-amber-600', 
    description: 'Бронзовый уровень клиента',
    defaultScope: 'Own'
  },
  silver: { 
    id: 'silver', 
    name: 'Silver', 
    category: 'Client', 
    icon: Star, 
    color: 'bg-gray-400', 
    description: 'Серебряный уровень клиента',
    defaultScope: 'Own'
  },
  gold: { 
    id: 'gold', 
    name: 'Gold', 
    category: 'Client', 
    icon: Star, 
    color: 'bg-yellow-500', 
    description: 'Золотой уровень клиента',
    defaultScope: 'Own'
  },
  platinum: { 
    id: 'platinum', 
    name: 'Platinum', 
    category: 'Client', 
    icon: Crown, 
    color: 'bg-purple-500', 
    description: 'Платиновый уровень клиента',
    defaultScope: 'Own'
  },

  // Staff Roles
  operator: { 
    id: 'operator', 
    name: 'Operator', 
    category: 'Staff', 
    icon: Headphones, 
    color: 'bg-blue-500', 
    description: 'Оператор бронирований',
    defaultScope: 'Location'
  },
  dispatcher: { 
    id: 'dispatcher', 
    name: 'Dispatcher', 
    category: 'Staff', 
    icon: Radio, 
    color: 'bg-green-500', 
    description: 'Диспетчер',
    defaultScope: 'Location'
  },
  siteadmin: { 
    id: 'siteadmin', 
    name: 'SiteAdmin', 
    category: 'Staff', 
    icon: Monitor, 
    color: 'bg-indigo-500', 
    description: 'Администратор площадки',
    defaultScope: 'Location'
  },
  captain: { 
    id: 'captain', 
    name: 'Captain', 
    category: 'Staff', 
    icon: Anchor, 
    color: 'bg-blue-600', 
    description: 'Капитан судна',
    defaultScope: 'Own'
  },
  pilot: { 
    id: 'pilot', 
    name: 'Pilot', 
    category: 'Staff', 
    icon: Plane, 
    color: 'bg-sky-500', 
    description: 'Пилот вертолета',
    defaultScope: 'Own'
  },
  guide: { 
    id: 'guide', 
    name: 'Guide', 
    category: 'Staff', 
    icon: MapPin, 
    color: 'bg-emerald-500', 
    description: 'Гид-инструктор',
    defaultScope: 'Own'
  },
  mechanic: { 
    id: 'mechanic', 
    name: 'Mechanic', 
    category: 'Staff', 
    icon: Wrench, 
    color: 'bg-orange-500', 
    description: 'Механик',
    defaultScope: 'Location'
  },
  support: { 
    id: 'support', 
    name: 'Support', 
    category: 'Staff', 
    icon: Headphones, 
    color: 'bg-cyan-500', 
    description: 'Служба поддержки',
    defaultScope: 'Global'
  },

  // Management Roles
  marketing: { 
    id: 'marketing', 
    name: 'Marketing', 
    category: 'Management', 
    icon: Zap, 
    color: 'bg-pink-500', 
    description: 'Отдел маркетинга',
    defaultScope: 'Global'
  },
  finance: { 
    id: 'finance', 
    name: 'Finance', 
    category: 'Management', 
    icon: DollarSign, 
    color: 'bg-green-600', 
    description: 'Финансовый отдел',
    defaultScope: 'Global'
  },
  executive: { 
    id: 'executive', 
    name: 'Executive', 
    category: 'Management', 
    icon: Crown, 
    color: 'bg-purple-600', 
    description: 'Исполнительное руководство',
    defaultScope: 'Global'
  },
  sysadmin: { 
    id: 'sysadmin', 
    name: 'SysAdmin', 
    category: 'Management', 
    icon: Settings, 
    color: 'bg-red-600', 
    description: 'Системный администратор',
    defaultScope: 'Global'
  },

  // Partner Roles
  partnerAgent: { 
    id: 'partner-agent', 
    name: 'Partner-Agent', 
    category: 'Partner', 
    icon: User, 
    color: 'bg-teal-500', 
    description: 'Партнер-агент',
    defaultScope: 'Own'
  },
  partnerContractor: { 
    id: 'partner-contractor', 
    name: 'Partner-Contractor', 
    category: 'Partner', 
    icon: Car, 
    color: 'bg-orange-600', 
    description: 'Партнер-подрядчик',
    defaultScope: 'Own'
  },
  partnerBrand: { 
    id: 'partner-brand', 
    name: 'Partner-Brand', 
    category: 'Partner', 
    icon: Building, 
    color: 'bg-violet-500', 
    description: 'Партнер-бренд',
    defaultScope: 'Own'
  },

  // B2B Roles
  b2bClient: { 
    id: 'b2b-client', 
    name: 'B2B Client', 
    category: 'B2B', 
    icon: Building, 
    color: 'bg-slate-600', 
    description: 'B2B клиент',
    defaultScope: 'Own'
  },
  b2bManager: { 
    id: 'b2b-manager', 
    name: 'B2B Manager', 
    category: 'B2B', 
    icon: Briefcase, 
    color: 'bg-slate-700', 
    description: 'B2B менеджер',
    defaultScope: 'Location'
  }
};

interface Permission {
  moduleId: string;
  actionId: string;
  granted: boolean;
}

interface Role {
  id: string;
  name: string;
  category: string;
  description: string;
  scope: 'Global' | 'Location' | 'Own';
  permissions: Permission[];
  memberCount: number;
  isActive: boolean;
  createdDate: string;
  lastModified: string;
  createdBy: string;
}

interface RoleMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  status: 'active' | 'inactive' | 'pending';
  assignedDate: string;
  assignedBy: string;
}

interface AuditLogEntry {
  id: string;
  action: string;
  roleId: string;
  roleName: string;
  performedBy: string;
  performedAt: string;
  details: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
}

interface GTSIAMRolesPermissionsProps {
  userRole: 'Executive' | 'SysAdmin' | 'Finance' | 'Marketing' | 'Staff';
  onBack: () => void;
}

export const GTSIAMRolesPermissions: React.FC<GTSIAMRolesPermissionsProps> = ({
  userRole,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('matrix');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<any[]>([]);

  // Check permissions
  const canEditRoles = userRole === 'Executive' || userRole === 'SysAdmin';
  const canDeleteRoles = userRole === 'Executive' || userRole === 'SysAdmin';
  const canViewAudit = userRole === 'Executive' || userRole === 'SysAdmin' || userRole === 'Finance';

  // Mock data for roles
  const [roles, setRoles] = useState<Role[]>([
    {
      id: 'executive',
      name: 'Executive',
      category: 'Management',
      description: 'Исполнительное руководство с полным доступом',
      scope: 'Global',
      permissions: MODULES.flatMap(module => 
        ACTIONS.map(action => ({
          moduleId: module.id,
          actionId: action.id,
          granted: true
        }))
      ),
      memberCount: 3,
      isActive: true,
      createdDate: '2024-01-15',
      lastModified: '2024-11-30',
      createdBy: 'System'
    },
    {
      id: 'marketing',
      name: 'Marketing',
      category: 'Management',
      description: 'Отдел маркетинга с доступом к CMS и аналитике',
      scope: 'Global',
      permissions: [
        { moduleId: 'cms', actionId: 'view', granted: true },
        { moduleId: 'cms', actionId: 'create', granted: true },
        { moduleId: 'cms', actionId: 'edit', granted: true },
        { moduleId: 'crm', actionId: 'view', granted: true },
        { moduleId: 'calendar', actionId: 'view', granted: true },
        { moduleId: 'partners', actionId: 'view', granted: true }
      ],
      memberCount: 5,
      isActive: true,
      createdDate: '2024-02-01',
      lastModified: '2024-12-01',
      createdBy: 'Executive'
    },
    {
      id: 'operator',
      name: 'Operator',
      category: 'Staff',
      description: 'Операторы бронирований',
      scope: 'Location',
      permissions: [
        { moduleId: 'calendar', actionId: 'view', granted: true },
        { moduleId: 'calendar', actionId: 'create', granted: true },
        { moduleId: 'calendar', actionId: 'edit', granted: true },
        { moduleId: 'crm', actionId: 'view', granted: true },
        { moduleId: 'crm', actionId: 'create', granted: true }
      ],
      memberCount: 12,
      isActive: true,
      createdDate: '2024-01-20',
      lastModified: '2024-11-28',
      createdBy: 'Executive'
    },
    {
      id: 'partner-agent',
      name: 'Partner-Agent',
      category: 'Partner',
      description: 'Партнеры-агенты',
      scope: 'Own',
      permissions: [
        { moduleId: 'calendar', actionId: 'view', granted: true },
        { moduleId: 'crm', actionId: 'view', granted: true },
        { moduleId: 'partners', actionId: 'view', granted: true }
      ],
      memberCount: 8,
      isActive: true,
      createdDate: '2024-03-01',
      lastModified: '2024-11-25',
      createdBy: 'Executive'
    }
  ]);

  // Mock data for role members
  const [roleMembers] = useState<RoleMember[]>([
    {
      id: '1',
      name: 'Алексей Петров',
      email: 'a.petrov@gts.ru',
      status: 'active',
      assignedDate: '2024-01-15',
      assignedBy: 'System'
    },
    {
      id: '2',
      name: 'Мария Козлова',
      email: 'm.kozlova@gts.ru',
      status: 'active',
      assignedDate: '2024-02-01',
      assignedBy: 'Executive'
    },
    {
      id: '3',
      name: 'Виктор Соколов',
      email: 'v.sokolov@gts.ru',
      status: 'pending',
      assignedDate: '2024-12-01',
      assignedBy: 'Executive'
    }
  ]);

  // Mock audit log
  const [auditLog] = useState<AuditLogEntry[]>([
    {
      id: '1',
      action: 'Role Permission Modified',
      roleId: 'marketing',
      roleName: 'Marketing',
      performedBy: 'Алексей Петров',
      performedAt: '2024-12-01 14:30:00',
      details: 'Добавлено разрешение "edit" для модуля CMS',
      severity: 'medium'
    },
    {
      id: '2',
      action: 'Role Created',
      roleId: 'partner-agent',
      roleName: 'Partner-Agent',
      performedBy: 'System',
      performedAt: '2024-03-01 10:00:00',
      details: 'Создана новая роль Partner-Agent',
      severity: 'low'
    },
    {
      id: '3',
      action: 'Role Permission Revoked',
      roleId: 'operator',
      roleName: 'Operator',
      performedBy: 'Алексей Петров',
      performedAt: '2024-11-28 16:45:00',
      details: 'Удалено разрешение "delete" для модуля Calendar',
      severity: 'high'
    }
  ]);

  // Filter roles based on search and category
  const filteredRoles = useMemo(() => {
    let filtered = roles;

    if (searchTerm) {
      filtered = filtered.filter(role =>
        role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        role.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(role => role.category === categoryFilter);
    }

    return filtered;
  }, [roles, searchTerm, categoryFilter]);

  const getRoleData = (roleId: string) => {
    return ROLES_DATA[roleId as keyof typeof ROLES_DATA] || {
      icon: User,
      color: 'bg-gray-500',
      defaultScope: 'Own'
    };
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-500 bg-red-500/10';
      case 'high': return 'text-orange-500 bg-orange-500/10';
      case 'medium': return 'text-yellow-500 bg-yellow-500/10';
      case 'low': return 'text-green-500 bg-green-500/10';
      default: return 'text-gray-500 bg-gray-500/10';
    }
  };

  const hasPermission = (role: Role, moduleId: string, actionId: string) => {
    return role.permissions.some(p => 
      p.moduleId === moduleId && p.actionId === actionId && p.granted
    );
  };

  const togglePermission = (roleId: string, moduleId: string, actionId: string) => {
    if (!canEditRoles) return;

    setRoles(prevRoles => 
      prevRoles.map(role => {
        if (role.id === roleId) {
          const existingPermission = role.permissions.find(p => 
            p.moduleId === moduleId && p.actionId === actionId
          );

          let newPermissions;
          if (existingPermission) {
            newPermissions = role.permissions.map(p =>
              p.moduleId === moduleId && p.actionId === actionId
                ? { ...p, granted: !p.granted }
                : p
            );
          } else {
            newPermissions = [...role.permissions, {
              moduleId,
              actionId,
              granted: true
            }];
          }

          return {
            ...role,
            permissions: newPermissions,
            lastModified: new Date().toISOString().split('T')[0]
          };
        }
        return role;
      })
    );

    // Add to pending changes for warnings
    const change = {
      type: 'permission_toggle',
      roleId,
      moduleId,
      actionId,
      timestamp: new Date().toISOString()
    };
    setPendingChanges(prev => [...prev, change]);
  };

  const renderPermissionMatrix = () => (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gts-portal-muted)] w-4 h-4" />
            <Input
              placeholder="Поиск ролей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="Client">Клиенты</SelectItem>
              <SelectItem value="Staff">Персонал</SelectItem>
              <SelectItem value="Management">Управление</SelectItem>
              <SelectItem value="Partner">Партнеры</SelectItem>
              <SelectItem value="B2B">B2B</SelectItem>
            </SelectContent>
          </Select>

          {canEditRoles && (
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать роль
            </Button>
          )}
        </div>
      </div>

      {/* Pending Changes Warning */}
      {pendingChanges.length > 0 && (
        <Alert className="border-yellow-500 bg-yellow-500/10">
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
          <AlertDescription className="text-yellow-400">
            У вас есть {pendingChanges.length} несохраненных изменений. Не забудьте сохранить изменения.
            <Button variant="outline" size="sm" className="ml-4">
              Сохранить все
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Permission Matrix */}
      <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)] flex items-center">
            <Shield className="w-5 h-5 mr-2" />
            Матрица разрешений
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--gts-portal-border)]">
                  <th className="text-left py-3 px-4 text-[var(--gts-portal-muted)] min-w-[200px]">
                    Роли / Модули
                  </th>
                  {MODULES.map(module => (
                    <th key={module.id} className="text-center py-3 px-2 text-[var(--gts-portal-muted)] min-w-[120px]">
                      <div className="flex flex-col items-center space-y-1">
                        <module.icon className="w-4 h-4" />
                        <span className="text-xs">{module.name}</span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 text-[var(--gts-portal-muted)]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredRoles.map((role) => {
                  const roleData = getRoleData(role.id);
                  const RoleIcon = roleData.icon;
                  
                  return (
                    <tr key={role.id} className="border-b border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)]">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 rounded-full ${roleData.color} flex items-center justify-center`}>
                            <RoleIcon className="w-4 h-4 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-[var(--gts-portal-text)]">{role.name}</div>
                            <div className="text-sm text-[var(--gts-portal-muted)]">
                              {role.category} • {role.scope} • {role.memberCount} участников
                            </div>
                          </div>
                        </div>
                      </td>
                      {MODULES.map(module => (
                        <td key={module.id} className="py-4 px-2 text-center">
                          <div className="space-y-1">
                            {ACTIONS.map(action => (
                              <div key={action.id} className="flex items-center justify-center">
                                <Switch
                                  checked={hasPermission(role, module.id, action.id)}
                                  onCheckedChange={() => togglePermission(role.id, module.id, action.id)}
                                  disabled={!canEditRoles}
                                  className="scale-75"
                                />
                              </div>
                            ))}
                          </div>
                        </td>
                      ))}
                      <td className="py-4 px-4 text-center">
                        <div className="flex items-center justify-center space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRole(role)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          {canEditRoles && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => {
                                setSelectedRole(role);
                                setShowEditDialog(true);
                              }}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Action Legend */}
          <div className="mt-6 pt-6 border-t border-[var(--gts-portal-border)]">
            <h4 className="text-sm text-[var(--gts-portal-text)] mb-3">Легенда действий:</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {ACTIONS.map(action => (
                <div key={action.id} className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${action.color.replace('text-', 'bg-')}`} />
                  <span className="text-sm text-[var(--gts-portal-text)]">{action.description}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRolesList = () => (
    <div className="space-y-4">
      {/* Search and filters */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gts-portal-muted)] w-4 h-4" />
            <Input
              placeholder="Поиск ролей..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              <SelectItem value="Client">Клиенты</SelectItem>
              <SelectItem value="Staff">Персонал</SelectItem>
              <SelectItem value="Management">Управление</SelectItem>
              <SelectItem value="Partner">Партнеры</SelectItem>
              <SelectItem value="B2B">B2B</SelectItem>
            </SelectContent>
          </Select>

          {canEditRoles && (
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать роль
            </Button>
          )}
        </div>
      </div>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredRoles.map((role) => {
          const roleData = getRoleData(role.id);
          const RoleIcon = roleData.icon;
          
          return (
            <Card
              key={role.id}
              className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] transition-colors cursor-pointer"
              onClick={() => setSelectedRole(role)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full ${roleData.color} flex items-center justify-center`}>
                      <RoleIcon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg text-[var(--gts-portal-text)]">{role.name}</CardTitle>
                      <div className="text-sm text-[var(--gts-portal-muted)]">{role.category}</div>
                    </div>
                  </div>
                  <Badge variant={role.isActive ? 'default' : 'secondary'}>
                    {role.isActive ? 'Активна' : 'Неактивна'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-[var(--gts-portal-muted)] mb-4">
                  {role.description}
                </p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gts-portal-muted)]">Область:</span>
                    <Badge variant="outline">{role.scope}</Badge>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gts-portal-muted)]">Участников:</span>
                    <span className="text-[var(--gts-portal-text)]">{role.memberCount}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gts-portal-muted)]">Разрешений:</span>
                    <span className="text-[var(--gts-portal-text)]">
                      {role.permissions.filter(p => p.granted).length}
                    </span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-[var(--gts-portal-muted)]">Изменена:</span>
                    <span className="text-[var(--gts-portal-text)]">
                      {new Date(role.lastModified).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center mt-4 pt-4 border-t border-[var(--gts-portal-border)]">
                  <Button variant="ghost" size="sm">
                    <Users className="w-4 h-4 mr-2" />
                    Участники
                  </Button>
                  {canEditRoles && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedRole(role);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredRoles.length === 0 && (
        <div className="text-center py-12">
          <Shield className="w-16 h-16 mx-auto mb-4 text-[var(--gts-portal-muted)]" />
          <h3 className="text-lg text-[var(--gts-portal-text)] mb-2">Роли не найдены</h3>
          <p className="text-[var(--gts-portal-muted)] mb-4">
            Попробуйте изменить фильтры поиска или создайте новую роль
          </p>
          {canEditRoles && (
            <Button
              onClick={() => setShowCreateDialog(true)}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать роль
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderAuditLog = () => (
    <div className="space-y-4">
      <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)] flex items-center">
            <History className="w-5 h-5 mr-2" />
            Журнал аудита
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {auditLog.map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-4 bg-[var(--gts-portal-card)] rounded-lg"
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-2 h-2 rounded-full ${getSeverityColor(entry.severity).split(' ')[0]}`} />
                  <div>
                    <div className="font-medium text-[var(--gts-portal-text)]">{entry.action}</div>
                    <div className="text-sm text-[var(--gts-portal-muted)]">
                      Роль: {entry.roleName} • Выполнил: {entry.performedBy}
                    </div>
                    <div className="text-sm text-[var(--gts-portal-muted)]">{entry.details}</div>
                  </div>
                </div>
                
                <div className="text-right">
                  <Badge className={getSeverityColor(entry.severity)}>
                    {entry.severity}
                  </Badge>
                  <div className="text-xs text-[var(--gts-portal-muted)] mt-1">
                    {entry.performedAt}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderRoleDetail = () => {
    if (!selectedRole) return null;

    const roleData = getRoleData(selectedRole.id);
    const RoleIcon = roleData.icon;

    return (
      <Dialog open={!!selectedRole} onOpenChange={() => setSelectedRole(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--gts-portal-text)] flex items-center space-x-3">
              <div className={`w-8 h-8 rounded-full ${roleData.color} flex items-center justify-center`}>
                <RoleIcon className="w-4 h-4 text-white" />
              </div>
              <span>{selectedRole.name}</span>
              <Badge variant={selectedRole.isActive ? 'default' : 'secondary'}>
                {selectedRole.isActive ? 'Активна' : 'Неактивна'}
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[500px] w-full">
            <div className="space-y-6 p-6">
              {/* Role Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Основная информация</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Название:</span>
                      <span className="text-[var(--gts-portal-text)]">{selectedRole.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Категория:</span>
                      <Badge variant="outline">{selectedRole.category}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Область:</span>
                      <Badge variant="outline">{selectedRole.scope}</Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Участников:</span>
                      <span className="text-[var(--gts-portal-text)]">{selectedRole.memberCount}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Статистика</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Разрешений:</span>
                      <span className="text-[var(--gts-portal-text)]">
                        {selectedRole.permissions.filter(p => p.granted).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Создана:</span>
                      <span className="text-[var(--gts-portal-text)]">
                        {new Date(selectedRole.createdDate).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Изменена:</span>
                      <span className="text-[var(--gts-portal-text)]">
                        {new Date(selectedRole.lastModified).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[var(--gts-portal-muted)]">Создал:</span>
                      <span className="text-[var(--gts-portal-text)]">{selectedRole.createdBy}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Separator className="border-[var(--gts-portal-border)]" />

              {/* Permissions Detail */}
              <div>
                <h3 className="text-lg text-[var(--gts-portal-text)] mb-4">Разрешения</h3>
                <div className="grid gap-4">
                  {MODULES.map(module => {
                    const modulePermissions = selectedRole.permissions.filter(p => 
                      p.moduleId === module.id && p.granted
                    );
                    
                    if (modulePermissions.length === 0) return null;
                    
                    return (
                      <Card key={module.id} className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                        <CardContent className="p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <module.icon className="w-5 h-5 text-[var(--gts-portal-accent)]" />
                            <h4 className="font-medium text-[var(--gts-portal-text)]">{module.name}</h4>
                            <span className="text-sm text-[var(--gts-portal-muted)]">
                              {module.description}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {modulePermissions.map(permission => {
                              const action = ACTIONS.find(a => a.id === permission.actionId);
                              return (
                                <Badge key={permission.actionId} variant="outline" className="text-xs">
                                  {action?.description}
                                </Badge>
                              );
                            })}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <Separator className="border-[var(--gts-portal-border)]" />

              {/* Members */}
              <div>
                <h3 className="text-lg text-[var(--gts-portal-text)] mb-4">Участники роли</h3>
                <div className="space-y-3">
                  {roleMembers.slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center justify-between p-3 bg-[var(--gts-portal-card)] rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback className="bg-[var(--gts-portal-accent)] text-white">
                            {member.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-[var(--gts-portal-text)]">{member.name}</div>
                          <div className="text-sm text-[var(--gts-portal-muted)]">{member.email}</div>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant={
                          member.status === 'active' ? 'default' : 
                          member.status === 'pending' ? 'outline' : 'secondary'
                        }>
                          {member.status}
                        </Badge>
                        <div className="text-xs text-[var(--gts-portal-muted)] mt-1">
                          {new Date(member.assignedDate).toLocaleDateString('ru-RU')}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {selectedRole.memberCount > 5 && (
                    <div className="text-center py-2">
                      <Button variant="outline" size="sm">
                        Показать всех ({selectedRole.memberCount})
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              {canEditRoles && (
                <div className="flex space-x-4 pt-6 border-t border-[var(--gts-portal-border)]">
                  <Button
                    onClick={() => setShowEditDialog(true)}
                    className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="outline">
                    <Copy className="w-4 h-4 mr-2" />
                    Дублировать
                  </Button>
                  {canDeleteRoles && (
                    <Button variant="outline" className="text-[var(--gts-portal-error)] border-[var(--gts-portal-error)]">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--gts-portal-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--gts-portal-border)] bg-[var(--gts-portal-surface)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-[var(--gts-portal-text)]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к порталу
            </Button>
            <div>
              <h1 className="text-2xl text-[var(--gts-portal-text)]">
                IAM / Роли и разрешения
              </h1>
              <p className="text-sm text-[var(--gts-portal-muted)]">
                Управление ролями, разрешениями и контролем доступа
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-xs">
              {userRole}
            </Badge>
            {!canEditRoles && (
              <Badge variant="secondary" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Только просмотр
              </Badge>
            )}
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Всего ролей</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">{roles.length}</p>
                </div>
                <Shield className="w-8 h-8 text-[var(--gts-portal-accent)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Активных ролей</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {roles.filter(role => role.isActive).length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-[var(--gts-portal-success)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Всего пользователей</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {roles.reduce((sum, role) => sum + role.memberCount, 0)}
                  </p>
                </div>
                <Users className="w-8 h-8 text-[var(--gts-portal-accent)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Записей аудита</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">{auditLog.length}</p>
                </div>
                <Activity className="w-8 h-8 text-[var(--gts-portal-warning)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[var(--gts-portal-surface)] border border-[var(--gts-portal-border)]">
            <TabsTrigger value="matrix" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Матрица разрешений</span>
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Управление ролями</span>
            </TabsTrigger>
            <TabsTrigger value="audit" className="flex items-center space-x-2" disabled={!canViewAudit}>
              <History className="w-4 h-4" />
              <span>Журнал аудита</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="matrix" className="mt-6">
            {renderPermissionMatrix()}
          </TabsContent>

          <TabsContent value="roles" className="mt-6">
            {renderRolesList()}
          </TabsContent>

          <TabsContent value="audit" className="mt-6">
            {canViewAudit ? renderAuditLog() : (
              <div className="text-center py-12">
                <Lock className="w-16 h-16 mx-auto mb-4 text-[var(--gts-portal-muted)]" />
                <h3 className="text-lg text-[var(--gts-portal-text)] mb-2">Доступ запрещен</h3>
                <p className="text-[var(--gts-portal-muted)]">
                  У вас недостаточно прав для просмотра журнала аудита
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Role Detail Dialog */}
      {renderRoleDetail()}
    </div>
  );
};