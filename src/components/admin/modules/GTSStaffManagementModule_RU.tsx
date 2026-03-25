import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  User,
  Calendar,
  Award,
  FileText,
  Settings,
  Eye,
  Edit,
  Trash2,
  Download,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  Users,
  Shield,
  Clock
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Switch } from "../../ui/switch";

interface GTSStaffManagementModuleRUProps {
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

export function GTSStaffManagementModule({ onBack, onNavigateToCalendar }: GTSStaffManagementModuleRUProps) {
  const [activeTab, setActiveTab] = useState("staff");
  const [selectedStaff, setSelectedStaff] = useState<string | null>(null);

  const roles = [
    { id: "operator", name: "Оператор", permissions: ["просмотр_бронирований", "редактирование_бронирований"], count: 3 },
    { id: "dispatcher", name: "Диспетчер", permissions: ["просмотр_всего", "назначение_ресурсов"], count: 2 },
    { id: "site_admin", name: "Администратор площадки", permissions: ["просмотр_всего", "редактирование_всего", "управление_персоналом"], count: 1 },
    { id: "captain", name: "Капитан", permissions: ["просмотр_бронирований", "проверка_безопасности"], count: 4 },
    { id: "pilot", name: "Пилот", permissions: ["просмотр_бронирований", "полётные_операции"], count: 2 },
    { id: "guide", name: "Гид", permissions: ["просмотр_бронирований", "поддержка_клиентов"], count: 3 },
    { id: "mechanic", name: "Механик", permissions: ["просмотр_флота", "техобслуживание"], count: 2 },
    { id: "support", name: "Поддержка", permissions: ["просмотр_клиентов", "коммуникации"], count: 2 },
    { id: "marketing", name: "Маркетинг", permissions: ["просмотр_аналитики", "управление_контентом"], count: 1 },
    { id: "finance", name: "Финансы", permissions: ["просмотр_финансов", "отчёты"], count: 1 },
    { id: "executive", name: "Руководство", permissions: ["просмотр_всего", "стратегические"], count: 1 },
    { id: "sysadmin", name: "Системный администратор", permissions: ["все_права"], count: 1 }
  ];

  const staff = [
    {
      id: "staff-001",
      name: "Алексей Петров",
      role: "captain",
      email: "a.petrov@gts.ru",
      phone: "+7 905 123-45-67",
      status: "active",
      schedule: "Пн-Пт 9-18",
      kpi: { bookings: 45, rating: 4.8, onTime: 98 },
      certificates: ["Лицензия капитана", "Обучение безопасности", "Экстренное реагирование"],
      lastActive: "2 часа назад"
    },
    {
      id: "staff-002", 
      name: "Мария Волкова",
      role: "pilot",
      email: "m.volkova@gts.ru",
      phone: "+7 903 987-65-43",
      status: "active",
      schedule: "Вт-Сб 8-17",
      kpi: { flights: 67, rating: 4.9, safety: 100 },
      certificates: ["Коммерческий пилот", "Robinson R44", "Горные полёты"],
      lastActive: "30 мин назад"
    },
    {
      id: "staff-003",
      name: "Дмитрий Соколов",
      role: "guide",
      email: "d.sokolov@gts.ru",
      phone: "+7 902 555-44-33",
      status: "off_duty",
      schedule: "Ср-Вс 10-19",
      kpi: { tours: 89, rating: 4.7, tips: 15000 },
      certificates: ["Экскурсовод", "Первая помощь", "Местная история"],
      lastActive: "1 день назад"
    },
    {
      id: "staff-004",
      name: "Виктор Кузнецов",
      role: "mechanic",
      email: "v.kuznetsov@gts.ru", 
      phone: "+7 901 777-88-99",
      status: "active",
      schedule: "Пн-Пт 7-16",
      kpi: { repairs: 234, efficiency: 96, downtime: 2 },
      certificates: ["Морской механик", "Авиационное ТО", "Инспектор безопасности"],
      lastActive: "1 час назад"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500",
      off_duty: "bg-yellow-500",
      inactive: "bg-red-500",
      pending: "bg-blue-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getRoleColor = (role: string) => {
    const colors = {
      captain: "text-blue-400",
      pilot: "text-purple-400",
      guide: "text-green-400",
      mechanic: "text-orange-400",
      operator: "text-cyan-400",
      dispatcher: "text-pink-400",
      support: "text-yellow-400"
    };
    return colors[role as keyof typeof colors] || "text-gray-400";
  };

  const getRoleDisplayName = (role: string) => {
    const names = {
      captain: "Капитан",
      pilot: "Пилот", 
      guide: "Гид",
      mechanic: "Механик",
      operator: "Оператор",
      dispatcher: "Диспетчер",
      support: "Поддержка"
    };
    return names[role as keyof typeof names] || role;
  };

  const getStatusDisplayName = (status: string) => {
    const names = {
      active: "активен",
      off_duty: "не на смене",
      inactive: "неактивен",
      pending: "ожидание"
    };
    return names[status as keyof typeof names] || status;
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--gts-portal-surface)', 
        borderColor: 'var(--gts-portal-border)' 
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--gts-portal-text)' }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Управление персоналом
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Управление сотрудниками, ролями, правами доступа и эффективностью
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCalendar}
              variant="outline"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Расписание
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Добавить сотрудника
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Всего сотрудников</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>24</p>
                </div>
                <Users className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Активны сейчас</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>18</p>
                </div>
                <Shield className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Средний рейтинг</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>4.8</p>
                </div>
                <Award className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Ожидает действий</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>3</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="staff">Справочник сотрудников</TabsTrigger>
            <TabsTrigger value="roles">Роли и права</TabsTrigger>
            <TabsTrigger value="performance">Эффективность</TabsTrigger>
            <TabsTrigger value="certificates">Сертификаты</TabsTrigger>
          </TabsList>

