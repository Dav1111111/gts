import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MapPin,
  Calendar,
  Clock,
  Truck,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  GripHorizontal,
} from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useExpeditions } from "../contexts/GTSExpeditionsContext";

/* ─── Constants ─── */
const MONTH_TRACK_WIDTH = 220;
const CYCLE_WIDTH = MONTH_TRACK_WIDTH * 12;
const MAP_WIDTH = CYCLE_WIDTH * 3;
const MAP_HEIGHT = 540;
const TIMELINE_PADDING = 120;
const TIMELINE_COPIES = [0, 1, 2] as const;
const ROUTE_PROFILE = [300, 285, 300, 345, 405, 220, 390, 230, 375, 245, 290, 300] as const;
const TIMELINE_MONTHS = [
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

/* ─── Types ─── */
interface Expedition {
  id: string;
  title: string;
  tagline: string;
  dateRange: string;
  startDate: string;
  endDate: string;
  month: string;
  duration: string;
  location: string;
  transport: string;
  price: string;
  difficulty: "Лёгкий" | "Средний" | "Сложный";
  spots: { total: number; booked: number };
  description: string;
  highlights: string[];
  isActive: boolean;
  isFeatured: boolean;
  image: string;
  startProgress: number;
  status: "upcoming" | "closed" | "completed";
  centerX: number;
  centerY: number;
  labelAbove: boolean;
  labelOffsetX: number;
  sortKey: number;
}

interface TreadBlock {
  x: number;
  y: number;
  angle: number;
}

interface Decoration {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotate?: number;
  opacity: number;
  paths: { d: string; fill?: boolean; strokeWidth?: number }[];
  viewBox: string;
}

/* ─── Expedition Data ─── */
const expeditions = [
  {
    id: "exp-1",
    title: "КРЫМ",
    tagline: "Горы · Перевалы · Побережье",
    dateRange: "13 — 19 апреля",
    month: "АПРЕЛЬ",
    duration: "7 дней",
    location: "Крымский полуостров",
    transport: "Land Cruiser 300",
    price: "52 000",
    difficulty: "Средний",
    spots: { total: 8, booked: 6 },
    description:
      "Внедорожная экспедиция по горным дорогам и перевалам Крыма. Покоряем скрытые ущелья, находим тайные водопады и добираемся до живописных бухт черноморского побережья.",
    highlights: ["Горные перевалы", "Черноморские бухты", "Отели уровня 4★", "Питание включено"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1599758417353-3b66f35e5d79?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDcmltZWElMjBtb3VudGFpbnMlMjBjb2FzdGxpbmUlMjBzY2VuaWN8ZW58MXx8fHwxNzcxOTM3NDY5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 200, y: 195, labelAbove: true,
  },
  {
    id: "exp-2",
    title: "КРЫМ",
    tagline: "Каньоны · Водопады · Море",
    dateRange: "20 — 26 апреля",
    month: "АПРЕЛЬ",
    duration: "7 дней",
    location: "Южное побережье Крыма",
    transport: "Toyota Hilux",
    price: "48 000",
    difficulty: "Лёгкий",
    spots: { total: 10, booked: 4 },
    description:
      "Второй заезд по Крыму — более пологие маршруты, больше времени у моря. Идеально для тех, кто едет впервые или предпочитает умеренный темп.",
    highlights: ["Прибрежные маршруты", "Каньоны Большого Крыма", "Снорклинг и рыбалка", "Кемпинг у моря"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1632724236478-ef803af57445?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDcmltZWElMjBCbGFjayUyMFNlYSUyMGJheSUyMGJlYXV0aWZ1bHxlbnwxfHx8fDE3NzE5Mzc0Njl8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 410, y: 345, labelAbove: false,
  },
  {
    id: "exp-3",
    title: "ДАГЕСТАН",
    tagline: "Аулы · Каньоны · Каспий",
    dateRange: "30 апр — 05 мая",
    month: "МАЙ",
    duration: "6 дней",
    location: "Сулакский каньон, Дагестан",
    transport: "Range Rover Defender",
    price: "58 000",
    difficulty: "Средний",
    spots: { total: 8, booked: 5 },
    description:
      "Экспедиция по горным аулам и каньонам Дагестана. Один из самых глубоких каньонов Европы, древние горные сёла, Каспийское побережье и традиционная кухня.",
    highlights: ["Сулакский каньон", "Горные аулы", "Каспийское море", "Местная кухня"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1617573543793-1b13d0a3f75c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYWdlc3RhbiUyMFN1bGFrJTIwY2FueW9uJTIwbW91bnRhaW5zfGVufDF8fHx8MTc3MTkzNzQ2OXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 630, y: 370, labelAbove: false,
  },
  {
    id: "exp-4",
    title: "ДАГЕСТАН",
    tagline: "Перевалы · Аулы · Кавказ",
    dateRange: "05 — 10 мая",
    month: "МАЙ",
    duration: "6 дней",
    location: "Горный Дагестан",
    transport: "Land Cruiser 80",
    price: "55 000",
    difficulty: "Сложный",
    spots: { total: 6, booked: 6 },
    description:
      "Высокогорные маршруты через перевалы на высоте 3000м, заброшенные крепости, ночёвки под открытым небом. Второй заезд в Дагестан для опытных.",
    highlights: ["Высокогорные перевалы", "Заброшенные крепости", "Ночёвки в горах", "Экстремальные спуски"],
    isActive: false, isFeatured: false, image: "https://images.unsplash.com/photo-1673446319197-35ba29be3d22?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxEYWdlc3RhbiUyMG1vdW50YWluJTIwdmlsbGFnZSUyMGF1bCUyMGNhdWNhc3VzfGVufDF8fHx8MTc3MTkzNzQ3MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 840, y: 175, labelAbove: true,
  },
  {
    id: "exp-5",
    title: "КАЗАХСТАН",
    tagline: "Степи · Барханы · Озёра",
    dateRange: "08 — 11 мая",
    month: "МАЙ",
    duration: "4 дня",
    location: "Алтын-Эмель, Казахстан",
    transport: "Toyota Hilux",
    price: "62 000",
    difficulty: "Средний",
    spots: { total: 10, booked: 7 },
    description:
      "Экспедиция в национальный парк Алтын-Эмель. Знаменитые Поющие барханы, сакские курганы, пустынный пейзаж и потрясающие звёздные ночи.",
    highlights: ["Поющие барханы", "Сакские курганы", "Пустынные дюны", "Звёздное небо"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1752503392570-cbf042a14645?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxLYXpha2hzdGFuJTIwc3RlcHBlJTIwc2FuZCUyMGR1bmVzJTIwbGFuZHNjYXBlfGVufDF8fHx8MTc3MTkzNzQ3MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 1050, y: 320, labelAbove: false,
  },
  {
    id: "exp-6",
    title: "ДАГЕСТАН — ЧЕЧНЯ",
    tagline: "Два региона · Один маршрут",
    dateRange: "10 — 16 мая",
    month: "МАЙ",
    duration: "7 дней",
    location: "Северный Кавказ",
    transport: "Mercedes G-Class",
    price: "68 000",
    difficulty: "Сложный",
    spots: { total: 8, booked: 8 },
    description:
      "Флагманская кросс-региональная экспедиция GTS. Маршрут через оба региона: перевал Харами, водопады Аргуна и горные озёра Кезеной-Ам.",
    highlights: ["Перевал Харами", "Озеро Кезеной-Ам", "Водопады Аргуна", "Всё включено"],
    isActive: true, isFeatured: true, image: "https://images.unsplash.com/photo-1705588230826-bf91714d80c5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxDYXVjYXN1cyUyMG1vdW50YWlucyUyMGRyYW1hdGljJTIwZ29yZ2UlMjByaXZlcnxlbnwxfHx8fDE3NzE5Mzc0NzF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 1250, y: 150, labelAbove: true,
  },
  {
    id: "exp-7",
    title: "КАЗАХСТАН",
    tagline: "Горы · Водопады · Альпика",
    dateRange: "12 — 15 мая",
    month: "МАЙ",
    duration: "4 дня",
    location: "Тургеньское ущелье",
    transport: "Land Cruiser 200",
    price: "52 000",
    difficulty: "Средний",
    spots: { total: 10, booked: 4 },
    description:
      "Маршрут по горному ущелью с каскадными водопадами и альпийскими лугами. Один из самых живописных маршрутов в Заилийском Алатау.",
    highlights: ["Каскадные водопады", "Альпийские луга", "Горные реки", "Пикники на природе"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1665928089199-5f47949e6517?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHdhdGVyZmFsbCUyMGdyZWVuJTIwdmFsbGV5JTIwc2NlbmljfGVufDF8fHx8MTc3MTkzNzQ4MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 1450, y: 360, labelAbove: false,
  },
  {
    id: "exp-8",
    title: "КАЗАХСТАН",
    tagline: "Чарын · Озёра · Горы",
    dateRange: "15 — 19 мая",
    month: "МАЙ",
    duration: "5 дней",
    location: "Чарынский каньон",
    transport: "Jeep Wrangler",
    price: "55 000",
    difficulty: "Средний",
    spots: { total: 8, booked: 3 },
    description:
      "Путешествие к «Казахстанскому Гранд-Каньону» — Чарынскому каньону и горным озёрам Кольсай. Уникальные ландшафты, не похожие ни на что другое.",
    highlights: ["Чарынский каньон", "Озёра Кольсай", "Красные скалы", "Национальная кухня"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1719285662812-e236808a3d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWQlMjBjYW55b24lMjBkZXNlcnQlMjBsYW5kc2NhcGUlMjBhZXJpYWx8ZW58MXx8fHwxNzcxOTM3NDc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 1640, y: 200, labelAbove: true,
  },
  {
    id: "exp-9",
    title: "ALPHA RACE",
    tagline: "1 этап · Чеченская респ.",
    dateRange: "21 — 24 мая",
    month: "МАЙ",
    duration: "4 дня",
    location: "Чеченская Республика",
    transport: "Кубок GTS",
    price: "45 000",
    difficulty: "Сложный",
    spots: { total: 12, booked: 9 },
    description:
      "Первый этап внедорожного кубка GTS Alpha Race. Соревновательный формат с отборочными секциями, судейской оценкой и призовым фондом.",
    highlights: ["Соревновательный формат", "Призовой фонд", "Спецучастки", "Командный зачёт"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1670800811907-69b2c96e374d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvZmZyb2FkJTIwcmFjZSUyMHJhbGx5JTIwbW91bnRhaW5zJTIwY29tcGV0aXRpb258ZW58MXx8fHwxNzcxOTM3NDcyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 1840, y: 175, labelAbove: true,
  },
  {
    id: "exp-10",
    title: "КАЗАХСТАН",
    tagline: "Балхаш · Степь · Ветер",
    dateRange: "22 — 26 мая",
    month: "МАЙ",
    duration: "5 дней",
    location: "Озеро Балхаш",
    transport: "Toyota Land Cruiser",
    price: "48 000",
    difficulty: "Лёгкий",
    spots: { total: 12, booked: 6 },
    description:
      "Водная и внедорожная экспедиция к Балхашу — самому большому озеру Казахстана. Рыбалка, закаты над степью, катание по берегу.",
    highlights: ["Озеро Балхаш", "Рыбалка", "Степные маршруты", "Пляжный лагерь"],
    isActive: true, isFeatured: false, image: "https://images.unsplash.com/photo-1760776679643-0e28cbcd4214?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjZW50cmFsJTIwYXNpYSUyMGxha2UlMjBzdGVwcGUlMjBnb2xkZW4lMjBob3VyfGVufDF8fHx8MTc3MTkzNzQ3OHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 2030, y: 355, labelAbove: false,
  },
  {
    id: "exp-11",
    title: "ЭЛЬБРУС — АРХЫЗ",
    tagline: "Высокогорье · Ледники · Мощь",
    dateRange: "26 — 30 мая",
    month: "ИЮНЬ",
    duration: "5 дней",
    location: "Приэльбрусье, КЧР",
    transport: "УАЗ Профи",
    price: "72 000",
    difficulty: "Сложный",
    spots: { total: 8, booked: 7 },
    description:
      "Финальная экспедиция сезона — высокогорный маршрут к подножию Эльбруса через перевал Гумбаши и ущелья Архыза. Самые суровые места Кавказа.",
    highlights: ["Подножие Эльбруса", "Перевал Гумбаши", "Ущелья Архыза", "Горные озёра"],
    isActive: true, isFeatured: true, image: "https://images.unsplash.com/photo-1759491265387-7b7adfb10647?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxFbGJydXMlMjBtb3VudGFpbiUyMHNub3clMjBwZWFrcyUyMGNhdWNhc3VzfGVufDF8fHx8MTc3MTkzNzQ3M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral", x: 2260, y: 195, labelAbove: true,
  },
];

/* ─── Month labels ─── */
const MONTHS = TIMELINE_MONTHS.map((label, index) => ({
  label,
  x: index * MONTH_TRACK_WIDTH + MONTH_TRACK_WIDTH / 2,
}));

/* ─── Decorative illustrations ─── */
const DECORATIONS: Decoration[] = [
  {
    // Compass rose with N/S/E/W
    id: "compass", x: 70, y: 370, width: 90, height: 90, opacity: 0.3,
    rotate: 10, viewBox: "0 0 100 100",
    paths: [
      { d: "M50 8 A42 42 0 1 1 50 92 A42 42 0 1 1 50 8", strokeWidth: 1.2 },
      { d: "M50 16 A34 34 0 1 1 50 84 A34 34 0 1 1 50 16", strokeWidth: 0.6 },
      { d: "M50 2 L53 42 L50 38 L47 42 Z", fill: true },
      { d: "M50 98 L47 58 L50 62 L53 58 Z", fill: true },
      { d: "M2 50 L42 47 L38 50 L42 53 Z", fill: true },
      { d: "M98 50 L58 53 L62 50 L58 47 Z", fill: true },
      { d: "M50 8 L50 16 M50 84 L50 92 M8 50 L16 50 M84 50 L92 50", strokeWidth: 1 },
      { d: "M22 22 L32 32 M78 22 L68 32 M22 78 L32 68 M78 78 L68 68", strokeWidth: 0.8 },
    ],
  },
  {
    // Crimea — detailed peninsula outline with mountains and coastline
    id: "crimea", x: 285, y: 415, width: 150, height: 105, opacity: 0.28,
    viewBox: "0 0 150 105",
    paths: [
      // Main peninsula shape
      { d: "M12 48 C14 40 20 32 28 26 C36 20 46 16 56 13 C62 11 68 10 74 10 C80 10 86 11 92 14 C98 17 104 22 108 28 L114 36 L118 44 L122 52 L120 58 L116 56 L108 52 L100 50 L94 54 L88 60 L82 66 L76 72 L68 78 L60 82 L52 80 L44 84 L36 86 L28 82 L22 76 L18 68 L14 58 L12 52 Z", fill: true },
      // Kerch peninsula (east)
      { d: "M122 52 L128 48 L134 44 L138 40 L140 44 L136 50 L130 56 L124 58 L120 58", strokeWidth: 1.2 },
      // Sevastopol bay (southwest)
      { d: "M28 82 L24 86 L20 84 L18 80 L22 76", strokeWidth: 1 },
      // Mountain range along south coast (Crimean Mountains)
      { d: "M36 55 L40 46 L44 50 L48 42 L52 48 L56 40 L60 44 L64 38 L68 42 L72 36 L76 40 L80 34 L84 38 L88 44 L92 50", strokeWidth: 1.2 },
      // Mountain snow caps
      { d: "M56 40 L58 36 L60 40 M72 36 L74 32 L76 36 M80 34 L82 30 L84 34", strokeWidth: 0.8 },
      // Coastline details — bays
      { d: "M60 82 C64 80 68 82 72 78 M44 84 C48 82 52 84 56 80", strokeWidth: 0.8 },
      // Cities dots
      { d: "M30 70 A2 2 0 1 1 30 66 A2 2 0 1 1 30 70 M70 74 A2 2 0 1 1 70 70 A2 2 0 1 1 70 74 M100 48 A2 2 0 1 1 100 44 A2 2 0 1 1 100 48", fill: true },
      // Roads/paths
      { d: "M30 68 L50 60 L70 72 M50 60 L80 48 L100 46", strokeWidth: 0.5 },
      // Sea waves
      { d: "M16 90 C20 88 24 90 28 88 M38 92 C42 90 46 92 50 90 M58 94 C62 92 66 94 70 92", strokeWidth: 0.6 },
    ],
  },
  {
    // Mountain range with snow caps and trees
    id: "mountains1", x: 500, y: 50, width: 150, height: 90, opacity: 0.28,
    viewBox: "0 0 150 90",
    paths: [
      { d: "M0 90 L10 68 L18 74 L28 50 L36 58 L48 28 L56 40 L64 20 L72 32 L82 8 L92 28 L100 18 L110 38 L118 30 L128 52 L136 46 L145 65 L150 90 Z", fill: true },
      { d: "M48 28 L52 34 L56 28 M82 8 L86 16 L90 8 M100 18 L104 24 L108 18", strokeWidth: 1 },
      { d: "M18 78 L20 72 L22 78 M24 78 L26 70 L28 78", strokeWidth: 1 },
      { d: "M130 74 L132 66 L134 74 M136 74 L138 68 L140 74", strokeWidth: 1 },
      { d: "M60 60 C64 56 70 58 72 64 M105 55 C108 52 114 54 115 60", strokeWidth: 0.8 },
    ],
  },
  {
    // Off-road SUV — clear side profile with body, wheels, windows
    id: "suv", x: 720, y: 430, width: 135, height: 65, opacity: 0.3,
    viewBox: "0 0 135 65",
    paths: [
      // Body
      { d: "M20 44 L20 34 L24 32 L26 26 L30 20 L36 16 L48 14 L56 12 L74 12 L82 14 L90 16 L96 20 L100 26 L104 32 L108 34 L110 44", strokeWidth: 1.5 },
      // Roof rack
      { d: "M36 16 L36 12 L90 12 L90 16 M46 12 L46 8 L80 8 L80 12 M52 8 L52 12 M58 8 L58 12 M64 8 L64 12 M70 8 L70 12 M76 8 L76 12", strokeWidth: 0.8 },
      // Windshield & windows
      { d: "M34 20 L54 16 L54 28 L34 28 Z M58 16 L84 16 L90 20 L90 28 L58 28 Z", strokeWidth: 1 },
      // Bumpers
      { d: "M14 44 L20 44 M110 44 L118 44 M16 40 L20 40 M110 40 L116 40", strokeWidth: 1.2 },
      // Wheels — left
      { d: "M30 48 A14 14 0 1 1 58 48 A14 14 0 1 1 30 48 M36 48 A8 8 0 1 1 52 48 A8 8 0 1 1 36 48 M40 48 A4 4 0 1 1 48 48 A4 4 0 1 1 40 48", strokeWidth: 1.2 },
      // Wheels — right
      { d: "M78 48 A14 14 0 1 1 106 48 A14 14 0 1 1 78 48 M84 48 A8 8 0 1 1 100 48 A8 8 0 1 1 84 48 M88 48 A4 4 0 1 1 96 48 A4 4 0 1 1 88 48", strokeWidth: 1.2 },
      // Wheel spokes
      { d: "M44 40 L44 56 M36 48 L52 48 M38 42 L50 54 M50 42 L38 54", strokeWidth: 0.5 },
      { d: "M92 40 L92 56 M84 48 L100 48 M86 42 L98 54 M98 42 L86 54", strokeWidth: 0.5 },
      // Axle
      { d: "M58 48 L78 48", strokeWidth: 1 },
      // Headlights
      { d: "M20 36 L16 36 L16 40 L20 40 M110 36 L114 36 L114 40 L110 40", strokeWidth: 1 },
    ],
  },
  {
    // Papakha — Caucasian fur hat, clearer shape
    id: "papakha", x: 930, y: 50, width: 95, height: 80, opacity: 0.28,
    viewBox: "0 0 95 80",
    paths: [
      // Main shape
      { d: "M18 65 L18 40 C18 28 24 20 32 15 C38 11 42 9 47.5 8 C53 9 57 11 63 15 C71 20 77 28 77 40 L77 65 C77 70 70 74 47.5 74 C25 74 18 70 18 65 Z", strokeWidth: 1.5 },
      // Band
      { d: "M18 60 C18 58 25 56 47.5 56 C70 56 77 58 77 60", strokeWidth: 1 },
      // Fur texture rows
      { d: "M22 44 C25 42 28 40 32 42 C35 44 38 42 42 40 C45 42 48 44 52 42 C55 40 58 42 62 44 C65 42 68 44 72 46", strokeWidth: 0.8 },
      { d: "M22 50 C26 48 30 46 34 48 C37 50 40 48 44 46 C47 48 50 50 54 48 C57 46 60 48 64 50 C67 48 70 50 74 52", strokeWidth: 0.8 },
      // Top details
      { d: "M28 15 C32 12 36 10 40 12 M55 12 C59 10 63 12 68 15", strokeWidth: 0.8 },
      { d: "M47.5 8 L47.5 4 M43 5 L52 5", strokeWidth: 1 },
      // Vertical lines on band
      { d: "M30 56 L30 65 M38 56 L38 65 M47 56 L47 65 M56 56 L56 65 M65 56 L65 65", strokeWidth: 0.5 },
    ],
  },
  {
    // Vainakh tower with door, windows, battlements
    id: "tower", x: 1145, y: 385, width: 55, height: 115, opacity: 0.3,
    viewBox: "0 0 55 115",
    paths: [
      // Main tower body
      { d: "M14 110 L14 24 L8 24 L8 18 L14 18 L17 8 L27.5 2 L38 8 L41 18 L47 18 L47 24 L41 24 L41 110 Z", strokeWidth: 1.5 },
      // Battlements
      { d: "M8 18 L8 14 L14 14 L14 18 M41 18 L41 14 L47 14 L47 18", strokeWidth: 1 },
      // Peaked cap
      { d: "M24 8 L27.5 2 L31 8 M24 12 L31 12", strokeWidth: 1 },
      // Horizontal bands
      { d: "M14 24 L41 24 M14 48 L41 48 M14 72 L41 72 M14 96 L41 96 M14 110 L41 110", strokeWidth: 0.8 },
      // Windows
      { d: "M21 30 L21 42 L34 42 L34 30 Z M23 32 L23 40 L32 40 L32 32 Z M27.5 30 L27.5 42", strokeWidth: 0.8 },
      { d: "M21 54 L21 66 L34 66 L34 54 Z M23 56 L23 64 L32 64 L32 56 Z M27.5 54 L27.5 66", strokeWidth: 0.8 },
      { d: "M21 78 L21 90 L34 90 L34 78 Z M23 80 L23 88 L32 88 L32 80 Z M27.5 78 L27.5 90", strokeWidth: 0.8 },
      // Door
      { d: "M22 96 L22 110 L33 110 L33 96 C33 92 22 92 22 96 Z M27.5 110 L27.5 100", strokeWidth: 1 },
      // Stone texture
      { d: "M17 35 L14 35 M41 55 L38 55 M17 62 L14 62 M41 82 L38 82", strokeWidth: 0.5 },
    ],
  },
  {
    // Eagle — clear spread wings, head, tail
    id: "eagle", x: 1340, y: 48, width: 140, height: 75, opacity: 0.28,
    viewBox: "0 0 140 75",
    paths: [
      // Wings + body silhouette
      { d: "M70 30 C64 26 52 18 40 14 C28 10 16 12 6 20 L2 24 L8 22 C16 18 26 17 36 20 L30 26 C22 24 14 26 8 32 L14 30 C20 28 28 30 36 34 L44 38 C50 34 60 28 66 30 L70 36 L74 30 C80 28 90 34 96 38 L104 34 C112 30 120 28 126 30 L132 32 C126 26 118 24 110 26 L104 20 C114 17 124 18 132 22 L138 24 L134 20 C124 12 112 10 100 14 C88 18 76 26 70 30 Z", fill: true },
      // Body detail
      { d: "M62 40 C58 42 55 46 57 52 L64 48 L70 54 L76 48 L83 52 C85 46 82 42 78 40 L70 44 Z", fill: true },
      // Tail feathers
      { d: "M57 52 C52 56 50 62 54 66 L60 60 L70 68 L80 60 L86 66 C90 62 88 56 83 52", strokeWidth: 1 },
      { d: "M70 68 L70 74 M62 72 L78 72", strokeWidth: 1 },
      // Head
      { d: "M70 30 L70 24 L72 22 L74 24 L72 26 L70 30 M74 24 L78 22", strokeWidth: 1 },
      // Wing feathers
      { d: "M10 28 L18 24 M24 22 L32 18 M40 16 L48 14", strokeWidth: 0.6 },
      { d: "M130 28 L122 24 M116 22 L108 18 M100 16 L92 14", strokeWidth: 0.6 },
    ],
  },
  {
    // Yurt — round tent with lattice, door, smoke
    id: "yurt", x: 1535, y: 418, width: 110, height: 80, opacity: 0.3,
    viewBox: "0 0 110 80",
    paths: [
      // Main structure
      { d: "M5 66 L5 42 C5 30 26 18 55 12 C84 18 105 30 105 42 L105 66 Z", strokeWidth: 1.5 },
      // Roof curve
      { d: "M5 42 C5 34 26 22 55 16 C84 22 105 34 105 42", strokeWidth: 1 },
      // Shanyrak (top circle)
      { d: "M55 12 L55 4 M50 6 L60 6 M52 4 A5 3 0 1 1 58 4 A5 3 0 1 1 52 4", strokeWidth: 1 },
      // Smoke
      { d: "M55 4 C54 0 56 -2 55 -4 M53 2 C52 -1 54 -3 53 -5", strokeWidth: 0.6 },
      // Door
      { d: "M46 66 L46 48 L64 48 L64 66 M46 48 C46 44 55 42 64 48 M55 66 L55 52", strokeWidth: 1 },
      // Vertical lattice
      { d: "M18 46 L18 66 M28 44 L28 66 M38 42 L38 66 M72 42 L72 66 M82 44 L82 66 M92 46 L92 66", strokeWidth: 0.6 },
      // Horizontal bands
      { d: "M5 50 L46 50 M64 50 L105 50 M5 58 L46 58 M64 58 L105 58", strokeWidth: 0.6 },
      // Diamond lattice pattern
      { d: "M12 46 L22 54 L12 62 M22 46 L32 54 L22 62 M32 44 L42 52 L32 60", strokeWidth: 0.4 },
      { d: "M78 44 L88 52 L78 60 M88 46 L98 54 L88 62", strokeWidth: 0.4 },
    ],
  },
  {
    // Кинжал — Caucasian dagger with guard and ornament
    id: "kinzhal", x: 1730, y: 390, width: 38, height: 115, opacity: 0.3,
    rotate: -12, viewBox: "0 0 38 115",
    paths: [
      // Blade
      { d: "M19 2 L23 14 L23 80 L19 95 L15 80 L15 14 Z", strokeWidth: 1.2 },
      // Guard
      { d: "M10 14 L28 14 L28 18 L10 18 Z M8 15 L10 14 M28 14 L30 15 M8 17 L10 18 M28 18 L30 17", strokeWidth: 1 },
      // Handle
      { d: "M15 2 L23 2 M14 0 L24 0 L24 4 L14 4 Z", strokeWidth: 1 },
      // Blade center line
      { d: "M19 18 L19 88", strokeWidth: 0.4 },
      // Blade ornament
      { d: "M16 24 L22 24 M16 32 L22 32 M16 40 L22 40 M16 48 L22 48 M16 56 L22 56 M16 64 L22 64 M16 72 L22 72", strokeWidth: 0.6 },
      // Blade edge grooves
      { d: "M16 20 L16 78 M22 20 L22 78", strokeWidth: 0.3 },
      // Tip
      { d: "M17 95 L19 108 L21 95", strokeWidth: 1 },
      // Handle wrap
      { d: "M15 4 L23 8 M15 8 L23 4 M15 8 L23 12 M15 12 L23 8", strokeWidth: 0.5 },
    ],
  },
  {
    // Race flag — checkered with pole
    id: "flag", x: 1925, y: 48, width: 85, height: 90, opacity: 0.28,
    viewBox: "0 0 85 90",
    paths: [
      // Pole
      { d: "M14 5 L14 88 M16 88 L12 88 M12 86 L16 86", strokeWidth: 1.5 },
      // Flag outline
      { d: "M14 5 L72 5 L72 42 L14 42 Z", strokeWidth: 1.2 },
      // Checkered pattern — row 1
      { d: "M14 5 L14 14 L23 14 L23 5 Z M32 5 L32 14 L41 14 L41 5 Z M50 5 L50 14 L59 14 L59 5 Z M63 5 L63 14 L72 14 L72 5 Z", fill: true },
      // Row 2
      { d: "M23 14 L23 23 L32 23 L32 14 Z M41 14 L41 23 L50 23 L50 14 Z M59 14 L59 23 L63 23 L63 14 Z", fill: true },
      // Row 3
      { d: "M14 23 L14 32 L23 32 L23 23 Z M32 23 L32 32 L41 32 L41 23 Z M50 23 L50 32 L59 32 L59 23 Z M63 23 L63 32 L72 32 L72 23 Z", fill: true },
      // Row 4
      { d: "M23 32 L23 42 L32 42 L32 32 Z M41 32 L41 42 L50 42 L50 32 Z M59 32 L59 42 L63 42 L63 32 Z", fill: true },
      // Pole ball top
      { d: "M14 5 A3 3 0 1 1 14 -1 A3 3 0 1 1 14 5", fill: true },
    ],
  },
  {
    // Elbrus — iconic twin peaks with snow
    id: "elbrus", x: 2110, y: 408, width: 165, height: 95, opacity: 0.3,
    viewBox: "0 0 165 95",
    paths: [
      // Main silhouette
      { d: "M0 95 L20 62 L30 50 L38 40 L44 30 L48 22 L52 14 L56 8 L58 5 L60 8 L64 16 L68 26 L72 32 L75 30 L78 24 L82 18 L86 12 L90 7 L93 5 L96 7 L100 14 L104 22 L108 30 L114 40 L122 50 L132 62 L165 95 Z", fill: true },
      // Snow caps — left peak
      { d: "M48 22 L52 14 L56 8 L58 5 L60 8 L64 16 L68 26 L62 28 L56 24 L52 20 Z" },
      // Snow caps — right peak
      { d: "M82 18 L86 12 L90 7 L93 5 L96 7 L100 14 L104 22 L98 24 L92 20 L88 16 Z" },
      // Ridge between peaks
      { d: "M68 26 C70 28 73 30 75 30 C77 30 79 28 82 18", strokeWidth: 1 },
      // Rock lines
      { d: "M30 66 L42 58 L54 66 M100 66 L112 58 L124 66", strokeWidth: 0.8 },
      { d: "M44 74 C48 72 52 70 56 72 M104 74 C108 72 112 70 116 72", strokeWidth: 0.6 },
      { d: "M65 46 L72 42 L80 46 M22 78 L30 74 L38 78 M126 78 L134 74 L142 78", strokeWidth: 0.6 },
      // Glaciers
      { d: "M56 24 L54 32 L58 36 M96 20 L94 28 L98 32", strokeWidth: 0.5 },
    ],
  },
  {
    // Off-road tire with tread
    id: "tire", x: 55, y: 125, width: 70, height: 70, opacity: 0.15,
    viewBox: "0 0 60 60",
    paths: [
      { d: "M30 2 A28 28 0 1 1 30 58 A28 28 0 1 1 30 2", strokeWidth: 1.5 },
      { d: "M30 8 A22 22 0 1 1 30 52 A22 22 0 1 1 30 8", strokeWidth: 1 },
      { d: "M30 16 A14 14 0 1 1 30 44 A14 14 0 1 1 30 16", strokeWidth: 1 },
      { d: "M30 22 A8 8 0 1 1 30 38 A8 8 0 1 1 30 22", strokeWidth: 0.8 },
      { d: "M30 2 L30 8 M30 52 L30 58 M2 30 L8 30 M52 30 L58 30", strokeWidth: 1 },
      { d: "M8 8 L14 14 M46 46 L52 52 M52 8 L46 14 M14 46 L8 52", strokeWidth: 1 },
      // Tread blocks
      { d: "M30 2 L28 6 L32 6 Z M30 58 L28 54 L32 54 Z M2 30 L6 28 L6 32 Z M58 30 L54 28 L54 32 Z", fill: true },
    ],
  },
  {
    // Sand dunes with wind lines
    id: "dunes", x: 940, y: 435, width: 120, height: 55, opacity: 0.25,
    viewBox: "0 0 120 55",
    paths: [
      { d: "M0 55 C8 55 14 42 24 36 C34 30 40 34 50 28 C60 22 66 30 76 24 C86 18 92 26 102 20 C112 14 116 22 120 20 L120 55 Z", fill: true },
      { d: "M8 46 C12 44 18 40 26 38", strokeWidth: 0.8 },
      { d: "M52 32 C58 30 64 34 70 30", strokeWidth: 0.8 },
      { d: "M96 24 C100 22 106 26 110 22", strokeWidth: 0.8 },
      // Wind lines
      { d: "M20 12 L45 12 M30 8 L55 8 M15 16 L38 16", strokeWidth: 0.5 },
    ],
  },
];

/* ─── Path generation — Catmull-Rom → cubic bezier ─── */
function buildSmoothPath(pts: { x: number; y: number }[]): string {
  if (pts.length < 2) return "";
  let d = `M ${pts[0].x},${pts[0].y}`;
  const t = 0.22;
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[Math.max(0, i - 1)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[Math.min(pts.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) * t;
    const cp1y = p1.y + (p2.y - p0.y) * t;
    const cp2x = p2.x - (p3.x - p1.x) * t;
    const cp2y = p2.y - (p3.y - p1.y) * t;
    d += ` C ${Math.round(cp1x)},${Math.round(cp1y)} ${Math.round(cp2x)},${Math.round(cp2y)} ${p2.x},${p2.y}`;
  }
  return d;
}

function smoothStep(value: number): number {
  const t = Math.max(0, Math.min(1, value));
  return t * t * (3 - 2 * t);
}

function getRouteBounds(cycleStartX: number) {
  const inset = TIMELINE_PADDING * 0.45;
  return {
    startX: cycleStartX + inset,
    endX: cycleStartX + CYCLE_WIDTH - inset,
  };
}

function getRouteGuidePoints(cycleStartX: number): { x: number; y: number }[] {
  const { startX, endX } = getRouteBounds(cycleStartX);
  const usableWidth = endX - startX;
  const points = ROUTE_PROFILE.map((y, index) => ({
    x: startX + (usableWidth * index) / (ROUTE_PROFILE.length - 1),
    y,
  }));

  return [
    { x: cycleStartX + 6, y: ROUTE_PROFILE[0] },
    { x: startX - 90, y: ROUTE_PROFILE[0] },
    ...points,
    { x: endX + 90, y: ROUTE_PROFILE[ROUTE_PROFILE.length - 1] },
    { x: cycleStartX + CYCLE_WIDTH - 6, y: ROUTE_PROFILE[ROUTE_PROFILE.length - 1] },
  ];
}

function getRouteYForX(x: number, cycleStartX: number): number {
  const { startX, endX } = getRouteBounds(cycleStartX);
  const clampedX = Math.max(startX, Math.min(endX, x));
  const rawPosition = ((clampedX - startX) / (endX - startX)) * (ROUTE_PROFILE.length - 1);
  const leftIndex = Math.floor(rawPosition);
  const rightIndex = Math.min(ROUTE_PROFILE.length - 1, leftIndex + 1);
  const mix = smoothStep(rawPosition - leftIndex);
  const leftY = ROUTE_PROFILE[leftIndex];
  const rightY = ROUTE_PROFILE[rightIndex];

  return leftY + (rightY - leftY) * mix;
}

// ROUTE_PATH is now computed inside the component using context data

/* ─── Difficulty colors ─── */
const DIFF_COLOR: Record<string, string> = {
  Лёгкий: "#22c55e",
  Средний: "#f59e0b",
  Сложный: "#91040C",
};

const MONTH_NAME_TO_INDEX: Record<string, number> = {
  ЯНВАРЬ: 0,
  ЯНВ: 0,
  ЯНВАРЯ: 0,
  ФЕВРАЛЬ: 1,
  ФЕВ: 1,
  ФЕВРАЛЯ: 1,
  МАРТ: 2,
  МАР: 2,
  МАРТА: 2,
  АПРЕЛЬ: 3,
  АПР: 3,
  АПРЕЛЯ: 3,
  МАЙ: 4,
  МАЯ: 4,
  ИЮНЬ: 5,
  ИЮН: 5,
  ИЮНЯ: 5,
  ИЮЛЬ: 6,
  ИЮЛ: 6,
  ИЮЛЯ: 6,
  АВГУСТ: 7,
  АВГ: 7,
  АВГУСТА: 7,
  СЕНТЯБРЬ: 8,
  СЕН: 8,
  СЕНТЯБРЯ: 8,
  ОКТЯБРЬ: 9,
  ОКТ: 9,
  ОКТЯБРЯ: 9,
  НОЯБРЬ: 10,
  НОЯ: 10,
  НОЯБРЯ: 10,
  ДЕКАБРЬ: 11,
  ДЕК: 11,
  ДЕКАБРЯ: 11,
};

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

function parseIsoDate(value?: string): Date | null {
  if (!value) return null;
  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatDateRange(start: Date, end: Date): string {
  const sameYear = start.getFullYear() === end.getFullYear();
  const sameMonth = sameYear && start.getMonth() === end.getMonth();

  if (sameMonth) {
    return `${String(start.getDate()).padStart(2, "0")} — ${String(end.getDate()).padStart(2, "0")} ${MONTH_GENITIVE[end.getMonth()]}`;
  }

  return `${String(start.getDate()).padStart(2, "0")} ${MONTH_SHORT[start.getMonth()]} — ${String(end.getDate()).padStart(2, "0")} ${MONTH_SHORT[end.getMonth()]}${sameYear ? "" : ` ${end.getFullYear()}`}`;
}

function inferExpeditionDates(source: {
  startDate?: string;
  endDate?: string;
  dateRange: string;
  month: string;
  year: number;
}): { start: Date; end: Date } {
  const explicitStart = parseIsoDate(source.startDate);
  const explicitEnd = parseIsoDate(source.endDate);

  if (explicitStart && explicitEnd) {
    return { start: explicitStart, end: explicitEnd };
  }

  if (explicitStart) {
    return { start: explicitStart, end: explicitEnd ?? explicitStart };
  }

  const digits = source.dateRange.match(/\d{1,2}/g) ?? [];
  const tokens = Array.from(source.dateRange.matchAll(/[А-Яа-яЁё]{3,}/g))
    .map(([token]) => token.replace(/\./g, "").toUpperCase())
    .filter((token) => token in MONTH_NAME_TO_INDEX);

  const fallbackMonth = MONTH_NAME_TO_INDEX[source.month.toUpperCase()] ?? 0;
  const startDay = digits[0] ? Number.parseInt(digits[0], 10) : 1;
  const endDay = digits[1] ? Number.parseInt(digits[1], 10) : startDay;
  const startMonth = tokens[0] ? MONTH_NAME_TO_INDEX[tokens[0]] : fallbackMonth;
  const endMonth = tokens[1] ? MONTH_NAME_TO_INDEX[tokens[1]] : startMonth;
  const startYear = source.year || new Date().getFullYear();
  const endYear = endMonth < startMonth ? startYear + 1 : startYear;

  const start = new Date(startYear, startMonth, startDay);
  const end = new Date(endYear, endMonth, endDay);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    const fallback = new Date(startYear, fallbackMonth, 1);
    return { start: fallback, end: fallback };
  }

  return { start, end };
}

function getDayProgress(date: Date): number {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const startOfNextYear = new Date(date.getFullYear() + 1, 0, 1);
  const elapsed = date.getTime() - startOfYear.getTime();
  const total = startOfNextYear.getTime() - startOfYear.getTime();
  return total > 0 ? elapsed / total : 0;
}

function getExpeditionStatus(isActive: boolean, spots: { total: number; booked: number }, endDate: Date): Expedition["status"] {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endOfExpedition = new Date(endDate);
  endOfExpedition.setHours(23, 59, 59, 999);

  if (today.getTime() > endOfExpedition.getTime()) {
    return "completed";
  }

  if (!isActive || spots.booked >= spots.total) {
    return "closed";
  }

  return "upcoming";
}

function getCompactTitle(title: string): string {
  return title.length > 18 ? `${title.slice(0, 18)}...` : title;
}

/* ════════════════════════════════════════════════════
   Component
   ════════════════════════════════════════════════════ */
interface GTSExpeditionsCalendarProps {
  onNavigate?: (route: { page: string; id?: string }) => void;
}

export function GTSExpeditionsCalendar({ onNavigate }: GTSExpeditionsCalendarProps = {}) {
  const { expeditions: ctxExpeditions } = useExpeditions();
  const [timelineView, setTimelineView] = useState<"full" | "condensed" | "compact">("full");
  const expeditions: Expedition[] = useMemo(() => {
    const mapped = ctxExpeditions.map((e) => {
      const { start, end } = inferExpeditionDates({
        startDate: e.startDate,
        endDate: e.endDate,
        dateRange: e.dateRange,
        month: e.month,
        year: e.year,
      });
      const dateRange = e.dateRange || formatDateRange(start, end);
      const totalDays = Math.max(e.totalDays, Math.floor((end.getTime() - start.getTime()) / 86400000) + 1);

      return {
        id: e.id,
        title: e.title,
        tagline: e.tagline,
        dateRange,
        startDate: start.toISOString().slice(0, 10),
        endDate: end.toISOString().slice(0, 10),
        month: TIMELINE_MONTHS[start.getMonth()],
        duration: `${totalDays} ${totalDays === 1 ? "день" : totalDays < 5 ? "дня" : "дней"}`,
        location: e.region,
        transport: e.transport,
        price: e.price,
        difficulty: e.difficulty,
        spots: { total: e.groupSize, booked: e.groupSize - e.spotsLeft },
        description: e.description,
        highlights: e.highlights,
        isActive: e.isActive,
        isFeatured: e.isFeatured,
        image: e.heroImage,
        startProgress: getDayProgress(start),
        status: getExpeditionStatus(e.isActive, { total: e.groupSize, booked: e.groupSize - e.spotsLeft }, end),
        centerX: 0,
        centerY: 0,
        labelAbove: true,
        labelOffsetX: 0,
        sortKey: start.getMonth() * 100 + start.getDate(),
      };
    });

    const sorted = mapped.sort((a, b) => a.sortKey - b.sortKey || a.title.localeCompare(b.title, "ru"));
    const { startX, endX } = getRouteBounds(CYCLE_WIDTH);
    const usableWidth = endX - startX;
    const groupedByDay = new Map<string, Expedition[]>();

    sorted.forEach((exp) => {
      const group = groupedByDay.get(exp.startDate) ?? [];
      group.push(exp);
      groupedByDay.set(exp.startDate, group);
    });

    const seenPerDay = new Map<string, number>();

    return sorted.map((exp) => {
      const sameDayGroup = groupedByDay.get(exp.startDate) ?? [exp];
      const siblingIndex = seenPerDay.get(exp.startDate) ?? 0;
      seenPerDay.set(exp.startDate, siblingIndex + 1);

      const laneOffsetX = sameDayGroup.length > 1
        ? (siblingIndex - (sameDayGroup.length - 1) / 2) * 30
        : 0;
      const desiredX = startX + exp.startProgress * usableWidth;
      const centerX = Math.max(startX, Math.min(endX, desiredX + laneOffsetX));
      const centerY = getRouteYForX(centerX, CYCLE_WIDTH);
      const baseLabelAbove = centerY > MAP_HEIGHT * 0.54;
      const labelAbove = sameDayGroup.length > 1 && siblingIndex % 2 === 1
        ? !baseLabelAbove
        : baseLabelAbove;
      const labelOffsetX = sameDayGroup.length > 1
        ? (siblingIndex - (sameDayGroup.length - 1) / 2) * 18
        : 0;

      return {
        ...exp,
        centerX,
        centerY,
        labelAbove,
        labelOffsetX,
      };
    });
  }, [ctxExpeditions]);

  const renderedExpeditions = useMemo(
    () =>
      TIMELINE_COPIES.flatMap((copy) =>
        expeditions.map((exp) => ({
          ...exp,
          renderId: `${copy}-${exp.id}`,
          x: exp.centerX + (copy - 1) * CYCLE_WIDTH,
          y: exp.centerY,
        }))
      ),
    [expeditions]
  );

  const renderedMonths = useMemo(
    () =>
      TIMELINE_COPIES.flatMap((copy) =>
        MONTHS.map((month) => ({
          ...month,
          key: `${copy}-${month.label}`,
          x: month.x + copy * CYCLE_WIDTH,
        }))
      ),
    []
  );

  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [treadBlocks, setTreadBlocks] = useState<TreadBlock[]>([]);
  const [leftWall, setLeftWall] = useState("");
  const [rightWall, setRightWall] = useState("");

  const scrollRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const infoCardRef = useRef<HTMLDivElement>(null);
  const initialScrollDoneRef = useRef(false);
  const selected = expeditions.find((e) => e.id === selectedId) || expeditions[0];
  const hasMultipleExpeditions = expeditions.length > 1;
  const isCompactView = timelineView === "compact";
  const isCondensedView = timelineView !== "full";

  useEffect(() => {
    if (!expeditions.length) {
      setSelectedId(null);
      return;
    }

    if (selectedId && expeditions.some((exp) => exp.id === selectedId)) {
      return;
    }

    const preferred = expeditions.find((exp) => exp.status === "upcoming") ?? expeditions[0];
    setSelectedId(preferred.id);
  }, [expeditions, selectedId]);

  /* ── Compute ROUTE_PATH from expedition coordinates ── */
  const ROUTE_PATH = useMemo(() => {
    return buildSmoothPath(getRouteGuidePoints(CYCLE_WIDTH));
  }, []);

  useEffect(() => {
    const updateTimelineView = () => {
      if (window.innerWidth < 768) {
        setTimelineView("compact");
        return;
      }

      if (window.innerWidth < 1440) {
        setTimelineView("condensed");
        return;
      }

      setTimelineView("full");
    };

    updateTimelineView();
    window.addEventListener("resize", updateTimelineView);

    return () => window.removeEventListener("resize", updateTimelineView);
  }, []);

  /* ── Tire tread generation ── */
  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const totalLen = path.getTotalLength();
    const blocks: TreadBlock[] = [];
    const lPts: string[] = [];
    const rPts: string[] = [];

    const BLOCK_SPACING = 24;
    const BLOCK_OFFSET = 8;
    const CHEVRON = 14;
    const WALL_OFFSET = 15;

    for (let d = 0; d < totalLen; d += BLOCK_SPACING) {
      const p = path.getPointAtLength(d);
      const p2 = path.getPointAtLength(Math.min(d + 1, totalLen));
      const angle = Math.atan2(p2.y - p.y, p2.x - p.x);
      const perp = angle + Math.PI / 2;
      const deg = (angle * 180) / Math.PI;

      blocks.push({
        x: p.x + Math.cos(perp) * BLOCK_OFFSET,
        y: p.y + Math.sin(perp) * BLOCK_OFFSET,
        angle: deg + CHEVRON,
      });
      blocks.push({
        x: p.x - Math.cos(perp) * BLOCK_OFFSET,
        y: p.y - Math.sin(perp) * BLOCK_OFFSET,
        angle: deg - CHEVRON,
      });
    }

    for (let d = 0; d <= totalLen; d += 4) {
      const p = path.getPointAtLength(d);
      const p2 = path.getPointAtLength(Math.min(d + 1, totalLen));
      const angle = Math.atan2(p2.y - p.y, p2.x - p.x);
      const perp = angle + Math.PI / 2;

      const lx = p.x + Math.cos(perp) * WALL_OFFSET;
      const ly = p.y + Math.sin(perp) * WALL_OFFSET;
      const rx = p.x - Math.cos(perp) * WALL_OFFSET;
      const ry = p.y - Math.sin(perp) * WALL_OFFSET;

      lPts.push(d === 0 ? `M ${lx.toFixed(1)},${ly.toFixed(1)}` : `L ${lx.toFixed(1)},${ly.toFixed(1)}`);
      rPts.push(d === 0 ? `M ${rx.toFixed(1)},${ry.toFixed(1)}` : `L ${rx.toFixed(1)},${ry.toFixed(1)}`);
    }

    setTreadBlocks(blocks);
    setLeftWall(lPts.join(" "));
    setRightWall(rPts.join(" "));
  }, [ROUTE_PATH]);

  /* ── Drag-scroll ── */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let isDrag = false;
    let startX = 0;
    let scrollStart = 0;

    const onDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("button")) return;
      isDrag = true;
      startX = e.pageX;
      scrollStart = el.scrollLeft;
      el.style.cursor = "grabbing";
    };
    const onMove = (e: MouseEvent) => {
      if (!isDrag) return;
      e.preventDefault();
      el.scrollLeft = scrollStart - (e.pageX - startX);
    };
    const onUp = () => {
      if (!isDrag) return;
      isDrag = false;
      el.style.cursor = "grab";
    };
    const onTouchStart = (e: TouchEvent) => {
      isDrag = true;
      startX = e.touches[0].pageX;
      scrollStart = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDrag) return;
      el.scrollLeft = scrollStart - (e.touches[0].pageX - startX);
    };
    const onTouchEnd = () => { isDrag = false; };

    const onScroll = () => {
      if (el.scrollLeft < CYCLE_WIDTH * 0.5) {
        el.scrollLeft += CYCLE_WIDTH;
      } else if (el.scrollLeft > CYCLE_WIDTH * 1.5) {
        el.scrollLeft -= CYCLE_WIDTH;
      }
    };

    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: true });
    el.addEventListener("touchend", onTouchEnd);
    el.addEventListener("scroll", onScroll);

    return () => {
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  /* ── Scroll to expedition ── */
  const scrollToExp = useCallback((exp: Expedition, behavior: ScrollBehavior = "smooth") => {
    const el = scrollRef.current;
    if (!el) return;
    const target = exp.centerX - el.clientWidth / 2;
    el.scrollTo({ left: Math.max(0, target), behavior });
  }, []);

  const handleSelect = useCallback(
    (id: string, scrollPageDown = false) => {
      setSelectedId(id);
      const exp = expeditions.find((e) => e.id === id);
      if (exp) scrollToExp(exp);
      if (scrollPageDown) {
        setTimeout(() => {
          infoCardRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 150);
      }
    },
    [expeditions, scrollToExp]
  );

  useEffect(() => {
    if (!selected || initialScrollDoneRef.current) return;
    scrollToExp(selected, "auto");
    initialScrollDoneRef.current = true;
  }, [selected, scrollToExp]);

  const goPrev = () => {
    if (!expeditions.length) return;
    const idx = expeditions.findIndex((e) => e.id === selectedId);
    const nextIndex = idx <= 0 ? expeditions.length - 1 : idx - 1;
    handleSelect(expeditions[nextIndex].id);
  };
  const goNext = () => {
    if (!expeditions.length) return;
    const idx = expeditions.findIndex((e) => e.id === selectedId);
    const nextIndex = idx >= expeditions.length - 1 ? 0 : idx + 1;
    handleSelect(expeditions[nextIndex].id);
  };

  if (!selected) {
    return null;
  }

  return (
    <div className="w-full bg-black">
      <style>{`
        .tire-scroll::-webkit-scrollbar{display:none}
        .tire-scroll{-ms-overflow-style:none;scrollbar-width:none}
      `}</style>

      {/* ═══ Section Header ═══ */}
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 pt-16 pb-6 lg:pt-20 lg:pb-8">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div>
            <p
              className="uppercase tracking-[0.3em] mb-3"
              style={{ color: "#91040C", fontSize: "clamp(11px, 1vw, 13px)" }}
            >
              Сезон 2026
            </p>
            <h2
              className="text-white"
              style={{
                fontSize: "clamp(28px, 4vw, 52px)",
                fontWeight: 700,
                letterSpacing: "0.04em",
                lineHeight: 1.1,
              }}
            >
              КАРТА <span style={{ color: "#91040C" }}>ЭКСПЕДИЦИЙ</span>
            </h2>
            <p
              className="text-white/45 mt-3"
              style={{ fontSize: "clamp(13px, 1.2vw, 16px)", maxWidth: 520 }}
            >
              Листайте непрерывный 12-месячный цикл и выбирайте экспедиции по дате старта.
            </p>
          </div>
          <div className="flex items-center gap-4">
            {onNavigate && (
              <motion.button
                className="flex items-center gap-2 px-4 py-2 text-white/40 uppercase tracking-[0.1em]"
                style={{ fontSize: 11, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.03)" }}
                whileHover={{ background: "rgba(145,4,12,0.15)", borderColor: "rgba(145,4,12,0.4)", color: "rgba(255,255,255,0.8)" }}
                onClick={() => onNavigate({ page: "expeditions-admin" })}
              >
                Админ
              </motion.button>
            )}
            <div className="flex items-center gap-2 text-white/30" style={{ fontSize: 13 }}>
              <GripHorizontal className="w-4 h-4" />
              <span>Тяните шкалу для навигации</span>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Route Map ═══ */}
      <div className="relative">
        {/* Navigation arrow — LEFT */}
        <motion.button
          className="absolute left-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors"
          style={{
            width: 48, height: 48,
            background: "rgba(145,4,12,0.6)",
            border: "1px solid rgba(145,4,12,0.8)",
            opacity: hasMultipleExpeditions ? 1 : 0.3,
            pointerEvents: hasMultipleExpeditions ? "auto" : "none",
          }}
          onClick={goPrev}
          animate={{ x: [0, -4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, background: "rgba(145,4,12,0.9)" }}
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </motion.button>

        {/* Navigation arrow — RIGHT */}
        <motion.button
          className="absolute right-4 top-1/2 -translate-y-1/2 z-40 flex items-center justify-center rounded-full backdrop-blur-sm transition-colors"
          style={{
            width: 48, height: 48,
            background: "rgba(145,4,12,0.6)",
            border: "1px solid rgba(145,4,12,0.8)",
            opacity: hasMultipleExpeditions ? 1 : 0.3,
            pointerEvents: hasMultipleExpeditions ? "auto" : "none",
          }}
          onClick={goNext}
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          whileHover={{ scale: 1.1, background: "rgba(145,4,12,0.9)" }}
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </motion.button>

        {/* Gradient fades */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-30 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-30 pointer-events-none" />

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="tire-scroll overflow-x-auto"
          style={{ cursor: "grab", height: MAP_HEIGHT }}
        >
          <div
            className="relative select-none"
            style={{ width: MAP_WIDTH, height: MAP_HEIGHT }}
            >
              {renderedMonths.map(({ key, label, x }) => (
                <div
                  key={`${key}-line`}
                  className="absolute top-0 bottom-0 pointer-events-none"
                  style={{ left: x, width: 1, background: "rgba(255,255,255,0.05)", zIndex: 0 }}
                />
              ))}

            {/* ── SVG: Tire tread track ── */}
            <svg
              width={MAP_WIDTH}
              height={MAP_HEIGHT}
              className="absolute inset-0"
              style={{ zIndex: 1 }}
            >
              <path ref={pathRef} d={ROUTE_PATH} fill="none" stroke="none" />
              {TIMELINE_COPIES.map((copy) => (
                <g key={copy} transform={`translate(${(copy - 1) * CYCLE_WIDTH}, 0)`}>
                  <path d={ROUTE_PATH} fill="none" stroke="rgba(255,255,255,0.028)" strokeWidth="38" strokeLinecap="round" />
                  <path d={ROUTE_PATH} fill="none" stroke="rgba(255,255,255,0.035)" strokeWidth="28" strokeLinecap="round" />
                  {leftWall && <path d={leftWall} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" strokeLinecap="round" />}
                  {rightWall && <path d={rightWall} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.4" strokeLinecap="round" />}
                  {treadBlocks.map((b, i) => (
                    <rect
                      key={i}
                      x={-4.5} y={-2} width={9} height={4} rx={1}
                      fill="rgba(255,255,255,0.24)"
                      transform={`translate(${b.x.toFixed(1)},${b.y.toFixed(1)}) rotate(${b.angle.toFixed(1)})`}
                    />
                  ))}
                  <path d={ROUTE_PATH} fill="none" stroke="rgba(255,255,255,0.045)" strokeWidth="1" strokeDasharray="5,7" />
                </g>
              ))}
            </svg>

            {/* ── Month labels ── */}
            {renderedMonths.map(({ key, label, x }) => (
              <div
                key={key}
                className="absolute z-10 select-none pointer-events-none"
                style={{ left: x, top: "50%", transform: "translateY(-50%)" }}
              >
                <span
                  className="block text-white/80 tracking-[0.5em]"
                  style={{
                    writingMode: "vertical-rl",
                    transform: "rotate(180deg)",
                    fontSize: isCompactView ? 13 : isCondensedView ? 15 : 18,
                    fontWeight: 500,
                    letterSpacing: isCompactView ? "0.24em" : isCondensedView ? "0.34em" : "0.5em",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}

            {/* ── Expedition markers ── */}
            {renderedExpeditions.map((exp, index) => {
              const isHovered = hoveredId === exp.id;
              const isSelected = selectedId === exp.id;
              const showLabel = !isCondensedView || isSelected || isHovered;
              const pinColor = isSelected ? "#91040C" : isHovered ? "#ffffff" : "rgba(255,255,255,0.6)";
              const pinFill = isSelected ? "#91040C" : exp.isFeatured ? "rgba(145,4,12,0.65)" : isHovered ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)";

              return (
                <motion.div
                  key={exp.renderId}
                  className="absolute cursor-pointer"
                  style={{
                    left: exp.x, top: exp.y,
                    transform: "translate(-50%, -50%)",
                    zIndex: isSelected ? 25 : isHovered ? 20 : 10,
                  }}
                  initial={{ opacity: 0, scale: 0.4 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.05, type: "spring", stiffness: 200 }}
                  onMouseEnter={() => setHoveredId(exp.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => { e.stopPropagation(); handleSelect(exp.id, true); }}
                  >
                    {showLabel && (
                      <div
                        className="absolute cursor-pointer"
                        style={{
                          left: `calc(50% + ${exp.labelOffsetX}px)`,
                          transform: "translateX(-50%)",
                          ...(exp.labelAbove ? { bottom: "calc(100% + 10px)" } : { top: "calc(100% + 10px)" }),
                          textAlign: "center",
                          whiteSpace: isCompactView ? "normal" : "nowrap",
                          width: isCompactView ? 110 : isCondensedView ? 140 : "auto",
                          maxWidth: isCompactView ? 110 : isCondensedView ? 140 : 220,
                        }}
                        onClick={(e) => { e.stopPropagation(); handleSelect(exp.id, true); }}
                      >
                        <div
                          style={{
                            color: "#91040C",
                            fontSize: isCompactView ? 11 : 12,
                            letterSpacing: isCompactView ? "0.05em" : "0.08em",
                            marginBottom: 4,
                            opacity: isSelected ? 1 : 0.78,
                            fontWeight: 500,
                          }}
                        >
                          {exp.dateRange}
                        </div>
                        <div
                          style={{
                            color: isSelected ? "#fff" : "rgba(255,255,255,0.9)",
                            fontSize: isCompactView ? (isSelected ? 13 : 11) : isCondensedView ? (isSelected ? 15 : 12) : isSelected ? 18 : 16,
                            letterSpacing: isCompactView ? "0.04em" : isCondensedView ? "0.06em" : "0.08em",
                            fontWeight: 700,
                            transition: "all 0.2s ease",
                            textShadow: isSelected ? "0 0 20px rgba(145,4,12,0.5)" : "none",
                            lineHeight: isCompactView ? 1.15 : 1.2,
                            wordBreak: isCondensedView ? "break-word" : "normal",
                          }}
                        >
                          {isCondensedView && !isSelected ? getCompactTitle(exp.title) : exp.title}
                        </div>
                        <div style={{ marginTop: 4 }}>
                          {exp.status === "upcoming" ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <div className="rounded-full animate-pulse" style={{ width: 5, height: 5, background: "#22c55e" }} />
                              <span style={{ color: "#22c55e", fontSize: isCompactView ? 10 : 11, letterSpacing: "0.04em" }}>идёт набор</span>
                            </div>
                          ) : exp.status === "completed" ? (
                            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: isCompactView ? 10 : 11, letterSpacing: "0.04em" }}>завершена</div>
                          ) : (
                            <div style={{ color: "rgba(255,255,255,0.3)", fontSize: isCompactView ? 10 : 11, letterSpacing: "0.04em" }}>набор закрыт</div>
                          )}
                        </div>
                      </div>
                    )}

                  <motion.div
                    animate={isSelected ? { scale: [1, 1.12, 1] } : {}}
                    transition={{ duration: 2, repeat: isSelected ? Infinity : 0 }}
                    style={{ position: "relative" }}
                  >
                    {isSelected && (
                      <motion.div
                        className="absolute rounded-full"
                        style={{ inset: "-10px", background: "rgba(145,4,12,0.2)", filter: "blur(10px)" }}
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.15, 0.5] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      />
                    )}
                    <MapPin style={{
                      width: isCompactView ? (isSelected ? 28 : isHovered ? 24 : 20) : isSelected ? 34 : isHovered ? 28 : 24,
                      height: isCompactView ? (isSelected ? 28 : isHovered ? 24 : 20) : isSelected ? 34 : isHovered ? 28 : 24,
                      color: pinColor, fill: pinFill, transition: "all 0.2s ease",
                      filter: isSelected ? "drop-shadow(0 0 10px rgba(145,4,12,0.85))" : exp.isFeatured ? "drop-shadow(0 0 6px rgba(145,4,12,0.5))" : "none",
                    }} />
                  </motion.div>
                </motion.div>
              );
            })}

            {/* ── Decorative illustrations ── */}
            {DECORATIONS.map((dec) => (
              <svg
                key={dec.id}
                className="absolute pointer-events-none"
                style={{
                  left: dec.x + CYCLE_WIDTH, top: dec.y,
                  width: dec.width, height: dec.height,
                  transform: dec.rotate ? `rotate(${dec.rotate}deg)` : "none",
                  opacity: dec.opacity,
                  zIndex: 2,
                }}
                viewBox={dec.viewBox}
              >
                {dec.paths.map((p, i) => (
                  <path
                    key={i}
                    d={p.d}
                    fill={p.fill ? "white" : "none"}
                    stroke="white"
                    strokeWidth={p.strokeWidth ?? (p.fill ? 0.3 : 1.2)}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}
              </svg>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Expedition Info Card ═══ */}
      <div ref={infoCardRef} className="w-full bg-[#0B0B0C] border-t border-white/8" style={{ scrollMarginTop: 80 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-10"
          >
            {/* Expedition Image */}
            <div className="relative w-full overflow-hidden rounded-lg mb-8" style={{ height: "clamp(180px, 22vw, 280px)" }}>
              <ImageWithFallback
                src={selected.image}
                alt={selected.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0C] via-transparent to-transparent" style={{ opacity: 0.7 }} />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0C]/40 to-transparent" />
              <div className="absolute bottom-4 left-5 flex items-center gap-2">
                <MapPin className="w-4 h-4" style={{ color: "#91040C" }} />
                <span className="text-white/90 uppercase tracking-widest" style={{ fontSize: 12 }}>{selected.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-16">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-3 py-1 rounded-full text-white/60 border border-white/10 uppercase tracking-widest" style={{ fontSize: 11 }}>
                    {selected.month}
                  </span>
                  <span className="px-3 py-1 rounded-full uppercase tracking-widest" style={{
                    fontSize: 11, color: DIFF_COLOR[selected.difficulty],
                    border: `1px solid ${DIFF_COLOR[selected.difficulty]}40`,
                    background: `${DIFF_COLOR[selected.difficulty]}12`,
                  }}>
                    {selected.difficulty}
                  </span>
                  {selected.status === "completed" ? (
                    <span className="px-3 py-1 rounded-full uppercase tracking-widest text-white/55 border border-white/10" style={{ fontSize: 11 }}>
                      Завершена
                    </span>
                  ) : selected.status === "closed" ? (
                    <span className="px-3 py-1 rounded-full uppercase tracking-widest text-white/30 border border-white/10" style={{ fontSize: 11 }}>
                      Набор закрыт
                    </span>
                  ) : null}
                </div>

                <h3 className="text-white mb-1" style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, letterSpacing: "0.06em" }}>
                  {selected.title}
                </h3>
                <p className="mb-5" style={{ color: "#91040C", fontSize: "clamp(13px, 1.3vw, 16px)", letterSpacing: "0.04em" }}>
                  {selected.tagline}
                </p>

                <div className="flex flex-wrap items-center gap-3 mb-6">
                  {[
                    { icon: Calendar, text: selected.dateRange },
                    { icon: Clock, text: selected.duration },
                    { icon: MapPin, text: selected.location },
                    { icon: Truck, text: selected.transport },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-white/15">·</span>}
                      <Icon className="w-4 h-4 flex-shrink-0" style={{ color: "#91040C" }} />
                      <span className="text-white/55" style={{ fontSize: "clamp(12px,1.2vw,14px)" }}>{text}</span>
                    </div>
                  ))}
                </div>

                <p className="text-white/60 leading-relaxed mb-6" style={{ fontSize: "clamp(13px,1.2vw,15px)", maxWidth: 640 }}>
                  {selected.description}
                </p>

                <div className="flex flex-wrap gap-x-6 gap-y-2">
                  {selected.highlights.map((h) => (
                    <div key={h} className="flex items-center gap-2 text-white/65" style={{ fontSize: "clamp(12px,1.1vw,14px)" }}>
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" style={{ color: "#91040C" }} />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-start lg:items-end justify-between gap-6 lg:min-w-[220px]">
                <div>
                  <div className="text-white/40 mb-1 uppercase tracking-widest" style={{ fontSize: 11 }}>стоимость / чел</div>
                  <div className="text-white leading-none" style={{ fontSize: "clamp(28px,3.5vw,44px)", fontWeight: 700 }}>
                    {selected.price}
                    <span className="text-white/50 ml-1" style={{ fontSize: "0.55em" }}>₽</span>
                  </div>
                </div>

                <div>
                  <div className="text-white/40 mb-2 uppercase tracking-widest" style={{ fontSize: 11 }}>свободных мест</div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1">
                      {Array.from({ length: selected.spots.total }).map((_, i) => (
                        <div key={i} className="rounded-full" style={{ width: 8, height: 8, background: i < selected.spots.booked ? "#91040C" : "rgba(255,255,255,0.25)" }} />
                      ))}
                    </div>
                    <span className="text-white/50" style={{ fontSize: 13 }}>
                      {selected.spots.total - selected.spots.booked} из {selected.spots.total}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 w-full lg:w-auto">
                  {selected.status === "upcoming" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-green-500 uppercase tracking-widest" style={{ fontSize: 11 }}>Идёт набор</span>
                    </div>
                  ) : selected.status === "completed" ? (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/50" />
                      <span className="text-white/50 uppercase tracking-widest" style={{ fontSize: 11 }}>Экспедиция завершена</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-white/30" />
                      <span className="text-white/30 uppercase tracking-widest" style={{ fontSize: 11 }}>Набор закрыт</span>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-3">
                    <motion.button
                      className="flex items-center justify-center gap-3 px-7 py-3.5 rounded-none text-white uppercase tracking-[0.12em] transition-all duration-200"
                      style={{
                        fontSize: "clamp(11px,1vw,13px)",
                        background: selected.status === "upcoming" || selected.status === "completed" ? "#91040C" : "rgba(255,255,255,0.07)",
                        border: selected.status === "upcoming" || selected.status === "completed" ? "1px solid #91040C" : "1px solid rgba(255,255,255,0.12)",
                        cursor: selected.status === "closed" ? "default" : "pointer",
                      }}
                      whileHover={selected.status === "closed" ? {} : { background: "#6d0309", x: 2 }}
                      whileTap={selected.status === "closed" ? {} : { scale: 0.97 }}
                      onClick={() => {
                        if (selected.status === "completed" && onNavigate) {
                          onNavigate({ page: "experience-detail", id: selected.id });
                        }
                      }}
                    >
                      {selected.status === "completed" ? "Посмотреть, как это было" : selected.status === "upcoming" ? "Забронировать" : "Лист ожидания"}
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <motion.button
                      className="flex items-center justify-center gap-2 px-7 py-3.5 rounded-none uppercase tracking-[0.12em] transition-all duration-200"
                      style={{
                        fontSize: "clamp(11px,1vw,13px)",
                        background: "rgba(0,0,0,0)",
                        border: "1px solid rgba(255,255,255,0.15)",
                        cursor: "pointer",
                        color: "rgba(255,255,255,0.8)",
                      }}
                      whileHover={{ background: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.3)", color: "rgba(255,255,255,1)" }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => onNavigate && onNavigate({ page: "experience-detail", id: selected.id })}
                    >
                      Подробнее
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mt-8 pt-6 border-t border-white/8">
              {expeditions.map((exp) => (
                <button
                  key={exp.id}
                  onClick={() => handleSelect(exp.id, true)}
                  className="transition-all duration-200"
                  title={exp.title}
                  style={{
                    width: selectedId === exp.id ? 26 : 6, height: 6, borderRadius: 3,
                    background: selectedId === exp.id ? "#91040C" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
