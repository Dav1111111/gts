import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Switch } from '../../ui/switch';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '../../ui/alert-dialog';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, TrendingUp, DollarSign, 
  FileText, MessageSquare, MapPin, Users, Calendar, Activity, 
  PieChart, BarChart3, Download, Mail, Phone, Globe, Star,
  Target, Building2, UserCheck, Clock, ArrowUp, ArrowDown,
  Settings, Briefcase, Handshake, Award, Zap, MoreHorizontal,
  TrendingDown, Percent, Calculator, ExternalLink, Copy,
  Shield, CheckCircle, XCircle, AlertTriangle, Banknote, Save
} from 'lucide-react';

interface PartnersProps {
  userRole: string;
}

interface Partner {
  id: string;
  name: string;
  type: 'agent' | 'contractor' | 'brand-partner';
  status: 'active' | 'paused' | 'terminated';
  manager: string;
  contactPerson: string;
  email: string;
  phone: string;
  website?: string;
  address: string;
  startDate: string;
  commission: {
    type: 'percentage' | 'fixed';
    rate: number;
    startDate: string;
    endDate?: string;
  };
  stats: {
    totalDeals: number;
    totalRevenue: number;
    commissionEarned: number;
    commissionPaid: number;
    rating: number;
    conversionRate: number;
  };
  lastActivity: string;
  avatar?: string;
}

interface CommissionRule {
  id: string;
  partnerType: 'agent' | 'contractor' | 'brand-partner';
  type: 'percentage' | 'fixed';
  rate: number;
  minDeal?: number;
  maxDeal?: number;
  isDefault: boolean;
}

interface Deal {
  id: string;
  partnerId: string;
  clientName: string;
  service: string;
  amount: number;
  commission: number;
  status: 'pending' | 'confirmed' | 'paid';
  date: string;
}

