import React, { useState, useRef } from "react";
import { useCMS } from "../../cms/CMSProvider";
import type { Experience, Scenario, TopOffer, VehicleCategory } from "../../cms/cmsTypes";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";
import { 
  Settings, Home, Car, Star, Sparkles, Newspaper, MessageCircle, 
  Crown, Phone, Save, Download, Upload, RotateCcw, Plus, Trash2,
  ChevronDown, ChevronRight, ArrowLeft, ImageIcon, Edit3, Check, X
} from "lucide-react";
import type { Route } from "../GTSRouter";

interface GTSContentAdminProps {
  onNavigate?: (route: Route) => void;
}

type Section = "hero" | "about" | "vehicles" | "offers" | "experiences" | "posts" | "reviews" | "membership" | "footer";

const vehicleIconOptions = ["Car", "Ship", "Plane"] as const;
const vehicleLinkOptions = [
  { value: "ground", label: "Наземный каталог" },
  { value: "water", label: "Водный каталог" },
  { value: "air", label: "Воздушный каталог" },
] as const;
const experienceCategoryOptions = [
  { value: "water", label: "Водные" },
  { value: "ground", label: "Наземные" },
  { value: "air", label: "Воздушные" },
  { value: "services", label: "Premium услуги" },
] as const;

const sections: { id: Section; label: string; icon: React.ElementType }[] = [
  { id: "hero", label: "Главная секция", icon: Home },
  { id: "about", label: "О клубе", icon: Star },
  { id: "vehicles", label: "Категории техники", icon: Car },
  { id: "offers", label: "Топ предложения", icon: Sparkles },
  { id: "experiences", label: "Впечатления", icon: Star },
  { id: "posts", label: "Живая лента", icon: Newspaper },
  { id: "reviews", label: "Отзывы и истории", icon: MessageCircle },
  { id: "membership", label: "Членство", icon: Crown },
  { id: "footer", label: "Контакты и подвал", icon: Phone },
];

// Reusable inline edit field
function EditField({ label, value, onChange, multiline, type = "text" }: {
  label: string; value: string; onChange: (v: string) => void; multiline?: boolean; type?: string;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-white/60 mb-1.5">{label}</label>
      {multiline ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm resize-y min-h-[80px] focus:border-[#91040C]/50 focus:outline-none transition-colors"
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-10 focus:border-[#91040C]/50 focus:outline-none transition-colors"
        />
      )}
    </div>
  );
}

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: readonly { value: string; label: string }[];
  onChange: (value: string) => void;
}) {
  return (
    <div className="mb-4">
      <label className="block text-sm text-white/60 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-white text-sm h-10 focus:border-[#91040C]/50 focus:outline-none transition-colors"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} className="bg-[#111113] text-white">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

function ImagePreview({ src, alt }: { src: string; alt: string }) {
  return src ? (
    <img src={src} alt={alt} className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10" />
  ) : (
    <div className="w-full h-32 bg-white/5 rounded-lg mb-2 flex items-center justify-center border border-white/10">
      <ImageIcon className="w-8 h-8 text-white/20" />
    </div>
  );
}

function PreviewShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="bg-[#111113] border-white/10 p-4 sm:p-5">
      <div className="mb-4">
        <div className="text-white text-sm">{title}</div>
        <div className="text-white/40 text-xs mt-1">{subtitle}</div>
      </div>
      {children}
    </Card>
  );
}

