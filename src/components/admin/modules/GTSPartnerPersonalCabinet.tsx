import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { 
  TrendingUp, DollarSign, FileText, Download, Mail, Phone, 
  MapPin, Calendar, Activity, PieChart, BarChart3, Star,
  CheckCircle, Clock, CreditCard, Award, Target, Users,
  Edit, Save, RefreshCw, ExternalLink, Copy, Settings,
  Wallet, LineChart, Calculator, AlertCircle, Crown
} from 'lucide-react';

interface PartnerCabinetProps {
  partnerId: string;
  partnerType: 'agent' | 'contractor' | 'brand-partner';
}

interface PartnerProfile {
  id: string;
  name: string;
  type: 'agent' | 'contractor' | 'brand-partner';
  email: string;
  phone: string;
  company?: string;
  location: string;
  description: string;
  avatar?: string;
  startDate: string;
  manager: string;
  commission: {
    type: 'percentage' | 'fixed';
    rate: number;
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
    rank: number;
    totalPartners: number;
  };
}

interface Deal {
  id: string;
  clientName: string;
  service: string;
  amount: number;
  commission: number;
  status: 'active' | 'completed' | 'cancelled';
  date: string;
  completedDate?: string;
}

interface Commission {
  id: string;
  dealId: string;
  dealType: string;
  amount: number;
  commission: number;
  rate: number;
  status: 'pending' | 'paid' | 'cancelled';
  date: string;
  paidDate?: string;
}

