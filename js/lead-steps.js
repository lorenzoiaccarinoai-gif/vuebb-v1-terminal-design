(function () {
  'use strict';
  const form = document.getElementById('footer-lead-form');
  if (!form) return;
  const t = (k, fb) => { const v = window.VuebbI18n ? window.VuebbI18n.t(k) : ''; return v && v !== k ? v : fb; };
  const steps = Array.from(form.querySelectorAll('.lead-field'));
  if (!steps.length) return;
  form.classList.add('is-stepped');

  const progress = document.createElement('div');
  progress.className = 'lead-progress';
  progress.innerHTML = '<span class="lead-progress-bar"><i></i></span>';
  form.insertBefore(progress, form.firstChild.nextSibling);

  const nav = document.createElement('div');
  nav.className = 'lead-step-nav';
  nav.innerHTML = '<button type="button" class="lead-step-back" data-i18n="lead.back">' + t('lead.back', 'Indietro') + '</button>' +
    '<button type="button" class="btn btn-lime lead-step-next" data-i18n="lead.next">' + t('lead.next', 'Avanti') + '</button>' +
    '<span class="lead-step-hint" data-i18n="lead.enter">' + t('lead.enter', 'oppure premi Invio ↵') + '</span>';
  const actions = form.querySelector('.lead-actions');
  form.insertBefore(nav, actions);
  const back = nav.querySelector('.lead-step-back');
  const next = nav.querySelector('.lead-step-next');
  const status = form.querySelector('.lead-status');
  let current = 0;
  let interacted = false;

  const control = (step) => step.querySelector('.lead-select-btn') || step.querySelector('input, textarea, select');
  const field = (step) => step.querySelector('input, textarea, select');

  function show(i) {
    current = Math.max(0, Math.min(i, steps.length - 1));
    steps.forEach((s, n) => {
      s.classList.toggle('is-current', n === current);
      s.closest('.lead-split')?.classList.toggle('has-current', s.closest('.lead-split').contains(steps[current]));
    });
    const last = current === steps.length - 1;
    form.classList.toggle('is-last', last);
    back.hidden = current === 0;
    next.hidden = last;
    progress.querySelector('i').style.transform = 'scaleX(' + ((current + 1) / steps.length) + ')';
    if (status && !status.classList.contains('is-ok')) { status.textContent = ''; status.className = 'lead-status'; }
    if (interacted) control(steps[current])?.focus({ preventScroll: true });
  }
  function message(f) {
    const v = f.validity;
    if (f.tagName === 'SELECT') return t('lead.err.select', 'Scegli un' + "'" + 'opzione per continuare.');
    if (f.type === 'email' && !v.valueMissing) return t('lead.err.email', 'Inserisci un indirizzo e-mail valido.');
    if (f.name === 'name') return t('lead.err.name', 'Inserisci nome e cognome.');
    return t('lead.err.required', 'Questo campo è obbligatorio.');
  }
  function clearError(step) {
    step.classList.remove('is-invalid');
    const m = step.querySelector('.lead-field-error');
    if (m) m.remove();
    field(step)?.removeAttribute('aria-invalid');
  }
  function showError(step) {
    const f = field(step);
    clearError(step);
    const m = document.createElement('p');
    m.className = 'lead-field-error';
    m.id = 'err-' + (f.name || 'f');
    m.setAttribute('role', 'alert');
    m.textContent = message(f);
    step.appendChild(m);
    step.classList.add('is-invalid');
    f.setAttribute('aria-invalid', 'true');
    f.setAttribute('aria-describedby', m.id);
    control(step)?.focus({ preventScroll: true });
    step.classList.remove('is-shake'); void step.offsetWidth; step.classList.add('is-shake');
  }
  function valid(step) {
    const f = field(step);
    if (!f || f.checkValidity()) { clearError(step); return true; }
    showError(step);
    return false;
  }
  form.addEventListener('input', (e) => { const s = e.target.closest('.lead-field'); if (s && s.classList.contains('is-invalid') && e.target.checkValidity()) clearError(s); });
  form.addEventListener('change', (e) => { const s = e.target.closest('.lead-field'); if (s && s.classList.contains('is-invalid') && e.target.checkValidity()) clearError(s); });
  function go(dir) {
    interacted = true;
    if (dir > 0 && !valid(steps[current])) return;
    show(current + dir);
  }
  next.addEventListener('click', () => go(1));
  back.addEventListener('click', () => go(-1));
  form.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' || e.isComposing) return;
    const el = e.target;
    if (el.closest('.lead-select-list') || el.classList.contains('lead-select-btn')) return;
    if (el.tagName === 'TEXTAREA' && !(e.ctrlKey || e.metaKey)) return;
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
      if (current < steps.length - 1) { e.preventDefault(); go(1); }
    }
  });
  form.addEventListener('change', (e) => {
    if (e.target.tagName === 'SELECT' && steps[current].contains(e.target) && current < steps.length - 1) {
      setTimeout(() => go(1), 280);
    }
  });
  form.addEventListener('reset', () => setTimeout(() => show(0), 0));
  // Se l'invio fallisce la validazione, porta al primo campo non valido
  form.addEventListener('submit', (e) => {
    const bad = steps.findIndex((s) => { const f = field(s); return f && !f.checkValidity(); });
    if (bad < 0) return;
    e.preventDefault(); e.stopImmediatePropagation();
    interacted = true;
    if (bad !== current) show(bad);
    showError(steps[bad]);
  }, true);
  show(0);
})();
(function () {
  // I campi di testo libero crescono con il contenuto mantenendo la forma a capsula
  const grow = (ta) => { ta.style.height = 'auto'; ta.style.height = Math.max(58, ta.scrollHeight + 2) + 'px'; ta.style.overflow = ta.scrollHeight > 320 ? 'auto' : 'hidden'; };
  document.querySelectorAll('.lead-form textarea').forEach((ta) => {
    ta.rows = 1;
    ta.addEventListener('input', () => grow(ta));
    ta.form?.addEventListener('reset', () => setTimeout(() => grow(ta), 0));
  });
})();
