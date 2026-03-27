import { useState, ReactNode } from "react";
import { GTSUnifiedAppShell } from "./GTSUnifiedAppShell";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { GTSStyles, GTSComponents } from "../../utils/gts-styles";
import { 
  BarChart3,
  Calendar,
  Users,
  Building,
  UserCheck,
  DollarSign,
  FileText,
  Globe,
  MessageSquare,
  Zap,
  Shield,
  ArrowLeft
} from "lucide-react";

type UserRole = 
  | 'guest' | 'user' | 'member-bronze' | 'member-silver' | 'member-gold' | 'member-platinum'
  | 'partner-agent' | 'contractor' | 'brand-partner' | 'ambassador'
  | 'operator' | 'dispatcher' | 'site-admin' | 'captain' | 'pilot' | 'guide' | 'mechanic' | 'support'
  | 'marketing' | 'finance' | 'executive' | 'sys-admin'
  | 'b2b-owner' | 'b2b-finance' | 'b2b-coordinator';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface GTSAppShellProps {
  children?: React.ReactNode;
  user?: User;
  currentPath?: string;
  onNavigate?: (path: string) => void;
  onLogout?: () => void;
  onBackToHome?: () => void;
}

// Demo Users для тестирования разных ролей
const demoUsers: User[] = [
  {
    id: 'exec1',
    name: 'Анна Иванова',
    email: 'anna.ivanova@gts.com',
    role: 'executive'
  },
  {
    id: 'op1',
    name: 'Михаил Петров',
    email: 'mikhail.petrov@gts.com',
    role: 'operator'
  },
  {
    id: 'crew1',
    name: 'Дмитрий Козлов',
    email: 'dmitry.kozlov@gts.com',
    role: 'captain'
  },
  {
    id: 'agent1',
    name: 'Елена Сидорова',
    email: 'elena.sidorova@gts.com',
    role: 'partner-agent'
  },
  {
    id: 'contractor1',
    name: 'Сергей Орлов',
    email: 'sergey.orlov@gts.com',
    role: 'contractor'
  },
  {
    id: 'brand1',
    name: 'Мария Королева',
    email: 'maria.koroleva@gts.com',
    role: 'brand-partner'
  },
  {
    id: 'marketing1',
    name: 'Олег Смирнов',
    email: 'oleg.smirnov@gts.com',
    role: 'marketing'
  },
  {
    id: 'finance1',
    name: 'Татьяна Волкова',
    email: 'tatyana.volkova@gts.com',
    role: 'finance'
  },
  {
    id: 'sysadmin1',
    name: 'Владимир Титов',
    email: 'vladimir.titov@gts.com',
    role: 'sys-admin'
  },
  {
    id: 'b2b1',
    name: 'Роман Лебедев',
    email: 'roman.lebedev@company.com',
    role: 'b2b-owner'
  },
  {
    id: 'client1',
    name: 'Ирина Новикова',
    email: 'irina.novikova@gmail.com',
    role: 'member-gold'
  }
];

function getRoleName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    'guest': 'Гость',
    'user': 'Пользователь', 
    'member-bronze': 'Bronze Member',
    'member-silver': 'Silver Member',
    'member-gold': 'Gold Member',
    'member-platinum': 'Platinum Member',
    'partner-agent': 'Партнёр-агент',
    'contractor': 'Подрядчик',
    'brand-partner': 'Бренд-партнёр',
    'ambassador': 'Амбассадор',
    'operator': 'Оператор',
    'dispatcher': 'Диспетчер',
    'site-admin': 'Админ площадки',
    'captain': 'Капитан',
    'pilot': 'Пилот',
    'guide': 'Гид',
    'mechanic': 'Механик',
    'support': 'Поддержка',
    'marketing': 'Маркетолог',
    'finance': 'Финансист',
    'executive': 'Руководитель',
    'sys-admin': 'Системный админ',
    'b2b-owner': 'B2B Владелец',
    'b2b-finance': 'B2B Финансы',
    'b2b-coordinator': 'B2B Координатор'
  };
  return roleNames[role] || role;
}

function getRoleIcon(role: UserRole) {
  const roleIcons: Record<UserRole, React.ReactNode> = {
    'executive': <Shield className="w-5 h-5" />,
    'operator': <MessageSquare className="w-5 h-5" />,
    'dispatcher': <Zap className="w-5 h-5" />,
    'site-admin': <Building className="w-5 h-5" />,
    'captain': <UserCheck className="w-5 h-5" />,
    'pilot': <UserCheck className="w-5 h-5" />,
    'guide': <UserCheck className="w-5 h-5" />,
    'mechanic': <UserCheck className="w-5 h-5" />,
    'partner-agent': <Users className="w-5 h-5" />,
    'contractor': <Building className="w-5 h-5" />,
    'brand-partner': <Globe className="w-5 h-5" />,
    'marketing': <Globe className="w-5 h-5" />,
    'finance': <DollarSign className="w-5 h-5" />,
    'sys-admin': <Shield className="w-5 h-5" />,
    'b2b-owner': <Building className="w-5 h-5" />,
    'b2b-finance': <DollarSign className="w-5 h-5" />,
    'b2b-coordinator': <Calendar className="w-5 h-5" />,
    'member-bronze': <Users className="w-5 h-5" />,
    'member-silver': <Users className="w-5 h-5" />,
    'member-gold': <Users className="w-5 h-5" />,
    'member-platinum': <Users className="w-5 h-5" />,
    'user': <Users className="w-5 h-5" />,
    'guest': <Users className="w-5 h-5" />,
    'ambassador': <Users className="w-5 h-5" />,
    'support': <MessageSquare className="w-5 h-5" />
  };
  return roleIcons[role] || <Users className="w-5 h-5" />;
}

