import { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Card } from '../ui/card';
import { ScrollArea } from '../ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog';
import {
  Bell,
  BellOff,
  Calendar,
  User,
  Clock,
  MapPin,
  CheckCircle,
  AlertCircle,
  XCircle,
  Trash2,
  MarkAsUnreadIcon,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingNotification {
  id: string;
  booking_id: string;
  action: 'created' | 'updated' | 'cancelled';
  message: string;
  recipients: string[];
  created_at: string;
  booking_snapshot: {
    id: string;
    title: string;
    client: {
      name: string;
    };
    resource: {
      name: string;
      type: 'boat' | 'helicopter' | 'buggy' | 'staff';
    };
    datetime: {
      start: string;
      date: string;
    };
    status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  };
  read?: boolean;
}

interface GTSNotificationsPanelProps {
  notifications: BookingNotification[];
  unreadCount: number;
  loading?: boolean;
  onMarkAsRead: (notificationId: string) => void;
  onMarkAllAsRead?: () => void;
  onDeleteNotification?: (notificationId: string) => void;
  onRefresh?: () => void;
}

export function GTSNotificationsPanel({
  notifications,
  unreadCount,
  loading = false,
  onMarkAsRead,
  onMarkAllAsRead,
  onDeleteNotification,
  onRefresh
}: GTSNotificationsPanelProps) {
  const [open, setOpen] = useState(false);

  const getActionIcon = (action: string) => {
    switch (action) {
      case 'created':
        return <Calendar className="w-4 h-4 text-green-400" />;
      case 'updated':
        return <AlertCircle className="w-4 h-4 text-blue-400" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <Bell className="w-4 h-4 text-gray-400" />;
    }
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'created':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'updated':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'created':
        return 'Создано';
      case 'updated':
        return 'Обновлено';
      case 'cancelled':
        return 'Отменено';
      default:
        return action;
    }
  };

  const getResourceIcon = (type: string) => {
    switch (type) {
      case 'boat':
        return '🛥️';
      case 'helicopter':
        return '🚁';
      case 'buggy':
        return '🏎️';
      case 'staff':
        return '👤';
      default:
        return '📋';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    
    if (diffMinutes < 1) return 'только что';
    if (diffMinutes < 60) return `${diffMinutes} мин. назад`;
    
    const diffHours = Math.floor(diffMinutes / 60);
    if (diffHours < 24) return `${diffHours} ч. назад`;
    
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays} дн. назад`;
    
    return date.toLocaleDateString('ru-RU');
  };

  const handleNotificationClick = (notification: BookingNotification) => {
    if (!notification.read) {
      onMarkAsRead(notification.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="relative text-white hover:bg-[#121214] p-2"
        >
          <Bell className="w-4 h-4" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.div
                className="absolute -top-1 -right-1 w-5 h-5 bg-[#91040C] rounded-full flex items-center justify-center text-xs text-white font-medium"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              >
                {unreadCount > 99 ? '99+' : unreadCount}
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#121214] border-[#232428] text-white max-w-2xl max-h-[80vh]">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-[#91040C]" />
              Уведомления
              {unreadCount > 0 && (
                <Badge className="bg-[#91040C] text-white ml-2">
                  {unreadCount} новых
                </Badge>
              )}
            </DialogTitle>
            
            <div className="flex items-center gap-2">
              {onRefresh && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onRefresh}
                  disabled={loading}
                  className="text-white hover:bg-[#17181A]"
                >
                  <motion.div
                    animate={loading ? { rotate: 360 } : { rotate: 0 }}
                    transition={{ duration: 1, repeat: loading ? Infinity : 0, ease: "linear" }}
                  >
                    <Bell className="w-4 h-4" />
                  </motion.div>
                </Button>
              )}
              
              {onMarkAllAsRead && unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onMarkAllAsRead}
                  className="text-white hover:bg-[#17181A]"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Прочитать все
                </Button>
              )}
            </div>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh]">
          <div className="space-y-3 pr-4">
            <AnimatePresence>
              {notifications.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <BellOff className="w-12 h-12 text-[#A6A7AA] mx-auto mb-4" />
                  <p className="text-[#A6A7AA]">Уведомлений пока нет</p>
                </motion.div>
              ) : (
                notifications.map((notification, index) => (
                  <motion.div
                    key={notification.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card 
                      className={`p-4 cursor-pointer transition-all duration-200 ${
                        notification.read 
                          ? 'bg-[#17181A] border-[#232428]' 
                          : 'bg-[#91040C]/10 border-[#91040C]/30 hover:bg-[#91040C]/15'
                      }`}
                      onClick={() => handleNotificationClick(notification)}
                    >
                      <div className="flex items-start gap-3">
                        {/* Icon */}
                        <div className="flex-shrink-0 mt-1">
                          {getActionIcon(notification.action)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <div className="flex items-center gap-2">
                              <Badge className={`${getActionColor(notification.action)} text-xs`}>
                                {getActionText(notification.action)}
                              </Badge>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-[#91040C] rounded-full" />
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#A6A7AA]" />
                              <span className="text-xs text-[#A6A7AA]">
                                {formatDate(notification.created_at)}
                              </span>
                            </div>
                          </div>
                          
                          <p className="text-sm text-white mb-2">
                            {notification.message}
                          </p>
                          
                          {/* Booking Details */}
                          {notification.booking_snapshot && (
                            <div className="bg-[#121214] p-3 rounded-lg space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-lg">
                                  {getResourceIcon(notification.booking_snapshot.resource.type)}
                                </span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-white truncate">
                                    {notification.booking_snapshot.title}
                                  </div>
                                  <div className="text-xs text-[#A6A7AA]">
                                    {notification.booking_snapshot.resource.name}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="flex items-center justify-between text-xs text-[#A6A7AA]">
                                <div className="flex items-center gap-1">
                                  <User className="w-3 h-3" />
                                  {notification.booking_snapshot.client.name}
                                </div>
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(notification.booking_snapshot.datetime.start).toLocaleDateString('ru-RU')}
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        
                        {/* Actions */}
                        {onDeleteNotification && (
                          <div className="flex-shrink-0">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteNotification(notification.id);
                              }}
                              className="text-[#A6A7AA] hover:text-red-400 hover:bg-red-500/10 p-1"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </ScrollArea>
        
        {notifications.length > 0 && (
          <div className="flex items-center justify-between pt-4 border-t border-[#232428]">
            <span className="text-sm text-[#A6A7AA]">
              {notifications.length} уведомлений
            </span>
            
            {unreadCount > 0 && (
              <span className="text-sm text-[#91040C]">
                {unreadCount} непрочитанных
              </span>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default GTSNotificationsPanel;