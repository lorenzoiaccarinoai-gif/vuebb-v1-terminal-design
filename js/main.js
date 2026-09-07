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

  const scrollHoverSel = '.spec-card, .quote-card, .price-card, .product-card, .steps li, .contact-panel';

  function isMobileLayout() {
    return window.innerWidth <= 960;
  }

  let hovered = null;

  function setHover(el) {
    if (hovered === el) return;
    if (hovered) hovered.classList.remove('is-hover');
    if (el) el.classList.add('is-hover');
    hovered = el || null;
  }

  function pickScrollHover() {
    if (!isMobileLayout()) {
      if (hovered) setHover(null);
      return;
    }

    const vh = window.innerHeight || document.documentElement.clientHeight;
    const fx = (window.innerWidth || document.documentElement.clientWidth) / 2;
    const fy = vh * 0.5;
    let best = null;
    let bestDist = Infinity;

    document.querySelectorAll(scrollHoverSel).forEach((el) => {
      const r = el.getBoundingClientRect();
      if (r.height < 8) return;
      if (r.bottom < 80 || r.top > vh - 64) return;
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dist = Math.hypot((cx - fx) * 0.4, cy - fy);
      if (dist < bestDist) {
        bestDist = dist;
        best = el;
      }
    });

    setHover(best);
  }

  let hoverTick = false;
  function onScrollHover() {
    if (hoverTick) return;
    hoverTick = true;
    requestAnimationFrame(() => {
      pickScrollHover();
      hoverTick = false;
    });
  }

  window.addEventListener('scroll', onScrollHover, { passive: true });
  document.addEventListener('scroll', onScrollHover, { passive: true });
  window.addEventListener('touchmove', onScrollHover, { passive: true });
  window.addEventListener('resize', onScrollHover);

  const revealElements = document.querySelectorAll(
    '.section-header, .spec-card, .product-card, .steps li, .quote-card, .price-card, .contact-panel'
  );

  document.querySelectorAll('.product-card, .section-header, .spec-card, .quote-card, .price-card, .steps li, .contact-panel').forEach((el) => {
    el.classList.add('reveal');
  });

  const groups = document.querySelectorAll('.spec-grid, .product-grid, .quote-grid, .price-grid, .steps');
  groups.forEach((group) => {
    [...group.children].forEach((child, i) => {
      child.style.transitionDelay = `${i * 0.08}s`;
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
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12,
  });

  const cover = document.getElementById('page-cover');
  const heroContent = document.getElementById('hero-content');

  function startUncover() {
    if (document.body.classList.contains('is-ready')) return;
    cover?.classList.add('is-out');
    document.body.classList.add('is-ready');
    document.body.classList.remove('is-booting');
    setTimeout(() => heroContent?.classList.add('is-in'), 160);
  }

  if (reduced) {
    startUncover();
    document.querySelectorAll('.reveal').forEach(unveil);
  } else {
    window.addEventListener('load', () => setTimeout(startUncover, 700));
    setTimeout(startUncover, 2200);
    revealElements.forEach((el) => revealObserver.observe(el));
  }

  pickScrollHover();
  setTimeout(pickScrollHover, 500);
  setTimeout(pickScrollHover, 1400);

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
