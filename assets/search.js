(function () {
  'use strict';

  const evidence = window.NOLAN_EVIDENCE;
  const archive = window.NOLAN_ARCHIVE;
  const input = document.getElementById('archive-search');
  const clear = document.getElementById('search-clear');
  const status = document.getElementById('search-status');
  const results = document.getElementById('search-results');
  const params = new URLSearchParams(location.search);
  let index = [];

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function add(type, title, text, href, meta) {
    index.push({ type, title, text, href, meta, searchable: `${title} ${text} ${meta}`.toLowerCase() });
  }

  function buildStaticIndex() {
    add(
      'Case guide',
      'What happened to Nolan Wells?',
      'Plain-language sourced summary of the Horn Island trip on July 4, 2026, verified 9:56, 11:14, 4:31, 5:25, and 5:44 vessel GPS milestones, witness accounts, search, recovery, and the unresolved 3:45 to 4:31 PM window.',
      './case-summary.html',
      'Case summary · Last reviewed July 28, 2026'
    );
    add(
      'Editorial standards',
      'Methodology and corrections',
      'Evidence classifications, source hierarchy, independence statement, claim discipline, public revision history, machine-readable access, and documented correction process.',
      './about.html',
      'Methodology · Independence · Corrections'
    );
    evidence.events.forEach(event => add(
      'Timeline event',
      `${event.time} · ${event.title}`,
      [event.summary, ...event.claims, ...event.known, ...event.unknowns, ...event.needed, ...event.sourceViews.map(view => `${view.source}: ${view.position}`)].join(' '),
      `./event-timeline.html#${event.id}`,
      `${event.date} · ${evidence.types[event.type].label} · ${event.confidence} confidence`
    ));
    archive.documents.forEach(item => add('Document', item.title, `${item.summary} ${item.contents.join(' ')} ${item.missingCompanions.join(' ')}`, `./document.html?id=${encodeURIComponent(item.id)}`, `${item.kind} · ${item.status}`));
    archive.people.forEach(item => add('Person', item.name, `${item.role} ${item.summary} ${item.questions.join(' ')}`, `./person.html?id=${encodeURIComponent(item.id)}`, `${item.eventIds.length} linked events`));
    archive.boats.forEach(item => add('Boat', item.name, `${item.status} ${item.summary} ${item.passengers} ${item.evidence.join(' ')} ${item.questions.join(' ')}`, `./boat.html?id=${encodeURIComponent(item.id)}`, item.status));
    archive.questions.forEach(item => add('Question', item.question, `${item.evidence} ${item.needed}`, `./questions.html#question-${item.id}`, `Question ${item.id} · ${item.status}`));
    archive.contradictions.forEach(item => add('Contradiction record', item.narrative, `${item.supporting.join(' ')} ${item.contradicting.join(' ')} ${item.unknown.join(' ')}`, `./contradictions.html#${item.id}`, 'Supporting · contradicting · unknown'));
    archive.missingEvidence.forEach(item => add('Evidence tracker', item.item, `${item.status} ${item.public} ${item.request} ${item.priority}`, './evidence-tracker.html', `${item.priority} · ${item.status}`));
    archive.lastContacts.forEach(item => add('Last contact', item.witness, `${item.lastSeen} ${item.lastWords} ${item.time} ${item.heardBy}`, './last-contact.html', `${item.time} · ${item.confidence} confidence`));
    Object.entries(evidence.locations).forEach(([id, location]) => add('Coordinate', location.label, `${location.lat} ${location.lng}`, `./coordinates.html#coordinate-${id}`, `${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}`));
  }

  async function indexTranscripts() {
    await Promise.all(evidence.transcripts.map(async transcript => {
      try {
        const response = await fetch(transcript.href);
        if (!response.ok) return;
        const html = await response.text();
        const documentCopy = new DOMParser().parseFromString(html, 'text/html');
        documentCopy.querySelectorAll('.line').forEach((line, lineIndex) => {
          const time = line.querySelector('.ts')?.textContent.trim() || '';
          const speaker = line.querySelector('.sp')?.textContent.trim() || 'Speaker';
          const quote = line.querySelector('.txt')?.textContent.trim() || '';
          if (quote) add('Transcript quote', `${speaker} · ${time}`, quote, `${transcript.href}#quote-${lineIndex + 1}`, transcript.label);
        });
      } catch (error) {
        // A failed transcript fetch should not disable the rest of the static index.
      }
    }));
  }

  async function indexMasterNotes() {
    try {
      const href = './documents/master-investigation-notes.html';
      const response = await fetch(href);
      if (!response.ok) return;
      const html = await response.text();
      const documentCopy = new DOMParser().parseFromString(html, 'text/html');
      documentCopy.querySelectorAll('main section[id]').forEach(section => {
        const title = section.querySelector('h2')?.textContent.trim() || section.id;
        add('Master notes', title, section.textContent.replace(/\s+/g, ' ').trim(), `${href}#${section.id}`, 'Master Investigation Notes · Version 1.3');
      });
    } catch (error) {
      // Timeline and archive records remain searchable when the document fetch fails.
    }
  }

  function snippet(text, terms) {
    const normalized = text.replace(/\s+/g, ' ').trim();
    const lower = normalized.toLowerCase();
    const positions = terms.map(term => lower.indexOf(term)).filter(position => position >= 0);
    const start = positions.length ? Math.max(0, Math.min(...positions) - 72) : 0;
    const excerpt = normalized.slice(start, start + 230);
    return `${start ? '…' : ''}${excerpt}${start + 230 < normalized.length ? '…' : ''}`;
  }

  function updateUrl(query) {
    const next = new URLSearchParams();
    if (query) next.set('q', query);
    history.replaceState(null, '', `${location.pathname}${next.size ? `?${next}` : ''}`);
  }

  function render() {
    const query = input.value.trim();
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);
    clear.hidden = !query;
    updateUrl(query);
    if (!query) {
      status.textContent = `${index.length} records indexed`;
      results.innerHTML = '<div class="search-prompt"><strong>Search the full public evidence file.</strong><span>Try a person, quote, boat number, timestamp, coordinate, document, or unresolved question.</span></div>';
      return;
    }
    const matches = index
      .filter(item => terms.every(term => item.searchable.includes(term)))
      .map(item => ({ ...item, score: terms.reduce((score, term) => score + (item.title.toLowerCase().includes(term) ? 4 : 1), 0) }))
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 100);
    status.textContent = `${matches.length}${matches.length === 100 ? '+' : ''} results for “${query}”`;
    results.innerHTML = matches.length ? matches.map(item => `<article class="search-result"><div><span>${escapeHtml(item.type)}</span><small>${escapeHtml(item.meta)}</small></div><h2><a href="${escapeHtml(item.href)}">${escapeHtml(item.title)}</a></h2><p>${escapeHtml(snippet(item.text, terms))}</p></article>`).join('') : '<div class="search-prompt"><strong>No matching public records.</strong><span>Try fewer words or a broader term. Absence from search is not proof that a fact did not occur.</span></div>';
  }

  async function initialize() {
    buildStaticIndex();
    input.value = params.get('q') || '';
    status.textContent = 'Indexing transcripts and master notes…';
    render();
    await Promise.all([indexTranscripts(), indexMasterNotes()]);
    render();
  }

  input.addEventListener('input', render);
  clear.addEventListener('click', () => {
    input.value = '';
    input.focus();
    render();
  });

  initialize();
})();
