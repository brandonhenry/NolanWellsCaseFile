# Nolan Wells Evidence Timeline

A dependency-free static evidence timeline adapted from the public Subtxt Press Nolan map interaction at pinned reference commit `3f5771b37259c6990badfc5a2d42a2471656e4f6`.

The project’s own Master Investigation Notes control every factual claim. Subtxt is used as a visual and media-index reference, not as the evidentiary authority.

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

Clean routes are included for `/timeline`, `/event-timeline`, and `/master-notes`.

## Evidence architecture

- `index.html` — interactive scroll-driven map timeline
- `event-timeline.html` — searchable and filterable evidence log
- `assets/timeline-data.js` — shared event, evidence, source, map, and media data
- `documents/master-investigation-notes.html` — canonical working evidence file
- `documents/MDMR-MP2607-0016-report.pdf` — obtained official MDMR report
- `transcripts/` — bundled public interview and call transcripts
- `media/` — selected evidence media tied to retained entries

## Editorial rules

Every entry must declare:

- one primary evidence type: Verified, Firsthand Witness, Secondhand, or Hypothesis;
- a High, Medium, or Low confidence level;
- time precision;
- at least one master-note link and one stated supporting basis.

GPS positions establish vessel movement. They do not independently establish who was aboard, where Nolan was, or whether passengers transferred.
