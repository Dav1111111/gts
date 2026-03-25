import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Clock, Users, MapPin, Zap } from 'lucide-react';

interface FlashOffer {
  id: string;
  title: string;
  originalPrice: number;
  discountPrice: number;
  timeLeft: number; // в минутах
  slotsLeft: number;
  location: string;
  duration: string;
  image: string;
  urgent: boolean;
}

const initialOffers: FlashOffer[] = [
  {
    id: 'slingshot-tomorrow',
    title: 'Slingshot на завтра',
    originalPrice: 25000,
    discountPrice: 18000,
    timeLeft: 120, // 2 часа
    slotsLeft: 1,
    location: 'Сочи Парк',
    duration: '3 часа',
    image: 'https://images.unsplash.com/photo-1753939582867-8ee4285f0068?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwcmVkJTIwY2FyfGVufDF8fHx8MTc1NjY1MjQ1Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    urgent: true
  },
  {
    id: 'helicopter-sharing',
    title: 'Групповой полет на вертолёте',
    originalPrice: 15000,
    discountPrice: 9500,
    timeLeft: 45, // 45 минут
    slotsLeft: 2,
    location: 'Красная Поляна',
    duration: '30 мин',
    image: 'https://images.unsplash.com/photo-1656537811631-873e8f854403?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwZmxpZ2h0JTIwc29jaGklMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NjUyNDUyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    urgent: true
  },
  {
    id: 'yacht-sunset',
    title: 'Яхта на закате',
    originalPrice: 35000,
    discountPrice: 28000,
    timeLeft: 180, // 3 часа
    slotsLeft: 4,
    location: 'Морвокзал',
    duration: '4 часа',
    image: 'https://images.unsplash.com/photo-1598737285721-29346a5c9278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTI0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    urgent: false
  }
];

function formatTime(minutes: number): string {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  
  if (hours > 0) {
    return `${hours}ч ${mins}м`;
  }
  return `${mins}м`;
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function GTSFlashOffersSection() {
  const [offers, setOffers] = useState(initialOffers);

  useEffect(() => {
    const timer = setInterval(() => {
      setOffers(prevOffers =>
        prevOffers.map(offer => ({
          ...offer,
          timeLeft: Math.max(0, offer.timeLeft - 1)
        })).filter(offer => offer.timeLeft > 0)
      );
    }, 60000); // обновляем каждую минуту

    return () => clearInterval(timer);
  }, []);

  if (offers.length === 0) return null;

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Zap className="h-8 w-8 text-accent" />
            <h2 className="tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700', fontSize: '3rem', lineHeight: '1.2' }}>
              Срочные предложения
            </h2>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Ограниченные по времени скидки на самые популярные активности
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => (
            <div
              key={offer.id}
              className={`relative bg-white rounded-2xl overflow-hidden shadow-lg border-2 transition-all duration-300 hover:-translate-y-1 ${
                offer.urgent ? 'border-accent shadow-accent/10' : 'border-gray-100'
              }`}
            >
              {/* Urgent badge */}
              {offer.urgent && (
                <div className="absolute top-4 left-4 z-10">
                  <Badge className="bg-accent text-white border-accent animate-pulse">
                    <Zap className="h-3 w-3 mr-1" />
                    Срочно!
                  </Badge>
                </div>
              )}

              {/* Time left badge */}
              <div className="absolute top-4 right-4 z-10">
                <Badge variant="secondary" className="bg-black/70 text-white border-0 backdrop-blur-sm">
                  <Clock className="h-3 w-3 mr-1" />
                  {formatTime(offer.timeLeft)}
                </Badge>
              </div>

              <div className="relative h-48 overflow-hidden">
                <ImageWithFallback
                  src={offer.image}
                  alt={offer.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-xl mb-3">
                  {offer.title}
                </h3>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-accent">
                    {formatPrice(offer.discountPrice)}
                  </span>
                  <span className="text-muted-foreground line-through text-lg">
                    {formatPrice(offer.originalPrice)}
                  </span>
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    -{Math.round(((offer.originalPrice - offer.discountPrice) / offer.originalPrice) * 100)}%
                  </Badge>
                </div>

                {/* Details */}
                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {offer.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Длительность: {offer.duration}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    Осталось мест: {offer.slotsLeft}
                  </div>
                </div>

                <Button 
                  className={`w-full ${
                    offer.urgent 
                      ? 'bg-accent hover:bg-accent/90 text-white animate-pulse' 
                      : 'bg-black hover:bg-gray-800 text-white'
                  }`}
                >
                  Забронировать сейчас
                </Button>

                {offer.slotsLeft <= 2 && (
                  <p className="text-center text-sm text-accent mt-2 font-medium">
                    Только {offer.slotsLeft} {offer.slotsLeft === 1 ? 'место' : 'места'} осталось!
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}