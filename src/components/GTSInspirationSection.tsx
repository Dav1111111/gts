import { ImageWithFallback } from './figma/ImageWithFallback';
import { Button } from './ui/button';
import { ArrowRight, Heart, Zap, Users } from 'lucide-react';

interface ScenarioCard {
  id: string;
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
  packages: string[];
}

const scenarios: ScenarioCard[] = [
  {
    id: 'romantic',
    title: 'Романтическое путешествие',
    description: 'Незабываемые моменты на закате с Slingshot и яхтой',
    image: 'https://images.unsplash.com/photo-1674674614545-f53dfddd3071?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb21hbnRpYyUyMHN1bnNldCUyMHNsaW5nc2hvdCUyMHJpZGV8ZW58MXx8fHwxNzU2NjUyNDE2fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: <Heart className="h-6 w-6" />,
    packages: ['Slingshot на закате', 'Яхта Yamaha 252S']
  },
  {
    id: 'adrenaline',
    title: 'Адреналин',
    description: 'Экстремальные ощущения с багги и гидроциклом',
    image: 'https://images.unsplash.com/photo-1608640732327-b26893498806?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhZHJlbmFsaW5lJTIwYnVnZ3klMjByYWNpbmclMjBhZHZlbnR1cmV8ZW58MXx8fHwxNzU2NjUyNDE3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: <Zap className="h-6 w-6" />,
    packages: ['Honda Talon багги', 'Скоростной катер']
  },
  {
    id: 'family',
    title: 'Семейное приключение',
    description: 'Безопасные развлечения для всей семьи',
    image: 'https://images.unsplash.com/photo-1724332936268-48582d4c5073?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmYW1pbHklMjBoZWxpY29wdGVyJTIwdG91ciUyMG1vdW50YWluc3xlbnwxfHx8fDE3NTY2NTI0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: <Users className="h-6 w-6" />,
    packages: ['Вертолёт Robinson', 'Комфорт яхта']
  },
  {
    id: 'luxury',
    title: 'Люкс-отдых',
    description: 'Премиальный сервис с максимальным комфортом',
    image: 'https://images.unsplash.com/photo-1598737285721-29346a5c9278?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGJvYXQlMjBvY2VhbnxlbnwxfHx8fDE3NTY2NTI0MTh8MA&ixlib=rb-4.1.0&q=80&w=1080',
    icon: <Heart className="h-6 w-6" />,
    packages: ['VIP яхта-тур', 'Персональный гид']
  }
];

export function GTSInspirationSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700', fontSize: '3rem', lineHeight: '1.2' }}>
            Сценарии вдохновения
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите идеальный вариант отдыха под ваше настроение и компанию
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-64 overflow-hidden">
                <ImageWithFallback
                  src={scenario.image}
                  alt={scenario.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                
                {/* Icon */}
                <div className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-lg text-white">
                  {scenario.icon}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white mb-2 font-semibold text-xl">
                    {scenario.title}
                  </h3>
                  <p className="text-white/90 text-sm mb-4 leading-relaxed">
                    {scenario.description}
                  </p>

                  {/* Package tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {scenario.packages.map((pkg, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-md"
                      >
                        {pkg}
                      </span>
                    ))}
                  </div>

                  <Button 
                    size="sm" 
                    className="w-full bg-accent hover:bg-accent/90 text-white border-0 group-hover:bg-accent/80"
                  >
                    Посмотреть пакеты
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}