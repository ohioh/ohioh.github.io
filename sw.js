//importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.0/workbox-sw.js');
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');


//Workbox Config
workbox.setConfig({
    debug: true //set to true if you want to see SW in action.
});

//Caching Everything Inside the Folder of our Item
workbox.routing.registerRoute(
    new RegExp('.*'),
    new workbox.strategies.NetworkFirst()
);

console.log('[ServiceWorker] Service Worker Running');
