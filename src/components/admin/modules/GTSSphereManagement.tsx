import { useState, useMemo } from "react";
import { GTSUnifiedAdminHeader } from "../../shell/GTSUnifiedAdminHeader";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  MapPin,
  Users,
  Calendar,
  TrendingUp,
  Anchor,
  Plane,
  Car,
  User,
  Settings,
  ChevronLeft,
  CheckCircle,
  AlertCircle,
  Clock,
  Power
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";

// Types
type ResourceType = 'boat' | 'helicopter' | 'buggy' | 'staff';
type ResourceStatus = 'available' | 'in-use' | 'maintenance' | 'offline';
type UserRole = 'executive' | 'operator' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'partner';

interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  status: ResourceStatus;
  location: string;
  capacity: number;
  currentAssignment?: {
    bookingId: string;
    clientName: string;
    startTime: string;
    endTime: string;
    guide?: string;
  };
  lastMaintenance?: string;
  nextMaintenance?: string;
  specs: {
    [key: string]: string | number;
  };
  assignedStaff?: string[];
}

interface GTSSphereManagementProps {
  userRole: UserRole;
  onLogin: () => void;
  onBack?: () => void;
}

// Mock data
const mockResources: Resource[] = [
  {
    id: "boat-001",
    name: "Катер 'Морской Волк'",
    type: "boat",
    status: "in-use",
    location: "Пирс А1",
    capacity: 12,
    currentAssignment: {
      bookingId: "BK-2024-001",
      clientName: "Андрей Смирнов",
      startTime: "14:00",
      endTime: "18:00",
      guide: "Капитан Петров"
    },
    lastMaintenance: "2024-01-15",
    nextMaintenance: "2024-02-15",
    specs: {
      "Длина": "12м",
      "Двигатель": "Yamaha 300HP",
      "Год": 2023,
      "Тип": "Морской катер"
    },
    assignedStaff: ["staff-001", "staff-005"]
  },
  {
    id: "helicopter-001", 
    name: "Вертолёт Robinson R44",
    type: "helicopter",
    status: "available",
    location: "Площадка H1",
    capacity: 4,
    lastMaintenance: "2024-01-20",
    nextMaintenance: "2024-02-20",
    specs: {
      "Модель": "Robinson R44",
      "Год": 2022,
      "Дальность": "600км",
      "Тип": "Легкий вертолёт"
    },
    assignedStaff: ["staff-002"]
  },
  {
    id: "buggy-001",
    name: "Багги Polaris RZR",
    type: "buggy", 
    status: "maintenance",
    location: "Гараж Г2",
    capacity: 2,
    lastMaintenance: "2024-01-25",
    nextMaintenance: "2024-02-01",
    specs: {
      "Модель": "Polaris RZR XP 1000",
      "Двигатель": "1000cc",
      "Год": 2023,
      "Тип": "Спортивный багги"
    },
    assignedStaff: ["staff-003"]
  },
  {
    id: "staff-001",
    name: "Капитан Петров",
    type: "staff",
    status: "in-use",
    location: "Пирс А1",
    capacity: 1,
    specs: {
      "Специализация": "Морские экскурсии",
      "Опыт": "15 лет",
      "Лицензия": "Капитан дальнего плавания",
      "Языки": "Русский, Английский"
    }
  },
  {
    id: "staff-002",
    name: "Пилот Иванов",
    type: "staff",
    status: "available",
    location: "Площадка H1",
    capacity: 1,
    specs: {
      "Специализация": "Вертолётные туры",
      "Опыт": "12 лет",
      "Лицензия": "CPL(H)",
      "Языки": "Русский, Английский, Немецкий"
    }
  }
];

const resourceTypeIcons = {
  boat: Anchor,
  helicopter: Plane,
  buggy: Car,
  staff: User
};

const statusColors = {
  available: "bg-green-500/20 text-green-400 border-green-500/30",
  "in-use": "bg-blue-500/20 text-blue-400 border-blue-500/30", 
  maintenance: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
  offline: "bg-red-500/20 text-red-400 border-red-500/30"
};

const statusIcons = {
  available: CheckCircle,
  "in-use": Clock,
  maintenance: Settings,
  offline: Power
};

