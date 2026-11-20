// Phone-only page menu for the Zion Bonsai Grist docs.
// Loaded by icons.js (GRIST_INCLUDE_CUSTOM_SCRIPT_URL). On a phone, the left-panel page list
// shows only the pages below plus a "Show all pages" link. Computers are untouched.
(function () {
  try {
    // Doc ids this applies to: live, then the practice copy.
    var DOC_IDS = ['sMHSTmja714b8SLwqeWDcz', '97Xt6eYVbWFz18QJXkbEVL'];
    // Top-level page names (exact) that stay in the phone menu.
    var PHONE_PAGES = [
      'Start here', 'My work', 'Calendar', 'Workshop day', 'Gift card', 'Bookings',
      'Gift cards sold', 'Packing', 'Season at a glance', 'Workshop checklist', 'Boards',
      'Phone book', 'Trees coming back', 'Follow-ups', 'Feedback wall', 'Partners',
      'Agreements', 'Kit and supplies', 'Trees', 'Prep checklist', 'Sign-in sheet'
    ];
    var STORE_KEY = 'zb-phone-menu-show-all';

    // Grist DOM hooks (found by inspecting the page list). Grist re-renders the list, so we
    // re-apply on DOM changes. The "test-" classes are Grist's own stable test hooks
    // (used by its Selenium suite), unlike the hashed _grainNNN_ class names:
    //   .test-treeview-container     the page list root
    //   .test-treeview-itemContainer one page; a group's children are nested inside its
    //                                container, so nesting depth = indentation
    //   .test-docpage-label          the page name text
    var LIST = '.test-treeview-container';
    var ITEM = '.test-treeview-itemContainer';
    var LABEL = '.test-docpage-label';
    var HIDE = 'zb-pm-hide';
    var ROOT_ON = 'zb-pm-on';
    var LINK_ID = 'zb-pm-toggle';

    var mq = window.matchMedia ? window.matchMedia('(max-width: 767px)') : null;
    var applying = false;
    var queued = false;

    function inScope() {
      // Grist URLs carry the doc id, or its first 12 characters, as one path segment.
      var parts = location.pathname.split('/');
      for (var i = 0; i < parts.length; i++) {
        var s = parts[i];
        if (s.length < 10) continue;
        for (var j = 0; j < DOC_IDS.length; j++) {
          if (DOC_IDS[j].indexOf(s) === 0 || s.indexOf(DOC_IDS[j]) === 0) return true;
        }
      }
      return false;
    }
    function isPhone() { return !!(mq && mq.matches); }
    function showAll() {
      try { return localStorage.getItem(STORE_KEY) === '1'; } catch { return false; }
    }
    function setShowAll(v) {
      try { if (v) localStorage.setItem(STORE_KEY, '1'); else localStorage.removeItem(STORE_KEY); } catch {}
    }

    function addStyle() {
      if (document.getElementById('zb-pm-style')) return;
      var st = document.createElement('style');
      st.id = 'zb-pm-style';
      st.textContent =
        'html.' + ROOT_ON + ' .' + HIDE + '{display:none !important}' +
        '#' + LINK_ID + '{display:flex;align-items:center;min-height:44px;margin:4px 16px 8px;' +
        'padding:0 8px;font-size:13px;text-decoration:underline;cursor:pointer;opacity:.85;' +
        'color:inherit;background:none;border:0;font-family:inherit;text-align:left}' +
        '#' + LINK_ID + ':focus-visible{outline:2px solid currentColor;outline-offset:2px}';
      document.head.appendChild(st);
    }

    function labelOf(item) {
      var l = item.querySelector(LABEL); // first match is the item's own header, before any children
      return l ? (l.textContent || '').trim() : '';
    }

    function filterItems(list, on) {
      var items = list.querySelectorAll(ITEM);
      for (var i = 0; i < items.length; i++) {
        var it = items[i];
        var nested = !!(it.parentElement && it.parentElement.closest(ITEM));
        var hide = on && (nested || PHONE_PAGES.indexOf(labelOf(it)) === -1);
        if (hide) it.classList.add(HIDE); else it.classList.remove(HIDE);
      }
    }

    function ensureLink(list, active) {
      var link = document.getElementById(LINK_ID);
      var host = list.parentElement;
      if (!active || !host) { if (link && link.parentNode) link.parentNode.removeChild(link); return; }
      if (!link) {
        link = document.createElement('button');
        link.id = LINK_ID;
        link.type = 'button';
        link.addEventListener('click', function () {
          setShowAll(!showAll());
          apply();
        });
      }
      var txt = showAll() ? 'Phone pages only' : 'Show all pages';
      if (link.textContent !== txt) link.textContent = txt; // only when changed, or our own edit retriggers the observer
      // Keep it directly after the page list.
      if (link.previousSibling !== list || link.parentNode !== host) host.insertBefore(link, list.nextSibling);
    }

    function apply() {
      queued = false;
      if (applying) return;
      applying = true;
      try {
        var list = document.querySelector(LIST);
        var active = inScope() && isPhone();
        document.documentElement.classList.toggle(ROOT_ON, active);
        if (!list) { ensureLink(document.body, false); return; }
        addStyle();
        filterItems(list, active && !showAll());
        ensureLink(list, active);
      } catch {
      } finally {
        applying = false;
      }
    }

    function schedule() {
      if (queued || applying) return;
      queued = true;
      (window.requestAnimationFrame || setTimeout)(apply);
    }

    if (mq) {
      if (mq.addEventListener) mq.addEventListener('change', apply);
      else if (mq.addListener) mq.addListener(apply);
    }
    window.addEventListener('resize', schedule);
    new MutationObserver(function () { schedule(); }).observe(document.documentElement, { childList: true, subtree: true });
    apply();
  } catch {}
})();
