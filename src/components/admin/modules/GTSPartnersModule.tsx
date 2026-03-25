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
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  MessageSquare,
  Building,
  Handshake,
  Award,
  AlertCircle,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  MapPin
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Progress } from "../../ui/progress";

interface GTSPartnersModuleProps {
  onBack: () => void;
  onNavigateToFinance: () => void;
}

export function GTSPartnersModule({ onBack, onNavigateToFinance }: GTSPartnersModuleProps) {
  const [activeTab, setActiveTab] = useState("agents");
  const [selectedPartner, setSelectedPartner] = useState<string | null>(null);

  const partners = {
    agents: [
      {
        id: "agent-001",
        name: "Premium Travel Agency",
        contact: "Elena Kozlova",
        email: "e.kozlova@premium.ru",
        phone: "+7 905 123-45-67",
        commission: 15,
        leads: 45,
        conversions: 12,
        revenue: 450000,
        status: "active",
        tier: "gold",
        joined: "2023-03-15"
      },
      {
        id: "agent-002",
        name: "Elite Events Moscow",
        contact: "Sergey Petrov", 
        email: "s.petrov@elite.ru",
        phone: "+7 903 987-65-43",
        commission: 12,
        leads: 23,
        conversions: 8,
        revenue: 280000,
        status: "active",
        tier: "silver",
        joined: "2023-06-20"
      }
    ],
    contractors: [
      {
        id: "contractor-001",
        name: "Marine Services Ltd",
        contact: "Viktor Smirnov",
        email: "v.smirnov@marine.ru", 
        phone: "+7 902 555-44-33",
        services: ["Boat Maintenance", "Crew Training"],
        sla: 98,
        costs: 125000,
        efficiency: 94,
        status: "active",
        contracts: 3,
        joined: "2023-01-10"
      },
      {
        id: "contractor-002",
        name: "Aviation Support",
        contact: "Maria Volkova",
        email: "m.volkova@aviation.ru",
        phone: "+7 901 777-88-99", 
        services: ["Helicopter Maintenance", "Pilot Services"],
        sla: 96,
        costs: 180000,
        efficiency: 91,
        status: "active",
        contracts: 2,
        joined: "2023-04-05"
      }
    ],
    brands: [
      {
        id: "brand-001",
        name: "Luxury Hotels Group",
        contact: "Anna Petrova",
        email: "a.petrova@luxury.ru",
        phone: "+7 904 321-98-76",
        category: "Hospitality",
        bonuses: 85000,
        crossPromo: 12,
        reach: 250000,
        status: "active",
        campaigns: 5,
        joined: "2023-02-28"
      },
      {
        id: "brand-002", 
        name: "Tech Solutions Corp",
        contact: "Pavel Kuznetsov",
        email: "p.kuznetsov@tech.ru",
        phone: "+7 906 654-32-10",
        category: "Technology",
        bonuses: 45000,
        crossPromo: 8,
        reach: 150000,
        status: "active",
        campaigns: 3,
        joined: "2023-05-12"
      }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500",
      pending: "bg-yellow-500",
      inactive: "bg-red-500",
      suspended: "bg-gray-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getTierColor = (tier: string) => {
    const colors = {
      platinum: "text-purple-400",
      gold: "text-yellow-400",
      silver: "text-gray-400",
      bronze: "text-orange-400"
    };
    return colors[tier as keyof typeof colors] || "text-gray-400";
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Hospitality": "bg-blue-500/10 text-blue-400",
      "Technology": "bg-purple-500/10 text-purple-400",
      "Finance": "bg-green-500/10 text-green-400",
      "Entertainment": "bg-pink-500/10 text-pink-400"
    };
    return colors[category as keyof typeof colors] || "bg-gray-500/10 text-gray-400";
  };

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
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Управление партнёрами
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Управление агентами, подрядчиками и бренд-партнёрами
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToFinance}
              variant="outline"
            >
              <DollarSign className="h-4 w-4 mr-2" />
              Финансы
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Добавить партнёра
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
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Всего партнёров</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>28</p>
                </div>
                <Handshake className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Доходы от партнёров</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽730K</p>
                </div>
                <TrendingUp className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Avg Commission</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>13.5%</p>
                </div>
                <DollarSign className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Active Leads</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>68</p>
                </div>
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="agents">Agents ({partners.agents.length})</TabsTrigger>
            <TabsTrigger value="contractors">Contractors ({partners.contractors.length})</TabsTrigger>
            <TabsTrigger value="brands">Brand Partners ({partners.brands.length})</TabsTrigger>
          </TabsList>

          {/* Agents Tab */}
          <TabsContent value="agents" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Partner Agents</CardTitle>
                      <div className="flex items-center gap-2">
                        <Input placeholder="Search agents..." className="w-64" />
                        <Button variant="outline" size="sm">
                          <Filter className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {partners.agents.map(agent => (
                        <div 
                          key={agent.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedPartner(agent.id)}
                        >
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback>{agent.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{agent.name}</h4>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{agent.contact}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`${getStatusColor(agent.status)} text-white text-xs`}>
                                  {agent.status}
                                </Badge>
                                <Badge className={`${getTierColor(agent.tier)} text-xs`} variant="outline">
                                  {agent.tier}
                                </Badge>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-green-400">₽{(agent.revenue / 1000).toFixed(0)}K</p>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              {agent.commission}% commission
                            </p>
                            <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                              {agent.leads} leads • {agent.conversions} conversions
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Agent Profile */}
              {selectedPartner && partners.agents.find(a => a.id === selectedPartner) && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Agent Profile</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const agent = partners.agents.find(a => a.id === selectedPartner)!;
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <Avatar className="h-16 w-16 mx-auto mb-2">
                              <AvatarFallback className="text-lg">
                                {agent.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {agent.name}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              {agent.contact}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                              <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                {agent.email}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                              <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                {agent.phone}
                              </span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>KPIs</p>
                              <div className="space-y-2">
                                <div className="flex justify-between">
                                  <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Conversion Rate</span>
                                  <span className="text-xs" style={{ color: 'var(--gts-portal-text)' }}>
                                    {((agent.conversions / agent.leads) * 100).toFixed(1)}%
                                  </span>
                                </div>
                                <Progress value={(agent.conversions / agent.leads) * 100} className="h-2" />
                                
                                <div className="flex justify-between">
                                  <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Commission</span>
                                  <span className="text-xs" style={{ color: 'var(--gts-portal-text)' }}>
                                    {agent.commission}%
                                  </span>
                                </div>
                                <Progress value={agent.commission} className="h-2" />
                              </div>
                            </div>

                            <div>
                              <p className="text-sm font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>Finance</p>
                              <div className="grid grid-cols-2 gap-2 text-center">
                                <div>
                                  <p className="text-lg font-heading text-green-400">₽{(agent.revenue / 1000).toFixed(0)}K</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Total Revenue</p>
                                </div>
                                <div>
                                  <p className="text-lg font-heading text-blue-400">₽{((agent.revenue * agent.commission) / 100000).toFixed(0)}K</p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Commission</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button 
                              className="w-full bg-blue-500 hover:bg-blue-600"
                              onClick={onNavigateToFinance}
                            >
                              <DollarSign className="h-4 w-4 mr-2" />
                              View Payouts
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact
                            </Button>
                            <Button variant="outline" className="w-full">
                              <FileText className="h-4 w-4 mr-2" />
                              Documents
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

          {/* Contractors Tab */}
          <TabsContent value="contractors" className="mt-6">
            <div className="space-y-4">
              {partners.contractors.map(contractor => (
                <Card 
                  key={contractor.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-4 items-center">
                      <div>
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{contractor.name}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{contractor.contact}</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {contractor.services.map((service, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {service}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-green-400">{contractor.sla}%</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>SLA</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽{(contractor.costs / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Monthly Cost</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-blue-400">{contractor.efficiency}%</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Efficiency</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <FileText className="h-4 w-4 mr-1" />
                          SLA
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={onNavigateToFinance}
                          className="bg-green-500 hover:bg-green-600"
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Finance
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Brand Partners Tab */}
          <TabsContent value="brands" className="mt-6">
            <div className="space-y-4">
              {partners.brands.map(brand => (
                <Card 
                  key={brand.id}
                  style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}
                >
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center">
                      <div>
                        <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{brand.name}</h3>
                        <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>{brand.contact}</p>
                        <Badge className={getCategoryColor(brand.category)}>
                          {brand.category}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-green-400">₽{(brand.bonuses / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Bonuses</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>{brand.crossPromo}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Cross-Promo</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-blue-400">{(brand.reach / 1000).toFixed(0)}K</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Reach</p>
                      </div>
                      <div className="text-center">
                        <p className="text-lg font-heading text-purple-400">{brand.campaigns}</p>
                        <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>Campaigns</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Award className="h-4 w-4 mr-1" />
                          Promo
                        </Button>
                        <Button 
                          size="sm"
                          onClick={onNavigateToFinance}
                          className="bg-purple-500 hover:bg-purple-600"
                        >
                          <DollarSign className="h-4 w-4 mr-1" />
                          Bonuses
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}