/* Theme toggle, shared by all four pages.
   The stored choice persists across navigation via localStorage['mb-theme'].
   The initial data-theme is set by a small blocking snippet in each page's
   <head> so there is no light flash before this file runs. */
(function () {
  var btn = document.querySelector('[data-theme-toggle]');
  var root = document.documentElement;
  var theme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';

  var SUN = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>';
  var MOON = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';

  function paint() {
    if (!btn) return;
    btn.innerHTML = theme === 'dark' ? SUN : MOON;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme');
  }

  paint();

  btn && btn.addEventListener('click', function () {
    theme = theme === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', theme);
    try { localStorage.setItem('mb-theme', theme); } catch (e) {}
    paint();
  });
})();
