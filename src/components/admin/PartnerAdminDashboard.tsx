import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import {
  Plus,
  Edit,
  Trash2,
  Upload,
  DollarSign,
  Calendar,
  Clock,
  MapPin,
  Users,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
  FileImage,
  Save,
  X
} from "lucide-react";

interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  capacity: number;
  images: string[];
  status: "active" | "inactive" | "draft";
  bookings: number;
  revenue: number;
}

interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  date: string;
  time: string;
  status: "confirmed" | "pending" | "cancelled" | "completed";
  price: number;
  guests: number;
}

const mockServices: Service[] = [
  {
    id: "1",
    name: "Luxury Yacht Charter",
    description: "Premium yacht experience with professional crew",
    category: "boats",
    price: 25000,
    duration: "6 hours",
    capacity: 12,
    images: ["https://images.unsplash.com/photo-1705829344720-564ac4eaff4b"],
    status: "active",
    bookings: 45,
    revenue: 1125000
  },
  {
    id: "2", 
    name: "Helicopter Mountain Tour",
    description: "Scenic helicopter ride over Caucasus mountains",
    category: "helicopters",
    price: 45000,
    duration: "1 hour",
    capacity: 4,
    images: ["https://images.unsplash.com/photo-1639578656444-5d79da997032"],
    status: "active",
    bookings: 32,
    revenue: 1440000
  }
];

const mockBookings: Booking[] = [
  {
    id: "1",
    serviceId: "1",
    serviceName: "Luxury Yacht Charter",
    customerName: "Александр Волков",
    date: "2024-08-28",
    time: "10:00",
    status: "confirmed",
    price: 25000,
    guests: 8
  },
  {
    id: "2",
    serviceId: "2", 
    serviceName: "Helicopter Mountain Tour",
    customerName: "Екатерина Морозова",
    date: "2024-08-30",
    time: "14:00",
    status: "pending",
    price: 45000,
    guests: 2
  }
];

interface PartnerAdminDashboardProps {
  onCreatePartner?: () => void;
}

