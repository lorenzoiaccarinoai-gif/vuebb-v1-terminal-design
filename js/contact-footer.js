(function () {
  'use strict';
  const form = document.getElementById('footer-lead-form');
  if (!form) return;
  const status = document.getElementById('footer-lead-status');
  const submit = document.getElementById('footer-lead-submit');
  const t = (key) => window.VuebbI18n ? window.VuebbI18n.t(key) : key;
  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const data = new FormData(form);
    if (data.get('_honey')) return;
    if (!form.checkValidity()) {
      status.textContent = t('lead.err.fields');
      status.className = 'lead-status is-err';
      form.reportValidity();
      return;
    }
    const kind = { pro: 'lead.kind.pro', shop: 'lead.kind.shop', biz: 'lead.kind.biz' };
    const service = { web: 'lead.service.web', app: 'lead.service.app', ecom: 'lead.service.ecom' };
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
          Email: String(data.get('email')).trim(), Telefono: String(data.get('phone')).trim(),
          Servizio: t(service[data.get('service')]), Progetto: String(data.get('project')).trim(),
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
