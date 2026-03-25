import { useState } from "react";
import { GTSUnifiedLogin } from "./GTSUnifiedLogin";
import { GTSExecutivePanel } from "./GTSExecutivePanel";
import { GTSOperatorPanel } from "./GTSOperatorPanel";
import { GTSCrewApp } from "./GTSCrewApp";
import { GTSPartnerPortalUnified } from "./GTSPartnerPortalUnified";
import { GTSClientClubPortal } from "./GTSClientClubPortal";
import { GTSB2BPortal } from "./GTSB2BPortal";

type UserRole = 'executive' | 'operator' | 'partner-agent' | 'partner-contractor' | 'partner-brand' | 'crew' | 'client' | 'b2b';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
}

interface GTSUnifiedAdminPortalProps {
  onBackToHome: () => void;
}

export function GTSUnifiedAdminPortal({ onBackToHome }: GTSUnifiedAdminPortalProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  if (!isAuthenticated || !currentUser) {
    return (
      <GTSUnifiedLogin 
        onLogin={handleLogin}
        onBackToHome={onBackToHome}
      />
    );
  }

  // Render appropriate panel based on user role
  switch (currentUser.role) {
    case 'executive':
      return (
        <GTSExecutivePanel 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    case 'operator':
      return (
        <GTSOperatorPanel 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    case 'crew':
      return (
        <GTSCrewApp 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    case 'partner-agent':
    case 'partner-contractor':
    case 'partner-brand':
      return (
        <GTSPartnerPortalUnified 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    case 'client':
      return (
        <GTSClientClubPortal 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    case 'b2b':
      return (
        <GTSB2BPortal 
          user={currentUser}
          onLogout={handleLogout}
          onBackToHome={onBackToHome}
        />
      );
    
    default:
      return (
        <div className="min-h-screen bg-[--gts-portal-bg] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl text-[--gts-portal-text] mb-4">Неопознанная роль</h1>
            <button 
              onClick={handleLogout}
              className="px-6 py-2 bg-[--gts-portal-accent] text-white rounded-lg hover:bg-opacity-90"
            >
              Выйти
            </button>
          </div>
        </div>
      );
  }
}