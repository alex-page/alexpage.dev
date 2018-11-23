const cacheName = "alexpage-1.0.0";
const filesToCache = [
	"/assets/css/style.css",
	"/assets/js/footer.min.js",
	"/assets/js/html5shiv.js",
	"/assets/js/respond.js",
	"/assets/img/logo.svg",
	"/assets/img/me.png",
	"/index.html",
];

self.oninstall = ( event ) => {
	console.log( 'service worker installed' );
	event.waitUntil(
		caches.open( cacheName )
			.then( ( cache ) => cache.addAll( filesToCache ) )
	);

	// Activate the new service worker
	self.skipWaiting();
}

self.onactivate = ( event ) => {
	console.log( 'activated sw' );
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
				if( response ){
					return response;
				}

				return fetch( event.request );
			})
	);
}
