import { useState } from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { ArrowLeft, CheckCircle, XCircle, AlertCircle } from "lucide-react";

interface PortalsDiagnosticProps {
  onBackToMain: () => void;
}

export function PortalsDiagnostic({ onBackToMain }: PortalsDiagnosticProps) {
  const [diagnostics, setDiagnostics] = useState<{[key: string]: "success" | "error" | "warning"}>({});

  const runDiagnostics = async () => {
    const results: {[key: string]: "success" | "error" | "warning"} = {};

    // Test component imports
    try {
      const { GTSPortalTopbar } = await import("../portal/GTSPortalTopbar");
      results["GTSPortalTopbar"] = "success";
    } catch (error) {
      results["GTSPortalTopbar"] = "error";
    }

    try {
      const { GTSBrandPartnerPortal } = await import("../portal/GTSBrandPartnerPortal");
      results["GTSBrandPartnerPortal"] = "success";
    } catch (error) {
      results["GTSBrandPartnerPortal"] = "error";
    }

    try {
      const { GTSPartnerAgentPortal } = await import("../portal/GTSPartnerAgentPortal");
      results["GTSPartnerAgentPortal"] = "success";
    } catch (error) {
      results["GTSPartnerAgentPortal"] = "error";
    }

    try {
      const { GTSContractorPortal } = await import("../portal/GTSContractorPortal");
      results["GTSContractorPortal"] = "success";
    } catch (error) {
      results["GTSContractorPortal"] = "error";
    }

    try {
      const { GTSBrandPartnerDashboard } = await import("../portal/GTSBrandPartnerDashboard");
      results["GTSBrandPartnerDashboard"] = "success";
    } catch (error) {
      results["GTSBrandPartnerDashboard"] = "error";
    }

    try {
      const { GTSBrandPartnerSidebar } = await import("../portal/GTSBrandPartnerSidebar");
      results["GTSBrandPartnerSidebar"] = "success";
    } catch (error) {
      results["GTSBrandPartnerSidebar"] = "error";
    }

    // Test UI components
    try {
      const { Button } = await import("../ui/button");
      results["Button"] = "success";
    } catch (error) {
      results["Button"] = "error";
    }

    try {
      const { Card } = await import("../ui/card");
      results["Card"] = "success";
    } catch (error) {
      results["Card"] = "error";
    }

    setDiagnostics(results);
  };

  const getStatusIcon = (status: "success" | "error" | "warning" | undefined) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <div className="w-5 h-5 bg-gray-500 rounded-full" />;
    }
  };

  const getStatusBadge = (status: "success" | "error" | "warning" | undefined) => {
    switch (status) {
      case "success":
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Работает</Badge>;
      case "error":
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Ошибка</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Предупреждение</Badge>;
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Не проверено</Badge>;
    }
  };

  const components = [
    { name: "GTSPortalTopbar", description: "Верхняя панель порталов" },
    { name: "GTSBrandPartnerPortal", description: "Brand-Partner Portal" },
    { name: "GTSPartnerAgentPortal", description: "Partner Agent Portal" },
    { name: "GTSContractorPortal", description: "Contractor Portal" },
    { name: "GTSBrandPartnerDashboard", description: "Дашборд Brand Partner" },
    { name: "GTSBrandPartnerSidebar", description: "Сайдбар Brand Partner" },
    { name: "Button", description: "UI компонент Button" },
    { name: "Card", description: "UI компонент Card" }
  ];

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
            Диагностика порталов
          </h1>
          <p className="text-gray-400 mb-4">
            Проверка импортов и компонентов системы порталов
          </p>
          <Button
            onClick={runDiagnostics}
            className="bg-[#91040C] hover:bg-[#91040C]/80 text-white"
          >
            Запустить диагностику
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {components.map((component) => (
            <Card key={component.name} className="bg-gray-900 border-gray-800">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(diagnostics[component.name])}
                    <CardTitle className="text-white text-sm">
                      {component.name}
                    </CardTitle>
                  </div>
                  {getStatusBadge(diagnostics[component.name])}
                </div>
                <CardDescription className="text-gray-400 text-sm">
                  {component.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-4 bg-gray-900 rounded-lg border border-gray-800">
          <h3 className="text-lg font-semibold text-white mb-2">
            Результаты диагностики
          </h3>
          <div className="text-gray-300">
            {Object.keys(diagnostics).length === 0 ? (
              <p>Нажмите "Запустить диагностику" для проверки компонентов</p>
            ) : (
              <div className="space-y-2">
                <p>Проверено компонентов: {Object.keys(diagnostics).length}</p>
                <p>Успешно: {Object.values(diagnostics).filter(v => v === "success").length}</p>
                <p>Ошибки: {Object.values(diagnostics).filter(v => v === "error").length}</p>
                <p>Предупреждения: {Object.values(diagnostics).filter(v => v === "warning").length}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}