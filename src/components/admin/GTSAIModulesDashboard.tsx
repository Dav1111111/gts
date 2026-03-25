import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { GTSAICustomerInsights } from "../modules/GTSAICustomerInsights";
import { GTSAIMarketAnalysis } from "../modules/GTSAIMarketAnalysis";
import { GTSAIContentGenerator } from "../modules/GTSAIContentGenerator";
import { GTSGlobalAIAssistant } from "../modules/GTSGlobalAIAssistant";
import { 
  Brain, 
  Users, 
  TrendingUp, 
  FileText, 
  MessageCircle, 
  Zap, 
  Eye,
  Target,
  BarChart3,
  Lightbulb,
  Settings,
  Activity,
  CheckCircle,
  AlertCircle,
  Clock,
  Sparkles,
  ArrowRight,
  Plus,
  Filter,
  Download
} from "lucide-react";

interface AIModule {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "active" | "training" | "maintenance";
  usage: number;
  lastUpdate: string;
  icon: any;
  color: string;
  features: string[];
  metrics: {
    requests: number;
    accuracy: number;
    satisfaction: number;
  };
}

export function GTSAIModulesDashboard({ userRole = "executive" }: { userRole?: string }) {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");

  const aiModules: AIModule[] = [
    {
      id: "customer-insights",
      name: "AI Customer Insights",
      description: "Анализ клиентов, прогнозирование LTV и рекомендации по апселл",
      category: "CRM & Analytics",
      status: "active",
      usage: 87,
      lastUpdate: "2 часа назад",
      icon: Users,
      color: "text-blue-400",
      features: ["LTV предсказание", "Риск оттока", "Сегментация", "Рекомендации"],
      metrics: {
        requests: 1247,
        accuracy: 94,
        satisfaction: 92
      }
    },
    {
      id: "market-analysis",
      name: "Market AI",
      description: "Анализ рынка, конкурентная разведка и трендовый анализ",
      category: "Market Intelligence",
      status: "active",
      usage: 73,
      lastUpdate: "1 час назад",
      icon: TrendingUp,
      color: "text-green-400",
      features: ["Карта конкурентов", "Трендовый анализ", "Бенчмаркинг", "Прогнозы"],
      metrics: {
        requests: 892,
        accuracy: 89,
        satisfaction: 88
      }
    },
    {
      id: "content-generator",
      name: "Content AI",
      description: "Генерация контента для услуг, оборудования и маркетинга",
      category: "Content & Marketing",
      status: "active",
      usage: 65,
      lastUpdate: "30 минут назад",
      icon: FileText,
      color: "text-purple-400",
      features: ["Описания услуг", "SEO контент", "Соцсети", "Мультиязычность"],
      metrics: {
        requests: 634,
        accuracy: 91,
        satisfaction: 95
      }
    },
    {
      id: "ai-assistant",
      name: "Global AI Assistant",
      description: "Универсальный помощник с ролевым контекстом",
      category: "Support & Automation",
      status: "active",
      usage: 92,
      lastUpdate: "Сейчас",
      icon: MessageCircle,
      color: "text-yellow-400",
      features: ["Ролевой контекст", "Быстрые действия", "Мультиязычность", "API интеграция"],
      metrics: {
        requests: 2156,
        accuracy: 96,
        satisfaction: 97
      }
    }
  ];

  const overallMetrics = {
    totalRequests: aiModules.reduce((sum, module) => sum + module.metrics.requests, 0),
    avgAccuracy: Math.round(aiModules.reduce((sum, module) => sum + module.metrics.accuracy, 0) / aiModules.length),
    avgSatisfaction: Math.round(aiModules.reduce((sum, module) => sum + module.metrics.satisfaction, 0) / aiModules.length),
    activeModules: aiModules.filter(m => m.status === "active").length
  };

  const renderModuleContent = () => {
    switch (selectedModule) {
      case "customer-insights":
        return <GTSAICustomerInsights />;
      case "market-analysis":
        return <GTSAIMarketAnalysis />;
      case "content-generator":
        return <GTSAIContentGenerator />;
      default:
        return null;
    }
  };

  if (selectedModule) {
    return (
      <div className="p-6 bg-[#0B0B0C] min-h-screen">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              onClick={() => setSelectedModule(null)}
              className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428]"
            >
              ← Назад к AI Dashboard
            </Button>
            <div className="h-6 w-px bg-[#232428]"></div>
            <h1 className="text-xl font-semibold text-white">
              {aiModules.find(m => m.id === selectedModule)?.name}
            </h1>
          </div>
          {renderModuleContent()}
        </div>
        <GTSGlobalAIAssistant userRole={userRole} />
      </div>
    );
  }

  return (
    <div className="p-6 bg-[#0B0B0C] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">AI Modules Dashboard</h1>
            <p className="text-[#A6A7AA]">Управление и мониторинг искусственного интеллекта GTS</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400">
              <Activity className="w-3 h-3 mr-1" />
              Все системы в норме
            </Badge>
            <Button className="bg-[#91040C] hover:bg-[#91040C]/80">
              <Settings className="w-4 h-4 mr-2" />
              Настройки AI
            </Button>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428]">
            <TabsTrigger 
              value="overview" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <Eye className="w-4 h-4 mr-2" />
              Обзор
            </TabsTrigger>
            <TabsTrigger 
              value="modules" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <Brain className="w-4 h-4 mr-2" />
              Модули
            </TabsTrigger>
            <TabsTrigger 
              value="analytics" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              Аналитика
            </TabsTrigger>
            <TabsTrigger 
              value="insights" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <Lightbulb className="w-4 h-4 mr-2" />
              Инсайты
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Overall Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-[#121214] border-[#232428] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A6A7AA] text-sm">Всего запросов</p>
                    <p className="text-white text-2xl font-semibold">{overallMetrics.totalRequests.toLocaleString()}</p>
                  </div>
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <div className="mt-2 text-green-400 text-sm">+23% за месяц</div>
              </Card>

              <Card className="bg-[#121214] border-[#232428] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A6A7AA] text-sm">Точность AI</p>
                    <p className="text-white text-2xl font-semibold">{overallMetrics.avgAccuracy}%</p>
                  </div>
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <Target className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <div className="mt-2 text-green-400 text-sm">+2% за неделю</div>
              </Card>

              <Card className="bg-[#121214] border-[#232428] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A6A7AA] text-sm">Удовлетворенность</p>
                    <p className="text-white text-2xl font-semibold">{overallMetrics.avgSatisfaction}%</p>
                  </div>
                  <div className="p-2 bg-yellow-500/20 rounded-lg">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                  </div>
                </div>
                <div className="mt-2 text-green-400 text-sm">+5% за месяц</div>
              </Card>

              <Card className="bg-[#121214] border-[#232428] p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#A6A7AA] text-sm">Активные модули</p>
                    <p className="text-white text-2xl font-semibold">{overallMetrics.activeModules}/4</p>
                  </div>
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <div className="mt-2 text-green-400 text-sm">Все онлайн</div>
              </Card>
            </div>

            {/* Quick Access */}
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-4">Быстрый доступ к AI модулям</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {aiModules.map((module) => (
                  <div
                    key={module.id}
                    className="bg-[#17181A] p-4 rounded-lg cursor-pointer hover:bg-[#232428] transition-colors group"
                    onClick={() => setSelectedModule(module.id)}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`p-2 rounded-lg ${module.color} bg-opacity-20`}>
                        <module.icon className={`w-5 h-5 ${module.color}`} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#A6A7AA] group-hover:text-white" />
                    </div>
                    <h4 className="text-white font-medium mb-1">{module.name}</h4>
                    <p className="text-[#A6A7AA] text-sm mb-3">{module.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={`border-[#232428] ${
                          module.status === "active" ? "text-green-400" : "text-yellow-400"
                        }`}
                      >
                        {module.status === "active" ? "Активен" : "Обновление"}
                      </Badge>
                      <span className="text-[#A6A7AA] text-xs">{module.usage}% загрузка</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-4">Последняя активность AI</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Users className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">AI Customer Insights: Обновлен прогноз LTV для VIP клиентов</p>
                    <p className="text-[#A6A7AA] text-xs">2 часа назад</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-green-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Market AI: Новый тренд - рост спроса на эко-туризм на 25%</p>
                    <p className="text-[#A6A7AA] text-xs">3 часа назад</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-sm">Content AI: Сгенерированы описания для 12 новых туров</p>
                    <p className="text-[#A6A7AA] text-xs">5 часов назад</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="modules" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {aiModules.map((module) => (
                <Card key={module.id} className="bg-[#121214] border-[#232428] p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${module.color} bg-opacity-20`}>
                        <module.icon className={`w-5 h-5 ${module.color}`} />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{module.name}</h3>
                        <p className="text-[#A6A7AA] text-sm">{module.category}</p>
                      </div>
                    </div>
                    <Badge 
                      variant="outline" 
                      className={`border-[#232428] ${
                        module.status === "active" ? "text-green-400" : "text-yellow-400"
                      }`}
                    >
                      {module.status === "active" ? "Активен" : "Обновление"}
                    </Badge>
                  </div>

                  <p className="text-[#A6A7AA] text-sm mb-4">{module.description}</p>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="text-center">
                      <p className="text-white text-lg font-semibold">{module.metrics.requests}</p>
                      <p className="text-[#A6A7AA] text-xs">Запросов</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-semibold">{module.metrics.accuracy}%</p>
                      <p className="text-[#A6A7AA] text-xs">Точность</p>
                    </div>
                    <div className="text-center">
                      <p className="text-white text-lg font-semibold">{module.metrics.satisfaction}%</p>
                      <p className="text-[#A6A7AA] text-xs">Оценка</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-white text-sm font-medium mb-2">Возможности:</p>
                    <div className="flex flex-wrap gap-1">
                      {module.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="border-[#232428] text-[#A6A7AA] text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-[#A6A7AA] text-xs">Обновлен: {module.lastUpdate}</span>
                    <Button
                      size="sm"
                      onClick={() => setSelectedModule(module.id)}
                      className="bg-[#91040C] hover:bg-[#91040C]/80"
                    >
                      Открыть модуль
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-4">Производительность AI модулей</h3>
              <div className="h-64 bg-[#17181A] rounded-lg flex items-center justify-center">
                <p className="text-[#A6A7AA]">График производительности AI модулей</p>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#121214] border-[#232428] p-6">
                <h3 className="text-white font-semibold mb-4">Топ запросы по модулям</h3>
                <div className="space-y-3">
                  {[
                    { module: "AI Assistant", query: "KPI за месяц", count: 47 },
                    { module: "Customer Insights", query: "Анализ VIP клиентов", count: 32 },
                    { module: "Market AI", query: "Тренды рынка", count: 28 },
                    { module: "Content AI", query: "Описание яхт-туров", count: 24 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                      <div>
                        <p className="text-white text-sm">{item.query}</p>
                        <p className="text-[#A6A7AA] text-xs">{item.module}</p>
                      </div>
                      <Badge variant="outline" className="border-[#232428] text-[#A6A7AA]">
                        {item.count}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="bg-[#121214] border-[#232428] p-6">
                <h3 className="text-white font-semibold mb-4">Ошибки и предупреждения</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                    <AlertCircle className="w-4 h-4 text-yellow-400" />
                    <div>
                      <p className="text-white text-sm">Высокая нагрузка на Content AI</p>
                      <p className="text-[#A6A7AA] text-xs">15 минут назад</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <div>
                      <p className="text-white text-sm">Все модули работают стабильно</p>
                      <p className="text-[#A6A7AA] text-xs">2 часа назад</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-4">AI Insights & Рекомендации</h3>
              
              <div className="space-y-4">
                <div className="bg-[#17181A] p-4 rounded-lg border-l-4 border-blue-500">
                  <div className="flex items-start gap-3">
                    <Lightbulb className="w-5 h-5 text-blue-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Оптимизация Customer Insights</h4>
                      <p className="text-[#A6A7AA] text-sm mb-3">
                        AI обнаружил, что клиенты с высоким LTV чаще бронируют туры в будние дни. 
                        Рекомендуем создать специальные предложения для будних дней.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-blue-500/20 text-blue-400">Потенциальный рост: +18%</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#17181A] p-4 rounded-lg border-l-4 border-green-500">
                  <div className="flex items-start gap-3">
                    <TrendingUp className="w-5 h-5 text-green-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Рыночная возможность</h4>
                      <p className="text-[#A6A7AA] text-sm mb-3">
                        Market AI выявил снижение конкуренции в сегменте корпоративных туров на 15%. 
                        Это отличная возможность для расширения B2B направления.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-green-500/20 text-green-400">Приоритет: Высокий</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#17181A] p-4 rounded-lg border-l-4 border-purple-500">
                  <div className="flex items-start gap-3">
                    <FileText className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Контентная стратегия</h4>
                      <p className="text-[#A6A7AA] text-sm mb-3">
                        Content AI анализирует, что описания с упоминанием "эксклюзивности" 
                        повышают конверсию на 23%. Обновите контент для премиум услуг.
                      </p>
                      <div className="flex gap-2">
                        <Badge className="bg-purple-500/20 text-purple-400">Конверсия: +23%</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Global AI Assistant */}
      <GTSGlobalAIAssistant userRole={userRole} />
    </div>
  );
}