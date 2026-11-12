// Per chi: slider clienti verticale a giro continuo — 3 righe visibili, la centrale è attiva
document.querySelectorAll('.clients').forEach((box) => {
  const track = box.querySelector('.clients-track');
  const items = [...track.querySelectorAll('.client')];
  const [prev, next] = box.querySelectorAll('.clients-btn');
  const n = items.length;
  let idx = n >= 3 ? 1 : 0;

  const render = () => {
    const half = Math.floor(n / 2);
    items.forEach((it, i) => {
      const o = ((i - idx + n + half) % n) - half; // posizione relativa: -1 sopra, 0 centro, 1 sotto
      it.style.setProperty('--o', o);
      it.classList.toggle('is-active', o === 0);
      it.classList.toggle('is-hidden', Math.abs(o) > 1);
      it.setAttribute('aria-hidden', String(Math.abs(o) > 1));
      it.querySelectorAll('a').forEach((a) => (a.tabIndex = o === 0 ? 0 : -1));
    });
  };
  const move = (d) => { idx = (idx + d + n) % n; render(); };

  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  items.forEach((it, i) => it.addEventListener('click', (e) => {
    const o = Number(it.style.getPropertyValue('--o'));
    if (o !== 0) { e.preventDefault(); move(o); }
  }));
  track.addEventListener('keydown', (e) => {
    if (['ArrowDown', 'ArrowUp', 'ArrowRight', 'ArrowLeft'].includes(e.key)) { e.preventDefault(); move(e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1); }
  });

  // trascinamento (mouse) e swipe (touch): basta un gesto per passare al successivo/precedente
  let x0 = 0, y0 = 0, active = false, moved = false;
  track.addEventListener('pointerdown', (e) => { active = true; moved = false; x0 = e.clientX; y0 = e.clientY; });
  window.addEventListener('pointerup', (e) => {
    if (!active) return; active = false;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    const vertical = e.pointerType === 'mouse';
    const d = vertical ? dy : dx;
    if (Math.abs(d) > 40 && (vertical ? Math.abs(dy) > Math.abs(dx) : Math.abs(dx) > Math.abs(dy))) { moved = true; move(d < 0 ? 1 : -1); }
  });
  track.addEventListener('click', (e) => { if (moved) { e.preventDefault(); e.stopPropagation(); moved = false; } }, true);

  render();
});