function VehicleCategoryPreview({ category }: { category: VehicleCategory }) {
  return (
    <PreviewShell
      title="Предпросмотр карточки"
      subtitle="Блок «О клубе» -> Категории техники"
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black min-h-[280px]">
        <ImagePreview src={category.image} alt={category.title} />
        <div className="px-5 pb-5">
          <div className="flex items-center justify-between mb-4">
            <Badge className="bg-white/10 text-white border-0">{category.icon}</Badge>
            <Badge className="bg-[#91040C]/20 text-white border-0">{category.stats}</Badge>
          </div>
          <div className="text-white text-2xl mb-2">{category.title}</div>
          <div className="text-white/80 text-sm uppercase tracking-wide mb-3">{category.subtitle}</div>
          <div className="text-white/60 text-sm leading-relaxed mb-4">{category.description}</div>
          <div className="text-[#91040C] text-xs uppercase tracking-[0.18em]">
            Переход: {vehicleLinkOptions.find((option) => option.value === category.link)?.label || category.link}
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function TopOfferPreview({ offer }: { offer: TopOffer }) {
  return (
    <PreviewShell
      title="Предпросмотр карточки"
      subtitle="Блок «Топ предложения» на лендинге"
    >
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#121214]">
        <div className="relative">
          <ImagePreview src={offer.image} alt={offer.title} />
          <div className="absolute top-4 left-4 flex gap-2">
            {offer.badge && <Badge className="bg-[#91040C] text-white border-0">{offer.badge}</Badge>}
            {offer.discount && <Badge className="bg-white text-black border-0">{offer.discount}</Badge>}
          </div>
        </div>
        <div className="p-5">
          <div className="text-[#91040C] text-xs uppercase tracking-[0.18em] mb-2">{offer.subtitle}</div>
          <div className="text-white text-2xl mb-2">{offer.title}</div>
          <div className="text-white/60 text-sm leading-relaxed mb-4">{offer.description}</div>
          <div className="grid grid-cols-1 gap-2 text-center text-xs text-white/50 mb-4 sm:grid-cols-3">
            <div>{offer.duration}</div>
            <div>{offer.location}</div>
            <div>{offer.capacity}</div>
          </div>
          <div className="flex items-end justify-between border-t border-white/10 pt-4">
            <div>
              {offer.originalPrice && <div className="text-white/30 line-through text-sm">{offer.originalPrice} ₽</div>}
              <div className="text-white text-xl">{offer.price} ₽</div>
            </div>
            <Badge className="bg-white/10 text-white border-0">★ {offer.rating}</Badge>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ExperiencePreview({ experience }: { experience: Experience }) {
  const categoryLabel =
    experienceCategoryOptions.find((option) => option.value === experience.category)?.label || experience.category;

  return (
    <PreviewShell
      title="Предпросмотр карточки"
      subtitle="Блок «Впечатления» на лендинге"
    >
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <ImagePreview src={experience.image} alt={experience.title} />
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            {experience.isNew && <Badge className="bg-[#91040C] text-white border-0 text-xs">NEW</Badge>}
            {experience.isPopular && <Badge className="bg-black text-white border-0 text-xs">ПОПУЛЯРНО</Badge>}
            <Badge className="bg-black/5 text-black/70 border-0 text-xs">{categoryLabel}</Badge>
          </div>
          <div className="text-[#91040C] text-xs uppercase tracking-[0.18em] mb-2">{experience.subtitle}</div>
          <div className="text-black text-2xl mb-2">{experience.title}</div>
          <div className="text-black/60 text-sm leading-relaxed mb-4">{experience.description}</div>
          <div className="grid grid-cols-1 gap-2 text-center text-xs text-black/60 mb-4 sm:grid-cols-3">
            <div>{experience.duration}</div>
            <div>{experience.capacity}</div>
            <div>{experience.location}</div>
          </div>
          <div className="border-t border-black/10 pt-4 text-black text-xl">{experience.price} ₽</div>
        </div>
      </div>
    </PreviewShell>
  );
}

function ScenarioPreview({ scenario }: { scenario: Scenario }) {
  return (
    <PreviewShell
      title="Предпросмотр сценария"
      subtitle="Блок «Готовые сценарии»"
    >
      <div className="overflow-hidden rounded-2xl border border-black/10 bg-white">
        <ImagePreview src={scenario.image} alt={scenario.title} />
        <div className="p-5">
          {scenario.badge && <Badge className="bg-[#91040C] text-white border-0 mb-3">{scenario.badge}</Badge>}
          <div className="text-black text-2xl mb-2">{scenario.title}</div>
          <div className="text-black/60 text-sm leading-relaxed mb-4">{scenario.description}</div>
          <div className="flex items-center justify-between border-t border-black/10 pt-4">
            <div className="text-black/60 text-sm">{scenario.duration}</div>
            <div className="text-black text-xl">{scenario.price} ₽</div>
          </div>
        </div>
      </div>
    </PreviewShell>
  );
}

export function GTSContentAdmin({ onNavigate }: GTSContentAdminProps) {
  const cms = useCMS();
  const { data } = cms;
  const [activeSection, setActiveSection] = useState<Section>("hero");
  const [notification, setNotification] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleExport = () => {
    const json = cms.exportData();
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gts-cms-data.json";
    a.click();
    URL.revokeObjectURL(url);
    showNotification("✅ Данные экспортированы");
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const ok = cms.importData(reader.result as string);
      showNotification(ok ? "✅ Данные импортированы" : "❌ Ошибка импорта");
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleReset = () => {
    if (confirm("Сбросить все данные к значениям по умолчанию?")) {
      cms.resetToDefaults();
      showNotification("✅ Данные сброшены");
    }
  };

  const removeWithConfirm = (entityName: string, onDelete: () => void, successMessage: string) => {
    if (!confirm(`Удалить «${entityName}»?`)) {
      return;
    }

    onDelete();
    showNotification(successMessage);
  };

  // --- SECTION RENDERERS ---

  const renderHero = () => (
    <div>
      <h3 className="text-xl text-white mb-6">Главная секция (Hero)</h3>
      <EditField label="Заголовок" value={data.hero.title} onChange={v => cms.updateHero({ title: v })} />
      <EditField label="Акцент (красный текст)" value={data.hero.titleAccent} onChange={v => cms.updateHero({ titleAccent: v })} />
      <EditField label="Подзаголовок" value={data.hero.subtitle} onChange={v => cms.updateHero({ subtitle: v })} multiline />
      <EditField label="Приветствие чат-бота" value={data.hero.chatBotGreeting} onChange={v => cms.updateHero({ chatBotGreeting: v })} />
    </div>
  );

  const renderAbout = () => (
    <div>
      <h3 className="text-xl text-white mb-6">О клубе</h3>
      <EditField label="Бейдж" value={data.about.badge} onChange={v => cms.updateAbout({ badge: v })} />
      <EditField label="Заголовок" value={data.about.title} onChange={v => cms.updateAbout({ title: v })} />
      <EditField label="Акцент заголовка" value={data.about.titleAccent} onChange={v => cms.updateAbout({ titleAccent: v })} />
      <EditField label="Описание" value={data.about.description} onChange={v => cms.updateAbout({ description: v })} multiline />
      <EditField label="Дополнительное описание" value={data.about.subdescription} onChange={v => cms.updateAbout({ subdescription: v })} multiline />
      
      <h4 className="text-lg text-white mt-8 mb-4">Статистика</h4>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <EditField label="Членов клуба" value={data.about.stats.members} onChange={v => cms.updateAbout({ stats: { ...data.about.stats, members: v } })} />
        <EditField label="Единиц техники" value={data.about.stats.vehicles} onChange={v => cms.updateAbout({ stats: { ...data.about.stats, vehicles: v } })} />
        <EditField label="Маршрутов" value={data.about.stats.routes} onChange={v => cms.updateAbout({ stats: { ...data.about.stats, routes: v } })} />
        <EditField label="Поддержка" value={data.about.stats.support} onChange={v => cms.updateAbout({ stats: { ...data.about.stats, support: v } })} />
      </div>

      <h4 className="text-lg text-white mt-8 mb-4">Преимущества</h4>
      {data.about.features.map((f, i) => (
        <Card key={f.id} className="bg-white/5 border-white/10 p-4 mb-3">
          <EditField label="Заголовок" value={f.title} onChange={v => {
            const features = [...data.about.features];
            features[i] = { ...f, title: v };
            cms.updateAbout({ features });
          }} />
          <EditField label="Описание" value={f.description} onChange={v => {
            const features = [...data.about.features];
            features[i] = { ...f, description: v };
            cms.updateAbout({ features });
          }} />
        </Card>
      ))}
    </div>
  );

  const renderVehicles = () => (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl text-white">Категории техники</h3>
          <p className="text-white/40 text-sm mt-1">Карточки из блока «О клубе». Держи этот список компактным: визуально лучше всего работают 3 категории.</p>
        </div>
        <Button
          onClick={() => {
            cms.addVehicleCategory({
              id: `vc-${Date.now()}`, icon: "Car", title: "Новая категория",
              subtitle: "Описание", description: "Подробное описание",
              stats: "0 единиц", image: "", link: "ground"
            });
            showNotification("✅ Категория техники добавлена в конец списка");
          }}
          className="w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить
        </Button>
      </div>
      {data.vehicleCategories.map(cat => (
        <Card key={cat.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="text-white font-medium">{cat.title}</div>
              <div className="text-white/40 text-xs mt-1">ID: {cat.id}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWithConfirm(cat.title, () => cms.deleteVehicleCategory(cat.id), "🗑️ Категория техники удалена")}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
            <div>
              <EditField label="Заголовок" value={cat.title} onChange={v => cms.updateVehicleCategory(cat.id, { title: v })} />
              <EditField label="Подзаголовок" value={cat.subtitle} onChange={v => cms.updateVehicleCategory(cat.id, { subtitle: v })} />
              <EditField label="Описание" value={cat.description} onChange={v => cms.updateVehicleCategory(cat.id, { description: v })} multiline />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
                <EditField label="Статистика" value={cat.stats} onChange={v => cms.updateVehicleCategory(cat.id, { stats: v })} />
                <SelectField
                  label="Иконка"
                  value={cat.icon}
                  options={vehicleIconOptions.map((option) => ({ value: option, label: option }))}
                  onChange={(value) => cms.updateVehicleCategory(cat.id, { icon: value })}
                />
              </div>
              <EditField label="URL изображения" value={cat.image} onChange={v => cms.updateVehicleCategory(cat.id, { image: v })} />
              <SelectField
                label="Куда ведёт карточка"
                value={cat.link}
                options={vehicleLinkOptions}
                onChange={(value) => cms.updateVehicleCategory(cat.id, { link: value })}
              />
            </div>
            <VehicleCategoryPreview category={cat} />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderOffers = () => (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl text-white">Топ предложения</h3>
          <p className="text-white/40 text-sm mt-1">Этот блок визуально лучше всего работает до 3 карточек. Всё лишнее стоит либо переносить, либо скрывать.</p>
        </div>
        <Button
          onClick={() => {
            cms.addTopOffer({
              id: `offer-${Date.now()}`, title: "Новое предложение", subtitle: "Тип",
              description: "Описание", image: "", price: "0", duration: "1 час",
              location: "Сочи", capacity: "До 4 человек", rating: 5.0, reviewsCount: 0,
              features: []
            });
            showNotification("✅ Топ-предложение добавлено в конец списка");
          }}
          className="w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить
        </Button>
      </div>
      {data.topOffers.map(offer => (
        <Card key={offer.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-white font-medium">{offer.title}</span>
              <div className="text-white/40 text-xs mt-1">ID: {offer.id}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWithConfirm(offer.title, () => cms.deleteTopOffer(offer.id), "🗑️ Топ-предложение удалено")}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
            <div>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <EditField label="Заголовок" value={offer.title} onChange={v => cms.updateTopOffer(offer.id, { title: v })} />
                <EditField label="Подзаголовок" value={offer.subtitle} onChange={v => cms.updateTopOffer(offer.id, { subtitle: v })} />
                <EditField label="Цена" value={offer.price} onChange={v => cms.updateTopOffer(offer.id, { price: v })} />
                <EditField label="Старая цена" value={offer.originalPrice || ""} onChange={v => cms.updateTopOffer(offer.id, { originalPrice: v || undefined })} />
                <EditField label="Длительность" value={offer.duration} onChange={v => cms.updateTopOffer(offer.id, { duration: v })} />
                <EditField label="Локация" value={offer.location} onChange={v => cms.updateTopOffer(offer.id, { location: v })} />
                <EditField label="Вместимость" value={offer.capacity} onChange={v => cms.updateTopOffer(offer.id, { capacity: v })} />
                <EditField label="Бейдж" value={offer.badge || ""} onChange={v => cms.updateTopOffer(offer.id, { badge: v || undefined })} />
                <EditField label="Скидка" value={offer.discount || ""} onChange={v => cms.updateTopOffer(offer.id, { discount: v || undefined })} />
                <EditField label="Рейтинг" value={String(offer.rating)} onChange={v => cms.updateTopOffer(offer.id, { rating: Number(v) || 0 })} type="number" />
              </div>
              <EditField label="Описание" value={offer.description} onChange={v => cms.updateTopOffer(offer.id, { description: v })} multiline />
              <EditField label="URL изображения" value={offer.image} onChange={v => cms.updateTopOffer(offer.id, { image: v })} />
              <EditField label="Фичи (через запятую)" value={offer.features.join(", ")} onChange={v => cms.updateTopOffer(offer.id, { features: v.split(",").map(s => s.trim()).filter(Boolean) })} />
            </div>
            <TopOfferPreview offer={offer} />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderExperiences = () => (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h3 className="text-xl text-white">Впечатления</h3>
          <p className="text-white/40 text-sm mt-1">Здесь важнее всего не ошибиться с категорией: сайт понимает только water / ground / air / services.</p>
        </div>
        <Button
          onClick={() => {
            cms.addExperience({
              id: `exp-${Date.now()}`, title: "Новое впечатление", subtitle: "Тип",
              description: "Описание", image: "", price: "от 0",
              duration: "1 час", capacity: "До 4 чел", location: "Сочи", category: "water"
            });
            showNotification("✅ Впечатление добавлено в конец списка");
          }}
          className="w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить
        </Button>
      </div>
      {data.experiences.map(exp => (
        <Card key={exp.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-white font-medium">{exp.title}</span>
              <Badge className="ml-2 bg-white/10 text-white/70 border-0 text-xs">{exp.category}</Badge>
              <div className="text-white/40 text-xs mt-1">ID: {exp.id}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWithConfirm(exp.title, () => cms.deleteExperience(exp.id), "🗑️ Впечатление удалено")}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
            <div>
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <EditField label="Заголовок" value={exp.title} onChange={v => cms.updateExperience(exp.id, { title: v })} />
                <EditField label="Подзаголовок" value={exp.subtitle} onChange={v => cms.updateExperience(exp.id, { subtitle: v })} />
                <EditField label="Цена" value={exp.price} onChange={v => cms.updateExperience(exp.id, { price: v })} />
                <EditField label="Длительность" value={exp.duration} onChange={v => cms.updateExperience(exp.id, { duration: v })} />
                <EditField label="Вместимость" value={exp.capacity} onChange={v => cms.updateExperience(exp.id, { capacity: v })} />
                <EditField label="Локация" value={exp.location} onChange={v => cms.updateExperience(exp.id, { location: v })} />
                <SelectField
                  label="Категория"
                  value={exp.category}
                  options={experienceCategoryOptions}
                  onChange={(value) => cms.updateExperience(exp.id, { category: value })}
                />
              </div>
              <EditField label="Описание" value={exp.description} onChange={v => cms.updateExperience(exp.id, { description: v })} multiline />
              <EditField label="URL изображения" value={exp.image} onChange={v => cms.updateExperience(exp.id, { image: v })} />
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                  <input type="checkbox" checked={exp.isNew || false} onChange={e => cms.updateExperience(exp.id, { isNew: e.target.checked })} className="accent-[#91040C]" />
                  NEW
                </label>
                <label className="flex items-center gap-2 text-white/60 text-sm cursor-pointer">
                  <input type="checkbox" checked={exp.isPopular || false} onChange={e => cms.updateExperience(exp.id, { isPopular: e.target.checked })} className="accent-[#91040C]" />
                  Популярно
                </label>
              </div>
            </div>
            <ExperiencePreview experience={exp} />
          </div>
        </Card>
      ))}

      <h3 className="text-xl text-white mt-10 mb-6">Сценарии</h3>
      <Button
        onClick={() => {
          cms.addScenario({
            id: `sc-${Date.now()}`, title: "Новый сценарий",
            description: "Описание сценария", experiences: [], price: "от 0",
            image: "", duration: "1 час"
          });
          showNotification("✅ Сценарий добавлен в конец списка");
        }}
        className="bg-[#91040C] hover:bg-[#91040C]/80 text-white mb-4"
      >
        <Plus className="w-4 h-4 mr-2" /> Добавить сценарий
      </Button>
      {data.scenarios.map(sc => (
        <Card key={sc.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-white font-medium">{sc.title}</span>
              <div className="text-white/40 text-xs mt-1">ID: {sc.id}</div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeWithConfirm(sc.title, () => cms.deleteScenario(sc.id), "🗑️ Сценарий удалён")}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
            <div>
              <EditField label="Заголовок" value={sc.title} onChange={v => cms.updateScenario(sc.id, { title: v })} />
              <EditField label="Описание" value={sc.description} onChange={v => cms.updateScenario(sc.id, { description: v })} multiline />
              <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
                <EditField label="Цена" value={sc.price} onChange={v => cms.updateScenario(sc.id, { price: v })} />
                <EditField label="Длительность" value={sc.duration} onChange={v => cms.updateScenario(sc.id, { duration: v })} />
              </div>
              <EditField label="URL изображения" value={sc.image} onChange={v => cms.updateScenario(sc.id, { image: v })} />
              <EditField label="Бейдж" value={sc.badge || ""} onChange={v => cms.updateScenario(sc.id, { badge: v || undefined })} />
            </div>
            <ScenarioPreview scenario={sc} />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderPosts = () => (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-xl text-white">Живая лента (Новости)</h3>
        <Button
          onClick={() => cms.addPost({
            id: `post-${Date.now()}`, type: "news", authorId: data.postAuthors[0]?.id || "gts-team",
            title: "Новая публикация", content: "Содержание поста",
            tags: [], date: new Date().toLocaleDateString("ru-RU"),
            views: 0, likes: 0, comments: 0
          })}
          className="w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить
        </Button>
      </div>
      {data.posts.map(post => (
        <Card key={post.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <span className="text-white font-medium">{post.title}</span>
              <Badge className="ml-2 bg-white/10 text-white/70 border-0 text-xs">{post.type}</Badge>
            </div>
            <Button variant="ghost" size="sm" onClick={() => cms.deletePost(post.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          {post.image && <ImagePreview src={post.image} alt={post.title} />}
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <EditField label="Заголовок" value={post.title} onChange={v => cms.updatePost(post.id, { title: v })} />
            <EditField label="Тип (news/guide_story/partner/review/offer)" value={post.type} onChange={v => cms.updatePost(post.id, { type: v as any })} />
            <EditField label="Дата" value={post.date} onChange={v => cms.updatePost(post.id, { date: v })} />
            <EditField label="ID автора" value={post.authorId} onChange={v => cms.updatePost(post.id, { authorId: v })} />
          </div>
          <EditField label="Содержание" value={post.content} onChange={v => cms.updatePost(post.id, { content: v })} multiline />
          <EditField label="URL изображения" value={post.image || ""} onChange={v => cms.updatePost(post.id, { image: v || undefined })} />
          <EditField label="Теги (через запятую)" value={post.tags.join(", ")} onChange={v => cms.updatePost(post.id, { tags: v.split(",").map(s => s.trim()).filter(Boolean) })} />
        </Card>
      ))}
    </div>
  );

  const renderReviews = () => (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <h3 className="text-xl text-white">Отзывы клиентов</h3>
        <Button
          onClick={() => cms.addReview({
            id: `r-${Date.now()}`, name: "Новый клиент", avatar: "",
            rating: 5, date: new Date().toLocaleDateString("ru-RU"),
            text: "Отзыв", service: "Услуга", verified: true
          })}
          className="w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
        >
          <Plus className="w-4 h-4 mr-2" /> Добавить отзыв
        </Button>
      </div>
      {data.reviews.map(review => (
        <Card key={review.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <span className="text-white font-medium">{review.name}</span>
            <Button variant="ghost" size="sm" onClick={() => cms.deleteReview(review.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <EditField label="Имя" value={review.name} onChange={v => cms.updateReview(review.id, { name: v })} />
            <EditField label="Дата" value={review.date} onChange={v => cms.updateReview(review.id, { date: v })} />
            <EditField label="Услуга" value={review.service} onChange={v => cms.updateReview(review.id, { service: v })} />
            <EditField label="Рейтинг (1-5)" value={String(review.rating)} onChange={v => cms.updateReview(review.id, { rating: Number(v) || 5 })} type="number" />
          </div>
          <EditField label="Текст отзыва" value={review.text} onChange={v => cms.updateReview(review.id, { text: v })} multiline />
          <EditField label="URL аватара" value={review.avatar} onChange={v => cms.updateReview(review.id, { avatar: v })} />
        </Card>
      ))}

      <h3 className="text-xl text-white mt-10 mb-6">Истории гостей</h3>
      <Button
        onClick={() => cms.addGuestStory({
          id: `gs-${Date.now()}`, author: "Новый автор", avatar: "",
          date: "Сегодня", type: "photo", content: "", caption: "Описание",
          likes: 0, comments: 0, service: "Услуга"
        })}
        className="mb-4 w-full bg-[#91040C] text-white hover:bg-[#91040C]/80 sm:w-auto"
      >
        <Plus className="w-4 h-4 mr-2" /> Добавить историю
      </Button>
      {data.guestStories.map(story => (
        <Card key={story.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <span className="text-white font-medium">{story.author}</span>
            <Button variant="ghost" size="sm" onClick={() => cms.deleteGuestStory(story.id)} className="text-red-400 hover:text-red-300 hover:bg-red-500/10">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <EditField label="Автор" value={story.author} onChange={v => cms.updateGuestStory(story.id, { author: v })} />
            <EditField label="Дата" value={story.date} onChange={v => cms.updateGuestStory(story.id, { date: v })} />
            <EditField label="Тип (photo/video)" value={story.type} onChange={v => cms.updateGuestStory(story.id, { type: v as any })} />
            <EditField label="Услуга" value={story.service} onChange={v => cms.updateGuestStory(story.id, { service: v })} />
            <EditField label="Локация" value={story.location || ""} onChange={v => cms.updateGuestStory(story.id, { location: v || undefined })} />
          </div>
          <EditField label="Подпись" value={story.caption} onChange={v => cms.updateGuestStory(story.id, { caption: v })} multiline />
          <EditField label="URL контента (фото/видео)" value={story.content} onChange={v => cms.updateGuestStory(story.id, { content: v })} />
          <EditField label="URL аватара" value={story.avatar} onChange={v => cms.updateGuestStory(story.id, { avatar: v })} />
        </Card>
      ))}
    </div>
  );

  const renderMembership = () => (
    <div>
      <h3 className="text-xl text-white mb-6">Тарифы членства</h3>
      {data.membershipTiers.map(tier => (
        <Card key={tier.id} className="bg-white/5 border-white/10 p-5 mb-4">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <span className="text-white font-medium">{tier.name}</span>
            {tier.isPopular && <Badge className="bg-[#91040C] text-white border-0 text-xs">ПОПУЛЯРНЫЙ</Badge>}
          </div>
          <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
            <EditField label="Название" value={tier.name} onChange={v => cms.updateMembershipTier(tier.id, { name: v })} />
            <EditField label="Цена" value={tier.price} onChange={v => cms.updateMembershipTier(tier.id, { price: v })} />
            <EditField label="Период" value={tier.period} onChange={v => cms.updateMembershipTier(tier.id, { period: v })} />
          </div>
          <EditField label="Описание" value={tier.description} onChange={v => cms.updateMembershipTier(tier.id, { description: v })} multiline />
        </Card>
      ))}
    </div>
  );

  const renderFooter = () => (
    <div>
      <h3 className="text-xl text-white mb-6">Контактная информация</h3>
      <EditField label="Описание компании" value={data.footer.description} onChange={v => cms.updateFooter({ description: v })} multiline />
      
      <h4 className="text-lg text-white mt-6 mb-4">Контакты</h4>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-2">
        <EditField label="Телефон" value={data.footer.contact.phone} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, phone: v } })} />
        <EditField label="Примечание к телефону" value={data.footer.contact.phoneNote} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, phoneNote: v } })} />
        <EditField label="Email" value={data.footer.contact.email} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, email: v } })} />
        <EditField label="Примечание к email" value={data.footer.contact.emailNote} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, emailNote: v } })} />
        <EditField label="Адрес" value={data.footer.contact.address} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, address: v } })} />
        <EditField label="Примечание к адресу" value={data.footer.contact.addressNote} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, addressNote: v } })} />
      </div>

      <h4 className="text-lg text-white mt-6 mb-4">Социальные сети</h4>
      <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3">
        <EditField label="Instagram" value={data.footer.contact.socialLinks.instagram} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, socialLinks: { ...data.footer.contact.socialLinks, instagram: v } } })} />
        <EditField label="Facebook" value={data.footer.contact.socialLinks.facebook} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, socialLinks: { ...data.footer.contact.socialLinks, facebook: v } } })} />
        <EditField label="YouTube" value={data.footer.contact.socialLinks.youtube} onChange={v => cms.updateFooter({ contact: { ...data.footer.contact, socialLinks: { ...data.footer.contact.socialLinks, youtube: v } } })} />
      </div>

      <h4 className="text-lg text-white mt-6 mb-4">Блок членства в подвале</h4>
      <EditField label="Заголовок" value={data.footer.membershipCTA.title} onChange={v => cms.updateFooter({ membershipCTA: { ...data.footer.membershipCTA, title: v } })} />
      <EditField label="Описание" value={data.footer.membershipCTA.description} onChange={v => cms.updateFooter({ membershipCTA: { ...data.footer.membershipCTA, description: v } })} multiline />
      <EditField label="Текст кнопки" value={data.footer.membershipCTA.buttonText} onChange={v => cms.updateFooter({ membershipCTA: { ...data.footer.membershipCTA, buttonText: v } })} />
      
      <h4 className="text-lg text-white mt-6 mb-4">Прочее</h4>
      <EditField label="Копирайт" value={data.footer.copyright} onChange={v => cms.updateFooter({ copyright: v })} />
      <EditField label="Услуги в подвале (через запятую)" value={data.footer.services.join(", ")} onChange={v => cms.updateFooter({ services: v.split(",").map(s => s.trim()).filter(Boolean) })} />
    </div>
  );

  const renderSection = () => {
    switch (activeSection) {
      case "hero": return renderHero();
      case "about": return renderAbout();
      case "vehicles": return renderVehicles();
      case "offers": return renderOffers();
      case "experiences": return renderExperiences();
      case "posts": return renderPosts();
      case "reviews": return renderReviews();
      case "membership": return renderMembership();
      case "footer": return renderFooter();
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B]">
      {/* Header */}
      <div className="bg-[#111113] border-b border-white/10 px-4 py-4 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
            {onNavigate && (
              <Button variant="ghost" size="sm" onClick={() => onNavigate({ page: "admin" })} className="w-full text-white/60 hover:text-white hover:bg-white/5 sm:w-auto">
                <ArrowLeft className="w-4 h-4 mr-2" /> К разделам
              </Button>
            )}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#91040C] rounded-lg flex items-center justify-center">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-white text-lg font-medium">GTS Content Manager</h1>
                <div className="mt-1 flex flex-wrap items-center gap-2">
                  <p className="text-white/40 text-xs">Управление контентом сайта</p>
                  <Badge
                    className={`border-0 text-[10px] ${
                      cms.syncError
                        ? "bg-red-500/15 text-red-300"
                        : cms.isSyncing
                          ? "bg-white/10 text-white/70"
                          : cms.syncMode === "remote"
                            ? "bg-emerald-500/15 text-emerald-300"
                            : "bg-amber-500/15 text-amber-300"
                    }`}
                  >
                    {cms.syncError
                      ? "Локально"
                      : cms.isSyncing
                        ? "Синхронизация..."
                        : cms.syncMode === "remote"
                          ? "Общий Supabase"
                          : "Локальный режим"}
                  </Badge>
                </div>
                {cms.syncError && (
                  <p className="mt-1 max-w-xl text-[11px] text-red-300/80">
                    {cms.syncError}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
            <Button variant="ghost" size="sm" onClick={handleExport} className="w-full text-white/60 hover:text-white hover:bg-white/5 sm:w-auto">
              <Download className="w-4 h-4 mr-2" /> Экспорт
            </Button>
            <Button variant="ghost" size="sm" onClick={() => fileInputRef.current?.click()} className="w-full text-white/60 hover:text-white hover:bg-white/5 sm:w-auto">
              <Upload className="w-4 h-4 mr-2" /> Импорт
            </Button>
            <input ref={fileInputRef} type="file" accept=".json" onChange={handleImport} className="hidden" />
            <Button variant="ghost" size="sm" onClick={handleReset} className="w-full text-red-400 hover:text-red-300 hover:bg-red-500/10 sm:w-auto">
              <RotateCcw className="w-4 h-4 mr-2" /> Сброс
            </Button>
          </div>
        </div>
      </div>

      {/* Notification */}
      {notification && (
        <div className="fixed left-4 right-4 top-4 z-50 rounded-lg border border-white/20 bg-[#1a1a1c] px-4 py-3 text-white shadow-xl animate-in fade-in sm:left-auto sm:right-4 sm:max-w-sm">
          {notification}
        </div>
      )}

      <div className="mx-auto flex max-w-7xl flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full flex-shrink-0 overflow-x-auto border-b border-white/10 bg-[#111113] p-3 lg:w-60 lg:min-h-[calc(100vh-65px)] lg:border-b-0 lg:border-r lg:p-4">
          <nav className="flex min-w-max gap-1 lg:block lg:min-w-0 lg:space-y-1">
            {sections.map(sec => (
              <button
                key={sec.id}
                onClick={() => setActiveSection(sec.id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm whitespace-nowrap transition-all lg:w-full ${
                  activeSection === sec.id
                    ? "bg-[#91040C]/20 text-white border border-[#91040C]/30"
                    : "text-white/60 hover:text-white hover:bg-white/5 border border-transparent"
                }`}
              >
                <sec.icon className="w-4 h-4 flex-shrink-0" />
                {sec.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 p-4 sm:p-6 lg:max-h-[calc(100vh-65px)] lg:overflow-y-auto lg:p-8">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
