import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, ArrowRight, CheckCircle2, Truck, MessageCircle, Phone, Send, Mail, X } from "lucide-react";
import { Route } from "./GTSRouter";

const abkhaziaImage = "/abkhazia-hero.png";

interface GTSAbkhaziaHeroSectionProps {
  onNavigate?: (route: Route) => void;
}

/* ─── Book burst options ─── */
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

export function GTSAbkhaziaHeroSection({ onNavigate }: GTSAbkhaziaHeroSectionProps) {
  const [bookOpen, setBookOpen] = useState(false);

  const goAbkhazia = () => onNavigate?.({ page: "abkhazia" });

  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Top accent line */}
      <div className="relative h-1.5 bg-gradient-to-r from-transparent via-[#91040C] to-transparent">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ["-100%", "100%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.3 }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-14 md:py-18 lg:py-24">

        {/* Hero split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-12 lg:mb-16">

          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
              <motion.div whileHover={{ scale: 1.04 }} transition={{ duration: 0.6 }}>
                <img
                  src={abkhaziaImage}
                  alt="Абхазия — багги в горах"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: "16/10" }}
                />
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

              {/* Flagship badge */}
              <div className="absolute top-4 md:top-5 left-4 md:left-5 z-10">
                <div
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl backdrop-blur-xl"
                  style={{
                    background: "linear-gradient(135deg, rgba(145,4,12,0.95) 0%, rgba(109,3,9,0.95) 100%)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    boxShadow: "0 8px 32px rgba(145,4,12,0.5)",
                  }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-green-400"
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-white uppercase tracking-[0.2em] font-bold text-[9px] md:text-[10px]">
                    Флагманский продукт
                  </span>
                  <div className="h-3 w-px bg-white/30" />
                  <span className="text-green-300 uppercase tracking-[0.15em] font-bold text-[9px] md:text-[10px]">
                    70% выручки
                  </span>
                </div>
              </div>

              {/* Stats row */}
              <div className="absolute bottom-4 md:bottom-5 left-4 md:left-5 right-4 md:right-5 flex gap-2">
                {[
                  { label: "Ежедневно", value: "365" },
                  { label: "Клиентов/мес", value: "1200+" },
                  { label: "Рейтинг", value: "4.9" },
                ].map((s) => (
                  <div
                    key={s.label}
                    className="flex-1 p-2 md:p-3 rounded-lg backdrop-blur-xl"
                    style={{ background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)" }}
                  >
                    <div className="text-[#91040C] text-base md:text-xl font-bold leading-none mb-0.5">
                      {s.value}
                    </div>
                    <div className="text-white/60 text-[8px] uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: Title */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 mb-5 rounded-full w-fit"
              style={{ background: "rgba(145,4,12,0.1)", border: "1px solid rgba(145,4,12,0.3)" }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#91040C]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#91040C] uppercase tracking-[0.2em] font-bold text-[10px]">
                Доступны ежедневно
              </span>
            </div>

            <h2
              className="text-white mb-4"
              style={{ fontSize: "clamp(40px, 6.5vw, 76px)", fontWeight: 700, letterSpacing: "0.06em", lineHeight: 0.95 }}
            >
              АБХАЗИЯ
            </h2>

            <div className="flex items-center gap-4 mb-5">
              <div className="h-1 flex-1 max-w-[100px] bg-gradient-to-r from-[#91040C] to-transparent" />
              <p className="text-white/80 uppercase tracking-[0.12em] font-semibold" style={{ fontSize: "clamp(14px, 2vw, 20px)" }}>
                Багги · Горы · Приключения
              </p>
            </div>

            <p className="text-white/65 leading-relaxed mb-7" style={{ fontSize: "clamp(14px, 1.4vw, 17px)", maxWidth: 560 }}>
              Ежедневные экспедиции в Абхазию на премиальных багги. Выберите формат: однодневный экспресс через озеро Рица, двухдневная классика с ночёвкой или трёхдневное погружение.
            </p>

            {/* Daily highlight */}
            <div
              className="flex items-center gap-4 p-4 rounded-xl"
              style={{ background: "rgba(145,4,12,0.08)", border: "1px solid rgba(145,4,12,0.25)" }}
            >
              <motion.div
                className="flex-shrink-0 w-10 h-10 rounded-full bg-[#91040C] flex items-center justify-center"
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Calendar className="w-5 h-5 text-white" />
              </motion.div>
              <div>
                <div className="text-white uppercase tracking-[0.2em] font-bold" style={{ fontSize: 13 }}>
                  Выезды каждый день
                </div>
                <div className="text-white/50 text-xs mt-0.5">Бронируйте на любую дату · Без ожидания группы</div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tour cards — compact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4 mb-10 md:mb-12">
          {TOURS.map((tour, i) => (
            <motion.button
              key={tour.days}
              onClick={goAbkhazia}
              className={`group relative text-left p-4 md:p-5 rounded-xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                tour.featured
                  ? "border-[#91040C] bg-gradient-to-br from-[#91040C]/20 to-[#91040C]/5"
                  : "border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-[#91040C]/50"
              }`}
              whileHover={{ y: -4 }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
            >
              {tour.badge && (
                <div className="absolute top-3 right-3 bg-[#91040C] px-2.5 py-1 rounded-full z-10">
                  <span className="text-white uppercase tracking-wider font-bold" style={{ fontSize: 8 }}>
                    {tour.badge}
                  </span>
                </div>
              )}

              {/* Glow for featured */}
              {tour.featured && (
                <motion.div
                  className="absolute -inset-1 bg-gradient-to-r from-[#91040C]/0 via-[#91040C]/25 to-[#91040C]/0 rounded-xl blur-xl -z-10"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              )}

              <div className="relative z-10">
                <div className="flex items-baseline gap-2 mb-2">
                  <span
                    className={`font-bold leading-none ${tour.featured ? "text-white" : "text-[#91040C] group-hover:text-white transition-colors"}`}
                    style={{ fontSize: "clamp(32px, 4vw, 44px)" }}
                  >
                    {tour.days}
                  </span>
                  <span className="text-white/50 uppercase tracking-wider text-[11px]">{tour.daysLabel}</span>
                  <Truck className="w-5 h-5 text-white/15 ml-auto" />
                </div>

                <div className="text-white font-bold mb-1" style={{ fontSize: "clamp(16px, 1.8vw, 20px)" }}>
                  {tour.price}
                </div>
                <div className="text-white/50 text-[11px] uppercase tracking-wide mb-3">{tour.desc}</div>

                <div className={`flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider transition-colors ${
                  tour.featured ? "text-white" : "text-[#91040C] opacity-0 group-hover:opacity-100"
                }`}>
                  Выбрать <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {!tour.featured && (
                <div className="absolute inset-0 bg-gradient-to-br from-[#91040C]/0 to-[#91040C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              )}
            </motion.button>
          ))}
        </div>

        {/* Features + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center pt-7 border-t border-white/10"
        >
          {/* Features */}
          <div className="grid grid-cols-2 gap-2.5">
            {["Premium багги", "Опытный гид", "Питание включено", "Фото/видео съёмка"].map((f) => (
              <div key={f} className="flex items-center gap-2 text-white/60" style={{ fontSize: 13 }}>
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
                    className="w-full flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-white uppercase tracking-[0.15em] font-bold"
                    style={{ background: "#91040C", border: "2px solid #91040C", fontSize: 12 }}
                    whileHover={{ background: "#6d0309", scale: 1.02, boxShadow: "0 10px 30px rgba(145,4,12,0.4)" }}
                    whileTap={{ scale: 0.97 }}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                  >
                    Забронировать
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.div
                    key="book-open"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22 }}
                    className="rounded-xl overflow-hidden"
                    style={{ border: "2px solid rgba(145,4,12,0.5)" }}
                  >
                    {/* Close row */}
                    <div
                      className="flex items-center justify-between px-4 py-2"
                      style={{ background: "rgba(145,4,12,0.12)", borderBottom: "1px solid rgba(145,4,12,0.2)" }}
                    >
                      <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">Выберите способ</span>
                      <button
                        onClick={() => setBookOpen(false)}
                        className="text-white/40 hover:text-white/80 transition-colors"
                      >
                        <X size={14} />
                      </button>
                    </div>
                    {/* Options */}
                    <div className="grid grid-cols-2 gap-px" style={{ background: "rgba(255,255,255,0.04)" }}>
                      {BOOK_OPTIONS.map((opt, i) => (
                        <motion.button
                          key={opt.id}
                          onClick={opt.action}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.05, duration: 0.2 }}
                          className="flex items-center gap-2.5 px-4 py-3.5 hover:bg-white/5 transition-colors"
                          style={{ background: "rgba(11,11,12,0.95)" }}
                        >
                          <opt.icon size={16} style={{ color: opt.color, flexShrink: 0 }} />
                          <span className="text-white/75 text-[11px] font-semibold uppercase tracking-wide">
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
            <motion.button
              onClick={goAbkhazia}
              className="flex-1 flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl uppercase tracking-[0.15em] font-bold transition-all duration-200"
              style={{
                fontSize: 12,
                background: "transparent",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.75)",
              }}
              whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.97 }}
            >
              Подробнее об Абхазии
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
