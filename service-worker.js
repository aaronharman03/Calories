const CACHE_NAME = 'calorie-tracker-cache-v1';
const urlsToCache = [
  '/Calories/',
  '/Calories/index.html',
  '/Calories/styles.css',
  '/Calories/app.js',
  '/Calories/manifest.json',
  '/Calories/icons/icon-192.png',
  '/Calories/icons/icon-512.png'
];


// Install event - cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate event - clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => 
      Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      )
    )
  );
});

// Fetch event - serve cached files when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
