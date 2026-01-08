const CACHE_NAME = 'eng-tools-v1';
// รายชื่อไฟล์ที่ต้องการให้โหลดเก็บไว้ในมือถือทันที
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon.png',
  '/tailwindcss.js', // เก็บตัวประมวลผล Tailwind ไว้ใช้ตอน Offline
  '/programs/copypaste.html',
  '/programs/coating.html',
  '/programs/unit-converter.html',
  '/programs/tolerance.html',
  '/programs/lead.html',
  '/programs/rrc.html',
  '/programs/runout-lipheight.html',
  '/programs/oil-hole-ratio.html',
  '/programs/vcut-pattern-selector.html',
  '/programs/oil-hole-endmill.html',
  '/programs/oil-hole-spiral-angle.html',
  '/programs/yakibame.html',
  '/programs/geometry.html',
  '/programs/cylinder-weight-calculator.html'
];

// ขั้นตอนการติดตั้ง: โหลดไฟล์ลง Cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// ขั้นตอนการเรียกใช้งาน: ดึงไฟล์จาก Cache มาแสดง (แม้ไม่มีเน็ต)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // ถ้ามีใน Cache ให้ใช้จาก Cache, ถ้าไม่มีให้ไปดึงจาก Network
      return response || fetch(event.request);
    })
  );
});

// ขั้นตอนการอัปเดต: ลบ Cache เก่าทิ้งเมื่อมีการเปลี่ยนเวอร์ชัน (เปลี่ยนชื่อ CACHE_NAME)
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});