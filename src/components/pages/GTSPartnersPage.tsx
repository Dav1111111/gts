import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, MessageCircle, Send, Mail } from "lucide-react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";

interface GTSPartnersPageProps {
  onNavigate: (route: Route) => void;
}

/* ─── Data ─── */

const SECTORS = [
  { index: "01", name: "Яхты и катера", desc: "Аренда флота, морские прогулки, яхт-туры вдоль черноморского побережья.", tag: "Водный туризм" },
  { index: "02", name: "Вертолёты и авиация", desc: "Панорамные туры, трансфер в горы, посадки на вершинах Кавказа.", tag: "Воздушный туризм" },
  { index: "03", name: "Отели и виллы", desc: "Бутик-отели, апартаменты, горные шале в Сочи и Красной Поляне.", tag: "Размещение" },
  { index: "04", name: "Рестораны и гастрономия", desc: "Премиальные рестораны, кейтеринг, шеф-повара для выездных событий.", tag: "Гастрономия" },
  { index: "05", name: "Спа и велнес", desc: "Термальные комплексы, частные SPA, wellness-программы для гостей.", tag: "Здоровье и отдых" },
  { index: "06", name: "Гиды и экскурсии", desc: "Авторские маршруты, нетуристические локации, знание региона изнутри.", tag: "Экспертиза" },
  { index: "07", name: "Мероприятия и площадки", desc: "Лаунжи, яхты, горные площадки для корпоративных и частных событий.", tag: "События" },
  { index: "08", name: "Транспорт и трансфер", desc: "VIP-трансферы, аренда автомобилей бизнес-класса, групповые перевозки.", tag: "Логистика" },
];

const BENEFITS = [
  {
    num: "1",
    title: "Готовая аудитория",
    desc: "Доступ к базе клиентов Grand Tour Spirit — людей с высоким запросом на премиальный отдых и экспедиции.",
  },
  {
    num: "2",
    title: "Без холодных продаж",
    desc: "Мы берём на себя коммуникацию, бронирование и сопровождение. Партнёр получает готового клиента.",
  },
  {
    num: "3",
    title: "Совместный маркетинг",
    desc: "Размещение в каталоге услуг, упоминания в историях, участие в закрытых клубных мероприятиях.",
  },
  {
    num: "4",
    title: "Гибкие условия",
    desc: "Комиссионная модель или фиксированное партнёрство — выбираем формат под специфику бизнеса.",
  },
];

const CONTACT_OPTIONS = [
  {
    id: "telegram",
    label: "Telegram",
    sub: "Быстрый ответ",
    icon: Send,
    color: "#2AABEE",
    action: () => window.open("https://t.me/grandtourspirit", "_blank"),
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    sub: "Деловые переговоры",
    icon: MessageCircle,
    color: "#25D366",
    action: () => window.open("https://wa.me/78625550123", "_blank"),
  },
  {
    id: "email",
    label: "E-mail",
    sub: "partners@grandtourspirit.ru",
    icon: Mail,
    color: "rgba(255,255,255,0.7)",
    action: () => window.open("mailto:partners@grandtourspirit.ru"),
  },
];

const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.04,
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── Page ─── */

export function GTSPartnersPage({ onNavigate }: GTSPartnersPageProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <GTSNavigationHeader onNavigate={onNavigate} />
      <PartnersHero onNavigate={onNavigate} />
      <PhilosophySection />
      <SectorsSection />
      <BenefitsSection />
      <ContactSection onNavigate={onNavigate} />
      <GTSFooter />
    </div>
  );
}

/* ─── Hero ─── */

