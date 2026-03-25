import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { 
  ArrowLeft,
  User,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Clock,
  TrendingUp,
  MessageSquare,
  FileText,
  Edit,
  Target,
  Activity,
  Brain,
  AlertTriangle,
  CheckCircle2,
  Eye,
  MoreHorizontal,
  Zap,
  Users,
  MapPin,
  Building
} from "lucide-react";
import { GTSDealConversationIntelligence } from "./GTSDealConversationIntelligence";

interface GTSDealCardProps {
  dealId: string;
  onBack: () => void;
  onNavigateToCalendar: () => void;
}

// Enhanced deal data
const mockDeal = {
  id: "deal-001",
  title: "Корпоративный VIP пакет - TechCorp",
  description: "Полный пакет вертолетных экскурсий и team building мероприятий для корпоративных клиентов TechCorp LLC",
  client: {
    id: "client-001",
    name: "Александр Петров",
    company: "TechCorp LLC",
    email: "a.petrov@techcorp.ru",
    phone: "+7 905 123-45-67",
    tier: "Enterprise",
    avatar: "",
    position: "CEO"
  },
  value: 450000,
  currency: "RUB",
  stage: "negotiation",
  probability: 75,
  closeDate: "2024-01-25",
  createdDate: "2024-01-10",
  owner: {
    name: "Анна Смирнова",
    email: "a.smirnova@gts.ru",
    avatar: ""
  },
  source: "Website",
  
  // Deal specifics
  services: [
    { name: "Helicopter VIP Tour", quantity: 2, price: 90000, duration: "4h each" },
    { name: "Team Building Package", quantity: 1, price: 150000, duration: "Full day" },
    { name: "Corporate Catering", quantity: 1, price: 45000, duration: "8h" },
    { name: "VIP Transportation", quantity: 1, price: 35000, duration: "Round trip" },
    { name: "Premium Insurance", quantity: 1, price: 25000, duration: "Event coverage" }
  ],
  
  timeline: [
    {
      date: "2024-01-10",
      event: "Deal created",
      description: "Initial inquiry received via website",
      user: "System",
      type: "created"
    },
    {
      date: "2024-01-11", 
      event: "First contact",
      description: "Discovery call completed with client",
      user: "Анна Смирнова",
      type: "call"
    },
    {
      date: "2024-01-13",
      event: "Proposal sent",
      description: "Detailed proposal with pricing sent to client",
      user: "Анна Смирнова", 
      type: "proposal"
    },
    {
      date: "2024-01-15",
      event: "Negotiation started",
      description: "Client requested modifications to package",
      user: "Александр Петров",
      type: "negotiation"
    }
  ],

  competitors: [
    { name: "SkyTours Premium", threat: "high", advantage: "Lower pricing", disadvantage: "Less experience" },
    { name: "Elite Adventures", threat: "medium", advantage: "Similar services", disadvantage: "No VIP options" },
    { name: "Corporate Events Co", threat: "low", advantage: "Event focus", disadvantage: "No aviation" }
  ],

  risks: [
    { risk: "Budget constraints", probability: 30, impact: "high", mitigation: "Flexible payment terms" },
    { risk: "Timeline pressure", probability: 50, impact: "medium", mitigation: "Priority scheduling" },
    { risk: "Competitor activity", probability: 25, impact: "high", mitigation: "Unique value proposition" }
  ]
};

