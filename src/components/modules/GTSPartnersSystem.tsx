import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSUnifiedAppShell } from "../shell/GTSUnifiedAppShell";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Users,
  Building,
  Truck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Settings,
  BarChart3,
  Star,
  MapPin,
  FileText,
  MessageSquare,
  Activity,
  CreditCard,
  Clock
} from "lucide-react";

/**
 * 06_Partners - Унифицированная система партнеров
 * 
 * МИГРАЦИЯ: Объединяет legacy партнерские порталы:
 * - [LEGACY] GTSPartnerAgentPortal → Agents Tab
 * - [LEGACY] GTSContractorPortal → Contractors Tab  
 * - [LEGACY] GTSBrandPartnerPortal → Brand Tab
 * 
 * ✅ Унифицированный паттерн карточек: Overview • KPI • Operations • Finance • Documents • Support
 * ✅ Применён GTSUnifiedAppShell
 * ✅ Вкладочная структура Agents/Contractors/Brand
 */

interface GTSPartnersSystemProps {
  onBackToHome?: () => void;
  onNavigateToFinance?: (partnerData: any, financeSection: string) => void;
}

// Expanded mock data with unified pattern
const mockAgents = [
  {
    id: '1',
    name: 'Елена Смирнова',
    email: 'e.smirnova@agent.com',
    phone: '+7 (926) 123-45-67',
    region: 'Москва',
    level: 'Gold',
    // Overview
    joinDate: '2023-08-15',
    status: 'active',
    rating: 4.8,
    // KPI
    leadsGenerated: 45,
    conversions: 12,
    conversionRate: 26.7,
    commission: 125000,
    // Operations
    activeBookings: 8,
    completedBookings: 67,
    pendingRequests: 3,
    // Finance
    monthlyEarnings: 32000,
    totalEarnings: 450000,
    payoutStatus: 'paid',
    // Documents
    contractSigned: true,
    documentsComplete: true,
    lastUpdate: '2024-08-20'
  },
  {
    id: '2',
    name: 'Михаил Козлов',
    email: 'm.kozlov@partner.ru',
    phone: '+7 (903) 987-65-43',
    region: 'Санкт-Петербург',
    level: 'Silver',
    joinDate: '2023-11-20',
    status: 'active',
    rating: 4.5,
    leadsGenerated: 32,
    conversions: 8,
    conversionRate: 25.0,
    commission: 89000,
    activeBookings: 4,
    completedBookings: 28,
    pendingRequests: 1,
    monthlyEarnings: 22000,
    totalEarnings: 198000,
    payoutStatus: 'pending',
    contractSigned: true,
    documentsComplete: false,
    lastUpdate: '2024-08-15'
  }
];

const mockContractors = [
  {
    id: '1',
    name: 'ООО "Морской Флот"',
    contact: 'Александр Петров',
    email: 'fleet@maritime.ru',
    phone: '+7 (495) 555-11-22',
    city: 'Сочи',
    category: 'Водный транспорт',
    // Overview
    contractDate: '2024-01-15',
    contract: 'GTS-CONTR-2024-001',
    status: 'active',
    rating: 4.9,
    // KPI
    resourcesCount: 8,
    utilizationRate: 87,
    monthlyRevenue: 285000,
    revenue: 1250000,
    // Operations
    activeBookings: 12,
    maintenanceScheduled: 2,
    incidentsReported: 0,
    // Finance
    monthlyPayouts: 228000,
    totalPayouts: 1000000,
    paymentTerms: '30 days',
    // Documents
    licenseValid: true,
    insuranceValid: true,
    safetyCompliant: true
  },
  {
    id: '2',
    name: 'ИП Сидоров В.А.',
    contact: 'Владимир Сидоров',
    email: 'v.sidorov@buggy.com',
    phone: '+7 (988) 777-88-99',
    city: 'Красная Поляна',
    category: 'Наземные экскурсии',
    contractDate: '2024-02-01',
    contract: 'GTS-CONTR-2024-002',
    status: 'active',
    rating: 4.7,
    resourcesCount: 5,
    utilizationRate: 92,
    monthlyRevenue: 195000,
    revenue: 780000,
    activeBookings: 8,
    maintenanceScheduled: 1,
    incidentsReported: 0,
    monthlyPayouts: 156000,
    totalPayouts: 624000,
    paymentTerms: '15 days',
    licenseValid: true,
    insuranceValid: true,
    safetyCompliant: true
  }
];

