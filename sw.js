const cacheName = 'Waleeds-olx-app';
const staticAssets = [
    './',
    './design.css',
    './signin.html',
    './signup.html',
    './mainPage.html',
    './index.html',
    './app.js',
    './auth.js',
    './pages/bikes.html',
    './pages/books.html',
    './pages/cars.html',
    './pages/electronic.html',
    './pages/furniture.html',
    './pages/jobs.html',
    './pages/mobiles.html',
    './pages/properties.html'

]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(function(cache) {
          console.log('[ServiceWorker] Caching app shell');
          return cache.addAll(staticAssets);
        })
      );
})


self.addEventListener('fetch', function(event) {
event.respondWith(
    caches.open('Waleed-olx-app').then(function(cache) {
    return cache.match(event.request).then(function (response) {
        // return response || fetch(event.request).then(function(response) {
        // cache.put(event.request, response.clone());
        // return response;
        // });
    });
    })
);
});

self.addEventListener('fetch', event => {
    const req = event.request;
    const url = new URL(req.url);
    if (url.origin === location.origin) {
        event.respondWith(cacheFirst(req))
    } else {
        event.respondWith(networkFirst(req))
    }
})

async function cacheFirst(req) {
    const cacheResponse = await caches.match(req);
    return cacheResponse || fetch(req);
}

async function networkFirst(req) {
    const cache = await caches.open(cacheName);
    try {
        const res = await fetch(req);
        cache.put(req, res.clone())
        return res
    } catch (error) {
        return await cache.match(req)
    }
}






