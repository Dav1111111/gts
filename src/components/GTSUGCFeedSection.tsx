import { useState } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Card } from './ui/card';
import { Avatar } from './ui/avatar';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Heart, MessageCircle, Star, Camera } from 'lucide-react';

interface UGCPost {
  id: string;
  userName: string;
  userAvatar: string;
  image: string;
  quote: string;
  activity: string;
  rating: number;
  date: string;
  likes: number;
  comments: number;
  verified: boolean;
}

const ugcPosts: UGCPost[] = [
  {
    id: 'post-1',
    userName: 'Анна М.',
    userAvatar: 'https://images.unsplash.com/photo-1708246115903-bfbee55039e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHlhY2h0JTIwc2VsZmllfGVufDF8fHx8MTc1NjY1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    image: 'https://images.unsplash.com/photo-1708246115903-bfbee55039e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHlhY2h0JTIwc2VsZmllfGVufDF8fHx8MTc1NjY1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Невероятные эмоции на яхте! Самый лучший день рождения 🎉',
    activity: 'Yamaha 252S',
    rating: 5,
    date: '2 дня назад',
    likes: 47,
    comments: 12,
    verified: true
  },
  {
    id: 'post-2',
    userName: 'Дмитрий К.',
    userAvatar: 'https://images.unsplash.com/photo-1635764963325-f1d93ca922a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBncm91cCUyMGhlbGljb3B0ZXJ8ZW58MXx8fHwxNzU2NjUyNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    image: 'https://images.unsplash.com/photo-1635764963325-f1d93ca922a3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHZlbnR1cmUlMjBncm91cCUyMGhlbGljb3B0ZXJ8ZW58MXx8fHwxNzU2NjUyNTMyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Полёт над Красной Поляной — это что-то особенное! 🚁',
    activity: 'Robinson R44',
    rating: 5,
    date: '4 дня назад',
    likes: 63,
    comments: 18,
    verified: true
  },
  {
    id: 'post-3',
    userName: 'Елена С.',
    userAvatar: 'https://images.unsplash.com/photo-1529511406032-7935475a07a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwYnVnZ3klMjBvZmYlMjByb2FkfGVufDF8fHx8MTc1NjY1MjUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    image: 'https://images.unsplash.com/photo-1529511406032-7935475a07a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmllbmRzJTIwYnVnZ3klMjBvZmYlMjByb2FkfGVufDF8fHx8MTc1NjY1MjUzM3ww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Экстрим на максимум! Honda Talon просто огонь 🔥',
    activity: 'Honda Talon',
    rating: 5,
    date: '1 неделя назад',
    likes: 34,
    comments: 8,
    verified: false
  },
  {
    id: 'post-4',
    userName: 'Алексей П.',
    userAvatar: 'https://images.unsplash.com/photo-1741313855804-383f5012900a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzbGluZ3Nob3QlMjBkcml2aW5nfGVufDF8fHx8MTc1NjY1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    image: 'https://images.unsplash.com/photo-1741313855804-383f5012900a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VwbGUlMjBzbGluZ3Nob3QlMjBkcml2aW5nfGVufDF8fHx8MTc1NjY1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Романтическое путешествие на Slingshot — идеально! 💕',
    activity: 'Polaris Slingshot R',
    rating: 5,
    date: '5 дней назад',
    likes: 91,
    comments: 25,
    verified: true
  },
  {
    id: 'post-5',
    userName: 'Мария Т.',
    userAvatar: 'https://images.unsplash.com/photo-1708246115903-bfbee55039e1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMHBlb3BsZSUyMHlhY2h0JTIwc2VsZmllfGVufDF8fHx8MTc1NjY1MjUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    image: 'https://images.unsplash.com/photo-1598737285721-29346a5c9278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTI0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    quote: 'Закат с яхты — самые прекрасные виды Сочи! 🌅',
    activity: 'VIP Яхта-тур',
    rating: 5,
    date: '3 дня назад',
    likes: 78,
    comments: 15,
    verified: true
  }
];

export function GTSUGCFeedSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedPost, setSelectedPost] = useState<UGCPost | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % ugcPosts.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + ugcPosts.length) % ugcPosts.length);
  };

  const visiblePosts = 4;
  const displayedPosts = [];
  for (let i = 0; i < visiblePosts; i++) {
    displayedPosts.push(ugcPosts[(currentIndex + i) % ugcPosts.length]);
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-accent" />
            <h2 className="tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700', fontSize: '3rem', lineHeight: '1.2' }}>
              Истории гостей
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Реальные отзывы и фотографии наших клиентов
          </p>
        </div>

        {/* Carousel controls */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="outline"
            size="sm"
            onClick={prevSlide}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Назад
          </Button>
          
          <div className="flex space-x-2">
            {ugcPosts.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex ? 'bg-accent' : 'bg-gray-300'
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextSlide}
            className="flex items-center gap-2"
          >
            Далее
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayedPosts.map((post) => (
            <Card
              key={post.id}
              className="group cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl bg-white overflow-hidden"
              onClick={() => setSelectedPost(post)}
            >
              {/* Post image */}
              <div className="relative aspect-[9/16] overflow-hidden">
                <ImageWithFallback
                  src={post.image}
                  alt={post.userName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Activity badge */}
                <div className="absolute top-4 left-4">
                  <Badge className="bg-white/90 text-black border-0 backdrop-blur-sm text-xs">
                    {post.activity}
                  </Badge>
                </div>

                {/* Verified badge */}
                {post.verified && (
                  <div className="absolute top-4 right-4">
                    <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 text-white text-xs">✓</div>
                    </div>
                  </div>
                )}

                {/* User info and quote */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <Avatar className="w-8 h-8 border-2 border-white">
                      <ImageWithFallback
                        src={post.userAvatar}
                        alt={post.userName}
                        className="w-full h-full object-cover"
                      />
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white text-sm">
                        {post.userName}
                      </div>
                      <div className="text-white/70 text-xs">
                        {post.date}
                      </div>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < post.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                      />
                    ))}
                  </div>

                  <p className="text-white text-sm leading-tight line-clamp-2">
                    {post.quote}
                  </p>

                  {/* Engagement */}
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <Heart className="h-3 w-3" />
                      {post.likes}
                    </div>
                    <div className="flex items-center gap-1 text-white/70 text-xs">
                      <MessageCircle className="h-3 w-3" />
                      {post.comments}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Поделитесь своими впечатлениями
          </p>
          <Button variant="outline" className="gap-2">
            <Camera className="h-4 w-4" />
            Загрузить фото
          </Button>
        </div>
      </div>

      {/* Modal for selected post (placeholder) */}
      {selectedPost && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedPost(null)}
        >
          <div className="bg-white rounded-xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-semibold text-lg">Отзыв от {selectedPost.userName}</h3>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <ImageWithFallback
                src={selectedPost.image}
                alt={selectedPost.userName}
                className="w-full h-64 object-cover rounded-lg"
              />
              <p>{selectedPost.quote}</p>
              <div className="text-sm text-gray-500">
                Активность: {selectedPost.activity}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}