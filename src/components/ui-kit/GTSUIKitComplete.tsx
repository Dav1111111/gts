import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { Avatar } from "../ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Switch } from "../ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { motion } from "motion/react";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  Building, 
  Users, 
  Calendar, 
  DollarSign, 
  FileText, 
  Settings,
  Star,
  Bell,
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  Edit,
  Trash2,
  Plus,
  Minus,
  Check,
  X,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  Home,
  User,
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  Bookmark,
  Heart,
  Share2,
  MessageCircle,
  Send,
  Image,
  Video,
  Mic,
  Camera,
  Paperclip,
  Link,
  Copy,
  Archive,
  Folder,
  FolderOpen,
  Save,
  RotateCcw,
  RefreshCw,
  Loader,
  AlertCircle,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  HelpCircle,
  Menu,
  MoreHorizontal,
  MoreVertical,
  Maximize,
  Minimize,
  Monitor,
  Smartphone,
  Tablet,
  Wifi,
  WifiOff,
  Battery,
  BatteryLow,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Repeat,
  Shuffle,
  Zap,
  Shield,
  Lock,
  Unlock,
  Key,
  Database,
  Server,
  Cloud,
  CloudOff,
  Plug,
  Power,
  PowerOff
} from "lucide-react";

interface GTSUIKitCompleteProps {
  onBackToHome: () => void;
}

interface ColorTokenProps {
  name: string;
  value: string;
  description: string;
  cssVar?: string;
}

function ColorToken({ name, value, description, cssVar }: ColorTokenProps) {
  const copyToClipboard = () => {
    const textToCopy = cssVar || value;
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <div 
      className={`${GTSStyles.cards.interactive} p-4 group`}
      onClick={copyToClipboard}
    >
      <div 
        className="w-12 h-12 rounded-xl border border-[#232428] flex-shrink-0"
        style={{ backgroundColor: value }}
      />
      <div className="flex-1 min-w-0 mt-3">
        <div className={`${GTSStyles.text.primary} font-medium`}>{name}</div>
        <div className={`${GTSStyles.text.muted} text-sm font-mono`}>{cssVar || value}</div>
        <div className={`${GTSStyles.text.muted} text-xs`}>{description}</div>
      </div>
      <Copy className={`${GTSStyles.icons.small} opacity-0 group-hover:opacity-100 transition-opacity`} />
    </div>
  );
}

interface ComponentExampleProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

