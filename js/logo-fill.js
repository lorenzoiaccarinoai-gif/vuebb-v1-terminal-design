(function () {
  document.body.classList.add('is-ready');
  document.getElementById('hero-content')?.classList.add('is-in');

  document.querySelectorAll('.logo-mark, .hero-title, .footer-mark').forEach((el) => {
    const text = (el.textContent || '').replace(/\.+$/, '').trim();
    if (text) el.textContent = text;
  });

  const logo = document.querySelector('.logo-mark');
  if (logo) {
    function updateLogoFill() {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const p = Math.min(1, Math.max(0, window.scrollY / max));
      logo.style.setProperty('--logo-fill', (p * 100).toFixed(2) + '%');
    }
    window.addEventListener('scroll', updateLogoFill, { passive: true });
    window.addEventListener('resize', updateLogoFill);
    updateLogoFill();
  }

  document.getElementById('cookie-manage')?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const banner = document.getElementById('cookie-banner');
    if (!banner) return;
    banner.hidden = false;
    document.body.classList.add('cookie-lock');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => banner.classList.add('is-open'));
  });

  const includeEl = document.querySelector('.price-include:not(.price-gdpr)');
  if (includeEl) {
    includeEl.textContent = 'Il canone include: manutenzione, hosting, informativa privacy e cookie.';
  }
  const extraEl = document.querySelector('.price-include.price-gdpr');
  if (extraEl) {
    extraEl.textContent = 'Extra da quotare: dominio proprietario, caselle email aziendali associate al dominio, produzione editoriale di contenuti ottimizzati SEO e AI, reportistica mensile sul traffico web, aggiornamenti successivi alla prima release ufficiale del sito web.';
  }

  if (!document.querySelector('script[src="js/nav-scroll.js"]')) {
    const s = document.createElement('script');
    s.src = 'js/nav-scroll.js';
    document.body.appendChild(s);
  }
})();
