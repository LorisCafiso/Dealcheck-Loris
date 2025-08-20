const CACHE_NAME = "dealcheck-v1"
const STATIC_CACHE = "dealcheck-static-v1"
const DYNAMIC_CACHE = "dealcheck-dynamic-v1"

// Assets to cache on install
const STATIC_ASSETS = ["/", "/manifest.json", "/icon-192x192.png", "/icon-512x512.png", "/offline.html"]

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker")
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) => {
        console.log("[SW] Caching static assets")
        return cache.addAll(STATIC_ASSETS)
      })
      .then(() => {
        console.log("[SW] Static assets cached")
        return self.skipWaiting()
      }),
  )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker")
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
              console.log("[SW] Deleting old cache:", cacheName)
              return caches.delete(cacheName)
            }
          }),
        )
      })
      .then(() => {
        console.log("[SW] Service worker activated")
        return self.clients.claim()
      }),
  )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event

  // Skip non-GET requests
  if (request.method !== "GET") {
    return
  }

  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) {
    return
  }

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        console.log("[SW] Serving from cache:", request.url)
        return cachedResponse
      }

      // Clone the request for caching
      const fetchRequest = request.clone()

      return fetch(fetchRequest)
        .then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== "basic") {
            return response
          }

          // Clone the response for caching
          const responseToCache = response.clone()

          // Cache dynamic content
          caches.open(DYNAMIC_CACHE).then((cache) => {
            console.log("[SW] Caching dynamic content:", request.url)
            cache.put(request, responseToCache)
          })

          return response
        })
        .catch(() => {
          // Offline fallback
          console.log("[SW] Network failed, serving offline page")
          if (request.destination === "document") {
            return caches.match("/offline.html")
          }
        })
    }),
  )
})

// Background sync for offline actions
self.addEventListener("sync", (event) => {
  console.log("[SW] Background sync triggered:", event.tag)

  if (event.tag === "background-sync-deals") {
    event.waitUntil(syncDeals())
  }
})

// Push notification handler
self.addEventListener("push", (event) => {
  console.log("[SW] Push notification received")

  const options = {
    body: event.data ? event.data.text() : "Nuovo deal disponibile!",
    icon: "/icon-192x192.png",
    badge: "/icon-72x72.png",
    vibrate: [200, 100, 200],
    data: {
      url: "/",
    },
    actions: [
      {
        action: "view",
        title: "Visualizza",
        icon: "/icon-96x96.png",
      },
      {
        action: "dismiss",
        title: "Ignora",
      },
    ],
  }

  event.waitUntil(self.registration.showNotification("DealCheck", options))
})

// Notification click handler
self.addEventListener("notificationclick", (event) => {
  console.log("[SW] Notification clicked:", event.action)

  event.notification.close()

  if (event.action === "view") {
    event.waitUntil(clients.openWindow(event.notification.data.url || "/"))
  }
})

// Sync deals function
async function syncDeals() {
  try {
    console.log("[SW] Syncing deals in background")
    // Implement background sync logic here
    return Promise.resolve()
  } catch (error) {
    console.error("[SW] Background sync failed:", error)
    return Promise.reject(error)
  }
}
