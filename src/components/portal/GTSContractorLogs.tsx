import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Wrench,
  AlertTriangle,
  CheckSquare,
  XSquare,
  User,
  Calendar,
  Clock,
  Search,
  Filter,
  Plus,
  FileText,
  Settings
} from "lucide-react";

export function GTSContractorLogs() {
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [addRecordModalOpen, setAddRecordModalOpen] = useState(false);
  const [recordType, setRecordType] = useState<"maintenance" | "incident" | "checklist">("maintenance");

  // Mock logs data
  const logsData = [
    {
      id: "log-001",
      type: "maintenance" as const,
      title: "Плановое ТО Robinson R44",
      vehicle: "Robinson R44",
      date: "2024-02-10",
      time: "14:30",
      responsible: "Сергей Технич",
      status: "completed" as const,
      description: "Замена масла, проверка систем управления, осмотр лопастей",
      nextAction: "Следующее ТО через 100 часов налета",
      priority: "medium" as const
    },
    {
      id: "log-002",
      type: "incident" as const,
      title: "Незначительное повреждение Yamaha 252S",
      vehicle: "Yamaha 252S",
      date: "2024-02-08",
      time: "16:45",
      responsible: "Игорь Морской",
      status: "pending" as const,
      description: "Царапина на корпусе от причального кранца",
      nextAction: "Требуется покраска поврежденного участка",
      priority: "low" as const
    },
    {
      id: "log-003",
      type: "checklist" as const,
      title: "Предполетная проверка R44",
      vehicle: "Robinson R44",
      date: "2024-02-12",
      time: "09:15",
      responsible: "Сергей Волков",
      status: "completed" as const,
      description: "Проверка всех систем перед полетом",
      nextAction: "Готов к эксплуатации",
      priority: "high" as const
    },
    {
      id: "log-004",
      type: "maintenance" as const,
      title: "Внеплановый ремонт Honda Talon",
      vehicle: "Honda Talon 1000R",
      date: "2024-02-06",
      time: "11:20",
      responsible: "Андрей Экстрим",
      status: "in_progress" as const,
      description: "Замена тормозных колодок после интенсивного использования",
      nextAction: "Завершение работ в течение 2 дней",
      priority: "high" as const
    },
    {
      id: "log-005",
      type: "incident" as const,
      title: "Перегрев двигателя Slingshot",
      vehicle: "Slingshot Polaris R",
      date: "2024-02-04",
      time: "13:10",
      responsible: "Максим Адреналин",
      status: "resolved" as const,
      description: "Перегрев двигателя во время поездки, клиент доставлен в безопасное место",
      nextAction: "Диагностика и ремонт системы охлаждения завершены",
      priority: "high" as const
    }
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'maintenance': return '#F5A623';
      case 'incident': return '#E5484D';
      case 'checklist': return '#2BB673';
      default: return '#A6A7AA';
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case 'maintenance': return 'ТО';
      case 'incident': return 'Инцидент';
      case 'checklist': return 'Чек-лист';
      default: return 'Неизвестно';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return '#2BB673';
      case 'pending': return '#F5A623';
      case 'in_progress': return '#0EA5E9';
      case 'resolved': return '#2BB673';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Завершено';
      case 'pending': return 'Ожидает';
      case 'in_progress': return 'В процессе';
      case 'resolved': return 'Решено';
      default: return 'Неизвестно';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#E5484D';
      case 'medium': return '#F5A623';
      case 'low': return '#2BB673';
      default: return '#A6A7AA';
    }
  };

  const filteredLogs = logsData.filter(log => {
    const matchesType = filterType === "all" || log.type === filterType;
    const matchesStatus = filterStatus === "all" || log.status === filterStatus;
    const matchesSearch = searchQuery === "" || 
      log.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.vehicle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.responsible.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesType && matchesStatus && matchesSearch;
  });

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
            Журналы операций
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Техобслуживание, инциденты и проверки
          </p>
        </div>

        <Button
          onClick={() => setAddRecordModalOpen(true)}
          style={{ 
            backgroundColor: '#91040C',
            color: '#FFFFFF',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Добавить запись
        </Button>
      </div>

      {/* Filters */}
      <Card 
        className="p-4 border-0"
        style={{ backgroundColor: '#17181A' }}
      >
        <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
            <Input
              placeholder="Поиск по заголовку, технике или ответственному..."
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
          
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger 
              className="w-full lg:w-40 border-0"
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
              <SelectItem value="all">Все типы</SelectItem>
              <SelectItem value="maintenance">ТО</SelectItem>
              <SelectItem value="incident">Инциденты</SelectItem>
              <SelectItem value="checklist">Чек-листы</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger 
              className="w-full lg:w-40 border-0"
              style={{ 
                backgroundColor: '#121214',
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="completed">Завершено</SelectItem>
              <SelectItem value="pending">Ожидает</SelectItem>
              <SelectItem value="in_progress">В процессе</SelectItem>
              <SelectItem value="resolved">Решено</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Logs List */}
      <div className="space-y-4">
        {filteredLogs.map((log) => (
          <Card 
            key={log.id}
            className="p-6 border-0 hover:shadow-lg transition-shadow"
            style={{ backgroundColor: '#17181A' }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: getTypeColor(log.type) }}
                >
                  {log.type === 'maintenance' && <Wrench className="w-5 h-5 text-white" />}
                  {log.type === 'incident' && <AlertTriangle className="w-5 h-5 text-white" />}
                  {log.type === 'checklist' && <CheckSquare className="w-5 h-5 text-white" />}
                </div>
                
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 
                      className="font-bold"
                      style={{ 
                        color: '#FFFFFF',
                        fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                      }}
                    >
                      {log.title}
                    </h3>
                    <Badge 
                      style={{ 
                        backgroundColor: getTypeColor(log.type),
                        color: '#FFFFFF'
                      }}
                    >
                      {getTypeText(log.type)}
                    </Badge>
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span 
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {log.vehicle}
                    </span>
                    <span 
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {new Date(log.date).toLocaleDateString('ru-RU')} в {log.time}
                    </span>
                    <div className="flex items-center gap-1">
                      <User className="w-3 h-3" style={{ color: '#A6A7AA' }} />
                      <span 
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {log.responsible}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: getPriorityColor(log.priority) }}
                ></div>
                <Badge 
                  style={{ 
                    backgroundColor: getStatusColor(log.status),
                    color: '#FFFFFF'
                  }}
                >
                  {getStatusText(log.status)}
                </Badge>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Описание
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {log.description}
                </p>
              </div>
              
              <div>
                <p 
                  className="text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Следующие действия
                </p>
                <p 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {log.nextAction}
                </p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Record Modal */}
      <Dialog open={addRecordModalOpen} onOpenChange={setAddRecordModalOpen}>
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
              Добавить запись
            </DialogTitle>
          </DialogHeader>

          <Tabs value={recordType} onValueChange={(value) => setRecordType(value as any)} className="space-y-4">
            <TabsList 
              className="grid w-full grid-cols-3"
              style={{ backgroundColor: '#121214' }}
            >
              <TabsTrigger value="maintenance">ТО</TabsTrigger>
              <TabsTrigger value="incident">Инцидент</TabsTrigger>
              <TabsTrigger value="checklist">Чек-лист</TabsTrigger>
            </TabsList>

            <div className="space-y-4">
              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Техника
                </label>
                <Select>
                  <SelectTrigger 
                    className="border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    <SelectValue placeholder="Выберите технику" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                    <SelectItem value="r44">Robinson R44</SelectItem>
                    <SelectItem value="yamaha">Yamaha 252S</SelectItem>
                    <SelectItem value="honda">Honda Talon 1000R</SelectItem>
                    <SelectItem value="slingshot">Slingshot Polaris R</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Заголовок
                </label>
                <Input
                  placeholder="Краткое описание..."
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Описание
                </label>
                <Textarea
                  placeholder="Подробное описание работ или инцидента..."
                  className="border-0"
                  style={{ 
                    backgroundColor: '#121214',
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                />
              </div>

              <div>
                <label 
                  className="block text-sm font-medium mb-2"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Приоритет
                </label>
                <Select>
                  <SelectTrigger 
                    className="border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={() => setAddRecordModalOpen(false)}
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
                onClick={() => setAddRecordModalOpen(false)}
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
                Добавить
              </Button>
            </div>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  );
}