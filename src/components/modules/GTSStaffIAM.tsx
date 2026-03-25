import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Users,
  Calendar,
  Shield,
  Award,
  UserPlus,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Clock,
  Settings,
  CheckCircle,
  AlertTriangle,
  FileText
} from "lucide-react";

/**
 * 07_Staff_IAM - Управление персоналом и доступами
 * 
 * МИГРАЦИЯ: Объединяет все компоненты управления сотрудниками:
 * - [LEGACY] Таблицы сотрудников → Staff Tab
 * - [LEGACY] Управление сменами → Roster Tab  
 * - [LEGACY] Сертификаты и лицензии → Certificates Tab
 * - [LEGACY] Матрица ролей → Roles Tab
 * 
 * ✅ Централизованное управление персоналом
 * ✅ Расписание смен с детализацией
 * ✅ Отслеживание сертификатов и истечений
 * ✅ Матрица ролей и прав доступа
 */

interface GTSStaffIAMProps {
  onBackToHome: () => void;
  onAssignToCrew?: (staffData: any) => void;
}

const mockStaff = [
  {
    id: '1',
    name: 'Иван Петров',
    position: 'Капитан',
    email: 'i.petrov@gts.com',
    phone: '+7 (926) 123-45-67',
    department: 'Морской флот',
    status: 'active',
    hireDate: '2023-03-15',
    experience: '15 лет',
    rating: 4.9,
    currentShift: 'Дневная смена',
    nextShift: '15.02.2024 08:00',
    certifications: ['Капитан малого судна', 'Радиооператор', 'Первая помощь']
  },
  {
    id: '2',
    name: 'Алексей Сидоров',
    position: 'Инструктор по багги',
    email: 'a.sidorov@gts.com',
    phone: '+7 (903) 987-65-43',
    department: 'Экстремальный спорт',
    status: 'active',
    hireDate: '2023-07-20',
    experience: '8 лет',
    rating: 4.7,
    currentShift: 'Выходной',
    nextShift: '16.02.2024 10:00',
    certifications: ['Инструктор багги', 'Техническое обслуживание', 'Безопасность']
  },
  {
    id: '3',
    name: 'Андрей Козлов',
    position: 'Пилот вертолета',
    email: 'a.kozlov@gts.com',
    phone: '+7 (988) 555-77-88',
    department: 'Авиация',
    status: 'active',
    hireDate: '2022-11-10',
    experience: '12 лет',
    rating: 5.0,
    currentShift: 'Ожидание',
    nextShift: '15.02.2024 14:00',
    certifications: ['Коммерческий пилот', 'Авиационная медицина', 'Радиосвязь']
  }
];

const mockRoster = [
  {
    date: '2024-02-15',
    shifts: [
      {
        time: '08:00-16:00',
        staff: ['Иван Петров', 'Марина Волкова'],
        position: 'Морской флот',
        status: 'scheduled'
      },
      {
        time: '10:00-18:00',
        staff: ['Алексей Сидоров', 'Николай Морозов'],
        position: 'Инструкторы багги',
        status: 'scheduled'
      },
      {
        time: '14:00-20:00',
        staff: ['Андрей Козлов'],
        position: 'Пилот вертолета',
        status: 'scheduled'
      }
    ]
  }
];

const mockCertifications = [
  {
    id: '1',
    name: 'Капитан малого судна',
    category: 'Морские',
    validityPeriod: '5 лет',
    requiredFor: ['Капитан', 'Старший помощник'],
    expiringCount: 2,
    status: 'active'
  },
  {
    id: '2',
    name: 'Коммерческий пилот',
    category: 'Авиационные',
    validityPeriod: '2 года',
    requiredFor: ['Пилот вертолета'],
    expiringCount: 0,
    status: 'active'
  },
  {
    id: '3',
    name: 'Первая помощь',
    category: 'Медицинские',
    validityPeriod: '3 года',
    requiredFor: ['Все сотрудники'],
    expiringCount: 5,
    status: 'mandatory'
  }
];

