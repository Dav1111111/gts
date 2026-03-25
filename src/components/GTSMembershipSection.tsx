import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Crown, 
  Star, 
  Sparkles
} from "lucide-react";

import { useCMS } from "../cms/CMSProvider";

export function GTSMembershipSection() {
  const { data: { membershipTiers: memberships } } = useCMS();

  return (
    <section className="py-12 lg:py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
            <Crown className="w-4 h-4 mr-2 text-[#91040C]" />
            <span className="text-sm tracking-wider text-black/60 uppercase font-medium">ЭКСКЛЮЗИВНОЕ ЧЛЕНСТВО</span>
          </div>
          <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-wider text-black">
            GTS CLUB
          </h2>
          <p className="text-lg text-black/60 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Присоединяйтесь к эксклюзивному сообществу ценителей приключений. 
            Получите доступ к премиальной технике и уникальным маршрутам.
          </p>
        </div>

        {/* Membership Tiers Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {memberships.map((membership) => {
            const isSilver = membership.id === 'silver';
            const isGold = membership.id === 'gold';
            const isPlatinum = membership.id === 'platinum';

            // Determine border and gradient colors based on tier
            let borderClass = "border-2 border-gray-200 hover:border-gray-300";
            let gradientClass = "from-gray-100 to-gray-200";
            
            if (isSilver) {
              borderClass = "border-2 border-[#91040C]";
              gradientClass = "from-slate-100 to-slate-200";
            } else if (isGold) {
              gradientClass = "from-yellow-100 to-yellow-200";
            } else if (isPlatinum) {
              gradientClass = "from-gray-100 to-gray-200";
            }

            return (
              <Card 
                key={membership.id} 
                className={`${borderClass} shadow-${isSilver ? 'lg' : 'sm'} bg-white overflow-hidden transition-all duration-300 relative`}
              >
                {membership.isPopular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#91040C] text-white border-0 px-4 py-1">
                      ПОПУЛЯРНЫЙ
                    </Badge>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${gradientClass}`}></div>
                
                <div className="p-6 text-center">
                  <div className={`w-12 h-12 bg-gradient-to-r ${gradientClass} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {isSilver ? <Star className="w-6 h-6 text-black/70" /> : <Crown className="w-6 h-6 text-black/70" />}
                  </div>
                  <h3 className="text-xl font-medium text-black mb-2 tracking-wide">{membership.tier}</h3>
                  <div className="text-2xl font-light text-black mb-2">{membership.price}</div>
                  <div className="text-sm text-black/60 mb-4">{membership.period}</div>
                  <p className="text-sm text-black/60 leading-relaxed">
                    {membership.features.join(", ")}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Compact Benefits */}
        <div className="text-center mb-8">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-black/70">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#91040C]" />
              <span>Ранний доступ к новой технике</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#91040C]" />
              <span>Эксклюзивные VIP маршруты</span>
            </div>
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#91040C]" />
              <span>Бронирование без предоплаты</span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-black/60 mb-6 max-w-2xl mx-auto">
            Премиальное членство открывает доступ к эксклюзивным возможностям и персональному сервису
          </p>
          <div className="flex justify-center">
            <div className="px-6 py-3 bg-black/5 rounded-lg text-black/60 text-sm">
              Подробности по запросу: +7 (862) 555-0123
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}