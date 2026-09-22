/* Caricato dopo main.js: sostituisce lo spy dell'header */
(function () {
  var header = document.getElementById('header');
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav .nav-link, .footer-links a[href^="#"]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('section[id]'));
  if (!navLinks.length || !sections.length) return;

  var pinned = '';
  var pinTimer = 0;

  function setActive(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute('href') || '';
      var match = id && (href === '#' + id);
      if (match) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  function currentId() {
    var headerH = header ? header.offsetHeight : 72;
    var spy = window.scrollY + headerH + 28;
    var doc = document.documentElement;
    if (window.innerHeight + window.scrollY >= doc.scrollHeight - 12) {
      return sections[sections.length - 1].id;
    }
    var current = sections[0].id;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].offsetTop <= spy) current = sections[i].id;
    }
    return current;
  }

  function highlight() {
    setActive(pinned || currentId());
  }

  navLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      var href = link.getAttribute('href') || '';
      if (href.charAt(0) !== '#') return;
      pinned = href.slice(1);
      setActive(pinned);
      clearTimeout(pinTimer);
      pinTimer = setTimeout(function () {
        pinned = '';
        highlight();
      }, 900);
    });
  });

  window.addEventListener('scroll', highlight, { passive: true });
  window.addEventListener('resize', highlight);
  highlight();
})();
