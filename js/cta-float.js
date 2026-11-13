(function () {
  'use strict';
  // CTA flottante "Contattaci" (solo mobile): nascosta all'istante quando un altro pulsante di contatto
  // fuori dall'header e a schermo; ricompare con dissolvenza quando non ce ne sono.
  let btn = document.querySelector('.cta-book-float');
  if (!btn) {
    btn = document.createElement('a');
    btn.className = 'btn btn-lime cta-book cta-book-float';
    btn.href = 'contatti.html';
    btn.setAttribute('data-i18n', 'nav.contatti');
    btn.textContent = (window.VuebbI18n && window.VuebbI18n.t('nav.contatti')) || 'Contattaci';
    document.body.appendChild(btn);
  }
  const targets = Array.from(document.querySelectorAll('a[href*="contatti"], .contact-end-form, #footer-lead-submit'))
    .filter((el) => el !== btn && !el.closest('.header, .nav, header'));
  const onScreen = (el) => {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.bottom > 0 && r.top < window.innerHeight;
  };
  // Stato iniziale calcolato subito, prima di mostrarla: niente comparsa-e-sparizione al caricamento
  btn.classList.add('is-hidden');
  btn.classList.add('cta-float-on');
  const update = () => btn.classList.toggle('is-hidden', targets.some(onScreen));
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => { ticking = false; update(); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  window.addEventListener('pageshow', update);
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(update, { threshold: 0 });
    targets.forEach((el) => io.observe(el));
  }
  update();
})();
