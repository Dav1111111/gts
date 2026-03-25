import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ArrowRight, Crown, Star, Zap } from 'lucide-react';

interface MembershipTier {
  name: string;
  icon: React.ReactNode;
  benefit: string;
  color: string;
}

const membershipTiers: MembershipTier[] = [
  {
    name: 'Bronze',
    icon: <div className="w-6 h-6 bg-amber-600 rounded-full" />,
    benefit: 'Скидка 5%',
    color: 'text-amber-600'
  },
  {
    name: 'Silver',
    icon: <div className="w-6 h-6 bg-gray-400 rounded-full" />,
    benefit: 'Скидка 10%',
    color: 'text-gray-500'
  },
  {
    name: 'Gold',
    icon: <Crown className="w-6 h-6 text-yellow-500" />,
    benefit: 'Скидка 15%',
    color: 'text-yellow-500'
  },
  {
    name: 'Platinum',
    icon: <Star className="w-6 h-6 text-purple-500" />,
    benefit: 'Скидка 25%',
    color: 'text-purple-500'
  }
];

interface GTSMinimalClubCTAProps {
  onViewMembership: () => void;
}

export function GTSMinimalClubCTA({ onViewMembership }: GTSMinimalClubCTAProps) {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Left side - Main CTA */}
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
                <Zap className="h-6 w-6 text-accent" />
                <Badge className="bg-accent text-white border-accent">
                  Эксклюзивно
                </Badge>
              </div>
              
              <h2 
                className="mb-4 tracking-tight text-white" 
                style={{ 
                  fontFamily: 'Inter, system-ui, sans-serif', 
                  fontWeight: '700', 
                  fontSize: '2.5rem', 
                  lineHeight: '1.2' 
                }}
              >
                Присоединяйтесь к клубу GTS
              </h2>
              
              <p className="text-white/80 text-lg mb-6 max-w-md mx-auto lg:mx-0">
                Эксклюзивные привилегии, приоритетное бронирование 
                и персональный сервис
              </p>
              
              <div className="space-y-3 mb-8">
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  <span className="text-sm">Скидки до 25% на все услуги</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  <span className="text-sm">Приоритетное бронирование</span>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-3 text-white/70">
                  <div className="w-1 h-1 bg-accent rounded-full" />
                  <span className="text-sm">Персональный менеджер</span>
                </div>
              </div>
              
              <Button 
                onClick={onViewMembership}
                className="bg-accent hover:bg-accent/90 text-white px-8 py-3 text-lg"
              >
                Узнать больше
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>

            {/* Right side - Membership tiers preview */}
            <div className="relative">
              <Card className="bg-white/10 backdrop-blur-sm border-white/20 p-6">
                <h3 className="text-white font-semibold text-xl mb-4 text-center">
                  Уровни членства
                </h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {membershipTiers.map((tier, index) => (
                    <div 
                      key={tier.name}
                      className="flex flex-col items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
                    >
                      <div className="mb-2 group-hover:scale-110 transition-transform">
                        {tier.icon}
                      </div>
                      <h4 className={`font-medium text-sm mb-1 ${tier.color}`}>
                        {tier.name}
                      </h4>
                      <p className="text-white/60 text-xs text-center">
                        {tier.benefit}
                      </p>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-white/50 text-xs mb-3">
                    Выберите подходящий уровень
                  </p>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={onViewMembership}
                    className="border-white/30 text-white hover:bg-white hover:text-black"
                  >
                    Сравнить уровни
                  </Button>
                </div>
              </Card>

              {/* Decorative elements */}
              <div className="absolute -top-2 -right-2 w-16 h-16 bg-accent/20 rounded-full blur-xl" />
              <div className="absolute -bottom-2 -left-2 w-12 h-12 bg-white/10 rounded-full blur-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}