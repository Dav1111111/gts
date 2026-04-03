import { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, MapPin, Clock, Gauge, Users } from "lucide-react";

interface PopupExpedition {
  id: string;
  title: string;
  dateRange: string;
  duration: string;
  location: string;
  price: string;
  difficulty: string;
  spots: { total: number; booked: number };
  description: string;
  highlights: string[];
  image: string;
  status: string;
}

interface GTSExpeditionPopupProps {
  expedition: PopupExpedition | null;
  onClose: () => void;
  onNavigate: (route: { page: string; id?: string }) => void;
}

export function GTSExpeditionPopup({ expedition, onClose, onNavigate }: GTSExpeditionPopupProps) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  /* lock body scroll while open */
  useEffect(() => {
    if (!expedition) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [expedition]);

  const spotsLeft = expedition ? expedition.spots.total - expedition.spots.booked : 0;
  const isSoldOut = spotsLeft <= 0;

  const statusLabel = expedition?.status === "upcoming"
    ? "Скоро"
    : expedition?.status === "closed"
    ? "Закрыта"
    : "Завершена";

  return (
    <AnimatePresence>
      {expedition && (
        <>
          {/* ── Backdrop ── */}
          <motion.div
            className="fixed inset-0 z-[1200]"
            style={{ background: "rgba(4,4,6,0.78)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
          />

          {/* ── Card wrapper ── */}
          <div className="fixed inset-0 z-[1201] flex items-center justify-center px-4 py-6 pointer-events-none">
            <motion.div
              className="relative overflow-hidden pointer-events-auto w-full"
              style={{
                maxWidth: 700,
                background: "rgba(11,11,12,0.98)",
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 18,
                boxShadow: "0 40px 100px rgba(0,0,0,0.7), 0 0 0 1px rgba(145,4,12,0.15)",
              }}
              initial={{ opacity: 0, scale: 0.9, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 16 }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* grain texture */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  opacity: 0.04,
                  zIndex: 0,
                }}
              />

              {/* top red accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-px z-10"
                style={{ background: "linear-gradient(90deg, transparent, #91040C 40%, transparent)" }}
              >
                <motion.div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)" }}
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* close button */}
              <motion.button
                onClick={onClose}
                className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.09)" }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(145,4,12,0.35)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.18 }}
              >
                <X size={13} className="text-white/60" />
              </motion.button>

              {/* ── Layout ── */}
              <div className="flex flex-col sm:flex-row relative z-10">

                {/* LEFT: image */}
                <div
                  className="relative sm:w-[42%] overflow-hidden"
                  style={{ minHeight: 240, borderRadius: "18px 0 0 18px" }}
                >
                  <motion.img
                    src={expedition.image}
                    alt={expedition.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    initial={{ scale: 1.06 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  />
                  {/* gradients */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[rgba(11,11,12,0.5)]" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[rgba(11,11,12,0.75)] via-transparent to-transparent" />

                  {/* status badge */}
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-2.5 py-1 rounded-full text-[9px] uppercase tracking-widest font-bold text-white"
                      style={{
                        background: expedition.status === "upcoming" ? "rgba(145,4,12,0.88)" : "rgba(0,0,0,0.65)",
                        backdropFilter: "blur(8px)",
                      }}
                    >
                      {statusLabel}
                    </span>
                  </div>

                  {/* price */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-white/35 text-[9px] uppercase tracking-widest mb-0.5">Стоимость</div>
                    <div className="text-white font-black text-xl leading-none">{expedition.price}</div>
                  </div>
                </div>

                {/* RIGHT: content */}
                <div className="sm:w-[58%] flex flex-col p-6 sm:p-7">
                  {/* date */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 }}
                    className="text-[10px] uppercase tracking-[0.35em] font-semibold mb-2"
                    style={{ color: "#91040C" }}
                  >
                    {expedition.dateRange}
                  </motion.div>

                  {/* title */}
                  <div className="overflow-hidden mb-3">
                    <motion.h2
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                      className="text-white font-black uppercase leading-tight"
                      style={{ fontSize: "clamp(16px, 2.2vw, 20px)", letterSpacing: "-0.01em" }}
                    >
                      {expedition.title}
                    </motion.h2>
                  </div>

                  {/* description */}
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-white/40 leading-relaxed mb-5"
                    style={{ fontSize: 12.5 }}
                  >
                    {expedition.description.length > 130
                      ? expedition.description.slice(0, 130) + "…"
                      : expedition.description}
                  </motion.p>

                  {/* meta grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                    className="grid grid-cols-2 gap-x-4 gap-y-3 mb-5"
                  >
                    {[
                      { icon: MapPin,  label: "Регион",         val: expedition.location },
                      { icon: Clock,   label: "Длительность",   val: expedition.duration },
                      { icon: Gauge,   label: "Сложность",      val: expedition.difficulty },
                      {
                        icon: Users,
                        label: "Мест осталось",
                        val: isSoldOut ? "Нет мест" : `${spotsLeft} из ${expedition.spots.total}`,
                      },
                    ].map(({ icon: Icon, label, val }) => (
                      <div key={label} className="flex items-start gap-2">
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(145,4,12,0.12)" }}
                        >
                          <Icon size={11} style={{ color: "#91040C" }} />
                        </div>
                        <div>
                          <div className="text-white/25 text-[9px] uppercase tracking-widest leading-none mb-0.5">{label}</div>
                          <div className="text-white/80 text-xs font-semibold leading-tight">{val}</div>
                        </div>
                      </div>
                    ))}
                  </motion.div>

                  {/* highlights */}
                  {expedition.highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.28 }}
                      className="flex flex-wrap gap-1.5 mb-6"
                    >
                      {expedition.highlights.slice(0, 4).map((h) => (
                        <span
                          key={h}
                          className="px-2 py-0.5 rounded text-[10px] text-white/45"
                          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.07)" }}
                        >
                          {h}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  {/* CTA button */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.32 }}
                    className="mt-auto"
                  >
                    <motion.button
                      onClick={() => {
                        onClose();
                        onNavigate({ page: "experience-detail", id: expedition.id });
                      }}
                      className="w-full flex items-center justify-center gap-2 py-3.5 text-white uppercase tracking-widest font-bold relative overflow-hidden"
                      style={{ background: "#91040C", borderRadius: 10, fontSize: 11 }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {/* hover sweep */}
                      <motion.span
                        className="absolute inset-0 pointer-events-none"
                        style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }}
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative">Подробнее об экспедиции</span>
                      <ArrowRight size={13} className="relative" />
                    </motion.button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
