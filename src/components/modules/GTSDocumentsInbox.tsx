import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Input } from "../ui/input";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  FileText,
  Inbox,
  Upload,
  Download,
  ArrowLeft,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Clock,
  AlertTriangle,
  CheckCircle,
  Archive,
  CalendarDays,
  Building,
  Shield,
  FileCheck,
  AlertCircle,
  XCircle,
  Mail,
  Phone,
  User
} from "lucide-react";

interface GTSDocumentsInboxProps {
  onBackToHome: () => void;
  navigationContext?: any;
}

const mockDocuments = [
  {
    id: '1',
    name: 'Договор с ООО "Морской Флот"',
    type: 'Договор подряда',
    status: 'active',
    uploadDate: '2024-01-15',
    expiryDate: '2025-01-15',
    size: '2.4 MB',
    format: 'PDF',
    category: 'Contracts',
    priority: 'normal',
    author: 'Елена Смирнова',
    daysToExpiry: 365
  },
  {
    id: '2',
    name: 'Страховой полис Robinson R44',
    type: 'Страхование',
    status: 'expiring',
    uploadDate: '2023-02-20',
    expiryDate: '2024-02-25',
    size: '1.8 MB',
    format: 'PDF',
    category: 'Insurance',
    priority: 'high',
    author: 'Михаил Козлов',
    daysToExpiry: 3
  },
  {
    id: '3',
    name: 'Лицензия на морские перевозки',
    type: 'Лицензия',
    status: 'active',
    uploadDate: '2023-06-10',
    expiryDate: '2028-06-10',
    size: '1.2 MB',
    format: 'PDF',
    category: 'Licenses',
    priority: 'normal',
    author: 'Анна Петрова',
    daysToExpiry: 1461
  },
  {
    id: '4',
    name: 'Акт выполненных работ #0024',
    type: 'Акт',
    status: 'pending',
    uploadDate: '2024-02-10',
    expiryDate: null,
    size: '890 KB',
    format: 'PDF',
    category: 'Acts',
    priority: 'normal',
    author: 'Дмитрий Сидоров',
    daysToExpiry: null
  },
  {
    id: '5',
    name: 'Сертификат безопасности персонала',
    type: 'Сертификат',
    status: 'expired',
    uploadDate: '2022-12-01',
    expiryDate: '2024-02-01',
    size: '1.5 MB',
    format: 'PDF',
    category: 'Certificates',
    priority: 'high',
    author: 'Владимир Иванов',
    daysToExpiry: -13
  },
  {
    id: '6',
    name: 'Полис ОСАГО для транспорта',
    type: 'Страхование',
    status: 'expiring',
    uploadDate: '2023-02-28',
    expiryDate: '2024-02-28',
    size: '980 KB',
    format: 'PDF',
    category: 'Insurance',
    priority: 'medium',
    author: 'Ольга Волкова',
    daysToExpiry: 16
  }
];

const mockInboxItems = [
  {
    id: '1',
    from: 'Налоговая служба',
    subject: 'Требование о предоставлении документов',
    received: '2024-02-12',
    priority: 'high',
    status: 'unread',
    type: 'official',
    description: 'Требуется предоставить отчетность за Q4 2023 до 20.02.2024',
    deadline: '2024-02-20',
    contact: '+7 (495) 913-69-99'
  },
  {
    id: '2',
    from: 'ООО "Страховая компания"',
    subject: 'Уведомление о продлении полиса',
    received: '2024-02-10',
    priority: 'medium',
    status: 'read',
    type: 'notification',
    description: 'Напоминание о необходимости продления страхового полиса Robinson R44',
    deadline: '2024-02-25',
    contact: 'policy@insurance.ru'
  },
  {
    id: '3',
    from: 'Роспотребнадзор',
    subject: 'Плановая проверка',
    received: '2024-02-08',
    priority: 'high',
    status: 'processing',
    type: 'official',
    description: 'Уведомление о проведении плановой проверки 20.02.2024',
    deadline: '2024-02-20',
    contact: '+7 (862) 264-31-23'
  },
  {
    id: '4',
    from: 'Морской порт Сочи',
    subject: 'Обновление требований безопасности',
    received: '2024-02-14',
    priority: 'medium',
    status: 'unread',
    type: 'information',
    description: 'Введены новые требования к сертификации персонала',
    deadline: '2024-03-01',
    contact: 'safety@port-sochi.ru'
  }
];

