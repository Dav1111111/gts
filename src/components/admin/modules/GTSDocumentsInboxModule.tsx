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
  AlertTriangle,
  Clock,
  CheckCircle,
  Bell,
  Mail,
  MessageSquare,
  Calendar,
  Building,
  Shield,
  Trash2,
  Archive,
  Star,
  Paperclip,
  RefreshCw,
  Edit3,
  Send,
  Users,
  FileCheck,
  FileMinus,
  UserCheck,
  Bookmark,
  History,
  Settings,
  GitBranch,
  Code,
  Gavel,
  BarChart3,
  Lightbulb,
  Save,
  X
} from "lucide-react";
import { Input } from "../../ui/input";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { useAuth } from "../../../contexts/AuthContext";
import { Separator } from "../../ui/separator";

interface GTSDocumentsInboxModuleProps {
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

export function GTSDocumentsInboxModule({ onBack }: GTSDocumentsInboxModuleProps) {
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

  const documents: Record<string, any[]> = {
    legacy: [] // Keeping the structure but emptying legacy document data
  };





  const getUrgencyColor = (urgency: Document['urgency'], status: string) => {
    if (status === 'expired') return "bg-red-600 text-white border border-red-500";
    
    switch (urgency) {
      case 'critical':
        return "bg-red-500 text-white border border-red-400";
      case 'warning':
        return "bg-yellow-500 text-white border border-yellow-400";
      default:
        return "bg-green-500 text-white border border-green-400";
    }
  };

  const getStatusColor = (status: string) => {
    const colors = {
      active: "bg-green-500 text-white",
      expiring: "bg-yellow-500 text-white",
      expired: "bg-red-600 text-white",
      renewal_required: "bg-red-500 text-white",
      completed: "bg-blue-500 text-white",
      pending: "bg-orange-500 text-white",
      approved: "bg-purple-500 text-white"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500 text-white";
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "text-red-400",
      medium: "text-yellow-400",
      low: "text-green-400"
    };
    return colors[priority as keyof typeof colors] || "text-gray-400";
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      compliance: <Shield className="h-4 w-4" />,
      insurance: <Building className="h-4 w-4" />,
      contracts: <FileText className="h-4 w-4" />,
      maintenance: <AlertTriangle className="h-4 w-4" />,
      technical: <MessageSquare className="h-4 w-4" />,
      operations: <Calendar className="h-4 w-4" />,
      customer_service: <MessageSquare className="h-4 w-4" />,
      safety: <Shield className="h-4 w-4" />,
      legal: <FileText className="h-4 w-4" />
    };
    return icons[category as keyof typeof icons] || <Bell className="h-4 w-4" />;
  };

  const allDocuments = [
    ...documents.contracts,
    ...documents.acts,
    ...documents.insurance,
    ...documents.licenses
  ];

  // Фильтрация документов с учетом роли и фильтров
  const filteredDocuments = useMemo(() => {
    let filtered = getAccessibleDocuments(allDocuments);

    // Поиск по названию
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.entity?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Фильтр по статусу
    if (statusFilter !== 'all') {
      filtered = filtered.filter(doc => doc.status === statusFilter);
    }

    // Фильт�� по типу
    if (typeFilter !== 'all') {
      filtered = filtered.filter(doc => doc.category === typeFilter);
    }

    // Фильтр по срочности
    if (urgencyFilter !== 'all') {
      filtered = filtered.filter(doc => doc.urgency === urgencyFilter);
    }

    // Фильтр по партнеру (только для executive/finance)
    if (partnerFilter !== 'all' && (currentUser.role === 'executive' || currentUser.role === 'finance')) {
      filtered = filtered.filter(doc => doc.partner === partnerFilter);
    }

    return filtered;
  }, [allDocuments, searchQuery, statusFilter, typeFilter, urgencyFilter, partnerFilter, currentUser.role]);

  // Статистика с учетом ролевого доступа
  const accessibleDocs = getAccessibleDocuments(allDocuments);
  const expiringSoon = accessibleDocs.filter(doc => doc.urgency === 'critical' || doc.urgency === 'warning').length;
  const expiredDocs = accessibleDocs.filter(doc => doc.status === 'expired').length;

