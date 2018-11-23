const cacheName = "alexpage-1.0.1";
const filesToCache = [
	"/assets/css/style.css",
	"/assets/js/footer.min.js",
	"/assets/js/html5shiv.js",
	"/assets/js/respond.js",
	"/assets/img/logo.svg",
	"/assets/img/me.png",
	"/index.html",
	"/"
];


self.addEventListener('install', function(e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      '/',
      '/index.html',
      '/sw.js',
      '/stylesheets/default.css',
      '/javascripts/default.js'
    ]);
  }))
});

self.addEventListener('fetch', function(e) {
  var tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      if (!response) {
        return handleNoCacheMatch(e);
      }
      // Update cache record in the background
      fetchFromNetworkAndCache(e);
      // Reply with stale data
      return response
    });
  });
  e.respondWith(tryInCachesFirst);
});

self.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== VERSION)
        return caches.delete(key);
    }));
  }));
});

function fetchFromNetworkAndCache(e) {
  // DevTools opening will trigger these o-i-c requests, which self SW can't handle.
  // There's probaly more going on here, but I'd rather just ignore this problem. :)
  // https://github.com/paulirish/caltrainschedule.io/issues/49
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

  return fetch(e.request).then(res => {
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(VERSION).then(cache => {
      // TODO: figure out if the content is new and therefore the page needs a reload.
      cache.put(e.request, res.clone());
      return res;
    });
  }).catch(err => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
  return fetchFromNetworkAndCache(e);
}

self.oninstall = ( event ) => {
	event.waitUntil(
		caches.open( cacheName )
			.then( ( cache ) => cache.addAll( filesToCache ) )
	);

	// Activate the new service worker
	self.skipWaiting();
}

self.onactivate = ( event ) => {
	event.waitUntil(
		caches.keys()
			.then( ( cacheKeys ) => {
				const DeleteOldCaches = cacheKeys.map( key => {
					// Remove old caches
					if( key !== cacheName ){
						return caches.delete( key );
					}

					// Leave the current cache
					return Promise.resolve();
				})
				return Promise.all( DeleteOldCaches );
			})
	)

	// Claim the fetch events
	self.clients.claim();
}

self.onfetch = ( event ) => {
	event.respondWith(
		caches.match( event.request )
			.then( ( response ) => {
				if( event.request.cache === 'only-if-cached' && event.request.mode !== 'same-origin'){
					return;
				}
				if( response ){
					return response;
				}

				return fetch( event.request );
			})
	);
}
