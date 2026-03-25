import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Separator } from '../../ui/separator';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { 
  Search, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  TrendingUp, 
  DollarSign, 
  FileText, 
  MessageSquare,
  MapPin,
  Users,
  Calendar,
  Activity,
  PieChart,
  BarChart3,
  Download,
  Mail,
  Phone,
  Globe,
  ArrowRight,
  ChevronRight,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Building2,
  UserCheck,
  Briefcase,
  Send,
  Upload,
  XCircle,
  Trash2,
  ExternalLink,
  CreditCard,
  History,
  Settings,
  Shield,
  Target,
  TrendingDown,
  ArrowLeft,
  ChevronLeft,
  CheckCircle2,

  UserPlus,
  Building,
  Award,
  Truck,
  MapIcon,
  FileCheck,
  Copy
} from 'lucide-react';

interface Partner {
  id: string;
  name: string;
  type: 'Agent' | 'Contractor' | 'Brand';
  level: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  status: 'Active' | 'Inactive' | 'Pending' | 'Suspended';
  location: string;
  joinDate: string;
  email: string;
  phone: string;
  website?: string;
  kpi: {
    revenue: number;
    bookings: number;
    rating: number;
    growth: number;
    conversionRate: number;
    repeatCustomers: number;
  };
  finance: {
    totalEarnings: number;
    pendingPayouts: number;
    lastPayout: string;
    commission: number;
    monthlyTarget: number;
    completedPayments: number;
  };
  documents: Array<{
    id: string;
    name: string;
    type: string;
    status: 'Valid' | 'Expired' | 'Pending' | 'Rejected';
    expiryDate?: string;
    uploadDate: string;
    size?: string;
    url?: string;
  }>;
  supportTickets: number;
  lastActivity: string;
  contractDetails: {
    startDate: string;
    endDate?: string;
    exclusiveAreas?: string[];
    specialTerms?: string;
  };
  performance: {
    thisMonth: { revenue: number; bookings: number; };
    lastMonth: { revenue: number; bookings: number; };
    trend: 'up' | 'down' | 'stable';
  };
}

interface GTSPartnersDatabaseProps {
  userRole: 'Executive' | 'Finance' | 'Partner' | 'Staff';
  currentUserId?: string;
}