  // Фильтрация уведомлений по роли
  const getAccessibleNotifications = (allNotifs: any[]): any[] => {
    switch (currentUser.role) {
      case 'executive':
      case 'finance':
        return allNotifs; // Полный доступ
      case 'partner':
        return allNotifs.filter(notif => 
          notif.category === 'documentation' ||
          notif.partner === "Premium Travel Agency" ||
          (notif.entityType && ['contract', 'insurance'].includes(notif.entityType))
        );
      case 'staff':
        return allNotifs.filter(notif => 
          notif.assignee === currentUser.name ||
          (notif.entityType === 'license' && notif.category === 'compliance') ||
          notif.category === 'safety'
        );
      case 'operator':
        return allNotifs.filter(notif => 
          notif.category === 'operations' ||
          notif.category === 'maintenance' ||
          notif.assignee === currentUser.name
        );
      case 'crew':
        return allNotifs.filter(notif => 
          notif.category === 'safety' ||
          notif.category === 'operations' ||
          notif.assignee === currentUser.name
        );
      default:
        return [];
    }
  };

  const allNotifications = [
    ...notifications.alerts,
    ...notifications.tickets,
    ...notifications.escalations
  ];

  const accessibleNotifications = getAccessibleNotifications(allNotifications);
  const unreadCount = accessibleNotifications.filter(n => !n.read).length;

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
                Documents & Inbox
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Document library, alerts, and notification management
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {(currentUser.role === 'executive' || currentUser.role === 'finance') && (
              <>
                <Button variant="outline">
                  <Archive className="h-4 w-4 mr-2" />
                  Archive
                </Button>
                <Button className="bg-green-500 hover:bg-green-600">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
              </>
            )}
            {currentUser.role === 'partner' && (
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            )}
            <Badge variant="outline" style={{ color: 'var(--gts-portal-text)' }}>
              Role: {currentUser.role}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Accessible Documents</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{accessibleDocs.length}</p>
                </div>
                <FileText className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Expiring Soon</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{expiringSoon}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Expired</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{expiredDocs}</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Unread Alerts</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>{unreadCount}</p>
                </div>
                <Bell className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>User Role</p>
                  <p className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                    {currentUser.role.charAt(0).toUpperCase() + currentUser.role.slice(1)}
                  </p>
                </div>
                <UserCheck className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="documents">Document Library</TabsTrigger>
            <TabsTrigger value="inbox">
              Notifications Inbox
              {unreadCount > 0 && (
                <Badge variant="destructive" className="ml-2 px-1 text-xs">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>

          {/* Documents Tab */}
          <TabsContent value="documents" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Document Library</CardTitle>
                        <p className="text-sm mt-1" style={{ color: 'var(--gts-portal-muted)' }}>
                          Access level: {currentUser.role} • {filteredDocuments.length} of {accessibleDocs.length} documents
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Input 
                          placeholder="Search documents..." 
                          className="w-64" 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <Select value={typeFilter} onValueChange={setTypeFilter}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Types</SelectItem>
                            <SelectItem value="contracts">Contracts</SelectItem>
                            <SelectItem value="acts">Acts</SelectItem>
                            <SelectItem value="insurance">Insurance</SelectItem>
                            <SelectItem value="licenses">Licenses</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="expiring">Expiring</SelectItem>
                            <SelectItem value="expired">Expired</SelectItem>
                            <SelectItem value="pending">Pending</SelectItem>
                          </SelectContent>
                        </Select>
                        <Select value={urgencyFilter} onValueChange={setUrgencyFilter}>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Urgency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                            <SelectItem value="warning">Warning</SelectItem>
                            <SelectItem value="normal">Normal</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredDocuments.length === 0 ? (
                        <div className="text-center py-8">
                          <FileMinus className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--gts-portal-muted)' }} />
                          <p style={{ color: 'var(--gts-portal-muted)' }}>
                            No documents found matching your criteria
                          </p>
                        </div>
                      ) : (
                        filteredDocuments.map(doc => (
                        <div 
                          key={doc.id}
                          className="flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors"
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedDocument(doc.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <FileText className="h-6 w-6 text-blue-400" />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>{doc.name}</h4>
                                {doc.urgency !== 'normal' && (
                                  <Badge className={getUrgencyColor(doc.urgency, doc.status)} variant="secondary">
                                    {doc.status === 'expired' ? 'EXPIRED' : 
                                     doc.urgency === 'critical' ? 'URGENT' : 'WARNING'}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                {doc.type} • {doc.size} • {doc.date}
                              </p>
                              <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                Entity: {doc.entity}
                                {doc.partner && ` • Partner: ${doc.partner}`}
                                {doc.staff && ` • Staff: ${doc.staff}`}
                              </p>
                              {doc.expires && (
                                <p className="text-xs mt-1" style={{ 
                                  color: doc.urgency === 'critical' ? 'var(--gts-portal-error)' : 
                                         doc.urgency === 'warning' ? 'var(--gts-portal-warning)' : 
                                         'var(--gts-portal-muted)' 
                                }}>
                                  {doc.status === 'expired' 
                                    ? `Expired: ${doc.expires} (${Math.abs(doc.daysUntilExpiry!)} days ago)`
                                    : `Expires: ${doc.expires} (${doc.daysUntilExpiry} days remaining)`
                                  }
                                </p>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge className={getStatusColor(doc.status)}>
                              {doc.status.replace('_', ' ')}
                            </Badge>
                            <Button size="sm" variant="outline">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Download className="h-4 w-4" />
                            </Button>
                            {(currentUser.role === 'executive' || currentUser.role === 'finance') && (
                              <Button size="sm" variant="outline">
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
              </div>

              {/* Document Details */}
              {selectedDocument && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Document Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const doc = filteredDocuments.find(d => d.id === selectedDocument) || 
                                  accessibleDocs.find(d => d.id === selectedDocument)!;
                      return (
                        <div className="space-y-4">
                          <div className="text-center">
                            <div className="p-4 rounded-lg bg-blue-500/10 inline-block mb-3">
                              <FileText className="h-12 w-12 text-blue-400" />
                            </div>
                            <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                              {doc.name}
                            </h3>
                            <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                              {doc.type}
                            </p>
                          </div>
                          
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Entity</span>
                              <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{doc.entity}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Size</span>
                              <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{doc.size}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Created</span>
                              <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{doc.date}</span>
                            </div>
                            {doc.expires && (
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Expires</span>
                                <span className="text-sm" style={{ 
                                  color: doc.urgency === 'critical' ? 'var(--gts-portal-error)' : 
                                         doc.urgency === 'warning' ? 'var(--gts-portal-warning)' : 
                                         'var(--gts-portal-text)' 
                                }}>{doc.expires}</span>
                              </div>
                            )}
                            {doc.partner && (
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Partner</span>
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{doc.partner}</span>
                              </div>
                            )}
                            {doc.staff && (
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Staff</span>
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{doc.staff}</span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Status</span>
                              <Badge className={getStatusColor(doc.status)}>
                                {doc.status.replace('_', ' ')}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Urgency</span>
                              <Badge className={getUrgencyColor(doc.urgency, doc.status)} variant="outline">
                                {doc.urgency.toUpperCase()}
                              </Badge>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                              <Eye className="h-4 w-4 mr-2" />
                              View Document
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Download className="h-4 w-4 mr-2" />
                              Download
                            </Button>
                            {(currentUser.role === 'executive' || currentUser.role === 'finance') && (
                              <>
                                <Button variant="outline" className="w-full">
                                  <RefreshCw className="h-4 w-4 mr-2" />
                                  Request Update
                                </Button>
                                <Button variant="outline" className="w-full">
                                  <Upload className="h-4 w-4 mr-2" />
                                  Replace Document
                                </Button>
                              </>
                            )}
                            <Button variant="outline" className="w-full">
                              <Star className="h-4 w-4 mr-2" />
                              Add to Favorites
                            </Button>
                            {doc.urgency === 'critical' && (
                              <Button variant="destructive" className="w-full">
                                <Send className="h-4 w-4 mr-2" />
                                Send Urgent Alert
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

          {/* Notifications Inbox Tab */}
          <TabsContent value="inbox" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Notifications Inbox</CardTitle>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="outline">
                          Mark All Read
                        </Button>
                        <Select>
                          <SelectTrigger className="w-32">
                            <SelectValue placeholder="Filter" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All</SelectItem>
                            <SelectItem value="unread">Unread</SelectItem>
                            <SelectItem value="high">High Priority</SelectItem>
                            <SelectItem value="alerts">Alerts</SelectItem>
                            <SelectItem value="tickets">Tickets</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {accessibleNotifications.length === 0 ? (
                        <div className="text-center py-8">
                          <Bell className="h-12 w-12 mx-auto mb-4" style={{ color: 'var(--gts-portal-muted)' }} />
                          <p style={{ color: 'var(--gts-portal-muted)' }}>
                            No notifications for your role
                          </p>
                        </div>
                      ) : (
                        accessibleNotifications.map(notification => (
                        <div 
                          key={notification.id}
                          className={`flex items-center justify-between p-4 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors ${
                            !notification.read ? 'border-l-4 border-l-blue-400' : ''
                          }`}
                          style={{ backgroundColor: 'var(--gts-portal-card)' }}
                          onClick={() => setSelectedNotification(notification.id)}
                        >
                          <div className="flex items-center gap-4">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              {getCategoryIcon(notification.category)}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className={`font-medium ${!notification.read ? 'font-semibold' : ''}`} 
                                    style={{ color: 'var(--gts-portal-text)' }}>
                                  {notification.title}
                                </h4>
                                <span className={`text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                                  {notification.priority.toUpperCase()}
                                </span>
                              </div>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2 text-xs" style={{ color: 'var(--gts-portal-muted)' }}>
                                <span>{notification.date}</span>
                                {'assignee' in notification && (
                                  <>
                                    <span>•</span>
                                    <span>Assigned to: {notification.assignee}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {!notification.read && (
                              <div className="w-2 h-2 rounded-full bg-blue-400" />
                            )}
                            <Button size="sm" variant="outline">
                              <CheckCircle className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ))
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Notification Details */}
              {selectedNotification && (
                <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                  <CardHeader>
                    <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Notification Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {(() => {
                      const notification = accessibleNotifications.find(n => n.id === selectedNotification)!;
                      return (
                        <div className="space-y-4">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              {getCategoryIcon(notification.category)}
                              <h3 className="font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {notification.title}
                              </h3>
                            </div>
                            <Badge className={`${getPriorityColor(notification.priority)} text-xs`} variant="outline">
                              {notification.priority.toUpperCase()} PRIORITY
                            </Badge>
                          </div>
                          
                          <div className="space-y-3">
                            <div>
                              <p className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                {notification.message}
                              </p>
                            </div>
                            
                            <div className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Date</span>
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{notification.date}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Category</span>
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{notification.category.replace('_', ' ')}</span>
                              </div>
                              {'assignee' in notification && (
                                <div className="flex justify-between">
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Assignee</span>
                                  <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>{notification.assignee}</span>
                                </div>
                              )}
                              <div className="flex justify-between">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Status</span>
                                <Badge variant={notification.read ? "secondary" : "default"}>
                                  {notification.read ? "Read" : "Unread"}
                                </Badge>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Button className="w-full bg-blue-500 hover:bg-blue-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Mark as Resolved
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Add Comment
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Paperclip className="h-4 w-4 mr-2" />
                              Attach Document
                            </Button>
                            {notification.priority === 'high' && (
                              <Button variant="destructive" className="w-full">
                                <AlertTriangle className="h-4 w-4 mr-2" />
                                Escalate
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
        </Tabs>
      </div>
    </div>
  );
}