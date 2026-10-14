(function () {
  var header = document.getElementById('header');
  var links = Array.prototype.slice.call(
    document.querySelectorAll('a[href^="#"]')
  );
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  if (!links.length || !sections.length) return;

  var pinned = '';
  var pinTimer = 0;
  var scrolling = false;

  function headerH() {
    return header ? header.getBoundingClientRect().height : 76;
  }

  function anchorOf(section) {
    if (!section) return null;
    return section.querySelector('.section-label') ||
      section.querySelector('.section-header') ||
      section.querySelector('.hero-title') ||
      section;
  }

  function setActive(id) {
    document.querySelectorAll('.nav-link').forEach(function (link) {
      link.classList.remove('active');
      var href = link.getAttribute('href') || '';
      if (id && href === '#' + id) link.classList.add('active');
    });
  }

  function yFor(id) {
    var section = document.getElementById(id);
    var el = anchorOf(section);
    if (!el) return 0;
    var gap = id === 'contatti' ? 80 : 20;
    return Math.max(0, window.scrollY + el.getBoundingClientRect().top - headerH() - gap);
  }

  function goTop() {
    pinned = 'hero';
    setActive('');
    scrolling = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    clearTimeout(pinTimer);
    pinTimer = setTimeout(function () {
      scrolling = false;
      pinned = '';
      highlight();
    }, 1100);
  }

  function goTo(id) {
    if (!id) return;
    pinned = id;
    setActive(id);
    scrolling = true;
    window.scrollTo({ top: yFor(id), behavior: 'smooth' });
    clearTimeout(pinTimer);
    pinTimer = setTimeout(function () {
      scrolling = false;
      pinned = '';
      highlight();
    }, 1100);
  }

  function currentId() {
    if (window.scrollY < 24) return '';
    var line = headerH() + 80;
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 8) {
      return sections[sections.length - 1].id;
    }
    var current = sections[0].id;
    sections.forEach(function (section) {
      var el = anchorOf(section);
      if (!el) return;
      if (el.getBoundingClientRect().top <= line) current = section.id;
    });
    if (current === 'hero') return '';
    return current;
  }

  function highlight() {
    setActive(pinned === 'hero' ? '' : (pinned || currentId()));
  }

  function onClick(e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a || links.indexOf(a) === -1) return;
    var href = a.getAttribute('href') || '';
    var id = href.slice(1);
    e.preventDefault();
    e.stopPropagation();
    if (a.classList.contains('logo-link') || id === 'top') {
      if (history.replaceState) history.replaceState(null, '', location.pathname + location.search);
      goTop();
      return;
    }
    if (!id || !document.getElementById(id)) return;
    if (history.replaceState) history.replaceState(null, '', href);
    goTo(id);
    if (typeof window.closeVuebbNav === 'function') window.closeVuebbNav();
  }

  document.addEventListener('click', onClick, true);
  window.addEventListener('scroll', function () {
    if (!scrolling) highlight();
    else if (pinned === 'hero') setActive('');
    else setActive(pinned);
  }, { passive: true });
  window.addEventListener('resize', highlight);

  var hash = (location.hash || '').slice(1);
  if (hash === 'hero' || hash === 'top') {
    setTimeout(goTop, 50);
  } else if (hash && document.getElementById(hash)) {
    setTimeout(function () { goTo(hash); }, 50);
  } else {
    highlight();
  }
})();
