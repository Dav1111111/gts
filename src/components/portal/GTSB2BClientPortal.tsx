import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { 
  Search, 
  Filter,
  Plus,
  Eye,
  Calendar as CalendarIcon,
  MapPin,
  Building,
  Users,
  DollarSign,
  FileText,
  Clock,
  TrendingUp,
  Briefcase,
  Settings,
  Download,
  Upload,
  User,
  Phone,
  Mail,
  Globe,
  Activity,
  BarChart3,
  CreditCard,
  Package,
  Calendar as CalendarCheckIcon,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader,
  ArrowUpRight,
  PlusCircle
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Separator } from "../ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { cn } from "../ui/utils";

interface Company {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  location: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  lastActivity: string;
  totalSpend: number;
  activeContracts: number;
  contactPerson: string;
  phone: string;
  email: string;
  website?: string;
  description?: string;
  joinedDate: string;
}

interface BookingRequest {
  id: string;
  companyId: string;
  service: string;
  date: string;
  participants: number;
  budget: number;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface Order {
  id: string;
  companyId: string;
  service: string;
  date: string;
  amount: number;
  status: 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
  participants: number;
  createdAt: string;
}

interface Invoice {
  id: string;
  companyId: string;
  orderId: string;
  number: string;
  amount: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: string;
  createdAt: string;
}

interface Participant {
  id: string;
  companyId: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: 'active' | 'inactive';
  lastLogin?: string;
}

export function GTSB2BClientPortal() {
  const { userRole } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [showCompanyDetails, setShowCompanyDetails] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDate, setSelectedDate] = useState<Date>();

  // Mock data
  const companies: Company[] = [
    {
      id: "comp-001",
      name: "Premium Travel Group",
      logo: undefined,
      industry: "Travel & Tourism",
      location: "Moscow, Russia",
      status: "active",
      lastActivity: "2024-12-03T14:30:00Z",
      totalSpend: 2450000,
      activeContracts: 3,
      contactPerson: "Elena Volkov",
      phone: "+7 495 123 45 67",
      email: "elena.volkov@premiumtravel.ru",
      website: "www.premiumtravel.ru",
      description: "Ведущее туристическое агентство, специализирующееся на премиальном отдыхе",
      joinedDate: "2023-06-15"
    },
    {
      id: "comp-002", 
      name: "Luxury Events Corp",
      logo: undefined,
      industry: "Event Management",
      location: "St. Petersburg, Russia",
      status: "active",
      lastActivity: "2024-12-02T16:45:00Z",
      totalSpend: 1850000,
      activeContracts: 2,
      contactPerson: "Dmitry Petrov",
      phone: "+7 812 987 65 43",
      email: "d.petrov@luxuryevents.ru",
      website: "www.luxuryevents.ru",
      description: "Организация эксклюзивных корпоративных мероприятий",
      joinedDate: "2023-08-22"
    },
    {
      id: "comp-003",
      name: "Elite Business Solutions",
      logo: undefined,
      industry: "Corporate Services", 
      location: "Sochi, Russia",
      status: "pending",
      lastActivity: "2024-12-01T09:20:00Z",
      totalSpend: 0,
      activeContracts: 0,
      contactPerson: "Anna Kozlova",
      phone: "+7 862 555 77 88",
      email: "a.kozlova@elitebiz.ru",
      description: "Бизнес-консалтинг и корпоративные решения",
      joinedDate: "2024-11-28"
    },
    {
      id: "comp-004",
      name: "VIP Concierge Services",
      logo: undefined,
      industry: "Hospitality",
      location: "Krasnodar, Russia",
      status: "active",
      lastActivity: "2024-11-30T12:15:00Z",
      totalSpend: 3200000,
      activeContracts: 5,
      contactPerson: "Sergey Morozov",
      phone: "+7 861 333 22 11",
      email: "s.morozov@vipconcierge.ru",
      website: "www.vipconcierge.ru",
      description: "Консьерж-услуги премиум класса",
      joinedDate: "2023-03-10"
    }
  ];

