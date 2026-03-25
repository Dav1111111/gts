import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Switch } from '../../ui/switch';
import { Calendar as CalendarIcon } from 'lucide-react';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Download, Upload,
  DollarSign, TrendingUp, TrendingDown, BarChart3, PieChart, LineChart,
  FileText, CreditCard, Wallet, Building, Users, Handshake, Target,
  CheckCircle, Clock, AlertCircle, XCircle, Settings, RefreshCw,
  Calculator, Award, Globe, ExternalLink, Copy, ArrowUpRight,
  ArrowDownRight, Percent, Package, Truck, Fuel, UserCheck,
  Zap, Briefcase, Megaphone, Wrench, MapPin, Calendar as CalendarIconLucide,
  Receipt, TrendingUpIcon, Archive, Share2, Mail, Phone
} from 'lucide-react';

interface FinanceCenterProps {
  userRole: string;
}

type TransactionType = 'income' | 'expense';
type TransactionCategory = 'tours' | 'equipment' | 'corporate' | 'partnerships' | 
                          'maintenance' | 'fuel' | 'salaries' | 'marketing' | 'other';
type PaymentStatus = 'pending' | 'paid' | 'overdue' | 'cancelled';

interface FinancialTransaction {
  id: string;
  type: TransactionType;
  category: TransactionCategory;
  description: string;
  amount: number;
  date: string;
  status: PaymentStatus;
  partner?: string;
  client?: string;
  reference?: string;
  vatAmount?: number;
  budgetCategory?: string;
}

interface PartnerCommission {
  id: string;
  partnerId: string;
  partnerName: string;
  partnerType: 'agent' | 'contractor' | 'brand-partner';
  dealId: string;
  dealDescription: string;
  dealAmount: number;
  commissionRate: number;
  commissionAmount: number;
  status: 'pending' | 'paid' | 'cancelled';
  date: string;
  paidDate?: string;
  notes?: string;
}

interface BudgetItem {
  id: string;
  category: string;
  planned: number;
  actual: number;
  period: string;
  variance: number;
  variancePercent: number;
}

interface ReportTemplate {
  id: string;
  name: string;
  type: 'revenue' | 'expenses' | 'pnl' | 'partners' | 'custom';
  filters: {
    dateFrom: string;
    dateTo: string;
    categories: string[];
    partners: string[];
    metrics: string[];
  };
  createdBy: string;
  createdAt: string;
}

