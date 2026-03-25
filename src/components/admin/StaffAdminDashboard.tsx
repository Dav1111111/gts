import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Calendar } from "../ui/calendar";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Car,
  Wrench,
  Calendar as CalendarIcon,
  Clock,
  User,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Edit,
  Eye,
  Filter,
  Download,
  Settings,
  MapPin,
  Fuel,
  Gauge,
  RotateCcw
} from "lucide-react";

interface Vehicle {
  id: string;
  name: string;
  type: "boat" | "helicopter" | "buggy" | "slingshot";
  status: "available" | "in-use" | "maintenance" | "out-of-service";
  location: string;
  lastMaintenance: string;
  nextMaintenance: string;
  mileage?: number;
  fuelLevel?: number;
  image: string;
}

interface MaintenanceLog {
  id: string;
  vehicleId: string;
  vehicleName: string;
  type: "routine" | "repair" | "inspection" | "emergency";
  description: string;
  technician: string;
  date: string;
  cost: number;
  status: "scheduled" | "in-progress" | "completed";
  parts?: string[];
}

interface Schedule {
  id: string;
  vehicleId: string;
  vehicleName: string;
  customerName: string;
  startTime: string;
  endTime: string;
  status: "scheduled" | "active" | "completed" | "cancelled";
  staff: string;
  route?: string;
}

const mockVehicles: Vehicle[] = [
  {
    id: "1",
    name: "Yamaha 252S - Alpha",
    type: "boat",
    status: "available",
    location: "Сочи Марина",
    lastMaintenance: "2024-08-15",
    nextMaintenance: "2024-09-15",
    fuelLevel: 85,
    image: "https://images.unsplash.com/photo-1705829344720-564ac4eaff4b"
  },
  {
    id: "2",
    name: "Robinson R44 - Beta",
    type: "helicopter", 
    status: "in-use",
    location: "Аэропорт Сочи",
    lastMaintenance: "2024-08-10",
    nextMaintenance: "2024-09-10",
    mileage: 1250,
    fuelLevel: 60,
    image: "https://images.unsplash.com/photo-1639578656444-5d79da997032"
  },
  {
    id: "3",
    name: "Honda Talon - Gamma",
    type: "buggy",
    status: "maintenance",
    location: "Красная Поляна",
    lastMaintenance: "2024-08-25",
    nextMaintenance: "2024-08-30",
    mileage: 2800,
    fuelLevel: 40,
    image: "https://images.unsplash.com/photo-1709841951941-f5b804e5971f"
  }
];

const mockMaintenanceLogs: MaintenanceLog[] = [
  {
    id: "1",
    vehicleId: "3",
    vehicleName: "Honda Talon - Gamma",
    type: "repair",
    description: "Engine oil change and brake pad replacement",
    technician: "Петр Иванов",
    date: "2024-08-25",
    cost: 15000,
    status: "in-progress",
    parts: ["Engine oil", "Brake pads", "Oil filter"]
  },
  {
    id: "2",
    vehicleId: "1", 
    vehicleName: "Yamaha 252S - Alpha",
    type: "routine",
    description: "Monthly safety inspection and cleaning",
    technician: "Анна Сидорова",
    date: "2024-08-20",
    cost: 8000,
    status: "completed"
  }
];

const mockSchedules: Schedule[] = [
  {
    id: "1",
    vehicleId: "2",
    vehicleName: "Robinson R44 - Beta",
    customerName: "Александр Волков",
    startTime: "2024-08-28T10:00",
    endTime: "2024-08-28T11:00",
    status: "active",
    staff: "Игорь Петров",
    route: "Сочи - Красная Поляна"
  },
  {
    id: "2",
    vehicleId: "1",
    vehicleName: "Yamaha 252S - Alpha", 
    customerName: "Екатерина Морозова",
    startTime: "2024-08-28T14:00",
    endTime: "2024-08-28T20:00",
    status: "scheduled",
    staff: "Михаил Козлов",
    route: "Coastal Route"
  }
];

