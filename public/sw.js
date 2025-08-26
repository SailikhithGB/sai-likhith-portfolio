const CACHE = 'ngc-v1';
const ASSETS = [
	'/',
	'/index.html',
	'/favicon.ico'
];

self.addEventListener('install', (event) => {
	event.waitUntil(
		caches.open(CACHE).then((cache) => cache.addAll(ASSETS))
	);
});

self.addEventListener('fetch', (event) => {
	event.respondWith(
		caches.match(event.request).then((cached) => cached || fetch(event.request))
	);
});

self.addEventListener('sync', (event) => {
	if (event.tag === 'sync-messages') {
		// Placeholder for background send of queued messages
		event.waitUntil(Promise.resolve());
	}
});