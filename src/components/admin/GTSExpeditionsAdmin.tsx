import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Plus, Pencil, Trash2, ArrowLeft, Save, X, Eye, EyeOff,
  MapPin, Calendar, Clock, Users, Truck, Mountain, ChevronDown,
  ChevronUp, Star, Copy, Search, Filter, GripVertical,
  Check, AlertTriangle, Image as ImageIcon
} from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { useExpeditions, ExpeditionData, DayProgram } from "../../contexts/GTSExpeditionsContext";
import { Route } from "../GTSRouter";

interface GTSExpeditionsAdminProps {
  onNavigate?: (route: Route) => void;
}

/* ═══ Difficulty badge colors ═══ */
const DIFF_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  "Лёгкий": { text: "#22c55e", bg: "rgba(34,197,94,0.12)", border: "rgba(34,197,94,0.3)" },
  "Средний": { text: "#f59e0b", bg: "rgba(245,158,11,0.12)", border: "rgba(245,158,11,0.3)" },
  "Сложный": { text: "#91040C", bg: "rgba(145,4,12,0.12)", border: "rgba(145,4,12,0.3)" },
};

const MONTH_LABELS = [
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ",
] as const;

const MONTH_GENITIVE = [
  "января",
  "февраля",
  "марта",
  "апреля",
  "мая",
  "июня",
  "июля",
  "августа",
  "сентября",
  "октября",
  "ноября",
  "декабря",
] as const;

const MONTH_SHORT = [
  "янв",
  "фев",
  "мар",
  "апр",
  "мая",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
] as const;