  const bookingRequests: BookingRequest[] = [
    {
      id: "req-001",
      companyId: "comp-001",
      service: "Helicopter Tour - Robinson R44",
      date: "2024-12-15",
      participants: 3,
      budget: 125000,
      status: "pending",
      description: "Вертолетная экскурсия для VIP клиентов компании",
      createdAt: "2024-12-03T10:30:00Z",
      updatedAt: "2024-12-03T10:30:00Z"
    },
    {
      id: "req-002", 
      companyId: "comp-001",
      service: "Yacht Charter - Azimut 55",
      date: "2024-12-20",
      participants: 8,
      budget: 280000,
      status: "approved",
      description: "Корпоративное мероприятие на яхте",
      createdAt: "2024-12-01T14:20:00Z",
      updatedAt: "2024-12-02T09:15:00Z"
    }
  ];

  const orders: Order[] = [
    {
      id: "ord-001",
      companyId: "comp-001",
      service: "Helicopter Tour - Bell 407",
      date: "2024-11-25",
      amount: 145000,
      status: "completed",
      participants: 4,
      createdAt: "2024-11-20T11:00:00Z"
    },
    {
      id: "ord-002",
      companyId: "comp-001", 
      service: "Yacht Charter - Princess V65",
      date: "2024-10-15",
      amount: 320000,
      status: "completed",
      participants: 12,
      createdAt: "2024-10-10T16:30:00Z"
    }
  ];

  const invoices: Invoice[] = [
    {
      id: "inv-001",
      companyId: "comp-001",
      orderId: "ord-001",
      number: "INV-2024-1125",
      amount: 145000,
      status: "paid",
      dueDate: "2024-12-10",
      createdAt: "2024-11-25T18:00:00Z"
    },
    {
      id: "inv-002", 
      companyId: "comp-001",
      orderId: "ord-002", 
      number: "INV-2024-1015",
      amount: 320000,
      status: "paid",
      dueDate: "2024-11-01",
      createdAt: "2024-10-15T20:00:00Z"
    }
  ];

  const participants: Participant[] = [
    {
      id: "part-001",
      companyId: "comp-001",
      name: "Elena Volkov",
      email: "elena.volkov@premiumtravel.ru",
      phone: "+7 495 123 45 67",
      role: "CEO",
      status: "active",
      lastLogin: "2024-12-03T14:30:00Z"
    },
    {
      id: "part-002",
      companyId: "comp-001",
      name: "Mikhail Volkov",
      email: "mikhail.volkov@premiumtravel.ru", 
      phone: "+7 495 123 45 68",
      role: "Operations Manager",
      status: "active",
      lastLogin: "2024-12-02T09:15:00Z"
    },
    {
      id: "part-003",
      companyId: "comp-001",
      name: "Sofia Ivanova",
      email: "sofia.ivanova@premiumtravel.ru",
      phone: "+7 495 123 45 69",
      role: "Sales Manager",
      status: "active",
      lastLogin: "2024-12-01T16:45:00Z"
    }
  ];

