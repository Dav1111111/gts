import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Separator } from "../../ui/separator";
import { 
  ArrowLeft, 
  Plus, 
  User, 
  Mail, 
  Phone, 
  Building, 
  Target,
  UserPlus,
  Users,
  TrendingUp,
  Calendar
} from "lucide-react";
import { GTSQuickAddLead } from "./GTSQuickAddLead";

interface GTSNewLeadDemoProps {
  onBack: () => void;
}

interface Lead {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  source: string;
  status: string;
  score: number;
  owner: string;
  createdAt: string;
  lastActivity: string;
  priority?: string;
  serviceType?: string;
  expectedBudget?: number;
  tags?: string[];
}

const initialLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Александр Петров",
    company: "TechCorp LLC", 
    email: "a.petrov@techcorp.ru",
    phone: "+7 905 123-45-67",
    source: "Website",
    status: "hot",
    score: 92,
    owner: "Maria Smirnova",
    createdAt: "2024-12-01",
    lastActivity: "2 часа назад"
  },
  {
    id: "lead-002",
    name: "Ольга Козлова", 
    company: "Premium Events",
    email: "o.kozlova@events.ru",
    phone: "+7 903 987-65-43",
    source: "Referral",
    status: "warm",
    score: 78,
    owner: "Dmitri Volkov",
    createdAt: "2024-11-29",
    lastActivity: "1 день назад"
  }
];