export function GTSFinanceCenterExtended({ userRole }: FinanceCenterProps) {
  const [activeTab, setActiveTab] = useState('revenue');
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [isAddTransactionOpen, setIsAddTransactionOpen] = useState(false);
  const [isReportBuilderOpen, setIsReportBuilderOpen] = useState(false);
  const [selectedCommission, setSelectedCommission] = useState<PartnerCommission | null>(null);

  // Mock данные финансовых транзакций
  const transactions: FinancialTransaction[] = [
    {
      id: 'txn-001',
      type: 'income',
      category: 'tours',
      description: 'Экскурсия на яхте - Семья Ивановых',
      amount: 45000,
      date: '2024-06-20T00:00:00Z',
      status: 'paid',
      client: 'Иванов А.П.',
      reference: 'TOUR-2024-001',
      vatAmount: 4500
    },
    {
      id: 'txn-002',
      type: 'income',
      category: 'corporate',
      description: 'Корпоративное мероприятие ООО "Инновации"',
      amount: 180000,
      date: '2024-06-18T00:00:00Z',
      status: 'paid',
      client: 'ООО "Инновации"',
      reference: 'CORP-2024-008',
      vatAmount: 18000
    },
    {
      id: 'txn-003',
      type: 'expense',
      category: 'fuel',
      description: 'Заправка катеров и яхт',
      amount: 25000,
      date: '2024-06-19T00:00:00Z',
      status: 'paid',
      reference: 'FUEL-2024-045',
      budgetCategory: 'Операционные расходы'
    },
    {
      id: 'txn-004',
      type: 'expense',
      category: 'maintenance',
      description: 'Техническое обслуживание яхты "Мечта"',
      amount: 85000,
      date: '2024-06-15T00:00:00Z',
      status: 'paid',
      reference: 'MAINT-2024-012',
      budgetCategory: 'Обслуживание флота'
    },
    {
      id: 'txn-005',
      type: 'income',
      category: 'partnerships',
      description: 'Комиссия от партнёра - Luxury Hotels',
      amount: 15000,
      date: '2024-06-17T00:00:00Z',
      status: 'pending',
      partner: 'Luxury Hotels Group',
      reference: 'COMM-2024-028'
    }
  ];

  // Mock данные комиссий партнёров
  const partnerCommissions: PartnerCommission[] = [
    {
      id: 'comm-001',
      partnerId: 'agent-001',
      partnerName: 'Екатерина Смирнова',
      partnerType: 'agent',
      dealId: 'deal-001',
      dealDescription: 'Корпоративный тур на Эльбрус',
      dealAmount: 145000,
      commissionRate: 12,
      commissionAmount: 17400,
      status: 'pending',
      date: '2024-06-18T00:00:00Z',
      notes: 'Ожидает подтверждения выполнения тура'
    },
    {
      id: 'comm-002',
      partnerId: 'contractor-001',
      partnerName: 'ООО "Морские Прогулки"',
      partnerType: 'contractor',
      dealId: 'deal-002',
      dealDescription: 'Аренда яхты для VIP-клиента',
      dealAmount: 85000,
      commissionRate: 25,
      commissionAmount: 21250,
      status: 'paid',
      date: '2024-06-15T00:00:00Z',
      paidDate: '2024-06-20T00:00:00Z',
      notes: 'Выплачено через банковский перевод'
    },
    {
      id: 'comm-003',
      partnerId: 'brand-001',
      partnerName: 'Luxury Hotels Group',
      partnerType: 'brand-partner',
      dealId: 'deal-003',
      dealDescription: 'Размещение клиентов в отеле',
      dealAmount: 120000,
      commissionRate: 8,
      commissionAmount: 9600,
      status: 'paid',
      date: '2024-06-10T00:00:00Z',
      paidDate: '2024-06-18T00:00:00Z'
    }
  ];

  // Mock данные бюджета
  const budgetItems: BudgetItem[] = [
    {
      id: 'budget-001',
      category: 'Техническое обслуживание',
      planned: 150000,
      actual: 125000,
      period: '2024-06',
      variance: -25000,
      variancePercent: -16.7
    },
    {
      id: 'budget-002',
      category: 'Топливо',
      planned: 80000,
      actual: 95000,
      period: '2024-06',
      variance: 15000,
      variancePercent: 18.8
    },
    {
      id: 'budget-003',
      category: 'Зарплаты и комиссии',
      planned: 200000,
      actual: 185000,
      period: '2024-06',
      variance: -15000,
      variancePercent: -7.5
    },
    {
      id: 'budget-004',
      category: 'Маркетинг',
      planned: 50000,
      actual: 62000,
      period: '2024-06',
      variance: 12000,
      variancePercent: 24.0
    }
  ];

  // Шаблоны отчётов
  const reportTemplates: ReportTemplate[] = [
    {
      id: 'report-001',
      name: 'Месячный отчёт P&L',
      type: 'pnl',
      filters: {
        dateFrom: '2024-06-01',
        dateTo: '2024-06-30',
        categories: ['all'],
        partners: ['all'],
        metrics: ['revenue', 'expenses', 'profit']
      },
      createdBy: 'Алексей Иванов',
      createdAt: '2024-06-15T00:00:00Z'
    },
    {
      id: 'report-002',
      name: 'Отчёт по партнёрам',
      type: 'partners',
      filters: {
        dateFrom: '2024-06-01',
        dateTo: '2024-06-30',
        categories: ['partnerships'],
        partners: ['all'],
        metrics: ['commissions', 'revenue_by_partner']
      },
      createdBy: 'Мария Петрова',
      createdAt: '2024-06-10T00:00:00Z'
    }
  ];

  // Вычисления для KPI
  const totalRevenue = transactions
    .filter(t => t.type === 'income' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense' && t.status === 'paid')
    .reduce((sum, t) => sum + t.amount, 0);

  const grossProfit = totalRevenue - totalExpenses;
  const profitMargin = totalRevenue > 0 ? (grossProfit / totalRevenue) * 100 : 0;

  const pendingCommissions = partnerCommissions
    .filter(c => c.status === 'pending')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const paidCommissions = partnerCommissions
    .filter(c => c.status === 'paid')
    .reduce((sum, c) => sum + c.commissionAmount, 0);

  const averageTransactionValue = totalRevenue > 0 ? 
    totalRevenue / transactions.filter(t => t.type === 'income' && t.status === 'paid').length : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

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
      minute: '2-digit'
    });
  };

  const getCategoryLabel = (category: TransactionCategory) => {
    const labels = {
      tours: 'Туры',
      equipment: 'Оборудование',
      corporate: 'Корпоративы',
      partnerships: 'Партнёрство',
      maintenance: 'Обслуживание',
      fuel: 'Топливо',
      salaries: 'Зарплаты',
      marketing: 'Маркетинг',
      other: 'Прочее'
    };
    return labels[category] || category;
  };

  const getCategoryIcon = (category: TransactionCategory) => {
    const icons = {
      tours: <MapPin className="w-4 h-4" />,
      equipment: <Package className="w-4 h-4" />,
      corporate: <Building className="w-4 h-4" />,
      partnerships: <Handshake className="w-4 h-4" />,
      maintenance: <Wrench className="w-4 h-4" />,
      fuel: <Fuel className="w-4 h-4" />,
      salaries: <Users className="w-4 h-4" />,
      marketing: <Megaphone className="w-4 h-4" />,
      other: <Archive className="w-4 h-4" />
    };
    return icons[category] || <Archive className="w-4 h-4" />;
  };

  const getStatusBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/10 text-green-500">Оплачено</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-blue-600">Ожидает</Badge>;
      case 'overdue':
        return <Badge variant="destructive">Просрочено</Badge>;
      case 'cancelled':
        return <Badge variant="secondary">Отменено</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getCommissionStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500/10 text-green-500">Выплачено</Badge>;
      case 'pending':
        return <Badge variant="outline" className="text-yellow-600">К выплате</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Отменено</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'agent': return <Users className="w-4 h-4" />;
      case 'contractor': return <Truck className="w-4 h-4" />;
      case 'brand-partner': return <Building className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
    }
  };

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (transaction.client && transaction.client.toLowerCase().includes(searchTerm.toLowerCase())) ||
                         (transaction.partner && transaction.partner.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || transaction.category === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const filteredCommissions = partnerCommissions.filter(commission => {
    const matchesSearch = commission.partnerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         commission.dealDescription.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || commission.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1>Финансовый центр</h1>
            <p className="text-muted-foreground">
              Управление выручкой, расходами и финансовой отчётностью
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current-month">Текущий месяц</SelectItem>
                <SelectItem value="last-month">Прошлый месяц</SelectItem>
                <SelectItem value="current-quarter">Текущий квартал</SelectItem>
                <SelectItem value="current-year">Текущий год</SelectItem>
                <SelectItem value="custom">Произвольный период</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={() => setIsReportBuilderOpen(true)}>
              <FileText className="w-4 h-4 mr-2" />
              Создать отчёт
            </Button>
            <Button onClick={() => setIsAddTransactionOpen(true)}>
              <Plus className="w-4 h-4 mr-2" />
              Добавить операцию
            </Button>
          </div>
        </div>

        {/* Основные финансовые KPI */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Общая выручка</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalRevenue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-500">+12.5% за месяц</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-500/10 rounded-lg">
                <TrendingDown className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Общие расходы</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalExpenses)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3 text-red-500" />
                  <span className="text-xs text-red-500">+8.2% за месяц</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Calculator className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Валовая прибыль</p>
                <p className="text-2xl font-semibold">{formatCurrency(grossProfit)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Percent className="w-3 h-3 text-blue-500" />
                  <span className="text-xs text-blue-500">{profitMargin.toFixed(1)}% маржа</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Wallet className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Средний чек</p>
                <p className="text-2xl font-semibold">{formatCurrency(averageTransactionValue)}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Target className="w-3 h-3 text-purple-500" />
                  <span className="text-xs text-purple-500">Цель: 75,000₽</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="revenue">Центр выручки</TabsTrigger>
          <TabsTrigger value="expenses">Расходы и P&L</TabsTrigger>
          <TabsTrigger value="commissions">Партнёрские выплаты</TabsTrigger>
          <TabsTrigger value="reports">Финансовые отчёты</TabsTrigger>
        </TabsList>

        {/* Центр выручки */}
        <TabsContent value="revenue" className="space-y-6">
          {/* Дополнительные KPI по выручке */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Выручка по категориям</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Туры</span>
                  </div>
                  <span className="font-medium">{formatCurrency(45000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Building className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Корпоративы</span>
                  </div>
                  <span className="font-medium">{formatCurrency(180000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Handshake className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Партнёрство</span>
                  </div>
                  <span className="font-medium">{formatCurrency(15000)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Динамика по месяцам</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Май 2024</span>
                  <span className="font-medium">{formatCurrency(420000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Апрель 2024</span>
                  <span className="font-medium">{formatCurrency(380000)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Март 2024</span>
                  <span className="font-medium">{formatCurrency(350000)}</span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Источники продаж</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Прямые продажи</span>
                  <div className="flex items-center gap-2">
                    <Progress value={65} className="w-16 h-2" />
                    <span className="text-sm font-medium">65%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Партнёры-агенты</span>
                  <div className="flex items-center gap-2">
                    <Progress value={25} className="w-16 h-2" />
                    <span className="text-sm font-medium">25%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Онлайн-каналы</span>
                  <div className="flex items-center gap-2">
                    <Progress value={10} className="w-16 h-2" />
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Таблица транзакций по доходам */}
          <Card>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3>Операции по доходам</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Поиск операций..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="paid">Оплачено</SelectItem>
                      <SelectItem value="pending">Ожидает</SelectItem>
                      <SelectItem value="overdue">Просрочено</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт
                  </Button>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Клиент/Партнёр</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>НДС</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions
                  .filter(t => t.type === 'income')
                  .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(transaction.category)}
                        <span>{getCategoryLabel(transaction.category)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.client || transaction.partner || '-'}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{transaction.vatAmount ? formatCurrency(transaction.vatAmount) : '-'}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Расходы и P&L */}
        <TabsContent value="expenses" className="space-y-6">
          {/* P&L панель */}
          <Card className="p-6">
            <h3 className="mb-6">Отчёт о прибылях и убытках (P&L)</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Выручка</span>
                  <span className="text-lg font-semibold text-green-600">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Себестоимость</span>
                  <span className="text-lg font-semibold">{formatCurrency(totalExpenses * 0.6)}</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/50">
                  <span className="font-medium">Валовая прибыль</span>
                  <span className="text-lg font-semibold text-blue-600">
                    {formatCurrency(totalRevenue - (totalExpenses * 0.6))}
                  </span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Операционные расходы</span>
                  <span className="text-lg font-semibold">{formatCurrency(totalExpenses * 0.4)}</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <span className="font-medium">Налоги</span>
                  <span className="text-lg font-semibold">{formatCurrency(grossProfit * 0.13)}</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg bg-green-500/10">
                  <span className="font-medium">Чистая прибыль</span>
                  <span className="text-lg font-semibold text-green-600">
                    {formatCurrency(grossProfit - (grossProfit * 0.13))}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h4 className="font-medium mb-3">Маржинальность</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Валовая маржа</span>
                      <span className="font-medium">{((totalRevenue - (totalExpenses * 0.6)) / totalRevenue * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Операционная маржа</span>
                      <span className="font-medium">{(grossProfit / totalRevenue * 100).toFixed(1)}%</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span>Чистая маржа</span>
                      <span className="font-medium">{((grossProfit - (grossProfit * 0.13)) / totalRevenue * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Бюджет план/факт */}
          <Card className="p-6">
            <h3 className="mb-4">Бюджет: план vs факт</h3>
            <div className="space-y-4">
              {budgetItems.map((item) => (
                <div key={item.id} className="p-4 border rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium">{item.category}</h4>
                    <Badge variant={item.variance < 0 ? 'default' : 'destructive'}>
                      {item.variance < 0 ? 'Экономия' : 'Превышение'} {Math.abs(item.variancePercent).toFixed(1)}%
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">План</p>
                      <p className="font-medium">{formatCurrency(item.planned)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Факт</p>
                      <p className="font-medium">{formatCurrency(item.actual)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Отклонение</p>
                      <p className={`font-medium ${item.variance < 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.variance > 0 ? '+' : ''}{formatCurrency(item.variance)}
                      </p>
                    </div>
                  </div>
                  <Progress 
                    value={Math.min((item.actual / item.planned) * 100, 100)} 
                    className="mt-3 h-2"
                  />
                </div>
              ))}
            </div>
          </Card>

          {/* Таблица расходов */}
          <Card>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3>Операции по расходам</h3>
                <div className="flex items-center gap-3">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все категории</SelectItem>
                      <SelectItem value="maintenance">Обслуживание</SelectItem>
                      <SelectItem value="fuel">Топливо</SelectItem>
                      <SelectItem value="salaries">Зарплаты</SelectItem>
                      <SelectItem value="marketing">Маркетинг</SelectItem>
                      <SelectItem value="other">Прочее</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт
                  </Button>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Категория</TableHead>
                  <TableHead>Описание</TableHead>
                  <TableHead>Бюджетная категория</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions
                  .filter(t => t.type === 'expense')
                  .map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{formatDate(transaction.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(transaction.category)}
                        <span>{getCategoryLabel(transaction.category)}</span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.description}</TableCell>
                    <TableCell>{transaction.budgetCategory || '-'}</TableCell>
                    <TableCell className="font-medium text-red-600">{formatCurrency(transaction.amount)}</TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Партнёрские выплаты */}
        <TabsContent value="commissions" className="space-y-6">
          {/* Статистика комиссий */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <Clock className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">К выплате</p>
                  <p className="text-2xl font-semibold">{formatCurrency(pendingCommissions)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Выплачено</p>
                  <p className="text-2xl font-semibold">{formatCurrency(paidCommissions)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Calculator className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего начислено</p>
                  <p className="text-2xl font-semibold">{formatCurrency(pendingCommissions + paidCommissions)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Users className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Активных партнёров</p>
                  <p className="text-2xl font-semibold">{partnerCommissions.length}</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Реестр комиссий */}
          <Card>
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h3>Реестр партнёрских комиссий</h3>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input 
                      placeholder="Поиск по партнёру или сделке..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Все статусы</SelectItem>
                      <SelectItem value="pending">К выплате</SelectItem>
                      <SelectItem value="paid">Выплачено</SelectItem>
                      <SelectItem value="cancelled">Отменено</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Экспорт
                  </Button>
                </div>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Дата</TableHead>
                  <TableHead>Партнёр</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Сделка</TableHead>
                  <TableHead>Сумма сделки</TableHead>
                  <TableHead>Ставка</TableHead>
                  <TableHead>Комиссия</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>{formatDate(commission.date)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {getPartnerTypeIcon(commission.partnerType)}
                        <span className="font-medium">{commission.partnerName}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {commission.partnerType === 'agent' ? 'Агент' :
                         commission.partnerType === 'contractor' ? 'Подрядчик' : 'Бренд-партнёр'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div>
                        <p className="font-medium">{commission.dealDescription}</p>
                        <p className="text-sm text-muted-foreground">ID: {commission.dealId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(commission.dealAmount)}</TableCell>
                    <TableCell>{commission.commissionRate}%</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(commission.commissionAmount)}
                    </TableCell>
                    <TableCell>{getCommissionStatusBadge(commission.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => setSelectedCommission(commission)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {commission.status === 'pending' && (
                          <Button variant="ghost" size="sm" className="text-green-600">
                            <CheckCircle className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>

          {/* Топ партнёры по комиссиям */}
          <Card className="p-6">
            <h3 className="mb-4">Топ партнёры по комиссиям</h3>
            <div className="space-y-4">
              {partnerCommissions
                .reduce((acc, commission) => {
                  const existing = acc.find(p => p.partnerId === commission.partnerId);
                  if (existing) {
                    existing.totalCommission += commission.commissionAmount;
                    existing.dealsCount += 1;
                  } else {
                    acc.push({
                      partnerId: commission.partnerId,
                      partnerName: commission.partnerName,
                      partnerType: commission.partnerType,
                      totalCommission: commission.commissionAmount,
                      dealsCount: 1
                    });
                  }
                  return acc;
                }, [] as any[])
                .sort((a, b) => b.totalCommission - a.totalCommission)
                .slice(0, 5)
                .map((partner, index) => (
                  <div key={partner.partnerId} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex items-center gap-2">
                      {getPartnerTypeIcon(partner.partnerType)}
                      <div>
                        <p className="font-medium">{partner.partnerName}</p>
                        <p className="text-sm text-muted-foreground">{partner.dealsCount} сделок</p>
                      </div>
                    </div>
                    <div className="ml-auto text-right">
                      <p className="font-medium">{formatCurrency(partner.totalCommission)}</p>
                      <p className="text-sm text-muted-foreground">комиссия</p>
                    </div>
                  </div>
                ))}
            </div>
          </Card>
        </TabsContent>

        {/* Финансовые отчёты */}
        <TabsContent value="reports" className="space-y-6">
          {/* Быстрые отчёты */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <BarChart3 className="w-5 h-5 text-blue-500" />
                <h3>Отчёт P&L</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Прибыли и убытки за выбранный период
              </p>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Создать отчёт
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <PieChart className="w-5 h-5 text-green-500" />
                <h3>Отчёт по расходам</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Структура расходов по категориям
              </p>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Создать отчёт
              </Button>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-5 h-5 text-purple-500" />
                <h3>Отчёт по партнёрам</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Комиссии и выплаты партнёрам
              </p>
              <Button className="w-full" variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Создать отчёт
              </Button>
            </Card>
          </div>

          {/* Конструктор отчётов */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Конструктор отчётов</h3>
              <Button onClick={() => setIsReportBuilderOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать новый отчёт
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3">Сохранённые шаблоны</h4>
                <div className="space-y-3">
                  {reportTemplates.map((template) => (
                    <div key={template.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{template.name}</p>
                        <p className="text-sm text-muted-foreground">
                          Создан: {template.createdBy} • {formatDate(template.createdAt)}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Быстрое создание</h4>
                <div className="space-y-4">
                  <div>
                    <Label>Тип отчёта</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип отчёта" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Отчёт по выручке</SelectItem>
                        <SelectItem value="expenses">Отчёт по расходам</SelectItem>
                        <SelectItem value="pnl">P&L отчёт</SelectItem>
                        <SelectItem value="partners">Отчёт по партнёрам</SelectItem>
                        <SelectItem value="custom">Произвольный отчёт</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Период с</Label>
                      <Input type="date" />
                    </div>
                    <div>
                      <Label>Период по</Label>
                      <Input type="date" />
                    </div>
                  </div>

                  <div>
                    <Label>Формат экспорта</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите формат" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="csv">CSV</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Создать отчёт
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Последние сгенерированные отчёты */}
          <Card className="p-6">
            <h3 className="mb-4">Последние отчёты</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">P&L отчёт за июнь 2024</p>
                    <p className="text-sm text-muted-foreground">Создан: 20.06.2024 • PDF, 2.3 МБ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Отчёт по комиссиям партнёров</p>
                    <p className="text-sm text-muted-foreground">Создан: 18.06.2024 • Excel, 1.8 МБ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Анализ расходов по категориям</p>
                    <p className="text-sm text-muted-foreground">Создан: 15.06.2024 • PDF, 1.2 МБ</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог добавления транзакции */}
      <Dialog open={isAddTransactionOpen} onOpenChange={setIsAddTransactionOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить финансовую операцию</DialogTitle>
            <DialogDescription>
              Создайте новую запись о доходе или расходе
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Тип операции</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Доход</SelectItem>
                    <SelectItem value="expense">Расход</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="tours">Туры</SelectItem>
                    <SelectItem value="corporate">Корпоративы</SelectItem>
                    <SelectItem value="partnerships">Партнёрство</SelectItem>
                    <SelectItem value="maintenance">Обслуживание</SelectItem>
                    <SelectItem value="fuel">Топливо</SelectItem>
                    <SelectItem value="salaries">Зарплаты</SelectItem>
                    <SelectItem value="marketing">Маркетинг</SelectItem>
                    <SelectItem value="other">Прочее</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Описание операции</Label>
              <Input placeholder="Краткое описание операции" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Сумма</Label>
                <Input type="number" placeholder="0" />
              </div>
              <div>
                <Label>Дата операции</Label>
                <Input type="date" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Клиент/Контрагент</Label>
                <Input placeholder="Название клиента или контрагента" />
              </div>
              <div>
                <Label>Референс</Label>
                <Input placeholder="Номер договора, счёта и т.д." />
              </div>
            </div>

            <div>
              <Label>Комментарии</Label>
              <Textarea placeholder="Дополнительная информация об операции..." rows={3} />
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setIsAddTransactionOpen(false)} className="flex-1">
                Создать операцию
              </Button>
              <Button variant="outline" onClick={() => setIsAddTransactionOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог конструктора отчётов */}
      <Dialog open={isReportBuilderOpen} onOpenChange={setIsReportBuilderOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Конструктор финансовых отчётов</DialogTitle>
            <DialogDescription>
              Настройте параметры отчёта и выберите показатели для анализа
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Название отчёта</Label>
                  <Input placeholder="Введите название отчёта" />
                </div>
                
                <div>
                  <Label>Тип отчёта</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="revenue">Отчёт по выручке</SelectItem>
                      <SelectItem value="expenses">Отчёт по расходам</SelectItem>
                      <SelectItem value="pnl">P&L отчёт</SelectItem>
                      <SelectItem value="partners">Отчёт по партнёрам</SelectItem>
                      <SelectItem value="budget">Бюджетный отчёт</SelectItem>
                      <SelectItem value="custom">Произвольный отчёт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Период с</Label>
                    <Input type="date" />
                  </div>
                  <div>
                    <Label>Период по</Label>
                    <Input type="date" />
                  </div>
                </div>

                <div>
                  <Label>Формат экспорта</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите формат" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel (XLSX)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="mb-3 block">Категории для включения</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cat-tours" className="rounded" />
                      <label htmlFor="cat-tours" className="text-sm">Туры</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cat-corporate" className="rounded" />
                      <label htmlFor="cat-corporate" className="text-sm">Корпоративы</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cat-partnerships" className="rounded" />
                      <label htmlFor="cat-partnerships" className="text-sm">Партнёрство</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cat-maintenance" className="rounded" />
                      <label htmlFor="cat-maintenance" className="text-sm">Обслуживание</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="cat-fuel" className="rounded" />
                      <label htmlFor="cat-fuel" className="text-sm">Топливо</label>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="mb-3 block">Показатели для отчёта</Label>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-revenue" className="rounded" />
                      <label htmlFor="metric-revenue" className="text-sm">Выручка</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-expenses" className="rounded" />
                      <label htmlFor="metric-expenses" className="text-sm">Расходы</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-profit" className="rounded" />
                      <label htmlFor="metric-profit" className="text-sm">Прибыль</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-commissions" className="rounded" />
                      <label htmlFor="metric-commissions" className="text-sm">Комиссии</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input type="checkbox" id="metric-margins" className="rounded" />
                      <label htmlFor="metric-margins" className="text-sm">Маржинальность</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="save-template" className="rounded" />
                <label htmlFor="save-template" className="text-sm">Сохранить как шаблон</label>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsReportBuilderOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setIsReportBuilderOpen(false)}>
                  <FileText className="w-4 h-4 mr-2" />
                  Создать отчёт
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог детальной информации о комиссии */}
      {selectedCommission && (
        <Dialog open={!!selectedCommission} onOpenChange={() => setSelectedCommission(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Детали комиссии</DialogTitle>
              <DialogDescription>
                Подробная информация о партнёрской комиссии
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label>Партнёр</Label>
                    <p className="font-medium">{selectedCommission.partnerName}</p>
                  </div>
                  
                  <div>
                    <Label>Тип партнёра</Label>
                    <Badge variant="outline">
                      {selectedCommission.partnerType === 'agent' ? 'Агент' :
                       selectedCommission.partnerType === 'contractor' ? 'Подрядчик' : 'Бренд-партнёр'}
                    </Badge>
                  </div>

                  <div>
                    <Label>Описание сделки</Label>
                    <p>{selectedCommission.dealDescription}</p>
                  </div>

                  <div>
                    <Label>Дата сделки</Label>
                    <p>{formatDate(selectedCommission.date)}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label>Сумма сделки</Label>
                    <p className="font-medium text-lg">{formatCurrency(selectedCommission.dealAmount)}</p>
                  </div>

                  <div>
                    <Label>Комиссионная ставка</Label>
                    <p className="font-medium">{selectedCommission.commissionRate}%</p>
                  </div>

                  <div>
                    <Label>Сумма комиссии</Label>
                    <p className="font-medium text-lg text-green-600">
                      {formatCurrency(selectedCommission.commissionAmount)}
                    </p>
                  </div>

                  <div>
                    <Label>Статус</Label>
                    {getCommissionStatusBadge(selectedCommission.status)}
                  </div>

                  {selectedCommission.paidDate && (
                    <div>
                      <Label>Дата выплаты</Label>
                      <p>{formatDate(selectedCommission.paidDate)}</p>
                    </div>
                  )}
                </div>
              </div>

              {selectedCommission.notes && (
                <div>
                  <Label>Комментарии</Label>
                  <p className="p-3 bg-muted rounded-lg">{selectedCommission.notes}</p>
                </div>
              )}

              {selectedCommission.status === 'pending' && (
                <div className="space-y-4">
                  <Separator />
                  <div>
                    <Label>Добавить комментарий к выплате</Label>
                    <Textarea placeholder="Комментарий о выплате..." rows={3} />
                  </div>
                  <div className="flex gap-3">
                    <Button className="flex-1">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Отметить как выплачено
                    </Button>
                    <Button variant="outline" onClick={() => setSelectedCommission(null)}>
                      Закрыть
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}