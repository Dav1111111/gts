import { useRef, type ElementType } from "react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Shield, Crown, Users, MapPin, Ship, Car, Plane } from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { Route } from "./GTSRouter";
import { useCMS } from "../cms/CMSProvider";

const iconMap: Record<string, ElementType> = { Car, Ship, Plane, Crown, Shield, Users, MapPin };

interface GTSAboutSectionProps {
  onNavigate?: (route: Route) => void;
}

export function GTSAboutSection({ onNavigate }: GTSAboutSectionProps) {
  const { data } = useCMS();
  const vehicleCategories = data.vehicleCategories;
  const about = data.about;
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Анимации для верхнего текста (всплывает вверх)
  const topTextY = useTransform(scrollYProgress, [0, 0.4, 0.7], [80, -30, -120]);
  const topTextOpacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.7], [0, 1, 1, 0]);

  // Анимации для левой карточки (земной транспорт)
  const leftX = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [250, 0, -150]);
  const leftOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, 1, 1, 0]);

  // Анимации для центральной карточки (водный транспорт)
  const centerScale = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [0.65, 1, 0.9]);
  const centerOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, 1, 1, 0]);

  // Анимации для правой карточки (воздушный транспорт)
  const rightX = useTransform(scrollYProgress, [0.15, 0.45, 0.85], [-250, 0, 150]);
  const rightOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.75, 0.9], [0, 1, 1, 0]);

  // Анимации для нижнего текста (всплывает вверх)
  const bottomTextY = useTransform(scrollYProgress, [0.35, 0.55, 1], [120, -30, -180]);
  const bottomTextOpacity = useTransform(scrollYProgress, [0.35, 0.45, 0.8, 1], [0, 1, 1, 0]);

  const getMotionProps = (direction: "left" | "center" | "right") => {
    switch (direction) {
      case "left":
        return { x: leftX, opacity: leftOpacity };
      case "center":
        return { scale: centerScale, opacity: centerOpacity };
      case "right":
        return { x: rightX, opacity: rightOpacity };
    }
  };

  const getCardDirection = (index: number): "left" | "center" | "right" => {
    if (index === 1) {
      return "center";
    }

    return index === 0 ? "left" : "right";
  };

  const handleCardClick = (category: string) => {
    if (onNavigate) {
      onNavigate({ page: "experiences", category });
    }
  };

  return (
    <section ref={containerRef} className="relative py-20 lg:py-28 bg-white overflow-hidden min-h-[160vh]">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Header - Centered - Всплывает вверх */}
        <motion.div 
          style={{ y: topTextY, opacity: topTextOpacity }}
          className="max-w-4xl mx-auto text-center mb-10 lg:mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
            <span className="text-xs tracking-wider text-black/70 uppercase">{about.badge}</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl mb-6 tracking-wider text-black leading-tight">
            {about.title}
            <span className="block text-[#91040C] mt-2">{about.titleAccent}</span>
          </h2>
          
          <div className="space-y-5 max-w-3xl mx-auto">
            <p className="text-xl lg:text-2xl text-black/90 leading-relaxed">
              {about.description}
            </p>
            
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed">
              {about.subdescription}
            </p>
          </div>
        </motion.div>

        {/* Vehicle Categories Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto mb-16 lg:mb-20">
          {vehicleCategories.map((category, index) => (
            <motion.div
              key={category.title}
              style={getMotionProps(getCardDirection(index))}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="group"
            >
              <Card 
                onClick={() => handleCardClick(category.link)}
                className="relative border-0 bg-black shadow-xl hover:shadow-2xl transition-all duration-700 cursor-pointer overflow-hidden h-[380px] sm:h-[440px] lg:h-[520px]"
              >
                {/* Background Image */}
                <ImageWithFallback
                  src={category.image}
                  alt={`${category.title} транспорт`}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark Overlay - становится светлее при hover */}
                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/40 transition-colors duration-700" />
                
                {/* Red Accent Overlay - появляется при hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#91040C]/0 via-[#91040C]/0 to-[#91040C]/0 group-hover:from-[#91040C]/20 group-hover:via-[#91040C]/10 group-hover:to-[#91040C]/30 transition-all duration-700" />

                {/* Content Container */}
                <div className="relative h-full flex flex-col items-center justify-center p-8">
                  
                  {/* Stats Badge - Top */}
                  <div className="absolute top-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                    <span className="text-white text-xs tracking-wider font-medium">{category.stats}</span>
                  </div>

                  {/* Icon - Center */}
                  <div className="mb-6 transition-all duration-700 group-hover:scale-110">
                    <div className="w-24 h-24 lg:w-28 lg:h-28 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border-2 border-white/30 group-hover:border-white/60 transition-all duration-700 group-hover:bg-white/20">
                      {(() => { const Icon = iconMap[category.icon] || Car; return <Icon className="w-12 h-12 lg:w-14 lg:h-14 text-white" strokeWidth={1.5} />; })()}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-white text-3xl lg:text-4xl tracking-wider mb-2 transition-all duration-500 group-hover:scale-105">
                    {category.title}
                  </h3>

                  {/* Subtitle */}
                  <p className="text-white/90 text-base lg:text-lg tracking-wide mb-6 text-center">
                    {category.subtitle}
                  </p>

                  {/* Divider */}
                  <div className="w-16 h-[2px] bg-white/30 mb-6 transition-all duration-700 group-hover:w-32 group-hover:bg-[#91040C]" />

                  {/* Description - появляется при hover */}
                  <div className="max-h-0 opacity-0 overflow-hidden transition-all duration-500 group-hover:max-h-32 group-hover:opacity-100">
                    <p className="text-white/80 text-sm leading-relaxed text-center px-4 mb-4">
                      {category.description}
                    </p>
                  </div>

                  {/* CTA Button - появляется при hover */}
                  <div className="opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 delay-150">
                    <div className="inline-flex items-center px-6 py-3 bg-white/95 hover:bg-white rounded-full text-black text-sm tracking-wider uppercase font-medium transition-colors duration-300">
                      <span>Смотреть каталог</span>
                      <svg 
                        className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  {/* Bottom Gradient Indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Statistics and Features - Всплывают вверх */}
        <motion.div
          style={{ y: bottomTextY, opacity: bottomTextOpacity }}
        >
          {/* Statistics - Centered Row */}
          <div className="max-w-5xl mx-auto mb-14 lg:mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.members}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Членов клуба</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.vehicles}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Единиц техники</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.routes}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Маршрутов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.support}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Поддержка</div>
              </div>
            </div>
          </div>

          {/* Features Grid - Centered */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {about.features.map((feature) => {
                const FeatureIcon = iconMap[feature.icon] || Crown;
                return (
                <div key={feature.id} className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <FeatureIcon className="w-6 h-6 text-[#91040C]" />
                  </div>
                  <div>
                    <h4 className="text-black mb-2 tracking-wide text-lg">{feature.title}</h4>
                    <p className="text-base text-black/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