export function StaffAdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "vehicles" | "schedules" | "maintenance">("overview");
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [maintenanceLogs, setMaintenanceLogs] = useState(mockMaintenanceLogs);
  const [schedules, setSchedules] = useState(mockSchedules);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getVehicleStatusColor = (status: string) => {
    switch (status) {
      case "available": return "bg-green-500 text-white";
      case "in-use": return "bg-blue-500 text-white";
      case "maintenance": return "bg-yellow-500 text-white";
      case "out-of-service": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getMaintenanceStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-500 text-white";
      case "in-progress": return "bg-blue-500 text-white";
      case "scheduled": return "bg-yellow-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getScheduleStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500 text-white";
      case "scheduled": return "bg-blue-500 text-white";
      case "completed": return "bg-gray-500 text-white";
      case "cancelled": return "bg-red-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "boat": return "🚤";
      case "helicopter": return "🚁";
      case "buggy": return "🏎️";
      case "slingshot": return "🏁";
      default: return "🚗";
    }
  };

  const availableVehicles = vehicles.filter(v => v.status === "available").length;
  const inUseVehicles = vehicles.filter(v => v.status === "in-use").length;
  const maintenanceNeeded = vehicles.filter(v => v.status === "maintenance").length;
  const todaySchedules = schedules.filter(s => s.startTime.startsWith("2024-08-28")).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Staff Dashboard</h1>
          <p className="text-gray-400">Vehicle management, schedules, and maintenance</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-gray-700 text-gray-300">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Schedule
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "vehicles", label: "Vehicles" },
            { id: "schedules", label: "Schedules" },
            { id: "maintenance", label: "Maintenance" }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`py-2 px-1 border-b-2 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "border-[#91040C] text-[#91040C]"
                  : "border-transparent text-gray-400 hover:text-gray-300"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Available Vehicles</p>
                  <p className="text-2xl font-semibold text-white">{availableVehicles}</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">In Use</p>
                  <p className="text-2xl font-semibold text-white">{inUseVehicles}</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Car className="w-6 h-6 text-blue-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Maintenance Needed</p>
                  <p className="text-2xl font-semibold text-white">{maintenanceNeeded}</p>
                </div>
                <div className="bg-yellow-500/10 p-3 rounded-lg">
                  <AlertTriangle className="w-6 h-6 text-yellow-400" />
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Today's Schedules</p>
                  <p className="text-2xl font-semibold text-white">{todaySchedules}</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <CalendarIcon className="w-6 h-6 text-purple-400" />
                </div>
              </div>
            </Card>
          </div>

          {/* Today's Schedule */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Today's Schedule</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {schedules.filter(s => s.startTime.startsWith("2024-08-28")).map((schedule) => (
                    <div key={schedule.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{getTypeIcon(vehicles.find(v => v.id === schedule.vehicleId)?.type || "")}</div>
                        <div>
                          <p className="font-medium text-white">{schedule.vehicleName}</p>
                          <p className="text-sm text-gray-400">{schedule.customerName}</p>
                          <p className="text-xs text-gray-500">
                            {new Date(schedule.startTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})} - 
                            {new Date(schedule.endTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}
                          </p>
                        </div>
                      </div>
                      <Badge className={getScheduleStatusColor(schedule.status)}>
                        {schedule.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <div className="p-6 border-b border-gray-800">
                <h3 className="text-lg font-semibold text-white">Maintenance Alerts</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {maintenanceLogs.filter(log => log.status !== "completed").map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="bg-yellow-500/10 p-2 rounded-lg">
                          <Wrench className="w-5 h-5 text-yellow-400" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{log.vehicleName}</p>
                          <p className="text-sm text-gray-400">{log.description}</p>
                          <p className="text-xs text-gray-500">Technician: {log.technician}</p>
                        </div>
                      </div>
                      <Badge className={getMaintenanceStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </div>
      )}

      {/* Vehicles Tab */}
      {activeTab === "vehicles" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {vehicles.map((vehicle) => (
              <Card key={vehicle.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video bg-gray-800 relative">
                  <ImageWithFallback
                    src={vehicle.image}
                    alt={vehicle.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge className={getVehicleStatusColor(vehicle.status)}>
                      {vehicle.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3 text-2xl">
                    {getTypeIcon(vehicle.type)}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-2">{vehicle.name}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-400">
                      <MapPin className="w-4 h-4 mr-2" />
                      {vehicle.location}
                    </div>
                    
                    {vehicle.fuelLevel && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-400">
                          <Fuel className="w-4 h-4 mr-2" />
                          Fuel Level
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full ${vehicle.fuelLevel > 50 ? 'bg-green-500' : vehicle.fuelLevel > 25 ? 'bg-yellow-500' : 'bg-red-500'}`}
                              style={{ width: `${vehicle.fuelLevel}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-white">{vehicle.fuelLevel}%</span>
                        </div>
                      </div>
                    )}
                    
                    {vehicle.mileage && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-400">
                          <Gauge className="w-4 h-4 mr-2" />
                          Mileage
                        </div>
                        <span className="text-sm text-white">{vehicle.mileage.toLocaleString()} km</span>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-400">
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Next Maintenance
                      </div>
                      <span className="text-sm text-white">
                        {new Date(vehicle.nextMaintenance).toLocaleDateString('ru-RU')}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 border-gray-700 text-gray-300">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Schedules Tab */}
      {activeTab === "schedules" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Calendar</h3>
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="rounded-md border-gray-700"
              />
            </div>
          </Card>
          
          <Card className="lg:col-span-2 bg-gray-900 border-gray-800">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white">Schedule Overview</h3>
                <Button variant="outline" className="border-gray-700 text-gray-300">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
              
              <Table>
                <TableHeader>
                  <TableRow className="border-gray-800">
                    <TableHead className="text-gray-400">Vehicle</TableHead>
                    <TableHead className="text-gray-400">Customer</TableHead>
                    <TableHead className="text-gray-400">Time</TableHead>
                    <TableHead className="text-gray-400">Staff</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {schedules.map((schedule) => (
                    <TableRow key={schedule.id} className="border-gray-800">
                      <TableCell className="text-white">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getTypeIcon(vehicles.find(v => v.id === schedule.vehicleId)?.type || "")}</span>
                          <span>{schedule.vehicleName}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-white">{schedule.customerName}</TableCell>
                      <TableCell className="text-white">
                        {new Date(schedule.startTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})} - 
                        {new Date(schedule.endTime).toLocaleTimeString('ru-RU', {hour: '2-digit', minute: '2-digit'})}
                      </TableCell>
                      <TableCell className="text-white">{schedule.staff}</TableCell>
                      <TableCell>
                        <Badge className={getScheduleStatusColor(schedule.status)}>
                          {schedule.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </Card>
        </div>
      )}

      {/* Maintenance Tab */}
      {activeTab === "maintenance" && (
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-6 border-b border-gray-800">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Maintenance Logs</h3>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                <Plus className="w-4 h-4 mr-2" />
                New Log
              </Button>
            </div>
          </div>
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Vehicle</TableHead>
                  <TableHead className="text-gray-400">Type</TableHead>
                  <TableHead className="text-gray-400">Description</TableHead>
                  <TableHead className="text-gray-400">Technician</TableHead>
                  <TableHead className="text-gray-400">Date</TableHead>
                  <TableHead className="text-gray-400">Cost</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenanceLogs.map((log) => (
                  <TableRow key={log.id} className="border-gray-800">
                    <TableCell className="text-white">{log.vehicleName}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {log.type}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-white">{log.description}</TableCell>
                    <TableCell className="text-white">{log.technician}</TableCell>
                    <TableCell className="text-white">
                      {new Date(log.date).toLocaleDateString('ru-RU')}
                    </TableCell>
                    <TableCell className="text-white">{log.cost.toLocaleString()}₽</TableCell>
                    <TableCell>
                      <Badge className={getMaintenanceStatusColor(log.status)}>
                        {log.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}
    </div>
  );
}