const documentCategories = [
  { id: 'all', name: 'Все документы', count: mockDocuments.length, icon: FileText },
  { id: 'contracts', name: 'Договоры', count: mockDocuments.filter(d => d.category === 'Contracts').length, icon: Building },
  { id: 'insurance', name: 'Страхование', count: mockDocuments.filter(d => d.category === 'Insurance').length, icon: Shield },
  { id: 'licenses', name: 'Лицензии', count: mockDocuments.filter(d => d.category === 'Licenses').length, icon: FileCheck },
  { id: 'certificates', name: 'Сертификаты', count: mockDocuments.filter(d => d.category === 'Certificates').length, icon: CheckCircle },
  { id: 'acts', name: 'Акты', count: mockDocuments.filter(d => d.category === 'Acts').length, icon: FileText }
];

export function GTSDocumentsInbox({ onBackToHome, navigationContext }: GTSDocumentsInboxProps) {
  const [activeTab, setActiveTab] = useState(
    navigationContext?.targetData?.tab || 'documents'
  );
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'expiring': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'expired': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'unread': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'read': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      case 'processing': return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активен';
      case 'expiring': return 'Истекает';
      case 'expired': return 'Просрочен';
      case 'pending': return 'Ожидает';
      case 'unread': return 'Не прочитано';
      case 'read': return 'Прочитано';
      case 'processing': return 'В обработке';
      default: return status;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high': return 'Высокий';
      case 'medium': return 'Средний';
      case 'low': return 'Низкий';
      default: return 'Обычный';
    }
  };

  const getExpiryWarning = (daysToExpiry: number | null) => {
    if (daysToExpiry === null) return null;
    if (daysToExpiry < 0) return { color: 'text-red-400', text: `Просрочен на ${Math.abs(daysToExpiry)} дней`, icon: XCircle };
    if (daysToExpiry <= 7) return { color: 'text-red-400', text: `Истекает через ${daysToExpiry} дней`, icon: AlertTriangle };
    if (daysToExpiry <= 30) return { color: 'text-yellow-400', text: `Истекает через ${daysToExpiry} дней`, icon: AlertCircle };
    return null;
  };

  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesCategory = selectedCategory === 'all' || doc.category.toLowerCase() === selectedCategory;
    const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         doc.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || doc.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || doc.priority === filterPriority;
    return matchesCategory && matchesSearch && matchesStatus && matchesPriority;
  });

  const filteredInbox = mockInboxItems.filter(item => {
    const matchesSearch = item.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.from.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
    const matchesPriority = filterPriority === 'all' || item.priority === filterPriority;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  // Statistics
  const expiredCount = mockDocuments.filter(d => d.status === 'expired').length;
  const expiringCount = mockDocuments.filter(d => d.status === 'expiring').length;
  const unreadCount = mockInboxItems.filter(i => i.status === 'unread').length;
  const urgentCount = mockInboxItems.filter(i => i.priority === 'high').length;

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
                Документооборот
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Единый тёмный список с цветными тегами состояний
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className={`${GTSStyles.icons.small} absolute left-3 top-1/2 -translate-y-1/2 text-white/60`} />
              <Input
                type="text"
                placeholder="Поиск документов..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-64 pl-10 pr-4 py-2 ${GTSStyles.inputs.default}`}
              />
            </div>
            
            <Button className={GTSStyles.buttons.primary}>
              <Upload className={GTSStyles.icons.button} />
              Загрузить
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={`${GTSStyles.backgrounds.surface} border-b ${GTSStyles.borders.default} p-4`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>{mockDocuments.length}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Всего документов</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-red-400 font-semibold">{expiredCount}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Просроченных</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-yellow-400 font-semibold">{expiringCount}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Истекает срок</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-blue-400 font-semibold">{unreadCount}</div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>Непрочитанных</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className={`${GTSStyles.cards.surface} grid grid-cols-3 w-full max-w-md`}>
              <TabsTrigger value="documents" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
                <FileText className={GTSStyles.icons.small} />
                Документы
              </TabsTrigger>
              <TabsTrigger value="inbox" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
                <Inbox className={GTSStyles.icons.small} />
                Входящие
              </TabsTrigger>
              <TabsTrigger value="archive" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
                <Archive className={GTSStyles.icons.small} />
                Архив
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={GTSStyles.cards.content}>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="active">Активные</SelectItem>
                  <SelectItem value="expiring">Истекающие</SelectItem>
                  <SelectItem value="expired">Просроченные</SelectItem>
                  <SelectItem value="pending">Ожидают</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className={GTSStyles.cards.content}>
                  <SelectItem value="all">Все приоритеты</SelectItem>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Documents */}
          <TabsContent value="documents" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Categories Sidebar */}
              <Card className={GTSStyles.cards.surface}>
                <div className="p-4 border-b border-[#232428]">
                  <h3 className={GTSComponents.cardTitle}>Категории</h3>
                </div>
                
                <div className="p-4 space-y-2">
                  {documentCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => setSelectedCategory(category.id)}
                        className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all duration-200 ${
                          selectedCategory === category.id
                            ? `${GTSStyles.backgrounds.accent} text-white`
                            : `${GTSStyles.cards.hover}`
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComponent className="w-4 h-4" />
                          <span className="text-sm">{category.name}</span>
                        </div>
                        <Badge className="bg-white/10 text-white/80 text-xs">
                          {category.count}
                        </Badge>
                      </button>
                    );
                  })}
                </div>
              </Card>

              {/* Documents List */}
              <div className="lg:col-span-3 space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                    {documentCategories.find(c => c.id === selectedCategory)?.name}
                    <span className={`${GTSStyles.text.muted} text-sm font-normal ml-2`}>
                      ({filteredDocuments.length})
                    </span>
                  </h2>
                  <Button className={GTSStyles.buttons.primary}>
                    <Plus className={GTSStyles.icons.button} />
                    Новый документ
                  </Button>
                </div>

                <div className="space-y-4">
                  {filteredDocuments.map((document) => {
                    const expiryWarning = getExpiryWarning(document.daysToExpiry);
                    return (
                      <Card key={document.id} className={`${GTSStyles.cards.content} p-4 ${GTSStyles.cards.hover}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-4 flex-1">
                            <div className="w-12 h-12 rounded-xl bg-[#91040C]/20 flex items-center justify-center">
                              <FileText className={`${GTSStyles.icons.medium} text-[#91040C]`} />
                            </div>
                            
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-3 mb-2">
                                <h3 className={`${GTSStyles.text.primary} font-medium`}>{document.name}</h3>
                                {expiryWarning && (
                                  <div className="flex items-center gap-1">
                                    <expiryWarning.icon className={`w-4 h-4 ${expiryWarning.color}`} />
                                    <span className={`text-xs ${expiryWarning.color}`}>
                                      {expiryWarning.text}
                                    </span>
                                  </div>
                                )}
                              </div>
                              
                              <p className={`text-sm ${GTSStyles.text.muted} mb-2`}>{document.type}</p>
                              
                              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                                <div className="flex items-center gap-2">
                                  <CalendarDays className="w-3 h-3 text-white/40" />
                                  <span className={GTSStyles.text.muted}>
                                    {new Date(document.uploadDate).toLocaleDateString('ru-RU')}
                                  </span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <FileText className="w-3 h-3 text-white/40" />
                                  <span className={GTSStyles.text.muted}>
                                    {document.format} • {document.size}
                                  </span>
                                </div>
                                {document.expiryDate && (
                                  <div className="flex items-center gap-2">
                                    <Clock className="w-3 h-3 text-white/40" />
                                    <span className={GTSStyles.text.muted}>
                                      {new Date(document.expiryDate).toLocaleDateString('ru-RU')}
                                    </span>
                                  </div>
                                )}
                                <div className="flex items-center gap-2">
                                  <User className="w-3 h-3 text-white/40" />
                                  <span className={GTSStyles.text.muted}>
                                    {document.author}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex flex-col gap-2">
                              <Badge className={`${getStatusColor(document.status)} border rounded-lg text-xs`}>
                                {getStatusText(document.status)}
                              </Badge>
                              <Badge className={`${getPriorityColor(document.priority)} border rounded-lg text-xs`}>
                                {getPriorityText(document.priority)}
                              </Badge>
                            </div>
                            
                            <div className="flex gap-1">
                              <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                <Eye className={GTSStyles.icons.button} />
                              </Button>
                              <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                <Download className={GTSStyles.icons.button} />
                              </Button>
                              <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                                <Edit className={GTSStyles.icons.button} />
                              </Button>
                              <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
                                <Trash2 className={GTSStyles.icons.button} />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </div>
          </TabsContent>

          {/* Inbox */}
          <TabsContent value="inbox" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className={`${GTSStyles.text.primary} text-lg font-medium`}>
                Входящие документы и уведомления
                <span className={`${GTSStyles.text.muted} text-sm font-normal ml-2`}>
                  ({filteredInbox.length})
                </span>
              </h2>
              <Button className={GTSStyles.buttons.secondary}>
                Отметить как прочитанное
              </Button>
            </div>

            <div className="space-y-4">
              {filteredInbox.map((item) => (
                <Card key={item.id} className={`${GTSStyles.cards.content} p-4 ${
                  item.status === 'unread' ? 'border-l-4 border-l-blue-400' : ''
                } ${GTSStyles.cards.hover}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
                        <Inbox className={`${GTSStyles.icons.medium} text-blue-400`} />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className={`${GTSStyles.text.primary} font-medium`}>{item.subject}</h3>
                          {item.priority === 'high' && (
                            <AlertTriangle className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                        
                        <p className={`text-sm ${GTSStyles.text.muted} mb-1`}>От: {item.from}</p>
                        <p className={`text-sm ${GTSStyles.text.muted} mb-3`}>{item.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2">
                            <Clock className="w-3 h-3 text-white/40" />
                            <span className={GTSStyles.text.muted}>
                              {new Date(item.received).toLocaleDateString('ru-RU')}
                            </span>
                          </div>
                          {item.deadline && (
                            <div className="flex items-center gap-2">
                              <CalendarDays className="w-3 h-3 text-red-400" />
                              <span className="text-red-400">
                                До {new Date(item.deadline).toLocaleDateString('ru-RU')}
                              </span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            {item.contact.includes('@') ? (
                              <Mail className="w-3 h-3 text-white/40" />
                            ) : (
                              <Phone className="w-3 h-3 text-white/40" />
                            )}
                            <span className={GTSStyles.text.muted}>
                              {item.contact}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex flex-col gap-2">
                        <Badge className={`${getStatusColor(item.status)} border rounded-lg text-xs`}>
                          {getStatusText(item.status)}
                        </Badge>
                        <Badge className={`${getPriorityColor(item.priority)} border rounded-lg text-xs`}>
                          {getPriorityText(item.priority)}
                        </Badge>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button size="sm" variant="ghost" className={GTSStyles.buttons.ghost}>
                          <Eye className={GTSStyles.icons.button} />
                        </Button>
                        {item.status === 'unread' && (
                          <Button size="sm" className={GTSStyles.buttons.primary}>
                            <CheckCircle className={GTSStyles.icons.button} />
                            Обработать
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Archive */}
          <TabsContent value="archive">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-12 text-center">
                <Archive className={`w-16 h-16 mx-auto mb-4 ${GTSStyles.text.muted} opacity-50`} />
                <h3 className={`text-xl ${GTSStyles.text.primary} mb-2`}>Архив документов</h3>
                <p className={GTSStyles.text.muted}>Архивированные документы будут отображаться здесь</p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}