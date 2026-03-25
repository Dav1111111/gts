import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { Eye, EyeOff, ArrowLeft, Shield, Users, Truck, Building, UserCircle, Briefcase, Wrench, Crown } from "lucide-react";

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

interface GTSUnifiedLoginProps {
  onLogin: (user: User) => void;
  onBackToHome: () => void;
}

const roles = [
  {
    id: 'executive' as UserRole,
    name: 'Executive',
    description: 'Полный доступ к системе',
    icon: Crown,
    color: 'from-[--gts-red] to-red-700',
    permissions: ['all']
  },
  {
    id: 'operator' as UserRole,
    name: 'Operator',
    description: 'Диспетчер операций',
    icon: Shield,
    color: 'from-blue-600 to-blue-700',
    permissions: ['operations', 'calendar', 'crew']
  },
  {
    id: 'partner-agent' as UserRole,
    name: 'Partner-Agent',
    description: 'Агент партнер',
    icon: Users,
    color: 'from-green-600 to-green-700',
    permissions: ['leads', 'bookings', 'commissions']
  },
  {
    id: 'partner-contractor' as UserRole,
    name: 'Partner-Contractor',
    description: 'Подрядчик',
    icon: Truck,
    color: 'from-orange-600 to-orange-700',
    permissions: ['fleet', 'bookings', 'finance']
  },
  {
    id: 'partner-brand' as UserRole,
    name: 'Partner-Brand',
    description: 'Бренд партнер',
    icon: Building,
    color: 'from-purple-600 to-purple-700',
    permissions: ['promotions', 'loyalty', 'api']
  },
  {
    id: 'crew' as UserRole,
    name: 'Crew',
    description: 'Экипаж',
    icon: Wrench,
    color: 'from-teal-600 to-teal-700',
    permissions: ['rides', 'checklist', 'reports']
  },
  {
    id: 'client' as UserRole,
    name: 'Client',
    description: 'Клиент клуба',
    icon: UserCircle,
    color: 'from-indigo-600 to-indigo-700',
    permissions: ['bookings', 'membership', 'events']
  },
  {
    id: 'b2b' as UserRole,
    name: 'B2B',
    description: 'Корпоративный клиент',
    icon: Briefcase,
    color: 'from-gray-600 to-gray-700',
    permissions: ['company', 'invoices', 'events']
  }
];

export function GTSUnifiedLogin({ onLogin, onBackToHome }: GTSUnifiedLoginProps) {
  const [step, setStep] = useState<'credentials' | 'role' | '2fa'>('credentials');
  const [credentials, setCredentials] = useState({ login: '', password: '' });
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleCredentialsSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsLoading(false);
    setStep('role');
  };

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    setStep('2fa');
  };

  const handle2FASubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (twoFactorCode.length === 6 && selectedRole) {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser: User = {
        id: `user_${Date.now()}`,
        name: 'Александр Петров',
        email: credentials.login.includes('@') ? credentials.login : 'alexander.petrov@gts.com',
        phone: credentials.login.includes('@') ? undefined : credentials.login,
        role: selectedRole,
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
        permissions: roles.find(r => r.id === selectedRole)?.permissions || []
      };
      
      setIsLoading(false);
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen bg-[--gts-portal-bg] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-[--gts-portal-muted] hover:text-[--gts-portal-text] mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            На главную
          </button>
          
          <div className="mb-6">
            <h1 className="text-3xl text-[--gts-portal-text] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
              GTS Portal
            </h1>
            <p className="text-[--gts-portal-muted]" style={{ fontFamily: 'var(--font-body)' }}>
              Единая система управления
            </p>
          </div>
        </div>

        {/* Step 1: Credentials */}
        {step === 'credentials' && (
          <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
            <form onSubmit={handleCredentialsSubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[--gts-portal-text] mb-2">
                  Email или Телефон
                </label>
                <Input
                  type="text"
                  value={credentials.login}
                  onChange={(e) => setCredentials(prev => ({ ...prev, login: e.target.value }))}
                  placeholder="your@email.com или +7 (999) 123-45-67"
                  className="bg-[--gts-portal-card] border-[--gts-portal-border] text-[--gts-portal-text] placeholder:text-[--gts-portal-muted]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm text-[--gts-portal-text] mb-2">
                  Пароль
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    placeholder="Введите пароль"
                    className="bg-[--gts-portal-card] border-[--gts-portal-border] text-[--gts-portal-text] placeholder:text-[--gts-portal-muted] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[--gts-portal-muted] hover:text-[--gts-portal-text]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading || !credentials.login || !credentials.password}
                className="w-full bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
              >
                {isLoading ? 'Проверка...' : 'Продолжить'}
              </Button>
            </form>
          </Card>
        )}

        {/* Step 2: Role Selection */}
        {step === 'role' && (
          <div className="space-y-4">
            <div className="text-center mb-6">
              <h2 className="text-xl text-[--gts-portal-text] mb-2">Выберите роль</h2>
              <p className="text-sm text-[--gts-portal-muted]">
                Выберите роль для доступа к соответствующей панели
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {roles.map((role) => {
                const IconComponent = role.icon;
                return (
                  <Card
                    key={role.id}
                    className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-4 cursor-pointer hover:bg-[--gts-portal-card] transition-colors"
                    onClick={() => handleRoleSelect(role.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${role.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-[--gts-portal-text] font-medium">{role.name}</h3>
                        <p className="text-sm text-[--gts-portal-muted]">{role.description}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            <Button
              variant="outline"
              onClick={() => setStep('credentials')}
              className="w-full border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
            >
              Назад
            </Button>
          </div>
        )}

        {/* Step 3: 2FA */}
        {step === '2fa' && selectedRole && (
          <Card className="bg-[--gts-portal-surface] border-[--gts-portal-border] p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-lg bg-gradient-to-br from-[--gts-portal-accent] to-red-700 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-xl text-[--gts-portal-text] mb-2">Двухфакторная аутентификация</h2>
              <p className="text-sm text-[--gts-portal-muted]">
                Введите 6-значный код из приложения аутентификатора
              </p>
            </div>

            <form onSubmit={handle2FASubmit} className="space-y-4">
              <div>
                <label className="block text-sm text-[--gts-portal-text] mb-2">
                  Код подтверждения
                </label>
                <Input
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="000000"
                  className="bg-[--gts-portal-card] border-[--gts-portal-border] text-[--gts-portal-text] text-center text-lg tracking-widest"
                  maxLength={6}
                  required
                />
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('role')}
                  className="flex-1 border-[--gts-portal-border] text-[--gts-portal-text] hover:bg-[--gts-portal-card]"
                >
                  Назад
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || twoFactorCode.length !== 6}
                  className="flex-1 bg-[--gts-portal-accent] hover:bg-opacity-90 text-white"
                >
                  {isLoading ? 'Вход...' : 'Войти'}
                </Button>
              </div>
            </form>
          </Card>
        )}
      </div>
    </div>
  );
}