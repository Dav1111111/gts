import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter, Power, Users, Clock, Euro } from "lucide-react";
import { Input } from "./ui/input";

const vehicleData = [
  {
    id: "yamaha-252s",
    title: "Yamaha 252S",
    category: "boats",
    description: "Премиальный катер для морских прогулок и водных развлечений с максимальным комфортом и производительностью",
    image: "https://images.unsplash.com/photo-1621499901409-cfc9598bf28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBib2F0JTIwbHV4dXJ5JTIweWFjaHR8ZW58MXx8fHwxNzU2MTQyNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: {
      power: "320 л.с.",
      capacity: "12 пассажиров",
      duration: "4-8 часов"
    },
    price: {
      amount: 25000,
      period: "день"
    },
    features: ["GPS навигация", "Премиум аудио", "Холодильник", "Тент от солнца"],
    availability: "available"
  },
  {
    id: "honda-talon-1000r",
    title: "Honda Talon 1000R",
    category: "buggies",
    description: "Мощный спортивный багги для экстремального бездорожья с профессиональной подвеской FOX",
    image: "https://images.unsplash.com/photo-1681857239369-15ebd70bdad9?auto=format&fit=crop&q=80&w=1200",
    specs: {
      power: "104 л.с.",
      capacity: "2 человека",
      duration: "3-6 часов"
    },
    price: {
      amount: 15000,
      period: "день"
    },
    features: ["FOX подвеска", "Каркас безопасности", "Полный привод", "Спортивные шины"],
    availability: "available"
  },
  {
    id: "polaris-slingshot-r",
    title: "Polaris Slingshot R",
    category: "slingshot",
    description: "Уникальный трёхколёсный спорткар с открытой кабиной для незабываемых поездок по серпантинам",
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    specs: {
      power: "203 л.с.",
      capacity: "2 человека",
      duration: "2-8 часов"
    },
    price: {
      amount: 12000,
      period: "день"
    },
    features: ["Открытая кабина", "Спортивная подвеска", "Цифровая панель", "Премиум аудио"],
    availability: "available"
  }
];

const categories = [
  { value: "all", label: "Все категории" },
  { value: "boats", label: "Катера и водный транспорт" },
  { value: "buggies", label: "Багги" },
  { value: "slingshot", label: "Slingshot" },
  { value: "helicopters", label: "Вертолёты" }
];

interface GTSCatalogSectionProps {
  onViewFullCatalog?: () => void;
}

export function GTSCatalogSection({ onViewFullCatalog }: GTSCatalogSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredVehicles = vehicleData.filter(vehicle => {
    if (selectedCategory !== "all" && vehicle.category !== selectedCategory) {
      return false;
    }
    return true;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "boats": return "bg-blue-100 text-blue-800";
      case "buggies": return "bg-orange-100 text-orange-800";
      case "slingshot": return "bg-purple-100 text-purple-800";
      case "helicopters": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case "boats": return "Водный транспорт";
      case "buggies": return "Багги";
      case "slingshot": return "Slingshot";
      case "helicopters": return "Вертолёты";
      default: return category;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-5xl font-light mb-6 tracking-wider text-black">
            КАТАЛОГ ТЕХНИКИ
          </h2>
          <p className="text-lg text-black/60 max-w-3xl mx-auto font-light leading-relaxed mb-8">
            Выберите премиальную технику для незабываемых приключений. 
            Каждая единица проходит регулярное техническое обслуживание.
          </p>
          
          {/* Quick Filter */}
          <div className="max-w-md mx-auto">
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="bg-white border-gray-200">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category.value} value={category.value}>
                    {category.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Vehicle Grid - Show only first 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {filteredVehicles.slice(0, 3).map((vehicle) => (
            <Card key={vehicle.id} className="group border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
              {/* Image with Overlay */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <ImageWithFallback
                  src={vehicle.image}
                  alt={vehicle.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button 
                    size="lg"
                    className="bg-[#91040C] hover:bg-[#91040C]/90 text-white transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-300"
                  >
                    ЗАБРОНИРОВАТЬ
                  </Button>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <Badge className={`${getCategoryColor(vehicle.category)} border-0 text-xs`}>
                    {getCategoryName(vehicle.category)}
                  </Badge>
                </div>

                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-green-500 text-white border-0 text-xs">
                    В наличии
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-medium text-black mb-3 tracking-wide">
                  {vehicle.title}
                </h3>
                
                <p className="text-sm text-black/60 leading-relaxed mb-4 line-clamp-2">
                  {vehicle.description}
                </p>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-4 mb-4 py-4 border-t border-b border-gray-100">
                  <div className="text-center">
                    <Power className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                    <div className="text-xs text-black/60 mb-1">Мощность</div>
                    <div className="text-sm font-medium text-black">{vehicle.specs.power}</div>
                  </div>
                  <div className="text-center">
                    <Users className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                    <div className="text-xs text-black/60 mb-1">Вместимость</div>
                    <div className="text-sm font-medium text-black">{vehicle.specs.capacity}</div>
                  </div>
                  {vehicle.specs.duration && (
                    <div className="text-center">
                      <Clock className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                      <div className="text-xs text-black/60 mb-1">Длительность</div>
                      <div className="text-sm font-medium text-black">{vehicle.specs.duration}</div>
                    </div>
                  )}
                </div>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {vehicle.features.slice(0, 3).map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        {feature}
                      </Badge>
                    ))}
                    {vehicle.features.length > 3 && (
                      <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-700">
                        +{vehicle.features.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-light text-black">
                      {vehicle.price.amount.toLocaleString()}₽
                    </div>
                    <div className="text-sm text-black/60">за {vehicle.price.period}</div>
                  </div>
                  <Button 
                    className="bg-black hover:bg-black/90 text-white px-6"
                  >
                    Забронировать
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View Full Catalog CTA */}
        <div className="text-center">
          <div className="mb-6">
            <p className="text-black/60 mb-4">
              Показано {Math.min(3, filteredVehicles.length)} из {filteredVehicles.length} единиц техники
            </p>
            <Button 
              size="lg"
              variant="outline"
              onClick={onViewFullCatalog}
              className="border-black text-black hover:bg-black hover:text-white px-8"
            >
              СМОТРЕТЬ ВЕСЬ КАТАЛОГ
            </Button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 pt-12 border-t border-gray-100">
          <h3 className="text-2xl font-light text-black mb-4">
            Нужна консультация?
          </h3>
          <p className="text-black/60 mb-6 max-w-2xl mx-auto">
            Наши эксперты помогут выбрать идеальную технику для ваших планов 
            и расскажут о всех возможностях
          </p>
          <Button 
            size="lg"
            className="bg-[#91040C] hover:bg-[#91040C]/90 text-white px-8"
          >
            ПОЛУЧИТЬ КОНСУЛЬТАЦИЮ
          </Button>
        </div>
      </div>
    </section>
  );
}