function PartnersHero({ onNavigate }: { onNavigate: (r: Route) => void }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative min-h-[72vh] flex items-end overflow-hidden" style={{ paddingBottom: "10vh" }}>
      <div style={grainStyle} />

      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <img
          src="https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&q=80&w=1920"
          alt="Grand Tour Spirit — партнёрам"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.25)" }}
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/30 to-transparent" />

      <motion.div
        className="relative z-10 px-6 md:px-12 max-w-[1600px] mx-auto w-full"
        style={{ opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="flex items-center gap-3 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
            Grand Tour Spirit · Партнёрство
          </span>
        </motion.div>

        <div className="overflow-hidden mb-6">
          <motion.h1
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            className="font-black uppercase leading-none text-white"
            style={{ fontSize: "clamp(48px, 7.5vw, 120px)", letterSpacing: "-0.025em" }}
          >
            Партнёрам
          </motion.h1>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-white/40 max-w-xl leading-relaxed mb-10"
          style={{ fontSize: 15 }}
        >
          Мы открыты к сотрудничеству со всеми, кто работает в сфере премиального туризма и сервиса.
          Вместе создаём опыт, за которым возвращаются.
        </motion.p>

        <motion.button
          onClick={() => {
            const el = document.getElementById("partners-contact");
            if (el) el.scrollIntoView({ behavior: "smooth" });
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="inline-flex items-center gap-3 px-8 py-4 text-white text-xs uppercase tracking-widest font-bold"
          style={{ background: "#91040C" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
          onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
        >
          Стать партнёром <ArrowRight size={13} />
        </motion.button>
      </motion.div>
    </section>
  );
}

/* ─── Philosophy ─── */

function PhilosophySection() {
  return (
    <section
      className="relative px-6 md:px-12 py-20 md:py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={grainStyle} />
      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-6"
            >
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                Наш подход
              </span>
            </motion.div>

            <div className="overflow-hidden mb-6">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-black uppercase leading-tight text-white"
                style={{ fontSize: "clamp(34px, 4.5vw, 68px)", letterSpacing: "-0.02em" }}
              >
                Один стандарт —<br />
                <span style={{ color: "#91040C" }}>высший уровень</span>
              </motion.h2>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="space-y-5"
          >
            {[
              "Grand Tour Spirit — агрегатор премиальных впечатлений Сочи и Черноморского побережья. Мы не работаем с массовым сегментом.",
              "Наши клиенты ищут эксклюзивный опыт: частные яхты, вертолётные туры, закрытые мероприятия, персональный сервис. Им нужны лучшие партнёры — не просто поставщики.",
              "Мы отбираем партнёров вручную и несём ответственность перед клиентом за каждую рекомендацию. Поэтому ценим тех, кто разделяет этот стандарт.",
            ].map((text, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: 0.05 * i }}
                className="text-white/45 leading-relaxed"
                style={{ fontSize: 15 }}
              >
                {text}
              </motion.p>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Sectors ─── */

function SectorsSection() {
  return (
    <section
      className="relative px-6 md:px-12 py-20 md:py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={grainStyle} />
      <div className="max-w-[1600px] mx-auto relative z-10">

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                Направления
              </span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="font-black uppercase leading-none text-white"
                style={{ fontSize: "clamp(34px, 4.5vw, 68px)", letterSpacing: "-0.02em" }}
              >
                Кто нам нужен
              </motion.h2>
            </div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/30 leading-relaxed lg:max-w-xs lg:text-right"
            style={{ fontSize: 13 }}
          >
            Открыты ко всем премиальным сферам туризма — если у вас есть продукт, мы найдём формат сотрудничества.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {SECTORS.map((s, i) => (
            <motion.div
              key={s.index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.5, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              className="group relative p-6 md:p-8 flex flex-col gap-4 transition-colors duration-200 cursor-default"
              style={{ background: "#0B0B0C" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(145,4,12,0.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0B0B0C")}
            >
              <div className="flex items-start justify-between">
                <span className="font-black" style={{ fontSize: 10, color: "rgba(145,4,12,0.6)", letterSpacing: "0.15em" }}>
                  {s.index}
                </span>
                <span className="text-[9px] uppercase tracking-[0.25em] text-white/20 font-medium text-right">
                  {s.tag}
                </span>
              </div>
              <div>
                <div
                  className="font-black uppercase text-white leading-tight mb-3 group-hover:text-white transition-colors"
                  style={{ fontSize: "clamp(16px, 1.6vw, 20px)", letterSpacing: "-0.01em" }}
                >
                  {s.name}
                </div>
                <p className="text-white/35 leading-relaxed" style={{ fontSize: 12 }}>
                  {s.desc}
                </p>
              </div>
              <div className="mt-auto pt-2">
                <ArrowUpRight size={14} className="text-white/10 group-hover:text-white/40 transition-colors duration-200" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ─── */

function BenefitsSection() {
  return (
    <section
      className="relative px-6 md:px-12 py-20 md:py-28"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div style={grainStyle} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(145,4,12,0.05), transparent)" }}
      />

      <div className="max-w-[1600px] mx-auto relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
            Что мы предлагаем
          </span>
        </div>
        <div className="overflow-hidden mb-14">
          <motion.h2
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="font-black uppercase leading-none text-white"
            style={{ fontSize: "clamp(34px, 4.5vw, 68px)", letterSpacing: "-0.02em" }}
          >
            Условия<br />
            <span style={{ color: "#91040C" }}>партнёрства</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
          {BENEFITS.map((b, i) => (
            <motion.div
              key={b.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, delay: 0.08 * i }}
              className="p-8 md:p-10 flex gap-6"
              style={{ background: "#0B0B0C" }}
            >
              <div
                className="flex-shrink-0 w-10 h-10 flex items-center justify-center font-black text-white"
                style={{ background: "#91040C", fontSize: 13, letterSpacing: "0.05em" }}
              >
                {b.num}
              </div>
              <div>
                <div className="font-bold uppercase text-white mb-3 tracking-wide" style={{ fontSize: 14, letterSpacing: "0.08em" }}>
                  {b.title}
                </div>
                <p className="text-white/40 leading-relaxed" style={{ fontSize: 13 }}>
                  {b.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Contact ─── */

function ContactSection({ onNavigate }: { onNavigate: (r: Route) => void }) {
  return (
    <section
      id="partners-contact"
      className="relative px-6 md:px-12 py-28 md:py-40"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)", background: "#0B0B0C" }}
    >
      <div style={grainStyle} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 50% 60% at 50% 100%, rgba(145,4,12,0.07), transparent)" }}
      />

      <div className="max-w-[900px] mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <div className="w-8 h-px" style={{ background: "#91040C" }} />
          <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
            Начать разговор
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
            style={{ fontSize: "clamp(34px, 5vw, 72px)", letterSpacing: "-0.02em" }}
          >
            Расскажите<br />
            <span style={{ color: "#91040C" }}>о вашем бизнесе</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-white/35 leading-relaxed mb-12 max-w-md mx-auto"
          style={{ fontSize: 14 }}
        >
          Напишите нам в удобный мессенджер — расскажите чем занимаетесь, как видите сотрудничество.
          Мы отвечаем в течение дня.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.22 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-px mb-10"
          style={{ background: "rgba(255,255,255,0.05)" }}
        >
          {CONTACT_OPTIONS.map((opt, i) => (
            <motion.button
              key={opt.id}
              onClick={opt.action}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.05 * i }}
              className="group flex flex-col items-center gap-3 py-7 px-6 transition-colors duration-200"
              style={{ background: "#0B0B0C" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.03)")}
              onMouseLeave={(e) => (e.currentTarget.style.background = "#0B0B0C")}
            >
              <opt.icon size={22} style={{ color: opt.color }} />
              <div>
                <div className="text-white font-bold uppercase tracking-wider text-sm mb-0.5">{opt.label}</div>
                <div className="text-white/30 text-[11px]">{opt.sub}</div>
              </div>
            </motion.button>
          ))}
        </motion.div>

        <motion.button
          onClick={() => onNavigate({ page: "contacts" })}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="inline-flex items-center gap-2 text-white/25 hover:text-white/50 transition-colors text-[11px] uppercase tracking-[0.3em] font-semibold"
        >
          Или заполните форму на сайте <ArrowRight size={11} />
        </motion.button>
      </div>
    </section>
  );
}
