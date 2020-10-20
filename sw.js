const staticCacheName = 'OHIOH-static-v1';
var dynamicCacheName = 'OHIOH-dynamic-v1';
import runtime from 'offline-plugin/runtime';
import { getFiles, setupPrecaching, setupRouting } from 'preact-cli/sw';
import { registerRoute } from 'workbox-routing';
import { CacheFirst } from 'workbox-strategies';
import { BackgroundSyncPlugin } from 'workbox-background-sync';


runtime.install({
	// When an update is ready, tell ServiceWorker to take control immediately:
	onUpdateReady() {
		console.log('[OHIOH]: Update is ready.');
		runtime.applyUpdate();
	},
	// Reload to get the new version:
	onUpdated() {
		console.log('[OHIOH]: The App was updated.');
		location.reload();
	}
});

const bgSyncPlugin = new BackgroundSyncPlugin('apiRequests', {
	maxRetentionTime: 60  // retry for up to one hour (in minutes)
});

// retry failed POST requests to /api/**.json
registerRoute(
	/\/api\/.*\/.*\.json/,
	new NetworkOnly({
			plugins: [bgSyncPlugin]
	}),
	'POST'
);

/** Preact CLI setup */
setupRouting();

const urlsToCache = getFiles();

const urlsToCache = getFiles();
urlsToCache.push(

	{url: 'index.html', revision: null},
	{url: 'index-features.html', revision: null},
	{url: 'index-media.html', revision: null},
	{url: 'index-settings', revision: null},
	{url: 'index-QR.html', revision: null},
	{url: 'menu-colors.html', revision: null},
	{url: 'menu-footer.html', revision: null},
	{url: 'menu-main.html', revision: null},
	{url: 'menu-share.html', revision: null},
	{url: '_manifest.json', revision: null},
	{url: 'pages/offline.html', revision: null},
	{url: 'pages/404.html', revision: null},
	{url: 'sw.js', revision: null},
	{url: 'style/bootstrap.css', revision: null},
	{url: 'js/pwa.js', revision: null},
	{url: 'js/custom.js', revision: null},
	{url: 'js/bootstrap.min.js', revision: null},
	{url: 'style/main.css', revision: null},

);

setupPrecaching(urlsToCache);

registerRoute(
  ({url, event}) => {
    return (url.pathname === '/special/url');
  },
  new CacheFirst()  // or: CacheFirst/CacheOnly/StaleWhileRevalidate/NetworkOnl<
);

self.addEventListener('install', event => {
  console.log('[OHIOH]: Attempting to install service worker and cache static assets.');
  event.waitUntil(
    caches.open(staticCacheName)
    .then(cache => {
      return cache.addAll(filesToCache);
    })
  );
});


self.addEventListener('activate', event => {
  console.log('[OHIOH]: Activating new service worker...');

  const cacheWhitelist = [staticCacheName];

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  console.log('Fetch event for ', event.request.url);
  event.respondWith(
    caches.match(event.request)
    .then(response => {
      if (response) {
        console.log('Found ', event.request.url, ' in cache');
        return response;
      }
      console.log('Network request for ', event.request.url);
      return fetch(event.request)
        .then(response => {
          if (response.status === 404) {
            return caches.match('pages/404.html');
          }
          return caches.open(staticCacheName)
            .then(cache => {
              cache.put(event.request.url, response.clone());
              return response;
            });
        });
    }).catch(error => {
      console.log('Error, ', error);
      return caches.match('pages/offline.html');
    })
  );
});

self.addEventListener('notificationclose', event => {
  const notification = event.notification;
  const primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});


setupRouting();
