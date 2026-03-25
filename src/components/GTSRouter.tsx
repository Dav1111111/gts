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
const GTSAuthExperiencesPage = lazy(() =>
  import("./pages/GTSAuthExperiencesPage").then((module) => ({ default: module.GTSAuthExperiencesPage }))
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
const GTSMembershipPage = lazy(() =>
  import("./GTSMembershipPage").then((module) => ({ default: module.GTSMembershipPage }))
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
const GTSPartnerPortalUnified = lazy(() =>
  import("./admin/GTSPartnerPortalUnified").then((module) => ({ default: module.GTSPartnerPortalUnified }))
);
const GTSExpeditionsAdmin = lazy(() =>
  import("./admin/GTSExpeditionsAdmin").then((module) => ({ default: module.GTSExpeditionsAdmin }))
);
const GTSContentAdmin = lazy(() =>
  import("./admin/GTSContentAdmin").then((module) => ({ default: module.GTSContentAdmin }))
);

export type Route = 
  | { page: "landing" }
  | { page: "about" }
  | { page: "experiences"; category?: string }
  | { page: "experience-detail"; id: string }
  | { page: "stories"; filter?: string }
  | { page: "story-detail"; id: string }
  | { page: "membership" }
  | { page: "contacts" }
  | { page: "login" }
  | { page: "member-portal" }
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
        <div className="text-2xl tracking-wide mb-3">GRAND TOUR SOCHI</div>
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

  const navigate = (route: Route) => {
    setCurrentRoute(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Support hash-based navigation for admin routes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash === 'content-admin') {
        setCurrentRoute({ page: 'content-admin' });
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
      
      case "about":
        return <GTSAboutPage onNavigate={navigate} />;
      
      case "experiences":
        // Show authenticated version if user is logged in
        return isAuthenticated ? (
          <GTSAuthExperiencesPage 
            onNavigate={navigate} 
            initialCategory={currentRoute.category} 
          />
        ) : (
          <GTSExperiencesPage 
            onNavigate={navigate} 
            initialCategory={currentRoute.category} 
          />
        );
      
      case "experience-detail":
        return <GTSExperienceDetailPage 
          experienceId={currentRoute.id} 
          onNavigate={navigate} 
        />;
      
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
      
      case "membership":
        return <GTSMembershipPage onNavigate={navigate} />;
      
      case "contacts":
        return <GTSContactsPage onNavigate={navigate} />;
      
      case "login":
        return <GTSLoginPage onNavigate={navigate} />;
      
      case "member-portal":
        if (!isAuthenticated) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSClientClubPortalComplete />;
      
      case "executive-panel":
        if (!isManagementUser) {
          return <GTSLoginPage onNavigate={navigate} />;
        }
        return <GTSExecutivePanel 
          user={executiveUser}
          onLogout={() => navigate({ page: "landing" })}
          onBackToHome={() => navigate({ page: "landing" })}
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
        return <GTSLandingPage onNavigate={navigate} />;
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
