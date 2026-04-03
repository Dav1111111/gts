import { useState, useMemo, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { Checkbox } from "./ui/checkbox";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Search, 
  Filter, 
  SlidersHorizontal,
  Power, 
  Users, 
  Clock, 
  Euro,
  Heart,
  Share,
  Eye,
  ArrowUpDown,
  Grid3X3,
  List,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Shield,
  Star
} from "lucide-react";

interface Vehicle {
  id: string;
  title: string;
  category: "boats" | "buggies" | "slingshot" | "helicopters";
  description: string;
  longDescription: string;
  images: string[];
  specs: {
    power: string;
    capacity: string;
    duration?: string;
    maxSpeed?: string;
    fuelConsumption?: string;
    year: string;
  };
  price: {
    amount: number;
    period: string;
  };
  features: string[];
  availability: "available" | "booked" | "maintenance";
  rating: number;
  reviewsCount: number;
  location: string;
  tags: string[];
}

const extendedVehicles: Vehicle[] = [
  {
    id: "yamaha-252s",
    title: "Yamaha 252S",
    category: "boats",
    description: "Премиальный катер для морских прогулок и водных развлечений",
    longDescription: "Yamaha 252S представляет собой идеальное сочетание комфорта, производительности и стиля. Этот премиальный катер оснащен двумя высокопроизводительными двигателями TR-1 и предлагает непревзойденный опыт на воде для всей семьи.",
    images: [
      "https://images.unsplash.com/photo-1621499901409-cfc9598bf28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBib2F0JTIwbHV4dXJ5JTIweWFjaHR8ZW58MXx8fHwxNzU2MTQyNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      "https://images.unsplash.com/photo-1593355765170-4c7c31013922?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqZXQlMjBza2klMjB3YXRlcmNyYWZ0fGVufDF8fHx8MTc1NjE0Mjc4N3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    specs: {
      power: "320 л.с.",
      capacity: "12 пассажиров",
      duration: "4-8 часов",
      maxSpeed: "85 км/ч",
      fuelConsumption: "40 л/ч",
      year: "2024"
    },
    price: {
      amount: 25000,
      period: "день"
    },
    features: ["GPS навигация", "Премиум аудио", "Холодильник", "Тент от солнца", "Душ", "Туалет"],
    availability: "available",
    rating: 4.8,
    reviewsCount: 24,
    location: "Сочи Марина",
    tags: ["семейный", "люкс", "рыбалка", "отдых"]
  },
  {
    id: "jet-ski-vx",
    title: "Yamaha VX Cruiser",
    category: "boats", 
    description: "Спортивный гидроцикл для активного отдыха на воде",
    longDescription: "Yamaha VX Cruiser - это революционный гидроцикл с уникальной системой управления RiDE. Обеспечивает интуитивное управление и максимальную безопасность на воде.",
    images: [
      "https://images.unsplash.com/photo-1660642481220-3b435d98759a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBqZXQlMjBza2klMjB3YXRlciUyMHNwb3J0c3xlbnwxfHx8fDE3NTYyMDU0NjN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    specs: {
      power: "180 л.с.",
      capacity: "3 человека",
      duration: "2-4 часа",
      maxSpeed: "105 км/ч",
      fuelConsumption: "25 л/ч",
      year: "2024"
    },
    price: {
      amount: 8000,
      period: "час"
    },
    features: ["Система RiDE", "Электронный дроссель", "Датчик безопасности", "Багажник"],
    availability: "available",
    rating: 4.6,
    reviewsCount: 18,
    location: "Сочи Марина",
    tags: ["спорт", "экстрим", "скорость"]
  },
  {
    id: "honda-talon-1000r",
    title: "Honda Talon 1000R",
    category: "buggies",
    description: "Мощный спортивный багги для экстремального бездорожья",
    longDescription: "Honda Talon 1000R - это вершина инженерной мысли в мире спортивных багги. Оснащен профессиональной подвеской FOX, мощным двигателем и продвинутой системой полного привода для покорения любого бездорожья.",
    images: [
      "https://images.unsplash.com/photo-1681857239369-15ebd70bdad9?auto=format&fit=crop&q=80&w=1200"
    ],
    specs: {
      power: "104 л.с.",
      capacity: "2 человека",
      duration: "3-6 часов",
      maxSpeed: "120 км/ч",
      fuelConsumption: "12 л/ч",
      year: "2024"
    },
    price: {
      amount: 15000,
      period: "день"
    },
    features: ["FOX подвеска", "Каркас безопасности", "Полный привод", "Спортивные шины", "Лебедка", "LED фары"],
    availability: "available",
    rating: 4.9,
    reviewsCount: 31,
    location: "База Красная Поляна",
    tags: ["экстрим", "горы", "адреналин", "офф-роад"]
  },
  {
    id: "polaris-slingshot-r",
    title: "Polaris Slingshot R",
    category: "slingshot",
    description: "Уникальный трёхколёсный спорткар с открытой кабиной",
    longDescription: "Polaris Slingshot R предлагает уникальный опыт вождения, сочетая в себе мощность спорткара и свободу мотоцикла. Этот трёхколёсный автомобиль создан для тех, кто ценит эксклюзивность и драйв.",
    images: [
      "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    specs: {
      power: "203 л.с.",
      capacity: "2 человека", 
      duration: "2-8 часов",
      maxSpeed: "200 км/ч",
      fuelConsumption: "8 л/100км",
      year: "2024"
    },
    price: {
      amount: 12000,
      period: "день"
    },
    features: ["Открытая кабина", "Спортивная подвеска", "Цифровая панель", "Премиум аудио", "Круиз-контроль"],
    availability: "available",
    rating: 4.7,
    reviewsCount: 22,
    location: "Центр Сочи",
    tags: ["уникальный", "спорт", "стиль", "эмоции"]
  },
  {
    id: "robinson-r44",
    title: "Robinson R44",
    category: "helicopters",
    description: "Четырёхместный вертолёт для панорамных экскурсий",
    longDescription: "Robinson R44 - надежный и комфортабельный вертолёт для туристических полётов. Благодаря панорамным окнам обеспечивает великолепный обзор на 360 градусов, позволяя насладиться потрясающими видами Сочи с высоты птичьего полёта.",
    images: [
      "https://images.unsplash.com/photo-1735967204871-a442c1401ae0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JpbnNvbiUyMGhlbGljb3B0ZXIlMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxNDI3ODl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
    ],
    specs: {
      power: "245 л.с.",
      capacity: "3 пассажира",
      duration: "30-60 мин",
      maxSpeed: "180 км/ч",
      fuelConsumption: "90 л/ч",
      year: "2023"
    },
    price: {
      amount: 45000,
      period: "час"
    },
    features: ["Панорамные окна", "Кондиционер", "Интерком", "Профессиональный пилот", "Авиационная безопасность"],
    availability: "available",
    rating: 5.0,
    reviewsCount: 15,
    location: "Аэропорт Сочи",
    tags: ["панорама", "элитно", "экскурсия", "высота"]
  }
];

