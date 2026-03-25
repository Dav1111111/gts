import React, { useState, useEffect } from 'react';
import { Card } from '../../ui/card';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../../ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { ScrollArea } from '../../ui/scroll-area';
import { Progress } from '../../ui/progress';
import { Separator } from '../../ui/separator';
import { Switch } from '../../ui/switch';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../../ui/accordion';
import { Slider } from '../../ui/slider';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Download, Upload, Copy,
  FileText, Image, Video, Folder, FolderOpen, Globe, Languages,
  Calendar, Clock, User, Tag, Star, ThumbsUp, MessageCircle,
  Settings, Target, BarChart3, TrendingUp, ExternalLink, Share2,
  Zap, Sparkles, Bot, Wand2, RefreshCw, CheckCircle, AlertTriangle,
  XCircle, Archive, BookOpen, Newspaper, PenTool, Layout, Palette,
  Monitor, Smartphone, Tablet, Users, Building, Shield, Key,
  Mail, Phone, MapPin, Link, Hash, Flag, Award, Camera,
  Play, Pause, Volume2, Maximize, Minimize, RotateCcw, Send,
  Bell, Heart, Bookmark, Code, Database, Cloud, Lock, Unlock,
  ChevronRight, ChevronDown, ChevronLeft, ChevronUp, MoreHorizontal,
  Scissors, Crop, Layers, Grid, AlignLeft, AlignCenter, AlignRight,
  Bold, Italic, Underline, List, Headphones, Mic, ScanLine
} from 'lucide-react';

interface CMSContentHubProps {
  userRole: string;
}

type ContentStatus = 'draft' | 'review' | 'published' | 'scheduled' | 'archived';
type ContentType = 'article' | 'news' | 'page' | 'product';
type Language = 'ru' | 'en' | 'zh' | 'ar';
type MediaType = 'image' | 'video' | 'document' | 'audio';

interface ContentItem {
  id: string;
  title: Record<Language, string>;
  excerpt: Record<Language, string>;
  content: Record<Language, string>;
  slug: Record<Language, string>;
  type: ContentType;
  status: ContentStatus;
  publishDate?: string;
  scheduledDate?: string;
  author: string;
  coAuthors: string[];
  category: string;
  tags: string[];
  views: number;
  likes: number;
  comments: number;
  featured: boolean;
  featuredImage?: string;
  seo: Record<Language, SEOData>;
  createdAt: string;
  updatedAt: string;
  version: number;
  versions: ContentVersion[];
  mediaGallery: string[];
}

interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  canonicalUrl: string;
}

interface ContentVersion {
  id: string;
  version: number;
  author: string;
  createdAt: string;
  changes: string;
  content: Record<Language, string>;
}

interface MediaFile {
  id: string;
  name: string;
  originalName: string;
  type: MediaType;
  format: string;
  size: number;
  dimensions?: { width: number; height: number };
  duration?: number;
  url: string;
  thumbnailUrl?: string;
  alt: Record<Language, string>;
  description: Record<Language, string>;
  tags: string[];
  folder: string;
  uploadedBy: string;
  uploadedAt: string;
  usageCount: number;
  optimized: boolean;
}

interface Comment {
  id: string;
  contentId: string;
  author: string;
  authorRole: string;
  content: string;
  createdAt: string;
  status: 'approved' | 'pending' | 'rejected';
  replies: Comment[];
  likes: number;
  reported: boolean;
}

interface AIGenerationRequest {
  topic: string;
  language: Language;
  type: ContentType;
  style: 'formal' | 'casual' | 'marketing' | 'technical';
  length: 'short' | 'medium' | 'long';
  keywords: string[];
  tone: 'professional' | 'friendly' | 'persuasive' | 'informative';
}

