import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  ArrowLeft, 
  Archive, 
  Calendar, 
  Users, 
  BarChart3, 
  Settings, 
  Shield, 
  Clock,
  Eye,
  Download,
  Trash2,
  ExternalLink
} from "lucide-react";

interface ArchiveItem {
  id: string;
  title: string;
  category: "admin" | "modules" | "unifit" | "deprecated";
  description: string;
  dateArchived: string;
  reason: string;
  status: "archived" | "obsolete" | "migrated";
  migrateTo?: string;
  hasData: boolean;
}

interface GTSLegacyArchiveProps {
  onBackToHome: () => void;
}

const archiveItems: ArchiveItem[] = [
  // === MIGRATION 12.03.2024 - FINAL CLEANUP ===
  {
    id: "migration-march-2024",
    title: "🗂️ Финальная миграция legacy системы",
    category: "admin",
    description: "Полное завершение перехода на новую архитектуру модулей GTS",
    dateArchived: "2024-03-12",
    reason: "Все legacy компоненты успешно мигрированы в новую структуру. Admin+, Unifit эксперименты, диагностика и тест порталов убраны из активной навигации.",
    status: "migrated",
    migrateTo: "New_Unified_System",
    hasData: true
  },
  {
    id: "test-components-deprecated",
    title: "🧪 Тестовые компоненты (components/test/)",
    category: "deprecated",
    description: "PortalsDiagnostic.tsx и PortalsNavigationTest.tsx",
    dateArchived: "2024-03-12",
    reason: "Тестовые компоненты больше не используются. Функции диагностики интегрированы в System Health модуль.",
    status: "obsolete",
    hasData: false
  },
  {
    id: "legacy-admin-1",
    title: "Панель управления v1",
    category: "admin",
    description: "Первая версия админ панели с базовой аналитикой",
    dateArchived: "2024-01-15",
    reason: "Заменена унифицированной системой Executive Dashboard",
    status: "migrated",
    migrateTo: "03_Executive_Dashboard",
    hasData: true
  },
  {
    id: "legacy-admin-2", 
    title: "Расширенный админ v2",
    category: "admin",
    description: "Вторая итерация админки с модульной архитектурой",
    dateArchived: "2024-02-20",
    reason: "Интегрирована в новую систему модулей",
    status: "migrated",
    migrateTo: "New_Module_System",
    hasData: true
  },
  {
    id: "legacy-partners-1",
    title: "Старая система партнеров",
    category: "modules",
    description: "Отдельные порталы для каждого типа партнеров",
    dateArchived: "2024-03-01",
    reason: "Объединена в 06_Partners с вкладочной структурой",
    status: "migrated",
    migrateTo: "06_Partners",
    hasData: true
  },
  {
    id: "unifit-crm-1",
    title: "Unifit CRM Experiments",
    category: "unifit",
    description: "Экспериментальные CRM компоненты и воркфлоу",
    dateArchived: "2024-02-10",
    reason: "Полезные компоненты перенесены в основную CRM систему",
    status: "migrated",
    migrateTo: "05_CRM",
    hasData: true
  },
  {
    id: "unifit-operations-1",
    title: "Unifit Operations Board",
    category: "unifit",
    description: "Операционная доска с канбан интерфейсом",
    dateArchived: "2024-01-25",
    reason: "Интегрирована в глобальный календарь",
    status: "migrated",
    migrateTo: "04_Global_Calendar",
    hasData: true
  },
  {
    id: "content-modules-1",
    title: "Старые контентные модули",
    category: "modules",
    description: "Карточки офферов, новостные блоки, статические виджеты",
    dateArchived: "2024-03-05",
    reason: "Перенесены в централизованную CMS систему",
    status: "migrated", 
    migrateTo: "10_CMS",
    hasData: true
  },
  {
    id: "deprecated-ui-1",
    title: "Устаревшие UI компоненты v1",
    category: "deprecated",
    description: "Старые стили и компоненты до введения дизайн-системы",
    dateArchived: "2024-01-10",
    reason: "Заменены новой дизайн-системой GTSUIKit",
    status: "obsolete",
    hasData: false
  },
  {
    id: "deprecated-auth-1",
    title: "Старая система авторизации",
    category: "deprecated", 
    description: "Legacy auth с отдельными login формами",
    dateArchived: "2024-01-20",
    reason: "Заменена unified role picker системой",
    status: "obsolete",
    hasData: false
  },
  {
    id: "unifit-mobile-1",
    title: "Unifit Mobile Prototypes",
    category: "unifit",
    description: "Ранние прототипы мобильного приложения",
    dateArchived: "2024-02-15",
    reason: "Заменены специализированным CrewApp",
    status: "migrated",
    migrateTo: "12_CrewApp_Mobile",
    hasData: false
  },
  {
    id: "legacy-reports-1",
    title: "Старая система отчетов",
    category: "admin",
    description: "Статические отчеты и графики первых версий",
    dateArchived: "2024-03-10",
    reason: "Интегрированы в финансовую систему",
    status: "migrated",
    migrateTo: "08_Finance",
    hasData: true
  },
  {
    id: "portals-navigation-test",
    title: "Тест навигации порталов",
    category: "deprecated",
    description: "Компонент тестирования переходов между порталами",
    dateArchived: "2024-03-12",
    reason: "Убран из внешней навигации, функции интегрированы в System Health",
    status: "migrated",
    migrateTo: "11_Settings_Integrations",
    hasData: false
  },
  {
    id: "portals-diagnostic",
    title: "Диагностика порталов",
    category: "deprecated",
    description: "Диагностический компонент проверки импортов",
    dateArchived: "2024-03-12",
    reason: "Мигрирован в System Health / Diagnostics",
    status: "migrated",
    migrateTo: "11_Settings_Integrations",
    hasData: true
  },
  {
    id: "legacy-finance-tables",
    title: "Финансовые таблицы legacy",
    category: "admin",
    description: "Старые компоненты финансовых отчетов и таблиц",
    dateArchived: "2024-03-12",
    reason: "Мигрированы в централизованную финансовую систему",
    status: "migrated",
    migrateTo: "08_Finance",
    hasData: true
  },
  {
    id: "legacy-documents",
    title: "Документооборот legacy",
    category: "admin",
    description: "Разрозненные компоненты управления документами",
    dateArchived: "2024-03-12",
    reason: "Централизованы в единую систему документооборота",
    status: "migrated",
    migrateTo: "09_Documents_Inbox",
    hasData: true
  },
  {
    id: "legacy-content-blocks",
    title: "Блоки контента legacy",
    category: "content",
    description: "Карточки услуг, новости, SEO компоненты",
    dateArchived: "2024-03-12",
    reason: "Объединены в централизованную CMS систему",
    status: "migrated",
    migrateTo: "10_CMS",
    hasData: true
  }
];

