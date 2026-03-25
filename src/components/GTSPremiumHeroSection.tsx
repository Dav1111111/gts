import { useState, useEffect } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MessageCircle, Send, Sparkles, Clock, Users, ArrowRight } from 'lucide-react';

interface OfferCard {
  id: string;
  title: string;
  image: string;
  price: number;
  duration: string;
  capacity: number;
  description: string;
}

const offerCards: OfferCard[] = [
  {
    id: 'yacht',
    title: 'Yamaha 252S',
    image: 'https://images.unsplash.com/photo-1663670187287-f32c9676ff8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHlhbWFoYSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTM1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 25000,
    duration: '2-6 часов',
    capacity: 8,
    description: 'Роскошная яхта для морских прогулок'
  },
  {
    id: 'slingshot',
    title: 'Polaris Slingshot R',
    image: 'https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjY1MzU0NHww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 20000,
    duration: '3-8 часов',
    capacity: 2,
    description: 'Спортивный трёхколёсник'
  },
  {
    id: 'buggy',
    title: 'Honda Talon',
    image: 'https://images.unsplash.com/photo-1537053199060-739c98a5a5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMHRhbG9uJTIwYnVnZ3klMjBvZmYlMjByb2FkfGVufDF8fHx8MTc1NjY1MzU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
    price: 15000,
    duration: '2-4 часа',
    capacity: 2,
    description: 'Экстремальные поездки по бездорожью'
  },
  {
    id: 'helicopter',
    title: 'Robinson R44',
    image: 'https://images.unsplash.com/photo-1546074340-03afe76c1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JpbnNvbiUyMGhlbGljb3B0ZXIlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NjUzNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    price: 35000,
    duration: '20-60 мин',
    capacity: 3,
    description: 'Вертолётные экскурсии над горами'
  }
];

const backgroundVideos = [
  'https://images.unsplash.com/photo-1663670187287-f32c9676ff8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHlhbWFoYSUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTM1NDR8MA&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjY1MzU0NHww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1537053199060-739c98a5a5b0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMHRhbG9uJTIwYnVnZ3klMjBvZmYlMjByb2FkfGVufDF8fHx8MTc1NjY1MzU0NXww&ixlib=rb-4.1.0&q=80&w=1080',
  'https://images.unsplash.com/photo-1546074340-03afe76c1047?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JpbnNvbiUyMGhlbGljb3B0ZXIlMjBtb3VudGFpbnN8ZW58MXx8fHwxNzU2NjUzNTQ1fDA&ixlib=rb-4.1.0&q=80&w=1080'
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function GTSPremiumHeroSection() {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [userQuery, setUserQuery] = useState('');
  const [conversation, setConversation] = useState<Array<{type: 'user' | 'ai', text: string}>>([]);

  // Cycle through background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgroundVideos.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAIQuery = () => {
    if (!userQuery.trim()) return;
    
    setConversation([
      { type: 'user', text: userQuery },
      { type: 'ai', text: 'Отличный выбор! Я подобрал лучшие варианты активного отдыха для вас:' }
    ]);
    
    setUserQuery('');
    setIsAIOpen(true);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background slideshow */}
      <div className="absolute inset-0">
        {backgroundVideos.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentBackground ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ImageWithFallback
              src={image}
              alt={`GTS Background ${index + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Hero content */}
        <div className="flex-1 flex items-center justify-center text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h1 
              className="text-white mb-6 tracking-tight leading-none"
              style={{ 
                fontFamily: 'Inter, system-ui, sans-serif', 
                fontWeight: '700', 
                fontSize: 'clamp(3rem, 8vw, 6rem)' 
              }}
            >
              Grand Tour Sochi
            </h1>
            <p className="text-white/90 text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Премиальные приключения на воде, земле и в воздухе.<br />
              Эксклюзивная техника. Незабываемые впечатления.
            </p>
            
            {/* Quick access buttons */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button 
                size="lg"
                className="bg-accent hover:bg-accent/90 text-white border-0 px-8 py-3"
              >
                Каталог техники
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-3"
              >
                Членство в клубе
              </Button>
            </div>
          </div>
        </div>

        {/* AI Consultant Widget */}
        <div className="pb-8 px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="bg-black/80 backdrop-blur-sm border-white/20 text-white overflow-hidden">
              <div className="p-4 md:p-6">
                {/* AI Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
                    <Sparkles className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">AI Консультант GTS</h3>
                    <p className="text-white/70 text-sm">Поможет выбрать идеальное приключение</p>
                  </div>
                </div>

                {/* Conversation preview */}
                {conversation.length > 0 && (
                  <div className="mb-4 space-y-3">
                    {conversation.map((message, index) => (
                      <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-lg ${
                          message.type === 'user' 
                            ? 'bg-accent text-white' 
                            : 'bg-white/10 text-white'
                        }`}>
                          <p className="text-sm">{message.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input area */}
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 relative">
                    <input
                      type="text"
                      value={userQuery}
                      onChange={(e) => setUserQuery(e.target.value)}
                      placeholder="Расскажите, какой отдых вас интересует..."
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent"
                      onKeyPress={(e) => e.key === 'Enter' && handleAIQuery()}
                    />
                    <MessageCircle className="absolute right-3 top-3.5 h-5 w-5 text-white/50" />
                  </div>
                  <Button 
                    onClick={handleAIQuery}
                    className="bg-accent hover:bg-accent/90 text-white px-6"
                    disabled={!userQuery.trim()}
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>

                {/* Offer cards */}
                {isAIOpen && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {offerCards.map((offer) => (
                      <Card key={offer.id} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-200 group">
                        <div className="p-4">
                          <div className="relative h-24 rounded-lg overflow-hidden mb-3">
                            <ImageWithFallback
                              src={offer.image}
                              alt={offer.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          </div>
                          
                          <h4 className="text-white font-semibold text-sm mb-1">{offer.title}</h4>
                          <p className="text-white/70 text-xs mb-3 line-clamp-2">{offer.description}</p>
                          
                          <div className="flex items-center justify-between text-xs text-white/60 mb-3">
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {offer.duration}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              до {offer.capacity}
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className="text-accent font-semibold text-sm">
                              от {formatPrice(offer.price)}
                            </span>
                            <Button size="sm" className="bg-accent hover:bg-accent/90 text-white h-7 px-3 text-xs">
                              <ArrowRight className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Quick suggestions */}
                {!isAIOpen && (
                  <div className="flex flex-wrap gap-2">
                    <span className="text-white/50 text-sm mr-2">Популярные запросы:</span>
                    {['Романтическое свидание', 'Корпоратив', 'Семейный отдых', 'Экстрим'].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setUserQuery(suggestion)}
                        className="px-3 py-1 bg-white/10 hover:bg-white/20 rounded-full text-white/70 hover:text-white text-sm transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />
        </div>
      </div>
    </section>
  );
}