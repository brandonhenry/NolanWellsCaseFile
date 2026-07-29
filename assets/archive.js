(function () {
  'use strict';

  const evidence = window.NOLAN_EVIDENCE;
  const archive = window.NOLAN_ARCHIVE;
  const page = document.body.dataset.page;
  const content = document.getElementById('archive-content');

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[character]);
  }

  function typeMeta(type) {
    return evidence.types[type] || evidence.types.hypothesis;
  }

  function list(items, className = 'plain-list') {
    return `<ul class="${className}">${items.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>`;
  }

  function sourceLink(href, label, className = 'archive-link') {
    const external = /^https?:/.test(href);
    return `<a class="${className}" href="${escapeHtml(href)}"${external ? ' target="_blank" rel="noopener noreferrer"' : ''}>${escapeHtml(label)}${external ? ' ↗' : ' →'}</a>`;
  }

  function eventCard(event) {
    const type = typeMeta(event.type);
    return `<article class="mini-event" style="--tone:${type.color}">
      <div class="mini-time">${escapeHtml(event.time)} · ${escapeHtml(event.date)}</div>
      <div><p class="mini-type">${escapeHtml(type.label)} · ${escapeHtml(event.confidence)}</p><h3>${escapeHtml(event.title)}</h3><p>${escapeHtml(event.summary)}</p><a href="./event-timeline.html#${escapeHtml(event.id)}">Open event evidence →</a></div>
    </article>`;
  }

  function setHeading(eyebrow, title, intro) {
    document.getElementById('page-eyebrow').textContent = eyebrow;
    document.getElementById('page-title').textContent = title;
    document.getElementById('page-intro').textContent = intro;
  }

  function renderArchive() {
    setHeading('Nolan Wells Evidence File', 'Evidence Archive', 'Tools for inspecting the record by event, source, person, vessel, coordinate, question, and unresolved gap.');
    content.innerHTML = `<section class="archive-card-grid">${archive.sections.map(section => {
      const tone = typeMeta(section.tone);
      return `<a class="archive-card" href="${escapeHtml(section.href)}" style="--tone:${tone.color}"><span>${escapeHtml(tone.short)}</span><h2>${escapeHtml(section.title)}</h2><p>${escapeHtml(section.description)}</p><strong>Open tool →</strong></a>`;
    }).join('')}</section>
    <section class="archive-principle"><p class="section-label">Evidence rule</p><h2>Fact and interpretation stay separate.</h2><div class="principle-grid"><div><strong>What happened?</strong><span>The narrow factual or reported claim.</span></div><div><strong>How do we know?</strong><span>The document, witness, media, or analytical basis.</span></div><div><strong>How confident?</strong><span>A visible level with a written reason.</span></div><div><strong>What remains unknown?</strong><span>The gap and the record needed to resolve it.</span></div></div></section>`;
  }

  function renderDocuments() {
    setHeading('Source archive', 'Documents', 'Every obtained source is treated as a record: what it contains, where it is used, and which companion files remain missing.');
    content.innerHTML = `<section class="record-grid">${archive.documents.map(documentRecord => `<article class="record-card">
      <div class="record-meta"><span>${escapeHtml(documentRecord.kind)}</span><span class="status">${escapeHtml(documentRecord.status)}</span></div>
      <h2>${escapeHtml(documentRecord.title)}</h2><p>${escapeHtml(documentRecord.summary)}</p>
      <div class="record-stats"><span>${escapeHtml(documentRecord.availability)}</span><span>${documentRecord.referencedEvents.length} timeline references</span></div>
      <div class="card-actions"><a href="./document.html?id=${encodeURIComponent(documentRecord.id)}">Open document record →</a>${sourceLink(documentRecord.href, 'Open source', 'quiet-link')}</div>
    </article>`).join('')}</section>
    <section class="file-tree-section"><p class="section-label">Known MDMR record family</p><h2>MP2607 file tree</h2><p class="section-intro">“Referenced” means the obtained report indicates the record or record family existed; it does not mean this project possesses the file.</p><div class="file-tree">${archive.fileTree.map(item => `<div class="tree-row" style="--depth:${item.depth}"><span class="tree-branch" aria-hidden="true">${item.depth ? '↳' : '●'}</span><strong>${escapeHtml(item.name)}</strong><span>${escapeHtml(item.kind)}</span><em>${escapeHtml(item.status)}</em></div>`).join('')}</div></section>`;
  }

  function renderDocument() {
    const id = new URLSearchParams(location.search).get('id') || '';
    const documentRecord = archive.documents.find(item => item.id === id);
    if (!documentRecord) {
      setHeading('Source archive', 'Document not found', 'The requested document record is not present in this public archive.');
      content.innerHTML = '<p class="empty-state"><a href="./documents.html">Return to documents →</a></p>';
      return;
    }
    setHeading(documentRecord.kind, documentRecord.title, documentRecord.summary);
    const events = documentRecord.referencedEvents.map(eventId => evidence.events.find(event => event.id === eventId)).filter(Boolean);
    content.innerHTML = `<section class="detail-summary">
      <div><p class="section-label">Status</p><strong>${escapeHtml(documentRecord.status)}</strong><span>${escapeHtml(documentRecord.availability)}</span></div>
      <div><p class="section-label">Confidence</p><strong>${escapeHtml(documentRecord.confidence)}</strong><span>Applied claim by claim</span></div>
      <div><p class="section-label">References</p><strong>${events.length}</strong><span>Timeline events</span></div>
    </section>
    <section class="two-column-detail"><div><p class="section-label">Contents</p><h2>What this record contains</h2>${list(documentRecord.contents)}</div><div><p class="section-label">Missing companions</p><h2>What is still needed</h2>${list(documentRecord.missingCompanions, 'plain-list missing')}</div></section>
    <div class="primary-action">${sourceLink(documentRecord.href, 'Open source file or transcript')}</div>
    <section><p class="section-label">Referenced in</p><h2>Timeline evidence</h2><div class="mini-event-list">${events.map(eventCard).join('')}</div></section>`;
  }

  function renderPeople() {
    setHeading('Witness and person index', 'People', 'Person-centered records collect public accounts, linked events, interviews, and unanswered questions without inferring responsibility.');
    content.innerHTML = `<section class="record-grid">${archive.people.map(person => `<article class="record-card"><div class="record-meta"><span>${escapeHtml(person.role)}</span><span>${person.eventIds.length} events</span></div><h2>${escapeHtml(person.name)}</h2><p>${escapeHtml(person.summary)}</p><div class="card-actions"><a href="./person.html?id=${encodeURIComponent(person.id)}">Open person record →</a></div></article>`).join('')}</section>`;
  }

  function renderPerson() {
    const id = new URLSearchParams(location.search).get('id') || '';
    const person = archive.people.find(item => item.id === id);
    if (!person) {
      setHeading('Person index', 'Person not found', 'The requested person record is not present.');
      content.innerHTML = '<p class="empty-state"><a href="./people.html">Return to people →</a></p>';
      return;
    }
    setHeading(person.role, person.name, person.summary);
    const events = person.eventIds.map(eventId => evidence.events.find(event => event.id === eventId)).filter(Boolean);
    content.innerHTML = `<section class="two-column-detail"><div><p class="section-label">Interviews and source pages</p><h2>Available sources</h2>${person.interviews.length ? `<div class="stacked-links">${person.interviews.map(item => sourceLink(item.href, item.label)).join('')}</div>` : '<p class="muted-copy">No complete named interview is bundled.</p>'}</div><div><p class="section-label">Open questions</p><h2>Still unresolved</h2>${list(person.questions, 'plain-list missing')}</div></section><section><p class="section-label">Timeline</p><h2>Events linked to this person</h2><div class="mini-event-list">${events.map(eventCard).join('')}</div></section>`;
  }

  function renderBoats() {
    setHeading('Vessel index', 'Boats', 'Vessel records keep GPS movement separate from passenger, transfer, and intent claims.');
    content.innerHTML = `<section class="record-grid">${archive.boats.map(boat => `<article class="record-card"><div class="record-meta"><span>Vessel record</span><span class="status">${escapeHtml(boat.status)}</span></div><h2>${escapeHtml(boat.name)}</h2><p>${escapeHtml(boat.summary)}</p><div class="card-actions"><a href="./boat.html?id=${encodeURIComponent(boat.id)}">Open boat record →</a></div></article>`).join('')}</section>`;
  }

  function renderBoat() {
    const id = new URLSearchParams(location.search).get('id') || '';
    const boat = archive.boats.find(item => item.id === id);
    if (!boat) {
      setHeading('Vessel index', 'Boat not found', 'The requested vessel record is not present.');
      content.innerHTML = '<p class="empty-state"><a href="./boats.html">Return to boats →</a></p>';
      return;
    }
    setHeading('Vessel record', boat.name, boat.summary);
    const events = boat.eventIds.map(eventId => evidence.events.find(event => event.id === eventId)).filter(Boolean);
    content.innerHTML = `<section class="detail-summary"><div><p class="section-label">Record status</p><strong>${escapeHtml(boat.status)}</strong><span>Current public evidence file</span></div><div><p class="section-label">Passenger record</p><strong>Incomplete</strong><span>${escapeHtml(boat.passengers)}</span></div></section><section class="two-column-detail"><div><p class="section-label">Evidence</p><h2>Available basis</h2>${list(boat.evidence)}</div><div><p class="section-label">Questions</p><h2>Still unresolved</h2>${list(boat.questions, 'plain-list missing')}</div></section><section><p class="section-label">Timeline</p><h2>Linked vessel events</h2><div class="mini-event-list">${events.map(eventCard).join('')}</div></section>`;
  }

  function renderLastContact() {
    setHeading('Witness comparison', 'Last Contact Matrix', 'No single “last seen” claim is substituted for another. Times, wording, listeners, and confidence remain separate.');
    content.innerHTML = `<section class="matrix" aria-label="Last contact evidence">${archive.lastContacts.map(item => `<article class="matrix-row"><h2>${escapeHtml(item.witness)}</h2><div><span>Last seen</span><p>${escapeHtml(item.lastSeen)}</p></div><div><span>Last words</span><p>${escapeHtml(item.lastWords)}</p></div><div><span>Time</span><p>${escapeHtml(item.time)}</p></div><div><span>Confidence</span><p>${escapeHtml(item.confidence)}</p></div><div><span>Who heard</span><p>${escapeHtml(item.heardBy)}</p></div><a href="${escapeHtml(item.source)}">Source →</a></article>`).join('')}</section>`;
  }

  function renderContradictions() {
    setHeading('Non-accusatory comparison', 'Contradictions', 'Each card separates a public narrative from supporting evidence, evidence in tension, and what remains unknown.');
    content.innerHTML = `<section class="contradiction-list">${archive.contradictions.map(item => `<article class="contradiction-card" id="${escapeHtml(item.id)}"><p class="section-label">Public narrative</p><h2>${escapeHtml(item.narrative)}</h2><div class="contradiction-grid"><section><h3>Supporting</h3>${list(item.supporting)}</section><section><h3>Contradicting / tension</h3>${item.contradicting.length ? list(item.contradicting) : '<p>No direct contradiction documented; the claim remains unauthenticated.</p>'}</section><section><h3>Unknown</h3>${list(item.unknown, 'plain-list missing')}</section></div></article>`).join('')}</section>`;
  }

  function renderEvidenceTracker() {
    setHeading('Records status', 'Missing Evidence Tracker', 'A public status board for what has been found, what is only referenced, what remains private or unavailable, and whether a request status is documented.');
    const found = archive.missingEvidence.filter(item => item.status === 'Found').length;
    content.innerHTML = `<section class="detail-summary"><div><p class="section-label">Tracked records</p><strong>${archive.missingEvidence.length}</strong><span>Total items</span></div><div><p class="section-label">Found</p><strong>${found}</strong><span>Complete public item</span></div><div><p class="section-label">Request status</p><strong>Not inferred</strong><span>Shown only when documented</span></div></section><section class="tracker">${archive.missingEvidence.map(item => `<article class="tracker-row"><div><span class="priority">${escapeHtml(item.priority)}</span><h2>${escapeHtml(item.item)}</h2></div><div><span>Status</span><p>${escapeHtml(item.status)}</p></div><div><span>Public</span><p>${escapeHtml(item.public)}</p></div><div><span>Request</span><p>${escapeHtml(item.request)}</p></div>${item.href ? `<a href="${escapeHtml(item.href)}">Open →</a>` : '<span class="no-link">—</span>'}</article>`).join('')}</section>`;
  }

  function haversine(a, b) {
    const radians = degrees => degrees * Math.PI / 180;
    const earthRadiusMiles = 3958.8;
    const dLat = radians(b.lat - a.lat);
    const dLng = radians(b.lng - a.lng);
    const value = Math.sin(dLat / 2) ** 2 + Math.cos(radians(a.lat)) * Math.cos(radians(b.lat)) * Math.sin(dLng / 2) ** 2;
    return earthRadiusMiles * 2 * Math.atan2(Math.sqrt(value), Math.sqrt(1 - value));
  }

  function renderCoordinates() {
    setHeading('Map evidence', 'Coordinate Explorer', 'Coordinates are contextual anchors, not proof of a vessel route or a person’s position. Distances are straight-line approximations.');
    const recovery = evidence.locations.recovery;
    content.innerHTML = `<section class="coordinate-grid">${Object.entries(evidence.locations).map(([id, location]) => {
      const events = evidence.events.filter(event => event.location === id);
      const distance = haversine(recovery, location);
      const osm = `https://www.openstreetmap.org/?mlat=${location.lat}&mlon=${location.lng}#map=${location.zoom}/${location.lat}/${location.lng}`;
      const satellite = `https://www.google.com/maps/@?api=1&map_action=map&center=${location.lat},${location.lng}&zoom=${location.zoom}&basemap=satellite`;
      return `<article class="coordinate-card" id="coordinate-${escapeHtml(id)}"><p class="section-label">${events.length} linked events</p><h2>${escapeHtml(location.label)}</h2><code>${location.lat.toFixed(6)}, ${location.lng.toFixed(6)}</code><p>${id === 'recovery' ? 'Reference coordinate for distance comparisons.' : `${distance.toFixed(2)} miles straight-line from the recovery reference.`}</p><div class="coordinate-actions">${sourceLink(osm, 'OpenStreetMap')}${sourceLink(satellite, 'Satellite')}</div><details><summary>Timeline context</summary><div>${events.length ? events.map(eventCard).join('') : '<p class="muted-copy">General map context; no event is assigned directly.</p>'}</div></details></article>`;
    }).join('')}</section>`;
  }

  function renderQuestions() {
    setHeading('Open issues', 'Question Tracker', 'Questions remain open until a source answers them. A plausible explanation is not a closed question.');
    content.innerHTML = `<section class="question-list">${archive.questions.map(item => `<article class="question-card" id="question-${item.id}"><div class="question-number">Question ${item.id}</div><div><span class="open-status">${escapeHtml(item.status)}</span><h2>${escapeHtml(item.question)}</h2><section><strong>Current evidence</strong><p>${escapeHtml(item.evidence)}</p></section><section><strong>Needed to answer</strong><p>${escapeHtml(item.needed)}</p></section></div></article>`).join('')}</section>`;
  }

  function renderGaps() {
    setHeading('Known anchors and unknown intervals', 'Timeline Gaps', 'The site shows uncertainty as part of the chronology instead of filling it with a precise but unsupported sequence.');
    const critical = evidence.events.find(event => event.id === 'critical-overlap');
    const unresolved = evidence.events.filter(event => ['unknown', 'hypothesis'].includes(event.type) || /unresolved|not obtained|approximate/i.test(event.precision));
    content.innerHTML = `<section class="large-gap"><p class="section-label">Critical window</p><h2>3:45–4:31 PM</h2><div class="gap-line">${critical.gap.map(item => `<div class="${item.known ? 'known' : 'unknown'}"><time>${escapeHtml(item.time)}</time><strong>${escapeHtml(item.state)}</strong></div>`).join('')}</div><p>${escapeHtml(critical.unknowns[0])}</p>${sourceLink('./event-timeline.html#critical-overlap', 'Open full critical-window evidence')}</section><section><p class="section-label">Other imprecise or unresolved entries</p><h2>Gaps visible in the record</h2><div class="mini-event-list">${unresolved.map(eventCard).join('')}</div></section>`;
  }

  const renderers = {
    archive: renderArchive,
    documents: renderDocuments,
    document: renderDocument,
    people: renderPeople,
    person: renderPerson,
    boats: renderBoats,
    boat: renderBoat,
    'last-contact': renderLastContact,
    contradictions: renderContradictions,
    'evidence-tracker': renderEvidenceTracker,
    coordinates: renderCoordinates,
    questions: renderQuestions,
    gaps: renderGaps
  };

  if (renderers[page]) renderers[page]();
})();
