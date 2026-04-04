import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Route } from "./GTSRouter";

interface GTSServicesBlockProps {
  onNavigate: (route: Route) => void;
}

const SERVICES = [
  {
    id: "yachts",
    index: "01",
    category: "Водные",
    name: "Яхты",
    sub: "Открытое море — на своих условиях",
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "helicopters",
    index: "02",
    category: "Воздушные",
    name: "Вертолёты",
    sub: "Сочи с высоты птичьего полёта",
    image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "events",
    index: "05",
    category: "События",
    name: "Мероприятия",
    sub: "Корпоративы и закрытые вечера",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "concierge",
    index: "04",
    category: "Сервис 24/7",
    name: "Консьерж",
    sub: "Один звонок — всё решено",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "hotels",
    index: "03",
    category: "Размещение",
    name: "Отели",
    sub: "Лучшие адреса — уже отобраны",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: "catering",
    index: "06",
    category: "Гастрономия",
    name: "Кейтеринг",
    sub: "Шеф-повар в любой точке",
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1200",
  },
];

const EXTRA = [
  { name: "VIP-трансфер", tag: "Логистика" },
  { name: "Частные гиды", tag: "Экспертиза" },
];

export function GTSServicesBlock({ onNavigate }: GTSServicesBlockProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const lineWidth = useTransform(scrollYProgress, [0.05, 0.3], ["0%", "100%"]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0B0B0C] py-24 md:py-36 px-6 md:px-12 overflow-hidden"
    >
      {/* grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          opacity: 0.03,
        }}
      />

      {/* top border */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: "rgba(255,255,255,0.06)" }}>
        <motion.div className="h-full" style={{ width: lineWidth, background: "#91040C" }} />
      </div>

      <div className="max-w-[1600px] mx-auto relative z-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-14">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 mb-4"
            >
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                Всё включено
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="font-black uppercase leading-none text-white"
              style={{ fontSize: "clamp(38px, 5.5vw, 82px)", letterSpacing: "-0.02em" }}
            >
              Доступ{" "}
              <span style={{ color: "#91040C" }}>ко всему</span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-white/35 leading-relaxed lg:max-w-xs lg:text-right"
            style={{ fontSize: 13 }}
          >
            Лучшие партнёры Сочи в каждой категории —
            мы несём ответственность за качество каждой услуги.
          </motion.p>
        </div>

        {/* 3-column grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {SERVICES.map((svc, i) => (
            <ServiceCard key={svc.id} svc={svc} index={i} onNavigate={onNavigate} />
          ))}
        </div>

        {/* Bottom: extra services + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5"
        >
          {/* Extra mini-cards */}
          {EXTRA.map((item, i) => (
            <motion.button
              key={item.name}
              onClick={() => onNavigate({ page: "experiences" })}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.06 }}
              className="group flex items-center justify-between px-6 py-4 text-left transition-colors duration-200"
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              <div>
                <div className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium mb-1">{item.tag}</div>
                <div className="text-white/60 group-hover:text-white font-semibold uppercase tracking-wide transition-colors" style={{ fontSize: 13 }}>
                  {item.name}
                </div>
              </div>
              <ArrowUpRight size={14} className="text-white/20 group-hover:text-white/50 transition-colors" />
            </motion.button>
          ))}

          {/* CTA card */}
          <motion.button
            onClick={() => onNavigate({ page: "experiences" })}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: 0.22 }}
            className="group flex items-center justify-between px-6 py-4 text-left transition-all duration-200"
            style={{ background: "#91040C" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
          >
            <span className="text-white text-xs uppercase tracking-[0.28em] font-bold">
              Все услуги
            </span>
            <ArrowRight size={14} className="text-white/80 group-hover:translate-x-1 transition-transform duration-200" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  index,
  onNavigate,
}: {
  svc: typeof SERVICES[number];
  index: number;
  onNavigate: (route: Route) => void;
}) {
  return (
    <motion.button
      onClick={() => onNavigate({ page: "experiences" })}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: 0.06 * index, ease: [0.16, 1, 0.3, 1] }}
      className="group relative overflow-hidden text-left"
      style={{ minHeight: 300 }}
    >
      {/* Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={svc.image}
          alt={`${svc.name} — Grand Tour Spirit`}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          style={{ filter: "brightness(0.5)" }}
        />
      </div>

      {/* Gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(to top, rgba(11,11,12,0.92) 0%, rgba(11,11,12,0.3) 55%, rgba(11,11,12,0.05) 100%)",
        }}
      />

      {/* Red tint on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "rgba(145,4,12,0.1)" }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 md:p-7" style={{ minHeight: 300 }}>
        {/* Top: index + category */}
        <div className="flex items-center justify-between">
          <span
            className="font-black"
            style={{ fontSize: 10, color: "rgba(145,4,12,0.65)", letterSpacing: "0.15em" }}
          >
            {svc.index}
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/25 font-medium">
            {svc.category}
          </span>
        </div>

        {/* Bottom: name + sub + arrow */}
        <div>
          <div
            className="font-black text-white uppercase leading-tight mb-2 group-hover:text-white transition-colors"
            style={{ fontSize: "clamp(20px, 2.2vw, 28px)", letterSpacing: "-0.015em" }}
          >
            {svc.name}
          </div>
          <div className="text-white/40 leading-snug mb-4" style={{ fontSize: 12 }}>
            {svc.sub}
          </div>
          <div className="flex items-center gap-1.5 text-white/20 group-hover:text-white/55 transition-colors duration-200">
            <span className="text-[9px] uppercase tracking-widest font-semibold">Подробнее</span>
            <ArrowUpRight size={10} />
          </div>
        </div>
      </div>
    </motion.button>
  );
}
