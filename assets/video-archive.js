(function () {
  'use strict';

  const archive = window.NOLAN_VIDEO_ARCHIVE;
  const editedRoot = document.getElementById('edited-reels');
  const clipsRoot = document.getElementById('preserved-clips');
  const programsRoot = document.getElementById('full-programs');
  const searchInput = document.getElementById('video-search');
  const filterButtons = [...document.querySelectorAll('[data-video-filter]')];
  const results = document.getElementById('video-results');
  const empty = document.getElementById('video-empty');
  let activeFilter = 'all';
  let activePlayer = null;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>'"]/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
  }

  function sourceLinks(items) {
    return items.map(item => `<a href="${escapeHtml(item.href)}"${/^https?:/.test(item.href) ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(item.label)}</a>`).join('');
  }

  function videoCard(item, group) {
    const featured = item.featured ? ' video-card--featured' : '';
    const captions = item.captions ? ` data-video-captions="${escapeHtml(item.captions)}"` : '';
    const typeLabel = item.typeLabel || (group === 'edited' ? 'Edited evidence reel' : 'Preserved excerpt');
    return `<article class="video-card${featured}" data-video-record data-video-category="${escapeHtml(item.category)}" data-video-search="${escapeHtml([item.title, item.publisher, item.date, item.description, item.editNote].join(' ').toLowerCase())}">
      <div class="video-stage" data-video-stage>
        <button class="video-load" type="button" data-video-src="${escapeHtml(item.file)}" data-video-poster="${escapeHtml(item.poster)}" data-video-title="${escapeHtml(item.title)}"${captions} aria-label="Load video: ${escapeHtml(item.title)}">
          <img src="${escapeHtml(item.poster)}" alt="" loading="lazy" width="640" height="360">
          <span class="video-play-icon" aria-hidden="true">▶</span>
          <span>Load video</span>
        </button>
      </div>
      <div class="video-card-body">
        <div class="video-meta"><span>${escapeHtml(typeLabel)}</span><time>${escapeHtml(item.duration)}</time></div>
        <h3>${escapeHtml(item.title)}</h3>
        <p class="video-byline">${escapeHtml(item.publisher)} · ${escapeHtml(item.date)}</p>
        <p>${escapeHtml(item.description)}</p>
        <p class="video-edit-note"><strong>Context:</strong> ${escapeHtml(item.editNote)}</p>
        <div class="video-source-links">${sourceLinks(item.sources)}</div>
        <a class="video-download" href="${escapeHtml(item.file)}" download>Download preserved MP4</a>
      </div>
    </article>`;
  }

  function programCard(item) {
    return `<article class="program-row" data-video-record data-video-category="${escapeHtml(item.category)}" data-video-search="${escapeHtml([item.title, item.publisher, item.date].join(' ').toLowerCase())}">
      <div><time>${escapeHtml(item.date)}</time><span>${escapeHtml(item.publisher)}</span></div>
      <div><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.duration)}</p></div>
      <div class="program-actions"><a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">Watch original ↗</a>${item.transcript ? `<a href="${escapeHtml(item.transcript)}">Read transcript</a>` : ''}</div>
    </article>`;
  }

  editedRoot.innerHTML = archive.editedReels.map(item => videoCard(item, 'edited')).join('');
  clipsRoot.innerHTML = archive.preservedClips.map(item => videoCard(item, 'clip')).join('');
  programsRoot.innerHTML = archive.fullPrograms.map(programCard).join('');

  function closePlayer(restoreFocus) {
    if (!activePlayer) return;
    const { stage, button } = activePlayer;
    const video = stage.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('src');
      video.load();
    }
    stage.innerHTML = '';
    stage.append(button);
    activePlayer = null;
    if (restoreFocus) button.focus();
  }

  document.addEventListener('click', event => {
    const loadButton = event.target.closest('.video-load');
    if (loadButton) {
      closePlayer(false);
      const stage = loadButton.closest('[data-video-stage]');
      const video = document.createElement('video');
      video.controls = true;
      video.preload = 'metadata';
      video.playsInline = true;
      video.poster = loadButton.dataset.videoPoster;
      video.src = loadButton.dataset.videoSrc;
      video.setAttribute('aria-label', loadButton.dataset.videoTitle);
      if (loadButton.dataset.videoCaptions) {
        const track = document.createElement('track');
        track.kind = 'captions';
        track.srclang = 'en';
        track.label = 'English';
        track.src = loadButton.dataset.videoCaptions;
        video.append(track);
      }
      const close = document.createElement('button');
      close.type = 'button';
      close.className = 'video-close';
      close.textContent = 'Hide video';
      close.setAttribute('aria-label', `Hide video: ${loadButton.dataset.videoTitle}`);
      loadButton.remove();
      stage.append(video, close);
      activePlayer = { stage, button: loadButton };
      close.focus();
      return;
    }

    if (event.target.closest('.video-close')) closePlayer(true);
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activePlayer) closePlayer(true);
  });

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const records = [...document.querySelectorAll('[data-video-record]')];
    let visible = 0;
    records.forEach(record => {
      const categories = record.dataset.videoCategory.split(/\s+/);
      const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
      const matchesSearch = !query || record.dataset.videoSearch.includes(query);
      record.hidden = !(matchesFilter && matchesSearch);
      if (!record.hidden) visible += 1;
    });
    document.querySelectorAll('.video-grid, .program-list').forEach(container => {
      container.closest('section').hidden = ![...container.children].some(item => !item.hidden);
    });
    empty.hidden = visible !== 0;
    results.textContent = `${visible} ${visible === 1 ? 'record' : 'records'} shown`;
    if (activePlayer && activePlayer.stage.closest('[data-video-record]').hidden) closePlayer(false);
  }

  filterButtons.forEach(button => button.addEventListener('click', () => {
    activeFilter = button.dataset.videoFilter;
    filterButtons.forEach(item => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    applyFilters();
  }));
  searchInput.addEventListener('input', applyFilters);
  applyFilters();
})();
