import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Button } from "../../ui/button";
import { Input } from "../../ui/input";
import { Textarea } from "../../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../ui/select";
import { Label } from "../../ui/label";
import { Badge } from "../../ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { Alert, AlertDescription } from "../../ui/alert";
import { Separator } from "../../ui/separator";
import { 
  User, 
  Building, 
  Mail, 
  Phone, 
  Globe, 
  MapPin, 
  Star, 
  Target, 
  Calendar, 
  FileText, 
  X,
  CheckCircle,
  AlertCircle,
  Loader2,
  UserPlus,
  MessageSquare
} from "lucide-react";

interface GTSNewLeadFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (leadData: LeadFormData) => void;
  isLoading?: boolean;
}

interface LeadFormData {
  // Основная информация
  firstName: string;
  lastName: string;
  company: string;
  position: string;
  
  // Контактная информация
  email: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  website?: string;
  
  // Адрес и локация
  country: string;
  city: string;
  address?: string;
  
  // Лид информация
  source: string;
  campaign?: string;
  priority: string;
  expectedBudget?: number;
  
  // Интересы и предпочтения
  interests: string[];
  serviceType: string;
  preferredContact: string;
  
  // Дополнительная информация
  notes?: string;
  tags?: string[];
  assignedTo?: string;
}

const LEAD_SOURCES = [
  { value: "website", label: "Сайт" },
  { value: "referral", label: "Рекомендация" },
  { value: "social_media", label: "Социальные сети" },
  { value: "direct_call", label: "Прямой звонок" },
  { value: "email", label: "Email рассылка" },
  { value: "advertising", label: "Реклама" },
  { value: "event", label: "Мероприятие" },
  { value: "partner", label: "Партнер" },
  { value: "other", label: "Другое" }
];

const SERVICE_TYPES = [
  { value: "helicopter", label: "Вертолетные туры" },
  { value: "yacht", label: "Яхт-чартер" },
  { value: "buggy", label: "Багги-приключения" },
  { value: "corporate", label: "Корпоративные программы" },
  { value: "vip", label: "VIP услуги" },
  { value: "custom", label: "Индивидуальная программа" }
];

const PRIORITY_LEVELS = [
  { value: "low", label: "Низкий", color: "bg-gray-500/20 text-gray-400" },
  { value: "medium", label: "Средний", color: "bg-yellow-500/20 text-yellow-400" },
  { value: "high", label: "Высокий", color: "bg-orange-500/20 text-orange-400" },
  { value: "critical", label: "Критический", color: "bg-red-500/20 text-red-400" }
];

const CONTACT_PREFERENCES = [
  { value: "email", label: "Email", icon: Mail },
  { value: "phone", label: "Телефон", icon: Phone },
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "telegram", label: "Telegram", icon: MessageSquare }
];

const TEAM_MEMBERS = [
  { value: "maria_smirnova", label: "Мария Смирнова" },
  { value: "dmitri_volkov", label: "Дмитрий Волков" },
  { value: "alex_petrov", label: "Алексей Петров" },
  { value: "anna_kozlova", label: "Анна Козлова" }
];

