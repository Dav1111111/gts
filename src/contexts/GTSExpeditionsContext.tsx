import { createContext, useContext, useState, useCallback, ReactNode, useMemo, useEffect } from "react";
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
}

/* ═══════════════════════════════════════════════
   Default Expedition Data (single source of truth)
   ═══════════════════════════════════════════════ */

const DEFAULT_EXPEDITIONS: ExpeditionData[] = [
  {
    id: "exp-1",
    title: "КРЫМ",
    tagline: "Горы · Перевалы · Побережье",
    heroImage: "https://images.unsplash.com/photo-1502542068853-07bc5d568c4e?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1599758417353-3b66f35e5d79?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1692610888779-62ebd8d52992?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "13 — 19 апреля",
    month: "АПРЕЛЬ",
    year: 2026,
    totalDays: 7, trekDays: 5, restDays: 2,
    distance: "~680 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Симферополь", finishLocation: "Севастополь",
    region: "Крымский полуостров",
    transport: "Land Cruiser 300",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 2,
    price: "52 000", priceNumber: 52000,
    description: "Внедорожная экспедиция по горным дорогам и перевалам Крыма. Покоряем скрытые ущелья, находим тайные водопады и добираемся до живописных бухт черноморского побережья.",
    program: [
      { day: 1, title: "Прибытие · Симферополь", description: "Встреча группы в аэропорту Симферополя. Трансфер в отель, вводный брифинг, знакомство с техникой и маршрутом.", distance: "40 км", highlights: ["Встреча группы", "Брифинг", "Знакомство с техникой"] },
      { day: 2, title: "Горные перевалы Ай-Петри", description: "Выезд на плато Ай-Петри. Подъём по серпантину, панорамные виды на Ялту и побережье.", distance: "120 км", highlights: ["Плато Ай-Петри", "Панорама побережья", "Горный обед"] },
      { day: 3, title: "Большой каньон Крыма", description: "Преодолеваем Большой каньон — одно из самых впечатляющих мест полуострова.", distance: "95 км", highlights: ["Большой каньон", "Горные водопады", "Речные броды"] },
      { day: 4, title: "Перевал Ангарский · Демерджи", description: "Переезд через Ангарский перевал к Долине привидений горы Демерджи.", distance: "110 км", highlights: ["Ангарский перевал", "Долина привидений", "Горные столбы"] },
      { day: 5, title: "Тайные бухты южного берега", description: "Спуск к побережью. Скрытые бухты, доступные только на внедорожниках.", distance: "80 км", highlights: ["Тайные бухты", "Купание в море", "Пикник"] },
      { day: 6, title: "Перевалы в Севастополь", description: "Маршрут через горные перевалы к Севастополю.", distance: "135 км", highlights: ["Горные перевалы", "Виноделье", "Смотровые площадки"] },
      { day: 7, title: "Финал · Севастополь", description: "Утренняя прогулка по Севастополю. Прощальный обед.", distance: "30 км", highlights: ["Севастополь", "Финальный обед", "Трансфер"] },
    ],
    included: ["Аренда внедорожника Land Cruiser 300", "Профессиональный гид-водитель", "Проживание в отелях 4★ (6 ночей)", "Завтраки и ужины", "Топливо на весь маршрут", "Страховка на время тура", "Рации для связи", "Медицинская аптечка"],
    notIncluded: ["Авиабилеты до Симферополя", "Обеды (ориентировочно 500-800 ₽/день)", "Алкогольные напитки", "Личные расходы и сувениры"],
    additionalCosts: ["Обеды: ~500-800 ₽/день", "Сувениры и личные расходы", "Дополнительные экскурсии: от 1 500 ₽"],
    isActive: true,
    mapX: 200, mapY: 195, labelAbove: true, isFeatured: false,
    highlights: ["Горные перевалы", "Черноморские бухты", "Отели уровня 4★", "Питание включено"],
  },
  {
    id: "exp-2",
    title: "КРЫМ",
    tagline: "Каньоны · Водопады · Море",
    heroImage: "https://images.unsplash.com/photo-1709366541185-ef763288f92d?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1632724236478-ef803af57445?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "20 — 26 апреля", month: "АПРЕЛЬ", year: 2026,
    totalDays: 7, trekDays: 4, restDays: 3,
    distance: "~520 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Симферополь", finishLocation: "Симферополь",
    region: "Южное побережье Крыма",
    transport: "Toyota Hilux",
    difficulty: "Лёгкий",
    groupSize: 10, spotsLeft: 6,
    price: "48 000", priceNumber: 48000,
    description: "Второй заезд по Крыму — более пологие маршруты, больше времени у моря.",
    program: [
      { day: 1, title: "Прибытие · Симферополь", description: "Встреча в аэропорту. Переезд к южному берегу.", distance: "80 км", highlights: ["Встреча группы", "Южный берег", "Вечерний брифинг"] },
      { day: 2, title: "Прибрежные маршруты Алушты", description: "Мягкие прибрежные тропы вдоль Алушты.", distance: "70 км", highlights: ["Прибрежные тропы", "Скальные гроты", "Снорклинг"] },
      { day: 3, title: "Каньоны Большого Крыма", description: "Посещение живописных каньонов.", distance: "90 км", highlights: ["Каньоны", "Пешая прогулка", "Водопады"] },
      { day: 4, title: "День у моря · Отдых", description: "Свободный день на побережье.", highlights: ["Пляжный отдых", "Рыбалка", "Морская прогулка"] },
      { day: 5, title: "Водопады Учан-Су", description: "Маршрут к самому высокому водопаду Крыма.", distance: "85 км", highlights: ["Водопад Учан-Су", "Горные серпантины", "Фото-стопы"] },
      { day: 6, title: "Кемпинг у моря", description: "Проезд к уединённому пляжу.", distance: "60 км", highlights: ["Кемпинг", "Костёр", "Ужин на огне"] },
      { day: 7, title: "Финал · Трансфер", description: "Финальный переезд в Симферополь.", distance: "95 км", highlights: ["Горный перегон", "Прощание", "Трансфер"] },
    ],
    included: ["Аренда Toyota Hilux", "Гид-водитель", "Проживание 5 ночей в отелях + 1 ночь кемпинг", "Завтраки и ужины", "Снаряжение для снорклинга", "Топливо", "Страховка", "Кемпинговое оборудование"],
    notIncluded: ["Авиабилеты", "Обеды", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Обеды: ~400-700 ₽/день", "Морская прогулка: 2 000 ₽", "Сувениры"],
    isActive: true,
    mapX: 410, mapY: 345, labelAbove: false, isFeatured: false,
    highlights: ["Прибрежные маршруты", "Каньоны Большого Крыма", "Снорклинг и рыбалка", "Кемпинг у моря"],
  },
  {
    id: "exp-3",
    title: "ДАГЕСТАН",
    tagline: "Аулы · Каньоны · Каспий",
    heroImage: "https://images.unsplash.com/photo-1703169787622-53c149ca5c8a?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1617573543793-1b13d0a3f75c?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1764918668759-8c4d47628af1?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "30 апр — 05 мая", month: "МАЙ", year: 2026,
    totalDays: 6, trekDays: 4, restDays: 2,
    distance: "~750 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Махачкала", finishLocation: "Махачкала",
    region: "Сулакский каньон, Дагестан",
    transport: "Range Rover Defender",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 3,
    price: "58 000", priceNumber: 58000,
    description: "Экспедиция по горным аулам и каньонам Дагестана.",
    program: [
      { day: 1, title: "Прибытие · Махачкала", description: "Встреча в аэропорту.", distance: "30 км", highlights: ["Каспийское побережье", "Старый город", "Дагестанская кухня"] },
      { day: 2, title: "Сулакский каньон", description: "Выезд к Сулакскому каньону.", distance: "140 км", highlights: ["Сулакский каньон", "Прогулка на катере", "Бирюзовые воды"] },
      { day: 3, title: "Горные аулы · Гуниб", description: "Маршрут через древние горные аулы.", distance: "180 км", highlights: ["Крепость Гуниб", "Горные аулы", "Традиции Дагестана"] },
      { day: 4, title: "Аул-призрак Гамсутль", description: "Восхождение к заброшенному аулу.", distance: "120 км", highlights: ["Гамсутль", "Горное восхождение", "Каменные руины"] },
      { day: 5, title: "Дербент · Древний город", description: "Переезд к Дербенту.", distance: "190 км", highlights: ["Крепость Нарын-Кала", "Магалы", "Закат на Каспии"] },
      { day: 6, title: "Финал · Махачкала", description: "Возвращение.", distance: "130 км", highlights: ["Финальный обед", "Прощание", "Трансфер"] },
    ],
    included: ["Range Rover Defender с водителем", "Проживание 5 ночей", "Завтраки и ужины", "Топливо", "Все входные билеты", "Местный гид по Дагестану", "Прогулка на катере (Сулак)", "Страховка"],
    notIncluded: ["Авиабилеты до Махачкалы", "Обеды", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Обеды: ~400-600 ₽/день", "Сувениры и ремесла", "Чаевые гиду (по желанию)"],
    isActive: true,
    mapX: 630, mapY: 370, labelAbove: false, isFeatured: false,
    highlights: ["Сулакский каньон", "Горные аулы", "Каспийское море", "Местная кухня"],
  },
  {
    id: "exp-4",
    title: "ДАГЕСТАН",
    tagline: "Перевалы · Аулы · Кавказ",
    heroImage: "https://images.unsplash.com/photo-1763309980732-68c9a234f856?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1673446319197-35ba29be3d22?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "05 — 10 мая", month: "МАЙ", year: 2026,
    totalDays: 6, trekDays: 5, restDays: 1,
    distance: "~620 км",
    tourType: "Экстремальная экспедиция",
    startLocation: "Махачкала", finishLocation: "Махачкала",
    region: "Горный Дагестан",
    transport: "Land Cruiser 80",
    difficulty: "Сложный",
    groupSize: 6, spotsLeft: 0,
    price: "55 000", priceNumber: 55000,
    description: "Высокогорные маршруты через перевалы на высоте 3000м.",
    program: [
      { day: 1, title: "Прибытие · Старт к перевалам", description: "Экспресс-сборы and выезд в горы.", distance: "160 км", highlights: ["Горный перевал 2200м", "Горный аул", "Экстрим-старт"] },
      { day: 2, title: "Перевал 3000м", description: "Подъём на высоте 3000 метров.", distance: "90 км", highlights: ["Перевал 3000м", "Заброшенные крепости", "Панорама"] },
      { day: 3, title: "Ночёвка под звёздами", description: "Маршрут через высокогорные луга.", distance: "70 км", highlights: ["Высокогорные луга", "Ночёвка в палатках", "Звёздное небо"] },
      { day: 4, title: "Экстремальные спуски", description: "Крутые горные спуски.", distance: "110 км", highlights: ["Горные спуски", "Скальные секции", "Речные броды"] },
      { day: 5, title: "Скрытые горные озёра", description: "Маршрут к высокогорным озёрам.", distance: "130 км", highlights: ["Горные озёра", "Ледниковые воды", "Прощальный ужин"] },
      { day: 6, title: "Возвращение · Махачкала", description: "Спуск с гор.", distance: "160 км", highlights: ["Спуск", "Финальный обед", "Трансфер"] },
    ],
    included: ["Land Cruiser 80 с водителем", "Кемпинговое снаряжение полностью", "Проживание", "Трёхразовое питание", "Топливо", "Спутниковый телефон", "Медаптечка расширенная", "Страховка экстрим"],
    notIncluded: ["Авиабилеты", "Личное снаряжение (спальник, коврик)", "Алкоголь"],
    additionalCosts: ["Личное снаряжение: ~3 000-5 000 ₽ (аренда)", "Чаевые"],
    isActive: false,
    mapX: 840, mapY: 175, labelAbove: true, isFeatured: false,
    highlights: ["Высокогорные перевалы", "Заброшенные крепости", "Ночёвки в горах", "Экстремальные спуски"],
  },
  {
    id: "exp-5",
    title: "КАЗАХСТАН",
    tagline: "Степи · Барханы · Озёра",
    heroImage: "https://images.unsplash.com/photo-1634574946473-b38a96d438b8?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1752503392570-cbf042a14645?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "08 — 11 мая", month: "МАЙ", year: 2026,
    totalDays: 4, trekDays: 3, restDays: 1,
    distance: "~480 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Алматы", finishLocation: "Алматы",
    region: "Алтын-Эмель, Казахстан",
    transport: "Toyota Hilux",
    difficulty: "Средний",
    groupSize: 10, spotsLeft: 3,
    price: "62 000", priceNumber: 62000,
    description: "Экспедиция в национальный парк Алтын-Эмель.",
    program: [
      { day: 1, title: "Алматы · Выезд в Алтын-Эмель", description: "Утренний выезд из Алматы.", distance: "260 км", highlights: ["Переезд", "Эко-лодж", "Степное сафари"] },
      { day: 2, title: "Поющие барханы · Сакские курганы", description: "Визит к легендарным Поющим барханам.", distance: "80 км", highlights: ["Поющие барханы", "Сакские курганы", "Пустынные пейзажи"] },
      { day: 3, title: "Актау · Разноцветные горы", description: "Маршрут к горам Актау.", distance: "90 км", highlights: ["Горы Актау", "Марсианский ландшафт", "Звёздная ночь"] },
      { day: 4, title: "Возвращение в Алматы", description: "Финальный переезд.", distance: "260 км", highlights: ["Утро в пустыне", "Переезд", "Прощальный обед"] },
    ],
    included: ["Toyota Hilux с водителем", "Эко-лодж 3 ночи", "Трёхразовое питание", "Входной билет в Алтын-Эмель", "Топливо", "Местный гид-натуралист", "Страховка"],
    notIncluded: ["Авиабилеты до Алматы", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Сувениры", "Допуслуги в лодже"],
    isActive: true,
    mapX: 1050, mapY: 320, labelAbove: false, isFeatured: false,
    highlights: ["Поющие барханы", "Сакские курганы", "Пустынные дюны", "Звёздное небо"],
  },
  {
    id: "exp-6",
    title: "ДАГЕСТАН — ЧЕЧНЯ",
    tagline: "Два региона · Один маршрут",
    heroImage: "https://images.unsplash.com/photo-1733510162775-b1ab6b152f87?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1705588230826-bf91714d80c5?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1583002419562-af608a551824?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "10 — 16 мая", month: "МАЙ", year: 2026,
    totalDays: 7, trekDays: 5, restDays: 2,
    distance: "~920 км",
    tourType: "Флагманская экспедиция",
    startLocation: "Махачкала", finishLocation: "Грозный",
    region: "Северный Кавказ",
    transport: "Mercedes G-Class",
    difficulty: "Сложный",
    groupSize: 8, spotsLeft: 0,
    price: "68 000", priceNumber: 68000,
    description: "Флагманская кросс-региональная экспедиция GTS.",
    program: [
      { day: 1, title: "Махачкала · Старт флагмана", description: "Торжественный старт экспедиции.", distance: "80 км", highlights: ["Торжественный старт", "Горный Дагестан", "Брифинг"] },
      { day: 2, title: "Сулакский каньон · Водохранилище", description: "День на Сулакском каньоне.", distance: "120 км", highlights: ["Сулакский каньон", "Катер", "Панорамы"] },
      { day: 3, title: "Перевал Харами", description: "Штурм перевала Харами.", distance: "150 км", highlights: ["Перевал Харами", "Высокогорье", "Горный аул"] },
      { day: 4, title: "Чечня · Аргунское ущелье", description: "Переезд в Чечню.", distance: "130 км", highlights: ["Аргунское ущелье", "Водопады", "Средневековые башни"] },
      { day: 5, title: "Озеро Кезеной-Ам", description: "Визит к высокогорному озеру.", distance: "100 км", highlights: ["Озеро Кезеной-Ам", "Горные пейзажи", "Обед у озера"] },
      { day: 6, title: "Грозный · День отдыха", description: "Переезд в Грозный.", distance: "120 км", highlights: ["Грозный-Сити", "Сердце Чечни", "Экскурсия"] },
      { day: 7, title: "Финал · Грозный", description: "Торжественное закрытие.", distance: "20 км", highlights: ["Сертификаты", "Прощальный ужин", "Трансфер"] },
    ],
    included: ["Mercedes G-Class с водителем", "Проживание 6 ночей", "Полное питание", "Топливо", "Все входные билеты и экскурсии", "Прогулка на катере", "Сертификат участника GTS", "Расширенная страховка", "Рации и навигация"],
    notIncluded: ["Авиабилет до Махачкалы / из Грозного", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Сувениры", "Дополнительные активности"],
    isActive: true,
    mapX: 1250, mapY: 150, labelAbove: true, isFeatured: true,
    highlights: ["Перевал Харами", "Озеро Кезеной-Ам", "Водопады Аргуна", "Всё включено"],
  },
  {
    id: "exp-7",
    title: "КАЗАХСТАН",
    tagline: "Горы · Водопады · Альпика",
    heroImage: "https://images.unsplash.com/photo-1752584157449-a3c95f6b7b2d?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1665928089199-5f47949e6517?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "12 — 15 мая", month: "МАЙ", year: 2026,
    totalDays: 4, trekDays: 3, restDays: 1,
    distance: "~350 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Алматы", finishLocation: "Алматы",
    region: "Тургеньское ущелье",
    transport: "Land Cruiser 200",
    difficulty: "Средний",
    groupSize: 10, spotsLeft: 6,
    price: "52 000", priceNumber: 52000,
    description: "Маршрут по горному ущелью с каскадными водопадами и альпийскими лугами.",
    program: [
      { day: 1, title: "Алматы · Тургеньское ущелье", description: "Выезд из Алматы.", distance: "70 км", highlights: ["Тургеньское ущелье", "Горный лодж", "Вечерний водопад"] },
      { day: 2, title: "Каскадные водопады", description: "Полный день на маршруте.", distance: "40 км", highlights: ["Каскадные водопады", "Пешие переходы", "Альпийский обед"] },
      { day: 3, title: "Альпийские луга · Горные реки", description: "Подъём к высокогорным лугам.", distance: "50 км", highlights: ["Альпийские луга", "Горные реки", "Дикая природа"] },
      { day: 4, title: "Возвращение · Алматы", description: "Утренний подъём в горах.", distance: "70 км", highlights: ["Горное утро", "Спуск", "Финальный обед"] },
    ],
    included: ["Land Cruiser 200 с водителем", "Горный лодж 3 ночи", "Завтраки и ужины", "Топливо", "Местный гид", "Страховка"],
    notIncluded: ["Авиабилеты до Алматы", "Обеды", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Обеды: ~500-800 ₽/день", "Баня в лодже: 2 000 ₽"],
    isActive: true,
    mapX: 1450, mapY: 360, labelAbove: false, isFeatured: false,
    highlights: ["Каскадные водопады", "Альпийские луга", "Горные реки", "Пикники на природе"],
  },
  {
    id: "exp-8",
    title: "КАЗАХСТАН",
    tagline: "Чарын · Озёра · Горы",
    heroImage: "https://images.unsplash.com/photo-1698790723006-b19a91e35702?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1719285662812-e236808a3d97?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "15 — 19 мая", month: "МАЙ", year: 2026,
    totalDays: 5, trekDays: 4, restDays: 1,
    distance: "~560 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Алматы", finishLocation: "Алматы",
    region: "Чарынский каньон",
    transport: "Jeep Wrangler",
    difficulty: "Средний",
    groupSize: 8, spotsLeft: 5,
    price: "55 000", priceNumber: 55000,
    description: "Путешествие к «Казахстанскому Гранд-Каньону».",
    program: [
      { day: 1, title: "Алматы · Чарынский каньон", description: "Ранний выезд к Чарынскому каньону.", distance: "200 км", highlights: ["Долина замков", "Красные скалы", "Эко-кемпинг"] },
      { day: 2, title: "Каньон · Река Чарын", description: "Полный день в каньоне.", distance: "30 км", highlights: ["Дно каньона", "Сплав по реке", "Фото-стопы"] },
      { day: 3, title: "Переезд к озёрам Кольсай", description: "Переезд через горные перевалы.", distance: "180 км", highlights: ["Горные перевалы", "Озёра Кольсай", "Вечерняя прогулка"] },
      { day: 4, title: "Озёра Кольсай · Каинды", description: "Трекинг ко второму озеру.", distance: "60 км", highlights: ["Озёра Кольсай", "Затопленный лес", "Прощальный костёр"] },
      { day: 5, title: "Возвращение · Алматы", description: "Утренний вид на озеро.", distance: "280 км", highlights: ["Утро на озере", "Переезд", "Финальный обед"] },
    ],
    included: ["Jeep Wrangler с водителем", "Проживание 4 ночи", "Завтраки и ужины", "Входные билеты", "Топливо", "Местный гид", "Сплав по реке Чарын", "Страховка"],
    notIncluded: ["Авиабилеты до Алматы", "Обеды", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Обеды: ~400-700 ₽/день", "Баня: 1 500 ₽", "Конная прогулка: 3 000 ₽"],
    isActive: true,
    mapX: 1640, mapY: 200, labelAbove: true, isFeatured: false,
    highlights: ["Чарынский каньон", "Озёра Кольсай", "Красные скалы", "Национальная кухня"],
  },
  {
    id: "exp-9",
    title: "ALPHA RACE",
    tagline: "1 этап · Чеченская респ.",
    heroImage: "https://images.unsplash.com/photo-1639244170226-d91781fb4952?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1670800811907-69b2c96e374d?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "21 — 24 мая", month: "МАЙ", year: 2026,
    totalDays: 4, trekDays: 3, restDays: 1,
    distance: "~350 км",
    tourType: "Внедорожные соревнования",
    startLocation: "Грозный", finishLocation: "Грозный",
    region: "Чеченская Республика",
    transport: "Кубок GTS",
    difficulty: "Сложный",
    groupSize: 12, spotsLeft: 3,
    price: "45 000", priceNumber: 45000,
    description: "Первый этап внедорожного кубка GTS Alpha Race.",
    program: [
      { day: 1, title: "Регистрация · Техосмотр", description: "Регистрация участников.", distance: "20 км", highlights: ["Регистрация", "Техосмотр", "Жеребьёвка"] },
      { day: 2, title: "Квалификация · Спецучастки 1-4", description: "Квалификационные заезды.", distance: "120 км", highlights: ["Квалификация", "4 спецучастка", "Промежуточные результаты"] },
      { day: 3, title: "Финальные заезды · Ночной спецучасток", description: "Финальные заезды.", distance: "150 км", highlights: ["Финальные заезды", "Ночной этап", "Судейство"] },
      { day: 4, title: "Награждение · Закрытие", description: "Торжественная церемония.", distance: "20 км", highlights: ["Награждение", "Призовой фонд", "Церемония"] },
    ],
    included: ["Стартовый взнос", "GPS-трекер", "Базовый лагерь 3 ночи", "Питание в базовом лагере", "Медицинское обеспечение", "Страховка участника", "Сертификат и медаль"],
    notIncluded: ["Авиабилеты до Грозного", "Собственный внедорожник или аренда", "Запчасти и ремонт", "Алкоголь"],
    additionalCosts: ["Аренда внедорожника: от 15 000 ₽/день", "Запчасти и расходники", "Штурман (по желанию): 10 000 ₽"],
    isActive: true,
    mapX: 1840, mapY: 175, labelAbove: true, isFeatured: false,
    highlights: ["Соревновательный формат", "Призовой фонд", "Спецучастки", "Командный зачёт"],
  },
  {
    id: "exp-10",
    title: "КАЗАХСТАН",
    tagline: "Балхаш · Степь · Ветер",
    heroImage: "https://images.unsplash.com/photo-1748445475282-1b46eccc72c1?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1760776679643-0e28cbcd4214?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "22 — 26 мая", month: "МАЙ", year: 2026,
    totalDays: 5, trekDays: 3, restDays: 2,
    distance: "~800 км",
    tourType: "Внедорожная экспедиция",
    startLocation: "Алматы", finishLocation: "Алматы",
    region: "Озеро Балхаш",
    transport: "Toyota Land Cruiser",
    difficulty: "Лёгкий",
    groupSize: 12, spotsLeft: 6,
    price: "48 000", priceNumber: 48000,
    description: "Водная и внедорожная экспедиция к Балхашу.",
    program: [
      { day: 1, title: "Алматы · Путь через степь", description: "Долгий переезд через степь.", distance: "380 км", highlights: ["Степной переезд", "Бескрайние просторы", "Степные кафе"] },
      { day: 2, title: "Озеро Балхаш · Рыбалка", description: "День на Балхаше.", distance: "50 км", highlights: ["Рыбалка", "Катание по берегу", "Уха из улова"] },
      { day: 3, title: "Полуостров · Пляжный лагерь", description: "Переезд на дикий полуостров.", distance: "60 км", highlights: ["Дикий полуостров", "Пляжный лагерь", "Закат"] },
      { day: 4, title: "День отдыха у воды", description: "Свободный день.", highlights: ["Рыбалка", "SUP-борд", "Прощальный ужин"] },
      { day: 5, title: "Возвращение · Алматы", description: "Ранний выезд.", distance: "380 км", highlights: ["Степной переезд", "Финальный обед", "Прощание"] },
    ],
    included: ["Toyota Land Cruiser с водителем", "Проживание 2 ночи эко-лодж + 2 ночи кемпинг", "Завтраки и ужины", "Рыболовное снаряжение", "SUP-борд", "Кемпинговое оборудование", "Топливо", "Страховка"],
    notIncluded: ["Авиабилеты до Алматы", "Обеды", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Обеды: ~400-600 ₽/день", "Рыболовная лицензия: 1 000 ₽"],
    isActive: true,
    mapX: 2030, mapY: 355, labelAbove: false, isFeatured: false,
    highlights: ["Озеро Балхаш", "Рыбалка", "Степные маршруты", "Пляжный лагерь"],
  },
  {
    id: "exp-11",
    title: "ЭЛЬБРУС — АРХЫЗ",
    tagline: "Высокогорье · Ледники · Мощь",
    heroImage: "https://images.unsplash.com/photo-1554197913-f5998d997f42?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1759491265387-7b7adfb10647?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "26 — 30 мая", month: "ИЮНЬ", year: 2026,
    totalDays: 5, trekDays: 4, restDays: 1,
    distance: "~580 км",
    tourType: "Высокогорная экспедиция",
    startLocation: "Минеральные Воды", finishLocation: "Минеральные Воды",
    region: "Приэльбрусье, КЧР",
    transport: "УАЗ Профи",
    difficulty: "Сложный",
    groupSize: 8, spotsLeft: 1,
    price: "72 000", priceNumber: 72000,
    description: "Финальная экспедиция сезона — высокогорный маршрут к подножию Эльбруса.",
    program: [
      { day: 1, title: "Минеральные Воды · Приэльбрусье", description: "Встреча группы.", distance: "180 км", highlights: ["Приэльбрусье", "Горный отель", "Акклиматизация"] },
      { day: 2, title: "Подножие Эльбруса · Ледники", description: "Подъём на канатной дороге.", distance: "60 км", highlights: ["Подножие Эльбруса", "Канатная дорога", "Высота 3800м"] },
      { day: 3, title: "Перевал Гумбаши", description: "Переезд через перевал.", distance: "140 км", highlights: ["Перевал Гумбаши", "Кавказский хребет", "Дороги через облака"] },
      { day: 4, title: "Ущелья Архыза · Горные озёра", description: "Маршрут по ущельям Архыза.", distance: "120 км", highlights: ["Ущелья Архыза", "Озёра Софии", "Треккинг"] },
      { day: 5, title: "Финал · Минеральные Воды", description: "Спуск с гор.", distance: "200 км", highlights: ["Сертификаты GTS", "Прощальный обед", "Трансфер"] },
    ],
    included: ["УАЗ Профи с водителем", "Проживание 4 ночи", "Полное питание", "Канатная дорога на Эльбрус", "Топливо", "Местный горный гид", "Расширенная страховка", "Сертификат GTS", "Аптечка и кислород"],
    notIncluded: ["Авиабилеты до Минеральных Вод", "Алкоголь", "Личные расходы"],
    additionalCosts: ["Прокат треккинговых палок: 500 ₽/день", "Сувениры"],
    isActive: true,
    mapX: 2260, mapY: 195, labelAbove: true, isFeatured: true,
    highlights: ["Подножие Эльбруса", "Перевал Гумбаши", "Ущелья Архыза", "Горные озёра"],
  },
  {
    id: "exp-12",
    title: "SOCHI TALON",
    tagline: "Адреналин · Горы · Драйв",
    heroImage: "https://images.unsplash.com/photo-1681857239369-15ebd70bdad9?auto=format&fit=crop&q=80&w=1920",
    galleryImages: [
      "https://images.unsplash.com/photo-1639244170226-d91781fb4952?auto=format&fit=crop&q=80&w=1200",
      "https://images.unsplash.com/photo-1602574763108-7c4434fea82d?auto=format&fit=crop&q=80&w=1200"
    ],
    dateRange: "По запросу", month: "КРУГЛЫЙ ГОД", year: 2026,
    totalDays: 1, trekDays: 1, restDays: 0,
    distance: "50-100 км",
    tourType: "Аренда техники / Тур",
    startLocation: "Красная Поляна", finishLocation: "Красная Поляна",
    region: "Сочи, Красная Поляна",
    transport: "Honda Talon 1000R",
    difficulty: "Средний",
    groupSize: 4, spotsLeft: 4,
    price: "35 000", priceNumber: 35000,
    description: "Индивидуальный тур на мощных багги Honda Talon по самым живописным маршрутам Красной Поляны.",
    program: [
      { day: 1, title: "Инструктаж · Старт", description: "Знакомство с техникой, экипировка и выезд на маршрут.", distance: "80 км", highlights: ["Горные серпантины", "Альпийские луга", "Панорамные виды"] },
    ],
    included: ["Аренда Honda Talon 1000R", "Экипировка", "Инструктор", "Топливо", "Страховка"],
    notIncluded: ["Питание", "Личные расходы"],
    additionalCosts: ["Обед в горном ресторане: ~2 000 ₽"],
    isActive: true,
    mapX: 2400, mapY: 300, labelAbove: true, isFeatured: true,
    highlights: ["Honda Talon 1000R", "Красная Поляна", "Драйв и адреналин"],
  }
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
    const { error } = await supabase
      .from(SUPABASE_TABLE)
      .upsert({ id: exp.id, data: sanitizeExpeditionForStorage(exp), updated_at: new Date().toISOString() }, { onConflict: "id" });
    if (error) throw error;
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
  const isManagementUser = isAuthenticated && (user?.role === "staff" || user?.role === "executive");

  /* ── Load from Supabase on mount, seed if table is empty and a manager is authenticated ── */
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const remote = await loadSupabaseExpeditions();
      if (cancelled) return;

      if (remote.status === "success") {
        setExpeditions(remote.data);
        cacheExpeditions(remote.data);
        return;
      }

      if (remote.status === "empty" && isManagementUser) {
        const sourceForSeed = expeditions.length ? expeditions : DEFAULT_EXPEDITIONS;
        const seeded = await seedSupabase(sourceForSeed);
        if (cancelled) return;

        if (seeded) {
          setExpeditions(sourceForSeed);
          cacheExpeditions(sourceForSeed);
        } else {
          console.warn("[GTS] Supabase table is empty and seed failed, keeping cached expeditions.");
        }
      }
    })();
    return () => { cancelled = true; };
  }, [isManagementUser]);

  /* ── Supabase Realtime: sync changes from other users ── */
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let channel: any = null;

    (async () => {
      const { supabase } = await import("../utils/supabase/client");
      channel = supabase
        .channel("expeditions-realtime")
        .on(
          "postgres_changes" as any,
          { event: "*", schema: "public", table: SUPABASE_TABLE },
          (payload: any) => {
            const eventType = payload.eventType as string;
            const newRow = payload.new as { id: string; data: ExpeditionData } | undefined;
            const oldRow = payload.old as { id: string } | undefined;

            if (eventType === "INSERT" && newRow) {
              const exp = sanitizeExpeditionForStorage({ ...newRow.data, id: newRow.id });
              if (exp.isDeleted) return;
              setExpeditions(prev => {
                if (prev.some(e => e.id === exp.id)) return prev;
                return [...prev, exp];
              });
            } else if (eventType === "UPDATE" && newRow) {
              const exp = sanitizeExpeditionForStorage({ ...newRow.data, id: newRow.id });
              if (exp.isDeleted) {
                setExpeditions(prev => prev.filter(e => e.id !== exp.id));
              } else {
                setExpeditions(prev => {
                  const exists = prev.some(e => e.id === exp.id);
                  if (exists) return prev.map(e => e.id === exp.id ? exp : e);
                  return [...prev, exp];
                });
              }
            } else if (eventType === "DELETE" && oldRow) {
              setExpeditions(prev => prev.filter(e => e.id !== oldRow.id));
            }
          }
        )
        .subscribe();
    })();

    return () => {
      if (channel) {
        (async () => {
          const { supabase } = await import("../utils/supabase/client");
          supabase.removeChannel(channel!);
        })();
      }
    };
  }, []);

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
    }

    return result;
  }, []);

  const updateExpedition = useCallback(async (updatedExp: ExpeditionData) => {
    const previousExp = expeditions.find(exp => exp.id === updatedExp.id);

    setExpeditions(prev => prev.map(exp => exp.id === updatedExp.id ? updatedExp : exp));
    const result = await upsertSupabaseExpedition(updatedExp);

    if (!result.success && previousExp) {
      setExpeditions(prev => prev.map(exp => exp.id === previousExp.id ? previousExp : exp));
    }

    return result;
  }, [expeditions]);

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
    }

    return result;
  }, [expeditions]);

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
