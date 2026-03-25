// 🏆 GTS Loyalty Program Component - Extracted from ClientClubPortalComplete
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { 
  Gift,
  Star,
  Trophy,
  Crown,
  Sparkles,
  Plus,
  Minus,
  TrendingUp
} from "lucide-react";

// Tier colors
const tierColors = {
  bronze: { bg: "#8C6239", text: "#FFFFFF", light: "#B8804D" },
  silver: { bg: "#C0C0C0", text: "#000000", light: "#D4D4D4" },
  gold: { bg: "#FFD700", text: "#000000", light: "#FFE55C" },
  platinum: { bg: "#E5E4E2", text: "#000000", light: "#F0EFED" }
};

// Mock bonus transactions
const mockBonusTransactions = [
  {
    id: "tx-001",
    type: "earned",
    amount: 712,
    description: "Бронирование яхты - Черное море",
    date: "2024-12-01",
    icon: "🛥️"
  },
  {
    id: "tx-002", 
    type: "redeemed",
    amount: -500,
    description: "Скидка на вертолетный тур",
    date: "2024-11-28",
    icon: "🚁"
  },
  {
    id: "tx-003",
    type: "bonus",
    amount: 1000,
    description: "Юбилейный бонус - 2 года членства",
    date: "2024-11-15",
    icon: "🎉"
  }
];

interface GTSLoyaltyProgramComponentProps {
  user: {
    id: string;
    name: string;
    tier: keyof typeof tierColors;
    bonusBalance: number;
    totalSpent: number;
    joinDate: string;
    nextTierProgress: number;
    privileges: string[];
  };
}

export function GTSLoyaltyProgramComponent({ user }: GTSLoyaltyProgramComponentProps) {
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemAmount, setRedeemAmount] = useState(0);

  const getTierInfo = (tier: keyof typeof tierColors) => {
    return tierColors[tier];
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

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(amount);
  };

  const getNextTier = (currentTier: keyof typeof tierColors) => {
    const tiers = ['bronze', 'silver', 'gold', 'platinum'];
    const currentIndex = tiers.indexOf(currentTier);
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] as keyof typeof tierColors : null;
  };

  const nextTier = getNextTier(user.tier);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-heading text-white">Программа лояльности</h2>
          <p className="text-[#A6A7AA]">
            Ваши бонусы, статус и привилегии в GTS Client Club
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Membership Status */}
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Crown className="h-5 w-5" style={{ color: getTierInfo(user.tier).bg }} />
              Статус членства
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div 
                className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center"
                style={{ backgroundColor: getTierInfo(user.tier).bg }}
              >
                <Crown className="h-10 w-10" style={{ color: getTierInfo(user.tier).text }} />
              </div>
              <h3 className="font-heading text-white text-lg">{getTierDisplayName(user.tier)}</h3>
              <p className="text-sm text-[#A6A7AA]">Участник с {user.joinDate}</p>
            </div>
            
            {user.tier !== "platinum" && nextTier && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white">До {getTierDisplayName(nextTier)}</span>
                  <span className="text-[#A6A7AA]">{user.nextTierProgress}%</span>
                </div>
                <Progress value={user.nextTierProgress} className="h-2" />
                <p className="text-xs text-[#A6A7AA] text-center">
                  Потратьте еще {formatCurrency(500000 - (user.totalSpent % 500000))} для перехода на следующий уровень
                </p>
              </div>
            )}
            
            <div className="space-y-2">
              <h4 className="font-medium text-white">Ваши привилегии:</h4>
              <div className="space-y-1">
                {user.privileges.map((privilege, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span className="text-white">{privilege}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Balance */}
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Gift className="h-5 w-5 text-yellow-400" />
              Бонусный баланс
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div>
              <p className="text-4xl font-heading text-white">{user.bonusBalance.toLocaleString()}</p>
              <p className="text-lg text-yellow-400">бонусных баллов</p>
            </div>
            
            <div className="p-3 bg-[#17181A] rounded-lg">
              <p className="text-sm text-[#A6A7AA]">Эквивалент в рублях:</p>
              <p className="text-lg font-heading text-green-400">
                {formatCurrency(user.bonusBalance)}
              </p>
            </div>
            
            <div className="space-y-2">
              <p className="text-sm text-[#A6A7AA]">Накопление бонусов:</p>
              <p className="text-lg text-white">
                {user.tier === 'platinum' ? '8%' : 
                 user.tier === 'gold' ? '6%' : 
                 user.tier === 'silver' ? '4%' : '2%'} от стоимости
              </p>
              <p className="text-xs text-[#A6A7AA]">{getTierDisplayName(user.tier)} уровень</p>
            </div>
            
            <div className="space-y-2">
              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => setShowRedeemModal(true)}
              >
                Использовать бонусы
              </Button>
              <Button 
                variant="outline" 
                className="w-full border-[#232428] text-white hover:bg-[#17181A]"
              >
                История операций
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Bonus Statistics */}
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-green-400" />
              Статистика бонусов
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-[#17181A] rounded-lg text-center">
                <p className="text-lg font-heading text-green-400">+2,072</p>
                <p className="text-xs text-[#A6A7AA]">За месяц</p>
              </div>
              <div className="p-3 bg-[#17181A] rounded-lg text-center">
                <p className="text-lg font-heading text-red-400">-500</p>
                <p className="text-xs text-[#A6A7AA]">Использовано</p>
              </div>
            </div>

            <Separator className="bg-[#232428]" />

            <div className="space-y-3">
              <h4 className="font-medium text-white">Способы получения бонусов:</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#A6A7AA]">Бронирования</span>
                  <span className="text-white">{user.tier === 'platinum' ? '8%' : '4%'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A6A7AA]">Рекомендации</span>
                  <span className="text-white">1000 б.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A6A7AA]">Отзывы</span>
                  <span className="text-white">100 б.</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#A6A7AA]">Дни рождения</span>
                  <span className="text-white">500 б.</span>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full border-[#232428] text-white hover:bg-[#17181A]"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Участвовать в акциях
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Последние операции</CardTitle>
          <CardDescription className="text-[#A6A7AA]">
            История операций с бонусными баллами
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockBonusTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-[#17181A] rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="text-2xl">{transaction.icon}</div>
                  <div>
                    <p className="text-sm text-white">{transaction.description}</p>
                    <p className="text-xs text-[#A6A7AA]">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-heading text-lg ${
                    transaction.amount > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} б.
                  </p>
                  <Badge className={`text-xs ${
                    transaction.type === 'earned' ? 'bg-green-500/10 text-green-400' :
                    transaction.type === 'redeemed' ? 'bg-red-500/10 text-red-400' :
                    'bg-blue-500/10 text-blue-400'
                  }`}>
                    {transaction.type === 'earned' ? 'Начислено' :
                     transaction.type === 'redeemed' ? 'Списано' : 'Бонус'}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default GTSLoyaltyProgramComponent;