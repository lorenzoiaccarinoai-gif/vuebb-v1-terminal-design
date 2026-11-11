// Per chi: hover/click a segment word to reveal its description
document.querySelectorAll('.who-manifesto').forEach((box) => {
  const words = [...box.querySelectorAll('.who-word')];
  const show = (k) => {
    box.dataset.active = k;
    words.forEach((w) => { const on = w.dataset.k === k; w.classList.toggle('is-active', on); w.setAttribute('aria-expanded', String(on)); });
    box.querySelectorAll('.who-detail').forEach((d) => d.classList.toggle('is-active', d.dataset.k === k));
  };
  words.forEach((w) => {
    w.addEventListener('mouseenter', () => show(w.dataset.k));
    w.addEventListener('focus', () => show(w.dataset.k));
    w.addEventListener('click', () => show(w.dataset.k));
  });
});