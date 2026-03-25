import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Progress } from "../ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  CheckCircle,
  Clock,
  Car,
  FileText,
  Wrench
} from "lucide-react";

export function GTSContractorDashboard() {
  // Mock data
  const kpiData = {
    bookingsThisMonth: {
      value: 47,
      change: 12,
      trend: "up" as const
    },
    turnover: {
      value: "2,847,500",
      currency: "₽",
      change: 8.5,
      trend: "up" as const
    },
    paidAmount: {
      value: "2,562,750",
      currency: "₽",
      pending: "284,750"
    },
    utilization: {
      value: 78,
      change: -3,
      trend: "down" as const
    }
  };

  const utilizationHeatmap = [
    { day: "Пн", value: 85, bookings: 3 },
    { day: "Вт", value: 92, bookings: 4 },
    { day: "Ср", value: 67, bookings: 2 },
    { day: "Чт", value: 88, bookings: 3 },
    { day: "Пт", value: 95, bookings: 5 },
    { day: "Сб", value: 76, bookings: 2 },
    { day: "Вс", value: 45, bookings: 1 }
  ];

  const alerts = [
    {
      id: "alert-1",
      type: "warning" as const,
      title: "Истекает страховка",
      message: "Yamaha 252S - страховка истекает 15 февраля",
      priority: "high" as const,
      daysLeft: 7
    },
    {
      id: "alert-2",
      type: "info" as const,
      title: "Плановое ТО",
      message: "Robinson R44 - техобслуживание назначено на 12 февраля",
      priority: "medium" as const,
      daysLeft: 4
    },
    {
      id: "alert-3",
      type: "error" as const,
      title: "Просроченный документ",
      message: "Honda Talon - требуется обновление сертификата",
      priority: "high" as const,
      daysLeft: -2
    }
  ];

  const upcomingBookings = [
    {
      id: "booking-1",
      vehicle: "Robinson R44",
      client: "Александр Иванов",
      date: "Завтра",
      time: "10:00",
      duration: "2 часа",
      status: "confirmed" as const
    },
    {
      id: "booking-2", 
      vehicle: "Yamaha 252S",
      client: "GTS Premium Tour",
      date: "15 февраля",
      time: "14:00",
      duration: "4 часа",
      status: "pending" as const
    },
    {
      id: "booking-3",
      vehicle: "Honda Talon",
      client: "Михаил Петров",
      date: "16 февраля",
      time: "09:00",
      duration: "6 часов",
      status: "confirmed" as const
    }
  ];

  const getUtilizationColor = (value: number) => {
    if (value >= 80) return '#2BB673';
    if (value >= 60) return '#F5A623';
    if (value >= 40) return '#91040C';
    return '#E5484D';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ 
            fontFamily: 'Nokia.Kokia, Inter, sans-serif',
            color: '#FFFFFF'
          }}
        >
          Дашборд подрядчика
        </h1>
        <p 
          className="text-lg"
          style={{ 
            color: '#A6A7AA',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          Общая статистика и управление флотом
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Bookings This Month */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" style={{ color: '#91040C' }} />
            <div className={`flex items-center gap-1 text-sm ${
              kpiData.bookingsThisMonth.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {kpiData.bookingsThisMonth.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              +{kpiData.bookingsThisMonth.change}
            </div>
          </div>
          <div className="space-y-2">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {kpiData.bookingsThisMonth.value}
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Бронирований в месяце
            </p>
          </div>
        </Card>

        {/* Turnover */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" style={{ color: '#91040C' }} />
            <div className={`flex items-center gap-1 text-sm ${
              kpiData.turnover.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {kpiData.turnover.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              +{kpiData.turnover.change}%
            </div>
          </div>
          <div className="space-y-2">
            <p 
              className="text-3xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {kpiData.turnover.value} {kpiData.turnover.currency}
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Оборот (мои услуги)
            </p>
          </div>
        </Card>

        {/* Paid/Pending */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" style={{ color: '#2BB673' }} />
            <Badge 
              variant="outline" 
              className="text-xs"
              style={{ 
                borderColor: '#F5A623',
                color: '#F5A623'
              }}
            >
              Ожидает
            </Badge>
          </div>
          <div className="space-y-2">
            <p 
              className="text-2xl font-bold"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              {kpiData.paidAmount.value} {kpiData.paidAmount.currency}
            </p>
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Выплачено / {kpiData.paidAmount.pending} ₽ ожидает
            </p>
          </div>
        </Card>

        {/* Utilization */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <Car className="w-8 h-8" style={{ color: '#91040C' }} />
            <div className={`flex items-center gap-1 text-sm ${
              kpiData.utilization.trend === 'up' ? 'text-green-500' : 'text-red-500'
            }`}>
              {kpiData.utilization.trend === 'up' ? (
                <TrendingUp className="w-4 h-4" />
              ) : (
                <TrendingDown className="w-4 h-4" />
              )}
              {kpiData.utilization.change}%
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
              {kpiData.utilization.value}%
            </p>
            <Progress 
              value={kpiData.utilization.value} 
              className="h-2"
            />
            <p 
              className="text-sm"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              Утилизация флота
            </p>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Utilization Heatmap */}
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
            Утилизация по дням недели
          </h3>
          
          <div className="space-y-3">
            {utilizationHeatmap.map((day) => (
              <div key={day.day} className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <span 
                    className="text-sm font-medium w-8"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {day.day}
                  </span>
                  <div className="flex-1">
                    <div 
                      className="h-6 rounded-md flex items-center px-2"
                      style={{ 
                        backgroundColor: getUtilizationColor(day.value),
                        opacity: day.value / 100
                      }}
                    >
                      <span className="text-xs font-medium text-white">
                        {day.value}%
                      </span>
                    </div>
                  </div>
                </div>
                <span 
                  className="text-sm"
                  style={{ 
                    color: '#A6A7AA',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {day.bookings} бронирований
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Alerts */}
        <Card 
          className="p-6 border-0"
          style={{ backgroundColor: '#17181A' }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 
              className="text-lg font-medium"
              style={{ 
                color: '#FFFFFF',
                fontFamily: 'Nokia.Kokia, Inter, sans-serif'
              }}
            >
              Оповещения
            </h3>
            <Badge 
              variant="outline"
              style={{ 
                borderColor: '#91040C',
                color: '#91040C'
              }}
            >
              {alerts.filter(a => a.priority === 'high').length} критических
            </Badge>
          </div>

          <div className="space-y-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-3 rounded-lg"
                style={{ backgroundColor: '#121214' }}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5">
                    {alert.type === 'warning' && <AlertTriangle className="w-4 h-4" style={{ color: '#F5A623' }} />}
                    {alert.type === 'error' && <AlertTriangle className="w-4 h-4" style={{ color: '#E5484D' }} />}
                    {alert.type === 'info' && <Clock className="w-4 h-4" style={{ color: '#0EA5E9' }} />}
                  </div>
                  <div className="flex-1">
                    <p 
                      className="font-medium text-sm"
                      style={{ 
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {alert.title}
                    </p>
                    <p 
                      className="text-sm mt-1"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      {alert.message}
                    </p>
                    {alert.daysLeft > 0 && (
                      <p 
                        className="text-xs mt-1"
                        style={{ 
                          color: alert.daysLeft <= 7 ? '#F5A623' : '#A6A7AA',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        Осталось {alert.daysLeft} дней
                      </p>
                    )}
                    {alert.daysLeft < 0 && (
                      <p 
                        className="text-xs mt-1"
                        style={{ 
                          color: '#E5484D',
                          fontFamily: 'Gilroy, Inter, sans-serif'
                        }}
                      >
                        Просрочено на {Math.abs(alert.daysLeft)} дней
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mt-4 border-0"
            style={{ 
              backgroundColor: '#121214',
              color: '#FFFFFF',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Посмотреть все оповещения
          </Button>
        </Card>
      </div>

      {/* Upcoming Bookings */}
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
          Ближайшие бронирования
        </h3>

        <div className="space-y-3">
          {upcomingBookings.map((booking) => (
            <div 
              key={booking.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{ backgroundColor: '#121214' }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: '#91040C' }}
                >
                  <Car className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p 
                    className="font-medium"
                    style={{ 
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {booking.vehicle}
                  </p>
                  <p 
                    className="text-sm"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    {booking.client} • {booking.duration}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <p 
                  className="font-medium"
                  style={{ 
                    color: '#FFFFFF',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  {booking.date} в {booking.time}
                </p>
                <Badge 
                  variant="outline"
                  className="text-xs"
                  style={{ 
                    borderColor: booking.status === 'confirmed' ? '#2BB673' : '#F5A623',
                    color: booking.status === 'confirmed' ? '#2BB673' : '#F5A623'
                  }}
                >
                  {booking.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                </Badge>
              </div>
            </div>
          ))}
        </div>

        <Button
          variant="outline"
          className="w-full mt-4 border-0"
          style={{ 
            backgroundColor: '#121214',
            color: '#FFFFFF',
            fontFamily: 'Gilroy, Inter, sans-serif'
          }}
        >
          Посмотреть все бронирования
        </Button>
      </Card>
    </div>
  );
}