// 🛥️ GTS VIP Bookings Component - Extracted from ClientClubPortalComplete
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { 
  Calendar,
  Clock,
  MapPin,
  Plane,
  Anchor,
  Car,
  ChevronRight,
  CheckCircle,
  Trophy
} from "lucide-react";

// Mock bookings data
const mockVIPBookings = [
  {
    id: "booking-001",
    type: "yacht",
    title: "Яхта Azimut 68S",
    date: "2024-12-15",
    time: "10:00",
    duration: "8 часов",
    location: "Марина Сочи",
    status: "confirmed",
    price: 89000,
    bonusesEarned: 712,
    image: "🛥️"
  },
  {
    id: "booking-002", 
    type: "helicopter",
    title: "Вертолетная экскурсия",
    date: "2024-11-28",
    time: "14:30",
    duration: "45 минут",
    location: "Красная Поляна",
    status: "completed",
    price: 45000,
    bonusesEarned: 360,
    image: "🚁"
  },
  {
    id: "booking-003",
    type: "car",
    title: "Ferrari 488 Spider",
    date: "2024-11-20",
    time: "16:00", 
    duration: "3 дня",
    location: "Центр Сочи",
    status: "completed",
    price: 125000,
    bonusesEarned: 1000,
    image: "🏎️"
  }
];

interface GTSVIPBookingsComponentProps {
  user?: {
    id: string;
    name: string;
    tier: string;
  };
}

export function GTSVIPBookingsComponent({ user }: GTSVIPBookingsComponentProps) {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "text-green-400 bg-green-500/10",
      completed: "text-blue-400 bg-blue-500/10",
      cancelled: "text-red-400 bg-red-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getStatusText = (status: string) => {
    const texts = {
      confirmed: "Подтверждено",
      completed: "Завершено",
      cancelled: "Отменено"
    };
    return texts[status as keyof typeof texts] || status;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white">Мои VIP бронирования</h2>
          <p className="text-[#A6A7AA]">
            История всех ваших бронирований и предстоящие поездки
          </p>
        </div>
        <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
          <Calendar className="h-4 w-4 mr-2" />
          Новое бронирование
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A6A7AA]">Активные</p>
                <p className="text-xl font-heading text-white">
                  {mockVIPBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A6A7AA]">Завершенные</p>
                <p className="text-xl font-heading text-white">
                  {mockVIPBookings.filter(b => b.status === 'completed').length}
                </p>
              </div>
              <div className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-[#A6A7AA]">Общая сумма</p>
                <p className="text-xl font-heading text-white">
                  {formatCurrency(mockVIPBookings.reduce((sum, b) => sum + b.price, 0))}
                </p>
              </div>
              <div className="w-8 h-8 bg-[#91040C]/10 rounded-lg flex items-center justify-center">
                <Trophy className="w-4 h-4 text-[#91040C]" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {mockVIPBookings.map((booking) => (
          <Card 
            key={booking.id} 
            className={`bg-[#121214] border-[#232428] transition-all cursor-pointer ${
              selectedBooking === booking.id ? 'ring-2 ring-[#91040C]' : 'hover:border-[#91040C]/50'
            }`}
            onClick={() => setSelectedBooking(booking.id === selectedBooking ? null : booking.id)}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{booking.image}</div>
                  <div>
                    <h4 className="font-heading text-white text-lg">{booking.title}</h4>
                    <div className="flex items-center gap-4 text-sm text-[#A6A7AA] mt-1">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {booking.date} в {booking.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {booking.duration}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {booking.location}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-heading text-white">{formatCurrency(booking.price)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge className={getStatusColor(booking.status)}>
                      {getStatusText(booking.status)}
                    </Badge>
                  </div>
                  {booking.bonusesEarned > 0 && (
                    <p className="text-xs text-green-400 mt-1">
                      +{booking.bonusesEarned} бонусов
                    </p>
                  )}
                </div>
              </div>

              {selectedBooking === booking.id && (
                <div className="mt-4 pt-4 border-t border-[#232428]">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <p className="text-sm text-[#A6A7AA]">Детали бронирования:</p>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-[#A6A7AA]">ID:</span>
                          <span className="text-white ml-2">{booking.id.toUpperCase()}</span>
                        </div>
                        <div>
                          <span className="text-[#A6A7AA]">Тип:</span>
                          <span className="text-white ml-2">{booking.type}</span>  
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#232428] text-white hover:bg-[#17181A]"
                      >
                        Детали
                      </Button>
                      {booking.status === 'confirmed' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-red-500/20 text-red-400 hover:bg-red-500/10"
                        >
                          Отменить
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button 
          className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 justify-start"
          variant="ghost"
        >
          <Plane className="h-4 w-4 mr-3" />
          Забронировать вертолет
        </Button>
        
        <Button 
          className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 justify-start"
          variant="ghost"
        >
          <Anchor className="h-4 w-4 mr-3" />
          Забронировать яхту
        </Button>
        
        <Button 
          className="bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 justify-start"
          variant="ghost"
        >
          <Car className="h-4 w-4 mr-3" />
          Забронировать авто
        </Button>
      </div>
    </div>
  );
}

export default GTSVIPBookingsComponent;