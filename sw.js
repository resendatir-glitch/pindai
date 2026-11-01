// Service worker: menyimpan file aplikasi di HP supaya bisa dibuka tanpa internet.
// Kalau kamu mengubah file lain dan ingin semua HP langsung pakai versi baru,
// naikkan angka versi di bawah ini (misalnya 'pindai-v2').
const CACHE = 'pindai-v1';
const FILES = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Pakai salinan di HP dulu (cepat & offline), lalu perbarui diam-diam kalau ada internet.
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  const net = fetch(req)
    .then(async (res) => {
      if (res && res.ok) { const c = await caches.open(CACHE); await c.put(req, res.clone()); }
      return res;
    })
    .catch(() => null);
  e.waitUntil(net);
  e.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: true });
    if (cached) return cached;
    const res = await net;
    if (res) return res;
    if (req.mode === 'navigate') { const idx = await caches.match('./index.html'); if (idx) return idx; }
    return Response.error();
  })());
});
