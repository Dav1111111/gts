import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { 
  ArrowLeft, 
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  Plus,
  Cloud,
  Sun,
  CloudRain,
  Users,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";

interface GTSCalendarModuleProps {
  onBack: () => void;
  onNavigateToCRM: () => void;
}

export function GTSCalendarModule({ onBack, onNavigateToCRM }: GTSCalendarModuleProps) {
  const [view, setView] = useState<"month" | "week" | "day" | "resource">("resource");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const [weatherEnabled, setWeatherEnabled] = useState(true);

  const resources = [
    { id: "yacht-001", name: "Yamaha 252S #1", type: "boat", status: "available" },
    { id: "yacht-002", name: "Yamaha 252S #2", type: "boat", status: "maintenance" },
    { id: "heli-001", name: "Robinson R44 #1", type: "helicopter", status: "available" },
    { id: "heli-002", name: "Robinson R44 #2", type: "helicopter", status: "available" },
    { id: "buggy-001", name: "Honda Talon #1", type: "buggy", status: "available" },
    { id: "buggy-002", name: "Honda Talon #2", type: "buggy", status: "booked" },
    { id: "sling-001", name: "Polaris Slingshot #1", type: "slingshot", status: "available" },
    { id: "crew-001", name: "Captain Petrov", type: "staff", role: "captain", status: "available" },
    { id: "crew-002", name: "Pilot Volkov", type: "staff", role: "pilot", status: "booked" },
    { id: "crew-003", name: "Guide Smirnov", type: "staff", role: "guide", status: "available" }
  ];

  const bookings = [
    {
      id: "book-001",
      title: "Corporate Yacht Tour",
      client: "TechCorp LLC",
      resource: "yacht-001",
      startTime: "10:00",
      endTime: "14:00",
      status: "confirmed",
      participants: 8,
      partner: "Elite Events",
      risk: "low",
      value: 45000
    },
    {
      id: "book-002", 
      title: "Helicopter Scenic Flight",
      client: "Mikhailov Family",
      resource: "heli-001",
      startTime: "09:00",
      endTime: "11:00",
      status: "pending",
      participants: 3,
      partner: "Direct",
      risk: "medium",
      value: 28000
    },
    {
      id: "book-003",
      title: "Buggy Adventure",
      client: "Adventure Club",
      resource: "buggy-002",
      startTime: "15:00",
      endTime: "17:00",
      status: "confirmed",
      participants: 4,
      partner: "Partner Agent",
      risk: "low",
      value: 15000
    },
    {
      id: "book-004",
      title: "VIP Helicopter Tour",
      client: "Premium Events",
      resource: "heli-002",
      startTime: "16:00",
      endTime: "18:00",
      status: "at_risk",
      participants: 2,
      partner: "Brand Partner",
      risk: "high",
      value: 35000
    }
  ];

  const weather = {
    current: { temp: 18, condition: "sunny", wind: 12, visibility: 10 },
    forecast: [
      { time: "09:00", temp: 16, condition: "sunny", wind: 8 },
      { time: "12:00", temp: 20, condition: "cloudy", wind: 10 },
      { time: "15:00", temp: 22, condition: "sunny", wind: 15 },
      { time: "18:00", temp: 18, condition: "cloudy", wind: 12 }
    ]
  };

  const getStatusColor = (status: string) => {
    const colors = {
      confirmed: "bg-green-500",
      pending: "bg-yellow-500",
      at_risk: "bg-red-500",
      cancelled: "bg-gray-500"
    };
    return colors[status as keyof typeof colors] || "bg-gray-500";
  };

  const getRiskColor = (risk: string) => {
    const colors = {
      low: "text-green-400",
      medium: "text-yellow-400",
      high: "text-red-400"
    };
    return colors[risk as keyof typeof colors] || "text-gray-400";
  };

  const getPartnerColor = (partner: string) => {
    const colors = {
      "Direct": "bg-blue-500/10 text-blue-400",
      "Partner Agent": "bg-purple-500/10 text-purple-400",
      "Brand Partner": "bg-orange-500/10 text-orange-400",
      "Elite Events": "bg-green-500/10 text-green-400"
    };
    return colors[partner as keyof typeof colors] || "bg-gray-500/10 text-gray-400";
  };

  const getResourceTypeIcon = (type: string) => {
    const icons = {
      boat: "🛥️",
      helicopter: "🚁", 
      buggy: "🏎️",
      slingshot: "🏁",
      staff: "👤"
    };
    return icons[type as keyof typeof icons] || "📋";
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case "sunny": return <Sun className="h-4 w-4 text-yellow-400" />;
      case "cloudy": return <Cloud className="h-4 w-4 text-gray-400" />;
      case "rain": return <CloudRain className="h-4 w-4 text-blue-400" />;
      default: return <Sun className="h-4 w-4 text-yellow-400" />;
    }
  };

  const timeSlots = Array.from({ length: 12 }, (_, i) => `${8 + i}:00`);

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--gts-portal-bg)' }}>
      {/* Header */}
      <div className="border-b" style={{ 
        backgroundColor: 'var(--gts-portal-surface)', 
        borderColor: 'var(--gts-portal-border)' 
      }}>
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} style={{ color: 'var(--gts-portal-text)' }}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                Календарь - Планирование ресурсов
              </h1>
              <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                Управление бронированиями, ресурсами и назначениями персонала
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={onNavigateToCRM}
              variant="outline"
            >
              <Users className="h-4 w-4 mr-2" />
              CRM
            </Button>
            <Button className="bg-green-500 hover:bg-green-600">
              <Plus className="h-4 w-4 mr-2" />
              Новое бронирование
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Calendar Controls */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <h2 className="text-lg font-heading" style={{ color: 'var(--gts-portal-text)' }}>
                December 2024
              </h2>
              <Button variant="outline" size="sm">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Tabs value={view} onValueChange={(v) => setView(v as any)}>
              <TabsList>
                <TabsTrigger value="month">Месяц</TabsTrigger>
                <TabsTrigger value="week">Неделя</TabsTrigger>
                <TabsTrigger value="day">День</TabsTrigger>
                <TabsTrigger value="resource">Ресурсы</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant={weatherEnabled ? "default" : "outline"}
              size="sm"
              onClick={() => setWeatherEnabled(!weatherEnabled)}
            >
              {getWeatherIcon("sunny")}
              Погода
            </Button>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Resources</SelectItem>
                <SelectItem value="boats">Boats Only</SelectItem>
                <SelectItem value="helicopters">Helicopters Only</SelectItem>
                <SelectItem value="vehicles">Ground Vehicles</SelectItem>
                <SelectItem value="staff">Staff Only</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Weather Banner */}
        {weatherEnabled && (
          <Card className="mb-6" style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {getWeatherIcon(weather.current.condition)}
                    <span style={{ color: 'var(--gts-portal-text)' }}>
                      {weather.current.temp}°C
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm" style={{ color: 'var(--gts-portal-muted)' }}>
                    <span>Wind: {weather.current.wind} km/h</span>
                    <span>Visibility: {weather.current.visibility} km</span>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {weather.forecast.map((period, index) => (
                    <div key={index} className="text-center">
                      <p className="text-xs" style={{ color: 'var(--gts-portal-muted)' }}>{period.time}</p>
                      <div className="flex items-center justify-center my-1">
                        {getWeatherIcon(period.condition)}
                      </div>
                      <p className="text-xs" style={{ color: 'var(--gts-portal-text)' }}>{period.temp}°</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Resource View */}
        {view === "resource" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-3">
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Resource Schedule</CardTitle>
                  <CardDescription style={{ color: 'var(--gts-portal-muted)' }}>
                    Today - December 2, 2024
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <div className="min-w-[800px]">
                      {/* Time Header */}
                      <div className="grid grid-cols-13 gap-1 mb-2">
                        <div className="w-32"></div>
                        {timeSlots.map(time => (
                          <div key={time} className="text-center text-xs p-2" style={{ color: 'var(--gts-portal-muted)' }}>
                            {time}
                          </div>
                        ))}
                      </div>
                      
                      {/* Resource Rows */}
                      {resources.map(resource => (
                        <div key={resource.id} className="grid grid-cols-13 gap-1 mb-2">
                          <div className="w-32 p-2 rounded-lg flex items-center gap-2" 
                               style={{ backgroundColor: 'var(--gts-portal-card)' }}>
                            <span className="text-lg">{getResourceTypeIcon(resource.type)}</span>
                            <div>
                              <p className="text-sm font-medium" style={{ color: 'var(--gts-portal-text)' }}>
                                {resource.name}
                              </p>
                              <Badge 
                                variant={resource.status === 'available' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {resource.status}
                              </Badge>
                            </div>
                          </div>
                          
                          {/* Time Slots */}
                          {timeSlots.map((time, timeIndex) => {
                            const booking = bookings.find(b => 
                              b.resource === resource.id && 
                              parseInt(b.startTime.split(':')[0]) <= 8 + timeIndex &&
                              parseInt(b.endTime.split(':')[0]) > 8 + timeIndex
                            );
                            
                            return (
                              <div 
                                key={time} 
                                className="h-12 border rounded relative cursor-pointer hover:bg-opacity-80 transition-colors"
                                style={{ 
                                  backgroundColor: booking ? 'var(--gts-portal-card)' : 'transparent',
                                  borderColor: 'var(--gts-portal-border)'
                                }}
                                onClick={() => booking && setSelectedBooking(booking.id)}
                              >
                                {booking && parseInt(booking.startTime.split(':')[0]) === 8 + timeIndex && (
                                  <div 
                                    className={`absolute inset-0 rounded p-1 flex flex-col justify-center ${getStatusColor(booking.status)}`}
                                    style={{ 
                                      width: `${(parseInt(booking.endTime.split(':')[0]) - parseInt(booking.startTime.split(':')[0])) * 100}%`,
                                      zIndex: 10
                                    }}
                                  >
                                    <p className="text-xs font-medium text-white truncate">
                                      {booking.title}
                                    </p>
                                    <p className="text-xs text-white/80 truncate">
                                      {booking.client}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Booking Details Drawer */}
            {selectedBooking && (
              <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
                <CardHeader>
                  <CardTitle style={{ color: 'var(--gts-portal-text)' }}>Booking Details</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSelectedBooking(null)}
                    className="absolute top-4 right-4"
                  >
                    ×
                  </Button>
                </CardHeader>
                <CardContent>
                  {bookings.find(b => b.id === selectedBooking) && (
                    <div className="space-y-4">
                      {(() => {
                        const booking = bookings.find(b => b.id === selectedBooking)!;
                        return (
                          <>
                            <div>
                              <h3 className="font-medium mb-2" style={{ color: 'var(--gts-portal-text)' }}>
                                {booking.title}
                              </h3>
                              <Badge className={getStatusColor(booking.status) + " text-white"}>
                                {booking.status.replace('_', ' ')}
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              <div className="flex items-center gap-2">
                                <Users className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                  {booking.client} ({booking.participants} people)
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <Clock className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <span className="text-sm" style={{ color: 'var(--gts-portal-text)' }}>
                                  {booking.startTime} - {booking.endTime}
                                </span>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <Badge className={getPartnerColor(booking.partner)}>
                                  {booking.partner}
                                </Badge>
                              </div>
                              
                              <div className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4" style={{ color: 'var(--gts-portal-muted)' }} />
                                <span className={`text-sm font-medium ${getRiskColor(booking.risk)}`}>
                                  {booking.risk.toUpperCase()} RISK
                                </span>
                              </div>
                            </div>

                            <div className="border-t pt-4" style={{ borderColor: 'var(--gts-portal-border)' }}>
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Value</span>
                                <span className="font-medium text-green-400">₽{booking.value.toLocaleString()}</span>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <Button 
                                className="w-full bg-blue-500 hover:bg-blue-600"
                                onClick={onNavigateToCRM}
                              >
                                View in CRM
                              </Button>
                              <Button variant="outline" className="w-full">
                                Edit Booking
                              </Button>
                              {booking.status === 'pending' && (
                                <Button className="w-full bg-green-500 hover:bg-green-600">
                                  <CheckCircle className="h-4 w-4 mr-2" />
                                  Confirm
                                </Button>
                              )}
                              {booking.status === 'at_risk' && (
                                <Button variant="destructive" className="w-full">
                                  <XCircle className="h-4 w-4 mr-2" />
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Today's Bookings</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>8</p>
                </div>
                <Calendar className="h-6 w-6 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Revenue Today</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>₽123K</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>Utilization</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>78%</p>
                </div>
                <Users className="h-6 w-6 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card style={{ backgroundColor: 'var(--gts-portal-surface)', borderColor: 'var(--gts-portal-border)' }}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm" style={{ color: 'var(--gts-portal-muted)' }}>At Risk</p>
                  <p className="text-2xl font-heading" style={{ color: 'var(--gts-portal-text)' }}>2</p>
                </div>
                <AlertTriangle className="h-6 w-6 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}