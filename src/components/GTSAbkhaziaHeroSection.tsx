import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, CheckCircle2, Truck, MessageCircle, Phone, Send, Mail, X } from "lucide-react";
import { Route } from "./GTSRouter";

const abkhaziaImage = "/abkhazia-hero.png";

interface GTSAbkhaziaHeroSectionProps {
  onNavigate?: (route: Route) => void;
}

const BOOK_OPTIONS = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
    color: "#25D366",
    action: () => window.open("https://wa.me/78625550123", "_blank"),
  },
  {
    id: "telegram",
    label: "Telegram",
    icon: Send,
    color: "#2AABEE",
    action: () => window.open("https://t.me/grandtourspirit", "_blank"),
  },
  {
    id: "callback",
    label: "Перезвоните",
    icon: Phone,
    color: "#91040C",
    action: () => window.open("tel:+78625550123"),
  },
  {
    id: "email",
    label: "Написать",
    icon: Mail,
    color: "rgba(255,255,255,0.7)",
    action: () => window.open("mailto:club@grandtoursochi.ru"),
  },
];

const TOURS = [
  {
    days: 1,
    daysLabel: "день",
    price: "от 24 900 ₽",
    desc: "Озеро Рица, водопады, панорамы",
    featured: false,
  },
  {
    days: 2,
    daysLabel: "дня",
    price: "от 38 900 ₽",
    desc: "Горы + побережье, отель 4★",
    featured: true,
    badge: "Популярный",
  },
  {
    days: 3,
    daysLabel: "дня",
    price: "от 52 900 ₽",
    desc: "Полный маршрут с ночёвками",
    featured: false,
  },
];

const grain: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  opacity: 0.035,
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

