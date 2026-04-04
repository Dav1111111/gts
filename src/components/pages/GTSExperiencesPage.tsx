import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, Phone, ChevronDown } from "lucide-react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";

interface GTSExperiencesPageProps {
  onNavigate: (route: Route) => void;
}

/* ─── Data ─── */

const SERVICES = [
  {
    id: "yachts",
    index: "01",
    category: "Водные",
    title: "Яхты",
    headline: "Открытое море\nна своих условиях",
    description:
      "Частные прогулки на яхтах и катерах вдоль черноморского побережья Сочи. Закатные круизы, дневные выходы в открытое море, романтические вечера на воде — мы подбираем судно и маршрут под ваш запрос.",
    points: [
      "Флот от 30 до 50+ футов",
      "Опытные капитаны и экипаж",
      "Питание и напитки на борту",
      "Маршруты: Сочи — Абхазия, острова, открытое море",
    ],
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1400",
    tag: "С экипажем",
  },
  {
    id: "helicopters",
    index: "02",
    category: "Воздушные",
    title: "Вертолёты",
    headline: "Сочи\nс высоты полёта",
    description:
      "Панорамные вертолётные туры над Кавказским хребтом, трансфер в горные районы и посадки на вершинах. Вид, который невозможно забыть — и который невозможно получить иначе.",
    points: [
      "Туры от 20 минут до нескольких часов",
      "Посадки на горных площадках",
      "Трансфер Сочи — Красная Поляна",
      "Частные рейсы и корпоративные маршруты",
    ],
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1400",
    tag: "Панорамные туры",
  },
  {
    id: "hotels",
    index: "03",
    category: "Размещение",
    title: "Отели",
    headline: "Лучшие адреса\nуже отобраны",
    description:
      "Мы работаем только с проверенными отелями Сочи и Красной Поляны. Специальные условия для клиентов GTS: приоритетное бронирование, апгрейды номеров и персональное сопровождение при заезде.",
    points: [
      "5★ и boutique-отели региона",
      "Переговоры с отелями — берём на себя",
      "Апгрейды и комплименты от партнёров",
      "Групповые блоки под мероприятия",
    ],
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1400",
    tag: "5★ партнёры",
  },
  {
    id: "concierge",
    index: "04",
    category: "Сервис",
    title: "Консьерж",
    headline: "Один звонок —\nвсё решено",
    description:
      "Персональный консьерж GTS берёт на себя организацию любого запроса: от столика в ресторане до частного острова. Мы работаем 24/7 и решаем задачи любой сложности — быстро и без лишних слов.",
    points: [
      "Бронирование ресторанов и мест",
      "Организация трансферов и маршрутов",
      "Поиск редких товаров и услуг",
      "Решение нестандартных задач 24/7",
    ],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1400",
    tag: "24 / 7",
  },
  {
    id: "events",
    index: "05",
    category: "События",
    title: "Мероприятия",
    headline: "Корпоративы, праздники,\nзакрытые вечера",
    description:
      "Полный цикл организации частных и корпоративных событий в Сочи. Тимбилдинги на багги в горах Абхазии, закрытые вечеринки на яхте, деловые завтраки с панорамным видом — мы делаем события, которые запоминаются.",
    points: [
      "Тимбилдинги и корпоративные выезды",
      "Закрытые частные события",
      "Подбор площадки, декор, кейтеринг",
      "Группы от 10 до 500+ человек",
    ],
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1400",
    tag: "Under the key",
  },
  {
    id: "catering",
    index: "06",
    category: "Гастрономия",
    title: "Кейтеринг",
    headline: "Шеф-повар\nв любой точке",
    description:
      "Премиальный кейтеринг от партнёрских ресторанов: пикники на вершинах, ужины на берегу моря, фуршеты на борту яхты. Меню разрабатывается под формат события и вкусовые предпочтения гостей.",
    points: [
      "Шеф-повара ресторанного уровня",
      "Доставка в горы, на воду, на природу",
      "Авторские меню под событие",
      "Алкогольное и безалкогольное сопровождение",
    ],
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1400",
    tag: "Premium food",
  },
  {
    id: "transfer",
    index: "07",
    category: "Логистика",
    title: "VIP-трансфер",
    headline: "Встреча и доставка\nкласса люкс",
    description:
      "Трансфер на автомобилях бизнес и первого класса: аэропорт, вокзал, отель, мероприятие. Встреча с табличкой, помощь с багажом, тихий профессиональный водитель — без лишних слов.",
    points: [
      "Mercedes S-class, BMW 7, Lexus LX",
      "Аэропорт, вокзал, отель — любая точка",
      "Почасовая аренда и разовые трансферы",
      "Группы: минивэны и микроавтобусы",
    ],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80&w=1400",
    tag: "Бизнес-класс",
  },
  {
    id: "guides",
    index: "08",
    category: "Экспертиза",
    title: "Частные гиды",
    headline: "Знание региона\nизнутри",
    description:
      "Персональные гиды GTS знают Сочи и Кавказ так, как не знает ни одна экскурсионная программа. Авторские маршруты, нетуристические места, история и культура — в живом разговоре, а не из микрофона.",
    points: [
      "Авторские пешие и автомобильные маршруты",
      "Гиды — жители и эксперты региона",
      "Нетуристические локации",
      "Языки: русский, английский, другие по запросу",
    ],
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1400",
    tag: "Авторские маршруты",
  },
];

