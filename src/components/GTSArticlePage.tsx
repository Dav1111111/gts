import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar } from "./ui/avatar";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Calendar, Clock, User, Heart, MessageCircle, Share2, ThumbsUp, Play, Anchor, Mountain, Car } from "lucide-react";
import { Textarea } from "./ui/textarea";

interface GTSArticlePageProps {
  articleId: string;
  onBack: () => void;
}

const sampleArticle = {
  id: "1",
  title: "Новый маршрут: Красная Поляна — Роза Хутор",
  subtitle: "Эксклюзивная экспедиция на багги по горным тропам",
  coverImage: "https://images.unsplash.com/photo-1646273470766-38e066a0d146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NoaSUyMG1vdW50YWlucyUyMGx1eHVyeSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  coverVideo: null,
  category: "Buggies",
  date: "15 янв 2025",
  author: {
    name: "Андрей Козлов",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NTY2NTM3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    role: "Гид-эксперт GTS"
  },
  readTime: "7 мин",
  tags: ["маршруты", "багги", "красная поляна", "роза хутор"],
  content: `
Друзья, сегодня хочу поделиться с вами совершенно новым маршрутом, который мы разработали специально для любителей горных приключений. Этот путь проходит через самые живописные места между Красной Поляной и Роза Хутор.

## Что делает этот маршрут особенным?

Наш новый маршрут — это не просто поездка на багги, это настоящее путешествие в сердце Кавказских гор. Мы тщательно проложили путь так, чтобы вы могли насладиться:

- **Панорамными видами** на заснеженные вершины
- **Горными водопадами** и кристально чистыми ручьями  
- **Аутентичными горными поселениями** с вековыми традициями
- **Уникальными фотолокациями** для незабываемых снимков

### Техническая часть маршрута

Протяженность маршрута составляет 45 километров, время в пути — около 4-5 часов с остановками. Сложность средняя, подходит для водителей с базовым опытом вождения.

> "Этот маршрут стал результатом двухлетней работы нашей команды. Мы хотели создать нечто по-настоящему уникальное для наших гостей." — Дмитрий Петров, руководитель отдела маршрутов GTS

## Остановки и достопримечательности

**Первая остановка — Смотровая площадка "Орлиное гнездо"**  
Здесь открывается потрясающий вид на долину. Идеальное место для фотосессии и короткого отдыха.

**Вторая остановка — Водопад "Девичьи слёзы"**  
25-метровый водопад, особенно красивый весной во время таяния снегов.

**Третья остановка — Горная ферма**  
Знакомство с местными традициями, дегустация горного мёда и травяного чая.

## Безопасность превыше всего

Все участники получают:
- Профессиональный инструктаж перед стартом
- Качественные шлемы и защитное снаряжение
- Сопровождение опытного гида на протяжении всего маршрута
- Рацию для связи в случае необходимости

### Что взять с собой

Рекомендуем захватить:
- Удобную закрытую обувь
- Солнцезащитные очки
- Фотоаппарат или хорошую камеру телефона
- Лёгкую куртку (в горах может быть прохладно)

## Выводы

Этот маршрут — идеальный выбор для тех, кто хочет совместить активный отдых с познавательной программой. Горы Кавказа откроются вам с совершенно новой стороны.

До встречи в горах!
  `,
  stats: {
    views: 1247,
    likes: 89,
    comments: 23,
    shares: 15
  }
};

const inlineOffers = [
  {
    id: "offer-1",
    title: "Honda Talon 1000R",
    description: "Забронируйте багги для этого маршрута",
    price: "15,000₽",
    period: "4 часа",
    image: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZHxlbnwxfHx8fDE3NTYxNDI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Car
  },
  {
    id: "offer-2", 
    title: "Маршрут 'Ущелье Велм'",
    description: "Попробуйте другой горный маршрут",
    price: "20,000₽",
    period: "3 часа",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmdlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NjY1NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    icon: Mountain
  }
];

