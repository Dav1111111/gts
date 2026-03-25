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
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Star, TrendingUp, 
  DollarSign, FileText, MessageSquare, MapPin, Users, Calendar, 
  Activity, PieChart, BarChart3, Download, Mail, Phone, Clock,
  Building2, Target, Zap, Handshake, CreditCard, Award, Globe,
  AlertCircle, CheckCircle, XCircle, ArrowUpRight, ArrowDownRight,
  ExternalLink, Copy, RefreshCw, Settings, Crown, TrendingDown,
  Percent, Calculator, Wallet, LineChart, UserCheck, UserX
} from 'lucide-react';

interface PartnersProps {
  userRole: string;
}

type PartnerType = 'agent' | 'contractor' | 'brand-partner';
type PartnerStatus = 'active' | 'suspended' | 'terminated';

interface Partner {
  id: string;
  name: string;
  type: PartnerType;
  status: PartnerStatus;
  email: string;
  phone: string;
  company?: string;
  manager: string;
  startDate: string;
  endDate?: string;
  avatar?: string;
  location: string;
  description: string;
  commission: {
    type: 'percentage' | 'fixed';
    rate: number;
    effectiveFrom: string;
    effectiveTo?: string;
  };
  metrics: {
    totalDeals: number;
    totalRevenue: number;
    totalCommission: number;
    paidCommission: number;
    pendingCommission: number;
    averageDeal: number;
    conversionRate: number;
    rating: number;
    lastActivity: string;
  };
  settings: {
    hasPortalAccess: boolean;
    autoPayouts: boolean;
    notifications: boolean;
  };
}

interface Commission {
  id: string;
  partnerId: string;
  partnerName: string;
  dealId: string;
  dealType: string;
  amount: number;
  commission: number;
  rate: number;
  status: 'pending' | 'paid' | 'cancelled';
  date: string;
  paidDate?: string;
}

interface PartnerDeal {
  id: string;
  partnerId: string;
  clientName: string;
  service: string;
  amount: number;
  commission: number;
  status: 'active' | 'completed' | 'cancelled';
  date: string;
  completedDate?: string;
}

