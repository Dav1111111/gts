import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "../../ui/dropdown-menu";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { ScrollArea } from "../../ui/scroll-area";
import { Separator } from "../../ui/separator";
import { 
  Plus, Search, Filter, Settings, Download, Upload, Edit, Trash, Eye,
  Plane, Anchor, Car, Zap, Wrench, Fuel, MapPin, Clock, Calendar,
  Users, Activity, AlertTriangle, CheckCircle, Timer, BarChart3,
  FileText, Camera, User, Phone, Mail, ArrowRight, MoreHorizontal,
  Gauge, Route, Award, Star, Target, TrendingUp, ExternalLink
} from "lucide-react";

// Types
interface Equipment {
  id: string;
  name: string;
  model: string;
  category: 'helicopter' | 'boat' | 'buggy' | 'atv' | 'slingshot';
  year: number;
  vin: string;
  capacity: number;
  power: string;
  mileage: number;
  status: 'ready' | 'maintenance' | 'fueling' | 'in-use' | 'repair';
  location: string;
  photos: string[];
  specifications: Record<string, string>;
  warehouseId?: string;
  geoPosition?: { lat: number; lng: number };
  telemetry?: Record<string, any>;
  nextMaintenance: string;
  lastMaintenance: string;
  createdAt: string;
  updatedAt: string;
}

interface Booking {
  id: string;
  clientName: string;
  startDate: string;
  endDate: string;
  status: 'confirmed' | 'pending' | 'completed';
  value: number;
}

interface CrewMember {
  id: string;
  name: string;
  role: 'pilot' | 'captain' | 'instructor' | 'mechanic';
  phone: string;
  email: string;
  avatar?: string;
  isAssigned: boolean;
}

interface MaintenanceRecord {
  id: string;
  date: string;
  type: 'maintenance' | 'repair' | 'inspection';
  description: string;
  responsible: string;
  cost: number;
  attachments: string[];
  nextDue?: string;
  status: 'completed' | 'scheduled' | 'in-progress';
}

interface User {
  role: string;
  permissions: string[];
}

interface GTSFleetManagementProps {
  user: User;
}

type CategoryFilter = 'all' | 'helicopter' | 'boat' | 'buggy' | 'atv' | 'slingshot';
type StatusFilter = 'all' | 'ready' | 'maintenance' | 'fueling' | 'in-use' | 'repair';

