import { useState, useMemo } from "react";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { 
  Ship, Car, Plane, Sparkles, Clock, Users, MapPin,
  ArrowRight, Filter, SlidersHorizontal
} from "lucide-react";
import { motion } from "motion/react";
import { useGTSExpeditions } from "../../contexts/GTSExpeditionsContext";

interface GTSExperiencesPageProps {
  onNavigate: (route: Route) => void;
  initialCategory?: string;
}

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
  category: string;
  isNew?: boolean;
  isPopular?: boolean;
  type?: 'expedition' | 'experience';
}

const Compass = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

const STATIC_EXPERIENCES: Experience[] = [
  {
    id: "yacht-cruise",
    title: "Яхта Premium",
    subtitle: "Морские прогулки",
    description: "Элитная яхта с полным сервисом для незабываемых морских путешествий по побережью Сочи",
    image: "https://images.unsplash.com/photo-1612764324168-7a3a318e0cbb?auto=format&fit=crop&q=80&w=1200",
    price: "450 000",
    duration: "4-8 часов",
    capacity: "До 8 чел",
    location: "Сочи",
    category: "water",
    isPopular: true
  },
  {
    id: "wakesurf",
    title: "Вейксёрф & Вейкборд",
    subtitle: "Водные виды спорта",
    description: "Катер с профессиональным инструктором для занятий вейксёрфингом и вейкбордингом",
    image: "https://images.unsplash.com/photo-1632192661928-d26125608355?auto=format&fit=crop&q=80&w=1200",
    price: "35 000",
    duration: "1-2 часа",
    capacity: "До 4 чел",
    location: "Сочи",
    category: "water",
    isNew: true
  },
  {
    id: "helicopter-tour",
    title: "Вертолетный тур",
    subtitle: "Панорамные полеты",
    description: "Эксклюзивные полеты над Кавказскими горами с посадкой на вершине",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?auto=format&fit=crop&q=80&w=1200",
    price: "850 000",
    duration: "1-3 часа",
    capacity: "До 4 чел",
    location: "Красная Поляна",
    category: "air",
    isPopular: true
  },
  {
    id: "catering",
    title: "Premium Кейтеринг",
    subtitle: "Авторская кухня",
    description: "Шеф-повар и команда для организации ужина в любой точке региона",
    image: "https://images.unsplash.com/photo-1719786625035-71f46082e385?auto=format&fit=crop&q=80&w=1200",
    price: "150 000",
    duration: "По договору",
    capacity: "До 20 чел",
    location: "Любая",
    category: "services"
  },
  {
    id: "concierge",
    title: "Консьерж-сервис 24/7",
    subtitle: "Персональный помощник",
    description: "Полное сопровождение и организация любых пожеланий круглосуточно",
    image: "https://images.unsplash.com/photo-1587567818566-3272be7d64c9?auto=format&fit=crop&q=80&w=1200",
    price: "50 000/день",
    duration: "24/7",
    capacity: "VIP",
    location: "Сочи, КП",
    category: "services",
    isNew: true
  }
];

const categories = [
  { id: "all", name: "Все", icon: Sparkles },
  { id: "expedition", name: "Экспедиции", icon: Compass },
  { id: "water", name: "Водные", icon: Ship },
  { id: "ground", name: "Наземные", icon: Car },
  { id: "air", name: "Воздушные", icon: Plane },
  { id: "services", name: "Услуги", icon: Sparkles }
];

