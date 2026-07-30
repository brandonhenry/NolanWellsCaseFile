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
    const graph = archive.entityGraph;
    const statusMeta = {
      official: { label: 'Official record', color: '#72a860' },
      firsthand: { label: 'Firsthand public account', color: '#6ea7c9' },
      reported: { label: 'Reported / incomplete', color: '#d36d2a' },
      lead: { label: 'Unresolved lead', color: '#9b7bb6' }
    };
    const entityTypeMeta = {
      person: { label: 'Person', color: '#d8d4cb' },
      vessel: { label: 'Vessel', color: '#6ea7c9' },
      media: { label: 'Media', color: '#d36d2a' },
      agency: { label: 'Agency', color: '#72a860' },
      record: { label: 'Record', color: '#4a8a7c' },
      location: { label: 'Location', color: '#9b7bb6' }
    };
    const positions = {
      nolan: [500, 300], 'christine-wonsley': [500, 585], warren: [340, 210], tracestin: [660, 210], katie: [345, 385],
      'anna-moore': [895, 250], wyatt: [390, 65], bart: [105, 115], 'lucas-aviz': [205, 300],
      'stephen-ray': [205, 455], 'ivy-elizabeth': [895, 370], 'katelynn-brochard': [760, 675],
      'matthew-lamp': [560, 690], mi4088bu: [500, 105], mi1295cb: [105, 220], 'family-boat': [790, 150],
      'viral-video-record': [790, 315], mdmr: [610, 50], 'sea-tow': [735, 70], 'horn-island': [660, 575]
    };
    const peopleNodes = archive.people.map(person => ({
      id: person.id, name: person.name, type: 'person', detail: person.role,
      href: `./person.html?id=${encodeURIComponent(person.id)}`
    }));
    const nodes = [...peopleNodes, ...graph.entities].filter(node => positions[node.id]);
    const nodeById = Object.fromEntries(nodes.map(node => [node.id, node]));
    const connectionCount = id => graph.relationships.filter(item => item.from === id || item.to === id).length;
    const nodeMarkup = nodes.map(node => {
      const [x, y] = positions[node.id];
      const meta = entityTypeMeta[node.type] || entityTypeMeta.record;
      const radius = node.id === 'nolan' ? 35 : node.type === 'person' ? 26 : 29;
      return `<g class="graph-node graph-node--${escapeHtml(node.type)}" data-node-id="${escapeHtml(node.id)}" role="button" tabindex="0" aria-label="${escapeHtml(node.name)}, ${escapeHtml(meta.label)}, ${connectionCount(node.id)} documented connections" transform="translate(${x} ${y})" style="--node-tone:${meta.color}">
        <circle r="${radius}"></circle><text class="graph-node-name" y="${radius + 18}" text-anchor="middle">${escapeHtml(node.name)}</text><text class="graph-node-type" y="${radius + 31}" text-anchor="middle">${escapeHtml(meta.label)}</text>
      </g>`;
    }).join('');
    const edgeMarkup = graph.relationships.map(relationship => {
      const start = positions[relationship.from];
      const end = positions[relationship.to];
      if (!start || !end) return '';
      const meta = statusMeta[relationship.status] || statusMeta.lead;
      return `<line class="graph-edge graph-edge--${escapeHtml(relationship.status)}" data-edge-id="${escapeHtml(relationship.id)}" data-from="${escapeHtml(relationship.from)}" data-to="${escapeHtml(relationship.to)}" x1="${start[0]}" y1="${start[1]}" x2="${end[0]}" y2="${end[1]}" style="--edge-tone:${meta.color}"><title>${escapeHtml(relationship.label)} · ${escapeHtml(meta.label)}</title></line>`;
    }).join('');
    const relationshipMarkup = graph.relationships.map(relationship => {
      const from = nodeById[relationship.from];
      const to = nodeById[relationship.to];
      const meta = statusMeta[relationship.status] || statusMeta.lead;
      return `<article class="relationship-row" data-relationship-id="${escapeHtml(relationship.id)}" data-from="${escapeHtml(relationship.from)}" data-to="${escapeHtml(relationship.to)}" style="--relationship-tone:${meta.color}">
        <div class="relationship-parties"><strong>${escapeHtml(from?.name || relationship.from)}</strong><span aria-hidden="true">↔</span><strong>${escapeHtml(to?.name || relationship.to)}</strong></div>
        <div><span class="relationship-label">${escapeHtml(relationship.label)}</span><p>${escapeHtml(relationship.claim)}</p></div>
        <div class="relationship-source"><span>${escapeHtml(meta.label)} · ${escapeHtml(relationship.confidence)} confidence</span>${sourceLink(relationship.source, relationship.sourceLabel, 'quiet-link')}</div>
      </article>`;
    }).join('');
    const social = archive.socialContext;
    const socialPositions = [[110, 75], [300, 45], [500, 45], [690, 75], [690, 285], [500, 315], [300, 315]];
    const socialEdgeMarkup = social.connections.map((connection, index) => {
      const [x, y] = socialPositions[index];
      return `<line x1="400" y1="180" x2="${x}" y2="${y}"><title>Facebook friend listing visible · checked ${escapeHtml(social.updated)}</title></line>`;
    }).join('');
    const socialNodeMarkup = social.connections.map((connection, index) => {
      const [x, y] = socialPositions[index];
      return `<a href="${escapeHtml(connection.profile)}" target="_blank" rel="noopener noreferrer" aria-label="Open ${escapeHtml(connection.displayName)} Facebook profile"><g class="social-node" transform="translate(${x} ${y})"><circle r="24"></circle><text y="39" text-anchor="middle">${escapeHtml(connection.displayName)}</text><text class="social-node-type" y="51" text-anchor="middle">Visible friend listing</text></g></a>`;
    }).join('');
    const socialLedgerMarkup = social.connections.map(connection => `<article><div><strong>${escapeHtml(social.hub.name)}</strong><span aria-hidden="true">↔</span><strong>${escapeHtml(connection.displayName)}</strong></div><p>Jack Jordan’s visible Facebook friends page listed this profile on ${escapeHtml(social.updated)}. This establishes only a platform listing.</p><div>${sourceLink(connection.profile, 'Open listed profile', 'quiet-link')}${sourceLink(`./person.html?id=${encodeURIComponent(connection.personId)}`, 'Open evidence record', 'archive-link')}</div></article>`).join('');
    const personCard = person => `<article class="record-card person-record" data-person-search="${escapeHtml(`${person.name} ${person.role} ${person.summary}`.toLowerCase())}">
      <div class="record-meta"><span>${escapeHtml(person.recordStatus || 'Published person record')}</span><span>${person.eventIds.length} event${person.eventIds.length === 1 ? '' : 's'}</span></div>
      <h2>${escapeHtml(person.name)}</h2><p class="person-role">${escapeHtml(person.role)}</p><p>${escapeHtml(person.summary)}</p>
      <div class="record-stats"><span>${connectionCount(person.id)} graph connection${connectionCount(person.id) === 1 ? '' : 's'}</span><span>${person.interviews.length} source link${person.interviews.length === 1 ? '' : 's'}</span></div>
      <div class="card-actions"><a href="./person.html?id=${encodeURIComponent(person.id)}">Open person record →</a></div>
    </article>`;

    setHeading('Sourced people and entity index', 'People & Connections', 'A claim-level map of people, vessels, records, media, agencies, and locations in the July 3–6, 2026 evidence file. Every displayed connection has a stated source and confidence.');
    content.innerHTML = `<section class="detail-summary people-summary"><div><p class="section-label">People tracked</p><strong>${archive.people.length}</strong><span>Named public records</span></div><div><p class="section-label">Relationships tracked</p><strong>${graph.relationships.length}</strong><span>Each with a source</span></div><div><p class="section-label">Last review</p><strong>${escapeHtml(graph.updated)}</strong><span>No relationship inferred from mutuals</span></div></section>
    <section class="graph-section" aria-labelledby="connection-graph-title"><div class="graph-heading"><div><p class="section-label">Entity graph</p><h2 id="connection-graph-title">What the public record actually connects</h2></div><button class="graph-reset" id="graph-reset" type="button" hidden>Show all connections</button></div>
      <p class="section-intro">Select a node to isolate its sourced connections. Lines show claims in the record—not guilt, responsibility, attendance, or a complete social network.</p>
      <div class="graph-legend" aria-label="Relationship evidence legend">${Object.entries(statusMeta).map(([key, meta]) => `<span style="--legend-tone:${meta.color}"><i aria-hidden="true"></i>${escapeHtml(meta.label)}</span>`).join('')}</div><p class="graph-swipe-hint">Swipe horizontally to explore the full graph. The complete text ledger follows below.</p>
      <div class="entity-graph-layout"><div class="entity-graph-scroll" tabindex="0" aria-label="Scrollable entity graph"><svg class="entity-graph" viewBox="0 0 1000 740" role="img" aria-labelledby="graph-svg-title graph-svg-description"><title id="graph-svg-title">Nolan Wells evidence entity graph</title><desc id="graph-svg-description">A source-labeled network of people, vessels, records, media, agencies, and locations. Use the relationship ledger below for a complete text version.</desc><g class="graph-edges">${edgeMarkup}</g><g class="graph-nodes">${nodeMarkup}</g></svg></div>
      <aside class="graph-inspector" id="graph-inspector" aria-live="polite"><p class="section-label">How to read this</p><h3>Select any node</h3><p>The graph will isolate direct connections and the ledger below will show the precise claim, evidence class, confidence, and source.</p><ul><li>Social proximity is not proof of case involvement.</li><li>A source claimant is not automatically a witness.</li><li>An edge is only as strong as its displayed basis.</li></ul></aside></div>
    </section>
    <section class="social-context-section" aria-labelledby="social-context-title"><details class="social-context"><summary><span><small>Separate context layer</small><strong id="social-context-title">Facebook connection through Jack Jordan</strong></span><span class="social-summary-count">${social.connections.length} checked listings</span></summary><div class="social-context-body"><div class="social-warning"><strong>Platform listing—not case evidence</strong><p>On ${escapeHtml(social.updated)}, Jack Jordan’s visible Facebook friends page displayed these seven profiles that already have case-relevant records here. This creates a one-degree, hub-and-spoke platform connection through Jack. It does not show that the seven people are mutually connected, attended Horn Island, knew about an event, or share responsibility.</p>${sourceLink(social.source, social.sourceLabel)}</div><div class="social-graph-scroll" tabindex="0" aria-label="Scrollable Facebook connection graph"><svg class="social-graph" viewBox="0 0 800 360" role="img" aria-labelledby="social-graph-title social-graph-description"><title id="social-graph-title">Facebook friend listings through Jack Jordan</title><desc id="social-graph-description">Seven profiles with case-relevant records were visibly listed on Jack Jordan’s Facebook friends page on July 30, 2026. This is platform context, not case evidence.</desc><g class="social-edges">${socialEdgeMarkup}</g><a href="${escapeHtml(social.hub.profile)}" target="_blank" rel="noopener noreferrer" aria-label="Open Jack Jordan Facebook profile"><g class="social-node social-node--hub" transform="translate(400 180)"><circle r="34"></circle><text y="52" text-anchor="middle">${escapeHtml(social.hub.name)}</text><text class="social-node-type" y="65" text-anchor="middle">Platform hub</text></g></a>${socialNodeMarkup}</svg></div><div class="social-ledger">${socialLedgerMarkup}</div><p class="social-exclusion-note"><strong>Not published from this intake:</strong> names supported only by the friend list and not otherwise tied to a case-relevant public source. They can be reconsidered if a direct source establishes a relevant role or claim.</p></div></details></section>
    <section class="relationship-section" aria-labelledby="relationship-ledger-title"><p class="section-label">Accessible source ledger</p><h2 id="relationship-ledger-title">Every displayed connection</h2><p class="section-intro" id="relationship-status">Showing all ${graph.relationships.length} sourced connections.</p><div class="relationship-list">${relationshipMarkup}</div></section>
    <section class="people-register" aria-labelledby="people-register-title"><div class="register-heading"><div><p class="section-label">People register</p><h2 id="people-register-title">Named records and public leads</h2></div><div class="people-search"><label class="sr-only" for="people-search">Search people</label><input id="people-search" type="search" placeholder="Search names, roles, or notes" autocomplete="off"><span id="people-count">${archive.people.length} records</span></div></div><div class="record-grid" id="people-grid">${archive.people.map(personCard).join('')}</div><p class="empty-state people-empty" id="people-empty" hidden>No people records match that search.</p></section>
    <section class="graph-method"><p class="section-label">Inclusion rule</p><h2>Known means named in a source—not proven present.</h2><p>People enter this register only when a case-relevant public source names them. Their displayed role is limited to what that source supports. Private relatives, scraped friend lists, mutual connections, and inferred family or attendance relationships are excluded.</p></section>`;

    const graphNodes = [...content.querySelectorAll('.graph-node')];
    const graphEdges = [...content.querySelectorAll('.graph-edge')];
    const relationshipRows = [...content.querySelectorAll('.relationship-row')];
    const inspector = document.getElementById('graph-inspector');
    const reset = document.getElementById('graph-reset');
    const relationshipStatus = document.getElementById('relationship-status');

    function selectNode(id) {
      const node = nodeById[id];
      if (!node) return;
      const connected = graph.relationships.filter(item => item.from === id || item.to === id);
      const neighborIds = new Set([id, ...connected.flatMap(item => [item.from, item.to])]);
      const connectedIds = new Set(connected.map(item => item.id));
      graphNodes.forEach(item => item.classList.toggle('is-dimmed', !neighborIds.has(item.dataset.nodeId)));
      graphNodes.forEach(item => item.classList.toggle('is-selected', item.dataset.nodeId === id));
      graphEdges.forEach(item => item.classList.toggle('is-dimmed', !connectedIds.has(item.dataset.edgeId)));
      graphEdges.forEach(item => item.classList.toggle('is-selected', connectedIds.has(item.dataset.edgeId)));
      relationshipRows.forEach(item => { item.hidden = !connectedIds.has(item.dataset.relationshipId); });
      const meta = entityTypeMeta[node.type] || entityTypeMeta.record;
      inspector.innerHTML = `<p class="section-label">Selected ${escapeHtml(meta.label)}</p><h3>${escapeHtml(node.name)}</h3><p>${escapeHtml(node.detail)}</p><strong class="inspector-count">${connected.length} sourced connection${connected.length === 1 ? '' : 's'}</strong><a class="archive-link" href="${escapeHtml(node.href)}">Open record →</a>`;
      relationshipStatus.textContent = `Showing ${connected.length} direct connection${connected.length === 1 ? '' : 's'} for ${node.name}.`;
      reset.hidden = false;
    }

    function resetGraph() {
      graphNodes.forEach(item => item.classList.remove('is-dimmed', 'is-selected'));
      graphEdges.forEach(item => item.classList.remove('is-dimmed', 'is-selected'));
      relationshipRows.forEach(item => { item.hidden = false; });
      inspector.innerHTML = '<p class="section-label">How to read this</p><h3>Select any node</h3><p>The graph will isolate direct connections and the ledger below will show the precise claim, evidence class, confidence, and source.</p><ul><li>Social proximity is not proof of case involvement.</li><li>A source claimant is not automatically a witness.</li><li>An edge is only as strong as its displayed basis.</li></ul>';
      relationshipStatus.textContent = `Showing all ${graph.relationships.length} sourced connections.`;
      reset.hidden = true;
    }

    graphNodes.forEach(item => {
      item.addEventListener('click', () => selectNode(item.dataset.nodeId));
      item.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          selectNode(item.dataset.nodeId);
        }
      });
    });
    reset.addEventListener('click', resetGraph);

    const peopleSearch = document.getElementById('people-search');
    const peopleCount = document.getElementById('people-count');
    const peopleEmpty = document.getElementById('people-empty');
    const personCards = [...content.querySelectorAll('.person-record')];
    peopleSearch.addEventListener('input', () => {
      const query = peopleSearch.value.trim().toLowerCase();
      let visible = 0;
      personCards.forEach(card => {
        const matches = !query || card.dataset.personSearch.includes(query);
        card.hidden = !matches;
        if (matches) visible += 1;
      });
      peopleCount.textContent = `${visible} record${visible === 1 ? '' : 's'}`;
      peopleEmpty.hidden = visible !== 0;
    });
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
    const graph = archive.entityGraph;
    const connections = graph.relationships.filter(item => item.from === person.id || item.to === person.id);
    const allNodes = [
      ...archive.people.map(item => ({ id: item.id, name: item.name })),
      ...graph.entities
    ];
    const nameFor = id => allNodes.find(item => item.id === id)?.name || id;
    const connectionList = connections.map(item => {
      const otherId = item.from === person.id ? item.to : item.from;
      return `<article class="person-connection"><div><span>${escapeHtml(item.status)} · ${escapeHtml(item.confidence)} confidence</span><h3>${escapeHtml(nameFor(otherId))}</h3><strong>${escapeHtml(item.label)}</strong></div><p>${escapeHtml(item.claim)}</p>${sourceLink(item.source, item.sourceLabel, 'quiet-link')}</article>`;
    }).join('');
    content.innerHTML = `<section class="detail-summary"><div><p class="section-label">Record status</p><strong>${escapeHtml(person.recordStatus || 'Published person record')}</strong><span>Role limited to stated sources</span></div><div><p class="section-label">Timeline links</p><strong>${events.length}</strong><span>Claim-level event records</span></div><div><p class="section-label">Graph links</p><strong>${connections.length}</strong><span>Sourced direct connections</span></div></section><section class="two-column-detail"><div><p class="section-label">Interviews and source pages</p><h2>Available sources</h2>${person.interviews.length ? `<div class="stacked-links">${person.interviews.map(item => sourceLink(item.href, item.label)).join('')}</div>` : '<p class="muted-copy">No complete named interview is bundled.</p>'}</div><div><p class="section-label">Open questions</p><h2>Still unresolved</h2>${list(person.questions, 'plain-list missing')}</div></section><section><p class="section-label">Entity graph</p><h2>Direct sourced connections</h2><p class="section-intro">These links state only the narrow sourced relationship shown. They do not imply responsibility or prove attendance.</p>${connections.length ? `<div class="person-connections">${connectionList}</div>` : '<p class="empty-state">No direct graph relationship has been published for this person.</p>'}<div class="primary-action">${sourceLink('./people.html', 'Open full people and entity graph')}</div></section><section><p class="section-label">Timeline</p><h2>Events linked to this person</h2><div class="mini-event-list">${events.map(eventCard).join('')}</div></section>`;
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
