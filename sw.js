/**
 * Service Worker - Pronosticador PWA
 * Permite funcionalidad offline y caching
 */

const CACHE_NAME = 'pronosticador-v1';
const urlsToCache = [
    '/',
    '/pronosticador/',
    '/pronosticador/index.html',
    '/pronosticador/manifest.json',
    '/pronosticador/sw.js',
    'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.min.js'
];

/**
 * Install Event
 */
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(urlsToCache).catch(err => {
                console.log('Some resources failed to cache:', err);
            });
        })
    );
    self.skipWaiting();
});

/**
 * Activate Event
 */
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

/**
 * Fetch Event
 * Network-first para HTML, cache-first para otros assets
 */
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Para HTML, intenta red primero
    if (request.destination === 'document' || request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .then(response => {
                    if (response && response.status === 200) {
                        const cloned = response.clone();
                        caches.open(CACHE_NAME).then(cache => {
                            cache.put(request, cloned);
                        });
                    }
                    return response;
                })
                .catch(() => {
                    return caches.match(request)
                        .then(response => response || new Response('Offline', { status: 503 }));
                })
        );
        return;
    }

    // Para otros recursos, cache-first
    event.respondWith(
        caches.match(request).then(response => {
            return response || fetch(request).then(response => {
                if (!response || response.status !== 200) {
                    return response;
                }
                const cloned = response.clone();
                caches.open(CACHE_NAME).then(cache => {
                    cache.put(request, cloned);
                });
                return response;
            }).catch(() => {
                if (request.destination === 'image') {
                    return new Response('', { status: 204 });
                }
                return new Response('Offline', { status: 503 });
            });
        })
    );
});
