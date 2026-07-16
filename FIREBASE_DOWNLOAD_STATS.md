# Setup Firebase — Statistik Unduhan (halaman unduh)

Halaman unduh ini menampilkan angka "Diunduh" yang **beneran dihitung dari
klik tombol unduh**, bukan angka tetap. Sekarang memakai **Firebase Realtime
Database** (`js/firebase-config.js` sudah diisi dengan config project Anda).

## 1. Aktifkan Realtime Database

Di [Firebase Console](https://console.firebase.google.com/) → project
`bantuin-88d4a` → menu **Build > Realtime Database** → **Create Database**
(kalau belum pernah dibuat). Pilih lokasi `asia-southeast1` supaya cocok
dengan `databaseURL` yang sudah ada di config.

## 2. Isi data awal

Di tab **Data**, tambahkan node berikut (lewat tombol "+" atau import JSON):

```json
{
  "app_stats": {
    "bantuin_v1": {
      "downloads": 0
    }
  }
}
```

## 3. Pasang Rules

Di tab **Rules**, pakai aturan berikut supaya siapa saja bisa **membaca**
angka unduhan (untuk ditampilkan di halaman), tapi **menulis** hanya boleh
menaikkan angka lewat transaction, bukan mengisi angka sembarangan:

```json
{
  "rules": {
    "app_stats": {
      "$appId": {
        "downloads": {
          ".read": true,
          ".write": true,
          ".validate": "newData.isNumber() && newData.val() >= 0 && (!data.exists() || newData.val() >= data.val())"
        }
      }
    }
  }
}
```

> Catatan: Realtime Database tidak punya cara built-in untuk memaksa
> "hanya boleh naik 1 per klik" — rule di atas hanya memastikan nilainya
> berupa angka dan tidak pernah berkurang. Kalau butuh proteksi lebih
> ketat (mis. mencegah orang menembak angka lewat REST API langsung),
> pindahkan proses increment ke **Cloud Function** dan kunci `.write`
> jadi `false` di sini. Untuk kebutuhan counter sederhana seperti ini,
> rule di atas biasanya sudah cukup.

Setelah ini beres, angka "Diunduh" di halaman akan otomatis terbaca saat
halaman dibuka, dan bertambah tiap kali ada yang menekan tombol
"Unduh APK".

> Kalau Anda tidak sempat setup Firebase, halaman tetap berjalan normal —
> angka "Diunduh" cuma akan menampilkan `0` sebagai fallback, dan tombol
> unduh tetap berfungsi seperti biasa.
