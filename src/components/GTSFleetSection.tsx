import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight } from "lucide-react";

const fleet = [
  {
    id: 1,
    title: "Yamaha 252S",
    subtitle: "Катер 12 пассажиров",
    description: "Премиальный катер для морских прогулок и водных развлечений с максимальным комфортом",
    image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: ["320 л.с.", "12 мест", "GPS навигация"]
  },
  {
    id: 2,
    title: "Polaris Slingshot",
    subtitle: "Трицикл 203 л.с.",
    description: "Уникальный трёхколёсный спорткар для незабываемых поездок по горным серпантинам",
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: ["203 л.с.", "2 места", "Открытая кабина"]
  },
  {
    id: 3,
    title: "Honda Talon",
    subtitle: "Багги 104 л.с.",
    description: "Мощный внедорожник для экстремальных маршрутов и исследования горных троп",
    image: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZCUyMGx1eHVyeXxlbnwxfHx8fDE3NTYxMzYxMjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: ["104 л.с.", "4 места", "Полный привод"]
  },
  {
    id: 4,
    title: "Robinson R44",
    subtitle: "Вертолёт 3 пассажира",
    description: "Премиальные вертолётные экскурсии с панорамными видами на Сочи и Кавказские горы",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: ["245 л.с.", "3 пассажира", "Панорамный обзор"]
  }
];

export function GTSFleetSection() {
  return (
    <section className="py-16 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-6 lg:mb-8 tracking-wider text-black">
            НАША ТЕХНИКА
          </h2>
          <p className="text-base lg:text-xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Эксклюзивная коллекция премиальной техники для активного отдыха. 
            <span className="hidden sm:inline"> Каждая единица проходит регулярное техническое обслуживание и соответствует 
            высочайшим стандартам безопасности.</span>
          </p>
        </div>

        {/* Fleet Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {fleet.map((vehicle) => (
            <Card key={vehicle.id} className="group border-0 shadow-none bg-transparent overflow-hidden">
              {/* Image */}
              <div className="aspect-[4/5] sm:aspect-[9/16] overflow-hidden mb-4 lg:mb-6">
                <ImageWithFallback
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              
              {/* Content */}
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <h3 className="text-lg lg:text-xl font-medium text-black mb-1 tracking-wide">
                    {vehicle.title}
                  </h3>
                  <p className="text-sm text-[#91040C] font-medium tracking-wide uppercase">
                    {vehicle.subtitle}
                  </p>
                </div>
                
                <p className="text-sm text-black/60 leading-relaxed line-clamp-2 lg:line-clamp-none">
                  {vehicle.description}
                </p>
                
                <div className="space-y-1 lg:space-y-2">
                  {vehicle.specs.map((spec, index) => (
                    <div key={index} className="text-xs text-black/50 tracking-wide">
                      {spec}
                    </div>
                  ))}
                </div>
                
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="p-0 h-auto text-black hover:text-[#91040C] transition-colors group/btn"
                >
                  <span className="text-sm tracking-wide font-medium">ПОДРОБНЕЕ</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-20">
          <Button 
            size="lg"
            className="bg-black hover:bg-black/90 text-white border-0 px-8 lg:px-12 py-3 lg:py-4 text-sm tracking-wider"
          >
            СМОТРЕТЬ ВСЮ ТЕХНИКУ
          </Button>
        </div>
      </div>
    </section>
  );
}