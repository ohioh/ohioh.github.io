var PRECACHESTATICCACHE = 'OHIOHCache-static';
var DYNAMICCACHE = 'OHIOHCache-dynamic';
var RUNTIMESTATICCACHE = 'ohiohCache-runtime';

const PRECACHE_URLS = [
  './',
  '.',
  '../assets/styles/main.css',
  '../assets/styles/style.css',
  '../assets/js/bootstrap.min.js',
  '../assets/js/custom.js',
  '../assets/js/pwa.js',
  '../assets/js/jquery.js',
  '/assets/',
  '/components/',
  '/fonts/',
  '/icons/',
  '/js/',
  '/pages/',
  '/php/',
  '/routes/',
  '/scss/',
  '/style/',
  '/views/',
  'index.html',
  'index.sass',
  'index.js',
  '_manifest.json',
  'config.json',
  'contact.html',
  'faq.html',
  'file-upload.html',
  'geolocation.html',
  'index-features.html',
  'index-QR.html',
  'index-research.html',
  'index-settings.html',
  'input.html',
  'login.html',
  'menu-colors.html',
  'menu-footer.html',
  'menu-main.html',
  'menu-share.html',
  'menu-update.html',
  'offline-detection.html',
  'os-detection.html',
  'qr-generator.html',
  'register.html',
  'sharing.html',
  'statistics.html',
  'survey.html',
  'system-status.html',
  'userdata.html',
  'welcome.html'
];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE_STATICCACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE_STATICCACHE, RUNTIME_STATICCACHE];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

// The fetch handler serves responses for same-origin resources from a cache.
// If no response is found, it populates the runtime cache with the response
// from the network before returning it to the page.
self.addEventListener('fetch', event => {
  // Skip cross-origin requests, like those for Google Analytics.
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});
