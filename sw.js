const PRECACHE = 'OHIOHCache-static-v1';
const DYNAMICCACHE = 'OHIOHCache-dynamic';
const RUNTIMECACHE = 'OHIOHCache-runtime';
const OFFLINE_URL = "../pages/offline.html";

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


self.addEventListener('install', (event) => {
  event.waitUntil((async () => {
    console.log("[OHIOH] Serviceworker installing...");
    const cache = await caches.open(PRECACHE_URLS);
    // Setting {cache: 'reload'} in the new request will ensure that the response
    // isn't fulfilled from the HTTP cache; i.e., it will be from the network.
    await cache.add(new Request(OFFLINE_URL, {cache: 'reload'}));
  })());
});

self.addEventListener('activate', (event) => {
  const currentCaches = [PRECACHE, RUNTIMECACHE];
  console.log("[OHIOH] Serviceworker installed.");
  event.waitUntil((async () => {
    // Enable navigation preload if it's supported.
    // See https://developers.google.com/web/updates/2017/02/navigation-preload
    if ('navigationPreload' in self.registration) {
      await self.registration.navigationPreload.enable();
      caches.keys().then(cacheNames => {
        return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
      }).then(cachesToDelete => {
        return Promise.all(cachesToDelete.map(cacheToDelete => {
          return caches.delete(cacheToDelete);
        }));
      }).then(() => self.clients.claim())
    }
    console.log("[OHIOH] Serviceworker acitvated.");
  }))
})

self.addEventListener('fetch', (e) => {
  console.log('[OHIOH][Service Worker] Fetched resource '+e.request.url);
});

self.addEventListener('fetch', (event) => {
  // We only want to call event.respondWith() if this is a navigation request
  // for an HTML page.
  if (event.request.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        // First, try to use the navigation preload response if it's supported.
        const preloadResponse = await event.preloadResponse;
        if (preloadResponse) {
          return preloadResponse;
        }

        const networkResponse = await fetch(event.request);
        return networkResponse;
      } catch (error) {
        // catch is only triggered if an exception is thrown, which is likely
        // due to a network error.
        // If fetch() returns a valid HTTP response with a response code in
        // the 4xx or 5xx range, the catch() will NOT be called.
        console.log('[OHIOH] Fetch failed; returning offline page instead.', error);

        const cache = await caches.open(PRECACHE);
        const cachedResponse = await cache.match(OFFLINE_URL);
        return cachedResponse;
      }
    })());
  }

  // If our if() condition is false, then this fetch handler won't intercept the
  // request. If there are any other fetch handlers registered, they will get a
  // chance to call event.respondWith(). If no fetch handlers call
  // event.respondWith(), the request will be handled by the browser as if there
  // were no service worker involvement.
});

