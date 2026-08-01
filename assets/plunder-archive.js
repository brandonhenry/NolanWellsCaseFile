(function () {
  'use strict';

  document.querySelectorAll('details.review-panel').forEach(panel => {
    const summary = panel.querySelector('summary');
    if (!summary) return;

    const syncState = () => summary.setAttribute('aria-expanded', String(panel.open));
    summary.setAttribute('role', 'button');
    summary.setAttribute('tabindex', '0');
    syncState();

    panel.addEventListener('toggle', syncState);
    summary.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      panel.open = !panel.open;
      syncState();
    });
  });
})();
