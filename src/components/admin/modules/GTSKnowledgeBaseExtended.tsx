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
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, Download, Upload, Copy,
  BookOpen, FileText, GraduationCap, HelpCircle, Star, ThumbsUp, ThumbsDown,
  Clock, Calendar, User, Tag, Globe, Lock, Settings, Play, Pause,
  CheckCircle, AlertCircle, XCircle, RotateCcw, Send, MessageCircle,
  Bookmark, Share2, ExternalLink, ArrowRight, ChevronRight, ChevronDown,
  History, GitBranch, Archive, Folder, FolderOpen, Image, Video,
  Monitor, Smartphone, Tablet, Users, Building, Shield, Target,
  Zap, Bell, Mail, Phone, MapPin, Link, Hash, Flag, Award
} from 'lucide-react';

interface KnowledgeBaseProps {
  userRole: string;
}

type ArticleStatus = 'draft' | 'review' | 'published' | 'archived';
type ArticleVisibility = 'public' | 'internal' | 'restricted' | 'partners';
type CourseStatus = 'not-started' | 'in-progress' | 'completed';

interface KnowledgeArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  subcategory?: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  status: ArticleStatus;
  visibility: ArticleVisibility;
  views: number;
  likes: number;
  version: number;
  versions: ArticleVersion[];
  attachments: string[];
  relatedArticles: string[];
}

interface ArticleVersion {
  id: string;
  version: number;
  author: string;
  createdAt: string;
  changes: string;
  content: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  duration: number; // в минутах
  lessons: Lesson[];
  completionRate: number;
  enrolledUsers: number;
  instructor: string;
  createdAt: string;
  thumbnailUrl?: string;
  tags: string[];
  status: 'active' | 'draft' | 'archived';
}

interface Lesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'presentation' | 'quiz';
  duration: number;
  content: string;
  videoUrl?: string;
  presentationUrl?: string;
  quizQuestions?: QuizQuestion[];
  completed: boolean;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
  tags: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  helpful: number;
  notHelpful: number;
  views: number;
  status: 'published' | 'draft';
}

