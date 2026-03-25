import { useState } from "react";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Separator } from "../ui/separator";
import { 
  Wand2, 
  Copy, 
  Download, 
  Eye, 
  Sparkles, 
  FileText, 
  Image, 
  Hash,
  RefreshCw,
  CheckCircle,
  Settings,
  Zap,
  Target,
  Users,
  Camera,
  MapPin,
  Clock,
  DollarSign,
  Star
} from "lucide-react";

interface ContentTemplate {
  id: string;
  name: string;
  category: string;
  description: string;
  fields: string[];
  example: string;
}

interface GeneratedContent {
  title: string;
  description: string;
  shortDescription: string;
  hashtags: string[];
  seoKeywords: string[];
  socialMedia: {
    instagram: string;
    telegram: string;
    vk: string;
  };
  targetAudience: string;
  callToAction: string;
}

export function GTSAIContentGenerator() {
  const [selectedTemplate, setSelectedTemplate] = useState<ContentTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTab, setSelectedTab] = useState("service");

  const serviceTemplates: ContentTemplate[] = [
    {
      id: "yacht-tour",
      name: "Яхт-тур",
      category: "Водные развлечения",
      description: "Создание описания для яхтенных туров и морских прогулок",
      fields: ["Тип яхты", "Продолжительность", "Маршрут", "Включенные услуги", "Максимум гостей"],
      example: "Роскошная яхта Azimut для морских прогулок по побережью Сочи"
    },
    {
      id: "atv-adventure",
      name: "ATV приключение",
      category: "Наземный транспорт",
      description: "Описание квадроциклетных туров и off-road приключений",
      fields: ["Модель ATV", "Сложность маршрута", "Длительность", "Ландшафт", "Уровень подготовки"],
      example: "Экстремальный тур на квадроциклах Can-Am по горным тропам Красной Поляны"
    },
    {
      id: "helicopter-tour",
      name: "Вертолетная экскурсия",
      category: "Воздушные туры",
      description: "Создание контента для вертолетных экскурсий",
      fields: ["Тип вертолета", "Высота полета", "Достопримечательности", "Время полета", "Погодные условия"],
      example: "Панорамный полет на Robinson R44 над Олимпийским парком"
    }
  ];

  const equipmentTemplates: ContentTemplate[] = [
    {
      id: "jetski",
      name: "Гидроцикл",
      category: "Водная техника",
      description: "Описание гидроциклов для аренды",
      fields: ["Модель", "Мощность", "Максимальная скорость", "Вместимость", "Особенности безопасности"],
      example: "Yamaha WaveRunner VX Cruiser для водных развлечений"
    },
    {
      id: "snowmobile",
      name: "Снегоход",
      category: "Зимняя техника", 
      description: "Контент для снегоходов и зимних туров",
      fields: ["Модель", "Тип двигателя", "Проходимость", "Комфорт", "Зимние характеристики"],
      example: "Ski-Doo Summit для горных зимних маршрутов"
    }
  ];

  const mockGeneration = (): GeneratedContent => {
    const templates = {
      title: `${formData.name || 'Премиальная услуга'} - Эксклюзивный опыт с GTS`,
      description: `Откройте для себя незабываемое приключение с ${formData.name || 'нашей услугой'}. Профессиональные гиды, современное оборудование и внимание к каждой детали создают идеальные условия для отдыха. Безопасность, комфорт и яркие эмоции гарантированы.`,
      shortDescription: `${formData.name || 'Премиальная услуга'} с профессиональным сопровождением`,
      hashtags: [
        "#GTSSochi", "#PremiumTours", "#SochiAdventure", "#LuxuryTravel", 
        "#ExtremeRussia", "#BlackSeaTours", "#MountainAdventure"
      ],
      seoKeywords: [
        "аренда техники сочи", "туры сочи", "активный отдых", 
        "экстремальный туризм", "премиум развлечения"
      ],
      socialMedia: {
        instagram: `🌊 ${formData.name || 'Невероятное приключение'} ждет вас! \n✨ Премиум сервис от @gts_sochi \n📍 Сочи, Красная Поляна \n#GTSSochi #AdventureTime`,
        telegram: `🚁 Готовы к новым впечатлениям? \n\n${formData.name || 'Наша услуга'} - это:\n🔥 Профессиональное оборудование\n⚡ Опытные инструкторы\n🎯 100% безопасность\n\nБронируйте прямо сейчас!`,
        vk: `🏔️ ${formData.name || 'Экстремальное приключение'} в Сочи!\n\nПочувствуйте адреналин и насладитесь невероятными видами. Профессиональная команда GTS обеспечит безопасность и незабываемые эмоции.`
      },
      targetAudience: "Активные путешественники 25-45 лет, ценящие качественный сервис и новые впечатления",
      callToAction: "Забронируйте свое приключение сегодня и получите скидку 15% на первое бронирование!"
    };
    return templates;
  };

  const handleGenerate = async () => {
    setIsGenerating(true);
    // Симуляция API вызова
    setTimeout(() => {
      setGeneratedContent(mockGeneration());
      setIsGenerating(false);
    }, 2000);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const currentTemplates = selectedTab === "service" ? serviceTemplates : equipmentTemplates;

  return (
    <div className="p-6 bg-[#0B0B0C] min-h-screen">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">AI Content Generator</h1>
            <p className="text-[#A6A7AA]">Создание контента для услуг и оборудования с помощью ИИ</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-green-500/20 text-green-400">
              <Sparkles className="w-3 h-3 mr-1" />
              AI Powered
            </Badge>
          </div>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-[#121214] border-[#232428]">
            <TabsTrigger 
              value="service" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <Target className="w-4 h-4 mr-2" />
              Услуги и туры
            </TabsTrigger>
            <TabsTrigger 
              value="equipment" 
              className="data-[state=active]:bg-[#91040C] data-[state=active]:text-white text-[#A6A7AA]"
            >
              <Settings className="w-4 h-4 mr-2" />
              Оборудование
            </TabsTrigger>
          </TabsList>

          <TabsContent value={selectedTab} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Template Selection & Form */}
              <div className="space-y-6">
                {/* Templates */}
                <Card className="bg-[#121214] border-[#232428] p-6">
                  <h3 className="text-white font-semibold mb-4">Выберите шаблон</h3>
                  <div className="space-y-3">
                    {currentTemplates.map((template) => (
                      <div
                        key={template.id}
                        className={`p-4 rounded-lg cursor-pointer transition-colors ${
                          selectedTemplate?.id === template.id ? 'bg-[#91040C]/20 border border-[#91040C]' : 'bg-[#17181A] hover:bg-[#232428]'
                        }`}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-white font-medium">{template.name}</h4>
                          <Badge variant="outline" className="border-[#232428] text-[#A6A7AA]">
                            {template.category}
                          </Badge>
                        </div>
                        <p className="text-[#A6A7AA] text-sm mb-2">{template.description}</p>
                        <p className="text-[#A6A7AA] text-xs italic">{template.example}</p>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Form */}
                {selectedTemplate && (
                  <Card className="bg-[#121214] border-[#232428] p-6">
                    <h3 className="text-white font-semibold mb-4">Параметры контента</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Название</label>
                        <Input
                          placeholder="Введите название услуги/оборудования"
                          value={formData.name || ""}
                          onChange={(e) => handleFormChange("name", e.target.value)}
                          className="bg-[#17181A] border-[#232428] text-white"
                        />
                      </div>

                      {selectedTemplate.fields.map((field) => (
                        <div key={field}>
                          <label className="text-white text-sm font-medium mb-2 block">{field}</label>
                          <Input
                            placeholder={`Введите ${field.toLowerCase()}`}
                            value={formData[field] || ""}
                            onChange={(e) => handleFormChange(field, e.target.value)}
                            className="bg-[#17181A] border-[#232428] text-white"
                          />
                        </div>
                      ))}

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Целевая аудитория</label>
                        <Select onValueChange={(value) => handleFormChange("audience", value)}>
                          <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                            <SelectValue placeholder="Выберите аудиторию" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#17181A] border-[#232428]">
                            <SelectItem value="families">Семьи с детьми</SelectItem>
                            <SelectItem value="young-adults">Молодежь 18-30</SelectItem>
                            <SelectItem value="professionals">Профессионалы 30-45</SelectItem>
                            <SelectItem value="luxury">Премиум сегмент</SelectItem>
                            <SelectItem value="extreme">Экстремалы</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="text-white text-sm font-medium mb-2 block">Тон контента</label>
                        <Select onValueChange={(value) => handleFormChange("tone", value)}>
                          <SelectTrigger className="bg-[#17181A] border-[#232428] text-white">
                            <SelectValue placeholder="Выберите тон" />
                          </SelectTrigger>
                          <SelectContent className="bg-[#17181A] border-[#232428]">
                            <SelectItem value="professional">Профессиональный</SelectItem>
                            <SelectItem value="friendly">Дружелюбный</SelectItem>
                            <SelectItem value="exciting">Захватывающий</SelectItem>
                            <SelectItem value="luxury">Премиальный</SelectItem>
                            <SelectItem value="casual">Неформальный</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button 
                        onClick={handleGenerate}
                        disabled={isGenerating || !formData.name}
                        className="w-full bg-[#91040C] hover:bg-[#91040C]/80"
                      >
                        {isGenerating ? (
                          <>
                            <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                            Генерируем контент...
                          </>
                        ) : (
                          <>
                            <Wand2 className="w-4 h-4 mr-2" />
                            Сгенерировать контент
                          </>
                        )}
                      </Button>
                    </div>
                  </Card>
                )}
              </div>

              {/* Generated Content */}
              <div className="space-y-6">
                {generatedContent && (
                  <>
                    {/* Main Description */}
                    <Card className="bg-[#121214] border-[#232428] p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-white font-semibold">Основное описание</h3>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleCopy(generatedContent.description)}
                          className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428]"
                        >
                          <Copy className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-white font-medium mb-2">{generatedContent.title}</h4>
                          <p className="text-[#A6A7AA]">{generatedContent.description}</p>
                        </div>
                        
                        <Separator className="bg-[#232428]" />
                        
                        <div>
                          <h5 className="text-white font-medium mb-2">Краткое описание</h5>
                          <p className="text-[#A6A7AA] text-sm">{generatedContent.shortDescription}</p>
                        </div>
                      </div>
                    </Card>

                    {/* SEO & Hashtags */}
                    <Card className="bg-[#121214] border-[#232428] p-6">
                      <h3 className="text-white font-semibold mb-4">SEO и хештеги</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-white font-medium">Хештеги</h5>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCopy(generatedContent.hashtags.join(" "))}
                              className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428]"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.hashtags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="border-[#232428] text-blue-400">
                                <Hash className="w-3 h-3 mr-1" />
                                {tag.replace('#', '')}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h5 className="text-white font-medium">SEO ключевые слова</h5>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleCopy(generatedContent.seoKeywords.join(", "))}
                              className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428]"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {generatedContent.seoKeywords.map((keyword, index) => (
                              <Badge key={index} variant="outline" className="border-[#232428] text-green-400">
                                {keyword}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Card>

                    {/* Social Media */}
                    <Card className="bg-[#121214] border-[#232428] p-6">
                      <h3 className="text-white font-semibold mb-4">Контент для соцсетей</h3>
                      
                      <div className="space-y-4">
                        {Object.entries(generatedContent.socialMedia).map(([platform, content]) => (
                          <div key={platform} className="bg-[#17181A] p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-2">
                              <h5 className="text-white font-medium capitalize">{platform}</h5>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleCopy(content)}
                                className="border-[#232428] text-[#A6A7AA] hover:bg-[#232428]"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            </div>
                            <p className="text-[#A6A7AA] text-sm whitespace-pre-line">{content}</p>
                          </div>
                        ))}
                      </div>
                    </Card>

                    {/* Additional Info */}
                    <Card className="bg-[#121214] border-[#232428] p-6">
                      <h3 className="text-white font-semibold mb-4">Дополнительная информация</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h5 className="text-white font-medium mb-2 flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Целевая аудитория
                          </h5>
                          <p className="text-[#A6A7AA] text-sm">{generatedContent.targetAudience}</p>
                        </div>
                        
                        <div>
                          <h5 className="text-white font-medium mb-2 flex items-center">
                            <Zap className="w-4 h-4 mr-2" />
                            Call to Action
                          </h5>
                          <p className="text-[#A6A7AA] text-sm">{generatedContent.callToAction}</p>
                        </div>
                      </div>
                    </Card>
                  </>
                )}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}