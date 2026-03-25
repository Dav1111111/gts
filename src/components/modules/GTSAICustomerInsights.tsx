import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  AlertTriangle, 
  Star, 
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  Zap
} from "lucide-react";

interface ClientInsight {
  id: string;
  name: string;
  tier: "Basic" | "Premium" | "VIP";
  ltv: number;
  churnProbability: number;
  nextBookingProbability: number;
  upsellScore: number;
  totalBookings: number;
  lastActivity: string;
  preferences: string[];
  recommendedActions: string[];
}

interface InsightWidget {
  title: string;
  value: string;
  trend: number;
  icon: any;
  color: string;
}

export function GTSAICustomerInsights() {
  const [selectedClient, setSelectedClient] = useState<ClientInsight | null>(null);
  const [viewMode, setViewMode] = useState<"individual" | "segments">("individual");

  const mockClients: ClientInsight[] = [
    {
      id: "1",
      name: "Александр Петров",
      tier: "VIP",
      ltv: 285000,
      churnProbability: 15,
      nextBookingProbability: 78,
      upsellScore: 92,
      totalBookings: 24,
      lastActivity: "2 дня назад",
      preferences: ["Яхты", "Премиум локации", "Групповые туры"],
      recommendedActions: [
        "Предложить VIP яхт-тур на выходные",
        "Пригласить на закрытое мероприятие клуба",
        "Персональная скидка на новые маршруты"
      ]
    },
    {
      id: "2", 
      name: "Мария Сидорова",
      tier: "Premium",
      ltv: 145000,
      churnProbability: 45,
      nextBookingProbability: 34,
      upsellScore: 67,
      totalBookings: 12,
      lastActivity: "2 недели назад",
      preferences: ["ATV", "Экстрим", "Индивидуальные туры"],
      recommendedActions: [
        "Связаться для обратной связи",
        "Предложить новые экстремальные маршруты",
        "Персональное предложение со скидкой"
      ]
    }
  ];

  const globalInsights: InsightWidget[] = [
    {
      title: "Средний LTV",
      value: "₽215K",
      trend: 12,
      icon: DollarSign,
      color: "text-green-400"
    },
    {
      title: "Риск оттока",
      value: "18%",
      trend: -5,
      icon: AlertTriangle,
      color: "text-orange-400"
    },
    {
      title: "Вероятность апселл",
      value: "74%",
      trend: 8,
      icon: TrendingUp,
      color: "text-blue-400"
    },
    {
      title: "Активные клиенты",
      value: "1,247",
      trend: 15,
      icon: Users,
      color: "text-purple-400"
    }
  ];

  const segmentData = [
    { segment: "VIP", count: 89, avgLtv: 320000, churnRate: 8, color: "bg-red-500" },
    { segment: "Premium", count: 234, avgLtv: 180000, churnRate: 22, color: "bg-amber-500" },
    { segment: "Basic", count: 924, avgLtv: 85000, churnRate: 35, color: "bg-blue-500" }
  ];

  return (
    <div className="p-6 bg-[#0B0B0C] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">AI Customer Insights</h1>
            <p className="text-[#A6A7AA]">Интеллектуальная аналитика клиентов и прогнозирование</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant={viewMode === "individual" ? "default" : "outline"}
              onClick={() => setViewMode("individual")}
              className="bg-[#91040C] hover:bg-[#91040C]/80"
            >
              <Brain className="w-4 h-4 mr-2" />
              Индивидуальный анализ
            </Button>
            <Button
              variant={viewMode === "segments" ? "default" : "outline"}
              onClick={() => setViewMode("segments")}
              className="bg-[#17181A] border-[#232428] text-white hover:bg-[#232428]"
            >
              <Users className="w-4 h-4 mr-2" />
              Сегментация
            </Button>
          </div>
        </div>

        {/* Global Insights */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {globalInsights.map((insight, index) => (
            <Card key={index} className="bg-[#121214] border-[#232428] p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[#A6A7AA] text-sm">{insight.title}</p>
                  <p className="text-white text-2xl font-semibold">{insight.value}</p>
                </div>
                <div className={`p-2 rounded-lg bg-opacity-20 ${insight.color}`}>
                  <insight.icon className={`w-5 h-5 ${insight.color}`} />
                </div>
              </div>
              <div className="flex items-center mt-2">
                {insight.trend > 0 ? (
                  <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-400 mr-1" />
                )}
                <span className={`text-sm ${insight.trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
                  {Math.abs(insight.trend)}%
                </span>
                <span className="text-[#A6A7AA] text-sm ml-1">vs прошлый месяц</span>
              </div>
            </Card>
          ))}
        </div>

        {viewMode === "individual" ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Client List */}
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-4">Клиенты для анализа</h3>
              <div className="space-y-3">
                {mockClients.map((client) => (
                  <div
                    key={client.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedClient?.id === client.id ? 'bg-[#91040C]/20 border border-[#91040C]' : 'bg-[#17181A] hover:bg-[#232428]'
                    }`}
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-white font-medium">{client.name}</h4>
                      <Badge 
                        variant={client.tier === "VIP" ? "default" : "secondary"}
                        className={
                          client.tier === "VIP" ? "bg-[#91040C] text-white" :
                          client.tier === "Premium" ? "bg-amber-500/20 text-amber-400" :
                          "bg-blue-500/20 text-blue-400"
                        }
                      >
                        {client.tier}
                      </Badge>
                    </div>
                    <div className="text-[#A6A7AA] text-sm space-y-1">
                      <p>LTV: ₽{client.ltv.toLocaleString()}</p>
                      <p>Риск оттока: {client.churnProbability}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Individual Analysis */}
            {selectedClient && (
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-[#121214] border-[#232428] p-6">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h3 className="text-white text-xl font-semibold">{selectedClient.name}</h3>
                      <p className="text-[#A6A7AA]">Последняя активность: {selectedClient.lastActivity}</p>
                    </div>
                    <Badge 
                      variant="secondary"
                      className={
                        selectedClient.tier === "VIP" ? "bg-[#91040C] text-white" :
                        selectedClient.tier === "Premium" ? "bg-amber-500/20 text-amber-400" :
                        "bg-blue-500/20 text-blue-400"
                      }
                    >
                      {selectedClient.tier}
                    </Badge>
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-[#17181A] p-4 rounded-lg">
                      <p className="text-[#A6A7AA] text-sm">Lifetime Value</p>
                      <p className="text-white text-2xl font-semibold">₽{selectedClient.ltv.toLocaleString()}</p>
                    </div>
                    <div className="bg-[#17181A] p-4 rounded-lg">
                      <p className="text-[#A6A7AA] text-sm">Всего бронирований</p>
                      <p className="text-white text-2xl font-semibold">{selectedClient.totalBookings}</p>
                    </div>
                  </div>

                  {/* Risk Analysis */}
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Риск оттока</span>
                        <span className={`font-semibold ${
                          selectedClient.churnProbability < 25 ? 'text-green-400' :
                          selectedClient.churnProbability < 50 ? 'text-yellow-400' : 'text-red-400'
                        }`}>
                          {selectedClient.churnProbability}%
                        </span>
                      </div>
                      <Progress 
                        value={selectedClient.churnProbability} 
                        className="h-2 bg-[#17181A]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Вероятность следующего бронирования</span>
                        <span className="text-green-400 font-semibold">{selectedClient.nextBookingProbability}%</span>
                      </div>
                      <Progress 
                        value={selectedClient.nextBookingProbability} 
                        className="h-2 bg-[#17181A]"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-white">Потенциал апселл</span>
                        <span className="text-blue-400 font-semibold">{selectedClient.upsellScore}%</span>
                      </div>
                      <Progress 
                        value={selectedClient.upsellScore} 
                        className="h-2 bg-[#17181A]"
                      />
                    </div>
                  </div>
                </Card>

                {/* Preferences & Recommendations */}
                <Card className="bg-[#121214] border-[#232428] p-6">
                  <h4 className="text-white font-semibold mb-4">Предпочтения и рекомендации</h4>
                  
                  <div className="mb-6">
                    <p className="text-[#A6A7AA] mb-2">Предпочтения:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedClient.preferences.map((pref, index) => (
                        <Badge key={index} variant="outline" className="border-[#232428] text-[#A6A7AA]">
                          {pref}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-[#232428] my-4" />

                  <div>
                    <p className="text-[#A6A7AA] mb-3">AI рекомендации:</p>
                    <div className="space-y-2">
                      {selectedClient.recommendedActions.map((action, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                          <p className="text-white text-sm">{action}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-[#91040C] hover:bg-[#91040C]/80">
                    Применить рекомендации
                  </Button>
                </Card>
              </div>
            )}
          </div>
        ) : (
          /* Segment Analysis */
          <div className="space-y-6">
            <Card className="bg-[#121214] border-[#232428] p-6">
              <h3 className="text-white font-semibold mb-6">Анализ по сегментам</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {segmentData.map((segment, index) => (
                  <Card key={index} className="bg-[#17181A] border-[#232428] p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-white font-semibold">{segment.segment}</h4>
                      <div className={`w-3 h-3 rounded-full ${segment.color}`}></div>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-[#A6A7AA] text-sm">Количество клиентов</p>
                        <p className="text-white text-xl font-semibold">{segment.count}</p>
                      </div>
                      
                      <div>
                        <p className="text-[#A6A7AA] text-sm">Средний LTV</p>
                        <p className="text-white text-xl font-semibold">₽{segment.avgLtv.toLocaleString()}</p>
                      </div>
                      
                      <div>
                        <p className="text-[#A6A7AA] text-sm">Уровень оттока</p>
                        <div className="flex items-center gap-2">
                          <p className={`text-lg font-semibold ${
                            segment.churnRate < 20 ? 'text-green-400' :
                            segment.churnRate < 30 ? 'text-yellow-400' : 'text-red-400'
                          }`}>
                            {segment.churnRate}%
                          </p>
                          {segment.churnRate < 20 ? (
                            <TrendingDown className="w-4 h-4 text-green-400" />
                          ) : (
                            <TrendingUp className="w-4 h-4 text-red-400" />
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}