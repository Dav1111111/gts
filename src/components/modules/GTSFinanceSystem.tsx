import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSStyles, GTSComponents, getStatusColor, getStatusText } from "../../utils/gts-styles";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  CreditCard,
  FileText,
  ArrowLeft,
  Search,
  Filter,
  Download,
  Calendar,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

/**
 * 08_Finance - Централизованная финансовая система
 * 
 * МИГРАЦИЯ: Объединяет все финансовые модули из legacy системы:
 * - [LEGACY] Финансовые таблицы → Revenue Tab
 * - [LEGACY] Отчеты по выплатам → Payouts Tab  
 * - [LEGACY] Системы расходов → Costs Tab
 * - [LEGACY] Генерация отчетов → Reports Tab
 * 
 * ✅ Все финансовые данные централизованы
 * ✅ Выплаты партнерам и подрядчикам
 * ✅ Структура расходов с аналитикой
 * ✅ Автоматическая генерация отчетов
 */

interface GTSFinanceSystemProps {
  onBackToHome: () => void;
}

const revenueData = [
  { month: 'Янв', revenue: 2450000, costs: 1680000, profit: 770000 },
  { month: 'Фев', revenue: 2780000, costs: 1820000, profit: 960000 },
  { month: 'Мар', revenue: 3200000, costs: 2100000, profit: 1100000 },
  { month: 'Апр', revenue: 2950000, costs: 1950000, profit: 1000000 },
  { month: 'Май', revenue: 3650000, costs: 2300000, profit: 1350000 },
  { month: 'Июн', revenue: 4200000, costs: 2600000, profit: 1600000 }
];

const costBreakdown = [
  { category: 'Персонал', amount: 1200000, percentage: 35, color: 'bg-blue-500' },
  { category: 'Топливо', amount: 800000, percentage: 23, color: 'bg-red-500' },
  { category: 'Техобслуживание', amount: 600000, percentage: 18, color: 'bg-yellow-500' },
  { category: 'Аренда', amount: 400000, percentage: 12, color: 'bg-green-500' },
  { category: 'Маркетинг', amount: 250000, percentage: 7, color: 'bg-purple-500' },
  { category: 'Прочее', amount: 150000, percentage: 5, color: 'bg-gray-500' }
];

const payouts = [
  {
    id: '1',
    recipient: 'Елена Смирнова',
    type: 'Комиссия агента',
    amount: 125000,
    status: 'pending',
    dueDate: '2024-02-20',
    period: 'Январь 2024'
  },
  {
    id: '2',
    recipient: 'ООО "Морской Флот"',
    type: 'Подрядчик',
    amount: 480000,
    status: 'paid',
    dueDate: '2024-02-15',
    period: 'Январь 2024'
  },
  {
    id: '3',
    recipient: 'Михаил Козлов',
    type: 'Комиссия агента',
    amount: 89000,
    status: 'pending',
    dueDate: '2024-02-20',
    period: 'Январь 2024'
  }
];

const reports = [
  {
    id: '1',
    name: 'Финансовый отчет за январь',
    type: 'Ежемесячный',
    generated: '2024-02-01',
    status: 'ready',
    format: 'PDF'
  },
  {
    id: '2',
    name: 'Отчет по партнерам Q1',
    type: 'Квартальный',
    generated: '2024-01-31',
    status: 'ready',
    format: 'Excel'
  },
  {
    id: '3',
    name: 'Налоговый отчет',
    type: 'Годовой',
    generated: '2024-01-30',
    status: 'draft',
    format: 'PDF'
  }
];

const kpiMetrics = [
  {
    title: 'Общая выручка',
    value: '₽3,650,000',
    change: '+18.2%',
    trend: 'up' as const,
    period: 'За май 2024'
  },
  {
    title: 'Чистая прибыль',
    value: '₽1,350,000',
    change: '+22.1%',
    trend: 'up' as const,
    period: 'За май 2024'
  },
  {
    title: 'Средний чек',
    value: '₽87,500',
    change: '+5.4%',
    trend: 'up' as const,
    period: 'За май 2024'
  },
  {
    title: 'Расходы',
    value: '₽2,300,000',
    change: '+12.3%',
    trend: 'up' as const,
    period: 'За май 2024'
  }
];

