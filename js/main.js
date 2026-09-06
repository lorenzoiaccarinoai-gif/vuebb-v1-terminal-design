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
    '.section-header, .filosofia-text, .filosofia-quote, .servizio-card, .metodo-step, .perchi-card, .pricing-card, .contatti-info'
  );

  revealElements.forEach((el) => {
    el.classList.add('reveal');
  });

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12,
  });

  revealElements.forEach((el) => revealObserver.observe(el));

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

  // ---------- Hero lava lamp ----------
  (function initLava() {
    const canvas = document.getElementById('lava-canvas');
    const wrap = canvas && canvas.parentElement;
    if (!canvas || !wrap) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let visible = true;
    let w = 0;
    let h = 0;
    let dpr = 1;
    let last = performance.now();

    const blobs = [
      { x: 0.24, y: 0.78, r: 0.17, vy: -0.022, amp: 0.045, freq: 0.31, phase: 0.4, pulse: 0.08, pf: 0.22, shade: [18, 18, 18], a: 0.88 },
      { x: 0.52, y: 0.64, r: 0.23, vy: -0.014, amp: 0.06, freq: 0.22, phase: 1.3, pulse: 0.06, pf: 0.17, shade: [36, 36, 36], a: 0.78 },
      { x: 0.74, y: 0.86, r: 0.14, vy: -0.028, amp: 0.05, freq: 0.38, phase: 2.1, pulse: 0.1, pf: 0.28, shade: [58, 58, 58], a: 0.7 },
      { x: 0.38, y: 0.32, r: 0.11, vy: -0.036, amp: 0.07, freq: 0.44, phase: 0.8, pulse: 0.12, pf: 0.33, shade: [10, 10, 10], a: 0.82 },
      { x: 0.66, y: 0.24, r: 0.19, vy: -0.018, amp: 0.055, freq: 0.26, phase: 2.6, pulse: 0.07, pf: 0.19, shade: [90, 90, 90], a: 0.55 },
      { x: 0.16, y: 0.46, r: 0.09, vy: -0.04, amp: 0.08, freq: 0.5, phase: 3.2, pulse: 0.14, pf: 0.4, shade: [26, 26, 26], a: 0.75 },
      { x: 0.84, y: 0.52, r: 0.13, vy: -0.024, amp: 0.065, freq: 0.29, phase: 1.7, pulse: 0.09, pf: 0.25, shade: [74, 74, 74], a: 0.62 },
      { x: 0.46, y: 0.92, r: 0.08, vy: -0.046, amp: 0.04, freq: 0.6, phase: 0.2, pulse: 0.16, pf: 0.48, shade: [12, 12, 12], a: 0.8 }
    ];

    function resize() {
      const rect = wrap.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0, true);
    }

    function draw(dt, freeze) {
      ctx.fillStyle = '#f7f7f5';
      ctx.fillRect(0, 0, w, h);
      const minSide = Math.min(w, h);

      blobs.forEach((b, i) => {
        if (!freeze && !reduced) {
          b.phase += dt * b.freq;
          b.y += b.vy * dt;
          b.x += Math.sin(b.phase) * b.amp * dt * 0.35;
          if (b.y < -0.22) b.y = 1.22;
          if (b.x < 0.08) b.x = 0.08;
          if (b.x > 0.92) b.x = 0.92;
        }

        const pulse = freeze || reduced ? 1 : 1 + Math.sin(b.phase * b.pf + i) * b.pulse;
        const radius = b.r * minSide * pulse;
        const x = b.x * w + Math.sin(b.phase) * b.amp * w;
        const y = b.y * h;
        ctx.fillStyle = `rgba(${b.shade[0]},${b.shade[1]},${b.shade[2]},${b.a})`;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    function loop(now) {
      if (!visible || reduced) {
        raf = 0;
        return;
      }
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      draw(dt, false);
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    if (!reduced) {
      const io = new IntersectionObserver((entries) => {
        visible = entries.some((e) => e.isIntersecting);
        if (visible && !raf) {
          last = performance.now();
          raf = requestAnimationFrame(loop);
        }
      }, { threshold: 0.05 });
      io.observe(wrap);
      raf = requestAnimationFrame(loop);
    }
  })();
})();
