/**
 * TSM — Tecnologia su Misura
 * Main interaction script
 */

(function () {
  'use strict';

  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  const menuToggle = document.getElementById('menu-toggle');
  const nav = document.getElementById('nav');

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

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

  const revealElements = document.querySelectorAll(
    '.section-header, .spec-card, .product-card, .steps li, .quote-card, .price-card, .contact-panel'
  );

  function wrapTitleLines(el) {
    if (el.querySelector('.cover-line')) return;
    const parts = el.innerHTML.split(/<br\s*\/?>/i);
    el.innerHTML = parts
      .map((part) => `<span class="cover-line"><span>${part.trim()}</span></span>`)
      .join('');
  }

  document.querySelectorAll('.section-title').forEach(wrapTitleLines);
  document.querySelectorAll('.section-desc, .section-label').forEach((el) => {
    if (el.querySelector('.cover-line')) return;
    el.innerHTML = `<span class="cover-line"><span>${el.innerHTML}</span></span>`;
  });

  document.querySelectorAll('.spec-card, .quote-card, .price-card, .steps li, .contact-panel').forEach((el) => {
    el.classList.add('cover-wipe');
  });

  document.querySelectorAll('.product-card, .section-header').forEach((el) => {
    el.classList.add('reveal');
  });

  const groups = document.querySelectorAll('.spec-grid, .product-grid, .quote-grid, .price-grid, .steps');
  groups.forEach((group) => {
    [...group.children].forEach((child, i) => {
      const delay = `${i * 0.12}s`;
      child.style.transitionDelay = delay;
      const vis = child.querySelector('.product-visual');
      if (vis) vis.style.transitionDelay = delay;
    });
  });

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function unveil(el) {
    el.classList.add('is-in', 'visible');
  }

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        unveil(entry.target);
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -10% 0px',
    threshold: 0.14,
  });

  if (reduced) {
    document.body.classList.remove('is-booting');
    document.body.classList.add('is-ready');
    document.getElementById('page-cover')?.classList.add('is-out');
    document.getElementById('hero-content')?.classList.add('is-in');
    document.querySelectorAll('.cover-wipe, .reveal, .section-header, .cover-line').forEach(unveil);
  } else {
    const cover = document.getElementById('page-cover');
    const heroContent = document.getElementById('hero-content');

    const startUncover = () => {
      if (document.body.classList.contains('is-ready')) return;
      cover?.classList.add('is-out');
      document.body.classList.add('is-ready');
      document.body.classList.remove('is-booting');
      setTimeout(() => heroContent?.classList.add('is-in'), 180);
    };

    window.addEventListener('load', () => {
      setTimeout(startUncover, 480);
    });
    setTimeout(startUncover, 2200);

    [...revealElements, ...document.querySelectorAll('.cover-wipe')].forEach((el) => {
      revealObserver.observe(el);
    });
  }

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

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
