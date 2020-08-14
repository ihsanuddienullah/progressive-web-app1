const CACHE_NAME = "pwacoding9";
const urlsToCache = [
    "/",
    "/nav.html",
    "/index.html",
    "/manifest.json",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/contact.html",
    "/pages/lesson.html",
    "/css/materialize.min.css",
    "/css/style.css",
    "/js/materialize.min.js",
    "/js/nav.js",
    "/js/service-worker-register.js",
    "/img/home-background.jpg",
    "/img/icon.png",
    "/img/icon-72.png",
    "/img/icon-192.png",
    "/img/icon-256.png",
    "/img/icon-512.png",
    "/img/logo.png",
    "/img/machinelearning.png",
    "/img/mobiledev.png",
    "/img/webdev.png",
    "/img/datascience.png"
];

self.addEventListener("install", function(event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache) {
            return cache.addAll(urlsToCache);
        })
    );
});

self.addEventListener("fetch", function(event) {
    event.respondWith(
        caches
            .match(event.request, { cacheName: CACHE_NAME })
            .then(function(response) {
            if (response) {
                console.log("ServiceWorker: Use assets from cache: ", response.url);
                return response;
            }
    
            console.log(
                "ServiceWorker: Load assets from server: ",
                event.request.url
            );
            return fetch(event.request);
            })
    );
});

self.addEventListener("activate", function(event) {
    event.waitUntil(
        caches.keys().then(function(cacheNames) {
            return Promise.all(
                cacheNames.map(function(cacheName) {
                    if (cacheName != CACHE_NAME) {
                        console.log("ServiceWorker: cache " + cacheName + " removed");
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});