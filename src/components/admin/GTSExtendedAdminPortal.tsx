import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Users, 
  Settings, 
  BarChart3, 
  Calendar,
  FileText,
  Shield,
  Bell,
  Activity,
  UserPlus,
  Building2,
  Handshake,
  Wrench,
  DollarSign,
  FolderOpen,
  Mail,
  Edit,
  Building,
  Headphones,
  ArrowLeft,
  Search,
  MoreVertical
} from "lucide-react";
import { GTSCRMModule } from "./modules/GTSCRMModule";
import { GTSCalendarModule } from "./modules/GTSCalendarModule";
import { GTSStaffManagementModule } from "./modules/GTSStaffManagementModule";
import { GTSPartnersModule } from "./modules/GTSPartnersModule";
import { GTSFinanceCenterModule } from "./modules/GTSFinanceCenterModule";
import { GTSDocumentsInboxModule } from "./modules/GTSDocumentsInboxModule";
import { GTSCMSModule } from "./modules/GTSCMSModule";
import { GTSCorporateClientsModule } from "./modules/GTSCorporateClientsModule";
import { GTSConciergeModule } from "./modules/GTSConciergeModule";
import { Input } from "../ui/input";

interface GTSExtendedAdminPortalProps {
  onBackToHome: () => void;
}