const mockBrandPartners = [
  {
    id: '1',
    name: 'Ресторан "Морской Бриз"',
    category: 'Ресторан',
    contact: 'Ольга Иванова',
    email: 'promo@seabreeze.ru',
    phone: '+7 (862) 333-44-55',
    city: 'Сочи',
    // Overview
    partnership: '2023-06-10',
    status: 'active',
    partnershipType: 'Loyalty Program',
    // KPI
    promoCode: 'SEABREEZE15',
    discount: '15%',
    referrals: 23,
    conversionRate: 18.5,
    revenue: 145000,
    // Operations
    activePromotions: 2,
    redeemptions: 156,
    campaignReach: 2500,
    // Finance
    monthlyCommission: 12000,
    totalCommission: 87000,
    commissionRate: '8%',
    // Documents
    agreementSigned: true,
    brandGuidelinesApproved: true,
    marketingMaterials: true
  },
  {
    id: '2',
    name: 'Отель "Золотая Бухта"',
    category: 'Гостиница',
    contact: 'Денис Морозов',
    email: 'partnership@goldbay.com',
    phone: '+7 (862) 666-77-88',
    city: 'Сочи',
    partnership: '2023-03-22',
    status: 'active',
    partnershipType: 'Cross-promotion',
    promoCode: 'GOLDBAY20',
    discount: '20%',
    referrals: 41,
    conversionRate: 24.4,
    revenue: 320000,
    activePromotions: 3,
    redeemptions: 287,
    campaignReach: 4200,
    monthlyCommission: 25600,
    totalCommission: 204800,
    commissionRate: '12%',
    agreementSigned: true,
    brandGuidelinesApproved: true,
    marketingMaterials: true
  }
];

interface UnifiedPartnerCardProps {
  partner: any;
  type: 'agent' | 'contractor' | 'brand';
  onViewDetails: () => void;
  onViewKPI: () => void;
  onViewOperations: () => void;
  onViewFinance: (partnerData: any, financeSection: string) => void;
  onViewDocuments: () => void;
  onContactSupport: () => void;
}

