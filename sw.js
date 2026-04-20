// Service Worker minimalista para habilitar la instalación PWA
const CACHE_NAME = 'vocesApp-v1';
const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './LogoVC.png',
  './android-icon-192x192.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
