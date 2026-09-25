/**
 * Vuebb — pressure field on the page background.
 * Click/tap dent + expanding rings. Does not steal clicks from UI.
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
    ripples.push({
      x: x,
      y: y,
      t: 0,
      life: kind === 'hold' ? 0.9 : 1.15,
      force: Math.max(0.35, Math.min(force, 1.6)),
      kind: kind || 'tap'
    });
    if (ripples.length > 18) ripples.splice(0, ripples.length - 18);
  }

  function onDown(e) {
    if (e.button != null && e.button !== 0) return;
    var x = e.clientX;
    var y = e.clientY;
    if (x == null && e.touches && e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    press = { x: x, y: y, at: performance.now(), force: 0.4 };
    spawn(x, y, 0.55, 'tap');
    start();
  }

  function onMove(e) {
    if (!press) return;
    var x = e.clientX;
    var y = e.clientY;
    if (x == null && e.touches && e.touches[0]) {
      x = e.touches[0].clientX;
      y = e.touches[0].clientY;
    }
    press.x += (x - press.x) * 0.28;
    press.y += (y - press.y) * 0.28;
  }

  function onUp() {
    if (!press) return;
    var held = Math.min((performance.now() - press.at) / 700, 1);
    spawn(press.x, press.y, 0.7 + held * 0.9, 'release');
    press = null;
  }

  function drawRipple(r) {
    var p = Math.min(r.t / r.life, 1);
    var ease = 1 - Math.pow(1 - p, 3);
    var fade = Math.pow(1 - p, 1.35);
    var radius = (90 + r.force * 160) * ease + 18;
    var inner = radius * (r.kind === 'release' ? 0.38 : 0.55);

    var g = ctx.createRadialGradient(r.x, r.y, inner * 0.2, r.x, r.y, radius);
    g.addColorStop(0, 'rgba(11, 8, 20, ' + (0.22 * fade * r.force) + ')');
    g.addColorStop(0.42, 'rgba(179, 26, 120, ' + (0.16 * fade) + ')');
    g.addColorStop(0.72, 'rgba(46, 232, 228, ' + (0.22 * fade) + ')');
    g.addColorStop(1, 'rgba(18, 30, 138, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(r.x, r.y, radius, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(143, 247, 243, ' + (0.55 * fade) + ')';
    ctx.lineWidth = 1.4 + r.force;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(r.x, r.y, Math.max(8, radius * 0.62), 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(179, 26, 120, ' + (0.35 * fade) + ')';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  function drawPress() {
    if (!press) return;
    var held = Math.min((performance.now() - press.at) / 640, 1);
    press.force = 0.35 + held * 0.9;
    var radius = 26 + held * 54;
    var g = ctx.createRadialGradient(press.x, press.y, 4, press.x, press.y, radius);
    g.addColorStop(0, 'rgba(7, 6, 12, 0.42)');
    g.addColorStop(0.45, 'rgba(179, 26, 120, 0.2)');
    g.addColorStop(1, 'rgba(46, 232, 228, 0)');
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(press.x, press.y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(press.x, press.y, radius * 0.72, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(46, 232, 228, ' + (0.35 + held * 0.35) + ')';
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }

  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawPress();
    for (var i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t >= ripples[i].life) ripples.splice(i, 1);
      else drawRipple(ripples[i]);
    }
    if (press || ripples.length) {
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
  resize();
})();
