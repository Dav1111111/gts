import { lazy, Suspense, useState, useEffect } from "react";
import { useGTSAuth } from "../contexts/GTSAuthContext";

const GTSLandingPage = lazy(() =>
  import("./pages/GTSLandingPage").then((module) => ({ default: module.GTSLandingPage }))
);
const GTSAboutPage = lazy(() =>
  import("./pages/GTSAboutPage").then((module) => ({ default: module.GTSAboutPage }))
);
const GTSExperiencesPage = lazy(() =>
  import("./pages/GTSExperiencesPage").then((module) => ({ default: module.GTSExperiencesPage }))
);
const GTSExperienceDetailPage = lazy(() =>
  import("./pages/GTSExperienceDetailPage").then((module) => ({ default: module.GTSExperienceDetailPage }))
);
const GTSStoriesPage = lazy(() =>
  import("./pages/GTSStoriesPage").then((module) => ({ default: module.GTSStoriesPage }))
);
const GTSAuthStoriesPage = lazy(() =>
  import("./pages/GTSAuthStoriesPage").then((module) => ({ default: module.GTSAuthStoriesPage }))
);
const GTSStoryDetailPage = lazy(() =>
  import("./pages/GTSStoryDetailPage").then((module) => ({ default: module.GTSStoryDetailPage }))
);
const GTSContactsPage = lazy(() =>
  import("./pages/GTSContactsPage").then((module) => ({ default: module.GTSContactsPage }))
);
const GTSLoginPage = lazy(() =>
  import("./pages/GTSLoginPage").then((module) => ({ default: module.GTSLoginPage }))
);
const GTSClientClubPortalComplete = lazy(() =>
  import("./portal/GTSClientClubPortalComplete").then((module) => ({ default: module.GTSClientClubPortalComplete }))
);
const GTSExecutivePanel = lazy(() =>
  import("./admin/GTSExecutivePanel").then((module) => ({ default: module.GTSExecutivePanel }))
);
const GTSAdminHub = lazy(() =>
  import("./admin/GTSAdminHub").then((module) => ({ default: module.GTSAdminHub }))
);
const GTSPartnerPortalUnified = lazy(() =>
  import("./admin/GTSPartnerPortalUnified").then((module) => ({ default: module.GTSPartnerPortalUnified }))
);
const GTSExpeditionsAdmin = lazy(() =>
  import("./admin/GTSExpeditionsAdmin").then((module) => ({ default: module.GTSExpeditionsAdmin }))
);
const GTSContentAdmin = lazy(() =>
  import("./admin/GTSContentAdmin").then((module) => ({ default: module.GTSContentAdmin }))
);
const GTSAbkhaziaPage = lazy(() =>
  import("./pages/GTSAbkhaziaPage").then((module) => ({ default: module.GTSAbkhaziaPage }))
);

export type Route =
  | { page: "landing" }
  | { page: "abkhazia" }
  | { page: "about" }
  | { page: "experiences"; category?: string }
  | { page: "experience-detail"; id: string }
  | { page: "stories"; filter?: string }
  | { page: "story-detail"; id: string }
  | { page: "contacts" }
  | { page: "login" }
  | { page: "member-portal" }
  | { page: "admin" }
  | { page: "executive-panel" }
  | { page: "partner-portal" }
  | { page: "expeditions-admin" }
  | { page: "content-admin" };

interface GTSRouterProps {
  initialRoute?: Route;
}

function RouteLoader() {
  return (
    <div className="min-h-screen bg-[#0B0B0C] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <div className="text-2xl tracking-wide mb-3">GRAND TOUR SPIRIT</div>
        <div className="text-white/60">Загрузка страницы...</div>
      </div>
    </div>
  );
}

