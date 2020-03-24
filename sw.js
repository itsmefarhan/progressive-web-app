const staticCacheName = "site-cache";
const assets = [
  "/",
  "/index.html",
  "/js/app.js",
  "/js/ui.js",
  "/js/materialize.min.js",
  "/css/styles.css",
  "/css/materialize.min.css",
  "/img/dish.png",
  "https://fonts.googleapis.com/icon?family=Material+Icons"
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
      .catch(err => console.error(err))
  );
});

// Listen for activate event
self.addEventListener("activate", event => {
  // console.log("service worker has been activated", event);
});

// Fetch event
self.addEventListener("fetch", event => {
  // console.log("fetch event", event);
  // match request with assets array
  event.respondWith(
    caches
      .match(event.request)
      .then(cacheRes => {
        // if res found return it otherwise return original request
        return cacheRes || fetch(event.request);
      })
      .catch()
  );
});