export function GTSPartnersExtended({ userRole }: PartnersProps) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddPartnerOpen, setIsAddPartnerOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('revenue');

  // Mock данные партнёров
  const partners: Partner[] = [
    // Агенты
    {
      id: 'agent-001',
      name: 'Екатерина Смирнова',
      type: 'agent',
      status: 'active',
      email: 'k.smirnova@agency.ru',
      phone: '+7 (495) 123-45-67',
      company: 'TravelPro Agency',
      manager: 'Игорь Петров',
      startDate: '2024-01-15T00:00:00Z',
      location: 'Москва',
      description: 'Ведущий агент по корпоративным турам и мероприятиям',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1fa?w=150',
      commission: {
        type: 'percentage',
        rate: 12,
        effectiveFrom: '2024-01-15T00:00:00Z'
      },
      metrics: {
        totalDeals: 47,
        totalRevenue: 2450000,
        totalCommission: 294000,
        paidCommission: 220000,
        pendingCommission: 74000,
        averageDeal: 52127,
        conversionRate: 68,
        rating: 4.8,
        lastActivity: '2024-06-20T14:30:00Z'
      },
      settings: {
        hasPortalAccess: true,
        autoPayouts: false,
        notifications: true
      }
    },
    {
      id: 'agent-002',
      name: 'Андрей Волков',
      type: 'agent',
      status: 'active',
      email: 'a.volkov@tours.ru',
      phone: '+7 (495) 234-56-78',
      company: 'Adventure Tours',
      manager: 'Марина Козлова',
      startDate: '2024-02-01T00:00:00Z',
      location: 'Санкт-Петербург',
      description: 'Специализация на экстремальных турах и активном отдыхе',
      commission: {
        type: 'percentage',
        rate: 10,
        effectiveFrom: '2024-02-01T00:00:00Z'
      },
      metrics: {
        totalDeals: 32,
        totalRevenue: 1680000,
        totalCommission: 168000,
        paidCommission: 135000,
        pendingCommission: 33000,
        averageDeal: 52500,
        conversionRate: 73,
        rating: 4.6,
        lastActivity: '2024-06-20T11:15:00Z'
      },
      settings: {
        hasPortalAccess: true,
        autoPayouts: false,
        notifications: true
      }
    },
    // Подрядчики
    {
      id: 'contractor-001',
      name: 'ООО "Морские Прогулки"',
      type: 'contractor',
      status: 'active',
      email: 'info@seawalks.ru',
      phone: '+7 (862) 345-67-89',
      manager: 'Алексей Морозов',
      startDate: '2023-08-10T00:00:00Z',
      location: 'Сочи',
      description: 'Предоставление яхт и катеров для морских экскурсий',
      commission: {
        type: 'percentage',
        rate: 25,
        effectiveFrom: '2023-08-10T00:00:00Z'
      },
      metrics: {
        totalDeals: 156,
        totalRevenue: 4200000,
        totalCommission: 1050000,
        paidCommission: 850000,
        pendingCommission: 200000,
        averageDeal: 26923,
        conversionRate: 85,
        rating: 4.9,
        lastActivity: '2024-06-20T16:45:00Z'
      },
      settings: {
        hasPortalAccess: true,
        autoPayouts: false,
        notifications: true
      }
    },
    {
      id: 'contractor-002',
      name: 'Горные Вершины',
      type: 'contractor',
      status: 'active',
      email: 'booking@mountains.ru',
      phone: '+7 (928) 456-78-90',
      manager: 'Елена Соколова',
      startDate: '2023-05-20T00:00:00Z',
      location: 'Красная Поляна',
      description: 'Горнолыжное оборудование и инструкторы',
      commission: {
        type: 'percentage',
        rate: 20,
        effectiveFrom: '2023-05-20T00:00:00Z'
      },
      metrics: {
        totalDeals: 89,
        totalRevenue: 2890000,
        totalCommission: 578000,
        paidCommission: 480000,
        pendingCommission: 98000,
        averageDeal: 32472,
        conversionRate: 79,
        rating: 4.7,
        lastActivity: '2024-06-19T13:20:00Z'
      },
      settings: {
        hasPortalAccess: true,
        autoPayouts: false,
        notifications: true
      }
    },
    // Бренд-партнёры
    {
      id: 'brand-001',
      name: 'Luxury Hotels Group',
      type: 'brand-partner',
      status: 'active',
      email: 'partnership@luxuryhotels.ru',
      phone: '+7 (495) 567-89-01',
      company: 'Luxury Hotels Group',
      manager: 'Ольга Белова',
      startDate: '2023-11-01T00:00:00Z',
      location: 'Москва',
      description: 'Сеть премиальных отелей, эксклюзивные предложения для клиентов GTS',
      commission: {
        type: 'percentage',
        rate: 8,
        effectiveFrom: '2023-11-01T00:00:00Z'
      },
      metrics: {
        totalDeals: 124,
        totalRevenue: 6450000,
        totalCommission: 516000,
        paidCommission: 400000,
        pendingCommission: 116000,
        averageDeal: 52016,
        conversionRate: 92,
        rating: 4.9,
        lastActivity: '2024-06-20T17:00:00Z'
      },
      settings: {
        hasPortalAccess: true,
        autoPayouts: true,
        notifications: true
      }
    },
    {
      id: 'brand-002',
      name: 'Adventure Gear Pro',
      type: 'brand-partner',
      status: 'suspended',
      email: 'b2b@adventuregear.ru',
      phone: '+7 (495) 678-90-12',
      company: 'Adventure Gear Pro',
      manager: 'Дмитрий Кузнецов',
      startDate: '2024-03-01T00:00:00Z',
      location: 'Екатеринбург',
      description: 'Поставщик профессионального туристического снаряжения',
      commission: {
        type: 'percentage',
        rate: 15,
        effectiveFrom: '2024-03-01T00:00:00Z'
      },
      metrics: {
        totalDeals: 23,
        totalRevenue: 780000,
        totalCommission: 117000,
        paidCommission: 65000,
        pendingCommission: 52000,
        averageDeal: 33913,
        conversionRate: 45,
        rating: 4.2,
        lastActivity: '2024-06-15T10:30:00Z'
      },
      settings: {
        hasPortalAccess: false,
        autoPayouts: false,
        notifications: false
      }
    }
  ];

  // Mock данные комиссий
  const commissions: Commission[] = [
    {
      id: 'comm-001',
      partnerId: 'agent-001',
      partnerName: 'Екатерина Смирнова',
      dealId: 'deal-001',
      dealType: 'Корпоративный тур',
      amount: 85000,
      commission: 10200,
      rate: 12,
      status: 'pending',
      date: '2024-06-18T00:00:00Z'
    },
    {
      id: 'comm-002',
      partnerId: 'contractor-001',
      partnerName: 'ООО "Морские Прогулки"',
      dealId: 'deal-002',
      dealType: 'Аренда яхты',
      amount: 45000,
      commission: 11250,
      rate: 25,
      status: 'paid',
      date: '2024-06-15T00:00:00Z',
      paidDate: '2024-06-20T00:00:00Z'
    },
    {
      id: 'comm-003',
      partnerId: 'brand-001',
      partnerName: 'Luxury Hotels Group',
      dealId: 'deal-003',
      dealType: 'Размещение в отеле',
      amount: 120000,
      commission: 9600,
      rate: 8,
      status: 'pending',
      date: '2024-06-19T00:00:00Z'
    }
  ];

  // Глобальные настройки комиссий
  const defaultCommissionRates = {
    agent: 10,
    contractor: 20,
    'brand-partner': 8
  };

  const filteredPartners = partners.filter(partner => {
    const matchesTab = activeTab === 'all' || partner.type === activeTab;
    const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (partner.company && partner.company.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || partner.status === statusFilter;
    
    return matchesTab && matchesSearch && matchesStatus;
  });

  const sortedPartners = [...filteredPartners].sort((a, b) => {
    switch (sortBy) {
      case 'revenue': return b.metrics.totalRevenue - a.metrics.totalRevenue;
      case 'deals': return b.metrics.totalDeals - a.metrics.totalDeals;
      case 'commission': return b.metrics.totalCommission - a.metrics.totalCommission;
      case 'rating': return b.metrics.rating - a.metrics.rating;
      case 'name': return a.name.localeCompare(b.name);
      default: return 0;
    }
  });

  const getPartnerTypeLabel = (type: PartnerType) => {
    switch (type) {
      case 'agent': return 'Агент';
      case 'contractor': return 'Подрядчик';
      case 'brand-partner': return 'Бренд-партнёр';
    }
  };

  const getPartnerTypeIcon = (type: PartnerType) => {
    switch (type) {
      case 'agent': return <Users className="w-4 h-4" />;
      case 'contractor': return <Building2 className="w-4 h-4" />;
      case 'brand-partner': return <Crown className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: PartnerStatus) => {
    switch (status) {
      case 'active': return 'text-green-500';
      case 'suspended': return 'text-yellow-500';
      case 'terminated': return 'text-red-500';
    }
  };

  const getStatusIcon = (status: PartnerStatus) => {
    switch (status) {
      case 'active': return <CheckCircle className="w-4 h-4" />;
      case 'suspended': return <AlertCircle className="w-4 h-4" />;
      case 'terminated': return <XCircle className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: PartnerStatus) => {
    switch (status) {
      case 'active': return <Badge className="bg-green-500/10 text-green-500">Активен</Badge>;
      case 'suspended': return <Badge variant="outline" className="text-yellow-600">Приостановлен</Badge>;
      case 'terminated': return <Badge variant="destructive">Завершён</Badge>;
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

  // Общая статистика по партнёрам
  const totalStats = partners.reduce((acc, partner) => ({
    totalRevenue: acc.totalRevenue + partner.metrics.totalRevenue,
    totalCommission: acc.totalCommission + partner.metrics.totalCommission,
    totalDeals: acc.totalDeals + partner.metrics.totalDeals,
    activePartners: acc.activePartners + (partner.status === 'active' ? 1 : 0)
  }), { totalRevenue: 0, totalCommission: 0, totalDeals: 0, activePartners: 0 });

  const topPartners = [...partners]
    .filter(p => p.status === 'active')
    .sort((a, b) => b.metrics.totalRevenue - a.metrics.totalRevenue)
    .slice(0, 5);

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок и статистика */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1>База партнёров</h1>
            <p className="text-muted-foreground">
              Управление агентами, подрядчиками и бренд-партнёрами
            </p>
          </div>
          <Button onClick={() => setIsAddPartnerOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Добавить партнёра
          </Button>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Users className="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Активных партнёров</p>
                <p className="text-2xl font-semibold">{totalStats.activePartners}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Общая выручка</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalRevenue)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <DollarSign className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего комиссий</p>
                <p className="text-2xl font-semibold">{formatCurrency(totalStats.totalCommission)}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Handshake className="w-5 h-5 text-purple-500" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Всего сделок</p>
                <p className="text-2xl font-semibold">{totalStats.totalDeals}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Фильтры и поиск */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input 
              placeholder="Поиск по имени, email или компании..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="active">Активные</SelectItem>
              <SelectItem value="suspended">Приостановленные</SelectItem>
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
              <SelectItem value="name">По имени</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Button variant="outline">
          <Download className="w-4 h-4 mr-2" />
          Экспорт
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all">Все партнёры ({partners.length})</TabsTrigger>
          <TabsTrigger value="agent">
            Агенты ({partners.filter(p => p.type === 'agent').length})
          </TabsTrigger>
          <TabsTrigger value="contractor">
            Подрядчики ({partners.filter(p => p.type === 'contractor').length})
          </TabsTrigger>
          <TabsTrigger value="brand-partner">
            Бренд-партнёры ({partners.filter(p => p.type === 'brand-partner').length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="space-y-6">
          {/* Список партнёров */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {sortedPartners.map((partner) => (
              <Card key={partner.id} className="hover:shadow-lg transition-all duration-200">
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-12 h-12">
                        {partner.avatar && <AvatarImage src={partner.avatar} />}
                        <AvatarFallback>{partner.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium truncate">{partner.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {getPartnerTypeIcon(partner.type)}
                          <span>{getPartnerTypeLabel(partner.type)}</span>
                        </div>
                      </div>
                    </div>
                    <div className={`flex items-center gap-1 ${getStatusColor(partner.status)}`}>
                      {getStatusIcon(partner.status)}
                    </div>
                  </div>

                  {partner.company && (
                    <p className="text-sm text-muted-foreground mb-2">{partner.company}</p>
                  )}

                  <div className="space-y-3">
                    {getStatusBadge(partner.status)}
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Выручка:</span>
                      <span className="font-medium">{formatCurrency(partner.metrics.totalRevenue)}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Сделок:</span>
                      <span className="font-medium">{partner.metrics.totalDeals}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Комиссия:</span>
                      <span className="font-medium text-green-600">
                        {formatCurrency(partner.metrics.totalCommission)}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Рейтинг:</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-500 fill-current" />
                        <span className="font-medium">{partner.metrics.rating}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Конверсия:</span>
                      <span className="font-medium">{partner.metrics.conversionRate}%</span>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => {
                          setSelectedPartner(partner);
                          setIsDialogOpen(true);
                        }}
                      >
                        <Eye className="w-3 h-3 mr-1" />
                        Подробно
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-3 h-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {sortedPartners.length === 0 && (
            <Card className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="font-medium mb-2">Партнёры не найдены</h3>
              <p className="text-muted-foreground mb-4">
                Попробуйте изменить критерии поиска или добавить нового партнёра
              </p>
              <Button onClick={() => setIsAddPartnerOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Добавить партнёра
              </Button>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      {/* Аналитика партнёров */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="mb-4">Топ партнёры по выручке</h3>
          <div className="space-y-4">
            {topPartners.map((partner, index) => (
              <div key={partner.id} className="flex items-center gap-3 p-3 border rounded-lg">
                <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full text-sm font-medium">
                  {index + 1}
                </div>
                <Avatar className="w-8 h-8">
                  {partner.avatar && <AvatarImage src={partner.avatar} />}
                  <AvatarFallback className="text-xs">{partner.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{partner.name}</p>
                  <p className="text-xs text-muted-foreground">{getPartnerTypeLabel(partner.type)}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{formatCurrency(partner.metrics.totalRevenue)}</p>
                  <p className="text-xs text-muted-foreground">{partner.metrics.totalDeals} сделок</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="mb-4">Последние комиссии</h3>
          <div className="space-y-3">
            {commissions.slice(0, 5).map((commission) => (
              <div key={commission.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium text-sm">{commission.partnerName}</p>
                  <p className="text-xs text-muted-foreground">{commission.dealType}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm">{formatCurrency(commission.commission)}</p>
                  <Badge variant={commission.status === 'paid' ? 'default' : 'outline'} className="text-xs">
                    {commission.status === 'paid' ? 'Выплачено' : 'Ожидает'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Диалог детальной информации о партнёре */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedPartner && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <Avatar className="w-12 h-12">
                    {selectedPartner.avatar && <AvatarImage src={selectedPartner.avatar} />}
                    <AvatarFallback>{selectedPartner.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <h3>{selectedPartner.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      {getPartnerTypeIcon(selectedPartner.type)}
                      <span>{getPartnerTypeLabel(selectedPartner.type)}</span>
                    </div>
                  </div>
                </DialogTitle>
              </DialogHeader>

              <div className="space-y-6">
                {/* Основная информация */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Контактная информация</Label>
                      <div className="space-y-2 mt-1">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedPartner.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedPartner.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-muted-foreground" />
                          <span>{selectedPartner.location}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Менеджер</Label>
                      <p className="text-sm mt-1">{selectedPartner.manager}</p>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Статус</Label>
                      <div className="mt-1">
                        {getStatusBadge(selectedPartner.status)}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm font-medium">Комиссионные условия</Label>
                      <div className="space-y-2 mt-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Тип:</span>
                          <span className="font-medium">
                            {selectedPartner.commission.type === 'percentage' ? 'Процент' : 'Фиксированная ставка'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Ставка:</span>
                          <span className="font-medium">
                            {selectedPartner.commission.rate}
                            {selectedPartner.commission.type === 'percentage' ? '%' : ' ₽'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Действует с:</span>
                          <span className="font-medium">{formatDate(selectedPartner.commission.effectiveFrom)}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label className="text-sm font-medium">Сотрудничество</Label>
                      <div className="space-y-2 mt-1">
                        <div className="flex items-center justify-between text-sm">
                          <span>Начало:</span>
                          <span className="font-medium">{formatDate(selectedPartner.startDate)}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Последняя активность:</span>
                          <span className="font-medium">{formatDateTime(selectedPartner.metrics.lastActivity)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Статистика */}
                <div>
                  <h4 className="font-medium mb-4">Статистика сотрудничества</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{selectedPartner.metrics.totalDeals}</p>
                        <p className="text-sm text-muted-foreground">Всего сделок</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{formatCurrency(selectedPartner.metrics.totalRevenue)}</p>
                        <p className="text-sm text-muted-foreground">Выручка</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{formatCurrency(selectedPartner.metrics.averageDeal)}</p>
                        <p className="text-sm text-muted-foreground">Средний чек</p>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="text-center">
                        <p className="text-2xl font-semibold">{selectedPartner.metrics.conversionRate}%</p>
                        <p className="text-sm text-muted-foreground">Конверсия</p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Комиссии */}
                <div>
                  <h4 className="font-medium mb-4">Комиссии</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg">
                          <Calculator className="w-4 h-4 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Всего начислено</p>
                          <p className="font-medium">{formatCurrency(selectedPartner.metrics.totalCommission)}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-green-500/10 rounded-lg">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Выплачено</p>
                          <p className="font-medium">{formatCurrency(selectedPartner.metrics.paidCommission)}</p>
                        </div>
                      </div>
                    </Card>
                    <Card className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-yellow-500/10 rounded-lg">
                          <Clock className="w-4 h-4 text-yellow-500" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">К выплате</p>
                          <p className="font-medium">{formatCurrency(selectedPartner.metrics.pendingCommission)}</p>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Настройки */}
                <div>
                  <h4 className="font-medium mb-4">Настройки партнёра</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Доступ к партнёрскому кабинету</p>
                        <p className="text-sm text-muted-foreground">Разрешить партнёру входить в личный кабинет</p>
                      </div>
                      <Switch checked={selectedPartner.settings.hasPortalAccess} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Автоматические выплаты</p>
                        <p className="text-sm text-muted-foreground">Автоматически выплачивать комиссии</p>
                      </div>
                      <Switch checked={selectedPartner.settings.autoPayouts} />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Уведомления</p>
                        <p className="text-sm text-muted-foreground">Отправлять email-уведомления</p>
                      </div>
                      <Switch checked={selectedPartner.settings.notifications} />
                    </div>
                  </div>
                </div>

                {/* Действия */}
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" className="flex-1">
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Mail className="w-4 h-4 mr-2" />
                    Написать
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="w-4 h-4 mr-2" />
                    Отчёт
                  </Button>
                  {selectedPartner.settings.hasPortalAccess && (
                    <Button variant="outline" className="flex-1">
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Портал
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог добавления партнёра */}
      <Dialog open={isAddPartnerOpen} onOpenChange={setIsAddPartnerOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить нового партнёра</DialogTitle>
            <DialogDescription>
              Заполните информацию о партнёре для начала сотрудничества
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                <Label>Название/ФИО</Label>
                <Input placeholder="Введите название или ФИО" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Email</Label>
                <Input type="email" placeholder="partner@example.com" />
              </div>
              <div>
                <Label>Телефон</Label>
                <Input placeholder="+7 (___) ___-__-__" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Компания (опционально)</Label>
                <Input placeholder="Название компании" />
              </div>
              <div>
                <Label>Местоположение</Label>
                <Input placeholder="Город, регион" />
              </div>
            </div>

            <div>
              <Label>Ответственный менеджер</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите менеджера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="petrov">Игорь Петров</SelectItem>
                  <SelectItem value="kozlova">Марина Козлова</SelectItem>
                  <SelectItem value="morozov">Алексей Морозов</SelectItem>
                  <SelectItem value="sokolova">Елена Соколова</SelectItem>
                  <SelectItem value="belova">Ольга Белова</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Описание деятельности</Label>
              <Textarea placeholder="Краткое описание специализации партнёра..." rows={3} />
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-4">Комиссионные условия</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Тип комиссии</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите тип" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Процент от сделки</SelectItem>
                      <SelectItem value="fixed">Фиксированная ставка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Ставка</Label>
                  <Input placeholder="Введите значение" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Button onClick={() => setIsAddPartnerOpen(false)} className="flex-1">
                Создать партнёра
              </Button>
              <Button variant="outline" onClick={() => setIsAddPartnerOpen(false)}>
                Отмена
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}