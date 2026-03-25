import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Textarea } from "../ui/textarea";
import { Calendar } from "../ui/calendar";
import { 
  Car,
  MapPin,
  Calendar as CalendarIcon,
  Settings,
  Eye,
  Edit,
  Clock,
  Users,
  Phone,
  FileText,
  Filter,
  Search,
  Grid3X3,
  List,
  Wrench,
  AlertTriangle,
  Plus
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";

export function GTSContractorFleet() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterLocation, setFilterLocation] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUnit, setSelectedUnit] = useState<string | null>(null);
  const [availabilityModalOpen, setAvailabilityModalOpen] = useState(false);

  // Mock fleet data
  const fleetData = [
    {
      id: "unit-1",
      name: "Robinson R44",
      type: "Вертолет",
      status: "available" as const,
      location: "Сочи",
      nextSlot: "Завтра 10:00",
      image: "https://images.unsplash.com/photo-1544717302-de2939b7ef71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb258ZW58MXx8fHwxNzU2Njc0Mzc4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      specs: {
        passengers: 3,
        range: "660 км",
        speed: "250 км/ч",
        fuel: "Авиационный керосин"
      },
      crew: {
        pilot: "Сергей Волков",
        phone: "+7 (918) 123-45-67"
      },
      utilization: 78,
      monthlyBookings: 15,
      lastMaintenance: "15.01.2024"
    },
    {
      id: "unit-2",
      name: "Yamaha 252S",
      type: "Катер",
      status: "maintenance" as const,
      location: "Сочи",
      nextSlot: "ТО до 16 февраля",
      image: "https://images.unsplash.com/photo-1566738780840-3dea3eea2723?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBib2F0fGVufDF8fHx8MTc1NjY3NDM4MXww&ixlib=rb-4.1.0&q=80&w=1080",
      specs: {
        passengers: 8,
        length: "7.6 м",
        speed: "80 км/ч", 
        engine: "2x 190 л.с."
      },
      crew: {
        captain: "Игорь Морской",
        phone: "+7 (918) 234-56-78"
      },
      utilization: 65,
      monthlyBookings: 12,
      lastMaintenance: "В процессе"
    },
    {
      id: "unit-3",
      name: "Honda Talon 1000R",
      type: "Багги",
      status: "available" as const,
      location: "КП Роза Хутор",
      nextSlot: "16 февраля 09:00",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdHYlMjBidWdneSUyMG9mZnJvYWR8ZW58MXx8fHwxNzU2Njc0Mzg0fDA&ixlib=rb-4.1.0&q=80&w=1080",
      specs: {
        passengers: 2,
        power: "100 л.с.",
        transmission: "Автомат",
        drive: "Полный привод"
      },
      crew: {
        instructor: "Андрей Экстрим",
        phone: "+7 (918) 345-67-89"
      },
      utilization: 82,
      monthlyBookings: 18,
      lastMaintenance: "28.01.2024"
    },
    {
      id: "unit-4",
      name: "Slingshot Polaris R",
      type: "Трицикл",
      status: "unavailable" as const,
      location: "Сочи",
      nextSlot: "Недоступен",
      image: "https://images.unsplash.com/photo-1558347131-75ad7b72aef4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90fGVufDF8fHx8MTc1NjY3NDM4N3ww&ixlib=rb-4.1.0&q=80&w=1080",
      specs: {
        passengers: 2,
        power: "203 л.с.",
        acceleration: "0-100 за 4.9с",
        weight: "770 кг"
      },
      crew: {
        instructor: "Максим Адреналин",
        phone: "+7 (918) 456-78-90"
      },
      utilization: 45,
      monthlyBookings: 8,
      lastMaintenance: "02.02.2024"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return '#2BB673';
      case 'maintenance': return '#F5A623'; 
      case 'unavailable': return '#E5484D';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return 'Доступен';
      case 'maintenance': return 'ТО';
      case 'unavailable': return 'Недоступен';
      default: return 'Неизвестно';
    }
  };

  const filteredFleet = fleetData.filter(unit => {
    const matchesStatus = filterStatus === "all" || unit.status === filterStatus;
    const matchesLocation = filterLocation === "all" || unit.location === filterLocation;
    const matchesSearch = searchQuery === "" || 
      unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.type.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesLocation && matchesSearch;
  });

  const selectedUnitData = selectedUnit ? fleetData.find(u => u.id === selectedUnit) : null;

  const renderGridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredFleet.map((unit) => (
        <Card 
          key={unit.id}
          className="overflow-hidden border-0 hover:shadow-lg transition-shadow"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="relative h-48">
            <ImageWithFallback
              src={unit.image}
              alt={unit.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3">
              <Badge 
                style={{ 
                  backgroundColor: getStatusColor(unit.status),
                  color: '#FFFFFF'
                }}
              >
                {getStatusText(unit.status)}
              </Badge>
            </div>
            <div className="absolute top-3 right-3">
              <Badge 
                variant="outline"
                style={{ 
                  backgroundColor: 'rgba(0,0,0,0.7)',
                  borderColor: '#A6A7AA',
                  color: '#FFFFFF'
                }}
              >
                {unit.location}
              </Badge>
            </div>
          </div>
          
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 
                className="font-bold"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                }}
              >
                {unit.name}
              </h3>
              <span 
                className="text-sm"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {unit.type}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Утилизация
                </span>
                <span style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  {unit.utilization}%
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  Следующий слот
                </span>
                <span style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                  {unit.nextSlot}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                onClick={() => setSelectedUnit(unit.id)}
                variant="outline"
                size="sm"
                className="flex-1 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Eye className="w-4 h-4 mr-2" />
                Детали
              </Button>
              <Button
                onClick={() => setAvailabilityModalOpen(true)}
                size="sm"
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Edit className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderTableView = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b" style={{ borderColor: '#232428' }}>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Техника
            </th>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Тип
            </th>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Статус
            </th>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Локация
            </th>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Следующий слот
            </th>
            <th 
              className="text-left py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Утилизация
            </th>
            <th 
              className="text-right py-3 px-4"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Действия
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredFleet.map((unit) => (
            <tr 
              key={unit.id}
              className="border-b hover:bg-gray-800/20"
              style={{ borderColor: '#232428' }}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={unit.image}
                      alt={unit.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span 
                    className="font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {unit.name}
                  </span>
                </div>
              </td>
              <td 
                className="py-4 px-4"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {unit.type}
              </td>
              <td className="py-4 px-4">
                <Badge 
                  style={{ 
                    backgroundColor: getStatusColor(unit.status),
                    color: '#FFFFFF'
                  }}
                >
                  {getStatusText(unit.status)}
                </Badge>
              </td>
              <td 
                className="py-4 px-4"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {unit.location}
              </td>
              <td 
                className="py-4 px-4"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {unit.nextSlot}
              </td>
              <td 
                className="py-4 px-4"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {unit.utilization}%
              </td>
              <td className="py-4 px-4 text-right">
                <div className="flex justify-end gap-2">
                  <Button
                    onClick={() => setSelectedUnit(unit.id)}
                    variant="outline"
                    size="sm"
                    className="border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF'
                    }}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    onClick={() => setAvailabilityModalOpen(true)}
                    size="sm"
                    style={{ 
                      backgroundColor: '#91040C',
                      color: '#FFFFFF'
                    }}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: 'Nokia.Kokia, Inter, sans-serif',
              color: '#FFFFFF'
            }}
          >
            Мой флот
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Управление техникой и услугами
          </p>
        </div>
        
        <Button
          style={{ 
            backgroundColor: '#91040C',
            color: '#FFFFFF',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить технику
        </Button>
      </div>

      {/* Filters and Controls */}
      <Card 
        className="p-4 border-0"
        style={{ backgroundColor: '#17181A' }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
              <Input
                placeholder="Поиск по названию или типу..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger 
                className="w-full sm:w-40 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Filter className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="available">Доступна</SelectItem>
                <SelectItem value="maintenance">ТО</SelectItem>
                <SelectItem value="unavailable">Недоступна</SelectItem>
              </SelectContent>
            </Select>

            <Select value={filterLocation} onValueChange={setFilterLocation}>
              <SelectTrigger 
                className="w-full sm:w-40 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <MapPin className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                <SelectItem value="all">Все локации</SelectItem>
                <SelectItem value="Сочи">Сочи</SelectItem>
                <SelectItem value="КП Роза Хутор">КП Роза Хутор</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => setViewMode("grid")}
              variant={viewMode === "grid" ? "default" : "outline"}
              size="sm"
              className="border-0"
              style={{ 
                backgroundColor: viewMode === "grid" ? '#91040C' : '#121214',
                color: '#FFFFFF'
              }}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              onClick={() => setViewMode("table")}
              variant={viewMode === "table" ? "default" : "outline"}
              size="sm"
              className="border-0"
              style={{ 
                backgroundColor: viewMode === "table" ? '#91040C' : '#121214',
                color: '#FFFFFF'
              }}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Fleet Content */}
      <div>
        {viewMode === "grid" ? renderGridView() : renderTableView()}
      </div>

      {/* Unit Details Dialog */}
      <Dialog open={!!selectedUnit} onOpenChange={() => setSelectedUnit(null)}>
        <DialogContent 
          className="max-w-4xl max-h-[90vh] overflow-y-auto border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          {selectedUnitData && (
            <>
              <DialogHeader>
                <DialogTitle 
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                  }}
                >
                  {selectedUnitData.name}
                </DialogTitle>
              </DialogHeader>

              <Tabs defaultValue="overview" className="mt-4">
                <TabsList 
                  className="grid w-full grid-cols-4"
                  style={{ backgroundColor: '#121214' }}
                >
                  <TabsTrigger value="overview">Обзор</TabsTrigger>
                  <TabsTrigger value="calendar">Календарь</TabsTrigger>
                  <TabsTrigger value="maintenance">ТО</TabsTrigger>
                  <TabsTrigger value="crew">Экипаж</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 
                        className="font-medium mb-3"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                        }}
                      >
                        Галерея
                      </h4>
                      <div className="aspect-video rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={selectedUnitData.image}
                          alt={selectedUnitData.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    <div>
                      <h4 
                        className="font-medium mb-3"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                        }}
                      >
                        Технические характеристики
                      </h4>
                      <div className="space-y-3">
                        {Object.entries(selectedUnitData.specs).map(([key, value]) => (
                          <div key={key} className="flex justify-between">
                            <span 
                              style={{ 
                                color: '#A6A7AA',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {key === 'passengers' ? 'Пассажиры' :
                               key === 'range' ? 'Дальность' :
                               key === 'speed' ? 'Скорость' :
                               key === 'fuel' ? 'Топливо' :
                               key === 'length' ? 'Длина' :
                               key === 'engine' ? 'Двигатель' :
                               key === 'power' ? 'Мощность' :
                               key === 'transmission' ? 'КПП' :
                               key === 'drive' ? 'Привод' :
                               key === 'acceleration' ? 'Разгон' :
                               key === 'weight' ? 'Вес' : key}:
                            </span>
                            <span 
                              style={{ 
                                color: '#FFFFFF',
                                fontFamily: 'Gilroy, Inter, sans-serif'
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="calendar">
                  <div className="text-center py-8">
                    <CalendarIcon className="w-12 h-12 mx-auto mb-4" style={{ color: '#A6A7AA' }} />
                    <p style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                      Календарь слотов будет доступен в следующем обновлении
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="maintenance">
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className="p-4 border-0" style={{ backgroundColor: '#121214' }}>
                        <div className="text-center">
                          <Wrench className="w-8 h-8 mx-auto mb-2" style={{ color: '#91040C' }} />
                          <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            Последнее ТО
                          </p>
                          <p className="font-medium" style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            {selectedUnitData.lastMaintenance}
                          </p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border-0" style={{ backgroundColor: '#121214' }}>
                        <div className="text-center">
                          <Clock className="w-8 h-8 mx-auto mb-2" style={{ color: '#F5A623' }} />
                          <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            Следующее ТО
                          </p>
                          <p className="font-medium" style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            Через 45 дней
                          </p>
                        </div>
                      </Card>
                      
                      <Card className="p-4 border-0" style={{ backgroundColor: '#121214' }}>
                        <div className="text-center">
                          <AlertTriangle className="w-8 h-8 mx-auto mb-2" style={{ color: '#E5484D' }} />
                          <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            Требует внимания
                          </p>
                          <p className="font-medium" style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                            0 пунктов
                          </p>
                        </div>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="crew">
                  <div className="space-y-4">
                    {Object.entries(selectedUnitData.crew).map(([role, name]) => (
                      <Card key={role} className="p-4 border-0" style={{ backgroundColor: '#121214' }}>
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: '#91040C' }}
                          >
                            <Users className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium" style={{ color: '#FFFFFF', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                              {name}
                            </p>
                            <p className="text-sm" style={{ color: '#A6A7AA', fontFamily: 'Gilroy, Inter, sans-serif' }}>
                              {role === 'pilot' ? 'Пилот' :
                               role === 'captain' ? 'Капитан' :
                               role === 'instructor' ? 'Инструктор' : role}
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-0"
                            style={{ 
                              backgroundColor: 'transparent',
                              color: '#91040C'
                            }}
                          >
                            <Phone className="w-4 h-4" />
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Availability Update Modal */}
      <Dialog open={availabilityModalOpen} onOpenChange={setAvailabilityModalOpen}>
        <DialogContent 
          className="max-w-md border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <DialogHeader>
            <DialogTitle 
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Обновить доступность
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <label 
                className="block text-sm font-medium mb-2"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Изменения в расписании
              </label>
              <Textarea
                placeholder="Опишите предлагаемые изменения..."
                className="border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setAvailabilityModalOpen(false)}
                variant="outline"
                className="flex-1 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Отмена
              </Button>
              <Button
                onClick={() => setAvailabilityModalOpen(false)}
                className="flex-1"
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Badge 
                  className="mr-2 text-xs"
                  style={{ 
                    backgroundColor: '#F5A623',
                    color: '#000000'
                  }}
                >
                  Модерация
                </Badge>
                Отправить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}