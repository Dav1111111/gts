import { useState } from "react";
import { motion } from "motion/react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useGTSAuth } from "../../contexts/GTSAuthContext";
import { Route } from "../GTSRouter";
import { 
  Heart, 
  ShoppingCart, 
  Star, 
  Clock, 
  Users, 
  MapPin, 
  Check,
  Sparkles,
  Gift,
  TrendingUp
} from "lucide-react";

interface Experience {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  price: string;
  duration: string;
  capacity: string;
  location: string;
  category: "water" | "ground" | "air" | "services" | "all";
  isPopular?: boolean;
  isNew?: boolean;
  discount?: number;
  rating?: number;
  reviews?: number;
}

interface GTSAuthExperiencesPageProps {
  onNavigate: (route: Route) => void;
  initialCategory?: string;
}

const experiences: Experience[] = [
  {
    id: "yacht-cruise",
    title: "Яхта Premium",
    subtitle: "Морские прогулки",
    description: "Элитная яхта с полным сервисом для незабываемых морских путешествий по побережью Сочи",
    image: "https://images.unsplash.com/photo-1612764324168-7a3a318e0cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHNhaWxpbmclMjB3YXRlcnxlbnwxfHx8fDE3NjE1MDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "450 000",
    duration: "4-8 часов",
    capacity: "До 8 чел",
    location: "Сочи",
    category: "water",
    isPopular: true,
    rating: 4.9,
    reviews: 127
  },
  {
    id: "wakesurf",
    title: "Вейксёрф & Вейкборд",
    subtitle: "Водные виды спорта",
    description: "Катер с профессиональным инструктором для занятий вейксёрфингом и вейкбордингом",
    image: "https://images.unsplash.com/photo-1632192661928-d26125608355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWtlYm9hcmQlMjB3YXRlciUyMHNwb3J0c3xlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "35 000",
    duration: "1-2 часа",
    capacity: "До 4 чел",
    location: "Сочи",
    category: "water",
    isNew: true,
    rating: 4.8,
    reviews: 89
  },
  {
    id: "buggy-expedition",
    title: "Багги-экспедиция",
    subtitle: "Экстремальные маршруты",
    description: "Мощные багги для покорения горных троп и бездорожья Красной Поляны",
    image: "https://images.unsplash.com/photo-1742141475441-f4bc74903776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWdneSUyMG9mZi1yb2FkJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2MTUwNDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    price: "65 000",
    duration: "3-5 часов",
    capacity: "2 чел/багги",
    location: "Красная Поляна",
    category: "ground",
    isPopular: true,
    discount: 30,
    rating: 4.9,
    reviews: 156
  },
  {
    id: "helicopter-tour",
    title: "Вертолетный тур",
    subtitle: "Панорамные полеты",
    description: "Эксклюзивные полеты над Кавказскими горами с посадкой на вершине",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWxpY29wdGVyJTIwYXZpYXRpb24lMjBhZXJpYWx8ZW58MXx8fHwxNzYxNTAwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
    price: "850 000",
    duration: "1-3 часа",
    capacity: "До 4 чел",
    location: "Красная Поляна",
    category: "air",
    isPopular: true,
    rating: 5.0,
    reviews: 43
  }
];

