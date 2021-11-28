'use strict';

// Choose a cache name
const CACHE_NAME = 'static-cache-v9';

// List the files to precache
const FILES_TO_CACHE = [
  '/offline.html',
  '/index.html',
  '/main.js',
  '/game.css',
  '/assets/bueno.png',
  '/assets/bueno_muerto.png',
  '/assets/malo.png',
  '/assets/malo_muerto.png',
  '/assets/game_over.png',
  '/assets/you_win.png',
  '/assets/shot1.png',
  '/assets/shot2.png',
  '/assets/install.js'
];

// When the service worker is installing, 
// open the cache and add the precache resources to it
self.addEventListener('install', (evt) => {
  console.log('[ServiceWorker] Install');
  evt.waitUntil(
      caches.open(CACHE_NAME).then((cache) => {
        console.log('[ServiceWorker] Pre-caching offline page');
        return cache.addAll(FILES_TO_CACHE);
      })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (evt) => {
  console.log('[ServiceWorker] Activate');
  // CODELAB: Remove previous cached data from disk.
  evt.waitUntil(
      caches.keys().then((keyList) => {
        return Promise.all(keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
  );
  self.clients.claim();
});

// When there's an incoming fetch request, 
// try and respond with a precached resource, otherwise fall back to the network
self.addEventListener('fetch', (evt) => {
  console.log('[ServiceWorker] Fetch', evt.request.url);
  evt.respondWith(
      caches.open(CACHE_NAME).then((cache) => {
        return cache.match(evt.request)
            .then((response) => {
              console.log("RESP", response);
              return response || fetch(evt.request);
            });
      })
  );
});
