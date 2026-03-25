import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MapPin, Clock, Camera } from "lucide-react";

const places = [
  {
    id: 1,
    title: "Лучшие виды на закате",
    description: "Секретные точки для фотосессий с панорамными видами на Чёрное море",
    image: "https://images.unsplash.com/photo-1654850888151-883881017fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNlYSUyMGNvYXN0JTIwcHJlbWl1bXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Camera,
    time: "19:00-20:30",
    access: "На катере",
    size: "large"
  },
  {
    id: 2,
    title: "Секретные маршруты в Красной Поляне",
    description: "Горные тропы для экстремального вождения вдали от туристических маршрутов",
    image: "https://images.unsplash.com/photo-1646273470766-38e066a0d146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NoaSUyMG1vdW50YWlucyUyMGx1eHVyeSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: MapPin,
    time: "10:00-16:00",
    access: "На багги",
    size: "medium"
  },
  {
    id: 3,
    title: "Где покататься на вейксерфе",
    description: "Идеальные бухты с спокойной водой для водных видов спорта",
    image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Clock,
    time: "08:00-12:00",
    access: "На катере",
    size: "medium"
  },
  {
    id: 4,
    title: "Приватные пляжи клуба",
    description: "Эксклюзивные локации только для членов GTS",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: MapPin,
    time: "24/7",
    access: "VIP доступ",
    size: "small"
  },
  {
    id: 5,
    title: "Горные серпантины",
    description: "Лучшие маршруты для Slingshot с захватывающими поворотами",
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Clock,
    time: "06:00-18:00",
    access: "На Slingshot",
    size: "small"
  },
  {
    id: 6,
    title: "Панорамные точки",
    description: "Вертолётные площадки с лучшими видами на регион",
    image: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZCUyMGx1eHVyeXxlbnwxfHx8fDE3NTYxMzYxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    icon: Camera,
    time: "По заявке",
    access: "На вертолёте",
    size: "small"
  }
];

export function GTSPlacesSection() {
  return (
    <section className="py-16 lg:py-32 bg-black">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-6 lg:mb-8 tracking-wider text-white">
            ИНТЕРЕСНЫЕ МЕСТА
          </h2>
          <p className="text-base lg:text-xl text-white/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Эксклюзивные локации и секретные маршруты, доступные только 
            <span className="hidden sm:inline"> для членов клуба Grand Tour Sochi</span>
          </p>
        </div>

        {/* Places Grid - Mobile Optimized */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {places.map((place, index) => {
            // Simplified grid layout for better mobile experience
            const gridSpan = place.size === 'large' && window.innerWidth >= 1024 ? 'lg:col-span-2 lg:row-span-2' : 
                            place.size === 'medium' && window.innerWidth >= 1024 ? 'lg:row-span-2' : '';
            
            return (
              <Card 
                key={place.id} 
                className={`group border-0 shadow-none bg-transparent overflow-hidden relative ${gridSpan}`}
              >
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  place.size === 'large' && window.innerWidth >= 1024 ? 'aspect-square' : 'aspect-[4/3]'
                }`}>
                  <ImageWithFallback
                    src={place.image}
                    alt={place.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                  
                  {/* Icon */}
                  <div className="absolute top-3 lg:top-4 right-3 lg:right-4 w-6 h-6 lg:w-8 lg:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <place.icon className="w-3 h-3 lg:w-4 lg:h-4 text-white" />
                  </div>
                </div>
                
                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white">
                  <h3 className={`font-medium mb-2 tracking-wide leading-tight ${
                    place.size === 'large' && window.innerWidth >= 1024 ? 'text-xl lg:text-2xl' : 'text-base lg:text-lg'
                  }`}>
                    {place.title}
                  </h3>
                  
                  <p className={`text-white/80 leading-relaxed mb-3 lg:mb-4 line-clamp-2 ${
                    place.size === 'large' && window.innerWidth >= 1024 ? 'text-sm lg:text-base' : 'text-xs lg:text-sm'
                  }`}>
                    {place.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <div className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      <span className="truncate">{place.time}</span>
                    </div>
                    <div className="bg-[#91040C]/80 backdrop-blur-sm px-2 py-1 rounded text-white font-medium text-xs ml-2 flex-shrink-0">
                      {place.access}
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Interactive Map CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg p-6 lg:p-8 max-w-sm lg:max-w-md mx-auto">
            <MapPin className="w-8 h-8 lg:w-12 lg:h-12 text-[#91040C] mx-auto mb-3 lg:mb-4" />
            <h3 className="text-lg lg:text-xl text-white font-medium mb-3 lg:mb-4 tracking-wide">
              Интерактивная карта
            </h3>
            <p className="text-white/60 text-sm leading-relaxed mb-4 lg:mb-6 px-2">
              Получите доступ к персональной карте с GPS-координатами 
              <span className="hidden sm:inline"> всех эксклюзивных локаций</span>
            </p>
            <button className="w-full bg-white text-black hover:bg-white/90 transition-colors px-6 py-3 text-sm tracking-wider font-medium rounded">
              ПОЛУЧИТЬ КАРТУ
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}