import React, { useState } from 'react';
import { Activity, Clock, User, FileText, Filter, Search, Calendar, Eye, Shield, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { ScrollArea } from '../ui/scroll-area';
import { Separator } from '../ui/separator';

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: string;
  page: string;
  actor: {
    id: string;
    name: string;
    avatar?: string;
    role: string;
  };
  details: string;
  ip: string;
  userAgent: string;
  level: 'info' | 'warning' | 'error' | 'success';
  category: 'auth' | 'profile' | 'documents' | 'settings' | 'system' | 'security';
}

interface AuditStats {
  totalEntries: number;
  todayEntries: number;
  uniqueUsers: number;
  criticalEvents: number;
}

interface GTSSharedAuditProps {
  entries: AuditEntry[];
  stats: AuditStats;
  userRole: 'partner-agent' | 'contractor' | 'brand-partner' | 'admin';
  canViewFullDetails?: boolean;
}

const actionIcons = {
  auth: <Shield className="h-4 w-4" />,
  profile: <User className="h-4 w-4" />,
  documents: <FileText className="h-4 w-4" />,
  settings: <Activity className="h-4 w-4" />,
  system: <Activity className="h-4 w-4" />,
  security: <AlertTriangle className="h-4 w-4" />
};

const levelColors = {
  info: 'bg-blue-500 text-white',
  warning: 'bg-[var(--gts-portal-warning)] text-white',
  error: 'bg-[var(--gts-portal-error)] text-white',
  success: 'bg-[var(--gts-portal-success)] text-white'
};

const categoryLabels = {
  auth: 'Аутентификация',
  profile: 'Профиль',
  documents: 'Документы',
  settings: 'Настройки',
  system: 'Система',
  security: 'Безопасность'
};

