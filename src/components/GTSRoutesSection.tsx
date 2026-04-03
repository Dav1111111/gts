import { motion } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";

const routes = [
  {
    id: "abkhazia",
    title: "АБХАЗИЯ",
    subtitle: "Главное летнее направление",
    tag: "Ежедневные выезды",
    tagColor: "bg-green-500/20 text-green-400 border-green-500/30",
    formats: ["1 день", "2 дня", "3 дня"],
    description: "Основной сезонный продукт GTS. Ежедневные экспедиции — озеро Рица, горные перевалы, альпийские луга.",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80",
    primary: true,
  },
  {
    id: "kavkaz",
    title: "СЕВЕРНЫЙ КАВКАЗ",
    subtitle: "Архыз — Домбай",
    tag: "По расписанию",
    tagColor: "bg-[#91040C]/20 text-[#91040C] border-[#91040C]/30",
    formats: ["3 дня", "5 дней"],
    description: "Флагманские экспедиции по Северному Кавказу. Кисловодск — Архыз — один из самых статусных продуктов GTS.",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
    primary: false,
  },
  {
    id: "crimea",
    title: "КРЫМ",
    subtitle: "Многодневный маршрут",
    tag: "4 дня",
    tagColor: "bg-white/10 text-white/70 border-white/20",
    formats: ["4 дня"],
    description: "Длинное маршрутное движение со сменой рельефа и ландшафтов. Видовые дороги, горный контраст с морем.",
    image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=800&q=80",
    primary: false,
  },
  {
    id: "gelendzhik",
    title: "ГЕЛЕНДЖИК",
    subtitle: "Уикенд-формат",
    tag: "2 дня",
    tagColor: "bg-white/10 text-white/70 border-white/20",
    formats: ["2 дня"],
    description: "Компактный двухдневный экспедиционный формат. Лёгкий вход в многодневные программы для новых гостей.",
    image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?w=800&q=80",
    primary: false,
  },
];

export function GTSRoutesSection() {
  return (
    <div className="relative w-full bg-[#0a0a0a] overflow-hidden">
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-[60px] bg-[#91040C]" />
            <span className="text-[#91040C] uppercase tracking-[0.25em] font-bold text-[11px]">
              Маршрутная линейка
            </span>
          </div>
          <h2
            className="text-white"
            style={{
              fontSize: "clamp(32px, 5vw, 64px)",
              fontWeight: 700,
              letterSpacing: "0.04em",
              lineHeight: 1,
            }}
          >
            МАРШРУТНАЯ ЛИНЕЙКА GTS
          </h2>
          <p className="text-white/50 mt-4 max-w-2xl" style={{ fontSize: "clamp(14px, 1.4vw, 17px)" }}>
            Премиальные маршруты юга России — от ежедневных однодневок до флагманских пятидневных экспедиций.
          </p>
        </motion.div>

        {/* Routes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
          {routes.map((route, i) => (
            <motion.div
              key={route.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer ${
                route.primary ? "md:col-span-2" : ""
              }`}
              whileHover={{ scale: 1.01 }}
            >
              {/* Image */}
              <div className={`relative overflow-hidden ${route.primary ? "h-72 md:h-96" : "h-56 md:h-72"}`}>
                <motion.img
                  src={route.image}
                  alt={route.title}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {route.primary && (
                  <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                )}
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
                {/* Tag */}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-3 w-fit ${route.tagColor}`}>
                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  {route.tag}
                </div>

                <div className={route.primary ? "md:grid md:grid-cols-2 md:gap-8 md:items-end" : ""}>
                  <div>
                    <h3
                      className="text-white font-bold leading-none mb-1"
                      style={{ fontSize: route.primary ? "clamp(32px, 4vw, 52px)" : "clamp(24px, 3vw, 36px)", letterSpacing: "0.05em" }}
                    >
                      {route.title}
                    </h3>
                    <p className="text-white/60 uppercase tracking-wider mb-3" style={{ fontSize: 12 }}>
                      {route.subtitle}
                    </p>
                    <p className="text-white/70 leading-relaxed" style={{ fontSize: "clamp(13px, 1.2vw, 15px)", maxWidth: 480 }}>
                      {route.description}
                    </p>
                  </div>

                  <div className={route.primary ? "mt-4 md:mt-0 flex flex-col items-start md:items-end gap-4" : "mt-4"}>
                    {/* Formats */}
                    <div className="flex flex-wrap gap-2">
                      {route.formats.map((f) => (
                        <span
                          key={f}
                          className="px-3 py-1 rounded-lg text-white/80 text-[11px] font-bold uppercase tracking-wider"
                          style={{ background: "rgba(145,4,12,0.25)", border: "1px solid rgba(145,4,12,0.4)" }}
                        >
                          {f}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      className="flex items-center gap-2 text-white uppercase tracking-[0.15em] font-bold group-hover:text-[#91040C] transition-colors"
                      style={{ fontSize: 12 }}
                      whileHover={{ x: 4 }}
                    >
                      <MapPin className="w-4 h-4" />
                      Смотреть маршрут
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Red border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#91040C]/40 transition-all duration-500" />
            </motion.div>
          ))}
        </div>

        {/* Bottom summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 md:mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 py-6 border-t border-white/10"
        >
          {[
            { label: "Абхазия", desc: "ежедневно" },
            { label: "Северный Кавказ", desc: "по расписанию" },
            { label: "Крым", desc: "4 дня" },
            { label: "Геленджик", desc: "2 дня" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2">
              <span className="text-white font-bold" style={{ fontSize: 14 }}>{item.label}</span>
              <span className="text-white/40" style={{ fontSize: 12 }}>{item.desc}</span>
            </div>
          ))}
          <p className="w-full text-center text-white/40 mt-1" style={{ fontSize: 12 }}>
            Премиальные маршруты юга России для ярких приключений
          </p>
        </motion.div>
      </div>
    </div>
  );
}