function UnifiedPartnerCard({ partner, type, onViewDetails, onViewKPI, onViewOperations, onViewFinance, onViewDocuments, onContactSupport }: UnifiedPartnerCardProps) {
  const getTypeIcon = () => {
    switch (type) {
      case 'agent': return <Users className="w-6 h-6 text-white" />;
      case 'contractor': return <Truck className="w-6 h-6 text-white" />;
      case 'brand': return <Building className="w-6 h-6 text-white" />;
    }
  };

  const getTypeColor = () => {
    switch (type) {
      case 'agent': return 'from-blue-500 to-blue-600';
      case 'contractor': return 'from-orange-500 to-orange-600';
      case 'brand': return 'from-purple-500 to-purple-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return GTSStyles.badges.success;
      case 'inactive': return GTSStyles.badges.secondary;
      case 'pending': return GTSStyles.badges.warning;
      case 'suspended': return GTSStyles.badges.destructive;
      default: return GTSStyles.badges.secondary;
    }
  };

  const getMainMetric = () => {
    if (type === 'agent') return `${partner.commission?.toLocaleString() || 0}₽`;
    if (type === 'contractor') return `${partner.revenue?.toLocaleString() || 0}₽`;
    if (type === 'brand') return `${partner.revenue?.toLocaleString() || 0}₽`;
    return '0₽';
  };

  const getSecondaryMetrics = () => {
    if (type === 'agent') {
      return {
        leads: partner.leadsGenerated || 0,
        conversions: partner.conversions || 0,
        rate: `${partner.conversionRate || 0}%`
      };
    }
    if (type === 'contractor') {
      return {
        resources: partner.resourcesCount || 0,
        utilization: `${partner.utilizationRate || 0}%`,
        bookings: partner.activeBookings || 0
      };
    }
    if (type === 'brand') {
      return {
        referrals: partner.referrals || 0,
        discount: partner.discount || '0%',
        code: partner.promoCode || 'N/A'
      };
    }
    return {};
  };

  return (
    <Card className={GTSStyles.cards.content + ' p-6'}>
      {/* Overview Section */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-start gap-4">
          <div className={`w-14 h-14 bg-gradient-to-br ${getTypeColor()} rounded-xl flex items-center justify-center`}>
            {getTypeIcon()}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`${GTSComponents.cardTitle} mb-0`}>{partner.name}</h3>
              <Badge className={getStatusColor(partner.status)}>
                {partner.status === 'active' ? 'Активен' : partner.status}
              </Badge>
              {partner.level && (
                <Badge variant="outline" className="text-xs">
                  {partner.level}
                </Badge>
              )}
            </div>
            
            {partner.contact && (
              <p className={`text-sm ${GTSStyles.text.muted} mb-1`}>
                Контакт: {partner.contact}
              </p>
            )}
            
            <div className={`flex flex-wrap items-center gap-4 text-sm ${GTSStyles.text.muted}`}>
              <span>📧 {partner.email}</span>
              <span>📞 {partner.phone}</span>
              <span>📍 {partner.region || partner.city}</span>
              {partner.rating && (
                <span className="flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  {partner.rating}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="text-right">
          <div className={`text-xl ${GTSStyles.text.primary} font-semibold mb-1`}>
            {getMainMetric()}
          </div>
          <div className={`text-sm ${GTSStyles.text.muted}`}>
            {type === 'agent' && 'Комиссии'}
            {type === 'contractor' && 'Оборот'}
            {type === 'brand' && 'Выручка'}
          </div>
        </div>
      </div>

      {/* KPI Section */}
      <div className={`grid grid-cols-3 gap-4 p-4 rounded-lg ${GTSStyles.backgrounds.card} mb-6`}>
        {Object.entries(getSecondaryMetrics()).map(([key, value], index) => (
          <div key={index} className="text-center">
            <div className={`text-lg ${GTSStyles.text.primary} font-medium mb-1`}>
              {value}
            </div>
            <div className={`text-xs ${GTSStyles.text.muted}`}>
              {key === 'leads' && 'Лидов'}
              {key === 'conversions' && 'Конверсий'}
              {key === 'rate' && 'Конверсия'}
              {key === 'resources' && 'Ресурсов'}
              {key === 'utilization' && 'Загрузка'}
              {key === 'bookings' && 'Активных'}
              {key === 'referrals' && 'Рефералов'}
              {key === 'discount' && 'Скидка'}
              {key === 'code' && 'Промокод'}
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons - Unified Pattern: Overview • KPI • Operations • Finance • Documents • Support */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDetails}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <Eye className="w-4 h-4" />
          <span className="text-xs">Overview</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewKPI}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <BarChart3 className="w-4 h-4" />
          <span className="text-xs">KPI</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewOperations}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <Activity className="w-4 h-4" />
          <span className="text-xs">Operations</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewFinance(partner, 'general_finance')}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <DollarSign className="w-4 h-4" />
          <span className="text-xs">Finance</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onViewDocuments}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <FileText className="w-4 h-4" />
          <span className="text-xs">Documents</span>
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onContactSupport}
          className={GTSStyles.buttons.secondary + ' flex flex-col gap-1 h-auto py-3'}
        >
          <MessageSquare className="w-4 h-4" />
          <span className="text-xs">Support</span>
        </Button>
      </div>
    </Card>
  );
}