          {/* Staff Directory Tab */}
          <TabsContent value="staff" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Сотрудники</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Поиск сотрудников..." className="w-64" />
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {staff.map(member => (
                        <div 
                          key={member.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedStaff(member.id)}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{member.name}</h4>
                              <p className={`text-sm font-medium ${getRoleColor(member.role)}`}>
                                {getRoleDisplayName(member.role)}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                Активность: {member.lastActive}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <Badge className={`${getStatusColor(member.status)} text-white text-xs`}>
                                {getStatusDisplayName(member.status)}
                              </Badge>
                              <p className="text-xs mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                                {member.schedule}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onNavigateToCalendar();
                                }}
                              >
                                <Calendar className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Staff Profile */}
              {selectedStaff && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Профиль сотрудника</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {staff.find(s => s.id === selectedStaff) && (
                      <div className="space-y-4">
                        {(() => {
                          const member = staff.find(s => s.id === selectedStaff)!;
                          return (
                            <>
                              <div className="text-center">
                                <Avatar className="h-16 w-16 mx-auto mb-2">
                                  <AvatarFallback className="text-lg">
                                    {member.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                  {member.name}
                                </h3>
                                <p className={`text-sm font-medium ${getRoleColor(member.role)}`}>
                                  {getRoleDisplayName(member.role)}
                                </p>
                              </div>
                              
                              <div className="space-y-3">
                                <div>
                                  <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Контакты</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{member.email}</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{member.phone}</p>
                                </div>
                                
                                <div>
                                  <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Расписание</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{member.schedule}</p>
                                </div>

                                <div>
                                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>KPI</p>
                                  <div className="space-y-2">
                                    {Object.entries(member.kpi).map(([key, value]) => (
                                      <div key={key} className="flex justify-between">
                                        <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                          {key === 'bookings' ? 'Бронирования' :
                                           key === 'rating' ? 'Рейтинг' :
                                           key === 'onTime' ? 'Вовремя' :
                                           key === 'flights' ? 'Полёты' :
                                           key === 'safety' ? 'Безопасность' :
                                           key === 'tours' ? 'Туры' :
                                           key === 'tips' ? 'Чаевые' :
                                           key === 'repairs' ? 'Ремонты' :
                                           key === 'efficiency' ? 'Эффективность' :
                                           key === 'downtime' ? 'Простой' : key}
                                        </span>
                                        <span className="text-xs font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                          {value}{key === 'rating' || key === 'safety' ? '' : key === 'onTime' || key === 'efficiency' ? '%' : key === 'tips' ? '₽' : ''}
                                        </span>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Сертификаты</p>
                                  <div className="space-y-1">
                                    {member.certificates.map((cert, index) => (
                                      <Badge key={index} variant="secondary" className="text-xs mr-1 mb-1">
                                        {cert}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </>
                          );
                        })()}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Roles & Permissions Tab */}
          <TabsContent value="roles" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Роли и права доступа</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Управление ролями и назначенными правами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {roles.map(role => (
                    <Card 
                      key={role.id}
                      style={{ backgroundColor: 'var(--gts-portal-card)', borderColor: 'var(--gts-portal-border)' }}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{role.name}</h4>
                          <Badge variant="secondary" className="text-xs">
                            {role.count} сотр.
                          </Badge>
                        </div>
                        <p className="text-xs mb-2" style={{ color: 'var(--gts-portal-muted)' }}>
                          {role.permissions.length} прав доступа
                        </p>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-6">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {staff.map(member => (
                  <Card 
                    key={member.id}
                    style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3 mb-4">
                        <Avatar>
                          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{member.name}</h4>
                          <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{getRoleDisplayName(member.role)}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {Object.entries(member.kpi).map(([key, value]) => (
                          <div key={key}>
                            <div className="flex justify-between text-sm mb-1">
                              <span style={{ color: 'var(--gts-portal-muted)' }}>
                                {key === 'bookings' ? 'Бронирования' :
                                 key === 'rating' ? 'Рейтинг' :
                                 key === 'onTime' ? 'Вовремя' :
                                 key === 'flights' ? 'Полёты' :
                                 key === 'safety' ? 'Безопасность' :
                                 key === 'tours' ? 'Туры' :
                                 key === 'tips' ? 'Чаевые' :
                                 key === 'repairs' ? 'Ремонты' :
                                 key === 'efficiency' ? 'Эффективность' :
                                 key === 'downtime' ? 'Простой' : key}
                              </span>
                              <span style={{ color: 'var(--gts-portal-text)' }}>
                                {value}{['rating', 'safety', 'onTime', 'efficiency'].includes(key) && key !== 'rating' ? '%' : key === 'tips' ? '₽' : ''}
                              </span>
                            </div>
                            <Progress 
                              value={key === 'rating' ? (value as number) * 20 : 
                                     typeof value === 'number' && value <= 100 ? value : 
                                     typeof value === 'number' ? Math.min(value / 10, 100) : 0} 
                              className="h-2" 
                            />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Управление сертификатами</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Отслеживание сертификатов сотрудников и дат продления
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { staff: "Алексей Петров", cert: "Лицензия капитана", expires: "2025-06-15", status: "действует" },
                    { staff: "Мария Волкова", cert: "Коммерческий пилот", expires: "2024-12-30", status: "истекает" },
                    { staff: "Виктор Кузнецов", cert: "Авиационное ТО", expires: "2025-03-20", status: "действует" },
                    { staff: "Дмитрий Соколов", cert: "Первая помощь", expires: "2024-11-15", status: "истёк" }
                  ].map((cert, index) => (
                    <div 
                      key={index}
                      className="flex items-center justify-between p-4 rounded-lg"
                      style={{ backgroundColor: 'var(--gts-portal-card)' }}
                    >
                      <div>
                        <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{cert.cert}</h4>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{cert.staff}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>Истекает: {cert.expires}</p>
                          <Badge 
                            className={
                              cert.status === 'действует' ? 'bg-green-500 text-white' :
                              cert.status === 'истекает' ? 'bg-yellow-500 text-white' :
                              'bg-red-500 text-white'
                            }
                          >
                            {cert.status}
                          </Badge>
                        </div>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}