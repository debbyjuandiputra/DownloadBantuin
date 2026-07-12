# Setup Supabase — Statistik Unduhan (halaman unduh)

Halaman unduh ini menampilkan angka "Diunduh" yang **beneran dihitung dari
klik tombol unduh**, bukan angka tetap. Ini memakai project Supabase yang
sama dengan aplikasi Bantuin (`js/supabase-config.js` sudah diisi dengan
URL & key yang sama seperti di project aplikasi utama).

Jalankan SQL berikut di **SQL Editor** Supabase (project yang sama):

```sql
-- Tabel penyimpan angka unduhan
create table if not exists public.app_stats (
  id text primary key,
  downloads bigint not null default 0
);

-- Baris awal untuk aplikasi Bantuin v1
insert into public.app_stats (id, downloads)
values ('bantuin_v1', 0)
on conflict (id) do nothing;

-- Izinkan siapa saja membaca angka unduhan (untuk ditampilkan di halaman)
alter table public.app_stats enable row level security;

create policy "Siapa saja boleh lihat statistik"
  on public.app_stats for select
  to anon
  using (true);

-- Fungsi penambah angka unduhan (dipanggil tiap tombol "Unduh APK" diklik).
-- Pakai fungsi (bukan update langsung dari client) supaya penambahannya
-- atomik dan tidak bisa diisi angka sembarangan dari luar.
create or replace function public.increment_downloads(row_id text)
returns bigint
language sql
security definer
set search_path = public
as $$
  update public.app_stats
  set downloads = downloads + 1
  where id = row_id
  returning downloads;
$$;

grant execute on function public.increment_downloads(text) to anon;
```

Setelah ini dijalankan, angka "Diunduh" di halaman akan otomatis terbaca
saat halaman dibuka, dan bertambah tiap kali ada yang menekan tombol
"Unduh APK".

> Kalau Anda tidak ingin fitur ini (misalnya belum sempat setup Supabase),
> halaman tetap berjalan normal — angka "Diunduh" cuma akan menampilkan
> `0` sebagai fallback, dan tombol unduh tetap berfungsi seperti biasa.
