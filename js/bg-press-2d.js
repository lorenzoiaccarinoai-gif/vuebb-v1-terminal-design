/**
 * Vuebb — ambient liquid fallback when WebGL is missing.
 * No pointer / scroll / hover interaction.
 */
(function () {
  'use strict';

  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('bg-press');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  if (!ctx) return;

  var dpr = Math.min(window.devicePixelRatio || 1, 2);
  var ripples = [];
  var t0 = performance.now();

  function resize() {
    var w = window.innerWidth;
    var h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function spawn(x, y, force) {
    ripples.push({ x: x, y: y, t: 0, life: 2.2, force: force, seed: Math.random() * 6.28 });
    if (ripples.length > 20) ripples.shift();
  }

  function wavePath(x, y, radius, t, seed, wobble) {
    ctx.beginPath();
    var steps = 42;
    for (var i = 0; i <= steps; i++) {
      var a = (i / steps) * Math.PI * 2;
      var w = Math.sin(a * 5 + t * 2.4 + seed) * wobble;
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
    var ease = 1 - Math.pow(1 - p, 2.2);
    var fade = Math.pow(1 - p, 1.1);
    var radius = 20 + (110 + r.force * 90) * ease;
    var g = ctx.createRadialGradient(r.x, r.y, radius * 0.1, r.x, r.y, radius);
    g.addColorStop(0, 'rgba(7, 6, 12, ' + (0.16 * fade) + ')');
    g.addColorStop(0.5, 'rgba(179, 26, 120, ' + (0.12 * fade) + ')');
    g.addColorStop(0.82, 'rgba(46, 232, 228, ' + (0.14 * fade) + ')');
    g.addColorStop(1, 'rgba(18, 30, 138, 0)');
    ctx.fillStyle = g;
    wavePath(r.x, r.y, radius, r.t, r.seed, 8 * (1 - p));
    ctx.fill();
    ctx.lineWidth = 1.6;
    ctx.strokeStyle = 'rgba(143, 247, 243, ' + (0.22 * fade) + ')';
    ctx.stroke();
  }

  var lastEmit = 0;
  var last = 0;

  function frame(now) {
    var dt = last ? Math.min((now - last) / 1000, 0.05) : 0.016;
    last = now;
    var t = (now - t0) / 1000;
    if (now - lastEmit > 420) {
      lastEmit = now;
      var w = window.innerWidth;
      var h = window.innerHeight;
      spawn(w * (0.22 + 0.18 * Math.sin(t * 0.23)), h * (0.32 + 0.16 * Math.cos(t * 0.17)), 0.7);
      spawn(w * (0.72 + 0.14 * Math.cos(t * 0.19)), h * (0.64 + 0.14 * Math.sin(t * 0.21)), 0.55);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = ripples.length - 1; i >= 0; i--) {
      ripples[i].t += dt;
      if (ripples[i].t >= ripples[i].life) ripples.splice(i, 1);
      else drawRipple(ripples[i]);
    }
    requestAnimationFrame(frame);
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();
  requestAnimationFrame(frame);
})();