function getCategoryName(category: string): string {
  const names = {
    admin: "Админ панели",
    modules: "Модули",
    unifit: "Unifit эксперименты", 
    deprecated: "Устаревшие"
  };
  return names[category as keyof typeof names] || category;
}

function getCategoryIcon(category: string) {
  const icons = {
    admin: <Shield className="w-4 h-4" />,
    modules: <BarChart3 className="w-4 h-4" />,
    unifit: <Settings className="w-4 h-4" />,
    deprecated: <Clock className="w-4 h-4" />
  };
  return icons[category as keyof typeof icons] || <Archive className="w-4 h-4" />;
}

function getStatusColor(status: string): string {
  const colors = {
    migrated: GTSStyles.badges.success + " text-green-900",
    archived: GTSStyles.badges.default + " text-white",
    obsolete: GTSStyles.badges.destructive + " text-white"
  };
  return colors[status as keyof typeof colors] || GTSStyles.badges.default;
}

function getStatusName(status: string): string {
  const names = {
    migrated: "Мигрирован",
    archived: "Архивирован", 
    obsolete: "Устарел"
  };
  return names[status as keyof typeof names] || status;
}

export function GTSLegacyArchive({ onBackToHome }: GTSLegacyArchiveProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  
  const categories = ["all", "admin", "modules", "unifit", "deprecated"];
  const filteredItems = selectedCategory === "all" 
    ? archiveItems 
    : archiveItems.filter(item => item.category === selectedCategory);

  const stats = {
    total: archiveItems.length,
    migrated: archiveItems.filter(item => item.status === "migrated").length,
    archived: archiveItems.filter(item => item.status === "archived").length,
    obsolete: archiveItems.filter(item => item.status === "obsolete").length,
    withData: archiveItems.filter(item => item.hasData).length
  };

  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={GTSComponents.pageHeader}>
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className={GTSStyles.buttons.ghost}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            
            <div>
              <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                🗄️ 99_Archive - Legacy системы
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Архив устаревших компонентов и миграция в новую структуру
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className={GTSStyles.cards.content + ' p-4'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${GTSStyles.text.muted}`}>Всего элементов</p>
                <p className={`text-2xl font-medium ${GTSStyles.text.primary}`}>{stats.total}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Archive className="w-5 h-5 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className={GTSStyles.cards.content + ' p-4'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${GTSStyles.text.muted}`}>Мигрировано</p>
                <p className={`text-2xl font-medium ${GTSStyles.text.primary}`}>{stats.migrated}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <ExternalLink className="w-5 h-5 text-green-400" />
              </div>
            </div>
          </Card>

          <Card className={GTSStyles.cards.content + ' p-4'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${GTSStyles.text.muted}`}>Архивировано</p>
                <p className={`text-2xl font-medium ${GTSStyles.text.primary}`}>{stats.archived}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-400" />
              </div>
            </div>
          </Card>

          <Card className={GTSStyles.cards.content + ' p-4'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${GTSStyles.text.muted}`}>Устарело</p>
                <p className={`text-2xl font-medium ${GTSStyles.text.primary}`}>{stats.obsolete}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-400" />
              </div>
            </div>
          </Card>

          <Card className={GTSStyles.cards.content + ' p-4'}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm ${GTSStyles.text.muted}`}>С данными</p>
                <p className={`text-2xl font-medium ${GTSStyles.text.primary}`}>{stats.withData}</p>
              </div>
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                <Download className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </Card>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category 
                  ? GTSStyles.buttons.primary
                  : GTSStyles.buttons.secondary
              }
            >
              {category === "all" ? (
                <Archive className="w-4 h-4 mr-2" />
              ) : (
                <>
                  {getCategoryIcon(category)}
                  <span className="ml-2">{getCategoryName(category)}</span>
                </>
              )}
            </Button>
          ))}
        </div>

        {/* Archive Items */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredItems.map(item => (
            <Card key={item.id} className={GTSStyles.cards.default + ' p-6'}>
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gray-500/10 flex items-center justify-center`}>
                    {getCategoryIcon(item.category)}
                  </div>
                  <div>
                    <h3 className={`${GTSComponents.cardTitle} mb-1`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm ${GTSStyles.text.muted}`}>
                      {getCategoryName(item.category)}
                    </p>
                  </div>
                </div>
                <Badge className={getStatusColor(item.status)}>
                  {getStatusName(item.status)}
                </Badge>
              </div>

              <p className={`${GTSStyles.text.muted} text-sm mb-4`}>
                {item.description}
              </p>

              <div className={`p-3 rounded-lg ${GTSStyles.backgrounds.card} mb-4`}>
                <p className={`text-sm ${GTSStyles.text.muted} mb-1`}>
                  <strong>Причина архивации:</strong>
                </p>
                <p className={`text-sm ${GTSStyles.text.primary}`}>
                  {item.reason}
                </p>
              </div>

              {item.migrateTo && (
                <div className={`p-3 rounded-lg bg-green-500/10 mb-4`}>
                  <p className="text-sm text-green-400 mb-1">
                    <strong>Мигрировано в:</strong>
                  </p>
                  <p className="text-sm text-green-300">
                    {item.migrateTo}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-4">
                  <span className={GTSStyles.text.muted}>
                    <Calendar className="w-4 h-4 inline mr-1" />
                    {new Date(item.dateArchived).toLocaleDateString('ru-RU')}
                  </span>
                  {item.hasData && (
                    <Badge variant="outline" className={GTSStyles.badges.secondary}>
                      <Download className="w-3 h-3 mr-1" />
                      Есть данные
                    </Badge>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className={GTSStyles.buttons.ghost}>
                    <Eye className="w-4 h-4" />
                  </Button>
                  {item.hasData && (
                    <Button variant="ghost" size="sm" className={GTSStyles.buttons.ghost}>
                      <Download className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Migration Summary */}
        <Card className={GTSStyles.cards.default + ' p-6 mt-8'}>
          <h3 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
            📋 Сводка миграции
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-3`}>
                ✅ Успешно мигрированы в новые модули:
              </h4>
              <ul className={`space-y-2 text-sm ${GTSStyles.text.muted}`}>
                <li>• 🏛️ Админ панели → 03_Executive_Dashboard</li>
                <li>• 🤝 Партнерские порталы → 06_Partners</li>
                <li>• 📊 CRM эксперименты → 05_CRM</li>
                <li>• 📝 Контентные модули → 10_CMS</li>
                <li>• 📅 Операционные доски → 04_Global_Calendar</li>
                <li>• 📱 Мобильные прототипы → 12_CrewApp_Mobile</li>
                <li>• 💰 Финансовые отчеты → 08_Finance</li>
                <li>• 📄 Документооборот → 09_Documents_Inbox</li>
                <li>• 🔧 Диагностика → 11_Settings_Integrations</li>
                <li>• 👥 Персонал → 07_Staff_IAM</li>
                <li>• 🎨 UI компоненты → 00_UI_Kit</li>
              </ul>
            </div>
            <div>
              <h4 className={`${GTSStyles.text.primary} font-medium mb-3`}>
                🔄 Полностью заменены (12.03.2024):
              </h4>
              <ul className={`space-y-2 text-sm ${GTSStyles.text.muted}`}>
                <li>• ❌ Admin+ (extended-admin) → убран</li>
                <li>• ❌ Unifit эксперименты → убраны</li>
                <li>• ❌ Тест порталов → убран из навигации</li>
                <li>• ❌ Диагностика → мигрирована в System Health</li>
                <li>• ✅ UI компоненты v1 → GTSUIKit v2.1</li>
                <li>• ✅ Legacy авторизация → Role Picker</li>
                <li>• ✅ Отдельные админ порталы → Unified Shell</li>
                <li>• ✅ Финансовые таблицы → централизованы</li>
                <li>• ✅ Документооборот → единая система</li>
                <li>• ✅ Контент блоки → CMS система</li>
              </ul>
              
              <h4 className={`${GTSStyles.text.primary} font-medium mb-3 mt-4`}>
                Сохранены архивы с данными:
              </h4>
              <p className={`text-sm ${GTSStyles.text.muted} mb-4`}>
                {stats.withData} элементов содержат исторические данные и доступны для экспорта
              </p>
              
              <div className={`p-4 bg-green-500/10 rounded-lg`}>
                <div className={`text-green-400 font-medium mb-2`}>🎯 Статус новой системы GTS (12.03.2024):</div>
                <div className={`text-sm text-green-300 mb-2`}>
                  ✅ 00_UI_Kit • 01_Login • 02_Shell • 03_Executive • 06_Partners • 07_Staff • 08_Finance • 09_Docs • 10_CMS • 11_Settings
                </div>
                <div className={`text-sm text-yellow-300 mb-2`}>
                  🔄 04_Calendar • 05_CRM • 12_CrewApp • 13_B2B • 14_ClientClub
                </div>
                <div className={`text-xs text-green-400 mt-2 opacity-75`}>
                  10 из 15 модулей готовы • Legacy система полностью мигрирована в 99_Archive
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}