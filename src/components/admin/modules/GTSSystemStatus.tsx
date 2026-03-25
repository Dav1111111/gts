import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Badge } from "../../ui/badge";
import { 
  CheckCircle, AlertTriangle, Clock, Users, Calendar, MessageSquare,
  Activity, TrendingUp, Star, Target, Zap, Crown
} from "lucide-react";

export function GTSSystemStatus() {
  const systemModules = [
    {
      name: 'Dashboard',
      status: 'active',
      description: 'Главная панель с KPI, alerts и задачами',
      features: ['6 KPI карточек', 'Real-time alerts', 'Tasks Dashboard', 'Role-based access']
    },
    {
      name: 'CRM & Omni Inbox',
      status: 'active',
      description: 'Управление клиентами и коммуникациями',
      features: ['Kanban воронка', 'Telegram/WhatsApp', 'AI Summary', 'Staff Analytics']
    },
    {
      name: 'Booking Calendar',
      status: 'active',
      description: 'Календарь бронирования техники',
      features: ['Week/Day view', 'Drag & Drop', 'Crew management', 'CRM integration']
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/20 text-green-400';
      case 'warning':
        return 'bg-yellow-500/20 text-yellow-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-heading text-white mb-2">
          GTS Executive Panel
        </h1>
        <p className="text-[#A6A7AA]">
          Система управления премиальным клубом активного отдыха
        </p>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-green-400" />
              Система активна
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-green-400 mb-2">
              100%
            </div>
            <p className="text-[#A6A7AA] text-sm">
              Все модули функционируют корректно
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-blue-400" />
              Активные пользователи
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-blue-400 mb-2">
              8
            </div>
            <p className="text-[#A6A7AA] text-sm">
              Executive, Manager, Accountant роли
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-purple-400" />
              Производительность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-heading text-purple-400 mb-2">
              Отлично
            </div>
            <p className="text-[#A6A7AA] text-sm">
              Быстрый отклик, стабильная работа
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modules Status */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Статус модулей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemModules.map((module, index) => (
              <div key={index} className="flex items-start gap-4 p-4 bg-[#17181A] rounded-lg">
                <div className="mt-1">
                  {getStatusIcon(module.status)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-medium text-white">{module.name}</h3>
                    <Badge className={getStatusColor(module.status)}>
                      {module.status === 'active' ? 'Активно' : 
                       module.status === 'warning' ? 'Предупреждение' : 'Ожидание'}
                    </Badge>
                  </div>
                  <p className="text-[#A6A7AA] text-sm mb-3">{module.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {module.features.map((feature, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs border-[#232428]">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-[#121214] border-[#232428] p-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-8 h-8 text-blue-400" />
            <div>
              <div className="text-lg font-heading text-white">24</div>
              <div className="text-xs text-[#A6A7AA]">Бронирований сегодня</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#121214] border-[#232428] p-4">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-green-400" />
            <div>
              <div className="text-lg font-heading text-white">156</div>
              <div className="text-xs text-[#A6A7AA]">Сообщений в Omni Inbox</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#121214] border-[#232428] p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-400" />
            <div>
              <div className="text-lg font-heading text-white">8.7</div>
              <div className="text-xs text-[#A6A7AA]">Средний NPS Score</div>
            </div>
          </div>
        </Card>

        <Card className="bg-[#121214] border-[#232428] p-4">
          <div className="flex items-center gap-3">
            <Crown className="w-8 h-8 text-purple-400" />
            <div>
              <div className="text-lg font-heading text-white">42</div>
              <div className="text-xs text-[#A6A7AA]">VIP клиентов активны</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Последняя активность</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
              <CheckCircle className="w-4 h-4 text-green-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Новое бронирование создано</p>
                <p className="text-[#A6A7AA] text-xs">Михайлов А.В. - вертолётная экскурсия на 16.01</p>
              </div>
              <span className="text-[#A6A7AA] text-xs">2 мин назад</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Новое сообщение в Telegram</p>
                <p className="text-[#A6A7AA] text-xs">Петрова С.К. интересуется арендой яхты</p>
              </div>
              <span className="text-[#A6A7AA] text-xs">5 мин назад</span>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#17181A] rounded-lg">
              <Target className="w-4 h-4 text-purple-400" />
              <div className="flex-1">
                <p className="text-white text-sm">Сделка перемещена в "Переговоры"</p>
                <p className="text-[#A6A7AA] text-xs">Корпоративное мероприятие ООО "ТехноСтрой"</p>
              </div>
              <span className="text-[#A6A7AA] text-xs">15 мин назад</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}