// ==========================================================
// BANTUIN — halaman unduh — main.js
// ==========================================================
const APK_PATH = 'https://github.com/USERNAME/REPO/releases/download/v1.0/Bantuin.apk';
const APK_NAME = 'Bantuin.apk';
const SHOT_COUNT = 10;
const STATS_ROW_ID = 'bantuin_v1'; // baris di tabel public.app_stats

// ---------------- Screenshot carousel (mockup ponsel) ----------------
const screen = document.getElementById('phoneScreen');
const dotsWrap = document.getElementById('phoneDots');
const galleryStrip = document.getElementById('galleryStrip');
let shots = [];
let activeShot = 0;
let carouselTimer = null;

function buildShots(){
  for(let i = 1; i <= SHOT_COUNT; i++){
    const src = `assets/screenshots/${i}.webp`;
    shots.push(src);

    const img = document.createElement('img');
    img.src = src;
    img.alt = `Tampilan aplikasi Bantuin ${i}`;
    if(i === 1) img.classList.add('active');
    screen.appendChild(img);

    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Tampilan ${i}`);
    if(i === 1) dot.classList.add('active');
    dot.onclick = () => setShot(i - 1, true);
    dotsWrap.appendChild(dot);

    const shotCard = document.createElement('div');
    shotCard.className = 'gallery-shot';
    const shotImg = document.createElement('img');
    shotImg.src = src;
    shotImg.alt = `Cuplikan aplikasi Bantuin ${i}`;
    shotImg.loading = 'lazy';
    shotCard.appendChild(shotImg);
    galleryStrip.appendChild(shotCard);
  }
}

function setShot(index, resetTimer){
  activeShot = index;
  [...screen.querySelectorAll('img')].forEach((img, i) => img.classList.toggle('active', i === index));
  [...dotsWrap.querySelectorAll('button')].forEach((dot, i) => dot.classList.toggle('active', i === index));
  if(resetTimer) restartCarousel();
}

function restartCarousel(){
  clearInterval(carouselTimer);
  carouselTimer = setInterval(() => {
    setShot((activeShot + 1) % shots.length, false);
  }, 3200);
}

buildShots();
restartCarousel();

// ---------------- Toggle OS (Android / iOS) ----------------
let selectedOS = 'android';

function selectOS(os){
  selectedOS = os;
  document.getElementById('osAndroid').classList.toggle('active', os === 'android');
  document.getElementById('osIos').classList.toggle('active', os === 'ios');
  document.getElementById('iosNote').classList.toggle('show', os === 'ios');

  const btn = document.getElementById('dlBtn');
  const specRow = document.getElementById('specRow');
  if(os === 'ios'){
    btn.disabled = true;
    btn.style.opacity = '.55';
    btn.style.cursor = 'not-allowed';
    btn.lastChild.textContent = ' Segera Hadir';
    specRow.style.opacity = '.5';
  } else {
    btn.disabled = false;
    btn.style.opacity = '';
    btn.style.cursor = '';
    btn.lastChild.textContent = ' Unduh APK';
    specRow.style.opacity = '';
  }
}

// ---------------- Riwayat (accordion) ----------------
function toggleChange(headEl){
  const item = headEl.closest('.change-item');
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.change-item.open').forEach(el => el.classList.remove('open'));
  if(!isOpen) item.classList.add('open');
}

// ---------------- Toast ----------------
let toastTimer = null;
function showToast(msg){
  const toast = document.getElementById('toast');
  document.getElementById('toastMsg').textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

// ---------------- Statistik unduhan (Supabase) ----------------
function formatCount(n){
  if(n >= 1000000) return (n / 1000000).toFixed(1).replace('.0', '') + 'jt';
  if(n >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'rb';
  return String(n);
}

async function loadDownloadCount(){
  const el = document.getElementById('specDownloads');
  try{
    const { data, error } = await sb
      .from('app_stats')
      .select('downloads')
      .eq('id', STATS_ROW_ID)
      .maybeSingle();
    if(error || !data){ el.textContent = '0'; return; }
    el.textContent = formatCount(data.downloads);
  }catch(err){
    el.textContent = '0';
  }
}

async function incrementDownloadCount(){
  try{
    const { data, error } = await sb.rpc('increment_downloads', { row_id: STATS_ROW_ID });
    if(!error && typeof data === 'number'){
      document.getElementById('specDownloads').textContent = formatCount(data);
    }
  }catch(err){
    // gagal diam-diam, tidak mengganggu proses unduh
  }
}

loadDownloadCount();

// ---------------- Unduh APK ----------------
function handleDownload(){
  if(selectedOS === 'ios'){
    showToast('Versi iOS belum tersedia');
    return;
  }
  const a = document.createElement('a');
  a.href = APK_PATH;
  a.download = APK_NAME;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

  showToast('Unduhan dimulai');
  incrementDownloadCount();
}
