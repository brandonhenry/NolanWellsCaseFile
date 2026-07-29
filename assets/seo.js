(function () {
  'use strict';

  const origin = 'https://justicefornolanwells.com';
  const siteName = 'Nolan Wells Evidence File';
  const socialImage = `${origin}/assets/social-card.png`;
  const modified = '2026-07-28';
  const rawPath = location.pathname.replace(/\/{2,}/g, '/');
  const cleanRouteTargets = {
    '/timeline': '/index.html',
    '/event-timeline': '/event-timeline.html',
    '/master-notes': '/documents/master-investigation-notes.html',
    '/archive': '/archive.html',
    '/documents': '/documents.html',
    '/people': '/people.html',
    '/boats': '/boats.html',
    '/last-contact': '/last-contact.html',
    '/contradictions': '/contradictions.html',
    '/evidence-tracker': '/evidence-tracker.html',
    '/coordinates': '/coordinates.html',
    '/questions': '/questions.html',
    '/gaps': '/gaps.html',
    '/search': '/search.html'
  };
  const pagePath = cleanRouteTargets[rawPath] || rawPath;

  const pages = {
    '/': {
      canonical: '/',
      title: 'Nolan Wells Evidence Timeline · Horn Island Case File',
      description: 'Explore the sourced July 3–6, 2026 Nolan Wells timeline: Horn Island boat GPS records, witness accounts, Sea Tow audio, search activity, recovery, and unresolved evidence.',
      type: 'CollectionPage'
    },
    '/index.html': {
      canonical: '/',
      title: 'Nolan Wells Evidence Timeline · Horn Island Case File',
      description: 'Explore the sourced July 3–6, 2026 Nolan Wells timeline: Horn Island boat GPS records, witness accounts, Sea Tow audio, search activity, recovery, and unresolved evidence.',
      type: 'CollectionPage'
    },
    '/event-timeline.html': {
      canonical: '/event-timeline',
      title: 'Nolan Wells Timeline: Every Event, Source & Unknown',
      description: 'Search the full Nolan Wells case timeline with verified GPS milestones, witness accounts, media, confidence reasons, source comparisons, missing evidence, and unresolved gaps.',
      type: 'CollectionPage'
    },
    '/archive.html': {
      canonical: '/archive',
      title: 'Nolan Wells Evidence Archive: Documents, People & Boats',
      description: 'Browse the Nolan Wells evidence archive by official document, witness, vessel, coordinate, contradiction, open question, and missing record.',
      type: 'CollectionPage'
    },
    '/documents.html': {
      canonical: '/documents',
      title: 'Nolan Wells Case Documents & Official MDMR Records',
      description: 'Review official records, GPS graphics, transcripts, public media, and missing companion files in the Nolan Wells evidence archive.',
      type: 'CollectionPage'
    },
    '/people.html': {
      canonical: '/people',
      title: 'People & Witness Accounts · Nolan Wells Evidence File',
      description: 'Compare named public witness accounts, interviews, linked timeline events, and unresolved questions in the Nolan Wells case.',
      type: 'CollectionPage'
    },
    '/boats.html': {
      canonical: '/boats',
      title: 'Nolan Wells Boat Records, GPS Times & Vessel Evidence',
      description: 'Inspect vessel records in the Nolan Wells case while keeping verified GPS movement separate from passenger, phone, transfer, and intent claims.',
      type: 'CollectionPage'
    },
    '/last-contact.html': {
      canonical: '/last-contact',
      title: 'Nolan Wells Last Seen & Last Contact Accounts',
      description: 'Compare reported last sightings, last words, times, listeners, and confidence without collapsing different Nolan Wells witness accounts into one claim.',
      type: 'WebPage'
    },
    '/contradictions.html': {
      canonical: '/contradictions',
      title: 'Nolan Wells Case Contradictions & Source Comparison',
      description: 'A neutral comparison of public Nolan Wells narratives, supporting evidence, evidence in tension, and facts that remain unknown.',
      type: 'WebPage'
    },
    '/evidence-tracker.html': {
      canonical: '/evidence-tracker',
      title: 'Missing Evidence Tracker · Nolan Wells Case',
      description: 'Track which Nolan Wells records are public, obtained, referenced but missing, or still needed, including GPS exports, metadata, reports, and interviews.',
      type: 'Dataset'
    },
    '/coordinates.html': {
      canonical: '/coordinates',
      title: 'Nolan Wells Horn Island Coordinates & Map Evidence',
      description: 'Explore published and schematic Nolan Wells case coordinates with event context, map links, and straight-line distance comparisons.',
      type: 'Dataset'
    },
    '/questions.html': {
      canonical: '/questions',
      title: 'Open Questions in the Nolan Wells Case',
      description: 'Review unresolved Nolan Wells case questions, the evidence that frames each question, and the records needed to answer it.',
      type: 'WebPage'
    },
    '/gaps.html': {
      canonical: '/gaps',
      title: 'Nolan Wells Timeline Gaps: The Unresolved 3:45–4:31 PM Window',
      description: 'Examine the known anchors and unresolved intervals in the Nolan Wells timeline, including the central window on July 4, 2026 before the 4:31 PM vessel movement.',
      type: 'WebPage'
    },
    '/search.html': {
      canonical: '/search',
      title: 'Search the Nolan Wells Evidence File',
      description: 'Search Nolan Wells timeline events, transcript quotes, documents, witness records, boats, questions, contradictions, coordinates, and master notes.',
      type: 'SearchResultsPage',
      indexable: false
    },
    '/documents/master-investigation-notes.html': {
      canonical: '/master-notes',
      title: 'Nolan Wells Master Investigation Notes & Source Analysis',
      description: 'Read the controlling source analysis for the Nolan Wells evidence timeline, including the defensible reconstruction, GPS limits, witness claims, and critical unresolved window.',
      type: 'Report'
    },
    '/transcripts/seatow-audio.html': {
      canonical: '/transcripts/seatow-audio.html',
      title: 'Nolan Wells Sea Tow Call Audio, Transcript & Channel Analysis',
      description: 'Listen to the released Sea Tow call from July 4, 2026, compare isolated stereo channels, read the transcript, and review timing and speaker-identification limits.',
      type: 'Article'
    },
    '/transcripts/tracestin-part-5.html': {
      canonical: '/transcripts/tracestin-part-5.html',
      title: 'Tracestin Shepherd Interview Transcript · Nolan Wells Case',
      description: 'Read Tracestin Shepherd’s public account of anchoring, time with Nolan, the altercation, leaving Horn Island, and later search activity.',
      type: 'Article'
    },
    '/transcripts/warren-part-1.html': {
      canonical: '/transcripts/warren-part-1.html',
      title: 'Warren Interview Transcript Part 1 · Nolan Wells Case',
      description: 'Read part one of Warren’s public interview concerning Nolan Wells, the Horn Island trip, their relationship, and departure account.',
      type: 'Article'
    },
    '/transcripts/warren-part-2.html': {
      canonical: '/transcripts/warren-part-2.html',
      title: 'Warren Interview Transcript Part 2 · Nolan Wells Case',
      description: 'Read part two of Warren’s public interview concerning Nolan Wells and the Horn Island gathering.',
      type: 'Article'
    },
    '/transcripts/warren-part-3.html': {
      canonical: '/transcripts/warren-part-3.html',
      title: 'Warren Interview Transcript Part 3 · Nolan Wells Case',
      description: 'Read part three of Warren’s public interview, including questions about leaving Horn Island without Nolan.',
      type: 'Article'
    },
    '/transcripts/warren-part-4.html': {
      canonical: '/transcripts/warren-part-4.html',
      title: 'Warren Interview Transcript Part 4 · Nolan Wells Case',
      description: 'Read part four of Warren’s public interview concerning Nolan’s phone, keys, return plans, and later follow-up.',
      type: 'Article'
    }
  };

  const records = {
    document: {
      'mdmr-report': ['MDMR RMS Report MP2607-0016 · Nolan Wells Case', 'Official MDMR officer narratives, CAD information, vessel records, search notes, and summarized GPS chronology for the Nolan Wells case.'],
      'master-notes': ['Master Investigation Notes · Nolan Wells Evidence File', 'The controlling editorial evidence record for Nolan Wells timeline claims, evidence classifications, confidence, and unresolved questions.'],
      'sea-tow-call': ['Sea Tow Call Record · Nolan Wells Evidence File', 'Released Sea Tow audio, transcript, channel analysis, audible facts, timing limits, and missing original metadata.'],
      'viral-video': ['Horn Island Viral Video Record · Nolan Wells Case', 'Provenance, public reporting, visible and audible contents, source links, and unresolved native metadata for the circulated Horn Island video.'],
      'gps-0956': ['9:56 AM GPS Graphic · Nolan Wells Boat Timeline', 'Published GPS graphic and official context for MI4088BU’s 9:56 AM mainland departure on July 4, 2026.'],
      'gps-1114': ['11:14 AM GPS Graphic · Nolan Wells Boat Timeline', 'Published GPS graphic and official context for MI4088BU’s 11:14 AM arrival at Horn Island on July 4, 2026.'],
      'nolan-boat-photo': ['Nolan Wells Boat Photograph · July 4, 2026 Evidence Record', 'Circulated photograph from July 4, 2026, event context, provenance limitations, and missing original metadata.'],
      'warren-interviews': ['Warren Interview Transcripts · Nolan Wells Case', 'Four public interview transcript sections covering the trip, last sighting, departure accounts, phone, keys, and follow-up.'],
      'tracestin-interview': ['Tracestin Shepherd Interview · Nolan Wells Case', 'Public interview transcript covering anchoring, the afternoon, altercation, departure, and later search activity.']
    },
    person: {
      nolan: ['Nolan Wells · Case Timeline and Evidence Record', 'Timeline events, known evidence, unresolved questions, and source records concerning Nolan Xavier Wells.'],
      warren: ['Warren · Nolan Wells Witness Record', 'Warren’s public interviews, linked events, reported last sighting, departure account, and unresolved questions.'],
      tracestin: ['Tracestin Shepherd · Nolan Wells Witness Record', 'Tracestin Shepherd’s public interview, linked Horn Island events, departure account, and unresolved questions.'],
      katie: ['Katie · Nolan Wells Witness Record', 'Publicly reported interactions, linked timeline events, and unresolved questions concerning Katie and Nolan Wells.'],
      'anna-moore': ['Anna C. Moore · Horn Island Video Source Record', 'Source links, public reporting, video provenance, and unresolved metadata concerning the circulated Horn Island recording.'],
      wyatt: ['Wyatt · Nolan Wells Vessel Evidence Record', 'Publicly reported vessel association, linked distress-call and GPS events, and unresolved passenger questions.'],
      bart: ['Bart · Nolan Wells Boat and Waypoint Record', 'Public boat references, MI1295CB waypoint limitations, linked timeline events, and unresolved passenger questions.']
    },
    boat: {
      mi4088bu: ['Triton MI4088BU · Nolan Wells GPS and Boat Record', 'Officially summarized 9:56, 11:14, 4:31, 5:25, and 5:44 GPS milestones, evidence limits, and passenger unknowns.'],
      mi1295cb: ['MI1295CB · Nolan Wells Boat and Waypoint Record', 'Published waypoints and source limitations for MI1295CB; the archive does not render them as a continuous vessel track.'],
      'family-boat': ['Tracestin’s Family Boat · Nolan Wells Case Record', 'Witness-based vessel account, linked departure events, and unresolved identification and timing questions.'],
      'private-assistance': ['Private Assistance Vessel · Nolan Wells Case Record', 'Publicly reported private assistance, linked Sea Tow and GPS events, and unresolved vessel and participant identification.']
    }
  };

  function detailConfig(kind, baseTitle) {
    const id = new URLSearchParams(location.search).get('id') || '';
    const record = records[kind][id];
    if (!record) {
      return {
        canonical: `/${kind}.html`,
        title: `${baseTitle} · Nolan Wells Evidence File`,
        description: `Evidence record in the Nolan Wells public archive.`,
        type: 'WebPage',
        indexable: false
      };
    }
    return {
      canonical: `/${kind}.html?id=${encodeURIComponent(id)}`,
      title: record[0],
      description: record[1],
      type: 'WebPage'
    };
  }

  let page = pages[pagePath];
  if (!page && pagePath === '/document.html') page = detailConfig('document', 'Document Record');
  if (!page && pagePath === '/person.html') page = detailConfig('person', 'Person Record');
  if (!page && pagePath === '/boat.html') page = detailConfig('boat', 'Boat Record');
  if (!page) return;

  const canonical = `${origin}${page.canonical}`;

  function upsertMeta(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('meta');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  }

  function upsertLink(selector, attributes) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement('link');
      document.head.appendChild(element);
    }
    Object.entries(attributes).forEach(([name, value]) => element.setAttribute(name, value));
  }

  document.title = page.title;
  upsertMeta('meta[name="description"]', { name: 'description', content: page.description });
  upsertMeta('meta[name="robots"]', {
    name: 'robots',
    content: page.indexable === false
      ? 'noindex,follow'
      : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'
  });
  upsertMeta('meta[name="author"]', { name: 'author', content: siteName });
  upsertMeta('meta[property="og:type"]', { property: 'og:type', content: ['Article', 'Report'].includes(page.type) ? 'article' : 'website' });
  upsertMeta('meta[property="og:site_name"]', { property: 'og:site_name', content: siteName });
  upsertMeta('meta[property="og:locale"]', { property: 'og:locale', content: 'en_US' });
  upsertMeta('meta[property="og:title"]', { property: 'og:title', content: page.title });
  upsertMeta('meta[property="og:description"]', { property: 'og:description', content: page.description });
  upsertMeta('meta[property="og:url"]', { property: 'og:url', content: canonical });
  upsertMeta('meta[property="og:image"]', { property: 'og:image', content: socialImage });
  upsertMeta('meta[property="og:image:width"]', { property: 'og:image:width', content: '1200' });
  upsertMeta('meta[property="og:image:height"]', { property: 'og:image:height', content: '630' });
  upsertMeta('meta[property="og:image:alt"]', { property: 'og:image:alt', content: 'Nolan Wells Evidence File and Timeline, July 3–6, 2026, Horn Island, Mississippi' });
  upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: 'summary_large_image' });
  upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: page.title });
  upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: page.description });
  upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: socialImage });
  upsertMeta('meta[name="twitter:image:alt"]', { name: 'twitter:image:alt', content: 'Nolan Wells Evidence File and Timeline' });
  upsertLink('link[rel="canonical"]', { rel: 'canonical', href: canonical });
  upsertLink('link[rel="alternate"][type="text/plain"]', { rel: 'alternate', type: 'text/plain', title: 'AI-readable site guide', href: `${origin}/llms.txt` });

  const webPage = {
    '@type': page.type,
    '@id': `${canonical}#page`,
    name: page.title,
    description: page.description,
    url: canonical,
    isPartOf: { '@id': `${origin}/#website` },
    about: {
      '@type': 'Person',
      name: 'Nolan Xavier Wells',
      description: 'Subject of the July 2026 Horn Island disappearance, search, and recovery evidence file.'
    },
    dateModified: modified,
    inLanguage: 'en-US',
    primaryImageOfPage: { '@type': 'ImageObject', url: socialImage, width: 1200, height: 630 }
  };

  if (page.type === 'Article' || page.type === 'Report') {
    webPage.datePublished = '2026-07-28';
    webPage.author = { '@type': 'Organization', name: siteName, url: `${origin}/about` };
    webPage.publisher = { '@type': 'Organization', name: siteName, url: `${origin}/` };
  }

  const graph = [webPage];
  if (page.canonical === '/') {
    graph.unshift({
      '@type': 'WebSite',
      '@id': `${origin}/#website`,
      name: siteName,
      alternateName: ['Nolan Wells Timeline', 'Nolan Wells Case File', 'justicefornolanwells.com'],
      url: `${origin}/`,
      description: page.description,
      inLanguage: 'en-US'
    });
  }

  const structured = document.createElement('script');
  structured.type = 'application/ld+json';
  structured.id = 'seo-structured-data';
  structured.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
  document.head.appendChild(structured);
})();
