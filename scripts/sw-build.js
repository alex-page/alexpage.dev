// Dependenices
const Workbox = require('workbox-build');

// Workbox settings for service worker
// https://developers.google.com/web/tools/workbox/modules/workbox-build
Workbox.generateSW({
	swDest: '_site/service-worker.js',
	globDirectory: '_site',
	globPatterns: ['**/*.{html,png,jpg,svg,ico}'],
	cacheId: 'alex-page'
}).then(({count, size}) => {
	console.log(`Generated service worker: ${count} files, ${size} bytes.`);
});
