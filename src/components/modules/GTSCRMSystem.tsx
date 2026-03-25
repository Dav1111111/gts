import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { GTSStyles, GTSComponents, getStatusColor, getStatusText } from "../../utils/gts-styles";
import { 
  Users,
  UserPlus,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Phone,
  Mail,
  Calendar,
  Settings,
  Zap,
  PieChart,
  MoveRight,
  MoreHorizontal,
  Star,
  Building2,
  Clock,
  ArrowUpDown
} from "lucide-react";

interface NavigationContext {
  sourceModule?: string;
  targetData?: any;
  action?: string;
}

interface GTSCRMSystemProps {
  onBackToHome: () => void;
  onCreateBooking?: (dealData: any) => void;
  navigationContext?: NavigationContext;
}

const mockLeads = [
  {
    id: '1',
    name: 'Александр Петров',
    email: 'a.petrov@email.com',
    phone: '+7 (999) 123-45-67',
    source: 'Сайт',
    interest: 'Морская прогулка',
    status: 'new',
    score: 85,
    created: '2024-02-10',
    lastContact: '2024-02-10',
    value: 45000
  },
  {
    id: '2',
    name: 'ООО "Инновации"',
    email: 'info@innovations.ru',
    phone: '+7 (495) 123-45-67',
    source: 'Реклама',
    interest: 'Корпоративное мероприятие',
    status: 'qualified',
    score: 92,
    created: '2024-02-08',
    lastContact: '2024-02-12',
    value: 250000
  },
  {
    id: '3',
    name: 'Елена Сидорова',
    email: 'e.sidorova@gmail.com',
    phone: '+7 (903) 987-65-43',
    source: 'Соцсети',
    interest: 'Вертолетная экскурсия',
    status: 'contacted',
    score: 78,
    created: '2024-02-05',
    lastContact: '2024-02-11',
    value: 85000
  },
  {
    id: '4',
    name: 'Михаил Козлов',
    email: 'm.kozlov@tech.ru',
    phone: '+7 (926) 888-99-00',
    source: 'Рекомендация',
    interest: 'Багги тур',
    status: 'converted',
    score: 96,
    created: '2024-02-01',
    lastContact: '2024-02-14',
    value: 35000
  },
  {
    id: '5',
    name: 'ИП Волкова',
    email: 'volkova@business.com',
    phone: '+7 (812) 777-66-55',
    source: 'Партнер',
    interest: 'VIP пакет',
    status: 'lost',
    score: 65,
    created: '2024-01-28',
    lastContact: '2024-02-09',
    value: 120000
  }
];

const mockClients = [
  {
    id: '1',
    name: 'Михаил Иванов',
    email: 'm.ivanov@company.ru',
    phone: '+7 (926) 555-11-22',
    segment: 'VIP',
    totalSpent: 450000,
    bookings: 12,
    lastBooking: '2024-02-01',
    membership: 'Gold',
    satisfaction: 4.9,
    lifetime: 24,
    avgOrder: 37500
  },
  {
    id: '2',
    name: 'ООО "Технопром"',
    email: 'orders@technoprom.ru',
    phone: '+7 (495) 777-88-99',
    segment: 'Corporate',
    totalSpent: 1250000,
    bookings: 8,
    lastBooking: '2024-01-28',
    membership: 'Platinum',
    satisfaction: 4.7,
    lifetime: 18,
    avgOrder: 156250
  },
  {
    id: '3',
    name: 'Анна Петрова',
    email: 'anna.p@example.com',
    phone: '+7 (903) 444-33-22',
    segment: 'Premium',
    totalSpent: 280000,
    bookings: 6,
    lastBooking: '2024-02-05',
    membership: 'Silver',
    satisfaction: 4.8,
    lifetime: 12,
    avgOrder: 46667
  }
];

