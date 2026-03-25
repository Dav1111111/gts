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
  Headphones,
  Users,
  Clock,
  Star,
  MessageSquare,
  Calendar,
  Phone,
  Mail,
  MapPin,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Award,
  Heart,
  Sparkles,
  Crown,
  Zap
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface GTSConciergeModuleProps {
  onBack: () => void;
  onNavigateToCRM: () => void;
}

export function GTSConciergeModule({ onBack, onNavigateToCRM }: GTSConciergeModuleProps) {
  const [activeTab, setActiveTab] = useState("requests");
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null);

  const requests = [
    {
      id: "conc-001",
      title: "Private Dinner on Yacht with Chef Service",
      client: "Alexandra Petrov",
      clientTier: "VIP",
      email: "a.petrov@luxury.ru",
      phone: "+7 905 123-45-67",
      description: "Exclusive private dinner for anniversary celebration with Michelin star chef and live music",
      category: "Dining Experience",
      priority: "high",
      status: "active",
      assignee: "Elena Kozlova",
      budget: 350000,
      requestDate: "2024-12-01",
      preferredDate: "2024-12-15",
      guests: 2,
      requirements: ["Michelin Chef", "Live Music", "Flower Arrangements", "Photographer"],
      notes: "25th wedding anniversary, very important client"
    },
    {
      id: "conc-002",
      title: "Helicopter Transfer to Mountain Resort",
      client: "Sergey Mikhailov",
      clientTier: "Premium",
      email: "s.mikhailov@corp.ru", 
      phone: "+7 903 987-65-43",
      description: "Urgent helicopter transfer to exclusive mountain resort with luxury ground transport",
      category: "Transportation",
      priority: "urgent",
      status: "planning",
      assignee: "Viktor Sokolov",
      budget: 180000,
      requestDate: "2024-12-02",
      preferredDate: "2024-12-05",
      guests: 4,
      requirements: ["Weather Backup Plan", "Ground Transport", "Resort Coordination"],
      notes: "Client has mobility requirements"
    },
    {
      id: "conc-003",
      title: "Corporate Team Building Adventure",
      client: "Maria Volkova",
      clientTier: "Corporate",
      email: "m.volkova@tech.ru",
      phone: "+7 902 555-44-33",
      description: "Multi-day adventure experience combining yacht, helicopter, and mountain activities",
      category: "Corporate Event",
      priority: "medium",
      status: "completed",
      assignee: "Alexey Petrov",
      budget: 850000,
      requestDate: "2024-11-20",
      preferredDate: "2024-11-28",
      guests: 25,
      requirements: ["Team Activities", "Catering", "Accommodation", "Transportation"],
      notes: "Annual company retreat, excellent feedback received"
    }
  ];

  const conciergeServices = [
    {
      category: "Luxury Dining",
      icon: <Award className="h-5 w-5" />,
      services: ["Private Chef Service", "Exclusive Restaurant Reservations", "Wine Tastings", "Culinary Experiences"],
      requests: 12,
      avgBudget: 85000
    },
    {
      category: "Transportation",
      icon: <Zap className="h-5 w-5" />,
      services: ["Private Jet Coordination", "Luxury Car Service", "Helicopter Transfers", "Yacht Charters"],
      requests: 18,
      avgBudget: 145000
    },
    {
      category: "Entertainment",
      icon: <Sparkles className="h-5 w-5" />,
      services: ["Private Concerts", "Cultural Events", "Art Gallery Access", "Theater Bookings"],
      requests: 8,
      avgBudget: 125000
    },
    {
      category: "Wellness & Spa",
      icon: <Heart className="h-5 w-5" />,
      services: ["Spa Treatments", "Wellness Retreats", "Fitness Training", "Medical Tourism"],
      requests: 15,
      avgBudget: 95000
    },
    {
      category: "Special Events",
      icon: <Crown className="h-5 w-5" />,
      services: ["Wedding Planning", "Anniversary Celebrations", "Birthday Parties", "Corporate Events"],
      requests: 22,
      avgBudget: 275000
    }
  ];

  const completedRequests = [
    {
      id: "comp-001",
      title: "VIP Helicopter Wedding Transfer",
      client: "Elena & Pavel",
      rating: 5,
      feedback: "Absolutely perfect experience! The team went above and beyond to make our special day magical.",
      value: 420000,
      date: "2024-11-25"
    },
    {
      id: "comp-002",
      title: "Private Yacht Birthday Celebration",
      client: "Dmitri Kuznetsov",
      rating: 5,
      feedback: "Exceptional service, attention to detail was incredible. Will definitely book again!",
      value: 380000,
      date: "2024-11-20"
    },
    {
      id: "comp-003",
      title: "Corporate Executive Retreat",
      client: "Tech Solutions Inc",
      rating: 4,
      feedback: "Great organization, minor timing issues but overall excellent experience.",
      value: 950000,
      date: "2024-11-15"
    }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-blue-500 text-white",
      planning: "bg-yellow-500 text-white",
      completed: "bg-green-500 text-white",
      cancelled: "bg-red-500 text-white",
      on_hold: "bg-gray-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      urgent: "text-red-400",
      high: "text-orange-400",
      medium: "text-yellow-400",
      low: "text-green-400"
    };
    return colors[priority as keyof typeof colors] || "text-gray-400";
  };

  const getTierColor = (tier: string) => {
    const colors = {
      VIP: "text-purple-400",
      Premium: "text-yellow-400",
      Corporate: "text-blue-400",
      Standard: "text-gray-400"
    };
    return colors[tier as keyof typeof colors] || "text-gray-400";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Dining Experience": "bg-orange-500/10 text-orange-400",
      "Transportation": "bg-blue-500/10 text-blue-400", 
      "Corporate Event": "bg-purple-500/10 text-purple-400",
      "Entertainment": "bg-pink-500/10 text-pink-400",
      "Wellness": "bg-green-500/10 text-green-400"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-400";
  };

  const totalRequests = requests.length;
  const activeRequests = requests.filter(r => r.status === 'active' || r.status === 'planning').length;
  const avgBudget = requests.reduce((sum, r) => sum + r.budget, 0) / requests.length;
  const avgRating = completedRequests.reduce((sum, r) => sum + r.rating, 0) / completedRequests.length;

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
                Concierge Service
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Premium request management and personalized services
              </p>
            </div>
            <Badge className="bg-purple-500/10 text-purple-400 border-purple-400">
              <Sparkles className="h-3 w-3 mr-1" />
              Future Feature
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCRM}
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              CRM Integration
            </Button>
            <Button className="bg-purple-500 hover:bg-purple-600">
              <Plus className="h-4 w-4 mr-2" />
              New Request
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
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Requests</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{totalRequests}</p>
                </div>
                <Headphones className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Active Requests</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{activeRequests}</p>
                </div>
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Avg Budget</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽{(avgBudget / 1000).toFixed(0)}K</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Avg Rating</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{avgRating.toFixed(1)}</p>
                </div>
                <Star className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Active Requests ({activeRequests})</TabsTrigger>
            <TabsTrigger value="services">Service Catalog</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Active Requests Tab */}
          <TabsContent value="requests" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Concierge Requests</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search requests..." className="w-64" />
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="planning">Planning</SelectItem>
                            <SelectItem value="urgent">Urgent</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {requests.map(request => (
                        <div 
                          key={request.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedRequest(request.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-purple-500/10">
                              <Headphones className="h-6 w-6 text-purple-400" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{request.title}</h4>
                                <span className={`text-xs font-medium ${getPriorityColor(request.priority)}`}>
                                  {request.priority.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                {request.client} • {request.guests} guests
                              </p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={getCategoryColor(request.category)}>
                                  {request.category}
                                </Badge>
                                <Badge className={getStatusColor(request.status)}>
                                  {request.status}
                                </Badge>
                                <span className={`text-xs ${getTierColor(request.clientTier)}`}>
                                  {request.clientTier}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-400">₽{(request.budget / 1000).toFixed(0)}K</p>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              Due: {request.preferredDate}
                            </p>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {request.assignee}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Request Details */}
              {selectedRequest && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Request Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const request = requests.find(r => r.id === selectedRequest)!;
                      return (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <Headphones className="h-5 w-5 text-purple-400" />
                              <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {request.title}
                              </h3>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <Badge className={getStatusColor(request.status)}>
                                {request.status}
                              </Badge>
                              <Badge className={`${getPriorityColor(request.priority)} text-xs`} variant="outline">
                                {request.priority.toUpperCase()}
                              </Badge>
                              <Badge className={`${getTierColor(request.clientTier)} text-xs`} variant="outline">
                                {request.clientTier}
                              </Badge>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                              {request.description}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Client Information</p>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2">
                                  <Users className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {request.client}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Mail className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {request.email}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Phone className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {request.phone}
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Request Details</p>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Budget</p>
                                  <p className="font-medium text-green-400">₽{(request.budget / 1000).toFixed(0)}K</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Guests</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{request.guests}</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Requested</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{request.requestDate}</p>
                                </div>
                                <div>
                                  <p style={{ color: 'var(--gts-portal-muted)' }}>Preferred Date</p>
                                  <p style={{ color: 'var(--gts-portal-text)' }}>{request.preferredDate}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Requirements</p>
                              <div className="space-y-1">
                                {request.requirements.map((req, index) => (
                                  <div key={index} className="flex items-center gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-400" />
                                    <span className="text-xs" style={{ color: 'var(--gts-portal-text)' }}>{req}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {request.notes && (
                              <div>
                                <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Notes</p>
                                <p className="text-sm p-2 rounded-lg" style={{ 
                                  color: 'var(--gts-portal-text)', 
                                  backgroundColor: 'var(--gts-portal-bg)' 
                                }}>
                                  {request.notes}
                                </p>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-purple-500 hover:bg-purple-600"
                              onClick={onNavigateToCRM}
                            >
                              <Users className="h-4 w-4 mr-2" />
                              Create CRM Lead
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Calendar className="h-4 w-4 mr-2" />
                              Schedule Planning
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact Client
                            </Button>
                            {request.priority === 'urgent' && (
                              <Button className="w-full bg-red-500 hover:bg-red-600">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Mark Urgent
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })()}
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Service Catalog Tab */}
          <TabsContent value="services" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {conciergeServices.map((service, index) => (
                <Card 
                  key={index}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                          {service.icon}
                        </div>
                        <div>
                          <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                            {service.category}
                          </h3>
                          <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                            {service.requests} requests
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        {service.services.map((item, serviceIndex) => (
                          <div key={serviceIndex} className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-purple-400" />
                            <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between items-center pt-2 border-t" style={{ borderColor: 'var(--gts-portal-border)' }}>
                        <div>
                          <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Avg Budget</p>
                          <p className="font-medium text-green-400">₽{(service.avgBudget / 1000).toFixed(0)}K</p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Completed Requests Tab */}
          <TabsContent value="completed" className="mt-6">
            <div className="space-y-4">
              {completedRequests.map(request => (
                <Card 
                  key={request.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div className="md:col-span-2">
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{request.title}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{request.client}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Completed: {request.date}</p>
                      </div>
                      <div className="text-center">
                        <div className="flex items-center justify-center">
                          {Array.from({ length: request.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Rating</p>
                      </div>
                      <div className="text-center">
                        <p className="font-medium text-green-400">₽{(request.value / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Value</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                      <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                        "{request.feedback}"
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Service Performance</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Request distribution by category
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {conciergeServices.map((service, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <span className="text-purple-400">{service.icon}</span>
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {service.category}
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {service.requests} requests
                            </span>
                            <p className="text-xs text-green-400">
                              ₽{(service.avgBudget / 1000).toFixed(0)}K avg
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Client Satisfaction</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Service quality metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center p-6 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                      <div className="text-4xl font-heading mb-2" style={{ color: 'var(--gts-portal-text)' }}>
                        {avgRating.toFixed(1)}
                      </div>
                      <div className="flex items-center justify-center mb-2">
                        {Array.from({ length: Math.floor(avgRating) }).map((_, i) => (
                          <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Average Rating</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                          {completedRequests.length}
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Completed</p>
                      </div>
                      <div className="text-center p-4 rounded-lg" style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                        <div className="text-xl font-heading text-green-400">
                          96%
                        </div>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Satisfaction</p>
                      </div>
                    </div>
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