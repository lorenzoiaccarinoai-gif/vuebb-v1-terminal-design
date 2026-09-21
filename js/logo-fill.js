(function () {
  document.body.classList.add('is-ready');
  document.getElementById('hero-content')?.classList.add('is-in');

  const logo = document.querySelector('.logo-mark');
  const footer = document.querySelector('.footer');
  const header = document.getElementById('header');
  if (!logo || !footer) return;

  function updateLogoFill() {
    const headerH = header ? header.offsetHeight : 76;
    const max = Math.max(1, footer.offsetTop - headerH);
    const p = Math.min(1, Math.max(0, window.scrollY / max));
    logo.style.setProperty('--logo-fill', (p * 100).toFixed(2) + '%');
  }

  window.addEventListener('scroll', updateLogoFill, { passive: true });
  window.addEventListener('resize', updateLogoFill);
  updateLogoFill();
})();