export function GTSPartnersDatabaseExtended({ userRole }: PartnersProps) {
  const [activeTab, setActiveTab] = useState('agents');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [showCommissionSettings, setShowCommissionSettings] = useState(false);

  // Mock данные партнёров
  const partners: Partner[] = [
    {
      id: 'agent-001',
      name: 'Travel Pro Agency',
      type: 'agent',
      status: 'active',
      manager: 'Елена Смирнова',
      contactPerson: 'Игорь Петров',
      email: 'igor@travelpro.ru',
      phone: '+7 (495) 123-45-67',
      website: 'travelpro.ru',
      address: 'Москва, ул. Тверская, 1',
      startDate: '2024-01-15',
      commission: {
        type: 'percentage',
        rate: 12,
        startDate: '2024-01-15'
      },
      stats: {
        totalDeals: 156,
        totalRevenue: 2450000,
        commissionEarned: 294000,
        commissionPaid: 280000,
        rating: 4.8,
        conversionRate: 24
      },
      lastActivity: '2024-06-20T15:30:00Z'
    },
    {
      id: 'agent-002',
      name: 'Luxury Tours Moscow',
      type: 'agent',
      status: 'active',
      manager: 'Алексей Волков',
      contactPerson: 'Мария Кузнецова',
      email: 'maria@luxurytours.ru',
      phone: '+7 (495) 234-56-78',
      address: 'Москва, ул. Арбат, 15',
      startDate: '2024-02-01',
      commission: {
        type: 'percentage',
        rate: 10,
        startDate: '2024-02-01'
      },
      stats: {
        totalDeals: 89,
        totalRevenue: 1890000,
        commissionEarned: 189000,
        commissionPaid: 175000,
        rating: 4.6,
        conversionRate: 19
      },
      lastActivity: '2024-06-20T12:45:00Z'
    },
    {
      id: 'contractor-001',
      name: 'Яхт-Сервис Премиум',
      type: 'contractor',
      status: 'active',
      manager: 'Дмитрий Козлов',
      contactPerson: 'Андрей Морской',
      email: 'andrey@yacht-premium.ru',
      phone: '+7 (495) 345-67-89',
      address: 'Сочи, ул. Морская, 25',
      startDate: '2023-06-10',
      commission: {
        type: 'percentage',
        rate: 25,
        startDate: '2023-06-10'
      },
      stats: {
        totalDeals: 234,
        totalRevenue: 4200000,
        commissionEarned: 1050000,
        commissionPaid: 980000,
        rating: 4.9,
        conversionRate: 45
      },
      lastActivity: '2024-06-20T16:20:00Z'
    },
    {
      id: 'contractor-002',
      name: 'Горные Приключения',
      type: 'contractor',
      status: 'paused',
      manager: 'Ольга Горная',
      contactPerson: 'Сергей Альпинист',
      email: 'sergey@mountain-adventures.ru',
      phone: '+7 (495) 456-78-90',
      address: 'Красная Поляна, ул. Горная, 8',
      startDate: '2023-12-01',
      commission: {
        type: 'percentage',
        rate: 20,
        startDate: '2023-12-01'
      },
      stats: {
        totalDeals: 67,
        totalRevenue: 980000,
        commissionEarned: 196000,
        commissionPaid: 150000,
        rating: 4.3,
        conversionRate: 31
      },
      lastActivity: '2024-06-15T10:30:00Z'
    },
    {
      id: 'brand-001',
      name: 'Mercedes-Benz Yachts',
      type: 'brand-partner',
      status: 'active',
      manager: 'Виктория Люкс',
      contactPerson: 'Максим Брендов',
      email: 'maxim@mb-yachts.com',
      phone: '+7 (495) 567-89-01',
      website: 'mercedes-benz-yachts.com',
      address: 'Москва, ул. Лубянка, 12',
      startDate: '2023-03-15',
      commission: {
        type: 'fixed',
        rate: 50000,
        startDate: '2023-03-15'
      },
      stats: {
        totalDeals: 45,
        totalRevenue: 8900000,
        commissionEarned: 2250000,
        commissionPaid: 2100000,
        rating: 5.0,
        conversionRate: 67
      },
      lastActivity: '2024-06-20T14:15:00Z'
    },
    {
      id: 'brand-002',
      name: 'Helicopter Tours Premium',
      type: 'brand-partner',
      status: 'active',
      manager: 'Роман Небесный',
      contactPerson: 'Анна Высотина',
      email: 'anna@heli-premium.ru',
      phone: '+7 (495) 678-90-12',
      address: 'Сочи, аэропорт, ангар 5',
      startDate: '2023-08-01',
      commission: {
        type: 'percentage',
        rate: 30,
        startDate: '2023-08-01'
      },
      stats: {
        totalDeals: 78,
        totalRevenue: 3400000,
        commissionEarned: 1020000,
        commissionPaid: 950000,
        rating: 4.7,
        conversionRate: 52
      },
      lastActivity: '2024-06-20T13:00:00Z'
    }
  ];

  // Mock данные настроек комиссий
  const commissionRules: CommissionRule[] = [
    {
      id: 'rule-agent-default',
      partnerType: 'agent',
      type: 'percentage',
      rate: 10,
      isDefault: true
    },
    {
      id: 'rule-contractor-default',
      partnerType: 'contractor',
      type: 'percentage',
      rate: 20,
      isDefault: true
    },
    {
      id: 'rule-brand-default',
      partnerType: 'brand-partner',
      type: 'percentage',
      rate: 25,
      isDefault: true
    }
  ];

  // Mock данные сделок
  const deals: Deal[] = [
    {
      id: 'deal-001',
      partnerId: 'agent-001',
      clientName: 'Семья Ивановых',
      service: 'Яхт-тур на Черном море',
      amount: 85000,
      commission: 10200,
      status: 'confirmed',
      date: '2024-06-18'
    },
    {
      id: 'deal-002',
      partnerId: 'contractor-001',
      clientName: 'Корпорация "Успех"',
      service: 'VIP-круиз на яхте',
      amount: 450000,
      commission: 112500,
      status: 'paid',
      date: '2024-06-20'
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'agent': return 'Агент';
      case 'contractor': return 'Подрядчик';
      case 'brand-partner': return 'Бренд-партнёр';
      default: return type;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'paused': return 'text-yellow-500';
      case 'terminated': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500/10 text-green-500">Активен</Badge>;
      case 'paused': return <Badge variant="outline" className="text-yellow-600">Приостановлен</Badge>;
      case 'terminated': return <Badge variant="destructive">Завершён</Badge>;
      default: return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

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

  const filteredPartners = partners.filter(partner => {
    const matchesSearch = partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         partner.manager.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    
    const matchesType = activeTab === 'all' || 
                       (activeTab === 'agents' && partner.type === 'agent') ||
                       (activeTab === 'contractors' && partner.type === 'contractor') ||
                       (activeTab === 'brands' && partner.type === 'brand-partner');
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const sortedPartners = [...filteredPartners].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortBy) {
      case 'revenue':
        aValue = a.stats.totalRevenue;
        bValue = b.stats.totalRevenue;
        break;
      case 'deals':
        aValue = a.stats.totalDeals;
        bValue = b.stats.totalDeals;
        break;
      case 'commission':
        aValue = a.stats.commissionEarned;
        bValue = b.stats.commissionEarned;
        break;
      case 'rating':
        aValue = a.stats.rating;
        bValue = b.stats.rating;
        break;
      case 'name':
        aValue = a.name;
        bValue = b.name;
        break;
      default:
        aValue = a.stats.totalRevenue;
        bValue = b.stats.totalRevenue;
    }
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    
    return sortOrder === 'asc' ? (aValue as number) - (bValue as number) : (bValue as number) - (aValue as number);
  });

  const totalStats = {
    totalPartners: partners.length,
    activePartners: partners.filter(p => p.status === 'active').length,
    totalRevenue: partners.reduce((sum, p) => sum + p.stats.totalRevenue, 0),
    totalCommission: partners.reduce((sum, p) => sum + p.stats.commissionEarned, 0),
    avgRating: partners.reduce((sum, p) => sum + p.stats.rating, 0) / partners.length
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1>База партнёров</h1>
          <p className="text-muted-foreground">
            Управление агентами, подрядчиками и бренд-партнёрами
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setShowCommissionSettings(true)}>
            <Settings className="w-4 h-4 mr-2" />
            Настройки комиссий
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Добавить партнёра
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Добавить нового партнёра</DialogTitle>
                <DialogDescription>
                  Заполните информацию о новом партнёре
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Тип партнёра</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="agent">Агент</SelectItem>
                        <SelectItem value="contractor">Подрядчик</SelectItem>
                        <SelectItem value="brand-partner">Бренд-партнёр</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Название</Label>
                    <Input placeholder="Название организации" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Контактное лицо</Label>
                    <Input placeholder="ФИО" />
                  </div>
                  <div>
                    <Label>Ответственный менеджер</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите менеджера" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="elena">Елена Смирнова</SelectItem>
                        <SelectItem value="alexey">Алексей Волков</SelectItem>
                        <SelectItem value="dmitry">Дмитрий Козлов</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Email</Label>
                    <Input type="email" placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label>Телефон</Label>
                    <Input placeholder="+7 (999) 123-45-67" />
                  </div>
                </div>
                <div>
                  <Label>Адрес</Label>
                  <Textarea placeholder="Полный адрес" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Тип комиссии</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Процент</SelectItem>
                        <SelectItem value="fixed">Фиксированная сумма</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Ставка комиссии</Label>
                    <Input placeholder="10% или 5000 ₽" />
                  </div>
                </div>
                <Button className="w-full">
                  <Handshake className="w-4 h-4 mr-2" />
                  Создать партнёрство
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Users className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Всего партнёров</p>
              <p className="text-2xl font-semibold">{totalStats.totalPartners}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Активных</p>
              <p className="text-2xl font-semibold">{totalStats.activePartners}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <TrendingUp className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Общая выручка</p>
              <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalRevenue)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg">
              <DollarSign className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Комиссии</p>
              <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalCommission)}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Star className="w-5 h-5 text-yellow-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Средний рейтинг</p>
              <p className="text-2xl font-semibold">{totalStats.avgRating.toFixed(1)}</p>
            </div>
          </div>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList>
            <TabsTrigger value="all">Все партнёры</TabsTrigger>
            <TabsTrigger value="agents">Агенты</TabsTrigger>
            <TabsTrigger value="contractors">Подрядчики</TabsTrigger>
            <TabsTrigger value="brands">Бренд-партнёры</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Поиск партнёров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="paused">Приостановленные</SelectItem>
                <SelectItem value="terminated">Завершённые</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue">По выручке</SelectItem>
                <SelectItem value="deals">По сделкам</SelectItem>
                <SelectItem value="commission">По комиссии</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="name">По названию</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            >
              {sortOrder === 'asc' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        <TabsContent value={activeTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold">
                        {partner.name.charAt(0)}
                      </div>
                      <div>
                        <h3 className="font-medium">{partner.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          {getTypeLabel(partner.type)}
                        </Badge>
                      </div>
                    </div>
                    {getStatusBadge(partner.status)}
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <UserCheck className="w-4 h-4 text-muted-foreground" />
                      <span>{partner.contactPerson}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="w-4 h-4 text-muted-foreground" />
                      <span>Менеджер: {partner.manager}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span>{partner.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{partner.phone}</span>
                    </div>
                    {partner.website && (
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-muted-foreground" />
                        <span>{partner.website}</span>
                      </div>
                    )}
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Комиссия:</span>
                      <span className="font-medium">
                        {partner.commission.type === 'percentage' 
                          ? `${partner.commission.rate}%` 
                          : formatCurrency(partner.commission.rate)
                        }
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Сделок</p>
                        <p className="font-medium">{partner.stats.totalDeals}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Выручка</p>
                        <p className="font-medium">{formatCurrency(partner.stats.totalRevenue)}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Заработано</p>
                        <p className="font-medium text-green-600">{formatCurrency(partner.stats.commissionEarned)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Выплачено</p>
                        <p className="font-medium">{formatCurrency(partner.stats.commissionPaid)}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="font-medium">{partner.stats.rating}</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Последняя активность: {formatDateTime(partner.lastActivity)}
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Eye className="w-3 h-3 mr-1" />
                      Просмотр
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="w-3 h-3 mr-1" />
                      Редактировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Аналитика партнёров */}
      <Card className="p-6">
        <h3 className="mb-6">Аналитика партнёров</h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="mb-4">Топ партнёры по выручке</h4>
            <div className="space-y-3">
              {partners
                .sort((a, b) => b.stats.totalRevenue - a.stats.totalRevenue)
                .slice(0, 5)
                .map((partner, index) => (
                  <div key={partner.id} className="flex items-center gap-3 p-3 border rounded-lg">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{partner.name}</p>
                      <p className="text-sm text-muted-foreground">{getTypeLabel(partner.type)}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{formatCurrency(partner.stats.totalRevenue)}</p>
                      <p className="text-sm text-muted-foreground">{partner.stats.totalDeals} сделок</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4">Статистика по типам партнёров</h4>
            <div className="space-y-4">
              {['agent', 'contractor', 'brand-partner'].map((type) => {
                const typePartners = partners.filter(p => p.type === type);
                const totalRevenue = typePartners.reduce((sum, p) => sum + p.stats.totalRevenue, 0);
                const totalCommission = typePartners.reduce((sum, p) => sum + p.stats.commissionEarned, 0);
                
                return (
                  <div key={type} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{getTypeLabel(type)}</h5>
                      <Badge variant="outline">{typePartners.length} партнёров</Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Выручка</p>
                        <p className="font-medium">{formatCurrency(totalRevenue)}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Комиссии</p>
                        <p className="font-medium text-green-600">{formatCurrency(totalCommission)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Экспорт отчёта
          </Button>
        </div>
      </Card>

      {/* Настройки комиссий */}
      <Dialog open={showCommissionSettings} onOpenChange={setShowCommissionSettings}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Настройки комиссионной системы</DialogTitle>
            <DialogDescription>
              Управление глобальными ставками и индивидуальными настройками
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <h4 className="mb-4">Глобальные настройки по умолчанию</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {commissionRules.filter(rule => rule.isDefault).map((rule) => (
                  <Card key={rule.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="font-medium">{getTypeLabel(rule.partnerType)}</h5>
                      <Badge variant="outline">По умолчанию</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Percent className="w-4 h-4 text-muted-foreground" />
                        <span className="text-2xl font-semibold">{rule.rate}%</span>
                      </div>
                      <Button variant="outline" size="sm" className="w-full">
                        <Edit className="w-3 h-3 mr-1" />
                        Изменить
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="mb-4">Автоматический расчёт комиссий</h4>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">Автоматические начисления</p>
                  <p className="text-sm text-muted-foreground">
                    Комиссии рассчитываются автоматически при подтверждении сделки
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>

            <div>
              <h4 className="mb-4">Сводный отчёт по комиссиям</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Calculator className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-muted-foreground">Начислено всего</span>
                  </div>
                  <p className="text-xl font-semibold">{formatCurrency(totalStats.totalCommission)}</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-muted-foreground">Выплачено</span>
                  </div>
                  <p className="text-xl font-semibold">{formatCurrency(partners.reduce((sum, p) => sum + p.stats.commissionPaid, 0))}</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-500" />
                    <span className="text-sm text-muted-foreground">К выплате</span>
                  </div>
                  <p className="text-xl font-semibold">{formatCurrency(totalStats.totalCommission - partners.reduce((sum, p) => sum + p.stats.commissionPaid, 0))}</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-purple-500" />
                    <span className="text-sm text-muted-foreground">Этот месяц</span>
                  </div>
                  <p className="text-xl font-semibold">{formatCurrency(450000)}</p>
                </Card>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowCommissionSettings(false)}>
                Отмена
              </Button>
              <Button>
                <Save className="w-4 h-4 mr-2" />
                Сохранить настройки
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}