const categories = [
  { value: "all", label: "Все категории" },
  { value: "boats", label: "Водный транспорт" },
  { value: "buggies", label: "Багги" },
  { value: "slingshot", label: "Slingshot" },
  { value: "helicopters", label: "Вертолёты" }
];

const sortOptions = [
  { value: "price-asc", label: "Цена: по возрастанию" },
  { value: "price-desc", label: "Цена: по убыванию" },
  { value: "rating", label: "По рейтингу" },
  { value: "popular", label: "По популярности" },
  { value: "newest", label: "Новинки" }
];

const priceRanges = [
  { value: "all", label: "Любая цена" },
  { value: "0-10000", label: "До 10,000₽" },
  { value: "10000-20000", label: "10,000₽ - 20,000₽" },
  { value: "20000-50000", label: "20,000₽ - 50,000₽" },
  { value: "50000+", label: "От 50,000₽" }
];

const ITEMS_PER_PAGE = 6;

const allFeatures = Array.from(new Set(extendedVehicles.flatMap(v => v.features)));

function getCategoryColor(category: string) {
  switch (category) {
    case "boats": return "bg-blue-100 text-blue-800";
    case "buggies": return "bg-orange-100 text-orange-800";
    case "slingshot": return "bg-purple-100 text-purple-800";
    case "helicopters": return "bg-green-100 text-green-800";
    default: return "bg-gray-100 text-gray-800";
  }
}

