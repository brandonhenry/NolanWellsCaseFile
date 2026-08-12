(function () {
  'use strict';

  const data = window.NOLAN_DISPATCH_AUDIO;
  const timeline = document.getElementById('dispatch-timeline');
  const template = document.getElementById('dispatch-card-template');
  const search = document.getElementById('dispatch-search');
  const date = document.getElementById('dispatch-date');
  const status = document.getElementById('dispatch-status');
  const results = document.getElementById('dispatch-results');
  const empty = document.getElementById('dispatch-empty');
  const pauseAll = document.getElementById('pause-all');
  const segmentCount = document.getElementById('segment-count');
  const sourceCount = document.getElementById('source-count');

  if (!data || !timeline || !template) return;

  const escapeForText = value => String(value ?? '');
  const formatOffset = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.floor(seconds % 60);
    return `+${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
  };
  const formatDuration = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remaining = Math.round(seconds % 60);
    return `${minutes ? `${minutes}m ` : ''}${remaining}s`;
  };

  function badge(label, className) {
    const span = document.createElement('span');
    span.className = `dispatch-badge ${className}`;
    span.textContent = label;
    return span;
  }

  function addSourceRow(list, term, description, code) {
    const dt = document.createElement('dt');
    dt.textContent = term;
    const dd = document.createElement('dd');
    if (code) {
      const element = document.createElement('code');
      element.textContent = description;
      dd.append(element);
    } else {
      dd.textContent = description;
    }
    list.append(dt, dd);
  }

  function renderCard(segment) {
    const card = template.content.firstElementChild.cloneNode(true);
    card.id = segment.id;
    card.dataset.date = segment.date;
    card.dataset.status = segment.reviewStatus;
    card.dataset.search = [segment.displayDate, segment.displayTime, segment.title, segment.category, segment.summary, segment.transcript, segment.supports, segment.unknowns, segment.sourceFile].join(' ').toLowerCase();

    const time = card.querySelector('.dispatch-time');
    time.dateTime = segment.datetime;
    time.textContent = segment.displayTime;
    card.querySelector('.dispatch-time-basis').textContent = `${segment.displayDate} · ${segment.timeBasisLabel || 'archive-derived · CDT'}`;
    card.querySelector('.dispatch-title').textContent = segment.title;
    card.querySelector('.dispatch-summary').textContent = segment.summary;

    const badges = card.querySelector('.dispatch-badges');
    badges.append(
      badge(segment.category, 'dispatch-badge--category'),
      badge(segment.reviewLabel, segment.reviewStatus === 'source-reviewed' ? 'dispatch-badge--reviewed' : segment.reviewStatus === 'context-linked' ? 'dispatch-badge--contextual' : 'dispatch-badge--open')
    );

    const player = card.querySelector('.dispatch-player');
    player.src = segment.audio;
    player.setAttribute('aria-label', `${segment.displayDate} at ${segment.displayTime}: ${segment.title}`);
    player.addEventListener('play', () => {
      document.querySelectorAll('.dispatch-player').forEach(other => {
        if (other !== player && !other.paused) other.pause();
      });
    });
    card.querySelector('.audio-note').textContent = `Review clip · ${formatDuration(segment.audioDuration)} · press play to listen. This clip will not start automatically.`;

    card.querySelector('.dispatch-transcript').textContent = segment.transcript;
    card.querySelector('.dispatch-supports').textContent = segment.supports;
    card.querySelector('.dispatch-unknowns').textContent = segment.unknowns;

    const source = card.querySelector('.dispatch-source');
    addSourceRow(source, 'Transcript confidence', segment.transcriptConfidence);
    addSourceRow(source, 'Timing basis', segment.timingBasis || data.archive.timingBasis);
    addSourceRow(source, segment.sourceFileLabel || 'Original archive file', segment.sourceFile, true);
    addSourceRow(source, 'Review clip source window', `${formatOffset(segment.sourceOffsetStart)}–${formatOffset(segment.sourceOffsetEnd)}`);
    addSourceRow(source, 'Relevant source offset', `${formatOffset(segment.relevantStart)}–${formatOffset(segment.relevantEnd)}`);
    addSourceRow(source, 'Original SHA-256', segment.sourceSha256, true);
    addSourceRow(source, 'Clip SHA-256', segment.clipSha256, true);

    const actions = card.querySelector('.dispatch-actions');
    segment.links.forEach(link => {
      const anchor = document.createElement('a');
      anchor.href = link.href;
      anchor.textContent = link.label;
      if (/^https?:/.test(link.href)) anchor.rel = 'noopener noreferrer';
      actions.append(anchor);
    });
    const download = document.createElement('a');
    download.href = segment.audio;
    download.download = '';
    download.textContent = 'Download review clip';
    actions.append(download);

    const details = card.querySelector('details');
    details.addEventListener('toggle', () => {
      card.classList.toggle('is-open', details.open);
    });
    return card;
  }

  data.segments.forEach(segment => timeline.append(renderCard(segment)));
  segmentCount.textContent = data.segments.length;
  sourceCount.textContent = `${data.archive.transcribedRecordingCount} / ${data.archive.sourceRecordingCount}`;

  function update() {
    const query = search.value.trim().toLowerCase();
    const selectedDate = date.value;
    const selectedStatus = status.value;
    let visible = 0;

    timeline.querySelectorAll('.dispatch-card').forEach(card => {
      const matchesQuery = !query || card.dataset.search.includes(query);
      const matchesDate = selectedDate === 'all' || card.dataset.date === selectedDate;
      const matchesStatus = selectedStatus === 'all' || card.dataset.status === selectedStatus;
      const show = matchesQuery && matchesDate && matchesStatus;
      card.hidden = !show;
      if (show) visible += 1;
    });

    results.textContent = `${visible} of ${data.segments.length} preserved segment${data.segments.length === 1 ? '' : 's'} shown`;
    empty.hidden = visible !== 0;

    const params = new URLSearchParams();
    if (query) params.set('q', search.value.trim());
    if (selectedDate !== 'all') params.set('date', selectedDate);
    if (selectedStatus !== 'all') params.set('status', selectedStatus);
    history.replaceState(null, '', `${location.pathname}${params.size ? `?${params}` : ''}${location.hash}`);
  }

  const params = new URLSearchParams(location.search);
  if (params.has('q')) search.value = params.get('q');
  if ([...date.options].some(option => option.value === params.get('date'))) date.value = params.get('date');
  if ([...status.options].some(option => option.value === params.get('status'))) status.value = params.get('status');
  [search, date, status].forEach(control => control.addEventListener('input', update));
  pauseAll.addEventListener('click', () => {
    document.querySelectorAll('.dispatch-player').forEach(player => player.pause());
    pauseAll.textContent = 'All audio paused';
    window.setTimeout(() => { pauseAll.textContent = 'Pause all audio'; }, 1600);
  });
  update();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Dispatch Audio Timeline · Nolan Wells',
    url: 'https://justicefornolanwells.com/dispatch-audio',
    about: 'Nolan Wells search-related public-safety radio traffic from July 4–6, 2026',
    isPartOf: { '@type': 'WebSite', name: 'Nolan Wells Evidence File', url: 'https://justicefornolanwells.com/' },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: data.segments.length,
      itemListElement: data.segments.map((segment, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'AudioObject',
          name: segment.title,
          description: segment.summary,
          contentUrl: new URL(segment.audio, location.href).href,
          duration: `PT${Math.round(segment.audioDuration)}S`,
          dateCreated: segment.datetime,
          transcript: segment.transcript
        }
      }))
    }
  };
  const schema = document.createElement('script');
  schema.type = 'application/ld+json';
  schema.textContent = JSON.stringify(structuredData);
  document.head.append(schema);
})();
