import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Александр Волков",
    title: "Предприниматель",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    text: "Незабываемый опыт на Yamaha 252S. Профессиональная команда, безупречный сервис. GTS — это новый уровень активного отдыха в Сочи.",
    rating: 5,
    experience: "Морская прогулка"
  },
  {
    id: 2,
    name: "Елена Козлова",
    title: "Архитектор",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b9c1b9ad?w=150&h=150&fit=crop&crop=face",
    text: "Полёт на вертолёте над Кавказскими горами — это что-то невероятное. Виды, которые запомнятся на всю жизнь.",
    rating: 5,
    experience: "Вертолётная экскурсия"
  },
  {
    id: 3,
    name: "Михаил Орлов",
    title: "Инвестор",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    text: "Багги-тур по горным тропам превзошёл все ожидания. Адреналин, красота природы и высочайший уровень безопасности.",
    rating: 5,
    experience: "Горная экспедиция"
  },
  {
    id: 4,
    name: "Анна Смирнова",
    title: "Дизайнер",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    text: "Slingshot — это чистый восторг! Скорость, ветер в волосах и потрясающие виды на серпантинах. Обязательно вернусь.",
    rating: 5,
    experience: "Slingshot тур"
  }
];

export function GTSReviewsSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleReviews = () => {
    const visible = [];
    const itemsToShow = window.innerWidth >= 768 ? 3 : 1; // Show 1 on mobile, 3 on desktop
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentSlide + i) % reviews.length;
      visible.push(reviews[index]);
    }
    return visible;
  };

  return (
    <section className="py-16 lg:py-32 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-6 lg:mb-8 tracking-wider text-black">
            ОТЗЫВЫ КЛИЕНТОВ
          </h2>
          <p className="text-base lg:text-xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Мнения членов нашего клуба — лучшая рекомендация качества 
            <span className="hidden sm:inline"> и уровня сервиса Grand Tour Sochi</span>
          </p>
        </div>

        {/* Reviews Slider */}
        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {getVisibleReviews().map((review, index) => (
              <Card 
                key={`${review.id}-${currentSlide}`} 
                className={`border-0 shadow-sm bg-white p-6 lg:p-8 transition-all duration-500 ${
                  index === 1 && window.innerWidth >= 768 ? 'md:scale-105 md:shadow-lg' : ''
                }`}
              >
                {/* Rating */}
                <div className="flex items-center mb-4 lg:mb-6">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#91040C] text-[#91040C]" />
                  ))}
                </div>

                {/* Text */}
                <blockquote className="text-black/80 leading-relaxed mb-6 lg:mb-8 text-base lg:text-lg">
                  "{review.text}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center">
                  <ImageWithFallback
                    src={review.avatar}
                    alt={review.name}
                    className="w-10 h-10 lg:w-12 lg:h-12 rounded-full object-cover mr-3 lg:mr-4 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium text-black tracking-wide text-sm lg:text-base truncate">
                      {review.name}
                    </div>
                    <div className="text-sm text-black/60 truncate">
                      {review.title}
                    </div>
                    <div className="text-xs text-[#91040C] font-medium tracking-wide mt-1">
                      {review.experience}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center mt-8 lg:mt-12 space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={prevSlide}
              className="border-black/20 hover:border-black hover:bg-black hover:text-white transition-all w-10 h-10 p-0"
            >
              <ChevronLeft className="w-4 h-4" />
            </Button>

            {/* Dots */}
            <div className="flex space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentSlide ? 'bg-black' : 'bg-black/20'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={nextSlide}
              className="border-black/20 hover:border-black hover:bg-black hover:text-white transition-all w-10 h-10 p-0"
            >
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 lg:mt-16">
          <p className="text-black/60 mb-4 lg:mb-6 px-4">Станьте частью нашего клуба</p>
          <Button 
            size="lg"
            className="bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 px-8 lg:px-12 py-3 lg:py-4 text-sm tracking-wider"
          >
            ПОДАТЬ ЗАЯВКУ В КЛУБ
          </Button>
        </div>
      </div>
    </section>
  );
}