import type { ElementType } from "react";
import { Shield, Crown, Users, MapPin } from "lucide-react";
import { motion } from "motion/react";
import { Route } from "./GTSRouter";
import { useCMS } from "../cms/CMSProvider";

const iconMap: Record<string, ElementType> = { Crown, Shield, Users, MapPin };

interface GTSAboutSectionProps {
  onNavigate?: (route: Route) => void;
}

export function GTSAboutSection({ onNavigate }: GTSAboutSectionProps) {
  const { data } = useCMS();
  const about = data.about;
  void onNavigate;

  return (
    <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-6">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="max-w-4xl mx-auto text-center mb-10 lg:mb-12"
        >
          <div className="inline-flex items-center px-3 py-1 bg-black/5 rounded-full mb-6">
            <span className="text-xs tracking-wider text-black/70 uppercase">{about.badge}</span>
          </div>
          
          <h2 className="text-4xl lg:text-6xl xl:text-7xl mb-6 tracking-wider text-black leading-tight">
            {about.title}
            <span className="block text-[#91040C] mt-2">{about.titleAccent}</span>
          </h2>
          
          <div className="space-y-5 max-w-3xl mx-auto">
            <p className="text-xl lg:text-2xl text-black/90 leading-relaxed">
              {about.description}
            </p>
            
            <p className="text-lg lg:text-xl text-black/70 leading-relaxed">
              {about.subdescription}
            </p>
          </div>
        </motion.div>

        {/* Statistics and Features */}
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: "easeOut", delay: 0.08 }}
          viewport={{ once: true, amount: 0.25 }}
        >
          {/* Statistics - Centered Row */}
          <div className="max-w-5xl mx-auto mb-14 lg:mb-16">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.members}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Членов клуба</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.vehicles}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Единиц техники</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.routes}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Маршрутов</div>
              </div>
              <div className="text-center">
                <div className="text-4xl lg:text-5xl text-black mb-2">{about.stats.support}</div>
                <div className="text-sm lg:text-base text-black/70 tracking-wide uppercase">Поддержка</div>
              </div>
            </div>
          </div>

          {/* Features Grid - Centered */}
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {about.features.map((feature) => {
                const FeatureIcon = iconMap[feature.icon] || Crown;
                return (
                <div key={feature.id} className="flex items-start space-x-5">
                  <div className="w-12 h-12 bg-black/5 rounded-full flex items-center justify-center flex-shrink-0">
                    <FeatureIcon className="w-6 h-6 text-[#91040C]" />
                  </div>
                  <div>
                    <h4 className="text-black mb-2 tracking-wide text-lg">{feature.title}</h4>
                    <p className="text-base text-black/70 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
                );
              })}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