function parseDateInput(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateRange(startDate?: string, endDate?: string): string {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);

  if (!start || !end) return "";

  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${String(start.getDate()).padStart(2, "0")} — ${String(end.getDate()).padStart(2, "0")} ${MONTH_GENITIVE[end.getMonth()]}`;
  }

  return `${String(start.getDate()).padStart(2, "0")} ${MONTH_SHORT[start.getMonth()]} — ${String(end.getDate()).padStart(2, "0")} ${MONTH_SHORT[end.getMonth()]}${sameYear ? "" : ` ${end.getFullYear()}`}`;
}

function getInclusiveDayCount(startDate?: string, endDate?: string, fallback = 1): number {
  const start = parseDateInput(startDate);
  const end = parseDateInput(endDate);

  if (!start || !end) return fallback;

  const diff = end.getTime() - start.getTime();
  return diff >= 0 ? Math.floor(diff / 86400000) + 1 : fallback;
}

function normalizeExpeditionDates(expedition: ExpeditionData): ExpeditionData {
  const start = parseDateInput(expedition.startDate);
  const end = parseDateInput(expedition.endDate) ?? start;

  if (!start || !end) {
    return expedition;
  }

  const totalDays = getInclusiveDayCount(expedition.startDate, expedition.endDate, expedition.totalDays);

  return {
    ...expedition,
    endDate: expedition.endDate || expedition.startDate,
    dateRange: formatDateRange(expedition.startDate, expedition.endDate),
    month: MONTH_LABELS[start.getMonth()],
    year: start.getFullYear(),
    totalDays,
    trekDays: Math.min(expedition.trekDays, totalDays),
    restDays: Math.max(0, totalDays - Math.min(expedition.trekDays, totalDays)),
  };
}

function addDaysToIsoDate(value: string | undefined, days: number): string | undefined {
  const date = parseDateInput(value);
  if (!date) return value;
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

/* ═══ Empty expedition template ═══ */
function createEmptyExpedition(id: string): ExpeditionData {
  return normalizeExpeditionDates({
    id,
    title: "",
    tagline: "",
    heroImage: "",
    galleryImages: [],
    dateRange: "",
    startDate: "2026-04-01",
    endDate: "2026-04-03",
    month: "АПРЕЛЬ",
    year: 2026,
    totalDays: 1,
    trekDays: 1,
    restDays: 0,
    distance: "",
    tourType: "Внедорожная экспедиция",
    startLocation: "",
    finishLocation: "",
    region: "",
    transport: "",
    difficulty: "Средний",
    groupSize: 8,
    spotsLeft: 8,
    price: "",
    priceNumber: 0,
    description: "",
    program: [{ day: 1, title: "", description: "", distance: "", highlights: [""] }],
    included: [""],
    notIncluded: [""],
    additionalCosts: [""],
    isActive: true,
    mapX: 1200,
    mapY: 250,
    labelAbove: true,
    isFeatured: false,
    highlights: [""],
  });
}

/* ═══ Reusable Input ═══ */
function AdminInput({ label, value, onChange, placeholder, type = "text", small = false }: {
  label: string; value: string | number; onChange: (v: string) => void; placeholder?: string; type?: string; small?: boolean;
}) {
  return (
    <div className={small ? "flex-1 min-w-0" : "w-full"}>
      <label className="block mb-1.5 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-3 py-2.5 text-white/90 rounded-none outline-none transition-colors"
        style={{
          fontSize: 13,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(145,4,12,0.5)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}

/* ═══ Reusable Textarea ═══ */
function AdminTextarea({ label, value, onChange, placeholder, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void; placeholder?: string; rows?: number;
}) {
  return (
    <div className="w-full">
      <label className="block mb-1.5 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full px-3 py-2.5 text-white/90 rounded-none outline-none resize-y transition-colors"
        style={{
          fontSize: 13,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = "rgba(145,4,12,0.5)"; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
      />
    </div>
  );
}

function AdminReadonly({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block mb-1.5 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>{label}</label>
      <div
        className="w-full px-3 py-2.5 text-white/70"
        style={{
          fontSize: 13,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {value || "—"}
      </div>
    </div>
  );
}

/* ═══ Select dropdown ═══ */
function AdminSelect({ label, value, onChange, options }: {
  label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[];
}) {
  return (
    <div className="flex-1 min-w-0">
      <label className="block mb-1.5 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2.5 text-white/90 rounded-none outline-none cursor-pointer"
        style={{
          fontSize: 13,
          background: "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
        }}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} style={{ background: "#17181A", color: "#fff" }}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/* ═══ Editable list (included/notIncluded/etc) ═══ */
function EditableList({ label, items, onChange }: {
  label: string; items: string[]; onChange: (items: string[]) => void;
}) {
  return (
    <div className="w-full">
      <label className="block mb-2 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>{label}</label>
      <div className="space-y-1.5">
        {items.map((item, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <input
              value={item}
              onChange={(e) => {
                const newItems = [...items];
                newItems[idx] = e.target.value;
                onChange(newItems);
              }}
              className="flex-1 px-3 py-2 text-white/90 rounded-none outline-none"
              style={{
                fontSize: 13,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
              placeholder={`Пункт ${idx + 1}`}
            />
            <button
              onClick={() => {
                const newItems = items.filter((_, i) => i !== idx);
                onChange(newItems.length ? newItems : [""]);
              }}
              className="p-1.5 text-white/30 hover:text-red-500 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={() => onChange([...items, ""])}
        className="mt-2 flex items-center gap-1.5 text-white/40 hover:text-white/70 transition-colors"
        style={{ fontSize: 12 }}
      >
        <Plus className="w-3.5 h-3.5" />
        Добавить
      </button>
    </div>
  );
}

/* ═══ Day program editor ═══ */
function DayProgramEditor({ program, onChange }: {
  program: DayProgram[]; onChange: (program: DayProgram[]) => void;
}) {
  const [expandedDay, setExpandedDay] = useState<number | null>(0);

  return (
    <div className="w-full">
      <label className="block mb-3 uppercase tracking-[0.1em] text-white/40" style={{ fontSize: 10 }}>Программа по дням</label>
      <div className="space-y-2">
        {program.map((day, idx) => (
          <div
            key={idx}
            className="overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.02)" }}
          >
            <button
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-white/[0.03] transition-colors"
              onClick={() => setExpandedDay(expandedDay === idx ? null : idx)}
            >
              <div className="flex items-center gap-3">
                <span
                  className="w-7 h-7 flex items-center justify-center text-white/80"
                  style={{ fontSize: 11, background: "rgba(145,4,12,0.2)", border: "1px solid rgba(145,4,12,0.3)" }}
                >
                  {day.day}
                </span>
                <span className="text-white/80" style={{ fontSize: 13 }}>
                  {day.title || `День ${day.day}`}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    const newProgram = program.filter((_, i) => i !== idx);
                    onChange(newProgram.map((d, i) => ({ ...d, day: i + 1 })));
                  }}
                  className="p-1 text-white/20 hover:text-red-500 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
                {expandedDay === idx ? <ChevronUp className="w-4 h-4 text-white/40" /> : <ChevronDown className="w-4 h-4 text-white/40" />}
              </div>
            </button>

            <AnimatePresence>
              {expandedDay === idx && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <div className="pt-3 flex gap-3">
                      <AdminInput
                        label="Название дня"
                        value={day.title}
                        onChange={(v) => {
                          const newProgram = [...program];
                          newProgram[idx] = { ...day, title: v };
                          onChange(newProgram);
                        }}
                        placeholder="Например: Прибытие · Симферополь"
                      />
                      <AdminInput
                        label="Дистанция"
                        value={day.distance || ""}
                        onChange={(v) => {
                          const newProgram = [...program];
                          newProgram[idx] = { ...day, distance: v };
                          onChange(newProgram);
                        }}
                        placeholder="~120 км"
                        small
                      />
                    </div>
                    <AdminTextarea
                      label="Описание дня"
                      value={day.description}
                      onChange={(v) => {
                        const newProgram = [...program];
                        newProgram[idx] = { ...day, description: v };
                        onChange(newProgram);
                      }}
                      placeholder="Подробное описание дня..."
                      rows={2}
                    />
                    <EditableList
                      label="Хайлайты дня"
                      items={day.highlights}
                      onChange={(highlights) => {
                        const newProgram = [...program];
                        newProgram[idx] = { ...day, highlights };
                        onChange(newProgram);
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          const newDay: DayProgram = {
            day: program.length + 1,
            title: "",
            description: "",
            distance: "",
            highlights: [""],
          };
          onChange([...program, newDay]);
          setExpandedDay(program.length);
        }}
        className="mt-3 flex items-center gap-2 px-4 py-2.5 text-white/50 hover:text-white/80 transition-colors"
        style={{ fontSize: 12, border: "1px dashed rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.02)" }}
      >
        <Plus className="w-4 h-4" />
        Добавить день
      </button>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   EXPEDITION EDITOR FORM
   ════════════════════════════════════════════════════ */
function ExpeditionEditor({
  expedition,
  onSave,
  onCancel,
  isNew,
}: {
  expedition: ExpeditionData;
  onSave: (data: ExpeditionData) => void;
  onCancel: () => void;
  isNew: boolean;
}) {
  const [draft, setDraft] = useState<ExpeditionData>(() => normalizeExpeditionDates({ ...expedition }));
  const [activeTab, setActiveTab] = useState<"general" | "program" | "details" | "map">("general");

  const update = <K extends keyof ExpeditionData>(key: K, value: ExpeditionData[K]) => {
    setDraft((prev) => ({ ...prev, [key]: value }));
  };

  const updateDate = (key: "startDate" | "endDate", value: string) => {
    setDraft((prev) => normalizeExpeditionDates({ ...prev, [key]: value }));
  };

  const tabs = [
    { id: "general" as const, label: "Основное" },
    { id: "program" as const, label: "Программа" },
    { id: "details" as const, label: "Детали" },
    { id: "map" as const, label: "Карта" },
  ];

  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-4 sm:px-6 lg:px-10"
        style={{ background: "rgba(11,11,12,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <button onClick={onCancel} className="p-2 text-white/50 hover:text-white transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="text-white/40 uppercase tracking-[0.12em]" style={{ fontSize: 10 }}>
                {isNew ? "Создание экспедиции" : "Редактирование"}
              </div>
              <div className="text-white" style={{ fontSize: 16 }}>
                {draft.title || "Новая экспедиция"} {draft.tagline && <span className="text-white/40">— {draft.tagline}</span>}
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <motion.button
              className="flex w-full items-center justify-center gap-2 px-4 py-2 text-white/60 transition-colors sm:w-auto"
              style={{ fontSize: 13, border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.9)" }}
              onClick={onCancel}
            >
              <X className="w-4 h-4" />
              Отмена
            </motion.button>
            <motion.button
              className="flex w-full items-center justify-center gap-2 px-5 py-2 text-white sm:w-auto"
              style={{ fontSize: 13, background: "#91040C", border: "1px solid #91040C" }}
              whileHover={{ background: "#6d0309" }}
              onClick={() => onSave(draft)}
            >
              <Save className="w-4 h-4" />
              Сохранить
            </motion.button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 overflow-x-auto px-4 sm:px-6 lg:px-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className="relative shrink-0 px-4 py-3.5 uppercase tracking-[0.1em] transition-colors sm:px-5"
            style={{
              fontSize: 11,
              color: activeTab === tab.id ? "#fff" : "rgba(255,255,255,0.4)",
            }}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="admin-tab-indicator"
                className="absolute bottom-0 left-0 right-0 h-[2px]"
                style={{ background: "#91040C" }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8 lg:px-10">
        <AnimatePresence mode="wait">
          {activeTab === "general" && (
            <motion.div
              key="general"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              {/* Hero image preview */}
              {draft.heroImage && (
                <div className="relative w-full aspect-[21/9] overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
                  <ImageWithFallback src={draft.heroImage} alt="Hero" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C]/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white" style={{ fontSize: 24, letterSpacing: "0.08em" }}>
                    {draft.title || "НАЗВАНИЕ"}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AdminInput label="Название (заголовок)" value={draft.title} onChange={(v) => update("title", v)} placeholder="КРЫМ" />
                <AdminInput label="Подзаголовок (tagline)" value={draft.tagline} onChange={(v) => update("tagline", v)} placeholder="Горы · Перевалы · Побережье" />
              </div>

              <AdminInput label="URL фото Hero" value={draft.heroImage} onChange={(v) => update("heroImage", v)} placeholder="https://images.unsplash.com/..." />

              <AdminTextarea label="Описание" value={draft.description} onChange={(v) => update("description", v)} placeholder="Подробное описание экспедиции..." rows={4} />

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <AdminInput label="Дата старта" value={draft.startDate || ""} onChange={(v) => updateDate("startDate", v)} type="date" />
                <AdminInput label="Дата окончания" value={draft.endDate || ""} onChange={(v) => updateDate("endDate", v)} type="date" />
                <AdminReadonly label="Диапазон дат" value={draft.dateRange} />
                <AdminReadonly label="Месяц старта" value={draft.month} />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <AdminReadonly label="Год" value={draft.year} />
                <AdminReadonly label="Длительность" value={`${draft.totalDays} дн.`} />
                <AdminInput label="Дней в пути" value={draft.trekDays} onChange={(v) => update("trekDays", parseInt(v) || 0)} type="number" />
                <AdminSelect
                  label="Сложность"
                  value={draft.difficulty}
                  onChange={(v) => update("difficulty", v as ExpeditionData["difficulty"])}
                  options={[
                    { value: "Лёгкий", label: "Лёгкий" },
                    { value: "Средний", label: "Средний" },
                    { value: "Сложный", label: "Сложный" },
                  ]}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <AdminReadonly label="Всего дней" value={draft.totalDays} />
                <AdminInput label="Дней отдыха" value={draft.restDays} onChange={(v) => update("restDays", parseInt(v) || 0)} type="number" />
                <AdminInput label="Дистанция" value={draft.distance} onChange={(v) => update("distance", v)} placeholder="~680 км" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                <AdminInput label="Тип тура" value={draft.tourType} onChange={(v) => update("tourType", v)} placeholder="Внедорожная экспедиция" />
                <AdminInput label="Транспорт" value={draft.transport} onChange={(v) => update("transport", v)} placeholder="Land Cruiser 300" />
                <AdminInput label="Регион" value={draft.region} onChange={(v) => update("region", v)} placeholder="Крымский полуостров" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
                <AdminInput label="Старт" value={draft.startLocation} onChange={(v) => update("startLocation", v)} placeholder="Симферополь" />
                <AdminInput label="Финиш" value={draft.finishLocation} onChange={(v) => update("finishLocation", v)} placeholder="Севастополь" />
                <AdminInput label="Размер группы" value={draft.groupSize} onChange={(v) => update("groupSize", parseInt(v) || 1)} type="number" />
                <AdminInput label="Осталось мест" value={draft.spotsLeft} onChange={(v) => update("spotsLeft", parseInt(v) || 0)} type="number" />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <AdminInput label="Цена (отображение)" value={draft.price} onChange={(v) => update("price", v)} placeholder="52 000" />
                <AdminInput label="Цена (число)" value={draft.priceNumber} onChange={(v) => update("priceNumber", parseInt(v) || 0)} type="number" />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="w-10 h-5 rounded-full relative transition-colors cursor-pointer"
                    style={{ background: draft.isActive ? "#91040C" : "rgba(255,255,255,0.15)" }}
                    onClick={() => update("isActive", !draft.isActive)}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ left: draft.isActive ? 22 : 2 }}
                    />
                  </div>
                  <span className="text-white/60 group-hover:text-white/80 transition-colors" style={{ fontSize: 13 }}>Активна (набор открыт)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div
                    className="w-10 h-5 rounded-full relative transition-colors cursor-pointer"
                    style={{ background: draft.isFeatured ? "#91040C" : "rgba(255,255,255,0.15)" }}
                    onClick={() => update("isFeatured", !draft.isFeatured)}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ left: draft.isFeatured ? 22 : 2 }}
                    />
                  </div>
                  <span className="text-white/60 group-hover:text-white/80 transition-colors" style={{ fontSize: 13 }}>Рекомендуемая</span>
                </label>
              </div>

              <EditableList label="Хайлайты (карточка)" items={draft.highlights} onChange={(v) => update("highlights", v)} />
            </motion.div>
          )}

          {activeTab === "program" && (
            <motion.div
              key="program"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <DayProgramEditor program={draft.program} onChange={(p) => update("program", p)} />
            </motion.div>
          )}

          {activeTab === "details" && (
            <motion.div
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-8"
            >
              <EditableList label="Включено в стоимость" items={draft.included} onChange={(v) => update("included", v)} />
              <EditableList label="Не включено" items={draft.notIncluded} onChange={(v) => update("notIncluded", v)} />
              <EditableList label="Дополнительные расходы" items={draft.additionalCosts} onChange={(v) => update("additionalCosts", v)} />
              <EditableList label="URL фото галереи" items={draft.galleryImages.length ? draft.galleryImages : [""]} onChange={(v) => update("galleryImages", v.filter(Boolean))} />
            </motion.div>
          )}

          {activeTab === "map" && (
            <motion.div
              key="map"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-6"
            >
              <div className="p-5" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="text-white/40 uppercase tracking-[0.1em] mb-4" style={{ fontSize: 10 }}>
                  Позиция на шкале экспедиций
                </div>
                <p className="text-white/50 mb-6" style={{ fontSize: 13 }}>
                  Точка на шкале теперь рассчитывается автоматически по дате старта. После удаления других экспедиций пустых дыр не остаётся: шкала всегда пересобирается сама.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AdminReadonly label="Дата старта" value={draft.startDate || "—"} />
                  <AdminReadonly label="Дата окончания" value={draft.endDate || "—"} />
                  <AdminReadonly label="Статус на шкале" value={draft.isActive ? "Активная / будущая" : "Закрыта или архив"} />
                </div>

                <div
                  className="relative mt-6 overflow-hidden"
                  style={{
                    width: "100%",
                    aspectRatio: "12 / 2.8",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div className="absolute inset-x-0 top-1/2 h-px bg-white/10" />
                  <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex">
                    {MONTH_LABELS.map((month) => (
                      <div key={month} className="flex-1 text-center text-white/35 uppercase tracking-[0.12em]" style={{ fontSize: 10 }}>
                        {month.slice(0, 3)}
                      </div>
                    ))}
                  </div>
                  <div
                    className="absolute top-1/2 -translate-y-1/2"
                    style={{
                      left: `calc(${((parseDateInput(draft.startDate)?.getMonth() ?? 0) / 11) * 100}% - 8px)`,
                    }}
                  >
                    <div className="w-4 h-4 rounded-full bg-[#91040C] shadow-[0_0_18px_rgba(145,4,12,0.45)]" />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════
   MAIN ADMIN PANEL
   ════════════════════════════════════════════════════ */
export function GTSExpeditionsAdmin({ onNavigate }: GTSExpeditionsAdminProps) {
  const { expeditions, addExpedition, updateExpedition, deleteExpedition, generateNewId } = useExpeditions();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterDifficulty, setFilterDifficulty] = useState<string>("all");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  /* Filter */
  const filtered = expeditions.filter((e) => {
    const matchesSearch =
      !searchQuery ||
      e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.region.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = filterDifficulty === "all" || e.difficulty === filterDifficulty;
    return matchesSearch && matchesDifficulty;
  });

  /* Create new */
  const handleCreate = () => {
    setEditingId(null);
    setIsCreating(true);
  };

  /* Edit existing */
  const handleEdit = (id: string) => {
    setEditingId(id);
    setIsCreating(false);
  };

  /* Save */
  const handleSave = useCallback(
    async (data: ExpeditionData) => {
      const normalized = normalizeExpeditionDates(data);
      let success = false;

      if (isCreating) {
        success = await addExpedition(normalized);
      } else if (editingId) {
        success = await updateExpedition(normalized);
      }

      if (!success) {
        window.alert("Не удалось сохранить экспедицию в общей базе. Локальные изменения отменены.");
        return;
      }

      setEditingId(null);
      setIsCreating(false);
    },
    [isCreating, editingId, addExpedition, updateExpedition]
  );

  /* Delete */
  const handleDelete = async (id: string) => {
    const success = await deleteExpedition(id);
    if (!success) {
      window.alert("Не удалось удалить экспедицию из общей базы. Локальные изменения отменены.");
      return;
    }
    setDeleteConfirm(null);
  };

  /* Duplicate */
  const handleDuplicate = async (exp: ExpeditionData) => {
    const newId = generateNewId();
    const success = await addExpedition({
      ...normalizeExpeditionDates({
        ...exp,
        startDate: addDaysToIsoDate(exp.startDate, 7),
        endDate: addDaysToIsoDate(exp.endDate, 7),
      }),
      id: newId,
      title: exp.title + " (копия)",
      spotsLeft: exp.groupSize,
    });

    if (!success) {
      window.alert("Не удалось создать копию экспедиции в общей базе. Локальные изменения отменены.");
    }
  };

  /* ═══ EDITOR MODE ═══ */
  if (isCreating) {
    const newId = generateNewId();
    return (
      <ExpeditionEditor
        expedition={createEmptyExpedition(newId)}
        onSave={handleSave}
        onCancel={() => setIsCreating(false)}
        isNew
      />
    );
  }

  if (editingId) {
    const exp = expeditions.find((e) => e.id === editingId);
    if (!exp) return null;
    return (
      <ExpeditionEditor
        expedition={exp}
        onSave={handleSave}
        onCancel={() => setEditingId(null)}
        isNew={false}
      />
    );
  }

  /* ═══ LIST MODE ═══ */
  return (
    <div className="min-h-screen bg-[#0B0B0C]">
      {/* Header */}
      <div
        className="sticky top-0 z-50 px-4 py-5 sm:px-6 lg:px-10"
        style={{ background: "rgba(11,11,12,0.95)", borderBottom: "1px solid rgba(255,255,255,0.08)", backdropFilter: "blur(12px)" }}
      >
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate?.({ page: "admin" })}
              className="p-2 text-white/50 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="text-white/40 uppercase tracking-[0.12em]" style={{ fontSize: 10 }}>
                Админ-панель
              </div>
              <h1 className="text-white" style={{ fontSize: 20, letterSpacing: "0.04em" }}>
                Управление экспедициями
              </h1>
            </div>
          </div>
          <motion.button
            className="flex w-full items-center justify-center gap-2 px-5 py-2.5 text-white sm:w-auto"
            style={{ fontSize: 13, background: "#91040C", border: "1px solid #91040C", letterSpacing: "0.06em" }}
            whileHover={{ background: "#6d0309" }}
            onClick={handleCreate}
          >
            <Plus className="w-4 h-4" />
            Новая экспедиция
          </motion.button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col gap-3">
          <div className="relative w-full max-w-[400px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Поиск экспедиции..."
              className="w-full pl-10 pr-4 py-2.5 text-white/90 rounded-none outline-none"
              style={{
                fontSize: 13,
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            />
          </div>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {["all", "Лёгкий", "Средний", "Сложный"].map((d) => (
              <button
                key={d}
                onClick={() => setFilterDifficulty(d)}
                className="shrink-0 px-3 py-2 uppercase tracking-[0.08em] transition-colors"
                style={{
                  fontSize: 11,
                  background: filterDifficulty === d ? "rgba(145,4,12,0.2)" : "rgba(255,255,255,0.04)",
                  border: `1px solid ${filterDifficulty === d ? "rgba(145,4,12,0.4)" : "rgba(255,255,255,0.08)"}`,
                  color: filterDifficulty === d ? "#fff" : "rgba(255,255,255,0.5)",
                }}
              >
                {d === "all" ? "Все" : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats bar */}
      <div className="flex flex-wrap items-center gap-4 px-4 py-4 sm:px-6 lg:px-10" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-white/50" style={{ fontSize: 12 }}>
            Активных: {expeditions.filter((e) => e.isActive).length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500" />
          <span className="text-white/50" style={{ fontSize: 12 }}>
            Закрытых: {expeditions.filter((e) => !e.isActive).length}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Star className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-white/50" style={{ fontSize: 12 }}>
            Рекомендуемых: {expeditions.filter((e) => e.isFeatured).length}
          </span>
        </div>
        <span className="text-white/30" style={{ fontSize: 12 }}>
          Всего: {expeditions.length}
        </span>
      </div>

      {/* Expedition list */}
      <div className="space-y-3 px-4 py-6 sm:px-6 lg:px-10">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <Mountain className="w-12 h-12 text-white/10 mx-auto mb-4" />
            <div className="text-white/30" style={{ fontSize: 15 }}>Нет экспедиций по вашему запросу</div>
          </div>
        ) : (
          filtered.map((exp, idx) => {
            const diffStyle = DIFF_COLORS[exp.difficulty];
            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.03 }}
                className="group relative"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div className="flex flex-col md:flex-row md:items-stretch">
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden md:h-auto md:w-[200px] md:flex-shrink-0">
                    {exp.heroImage ? (
                      <ImageWithFallback src={exp.heroImage} alt={exp.title} className="absolute inset-0 w-full h-full object-cover" />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(255,255,255,0.03)" }}>
                        <ImageIcon className="w-8 h-8 text-white/10" />
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 p-4 sm:p-5">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2 flex-wrap">
                          <h3 className="text-white" style={{ fontSize: 16, letterSpacing: "0.06em" }}>
                            {exp.title}
                          </h3>
                          <span className="text-white/30" style={{ fontSize: 13 }}>
                            {exp.tagline}
                          </span>
                          {/* Status badges */}
                          {!exp.isActive && (
                            <span
                              className="px-2 py-0.5 uppercase tracking-widest"
                              style={{ fontSize: 9, background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
                            >
                              Набор закрыт
                            </span>
                          )}
                          {exp.isFeatured && (
                            <span
                              className="px-2 py-0.5 uppercase tracking-widest flex items-center gap-1"
                              style={{ fontSize: 9, background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)" }}
                            >
                              <Star className="w-3 h-3" /> Рекомендуемая
                            </span>
                          )}
                          <span
                            className="px-2 py-0.5 uppercase tracking-widest"
                            style={{
                              fontSize: 9,
                              background: diffStyle.bg,
                              color: diffStyle.text,
                              border: `1px solid ${diffStyle.border}`,
                            }}
                          >
                            {exp.difficulty}
                          </span>
                        </div>

                        <div className="flex items-center gap-5 text-white/40 flex-wrap" style={{ fontSize: 12 }}>
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.dateRange}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.region}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            {exp.totalDays} дней
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Users className="w-3.5 h-3.5" />
                            {exp.spotsLeft}/{exp.groupSize} мест
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Truck className="w-3.5 h-3.5" />
                            {exp.transport}
                          </span>
                          <span className="text-white/60">
                            {exp.price} ₽
                          </span>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap items-center gap-1.5 md:flex-shrink-0">
                        <motion.button
                          className="p-2 text-white/30 transition-colors"
                          whileHover={{ color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.05)" }}
                          title="Просмотр"
                          onClick={() => onNavigate?.({ page: "experience-detail", id: exp.id })}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-white/30 transition-colors"
                          whileHover={{ color: "rgba(255,255,255,0.8)", background: "rgba(255,255,255,0.05)" }}
                          title="Дублировать"
                          onClick={() => handleDuplicate(exp)}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-white/30 transition-colors"
                          whileHover={{ color: "rgba(145,4,12,1)", background: "rgba(145,4,12,0.1)" }}
                          title="Редактировать"
                          onClick={() => handleEdit(exp.id)}
                        >
                          <Pencil className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-white/30 transition-colors"
                          whileHover={{ color: "rgba(239,68,68,1)", background: "rgba(239,68,68,0.1)" }}
                          title="Удалить"
                          onClick={() => setDeleteConfirm(exp.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delete confirmation */}
                <AnimatePresence>
                  {deleteConfirm === exp.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="overflow-hidden"
                    >
                      <div
                        className="flex flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5"
                        style={{ background: "rgba(239,68,68,0.05)", borderTop: "1px solid rgba(239,68,68,0.15)" }}
                      >
                        <div className="flex items-center gap-2 text-red-400" style={{ fontSize: 13 }}>
                          <AlertTriangle className="w-4 h-4" />
                          Удалить экспедицию «{exp.title} — {exp.tagline}»?
                        </div>
                        <div className="flex items-center gap-2 self-end sm:self-auto">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="px-3 py-1.5 text-white/50 hover:text-white transition-colors"
                            style={{ fontSize: 12, border: "1px solid rgba(255,255,255,0.1)" }}
                          >
                            Отмена
                          </button>
                          <button
                            onClick={() => handleDelete(exp.id)}
                            className="px-3 py-1.5 text-white transition-colors"
                            style={{ fontSize: 12, background: "#ef4444", border: "1px solid #ef4444" }}
                          >
                            Удалить
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
}
