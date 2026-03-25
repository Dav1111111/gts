import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Check, X, Clock, Users, ArrowRight } from 'lucide-react';

interface ComparisonOption {
  id: string;
  title: string;
  subtitle: string;
  price: number;
  duration: string;
  capacity: number;
  features: string[];
  notIncluded: string[];
  popular?: boolean;
}

interface ComparisonSet {
  id: string;
  title: string;
  options: [ComparisonOption, ComparisonOption];
}

const comparisonSets: ComparisonSet[] = [
  {
    id: 'slingshot-duration',
    title: 'Slingshot: 5 часов vs полный день',
    options: [
      {
        id: 'slingshot-5h',
        title: '5 часов',
        subtitle: 'Знакомство',
        price: 20000,
        duration: '5 часов',
        capacity: 2,
        features: ['Инструктаж', 'Набережная', 'Фотосессия'],
        notIncluded: ['Горные маршруты', 'Обед']
      },
      {
        id: 'slingshot-1day',
        title: 'Полный день',
        subtitle: 'Максимум',
        price: 35000,
        duration: '8-10 часов',
        capacity: 2,
        features: ['Расширенный инструктаж', 'Горные серпантины', 'Обед', 'Профсъёмка'],
        notIncluded: [],
        popular: true
      }
    ]
  },
  {
    id: 'boat-duration',
    title: 'Яхта: экспресс vs полный круиз',
    options: [
      {
        id: 'boat-1h',
        title: '1 час',
        subtitle: 'Экспресс',
        price: 15000,
        duration: '1 час',
        capacity: 8,
        features: ['Прогулка', 'Напитки', 'Капитан'],
        notIncluded: ['Купание', 'Питание', 'Рыбалка']
      },
      {
        id: 'boat-2h',
        title: '2-3 часа',
        subtitle: 'Круиз',
        price: 28000,
        duration: '2-3 часа',
        capacity: 8,
        features: ['Остановки для купания', 'Снэки', 'Рыбалка', 'Музыка'],
        notIncluded: [],
        popular: true
      }
    ]
  },
  {
    id: 'helicopter-type',
    title: 'Вертолёт: обзорный vs VIP',
    options: [
      {
        id: 'heli-basic',
        title: 'Обзорный',
        subtitle: 'Стандарт',
        price: 12000,
        duration: '20 минут',
        capacity: 3,
        features: ['Полёт над горами', 'Стандартный маршрут'],
        notIncluded: ['Индивидуальный маршрут', 'Посадка']
      },
      {
        id: 'heli-vip',
        title: 'VIP полёт',
        subtitle: 'Премиум',
        price: 45000,
        duration: '45-60 минут',
        capacity: 3,
        features: ['Индивидуальный маршрут', 'Посадка на вершине', 'Шампанское'],
        notIncluded: [],
        popular: true
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

function CompactComparisonCard({ option, isPopular }: { option: ComparisonOption; isPopular: boolean }) {
  return (
    <Card className={`p-4 h-full flex flex-col relative ${
      isPopular ? 'border-accent border-2 bg-accent/5' : 'border-gray-200 bg-white'
    }`}>
      {isPopular && (
        <div className="absolute -top-2 left-4">
          <Badge className="bg-accent text-white px-2 py-1 text-xs">
            Популярный
          </Badge>
        </div>
      )}

      <div className="text-center mb-4">
        <h4 className="font-semibold text-lg mb-1">{option.title}</h4>
        <p className="text-sm text-gray-600 mb-2">{option.subtitle}</p>
        <div className="text-xl font-bold text-accent">{formatPrice(option.price)}</div>
      </div>

      <div className="space-y-2 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Clock className="h-3 w-3" />
          {option.duration}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Users className="h-3 w-3" />
          До {option.capacity} человек
        </div>
      </div>

      <div className="flex-1 mb-4">
        <div className="space-y-1">
          {option.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-2 text-xs">
              <Check className="h-3 w-3 text-green-500 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </div>
          ))}
          {option.notIncluded.map((item, index) => (
            <div key={index} className="flex items-start gap-2 text-xs text-gray-400">
              <X className="h-3 w-3 text-gray-300 mt-0.5 flex-shrink-0" />
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

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

export function GTSCompactComparisonSection() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 
            className="mb-4 tracking-tight" 
            style={{ 
              fontFamily: 'Inter, system-ui, sans-serif', 
              fontWeight: '700', 
              fontSize: '2.5rem', 
              lineHeight: '1.2' 
            }}
          >
            Быстрое сравнение
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Выберите оптимальный вариант для ваших потребностей
          </p>
        </div>

        <div className="space-y-12">
          {comparisonSets.map((set) => (
            <div key={set.id} className="max-w-4xl mx-auto">
              <h3 className="text-center font-semibold text-xl mb-6 text-gray-800">
                {set.title}
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {set.options.map((option) => (
                  <CompactComparisonCard
                    key={option.id}
                    option={option}
                    isPopular={option.popular || false}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Нужна помощь с выбором?
          </p>
          <Button variant="outline" className="gap-2">
            Получить консультацию
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}