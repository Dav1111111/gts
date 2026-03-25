import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { Switch } from "../../ui/switch";
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter,
  User,
  Gift,
  Calendar,
  DollarSign,
  Star,
  Trophy,
  CreditCard,
  QrCode,
  Eye,
  Edit,
  Trash2,
  Award,
  Crown,
  TrendingUp,
  Users,
  Zap,
  Settings,
  MoreVertical,
  History,
  Target,
  Percent,
  ChevronRight
} from "lucide-react";

interface GTSClientClubLoyaltyProps {
  onBack: () => void;
}

// Tier colors
const tierColors = {
  bronze: { bg: "#8C6239", text: "#FFFFFF", light: "#B8804D" },
  silver: { bg: "#C0C0C0", text: "#000000", light: "#D4D4D4" },
  gold: { bg: "#FFD700", text: "#000000", light: "#FFE55C" },
  platinum: { bg: "#E5E4E2", text: "#000000", light: "#F0EFED" }
};

// Mock data
const mockMembers = [
  {
    id: "member-001",
    name: "Александр Петров",
    email: "a.petrov@techcorp.ru",
    phone: "+7 905 123-45-67",
    tier: "platinum" as keyof typeof tierColors,
    bonusBalance: 15420,
    totalSpent: 2850000,
    joinDate: "2022-03-15",
    lastBooking: "2024-12-01",
    avatar: "AP",
    status: "active",
    lifetimeBookings: 47,
    membershipId: "GTS-PLT-001",
    nextTierProgress: 100,
    privileges: ["Priority Support", "Free Upgrades", "Exclusive Events", "Concierge Service"]
  },
  {
    id: "member-002", 
    name: "Мария Козлова",
    email: "m.kozlova@events.ru",
    phone: "+7 903 987-65-43",
    tier: "gold" as keyof typeof tierColors,
    bonusBalance: 8750,
    totalSpent: 1250000,
    joinDate: "2022-07-20",
    lastBooking: "2024-11-28",
    avatar: "МК",
    status: "active",
    lifetimeBookings: 23,
    membershipId: "GTS-GLD-047",
    nextTierProgress: 68,
    privileges: ["Priority Support", "Free Upgrades", "Exclusive Events"]
  },
  {
    id: "member-003",
    name: "Дмитрий Соколов", 
    email: "d.sokolov@invest.ru",
    phone: "+7 902 555-44-33",
    tier: "silver" as keyof typeof tierColors,
    bonusBalance: 3240,
    totalSpent: 650000,
    joinDate: "2023-01-10",
    lastBooking: "2024-11-25",
    avatar: "ДС",
    status: "active",
    lifetimeBookings: 12,
    membershipId: "GTS-SLV-128",
    nextTierProgress: 45,
    privileges: ["Priority Support", "Free Upgrades"]
  },
  {
    id: "member-004",
    name: "Елена Романова",
    email: "e.romanova@corp.ru", 
    phone: "+7 905 777-88-99",
    tier: "bronze" as keyof typeof tierColors,
    bonusBalance: 1580,
    totalSpent: 185000,
    joinDate: "2023-09-05",
    lastBooking: "2024-11-20",
    avatar: "ЕР",
    status: "active",
    lifetimeBookings: 5,
    membershipId: "GTS-BRZ-256",
    nextTierProgress: 23,
    privileges: ["Priority Support"]
  }
];

