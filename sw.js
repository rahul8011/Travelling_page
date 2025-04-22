const CACHE_NAME = 'travel-blog-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/assets/mountain.webp',
  '/assets/beach.webp',
  '/assets/city.webp',
  '/assets/world_tour.jpg',
  '/assets/flight.jpg',
  '/assets/imgca3.jpg',
  '/assets/forest.jpg',
];

// Install Event: Pre-cache essential resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// Activate Event: Clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  return self.clients.claim();
});

// Fetch Event: Serve from cache first, then fallback to network
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
