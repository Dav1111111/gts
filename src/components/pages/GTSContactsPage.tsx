import { useState } from "react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
import { motion } from "motion/react";

interface GTSContactsPageProps {
  onNavigate: (route: Route) => void;
}

const CONTACT_ITEMS = [
  {
    icon: Phone,
    title: "Телефон",
    primary: "+7 (862) 555-0123",
    secondary: "Круглосуточно, 7 дней в неделю",
  },
  {
    icon: Mail,
    title: "Email",
    primary: "club@grandtoursochi.ru",
    secondary: "Ответим в течение 1 часа",
  },
  {
    icon: MapPin,
    title: "Адрес",
    primary: "Олимпийский парк, Адлерский район",
    secondary: "Сочи, Краснодарский край, 354340",
  },
  {
    icon: Clock,
    title: "Часы работы офиса",
    primary: "Пн–Пт: 09:00–20:00  ·  Сб–Вс: 10:00–18:00",
    secondary: "Консьерж-сервис: 24/7",
  },
];

export function GTSContactsPage({ onNavigate }: GTSContactsPageProps) {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <main className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[1200px] mx-auto">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-16 lg:mb-20"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                Связь с нами
              </span>
            </div>
            <h1
              className="font-black uppercase leading-none text-white"
              style={{ fontSize: "clamp(36px, 6vw, 88px)", letterSpacing: "-0.02em" }}
            >
              Свяжитесь{" "}
              <span style={{ color: "#91040C" }}>с нами</span>
            </h1>
            <p className="text-white/40 mt-4 max-w-xl leading-relaxed" style={{ fontSize: 15 }}>
              Наша команда готова ответить на любые вопросы и помочь организовать незабываемое приключение
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* LEFT — Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="space-y-px" style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                {CONTACT_ITEMS.map(({ icon: Icon, title, primary, secondary }) => (
                  <div
                    key={title}
                    className="flex items-start gap-5 py-6"
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <div
                      className="w-10 h-10 flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(145,4,12,0.12)", border: "1px solid rgba(145,4,12,0.2)" }}
                    >
                      <Icon className="w-4 h-4" style={{ color: "#91040C" }} />
                    </div>
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] font-semibold text-white/30 mb-1">{title}</div>
                      <div className="text-white text-sm font-medium leading-relaxed">{primary}</div>
                      <div className="text-white/35 text-xs mt-0.5">{secondary}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* RIGHT — Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div
                className="p-8 lg:p-10"
                style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.07)" }}
              >
                <h2 className="text-white font-black uppercase text-xl tracking-wide mb-8" style={{ letterSpacing: "-0.01em" }}>
                  Напишите нам
                </h2>

                {sent ? (
                  <div className="text-center py-12">
                    <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center" style={{ background: "rgba(145,4,12,0.15)", border: "1px solid rgba(145,4,12,0.3)" }}>
                      <Send className="w-5 h-5" style={{ color: "#91040C" }} />
                    </div>
                    <p className="text-white font-semibold mb-2">Сообщение отправлено</p>
                    <p className="text-white/40 text-sm">Мы ответим в течение 1 часа</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                      { key: "name", label: "Ваше имя", placeholder: "Иван Иванов", type: "text" },
                      { key: "email", label: "Email", placeholder: "ivan@example.com", type: "email" },
                      { key: "phone", label: "Телефон", placeholder: "+7 (___) ___-__-__", type: "tel" },
                    ].map(({ key, label, placeholder, type }) => (
                      <div key={key}>
                        <label className="block text-white/40 text-[10px] uppercase tracking-[0.3em] mb-2">{label}</label>
                        <input
                          type={type}
                          value={formData[key as keyof typeof formData]}
                          onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                          placeholder={placeholder}
                          className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-white/20 transition-colors"
                          style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                          onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(145,4,12,0.5)")}
                          onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                        />
                      </div>
                    ))}

                    <div>
                      <label className="block text-white/40 text-[10px] uppercase tracking-[0.3em] mb-2">Сообщение</label>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Расскажите, чем мы можем помочь..."
                        rows={5}
                        className="w-full bg-transparent text-white text-sm px-4 py-3 outline-none placeholder:text-white/20 transition-colors resize-none"
                        style={{ border: "1px solid rgba(255,255,255,0.1)" }}
                        onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(145,4,12,0.5)")}
                        onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full flex items-center justify-center gap-3 py-4 text-white text-xs uppercase tracking-[0.3em] font-bold transition-colors"
                      style={{ background: "#91040C" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
                    >
                      <Send className="w-4 h-4" />
                      Отправить сообщение
                    </button>

                    <p className="text-white/25 text-[10px] text-center">
                      Отправляя форму, вы соглашаетесь с{" "}
                      <button
                        type="button"
                        onClick={() => onNavigate({ page: "privacy" })}
                        className="text-white/40 hover:text-white underline underline-offset-2 transition-colors"
                      >
                        политикой конфиденциальности
                      </button>
                    </p>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </main>

      <GTSFooter onNavigate={onNavigate} />
    </div>
  );
}
