import { motion } from "motion/react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";

interface GTSTermsPageProps {
  onNavigate: (route: Route) => void;
}

export function GTSTermsPage({ onNavigate }: GTSTermsPageProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <section className="pt-32 pb-24 px-6 md:px-12">
        <div className="max-w-[860px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px" style={{ background: "#91040C" }} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-semibold" style={{ color: "#91040C" }}>
                Юридические документы
              </span>
            </div>

            <h1
              className="font-black uppercase leading-none text-white mb-12"
              style={{ fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-0.02em" }}
            >
              Пользовательское<br />
              <span style={{ color: "#91040C" }}>соглашение</span>
            </h1>

            <div className="space-y-10 text-white/60 leading-relaxed" style={{ fontSize: 15 }}>
              <div>
                <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] font-semibold mb-3">Последнее обновление: 1 января 2025</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>1. Предмет соглашения</h2>
                <p>Настоящее Пользовательское соглашение (далее — Соглашение) регулирует отношения между Grand Tour Spirit (далее — GTS) и пользователем при использовании сайта и услуг компании. Использование сайта означает полное и безоговорочное принятие условий данного Соглашения.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>2. Условия использования</h2>
                <p className="mb-3">Пользователь обязуется:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Предоставлять достоверную информацию при оформлении заказов",
                    "Не использовать сайт в противоправных целях",
                    "Не нарушать права третьих лиц",
                    "Соблюдать условия бронирования и оплаты услуг",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: "#91040C" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>3. Услуги и бронирование</h2>
                <p>GTS предоставляет услуги по организации экспедиций, аренде транспортных средств и сопутствующих сервисов. Бронирование считается подтверждённым после получения письменного подтверждения от GTS и внесения предоплаты в установленном размере.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>4. Оплата и возврат</h2>
                <p>Стоимость услуг определяется действующим прайс-листом на момент бронирования. Условия возврата денежных средств устанавливаются индивидуально для каждой услуги и согласовываются при оформлении заказа. При отмене бронирования более чем за 48 часов до начала экспедиции возможен полный возврат предоплаты.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>5. Ответственность сторон</h2>
                <p>GTS несёт ответственность за качество предоставляемых услуг в соответствии с законодательством РФ. GTS не несёт ответственности за ущерб, причинённый вследствие обстоятельств непреодолимой силы (форс-мажор), действий третьих лиц или нарушения пользователем условий настоящего Соглашения.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>6. Интеллектуальная собственность</h2>
                <p>Все материалы сайта (тексты, фотографии, логотипы, дизайн) являются собственностью GTS и защищены законодательством об авторском праве. Копирование и использование материалов без письменного разрешения GTS запрещено.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>7. Изменение условий</h2>
                <p>GTS вправе в одностороннем порядке изменять условия настоящего Соглашения. Изменения вступают в силу с момента их публикации на сайте. Продолжение использования сайта после публикации изменений означает согласие с новыми условиями.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>8. Контактные данные</h2>
                <p>По вопросам, связанным с настоящим Соглашением: <span className="text-white">club@grandtoursochi.ru</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GTSFooter onNavigate={onNavigate} />
    </div>
  );
}
