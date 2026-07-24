(function () {
  const root = document.documentElement;
  const toggleBtn = document.getElementById('themeToggle');
  const knobIcon = document.getElementById('themeIcon');

  const sunIcon = '☀️';
  const moonIcon = '🌙';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      if (knobIcon) knobIcon.textContent = moonIcon;
    } else {
      root.removeAttribute('data-theme');
      if (knobIcon) knobIcon.textContent = sunIcon;
    }
  }

  const saved = localStorage.getItem('bantuin-theme');
  applyTheme(saved === 'dark' ? 'dark' : 'light');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', function () {
      const isDark = root.getAttribute('data-theme') === 'dark';
      const next = isDark ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('bantuin-theme', next);
    });
  }

  // ---- Fitur: tampilkan sebagian di layar sempit, dengan tombol "Lihat Semua" ----
  const featureGrid = document.getElementById('featureGrid');
  const featureToggleBtn = document.getElementById('featureToggleBtn');
  const featureToggleLabel = document.getElementById('featureToggleLabel');
  const mobileQuery = window.matchMedia('(max-width:520px)');
  let userExpanded = false; // supaya pilihan user (buka/tutup) diingat sampai resize besar

  function syncFeatureGrid() {
    if (!featureGrid || !featureToggleBtn) return;
    if (mobileQuery.matches) {
      const collapsed = !userExpanded;
      featureGrid.classList.toggle('collapsed', collapsed);
      featureToggleBtn.classList.toggle('expanded', !collapsed);
      featureToggleLabel.textContent = collapsed ? 'Lihat Semua Fitur' : 'Sembunyikan';
    } else {
      // Desktop/tablet: grid selalu ditampilkan penuh, tombol tidak dipakai
      featureGrid.classList.remove('collapsed');
    }
  }

  if (featureGrid && featureToggleBtn) {
    syncFeatureGrid();
    mobileQuery.addEventListener('change', syncFeatureGrid);

    featureToggleBtn.addEventListener('click', function () {
      userExpanded = !userExpanded;
      syncFeatureGrid();
      if (userExpanded) {
        featureGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
})();