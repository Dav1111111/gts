import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Progress } from "../ui/progress";
import { 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Download,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  FileText,
  CreditCard
} from "lucide-react";

export function GTSContractorFinance() {
  const [selectedPeriod, setSelectedPeriod] = useState("current-month");

  // Mock financial data
  const financialSummary = {
    gmv: 2847500,
    gtsFee: 284750,
    netPayable: 2562750,
    paidAmount: 2278000,
    pendingAmount: 284750,
    feePercentage: 10
  };

  const bookingPayouts = [
    {
      id: "booking-001",
      date: "2024-02-12",
      service: "Robinson R44",
      client: "Александр Иванов",
      grossAmount: 85000,
      gtsFee: 8500,
      netAmount: 76500,
      status: "pending" as const,
      processingDate: "2024-02-14"
    },
    {
      id: "booking-002",
      date: "2024-02-08",
      service: "Yamaha 252S",
      client: "GTS Premium Tour",
      grossAmount: 120000,
      gtsFee: 12000,
      netAmount: 108000,
      status: "paid" as const,
      processingDate: "2024-02-10"
    },
    {
      id: "booking-003",
      date: "2024-02-05",
      service: "Honda Talon",
      client: "Михаил Петров",
      grossAmount: 45000,
      gtsFee: 4500,
      netAmount: 40500,
      status: "paid" as const,
      processingDate: "2024-02-07"
    },
    {
      id: "booking-004",
      date: "2024-01-28",
      service: "Slingshot Polaris R",
      client: "Елена Сидорова",
      grossAmount: 65000,
      gtsFee: 6500,
      netAmount: 58500,
      status: "processing" as const,
      processingDate: "2024-02-15"
    }
  ];

  const payoutHistory = [
    {
      id: "payout-001",
      date: "2024-02-10",
      amount: 324000,
      bookingsCount: 8,
      status: "completed" as const,
      method: "bank_transfer",
      reference: "TXN-2024-02-001"
    },
    {
      id: "payout-002",
      date: "2024-01-25",
      amount: 567500,
      bookingsCount: 12,
      status: "completed" as const,
      method: "bank_transfer",
      reference: "TXN-2024-01-002"
    },
    {
      id: "payout-003",
      date: "2024-01-10",
      amount: 289000,
      bookingsCount: 6,
      status: "completed" as const,
      method: "bank_transfer",
      reference: "TXN-2024-01-001"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return '#2BB673';
      case 'pending': return '#F5A623';
      case 'processing': return '#0EA5E9';
      case 'completed': return '#2BB673';
      default: return '#A6A7AA';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid': return 'Выплачено';
      case 'pending': return 'Ожидает';
      case 'processing': return 'Обработка';
      case 'completed': return 'Завершено';
      default: return 'Неизвестно';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 
            className="text-3xl font-bold mb-2"
            style={{ 
              fontFamily: 'Nokia.Kokia, Inter, sans-serif',
              color: '#FFFFFF'
            }}
          >
            Финансы
          </h1>
          <p 
            className="text-lg"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Выплаты и финансовые отчеты
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger 
              className="w-48 border-0"
              style={{ 
                backgroundColor: '#121214',
                color: '#FFFFFF',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              <Calendar className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
              <SelectValue />
            </SelectTrigger>
            <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
              <SelectItem value="current-month">Текущий месяц</SelectItem>
              <SelectItem value="last-month">Прошлый месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Financial Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" style={{ color: '#91040C' }} />
            <TrendingUp className="w-5 h-5" style={{ color: '#2BB673' }} />
          </div>
          <div className="space-y-2">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {financialSummary.gmv.toLocaleString('ru-RU')} ₽
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Валовый оборот (GMV)
            </p>
          </div>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CreditCard className="w-8 h-8" style={{ color: '#F5A623' }} />
            <span 
              className="text-sm"
              style={{ 
                color: '#F5A623',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              {financialSummary.feePercentage}%
            </span>
          </div>
          <div className="space-y-2">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {financialSummary.gtsFee.toLocaleString('ru-RU')} ₽
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Комиссия GTS
            </p>
          </div>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" style={{ color: '#2BB673' }} />
            <div className="text-right">
              <p 
                className="text-xs"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Выплачено
              </p>
              <p 
                className="text-sm font-medium"
                style={{ 
                  color: '#2BB673',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {((financialSummary.paidAmount / financialSummary.netPayable) * 100).toFixed(0)}%
              </p>
            </div>
          </div>
          <div className="space-y-3">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {financialSummary.paidAmount.toLocaleString('ru-RU')} ₽
            </p>
            <Progress 
              value={(financialSummary.paidAmount / financialSummary.netPayable) * 100} 
              className="h-2"
            />
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              К выплате: {financialSummary.netPayable.toLocaleString('ru-RU')} ₽
            </p>
          </div>
        </Card>

        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Clock className="w-8 h-8" style={{ color: '#F5A623' }} />
            <Badge 
              style={{ 
                backgroundColor: '#F5A623',
                color: '#000000'
              }}
            >
              Ожидает
            </Badge>
          </div>
          <div className="space-y-2">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {financialSummary.pendingAmount.toLocaleString('ru-RU')} ₽
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Ожидает выплаты
            </p>
          </div>
        </Card>
      </div>

      {/* Detailed Tables */}
      <Tabs defaultValue="bookings" className="space-y-6">
        <TabsList 
          className="grid w-full grid-cols-3"
          style={{ backgroundColor: '#121214' }}
        >
          <TabsTrigger value="bookings">Разбивка по бронированиям</TabsTrigger>
          <TabsTrigger value="payouts">История выплат</TabsTrigger>
          <TabsTrigger value="documents">Документы</TabsTrigger>
        </TabsList>

        <TabsContent value="bookings">
          <Card 
            className="border-0 overflow-hidden"
            style={{ backgroundColor: '#17181A' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#232428' }}>
              <h3 
                className="text-lg font-medium"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                }}
              >
                Разбивка выплат по бронированиям
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#232428' }}>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Бронирование
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Дата
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Валовая сумма
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Комиссия GTS
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      К выплате
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Статус
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bookingPayouts.map((payout) => (
                    <tr 
                      key={payout.id}
                      className="border-b hover:bg-gray-800/20"
                      style={{ borderColor: '#232428' }}
                    >
                      <td className="py-4 px-6">
                        <div>
                          <p 
                            className="font-medium"
                            style={{ 
                              color: '#FFFFFF',
                              fontFamily: 'Gilroy, Inter, sans-serif'
                            }}
                          >
                            {payout.service}
                          </p>
                          <p 
                            className="text-sm"
                            style={{ 
                              color: '#A6A7AA',
                              fontFamily: 'Gilroy, Inter, sans-serif'
                            }}
                          >
                            {payout.client}
                          </p>
                        </div>
                      </td>
                      <td 
                        className="py-4 px-6"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {new Date(payout.date).toLocaleDateString('ru-RU')}
                      </td>
                      <td 
                        className="py-4 px-6 font-medium"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {payout.grossAmount.toLocaleString('ru-RU')} ₽
                      </td>
                      <td 
                        className="py-4 px-6"
                        style={{ 
                          color: '#F5A623',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        -{payout.gtsFee.toLocaleString('ru-RU')} ₽
                      </td>
                      <td 
                        className="py-4 px-6 font-medium"
                        style={{ 
                          color: '#2BB673',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {payout.netAmount.toLocaleString('ru-RU')} ₽
                      </td>
                      <td className="py-4 px-6">
                        <Badge 
                          style={{ 
                            backgroundColor: getStatusColor(payout.status),
                            color: '#FFFFFF'
                          }}
                        >
                          {getStatusText(payout.status)}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="payouts">
          <Card 
            className="border-0 overflow-hidden"
            style={{ backgroundColor: '#17181A' }}
          >
            <div className="p-6 border-b" style={{ borderColor: '#232428' }}>
              <h3 
                className="text-lg font-medium"
                style={{ 
                  color: '#FFFFFF',
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif'
                }}
              >
                История выплат
              </h3>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b" style={{ borderColor: '#232428' }}>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Дата
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Сумма
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Бронирований
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Статус
                    </th>
                    <th 
                      className="text-left py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Референс
                    </th>
                    <th 
                      className="text-right py-4 px-6"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Действия
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payoutHistory.map((payout) => (
                    <tr 
                      key={payout.id}
                      className="border-b hover:bg-gray-800/20"
                      style={{ borderColor: '#232428' }}
                    >
                      <td 
                        className="py-4 px-6"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {new Date(payout.date).toLocaleDateString('ru-RU')}
                      </td>
                      <td 
                        className="py-4 px-6 font-medium"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {payout.amount.toLocaleString('ru-RU')} ₽
                      </td>
                      <td 
                        className="py-4 px-6"
                        style={{ 
                          color: '#FFFFFF',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {payout.bookingsCount}
                      </td>
                      <td className="py-4 px-6">
                        <Badge 
                          style={{ 
                            backgroundColor: getStatusColor(payout.status),
                            color: '#FFFFFF'
                          }}
                        >
                          {getStatusText(payout.status)}
                        </Badge>
                      </td>
                      <td 
                        className="py-4 px-6 font-mono text-sm"
                        style={{ 
                          color: '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        {payout.reference}
                      </td>
                      <td className="py-4 px-6 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-0"
                          style={{ 
                            backgroundColor: '#121214',
                            color: '#FFFFFF'
                          }}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Скачать
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card 
            className="p-6 border-0"
            style={{ backgroundColor: '#17181A' }}
          >
            <h3 
              className="text-lg font-medium mb-4"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Финансовые документы
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div 
                className="p-4 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-800/20"
                style={{ borderColor: '#232428' }}
              >
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: '#A6A7AA' }} />
                  <p 
                    className="font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Акты выполненных работ
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Загрузить документы
                  </p>
                </div>
              </div>

              <div 
                className="p-4 rounded-lg border-2 border-dashed cursor-pointer hover:bg-gray-800/20"
                style={{ borderColor: '#232428' }}
              >
                <div className="text-center">
                  <FileText className="w-8 h-8 mx-auto mb-2" style={{ color: '#A6A7AA' }} />
                  <p 
                    className="font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Счета-фактуры
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Загрузить документы
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}