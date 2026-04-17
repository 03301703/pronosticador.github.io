/**
 * Service Worker para PER Campo
 * Cachea recursos para permitir funcionamiento offline
 */

const CACHE_NAME = 'per-campo-v1'
const PRECACHE = [
  './index.html',
  'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js',
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Cinzel:wght@600&display=swap'
]

// Instalar y precachear recursos
self.addEventListener('install', event => {
  console.log('Service Worker: installing...')
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Service Worker: precaching', PRECACHE.length, 'assets')
      return cache.addAll(PRECACHE)
    }).then(() => self.skipWaiting())
  )
})

// Activar y limpiar cachés viejos
self.addEventListener('activate', event => {
  console.log('Service Worker: activating...')
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: deleting old cache', cacheName)
            return caches.delete(cacheName)
          }
        })
      )
    }).then(() => self.clients.claim())
  )
})

// Estrategia de fetch: cache-first para CDN, network-first para HTML
self.addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)

  // Skip non-GET requests y chrome extensions
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return
  }

  // Para el HTML: network-first (actualizar si es posible, fallback a cache)
  if (url.pathname.endsWith('.html') || url.pathname === './') {
    event.respondWith(
      fetch(request).then(response => {
        if (response.ok) {
          const cache = caches.open(CACHE_NAME)
          cache.then(c => c.put(request, response.clone()))
          return response
        }
        return caches.match(request)
      }).catch(() => caches.match(request))
    )
    return
  }

  // Para CDN y assets: cache-first (usar cache, network como fallback)
  if (url.hostname.includes('cdnjs.cloudflare.com') ||
      url.hostname.includes('fonts.googleapis.com') ||
      url.pathname.endsWith('.png') ||
      url.pathname.endsWith('.js')) {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response
        return fetch(request).then(response => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }
          const cache = caches.open(CACHE_NAME)
          cache.then(c => c.put(request, response.clone()))
          return response
        })
      }).catch(() => caches.match(request))
    )
    return
  }

  // Por defecto: network-first
  event.respondWith(
    fetch(request).then(response => {
      if (response.ok) {
        const cache = caches.open(CACHE_NAME)
        cache.then(c => c.put(request, response.clone()))
      }
      return response
    }).catch(() => caches.match(request))
  )
})

console.log('Service Worker: registered')
