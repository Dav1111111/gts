// 🛎️ GTS Concierge Service Component - VIP персональный сервис
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Textarea } from "../../ui/textarea";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Avatar, AvatarFallback } from "../../ui/avatar";
import { 
  MessageCircle,
  Phone,
  Star,
  Clock,
  CheckCircle,
  Calendar,
  MapPin,
  Car,
  Plane,
  Utensils,
  Hotel,
  Gift,
  Crown,
  Headphones
} from "lucide-react";

// Mock concierge requests
const mockRequests = [
  {
    id: "req-001",
    title: "Бронирование ресторана Michelin",
    description: "Столик на 4 персоны в ресторане The River Café на 20 декабря",
    status: "completed",
    priority: "high",
    createdAt: "2024-12-15T10:00:00Z",
    completedAt: "2024-12-15T11:30:00Z",
    assignedTo: {
      name: "Анна Смирнова",
      role: "Senior Concierge",
      avatar: "АС"
    },
    category: "dining",
    icon: Utensils
  },
  {
    id: "req-002", 
    title: "Трансфер в аэропорт",
    description: "Комфортабельный трансфер до Внуково на 22 декабря, вылет в 14:00",
    status: "in-progress",
    priority: "medium",
    createdAt: "2024-12-16T09:15:00Z",
    assignedTo: {
      name: "Дмитрий Козлов",
      role: "Concierge Specialist",
      avatar: "ДК"
    },
    category: "transport",
    icon: Car
  },
  {
    id: "req-003",
    title: "Организация корпоративного мероприятия",
    description: "Эксклюзивная вечеринка на яхте для 25 человек, новогодняя тематика",
    status: "pending",
    priority: "high",
    createdAt: "2024-12-16T14:20:00Z",
    assignedTo: {
      name: "Елена Петрова",
      role: "Event Concierge",
      avatar: "ЕП"
    },
    category: "events",
    icon: Gift
  }
];

// Mock concierge team
const conciergeTeam = [
  {
    id: "team-001",
    name: "Анна Смирнова",
    role: "Senior Concierge",
    avatar: "АС",
    rating: 4.9,
    specialties: ["Fine Dining", "Cultural Events", "VIP Services"],
    languages: ["Русский", "English", "Français"],
    experience: "8 лет",
    online: true
  },
  {
    id: "team-002",
    name: "Дмитрий Козлов", 
    role: "Transport Specialist",
    avatar: "ДК",
    rating: 4.8,
    specialties: ["Private Jets", "Luxury Cars", "Transfers"],
    languages: ["Русский", "English"],
    experience: "5 лет",
    online: true
  },
  {
    id: "team-003",
    name: "Елена Петрова",
    role: "Event Concierge",
    avatar: "ЕП", 
    rating: 4.9,
    specialties: ["Corporate Events", "Weddings", "Celebrations"],
    languages: ["Русский", "English", "Italiano"],
    experience: "6 лет",
    online: false
  }
];

interface GTSConciergeServiceComponentProps {
  user?: {
    id: string;
    name: string;
    tier: string;
  };
}