export function GTSPartnersSystem({ onBackToHome, onNavigateToFinance }: GTSPartnersSystemProps) {
  const [activeTab, setActiveTab] = useState('agents');
  const [currentPath] = useState("/partners");

  const handleNavigate = (path: string) => {
    console.log(`Navigate to ${path}`);
  };

  const handleSearch = (query: string) => {
    console.log('Search partners:', query);
  };

  const handleLogout = () => {
    console.log('Logout');
  };

  // Mock user for shell
  const user = {
    id: 'exec1',
    name: 'Анна Иванова',
    email: 'anna.ivanova@gts.com',
    role: 'executive' as const
  };

  const partnersContent = (
    <div className="p-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className={GTSStyles.cards.content + ' p-4 text-center'}>
          <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
            {mockAgents.length}
          </div>
          <div className={`text-sm ${GTSStyles.text.muted}`}>Активных агентов</div>
        </Card>
        <Card className={GTSStyles.cards.content + ' p-4 text-center'}>
          <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
            {mockContractors.length}
          </div>
          <div className={`text-sm ${GTSStyles.text.muted}`}>Подрядчиков</div>
        </Card>
        <Card className={GTSStyles.cards.content + ' p-4 text-center'}>
          <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>
            {mockBrandPartners.length}
          </div>
          <div className={`text-sm ${GTSStyles.text.muted}`}>Бренд-партнеров</div>
        </Card>
        <Card className={GTSStyles.cards.content + ' p-4 text-center'}>
          <div className={`text-2xl ${GTSStyles.text.primary} font-semibold mb-1`}>₽2.5M</div>
          <div className={`text-sm ${GTSStyles.text.muted}`}>Общий оборот</div>
        </Card>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <div className="flex items-center justify-between">
          <TabsList className={`${GTSStyles.backgrounds.surface} border ${GTSStyles.borders.default}`}>
            <TabsTrigger 
              value="agents" 
              className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Агенты ({mockAgents.length})
            </TabsTrigger>
            <TabsTrigger 
              value="contractors" 
              className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white"
            >
              <Truck className="w-4 h-4 mr-2" />
              Подрядчики ({mockContractors.length})
            </TabsTrigger>
            <TabsTrigger 
              value="brand" 
              className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white"
            >
              <Building className="w-4 h-4 mr-2" />
              Бренды ({mockBrandPartners.length})
            </TabsTrigger>
          </TabsList>

          <div className="flex gap-3">
            <Button variant="outline" size="sm" className={GTSStyles.buttons.secondary}>
              <Filter className="w-4 h-4 mr-2" />
              Фильтры
            </Button>
            <Button className={GTSStyles.buttons.primary}>
              <Plus className="w-4 h-4 mr-2" />
              Новый партнер
            </Button>
          </div>
        </div>

        {/* Agents Tab */}
        <TabsContent value="agents" className="space-y-6">
          <div className="grid gap-6">
            {mockAgents.map((agent) => (
              <UnifiedPartnerCard
                key={agent.id}
                partner={agent}
                type="agent"
                onViewDetails={() => console.log('View agent details:', agent.id)}
                onViewKPI={() => console.log('View agent KPI:', agent.id)}
                onViewOperations={() => console.log('View agent operations:', agent.id)}
                onViewFinance={(partnerData, financeSection) => onNavigateToFinance && onNavigateToFinance(agent, 'partner_payouts')}
                onViewDocuments={() => console.log('View agent documents:', agent.id)}
                onContactSupport={() => console.log('Contact agent support:', agent.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Contractors Tab */}
        <TabsContent value="contractors" className="space-y-6">
          <div className="grid gap-6">
            {mockContractors.map((contractor) => (
              <UnifiedPartnerCard
                key={contractor.id}
                partner={contractor}
                type="contractor"
                onViewDetails={() => console.log('View contractor details:', contractor.id)}
                onViewKPI={() => console.log('View contractor KPI:', contractor.id)}
                onViewOperations={() => console.log('View contractor operations:', contractor.id)}
                onViewFinance={(partnerData, financeSection) => onNavigateToFinance && onNavigateToFinance(contractor, 'contractor_payouts')}
                onViewDocuments={() => console.log('View contractor documents:', contractor.id)}
                onContactSupport={() => console.log('Contact contractor support:', contractor.id)}
              />
            ))}
          </div>
        </TabsContent>

        {/* Brand Partners Tab */}
        <TabsContent value="brand" className="space-y-6">
          <div className="grid gap-6">
            {mockBrandPartners.map((partner) => (
              <UnifiedPartnerCard
                key={partner.id}
                partner={partner}
                type="brand"
                onViewDetails={() => console.log('View brand details:', partner.id)}
                onViewKPI={() => console.log('View brand KPI:', partner.id)}
                onViewOperations={() => console.log('View brand operations:', partner.id)}
                onViewFinance={(partnerData, financeSection) => onNavigateToFinance && onNavigateToFinance(partner, 'brand_commissions')}
                onViewDocuments={() => console.log('View brand documents:', partner.id)}
                onContactSupport={() => console.log('Contact brand support:', partner.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  if (onBackToHome) {
    // Standalone mode for demo
    return (
      <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
        <div className={GTSComponents.pageHeader}>
          <div className="max-w-6xl mx-auto flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBackToHome} className={GTSStyles.buttons.ghost}>
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <div>
              <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                06_Partners - Управление партнерами
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Agents • Contractors • Brand - унифицированные карточки партнеров
              </p>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          {partnersContent}
        </div>
      </div>
    );
  }

  // Integrated with shell
  return (
    <GTSUnifiedAppShell
      user={user}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      onLogout={handleLogout}
      notificationCount={2}
    >
      {partnersContent}
    </GTSUnifiedAppShell>
  );
}