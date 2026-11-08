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

  const BOOK_URL = 'https://calendar.google.com/calendar/appointments/schedules/AcZssZ34NtKx9wpTpUpEBwgfvwcQG2KDi4bOZApzVYQErB2D7M5inhF2rV_MMeUP55mwEplWqhvfihtz?gv=true&hl=it';
  const MAIL_TO = 'tecnologiasumisura.info@gmail.com';
  const WA_PHONE = '393334585718';
  const bookModal = document.getElementById('book-modal');
  const bookFrame = document.getElementById('book-frame');
  const bookClose = document.getElementById('book-close');
  let leadIntent = 'request';
  let leadTrigger = null;

  const leadModal = document.createElement('div');
  leadModal.className = 'book-modal lead-modal';
  leadModal.id = 'lead-modal';
  leadModal.hidden = true;
  leadModal.setAttribute('role', 'dialog');
  leadModal.setAttribute('aria-modal', 'true');
  leadModal.setAttribute('aria-labelledby', 'lead-title');
  leadModal.innerHTML = `
    <div class="book-modal-panel lead-panel">
      <div class="book-modal-head">
        <div class="book-modal-copy">
          <h2 id="lead-title" data-i18n="lead.title.request">Richiesta di contatto</h2>
          <p id="lead-intro" data-i18n="lead.intro.request">Compila e conferma. La richiesta arriva per e-mail, senza aprire la tua posta.</p>
        </div>
        <button class="gallery-close" id="lead-close" type="button" data-i18n-aria="lead.close" aria-label="Chiudi">×</button>
      </div>
      <form class="lead-form" id="lead-form" novalidate>
        <input class="lead-honey" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true">
        <label class="lead-field">
          <span data-i18n="lead.name">Nome e cognome</span>
          <input name="name" type="text" autocomplete="name" required minlength="3">
        </label>
        <fieldset class="lead-field">
          <legend data-i18n="lead.kind">Sei</legend>
          <div class="lead-choices">
            <label><input type="radio" name="kind" value="pro" required><span data-i18n="lead.kind.pro">Professionista</span></label>
            <label><input type="radio" name="kind" value="shop"><span data-i18n="lead.kind.shop">Attività commerciale</span></label>
            <label><input type="radio" name="kind" value="biz"><span data-i18n="lead.kind.biz">Azienda</span></label>
          </div>
        </fieldset>
        <label class="lead-field">
          <span data-i18n="lead.company">Nome attività / azienda</span>
          <input name="company" type="text" autocomplete="organization" disabled>
        </label>
        <label class="lead-field">
          <span data-i18n="lead.role">Ruolo in attività / azienda</span>
          <input name="role" type="text" autocomplete="organization-title" disabled>
        </label>
        <div class="lead-split">
          <label class="lead-field">
            <span data-i18n="lead.email">E-mail</span>
            <input name="email" type="email" autocomplete="email" required>
          </label>
          <label class="lead-field">
            <span data-i18n="lead.phone">Telefono</span>
            <input name="phone" type="tel" autocomplete="tel" required>
          </label>
        </div>
        <fieldset class="lead-field">
          <legend data-i18n="lead.service">Servizio</legend>
          <p class="lead-choice-heading" data-i18n="lead.service.full">Servizio completo</p>
          <p class="lead-choice-note" data-i18n="lead.service.full.note">Include ottimizzazione performance, posizionamento e verifica privacy</p>
          <div class="lead-choices lead-choices--stack">
            <label><input type="checkbox" name="service" value="create"><span data-i18n="lead.service.create">Creazione Sito Web</span><small class="lead-cadence" data-i18n="lead.cadence.once">Una tantum</small></label>
            <label><input type="checkbox" name="service" value="review"><span data-i18n="lead.service.review">Revisione Sito Web</span><small class="lead-cadence" data-i18n="lead.cadence.once">Una tantum</small></label>
            <label class="lead-choice--addon"><input type="checkbox" name="service" value="maintenance" disabled><span data-i18n="lead.service.maintenance.label">Vuebb Care (Consigliato)</span><small class="lead-cadence" data-i18n="lead.cadence.recurring">Ricorrente</small></label>
            <p class="lead-choice-note lead-choice-note--addon" data-i18n="lead.service.maintenance.desc">Il tuo sito resta sicuro e aggiornato, con controlli mensili di performance, posizionamento e privacy.</p>
          </div>
          <p class="lead-choice-heading"><span data-i18n="lead.service.single">Oppure scegli un singolo intervento</span> <small class="lead-cadence" data-i18n="lead.cadence.once">Una tantum</small></p>
          <div class="lead-choices lead-choices--stack">
            <label><input type="checkbox" name="service" value="performance"><span data-i18n="lead.service.performance">Ottimizzazione Performance</span><small class="lead-included" data-i18n="lead.service.included">Incluso</small></label>
            <label><input type="checkbox" name="service" value="seo"><span data-i18n="lead.service.seo">Posizionamento nei Risultati di Ricerca (SEO, AI, Locale)</span><small class="lead-included" data-i18n="lead.service.included">Incluso</small></label>
            <label><input type="checkbox" name="service" value="privacy"><span data-i18n="lead.service.privacy">Verifica Rispetto Leggi sulla Privacy</span><small class="lead-included" data-i18n="lead.service.included">Incluso</small></label>
          </div>
        </fieldset>
        <label class="lead-field">
          <span data-i18n="lead.project">Due righe sul progetto e i tuoi obiettivi</span>
          <textarea name="project" rows="3" required minlength="8"></textarea>
        </label>
        <p class="lead-privacy" data-i18n="lead.privacy">Inviando confermi di aver letto l’<a href="privacy-policy.html" target="_blank" rel="noopener">informativa privacy</a>.</p>
        <p class="lead-status" id="lead-status" role="status"></p>
        <div class="lead-actions">
          <button class="btn btn-lime" id="lead-submit" type="submit" data-i18n="lead.submit.request">Invia la richiesta</button>
        </div>
      </form>
    </div>`;
  document.body.appendChild(leadModal);

  function updateCompanyField(form) {
    const kind = form.querySelector('input[name="kind"]:checked');
    form.querySelectorAll('input[name="company"], input[name="role"]').forEach((field) => {
      field.disabled = !kind || !['shop', 'biz'].includes(kind.value);
      if (kind && kind.value === 'pro') field.value = '';
    });
  }
  document.addEventListener('change', (event) => {
    if (event.target.matches('.lead-form input[name="kind"]')) updateCompanyField(event.target.form);
  });
  document.addEventListener('reset', (event) => {
    if (event.target.matches('.lead-form')) setTimeout(() => updateCompanyField(event.target), 0);
  }, true);
  window.VuebbI18n?.apply();

  const leadForm = document.getElementById('lead-form');
  const leadClose = document.getElementById('lead-close');
  const leadTitle = document.getElementById('lead-title');
  const leadIntro = document.getElementById('lead-intro');
  const leadSubmit = document.getElementById('lead-submit');
  const leadStatus = document.getElementById('lead-status');

  function t(key) {
    return window.VuebbI18n ? window.VuebbI18n.t(key) : key;
  }

  function openBookModal() {
    if (!bookModal || document.body.classList.contains('cookie-lock')) return;
    if (nav && nav.classList.contains('open')) closeNav();
    if (bookFrame && !bookFrame.getAttribute('src')) {
      const lang = window.VuebbI18n ? window.VuebbI18n.lang() : 'it';
      bookFrame.src = BOOK_URL.replace('hl=it', 'hl=' + (lang === 'en' ? 'en' : 'it'));
    }
    bookModal.hidden = false;
    requestAnimationFrame(() => bookModal.classList.add('is-open'));
    document.body.classList.add('book-open');
    document.body.style.overflow = 'hidden';
    bookClose?.focus();
  }

  function closeBookModal() {
    if (!bookModal) return;
    bookModal.classList.remove('is-open');
    document.body.classList.remove('book-open');
    if (!document.body.classList.contains('cookie-lock') && !leadModal.classList.contains('is-open')) {
      document.body.style.overflow = '';
    }
    setTimeout(() => {
      if (!bookModal.classList.contains('is-open')) bookModal.hidden = true;
    }, 450);
  }

  function openLead(intent, trigger) {
    if (document.body.classList.contains('cookie-lock')) return;
    if (nav && nav.classList.contains('open')) closeNav();
    leadIntent = intent;
    leadTrigger = trigger || null;
    const titleKey = intent === 'call' ? 'lead.title.call' : intent === 'whatsapp' ? 'lead.title.wa' : 'lead.title.request';
    const introKey = intent === 'call' ? 'lead.intro.call' : intent === 'whatsapp' ? 'lead.intro.wa' : 'lead.intro.request';
    const submitKey = intent === 'call' ? 'lead.submit.call' : intent === 'whatsapp' ? 'lead.submit.wa' : 'lead.submit.request';
    leadTitle.setAttribute('data-i18n', titleKey);
    leadIntro.setAttribute('data-i18n', introKey);
    leadSubmit.setAttribute('data-i18n', submitKey);
    leadStatus.textContent = '';
    leadStatus.className = 'lead-status';
    leadSubmit.disabled = false;
    window.VuebbI18n?.apply();
    leadModal.hidden = false;
    requestAnimationFrame(() => leadModal.classList.add('is-open'));
    document.body.classList.add('book-open');
    document.body.style.overflow = 'hidden';
    leadForm.querySelector('[name="name"]')?.focus();
  }

  function closeLead() {
    leadModal.classList.remove('is-open');
    if (!bookModal?.classList.contains('is-open')) {
      document.body.classList.remove('book-open');
      if (!document.body.classList.contains('cookie-lock')) document.body.style.overflow = '';
    }
    setTimeout(() => {
      if (!leadModal.classList.contains('is-open')) leadModal.hidden = true;
    }, 450);
    leadTrigger?.focus();
  }

  function selectedLabel(name, map) {
    const value = new FormData(leadForm).get(name);
    return value && map[value] ? t(map[value]) : '';
  }

  function selectedLabels(name, map) {
    return new FormData(leadForm).getAll(name).map((value) => map[value] ? t(map[value]) + (['create', 'review'].includes(value) ? ' ' + t('lead.service.includes') : '') : '').filter(Boolean).join('; ');
  }

  function syncServiceValidity() {
    const boxes = Array.from(leadForm.querySelectorAll('input[name="service"]'));
    const anyChecked = boxes.some((box) => box.checked);
    boxes.forEach((box, index) => box.setCustomValidity(!anyChecked && index === 0 ? t('lead.err.service') : ''));
  }

  function leadPayload() {
    const data = new FormData(leadForm);
    const kind = selectedLabel('kind', { pro: 'lead.kind.pro', shop: 'lead.kind.shop', biz: 'lead.kind.biz' });
    const service = selectedLabels('service', { create: 'lead.service.create', review: 'lead.service.review', maintenance: 'lead.service.maintenance', performance: 'lead.service.performance', seo: 'lead.service.seo', privacy: 'lead.service.privacy' });
    return {
      name: String(data.get('name') || '').trim(),
      kind: kind,
      company: String(data.get('company') || '').trim(),
      role: String(data.get('role') || '').trim(),
      email: String(data.get('email') || '').trim(),
      phone: String(data.get('phone') || '').trim(),
      service: service,
      project: String(data.get('project') || '').trim(),
      honey: String(data.get('_honey') || '').trim()
    };
  }

  function whatsappText(info) {
    const lang = window.VuebbI18n ? window.VuebbI18n.lang() : 'it';
    if (lang === 'en') {
      return [
        'Hello Vuebb, I am ' + info.name + '.',
        'I am: ' + info.kind + '.',
        'Business or company: ' + (info.company || '—'),
        'Role: ' + (info.role || '—'),
        'Email: ' + info.email,
        'Phone: ' + info.phone,
        'Interested in: ' + info.service,
        'Project: ' + info.project
      ].join('\n');
    }
    return [
      'Ciao Vuebb, sono ' + info.name + '.',
      'Sono: ' + info.kind + '.',
      'Attività o azienda: ' + (info.company || '—'),
      'Ruolo: ' + (info.role || '—'),
      'E-mail: ' + info.email,
      'Telefono: ' + info.phone,
      'Interessato a: ' + info.service,
      'Progetto: ' + info.project
    ].join('\n');
  }

  async function sendLeadMail(info) {
    const channel = leadIntent === 'call' ? 'Call confermata' : 'Richiesta di contatto';
    const res = await fetch('https://formsubmit.co/ajax/' + MAIL_TO, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        _subject: 'Vuebb — ' + channel + ' — ' + info.name,
        _template: 'table',
        _captcha: 'false',
        _replyto: info.email,
        Nome: info.name,
        Tipo: info.kind,
        'Attività o azienda': info.company || '—',
        Ruolo: info.role || '—',
        Email: info.email,
        Telefono: info.phone,
        Servizio: info.service,
        Progetto: info.project,
        Canale: channel,
        Lingua: window.VuebbI18n ? window.VuebbI18n.lang().toUpperCase() : 'IT'
      })
    });
    if (!res.ok) throw new Error('mail');
    const json = await res.json().catch(() => ({}));
    if (json.success === false || json.success === 'false') throw new Error('mail');
  }

  document.querySelectorAll('[data-book-call]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLead('call', btn);
    });
  });

  document.querySelectorAll('[data-lead]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openLead(btn.getAttribute('data-lead') || 'request', btn);
    });
  });

  function syncIncludedServices(form) {
    const pick = (value) => form.querySelector('input[name="service"][value="' + value + '"]');
    const full = ['create', 'review'].some((value) => pick(value)?.checked);
    const maintenance = pick('maintenance');
    if (maintenance) { maintenance.disabled = !full; if (!full) maintenance.checked = false; }
    ['performance', 'seo', 'privacy'].forEach((value) => {
      const box = pick(value);
      if (!box) return;
      if (full) { box.checked = true; box.disabled = true; }
      else if (box.disabled) { box.checked = false; box.disabled = false; }
    });
  }

  document.addEventListener('change', (e) => {
    const box = e.target;
    if (box.name !== 'service' || !box.form) return;
    if (box.checked && (box.value === 'create' || box.value === 'review')) {
      const other = box.form.querySelector('input[name="service"][value="' + (box.value === 'create' ? 'review' : 'create') + '"]');
      if (other) other.checked = false;
    }
    syncIncludedServices(box.form);
  });
  document.addEventListener('reset', (e) => { setTimeout(() => syncIncludedServices(e.target), 0); });

  leadForm.addEventListener('change', (e) => { if (e.target.name === 'service') syncServiceValidity(); });
  leadForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const info = leadPayload();
    if (info.honey) return;
    syncServiceValidity();
    if (!leadForm.checkValidity() || !info.kind || !info.service) {
      leadStatus.textContent = t('lead.err.fields');
      leadStatus.className = 'lead-status is-err';
      leadForm.reportValidity();
      return;
    }
    if (leadIntent === 'whatsapp') {
      const url = 'https://wa.me/' + WA_PHONE + '?text=' + encodeURIComponent(whatsappText(info));
      window.open(url, '_blank', 'noopener');
      closeLead();
      return;
    }
    leadSubmit.disabled = true;
    leadStatus.textContent = t('lead.sending');
    leadStatus.className = 'lead-status';
    try {
      await sendLeadMail(info);
      if (leadIntent === 'call') {
        closeLead();
        openBookModal();
      } else {
        leadStatus.textContent = t('lead.ok');
        leadStatus.className = 'lead-status is-ok';
        leadForm.reset();
        leadSubmit.disabled = false;
      }
    } catch (err) {
      leadSubmit.disabled = false;
      leadStatus.textContent = t('lead.err');
      leadStatus.className = 'lead-status is-err';
    }
  });

  leadClose?.addEventListener('click', closeLead);
  leadModal.addEventListener('click', (e) => {
    if (e.target === leadModal) closeLead();
  });

  bookClose?.addEventListener('click', closeBookModal);
  bookModal?.addEventListener('click', (e) => {
    if (e.target === bookModal) closeBookModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (leadModal.classList.contains('is-open')) closeLead();
    else if (bookModal?.classList.contains('is-open')) closeBookModal();
  });

  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

})();