export function GTSAuthExperiencesPage({ onNavigate, initialCategory = "all" }: GTSAuthExperiencesPageProps) {
  const { user } = useGTSAuth();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  const toggleCart = (id: string) => {
    setCart(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredExperiences = activeCategory === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  const categories = [
    { id: "all", name: "Все впечатления", icon: Sparkles },
    { id: "water", name: "Морские", icon: MapPin },
    { id: "ground", name: "Наземные", icon: MapPin },
    { id: "air", name: "Воздушные", icon: MapPin },
    { id: "services", name: "Услуги", icon: MapPin }
  ];

  // Персональные рекомендации для member
  const memberRecommendations = user?.membershipTier === "gold" 
    ? experiences.filter(exp => exp.isPopular).slice(0, 2)
    : [];

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden bg-black pt-24">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1682686581580-d99b0230064e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhZHZlbnR1cmUlMjBleHBlcmllbmNlfGVufDF8fHx8MTc2MTUwNDU2NXww&ixlib=rb-4.1.0&q=80&w=1080"
          alt="Каталог впечатлений"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-[#91040C] text-white border-0 mb-4">
              Добро пожаловать, {user?.name}!
            </Badge>
            <h1 className="text-4xl lg:text-7xl text-white mb-6 tracking-wider">
              КАТАЛОГ ВПЕЧАТЛЕНИЙ
            </h1>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Эксклюзивные предложения для участников клуба
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-12 lg:py-16">
        <div className="container mx-auto px-4 lg:px-6">
          
          {/* User Stats Bar */}
          {user?.membershipTier && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-12"
            >
              <Card className="border-[#91040C]/20 bg-gradient-to-r from-[#91040C]/5 to-orange-500/5">
                <div className="p-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={user.avatar || ""}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-black/60 text-sm">Статус членства</p>
                      <p className="text-black text-xl capitalize">{user.membershipTier} Member</p>
                    </div>
                  </div>
                  <div className="flex gap-8">
                    <div>
                      <p className="text-black/60 text-sm">Баллы</p>
                      <p className="text-black text-2xl">{user.points?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-black/60 text-sm">В избранном</p>
                      <p className="text-black text-2xl">{favorites.length}</p>
                    </div>
                    <div>
                      <p className="text-black/60 text-sm">В корзине</p>
                      <p className="text-black text-2xl">{cart.length}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={() => onNavigate({ page: "member-portal" })}
                    >
                      Мой кабинет
                    </Button>
                    {cart.length > 0 && (
                      <Button 
                        className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                        onClick={() => onNavigate({ page: "member-portal" })}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Оформить ({cart.length})
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Personalized Recommendations for Members */}
          {memberRecommendations.length > 0 && (
            <div className="mb-16">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-6 h-6 text-[#91040C]" />
                <h2 className="text-3xl lg:text-4xl text-black tracking-wider">
                  РЕКОМЕНДОВАНО ДЛЯ ВАС
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {memberRecommendations.map((exp, index) => (
                  <motion.div
                    key={`rec-${exp.id}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="group relative overflow-hidden cursor-pointer border-[#91040C]/30 hover:border-[#91040C] transition-all duration-300">
                      <div className="relative aspect-[16/9] overflow-hidden">
                        <ImageWithFallback
                          src={exp.image}
                          alt={exp.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <Badge className="absolute top-3 left-3 bg-[#91040C] text-white border-0">
                          <Gift className="w-3 h-3 mr-1" />
                          Персональная скидка -15%
                        </Badge>
                        
                        {/* Favorite Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className={`absolute top-3 right-3 backdrop-blur-sm ${
                            favorites.includes(exp.id) 
                              ? "bg-[#91040C] text-white hover:bg-[#91040C]/90" 
                              : "bg-white/20 text-white hover:bg-white/30"
                          }`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(exp.id);
                          }}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(exp.id) ? "fill-current" : ""}`} />
                        </Button>
                      </div>
                      
                      <div className="p-6">
                        <p className="text-[#91040C] text-sm tracking-wider uppercase mb-2">
                          {exp.subtitle}
                        </p>
                        <h3 className="text-black text-2xl mb-3">
                          {exp.title}
                        </h3>
                        <p className="text-black/70 mb-4">
                          {exp.description}
                        </p>
                        
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <p className="text-black/50 text-sm line-through">от {exp.price} ₽</p>
                            <p className="text-[#91040C] text-2xl">
                              от {Math.round(parseInt(exp.price.replace(/\s/g, "")) * 0.85).toLocaleString()} ₽
                            </p>
                          </div>
                          {exp.rating && (
                            <div className="flex items-center text-black/60">
                              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                              <span>{exp.rating}</span>
                            </div>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                            onClick={() => {
                              toggleCart(exp.id);
                            }}
                          >
                            {cart.includes(exp.id) ? (
                              <>
                                <Check className="w-4 h-4 mr-2" />
                                В корзине
                              </>
                            ) : (
                              <>
                                <ShoppingCart className="w-4 h-4 mr-2" />
                                В корзину
                              </>
                            )}
                          </Button>
                          <Button 
                            variant="outline"
                            onClick={() => onNavigate({ page: "experience-detail", id: exp.id })}
                          >
                            Подробнее
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <Button
                key={cat.id}
                variant={activeCategory === cat.id ? "default" : "outline"}
                onClick={() => setActiveCategory(cat.id)}
                className={
                  activeCategory === cat.id
                    ? "bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0"
                    : "text-black border-black/20 hover:border-[#91040C] hover:text-[#91040C]"
                }
              >
                {cat.name}
              </Button>
            ))}
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <Card 
                  className="group relative overflow-hidden cursor-pointer border-black/10 hover:border-[#91040C] transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Image */}
                  <div 
                    className="relative aspect-[4/3] overflow-hidden"
                    onClick={() => onNavigate({ page: "experience-detail", id: exp.id })}
                  >
                    <ImageWithFallback
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Badges */}
                    {exp.discount && (
                      <Badge className="absolute top-3 left-3 bg-[#91040C] text-white border-0">
                        -{exp.discount}%
                      </Badge>
                    )}
                    {exp.isNew && !exp.discount && (
                      <Badge className="absolute top-3 left-3 bg-green-600 text-white border-0">
                        NEW
                      </Badge>
                    )}
                    {exp.isPopular && !exp.discount && !exp.isNew && (
                      <Badge className="absolute top-3 left-3 bg-orange-600 text-white border-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Популярно
                      </Badge>
                    )}
                    
                    {/* Favorite Button */}
                    <Button
                      size="sm"
                      variant="ghost"
                      className={`absolute top-3 right-3 backdrop-blur-sm ${
                        favorites.includes(exp.id) 
                          ? "bg-[#91040C] text-white hover:bg-[#91040C]/90" 
                          : "bg-white/20 text-white hover:bg-white/30"
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(exp.id);
                      }}
                    >
                      <Heart className={`w-4 h-4 ${favorites.includes(exp.id) ? "fill-current" : ""}`} />
                    </Button>
                    
                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <p className="text-sm opacity-80 mb-1">{exp.subtitle}</p>
                      <h3 className="text-xl mb-2">{exp.title}</h3>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6">
                    <p className="text-black/70 mb-4 line-clamp-2 leading-relaxed">
                      {exp.description}
                    </p>
                    
                    {/* Metadata */}
                    <div className="grid grid-cols-3 gap-2 mb-4 text-sm text-black/60">
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-1 text-[#91040C]" />
                        {exp.duration}
                      </div>
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1 text-[#91040C]" />
                        {exp.capacity}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1 text-[#91040C]" />
                        {exp.location}
                      </div>
                    </div>
                    
                    {/* Rating */}
                    {exp.rating && (
                      <div className="flex items-center mb-4 text-black/60">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span className="mr-1">{exp.rating}</span>
                        <span className="text-sm">({exp.reviews} отзывов)</span>
                      </div>
                    )}
                    
                    {/* Price and Actions */}
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        {exp.discount ? (
                          <>
                            <p className="text-black/50 text-sm line-through">от {exp.price} ₽</p>
                            <p className="text-[#91040C] text-2xl">
                              от {Math.round(parseInt(exp.price.replace(/\s/g, "")) * (1 - exp.discount / 100)).toLocaleString()} ₽
                            </p>
                          </>
                        ) : (
                          <p className="text-black text-2xl">от {parseInt(exp.price).toLocaleString()} ₽</p>
                        )}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                      onClick={() => {
                        toggleCart(exp.id);
                      }}
                    >
                      {cart.includes(exp.id) ? (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          В корзине
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Добавить в корзину
                        </>
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
