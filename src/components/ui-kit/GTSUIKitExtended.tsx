import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { 
  Building, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings,
  Star,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Bookmark,
  Heart,
  Share2,
  MessageCircle,
  Send,
  Image,
  Video,
  Mic,
  Camera,
  Paperclip,
  Link,
  Copy,
  Archive,
  Folder,
  FolderOpen,
  Save,
  RotateCcw,
  RefreshCw,
  Loader,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Maximize,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  CloudOff,
  Plug,
  Power,
  PowerOff
} from "lucide-react";

/**
 * GTSTableToolbar - Унифицированный тулбар для таблиц
 * Padding: 16px (согласно спецификации)
 */
interface GTSTableToolbarProps {
  searchPlaceholder?: string;
  filterOptions?: Array<{ value: string; label: string }>;
  onSearch?: (value: string) => void;
  onFilter?: (value: string) => void;
  onExport?: () => void;
  onAdd?: () => void;
  children?: React.ReactNode;
}

export function GTSTableToolbar({
  searchPlaceholder = "Поиск...",
  filterOptions = [
    { value: "all", label: "Все" },
    { value: "active", label: "Активные" },
    { value: "inactive", label: "Неактивные" }
  ],
  onSearch,
  onFilter,
  onExport,
  onAdd,
  children
}: GTSTableToolbarProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg mb-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[--gts-portal-muted]" />
          <Input
            placeholder={searchPlaceholder}
            className="pl-10 w-64 bg-[--gts-portal-surface] border-[--gts-portal-border] text-[--gts-portal-text]"
            onChange={(e) => onSearch?.(e.target.value)}
          />
        </div>
        <Select defaultValue="all" onValueChange={onFilter}>
          <SelectTrigger className="w-32 bg-[--gts-portal-surface] border-[--gts-portal-border] text-[--gts-portal-text]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[--gts-portal-card] border-[--gts-portal-border]">
            {filterOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button 
          size="sm" 
          variant="outline" 
          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-surface]"
        >
          <Filter className="w-4 h-4 mr-2" />
          Фильтры
        </Button>
        {children}
      </div>
      <div className="flex items-center gap-2">
        <Button 
          size="sm" 
          variant="outline" 
          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-surface]"
          onClick={onExport}
        >
          <Download className="w-4 h-4 mr-2" />
          Экспорт
        </Button>
        <Button 
          size="sm" 
          className="bg-[--gts-portal-accent] text-white hover:bg-opacity-90"
          onClick={onAdd}
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить
        </Button>
      </div>
    </div>
  );
}

/**
 * GTSDataTable - Унифицированная таблица с состояниями
 */
interface GTSDataTableProps {
  columns: Array<{
    key: string;
    label: string;
    width?: string;
    render?: (value: any, row: any) => React.ReactNode;
  }>;
  data: Array<Record<string, any>>;
  loading?: boolean;
  error?: string;
  emptyMessage?: string;
  selectable?: boolean;
  onRowSelect?: (selectedRows: any[]) => void;
  actions?: (row: any) => React.ReactNode;
}

