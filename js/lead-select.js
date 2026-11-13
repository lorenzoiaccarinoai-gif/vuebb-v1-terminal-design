(function () {
  'use strict';
  function enhance(select) {
    const wrap = document.createElement('div');
    wrap.className = 'lead-select';
    select.parentNode.insertBefore(wrap, select);
    wrap.appendChild(select);
    select.tabIndex = -1;
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'lead-select-btn';
    btn.setAttribute('aria-haspopup', 'listbox');
    btn.setAttribute('aria-expanded', 'false');
    const list = document.createElement('ul');
    list.className = 'lead-select-list';
    list.setAttribute('role', 'listbox');
    list.hidden = true;
    wrap.append(btn, list);

    const render = () => {
      const current = select.options[select.selectedIndex];
      btn.textContent = current ? current.textContent : '';
      btn.classList.toggle('is-placeholder', !select.value);
      list.innerHTML = '';
      Array.from(select.options).forEach((opt) => {
        if (opt.disabled) return;
        const li = document.createElement('li');
        li.setAttribute('role', 'option');
        li.tabIndex = -1;
        li.dataset.value = opt.value;
        li.textContent = opt.textContent;
        li.setAttribute('aria-selected', String(opt.selected && !!select.value));
        list.appendChild(li);
      });
    };
    const open = () => {
      document.querySelectorAll('.lead-select.is-open').forEach((w) => w !== wrap && w._close());
      list.hidden = false; wrap.classList.add('is-open'); btn.setAttribute('aria-expanded', 'true');
      (list.querySelector('[aria-selected="true"]') || list.firstElementChild)?.focus();
    };
    const close = (focusBtn) => {
      list.hidden = true; wrap.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false');
      if (focusBtn) btn.focus();
    };
    wrap._close = close;
    const choose = (value) => {
      select.value = value;
      select.dispatchEvent(new Event('change', { bubbles: true }));
      render(); close(true);
    };
    btn.addEventListener('click', (e) => { e.preventDefault(); list.hidden ? open() : close(); });
    btn.addEventListener('keydown', (e) => { if (e.key === 'ArrowDown' || e.key === 'ArrowUp') { e.preventDefault(); open(); } });
    list.addEventListener('click', (e) => { e.preventDefault(); const li = e.target.closest('li'); if (li) choose(li.dataset.value); });
    list.addEventListener('keydown', (e) => {
      const items = Array.from(list.children);
      const i = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); items[Math.min(i + 1, items.length - 1)]?.focus(); }
      else if (e.key === 'ArrowUp') { e.preventDefault(); items[Math.max(i - 1, 0)]?.focus(); }
      else if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (i >= 0) choose(items[i].dataset.value); }
      else if (e.key === 'Escape' || e.key === 'Tab') { close(e.key === 'Escape'); }
    });
    document.addEventListener('click', (e) => { if (!wrap.contains(e.target)) close(); });
    select.addEventListener('invalid', () => btn.focus());
    select.form?.addEventListener('reset', () => setTimeout(render, 0));
    new MutationObserver(render).observe(select, { subtree: true, childList: true, characterData: true });
    render();
  }
  const init = () => document.querySelectorAll('.lead-form .lead-field select').forEach(enhance);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
