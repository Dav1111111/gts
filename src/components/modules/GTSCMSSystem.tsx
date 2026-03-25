import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { 
  Layout,
  FileText,
  Search as SearchIcon,
  Users,
  Tag,
  ArrowLeft,
  Plus,
  Edit,
  Eye,
  Trash2,
  Settings,
  TrendingUp,
  Globe,
  Image,
  Video,
  Heart,
  MessageCircle,
  Share2
} from "lucide-react";

/**
 * 10_CMS - Централизованная система управления контентом
 * 
 * МИГРАЦИЯ: Объединяет контентные модули из legacy системы:
 * - [LEGACY] Карточки офферов/предложений → Offers Tab
 * - [LEGACY] Новостные блоки → News Tab  
 * - [LEGACY] SEO компоненты → SEO Tab
 * - [LEGACY] UGC модули → UGC Tab
 * 
 * ✅ Все контентные карточки мигрированы в централизованную CMS
 */

interface GTSCMSSystemProps {
  onBackToHome: () => void;
}

const mockOffers = [
  {
    id: '1',
    title: 'Морская прогулка VIP',
    description: 'Эксклюзивная прогулка на премиум катере',
    price: 45000,
    status: 'active',
    category: 'Морские прогулки',
    created: '2024-01-15',
    views: 1247,
    bookings: 23,
    featured: true
  },
  {
    id: '2',
    title: 'Экстремальный багги-тур',
    description: 'Адреналиновое приключение в горах',
    price: 25000,
    status: 'active',
    category: 'Багги туры',
    created: '2024-01-20',
    views: 892,
    bookings: 18,
    featured: false
  },
  {
    id: '3',
    title: 'Вертолетная экскурсия',
    description: 'Панорамный полет над Сочи',
    price: 85000,
    status: 'draft',
    category: 'Авиация',
    created: '2024-02-01',
    views: 0,
    bookings: 0,
    featured: false
  }
];

const mockNews = [
  {
    id: '1',
    title: 'Новый катер в нашем флоте',
    excerpt: 'Мы расширили наш флот премиальным катером Yamaha 252S',
    content: 'Полная статья о новом катере...',
    status: 'published',
    author: 'Редакция GTS',
    publishDate: '2024-02-10',
    views: 2341,
    likes: 45,
    comments: 12,
    category: 'Новости флота'
  },
  {
    id: '2',
    title: 'Летние скидки 2024',
    excerpt: 'Специальные предложения на все виды активностей',
    content: 'Детали летних скидок...',
    status: 'scheduled',
    author: 'Маркетинг',
    publishDate: '2024-06-01',
    views: 0,
    likes: 0,
    comments: 0,
    category: 'Акции'
  }
];

const mockUGC = [
  {
    id: '1',
    author: 'Александр П.',
    content: 'Потрясающая морская прогулка! Команда профессиональная, катер в отличном состоянии.',
    type: 'review',
    rating: 5,
    service: 'Морская прогулка VIP',
    date: '2024-02-08',
    approved: true,
    likes: 23,
    replies: 2
  },
  {
    id: '2',
    author: 'Marina_S',
    content: 'Невероятные эмоции от полета на вертолете! Рекомендую всем!',
    type: 'social',
    platform: 'Instagram',
    service: 'Вертолетная экскурсия',
    date: '2024-02-05',
    approved: true,
    likes: 156,
    replies: 8
  }
];

const seoMetrics = [
  { keyword: 'морские прогулки сочи', position: 3, traffic: 1247, difficulty: 'medium' },
  { keyword: 'багги туры красная поляна', position: 1, traffic: 892, difficulty: 'low' },
  { keyword: 'вертолетные экскурсии', position: 7, traffic: 543, difficulty: 'high' },
  { keyword: 'активный отдых сочи', position: 5, traffic: 2156, difficulty: 'high' }
];

