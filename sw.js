let PRECACHE = 'OHIOHCache-static';
let DYNAMICCACHE = 'OHIOHCache-dynamic';
let RUNTIMECACHE = 'OHIOHCache-runtime';

const PRECACHE_URLS = [
  '/style/main.css',
  '/style/style.css',
  '/js/bootstrap.min.js',
  '/js/custom.js',
  '/js/pwa.js',
  '/js/jquery.js',
  '/index.html',
  '/index.sass',
  '/index.js',
  '/_manifest.json',
  '/config.json',
  '/contact.html',
  '/faq.html',
  '/file-upload.html',
  '/geo-location.html',
  '/index-features.html',
  '/index-QR.html',
  '/index-research.html',
  '/index-settings.html',
  '/input.html',
  '/login.html',
  '/menu-colors.html',
  '/menu-footer.html',
  '/menu-main.html',
  '/menu-share.html',
  '/menu-update.html',
  '/offline-detection.html',
  '/os-detection.html',
  '/qr-generator.html',
  '/register.html',
  '/sharing.html',
  '/statistics.html',
  '/survey.html',
  '/system-status.html',
  '/userdata.html',
  '/welcome.html',
  ];

// The install handler takes care of precaching the resources we always need.
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

// The activate handler takes care of cleaning up old caches.
self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIMECACHE];
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
addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open(PRECACHE)
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open(err)
                .then(function(cache) {
                  return cache.match('/pages/offline.html');
                });
            });
        }
      })
  );
});
