import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Badge } from "../ui/badge";
import { 
  Users,
  Building,
  Star,
  CheckCircle,
  ArrowRight,
  FileText,
  Shield,
  Loader2,
  Info
} from "lucide-react";

interface Role {
  id: string;
  name: string;
  type: "partner-agent" | "contractor" | "brand-partner";
  description: string;
  permissions: string[];
  organization: string;
  status: "active" | "pending" | "suspended";
}

interface GTSPortalRoleConsentProps {
  onContinue: (agreedRoles: string[]) => void;
  onDecline: () => void;
  roles: Role[];
  userEmail?: string;
  isLoading?: boolean;
}

const mockRoles: Role[] = [
  {
    id: "role-1",
    name: "Партнёр-Агент",
    type: "partner-agent",
    description: "Представляет интересы GTS и продвигает услуги клубы среди потенциальных клиентов",
    permissions: [
      "Просмотр каталога услуг",
      "Создание и управление бронированиями",
      "Доступ к маркетинговым материалам",
      "Отчёты по продажам",
      "Система комиссионных"
    ],
    organization: "GTS Partner Network",
    status: "active"
  },
  {
    id: "role-2", 
    name: "Подрядчик",
    type: "contractor",
    description: "Предоставляет техническое обслуживание и поддержку техники клуба",
    permissions: [
      "Управление техническим обслуживанием",
      "Контроль состояния техники",
      "Планирование работ",
      "Отчёты о выполненных работах",
      "Доступ к техническим спецификациям"
    ],
    organization: "GTS Technical Services",
    status: "pending"
  }
];