export function GTSFleetManagement({ user }: GTSFleetManagementProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEquipment, setSelectedEquipment] = useState<Equipment | null>(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showMaintenanceDialog, setShowMaintenanceDialog] = useState(false);

  // Mock data
  const mockEquipment: Equipment[] = [
    {
      id: 'heli-001',
      name: 'Небесный странник',
      model: 'Robinson R66 Turbine',
      category: 'helicopter',
      year: 2021,
      vin: 'R66-2021-001',
      capacity: 5,
      power: '300 л.с.',
      mileage: 1250,
      status: 'ready',
      location: 'Ангар А, стоянка 1',
      photos: ['https://example.com/heli1.jpg'],
      specifications: {
        'Тип двигателя': 'Rolls-Royce RR300',
        'Максимальная скорость': '240 км/ч',
        'Дальность полёта': '740 км',
        'Потолок': '4270 м'
      },
      nextMaintenance: '2024-03-15',
      lastMaintenance: '2024-01-15',
      createdAt: '2023-05-10',
      updatedAt: '2024-01-15'
    },
    {
      id: 'boat-001',
      name: 'Морской волк',
      model: 'Azimut 68 Plus',
      category: 'boat',
      year: 2020,
      vin: 'AZ68-2020-001',
      capacity: 12,
      power: '2x1200 л.с.',
      mileage: 850,
      status: 'maintenance',
      location: 'Причал А, место 3',
      photos: ['https://example.com/boat1.jpg'],
      specifications: {
        'Длина': '20.4 м',
        'Ширина': '5.5 м',
        'Двигатели': '2x MAN V8-1200',
        'Максимальная скорость': '35 узлов'
      },
      nextMaintenance: '2024-02-20',
      lastMaintenance: '2024-01-10',
      createdAt: '2023-03-20',
      updatedAt: '2024-01-10'
    },
    {
      id: 'car-001',
      name: 'Красная молния',
      model: 'McLaren 720S',
      category: 'buggy',
      year: 2022,
      vin: 'MCL720S-2022-001',
      capacity: 2,
      power: '720 л.с.',
      mileage: 5600,
      status: 'ready',
      location: 'Гараж Premium, бокс 5',
      photos: ['https://example.com/mclaren1.jpg'],
      specifications: {
        'Объём двигателя': '4.0L V8 Twin-Turbo',
        'Разгон 0-100': '2.9 сек',
        'Максимальная скорость': '341 км/ч',
        'Тип привода': 'Задний'
      },
      nextMaintenance: '2024-04-01',
      lastMaintenance: '2023-12-15',
      createdAt: '2023-01-15',
      updatedAt: '2023-12-15'
    },
    {
      id: 'atv-001',
      name: 'Болотный рейнджер',
      model: 'Can-Am Outlander MAX 1000R',
      category: 'atv',
      year: 2023,
      vin: 'CAM1000R-2023-001',
      capacity: 2,
      power: '91 л.с.',
      mileage: 320,
      status: 'in-use',
      location: 'База багги, сектор B',
      photos: ['https://example.com/atv1.jpg'],
      specifications: {
        'Объём двигателя': '976 см³',
        'Тип привода': '4WD',
        'Подвеска': 'Независимая',
        'Клиренс': '330 мм'
      },
      nextMaintenance: '2024-06-01',
      lastMaintenance: '2024-01-05',
      createdAt: '2023-08-01',
      updatedAt: '2024-01-05'
    }
  ];

  const mockBookings: Record<string, Booking[]> = {
    'heli-001': [
      {
        id: 'book-1',
        clientName: 'Михайлов А.В.',
        startDate: '2024-01-20T10:00:00',
        endDate: '2024-01-20T14:00:00',
        status: 'confirmed',
        value: 450000
      },
      {
        id: 'book-2',
        clientName: 'Петрова С.К.',
        startDate: '2024-01-25T09:00:00',
        endDate: '2024-01-25T12:00:00',
        status: 'pending',
        value: 280000
      }
    ],
    'boat-001': [
      {
        id: 'book-3',
        clientName: 'ООО "Стройинвест"',
        startDate: '2024-02-01T16:00:00',
        endDate: '2024-02-01T20:00:00',
        status: 'confirmed',
        value: 320000
      }
    ]
  };

  const mockCrew: Record<string, CrewMember[]> = {
    'heli-001': [
      {
        id: 'crew-1',
        name: 'Смирнов А.В.',
        role: 'pilot',
        phone: '+7 (903) 123-45-67',
        email: 'pilot@gts.ru',
        isAssigned: true
      }
    ],
    'boat-001': [
      {
        id: 'crew-2',
        name: 'Петров И.С.',
        role: 'captain',
        phone: '+7 (903) 234-56-78',
        email: 'captain@gts.ru',
        isAssigned: true
      }
    ]
  };

  const mockMaintenance: Record<string, MaintenanceRecord[]> = {
    'heli-001': [
      {
        id: 'maint-1',
        date: '2024-01-15',
        type: 'maintenance',
        description: 'Плановое техобслуживание: замена масла, проверка двигателя',
        responsible: 'Техник Сидоров В.И.',
        cost: 85000,
        attachments: ['maintenance_report_001.pdf'],
        nextDue: '2024-03-15',
        status: 'completed'
      },
      {
        id: 'maint-2',
        date: '2023-11-10',
        type: 'repair',
        description: 'Замена лопастей несущего винта',
        responsible: 'Механик Орлов С.А.',
        cost: 320000,
        attachments: ['repair_report_002.pdf', 'parts_invoice.pdf'],
        status: 'completed'
      }
    ]
  };

  // Utility functions
  const getCategoryIcon = (category: Equipment['category']) => {
    const icons = {
      helicopter: Plane,
      boat: Anchor,
      buggy: Car,
      atv: Car,
      slingshot: Zap
    };
    return icons[category];
  };

  const getCategoryName = (category: Equipment['category']) => {
    const names = {
      helicopter: 'Вертолёты',
      boat: 'Катера',
      buggy: 'Багги',
      atv: 'Болотоходы',
      slingshot: 'Slingshot'
    };
    return names[category];
  };

  const getStatusColor = (status: Equipment['status']) => {
    const colors = {
      ready: 'bg-green-500/20 text-green-400 border-green-500',
      maintenance: 'bg-orange-500/20 text-orange-400 border-orange-500',
      fueling: 'bg-blue-500/20 text-blue-400 border-blue-500',
      'in-use': 'bg-purple-500/20 text-purple-400 border-purple-500',
      repair: 'bg-red-500/20 text-red-400 border-red-500'
    };
    return colors[status];
  };

  const getStatusName = (status: Equipment['status']) => {
    const names = {
      ready: 'Готов',
      maintenance: 'На обслуживании',
      fueling: 'Заправка',
      'in-use': 'Используется',
      repair: 'Ремонт'
    };
    return names[status];
  };

  // Filter equipment
  const filteredEquipment = useMemo(() => {
    let filtered = mockEquipment;

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(eq => eq.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(eq => eq.status === statusFilter);
    }

    if (searchQuery) {
      filtered = filtered.filter(eq =>
        eq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
        eq.vin.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return filtered;
  }, [categoryFilter, statusFilter, searchQuery]);

  // Get category statistics
  const categoryStats = useMemo(() => {
    const stats: Record<string, { total: number; ready: number; maintenance: number; inUse: number }> = {};
    
    ['helicopter', 'boat', 'buggy', 'atv', 'slingshot'].forEach(category => {
      const categoryEquipment = mockEquipment.filter(eq => eq.category === category);
      stats[category] = {
        total: categoryEquipment.length,
        ready: categoryEquipment.filter(eq => eq.status === 'ready').length,
        maintenance: categoryEquipment.filter(eq => eq.status === 'maintenance' || eq.status === 'repair').length,
        inUse: categoryEquipment.filter(eq => eq.status === 'in-use').length
      };
    });

    return stats;
  }, []);

  // Check permissions
  const canEdit = user.permissions.includes('fleet') || user.role === 'executive';
  const canView = canEdit || user.role === 'manager' || user.role === 'operator';

  if (!canView) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">Доступ запрещён</h3>
          <p className="text-[#A6A7AA]">У вас нет прав для просмотра управления парком</p>
        </div>
      </div>
    );
  }

  // Render equipment card
  const renderEquipmentCard = (equipment: Equipment) => {
    const CategoryIcon = getCategoryIcon(equipment.category);
    const bookings = mockBookings[equipment.id] || [];
    const crew = mockCrew[equipment.id] || [];
    
    return (
      <Card 
        key={equipment.id}
        className="bg-[#17181A] border-[#232428] hover:border-[#91040C] transition-colors cursor-pointer"
        onClick={() => setSelectedEquipment(equipment)}
      >
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#232428] rounded-lg">
                <CategoryIcon className="w-5 h-5 text-[#A6A7AA]" />
              </div>
              <div>
                <CardTitle className="text-white">{equipment.name}</CardTitle>
                <CardDescription>{equipment.model}</CardDescription>
              </div>
            </div>
            <Badge className={getStatusColor(equipment.status)}>
              {getStatusName(equipment.status)}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-[#A6A7AA]">Год:</span>
              <span className="text-white ml-2">{equipment.year}</span>
            </div>
            <div>
              <span className="text-[#A6A7AA]">VIN:</span>
              <span className="text-white ml-2 font-mono text-xs">{equipment.vin}</span>
            </div>
            <div>
              <span className="text-[#A6A7AA]">Вместимость:</span>
              <span className="text-white ml-2">{equipment.capacity} чел.</span>
            </div>
            <div>
              <span className="text-[#A6A7AA]">Мощность:</span>
              <span className="text-white ml-2">{equipment.power}</span>
            </div>
          </div>

          <Separator className="bg-[#232428]" />

          {/* Location & Mileage */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4 text-[#A6A7AA]" />
              <span className="text-[#A6A7AA]">{equipment.location}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Gauge className="w-4 h-4 text-[#A6A7AA]" />
              <span className="text-[#A6A7AA]">
                {equipment.category === 'helicopter' ? 'Налёт' : 'Пробег'}: {equipment.mileage.toLocaleString()}
                {equipment.category === 'helicopter' ? ' ч' : ' км'}
              </span>
            </div>
          </div>

          {/* Future Bookings */}
          {bookings.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Будущие брони</h4>
              <div className="space-y-2">
                {bookings.slice(0, 2).map(booking => (
                  <div key={booking.id} className="flex items-center justify-between text-xs p-2 bg-[#232428] rounded">
                    <div>
                      <div className="text-white">{booking.clientName}</div>
                      <div className="text-[#A6A7AA]">
                        {new Date(booking.startDate).toLocaleDateString('ru-RU')}
                      </div>
                    </div>
                    <Badge className={`text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидание'}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Assigned Crew */}
          {crew.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-white mb-2">Экипаж</h4>
              <div className="flex items-center gap-2">
                {crew.map(member => (
                  <div key={member.id} className="flex items-center gap-2 text-xs">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="bg-[#232428] text-white text-xs">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-[#A6A7AA]">{member.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Maintenance */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#A6A7AA]" />
              <span className="text-[#A6A7AA]">Следующее ТО:</span>
            </div>
            <span className="text-white">
              {new Date(equipment.nextMaintenance).toLocaleDateString('ru-RU')}
            </span>
          </div>
        </CardContent>
      </Card>
    );
  };

  // Render equipment table
  const renderEquipmentTable = () => (
    <Card className="bg-[#17181A] border-[#232428]">
      <CardHeader>
        <CardTitle className="text-white">Полный список техники</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="border-[#232428]">
              <TableHead className="text-[#A6A7AA]">Название</TableHead>
              <TableHead className="text-[#A6A7AA]">Категория</TableHead>
              <TableHead className="text-[#A6A7AA]">Статус</TableHead>
              <TableHead className="text-[#A6A7AA]">Следующее ТО</TableHead>
              <TableHead className="text-[#A6A7AA]">Брони</TableHead>
              <TableHead className="text-[#A6A7AA]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredEquipment.map(equipment => {
              const bookings = mockBookings[equipment.id] || [];
              return (
                <TableRow key={equipment.id} className="border-[#232428]">
                  <TableCell>
                    <div>
                      <div className="font-medium text-white">{equipment.name}</div>
                      <div className="text-sm text-[#A6A7AA]">{equipment.model}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(equipment.category);
                        return <CategoryIcon className="w-4 h-4 text-[#A6A7AA]" />;
                      })()}
                      <span className="text-white">{getCategoryName(equipment.category)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(equipment.status)}>
                      {getStatusName(equipment.status)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-white">
                    {new Date(equipment.nextMaintenance).toLocaleDateString('ru-RU')}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#A6A7AA]" />
                      <span className="text-white">{bookings.length}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="bg-[#17181A] border-[#232428]" align="end">
                        <DropdownMenuItem onClick={() => setSelectedEquipment(equipment)}>
                          <Eye className="w-4 h-4 mr-2" />
                          Просмотр
                        </DropdownMenuItem>
                        {canEdit && (
                          <>
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Редактировать
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Wrench className="w-4 h-4 mr-2" />
                              Обслуживание
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Calendar className="w-4 h-4 mr-2" />
                              Календарь
                            </DropdownMenuItem>
                          </>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );

  // Render detailed equipment view
  const renderEquipmentDetails = () => {
    if (!selectedEquipment) return null;

    const bookings = mockBookings[selectedEquipment.id] || [];
    const crew = mockCrew[selectedEquipment.id] || [];
    const maintenance = mockMaintenance[selectedEquipment.id] || [];
    const CategoryIcon = getCategoryIcon(selectedEquipment.category);

    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#232428] rounded-lg">
              <CategoryIcon className="w-6 h-6 text-[#A6A7AA]" />
            </div>
            <div>
              <h2 className="text-2xl font-heading text-white">{selectedEquipment.name}</h2>
              <p className="text-[#A6A7AA]">{selectedEquipment.model} • {selectedEquipment.year}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={getStatusColor(selectedEquipment.status)}>
              {getStatusName(selectedEquipment.status)}
            </Badge>
            {canEdit && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="border-[#232428]">
                    <Settings className="w-4 h-4 mr-2" />
                    Действия
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#17181A] border-[#232428]" align="end">
                  <DropdownMenuItem>
                    <Edit className="w-4 h-4 mr-2" />
                    Редактировать
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setShowMaintenanceDialog(true)}>
                    <Wrench className="w-4 h-4 mr-2" />
                    Добавить ТО
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Calendar className="w-4 h-4 mr-2" />
                    Создать бронь
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Camera className="w-4 h-4 mr-2" />
                    Добавить фото
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#17181A]">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="bookings">Бронирования</TabsTrigger>
            <TabsTrigger value="crew">Экипаж</TabsTrigger>
            <TabsTrigger value="maintenance">Обслуживание</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4 mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Basic Information */}
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Основная информация</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-[#A6A7AA]">VIN/Бортовой номер</label>
                      <p className="text-white font-mono">{selectedEquipment.vin}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Год выпуска</label>
                      <p className="text-white">{selectedEquipment.year}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Вместимость</label>
                      <p className="text-white">{selectedEquipment.capacity} человек</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Мощность</label>
                      <p className="text-white">{selectedEquipment.power}</p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">
                        {selectedEquipment.category === 'helicopter' ? 'Налёт' : 'Пробег'}
                      </label>
                      <p className="text-white">
                        {selectedEquipment.mileage.toLocaleString()}
                        {selectedEquipment.category === 'helicopter' ? ' часов' : ' км'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-[#A6A7AA]">Местоположение</label>
                      <p className="text-white">{selectedEquipment.location}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Specifications */}
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Технические характеристики</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {Object.entries(selectedEquipment.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-[#A6A7AA]">{key}:</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Maintenance Schedule */}
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">График обслуживания</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm text-[#A6A7AA] mb-2 block">Последнее ТО</label>
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-400" />
                      <span className="text-white">
                        {new Date(selectedEquipment.lastMaintenance).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-[#A6A7AA] mb-2 block">Следующее ТО</label>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-400" />
                      <span className="text-white">
                        {new Date(selectedEquipment.nextMaintenance).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bookings" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Будущие бронирования</CardTitle>
                  {canEdit && (
                    <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/80">
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить бронь
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {bookings.length > 0 ? (
                  <div className="space-y-3">
                    {bookings.map(booking => (
                      <div key={booking.id} className="flex items-center justify-between p-4 bg-[#232428] rounded-lg">
                        <div className="flex items-center gap-4">
                          <div>
                            <h4 className="font-medium text-white">{booking.clientName}</h4>
                            <p className="text-sm text-[#A6A7AA]">
                              {new Date(booking.startDate).toLocaleDateString('ru-RU')} • 
                              {new Date(booking.startDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })} - 
                              {new Date(booking.endDate).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="text-right">
                            <div className="text-green-400 font-medium">₽{booking.value.toLocaleString()}</div>
                            <Badge className={`text-xs ${
                              booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                              booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {booking.status === 'confirmed' ? 'Подтверждено' :
                               booking.status === 'pending' ? 'Ожидание' : 'Завершено'}
                            </Badge>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ArrowRight className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Нет бронирований</h3>
                    <p className="text-[#A6A7AA]">На данный момент нет запланированных бронирований</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="crew" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Назначенный экипаж</CardTitle>
                  {canEdit && (
                    <Button size="sm" variant="outline" className="border-[#232428]">
                      <Users className="w-4 h-4 mr-2" />
                      Назначить экипаж
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {crew.length > 0 ? (
                  <div className="space-y-4">
                    {crew.map(member => (
                      <div key={member.id} className="flex items-center justify-between p-4 bg-[#232428] rounded-lg">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-[#17181A] text-white">
                              {member.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h4 className="font-medium text-white">{member.name}</h4>
                            <p className="text-sm text-[#A6A7AA] capitalize">
                              {member.role === 'pilot' ? 'Пилот' :
                               member.role === 'captain' ? 'Капитан' :
                               member.role === 'instructor' ? 'Инструктор' : 'Механик'}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right text-sm">
                            <div className="flex items-center gap-2 text-[#A6A7AA]">
                              <Phone className="w-3 h-3" />
                              {member.phone}
                            </div>
                            <div className="flex items-center gap-2 text-[#A6A7AA] mt-1">
                              <Mail className="w-3 h-3" />
                              {member.email}
                            </div>
                          </div>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Users className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Экипаж не назначен</h3>
                    <p className="text-[#A6A7AA]">Назначьте пилота или капитана для этой техники</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-4 mt-4">
            <Card className="bg-[#17181A] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">Журнал обслуживания</CardTitle>
                  {canEdit && (
                    <Button 
                      size="sm" 
                      className="bg-[#91040C] hover:bg-[#91040C]/80"
                      onClick={() => setShowMaintenanceDialog(true)}
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Добавить запись
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {maintenance.length > 0 ? (
                  <div className="space-y-4">
                    {maintenance.map(record => (
                      <div key={record.id} className="p-4 bg-[#232428] rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${
                              record.type === 'maintenance' ? 'bg-blue-500/10' :
                              record.type === 'repair' ? 'bg-red-500/10' : 'bg-green-500/10'
                            }`}>
                              <Wrench className={`w-4 h-4 ${
                                record.type === 'maintenance' ? 'text-blue-400' :
                                record.type === 'repair' ? 'text-red-400' : 'text-green-400'
                              }`} />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">
                                {record.type === 'maintenance' ? 'Техобслуживание' :
                                 record.type === 'repair' ? 'Ремонт' : 'Инспекция'}
                              </h4>
                              <p className="text-sm text-[#A6A7AA]">{record.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-white font-medium">₽{record.cost.toLocaleString()}</div>
                            <Badge className={`text-xs ${
                              record.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              record.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {record.status === 'completed' ? 'Завершено' :
                               record.status === 'in-progress' ? 'В процессе' : 'Запланировано'}
                            </Badge>
                          </div>
                        </div>
                        
                        <p className="text-white mb-2">{record.description}</p>
                        <p className="text-sm text-[#A6A7AA] mb-3">Ответственный: {record.responsible}</p>
                        
                        {record.attachments.length > 0 && (
                          <div className="flex items-center gap-2">
                            <FileText className="w-4 h-4 text-[#A6A7AA]" />
                            <span className="text-sm text-[#A6A7AA]">
                              {record.attachments.length} файл(ов)
                            </span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Wrench className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Нет записей об обслуживании</h3>
                    <p className="text-[#A6A7AA]">Добавьте первую запись о техническом обслуживании</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <div className="space-y-6 p-6 bg-[#0B0B0C] min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-heading text-white mb-2">
            Управление парком
          </h1>
          <p className="text-[#A6A7AA]">
            Полное управление техникой клуба
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="border-[#232428]">
            <Download className="w-4 h-4 mr-2" />
            Экспорт
          </Button>
          {canEdit && (
            <Button 
              size="sm" 
              className="bg-[#91040C] hover:bg-[#91040C]/80"
              onClick={() => setShowAddDialog(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Добавить технику
            </Button>
          )}
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
          <Input
            placeholder="Поиск по названию, модели, VIN..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder-[#A6A7AA]"
          />
        </div>

        <Select value={categoryFilter} onValueChange={(value) => setCategoryFilter(value as CategoryFilter)}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все категории</SelectItem>
            <SelectItem value="helicopter">Вертолёты</SelectItem>
            <SelectItem value="boat">Катера</SelectItem>
            <SelectItem value="buggy">Багги</SelectItem>
            <SelectItem value="atv">Болотоходы</SelectItem>
            <SelectItem value="slingshot">Slingshot</SelectItem>
          </SelectContent>
        </Select>

        <Select value={statusFilter} onValueChange={(value) => setStatusFilter(value as StatusFilter)}>
          <SelectTrigger className="w-48 bg-[#17181A] border-[#232428] text-white">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-[#17181A] border-[#232428]">
            <SelectItem value="all">Все статусы</SelectItem>
            <SelectItem value="ready">Готов</SelectItem>
            <SelectItem value="maintenance">Обслуживание</SelectItem>
            <SelectItem value="fueling">Заправка</SelectItem>
            <SelectItem value="in-use">Используется</SelectItem>
            <SelectItem value="repair">Ремонт</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Category Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {['helicopter', 'boat', 'buggy', 'atv', 'slingshot'].map(category => {
          const stats = categoryStats[category];
          const CategoryIcon = getCategoryIcon(category as Equipment['category']);
          return (
            <Card key={category} className="bg-[#121214] border-[#232428]">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CategoryIcon className="w-5 h-5 text-[#A6A7AA]" />
                  <span className="font-medium text-white">
                    {getCategoryName(category as Equipment['category'])}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center">
                    <div className="text-lg font-heading text-white">{stats?.total || 0}</div>
                    <div className="text-[#A6A7AA]">Всего</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading text-green-400">{stats?.ready || 0}</div>
                    <div className="text-[#A6A7AA]">Готово</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-heading text-purple-400">{stats?.inUse || 0}</div>
                    <div className="text-[#A6A7AA]">Занято</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-[#17181A]">
          <TabsTrigger value="overview">Обзор</TabsTrigger>
          <TabsTrigger value="cards">Карточки</TabsTrigger>
          <TabsTrigger value="table">Таблица</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredEquipment.map(equipment => renderEquipmentCard(equipment))}
              </div>
            </div>
            <div>
              {selectedEquipment ? renderEquipmentDetails() : (
                <Card className="bg-[#17181A] border-[#232428] h-full flex items-center justify-center">
                  <CardContent className="text-center">
                    <Activity className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Выберите технику
                    </h3>
                    <p className="text-[#A6A7AA]">
                      Нажмите на карточку для просмотра деталей
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="cards" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEquipment.map(equipment => renderEquipmentCard(equipment))}
          </div>
        </TabsContent>

        <TabsContent value="table" className="mt-6">
          {renderEquipmentTable()}
        </TabsContent>
      </Tabs>

      {/* Add Equipment Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle>Добавить новую технику</DialogTitle>
            <DialogDescription>
              Введите информацию о новой единице техники
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Категория
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="helicopter">Вертолёты</SelectItem>
                    <SelectItem value="boat">Катера</SelectItem>
                    <SelectItem value="buggy">Багги</SelectItem>
                    <SelectItem value="atv">Болотоходы</SelectItem>
                    <SelectItem value="slingshot">Slingshot</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Название
                </label>
                <Input
                  placeholder="Введите название"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Модель
                </label>
                <Input
                  placeholder="Марка и модель"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Год
                  </label>
                  <Input
                    type="number"
                    placeholder="2024"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                    Вместимость
                  </label>
                  <Input
                    type="number"
                    placeholder="Человек"
                    className="bg-[#232428] border-[#232428] text-white"
                  />
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  VIN/Бортовой номер
                </label>
                <Input
                  placeholder="Уникальный номер"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Мощность
                </label>
                <Input
                  placeholder="л.с. или кВт"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Местоположение
                </label>
                <Input
                  placeholder="Ангар, причал, гараж"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Статус
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите статус" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="ready">Готов</SelectItem>
                    <SelectItem value="maintenance">На обслуживании</SelectItem>
                    <SelectItem value="repair">Ремонт</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
              Описание и характеристики
            </label>
            <Textarea
              placeholder="Дополнительная информация о технике"
              className="bg-[#232428] border-[#232428] text-white"
              rows={3}
            />
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowAddDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Добавить технику
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Maintenance Dialog */}
      <Dialog open={showMaintenanceDialog} onOpenChange={setShowMaintenanceDialog}>
        <DialogContent className="bg-[#17181A] border-[#232428] text-white max-w-xl">
          <DialogHeader>
            <DialogTitle>Добавить запись об обслуживании</DialogTitle>
            <DialogDescription>
              Создать новую запись в журнале обслуживания
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Тип обслуживания
                </label>
                <Select>
                  <SelectTrigger className="bg-[#232428] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    <SelectItem value="maintenance">Плановое ТО</SelectItem>
                    <SelectItem value="repair">Ремонт</SelectItem>
                    <SelectItem value="inspection">Инспекция</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Дата
                </label>
                <Input
                  type="date"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                Описание работ
              </label>
              <Textarea
                placeholder="Подробное описание выполненных работ"
                className="bg-[#232428] border-[#232428] text-white"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Ответственный
                </label>
                <Input
                  placeholder="ФИО ответственного"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-[#A6A7AA] mb-2 block">
                  Стоимость
                </label>
                <Input
                  type="number"
                  placeholder="₽"
                  className="bg-[#232428] border-[#232428] text-white"
                />
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowMaintenanceDialog(false)}
              className="border-[#232428]"
            >
              Отмена
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              Добавить запись
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}