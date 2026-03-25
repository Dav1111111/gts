import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Filter, Power, Users, Clock, Euro, Heart, Zap, MapPin, Calendar } from "lucide-react";
import { Input } from "./ui/input";

const vehicleData = [
  {
    id: "yamaha-252s",
    title: "Yamaha 252S",
    category: "boats",
    description: "Премиальный катер для морских прогулок и водных развлечений с максимальным комфортом и производительностью",
    image: "https://images.unsplash.com/photo-1621499901409-cfc9598bf28a?auto=format&fit=crop&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1681857239369-15ebd70bdad9?auto=format&fit=crop&q=80&w=1080",
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
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?auto=format&fit=crop&q=80&w=1080",
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

const scenarios = [
  {
    id: "romantic",
    title: "Романтическое свидание",
    icon: Heart,
    description: "Slingshot на закате + ужин",
    duration: "4-5 часов",
    price: 18000,
    image: "https://images.unsplash.com/photo-1709366541185-ef763288f92d?auto=format&fit=crop&q=80&w=1080",
    includes: ["Slingshot R на 4 часа", "Маршрут по живописным местам", "Фотосессия на закате"]
  },
  {
    id: "adrenaline",
    title: "Адреналиновый день",
    icon: Zap,
    description: "Багги утром + вертолёт днём",
    duration: "6-8 часов",
    price: 45000,
    image: "https://images.unsplash.com/photo-1634574946473-b38a96d438b8?auto=format&fit=crop&q=80&w=1080",
    includes: ["Багги Honda Talon на 4 часа", "Полёт на вертолёте 30 мин", "Обед в горах"]
  },
  {
    id: "family",
    title: "Семейное приключение",
    icon: Users,
    description: "Яхта + экскурсия для всех",
    duration: "5-6 часов",
    price: 35000,
    image: "https://images.unsplash.com/photo-1612764324168-7a3a318e0cbb?auto=format&fit=crop&q=80&w=1080",
    includes: ["Катер Yamaha 252S на 5 часов", "Капитан и гид", "Обед на борту", "Снаряжение для рыбалки"]
  }
];

const categories = [
  { value: "all", label: "Все категории" },
  { value: "boats", label: "Катера и водный транспорт" },
  { value: "buggies", label: "Багги" },
  { value: "slingshot", label: "Slingshot" },
  { value: "helicopters", label: "Вертолёты" }
];

interface GTSCatalogWithScenariosSectionProps {}

export function GTSCatalogWithScenariosSection({}: GTSCatalogWithScenariosSectionProps = {}) {
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
    <section className="py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-12">
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

        {/* Main Content with Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Vehicle Grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredVehicles.slice(0, 4).map((vehicle) => (
                <Card key={vehicle.id} className="group border-0 shadow-lg bg-white overflow-hidden hover:shadow-xl transition-all duration-300">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={vehicle.image}
                      alt={vehicle.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <Badge className={`${getCategoryColor(vehicle.category)} border-0 text-xs`}>
                        {getCategoryName(vehicle.category)}
                      </Badge>
                    </div>

                    {/* Availability Badge */}
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-green-500 text-white border-0 text-xs">
                        В наличии
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-medium text-black mb-2 tracking-wide">
                      {vehicle.title}
                    </h3>
                    
                    <p className="text-sm text-black/60 leading-relaxed mb-4 line-clamp-2">
                      {vehicle.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-3 mb-4 py-3 border-t border-b border-gray-100">
                      <div className="text-center">
                        <Power className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                        <div className="text-xs text-black/60 mb-1">Мощность</div>
                        <div className="text-xs font-medium text-black">{vehicle.specs.power}</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                        <div className="text-xs text-black/60 mb-1">Вместимость</div>
                        <div className="text-xs font-medium text-black">{vehicle.specs.capacity}</div>
                      </div>
                      <div className="text-center">
                        <Clock className="w-4 h-4 text-[#91040C] mx-auto mb-1" />
                        <div className="text-xs text-black/60 mb-1">Длительность</div>
                        <div className="text-xs font-medium text-black">{vehicle.specs.duration}</div>
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-light text-black">
                          {vehicle.price.amount.toLocaleString()}₽
                        </div>
                        <div className="text-sm text-black/60">за {vehicle.price.period}</div>
                      </div>
                      <Button 
                        size="sm"
                        className="bg-black hover:bg-black/90 text-white px-4"
                      >
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>


          </div>

          {/* Scenarios Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-gray-50 h-fit sticky top-8">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-5 h-5 text-[#91040C]" />
                <h3 className="text-lg font-medium text-black">Готовые сценарии</h3>
              </div>
              
              <div className="space-y-4">
                {scenarios.map((scenario) => {
                  const IconComponent = scenario.icon;
                  return (
                    <Card key={scenario.id} className="p-4 bg-white border-gray-200 hover:shadow-md transition-shadow cursor-pointer group">
                      <div className="relative aspect-video mb-3 overflow-hidden rounded">
                        <ImageWithFallback
                          src={scenario.image}
                          alt={scenario.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="absolute top-2 left-2">
                          <div className="w-6 h-6 bg-[#91040C] rounded-full flex items-center justify-center">
                            <IconComponent className="w-3 h-3 text-white" />
                          </div>
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-sm mb-2 text-black">{scenario.title}</h4>
                      <p className="text-xs text-black/60 mb-3">{scenario.description}</p>
                      
                      <div className="flex items-center justify-between text-xs text-black/60 mb-3">
                        <span>{scenario.duration}</span>
                        <span className="font-medium text-[#91040C]">{scenario.price.toLocaleString()}₽</span>
                      </div>
                      
                      <ul className="space-y-1 mb-4">
                        {scenario.includes.slice(0, 2).map((include, index) => (
                          <li key={index} className="text-xs text-black/60 flex items-start">
                            <div className="w-1 h-1 bg-[#91040C] rounded-full mt-1.5 mr-2 flex-shrink-0" />
                            {include}
                          </li>
                        ))}
                        {scenario.includes.length > 2 && (
                          <li className="text-xs text-black/60">
                            +{scenario.includes.length - 2} опций
                          </li>
                        )}
                      </ul>
                      
                      <Button size="sm" className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                        Выбрать сценарий
                      </Button>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <Button variant="outline" size="sm" className="w-full border-[#91040C] text-[#91040C] hover:bg-[#91040C] hover:text-white">
                  Все сценарии
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
