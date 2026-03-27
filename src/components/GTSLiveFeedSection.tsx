import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { 
  Newspaper, MapPin, Handshake, MessageCircle, 
  Tag, Eye, Heart, Bookmark, ChevronDown,
  Verified, Sparkles, TrendingUp, Calendar
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCMS } from "../cms/CMSProvider";

interface Author {
  id: string;
  name: string;
  role: "team" | "guide" | "partner" | "guest";
  avatar: string;
  verified?: boolean;
}

interface Post {
  id: string;
  type: "news" | "guide_story" | "partner" | "review" | "offer";
  author: Author;
  name?: string;
  title: string;
  content: string;
  image?: string;
  tags: string[];
  date: string;
  views: number;
  likes: number;
  comments: number;
  isExpanded?: boolean;
}

const authors: Author[] = [
  {
    id: "gts-team",
    name: "Команда GTS",
    role: "team",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GTS&backgroundColor=91040C",
    verified: true
  },
  {
    id: "guide-alex",
    name: "Александр Горный",
    role: "guide",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    verified: true
  },
  {
    id: "partner-hotel",
    name: "Radisson Blu Сочи",
    role: "partner",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RB&backgroundColor=1e40af"
  },
  {
    id: "guest-maria",
    name: "Мария К.",
    role: "guest",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria"
  }
];

const mockPosts: Post[] = [
  {
    id: "post-1",
    type: "news",
    author: authors[0],
    title: "Новый маршрут: Каньоны Красной Поляны",
    content: "Рады представить эксклюзивный маршрут по живописным каньонам Красной Поляны! В программу входит: путешествие на премиальных багги по горным тропам, посещение 3 водопадов, пикник от шеф-повара на берегу горной реки и профессиональная фотосессия. Маршрут разработан нашими гидами специально для тех, кто ищет сочетание адреналина и комфорта.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbnlvbiUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["новый маршрут", "багги", "каньоны", "красная поляна"],
    date: "25.10.2025",
    views: 1247,
    likes: 89,
    comments: 12
  },
  {
    id: "post-2",
    type: "guide_story",
    author: authors[1],
    title: "5 секретных мест для фотосессий в горах",
    content: "За 8 лет работы гидом я открыл десятки удивительных локаций. Сегодня поделюсь пятью лучшими местами для незабываемых фотографий. 1) Смотровая площадка \"Орлиное гнездо\" (2100м) - панорама на 360°. 2) Скрытый водопад \"Изумрудный\" - доступен только на внедорожниках...",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBob3RvZ3JhcGh5JTIwbG9jYXRpb258ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["советы гида", "фотография", "секретные места", "горы"],
    date: "23.10.2025",
    views: 2341,
    likes: 156,
    comments: 28
  },
  {
    id: "post-3",
    type: "partner",
    author: authors[2],
    name: "Radisson Blu Сочи",
    title: "Специальное предложение для членов GTS Club",
    content: "Radisson Blu Сочи рад предложить эксклюзивные условия для членов клуба GTS: скидка 25% на номера категории Suite, комплиментарный завтрак и поздний выезд до 16:00. Бронирование доступно для дат с 1 ноября по 20 декабря 2025.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["партнер", "отель", "спецпредложение", "сочи"],
    date: "22.10.2025",
    views: 892,
    likes: 67,
    comments: 8
  },
  {
    id: "post-4",
    type: "review",
    author: authors[3],
    title: "Незабываемый день рождения на вершине мира!",
    content: "Благодарю команду GTS за организацию идеального дня рождения! Вертолетный тур с посадкой на леднике, ужин от шеф-повара Михаила и невероятная забота команды сделали этот день особенным. Особая благодарность гиду Александру за интересный рассказ о горах и профессионализм. Уже планируем следующее приключение!",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNlbGVicmF0aW9uJTIwaGVsaWNvcHRlcnxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    tags: ["отзыв", "вертолет", "день рождения", "впечатления"],
    date: "20.10.2025",
    views: 1534,
    likes: 124,
    comments: 19
  },
  {
    id: "post-5",
    type: "offer",
    author: authors[0],
    title: "Осенняя акция: -30% на морские прогулки",
    content: "Только до конца октября! Скидка 30% на аренду яхт и катеров в будние дни. Насладитесь спокойным морем и теплой осенью без летних толп туристов. В стоимость включены: капитан, топливо, базовый кейтеринг. Количество мест ограничено!",
    tags: ["акция", "яхта", "скидка", "осень"],
    date: "18.10.2025",
    views: 3124,
    likes: 234,
    comments: 45
  },
  {
    id: "post-6",
    type: "guide_story",
    author: authors[1],
    title: "Как подготовиться к горной экспедиции: чек-лист от гида",
    content: "Многие гости спрашивают, что взять с собой в горы. Составил подробный чек-лист для комфортного путешествия: одежда (многослойность - ваш друг!), солнцезащитные очки обязательны даже осенью, удобная обувь с нескользящей подошвой, термос с горячим чаем...",
    tags: ["советы", "подготовка", "снаряжение", "горы"],
    date: "15.10.2025",
    views: 1876,
    likes: 142,
    comments: 34
  }
];

const postTypeConfig = {
  news: { icon: Newspaper, label: "Новости клуба", color: "bg-[#91040C]" },
  guide_story: { icon: MapPin, label: "История гида", color: "bg-blue-600" },
  partner: { icon: Handshake, label: "От партнера", color: "bg-purple-600" },
  review: { icon: MessageCircle, label: "Отзыв гостя", color: "bg-green-600" },
  offer: { icon: TrendingUp, label: "Спецпредложение", color: "bg-orange-600" }
};

