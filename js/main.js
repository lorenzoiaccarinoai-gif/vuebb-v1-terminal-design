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
  const navBackdrop = document.getElementById('nav-backdrop');

  function setNavOpen(open) {
    if (!nav || !menuToggle) return;
    nav.classList.toggle('open', open);
    menuToggle.classList.toggle('active', open);
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    document.body.classList.toggle('nav-open', open);
    if (!document.body.classList.contains('cookie-lock')) {
      document.body.style.overflow = open ? 'hidden' : '';
    }
  }

  function closeNav() { setNavOpen(false); }
  window.closeVuebbNav = closeNav;

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      if (document.body.classList.contains('cookie-lock')) return;
      setNavOpen(!nav.classList.contains('open'));
    });

    nav.querySelectorAll('.nav-link, .btn').forEach((link) => {
      link.addEventListener('click', closeNav);
    });

    document.getElementById('nav-close')?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      closeNav();
    });
    navBackdrop?.addEventListener('click', closeNav);
    // Link cliccato con il menu aperto: prima il menu si chiude con la sua animazione (X compresa), poi si cambia pagina
    document.addEventListener('click', (e) => {
      const link = e.target.closest('a[href]');
      if (!link || !nav.classList.contains('open') || link.target === '_blank' || e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey) return;
      const url = new URL(link.href, location.href);
      if (url.origin !== location.origin) return;
      e.preventDefault();
      e.stopPropagation();
      closeNav();
      setTimeout(() => { location.href = url.href; }, 200);
    }, true);
    window.addEventListener('pageshow', () => { document.documentElement.classList.remove('nav-instant'); if (nav.classList.contains('open')) closeNav(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && nav.classList.contains('open')) { closeNav(); menuToggle.focus(); } });

    document.addEventListener('click', (e) => {
      if (
        nav.classList.contains('open') &&
        !nav.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeNav();
      }
    });
  }

  const portfolioTrigger = document.getElementById('portfolio-trigger');
  const portfolioPanel = document.getElementById('portfolio-panel');
  const shots = document.querySelectorAll('.shot');

  function revealShots() {
    shots.forEach((shot, i) => {
      shot.classList.add('reveal');
      shot.classList.remove('is-in', 'visible');
      shot.style.transitionDelay = `${i * 0.08}s`;
    });
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        shots.forEach((shot) => shot.classList.add('is-in', 'visible'));
      });
    });
  }

  if (portfolioTrigger && portfolioPanel) {
    portfolioTrigger.addEventListener('click', () => {
      const open = portfolioTrigger.classList.toggle('is-open');
      portfolioPanel.classList.toggle('is-open', open);
      portfolioPanel.hidden = !open;
      portfolioTrigger.setAttribute('aria-expanded', String(open));
      if (open) revealShots();
    });
  }

  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxFrame = document.getElementById('gallery-frame');
  const lightboxCaption = document.getElementById('gallery-caption');
  const lightboxClose = document.getElementById('gallery-close');
  const lightboxPrev = document.getElementById('gallery-prev');
  const lightboxNext = document.getElementById('gallery-next');
  const lightboxCounter = document.getElementById('gallery-counter');
  const shotList = Array.from(shots);
  let galleryIndex = 0;

  function renderGallery(index) {
    if (!lightbox || !lightboxFrame || !lightboxCaption) return;
    const shot = shotList[index];
    if (!shot) return;
    galleryIndex = index;
    const screen = shot.querySelector('.shot-screen');
    const browser = shot.querySelector('.browser');
    lightboxFrame.innerHTML = '';
    const phone = shot.classList.contains('shot-phone') || (screen && screen.classList.contains('shot-screen-phone'));
    lightbox.classList.toggle('is-phone', phone);
    if (browser) lightboxFrame.appendChild(browser.cloneNode(true));
    if (screen) {
      const clone = screen.cloneNode(true);
      clone.querySelectorAll('source, img').forEach((el) => {
        el.setAttribute('sizes', phone ? 'min(380px, 70vw)' : 'min(1280px, 92vw)');
      });
      clone.querySelector('img')?.setAttribute('decoding', 'async');
      lightboxFrame.appendChild(clone);
    }
    lightboxCaption.textContent = shot.dataset.caption || shot.querySelector('figcaption')?.textContent || '';
    if (lightboxCounter) {
      lightboxCounter.textContent = `${index + 1} / ${shotList.length}`;
    }
  }

  function openGallery(shot) {
    const index = shotList.indexOf(shot);
    if (index < 0) return;
    renderGallery(index);
    lightbox.hidden = false;
    requestAnimationFrame(() => lightbox.classList.add('is-open'));
    document.body.style.overflow = 'hidden';
    lightboxNext?.focus();
  }

  function closeGallery() {
    if (!lightbox) return;
    lightbox.classList.remove('is-open');
    if (!document.body.classList.contains('cookie-lock')) {
      document.body.style.overflow = '';
    }
    setTimeout(() => {
      if (!lightbox.classList.contains('is-open')) lightbox.hidden = true;
    }, 450);
  }

  function stepGallery(delta) {
    if (!lightbox?.classList.contains('is-open') || !shotList.length) return;
    const next = (galleryIndex + delta + shotList.length) % shotList.length;
    renderGallery(next);
  }

  shots.forEach((shot) => {
    shot.addEventListener('click', () => openGallery(shot));
    shot.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openGallery(shot);
      }
    });
  });

  lightboxClose?.addEventListener('click', closeGallery);
  lightboxPrev?.addEventListener('click', (e) => {
    e.stopPropagation();
    stepGallery(-1);
  });
  lightboxNext?.addEventListener('click', (e) => {
    e.stopPropagation();
    stepGallery(1);
  });
  lightbox?.addEventListener('click', (e) => {
    if (e.target === lightbox) closeGallery();
  });
  document.addEventListener('keydown', (e) => {
    if (!lightbox?.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeGallery();
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      stepGallery(-1);
    }
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      stepGallery(1);
    }
  });

  const GA_ID = 'G-66CWBWMK19';
  const CONSENT_KEY = 'tsm-cookie-consent';
  const CONSENT_MAX_AGE = 1000 * 60 * 60 * 24 * 180;
  const banner = document.getElementById('cookie-banner');

  function readConsent() {
    try {
      const raw = localStorage.getItem(CONSENT_KEY);
      if (!raw) return null;
      const data = JSON.parse(raw);
      if (!data || !data.choice || !data.at) return null;
      if (Date.now() - data.at > CONSENT_MAX_AGE) {
        localStorage.removeItem(CONSENT_KEY);
        return null;
      }
      return data.choice;
    } catch (err) {
      return null;
    }
  }

  function writeConsent(choice) {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ choice: choice, at: Date.now() }));
  }

  function loadGtag() {
    if (window.gtagLoaded) return;
    window.gtagLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(script);
    window.gtag('js', new Date());
    window.gtag('config', GA_ID, { anonymize_ip: true });
  }

  function clearAnalyticsCookies() {
    document.cookie.split(';').forEach((part) => {
      const name = part.split('=')[0].trim();
      if (!name) return;
      if (name === '_ga' || name.indexOf('_ga_') === 0 || name === '_gid' || name === '_gat') {
        document.cookie = name + '=; Path=/; Max-Age=0; SameSite=Lax';
      }
    });
  }

  function unlockScroll() {
    document.body.classList.remove('cookie-lock');
    document.body.style.overflow = '';
    document.documentElement.style.overflow = '';
  }

  function hideBanner() {
    if (banner) banner.hidden = true;
    unlockScroll();
  }

  function showBanner() {
    if (!banner) return;
    unlockScroll();
    banner.hidden = false;
  }

  function acceptCookies() {
    writeConsent('granted');
    hideBanner();
    loadGtag();
  }

  function rejectCookies() {
    writeConsent('denied');
    hideBanner();
    clearAnalyticsCookies();
  }

  document.getElementById('cookie-accept')?.addEventListener('click', acceptCookies);
  document.getElementById('cookie-reject')?.addEventListener('click', rejectCookies);
  document.getElementById('cookie-manage')?.addEventListener('click', (e) => {
    e.preventDefault();
    showBanner();
  });

  const savedConsent = readConsent();
  if (savedConsent === 'granted') {
    loadGtag();
  } else if (!savedConsent) {
    showBanner();
  }

  const scrollHoverSel = '.spec-card, .quote-card, .price-card, .product-card, .steps li, .contact-panel, .portfolio-trigger, .shot, .route-card';

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
    '.section-header, .spec-card, .product-card, .steps li, .quote-card, .price-card, .contact-panel, .portfolio-trigger, .route-card'
  );

  document.querySelectorAll('.product-card, .section-header, .spec-card, .quote-card, .price-card, .steps li, .contact-panel, .portfolio-trigger, .route-card').forEach((el) => {
    el.classList.add('reveal');
  });

  const groups = document.querySelectorAll('.spec-grid, .product-grid, .quote-grid, .price-grid, .steps, .portfolio-grid');
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
    heroContent?.classList.add('is-in');
  }

  startUncover();
  const vh = window.innerHeight || document.documentElement.clientHeight || 800;
  document.querySelectorAll('.reveal').forEach((el) => {
    if (el.getBoundingClientRect().top < vh) {
      el.style.transition = 'none';
      unveil(el);
    } else {
      revealObserver.observe(el);
    }
  });

  pickScrollHover();
  setTimeout(pickScrollHover, 500);
  setTimeout(pickScrollHover, 1400);

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
