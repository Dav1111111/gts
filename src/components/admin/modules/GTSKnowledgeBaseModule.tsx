import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Textarea } from "../../ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  FileText,
  Upload,
  Download,
  Eye,
  Edit3,
  Save,
  X,
  History,
  Settings,
  Code,
  Gavel,
  BarChart3,
  Bookmark,
  Clock,
  User,
  Calendar,
  Tag
} from "lucide-react";
import { Input } from "../../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useAuth } from "../../../contexts/AuthContext";
import { Separator } from "../../ui/separator";

interface GTSKnowledgeBaseModuleProps {
  onBack: () => void;
}

type UserRole = 'executive' | 'finance' | 'partner' | 'staff' | 'operator' | 'crew' | 'it';

type ArticleCategory = 'processes' | 'technical' | 'legal' | 'api' | 'marketing';

interface Article {
  id: string;
  title: string;
  category: ArticleCategory;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  status: 'draft' | 'published' | 'archived';
  tags: string[];
  attachments?: Attachment[];
  viewCount: number;
  version: number;
  versionHistory: VersionHistoryItem[];
  readOnly?: boolean;
}

interface Attachment {
  id: string;
  name: string;
  type: string;
  size: string;
  url: string;
}

interface VersionHistoryItem {
  version: number;
  author: string;
  date: string;
  changes: string;
  content: string;
}

