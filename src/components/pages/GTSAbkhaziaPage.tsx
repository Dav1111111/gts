import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "motion/react";
import {
  ArrowRight,
  ChevronDown,
  MapPin,
  Mountain,
  X,
  Clock,
  Gauge,
  Navigation,
} from "lucide-react";
import { AnimatePresence } from "motion/react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { useExpeditions, ExpeditionData } from "../../contexts/GTSExpeditionsContext";

interface GTSAbkhaziaPageProps {
  onNavigate: (route: Route) => void;
}

/* ─── Data ─── */

const WHY_ITEMS = [
  { num: "01", stat: "0 ч", title: "Близко к Сочи", desc: "Удобная логистика без длинных перегонов — стартуем прямо из региона" },
  { num: "02", stat: "365", title: "Ежедневные выезды", desc: "Абхазия работает каждый день сезона — не нужно ждать группу" },
  { num: "03", stat: "2400м", title: "Высокая плотность", desc: "Леса, горы, водопады, перевалы и альпийские луга на коротком плече" },
  { num: "04", stat: "1–3", title: "Форматы 1–3 дня", desc: "Линейка маршрутов от однодневного экспресса до большой трёхдневной экспедиции" },
];

const TERRAIN_ITEMS = [
  { label: "Горные дороги", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" },
  { label: "Лесные участки", image: "https://images.unsplash.com/photo-1448375240586-882707db888b?w=600&q=80" },
  { label: "Водопады", image: "https://images.unsplash.com/photo-1431794062232-2a99a5431c6c?w=600&q=80" },
  { label: "Гравийные серпантины", image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&q=80" },
  { label: "Высокогорные линии", image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&q=80" },
  { label: "Альпийские луга", image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=600&q=80" },
  { label: "Перевальные участки", image: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=600&q=80" },
  { label: "Обзорные точки", image: "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?w=600&q=80" },
];




/* ─── Hooks ─── */

function useCounter(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [triggered, setTriggered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !triggered) setTriggered(true); },
      { threshold: 0.3 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [triggered]);
  useEffect(() => {
    if (!triggered) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [triggered, end, duration]);
  return { count, ref };
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, inView };
}

/* ─── Cursor Follower ─── */

function CursorFollower() {
  const cursorX = useMotionValue(-200);
  const cursorY = useMotionValue(-200);
  const ringX = useSpring(cursorX, { stiffness: 150, damping: 15, mass: 0.1 });
  const ringY = useSpring(cursorY, { stiffness: 150, damping: 15, mass: 0.1 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);
  const [isFine, setIsFine] = useState(false);
  const hasShown = useRef(false);

  useEffect(() => {
    setIsFine(window.matchMedia("(pointer: fine)").matches);
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!hasShown.current) { hasShown.current = true; setVisible(true); }
    };
    const onOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.("button, a")) setHovered(true);
    };
    const onOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest?.("button, a")) setHovered(false);
    };
    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, [cursorX, cursorY]);

  if (!isFine) return null;

  return (
    <>
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        style={{ x: cursorX, y: cursorY, translateX: "-50%", translateY: "-50%" }}
        animate={{ opacity: visible ? 1 : 0 }}
      >
        <div className="w-2 h-2 rounded-full" style={{ background: "#91040C" }} />
      </motion.div>
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%", borderStyle: "solid", borderWidth: "1px" }}
        animate={{
          opacity: visible ? 1 : 0,
          width: hovered ? 56 : 32,
          height: hovered ? 56 : 32,
          borderColor: hovered ? "rgba(145,4,12,0.8)" : "rgba(255,255,255,0.22)",
        }}
        transition={{ duration: 0.2 }}
      />
    </>
  );
}

/* ─── Shared styles ─── */

const grainStyle: React.CSSProperties = {
  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
  opacity: 0.04,
  position: "absolute",
  inset: 0,
  pointerEvents: "none",
};

/* ─── MagneticButton ─── */

function MagneticButton({ children, className, onClick, style }: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 300, damping: 20 });
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const handleMove = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }, [x, y]);
  const handleLeave = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }} className={className}
      onMouseMove={handleMove} onMouseLeave={handleLeave} onClick={onClick} whileTap={{ scale: 0.97 }}>
      {children}
    </motion.button>
  );
}

