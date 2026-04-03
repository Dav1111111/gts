import { motion } from "motion/react";
import { Calendar, ArrowRight, CheckCircle2, Truck } from "lucide-react";
const abkhaziaImage = "/abkhazia-hero.png";

export function GTSAbkhaziaHeroSection() {
  return (
    <div className="relative w-full bg-black overflow-hidden">
      {/* Flagship Line - Top Border */}
      <div className="relative h-1.5 bg-gradient-to-r from-transparent via-[#91040C] to-transparent">
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
          animate={{ x: ['-100%', '100%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          style={{ opacity: 0.3 }}
        />
      </div>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 lg:px-12 py-16 md:py-20 lg:py-28">
        {/* Hero Split Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16 lg:mb-24">
          {/* Left: Image with Floating Stats */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative overflow-hidden rounded-2xl lg:rounded-3xl">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6 }}
              >
                <img
                  src={abkhaziaImage}
                  alt="Абхазия - багги в горах"
                  className="w-full h-auto object-cover"
                  style={{ aspectRatio: '16/10' }}
                />
              </motion.div>

              {/* Dark overlay for contrast */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />

              {/* Flagship Badge - Floating */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="absolute top-4 md:top-6 left-4 md:left-6 right-4 md:right-6 z-10"
              >
                <div
                  className="inline-flex items-center gap-2 md:gap-3 px-3 md:px-5 py-2 md:py-3 rounded-xl backdrop-blur-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(145,4,12,0.95) 0%, rgba(109,3,9,0.95) 100%)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    boxShadow: '0 8px 32px rgba(145,4,12,0.5)'
                  }}
                >
                  <div className="flex items-center gap-1.5 md:gap-2">
                    <div className="relative">
                      <motion.div
                        className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.4, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <motion.div
                        className="absolute inset-0 w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-green-400"
                        animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <span className="text-white uppercase tracking-[0.15em] md:tracking-[0.2em] font-bold text-[9px] md:text-[11px]">
                      Флагманский продукт
                    </span>
                  </div>
                  <div className="h-3 md:h-4 w-px bg-white/30" />
                  <span className="text-green-300 uppercase tracking-[0.12em] md:tracking-[0.15em] font-bold text-[9px] md:text-[11px]">
                    70% выручки
                  </span>
                </div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-4 md:bottom-6 left-4 md:left-6 right-4 md:right-6 flex gap-2 md:gap-3"
              >
                {[
                  { label: 'Ежедневно', value: '365' },
                  { label: 'Клиентов/мес', value: '1200+' },
                  { label: 'Рейтинг', value: '4.9' }
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + i * 0.1 }}
                    className="flex-1 p-2 md:p-4 rounded-lg md:rounded-xl backdrop-blur-xl"
                    style={{
                      background: 'rgba(0,0,0,0.6)',
                      border: '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    <div className="text-[#91040C] text-lg md:text-2xl font-bold leading-none mb-0.5 md:mb-1">
                      {stat.value}
                    </div>
                    <div className="text-white/70 text-[8px] md:text-[10px] uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              {/* Red Glow */}
              <div
                className="absolute -inset-4 -z-10 blur-3xl opacity-40"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(145,4,12,0.6), transparent 70%)' }}
              />
            </div>
          </motion.div>

          {/* Right: Title and Description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex flex-col justify-center order-1 lg:order-2"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full"
              style={{
                background: 'rgba(145,4,12,0.1)',
                border: '1px solid rgba(145,4,12,0.3)',
                width: 'fit-content'
              }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#91040C]"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-[#91040C] uppercase tracking-[0.2em] font-bold text-[10px] md:text-[11px]">
                Доступны ежедневно
              </span>
            </motion.div>

            <h2
              className="text-white mb-4 md:mb-6"
              style={{
                fontSize: "clamp(42px, 7vw, 80px)",
                fontWeight: 700,
                letterSpacing: "0.06em",
                lineHeight: 0.95
              }}
            >
              АБХАЗИЯ
            </h2>

            <div className="flex items-center gap-4 mb-6 md:mb-8">
              <div className="h-1 flex-1 max-w-[120px] bg-gradient-to-r from-[#91040C] to-transparent" />
              <p
                className="text-white/90"
                style={{
                  fontSize: "clamp(16px, 2.2vw, 24px)",
                  letterSpacing: "0.12em",
                  fontWeight: 600,
                  textTransform: 'uppercase'
                }}
              >
                Багги · Горы · Приключения
              </p>
            </div>

            <p
              className="text-white/70 leading-relaxed mb-8 md:mb-10"
              style={{
                fontSize: "clamp(15px, 1.5vw, 18px)",
                lineHeight: 1.7,
                maxWidth: '600px'
              }}
            >
              Ежедневные экспедиции в Абхазию на премиальных багги. Выберите формат: однодневный экспресс через озеро Рица, двухдневная классика с ночёвкой в горах или трёхдневное погружение с полным маршрутом.
            </p>

            {/* Daily Tours Highlight */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="relative p-6 md:p-8 rounded-2xl overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(145,4,12,0.15) 0%, rgba(145,4,12,0.05) 100%)',
                border: '1px solid rgba(145,4,12,0.3)'
              }}
            >
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
                    backgroundSize: "20px 20px"
                  }}
                />
              </div>

              <div className="relative flex items-center gap-4 md:gap-6">
                <motion.div
                  className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-[#91040C] flex items-center justify-center"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Calendar className="w-6 h-6 md:w-7 md:h-7 text-white" />
                </motion.div>
                <div className="flex-1">
                  <div className="text-white uppercase tracking-[0.15em] md:tracking-[0.25em] font-bold mb-1" style={{ fontSize: "clamp(13px, 1.5vw, 16px)" }}>
                    Выезды каждый день
                  </div>
                  <div className="text-white/60" style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}>
                    Бронируйте на любую дату • Без ожидания группы
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Tour Options - Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16">
          <motion.div
            className="group relative p-6 md:p-8 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-[#91040C]/50 transition-all duration-500 cursor-pointer overflow-hidden"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#91040C] group-hover:text-white transition-colors" style={{ fontSize: "clamp(48px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}>1</span>
                  <span className="text-white/60 uppercase tracking-wider" style={{ fontSize: 12 }}>день</span>
                </div>
                <Truck className="w-8 h-8 text-white/20 group-hover:text-[#91040C]/40 transition-colors" />
              </div>
              <div className="mb-6">
                <div className="text-white" style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700 }}>
                  от 24 900 ₽
                </div>
                <div className="text-white/40 mt-1" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  На человека
                </div>
              </div>
              <div className="text-white/70 leading-relaxed mb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
                Озеро Рица, водопады, горные панорамы
              </div>
              <div className="flex items-center text-[#91040C] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 13 }}>
                <span>Выбрать</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#91040C]/0 to-[#91040C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>

          <motion.div
            className="group relative p-6 md:p-8 rounded-2xl border-2 border-[#91040C] bg-gradient-to-br from-[#91040C]/20 to-[#91040C]/5 hover:from-[#91040C]/30 hover:to-[#91040C]/10 transition-all duration-500 cursor-pointer overflow-hidden"
            whileHover={{ y: -6, scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Popular Badge */}
            <div className="absolute top-4 right-4 bg-[#91040C] px-3 py-1.5 rounded-full z-20">
              <span className="text-white uppercase tracking-wider" style={{ fontSize: 9, fontWeight: 700 }}>
                Популярный
              </span>
            </div>

            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-white" style={{ fontSize: "clamp(48px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}>2</span>
                  <span className="text-white/80 uppercase tracking-wider" style={{ fontSize: 12 }}>дня</span>
                </div>
                <Truck className="w-8 h-8 text-white/30" />
              </div>
              <div className="mb-6">
                <div className="text-white" style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700 }}>
                  от 38 900 ₽
                </div>
                <div className="text-white/50 mt-1" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  На человека
                </div>
              </div>
              <div className="text-white/80 leading-relaxed mb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
                Горы + побережье, отель 4★, полный пакет
              </div>
              <div className="flex items-center text-white" style={{ fontSize: 13 }}>
                <span>Выбрать</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>

            {/* Glow effect */}
            <motion.div
              className="absolute -inset-1 bg-gradient-to-r from-[#91040C]/0 via-[#91040C]/30 to-[#91040C]/0 rounded-2xl blur-xl -z-10"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
          </motion.div>

          <motion.div
            className="group relative p-6 md:p-8 rounded-2xl border-2 border-white/10 bg-gradient-to-br from-white/5 to-white/[0.02] hover:border-[#91040C]/50 transition-all duration-500 cursor-pointer overflow-hidden"
            whileHover={{ y: -6 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-baseline gap-3">
                  <span className="text-[#91040C] group-hover:text-white transition-colors" style={{ fontSize: "clamp(48px, 6vw, 64px)", fontWeight: 700, lineHeight: 1 }}>3</span>
                  <span className="text-white/60 uppercase tracking-wider" style={{ fontSize: 12 }}>дня</span>
                </div>
                <Truck className="w-8 h-8 text-white/20 group-hover:text-[#91040C]/40 transition-colors" />
              </div>
              <div className="mb-6">
                <div className="text-white" style={{ fontSize: "clamp(28px, 3vw, 36px)", fontWeight: 700 }}>
                  от 52 900 ₽
                </div>
                <div className="text-white/40 mt-1" style={{ fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  На человека
                </div>
              </div>
              <div className="text-white/70 leading-relaxed mb-4" style={{ fontSize: "clamp(13px, 1.2vw, 15px)" }}>
                Полный маршрут в горах с ночёвками
              </div>
              <div className="flex items-center text-[#91040C] opacity-0 group-hover:opacity-100 transition-opacity" style={{ fontSize: 13 }}>
                <span>Выбрать</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#91040C]/0 to-[#91040C]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </div>

        {/* Features & CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-8 md:pt-12 border-t border-white/10"
        >
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            {["Premium багги", "Опытный гид", "Питание включено", "Фото/видео съёмка"].map((f, i) => (
              <motion.div
                key={f}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="flex items-center gap-2 text-white/70"
                style={{ fontSize: "clamp(12px, 1.2vw, 14px)" }}
              >
                <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 flex-shrink-0" style={{ color: "#91040C" }} />
                <span>{f}</span>
              </motion.div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <motion.button
              className="flex-1 flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 rounded-xl text-white uppercase tracking-[0.12em] md:tracking-[0.15em] transition-all duration-200"
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                background: "#91040C",
                border: "2px solid #91040C",
                fontWeight: 700
              }}
              whileHover={{ background: "#6d0309", scale: 1.02, boxShadow: "0 10px 30px rgba(145,4,12,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Забронировать
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>

            <motion.button
              className="flex-1 flex items-center justify-center gap-3 px-6 md:px-8 py-4 md:py-5 rounded-xl uppercase tracking-[0.12em] md:tracking-[0.15em] transition-all duration-200"
              style={{
                fontSize: "clamp(11px, 1.1vw, 13px)",
                background: "rgba(0,0,0,0)",
                border: "2px solid rgba(255,255,255,0.2)",
                color: "rgba(255,255,255,0.8)",
                fontWeight: 700
              }}
              whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.4)" }}
              whileTap={{ scale: 0.98 }}
            >
              Подробнее
              <ArrowRight className="w-4 h-4 md:w-5 md:h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
