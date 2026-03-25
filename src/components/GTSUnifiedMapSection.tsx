import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Users, DollarSign, Camera, Mountain, Waves, TreePine } from 'lucide-react';

interface ActivityPin {
  id: string;
  type: 'boat' | 'helicopter' | 'buggy' | 'slingshot';
  name: string;
  location: string;
  coordinates: { x: number; y: number };
  price: number;
  duration: string;
  capacity: number;
  description: string;
  available: boolean;
}

interface PlacePin {
  id: string;
  type: 'sunset' | 'photo' | 'nature';
  name: string;
  location: string;
  coordinates: { x: number; y: number };
  description: string;
  bestTime: string;
  activities: string[];
}

const activityPins: ActivityPin[] = [
  {
    id: 'boat-marina',
    type: 'boat',
    name: 'Yamaha 252S',
    location: 'Морской порт Сочи',
    coordinates: { x: 45, y: 75 },
    price: 25000,
    duration: '2-6 часов',
    capacity: 8,
    description: 'Роскошная яхта для морских прогулок',
    available: true
  },
  {
    id: 'helicopter-krasnaya',
    type: 'helicopter',
    name: 'Robinson R44',
    location: 'Красная Поляна',
    coordinates: { x: 85, y: 25 },
    price: 35000,
    duration: '30-60 мин',
    capacity: 3,
    description: 'Вертолётные экскурсии над горами',
    available: true
  },
  {
    id: 'slingshot-coastal',
    type: 'slingshot',
    name: 'Polaris Slingshot R',
    location: 'Прибрежное шоссе',
    coordinates: { x: 30, y: 60 },
    price: 20000,
    duration: '3-5 часов',
    capacity: 2,
    description: 'Спортивный трёхколёсник',
    available: true
  },
  {
    id: 'buggy-mountains',
    type: 'buggy',
    name: 'Honda Talon',
    location: 'Горные тропы',
    coordinates: { x: 70, y: 40 },
    price: 15000,
    duration: '2-4 часа',
    capacity: 2,
    description: 'Экстремальные поездки по бездорожью',
    available: true
  }
];

const placePins: PlacePin[] = [
  {
    id: 'sunset-point',
    type: 'sunset',
    name: 'Мыс Видный',
    location: 'Лазаревское',
    coordinates: { x: 15, y: 45 },
    description: 'Лучшие закаты на побережье',
    bestTime: '19:00-20:30',
    activities: ['Slingshot', 'Фотосессия']
  },
  {
    id: 'photo-spot',
    type: 'photo',
    name: 'Роза Пик',
    location: 'Красная Поляна',
    coordinates: { x: 90, y: 20 },
    description: 'Панорамные виды для фото',
    bestTime: '10:00-16:00',
    activities: ['Вертолёт', 'Багги']
  },
  {
    id: 'nature-spot',
    type: 'nature',
    name: 'Водопады Менделиха',
    location: 'Роза Хутор',
    coordinates: { x: 80, y: 35 },
    description: 'Скрытые водопады в горах',
    bestTime: 'Весь день',
    activities: ['Багги', 'Треккинг']
  },
  {
    id: 'beach-spot',
    type: 'photo',
    name: 'Пляж Ривьера',
    location: 'Центр Сочи',
    coordinates: { x: 40, y: 80 },
    description: 'Премиальный пляжный отдых',
    bestTime: '8:00-18:00',
    activities: ['Яхта', 'Водные виды спорта']
  }
];

const activityColors = {
  boat: '#0EA5E9',
  helicopter: '#91040C',
  buggy: '#F97316',
  slingshot: '#8B5CF6'
};

const placeColors = {
  sunset: '#F59E0B',
  photo: '#10B981',
  nature: '#059669'
};

const activityLabels = {
  boat: 'Катер',
  helicopter: 'Вертолёт',
  buggy: 'Багги',
  slingshot: 'Slingshot'
};

