import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect, useRef } from "react";
import { useGTSAuth } from "./GTSAuthContext";

/* ═══════════════════════════════════════════════
   Shared Expedition Types
   ═══════════════════════════════════════════════ */

export interface DayProgram {
  day: number;
  title: string;
  description: string;
  distance?: string;
  highlights: string[];
}

export interface ExpeditionData {
  id: string;
  title: string;
  tagline: string;
  heroImage: string;
  galleryImages: string[];
  dateRange: string;
  startDate?: string;
  endDate?: string;
  month: string;
  year: number;
  totalDays: number;
  trekDays: number;
  restDays: number;
  distance: string;
  tourType: string;
  startLocation: string;
  finishLocation: string;
  region: string;
  transport: string;
  difficulty: "Лёгкий" | "Средний" | "Сложный";
  groupSize: number;
  spotsLeft: number;
  price: string;
  priceNumber: number;
  description: string;
  program: DayProgram[];
  included: string[];
  notIncluded: string[];
  additionalCosts: string[];
  isActive: boolean;
  /* Calendar map position */
  mapX: number;
  mapY: number;
  labelAbove: boolean;
  isFeatured: boolean;
  highlights: string[];
  isDeleted?: boolean;
  deletedAt?: string | null;
  /** Which section displays this expedition. "calendar" = map timeline, "abkhazia" = Abkhazia page catalog, "both" = both */
  displayBlock?: "calendar" | "abkhazia" | "both";
  /** Elevation label used in Abkhazia catalog (e.g. "до 2400 м") */
  elevation?: string;
}

/* ═══════════════════════════════════════════════
   Default Expedition Data (single source of truth)
   ═══════════════════════════════════════════════ */


