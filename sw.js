console.log('Service Worker: Registered');

const cacheFiles=[
    '/',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/main.js',
    '/js/dbhelper.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/index.html',
    '/restaurant.html',
    'CSS/styles.css'
];

self.addEventListener('install',function(event){
    event.waitUntil(
        caches.open('V1').then(function(cache){
            return cache.addAll(cacheFiles);
        })

    );

});


self.addEventListener('fetch',function(event){
    event.respondWith(
        caches.match(event.request).then(function(response){
            if(response) {
                console.log('Found', event.request, 'in cache');
                return response;
            }
            else{
                console.log('Not Found', event.request, 'Fetching');
                return fetch(event.request)
                .then(function(response){
                    const clonedResponse = response.clone();
                    caches.open('v1').then(function(cache){
                        cache.put(event.request, clonedResponse);
                    })
                    return response;
                })
                .catch(function(error){
                    console.error(error);
                });



            }


        })

    );

});