export const GTSPartnersDatabase: React.FC<GTSPartnersDatabaseProps> = ({ 
  userRole, 
  currentUserId 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [showCreateWizard, setShowCreateWizard] = useState(false);
  const [createStep, setCreateStep] = useState(1);
  const [sortBy, setSortBy] = useState<string>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', priority: 'medium' });

  // Wizard form state
  const [wizardData, setWizardData] = useState({
    // Basic info
    name: '',
    email: '', 
    phone: '',
    website: '',
    location: 'Сочи',
    type: '' as 'Agent' | 'Contractor' | 'Brand' | '',
    
    // Type-specific fields
    // Agent
    agencyName: '',
    licenseNumber: '',
    specializations: [] as string[],
    exclusiveAreas: [] as string[],
    
    // Contractor
    companyRegistration: '',
    equipment: [] as string[],
    certifications: [] as string[],
    serviceAreas: [] as string[],
    
    // Brand
    brandCategory: '',
    distributorLevel: '',
    territoryRights: [] as string[],
    productLines: [] as string[],
    
    // Common
    commission: 15,
    level: 'Bronze' as 'Bronze' | 'Silver' | 'Gold' | 'Platinum',
    monthlyTarget: 50000,
    contractStartDate: '',
    contractEndDate: '',
    specialTerms: '',
    
    // Documents
    requiredDocuments: [] as string[],
    uploadedDocuments: [] as { name: string; type: string; file?: File }[],
    
    // Invitation
    sendWelcomeEmail: true,
    customMessage: '',
    grantImmediateAccess: false
  });

  // Check if user has permission for specific actions
  const canViewFinances = (userRole: string) => {
    return userRole === 'Executive' || userRole === 'Finance';
  };

  const canEditPartner = (userRole: string) => {
    return userRole === 'Executive';
  };

  const canCreatePartner = (userRole: string) => {
    return userRole === 'Executive' || userRole === 'Finance';
  };

  const canDeletePartner = (userRole: string) => {
    return userRole === 'Executive';
  };

  // Mock data - в реальном приложении будет из API
  const [partners, setPartners] = useState<Partner[]>([
    {
      id: '1',
      name: 'Adventure Tours Sochi',
      type: 'Agent',
      level: 'Gold',
      status: 'Active',
      location: 'Сочи',
      joinDate: '2023-01-15',
      email: 'info@adventuresochi.ru',
      phone: '+7 918 123-45-67',
      website: 'adventuresochi.ru',
      lastActivity: '2024-02-08',
      kpi: {
        revenue: 850000,
        bookings: 156,
        rating: 4.8,
        growth: 23,
        conversionRate: 68,
        repeatCustomers: 45
      },
      finance: {
        totalEarnings: 127500,
        pendingPayouts: 45000,
        lastPayout: '2024-02-01',
        commission: 15,
        monthlyTarget: 50000,
        completedPayments: 8
      },
      documents: [
        { id: '1', name: 'Агентский договор', type: 'contract', status: 'Valid', expiryDate: '2024-12-31', uploadDate: '2023-01-15', size: '2.4 MB' },
        { id: '2', name: 'Лицензия на туризм', type: 'license', status: 'Valid', expiryDate: '2024-08-15', uploadDate: '2023-01-20', size: '1.1 MB' },
        { id: '3', name: 'Страховой полис', type: 'insurance', status: 'Pending', expiryDate: '2024-06-30', uploadDate: '2024-01-10', size: '896 KB' }
      ],
      supportTickets: 2,
      contractDetails: {
        startDate: '2023-01-15',
        exclusiveAreas: ['Центральный район', 'Курортный район'],
        specialTerms: 'Премиальная комиссия при достижении целей'
      },
      performance: {
        thisMonth: { revenue: 85000, bookings: 18 },
        lastMonth: { revenue: 72000, bookings: 15 },
        trend: 'up'
      }
    },
    {
      id: '2',
      name: 'Black Sea Equipment',
      type: 'Contractor',
      level: 'Platinum',
      status: 'Active',
      location: 'Сочи',
      joinDate: '2022-08-10',
      email: 'contact@blackseaeq.ru',
      phone: '+7 918 234-56-78',
      lastActivity: '2024-02-09',
      kpi: {
        revenue: 1200000,
        bookings: 89,
        rating: 4.9,
        growth: 18,
        conversionRate: 82,
        repeatCustomers: 67
      },
      finance: {
        totalEarnings: 240000,
        pendingPayouts: 80000,
        lastPayout: '2024-01-28',
        commission: 20,
        monthlyTarget: 80000,
        completedPayments: 12
      },
      documents: [
        { id: '4', name: 'Договор подряда', type: 'contract', status: 'Valid', expiryDate: '2024-12-31', uploadDate: '2022-08-10', size: '3.2 MB' },
        { id: '5', name: 'Сертификат безопасности', type: 'certificate', status: 'Expired', expiryDate: '2024-01-15', uploadDate: '2023-01-15', size: '1.8 MB' },
        { id: '6', name: 'Техпаспорт оборудования', type: 'technical', status: 'Valid', expiryDate: '2025-08-10', uploadDate: '2023-08-05', size: '4.1 MB' }
      ],
      supportTickets: 0,
      contractDetails: {
        startDate: '2022-08-10',
        specialTerms: 'Эксклюзивный поставщик водного оборудования'
      },
      performance: {
        thisMonth: { revenue: 125000, bookings: 8 },
        lastMonth: { revenue: 110000, bookings: 9 },
        trend: 'up'
      }
    },
    {
      id: '3',
      name: 'Yamaha Marine Sochi',
      type: 'Brand',
      level: 'Silver',
      status: 'Active',
      location: 'Сочи',
      joinDate: '2023-06-20',
      email: 'sochi@yamaha-marine.ru',
      phone: '+7 918 345-67-89',
      website: 'yamaha-marine.ru',
      lastActivity: '2024-02-07',
      kpi: {
        revenue: 680000,
        bookings: 45,
        rating: 4.7,
        growth: 31,
        conversionRate: 74,
        repeatCustomers: 32
      },
      finance: {
        totalEarnings: 102000,
        pendingPayouts: 25000,
        lastPayout: '2024-02-05',
        commission: 15,
        monthlyTarget: 35000,
        completedPayments: 6
      },
      documents: [
        { id: '7', name: 'Партнерское соглашение', type: 'partnership', status: 'Valid', expiryDate: '2025-06-20', uploadDate: '2023-06-20', size: '2.8 MB' },
        { id: '8', name: 'Сертификат дилера', type: 'certificate', status: 'Valid', expiryDate: '2024-10-01', uploadDate: '2023-07-01', size: '1.5 MB' },
        { id: '9', name: 'Каталог продукции 2024', type: 'catalog', status: 'Valid', uploadDate: '2024-01-01', size: '12.3 MB' }
      ],
      supportTickets: 1,
      contractDetails: {
        startDate: '2023-06-20',
        endDate: '2025-06-20',
        exclusiveAreas: ['Морской порт', 'Яхт-клубы'],
        specialTerms: 'Эксклюзивный дистрибьютор техники Yamaha'
      },
      performance: {
        thisMonth: { revenue: 58000, bookings: 4 },
        lastMonth: { revenue: 52000, bookings: 5 },
        trend: 'up'
      }
    }
  ]);

  // Фильтрация и сортировка партнеров
  const filteredPartners = useMemo(() => {
    let filtered = partners;

    // Ролевая фильтрация
    if (userRole === 'Partner' && currentUserId) {
      filtered = filtered.filter(partner => partner.id === currentUserId);
    }

    // Поисковая фильтрация
    if (searchTerm) {
      filtered = filtered.filter(partner =>
        partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        partner.location.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Фильтры
    if (typeFilter !== 'all') {
      filtered = filtered.filter(partner => partner.type === typeFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(partner => partner.status === statusFilter);
    }

    if (locationFilter !== 'all') {
      filtered = filtered.filter(partner => partner.location === locationFilter);
    }

    // Сортировка
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'revenue':
          aValue = a.kpi.revenue;
          bValue = b.kpi.revenue;
          break;
        case 'bookings':
          aValue = a.kpi.bookings;
          bValue = b.kpi.bookings;
          break;
        case 'rating':
          aValue = a.kpi.rating;
          bValue = b.kpi.rating;
          break;
        case 'joinDate':
          aValue = new Date(a.joinDate).getTime();
          bValue = new Date(b.joinDate).getTime();
          break;
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  }, [partners, searchTerm, typeFilter, statusFilter, locationFilter, userRole, currentUserId, sortBy, sortOrder]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'default';
      case 'Inactive': return 'secondary';
      case 'Pending': return 'outline';
      case 'Suspended': return 'destructive';
      default: return 'secondary';
    }
  };

  const getTypeBadgeVariant = (type: string) => {
    switch (type) {
      case 'Agent': return 'default';
      case 'Contractor': return 'secondary';
      case 'Brand': return 'outline';
      default: return 'secondary';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Bronze': return 'text-amber-600';
      case 'Silver': return 'text-gray-400';
      case 'Gold': return 'text-yellow-500';
      case 'Platinum': return 'text-purple-500';
      default: return 'text-gray-400';
    }
  };

  const getDocumentStatusIcon = (status: string) => {
    switch (status) {
      case 'Valid': return <CheckCircle className="w-4 h-4 text-[var(--gts-portal-success)]" />;
      case 'Expired': return <XCircle className="w-4 h-4 text-[var(--gts-portal-error)]" />;
      case 'Pending': return <Clock className="w-4 h-4 text-[var(--gts-portal-warning)]" />;
      case 'Rejected': return <AlertCircle className="w-4 h-4 text-[var(--gts-portal-error)]" />;
      default: return <Clock className="w-4 h-4 text-[var(--gts-portal-muted)]" />;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-[var(--gts-portal-success)]" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-[var(--gts-portal-error)]" />;
      default: return <Activity className="w-4 h-4 text-[var(--gts-portal-muted)]" />;
    }
  };

  const renderPartnersList = () => (
    <div className="space-y-6">
      {/* Панель фильтров и поиска */}
      <div className="flex flex-col gap-4">
        {/* Основные фильтры */}
        <div className="flex flex-col lg:flex-row gap-4 p-6 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gts-portal-muted)] w-4 h-4" />
              <Input
                placeholder="Поиск по имени, email или локации..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
              />
            </div>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Тип" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="Agent">Агент</SelectItem>
                <SelectItem value="Contractor">Подрядчик</SelectItem>
                <SelectItem value="Brand">Бренд</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="Active">Активен</SelectItem>
                <SelectItem value="Inactive">Неактивен</SelectItem>
                <SelectItem value="Pending">Ожидает</SelectItem>
                <SelectItem value="Suspended">Заблокирован</SelectItem>
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Локация" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все локации</SelectItem>
                <SelectItem value="Сочи">Сочи</SelectItem>
                <SelectItem value="Краснодар">Краснодар</SelectItem>
                <SelectItem value="Анапа">Анапа</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-44 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                <SelectValue placeholder="Сортировка" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">По имени</SelectItem>
                <SelectItem value="revenue">По выручке</SelectItem>
                <SelectItem value="bookings">По бронированиям</SelectItem>
                <SelectItem value="rating">По рейтингу</SelectItem>
                <SelectItem value="joinDate">По дате регистрации</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </Button>

            {canCreatePartner(userRole) && (
              <Button
                onClick={() => {
                  setShowCreateWizard(true);
                  setCreateStep(1);
                  setWizardData({
                    name: '', email: '', phone: '', website: '', location: 'Сочи', type: '',
                    agencyName: '', licenseNumber: '', specializations: [], exclusiveAreas: [],
                    companyRegistration: '', equipment: [], certifications: [], serviceAreas: [],
                    brandCategory: '', distributorLevel: '', territoryRights: [], productLines: [],
                    commission: 15, level: 'Bronze', monthlyTarget: 50000,
                    contractStartDate: '', contractEndDate: '', specialTerms: '',
                    requiredDocuments: [], uploadedDocuments: [],
                    sendWelcomeEmail: true, customMessage: '', grantImmediateAccess: false
                  });
                }}
                className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить партнера
              </Button>
            )}
          </div>
        </div>

        {/* Статистика */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Всего партнеров</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">{partners.length}</p>
                </div>
                <Users className="w-8 h-8 text-[var(--gts-portal-accent)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Активные</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {partners.filter(p => p.status === 'Active').length}
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
                  <p className="text-sm text-[var(--gts-portal-muted)]">Общая выручка</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    ₽{partners.reduce((sum, p) => sum + p.kpi.revenue, 0).toLocaleString()}
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-[var(--gts-portal-accent)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Открытые тикеты</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {partners.reduce((sum, p) => sum + p.supportTickets, 0)}
                  </p>
                </div>
                <MessageSquare className="w-8 h-8 text-[var(--gts-portal-warning)]" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Таблица партнеров */}
      <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
        <CardHeader className="p-6 border-b border-[var(--gts-portal-border)]">
          <CardTitle className="text-[var(--gts-portal-text)]">
            Партнеры ({filteredPartners.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--gts-portal-border)]">
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">Партнер</th>
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">Тип</th>
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">Уровень</th>
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">Статус</th>
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">KPI</th>
                  <th className="text-left py-4 px-6 text-[var(--gts-portal-muted)]">Активность</th>
                  <th className="text-right py-4 px-6 text-[var(--gts-portal-muted)]">Действия</th>
                </tr>
              </thead>
              <tbody>
                {filteredPartners.map((partner) => (
                  <tr
                    key={partner.id}
                    className="border-b border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] cursor-pointer transition-colors"
                    onClick={() => setSelectedPartner(partner)}
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-medium text-[var(--gts-portal-text)]">{partner.name}</div>
                        <div className="text-sm text-[var(--gts-portal-muted)] flex items-center mt-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          {partner.location}
                        </div>
                        {partner.website && (
                          <div className="text-xs text-[var(--gts-portal-muted)] flex items-center mt-1">
                            <Globe className="w-3 h-3 mr-1" />
                            {partner.website}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getTypeBadgeVariant(partner.type)}>
                        {partner.type}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className={`flex items-center ${getLevelColor(partner.level)}`}>
                        <Star className="w-4 h-4 mr-1" />
                        {partner.level}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <Badge variant={getStatusBadgeVariant(partner.status)}>
                        {partner.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <div className="space-y-1">
                        <div className="text-sm text-[var(--gts-portal-text)] flex items-center">
                          ₽{partner.kpi.revenue.toLocaleString()}
                          {getTrendIcon(partner.performance.trend)}
                        </div>
                        <div className="text-xs text-[var(--gts-portal-muted)]">
                          {partner.kpi.bookings} бронирований • ⭐ {partner.kpi.rating}
                        </div>
                        <div className="text-xs text-[var(--gts-portal-muted)]">
                          Рост: +{partner.kpi.growth}%
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="text-xs text-[var(--gts-portal-muted)]">
                        {partner.lastActivity && new Date(partner.lastActivity).toLocaleDateString('ru-RU')}
                      </div>
                      {partner.supportTickets > 0 && (
                        <div className="text-xs text-[var(--gts-portal-warning)] flex items-center mt-1">
                          <MessageSquare className="w-3 h-3 mr-1" />
                          {partner.supportTickets} тикетов
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedPartner(partner);
                          }}
                          className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        {canEditPartner(userRole) && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[var(--gts-portal-muted)] hover:text-[var(--gts-portal-text)]"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {filteredPartners.length === 0 && (
              <div className="text-center py-12 text-[var(--gts-portal-muted)]">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Партнеры не найдены</p>
                <p className="text-sm">Попробуйте изменить фильтры поиска</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderPartnerDetail = () => {
    if (!selectedPartner) return null;

    return (
      <Dialog open={!!selectedPartner} onOpenChange={() => setSelectedPartner(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--gts-portal-text)] flex items-center justify-between">
              <div className="flex items-center">
                {selectedPartner.name}
                <Badge variant={getStatusBadgeVariant(selectedPartner.status)} className="ml-3">
                  {selectedPartner.status}
                </Badge>
                <div className={`flex items-center ml-3 ${getLevelColor(selectedPartner.level)}`}>
                  <Star className="w-4 h-4 mr-1" />
                  {selectedPartner.level}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {canEditPartner(userRole) && (
                  <>
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                    <Button variant="outline" size="sm">
                      <Settings className="w-4 h-4 mr-2" />
                      Настройки
                    </Button>
                  </>
                )}
                {canDeletePartner(userRole) && (
                  <Button variant="outline" size="sm" className="text-[var(--gts-portal-error)] border-[var(--gts-portal-error)]">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Удалить
                  </Button>
                )}
              </div>
            </DialogTitle>
          </DialogHeader>
          
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-[var(--gts-portal-card)]">
              <TabsTrigger value="overview">Обзор</TabsTrigger>
              <TabsTrigger value="kpi">KPI</TabsTrigger>
              <TabsTrigger value="finance">Финансы</TabsTrigger>
              <TabsTrigger value="documents">Документы</TabsTrigger>
              <TabsTrigger value="support">Поддержка</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[600px] w-full">
              {/* Вкладка Обзор */}
              <TabsContent value="overview" className="space-y-6 p-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Основная информация */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Основная информация</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-[var(--gts-portal-muted)]" />
                        <span className="text-[var(--gts-portal-text)]">{selectedPartner.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-[var(--gts-portal-muted)]" />
                        <span className="text-[var(--gts-portal-text)]">{selectedPartner.phone}</span>
                      </div>
                      {selectedPartner.website && (
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 mr-2 text-[var(--gts-portal-muted)]" />
                          <a 
                            href={`https://${selectedPartner.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[var(--gts-portal-accent)] hover:underline flex items-center"
                          >
                            {selectedPartner.website}
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        </div>
                      )}
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-[var(--gts-portal-muted)]" />
                        <span className="text-[var(--gts-portal-text)]">
                          Присоединился {new Date(selectedPartner.joinDate).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Activity className="w-4 h-4 mr-2 text-[var(--gts-portal-muted)]" />
                        <span className="text-[var(--gts-portal-text)]">
                          Последняя активность {new Date(selectedPartner.lastActivity).toLocaleDateString('ru-RU')}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Детали партнерства */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Детали партнерства</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-[var(--gts-portal-muted)]">Тип:</span>
                        <Badge variant={getTypeBadgeVariant(selectedPartner.type)}>
                          {selectedPartner.type}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--gts-portal-muted)]">Локация:</span>
                        <span className="text-[var(--gts-portal-text)] flex items-center">
                          <MapPin className="w-3 h-3 mr-1" />
                          {selectedPartner.location}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[var(--gts-portal-muted)]">Комиссия:</span>
                        <span className="text-[var(--gts-portal-text)]">{selectedPartner.finance.commission}%</span>
                      </div>
                      {selectedPartner.contractDetails.exclusiveAreas && (
                        <div>
                          <span className="text-[var(--gts-portal-muted)] text-sm">Эксклюзивные зоны:</span>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {selectedPartner.contractDetails.exclusiveAreas.map((area, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {selectedPartner.contractDetails.specialTerms && (
                        <div>
                          <span className="text-[var(--gts-portal-muted)] text-sm">Особые условия:</span>
                          <p className="text-[var(--gts-portal-text)] text-sm mt-1">
                            {selectedPartner.contractDetails.specialTerms}
                          </p>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* Быстрая статистика */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Быстрая статистика</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="text-2xl text-[var(--gts-portal-text)]">
                          ₽{selectedPartner.kpi.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Общая выручка</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-center">
                        <div>
                          <div className="text-lg text-[var(--gts-portal-text)]">{selectedPartner.kpi.bookings}</div>
                          <div className="text-xs text-[var(--gts-portal-muted)]">Бронирования</div>
                        </div>
                        <div>
                          <div className="text-lg text-[var(--gts-portal-text)]">{selectedPartner.kpi.rating}</div>
                          <div className="text-xs text-[var(--gts-portal-muted)]">Рейтинг</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-[var(--gts-portal-muted)]">Конверсия</span>
                          <span className="text-[var(--gts-portal-text)]">{selectedPartner.kpi.conversionRate}%</span>
                        </div>
                        <Progress value={selectedPartner.kpi.conversionRate} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Производительность за месяц */}
                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Производительность за месяц</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl text-[var(--gts-portal-text)] flex items-center justify-center">
                          ₽{selectedPartner.performance.thisMonth.revenue.toLocaleString()}
                          {getTrendIcon(selectedPartner.performance.trend)}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Текущий месяц</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg text-[var(--gts-portal-muted)]">
                          ₽{selectedPartner.performance.lastMonth.revenue.toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Прошлый месяц</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg ${selectedPartner.performance.trend === 'up' ? 'text-[var(--gts-portal-success)]' : 'text-[var(--gts-portal-error)]'}`}>
                          {selectedPartner.performance.trend === 'up' ? '+' : ''}
                          {((selectedPartner.performance.thisMonth.revenue - selectedPartner.performance.lastMonth.revenue) / selectedPartner.performance.lastMonth.revenue * 100).toFixed(1)}%
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Изменение</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Вкладка KPI */}
              <TabsContent value="kpi" className="space-y-6 p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)] flex items-center">
                        <TrendingUp className="w-5 h-5 mr-2" />
                        Производительность
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--gts-portal-muted)]">Выручка</span>
                          <span className="text-[var(--gts-portal-text)]">
                            ₽{selectedPartner.kpi.revenue.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--gts-portal-muted)]">Бронирования</span>
                          <span className="text-[var(--gts-portal-text)]">
                            {selectedPartner.kpi.bookings}
                          </span>
                        </div>
                        <Progress value={60} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--gts-portal-muted)]">Рейтинг</span>
                          <span className="text-[var(--gts-portal-text)]">
                            {selectedPartner.kpi.rating}/5.0
                          </span>
                        </div>
                        <Progress value={(selectedPartner.kpi.rating / 5) * 100} className="h-2" />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--gts-portal-muted)]">Конверсия</span>
                          <span className="text-[var(--gts-portal-text)]">
                            {selectedPartner.kpi.conversionRate}%
                          </span>
                        </div>
                        <Progress value={selectedPartner.kpi.conversionRate} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)] flex items-center">
                        <BarChart3 className="w-5 h-5 mr-2" />
                        Аналитика роста
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center py-8">
                        <div className="text-3xl text-[var(--gts-portal-success)]">
                          +{selectedPartner.kpi.growth}%
                        </div>
                        <div className="text-[var(--gts-portal-muted)] mt-2">
                          Рост за последние 3 месяца
                        </div>
                        <div className="mt-4 text-sm text-[var(--gts-portal-text)]">
                          Показатели выше среднего по региону
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--gts-portal-text)] flex items-center">
                      <Target className="w-5 h-5 mr-2" />
                      Дополнительные KPI
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-2xl text-[var(--gts-portal-text)]">
                          {selectedPartner.kpi.repeatCustomers}%
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Повторные клиенты</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl text-[var(--gts-portal-text)]">
                          {selectedPartner.kpi.conversionRate}%
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Конверсия</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl text-[var(--gts-portal-text)]">
                          ₽{Math.round(selectedPartner.kpi.revenue / selectedPartner.kpi.bookings).toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)]">Средний чек</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Вкладка Финансы */}
              {canViewFinances(userRole) && (
                <TabsContent value="finance" className="space-y-6 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Общие доходы</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl text-[var(--gts-portal-text)]">
                          ₽{selectedPartner.finance.totalEarnings.toLocaleString()}
                        </div>
                        <div className="text-sm text-[var(--gts-portal-muted)] mt-2">
                          {selectedPartner.finance.completedPayments} выплат завершено
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-[var(--gts-portal-muted)]">К выплате</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl text-[var(--gts-portal-warning)]">
                          ₽{selectedPartner.finance.pendingPayouts.toLocaleString()}
                        </div>
                        <Button size="sm" className="mt-2 bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Выплатить
                        </Button>
                      </CardContent>
                    </Card>

                    <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Последняя выплата</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-sm text-[var(--gts-portal-text)]">
                          {new Date(selectedPartner.finance.lastPayout).toLocaleDateString('ru-RU')}
                        </div>
                        <Button variant="outline" size="sm" className="mt-2">
                          <History className="w-4 h-4 mr-2" />
                          История
                        </Button>
                      </CardContent>
                    </Card>
                  </div>

                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Прогресс к месячной цели</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[var(--gts-portal-muted)]">
                            ₽{selectedPartner.performance.thisMonth.revenue.toLocaleString()} / ₽{selectedPartner.finance.monthlyTarget.toLocaleString()}
                          </span>
                          <span className="text-[var(--gts-portal-text)]">
                            {Math.round((selectedPartner.performance.thisMonth.revenue / selectedPartner.finance.monthlyTarget) * 100)}%
                          </span>
                        </div>
                        <Progress 
                          value={(selectedPartner.performance.thisMonth.revenue / selectedPartner.finance.monthlyTarget) * 100} 
                          className="h-3"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              )}

              {/* Вкладка Документы */}
              <TabsContent value="documents" className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg text-[var(--gts-portal-text)]">Документы</h3>
                  {canEditPartner(userRole) && (
                    <Button className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                      <Upload className="w-4 h-4 mr-2" />
                      Загрузить документ
                    </Button>
                  )}
                </div>

                <div className="grid gap-4">
                  {selectedPartner.documents.map((doc) => (
                    <Card key={doc.id} className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            {getDocumentStatusIcon(doc.status)}
                            <div>
                              <div className="font-medium text-[var(--gts-portal-text)]">{doc.name}</div>
                              <div className="text-sm text-[var(--gts-portal-muted)]">
                                {doc.type} • {doc.size} • Загружен {new Date(doc.uploadDate).toLocaleDateString('ru-RU')}
                              </div>
                              {doc.expiryDate && (
                                <div className="text-sm text-[var(--gts-portal-muted)]">
                                  Действителен до {new Date(doc.expiryDate).toLocaleDateString('ru-RU')}
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2">
                            <Badge variant={doc.status === 'Valid' ? 'default' : doc.status === 'Expired' ? 'destructive' : 'outline'}>
                              {doc.status}
                            </Badge>
                            <Button variant="ghost" size="sm">
                              <Download className="w-4 h-4" />
                            </Button>
                            {canEditPartner(userRole) && (
                              <Button variant="ghost" size="sm">
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Вкладка Поддержка */}
              <TabsContent value="support" className="space-y-6 p-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg text-[var(--gts-portal-text)]">
                    Тикеты поддержки ({selectedPartner.supportTickets})
                  </h3>
                  <Button className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Новый тикет
                  </Button>
                </div>

                {/* Форма создания нового тикета */}
                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader>
                    <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Создать тикет поддержки</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Тема</Label>
                        <Input 
                          placeholder="Краткое описание проблемы"
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Приоритет</Label>
                        <Select defaultValue="medium">
                          <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="low">Низкий</SelectItem>
                            <SelectItem value="medium">Средний</SelectItem>
                            <SelectItem value="high">Высокий</SelectItem>
                            <SelectItem value="urgent">Срочный</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Описание</Label>
                      <Textarea 
                        placeholder="Подробное описание проблемы"
                        className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        rows={4}
                      />
                    </div>
                    <Button className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                      <Send className="w-4 h-4 mr-2" />
                      Отправить тикет
                    </Button>
                  </CardContent>
                </Card>

                {/* История тикетов (заглушка) */}
                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader>
                    <CardTitle className="text-sm text-[var(--gts-portal-muted)]">Последние тикеты</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-[var(--gts-portal-bg)] rounded-lg">
                        <div>
                          <div className="font-medium text-[var(--gts-portal-text)]">Проблема с выплатами</div>
                          <div className="text-sm text-[var(--gts-portal-muted)]">Создан 5 февраля 2024</div>
                        </div>
                        <Badge variant="outline">В работе</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-[var(--gts-portal-bg)] rounded-lg">
                        <div>
                          <div className="font-medium text-[var(--gts-portal-text)]">Вопрос по договору</div>
                          <div className="text-sm text-[var(--gts-portal-muted)]">Создан 28 января 2024</div>
                        </div>
                        <Badge variant="default">Решен</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--gts-portal-bg)] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl text-[var(--gts-portal-text)] mb-2">База данных партнеров</h1>
          <p className="text-[var(--gts-portal-muted)]">
            Управление партнерами, анализ KPI и финансовые операции
          </p>
        </div>

        {renderPartnersList()}
        {renderPartnerDetail()}
        {renderCreateWizard()}
      </div>
    </div>
  );

  // Partner Creation Wizard
  function renderCreateWizard() {
    if (!showCreateWizard) return null;

    const updateWizardData = (field: string, value: any) => {
      setWizardData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
      if (createStep < 4) setCreateStep(createStep + 1);
    };

    const prevStep = () => {
      if (createStep > 1) setCreateStep(createStep - 1);
    };

    const handleFinish = () => {
      // Here would be the API call to create partner
      console.log('Creating partner:', wizardData);
      setShowCreateWizard(false);
      setCreateStep(1);
    };

    return (
      <Dialog open={showCreateWizard} onOpenChange={setShowCreateWizard}>
        <DialogContent className="max-w-4xl max-h-[90vh] bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--gts-portal-text)] flex items-center">
              <UserPlus className="w-5 h-5 mr-2" />
              Создание партнера - Шаг {createStep} из 4
            </DialogTitle>
          </DialogHeader>

          {/* Progress indicator */}
          <div className="flex items-center space-x-2 mb-6">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm
                  ${step <= createStep 
                    ? 'bg-[var(--gts-portal-accent)] text-white' 
                    : 'bg-[var(--gts-portal-card)] text-[var(--gts-portal-muted)]'
                  }`}>
                  {step < createStep ? <CheckCircle2 className="w-4 h-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-0.5 mx-2 
                    ${step < createStep ? 'bg-[var(--gts-portal-accent)]' : 'bg-[var(--gts-portal-border)]'}`} 
                  />
                )}
              </div>
            ))}
          </div>

          <ScrollArea className="h-[500px] w-full">
            {/* Step 1: Basic Information */}
            {createStep === 1 && (
              <div className="space-y-6 p-1">
                <div className="text-center mb-6">
                  <Building className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />
                  <h3 className="text-xl text-[var(--gts-portal-text)]">Основная информация</h3>
                  <p className="text-[var(--gts-portal-muted)]">Введите базовые данные о партнере</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Название компании *</Label>
                    <Input
                      value={wizardData.name}
                      onChange={(e) => updateWizardData('name', e.target.value)}
                      placeholder="ООО 'Морские Приключения'"
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Тип партнера *</Label>
                    <Select value={wizardData.type} onValueChange={(value) => updateWizardData('type', value)}>
                      <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                        <SelectValue placeholder="Выберите тип" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Agent">Агент</SelectItem>
                        <SelectItem value="Contractor">Подрядчик</SelectItem>
                        <SelectItem value="Brand">Бренд</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Email *</Label>
                    <Input
                      type="email"
                      value={wizardData.email}
                      onChange={(e) => updateWizardData('email', e.target.value)}
                      placeholder="contact@company.ru"
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Телефон *</Label>
                    <Input
                      value={wizardData.phone}
                      onChange={(e) => updateWizardData('phone', e.target.value)}
                      placeholder="+7 918 123-45-67"
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Веб-сайт</Label>
                    <Input
                      value={wizardData.website}
                      onChange={(e) => updateWizardData('website', e.target.value)}
                      placeholder="company.ru"
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Локация *</Label>
                    <Select value={wizardData.location} onValueChange={(value) => updateWizardData('location', value)}>
                      <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Сочи">Сочи</SelectItem>
                        <SelectItem value="Краснодар">Краснодар</SelectItem>
                        <SelectItem value="Анапа">Анапа</SelectItem>
                        <SelectItem value="Геленджик">Геленджик</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Уровень партнера</Label>
                    <Select value={wizardData.level} onValueChange={(value) => updateWizardData('level', value)}>
                      <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Bronze">Bronze</SelectItem>
                        <SelectItem value="Silver">Silver</SelectItem>
                        <SelectItem value="Gold">Gold</SelectItem>
                        <SelectItem value="Platinum">Platinum</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Комиссия (%)</Label>
                    <Input
                      type="number"
                      value={wizardData.commission}
                      onChange={(e) => updateWizardData('commission', Number(e.target.value))}
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Месячная цель (₽)</Label>
                    <Input
                      type="number"
                      value={wizardData.monthlyTarget}
                      onChange={(e) => updateWizardData('monthlyTarget', Number(e.target.value))}
                      className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Type-specific Information */}
            {createStep === 2 && (
              <div className="space-y-6 p-1">
                <div className="text-center mb-6">
                  {wizardData.type === 'Agent' && <UserCheck className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />}
                  {wizardData.type === 'Contractor' && <Truck className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />}
                  {wizardData.type === 'Brand' && <Award className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />}
                  <h3 className="text-xl text-[var(--gts-portal-text)]">
                    Специализированная информация - {wizardData.type}
                  </h3>
                  <p className="text-[var(--gts-portal-muted)]">
                    Заполните поля, специфичные для типа партнера
                  </p>
                </div>

                {wizardData.type === 'Agent' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Название агентства</Label>
                        <Input
                          value={wizardData.agencyName}
                          onChange={(e) => updateWizardData('agencyName', e.target.value)}
                          placeholder="Турагентство 'Морское'"
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Номер лицензии</Label>
                        <Input
                          value={wizardData.licenseNumber}
                          onChange={(e) => updateWizardData('licenseNumber', e.target.value)}
                          placeholder="ТУР-123456"
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Специализации</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Морские туры', 'Рыбалка', 'Экскурсии', 'VIP-туры', 'Корпоративы'].map((spec) => (
                          <Badge
                            key={spec}
                            variant={wizardData.specializations.includes(spec) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const specializations = wizardData.specializations.includes(spec)
                                ? wizardData.specializations.filter(s => s !== spec)
                                : [...wizardData.specializations, spec];
                              updateWizardData('specializations', specializations);
                            }}
                          >
                            {spec}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {wizardData.type === 'Contractor' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Регистрационные данные</Label>
                        <Input
                          value={wizardData.companyRegistration}
                          onChange={(e) => updateWizardData('companyRegistration', e.target.value)}
                          placeholder="ОГРН 1234567890123"
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Тип оборудования</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Катера', 'Яхты', 'Гидроциклы', 'SUP-борды', 'Каяки', 'Снаряжение'].map((equip) => (
                          <Badge
                            key={equip}
                            variant={wizardData.equipment.includes(equip) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const equipment = wizardData.equipment.includes(equip)
                                ? wizardData.equipment.filter(e => e !== equip)
                                : [...wizardData.equipment, equip];
                              updateWizardData('equipment', equipment);
                            }}
                          >
                            {equip}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Сертификации</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['ISO 9001', 'Морской регистр', 'ГИМС', 'Сертификат безопасности'].map((cert) => (
                          <Badge
                            key={cert}
                            variant={wizardData.certifications.includes(cert) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const certifications = wizardData.certifications.includes(cert)
                                ? wizardData.certifications.filter(c => c !== cert)
                                : [...wizardData.certifications, cert];
                              updateWizardData('certifications', certifications);
                            }}
                          >
                            {cert}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {wizardData.type === 'Brand' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Категория бренда</Label>
                        <Select value={wizardData.brandCategory} onValueChange={(value) => updateWizardData('brandCategory', value)}>
                          <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue placeholder="Выберите категорию" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="marine">Морская техника</SelectItem>
                            <SelectItem value="equipment">Снаряжение</SelectItem>
                            <SelectItem value="accessories">Аксессуары</SelectItem>
                            <SelectItem value="clothing">Одежда</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Уровень дистрибьюции</Label>
                        <Select value={wizardData.distributorLevel} onValueChange={(value) => updateWizardData('distributorLevel', value)}>
                          <SelectTrigger className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue placeholder="Выберите уровень" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="exclusive">Эксклюзивный дистрибьютор</SelectItem>
                            <SelectItem value="authorized">Авторизованный дилер</SelectItem>
                            <SelectItem value="partner">Партнер</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Территориальные права</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Сочи', 'Краснодарский край', 'Южный ФО', 'Вся Россия'].map((territory) => (
                          <Badge
                            key={territory}
                            variant={wizardData.territoryRights.includes(territory) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const territoryRights = wizardData.territoryRights.includes(territory)
                                ? wizardData.territoryRights.filter(t => t !== territory)
                                : [...wizardData.territoryRights, territory];
                              updateWizardData('territoryRights', territoryRights);
                            }}
                          >
                            {territory}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Линейки продуктов</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {['Моторы', 'Катера', 'Аксессуары', 'Запчасти', 'Сервис'].map((product) => (
                          <Badge
                            key={product}
                            variant={wizardData.productLines.includes(product) ? 'default' : 'outline'}
                            className="cursor-pointer"
                            onClick={() => {
                              const productLines = wizardData.productLines.includes(product)
                                ? wizardData.productLines.filter(p => p !== product)
                                : [...wizardData.productLines, product];
                              updateWizardData('productLines', productLines);
                            }}
                          >
                            {product}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Contract details */}
                <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                  <CardHeader>
                    <CardTitle className="text-[var(--gts-portal-text)]">Условия договора</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Дата начала сотрудничества</Label>
                        <Input
                          type="date"
                          value={wizardData.contractStartDate}
                          onChange={(e) => updateWizardData('contractStartDate', e.target.value)}
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Дата окончания (опционально)</Label>
                        <Input
                          type="date"
                          value={wizardData.contractEndDate}
                          onChange={(e) => updateWizardData('contractEndDate', e.target.value)}
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Особые условия</Label>
                      <Textarea
                        value={wizardData.specialTerms}
                        onChange={(e) => updateWizardData('specialTerms', e.target.value)}
                        placeholder="Дополнительные условия сотрудничества..."
                        className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        rows={3}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Documents */}
            {createStep === 3 && (
              <div className="space-y-6 p-1">
                <div className="text-center mb-6">
                  <FileCheck className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />
                  <h3 className="text-xl text-[var(--gts-portal-text)]">Документы</h3>
                  <p className="text-[var(--gts-portal-muted)]">Загрузите необходимые документы</p>
                </div>

                <div className="space-y-6">
                  {/* Required documents checklist */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Обязательные документы</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {[
                          'Учредительные документы',
                          'Свидетельство о регистрации',
                          'Налоговая справка',
                          'Лицензия (если применимо)',
                          'Страховой полис',
                          'Банковские реквизиты'
                        ].map((doc, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <input
                              type="checkbox"
                              id={`req-doc-${index}`}
                              checked={wizardData.requiredDocuments.includes(doc)}
                              onChange={(e) => {
                                const requiredDocuments = e.target.checked
                                  ? [...wizardData.requiredDocuments, doc]
                                  : wizardData.requiredDocuments.filter(d => d !== doc);
                                updateWizardData('requiredDocuments', requiredDocuments);
                              }}
                              className="rounded"
                            />
                            <label htmlFor={`req-doc-${index}`} className="text-[var(--gts-portal-text)] cursor-pointer">
                              {doc}
                            </label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* File upload area */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Загрузка документов</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="border-2 border-dashed border-[var(--gts-portal-border)] rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 mx-auto text-[var(--gts-portal-muted)] mb-4" />
                        <p className="text-[var(--gts-portal-text)] mb-2">Перетащите файлы сюда или нажмите для выбора</p>
                        <p className="text-[var(--gts-portal-muted)] text-sm">Поддерживаются форматы: PDF, DOC, DOCX, JPG, PNG</p>
                        <Button variant="outline" className="mt-4">
                          <FileUpload className="w-4 h-4 mr-2" />
                          Выбрать файлы
                        </Button>
                      </div>

                      {/* Uploaded files list */}
                      {wizardData.uploadedDocuments.length > 0 && (
                        <div className="mt-6 space-y-2">
                          <h4 className="text-[var(--gts-portal-text)] font-medium">Загруженные документы:</h4>
                          {wizardData.uploadedDocuments.map((doc, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-[var(--gts-portal-bg)] rounded-lg">
                              <div className="flex items-center space-x-2">
                                <FileText className="w-4 h-4 text-[var(--gts-portal-muted)]" />
                                <span className="text-[var(--gts-portal-text)]">{doc.name}</span>
                                <Badge variant="outline">{doc.type}</Badge>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => {
                                  const uploadedDocuments = wizardData.uploadedDocuments.filter((_, i) => i !== index);
                                  updateWizardData('uploadedDocuments', uploadedDocuments);
                                }}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Step 4: Invitation */}
            {createStep === 4 && (
              <div className="space-y-6 p-1">
                <div className="text-center mb-6">
                  <Mail className="w-12 h-12 mx-auto text-[var(--gts-portal-accent)] mb-2" />
                  <h3 className="text-xl text-[var(--gts-portal-text)]">Приглашение</h3>
                  <p className="text-[var(--gts-portal-muted)]">Настройте приглашение для нового партнера</p>
                </div>

                <div className="space-y-6">
                  {/* Partner summary */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Сводка по партнеру</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Название:</span>
                          <span className="text-[var(--gts-portal-text)] ml-2">{wizardData.name}</span>
                        </div>
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Тип:</span>
                          <Badge variant="outline" className="ml-2">{wizardData.type}</Badge>
                        </div>
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Email:</span>
                          <span className="text-[var(--gts-portal-text)] ml-2">{wizardData.email}</span>
                        </div>
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Уровень:</span>
                          <Badge variant="outline" className="ml-2">{wizardData.level}</Badge>
                        </div>
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Комиссия:</span>
                          <span className="text-[var(--gts-portal-text)] ml-2">{wizardData.commission}%</span>
                        </div>
                        <div>
                          <span className="text-[var(--gts-portal-muted)]">Месячная цель:</span>
                          <span className="text-[var(--gts-portal-text)] ml-2">₽{wizardData.monthlyTarget.toLocaleString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Invitation settings */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Настройки приглашения</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="send-welcome"
                          checked={wizardData.sendWelcomeEmail}
                          onChange={(e) => updateWizardData('sendWelcomeEmail', e.target.checked)}
                        />
                        <label htmlFor="send-welcome" className="text-[var(--gts-portal-text)] cursor-pointer">
                          Отправить приветственное письмо
                        </label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="immediate-access"
                          checked={wizardData.grantImmediateAccess}
                          onChange={(e) => updateWizardData('grantImmediateAccess', e.target.checked)}
                        />
                        <label htmlFor="immediate-access" className="text-[var(--gts-portal-text)] cursor-pointer">
                          Предоставить немедленный доступ к порталу
                        </label>
                      </div>

                      <div>
                        <Label className="text-[var(--gts-portal-text)]">Персональное сообщение</Label>
                        <Textarea
                          value={wizardData.customMessage}
                          onChange={(e) => updateWizardData('customMessage', e.target.value)}
                          placeholder="Добро пожаловать в GTS! Мы рады начать сотрудничество..."
                          className="bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                          rows={4}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Login credentials */}
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardHeader>
                      <CardTitle className="text-[var(--gts-portal-text)]">Данные для входа</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-[var(--gts-portal-bg)] p-4 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="text-[var(--gts-portal-text)] font-medium">Логин: {wizardData.email}</p>
                            <p className="text-[var(--gts-portal-text)]">Временный пароль: GTS{Math.random().toString(36).substring(7).toUpperCase()}</p>
                          </div>
                          <Button variant="outline" size="sm">
                            <Copy className="w-4 h-4 mr-2" />
                            Копировать
                          </Button>
                        </div>
                        <p className="text-[var(--gts-portal-muted)] text-sm mt-2">
                          Партнер получит эти данные по email и сможет изменить пароль при первом входе.
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}
          </ScrollArea>

          {/* Navigation buttons */}
          <div className="flex justify-between items-center pt-6 border-t border-[var(--gts-portal-border)]">
            <div>
              {createStep > 1 && (
                <Button variant="outline" onClick={prevStep}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
              )}
            </div>

            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowCreateWizard(false)}>
                Отменить
              </Button>
              
              {createStep < 4 ? (
                <Button 
                  onClick={nextStep}
                  disabled={
                    (createStep === 1 && (!wizardData.name || !wizardData.email || !wizardData.type)) ||
                    (createStep === 2 && wizardData.type === '' )
                  }
                  className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90"
                >
                  Далее
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleFinish} className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Создать партнера
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }
};