export function PartnerAdminDashboard({ onCreatePartner }: PartnerAdminDashboardProps) {
  const [services, setServices] = useState(mockServices);
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState<"overview" | "services" | "bookings" | "pricing">("overview");
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);

  const totalRevenue = services.reduce((sum, service) => sum + service.revenue, 0);
  const totalBookings = services.reduce((sum, service) => sum + service.bookings, 0);
  const activeServices = services.filter(s => s.status === "active").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": case "confirmed": case "completed": return "bg-green-500 text-white";
      case "pending": return "bg-yellow-500 text-white";
      case "inactive": case "cancelled": return "bg-red-500 text-white";
      case "draft": return "bg-gray-500 text-white";
      default: return "bg-gray-500 text-white";
    }
  };

  const ServiceForm = ({ service, onSave, onCancel }: { 
    service?: Service; 
    onSave: (service: Service) => void; 
    onCancel: () => void;
  }) => {
    const [formData, setFormData] = useState(service || {
      id: Date.now().toString(),
      name: "",
      description: "",
      category: "boats",
      price: 0,
      duration: "",
      capacity: 1,
      images: [],
      status: "draft" as const,
      bookings: 0,
      revenue: 0
    });

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label>Service Name</Label>
            <Input
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              placeholder="Enter service name"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label>Category</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="boats">Boats</SelectItem>
                <SelectItem value="helicopters">Helicopters</SelectItem>
                <SelectItem value="buggies">Buggies</SelectItem>
                <SelectItem value="slingshot">Slingshot</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            placeholder="Enter service description"
            className="bg-gray-800 border-gray-700 text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <Label>Price (₽)</Label>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: Number(e.target.value)})}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label>Duration</Label>
            <Input
              value={formData.duration}
              onChange={(e) => setFormData({...formData, duration: e.target.value})}
              placeholder="e.g., 2 hours"
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
          <div>
            <Label>Capacity</Label>
            <Input
              type="number"
              value={formData.capacity}
              onChange={(e) => setFormData({...formData, capacity: Number(e.target.value)})}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>

        <div>
          <Label>Images</Label>
          <div className="border-2 border-dashed border-gray-700 rounded-lg p-6 text-center">
            <FileImage className="w-8 h-8 text-gray-500 mx-auto mb-2" />
            <p className="text-sm text-gray-400 mb-2">Drag & drop images or click to upload</p>
            <Button variant="outline" size="sm" className="border-gray-700 text-gray-300">
              <Upload className="w-4 h-4 mr-2" />
              Upload Images
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Button variant="outline" onClick={onCancel} className="border-gray-700 text-gray-300">
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={() => onSave(formData)} className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Save className="w-4 h-4 mr-2" />
            Save Service
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Partner Dashboard</h1>
          <p className="text-gray-400">Manage your services, pricing, and bookings</p>
        </div>
        <div className="flex gap-3">
          {onCreatePartner && (
            <Button className="bg-blue-600 hover:bg-blue-700" onClick={onCreatePartner}>
              <Plus className="w-4 h-4 mr-2" />
              Create Partner
            </Button>
          )}
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90" onClick={() => setIsAddingService(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <nav className="flex space-x-8">
          {[
            { id: "overview", label: "Overview" },
            { id: "services", label: "Services" },
            { id: "bookings", label: "Bookings" },
            { id: "pricing", label: "Pricing" }
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
                  <p className="text-sm text-gray-400">Total Revenue</p>
                  <p className="text-2xl font-semibold text-white">{totalRevenue.toLocaleString()}₽</p>
                </div>
                <div className="bg-green-500/10 p-3 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+12.5%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Total Bookings</p>
                  <p className="text-2xl font-semibold text-white">{totalBookings}</p>
                </div>
                <div className="bg-blue-500/10 p-3 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+8.2%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Services</p>
                  <p className="text-2xl font-semibold text-white">{activeServices}</p>
                </div>
                <div className="bg-purple-500/10 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                <span className="text-green-400">+2</span>
                <span className="text-gray-400 ml-1">new this month</span>
              </div>
            </Card>

            <Card className="bg-gray-900 border-gray-800 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Avg. Price</p>
                  <p className="text-2xl font-semibold text-white">{Math.round(totalRevenue / totalBookings).toLocaleString()}₽</p>
                </div>
                <div className="bg-orange-500/10 p-3 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-400" />
                </div>
              </div>
              <div className="flex items-center mt-2 text-sm">
                <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                <span className="text-red-400">-2.1%</span>
                <span className="text-gray-400 ml-1">vs last month</span>
              </div>
            </Card>
          </div>

          {/* Recent Bookings */}
          <Card className="bg-gray-900 border-gray-800">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {bookings.slice(0, 5).map((booking) => (
                  <div key={booking.id} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{booking.serviceName}</p>
                        <p className="text-sm text-gray-400">{booking.customerName}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-white">{booking.price.toLocaleString()}₽</p>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Services Tab */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.id} className="bg-gray-900 border-gray-800 overflow-hidden">
                <div className="aspect-video bg-gray-800 relative">
                  {service.images[0] && (
                    <ImageWithFallback
                      src={service.images[0]}
                      alt={service.name}
                      className="w-full h-full object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3">
                    <Badge className={getStatusColor(service.status)}>
                      {service.status}
                    </Badge>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="bg-black/50 text-white hover:bg-black/70"
                      onClick={() => setEditingService(service)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-semibold text-white mb-2">{service.name}</h3>
                  <p className="text-sm text-gray-400 mb-4">{service.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-white">{service.price.toLocaleString()}₽</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium text-white">{service.duration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Bookings</p>
                      <p className="font-medium text-white">{service.bookings}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="font-medium text-white">{service.revenue.toLocaleString()}₽</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bookings Tab */}
      {activeTab === "bookings" && (
        <Card className="bg-gray-900 border-gray-800">
          <div className="p-6">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800">
                  <TableHead className="text-gray-400">Service</TableHead>
                  <TableHead className="text-gray-400">Customer</TableHead>
                  <TableHead className="text-gray-400">Date & Time</TableHead>
                  <TableHead className="text-gray-400">Guests</TableHead>
                  <TableHead className="text-gray-400">Price</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bookings.map((booking) => (
                  <TableRow key={booking.id} className="border-gray-800">
                    <TableCell className="text-white">{booking.serviceName}</TableCell>
                    <TableCell className="text-white">{booking.customerName}</TableCell>
                    <TableCell className="text-white">
                      {new Date(booking.date).toLocaleDateString('ru-RU')} at {booking.time}
                    </TableCell>
                    <TableCell className="text-white">{booking.guests}</TableCell>
                    <TableCell className="text-white">{booking.price.toLocaleString()}₽</TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(booking.status)}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>
      )}

      {/* Add/Edit Service Dialog */}
      <Dialog open={isAddingService || !!editingService} onOpenChange={(open) => {
        if (!open) {
          setIsAddingService(false);
          setEditingService(null);
        }
      }}>
        <DialogContent className="max-w-2xl bg-gray-900 border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>
              {editingService ? "Edit Service" : "Add New Service"}
            </DialogTitle>
            <DialogDescription>
              {editingService ? "Update service information and settings" : "Create a new service offering for your clients"}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            service={editingService || undefined}
            onSave={(service) => {
              if (editingService) {
                setServices(services.map(s => s.id === service.id ? service : s));
              } else {
                setServices([...services, service]);
              }
              setIsAddingService(false);
              setEditingService(null);
            }}
            onCancel={() => {
              setIsAddingService(false);
              setEditingService(null);
            }}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}