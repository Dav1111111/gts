import type { CMSData } from "./cmsTypes";

export const cmsDefaults: CMSData = {
  hero: {
    title: "GRAND TOUR",
    titleAccent: "SPIRIT",
    subtitle: "Премиальный клуб активного отдыха.\nАренда техники, экспедиции и\u00a0маршруты.",
    chatBotGreeting: "Добро пожаловать в GTS! Чем могу помочь?"
  },

  about: {
    badge: "О КЛУБЕ",
    title: "GRAND TOUR",
    titleAccent: "SPIRIT",
    description: "Эксклюзивный клуб для тех, кто ценит качество, комфорт и неординарные впечатления. Мы создаем уникальные приключения на премиальной технике в самых живописных локациях Сочи и Краснодарского края.",
    subdescription: "Каждое путешествие с GTS — это не просто аренда техники, а тщательно продуманный опыт с персональным сервисом, который соответствует статусу наших членов.",
    stats: {
      members: "50+",
      vehicles: "15",
      routes: "200+",
      support: "24/7"
    },
    features: [
      { id: "f1", icon: "Crown", title: "Эксклюзивность", description: "Закрытое членство для истинных ценителей качества и статуса" },
      { id: "f2", icon: "Shield", title: "Безопасность", description: "Высочайшие стандарты безопасности и профессиональное сопровождение" },
      { id: "f3", icon: "Users", title: "Сообщество", description: "Клуб единомышленников с общими ценностями и интересами" },
      { id: "f4", icon: "MapPin", title: "Уникальные маршруты", description: "Доступ к секретным локациям и эксклюзивным маршрутам" }
    ]
  },

  vehicleCategories: [
    {
      id: "vc1",
      icon: "Car",
      title: "Земной",
      subtitle: "Премиальные внедорожники",
      description: "Mercedes G-Class, Range Rover, Lexus LX — для покорения любых маршрутов",
      stats: "12 единиц",
      image: "https://images.unsplash.com/photo-1758411898071-6bc67c8c66a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBvZmYtcm9hZCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjE1MDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "ground"
    },
    {
      id: "vc2",
      icon: "Ship",
      title: "Водный",
      subtitle: "Элитные яхты и катера",
      description: "Azimut, Riva, Sea Ray — роскошь на воде с полным сервисом",
      stats: "8 единиц",
      image: "https://images.unsplash.com/photo-1612764324168-7a3a318e0cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHNhaWxpbmclMjB3YXRlcnxlbnwxfHx8fDE3NjE1MDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "water"
    },
    {
      id: "vc3",
      icon: "Plane",
      title: "Воздушный",
      subtitle: "Вертолеты премиум-класса",
      description: "Robinson R66, Airbus H125 — полеты над горами и морем",
      stats: "3 единицы",
      image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWxpY29wdGVyJTIwYXZpYXRpb24lMjBhZXJpYWx8ZW58MXx8fHwxNzYxNTAwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      link: "air"
    }
  ],

  topOffers: [
    {
      id: "sunset-yacht",
      title: "Закатный круиз",
      subtitle: "На премиальной яхте",
      description: "Романтическое путешествие вдоль побережья Сочи с шампанским и авторской кухней",
      image: "https://images.unsplash.com/photo-1635253049221-fbd5d20d81ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldCUyMHByZW1pdW18ZW58MXx8fHwxNzYxNTAzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "450 000",
      originalPrice: "550 000",
      duration: "4 часа",
      location: "Сочи",
      capacity: "До 8 человек",
      rating: 5.0,
      reviewsCount: 24,
      badge: "ХИТ СЕЗОНА",
      discount: "-18%",
      features: ["Шеф-повар на борту", "Премиум бар", "Фотосессия в подарок"]
    },
    {
      id: "mountain-heli",
      title: "Горная панорама",
      subtitle: "Вертолетный тур",
      description: "Эксклюзивный полет над Кавказскими горами с посадкой на горной вершине",
      image: "https://images.unsplash.com/photo-1701540019498-2663ee86a797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwbW91bnRhaW4lMjB0b3VyJTIwYWVyaWFsfGVufDF8fHx8MTc2MTUwMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "850 000",
      duration: "2.5 часа",
      location: "Красная Поляна",
      capacity: "До 4 человек",
      rating: 5.0,
      reviewsCount: 18,
      badge: "ЭКСКЛЮЗИВ",
      features: ["Пикник на вершине", "Профессиональный гид", "VIP трансфер"]
    },
    {
      id: "night-city",
      title: "Ночной город",
      subtitle: "Premium SUV Experience",
      description: "Вечерняя прогулка по Сочи на эксклюзивном внедорожнике с личным водителем",
      image: "https://images.unsplash.com/photo-1743489556992-73ce76c44580?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBuaWdodCUyMGNpdHl8ZW58MXx8fHwxNzYxNTAzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "180 000",
      originalPrice: "220 000",
      duration: "6 часов",
      location: "Сочи",
      capacity: "До 6 человек",
      rating: 4.9,
      reviewsCount: 32,
      discount: "-20%",
      features: ["Личный консьерж", "Ужин в ресторане", "VIP доступ"]
    }
  ],

  experiences: [
    {
      id: "yacht-cruise",
      title: "Яхта Premium",
      subtitle: "Морские прогулки",
      description: "Элитная яхта с полным сервисом для незабываемых морских путешествий",
      image: "https://images.unsplash.com/photo-1612764324168-7a3a318e0cbb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHNhaWxpbmclMjB3YXRlcnxlbnwxfHx8fDE3NjE1MDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 450 000",
      duration: "4-8 часов",
      capacity: "До 8 чел",
      location: "Сочи",
      category: "water",
      isPopular: true
    },
    {
      id: "wakesurf",
      title: "Вейксёрф",
      subtitle: "Водные виды спорта",
      description: "Катер с инструктором для занятий вейксёрфингом и водными лыжами",
      image: "https://images.unsplash.com/photo-1632192661928-d26125608355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YWtlYm9hcmQlMjB3YXRlciUyMHNwb3J0c3xlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 35 000",
      duration: "1-2 часа",
      capacity: "До 4 чел",
      location: "Сочи",
      category: "water",
      isNew: true
    },
    {
      id: "buggy-expedition",
      title: "Багги-экспедиция",
      subtitle: "Экстремальные маршруты",
      description: "Мощные багги для покорения горных троп и бездорожья",
      image: "https://images.unsplash.com/photo-1742141475441-f4bc74903776?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidWdneSUyMG9mZi1yb2FkJTIwYWR2ZW50dXJlfGVufDF8fHx8MTc2MTUwNDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 65 000",
      duration: "3-5 часов",
      capacity: "2 чел/багги",
      location: "Красная Поляна",
      category: "ground",
      isPopular: true
    },
    {
      id: "suv-tour",
      title: "Premium SUV",
      subtitle: "Комфортные маршруты",
      description: "Люксовые внедорожники с водителем для путешествий в горы",
      image: "https://images.unsplash.com/photo-1758411898071-6bc67c8c66a9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBzdXYlMjBvZmYtcm9hZCUyMG1vdW50YWluc3xlbnwxfHx8fDE3NjE1MDA0NzV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 85 000",
      duration: "4-8 часов",
      capacity: "До 6 чел",
      location: "Сочи, КП",
      category: "ground"
    },
    {
      id: "helicopter-tour",
      title: "Вертолетный тур",
      subtitle: "Панорамные полеты",
      description: "Эксклюзивные полеты над Кавказскими горами с посадкой на вершине",
      image: "https://images.unsplash.com/photo-1630866217872-764be80838fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBoZWxpY29wdGVyJTIwYXZpYXRpb24lMjBhZXJpYWx8ZW58MXx8fHwxNzYxNTAwNDc2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 850 000",
      duration: "1-3 часа",
      capacity: "До 4 чел",
      location: "Красная Поляна",
      category: "air",
      isPopular: true
    },
    {
      id: "catering",
      title: "Premium Кейтеринг",
      subtitle: "Авторская кухня",
      description: "Шеф-повар и команда для организации незабываемого ужина в любой точке",
      image: "https://images.unsplash.com/photo-1719786625035-71f46082e385?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjYXRlcmluZyUyMGZvb2QlMjBzZXJ2aWNlfGVufDF8fHx8MTc2MTUwNDU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 150 000",
      duration: "По договору",
      capacity: "До 20 чел",
      location: "Любая",
      category: "services"
    },
    {
      id: "concierge",
      title: "Консьерж-сервис",
      subtitle: "Персональный помощник",
      description: "Полное сопровождение и организация любых ваших пожеланий 24/7",
      image: "https://images.unsplash.com/photo-1587567818566-3272be7d64c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jaWVyZ2UlMjBzZXJ2aWNlJTIwcHJlbWl1bXxlbnwxfHx8fDE3NjE1MDQ1NjV8MA&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 50 000/день",
      duration: "По запросу",
      capacity: "VIP",
      location: "Сочи, КП",
      category: "services",
      isNew: true
    },
    {
      id: "photoshoot",
      title: "Фотосессия",
      subtitle: "Профессиональная съемка",
      description: "Личный фотограф для запечатления ваших приключений",
      image: "https://images.unsplash.com/photo-1722631954755-7ee8e1ff4138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaG90b2dyYXBoeSUyMHNlc3Npb24lMjBvdXRkb29yfGVufDF8fHx8MTc2MTUwNDU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
      price: "от 25 000",
      duration: "2-4 часа",
      capacity: "Любая группа",
      location: "Сочи, КП",
      category: "services"
    }
  ],

  scenarios: [
    {
      id: "sunset-complete",
      title: "Закатное приключение",
      description: "Вертолетный тур на закате + ужин на горной вершине с шеф-поваром + фотосессия",
      experiences: ["helicopter-tour", "catering", "photoshoot"],
      price: "от 1 150 000",
      image: "https://images.unsplash.com/photo-1701540019498-2663ee86a797?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwbW91bnRhaW4lMjB0b3VyJTIwYWVyaWFsfGVufDF8fHx8MTc2MTUwMzk5Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "6 часов",
      badge: "ЭКСКЛЮЗИВ"
    },
    {
      id: "sea-adventure",
      title: "Морское путешествие",
      description: "Яхта Premium на целый день + вейксёрф с инструктором + кейтеринг на борту",
      experiences: ["yacht-cruise", "wakesurf", "catering"],
      price: "от 650 000",
      image: "https://images.unsplash.com/photo-1635253049221-fbd5d20d81ea?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHN1bnNldCUyMHByZW1pdW18ZW58MXx8fHwxNzYxNTAzOTk2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "8 часов",
      badge: "ХИТ"
    },
    {
      id: "mountain-extreme",
      title: "Горная экспедиция",
      description: "Багги-тур по горным тропам + консьерж-сопровождение + пикник от шеф-повара",
      experiences: ["buggy-expedition", "concierge", "catering"],
      price: "от 280 000",
      image: "https://images.unsplash.com/photo-1548095779-26dbc38010ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGd1aWRlJTIwaGlraW5nfGVufDF8fHx8MTc2MTUwNDU2Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      duration: "5 часов"
    }
  ],

  postAuthors: [
    { id: "gts-team", name: "Команда GTS", role: "team", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GTS&backgroundColor=91040C", verified: true },
    { id: "guide-alex", name: "Александр Горный", role: "guide", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex", verified: true },
    { id: "partner-hotel", name: "Radisson Blu Сочи", role: "partner", avatar: "https://api.dicebear.com/7.x/initials/svg?seed=RB&backgroundColor=1e40af" },
    { id: "guest-maria", name: "Мария К.", role: "guest", avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" }
  ],

  posts: [
    {
      id: "post-1", type: "news", authorId: "gts-team",
      title: "Новый маршрут: Каньоны Красной Поляны",
      content: "Рады представить эксклюзивный маршрут по живописным каньонам Красной Поляны! В программу входит: путешествие на премиальных багги по горным тропам, посещение 3 водопадов, пикник от шеф-повара на берегу горной реки и профессиональная фотосессия. Маршрут разработан нашими гидами специально для тех, кто ищет сочетание адреналина и комфорта.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNhbnlvbiUyMHdhdGVyZmFsbHxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["новый маршрут", "багги", "каньоны", "красная поляна"],
      date: "25.10.2025", views: 1247, likes: 89, comments: 12
    },
    {
      id: "post-2", type: "guide_story", authorId: "guide-alex",
      title: "5 секретных мест для фотосессий в горах",
      content: "За 8 лет работы гидом я открыл десятки удивительных локаций. Сегодня поделюсь пятью лучшими местами для незабываемых фотографий. 1) Смотровая площадка \"Орлиное гнездо\" (2100м) - панорама на 360°. 2) Скрытый водопад \"Изумрудный\" - доступен только на внедорожниках...",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMHBob3RvZ3JhcGh5JTIwbG9jYXRpb258ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["советы гида", "фотография", "секретные места", "горы"],
      date: "23.10.2025", views: 2341, likes: 156, comments: 28
    },
    {
      id: "post-3", type: "partner", authorId: "partner-hotel",
      title: "Специальное предложение для членов GTS Club",
      content: "Radisson Blu Сочи рад предложить эксклюзивные условия для членов клуба GTS: скидка 25% на номера категории Suite, комплиментарный завтрак и поздний выезд до 16:00. Бронирование доступно для дат с 1 ноября по 20 декабря 2025.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBob3RlbCUyMHJvb218ZW58MXx8fHwxNzYxNTA0NTY2fDA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["партнер", "отель", "спецпредложение", "сочи"],
      date: "22.10.2025", views: 892, likes: 67, comments: 8
    },
    {
      id: "post-4", type: "review", authorId: "guest-maria",
      title: "Незабываемый день рождения на вершине мира!",
      content: "Благодарю команду GTS за организацию идеального дня рождения! Вертолетный тур с посадкой на леднике, ужин от шеф-повара Михаила и невероятная забота команды сделали этот день особенным. Особая благодарность гиду Александру за интересный рассказ о горах и профессионализм. Уже планируем следующее приключение!",
      image: "https://images.unsplash.com/photo-1519904981063-b0cf448d479e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGNlbGVicmF0aW9uJTIwaGVsaWNvcHRlcnxlbnwxfHx8fDE3NjE1MDQ1NjZ8MA&ixlib=rb-4.1.0&q=80&w=1080",
      tags: ["отзыв", "вертолет", "день рождения", "впечатления"],
      date: "20.10.2025", views: 1534, likes: 124, comments: 19
    },
    {
      id: "post-5", type: "offer", authorId: "gts-team",
      title: "Осенняя акция: -30% на морские прогулки",
      content: "Только до конца октября! Скидка 30% на аренду яхт и катеров в будние дни. Насладитесь спокойным морем и теплой осенью без летних толп туристов. В стоимость включены: капитан, топливо, базовый кейтеринг. Количество мест ограничено!",
      tags: ["акция", "яхта", "скидка", "осень"],
      date: "18.10.2025", views: 3124, likes: 234, comments: 45
    },
    {
      id: "post-6", type: "guide_story", authorId: "guide-alex",
      title: "Как подготовиться к горной экспедиции: чек-лист от гида",
      content: "Многие гости спрашивают, что взять с собой в горы. Составил подробный чек-лист для комфортного путешествия: одежда (многослойность - ваш друг!), солнцезащитные очки обязательны даже осенью, удобная обувь с нескользящей подошвой, термос с горячим чаем...",
      tags: ["советы", "подготовка", "снаряжение", "горы"],
      date: "15.10.2025", views: 1876, likes: 142, comments: 34
    }
  ],

  reviews: [
    {
      id: "r1", name: "Анна Петрова",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616c68f7b51?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGJ1c2luZXNzJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzU2NjUzNzM4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5, date: "15 янв 2025",
      text: "Незабываемый день на Yamaha 252S! Профессиональная команда, идеальная техника. Обязательно вернемся!",
      service: "Катер Yamaha 252S", verified: true
    },
    {
      id: "r2", name: "Дмитрий Волков",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBidXNpbmVzcyUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1MzczOXww&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5, date: "12 янв 2025",
      text: "Slingshot R превзошел все ожидания! Адреналин зашкаливает, а виды Красной Поляны просто космос.",
      service: "Polaris Slingshot R", verified: true
    },
    {
      id: "r3", name: "Мария Соколова",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMHBvcnRyYWl0JTIwc21pbGluZ3xlbnwxfHx8fDE3NTY2NTM3NDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
      rating: 5, date: "8 янв 2025",
      text: "Полет на Robinson R44 - это что-то невероятное! Пилот показал все самые красивые места. Рекомендую!",
      service: "Вертолёт Robinson R44", verified: true
    }
  ],

  guestStories: [
    {
      id: "gs1", author: "Андрей К.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBwb3J0cmFpdCUyMGF2YXRhcnxlbnwxfHx8fDE3NTY2NTM3NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "2 дня назад", type: "photo",
      content: "https://images.unsplash.com/photo-1723416422802-d07883bd9764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob25kYSUyMGJ1Z2d5JTIwb2ZmJTIwcm9hZHxlbnwxfHx8fDE3NTYxNDI3ODh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Honda Talon покорил все вершины! 🏔️ Такого драйва давно не испытывал",
      likes: 89, comments: 12, location: "Красная Поляна", service: "Honda Talon"
    },
    {
      id: "gs2", author: "Елена М.",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3b21hbiUyMGF2YXRhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc1NjY1Mzc0Mnww&ixlib=rb-4.1.0&q=80&w=1080",
      date: "4 дня назад", type: "video",
      content: "https://images.unsplash.com/photo-1729282840531-bbb8a710756c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb2xhcmlzJTIwc2xpbmdzaG90JTIwc3BvcnRzJTIwY2FyfGVufDF8fHx8MTc1NjEzNjEyM3ww&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Романтический закат на Slingshot ❤️ Идеальное свидание!",
      likes: 124, comments: 18, location: "Набережная Сочи", service: "Polaris Slingshot R"
    },
    {
      id: "gs3", author: "Максим Р.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYW4lMjBhdmF0YXIlMjBwb3J0cmFpdHxlbnwxfHx8fDE3NTY2NTM3NDN8MA&ixlib=rb-4.1.0&q=80&w=1080",
      date: "1 неделя назад", type: "photo",
      content: "https://images.unsplash.com/photo-1621499901409-cfc9598bf28a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5YW1haGElMjBib2F0JTIwbHV4dXJ5JTIweWFjaHR8ZW58MXx8fHwxNzU2MTQyNzg3fDA&ixlib=rb-4.1.0&q=80&w=1080",
      caption: "Корпоративная поездка на Yamaha 252S 🛥️ Команда в восторге!",
      likes: 67, comments: 8, location: "Чёрное море", service: "Yamaha 252S"
    }
  ],

  membershipTiers: [
    { id: "silver", name: "Silver", price: "300,000₽", period: "в год", description: "Премиум техника, эксклюзивные маршруты, персональный консультант", icon: "Star", isPopular: true, gradient: "from-slate-100 to-slate-200" },
    { id: "gold", name: "Gold", price: "500,000₽", period: "в год", description: "Полный доступ, персональные маршруты, консьерж-сервис 24/7", icon: "Crown", gradient: "from-yellow-100 to-yellow-200" },
    { id: "platinum", name: "Platinum", price: "1,000,000₽", period: "в год", description: "Безлимитный доступ, индивидуальные экспедиции, персональная команда", icon: "Crown", gradient: "from-gray-100 to-gray-200" }
  ],

  footer: {
    description: "Премиальный клуб активного отдыха в Сочи. Эксклюзивные экспедиции, аренда техники и закрытые клубные привилегии для ценителей качества и статуса.",
    services: ["Морские прогулки", "Багги-экспедиции", "Premium SUV туры", "Вертолетные туры", "Консьерж-сервис"],
    contact: {
      phone: "+7 (862) 555-0123",
      phoneNote: "Ежедневно 24/7",
      email: "club@grandtoursochi.ru",
      emailNote: "Ответим в течение часа",
      address: "Сочи, Олимпийский парк",
      addressNote: "Адлерский район",
      socialLinks: { instagram: "#", facebook: "#", youtube: "#" }
    },
    copyright: "© 2024 Grand Tour Spirit. Все права защищены.",
    membershipCTA: {
      title: "ПРЕМИАЛЬНОЕ ЧЛЕНСТВО",
      description: "Получите доступ к эксклюзивным мероприятиям, приоритетному бронированию и персональному консьерж-сервису",
      buttonText: "УЗНАТЬ ПОДРОБНЕЕ"
    }
  }
};
