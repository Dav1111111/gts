import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1754400442751-c8539fc17e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWdneSUyMGRlc2VydCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTYxMzUyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
          alt="Багги в пустыне"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto px-4">
        <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
          Экстремальные 
          <span className="block text-yellow-400">Багги Экспедиции</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Почувствуйте адреналин настоящего приключения! Исследуйте пустыню на мощных багги и создайте незабываемые воспоминания.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 text-lg">
            Забронировать тур
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg">
            <Play className="mr-2 h-5 w-5" />
            Смотреть видео
          </Button>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-3xl mb-2">500+</div>
            <div className="text-gray-300">Довольных клиентов</div>
          </div>
          <div>
            <div className="text-3xl mb-2">5 лет</div>
            <div className="text-gray-300">Опыта в туризме</div>
          </div>
          <div>
            <div className="text-3xl mb-2">100%</div>
            <div className="text-gray-300">Безопасности</div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full p-1">
          <div className="w-1 h-3 bg-white rounded-full mx-auto animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}