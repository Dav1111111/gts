import { useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { GTSNavigationHeader } from "./GTSNavigationHeader";
import { GTSFooter } from "./GTSFooter";
import { 
  Crown, 
  Star, 
  Shield, 
  Clock, 
  MapPin, 
  Calendar, 
  Users, 
  Gift,
  CheckCircle,
  ArrowRight,
  Phone,
  Mail,
  ChevronLeft
} from "lucide-react";

interface MembershipTier {
  id: string;
  name: string;
  level: "Bronze" | "Silver" | "Gold" | "Platinum";
  price: {
    annual: number;
    monthly: number;
  };
  description: string;
  features: string[];
  exclusive: string[];
  popular?: boolean;
  gradient: string;
  icon: any;
}

const membershipTiers: MembershipTier[] = [
  {
    id: "bronze",
    name: "Bronze",
    level: "Bronze",
    price: {
      annual: 150000,
      monthly: 15000
    },
    description: "Начальный уровень для знакомства с клубом",
    features: [
      "Доступ к базовой технике",
      "Стандартные маршруты",
      "Техническая поддержка",
      "Групповые мероприятия"
    ],
    exclusive: [
      "Скидка 5% на аренду",
      "Приоритетная регистрация"
    ],
    gradient: "from-amber-100 to-amber-200",
    icon: Shield
  },
  {
    id: "silver",
    name: "Silver", 
    level: "Silver",
    price: {
      annual: 300000,
      monthly: 28000
    },
    description: "Расширенные возможности для активных участников",
    features: [
      "Доступ к премиум технике", 
      "Эксклюзивные маршруты",
      "Персональный консультант",
      "VIP зоны в клубе",
      "Приглашения на события"
    ],
    exclusive: [
      "Скидка 10% на аренду",
      "Бесплатная отмена за 24 часа",
      "Доступ к закрытым мероприятиям"
    ],
    popular: true,
    gradient: "from-slate-100 to-slate-200", 
    icon: Star
  },
  {
    id: "gold",
    name: "Gold",
    level: "Gold", 
    price: {
      annual: 500000,
      monthly: 45000
    },
    description: "Элитный уровень с максимальными привилегиями",
    features: [
      "Доступ ко всей технике",
      "Персональные маршруты",
      "Консьерж-сервис 24/7",
      "Частные мероприятия",
      "Гость клуба (2 человека)"
    ],
    exclusive: [
      "Скидка 15% на аренду",
      "Без предоплаты",
      "Эксклюзивные локации",
      "Личный инструктор"
    ],
    gradient: "from-yellow-100 to-yellow-200",
    icon: Crown
  },
  {
    id: "platinum",
    name: "Platinum",
    level: "Platinum",
    price: {
      annual: 1000000,
      monthly: 90000
    },
    description: "Высший уровень роскоши и эксклюзивности",
    features: [
      "Безлимитный доступ",
      "Индивидуальные экспедиции",
      "Персональная команда",
      "Частные события",
      "Неограниченные гости"
    ],
    exclusive: [
      "Скидка 25% на аренду",
      "Безлимитная отмена",
      "Секретные маршруты",
      "Персональный пилот/капитан",
      "Доступ к партнёрским клубам"
    ],
    gradient: "from-gray-100 to-gray-200",
    icon: Crown
  }
];

const privileges = [
  {
    icon: Clock,
    title: "Ранний доступ",
    description: "Первыми узнавайте о новых маршрутах и технике"
  },
  {
    icon: MapPin,
    title: "VIP маршруты",
    description: "Эксклюзивные локации недоступные широкой публике"
  },
  {
    icon: Calendar,
    title: "Без предоплаты",
    description: "Бронирование без предварительного внесения средств"
  },
  {
    icon: Users,
    title: "Закрытые события",
    description: "Участие в приватных мероприятиях только для членов клуба"
  },
  {
    icon: Gift,
    title: "Партнёрские скидки", 
    description: "Специальные предложения в сети партнёрских заведений"
  },
  {
    icon: Shield,
    title: "Премиум поддержка",
    description: "Приоритетная техническая поддержка 24/7"
  }
];

const testimonials = [
  {
    id: 1,
    name: "Александр Волков",
    position: "Gold Member",
    image: "https://images.unsplash.com/photo-1628608577164-8533a3dddbb3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbGVnYW50JTIwZ2VudGxlbWFuJTIwcG9ydHJhaXQlMjBsdXh1cnklMjBsaWZlc3R5bGV8ZW58MXx8fHwxNzU2MjA1MTc1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "GTS Club открыл для меня мир настоящих приключений. Качество сервиса и эксклюзивность маршрутов превосходят все ожидания.",
    memberSince: "2022"
  },
  {
    id: 2,
    name: "Екатерина Морозова",
    position: "Platinum Member", 
    image: "https://images.unsplash.com/photo-1708246116653-b8363dca77be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB3b21hbiUyMHlhY2h0JTIwZWxlZ2FudCUyMHN0eWxlfGVufDF8fHx8MTc1NjIwNTE3OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Platinum членство дает невероятную свободу. Персональный сервис и доступ к уникальным локациям делают каждое путешествие незабываемым.",
    memberSince: "2021"
  },
  {
    id: 3,
    name: "Дмитрий Соколов",
    position: "Silver Member",
    image: "https://images.unsplash.com/photo-1712227832840-e503811b49cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMGNsdWIlMjBtZW1iZXJzJTIwb2xkJTIwbW9uZXklMjBzdHlsZXxlbnwxfHx8fDE3NTYyMDUxNzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    quote: "Членство в GTS - это не просто доступ к технике, это вхождение в сообщество людей, разделяющих страсть к приключениям.",
    memberSince: "2023"
  }
];

import { Route } from "./GTSRouter";

interface GTSMembershipPageProps {
  onNavigate: (route: Route) => void;
}

export function GTSMembershipPage({ onNavigate }: GTSMembershipPageProps) {
  const [selectedTier, setSelectedTier] = useState("silver");
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">("annual");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredTier: "silver",
    message: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Application submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="min-h-screen bg-white">
      <GTSNavigationHeader onNavigate={onNavigate} />

      <div className="pt-24 pb-16 lg:py-24 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          
          {/* Intro Section */}
          <div className="text-center mb-16 lg:mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-black/5 rounded-full mb-6">
              <Crown className="w-4 h-4 mr-2 text-[#91040C]" />
              <span className="text-sm tracking-wider text-black/60 uppercase font-medium">ЭКСКЛЮЗИВНОЕ ЧЛЕНСТВО</span>
            </div>
            <h1 className="text-4xl lg:text-6xl xl:text-7xl font-light mb-6 lg:mb-8 tracking-wider text-black leading-tight">
              JOIN GTS CLUB
            </h1>
            <p className="text-xl lg:text-2xl text-[#91040C] mb-8 font-light tracking-wide">
              Your access to premium adventures
            </p>
            <p className="text-lg text-black/60 max-w-3xl mx-auto font-light leading-relaxed">
              Станьте частью эксклюзивного сообщества ценителей качественного отдыха. 
              Получите доступ к премиальной технике, уникальным маршрутам и персональному сервису.
            </p>
          </div>

          {/* Billing Toggle */}
          <div className="flex justify-center mb-12">
            <div className="bg-white rounded-lg p-1 shadow-lg border border-gray-100">
              <div className="flex">
                <button
                  onClick={() => setBillingCycle("monthly")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    billingCycle === "monthly" 
                      ? "bg-black text-white" 
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  Ежемесячно
                </button>
                <button
                  onClick={() => setBillingCycle("annual")}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors relative ${
                    billingCycle === "annual" 
                      ? "bg-black text-white" 
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  Ежегодно
                  <Badge className="absolute -top-2 -right-2 bg-[#91040C] text-white text-xs border-0">
                    -20%
                  </Badge>
                </button>
              </div>
            </div>
          </div>

          {/* Membership Tiers */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-20">
            {membershipTiers.map((tier) => (
              <Card 
                key={tier.id} 
                className={`relative border-2 transition-all duration-300 hover:shadow-xl cursor-pointer ${
                  tier.popular 
                    ? "border-[#91040C] shadow-lg scale-105" 
                    : selectedTier === tier.id 
                      ? "border-black shadow-lg" 
                      : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setSelectedTier(tier.id)}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-[#91040C] text-white border-0 px-4 py-1">
                      ПОПУЛЯРНЫЙ
                    </Badge>
                  </div>
                )}

                <div className={`h-2 bg-gradient-to-r ${tier.gradient}`}></div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`w-10 h-10 bg-gradient-to-r ${tier.gradient} rounded-full flex items-center justify-center`}>
                        <tier.icon className="w-5 h-5 text-black/70" />
                      </div>
                      <h3 className="text-xl font-medium text-black tracking-wide">{tier.name}</h3>
                    </div>
                  </div>

                  <p className="text-sm text-black/60 mb-6 leading-relaxed">{tier.description}</p>

                  <div className="mb-6">
                    <div className="text-3xl font-light text-black mb-1">
                      {(billingCycle === "annual" ? tier.price.annual : tier.price.monthly * 12).toLocaleString()}₽
                    </div>
                    <div className="text-sm text-black/60">
                      {billingCycle === "annual" ? "в год" : `${tier.price.monthly.toLocaleString()}₽/мес`}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-black/70">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {tier.exclusive.length > 0 && (
                    <div className="pt-4 border-t border-gray-100">
                      <div className="text-xs font-medium text-[#91040C] mb-2 uppercase tracking-wide">
                        Эксклюзивно
                      </div>
                      <div className="space-y-2">
                        {tier.exclusive.map((feature, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <Star className="w-3 h-3 text-[#91040C] mt-0.5 flex-shrink-0" />
                            <span className="text-xs text-black/70">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Privileges Grid */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light mb-6 tracking-wider text-black">
                ПРИВИЛЕГИИ ЧЛЕНСТВА
              </h2>
              <p className="text-lg text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
                Каждый уровень членства открывает новые возможности и привилегии
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {privileges.map((privilege, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                    <privilege.icon className="w-8 h-8 text-[#91040C]" />
                  </div>
                  <h3 className="text-lg font-medium text-black mb-3 tracking-wide">{privilege.title}</h3>
                  <p className="text-black/60 leading-relaxed">{privilege.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-light mb-6 tracking-wider text-black">
                ОТЗЫВЫ ЧЛЕНОВ КЛУБА
              </h2>
              <p className="text-lg text-black/60 max-w-2xl mx-auto font-light leading-relaxed">
                Истории наших участников об уникальном опыте в GTS Club
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.id} className="border-0 shadow-lg bg-white overflow-hidden">
                  <div className="p-6">
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full overflow-hidden">
                          <ImageWithFallback
                            src={testimonial.image}
                            alt={testimonial.name}
                            className="w-full h-full object-cover filter grayscale contrast-110"
                          />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-transparent to-black/10"></div>
                      </div>
                      <div>
                        <h4 className="font-medium text-black tracking-wide">{testimonial.name}</h4>
                        <p className="text-sm text-[#91040C]">{testimonial.position}</p>
                        <p className="text-xs text-black/60">Член клуба с {testimonial.memberSince}</p>
                      </div>
                    </div>
                    
                    <blockquote className="text-black/70 leading-relaxed italic">
                      "{testimonial.quote}"
                    </blockquote>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Application Form */}
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-xl bg-white">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Form */}
                <div className="p-8 lg:p-12">
                  <div className="mb-8">
                    <h2 className="text-2xl lg:text-3xl font-light mb-4 tracking-wider text-black">
                      ПОДАТЬ ЗАЯВКУ
                    </h2>
                    <p className="text-black/60 leading-relaxed">
                      Заполните форму, и наш консультант свяжется с вами для обсуждения условий членства
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-black">Имя</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#91040C]"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-black">Фамилия</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="mt-1 border-gray-200 focus:border-[#91040C]"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-black">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#91040C]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-black">Телефон</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#91040C]"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="preferredTier" className="text-sm font-medium text-black">Предпочтительный уровень</Label>
                      <Select value={formData.preferredTier} onValueChange={(value) => handleInputChange("preferredTier", value)}>
                        <SelectTrigger className="mt-1 border-gray-200">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {membershipTiers.map((tier) => (
                            <SelectItem key={tier.id} value={tier.id}>
                              {tier.name} - {tier.price.annual.toLocaleString()}₽/год
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-black">Сообщение (опционально)</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => handleInputChange("message", e.target.value)}
                        className="mt-1 border-gray-200 focus:border-[#91040C] min-h-[100px]"
                        placeholder="Расскажите о ваших интересах и ожиданиях..."
                      />
                    </div>

                    <Button 
                      type="submit"
                      size="lg"
                      className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white py-3"
                    >
                      ОТПРАВИТЬ ЗАЯВКУ
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </form>

                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm text-black/60 text-center mb-4">
                      Или свяжитесь с нами напрямую
                    </p>
                    <div className="flex justify-center space-x-6">
                      <a 
                        href="tel:+78625550123" 
                        className="flex items-center text-sm text-black/70 hover:text-[#91040C] transition-colors"
                      >
                        <Phone className="w-4 h-4 mr-2" />
                        +7 (862) 555-0123
                      </a>
                      <a 
                        href="mailto:membership@gts-sochi.ru" 
                        className="flex items-center text-sm text-black/70 hover:text-[#91040C] transition-colors"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        membership@gts-sochi.ru
                      </a>
                    </div>
                  </div>
                </div>

                {/* Side panel */}
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 lg:p-12 flex flex-col justify-center">
                  <div className="text-center">
                    <Crown className="w-16 h-16 text-[#91040C] mx-auto mb-6" />
                    <h3 className="text-xl font-light mb-4 tracking-wider text-black">
                      ЭКСКЛЮЗИВНОСТЬ
                    </h3>
                    <p className="text-black/60 leading-relaxed mb-6">
                      Членство в GTS Club ограничено. Мы тщательно отбираем участников, 
                      чтобы сохранить атмосферу эксклюзивности и качества.
                    </p>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-black/60">Всего мест:</span>
                        <span className="font-medium text-black">100</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-black/60">Свободно:</span>
                        <span className="font-medium text-[#91040C]">12</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-[#91040C] h-2 rounded-full" style={{ width: "88%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
      
      <GTSFooter />
    </div>
  );
}