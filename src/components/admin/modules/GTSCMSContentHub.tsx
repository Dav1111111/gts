import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../../ui/dialog';
import { ScrollArea } from '../../ui/scroll-area';
import { Switch } from '../../ui/switch';
import { Separator } from '../../ui/separator';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Save,
  Upload,
  Download,
  Calendar,
  Clock,
  Users,
  TrendingUp,
  MessageSquare,
  Heart,
  Share2,
  Image as ImageIcon,
  Video,
  FileText,
  Tag,
  Settings,
  Globe,
  Star,
  BarChart3,
  Target,
  Anchor,
  Plane,
  Car,
  Zap,
  Gift,
  Newspaper,
  Megaphone,
  CheckCircle,
  XCircle,
  AlertCircle,
  ArrowLeft,
  ChevronRight,
  ExternalLink,
  Copy,
  MoreHorizontal
} from 'lucide-react';

interface ContentItem {
  id: string;
  title: string;
  description: string;
  content?: string;
  status: 'draft' | 'published' | 'scheduled' | 'archived';
  author: string;
  createdDate: string;
  publishDate?: string;
  lastModified: string;
  category?: string;
  tags: string[];
  media: {
    images: string[];
    videos: string[];
    thumbnail?: string;
  };
  seo: {
    title: string;
    description: string;
    keywords: string;
    slug: string;
  };
  analytics: {
    views: number;
    likes: number;
    shares: number;
    leads?: number;
    comments?: number;
  };
  settings: {
    featured: boolean;
    allowComments: boolean;
    visibility: 'public' | 'private' | 'unlisted';
  };
}

interface GTSCMSContentHubProps {
  userRole: 'Executive' | 'Marketing' | 'Staff' | 'Partner';
  onBack: () => void;
}