export function GTSSphereManagement({ userRole, onLogin, onBack }: GTSSphereManagementProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ResourceStatus | "all">("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

  // Role-based access control
  const canEdit = ['executive', 'operator'].includes(userRole);
  const canViewAll = ['executive', 'operator', 'partner'].includes(userRole);
  
  // Filter resources based on role
  const filteredResources = useMemo(() => {
    let resources = mockResources;
    
    // Role-based filtering
    if (userRole === 'captain') {
      resources = resources.filter(r => 
        r.type === 'boat' || 
        (r.type === 'staff' && r.id === 'staff-001') ||
        (r.assignedStaff?.includes('staff-001'))
      );
    } else if (userRole === 'pilot') {
      resources = resources.filter(r => 
        r.type === 'helicopter' || 
        (r.type === 'staff' && r.id === 'staff-002') ||
        (r.assignedStaff?.includes('staff-002'))
      );
    } else if (userRole === 'guide') {
      resources = resources.filter(r => 
        r.currentAssignment?.guide === 'Капитан Петров' ||
        r.assignedStaff?.includes('staff-004')
      );
    } else if (userRole === 'mechanic') {
      resources = resources.filter(r => r.status === 'maintenance');
    } else if (userRole === 'partner') {
      // Partners see only their assets
      resources = resources.filter(r => r.id.includes('partner'));
    }
    
    // Search filter
    if (searchQuery) {
      resources = resources.filter(r => 
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Type filter
    if (selectedType !== "all") {
      resources = resources.filter(r => r.type === selectedType);
    }
    
    // Status filter  
    if (selectedStatus !== "all") {
      resources = resources.filter(r => r.status === selectedStatus);
    }
    
    return resources;
  }, [searchQuery, selectedType, selectedStatus, userRole]);

  // Statistics
  const stats = useMemo(() => {
    const total = filteredResources.length;
    const available = filteredResources.filter(r => r.status === 'available').length;
    const inUse = filteredResources.filter(r => r.status === 'in-use').length;
    const maintenance = filteredResources.filter(r => r.status === 'maintenance').length;
    
    return { total, available, inUse, maintenance };
  }, [filteredResources]);

  if (selectedResource) {
    return <ResourceDetailView 
      resource={selectedResource} 
      canEdit={canEdit}
      onBack={() => setSelectedResource(null)}
      onLogin={onLogin}
      userRole={userRole}
    />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <GTSUnifiedAdminHeader
        currentRole="SphereM"
        currentPage="Управление ресурсами"
        onLogin={onLogin}
        onBackToHome={onBack}
      />
      
      <div className="p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-[#121214] p-2"
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
            )}
            <div>
              <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                SphereM Management
              </h1>
              <p className="text-[#A6A7AA] text-sm">Управление ресурсами и персоналом</p>
            </div>
          </div>
          
          {canEdit && (
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Добавить ресурс
            </Button>
          )}
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[#A6A7AA] text-sm">Всего ресурсов</p>
                <p className="text-white text-xl font-semibold">{stats.total}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-[#A6A7AA] text-sm">Доступно</p>
                <p className="text-white text-xl font-semibold">{stats.available}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-[#A6A7AA] text-sm">В работе</p>
                <p className="text-white text-xl font-semibold">{stats.inUse}</p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-yellow-400" />
              </div>
              <div>
                <p className="text-[#A6A7AA] text-sm">На ТО</p>
                <p className="text-white text-xl font-semibold">{stats.maintenance}</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-[#17181A] border-[#232428] p-4 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#A6A7AA]" />
                <Input
                  placeholder="Поиск ресурсов..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                />
              </div>
            </div>
            
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ResourceType | "all")}>
              <SelectTrigger className="w-full lg:w-48 bg-[#121214] border-[#232428] text-white">
                <SelectValue placeholder="Тип ресурса" />
              </SelectTrigger>
              <SelectContent className="bg-[#121214] border-[#232428]">
                <SelectItem value="all" className="text-white">Все типы</SelectItem>
                <SelectItem value="boat" className="text-white">Катера</SelectItem>
                <SelectItem value="helicopter" className="text-white">Вертолёты</SelectItem>
                <SelectItem value="buggy" className="text-white">Багги</SelectItem>
                <SelectItem value="staff" className="text-white">Персонал</SelectItem>
              </SelectContent>
            </Select>
            
            <Select value={selectedStatus} onValueChange={(value) => setSelectedStatus(value as ResourceStatus | "all")}>
              <SelectTrigger className="w-full lg:w-48 bg-[#121214] border-[#232428] text-white">
                <SelectValue placeholder="Статус" />
              </SelectTrigger>
              <SelectContent className="bg-[#121214] border-[#232428]">
                <SelectItem value="all" className="text-white">Все статусы</SelectItem>
                <SelectItem value="available" className="text-white">Доступно</SelectItem>
                <SelectItem value="in-use" className="text-white">В работе</SelectItem>
                <SelectItem value="maintenance" className="text-white">На ТО</SelectItem>
                <SelectItem value="offline" className="text-white">Отключен</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => {
            const IconComponent = resourceTypeIcons[resource.type];
            const StatusIcon = statusIcons[resource.status];
            
            return (
              <Card 
                key={resource.id}
                className="bg-[#17181A] border-[#232428] p-4 hover:border-[#91040C]/50 transition-colors cursor-pointer"
                onClick={() => setSelectedResource(resource)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#91040C]/20 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-[#91040C]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">{resource.name}</h3>
                      <p className="text-[#A6A7AA] text-sm">{resource.type === 'staff' ? 'Персонал' : resource.specs?.["Модель"] || resource.specs?.["Тип"]}</p>
                    </div>
                  </div>
                  
                  {canEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-[#A6A7AA] hover:text-white h-8 w-8 p-0">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#121214] border-[#232428]">
                        <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                          <Eye className="w-4 h-4 mr-2" />
                          Просмотр
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-white hover:bg-[#17181A]">
                          <Edit className="w-4 h-4 mr-2" />
                          Редактировать
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-[#232428]" />
                        <DropdownMenuItem className="text-red-400 hover:bg-red-500/20">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Удалить
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
                </div>
                
                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline" className={`${statusColors[resource.status]}`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {resource.status === 'available' ? 'Доступно' :
                       resource.status === 'in-use' ? 'В работе' :
                       resource.status === 'maintenance' ? 'На ТО' : 'Отключен'}
                    </Badge>
                    {resource.type !== 'staff' && (
                      <span className="text-[#A6A7AA] text-sm">
                        <Users className="w-3 h-3 inline mr-1" />
                        {resource.capacity}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-[#A6A7AA] text-sm">
                    <MapPin className="w-3 h-3 mr-1" />
                    {resource.location}
                  </div>
                  
                  {resource.currentAssignment && (
                    <div className="bg-[#121214] rounded-lg p-2 mt-2">
                      <p className="text-white text-sm font-medium">{resource.currentAssignment.clientName}</p>
                      <p className="text-[#A6A7AA] text-xs">
                        {resource.currentAssignment.startTime} - {resource.currentAssignment.endTime}
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
        
        {filteredResources.length === 0 && (
          <Card className="bg-[#17181A] border-[#232428] p-8 text-center">
            <div className="w-16 h-16 bg-[#A6A7AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#A6A7AA]" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Ресурсы не найдены</h3>
            <p className="text-[#A6A7AA]">Попробуйте изменить фильтры или поисковый запрос</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// Resource Detail View Component
function ResourceDetailView({ 
  resource, 
  canEdit, 
  onBack, 
  onLogin, 
  userRole 
}: { 
  resource: Resource; 
  canEdit: boolean; 
  onBack: () => void; 
  onLogin: () => void;
  userRole: UserRole;
}) {
  const IconComponent = resourceTypeIcons[resource.type];
  const StatusIcon = statusIcons[resource.status];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <GTSUnifiedAdminHeader
        currentRole="SphereM"
        currentPage={resource.name}
        onLogin={onLogin}
        onBackToHome={onBack}
      />
      
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-white hover:bg-[#121214] p-2"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
              {resource.name}
            </h1>
            <p className="text-[#A6A7AA] text-sm">Детальная информация о ресурсе</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-[#17181A] border-[#232428] p-6">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#91040C]/20 rounded-lg flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-[#91040C]" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-white">{resource.name}</h2>
                    <Badge variant="outline" className={`${statusColors[resource.status]} mt-2`}>
                      <StatusIcon className="w-3 h-3 mr-1" />
                      {resource.status === 'available' ? 'Доступно' :
                       resource.status === 'in-use' ? 'В работе' :
                       resource.status === 'maintenance' ? 'На ТО' : 'Отключен'}
                    </Badge>
                  </div>
                </div>
                
                {canEdit && (
                  <div className="flex gap-2">
                    <Button variant="outline" className="border-[#232428] text-white hover:bg-[#121214]">
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                    <Button variant="outline" className="border-red-500/30 text-red-400 hover:bg-red-500/20">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </Button>
                  </div>
                )}
              </div>
              
              <Tabs defaultValue="specs" className="w-full">
                <TabsList className="grid grid-cols-3 w-full bg-[#121214]">
                  <TabsTrigger value="specs" className="text-white data-[state=active]:bg-[#91040C]">
                    Характеристики
                  </TabsTrigger>
                  <TabsTrigger value="schedule" className="text-white data-[state=active]:bg-[#91040C]">
                    Расписание
                  </TabsTrigger>
                  <TabsTrigger value="maintenance" className="text-white data-[state=active]:bg-[#91040C]">
                    Обслуживание
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="specs" className="mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(resource.specs).map(([key, value]) => (
                      <div key={key} className="bg-[#121214] rounded-lg p-4">
                        <p className="text-[#A6A7AA] text-sm">{key}</p>
                        <p className="text-white font-medium">{value}</p>
                      </div>
                    ))}
                    <div className="bg-[#121214] rounded-lg p-4">
                      <p className="text-[#A6A7AA] text-sm">Вместимость</p>
                      <p className="text-white font-medium">{resource.capacity} {resource.type === 'staff' ? 'чел.' : 'мест'}</p>
                    </div>
                    <div className="bg-[#121214] rounded-lg p-4">
                      <p className="text-[#A6A7AA] text-sm">Местоположение</p>
                      <p className="text-white font-medium">{resource.location}</p>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="schedule" className="mt-4">
                  {resource.currentAssignment ? (
                    <div className="bg-[#121214] rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">Текущее назначение</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#A6A7AA]">Клиент:</span>
                          <span className="text-white">{resource.currentAssignment.clientName}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#A6A7AA]">Время:</span>
                          <span className="text-white">
                            {resource.currentAssignment.startTime} - {resource.currentAssignment.endTime}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#A6A7AA]">Бронь №:</span>
                          <span className="text-white">{resource.currentAssignment.bookingId}</span>
                        </div>
                        {resource.currentAssignment.guide && (
                          <div className="flex justify-between">
                            <span className="text-[#A6A7AA]">Гид:</span>
                            <span className="text-white">{resource.currentAssignment.guide}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-[#A6A7AA] mx-auto mb-3" />
                      <p className="text-[#A6A7AA]">Нет активных назначений</p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="maintenance" className="mt-4">
                  <div className="space-y-4">
                    <div className="bg-[#121214] rounded-lg p-4">
                      <h3 className="text-white font-medium mb-3">История обслуживания</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-[#A6A7AA]">Последнее ТО:</span>
                          <span className="text-white">{resource.lastMaintenance}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-[#A6A7AA]">Следующее ТО:</span>
                          <span className="text-white">{resource.nextMaintenance}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="bg-[#17181A] border-[#232428] p-4">
              <h3 className="text-white font-medium mb-4">Быстрые действия</h3>
              <div className="space-y-2">
                {canEdit && (
                  <>
                    <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                      Создать бронь
                    </Button>
                    <Button variant="outline" className="w-full border-[#232428] text-white hover:bg-[#121214]">
                      Назначить персонал
                    </Button>
                    <Button variant="outline" className="w-full border-[#232428] text-white hover:bg-[#121214]">
                      Запланировать ТО
                    </Button>
                  </>
                )}
                <Button variant="outline" className="w-full border-[#232428] text-white hover:bg-[#121214]">
                  Экспорт данных
                </Button>
              </div>
            </Card>
            
            {resource.assignedStaff && resource.assignedStaff.length > 0 && (
              <Card className="bg-[#17181A] border-[#232428] p-4">
                <h3 className="text-white font-medium mb-4">Назначенный персонал</h3>
                <div className="space-y-2">
                  {resource.assignedStaff.map((staffId, index) => (
                    <div key={staffId} className="flex items-center gap-3 p-2 bg-[#121214] rounded-lg">
                      <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-white text-sm">Сотрудник #{index + 1}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}