export function GTSPortalRoleConsent({ 
  onContinue, 
  onDecline,
  roles = mockRoles,
  userEmail = "partner@example.com",
  isLoading = false
}: GTSPortalRoleConsentProps) {
  const [agreedTerms, setAgreedTerms] = useState(false);

  const getRoleIcon = (type: string) => {
    switch (type) {
      case "partner-agent": return Users;
      case "contractor": return Building;
      case "brand-partner": return Star;
      default: return Users;
    }
  };

  const getRoleBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
      case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "suspended": return "bg-red-500/20 text-red-400 border-red-500/30";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Активна";
      case "pending": return "Ожидает";
      case "suspended": return "Приостановлена";
      default: return status;
    }
  };

  const handleContinue = () => {
    if (agreedTerms) {
      onContinue(roles.map(role => role.id));
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6 py-12"
      style={{ backgroundColor: '#0B0B0C' }}
    >
      <div className="w-full max-w-2xl">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div 
            className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: '#17181A' }}
          >
            <Shield className="w-8 h-8" style={{ color: '#91040C' }} />
          </div>
          <h1 
            className="text-3xl font-bold mb-3"
            style={{ 
              fontFamily: 'Nokia.Kokia, Inter, sans-serif',
              color: '#FFFFFF'
            }}
          >
            Добро пожаловать в GTS Portal
          </h1>
          <p 
            className="text-lg"
            style={{ 
              fontFamily: 'Gilroy, Inter, sans-serif',
              color: '#A6A7AA'
            }}
          >
            {userEmail}
          </p>
        </div>

        {/* Info Banner */}
        <Card 
          className="p-4 mb-6 border-0"
          style={{ 
            backgroundColor: 'rgba(145, 4, 12, 0.1)',
            border: '1px solid rgba(145, 4, 12, 0.2)'
          }}
        >
          <div className="flex items-start">
            <Info className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: '#91040C' }} />
            <div>
              <p 
                className="text-sm font-medium mb-1"
                style={{ 
                  color: '#91040C',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Первый вход в систему
              </p>
              <p 
                className="text-sm"
                style={{ 
                  color: '#91040C',
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  opacity: 0.9
                }}
              >
                Для вас настроены следующие роли в системе. Ознакомьтесь с правами доступа и подтвердите согласие.
              </p>
            </div>
          </div>
        </Card>

        {/* Roles List */}
        <div className="space-y-4 mb-8">
          {roles.map((role) => {
            const IconComponent = getRoleIcon(role.type);
            return (
              <Card 
                key={role.id}
                className="p-6 border-0"
                style={{ 
                  backgroundColor: '#17181A',
                  border: '2px solid #232428'
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div 
                      className="w-12 h-12 rounded-xl mr-4 flex items-center justify-center"
                      style={{ backgroundColor: '#121214' }}
                    >
                      <IconComponent className="w-6 h-6" style={{ color: '#91040C' }} />
                    </div>
                    <div>
                      <h3 
                        className="text-lg font-bold mb-1"
                        style={{ 
                          fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                          color: '#FFFFFF'
                        }}
                      >
                        {role.name}
                      </h3>
                      <p 
                        className="text-sm"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {role.organization}
                      </p>
                    </div>
                  </div>
                  <Badge 
                    className={`text-xs rounded-lg ${getRoleBadgeColor(role.status)}`}
                    style={{ fontFamily: 'Gilroy, Inter, sans-serif' }}
                  >
                    {getStatusText(role.status)}
                  </Badge>
                </div>

                <p 
                  className="text-sm mb-4"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    lineHeight: '1.6'
                  }}
                >
                  {role.description}
                </p>

                <div>
                  <h4 
                    className="text-sm font-medium mb-3"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Права доступа:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {role.permissions.map((permission, index) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="w-4 h-4 mr-2 flex-shrink-0" style={{ color: '#2BB673' }} />
                        <span 
                          className="text-sm"
                          style={{ 
                            color: '#A6A7AA',
                            fontFamily: 'Gilroy, Inter, sans-serif'
                          }}
                        >
                          {permission}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Terms Agreement */}
        <Card 
          className="p-6 mb-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-start space-x-4">
            <Checkbox
              id="partner-terms"
              checked={agreedTerms}
              onCheckedChange={(checked) => setAgreedTerms(!!checked)}
              className="mt-0.5 flex-shrink-0"
            />
            <div className="space-y-3">
              <label 
                htmlFor="partner-terms"
                className="block text-sm font-medium cursor-pointer"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#FFFFFF'
                }}
              >
                Согласие с условиями партнёрства
              </label>
              <p 
                className="text-sm leading-relaxed"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#A6A7AA'
                }}
              >
                Я подтверждаю, что ознакомился с назначенными мне ролями и согласен с{" "}
                <button 
                  type="button" 
                  className="underline hover:no-underline"
                  style={{ color: '#91040C' }}
                >
                  Условиями партнёрского соглашения
                </button>,{" "}
                <button 
                  type="button" 
                  className="underline hover:no-underline"
                  style={{ color: '#91040C' }}
                >
                  Политикой конфиденциальности
                </button>{" "}
                и{" "}
                <button 
                  type="button" 
                  className="underline hover:no-underline"
                  style={{ color: '#91040C' }}
                >
                  Правилами использования системы
                </button>.
              </p>
              <div className="flex items-center text-xs">
                <FileText className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                <span style={{ color: '#A6A7AA' }}>
                  Последние изменения: 15 августа 2024
                </span>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={onDecline}
            variant="outline"
            className="flex-1 rounded-xl font-medium py-3 border-0"
            style={{ 
              backgroundColor: '#121214',
              color: '#FFFFFF',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Отклонить
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!agreedTerms || isLoading}
            className="flex-1 rounded-xl font-medium py-3"
            style={{ 
              backgroundColor: '#91040C',
              color: '#FFFFFF',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                Настройка...
              </>
            ) : (
              <>
                Продолжить
                <ArrowRight className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p 
            className="text-xs"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Возникли вопросы?{" "}
            <button 
              className="underline hover:no-underline"
              style={{ color: '#91040C' }}
            >
              Обратитесь в поддержку партнёров
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}