export function GTSAbkhaziaHeroSection({ onNavigate }: GTSAbkhaziaHeroSectionProps) {
  const [bookOpen, setBookOpen] = useState(false);

  const goAbkhazia = () => onNavigate?.({ page: "abkhazia" });

  return (
    <div className="relative w-full bg-[#0B0B0C] overflow-hidden">
      <div style={grain} />

      {/* Top border line */}
      <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div
          className="h-full"
          style={{ background: "#91040C", width: "40%" }}
          initial={{ width: "0%" }}
          whileInView={{ width: "40%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-14 md:py-18 lg:py-24">

        {/* Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-16">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/10" }}>
              <img
                src={abkhaziaImage}
                alt="Абхазия — багги в горах"
                className="w-full h-full object-cover"
                style={{ filter: "brightness(0.75)" }}
              />
              <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(11,11,12,0.7) 0%, transparent 50%)" }} />

              {/* Flagship badge — sharp */}
              <div
                className="absolute top-4 left-4 flex items-center gap-2 px-3 py-2"
                style={{ background: "#91040C" }}
              >
                <motion.div
                  className="w-1.5 h-1.5 bg-white"
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-white uppercase tracking-[0.25em] font-bold text-[9px]">
                  Флагманский продукт
                </span>
              </div>

              {/* Stats — sharp */}
              <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                {[
                  { label: "Ежедневно", value: "365" },
                  { label: "Клиентов/мес", value: "1200+" },
                  { label: "Рейтинг", value: "4.9" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 px-3 py-2"
                    style={{ background: "rgba(11,11,12,0.85)", borderTop: "1px solid rgba(145,4,12,0.4)" }}
                  >
                    <div className="font-bold leading-none mb-0.5" style={{ color: "#91040C", fontSize: 18 }}>
                      {s.value}
                    </div>
                    <div className="text-white/50 uppercase tracking-wider" style={{ fontSize: 8 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Title */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            {/* Label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <motion.div
                className="w-1.5 h-1.5"
                style={{ background: "#91040C" }}
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[10px] uppercase tracking-[0.35em] font-bold" style={{ color: "#91040C" }}>
                Доступны ежедневно
              </span>
            </div>

            <h2
              className="text-white mb-4 uppercase font-black leading-none"
              style={{ fontSize: "clamp(40px, 6.5vw, 76px)", letterSpacing: "-0.02em" }}
            >
              АБХАЗИЯ
            </h2>

            <div className="flex items-center gap-4 mb-5">
              <div className="h-px flex-1 max-w-[80px]" style={{ background: "#91040C" }} />
              <p className="text-white/60 uppercase tracking-[0.12em] font-semibold" style={{ fontSize: "clamp(12px, 1.6vw, 16px)" }}>
                Багги · Горы · Приключения
              </p>
            </div>

            <p className="text-white/50 leading-relaxed mb-7" style={{ fontSize: "clamp(13px, 1.3vw, 15px)", maxWidth: 520 }}>
              Ежедневные экспедиции в Абхазию на премиальных багги. Выберите формат: однодневный экспресс через озеро Рица, двухдневная классика с ночёвкой или трёхдневное погружение.
            </p>

            {/* Daily highlight — sharp */}
            <div
              className="flex items-center gap-4 px-5 py-4"
              style={{ background: "rgba(145,4,12,0.07)", borderLeft: "2px solid #91040C" }}
            >
              <Calendar className="w-5 h-5 flex-shrink-0" style={{ color: "#91040C" }} />
              <div>
                <div className="text-white uppercase tracking-[0.2em] font-bold" style={{ fontSize: 12 }}>
                  Выезды каждый день
                </div>
                <div className="text-white/40 mt-0.5" style={{ fontSize: 11 }}>Бронируйте на любую дату · Без ожидания группы</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tour cards — sharp, no rounded corners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px mb-10 md:mb-12" style={{ background: "rgba(255,255,255,0.06)" }}>
          {TOURS.map((tour, i) => (
            <motion.button
              key={tour.days}
              onClick={goAbkhazia}
              className="group relative text-left p-5 md:p-6 overflow-hidden transition-colors duration-200"
              style={{
                background: tour.featured ? "rgba(145,4,12,0.12)" : "#0B0B0C",
              }}
              onMouseEnter={(e) => {
                if (!tour.featured) e.currentTarget.style.background = "rgba(145,4,12,0.06)";
              }}
              onMouseLeave={(e) => {
                if (!tour.featured) e.currentTarget.style.background = "#0B0B0C";
              }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {/* Featured top border */}
              {tour.featured && (
                <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "#91040C" }} />
              )}

              {tour.badge && (
                <div
                  className="absolute top-4 right-4 px-2.5 py-1"
                  style={{ background: "#91040C" }}
                >
                  <span className="text-white uppercase tracking-wider font-bold" style={{ fontSize: 8 }}>
                    {tour.badge}
                  </span>
                </div>
              )}

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-3">
                  <span
                    className="font-black leading-none"
                    style={{
                      fontSize: "clamp(36px, 4.5vw, 52px)",
                      color: tour.featured ? "white" : "#91040C",
                    }}
                  >
                    {tour.days}
                  </span>
                  <span className="text-white/40 uppercase tracking-wider" style={{ fontSize: 11 }}>{tour.daysLabel}</span>
                  <Truck className="w-4 h-4 text-white/10 ml-auto" />
                </div>

                <div className="text-white font-bold mb-1" style={{ fontSize: "clamp(15px, 1.6vw, 19px)" }}>
                  {tour.price}
                </div>
                <div className="text-white/35 uppercase tracking-wide mb-4" style={{ fontSize: 11 }}>{tour.desc}</div>

                <div
                  className="flex items-center gap-1.5 uppercase tracking-wider font-bold transition-colors"
                  style={{
                    fontSize: 10,
                    color: tour.featured ? "#91040C" : "rgba(145,4,12,0)",
                  }}
                >
                  <span className="group-hover:text-[#91040C] transition-colors" style={{ color: "inherit" }}>Выбрать</span>
                  <ArrowRight className="w-3 h-3" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Features + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-7"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Features */}
          <div className="grid grid-cols-2 gap-2.5">
            {["Premium багги", "Опытный гид", "Питание включено", "Фото/видео съёмка"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-white/55" style={{ fontSize: 13 }}>
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#91040C" }} />
                <span>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Забронировать — burst */}
            <div className="relative flex-1">
              <AnimatePresence mode="wait">
                {!bookOpen ? (
                  <motion.button
                    key="book-closed"
                    onClick={() => setBookOpen(true)}
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 text-white uppercase tracking-[0.2em] font-bold transition-colors duration-200"
                    style={{ background: "#91040C", fontSize: 11 }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    Забронировать
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.div
                    key="book-open"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.18 }}
                    style={{ border: "1px solid rgba(145,4,12,0.4)" }}
                  >
                    {/* Close row */}
                    <div
                      className="flex items-center justify-between px-4 py-2"
                      style={{ background: "rgba(145,4,12,0.1)", borderBottom: "1px solid rgba(145,4,12,0.2)" }}
                    >
                      <span className="text-white/40 uppercase tracking-[0.3em]" style={{ fontSize: 9 }}>Выберите способ</span>
                      <button
                        onClick={() => setBookOpen(false)}
                        className="text-white/40 hover:text-white/80 transition-colors"
                      >
                        <X size={13} />
                      </button>
                    </div>
                    {/* Options grid */}
                    <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.05)" }}>
                      {BOOK_OPTIONS.map((opt, i) => (
                        <motion.button
                          key={opt.id}
                          onClick={opt.action}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.04, duration: 0.18 }}
                          className="flex items-center gap-2.5 px-4 py-3 hover:bg-white/5 transition-colors"
                          style={{ background: "#0B0B0C" }}
                        >
                          <opt.icon size={15} style={{ color: opt.color, flexShrink: 0 }} />
                          <span className="text-white/65 uppercase tracking-wide font-semibold" style={{ fontSize: 10 }}>
                            {opt.label}
                          </span>
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Подробнее */}
            <button
              onClick={goAbkhazia}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 uppercase tracking-[0.2em] font-bold transition-colors duration-200"
              style={{
                fontSize: 11,
                background: "transparent",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.65)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              Подробнее об Абхазии
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
