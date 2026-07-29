# Nolan Wells Evidence Timeline

A dependency-free static evidence timeline adapted from the public Subtxt Press Nolan map interaction at pinned reference commit `3f5771b37259c6990badfc5a2d42a2471656e4f6`.

The project’s own Master Investigation Notes control every factual claim. Subtxt is used as a visual and media-index reference, not as the evidentiary authority.

Production canonical origin: `https://justicefornolanwells.com`

## Run locally

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Netlify deployment

The project is ready to publish without a build command:

1. Push this folder as the root of a Git repository, or drag the complete folder into Netlify Drop.
2. Import the repository in Netlify.
3. Netlify reads `netlify.toml` and publishes the project root.
4. The domain homepage loads `index.html` automatically.

Clean routes are included for the timeline, event log, master notes, archive,
documents, people, boats, last-contact matrix, contradictions, evidence
tracker, coordinate explorer, question tracker, timeline gaps, and global
search. The plain-language case summary is available at `/case-summary`, and
editorial methodology and corrections are available at `/about`.

## Evidence architecture

- `index.html` — interactive scroll-driven map timeline
- `event-timeline.html` — searchable and filterable evidence log
- `archive.html` — evidence-archive directory
- `search.html` — global search across events, transcripts, documents, people,
  boats, questions, contradictions, coordinates, and master notes
- `documents.html`, `people.html`, and `boats.html` — record indexes with
  linked detail pages
- `last-contact.html`, `contradictions.html`, `evidence-tracker.html`,
  `coordinates.html`, `questions.html`, and `gaps.html` — focused evidence
  analysis tools
- `assets/timeline-data.js` — shared event, evidence, source, map, and media data
- `assets/archive-data.js` — shared archive records, matrices, trackers, and
  file tree
- `documents/master-investigation-notes.html` — canonical working evidence file
- `documents/MDMR-MP2607-0016-report.pdf` — obtained official MDMR report
- `transcripts/` — bundled public interview and call transcripts
- `media/` — selected evidence media tied to retained entries

## Search and machine-readable discovery

- `sitemap.xml` — canonical page and evidence-record URLs
- `robots.txt` — open crawl policy and sitemap discovery
- `assets/seo.js` — unique rendered titles, descriptions, canonical URLs,
  social metadata, robots controls, and schema.org JSON-LD
- `assets/social-card.png` — 1200×630 social search/share preview
- `llms.txt` — concise AI-readable site and citation guide
- `llms-full.txt` — extended chronology, evidence vocabulary, source links, and
  warnings against overstating uncertain claims
- `case-summary.html` — static semantic HTML overview for users and crawlers
- `about.html` — source hierarchy, independence, revision history, and
  documented correction process

Internal search-result URLs are marked `noindex,follow`; underlying evidence
pages remain indexable.

## Editorial rules

Every entry must declare:

- one primary evidence type: Verified, Firsthand Witness, Secondhand, Media,
  Unknown, or Hypothesis;
- a High, Medium, or Low confidence level;
- time precision;
- at least one master-note link and one stated supporting basis.

Every timeline entry also exposes what is known or stated, what remains
unknown, which evidence is still needed, and how the available source classes
compare.

GPS positions establish vessel movement. They do not independently establish who was aboard, where Nolan was, or whether passengers transferred.