export function GTSSharedAudit({
  entries,
  stats,
  userRole,
  canViewFullDetails = false
}: GTSSharedAuditProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');
  const [selectedPeriod, setSelectedPeriod] = useState<string>('all');
  const [selectedEntry, setSelectedEntry] = useState<AuditEntry | null>(null);

  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.page.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         entry.details.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || entry.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || entry.level === selectedLevel;
    
    let matchesPeriod = true;
    if (selectedPeriod !== 'all') {
      const entryDate = new Date(entry.timestamp);
      const now = new Date();
      
      switch (selectedPeriod) {
        case 'today':
          matchesPeriod = entryDate.toDateString() === now.toDateString();
          break;
        case 'week':
          matchesPeriod = (now.getTime() - entryDate.getTime()) <= 7 * 24 * 60 * 60 * 1000;
          break;
        case 'month':
          matchesPeriod = (now.getTime() - entryDate.getTime()) <= 30 * 24 * 60 * 60 * 1000;
          break;
        case 'quarter':
          matchesPeriod = (now.getTime() - entryDate.getTime()) <= 90 * 24 * 60 * 60 * 1000;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesLevel && matchesPeriod;
  });

  const formatRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'только что';
    if (diffInMinutes < 60) return `${diffInMinutes} мин. назад`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ч. назад`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} дн. назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading text-[var(--gts-portal-text)]">
            Журнал активности
          </h1>
          <p className="text-[var(--gts-portal-muted)]">
            История действий и системных событий
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
            Только для чтения
          </Badge>
          <Badge className="bg-[var(--gts-portal-accent)] text-white">
            {filteredEntries.length} записей
          </Badge>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-surface)] rounded-lg">
                <Activity className="h-5 w-5 text-[var(--gts-portal-text)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.totalEntries}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Всего записей</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Clock className="h-5 w-5 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.todayEntries}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Сегодня</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-success)]/20 rounded-lg">
                <User className="h-5 w-5 text-[var(--gts-portal-success)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.uniqueUsers}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Активных пользователей</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[var(--gts-portal-error)]/20 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-[var(--gts-portal-error)]" />
              </div>
              <div>
                <div className="text-2xl font-heading text-[var(--gts-portal-text)]">{stats.criticalEvents}</div>
                <div className="text-sm text-[var(--gts-portal-muted)]">Критических событий</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)] flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--gts-portal-muted)]" />
              <Input
                placeholder="Поиск по действиям..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Категория" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Все категории</SelectItem>
                <SelectItem value="auth">Аутентификация</SelectItem>
                <SelectItem value="profile">Профиль</SelectItem>
                <SelectItem value="documents">Документы</SelectItem>
                <SelectItem value="settings">Настройки</SelectItem>
                <SelectItem value="system">Система</SelectItem>
                <SelectItem value="security">Безопасность</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Уровень" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Все уровни</SelectItem>
                <SelectItem value="info">Информация</SelectItem>
                <SelectItem value="warning">Предупреждение</SelectItem>
                <SelectItem value="error">Ошибка</SelectItem>
                <SelectItem value="success">Успех</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Период" />
              </SelectTrigger>
              <SelectContent className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
                <SelectItem value="all">Весь период</SelectItem>
                <SelectItem value="today">Сегодня</SelectItem>
                <SelectItem value="week">Последняя неделя</SelectItem>
                <SelectItem value="month">Последний месяц</SelectItem>
                <SelectItem value="quarter">Последний квартал</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
        <CardHeader>
          <CardTitle className="text-[var(--gts-portal-text)]">
            Журнал активности ({filteredEntries.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-[var(--gts-portal-border)]">
                  <TableHead className="text-[var(--gts-portal-text)]">Время</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Пользователь</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Действие</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Страница</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Категория</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Уровень</TableHead>
                  <TableHead className="text-[var(--gts-portal-text)]">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredEntries.map((entry) => (
                  <TableRow key={entry.id} className="border-[var(--gts-portal-border)]">
                    <TableCell>
                      <div className="text-[var(--gts-portal-text)]">
                        <div className="font-medium">
                          {formatRelativeTime(entry.timestamp)}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">
                          {new Date(entry.timestamp).toLocaleString('ru-RU')}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={entry.actor.avatar} alt={entry.actor.name} />
                          <AvatarFallback className="bg-[var(--gts-portal-surface)] text-[var(--gts-portal-text)] text-xs">
                            {entry.actor.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-[var(--gts-portal-text)] font-medium">
                            {entry.actor.name}
                          </div>
                          <div className="text-sm text-[var(--gts-portal-muted)]">
                            {entry.actor.role}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-[var(--gts-portal-text)]">
                        {entry.action}
                      </div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">
                        {entry.details}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="text-[var(--gts-portal-text)]">
                        {entry.page}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="text-[var(--gts-portal-text)]">
                          {actionIcons[entry.category]}
                        </div>
                        <span className="text-[var(--gts-portal-text)]">
                          {categoryLabels[entry.category]}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={levelColors[entry.level]}>
                        {entry.level === 'info' && 'Инфо'}
                        {entry.level === 'warning' && 'Предупреждение'}
                        {entry.level === 'error' && 'Ошибка'}
                        {entry.level === 'success' && 'Успех'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {canViewFullDetails && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedEntry(entry)}
                          className="text-[var(--gts-portal-text)] hover:bg-[var(--gts-portal-surface)]"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {filteredEntries.length === 0 && (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-[var(--gts-portal-muted)] mx-auto mb-4" />
              <div className="text-[var(--gts-portal-text)] font-medium mb-2">
                Записи не найдены
              </div>
              <div className="text-[var(--gts-portal-muted)]">
                Попробуйте изменить параметры фильтра
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Entry Details Modal */}
      {selectedEntry && canViewFullDetails && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)] max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-[var(--gts-portal-text)]">
                  Детали события
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedEntry(null)}
                  className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-[var(--gts-portal-muted)]">Время</label>
                  <div className="text-[var(--gts-portal-text)]">
                    {new Date(selectedEntry.timestamp).toLocaleString('ru-RU')}
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[var(--gts-portal-muted)]">ID записи</label>
                  <div className="text-[var(--gts-portal-text)]">{selectedEntry.id}</div>
                </div>
                <div>
                  <label className="text-sm text-[var(--gts-portal-muted)]">Пользователь</label>
                  <div className="text-[var(--gts-portal-text)]">
                    {selectedEntry.actor.name} ({selectedEntry.actor.role})
                  </div>
                </div>
                <div>
                  <label className="text-sm text-[var(--gts-portal-muted)]">IP адрес</label>
                  <div className="text-[var(--gts-portal-text)]">{selectedEntry.ip}</div>
                </div>
              </div>
              
              <Separator className="bg-[var(--gts-portal-border)]" />
              
              <div>
                <label className="text-sm text-[var(--gts-portal-muted)]">Действие</label>
                <div className="text-[var(--gts-portal-text)]">{selectedEntry.action}</div>
              </div>
              
              <div>
                <label className="text-sm text-[var(--gts-portal-muted)]">Детали</label>
                <div className="text-[var(--gts-portal-text)]">{selectedEntry.details}</div>
              </div>
              
              <div>
                <label className="text-sm text-[var(--gts-portal-muted)]">User Agent</label>
                <div className="text-[var(--gts-portal-text)] text-sm break-all">
                  {selectedEntry.userAgent}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}