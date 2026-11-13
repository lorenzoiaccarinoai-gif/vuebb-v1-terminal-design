(function () {
  'use strict';
  function syncIncludedServices(form) {
    const pick = (value) => form.querySelector('input[name="service"][value="' + value + '"]');
    const full = ['create', 'review'].some((value) => pick(value)?.checked);
    ['basic', 'maintenance', 'ultra'].forEach((value) => {
      const addon = pick(value);
      if (addon) { addon.disabled = !full; if (!full) addon.checked = false; }
    });
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
    if (box.checked && ['basic', 'maintenance', 'ultra'].includes(box.value)) {
      ['basic', 'maintenance', 'ultra'].filter((value) => value !== box.value).forEach((value) => {
        const other = box.form.querySelector('input[name="service"][value="' + value + '"]');
        if (other) other.checked = false;
      });
    }
    if (box.checked && (box.value === 'create' || box.value === 'review')) {
      const other = box.form.querySelector('input[name="service"][value="' + (box.value === 'create' ? 'review' : 'create') + '"]');
      if (other) other.checked = false;
    }
    syncIncludedServices(box.form);
  });
  document.addEventListener('reset', (e) => { setTimeout(() => syncIncludedServices(e.target), 0); });
  function syncBusinessFields(form) {
    const kind = form.querySelector('select[name="kind"]');
    const isBusiness = !!kind && !!kind.value && ['shop', 'biz'].includes(kind.value);
    const group = form.querySelector('.lead-business');
    if (group) group.hidden = !isBusiness;
    form.querySelectorAll('input[name="company"], input[name="role"]').forEach((field) => {
      field.disabled = !isBusiness;
      if (!isBusiness) field.value = '';
    });
  }
  document.addEventListener('change', (e) => {
    if (e.target.matches('.lead-form select[name="kind"]')) syncBusinessFields(e.target.form);
  });
  document.addEventListener('reset', (e) => {
    if (e.target.matches('.lead-form')) setTimeout(() => syncBusinessFields(e.target), 0);
  });
  const form = document.getElementById('footer-lead-form');
  if (!form) return;
  const status = document.getElementById('footer-lead-status');
  const submit = document.getElementById('footer-lead-submit');
  const t = (key) => window.VuebbI18n ? window.VuebbI18n.t(key) : key;
  const serviceBoxes = Array.from(form.querySelectorAll('input[name="service"]'));
  const syncServiceValidity = () => {
    const anyChecked = serviceBoxes.some((box) => box.checked);
    serviceBoxes.forEach((box, index) => box.setCustomValidity(!anyChecked && index === 0 ? t('lead.err.service') : ''));
  };
  form.addEventListener('change', (event) => { if (event.target.name === 'service') syncServiceValidity(); });
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('_honey')) return;
    syncServiceValidity();
    if (!form.checkValidity()) {
      status.textContent = t('lead.err.fields');
      status.className = 'lead-status is-err';
      form.reportValidity();
      return;
    }
    const kind = { pro: 'lead.kind.pro', shop: 'lead.kind.shop', biz: 'lead.kind.biz' };
    const service = { create: 'lead.service.create', review: 'lead.service.review', maintenance: 'lead.service.maintenance', basic: 'lead.service.basic', ultra: 'lead.service.ultra', performance: 'lead.service.performance', seo: 'lead.service.seo', privacy: 'lead.service.privacy' };
    submit.disabled = true;
    status.className = 'lead-status';
    status.textContent = t('lead.sending');
    try {
      const response = await fetch('https://formsubmit.co/ajax/tecnologiasumisura.info@gmail.com', {
        method: 'POST', headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          _subject: 'Vuebb — Richiesta di contatto — ' + String(data.get('name')).trim(),
          _template: 'table', _captcha: 'false', _replyto: String(data.get('email')).trim(),
          Nome: String(data.get('name')).trim(), Tipo: t(kind[data.get('kind')]),
          'Attività o azienda': String(data.get('company') || '').trim() || '—',
          Ruolo: String(data.get('role') || '').trim() || '—',
          Email: String(data.get('email')).trim(), Telefono: String(data.get('phone') || '').trim() || '—',
          Servizio: data.getAll('service').map((value) => t(service[value]) + (['create', 'review'].includes(value) ? ' ' + t('lead.service.includes') : '')).join('; '), Progetto: String(data.get('project') || '').trim() || '—', Domande: String(data.get('questions') || '').trim() || '—',
          Canale: 'Richiesta di contatto', Lingua: window.VuebbI18n ? window.VuebbI18n.lang().toUpperCase() : 'IT'
        })
      });
      if (!response.ok) throw new Error('mail');
      const result = await response.json().catch(() => ({}));
      if (result.success === false || result.success === 'false') throw new Error('mail');
      form.reset(); status.className = 'lead-status is-ok'; status.textContent = t('lead.ok');
    } catch (_) {
      status.className = 'lead-status is-err'; status.textContent = t('lead.err');
    } finally { submit.disabled = false; }
  });
})();
