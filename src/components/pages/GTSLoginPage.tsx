import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Badge } from "../ui/badge";
import { GTSNavigationHeader } from "../GTSNavigationHeader";
import { Route } from "../GTSRouter";
import { useGTSAuth } from "../../contexts/GTSAuthContext";
import { 
  User, Lock, ArrowRight, Shield, 
  Users, Briefcase, Handshake, Eye, EyeOff, AlertCircle
} from "lucide-react";
import { motion } from "motion/react";

interface GTSLoginPageProps {
  onNavigate: (route: Route) => void;
}

type UserRole = "member" | "employee" | "partner";

const roles = [
  {
    id: "member" as UserRole,
    title: "Член клуба",
    description: "Доступ к бронированию, истории поездок и персональным предложениям",
    icon: User,
    color: "bg-[#91040C]"
  },
  {
    id: "employee" as UserRole,
    title: "Сотрудник",
    description: "Административная панель для управления операциями и клиентами",
    icon: Briefcase,
    color: "bg-blue-600"
  },
  {
    id: "partner" as UserRole,
    title: "Партнер",
    description: "Портал для управления совместными предложениями и аналитикой",
    icon: Handshake,
    color: "bg-purple-600"
  }
];

function getRequestedProtectedRoute(role: "guest" | "member" | "staff" | "partner" | "executive"): Route | null {
  if (typeof window === "undefined") {
    return null;
  }

  const hash = window.location.hash.replace("#", "");
  const isManagementUser = role === "staff" || role === "executive";

  if (!isManagementUser) {
    return null;
  }

  if (hash === "content-admin") {
    return { page: "content-admin" };
  }

  if (hash === "expeditions-admin") {
    return { page: "expeditions-admin" };
  }

  return null;
}

function getRouteForUserRole(role: "guest" | "member" | "staff" | "partner" | "executive"): Route {
  const requestedRoute = getRequestedProtectedRoute(role);
  if (requestedRoute) {
    return requestedRoute;
  }

  switch (role) {
    case "staff":
    case "executive":
      return { page: "executive-panel" };
    case "partner":
      return { page: "partner-portal" };
    case "guest":
    case "member":
    default:
      return { page: "experiences" };
  }
}

export function GTSLoginPage({ onNavigate }: GTSLoginPageProps) {
  const { login } = useGTSAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    
    try {
      const user = await login(credentials.email, credentials.password);
      onNavigate(getRouteForUserRole(user.role));
    } catch (err) {
      setError("Неверный email или пароль");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0C] flex flex-col">
      <GTSNavigationHeader />

      <main className="flex-1 flex items-center justify-center py-24 px-4">
        <div className="w-full max-w-6xl">
          
          {!selectedRole ? (
            /* Role Selection */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <div className="inline-flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full mb-6">
                  <Shield className="w-4 h-4 text-[#91040C] mr-2" />
                  <span className="text-sm tracking-wider text-white uppercase">Вход в систему</span>
                </div>
                
                <h1 className="text-4xl lg:text-6xl text-white mb-4 tracking-wider">
                  ВЫБЕРИТЕ
                  <span className="block text-[#91040C] mt-2">ТИП АККАУНТА</span>
                </h1>
                
                <p className="text-xl text-white/70 max-w-2xl mx-auto">
                  Разные порталы для разных типов пользователей GTS
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <Card
                      onClick={() => setSelectedRole(role.id)}
                      className="bg-[#121214] border-[#17181A] hover:border-[#91040C]/40 p-8 cursor-pointer transition-all duration-300 h-full group"
                    >
                      <div className={`w-16 h-16 ${role.color} rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                        <role.icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3 className="text-2xl text-white mb-3 group-hover:text-[#91040C] transition-colors">
                        {role.title}
                      </h3>
                      
                      <p className="text-white/70 leading-relaxed mb-6">
                        {role.description}
                      </p>
                      
                      <div className="flex items-center text-[#91040C] opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="text-sm tracking-wide">Войти</span>
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button
                  onClick={() => onNavigate({ page: "landing" })}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10"
                >
                  Вернуться на главную
                </Button>
              </div>
            </motion.div>
          ) : (
            /* Login Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-md mx-auto"
            >
              <Card className="bg-[#121214] border-[#17181A] p-8 lg:p-10">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${roles.find(r => r.id === selectedRole)?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    {(() => {
                      const RoleIcon = roles.find(r => r.id === selectedRole)?.icon;
                      return RoleIcon ? <RoleIcon className="w-8 h-8 text-white" /> : null;
                    })()}
                  </div>
                  <h2 className="text-2xl text-white mb-2">
                    {roles.find(r => r.id === selectedRole)?.title}
                  </h2>
                  <p className="text-white/60 text-sm">
                    Войдите в свой аккаунт
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Email</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type="email"
                        value={credentials.email}
                        onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                        placeholder="your@email.com"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pl-11"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white/70 mb-2 text-sm">Пароль</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={credentials.password}
                        onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                        placeholder="••••••••"
                        className="bg-white/5 border-white/10 text-white placeholder:text-white/40 pl-11 pr-11"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded text-red-400 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {error}
                    </div>
                  )}

                  {selectedRole === "member" && (
                    <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded text-blue-400 text-sm">
                      <p className="mb-1">Демо-аккаунты для тестирования:</p>
                      <p>• <strong>member@gts.ru</strong> - Gold Member</p>
                      <p>• <strong>guest@gts.ru</strong> - Guest</p>
                      <p className="text-xs mt-1 text-blue-400/70">Любой пароль подойдет</p>
                    </div>
                  )}

                  {selectedRole === "employee" && (
                    <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded text-amber-300 text-sm">
                      <p className="mb-1">Для входа сотрудника теперь нужен реальный аккаунт в общей базе.</p>
                      <p>Используйте email сотрудника и настоящий пароль из Supabase Auth.</p>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center text-white/70 cursor-pointer">
                      <input type="checkbox" className="mr-2" />
                      Запомнить меня
                    </label>
                    <button type="button" className="text-[#91040C] hover:text-[#91040C]/80">
                      Забыли пароль?
                    </button>
                  </div>

                  <Button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-[#91040C] hover:bg-[#91040C]/90 text-white py-6 disabled:opacity-50"
                  >
                    {isLoading ? "Вход..." : "Войти"}
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </form>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-white/10">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="text-white/60 hover:text-white text-sm w-full text-center"
                  >
                    ← Выбрать другой тип аккаунта
                  </button>
                </div>

                {selectedRole === "member" && (
                  <div className="mt-6 text-center">
                    <p className="text-white/60 text-sm mb-3">Еще не член клуба?</p>
                    <Button
                      onClick={() => onNavigate({ page: "membership" })}
                      variant="outline"
                      className="border-white/20 text-white hover:bg-white/5"
                    >
                      Оформить членство
                    </Button>
                  </div>
                )}
              </Card>

              {/* Security Note */}
              <div className="mt-6 text-center">
                <div className="flex items-center justify-center text-white/50 text-sm">
                  <Shield className="w-4 h-4 mr-2" />
                  Защищенное соединение SSL
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </main>
    </div>
  );
}
