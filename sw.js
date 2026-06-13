/* Service worker — offline cache. Bump CACHE when files change. */
const CACHE = "poker-academy-v11";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./css/styles.css",
  "./js/data/drills.js", "./js/data/curriculum.js", "./js/data/leaks.js",
  "./js/gamification.js", "./js/store.js", "./js/screens.js", "./js/app.js",
  "./icons/icon.svg"
];

self.addEventListener("install", e => {
  // Cache assets but DON'T auto-activate — wait so the app can offer "tap to refresh".
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
});

// App tells us to activate the new version (from the update banner).
self.addEventListener("message", e => {
  if (e.data === "SKIP_WAITING" || (e.data && e.data.type === "SKIP_WAITING")) self.skipWaiting();
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

// cache-first, fall back to network
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(
    caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
      const copy = res.clone();
      caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {});
      return res;
    }).catch(() => hit))
  );
});