/* ─── Helpers ─── */

const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.04,
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── Page ─── */

export function GTSExperiencesPage({ onNavigate }: GTSExperiencesPageProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <GTSNavigationHeader onNavigate={onNavigate} />
      <ExperiencesHero />
      <ServicesIndex onNavigate={onNavigate} />
      {SERVICES.map((svc, i) => (
        <ServiceSection key={svc.id} svc={svc} index={i} onNavigate={onNavigate} />
      ))}
      <ContactSection onNavigate={onNavigate} />
      <GTSFooter />
    </div>
  );
}

/* ─── Hero ─── */

function ExperiencesHero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[70vh] flex items-end overflow-hidden"
      style={{ paddingBottom: "10vh" }}>
      <div style={grainStyle} />

      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1920"
          alt="GTS Premium Experiences Сочи"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" />

      <motion.div
        className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
            Премиальные услуги · Сочи
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="font-black uppercase leading-none text-white"
            style={{ fontSize: "clamp(44px, 7vw, 110px)", letterSpacing: "-0.025em" }}
          >
            Всё лучшее
            <br />
            <span style={{ color: "#91040C" }}>в Сочи</span>
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-white/40 max-w-lg leading-relaxed"
          style={{ fontSize: 15 }}
        >
          GTS — агрегатор премиальных впечатлений. Мы отобрали лучших партнёров
          в каждой категории и несём ответственность за качество каждой услуги.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-10"
          style={{ color: "rgba(255,255,255,0.2)" }}
        >
          <ChevronDown size={20} className="animate-bounce" />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ─── Sticky nav index ─── */

