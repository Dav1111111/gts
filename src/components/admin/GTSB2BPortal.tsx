import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSUnifiedAdminHeader } from "../shell/GTSUnifiedAdminHeader";
import { 
  Building,
  FileText,
  Calendar,
  Users,
  DollarSign,
  Settings,
  Download,
  Upload,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  AlertCircle,
  Phone,
  Mail,
  MapPin
} from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
  permissions: string[];
}

interface GTSB2BPortalProps {
  user: User;
  onLogout: () => void;
  onBackToHome: () => void;
}

const companyProfile = {
  name: 'ООО "Технологии Будущего"',
  inn: '7743013901',
  kpp: '774301001',
  address: 'г. Москва, ул. Тверская, д. 15, офис 200',
  phone: '+7 (495) 123-45-67',
  email: 'info@techfuture.ru',
  contactPerson: 'Александр Петров',
  position: 'Генеральный директор',
  manager: 'Елена Сидорова',
  managerPhone: '+7 (988) 123-45-67',
  contractNumber: 'GTS-B2B-2024-001',
  contractDate: '2024-01-15',
  paymentTerms: '14 дней',
  discount: '15%'
};

const bookingRequests = [
  {
    id: '1',
    title: 'Корпоративное мероприятие',
    type: 'Катер + Банкет',
    date: '2024-02-20',
    time: '14:00',
    participants: 25,
    budget: 150000,
    status: 'pending',
    description: 'Празднование дня рождения компании для сотрудников и партнеров',
    created: '2024-01-28'
  },
  {
    id: '2',
    title: 'Деловая прогулка с партнерами',
    type: 'Вертолет',
    date: '2024-02-15',
    time: '10:00',
    participants: 4,
    budget: 200000,
    status: 'approved',
    description: 'VIP прогулка для переговоров с китайскими партнерами',
    created: '2024-01-25'
  },
  {
    id: '3',
    title: 'Тимбилдинг отдела продаж',
    type: 'Багги + Обед',
    date: '2024-02-10',
    time: '12:00',
    participants: 12,
    budget: 80000,
    status: 'completed',
    description: 'Активный отдых для команды продаж',
    created: '2024-01-20'
  }
];

const invoices = [
  {
    id: 'INV-2024-001',
    date: '2024-01-28',
    amount: 127500,
    status: 'paid',
    service: 'Корпоративная прогулка на катере',
    dueDate: '2024-02-11',
    paidDate: '2024-02-05'
  },
  {
    id: 'INV-2024-002',
    date: '2024-01-25',
    amount: 170000,
    status: 'pending',
    service: 'VIP вертолетная экскурсия',
    dueDate: '2024-02-08',
    paidDate: null
  },
  {
    id: 'INV-2024-003',
    date: '2024-01-20',
    amount: 68000,
    status: 'overdue',
    service: 'Тимбилдинг на багги',
    dueDate: '2024-02-03',
    paidDate: null
  }
];