export function GTSExperiencesPage({ onNavigate, initialCategory = "all" }: GTSExperiencesPageProps) {
  const { expeditions } = useGTSExpeditions();
  const [activeCategory, setActiveCategory] = useState(initialCategory);

  const allExperiences = useMemo(() => {
    const expeditionExperiences: Experience[] = expeditions.map(exp => ({
      id: exp.id,
      title: exp.title,
      subtitle: exp.tagline,
      description: exp.description,
      image: exp.heroImage,
      price: exp.price,
      duration: `${exp.totalDays} дней`,
      capacity: `Группа ${exp.groupSize}`,
      location: exp.region,
      category: "expedition",
      isPopular: exp.isFeatured,
      type: 'expedition'
    }));

    return [...expeditionExperiences, ...STATIC_EXPERIENCES];
  }, [expeditions]);

  const filteredExperiences = useMemo(() => {
    if (activeCategory === "all") return allExperiences;
    return allExperiences.filter(exp => 
      exp.category === activeCategory || 
      (activeCategory === 'ground' && exp.type === 'expedition')
    );
  }, [allExperiences, activeCategory]);

  const hotOffers = useMemo(() => allExperiences.filter(e => e.isPopular).slice(0, 2), [allExperiences]);

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-black pt-24">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1602574763108-7c4434fea82d?auto=format&fit=crop&q=80&w=1920"
            alt="Experiences"
            className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-white" />
        </div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full mb-8">
              <Sparkles className="w-4 h-4 text-[#91040C] mr-2" />
              <span className="text-white text-xs tracking-[0.2em] uppercase font-bold">Каталог впечатлений GTS</span>
            </div>
            
            <h1 className="text-5xl lg:text-8xl mb-8 tracking-[0.15em] text-white font-bold uppercase leading-tight">
              МИР
              <span className="block text-[#91040C]">ЭМОЦИЙ</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/70 max-w-2xl mx-auto font-light leading-relaxed">
              От глубоководных погружений до высокогорных экспедиций. Ваше идеальное приключение начинается здесь.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4 lg:px-20">
          
          {/* Hot Offers Section */}
          {activeCategory === "all" && hotOffers.length > 0 && (
            <div className="mb-24">
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-px bg-[#91040C]" />
                  <h2 className="text-3xl lg:text-4xl text-black tracking-widest uppercase font-bold">
                    HOT OFFERS
                  </h2>
                </div>
                <Badge className="bg-[#91040C] text-white border-0 py-2 px-4 rounded-none tracking-widest text-[10px] uppercase font-bold">
                  LIMITED TIME
                </Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12">
                {hotOffers.map((offer, index) => (
                  <motion.div
                    key={`hot-${offer.id}`}
                    initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                  >
                    <div
                      onClick={() => onNavigate({ page: 'experience-detail', id: offer.id })}
                      className="group relative bg-white overflow-hidden cursor-pointer h-[500px]"
                    >
                      <ImageWithFallback
                        src={offer.image}
                        alt={offer.title}
                        className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                      
                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-8 lg:p-12">
                        <p className="text-[#91040C] text-xs tracking-[0.3em] uppercase mb-4 font-bold">
                          {offer.subtitle}
                        </p>
                        <h3 className="text-white text-3xl lg:text-4xl mb-6 font-bold uppercase tracking-wider">
                          {offer.title}
                        </h3>
                        <div className="flex items-center justify-between">
                          <div className="flex flex-col">
                            <span className="text-white/40 text-[10px] uppercase tracking-widest mb-1">Стоимость</span>
                            <span className="text-white text-2xl font-light">{offer.price} ₽</span>
                          </div>
                          <div className="w-14 h-14 bg-[#91040C] flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                            <ArrowRight className="w-6 h-6 text-white -rotate-45" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
          
          {/* Filters */}
          <div className="flex flex-wrap justify-center gap-2 lg:gap-4 mb-20">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`
                  ${activeCategory === cat.id 
                    ? "bg-[#91040C] text-white border-[#91040C]" 
                    : "bg-white border-black/10 text-black/40 hover:border-black/30 hover:text-black"
                  }
                  px-8 py-4 uppercase tracking-[0.2em] text-[10px] font-bold border transition-all duration-300
                `}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Experiences Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {filteredExperiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div
                  onClick={() => onNavigate({ page: 'experience-detail', id: exp.id })}
                  className="group relative bg-[#F8F8F8] overflow-hidden cursor-pointer h-[550px] flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[4/5] overflow-hidden bg-black">
                    <ImageWithFallback
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-6 left-6 flex gap-2">
                      {exp.isNew && (
                        <div className="bg-[#91040C] text-white text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                          NEW
                        </div>
                      )}
                      {exp.isPopular && (
                        <div className="bg-white text-black text-[10px] font-bold px-3 py-1 uppercase tracking-widest">
                          TRENDING
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8 flex flex-col flex-grow bg-white border border-black/5 border-t-0">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#91040C] text-[9px] font-bold uppercase tracking-[0.3em]">
                        {exp.category}
                      </span>
                      <div className="w-6 h-[1px] bg-black/10" />
                    </div>
                    
                    <h3 className="text-black text-xl mb-4 font-bold uppercase tracking-wider group-hover:text-[#91040C] transition-colors">
                      {exp.title}
                    </h3>
                    
                    <p className="text-black/40 text-sm mb-8 line-clamp-2 leading-relaxed font-light italic">
                      {exp.description}
                    </p>

                    {/* Stats */}
                    <div className="mt-auto grid grid-cols-3 gap-4 border-t border-black/5 pt-6 text-[10px] uppercase tracking-widest text-black/30 font-bold">
                      <div className="flex flex-col gap-1">
                        <Clock className="w-3.5 h-3.5 mb-1" />
                        <span>{exp.duration}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <Users className="w-3.5 h-3.5 mb-1" />
                        <span>{exp.capacity}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <MapPin className="w-3.5 h-3.5 mb-1" />
                        <span className="truncate">{exp.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Overlay Price */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#91040C] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </main>

      <GTSFooter />
    </div>
  );
}