/* ─── Marquee Strip ─── */

function MarqueeStrip() {
  const items = ["АБХАЗИЯ", "БАГГИ-ЭКСПЕДИЦИИ", "GTS 2026", "ГОРНЫЕ МАРШРУТЫ", "DAILY ADVENTURE", "SOCHI REGION"];
  const tripled = [...items, ...items, ...items];
  return (
    <div className="overflow-hidden py-4 border-y" style={{ borderColor: "rgba(255,255,255,0.05)", background: "#080809" }}>
      <motion.div
        className="flex gap-10 whitespace-nowrap"
        animate={{ x: ["0%", "-33.333%"] }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity }}
      >
        {tripled.map((item, i) => (
          <span key={i} className="text-[10px] uppercase tracking-[0.4em] font-semibold shrink-0"
            style={{ color: i % 2 === 0 ? "rgba(255,255,255,0.1)" : "rgba(145,4,12,0.5)" }}>
            {item} ·
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* ─── Section number divider ─── */

function SectionDivider({ num, label }: { num: string; label: string }) {
  return (
    <div className="flex items-center gap-4 mb-16">
      <span className="font-black leading-none select-none" style={{ fontSize: 56, color: "rgba(255,255,255,0.05)", letterSpacing: "-0.04em" }}>{num}</span>
      <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
      <span className="text-[10px] uppercase tracking-[0.4em] text-white/20">{label}</span>
    </div>
  );
}

/* ─── Page ─── */

export function GTSAbkhaziaPage({ onNavigate }: GTSAbkhaziaPageProps) {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress: heroScrollY } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroImgY = useTransform(heroScrollY, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScrollY, [0, 0.7], [1, 0]);

  const dragRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(0);
  const scrollStart = useRef(0);
  const onMouseDown = (e: React.MouseEvent) => { setIsDragging(true); dragStart.current = e.pageX; scrollStart.current = dragRef.current?.scrollLeft ?? 0; };
  const onMouseMove = (e: React.MouseEvent) => { if (!isDragging || !dragRef.current) return; dragRef.current.scrollLeft = scrollStart.current - (e.pageX - dragStart.current); };
  const stopDrag = () => setIsDragging(false);

  const [selectedExp, setSelectedExp] = useState<AbkExpedition | null>(null);

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white overflow-x-hidden gts-abk-page">
      <CursorFollower />
      <GTSNavigationHeader onNavigate={onNavigate} />

      <main>
        {/* ══ HERO ══ */}
        <section ref={heroRef} className="relative h-screen min-h-[700px] flex flex-col justify-end overflow-hidden">
          <motion.div className="absolute inset-0 will-change-transform" style={{ y: heroImgY }}>
            <img src="/abkhazia-hero.png" alt="Абхазия — багги-экспедиции GTS" className="w-full h-full object-cover scale-110" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-[#0B0B0C]/35 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/70 via-transparent to-transparent" />
          <div style={grainStyle} />

          {/* Scan line */}
          <div className="absolute top-0 left-0 right-0 h-px z-10" style={{ background: "linear-gradient(90deg, transparent, #91040C 50%, transparent)" }}>
            <motion.div
              className="absolute inset-0"
              style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Rotating badge */}
          <div className="absolute top-28 right-8 md:right-16 z-20 hidden md:block">
            <div className="relative w-28 h-28 flex items-center justify-center" style={{ animation: "rotateBadge 20s linear infinite" }}>
              <svg viewBox="0 0 112 112" className="absolute inset-0 w-full h-full">
                <defs>
                  <path id="cp-abk" d="M 56,56 m -40,0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0" />
                </defs>
                <text fill="rgba(255,255,255,0.45)" fontSize="9.5" letterSpacing="3.5" fontFamily="sans-serif" fontWeight="600">
                  <textPath href="#cp-abk">ФЛАГМАНСКОЕ · НАПРАВЛЕНИЕ · GTS ·</textPath>
                </text>
              </svg>
              <div className="w-5 h-5 rounded-full" style={{ background: "#91040C" }} />
            </div>
          </div>

          {/* Floating stats */}
          <motion.div className="absolute right-6 md:right-16 bottom-36 z-20 flex flex-col gap-3" style={{ opacity: heroOpacity }}>
            {[{ val: "365", label: "дней в сезоне" }, { val: "1200+", label: "км маршрутов" }, { val: "4.9", label: "рейтинг" }].map((s, i) => (
              <motion.div key={s.val} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 + i * 0.15 }}
                className="px-4 py-3 rounded-xl text-right"
                style={{ background: "rgba(255,255,255,0.07)", backdropFilter: "blur(16px)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div className="text-white font-bold text-xl tracking-tight leading-none">{s.val}</div>
                <div className="text-white/45 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Hero content */}
          <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 pb-20 md:pb-28">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full"
              style={{ background: "rgba(145,4,12,0.15)", border: "1px solid rgba(145,4,12,0.45)" }}>
              <motion.span className="w-1.5 h-1.5 rounded-full" style={{ background: "#91040C" }}
                animate={{ opacity: [1, 0.2, 1] }} transition={{ duration: 1.8, repeat: Infinity }} />
              <span className="text-[#91040C] uppercase tracking-[0.3em] font-bold text-[10px]">Направление GTS</span>
            </motion.div>

            <div className="overflow-hidden mb-2">
              <motion.h1
                className="uppercase text-white leading-none"
                style={{ fontSize: "clamp(72px, 14vw, 180px)", fontWeight: 900, letterSpacing: "-0.02em" }}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                АБХАЗИЯ
              </motion.h1>
            </div>

            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="text-white/70 uppercase tracking-[0.2em] font-semibold mb-4"
              style={{ fontSize: "clamp(12px, 1.6vw, 18px)" }}>
              Ежедневные багги-экспедиции GTS
            </motion.p>

            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.75 }}
              className="text-white/45 max-w-xl mb-10 leading-relaxed"
              style={{ fontSize: "clamp(13px, 1.2vw, 16px)" }}>
              Главное летнее направление GTS: горные дороги, лесные участки, водопады, перевалы и альпийские луга с настоящим внедорожным характером.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-4">
              <MagneticButton
                className="inline-flex items-center gap-2 px-8 py-4 text-white uppercase tracking-widest font-bold text-xs"
                style={{ background: "#91040C", border: "2px solid #91040C" }}
                onClick={() => onNavigate({ page: "contacts" })}>
                Записаться на экспедицию <ArrowRight size={14} />
              </MagneticButton>
              <MagneticButton
                className="inline-flex items-center gap-2 px-8 py-4 text-white/80 uppercase tracking-widest font-semibold text-xs"
                style={{ border: "2px solid rgba(255,255,255,0.18)" }}
                onClick={() => onNavigate({ page: "experiences" })}>
                Все маршруты
              </MagneticButton>
            </motion.div>
          </div>

          <motion.div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1"
            animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ opacity: heroOpacity }}>
            <span className="text-white/25 uppercase tracking-[0.3em] text-[9px]">Скролл</span>
            <ChevronDown size={16} className="text-white/25" />
          </motion.div>

          <style>{`
            @keyframes rotateBadge { to { transform: rotate(360deg); } }
            @media (pointer: fine) { .gts-abk-page { cursor: none; } }
          `}</style>
        </section>

        <MarqueeStrip />
        <WhySection />
        <ManifestoStrip />
        <TerrainSection />
        <CatalogSection onSelectExp={setSelectedExp} />
        <FinalCTASection onNavigate={onNavigate} />
      </main>

      <AbkhaziaExpeditionOverlay
        expedition={selectedExp}
        onClose={() => setSelectedExp(null)}
        onNavigate={onNavigate}
      />

      <GTSFooter />
    </div>
  );
}

/* ─── Why Section ─── */

function WhySection() {
  const { ref: sectionRef, inView } = useInView(0.05);
  const stats365 = useCounter(365, 1800);
  const stats1200 = useCounter(1200, 2200);

  return (
    <section ref={sectionRef} className="py-24 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto">
      <SectionDivider num="01" label="Почему Абхазия" />

      <div className="overflow-hidden mb-16">
        <motion.h2
          className="text-white font-black uppercase leading-none"
          style={{ fontSize: "clamp(40px, 7.5vw, 108px)", letterSpacing: "-0.02em" }}
          initial={{ y: "100%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          ПОЧЕМУ <span style={{ color: "#91040C" }}>АБХАЗИЯ</span>?
        </motion.h2>
      </div>

      {/* Big counters */}
      <div className="grid grid-cols-2 mb-16 md:mb-20" style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}>
        <div ref={stats365.ref} className="py-12 px-6 md:px-10 flex flex-col" style={{ background: "#0B0B0C" }}>
          <span className="font-black leading-none mb-1" style={{ fontSize: "clamp(52px, 9vw, 120px)", color: "#91040C" }}>
            {stats365.count}
          </span>
          <span className="text-white/30 uppercase tracking-widest text-[10px]">дней в сезоне</span>
        </div>
        <div ref={stats1200.ref} className="py-12 px-6 md:px-10 flex flex-col" style={{ background: "#0B0B0C" }}>
          <span className="font-black leading-none mb-1" style={{ fontSize: "clamp(52px, 9vw, 120px)", color: "#91040C" }}>
            {stats1200.count}+
          </span>
          <span className="text-white/30 uppercase tracking-widest text-[10px]">км маршрутов</span>
        </div>
      </div>

      {/* Editorial table */}
      <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        {WHY_ITEMS.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 18 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.08 }}
            className="flex items-start gap-5 md:gap-8 py-6 group"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
          >
            <span className="font-bold text-[10px] w-8 shrink-0 pt-1.5" style={{ color: "rgba(255,255,255,0.15)" }}>{item.num}</span>
            <span className="font-black w-20 md:w-28 shrink-0 pt-0.5" style={{ fontSize: "clamp(18px, 2vw, 26px)", color: "#91040C" }}>{item.stat}</span>
            <div className="flex-1 min-w-0">
              <div className="text-white font-semibold uppercase tracking-wide text-sm mb-1">{item.title}</div>
              <div className="text-white/35 text-sm leading-relaxed">{item.desc}</div>
            </div>
            <ArrowRight size={14} className="shrink-0 mt-1.5 transition-all duration-300 group-hover:translate-x-1" style={{ color: "rgba(255,255,255,0.12)" }} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ─── Manifesto Strip ─── */

function ManifestoStrip() {
  const { ref, inView } = useInView(0.2);
  return (
    <section ref={ref} className="relative overflow-hidden py-20 md:py-28 px-6 md:px-12" style={{ background: "#91040C" }}>
      <div style={{ ...grainStyle, opacity: 0.07 }} />
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 100% at 0% 50%, rgba(0,0,0,0.45), transparent)" }} />
      <div className="relative max-w-[1600px] mx-auto">
        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5 }}
          className="text-white/50 uppercase tracking-[0.3em] text-[10px] mb-5">
          Главное направление сезона 2026
        </motion.p>
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-white font-black uppercase leading-tight"
            style={{ fontSize: "clamp(24px, 4.5vw, 64px)", letterSpacing: "-0.01em", maxWidth: "900px" }}
          >
            Ежедневные багги-экспедиции в горах Абхазии — это не туризм. Это настоящее внедорожное приключение.
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ─── Terrain Section ─── */

function TerrainSection() {
  const { inView, ref } = useInView(0.05);
  const stickyRef = useRef<HTMLDivElement>(null);

  return (
    <section ref={ref}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 pt-24 md:pt-36 pb-0">
        <SectionDivider num="02" label="Рельеф" />
      </div>

      <div className="flex flex-col lg:flex-row">
        {/* Sticky left */}
        <div ref={stickyRef} className="lg:w-5/12 lg:sticky lg:top-0 lg:h-screen flex items-center px-6 md:px-12 lg:pl-12 lg:pr-16 py-12 lg:py-0">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/25 mb-6">Что получает гость</div>
            <h2 className="text-white font-black uppercase leading-tight mb-6"
              style={{ fontSize: "clamp(34px, 3.8vw, 60px)", letterSpacing: "-0.02em" }}>
              Рельеф,<br />который<br />
              <span style={{ color: "#91040C" }}>захватывает</span>
            </h2>
            <p className="text-white/38 leading-relaxed" style={{ fontSize: 15, maxWidth: 340 }}>
              Абхазия — не обзорная экскурсия, а полноценный маршрутный регион с очень высокой плотностью впечатлений.
            </p>
          </motion.div>
        </div>

        {/* Right: photo grid */}
        <div className="lg:w-7/12 grid grid-cols-2 gap-3 px-6 md:px-12 lg:pr-12 lg:pl-0 pb-16 lg:py-16">
          {TERRAIN_ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.04 * i, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden group"
              style={{ aspectRatio: "4/3", borderRadius: 10 }}
            >
              <img src={item.image} alt={item.label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                <span className="text-white font-semibold text-[10px] md:text-xs uppercase tracking-wide">{item.label}</span>
              </div>
              <div className="absolute top-2.5 right-2.5 w-1.5 h-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "#91040C" }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


/* ─── Map ExpeditionData → AbkExpedition ─── */

function daysLabel(n: number) {
  if (n === 1) return "1 день";
  if (n <= 4) return `${n} дня`;
  return `${n} дней`;
}

function mapToAbk(e: ExpeditionData): AbkExpedition {
  return {
    id: e.id,
    title: e.title,
    days: daysLabel(e.totalDays),
    character: e.tourType,
    distance: e.distance,
    elevation: e.elevation || e.region || "—",
    price: `от ${e.price} ₽`,
    difficulty: e.difficulty,
    highlights: e.highlights,
    description: e.description,
    itinerary: e.program.length > 0
      ? e.program.map((d) => `День ${d.day}: ${d.title}`)
      : ["Программа уточняется"],
    image: e.heroImage,
  };
}

/* ─── Abkhazia Expedition Overlay ─── */

type AbkExpedition = {
  id: string;
  title: string;
  days: string;
  character: string;
  distance: string;
  elevation: string;
  price: string;
  difficulty: string;
  highlights: string[];
  description: string;
  itinerary: string[];
  image: string;
};

function AbkhaziaExpeditionOverlay({ expedition, onClose, onNavigate }: {
  expedition: AbkExpedition | null;
  onClose: () => void;
  onNavigate: (r: Route) => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!expedition) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setImgLoaded(false);
    return () => { document.body.style.overflow = prev; };
  }, [expedition]);

  const difficultyColor = (d: string) =>
    d === "Высокая" ? "#ff4d4d" : d === "Экспедиционная" ? "#ff8c00" : "#91040C";

  return (
    <AnimatePresence>
      {expedition && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[1300]"
            style={{ background: "rgba(4,4,6,0.85)", backdropFilter: "blur(14px)", WebkitBackdropFilter: "blur(14px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Panel — slides up */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-[1301] flex flex-col lg:flex-row overflow-hidden"
            style={{
              top: "3vh",
              borderRadius: "20px 20px 0 0",
              background: "#0A0A0B",
              border: "1px solid rgba(255,255,255,0.07)",
              borderBottom: "none",
              boxShadow: "0 -40px 120px rgba(0,0,0,0.8)",
            }}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Red scan line at top */}
            <div className="absolute top-0 left-0 right-0 h-px z-20"
              style={{ background: "linear-gradient(90deg, transparent, #91040C 40%, transparent)" }}>
              <motion.div className="absolute inset-0"
                style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)" }}
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }} />
            </div>

            {/* Grain */}
            <div className="absolute inset-0 pointer-events-none z-0" style={{ ...grainStyle, opacity: 0.035 }} />

            {/* Close button */}
            <motion.button
              onClick={onClose}
              className="absolute top-5 right-5 z-30 w-9 h-9 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(145,4,12,0.4)" }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={14} className="text-white/60" />
            </motion.button>

            {/* ── LEFT: Hero image (sticky) ── */}
            <div className="lg:w-5/12 relative shrink-0 overflow-hidden" style={{ minHeight: 280 }}>
              <motion.img
                src={expedition.image}
                alt={expedition.title}
                className="absolute inset-0 w-full h-full object-cover"
                onLoad={() => setImgLoaded(true)}
                initial={{ scale: 1.1 }}
                animate={{ scale: imgLoaded ? 1 : 1.1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0A0A0B]/70 hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0B]/90 via-transparent to-transparent lg:hidden" />

              {/* Character badge */}
              <div className="absolute top-6 left-6 z-10">
                <span className="px-3 py-1.5 rounded-full text-[10px] uppercase tracking-widest font-bold text-white"
                  style={{ background: "rgba(145,4,12,0.9)", backdropFilter: "blur(8px)" }}>
                  {expedition.days}
                </span>
              </div>

              {/* Price overlay */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="text-white/35 text-[9px] uppercase tracking-widest mb-1">Стоимость</div>
                <div className="text-white font-black" style={{ fontSize: "clamp(22px, 3vw, 36px)", letterSpacing: "-0.02em" }}>
                  {expedition.price}
                </div>
              </div>
            </div>

            {/* ── RIGHT: Scrollable content ── */}
            <div className="lg:w-7/12 overflow-y-auto relative z-10" style={{ maxHeight: "97vh" }}>
              <div className="px-8 md:px-12 pt-12 pb-16">

                {/* Pre-label */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center gap-3 mb-5"
                >
                  <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                    Абхазия · Экспедиция
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.07)" }} />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-white/20">{expedition.character}</span>
                </motion.div>

                {/* Title */}
                <div className="overflow-hidden mb-6">
                  <motion.h2
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
                    className="text-white font-black uppercase leading-tight"
                    style={{ fontSize: "clamp(24px, 3.5vw, 48px)", letterSpacing: "-0.02em" }}
                  >
                    {expedition.title}
                  </motion.h2>
                </div>

                {/* Stats row — editorial style matching WhySection counters */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.18 }}
                  className="grid grid-cols-2 sm:grid-cols-4 mb-10"
                  style={{ gap: "1px", background: "rgba(255,255,255,0.06)" }}
                >
                  {[
                    { val: expedition.days,       label: "Длительность" },
                    { val: expedition.distance,   label: "Дистанция" },
                    { val: expedition.elevation,  label: "Высота" },
                    { val: expedition.difficulty, label: "Сложность", accent: true },
                  ].map(({ val, label, accent }) => (
                    <div key={label} className="flex flex-col py-5 px-4" style={{ background: "#0A0A0B" }}>
                      <span
                        className="font-black leading-none mb-2"
                        style={{
                          fontSize: "clamp(14px, 1.6vw, 20px)",
                          color: accent ? difficultyColor(val) : "#91040C",
                          letterSpacing: "-0.01em",
                        }}
                      >
                        {val}
                      </span>
                      <span className="text-white/25 text-[9px] uppercase tracking-widest">{label}</span>
                    </div>
                  ))}
                </motion.div>

                {/* Description */}
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.24 }}
                  className="leading-relaxed mb-10"
                  style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, borderLeft: "2px solid rgba(145,4,12,0.4)", paddingLeft: 16 }}
                >
                  {expedition.description}
                </motion.p>

                {/* Itinerary — editorial table, matching WHY_ITEMS */}
                <motion.div
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-10"
                >
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-[10px] uppercase tracking-[0.4em] text-white/20 font-semibold">Программа</span>
                    <div className="h-px flex-1" style={{ background: "rgba(255,255,255,0.06)" }} />
                  </div>
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    {expedition.itinerary.map((step, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.32 + idx * 0.04 }}
                        className="flex items-start gap-5 py-4 group"
                        style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
                      >
                        <span className="font-black text-[11px] shrink-0 pt-0.5 w-6"
                          style={{ color: "rgba(145,4,12,0.55)" }}>
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-white/45 text-sm leading-relaxed group-hover:text-white/70 transition-colors duration-200 flex-1">
                          {step}
                        </span>
                        <ArrowRight size={12} className="shrink-0 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{ color: "rgba(145,4,12,0.6)" }} />
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Highlights — inline dot-separated */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.42 }}
                  className="flex items-center flex-wrap gap-x-3 gap-y-2 mb-10"
                >
                  <span className="text-[9px] uppercase tracking-[0.35em] text-white/20 font-semibold mr-1">Ключевое</span>
                  {expedition.highlights.map((h, i) => (
                    <span key={h} className="flex items-center gap-3">
                      <span className="text-white/50 text-[11px] uppercase tracking-wider font-semibold">{h}</span>
                      {i < expedition.highlights.length - 1 && (
                        <span className="w-1 h-1 rounded-full shrink-0" style={{ background: "rgba(145,4,12,0.5)" }} />
                      )}
                    </span>
                  ))}
                </motion.div>

                {/* CTA row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.44 }}
                  className="flex flex-col sm:flex-row gap-3"
                >
                  <motion.button
                    onClick={() => { onClose(); onNavigate({ page: "contacts" }); }}
                    className="flex-1 flex items-center justify-center gap-2 py-4 text-white uppercase tracking-widest font-bold relative overflow-hidden"
                    style={{ background: "#91040C", borderRadius: 12, fontSize: 11 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <motion.span
                      className="absolute inset-0 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" }}
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                    />
                    <span className="relative">Записаться на экспедицию</span>
                    <ArrowRight size={13} className="relative" />
                  </motion.button>

                  <motion.button
                    onClick={onClose}
                    className="flex items-center justify-center gap-2 px-6 py-4 text-white/50 uppercase tracking-widest font-semibold"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 11 }}
                    whileHover={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.8)" }}
                    whileTap={{ scale: 0.97 }}
                  >
                    Закрыть
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ─── Catalog Section ─── */

function CatalogSection({ onSelectExp }: {
  onSelectExp: (exp: AbkExpedition) => void;
}) {
  const { ref, inView } = useInView(0.05);
  const { expeditions: ctxExps } = useExpeditions();

  // Pull from context: "abkhazia" or "both"; fall back to static data if context is empty
  const displayExps: AbkExpedition[] = ctxExps
    .filter((e) => !e.isDeleted && (e.displayBlock === "abkhazia" || e.displayBlock === "both"))
    .map(mapToAbk);

  return (
    <section ref={ref} className="py-24 md:py-36 px-6 md:px-12 max-w-[1600px] mx-auto">
      <SectionDivider num="04" label="Каталог" />

      <div className="overflow-hidden mb-16">
        <motion.h2
          initial={{ y: "100%" }}
          animate={inView ? { y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-white font-black uppercase leading-none"
          style={{ fontSize: "clamp(36px, 6vw, 88px)", letterSpacing: "-0.02em" }}
        >
          Маршруты <span style={{ color: "#91040C" }}>Абхазии</span>
        </motion.h2>
      </div>

      {displayExps.length === 0 ? (
        <div className="py-20 text-center">
          <div className="text-white/20 text-[11px] uppercase tracking-[0.4em]">
            Нет экспедиций Абхазии — назначьте блок «Экспедиции Абхазии» в панели администратора
          </div>
        </div>
      ) : (
        <div className="flex flex-col" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          {displayExps.map((exp, i) => (
            <ExpeditionCard key={exp.id} exp={exp} index={i} inView={inView} onSelectExp={onSelectExp} />
          ))}
        </div>
      )}
    </section>
  );
}

function ExpeditionCard({ exp, index, inView, onSelectExp }: {
  exp: AbkExpedition;
  index: number;
  inView: boolean;
  onSelectExp: (exp: AbkExpedition) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay: 0.08 + index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex items-stretch cursor-pointer group"
      style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", minHeight: 200 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelectExp(exp)}
    >
      {/* Red left accent line */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-0.5 origin-top z-20"
        style={{ background: "#91040C" }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Index number */}
      <div className="shrink-0 w-16 md:w-20 flex items-start pt-8 pl-4 md:pl-6">
        <motion.span
          className="font-black leading-none select-none"
          style={{ fontSize: "clamp(13px, 1.2vw, 16px)", color: "rgba(255,255,255,0.15)", letterSpacing: "0.08em" }}
          animate={{ color: hovered ? "rgba(145,4,12,0.8)" : "rgba(255,255,255,0.15)" }}
          transition={{ duration: 0.25 }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
      </div>

      {/* Image */}
      <div className="hidden sm:block shrink-0 overflow-hidden my-6"
        style={{ width: 220, borderRadius: 10 }}>
        <motion.img
          src={exp.image}
          alt={exp.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.07 : 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: "block" }}
        />
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-between py-8 px-6 md:px-10 min-w-0">
        {/* Tags row */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-[9px] uppercase tracking-[0.35em] font-bold px-2.5 py-1 rounded-full"
            style={{ background: "rgba(145,4,12,0.15)", color: "#91040C", border: "1px solid rgba(145,4,12,0.3)" }}>
            {exp.days}
          </span>
          <span className="text-[9px] uppercase tracking-[0.35em] text-white/25 font-semibold">
            {exp.character}
          </span>
        </div>

        {/* Title */}
        <div className="overflow-hidden mb-3">
          <motion.h3
            className="text-white font-black uppercase leading-tight"
            style={{ fontSize: "clamp(18px, 2.2vw, 30px)", letterSpacing: "-0.01em" }}
            animate={{ x: hovered ? 6 : 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {exp.title}
          </motion.h3>
        </div>

        {/* Meta + highlights */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <div className="flex items-center gap-1.5 text-white/28 text-[11px]">
            <MapPin size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
            {exp.elevation}
          </div>
          <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.08)" }} />
          <div className="flex items-center gap-1.5 text-white/28 text-[11px]">
            <Mountain size={10} style={{ color: "rgba(255,255,255,0.2)" }} />
            {exp.distance}
          </div>
          <div className="w-px h-3" style={{ background: "rgba(255,255,255,0.08)" }} />
          {exp.highlights.slice(0, 2).map((h) => (
            <span key={h} className="text-white/22 text-[10px] uppercase tracking-wider">{h}</span>
          ))}
        </div>

        {/* Bottom: price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-white/20 text-[9px] uppercase tracking-widest mb-0.5">Стоимость</div>
            <div className="text-white font-black" style={{ fontSize: "clamp(16px, 1.8vw, 22px)", letterSpacing: "-0.01em" }}>
              {exp.price}
            </div>
          </div>
          <motion.div
            className="flex items-center gap-2 uppercase tracking-widest font-bold text-[10px]"
            style={{ color: "#91040C" }}
            animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.6 }}
            transition={{ duration: 0.3 }}
          >
            Открыть <ArrowRight size={12} />
          </motion.div>
        </div>
      </div>

      {/* Background hover glow */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(90deg, rgba(145,4,12,0.04) 0%, transparent 60%)" }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}


/* ─── Final CTA Section ─── */

function FinalCTASection({ onNavigate }: { onNavigate: (r: Route) => void }) {
  const { ref, inView } = useInView(0.1);
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={sectionRef} className="relative min-h-[85vh] flex items-stretch overflow-hidden">
      {/* Left: dark content */}
      <div ref={ref} className="relative z-10 flex flex-col justify-center px-8 md:px-16 py-24 w-full lg:w-1/2"
        style={{ background: "#0B0B0C" }}>
        <div style={grainStyle} />
        <div className="relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            className="text-[10px] uppercase tracking-[0.4em] text-white/20 mb-8">
            Готовы к экспедиции?
          </motion.div>

          <div className="overflow-hidden mb-1">
            <motion.h2
              className="uppercase font-black leading-none"
              style={{ fontSize: "clamp(50px, 8vw, 116px)", letterSpacing: "-0.02em", WebkitTextStroke: "2px rgba(255,255,255,0.12)", color: "transparent" }}
              initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}>
              АБХАЗИЯ
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-10">
            <motion.h2
              className="uppercase font-black leading-none"
              style={{ fontSize: "clamp(50px, 8vw, 116px)", letterSpacing: "-0.02em", color: "#91040C" }}
              initial={{ y: "100%" }} animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.18 }}>
              ЖДЁТ
            </motion.h2>
          </div>

          <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
            className="text-white/38 max-w-sm mb-12 leading-relaxed" style={{ fontSize: 15 }}>
            Запишитесь сейчас — места в экспедициях ограничены. Каждый маршрут формируется под небольшую группу.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4">
            <MagneticButton
              className="inline-flex items-center gap-3 px-10 py-5 text-white uppercase tracking-widest font-bold text-xs"
              style={{ background: "#91040C", border: "2px solid #91040C" }}
              onClick={() => onNavigate({ page: "contacts" })}>
              Записаться на экспедицию <ArrowRight size={14} />
            </MagneticButton>
            <MagneticButton
              className="inline-flex items-center gap-3 px-8 py-5 text-white/65 uppercase tracking-widest font-semibold text-xs"
              style={{ border: "2px solid rgba(255,255,255,0.1)" }}
              onClick={() => onNavigate({ page: "landing" })}>
              Все направления
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Right: photo */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: imgY }}>
          <img src="/abkhazia-hero.png" alt="" aria-hidden className="w-full h-full object-cover scale-110" />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C] via-transparent to-transparent" />
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 70% at 60% 50%, rgba(145,4,12,0.12), transparent)" }} />
      </div>
    </section>
  );
}