export function GTSNewLeadDemo({ onBack }: GTSNewLeadDemoProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const handleLeadCreated = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
    setSelectedLead(newLead.id);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      hot: "text-red-400 bg-red-500/10",
      warm: "text-yellow-400 bg-yellow-500/10", 
      cold: "text-blue-400 bg-blue-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getStatusText = (status: string) => {
    const texts = {
      hot: "Горячий",
      warm: "Теплый",
      cold: "Холодный"
    };
    return texts[status as keyof typeof texts] || status;
  };

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
            <div>
              <h1 className="text-2xl font-heading text-white">
                Демо: Добавление нового лида
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Тестируйте новую функциональность добавления лидов в CRM системе
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <GTSQuickAddLead onLeadCreated={handleLeadCreated} />
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Всего лидов</p>
                  <p className="text-2xl font-heading text-white">{leads.length}</p>
                  <p className="text-xs text-green-400">
                    +{leads.length - initialLeads.length} новых
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Горячие лиды</p>
                  <p className="text-2xl font-heading text-white">
                    {leads.filter(l => l.status === 'hot').length}
                  </p>
                  <p className="text-xs text-red-400">Высокий приоритет</p>
                </div>
                <TrendingUp className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Средний рейтинг</p>
                  <p className="text-2xl font-heading text-white">
                    {Math.round(leads.reduce((acc, lead) => acc + lead.score, 0) / leads.length)}%
                  </p>
                  <p className="text-xs text-green-400">Качество лидов</p>
                </div>
                <Target className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Сегодня</p>
                  <p className="text-2xl font-heading text-white">
                    {leads.filter(l => l.createdAt === new Date().toISOString().split('T')[0]).length}
                  </p>
                  <p className="text-xs text-blue-400">Новые лиды</p>
                </div>
                <Calendar className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Leads List */}
          <div className="lg:col-span-2">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-white">База лидов</CardTitle>
                  <GTSQuickAddLead 
                    variant="text" 
                    onLeadCreated={handleLeadCreated}
                  />
                </div>
                <CardDescription className="text-[#A6A7AA]">
                  Управляйте вашими потенциальными клиентами
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {leads.map(lead => (
                    <Card 
                      key={lead.id}
                      className={`cursor-pointer transition-colors border ${
                        selectedLead === lead.id 
                          ? "bg-[#91040C]/10 border-[#91040C]" 
                          : "bg-[#17181A] border-[#232428] hover:bg-[#1A1B1D]"
                      }`}
                      onClick={() => setSelectedLead(lead.id)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarFallback className="bg-[#232428] text-white">
                                {lead.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h4 className="font-heading text-white">{lead.name}</h4>
                              <p className="text-sm text-[#A6A7AA]">{lead.company}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                                  {getStatusText(lead.status)}
                                </Badge>
                                <span className="text-xs text-[#A6A7AA]">{lead.source}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm text-white">Score: {lead.score}%</span>
                            </div>
                            <p className="text-xs text-[#A6A7AA]">Владелец: {lead.owner}</p>
                            <p className="text-xs text-[#A6A7AA]">{lead.lastActivity}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Lead Details */}
          <div>
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">Детали лида</CardTitle>
                {!selectedLead && (
                  <CardDescription className="text-[#A6A7AA]">
                    Выберите лид для просмотра деталей
                  </CardDescription>
                )}
              </CardHeader>
              <CardContent>
                {selectedLead ? (() => {
                  const lead = leads.find(l => l.id === selectedLead);
                  if (!lead) return null;
                  
                  return (
                    <div className="space-y-6">
                      {/* Lead Info */}
                      <div className="text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-[#232428] text-white text-lg">
                            {lead.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-heading text-white">{lead.name}</h3>
                        <p className="text-sm text-[#A6A7AA]">{lead.company}</p>
                        <Badge className={`mt-2 ${getStatusColor(lead.status)}`}>
                          {getStatusText(lead.status)} • {lead.score}%
                        </Badge>
                      </div>

                      <Separator className="bg-[#232428]" />

                      {/* Contact Info */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Контактная информация</h4>
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-sm text-white">{lead.email}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-sm text-white">{lead.phone}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Building className="h-4 w-4 text-[#A6A7AA]" />
                            <span className="text-sm text-white">{lead.company}</span>
                          </div>
                        </div>
                      </div>

                      <Separator className="bg-[#232428]" />

                      {/* Lead Properties */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Дополнительная информация</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-[#A6A7AA]">Источник:</span>
                            <span className="text-white">{lead.source}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A6A7AA]">Создан:</span>
                            <span className="text-white">{lead.createdAt}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-[#A6A7AA]">Ответственный:</span>
                            <span className="text-white">{lead.owner}</span>
                          </div>
                          {lead.expectedBudget && (
                            <div className="flex justify-between">
                              <span className="text-[#A6A7AA]">Бюджет:</span>
                              <span className="text-white">₽{lead.expectedBudget.toLocaleString()}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Tags */}
                      {lead.tags && lead.tags.length > 0 && (
                        <>
                          <Separator className="bg-[#232428]" />
                          <div className="space-y-3">
                            <h4 className="font-medium text-white">Теги</h4>
                            <div className="flex flex-wrap gap-2">
                              {lead.tags.map((tag, index) => (
                                <Badge
                                  key={index}
                                  variant="secondary"
                                  className="bg-[#232428] text-white border-[#2A2B2F]"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator className="bg-[#232428]" />

                      {/* Quick Actions */}
                      <div className="space-y-3">
                        <h4 className="font-medium text-white">Быстрые действия</h4>
                        <div className="grid grid-cols-1 gap-2">
                          <Button size="sm" className="bg-blue-500 hover:bg-blue-600">
                            <Phone className="h-4 w-4 mr-2" />
                            Позвонить
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Mail className="h-4 w-4 mr-2" />
                            Написать email
                          </Button>
                          <Button size="sm" className="bg-green-500 hover:bg-green-600">
                            <Calendar className="h-4 w-4 mr-2" />
                            Назначить встречу
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })() : (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 mx-auto mb-4 text-[#A6A7AA]" />
                    <p className="text-[#A6A7AA] mb-4">
                      Выберите лид из списка для просмотра подробной информации
                    </p>
                    <GTSQuickAddLead 
                      variant="text"
                      onLeadCreated={handleLeadCreated}
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}