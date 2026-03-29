import { useState, useRef } from "react";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Ship, Car, Plane, Star,
  Sparkles, ArrowRight, Users, Clock, MapPin
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useCMS } from "../cms/CMSProvider";

// Note: Experience and Scenario types are now managed by CMS, but we use CMSData types directly.



const categories = [
  { id: "all", name: "Все впечатления", icon: Star },
  { id: "water", name: "Водные", icon: Ship },
  { id: "ground", name: "Наземные", icon: Car },
  { id: "air", name: "Воздушные", icon: Plane },
  { id: "services", name: "Premium услуги", icon: Sparkles }
];

export function GTSExperiencesSection() {
  const { data: { experiences, scenarios } } = useCMS();
  const [activeCategory, setActiveCategory] = useState("all");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const headerY = useTransform(scrollYProgress, [0, 0.2], [50, 0]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);

  const filteredExperiences = activeCategory === "all" 
    ? experiences 
    : experiences.filter(exp => exp.category === activeCategory);

  const handleExperienceClick = (id: string) => {
    console.log(`Opening experience: ${id}`);
    window.location.hash = `/experience/${id}`;
  };

  return (
    <section ref={containerRef} className="py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <motion.div
          style={{ y: headerY, opacity: headerOpacity }}
          className="text-center mb-12 lg:mb-16"
        >
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-[#91040C] mr-2" />
            <span className="text-sm tracking-wider text-black/70 uppercase">МИР ВПЕЧАТЛЕНИЙ</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl mb-6 tracking-wider text-black leading-tight">
            ВЫБЕРИТЕ СВОЕ
            <span className="block text-[#91040C] mt-2">ПРИКЛЮЧЕНИЕ</span>
          </h2>
          
          <p className="text-xl lg:text-2xl text-black/70 max-w-3xl mx-auto leading-relaxed">
            От водных прогулок до воздушных туров — создайте незабываемый опыт
          </p>
        </motion.div>

        <Tabs defaultValue="experiences" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-12 bg-black/5 p-1">
            <TabsTrigger value="experiences" className="data-[state=active]:bg-white">
              Впечатления
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="data-[state=active]:bg-white">
              Готовые сценарии
            </TabsTrigger>
          </TabsList>

          {/* Experiences Tab */}
          <TabsContent value="experiences" className="space-y-10">
            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  variant={activeCategory === cat.id ? "default" : "outline"}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`
                    ${activeCategory === cat.id 
                      ? "bg-[#91040C] text-white hover:bg-[#91040C]/90" 
                      : "border-black/20 text-black/70 hover:border-[#91040C]/40 hover:text-black"
                    }
                    px-6 py-5
                  `}
                >
                  <cat.icon className="w-4 h-4 mr-2" />
                  {cat.name}
                </Button>
              ))}
            </div>

            {/* Experiences Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {filteredExperiences.map((exp, index) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Card
                    onClick={() => handleExperienceClick(exp.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e: React.KeyboardEvent) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleExperienceClick(exp.id); } }}
                    className="group bg-white border-black/10 hover:border-[#91040C]/40 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl h-full flex flex-col focus-visible:ring-2 focus-visible:ring-yellow-500"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[4/3]">
                      <ImageWithFallback
                        src={exp.image}
                        alt={exp.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Badges */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        {exp.isNew && (
                          <Badge className="bg-[#91040C] text-white border-0 text-xs">
                            NEW
                          </Badge>
                        )}
                        {exp.isPopular && (
                          <Badge className="bg-white/95 text-black border-0 text-xs">
                            ПОПУЛЯРНО
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-grow">
                      <p className="text-[#91040C] text-xs tracking-wider uppercase mb-2">
                        {exp.subtitle}
                      </p>
                      <h3 className="text-black text-xl mb-2">
                        {exp.title}
                      </h3>
                      <p className="text-black/60 text-sm mb-4 line-clamp-2 leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Info */}
                      <div className="grid grid-cols-3 gap-2 mb-4 pt-3 border-t border-black/10 text-xs">
                        <div className="text-center">
                          <Clock className="w-3 h-3 text-black/40 mx-auto mb-1" aria-hidden="true" />
                          <p className="text-black/60">{exp.duration}</p>
                        </div>
                        <div className="text-center">
                          <Users className="w-3 h-3 text-black/40 mx-auto mb-1" aria-hidden="true" />
                          <p className="text-black/60">{exp.capacity}</p>
                        </div>
                        <div className="text-center">
                          <MapPin className="w-3 h-3 text-black/40 mx-auto mb-1" aria-hidden="true" />
                          <p className="text-black/60">{exp.location}</p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mt-auto pt-3 border-t border-black/10">
                        <p className="text-black text-lg">{exp.price} ₽</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          {/* Scenarios Tab */}
          <TabsContent value="scenarios">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.08, duration: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Card className="group bg-white border-black/10 hover:border-[#91040C]/40 overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-2xl h-full flex flex-col">
                    {/* Image */}
                    <div className="relative overflow-hidden aspect-[16/10]">
                      <ImageWithFallback
                        src={scenario.image}
                        alt={scenario.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                      
                      {scenario.badge && (
                        <div className="absolute top-4 right-4">
                          <Badge className="bg-[#91040C] text-white border-0 px-3 py-1">
                            {scenario.badge}
                          </Badge>
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-7 flex flex-col flex-grow">
                      <h3 className="text-black text-2xl mb-3 tracking-wide">
                        {scenario.title}
                      </h3>
                      <p className="text-black/70 mb-5 leading-relaxed">
                        {scenario.description}
                      </p>

                      <div className="flex items-center text-black/60 text-sm mb-5">
                        <Clock className="w-4 h-4 mr-2" />
                        {scenario.duration}
                      </div>

                      <div className="mt-auto pt-5 border-t border-black/10">
                        <p className="text-black text-2xl mb-4">{scenario.price} ₽</p>
                        <Button className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white py-6">
                          Забронировать
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>

      </div>
    </section>
  );
}
