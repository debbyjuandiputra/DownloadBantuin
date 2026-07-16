// ==========================================================
// BANTUIN — firebase-config.js
// ==========================================================
// apiKey di bawah ini adalah kunci publik Firebase (bukan secret key),
// memang aman ditaruh di kode client-side seperti ini. Proteksi data
// sebenarnya diatur lewat Realtime Database Rules di Firebase Console,
// bukan dengan menyembunyikan key ini.
//
// Skrip ini pakai Firebase compat SDK (via CDN, lihat index.html) supaya
// tetap bisa jalan tanpa proses build/bundler, sama seperti sebelumnya.
// ==========================================================

const firebaseConfig = {
  apiKey: "AIzaSyBfkFbvwYF37sdpOi5ioeYibt0-skaQZDg",
  authDomain: "bantuin-88d4a.firebaseapp.com",
  databaseURL: "https://bantuin-88d4a-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "bantuin-88d4a",
  storageBucket: "bantuin-88d4a.firebasestorage.app",
  messagingSenderId: "1009775085314",
  appId: "1:1009775085314:web:87fe933fda33504ca1641b"
};

firebase.initializeApp(firebaseConfig);
const fbDb = firebase.database();
