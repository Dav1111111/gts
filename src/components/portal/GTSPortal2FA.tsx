import { useState, useEffect } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { 
  ArrowLeft,
  Shield,
  RefreshCw,
  Key,
  AlertCircle,
  CheckCircle,
  Loader2
} from "lucide-react";

interface GTSPortal2FAProps {
  onVerify: (code: string) => void;
  onBackToLogin: () => void;
  onResendCode: () => void;
  onUseBackupCode: () => void;
  isLoading?: boolean;
  error?: string;
  email?: string;
}

export function GTSPortal2FA({ 
  onVerify, 
  onBackToLogin, 
  onResendCode, 
  onUseBackupCode,
  isLoading = false,
  error,
  email = "partner@example.com"
}: GTSPortal2FAProps) {
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [showBackupCode, setShowBackupCode] = useState(false);
  const [backupCode, setBackupCode] = useState("");

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }

    // Auto-submit when all digits are entered
    if (newCode.every(digit => digit !== "") && newCode.join("").length === 6) {
      onVerify(newCode.join(""));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleResend = () => {
    if (canResend) {
      onResendCode();
      setResendTimer(30);
      setCanResend(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showBackupCode) {
      if (backupCode.trim()) {
        onVerify(backupCode.trim());
      }
    } else {
      const fullCode = code.join("");
      if (fullCode.length === 6) {
        onVerify(fullCode);
      }
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center px-6"
      style={{ backgroundColor: '#0B0B0C' }}
    >
      <div className="w-full max-w-md">
        
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={onBackToLogin}
          className="mb-6 -ml-2"
          style={{ color: '#A6A7AA' }}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Назад
        </Button>

        {/* Main Card */}
        <Card 
          className="p-8 rounded-2xl border-0 shadow-2xl"
          style={{ 
            backgroundColor: '#17181A',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div 
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#121214' }}
            >
              <Shield className="w-8 h-8" style={{ color: '#91040C' }} />
            </div>
            <h1 
              className="text-2xl font-bold mb-2"
              style={{ 
                fontFamily: 'Nokia.Kokia, Inter, sans-serif',
                color: '#FFFFFF'
              }}
            >
              Двухфакторная аутентификация
            </h1>
            <p 
              className="text-sm leading-relaxed"
              style={{ 
                fontFamily: 'Gilroy, Inter, sans-serif',
                color: '#A6A7AA'
              }}
            >
              Мы отправили 6-значный код на {email.substring(0, 3)}***{email.substring(email.indexOf('@'))}
            </p>
          </div>

          {error && (
            <div 
              className="p-4 rounded-lg mb-6 flex items-center"
              style={{ 
                backgroundColor: 'rgba(229, 72, 77, 0.1)',
                border: '1px solid rgba(229, 72, 77, 0.2)'
              }}
            >
              <AlertCircle className="w-5 h-5 mr-3 flex-shrink-0" style={{ color: '#E5484D' }} />
              <div>
                <p 
                  className="text-sm font-medium mb-1"
                  style={{ color: '#E5484D' }}
                >
                  Неверный код
                </p>
                <p 
                  className="text-xs"
                  style={{ 
                    color: '#E5484D',
                    fontFamily: 'Gilroy, Inter, sans-serif',
                    opacity: 0.8
                  }}
                >
                  Проверьте правильность введённого кода и попробуйте снова
                </p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {!showBackupCode ? (
              <>
                {/* 6-Digit Code Input */}
                <div className="space-y-4">
                  <label 
                    className="block text-sm font-medium"
                    style={{ 
                      fontFamily: 'Gilroy, Inter, sans-serif',
                      color: '#FFFFFF'
                    }}
                  >
                    Введите код
                  </label>
                  <div className="flex justify-between space-x-3">
                    {code.map((digit, index) => (
                      <Input
                        key={index}
                        id={`code-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleCodeChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        className="w-12 h-12 text-center text-lg font-mono rounded-xl border-0 focus:ring-2 focus:ring-offset-0"
                        style={{ 
                          backgroundColor: '#121214',
                          color: '#FFFFFF',
                          focusRingColor: '#91040C'
                        }}
                      />
                    ))}
                  </div>
                </div>

                {/* Resend Code */}
                <div className="text-center">
                  {canResend ? (
                    <button
                      type="button"
                      onClick={handleResend}
                      className="flex items-center justify-center text-sm hover:underline mx-auto"
                      style={{ 
                        color: '#91040C',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Отправить код повторно
                    </button>
                  ) : (
                    <p 
                      className="text-sm"
                      style={{ 
                        color: '#A6A7AA',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    >
                      Повторная отправка через {resendTimer}с
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                {/* Backup Code Input */}
                <div className="space-y-4">
                  <label 
                    className="block text-sm font-medium"
                    style={{ 
                      fontFamily: 'Gilroy, Inter, sans-serif',
                      color: '#FFFFFF'
                    }}
                  >
                    Резервный код
                  </label>
                  <div className="relative">
                    <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" style={{ color: '#A6A7AA' }} />
                    <Input
                      type="text"
                      value={backupCode}
                      onChange={(e) => setBackupCode(e.target.value)}
                      placeholder="Введите резервный код"
                      className="pl-10 rounded-xl border-0"
                      style={{ 
                        backgroundColor: '#121214',
                        color: '#FFFFFF',
                        fontFamily: 'Gilroy, Inter, sans-serif'
                      }}
                    />
                  </div>
                  <p 
                    className="text-xs"
                    style={{ 
                      color: '#A6A7AA',
                      fontFamily: 'Gilroy, Inter, sans-serif'
                    }}
                  >
                    Используйте один из ваших резервных кодов для входа
                  </p>
                </div>
              </>
            )}

            {/* Verify Button */}
            <Button
              type="submit"
              disabled={isLoading || (!showBackupCode && code.join("").length !== 6) || (showBackupCode && !backupCode.trim())}
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
                  Проверка...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Подтвердить
                </>
              )}
            </Button>

            {/* Backup Code Toggle */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setShowBackupCode(!showBackupCode);
                  setCode(["", "", "", "", "", ""]);
                  setBackupCode("");
                }}
                className="text-sm hover:underline"
                style={{ 
                  color: '#91040C',
                  fontFamily: 'Gilroy, Inter, sans-serif'
                }}
              >
                {showBackupCode ? "Использовать SMS код" : "Использовать резервный код"}
              </button>
            </div>
          </form>
        </Card>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p 
            className="text-xs"
            style={{ 
              color: '#A6A7AA',
              fontFamily: 'Gilroy, Inter, sans-serif'
            }}
          >
            Не получили код? Проверьте папку "Спам" или{" "}
            <button 
              className="underline hover:no-underline"
              style={{ color: '#91040C' }}
            >
              обратитесь в поддержку
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}