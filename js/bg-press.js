/**
 * Vuebb fluid field — WebGL stable-fluids (Stam) + 2D fallback.
 * Pointer splat, hover trail, scroll slosh.
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

  if (initWebgl(canvas)) return;
  initCanvas2d(canvas);

  function initWebgl(canvas) {
    var gl = canvas.getContext('webgl', { premultipliedAlpha: false, alpha: true, antialias: false });
    if (!gl) return false;

    var ext = gl.getExtension('OES_texture_half_float');
    var extLin = gl.getExtension('OES_texture_half_float_linear');
    var type = ext ? ext.HALF_FLOAT_OES : gl.UNSIGNED_BYTE;
    var filter = ext && extLin ? gl.LINEAR : gl.NEAREST;

    function sh(typeId, src) {
      var s = gl.createShader(typeId);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.warn('[Vuebb fluid]', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    }
    function prog(vs, fs) {
      var p = gl.createProgram();
      var a = sh(gl.VERTEX_SHADER, vs);
      var b = sh(gl.FRAGMENT_SHADER, fs);
      if (!a || !b) return null;
      gl.attachShader(p, a);
      gl.attachShader(p, b);
      gl.linkProgram(p);
      if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
        console.warn('[Vuebb fluid]', gl.getProgramInfoLog(p));
        return null;
      }
      var out = { p: p, u: {}, a: {} };
      var nu = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS);
      for (var i = 0; i < nu; i++) {
        var info = gl.getActiveUniform(p, i);
        out.u[info.name] = gl.getUniformLocation(p, info.name);
      }
      out.a.pos = gl.getAttribLocation(p, 'aPos');
      return out;
    }

    var VS = 'attribute vec2 aPos;varying vec2 vUv;void main(){vUv=aPos*0.5+0.5;gl_Position=vec4(aPos,0.0,1.0);}';
    var splatFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uTarget;uniform vec2 uPoint;uniform float uAspect,uRadius;uniform vec3 uColor;',
      'void main(){vec2 p=vUv-uPoint;p.x*=uAspect;float d=exp(-dot(p,p)/uRadius);vec3 base=texture2D(uTarget,vUv).xyz;gl_FragColor=vec4(base+uColor*d,1.0);}'
    ].join('');
    var advectFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uVel,uSrc;uniform vec2 uTexel;uniform float uDt,uDiss;',
      'void main(){vec2 vel=texture2D(uVel,vUv).xy;vec2 uv=vUv-uDt*vel*vec2(uTexel.y/uTexel.x,1.0);gl_FragColor=vec4(texture2D(uSrc,uv).xyz*uDiss,1.0);}'
    ].join('');
    var divFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uVel;uniform vec2 uTexel;',
      'void main(){float L=texture2D(uVel,vUv-vec2(uTexel.x,0.0)).x;float R=texture2D(uVel,vUv+vec2(uTexel.x,0.0)).x;',
      'float B=texture2D(uVel,vUv-vec2(0.0,uTexel.y)).y;float T=texture2D(uVel,vUv+vec2(0.0,uTexel.y)).y;',
      'gl_FragColor=vec4(0.5*((R-L)+(T-B)),0.0,0.0,1.0);}'
    ].join('');
    var pressFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uPress,uDiv;uniform vec2 uTexel;',
      'void main(){float L=texture2D(uPress,vUv-vec2(uTexel.x,0.0)).x;float R=texture2D(uPress,vUv+vec2(uTexel.x,0.0)).x;',
      'float B=texture2D(uPress,vUv-vec2(0.0,uTexel.y)).x;float T=texture2D(uPress,vUv+vec2(0.0,uTexel.y)).x;',
      'float d=texture2D(uDiv,vUv).x;gl_FragColor=vec4((L+R+B+T-d)*0.25,0.0,0.0,1.0);}'
    ].join('');
    var gradFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uPress,uVel;uniform vec2 uTexel;',
      'void main(){float L=texture2D(uPress,vUv-vec2(uTexel.x,0.0)).x;float R=texture2D(uPress,vUv+vec2(uTexel.x,0.0)).x;',
      'float B=texture2D(uPress,vUv-vec2(0.0,uTexel.y)).x;float T=texture2D(uPress,vUv+vec2(0.0,uTexel.y)).x;',
      'vec2 vel=texture2D(uVel,vUv).xy;vel-=vec2(R-L,T-B);gl_FragColor=vec4(vel,0.0,1.0);}'
    ].join('');
    var vortFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uVel;uniform vec2 uTexel;uniform float uCurl;',
      'void main(){float L=texture2D(uVel,vUv-vec2(uTexel.x,0.0)).y;float R=texture2D(uVel,vUv+vec2(uTexel.x,0.0)).y;',
      'float B=texture2D(uVel,vUv-vec2(0.0,uTexel.y)).x;float T=texture2D(uVel,vUv+vec2(0.0,uTexel.y)).x;',
      'float vort=R-L-T+B;vec2 force=uCurl*vec2(abs(T)-abs(B),abs(R)-abs(L));force/=length(force)+0.0001;force*=vort;',
      'vec2 vel=texture2D(uVel,vUv).xy;gl_FragColor=vec4(vel+force*uTexel.y,0.0,1.0);}'
    ].join('');
    var showFS = [
      'precision highp float;varying vec2 vUv;uniform sampler2D uDye;',
      'void main(){vec3 c=texture2D(uDye,vUv).xyz;float a=clamp(length(c)*1.35,0.0,0.72);gl_FragColor=vec4(c,a);}'
    ].join('');

    var P = {
      splat: prog(VS, splatFS),
      advect: prog(VS, advectFS),
      div: prog(VS, divFS),
      press: prog(VS, pressFS),
      grad: prog(VS, gradFS),
      vort: prog(VS, vortFS),
      show: prog(VS, showFS)
    };
    if (!P.splat || !P.advect || !P.div || !P.press || !P.grad || !P.show) {
      var fresh = canvas.cloneNode(false);
      fresh.id = 'bg-press';
      canvas.parentNode.replaceChild(fresh, canvas);
      return false;
    }

    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    function bindQuad(pr) {
      gl.useProgram(pr.p);
      gl.bindBuffer(gl.ARRAY_BUFFER, buf);
      gl.enableVertexAttribArray(pr.a.pos);
      gl.vertexAttribPointer(pr.a.pos, 2, gl.FLOAT, false, 0, 0);
    }
    function fboPair(w, h) {
      function one() {
        var tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, w, h, 0, gl.RGBA, type, null);
        var f = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, f);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
        return { tex: tex, fbo: f, w: w, h: h };
      }
      return { read: one(), write: one(), swap: function () { var t = this.read; this.read = this.write; this.write = t; } };
    }

    var simW = 160;
    var simH = 160;
    var dyeW = 256;
    var dyeH = 256;
    var vel, dye, div, pressure;
    var aspect = 1;
    var texel = [1 / simW, 1 / simH];

    function alloc() {
      vel = fboPair(simW, simH);
      dye = fboPair(dyeW, dyeH);
      div = fboPair(simW, simH);
      pressure = fboPair(simW, simH);
    }

    function blit(target) {
      if (target) {
        gl.viewport(0, 0, target.w, target.h);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    }

    function splat(x, y, dx, dy, color, radius, velAmp) {
      bindQuad(P.splat);
      gl.uniform1f(P.splat.u.uAspect, aspect);
      gl.uniform1f(P.splat.u.uRadius, radius);
      gl.uniform2f(P.splat.u.uPoint, x, y);
      gl.activeTexture(gl.TEXTURE0);
      gl.uniform1i(P.splat.u.uTarget, 0);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform3f(P.splat.u.uColor, dx * velAmp, dy * velAmp, 0);
      blit(vel.write);
      vel.swap();
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform3f(P.splat.u.uColor, color[0], color[1], color[2]);
      blit(dye.write);
      dye.swap();
    }

    function step() {
      bindQuad(P.advect);
      gl.uniform2f(P.advect.u.uTexel, texel[0], texel[1]);
      gl.uniform1f(P.advect.u.uDt, 0.018);
      gl.uniform1f(P.advect.u.uDiss, 0.992);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform1i(P.advect.u.uVel, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform1i(P.advect.u.uSrc, 1);
      blit(vel.write);
      vel.swap();

      if (P.vort) {
        bindQuad(P.vort);
        gl.uniform2f(P.vort.u.uTexel, texel[0], texel[1]);
        gl.uniform1f(P.vort.u.uCurl, 18);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
        gl.uniform1i(P.vort.u.uVel, 0);
        blit(vel.write);
        vel.swap();
      }

      bindQuad(P.div);
      gl.uniform2f(P.div.u.uTexel, texel[0], texel[1]);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform1i(P.div.u.uVel, 0);
      blit(div.write);
      div.swap();

      bindQuad(P.press);
      gl.uniform2f(P.press.u.uTexel, texel[0], texel[1]);
      for (var i = 0; i < 14; i++) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
        gl.uniform1i(P.press.u.uPress, 0);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, div.read.tex);
        gl.uniform1i(P.press.u.uDiv, 1);
        blit(pressure.write);
        pressure.swap();
      }

      bindQuad(P.grad);
      gl.uniform2f(P.grad.u.uTexel, texel[0], texel[1]);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read.tex);
      gl.uniform1i(P.grad.u.uPress, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform1i(P.grad.u.uVel, 1);
      blit(vel.write);
      vel.swap();

      bindQuad(P.advect);
      gl.uniform2f(P.advect.u.uTexel, 1 / dyeW, 1 / dyeH);
      gl.uniform1f(P.advect.u.uDt, 0.018);
      gl.uniform1f(P.advect.u.uDiss, 0.987);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, vel.read.tex);
      gl.uniform1i(P.advect.u.uVel, 0);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1i(P.advect.u.uSrc, 1);
      blit(dye.write);
      dye.swap();

      bindQuad(P.show);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, dye.read.tex);
      gl.uniform1i(P.show.u.uDye, 0);
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      blit(null);
      gl.disable(gl.BLEND);
    }

    var last = { x: 0.5, y: 0.5, has: false, down: false };
    var lastScroll = window.scrollY || 0;
    var MAG = [0.70, 0.10, 0.47];
    var CYA = [0.18, 0.91, 0.89];

    function uv(e) {
      return { x: e.clientX / window.innerWidth, y: 1 - e.clientY / window.innerHeight };
    }

    function onMove(e) {
      var p = uv(e);
      var dx = p.x - last.x;
      var dy = p.y - last.y;
      var speed = Math.sqrt(dx * dx + dy * dy);
      var col = last.down ? MAG : CYA;
      var amp = last.down ? 1400 : 280;
      var rad = last.down ? 0.0018 : 0.0007;
      var dyeAmp = last.down ? 0.55 : 0.12;
      if (last.has && speed > 0.0004) {
        splat(p.x, p.y, dx, dy, [col[0] * dyeAmp, col[1] * dyeAmp, col[2] * dyeAmp], rad, amp);
      } else if (!last.down) {
        splat(p.x, p.y, 0, 0.002, [CYA[0] * 0.06, CYA[1] * 0.06, CYA[2] * 0.06], 0.00045, 80);
      }
      last.x = p.x;
      last.y = p.y;
      last.has = true;
    }

    function onDown(e) {
      if (e.button != null && e.button !== 0) return;
      last.down = true;
      var p = uv(e);
      last.x = p.x;
      last.y = p.y;
      last.has = true;
      splat(p.x, p.y, 0, 0.02, MAG, 0.0032, 900);
    }
    function onUp() { last.down = false; }

    function onScroll() {
      var y = window.scrollY || 0;
      var dy = y - lastScroll;
      lastScroll = y;
      if (Math.abs(dy) < 2) return;
      var dir = dy > 0 ? -0.035 : 0.035;
      splat(0.5, dy > 0 ? 0.22 : 0.78, 0, dir, [CYA[0] * 0.16, CYA[1] * 0.16, MAG[2] * 0.12], 0.012, 420);
    }

    function resize() {
      var w = window.innerWidth;
      var h = window.innerHeight;
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      aspect = w / Math.max(h, 1);
      simH = 128;
      simW = Math.max(96, Math.round(simH * aspect));
      dyeH = 192;
      dyeW = Math.max(128, Math.round(dyeH * aspect));
      texel = [1 / simW, 1 / simH];
      alloc();
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    window.addEventListener('pointercancel', onUp, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    resize();
    function loop() { step(); requestAnimationFrame(loop); }
    requestAnimationFrame(loop);
    return true;
  }

  function initCanvas2d(canvas) {
    var s = document.createElement('script');
    s.src = 'js/bg-press-2d.js';
    document.head.appendChild(s);
  }
})();
