import { useState, useMemo } from "react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import {
  Clock, Users, MapPin, Calendar, Check,
  ArrowLeft, ArrowRight, Mountain, Route as RouteIcon,
  Sun, Coffee, Utensils, Tent, Camera, Fuel,
  Shield, ChevronDown, ChevronUp, MessageCircle,
  Phone, Send, Compass, Car, Flag
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useGTSExpeditions } from "../../contexts/GTSExpeditionsContext";

interface GTSExperienceDetailPageProps {
  experienceId: string;
  onNavigate: (route: Route) => void;
}

/* ═══════════════════════════════════════════════
   Expedition Detail View
   ═══════════════════════════════════════════════ */

export function GTSExperienceDetailPage({ experienceId, onNavigate }: GTSExperienceDetailPageProps) {
  const { getExpeditionById } = useGTSExpeditions();
  const exp = useMemo(() => getExpeditionById(experienceId), [experienceId, getExpeditionById]);
  
  const [activeDay, setActiveDay] = useState(1);
  const [activeGalleryIndex, setActiveGalleryIndex] = useState(0);

  if (!exp) {
    return (
      <div className="min-h-screen bg-[#0B0B0C] flex flex-col items-center justify-center p-10 text-center">
        <h2 className="text-white text-3xl mb-4">Экспедиция не найдена</h2>
        <button 
          onClick={() => onNavigate({ type: "experiences" })}
          className="text-[#91040C] uppercase tracking-widest text-sm border-b border-[#91040C] pb-1"
        >
          Вернуться к списку
        </button>
      </div>
    );
  }

  const allImages = [exp.heroImage, ...exp.galleryImages];

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white selection:bg-[#91040C] selection:text-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      {/* ── HERO SECTION ── */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          className="absolute inset-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <ImageWithFallback 
            src={exp.heroImage} 
            alt={exp.title} 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        {/* Gradients */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,11,12,0.4) 0%, rgba(11,11,12,0) 40%, rgba(11,11,12,0) 60%, rgba(11,11,12,0.9) 100%)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, rgba(11,11,12,0.8) 0%, rgba(11,11,12,0) 50%)" }} />

        <div className="absolute inset-0 flex flex-col justify-end pb-16 lg:pb-24 px-6 lg:px-20 max-w-[1440px] mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-[#91040C] text-white text-[10px] uppercase tracking-[0.2em] px-3 py-1 font-medium">
                {exp.tourType}
              </span>
              <span className="text-white/50 text-[10px] uppercase tracking-[0.2em]">
                {exp.region}
              </span>
            </div>
            
            <h1 className="text-white mb-4 leading-tight" style={{ fontSize: "clamp(48px, 8vw, 120px)", letterSpacing: "0.1em", fontWeight: 700 }}>
              {exp.title}
            </h1>
            
            <p className="text-white/60 mb-10 max-w-[600px] leading-relaxed" style={{ fontSize: "clamp(16px, 1.5vw, 20px)", letterSpacing: "0.05em" }}>
              {exp.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-8 lg:gap-12 mb-12 py-8 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <span className="text-white/30 uppercase text-[10px] tracking-widest">Длительность</span>
                <span className="text-white font-light text-xl tracking-wide">{exp.totalDays} дней</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 uppercase text-[10px] tracking-widest">Расстояние</span>
                <span className="text-white font-light text-xl tracking-wide">{exp.distance}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 uppercase text-[10px] tracking-widest">Сложность</span>
                <span className="text-white font-light text-xl tracking-wide">{exp.difficulty}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/30 uppercase text-[10px] tracking-widest">Цена</span>
                <span className="text-white font-light text-xl tracking-wide">от {exp.price} ₽</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/40 to-white/0" />
        </motion.div>
      </section>

      {/* ── MAIN CONTENT GRID ── */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-20 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* Left Column: Description & Program */}
          <div className="lg:col-span-7 space-y-24">
            
            {/* About */}
            <section>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-px bg-[#91040C]" />
                <h2 className="text-white uppercase tracking-[0.3em] text-sm font-medium">Об экспедиции</h2>
              </div>
              <p className="text-white/70 leading-relaxed text-lg lg:text-xl font-light italic mb-8">
                {exp.description}
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 py-10 border-y border-white/5">
                <div>
                  <h3 className="text-white/30 uppercase text-[10px] tracking-widest mb-4">Основные моменты</h3>
                  <ul className="space-y-3">
                    {exp.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="w-4 h-4 text-[#91040C] mt-1 flex-shrink-0" />
                        <span className="text-white/80 text-sm leading-relaxed">{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="text-white/30 uppercase text-[10px] tracking-widest mb-4">Транспорт</h3>
                  <div className="flex items-center gap-4 p-4 bg-white/5 border border-white/5">
                    <Car className="w-8 h-8 text-white/40" />
                    <div>
                      <div className="text-white text-sm font-medium">{exp.transport}</div>
                      <div className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">Подготовленный внедорожник</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Program */}
            <section>
              <div className="flex items-center gap-4 mb-12">
                <div className="w-12 h-px bg-[#91040C]" />
                <h2 className="text-white uppercase tracking-[0.3em] text-sm font-medium">Программа маршрута</h2>
              </div>

              <div className="space-y-4">
                {exp.program.map((day) => (
                  <div 
                    key={day.day}
                    className="border border-white/5 overflow-hidden transition-all duration-300"
                    style={{ background: activeDay === day.day ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)" }}
                  >
                    <button 
                      className="w-full flex items-center justify-between p-6 text-left"
                      onClick={() => setActiveDay(activeDay === day.day ? 0 : day.day)}
                      style={{ background: "rgba(0,0,0,0)" }}
                    >
                      <div className="flex items-center gap-6">
                        <span className="text-[#91040C] text-2xl font-light tracking-tighter w-12">
                          Day {day.day < 10 ? `0${day.day}` : day.day}
                        </span>
                        <h3 className="text-white text-lg font-medium tracking-wide">{day.title}</h3>
                      </div>
                      <ChevronDown className={`w-5 h-5 text-white/20 transition-transform duration-300 ${activeDay === day.day ? 'rotate-180' : ''}`} />
                    </button>
                    
                    <AnimatePresence>
                      {activeDay === day.day && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <div className="px-6 pb-8 pt-2 ml-18 space-y-6">
                            <p className="text-white/50 leading-relaxed text-sm max-w-[540px]">
                              {day.description}
                            </p>
                            {day.distance && (
                              <div className="flex items-center gap-2 text-[#91040C]">
                                <Compass className="w-4 h-4" />
                                <span className="text-xs uppercase tracking-widest font-medium">{day.distance} в пути</span>
                              </div>
                            )}
                            <div className="flex flex-wrap gap-2">
                              {day.highlights.map((h, i) => (
                                <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 text-white/40 text-[10px] uppercase tracking-widest">
                                  {h}
                                </span>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column: Booking & Details */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-8">
              
              {/* Booking Card */}
              <div className="bg-[#121214] border border-white/5 p-8 lg:p-10">
                <div className="mb-8">
                  <div className="text-white/30 uppercase text-[10px] tracking-[0.2em] mb-2">Стоимость участия</div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-white text-4xl font-light tracking-tight">{exp.price} ₽</span>
                    <span className="text-white/20 text-sm">за человека</span>
                  </div>
                </div>

                <div className="space-y-6 mb-10">
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-3 text-white/40">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Даты</span>
                    </div>
                    <span className="text-white text-sm font-medium">{exp.dateRange}</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-3 text-white/40">
                      <Users className="w-4 h-4" />
                      <span className="text-sm">Группа</span>
                    </div>
                    <span className="text-white text-sm font-medium">до {exp.groupSize} человек</span>
                  </div>
                  <div className="flex items-center justify-between py-3 border-b border-white/5">
                    <div className="flex items-center gap-3 text-white/40">
                      <Flag className="w-4 h-4" />
                      <span className="text-sm">Мест осталось</span>
                    </div>
                    <span className={`text-sm font-medium ${exp.spotsLeft <= 2 ? 'text-[#91040C]' : 'text-green-500'}`}>
                      {exp.spotsLeft > 0 ? `${exp.spotsLeft} места` : "Мест нет"}
                    </span>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02, background: "#6d0309" }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#91040C] text-white py-5 uppercase tracking-[0.2em] text-xs font-bold transition-colors"
                >
                  Забронировать место
                </motion.button>
                
                <p className="text-center text-white/20 text-[10px] mt-6 leading-relaxed">
                  Нажимая кнопку, вы соглашаетесь с условиями оферты и правилами клуба GTS
                </p>
              </div>

              {/* Conditions Tabs */}
              <div className="space-y-4">
                <div className="bg-white/5 border border-white/5 p-6">
                  <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4 flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-500" /> В стоимость включено
                  </h4>
                  <ul className="space-y-2">
                    {exp.included.map((item, i) => (
                      <li key={i} className="text-white/40 text-xs leading-relaxed flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-[#91040C] mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-white/5 border border-white/5 p-6 opacity-60">
                  <h4 className="text-white text-xs uppercase tracking-widest font-bold mb-4">Не включено</h4>
                  <ul className="space-y-2">
                    {exp.notIncluded.map((item, i) => (
                      <li key={i} className="text-white/40 text-xs leading-relaxed flex items-start gap-2">
                        <div className="w-1 h-1 rounded-full bg-white/10 mt-1.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── GALLERY SECTION ── */}
      <section className="bg-[#121214] py-24 lg:py-32 overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-20 mb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-px bg-[#91040C]" />
            <h2 className="text-white uppercase tracking-[0.3em] text-sm font-medium">Галерея экспедиции</h2>
          </div>
          <p className="text-white/40 text-sm tracking-wide">Атмосфера наших путешествий в объективе команды</p>
        </div>

        <div className="flex overflow-x-auto pb-10 gap-4 px-6 lg:px-20 no-scrollbar snap-x">
          {allImages.map((img, i) => (
            <motion.div 
              key={i}
              className="relative flex-shrink-0 w-[300px] lg:w-[450px] aspect-[4/5] overflow-hidden snap-start group"
              whileHover={{ scale: 0.98 }}
              transition={{ duration: 0.4 }}
            >
              <ImageWithFallback src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/0 transition-colors duration-700" />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── VEHICLE RENTAL BLOCK — caucasus-discovery style ── */}
      <VehicleRentalBlock />

      <GTSFooter onNavigate={onNavigate} />
    </div>
  );
}

/* ═══════ Vehicle Rental Block — caucasus-discovery style ═══════ */
const VEHICLES = [
  {
    id: "talon-2",
    name: "Honda Talon 1000R",
    seats: 2,
    tagline: "2-местный Sport UTV",
    image: "https://images.unsplash.com/photo-1681857239369-15ebd70bdad9?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Двигатель", value: "999 см³, 2-цилиндровый" },
      { label: "Мощность", value: "104 л.с." },
      { label: "Трансмиссия", value: "6-ступ. DCT автомат" },
      { label: "Подвеска", value: "FOX Podium 2.5" },
      { label: "Колёсная база", value: "2 311 мм" },
      { label: "Клиренс", value: "330 мм" },
      { label: "Привод", value: "Полный 4WD" },
      { label: "Масса", value: "635 кг" },
    ],
    pricePerDay: "15 000",
    pricePer3Days: "40 000",
    pricePerWeek: "85 000",
    included: [
      "Шлемы и очки",
      "4-точечные ремни безопасности",
      "Рация для связи с группой",
      "Инструктаж по управлению",
      "Страховка КАСКО",
      "Канистра запасного топлива",
      "Техническая поддержка 24/7",
    ],
  },
  {
    id: "talon-4",
    name: "Honda Talon 1000X-4",
    seats: 4,
    tagline: "4-местный Family UTV",
    image: "https://images.unsplash.com/photo-1639244170226-d91781fb4952?auto=format&fit=crop&q=80&w=1200",
    specs: [
      { label: "Двигатель", value: "999 см³, 2-цилиндровый" },
      { label: "Мощность", value: "104 л.с." },
      { label: "Трансмиссия", value: "6-ступ. DCT автомат" },
      { label: "Подвеска", value: "FOX Podium 2.5" },
      { label: "Колёсная база", value: "2 971 мм" },
      { label: "Клиренс", value: "330 мм" },
      { label: "Привод", value: "Полный 4WD" },
      { label: "Масса", value: "748 кг" },
    ],
    pricePerDay: "22 000",
    pricePer3Days: "58 000",
    pricePerWeek: "120 000",
    included: [
      "Шлемы и очки × 4",
      "4-точечные ремни × 4 места",
      "Рация для связи с группой",
      "Инструктаж по управлению",
      "Страховка КАСКО",
      "Канистра запасного топлива",
      "Место для багажа",
    ],
  },
];

const RENTAL_STEPS = [
  { num: "01", title: "Оставьте заявку", description: "Свяжитесь с нами через WhatsApp или форму на сайте. Укажите даты, количество человек и предпочтительную модель." },
  { num: "02", title: "Согласование", description: "Менеджер подберёт оптимальный вариант, расскажет о маршруте и условиях. Бронирование — предоплата 30%." },
  { num: "03", title: "Получение техники", description: "В день старта проводим инструктаж по управлению UTV, выдаём экипировку и рации. Брифинг по маршруту и ТБ." },
  { num: "04", title: "Приключение", description: "Проходите маршрут самостоятельно или в составе группы с инструктором. Техподдержка на связи 24/7." },
];

const RENTAL_CONDITIONS = [
  { icon: Calendar, title: "Минимальный срок", value: "от 1 дня", note: "Скидки от 3 дней" },
  { icon: Users, title: "Возраст водителя", value: "от 21 года", note: "Стаж от 2 лет" },
  { icon: Shield, title: "Залог", value: "50 000 ₽", note: "Возврат при сдаче" },
  { icon: Fuel, title: "Топливо", value: "Включено", note: "Полный бак + канистра" },
  { icon: Clock, title: "Выдача / возврат", value: "09:00 / 19:00", note: "В точке старта" },
  { icon: Car, title: "Пробег", value: "Без ограничений", note: "По маршруту экспедиции" },
];

const RENTAL_FAQ = [
  { q: "Нужен ли опыт вождения UTV?", a: "Нет, перед стартом мы проводим подробный инструктаж (30–40 минут) по управлению, прохождению бродов, спусков и подъёмов. Трансмиссия автоматическая — управление интуитивное." },
  { q: "Что входит в стоимость аренды?", a: "Аренда UTV, полная экипировка (шлемы, очки, перчатки), страховка КАСКО, рация, канистра топлива, инструктаж. Не входит: питание, проживание, штрафы за повреждения по вине арендатора." },
  { q: "Можно ли арендовать UTV без участия в экспедиции?", a: "Да, вы можете арендовать технику для самостоятельных поездок. Мы предоставим рекомендованные маршруты и GPS-трек. Однако за пределами маршрута техподдержка ограничена." },
  { q: "Что будет в случае поломки на маршруте?", a: "Наша техническая группа сопровождения находится на связи и готова выехать к вам. В случае серьёзной поломки предоставляем замену техники. Страховка покрывает механические неисправности." },
  { q: "Как работает залог?", a: "Залог 50 000 ₽ вносится при получении техники наличными или переводом. При возврате UTV в исправном состоянии залог возвращается в полном объёме в течение 15 минут." },
];

function VehicleRentalBlock() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <section className="relative overflow-hidden" style={{ background: "#0B0B0C" }}>
      {/* ── HERO BANNER ── */}
      <div className="relative w-full overflow-hidden" style={{ height: "clamp(320px, 45vw, 600px)" }}>
        <ImageWithFallback
          src="https://images.unsplash.com/photo-1602574763108-7c4434fea82d?auto=format&fit=crop&q=80&w=1920"
          alt="Аренда UTV Honda Talon"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(11,11,12,0.3) 0%, rgba(11,11,12,0.7) 60%, #0B0B0C 100%)" }} />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-px" style={{ background: "#91040C" }} />
            <span className="uppercase tracking-[0.25em] text-white/50" style={{ fontSize: 12 }}>Аренда техники</span>
            <div className="w-10 h-px" style={{ background: "#91040C" }} />
          </div>
          <h2 className="text-white mb-4" style={{ fontSize: "clamp(32px, 6vw, 72px)", letterSpacing: "0.15em", lineHeight: 1.1, fontWeight: 700 }}>
            HONDA TALON
          </h2>
          <p className="text-white/60 max-w-[580px]" style={{ fontSize: "clamp(14px, 1.8vw, 18px)", lineHeight: 1.7, fontWeight: 300 }}>
            Мощные Sport UTV для покорения самых сложных маршрутов Сочи и Кавказа.<br className="hidden sm:block" />
            Профессиональная техника, полная экипировка и сопровождение.
          </p>
        </div>
      </div>

      {/* ── VEHICLE CATALOG — horizontal cards ── */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-16 lg:py-24 space-y-12 lg:space-y-16">
        {VEHICLES.map((v) => (
          <motion.div
            key={v.id}
            className="group overflow-hidden"
            style={{ background: "#121214", border: "1px solid rgba(255,255,255,0.06)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Top: Image left + Info right */}
            <div className="flex flex-col lg:flex-row">
              <div className="relative lg:w-1/2 overflow-hidden" style={{ minHeight: 400 }}>
                <ImageWithFallback src={v.image} alt={v.name} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105 absolute inset-0" />
                <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to bottom, rgba(18,18,20,0) 50%, rgba(18,18,20,0.95) 100%)" }} />
                <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, rgba(18,18,20,0) 60%, rgba(18,18,20,1) 100%)" }} />
                <div className="absolute top-6 left-6 px-4 py-2 uppercase tracking-[0.2em] flex items-center gap-2 font-bold" style={{ fontSize: 10, background: "rgba(145,4,12,1)", color: "#fff", backdropFilter: "blur(12px)" }}>
                  <Users className="w-3.5 h-3.5" />
                  {v.seats}-местный
                </div>
              </div>
              <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
                <div className="text-[#91040C] uppercase tracking-[0.3em] mb-3 font-bold" style={{ fontSize: 10 }}>Premium Rental</div>
                <h3 className="text-white mb-3" style={{ fontSize: "clamp(24px, 3vw, 38px)", letterSpacing: "0.08em", fontWeight: 700 }}>{v.name}</h3>
                <p className="text-white/50 mb-8 max-w-[400px]" style={{ fontSize: 15, lineHeight: 1.7, fontWeight: 300 }}>{v.tagline}. Полностью подготовлен к горным условиям Кавказа.</p>
                
                {/* Price cards */}
                <div className="grid grid-cols-3 gap-4 mb-10">
                  {[
                    { label: "1 день", price: v.pricePerDay },
                    { label: "3 дня", price: v.pricePer3Days },
                    { label: "7 дней", price: v.pricePerWeek },
                  ].map((p) => (
                    <div key={p.label} className="text-center py-5 px-2 rounded-sm" style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                      <div className="text-white/30 uppercase tracking-[0.2em] mb-2 font-medium" style={{ fontSize: 8 }}>{p.label}</div>
                      <div className="text-white font-light" style={{ fontSize: 24, letterSpacing: "-0.02em" }}>{p.price}</div>
                      <div className="text-white/20 uppercase tracking-widest mt-1" style={{ fontSize: 9 }}>руб</div>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.a
                    href={`https://wa.me/79881234567?text=Хочу арендовать ${v.name}`}
                    target="_blank" rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-3 py-5 text-white uppercase tracking-[0.2em] font-bold"
                    style={{ fontSize: 11, background: "#91040C", border: "1px solid #91040C", textDecoration: "none", cursor: "pointer" }}
                    whileHover={{ background: "#6d0309", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Бронировать
                  </motion.a>
                  <motion.a
                    href="tel:+79881234567"
                    className="flex-1 flex items-center justify-center gap-3 py-5 uppercase tracking-[0.2em] font-bold"
                    style={{ fontSize: 11, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(0,0,0,0)", textDecoration: "none", cursor: "pointer", color: "rgba(255,255,255,0.8)" }}
                    whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)", scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Phone className="w-4 h-4" />
                    Позвонить
                  </motion.a>
                </div>
              </div>
            </div>

            {/* Bottom: Specs table + Included list */}
            <div className="border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="p-8 lg:p-12">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-[#91040C]" />
                    <div className="text-white/40 uppercase tracking-[0.25em] font-bold" style={{ fontSize: 9 }}>Спецификации</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12">
                    {v.specs.map((s, i) => (
                      <div key={s.label} className="flex items-center justify-between py-3.5 border-b border-white/5">
                        <span className="text-white/30 font-medium" style={{ fontSize: 12 }}>{s.label}</span>
                        <span className="text-white/70 font-light" style={{ fontSize: 12 }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="p-8 lg:p-12 lg:border-l" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-6 h-px bg-[#91040C]" />
                    <div className="text-white/40 uppercase tracking-[0.25em] font-bold" style={{ fontSize: 9 }}>Включено в аренду</div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {v.included.map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: "rgba(145,4,12,0.15)" }}>
                          <Check className="w-3 h-3" style={{ color: "#91040C" }} />
                        </div>
                        <span className="text-white/60 font-light" style={{ fontSize: 13 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── HOW IT WORKS ── */}
      <div style={{ background: "#121214" }}>
        <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div className="text-center mb-16 lg:mb-24">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-px" style={{ background: "#91040C" }} />
              <span className="uppercase tracking-[0.3em] text-[#91040C] font-bold" style={{ fontSize: 10 }}>GTS Service</span>
              <div className="w-10 h-px" style={{ background: "#91040C" }} />
            </div>
            <h3 className="text-white" style={{ fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "0.1em", fontWeight: 700 }}>ПРОЦЕСС АРЕНДЫ</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RENTAL_STEPS.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative p-8 lg:p-10 flex flex-col items-center text-center group"
                style={{ background: "#17181A", border: "1px solid rgba(255,255,255,0.04)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ borderColor: "rgba(145,4,12,0.3)" }}
              >
                <div className="mb-6 font-bold transition-colors group-hover:text-[#91040C]" style={{ fontSize: 56, color: "rgba(145,4,12,0.2)", lineHeight: 1, letterSpacing: "-0.05em" }}>{step.num}</div>
                <h4 className="text-white mb-4 uppercase tracking-[0.15em] font-bold" style={{ fontSize: 14 }}>{step.title}</h4>
                <p className="text-white/40 font-light" style={{ fontSize: 14, lineHeight: 1.8 }}>{step.description}</p>
                {i < RENTAL_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px" style={{ background: "rgba(255,255,255,0.05)" }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── RENTAL CONDITIONS ── */}
      <div className="max-w-[1320px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
        <div className="text-center mb-16 lg:mb-24">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-10 h-px" style={{ background: "#91040C" }} />
            <span className="uppercase tracking-[0.3em] text-[#91040C] font-bold" style={{ fontSize: 10 }}>Information</span>
            <div className="w-10 h-px" style={{ background: "#91040C" }} />
          </div>
          <h3 className="text-white" style={{ fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "0.1em", fontWeight: 700 }}>УСЛОВИЯ И ПРАВИЛА</h3>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {RENTAL_CONDITIONS.map((cond) => (
            <motion.div 
              key={cond.title} 
              className="p-8 lg:p-10" 
              style={{ background: "#121214", border: "1px solid rgba(255,255,255,0.04)" }}
              whileHover={{ y: -5, background: "#17181A", borderColor: "rgba(255,255,255,0.08)" }}
            >
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ background: "rgba(145,4,12,0.12)" }}>
                <cond.icon className="w-6 h-6" style={{ color: "#91040C" }} />
              </div>
              <div className="text-white/30 uppercase tracking-[0.25em] mb-3 font-bold" style={{ fontSize: 9 }}>{cond.title}</div>
              <div className="text-white mb-2 font-light" style={{ fontSize: 24, letterSpacing: "-0.01em" }}>{cond.value}</div>
              <div className="text-white/20 font-medium italic" style={{ fontSize: 13 }}>{cond.note}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FAQ ── */}
      <div style={{ background: "#121214" }}>
        <div className="max-w-[960px] mx-auto px-6 lg:px-10 py-20 lg:py-32">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div className="w-10 h-px" style={{ background: "#91040C" }} />
              <span className="uppercase tracking-[0.3em] text-[#91040C] font-bold" style={{ fontSize: 10 }}>Support</span>
              <div className="w-10 h-px" style={{ background: "#91040C" }} />
            </div>
            <h3 className="text-white" style={{ fontSize: "clamp(26px, 4vw, 42px)", letterSpacing: "0.1em", fontWeight: 700 }}>ЧАСТЫЕ ВОПРОСЫ</h3>
          </div>
          <div className="space-y-4">
            {RENTAL_FAQ.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} style={{ background: "#17181A", border: "1px solid rgba(255,255,255,0.05)" }}>
                  <button
                    className="w-full flex items-center justify-between p-6 lg:p-8 text-left group"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    style={{ background: "rgba(0,0,0,0)", cursor: "pointer" }}
                  >
                    <span className="text-white/80 pr-6 group-hover:text-white transition-colors" style={{ fontSize: 16, fontWeight: 500 }}>{faq.q}</span>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0">
                      <ChevronDown className="w-6 h-6 text-white/20 group-hover:text-[#91040C] transition-colors" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 lg:px-8 pb-8 lg:pb-10 pt-0 text-white/50 leading-relaxed font-light" style={{ fontSize: 15 }}>
                          <div className="w-full h-px bg-white/5 mb-6" />
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── FINAL CTA ── */}
      <section className="relative py-24 lg:py-40 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <ImageWithFallback 
            src="https://images.unsplash.com/photo-1698790723006-b19a91e35702?auto=format&fit=crop&q=80&w=1920" 
            alt="GTS CTA" 
            className="w-full h-full object-cover grayscale opacity-20"
          />
          <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(145,4,12,0.1) 0%, rgba(11,11,12,1) 80%)" }} />
        </div>
        
        <div className="relative z-10 max-w-[1320px] mx-auto px-6 text-center">
          <h2 className="text-white mb-8 leading-tight uppercase" style={{ fontSize: "clamp(32px, 5vw, 64px)", letterSpacing: "0.1em", fontWeight: 700 }}>
            ГОТОВЫ К<br />ПРИКЛЮЧЕНИЮ?
          </h2>
          <p className="text-white/50 mb-12 max-w-[600px] mx-auto leading-relaxed" style={{ fontSize: 18, fontWeight: 300 }}>
            Забронируйте участие в экспедиции или арендуйте багги уже сегодня. Наши менеджеры помогут подобрать идеальный маршрут.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 bg-[#91040C] text-white uppercase tracking-[0.2em] font-bold text-xs"
            >
              Связаться с нами
            </motion.button>
            <motion.a
              href="https://wa.me/79881234567?text=Вопрос по аренде Honda Talon"
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 px-12 py-5 text-white uppercase tracking-[0.2em] font-bold text-xs"
              style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(0,0,0,0)", textDecoration: "none" }}
              whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.4)" }}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </motion.a>
          </div>
        </div>
      </section>
    </section>
  );
}
