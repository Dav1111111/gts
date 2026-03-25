import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { Separator } from "../../ui/separator";
import { 
  Cloud, CloudRain, Sun, Wind, Eye, Thermometer, 
  Waves, Compass, AlertTriangle, MapPin, RefreshCw,
  Droplets, Gauge, Activity, TrendingUp, TrendingDown
} from "lucide-react";

// Types
interface WeatherCondition {
  id: string;
  type: 'sunny' | 'cloudy' | 'rainy' | 'stormy' | 'foggy';
  temperature: number;
  humidity: number;
  windSpeed: number;
  windDirection: string;
  visibility: number;
  pressure: number;
  cloudCover: number;
  precipitation: number;
}

interface MarineCondition {
  waveHeight: number;
  waterTemperature: number;
  seaState: string;
  tideLevel: string;
  uvIndex: number;
}

interface WeatherAlert {
  id: string;
  type: 'warning' | 'watch' | 'advisory';
  category: 'wind' | 'rain' | 'visibility' | 'temperature' | 'marine';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  affectedVehicles: string[];
}

interface HourlyForecast {
  time: string;
  temperature: number;
  windSpeed: number;
  precipitation: number;
  condition: string;
}

interface GTSWeatherWidgetProps {
  location?: string;
  compact?: boolean;
  showAlerts?: boolean;
  showForecast?: boolean;
  className?: string;
}