const DEFAULT_EXPEDITIONS: ExpeditionData[] = [
  // ── АБХАЗИЯ ──────────────────────────────────────────────────────────────
  {
    id: "abk-tulpan",
    title: "ВОДОПАД ТЮЛЬПАН — ТЕПЕ-БАШЕ",
    tagline: "Горный рельеф · Водопад · Обзорные линии",
    heroImage: "https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "Ежедневно",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    month: "ИЮНЬ",
    year: 2026,
    totalDays: 1, trekDays: 1, restDays: 0,
    distance: "120–160 км",
    tourType: "Однодневная багги-экспедиция",
    startLocation: "Сочи", finishLocation: "Сочи",
    region: "Абхазия",
    transport: "Багги GTS",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 8,
    price: "от 24 900 ₽", priceNumber: 24900,
    description: "Насыщенный маршрут без ночёвки — короткий по длительности, но эффектный по впечатлению от горной Абхазии. Маршрут строится вокруг связки: водопад Тюльпан, лесной подъём, гравийные участки и верхние обзорные линии района Тепе-Баше.",
    program: [
      { day: 1, title: "Полный день — Водопад Тюльпан — Тепе-Баше", description: "Старт из Сочи, пересечение границы. Лесной подъём через гравийные серпантины. Привал у водопада Тюльпан. Выход на верхние обзорные линии Тепе-Баше. Возвращение в Сочи.", distance: "120–160 км", highlights: ["Водопад Тюльпан", "Лесной подъём", "Гравийные серпантины", "Обзорные линии Тепе-Баше"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер из отеля", "Личные расходы"],
    additionalCosts: ["Пассажирское место в 4-мест. багги: 24 900 ₽", "Пассажирское место в 2-мест. багги: 29 900 ₽", "4-местный багги целиком: 99 900 ₽", "2-местный багги целиком: 69 900 ₽", "Своя техника: 21 900 ₽"],
    isActive: true,
    mapX: 300, mapY: 250, labelAbove: true, isFeatured: false,
    highlights: ["Водопад Тюльпан", "Лесной подъём", "до 1800 м", "120–160 км"],
    isDeleted: false, deletedAt: null,
    displayBlock: "abkhazia",
    elevation: "до 1800 м",
  },
  {
    id: "abk-gizla",
    title: "УРОЧИЩЕ ГИЗЛА — КУШОНСКИЙ ПЕРЕВАЛ",
    tagline: "Внедорожный офф-роуд · Перевал · Пастушьи дороги",
    heroImage: "https://images.unsplash.com/photo-1614786269829-d24616faf56d?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "Ежедневно",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    month: "ИЮНЬ",
    year: 2026,
    totalDays: 1, trekDays: 1, restDays: 0,
    distance: "100–140 км",
    tourType: "Однодневная багги-экспедиция",
    startLocation: "Сочи", finishLocation: "Сочи",
    region: "Абхазия",
    transport: "Багги GTS",
    difficulty: "Сложный",
    groupSize: 6, spotsLeft: 6,
    price: "от 24 900 ₽", priceNumber: 24900,
    description: "Жёсткий однодневный маршрут с акцентом на перевальный характер и внедорожную составляющую. Лесной рельеф, набор высоты, гравийный серпантин, пастушьи дороги и высокогорные участки. Для гостей, которым нужен яркий, выверенный off-road с более выраженным внедорожным опытом.",
    program: [
      { day: 1, title: "Полный день — Гизла — Кушонский перевал", description: "Старт из Сочи. Вход в лесной рельеф. Движение по пастушьим дорогам, гравийный серпантин. Подъём на Кушонский перевал. Экстремальные участки и сложные подъёмы. Возвращение в Сочи.", distance: "100–140 км", highlights: ["Урочище Гизла", "Пастушьи дороги", "Кушонский перевал", "Экстремальные подъёмы"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер из отеля", "Личные расходы"],
    additionalCosts: ["Пассажирское место в 4-мест. багги: 24 900 ₽", "Пассажирское место в 2-мест. багги: 29 900 ₽", "4-местный багги целиком: 99 900 ₽", "2-местный багги целиком: 69 900 ₽", "Своя техника: 21 900 ₽"],
    isActive: true,
    mapX: 350, mapY: 300, labelAbove: false, isFeatured: false,
    highlights: ["Кушонский перевал", "Гравийный серпантин", "до 2100 м", "100–140 км"],
    isDeleted: false, deletedAt: null,
    displayBlock: "abkhazia",
    elevation: "до 2100 м",
  },
  {
    id: "abk-auadkhara",
    title: "АУАДХАРА — АЛЬПИЙСКИЕ ЛУГА",
    tagline: "Озеро Рица · Высокогорье · Ночёвка в горах",
    heroImage: "https://images.unsplash.com/photo-1522735338363-cc7313be0ae0?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1605368787-45e36bbed5df?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "Ежедневно",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    month: "ИЮЛЬ",
    year: 2026,
    totalDays: 2, trekDays: 2, restDays: 0,
    distance: "180–220 км",
    tourType: "Двухдневная багги-экспедиция",
    startLocation: "Сочи", finishLocation: "Сочи",
    region: "Абхазия",
    transport: "Багги GTS",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 8,
    price: "от 57 900 ₽", priceNumber: 57900,
    description: "Главный двухдневный маршрут Абхазии. Старт в районе озера Рица, подъём в высокогорный кластер Ауадхары. Ночёвка внутри горной зоны. На второй день — расширение программы по верхним линиям альпийских лугов без лишнего перегона вниз.",
    program: [
      { day: 1, title: "День 1 — Рица — Ауадхара", description: "Старт из Сочи. Пересечение границы, движение к озеру Рица. Подъём в сторону Ауадхары. Минеральные источники, высокогорные зоны, альпийские луга. Заселение в отель, ужин.", distance: "90–110 км", highlights: ["Озеро Рица", "Район Ауадхары", "Минеральные источники", "Альпийские луга"] },
      { day: 2, title: "День 2 — Верхние линии Ауадхары", description: "Движение по верхним линиям альпийских лугов. Обзорные участки. Дополнительные направления по погоде: перевал Пыв, озеро Мзы, долина Семи озёр. Возвращение в Сочи.", distance: "90–110 км", highlights: ["Верхние линии лугов", "Перевал Пыв (опц.)", "Озеро Мзы (опц.)", "Долина Семи озёр (опц.)"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (1 ночь)"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер из отеля", "Личные расходы"],
    additionalCosts: ["Пассажирское место в 4-мест. багги: 57 900 ₽", "Пассажирское место в 2-мест. багги: 67 900 ₽", "4-местный багги целиком: 239 900 ₽", "2-местный багги целиком: 159 900 ₽", "Своя техника: 52 900 ₽"],
    isActive: true,
    mapX: 280, mapY: 220, labelAbove: true, isFeatured: true,
    highlights: ["Озеро Рица", "Район Ауадхары", "до 2400 м", "180–220 км"],
    isDeleted: false, deletedAt: null,
    displayBlock: "abkhazia",
    elevation: "до 2400 м",
  },
  {
    id: "abk-sukhum",
    title: "СУХУМ — ЦЕБЕЛЬДА — КОДОР — АМТКЕЛ",
    tagline: "Южный блок · Кодорское ущелье · 3 дня",
    heroImage: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "Ежедневно",
    startDate: "2026-06-01",
    endDate: "2026-09-30",
    month: "АВГУСТ",
    year: 2026,
    totalDays: 3, trekDays: 3, restDays: 0,
    distance: "300+ км",
    tourType: "Трёхдневная багги-экспедиция",
    startLocation: "Сочи", finishLocation: "Сочи",
    region: "Абхазия",
    transport: "Багги GTS",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 8,
    price: "от 89 900 ₽", priceNumber: 89900,
    description: "Большой южный маршрутный блок по Абхазии. Цебельдинский район, Кодорское ущелье, водопады, озеро Амткел и дикие гравийные коридоры — более широкое путешествие по южной части региона с настоящим внедорожным характером.",
    program: [
      { day: 1, title: "День 1 — Сухум — Цебельда", description: "Старт из Сочи. Движение вдоль побережья в сторону Сухума. Вход в Цебельдинский район. Гравийные дороги, водопады. Размещение и ужин.", distance: "90–110 км", highlights: ["Сухум", "Цебельдинский район", "Водопады", "Гравийные коридоры"] },
      { day: 2, title: "День 2 — Кодорское ущелье", description: "Выезд в Кодорское направление. Дикий рельеф ущелья, сложные участки. Обзорные точки. Возвращение в лагерь.", distance: "100–120 км", highlights: ["Кодорское ущелье", "Дикий рельеф", "Обзорные точки"] },
      { day: 3, title: "День 3 — Озеро Амткел — возвращение", description: "Движение к озеру Амткел — высокогорное бирюзовое озеро. Завершение маршрута, возвращение в Сочи.", distance: "110–120 км", highlights: ["Озеро Амткел", "Горное озеро", "Финальный участок маршрута"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (2 ночи)"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер из отеля", "Личные расходы"],
    additionalCosts: ["Пассажирское место в 4-мест. багги: 89 900 ₽", "Пассажирское место в 2-мест. багги: 99 900 ₽", "4-местный багги целиком: 359 900 ₽", "2-местный багги целиком: 249 900 ₽", "Своя техника: 79 900 ₽"],
    isActive: true,
    mapX: 260, mapY: 300, labelAbove: false, isFeatured: false,
    highlights: ["Кодорское ущелье", "Озеро Амткел", "до 2000 м", "300+ км"],
    isDeleted: false, deletedAt: null,
    displayBlock: "abkhazia",
    elevation: "до 2000 м",
  },
  // ── СЕВЕРНЫЙ КАВКАЗ ──────────────────────────────────────────────────────
  {
    id: "exp-kislovodsk-arkhyz",
    title: "КИСЛОВОДСК — АРХЫЗ",
    tagline: "Флагманская экспедиция · 5 дней · Северный Кавказ",
    heroImage: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1570641963303-92ce4845ed4c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1523531294919-4bcd7c65e216?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "10 — 14 августа",
    startDate: "2026-08-10",
    endDate: "2026-08-14",
    month: "АВГУСТ",
    year: 2026,
    totalDays: 5, trekDays: 4, restDays: 1,
    distance: "~600 км",
    tourType: "Флагманская экспедиция",
    startLocation: "Кисловодск", finishLocation: "Архыз",
    region: "Северный Кавказ",
    transport: "Багги GTS",
    difficulty: "Сложный",
    groupSize: 8, spotsLeft: 4,
    price: "от 99 900 ₽", priceNumber: 99900,
    description: "Большая флагманская экспедиция по Северному Кавказу — один из самых статусных продуктов GTS. Длинный путь, несколько дней в дороге, смена ландшафтов и высокий уровень сопровождения.",
    program: [
      { day: 1, title: "День 1 — Кисловодск — старт", description: "Сбор группы в Кисловодске. Инструктаж, проверка техники. Выезд на первый маршрутный отрезок.", distance: "80–100 км", highlights: ["Кисловодск", "Инструктаж", "Первый горный отрезок"] },
      { day: 2, title: "День 2 — Северо-Кавказские перевалы", description: "Движение по перевальным дорогам. Смена ландшафтов — от предгорий к высокогорью. Обзорные точки на хребты Кавказа.", distance: "130–150 км", highlights: ["Горные перевалы", "Смена ландшафта", "Обзорные точки"] },
      { day: 3, title: "День 3 — Высокогорный переход", description: "Самый насыщенный день маршрута. Высокогорные линии, сложные участки, открытые альпийские зоны.", distance: "120–140 км", highlights: ["Высокогорье", "Альпийские зоны", "Сложные участки"] },
      { day: 4, title: "День 4 — Подход к Архызу", description: "Движение в сторону Архызского района. Горные реки, лесные зоны, финальный перевальный участок.", distance: "130–150 км", highlights: ["Архызский район", "Горные реки", "Перевальный участок"] },
      { day: 5, title: "День 5 — Архыз. Финал", description: "Завершение экспедиции в районе Архыза. Прощальный обед, разъезд участников.", distance: "60–80 км", highlights: ["Архыз", "Финальный день", "Прощальный обед"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (4 ночи)"],
    notIncluded: ["Багги (доступна аренда)", "Авиабилеты до Кисловодска / Минвод", "Личные расходы"],
    additionalCosts: ["Трансфер из аэропорта: по запросу", "Private-формат: по запросу"],
    isActive: true,
    mapX: 1250, mapY: 150, labelAbove: true, isFeatured: true,
    highlights: ["5 дней", "Смена ландшафтов", "Флагманский продукт GTS", "Северный Кавказ"],
    isDeleted: false, deletedAt: null,
    displayBlock: "calendar",
    elevation: "до 3000 м",
  },
  {
    id: "exp-arkhyz-dombay",
    title: "АРХЫЗ — ДОМБАЙ",
    tagline: "Горный Кавказ · 3 дня · Компактная экспедиция",
    heroImage: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1586348943529-beaae6c28db9?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "14 — 16 июля",
    startDate: "2026-07-14",
    endDate: "2026-07-16",
    month: "ИЮЛЬ",
    year: 2026,
    totalDays: 3, trekDays: 3, restDays: 0,
    distance: "~350 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Архыз", finishLocation: "Домбай",
    region: "Северный Кавказ",
    transport: "Багги GTS",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 6,
    price: "от 69 900 ₽", priceNumber: 69900,
    description: "Компактная, но насыщенная трёхдневная экспедиция по сильному горному направлению Архыз — Домбай. Короткий, но насыщенный формат с сильной горной визуальной частью и многодневным опытом.",
    program: [
      { day: 1, title: "День 1 — Архыз — старт", description: "Сбор группы в районе Архыза. Инструктаж. Выезд на маршрут — первый горный отрезок.", distance: "100–120 км", highlights: ["Архыз", "Инструктаж", "Горный старт"] },
      { day: 2, title: "День 2 — Горный переход", description: "Основной маршрутный день. Сложные горные участки, смена ландшафтов, обзорные точки.", distance: "130–150 км", highlights: ["Горные участки", "Смена ландшафта", "Обзорные точки"] },
      { day: 3, title: "День 3 — Домбай. Финал", description: "Завершающий участок маршрута. Выход к Домбаю, финальные панорамные виды. Прощальный обед.", distance: "100–120 км", highlights: ["Домбай", "Панорамные виды", "Финал маршрута"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (2 ночи)"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер до Архыза", "Личные расходы"],
    additionalCosts: ["Трансфер: по запросу", "Private-формат: по запросу"],
    isActive: true,
    mapX: 1050, mapY: 320, labelAbove: false, isFeatured: false,
    highlights: ["3 дня", "Архыз — Домбай", "Горный Кавказ", "Насыщенный формат"],
    isDeleted: false, deletedAt: null,
    displayBlock: "calendar",
    elevation: "до 2800 м",
  },
  // ── КРЫМ ─────────────────────────────────────────────────────────────────
  {
    id: "exp-crimea",
    title: "КРЫМ",
    tagline: "Видовые дороги · Природные контрасты · 4 дня",
    heroImage: "https://images.unsplash.com/photo-1502542068853-07bc5d568c4e?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1599758417353-3b66f35e5d79?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1692610888779-62ebd8d52992?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "12 — 15 мая",
    startDate: "2026-05-12",
    endDate: "2026-05-15",
    month: "МАЙ",
    year: 2026,
    totalDays: 4, trekDays: 4, restDays: 0,
    distance: "~480 км",
    tourType: "Многодневная экспедиция",
    startLocation: "Симферополь", finishLocation: "Севастополь",
    region: "Крымский полуостров",
    transport: "Багги GTS",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 5,
    price: "от 69 900 ₽", priceNumber: 69900,
    description: "Многодневная экспедиция по Крыму со сменой рельефа и ландшафтов. Длинное маршрутное движение, видовые дороги, природные контрасты — ощущение отдельного большого путешествия.",
    program: [
      { day: 1, title: "День 1 — Симферополь — горные перевалы", description: "Встреча группы в Симферополе. Выезд на горные перевалы. Первый маршрутный день с набором высоты.", distance: "110–130 км", highlights: ["Симферополь", "Горные перевалы", "Первый набор высоты"] },
      { day: 2, title: "День 2 — Горный Крым", description: "Центральный горный массив Крыма. Каньоны, водопады, смена рельефа.", distance: "120–140 км", highlights: ["Горные каньоны", "Водопады", "Внедорожные участки"] },
      { day: 3, title: "День 3 — Побережье", description: "Спуск к черноморскому побережью. Видовые дороги, природные контрасты.", distance: "100–120 км", highlights: ["Черноморское побережье", "Видовые дороги", "Природные контрасты"] },
      { day: 4, title: "День 4 — Севастополь. Финал", description: "Завершающий маршрутный день. Выход к Севастополю. Прощальный обед.", distance: "80–100 км", highlights: ["Севастополь", "Финал экспедиции", "Прощальный обед"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (3 ночи)"],
    notIncluded: ["Багги (доступна аренда)", "Авиабилеты до Симферополя", "Личные расходы"],
    additionalCosts: ["Трансфер: по запросу", "Private-формат: по запросу"],
    isActive: true,
    mapX: 630, mapY: 180, labelAbove: true, isFeatured: false,
    highlights: ["4 дня", "Крым", "Видовые дороги", "Смена ландшафтов"],
    isDeleted: false, deletedAt: null,
    displayBlock: "calendar",
    elevation: "до 1500 м",
  },
  // ── ГЕЛЕНДЖИК ────────────────────────────────────────────────────────────
  {
    id: "exp-gelendzhik",
    title: "ГЕЛЕНДЖИК",
    tagline: "Уикенд-формат · 2 дня · Короткий насыщенный выезд",
    heroImage: "https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=1200",
    ],
    dateRange: "20 — 21 июня",
    startDate: "2026-06-20",
    endDate: "2026-06-21",
    month: "ИЮНЬ",
    year: 2026,
    totalDays: 2, trekDays: 2, restDays: 0,
    distance: "~200 км",
    tourType: "Уикенд-экспедиция",
    startLocation: "Сочи", finishLocation: "Геленджик",
    region: "Черноморское побережье",
    transport: "Багги GTS",
    difficulty: "Лёгкий",
    groupSize: 10, spotsLeft: 8,
    price: "от 38 900 ₽", priceNumber: 38900,
    description: "Компактный двухдневный экспедиционный формат. Уикенд-продукт — более лёгкий вход в многодневные программы. Вариант для гостей, которым нужен короткий, но насыщенный выезд.",
    program: [
      { day: 1, title: "День 1 — Старт — горные окрестности", description: "Выезд из Сочи. Горные дороги черноморского побережья. Первый маршрутный день с выходом к обзорным точкам.", distance: "90–110 км", highlights: ["Горные дороги", "Черноморское побережье", "Обзорные точки"] },
      { day: 2, title: "День 2 — Геленджик. Финал", description: "Завершение маршрута. Выход к Геленджику. Прощальный обед у моря.", distance: "90–110 км", highlights: ["Геленджик", "Финал маршрута", "Обед у моря"] },
    ],
    included: ["Маршрутная программа", "Ведущий экипаж", "Сопровождение колонны", "Организационная координация", "Питание по программе", "Размещение (1 ночь)"],
    notIncluded: ["Багги (доступна аренда)", "Трансфер из отеля", "Личные расходы"],
    additionalCosts: ["Трансфер: по запросу", "Private-формат: по запросу"],
    isActive: true,
    mapX: 840, mapY: 280, labelAbove: false, isFeatured: false,
    highlights: ["2 дня", "Геленджик", "Уикенд-формат", "Лёгкий вход"],
    isDeleted: false, deletedAt: null,
    displayBlock: "calendar",
    elevation: "до 800 м",
  },
];

const EXPEDITIONS_STORAGE_KEY = "gts_expeditions_v1";
const SUPABASE_TABLE = "expeditions";

type SupabaseLoadResult =
  | { status: "success"; data: ExpeditionData[] }
  | { status: "empty" }
  | { status: "error"; error: unknown };

export type ExpeditionMutationResult =
  | { success: true }
  | { success: false; error: string };

function formatSupabaseError(err: unknown): string {
  if (typeof err === "object" && err !== null) {
    const candidate = err as { message?: unknown; details?: unknown; hint?: unknown; code?: unknown };
    const parts = [candidate.message, candidate.details, candidate.hint, candidate.code]
      .filter((value): value is string => typeof value === "string" && value.trim().length > 0)
      .map((value) => value.trim());

    if (parts.length > 0) {
      const combined = parts.join(" | ");

      if (
        combined.toLowerCase().includes("row-level security") ||
        combined.toLowerCase().includes("permission denied") ||
        combined.toLowerCase().includes("not allowed")
      ) {
        return "Supabase отклонил запись из-за прав доступа. У аккаунта есть вход в админку, но нет разрешения на запись в таблицу expeditions.";
      }

      return combined;
    }
  }

  if (err instanceof Error && err.message.trim()) {
    return err.message.trim();
  }

  return "Неизвестная ошибка записи в Supabase.";
}

function sanitizeExpeditionForStorage(expedition: ExpeditionData): ExpeditionData {
  return {
    ...expedition,
    isDeleted: expedition.isDeleted ?? false,
    deletedAt: expedition.isDeleted ? expedition.deletedAt ?? new Date().toISOString() : null,
  };
}

function toStableComparable(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(toStableComparable);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>)
        .filter(([, entryValue]) => entryValue !== undefined)
        .sort(([leftKey], [rightKey]) => leftKey.localeCompare(rightKey, "en"))
        .map(([entryKey, entryValue]) => [entryKey, toStableComparable(entryValue)])
    );
  }

  return value;
}

function stableSerialize(value: unknown): string {
  return JSON.stringify(toStableComparable(value));
}

function expeditionsEqual(left: ExpeditionData, right: ExpeditionData): boolean {
  return stableSerialize(sanitizeExpeditionForStorage(left)) === stableSerialize(sanitizeExpeditionForStorage(right));
}

function getVisibleExpeditions(expeditions: ExpeditionData[]): ExpeditionData[] {
  return expeditions.filter((expedition) => !expedition.isDeleted);
}

function loadCachedExpeditions(): ExpeditionData[] {
  if (typeof window === "undefined") return DEFAULT_EXPEDITIONS;
  try {
    const raw = window.localStorage.getItem(EXPEDITIONS_STORAGE_KEY);
    if (!raw) return DEFAULT_EXPEDITIONS;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? getVisibleExpeditions(parsed as ExpeditionData[]) : DEFAULT_EXPEDITIONS;
  } catch {
    return DEFAULT_EXPEDITIONS;
  }
}

function cacheExpeditions(data: ExpeditionData[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(EXPEDITIONS_STORAGE_KEY, JSON.stringify(data));
  }
}

/* ─── Supabase helpers ─── */
async function loadSupabaseExpeditions(): Promise<SupabaseLoadResult> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const { data, error } = await supabase.from(SUPABASE_TABLE).select("id, data").order("created_at");
    if (error) throw error;
    if (!data || data.length === 0) return { status: "empty" };
    const mapped = data.map((row: { id: string; data: ExpeditionData }) => sanitizeExpeditionForStorage({ ...row.data, id: row.id }));
    return {
      status: "success",
      data: getVisibleExpeditions(mapped),
    };
  } catch (err) {
    console.warn("[GTS] Supabase load failed, using cache:", err);
    return { status: "error", error: err };
  }
}

async function upsertSupabaseExpedition(exp: ExpeditionData): Promise<ExpeditionMutationResult> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const payload = sanitizeExpeditionForStorage(exp);

    console.log("[GTS] Upsert expedition →", exp.id, {
      title: exp.title,
      startDate: exp.startDate,
      endDate: exp.endDate,
      price: exp.price,
      spotsLeft: exp.spotsLeft,
      isActive: exp.isActive,
    });

    const { error } = await supabase
      .from(SUPABASE_TABLE)
      .upsert({ id: exp.id, data: payload, updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) throw error;

    const { data: persistedRow, error: persistedError } = await supabase
      .from(SUPABASE_TABLE)
      .select("id, data, updated_at")
      .eq("id", exp.id)
      .single();

    if (persistedError) throw persistedError;

    const persistedExpedition = sanitizeExpeditionForStorage({
      ...(persistedRow.data as ExpeditionData),
      id: persistedRow.id,
    });
    const matches = expeditionsEqual(persistedExpedition, payload);

    console.log("[GTS] Upsert verification ←", exp.id, {
      matches,
      updatedAt: persistedRow.updated_at,
      remoteTitle: persistedExpedition.title,
      remoteStartDate: persistedExpedition.startDate,
      remoteEndDate: persistedExpedition.endDate,
      remotePrice: persistedExpedition.price,
      remoteSpotsLeft: persistedExpedition.spotsLeft,
      remoteIsActive: persistedExpedition.isActive,
    });

    if (!matches) {
      return {
        success: false,
        error: "Supabase принял запрос, но вернул старую версию записи. Изменение не дошло до общей базы.",
      };
    }

    return { success: true };
  } catch (err) {
    console.error("[GTS] Supabase upsert failed:", err);
    return { success: false, error: formatSupabaseError(err) };
  }
}

async function softDeleteSupabaseExpedition(expedition: ExpeditionData): Promise<ExpeditionMutationResult> {
  return upsertSupabaseExpedition({
    ...expedition,
    isDeleted: true,
    deletedAt: new Date().toISOString(),
    isActive: false,
  });
}

async function deleteSupabaseExpedition(expedition: ExpeditionData): Promise<ExpeditionMutationResult> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const { error } = await supabase.from(SUPABASE_TABLE).delete().eq("id", expedition.id);
    if (!error) return { success: true };

    console.warn("[GTS] Hard delete failed, trying soft delete:", error);
    const softDeleted = await softDeleteSupabaseExpedition(expedition);
    if (softDeleted.success) return { success: true };

    throw error;
  } catch (err) {
    console.error("[GTS] Supabase delete failed:", err);
    return { success: false, error: formatSupabaseError(err) };
  }
}

async function seedSupabase(expeditions: ExpeditionData[]): Promise<boolean> {
  try {
    const { supabase } = await import("../utils/supabase/client");
    const rows = expeditions.map((exp) => ({ id: exp.id, data: sanitizeExpeditionForStorage(exp) }));
    const { error } = await supabase.from(SUPABASE_TABLE).upsert(rows, { onConflict: "id" });
    if (error) throw error;
    return true;
  } catch (err) {
    console.warn("[GTS] Supabase seed failed:", err);
    return false;
  }
}

interface GTSExpeditionsContextType {
  expeditions: ExpeditionData[];
  getExpeditionById: (id: string) => ExpeditionData | undefined;
  featuredExpeditions: ExpeditionData[];
  addExpedition: (expedition: ExpeditionData) => Promise<ExpeditionMutationResult>;
  updateExpedition: (expedition: ExpeditionData) => Promise<ExpeditionMutationResult>;
  deleteExpedition: (id: string) => Promise<ExpeditionMutationResult>;
  generateNewId: () => string;
}

const GTSExpeditionsContext = createContext<GTSExpeditionsContextType | undefined>(undefined);

export function GTSExpeditionsProvider({ children }: { children: ReactNode }) {
  const { isAuthenticated, user } = useGTSAuth();
  const [expeditions, setExpeditions] = useState<ExpeditionData[]>(() => loadCachedExpeditions());
  const expeditionsRef = useRef(expeditions);
  const isManagementUser = isAuthenticated && (user?.role === "staff" || user?.role === "executive");

  useEffect(() => {
    expeditionsRef.current = expeditions;
  }, [expeditions]);

  const refreshFromSupabase = useCallback(async () => {
    const remote = await loadSupabaseExpeditions();

    if (remote.status !== "success") {
      console.log("[GTS] refreshFromSupabase — status:", remote.status);
      return remote;
    }

    setExpeditions((prev) => {
      const changed = stableSerialize(prev) !== stableSerialize(remote.data);
      console.log("[GTS] refreshFromSupabase — loaded", remote.data.length, "expeditions, changed:", changed);
      if (!changed) return prev;
      return remote.data;
    });
    cacheExpeditions(remote.data);

    return remote;
  }, []);

  /* ── Load from Supabase on mount, seed if table is empty and a manager is authenticated ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await refreshFromSupabase();
      if (cancelled) return;

      if (remote.status === "success") {
        return;
      }

      if (remote.status === "empty" && isManagementUser) {
        const sourceForSeed = expeditionsRef.current.length ? expeditionsRef.current : DEFAULT_EXPEDITIONS;
        const seeded = await seedSupabase(sourceForSeed);
        if (cancelled) return;

        if (seeded) {
          await refreshFromSupabase();
        } else {
          console.warn("[GTS] Supabase table is empty and seed failed, keeping cached expeditions.");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [isManagementUser, refreshFromSupabase]);

  /* ── Supabase Realtime + fallback sync ── */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: any = null;
    let isMounted = true;

    const syncVisibleClient = () => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") {
        return;
      }

      console.log("[GTS] Polling/visibility sync triggered");
      void refreshFromSupabase();
    };

    (async () => {
      const { supabase } = await import("../utils/supabase/client");
      if (!isMounted) return;

      channel = supabase
        .channel("expeditions-realtime")
        .on(
          "postgres_changes" as any,
          { event: "*", schema: "public", table: SUPABASE_TABLE },
          (payload: any) => {
            console.log("[GTS] Realtime event received:", payload.eventType, payload);
            void refreshFromSupabase();
          }
        )
        .subscribe((status: string) => {
          console.log("[GTS] Realtime subscription status:", status);
          if (status === "SUBSCRIBED") {
            console.log("[GTS] Realtime SUBSCRIBED — listening for changes on", SUPABASE_TABLE);
            void refreshFromSupabase();
            return;
          }

          if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") {
            console.warn(`[GTS] Realtime failed: ${status} — falling back to polling`);
          }
        });
    })();

    const intervalId = window.setInterval(syncVisibleClient, 10000);
    const onFocus = () => syncVisibleClient();
    const onVisibilityChange = () => syncVisibleClient();

    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onVisibilityChange);

    return () => {
      isMounted = false;
      window.clearInterval(intervalId);
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onVisibilityChange);

      if (channel) {
        (async () => {
          const { supabase } = await import("../utils/supabase/client");
          supabase.removeChannel(channel!);
        })();
      }
    };
  }, [refreshFromSupabase]);

  /* ── Keep localStorage cache in sync ── */
  useEffect(() => {
    cacheExpeditions(expeditions);
  }, [expeditions]);

  const getExpeditionById = useCallback((id: string) => {
    return expeditions.find(exp => exp.id === id);
  }, [expeditions]);

  const addExpedition = useCallback(async (newExp: ExpeditionData) => {
    setExpeditions(prev => [...prev, newExp]);
    const result = await upsertSupabaseExpedition(newExp);

    if (!result.success) {
      setExpeditions(prev => prev.filter(exp => exp.id !== newExp.id));
    } else {
      await refreshFromSupabase();
    }

    return result;
  }, [refreshFromSupabase]);

  const updateExpedition = useCallback(async (updatedExp: ExpeditionData) => {
    const previousExp = expeditions.find(exp => exp.id === updatedExp.id);

    setExpeditions(prev => prev.map(exp => exp.id === updatedExp.id ? updatedExp : exp));
    const result = await upsertSupabaseExpedition(updatedExp);

    if (!result.success && previousExp) {
      setExpeditions(prev => prev.map(exp => exp.id === previousExp.id ? previousExp : exp));
    } else if (result.success) {
      await refreshFromSupabase();
    }

    return result;
  }, [expeditions, refreshFromSupabase]);

  const deleteExpedition = useCallback(async (id: string) => {
    const previousIndex = expeditions.findIndex(exp => exp.id === id);
    const previousExp = previousIndex >= 0 ? expeditions[previousIndex] : undefined;

    setExpeditions(prev => prev.filter(exp => exp.id !== id));
    const result = previousExp ? await deleteSupabaseExpedition(previousExp) : { success: true } as const;

    if (!result.success && previousExp) {
      setExpeditions(prev => {
        if (prev.some(exp => exp.id === id)) {
          return prev;
        }

        const next = [...prev];
        const insertIndex = Math.min(previousIndex, next.length);
        next.splice(insertIndex, 0, previousExp);
        return next;
      });
    } else if (result.success) {
      await refreshFromSupabase();
    }

    return result;
  }, [expeditions, refreshFromSupabase]);

  const generateNewId = useCallback(() => {
    return `exp-${Date.now()}`;
  }, []);

  const featuredExpeditions = useMemo(() => expeditions.filter(exp => exp.isFeatured), [expeditions]);

  return (
    <GTSExpeditionsContext.Provider value={{
      expeditions,
      getExpeditionById,
      featuredExpeditions,
      addExpedition,
      updateExpedition,
      deleteExpedition,
      generateNewId
    }}>
      {children}
    </GTSExpeditionsContext.Provider>
  );
}

export function useGTSExpeditions() {
  const context = useContext(GTSExpeditionsContext);
  if (context === undefined) {
    throw new Error("useGTSExpeditions must be used within a GTSExpeditionsProvider");
  }
  return context;
}

// Alias for backward compatibility
export const useExpeditions = useGTSExpeditions;
