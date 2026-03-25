import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { AlertTriangle, Plus, Minus, Eye, Filter, Download } from "lucide-react";

export function GTSBrandPartnerLoyalty() {
  const poolBalance = {
    current: 125450,
    available: 98230,
    reserved: 27220
  };

  const loyaltyRules = [
    {
      type: "Начисление от GTS",
      rule: "2% от суммы бронирования при переходе с вашего сайта",
      example: "Бронирование 50,000₽ = 1,000 баллов"
    },
    {
      type: "Начисление от Partner",
      rule: "1.5% от покупки при использовании GTS промокода",
      example: "Покупка 30,000₽ = 450 баллов"
    },
    {
      type: "Списание GTS",
      rule: "1 балл = 1₽ скидки на услуги GTS",
      example: "1,000 баллов = 1,000₽ скидка"
    },
    {
      type: "Списание Partner",
      rule: "1 балл = 0.8₽ скидки на ваши услуги",
      example: "1,000 баллов = 800₽ скидка"
    }
  ];

  const operations = [
    {
      id: "OP-2024-001247",
      date: "2024-01-15",
      type: "credit",
      points: 1250,
      user: "user****2847",
      note: "Бронирование катера Yamaha 252S",
      source: "GTS → Partner"
    },
    {
      id: "OP-2024-001246",
      date: "2024-01-15",
      type: "debit",
      points: -800,
      user: "user****1923",
      note: "Скидка на SPA-услуги",
      source: "Partner использование"
    },
    {
      id: "OP-2024-001245",
      date: "2024-01-14",
      type: "credit",
      points: 750,
      user: "user****5641",
      note: "Покупка с промокодом GTS2024",
      source: "Partner → GTS"
    },
    {
      id: "OP-2024-001244",
      date: "2024-01-14",
      type: "debit",
      points: -1500,
      user: "user****8372",
      note: "Скидка на прокат багги",
      source: "GTS использование"
    },
    {
      id: "OP-2024-001243",
      date: "2024-01-13",
      type: "manual",
      points: 500,
      user: "admin",
      note: "Компенсация за техническую ошибку",
      source: "Ручное начисление"
    }
  ];

  const pendingRequests = [
    {
      id: "REQ-2024-0089",
      type: "manual_credit",
      amount: 2000,
      reason: "Компенсация за отмененное бронирование",
      status: "pending",
      date: "2024-01-15"
    },
    {
      id: "REQ-2024-0088",
      type: "revoke",
      amount: -750,
      reason: "Отмена операции OP-2024-001240",
      status: "under_review",
      date: "2024-01-14"
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
          Программа лояльности
        </h1>
        <p style={{ color: "var(--gts-portal-muted)" }}>
          Управление балансом и операциями по обмену бонусными баллами
        </p>
      </div>

      {/* Pool Balance */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: "var(--gts-portal-muted)" }}>
              Общий баланс пула
            </p>
            <p className="text-3xl font-semibold" style={{ color: "var(--gts-portal-text)" }}>
              {poolBalance.current.toLocaleString()}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--gts-portal-muted)" }}>
              баллов
            </p>
          </div>
        </Card>

        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: "var(--gts-portal-muted)" }}>
              Доступно для списания
            </p>
            <p className="text-3xl font-semibold text-green-500">
              {poolBalance.available.toLocaleString()}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--gts-portal-muted)" }}>
              баллов
            </p>
          </div>
        </Card>

        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="text-center">
            <p className="text-sm mb-2" style={{ color: "var(--gts-portal-muted)" }}>
              В резерве
            </p>
            <p className="text-3xl font-semibold" style={{ color: "var(--gts-portal-warning)" }}>
              {poolBalance.reserved.toLocaleString()}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--gts-portal-muted)" }}>
              баллов
            </p>
          </div>
        </Card>
      </div>

      {/* Loyalty Rules */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="mb-4">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Правила программы лояльности
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Условия начисления и списания баллов (только для чтения)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {loyaltyRules.map((rule, index) => (
            <div 
              key={index}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: "var(--gts-portal-surface)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: "var(--gts-portal-accent)",
                    color: "var(--gts-portal-accent)"
                  }}
                >
                  {rule.type}
                </Badge>
              </div>
              <p className="text-sm mb-2" style={{ color: "var(--gts-portal-text)" }}>
                {rule.rule}
              </p>
              <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                Пример: {rule.example}
              </p>
            </div>
          ))}
        </div>
      </Card>

      {/* Pending Requests */}
      {pendingRequests.length > 0 && (
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="mb-4">
            <div className="flex items-center gap-2 mb-1">
              <AlertTriangle size={20} style={{ color: "var(--gts-portal-warning)" }} />
              <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
                Заявки на модерацию
              </h3>
            </div>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              Ожидают рассмотрения администратором GTS
            </p>
          </div>

          <div className="space-y-3">
            {pendingRequests.map((request) => (
              <div 
                key={request.id}
                className="flex items-center justify-between p-4 rounded-lg border"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)"
                }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium" style={{ color: "var(--gts-portal-text)" }}>
                      {request.id}
                    </p>
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: request.status === "pending" ? "var(--gts-portal-warning)" : "var(--gts-portal-muted)",
                        color: request.status === "pending" ? "var(--gts-portal-warning)" : "var(--gts-portal-muted)"
                      }}
                    >
                      {request.status === "pending" ? "Ожидает" : "На рассмотрении"}
                    </Badge>
                  </div>
                  <p className="text-sm mb-1" style={{ color: "var(--gts-portal-text)" }}>
                    {request.reason}
                  </p>
                  <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                    {request.date} • {request.amount > 0 ? "+" : ""}{request.amount.toLocaleString()} баллов
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
                  <Eye size={16} className="mr-2" />
                  Детали
                </Button>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Operations History */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
              История операций
            </h3>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              Все транзакции по обмену баллами
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                borderColor: "var(--gts-portal-border)",
                color: "var(--gts-portal-text)"
              }}
            >
              <Filter size={16} className="mr-2" />
              Фильтр
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              style={{ 
                borderColor: "var(--gts-portal-border)",
                color: "var(--gts-portal-text)"
              }}
            >
              <Download size={16} className="mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--gts-portal-border)" }}>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>ID операции</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Дата</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Пользователь</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Баллы</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Описание</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Источник</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {operations.map((operation) => (
                <TableRow key={operation.id} style={{ borderColor: "var(--gts-portal-border)" }}>
                  <TableCell className="font-mono text-sm" style={{ color: "var(--gts-portal-text)" }}>
                    {operation.id}
                  </TableCell>
                  <TableCell style={{ color: "var(--gts-portal-text)" }}>
                    {operation.date}
                  </TableCell>
                  <TableCell className="font-mono text-sm" style={{ color: "var(--gts-portal-muted)" }}>
                    {operation.user}
                  </TableCell>
                  <TableCell>
                    <span className={`font-medium ${
                      operation.type === "credit" ? "text-green-500" : 
                      operation.type === "debit" ? "text-red-500" : 
                      "text-yellow-500"
                    }`}>
                      {operation.points > 0 ? "+" : ""}{operation.points.toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell style={{ color: "var(--gts-portal-text)" }}>
                    {operation.note}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: "var(--gts-portal-border)",
                        color: "var(--gts-portal-muted)"
                      }}
                    >
                      {operation.source}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Admin Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="text-center">
            <Plus size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-success)" }} />
            <h4 className="text-lg mb-2" style={{ color: "var(--gts-portal-text)" }}>
              Ручное начисление
            </h4>
            <p className="text-sm mb-4" style={{ color: "var(--gts-portal-muted)" }}>
              Создать заявку на начисление баллов
            </p>
            <Button 
              className="w-full"
              style={{ 
                backgroundColor: "var(--gts-portal-success)",
                color: "white"
              }}
            >
              Создать заявку
            </Button>
          </div>
        </Card>

        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="text-center">
            <Minus size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-error)" }} />
            <h4 className="text-lg mb-2" style={{ color: "var(--gts-portal-text)" }}>
              Отмена операции
            </h4>
            <p className="text-sm mb-4" style={{ color: "var(--gts-portal-muted)" }}>
              Создать заявку на отмену транзакции
            </p>
            <Button 
              variant="outline"
              className="w-full"
              style={{ 
                borderColor: "var(--gts-portal-error)",
                color: "var(--gts-portal-error)"
              }}
            >
              Создать заявку
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}