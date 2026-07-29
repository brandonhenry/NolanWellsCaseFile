(function () {
  'use strict';

  const data = window.NOLAN_EVIDENCE;
  const log = document.getElementById('event-log');
  const search = document.getElementById('timeline-search');
  const clear = document.getElementById('clear-search');
  const filters = [...document.querySelectorAll('[data-filter]')];
  const results = document.getElementById('results-status');
  const params = new URLSearchParams(window.location.search);
  const allowed = new Set(['all', ...Object.keys(data.types)]);
  let currentFilter = allowed.has(params.get('type')) ? params.get('type') : 'all';
  search.value = params.get('q') || '';

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function searchable(event) {
    return [event.date, event.dateLong, event.time, event.precision, event.title, event.summary, event.type, event.confidence, ...event.claims, ...event.sources.map(source => source.label)].join(' ').toLowerCase();
  }

  function updateUrl() {
    const next = new URLSearchParams();
    if (currentFilter !== 'all') next.set('type', currentFilter);
    if (search.value.trim()) next.set('q', search.value.trim());
    const url = `${window.location.pathname}${next.size ? `?${next}` : ''}`;
    try { window.history.replaceState(null, '', url); } catch (error) {}
  }

  function eventMarkup(event) {
    const type = data.types[event.type];
    const mediaLink = event.media ? `<a class="source-chip media-link" href="${escapeHtml(event.media.src)}" target="_blank" rel="noopener noreferrer">${event.media.type === 'video' ? 'Open media' : 'Open image'} <span class="sr-only">(opens in a new tab)</span></a>` : '';
    const sources = event.sources.map(source => `<a class="source-chip" href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} <span class="sr-only">(opens in a new tab)</span></a>`).join('');
    return `<article class="event${event.id === 'critical-overlap' ? ' critical' : ''}" id="${escapeHtml(event.id)}" style="--tone:${type.color}">
      <div class="event-time">${escapeHtml(event.time)}</div>
      <div class="event-body">
        <h3>${escapeHtml(event.title)}</h3>
        <p class="event-summary">${escapeHtml(event.summary)}</p>
        <div class="event-meta"><span class="type-chip">${escapeHtml(type.label)}</span><span class="confidence-chip">${escapeHtml(event.confidence)} confidence</span></div>
        <p class="precision"><strong>Time precision:</strong> ${escapeHtml(event.precision)}</p>
        <ul class="claims">${event.claims.map(claim => `<li>${escapeHtml(claim)}</li>`).join('')}</ul>
        <div class="source-row">${sources}${mediaLink}</div>
      </div>
    </article>`;
  }

  function render() {
    const query = search.value.trim().toLowerCase();
    const filtered = data.events.filter(event => (currentFilter === 'all' || event.type === currentFilter) && (!query || searchable(event).includes(query)));
    const sections = [];
    let currentDate = '';
    filtered.forEach(event => {
      if (event.date !== currentDate) {
        currentDate = event.date;
        sections.push({ date: event.date, dateLong: event.dateLong, events: [] });
      }
      sections[sections.length - 1].events.push(event);
    });
    log.innerHTML = filtered.length ? sections.map(section => `<section class="date-section" aria-labelledby="date-${escapeHtml(section.date.replace(/\s+/g, '-').toLowerCase())}"><div class="date-header"><h2 id="date-${escapeHtml(section.date.replace(/\s+/g, '-').toLowerCase())}">${escapeHtml(section.dateLong)}</h2></div>${section.events.map(eventMarkup).join('')}</section>`).join('') : '<p class="empty">No evidence entries match this search and filter.</p>';
    filters.forEach(button => {
      const active = button.dataset.filter === currentFilter;
      button.classList.toggle('active', active);
      button.setAttribute('aria-pressed', String(active));
    });
    clear.hidden = !query;
    results.textContent = filtered.length === data.events.length ? `Showing all ${data.events.length} entries` : `Showing ${filtered.length} of ${data.events.length} entries`;
    updateUrl();
  }

  filters.forEach(button => button.addEventListener('click', () => { currentFilter = button.dataset.filter; render(); }));
  search.addEventListener('input', render);
  clear.addEventListener('click', () => { search.value = ''; search.focus(); render(); });
  document.getElementById('verified-total').textContent = data.events.filter(event => event.type === 'verified').length;
  render();
})();