interface GTSCatalogPageProps {
  onBackToHome: () => void;
}

export function GTSCatalogPage({ onBackToHome }: GTSCatalogPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedPriceRange, setSelectedPriceRange] = useState("all");
  const [selectedSort, setSelectedSort] = useState("popular");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const filteredVehicles = useMemo(() => extendedVehicles.filter(vehicle => {
    if (selectedCategory !== "all" && vehicle.category !== selectedCategory) return false;

    if (selectedPriceRange !== "all") {
      const price = vehicle.price.amount;
      switch (selectedPriceRange) {
        case "0-10000": if (price > 10000) return false; break;
        case "10000-20000": if (price < 10000 || price > 20000) return false; break;
        case "20000-50000": if (price < 20000 || price > 50000) return false; break;
        case "50000+": if (price < 50000) return false; break;
      }
    }

    if (selectedFeatures.length > 0) {
      const hasFeatures = selectedFeatures.every(feature =>
        vehicle.features.includes(feature)
      );
      if (!hasFeatures) return false;
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return vehicle.title.toLowerCase().includes(query) ||
             vehicle.description.toLowerCase().includes(query) ||
             vehicle.tags.some(tag => tag.toLowerCase().includes(query));
    }

    return true;
  }), [selectedCategory, selectedPriceRange, selectedFeatures, searchQuery]);

  const sortedVehicles = useMemo(() => [...filteredVehicles].sort((a, b) => {
    switch (selectedSort) {
      case "price-asc": return a.price.amount - b.price.amount;
      case "price-desc": return b.price.amount - a.price.amount;
      case "rating": return b.rating - a.rating;
      case "popular": return b.reviewsCount - a.reviewsCount;
      case "newest": return parseInt(b.specs.year) - parseInt(a.specs.year);
      default: return 0;
    }
  }), [filteredVehicles, selectedSort]);

  const totalPages = useMemo(() => Math.ceil(sortedVehicles.length / ITEMS_PER_PAGE), [sortedVehicles]);

  const paginatedVehicles = useMemo(() => sortedVehicles.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  ), [sortedVehicles, currentPage]);

  const toggleFavorite = useCallback((vehicleId: string) => {
    setFavorites(prev =>
      prev.includes(vehicleId)
        ? prev.filter(id => id !== vehicleId)
        : [...prev, vehicleId]
    );
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 lg:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                onClick={onBackToHome}
                className="text-black hover:text-[#91040C]"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Назад к главной
              </Button>
              <div className="hidden md:block w-px h-6 bg-gray-300"></div>
              <h1 className="text-xl lg:text-2xl font-light tracking-wider text-black">
                КАТАЛОГ ТЕХНИКИ
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                {sortedVehicles.length} из {extendedVehicles.length}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-gray-100" : ""}
                  aria-label="Сетка"
                  aria-pressed={viewMode === "grid"}
                >
                  <Grid3X3 className="w-4 h-4" aria-hidden="true" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-gray-100" : ""}
                  aria-label="Список"
                  aria-pressed={viewMode === "list"}
                >
                  <List className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <Card className="border-gray-200 shadow-sm">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-medium text-black">Фильтры</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        setSelectedCategory("all");
                        setSelectedPriceRange("all");
                        setSelectedFeatures([]);
                        setSearchQuery("");
                      }}
                    >
                      Сбросить
                    </Button>
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-black mb-2 block">Поиск</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        placeholder="Поиск техники..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 border-gray-200"
                      />
                    </div>
                  </div>

                  {/* Category */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-black mb-2 block">Категория</label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="border-gray-200">
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

                  {/* Price Range */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-black mb-2 block">Цена</label>
                    <Select value={selectedPriceRange} onValueChange={setSelectedPriceRange}>
                      <SelectTrigger className="border-gray-200">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map(range => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <label className="text-sm font-medium text-black mb-3 block">Особенности</label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {allFeatures.slice(0, 8).map(feature => (
                        <div key={feature} className="flex items-center space-x-2">
                          <Checkbox
                            id={feature}
                            checked={selectedFeatures.includes(feature)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedFeatures(prev => [...prev, feature]);
                              } else {
                                setSelectedFeatures(prev => prev.filter(f => f !== feature));
                              }
                            }}
                          />
                          <label 
                            htmlFor={feature}
                            className="text-sm text-gray-700 cursor-pointer"
                          >
                            {feature}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            
            {/* Sort and View Controls */}
            <div className="flex items-center justify-between mb-6">
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-64 border-gray-200">
                  <ArrowUpDown className="w-4 h-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Vehicle Grid/List */}
            <div className={`grid gap-6 mb-8 ${
              viewMode === "grid" 
                ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {paginatedVehicles.map((vehicle) => (
                <Card key={vehicle.id} className="group border-gray-200 shadow-sm hover:shadow-lg transition-[box-shadow,transform] duration-300 overflow-hidden">
                  {/* Image */}
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <ImageWithFallback
                      src={vehicle.images[0]}
                      alt={vehicle.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    
                    {/* Overlay Actions */}
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className={`w-8 h-8 rounded-full bg-white/80 hover:bg-white ${
                          favorites.includes(vehicle.id) ? "text-red-500" : "text-gray-600"
                        }`}
                        onClick={() => toggleFavorite(vehicle.id)}
                        aria-label={favorites.includes(vehicle.id) ? "Убрать из избранного" : "Добавить в избранное"}
                        aria-pressed={favorites.includes(vehicle.id)}
                      >
                        <Heart className={`w-4 h-4 ${favorites.includes(vehicle.id) ? "fill-current" : ""}`} aria-hidden="true" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-gray-600"
                            onClick={() => setSelectedVehicle(vehicle)}
                            aria-label="Быстрый просмотр"
                          >
                            <Eye className="w-4 h-4" aria-hidden="true" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          {selectedVehicle && (
                            <div className="p-6">
                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                <div>
                                  <div className="aspect-[4/3] rounded-lg overflow-hidden mb-4">
                                    <ImageWithFallback
                                      src={selectedVehicle.images[0]}
                                      alt={selectedVehicle.title}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  {selectedVehicle.images.length > 1 && (
                                    <div className="grid grid-cols-3 gap-2">
                                      {selectedVehicle.images.slice(1, 4).map((img, idx) => (
                                        <div key={idx} className="aspect-square rounded overflow-hidden">
                                          <ImageWithFallback
                                            src={img}
                                            alt={`${selectedVehicle.title} ${idx + 2}`}
                                            className="w-full h-full object-cover"
                                          />
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                
                                <div>
                                  <div className="flex items-center justify-between mb-4">
                                    <Badge className={getCategoryColor(selectedVehicle.category)}>
                                      {categories.find(c => c.value === selectedVehicle.category)?.label}
                                    </Badge>
                                    <div className="flex items-center space-x-1">
                                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                      <span className="text-sm font-medium">{selectedVehicle.rating}</span>
                                      <span className="text-sm text-gray-500">({selectedVehicle.reviewsCount})</span>
                                    </div>
                                  </div>
                                  
                                  <h2 className="text-2xl font-light mb-4 tracking-wide">{selectedVehicle.title}</h2>
                                  <p className="text-gray-600 mb-6 leading-relaxed">{selectedVehicle.longDescription}</p>
                                  
                                  <div className="grid grid-cols-2 gap-4 mb-6">
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                      <Power className="w-5 h-5 text-[#91040C] mx-auto mb-1" />
                                      <div className="text-sm text-gray-600">Мощность</div>
                                      <div className="font-medium">{selectedVehicle.specs.power}</div>
                                    </div>
                                    <div className="text-center p-3 bg-gray-50 rounded">
                                      <Users className="w-5 h-5 text-[#91040C] mx-auto mb-1" />
                                      <div className="text-sm text-gray-600">Вместимость</div>
                                      <div className="font-medium">{selectedVehicle.specs.capacity}</div>
                                    </div>
                                  </div>
                                  
                                  <div className="mb-6">
                                    <h4 className="font-medium mb-3">Особенности:</h4>
                                    <div className="flex flex-wrap gap-2">
                                      {selectedVehicle.features.map((feature, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-xs">
                                          {feature}
                                        </Badge>
                                      ))}
                                    </div>
                                  </div>
                                  
                                  <div className="border-t pt-6">
                                    <div className="flex items-center justify-between mb-4">
                                      <div>
                                        <div className="text-2xl font-light">{selectedVehicle.price.amount.toLocaleString()}₽</div>
                                        <div className="text-sm text-gray-600">за {selectedVehicle.price.period}</div>
                                      </div>
                                      <Button className="bg-[#91040C] hover:bg-[#91040C]/90 text-white">
                                        Забронировать
                                      </Button>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-600">
                                      <MapPin className="w-4 h-4 mr-1" />
                                      {selectedVehicle.location}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <Badge className={getCategoryColor(vehicle.category)}>
                        {categories.find(c => c.value === vehicle.category)?.label}
                      </Badge>
                    </div>

                    {/* Availability */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-green-500 text-white">
                        В наличии
                      </Badge>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-medium text-black tracking-wide">
                        {vehicle.title}
                      </h3>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{vehicle.rating}</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {vehicle.description}
                    </p>

                    {/* Specs */}
                    <div className="grid grid-cols-3 gap-2 mb-4 py-3 border-t border-b border-gray-100">
                      <div className="text-center">
                        <Power className="w-4 h-4 text-[#91040C] mx-auto mb-1" aria-hidden="true" />
                        <div className="text-xs text-gray-600">{vehicle.specs.power}</div>
                      </div>
                      <div className="text-center">
                        <Users className="w-4 h-4 text-[#91040C] mx-auto mb-1" aria-hidden="true" />
                        <div className="text-xs text-gray-600">{vehicle.specs.capacity}</div>
                      </div>
                      <div className="text-center">
                        <MapPin className="w-4 h-4 text-[#91040C] mx-auto mb-1" aria-hidden="true" />
                        <div className="text-xs text-gray-600">{vehicle.location}</div>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-1">
                        {vehicle.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs bg-gray-100">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl font-light text-black">
                          {vehicle.price.amount.toLocaleString()}₽
                        </div>
                        <div className="text-xs text-gray-600">за {vehicle.price.period}</div>
                      </div>
                      <Button className="bg-black hover:bg-black/90 text-white">
                        Забронировать
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Предыдущая
                </Button>
                
                <div className="flex items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={currentPage === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentPage(page)}
                      className={currentPage === page ? "bg-[#91040C] text-white" : ""}
                    >
                      {page}
                    </Button>
                  ))}
                </div>
                
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Следующая
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            )}

            {/* Empty State */}
            {paginatedVehicles.length === 0 && (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-black mb-2">Техника не найдена</h3>
                <p className="text-gray-600 mb-6">Попробуйте изменить параметры поиска или фильтры</p>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setSelectedCategory("all");
                    setSelectedPriceRange("all");
                    setSelectedFeatures([]);
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                >
                  Сбросить все фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}