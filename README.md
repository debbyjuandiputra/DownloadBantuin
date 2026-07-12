# Bantuin — Halaman Unduh

Halaman statis untuk mengunduh aplikasi Bantuin (Android), lengkap dengan
preview tampilan aplikasi, informasi ukuran/versi/jumlah unduh, riwayat
pembaruan, dan kontak developer.

## Struktur folder

```
index.html                 halaman utama
Bantuin.apk                file APK yang diunduh pengguna
css/style.css               seluruh gaya visual
js/main.js                  interaksi (carousel, riwayat, tombol unduh, statistik)
js/supabase-config.js       koneksi ke Supabase (dipakai untuk statistik unduhan)
assets/icon.png             ikon aplikasi
assets/screenshots/1.jpeg…10.jpeg   cuplikan tampilan aplikasi
SUPABASE_DOWNLOAD_STATS.md  panduan setup tabel Supabase untuk angka unduhan
```

## Cara deploy (GitHub Pages)

1. Upload seluruh isi folder ini (bukan foldernya, tapi isinya) ke root
   sebuah repository GitHub — atau ke folder terpisah kalau digabung
   dengan repo aplikasi utama.
2. Aktifkan GitHub Pages dari Settings > Pages, arahkan ke branch & folder
   tempat file ini berada.
3. (Opsional tapi disarankan) Ikuti `SUPABASE_DOWNLOAD_STATS.md` supaya
   angka "Diunduh" benar-benar terhitung dari klik pengguna.

## Merilis versi baru

Setiap kali ada versi APK baru:

1. Ganti file `Bantuin.apk` dengan file APK versi terbaru (nama file
   harus tetap `Bantuin.apk`, atau ganti juga nilai `APK_PATH` /
   `APK_NAME` di `js/main.js` kalau namanya diubah).
2. Update angka di `index.html`:
   - `id="specSize"` → ukuran file baru.
   - `id="specVersion"` → nomor versi baru.
   - Teks "Versi 1.0.0" di footer.
3. Tambahkan entri baru di bagian **Riwayat pembaruan** (`id="changelog"`),
   dengan menyalin blok `.change-item` yang sudah ada, lalu ganti nomor
   versi dan daftar perubahannya. Entri terbaru sebaiknya diletakkan di
   paling atas.
4. Kalau ada tampilan baru, ganti/tambahkan gambar di
   `assets/screenshots/` lalu sesuaikan `SHOT_COUNT` di `js/main.js`.

## Tentang tombol iOS

Tombol iOS sengaja dinonaktifkan (menampilkan catatan "belum tersedia")
karena versi iOS belum dibuat. Begitu versi iOS sudah siap, ganti logika
`selectOS()` di `js/main.js` supaya tombol tersebut ikut mengarah ke
file unduhan iOS-nya.
