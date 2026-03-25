import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Clock, Users, ArrowRight, Heart, Zap, Calendar, Flame } from 'lucide-react';

interface ServiceCard {
  id: string;
  title: string;
  image: string;
  price: number;
  included: string;
  description: string;
  duration: string;
  capacity: number;
}

interface Scenario {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

interface FlashOffer {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  timeLeft: string;
  urgencyText: string;
}

const mainServices: ServiceCard[] = [
  {
    id: 'boat',
    title: 'Yamaha 252S',
    image: 'https://images.unsplash.com/photo-1663670187287-f32c9676ff8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHlhbWFoYSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTM1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 25000,
    included: 'Капитан, топливо, безопасность',
    description: 'Роскошная яхта для морских прогулок с максимальным комфортом',
    duration: '2-6 часов',
    capacity: 8
  },
  {
    id: 'slingshot',
    title: 'Polaris Slingshot R',
    image: 'https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjY1MzU0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 20000,
    included: 'Инструктаж, шлемы, страховка',
    description: 'Спортивный трёхколёсник для адреналиновых поездок по городу',
    duration: '3-8 часов',
    capacity: 2
  },
  {
    id: 'buggy',
    title: 'Honda Talon',
    image: 'https://images.unsplash.com/photo-1537053199060-739c98a5a5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMHRhbG9uJTIwYnVnZ3klMjBvZmYlMjByb2FkfGVufDF8fHx8MTc1NjY1MzU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 15000,
    included: 'Экипировка, гид, безопасность',
    description: 'Экстремальные поездки по бездорожью и горным тропам',
    duration: '2-4 часа',
    capacity: 2
  },
  {
    id: 'helicopter',
    title: 'Robinson R44',
    image: 'https://images.unsplash.com/photo-1546074340-03afe76c1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JpbnNvbiUyMGhlbGljb3B0ZXIlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NjUzNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 35000,
    included: 'Пилот, брифинг, фотосъёмка',
    description: 'Вертолётные экскурсии над горами Красной Поляны',
    duration: '20-60 мин',
    capacity: 3
  }
];

const scenarios: Scenario[] = [
  {
    id: 'romantic',
    title: 'Романтическое свидание',
    icon: <Heart className="h-5 w-5" />,
    description: 'Slingshot на закате + ужин'
  },
  {
    id: 'adrenaline',
    title: 'Адреналиновый день',
    icon: <Zap className="h-5 w-5" />,
    description: 'Багги утром + вертолёт днём'
  },
  {
    id: 'family',
    title: 'Семейное приключение',
    icon: <Users className="h-5 w-5" />,
    description: 'Яхта + экскурсия для всех'
  }
];

const flashOffers: FlashOffer[] = [
  {
    id: 'slingshot-tomorrow',
    title: 'Slingshot завтра',
    originalPrice: 25000,
    discountPrice: 18000,
    timeLeft: '2ч 15м',
    urgencyText: 'Только 1 место!'
  },
  {
    id: 'helicopter-today',
    title: 'Вертолёт сегодня 16:00',
    originalPrice: 15000,
    discountPrice: 9500,
    timeLeft: '45м',
    urgencyText: '2 места осталось'
  }
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

interface GTSPremiumCatalogSectionProps {
  onViewFullCatalog: () => void;
}

export function GTSPremiumCatalogSection({ onViewFullCatalog }: GTSPremiumCatalogSectionProps) {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="mb-4 tracking-tight" 
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: '700', 
              fontSize: '3rem', 
              lineHeight: '1.2' 
            }}
          >
            Наш флот
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Премиальная техника для незабываемых приключений на воде, земле и в воздухе
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Main services grid */}
          <div className="xl:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mainServices.map((service) => (
                <Card 
                  key={service.id} 
                  className="group overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white"
                >
                  {/* Service image */}
                  <div className="relative aspect-[9/16] md:aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Price badge */}
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-black/70 text-white backdrop-blur-sm border-0">
                        от {formatPrice(service.price)}
                      </Badge>
                    </div>

                    {/* Service details overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{service.title}</h3>
                      <p className="text-white/90 text-sm mb-2 line-clamp-2">{service.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-white/80 mb-3">
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {service.duration}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          до {service.capacity}
                        </div>
                      </div>
                      
                      <p className="text-white/70 text-xs mb-3">{service.included}</p>
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="p-4">
                    <Button className="w-full bg-black hover:bg-gray-800 text-white">
                      Забронировать
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {/* View full catalog */}
            <div className="text-center mt-8">
              <Button 
                variant="outline" 
                onClick={onViewFullCatalog}
                className="px-8 py-3"
              >
                Посмотреть весь каталог
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Sidebar with scenarios and flash offers */}
          <div className="xl:col-span-1 space-y-6">
            {/* Scenarios */}
            <Card className="p-6 bg-gray-50">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-lg">Готовые сценарии</h3>
              </div>
              
              <div className="space-y-3">
                {scenarios.map((scenario) => (
                  <div 
                    key={scenario.id}
                    className="flex items-start gap-3 p-3 bg-white rounded-lg hover:shadow-sm transition-shadow cursor-pointer"
                  >
                    <div className="text-accent mt-0.5">
                      {scenario.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm mb-1">{scenario.title}</h4>
                      <p className="text-xs text-gray-600">{scenario.description}</p>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 mt-0.5" />
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4">
                Все сценарии
              </Button>
            </Card>

            {/* Flash offers */}
            <Card className="p-6 bg-accent/5 border-accent/20">
              <div className="flex items-center gap-2 mb-4">
                <Flame className="h-5 w-5 text-accent" />
                <h3 className="font-semibold text-lg">Срочные предложения</h3>
              </div>
              
              <div className="space-y-4">
                {flashOffers.map((offer) => (
                  <div 
                    key={offer.id}
                    className="p-4 bg-white rounded-lg border border-accent/20 hover:shadow-sm transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-sm">{offer.title}</h4>
                      <Badge variant="outline" className="text-accent border-accent text-xs">
                        -{Math.round(((offer.originalPrice - offer.discountPrice) / offer.originalPrice) * 100)}%
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-accent">
                        {formatPrice(offer.discountPrice)}
                      </span>
                      <span className="text-xs text-gray-500 line-through">
                        {formatPrice(offer.originalPrice)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-xs mb-3">
                      <span className="text-gray-600">Осталось: {offer.timeLeft}</span>
                      <span className="text-accent font-medium">{offer.urgencyText}</span>
                    </div>

                    <Button size="sm" className="w-full bg-accent hover:bg-accent/90 text-white">
                      Забронировать сейчас
                    </Button>
                  </div>
                ))}
              </div>

              <Button variant="outline" size="sm" className="w-full mt-4 border-accent text-accent hover:bg-accent hover:text-white">
                Все предложения
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}