// Kiatech Software PWA Service Worker
const CACHE_NAME = 'kiatech-software-v1.0.0';
const urlsToCache = [
  '/',
  '/manifest.json',
  '/sw.js',
  '/icons/icon-192x192.svg',
  '/icons/icon-512x512.svg'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  console.log('Service worker installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        // Cache resources one by one to avoid addAll errors
        return Promise.all(
          urlsToCache.map(url => 
            cache.add(url).catch(err => 
              console.log('Failed to cache:', url, err)
            )
          )
        );
      })
      .then(() => {
        console.log('Service worker installed, skipping waiting...');
        return self.skipWaiting();
      })
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        if (response) {
          return response;
        }
        
        // Clone the request because it's a stream
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then((response) => {
          // Check if we received a valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone the response because it's a stream
          const responseToCache = response.clone();
          
          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        });
      })
      .catch(() => {
        // If both cache and network fail, show offline page
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service worker activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service worker activated, claiming clients...');
      return self.clients.claim();
    })
  );
});

// Push notification event
self.addEventListener('push', (event) => {
  console.log('Push event received:', event);
  
  let notificationData = {
    title: 'Kiatech Software',
    body: 'New update from Kiatech Software!',
    icon: '/icons/icon-192x192.svg',
    badge: '/icons/icon-192x192.svg',
    vibrate: [100, 50, 100],
    requireInteraction: true, // Keep notification visible until user interacts
    actions: [
      {
        action: 'explore',
        title: 'View Details',
        icon: '/icons/icon-192x192.svg'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-192x192.svg'
      }
    ],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
      url: '/'
    }
  };

  // Parse push data if available
  if (event.data) {
    try {
      const pushData = event.data.json();
      console.log('Push data received:', pushData);
      notificationData = { 
        ...notificationData, 
        ...pushData,
        data: {
          ...notificationData.data,
          ...pushData.data
        }
      };
    } catch (e) {
      console.log('Push data as text:', event.data.text());
      notificationData.body = event.data.text();
    }
  }
  
  console.log('Showing notification:', notificationData);
  
  event.waitUntil(
    self.registration.showNotification(notificationData.title, notificationData)
      .then(() => {
        console.log('Notification shown successfully');
        
        // Store notification in IndexedDB for when app opens
        self.storeNotification(notificationData);
        
        // Trigger custom event for the app to handle (if app is open)
        self.clients.matchAll().then(clients => {
          clients.forEach(client => {
            client.postMessage({
              type: 'NOTIFICATION_RECEIVED',
              data: {
                title: notificationData.title,
                body: notificationData.body,
                timestamp: new Date().toISOString(),
                url: notificationData.data?.url || '/'
              }
            });
          });
        });
        
        // Set app badge
        if ('setAppBadge' in navigator) {
          navigator.setAppBadge().catch(console.error);
        }
      })
      .catch((error) => {
        console.error('Error showing notification:', error);
      })
  );
});

// Store notification in IndexedDB
self.storeNotification = async (notificationData) => {
  try {
    const db = await self.openDB();
    const transaction = db.transaction(['notifications'], 'readwrite');
    const store = transaction.objectStore('notifications');
    
    const notification = {
      id: Date.now(),
      title: notificationData.title,
      body: notificationData.body,
      timestamp: new Date().toISOString(),
      read: false,
      url: notificationData.data?.url || '/'
    };
    
    await store.add(notification);
    console.log('Notification stored in IndexedDB');
  } catch (error) {
    console.error('Error storing notification:', error);
  }
};

// Open IndexedDB
self.openDB = () => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('KiatechNotifications', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('notifications')) {
        const store = db.createObjectStore('notifications', { keyPath: 'id', autoIncrement: true });
        store.createIndex('timestamp', 'timestamp', { unique: false });
        store.createIndex('read', 'read', { unique: false });
      }
    };
  });
};

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const notificationData = event.notification.data || {};
  const action = event.action;
  
  // Determine where to navigate based on notification data
  let targetUrl = '/';
  
  console.log('Notification data:', notificationData);
  console.log('Action:', action);
  
  if (action === 'explore' || !action) {
    // Smart routing based on notification type
    if (notificationData.type === 'service') {
      targetUrl = '/services';
      console.log('Routing to services page');
    } else if (notificationData.type === 'portfolio') {
      targetUrl = '/portfolio';
      console.log('Routing to portfolio page');
    } else if (notificationData.type === 'contact') {
      targetUrl = '/contact';
      console.log('Routing to contact page');
    } else if (notificationData.type === 'pricing') {
      targetUrl = '/pricing';
      console.log('Routing to pricing page');
    } else if (notificationData.url) {
      targetUrl = notificationData.url;
      console.log('Routing to custom URL:', targetUrl);
    } else {
      console.log('No specific type, routing to homepage');
    }
  } else if (action === 'close') {
    console.log('User clicked close, not navigating');
    return; // Just close, don't navigate
  }
  
  console.log('Final target URL:', targetUrl);
  
  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if app is already open
        for (const client of clientList) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            // App is open, focus it and navigate
            return client.focus().then(() => {
              return client.navigate(targetUrl);
            });
          }
        }
        // App is not open, open new window
        return clients.openWindow(targetUrl);
      })
  );
});