  // Filtered companies
  const filteredCompanies = useMemo(() => {
    let filtered = companies;

    if (searchQuery) {
      filtered = filtered.filter(company =>
        company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        company.contactPerson.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(company => company.status === statusFilter);
    }

    return filtered;
  }, [companies, searchQuery, statusFilter]);

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500/20 text-green-400",
      inactive: "bg-gray-500/20 text-gray-400", 
      pending: "bg-yellow-500/20 text-yellow-400",
      suspended: "bg-red-500/20 text-red-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const getRequestStatusColor = (status: string) => {
    const colors = {
      pending: "bg-yellow-500/20 text-yellow-400",
      approved: "bg-green-500/20 text-green-400",
      rejected: "bg-red-500/20 text-red-400",
      completed: "bg-blue-500/20 text-blue-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const getOrderStatusColor = (status: string) => {
    const colors = {
      confirmed: "bg-blue-500/20 text-blue-400",
      in_progress: "bg-orange-500/20 text-orange-400",
      completed: "bg-green-500/20 text-green-400",
      cancelled: "bg-red-500/20 text-red-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const getInvoiceStatusColor = (status: string) => {
    const colors = {
      draft: "bg-gray-500/20 text-gray-400",
      sent: "bg-blue-500/20 text-blue-400", 
      paid: "bg-green-500/20 text-green-400",
      overdue: "bg-red-500/20 text-red-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleViewCompany = (company: Company) => {
    setSelectedCompany(company);
    setActiveTab("overview");
    setShowCompanyDetails(true);
  };

  const handleCreateBookingRequest = () => {
    setShowBookingDialog(true);
  };

  // Данные для дашборда
  const dashboardStats = {
    totalSpent: companies.reduce((sum, company) => sum + company.totalSpend, 0),
    activeContracts: companies.reduce((sum, company) => sum + company.activeContracts, 0),
    upcomingEvents: bookingRequests.filter(req => req.status === 'approved').length,
    pendingRequests: bookingRequests.filter(req => req.status === 'pending').length
  };

  return (
    <div className="min-h-screen bg-background">
      {!showCompanyDetails ? (
        <>
          {/* Header */}
          <div className="border-b bg-card border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div>
                <h1 className="text-2xl font-heading text-foreground">
                  B2B Client Portal
                </h1>
                <p className="text-sm text-muted-foreground">
                  Manage your corporate partnerships and bookings
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={handleCreateBookingRequest}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  New Booking Request
                </Button>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Dashboard Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Spent</p>
                      <p className="text-2xl font-heading text-foreground">
                        {formatCurrency(dashboardStats.totalSpent)}
                      </p>
                    </div>
                    <DollarSign className="h-6 w-6 text-green-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Contracts</p>
                      <p className="text-2xl font-heading text-foreground">
                        {dashboardStats.activeContracts}
                      </p>
                    </div>
                    <FileText className="h-6 w-6 text-blue-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Upcoming Events</p>
                      <p className="text-2xl font-heading text-foreground">
                        {dashboardStats.upcomingEvents}
                      </p>
                    </div>
                    <CalendarCheckIcon className="h-6 w-6 text-purple-400" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Pending Requests</p>
                      <p className="text-2xl font-heading text-foreground">
                        {dashboardStats.pendingRequests}
                      </p>
                    </div>
                    <Clock className="h-6 w-6 text-orange-400" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Filters */}
            <Card className="mb-6 bg-card border-border">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search companies..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button variant="outline" className="w-full">
                    <Filter className="h-4 w-4 mr-2" />
                    Advanced Filters
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Companies Table */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">Companies</CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your corporate clients and partnerships
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-border">
                      <TableHead className="text-foreground">Name</TableHead>
                      <TableHead className="text-foreground">Industry</TableHead>
                      <TableHead className="text-foreground">Location</TableHead>
                      <TableHead className="text-foreground">Status</TableHead>
                      <TableHead className="text-foreground">Last Activity</TableHead>
                      <TableHead className="text-foreground">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCompanies.map((company) => (
                      <TableRow 
                        key={company.id} 
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              {company.logo ? (
                                <AvatarImage src={company.logo} alt={company.name} />
                              ) : (
                                <AvatarFallback className="bg-muted text-foreground">
                                  <Building className="h-5 w-5" />
                                </AvatarFallback>
                              )}
                            </Avatar>
                            <div>
                              <p className="font-medium text-foreground">
                                {company.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {company.contactPerson}
                              </p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {company.industry}
                        </TableCell>
                        <TableCell className="text-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            {company.location}
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(company.status)}>
                            {company.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-foreground">
                          {formatDateTime(company.lastActivity)}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleViewCompany(company)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {filteredCompanies.length === 0 && (
                  <div className="text-center py-8">
                    <Building className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      No companies found matching your criteria
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      ) : (
        /* Company Details View */
        <div>
          {/* Company Header */}
          <div className="border-b bg-card border-border">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setShowCompanyDetails(false)}
                  className="text-foreground"
                >
                  ← Back to Companies
                </Button>
                
                {selectedCompany && (
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-lg flex items-center justify-center bg-muted">
                      {selectedCompany.logo ? (
                        <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-12 h-12 object-contain" />
                      ) : (
                        <Building className="h-8 w-8 text-foreground" />
                      )}
                    </div>
                    <div>
                      <h1 className="text-2xl font-heading text-foreground">
                        {selectedCompany.name}
                      </h1>
                      <p className="text-sm text-muted-foreground">
                        {selectedCompany.industry} • {selectedCompany.location}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex items-center gap-2">
                <Badge className={selectedCompany ? getStatusColor(selectedCompany.status) : ""}>
                  {selectedCompany?.status}
                </Badge>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button onClick={handleCreateBookingRequest}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Request
                </Button>
              </div>
            </div>
          </div>

          {selectedCompany && (
            <div className="p-6">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="booking-requests">Booking Requests</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="invoices">Acts & Invoices</TabsTrigger>
                  <TabsTrigger value="participants">Participants</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                      <Card className="bg-card border-border">
                        <CardHeader>
                          <CardTitle className="text-foreground">Company Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium text-foreground">Contact Person</label>
                              <p className="text-sm mt-1 text-muted-foreground">
                                {selectedCompany.contactPerson}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">Phone</label>
                              <p className="text-sm mt-1 text-muted-foreground">
                                {selectedCompany.phone}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">Email</label>
                              <p className="text-sm mt-1 text-muted-foreground">
                                {selectedCompany.email}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium text-foreground">Website</label>
                              <p className="text-sm mt-1 text-muted-foreground">
                                {selectedCompany.website || 'Not provided'}
                              </p>
                            </div>
                          </div>
                          
                          <Separator />
                          
                          <div>
                            <label className="text-sm font-medium text-foreground">Description</label>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {selectedCompany.description || 'No description available'}
                            </p>
                          </div>
                          
                          <div>
                            <label className="text-sm font-medium text-foreground">Partnership Since</label>
                            <p className="text-sm mt-1 text-muted-foreground">
                              {formatDate(selectedCompany.joinedDate)}
                            </p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-4">
                      <Card className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <DollarSign className="h-8 w-8 mx-auto mb-2 text-green-400" />
                            <p className="text-2xl font-heading text-foreground">
                              {formatCurrency(selectedCompany.totalSpend)}
                            </p>
                            <p className="text-sm text-muted-foreground">Total Spend</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Briefcase className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                            <p className="text-2xl font-heading text-foreground">
                              {selectedCompany.activeContracts}
                            </p>
                            <p className="text-sm text-muted-foreground">Active Contracts</p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="bg-card border-border">
                        <CardContent className="p-4">
                          <div className="text-center">
                            <Clock className="h-8 w-8 mx-auto mb-2 text-orange-400" />
                            <p className="text-sm text-foreground">
                              {formatDateTime(selectedCompany.lastActivity)}
                            </p>
                            <p className="text-sm text-muted-foreground">Last Activity</p>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </TabsContent>

                {/* Booking Requests Tab */}
                <TabsContent value="booking-requests" className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">Booking Requests</CardTitle>
                        <Button onClick={handleCreateBookingRequest}>
                          <Plus className="h-4 w-4 mr-2" />
                          New Request
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-foreground">Service</TableHead>
                            <TableHead className="text-foreground">Date</TableHead>
                            <TableHead className="text-foreground">Participants</TableHead>
                            <TableHead className="text-foreground">Budget</TableHead>
                            <TableHead className="text-foreground">Status</TableHead>
                            <TableHead className="text-foreground">Created</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {bookingRequests
                            .filter(req => req.companyId === selectedCompany.id)
                            .map((request) => (
                              <TableRow key={request.id} className="border-border">
                                <TableCell className="text-foreground">
                                  {request.service}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(request.date)}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {request.participants}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatCurrency(request.budget)}
                                </TableCell>
                                <TableCell>
                                  <Badge className={getRequestStatusColor(request.status)}>
                                    {request.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(request.createdAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Orders Tab */}
                <TabsContent value="orders" className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-foreground">Service</TableHead>
                            <TableHead className="text-foreground">Date</TableHead>
                            <TableHead className="text-foreground">Amount</TableHead>
                            <TableHead className="text-foreground">Participants</TableHead>
                            <TableHead className="text-foreground">Status</TableHead>
                            <TableHead className="text-foreground">Created</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {orders
                            .filter(order => order.companyId === selectedCompany.id)
                            .map((order) => (
                              <TableRow key={order.id} className="border-border">
                                <TableCell className="text-foreground">
                                  {order.service}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(order.date)}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatCurrency(order.amount)}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {order.participants}
                                </TableCell>
                                <TableCell>
                                  <Badge className={getOrderStatusColor(order.status)}>
                                    {order.status.replace('_', ' ')}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(order.createdAt)}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Invoices Tab */}
                <TabsContent value="invoices" className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground">Acts & Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-foreground">Invoice #</TableHead>
                            <TableHead className="text-foreground">Amount</TableHead>
                            <TableHead className="text-foreground">Status</TableHead>
                            <TableHead className="text-foreground">Due Date</TableHead>
                            <TableHead className="text-foreground">Created</TableHead>
                            <TableHead className="text-foreground">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invoices
                            .filter(invoice => invoice.companyId === selectedCompany.id)
                            .map((invoice) => (
                              <TableRow key={invoice.id} className="border-border">
                                <TableCell className="text-foreground">
                                  {invoice.number}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatCurrency(invoice.amount)}
                                </TableCell>
                                <TableCell>
                                  <Badge className={getInvoiceStatusColor(invoice.status)}>
                                    {invoice.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(invoice.dueDate)}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {formatDate(invoice.createdAt)}
                                </TableCell>
                                <TableCell>
                                  <div className="flex items-center gap-2">
                                    <Button size="sm" variant="outline">
                                      <Download className="h-4 w-4" />
                                    </Button>
                                    <Button size="sm" variant="outline">
                                      <Eye className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Participants Tab */}
                <TabsContent value="participants" className="space-y-6">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-foreground">Participants</CardTitle>
                        <Button>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Participant
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-border">
                            <TableHead className="text-foreground">Name</TableHead>
                            <TableHead className="text-foreground">Email</TableHead>
                            <TableHead className="text-foreground">Phone</TableHead>
                            <TableHead className="text-foreground">Role</TableHead>
                            <TableHead className="text-foreground">Status</TableHead>
                            <TableHead className="text-foreground">Last Login</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {participants
                            .filter(participant => participant.companyId === selectedCompany.id)
                            .map((participant) => (
                              <TableRow key={participant.id} className="border-border">
                                <TableCell>
                                  <div className="flex items-center gap-3">
                                    <Avatar className="w-8 h-8">
                                      <AvatarFallback className="bg-muted text-foreground">
                                        {participant.name.split(' ').map(n => n[0]).join('')}
                                      </AvatarFallback>
                                    </Avatar>
                                    <span className="text-foreground">
                                      {participant.name}
                                    </span>
                                  </div>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {participant.email}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {participant.phone}
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {participant.role}
                                </TableCell>
                                <TableCell>
                                  <Badge className={participant.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}>
                                    {participant.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-foreground">
                                  {participant.lastLogin ? formatDateTime(participant.lastLogin) : 'Never'}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      )}

      {/* Booking Request Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="max-w-2xl bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">New Booking Request</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Submit a new booking request for your company
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Service</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="helicopter-tour">Helicopter Tour</SelectItem>
                    <SelectItem value="yacht-charter">Yacht Charter</SelectItem>
                    <SelectItem value="jet-charter">Private Jet Charter</SelectItem>
                    <SelectItem value="luxury-car">Luxury Car Rental</SelectItem>
                    <SelectItem value="custom">Custom Package</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? formatDate(selectedDate.toISOString()) : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">Participants</label>
                <Input type="number" placeholder="Number of participants" min="1" />
              </div>
              
              <div>
                <label className="text-sm font-medium text-foreground">Budget (RUB)</label>
                <Input type="number" placeholder="Budget amount" />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">Description</label>
              <Textarea 
                placeholder="Describe your requirements..."
                rows={3}
              />
            </div>

            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowBookingDialog(false)}>
                Cancel
              </Button>
              <Button onClick={() => setShowBookingDialog(false)}>
                Submit Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}