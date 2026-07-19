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
})();