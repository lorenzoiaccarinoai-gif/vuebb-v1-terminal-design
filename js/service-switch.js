// Catalogo Servizi: switch between "Nuovo sito" and "Ho già un sito"
document.querySelectorAll('.service-switch').forEach((box) => {
  const tabs = [...box.querySelectorAll('[role="tab"]')];
  const select = (tab) => {
    const target = tab.dataset.target;
    box.dataset.active = target;
    tabs.forEach((t) => t.setAttribute('aria-selected', String(t === tab)));
    box.querySelectorAll('.switch-pane').forEach((p) => p.classList.toggle('is-active', p.dataset.pane === target));
  };
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      const next = tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
      next.focus(); select(next);
    });
  });
});