const mockLoyaltyRules = [
  {
    id: "rule-001",
    tier: "bronze",
    name: "Бронзовый уровень",
    minSpend: 0,
    bonusRate: 2,
    description: "Базовый уровень лояльности",
    benefits: ["Приоритетная поддержка", "Накопление бонусов 2%"],
    icon: Award
  },
  {
    id: "rule-002", 
    tier: "silver",
    name: "Серебряный уровень",
    minSpend: 500000,
    bonusRate: 3,
    description: "Повышенные привилегии для постоянных клиентов",
    benefits: ["Приоритетная поддержка", "Накопление бонусов 3%", "Бесплатные апгрейды"],
    icon: Star
  },
  {
    id: "rule-003",
    tier: "gold", 
    name: "Золотой уровень",
    minSpend: 1500000,
    bonusRate: 5,
    description: "Премиальные преимущества для VIP-клиентов",
    benefits: ["Приоритетная поддержка", "Накопление бонусов 5%", "Бесплатные апгрейды", "Эксклюзивные мероприятия"],
    icon: Trophy
  },
  {
    id: "rule-004",
    tier: "platinum",
    name: "Платиновый уровень", 
    minSpend: 2500000,
    bonusRate: 8,
    description: "Максимальный уровень привилегий",
    benefits: ["Приоритетная поддержка", "Накопление бонусов 8%", "Бесплатные апгрейды", "Эксклюзивные мероприятия", "Персональный консьерж"],
    icon: Crown
  }
];

const mockTransactions = [
  {
    id: "tx-001",
    memberId: "member-001",
    type: "earned",
    amount: 450,
    description: "Бронирование яхты - Черное море",
    date: "2024-12-01",
    bookingId: "BK-2024-1547"
  },
  {
    id: "tx-002",
    memberId: "member-001", 
    type: "redeemed",
    amount: -200,
    description: "Скидка на вертолетный тур",
    date: "2024-11-28",
    bookingId: "BK-2024-1523"
  },
  {
    id: "tx-003",
    memberId: "member-001",
    type: "bonus",
    amount: 1000,
    description: "Юбилейный бонус - 2 года членства",
    date: "2024-11-15",
    bookingId: null
  }
];

