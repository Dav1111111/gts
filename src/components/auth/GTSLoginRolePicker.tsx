import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { useAuth } from "../../contexts/AuthContext";
import { 
  ArrowLeft, 
  Shield, 
  Users, 
  Star, 
  Briefcase, 
  Building2,
  User,
  UserCheck,
  Crown,
  Gem,
  Handshake,
  Ship,
  Building,
  Megaphone,
  Phone,
  Calendar,
  MapPin,
  Anchor,
  Plane,
  Map,
  Wrench,
  MessageCircle,
  BarChart3,
  DollarSign,
  Cog
} from "lucide-react";

type UserRole = 
  // CLIENT roles
  | 'guest' | 'user' | 'member-bronze' | 'member-silver' | 'member-gold' | 'member-platinum'
  // PARTNERS roles  
  | 'partner-agent' | 'contractor' | 'brand-partner' | 'ambassador'
  // STAFF roles
  | 'operator' | 'dispatcher' | 'site-admin' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'support'
  // MANAGEMENT roles
  | 'marketing' | 'finance' | 'executive' | 'sys-admin'
  // B2B roles
  | 'b2b-owner' | 'b2b-finance' | 'b2b-coordinator';

interface RoleCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: React.ReactNode;
  roles: RoleItem[];
}

interface RoleItem {
  id: UserRole;
  name: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  popular?: boolean;
}

interface GTSLoginRolePickerProps {
  onRoleSelect?: (role: UserRole) => void;
  onBackToHome?: () => void;
  onRoleSelected?: (role: string) => void;
}

const roleCategories: RoleCategory[] = [
  {
    id: 'client',
    name: 'CLIENT',
    description: 'Гости и члены клуба',
    color: 'from-blue-600 to-blue-700',
    icon: <Users className="w-5 h-5" />,
    roles: [
      { id: 'guest', name: 'Гость', description: 'Первое посещение', icon: User },
      { id: 'user', name: 'Пользователь', description: 'Зарегистрированный клиент', icon: UserCheck, popular: true },
      { id: 'member-bronze', name: 'Bronze Member', description: 'Начальный уровень членства', icon: Shield },
      { id: 'member-silver', name: 'Silver Member', description: 'Продвинутый член клуба', icon: Star },
      { id: 'member-gold', name: 'Gold Member', description: 'VIP член клуба', icon: Crown, popular: true },
      { id: 'member-platinum', name: 'Platinum Member', description: 'Элитный член клуба', icon: Gem }
    ]
  },
  {
    id: 'partners',
    name: 'PARTNER',
    description: 'Агенты и подрядчики',
    color: 'from-green-600 to-green-700',
    icon: <Handshake className="w-5 h-5" />,
    roles: [
      { id: 'partner-agent', name: 'Партнёр-агент', description: 'Продажи и лиды', icon: Handshake, popular: true },
      { id: 'contractor', name: 'Подрядчик', description: 'Предоставление услуг', icon: Ship },
      { id: 'brand-partner', name: 'Бренд-партнёр', description: 'Совместные промо', icon: Building },
      { id: 'ambassador', name: 'Амбассадор', description: 'Влиятельные партнёры', icon: Megaphone }
    ]
  },
  {
    id: 'staff',
    name: 'STAFF',
    description: 'Сотрудники GTS',
    color: 'from-orange-600 to-orange-700',
    icon: <Shield className="w-5 h-5" />,
    roles: [
      { id: 'operator', name: 'Оператор', description: 'Обработка заявок', icon: Phone, popular: true },
      { id: 'dispatcher', name: 'Диспетчер', description: 'Управление операциями', icon: Calendar },
      { id: 'site-admin', name: 'Админ площадки', description: 'Управление локацией', icon: MapPin },
      { id: 'captain', name: 'Капитан/Инструктор', description: 'Проведение активностей', icon: Anchor },
      { id: 'pilot', name: 'Пилот/Шеф-пилот', description: 'Авиационные услуги', icon: Plane },
      { id: 'guide', name: 'Гид/Водитель', description: 'Сопровождение групп', icon: Map },
      { id: 'mechanic', name: 'Техник/Механик', description: 'Обслуживание техники', icon: Wrench },
      { id: 'support', name: 'Саппорт', description: 'Клиентский сервис', icon: MessageCircle }
    ]
  },
  {
    id: 'management',
    name: 'MANAGEMENT',
    description: 'Руководящий состав',
    color: 'from-purple-600 to-purple-700',
    icon: <Briefcase className="w-5 h-5" />,
    roles: [
      { id: 'marketing', name: 'Маркетолог', description: 'Продвижение и реклама', icon: BarChart3 },
      { id: 'finance', name: 'Финансист', description: 'Финансовое планирование', icon: DollarSign },
      { id: 'executive', name: 'Executive', description: 'Исполнительное управление', icon: Briefcase, popular: true },
      { id: 'sys-admin', name: 'Системный админ', description: 'IT инфраструктура', icon: Cog }
    ]
  },
  {
    id: 'b2b',
    name: 'B2B',
    description: 'Корпоративные клиенты',
    color: 'from-gray-600 to-gray-700',
    icon: <Building2 className="w-5 h-5" />,
    roles: [
      { id: 'b2b-owner', name: 'B2B Owner', description: 'Руководитель компании', icon: Building2, popular: true },
      { id: 'b2b-finance', name: 'B2B Finance', description: 'Финансовый менеджер', icon: DollarSign },
      { id: 'b2b-coordinator', name: 'Event Coordinator', description: 'Организация мероприятий', icon: Calendar }
    ]
  }
];