export function GTSConciergeServiceComponent({ user }: GTSConciergeServiceComponentProps) {
  const [activeTab, setActiveTab] = useState<'requests' | 'new-request' | 'team'>('requests');
  const [newRequest, setNewRequest] = useState({
    title: '',
    description: '',
    category: 'general',
    priority: 'medium'
  });

  const getStatusColor = (status: string) => {
    const colors = {
      completed: "text-green-400 bg-green-500/10",
      "in-progress": "text-blue-400 bg-blue-500/10",
      pending: "text-yellow-400 bg-yellow-500/10",
      cancelled: "text-red-400 bg-red-500/10"
    };
    return colors[status as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const getStatusText = (status: string) => {
    const texts = {
      completed: "Выполнено",
      "in-progress": "В работе",
      pending: "В ожидании",
      cancelled: "Отменено"
    };
    return texts[status as keyof typeof texts] || status;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      high: "text-red-400 bg-red-500/10",
      medium: "text-yellow-400 bg-yellow-500/10", 
      low: "text-green-400 bg-green-500/10"
    };
    return colors[priority as keyof typeof colors] || "text-gray-400 bg-gray-500/10";
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('ru-RU', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmitRequest = () => {
    console.log('Submitting request:', newRequest);
    // Here would be actual request submission logic
    setNewRequest({ title: '', description: '', category: 'general', priority: 'medium' });
    setActiveTab('requests');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white flex items-center gap-3">
            <Crown className="h-8 w-8 text-[#91040C]" />
            Консьерж-сервис VIP
          </h2>
          <p className="text-[#A6A7AA]">
            Персональная помощь 24/7 для решения любых задач
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-500/10 text-green-400">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2" />
            Online
          </Badge>
          <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
            <Phone className="h-4 w-4 mr-2" />
            Экстренная связь
          </Button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-[#121214] p-1 rounded-lg">
        <Button
          variant={activeTab === 'requests' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('requests')}
          className={activeTab === 'requests' ? 'bg-[#17181A] text-white' : 'text-[#A6A7AA] hover:text-white'}
        >
          <MessageCircle className="h-4 w-4 mr-2" />
          Мои запросы
        </Button>
        <Button
          variant={activeTab === 'new-request' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('new-request')}
          className={activeTab === 'new-request' ? 'bg-[#17181A] text-white' : 'text-[#A6A7AA] hover:text-white'}
        >
          <Gift className="h-4 w-4 mr-2" />
          Новый запрос
        </Button>
        <Button
          variant={activeTab === 'team' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('team')}
          className={activeTab === 'team' ? 'bg-[#17181A] text-white' : 'text-[#A6A7AA] hover:text-white'}
        >
          <Headphones className="h-4 w-4 mr-2" />
          Команда
        </Button>
      </div>

      {/* Requests Tab */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {mockRequests.map((request) => {
            const IconComponent = request.icon;
            return (
              <Card key={request.id} className="bg-[#121214] border-[#232428]">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-[#17181A] rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-[#91040C]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-heading text-white text-lg">{request.title}</h4>
                          <Badge className={getPriorityColor(request.priority)}>
                            {request.priority === 'high' ? 'Высокий' : 
                             request.priority === 'medium' ? 'Средний' : 'Низкий'}
                          </Badge>
                        </div>
                        <p className="text-[#A6A7AA] text-sm mb-3">{request.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-[#A6A7AA]">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {formatDate(request.createdAt)}
                          </div>
                          {request.completedAt && (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3" />
                              Выполнено {formatDate(request.completedAt)}
                            </div>
                          )}
                        </div>

                        {/* Assigned Concierge */}
                        <div className="flex items-center gap-2 mt-3 p-2 bg-[#17181A] rounded-lg">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="bg-[#232428] text-white text-xs">
                              {request.assignedTo.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm text-white">{request.assignedTo.name}</p>
                            <p className="text-xs text-[#A6A7AA]">{request.assignedTo.role}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <Badge className={getStatusColor(request.status)}>
                        {getStatusText(request.status)}
                      </Badge>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#232428] text-white hover:bg-[#17181A]"
                      >
                        Детали
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* New Request Tab */}
      {activeTab === 'new-request' && (
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white">Новый запрос консьержу</CardTitle>
            <CardDescription className="text-[#A6A7AA]">
              Опишите, с чем вам нужна помощь, и наш консьерж свяжется с вами
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-white">Заголовок запроса</Label>
              <Input
                id="title"
                value={newRequest.title}
                onChange={(e) => setNewRequest({...newRequest, title: e.target.value})}
                placeholder="Кратко опишите, что вам нужно"
                className="bg-[#17181A] border-[#232428] text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="text-white">Подробное описание</Label>
              <Textarea
                id="description"
                value={newRequest.description}
                onChange={(e) => setNewRequest({...newRequest, description: e.target.value})}
                placeholder="Расскажите подробнее о ваших пожеланиях, датах, предпочтениях..."
                className="bg-[#17181A] border-[#232428] text-white min-h-[100px]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-white">Категория</Label>
                <select
                  value={newRequest.category}
                  onChange={(e) => setNewRequest({...newRequest, category: e.target.value})}
                  className="w-full p-2 bg-[#17181A] border border-[#232428] text-white rounded-md"
                >
                  <option value="general">Общие вопросы</option>
                  <option value="dining">Рестораны и питание</option>
                  <option value="transport">Транспорт и трансферы</option>
                  <option value="accommodation">Размещение</option>
                  <option value="events">Мероприятия</option>
                  <option value="shopping">Шопинг</option>
                  <option value="entertainment">Развлечения</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label className="text-white">Приоритет</Label>
                <select
                  value={newRequest.priority}
                  onChange={(e) => setNewRequest({...newRequest, priority: e.target.value})}
                  className="w-full p-2 bg-[#17181A] border border-[#232428] text-white rounded-md"
                >
                  <option value="low">Низкий</option>
                  <option value="medium">Средний</option>
                  <option value="high">Высокий</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline"
                onClick={() => setActiveTab('requests')}
                className="border-[#232428] text-white hover:bg-[#17181A]"
              >
                Отмена
              </Button>
              <Button 
                onClick={handleSubmitRequest}
                className="bg-[#91040C] hover:bg-[#91040C]/90"
                disabled={!newRequest.title || !newRequest.description}
              >
                Отправить запрос
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {conciergeTeam.map((member) => (
            <Card key={member.id} className="bg-[#121214] border-[#232428]">
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="relative">
                    <Avatar className="h-16 w-16 mx-auto">
                      <AvatarFallback className="bg-[#232428] text-white text-lg">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full border-2 border-[#121214] ${
                      member.online ? 'bg-green-400' : 'bg-gray-400'
                    }`} />
                  </div>
                  
                  <div>
                    <h3 className="font-heading text-white text-lg">{member.name}</h3>
                    <p className="text-sm text-[#A6A7AA]">{member.role}</p>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm text-white">{member.rating}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <p className="text-xs text-[#A6A7AA] mb-1">Специализация:</p>
                      <div className="flex flex-wrap gap-1">
                        {member.specialties.map((specialty, index) => (
                          <Badge key={index} className="text-xs bg-[#17181A] text-white">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="text-xs text-[#A6A7AA]">
                      <p>Языки: {member.languages.join(', ')}</p>
                      <p>Опыт: {member.experience}</p>
                    </div>
                  </div>

                  <Button 
                    className="w-full bg-[#91040C] hover:bg-[#91040C]/90"
                    disabled={!member.online}
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    {member.online ? 'Написать' : 'Не в сети'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default GTSConciergeServiceComponent;