export function GTSClientClubLoyalty({ onBack }: GTSClientClubLoyaltyProps) {
  const [activeTab, setActiveTab] = useState("members");
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [showMembershipCard, setShowMembershipCard] = useState(false);
  const [showBonusDialog, setShowBonusDialog] = useState(false);

  const getTierInfo = (tier: keyof typeof tierColors) => {
    const colors = tierColors[tier];
    const rule = mockLoyaltyRules.find(r => r.tier === tier);
    return { colors, rule };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getTierDisplayName = (tier: keyof typeof tierColors) => {
    const names = {
      bronze: "Бронза",
      silver: "Серебро", 
      gold: "Золото",
      platinum: "Платина"
    };
    return names[tier];
  };

  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "all" || member.tier === tierFilter;
    return matchesSearch && matchesTier;
  });

  const selectedMemberData = selectedMember ? mockMembers.find(m => m.id === selectedMember) : null;

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className="border-b bg-[#121214] border-[#232428]">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={onBack} className="text-white hover:bg-[#17181A]">
              <ArrowLeft className="h-4 w-4 mr-2" />
              В портал
            </Button>
            <div>
              <h1 className="text-2xl font-heading text-white">
                ClientClub - Программа лояльности
              </h1>
              <p className="text-sm text-[#A6A7AA]">
                Управление членством, бонусами и привилегиями клиентов
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Новый участник
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Всего участников</p>
                  <p className="text-2xl font-heading text-white">1,247</p>
                  <p className="text-xs text-green-400">+12% за месяц</p>
                </div>
                <Users className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Активные бонусы</p>
                  <p className="text-2xl font-heading text-white">₽2.8M</p>
                  <p className="text-xs text-yellow-400">В обращении</p>
                </div>
                <Gift className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Платиновых клиентов</p>
                  <p className="text-2xl font-heading text-white">47</p>
                  <p className="text-xs" style={{ color: tierColors.platinum.bg }}>VIP сегмент</p>
                </div>
                <Crown className="h-8 w-8" style={{ color: tierColors.platinum.bg }} />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-[#121214] border-[#232428]">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#A6A7AA]">Средний LTV</p>
                  <p className="text-2xl font-heading text-white">₽485K</p>
                  <p className="text-xs text-green-400">+8% к прошлому году</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 bg-[#121214] border-[#232428]">
            <TabsTrigger value="members" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Участники
            </TabsTrigger>
            <TabsTrigger value="loyalty" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Программа лояльности
            </TabsTrigger>
            <TabsTrigger value="transactions" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Транзакции
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-[#17181A] data-[state=active]:text-white">
              Аналитика
            </TabsTrigger>
          </TabsList>

          {/* Members Tab */}
          <TabsContent value="members" className="mt-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <Card className="bg-[#121214] border-[#232428]">
                  <CardHeader className="pb-4">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <CardTitle className="text-white">Список участников</CardTitle>
                      <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#A6A7AA]" />
                          <Input 
                            placeholder="Поиск участников..." 
                            className="pl-10 bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] w-full sm:w-64"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                          />
                        </div>
                        <Select value={tierFilter} onValueChange={setTierFilter}>
                          <SelectTrigger className="w-[140px] bg-[#17181A] border-[#232428] text-white">
                            <SelectValue placeholder="Уровень" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#17181A] border-[#232428]">
                            <SelectItem value="all">Все уровни</SelectItem>
                            <SelectItem value="bronze">Бронза</SelectItem>
                            <SelectItem value="silver">Серебро</SelectItem>
                            <SelectItem value="gold">Золото</SelectItem>
                            <SelectItem value="platinum">Платина</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {filteredMembers.map(member => {
                        const { colors } = getTierInfo(member.tier);
                        return (
                          <Card 
                            key={member.id}
                            className="bg-[#17181A] border-[#232428] cursor-pointer hover:bg-[#1A1B1D] transition-colors"
                            onClick={() => setSelectedMember(member.id)}
                          >
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4">
                                  <Avatar className="h-12 w-12">
                                    <AvatarFallback className="bg-[#232428] text-white">
                                      {member.avatar}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div>
                                    <h4 className="font-heading text-white">{member.name}</h4>
                                    <p className="text-sm text-[#A6A7AA]">{member.email}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <Badge 
                                        className="text-xs"
                                        style={{ 
                                          backgroundColor: colors.bg, 
                                          color: colors.text 
                                        }}
                                      >
                                        {getTierDisplayName(member.tier)}
                                      </Badge>
                                      <span className="text-xs text-[#A6A7AA]">ID: {member.membershipId}</span>
                                    </div>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-lg font-heading text-white">{member.bonusBalance.toLocaleString()} б.</p>
                                  <p className="text-xs text-[#A6A7AA]">Бонусный баланс</p>
                                  <p className="text-xs text-[#A6A7AA]">Посл. бронирование: {member.lastBooking}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Member Detail Panel */}
              {selectedMemberData && (
                <div className="lg:w-80">
                  <Card className="bg-[#121214] border-[#232428]">
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white">Профиль участника</CardTitle>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => setSelectedMember(null)}
                          className="text-[#A6A7AA] hover:text-white"
                        >
                          ×
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Member Info */}
                      <div className="text-center">
                        <Avatar className="h-16 w-16 mx-auto mb-3">
                          <AvatarFallback className="bg-[#232428] text-white text-lg">
                            {selectedMemberData.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <h3 className="font-heading text-white">{selectedMemberData.name}</h3>
                        <p className="text-sm text-[#A6A7AA]">{selectedMemberData.membershipId}</p>
                        <Badge 
                          className="mt-2"
                          style={{ 
                            backgroundColor: getTierInfo(selectedMemberData.tier).colors.bg, 
                            color: getTierInfo(selectedMemberData.tier).colors.text 
                          }}
                        >
                          {getTierDisplayName(selectedMemberData.tier)} • {selectedMemberData.bonusBalance.toLocaleString()} б.
                        </Badge>
                      </div>

                      <Separator className="bg-[#232428]" />

                      {/* Membership Stats */}
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <p className="text-lg font-heading text-white">{selectedMemberData.lifetimeBookings}</p>
                          <p className="text-xs text-[#A6A7AA]">Всего бронирований</p>
                        </div>
                        <div className="text-center">
                          <p className="text-lg font-heading text-green-400">{formatCurrency(selectedMemberData.totalSpent)}</p>
                          <p className="text-xs text-[#A6A7AA]">Общая сумма</p>
                        </div>
                      </div>

                      {/* Next Tier Progress */}
                      {selectedMemberData.tier !== "platinum" && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-white">До следующего уровня</span>
                            <span className="text-[#A6A7AA]">{selectedMemberData.nextTierProgress}%</span>
                          </div>
                          <Progress value={selectedMemberData.nextTierProgress} className="h-2" />
                        </div>
                      )}

                      <Separator className="bg-[#232428]" />

                      {/* Quick Actions */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Действия</h4>
                        <div className="grid grid-cols-2 gap-2">
                          <Button 
                            size="sm" 
                            className="bg-blue-500 hover:bg-blue-600"
                            onClick={() => setShowMembershipCard(true)}
                          >
                            <CreditCard className="h-4 w-4 mr-1" />
                            Карта
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-[#232428] text-white hover:bg-[#17181A]"
                            onClick={() => setShowBonusDialog(true)}
                          >
                            <Gift className="h-4 w-4 mr-1" />
                            Бонусы
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <History className="h-4 w-4 mr-1" />
                            История
                          </Button>
                          <Button size="sm" variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                            <Edit className="h-4 w-4 mr-1" />
                            Изменить
                          </Button>
                        </div>
                      </div>

                      {/* Privileges */}
                      <div className="space-y-2">
                        <h4 className="font-medium text-white">Привилегии</h4>
                        <div className="space-y-1">
                          {selectedMemberData.privileges.map((privilege, index) => (
                            <div key={index} className="flex items-center gap-2 text-sm">
                              <Star className="h-3 w-3 text-yellow-400" />
                              <span className="text-white">{privilege}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </TabsContent>

          {/* Loyalty Program Tab */}
          <TabsContent value="loyalty" className="mt-6">
            <div className="space-y-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Уровни программы лояльности</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Настройка условий получения уровней и привилегий
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {mockLoyaltyRules.map((rule) => {
                      const { colors } = getTierInfo(rule.tier as keyof typeof tierColors);
                      const Icon = rule.icon;
                      return (
                        <Card 
                          key={rule.id} 
                          className="bg-[#17181A] border-[#232428] relative overflow-hidden"
                        >
                          {/* Tier Color Header */}
                          <div 
                            className="h-2 w-full"
                            style={{ backgroundColor: colors.bg }}
                          />
                          <CardContent className="p-6">
                            <div className="flex items-center gap-2 mb-4">
                              <Icon className="h-6 w-6" style={{ color: colors.bg }} />
                              <h3 className="font-heading text-white">{rule.name}</h3>
                            </div>
                            
                            <div className="space-y-3">
                              <div>
                                <p className="text-xs text-[#A6A7AA]">Минимальная сумма</p>
                                <p className="text-lg font-heading text-white">
                                  {rule.minSpend === 0 ? "Без ограничений" : formatCurrency(rule.minSpend)}
                                </p>
                              </div>
                              
                              <div>
                                <p className="text-xs text-[#A6A7AA]">Накопление бонусов</p>
                                <p className="text-lg font-heading" style={{ color: colors.bg }}>
                                  {rule.bonusRate}%
                                </p>
                              </div>
                              
                              <Separator className="bg-[#232428]" />
                              
                              <div className="space-y-2">
                                <p className="text-xs text-[#A6A7AA]">Привилегии:</p>
                                <div className="space-y-1">
                                  {rule.benefits.map((benefit, index) => (
                                    <div key={index} className="flex items-center gap-1">
                                      <div 
                                        className="w-1 h-1 rounded-full"
                                        style={{ backgroundColor: colors.bg }}
                                      />
                                      <span className="text-xs text-white">{benefit}</span>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                            
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="w-full mt-4 border-[#232428] text-white hover:bg-[#232428]"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Настроить
                            </Button>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Bonus Management */}
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Управление бонусами</CardTitle>
                  <CardDescription className="text-[#A6A7AA]">
                    Настройка начисления и списания бонусных баллов
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Начисление бонусов</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">За бронирование</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-400">2-8%</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">Реферальная программа</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-400">1000 б.</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">День рождения</span>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-green-400">500 б.</span>
                            <Switch defaultChecked />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Использование бонусов</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">Максимум за раз</span>
                          <span className="text-sm text-white">50%</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">Курс обмена</span>
                          <span className="text-sm text-white">1 б. = ₽1</span>
                        </div>
                        <div className="flex items-center justify-between p-3 bg-[#17181A] rounded-lg">
                          <span className="text-sm text-white">Срок действия</span>
                          <span className="text-sm text-white">24 мес.</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium text-white">Специальные акции</h4>
                      <div className="space-y-3">
                        <div className="p-3 bg-[#17181A] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white">Двойные бонусы</span>
                            <Switch />
                          </div>
                          <p className="text-xs text-[#A6A7AA]">Выходные дни</p>
                        </div>
                        <div className="p-3 bg-[#17181A] rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-white">Happy Hour</span>
                            <Switch />
                          </div>
                          <p className="text-xs text-[#A6A7AA]">18:00 - 20:00</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="mt-6">
            <Card className="bg-[#121214] border-[#232428]">
              <CardHeader>
                <CardTitle className="text-white">История бонусных операций</CardTitle>
                <CardDescription className="text-[#A6A7AA]">
                  Полный журнал начислений и списаний бонусов
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTransactions.map((transaction) => (
                    <Card key={transaction.id} className="bg-[#17181A] border-[#232428]">
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div 
                              className={`w-2 h-2 rounded-full ${
                                transaction.type === 'earned' ? 'bg-green-400' :
                                transaction.type === 'redeemed' ? 'bg-red-400' : 'bg-blue-400'
                              }`}
                            />
                            <div>
                              <p className="text-sm text-white">{transaction.description}</p>
                              <div className="flex items-center gap-2 text-xs text-[#A6A7AA]">
                                <span>{transaction.date}</span>
                                {transaction.bookingId && (
                                  <>
                                    <span>•</span>
                                    <span>ID: {transaction.bookingId}</span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className={`font-heading ${
                              transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                            }`}>
                              {transaction.amount > 0 ? '+' : ''}{transaction.amount} б.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Распределение по уровням</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(tierColors).map(([tier, colors]) => {
                      const count = mockMembers.filter(m => m.tier === tier).length;
                      const percentage = (count / mockMembers.length) * 100;
                      return (
                        <div key={tier} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-white">{getTierDisplayName(tier as keyof typeof tierColors)}</span>
                            <span className="text-sm text-[#A6A7AA]">{count} ({percentage.toFixed(1)}%)</span>
                          </div>
                          <div className="h-2 bg-[#232428] rounded-full overflow-hidden">
                            <div 
                              className="h-full rounded-full transition-all duration-500"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: colors.bg
                              }}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-[#121214] border-[#232428]">
                <CardHeader>
                  <CardTitle className="text-white">Активность программы</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-[#17181A] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white">Начислено за месяц</span>
                        <span className="text-lg font-heading text-green-400">+47,250 б.</span>
                      </div>
                      <p className="text-xs text-[#A6A7AA]">+12% к прошлому месяцу</p>
                    </div>
                    <div className="p-4 bg-[#17181A] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white">Использовано за месяц</span>
                        <span className="text-lg font-heading text-red-400">-23,180 б.</span>
                      </div>
                      <p className="text-xs text-[#A6A7AA]">49% от начисленных</p>
                    </div>
                    <div className="p-4 bg-[#17181A] rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-white">Средний баланс</span>
                        <span className="text-lg font-heading text-white">7,125 б.</span>
                      </div>
                      <p className="text-xs text-[#A6A7AA]">На одного участника</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Membership Card Modal */}
      {showMembershipCard && selectedMemberData && (
        <Dialog open={showMembershipCard} onOpenChange={setShowMembershipCard}>
          <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-md">
            <DialogHeader>
              <DialogTitle className="text-white">Членская карта</DialogTitle>
              <DialogDescription className="text-[#A6A7AA]">
                Виртуальная карта участника программы лояльности
              </DialogDescription>
            </DialogHeader>
            
            {/* Virtual Membership Card */}
            <div className="relative mx-auto w-80 h-48 rounded-xl overflow-hidden shadow-2xl">
              {/* Card Background */}
              <div 
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(135deg, ${getTierInfo(selectedMemberData.tier).colors.bg} 0%, ${getTierInfo(selectedMemberData.tier).colors.light} 100%)`
                }}
              />
              
              {/* Card Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-4 right-4 w-16 h-16 border border-white/20 rounded-full" />
                <div className="absolute top-8 right-8 w-8 h-8 border border-white/20 rounded-full" />
              </div>
              
              {/* Card Content */}
              <div className="relative h-full p-6 flex flex-col justify-between text-black">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-heading text-lg">GTS ClientClub</h3>
                    <Crown className="h-6 w-6" />
                  </div>
                  <p className="text-sm opacity-80">{getTierDisplayName(selectedMemberData.tier)} Member</p>
                </div>
                
                <div>
                  <p className="text-sm opacity-80">ID: {selectedMemberData.membershipId}</p>
                  <p className="font-heading text-lg">{selectedMemberData.name}</p>
                </div>
                
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs opacity-80">Баланс бонусов</p>
                    <p className="font-heading text-lg">{selectedMemberData.bonusBalance.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-black/20 rounded flex items-center justify-center">
                    <QrCode className="h-8 w-8" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2 mt-4">
              <Button className="flex-1 bg-blue-500 hover:bg-blue-600">
                <Eye className="h-4 w-4 mr-2" />
                Показать QR
              </Button>
              <Button variant="outline" className="border-[#232428] text-white hover:bg-[#17181A]">
                Скачать
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Bonus Management Dialog */}
      {showBonusDialog && selectedMemberData && (
        <Dialog open={showBonusDialog} onOpenChange={setShowBonusDialog}>
          <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white">
            <DialogHeader>
              <DialogTitle className="text-white">Управление бонусами</DialogTitle>
              <DialogDescription className="text-[#A6A7AA]">
                Начисление или списание бонусных баллов для {selectedMemberData.name}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-white">Тип операции</Label>
                  <Select>
                    <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                      <SelectValue placeholder="Выберите операцию" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#17181A] border-[#232428]">
                      <SelectItem value="earn">Начислить</SelectItem>
                      <SelectItem value="redeem">Списать</SelectItem>
                      <SelectItem value="adjust">Корректировка</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label className="text-white">Количество баллов</Label>
                  <Input 
                    type="number"
                    placeholder="0"
                    className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-white">Причина</Label>
                <Textarea 
                  placeholder="Укажите причину операции..."
                  className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                />
              </div>
              
              <div className="p-3 bg-[#17181A] rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-[#A6A7AA]">Текущий баланс:</span>
                  <span className="text-white">{selectedMemberData.bonusBalance.toLocaleString()} б.</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowBonusDialog(false)}
                className="border-[#232428] text-white hover:bg-[#17181A]"
              >
                Отмена
              </Button>
              <Button className="bg-[#91040C] hover:bg-[#91040C]/90">
                Применить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}