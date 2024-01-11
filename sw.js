// sw.js

const cacheVersion = 4.2;  // Increment this version number
const cacheName = `umami-v${cacheVersion}`;
const filesToCache = [
  '/',
  '/index.html',
  '/styles.css',
  '/app.js',
  '/menu.html',
  '/scripts.js',
  '/manifest.json',
  '/pages/predjelo.html',
  '/predjela.css',
  '/menu.html',
  // Add more files to cache as needed
];

self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');

  // Fetch each file and cache it
  event.waitUntil(
    Promise.all(
      filesToCache.map((relativePath) => {
        const url = new URL(relativePath, location.origin);
        const cacheBustedUrl = `${url}?t=${new Date().getTime()}`;
        return fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch ${url}`);
            }
            return response;
          })
          .then((response) => caches.open(cacheName).then((cache) => cache.put(cacheBustedUrl, response)))
          .catch((error) => console.error(error));
      })
    )
    .then(() => {
      console.log('Service Worker: Installation complete. Skipping waiting.');
      self.skipWaiting(); // Activate new service worker immediately
    })
  );
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

document.addEventListener('DOMContentLoaded', function () {
  // Check for service worker updates only in standalone mode
  if ('serviceWorker' in navigator && window.matchMedia('(display-mode: standalone)').matches) {
      navigator.serviceWorker.register('/sw.js').then(registration => {
          registration.addEventListener('updatefound', () => {
              const newWorker = registration.installing;

              newWorker.addEventListener('statechange', () => {
                  if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                      // A new service worker version is installed
                      showUpdateNotification();
                      hideUpdateOverlay();
                  }
              });
          });
      });
  }

  // Function to show the update notification and disable interactions
  function showUpdateNotification() {
      const updatePopup = document.getElementById('update-popup');
      updatePopup.style.display = 'block';

      // Show the overlay
      const updateOverlay = document.getElementById('update-overlay');
      updateOverlay.style.display = 'flex';
      updateOverlay.classList.add('active');

      const reloadButton = document.getElementById('reload-button');
      reloadButton.addEventListener('click', function () {
          // Reload the page
          window.location.reload();
      });
  }

  // Function to hide the overlay after the update is complete
  function hideUpdateOverlay() {
      const updateOverlay = document.getElementById('update-overlay');
      updateOverlay.style.display = 'none';
      updateOverlay.classList.remove('active');
  }
});