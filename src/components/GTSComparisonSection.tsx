import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X, Clock, Users, MapPin, DollarSign, Zap } from 'lucide-react';

interface ComparisonOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  capacity: number;
  location: string;
  features: string[];
  notIncluded: string[];
  popular?: boolean;
  discount?: number;
}

interface ComparisonSet {
  id: string;
  category: string;
  title: string;
  description: string;
  options: [ComparisonOption, ComparisonOption];
}

const comparisonSets: ComparisonSet[] = [
  {
    id: 'slingshot-duration',
    category: 'Slingshot',
    title: 'Короткая прогулка vs Полный день',
    description: 'Выберите оптимальную продолжительность поездки на Polaris Slingshot R',
    options: [
      {
        id: 'slingshot-5h',
        title: 'Slingshot 5 часов',
        subtitle: 'Знакомство с техникой',
        price: 20000,
        duration: '5 часов',
        capacity: 2,
        location: 'Центр Сочи',
        features: [
          'Инструктаж и обучение',
          'Прогулка по набережной',
          'Фотосессия на смотровой',
          'Базовая страховка'
        ],
        notIncluded: [
          'Горные маршруты',
          'Профессиональная съёмка'
        ]
      },
      {
        id: 'slingshot-1day',
        title: 'Slingshot на весь день',
        subtitle: 'Полное погружение',
        price: 35000,
        duration: '8-10 часов',
        capacity: 2,
        location: 'Сочи + Красная Поляна',
        features: [
          'Расширенный инструктаж',
          'Горные серпантины',
          'Обед в ресторане',
          'Профессиональная съёмка',
          'Полная страховка',
          'Сопровождение гида'
        ],
        notIncluded: [],
        popular: true,
        discount: 15
      }
    ]
  },
  {
    id: 'boat-duration',
    category: 'Катер',
    title: 'Быстрая прогулка vs Морской круиз',
    description: 'Сравните варианты морских прогулок на яхте Yamaha 252S',
    options: [
      {
        id: 'boat-1h',
        title: 'Экспресс-прогулка',
        subtitle: '1 час на море',
        price: 15000,
        duration: '1 час',
        capacity: 8,
        location: 'Морской порт',
        features: [
          'Прогулка вдоль побережья',
          'Безалкогольные напитки',
          'Базовая безопасность',
          'Капитан в составе'
        ],
        notIncluded: [
          'Остановки для купания',
          'Питание',
          'Рыбалка'
        ]
      },
      {
        id: 'boat-2h',
        title: 'Полноценный круиз',
        subtitle: '2-3 часа релакса',
        price: 28000,
        duration: '2-3 часа',
        capacity: 8,
        location: 'Морской порт',
        features: [
          'Остановки для купания',
          'Снэки и напитки',
          'Снаряжение для плавания',
          'Рыболовные снасти',
          'Музыкальная система',
          'Капитан + стюард'
        ],
        notIncluded: [],
        popular: true
      }
    ]
  },
  {
    id: 'helicopter-type',
    category: 'Вертолёт',
    title: 'Обзорный полёт vs VIP-тур',
    description: 'Выберите формат полёта на вертолёте Robinson R44',
    options: [
      {
        id: 'heli-basic',
        title: 'Обзорный полёт',
        subtitle: 'Стандартная программа',
        price: 12000,
        duration: '20 минут',
        capacity: 3,
        location: 'Красная Поляна',
        features: [
          'Полёт над горами',
          'Стандартный маршрут',
          'Общая посадка',
          'Базовая безопасность'
        ],
        notIncluded: [
          'Индивидуальный маршрут',
          'Посадка в горах',
          'Фотосъёмка'
        ]
      },
      {
        id: 'heli-vip',
        title: 'VIP полёт',
        subtitle: 'Премиальный сервис',
        price: 45000,
        duration: '45-60 минут',
        capacity: 3,
        location: 'Красная Поляна',
        features: [
          'Индивидуальный маршрут',
          'Посадка на вершине',
          'Фотосессия с пилотом',
          'Шампанское на высоте',
          'Персональный брифинг',
          'Видеосъёмка полёта'
        ],
        notIncluded: [],
        popular: true,
        discount: 10
      }
    ]
  }
];

