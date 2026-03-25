import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Badge } from "../ui/badge";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { 
  ArrowLeft, Calendar, Eye, Heart, MessageCircle, Share2
} from "lucide-react";
import { motion } from "motion/react";

interface GTSStoryDetailPageProps {
  storyId: string;
  onNavigate: (route: Route) => void;
}

// Mock data
const storyDetails: Record<string, any> = {
  "new-route-canyons": {
    type: "news",
    authorName: "Команда GTS",
    authorAvatar: "https://api.dicebear.com/7.x/initials/svg?seed=GTS&backgroundColor=91040C",
    title: "Новый маршрут: Каньоны Красной Поляны",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbnlvbiUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    date: "25 октября 2025",
    views: 1247,
    likes: 89,
    comments: 12,
    content: `Рады представить эксклюзивный маршрут по живописным каньонам Красной Поляны! 

В программу входит:
• Путешествие на премиальных багги по горным тропам
• Посещение 3 водопадов с гидом
• Пикник от шеф-повара на берегу горной реки  
• Профессиональная фотосессия

Маршрут разработан нашими гидами специально для тех, кто ищет сочетание адреналина и комфорта. Протяженность - 45 км, сложность средняя, подходит для людей без специальной подготовки.

Стоимость: от 85 000 ₽ на группу до 4 человек
Длительность: 5-6 часов
Сезон: май - октябрь

Бронирование через личный кабинет или консьерж-сервис.`
  }
};

export function GTSStoryDetailPage({ storyId, onNavigate }: GTSStoryDetailPageProps) {
  const story = storyDetails[storyId] || storyDetails["new-route-canyons"];

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 lg:px-6 max-w-4xl">
          
          <Button
            onClick={() => onNavigate({ page: "stories" })}
            variant="outline"
            className="mb-8 border-black/20 text-black/70 hover:border-[#91040C]/40"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к историям
          </Button>

          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl lg:text-6xl text-black mb-6 tracking-wider leading-tight">
                {story.title}
              </h1>

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="w-12 h-12">
                    <AvatarImage src={story.authorAvatar} />
                    <AvatarFallback>{story.authorName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-black">{story.authorName}</div>
                    <div className="flex items-center text-black/60 text-sm">
                      <Calendar className="w-3 h-3 mr-1" />
                      {story.date}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-black/60">
                  <div className="flex items-center space-x-2">
                    <Eye className="w-4 h-4" />
                    <span className="text-sm">{story.views}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{story.likes}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Featured Image */}
            {story.image && (
              <div className="mb-8 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={story.image}
                  alt={story.title}
                  className="w-full h-auto"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none mb-12">
              <div className="text-black/80 leading-relaxed whitespace-pre-line text-lg">
                {story.content}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between py-6 border-t border-b border-black/10">
              <div className="flex items-center space-x-4">
                <Button variant="outline" className="border-black/20">
                  <Heart className="w-4 h-4 mr-2" />
                  Нравится ({story.likes})
                </Button>
                <Button variant="outline" className="border-black/20">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Комментарии ({story.comments})
                </Button>
              </div>
              <Button variant="outline" className="border-black/20">
                <Share2 className="w-4 h-4 mr-2" />
                Поделиться
              </Button>
            </div>

          </motion.article>
        </div>
      </main>

      <GTSFooter />
    </div>
  );
}
