// ABU SHUJAA PHARMACY — service worker
// Caches the app shell so the site opens instantly and works offline
// once visited. Bump CACHE_NAME whenever you deploy changes so
// returning customers get the fresh version.

const CACHE_NAME = "abu-shujaa-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./script.js",
  "./products.js",
  "./translations.js",
  "./articles.js",
  "./manifest.json",
  "./assets/logo.jpg",
  "./assets/icons/icon-192.png",
  "./assets/icons/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

// Network-first for the HTML shell (so price/stock updates show up when
// online), cache-first for everything else (fonts, styles, scripts, icons).
//
// IMPORTANT: only ever intervene for GET requests to our own site. Anything
// cross-origin (Apps Script API calls, Cloudflare's own scripts, CDN fonts)
// or non-GET (POST updates to the inventory sheet) is left completely
// untouched — otherwise the service worker can swallow or break those
// requests, which previously made scan.html's lookups hang forever.
self.addEventListener("fetch", (event) => {
  const req = event.request;

  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) {
    return; // let the browser handle it natively, no interception at all
  }

  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req).then((cached) => cached || caches.match("./index.html")))
    );
    return;
  }

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req).then((res) => {
        const resClone = res.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
        return res;
      });
    })
  );
});
