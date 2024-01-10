// service-worker.js

const cacheVersion = 3;  // Change this version number
const cacheName = `umami-v${cacheVersion}`;
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/menu.html',
  '/scripts.js',
  '/icons/',
  '/manifest.json',
  // Add more files to cache as needed
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      console.log('Service Worker: Caching files');
      return cache.addAll(filesToCache);
    })
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

// update-handler.js

// Function to notify the user about the update
function notifyUserAboutUpdate() {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    // Display a notification or UI element informing the user about the update
    // ...

    // Example: Ask the user to reload the page
    const reloadConfirmation = confirm('A new version is available. Reload to use the latest version?');
    if (reloadConfirmation) {
      // Send a message to the service worker to skip waiting and take control of pages
      navigator.serviceWorker.controller.postMessage({
        type: 'SKIP_WAITING_CONFIRMATION'
      });
      // Optionally, you can handle the page reload in your application logic
      location.reload(true);
    }
  } else {
    console.error('Service Worker controller is not available.');
  }
}

// Example usage to notify the user about the update
notifyUserAboutUpdate();