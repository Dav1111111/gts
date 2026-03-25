import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Key, Webhook, Activity, Plus, Eye, Trash2, Copy, AlertCircle, CheckCircle2 } from "lucide-react";

export function GTSBrandPartnerAPI() {
  const apiKeys = [
    {
      id: "ak_1234567890abcdef",
      name: "Production API Key",
      created: "2024-01-15",
      lastUsed: "2024-01-20",
      status: "active",
      permissions: ["read", "write"]
    },
    {
      id: "ak_test_9876543210fedcba",
      name: "Test Environment",
      created: "2024-01-10",
      lastUsed: "2024-01-19",
      status: "active",
      permissions: ["read"]
    }
  ];

  const webhooks = [
    {
      id: "wh_booking_confirm",
      endpoint: "https://partner-spa.com/webhooks/gts/booking",
      events: ["booking.confirmed", "booking.cancelled"],
      status: "active",
      lastDelivery: "2024-01-20 14:30",
      successRate: 98.5
    },
    {
      id: "wh_loyalty_update",
      endpoint: "https://partner-spa.com/webhooks/gts/loyalty",
      events: ["loyalty.points.awarded", "loyalty.points.redeemed"],
      status: "active",
      lastDelivery: "2024-01-20 16:45",
      successRate: 99.2
    }
  ];

  const integrationStatus = [
    {
      service: "Booking API",
      status: "operational",
      uptime: "99.9%",
      responseTime: "145ms",
      lastCheck: "2 минуты назад"
    },
    {
      service: "Loyalty API", 
      status: "operational",
      uptime: "99.7%",
      responseTime: "89ms",
      lastCheck: "1 минута назад"
    },
    {
      service: "Analytics API",
      status: "warning",
      uptime: "98.2%",
      responseTime: "324ms",
      lastCheck: "5 минут назад"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "operational": return "var(--gts-portal-success)";
      case "warning": return "var(--gts-portal-warning)";
      case "error": return "var(--gts-portal-error)";
      default: return "var(--gts-portal-muted)";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "operational": return CheckCircle2;
      case "warning": return AlertCircle;
      case "error": return AlertCircle;
      default: return Activity;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
          API & Интеграции
        </h1>
        <p style={{ color: "var(--gts-portal-muted)" }}>
          Управление API ключами, вебхуками и мониторинг интеграций
        </p>
      </div>

      {/* Integration Status */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="mb-4">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Статус интеграций
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Мониторинг работоспособности API сервисов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrationStatus.map((service, index) => {
            const StatusIcon = getStatusIcon(service.status);
            const statusColor = getStatusColor(service.status);
            
            return (
              <div 
                key={index}
                className="p-4 rounded-lg border"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)"
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <StatusIcon size={20} style={{ color: statusColor }} />
                  <h4 className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                    {service.service}
                  </h4>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span style={{ color: "var(--gts-portal-muted)" }}>Uptime:</span>
                    <span style={{ color: "var(--gts-portal-text)" }}>{service.uptime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--gts-portal-muted)" }}>Отклик:</span>
                    <span style={{ color: "var(--gts-portal-text)" }}>{service.responseTime}</span>
                  </div>
                  <div className="flex justify-between">
                    <span style={{ color: "var(--gts-portal-muted)" }}>Проверен:</span>
                    <span style={{ color: "var(--gts-portal-text)" }}>{service.lastCheck}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* API Keys */}
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
              API ключи
            </h3>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              Управление доступом к API GTS
            </p>
          </div>
          <Button 
            style={{ 
              backgroundColor: "var(--gts-portal-accent)",
              color: "white"
            }}
          >
            <Plus size={16} className="mr-2" />
            Создать ключ
          </Button>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow style={{ borderColor: "var(--gts-portal-border)" }}>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Название</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Ключ</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Создан</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Последнее использование</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Статус</TableHead>
                <TableHead style={{ color: "var(--gts-portal-muted)" }}>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {apiKeys.map((key) => (
                <TableRow key={key.id} style={{ borderColor: "var(--gts-portal-border)" }}>
                  <TableCell>
                    <div>
                      <p className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                        {key.name}
                      </p>
                      <div className="flex gap-1 mt-1">
                        {key.permissions.map((perm) => (
                          <Badge 
                            key={perm}
                            variant="outline"
                            className="text-xs"
                            style={{ 
                              borderColor: "var(--gts-portal-border)",
                              color: "var(--gts-portal-muted)"
                            }}
                          >
                            {perm}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <code className="text-sm font-mono" style={{ color: "var(--gts-portal-text)" }}>
                        {key.id.slice(0, 12)}...
                      </code>
                      <Button variant="ghost" size="sm">
                        <Copy size={14} />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell style={{ color: "var(--gts-portal-text)" }}>
                    {key.created}
                  </TableCell>
                  <TableCell style={{ color: "var(--gts-portal-text)" }}>
                    {key.lastUsed}
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      style={{ 
                        borderColor: "var(--gts-portal-success)",
                        color: "var(--gts-portal-success)"
                      }}
                    >
                      Активен
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye size={14} />
                      </Button>
                      <Button variant="ghost" size="sm" style={{ color: "var(--gts-portal-error)" }}>
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* Webhooks */}
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
              Вебхуки
            </h3>
            <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
              Настройка уведомлений о событиях
            </p>
          </div>
          <Button 
            style={{ 
              backgroundColor: "var(--gts-portal-accent)",
              color: "white"
            }}
          >
            <Plus size={16} className="mr-2" />
            Добавить вебхук
          </Button>
        </div>

        <div className="space-y-4">
          {webhooks.map((webhook) => (
            <div 
              key={webhook.id}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: "var(--gts-portal-surface)",
                borderColor: "var(--gts-portal-border)"
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Webhook size={20} style={{ color: "var(--gts-portal-accent)" }} />
                  <h4 className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                    {webhook.id}
                  </h4>
                  <Badge 
                    variant="outline"
                    style={{ 
                      borderColor: "var(--gts-portal-success)",
                      color: "var(--gts-portal-success)"
                    }}
                  >
                    Активен
                  </Badge>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Eye size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" style={{ color: "var(--gts-portal-error)" }}>
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--gts-portal-text)" }}>
                    Endpoint:
                  </p>
                  <code className="text-xs break-all" style={{ color: "var(--gts-portal-muted)" }}>
                    {webhook.endpoint}
                  </code>
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--gts-portal-text)" }}>
                    События:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {webhook.events.map((event) => (
                      <Badge 
                        key={event}
                        variant="outline"
                        className="text-xs"
                        style={{ 
                          borderColor: "var(--gts-portal-border)",
                          color: "var(--gts-portal-muted)"
                        }}
                      >
                        {event}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--gts-portal-text)" }}>
                    Последняя доставка:
                  </p>
                  <p style={{ color: "var(--gts-portal-muted)" }}>
                    {webhook.lastDelivery}
                  </p>
                </div>
                <div>
                  <p className="font-medium mb-1" style={{ color: "var(--gts-portal-text)" }}>
                    Успешность доставки:
                  </p>
                  <p className="text-green-500">
                    {webhook.successRate}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Test API */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="mb-4">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Тестирование API
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Быстрая проверка доступности и корректности API вызовов
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="test-endpoint" style={{ color: "var(--gts-portal-text)" }}>
                Endpoint
              </Label>
              <Input 
                id="test-endpoint"
                placeholder="/api/v1/bookings"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              />
            </div>

            <div>
              <Label htmlFor="test-method" style={{ color: "var(--gts-portal-text)" }}>
                Метод
              </Label>
              <select 
                id="test-method"
                className="w-full px-3 py-2 rounded-md border"
                style={{ 
                  backgroundColor: "var(--gts-portal-surface)",
                  borderColor: "var(--gts-portal-border)",
                  color: "var(--gts-portal-text)"
                }}
              >
                <option>GET</option>
                <option>POST</option>
                <option>PUT</option>
                <option>DELETE</option>
              </select>
            </div>

            <Button 
              className="w-full"
              style={{ 
                backgroundColor: "var(--gts-portal-accent)",
                color: "white"
              }}
            >
              <Activity size={16} className="mr-2" />
              Выполнить запрос
            </Button>
          </div>

          <div>
            <Label style={{ color: "var(--gts-portal-text)" }}>
              Ответ:
            </Label>
            <div 
              className="p-4 rounded-lg mt-2 h-32 overflow-auto"
              style={{ backgroundColor: "var(--gts-portal-surface)" }}
            >
              <pre className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                {`{
  "status": "success",
  "data": {
    "message": "API работает корректно"
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}