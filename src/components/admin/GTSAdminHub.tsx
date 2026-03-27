import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { LayoutDashboard, Compass, Globe, ArrowRight, LogOut, Home } from "lucide-react";
import type { Route } from "../GTSRouter";

interface AdminUser {
  name: string;
  email: string;
  role: string;
}

interface GTSAdminHubProps {
  user: AdminUser;
  onNavigate: (route: Route) => void;
  onLogout: () => void;
  onBackToHome: () => void;
}

const sections: Array<{
  id: Extract<Route, { page: "executive-panel" | "expeditions-admin" | "content-admin" }>["page"];
  title: string;
  description: string;
  icon: typeof LayoutDashboard;
  accent: string;
  points: string[];
}> = [
  {
    id: "executive-panel",
    title: "Панель управления",
    description: "Общая управленческая зона: CRM, аналитика, staff, финансы и остальные служебные модули.",
    icon: LayoutDashboard,
    accent: "from-[#91040C] to-[#D0131F]",
    points: ["CRM и бронирования", "Финансы и аналитика", "Операции и staff"],
  },
  {
    id: "expeditions-admin",
    title: "Экспедиции",
    description: "Редактирование маршрутов, дат, карточек и календарной шкалы экспедиций.",
    icon: Compass,
    accent: "from-[#6B0B10] to-[#9A2A12]",
    points: ["Добавить и удалить", "Даты и статус", "Карта экспедиций"],
  },
  {
    id: "content-admin",
    title: "Контент сайта",
    description: "No-code управление карточками, предложениями, впечатлениями, отзывами и секциями сайта.",
    icon: Globe,
    accent: "from-[#7A1116] to-[#A5262C]",
    points: ["Лендинг и CMS", "Карточки и офферы", "Отзывы и лента"],
  },
];

export function GTSAdminHub({ user, onNavigate, onLogout, onBackToHome }: GTSAdminHubProps) {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      <div className="border-b border-white/10 bg-[#111113]">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div>
            <div className="text-[10px] uppercase tracking-[0.24em] text-white/40">GTS Admin</div>
            <h1 className="mt-2 text-2xl tracking-[0.06em] sm:text-3xl">Единая админка</h1>
            <p className="mt-2 max-w-2xl text-sm text-white/50 sm:text-base">
              Один вход для всех рабочих разделов. Выбери нужную зону и продолжай работу без прыжков между разными маршрутами.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap">
            <Button
              variant="outline"
              onClick={onBackToHome}
              className="border-white/15 bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
            >
              <Home className="mr-2 h-4 w-4" />
              На сайт
            </Button>
            <Button
              variant="outline"
              onClick={onLogout}
              className="border-white/15 bg-transparent text-white/70 hover:bg-white/5 hover:text-white"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Выйти
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:grid-cols-3 sm:p-5">
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Пользователь</div>
            <div className="mt-2 text-lg">{user.name}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Email</div>
            <div className="mt-2 break-all text-sm text-white/70 sm:text-base">{user.email}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-white/40">Роль</div>
            <div className="mt-2 text-sm uppercase tracking-[0.16em] text-[#D6A1A4]">{user.role}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {sections.map((section) => {
            const Icon = section.icon;

            return (
              <Card
                key={section.id}
                className="flex h-full flex-col border-white/10 bg-[#121214] p-5 transition-colors hover:border-[#91040C]/40"
              >
                <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${section.accent}`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                <div className="mb-3 text-2xl tracking-[0.04em]">{section.title}</div>
                <p className="mb-5 text-sm leading-relaxed text-white/55">{section.description}</p>

                <div className="mb-6 space-y-2 text-sm text-white/60">
                  {section.points.map((point) => (
                    <div key={point} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#91040C]" />
                      {point}
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <Button
                    onClick={() => onNavigate({ page: section.id })}
                    className="w-full bg-[#91040C] text-white hover:bg-[#7A030A]"
                  >
                    Открыть раздел
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}