const roleConfig = {
  team: { label: "Команда GTS", color: "text-[#91040C]" },
  guide: { label: "Гид", color: "text-blue-600" },
  partner: { label: "Партнер", color: "text-purple-600" },
  guest: { label: "Гость", color: "text-black/60" }
};

export function GTSLiveFeedSection() {
  const { data: cmsData } = useCMS();
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set());
  const [activeFilter, setActiveFilter] = useState<string>("all");
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Build posts with their authors from CMS
  const postsWithAuthors = cmsData.posts.map(post => ({
    ...post,
    author: cmsData.postAuthors.find(a => a.id === post.authorId) || cmsData.postAuthors[0]
  }));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const toggleExpand = (postId: string) => {
    const newExpanded = new Set(expandedPosts);
    if (newExpanded.has(postId)) {
      newExpanded.delete(postId);
    } else {
      newExpanded.add(postId);
    }
    setExpandedPosts(newExpanded);
  };

  const filteredPosts = activeFilter === "all" 
    ? postsWithAuthors 
    : postsWithAuthors.filter(post => post.type === activeFilter);

  const filters = [
    { id: "all", label: "Все", icon: Sparkles },
    { id: "news", label: "Новости", icon: Newspaper },
    { id: "guide_story", label: "Гиды", icon: MapPin },
    { id: "partner", label: "Партнеры", icon: Handshake },
    { id: "review", label: "Отзывы", icon: MessageCircle },
    { id: "offer", label: "Акции", icon: TrendingUp }
  ];

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-[#0B0B0C] overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 lg:px-6 relative">
        
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#91040C]/10 border border-[#91040C]/20 rounded-full mb-6">
            <Newspaper className="w-4 h-4 text-[#91040C] mr-2" />
            <span className="text-sm tracking-wider text-white/80 uppercase">Живая лента</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl mb-6 tracking-wider text-white leading-tight">
            ИСТОРИИ И
            <span className="block text-[#91040C] mt-2">СОБЫТИЯ</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Новости клуба, советы от гидов, предложения партнеров и реальные отзывы гостей
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {filters.map((filter) => (
            <Button
              key={filter.id}
              variant={activeFilter === filter.id ? "default" : "outline"}
              onClick={() => setActiveFilter(filter.id)}
              className={`
                ${activeFilter === filter.id 
                  ? "bg-[#91040C] text-white hover:bg-[#91040C]/90 border-[#91040C]" 
                  : "bg-transparent border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5"
                }
                px-5 py-5
              `}
            >
              <filter.icon className="w-4 h-4 mr-2" />
              {filter.label}
            </Button>
          ))}
        </div>

        {/* Posts Feed */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredPosts.map((post, index) => {
            const isExpanded = expandedPosts.has(post.id);
            const truncatedContent = post.content.length > 200 
              ? post.content.substring(0, 200) + "..." 
              : post.content;
            const typeConfig = postTypeConfig[post.type];

            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                viewport={{ once: true, amount: 0.1 }}
              >
                <Card className="bg-[#121214] border-[#17181A] hover:border-[#91040C]/30 transition-all duration-300 overflow-hidden">
                  <div className="p-4 sm:p-6 lg:p-8">
                    {/* Post Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12 border-2 border-white/10">
                          <AvatarImage src={post.author.avatar} />
                          <AvatarFallback>{post.author.name[0]}</AvatarFallback>
                        </Avatar>
                        
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-white">{post.author.name}</span>
                            {post.author.verified && (
                              <Verified className="w-4 h-4 text-blue-500 fill-blue-500" />
                            )}
                          </div>
                          <div className="flex items-center space-x-3 text-sm">
                            <span className={roleConfig[post.author.role].color}>
                              {roleConfig[post.author.role].label}
                            </span>
                            <span className="text-white/40">•</span>
                            <div className="flex items-center text-white/40">
                              <Calendar className="w-3 h-3 mr-1" />
                              {post.date}
                            </div>
                          </div>
                        </div>
                      </div>

                      <Badge className={`${typeConfig.color} text-white border-0 text-xs`}>
                        <typeConfig.icon className="w-3 h-3 mr-1" />
                        {typeConfig.label}
                      </Badge>
                    </div>

                    {/* Post Content */}
                    <div className="mb-5">
                      <h3 className="text-white text-xl lg:text-2xl mb-3">
                        {post.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed mb-4">
                        {isExpanded ? post.content : truncatedContent}
                      </p>

                      {post.content.length > 200 && (
                        <button
                          onClick={() => toggleExpand(post.id)}
                          className="text-[#91040C] hover:text-[#91040C]/80 text-sm flex items-center transition-colors"
                        >
                          {isExpanded ? "Свернуть" : "Читать далее"}
                          <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
                        </button>
                      )}
                    </div>

                    {/* Post Image */}
                    {post.image && (
                      <div className="mb-5 rounded-lg overflow-hidden">
                        <ImageWithFallback
                          src={post.image}
                          alt={post.title}
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-5">
                      {post.tags.map((tag, idx) => (
                        <Badge 
                          key={idx}
                          variant="outline" 
                          className="border-white/20 text-white/60 hover:border-[#91040C]/40 hover:text-white cursor-pointer text-xs"
                        >
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Post Stats & Actions */}
                    <div className="flex items-center justify-between pt-5 border-t border-white/10">
                      <div className="flex items-center space-x-6 text-sm text-white/50">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>

                      <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                        <Bookmark className="w-5 h-5 text-white/40 hover:text-white" />
                      </button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Load More */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button 
            variant="outline"
            className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-white/40 px-8 py-6 text-base tracking-wider"
          >
            Загрузить еще
            <ChevronDown className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}