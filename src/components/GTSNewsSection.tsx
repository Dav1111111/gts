import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const news = [
  {
    id: 1,
    title: "Новый маршрут: Красная Поляна — Роза Хутор",
    excerpt: "Эксклюзивная экспедиция на багги по горным тропам с остановками в самых живописных точках.",
    image: "https://images.unsplash.com/photo-1646273470766-38e066a0d146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NoaSUyMG1vdW50YWlucyUyMGx1eHVyeSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "МАРШРУТЫ",
    date: "15 янв",
    readTime: "3 мин",
    featured: true
  },
  {
    id: 2,
    title: "Скидка 30% на морские прогулки",
    excerpt: "Специальное предложение на аренду катеров в будние дни. Действует до конца месяца.",
    image: "https://images.unsplash.com/photo-1654850888151-883881017fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNlYSUyMGNvYXN0JTIwcHJlbWl1bXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "АКЦИИ",
    date: "12 янв",
    readTime: "2 мин",
    featured: false
  },
  {
    id: 3,
    title: "VIP-тур: Закрытые пляжи Сочи",
    excerpt: "Эксклюзивная программа для членов клуба с доступом к приватным локациям.",
    image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "VIP",
    date: "10 янв",
    readTime: "4 мин",
    featured: false
  },
  {
    id: 4,
    title: "Вертолётные экскурсии: Новое расписание",
    excerpt: "Увеличенное количество рейсов и новые маршруты над Кавказскими горами.",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "РАСПИСАНИЕ",
    date: "8 янв",
    readTime: "2 мин",
    featured: false
  },
  {
    id: 5,
    title: "Открытие сезона: Slingshot туры",
    excerpt: "Старт сезона экстремальных поездок на трицикле по горным серпантинам.",
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "НОВОСТИ",
    date: "5 янв",
    readTime: "3 мин",
    featured: false
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case "АКЦИИ": return "bg-[#91040C] text-white";
    case "VIP": return "bg-black text-white";
    case "МАРШРУТЫ": return "bg-gray-100 text-black";
    default: return "bg-gray-100 text-black";
  }
};

interface GTSNewsSectionProps {}

export function GTSNewsSection({}: GTSNewsSectionProps = {}) {
  const featuredNews = news.find(item => item.featured);
  const regularNews = news.filter(item => !item.featured);

  return (
    <section className="py-16 lg:py-32 bg-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-light mb-6 lg:mb-8 tracking-wider text-black">
            НОВОСТИ И АКЦИИ
          </h2>
          <p className="text-base lg:text-xl text-black/60 max-w-3xl mx-auto font-light leading-relaxed px-4">
            Актуальные предложения, новые маршруты и эксклюзивные события 
            <span className="hidden sm:inline"> для членов клуба Grand Tour Sochi</span>
          </p>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Featured News */}
          {featuredNews && (
            <div className="lg:col-span-2">
              <Card className="group border-0 shadow-sm bg-white overflow-hidden h-full">
                <div className="aspect-[16/9] lg:aspect-[16/9] overflow-hidden">
                  <ImageWithFallback
                    src={featuredNews.image}
                    alt={featuredNews.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                
                <div className="p-6 lg:p-8">
                  <div className="flex items-center justify-between mb-4">
                    <Badge className={`${getCategoryColor(featuredNews.category)} text-xs tracking-wider`}>
                      {featuredNews.category}
                    </Badge>
                    <div className="flex items-center space-x-3 lg:space-x-4 text-xs text-black/50">
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {featuredNews.date}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {featuredNews.readTime}
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl lg:text-2xl font-medium text-black mb-3 lg:mb-4 tracking-wide leading-tight line-clamp-2">
                    {featuredNews.title}
                  </h3>
                  
                  <p className="text-black/60 leading-relaxed mb-4 lg:mb-6 line-clamp-2 lg:line-clamp-none">
                    {featuredNews.excerpt}
                  </p>
                  
                  <div className="group/btn flex items-center text-black/60">
                    <span className="text-sm tracking-wide font-medium">{featuredNews.readTime} чтения</span>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* Regular News */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6 lg:gap-8">
            {regularNews.slice(0, 4).map((item) => (
              <Card 
                key={item.id} 
                className="group border-0 shadow-sm bg-white overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row lg:flex-row space-y-0 space-x-0 sm:space-x-4 lg:space-x-4">
                  <div className="w-full sm:w-24 lg:w-24 h-48 sm:h-24 lg:h-24 flex-shrink-0 overflow-hidden">
                    <ImageWithFallback
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0 p-4 sm:p-0 lg:p-0 sm:py-4 lg:py-6 sm:pr-4 lg:pr-6">
                    <div className="flex items-center justify-between mb-2">
                      <Badge className={`${getCategoryColor(item.category)} text-xs tracking-wider`}>
                        {item.category}
                      </Badge>
                      <div className="text-xs text-black/50">
                        {item.date}
                      </div>
                    </div>
                    
                    <h4 className="text-sm lg:text-sm font-medium text-black mb-2 leading-tight line-clamp-2">
                      {item.title}
                    </h4>
                    
                    <p className="text-xs text-black/60 leading-relaxed line-clamp-2 hidden sm:block lg:block">
                      {item.excerpt}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>


      </div>
    </section>
  );
}