const comments = [
  {
    id: "1",
    author: {
      name: "Елена Петрова",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c68f7b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NjUzNzM4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    date: "2 часа назад",
    text: "Потрясающий маршрут! Проехали вчера с мужем, впечатления непередаваемые. Особенно понравился водопад 😍",
    likes: 12,
    liked: false,
    replies: [
      {
        id: "1-1",
        author: {
          name: "Андрей Козлов",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NTY2NTM3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080"
        },
        date: "1 час назад",
        text: "Елена, спасибо за отзыв! Рады, что маршрут вам понравился. Приезжайте ещё! 🚙",
        likes: 3,
        liked: false
      }
    ]
  },
  {
    id: "2",
    author: {
      name: "Михаил Волков",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzczOXww&ixlib=rb-4.1.0&q=80&w=1080"
    },
    date: "5 часов назад",
    text: "Подскажите, можно ли проехать этот маршрут зимой? Или лучше дождаться весны?",
    likes: 5,
    liked: true,
    replies: []
  },
  {
    id: "3",
    author: {
      name: "Анна Соколова",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NTY2NTM3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    date: "1 день назад",
    text: "Отличная статья! Уже планируем поездку на выходные. Какая погода будет лучше для этого маршрута?",
    likes: 8,
    liked: false,
    replies: []
  }
];

const relatedArticles = [
  {
    id: "related-1",
    title: "ТОП-5 горных маршрутов для багги",
    image: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZHxlbnwxfHx8fDE3NTYxNDI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "Подборка лучших маршрутов для любителей экстремального вождения",
    category: "Buggies"
  },
  {
    id: "related-2",
    title: "Подготовка к горным экспедициям",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGdvcmdlJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc1NjY1NDg5MXww&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "Что нужно знать перед поездкой в горы на багги",
    category: "Buggies"
  },
  {
    id: "related-3",
    title: "История GTS: как всё начиналось",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbHViJTIwZXZlbnQlMjBwYXJ0eXxlbnwxfHx8fDE3NTY2NTQ2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    excerpt: "Рассказываем о том, как создавался наш клуб премиального отдыха",
    category: "Club"
  }
];

export function GTSArticlePage({ articleId, onBack }: GTSArticlePageProps) {
  const [newComment, setNewComment] = useState("");
  const [articleLiked, setArticleLiked] = useState(false);

  // Parse content and insert offers
  const renderContent = () => {
    const paragraphs = sampleArticle.content.trim().split('\n\n');
    const contentElements: React.ReactElement[] = [];
    
    paragraphs.forEach((paragraph, index) => {
      // Add paragraph
      if (paragraph.startsWith('##')) {
        contentElements.push(
          <h2 key={`h2-${index}`} className="text-2xl font-medium mb-4 mt-8 first:mt-0">
            {paragraph.replace('## ', '')}
          </h2>
        );
      } else if (paragraph.startsWith('###')) {
        contentElements.push(
          <h3 key={`h3-${index}`} className="text-xl font-medium mb-3 mt-6">
            {paragraph.replace('### ', '')}
          </h3>
        );
      } else if (paragraph.startsWith('>')) {
        contentElements.push(
          <blockquote key={`quote-${index}`} className="border-l-4 border-[#91040C] pl-6 py-4 my-6 bg-gray-50 italic text-gray-700">
            {paragraph.replace('> ', '').replace(/"/g, '')}
          </blockquote>
        );
      } else if (paragraph.startsWith('-')) {
        const listItems = paragraph.split('\n').filter(item => item.startsWith('-'));
        contentElements.push(
          <ul key={`list-${index}`} className="space-y-2 mb-6 ml-4">
            {listItems.map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="w-2 h-2 bg-[#91040C] rounded-full mt-2 mr-3 flex-shrink-0"></span>
                {item.replace('- ', '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
                  if (j % 2 === 1) return <strong key={j}>{part.replace('</strong>', '')}</strong>;
                  return part;
                })}
              </li>
            ))}
          </ul>
        );
      } else if (paragraph.trim()) {
        contentElements.push(
          <p key={`p-${index}`} className="mb-6 leading-relaxed text-gray-700">
            {paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').split('<strong>').map((part, j) => {
              if (j % 2 === 1) return <strong key={j}>{part.replace('</strong>', '')}</strong>;
              return part;
            })}
          </p>
        );
      }

      // Insert inline offers at specific positions
      if (index === 3 && inlineOffers[0]) {
        contentElements.push(
          <Card key="offer-1" className="my-8 p-6 bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-[#91040C]">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={inlineOffers[0].image}
                  alt={inlineOffers[0].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  {(() => {
                    const IconComponent = inlineOffers[0].icon;
                    return <IconComponent className="w-6 h-6 text-white" />;
                  })()}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-black mb-1">{inlineOffers[0].title}</h4>
                <p className="text-sm text-gray-600 mb-2">{inlineOffers[0].description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-medium text-[#91040C]">{inlineOffers[0].price}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {inlineOffers[0].period}</span>
                  </div>
                  <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                    Забронировать
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      }

      if (index === 6 && inlineOffers[1]) {
        contentElements.push(
          <Card key="offer-2" className="my-8 p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-500">
            <div className="flex items-center gap-4">
              <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src={inlineOffers[1].image}
                  alt={inlineOffers[1].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                  {(() => {
                    const IconComponent = inlineOffers[1].icon;
                    return <IconComponent className="w-6 h-6 text-white" />;
                  })()}
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-black mb-1">{inlineOffers[1].title}</h4>
                <p className="text-sm text-gray-600 mb-2">{inlineOffers[1].description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-lg font-medium text-blue-600">{inlineOffers[1].price}</span>
                    <span className="text-sm text-gray-500 ml-1">/ {inlineOffers[1].period}</span>
                  </div>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Узнать больше
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      }
    });

    return contentElements;
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              К новостям
            </Button>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="flex items-center gap-2">
                <Share2 className="w-4 h-4" aria-hidden="true" />
                Поделиться
              </Button>
            </div>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 py-8">
        {/* Cover */}
        <div className="aspect-[16/9] mb-8 rounded-lg overflow-hidden">
          {sampleArticle.coverVideo ? (
            <div className="relative w-full h-full bg-black flex items-center justify-center">
              <Button size="lg" className="bg-white/20 hover:bg-white/30 text-white">
                <Play className="w-8 h-8" />
              </Button>
            </div>
          ) : (
            <ImageWithFallback
              src={sampleArticle.coverImage}
              alt={sampleArticle.title}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-4 mb-6">
            <Badge className="bg-orange-100 text-orange-800">
              Багги
            </Badge>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" aria-hidden="true" />
                {sampleArticle.date}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" aria-hidden="true" />
                {sampleArticle.readTime}
              </div>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-medium mb-4 leading-tight">
            {sampleArticle.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-6 leading-relaxed">
            {sampleArticle.subtitle}
          </p>

          {/* Author & Stats */}
          <div className="flex items-center justify-between border-t border-b border-gray-200 py-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <ImageWithFallback
                  src={sampleArticle.author.avatar}
                  alt={sampleArticle.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-medium">{sampleArticle.author.name}</div>
                <div className="text-sm text-gray-500">{sampleArticle.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-6 text-sm text-gray-500">
              <span>{sampleArticle.stats.views} просмотров</span>
              <button
                onClick={() => setArticleLiked(!articleLiked)}
                aria-label={articleLiked ? "Убрать лайк" : "Поставить лайк"}
                aria-pressed={articleLiked}
                className={`flex items-center gap-1 hover:text-red-500 transition-colors focus-visible:ring-2 focus-visible:ring-yellow-500 rounded ${articleLiked ? 'text-red-500' : ''}`}
              >
                <Heart className={`w-4 h-4 ${articleLiked ? 'fill-current' : ''}`} aria-hidden="true" />
                {sampleArticle.stats.likes}
              </button>
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" aria-hidden="true" />
                {sampleArticle.stats.comments}
              </div>
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          {renderContent()}
        </div>

        {/* Tags */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-2">
            {sampleArticle.tags.map(tag => (
              <Badge key={tag} variant="outline" className="text-sm">
                #{tag}
              </Badge>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <section className="border-t border-gray-200 pt-8 mb-12">
          <h2 className="text-2xl font-medium mb-6">
            Комментарии ({comments.length})
          </h2>

          {/* Add Comment */}
          <Card className="p-6 mb-6">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex-shrink-0"></div>
              <div className="flex-1">
                <label htmlFor="new-comment" className="sr-only">Ваш комментарий</label>
                <Textarea
                  id="new-comment"
                  placeholder="Поделитесь своим мнением..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-4"
                />
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {newComment.length}/1000 символов
                  </div>
                  <Button size="sm" className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                    Опубликовать
                  </Button>
                </div>
              </div>
            </div>
          </Card>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                  <ImageWithFallback
                    src={comment.author.avatar}
                    alt={comment.author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-medium text-sm">{comment.author.name}</span>
                      <span className="text-xs text-gray-500">{comment.date}</span>
                    </div>
                    <p className="text-sm leading-relaxed">{comment.text}</p>
                  </div>
                  
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                    <button className={`flex items-center gap-1 hover:text-red-500 transition-colors focus-visible:ring-2 focus-visible:ring-yellow-500 rounded ${comment.liked ? 'text-red-500' : ''}`} aria-label="Лайк" aria-pressed={comment.liked}>
                      <ThumbsUp className={`w-4 h-4 ${comment.liked ? 'fill-current' : ''}`} aria-hidden="true" />
                      {comment.likes}
                    </button>
                    <button className="hover:text-gray-700 transition-colors">
                      Ответить
                    </button>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-8 mt-4 space-y-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                            <ImageWithFallback
                              src={reply.author.avatar}
                              alt={reply.author.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <div className="bg-white border rounded-lg p-3">
                              <div className="flex items-center gap-2 mb-2">
                                <span className="font-medium text-sm">{reply.author.name}</span>
                                <span className="text-xs text-gray-500">{reply.date}</span>
                              </div>
                              <p className="text-sm leading-relaxed">{reply.text}</p>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                              <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
                                <ThumbsUp className="w-4 h-4" />
                                {reply.likes}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Related Articles */}
        <section className="border-t border-gray-200 pt-8">
          <h2 className="text-2xl font-medium mb-6">
            Вам также может понравиться
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((article) => (
              <Card key={article.id} className="group overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className="aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <Badge className="mb-2 text-xs bg-gray-100 text-gray-800">
                    {article.category}
                  </Badge>
                  <h3 className="font-medium mb-2 line-clamp-2 group-hover:text-[#91040C] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {article.excerpt}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
}