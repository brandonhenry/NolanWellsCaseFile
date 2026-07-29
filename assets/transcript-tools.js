(function () {
  'use strict';

  document.querySelectorAll('.line').forEach((line, index) => {
    if (!line.id) line.id = `quote-${index + 1}`;
  });

  if (location.hash && /^#quote-\d+$/.test(location.hash)) {
    requestAnimationFrame(() => {
      const target = document.querySelector(location.hash);
      if (target) target.scrollIntoView({ block: 'center' });
    });
  }
})();