export function GTSExtendedAdminPortal({ onBackToHome }: GTSExtendedAdminPortalProps) {
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const modules = [
    {
      id: "crm",
      title: "CRM",
      description: "Лиды, Сделки, Клиенты, Автоматизация",
      icon: <Users className="h-6 w-6" />,
      stats: { leads: 45, deals: 12, clients: 128 },
      color: "text-blue-400",
      bgColor: "bg-blue-500/10"
    },
    {
      id: "calendar",
      title: "Календарь",
      description: "Планирование ресурсов и бронирований",
      icon: <Calendar className="h-6 w-6" />,
      stats: { today: 8, week: 32, month: 145 },
      color: "text-green-400",
      bgColor: "bg-green-500/10"
    },
    {
      id: "staff",
      title: "Управление персоналом",
      description: "Роли, Права доступа, KPI",
      icon: <Shield className="h-6 w-6" />,
      stats: { active: 24, roles: 12, pending: 3 },
      color: "text-purple-400",
      bgColor: "bg-purple-500/10"
    },
    {
      id: "partners",
      title: "Партнёры",
      description: "Агенты, Подрядчики, Бренд-партнёры",
      icon: <Handshake className="h-6 w-6" />,
      stats: { agents: 15, contractors: 8, brands: 5 },
      color: "text-orange-400",
      bgColor: "bg-orange-500/10"
    },
    {
      id: "finance",
      title: "Финансовый центр",
      description: "Доходы, Расходы, Выплаты, Отчёты",
      icon: <DollarSign className="h-6 w-6" />,
      stats: { revenue: "2.3M", margin: "34%", payouts: "125K" },
      color: "text-emerald-400",
      bgColor: "bg-emerald-500/10"
    },
    {
      id: "documents",
      title: "Документы и Уведомления",
      description: "Договоры, Оповещения, Уведомления",
      icon: <FolderOpen className="h-6 w-6" />,
      stats: { docs: 234, alerts: 7, tickets: 12 },
      color: "text-yellow-400",
      bgColor: "bg-yellow-500/10"
    },
    {
      id: "cms",
      title: "Контент-центр",
      description: "Техника, Предложения, Блог, Новости",
      icon: <Edit className="h-6 w-6" />,
      stats: { posts: 89, offers: 12, pending: 5 },
      color: "text-pink-400",
      bgColor: "bg-pink-500/10"
    },
    {
      id: "corporate",
      title: "Корпоративные клиенты",
      description: "B2B компании, Пакеты услуг, Акты",
      icon: <Building className="h-6 w-6" />,
      stats: { companies: 23, packages: 8, acts: 45 },
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10"
    },
    {
      id: "concierge",
      title: "Консьерж-сервис",
      description: "Премиальные запросы и услуги",
      icon: <Headphones className="h-6 w-6" />,
      stats: { requests: 15, active: 3, completed: 45 },
      color: "text-indigo-400",
      bgColor: "bg-indigo-500/10",
      badge: "Скоро"
    }
  ];

  const filteredModules = modules.filter(module =>
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderModule = () => {
    switch (activeModule) {
      case "crm":
        return <GTSCRMModule onBack={() => setActiveModule(null)} onNavigateToCalendar={() => setActiveModule("calendar")} />;
      case "calendar":
        return <GTSCalendarModule onBack={() => setActiveModule(null)} onNavigateToCRM={() => setActiveModule("crm")} />;
      case "staff":
        return <GTSStaffManagementModule onBack={() => setActiveModule(null)} onNavigateToCalendar={() => setActiveModule("calendar")} />;
      case "partners":
        return <GTSPartnersModule onBack={() => setActiveModule(null)} onNavigateToFinance={() => setActiveModule("finance")} />;
      case "finance":
        return <GTSFinanceCenterModule onBack={() => setActiveModule(null)} onNavigateToPartners={() => setActiveModule("partners")} />;
      case "documents":
        return <GTSDocumentsInboxModule onBack={() => setActiveModule(null)} />;
      case "cms":
        return <GTSCMSModule onBack={() => setActiveModule(null)} onNavigateToCRM={() => setActiveModule("crm")} />;
      case "corporate":
        return <GTSCorporateClientsModule onBack={() => setActiveModule(null)} />;
      case "concierge":
        return <GTSConciergeModule onBack={() => setActiveModule(null)} onNavigateToCRM={() => setActiveModule("crm")} />;
      default:
        return null;
    }
  };

  if (activeModule) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
        {renderModule()}
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
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              style={{ color: 'var(--gts-portal-text)' }}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              На главную
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Админ-портал GTS
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Централизованная панель управления
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
              <Input
                placeholder="Поиск модулей..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 w-64"
                style={{ 
                  backgroundColor: 'var(--gts-portal-card)',
                  borderColor: 'var(--gts-portal-border)',
                  color: 'var(--gts-portal-text)'
                }}
              />
            </div>
            <Button variant="ghost" size="sm">
              <Bell className="h-4 w-4" />
              <Badge variant="destructive" className="ml-1 px-1 text-xs">3</Badge>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Доходы сегодня</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽127K</p>
                </div>
                <div className="p-2 rounded-lg bg-emerald-500/10">
                  <DollarSign className="h-6 w-6 text-emerald-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Активные бронирования</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>23</p>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Calendar className="h-6 w-6 text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Новые лиды</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>8</p>
                </div>
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Users className="h-6 w-6 text-orange-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Оповещения</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>5</p>
                </div>
                <div className="p-2 rounded-lg bg-red-500/10">
                  <Bell className="h-6 w-6 text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Modules Grid */}
        <div>
          <h2 className="text-xl font-heading mb-6" style={{ color: 'var(--gts-portal-text)' }}>
            Модули управления
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <Card
                key={module.id}
                className="cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-lg"
                style={{ 
                  backgroundColor: 'var(--gts-portal-surface)', 
                  borderColor: 'var(--gts-portal-border)' 
                }}
                onClick={() => module.id !== "concierge" && setActiveModule(module.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-3 rounded-lg ${module.bgColor}`}>
                      <span className={module.color}>{module.icon}</span>
                    </div>
                    {module.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {module.badge}
                      </Badge>
                    )}
                  </div>
                  <div className="space-y-1">
                    <CardTitle className="text-lg" style={{ color: 'var(--gts-portal-text)' }}>
                      {module.title}
                    </CardTitle>
                    <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                      {module.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    {Object.entries(module.stats).map(([key, value]) => (
                      <div key={key}>
                        <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                          {value}
                        </p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                          {key === 'leads' ? 'лиды' : key === 'deals' ? 'сделки' : key === 'clients' ? 'клиенты' : 
                           key === 'today' ? 'сегодня' : key === 'week' ? 'неделя' : key === 'month' ? 'месяц' :
                           key === 'active' ? 'активно' : key === 'roles' ? 'роли' : key === 'pending' ? 'ожидание' :
                           key === 'agents' ? 'агенты' : key === 'contractors' ? 'подрядчики' : key === 'brands' ? 'бренды' :
                           key === 'revenue' ? 'доходы' : key === 'margin' ? 'маржа' : key === 'payouts' ? 'выплаты' :
                           key === 'docs' ? 'документы' : key === 'alerts' ? 'оповещения' : key === 'tickets' ? 'тикеты' :
                           key === 'posts' ? 'посты' : key === 'offers' ? 'предложения' : 
                           key === 'companies' ? 'компании' : key === 'packages' ? 'пакеты' : key === 'acts' ? 'акты' :
                           key === 'requests' ? 'запросы' : key === 'completed' ? 'выполнено' : key}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8" style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
          <CardHeader>
            <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Последняя активность</CardTitle>
            <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
              Последние события системы и уведомления
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: "booking", message: "Создано новое бронирование #BK-2024-001", time: "2 мин назад", icon: Calendar },
                { type: "lead", message: "Высокоценный лид конвертирован в сделку", time: "5 мин назад", icon: Users },
                { type: "alert", message: "Требуется продление лицензии для Вертолёта R44", time: "15 мин назад", icon: Bell },
                { type: "finance", message: "Обработана выплата партнёру: ₽45,000", time: "1 час назад", icon: DollarSign }
              ].map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <activity.icon className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{activity.message}</p>
                    <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{activity.time}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}