// service-worker.js

const cacheVersion = 2;  // Change this version number
const cacheName = `umami-v${cacheVersion}`;
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/menu.html',
  '/scripts.js',
  '/manifest.json',
  // Add more files to cache as needed
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    Promise.all(
      filesToCache.map((url) => {
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return response;
          })
          .then((response) => caches.open(cacheName).then((cache) => cache.put(url, response)))
          .catch((error) => console.error(error));
      })
    )
  );
  self.skipWaiting(); // Activate new service worker immediately
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((existingCacheName) => {
          if (existingCacheName.startsWith('umami-v') && existingCacheName !== cacheName) {
            console.log(`Service Worker: Deleting old cache ${existingCacheName}`);
            return caches.delete(existingCacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  console.log(`Service Worker: Fetching ${event.request.url}`);
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING_CONFIRMATION') {
    // User has confirmed to skip waiting and reload
    self.clients.claim();
  }
});