export function GTSFinanceSystem({ onBackToHome }: GTSFinanceSystemProps) {
  const [activeTab, setActiveTab] = useState('revenue');
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={GTSComponents.pageHeader}>
        <div className={GTSStyles.layout.flexBetween}>
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
                Финансовый центр
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Выручка • Расходы • Выплаты • Отчеты
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className={`flex items-center ${GTSStyles.backgrounds.card} rounded-lg p-1`}>
              <Button
                variant={selectedPeriod === 'week' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('week')}
                className={selectedPeriod === 'week' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Неделя
              </Button>
              <Button
                variant={selectedPeriod === 'month' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('month')}
                className={selectedPeriod === 'month' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Месяц
              </Button>
              <Button
                variant={selectedPeriod === 'quarter' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setSelectedPeriod('quarter')}
                className={selectedPeriod === 'quarter' ? 
                  GTSStyles.buttons.primary : 
                  GTSStyles.buttons.ghost
                }
              >
                Квартал
              </Button>
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className={GTSStyles.buttons.secondary}
            >
              <Download className="w-4 h-4 mr-2" />
              Экспорт
            </Button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className={`p-6 border-b ${GTSStyles.borders.default}`}>
        <div className={GTSStyles.layout.grid4}>
          {kpiMetrics.map((metric, index) => (
            <Card key={index} className={GTSStyles.cards.default + ' p-6'}>
              <div className={GTSStyles.layout.flexBetween}>
                <div>
                  <p className={GTSComponents.metaText}>{metric.title}</p>
                  <p className={`text-2xl ${GTSStyles.text.primary} font-semibold mt-1`}>{metric.value}</p>
                  <div className="flex items-center gap-1 mt-2">
                    {metric.trend === 'up' ? (
                      <ArrowUpRight className="w-4 h-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                      {metric.change}
                    </span>
                  </div>
                  <p className={`${GTSComponents.timestampText} mt-1`}>{metric.period}</p>
                </div>
                <div className={`w-12 h-12 rounded-lg ${GTSStyles.backgrounds.accent}/10 flex items-center justify-center`}>
                  <DollarSign className={`w-6 h-6 ${GTSStyles.text.accent}`} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`${GTSStyles.backgrounds.surface} border ${GTSStyles.borders.default}`}>
            <TabsTrigger value="revenue" className={`data-[state=active]:${GTSStyles.backgrounds.accent} data-[state=active]:text-white`}>
              <TrendingUp className="w-4 h-4 mr-2" />
              Выручка
            </TabsTrigger>
            <TabsTrigger value="costs" className={`data-[state=active]:${GTSStyles.backgrounds.accent} data-[state=active]:text-white`}>
              <TrendingDown className="w-4 h-4 mr-2" />
              Расходы
            </TabsTrigger>
            <TabsTrigger value="payouts" className={`data-[state=active]:${GTSStyles.backgrounds.accent} data-[state=active]:text-white`}>
              <CreditCard className="w-4 h-4 mr-2" />
              Выплаты
            </TabsTrigger>
            <TabsTrigger value="reports" className={`data-[state=active]:${GTSStyles.backgrounds.accent} data-[state=active]:text-white`}>
              <FileText className="w-4 h-4 mr-2" />
              Отчеты
            </TabsTrigger>
          </TabsList>

          {/* Revenue */}
          <TabsContent value="revenue" className="space-y-6">
            <Card className={GTSStyles.cards.default + ' p-6'}>
              <div className={`${GTSStyles.layout.flexBetween} mb-6`}>
                <h2 className={GTSComponents.cardTitle}>Динамика выручки</h2>
                <Button
                  variant="outline"
                  size="sm"
                  className={GTSStyles.buttons.secondary}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Детализация
                </Button>
              </div>

              {/* Simple Revenue Chart */}
              <div className="space-y-4">
                {revenueData.map((data, index) => (
                  <div key={index} className={`flex items-center justify-between p-3 ${GTSStyles.backgrounds.card} rounded-lg`}>
                    <div className="flex items-center gap-4">
                      <div className={`${GTSStyles.text.primary} font-medium min-w-[60px]`}>
                        {data.month}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 text-sm">
                          <div className={GTSStyles.text.primary}>
                            Выручка: ₽{data.revenue.toLocaleString()}
                          </div>
                          <div className={GTSStyles.text.muted}>
                            Расходы: ₽{data.costs.toLocaleString()}
                          </div>
                          <div className="text-green-500 font-medium">
                            Прибыль: ₽{data.profit.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-lg ${GTSStyles.text.primary} font-semibold`}>
                        {Math.round((data.profit / data.revenue) * 100)}%
                      </div>
                      <div className={GTSComponents.timestampText}>Рентабельность</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Revenue Breakdown */}
            <div className={GTSStyles.layout.grid2}>
              <Card className={GTSStyles.cards.default + ' p-6'}>
                <h3 className={`${GTSComponents.cardTitle} mb-4`}>По типам услуг</h3>
                <div className="space-y-3">
                  <div className={GTSStyles.layout.flexBetween}>
                    <span className={GTSStyles.text.muted}>Морские прогулки</span>
                    <span className={`${GTSStyles.text.primary} font-medium`}>₽1,450,000</span>
                  </div>
                  <div className={GTSStyles.layout.flexBetween}>
                    <span className={GTSStyles.text.muted}>Багги туры</span>
                    <span className={`${GTSStyles.text.primary} font-medium`}>₽980,000</span>
                  </div>
                  <div className={GTSStyles.layout.flexBetween}>
                    <span className={GTSStyles.text.muted}>Вертолетные экскурсии</span>
                    <span className={`${GTSStyles.text.primary} font-medium`}>₽1,220,000</span>
                  </div>
                </div>
              </Card>

              <Card className={GTSStyles.cards.default + ' p-6'}>
                <h3 className={`${GTSComponents.cardTitle} mb-4`}>По каналам продаж</h3>
                <div className="space-y-3">
                  <div className={GTSStyles.layout.flexBetween}>
                    <span className={GTSStyles.text.muted}>Прямые продажи</span>
                    <span className={`${GTSStyles.text.primary} font-medium`}>₽2,190,000</span>
                  </div>
                  <div className={GTSStyles.layout.flexBetween}>
                    <span className={GTSStyles.text.muted}>Партнеры-агенты</span>
                    <span className={`${GTSStyles.text.primary} font-medium`}>₽1,460,000</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Costs */}
          <TabsContent value="costs" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className={GTSStyles.cards.default + ' p-6'}>
                <h2 className={`${GTSComponents.cardTitle} mb-6`}>Структура расходов</h2>
                
                <div className="space-y-4">
                  {costBreakdown.map((cost, index) => (
                    <div key={index} className="space-y-2">
                      <div className={`${GTSStyles.layout.flexBetween} text-sm`}>
                        <span className={GTSStyles.text.primary}>{cost.category}</span>
                        <span className={`${GTSStyles.text.primary} font-medium`}>
                          ₽{cost.amount.toLocaleString()} ({cost.percentage}%)
                        </span>
                      </div>
                      <div className={`w-full ${GTSStyles.backgrounds.card} rounded-full h-2`}>
                        <div 
                          className={`h-2 rounded-full ${cost.color}`}
                          style={{ width: `${cost.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className={GTSStyles.cards.default + ' p-6'}>
                <h2 className={`${GTSComponents.cardTitle} mb-6`}>Анализ расходов</h2>
                
                <div className="space-y-4">
                  <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>Общие расходы</div>
                    <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>₽3,400,000</div>
                    <div className="text-sm text-red-500 mt-1">+8.5% к прошлому месяцу</div>
                  </div>
                  
                  <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>Наибольший рост</div>
                    <div className={`text-lg ${GTSStyles.text.primary} font-semibold`}>Топливо</div>
                    <div className="text-sm text-red-500 mt-1">+15.2% к прошлому месяцу</div>
                  </div>
                  
                  <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
                    <div className={`${GTSStyles.text.primary} font-medium mb-1`}>Экономия</div>
                    <div className={`text-lg ${GTSStyles.text.primary} font-semibold`}>Маркетинг</div>
                    <div className="text-sm text-green-500 mt-1">-5.8% к прошлому месяцу</div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Payouts */}
          <TabsContent value="payouts" className="space-y-6">
            <div className={GTSStyles.layout.flexBetween}>
              <h2 className={GTSComponents.cardTitle}>Выплаты партнерам</h2>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className={GTSStyles.buttons.secondary}
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
                <Button
                  className={GTSStyles.buttons.primary}
                >
                  Обработать выплаты
                </Button>
              </div>
            </div>

            <div className="grid gap-4">
              {payouts.map((payout) => (
                <Card key={payout.id} className={GTSComponents.contentCard}>
                  <div className={GTSStyles.layout.flexBetween}>
                    <div>
                      <h3 className={GTSComponents.cardTitle}>{payout.recipient}</h3>
                      <p className={`${GTSComponents.metaText} mb-2`}>{payout.type}</p>
                      
                      <div className={`flex items-center gap-4 ${GTSComponents.metaText}`}>
                        <span>Период: {payout.period}</span>
                        <span>Срок: {new Date(payout.dueDate).toLocaleDateString('ru-RU')}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className={`text-xl ${GTSStyles.text.primary} font-semibold mb-2`}>
                        ₽{payout.amount.toLocaleString()}
                      </div>
                      <Badge className={`${getStatusColor(payout.status)} text-white mb-2`}>
                        {getStatusText(payout.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={GTSStyles.buttons.secondary}
                        >
                          Детали
                        </Button>
                        {payout.status === 'pending' && (
                          <Button
                            size="sm"
                            className={GTSStyles.buttons.primary}
                          >
                            Оплатить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Payout Summary */}
            <div className={GTSStyles.layout.grid3}>
              <Card className={GTSStyles.cards.default + ' p-4'}>
                <div className="text-center">
                  <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>₽694,000</div>
                  <div className={GTSComponents.metaText}>К выплате</div>
                </div>
              </Card>
              <Card className={GTSStyles.cards.default + ' p-4'}>
                <div className="text-center">
                  <div className="text-2xl text-green-500 font-semibold">₽480,000</div>
                  <div className={GTSComponents.metaText}>Выплачено</div>
                </div>
              </Card>
              <Card className={GTSStyles.cards.default + ' p-4'}>
                <div className="text-center">
                  <div className={`text-2xl ${GTSStyles.text.primary} font-semibold`}>₽1,174,000</div>
                  <div className={GTSComponents.metaText}>Всего за месяц</div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Reports */}
          <TabsContent value="reports" className="space-y-6">
            <div className={GTSStyles.layout.flexBetween}>
              <h2 className={GTSComponents.cardTitle}>Финансовые отчеты</h2>
              <Button
                className={GTSStyles.buttons.primary}
              >
                Создать отчет
              </Button>
            </div>

            <div className="grid gap-4">
              {reports.map((report) => (
                <Card key={report.id} className={GTSComponents.contentCard}>
                  <div className={GTSStyles.layout.flexBetween}>
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 ${GTSStyles.backgrounds.card} rounded-lg flex items-center justify-center`}>
                        <FileText className={`w-5 h-5 ${GTSStyles.text.accent}`} />
                      </div>
                      
                      <div>
                        <h3 className={GTSComponents.cardTitle}>{report.name}</h3>
                        <div className={`flex items-center gap-4 ${GTSComponents.metaText} mt-1`}>
                          <span>{report.type}</span>
                          <span>Создан: {new Date(report.generated).toLocaleDateString('ru-RU')}</span>
                          <span>Формат: {report.format}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Badge className={`${getStatusColor(report.status)} text-white`}>
                        {getStatusText(report.status)}
                      </Badge>
                      
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className={GTSStyles.buttons.secondary}
                        >
                          <Download className="w-3 h-3 mr-1" />
                          Скачать
                        </Button>
                        {report.status === 'ready' && (
                          <Button
                            size="sm"
                            variant="outline"
                            className={GTSStyles.buttons.secondary}
                          >
                            Отправить
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}