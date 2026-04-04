import { motion } from "motion/react";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { GTSFooter } from "../GTSFooter";
import { Route } from "../GTSRouter";

interface GTSPrivacyPageProps {
  onNavigate: (route: Route) => void;
}

export function GTSPrivacyPage({ onNavigate }: GTSPrivacyPageProps) {
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
              Политика<br />
              <span style={{ color: "#91040C" }}>конфиденциальности</span>
            </h1>

            <div className="space-y-10 text-white/60 leading-relaxed" style={{ fontSize: 15 }}>
              <div>
                <p className="text-white/30 uppercase tracking-[0.3em] text-[10px] font-semibold mb-3">Последнее обновление: 1 января 2025</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>1. Общие положения</h2>
                <p>Настоящая Политика конфиденциальности определяет порядок обработки и защиты персональных данных пользователей сервисов Grand Tour Spirit (далее — GTS). Используя наш сайт и услуги, вы соглашаетесь с условиями настоящей политики.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>2. Какие данные мы собираем</h2>
                <p className="mb-3">В процессе использования наших услуг мы можем собирать следующие данные:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Имя и контактные данные (телефон, email)",
                    "Данные о бронированиях и заказах",
                    "Технические данные (IP-адрес, тип браузера, устройство)",
                    "Данные о взаимодействии с сайтом",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: "#91040C" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>3. Цели обработки данных</h2>
                <p className="mb-3">Персональные данные используются для:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Обработки и исполнения ваших заказов и бронирований",
                    "Предоставления клиентской поддержки",
                    "Информирования об актуальных предложениях и экспедициях",
                    "Улучшения качества наших услуг",
                    "Соблюдения законодательных требований",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: "#91040C" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>4. Хранение и защита данных</h2>
                <p>Мы принимаем все необходимые технические и организационные меры для защиты ваших персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения. Данные хранятся на защищённых серверах и доступны только уполномоченным сотрудникам.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>5. Передача данных третьим лицам</h2>
                <p>Мы не продаём и не передаём ваши персональные данные третьим лицам без вашего согласия, за исключением случаев, предусмотренных законодательством, или в целях исполнения договора с партнёрами-исполнителями услуг.</p>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>6. Ваши права</h2>
                <p className="mb-3">Вы имеете право:</p>
                <ul className="space-y-2 pl-4">
                  {[
                    "Получить информацию о хранящихся персональных данных",
                    "Потребовать исправления или удаления ваших данных",
                    "Отозвать согласие на обработку данных",
                    "Подать жалобу в уполномоченный орган",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <div className="w-1 h-1 mt-2 flex-shrink-0" style={{ background: "#91040C" }} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-white font-bold uppercase tracking-wide mb-3" style={{ fontSize: 13 }}>7. Контактные данные</h2>
                <p>По всем вопросам, связанным с обработкой персональных данных, обращайтесь: <span className="text-white">club@grandtoursochi.ru</span></p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <GTSFooter onNavigate={onNavigate} />
    </div>
  );
}