export function GTSRouter({ initialRoute = { page: "landing" } }: GTSRouterProps) {
  const [currentRoute, setCurrentRoute] = useState<Route>(initialRoute);
  const { isAuthenticated, user } = useGTSAuth();

  const isManagementUser = user?.role === "staff" || user?.role === "executive";
  const isPartnerUser = user?.role === "partner";

  const syncRouteLocation = (route: Route) => {
    if (typeof window === "undefined") {
      return;
    }

    const hashMap: Partial<Record<Route["page"], string>> = {
      admin: "#admin",
      "executive-panel": "#executive-panel",
      "expeditions-admin": "#expeditions-admin",
      "content-admin": "#content-admin",
    };

    const nextHash = hashMap[route.page] ?? "";
    const nextUrl = `${window.location.pathname}${window.location.search}${nextHash}`;
    window.history.replaceState(null, "", nextUrl);
  };

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    syncRouteLocation(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Support hash/path-based navigation for admin routes
  useEffect(() => {
    const handleHash = () => {
      const pathname = window.location.pathname.replace(/\/+$/, "") || "/";
      const hash = window.location.hash.replace('#', '');

      if (pathname === "/admin") {
        setCurrentRoute({ page: "admin" });
        return;
      }

      if (pathname === "/admin/panel") {
        setCurrentRoute({ page: "executive-panel" });
        return;
      }

      if (pathname === "/admin/content") {
        setCurrentRoute({ page: 'content-admin' });
        return;
      }

      if (pathname === "/admin/expeditions") {
        setCurrentRoute({ page: "expeditions-admin" });
        return;
      }

      if (hash === 'admin') {
        setCurrentRoute({ page: 'admin' });
        return;
      }

      if (hash === 'content-admin') {
        setCurrentRoute({ page: 'content-admin' });
        return;
      }

      if (hash === 'expeditions-admin') {
        setCurrentRoute({ page: 'expeditions-admin' });
        return;
      }

      if (hash === 'executive-panel') {
        setCurrentRoute({ page: 'executive-panel' });
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Mock user data for admin portals
  const mockExecutiveUser = {
    id: "exec-001",
    name: "Александр Иванов",
    email: "a.ivanov@grandtoursochi.ru",
    role: "executive",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    permissions: ["all"]
  };

  const mockPartnerUser = {
    id: "partner-001",
    name: "Михаил Петров",
    email: "m.petrov@partner.ru",
    role: "partner-agent",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    permissions: ["partner-access", "view-bookings", "create-leads"]
  };

  const executiveUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
        permissions: user.permissions
      }
    : mockExecutiveUser;

  const partnerUser = user
    ? {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role === "partner" ? "partner-agent" : user.role,
        avatar: user.avatar,
        permissions: user.permissions
      }
    : mockPartnerUser;

  // Render current page
  const renderPage = () => {
    switch (currentRoute.page) {
      case "landing":
        return <GTSLandingPage onNavigate={navigate} />;

      case "abkhazia":
        return <GTSAbkhaziaPage onNavigate={navigate} />;

      case "about":
        return <GTSAboutPage onNavigate={navigate} />;
      
      case "experiences":
        return <GTSExperiencesPage onNavigate={navigate} />;

      case "experience-detail":
        return <GTSExperienceDetailPage experienceId={currentRoute.id} onNavigate={navigate} />;
      
      case "stories":
        // Show authenticated version if user is logged in
        return isAuthenticated ? (
          <GTSAuthStoriesPage 
            onNavigate={navigate} 
            initialFilter={currentRoute.filter} 
          />
        ) : (
          <GTSStoriesPage 
            onNavigate={navigate} 
            initialFilter={currentRoute.filter} 
          />
        );
      
      case "story-detail":
        return <GTSStoryDetailPage 
          storyId={currentRoute.id} 
          onNavigate={navigate} 
        />;
      
      case "contacts":
        return <GTSContactsPage onNavigate={navigate} />;
      
      case "login":
        return <GTSLoginPage onNavigate={navigate} />;
      
      case "member-portal":
        if (!isAuthenticated) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSClientClubPortalComplete />;

      case "admin":
        if (!isManagementUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return (
          <GTSAdminHub
            user={executiveUser}
            onNavigate={navigate}
            onLogout={() => navigate({ page: "landing" })}
            onBackToHome={() => navigate({ page: "landing" })}
          />
        );
      
      case "executive-panel":
        if (!isManagementUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSExecutivePanel 
          user={executiveUser}
          onLogout={() => navigate({ page: "landing" })}
          onBackToHome={() => navigate({ page: "admin" })}
          onNavigate={navigate}
        />;
      
      case "partner-portal":
        if (!isPartnerUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSPartnerPortalUnified 
          user={partnerUser}
          onLogout={() => navigate({ page: "landing" })}
          onBackToHome={() => navigate({ page: "landing" })}
        />;
      
      case "expeditions-admin":
        if (!isManagementUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSExpeditionsAdmin onNavigate={navigate} />;
      
      case "content-admin":
        if (!isManagementUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSContentAdmin onNavigate={navigate} />;
      
      default:
        return (
          <div className="min-h-screen bg-[#0B0B0C] text-white flex flex-col items-center justify-center px-6">
            <div className="text-center">
              <div className="text-[120px] sm:text-[180px] font-bold leading-none tracking-tight" style={{ color: "#91040C" }}>
                404
              </div>
              <h1 className="text-2xl sm:text-3xl font-semibold mt-4 mb-3">Страница не найдена</h1>
              <p className="text-white/50 mb-8 max-w-md mx-auto">
                Похоже, эта дорога ведёт в никуда. Вернитесь на главную и выберите маршрут заново.
              </p>
              <button
                onClick={() => navigate({ page: "landing" })}
                className="px-8 py-3 text-white font-medium uppercase tracking-wider text-sm transition-colors"
                style={{ background: "#91040C" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#6d0309")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#91040C")}
              >
                На главную
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <Suspense fallback={<RouteLoader />}>
      <div className="min-h-screen">
        {renderPage()}
      </div>
    </Suspense>
  );
}
