var cacheName = 'misperris-v13';
var filesToCache = [
  '/',
  '/index.html',
  '/galeria.html',
  '/adopta.html',
  '/login.html',
  '/css/carrusel.css',
  '/css/galerias_style.css',
  '/css/menu.css',
  '/css/style.css',
  '/css/adoptar.css',
  '/img/familia3-1024.jpg',
  '/img/familia4-1024.jpg',
  '/img/familia5-1024.jpg',
  '/img/batdog.jpg',
  '/img/dogbin.jpg',
  '/img/spiderguau.jpg',
  '/img/SrGuaustark.jpg',
  '/img/perromain2.0.png',
  '/img/adopta-300.jpg',
  '/img/logoPerris.png',
  '/js/carrusel.js',
  '/js/extras.js',
  '/js/validation.js',
  '/js/app.js'
];

self.addEventListener('install', function(e) {
    console.log('[ServiceWorker] Install');
    e.waitUntil(
      caches.open(cacheName).then(function(cache) {
        console.log('[ServiceWorker] Caching app shell');
        return cache.addAll(filesToCache);
      })
    );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
    console.log('[ServiceWorker] Fetch', e.request.url);
    e.respondWith(
      caches.match(e.request).then(function(response) {
        return response || fetch(e.request);
      })
    );
});