const mockRoles = [
  {
    id: '1',
    name: 'Администратор',
    description: 'Полный доступ ко всем модулям системы',
    permissions: ['all'],
    usersCount: 2,
    level: 'system'
  },
  {
    id: '2',
    name: 'Менеджер',
    description: 'Управление бронированиями и клиентами',
    permissions: ['bookings', 'clients', 'calendar'],
    usersCount: 5,
    level: 'management'
  },
  {
    id: '3',
    name: 'Оператор',
    description: 'Диспетчерские функции и координация',
    permissions: ['operations', 'fleet', 'crew'],
    usersCount: 3,
    level: 'operational'
  },
  {
    id: '4',
    name: 'Экипаж',
    description: 'Мобильное приложение для сотрудников',
    permissions: ['mobile_app', 'schedules', 'reports'],
    usersCount: 15,
    level: 'field'
  }
];

export function GTSStaffIAM({ onBackToHome, onAssignToCrew }: GTSStaffIAMProps) {
  const [activeTab, setActiveTab] = useState('roster');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'inactive': return 'bg-gray-500';
      case 'vacation': return 'bg-blue-500';
      case 'sick': return 'bg-orange-500';
      case 'suspended': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'inactive': return 'Неактивен';
      case 'vacation': return 'Отпуск';
      case 'sick': return 'Больничный';
      case 'suspended': return 'Отстранен';
      default: return status;
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'system': return 'bg-red-500';
      case 'management': return 'bg-purple-500';
      case 'operational': return 'bg-blue-500';
      case 'field': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Header */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div>
              <h1 className="text-xl text-[--gts-portal-text]" style={{ fontFamily: 'var(--font-heading)' }}>
                Персонал и доступы
              </h1>
              <p className="text-sm text-[--gts-portal-muted]">
                Расписание • Сертификаты • Роли
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[--gts-portal-muted]" />
              <input
                type="text"
                placeholder="Поиск сотрудников..."
                className="w-64 pl-10 pr-4 py-2 bg-[--gts-portal-card] border border-[--gts-portal-border] rounded-lg text-[--gts-portal-text] placeholder:text-[--gts-portal-muted]"
              />
            </div>
            
            <Button
              className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
            >
              <UserPlus className="w-4 h-4 mr-2" />
              Новый сотрудник
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">{mockStaff.length}</div>
            <div className="text-sm text-[--gts-portal-muted]">Активных сотрудников</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">8</div>
            <div className="text-sm text-[--gts-portal-muted]">На смене сегодня</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold text-orange-500">7</div>
            <div className="text-sm text-[--gts-portal-muted]">Истекающих сертификатов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">{mockRoles.length}</div>
            <div className="text-sm text-[--gts-portal-muted]">Ролей доступа</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="roster" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Calendar className="w-4 h-4 mr-2" />
              Расписание
            </TabsTrigger>
            <TabsTrigger value="staff" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              Сотрудники
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Award className="w-4 h-4 mr-2" />
              Сертификаты
            </TabsTrigger>
            <TabsTrigger value="roles" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Роли и права
            </TabsTrigger>
          </TabsList>

          {/* Roster */}
          <TabsContent value="roster" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Расписание смен</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
                <Button
                  className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Новая смена
                </Button>
              </div>
            </div>

            {mockRoster.map((day, dayIndex) => (
              <Card key={dayIndex} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <h3 className="text-[--gts-portal-text] font-medium mb-4">
                  {new Date(day.date).toLocaleDateString('ru-RU', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </h3>
                
                <div className="space-y-4">
                  {day.shifts.map((shift, shiftIndex) => (
                    <div 
                      key={shiftIndex}
                      className="p-4 bg-[--gts-portal-card] rounded-lg border border-[--gts-portal-border]"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <div className="flex items-center gap-2 text-[--gts-portal-text] font-medium">
                              <Clock className="w-4 h-4" />
                              {shift.time}
                            </div>
                            <Badge variant="outline">{shift.position}</Badge>
                            <Badge className="bg-green-500 text-white">Запланировано</Badge>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-[--gts-portal-muted]" />
                            <span className="text-[--gts-portal-text]">
                              {shift.staff.join(', ')}
                            </span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                          >
                            <Eye className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            ))}
          </TabsContent>

          {/* Staff */}
          <TabsContent value="staff" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Сотрудники</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Добавить сотрудника
              </Button>
            </div>

            <div className="grid gap-4">
              {mockStaff.map((staff) => (
                <Card key={staff.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{staff.name[0]}</span>
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[--gts-portal-text] font-medium">{staff.name}</h3>
                          <Badge variant="outline" className="text-xs">{staff.position}</Badge>
                          <Badge className={`${getStatusColor(staff.status)} text-white text-xs`}>
                            {getStatusText(staff.status)}
                          </Badge>
                        </div>
                        <p className="text-sm text-[--gts-portal-muted] mb-1">{staff.department}</p>
                        <div className="flex items-center gap-4 text-sm text-[--gts-portal-muted]">
                          <span>📧 {staff.email}</span>
                          <span>📞 {staff.phone}</span>
                          <span>🎯 Опыт: {staff.experience}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-[--gts-portal-muted] space-y-1 mb-3">
                        <div className="flex items-center gap-1">
                          <span>⭐ Рейтинг: {staff.rating}</span>
                        </div>
                        <div>Смена: {staff.currentShift}</div>
                        <div>Следующая: {staff.nextShift}</div>
                        <div>Работает с: {new Date(staff.hireDate).toLocaleDateString('ru-RU')}</div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => onAssignToCrew && onAssignToCrew({
                            staffId: staff.id,
                            staffName: staff.name,
                            position: staff.position,
                            department: staff.department,
                            prefilledData: {
                              type: 'staff_assignment',
                              source: 'staff_iam',
                              experience: staff.experience,
                              certifications: staff.certifications
                            }
                          })}
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          Назначить
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Award className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Certifications */}
                  <div className="mt-4 pt-4 border-t border-[--gts-portal-border]">
                    <div className="text-sm text-[--gts-portal-muted] mb-2">Сертификаты:</div>
                    <div className="flex flex-wrap gap-2">
                      {staff.certifications.map((cert, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Certificates */}
          <TabsContent value="certificates" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Сертификаты и лицензии</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Добавить требование
              </Button>
            </div>

            <div className="grid gap-4">
              {mockCertifications.map((cert) => (
                <Card key={cert.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-[--gts-portal-text] font-medium">{cert.name}</h3>
                        <Badge variant="outline" className="text-xs">{cert.category}</Badge>
                        {cert.status === 'mandatory' && (
                          <Badge className="bg-red-500 text-white text-xs">Обязательно</Badge>
                        )}
                      </div>
                      
                      <div className="text-sm text-[--gts-portal-muted] space-y-1">
                        <div>Срок действия: {cert.validityPeriod}</div>
                        <div>Требуется для: {cert.requiredFor.join(', ')}</div>
                      </div>
                    </div>

                    <div className="text-right">
                      {cert.expiringCount > 0 && (
                        <div className="flex items-center gap-2 mb-2">
                          <AlertTriangle className="w-4 h-4 text-orange-500" />
                          <span className="text-orange-500 font-medium">
                            {cert.expiringCount} истекает
                          </span>
                        </div>
                      )}
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <FileText className="w-3 h-3 mr-1" />
                          Отчет
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Roles */}
          <TabsContent value="roles" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Роли и права доступа</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Новая роль
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mockRoles.map((role) => (
                <Card key={role.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${getLevelColor(role.level)}`}></div>
                      <h3 className="text-[--gts-portal-text] font-medium">{role.name}</h3>
                    </div>
                    <div className="text-lg text-[--gts-portal-text] font-semibold">
                      {role.usersCount}
                    </div>
                  </div>
                  
                  <p className="text-sm text-[--gts-portal-muted] mb-4">{role.description}</p>
                  
                  <div className="text-xs text-[--gts-portal-muted] mb-4">
                    <strong>Права:</strong> {role.permissions.join(', ')}
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                    >
                      <Users className="w-3 h-3 mr-1" />
                      Пользователи
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                    >
                      <Settings className="w-3 h-3 mr-1" />
                      Настройки
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}