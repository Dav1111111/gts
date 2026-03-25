import { useState, useMemo } from "react";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Badge } from "../../ui/badge";
import { Card } from "../../ui/card";
import { 
  Search, 
  Filter, 
  Plus,
  ArrowLeft,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
  MapPin,
  Users,
  CheckCircle,
  AlertCircle,
  Clock,
  Power,
  Anchor,
  Plane,
  Car,
  User,
  Settings,
  Calendar,
  ChevronRight
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

// Types (same as desktop version)
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

interface GTSSphereManagementMobileProps {
  userRole: UserRole;
  onBack?: () => void;
}

// Mock data (same as desktop)
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

export function GTSSphereManagementMobile({ userRole, onBack }: GTSSphereManagementMobileProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<ResourceStatus | "all">("all");
  const [selectedResource, setSelectedResource] = useState<Resource | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  // Role-based access control (same as desktop)
  const canEdit = ['executive', 'operator'].includes(userRole);
  
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
    return <ResourceDetailViewMobile 
      resource={selectedResource} 
      canEdit={canEdit}
      onBack={() => setSelectedResource(null)}
      userRole={userRole}
    />;
  }

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Mobile Header */}
      <div className="bg-[#0B0B0C] border-b border-[#232428] sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            {onBack && (
              <Button
                variant="ghost" 
                size="sm"
                onClick={onBack}
                className="text-white hover:bg-[#121214] p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <div>
              <h1 className="text-lg font-semibold text-white" style={{ fontFamily: 'var(--font-heading)' }}>
                SphereM
              </h1>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="text-white hover:bg-[#121214] p-2"
            >
              <Filter className="w-5 h-5" />
            </Button>
            {canEdit && (
              <Button 
                size="sm"
                className="bg-[#91040C] hover:bg-[#91040C]/90 text-white px-3"
              >
                <Plus className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* Search Bar */}
        <div className="px-4 pb-4">
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

        {/* Filters Panel */}
        {showFilters && (
          <div className="px-4 pb-4 space-y-3 border-t border-[#232428] pt-4">
            <Select value={selectedType} onValueChange={(value) => setSelectedType(value as ResourceType | "all")}>
              <SelectTrigger className="bg-[#121214] border-[#232428] text-white">
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
              <SelectTrigger className="bg-[#121214] border-[#232428] text-white">
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
        )}
      </div>

      {/* Statistics Cards */}
      <div className="px-4 py-4">
        <div className="grid grid-cols-4 gap-2">
          <Card className="bg-[#17181A] border-[#232428] p-3 text-center">
            <div className="text-lg font-semibold text-white">{stats.total}</div>
            <div className="text-xs text-[#A6A7AA]">Всего</div>
          </Card>
          <Card className="bg-[#17181A] border-[#232428] p-3 text-center">
            <div className="text-lg font-semibold text-green-400">{stats.available}</div>
            <div className="text-xs text-[#A6A7AA]">Доступно</div>
          </Card>
          <Card className="bg-[#17181A] border-[#232428] p-3 text-center">
            <div className="text-lg font-semibold text-blue-400">{stats.inUse}</div>
            <div className="text-xs text-[#A6A7AA]">В работе</div>
          </Card>
          <Card className="bg-[#17181A] border-[#232428] p-3 text-center">
            <div className="text-lg font-semibold text-yellow-400">{stats.maintenance}</div>
            <div className="text-xs text-[#A6A7AA]">На ТО</div>
          </Card>
        </div>
      </div>

      {/* Resources List */}
      <div className="px-4 pb-20 space-y-3">
        {filteredResources.map((resource) => {
          const IconComponent = resourceTypeIcons[resource.type];
          const StatusIcon = statusIcons[resource.status];
          
          return (
            <Card 
              key={resource.id}
              className="bg-[#17181A] border-[#232428] p-4 active:bg-[#1A1B1D] transition-colors"
              onClick={() => setSelectedResource(resource)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 bg-[#91040C]/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <IconComponent className="w-5 h-5 text-[#91040C]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium truncate">{resource.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className={`${statusColors[resource.status]} text-xs px-2 py-0.5`}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {resource.status === 'available' ? 'Доступно' :
                         resource.status === 'in-use' ? 'В работе' :
                         resource.status === 'maintenance' ? 'На ТО' : 'Отключен'}
                      </Badge>
                      {resource.type !== 'staff' && (
                        <span className="text-[#A6A7AA] text-xs">
                          <Users className="w-3 h-3 inline mr-1" />
                          {resource.capacity}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2 flex-shrink-0">
                  {canEdit && (
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-[#A6A7AA] hover:text-white h-8 w-8 p-0"
                          onClick={(e) => e.stopPropagation()}
                        >
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
                  <ChevronRight className="w-4 h-4 text-[#A6A7AA]" />
                </div>
              </div>
              
              <div className="mt-3 space-y-2">
                <div className="flex items-center text-[#A6A7AA] text-sm">
                  <MapPin className="w-3 h-3 mr-1" />
                  {resource.location}
                </div>
                
                {resource.currentAssignment && (
                  <div className="bg-[#121214] rounded-lg p-3">
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
        
        {filteredResources.length === 0 && (
          <Card className="bg-[#17181A] border-[#232428] p-8 text-center">
            <div className="w-16 h-16 bg-[#A6A7AA]/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-[#A6A7AA]" />
            </div>
            <h3 className="text-white text-lg font-medium mb-2">Ресурсы не найдены</h3>
            <p className="text-[#A6A7AA] text-sm">Попробуйте изменить фильтры или поисковый запрос</p>
          </Card>
        )}
      </div>
    </div>
  );
}

// Mobile Resource Detail View Component
function ResourceDetailViewMobile({ 
  resource, 
  canEdit, 
  onBack, 
  userRole 
}: { 
  resource: Resource; 
  canEdit: boolean; 
  onBack: () => void; 
  userRole: UserRole;
}) {
  const IconComponent = resourceTypeIcons[resource.type];
  const StatusIcon = statusIcons[resource.status];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Mobile Header */}
      <div className="bg-[#0B0B0C] border-b border-[#232428] sticky top-0 z-40">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="text-white hover:bg-[#121214] p-2"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-white truncate" style={{ fontFamily: 'var(--font-heading)' }}>
                {resource.name}
              </h1>
            </div>
          </div>
          
          {canEdit && (
            <Button 
              size="sm"
              variant="outline" 
              className="border-[#232428] text-white hover:bg-[#121214]"
            >
              <Edit className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
      
      <div className="p-4 space-y-4">
        {/* Resource Info Card */}
        <Card className="bg-[#17181A] border-[#232428] p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[#91040C]/20 rounded-lg flex items-center justify-center">
              <IconComponent className="w-6 h-6 text-[#91040C]" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-white">{resource.name}</h2>
              <Badge variant="outline" className={`${statusColors[resource.status]} mt-2`}>
                <StatusIcon className="w-3 h-3 mr-1" />
                {resource.status === 'available' ? 'Доступно' :
                 resource.status === 'in-use' ? 'В работе' :
                 resource.status === 'maintenance' ? 'На ТО' : 'Отключен'}
              </Badge>
            </div>
          </div>
        </Card>

        {/* Current Assignment */}
        {resource.currentAssignment && (
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Текущее назначение
            </h3>
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
          </Card>
        )}

        {/* Specifications */}
        <Card className="bg-[#17181A] border-[#232428] p-4">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Характеристики
          </h3>
          <div className="space-y-3">
            {Object.entries(resource.specs).map(([key, value]) => (
              <div key={key} className="flex justify-between py-2 border-b border-[#232428] last:border-b-0">
                <span className="text-[#A6A7AA]">{key}:</span>
                <span className="text-white font-medium">{value}</span>
              </div>
            ))}
            <div className="flex justify-between py-2 border-b border-[#232428]">
              <span className="text-[#A6A7AA]">Вместимость:</span>
              <span className="text-white font-medium">{resource.capacity} {resource.type === 'staff' ? 'чел.' : 'мест'}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-[#A6A7AA]">Местоположение:</span>
              <span className="text-white font-medium">{resource.location}</span>
            </div>
          </div>
        </Card>

        {/* Maintenance */}
        <Card className="bg-[#17181A] border-[#232428] p-4">
          <h3 className="text-white font-medium mb-3 flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Обслуживание
          </h3>
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
        </Card>

        {/* Quick Actions */}
        {canEdit && (
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <h3 className="text-white font-medium mb-3">Быстрые действия</h3>
            <div className="space-y-2">
              <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                Создать бронь
              </Button>
              <Button variant="outline" className="w-full border-[#232428] text-white hover:bg-[#121214]">
                Назначить персонал
              </Button>
              <Button variant="outline" className="w-full border-[#232428] text-white hover:bg-[#121214]">
                Запланировать ТО
              </Button>
            </div>
          </Card>
        )}

        {/* Assigned Staff */}
        {resource.assignedStaff && resource.assignedStaff.length > 0 && (
          <Card className="bg-[#17181A] border-[#232428] p-4">
            <h3 className="text-white font-medium mb-3 flex items-center gap-2">
              <Users className="w-4 h-4" />
              Назначенный персонал
            </h3>
            <div className="space-y-2">
              {resource.assignedStaff.map((staffId, index) => (
                <div key={staffId} className="flex items-center gap-3 p-3 bg-[#121214] rounded-lg">
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
  );
}