// Service worker : rend l'application utilisable hors ligne.
// Stratégie « réseau d'abord » : on charge toujours la dernière version quand
// internet est là, et on garde une copie pour les moments sans connexion.
const CACHE = 'english-boost-v3';
const CORE = [
  './', 'index.html', 'styles.css', 'app.js', 'text.mjs', 'manifest.webmanifest',
  'icons/icon.svg', 'icons/icon-192.png', 'icons/icon-512.png',
  'data/index.mjs', 'data/mots.mjs', 'data/jours-01-10.mjs', 'data/jours-11-20.mjs', 'data/jours-21-30.mjs',
  'js/store.js', 'js/speech.js', 'js/match.js', 'js/ui.js', 'js/studio.js', 'js/roleplay.js',
  'js/views/home.js', 'js/views/lesson.js', 'js/views/exercises.js', 'js/views/review.js',
  'js/views/favorites.js', 'js/views/search.js',
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || new URL(request.url).origin !== location.origin) return;
  event.respondWith(
    fetch(request)
      .then(response => {
        if (response.ok) {
          const copy = response.clone();
          caches.open(CACHE).then(cache => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request, { ignoreSearch: true }).then(hit => hit || caches.match('index.html'))),
  );
});
