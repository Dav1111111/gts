import { useState, useEffect } from 'react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  Bell,
  BellOff,
  Clock,
  AlertCircle,
  CheckCircle,
  Activity,
  Signal
} from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../ui/popover';
// ✅ Временно убираю анимации во время исправления ошибок
// import { motion, AnimatePresence } from 'framer-motion';

// ✅ Mock motion components для сборки
const motion = {
  div: 'div' as any
}
const AnimatePresence = ({ children }: { children: any }) => children

interface GTSRealTimeStatusProps {
  connected: boolean;
  loading: boolean;
  error?: string | null;
  lastUpdated?: string | null;
  unreadCount?: number;
  todayBookings?: number;
  pushEnabled?: boolean;
  onRefresh?: () => void;
  onEnablePush?: () => void;
  onShowNotifications?: () => void;
}

export function GTSRealTimeStatus({
  connected,
  loading,
  error,
  lastUpdated,
  unreadCount = 0,
  todayBookings = 0,
  pushEnabled = false,
  onRefresh,
  onEnablePush,
  onShowNotifications
}: GTSRealTimeStatusProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [connectionQuality, setConnectionQuality] = useState<'excellent' | 'good' | 'poor' | 'offline'>('offline');

  // Simulate connection quality monitoring
  useEffect(() => {
    if (!connected) {
      setConnectionQuality('offline');
      return;
    }

    // Simple connection quality simulation based on loading state and errors
    if (loading) {
      setConnectionQuality('poor');
    } else if (error) {
      setConnectionQuality('poor');
    } else {
      setConnectionQuality('excellent');
    }
  }, [connected, loading, error]);

  const getConnectionIcon = () => {
    switch (connectionQuality) {
      case 'excellent':
        return <Wifi className="w-4 h-4 text-green-400" />;
      case 'good':
        return <Signal className="w-4 h-4 text-blue-400" />;
      case 'poor':
        return <Wifi className="w-4 h-4 text-yellow-400" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-400" />;
      default:
        return <WifiOff className="w-4 h-4 text-gray-400" />;
    }
  };

  const getConnectionColor = () => {
    switch (connectionQuality) {
      case 'excellent':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'good':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'poor':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'offline':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getConnectionText = () => {
    switch (connectionQuality) {
      case 'excellent':
        return 'Отличное';
      case 'good':
        return 'Хорошее';
      case 'poor':
        return 'Слабое';
      case 'offline':
        return 'Нет связи';
      default:
        return 'Неизвестно';
    }
  };

  const formatLastUpdated = () => {
    if (!lastUpdated) return 'Никогда';
    
    const date = new Date(lastUpdated);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'Только что';
    if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ч. назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <div className="flex items-center gap-3">
      {/* Connection Status */}
      <Popover open={showDetails} onOpenChange={setShowDetails}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={`px-3 py-2 h-auto border ${getConnectionColor()}`}
          >
            <div className="flex items-center gap-2">
              <div className="relative">
                {getConnectionIcon()}
                {loading && (
                  <motion.div
                    className="absolute inset-0"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <RefreshCw className="w-4 h-4" />
                  </motion.div>
                )}
              </div>
              <span className="text-xs font-medium">
                {loading ? 'Синхронизация...' : getConnectionText()}
              </span>
              {connected && (
                <div className={`w-2 h-2 rounded-full bg-current animate-pulse`} />
              )}
            </div>
          </Button>
        </PopoverTrigger>
        
        <PopoverContent className="w-80 bg-[#121214] border-[#232428] text-white" side="bottom">
          <div className="space-y-4">
            {/* Connection Details */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Состояние подключения</h4>
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A6A7AA]">Статус:</span>
                <div className="flex items-center gap-2">
                  {getConnectionIcon()}
                  <span className="text-sm">{getConnectionText()}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-[#A6A7AA]">Последнее обновление:</span>
                <span className="text-sm">{formatLastUpdated()}</span>
              </div>
              
              {error && (
                <div className="flex items-start gap-2 p-2 bg-red-500/10 border border-red-500/30 rounded-lg">
                  <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-red-400">{error}</div>
                </div>
              )}
            </div>

            {/* Statistics */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">Сегодня</h4>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-[#17181A] p-3 rounded-lg">
                  <div className="text-lg font-semibold text-white">{todayBookings}</div>
                  <div className="text-xs text-[#A6A7AA]">Бронирований</div>
                </div>
                <div className="bg-[#17181A] p-3 rounded-lg">
                  <div className="text-lg font-semibold text-white">{unreadCount}</div>
                  <div className="text-xs text-[#A6A7AA]">Уведомлений</div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2">
              <div className="flex gap-2">
                {onRefresh && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      onRefresh();
                      setShowDetails(false);
                    }}
                    className="flex-1 border-[#232428] text-white hover:bg-[#17181A]"
                  >
                    <RefreshCw className="w-4 h-4 mr-1" />
                    Обновить
                  </Button>
                )}
                
                {!pushEnabled && onEnablePush && (
                  <Button
                    size="sm"
                    onClick={() => {
                      onEnablePush();
                      setShowDetails(false);
                    }}
                    className="flex-1 bg-[#91040C] hover:bg-[#91040C]/90 text-white"
                  >
                    <Bell className="w-4 h-4 mr-1" />
                    Push
                  </Button>
                )}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>

      {/* Notifications */}
      <AnimatePresence>
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={onShowNotifications}
              className="relative text-white hover:bg-[#121214] p-2"
            >
              <Bell className="w-4 h-4" />
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#91040C] rounded-full flex items-center justify-center text-xs text-white font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </motion.div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Push Notification Status */}
      {pushEnabled && (
        <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 rounded-lg text-xs">
          <Bell className="w-3 h-3" />
          <span>Push включен</span>
        </div>
      )}
    </div>
  );
}

export default GTSRealTimeStatus;