export function GTSWeatherWidget({ 
  location = "Сочи, Адлер", 
  compact = false,
  showAlerts = true,
  showForecast = true,
  className = ""
}: GTSWeatherWidgetProps) {
  const [currentWeather, setCurrentWeather] = useState<WeatherCondition | null>(null);
  const [marineConditions, setMarineConditions] = useState<MarineCondition | null>(null);
  const [alerts, setAlerts] = useState<WeatherAlert[]>([]);
  const [forecast, setForecast] = useState<HourlyForecast[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [isLoading, setIsLoading] = useState(false);

  // Mock data initialization
  useEffect(() => {
    loadWeatherData();
  }, []);

  const loadWeatherData = async () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setCurrentWeather({
        id: 'current-1',
        type: 'sunny',
        temperature: 24,
        humidity: 68,
        windSpeed: 12,
        windDirection: 'СЗ',
        visibility: 15,
        pressure: 1015,
        cloudCover: 25,
        precipitation: 0
      });

      setMarineConditions({
        waveHeight: 1.2,
        waterTemperature: 22,
        seaState: 'Слабое волнение',
        tideLevel: 'Прилив',
        uvIndex: 6
      });

      setAlerts([
        {
          id: 'alert-1',
          type: 'watch',
          category: 'wind',
          title: 'Усиление ветра',
          description: 'Ожидается усиление ветра до 18-20 м/с в 15:00-17:00',
          startTime: '2024-01-20T15:00:00',
          endTime: '2024-01-20T17:00:00',
          severity: 'medium',
          affectedVehicles: ['helicopter', 'boat']
        },
        {
          id: 'alert-2',
          type: 'advisory',
          category: 'visibility',
          title: 'Ограниченная видимость',
          description: 'Утренний туман может снизить видимость до 3-5 км',
          startTime: '2024-01-21T06:00:00',
          endTime: '2024-01-21T09:00:00',
          severity: 'low',
          affectedVehicles: ['helicopter']
        }
      ]);

      setForecast([
        { time: '12:00', temperature: 24, windSpeed: 12, precipitation: 0, condition: 'sunny' },
        { time: '13:00', temperature: 25, windSpeed: 14, precipitation: 0, condition: 'sunny' },
        { time: '14:00', temperature: 26, windSpeed: 16, precipitation: 0, condition: 'cloudy' },
        { time: '15:00', temperature: 25, windSpeed: 18, precipitation: 5, condition: 'cloudy' },
        { time: '16:00', temperature: 24, windSpeed: 20, precipitation: 10, condition: 'rainy' },
        { time: '17:00', temperature: 23, windSpeed: 16, precipitation: 15, condition: 'rainy' },
        { time: '18:00', temperature: 22, windSpeed: 14, precipitation: 5, condition: 'cloudy' },
        { time: '19:00', temperature: 21, windSpeed: 12, precipitation: 0, condition: 'cloudy' }
      ]);

      setLastUpdate(new Date());
      setIsLoading(false);
    }, 1000);
  };

  const getWeatherIcon = (condition: string) => {
    const icons = {
      sunny: Sun,
      cloudy: Cloud,
      rainy: CloudRain,
      stormy: CloudRain,
      foggy: Cloud
    };
    return icons[condition as keyof typeof icons] || Cloud;
  };

  const getAlertColor = (severity: string) => {
    const colors = {
      low: 'bg-blue-500/20 text-blue-400 border-blue-500',
      medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500',
      high: 'bg-orange-500/20 text-orange-400 border-orange-500',
      critical: 'bg-red-500/20 text-red-400 border-red-500'
    };
    return colors[severity as keyof typeof colors] || colors.low;
  };

  const getVehicleRestrictions = (weather: WeatherCondition, marine: MarineCondition) => {
    const restrictions = [];
    
    if (weather.windSpeed > 15) {
      restrictions.push({
        vehicle: 'Вертолёты',
        status: 'ограничено',
        reason: `Ветер ${weather.windSpeed} м/с`
      });
    }
    
    if (marine.waveHeight > 1.5) {
      restrictions.push({
        vehicle: 'Катера',
        status: 'ограничено',
        reason: `Волна ${marine.waveHeight} м`
      });
    }
    
    if (weather.visibility < 5) {
      restrictions.push({
        vehicle: 'Все ВС',
        status: 'запрещено',
        reason: `Видимость ${weather.visibility} км`
      });
    }

    return restrictions;
  };

  if (!currentWeather || !marineConditions) {
    return (
      <Card className={`bg-[#17181A] border-[#232428] ${className}`}>
        <CardContent className="flex items-center justify-center h-48">
          <div className="animate-spin">
            <RefreshCw className="w-6 h-6 text-[#A6A7AA]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (compact) {
    return (
      <Card className={`bg-[#17181A] border-[#232428] ${className}`}>
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#A6A7AA]" />
              <span className="text-sm text-[#A6A7AA]">{location}</span>
            </div>
            <div className="flex items-center gap-2">
              {(() => {
                const WeatherIcon = getWeatherIcon(currentWeather.type);
                return <WeatherIcon className="w-5 h-5 text-yellow-400" />;
              })()}
              <span className="text-lg font-heading text-white">{currentWeather.temperature}°C</span>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-2 text-xs">
            <div className="text-center">
              <Wind className="w-3 h-3 text-[#A6A7AA] mx-auto mb-1" />
              <div className="text-white">{currentWeather.windSpeed} м/с</div>
              <div className="text-[#A6A7AA]">{currentWeather.windDirection}</div>
            </div>
            <div className="text-center">
              <Waves className="w-3 h-3 text-[#A6A7AA] mx-auto mb-1" />
              <div className="text-white">{marineConditions.waveHeight} м</div>
              <div className="text-[#A6A7AA]">Волна</div>
            </div>
            <div className="text-center">
              <Eye className="w-3 h-3 text-[#A6A7AA] mx-auto mb-1" />
              <div className="text-white">{currentWeather.visibility} км</div>
              <div className="text-[#A6A7AA]">Видимость</div>
            </div>
          </div>

          {alerts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#232428]">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3 h-3 text-yellow-400" />
                <span className="text-xs text-yellow-400">{alerts.length} предупреждений</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  const restrictions = getVehicleRestrictions(currentWeather, marineConditions);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Current Weather */}
      <Card className="bg-[#17181A] border-[#232428]">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-white flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {location}
              </CardTitle>
              <CardDescription>
                Обновлено: {lastUpdate.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })}
              </CardDescription>
            </div>
            <button 
              onClick={loadWeatherData}
              disabled={isLoading}
              className="p-2 hover:bg-[#232428] rounded-lg transition-colors"
            >
              <RefreshCw className={`w-4 h-4 text-[#A6A7AA] ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Main Weather Display */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {(() => {
                const WeatherIcon = getWeatherIcon(currentWeather.type);
                return <WeatherIcon className="w-12 h-12 text-yellow-400" />;
              })()}
              <div>
                <div className="text-3xl font-heading text-white">{currentWeather.temperature}°C</div>
                <div className="text-[#A6A7AA] capitalize">{currentWeather.type}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-[#A6A7AA]">Ощущается как</div>
              <div className="text-xl text-white">{currentWeather.temperature + 2}°C</div>
            </div>
          </div>

          <Separator className="bg-[#232428]" />

          {/* Detailed Conditions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Wind className="w-5 h-5 text-[#A6A7AA] mx-auto mb-2" />
              <div className="text-white font-medium">{currentWeather.windSpeed} м/с</div>
              <div className="text-sm text-[#A6A7AA]">Ветер {currentWeather.windDirection}</div>
            </div>
            
            <div className="text-center">
              <Eye className="w-5 h-5 text-[#A6A7AA] mx-auto mb-2" />
              <div className="text-white font-medium">{currentWeather.visibility} км</div>
              <div className="text-sm text-[#A6A7AA]">Видимость</div>
            </div>
            
            <div className="text-center">
              <Droplets className="w-5 h-5 text-[#A6A7AA] mx-auto mb-2" />
              <div className="text-white font-medium">{currentWeather.humidity}%</div>
              <div className="text-sm text-[#A6A7AA]">Влажность</div>
            </div>
            
            <div className="text-center">
              <Gauge className="w-5 h-5 text-[#A6A7AA] mx-auto mb-2" />
              <div className="text-white font-medium">{currentWeather.pressure}</div>
              <div className="text-sm text-[#A6A7AA]">мм рт.ст.</div>
            </div>
          </div>

          <Separator className="bg-[#232428]" />

          {/* Marine Conditions */}
          <div>
            <h4 className="text-white font-medium mb-3 flex items-center gap-2">
              <Waves className="w-4 h-4" />
              Морские условия
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-white font-medium">{marineConditions.waveHeight} м</div>
                <div className="text-sm text-[#A6A7AA]">Высота волн</div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium">{marineConditions.waterTemperature}°C</div>
                <div className="text-sm text-[#A6A7AA]">Вода</div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium">{marineConditions.seaState}</div>
                <div className="text-sm text-[#A6A7AA]">Состояние моря</div>
              </div>
              
              <div className="text-center">
                <div className="text-white font-medium">{marineConditions.tideLevel}</div>
                <div className="text-sm text-[#A6A7AA]">Прилив/отлив</div>
              </div>
            </div>
          </div>

          {/* Vehicle Restrictions */}
          {restrictions.length > 0 && (
            <>
              <Separator className="bg-[#232428]" />
              <div>
                <h4 className="text-white font-medium mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-400" />
                  Ограничения для техники
                </h4>
                <div className="space-y-2">
                  {restrictions.map((restriction, index) => (
                    <div key={index} className="flex items-center justify-between p-2 bg-[#232428] rounded">
                      <span className="text-white">{restriction.vehicle}</span>
                      <div className="flex items-center gap-2">
                        <Badge className={restriction.status === 'запрещено' ? 
                          'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'
                        }>
                          {restriction.status}
                        </Badge>
                        <span className="text-sm text-[#A6A7AA]">{restriction.reason}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Weather Alerts */}
      {showAlerts && alerts.length > 0 && (
        <Card className="bg-[#17181A] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
              Предупреждения ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map(alert => (
                <div key={alert.id} className="p-3 bg-[#232428] rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h5 className="font-medium text-white">{alert.title}</h5>
                      <p className="text-sm text-[#A6A7AA] mt-1">{alert.description}</p>
                    </div>
                    <Badge className={getAlertColor(alert.severity)}>
                      {alert.type === 'warning' ? 'Предупреждение' :
                       alert.type === 'watch' ? 'Наблюдение' : 'Рекомендация'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[#A6A7AA]">
                      {new Date(alert.startTime).toLocaleString('ru-RU', { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })} - {new Date(alert.endTime).toLocaleString('ru-RU', { 
                        month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
                      })}
                    </span>
                    <span className="text-[#A6A7AA]">
                      Затронуто: {alert.affectedVehicles.join(', ')}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Hourly Forecast */}
      {showForecast && forecast.length > 0 && (
        <Card className="bg-[#17181A] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white">Прогноз на 24 часа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 overflow-x-auto pb-2">
              {forecast.map((hour, index) => (
                <div key={index} className="flex-shrink-0 text-center min-w-[80px]">
                  <div className="text-sm text-[#A6A7AA] mb-2">{hour.time}</div>
                  {(() => {
                    const WeatherIcon = getWeatherIcon(hour.condition);
                    return <WeatherIcon className="w-6 h-6 text-yellow-400 mx-auto mb-2" />;
                  })()}
                  <div className="text-white font-medium mb-1">{hour.temperature}°</div>
                  <div className="flex items-center gap-1 text-xs text-[#A6A7AA] mb-1">
                    <Wind className="w-3 h-3" />
                    {hour.windSpeed}
                  </div>
                  {hour.precipitation > 0 && (
                    <div className="flex items-center gap-1 text-xs text-blue-400">
                      <Droplets className="w-3 h-3" />
                      {hour.precipitation}%
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}