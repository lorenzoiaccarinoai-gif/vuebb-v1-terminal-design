(function () {
  document.body.classList.add('is-ready');
  document.getElementById('hero-content')?.classList.add('is-in');

  const logo = document.querySelector('.logo-mark');
  if (!logo) return;

  function updateLogoFill() {
    const doc = document.documentElement;
    const max = Math.max(1, doc.scrollHeight - window.innerHeight);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    logo.style.setProperty('--logo-fill', (p * 100).toFixed(2) + '%');
  }

  window.addEventListener('scroll', updateLogoFill, { passive: true });
  window.addEventListener('resize', updateLogoFill);
  updateLogoFill();
})();
