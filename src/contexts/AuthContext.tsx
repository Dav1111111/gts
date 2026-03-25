import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';

// Frontend-only architecture - no backend dependencies
interface User {
  id: string;
  email: string;
  app_metadata: { role: string };
  user_metadata: { 
    role: string; 
    name: string;
    full_name: string;
  };
  aud: string;
  created_at: string;
  updated_at: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expires_at: number;
  token_type: string;
  user: User;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userRole: string | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ success: boolean; error?: any }>;
  signOut: () => Promise<{ success: boolean; error?: any }>;
  signInWithOAuth: (provider: 'google' | 'github' | 'facebook') => Promise<{ success: boolean; error?: any; data?: any }>;
  createDemoSession: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const DEMO_SESSION_KEY = 'gts-demo-session';
const GTS_AUTH_CHANGE_EVENT = 'gts-auth-change';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const syncSessionFromStorage = () => {
    const storedSession = localStorage.getItem(DEMO_SESSION_KEY);

    if (!storedSession) {
      setSession(null);
      setUser(null);
      return;
    }

    try {
      const parsedSession = JSON.parse(storedSession) as Session;
      setSession(parsedSession);
      setUser(parsedSession.user);
    } catch (error) {
      console.error('Error parsing stored session:', error);
      localStorage.removeItem(DEMO_SESSION_KEY);
      setSession(null);
      setUser(null);
    }
  };

  useEffect(() => {
    syncSessionFromStorage();
    setLoading(false);

    const handleAuthChange = () => {
      syncSessionFromStorage();
    };

    window.addEventListener(GTS_AUTH_CHANGE_EVENT, handleAuthChange);
    window.addEventListener('storage', handleAuthChange);

    return () => {
      window.removeEventListener(GTS_AUTH_CHANGE_EVENT, handleAuthChange);
      window.removeEventListener('storage', handleAuthChange);
    };
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    // Mock authentication for prototype
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
    
    // Create demo user based on email
    let role = 'executive'; // default
    if (email.includes('partner')) role = 'partner';
    if (email.includes('staff')) role = 'staff';
    if (email.includes('client')) role = 'client';
    
    createDemoSession(role);
    setLoading(false);
    return { success: true };
  };

  const signOut = async () => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 300)); // Simulate API call
    
    setSession(null);
    setUser(null);
    localStorage.removeItem(DEMO_SESSION_KEY);
    
    setLoading(false);
    return { success: true };
  };

  const signInWithOAuth = async (provider: 'google' | 'github' | 'facebook') => {
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate OAuth flow
    
    createDemoSession('executive'); // Default to executive for OAuth
    setLoading(false);
    return { success: true };
  };

  const createDemoSession = (role: string) => {
    console.log('Creating demo session for role:', role);
    
    // Create a mock session for demo purposes
    const mockUser: User = {
      id: 'demo-user-' + role,
      email: `demo-${role}@gts.com`,
      app_metadata: { role },
      user_metadata: { 
        role, 
        name: `Demo ${role}`,
        full_name: `Demo ${role} User`
      },
      aud: 'authenticated',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    };

    // Create a demo token that will be used by mock data system
    const demoToken = `demo-${role}-${Date.now()}`;

    const mockSession: Session = {
      access_token: demoToken,
      refresh_token: 'demo-refresh-token',
      expires_in: 60 * 60 * 24, // 24 hours
      expires_at: Math.floor(Date.now() / 1000) + (60 * 60 * 24),
      token_type: 'bearer',
      user: mockUser
    };

    // Store in localStorage for persistence
    localStorage.setItem(DEMO_SESSION_KEY, JSON.stringify(mockSession));
    
    setSession(mockSession);
    setUser(mockUser);
    window.dispatchEvent(new Event(GTS_AUTH_CHANGE_EVENT));
  };

  const value: AuthContextType = {
    session,
    user,
    userRole: user?.app_metadata.role || user?.user_metadata.role || null,
    loading,
    signIn,
    signOut,
    signInWithOAuth,
    createDemoSession,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;
