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
  Building,
  Users,
  Calendar,
  FileText,
  DollarSign,
  TrendingUp,
  Package,
  Mail,
  Phone,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Archive,
  Star,
  Crown
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Progress } from "../../ui/progress";

interface GTSCorporateClientsModuleProps {
  onBack: () => void;
}

export function GTSCorporateClientsModule({ onBack }: GTSCorporateClientsModuleProps) {
  const [activeTab, setActiveTab] = useState("companies");
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const companies = [
    {
      id: "corp-001",
      name: "TechCorp International",
      industry: "Technology",
      tier: "Enterprise",
      contact: {
        name: "Elena Kozlova",
        title: "Events Manager", 
        email: "e.kozlova@techcorp.ru",
        phone: "+7 905 123-45-67"
      },
      address: "Moscow, Tverskaya 15",
      employees: 2500,
      revenue: 1850000,
      bookings: 24,
      packages: ["Premium Corporate", "Executive VIP"],
      lastBooking: "2024-11-25",
      joinDate: "2023-06-15",
      status: "active",
      privileges: ["Priority Booking", "Custom Rates", "Dedicated Manager"],
      upcomingEvents: 3
    },
    {
      id: "corp-002",
      name: "Investment Group Alpha",
      industry: "Finance",
      tier: "Premium",
      contact: {
        name: "Sergey Petrov",
        title: "Corporate Relations",
        email: "s.petrov@alpha.ru", 
        phone: "+7 903 987-65-43"
      },
      address: "St. Petersburg, Nevsky 88",
      employees: 850,
      revenue: 950000,
      bookings: 15,
      packages: ["Corporate Standard", "Weekend Package"],
      lastBooking: "2024-11-20",
      joinDate: "2023-09-10",
      status: "active",
      privileges: ["Flexible Cancellation", "Group Discounts"],
      upcomingEvents: 1
    },
    {
      id: "corp-003",
      name: "Manufacturing Solutions Ltd",
      industry: "Manufacturing",
      tier: "Standard",
      contact: {
        name: "Maria Volkova",
        title: "HR Director",
        email: "m.volkova@manufacturing.ru",
        phone: "+7 902 555-44-33"
      },
      address: "Sochi, Kurortny 45",
      employees: 320,
      revenue: 425000,
      bookings: 8,
      packages: ["Team Building Package"],
      lastBooking: "2024-10-15",
      joinDate: "2024-02-20",
      status: "active",
      privileges: ["Local Rates"],
      upcomingEvents: 0
    }
  ];

  const packages = [
    {
      id: "pkg-001",
      name: "Executive VIP Package",
      description: "Ultimate luxury experience for C-level executives",
      price: 450000,
      duration: "Full Day",
      includes: ["Private Yacht", "Helicopter Transfer", "Gourmet Catering", "Dedicated Crew"],
      tier: "Enterprise",
      bookings: 12,
      revenue: 5400000
    },
    {
      id: "pkg-002",
      name: "Premium Corporate Package", 
      description: "Professional experience for corporate events",
      price: 280000,
      duration: "Half Day",
      includes: ["Yacht Tour", "Business Lunch", "WiFi Access", "Presentation Setup"],
      tier: "Premium",
      bookings: 35,
      revenue: 9800000
    },
    {
      id: "pkg-003",
      name: "Team Building Package",
      description: "Engaging activities for team development",
      price: 125000,
      duration: "4 Hours",
      includes: ["Buggy Adventure", "Group Activities", "Team Lunch", "Photo Service"],
      tier: "Standard",
      bookings: 58,
      revenue: 7250000
    },
    {
      id: "pkg-004",
      name: "Corporate Standard Package",
      description: "Professional service for business meetings",
      price: 180000,
      duration: "3 Hours", 
      includes: ["Yacht Tour", "Meeting Space", "Light Refreshments"],
      tier: "Standard",
      bookings: 24,
      revenue: 4320000
    }
  ];

  const acts = [
    {
      id: "act-001",
      company: "TechCorp International",
      package: "Executive VIP Package",
      date: "2024-11-25",
      amount: 450000,
      status: "completed",
      participants: 12,
      services: ["Private Yacht", "Helicopter Transfer"],
      actNumber: "ACT-2024-001"
    },
    {
      id: "act-002",
      company: "Investment Group Alpha",
      package: "Premium Corporate Package",
      date: "2024-11-20",
      amount: 280000,
      status: "pending_signature",
      participants: 8,
      services: ["Yacht Tour", "Business Lunch"],
      actNumber: "ACT-2024-002"
    },
    {
      id: "act-003",
      company: "Manufacturing Solutions Ltd",
      package: "Team Building Package",
      date: "2024-10-15",
      amount: 125000,
      status: "signed",
      participants: 25,
      services: ["Buggy Adventure", "Team Activities"],
      actNumber: "ACT-2024-003"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500 text-white",
      inactive: "bg-gray-500 text-white",
      pending: "bg-yellow-500 text-white",
      completed: "bg-blue-500 text-white",
      pending_signature: "bg-orange-500 text-white",
      signed: "bg-green-500 text-white",
      cancelled: "bg-red-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getTierColor = (tier: string) => {
    const colors = {
      Enterprise: "text-purple-400",
      Premium: "text-yellow-400", 
      Standard: "text-blue-400"
    };
    return colors[tier as keyof typeof colors] || "text-gray-400";
  };

  const getTierIcon = (tier: string) => {
    const icons = {
      Enterprise: <Crown className="h-4 w-4" />,
      Premium: <Star className="h-4 w-4" />,
      Standard: <Building className="h-4 w-4" />
    };
    return icons[tier as keyof typeof icons] || <Building className="h-4 w-4" />;
  };

  const getIndustryColor = (industry: string) => {
    const colors = {
      Technology: "bg-blue-500/10 text-blue-400",
      Finance: "bg-green-500/10 text-green-400",
      Manufacturing: "bg-orange-500/10 text-orange-400",
      Healthcare: "bg-red-500/10 text-red-400",
      Retail: "bg-purple-500/10 text-purple-400"
    };
    return colors[industry as keyof typeof colors] || "bg-gray-500/10 text-gray-400";
  };

  const totalRevenue = companies.reduce((sum, company) => sum + company.revenue, 0);
  const totalBookings = companies.reduce((sum, company) => sum + company.bookings, 0);

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
              Back to Portal
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Corporate Clients (B2B)
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Manage corporate accounts, packages, and service agreements
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Archive className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              New Corporate Client
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
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Corporate Clients</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{companies.length}</p>
                </div>
                <Building className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Revenue</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽{(totalRevenue / 1000000).toFixed(1)}M</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Bookings</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{totalBookings}</p>
                </div>
                <Calendar className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Avg Deal Size</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽{(totalRevenue / totalBookings / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="companies">Companies ({companies.length})</TabsTrigger>
            <TabsTrigger value="packages">Packages ({packages.length})</TabsTrigger>
            <TabsTrigger value="acts">Service Acts ({acts.length})</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          {/* Companies Tab */}
          <TabsContent value="companies" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Corporate Clients</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search companies..." className="w-64" />
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Tiers</SelectItem>
                            <SelectItem value="enterprise">Enterprise</SelectItem>
                            <SelectItem value="premium">Premium</SelectItem>
                            <SelectItem value="standard">Standard</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {companies.map(company => (
                        <div 
                          key={company.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedCompany(company.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-500/10">
                              <Building className="h-8 w-8 text-blue-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{company.name}</h4>
                                <div className={`flex items-center gap-1 ${getTierColor(company.tier)}`}>
                                  {getTierIcon(company.tier)}
                                  <span className="text-xs font-medium">{company.tier}</span>
                                </div>
                              </div>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{company.contact.name} • {company.contact.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getIndustryColor(company.industry)}>
                                  {company.industry}
                                </Badge>
                                <Badge className={getStatusColor(company.status)}>
                                  {company.status}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-400">₽{(company.revenue / 1000).toFixed(0)}K</p>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              {company.bookings} bookings
                            </p>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              Last: {company.lastBooking}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Company Profile */}
              {selectedCompany && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Company Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const company = companies.find(c => c.id === selectedCompany)!;
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="p-4 rounded-lg bg-blue-500/10 inline-block mb-3">
                              <Building className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {company.name}
                            </h3>
                            <div className={`flex items-center justify-center gap-1 mt-1 ${getTierColor(company.tier)}`}>
                              {getTierIcon(company.tier)}
                              <span className="text-sm font-medium">{company.tier} Client</span>
                            </div>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Contact Information</p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {company.contact.name} - {company.contact.title}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {company.contact.email}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {company.contact.phone}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {company.address}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Company Details</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Employees</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{company.employees.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Industry</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{company.industry}</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Member Since</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{company.joinDate}</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Upcoming Events</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{company.upcomingEvents}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Privileges</p>
                              <div className="space-y-1">
                                {company.privileges.map((privilege, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span className="text-xs" style={{ color: 'var(--gts-portal-text)' }}>{privilege}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Performance</p>
                              <div className="grid grid-cols-2 gap-2 text-center">
                                <div>
                                  <p className="text-lg font-heading text-green-400">₽{(company.revenue / 1000).toFixed(0)}K</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Total Revenue</p>
                                </div>
                                <div>
                                  <p className="text-lg font-heading text-blue-400">{company.bookings}</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Total Bookings</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                              <Calendar className="h-4 w-4 mr-2" />
                              New Booking
                            </Button>
                            <Button variant="outline" className="w-full">
                              <FileText className="h-4 w-4 mr-2" />
                              View History
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Mail className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Packages Tab */}
          <TabsContent value="packages" className="mt-6">
            <div className="space-y-4">
              {packages.map(pkg => (
                <Card 
                  key={pkg.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <div className="flex items-center gap-2 mb-2">
                          <Package className="h-5 w-5 text-blue-400" />
                          <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{pkg.name}</h3>
                        </div>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{pkg.description}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={`${getTierColor(pkg.tier)} text-xs`} variant="outline">
                            {pkg.tier}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {pkg.duration}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽{(pkg.price / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Price</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-blue-400">{pkg.bookings}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Bookings</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-green-400">₽{(pkg.revenue / 1000000).toFixed(1)}M</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Revenue</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Calendar className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4">
                      <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Includes:</p>
                      <div className="flex flex-wrap gap-1">
                        {pkg.includes.map((item, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {item}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Service Acts Tab */}
          <TabsContent value="acts" className="mt-6">
            <div className="space-y-4">
              {acts.map(act => (
                <Card 
                  key={act.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{act.actNumber}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{act.company}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{act.package}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{act.date}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Service Date</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>{act.participants}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Participants</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-green-400">₽{(act.amount / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Amount</p>
                      </div>
                      <div className="text-center">
                        <Badge className={getStatusColor(act.status)}>
                          {act.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Revenue by Tier</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Corporate revenue distribution
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["Enterprise", "Premium", "Standard"].map((tier, index) => {
                      const tierRevenue = companies
                        .filter(c => c.tier === tier)
                        .reduce((sum, c) => sum + c.revenue, 0);
                      const percentage = (tierRevenue / totalRevenue) * 100;
                      
                      return (
                        <div key={tier} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <span className={getTierColor(tier)}>
                                {getTierIcon(tier)}
                              </span>
                              <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {tier}
                              </span>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                ₽{(tierRevenue / 1000).toFixed(0)}K
                              </span>
                              <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                {percentage.toFixed(1)}%
                              </p>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Package Performance</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Most popular corporate packages
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {packages
                      .sort((a, b) => b.bookings - a.bookings)
                      .slice(0, 4)
                      .map((pkg, index) => (
                        <div key={pkg.id} className="flex justify-between items-center">
                          <div>
                            <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {pkg.name}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              ₽{(pkg.price / 1000).toFixed(0)}K • {pkg.duration}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {pkg.bookings} bookings
                            </p>
                            <p className="text-xs text-green-400">
                              ₽{(pkg.revenue / 1000000).toFixed(1)}M revenue
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}