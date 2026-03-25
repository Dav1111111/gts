// GTS Service Worker - Lightweight version for preview environments
const CACHE_NAME = 'gts-app-v1';

// Minimal service worker for notifications support
self.addEventListener('install', (event) => {
  console.log('GTS Service Worker installed');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('GTS Service Worker activated');
  event.waitUntil(self.clients.claim());
});

// Basic fetch handler
self.addEventListener('fetch', (event) => {
  // Let all requests pass through normally
  event.respondWith(fetch(event.request));
});

// Push notification handler
self.addEventListener('push', (event) => {
  console.log('Push notification received:', event);
  
  const options = {
    body: 'GTS notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    tag: 'gts-notification'
  };

  if (event.data) {
    try {
      const data = event.data.json();
      options.body = data.body || options.body;
      options.tag = data.tag || options.tag;
    } catch (e) {
      console.warn('Failed to parse push data:', e);
    }
  }

  event.waitUntil(
    self.registration.showNotification('GTS Booking', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked');
  event.notification.close();
  
  event.waitUntil(
    clients.matchAll().then(clients => {
      if (clients.length > 0) {
        clients[0].focus();
      }
    })
  );
});

console.log('GTS Service Worker loaded');