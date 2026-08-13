/**
 * TSM — Tecnologia su Misura
 * Main interaction script
 */

(function () {
  'use strict';

  // ---------- Header scroll state ----------
  const header = document.getElementById('header');
  let lastScroll = 0;

  function updateHeader() {
    const current = window.scrollY;
    if (current > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = current;
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  // ---------- Mobile menu ----------
  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // ---------- Smooth reveal on scroll ----------
  const revealElements = document.querySelectorAll(
    '.section-header, .filosofia-text, .filosofia-quote, .servizio-card, .metodo-step, .perchi-card, .pricing-card, .contatti-info, .contatti-form'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
  });

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12,
  };

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach((el) => revealObserver.observe(el));

  // ---------- Contact form ----------
  const form = document.getElementById('contact-form');
  const successMsg = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous errors
      form.querySelectorAll('.form-group').forEach((g) => {
        g.classList.remove('has-error');
        const msg = g.querySelector('.error-msg');
        if (msg) msg.textContent = '';
      });

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();
      let valid = true;

      if (!name) {
        setError(form.name, 'Inserite il vostro nome');
        valid = false;
      }

      if (!email) {
        setError(form.email, 'Inserite un indirizzo email');
        valid = false;
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setError(form.email, 'Indirizzo email non valido');
        valid = false;
      }

      if (!message) {
        setError(form.message, 'Scrivete un breve messaggio');
        valid = false;
      } else if (message.length < 10) {
        setError(form.message, 'Messaggio troppo breve');
        valid = false;
      }

      if (!valid) return;

      // Simulate submission
      const btn = form.querySelector('button[type="submit"]');
      const btnText = btn.querySelector('.btn-text');
      const btnLoading = btn.querySelector('.btn-loading');

      btn.disabled = true;
      btnText.hidden = true;
      btnLoading.hidden = false;

      // Fake delay for UX
      setTimeout(() => {
        form.reset();
        btn.disabled = false;
        btnText.hidden = false;
        btnLoading.hidden = true;
        successMsg.hidden = false;

        // Hide success after a while
        setTimeout(() => {
          successMsg.hidden = true;
        }, 6000);
      }, 1100);
    });
  }

  function setError(input, message) {
    const group = input.closest('.form-group');
    group.classList.add('has-error');
    const msgEl = group.querySelector('.error-msg');
    if (msgEl) msgEl.textContent = message;
  }

  // ---------- Current year ----------
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- Active nav link on scroll ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function highlightNav() {
    const scrollPos = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
})();

