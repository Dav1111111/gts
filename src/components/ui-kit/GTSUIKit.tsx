import { useState } from "react";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { GTSStyles } from "../../utils/gts-styles";
import { 
  Palette, 
  Type, 
  Box, 
  MousePointer,
  ArrowLeft,
  Copy,
  Check,
  BarChart3,
  Settings,
  Users,
  FileText,
  Calendar,
  Star,
  Heart,
  Share2,
  Download,
  Play,
  TrendingUp,
  DollarSign,
  Activity,
  AlertCircle,
  CheckCircle,
  XCircle,
  Clock
} from "lucide-react";

interface GTSUIKitProps {
  onBackToHome?: () => void;
}

export function GTSUIKit({ onBackToHome }: GTSUIKitProps) {
  const [copiedItem, setCopiedItem] = useState<string>("");

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(text);
    setTimeout(() => setCopiedItem(""), 2000);
  };

  const ColorSwatch = ({ color, name, value, description }: { 
    color: string; 
    name: string; 
    value: string; 
    description?: string;
  }) => (
    <div 
      className={`${GTSStyles.cards.default} cursor-pointer hover:${GTSStyles.backgrounds.card} ${GTSStyles.transitions.default}`}
      onClick={() => copyToClipboard(value)}
    >
      <div 
        className={`w-full h-16 rounded-lg mb-3 border ${GTSStyles.borders.default}`}
        style={{ backgroundColor: value }}
      ></div>
      <div className={`${GTSStyles.text.primary} text-sm font-medium mb-1 gts-font-heading`}>
        {name}
      </div>
      <div className={`${GTSStyles.text.muted} text-xs font-mono mb-1`}>
        {value}
      </div>
      {description && (
        <div className={`${GTSStyles.text.muted} text-xs`}>
          {description}
        </div>
      )}
      {copiedItem === value && (
        <div className="flex items-center gap-1 mt-2 text-green-400 text-xs">
          <Check className="w-3 h-3" />
          Скопировано
        </div>
      )}
    </div>
  );

  const ComponentCard = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className={GTSStyles.cards.default}>
      <div className="p-6">
        <h3 className={`text-lg font-medium ${GTSStyles.text.primary} mb-6 gts-font-heading`}>
          {title}
        </h3>
        <div className="space-y-4">
          {children}
        </div>
      </div>
    </div>
  );

  const StatusIndicator = ({ status, children }: { status: 'success' | 'warning' | 'error' | 'info'; children: React.ReactNode }) => {
    const icons = {
      success: CheckCircle,
      warning: AlertCircle,
      error: XCircle,
      info: Clock
    };
    const colors = {
      success: 'text-green-400',
      warning: 'text-yellow-400',
      error: 'text-red-400',
      info: 'text-blue-400'
    };
    const Icon = icons[status];
    
    return (
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${colors[status]}`} />
        <span className={GTSStyles.text.primary}>{children}</span>
      </div>
    );
  };

  return (
    <div className={`min-h-screen ${GTSStyles.backgrounds.main}`}>
      {/* Header */}
      <div className={`border-b ${GTSStyles.borders.default} ${GTSStyles.backgrounds.surface}`}>
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBackToHome && (
                <Button
                  variant="ghost"
                  onClick={onBackToHome}
                  className={GTSStyles.buttons.ghost}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Назад
                </Button>
              )}
              
              <div>
                <h1 className={`text-3xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                  GTS Design System
                </h1>
                <p className={`${GTSStyles.text.muted} gts-font-body`}>
                  Единая система дизайна Grand Tour Sochi
                </p>
              </div>
            </div>
            
            <div className="w-14 h-14 bg-gradient-to-br from-[#91040C] to-red-700 rounded-2xl flex items-center justify-center gts-shadow-card">
              <span className="text-white font-bold text-xl">GTS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <Tabs defaultValue="colors" className="w-full">
          <TabsList className={`grid w-full grid-cols-5 ${GTSStyles.backgrounds.surface} border ${GTSStyles.borders.default} mb-8`}>
            <TabsTrigger value="colors" className={`${GTSStyles.text.muted} data-[state=active]:${GTSStyles.text.primary} data-[state=active]:${GTSStyles.backgrounds.accent}`}>
              <Palette className="w-4 h-4 mr-2" />
              Цвета
            </TabsTrigger>
            <TabsTrigger value="typography" className={`${GTSStyles.text.muted} data-[state=active]:${GTSStyles.text.primary} data-[state=active]:${GTSStyles.backgrounds.accent}`}>
              <Type className="w-4 h-4 mr-2" />
              Типографика
            </TabsTrigger>
            <TabsTrigger value="components" className={`${GTSStyles.text.muted} data-[state=active]:${GTSStyles.text.primary} data-[state=active]:${GTSStyles.backgrounds.accent}`}>
              <Box className="w-4 h-4 mr-2" />
              Компоненты
            </TabsTrigger>
            <TabsTrigger value="patterns" className={`${GTSStyles.text.muted} data-[state=active]:${GTSStyles.text.primary} data-[state=active]:${GTSStyles.backgrounds.accent}`}>
              <MousePointer className="w-4 h-4 mr-2" />
              Паттерны
            </TabsTrigger>
            <TabsTrigger value="tokens" className={`${GTSStyles.text.muted} data-[state=active]:${GTSStyles.text.primary} data-[state=active]:${GTSStyles.backgrounds.accent}`}>
              <Settings className="w-4 h-4 mr-2" />
              Токены
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-8">
            <div>
              <h2 className={`text-2xl font-medium ${GTSStyles.text.primary} mb-6 gts-font-heading`}>
                Цветовая палитра GTS
              </h2>
              
              <div className="space-y-8">
                <div>
                  <h3 className={`text-lg font-medium ${GTSStyles.text.primary} mb-4 gts-font-heading`}>
                    Бренд-цвета
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <ColorSwatch color="#000000" name="GTS Black" value="#000000" description="Основной чёрный" />
                    <ColorSwatch color="#FFFFFF" name="GTS White" value="#FFFFFF" description="Основной белый" />
                    <ColorSwatch color="#91040C" name="GTS Red" value="#91040C" description="Фирменный красный" />
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-medium ${GTSStyles.text.primary} mb-4 gts-font-heading`}>
                    Тёмная тема
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    <ColorSwatch color="#0B0B0C" name="Portal BG" value="#0B0B0C" description="Основной фон" />
                    <ColorSwatch color="#121214" name="Surface" value="#121214" description="Поверхности" />
                    <ColorSwatch color="#17181A" name="Card" value="#17181A" description="Карточки" />
                    <ColorSwatch color="#FFFFFF" name="Text Primary" value="#FFFFFF" description="Основной текст" />
                    <ColorSwatch color="#A6A7AA" name="Text Muted" value="#A6A7AA" description="Вторичный текст" />
                    <ColorSwatch color="#232428" name="Border" value="#232428" description="Границы" />
                  </div>
                </div>

                <div>
                  <h3 className={`text-lg font-medium ${GTSStyles.text.primary} mb-4 gts-font-heading`}>
                    Статусы
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <ColorSwatch color="#2BB673" name="Success" value="#2BB673" description="Успешные действия" />
                    <ColorSwatch color="#F5A623" name="Warning" value="#F5A623" description="Предупреждения" />
                    <ColorSwatch color="#E5484D" name="Error" value="#E5484D" description="Ошибки" />
                    <ColorSwatch color="#3B82F6" name="Info" value="#3B82F6" description="Информация" />
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-8">
            <ComponentCard title="Nokia.Kokia - Заголовки">
              <div className="space-y-6">
                <div className={`text-4xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                  H1 Основной заголовок (32px)
                </div>
                <div className={`text-2xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                  H2 Подзаголовок (24px)
                </div>
                <div className={`text-xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                  H3 Заголовок секции (20px)
                </div>
                <div className={`text-lg font-medium ${GTSStyles.text.primary} gts-font-heading`}>
                  H4 Заголовок карточки (18px)
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Gilroy - Основной текст">
              <div className="space-y-4">
                <div className={`text-base ${GTSStyles.text.primary} gts-font-body`}>
                  Основной текст (16px Regular)
                </div>
                <div className={`text-base font-medium ${GTSStyles.text.primary} gts-font-body`}>
                  Выделенный текст (16px Medium)
                </div>
                <div className={`text-sm ${GTSStyles.text.muted} gts-font-body`}>
                  Вторичный текст (14px Regular)
                </div>
                <div className={`text-xs ${GTSStyles.text.muted} gts-font-body`}>
                  Мелкий текст (12px Regular)
                </div>
              </div>
            </ComponentCard>
          </TabsContent>

          <TabsContent value="components" className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <ComponentCard title="Кнопки">
                <div className="space-y-4">
                  <Button className={GTSStyles.buttons.primary}>
                    Primary Button
                  </Button>
                  <Button className={GTSStyles.buttons.secondary}>
                    Secondary Button
                  </Button>
                  <Button className={GTSStyles.buttons.ghost}>
                    Ghost Button
                  </Button>
                  <Button size="sm" className={GTSStyles.buttons.primary}>
                    Small Button
                  </Button>
                </div>
              </ComponentCard>

              <ComponentCard title="Бейджи и статусы">
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge className={GTSStyles.badges.default}>Active</Badge>
                    <Badge className="bg-green-500/20 text-green-400 border-green-400/30">Success</Badge>
                    <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-400/30">Warning</Badge>
                    <Badge className="bg-red-500/20 text-red-400 border-red-400/30">Error</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <StatusIndicator status="success">Операция выполнена</StatusIndicator>
                    <StatusIndicator status="warning">Требует внимания</StatusIndicator>
                    <StatusIndicator status="error">Ошибка системы</StatusIndicator>
                    <StatusIndicator status="info">Информация</StatusIndicator>
                  </div>
                </div>
              </ComponentCard>

              <ComponentCard title="Карточки">
                <div className="space-y-4">
                  <div className={GTSStyles.cards.default}>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className={`${GTSStyles.text.primary} font-medium gts-font-heading`}>
                        Стандартная карточка
                      </h4>
                      <BarChart3 className={`w-5 h-5 ${GTSStyles.text.accent}`} />
                    </div>
                    <p className={`${GTSStyles.text.muted} text-sm gts-font-body`}>
                      Базовое содержимое карточки с описанием и дополнительной информацией
                    </p>
                  </div>
                  
                  <div className={GTSStyles.cards.content}>
                    <h4 className={`${GTSStyles.text.primary} font-medium gts-font-heading mb-2`}>
                      Контентная карточка
                    </h4>
                    <p className={`${GTSStyles.text.muted} text-sm gts-font-body`}>
                      Более тёмный вариант для вложенного содержимого
                    </p>
                  </div>
                </div>
              </ComponentCard>

              <ComponentCard title="Аватары и индикаторы">
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-8 h-8">
                      <div className="w-full h-full bg-gradient-to-br from-[#91040C] to-red-700 flex items-center justify-center text-white text-sm font-medium">
                        A
                      </div>
                    </Avatar>
                    <Avatar className="w-10 h-10">
                      <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center text-white font-medium">
                        B
                      </div>
                    </Avatar>
                    <Avatar className="w-12 h-12">
                      <div className="w-full h-full bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center text-white font-medium">
                        C
                      </div>
                    </Avatar>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                      <span className={`${GTSStyles.text.muted} text-sm`}>Онлайн</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                      <span className={`${GTSStyles.text.muted} text-sm`}>Занят</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                      <span className={`${GTSStyles.text.muted} text-sm`}>Оффлайн</span>
                    </div>
                  </div>
                </div>
              </ComponentCard>
            </div>
          </TabsContent>

          <TabsContent value="patterns" className="space-y-8">
            <ComponentCard title="Dashboard KPI Cards">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={GTSStyles.cards.content}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${GTSStyles.text.muted} text-sm gts-font-body`}>Активные туры</span>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className={`text-2xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>24</div>
                  <div className="text-sm text-green-400 mt-1">+12% от прошлого месяца</div>
                </div>
                
                <div className={GTSStyles.cards.content}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${GTSStyles.text.muted} text-sm gts-font-body`}>Клиенты</span>
                    <Users className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className={`text-2xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>156</div>
                  <div className="text-sm text-blue-400 mt-1">+8 новых</div>
                </div>
                
                <div className={GTSStyles.cards.content}>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`${GTSStyles.text.muted} text-sm gts-font-body`}>Доходы</span>
                    <DollarSign className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div className={`text-2xl font-medium ${GTSStyles.text.primary} gts-font-heading`}>₽2.4M</div>
                  <div className="text-sm text-yellow-400 mt-1">+15% план</div>
                </div>
              </div>
            </ComponentCard>

            <ComponentCard title="Navigation Sidebar">
              <div className={`${GTSStyles.backgrounds.surface} rounded-lg p-4 border ${GTSStyles.borders.default}`}>
                <nav className="space-y-1">
                  <a href="#" className={`flex items-center gap-3 p-3 rounded-lg ${GTSStyles.backgrounds.accent} text-white`}>
                    <BarChart3 className="w-5 h-5" />
                    <span className="font-medium">Dashboard</span>
                  </a>
                  <a href="#" className={`flex items-center gap-3 p-3 rounded-lg ${GTSStyles.text.muted} hover:${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} ${GTSStyles.transitions.default}`}>
                    <Calendar className="w-5 h-5" />
                    <span className="font-medium">Calendar</span>
                  </a>
                  <a href="#" className={`flex items-center gap-3 p-3 rounded-lg ${GTSStyles.text.muted} hover:${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} ${GTSStyles.transitions.default}`}>
                    <Users className="w-5 h-5" />
                    <span className="font-medium">CRM</span>
                  </a>
                  <a href="#" className={`flex items-center gap-3 p-3 rounded-lg ${GTSStyles.text.muted} hover:${GTSStyles.text.primary} hover:${GTSStyles.backgrounds.card} ${GTSStyles.transitions.default}`}>
                    <DollarSign className="w-5 h-5" />
                    <span className="font-medium">Finance</span>
                  </a>
                </nav>
              </div>
            </ComponentCard>

            <ComponentCard title="Table Layout">
              <div className={`${GTSStyles.backgrounds.surface} rounded-lg border ${GTSStyles.borders.default} overflow-hidden`}>
                <div className={`p-4 border-b ${GTSStyles.borders.default}`}>
                  <h4 className={`${GTSStyles.text.primary} font-medium gts-font-heading`}>
                    Последние операции
                  </h4>
                </div>
                <div className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                        </div>
                        <div>
                          <div className={`${GTSStyles.text.primary} font-medium text-sm`}>Оплата тура</div>
                          <div className={`${GTSStyles.text.muted} text-xs`}>Иван Петров</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className={`${GTSStyles.text.primary} font-medium text-sm`}>+₽15,000</div>
                        <div className={`${GTSStyles.text.muted} text-xs`}>сегодня</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </TabsContent>

          <TabsContent value="tokens" className="space-y-8">
            <ComponentCard title="Design Tokens Usage">
              <div className="space-y-6">
                <div>
                  <h4 className={`${GTSStyles.text.primary} font-medium gts-font-heading mb-3`}>
                    Spacing Scale
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={GTSStyles.cards.content}>
                      <div className="w-4 h-4 bg-[#91040C] rounded mb-2"></div>
                      <div className="text-xs">4px (--gts-space-1)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-6 h-6 bg-[#91040C] rounded mb-2"></div>
                      <div className="text-xs">24px (--gts-space-6)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-8 h-8 bg-[#91040C] rounded mb-2"></div>
                      <div className="text-xs">32px (--gts-space-8)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-12 h-12 bg-[#91040C] rounded mb-2"></div>
                      <div className="text-xs">48px (--gts-space-12)</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className={`${GTSStyles.text.primary} font-medium gts-font-heading mb-3`}>
                    Border Radius
                  </h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className={GTSStyles.cards.content}>
                      <div className="w-12 h-12 bg-[#91040C] rounded-sm mb-2"></div>
                      <div className="text-xs">Small (4px)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-12 h-12 bg-[#91040C] rounded-lg mb-2"></div>
                      <div className="text-xs">Large (12px)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-12 h-12 bg-[#91040C] rounded-xl mb-2"></div>
                      <div className="text-xs">XL (16px)</div>
                    </div>
                    <div className={GTSStyles.cards.content}>
                      <div className="w-12 h-12 bg-[#91040C] rounded-full mb-2"></div>
                      <div className="text-xs">Full (50%)</div>
                    </div>
                  </div>
                </div>
              </div>
            </ComponentCard>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}