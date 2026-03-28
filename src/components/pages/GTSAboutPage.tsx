import { useRef } from "react";
import { Card } from "../ui/card";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { 
  Target, Compass, Users, Award, 
  Heart, Shield, Sparkles, TrendingUp,
  Quote, MapPin, Mail, Phone
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";

interface GTSAboutPageProps {
  onNavigate: (route: Route) => void;
}

const values = [
  {
    icon: Target,
    title: "Наша миссия",
    description: "Создавать незабываемые приключения премиум-класса, где каждая деталь продумана для вашего комфорта и безопасности"
  },
  {
    icon: Compass,
    title: "Наша философия",
    description: "Мы верим, что настоящая роскошь — это свобода исследовать мир без компромиссов, в окружении единомышленников"
  },
  {
    icon: Heart,
    title: "Наши ценности",
    description: "Качество, безопасность, эксклюзивность и персональный подход к каждому члену клуба"
  },
  {
    icon: Shield,
    title: "Наши стандарты",
    description: "Высочайший уровень сервиса, профессиональные гиды и техника премиум-класса с полным обслуживанием"
  }
];

const team = [
  {
    id: "founder-ceo",
    name: "Александр Морозов",
    role: "Основатель и CEO",
    bio: "15 лет в премиум-туризме. Создал GTS с идеей объединить людей, которые ценят качество и ищут аутентичные впечатления.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AlexanderMorozov&backgroundColor=91040C",
    specialization: "Стратегия и развитие"
  },
  {
    id: "operations",
    name: "Елена Савельева",
    role: "Директор по операциям",
    bio: "Эксперт в организации VIP-туров. Отвечает за безупречное выполнение каждой экспедиции и высокие стандарты сервиса.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=ElenaSavelyeva",
    specialization: "Операции и качество"
  },
  {
    id: "head-guide",
    name: "Дмитрий Горный",
    role: "Главный гид",
    bio: "Альпинист, спасатель МЧС. Знает каждую тропу региона. Разработал все эксклюзивные маршруты клуба.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=DmitryGorny",
    specialization: "Маршруты и безопасность"
  },
  {
    id: "fleet-manager",
    name: "Сергей Власов",
    role: "Директор по флоту",
    bio: "20 лет опыта в управлении премиум-техникой. Каждая единица нашего флота — под его личным контролем.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=SergeyVlasov",
    specialization: "Техника и обслуживание"
  },
  {
    id: "concierge",
    name: "Анна Крылова",
    role: "Главный консьерж",
    bio: "Опыт работы в лучших отелях мира. Создает персональные программы и воплощает любые пожелания гостей.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=AnnaKrylova",
    specialization: "Консьерж-сервис"
  },
  {
    id: "chef",
    name: "Михаил Соловьев",
    role: "Шеф-повар",
    bio: "Авторская кухня с использованием локальных продуктов. Создает кулинарные шедевры в любых условиях.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=MikhailSolovyev",
    specialization: "Premium кейтеринг"
  }
];

const achievements = [
  { value: "2018", label: "Год основания" },
  { value: "150+", label: "Членов клуба" },
  { value: "2000+", label: "Проведенных туров" },
  { value: "25", label: "Единиц техники" },
  { value: "50+", label: "Эксклюзивных маршрутов" },
  { value: "15", label: "Профессиональных гидов" },
  { value: "99%", label: "Удовлетворенных клиентов" },
  { value: "24/7", label: "Поддержка" }
];

const timeline = [
  {
    year: "2018",
    title: "Начало пути",
    description: "Открытие клуба с флотом из 5 внедорожников и первыми 10 членами"
  },
  {
    year: "2019",
    title: "Водная экспансия",
    description: "Запуск морского направления с премиум-яхтами и катерами"
  },
  {
    year: "2020",
    title: "Воздушные приключения",
    description: "Добавление вертолетных туров и партнерство с авиационными компаниями"
  },
  {
    year: "2021",
    title: "Premium сервисы",
    description: "Запуск консьерж-сервиса и персональных программ для VIP-гостей"
  },
  {
    year: "2023",
    title: "Расширение географии",
    description: "Открытие маршрутов по всему Краснодарскому краю и Северному Кавказу"
  },
  {
    year: "2025",
    title: "Цифровая платформа",
    description: "Запуск онлайн-платформы для членов клуба с AI-консультантом"
  }
];

export function GTSAboutPage({ onNavigate }: GTSAboutPageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-black">
        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbnlvbiUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Grand Tour Sochi"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative z-10 container mx-auto px-4 lg:px-6 text-center text-white pt-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-[#91040C] mr-2" />
              <span className="text-sm tracking-wider uppercase">О клубе</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl xl:text-8xl mb-6 tracking-wider">
              GRAND TOUR
              <span className="block text-[#91040C] mt-2">SOCHI</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed">
              Премиальный клуб активного отдыха, созданный для тех, кто ценит свободу, качество и незабываемые впечатления
            </p>
          </motion.div>
        </div>
      </section>

      <main ref={containerRef}>
        {/* Values Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl mb-6 tracking-wider text-black">
                КТО МЫ И
                <span className="block text-[#91040C] mt-2">ВО ЧТО ВЕРИМ</span>
              </h2>
              <p className="text-xl text-black/70 max-w-3xl mx-auto">
                Grand Tour Sochi — это больше, чем клуб. Это сообщество людей, объединенных страстью к приключениям и стремлением к качеству
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true, amount: 0.1 }}
                >
                  <Card className="bg-white border-black/10 p-8 hover:border-[#91040C]/40 transition-all duration-300 h-full">
                    <div className="w-14 h-14 bg-[#91040C]/10 rounded-full flex items-center justify-center mb-6">
                      <value.icon className="w-7 h-7 text-[#91040C]" />
                    </div>
                    <h3 className="text-2xl text-black mb-4 tracking-wide">
                      {value.title}
                    </h3>
                    <p className="text-lg text-black/70 leading-relaxed">
                      {value.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Achievements */}
        <section className="py-16 bg-black">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05, duration: 0.3 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="text-4xl lg:text-5xl text-[#91040C] mb-2">
                    {achievement.value}
                  </div>
                  <div className="text-sm lg:text-base text-white/70 tracking-wide uppercase">
                    {achievement.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 lg:py-28 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl mb-6 tracking-wider text-black">
                НАША
                <span className="block text-[#91040C] mt-2">КОМАНДА</span>
              </h2>
              <p className="text-xl text-black/70 max-w-3xl mx-auto">
                Профессионалы своего дела, для которых каждый ваш день с GTS — это персональная ответственность
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
              {team.map((member, index) => (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Card className="bg-white border-black/10 overflow-hidden hover:border-[#91040C]/40 transition-all duration-300 h-full">
                    <div className="aspect-square overflow-hidden bg-gradient-to-br from-black/5 to-black/10">
                      <ImageWithFallback
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <Badge className="bg-[#91040C]/10 text-[#91040C] border-0 mb-3 text-xs">
                        {member.specialization}
                      </Badge>
                      <h3 className="text-xl text-black mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#91040C] mb-4 text-sm tracking-wide">
                        {member.role}
                      </p>
                      <p className="text-black/70 leading-relaxed text-sm">
                        {member.bio}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 lg:py-28 bg-[#0B0B0C]">
          <div className="container mx-auto px-4 lg:px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-6xl mb-6 tracking-wider text-white">
                ИСТОРИЯ
                <span className="block text-[#91040C] mt-2">РАЗВИТИЯ</span>
              </h2>
            </div>

            <div className="max-w-4xl mx-auto">
              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="flex gap-6 mb-12 last:mb-0"
                >
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-[#91040C] rounded-full flex items-center justify-center">
                      <span className="text-white tracking-wider">
                        {item.year}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-lg">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Quote Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 lg:px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="max-w-4xl mx-auto text-center"
            >
              <Quote className="w-12 h-12 text-[#91040C] mx-auto mb-6" />
              <blockquote className="text-2xl lg:text-4xl text-black mb-8 leading-relaxed">
                «Мы создали GTS не для того, чтобы просто сдавать технику в аренду. 
                Мы создали клуб для людей, которые понимают ценность настоящих впечатлений 
                и хотят исследовать мир без компромиссов»
              </blockquote>
              <div className="text-lg text-black/70">
                — Александр Морозов, основатель Grand Tour Sochi
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 lg:py-28 bg-black">
          <div className="container mx-auto px-4 lg:px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl lg:text-6xl text-white mb-6 tracking-wider">
                ГОТОВЫ ПРИСОЕДИНИТЬСЯ?
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10">
                Станьте частью эксклюзивного сообщества и откройте для себя новый уровень приключений
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => onNavigate({ page: "contacts" })}
                  className="bg-[#91040C] hover:bg-[#91040C]/90 text-white px-8 py-6 text-lg"
                >
                  <Award className="w-5 h-5 mr-2" />
                  Связаться с нами
                </Button>
                <Button
                  onClick={() => onNavigate({ page: "contacts" })}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  Связаться с нами
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <GTSFooter />
    </div>
  );
}
