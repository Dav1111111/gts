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
const MANAGEMENT_EMAIL_ROLE_MAP: Record<string, Extract<UserRole, "staff" | "executive">> = {
  "staff@gts.ru": "staff",
  "executive@gts.com": "executive",
  "admin@gts.com": "executive",
};

interface SupabaseAuthUserLike {
  id: string;
  email?: string;
  created_at?: string;
  app_metadata?: Record<string, unknown>;
  user_metadata?: Record<string, unknown>;
}

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function isManagementRole(role?: UserRole | null): role is Extract<UserRole, "staff" | "executive"> {
  return role === "staff" || role === "executive";
}

function readStoredAuthUser(): GTSUser | null {
  if (typeof window === "undefined") {
    return null;
  }

  const raw = localStorage.getItem(GTS_AUTH_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as GTSUser;
  } catch {
    return null;
  }
}

function resolveManagementRole(authUser: SupabaseAuthUserLike): Extract<UserRole, "staff" | "executive"> | null {
  const emailRole = authUser.email ? MANAGEMENT_EMAIL_ROLE_MAP[normalizeEmail(authUser.email)] : undefined;
  const metadataRoleCandidates = [
    authUser.app_metadata?.role,
    authUser.user_metadata?.role,
  ];

  for (const candidate of metadataRoleCandidates) {
    if (candidate === "staff") return "staff";
    if (candidate === "executive" || candidate === "admin") return "executive";
  }

  return emailRole ?? null;
}

function formatManagementLoginErrorMessage(message?: string | null) {
  const normalized = message?.trim().toLowerCase() ?? "";

  if (!normalized) {
    return "Не удалось войти в административную панель. Проверьте email и пароль.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Неверный email или пароль.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email администратора ещё не подтвержден в Supabase Auth.";
  }

  if (normalized.includes("invalid api key") || normalized.includes("publishable") || normalized.includes("jwt")) {
    return "Ошибка подключения к Supabase. Проверьте URL проекта и publishable key.";
  }

  if (normalized.includes("fetch") || normalized.includes("network") || normalized.includes("timed out")) {
    return "Не удалось связаться с сервером авторизации. Проверьте подключение и настройки Supabase.";
  }

  return message!.trim();
}

function mapSupabaseUserToGTSUser(authUser: SupabaseAuthUserLike): GTSUser | null {
  const email = authUser.email ? normalizeEmail(authUser.email) : "";
  const role = resolveManagementRole(authUser);

  if (!email || !role) {
    return null;
  }

  const fallbackUser = mockUsers[email];
  const metadata = authUser.user_metadata ?? {};
  const metadataName =
    (typeof metadata.full_name === "string" && metadata.full_name) ||
    (typeof metadata.name === "string" && metadata.name) ||
    fallbackUser?.name ||
    email.split("@")[0];

  return {
    id: authUser.id,
    name: metadataName,
    email,
    role,
    avatar: fallbackUser?.avatar,
    permissions: fallbackUser?.permissions ?? (role === "executive" ? ["all"] : ["manage-bookings", "view-reports"]),
    joinedDate: fallbackUser?.joinedDate ?? authUser.created_at?.slice(0, 10),
  };
}

function buildManagementFallbackUser(
  email: string,
  authUser: SupabaseAuthUserLike,
): GTSUser | null {
  const fallbackUser = mockUsers[email];

  if (!fallbackUser || !isManagementRole(fallbackUser.role)) {
    return null;
  }

  return {
    ...fallbackUser,
    id: authUser.id,
    email,
    joinedDate: fallbackUser.joinedDate ?? authUser.created_at?.slice(0, 10),
  };
}

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
    let active = true;
    let unsubscribe: (() => void) | undefined;

    if (typeof window === "undefined") {
      return undefined;
    }

    const restoreSession = async () => {
      const storedUser = readStoredAuthUser();

      try {
        const { supabase } = await import("../utils/supabase/client");
        const { data } = await supabase.auth.getSession();
        const managedUser = data.session?.user
          ? mapSupabaseUserToGTSUser(data.session.user as SupabaseAuthUserLike)
          : null;

        if (!active) {
          return;
        }

        if (managedUser) {
          setUser(managedUser);
          persistAuthUser(managedUser);
        } else if (storedUser && !isManagementRole(storedUser.role)) {
          setUser(storedUser);
        } else {
          setUser(null);
          if (storedUser && isManagementRole(storedUser.role)) {
            persistAuthUser(null);
          }
        }

        const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
          const nextManagedUser = session?.user
            ? mapSupabaseUserToGTSUser(session.user as SupabaseAuthUserLike)
            : null;

          if (nextManagedUser) {
            setUser(nextManagedUser);
            persistAuthUser(nextManagedUser);
            return;
          }

          const currentStoredUser = readStoredAuthUser();
          if (currentStoredUser && isManagementRole(currentStoredUser.role)) {
            setUser((currentUser) => (currentUser && isManagementRole(currentUser.role) ? null : currentUser));
            persistAuthUser(null);
          }
        });

        unsubscribe = () => authListener.subscription.unsubscribe();
      } catch (error) {
        if (!active) {
          return;
        }

        console.error("Failed to restore GTS auth session:", error);

        if (storedUser && !isManagementRole(storedUser.role)) {
          setUser(storedUser);
        } else {
          setUser(null);
          if (storedUser && isManagementRole(storedUser.role)) {
            persistAuthUser(null);
          }
        }
      }
    };

    restoreSession();

    return () => {
      active = false;
      unsubscribe?.();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const normalizedEmail = normalizeEmail(email);
    const foundUser = mockUsers[normalizedEmail];
    const shouldUseSupabase = isManagementRole(foundUser?.role) || !foundUser;

    if (shouldUseSupabase) {
      const { supabase } = await import("../utils/supabase/client");
      const { data, error } = await supabase.auth.signInWithPassword({
        email: normalizedEmail,
        password,
      });

      if (!error && data.user) {
        const authUser = data.user as SupabaseAuthUserLike;
        const managedUser =
          mapSupabaseUserToGTSUser(authUser) ??
          buildManagementFallbackUser(normalizedEmail, authUser);

        if (!managedUser) {
          await supabase.auth.signOut();
          throw new Error("У пользователя нет прав доступа к административной панели");
        }

        setUser(managedUser);
        persistAuthUser(managedUser);
        return managedUser;
      }

      if (isManagementRole(foundUser?.role) || !foundUser) {
        throw new Error(formatManagementLoginErrorMessage(error?.message));
      }
    }

    // Mock login - для публичных демо-ролей
    await new Promise(resolve => setTimeout(resolve, 500));

    if (foundUser) {
      try {
        const { supabase } = await import("../utils/supabase/client");
        await supabase.auth.signOut();
      } catch {
        // no-op: demo users do not depend on Supabase auth
      }

      setUser(foundUser);
      persistAuthUser(foundUser);
      return foundUser;
    } else {
      throw new Error("Invalid credentials");
    }
  };

  const logout = () => {
    import("../utils/supabase/client")
      .then(({ supabase }) => supabase.auth.signOut())
      .catch(() => undefined);
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
