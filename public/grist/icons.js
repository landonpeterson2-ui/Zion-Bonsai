// Loaded on every Grist page (GRIST_INCLUDE_CUSTOM_SCRIPT_URL on the NUC) so that
// "Add to Home Screen" uses the Zion Bonsai logo instead of a screenshot.
(function () {
  var base = 'https://zionbonsai.com/grist/';
  function add(rel, file, sizes) {
    var l = document.createElement('link');
    l.rel = rel; l.href = base + file;
    if (sizes) l.sizes = sizes;
    document.head.appendChild(l);
  }
  document.querySelectorAll('link[rel~="icon"]').forEach(function (l) { l.remove(); });
  add('icon', 'icon-32.png', '32x32');
  add('icon', 'icon-192.png', '192x192');
  add('apple-touch-icon', 'icon-180.png', '180x180');
  var m = document.createElement('meta');
  m.name = 'apple-mobile-web-app-title'; m.content = 'Zion Bonsai';
  document.head.appendChild(m);
  // Phone-only page menu (acts only on the Zion Bonsai docs, on a phone-sized screen).
  var pm = document.createElement('script');
  pm.src = base + 'phone-menu.js';
  pm.async = true;
  document.head.appendChild(pm);
})();
