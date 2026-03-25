import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { GTSPartnerPersonalCabinet } from "./modules/GTSPartnerPersonalCabinet";
import { 
  DollarSign,
  Users,
  Calendar,
  TrendingUp,
  Building,
  Truck,
  BarChart3,
  Star,
  Target,
  Settings,
  Download,
  Eye,
  ExternalLink
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSPartnerPortalUnifiedProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

const getRoleSpecificData = (role: string) => {
  switch (role) {
    case 'partner-agent':
      return {
        title: 'Агент Партнер',
        description: 'Панель управления продажами',
        icon: Users,
        color: 'from-green-600 to-green-700',
        metrics: [
          { label: 'Лиды этот месяц', value: '47', change: '+12%' },
          { label: 'Конверсия в продажи', value: '23%', change: '+3%' },
          { label: 'Комиссия к выплате', value: '₽184,500', change: '+18%' },
          { label: 'Рейтинг агента', value: '4.8', change: '+0.2' }
        ],
        tabs: ['leads', 'bookings', 'commissions', 'payouts', 'tools']
      };
    case 'partner-contractor':
      return {
        title: 'Подрядчик',
        description: 'Управление ресурсами и бронированиями',
        icon: Truck,
        color: 'from-orange-600 to-orange-700',
        metrics: [
          { label: 'Загрузка флота', value: '87%', change: '+5%' },
          { label: 'Активные ресурсы', value: '12', change: '0' },
          { label: 'Доход за месяц', value: '₽1,250,000', change: '+15%' },
          { label: 'Рейтинг качества', value: '4.9', change: '+0.1' }
        ],
        tabs: ['resources', 'bookings', 'utilization', 'payouts', 'maintenance']
      };
    case 'partner-brand':
      return {
        title: 'Бренд Партнер',
        description: 'Кросс-промо и программы лояльности',
        icon: Building,
        color: 'from-purple-600 to-purple-700',
        metrics: [
          { label: 'Показы промо', value: '125,400', change: '+22%' },
          { label: 'Переходы по QR', value: '3,847', change: '+35%' },
          { label: 'Бонусы начислены', value: '₽47,500', change: '+8%' },
          { label: 'ROI кампаний', value: '340%', change: '+45%' }
        ],
        tabs: ['promotions', 'loyalty', 'analytics', 'api', 'tools']
      };
    default:
      return {
        title: 'Партнер',
        description: 'Партнерская панель',
        icon: Building,
        color: 'from-blue-600 to-blue-700',
        metrics: [],
        tabs: []
      };
  }
};

export function GTSPartnerPortalUnified({ user, onLogout, onBackToHome }: GTSPartnerPortalUnifiedProps) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const roleData = getRoleSpecificData(user.role);
  const IconComponent = roleData.icon;

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Unified Admin Header */}
      <GTSUnifiedAdminHeader
        user={user}
        currentRole={roleData.title}
        currentPage="Партнерский портал"
        notificationCount={5}
        onSearch={(query) => console.log('Search:', query)}
        onLogin={() => console.log('Login clicked')}
        onLogout={onLogout}
        onBackToHome={onBackToHome}
      />
      
      {/* Role Badge */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${roleData.color} flex items-center justify-center`}>
            <IconComponent className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[--gts-portal-text] font-medium">{roleData.title}</div>
            <div className="text-sm text-[--gts-portal-muted]">{roleData.description}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="dashboard" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <BarChart3 className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
            {user.role === 'partner-agent' && (
              <>
                <TabsTrigger value="leads" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <Users className="w-4 h-4 mr-2" />
                  Лиды
                </TabsTrigger>
                <TabsTrigger value="commissions" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Комиссии
                </TabsTrigger>
              </>
            )}
            {user.role === 'partner-contractor' && (
              <>
                <TabsTrigger value="resources" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <Truck className="w-4 h-4 mr-2" />
                  Ресурсы
                </TabsTrigger>
                <TabsTrigger value="utilization" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Загрузка
                </TabsTrigger>
              </>
            )}
            {user.role === 'partner-brand' && (
              <>
                <TabsTrigger value="promotions" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <Target className="w-4 h-4 mr-2" />
                  Промо
                </TabsTrigger>
                <TabsTrigger value="loyalty" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
                  <Star className="w-4 h-4 mr-2" />
                  Лояльность
                </TabsTrigger>
              </>
            )}
            <TabsTrigger value="cabinet" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Личный кабинет
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {roleData.metrics.map((metric, index) => (
                <Card key={index} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[--gts-portal-muted] text-sm">{metric.label}</p>
                      <p className="text-2xl text-[--gts-portal-text] font-semibold mt-1">{metric.value}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <TrendingUp className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500">{metric.change}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Recent Activity */}
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl text-[--gts-portal-text]">Последняя активность</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Подробнее
                </Button>
              </div>

              <div className="space-y-4">
                {user.role === 'partner-agent' && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">Новый лид: Андрей Смирнов</div>
                        <div className="text-sm text-[--gts-portal-muted]">Интересуется прогулкой на катере • 2 часа назад</div>
                      </div>
                      <Badge className="bg-blue-500 text-white">Новый</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">Сделка закрыта: ₽45,000</div>
                        <div className="text-sm text-[--gts-portal-muted]">Комиссия ₽6,750 • 5 часов назад</div>
                      </div>
                      <Badge className="bg-green-500 text-white">Успех</Badge>
                    </div>
                  </>
                )}
                
                {user.role === 'partner-contractor' && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">Бронирование: Yamaha 252S #001</div>
                        <div className="text-sm text-[--gts-portal-muted]">Завтра 10:00-13:00 • 3 часа назад</div>
                      </div>
                      <Badge className="bg-blue-500 text-white">Новое</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">Техосмотр завершен</div>
                        <div className="text-sm text-[--gts-portal-muted]">Honda Talon #003 готов к работе • 6 часов назад</div>
                      </div>
                      <Badge className="bg-green-500 text-white">Готов</Badge>
                    </div>
                  </>
                )}
                
                {user.role === 'partner-brand' && (
                  <>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">Кампания запущена</div>
                        <div className="text-sm text-[--gts-portal-muted]">Летняя промо-акция • 1 час назад</div>
                      </div>
                      <Badge className="bg-green-500 text-white">Активна</Badge>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-[--gts-portal-card] rounded-lg">
                      <div>
                        <div className="text-[--gts-portal-text] font-medium">QR-код сгенерирован</div>
                        <div className="text-sm text-[--gts-portal-muted]">Для ресторана "Морской бриз" • 3 часа назад</div>
                      </div>
                      <Badge className="bg-blue-500 text-white">Готов</Badge>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Быстрые действия</h3>
                <div className="space-y-3">
                  {user.role === 'partner-agent' && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Добавить лид
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Создать бронирование
                      </Button>
                    </>
                  )}
                  
                  {user.role === 'partner-contractor' && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Truck className="w-4 h-4 mr-2" />
                        Добавить ресурс
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Settings className="w-4 h-4 mr-2" />
                        Техосмотр
                      </Button>
                    </>
                  )}
                  
                  {user.role === 'partner-brand' && (
                    <>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Target className="w-4 h-4 mr-2" />
                        Новая промо
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Генериро��ать QR
                      </Button>
                    </>
                  )}
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Финансы</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[--gts-portal-muted]">К выплате</span>
                    <span className="text-[--gts-portal-text] font-medium">₽184,500</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[--gts-portal-muted]">За этот месяц</span>
                    <span className="text-[--gts-portal-text] font-medium">₽347,200</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Скачать отчет
                  </Button>
                </div>
              </Card>

              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">Поддержка</h3>
                <div className="space-y-3">
                  <div className="text-sm text-[--gts-portal-muted]">
                    Нужна помощь? Свяжитесь с нашей службой поддержки
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="w-full border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                  >
                    Открыть тикет
                  </Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Personal Cabinet */}
          <TabsContent value="cabinet" className="space-y-6">
            <GTSPartnerPersonalCabinet 
              partnerId={user.id} 
              partnerType={
                user.role === 'partner-agent' ? 'agent' : 
                user.role === 'partner-contractor' ? 'contractor' : 
                'brand-partner'
              } 
            />
          </TabsContent>

          {/* Other tabs content */}
          {activeTab !== 'dashboard' && activeTab !== 'cabinet' && (
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-8 text-center">
              <div className="text-[--gts-portal-muted] mb-4">
                <Settings className="w-16 h-16 mx-auto mb-4 opacity-50" />
              </div>
              <h2 className="text-xl text-[--gts-portal-text] mb-2">
                Раздел "{activeTab}" в разработке
              </h2>
              <p className="text-[--gts-portal-muted]">
                Этот раздел будет доступен в следующих обновлениях системы
              </p>
            </Card>
          )}
        </Tabs>
      </div>
    </div>
  );
}