export function GTSNewLeadForm({ open, onClose, onSubmit, isLoading = false }: GTSNewLeadFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    firstName: "",
    lastName: "",
    company: "",
    position: "",
    email: "",
    phone: "",
    whatsapp: "",
    telegram: "",
    website: "",
    country: "Россия",
    city: "",
    address: "",
    source: "",
    campaign: "",
    priority: "medium",
    expectedBudget: undefined,
    interests: [],
    serviceType: "",
    preferredContact: "email",
    notes: "",
    tags: [],
    assignedTo: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    switch (step) {
      case 1: // Основная информация
        if (!formData.firstName.trim()) newErrors.firstName = "Имя обязательно";
        if (!formData.lastName.trim()) newErrors.lastName = "Фамилия обязательна";
        if (!formData.email.trim()) newErrors.email = "Email обязателен";
        if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
          newErrors.email = "Некорректный email";
        }
        if (!formData.phone.trim()) newErrors.phone = "Телефон обязателен";
        break;
        
      case 2: // Источник и приоритет
        if (!formData.source) newErrors.source = "Источник лида обязателен";
        if (!formData.serviceType) newErrors.serviceType = "Тип услуги обязателен";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 3) {
        setCurrentStep(currentStep + 1);
      } else {
        handleSubmit();
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    if (validateStep(currentStep)) {
      // Добавляем автоматические теги на основе данных
      const autoTags = [];
      if (formData.company) autoTags.push(`company:${formData.company.toLowerCase()}`);
      if (formData.serviceType) autoTags.push(`service:${formData.serviceType}`);
      if (formData.source) autoTags.push(`source:${formData.source}`);
      
      const finalData = {
        ...formData,
        tags: [...(formData.tags || []), ...autoTags]
      };

      onSubmit(finalData);
      setShowSuccess(true);
      
      setTimeout(() => {
        setShowSuccess(false);
        onClose();
        // Сброс формы
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          position: "",
          email: "",
          phone: "",
          whatsapp: "",
          telegram: "",
          website: "",
          country: "Россия",
          city: "",
          address: "",
          source: "",
          campaign: "",
          priority: "medium",
          expectedBudget: undefined,
          interests: [],
          serviceType: "",
          preferredContact: "email",
          notes: "",
          tags: [],
          assignedTo: ""
        });
        setCurrentStep(1);
        setErrors({});
      }, 2000);
    }
  };

  const updateFormData = (field: keyof LeadFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Убираем ошибку при исправлении поля
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const handleInterestToggle = (interest: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const addTag = (tag: string) => {
    if (tag.trim() && !formData.tags?.includes(tag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...(prev.tags || []), tag.trim()]
      }));
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags?.filter(tag => tag !== tagToRemove) || []
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <UserPlus className="w-12 h-12 mx-auto text-[#91040C] mb-3" />
              <h3 className="text-lg font-heading text-white">Основная информация</h3>
              <p className="text-sm text-[#A6A7AA]">Заполните контактные данные нового лида</p>
            </div>

            {/* Имя и фамилия */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="firstName" className="text-white">Имя *</Label>
                <Input
                  id="firstName"
                  value={formData.firstName}
                  onChange={(e) => updateFormData('firstName', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="Александр"
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>
              <div>
                <Label htmlFor="lastName" className="text-white">Фамилия *</Label>
                <Input
                  id="lastName"
                  value={formData.lastName}
                  onChange={(e) => updateFormData('lastName', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="Петров"
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Компания и должность */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company" className="text-white">Компания</Label>
                <Input
                  id="company"
                  value={formData.company}
                  onChange={(e) => updateFormData('company', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="TechCorp LLC"
                />
              </div>
              <div>
                <Label htmlFor="position" className="text-white">Должность</Label>
                <Input
                  id="position"
                  value={formData.position}
                  onChange={(e) => updateFormData('position', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="Генеральный директор"
                />
              </div>
            </div>

            {/* Email и телефон */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email" className="text-white">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => updateFormData('email', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="example@company.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <Label htmlFor="phone" className="text-white">Телефон *</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) => updateFormData('phone', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="+7 905 123-45-67"
                />
                {errors.phone && (
                  <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Мессенджеры */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp" className="text-white">WhatsApp</Label>
                <Input
                  id="whatsapp"
                  value={formData.whatsapp}
                  onChange={(e) => updateFormData('whatsapp', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="+7 905 123-45-67"
                />
              </div>
              <div>
                <Label htmlFor="telegram" className="text-white">Telegram</Label>
                <Input
                  id="telegram"
                  value={formData.telegram}
                  onChange={(e) => updateFormData('telegram', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="@username"
                />
              </div>
            </div>

            {/* Веб-сайт и локация */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="website" className="text-white">Веб-сайт</Label>
                <Input
                  id="website"
                  value={formData.website}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="https://company.com"
                />
              </div>
              <div>
                <Label htmlFor="city" className="text-white">Город</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => updateFormData('city', e.target.value)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="Москва"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Target className="w-12 h-12 mx-auto text-[#91040C] mb-3" />
              <h3 className="text-lg font-heading text-white">Информация о лиде</h3>
              <p className="text-sm text-[#A6A7AA]">Укажите источник и детали лида</p>
            </div>

            {/* Источник лида */}
            <div>
              <Label className="text-white">Источник лида *</Label>
              <Select value={formData.source} onValueChange={(value) => updateFormData('source', value)}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите источник" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  {LEAD_SOURCES.map((source) => (
                    <SelectItem key={source.value} value={source.value}>
                      {source.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.source && (
                <p className="text-red-400 text-xs mt-1">{errors.source}</p>
              )}
            </div>

            {/* Тип услуги */}
            <div>
              <Label className="text-white">Тип услуги *</Label>
              <Select value={formData.serviceType} onValueChange={(value) => updateFormData('serviceType', value)}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите тип услуги" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  {SERVICE_TYPES.map((service) => (
                    <SelectItem key={service.value} value={service.value}>
                      {service.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.serviceType && (
                <p className="text-red-400 text-xs mt-1">{errors.serviceType}</p>
              )}
            </div>

            {/* Приоритет и бюджет */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-white">Приоритет</Label>
                <Select value={formData.priority} onValueChange={(value) => updateFormData('priority', value)}>
                  <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-[#17181A] border-[#232428]">
                    {PRIORITY_LEVELS.map((priority) => (
                      <SelectItem key={priority.value} value={priority.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${priority.color.split(' ')[0]}`} />
                          {priority.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expectedBudget" className="text-white">Ожидаемый бюджет (₽)</Label>
                <Input
                  id="expectedBudget"
                  type="number"
                  value={formData.expectedBudget || ""}
                  onChange={(e) => updateFormData('expectedBudget', e.target.value ? parseInt(e.target.value) : undefined)}
                  className="bg-[#17181A] border-[#232428] text-white"
                  placeholder="150000"
                />
              </div>
            </div>

            {/* Предпочитаемый способ связи */}
            <div>
              <Label className="text-white">Предпочитаемый способ связи</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {CONTACT_PREFERENCES.map((contact) => {
                  const Icon = contact.icon;
                  return (
                    <Button
                      key={contact.value}
                      type="button"
                      variant={formData.preferredContact === contact.value ? "default" : "outline"}
                      className={`justify-start ${
                        formData.preferredContact === contact.value
                          ? "bg-[#91040C] hover:bg-[#91040C]/90"
                          : "border-[#232428] text-white hover:bg-[#17181A]"
                      }`}
                      onClick={() => updateFormData('preferredContact', contact.value)}
                    >
                      <Icon className="w-4 h-4 mr-2" />
                      {contact.label}
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Кампания */}
            <div>
              <Label htmlFor="campaign" className="text-white">Кампания/UTM</Label>
              <Input
                id="campaign"
                value={formData.campaign}
                onChange={(e) => updateFormData('campaign', e.target.value)}
                className="bg-[#17181A] border-[#232428] text-white"
                placeholder="summer_2024_helicopters"
              />
            </div>

            {/* Ответственный */}
            <div>
              <Label className="text-white">Назначить ответственного</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => updateFormData('assignedTo', value)}>
                <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                  <SelectValue placeholder="Выберите сотрудника" />
                </SelectTrigger>
                <SelectContent className="bg-[#17181A] border-[#232428]">
                  {TEAM_MEMBERS.map((member) => (
                    <SelectItem key={member.value} value={member.value}>
                      {member.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <FileText className="w-12 h-12 mx-auto text-[#91040C] mb-3" />
              <h3 className="text-lg font-heading text-white">Дополнительная информация</h3>
              <p className="text-sm text-[#A6A7AA]">Добавьте заметки и теги для лучшей организации</p>
            </div>

            {/* Заметки */}
            <div>
              <Label htmlFor="notes" className="text-white">Заметки</Label>
              <Textarea
                id="notes"
                value={formData.notes}
                onChange={(e) => updateFormData('notes', e.target.value)}
                className="bg-[#17181A] border-[#232428] text-white min-h-[100px]"
                placeholder="Дополнительная информация о лиде, его требованиях, особенностях..."
              />
            </div>

            {/* Теги */}
            <div>
              <Label className="text-white">Теги</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.tags?.map((tag, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="bg-[#232428] text-white border-[#2A2B2F] flex items-center gap-1"
                  >
                    {tag}
                    <X
                      className="w-3 h-3 cursor-pointer hover:text-red-400"
                      onClick={() => removeTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
              <Input
                placeholder="Добавить тег (нажмите Enter)"
                className="bg-[#17181A] border-[#232428] text-white"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    addTag(input.value);
                    input.value = '';
                  }
                }}
              />
              <p className="text-xs text-[#A6A7AA] mt-1">
                Добавьте теги для категоризации лида (например: vip, corporate, urgent)
              </p>
            </div>

            {/* Адрес */}
            <div>
              <Label htmlFor="address" className="text-white">Полный адрес</Label>
              <Textarea
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData('address', e.target.value)}
                className="bg-[#17181A] border-[#232428] text-white"
                placeholder="Полный адрес клиента для встреч или доставки документов"
                rows={2}
              />
            </div>

            {/* Предпросмотр лида */}
            <Card className="bg-[#232428] border-[#2A2B2F]">
              <CardHeader>
                <CardTitle className="text-white text-sm">Предпросмотр лида</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#A6A7AA]" />
                  <span className="text-white">{formData.firstName} {formData.lastName}</span>
                  {formData.company && (
                    <>
                      <span className="text-[#A6A7AA]">•</span>
                      <span className="text-[#A6A7AA]">{formData.company}</span>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#A6A7AA]" />
                  <span className="text-white">{formData.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#A6A7AA]" />
                  <span className="text-white">{formData.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-[#A6A7AA]" />
                  <span className="text-white">
                    {SERVICE_TYPES.find(s => s.value === formData.serviceType)?.label || "Не выбрано"}
                  </span>
                </div>
                {formData.expectedBudget && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-[#A6A7AA]" />
                    <span className="text-white">Бюджет: ₽{formData.expectedBudget.toLocaleString()}</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        );

      default:
        return null;
    }
  };

  const renderStepProgress = () => (
    <div className="flex items-center justify-center mb-6">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-[#91040C] text-white"
                : "bg-[#232428] text-[#A6A7AA]"
            }`}
          >
            {step < currentStep ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              step
            )}
          </div>
          {step < 3 && (
            <div
              className={`w-12 h-1 mx-2 ${
                step < currentStep ? "bg-[#91040C]" : "bg-[#232428]"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  if (showSuccess) {
    return (
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent className="bg-[#121214] border-[#232428] max-w-md">
          <div className="text-center py-6">
            <CheckCircle className="w-16 h-16 mx-auto text-green-400 mb-4" />
            <h3 className="text-xl font-heading text-white mb-2">Лид успешно создан!</h3>
            <p className="text-[#A6A7AA]">
              Новый лид добавлен в систему и назначен ответственному сотруднику.
            </p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-[#121214] border-[#232428] max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-white text-xl font-heading">
            Добавить нового лида
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {renderStepProgress()}

          {renderStepContent()}

          <Separator className="bg-[#232428]" />

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={currentStep === 1 ? onClose : handlePrevious}
              className="border-[#232428] text-white hover:bg-[#17181A]"
            >
              {currentStep === 1 ? "Отмена" : "Назад"}
            </Button>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[#A6A7AA]">
                Шаг {currentStep} из 3
              </span>
              <Button
                type="button"
                onClick={handleNext}
                disabled={isLoading}
                className="bg-[#91040C] hover:bg-[#91040C]/90"
              >
                {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                {currentStep === 3 ? "Создать лида" : "Далее"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}