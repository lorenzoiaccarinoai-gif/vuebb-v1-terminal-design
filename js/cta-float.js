(function () {
  'use strict';
  // CTA flottante "Contattaci": sparisce quando un altro pulsante di contatto (fuori dall'header) è visibile
  let btn = document.querySelector('.cta-book-float');
  if (!btn) {
    btn = document.createElement('a');
    btn.className = 'btn btn-lime cta-book cta-book-float';
    btn.href = 'contatti.html';
    btn.setAttribute('data-i18n', 'nav.contatti');
    btn.textContent = (window.VuebbI18n && window.VuebbI18n.t('nav.contatti')) || 'Contattaci';
    document.body.appendChild(btn);
  }
  btn.classList.add('cta-float-on');
  const targets = Array.from(document.querySelectorAll('a[href*="contatti.html"].btn, .contact-end-form, #footer-lead-submit'))
    .filter((el) => el !== btn && !el.closest('.header, .nav, header'));
  if (!targets.length || !('IntersectionObserver' in window)) return;
  const visible = new Set();
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) visible.add(e.target); else visible.delete(e.target); });
    btn.classList.toggle('is-hidden', visible.size > 0);
  }, { threshold: 0.01 });
  targets.forEach((el) => io.observe(el));
})();