const mockDeals = [
  {
    id: '1',
    title: 'Корпоративная регата',
    client: 'ООО "Инновации"',
    value: 250000,
    stage: 'proposal',
    probability: 70,
    closeDate: '2024-02-25',
    assignedTo: 'Елена Смирнова',
    created: '2024-02-08',
    lastActivity: '2024-02-12',
    source: 'Реклама'
  },
  {
    id: '2',
    title: 'VIP морская прогулка',
    client: 'Александр Петров',
    value: 85000,
    stage: 'negotiation',
    probability: 85,
    closeDate: '2024-02-20',
    assignedTo: 'Иван Козлов',
    created: '2024-02-10',
    lastActivity: '2024-02-14',
    source: 'Сайт'
  },
  {
    id: '3',
    title: 'Багги приключение',
    client: 'Михаил Козлов',
    value: 35000,
    stage: 'qualified',
    probability: 60,
    closeDate: '2024-02-22',
    assignedTo: 'Анна Волкова',
    created: '2024-02-01',
    lastActivity: '2024-02-13',
    source: 'Рекомендация'
  },
  {
    id: '4',
    title: 'Командное мероприятие',
    client: 'ООО "Стартап"',
    value: 180000,
    stage: 'lead',
    probability: 40,
    closeDate: '2024-03-01',
    assignedTo: 'Дмитрий Петров',
    created: '2024-02-12',
    lastActivity: '2024-02-14',
    source: 'Соцсети'
  },
  {
    id: '5',
    title: 'Эксклюзивный тур',
    client: 'ИП Волкова',
    value: 120000,
    stage: 'closed-lost',
    probability: 0,
    closeDate: '2024-02-15',
    assignedTo: 'Елена Смирнова',
    created: '2024-01-28',
    lastActivity: '2024-02-09',
    source: 'Партнер'
  }
];

// Kanban stages
const dealStages = [
  { id: 'lead', name: 'Лиды', color: 'bg-blue-500' },
  { id: 'qualified', name: 'Квалификация', color: 'bg-yellow-500' },
  { id: 'proposal', name: 'Предложение', color: 'bg-orange-500' },
  { id: 'negotiation', name: 'Переговоры', color: 'bg-purple-500' },
  { id: 'closed-won', name: 'Выиграно', color: 'bg-green-500' },
  { id: 'closed-lost', name: 'Проиграно', color: 'bg-red-500' }
];

