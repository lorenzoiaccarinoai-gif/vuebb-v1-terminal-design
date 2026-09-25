/**
 * Vuebb — dense liquid field.
 * Press: viscous dent + lagging waves.
 * Hover: light meniscus.
 * Scroll: surface slosh.
 */
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('bg-press');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'bg-press';
    canvas.setAttribute('aria-hidden', 'true');
    var mesh = document.querySelector('.mesh');
    if (mesh && mesh.parentNode) mesh.parentNode.insertBefore(canvas, mesh.nextSibling);
    else document.body.insertBefore(canvas, document.body.firstChild);
  }

  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var ripples = [];
  var press = null;
  var hover = { x: 0, y: 0, tx: 0, ty: 0, on: false, lastEmit: 0 };
  var slosh = { amp: 0, phase: 0, dir: 1 };
  var lastScroll = window.scrollY || 0;
  var last = 0;
  var running = false;

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, force, kind) {
    var life = 1.1;
    if (kind === 'hover') life = 0.85;
    if (kind === 'release') life = 1.55;
    if (kind === 'scroll') life = 1.35;
    ripples.push({
      x: x,
      y: y,
      t: 0,
      life: life,
      force: Math.max(0.18, Math.min(force, 1.8)),
      kind: kind || 'tap',
      seed: Math.random() * Math.PI * 2
    });
    if (ripples.length > 28) ripples.splice(0, ripples.length - 28);
    start();
  }

  function point(e) {
    var x = e.clientX;
    var y = e.clientY;
    if (x == null && e.touches && e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    return { x: x, y: y };
  }

  function onDown(e) {
    if (e.button != null && e.button !== 0) return;
    var p = point(e);
    press = { x: p.x, y: p.y, at: performance.now(), force: 0.45 };
    spawn(p.x, p.y, 0.7, 'tap');
    spawn(p.x, p.y, 0.38, 'tap');
  }

  function onMove(e) {
    var p = point(e);
    hover.tx = p.x;
    hover.ty = p.y;
    hover.on = true;
    if (press) {
      press.x += (p.x - press.x) * 0.14;
      press.y += (p.y - press.y) * 0.14;
      return;
    }
    var now = performance.now();
    if (now - hover.lastEmit > 160) {
      hover.lastEmit = now;
      spawn(hover.x || p.x, hover.y || p.y, 0.22, 'hover');
    }
    start();
  }

  function onLeave() {
    hover.on = false;
  }

  function onUp() {
    if (!press) return;
    var held = Math.min((performance.now() - press.at) / 820, 1);
    spawn(press.x, press.y, 0.85 + held * 1.05, 'release');
    spawn(press.x + 10, press.y - 6, 0.42 + held * 0.3, 'release');
    press = null;
  }

  function onScroll() {
    var y = window.scrollY || 0;
    var dy = y - lastScroll;
    lastScroll = y;
    if (Math.abs(dy) < 1) return;
    slosh.dir = dy > 0 ? 1 : -1;
    slosh.amp = Math.min(1, slosh.amp + Math.min(Math.abs(dy) / 90, 0.35));
    if (Math.abs(dy) > 8) {
      spawn(
        window.innerWidth * (0.28 + Math.random() * 0.44),
        dy > 0 ? window.innerHeight * 0.78 : window.innerHeight * 0.18,
        0.28 + Math.min(Math.abs(dy) / 140, 0.35),
        'scroll'
      );
    }
    start();
  }

  function wavePath(x, y, radius, t, seed, wobble) {
    ctx.beginPath();
    var steps = 48;
    for (var i = 0; i <= steps; i++) {
      var a = (i / steps) * Math.PI * 2;
      var w = Math.sin(a * 5 + t * 3.2 + seed) * wobble + Math.sin(a * 3 - t * 2.1 + seed) * wobble * 0.45;
      var rr = radius + w;
      var px = x + Math.cos(a) * rr;
      var py = y + Math.sin(a) * rr * 0.86;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
  }

  function drawRipple(r) {
    var p = Math.min(r.t / r.life, 1);
    var ease = 1 - Math.pow(1 - p, 2.4);
    var fade = Math.pow(1 - p, 1.15);
    var slow = r.kind === 'hover' || r.kind === 'scroll';
    var maxR = slow ? 70 + r.force * 90 : 120 + r.force * 190;
    var radius = 16 + maxR * ease;
    var wobble = (slow ? 4 : 9) * r.force * (1 - p * 0.35);

    var g = ctx.createRadialGradient(r.x, r.y, radius * 0.08, r.x, r.y, radius);
    if (r.kind === 'hover') {
      g.addColorStop(0, 'rgba(46, 232, 228, ' + (0.05 * fade) + ')');
      g.addColorStop(0.55, 'rgba(179, 26, 120, ' + (0.06 * fade) + ')');
      g.addColorStop(1, 'rgba(18, 30, 138, 0)');
    } else {
      g.addColorStop(0, 'rgba(7, 6, 12, ' + (0.28 * fade * r.force) + ')');
      g.addColorStop(0.28, 'rgba(42, 8, 72, ' + (0.16 * fade) + ')');
      g.addColorStop(0.58, 'rgba(179, 26, 120, ' + (0.18 * fade) + ')');
      g.addColorStop(0.82, 'rgba(46, 232, 228, ' + (0.2 * fade) + ')');
      g.addColorStop(1, 'rgba(18, 30, 138, 0)');
    }
    ctx.fillStyle = g;
    wavePath(r.x, r.y, radius, r.t, r.seed, wobble);
    ctx.fill();

    ctx.lineWidth = (r.kind === 'hover' ? 1.1 : 2.4) + r.force * 0.8;
    ctx.strokeStyle = 'rgba(143, 247, 243, ' + ((r.kind === 'hover' ? 0.16 : 0.34) * fade) + ')';
    ctx.stroke();

    if (r.kind !== 'hover') {
      ctx.lineWidth = 1.2;
      ctx.strokeStyle = 'rgba(179, 26, 120, ' + (0.22 * fade) + ')';
      wavePath(r.x, r.y, radius * 0.62, r.t * 0.85, r.seed + 1.2, wobble * 0.7);
      ctx.stroke();
    }
  }

  function drawPress() {
    if (!press) return;
    var held = Math.min((performance.now() - press.at) / 900, 1);
    press.force = 0.4 + held * 1.05;
    var radius = 34 + held * 70;
    var g = ctx.createRadialGradient(press.x, press.y, 2, press.x, press.y, radius);
    g.addColorStop(0, 'rgba(5, 4, 10, 0.55)');
    g.addColorStop(0.38, 'rgba(179, 26, 120, 0.22)');
    g.addColorStop(0.72, 'rgba(46, 232, 228, 0.16)');
    g.addColorStop(1, 'rgba(46, 232, 228, 0)');
    ctx.fillStyle = g;
    wavePath(press.x, press.y, radius, held * 2.2, 0.4, 7 + held * 6);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = 'rgba(143, 247, 243, ' + (0.28 + held * 0.28) + ')';
    ctx.stroke();
  }

  function drawHover() {
    if (!hover.on || press) return;
    hover.x += (hover.tx - hover.x) * 0.09;
    hover.y += (hover.ty - hover.y) * 0.09;
    var g = ctx.createRadialGradient(hover.x, hover.y, 2, hover.x, hover.y, 46);
    g.addColorStop(0, 'rgba(46, 232, 228, 0.08)');
    g.addColorStop(0.55, 'rgba(179, 26, 120, 0.07)');
    g.addColorStop(1, 'rgba(18, 30, 138, 0)');
    ctx.fillStyle = g;
    wavePath(hover.x, hover.y, 38, performance.now() / 700, 0.2, 3.5);
    ctx.fill();
  }

  function drawSlosh() {
    if (slosh.amp < 0.01) return;
    var w = window.innerWidth;
    var h = window.innerHeight;
    slosh.phase += 0.018;
    var amp = slosh.amp * 26 * slosh.dir;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(w, 0);
    ctx.lineTo(w, h);
    ctx.lineTo(0, h);
    ctx.closePath();
    var band = ctx.createLinearGradient(0, h * 0.5 + amp, 0, h * 0.5 - amp * 2);
    band.addColorStop(0, 'rgba(46, 232, 228, 0)');
    band.addColorStop(0.48, 'rgba(46, 232, 228, ' + (0.045 * slosh.amp) + ')');
    band.addColorStop(0.62, 'rgba(179, 26, 120, ' + (0.05 * slosh.amp) + ')');
    band.addColorStop(1, 'rgba(18, 30, 138, 0)');
    ctx.fillStyle = band;
    ctx.fill();

    ctx.beginPath();
    var y0 = h * (slosh.dir > 0 ? 0.62 : 0.32);
    ctx.moveTo(0, y0);
    for (var x = 0; x <= w; x += 18) {
      var y = y0 + Math.sin(x * 0.012 + slosh.phase) * amp + Math.sin(x * 0.027 - slosh.phase * 1.3) * amp * 0.4;
      ctx.lineTo(x, y);
    }
    ctx.strokeStyle = 'rgba(143, 247, 243, ' + (0.12 * slosh.amp) + ')';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    slosh.amp *= Math.pow(0.92, dt * 60);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSlosh();
    drawHover();
    drawPress();
    for (var i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t >= ripples[i].life) ripples.splice(i, 1);
      else drawRipple(ripples[i]);
    }
    if (press || hover.on || ripples.length || slosh.amp > 0.012) {
      requestAnimationFrame(frame);
    } else {
      running = false;
      last = 0;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  function start() {
    if (running) return;
    running = true;
    last = 0;
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  window.addEventListener('pointerdown', onDown, { passive: true });
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp, { passive: true });
  window.addEventListener('pointercancel', onUp, { passive: true });
  window.addEventListener('pointerleave', onLeave, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });
  resize();
})();
