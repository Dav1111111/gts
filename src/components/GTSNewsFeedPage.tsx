import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Calendar, Clock, User, Tag, Search, Filter } from "lucide-react";
import { Input } from "./ui/input";

interface GTSNewsFeedPageProps {
  onBack: () => void;
  onViewArticle?: (articleId: string) => void;
}

const newsArticles = [
  {
    id: "1",
    title: "Новый маршрут: Красная Поляна — Роза Хутор",
    excerpt: "Эксклюзивная экспедиция на багги по горным тропам с остановками в самых живописных точках. Маршрут включает посещение водопадов, панорамных смотровых площадок и обед в горном ресторане.",
    image: "https://images.unsplash.com/photo-1646273470766-38e066a0d146?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2NoaSUyMG1vdW50YWlucyUyMGx1eHVyeSUyMGxhbmRzY2FwZXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Buggies",
    date: "15 янв 2025",
    author: "Андрей Козлов",
    readTime: "3 мин",
    tags: ["маршруты", "багги", "красная поляна"]
  },
  {
    id: "2", 
    title: "Скидка 30% на морские прогулки в январе",
    excerpt: "Специальное предложение на аренду катеров в будние дни. Действует до конца месяца. Включает капитана, топливо и базовое снаряжение для рыбалки.",
    image: "https://images.unsplash.com/photo-1654850888151-883881017fcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxibGFjayUyMHNlYSUyMGNvYXN0JTIwcHJlbWl1bXxlbnwxfHx8fDE3NTYxMzYxMjd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Boats",
    date: "12 янв 2025",
    author: "Марина Волкова",
    readTime: "2 мин",
    tags: ["акции", "катера", "скидки"]
  },
  {
    id: "3",
    title: "VIP-тур: Закрытые пляжи Сочи",
    excerpt: "Эксклюзивная программа для членов клуба с доступом к приватным локациям. Включает трансфер на премиальной яхте, обед от шеф-повара и персональное сопровождение.",
    image: "https://images.unsplash.com/photo-1749411536879-1a66536c2256?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHByZW1pdW0lMjBib2F0fGVufDF8fHx8MTc1NjEzNjEyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Club",
    date: "10 янв 2025",
    author: "Елена Соколова",
    readTime: "4 мин",
    tags: ["vip", "членство", "пляжи"]
  },
  {
    id: "4",
    title: "Вертолётные экскурсии: Новое расписание",
    excerpt: "Увеличенное количество рейсов и новые маршруты над Кавказскими горами. Добавлены вечерние полёты на закате и утренние туры с завтраком на высоте.",
    image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwcm9iaW5zb24lMjBsdXh1cnklMjBhdmlhdGlvbnxlbnwxfHx8fDE3NTYxMzYxMjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Helicopters",
    date: "8 янв 2025",
    author: "Дмитрий Петров",
    readTime: "2 мин",
    tags: ["вертолёты", "расписание", "экскурсии"]
  },
  {
    id: "5",
    title: "Открытие сезона: Slingshot туры",
    excerpt: "Старт сезона экстремальных поездок на трицикле по горным серпантинам. Новые маршруты включают посещение смотровых площадок и остановки для фотосессий.",
    image: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "Slingshot",
    date: "5 янв 2025",
    author: "Максим Орлов",
    readTime: "3 мин",
    tags: ["slingshot", "сезон", "экстрим"]
  },
  {
    id: "6",
    title: "Зимние события клуба GTS",
    excerpt: "Календарь мероприятий на февраль: мастер-классы по навигации, дегустации в партнёрских ресторанах, закрытые показы документальных фильмов о путешествиях.",
    image: "https://images.unsplash.com/photo-1549294413-26f195200c16?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjbHViJTIwZXZlbnQlMjBwYXJ0eXxlbnwxfHx8fDE3NTY2NTQ2NTl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    category: "Events",
    date: "3 янв 2025",
    author: "Анна Лебедева",
    readTime: "5 мин",
    tags: ["события", "клуб", "мероприятия"]
  }
];

