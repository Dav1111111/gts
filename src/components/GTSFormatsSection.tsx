import { motion } from "motion/react";
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react";

const participationFormats = [
  {
    icon: "🏎️",
    title: "Участие на своей технике",
    description:
      "Гость едет на собственной технике и оплачивает маршрут, сопровождение, организацию и сервис колонны.",
  },
  {
    icon: "🧑‍🤝‍🧑",
    title: "Пассажирское место",
    description:
      "Основной входной формат. Гость участвует в маршруте пассажиром в составе организованного экипажа.",
    highlight: true,
  },
  {
    icon: "🚙",
    title: "4-местный багги целиком",
    description: "Формат для семьи, компании друзей или private-группы.",
  },
  {
    icon: "🏁",
    title: "2-местный багги целиком",
    description:
      "Самый драйверский формат с максимальной вовлечённостью в управление техникой.",
  },
];

const included = [
  "Маршрутная программа",
  "Сопровождение",
  "Ведущий экипаж",
  "Организационная координация",
  "Питание по программе",
  "Багги (при выборе формата аренды)",
  "Размещение (многодневные маршруты)",
];

const extra = [
  "Private-формат",
  "Персональный трансфер",
  "Индивидуальные условия для группы",
  "Специальные сценарии для корпоративных запросов",
];

export function GTSFormatsSection() {
  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Separator top */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#91040C]/60 to-transparent" />

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-20 md:py-28">
        {/* Section header */}
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
              Форматы & Включено
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
            ФОРМАТЫ УЧАСТИЯ
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* LEFT: Participation formats */}
          <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {participationFormats.map((format, i) => (
                <motion.div
                  key={format.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={`group relative p-5 md:p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    format.highlight
                      ? "border-2 border-[#91040C] bg-gradient-to-br from-[#91040C]/15 to-[#91040C]/5"
                      : "border border-white/10 bg-white/[0.03] hover:border-[#91040C]/40 hover:bg-white/[0.05]"
                  }`}
                  whileHover={{ y: -4 }}
                >
                  {format.highlight && (
                    <div className="absolute top-3 right-3 bg-[#91040C] px-2 py-0.5 rounded-full">
                      <span className="text-white text-[9px] font-bold uppercase tracking-wider">
                        Популярный
                      </span>
                    </div>
                  )}

                  <div className="text-3xl mb-4">{format.icon}</div>
                  <h3
                    className="text-white font-bold mb-2 leading-tight"
                    style={{ fontSize: "clamp(13px, 1.3vw, 15px)" }}
                  >
                    {format.title}
                  </h3>
                  <p
                    className="text-white/60 leading-relaxed"
                    style={{ fontSize: "clamp(12px, 1.1vw, 13px)" }}
                  >
                    {format.description}
                  </p>

                  {format.highlight && (
                    <motion.div
                      className="absolute -inset-1 bg-gradient-to-r from-[#91040C]/0 via-[#91040C]/20 to-[#91040C]/0 rounded-2xl blur-xl -z-10"
                      animate={{ opacity: [0.3, 0.7, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <motion.button
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex items-center gap-3 px-6 py-4 rounded-xl text-white uppercase tracking-[0.15em] font-bold transition-all"
              style={{ background: "#91040C", fontSize: "clamp(11px, 1.1vw, 13px)" }}
              whileHover={{ background: "#6d0309", scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Выбрать формат
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </div>

          {/* RIGHT: What's included */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <h3
                className="text-white font-bold mb-6"
                style={{
                  fontSize: "clamp(20px, 2.5vw, 32px)",
                  letterSpacing: "0.04em",
                }}
              >
                ЧТО ВХОДИТ В ПРОДУКТ
              </h3>

              {/* Included list */}
              <div
                className="p-6 md:p-8 rounded-2xl mb-6"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(145,4,12,0.1) 0%, rgba(145,4,12,0.03) 100%)",
                  border: "1px solid rgba(145,4,12,0.25)",
                }}
              >
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] font-bold mb-5">
                  Базовый формат включает
                </p>
                <div className="space-y-3">
                  {included.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2
                        className="w-4 h-4 flex-shrink-0"
                        style={{ color: "#91040C" }}
                      />
                      <span
                        className="text-white/80"
                        style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Extra */}
              <div
                className="p-6 rounded-2xl"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-white/50 uppercase tracking-[0.2em] text-[10px] font-bold mb-4">
                  Дополнительно
                </p>
                <div className="space-y-2.5">
                  {extra.map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + i * 0.06 }}
                      className="flex items-center gap-3"
                    >
                      <ChevronRight
                        className="w-4 h-4 flex-shrink-0 text-[#91040C]"
                      />
                      <span
                        className="text-white/60"
                        style={{ fontSize: "clamp(12px, 1.1vw, 14px)" }}
                      >
                        {item}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Separator bottom */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
