import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Route } from "./GTSRouter";
import { useGTSAuth } from "../contexts/GTSAuthContext";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Menu, X, ChevronDown, Phone, 
  Ship, Car, Plane, Sparkles, Calendar, 
  MapPin, Users, MessageCircle,
  Newspaper, User, LogOut
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { GTSLogo } from "./GTSLogo";

interface NavItem {
  id: string;
  label: string;
  href: string;
  hasSubmenu?: boolean;
  submenu?: {
    title: string;
    items: {
      icon: any;
      label: string;
      description: string;
      href: string;
    }[];
  }[];
}

interface GTSNavigationHeaderProps {
  onNavigate?: (route: Route) => void;
}

const navItems: NavItem[] = [
  {
    id: "experiences",
    label: "Впечатления",
    href: "experiences",
    hasSubmenu: true,
    submenu: [
      {
        title: "По категориям",
        items: [
          {
            icon: Ship,
            label: "Водные",
            description: "Яхты, катера, вейксёрф",
            href: "experiences?category=water"
          },
          {
            icon: Car,
            label: "Наземные",
            description: "Багги, SUV, экспедиции",
            href: "experiences?category=ground"
          },
          {
            icon: Plane,
            label: "Воздушные",
            description: "Вертолёты, панорамные туры",
            href: "experiences?category=air"
          },
          {
            icon: Sparkles,
            label: "Premium услуги",
            description: "Кейтеринг, консьерж, фото",
            href: "experiences?category=services"
          }
        ]
      }
    ]
  },
  {
    id: "about",
    label: "О клубе",
    href: "about"
  },
  {
    id: "feed",
    label: "Истории",
    href: "stories",
    hasSubmenu: true,
    submenu: [
      {
        title: "Категории",
        items: [
          {
            icon: Newspaper,
            label: "Новости",
            description: "Анонсы и события клуба",
            href: "stories?filter=news"
          },
          {
            icon: MapPin,
            label: "Советы гидов",
            description: "Секретные места и маршруты",
            href: "stories?filter=guide_story"
          },
          {
            icon: MessageCircle,
            label: "Отзывы гостей",
            description: "Реальные истории",
            href: "stories?filter=review"
          }
        ]
      }
    ]
  },
  {
    id: "map",
    label: "Карта активности",
    href: "landing"
  },
];