const categories = [
  { value: "all", label: "Все категории", color: "bg-gray-100 text-gray-800" },
  { value: "Boats", label: "Катера", color: "bg-blue-100 text-blue-800" },
  { value: "Helicopters", label: "Вертолёты", color: "bg-green-100 text-green-800" },
  { value: "Buggies", label: "Багги", color: "bg-orange-100 text-orange-800" },
  { value: "Slingshot", label: "Slingshot", color: "bg-purple-100 text-purple-800" },
  { value: "Club", label: "Клуб", color: "bg-[#91040C]/10 text-[#91040C]" },
  { value: "Events", label: "События", color: "bg-yellow-100 text-yellow-800" }
];

export function GTSNewsFeedPage({ onBack, onViewArticle }: GTSNewsFeedPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const getCategoryColor = (category: string) => {
    const cat = categories.find(c => c.value === category);
    return cat ? cat.color : "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Назад
              </Button>
              <h1 className="text-2xl font-light">Новости и блог</h1>
            </div>
            
            {/* Search */}
            <div className="hidden md:flex items-center gap-4 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Поиск статей..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              {/* Mobile Search */}
              <div className="mb-6 md:hidden">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Поиск статей..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Categories */}
              <Card className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium">Категории</h3>
                </div>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category.value}
                      onClick={() => setSelectedCategory(category.value)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        selectedCategory === category.value
                          ? 'bg-[#91040C] text-white'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      {category.label}
                      <span className="ml-2 text-xs opacity-70">
                        ({selectedCategory === category.value ? filteredArticles.length : 
                          newsArticles.filter(a => category.value === "all" || a.category === category.value).length})
                      </span>
                    </button>
                  ))}
                </div>
              </Card>

              {/* Popular Tags */}
              <Card className="p-6 mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-gray-500" />
                  <h3 className="font-medium">Популярные теги</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["маршруты", "акции", "vip", "экстрим", "клуб", "события"].map(tag => (
                    <Badge 
                      key={tag} 
                      variant="outline" 
                      className="text-xs cursor-pointer hover:bg-gray-100"
                      onClick={() => setSearchQuery(tag)}
                    >
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Results Header */}
            <div className="mb-6">
              <p className="text-gray-600">
                {searchQuery ? `Результаты поиска "${searchQuery}"` : `${selectedCategory === "all" ? "Все статьи" : categories.find(c => c.value === selectedCategory)?.label}`} 
                <span className="ml-2">({filteredArticles.length})</span>
              </p>
            </div>

            {/* Articles Feed */}
            <div className="space-y-8">
              {filteredArticles.map((article) => (
                <Card 
                  key={article.id} 
                  className="group overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onClick={() => onViewArticle?.(article.id)}
                >
                  <div className="md:flex">
                    {/* Image */}
                    <div className="md:w-80 md:flex-shrink-0 relative overflow-hidden">
                      <div className="aspect-[16/9] md:aspect-[4/3]">
                        <ImageWithFallback
                          src={article.image}
                          alt={article.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                          <Button 
                            size="sm"
                            className="bg-[#91040C] hover:bg-[#91040C]/90 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0"
                          >
                            Читать далее
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-6 md:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge className={`${getCategoryColor(article.category)} text-xs`}>
                          {categories.find(c => c.value === article.category)?.label || article.category}
                        </Badge>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {article.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {article.author}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {article.readTime}
                          </div>
                        </div>
                      </div>

                      <h2 className="text-xl md:text-2xl font-medium mb-4 group-hover:text-[#91040C] transition-colors leading-tight">
                        {article.title}
                      </h2>

                      <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                        {article.excerpt}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {article.tags.slice(0, 3).map(tag => (
                          <Badge 
                            key={tag} 
                            variant="outline" 
                            className="text-xs text-gray-500 hover:bg-gray-100 cursor-pointer"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSearchQuery(tag);
                            }}
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More */}
            {filteredArticles.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Загрузить еще статьи
                </Button>
              </div>
            )}

            {/* No Results */}
            {filteredArticles.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-12 h-12 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">Ничего не найдено</h3>
                  <p>Попробуйте изменить критерии поиска или выбрать другую категорию</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("all");
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}