export const GTSCMSContentHub: React.FC<GTSCMSContentHubProps> = ({
  userRole,
  onBack
}) => {
  const [activeTab, setActiveTab] = useState('equipment');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [createContentType, setCreateContentType] = useState<string>('');
  const [previewMode, setPreviewMode] = useState(false);

  // Check permissions
  const canEdit = userRole === 'Executive' || userRole === 'Marketing';
  const canDelete = userRole === 'Executive';
  const canPublish = userRole === 'Executive' || userRole === 'Marketing';

  // Mock data for content
  const [equipmentContent, setEquipmentContent] = useState<ContentItem[]>([
    {
      id: 'eq-001',
      title: 'Yamaha 252S Premium Yacht',
      description: 'Роскошная яхта с премиальными удобствами для до 10 гостей',
      content: 'Полное описание яхты с техническими характеристиками...',
      status: 'published',
      author: 'Marina Kozlova',
      createdDate: '2024-11-20',
      publishDate: '2024-11-25',
      lastModified: '2024-12-01',
      category: 'Marine',
      tags: ['yacht', 'luxury', 'premium', 'yamaha'],
      media: {
        images: ['/yacht-1.jpg', '/yacht-2.jpg'],
        videos: ['/yacht-tour.mp4'],
        thumbnail: '/yacht-thumb.jpg'
      },
      seo: {
        title: 'Аренда премиальной яхты Yamaha 252S в Сочи | GTS',
        description: 'Роскошная яхта Yamaha 252S для аренды в Сочи. Премиальные удобства для до 10 гостей.',
        keywords: 'аренда яхты, сочи, yamaha, премиум яхта, морские прогулки',
        slug: 'yamaha-252s-premium-yacht'
      },
      analytics: {
        views: 2450,
        likes: 67,
        shares: 23,
        leads: 15,
        comments: 8
      },
      settings: {
        featured: true,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'eq-002',
      title: 'Robinson R44 Helicopter',
      description: 'Профессиональные вертолетные туры с сертифицированными пилотами',
      content: 'Описание вертолетных туров...',
      status: 'published',
      author: 'Alexey Petrov',
      createdDate: '2024-11-18',
      publishDate: '2024-11-22',
      lastModified: '2024-11-30',
      category: 'Aviation',
      tags: ['helicopter', 'tour', 'aviation', 'robinson'],
      media: {
        images: ['/helicopter-1.jpg'],
        videos: [],
        thumbnail: '/helicopter-thumb.jpg'
      },
      seo: {
        title: 'Вертолетные туры Robinson R44 в Сочи | GTS',
        description: 'Захватывающие вертолетные экскурсии над Сочи на Robinson R44.',
        keywords: 'вертолетные туры, сочи, robinson r44, авиация, экскурсии',
        slug: 'robinson-r44-helicopter-tours'
      },
      analytics: {
        views: 1890,
        likes: 45,
        shares: 12,
        leads: 8,
        comments: 3
      },
      settings: {
        featured: false,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'eq-003',
      title: 'Honda Talon Buggy Adventure',
      description: 'Захватывающие внедорожные приключения по горным тропам',
      content: 'Описание багги-приключений...',
      status: 'draft',
      author: 'Viktor Sokolov',
      createdDate: '2024-12-01',
      lastModified: '2024-12-02',
      category: 'Ground Vehicles',
      tags: ['buggy', 'adventure', 'off-road', 'honda'],
      media: {
        images: ['/buggy-1.jpg', '/buggy-2.jpg'],
        videos: ['/buggy-action.mp4'],
        thumbnail: '/buggy-thumb.jpg'
      },
      seo: {
        title: 'Багги-приключения Honda Talon в Сочи | GTS',
        description: 'Экстремальные внедорожные поездки на Honda Talon в горах Сочи.',
        keywords: 'багги, honda talon, внедорожник, приключения, сочи',
        slug: 'honda-talon-buggy-adventure'
      },
      analytics: {
        views: 0,
        likes: 0,
        shares: 0,
        leads: 0,
        comments: 0
      },
      settings: {
        featured: false,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'eq-004',
      title: 'Polaris Slingshot Experience',
      description: 'Уникальный трехколесный спортивный автомобиль для городских приключений',
      content: 'Описание Slingshot...',
      status: 'published',
      author: 'Elena Smirnova',
      createdDate: '2024-11-15',
      publishDate: '2024-11-20',
      lastModified: '2024-11-28',
      category: 'Ground Vehicles',
      tags: ['slingshot', 'polaris', 'urban', 'sports'],
      media: {
        images: ['/slingshot-1.jpg'],
        videos: [],
        thumbnail: '/slingshot-thumb.jpg'
      },
      seo: {
        title: 'Аренда Polaris Slingshot в Сочи | GTS',
        description: 'Уникальный трехколесный спортивный автомобиль Polaris Slingshot.',
        keywords: 'polaris slingshot, аренда, сочи, спортивный автомобиль',
        slug: 'polaris-slingshot-experience'
      },
      analytics: {
        views: 1650,
        likes: 38,
        shares: 15,
        leads: 12,
        comments: 5
      },
      settings: {
        featured: true,
        allowComments: true,
        visibility: 'public'
      }
    }
  ]);

  const [servicesContent, setServicesContent] = useState<ContentItem[]>([
    {
      id: 'srv-001',
      title: 'VIP Морской Пакет',
      description: 'Эксклюзивный пакет морских развлечений с персональным сервисом',
      content: 'Детальное описание VIP пакета...',
      status: 'published',
      author: 'Maria Volkova',
      createdDate: '2024-11-10',
      publishDate: '2024-11-15',
      lastModified: '2024-11-25',
      category: 'VIP Services',
      tags: ['vip', 'marine', 'package', 'exclusive'],
      media: {
        images: ['/vip-marine-1.jpg', '/vip-marine-2.jpg'],
        videos: ['/vip-experience.mp4'],
        thumbnail: '/vip-marine-thumb.jpg'
      },
      seo: {
        title: 'VIP Морской Пакет в Сочи | Эксклюзивные услуги GTS',
        description: 'Эксклюзивный VIP пакет морских развлечений с персональным сервисом в Сочи.',
        keywords: 'vip услуги, морской пакет, эксклюзив, сочи, персональный сервис',
        slug: 'vip-marine-package'
      },
      analytics: {
        views: 890,
        likes: 34,
        shares: 8,
        leads: 22,
        comments: 6
      },
      settings: {
        featured: true,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'srv-002',
      title: 'Корпоративные Мероприятия',
      description: 'Организация корпоративных мероприятий и тимбилдингов',
      content: 'Описание корпоративных услуг...',
      status: 'published',
      author: 'Dmitri Fedorov',
      createdDate: '2024-11-08',
      publishDate: '2024-11-12',
      lastModified: '2024-11-20',
      category: 'Corporate',
      tags: ['corporate', 'events', 'teambuilding', 'business'],
      media: {
        images: ['/corporate-1.jpg'],
        videos: [],
        thumbnail: '/corporate-thumb.jpg'
      },
      seo: {
        title: 'Корпоративные мероприятия в Сочи | GTS',
        description: 'Организация корпоративных мероприятий и тимбилдингов в Сочи.',
        keywords: 'корпоративные мероприятия, тимбилдинг, сочи, бизнес события',
        slug: 'corporate-events'
      },
      analytics: {
        views: 1450,
        likes: 29,
        shares: 18,
        leads: 35,
        comments: 12
      },
      settings: {
        featured: false,
        allowComments: true,
        visibility: 'public'
      }
    }
  ]);

  const [blogContent, setBlogContent] = useState<ContentItem[]>([
    {
      id: 'blog-001',
      title: 'Лучшие маршруты для вертолетных туров над Сочи',
      description: 'Откройте для себя самые живописные маршруты вертолетных полетов в регионе',
      content: 'Полная статья о маршрутах...',
      status: 'published',
      author: 'Travel Team',
      createdDate: '2024-11-05',
      publishDate: '2024-11-10',
      lastModified: '2024-11-15',
      category: 'Travel Guide',
      tags: ['helicopter', 'routes', 'sochi', 'travel', 'guide'],
      media: {
        images: ['/routes-1.jpg', '/routes-2.jpg'],
        videos: [],
        thumbnail: '/routes-thumb.jpg'
      },
      seo: {
        title: 'Лучшие маршруты вертолетных туров над Сочи | Гид GTS',
        description: 'Полный гид по самым красивым маршрутам вертолетных туров в Сочи.',
        keywords: 'вертолетные маршруты, сочи, туры, путеводитель, авиация',
        slug: 'best-helicopter-routes-sochi'
      },
      analytics: {
        views: 3450,
        likes: 89,
        shares: 45,
        comments: 23
      },
      settings: {
        featured: true,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'blog-002',
      title: 'Правила безопасности на яхте для начинающих',
      description: 'Важные советы по безопасности для первых морских путешествий',
      content: 'Подробные правила безопасности...',
      status: 'published',
      author: 'Captain Mikhailov',
      createdDate: '2024-10-28',
      publishDate: '2024-11-02',
      lastModified: '2024-11-08',
      category: 'Safety',
      tags: ['yacht', 'safety', 'beginners', 'marine', 'guide'],
      media: {
        images: ['/safety-1.jpg'],
        videos: ['/safety-guide.mp4'],
        thumbnail: '/safety-thumb.jpg'
      },
      seo: {
        title: 'Правила безопасности на яхте | Гид для начинающих GTS',
        description: 'Полное руководство по безопасности на яхте для новичков.',
        keywords: 'безопасность на яхте, правила, новички, морская безопасность',
        slug: 'yacht-safety-guide-beginners'
      },
      analytics: {
        views: 2890,
        likes: 67,
        shares: 34,
        comments: 18
      },
      settings: {
        featured: false,
        allowComments: true,
        visibility: 'public'
      }
    }
  ]);

  const [newsContent, setNewsContent] = useState<ContentItem[]>([
    {
      id: 'news-001',
      title: 'GTS расширяет флот новыми автомобилями Slingshot',
      description: 'Три новых автомобиля Polaris Slingshot пополнили наш парк приключенческого транспорта',
      content: 'Новость о расширении флота...',
      status: 'published',
      author: 'PR Team',
      createdDate: '2024-11-30',
      publishDate: '2024-12-01',
      lastModified: '2024-12-01',
      category: 'Company News',
      tags: ['fleet', 'expansion', 'slingshot', 'news'],
      media: {
        images: ['/fleet-expansion.jpg'],
        videos: [],
        thumbnail: '/fleet-thumb.jpg'
      },
      seo: {
        title: 'GTS расширяет флот Slingshot | Новости компании',
        description: 'GTS Сочи добавляет новые автомобили Polaris Slingshot в парк приключенческого транспорта.',
        keywords: 'gts новости, расширение флота, slingshot, сочи',
        slug: 'gts-fleet-expansion-slingshot'
      },
      analytics: {
        views: 1240,
        likes: 45,
        shares: 22,
        comments: 8
      },
      settings: {
        featured: true,
        allowComments: true,
        visibility: 'public'
      }
    },
    {
      id: 'news-002',
      title: 'Анонсированы специальные зимние тарифы',
      description: 'Эксклюзивные зимние цены на все услуги вертолетов и яхт',
      content: 'Анонс зимних тарифов...',
      status: 'scheduled',
      author: 'Marketing Team',
      createdDate: '2024-12-01',
      publishDate: '2024-12-05',
      lastModified: '2024-12-02',
      category: 'Promotions',
      tags: ['winter', 'rates', 'promotion', 'seasonal'],
      media: {
        images: ['/winter-promo.jpg'],
        videos: [],
        thumbnail: '/winter-thumb.jpg'
      },
      seo: {
        title: 'Зимние специальные тарифы | Акции GTS Сочи',
        description: 'Специальные зимние цены на аренду вертолетов и яхт в Сочи.',
        keywords: 'зимние тарифы, акции сочи, специальные цены, сезонные скидки',
        slug: 'winter-special-rates'
      },
      analytics: {
        views: 0,
        likes: 0,
        shares: 0,
        comments: 0
      },
      settings: {
        featured: false,
        allowComments: true,
        visibility: 'public'
      }
    }
  ]);

  // Combine all content for filtering
  const allContent = useMemo(() => {
    const contentMap = {
      equipment: equipmentContent,
      services: servicesContent,
      blog: blogContent,
      news: newsContent
    };
    
    return contentMap[activeTab as keyof typeof contentMap] || [];
  }, [activeTab, equipmentContent, servicesContent, blogContent, newsContent]);

  // Filter content
  const filteredContent = useMemo(() => {
    let filtered = allContent;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(item => item.status === statusFilter);
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(item => item.category === categoryFilter);
    }

    return filtered;
  }, [allContent, searchTerm, statusFilter, categoryFilter]);

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case 'published': return 'default';
      case 'draft': return 'secondary';
      case 'scheduled': return 'outline';
      case 'archived': return 'destructive';
      default: return 'secondary';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'published': return <CheckCircle className="w-4 h-4 text-[var(--gts-portal-success)]" />;
      case 'draft': return <Edit className="w-4 h-4 text-[var(--gts-portal-warning)]" />;
      case 'scheduled': return <Clock className="w-4 h-4 text-[var(--gts-portal-accent)]" />;
      case 'archived': return <XCircle className="w-4 h-4 text-[var(--gts-portal-muted)]" />;
      default: return <AlertCircle className="w-4 h-4 text-[var(--gts-portal-muted)]" />;
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Marine': return <Anchor className="w-4 h-4 text-blue-400" />;
      case 'Aviation': return <Plane className="w-4 h-4 text-purple-400" />;
      case 'Ground Vehicles': return <Car className="w-4 h-4 text-green-400" />;
      case 'VIP Services': return <Star className="w-4 h-4 text-yellow-400" />;
      case 'Corporate': return <Users className="w-4 h-4 text-orange-400" />;
      case 'Travel Guide': return <Globe className="w-4 h-4 text-blue-400" />;
      case 'Safety': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'Company News': return <Megaphone className="w-4 h-4 text-green-400" />;
      case 'Promotions': return <Gift className="w-4 h-4 text-pink-400" />;
      default: return <FileText className="w-4 h-4 text-[var(--gts-portal-muted)]" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'equipment': return <Zap className="w-5 h-5" />;
      case 'services': return <Target className="w-5 h-5" />;
      case 'blog': return <FileText className="w-5 h-5" />;
      case 'news': return <Newspaper className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const renderContentList = () => (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4 p-4 bg-[var(--gts-portal-surface)] rounded-lg border border-[var(--gts-portal-border)]">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--gts-portal-muted)] w-4 h-4" />
            <Input
              placeholder="Поиск контента..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
            />
          </div>
        </div>
        
        <div className="flex gap-3">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
              <SelectValue placeholder="Статус" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все статусы</SelectItem>
              <SelectItem value="published">Опубликовано</SelectItem>
              <SelectItem value="draft">Черновик</SelectItem>
              <SelectItem value="scheduled">Запланировано</SelectItem>
              <SelectItem value="archived">Архив</SelectItem>
            </SelectContent>
          </Select>

          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
              <SelectValue placeholder="Категория" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все категории</SelectItem>
              {activeTab === 'equipment' && (
                <>
                  <SelectItem value="Marine">Морской транспорт</SelectItem>
                  <SelectItem value="Aviation">Авиация</SelectItem>
                  <SelectItem value="Ground Vehicles">Наземный транспорт</SelectItem>
                </>
              )}
              {activeTab === 'services' && (
                <>
                  <SelectItem value="VIP Services">VIP Услуги</SelectItem>
                  <SelectItem value="Corporate">Корпоративные</SelectItem>
                </>
              )}
              {activeTab === 'blog' && (
                <>
                  <SelectItem value="Travel Guide">Путеводители</SelectItem>
                  <SelectItem value="Safety">Безопасность</SelectItem>
                </>
              )}
              {activeTab === 'news' && (
                <>
                  <SelectItem value="Company News">Новости компании</SelectItem>
                  <SelectItem value="Promotions">Акции</SelectItem>
                </>
              )}
            </SelectContent>
          </Select>

          {canEdit && (
            <Button
              onClick={() => {
                setCreateContentType(activeTab);
                setShowCreateDialog(true);
              }}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {activeTab === 'equipment' && 'Добавить оборудование'}
              {activeTab === 'services' && 'Добавить услугу'}
              {activeTab === 'blog' && 'Создать статью'}
              {activeTab === 'news' && 'Создать новость'}
            </Button>
          )}
        </div>
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContent.map((item) => (
          <Card
            key={item.id}
            className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)] hover:bg-[var(--gts-portal-card)] transition-colors cursor-pointer"
            onClick={() => setSelectedItem(item)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-2">
                  {item.category && getCategoryIcon(item.category)}
                  <Badge variant="outline" className="text-xs">
                    {item.category}
                  </Badge>
                </div>
                <div className="flex items-center space-x-1">
                  {getStatusIcon(item.status)}
                  <Badge variant={getStatusBadgeVariant(item.status)} className="text-xs">
                    {item.status}
                  </Badge>
                </div>
              </div>
              <CardTitle className="text-lg text-[var(--gts-portal-text)] line-clamp-2">
                {item.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-[var(--gts-portal-muted)] line-clamp-3 mb-4">
                {item.description}
              </p>
              
              {/* Media Preview */}
              {item.media.thumbnail && (
                <div className="mb-4">
                  <div className="w-full h-32 bg-[var(--gts-portal-card)] rounded-lg flex items-center justify-center">
                    <ImageIcon className="w-8 h-8 text-[var(--gts-portal-muted)]" />
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-4">
                {item.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {item.tags.length > 3 && (
                  <Badge variant="secondary" className="text-xs">
                    +{item.tags.length - 3}
                  </Badge>
                )}
              </div>

              {/* Analytics */}
              <div className="grid grid-cols-3 gap-4 text-center border-t border-[var(--gts-portal-border)] pt-3">
                <div>
                  <div className="text-sm text-[var(--gts-portal-text)]">{item.analytics.views}</div>
                  <div className="text-xs text-[var(--gts-portal-muted)]">Просмотры</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--gts-portal-text)]">{item.analytics.likes}</div>
                  <div className="text-xs text-[var(--gts-portal-muted)]">Лайки</div>
                </div>
                <div>
                  <div className="text-sm text-[var(--gts-portal-text)]">
                    {item.analytics.leads || item.analytics.comments || 0}
                  </div>
                  <div className="text-xs text-[var(--gts-portal-muted)]">
                    {activeTab === 'equipment' || activeTab === 'services' ? 'Лиды' : 'Комментарии'}
                  </div>
                </div>
              </div>

              {/* Author and Date */}
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-[var(--gts-portal-border)]">
                <span className="text-xs text-[var(--gts-portal-muted)]">{item.author}</span>
                <span className="text-xs text-[var(--gts-portal-muted)]">
                  {new Date(item.lastModified).toLocaleDateString('ru-RU')}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredContent.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-[var(--gts-portal-card)] rounded-full flex items-center justify-center">
            {getContentTypeIcon(activeTab)}
          </div>
          <h3 className="text-lg text-[var(--gts-portal-text)] mb-2">Контент не найден</h3>
          <p className="text-[var(--gts-portal-muted)] mb-4">
            Попробуйте изменить фильтры поиска или создайте новый контент
          </p>
          {canEdit && (
            <Button
              onClick={() => {
                setCreateContentType(activeTab);
                setShowCreateDialog(true);
              }}
              className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать контент
            </Button>
          )}
        </div>
      )}
    </div>
  );

  const renderContentEditor = () => {
    if (!selectedItem) return null;

    return (
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="max-w-6xl max-h-[90vh] bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
          <DialogHeader>
            <DialogTitle className="text-[var(--gts-portal-text)] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {getCategoryIcon(selectedItem.category || '')}
                <span>{selectedItem.title}</span>
                <Badge variant={getStatusBadgeVariant(selectedItem.status)}>
                  {selectedItem.status}
                </Badge>
              </div>
              <div className="flex items-center space-x-2">
                {canEdit && (
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    size="sm"
                    onClick={() => setIsEditing(!isEditing)}
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    {isEditing ? 'Просмотр' : 'Редактировать'}
                  </Button>
                )}
                <Button variant="outline" size="sm">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Превью
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>

          <ScrollArea className="h-[600px] w-full">
            <div className="space-y-6 p-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Заголовок</Label>
                    {isEditing ? (
                      <Input
                        value={selectedItem.title}
                        className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        placeholder="Введите заголовок"
                      />
                    ) : (
                      <div className="mt-1 p-2 text-[var(--gts-portal-text)]">{selectedItem.title}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Описание</Label>
                    {isEditing ? (
                      <Textarea
                        value={selectedItem.description}
                        className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        placeholder="Введите описание"
                        rows={3}
                      />
                    ) : (
                      <div className="mt-1 p-2 text-[var(--gts-portal-text)]">{selectedItem.description}</div>
                    )}
                  </div>

                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Контент</Label>
                    {isEditing ? (
                      <Textarea
                        value={selectedItem.content || ''}
                        className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        placeholder="Введите основной контент"
                        rows={8}
                      />
                    ) : (
                      <div className="mt-1 p-2 text-[var(--gts-portal-text)] whitespace-pre-wrap">
                        {selectedItem.content || 'Контент не заполнен'}
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Status and Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Статус</Label>
                      {isEditing && canPublish ? (
                        <Select value={selectedItem.status}>
                          <SelectTrigger className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Черновик</SelectItem>
                            <SelectItem value="published">Опубликовано</SelectItem>
                            <SelectItem value="scheduled">Запланировано</SelectItem>
                            <SelectItem value="archived">Архив</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 p-2 flex items-center space-x-2">
                          {getStatusIcon(selectedItem.status)}
                          <span className="text-[var(--gts-portal-text)]">{selectedItem.status}</span>
                        </div>
                      )}
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Категория</Label>
                      {isEditing ? (
                        <Select value={selectedItem.category}>
                          <SelectTrigger className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {activeTab === 'equipment' && (
                              <>
                                <SelectItem value="Marine">Морской транспорт</SelectItem>
                                <SelectItem value="Aviation">Авиация</SelectItem>
                                <SelectItem value="Ground Vehicles">Наземный транспорт</SelectItem>
                              </>
                            )}
                            {activeTab === 'services' && (
                              <>
                                <SelectItem value="VIP Services">VIP Услуги</SelectItem>
                                <SelectItem value="Corporate">Корпоративные</SelectItem>
                              </>
                            )}
                            {activeTab === 'blog' && (
                              <>
                                <SelectItem value="Travel Guide">Путеводители</SelectItem>
                                <SelectItem value="Safety">Безопасность</SelectItem>
                              </>
                            )}
                            {activeTab === 'news' && (
                              <>
                                <SelectItem value="Company News">Новости компании</SelectItem>
                                <SelectItem value="Promotions">Акции</SelectItem>
                              </>
                            )}
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="mt-1 p-2 flex items-center space-x-2">
                          {getCategoryIcon(selectedItem.category || '')}
                          <span className="text-[var(--gts-portal-text)]">{selectedItem.category}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Теги</Label>
                    {isEditing ? (
                      <Input
                        value={selectedItem.tags.join(', ')}
                        className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                        placeholder="Введите теги через запятую"
                      />
                    ) : (
                      <div className="mt-1 flex flex-wrap gap-1">
                        {selectedItem.tags.map((tag, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Media Management */}
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Медиа</Label>
                    <div className="mt-1 p-4 border border-[var(--gts-portal-border)] rounded-lg">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[var(--gts-portal-muted)]">
                            Изображения: {selectedItem.media.images.length}
                          </span>
                          {isEditing && (
                            <Button variant="outline" size="sm">
                              <Upload className="w-4 h-4 mr-2" />
                              Загрузить
                            </Button>
                          )}
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-[var(--gts-portal-muted)]">
                            Видео: {selectedItem.media.videos.length}
                          </span>
                          {isEditing && (
                            <Button variant="outline" size="sm">
                              <Video className="w-4 h-4 mr-2" />
                              Добавить
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Settings */}
                  <div>
                    <Label className="text-[var(--gts-portal-text)]">Настройки</Label>
                    <div className="mt-1 p-4 border border-[var(--gts-portal-border)] rounded-lg space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--gts-portal-text)]">Рекомендуемый</span>
                        <Switch 
                          checked={selectedItem.settings.featured} 
                          disabled={!isEditing}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-[var(--gts-portal-text)]">Разрешить комментарии</span>
                        <Switch 
                          checked={selectedItem.settings.allowComments} 
                          disabled={!isEditing}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="border-[var(--gts-portal-border)]" />

              {/* SEO Section */}
              <div>
                <h3 className="text-lg text-[var(--gts-portal-text)] mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  SEO Настройки
                </h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label className="text-[var(--gts-portal-text)]">SEO Заголовок</Label>
                      {isEditing ? (
                        <Input
                          value={selectedItem.seo.title}
                          className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                          placeholder="SEO заголовок"
                        />
                      ) : (
                        <div className="mt-1 p-2 text-[var(--gts-portal-text)]">{selectedItem.seo.title}</div>
                      )}
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">SEO Описание</Label>
                      {isEditing ? (
                        <Textarea
                          value={selectedItem.seo.description}
                          className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                          placeholder="SEO описание"
                          rows={3}
                        />
                      ) : (
                        <div className="mt-1 p-2 text-[var(--gts-portal-text)]">{selectedItem.seo.description}</div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-[var(--gts-portal-text)]">Ключевые слова</Label>
                      {isEditing ? (
                        <Input
                          value={selectedItem.seo.keywords}
                          className="mt-1 bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                          placeholder="Ключевые слова через запятую"
                        />
                      ) : (
                        <div className="mt-1 p-2 text-[var(--gts-portal-text)]">{selectedItem.seo.keywords}</div>
                      )}
                    </div>

                    <div>
                      <Label className="text-[var(--gts-portal-text)]">URL</Label>
                      {isEditing ? (
                        <div className="mt-1 flex">
                          <span className="px-3 py-2 bg-[var(--gts-portal-card)] border border-r-0 border-[var(--gts-portal-border)] rounded-l-md text-[var(--gts-portal-muted)] text-sm">
                            /content/
                          </span>
                          <Input
                            value={selectedItem.seo.slug}
                            className="rounded-l-none bg-[var(--gts-portal-bg)] border-[var(--gts-portal-border)] text-[var(--gts-portal-text)]"
                            placeholder="url-slug"
                          />
                        </div>
                      ) : (
                        <div className="mt-1 p-2 text-[var(--gts-portal-text)]">
                          /content/{selectedItem.seo.slug}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <Separator className="border-[var(--gts-portal-border)]" />

              {/* Analytics */}
              <div>
                <h3 className="text-lg text-[var(--gts-portal-text)] mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Аналитика
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-[var(--gts-portal-text)] mb-1">
                        {selectedItem.analytics.views}
                      </div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Просмотры</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-[var(--gts-portal-text)] mb-1">
                        {selectedItem.analytics.likes}
                      </div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Лайки</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-[var(--gts-portal-text)] mb-1">
                        {selectedItem.analytics.shares}
                      </div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">Репосты</div>
                    </CardContent>
                  </Card>

                  <Card className="bg-[var(--gts-portal-card)] border-[var(--gts-portal-border)]">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl text-[var(--gts-portal-text)] mb-1">
                        {selectedItem.analytics.leads || selectedItem.analytics.comments || 0}
                      </div>
                      <div className="text-sm text-[var(--gts-portal-muted)]">
                        {activeTab === 'equipment' || activeTab === 'services' ? 'Лиды' : 'Комментарии'}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Action Buttons */}
              {isEditing && canEdit && (
                <div className="flex space-x-4 pt-6 border-t border-[var(--gts-portal-border)]">
                  <Button className="bg-[var(--gts-portal-accent)] hover:bg-[var(--gts-portal-accent)]/90 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Сохранить изменения
                  </Button>
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    Предварительный просмотр
                  </Button>
                  {canDelete && (
                    <Button variant="outline" className="text-[var(--gts-portal-error)] border-[var(--gts-portal-error)]">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Удалить
                    </Button>
                  )}
                </div>
              )}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="min-h-screen bg-[var(--gts-portal-bg)]">
      {/* Header */}
      <div className="border-b border-[var(--gts-portal-border)] bg-[var(--gts-portal-surface)]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-[var(--gts-portal-text)]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Назад к порталу
            </Button>
            <div>
              <h1 className="text-2xl text-[var(--gts-portal-text)]">
                CMS / Content Hub
              </h1>
              <p className="text-sm text-[var(--gts-portal-muted)]">
                Управление контентом оборудования, услуг, блога и новостей
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                checked={previewMode}
                onCheckedChange={setPreviewMode}
                disabled={!canEdit}
              />
              <span className="text-sm text-[var(--gts-portal-text)]">Режим превью</span>
            </div>
            <Badge variant="outline" className="text-xs">
              {userRole}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Всего контента</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {equipmentContent.length + servicesContent.length + blogContent.length + newsContent.length}
                  </p>
                </div>
                <FileText className="w-8 h-8 text-[var(--gts-portal-accent)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Общие просмотры</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {[...equipmentContent, ...servicesContent, ...blogContent, ...newsContent]
                      .reduce((sum, item) => sum + item.analytics.views, 0).toLocaleString()}
                  </p>
                </div>
                <Eye className="w-8 h-8 text-[var(--gts-portal-success)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Опубликовано</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {[...equipmentContent, ...servicesContent, ...blogContent, ...newsContent]
                      .filter(item => item.status === 'published').length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-[var(--gts-portal-success)]" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[var(--gts-portal-surface)] border-[var(--gts-portal-border)]">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[var(--gts-portal-muted)]">Черновики</p>
                  <p className="text-2xl text-[var(--gts-portal-text)]">
                    {[...equipmentContent, ...servicesContent, ...blogContent, ...newsContent]
                      .filter(item => item.status === 'draft').length}
                  </p>
                </div>
                <Edit className="w-8 h-8 text-[var(--gts-portal-warning)]" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[var(--gts-portal-surface)] border border-[var(--gts-portal-border)]">
            <TabsTrigger value="equipment" className="flex items-center space-x-2">
              <Zap className="w-4 h-4" />
              <span>Оборудование ({equipmentContent.length})</span>
            </TabsTrigger>
            <TabsTrigger value="services" className="flex items-center space-x-2">
              <Target className="w-4 h-4" />
              <span>Услуги ({servicesContent.length})</span>
            </TabsTrigger>
            <TabsTrigger value="blog" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Блог ({blogContent.length})</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <Newspaper className="w-4 h-4" />
              <span>Новости ({newsContent.length})</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="equipment" className="mt-6">
            {renderContentList()}
          </TabsContent>

          <TabsContent value="services" className="mt-6">
            {renderContentList()}
          </TabsContent>

          <TabsContent value="blog" className="mt-6">
            {renderContentList()}
          </TabsContent>

          <TabsContent value="news" className="mt-6">
            {renderContentList()}
          </TabsContent>
        </Tabs>
      </div>

      {/* Content Editor Dialog */}
      {renderContentEditor()}
    </div>
  );
};