export function GTSCRMSystem({ onBackToHome, onCreateBooking, navigationContext }: GTSCRMSystemProps) {
  const [activeTab, setActiveTab] = useState(
    navigationContext?.action === 'createLeadFromContent' ? 'leads' : 'deals'
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterSource, setFilterSource] = useState('all');

  const filteredLeads = mockLeads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         lead.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    const matchesSource = filterSource === 'all' || lead.source === filterSource;
    return matchesSearch && matchesStatus && matchesSource;
  });

  const getStageColor = (stage: string) => {
    const stageInfo = dealStages.find(s => s.id === stage);
    return stageInfo ? stageInfo.color : 'bg-gray-500';
  };

  const getStageText = (stage: string) => {
    const stageInfo = dealStages.find(s => s.id === stage);
    return stageInfo ? stageInfo.name : stage;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 70) return 'text-yellow-400';
    if (score >= 50) return 'text-orange-400';
    return 'text-red-400';
  };

  const getDealsByStage = (stage: string) => {
    return mockDeals.filter(deal => deal.stage === stage);
  };

  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={GTSComponents.pageHeader}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className={GTSStyles.buttons.ghost}
            >
              <ArrowLeft className={GTSStyles.icons.button} />
            </Button>
            
            <div>
              <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                CRM - Управление отношениями
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Канбан сделок • Лиды с фильтрами • Профили клиентов
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`${GTSStyles.icons.small} absolute left-3 top-1/2 -translate-y-1/2 text-white/60`} />
              <Input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-64 pl-10 pr-4 py-2 ${GTSStyles.inputs.default}`}
              />
            </div>
            
            <Button className={GTSStyles.buttons.primary}>
              <Plus className={GTSStyles.icons.button} />
              Добавить
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`${GTSStyles.cards.surface} grid grid-cols-5 w-full max-w-3xl mx-auto`}>
            <TabsTrigger value="deals" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <DollarSign className={GTSStyles.icons.small} />
              Сделки
            </TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Target className={GTSStyles.icons.small} />
              Лиды
            </TabsTrigger>
            <TabsTrigger value="clients" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Users className={GTSStyles.icons.small} />
              Клиенты
            </TabsTrigger>
            <TabsTrigger value="automations" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <Zap className={GTSStyles.icons.small} />
              Автоматизация
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              <PieChart className={GTSStyles.icons.small} />
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Deals Kanban */}
          <TabsContent value="deals" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Канбан сделок</h2>
              <div className="flex gap-3">
                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={GTSStyles.cards.content}>
                    <SelectItem value="all">Все источники</SelectItem>
                    <SelectItem value="Сайт">Сайт</SelectItem>
                    <SelectItem value="Реклама">Реклама</SelectItem>
                    <SelectItem value="Соцсети">Соцсети</SelectItem>
                    <SelectItem value="Рекомендация">Рекомендация</SelectItem>
                  </SelectContent>
                </Select>
                <Button className={GTSStyles.buttons.primary}>
                  <Plus className={GTSStyles.icons.button} />
                  Новая сделка
                </Button>
              </div>
            </div>

            {/* Kanban Board */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 overflow-x-auto">
              {dealStages.map((stage) => {
                const stageDeals = getDealsByStage(stage.id);
                const stageValue = stageDeals.reduce((sum, deal) => sum + deal.value, 0);
                
                return (
                  <div key={stage.id} className={GTSStyles.cards.surface}>
                    {/* Stage Header */}
                    <div className="p-4 border-b border-[#232428]">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <h3 className={`${GTSStyles.text.primary} font-medium text-sm`}>
                          {stage.name}
                        </h3>
                        <Badge className="bg-white/10 text-white/80 text-xs">
                          {stageDeals.length}
                        </Badge>
                      </div>
                      <div className={`${GTSStyles.text.muted} text-xs`}>
                        ₽{stageValue.toLocaleString()}
                      </div>
                    </div>

                    {/* Stage Cards */}
                    <div className="p-3 space-y-3 min-h-[400px]">
                      {stageDeals.map((deal) => (
                        <div 
                          key={deal.id}
                          className={`${GTSStyles.cards.content} p-3 cursor-pointer ${GTSStyles.cards.hover}`}
                        >
                          <div className="mb-2">
                            <h4 className={`${GTSStyles.text.primary} font-medium text-sm mb-1`}>
                              {deal.title}
                            </h4>
                            <p className={`${GTSStyles.text.muted} text-xs`}>
                              {deal.client}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mb-2">
                            <div className={`${GTSStyles.text.primary} font-medium text-sm`}>
                              ₽{deal.value.toLocaleString()}
                            </div>
                            <div className={`text-xs ${deal.probability >= 70 ? 'text-green-400' : deal.probability >= 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                              {deal.probability}%
                            </div>
                          </div>

                          <div className="space-y-1 text-xs">
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-white/40" />
                              <span className={GTSStyles.text.muted}>
                                {new Date(deal.closeDate).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="w-3 h-3 text-white/40" />
                              <span className={GTSStyles.text.muted}>
                                {deal.assignedTo}
                              </span>
                            </div>
                          </div>

                          <div className="flex justify-between mt-3">
                            <Badge className={`text-xs px-2 py-1 bg-blue-500/20 text-blue-400 border border-blue-500/30`}>
                              {deal.source}
                            </Badge>
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                <Eye className="w-3 h-3" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="ghost" 
                                onClick={() => onCreateBooking && onCreateBooking(deal)}
                                className={GTSStyles.buttons.ghost}
                              >
                                <Calendar className="w-3 h-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      {stageDeals.length === 0 && (
                        <div className="text-center py-8">
                          <div className={`${GTSStyles.text.muted} text-xs`}>
                            Нет сделок
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </TabsContent>

          {/* Leads Table */}
          <TabsContent value="leads" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Лиды с фильтрами</h2>
              <div className="flex items-center gap-3">
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={GTSStyles.cards.content}>
                    <SelectItem value="all">Все статусы</SelectItem>
                    <SelectItem value="new">Новые</SelectItem>
                    <SelectItem value="qualified">Квалифицированы</SelectItem>
                    <SelectItem value="contacted">Контакт</SelectItem>
                    <SelectItem value="converted">Конверсия</SelectItem>
                    <SelectItem value="lost">Потеряны</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterSource} onValueChange={setFilterSource}>
                  <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={GTSStyles.cards.content}>
                    <SelectItem value="all">Все источники</SelectItem>
                    <SelectItem value="Сайт">Сайт</SelectItem>
                    <SelectItem value="Реклама">Реклама</SelectItem>
                    <SelectItem value="Соцсети">Соцсети</SelectItem>
                    <SelectItem value="Рекомендация">Рекомендация</SelectItem>
                  </SelectContent>
                </Select>
                <Button className={GTSStyles.buttons.primary}>
                  <UserPlus className={GTSStyles.icons.button} />
                  Новый лид
                </Button>
              </div>
            </div>

            <Card className={GTSStyles.cards.surface}>
              <Table>
                <TableHeader>
                  <TableRow className="border-[#232428] hover:bg-[#1E1F21]/50">
                    <TableHead className={GTSStyles.text.primary}>
                      <div className="flex items-center gap-1">
                        Лид <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className={GTSStyles.text.primary}>Контакты</TableHead>
                    <TableHead className={GTSStyles.text.primary}>Статус</TableHead>
                    <TableHead className={GTSStyles.text.primary}>Источник</TableHead>
                    <TableHead className={GTSStyles.text.primary}>
                      <div className="flex items-center gap-1">
                        Скоринг <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className={GTSStyles.text.primary}>
                      <div className="flex items-center gap-1">
                        Потенциал <ArrowUpDown className="w-3 h-3" />
                      </div>
                    </TableHead>
                    <TableHead className={GTSStyles.text.primary}>Действия</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredLeads.map((lead) => (
                    <TableRow key={lead.id} className="border-[#232428] hover:bg-[#1E1F21]/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#91040C]/20 flex items-center justify-center">
                            <span className={`${GTSStyles.text.primary} text-sm font-medium`}>
                              {lead.name[0]}
                            </span>
                          </div>
                          <div>
                            <div className={`${GTSStyles.text.primary} font-medium`}>{lead.name}</div>
                            <div className={`${GTSStyles.text.muted} text-sm`}>{lead.interest}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className={`${GTSStyles.text.muted} text-sm flex items-center gap-1`}>
                            <Mail className="w-3 h-3" />
                            {lead.email}
                          </div>
                          <div className={`${GTSStyles.text.muted} text-sm flex items-center gap-1`}>
                            <Phone className="w-3 h-3" />
                            {lead.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(lead.status)} border rounded-lg text-xs`}>
                          {getStatusText(lead.status)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs">
                          {lead.source}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <div className={`font-medium ${getScoreColor(lead.score)}`}>
                            {lead.score}
                          </div>
                          <div className="w-12 h-2 bg-gray-700 rounded-full overflow-hidden">
                            <div 
                              className={`h-full ${getScoreColor(lead.score).replace('text-', 'bg-')}`}
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className={`${GTSStyles.text.primary} font-medium`}>
                          ₽{lead.value.toLocaleString()}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                            <Phone className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                            <Mail className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                            <Eye className="w-3 h-3" />
                          </Button>
                          <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                            <MoreHorizontal className="w-3 h-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </TabsContent>

          {/* Client Profiles */}
          <TabsContent value="clients" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>Профили клиентов</h2>
              <Button className={GTSStyles.buttons.primary}>
                <UserPlus className={GTSStyles.icons.button} />
                Новый клиент
              </Button>
            </div>

            <div className="grid gap-6">
              {mockClients.map((client) => (
                <Card key={client.id} className={GTSStyles.cards.surface}>
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                          <span className="text-white text-xl font-medium">{client.name[0]}</span>
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className={`${GTSStyles.text.primary} text-xl font-medium`}>{client.name}</h3>
                            <Badge className="bg-purple-500/20 text-purple-400 border border-purple-500/30">
                              {client.membership}
                            </Badge>
                            <Badge className="bg-blue-500/20 text-blue-400 border border-blue-500/30">
                              {client.segment}
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className={`${GTSStyles.text.muted} flex items-center gap-2`}>
                              <Mail className="w-4 h-4" />
                              {client.email}
                            </div>
                            <div className={`${GTSStyles.text.muted} flex items-center gap-2`}>
                              <Phone className="w-4 h-4" />
                              {client.phone}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`${GTSStyles.text.primary} text-2xl font-semibold mb-1`}>
                          ₽{client.totalSpent.toLocaleString()}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-sm`}>
                          Общие траты
                        </div>
                      </div>
                    </div>

                    {/* Client Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                      <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                        <div className={`${GTSStyles.text.primary} text-lg font-semibold`}>
                          {client.bookings}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>
                          Бронирований
                        </div>
                      </div>
                      
                      <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                        <div className={`${GTSStyles.text.primary} text-lg font-semibold`}>
                          ₽{client.avgOrder.toLocaleString()}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>
                          Средний чек
                        </div>
                      </div>

                      <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                        <div className={`${GTSStyles.text.primary} text-lg font-semibold flex items-center justify-center gap-1`}>
                          <Star className="w-4 h-4 text-yellow-400" />
                          {client.satisfaction}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>
                          Рейтинг
                        </div>
                      </div>

                      <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                        <div className={`${GTSStyles.text.primary} text-lg font-semibold`}>
                          {client.lifetime}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>
                          Месяцев с нами
                        </div>
                      </div>

                      <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                        <div className={`${GTSStyles.text.primary} text-lg font-semibold`}>
                          {new Date(client.lastBooking).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                        </div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>
                          Последний заказ
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => onCreateBooking && onCreateBooking({
                          clientId: client.id,
                          clientName: client.name,
                          clientEmail: client.email,
                          prefilledData: {
                            type: 'booking',
                            priority: 'high',
                            source: 'crm_client'
                          }
                        })}
                        className={GTSStyles.buttons.primary}
                      >
                        <Calendar className={GTSStyles.icons.button} />
                        Забронировать
                      </Button>
                      <Button className={GTSStyles.buttons.secondary}>
                        <Eye className={GTSStyles.icons.button} />
                        Профиль
                      </Button>
                      <Button className={GTSStyles.buttons.secondary}>
                        <Phone className={GTSStyles.icons.button} />
                        Связаться
                      </Button>
                      <Button className={GTSStyles.buttons.secondary}>
                        <Mail className={GTSStyles.icons.button} />
                        Email
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Automations & Analytics - Placeholder */}
          <TabsContent value="automations">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-12 text-center">
                <Zap className={`w-16 h-16 mx-auto mb-4 ${GTSStyles.text.muted} opacity-50`} />
                <p className={GTSStyles.text.muted}>Автоматизация процессов - в разработке</p>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-12 text-center">
                <PieChart className={`w-16 h-16 mx-auto mb-4 ${GTSStyles.text.muted} opacity-50`} />
                <p className={GTSStyles.text.muted}>Аналитика и отчёты - в разработке</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}