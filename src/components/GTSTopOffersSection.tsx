import { useRef, useState } from "react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, MapPin, Users, Star, ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useCMS } from "../cms/CMSProvider";

// Note: TopOffer interface is now managed by CMS, but we'll use the CMSData type directly.


export function GTSTopOffersSection() {
  const { data: { topOffers } } = useCMS();
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Анимация для заголовка
  const headerY = useTransform(scrollYProgress, [0, 0.3], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Анимации для карточек с задержкой
  const card1Y = useTransform(scrollYProgress, [0.1, 0.4], [100, 0]);
  const card1Opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const card1Rotate = useTransform(scrollYProgress, [0.1, 0.4], [-5, 0]);

  const card2Y = useTransform(scrollYProgress, [0.2, 0.5], [120, 0]);
  const card2Opacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);
  const card2Scale = useTransform(scrollYProgress, [0.2, 0.5], [0.9, 1]);

  const card3Y = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);
  const card3Opacity = useTransform(scrollYProgress, [0.3, 0.5], [0, 1]);
  const card3Rotate = useTransform(scrollYProgress, [0.3, 0.6], [5, 0]);

  const cardAnimations = [
    { y: card1Y, opacity: card1Opacity, rotate: card1Rotate },
    { y: card2Y, opacity: card2Opacity, scale: card2Scale },
    { y: card3Y, opacity: card3Opacity, rotate: card3Rotate }
  ];

  const handleOfferClick = (offerId: string) => {
    console.log(`Opening offer: ${offerId}`);
    window.location.hash = `/offer/${offerId}`;
  };

  return (
    <section ref={containerRef} className="relative py-20 lg:py-28 bg-[#0B0B0C] overflow-hidden">
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
          className="text-center mb-16 lg:mb-20"
        >
          <div className="inline-flex items-center px-4 py-2 bg-[#91040C]/10 border border-[#91040C]/20 rounded-full mb-6">
            <Star className="w-4 h-4 text-[#91040C] mr-2" />
            <span className="text-sm tracking-wider text-white/80 uppercase">Топовые предложения</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl mb-6 tracking-wider text-white leading-tight">
            ЛУЧШЕЕ НА
            <span className="block text-[#91040C] mt-2">СЕГОДНЯ</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Эксклюзивная подборка премиальных впечатлений с максимальной заботой о каждой детали
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {topOffers.map((offer, index) => (
            <motion.div
              key={offer.id}
              style={cardAnimations[index]}
              onMouseEnter={() => setHoveredCard(offer.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <Card 
                onClick={() => handleOfferClick(offer.id)}
                className="group bg-[#121214] border-[#17181A] hover:border-[#91040C]/40 overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_20px_60px_rgba(145,4,12,0.3)] h-full flex flex-col"
              >
                {/* Image Section */}
                <div className="relative overflow-hidden aspect-[4/3]">
                  <ImageWithFallback
                    src={offer.image}
                    alt={offer.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-[#91040C]/0 group-hover:bg-[#91040C]/20 transition-colors duration-500" />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
                    {offer.badge && (
                      <Badge className="bg-[#91040C] text-white border-0 px-3 py-1 uppercase tracking-wider text-xs">
                        {offer.badge}
                      </Badge>
                    )}
                    {offer.discount && (
                      <Badge className="bg-white/95 text-black border-0 px-3 py-1 tracking-wider">
                        {offer.discount}
                      </Badge>
                    )}
                  </div>

                  {/* Rating */}
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-3 py-2 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-white text-sm">{offer.rating}</span>
                      <span className="text-white/60 text-xs">({offer.reviewsCount})</span>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 lg:p-7 flex flex-col flex-grow">
                  {/* Title */}
                  <div className="mb-4">
                    <p className="text-[#91040C] text-sm tracking-wider uppercase mb-2">
                      {offer.subtitle}
                    </p>
                    <h3 className="text-white text-2xl tracking-wide mb-3">
                      {offer.title}
                    </h3>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {offer.description}
                    </p>
                  </div>

                  {/* Features */}
                  <div className="space-y-2 mb-5">
                    {offer.features.slice(0, 2).map((feature, idx) => (
                      <div key={idx} className="flex items-center text-white/50 text-sm">
                        <div className="w-1 h-1 bg-[#91040C] rounded-full mr-2" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-3 gap-4 mb-6 pt-5 border-t border-white/10">
                    <div className="text-center">
                      <Clock className="w-4 h-4 text-white/40 mx-auto mb-1" />
                      <p className="text-white/60 text-xs">{offer.duration}</p>
                    </div>
                    <div className="text-center">
                      <MapPin className="w-4 h-4 text-white/40 mx-auto mb-1" />
                      <p className="text-white/60 text-xs">{offer.location}</p>
                    </div>
                    <div className="text-center">
                      <Users className="w-4 h-4 text-white/40 mx-auto mb-1" />
                      <p className="text-white/60 text-xs">{offer.capacity}</p>
                    </div>
                  </div>

                  {/* Price & CTA */}
                  <div className="mt-auto">
                    <div className="flex items-end justify-between mb-4">
                      <div>
                        {offer.originalPrice && (
                          <p className="text-white/40 text-sm line-through mb-1">
                            {offer.originalPrice} ₽
                          </p>
                        )}
                        <p className="text-white text-2xl">
                          {offer.price} ₽
                        </p>
                      </div>
                    </div>

                    <Button 
                      className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 py-6 group/btn transition-all duration-300"
                    >
                      <span className="tracking-wider">Забронировать</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-16 lg:mt-20"
        >
          <Button 
            variant="outline"
            className="border-white/20 text-white hover:bg-white/5 hover:border-white/40 px-6 py-4 sm:px-8 sm:py-6 text-sm sm:text-base tracking-wider"
            onClick={() => window.location.hash = '/catalog'}
          >
            Смотреть все предложения
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </motion.div>

      </div>
    </section>
  );
}