const placeIcons = {
  sunset: Camera,
  photo: Mountain,
  nature: TreePine
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function GTSUnifiedMapSection() {
  const [selectedPin, setSelectedPin] = useState<ActivityPin | PlacePin | null>(null);
  const [activeLayer, setActiveLayer] = useState<'activities' | 'places' | 'both'>('both');

  const isActivityPin = (pin: any): pin is ActivityPin => {
    return 'price' in pin;
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 
            className="mb-4 tracking-tight" 
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: '700', 
              fontSize: '3rem', 
              lineHeight: '1.2' 
            }}
          >
            Карта активностей и мест
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Откройте для себя все возможности Сочи и Красной Поляны
          </p>
        </div>

        {/* Layer controls */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setActiveLayer('activities')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeLayer === 'activities' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Активности
            </button>
            <button
              onClick={() => setActiveLayer('places')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeLayer === 'places' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Интересные места
            </button>
            <button
              onClick={() => setActiveLayer('both')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeLayer === 'both' ? 'bg-white shadow-sm text-black' : 'text-gray-600 hover:text-black'
              }`}
            >
              Все
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-96 lg:h-[500px] shadow-lg">
              {/* Map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-gray-200/50 to-transparent rounded-bl-full"></div>
              </div>

              {/* Location labels */}
              <div className="absolute top-4 left-4 text-sm font-medium text-gray-600">
                Красная Поляна
              </div>
              <div className="absolute bottom-4 left-4 text-sm font-medium text-gray-600">
                Чёрное море
              </div>
              <div className="absolute bottom-4 right-4 text-sm font-medium text-gray-600">
                Центр Сочи
              </div>

              {/* Activity pins */}
              {(activeLayer === 'activities' || activeLayer === 'both') &&
                activityPins.map((pin) => (
                  <button
                    key={pin.id}
                    className="absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 cursor-pointer z-10"
                    style={{
                      left: `${pin.coordinates.x}%`,
                      top: `${pin.coordinates.y}%`,
                      backgroundColor: activityColors[pin.type],
                      transform: `translate(-50%, -50%) ${selectedPin?.id === pin.id ? 'scale(1.25)' : 'scale(1)'}`
                    }}
                    onClick={() => setSelectedPin(pin)}
                  >
                    <MapPin className="w-4 h-4 text-white mx-auto" />
                  </button>
                ))}

              {/* Place pins */}
              {(activeLayer === 'places' || activeLayer === 'both') &&
                placePins.map((pin) => {
                  const IconComponent = placeIcons[pin.type];
                  return (
                    <button
                      key={pin.id}
                      className="absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 cursor-pointer z-10"
                      style={{
                        left: `${pin.coordinates.x}%`,
                        top: `${pin.coordinates.y}%`,
                        backgroundColor: placeColors[pin.type],
                        transform: `translate(-50%, -50%) ${selectedPin?.id === pin.id ? 'scale(1.25)' : 'scale(1)'}`
                      }}
                      onClick={() => setSelectedPin(pin)}
                    >
                      <IconComponent className="w-4 h-4 text-white mx-auto" />
                    </button>
                  );
                })}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {(activeLayer === 'activities' || activeLayer === 'both') && (
                <>
                  <span className="text-sm text-gray-600 font-medium mr-2">Активности:</span>
                  {Object.entries(activityColors).map(([type, color]) => (
                    <div key={type} className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded-full border-2 border-white shadow"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-sm text-gray-600">
                        {activityLabels[type as keyof typeof activityLabels]}
                      </span>
                    </div>
                  ))}
                </>
              )}
              
              {(activeLayer === 'places' || activeLayer === 'both') && (
                <>
                  <span className="text-sm text-gray-600 font-medium mr-2 ml-4">Места:</span>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow bg-amber-500" />
                    <span className="text-sm text-gray-600">Закаты</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow bg-green-500" />
                    <span className="text-sm text-gray-600">Фотоспоты</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 rounded-full border-2 border-white shadow bg-emerald-600" />
                    <span className="text-sm text-gray-600">Природа</span>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Selected pin details */}
          <div className="lg:col-span-1">
            {selectedPin ? (
              <Card className="p-6 sticky top-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge className="mb-2" style={{
                      backgroundColor: isActivityPin(selectedPin) 
                        ? activityColors[selectedPin.type as keyof typeof activityColors]
                        : placeColors[(selectedPin as PlacePin).type as keyof typeof placeColors]
                    }}>
                      {isActivityPin(selectedPin) 
                        ? activityLabels[selectedPin.type as keyof typeof activityLabels]
                        : (selectedPin as PlacePin).type === 'sunset' ? 'Закат' : 
                          (selectedPin as PlacePin).type === 'photo' ? 'Фотоспот' : 'Природа'
                      }
                    </Badge>
                    <h3 className="font-semibold text-lg">
                      {selectedPin.name}
                    </h3>
                  </div>
                  <button 
                    onClick={() => setSelectedPin(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {selectedPin.location}
                  </div>
                  
                  {isActivityPin(selectedPin) ? (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        {selectedPin.duration}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        До {selectedPin.capacity} человек
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <DollarSign className="h-4 w-4" />
                        от {formatPrice(selectedPin.price)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        Лучшее время: {(selectedPin as PlacePin).bestTime}
                      </div>
                      <div className="text-sm text-gray-600">
                        <strong>Подходящие активности:</strong>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {(selectedPin as PlacePin).activities.map((activity, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>

                <p className="text-gray-600 mb-6">
                  {selectedPin.description}
                </p>

                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  disabled={!isActivityPin(selectedPin) || !selectedPin.available}
                >
                  {isActivityPin(selectedPin) 
                    ? (selectedPin.available ? 'Забронировать' : 'Недоступно')
                    : 'Добавить в маршрут'
                  }
                </Button>
              </Card>
            ) : (
              <Card className="p-6 text-center text-gray-500 sticky top-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Нажмите на точку на карте,<br />чтобы узнать подробности</p>
                <div className="mt-4 text-sm text-gray-400">
                  <p>🟦 Активности • 🟡 Места</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}