function DemoContent({ currentPath, role }: { currentPath: string; role: UserRole }) {
  const pathName = currentPath.split('/').pop() || 'dashboard';
  
  return (
    <div className="p-6">
      <Card className={GTSStyles.cards.default + ' p-6'}>
        <div className="flex items-center gap-4 mb-6">
          {getRoleIcon(role)}
          <div>
            <h1 className={GTSComponents.cardTitle} style={{ fontFamily: 'var(--font-heading)' }}>
              {pathName.charAt(0).toUpperCase() + pathName.slice(1)}
            </h1>
            <p className={GTSStyles.text.muted}>
              Демонстрация унифицированного каркаса для роли: {getRoleName(role)}
            </p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
            <h3 className={`${GTSStyles.text.primary} font-medium mb-2`}>Текущий путь</h3>
            <code className={`${GTSStyles.text.muted} text-sm`}>{currentPath}</code>
          </div>
          
          <div className={`p-4 ${GTSStyles.backgrounds.card} rounded-lg`}>
            <h3 className={`${GTSStyles.text.primary} font-medium mb-2`}>Функции каркаса</h3>
            <ul className={`${GTSStyles.text.muted} text-sm space-y-1`}>
              <li>✅ Адаптивный sidebar с пресетами для каждой роли</li>
              <li>✅ Унифицированный topbar с поиском и уведомлениями</li>
              <li>✅ Хлебные крошки Role → Page</li>
              <li>✅ Мобильная версия для crew ролей</li>
              <li>✅ Единая дизайн-система GTS</li>
            </ul>
          </div>
          
          {role === 'captain' || role === 'pilot' || role === 'guide' || role === 'mechanic' ? (
            <div className={`p-4 ${GTSStyles.badges.default} rounded-lg`}>
              <h3 className="text-white font-medium mb-2">📱 Мобильная версия</h3>
              <p className="text-white/90 text-sm">
                Для crew ролей используется специальная мобильная раскладка с нижней навигацией
              </p>
            </div>
          ) : null}
        </div>
      </Card>
    </div>
  );
}

export function GTSAppShell({ children, user, currentPath: initialPath, onNavigate: externalNavigate, onLogout: externalLogout, onBackToHome }: GTSAppShellProps) {
  const [selectedUser, setSelectedUser] = useState<User>(demoUsers[0]);
  const [currentPath, setCurrentPath] = useState('/dashboard');
  const [showUserSelect, setShowUserSelect] = useState(true);

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
  };

  const handleSearch = (query: string) => {
    console.log('Поиск:', query);
  };

  const handleLogout = () => {
    setShowUserSelect(true);
    setCurrentPath('/dashboard');
  };

  if (showUserSelect) {
    return (
      <div className={`${GTSStyles.layout.page} ${GTSStyles.backgrounds.main}`}>
        <div className={GTSComponents.pageHeader}>
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              {onBackToHome && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onBackToHome}
                  className={GTSStyles.buttons.ghost}
                >
                  <ArrowLeft className="w-4 h-4" />
                </Button>
              )}
              
              <div>
                <h1 className={GTSComponents.pageTitle} style={{ fontFamily: 'var(--font-heading)' }}>
                  02_App_Shell - Унифицированный каркас
                </h1>
                <p className={GTSComponents.pageSubtitle}>
                  Выберите роль для демонстрации соответствующего интерфейса
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {demoUsers.map((user) => (
              <Card
                key={user.id}
                className={`${GTSStyles.cards.content} p-4 cursor-pointer hover:bg-[--gts-portal-border] ${GTSStyles.transitions.default} group`}
                onClick={() => {
                  setSelectedUser(user);
                  setShowUserSelect(false);
                }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[--gts-portal-accent] to-red-700 flex items-center justify-center">
                    {getRoleIcon(user.role)}
                  </div>
                </div>

                <h3 className={`${GTSStyles.text.primary} font-medium mb-1 group-hover:${GTSStyles.text.accent} ${GTSStyles.transitions.default}`}>
                  {user.name}
                </h3>
                <p className={`${GTSStyles.text.muted} text-sm mb-2`}>
                  {getRoleName(user.role)}
                </p>
                <p className={`${GTSStyles.text.muted} text-xs`}>
                  {user.email}
                </p>

                <Button
                  size="sm"
                  className={`w-full ${GTSStyles.buttons.primary} opacity-0 group-hover:opacity-100 transition-opacity mt-3`}
                >
                  Войти как {getRoleName(user.role)}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <GTSUnifiedAppShell
      user={selectedUser}
      currentPath={currentPath}
      onNavigate={handleNavigate}
      onSearch={handleSearch}
      onLogout={handleLogout}
      onBackToHome={() => setShowUserSelect(true)}
      notificationCount={5}
    >
      <DemoContent currentPath={currentPath} role={selectedUser.role} />
    </GTSUnifiedAppShell>
  );
}