export function GTSCMSSystem({ onBackToHome }: GTSCMSSystemProps) {
  const [activeTab, setActiveTab] = useState('offers');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
      case 'published': return 'bg-green-500';
      case 'draft': return 'bg-gray-500';
      case 'scheduled': return 'bg-blue-500';
      case 'inactive': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Активно';
      case 'published': return 'Опубликовано';
      case 'draft': return 'Черновик';
      case 'scheduled': return 'Запланировано';
      case 'inactive': return 'Неактивно';
      default: return status;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low': return 'text-green-500';
      case 'medium': return 'text-yellow-500';
      case 'high': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg]">
      {/* Header */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className="text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div>
              <h1 className="text-xl text-[--gts-portal-text]" style={{ fontFamily: 'var(--font-heading)' }}>
                CMS - Управление контентом
              </h1>
              <p className="text-sm text-[--gts-portal-muted]">
                Предложения • Новости • SEO • UGC
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              <Globe className="w-4 h-4 mr-2" />
              Предпросмотр сайта
            </Button>
            <Button
              className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Создать
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-[--gts-portal-surface] border-b border-[--gts-portal-border] p-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">{mockOffers.length}</div>
            <div className="text-sm text-[--gts-portal-muted]">Активных предложений</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">{mockNews.length}</div>
            <div className="text-sm text-[--gts-portal-muted]">Новостей</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">5.2K</div>
            <div className="text-sm text-[--gts-portal-muted]">Органический трафик</div>
          </div>
          <div className="text-center">
            <div className="text-2xl text-[--gts-portal-text] font-semibold">{mockUGC.length}</div>
            <div className="text-sm text-[--gts-portal-muted]">UGC контента</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-[--gts-portal-surface] border border-[--gts-portal-border]">
            <TabsTrigger value="offers" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Layout className="w-4 h-4 mr-2" />
              Предложения
            </TabsTrigger>
            <TabsTrigger value="news" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <FileText className="w-4 h-4 mr-2" />
              Новости
            </TabsTrigger>
            <TabsTrigger value="seo" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <SearchIcon className="w-4 h-4 mr-2" />
              SEO
            </TabsTrigger>
            <TabsTrigger value="ugc" className="data-[state=active]:bg-[--gts-portal-accent] data-[state=active]:text-white">
              <Users className="w-4 h-4 mr-2" />
              UGC
            </TabsTrigger>
          </TabsList>

          {/* Offers */}
          <TabsContent value="offers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Предложения услуг</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Новое предложение
              </Button>
            </div>

            <div className="grid gap-4">
              {mockOffers.map((offer) => (
                <Card key={offer.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                        <Image className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-[--gts-portal-text] font-medium">{offer.title}</h3>
                          {offer.featured && (
                            <Badge className="bg-yellow-500 text-white text-xs">Рекомендуемое</Badge>
                          )}
                        </div>
                        <p className="text-sm text-[--gts-portal-muted] mb-2">{offer.description}</p>
                        <div className="flex items-center gap-4 text-sm text-[--gts-portal-muted]">
                          <span>💰 ₽{offer.price.toLocaleString()}</span>
                          <span>📊 {offer.views} просмотров</span>
                          <span>📅 {offer.bookings} бронирований</span>
                          <span>🏷️ {offer.category}</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={`${getStatusColor(offer.status)} text-white mb-3`}>
                        {getStatusText(offer.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <TrendingUp className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500/10"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* News */}
          <TabsContent value="news" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Новости и статьи</h2>
              <Button
                className="bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Новая статья
              </Button>
            </div>

            <div className="grid gap-4">
              {mockNews.map((article) => (
                <Card key={article.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center">
                        <FileText className="w-8 h-8 text-white" />
                      </div>
                      
                      <div>
                        <h3 className="text-[--gts-portal-text] font-medium mb-1">{article.title}</h3>
                        <p className="text-sm text-[--gts-portal-muted] mb-2">{article.excerpt}</p>
                        <div className="flex items-center gap-4 text-sm text-[--gts-portal-muted]">
                          <span>✍️ {article.author}</span>
                          <span>📅 {new Date(article.publishDate).toLocaleDateString('ru-RU')}</span>
                          <span>👁️ {article.views} просмотров</span>
                          <span>🏷️ {article.category}</span>
                        </div>
                        
                        {article.status === 'published' && (
                          <div className="flex items-center gap-4 text-sm text-[--gts-portal-muted] mt-2">
                            <div className="flex items-center gap-1">
                              <Heart className="w-3 h-3" />
                              <span>{article.likes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-3 h-3" />
                              <span>{article.comments}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className={`${getStatusColor(article.status)} text-white mb-3`}>
                        {getStatusText(article.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                        >
                          <Share2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* SEO */}
          <TabsContent value="seo" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">SEO мониторинг</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
              >
                <Settings className="w-4 h-4 mr-2" />
                Настройки SEO
              </Button>
            </div>

            {/* SEO Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">5,238</div>
                  <div className="text-sm text-[--gts-portal-muted]">Органические клики</div>
                  <div className="text-xs text-green-500 mt-1">+12.5% за месяц</div>
                </div>
              </Card>
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">47</div>
                  <div className="text-sm text-[--gts-portal-muted]">Ключевых слов в ТОП-10</div>
                  <div className="text-xs text-green-500 mt-1">+3 новых</div>
                </div>
              </Card>
              <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
                <div className="text-center">
                  <div className="text-2xl text-[--gts-portal-text] font-semibold">3.2%</div>
                  <div className="text-sm text-[--gts-portal-muted]">CTR из поиска</div>
                  <div className="text-xs text-green-500 mt-1">+0.8% за месяц</div>
                </div>
              </Card>
            </div>

            {/* Keywords */}
            <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
              <h3 className="text-[--gts-portal-text] font-medium mb-4">Позиции ключевых слов</h3>
              
              <div className="space-y-4">
                {seoMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[--gts-portal-card] rounded-lg">
                    <div>
                      <div className="text-[--gts-portal-text] font-medium">{metric.keyword}</div>
                      <div className="text-sm text-[--gts-portal-muted]">
                        Сложность: <span className={getDifficultyColor(metric.difficulty)}>{metric.difficulty}</span>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-lg text-[--gts-portal-text] font-semibold">#{metric.position}</div>
                      <div className="text-sm text-[--gts-portal-muted]">{metric.traffic} кликов/мес</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          {/* UGC */}
          <TabsContent value="ugc" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[--gts-portal-text]">Пользовательский контент</h2>
              <Button
                variant="outline"
                size="sm"
                className="border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
              >
                Модерировать все
              </Button>
            </div>

            <div className="grid gap-4">
              {mockUGC.map((content) => (
                <Card key={content.id} className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-medium">{content.author[0]}</span>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-[--gts-portal-text] font-medium">{content.author}</h3>
                          <Badge variant="outline" className="text-xs">
                            {content.type === 'review' ? 'Отзыв' : 'Социальные сети'}
                          </Badge>
                          {content.type === 'social' && (
                            <Badge variant="outline" className="text-xs">{content.platform}</Badge>
                          )}
                        </div>
                        
                        <p className="text-[--gts-portal-text] mb-2">{content.content}</p>
                        
                        {content.rating && (
                          <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <span key={i} className={`text-sm ${i < content.rating! ? 'text-yellow-500' : 'text-gray-400'}`}>
                                ★
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <div className="flex items-center gap-4 text-sm text-[--gts-portal-muted]">
                          <span>🎯 {content.service}</span>
                          <span>📅 {new Date(content.date).toLocaleDateString('ru-RU')}</span>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3" />
                            <span>{content.likes}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="w-3 h-3" />
                            <span>{content.replies}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {content.approved ? (
                        <Badge className="bg-green-500 text-white">Одобрено</Badge>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600 text-white"
                          >
                            Одобрить
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-500 text-red-500 hover:bg-red-500/10"
                          >
                            Отклонить
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}