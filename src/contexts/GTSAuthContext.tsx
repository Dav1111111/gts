import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type UserRole = "guest" | "member" | "staff" | "partner" | "executive";

export interface GTSUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  membershipTier?: "silver" | "gold" | "platinum";
  permissions: string[];
  joinedDate?: string;
  points?: number;
}

interface GTSAuthContextType {
  user: GTSUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<GTSUser>;
  logout: () => void;
  updateUser: (updates: Partial<GTSUser>) => void;
}

const GTSAuthContext = createContext<GTSAuthContextType | undefined>(undefined);
const GTS_AUTH_STORAGE_KEY = "gts-auth-user";
const GTS_DEMO_SESSION_KEY = "gts-demo-session";
const GTS_AUTH_CHANGE_EVENT = "gts-auth-change";

function createLegacyDemoSession(user: GTSUser) {
  const role = user.role;
  const now = new Date().toISOString();

  return {
    access_token: `demo-${role}-${Date.now()}`,
    refresh_token: "demo-refresh-token",
    expires_in: 60 * 60 * 24,
    expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
    token_type: "bearer",
    user: {
      id: user.id,
      email: user.email,
      app_metadata: { role },
      user_metadata: {
        role,
        name: user.name,
        full_name: user.name
      },
      aud: "authenticated",
      created_at: now,
      updated_at: now
    }
  };
}

function persistAuthUser(user: GTSUser | null) {
  if (typeof window === "undefined") {
    return;
  }

  if (!user) {
    localStorage.removeItem(GTS_AUTH_STORAGE_KEY);
    localStorage.removeItem(GTS_DEMO_SESSION_KEY);
    window.dispatchEvent(new Event(GTS_AUTH_CHANGE_EVENT));
    return;
  }

  localStorage.setItem(GTS_AUTH_STORAGE_KEY, JSON.stringify(user));
  localStorage.setItem(GTS_DEMO_SESSION_KEY, JSON.stringify(createLegacyDemoSession(user)));
  window.dispatchEvent(new Event(GTS_AUTH_CHANGE_EVENT));
}

// Mock users для разных ролей
const mockUsers: Record<string, GTSUser> = {
  "member@gts.ru": {
    id: "member-001",
    name: "Дмитрий Соколов",
    email: "member@gts.ru",
    role: "member",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    membershipTier: "gold",
    permissions: ["view-content", "book-experiences", "comment", "like", "save-favorites", "view-my-bookings"],
    joinedDate: "2024-03-15",
    points: 2450
  },
  "guest@gts.ru": {
    id: "guest-001",
    name: "Анна Петрова",
    email: "guest@gts.ru",
    role: "guest",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    permissions: ["view-content", "book-experiences", "save-favorites"],
    joinedDate: "2024-10-20",
    points: 150
  },
  "staff@gts.ru": {
    id: "staff-001",
    name: "Сергей Иванов",
    email: "staff@gts.ru",
    role: "staff",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    permissions: ["view-content", "manage-bookings", "view-reports", "moderate-comments"],
    joinedDate: "2023-01-10"
  },
  "partner@gts.ru": {
    id: "partner-001",
    name: "Михаил Петров",
    email: "partner@gts.ru",
    role: "partner",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    permissions: ["view-content", "create-bookings", "view-commissions", "manage-clients"],
    joinedDate: "2023-06-01"
  },
  "executive@gts.com": {
    id: "executive-001",
    name: "Александр Иванов",
    email: "executive@gts.com",
    role: "executive",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    permissions: ["all"],
    joinedDate: "2022-09-01"
  },
  "admin@gts.com": {
    id: "admin-001",
    name: "Администратор GTS",
    email: "admin@gts.com",
    role: "executive",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    permissions: ["all"],
    joinedDate: "2022-09-01"
  }
};

export function GTSAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<GTSUser | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const storedUser = localStorage.getItem(GTS_AUTH_STORAGE_KEY);
    if (!storedUser) {
      return;
    }

    try {
      setUser(JSON.parse(storedUser) as GTSUser);
    } catch (error) {
      console.error("Failed to restore GTS user session:", error);
      persistAuthUser(null);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // Mock login - в реальности здесь будет API call
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const foundUser = mockUsers[email];
    if (foundUser) {
      setUser(foundUser);
      persistAuthUser(foundUser);
      return foundUser;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    setUser(null);
    persistAuthUser(null);
  };

  const updateUser = (updates: Partial<GTSUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      persistAuthUser(updatedUser);
    }
  };

  return (
    <GTSAuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        updateUser
      }}
    >
      {children}
    </GTSAuthContext.Provider>
  );
}

export function useGTSAuth() {
  const context = useContext(GTSAuthContext);
  if (context === undefined) {
    throw new Error("useGTSAuth must be used within GTSAuthProvider");
  }
  return context;
}