export function GTSB2BPortal({ user, onLogout, onBackToHome }: GTSB2BPortalProps) {
  const [activeTab, setActiveTab] = useState('profile');
  const [showNewRequest, setShowNewRequest] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500';
      case 'approved': return 'bg-green-500';
      case 'completed': return 'bg-blue-500';
      case 'paid': return 'bg-green-500';
      case 'overdue': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'На рассмотрении';
      case 'approved': return 'Одобрено';
      case 'completed': return 'Завершено';
      case 'paid': return 'Оплачено';
      case 'overdue': return 'Просрочено';
      default: return status;
    }
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Unified Admin Header */}
      <GTSUnifiedAdminHeader
        user={user}
        currentRole="B2B Клиент"
        currentPage="Корпоративные услуги"
        notificationCount={4}
        onSearch={(query) => console.log('Search:', query)}
        onLogin={() => console.log('Login clicked')}
        onLogout={onLogout}
        onBackToHome={onBackToHome}
      />
      
      {/* Company Info Bar */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center">
            <Building className="w-4 h-4 text-white" />
          </div>
          <div>
            <div className="text-[--gts-portal-text] font-medium">{companyProfile.name}</div>
            <div className="text-sm text-[--gts-portal-muted]">{companyProfile.contactPerson} • {companyProfile.position}</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="profile" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Building className="w-4 h-4 mr-2" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="requests" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Заявки
            </TabsTrigger>
            <TabsTrigger value="invoices" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Счета
            </TabsTrigger>
            <TabsTrigger value="events" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Мероприятия
            </TabsTrigger>
            <TabsTrigger value="settings" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Настройки
            </TabsTrigger>
          </TabsList>

          {/* Company Profile */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl text-[--gts-portal-text]">Профиль компании</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Редактировать
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[--gts-portal-muted] block mb-1">Название компании</label>
                    <p className="text-[--gts-portal-text] font-medium">{companyProfile.name}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">ИНН</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.inn}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">КПП</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.kpp}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-[--gts-portal-muted] block mb-1">Адрес</label>
                    <p className="text-[--gts-portal-text]">{companyProfile.address}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">Телефон</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.phone}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">Email</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.email}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-[--gts-portal-muted] block mb-1">Контактное лицо</label>
                    <p className="text-[--gts-portal-text] font-medium">{companyProfile.contactPerson}</p>
                    <p className="text-sm text-[--gts-portal-muted]">{companyProfile.position}</p>
                  </div>
                  
                  <div>
                    <label className="text-sm text-[--gts-portal-muted] block mb-1">Персональный менеджер</label>
                    <p className="text-[--gts-portal-text] font-medium">{companyProfile.manager}</p>
                    <p className="text-sm text-[--gts-portal-muted]">{companyProfile.managerPhone}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">Договор №</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.contractNumber}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">От</label>
                      <p className="text-[--gts-portal-text]">{new Date(companyProfile.contractDate).toLocaleDateString('ru-RU')}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">Условия оплаты</label>
                      <p className="text-[--gts-portal-text]">{companyProfile.paymentTerms}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[--gts-portal-muted] block mb-1">Корпоративная скидка</label>
                      <p className="text-green-500 font-medium">{companyProfile.discount}</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">12</div>
                  <div className="text-sm text-[--gts-portal-muted]">Мероприятий проведено</div>
                </div>
              </Card>
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">₽847K</div>
                  <div className="text-sm text-[--gts-portal-muted]">Общая сумма заказов</div>
                </div>
              </Card>
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">127K</div>
                  <div className="text-sm text-[--gts-portal-muted]">Сэкономлено</div>
                </div>
              </Card>
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">98%</div>
                  <div className="text-sm text-[--gts-portal-muted]">Удовлетворенность</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Booking Requests */}
          <TabsContent value="requests" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Заявки на бронирование</h2>
              <Button
                onClick={() => setShowNewRequest(true)}
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Новая заявка
              </Button>
            </div>

            <div className="space-y-4">
              {bookingRequests.map((request) => (
                <Card key={request.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="text-[--gts-portal-text] font-medium">{request.title}</h3>
                      <p className="text-sm text-[--gts-portal-muted]">{request.type}</p>
                    </div>
                    <Badge className={`${getStatusColor(request.status)} text-white`}>
                      {getStatusText(request.status)}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3">
                    <div className="flex items-center gap-2 text-sm text-[--gts-portal-muted]">
                      <Calendar className="w-4 h-4" />
                      {new Date(request.date).toLocaleDateString('ru-RU')} в {request.time}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[--gts-portal-muted]">
                      <Users className="w-4 h-4" />
                      {request.participants} участников
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[--gts-portal-muted]">
                      <DollarSign className="w-4 h-4" />
                      ₽{request.budget.toLocaleString()}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[--gts-portal-muted]">
                      <Clock className="w-4 h-4" />
                      Создано {new Date(request.created).toLocaleDateString('ru-RU')}
                    </div>
                  </div>

                  <p className="text-sm text-[--gts-portal-muted] mb-3">{request.description}</p>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                    >
                      <Eye className="w-3 h-3 mr-1" />
                      Подробнее
                    </Button>
                    {request.status === 'pending' && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                      >
                        <Edit className="w-3 h-3 mr-1" />
                        Изменить
                      </Button>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Invoices */}
          <TabsContent value="invoices" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Счета и акты</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Загрузить документы
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Скачать отчет
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              {invoices.map((invoice) => (
                <Card key={invoice.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[--gts-portal-text] font-medium">{invoice.id}</h3>
                      <p className="text-sm text-[--gts-portal-muted] mb-2">{invoice.service}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="text-[--gts-portal-muted]">Дата выставления:</span>
                          <span className="text-[--gts-portal-text] ml-2">{new Date(invoice.date).toLocaleDateString('ru-RU')}</span>
                        </div>
                        <div>
                          <span className="text-[--gts-portal-muted]">Срок оплаты:</span>
                          <span className="text-[--gts-portal-text] ml-2">{new Date(invoice.dueDate).toLocaleDateString('ru-RU')}</span>
                        </div>
                        {invoice.paidDate && (
                          <div>
                            <span className="text-[--gts-portal-muted]">Дата оплаты:</span>
                            <span className="text-[--gts-portal-text] ml-2">{new Date(invoice.paidDate).toLocaleDateString('ru-RU')}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl text-[--gts-portal-text] font-semibold mb-2">
                        ₽{invoice.amount.toLocaleString()}
                      </div>
                      <Badge className={`${getStatusColor(invoice.status)} text-white mb-3`}>
                        {getStatusText(invoice.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Download className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Events */}
          <TabsContent value="events" className="space-y-6">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] text-lg mb-4">Координация мероприятий</h3>
              <div className="text-center text-[--gts-portal-muted] py-8">
                <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Инструменты координации мероприятий в разработке</p>
              </div>
            </Card>
          </TabsContent>

          {/* Settings */}
          <TabsContent value="settings" className="space-y-6">
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] text-lg mb-4">Настройки аккаунта</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-[--gts-portal-text] font-medium mb-3">Уведомления</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="text-[--gts-portal-accent]" />
                      <span className="text-[--gts-portal-text]">Email уведомления о статусе заявок</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="text-[--gts-portal-accent]" />
                      <span className="text-[--gts-portal-text]">SMS уведомления о счетах</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="text-[--gts-portal-accent]" />
                      <span className="text-[--gts-portal-text]">Еженедельные отчеты</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="text-[--gts-portal-text] font-medium mb-3">Контакты службы поддержки</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-[--gts-portal-muted]" />
                      <span className="text-[--gts-portal-text]">+7 (800) 123-45-67</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-4 h-4 text-[--gts-portal-muted]" />
                      <span className="text-[--gts-portal-text]">b2b@gts.com</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-[--gts-portal-muted]" />
                      <span className="text-[--gts-portal-text]">Пн-Пт 9:00-18:00</span>
                    </div>
                  </div>
                </div>

                <Button 
                  className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                >
                  Сохранить настройки
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* New Request Modal */}
      {showNewRequest && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[--gts-portal-text] text-lg font-medium">Новая заявка</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNewRequest(false)}
                  className="text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  ×
                </Button>
              </div>
              
              <div className="text-center text-[--gts-portal-muted] py-8">
                <Calendar className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Форма создания заявки в разработке</p>
                <Button
                  className="mt-4 bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                  onClick={() => setShowNewRequest(false)}
                >
                  Закрыть
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}