import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, Users, Truck, Building2 } from "lucide-react";

interface PortalsNavigationTestProps {
  onBackToMain: () => void;
  onNavigateToPartnerAgent: () => void;
  onNavigateToContractor: () => void;
  onNavigateToBrandPartner: () => void;
}

export function PortalsNavigationTest({
  onBackToMain,
  onNavigateToPartnerAgent,
  onNavigateToContractor,
  onNavigateToBrandPartner
}: PortalsNavigationTestProps) {
  const [testResults, setTestResults] = useState<{[key: string]: string}>({});

  const testPortal = (portalName: string, navigateFunction: () => void) => {
    try {
      navigateFunction();
      setTestResults(prev => ({
        ...prev,
        [portalName]: "success"
      }));
    } catch (error) {
      setTestResults(prev => ({
        ...prev,
        [portalName]: "error"
      }));
    }
  };

  const portals = [
    {
      id: "partner-agent",
      name: "Partner Agent Portal",
      description: "Агентская программа и комиссии",
      icon: Users,
      navigate: onNavigateToPartnerAgent,
      color: "blue"
    },
    {
      id: "contractor",
      name: "Contractor Portal", 
      description: "Управление флотом и финансами",
      icon: Truck,
      navigate: onNavigateToContractor,
      color: "orange"
    },
    {
      id: "brand-partner",
      name: "Brand-Partner Portal",
      description: "Кросс-промо и программа лояльности", 
      icon: Building2,
      navigate: onNavigateToBrandPartner,
      color: "purple"
    }
  ];

  const getStatusBadge = (portalId: string) => {
    const status = testResults[portalId];
    if (status === "success") {
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">✓ Работает</Badge>;
    } else if (status === "error") {
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">✗ Ошибка</Badge>;
    }
    return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Не протестирован</Badge>;
  };

  return (
    <div className="min-h-screen bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            onClick={onBackToMain}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад к основному приложению
          </Button>
        </div>

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Тестирование навигации порталов
          </h1>
          <p className="text-gray-400">
            Проверьте работу кнопок возврата в каждом портале
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {portals.map((portal) => {
            const Icon = portal.icon;
            return (
              <Card key={portal.id} className="bg-gray-900 border-gray-800">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Icon className={`w-8 h-8 text-${portal.color}-400`} />
                    {getStatusBadge(portal.id)}
                  </div>
                  <CardTitle className="text-white">
                    {portal.name}
                  </CardTitle>
                  <CardDescription className="text-gray-400">
                    {portal.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button
                      onClick={() => testPortal(portal.id, portal.navigate)}
                      className="w-full bg-[#91040C] hover:bg-[#91040C]/80 text-white"
                    >
                      Открыть портал
                    </Button>
                    <div className="text-xs text-gray-500">
                      Протестируйте кнопку "Панель управления" в топбаре
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-2">
            Инструкции по тестированию
          </h3>
          <ol className="list-decimal list-inside text-gray-300 space-y-2">
            <li>Нажмите "Открыть портал" для каждого портала</li>
            <li>В открывшемся портале найдите кнопку "Панель управления" в верхней панели</li>
            <li>Кнопка должна быть видна рядом с логотипом GTS</li>
            <li>Нажмите на кнопку и убедитесь, что вы возвращаетесь к AdminDashboard</li>
            <li>Также проверьте пункт "Панель управления" в меню пользователя (правый верхний угол)</li>
          </ol>
        </div>
      </div>
    </div>
  );
}