export function GTSNavigationHeader({ onNavigate }: GTSNavigationHeaderProps = {}) {
  const { user, isAuthenticated, logout } = useGTSAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = useCallback((href: string) => {
    setIsMobileMenuOpen(false);
    setActiveSubmenu(null);

    if (onNavigate) {
      // Используем роутер если есть функция навигации
      // Убираем # если он есть
      const cleanHref = href.startsWith('#') ? href.substring(1) : href;

      if (cleanHref === "landing" || cleanHref === "") {
        onNavigate({ page: "landing" });
      } else if (cleanHref === "about") {
        onNavigate({ page: "about" });
      } else if (cleanHref === "experiences" || cleanHref.startsWith("experiences")) {
        if (cleanHref.includes("?category=")) {
          const category = cleanHref.split("=")[1];
          onNavigate({ page: "experiences", category });
        } else {
          onNavigate({ page: "experiences" });
        }
      } else if (cleanHref === "stories" || cleanHref.startsWith("stories")) {
        if (cleanHref.includes("?filter=")) {
          const filter = cleanHref.split("=")[1];
          onNavigate({ page: "stories", filter });
        } else {
          onNavigate({ page: "stories" });
        }
      } else if (cleanHref === "contacts") {
        onNavigate({ page: "contacts" });
      }
    } else {
      // Fallback к якорям на лендинге
      const anchorId = href.startsWith('#') ? href.substring(1).split('?')[0] : href.split('?')[0];
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [onNavigate]);

  const handleProfileNavigation = useCallback(() => {
    if (!onNavigate || !user) {
      return;
    }

    if (user.role === "partner") {
      onNavigate({ page: "partner-portal" });
      return;
    }

    if (user.role === "staff" || user.role === "executive") {
      onNavigate({ page: "admin" });
      return;
    }

    onNavigate({ page: "member-portal" });
  }, [onNavigate, user]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-300
          ${isScrolled 
            ? "bg-black/95 backdrop-blur-xl border-b border-white/10 shadow-lg" 
            : "bg-black/60 backdrop-blur-md"
          }
        `}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20 lg:h-24">
            
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="cursor-pointer focus-visible:ring-2 focus-visible:ring-yellow-500 rounded"
              role="button"
              tabIndex={0}
              onClick={() => {
                if (onNavigate) {
                  onNavigate({ page: "landing" });
                }
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onKeyDown={(e: React.KeyboardEvent) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  if (onNavigate) {
                    onNavigate({ page: "landing" });
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
            >
              <GTSLogo size="sm" />
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className="relative"
                  onMouseEnter={() => item.hasSubmenu && setActiveSubmenu(item.id)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  <button
                    onClick={() => handleNavClick(item.href)}
                    className="flex items-center px-4 py-2 text-white/80 hover:text-white transition-colors text-sm tracking-wide group"
                  >
                    {item.label}
                    {item.hasSubmenu && (
                      <ChevronDown className="w-4 h-4 ml-1 transition-transform group-hover:translate-y-0.5" />
                    )}
                  </button>

                  {/* Submenu Dropdown */}
                  <AnimatePresence>
                    {item.hasSubmenu && activeSubmenu === item.id && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 bg-[#121214] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                      >
                        {item.submenu?.map((section, idx) => (
                          <div key={idx} className="p-3">
                            <p className="text-white/50 text-xs tracking-wider uppercase mb-3 px-3">
                              {section.title}
                            </p>
                            <div className="space-y-1">
                              {section.items.map((subItem) => (
                                <button
                                  key={subItem.href}
                                  onClick={() => handleNavClick(subItem.href)}
                                  className="w-full flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors text-left group focus-visible:ring-2 focus-visible:ring-yellow-500"
                                >
                                  <div className="w-10 h-10 bg-[#91040C]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3 group-hover:bg-[#91040C]/20 transition-colors">
                                    <subItem.icon className="w-5 h-5 text-[#91040C]" aria-hidden="true" />
                                  </div>
                                  <div>
                                    <div className="text-white text-sm mb-0.5">
                                      {subItem.label}
                                    </div>
                                    <div className="text-white/50 text-xs">
                                      {subItem.description}
                                    </div>
                                  </div>
                                </button>
                              ))}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center space-x-3">
              <Button
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:border-white/40"
                onClick={() => onNavigate && onNavigate({ page: "contacts" })}
              >
                <Phone className="w-4 h-4 mr-2" />
                Контакты
              </Button>
              
              {isAuthenticated && user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors border border-white/20 focus-visible:ring-2 focus-visible:ring-yellow-500"
                    aria-label="Меню пользователя"
                  >
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <ImageWithFallback
                        src={user.avatar || ""}
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-left">
                      <p className="text-white text-sm">{user.name.split(' ')[0]}</p>
                      {user.membershipTier && (
                        <p className="text-white/60 text-xs capitalize">{user.membershipTier}</p>
                      )}
                    </div>
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  </button>

                  {/* User Dropdown */}
                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 w-64 bg-[#121214] border border-white/10 rounded-lg shadow-2xl overflow-hidden"
                      >
                        <div className="p-4 border-b border-white/10">
                          <p className="text-white mb-1">{user.name}</p>
                          <p className="text-white/60 text-sm">{user.email}</p>
                          {user.points && (
                            <div className="flex items-center gap-2 mt-2">
                              <Badge className="bg-[#91040C]/20 text-[#91040C] border-0">
                                {user.points} баллов
                              </Badge>
                            </div>
                          )}
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              handleProfileNavigation();
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-white/80 hover:text-white hover:bg-white/5 rounded-lg transition-colors text-left"
                          >
                            <User className="w-4 h-4" />
                            Личный кабинет
                          </button>
                          <button
                            onClick={() => {
                              setShowUserMenu(false);
                              logout();
                              onNavigate && onNavigate({ page: "landing" });
                            }}
                            className="w-full flex items-center gap-3 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors text-left"
                          >
                            <LogOut className="w-4 h-4" />
                            Выйти
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Button 
                  className="bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                  onClick={() => onNavigate && onNavigate({ page: "login" })}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Войти
                </Button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:bg-white/10 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-yellow-500"
              aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>

          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-[#0B0B0C] z-50 lg:hidden overflow-y-auto"
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                  <GTSLogo size="sm" />
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Navigation Items */}
                <nav className="space-y-2 mb-8">
                  {navItems.map((item) => (
                    <div key={item.id}>
                      <button
                        onClick={() => {
                          if (item.hasSubmenu) {
                            setActiveSubmenu(activeSubmenu === item.id ? null : item.id);
                          } else {
                            handleNavClick(item.href);
                          }
                        }}
                        className="w-full flex items-center justify-between p-4 text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span className="text-base">{item.label}</span>
                        {item.hasSubmenu && (
                          <ChevronDown
                            className={`w-5 h-5 text-white/60 transition-transform ${
                              activeSubmenu === item.id ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </button>

                      {/* Submenu */}
                      <AnimatePresence>
                        {item.hasSubmenu && activeSubmenu === item.id && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="pl-4 pt-2 space-y-2">
                              {item.submenu?.map((section) => (
                                <div key={section.title}>
                                  {section.items.map((subItem) => (
                                    <button
                                      key={subItem.href}
                                      onClick={() => handleNavClick(subItem.href)}
                                      className="w-full flex items-start p-3 rounded-lg hover:bg-white/5 transition-colors text-left focus-visible:ring-2 focus-visible:ring-yellow-500"
                                    >
                                      <div className="w-10 h-10 bg-[#91040C]/10 rounded-lg flex items-center justify-center flex-shrink-0 mr-3">
                                        <subItem.icon className="w-5 h-5 text-[#91040C]" />
                                      </div>
                                      <div>
                                        <div className="text-white text-sm mb-0.5">
                                          {subItem.label}
                                        </div>
                                        <div className="text-white/50 text-xs">
                                          {subItem.description}
                                        </div>
                                      </div>
                                    </button>
                                  ))}
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>

                {/* CTA Buttons */}
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full border-white/20 text-white bg-transparent hover:bg-white/10"
                    onClick={() => onNavigate && onNavigate({ page: "contacts" })}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Контакты
                  </Button>
                  <Button 
                    className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                    onClick={() => onNavigate && onNavigate({ page: "login" })}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    Войти
                  </Button>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-white/50 text-sm mb-4">Контакты</p>
                  <div className="space-y-3 text-sm">
                    <div className="text-white/70">
                      club@grandtoursochi.ru
                    </div>
                    <div className="text-white/70">
                      Сочи, Олимпийский парк
                    </div>
                    <div className="text-white/70">
                      Ежедневно 24/7
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
