import { useState } from "react";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { 
  Newspaper, MapPin, Handshake, MessageCircle, 
  Eye, Heart, Calendar, TrendingUp
} from "lucide-react";
import { motion } from "motion/react";

interface GTSStoriesPageProps {
  onNavigate: (route: Route) => void;
  initialFilter?: string;
}

interface Story {
  id: string;
  type: "news" | "guide_story" | "partner" | "review" | "offer";
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  title: string;
  excerpt: string;
  image?: string;
  date: string;
  views: number;
  likes: number;
  comments: number;
}

const stories: Story[] = [
  {
    id: "new-route-canyons",
    type: "news",
    authorName: "Команда GTS",
    authorRole: "team",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=GTS&backgroundColor=91040C",
    title: "Новый маршрут: Каньоны Красной Поляны",
    excerpt: "Рады представить эксклюзивный маршрут по живописным каньонам Красной Поляны! В программу входит: путешествие на премиальных багги...",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbnlvbiUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "25.10.2025",
    views: 1247,
    likes: 89,
    comments: 12
  },
  {
    id: "secret-photo-spots",
    type: "guide_story",
    authorName: "Александр Горный",
    authorRole: "guide",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    title: "5 секретных мест для фотосессий в горах",
    excerpt: "За 8 лет работы гидом я открыл десятки удивительных локаций. Сегодня поделюсь пятью лучшими местами для незабываемых фотографий...",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBob3RvZ3JhcGh5JTIwbG9jYXRpb258ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "23.10.2025",
    views: 2341,
    likes: 156,
    comments: 28
  },
  {
    id: "radisson-offer",
    type: "partner",
    authorName: "Radisson Blu Сочи",
    authorRole: "partner",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=RB&backgroundColor=1e40af",
    title: "Специальное предложение для членов GTS Club",
    excerpt: "Radisson Blu Сочи рад предложить эксклюзивные условия для членов клуба: скидка 25% на номера категории Suite...",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "22.10.2025",
    views: 892,
    likes: 67,
    comments: 8
  },
  {
    id: "birthday-review",
    type: "review",
    authorName: "Мария К.",
    authorRole: "guest",
    authorAvatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    title: "Незабываемый день рождения на вершине мира!",
    excerpt: "Благодарю команду GTS за организацию идеального дня рождения! Вертолетный тур с посадкой на леднике, ужин от шеф-повара...",
    image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNlbGVicmF0aW9uJTIwaGVsaWNvcHRlcnxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "20.10.2025",
    views: 1534,
    likes: 124,
    comments: 19
  },
  {
    id: "autumn-discount",
    type: "offer",
    authorName: "Команда GTS",
    authorRole: "team",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=GTS&backgroundColor=91040C",
    title: "Осенняя акция: -30% на морские прогулки",
    excerpt: "Только до конца октября! Скидка 30% на аренду яхт и катеров в будние дни. Насладитесь спокойным морем...",
    date: "18.10.2025",
    views: 3124,
    likes: 234,
    comments: 45
  }
];

const filters = [
  { id: "all", label: "Все", icon: TrendingUp },
  { id: "news", label: "Новости", icon: Newspaper },
  { id: "guide_story", label: "Советы гидов", icon: MapPin },
  { id: "partner", label: "Партнеры", icon: Handshake },
  { id: "review", label: "Отзывы", icon: MessageCircle }
];

const typeConfig = {
  news: { label: "Новости", color: "bg-[#91040C]" },
  guide_story: { label: "Советы гида", color: "bg-blue-600" },
  partner: { label: "Партнер", color: "bg-purple-600" },
  review: { label: "Отзыв", color: "bg-green-600" },
  offer: { label: "Акция", color: "bg-orange-600" }
};

export function GTSStoriesPage({ onNavigate, initialFilter = "all" }: GTSStoriesPageProps) {
  const [activeFilter, setActiveFilter] = useState(initialFilter);

  const filteredStories = activeFilter === "all" 
    ? stories 
    : stories.filter(story => story.type === activeFilter);

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black pt-24">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
              <Newspaper className="w-4 h-4 text-[#91040C] mr-2" />
              <span className="text-sm tracking-wider uppercase">Живая лента</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl mb-6 tracking-wider">
              ИСТОРИИ И
              <span className="block text-[#91040C] mt-2">СОБЫТИЯ</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto">
              Новости клуба, советы от гидов, предложения партнеров и реальные отзывы гостей
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                onClick={() => setActiveFilter(filter.id)}
                className={`
                  ${activeFilter === filter.id 
                    ? "bg-[#91040C] text-white hover:bg-[#91040C]/90" 
                    : "border-white/20 text-white/70 hover:border-white/40 hover:text-white hover:bg-white/5"
                  }
                  px-5 py-5
                `}
              >
                <filter.icon className="w-4 h-4 mr-2" />
                {filter.label}
              </Button>
            ))}
          </div>

          {/* Stories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {filteredStories.map((story, index) => {
              const config = typeConfig[story.type];
              
              return (
                <motion.div
                  key={story.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card
                    onClick={() => onNavigate({ page: "story-detail", id: story.id })}
                    className="group bg-[#121214] border-[#17181A] hover:border-[#91040C]/40 overflow-hidden cursor-pointer transition-all duration-300 h-full flex flex-col"
                  >
                    {story.image && (
                      <div className="relative overflow-hidden aspect-[16/9]">
                        <ImageWithFallback
                          src={story.image}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        <Badge className={`${config.color} text-white border-0 text-xs absolute top-4 right-4`}>
                          {config.label}
                        </Badge>
                      </div>
                    )}

                    <div className="p-6 flex flex-col flex-grow">
                      {/* Author */}
                      <div className="flex items-center space-x-3 mb-4">
                        <Avatar className="w-10 h-10 border-2 border-white/10">
                          <AvatarImage src={story.authorAvatar} />
                          <AvatarFallback>{story.authorName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white text-sm">{story.authorName}</div>
                          <div className="flex items-center text-white/40 text-xs">
                            <Calendar className="w-3 h-3 mr-1" />
                            {story.date}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <h3 className="text-white text-xl mb-3 group-hover:text-[#91040C] transition-colors">
                        {story.title}
                      </h3>
                      <p className="text-white/70 mb-4 line-clamp-3 leading-relaxed">
                        {story.excerpt}
                      </p>

                      {/* Stats */}
                      <div className="flex items-center space-x-6 mt-auto pt-4 border-t border-white/10 text-sm text-white/50">
                        <div className="flex items-center space-x-2">
                          <Eye className="w-4 h-4" />
                          <span>{story.views}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Heart className="w-4 h-4" />
                          <span>{story.likes}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

        </div>
      </main>

      <GTSFooter />
    </div>
  );
}
