import { useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Separator } from "../ui/separator";
import { Checkbox } from "../ui/checkbox";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { 
  Eye, 
  EyeOff, 
  Mail, 
  Phone, 
  Lock, 
  Globe, 
  Clock,
  Building2,
  ArrowRight,
  Loader2
} from "lucide-react";

interface GTSPortalLoginProps {
  onLogin: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onSSO: () => void;
  onSkipAuth?: () => void;
  isLoading?: boolean;
  error?: string;
}

export function GTSPortalLogin({ 
  onLogin, 
  onForgotPassword, 
  onSSO, 
  onSkipAuth,
  isLoading = false, 
  error 
}: GTSPortalLoginProps) {
  const [loginMethod, setLoginMethod] = useState<"email" | "phone">("email");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [language, setLanguage] = useState("ru");
  const [timezone, setTimezone] = useState("Europe/Moscow");
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) return;
    onLogin(email, password);
  };

  return (
    <div 
      className="min-h-screen flex"
      style={{ backgroundColor: '#0B0B0C' }}
    >
      {/* Left Side - Hero Illustration (Desktop Only) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1564393334603-12704a40a2b9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYXJrJTIwdGVjaG5vbG9neSUyMHNpbGhvdWV0dGVzJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzU2NjcwMjc1fDA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Tech silhouettes"
            className="w-full h-full object-cover opacity-60"
          />
          <div 
            className="absolute inset-0"
            style={{ background: 'linear-gradient(135deg, rgba(145, 4, 12, 0.3) 0%, rgba(11, 11, 12, 0.8) 100%)' }}
          ></div>
        </div>
        
        {/* Floating Tech Elements */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative">
            {/* Yacht Silhouette */}
            <div className="absolute -top-32 -left-24 w-48 h-32 opacity-20">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1527369096101-de8921ad5f2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjB5YWNodCUyMHNpbGhvdWV0dGUlMjBkYXJrfGVufDF8fHx8MTc1NjY3MDI3OHww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Yacht silhouette"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            
            {/* Helicopter Silhouette */}
            <div className="absolute top-40 -right-32 w-40 h-24 opacity-15">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1610701554415-ccff8fee7976?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWxpY29wdGVyJTIwbW91bnRhaW4lMjBzaWxob3VldHRlfGVufDF8fHx8MTc1NjY3MDI4MXww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Helicopter silhouette"
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>

            {/* Central Logo */}
            <div className="text-center">
              <div 
                className="text-6xl font-bold tracking-wider mb-4"
                style={{ 
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                  color: '#FFFFFF'
                }}
              >
                GTS
              </div>
              <p 
                className="text-xl"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#A6A7AA'
                }}
              >
                Partner Portal
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 lg:px-12">
        <div className="w-full max-w-md mx-auto">
          
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div 
              className="text-4xl font-bold tracking-wider mb-2"
              style={{ 
                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                color: '#FFFFFF'
              }}
            >
              GTS
            </div>
            <p 
              className="text-lg"
              style={{ 
                fontFamily: 'Gilroy, Inter, sans-serif',
                color: '#A6A7AA'
              }}
            >
              Partner Portal
            </p>
          </div>

          {/* Language & Timezone Selectors */}
          <div className="flex gap-3 mb-8">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger 
                className="flex-1 rounded-xl border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Globe className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                <SelectItem value="ru">Русский</SelectItem>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="es">Español</SelectItem>
              </SelectContent>
            </Select>

            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger 
                className="flex-1 rounded-xl border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Clock className="w-4 h-4 mr-2" style={{ color: '#A6A7AA' }} />
                <SelectValue />
              </SelectTrigger>
              <SelectContent style={{ backgroundColor: '#17181A', borderColor: '#232428' }}>
                <SelectItem value="Europe/Moscow">GMT+3 Moscow</SelectItem>
                <SelectItem value="Europe/London">GMT+0 London</SelectItem>
                <SelectItem value="America/New_York">GMT-5 New York</SelectItem>
                <SelectItem value="Asia/Dubai">GMT+4 Dubai</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Login Form */}
          <Card 
            className="p-8 rounded-2xl border-0 shadow-2xl"
            style={{ 
              backgroundColor: '#17181A',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
            }}
          >
            <div className="mb-6">
              <h1 
                className="text-2xl font-bold mb-2"
                style={{ 
                  fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                  color: '#FFFFFF'
                }}
              >
                Вход в систему
              </h1>
              <p 
                className="text-sm"
                style={{ 
                  fontFamily: 'Gilroy, Inter, sans-serif',
                  color: '#A6A7AA'
                }}
              >
                Войдите в ваш партнёрский аккаунт
              </p>
            </div>

            {error && (
              <div 
                className="p-3 rounded-lg mb-6 text-sm"
                style={{ 
                  backgroundColor: 'rgba(229, 72, 77, 0.1)',
                  color: '#E5484D',
                  border: '1px solid rgba(229, 72, 77, 0.2)'
                }}
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Login Method Toggle */}
              <div className="flex rounded-xl p-1" style={{ backgroundColor: '#121214' }}>
                <button
                  type="button"
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    loginMethod === "email" 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: loginMethod === "email" ? '#91040C' : 'transparent',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </button>
                <button
                  type="button"
                  onClick={() => setLoginMethod("phone")}
                  className={`flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                    loginMethod === "phone" 
                      ? 'text-white shadow-sm' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                  style={{ 
                    backgroundColor: loginMethod === "phone" ? '#91040C' : 'transparent',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  Телефон
                </button>
              </div>

              {/* Email/Phone Input */}
              <div className="space-y-2">
                <label 
                  className="text-sm font-medium"
                  style={{ 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    color: '#FFFFFF'
                  }}
                >
                  {loginMethod === "email" ? "Email адрес" : "Номер телефона"}
                </label>
                <div className="relative">
                  {loginMethod === "email" ? (
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                  ) : (
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                  )}
                  <Input
                    type={loginMethod === "email" ? "email" : "tel"}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={loginMethod === "email" ? "partner@example.com" : "+7 (900) 123-45-67"}
                    className="pl-10 rounded-xl border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                    required
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label 
                  className="text-sm font-medium"
                  style={{ 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    color: '#FFFFFF'
                  }}
                >
                  Пароль
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                  <Input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    className="pl-10 pr-10 rounded-xl border-0"
                    style={{ 
                      backgroundColor: '#121214',
                      color: '#FFFFFF',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" style={{ color: '#A6A7AA' }} />
                    ) : (
                      <Eye className="w-4 h-4" style={{ color: '#A6A7AA' }} />
                    )}
                  </button>
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="flex items-start space-x-3">
                <Checkbox
                  id="terms"
                  checked={agreeTerms}
                  onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                  className="mt-0.5"
                />
                <label 
                  htmlFor="terms"
                  className="text-sm leading-relaxed cursor-pointer"
                  style={{ 
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    color: '#A6A7AA'
                  }}
                >
                  Я соглашаюсь с{" "}
                  <button 
                    type="button" 
                    className="underline hover:no-underline"
                    style={{ color: '#91040C' }}
                  >
                    Условиями использования
                  </button>{" "}
                  и{" "}
                  <button 
                    type="button" 
                    className="underline hover:no-underline"
                    style={{ color: '#91040C' }}
                  >
                    Политикой конфиденциальности
                  </button>
                </label>
              </div>

              {/* Sign In Button */}
              <Button
                type="submit"
                disabled={!agreeTerms || isLoading}
                className="w-full rounded-xl font-medium py-3"
                style={{ 
                  backgroundColor: '#91040C',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Вход...
                  </>
                ) : (
                  <>
                    Войти
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>

              {/* Forgot Password */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={onForgotPassword}
                  className="text-sm hover:underline"
                  style={{ 
                    color: '#91040C',
                    fontFamily: 'Gilroy, Inter, sans-serif'
                  }}
                >
                  Забыли пароль?
                </button>
              </div>

              {/* Divider */}
              <div className="relative">
                <Separator style={{ backgroundColor: '#232428' }} />
                <div className="absolute inset-0 flex justify-center">
                  <span 
                    className="px-3 text-sm"
                    style={{ 
                      backgroundColor: '#17181A',
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    или
                  </span>
                </div>
              </div>

              {/* SSO Button */}
              <Button
                type="button"
                onClick={onSSO}
                variant="outline"
                className="w-full rounded-xl font-medium py-3 border-0"
                style={{ 
                  backgroundColor: '#121214',
                  color: '#FFFFFF',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Вход по приглашению
              </Button>

              {/* Skip Auth Button (Development Only) */}
              {onSkipAuth && (
                <div className="space-y-2">
                  <Button
                    type="button"
                    onClick={onSkipAuth}
                    variant="outline"
                    className="w-full rounded-xl font-medium py-3 border-0"
                    style={{ 
                      backgroundColor: 'rgba(145, 4, 12, 0.1)',
                      borderColor: '#91040C',
                      color: '#91040C',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    🚀 Пропустить авторизацию
                  </Button>
                  <p 
                    className="text-xs text-center"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Быстрый доступ для демонстрации и тестирования
                  </p>
                </div>
              )}
            </form>
          </Card>

          {/* Footer Links */}
          <div className="mt-8 text-center space-y-2">
            <div className="flex justify-center space-x-6 text-sm">
              <button 
                className="hover:underline"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Поддержка
              </button>
              <button 
                className="hover:underline"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                Документы
              </button>
              <button 
                className="hover:underline"
                style={{ 
                  color: '#A6A7AA',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                API
              </button>
            </div>
            <p 
              className="text-xs"
              style={{ 
                color: '#A6A7AA',
                fontFamily: 'Gilroy, Inter, sans-serif'
              }}
            >
              © 2024 Grand Tour Sochi. Все права защищены.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}