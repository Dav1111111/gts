import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { MapPin, Clock, Users, DollarSign } from 'lucide-react';

interface ActivityPin {
  id: string;
  type: 'boat' | 'helicopter' | 'buggy' | 'slingshot';
  name: string;
  location: string;
  coordinates: { x: number; y: number }; // позиция в процентах
  price: number;
  duration: string;
  capacity: number;
  description: string;
  available: boolean;
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
    description: 'Спортивный трёхколёсник для городских поездок',
    available: false
  },
  {
    id: 'boat-adler',
    type: 'boat',
    name: 'Скоростной катер',
    location: 'Адлер',
    coordinates: { x: 20, y: 85 },
    price: 18000,
    duration: '1-3 часа',
    capacity: 6,
    description: 'Быстрые морские прогулки',
    available: true
  }
];

const typeColors = {
  boat: '#0EA5E9', // sky blue
  helicopter: '#91040C', // accent red
  buggy: '#F97316', // orange
  slingshot: '#8B5CF6' // purple
};

const typeLabels = {
  boat: 'Катер',
  helicopter: 'Вертолёт',
  buggy: 'Багги',
  slingshot: 'Slingshot'
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function GTSInteractiveMapSection() {
  const [selectedPin, setSelectedPin] = useState<ActivityPin | null>(null);
  const [hoveredPin, setHoveredPin] = useState<string | null>(null);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '700', fontSize: '3rem', lineHeight: '1.2' }}>
            Карта активностей
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Исследуйте все доступные активности в Сочи и Красной Поляне
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map */}
          <div className="lg:col-span-2">
            <div className="relative bg-gray-100 rounded-2xl overflow-hidden h-96 lg:h-[500px] shadow-lg">
              {/* Simplified map background */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
                {/* Coastline representation */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-blue-200/50 to-transparent"></div>
                
                {/* Mountains representation */}
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
              {activityPins.map((pin) => (
                <button
                  key={pin.id}
                  className={`absolute w-8 h-8 rounded-full border-2 border-white shadow-lg transition-all duration-200 hover:scale-125 ${
                    !pin.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  } ${selectedPin?.id === pin.id ? 'scale-125 z-20' : 'z-10'}`}
                  style={{
                    left: `${pin.coordinates.x}%`,
                    top: `${pin.coordinates.y}%`,
                    backgroundColor: typeColors[pin.type],
                    transform: `translate(-50%, -50%) ${selectedPin?.id === pin.id || hoveredPin === pin.id ? 'scale(1.25)' : 'scale(1)'}`
                  }}
                  onClick={() => pin.available && setSelectedPin(pin)}
                  onMouseEnter={() => setHoveredPin(pin.id)}
                  onMouseLeave={() => setHoveredPin(null)}
                >
                  <MapPin className="w-4 h-4 text-white mx-auto" />
                </button>
              ))}
            </div>

            {/* Legend */}
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              {Object.entries(typeColors).map(([type, color]) => (
                <div key={type} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full border-2 border-white shadow"
                    style={{ backgroundColor: color }}
                  />
                  <span className="text-sm text-gray-600">
                    {typeLabels[type as keyof typeof typeLabels]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Selected activity details */}
          <div className="lg:col-span-1">
            {selectedPin ? (
              <Card className="p-6 sticky top-8">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <Badge 
                      className="mb-2"
                      style={{ backgroundColor: typeColors[selectedPin.type] }}
                    >
                      {typeLabels[selectedPin.type]}
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
                </div>

                <p className="text-gray-600 mb-6">
                  {selectedPin.description}
                </p>

                <Button 
                  className="w-full bg-black hover:bg-gray-800 text-white"
                  disabled={!selectedPin.available}
                >
                  {selectedPin.available ? 'Забронировать' : 'Недоступно'}
                </Button>
              </Card>
            ) : (
              <Card className="p-6 text-center text-gray-500 sticky top-8">
                <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Нажмите на точку на карте,<br />чтобы узнать подробности</p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}