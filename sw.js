// --- VERSIÓN 35 - Estabilidad de Audio e Iconos ---
const CACHE_NAME = 'voces-campesinas-v0.5';

const ASSETS = [
  './',
  './index.html',
  './manifest.json',
  './LogoVC.png',
  './android-icon-192x192.png'
];

// Instalación: Guarda los archivos esenciales en el teléfono
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activación: Borra versiones viejas de la radio para liberar espacio y actualizar
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

// Peticiones: Intenta servir desde el caché para que cargue más rápido
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