export function GTSPartnerPersonalCabinet({ partnerId, partnerType }: PartnerCabinetProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState('current-month');

  // Mock данные профиля партнёра (в реальности загружается по partnerId)
  const partnerProfile: PartnerProfile = {
    id: partnerId,
    name: partnerType === 'agent' ? 'Екатерина Смирнова' : 
          partnerType === 'contractor' ? 'ООО "Морские Прогулки"' :
          'Luxury Hotels Group',
    type: partnerType,
    email: 'partner@example.com',
    phone: '+7 (495) 123-45-67',
    company: partnerType === 'agent' ? 'TravelPro Agency' : undefined,
    location: 'Москва',
    description: 'Специализация на премиальных турах и корпоративных мероприятиях',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b1fa?w=150',
    startDate: '2024-01-15T00:00:00Z',
    manager: 'Игорь Петров',
    commission: {
      type: 'percentage',
      rate: partnerType === 'agent' ? 12 : partnerType === 'contractor' ? 25 : 8
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
      rank: 3,
      totalPartners: 24
    }
  };

  // Mock данные сделок
  const deals: Deal[] = [
    {
      id: 'deal-001',
      clientName: 'ООО "Инновации"',
      service: 'Корпоративный тур на Эльбрус',
      amount: 145000,
      commission: 17400,
      status: 'completed',
      date: '2024-06-15T00:00:00Z',
      completedDate: '2024-06-20T00:00:00Z'
    },
    {
      id: 'deal-002',
      clientName: 'Алексей Петров',
      service: 'VIP-тур на яхте',
      amount: 85000,
      commission: 10200,
      status: 'active',
      date: '2024-06-18T00:00:00Z'
    },
    {
      id: 'deal-003',
      clientName: 'IT Solutions Ltd',
      service: 'Тимбилдинг в горах',
      amount: 120000,
      commission: 14400,
      status: 'completed',
      date: '2024-06-10T00:00:00Z',
      completedDate: '2024-06-18T00:00:00Z'
    }
  ];

  // Mock данные комиссий
  const commissions: Commission[] = [
    {
      id: 'comm-001',
      dealId: 'deal-001',
      dealType: 'Корпоративный тур',
      amount: 145000,
      commission: 17400,
      rate: 12,
      status: 'paid',
      date: '2024-06-15T00:00:00Z',
      paidDate: '2024-06-20T00:00:00Z'
    },
    {
      id: 'comm-002',
      dealId: 'deal-002',
      dealType: 'VIP-тур',
      amount: 85000,
      commission: 10200,
      rate: 12,
      status: 'pending',
      date: '2024-06-18T00:00:00Z'
    },
    {
      id: 'comm-003',
      dealId: 'deal-003',
      dealType: 'Тимбилдинг',
      amount: 120000,
      commission: 14400,
      rate: 12,
      status: 'paid',
      date: '2024-06-10T00:00:00Z',
      paidDate: '2024-06-18T00:00:00Z'
    }
  ];

  const getPartnerTypeLabel = (type: string) => {
    switch (type) {
      case 'agent': return 'Агент';
      case 'contractor': return 'Подрядчик';
      case 'brand-partner': return 'Бренд-партнёр';
      default: return 'Партнёр';
    }
  };

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'agent': return <Users className="w-4 h-4" />;
      case 'contractor': return <Target className="w-4 h-4" />;
      case 'brand-partner': return <Crown className="w-4 h-4" />;
      default: return <Users className="w-4 h-4" />;
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

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
      case 'paid':
        return <Badge className="bg-green-500/10 text-green-500">Завершено</Badge>;
      case 'active':
      case 'pending':
        return <Badge variant="outline" className="text-blue-600">В процессе</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Отменено</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок и профиль */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16">
            {partnerProfile.avatar && <AvatarImage src={partnerProfile.avatar} />}
            <AvatarFallback className="text-lg">{partnerProfile.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1>{partnerProfile.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              {getPartnerTypeIcon(partnerProfile.type)}
              <span>{getPartnerTypeLabel(partnerProfile.type)}</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Партнёр с {formatDate(partnerProfile.startDate)}
            </p>
          </div>
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
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Отчёт
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">Дашборд</TabsTrigger>
          <TabsTrigger value="deals">Мои сделки</TabsTrigger>
          <TabsTrigger value="commissions">Комиссии</TabsTrigger>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
        </TabsList>

        {/* Дашборд */}
        <TabsContent value="dashboard" className="space-y-6">
          {/* Основные метрики */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <Wallet className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Общая выручка</p>
                  <p className="text-2xl font-semibold">{formatCurrency(partnerProfile.metrics.totalRevenue)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-500/10 rounded-lg">
                  <DollarSign className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего комиссий</p>
                  <p className="text-2xl font-semibold">{formatCurrency(partnerProfile.metrics.totalCommission)}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <Target className="w-5 h-5 text-purple-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Всего сделок</p>
                  <p className="text-2xl font-semibold">{partnerProfile.metrics.totalDeals}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-500/10 rounded-lg">
                  <TrendingUp className="w-5 h-5 text-yellow-500" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Конверсия</p>
                  <p className="text-2xl font-semibold">{partnerProfile.metrics.conversionRate}%</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Статус комиссий */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h3>Выплачено</h3>
              </div>
              <p className="text-2xl font-semibold text-green-600">
                {formatCurrency(partnerProfile.metrics.paidCommission)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Получено комиссий
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-yellow-500" />
                <h3>К выплате</h3>
              </div>
              <p className="text-2xl font-semibold text-yellow-600">
                {formatCurrency(partnerProfile.metrics.pendingCommission)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Ожидает обработки
              </p>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <Calculator className="w-5 h-5 text-blue-500" />
                <h3>Средний чек</h3>
              </div>
              <p className="text-2xl font-semibold text-blue-600">
                {formatCurrency(partnerProfile.metrics.averageDeal)}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                На одну сделку
              </p>
            </Card>
          </div>

          {/* Рейтинг и достижения */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="mb-4">Ваш рейтинг</h3>
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <p className="text-3xl font-semibold text-yellow-600">#{partnerProfile.metrics.rank}</p>
                  <p className="text-sm text-muted-foreground">из {partnerProfile.metrics.totalPartners}</p>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{partnerProfile.metrics.rating}</span>
                    <span className="text-muted-foreground">/ 5.0</span>
                  </div>
                  <Progress value={partnerProfile.metrics.rating * 20} className="h-2" />
                  <p className="text-sm text-muted-foreground mt-2">
                    Отличная работа! Вы в топ-15% партнёров
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="mb-4">Комиссионная ставка</h3>
              <div className="text-center">
                <p className="text-3xl font-semibold text-green-600">
                  {partnerProfile.commission.rate}
                  {partnerProfile.commission.type === 'percentage' ? '%' : ' ₽'}
                </p>
                <p className="text-sm text-muted-foreground">
                  {partnerProfile.commission.type === 'percentage' ? 'от суммы сделки' : 'фиксированная ставка'}
                </p>
                <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                  <p className="text-sm">
                    📈 При достижении 50 сделок ставка увеличится до{' '}
                    <span className="font-medium text-green-600">
                      {partnerProfile.commission.rate + 2}%
                    </span>
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Последние сделки */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3>Последние сделки</h3>
              <Button variant="outline" size="sm" onClick={() => setActiveTab('deals')}>
                Все сделки
              </Button>
            </div>
            <div className="space-y-3">
              {deals.slice(0, 3).map((deal) => (
                <div key={deal.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{deal.clientName}</p>
                    <p className="text-sm text-muted-foreground">{deal.service}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{formatCurrency(deal.amount)}</p>
                    <p className="text-sm text-green-600">+{formatCurrency(deal.commission)}</p>
                  </div>
                  <div className="ml-4">
                    {getStatusBadge(deal.status)}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Мои сделки */}
        <TabsContent value="deals" className="space-y-6">
          <Card>
            <div className="p-6 border-b">
              <h3>Все мои сделки</h3>
              <p className="text-muted-foreground">История сделок и их статусы</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Клиент</TableHead>
                  <TableHead>Услуга</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Комиссия</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {deals.map((deal) => (
                  <TableRow key={deal.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{deal.clientName}</p>
                        <p className="text-sm text-muted-foreground">ID: {deal.id}</p>
                      </div>
                    </TableCell>
                    <TableCell>{deal.service}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(deal.amount)}</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(deal.commission)}
                    </TableCell>
                    <TableCell>{getStatusBadge(deal.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p>{formatDate(deal.date)}</p>
                        {deal.completedDate && (
                          <p className="text-sm text-muted-foreground">
                            Завершена: {formatDate(deal.completedDate)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Комиссии */}
        <TabsContent value="commissions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium">Выплачено</p>
                  <p className="text-2xl font-semibold text-green-600">
                    {formatCurrency(partnerProfile.metrics.paidCommission)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-yellow-500" />
                <div>
                  <p className="font-medium">К выплате</p>
                  <p className="text-2xl font-semibold text-yellow-600">
                    {formatCurrency(partnerProfile.metrics.pendingCommission)}
                  </p>
                </div>
              </div>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-3">
                <Calculator className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium">Всего начислено</p>
                  <p className="text-2xl font-semibold">
                    {formatCurrency(partnerProfile.metrics.totalCommission)}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <Card>
            <div className="p-6 border-b">
              <h3>История комиссий</h3>
              <p className="text-muted-foreground">Подробная информация о всех начислениях</p>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Сделка</TableHead>
                  <TableHead>Сумма сделки</TableHead>
                  <TableHead>Ставка</TableHead>
                  <TableHead>Комиссия</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Дата</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {commissions.map((commission) => (
                  <TableRow key={commission.id}>
                    <TableCell>
                      <div>
                        <p className="font-medium">{commission.dealType}</p>
                        <p className="text-sm text-muted-foreground">ID: {commission.dealId}</p>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium">{formatCurrency(commission.amount)}</TableCell>
                    <TableCell>{commission.rate}%</TableCell>
                    <TableCell className="font-medium text-green-600">
                      {formatCurrency(commission.commission)}
                    </TableCell>
                    <TableCell>{getStatusBadge(commission.status)}</TableCell>
                    <TableCell>
                      <div>
                        <p>{formatDate(commission.date)}</p>
                        {commission.paidDate && (
                          <p className="text-sm text-muted-foreground">
                            Выплачено: {formatDate(commission.paidDate)}
                          </p>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        {/* Профиль */}
        <TabsContent value="profile" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3>Личная информация</h3>
              <Button 
                variant="outline" 
                onClick={() => setIsEditing(!isEditing)}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </>
                )}
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Название/ФИО</Label>
                  {isEditing ? (
                    <Input defaultValue={partnerProfile.name} />
                  ) : (
                    <p className="mt-1">{partnerProfile.name}</p>
                  )}
                </div>

                <div>
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input type="email" defaultValue={partnerProfile.email} />
                  ) : (
                    <p className="mt-1">{partnerProfile.email}</p>
                  )}
                </div>

                <div>
                  <Label>Телефон</Label>
                  {isEditing ? (
                    <Input defaultValue={partnerProfile.phone} />
                  ) : (
                    <p className="mt-1">{partnerProfile.phone}</p>
                  )}
                </div>

                <div>
                  <Label>Местоположение</Label>
                  {isEditing ? (
                    <Input defaultValue={partnerProfile.location} />
                  ) : (
                    <p className="mt-1">{partnerProfile.location}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                {partnerProfile.company && (
                  <div>
                    <Label>Компания</Label>
                    {isEditing ? (
                      <Input defaultValue={partnerProfile.company} />
                    ) : (
                      <p className="mt-1">{partnerProfile.company}</p>
                    )}
                  </div>
                )}

                <div>
                  <Label>Описание деятельности</Label>
                  {isEditing ? (
                    <Textarea defaultValue={partnerProfile.description} rows={3} />
                  ) : (
                    <p className="mt-1">{partnerProfile.description}</p>
                  )}
                </div>

                <div>
                  <Label>Ответственный менеджер</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <p>{partnerProfile.manager}</p>
                    <Button variant="ghost" size="sm">
                      <Mail className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-4">Документы и шаблоны</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium">Договор партнёрства</p>
                    <p className="text-sm text-muted-foreground">Актуальная версия от {formatDate(partnerProfile.startDate)}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium">Отчёт по комиссиям</p>
                    <p className="text-sm text-muted-foreground">За текущий месяц</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Скачать
                </Button>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-purple-500" />
                  <div>
                    <p className="font-medium">Маркетинговые материалы</p>
                    <p className="text-sm text-muted-foreground">Брошюры, каталоги, презентации</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Открыть
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}