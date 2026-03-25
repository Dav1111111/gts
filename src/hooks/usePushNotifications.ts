import { useState, useEffect, useCallback } from 'react';

interface PushNotificationOptions {
  title?: string;
  body: string;
  tag?: string;
  icon?: string;
  badge?: string;
  image?: string;
  data?: any;
  requireInteraction?: boolean;
  silent?: boolean;
}

interface UsePushNotificationsOptions {
  enableOnLogin?: boolean;
  autoRequestPermission?: boolean;
}

export function usePushNotifications(options: UsePushNotificationsOptions = {}) {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [permissionStatus, setPermissionStatus] = useState<NotificationPermission>('default');

  // Check if we're running in an iframe or preview environment
  const isInIframe = () => {
    try {
      return window.self !== window.top || 
             window.location.hostname.includes('figma') ||
             window.location.hostname.includes('preview') ||
             document.referrer.includes('figma');
    } catch (e) {
      return true; // If we can't access window.top, we're probably in an iframe
    }
  };

  useEffect(() => {
    // Disable push notifications in iframe/preview environments
    if (isInIframe()) {
      console.log('Push notifications disabled in iframe/preview environment');
      setIsSupported(false);
      setPermissionStatus('denied');
      return;
    }

    // Check if browser supports notifications and service workers
    const supported = 'Notification' in window && 'serviceWorker' in navigator && 'PushManager' in window;
    setIsSupported(supported);
    
    if (supported) {
      setPermissionStatus(Notification.permission);
      checkExistingSubscription();
    }
  }, []);

  const checkExistingSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.getRegistration();
      if (registration) {
        const existingSubscription = await registration.pushManager.getSubscription();
        
        if (existingSubscription) {
          setSubscription(existingSubscription);
          setIsSubscribed(true);
        }
      }
    } catch (error) {
      console.warn('Error checking existing subscription:', error);
    }
  };

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      console.warn('Push notifications are not supported in this environment');
      return 'denied';
    }

    if (isInIframe()) {
      console.warn('Push notifications are not available in iframe/preview environments');
      setPermissionStatus('denied');
      return 'denied';
    }

    try {
      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);
      return permission;
    } catch (error) {
      console.warn('Failed to request notification permission:', error);
      setPermissionStatus('denied');
      return 'denied';
    }
  }, [isSupported]);

  const subscribe = useCallback(async () => {
    if (!isSupported || permissionStatus !== 'granted') {
      console.warn('Push notifications: Permission not granted or not supported');
      return null;
    }

    if (isInIframe()) {
      console.warn('Push notifications: Cannot subscribe in iframe/preview environment');
      return null;
    }

    try {
      // Register service worker if not already registered
      let registration = await navigator.serviceWorker.getRegistration();
      if (!registration) {
        try {
          registration = await navigator.serviceWorker.register('/sw.js');
        } catch (swError) {
          console.warn('Service worker registration failed, using fallback notification method:', swError);
          // Continue without service worker - we can still show local notifications
          return null;
        }
      }

      if (!registration) {
        console.warn('No service worker registration available, using local notifications only');
        return null;
      }

      await navigator.serviceWorker.ready;

      // Create push subscription
      const pushSubscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: convertVapidKey(getVapidPublicKey())
      });

      setSubscription(pushSubscription);
      setIsSubscribed(true);

      console.log('Push subscription created successfully');
      
      return pushSubscription;
    } catch (error) {
      console.warn('Failed to subscribe to push notifications:', error);
      // Don't throw the error, just log it and continue with local notifications
      return null;
    }
  }, [isSupported, permissionStatus]);

  const unsubscribe = useCallback(async () => {
    if (!subscription) {
      return;
    }

    try {
      await subscription.unsubscribe();
      setSubscription(null);
      setIsSubscribed(false);
    } catch (error) {
      console.error('Error unsubscribing from push notifications:', error);
      throw error;
    }
  }, [subscription]);

  const sendNotification = useCallback((title: string, body: string, tag?: string) => {
    if (!isSupported || permissionStatus !== 'granted' || isInIframe()) {
      // In iframe/preview environments, show a console log instead
      console.log(`📱 Notification: ${title} - ${body}`);
      return null;
    }

    try {
      // For demo purposes, we'll create a local notification
      // In a real app, this would be sent from your server to the push service
      const options: NotificationOptions = {
        body,
        tag,
        icon: '/favicon.ico',
        badge: '/favicon.ico',
        requireInteraction: false,
        silent: false,
        data: {
          timestamp: Date.now(),
          source: 'gts-system'
        }
      };

      const notification = new Notification(title, options);

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
      };

      return notification;
    } catch (error) {
      console.warn('Failed to create notification:', error);
      // Fallback to console log
      console.log(`📱 Notification Fallback: ${title} - ${body}`);
      return null;
    }
  }, [isSupported, permissionStatus]);

  const sendLocalNotification = useCallback((title: string, options: PushNotificationOptions | string) => {
    // Extract body text for fallback logging
    const bodyText = typeof options === 'string' ? options : options.body;
    
    if (!isSupported || permissionStatus !== 'granted' || isInIframe()) {
      // In iframe/preview environments, show a console log instead
      console.log(`📱 Local Notification: ${title} - ${bodyText}`);
      return null;
    }

    try {
      let notificationOptions: NotificationOptions;
      
      if (typeof options === 'string') {
        // Legacy format: sendLocalNotification(title, body)
        notificationOptions = {
          body: options,
          icon: '/favicon.ico',
          badge: '/favicon.ico',
          requireInteraction: false,
          silent: false,
          data: {
            timestamp: Date.now(),
            source: 'gts-system'
          }
        };
      } else {
        // New format: sendLocalNotification(title, options object)
        notificationOptions = {
          body: options.body,
          tag: options.tag,
          icon: options.icon || '/favicon.ico',
          badge: options.badge || '/favicon.ico',
          image: options.image,
          requireInteraction: options.requireInteraction || false,
          silent: options.silent || false,
          data: {
            ...options.data,
            timestamp: Date.now(),
            source: 'gts-system'
          }
        };
      }

      const notification = new Notification(title, notificationOptions);

      // Auto-close after 5 seconds
      setTimeout(() => {
        notification.close();
      }, 5000);

      // Handle notification click
      notification.onclick = (event) => {
        event.preventDefault();
        window.focus();
        notification.close();
      };

      return notification;
    } catch (error) {
      console.warn('Failed to create local notification:', error);
      // Fallback to console log
      console.log(`📱 Local Notification Fallback: ${title} - ${bodyText}`);
      return null;
    }
  }, [isSupported, permissionStatus]);

  return {
    isSupported,
    isSubscribed,
    subscription,
    permissionStatus,
    requestPermission,
    subscribe,
    unsubscribe,
    sendNotification,
    sendLocalNotification,
    // Aliases for compatibility
    supported: isSupported,
    permission: permissionStatus,
    showNotification: sendLocalNotification,
    canNotify: isSupported && permissionStatus === 'granted'
  };
}

// Helper functions
function getVapidPublicKey(): string {
  // In a real app, this would come from your environment variables
  return 'BEl62iUYgUivxIkv69yViEuiBIa40HI8YlOU3kDwp6sELc9I2_1wQ8Xf8n8GJQS6Ln2WYQKyQHaGVBhRwdTGhW4';
}

function convertVapidKey(vapidKey: string): Uint8Array {
  const padding = '='.repeat((4 - vapidKey.length % 4) % 4);
  const base64 = (vapidKey + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}