export function GTSDataTable({
  columns,
  data,
  loading = false,
  error,
  emptyMessage = "Нет данных для отображения",
  selectable = false,
  onRowSelect,
  actions
}: GTSDataTableProps) {
  const [selectedRows, setSelectedRows] = useState<any[]>([]);

  const handleSelectAll = (checked: boolean) => {
    const newSelectedRows = checked ? data : [];
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  const handleRowSelect = (row: any, checked: boolean) => {
    const newSelectedRows = checked 
      ? [...selectedRows, row]
      : selectedRows.filter(selected => selected.id !== row.id);
    setSelectedRows(newSelectedRows);
    onRowSelect?.(newSelectedRows);
  };

  if (loading) {
    return (
      <div className="space-y-3 p-6">
        <Skeleton className="h-4 w-full bg-[--gts-portal-card]" />
        <Skeleton className="h-4 w-3/4 bg-[--gts-portal-card]" />
        <Skeleton className="h-4 w-1/2 bg-[--gts-portal-card]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-400 text-sm">{error}</p>
      </div>
    );
  }

  if (!data.length) {
    return (
      <div className="text-center py-8">
        <Database className="w-12 h-12 text-[--gts-portal-muted] mx-auto mb-3" />
        <p className="text-[--gts-portal-muted] text-sm">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-[--gts-portal-border] hover:bg-[--gts-portal-card]/50">
          {selectable && (
            <TableHead className="text-[--gts-portal-text] w-12">
              <Checkbox 
                className="border-[--gts-portal-border]"
                checked={selectedRows.length === data.length}
                onCheckedChange={handleSelectAll}
              />
            </TableHead>
          )}
          {columns.map((column) => (
            <TableHead 
              key={column.key} 
              className="text-[--gts-portal-text]"
              style={{ width: column.width }}
            >
              {column.label}
            </TableHead>
          ))}
          {actions && (
            <TableHead className="text-[--gts-portal-text] w-24">Действия</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((row, index) => (
          <TableRow 
            key={row.id || index} 
            className="border-[--gts-portal-border] hover:bg-[--gts-portal-card]/50"
          >
            {selectable && (
              <TableCell>
                <Checkbox 
                  className="border-[--gts-portal-border]"
                  checked={selectedRows.some(selected => selected.id === row.id)}
                  onCheckedChange={(checked) => handleRowSelect(row, checked as boolean)}
                />
              </TableCell>
            )}
            {columns.map((column) => (
              <TableCell key={column.key} className="text-[--gts-portal-text]">
                {column.render ? column.render(row[column.key], row) : row[column.key]}
              </TableCell>
            ))}
            {actions && (
              <TableCell>
                {actions(row)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

/**
 * GTSChart - Унифицированные графики с темной темой
 */
interface GTSChartProps {
  type: 'area' | 'bar' | 'pie';
  data: any[];
  title?: string;
  height?: number;
  className?: string;
}

export function GTSChart({ type, data, title, height = 300, className }: GTSChartProps) {
  const chartProps = {
    width: "100%",
    height: "100%"
  };

  const commonAxisProps = {
    stroke: "#A6A7AA",
    fontSize: 12
  };

  const tooltipProps = {
    contentStyle: {
      backgroundColor: '#17181A',
      border: '1px solid #232428',
      borderRadius: '8px',
      color: '#FFFFFF'
    }
  };

  const renderChart = () => {
    switch (type) {
      case 'area':
        return (
          <AreaChart data={data} {...chartProps}>
            <defs>
              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#91040C" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#91040C" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
            <XAxis dataKey="name" {...commonAxisProps} />
            <YAxis {...commonAxisProps} />
            <Tooltip {...tooltipProps} />
            <Area 
              type="monotone" 
              dataKey="value" 
              stroke="#91040C" 
              strokeWidth={2}
              fill="url(#colorValue)" 
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart data={data} {...chartProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#232428" />
            <XAxis dataKey="name" {...commonAxisProps} />
            <YAxis {...commonAxisProps} />
            <Tooltip {...tooltipProps} />
            <Bar dataKey="value" fill="#91040C" radius={[4, 4, 0, 0]} />
          </BarChart>
        );

      case 'pie':
        return (
          <PieChart {...chartProps}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || '#91040C'} />
              ))}
            </Pie>
            <Tooltip {...tooltipProps} />
            <Legend 
              wrapperStyle={{
                color: '#A6A7AA',
                fontSize: '12px'
              }}
            />
          </PieChart>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={`bg-[--gts-portal-card] border-[--gts-portal-border] p-6 ${className}`}>
      {title && (
        <h3 className="text-[--gts-portal-text] font-medium mb-4">{title}</h3>
      )}
      <div style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

/**
 * GTSMobileCard - Мобильная карточка для замены таблиц на mobile
 */
interface GTSMobileCardProps {
  data: Record<string, any>;
  avatar?: React.ReactNode;
  title: string;
  subtitle?: string;
  status?: {
    label: string;
    variant: 'success' | 'warning' | 'error' | 'info';
  };
  metadata?: Array<{ label: string; value: string }>;
  actions?: React.ReactNode;
  onClick?: () => void;
}

export function GTSMobileCard({ 
  data, 
  avatar, 
  title, 
  subtitle, 
  status, 
  metadata = [], 
  actions, 
  onClick 
}: GTSMobileCardProps) {
  const statusColors = {
    success: 'bg-green-500/20 text-green-400 border-green-500/30',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    error: 'bg-red-500/20 text-red-400 border-red-500/30',
    info: 'bg-blue-500/20 text-blue-400 border-blue-500/30'
  };

  return (
    <motion.div 
      className="bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg p-4 cursor-pointer"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          {avatar}
          <div>
            <div className="text-[--gts-portal-text] font-medium">{title}</div>
            {subtitle && (
              <div className="text-[--gts-portal-muted] text-sm">{subtitle}</div>
            )}
          </div>
        </div>
        {status && (
          <Badge className={`${statusColors[status.variant]} text-xs`}>
            {status.label}
          </Badge>
        )}
      </div>
      
      {metadata.length > 0 && (
        <div className="flex justify-between items-center text-sm mb-3">
          {metadata.map((item, index) => (
            <div key={index}>
              <span className="text-[--gts-portal-muted]">{item.label}: </span>
              <span className="text-[--gts-portal-text] font-medium">{item.value}</span>
            </div>
          ))}
        </div>
      )}
      
      {actions && (
        <div className="flex justify-end mt-3">
          {actions}
        </div>
      )}
    </motion.div>
  );
}

/**
 * GTSBottomTabbar - Мобильная навигация для CrewApp/ClientClub
 */
interface GTSBottomTabbarProps {
  tabs: Array<{
    id: string;
    label: string;
    icon: React.ReactNode;
    active?: boolean;
    badge?: number;
  }>;
  onTabChange?: (tabId: string) => void;
}

export function GTSBottomTabbar({ tabs, onTabChange }: GTSBottomTabbarProps) {
  return (
    <div className="fixed bottom-4 left-4 right-4 bg-[--gts-portal-surface] border border-[--gts-portal-border] rounded-xl p-2 shadow-lg backdrop-blur-sm">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg relative ${
              tab.active 
                ? 'bg-[--gts-portal-accent] text-white' 
                : 'text-[--gts-portal-muted] hover:text-[--gts-portal-text]'
            }`}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTabChange?.(tab.id)}
          >
            <div className="relative">
              {tab.icon}
              {tab.badge && tab.badge > 0 && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {tab.badge > 99 ? '99+' : tab.badge}
                </div>
              )}
            </div>
            <span className="text-xs">{tab.label}</span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

/**
 * GTSStatsCard - Карточка статистики
 */
interface GTSStatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  color?: 'accent' | 'success' | 'warning' | 'error';
}

export function GTSStatsCard({ title, value, icon, trend, color = 'accent' }: GTSStatsCardProps) {
  const colorClasses = {
    accent: 'from-[--gts-portal-accent] to-red-700',
    success: 'from-green-600 to-green-800',
    warning: 'from-yellow-600 to-yellow-800',
    error: 'from-red-600 to-red-800'
  };

  return (
    <Card className={`bg-gradient-to-br ${colorClasses[color]} p-4 text-white`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/80 text-sm">{title}</p>
          <p className="font-medium text-lg">{value}</p>
          {trend && (
            <div className="flex items-center gap-1 text-xs text-white/80 mt-1">
              {trend.direction === 'up' ? (
                <ArrowUp className="w-3 h-3" />
              ) : (
                <ArrowDown className="w-3 h-3" />
              )}
              {trend.value}
            </div>
          )}
        </div>
        <div className="text-white/60">
          {icon}
        </div>
      </div>
    </Card>
  );
}

/**
 * GTSLoadingSpinner - Унифицированный лоадер
 */
export function GTSLoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex items-center justify-center">
      <Loader className={`${sizeClasses[size]} animate-spin text-[--gts-portal-accent]`} />
    </div>
  );
}

/**
 * GTSEmptyState - Унифицированное пустое состояние
 */
interface GTSEmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function GTSEmptyState({ icon, title, description, action }: GTSEmptyStateProps) {
  return (
    <div className="text-center py-8">
      <div className="text-[--gts-portal-muted] mb-4">
        {icon || <FileText className="w-12 h-12 mx-auto" />}
      </div>
      <h3 className="text-[--gts-portal-text] font-medium mb-2">{title}</h3>
      {description && (
        <p className="text-[--gts-portal-muted] text-sm mb-4">{description}</p>
      )}
      {action && (
        <Button 
          className="bg-[--gts-portal-accent] text-white hover:bg-opacity-90"
          onClick={action.onClick}
        >
          {action.label}
        </Button>
      )}
    </div>
  );
}