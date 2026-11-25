// offline cache
const CACHE = 'sewon-7394ea6519';
const FILES = ["./", "index.html", "pages.json", "app.webmanifest", "icon-192.png", "icon-512.png", "pages/colleng/001.webp", "pages/colleng/002.webp", "pages/colleng/003.webp", "pages/colleng/004.webp", "pages/colleng/005.webp", "pages/colleng/006.webp", "pages/colleng/007.webp", "pages/colleng/008.webp", "pages/colleng/009.webp", "pages/colleng/010.webp", "pages/colleng/011.webp", "pages/hobbyart/001.webp", "pages/hobbyart/002.webp", "pages/hobbyart/003.webp", "pages/hobbyart/004.webp", "pages/hobbyart/005.webp", "pages/hobbyart/006.webp", "pages/hobbyart/007.webp", "pages/hobbyart/008.webp", "pages/hobbyart/009.webp", "pages/intlbiz/001.webp", "pages/intlbiz/002.webp", "pages/intlbiz/003.webp", "pages/intlbiz/004.webp", "pages/intlbiz/005.webp", "pages/intlbiz/006.webp", "pages/intlbiz/007.webp", "pages/intlbiz/008.webp", "pages/intlbiz/009.webp"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith('sewon-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request, {ignoreSearch: true}).then(r => r || fetch(e.request).then(res => {
    if (res.ok && new URL(e.request.url).origin === location.origin) { const cp = res.clone(); caches.open(CACHE).then(c => c.put(e.request, cp)); }
    return res;
  }).catch(() => caches.match('index.html'))));
});