function formatPrice(price: number): string {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

function ComparisonCard({ option, isPopular }: { option: ComparisonOption; isPopular?: boolean }) {
  const discountedPrice = option.discount ? option.price - (option.price * option.discount / 100) : option.price;

  return (
    <Card className={`p-4 h-full flex flex-col relative ${
      isPopular ? 'border-accent border-2 shadow-lg' : 'border-gray-200'
    }`}>
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-accent text-white px-3 py-1">
            <Zap className="h-3 w-3 mr-1" />
            Популярный
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1">{option.title}</h3>
        <p className="text-gray-600 text-sm mb-3">{option.subtitle}</p>
        
        {/* Price */}
        <div className="mb-3">
          {option.discount ? (
            <div className="space-y-1">
              <div className="text-xl font-bold text-accent">
                {formatPrice(discountedPrice)}
              </div>
              <div className="text-sm text-gray-400 line-through">
                {formatPrice(option.price)}
              </div>
              <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                -{option.discount}%
              </Badge>
            </div>
          ) : (
            <div className="text-xl font-bold">
              {formatPrice(option.price)}
            </div>
          )}
        </div>
      </div>

      {/* Key details */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock className="h-3 w-3" />
          {option.duration}
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Users className="h-3 w-3" />
          До {option.capacity} человек
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <MapPin className="h-3 w-3" />
          {option.location}
        </div>
      </div>

      {/* Features included - compact */}
      <div className="flex-1 mb-4">
        <ul className="space-y-1">
          {option.features.slice(0, 3).map((feature, index) => (
            <li key={index} className="flex items-start gap-2 text-xs">
              <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
          {option.features.length > 3 && (
            <li className="text-xs text-gray-500 ml-5">
              +{option.features.length - 3} дополнительных опций
            </li>
          )}
        </ul>
      </div>

      {/* CTA Button */}
      <Button 
        size="sm"
        className={`w-full ${
          isPopular 
            ? 'bg-accent hover:bg-accent/90 text-white' 
            : 'bg-black hover:bg-gray-800 text-white'
        }`}
      >
        Выбрать
      </Button>
    </Card>
  );
}

export function GTSComparisonSection() {
  return (
    <section className="py-8 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="mb-3 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif', fontWeight: '600', fontSize: '1.8rem', lineHeight: '1.3' }}>
            Сравнение пакетов
          </h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            Выберите оптимальный вариант для ваших потребностей
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {comparisonSets.slice(0, 1).map((set, setIndex) => (
            <div key={set.id}>
              {/* Set header */}
              <div className="text-center mb-6">
                <Badge variant="outline" className="mb-2 text-xs">
                  {set.category}
                </Badge>
                <h3 className="text-lg font-medium mb-2">
                  {set.title}
                </h3>
                <p className="text-sm text-gray-600 max-w-2xl mx-auto">
                  {set.description}
                </p>
              </div>

              {/* Comparison cards */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {set.options.map((option, optionIndex) => (
                  <ComparisonCard
                    key={option.id}
                    option={option}
                    isPopular={option.popular}
                  />
                ))}
              </div>

              {/* Separator */}
              {setIndex < comparisonSets.length - 1 && (
                <div className="mt-16 flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <div className="px-4">
                    <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-6 p-4 bg-white rounded-lg">
          <p className="text-gray-600 mb-3 text-sm">
            Консультант поможет выбрать оптимальный вариант
          </p>
          <Button size="sm" className="bg-accent hover:bg-accent/90 text-white">
            Получить консультацию
          </Button>
        </div>
      </div>
    </section>
  );
}