export function GTSKnowledgeBaseExtended({ userRole }: KnowledgeBaseProps) {
  const [activeTab, setActiveTab] = useState('knowledge');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<KnowledgeArticle | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
  const [isFAQFormOpen, setIsFAQFormOpen] = useState(false);

  // Mock данные статей базы знаний
  const knowledgeArticles: KnowledgeArticle[] = [
    {
      id: 'kb-001',
      title: 'Процедура оформления бронирования яхты',
      content: 'Полное руководство по оформлению бронирования...',
      excerpt: 'Пошаговое руководство по процессу бронирования яхт и катеров для клиентов',
      category: 'Бронирование',
      subcategory: 'Яхты',
      tags: ['бронирование', 'яхты', 'процедуры', 'клиенты'],
      author: 'Мария Петрова',
      createdAt: '2024-06-15T00:00:00Z',
      updatedAt: '2024-06-20T00:00:00Z',
      status: 'published',
      visibility: 'internal',
      views: 245,
      likes: 18,
      version: 2,
      versions: [
        {
          id: 'v1',
          version: 1,
          author: 'Мария Петрова',
          createdAt: '2024-06-15T00:00:00Z',
          changes: 'Первоначальная версия',
          content: 'Исходное содержание...'
        }
      ],
      attachments: ['booking-checklist.pdf', 'yacht-specs.xlsx'],
      relatedArticles: ['kb-002', 'kb-005']
    },
    {
      id: 'kb-002',
      title: 'Техника безопасности на воде',
      content: 'Важные правила безопасности...',
      excerpt: 'Основные правила безопасности для экипажа и гостей во время морских прогулок',
      category: 'Безопасность',
      tags: ['безопасность', 'правила', 'экипаж', 'гости'],
      author: 'Капитан Сергей Волков',
      createdAt: '2024-06-10T00:00:00Z',
      updatedAt: '2024-06-18T00:00:00Z',
      status: 'published',
      visibility: 'public',
      views: 189,
      likes: 25,
      version: 1,
      versions: [],
      attachments: ['safety-rules.pdf'],
      relatedArticles: ['kb-003']
    },
    {
      id: 'kb-003',
      title: 'Обслуживание партнёрских программ',
      content: 'Руководство по работе с партнёрами...',
      excerpt: 'Инструкции по управлению отношениями с агентами и партнёрскими компаниями',
      category: 'Партнёрство',
      tags: ['партнёры', 'агенты', 'комиссии', 'договоры'],
      author: 'Анна Козлова',
      createdAt: '2024-06-12T00:00:00Z',
      updatedAt: '2024-06-12T00:00:00Z',
      status: 'review',
      visibility: 'restricted',
      views: 67,
      likes: 8,
      version: 1,
      versions: [],
      attachments: [],
      relatedArticles: []
    }
  ];

  // Mock данные курсов
  const courses: Course[] = [
    {
      id: 'course-001',
      title: 'Основы работы с клиентами Premium-сегмента',
      description: 'Комплексный курс по обслуживанию VIP-клиентов и созданию незабываемых впечатлений',
      category: 'Клиентский сервис',
      difficulty: 'intermediate',
      duration: 180, // 3 часа
      lessons: [
        {
          id: 'lesson-001',
          title: 'Психология Premium-клиента',
          type: 'video',
          duration: 45,
          content: 'Особенности работы с требовательными клиентами...',
          videoUrl: 'https://example.com/video1.mp4',
          completed: true
        },
        {
          id: 'lesson-002',
          title: 'Протокол обслуживания VIP-гостей',
          type: 'presentation',
          duration: 30,
          content: 'Стандарты сервиса для Premium-сегмента...',
          presentationUrl: 'https://example.com/presentation1.pdf',
          completed: false
        },
        {
          id: 'lesson-003',
          title: 'Тест: Ситуационные задачи',
          type: 'quiz',
          duration: 15,
          content: 'Проверьте свои знания...',
          quizQuestions: [
            {
              id: 'q1',
              question: 'Как правильно встретить VIP-гостя на причале?',
              options: [
                'Просто поприветствовать',
                'Встретить с табличкой и проводить на борт',
                'Встретить лично, представиться, предложить освежающий напиток',
                'Позвонить и сказать где найти яхту'
              ],
              correctAnswer: 2,
              explanation: 'VIP-клиенты ценят персональное внимание и заботу с первых минут'
            }
          ],
          completed: false
        }
      ],
      completionRate: 75,
      enrolledUsers: 12,
      instructor: 'Елена Морская',
      createdAt: '2024-06-01T00:00:00Z',
      thumbnailUrl: 'https://example.com/course1-thumb.jpg',
      tags: ['клиенты', 'сервис', 'vip', 'обучение'],
      status: 'active'
    },
    {
      id: 'course-002',  
      title: 'Техническое обслуживание катеров',
      description: 'Практический курс по диагностике и устранению основных неисправностей',
      category: 'Техническое обслуживание',
      difficulty: 'advanced',
      duration: 240, // 4 часа
      lessons: [
        {
          id: 'lesson-004',
          title: 'Диагностика двигателя',
          type: 'video',
          duration: 60,
          content: 'Основные методы диагностики...',
          completed: false
        }
      ],
      completionRate: 0,
      enrolledUsers: 8,
      instructor: 'Михаил Техник',
      createdAt: '2024-06-05T00:00:00Z',
      tags: ['техника', 'ремонт', 'двигатель', 'диагностика'],
      status: 'active'
    }
  ];

  // Mock данные FAQ
  const faqItems: FAQItem[] = [
    {
      id: 'faq-001',
      question: 'Как отменить бронирование и вернуть депозит?',
      answer: 'Для отмены бронирования необходимо уведомить не менее чем за 48 часов. Депозит возвращается в полном объёме при отмене за 72 часа, 50% при отмене за 48 часов.',
      category: 'Бронирование',
      tags: ['отмена', 'депозит', 'возврат'],
      author: 'Система',
      createdAt: '2024-06-01T00:00:00Z',
      updatedAt: '2024-06-15T00:00:00Z',
      helpful: 23,
      notHelpful: 2,
      views: 156,
      status: 'published'
    },
    {
      id: 'faq-002',
      question: 'Какие документы нужны для аренды яхты?',
      answer: 'Необходимы: паспорт капитана с действующими правами, страховка судна, список пассажиров, медицинские справки для экипажа.',
      category: 'Документы',
      tags: ['документы', 'права', 'страховка'],
      author: 'Мария Петрова',
      createdAt: '2024-06-02T00:00:00Z',
      updatedAt: '2024-06-02T00:00:00Z',
      helpful: 18,
      notHelpful: 1,
      views: 89,
      status: 'published'
    },
    {
      id: 'faq-003',
      question: 'Как рассчитывается комиссия агента?',
      answer: 'Комиссия агента составляет 10-15% от стоимости тура в зависимости от категории услуги и объёма продаж за месяц.',
      category: 'Партнёрство',
      tags: ['комиссия', 'агенты', 'расчёт'],
      author: 'Анна Козлова',
      createdAt: '2024-06-03T00:00:00Z',
      updatedAt: '2024-06-10T00:00:00Z',
      helpful: 12,
      notHelpful: 0,
      views: 67,
      status: 'published'
    }
  ];

  // Все доступные теги
  const allTags = Array.from(
    new Set([
      ...knowledgeArticles.flatMap(article => article.tags),
      ...courses.flatMap(course => course.tags),
      ...faqItems.flatMap(faq => faq.tags)
    ])
  ).sort();

  // Категории статей
  const articleCategories = Array.from(
    new Set(knowledgeArticles.map(article => article.category))
  ).sort();

  // Функции фильтрации
  const filteredArticles = knowledgeArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || article.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || article.status === statusFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => article.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesStatus && matchesTags;
  });

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => course.tags.includes(tag));
    
    return matchesSearch && matchesTags;
  });

  const filteredFAQ = faqItems.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || faq.category === categoryFilter;
    const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => faq.tags.includes(tag));
    
    return matchesSearch && matchesCategory && matchesTags;
  });

  // Вспомогательные функции
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

  const getStatusBadge = (status: ArticleStatus) => {
    switch (status) {
      case 'published':
        return <Badge className="bg-green-500/10 text-green-500">Опубликовано</Badge>;
      case 'draft':
        return <Badge variant="outline">Черновик</Badge>;
      case 'review':
        return <Badge variant="outline" className="text-yellow-600">На проверке</Badge>;
      case 'archived':
        return <Badge variant="secondary">Архив</Badge>;
      default:
        return <Badge variant="secondary">Неизвестно</Badge>;
    }
  };

  const getVisibilityBadge = (visibility: ArticleVisibility) => {
    switch (visibility) {
      case 'public':
        return <Badge className="bg-blue-500/10 text-blue-500"><Globe className="w-3 h-3 mr-1" />Публично</Badge>;
      case 'internal':
        return <Badge variant="outline"><Building className="w-3 h-3 mr-1" />Внутренний</Badge>;
      case 'restricted':
        return <Badge variant="outline" className="text-orange-600"><Shield className="w-3 h-3 mr-1" />Ограниченный</Badge>;
      case 'partners':
        return <Badge variant="outline" className="text-purple-600"><Users className="w-3 h-3 mr-1" />Партнёры</Badge>;
      default:
        return <Badge variant="secondary">Неопределён</Badge>;
    }
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return <Badge className="bg-green-500/10 text-green-500">Начальный</Badge>;
      case 'intermediate':
        return <Badge className="bg-yellow-500/10 text-yellow-500">Средний</Badge>;
      case 'advanced':
        return <Badge className="bg-red-500/10 text-red-500">Продвинутый</Badge>;
      default:
        return <Badge variant="secondary">Не указан</Badge>;
    }
  };

  const canEdit = (article: KnowledgeArticle) => {
    return userRole === 'executive' || userRole === 'manager' || 
           (userRole === 'editor' && article.author === 'Текущий пользователь');
  };

  const canCreateContent = () => {
    return ['executive', 'manager', 'editor'].includes(userRole);
  };

  const canPublish = () => {
    return ['executive', 'manager'].includes(userRole);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Заголовок */}
      <div className="flex items-center justify-between">
        <div>
          <h1>База знаний</h1>
          <p className="text-muted-foreground">
            Централизованное хранилище знаний, процедур и обучающих материалов
          </p>
        </div>
        <div className="flex items-center gap-3">
          {canCreateContent() && (
            <>
              <Button variant="outline" onClick={() => setIsCreateCourseOpen(true)}>
                <GraduationCap className="w-4 h-4 mr-2" />
                Создать курс
              </Button>
              <Button onClick={() => setIsEditorOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Создать статью
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
                placeholder="Поиск по статьям, курсам и FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все категории</SelectItem>
                {articleCategories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="published">Опубликовано</SelectItem>
                <SelectItem value="draft">Черновик</SelectItem>
                <SelectItem value="review">На проверке</SelectItem>
                <SelectItem value="archived">Архив</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Облако тегов */}
          <div>
            <Label className="mb-2 block">Популярные теги:</Label>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 15).map(tag => (
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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="knowledge">
            <BookOpen className="w-4 h-4 mr-2" />
            База знаний
          </TabsTrigger>
          <TabsTrigger value="procedures">
            <FileText className="w-4 h-4 mr-2" />
            Процедуры
          </TabsTrigger>
          <TabsTrigger value="courses">
            <GraduationCap className="w-4 h-4 mr-2" />
            Обучение
          </TabsTrigger>
          <TabsTrigger value="faq">
            <HelpCircle className="w-4 h-4 mr-2" />
            FAQ
          </TabsTrigger>
        </TabsList>

        {/* База знаний компании */}
        <TabsContent value="knowledge" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <h3 className="line-clamp-2">{article.title}</h3>
                    <div className="flex items-center gap-2 ml-4">
                      {getStatusBadge(article.status)}
                      {getVisibilityBadge(article.visibility)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {article.author}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {formatDate(article.updatedAt)}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {article.views}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {article.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                    {article.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{article.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="w-4 h-4" />
                      {article.likes}
                      <span className="mx-1">•</span>
                      <History className="w-4 h-4" />
                      v{article.version}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm" onClick={() => setSelectedArticle(article)}>
                        <Eye className="w-4 h-4" />
                      </Button>
                      {canEdit(article) && (
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        <Share2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Процедуры и регламенты */}
        <TabsContent value="procedures" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredArticles
              .filter(article => ['Процедуры', 'Регламенты', 'Безопасность'].includes(article.category))
              .map((article) => (
              <Card key={article.id} className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <h3>{article.title}</h3>
                      <Badge variant="outline">{article.category}</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(article.status)}
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground">
                    {article.excerpt}
                  </p>
                  
                  {article.attachments.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-sm">Приложения:</Label>
                      <div className="space-y-1">
                        {article.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center gap-2 text-sm">
                            <FileText className="w-4 h-4 text-muted-foreground" />
                            <span>{attachment}</span>
                            <Button variant="ghost" size="sm">
                              <Download className="w-3 h-3" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      Обновлено: {formatDate(article.updatedAt)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Открыть
                      </Button>
                      {canEdit(article) && (
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Обучающие материалы */}
        <TabsContent value="courses" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <Card key={course.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <h3>{course.title}</h3>
                    <div className="flex items-center gap-2">
                      {getDifficultyBadge(course.difficulty)}
                      <Badge variant="outline">{course.category}</Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {course.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Прогресс курса</span>
                      <span>{course.completionRate}%</span>
                    </div>
                    <Progress value={course.completionRate} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {Math.floor(course.duration / 60)}ч {course.duration % 60}м
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {course.enrolledUsers} студентов
                    </div>
                    <div className="flex items-center gap-1">
                      <GraduationCap className="w-4 h-4" />
                      {course.lessons.length} уроков
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="w-4 h-4" />
                      {course.instructor}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {course.tags.slice(0, 3).map(tag => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Button 
                      className="flex-1"
                      onClick={() => setSelectedCourse(course)}
                    >
                      {course.completionRate > 0 ? (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Продолжить
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4 mr-2" />
                          Начать курс
                        </>
                      )}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Bookmark className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* FAQ */}
        <TabsContent value="faq" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3>Часто задаваемые вопросы</h3>
              <p className="text-sm text-muted-foreground">
                Найдите ответы на популярные вопросы или задайте новый
              </p>
            </div>
            <Button variant="outline" onClick={() => setIsFAQFormOpen(true)}>
              <MessageCircle className="w-4 h-4 mr-2" />
              Задать вопрос
            </Button>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {filteredFAQ.map((faq) => (
              <Card key={faq.id}>
                <AccordionItem value={faq.id} className="border-none">
                  <AccordionTrigger className="px-6 py-4 text-left">
                    <div className="flex items-start justify-between w-full mr-4">
                      <div className="space-y-2">
                        <h4>{faq.question}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">{faq.category}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {faq.views} просмотров
                          </span>
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <div className="space-y-4">
                      <p className="text-sm">{faq.answer}</p>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-muted-foreground">Был ли ответ полезен?</span>
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm" className="text-green-600">
                              <ThumbsUp className="w-4 h-4 mr-1" />
                              {faq.helpful}
                            </Button>
                            <Button variant="ghost" size="sm" className="text-red-600">
                              <ThumbsDown className="w-4 h-4 mr-1" />
                              {faq.notHelpful}
                            </Button>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <User className="w-4 h-4" />
                          {faq.author}
                          <span>•</span>
                          {formatDate(faq.updatedAt)}
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {faq.tags.map(tag => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Card>
            ))}
          </Accordion>
        </TabsContent>
      </Tabs>

      {/* Диалог редактора статей */}
      <Dialog open={isEditorOpen} onOpenChange={setIsEditorOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактор статей</DialogTitle>
            <DialogDescription>
              Создайте новую статью для базы знаний
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Заголовок статьи</Label>
                <Input placeholder="Введите заголовок статьи" />
              </div>
              <div>
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="knowledge">База знаний</SelectItem>
                    <SelectItem value="procedures">Процедуры</SelectItem>
                    <SelectItem value="safety">Безопасность</SelectItem>
                    <SelectItem value="partnership">Партнёрство</SelectItem>
                    <SelectItem value="booking">Бронирование</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Краткое описание</Label>
              <Textarea placeholder="Краткое описание статьи для предварительного просмотра" rows={2} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Видимость</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите уровень доступа" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="public">Публично</SelectItem>
                    <SelectItem value="internal">Внутренний</SelectItem>
                    <SelectItem value="restricted">Ограниченный</SelectItem>
                    <SelectItem value="partners">Партнёры</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Теги (через запятую)</Label>
                <Input placeholder="процедуры, безопасность, инструкции" />
              </div>
            </div>

            <div>
              <Label>Содержание статьи</Label>
              <div className="border rounded-lg p-4 min-h-[300px] bg-muted/50">
                <p className="text-sm text-muted-foreground mb-4">
                  💡 Здесь будет WYSIWYG редактор с поддержкой форматирования, изображений и таблиц
                </p>
                <Textarea 
                  placeholder="Введите содержание статьи..." 
                  className="min-h-[250px] bg-background"
                />
              </div>
            </div>

            <div>
              <Label>Связанные статьи</Label>
              <Input placeholder="ID связанных статей через запятую" />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Switch id="save-draft" />
                <Label htmlFor="save-draft">Сохранить как черновик</Label>
              </div>
              
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setIsEditorOpen(false)}>
                  Отменить
                </Button>
                <Button variant="outline">
                  <Eye className="w-4 h-4 mr-2" />
                  Предварительный просмотр
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

      {/* Диалог создания курса */}
      <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Создать новый курс</DialogTitle>
            <DialogDescription>
              Создайте обучающий курс для сотрудников или партнёров
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label>Название курса</Label>
              <Input placeholder="Введите название курса" />
            </div>

            <div>
              <Label>Описание курса</Label>
              <Textarea placeholder="Подробное описание курса и его целей" rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Клиентский сервис</SelectItem>
                    <SelectItem value="technical">Техническое обслуживание</SelectItem>
                    <SelectItem value="safety">Безопасность</SelectItem>
                    <SelectItem value="management">Управление</SelectItem>
                    <SelectItem value="partnership">Партнёрство</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Уровень сложности</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите уровень" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Начальный</SelectItem>
                    <SelectItem value="intermediate">Средний</SelectItem>
                    <SelectItem value="advanced">Продвинутый</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Инструктор</Label>
                <Input placeholder="Имя инструктора" />
              </div>
              <div>
                <Label>Предполагаемая длительность (мин)</Label>
                <Input type="number" placeholder="120" />
              </div>
            </div>

            <div>
              <Label>Теги курса</Label>
              <Input placeholder="обучение, сервис, клиенты" />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsCreateCourseOpen(false)}>
                Отменить
              </Button>
              <Button onClick={() => setIsCreateCourseOpen(false)}>
                Создать курс
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог отправки вопроса FAQ */}
      <Dialog open={isFAQFormOpen} onOpenChange={setIsFAQFormOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Задать вопрос</DialogTitle>
            <DialogDescription>
              Отправьте свой вопрос для добавления в базу FAQ
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            <div>
              <Label>Ваш вопрос</Label>
              <Textarea placeholder="Задайте ваш вопрос максимально конкретно..." rows={3} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Категория</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите категорию" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Бронирование</SelectItem>
                    <SelectItem value="documents">Документы</SelectItem>
                    <SelectItem value="partnership">Партнёрство</SelectItem>
                    <SelectItem value="safety">Безопасность</SelectItem>
                    <SelectItem value="technical">Техническая поддержка</SelectItem>
                    <SelectItem value="other">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Приоритет</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите приоритет" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Низкий</SelectItem>
                    <SelectItem value="medium">Средний</SelectItem>
                    <SelectItem value="high">Высокий</SelectItem>
                    <SelectItem value="urgent">Срочный</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Дополнительная информация</Label>
              <Textarea placeholder="Укажите контекст или дополнительные детали..." rows={2} />
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setIsFAQFormOpen(false)}>
                Отменить
              </Button>
              <Button onClick={() => setIsFAQFormOpen(false)}>
                <Send className="w-4 h-4 mr-2" />
                Отправить вопрос
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог просмотра статьи */}
      {selectedArticle && (
        <Dialog open={!!selectedArticle} onOpenChange={() => setSelectedArticle(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedArticle.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-2">
                    {getStatusBadge(selectedArticle.status)}
                    {getVisibilityBadge(selectedArticle.visibility)}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>Автор: {selectedArticle.author}</span>
                    <span>Обновлено: {formatDateTime(selectedArticle.updatedAt)}</span>
                    <span>Просмотры: {selectedArticle.views}</span>
                    <span>Версия: {selectedArticle.version}</span>
                  </div>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <div className="prose prose-sm max-w-none">
                <p>{selectedArticle.content}</p>
              </div>

              {selectedArticle.attachments.length > 0 && (
                <div>
                  <h4 className="mb-3">Приложения</h4>
                  <div className="space-y-2">
                    {selectedArticle.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 border rounded">
                        <FileText className="w-4 h-4 text-muted-foreground" />
                        <span className="flex-1">{attachment}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="mb-3">Теги</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedArticle.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm">
                    <ThumbsUp className="w-4 h-4 mr-1" />
                    {selectedArticle.likes}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="w-4 h-4 mr-1" />
                    Поделиться
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Copy className="w-4 h-4 mr-1" />
                    Копировать ссылку
                  </Button>
                </div>
                
                {canEdit(selectedArticle) && (
                  <div className="flex items-center gap-2">
                    <Button variant="outline">
                      <Edit className="w-4 h-4 mr-2" />
                      Редактировать
                    </Button>
                    <Button variant="outline">
                      <History className="w-4 h-4 mr-2" />
                      История версий
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Диалог просмотра курса */}
      {selectedCourse && (
        <Dialog open={!!selectedCourse} onOpenChange={() => setSelectedCourse(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedCourse.title}</DialogTitle>
              <DialogDescription>
                <div className="flex items-center gap-4 mt-2">
                  {getDifficultyBadge(selectedCourse.difficulty)}
                  <Badge variant="outline">{selectedCourse.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    Инструктор: {selectedCourse.instructor}
                  </span>
                </div>
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6">
              <p className="text-muted-foreground">
                {selectedCourse.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <p className="text-2xl font-semibold">{selectedCourse.lessons.length}</p>
                  <p className="text-sm text-muted-foreground">Уроков</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">
                    {Math.floor(selectedCourse.duration / 60)}ч {selectedCourse.duration % 60}м
                  </p>
                  <p className="text-sm text-muted-foreground">Длительность</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-semibold">{selectedCourse.completionRate}%</p>
                  <p className="text-sm text-muted-foreground">Прогресс</p>
                </div>
              </div>

              <div>
                <h4 className="mb-4">Программа курса</h4>
                <div className="space-y-3">
                  {selectedCourse.lessons.map((lesson, index) => (
                    <div key={lesson.id} className="flex items-center gap-3 p-3 border rounded-lg">
                      <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <h5 className="font-medium">{lesson.title}</h5>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{lesson.type === 'video' ? '📹' : lesson.type === 'quiz' ? '📝' : '📄'} {lesson.type === 'video' ? 'Видео' : lesson.type === 'quiz' ? 'Тест' : 'Презентация'}</span>
                          <span>{lesson.duration} мин</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {lesson.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-500" />
                        ) : (
                          <Button size="sm" variant="outline">
                            <Play className="w-4 h-4 mr-1" />
                            Начать
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="mb-3">Теги курса</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedCourse.tags.map(tag => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button className="flex-1">
                  <Play className="w-4 h-4 mr-2" />
                  {selectedCourse.completionRate > 0 ? 'Продолжить обучение' : 'Начать курс'}
                </Button>
                <Button variant="outline">
                  <Bookmark className="w-4 h-4 mr-2" />
                  В избранное
                </Button>
                <Button variant="outline">
                  <Share2 className="w-4 h-4 mr-2" />
                  Поделиться
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}