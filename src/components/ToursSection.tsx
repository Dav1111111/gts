import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Clock, Users, MapPin } from "lucide-react";

const tours = [
  {
    id: 1,
    title: "Классическое сафари",
    description: "Идеальный выбор для новичков. Прокатитесь по живописным дюнам и насладитесь захватывающими видами пустыни.",
    duration: "3 часа",
    participants: "До 6 человек",
    location: "Песчаные дюны",
    price: "от 3,500₽",
    image: "https://images.unsplash.com/photo-1734293046563-2e51b2cc10be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmYlMjByb2FkJTIwdmVoaWNsZSUyMHNhbmQlMjBkdW5lc3xlbnwxfHx8fDE3NTYxMzUyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Популярный"
  },
  {
    id: 2,
    title: "Экстремальная экспедиция",
    description: "Для опытных искателей приключений! Крутые склоны, быстрые спуски и максимум адреналина.",
    duration: "5 часов",
    participants: "До 4 человек",
    location: "Горные склоны",
    price: "от 5,500₽",
    image: "https://images.unsplash.com/photo-1523653049681-701d71cf57c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZXNlcnQlMjBleHBlZGl0aW9uJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc1NjEzNTIyOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Экстрим"
  },
  {
    id: 3,
    title: "Семейное приключение",
    description: "Безопасный и увлекательный тур для всей семьи. Подходит для детей от 8 лет в сопровождении взрослых.",
    duration: "2.5 часа",
    participants: "До 8 человек",
    location: "Безопасные трассы",
    price: "от 2,800₽",
    image: "https://images.unsplash.com/photo-1754400442751-c8539fc17e82?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWdneSUyMGRlc2VydCUyMGFkdmVudHVyZXxlbnwxfHx8fDE3NTYxMzUyMjh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    badge: "Семейный"
  }
];

export function ToursSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl mb-6">Наши туры</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Выберите приключение по душе — от спокойных семейных поездок до экстремальных экспедиций
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.map((tour) => (
            <Card key={tour.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <ImageWithFallback
                  src={tour.image}
                  alt={tour.title}
                  className="w-full h-64 object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-500 text-black hover:bg-yellow-600">
                  {tour.badge}
                </Badge>
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{tour.title}</CardTitle>
                <p className="text-gray-600">{tour.description}</p>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="w-4 h-4 mr-2" />
                    <span>{tour.participants}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>{tour.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="text-2xl text-primary">{tour.price}</div>
                  <Button className="bg-yellow-500 hover:bg-yellow-600 text-black">
                    Забронировать
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}