// Install service worker
self.addEventListener("install", event => {
  console.log("service worker has been installed", event);
});

// Listen for activate event
self.addEventListener("activate", event => {
  console.log("service worker has been activated", event);
});

// Fetch event
self.addEventListener("fetch", event => {
  console.log("fetch event", event);
});
