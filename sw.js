const staticCacheName = "site-cache-v1";
const dyanamicCacheName = "site-dynamic-v1";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons",
  "/pages/fallback.html"
];

// Install service worker
self.addEventListener("install", event => {
  // cache static resources
  event.waitUntil(
    caches
      .open(staticCacheName)
      .then(cache => {
        // add resources to be cached
        cache.addAll(assets);
        console.log("cached static resources");
      })
      .catch(err => console.error("cache resources error", err))
  );
});

// Listen for activate event
self.addEventListener("activate", event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => {
        // pass array of promises, filter keys, keep same key and delete every other key
        return Promise.all(
          keys
            .filter(key => key !== staticCacheName && key !== dyanamicCacheName)
            .map(key => caches.delete(key))
        );
      })
      .catch(err => console.error("keys error", err))
  );
});

// Fetch event
self.addEventListener("fetch", event => {
  // match request with assets array
  event.respondWith(
    caches
      .match(event.request)
      .then(cacheRes => {
        // if res found return it otherwise return original request
        return (
          cacheRes ||
          fetch(event.request).then(fetchRes => {
            return caches.open(dyanamicCacheName).then(cache => {
              cache.put(event.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
      .catch(() => {
        if (event.request.url.indexOf(".html") > -1) {
          return caches.match("/pages/fallback.html");
        }
      })
  );
});