function ServicesIndex({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <nav
      className="px-6 md:px-12 py-4 hidden lg:block"
      style={{
        background: "rgba(11,11,12,0.97)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      <div className="max-w-[1600px] mx-auto flex items-center gap-8 overflow-x-auto">
        {SERVICES.map((svc) => (
          <a
            key={svc.id}
            href={`#${svc.id}`}
            className="flex-shrink-0 text-[10px] uppercase tracking-[0.3em] text-white/30 hover:text-white/80 transition-colors duration-200 font-semibold"
          >
            {svc.title}
          </a>
        ))}
        <button
          onClick={() => onNavigate({ page: "contacts" })}
          className="flex-shrink-0 flex items-center gap-1.5 text-[10px] uppercase tracking-[0.3em] font-semibold ml-auto"
          style={{ color: "#91040C" }}
        >
          Связаться <ArrowRight size={10} />
        </button>
      </div>
    </nav>
  );
}

/* ─── Individual service section ─── */

function ServiceSection({
  svc,
  index,
  onNavigate,
}: {
  svc: typeof SERVICES[number];
  index: number;
  onNavigate: (r: Route) => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.06, 1.0]);
  const isEven = index % 2 === 0;

  return (
    <section
      id={svc.id}
      ref={ref}
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={grainStyle} />

      <div className={`flex flex-col ${isEven ? "lg:flex-row" : "lg:flex-row-reverse"} min-h-[580px]`}>

        {/* Image */}
        <div className="relative lg:w-[48%] overflow-hidden" style={{ minHeight: 320 }}>
          <motion.img
            src={svc.image}
            alt={`${svc.title} в Сочи — GTS`}
            className="absolute inset-0 w-full h-full object-cover"
            style={{ scale: imgScale, filter: "brightness(0.6)" }}
          />
          <div className={`absolute inset-0 ${isEven
            ? "bg-gradient-to-r from-transparent to-[#0B0B0C]"
            : "bg-gradient-to-l from-transparent to-[#0B0B0C]"}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,12,0.5)] via-transparent to-transparent" />

          {/* Big index watermark */}
          <div
            className="absolute font-black text-white select-none pointer-events-none leading-none"
            style={{
              fontSize: "clamp(100px, 14vw, 180px)",
              opacity: 0.06,
              bottom: -10,
              [isEven ? "right" : "left"]: -8,
            }}
          >
            {svc.index}
          </div>

          {/* Tag */}
          <div className="absolute top-6 left-6">
            <span
              className="px-3 py-1.5 text-[9px] uppercase tracking-[0.3em] font-bold"
              style={{
                color: "#91040C",
                border: "1px solid rgba(145,4,12,0.4)",
              }}
            >
              {svc.tag}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative z-10 lg:w-[52%] flex flex-col justify-center px-8 md:px-14 lg:px-16 py-16 lg:py-20">

          <motion.div
            initial={{ opacity: 0, x: isEven ? -16 : 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="text-[9px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
              {svc.index}
            </span>
            <div className="w-6 h-px" style={{ background: "rgba(145,4,12,0.5)" }} />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-semibold">
              {svc.category}
            </span>
          </motion.div>

          <div className="overflow-hidden mb-5">
            <motion.h2
              initial={{ y: "100%" }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
              className="font-black uppercase leading-tight text-white"
              style={{ fontSize: "clamp(28px, 3.2vw, 50px)", letterSpacing: "-0.02em", whiteSpace: "pre-line" }}
            >
              {svc.headline}
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.18 }}
            className="text-white/40 leading-relaxed mb-7"
            style={{ fontSize: 14, maxWidth: 460 }}
          >
            {svc.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col gap-2.5 mb-9"
          >
            {svc.points.map((pt, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-1 h-1 shrink-0 mt-[7px]" style={{ background: "#91040C" }} />
                <span className="text-white/45 leading-relaxed" style={{ fontSize: 13 }}>{pt}</span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.32 }}
          >
            <button
              onClick={() => onNavigate({ page: "contacts" })}
              className="inline-flex items-center gap-3 py-3.5 px-7 text-white text-xs uppercase tracking-widest font-bold transition-colors duration-200"
              style={{ background: "#91040C" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
            >
              Узнать цену
              <ArrowRight size={13} />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Bottom contact section ─── */

function ContactSection({ onNavigate }: { onNavigate: (r: Route) => void }) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden py-28 md:py-40 px-6 md:px-12"
      style={{ background: "#0B0B0C", borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={grainStyle} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 60% at 50% 100%, rgba(145,4,12,0.07), transparent)" }}
      />

      <div className="max-w-[900px] mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
            Не нашли нужное
          </span>
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
        </motion.div>

        <div className="overflow-hidden mb-5">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-tight text-white"
            style={{ fontSize: "clamp(34px, 5vw, 68px)", letterSpacing: "-0.02em" }}
          >
            Расскажите нам
            <br />
            <span style={{ color: "#91040C" }}>о вашем запросе</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.18 }}
          className="text-white/35 leading-relaxed mb-12 max-w-md mx-auto"
          style={{ fontSize: 14 }}
        >
          Мы работаем с нестандартными запросами. Если нужной услуги нет в списке —
          напишите нам, мы найдём решение.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.26 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => onNavigate({ page: "contacts" })}
            className="inline-flex items-center gap-3 py-4 px-10 text-white text-xs uppercase tracking-widest font-bold transition-colors duration-200"
            style={{ background: "#91040C" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
          >
            Написать нам
            <ArrowRight size={13} />
          </button>

          <a
            href="tel:+78625550123"
            className="inline-flex items-center gap-2.5 py-4 px-8 text-white/45 hover:text-white/70 transition-colors text-xs uppercase tracking-[0.25em] font-semibold"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <Phone size={13} />
            +7 (862) 555-0123
          </a>
        </motion.div>
      </div>
    </section>
  );
}