export function GTSDealCard({ dealId, onBack, onNavigateToCalendar }: GTSDealCardProps) {
  const [activeTab, setActiveTab] = useState("overview");

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const getStageColor = (stage: string) => {
    const colors = {
      new: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      qualified: "bg-green-500/20 text-green-400 border-green-500/30", 
      proposal: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
      negotiation: "bg-orange-500/20 text-orange-400 border-orange-500/30",
      closed_won: "bg-green-600/20 text-green-300 border-green-600/30",
      closed_lost: "bg-red-500/20 text-red-400 border-red-500/30"
    };
    return colors[stage as keyof typeof colors] || "bg-gray-500/20 text-gray-400 border-gray-500/30";
  };

  const getRiskColor = (probability: number) => {
    if (probability <= 30) return "text-green-400";
    if (probability <= 60) return "text-yellow-400";
    return "text-red-400";
  };

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return "text-red-400 bg-red-500/10";
      case 'medium': return "text-yellow-400 bg-yellow-500/10";
      case 'low': return "text-green-400 bg-green-500/10";
      default: return "text-gray-400 bg-gray-500/10";
    }
  };

  const daysToClose = Math.ceil((new Date(mockDeal.closeDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к CRM
            </Button>
            <div className="flex items-center gap-4">
              <div>
                <h1 className="text-xl font-heading text-white">{mockDeal.title}</h1>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className={`text-xs ${getStageColor(mockDeal.stage)}`}>
                    {mockDeal.stage.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-[#A6A7AA]">{daysToClose} дней до закрытия</span>
                  <span className="text-sm text-[#A6A7AA]">•</span>
                  <span className="text-sm text-[#A6A7AA]">{mockDeal.probability}% вероятность</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCalendar}
              className="bg-blue-500 hover:bg-blue-600"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Календарь
            </Button>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Edit className="h-4 w-4 mr-2" />
              Редактировать
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Deal Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Сумма сделки</p>
                  <p className="text-lg font-heading text-white">₽{(mockDeal.value / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-green-400">+15% от первоначальной</p>
                </div>
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Вероятность</p>
                  <p className="text-lg font-heading text-white">{mockDeal.probability}%</p>
                  <p className="text-xs text-blue-400">Стадия: {mockDeal.stage}</p>
                </div>
                <Target className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Дней до закрытия</p>
                  <p className="text-lg font-heading text-white">{daysToClose}</p>
                  <p className="text-xs text-yellow-400">{formatDate(mockDeal.closeDate)}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-[#A6A7AA]">Услуги</p>
                  <p className="text-lg font-heading text-white">{mockDeal.services.length}</p>
                  <p className="text-xs text-purple-400">В пакете</p>
                </div>
                <Activity className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Card className="bg-[#121214] border-[#232428]">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <div className="border-b border-[#232428]">
              <TabsList className="grid w-full grid-cols-5 bg-transparent border-none h-auto p-4">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none"
                >
                  Обзор
                </TabsTrigger>
                <TabsTrigger 
                  value="intelligence" 
                  className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none"
                >
                  <Brain className="w-4 h-4 mr-1" />
                  AI Intelligence
                </TabsTrigger>
                <TabsTrigger 
                  value="timeline" 
                  className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none"
                >
                  Timeline
                </TabsTrigger>
                <TabsTrigger 
                  value="competitors" 
                  className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none"
                >
                  Конкуренты
                </TabsTrigger>
                <TabsTrigger 
                  value="risks" 
                  className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white border-none"
                >
                  Риски
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  {/* Deal Details */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white">Детали сделки</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="text-sm text-[#A6A7AA] mb-1">Описание</div>
                        <div className="text-white">{mockDeal.description}</div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-[#A6A7AA] mb-1">Источник</div>
                          <div className="text-white">{mockDeal.source}</div>
                        </div>
                        <div>
                          <div className="text-sm text-[#A6A7AA] mb-1">Создано</div>
                          <div className="text-white">{formatDate(mockDeal.createdDate)}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Services */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white">Услуги в пакете</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {mockDeal.services.map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-[#232428] rounded">
                            <div>
                              <div className="text-white font-medium">{service.name}</div>
                              <div className="text-xs text-[#A6A7AA]">
                                Количество: {service.quantity} • Длительность: {service.duration}
                              </div>
                            </div>
                            <div className="text-white font-medium">
                              ₽{service.price.toLocaleString()}
                            </div>
                          </div>
                        ))}
                        
                        <Separator className="bg-[#232428]" />
                        
                        <div className="flex items-center justify-between p-3 bg-[#91040C]/10 rounded">
                          <div className="text-white font-medium">Итого</div>
                          <div className="text-white font-heading text-lg">
                            ₽{mockDeal.value.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  {/* Client Info */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white">Клиент</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarFallback className="bg-[#232428] text-white">
                            {mockDeal.client.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-medium">{mockDeal.client.name}</div>
                          <div className="text-sm text-[#A6A7AA]">{mockDeal.client.position}</div>
                          <Badge className="bg-[#91040C]/20 text-[#91040C] border-[#91040C]/30 text-xs mt-1">
                            {mockDeal.client.tier}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-[#A6A7AA]" />
                          <span className="text-white text-sm">{mockDeal.client.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-[#A6A7AA]" />
                          <span className="text-white text-sm">{mockDeal.client.email}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-[#A6A7AA]" />
                          <span className="text-white text-sm">{mockDeal.client.phone}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Owner Info */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white">Ответственный</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-[#232428] text-white">
                            {mockDeal.owner.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white font-medium">{mockDeal.owner.name}</div>
                          <div className="text-sm text-[#A6A7AA]">{mockDeal.owner.email}</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Quick Actions */}
                  <Card className="bg-[#17181A] border-[#232428]">
                    <CardHeader>
                      <CardTitle className="text-white">Быстрые действия</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Написать клиенту
                      </Button>
                      <Button className="w-full bg-blue-500 hover:bg-blue-600">
                        <Phone className="w-4 h-4 mr-2" />
                        Запланировать звонок
                      </Button>
                      <Button 
                        className="w-full bg-green-500 hover:bg-green-600"
                        onClick={() => setActiveTab('intelligence')}
                      >
                        <Brain className="w-4 w-4 mr-2" />
                        AI Intelligence
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* AI Intelligence Tab - Full Conversation Intelligence */}
            <TabsContent value="intelligence" className="p-0">
              <GTSDealConversationIntelligence 
                dealId={dealId}
                onNavigateToCalendar={onNavigateToCalendar}
              />
            </TabsContent>

            {/* Timeline Tab */}
            <TabsContent value="timeline" className="p-6">
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Timeline событий</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDeal.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 bg-[#91040C] rounded-full"></div>
                          {index < mockDeal.timeline.length - 1 && (
                            <div className="w-px h-8 bg-[#232428] mt-2"></div>
                          )}
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-white">{event.event}</h4>
                            <span className="text-xs text-[#A6A7AA]">{formatDate(event.date)}</span>
                          </div>
                          <p className="text-sm text-[#A6A7AA] mb-1">{event.description}</p>
                          <span className="text-xs text-blue-400">{event.user}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Competitors Tab */}
            <TabsContent value="competitors" className="p-6">
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Анализ конкурентов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDeal.competitors.map((competitor, index) => (
                      <Card key={index} className="bg-[#232428] border-[#2A2B2F]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">{competitor.name}</h4>
                            <Badge className={`text-xs ${getThreatColor(competitor.threat)}`}>
                              {competitor.threat} threat
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-[#A6A7AA]">Преимущество: </span>
                              <span className="text-green-400">{competitor.advantage}</span>
                            </div>
                            <div>
                              <span className="text-[#A6A7AA]">Недостаток: </span>
                              <span className="text-red-400">{competitor.disadvantage}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Risks Tab */}
            <TabsContent value="risks" className="p-6">
              <Card className="bg-[#17181A] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Управление рисками</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockDeal.risks.map((risk, index) => (
                      <Card key={index} className="bg-[#232428] border-[#2A2B2F]">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-white">{risk.risk}</h4>
                            <div className="flex items-center gap-2">
                              <span className={`text-xs ${getRiskColor(risk.probability)}`}>
                                {risk.probability}%
                              </span>
                              <Badge variant="outline" className="text-xs border-[#232428] text-[#A6A7AA]">
                                {risk.impact}
                              </Badge>
                            </div>
                          </div>
                          <div className="text-sm">
                            <span className="text-[#A6A7AA]">Митигация: </span>
                            <span className="text-blue-400">{risk.mitigation}</span>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}