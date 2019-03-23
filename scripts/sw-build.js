// Inside of build.js:
const Path = require( 'path' );
const Workbox = require( 'workbox-build' );

Workbox.generateSW({
	swDest: 'site/service-worker.js',
	globDirectory: 'site',
	globPatterns: ['**/*.{html,png,jpg,svg,ico}'],
	cacheId: 'alex-page'
}).then(({count, size}) => {
	console.log( `Generated service worker: ${count} files, ${size} bytes.`);
});