export function GTSKnowledgeBaseModule({ onBack }: GTSKnowledgeBaseModuleProps) {
  const { userRole } = useAuth();
  const [activeTab, setActiveTab] = useState("articles");
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<ArticleCategory | "all">("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Симуляция текущего пользователя
  const currentUser = {
    id: "user-001",
    name: "Viktor Kuznetsov",
    role: userRole || 'executive' as UserRole,
    partnerId: userRole === 'partner' ? "partner-premium-travel" : undefined,
    staffId: userRole === 'staff' ? "staff-001" : undefined
  };

  // Knowledge Base Articles Data
  const articles: Article[] = [
    {
      id: "art-001",
      title: "Стандартные операционные процедуры для яхт-туров",
      category: "processes",
      content: `# Стандартные операционные процедуры для яхт-туров

## Подготовка к рейсу

### Предварительная проверка
1. Техническое состояние судна
2. Проверка топлива и расходных материалов
3. Проверка спасательного оборудования
4. Метеосводка и условия на воде

### Оформление документов
1. Регистрация пассажиров
2. Проведение инструктажа по безопасности
3. Подписание документов об ответственности

## Во время рейса

### Обязанности капитана
- Контроль безопасности пассажиров
- Мониторинг погодных условий
- Соблюдение маршрута

### Действия в чрезвычайных ситуациях
1. Сигналы бедствия
2. Эвакуация пассажиров
3. Связь с береговой охраной

## После рейса

### Завершающие процедуры
1. Уборка судна
2. Заправка топлива
3. Техническое обслуживание
4. Отчет о рейсе`,
      author: "Marina Semenova",
      createdAt: "2024-11-15",
      updatedAt: "2024-12-01",
      status: "published",
      tags: ["яхты", "безопасность", "процедуры"],
      viewCount: 247,
      version: 3,
      versionHistory: [
        { version: 1, author: "Marina Semenova", date: "2024-11-15", changes: "Создание документа", content: "Первоначальная версия" },
        { version: 2, author: "Viktor Kuznetsov", date: "2024-11-20", changes: "Добавлены процедуры безопасности", content: "Обновленная версия с доп. процедурами" },
        { version: 3, author: "Marina Semenova", date: "2024-12-01", changes: "Обновлены требования после рейса", content: "Текущая версия" }
      ],
      attachments: [
        { id: "att-001", name: "safety_checklist.pdf", type: "PDF", size: "1.2 MB", url: "#" },
        { id: "att-002", name: "emergency_contacts.xlsx", type: "Excel", size: "45 KB", url: "#" }
      ]
    },
    {
      id: "art-002", 
      title: "API интеграция с системой бронирования",
      category: "api",
      content: `# API интеграция с системой бронирования

## Авторизация

### API Key
Для доступа к API необходим ключ авторизации:
\`\`\`
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
\`\`\`

## Основные endpoints

### Получение списка доступных туров
\`\`\`http
GET /api/v1/tours
\`\`\`

Параметры:
- \`date\` - дата тура (YYYY-MM-DD)
- \`category\` - категория тура (yacht, helicopter, buggy)
- \`duration\` - продолжительность в часах

### Создание бронирования
\`\`\`http  
POST /api/v1/bookings
\`\`\`

Payload:
\`\`\`json
{
  "tour_id": "tour_123",
  "client_name": "Иван Иванов", 
  "phone": "+7 900 123 45 67",
  "email": "ivan@example.com",
  "participants": 4,
  "special_requests": "Празднование дня рождения"
}
\`\`\`

### Статусы бронирования
- \`pending\` - ожидает подтверждения
- \`confirmed\` - подтверждено
- \`cancelled\` - отменено
- \`completed\` - завершено

## Вебхуки

Система может отправлять уведомления о изменении статуса:
\`\`\`json
{
  "event": "booking.confirmed",
  "booking_id": "booking_456", 
  "timestamp": "2024-12-03T10:30:00Z"
}
\`\`\``,
      author: "Alex Petrov",
      createdAt: "2024-11-20",
      updatedAt: "2024-11-25",
      status: "published", 
      tags: ["API", "интеграция", "бронирование"],
      viewCount: 89,
      version: 2,
      versionHistory: [
        { version: 1, author: "Alex Petrov", date: "2024-11-20", changes: "Создание API документации", content: "Базовая версия API" },
        { version: 2, author: "Alex Petrov", date: "2024-11-25", changes: "Добавлены вебхуки", content: "Текущая версия с вебхуками" }
      ]
    },
    {
      id: "art-003",
      title: "Правовые требования для туроператоров", 
      category: "legal",
      content: `# Правовые требования для туроператоров

## Лицензирование

### Обязательные лицензии
1. **Лицензия туроператора** - федеральный реестр
2. **Лицензия на морские перевозки** - Ространснадзор  
3. **Разрешение на авиационную деятельность** - Росавиация

### Сроки действия
- Туроператорская лицензия: 5 лет
- Морские перевозки: 3 года
- Авиационная деятельность: 3 года

## Страхование

### Обязательные виды страхования
1. Страхование гражданской ответственности
2. Страхование жизни и здоровья туристов
3. Страхование транспортных средств

### Минимальные суммы покрытия
- Гражданская ответственность: 500,000 руб. на 1 человека
- Жизнь и здоровье: 2,000,000 руб. на 1 человека
- Транспорт: полная стоимость замещения

## Документооборот

### Обязательные документы с клиентами
1. Договор на оказание туристских услуг
2. Программа тура с подробным описанием
3. Инструктаж по безопасности (письменно)
4. Страховые документы

### Внутренняя документация
- Журналы техосмотра транспорта
- Медицинские справки сотрудников
- Журналы инструктажей по охране труда`,
      author: "Elena Volkova",
      createdAt: "2024-10-15",
      updatedAt: "2024-11-30", 
      status: "published",
      tags: ["право", "лицензии", "страхование"],
      viewCount: 156,
      version: 4,
      versionHistory: [
        { version: 1, author: "Elena Volkova", date: "2024-10-15", changes: "Создание правового документа", content: "Первоначальная версия" },
        { version: 2, author: "Elena Volkova", date: "2024-11-01", changes: "Обновлены требования по лицензированию", content: "Обновленные требования" },
        { version: 3, author: "Viktor Kuznetsov", date: "2024-11-15", changes: "Добавлен раздел о документообороте", content: "Версия с документооборотом" },
        { version: 4, author: "Elena Volkova", date: "2024-11-30", changes: "Обновлены суммы страхования", content: "Текущая версия" }
      ]
    },
    {
      id: "art-004",
      title: "Техническое обслуживание флота",
      category: "technical", 
      content: `# Техническое обслуживание флота

## График технического обслуживания

### Ежедневное обслуживание
- Проверка уровня масла и топлива
- Визуальный осмотр корпуса и оборудования
- Проверка работы навигационных систем
- Тестирование радиосвязи

### Еженедельное обслуживание  
- Проверка аккумуляторных батарей
- Осмотр спасательного оборудования
- Проверка систем пожаротушения
- Чистка и смазка механизмов

### Ежемесячное обслуживание
- Замена масла в двигателях
- Проверка компрессии цилиндров
- Осмотр винтов и рулевого управления
- Проверка герметичности корпуса

## Контрольные точки для яхт

### Двигательная установка
1. **Yamaha 252S**
   - Рабочие часы: проверка каждые 50 часов
   - Замена масла: каждые 100 часов
   - Замена свечей: каждые 200 часов

2. **Mercury 350 HP**
   - Рабочие часы: проверка каждые 25 часов
   - Замена масла: каждые 75 часов
   - Осмотр импеллера: каждые 150 часов

### Навигационные системы
- GPS модуль: калибровка ежемесячно
- Радар: техосмотр каждые 6 месяцев
- Эхолот: проверка датчиков ежемесячно

## Контрольные точки для вертолетов

### Bell 407
- Проверка перед полетом: каждый полет
- 25-часовой осмотр: каждые 25 летных часов
- 100-часовой осмотр: каждые 100 летных часов
- Годовой осмотр: ежегодно

### Robinson R44
- Ежедневный осмотр: перед первым полетом дня
- Осмотр каждые 25 часов
- Осмотр каждые 100 часов
- Ремонт по состоянию`,
      author: "Sergey Morozov",
      createdAt: "2024-11-01",
      updatedAt: "2024-12-02",
      status: "published",
      tags: ["техобслуживание", "флот", "безопасность"],
      viewCount: 203,
      version: 2,
      versionHistory: [
        { version: 1, author: "Sergey Morozov", date: "2024-11-01", changes: "Создание технического руководства", content: "Базовая версия" },
        { version: 2, author: "Sergey Morozov", date: "2024-12-02", changes: "Добавлены процедуры для вертолетов", content: "Текущая версия с авиацией" }
      ],
      attachments: [
        { id: "att-003", name: "maintenance_schedule.xlsx", type: "Excel", size: "2.1 MB", url: "#" }
      ]
    },
    {
      id: "art-005",
      title: "Стратегия маркетинга в социальных сетях",
      category: "marketing",
      content: `# Стратегия маркетинга в социальных сетях

## Целевая аудитория

### Основные сегменты
1. **VIP клиенты (25-45 лет)**
   - Высокий доход (от 200,000 руб/мес)
   - Ценят эксклюзивность и сервис
   - Активны в Instagram, Telegram

2. **Корпоративные клиенты** 
   - Компании для тимбилдингов
   - Организация мероприятий
   - Каналы: LinkedIn, прямые продажи

3. **Туристы (18-35 лет)**
   - Средний доход (50,000-150,000 руб/мес) 
   - Ищут впечатления и контент для соцсетей
   - Активны в TikTok, Instagram, VK

## Контент-стратегия

### Instagram (@grandtoursochi)
**Типы контента:**
- Stories: закулисье, процесс подготовки туров (ежедневно)
- Посты: профессиональные фото/видео туров (3-4 раза в неделю)
- Reels: динамичные ролики с яхт и вертолетов (2-3 раза в неделю)
- IGTV: длинные видео-обзоры маршрутов (1 раз в неделю)

**Хештеги:**
#СочиТуры #ЯхтТур #ВертолетСочи #VIPОтдых #ЛюксТуризм #ГрандТурСочи

### TikTok (@gts_sochi)
**Контент:**
- Тренды с видео с яхт и вертолетов
- "День из жизни" экипажа
- Лайфхаки для туристов
- Реакции клиентов на туры

### Telegram канал
**Контент:**
- Эксклюзивные предложения для подписчиков  
- Фото-отчеты с туров
- Анонсы новых маршрутов
- Полезная информация о Сочи

## KPI и метрики

### Охват и вовлеченность
- Рост подписчиков: +15% ежемесячно
- Средняя вовлеченность: >4%
- Охват Stories: >30% от аудитории

### Конверсии  
- CTR на сайт: >2%
- Конверсия в заявку: >5%
- Cost per lead: <1,500 руб

### ROI
- ROAS от соцсетей: >3:1
- Доля соцсетей в общем трафике: >40%`,
      author: "Anna Komarova", 
      createdAt: "2024-10-20",
      updatedAt: "2024-11-28",
      status: "published",
      tags: ["маркетинг", "соцсети", "стратегия"],
      viewCount: 127,
      version: 3,
      versionHistory: [
        { version: 1, author: "Anna Komarova", date: "2024-10-20", changes: "Создание маркетинговой стратегии", content: "Базовая стратегия" },
        { version: 2, author: "Anna Komarova", date: "2024-11-10", changes: "Добавлена TikTok стратегия", content: "Версия с TikTok" },
        { version: 3, author: "Anna Komarova", date: "2024-11-28", changes: "Обновлены KPI и метрики", content: "Текущая версия" }
      ]
    }
  ];

  // Role-based access control
  const getRoleAccess = (role: UserRole): { canEdit: boolean; canCreate: boolean; categories: ArticleCategory[] } => {
    switch (role) {
      case 'executive':
        return { canEdit: true, canCreate: true, categories: ['processes', 'technical', 'legal', 'api', 'marketing'] };
      case 'it':
        return { canEdit: true, canCreate: true, categories: ['technical', 'api', 'processes'] };
      case 'finance':
        return { canEdit: false, canCreate: false, categories: ['legal', 'processes'] };
      case 'staff':
        return { canEdit: false, canCreate: false, categories: ['processes', 'technical'] };
      case 'operator':
        return { canEdit: false, canCreate: false, categories: ['processes', 'technical'] };
      case 'crew':
        return { canEdit: false, canCreate: false, categories: ['processes', 'technical'] };
      case 'partner':
        return { canEdit: false, canCreate: false, categories: ['marketing', 'api'] };
      default:
        return { canEdit: false, canCreate: false, categories: [] };
    }
  };

  const userAccess = getRoleAccess(currentUser.role);
  
  // Search suggestions
  const allTags = Array.from(new Set(articles.flatMap(article => article.tags)));
  const allTitles = articles.map(article => article.title);
  
  const generateSuggestions = (query: string): string[] => {
    if (query.length < 2) return [];
    
    const suggestions: string[] = [];
    
    // Add matching titles
    allTitles.forEach(title => {
      if (title.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push(title);
      }
    });
    
    // Add matching tags
    allTags.forEach(tag => {
      if (tag.toLowerCase().includes(query.toLowerCase())) {
        suggestions.push(tag);
      }
    });
    
    return suggestions.slice(0, 5);
  };

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.length >= 2) {
      setSearchSuggestions(generateSuggestions(value));
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  const getCategoryIcon = (category: ArticleCategory) => {
    const icons = {
      processes: <FileText className="h-4 w-4" />,
      technical: <Settings className="h-4 w-4" />,
      legal: <Gavel className="h-4 w-4" />,
      api: <Code className="h-4 w-4" />,
      marketing: <BarChart3 className="h-4 w-4" />
    };
    return icons[category];
  };

  const getCategoryColor = (category: ArticleCategory) => {
    const colors = {
      processes: "bg-blue-500/20 text-blue-400",
      technical: "bg-green-500/20 text-green-400",
      legal: "bg-red-500/20 text-red-400", 
      api: "bg-purple-500/20 text-purple-400",
      marketing: "bg-orange-500/20 text-orange-400"
    };
    return colors[category];
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: "bg-yellow-500/20 text-yellow-400",
      published: "bg-green-500/20 text-green-400",
      archived: "bg-gray-500/20 text-gray-400"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500/20 text-gray-400";
  };

  // Filter articles based on role access and filters
  const filteredArticles = useMemo(() => {
    let filtered = articles.filter(article => 
      userAccess.categories.includes(article.category)
    );

    if (searchQuery) {
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        article.author.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(article => article.category === categoryFilter);
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(article => article.status === statusFilter);
    }

    return filtered.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [articles, searchQuery, categoryFilter, statusFilter, userAccess.categories]);

  const handleCreateNewArticle = () => {
    const newArticle: Article = {
      id: `art-${Date.now()}`,
      title: "Новая статья",
      category: userAccess.categories[0],
      content: "# Новая статья\n\nВведите содержимое статьи здесь...",
      author: currentUser.name,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status: "draft",
      tags: [],
      viewCount: 0,
      version: 1,
      versionHistory: [
        {
          version: 1,
          author: currentUser.name,
          date: new Date().toISOString().split('T')[0],
          changes: "Создание статьи",
          content: "# Новая статья\n\nВведите содержимое статьи здесь..."
        }
      ]
    };
    setEditingArticle(newArticle);
    setIsCreatingNew(true);
  };

  const handleSaveArticle = () => {
    if (editingArticle) {
      // In a real app, this would save to backend
      console.log('Saving article:', editingArticle);
      setEditingArticle(null);
      setIsCreatingNew(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
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
              Back to Portal
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Knowledge Base
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Documentation, processes, and knowledge management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {userAccess.canCreate && (
              <Button onClick={handleCreateNewArticle} className="bg-green-500 hover:bg-green-600">
                <Plus className="h-4 w-4 mr-2" />
                New Article
              </Button>
            )}
            <Badge variant="outline" style={{ color: 'var(--gts-portal-text)' }}>
              {userAccess.canEdit ? 'Edit Access' : 'Read Only'}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Search Bar */}
        <div className="relative mb-6">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
              <Input
                placeholder="Search articles, tags, authors..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
                onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              />
              {showSuggestions && searchSuggestions.length > 0 && (
                <div 
                  className="absolute top-full left-0 right-0 mt-1 border rounded-lg shadow-lg z-50"
                  style={{ 
                    backgroundColor: 'var(--gts-portal-surface)', 
                    borderColor: 'var(--gts-portal-border)' 
                  }}
                >
                  {searchSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className="px-3 py-2 cursor-pointer hover:bg-opacity-50"
                      style={{ 
                        color: 'var(--gts-portal-text)',
                        '&:hover': { backgroundColor: 'var(--gts-portal-card)' }
                      }}
                      onClick={() => {
                        setSearchQuery(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {userAccess.categories.map(category => (
                  <SelectItem key={category} value={category}>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(category)}
                      <span className="capitalize">{category}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="archived">Archived</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Total Articles</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {filteredArticles.length}
                  </p>
                </div>
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Categories Available</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {userAccess.categories.length}
                  </p>
                </div>
                <Bookmark className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Your Role</p>
                  <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </p>
                </div>
                <User className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Access Level</p>
                  <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {userAccess.canEdit ? 'Full Edit' : 'Read Only'}
                  </p>
                </div>
                <Edit3 className="h-6 w-6 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="articles">Articles</TabsTrigger>
            <TabsTrigger value="editor">
              {selectedArticle || editingArticle ? 'Article Editor' : 'No Article Selected'}
            </TabsTrigger>
          </TabsList>

          {/* Articles List Tab */}
          <TabsContent value="articles" className="mt-6">
            <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
              <CardHeader>
                <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Knowledge Base Articles</CardTitle>
                <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                  Browse and manage documentation by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredArticles.length === 0 ? (
                    <div className="text-center py-8">
                      <FileText className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--gts-portal-muted)' }} />
                      <p style={{ color: 'var(--gts-portal-muted)' }}>
                        No articles found matching your criteria
                      </p>
                    </div>
                  ) : (
                    filteredArticles.map(article => (
                      <div 
                        key={article.id}
                        className="flex items-center justify-between p-4 rounded-lg hover:bg-opacity-50 cursor-pointer"
                        style={{ backgroundColor: 'var(--gts-portal-card)' }}
                        onClick={() => {
                          setSelectedArticle(article);
                          setActiveTab('editor');
                        }}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {article.title}
                            </h4>
                            <Badge className={getCategoryColor(article.category)}>
                              <div className="flex items-center gap-1">
                                {getCategoryIcon(article.category)}
                                <span className="capitalize">{article.category}</span>
                              </div>
                            </Badge>
                            <Badge className={getStatusColor(article.status)}>
                              {article.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-6 text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                            <div className="flex items-center gap-1">
                              <User className="h-3 w-3" />
                              {article.author}
                            </div>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              Updated: {formatDate(article.updatedAt)}
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              {article.viewCount} views
                            </div>
                            <div className="flex items-center gap-1">
                              <History className="h-3 w-3" />
                              v{article.version}
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mt-2">
                            {article.tags.map(tag => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                <Tag className="h-2 w-2 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {userAccess.canEdit && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingArticle(article);
                                setActiveTab('editor');
                              }}
                            >
                              <Edit3 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Article Editor Tab */}
          <TabsContent value="editor" className="mt-6">
            {(selectedArticle || editingArticle) ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle style={{ color: 'var(--gts-portal-text)' }}>
                            {editingArticle ? 'Edit Article' : 'Article Viewer'}
                          </CardTitle>
                          <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                            {(selectedArticle || editingArticle)?.title}
                          </CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                          {editingArticle && (
                            <>
                              <Button onClick={handleSaveArticle} className="bg-green-500 hover:bg-green-600">
                                <Save className="h-4 w-4 mr-2" />
                                Save
                              </Button>
                              <Button 
                                variant="outline" 
                                onClick={() => {
                                  setEditingArticle(null);
                                  setIsCreatingNew(false);
                                }}
                              >
                                <X className="h-4 w-4 mr-2" />
                                Cancel
                              </Button>
                            </>
                          )}
                          {selectedArticle && !editingArticle && userAccess.canEdit && (
                            <Button 
                              onClick={() => setEditingArticle(selectedArticle)}
                              variant="outline"
                            >
                              <Edit3 className="h-4 w-4 mr-2" />
                              Edit
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {editingArticle ? (
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Title</label>
                              <Input
                                value={editingArticle.title}
                                onChange={(e) => setEditingArticle(prev => prev ? {...prev, title: e.target.value} : null)}
                                className="mt-1"
                              />
                            </div>
                            <div>
                              <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Category</label>
                              <Select 
                                value={editingArticle.category} 
                                onValueChange={(value: ArticleCategory) => 
                                  setEditingArticle(prev => prev ? {...prev, category: value} : null)
                                }
                              >
                                <SelectTrigger className="mt-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {userAccess.categories.map(category => (
                                    <SelectItem key={category} value={category}>
                                      <div className="flex items-center gap-2">
                                        {getCategoryIcon(category)}
                                        <span className="capitalize">{category}</span>
                                      </div>
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          <div>
                            <label className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>Content</label>
                            <Textarea
                              value={editingArticle.content}
                              onChange={(e) => setEditingArticle(prev => prev ? {...prev, content: e.target.value} : null)}
                              rows={20}
                              className="mt-1 font-mono"
                              placeholder="Write your article content in Markdown format..."
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="prose prose-invert max-w-none">
                          <div style={{ color: 'var(--gts-portal-text)', lineHeight: '1.6' }}>
                            <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-body)' }}>
                              {selectedArticle?.content}
                            </pre>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Article Info */}
                  <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                    <CardHeader>
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Article Info</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="text-sm">
                        <span style={{ color: 'var(--gts-portal-muted)' }}>Author:</span>
                        <span className="ml-2" style={{ color: 'var(--gts-portal-text)' }}>
                          {(selectedArticle || editingArticle)?.author}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span style={{ color: 'var(--gts-portal-muted)' }}>Created:</span>
                        <span className="ml-2" style={{ color: 'var(--gts-portal-text)' }}>
                          {formatDate((selectedArticle || editingArticle)?.createdAt || '')}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span style={{ color: 'var(--gts-portal-muted)' }}>Updated:</span>
                        <span className="ml-2" style={{ color: 'var(--gts-portal-text)' }}>
                          {formatDate((selectedArticle || editingArticle)?.updatedAt || '')}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span style={{ color: 'var(--gts-portal-muted)' }}>Version:</span>
                        <span className="ml-2" style={{ color: 'var(--gts-portal-text)' }}>
                          v{(selectedArticle || editingArticle)?.version}
                        </span>
                      </div>
                      <div className="text-sm">
                        <span style={{ color: 'var(--gts-portal-muted)' }}>Views:</span>
                        <span className="ml-2" style={{ color: 'var(--gts-portal-text)' }}>
                          {(selectedArticle || editingArticle)?.viewCount}
                        </span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Version History */}
                  {(selectedArticle || editingArticle)?.versionHistory && (
                    <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                      <CardHeader>
                        <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Version History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {(selectedArticle || editingArticle)?.versionHistory.map((version, index) => (
                            <div 
                              key={version.version} 
                              className="p-3 rounded-lg"
                              style={{ backgroundColor: 'var(--gts-portal-card)' }}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-medium text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                  v{version.version}
                                </span>
                                <span className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                  {formatDate(version.date)}
                                </span>
                              </div>
                              <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                {version.author}
                              </p>
                              <p className="text-xs mt-1" style={{ color: 'var(--gts-portal-text)' }}>
                                {version.changes}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Attachments */}
                  {(selectedArticle || editingArticle)?.attachments && (selectedArticle || editingArticle)!.attachments!.length > 0 && (
                    <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                      <CardHeader>
                        <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Attachments</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {(selectedArticle || editingArticle)?.attachments?.map(attachment => (
                            <div 
                              key={attachment.id}
                              className="flex items-center justify-between p-2 rounded"
                              style={{ backgroundColor: 'var(--gts-portal-card)' }}
                            >
                              <div className="flex items-center gap-2">
                                <FileText className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <div>
                                  <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                    {attachment.type} • {attachment.size}
                                  </p>
                                </div>
                              </div>
                              <Button size="sm" variant="outline">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardContent className="p-12">
                  <div className="text-center">
                    <FileText className="h-16 w-16 mx-auto mb-4" style={{ color: 'var(--gts-portal-muted)' }} />
                    <h3 style={{ color: 'var(--gts-portal-text)' }}>No Article Selected</h3>
                    <p style={{ color: 'var(--gts-portal-muted)' }} className="mt-2">
                      Select an article from the list to view or edit it
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}