export function GTSCMSContentHubExtended({ userRole }: CMSContentHubProps) {
  const [activeTab, setActiveTab] = useState('content');
  const [currentLanguage, setCurrentLanguage] = useState<Language>('ru');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isMediaLibraryOpen, setIsMediaLibraryOpen] = useState(false);
  const [isAIGeneratorOpen, setIsAIGeneratorOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null);
  const [selectedMedia, setSelectedMedia] = useState<MediaFile[]>([]);
  const [editorMode, setEditorMode] = useState<'create' | 'edit'>('create');

  // Language labels
  const languageLabels: Record<Language, string> = {
    ru: 'Русский',
    en: 'English',
    zh: '中文',
    ar: 'العربية'
  };

  // Mock данные контента
  const contentItems: ContentItem[] = [
    {
      id: 'content-001',
      title: {
        ru: 'Новые яхты в нашем флоте 2024',
        en: 'New Yachts in Our Fleet 2024',
        zh: '我们船队的新游艇2024',
        ar: 'اليخوت الجديدة في أسطولنا 2024'
      },
      excerpt: {
        ru: 'Представляем пополнение нашего флота - эксклюзивные яхты премиум-класса',
        en: 'Introducing our fleet expansion - exclusive premium-class yachts',
        zh: '介绍我们船队扩张 - 独家高端游艇',
        ar: 'نقدم توسع أسطولنا - يخوت حصرية من الدرجة الممتازة'
      },
      content: {
        ru: 'Полное описание новых яхт с техническими характеристиками...',
        en: 'Complete description of new yachts with technical specifications...',
        zh: '新游艇的完整描述和技术规格...',
        ar: 'وصف كامل لليخوت الجديدة مع المواصفات التقنية...'
      },
      slug: {
        ru: 'novye-yahty-v-nashem-flote-2024',
        en: 'new-yachts-in-our-fleet-2024',
        zh: 'new-yachts-in-our-fleet-2024-zh',
        ar: 'new-yachts-in-our-fleet-2024-ar'
      },
      type: 'news',
      status: 'published',
      publishDate: '2024-06-15T10:00:00Z',
      author: 'Мария Петрова',
      coAuthors: ['Сергей Волков'],
      category: 'Флот',
      tags: ['яхты', 'флот', 'новинки', '2024'],
      views: 1245,
      likes: 89,
      comments: 23,
      featured: true,
      featuredImage: 'yacht-fleet-2024.jpg',
      seo: {
        ru: {
          title: 'Новые яхты в флоте GTS 2024 | Премиум яхтинг',
          description: 'Откройте для себя новые яхты премиум-класса в флоте Grand Tour Sochi. Эксклюзивные предложения аренды яхт 2024.',
          keywords: ['яхты', 'аренда яхт', 'премиум', 'Сочи', 'флот'],
          ogTitle: 'Новые яхты в флоте GTS 2024',
          ogDescription: 'Эксклюзивные яхты премиум-класса для незабываемого отдыха',
          ogImage: 'og-yacht-fleet.jpg',
          twitterTitle: 'Новые яхты GTS 2024',
          twitterDescription: 'Премиум яхтинг в Сочи',
          canonicalUrl: '/news/novye-yahty-v-nashem-flote-2024'
        },
        en: {
          title: 'New Yachts in GTS Fleet 2024 | Premium Yachting',
          description: 'Discover new premium-class yachts in Grand Tour Sochi fleet. Exclusive yacht charter offers 2024.',
          keywords: ['yachts', 'yacht charter', 'premium', 'Sochi', 'fleet'],
          ogTitle: 'New Yachts in GTS Fleet 2024',
          ogDescription: 'Exclusive premium-class yachts for unforgettable vacation',
          ogImage: 'og-yacht-fleet-en.jpg',
          twitterTitle: 'New GTS Yachts 2024',
          twitterDescription: 'Premium yachting in Sochi',
          canonicalUrl: '/en/news/new-yachts-in-our-fleet-2024'
        },
        zh: {
          title: 'GTS船队新游艇2024 | 高端游艇',
          description: '发现Grand Tour Sochi船队的新高端游艇。2024年独家游艇租赁优惠。',
          keywords: ['游艇', '游艇租赁', '高端', '索契', '船队'],
          ogTitle: 'GTS船队新游艇2024',
          ogDescription: '独家高端游艇，带来难忘假期',
          ogImage: 'og-yacht-fleet-zh.jpg',
          twitterTitle: 'GTS新游艇2024',
          twitterDescription: '索契高端游艇',
          canonicalUrl: '/zh/news/new-yachts-in-our-fleet-2024-zh'
        },
        ar: {
          title: 'اليخوت الجديدة في أسطول GTS 2024 | يخوت فاخرة',
          description: 'اكتشف اليخوت الجديدة من الدرجة الممتازة في أسطول Grand Tour Sochi. عروض استئجار يخوت حصرية 2024.',
          keywords: ['يخوت', 'استئجار يخوت', 'فاخر', 'سوتشي', 'أسطول'],
          ogTitle: 'اليخوت الجديدة في أسطول GTS 2024',
          ogDescription: 'يخوت حصرية من الدرجة الممتازة لعطلة لا تُنسى',
          ogImage: 'og-yacht-fleet-ar.jpg',
          twitterTitle: 'يخوت GTS الجديدة 2024',
          twitterDescription: 'يخوت فاخرة في سوتشي',
          canonicalUrl: '/ar/news/new-yachts-in-our-fleet-2024-ar'
        }
      },
      createdAt: '2024-06-15T10:00:00Z',
      updatedAt: '2024-06-20T14:30:00Z',
      version: 2,
      versions: [],
      mediaGallery: ['yacht1.jpg', 'yacht2.jpg', 'yacht3.jpg']
    },
    {
      id: 'content-002',
      title: {
        ru: 'Летние маршруты 2024: Лучшие направления',
        en: 'Summer Routes 2024: Best Destinations',
        zh: '2024年夏季路线：最佳目的地',
        ar: 'طرق الصيف 2024: أفضل الوجهات'
      },
      excerpt: {
        ru: 'Откройте для себя самые живописные маршруты Черного моря этим летом',
        en: 'Discover the most scenic Black Sea routes this summer',
        zh: '今年夏天探索黑海最美丽的路线',
        ar: 'اكتشف أجمل طرق البحر الأسود هذا الصيف'
      },
      content: {
        ru: 'Подробное описание летних маршрутов...',
        en: 'Detailed description of summer routes...',
        zh: '夏季路线的详细描述...',
        ar: 'وصف مفصل للطرق الصيفية...'
      },
      slug: {
        ru: 'letnie-marshruty-2024-luchshie-napravleniya',
        en: 'summer-routes-2024-best-destinations',
        zh: 'summer-routes-2024-best-destinations-zh',
        ar: 'summer-routes-2024-best-destinations-ar'
      },
      type: 'article',
      status: 'review',
      author: 'Анна Козлова',
      coAuthors: [],
      category: 'Маршруты',
      tags: ['маршруты', 'лето', 'направления', 'море'],
      views: 789,
      likes: 56,
      comments: 12,
      featured: false,
      seo: {
        ru: {
          title: 'Летние маршруты 2024 | GTS',
          description: 'Лучшие летние маршруты по Черному морю от Grand Tour Sochi',
          keywords: ['маршруты', 'лето', 'Черное море', 'яхтинг'],
          ogTitle: 'Летние маршруты 2024',
          ogDescription: 'Живописные маршруты по Черному морю',
          ogImage: 'og-summer-routes.jpg',
          twitterTitle: 'Летние маршруты GTS',
          twitterDescription: 'Лучшие направления для яхтинга',
          canonicalUrl: '/articles/letnie-marshruty-2024-luchshie-napravleniya'
        },
        en: {
          title: 'Summer Routes 2024 | GTS',
          description: 'Best summer routes on Black Sea by Grand Tour Sochi',
          keywords: ['routes', 'summer', 'Black Sea', 'yachting'],
          ogTitle: 'Summer Routes 2024',
          ogDescription: 'Scenic Black Sea routes',
          ogImage: 'og-summer-routes-en.jpg',
          twitterTitle: 'GTS Summer Routes',
          twitterDescription: 'Best yachting destinations',
          canonicalUrl: '/en/articles/summer-routes-2024-best-destinations'
        },
        zh: {
          title: '2024年夏季路线 | GTS',
          description: 'Grand Tour Sochi的最佳黑海夏季路线',
          keywords: ['路线', '夏季', '黑海', '游艇'],
          ogTitle: '2024年夏季路线',
          ogDescription: '风景如画的黑海路线',
          ogImage: 'og-summer-routes-zh.jpg',
          twitterTitle: 'GTS夏季路线',
          twitterDescription: '最佳游艇目的地',
          canonicalUrl: '/zh/articles/summer-routes-2024-best-destinations-zh'
        },
        ar: {
          title: 'طرق الصيف 2024 | GTS',
          description: 'أفضل طرق الصيف في البحر الأسود من Grand Tour Sochi',
          keywords: ['طرق', 'صيف', 'البحر الأسود', 'يخوت'],
          ogTitle: 'طرق الصيف 2024',
          ogDescription: 'طرق البحر الأسود الخلابة',
          ogImage: 'og-summer-routes-ar.jpg',
          twitterTitle: 'طرق GTS الصيفية',
          twitterDescription: 'أفضل وجهات اليخوت',
          canonicalUrl: '/ar/articles/summer-routes-2024-best-destinations-ar'
        }
      },
      createdAt: '2024-06-18T09:15:00Z',
      updatedAt: '2024-06-18T09:15:00Z',
      version: 1,
      versions: [],
      mediaGallery: []
    }
  ];

  // Mock данные медиафайлов
  const mediaFiles: MediaFile[] = [
    {
      id: 'media-001',
      name: 'yacht-sunset-premium.jpg',
      originalName: 'sunset-yacht-photo.jpg',
      type: 'image',
      format: 'JPEG',
      size: 2048576, // 2MB
      dimensions: { width: 1920, height: 1080 },
      url: '/media/yacht-sunset-premium.jpg',
      thumbnailUrl: '/media/thumbs/yacht-sunset-premium.jpg',
      alt: {
        ru: 'Роскошная яхта на закате',
        en: 'Luxury yacht at sunset',
        zh: '日落时的豪华游艇',
        ar: 'يخت فاخر عند الغروب'
      },
      description: {
        ru: 'Премиальная яхта на фоне живописного заката в Сочи',
        en: 'Premium yacht against scenic Sochi sunset',
        zh: '在索契风景如画的日落背景下的高端游艇',
        ar: 'يخت فاخر على خلفية غروب الشمس الخلاب في سوتشي'
      },
      tags: ['яхта', 'закат', 'премиум', 'море'],
      folder: 'yachts/premium',
      uploadedBy: 'Фотограф студии',
      uploadedAt: '2024-06-10T14:20:00Z',
      usageCount: 8,
      optimized: true
    },
    {
      id: 'media-002',
      name: 'fleet-overview-video.mp4',
      originalName: 'fleet-presentation.mp4',
      type: 'video',
      format: 'MP4',
      size: 52428800, // 50MB
      dimensions: { width: 1920, height: 1080 },
      duration: 180, // 3 minutes
      url: '/media/fleet-overview-video.mp4',
      thumbnailUrl: '/media/thumbs/fleet-overview-video.jpg',
      alt: {
        ru: 'Обзор флота GTS',
        en: 'GTS Fleet Overview',
        zh: 'GTS船队概述',
        ar: 'نظرة عامة على أسطول GTS'
      },
      description: {
        ru: 'Видеообзор всего флота яхт Grand Tour Sochi',
        en: 'Video overview of entire Grand Tour Sochi yacht fleet',
        zh: 'Grand Tour Sochi整个游艇船队的视频概述',
        ar: 'نظرة فيديو شاملة على أسطول يخوت Grand Tour Sochi بالكامل'
      },
      tags: ['флот', 'видео', 'обзор', 'яхты'],
      folder: 'videos/fleet',
      uploadedBy: 'Видеограф',
      uploadedAt: '2024-06-12T11:45:00Z',
      usageCount: 3,
      optimized: true
    },
    {
      id: 'media-003',
      name: 'gts-brochure-2024.pdf',
      originalName: 'brochure.pdf',
      type: 'document',
      format: 'PDF',
      size: 15728640, // 15MB
      url: '/media/gts-brochure-2024.pdf',
      thumbnailUrl: '/media/thumbs/gts-brochure-2024.jpg',
      alt: {
        ru: 'Брошюра GTS 2024',
        en: 'GTS Brochure 2024',
        zh: 'GTS 2024宣传册',
        ar: 'كتيب GTS 2024'
      },
      description: {
        ru: 'Полная брошюра с услугами и ценами на 2024 год',
        en: 'Complete brochure with services and prices for 2024',
        zh: '2024年完整的服务和价格手册',
        ar: 'كتيب كامل بالخدمات والأسعار لعام 2024'
      },
      tags: ['брошюра', 'цены', '2024', 'услуги'],
      folder: 'documents/brochures',
      uploadedBy: 'Менеджер по маркетингу',
      uploadedAt: '2024-06-05T16:30:00Z',
      usageCount: 12,
      optimized: false
    }
  ];

  // Mock данные комментариев
  const comments: Comment[] = [
    {
      id: 'comment-001',
      contentId: 'content-001',
      author: 'Александр Петров',
      authorRole: 'member-gold',
      content: 'Отличные новинки! Когда будет доступна аренда новых яхт?',
      createdAt: '2024-06-16T09:30:00Z',
      status: 'approved',
      replies: [
        {
          id: 'reply-001',
          contentId: 'content-001',
          author: 'Мария Петрова',
          authorRole: 'manager',
          content: 'Спасибо за интерес! Новые яхты будут доступны для аренды с 1 июля.',
          createdAt: '2024-06-16T10:15:00Z',
          status: 'approved',
          replies: [],
          likes: 5,
          reported: false
        }
      ],
      likes: 12,
      reported: false
    }
  ];

  // Доступные категории
  const categories = ['Флот', 'Маршруты', 'Услуги', 'События', 'Партнёры', 'Новости', 'Блог'];
  
  // Все доступные теги
  const allTags = Array.from(
    new Set(contentItems.flatMap(item => item.tags))
  ).sort();

  // Функции фильтрации
  const filteredContent = contentItems.filter(item => {
    const currentTitle = item.title[currentLanguage] || item.title.ru;
    const currentExcerpt = item.excerpt[currentLanguage] || item.excerpt.ru;
    const currentContent = item.content[currentLanguage] || item.content.ru;
    
    const matchesSearch = currentTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentExcerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentContent.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => item.tags.includes(tag));
    
    return matchesSearch && matchesStatus && matchesType && matchesCategory && matchesTags;
  });

  const filteredMedia = mediaFiles.filter(file => {
    const currentAlt = file.alt[currentLanguage] || file.alt.ru;
    const currentDescription = file.description[currentLanguage] || file.description.ru;
    
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentAlt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         currentDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         file.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesSearch;
  });

  // Функции утилиты
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateStr: string) => {
    return new Date(dateStr).toLocaleString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusBadge = (status: ContentStatus) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-500">Опубликовано</Badge>;
      case 'draft':
        return <Badge variant="outline">Черновик</Badge>;
      case 'review':
        return <Badge variant="outline" className="text-yellow-600">На проверке</Badge>;
      case 'scheduled':
        return <Badge variant="outline" className="text-blue-600">Запланировано</Badge>;
      case 'archived':
        return <Badge variant="secondary">Архив</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getTypeBadge = (type: ContentType) => {
    switch (type) {
      case 'article':
        return <Badge variant="outline"><BookOpen className="w-3 h-3 mr-1" />Статья</Badge>;
      case 'news':
        return <Badge variant="outline"><Newspaper className="w-3 h-3 mr-1" />Новость</Badge>;
      case 'page':
        return <Badge variant="outline"><Layout className="w-3 h-3 mr-1" />Страница</Badge>;
      case 'product':
        return <Badge variant="outline"><Star className="w-3 h-3 mr-1" />Продукт</Badge>;
      default:
        return <Badge variant="secondary">Неопределён</Badge>;
    }
  };

  const getMediaTypeIcon = (type: MediaType) => {
    switch (type) {
      case 'image':
        return <Image className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'audio':
        return <Headphones className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const canEdit = () => {
    return ['executive', 'manager', 'content-editor'].includes(userRole);
  };

  const canPublish = () => {
    return ['executive', 'manager'].includes(userRole);
  };

  const canModerateComments = () => {
    return ['executive', 'manager', 'content-moderator'].includes(userRole);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок с переключателем языков */}
      <div className="flex items-center justify-between">
        <div>
          <h1>Content Management System</h1>
          <p className="text-muted-foreground">
            Создание, редактирование и публикация контента для сайта GTS
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Переключатель языков */}
          <Select value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
            <SelectTrigger className="w-36">
              <div className="flex items-center gap-2">
                <Languages className="w-4 h-4" />
                <SelectValue />
              </div>
            </SelectTrigger>
            <SelectContent>
              {Object.entries(languageLabels).map(([code, label]) => (
                <SelectItem key={code} value={code}>
                  <div className="flex items-center gap-2">
                    <Globe className="w-3 h-3" />
                    {label}
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          {canEdit() && (
            <>
              <Button variant="outline" onClick={() => setIsAIGeneratorOpen(true)}>
                <Sparkles className="w-4 h-4 mr-2" />
                AI Generator
              </Button>
              <Button variant="outline" onClick={() => setIsMediaLibraryOpen(true)}>
                <Image className="w-4 h-4 mr-2" />
                Медиатека
              </Button>
              <Button onClick={() => { setEditorMode('create'); setIsEditorOpen(true); }}>
                <Plus className="w-4 h-4 mr-2" />
                Создать контент
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Панель поиска и фильтров */}
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input 
                placeholder="Поиск по контенту, тегам и описанию..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="published">Опубликовано</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="scheduled">Запланировано</SelectItem>
                <SelectItem value="archived">Архив</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="article">Статьи</SelectItem>
                <SelectItem value="news">Новости</SelectItem>
                <SelectItem value="page">Страницы</SelectItem>
                <SelectItem value="product">Продукты</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Облако тегов */}
          <div>
            <Label className="mb-2 block">Популярные теги:</Label>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 12).map(tag => (
                <Button
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter(t => t !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {tag}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="content">
            <FileText className="w-4 h-4 mr-2" />
            Контент
          </TabsTrigger>
          <TabsTrigger value="media">
            <Image className="w-4 h-4 mr-2" />
            Медиатека
          </TabsTrigger>
          <TabsTrigger value="comments">
            <MessageCircle className="w-4 h-4 mr-2" />
            Комментарии
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Target className="w-4 h-4 mr-2" />
            SEO
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            Аналитика
          </TabsTrigger>
        </TabsList>

        {/* Управление контентом */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {filteredContent.map((item) => (
              <Card key={item.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="line-clamp-1">{item.title[currentLanguage] || item.title.ru}</h3>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(item.status)}
                          {getTypeBadge(item.type)}
                          {item.featured && (
                            <Badge className="bg-yellow-500/10 text-yellow-600">
                              <Star className="w-3 h-3 mr-1" />
                              Рекомендуемое
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {item.excerpt[currentLanguage] || item.excerpt.ru}
                      </p>
                      
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {item.author}
                          {item.coAuthors.length > 0 && (
                            <span className="ml-1">+{item.coAuthors.length}</span>
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(item.updatedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {item.views}
                        </div>
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-4 h-4" />
                          {item.likes}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          {item.comments}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          v{item.version}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 ml-4">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedContent(item)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {canEdit() && (
                        <Button variant="ghost" size="sm" onClick={() => {
                          setSelectedContent(item);
                          setEditorMode('edit');
                          setIsEditorOpen(true);
                        }}>
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      {item.tags.slice(0, 4).map(tag => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                      {item.tags.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{item.tags.length - 4}
                        </Badge>
                      )}
                    </div>
                    
                    {item.scheduledDate && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="w-4 h-4" />
                        Публикация: {formatDateTime(item.scheduledDate)}
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Медиатека */}
        <TabsContent value="media" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Медиатека</h3>
              <p className="text-sm text-muted-foreground">
                Управление изображениями, видео и документами
              </p>
            </div>
            {canEdit() && (
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить файлы
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredMedia.map((file) => (
              <Card key={file.id} className="p-4 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="space-y-3">
                  <div className="aspect-video bg-muted rounded-lg flex items-center justify-center relative overflow-hidden">
                    {file.type === 'image' ? (
                      <img
                        src={file.thumbnailUrl || file.url}
                        alt={file.alt[currentLanguage] || file.alt.ru}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        {getMediaTypeIcon(file.type)}
                        <span className="text-xs mt-1 text-muted-foreground">{file.format}</span>
                      </div>
                    )}
                    
                    {file.optimized && (
                      <Badge className="absolute top-2 right-2 bg-green-500/10 text-green-500 text-xs">
                        <Zap className="w-3 h-3 mr-1" />
                        Оптимизировано
                      </Badge>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <h5 className="truncate">{file.name}</h5>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {file.description[currentLanguage] || file.description.ru}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{formatFileSize(file.size)}</span>
                      {file.dimensions && (
                        <span>{file.dimensions.width}×{file.dimensions.height}</span>
                      )}
                      {file.duration && (
                        <span>{Math.floor(file.duration / 60)}:{(file.duration % 60).toString().padStart(2, '0')}</span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Использован: {file.usageCount} раз
                      </span>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Copy className="w-3 h-3" />
                        </Button>
                        {canEdit() && (
                          <Button variant="ghost" size="sm">
                            <Edit className="w-3 h-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Управление комментариями */}
        <TabsContent value="comments" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Модерация комментариев</h3>
              <p className="text-sm text-muted-foreground">
                Управление комментариями от пользователей
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline">Ожидают: 5</Badge>
              <Badge variant="outline" className="text-red-600">Жалобы: 2</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id} className="p-4">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <h5>{comment.author}</h5>
                        <Badge variant="outline" className="text-xs">{comment.authorRole}</Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDateTime(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                    
                    {canModerateComments() && (
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="text-green-600">
                          <CheckCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600">
                          <XCircle className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Flag className="w-4 h-4" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <ThumbsUp className="w-4 h-4" />
                      {comment.likes}
                    </div>
                    <span>Статус: {comment.status === 'approved' ? 'Одобрен' : comment.status === 'pending' ? 'Ожидает' : 'Отклонён'}</span>
                    {comment.reported && (
                      <Badge variant="outline" className="text-red-600">
                        <Flag className="w-3 h-3 mr-1" />
                        Жалоба
                      </Badge>
                    )}
                  </div>

                  {/* Ответы */}
                  {comment.replies.length > 0 && (
                    <div className="ml-6 space-y-3 border-l-2 border-muted pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h6 className="text-sm font-medium">{reply.author}</h6>
                            <Badge variant="outline" className="text-xs">{reply.authorRole}</Badge>
                            <span className="text-xs text-muted-foreground">
                              {formatDateTime(reply.createdAt)}
                            </span>
                          </div>
                          <p className="text-sm">{reply.content}</p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <ThumbsUp className="w-3 h-3" />
                            {reply.likes}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* SEO оптимизация */}
        <TabsContent value="seo" className="space-y-6">
          <div>
            <h3>SEO Аналитика</h3>
            <p className="text-sm text-muted-foreground">
              Оптимизация контента для поисковых систем
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">SEO Score</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">85%</span>
                    <Badge className="bg-green-500/10 text-green-500">Отлично</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Органический трафик</span>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-bold">+24%</span>
                  <p className="text-xs text-muted-foreground">За последний месяц</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Ключевые слова</span>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-bold">47</span>
                  <p className="text-xs text-muted-foreground">в топ-10 поиска</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Индексация</span>
                </div>
                <div className="space-y-2">
                  <span className="text-2xl font-bold">98%</span>
                  <p className="text-xs text-muted-foreground">страниц проиндексировано</p>
                </div>
              </div>
            </Card>
          </div>

          {/* SEO рекомендации */}
          <Card className="p-6">
            <h4 className="mb-4">SEO Рекомендации</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-green-700 dark:text-green-400">
                    Отличная оптимизация meta-описаний
                  </h5>
                  <p className="text-sm text-green-600 dark:text-green-500">
                    95% ваших страниц имеют уникальные и информативные meta-описания
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                    Рекомендуется оптимизировать изображения
                  </h5>
                  <p className="text-sm text-yellow-600 dark:text-yellow-500">
                    12 изображений не имеют alt-атрибутов. Добавьте описания для лучшей доступности
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                <div>
                  <h5 className="text-sm font-medium text-blue-700 dark:text-blue-400">
                    Возможности для улучшения
                  </h5>
                  <p className="text-sm text-blue-600 dark:text-blue-500">
                    Добавьте структурированные данные для лучшего отображения в поисковой выдаче
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>

        {/* Аналитика контента */}
        <TabsContent value="analytics" className="space-y-6">
          <div>
            <h3>Аналитика контента</h3>
            <p className="text-sm text-muted-foreground">
              Статистика просмотров, вовлечённости и конверсий
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Всего просмотров</span>
                </div>
                <span className="text-2xl font-bold">127,543</span>
                <p className="text-xs text-muted-foreground">+18% за месяц</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Уникальные читатели</span>
                </div>
                <span className="text-2xl font-bold">48,291</span>
                <p className="text-xs text-muted-foreground">+12% за месяц</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">Среднее время</span>
                </div>
                <span className="text-2xl font-bold">3:24</span>
                <p className="text-xs text-muted-foreground">на странице</p>
              </div>
            </Card>

            <Card className="p-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <ThumbsUp className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Лайки</span>
                </div>
                <span className="text-2xl font-bold">2,847</span>
                <p className="text-xs text-muted-foreground">+31% за месяц</p>
              </div>
            </Card>
          </div>

          {/* Топ контента */}
          <Card className="p-6">
            <h4 className="mb-4">Топ контента по просмотрам</h4>
            <div className="space-y-4">
              {contentItems.slice(0, 5).map((item, index) => (
                <div key={item.id} className="flex items-center gap-4 p-3 hover:bg-muted/50 rounded-lg">
                  <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h5 className="font-medium">{item.title[currentLanguage] || item.title.ru}</h5>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{item.views} просмотров</span>
                      <span>{item.likes} лайков</span>
                      <span>{formatDate(item.updatedAt)}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {((item.views / 127543) * 100).toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">от общего трафика</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактора контента */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editorMode === 'create' ? 'Создать новый контент' : 'Редактировать контент'}
            </DialogTitle>
            <DialogDescription>
              {editorMode === 'create' 
                ? 'Создайте новую статью, новость или страницу для сайта'
                : 'Редактируйте существующий контент'
              }
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Настройки контента */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Тип контента</Label>
                <Select defaultValue="article">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Статья</SelectItem>
                    <SelectItem value="news">Новость</SelectItem>
                    <SelectItem value="page">Страница</SelectItem>
                    <SelectItem value="product">Продукт</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Статус</Label>
                <Select defaultValue="draft">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Черновик</SelectItem>
                    <SelectItem value="review">На проверке</SelectItem>
                    {canPublish() && <SelectItem value="published">Опубликовать</SelectItem>}
                    <SelectItem value="scheduled">Запланировать</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Мультиязычные поля */}
            <Tabs value={currentLanguage} onValueChange={(value: Language) => setCurrentLanguage(value)}>
              <div className="flex items-center justify-between">
                <h4>Контент на разных языках</h4>
                <TabsList>
                  {Object.entries(languageLabels).map(([code, label]) => (
                    <TabsTrigger key={code} value={code}>
                      {label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>

              {Object.keys(languageLabels).map((language) => (
                <TabsContent key={language} value={language} className="space-y-4 mt-4">
                  <div>
                    <Label>Заголовок ({languageLabels[language as Language]})</Label>
                    <Input placeholder={`Введите заголовок на ${languageLabels[language as Language].toLowerCase()}...`} />
                  </div>
                  
                  <div>
                    <Label>Краткое описание</Label>
                    <Textarea 
                      placeholder="Краткое описание для превью и поисковых систем..." 
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label>URL (slug)</Label>
                    <Input placeholder="url-slug-for-page" />
                  </div>
                  
                  <div>
                    <Label>Основной контент</Label>
                    <div className="border rounded-lg p-4 min-h-[400px] bg-muted/50">
                      <div className="flex items-center gap-2 mb-4 p-2 border-b">
                        <Button variant="ghost" size="sm">
                          <Bold className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Italic className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Underline className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm">
                          <List className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Image className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Link className="w-4 h-4" />
                        </Button>
                        <Separator orientation="vertical" className="h-6" />
                        <Button variant="ghost" size="sm">
                          <AlignLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlignCenter className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <AlignRight className="w-4 h-4" />
                        </Button>
                      </div>
                      <Textarea 
                        placeholder={`Введите основной текст на ${languageLabels[language as Language].toLowerCase()}...`}
                        className="min-h-[300px] bg-background border-none"
                      />
                    </div>
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            {/* SEO настройки */}
            <Card className="p-4">
              <h4 className="mb-4">SEO настройки</h4>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Meta Title</Label>
                    <Input placeholder="SEO заголовок для поисковых систем" />
                    <p className="text-xs text-muted-foreground mt-1">Рекомендуется: 50-60 символов</p>
                  </div>
                  <div>
                    <Label>Meta Keywords</Label>
                    <Input placeholder="ключевые, слова, через, запятую" />
                  </div>
                </div>
                
                <div>
                  <Label>Meta Description</Label>
                  <Textarea 
                    placeholder="Описание для поисковых систем и превью в соцсетях" 
                    rows={2}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Рекомендуется: 150-160 символов</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Open Graph Title</Label>
                    <Input placeholder="Заголовок для социальных сетей" />
                  </div>
                  <div>
                    <Label>Open Graph Image</Label>
                    <div className="flex gap-2">
                      <Input placeholder="URL изображения" className="flex-1" />
                      <Button variant="outline" size="sm">
                        <Image className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Дополнительные настройки */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label>Теги</Label>
                  <Input placeholder="теги, через, запятую" />
                </div>
                
                <div>
                  <Label>Соавторы</Label>
                  <Input placeholder="Имена соавторов через запятую" />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="featured" />
                  <Label htmlFor="featured">Рекомендуемый контент</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Switch id="comments" defaultChecked />
                  <Label htmlFor="comments">Разрешить комментарии</Label>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Дата публикации</Label>
                  <Input type="datetime-local" />
                </div>
                
                <div>
                  <Label>Главное изображение</Label>
                  <div className="flex gap-2">
                    <Input placeholder="URL изображения" className="flex-1" />
                    <Button variant="outline" size="sm" onClick={() => setIsMediaLibraryOpen(true)}>
                      <Image className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div>
                  <Label>Медиа галерея</Label>
                  <div className="flex gap-2">
                    <Input placeholder="Дополнительные изображения" className="flex-1" />
                    <Button variant="outline" size="sm">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button variant="outline" onClick={() => setIsAIGeneratorOpen(true)}>
                  <Sparkles className="w-4 h-4 mr-2" />
                  AI Помощник
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Предварительный просмотр
                </Button>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                  Отменить
                </Button>
                <Button variant="outline">
                  <Save className="w-4 h-4 mr-2" />
                  Сохранить черновик
                </Button>
                <Button onClick={() => setIsEditorOpen(false)}>
                  <Send className="w-4 h-4 mr-2" />
                  {canPublish() ? 'Опубликовать' : 'Отправить на проверку'}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог AI генератора */}
      <Dialog open={isAIGeneratorOpen} onOpenChange={setIsAIGeneratorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>AI Генератор контента</DialogTitle>
            <DialogDescription>
              Создайте контент с помощью искусственного интеллекта
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Язык генерации</Label>
                <Select defaultValue="ru">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(languageLabels).map(([code, label]) => (
                      <SelectItem key={code} value={code}>{label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тип контента</Label>
                <Select defaultValue="article">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="article">Статья</SelectItem>
                    <SelectItem value="news">Новость</SelectItem>
                    <SelectItem value="product">Описание продукта</SelectItem>
                    <SelectItem value="page">Страница сайта</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Тема или запрос</Label>
              <Textarea 
                placeholder="Опишите, о чём должен быть контент. Например: 'Статья о новых яхтах в нашем флоте с акцентом на премиум-сервис'"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label>Стиль написания</Label>
                <Select defaultValue="professional">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="casual">Неформальный</SelectItem>
                    <SelectItem value="marketing">Маркетинговый</SelectItem>
                    <SelectItem value="technical">Технический</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Длина текста</Label>
                <Select defaultValue="medium">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">Короткий (300-500 слов)</SelectItem>
                    <SelectItem value="medium">Средний (500-1000 слов)</SelectItem>
                    <SelectItem value="long">Длинный (1000+ слов)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Тон повествования</Label>
                <Select defaultValue="friendly">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professional">Профессиональный</SelectItem>
                    <SelectItem value="friendly">Дружелюбный</SelectItem>
                    <SelectItem value="persuasive">Убедительный</SelectItem>
                    <SelectItem value="informative">Информативный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Ключевые слова</Label>
              <Input placeholder="яхты, премиум, аренда, Сочи (через запятую)" />
              <p className="text-xs text-muted-foreground mt-1">
                AI будет естественно включать эти слова в текст для SEO
              </p>
            </div>

            <div className="space-y-3">
              <Label>Дополнительные опции</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Switch id="ai-seo" defaultChecked />
                  <Label htmlFor="ai-seo">Генерировать SEO метатеги</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ai-structure" defaultChecked />
                  <Label htmlFor="ai-structure">Структурированный текст с заголовками</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="ai-translate" />
                  <Label htmlFor="ai-translate">Автоматически перевести на другие языки</Label>
                </div>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Bot className="w-4 h-4 text-blue-500" />
                <span className="text-sm font-medium">AI Превью генерации</span>
              </div>
              <p className="text-sm text-muted-foreground">
                На основе ваших настроек будет создан профессиональный контент на русском языке 
                в среднем объёме с дружелюбным тоном. Включены SEO-оптимизация и структурирование.
              </p>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsAIGeneratorOpen(false)}>
                Отменить
              </Button>
              <Button className="flex-1" onClick={() => setIsAIGeneratorOpen(false)}>
                <Sparkles className="w-4 h-4 mr-2" />
                Генерировать контент
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог медиатеки */}
      <Dialog open={isMediaLibraryOpen} onOpenChange={setIsMediaLibraryOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Медиатека</DialogTitle>
            <DialogDescription>
              Выберите файлы для добавления в контент
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input 
                  placeholder="Поиск по файлам..."
                  className="pl-10"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="image">Изображения</SelectItem>
                  <SelectItem value="video">Видео</SelectItem>
                  <SelectItem value="document">Документы</SelectItem>
                  <SelectItem value="audio">Аудио</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Загрузить
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredMedia.map((file) => (
                <Card 
                  key={file.id} 
                  className={`p-3 cursor-pointer transition-all ${
                    selectedMedia.includes(file) ? 'ring-2 ring-primary' : 'hover:shadow-lg'
                  }`}
                  onClick={() => {
                    if (selectedMedia.includes(file)) {
                      setSelectedMedia(selectedMedia.filter(f => f.id !== file.id));
                    } else {
                      setSelectedMedia([...selectedMedia, file]);
                    }
                  }}
                >
                  <div className="space-y-2">
                    <div className="aspect-video bg-muted rounded flex items-center justify-center relative overflow-hidden">
                      {file.type === 'image' ? (
                        <img
                          src={file.thumbnailUrl || file.url}
                          alt={file.alt[currentLanguage] || file.alt.ru}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center">
                          {getMediaTypeIcon(file.type)}
                          <span className="text-xs mt-1">{file.format}</span>
                        </div>
                      )}
                      
                      {selectedMedia.includes(file) && (
                        <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                    
                    <div>
                      <h5 className="text-sm font-medium truncate">{file.name}</h5>
                      <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Выбрано файлов: {selectedMedia.length}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsMediaLibraryOpen(false)}>
                  Отменить
                </Button>
                <Button onClick={() => setIsMediaLibraryOpen(false)}>
                  Добавить выбранные ({selectedMedia.length})
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}