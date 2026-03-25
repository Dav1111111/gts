import React, { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { GTSStyles } from "../../utils/gts-styles";
import { 
  ArrowLeft,
  ArrowRight,
  Users,
  Calendar,
  DollarSign,
  CheckCircle,
  Target,
  Building
} from "lucide-react";

interface GTSPrototypeDemoProps {
  onBackToHome: () => void;
}

interface DemoStep {
  id: string;
  title: string;
  description: string;
  module: string;
  icon: React.ComponentType<{ className?: string }>;
  action: string;
  result: string;
}

const demoSteps: DemoStep[] = [
  {
    id: '1',
    title: 'Вход как Партнёр',
    description: 'Выбираем роль "Партнёр-агент" на странице входа',
    module: 'Login',
    icon: Users,
    action: 'Нажать "Войти как Партнёр-агент"',
    result: 'Переход в Dashboard партнёра'
  },
  {
    id: '2',
    title: 'Просмотр Dashboard',
    description: 'Видим статистику: комиссии, активные лиды, конверсия',
    module: 'Dashboard',
    icon: Building,
    action: 'Просмотр KPI карточек',
    result: 'Анализ показателей продаж'
  },
  {
    id: '3',
    title: 'Создание лида в CRM',
    description: 'Добавляем нового потенциального клиента',
    module: 'CRM',
    icon: Target,
    action: 'Кнопка "Новый лид" → заполнить форму',
    result: 'Лид добавлен в воронку продаж'
  },
  {
    id: '4',
    title: 'Перевод лида в сделку',
    description: 'Квалифицируем лида и создаём сделку',
    module: 'CRM',
    icon: DollarSign,
    action: 'Перетащить в колонку "Переговоры"',
    result: 'Сделка готова к бронированию'
  },
  {
    id: '5',
    title: 'Создание бронирования',
    description: 'Из сделки создаём бронирование в календаре',
    module: 'Calendar',
    icon: Calendar,
    action: 'Кнопка "Создать бронирование"',
    result: 'Выбор даты, ресурса и экипажа'
  },
  {
    id: '6',
    title: 'Подтверждение и оплата',
    description: 'Подтверждаем бронирование и обрабатываем оплату',
    module: 'Finance',
    icon: CheckCircle,
    action: 'Подтвердить бронирование',
    result: 'Комиссия партнёра зачислена'
  }
];

export function GTSPrototypeDemo({ onBackToHome }: GTSPrototypeDemoProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  const handleNextStep = () => {
    if (currentStep < demoSteps.length - 1) {
      setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompleteDemo = () => {
    setCompletedSteps(prev => [...prev, demoSteps[currentStep].id]);
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const isCurrentStep = (index: number) => index === currentStep;

  return (
    <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={`border-b ${GTSStyles.borders.default} ${GTSStyles.backgrounds.surface} p-6`}>
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={onBackToHome}
              className={GTSStyles.buttons.ghost}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Назад
            </Button>
            
            <div>
              <h1 className={`text-2xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                GTS Prototype Demo
              </h1>
              <p className={`${GTSStyles.text.muted}`}>
                Полный user journey: от входа до получения комиссии
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className={`${GTSStyles.text.primary} font-medium`}>
              Шаг {currentStep + 1} из {demoSteps.length}
            </div>
            <div className={`text-sm ${GTSStyles.text.muted}`}>
              Демонстрация связности модулей
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-4">
            <span className={`text-sm ${GTSStyles.text.muted}`}>Прогресс</span>
            <span className={`text-sm ${GTSStyles.text.primary}`}>
              {Math.round(((currentStep + 1) / demoSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-[#232428] rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-[#91040C] to-red-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${((currentStep + 1) / demoSteps.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {demoSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={step.id}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm ${
                    isCurrentStep(index)
                      ? `${GTSStyles.backgrounds.accent} text-white`
                      : isStepCompleted(step.id)
                      ? 'bg-green-500/20 text-green-400'
                      : `${GTSStyles.backgrounds.card} ${GTSStyles.text.muted}`
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{step.module}</span>
                  {isStepCompleted(step.id) && <CheckCircle className="w-4 h-4" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Current Step Card */}
        <Card className={`${GTSStyles.cards.surface} mb-8`}>
          <div className="p-8">
            <div className="flex items-start gap-6">
              <div className={`w-16 h-16 rounded-2xl ${GTSStyles.backgrounds.accent} flex items-center justify-center`}>
                {React.createElement(demoSteps[currentStep].icon, { 
                  className: "w-8 h-8 text-white" 
                })}
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h2 className={`text-xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                    {demoSteps[currentStep].title}
                  </h2>
                  <Badge className="bg-[#91040C]/20 text-[#91040C] border-[#91040C]/30">
                    {demoSteps[currentStep].module}
                  </Badge>
                </div>
                
                <p className={`${GTSStyles.text.muted} mb-6 text-lg`}>
                  {demoSteps[currentStep].description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className={`${GTSStyles.cards.content} p-4`}>
                    <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>
                      Действие
                    </h4>
                    <p className={`text-sm ${GTSStyles.text.muted}`}>
                      {demoSteps[currentStep].action}
                    </p>
                  </div>
                  
                  <div className={`${GTSStyles.cards.content} p-4`}>
                    <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>
                      Результат
                    </h4>
                    <p className={`text-sm ${GTSStyles.text.muted}`}>
                      {demoSteps[currentStep].result}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Demo Mockup */}
        <Card className={`${GTSStyles.cards.surface} mb-8`}>
          <div className="p-6">
            <h3 className={`${GTSStyles.text.primary} font-medium mb-4 gts-font-heading`}>
              Интерфейс модуля: {demoSteps[currentStep].module}
            </h3>
            
            {/* Mock Interface */}
            <div className={`${GTSStyles.backgrounds.main} rounded-lg p-6 border ${GTSStyles.borders.default}`}>
              {currentStep === 0 && (
                <div className="text-center space-y-4">
                  <div className="text-lg text-white">🏢 Business Partners</div>
                  <div className={`${GTSStyles.cards.content} p-4 inline-block`}>
                    <div className="font-medium text-white mb-2">Партнёр-агент</div>
                    <div className="text-sm text-white/60 mb-3">Продажи и получение комиссий</div>
                    <Button className={GTSStyles.buttons.primary}>
                      Войти как Партнёр-агент
                    </Button>
                  </div>
                </div>
              )}
              
              {currentStep === 1 && (
                <div className="grid grid-cols-3 gap-4">
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className="text-xl text-white font-semibold">₽125K</div>
                    <div className="text-sm text-white/60">Комиссии</div>
                  </div>
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className="text-xl text-white font-semibold">12</div>
                    <div className="text-sm text-white/60">Активных лидов</div>
                  </div>
                  <div className={`${GTSStyles.cards.content} p-4 text-center`}>
                    <div className="text-xl text-white font-semibold">68%</div>
                    <div className="text-sm text-white/60">Конверсия</div>
                  </div>
                </div>
              )}
              
              {currentStep === 2 && (
                <div className="space-y-4">
                  <Button className={GTSStyles.buttons.primary}>
                    <Target className="w-4 h-4 mr-2" />
                    Новый лид
                  </Button>
                  <div className={`${GTSStyles.cards.content} p-4`}>
                    <div className="font-medium text-white">Форма создания лида</div>
                    <div className="text-sm text-white/60">Имя, контакты, интерес</div>
                  </div>
                </div>
              )}
              
              {currentStep === 3 && (
                <div className="flex gap-4">
                  <div className={`${GTSStyles.cards.content} p-3 min-h-[100px]`}>
                    <div className="text-xs text-white/60 mb-2">Лиды</div>
                    <div className="text-white text-sm">Новый клиент</div>
                  </div>
                  <ArrowRight className="text-white/40 mt-8" />
                  <div className={`${GTSStyles.cards.content} p-3 min-h-[100px] bg-[#91040C]/20`}>
                    <div className="text-xs text-white/60 mb-2">Переговоры</div>
                    <div className="text-white text-sm">Новый клиент</div>
                  </div>
                </div>
              )}
              
              {currentStep === 4 && (
                <div className="text-center space-y-4">
                  <Calendar className="w-12 h-12 text-white/60 mx-auto" />
                  <div className="text-white">Создание бронирования</div>
                  <div className="text-sm text-white/60">Выбор даты, ресурса и экипажа</div>
                </div>
              )}
              
              {currentStep === 5 && (
                <div className="flex items-center justify-center gap-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <div className="text-white font-medium">Бронирование подтверждено</div>
                    <div className="text-sm text-green-400">Комиссия +₽15,000 зачислена</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevStep}
            disabled={currentStep === 0}
            className={GTSStyles.buttons.secondary}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Назад
          </Button>

          <div className="flex gap-2">
            {demoSteps.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index <= currentStep ? 'bg-[#91040C]' : 'bg-[#232428]'
                }`}
              />
            ))}
          </div>

          {currentStep < demoSteps.length - 1 ? (
            <Button
              onClick={handleNextStep}
              className={GTSStyles.buttons.primary}
            >
              Далее
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleCompleteDemo}
              className={GTSStyles.buttons.primary}
            >
              Завершить демо
              <CheckCircle className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>

        {/* Summary */}
        {currentStep === demoSteps.length - 1 && (
          <Card className={`${GTSStyles.cards.surface} mt-8`}>
            <div className="p-6">
              <h3 className={`${GTSStyles.text.primary} font-medium mb-4 gts-font-heading`}>
                Что было продемонстрировано
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className={`${GTSStyles.cards.content} p-4`}>
                  <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>
                    Связность модулей
                  </h4>
                  <p className={`text-sm ${GTSStyles.text.muted}`}>
                    CRM → Calendar → Finance с передачей данных
                  </p>
                </div>
                
                <div className={`${GTSStyles.cards.content} p-4`}>
                  <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>
                    Роле-ориентированность
                  </h4>
                  <p className={`text-sm ${GTSStyles.text.muted}`}>
                    Интерфейс адаптирован под партнёра
                  </p>
                </div>
                
                <div className={`${GTSStyles.cards.content} p-4`}>
                  <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>
                    Единый UI/UX
                  </h4>
                  <p className={`text-sm ${GTSStyles.text.muted}`}>
                    Тёмная тема и токены дизайн-системы
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}