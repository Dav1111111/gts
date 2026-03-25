import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Badge } from "../../ui/badge";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../../ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import { Progress } from "../../ui/progress";
import { Separator } from "../../ui/separator";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../../ui/alert-dialog";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  User, 
  Building2, 
  Target, 
  Zap,
  Settings,
  PlayCircle,
  PauseCircle,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Activity,
  BarChart3
} from "lucide-react";

// New Lead Form Component
export function NewLeadForm({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void; }) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    source: "",
    utm: "",
    value: "",
    notes: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      name: "",
      company: "",
      email: "",
      phone: "",
      source: "",
      utm: "",
      value: "",
      notes: ""
    });
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Новый лид</DialogTitle>
          <DialogDescription className="text-[#A6A7AA]">
            Добавьте нового потенциального клиента в систему
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Имя контакта *</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Александр Петров"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Компания</Label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                placeholder="TechCorp LLC"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Email *</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="contact@techcorp.ru"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Телефон</Label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                placeholder="+7 905 123-45-67"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Источник</Label>
              <Select value={formData.source} onValueChange={(value) => setFormData({...formData, source: value})}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите источник" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="referral">Referral</SelectItem>
                  <SelectItem value="social">Social Media</SelectItem>
                  <SelectItem value="advertising">Реклама</SelectItem>
                  <SelectItem value="event">Мероприятие</SelectItem>
                  <SelectItem value="cold-call">Холодный звонок</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Потенциальная ценность (₽)</Label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="350000"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">UTM параметры</Label>
            <Input
              value={formData.utm}
              onChange={(e) => setFormData({...formData, utm: e.target.value})}
              placeholder="utm_campaign=premium&utm_source=google"
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
            />
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Заметки</Label>
            <Textarea
              value={formData.notes}
              onChange={(e) => setFormData({...formData, notes: e.target.value})}
              placeholder="Дополнительная информация о лиде..."
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-[#232428] text-white hover:bg-[#17181A]">
              Отмена
            </Button>
            <Button type="submit" className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Создать лид
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// New Deal Form Component
export function NewDealForm({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void; }) {
  const [formData, setFormData] = useState({
    title: "",
    client: "",
    contact: "",
    value: "",
    stage: "new",
    probability: "20",
    closeDate: "",
    owner: "",
    source: "",
    description: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Новая сделка</DialogTitle>
          <DialogDescription className="text-[#A6A7AA]">
            Создайте новую сделку в воронке продаж
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Название сделки *</Label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                placeholder="Корпоративный яхт-пакет"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Клиент *</Label>
              <Input
                value={formData.client}
                onChange={(e) => setFormData({...formData, client: e.target.value})}
                placeholder="TechCorp LLC"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Контактное лицо</Label>
              <Input
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
                placeholder="Александр Петров"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Сумма сделки (₽) *</Label>
              <Input
                type="number"
                value={formData.value}
                onChange={(e) => setFormData({...formData, value: e.target.value})}
                placeholder="450000"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Стадия</Label>
              <Select value={formData.stage} onValueChange={(value) => setFormData({...formData, stage: value})}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="new">Новая</SelectItem>
                  <SelectItem value="qualified">Квалифицирована</SelectItem>
                  <SelectItem value="offer">Предложение</SelectItem>
                  <SelectItem value="prepaid">Предоплата</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Вероятность (%)</Label>
              <Input
                type="number"
                min="0"
                max="100"
                value={formData.probability}
                onChange={(e) => setFormData({...formData, probability: e.target.value})}
                className="bg-[#17181A] border-[#232428] text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Дата закрытия</Label>
              <Input
                type="date"
                value={formData.closeDate}
                onChange={(e) => setFormData({...formData, closeDate: e.target.value})}
                className="bg-[#17181A] border-[#232428] text-white"
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Ответственный</Label>
              <Select value={formData.owner} onValueChange={(value) => setFormData({...formData, owner: value})}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите ответственного" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="Maria Smirnova">Maria Smirnova</SelectItem>
                  <SelectItem value="Dmitri Volkov">Dmitri Volkov</SelectItem>
                  <SelectItem value="Alex Petrov">Alex Petrov</SelectItem>
                  <SelectItem value="Elena Kozlova">Elena Kozlova</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Описание</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Детали сделки, требования клиента..."
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA] min-h-[100px]"
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-[#232428] text-white hover:bg-[#17181A]">
              Отмена
            </Button>
            <Button type="submit" className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Plus className="h-4 w-4 mr-2" />
              Создать сделку
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// CRM Analytics Component
export function CRMAnalytics() {
  return (
    <div className="space-y-6">
      {/* Revenue Analytics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#A6A7AA]">Доходы этого месяца</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-heading text-white">₽1,245K</p>
                <p className="text-xs text-green-400">+18.2% к прошлому месяцу</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#A6A7AA]">Прогноз на месяц</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-heading text-white">₽1,890K</p>
                <p className="text-xs text-blue-400">Основан на текущей воронке</p>
              </div>
              <BarChart3 className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-[#A6A7AA]">Активность команды</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-heading text-white">247</p>
                <p className="text-xs text-yellow-400">Активностей за неделю</p>
              </div>
              <Activity className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sales Performance by Team Member */}
      <Card className="bg-[#121214] border-[#232428]">
        <CardHeader>
          <CardTitle className="text-white">Результаты команды</CardTitle>
          <CardDescription className="text-[#A6A7AA]">
            Производительность менеджеров по продажам за текущий месяц
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Maria Smirnova", deals: 8, revenue: 680000, target: 750000, avatar: "MS" },
              { name: "Dmitri Volkov", deals: 6, revenue: 520000, target: 600000, avatar: "DV" },
              { name: "Alex Petrov", deals: 5, revenue: 450000, target: 500000, avatar: "AP" },
              { name: "Elena Kozlova", deals: 4, revenue: 320000, target: 400000, avatar: "EK" }
            ].map((member, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-[#17181A] rounded-lg">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-[#232428] text-white">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-heading text-white">{member.name}</h4>
                    <p className="text-sm text-[#A6A7AA]">{member.deals} сделок</p>
                  </div>
                </div>
                <div className="text-right flex-1 max-w-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-white">₽{(member.revenue / 1000).toFixed(0)}K</span>
                    <span className="text-xs text-[#A6A7AA]">из ₽{(member.target / 1000).toFixed(0)}K</span>
                  </div>
                  <Progress value={(member.revenue / member.target) * 100} className="h-2" />
                  <p className="text-xs text-[#A6A7AA] mt-1">
                    {((member.revenue / member.target) * 100).toFixed(1)}% от цели
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Lead Sources Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white">Эффективность источников</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { source: "Website", leads: 67, converted: 23, rate: 34.3, cost: 1200 },
                { source: "Referrals", leads: 34, converted: 18, rate: 52.9, cost: 0 },
                { source: "Social Media", leads: 28, converted: 8, rate: 28.6, cost: 2400 },
                { source: "Partners", leads: 18, converted: 9, rate: 50.0, cost: 800 }
              ].map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-white">{item.source}</span>
                    <span className="text-sm text-green-400">{item.rate}%</span>
                  </div>
                  <Progress value={item.rate} className="h-2" />
                  <div className="flex justify-between text-xs text-[#A6A7AA]">
                    <span>{item.converted}/{item.leads} конверсий</span>
                    <span>₽{item.cost} CPA</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#121214] border-[#232428]">
          <CardHeader>
            <CardTitle className="text-white">Цикл продаж</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { stage: "Лид → Квалификация", avg: 3.2, best: 1.5, unit: "дня" },
                { stage: "Квалификация → Предложение", avg: 7.8, best: 4.2, unit: "дня" },
                { stage: "Предложение → Предоплата", avg: 12.4, best: 7.8, unit: "дня" },
                { stage: "Предоплата → Закрытие", avg: 5.6, best: 2.1, unit: "дня" }
              ].map((item, index) => (
                <div key={index} className="p-3 bg-[#17181A] rounded-lg">
                  <h4 className="text-sm text-white mb-2">{item.stage}</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#A6A7AA]">Среднее: {item.avg} {item.unit}</span>
                    <span className="text-green-400">Лучшее: {item.best} {item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Automation Rule Builder Component
export function AutomationRuleBuilder({ onSubmit, onClose }: { onSubmit: (data: any) => void; onClose: () => void; }) {
  const [ruleData, setRuleData] = useState({
    name: "",
    description: "",
    trigger: "",
    triggerValue: "",
    action: "",
    actionValue: "",
    status: "active"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(ruleData);
    onClose();
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-[#0B0B0C] border-[#232428] text-white max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-400" />
            Создать правило автоматизации
          </DialogTitle>
          <DialogDescription className="text-[#A6A7AA]">
            Настройте автоматическое действие при выполнении условий
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-white">Название правила *</Label>
              <Input
                value={ruleData.name}
                onChange={(e) => setRuleData({...ruleData, name: e.target.value})}
                placeholder="Приветственная серия"
                className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label className="text-white">Статус</Label>
              <Select value={ruleData.status} onValueChange={(value) => setRuleData({...ruleData, status: value})}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  <SelectItem value="active">Активно</SelectItem>
                  <SelectItem value="paused">Пауза</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-white">Описание</Label>
            <Textarea
              value={ruleData.description}
              onChange={(e) => setRuleData({...ruleData, description: e.target.value})}
              placeholder="Краткое описание что делает это правило..."
              className="bg-[#17181A] border-[#232428] text-white placeholder:text-[#A6A7AA]"
            />
          </div>
          
          <Separator className="bg-[#232428]" />
          
          {/* Trigger Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-heading text-white">ЕСЛИ (Триггер)</h3>
            </div>
            
            <div className="p-4 bg-[#17181A] rounded-lg space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Условие *</Label>
                <Select value={ruleData.trigger} onValueChange={(value) => setRuleData({...ruleData, trigger: value})}>
                  <SelectTrigger className="bg-[#121214] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите условие" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121214] border-[#232428]">
                    <SelectItem value="new_lead">Новый лид создан</SelectItem>
                    <SelectItem value="lead_score">Оценка лида изменилась</SelectItem>
                    <SelectItem value="deal_stage">Стадия сделки изменилась</SelectItem>
                    <SelectItem value="no_activity">Нет активности N дней</SelectItem>
                    <SelectItem value="email_opened">Email открыт</SelectItem>
                    <SelectItem value="form_submitted">Форма отправлена</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {ruleData.trigger && (
                <div className="space-y-2">
                  <Label className="text-white">Параметры</Label>
                  <Input
                    value={ruleData.triggerValue}
                    onChange={(e) => setRuleData({...ruleData, triggerValue: e.target.value})}
                    placeholder={
                      ruleData.trigger === "lead_score" ? "Больше 80" :
                      ruleData.trigger === "no_activity" ? "7" :
                      "Дополнительные параметры..."
                    }
                    className="bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA]"
                  />
                </div>
              )}
            </div>
          </div>
          
          <Separator className="bg-[#232428]" />
          
          {/* Action Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-heading text-white">ТО (Действие)</h3>
            </div>
            
            <div className="p-4 bg-[#17181A] rounded-lg space-y-4">
              <div className="space-y-2">
                <Label className="text-white">Действие *</Label>
                <Select value={ruleData.action} onValueChange={(value) => setRuleData({...ruleData, action: value})}>
                  <SelectTrigger className="bg-[#121214] border-[#232428] text-white">
                    <SelectValue placeholder="Выберите действие" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#121214] border-[#232428]">
                    <SelectItem value="send_email">Отправить email</SelectItem>
                    <SelectItem value="send_whatsapp">Отправить WhatsApp</SelectItem>
                    <SelectItem value="create_task">Создать задачу</SelectItem>
                    <SelectItem value="assign_manager">Назначить менеджера</SelectItem>
                    <SelectItem value="change_stage">Изменить стадию</SelectItem>
                    <SelectItem value="add_tag">Добавить тег</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {ruleData.action && (
                <div className="space-y-2">
                  <Label className="text-white">Параметры действия</Label>
                  <Textarea
                    value={ruleData.actionValue}
                    onChange={(e) => setRuleData({...ruleData, actionValue: e.target.value})}
                    placeholder={
                      ruleData.action === "send_email" ? "ID шаблона или текст сообщения..." :
                      ruleData.action === "create_task" ? "Описание задачи..." :
                      "Параметры для выбранного действия..."
                    }
                    className="bg-[#121214] border-[#232428] text-white placeholder:text-[#A6A7AA] min-h-[80px]"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-end gap-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose} className="border-[#232428] text-white hover:bg-[#17181A]">
              Отмена
            </Button>
            <Button type="submit" className="bg-[#91040C] hover:bg-[#91040C]/90">
              <Save className="h-4 w-4 mr-2" />
              Создать правило
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

// Error Boundary for CRM Components
export function CRMErrorState({ error, onRetry }: { error: string; onRetry?: () => void; }) {
  return (
    <Card className="bg-[#121214] border-[#232428]">
      <CardContent className="p-12 text-center">
        <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-400" />
        <h3 className="text-lg font-heading text-white mb-2">Произошла ошибка</h3>
        <p className="text-[#A6A7AA] mb-4">{error}</p>
        {onRetry && (
          <Button onClick={onRetry} className="bg-[#91040C] hover:bg-[#91040C]/90">
            Попробовать снова
          </Button>
        )}
      </CardContent>
    </Card>
  );
}