(function () {
  'use strict';

  const data = window.NOLAN_EVIDENCE;
  const story = document.getElementById('story');
  const status = document.getElementById('page-status');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let activeStep = null;
  let map = null;
  let activeMarker = null;
  let activeRoute = null;
  let previousFocus = null;

  function escapeHtml(value) {
    return String(value || '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function typeMeta(type) {
    return data.types[type] || data.types.hypothesis;
  }

  function sourceMarkup(sources) {
    return sources.map(source => `<a class="source-link" href="${escapeHtml(source.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.label)} <span class="sr-only">(opens in a new tab)</span></a>`).join('');
  }

  function mediaMarkup(media) {
    if (!media) return '';
    const icon = media.type === 'video'
      ? '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m8 5 11 7-11 7V5Z"/></svg>'
      : '<svg aria-hidden="true" viewBox="0 0 24 24"><path d="M4 5h16v14H4zM7 15l3-3 2 2 2-2 3 3M9 9h.01"/></svg>';
    return `<div class="evidence-media" data-media-container><button class="media-trigger" type="button" data-media-type="${escapeHtml(media.type)}" data-media-src="${escapeHtml(media.src)}" data-media-alt="${escapeHtml(media.alt)}" data-media-caption="${escapeHtml(media.caption)}">${icon}<span>${media.type === 'video' ? 'Load evidence media' : 'View evidence image'}</span></button></div>`;
  }

  function eventMarkup(event) {
    const tone = typeMeta(event.type);
    return `<section class="step" id="event-${escapeHtml(event.id)}" data-event-id="${escapeHtml(event.id)}" style="--tone:${tone.color}">
      <article class="step-content">
        <p class="step-time">${escapeHtml(event.time)} · ${escapeHtml(event.date)}</p>
        <h2 class="step-title">${escapeHtml(event.title)}</h2>
        <p class="step-summary">${escapeHtml(event.summary)}</p>
        <div class="evidence-meta">
          <span class="evidence-pill">${escapeHtml(tone.label)}</span>
          <span class="confidence-pill">${escapeHtml(event.confidence)} confidence</span>
        </div>
        <p class="precision"><strong>Time precision:</strong> ${escapeHtml(event.precision)}</p>
        <ul class="claim-list">${event.claims.map(claim => `<li>${escapeHtml(claim)}</li>`).join('')}</ul>
        ${mediaMarkup(event.media)}
        <div class="source-block">
          <p class="source-label">Sources and evidentiary basis</p>
          <div class="source-links">${sourceMarkup(event.sources)}</div>
        </div>
      </article>
    </section>`;
  }

  function renderStory() {
    const intro = `<section class="step intro-step" data-event-id="intro" style="--tone:${data.types.hypothesis.color}">
      <article class="step-content intro-content">
        <p class="step-time">${escapeHtml(data.meta.range)}</p>
        <h1 class="step-title">${escapeHtml(data.meta.title)}</h1>
        <p class="step-summary">${escapeHtml(data.meta.description)}</p>
        <p class="intro-note">The opening marker shows the approximate publicly reported recovery time. Scroll to move through the record. This site does not attempt to prove a theory; each claim is labeled by evidence type and confidence.</p>
        <div class="source-block"><p class="source-label">Start with the evidence file</p><div class="source-links"><a class="source-link" href="./documents/master-investigation-notes.html">Open master investigation notes</a><a class="source-link" href="./event-timeline.html">Open full event log</a></div></div>
      </article>
    </section>`;
    const ending = `<section class="step" data-event-id="ending" style="--tone:${data.types.verified.color}">
      <article class="step-content">
        <p class="step-time">Living evidence file</p>
        <h2 class="step-title">What do we actually know?</h2>
        <p class="step-summary">This reconstruction should change when stronger primary evidence becomes available. The unresolved questions are part of the record—not gaps to fill with certainty.</p>
        <div class="end-links"><a class="source-link" href="./event-timeline.html">Full evidence log →</a><a class="source-link" href="./documents/master-investigation-notes.html#documents-to-obtain">Missing records →</a></div>
        <p class="end-attribution">Visual interaction adapted from the public Subtxt Press Nolan timeline at reference commit ${escapeHtml(data.meta.referenceCommit)}. Map data © OpenStreetMap contributors © CARTO.</p>
      </article>
    </section>`;
    story.insertAdjacentHTML('beforeend', intro + data.events.map(eventMarkup).join('') + ending);
  }

  function renderTimelineMenu() {
    document.getElementById('confirmed-times-list').innerHTML = data.confirmedTimes.map(day => {
      const hours = day.hours.map(hour => `<div class="timeline-hour">
        <p class="timeline-hour-label">${escapeHtml(hour.hour)}</p>
        <div class="timeline-hour-events">${hour.entries.map(entry => `<a class="timeline-jump" href="#event-${escapeHtml(entry.eventId)}" data-timeline-jump="${escapeHtml(entry.eventId)}"><time>${escapeHtml(entry.time)}</time><span>${escapeHtml(entry.label)}</span></a>`).join('')}</div>
      </div>`).join('');
      const emptyState = day.note ? `<p class="timeline-empty">${escapeHtml(day.note)}</p>` : '';
      return `<section class="timeline-date-section" aria-labelledby="timeline-date-${escapeHtml(day.date.replace(/\s+/g, '-').toLowerCase())}">
        <h2 id="timeline-date-${escapeHtml(day.date.replace(/\s+/g, '-').toLowerCase())}">${escapeHtml(day.date)}</h2>
        ${hours || emptyState}
      </section>`;
    }).join('');
  }

  function closeTimelineMenu(restoreFocus) {
    const button = document.getElementById('timeline-menu-toggle');
    const dropdown = document.getElementById('timeline-dropdown');
    if (!dropdown.classList.contains('open')) return;
    dropdown.classList.remove('open');
    dropdown.setAttribute('aria-hidden', 'true');
    button.setAttribute('aria-expanded', 'false');
    if (restoreFocus) button.focus();
  }

  function openTimelineMenu() {
    const button = document.getElementById('timeline-menu-toggle');
    const dropdown = document.getElementById('timeline-dropdown');
    closePanels(false);
    dropdown.classList.add('open');
    dropdown.setAttribute('aria-hidden', 'false');
    button.setAttribute('aria-expanded', 'true');
  }

  function wireTimelineMenu() {
    const button = document.getElementById('timeline-menu-toggle');
    const dropdown = document.getElementById('timeline-dropdown');
    button.addEventListener('click', event => {
      event.stopPropagation();
      dropdown.classList.contains('open') ? closeTimelineMenu(false) : openTimelineMenu();
    });
    dropdown.querySelectorAll('[data-timeline-jump]').forEach(link => {
      link.addEventListener('click', () => {
        closeTimelineMenu(false);
        status.textContent = `Timeline moved to ${link.querySelector('time').textContent}.`;
      });
    });
    document.addEventListener('click', event => {
      if (!event.target.closest('.timeline-menu')) closeTimelineMenu(false);
    });
  }

  function renderPanels() {
    document.getElementById('transcripts-list').innerHTML = data.transcripts.map(item => `<div class="panel-item"><a href="${escapeHtml(item.href)}" target="_blank" rel="noopener noreferrer">${escapeHtml(item.label)}</a><p>${escapeHtml(item.meta)}</p></div>`).join('');
    document.getElementById('boats-list').innerHTML = data.boats.map(boat => `<div class="panel-item"><strong>${escapeHtml(boat.name)}</strong><p>${escapeHtml(boat.status)}</p><p>${escapeHtml(boat.note)}</p></div>`).join('');
  }

  function closePanels(restoreFocus) {
    document.querySelectorAll('.reference-panel.open').forEach(panel => {
      panel.classList.remove('open');
      panel.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('[data-panel-target]').forEach(button => button.setAttribute('aria-expanded', 'false'));
    if (restoreFocus && previousFocus) previousFocus.focus();
    previousFocus = null;
  }

  function openPanel(button, panel) {
    closePanels(false);
    closeTimelineMenu(false);
    previousFocus = button;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    button.setAttribute('aria-expanded', 'true');
    panel.querySelector('.panel-close').focus();
  }

  function wirePanels() {
    document.querySelectorAll('[data-panel-target]').forEach(button => {
      button.addEventListener('click', event => {
        event.stopPropagation();
        const panel = document.getElementById(button.dataset.panelTarget);
        panel.classList.contains('open') ? closePanels(true) : openPanel(button, panel);
      });
    });
    document.querySelectorAll('.panel-close').forEach(button => button.addEventListener('click', () => closePanels(true)));
    document.addEventListener('click', event => {
      if (!event.target.closest('.reference-panel') && !event.target.closest('[data-panel-target]')) closePanels(false);
    });
  }

  function openLightbox(image, caption) {
    const overlay = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    previousFocus = document.activeElement;
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    document.getElementById('lightbox-caption').textContent = caption || image.alt;
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden', 'false');
    document.getElementById('lightbox-close').focus();
  }

  function closeLightbox() {
    const overlay = document.getElementById('lightbox');
    if (!overlay.classList.contains('open')) return;
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden', 'true');
    if (previousFocus) previousFocus.focus();
    previousFocus = null;
  }

  function wireMedia() {
    document.querySelectorAll('.media-trigger').forEach(button => {
      button.addEventListener('click', () => {
        const container = button.closest('[data-media-container]');
        const mediaType = button.dataset.mediaType;
        if (mediaType === 'video') {
          container.innerHTML = `<figure class="loaded-media"><video controls playsinline preload="metadata" aria-label="${escapeHtml(button.dataset.mediaAlt)}"><source src="${escapeHtml(button.dataset.mediaSrc)}" type="video/mp4">Your browser cannot play this video.</video><figcaption>${escapeHtml(button.dataset.mediaCaption)}</figcaption></figure>`;
          container.querySelector('video').play().catch(() => {});
        } else {
          container.innerHTML = `<figure class="loaded-media"><button class="image-open" type="button" aria-label="Expand evidence image"><img src="${escapeHtml(button.dataset.mediaSrc)}" alt="${escapeHtml(button.dataset.mediaAlt)}" loading="lazy"></button><figcaption>${escapeHtml(button.dataset.mediaCaption)}</figcaption></figure>`;
          const imageButton = container.querySelector('.image-open');
          imageButton.addEventListener('click', () => openLightbox(imageButton.querySelector('img'), button.dataset.mediaCaption));
        }
      });
    });
    document.getElementById('lightbox-close').addEventListener('click', closeLightbox);
    document.getElementById('lightbox').addEventListener('click', event => { if (event.target.id === 'lightbox') closeLightbox(); });
  }

  function initMap() {
    if (!window.L) {
      document.body.classList.add('map-unavailable');
      status.textContent = 'Map tiles are unavailable. The complete timeline remains readable.';
      return;
    }
    const openingLocation = data.locations[data.meta.opening.location];
    map = L.map('map', {
      zoomControl: false,
      attributionControl: true,
      fadeAnimation: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      touchZoom: false,
      keyboard: false
    }).setView([openingLocation.lat, openingLocation.lng], data.meta.opening.zoom || openingLocation.zoom);
    map.attributionControl.setPrefix(false);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(map);
    map.getContainer().setAttribute('tabindex', '-1');
  }

  function clearMapEvidence() {
    if (!map) return;
    if (activeMarker) map.removeLayer(activeMarker);
    if (activeRoute) map.removeLayer(activeRoute);
    activeMarker = null;
    activeRoute = null;
  }

  function showMapEvidence(event) {
    if (!map) return;
    clearMapEvidence();
    const location = data.locations[event.location || 'overview'];
    const tone = event.markerColor || typeMeta(event.type).color;
    if (event.route && data.routes[event.route]) {
      const route = data.routes[event.route];
      activeRoute = L.polyline(route.coords, { color: route.color, weight: 3, opacity: .8, dashArray: '7 6', lineCap: 'round' }).addTo(map);
    }
    activeMarker = L.circleMarker([location.lat, location.lng], { radius: 8, color: tone, fillColor: tone, weight: 2, opacity: 1, fillOpacity: .72 }).addTo(map);
    const tooltipDirection = event.tooltipDirection || 'right';
    const tooltipOffset = tooltipDirection === 'left' ? [-12, 0] : [12, 0];
    activeMarker.bindTooltip(escapeHtml(event.markerLabel || location.label), { permanent: true, direction: tooltipDirection, offset: tooltipOffset, className: 'map-label' }).openTooltip();
    const move = reduceMotion ? 'setView' : 'flyTo';
    const zoom = event.zoom || location.zoom;
    if (event.viewportOffset) {
      map.setView([location.lat, location.lng], zoom, { animate: false });
      map.panBy([
        -Math.round(window.innerWidth * event.viewportOffset.x),
        -Math.round(window.innerHeight * event.viewportOffset.y)
      ], { animate: false });
    } else {
      map[move]([location.lat, location.lng], zoom, reduceMotion ? undefined : { duration: 1.1, easeLinearity: .25 });
    }
  }

  function activateStep(step) {
    if (!step || step === activeStep) return;
    if (activeStep) activeStep.classList.remove('is-active');
    activeStep = step;
    step.classList.add('is-active');
    const eventId = step.dataset.eventId;
    let event = data.events.find(item => item.id === eventId);
    if (!event && eventId === 'intro') event = { ...data.meta.opening, type: 'verified' };
    if (!event) event = { location: eventId === 'ending' ? 'recovery' : 'overview', type: eventId === 'ending' ? 'verified' : 'hypothesis' };
    showMapEvidence(event);
  }

  function wireScrollSync() {
    const steps = [...document.querySelectorAll('.step')];
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) activateStep(visible[0].target);
      }, { rootMargin: '-24% 0px -50% 0px', threshold: [0, .15, .35, .6] });
      steps.forEach(step => observer.observe(step));
    } else {
      const sync = () => {
        let current = steps[0];
        steps.forEach(step => { if (step.getBoundingClientRect().top < window.innerHeight * .42) current = step; });
        activateStep(current);
      };
      window.addEventListener('scroll', sync, { passive: true });
      sync();
    }
    activateStep(steps[0]);
  }

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    closeTimelineMenu(true);
    closeLightbox();
    closePanels(true);
  });

  renderStory();
  renderTimelineMenu();
  renderPanels();
  wireTimelineMenu();
  wirePanels();
  wireMedia();
  initMap();
  wireScrollSync();
})();
