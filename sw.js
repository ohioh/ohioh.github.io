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