function ComponentExample({ title, description, children }: ComponentExampleProps) {
  return (
    <div className={`${GTSStyles.cards.content} p-6`}>
      <div className="mb-4">
        <h4 className={`${GTSStyles.text.primary} font-medium`}>{title}</h4>
        <p className={`${GTSStyles.text.muted} text-sm`}>{description}</p>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}

export function GTSUIKitComplete({ onBackToHome }: GTSUIKitCompleteProps) {
  const [activeTab, setActiveTab] = useState('cards');

  // Цветовые токены системы
  const colorTokens = [
    { name: 'Background', value: '#0B0B0C', description: 'Основной фон приложения', cssVar: 'var(--gts-portal-bg)' },
    { name: 'Surface', value: '#121214', description: 'Поверхности (sidebar, topbar)', cssVar: 'var(--gts-portal-surface)' },
    { name: 'Card', value: '#17181A', description: 'Карточки и модальные окна', cssVar: 'var(--gts-portal-card)' },
    { name: 'Text', value: '#FFFFFF', description: 'Основной цвет текста', cssVar: 'var(--gts-portal-text)' },
    { name: 'Text Muted', value: '#A6A7AA', description: 'Второстепенный текст', cssVar: 'var(--gts-portal-muted)' },
    { name: 'Border', value: '#232428', description: 'Границы элементов', cssVar: 'var(--gts-portal-border)' },
    { name: 'Accent', value: '#91040C', description: 'Акценты и кнопки', cssVar: 'var(--gts-portal-accent)' },
    { name: 'Success', value: '#2BB673', description: 'Успешные действия', cssVar: 'var(--gts-portal-success)' },
    { name: 'Warning', value: '#F5A623', description: 'Предупреждения', cssVar: 'var(--gts-portal-warning)' },
    { name: 'Error', value: '#E5484D', description: 'Ошибки', cssVar: 'var(--gts-portal-error)' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div className={GTSComponents.pageHeader}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onBackToHome}
              className={GTSStyles.buttons.ghost}
            >
              <ArrowLeft className={GTSStyles.icons.button} />
            </Button>
            
            <div>
              <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                GTS UI Kit 
              </h1>
              <p className={GTSComponents.pageSubtitle}>
                Единая тёмная дизайн-система с унифицированными компонентами
              </p>
            </div>
          </div>

          <Badge className={GTSStyles.badges.default}>
            v3.0.0 - Dark Unified
          </Badge>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className={`${GTSStyles.cards.surface} grid grid-cols-6 w-full max-w-4xl mx-auto`}>
            <TabsTrigger value="cards" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              💳 Карточки
            </TabsTrigger>
            <TabsTrigger value="buttons" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              🔘 Кнопки
            </TabsTrigger>
            <TabsTrigger value="icons" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              🎯 Иконки
            </TabsTrigger>
            <TabsTrigger value="tables" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              📊 Таблицы
            </TabsTrigger>
            <TabsTrigger value="colors" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              🎨 Цвета
            </TabsTrigger>
            <TabsTrigger value="guide" className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-white/60">
              📋 Гайд
            </TabsTrigger>
          </TabsList>

          {/* Cards Tab */}
          <TabsContent value="cards" className="space-y-8">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Унифицированные карточки (#17181A, радиус 16px)
                </h2>
                <p className={GTSStyles.text.muted}>
                  Все карточки используют тёмный фон #17181A с радиусом 16px, белым текстом и красными акцентами
                </p>
              </div>

              <div className="p-6 space-y-6">
                {/* Basic Cards */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Базовые карточки</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className={GTSStyles.cards.default}>
                      <div className="p-6">
                        <h4 className={GTSStyles.text.primary}>Default Card</h4>
                        <p className={`${GTSStyles.text.muted} text-sm mt-2`}>
                          Базовая карточка с тёмным фоном
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.content}>
                      <div className="p-6">
                        <h4 className={GTSStyles.text.primary}>Content Card</h4>
                        <p className={`${GTSStyles.text.muted} text-sm mt-2`}>
                          Карточка для контента
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.accent}>
                      <div className="p-6">
                        <h4 className="text-white">Accent Card</h4>
                        <p className="text-white/80 text-sm mt-2">
                          Акцентная красная карточка
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Interactive Cards */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Интерактивные карточки</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={GTSStyles.cards.interactive}>
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#91040C] flex items-center justify-center">
                            <User className={GTSStyles.icons.medium} />
                          </div>
                          <div className="flex-1">
                            <h4 className={GTSStyles.text.primary}>Клиент</h4>
                            <p className={`${GTSStyles.text.muted} text-sm`}>Александр Петров</p>
                            <Badge className={`${GTSStyles.badges.default} mt-2`}>VIP</Badge>
                          </div>
                        </div>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.interactive}>
                      <div className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 rounded-xl bg-[#2BB673] flex items-center justify-center">
                            <Calendar className={GTSStyles.icons.medium} />
                          </div>
                          <div className="flex-1">
                            <h4 className={GTSStyles.text.primary}>Бронирование</h4>
                            <p className={`${GTSStyles.text.muted} text-sm`}>Яхт-тур на 4 часа</p>
                            <Badge className="bg-green-500/20 text-green-400 border border-green-500/30 mt-2">
                              Подтверждено
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Stats Cards */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Статистические карточки</h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className={GTSStyles.cards.accent}>
                      <div className="p-6 text-center">
                        <DollarSign className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-semibold text-white">₽2.8M</div>
                        <div className="text-white/60 text-sm">Общий доход</div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-600 to-green-800 border-green-600 border rounded-2xl text-white">
                      <div className="p-6 text-center">
                        <Users className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-semibold text-white">1,247</div>
                        <div className="text-white/60 text-sm">Клиенты</div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-blue-600 to-blue-800 border-blue-600 border rounded-2xl text-white">
                      <div className="p-6 text-center">
                        <Calendar className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-semibold text-white">342</div>
                        <div className="text-white/60 text-sm">Бронирования</div>
                      </div>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-600 to-purple-800 border-purple-600 border rounded-2xl text-white">
                      <div className="p-6 text-center">
                        <Star className="w-8 h-8 mx-auto mb-2 text-white/80" />
                        <div className="text-2xl font-semibold text-white">4.8/5</div>
                        <div className="text-white/60 text-sm">Рейтинг</div>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Buttons Tab */}
          <TabsContent value="buttons" className="space-y-8">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Стилизованные кнопки GTS (без белых системных)
                </h2>
                <p className={GTSStyles.text.muted}>
                  Все кнопки используют единый стиль с радиусом 12px и красными акцентами
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Primary Buttons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Primary кнопки</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className={GTSStyles.buttons.primary}>
                      Primary Button
                    </Button>
                    <Button size="sm" className={GTSStyles.buttons.primary}>
                      Small Primary
                    </Button>
                    <Button size="lg" className={GTSStyles.buttons.primary}>
                      <Plus className={GTSStyles.icons.button} />
                      Large with Icon
                    </Button>
                  </div>
                </div>

                {/* Secondary Buttons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Secondary кнопки</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className={GTSStyles.buttons.secondary}>
                      Secondary Button
                    </Button>
                    <Button size="sm" className={GTSStyles.buttons.secondary}>
                      <Filter className={GTSStyles.icons.button} />
                      With Icon
                    </Button>
                    <Button className={GTSStyles.buttons.outline}>
                      Outline Button
                    </Button>
                  </div>
                </div>

                {/* State Buttons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Состояния</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className={GTSStyles.buttons.success}>
                      <CheckCircle className={GTSStyles.icons.button} />
                      Success
                    </Button>
                    <Button className={GTSStyles.buttons.warning}>
                      <AlertTriangle className={GTSStyles.icons.button} />
                      Warning
                    </Button>
                    <Button className={GTSStyles.buttons.error}>
                      <XCircle className={GTSStyles.icons.button} />
                      Error
                    </Button>
                  </div>
                </div>

                {/* Ghost & Dark Buttons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Ghost & Dark кнопки</h3>
                  <div className="flex flex-wrap gap-4">
                    <Button className={GTSStyles.buttons.ghost}>
                      Ghost Button
                    </Button>
                    <Button className={GTSStyles.buttons.dark}>
                      Dark Button
                    </Button>
                    <Button className={`${GTSStyles.buttons.ghost} text-[#91040C] hover:bg-[#91040C]/10`}>
                      <Download className={GTSStyles.icons.button} />
                      Export
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Icons Tab */}
          <TabsContent value="icons" className="space-y-8">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Единые иконки (тонкие контурные, 20/24px)
                </h2>
                <p className={GTSStyles.text.muted}>
                  Все иконки используют stroke-2, белые с красными акцентами для интерактивных элементов
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Icon Sizes */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Размеры иконок</h3>
                  <div className="flex items-center gap-8">
                    <div className="text-center">
                      <User className={GTSStyles.icons.small} />
                      <div className={`${GTSStyles.text.muted} text-xs mt-2`}>Small 16px</div>
                    </div>
                    <div className="text-center">
                      <User className={GTSStyles.icons.medium} />
                      <div className={`${GTSStyles.text.muted} text-xs mt-2`}>Medium 20px</div>
                    </div>
                    <div className="text-center">
                      <User className={GTSStyles.icons.large} />
                      <div className={`${GTSStyles.text.muted} text-xs mt-2`}>Large 24px</div>
                    </div>
                    <div className="text-center">
                      <User className={GTSStyles.icons.accent} />
                      <div className={`${GTSStyles.text.muted} text-xs mt-2`}>Accent Red</div>
                    </div>
                  </div>
                </div>

                {/* Common Icons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Часто используемые иконки</h3>
                  <div className="grid grid-cols-8 md:grid-cols-12 gap-4">
                    {[
                      { icon: Home, name: 'home' },
                      { icon: User, name: 'user' },
                      { icon: Users, name: 'users' },
                      { icon: Calendar, name: 'calendar' },
                      { icon: DollarSign, name: 'dollar' },
                      { icon: FileText, name: 'file' },
                      { icon: Settings, name: 'settings' },
                      { icon: Bell, name: 'bell' },
                      { icon: Search, name: 'search' },
                      { icon: Filter, name: 'filter' },
                      { icon: Plus, name: 'plus' },
                      { icon: Edit, name: 'edit' },
                      { icon: Trash2, name: 'trash' },
                      { icon: Eye, name: 'eye' },
                      { icon: Download, name: 'download' },
                      { icon: Upload, name: 'upload' },
                      { icon: Check, name: 'check' },
                      { icon: X, name: 'x' },
                      { icon: ArrowLeft, name: 'arrow-left' },
                      { icon: ArrowRight, name: 'arrow-right' },
                      { icon: ChevronDown, name: 'chevron-down' },
                      { icon: MoreHorizontal, name: 'more' },
                      { icon: Star, name: 'star' },
                      { icon: Heart, name: 'heart' }
                    ].map(({ icon: Icon, name }) => (
                      <div key={name} className="text-center p-3 rounded-lg hover:bg-[#1E1F21] transition-colors">
                        <Icon className={GTSStyles.icons.medium} />
                        <div className={`${GTSStyles.text.muted} text-xs mt-2`}>{name}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Icons */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Интерактивные иконки</h3>
                  <div className="flex gap-4">
                    <Button className={GTSStyles.buttons.ghost}>
                      <Eye className={GTSStyles.icons.interactive} />
                    </Button>
                    <Button className={GTSStyles.buttons.ghost}>
                      <Edit className={GTSStyles.icons.interactive} />
                    </Button>
                    <Button className={GTSStyles.buttons.ghost}>
                      <Trash2 className="w-5 h-5 stroke-2 text-white/60 hover:text-[#E5484D] transition-colors duration-200" />
                    </Button>
                    <Button className={GTSStyles.buttons.ghost}>
                      <Settings className={GTSStyles.icons.interactive} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Tables Tab */}
          <TabsContent value="tables" className="space-y-6">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Унифицированные таблицы
                </h2>
                
                {/* Table Toolbar - 16px padding */}
                <div className={`flex items-center justify-between p-4 ${GTSStyles.cards.content} mb-4`}>
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <Search className={`${GTSStyles.icons.small} absolute left-3 top-1/2 -translate-y-1/2 text-white/60`} />
                      <Input
                        placeholder="Поиск..."
                        className={`pl-10 w-64 ${GTSStyles.inputs.default}`}
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className={`w-32 ${GTSStyles.cards.content} border-[#232428]`}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={GTSStyles.cards.content}>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="active">Активные</SelectItem>
                        <SelectItem value="inactive">Неактивные</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className={GTSStyles.buttons.secondary}>
                      <Filter className={GTSStyles.icons.button} />
                      Фильтры
                    </Button>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button className={GTSStyles.buttons.secondary}>
                      <Download className={GTSStyles.icons.button} />
                      Экспорт
                    </Button>
                    <Button className={GTSStyles.buttons.primary}>
                      <Plus className={GTSStyles.icons.button} />
                      Добавить
                    </Button>
                  </div>
                </div>
              </div>

              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow className="border-[#232428] hover:bg-[#1E1F21]/50">
                      <TableHead className={`${GTSStyles.text.primary} w-12`}>
                        <Checkbox className="border-[#232428]" />
                      </TableHead>
                      <TableHead className={GTSStyles.text.primary}>Название</TableHead>
                      <TableHead className={GTSStyles.text.primary}>Статус</TableHead>
                      <TableHead className={GTSStyles.text.primary}>Дата</TableHead>
                      <TableHead className={GTSStyles.text.primary}>Сумма</TableHead>
                      <TableHead className={`${GTSStyles.text.primary} w-24`}>Действия</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow className="border-[#232428] hover:bg-[#1E1F21]/50">
                      <TableCell>
                        <Checkbox className="border-[#232428]" />
                      </TableCell>
                      <TableCell className={GTSStyles.text.primary}>
                        <div className="flex items-center gap-3">
                          <Avatar className="w-8 h-8">
                            <div className="w-full h-full bg-[#91040C] flex items-center justify-center text-white text-xs">
                              AC
                            </div>
                          </Avatar>
                          <div>
                            <div className="font-medium">Александр Петров</div>
                            <div className={`text-sm ${GTSStyles.text.muted}`}>alex@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-green-500/20 text-green-400 border border-green-500/30">
                          Активен
                        </Badge>
                      </TableCell>
                      <TableCell className={GTSStyles.text.muted}>15.11.2024</TableCell>
                      <TableCell className={`${GTSStyles.text.primary} font-medium`}>₽ 125,000</TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="sm" variant="ghost" className={`w-8 h-8 p-0 ${GTSStyles.buttons.ghost}`}>
                            <Eye className={GTSStyles.icons.button} />
                          </Button>
                          <Button size="sm" variant="ghost" className={`w-8 h-8 p-0 ${GTSStyles.buttons.ghost}`}>
                            <Edit className={GTSStyles.icons.button} />
                          </Button>
                          <Button size="sm" variant="ghost" className="w-8 h-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10">
                            <Trash2 className={GTSStyles.icons.button} />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </Card>
          </TabsContent>

          {/* Colors Tab */}
          <TabsContent value="colors" className="space-y-8">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Цветовая палитра GTS
                </h2>
                <p className={GTSStyles.text.muted}>
                  Единая тёмная палитра: #0B0B0C (фон), #121214 (поверхности), #17181A (карточки), #91040C (акцент)
                </p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {colorTokens.map((token) => (
                    <ColorToken key={token.name} {...token} />
                  ))}
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Guide Tab */}
          <TabsContent value="guide" className="space-y-8">
            <Card className={GTSStyles.cards.surface}>
              <div className="p-6 border-b border-[#232428]">
                <h2 className={`${GTSComponents.cardTitle} mb-4`} style={{ fontFamily: 'var(--font-heading)' }}>
                  Руководство по использованию
                </h2>
                <p className={GTSStyles.text.muted}>
                  Принципы и правила единой дизайн-системы GTS
                </p>
              </div>

              <div className="p-6 space-y-8">
                {/* Usage Guidelines */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Основные принципы</h3>
                  <div className="space-y-4">
                    <Card className={GTSStyles.cards.content}>
                      <div className="p-4">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>1. Единый тёмный дизайн</h4>
                        <p className={`${GTSStyles.text.muted} text-sm`}>
                          Все компоненты используют тёмную палитру с основным фоном #0B0B0C и карточками #17181A
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.content}>
                      <div className="p-4">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>2. Красный акцент #91040C</h4>
                        <p className={`${GTSStyles.text.muted} text-sm`}>
                          Основной акцентный цвет для кнопок, активных состояний и важных элементов
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.content}>
                      <div className="p-4">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>3. Радиус 16px для карточек</h4>
                        <p className={`${GTSStyles.text.muted} text-sm`}>
                          Все карточки используют радиус округления 16px для современного вида
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.content}>
                      <div className="p-4">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>4. Тонкие контурные иконки</h4>
                        <p className={`${GTSStyles.text.muted} text-sm`}>
                          Используем stroke-2 для всех иконок размеров 16px, 20px, 24px
                        </p>
                      </div>
                    </Card>

                    <Card className={GTSStyles.cards.content}>
                      <div className="p-4">
                        <h4 className={`${GTSStyles.text.primary} font-medium mb-2`}>5. Никаких белых системных кнопок</h4>
                        <p className={`${GTSStyles.text.muted} text-sm`}>
                          Все кнопки стилизованы под единый дизайн с красными акцентами и тёмными тонами
                        </p>
                      </div>
                    </Card>
                  </div>
                </div>

                {/* Import Instructions */}
                <div>
                  <h3 className={`${GTSStyles.text.primary} font-medium mb-4`}>Как использовать</h3>
                  <Card className={GTSStyles.cards.content}>
                    <div className="p-4">
                      <div className="space-y-3">
                        <div>
                          <h4 className={`${GTSStyles.text.primary} text-sm font-medium mb-1`}>1. Импорт стилей</h4>
                          <code className={`${GTSStyles.text.muted} text-xs bg-[#0B0B0C] p-2 rounded block`}>
                            import {`{ GTSStyles, GTSComponents }`} from "../../utils/gts-styles";
                          </code>
                        </div>

                        <div>
                          <h4 className={`${GTSStyles.text.primary} text-sm font-medium mb-1`}>2. Использование карточек</h4>
                          <code className={`${GTSStyles.text.muted} text-xs bg-[#0B0B0C] p-2 rounded block`}>
                            {`<Card className={GTSStyles.cards.default}>`}
                          </code>
                        </div>

                        <div>
                          <h4 className={`${GTSStyles.text.primary} text-sm font-medium mb-1`}>3. Использование кнопок</h4>
                          <code className={`${GTSStyles.text.muted} text-xs bg-[#0B0B0C] p-2 rounded block`}>
                            {`<Button className={GTSStyles.buttons.primary}>`}
                          </code>
                        </div>

                        <div>
                          <h4 className={`${GTSStyles.text.primary} text-sm font-medium mb-1`}>4. Использование иконок</h4>
                          <code className={`${GTSStyles.text.muted} text-xs bg-[#0B0B0C] p-2 rounded block`}>
                            {`<Icon className={GTSStyles.icons.medium} />`}
                          </code>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}