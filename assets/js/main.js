// FILE: assets/js/main.js
// Minimal JS: mobile toggle, year injection, simple search demo, dynamic meta helper
(function(){
  // mobile nav toggles (simple)
  function toggleMobile(navId){
    var btn = document.getElementById(navId);
    if(!btn) return;
    btn.addEventListener('click', function(){
      var nav = document.querySelector('.jf-nav');
      if(!nav) return;
      nav.style.display = (nav.style.display === 'flex') ? 'none' : 'flex';
      nav.style.flexDirection = 'column';
      nav.style.gap = '12px';
      nav.style.background = 'var(--primary)';
      nav.style.padding = '12px';
      nav.style.position = 'absolute';
      nav.style.right = '16px';
      nav.style.top = '62px';
      nav.style.borderRadius = '6px';
      nav.style.zIndex = 2000;
    });
  }
  toggleMobile('mobile-toggle');
  toggleMobile('mobile-toggle-article');

  // set current year in footers
  var y = new Date().getFullYear();
  var el = document.getElementById('year');
  if(el) el.textContent = y;
  var el2 = document.getElementById('year-article');
  if(el2) el2.textContent = y;

  // basic search demo - client side filter placeholder (no backend)
  var searchForm = document.getElementById('search-form');
  if(searchForm){
    searchForm.addEventListener('submit', function(e){
      e.preventDefault();
      var q = (document.getElementById('search-input')||{}).value || '';
      if(!q) return;
      // For GitHub Pages demo, simply redirect to site search (if configured) or google site search
      var site = location.hostname;
      // fallback to Google site search
      window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(q + ' site:' + site);
    });
  }

  // Dynamic meta helper (optional): set meta title/description if data-* attributes present.
  // Usage: add <meta data-title="New Title" data-desc="New description"> to the page, or let server replace.
  (function dynamicMeta(){
    try {
      var metaTitle = document.querySelector('title[data-default]');
      if(metaTitle && metaTitle.dataset && metaTitle.dataset.title){
        document.title = metaTitle.dataset.title;
      }
    } catch(e){ /* noop */ }
  })();

})();
