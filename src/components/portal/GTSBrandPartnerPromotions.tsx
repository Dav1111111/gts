import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Calendar, Users, Eye, MessageSquare, Plus, TrendingUp } from "lucide-react";

export function GTSBrandPartnerPromotions() {
  const activePromotions = [
    {
      id: "PROMO-2024-001",
      title: "Летние приключения",
      description: "Скидка 20% на прокат катеров при покупке SPA-пакета",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      status: "active",
      reach: 15420,
      uses: 847,
      conversion: 5.5,
      image: "/api/placeholder/300/200"
    },
    {
      id: "PROMO-2024-002", 
      title: "Экстрим + Релакс",
      description: "Комбо предложение: багги-тур + массаж со скидкой 15%",
      startDate: "2024-07-15",
      endDate: "2024-09-15",
      status: "active",
      reach: 8930,
      uses: 423,
      conversion: 4.7,
      image: "/api/placeholder/300/200"
    }
  ];

  const upcomingPromotions = [
    {
      id: "PROMO-2024-003",
      title: "Осенний детокс",
      description: "Вертолетная экскурсия + детокс-программа",
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      status: "pending_approval",
      estimatedReach: 12000,
      image: "/api/placeholder/300/200"
    }
  ];

  const pastPromotions = [
    {
      id: "PROMO-2024-000",
      title: "Весенний старт",
      description: "Первые поездки сезона со скидкой 25%",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      status: "completed",
      totalReach: 22150,
      totalUses: 1247,
      finalConversion: 5.6,
      revenue: 2840000,
      image: "/api/placeholder/300/200"
    }
  ];

  const PromoCard = ({ promo, type }: { promo: any, type: "active" | "upcoming" | "past" }) => (
    <Card 
      className="overflow-hidden"
      style={{ 
        backgroundColor: "var(--gts-portal-card)",
        borderColor: "var(--gts-portal-border)"
      }}
    >
      <div className="aspect-video bg-gradient-to-r from-gray-800 to-gray-900 relative">
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <p className="text-white text-sm">Превью промо-материала</p>
        </div>
        <div className="absolute top-4 right-4">
          <Badge 
            variant="outline"
            style={{ 
              backgroundColor: 
                promo.status === "active" ? "var(--gts-portal-success)" :
                promo.status === "pending_approval" ? "var(--gts-portal-warning)" :
                "var(--gts-portal-muted)",
              color: "white",
              borderColor: "transparent"
            }}
          >
            {promo.status === "active" ? "Активно" :
             promo.status === "pending_approval" ? "На модерации" :
             "Завершено"}
          </Badge>
        </div>
      </div>

      <div className="p-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-2" style={{ color: "var(--gts-portal-text)" }}>
            {promo.title}
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            {promo.description}
          </p>
        </div>

        <div className="flex items-center gap-4 mb-4 text-sm" style={{ color: "var(--gts-portal-muted)" }}>
          <div className="flex items-center gap-1">
            <Calendar size={16} />
            {promo.startDate} - {promo.endDate}
          </div>
        </div>

        {type === "active" && (
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-lg font-semibold" style={{ color: "var(--gts-portal-text)" }}>
                {promo.reach.toLocaleString()}
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Охват
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold" style={{ color: "var(--gts-portal-success)" }}>
                {promo.uses}
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Использований
              </p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold" style={{ color: "var(--gts-portal-accent)" }}>
                {promo.conversion}%
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Конверсия
              </p>
            </div>
          </div>
        )}

        {type === "upcoming" && (
          <div className="mb-4">
            <div className="flex items-center gap-2 text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              <Users size={16} />
              Ожидаемый охват: {promo.estimatedReach.toLocaleString()}
            </div>
          </div>
        )}

        {type === "past" && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--gts-portal-text)" }}>
                {promo.totalUses} использований
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Конверсия {promo.finalConversion}%
              </p>
            </div>
            <div>
              <p className="text-sm font-medium" style={{ color: "var(--gts-portal-success)" }}>
                {(promo.revenue / 1000000).toFixed(1)}М ₽
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Общий доход
              </p>
            </div>
          </div>
        )}

        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
            style={{ 
              borderColor: "var(--gts-portal-border)",
              color: "var(--gts-portal-text)"
            }}
          >
            <Eye size={16} className="mr-2" />
            Детали
          </Button>
          {type === "active" && (
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                borderColor: "var(--gts-portal-border)",
                color: "var(--gts-portal-text)"
              }}
            >
              <MessageSquare size={16} className="mr-2" />
              Чат
            </Button>
          )}
          {type === "past" && (
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                borderColor: "var(--gts-portal-accent)",
                color: "var(--gts-portal-accent)"
              }}
            >
              <TrendingUp size={16} className="mr-2" />
              Отчет
            </Button>
          )}
        </div>
      </div>
    </Card>
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Совместные промо-акции
          </h1>
          <p style={{ color: "var(--gts-portal-muted)" }}>
            Управление кросс-промо кампаниями и отслеживание их эффективности
          </p>
        </div>
        <Button 
          style={{ 
            backgroundColor: "var(--gts-portal-accent)",
            color: "white"
          }}
        >
          <Plus size={16} className="mr-2" />
          Предложить промо
        </Button>
      </div>

      {/* Promotion Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList 
          className="grid w-full grid-cols-3"
          style={{ 
            backgroundColor: "var(--gts-portal-surface)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <TabsTrigger 
            value="active"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Активные ({activePromotions.length})
          </TabsTrigger>
          <TabsTrigger 
            value="upcoming"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Предстоящие ({upcomingPromotions.length})
          </TabsTrigger>
          <TabsTrigger 
            value="past"
            className="data-[state=active]:bg-white data-[state=active]:text-black"
          >
            Прошедшие ({pastPromotions.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {activePromotions.map((promo) => (
              <PromoCard key={promo.id} promo={promo} type="active" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {upcomingPromotions.map((promo) => (
              <PromoCard key={promo.id} promo={promo} type="upcoming" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="past" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {pastPromotions.map((promo) => (
              <PromoCard key={promo.id} promo={promo} type="past" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Workflow Status */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="mb-4">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Процесс согласования материалов
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Мини-воркфлоу для согласования промо-материалов
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: "var(--gts-portal-surface)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--gts-portal-warning)" }}>
              <span className="text-white text-sm font-medium">1</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--gts-portal-text)" }}>
                Промо "Осенний детокс" - ожидает утверждения материалов
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Загружено 3 варианта баннеров • Ожидает ответа GTS
              </p>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                borderColor: "var(--gts-portal-border)",
                color: "var(--gts-portal-text)"
              }}
            >
              Открыть чат
            </Button>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-lg" style={{ backgroundColor: "var(--gts-portal-surface)" }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: "var(--gts-portal-success)" }}>
              <span className="text-white text-sm font-medium">✓</span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium" style={{ color: "var(--gts-portal-text)" }}>
                Промо "Летние приключения" - материалы утверждены
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Все баннеры и тексты одобрены • Запуск 01.06.2024
              </p>
            </div>
            <Badge 
              variant="outline"
              style={{ 
                borderColor: "var(--gts-portal-success)",
                color: "var(--gts-portal-success)"
              }}
            >
              Готово к запуску
            </Badge>
          </div>
        </div>
      </Card>
    </div>
  );
}