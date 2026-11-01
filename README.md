# Pindai

Aplikasi pemindai dokumen sederhana. Foto dokumen, luruskan lewat empat sudut, pilih filter, lalu simpan sebagai PDF atau JPG. Semua proses jalan di HP, tidak ada foto yang dikirim ke internet, dan bisa dipakai offline setelah dibuka sekali.

## Isi folder

| File | Fungsinya |
|---|---|
| `index.html` | Aplikasinya (tampilan + cara kerja) |
| `sw.js` | Service worker: menyimpan aplikasi di HP supaya bisa offline |
| `manifest.json` | Nama dan ikon saat "Tambahkan ke layar utama" |
| `icon-192.png`, `icon-512.png` | Ikon aplikasi |

## Cara upload ke GitHub (lewat browser, tanpa install apa pun)

1. Login di github.com, klik **+** di kanan atas → **New repository**.
2. Isi nama repo, misalnya `pindai`. Pilih **Public**. Klik **Create repository**.
3. Klik link **uploading an existing file**. Seret semua file di folder ini (bukan foldernya) ke halaman itu. Klik **Commit changes**.
4. Buka tab **Settings** → **Pages**. Di bagian *Branch*, pilih `main` dan folder `/ (root)`, lalu **Save**.
5. Tunggu 1–2 menit, lalu muat ulang halaman Settings → Pages. Link aplikasimu muncul di atas, bentuknya `https://namakamu.github.io/pindai/`.

## Cara pasang di HP

1. Buka link tadi di **Chrome** (Android) atau **Safari** (iPhone) saat ada internet.
2. Android: menu ⋮ → **Tambahkan ke layar utama** / **Instal aplikasi**.
   iPhone: tombol Bagikan → **Tambahkan ke Layar Utama**.
3. Setelah itu aplikasinya bisa dibuka dari ikon, termasuk saat offline.

## Cara mengganti nama dan ikon

- **Nama di layar utama:** buka `manifest.json`, ubah teks setelah `"name"` dan `"short_name"`. Jangan hapus tanda kutip dan komanya.
- **Nama di tab browser:** buka `index.html`, ubah teks di antara `<title>` dan `</title>` (ada komentar `GANTI NAMA` di atasnya).
- **Nama di dalam aplikasi:** di `index.html`, cari `<h1>Pindai</h1>` dan ubah teksnya.
- **Ikon:** ganti `icon-192.png` dan `icon-512.png` dengan gambarmu. Nama file harus sama persis, ukurannya persegi 192×192 dan 512×512 piksel. Taruh logo di tengah dan beri ruang kosong di pinggir, karena beberapa HP memotong ikon jadi bulat.
- **Warna utama:** di `index.html`, cari `--accent:#006D77` dan ganti kode warnanya. Samakan juga `theme_color` di `manifest.json`.

Edit file langsung di GitHub: buka filenya → ikon pensil → ubah → **Commit changes**.

## Kalau perubahan belum muncul di HP

Aplikasi memakai salinan yang tersimpan di HP dulu, lalu mengambil versi baru di belakang layar. Jadi setelah upload perubahan, buka aplikasinya dua kali (tutup lalu buka lagi) dengan internet menyala. Kalau ingin semua HP langsung memakai versi baru, buka `sw.js` dan naikkan angka di `const CACHE = 'pindai-v1';` menjadi `pindai-v2`, dan seterusnya.

## Batasan

- Halaman yang sudah dipindai tidak tersimpan permanen. Simpan PDF dulu sebelum menutup aplikasi.
- Deteksi sudut otomatis hanya perkiraan. Paling akurat untuk kertas terang di atas latar gelap.
- Teks di PDF belum bisa dicari atau disalin (belum ada OCR).