export function GTSLoginRolePicker({ onRoleSelect, onBackToHome, onRoleSelected }: GTSLoginRolePickerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('client');
  const { createDemoSession } = useAuth();

  const handleRoleClick = (role: UserRole) => {
    const roleName = roleCategories.flatMap(c => c.roles).find(r => r.id === role)?.name;
    console.log(`Выбрана роль: ${role} (${roleName})`);
    
    // Create demo session for the selected role
    createDemoSession(role);
    
    // Navigate to appropriate shell based on role
    if (onRoleSelected) {
      onRoleSelected(role);
      return;
    }
    
    // Заглушка - показываем уведомление о выборе роли
    alert(`✅ Добро пожаловать в GTS!\n\nВыбрана роль: ${roleName}\n\nВ реальной системе здесь будет переход к соответствующему порталу.`);
    
    if (onRoleSelect) {
      onRoleSelect(role);
    }
  };



  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white">
      {/* Header */}
      <div className="border-b border-[#232428] bg-[#0B0B0C]">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBackToHome && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackToHome}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              
              <div>
                <h1 className="text-2xl lg:text-3xl font-light text-white tracking-wide" 
                    style={{ fontFamily: 'var(--font-heading)' }}>
                  Вход в систему GTS
                </h1>
                <p className="text-white/60 text-sm lg:text-base font-light">
                  Выберите вашу роль для доступа к соответствующей панели
                </p>
              </div>
            </div>

            <div className="text-right hidden md:block">
              <div className="text-white text-sm font-medium">Grand Tour Sochi</div>
              <div className="text-white/60 text-xs">Премиальный активный отдых</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4 lg:p-6">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Tabs Navigation */}
          <TabsList className="grid w-full grid-cols-5 bg-[#121214] border border-[#232428] mb-6 lg:mb-8">
            {roleCategories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="text-white/60 data-[state=active]:text-white data-[state=active]:bg-[#91040C] font-medium text-xs lg:text-sm tracking-wide"
              >
                <div className="flex items-center gap-2">
                  {category.icon}
                  <span className="hidden sm:inline">{category.name}</span>
                  <span className="sm:hidden">{category.name.split('').slice(0, 3).join('')}</span>
                </div>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Tabs Content */}
          {roleCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card className="bg-[#121214] border-[#232428]">
                <div className="p-4 lg:p-6">
                  {/* Category Header */}
                  <div className="flex items-center justify-between mb-6 lg:mb-8">
                    <div>
                      <h2 className="text-xl lg:text-2xl font-light text-white tracking-wide mb-2"
                          style={{ fontFamily: 'var(--font-heading)' }}>
                        {category.name}
                      </h2>
                      <p className="text-white/60">{category.description}</p>
                    </div>
                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl bg-[#91040C] flex items-center justify-center">
                      <div className="scale-125 lg:scale-150">
                        {category.icon}
                      </div>
                    </div>
                  </div>

                  {/* Roles Grid - Mobile: 2x2, Desktop: responsive */}
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
                    {category.roles.map((role) => {
                      const IconComponent = role.icon;
                      return (
                        <Card
                          key={role.id}
                          className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1E1F21] hover:border-[#91040C]/30 transition-all duration-200 group p-4 lg:p-5"
                          onClick={() => handleRoleClick(role.id)}
                        >
                          <div className="flex flex-col h-full">
                            {/* Icon and Badge */}
                            <div className="flex items-start justify-between mb-3 lg:mb-4">
                              <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg bg-[#91040C]/10 border border-[#91040C]/20 flex items-center justify-center text-white group-hover:bg-[#91040C]/20 transition-colors">
                                <IconComponent className="w-4 h-4 lg:w-5 lg:h-5" />
                              </div>
                              {role.popular && (
                                <Badge className="bg-[#91040C] text-white border-0 text-xs">
                                  TOP
                                </Badge>
                              )}
                            </div>

                            {/* Title */}
                            <h3 className="text-white font-medium mb-2 text-sm lg:text-base group-hover:text-[#91040C] transition-colors line-clamp-1">
                              {role.name}
                            </h3>
                            
                            {/* Description */}
                            <p className="text-white/60 text-xs lg:text-sm mb-4 flex-1 line-clamp-2">
                              {role.description}
                            </p>

                            {/* CTA Button */}
                            <Button
                              size="sm"
                              className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white border-0 text-xs lg:text-sm font-medium opacity-90 group-hover:opacity-100 transition-opacity"
                            >
                              Войти как {role.name}
                            </Button>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Footer */}
      <div className="border-t border-[#232428] bg-[#121214] p-4 mt-8">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-white/60 text-sm">
            Нужна помощь? Обратитесь в службу поддержки: 
            <span className="text-[#91040C] ml-1 font-medium">+7 (862) 555-0123</span>
          </p>
        </div>
      </div>
    </div>
  );
}