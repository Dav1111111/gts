import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { FileText, Download, Eye, Calendar, AlertCircle } from "lucide-react";

export function GTSBrandPartnerDocuments() {
  const documents = [
    {
      id: "DOC-2024-001",
      name: "Соглашение о партнерстве",
      type: "contract",
      version: "v1.2",
      date: "2024-01-15",
      status: "active",
      size: "2.4 MB",
      description: "Основное соглашение о сотрудничестве и кросс-промо"
    },
    {
      id: "DOC-2024-002",
      name: "Техническое задание на интеграцию",
      type: "technical",
      version: "v2.0",
      date: "2024-01-20",
      status: "active",
      size: "1.8 MB",
      description: "Спецификация API и требования к интеграции"
    },
    {
      id: "DOC-2024-003",
      name: "Отчет за декабрь 2023",
      type: "report",
      version: "Final",
      date: "2024-01-05",
      status: "archived",
      size: "856 KB",
      description: "Месячный отчет по активности и доходам"
    },
    {
      id: "DOC-2024-004",
      name: "Отчет за январь 2024",
      type: "report",
      version: "Final",
      date: "2024-02-01",
      status: "active",
      size: "924 KB",
      description: "Месячный отчет по активности и доходам"
    },
    {
      id: "DOC-2024-005",
      name: "Акт сверки Q4 2023",
      type: "reconciliation",
      version: "v1.0",
      date: "2024-01-10",
      status: "pending_signature",
      size: "412 KB",
      description: "Квартальный акт сверки взаиморасчетов"
    }
  ];

  const upcomingDeadlines = [
    {
      document: "Акт сверки Q1 2024",
      deadline: "2024-04-05",
      daysLeft: 15,
      type: "reconciliation"
    },
    {
      document: "Продление договора",
      deadline: "2024-06-15",
      daysLeft: 85,
      type: "contract"
    }
  ];

  const getDocumentIcon = (type: string) => {
    return FileText; // Можно добавить разные иконки для разных типов
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "var(--gts-portal-success)";
      case "pending_signature": return "var(--gts-portal-warning)";
      case "archived": return "var(--gts-portal-muted)";
      default: return "var(--gts-portal-muted)";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "active": return "Активен";
      case "pending_signature": return "Ожидает подписания";
      case "archived": return "Архивный";
      default: return status;
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "contract": return "Договор";
      case "technical": return "Техническая документация";
      case "report": return "Отчет";
      case "reconciliation": return "Акт сверки";
      default: return type;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl mb-2" style={{ color: "var(--gts-portal-text)" }}>
          Документы
        </h1>
        <p style={{ color: "var(--gts-portal-muted)" }}>
          Договоры, отчеты и акты сверки по партнерскому сотрудничеству
        </p>
      </div>

      {/* Upcoming Deadlines */}
      {upcomingDeadlines.length > 0 && (
        <Card 
          className="p-6"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle size={20} style={{ color: "var(--gts-portal-warning)" }} />
            <h3 className="text-lg" style={{ color: "var(--gts-portal-text)" }}>
              Предстоящие сроки
            </h3>
          </div>

          <div className="space-y-3">
            {upcomingDeadlines.map((item, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-4 rounded-lg"
                style={{ backgroundColor: "var(--gts-portal-surface)" }}
              >
                <div className="flex items-center gap-3">
                  <Calendar size={16} style={{ color: "var(--gts-portal-warning)" }} />
                  <div>
                    <p className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                      {item.document}
                    </p>
                    <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
                      Срок: {item.deadline}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="outline"
                  style={{ 
                    borderColor: item.daysLeft <= 30 ? "var(--gts-portal-warning)" : "var(--gts-portal-muted)",
                    color: item.daysLeft <= 30 ? "var(--gts-portal-warning)" : "var(--gts-portal-muted)"
                  }}
                >
                  {item.daysLeft} дней
                </Badge>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Documents Table */}
      <Card 
        className="p-0 overflow-hidden"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <div className="p-6 pb-0">
          <h3 className="text-lg mb-1" style={{ color: "var(--gts-portal-text)" }}>
            Все документы
          </h3>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            История и текущие документы партнерства
          </p>
        </div>

        <div className="p-6 pt-4">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow style={{ borderColor: "var(--gts-portal-border)" }}>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Документ</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Тип</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Версия</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Дата</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Статус</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Размер</TableHead>
                  <TableHead style={{ color: "var(--gts-portal-muted)" }}>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documents.map((doc) => {
                  const DocIcon = getDocumentIcon(doc.type);
                  
                  return (
                    <TableRow key={doc.id} style={{ borderColor: "var(--gts-portal-border)" }}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <DocIcon size={20} style={{ color: "var(--gts-portal-accent)" }} />
                          <div>
                            <p className="font-medium" style={{ color: "var(--gts-portal-text)" }}>
                              {doc.name}
                            </p>
                            <p className="text-xs" style={{ color: "var(--gts-portal-muted)" }}>
                              {doc.description}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: "var(--gts-portal-border)",
                            color: "var(--gts-portal-muted)"
                          }}
                        >
                          {getTypeText(doc.type)}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: "var(--gts-portal-text)" }}>
                        {doc.version}
                      </TableCell>
                      <TableCell style={{ color: "var(--gts-portal-text)" }}>
                        {doc.date}
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="outline"
                          style={{ 
                            borderColor: getStatusColor(doc.status),
                            color: getStatusColor(doc.status)
                          }}
                        >
                          {getStatusText(doc.status)}
                        </Badge>
                      </TableCell>
                      <TableCell style={{ color: "var(--gts-portal-muted)" }}>
                        {doc.size}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye size={14} />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Download size={14} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>

      {/* Document Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card 
          className="p-6 text-center"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-accent)" }} />
          <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Договоры
          </h4>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Соглашения о партнерстве
          </p>
          <p className="text-2xl font-semibold mt-2" style={{ color: "var(--gts-portal-text)" }}>
            2
          </p>
        </Card>

        <Card 
          className="p-6 text-center"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-accent)" }} />
          <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Отчеты
          </h4>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Периодические отчеты
          </p>
          <p className="text-2xl font-semibold mt-2" style={{ color: "var(--gts-portal-text)" }}>
            2
          </p>
        </Card>

        <Card 
          className="p-6 text-center"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-accent)" }} />
          <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Акты сверки
          </h4>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            Взаиморасчеты
          </p>
          <p className="text-2xl font-semibold mt-2" style={{ color: "var(--gts-portal-text)" }}>
            1
          </p>
        </Card>

        <Card 
          className="p-6 text-center"
          style={{ 
            backgroundColor: "var(--gts-portal-card)",
            borderColor: "var(--gts-portal-border)"
          }}
        >
          <FileText size={32} className="mx-auto mb-3" style={{ color: "var(--gts-portal-accent)" }} />
          <h4 className="font-medium mb-2" style={{ color: "var(--gts-portal-text)" }}>
            Техническая
          </h4>
          <p className="text-sm" style={{ color: "var(--gts-portal-muted)" }}>
            API и интеграции
          </p>
          <p className="text-2xl font-semibold mt-2" style={{ color: "var(--gts-portal-text)" }}>
            1
          </p>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card 
        className="p-6"
        style={{ 
          backgroundColor: "var(--gts-portal-card)",
          borderColor: "var(--gts-portal-border)"
        }}
      >
        <h3 className="text-lg mb-4" style={{ color: "var(--gts-portal-text)" }}>
          Быстрые действия
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            style={{ 
              borderColor: "var(--gts-portal-border)",
              color: "var(--gts-portal-text)"
            }}
          >
            <Download size={24} />
            <div className="text-center">
              <p className="font-medium">Скачать все документы</p>
              <p className="text-xs opacity-70">ZIP архив</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            style={{ 
              borderColor: "var(--gts-portal-border)",
              color: "var(--gts-portal-text)"
            }}
          >
            <FileText size={24} />
            <div className="text-center">
              <p className="font-medium">Запросить документ</p>
              <p className="text-xs opacity-70">Создать заявку</p>
            </div>
          </Button>

          <Button 
            variant="outline" 
            className="h-auto p-4 flex flex-col items-center gap-2"
            style={{ 
              borderColor: "var(--gts-portal-border)",
              color: "var(--gts-portal-text)"
            }}
          >
            <Calendar size={24} />
            <div className="text-center">
              <p className="font-medium">Календарь сроков</p>
              <p className="text-xs opacity-70">Все дедлайны</p>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
}