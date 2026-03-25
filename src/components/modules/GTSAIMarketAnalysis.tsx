import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  MapPin, 
  Star, 
  DollarSign,
  Users,
  Activity,
  BarChart3,
  Target,
  Zap,
  Eye,
  Calendar,
  Globe,
  ArrowUpRight,
  ArrowDownRight,
  Lightbulb,
  AlertCircle
} from "lucide-react";

interface Competitor {
  id: string;
  name: string;
  category: string;
  rating: number;
  priceRange: string;
  location: string;
  strengths: string[];
  weaknesses: string[];
  marketShare: number;
  avgPrice: number;
  popularServices: string[];
}

interface MarketTrend {
  title: string;
  description: string;
  impact: "positive" | "negative" | "neutral";
  confidence: number;
  timeframe: string;
  actionItems: string[];
}

interface BenchmarkMetric {
  metric: string;
  gtsValue: number;
  marketAvg: number;
  topCompetitor: number;
  unit: string;
  trend: number;
}

export function GTSAIMarketAnalysis() {
  const [selectedTab, setSelectedTab] = useState("competitors");
  const [selectedCompetitor, setSelectedCompetitor] = useState<Competitor | null>(null);

  const competitors: Competitor[] = [
    {
      id: "1",
      name: "Sochi Adventures",
      category: "Активный отдых",
      rating: 4.2,
      priceRange: "₽8,000 - ₽25,000",
      location: "Центр Сочи",
      strengths: ["Большой парк техники", "Опытные гиды", "Групповые скидки"],
      weaknesses: ["Устаревшее оборудование", "Ограниченный сервис", "Низкое качество обслуживания"],
      marketShare: 18.5,
      avgPrice: 15000,
      popularServices: ["Квадроциклы", "Джип-туры", "Рафтинг"]
    },
    {
      id: "2",
      name: "Premium Caucasus",
      category: "Премиум туры",
      rating: 4.7,
      priceRange: "₽15,000 - ₽80,000",
      location: "Красная Поляна",
      strengths: ["Премиум сервис", "Эксклюзивные маршруты", "VIP обслуживание"],
      weaknesses: ["Высокие цены", "Ограниченная доступность", "Малый парк техники"],
      marketShare: 12.3,
      avgPrice: 45000,
      popularServices: ["Вертолетные туры", "Яхты", "Горнолыжные туры"]
    },
    {
      id: "3",
      name: "Extreme Sochi",
      category: "Экстремальный спорт",
      rating: 4.0,
      priceRange: "₽5,000 - ₽30,000",
      location: "Адлер",
      strengths: ["Экстремальные маршруты", "Молодая аудитория", "Агрессивный маркетинг"],
      weaknesses: ["Вопросы безопасности", "Высокая текучка персонала", "Сезонность"],
      marketShare: 8.7,
      avgPrice: 18000,
      popularServices: ["Банджи джампинг", "Парапланеризм", "Экстрим-квесты"]
    }
  ];

  const marketTrends: MarketTrend[] = [
    {
      title: "Рост спроса на эко-туризм",
      description: "Увеличение интереса к устойчивому туризму и экологически чистым маршрутам",
      impact: "positive",
      confidence: 87,
      timeframe: "Лето 2025",
      actionItems: [
        "Разработать эко-маршруты",
        "Получить экологические сертификаты",
        "Партнерство с природными парками"
      ]
    },
    {
      title: "Снижение среднего чека в сегменте масс-маркет",
      description: "Экономическая нестабильность влияет на потребительские расходы",
      impact: "negative",
      confidence: 72,
      timeframe: "Q1-Q2 2025",
      actionItems: [
        "Создать бюджетные пакеты",
        "Программы лояльности",
        "Гибкая система скидок"
      ]
    },
    {
      title: "Популярность корпоративных мероприятий",
      description: "Компании увеличивают бюджеты на team-building и корпоративные выезды",
      impact: "positive",
      confidence: 93,
      timeframe: "Весь 2025",
      actionItems: [
        "B2B отдел продаж",
        "Корпоративные пакеты",
        "Партнерство с HR агентствами"
      ]
    }
  ];

  const benchmarkMetrics: BenchmarkMetric[] = [
    {
      metric: "Средний чек",
      gtsValue: 32000,
      marketAvg: 22000,
      topCompetitor: 45000,
      unit: "₽",
      trend: 8
    },
    {
      metric: "Рейтинг клиентов",
      gtsValue: 4.8,
      marketAvg: 4.1,
      topCompetitor: 4.7,
      unit: "/5",
      trend: 12
    },
    {
      metric: "Конверсия сайта",
      gtsValue: 3.2,
      marketAvg: 2.1,
      topCompetitor: 2.8,
      unit: "%",
      trend: 15
    },
    {
      metric: "Время обслуживания",
      gtsValue: 24,
      marketAvg: 36,
      topCompetitor: 28,
      unit: "ч",
      trend: -20
    },
    {
      metric: "Повторные клиенты",
      gtsValue: 68,
      marketAvg: 45,
      topCompetitor: 52,
      unit: "%",
      trend: 22
    }
  ];

  const competitorCategories = ["Все", "Активный отдых", "Премиум туры", "Экстремальный спорт"];

  return (
    <div className="p-6 bg-[#0B0B0C] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Market AI Analysis</h1>
            <p className="text-[#A6A7AA]">Интеллектуальный анализ рынка и конкурентная разведка</p>
          </div>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
            <Eye className="w-4 h-4 mr-2" />
            Обновить данные
          </Button>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-[#121214] border-[#232428]">
            <TabsTrigger 
              value="competitors" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Карта конкурентов
            </TabsTrigger>
            <TabsTrigger 
              value="trends" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Трендовый анализ
            </TabsTrigger>
            <TabsTrigger 
              value="benchmark" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Бенчмаркинг
            </TabsTrigger>
          </TabsList>

          <TabsContent value="competitors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Competitors List */}
              <Card className="bg-[#121214] border-[#232428] p-6">
                <h3 className="text-white font-semibold mb-4">Основные конкуренты</h3>
                <div className="space-y-3">
                  {competitors.map((competitor) => (
                    <div
                      key={competitor.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedCompetitor?.id === competitor.id ? 'bg-[#91040C]/20 border border-[#91040C]' : 'bg-[#17181A] hover:bg-[#232428]'
                      }`}
                      onClick={() => setSelectedCompetitor(competitor)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-white font-medium">{competitor.name}</h4>
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-[#A6A7AA] text-sm">{competitor.rating}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="border-[#232428] text-[#A6A7AA] mb-2">
                        {competitor.category}
                      </Badge>
                      <div className="text-[#A6A7AA] text-sm space-y-1">
                        <p>{competitor.priceRange}</p>
                        <p>Доля рынка: {competitor.marketShare}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Competitor Details */}
              {selectedCompetitor && (
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-[#121214] border-[#232428] p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-white text-xl font-semibold">{selectedCompetitor.name}</h3>
                        <p className="text-[#A6A7AA]">{selectedCompetitor.location}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-5 h-5 text-yellow-400 fill-current" />
                          <span className="text-white text-lg font-semibold">{selectedCompetitor.rating}</span>
                        </div>
                        <p className="text-[#A6A7AA] text-sm">Рейтинг</p>
                      </div>
                    </div>

                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="bg-[#17181A] p-4 rounded-lg">
                        <p className="text-[#A6A7AA] text-sm">Доля рынка</p>
                        <p className="text-white text-2xl font-semibold">{selectedCompetitor.marketShare}%</p>
                      </div>
                      <div className="bg-[#17181A] p-4 rounded-lg">
                        <p className="text-[#A6A7AA] text-sm">Средний чек</p>
                        <p className="text-white text-2xl font-semibold">₽{selectedCompetitor.avgPrice.toLocaleString()}</p>
                      </div>
                    </div>

                    {/* Strengths & Weaknesses */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <TrendingUp className="w-4 h-4 text-green-400 mr-2" />
                          Сильные стороны
                        </h4>
                        <div className="space-y-2">
                          {selectedCompetitor.strengths.map((strength, index) => (
                            <div key={index} className="text-green-400 text-sm flex items-start">
                              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {strength}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-white font-semibold mb-3 flex items-center">
                          <TrendingDown className="w-4 h-4 text-red-400 mr-2" />
                          Слабые стороны
                        </h4>
                        <div className="space-y-2">
                          {selectedCompetitor.weaknesses.map((weakness, index) => (
                            <div key={index} className="text-red-400 text-sm flex items-start">
                              <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                              {weakness}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Popular Services */}
                    <div>
                      <h4 className="text-white font-semibold mb-3">Популярные услуги</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCompetitor.popularServices.map((service, index) => (
                          <Badge key={index} variant="outline" className="border-[#232428] text-[#A6A7AA]">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {marketTrends.map((trend, index) => (
                <Card key={index} className="bg-[#121214] border-[#232428] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${
                        trend.impact === 'positive' ? 'bg-green-500/20' :
                        trend.impact === 'negative' ? 'bg-red-500/20' : 'bg-gray-500/20'
                      }`}>
                        {trend.impact === 'positive' ? (
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        ) : trend.impact === 'negative' ? (
                          <TrendingDown className="w-4 h-4 text-red-400" />
                        ) : (
                          <Activity className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{trend.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-[#232428] text-[#A6A7AA] text-xs">
                            {trend.timeframe}
                          </Badge>
                          <span className="text-[#A6A7AA] text-xs">Уверенность: {trend.confidence}%</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-[#A6A7AA] mb-4">{trend.description}</p>

                  <Separator className="bg-[#232428] my-4" />

                  <div>
                    <h4 className="text-white font-medium mb-3 flex items-center">
                      <Lightbulb className="w-4 h-4 text-yellow-400 mr-2" />
                      Рекомендации
                    </h4>
                    <div className="space-y-2">
                      {trend.actionItems.map((action, actionIndex) => (
                        <div key={actionIndex} className="text-[#A6A7AA] text-sm flex items-start">
                          <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                          {action}
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* AI Insights Panel */}
            <Card className="bg-[#121214] border-[#232428] p-6">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-5 h-5 text-yellow-400" />
                <h3 className="text-white font-semibold">AI Market Insights</h3>
              </div>
              
              <div className="bg-[#17181A] p-4 rounded-lg">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="text-white font-medium mb-2">Прогноз на следующий квартал</h4>
                    <p className="text-[#A6A7AA] text-sm mb-3">
                      На основе анализа поисковых запросов, социальных сетей и экономических показателей, 
                      AI прогнозирует 25% рост спроса на премиум-услуги и 15% снижение в бюджетном сегменте.
                    </p>
                    <div className="flex gap-2">
                      <Badge className="bg-green-500/20 text-green-400">Премиум ↑25%</Badge>
                      <Badge className="bg-red-500/20 text-red-400">Бюджет ↓15%</Badge>
                      <Badge className="bg-blue-500/20 text-blue-400">Корпоратив ↑40%</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="benchmark" className="space-y-6">
            <div className="grid grid-cols-1 gap-6">
              {benchmarkMetrics.map((metric, index) => (
                <Card key={index} className="bg-[#121214] border-[#232428] p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-white font-semibold">{metric.metric}</h3>
                    <div className="flex items-center gap-2">
                      {metric.trend > 0 ? (
                        <ArrowUpRight className="w-4 h-4 text-green-400" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4 text-red-400" />
                      )}
                      <span className={`text-sm font-medium ${metric.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.trend > 0 ? '+' : ''}{metric.trend}%
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-[#A6A7AA] text-sm mb-1">GTS</p>
                      <p className="text-2xl font-semibold text-[#91040C]">
                        {metric.gtsValue}{metric.unit}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-[#A6A7AA] text-sm mb-1">Средний по рынку</p>
                      <p className="text-2xl font-semibold text-white">
                        {metric.marketAvg}{metric.unit}
                      </p>
                    </div>
                    
                    <div className="text-center">
                      <p className="text-[#A6A7AA] text-sm mb-1">Лучший конкурент</p>
                      <p className="text-2xl font-semibold text-amber-400">
                        {metric.topCompetitor}{metric.unit}
                      </p>
                    </div>
                  </div>

                  {/* Visual comparison */}
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-[#91040C] rounded"></div>
                      <div className="flex-1 bg-[#17181A] h-2 rounded overflow-hidden">
                        <div 
                          className="h-full bg-[#91040C]" 
                          style={{ width: `${(metric.gtsValue / Math.max(metric.gtsValue, metric.marketAvg, metric.topCompetitor)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-white rounded"></div>
                      <div className="flex-1 bg-[#17181A] h-2 rounded overflow-hidden">
                        <div 
                          className="h-full bg-white" 
                          style={{ width: `${(metric.marketAvg / Math.max(metric.gtsValue, metric.marketAvg, metric.topCompetitor)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-400 rounded"></div>
                      <div className="flex-1 bg-[#17181A] h-2 rounded overflow-hidden">
                        <div 
                          className="h-full bg-amber-400" 
                          style={{ width: `${(metric.topCompetitor / Math.max(metric.gtsValue, metric.marketAvg, metric.topCompetitor)) * 100}%` }}
                        ></div>
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