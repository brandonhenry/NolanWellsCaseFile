(function () {
  'use strict';

  window.NOLAN_ARCHIVE = {
    sections: [
      { id: 'case-summary', title: 'Case Summary', description: 'Start with a sourced, plain-language account of what happened, what official GPS establishes, and what remains unresolved.', href: './case-summary.html', tone: 'verified' },
      { id: 'search', title: 'Search everything', description: 'Search events, transcript lines, documents, people, boats, questions, contradictions, and master-note sections.', href: './search.html', tone: 'verified' },
      { id: 'documents', title: 'Documents', description: 'Open every obtained source as a record with its status, contents, references, and missing companion files.', href: './documents.html', tone: 'media' },
      { id: 'plunder-release', title: 'PLUNDER Source Archive', description: 'Review the July 2026 source-post index, MDMR records, GPS material, search graphics, dispatch archive, and court-record collection.', href: './plunder-archive.html', tone: 'media' },
      { id: 'social-sources', title: 'Social Source Ledger', description: 'Review retained July 5–7, 2026 case-related images and relevant text-only comments with messages, timestamps, permalinks, hashes, and credibility assessments.', href: './social-source-ledger.html', tone: 'media' },
      { id: 'last-contact', title: 'Last Contact Matrix', description: 'Compare reported last sightings, last words, times, listeners, and confidence without collapsing them into one claim.', href: './last-contact.html', tone: 'firsthand' },
      { id: 'contradictions', title: 'Contradictions', description: 'Place public narratives beside supporting, conflicting, and still-missing evidence without accusing anyone.', href: './contradictions.html', tone: 'unknown' },
      { id: 'evidence-tracker', title: 'Missing Evidence Tracker', description: 'Track what is obtained, public, referenced but missing, or still needed—and whether a request status is documented.', href: './evidence-tracker.html', tone: 'media' },
      { id: 'coordinates', title: 'Coordinate Explorer', description: 'Open every published or schematic coordinate with its event context, map links, and distances.', href: './coordinates.html', tone: 'verified' },
      { id: 'questions', title: 'Question Tracker', description: 'Keep each unresolved question attached to the evidence that frames it and the record needed to answer it.', href: './questions.html', tone: 'unknown' },
      { id: 'people', title: 'People', description: 'Person-centered timelines, interviews, evidence links, and open questions.', href: './people.html', tone: 'firsthand' },
      { id: 'boats', title: 'Boats', description: 'Vessel-centered timelines separating GPS facts, passenger claims, photos, and unresolved assignments.', href: './boats.html', tone: 'verified' },
      { id: 'gaps', title: 'Timeline Gaps', description: 'A dedicated view of the unresolved intervals between known anchors.', href: './gaps.html', tone: 'unknown' },
      { id: 'methodology', title: 'Methodology & Corrections', description: 'Review the evidence rules, source hierarchy, independence statement, revision history, and correction process.', href: './about.html', tone: 'media' }
    ],

    documents: [
      {
        id: 'mdmr-report',
        title: 'MDMR RMS Report · MP2607-0016',
        kind: 'Official report',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High',
        href: './documents/MDMR-MP2607-0016-report.pdf',
        summary: 'The obtained 15-page Mississippi Department of Marine Resources packet contains officer narratives, CAD entries, vessel-registration information, search notes, and a summarized GPS chronology.',
        contents: ['GPS chronology for MI4088BU', 'Officer narratives and CAD entries', 'Vessel registrations', 'Search and drone activity', 'Later deceased-person CAD event'],
        referencedEvents: ['gps-departure', 'gps-arrival', 'triton-pre-430-repositioning', 'seatow-anchor-overlap', 'gps-movement-431', 'gps-normal-525', 'gps-return-544', 'mdmr-missing-cad-1145', 'jcso-working-assumption-0138', 'overnight-response-gap', 'family-private-search-0600', 'official-search', 'drone-request-and-failures', 'female-lead-1155', 'drone-searches-1240', 'anchor-position-1630', 'command-post-sonar', 'body-found', 'recovery-cad-entries'],
        missingCompanions: ['Native Garmin export', 'Native drone flight records', 'Publicly redacted permission-to-search copies']
      },
      {
        id: 'plunder-release',
        title: 'PLUNDER July 2026 Source Archive',
        kind: 'Source archive index',
        status: 'Partially published',
        availability: 'Public index with selected source files',
        confidence: 'Source-specific',
        href: './plunder-archive.html',
        summary: 'A provenance and source-file index for four PLUNDER Patreon posts containing MDMR companions, search graphics, dispatch archives, and court records.',
        contents: ['Four source posts dated July 12–28, 2026', '144 original attachments', '130 unique attachment files after duplicate-content review plus one matching embedded Sea Tow working copy', 'Six files available on this site', 'Dispatch archive counts and overlap', 'Additional source-file names and SHA-256 checksums'],
        referencedEvents: ['gps-departure', 'gps-arrival', 'gps-movement-431', 'gps-normal-525', 'gps-return-544', 'female-lead-1155', 'drone-searches-1240', 'anchor-position-1630', 'sar-model-request-2152', 'body-found'],
        missingCompanions: ['Native dispatch metadata', 'Complete official versions of every referenced companion record']
      },
      {
        id: 'gps-extraction-summary',
        title: 'MI4088BU GPS Extraction Summary · Redacted',
        kind: 'Official GPS extraction summary',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the summarized vessel record',
        href: './documents/plunder/MI4088BU-GPS-Extraction-Summary-Redacted.pdf',
        summary: 'A two-page redacted MDMR extraction summary for MI4088BU. It supports the displayed vessel milestones but does not establish who was aboard.',
        contents: ['Extraction narrative', 'Summarized timestamp table', 'Redacted identifying fields'],
        referencedEvents: ['gps-departure', 'gps-arrival', 'seatow-anchor-overlap', 'gps-movement-431', 'gps-normal-525', 'gps-return-544', 'anchor-position-1630'],
        missingCompanions: ['Native Garmin ADM / GPX export', 'Extraction software logs and methodology']
      },
      {
        id: 'mdmr-uscg-sar-email',
        title: 'MDMR Email to USCG · SAR Data Request',
        kind: 'Official interagency communication',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the document contents',
        href: './documents/plunder/MP2607-0016-MDMR-to-USCG-SAR-Email.pdf',
        summary: 'An MDMR email requesting U.S. Coast Guard search-and-rescue data, preserving the request context, coordinates, and time references contained in the released record.',
        contents: ['SAR-data request', 'Published coordinates', 'Interagency context'],
        referencedEvents: ['sar-model-request-2152'],
        missingCompanions: ['Native email export and headers', 'Complete USCG response package']
      },
      {
        id: 'strickland-supplement',
        title: 'J. Strickland Supplemental Report · MP2607-0016',
        kind: 'Official supplemental report',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the document contents',
        href: './documents/plunder/MP2607-0016-Strickland-Supplement.pdf',
        summary: 'A one-page redacted supplemental report from the MDMR case-file release, published with its original redactions intact.',
        contents: ['Officer narrative', 'Case reference', 'Released redactions'],
        referencedEvents: ['female-lead-1155', 'anchor-position-1630'],
        missingCompanions: ['Native records-system export and attachment history']
      },
      {
        id: 'uscg-particle-drift',
        title: 'USCG Particle-Drift Graphic',
        kind: 'Search-analysis graphic',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the visible graphic; model inputs require source context',
        href: './media/plunder/USCG-Particle-Drift.png',
        summary: 'The released U.S. Coast Guard particle-drift image. It is presented as a search-analysis artifact, not as proof of Nolan’s path through the water.',
        contents: ['Drift-model visualization', 'Visible search context', 'Released image'],
        referencedEvents: ['sar-model-request-2152'],
        missingCompanions: ['Native model file', 'Complete inputs, run settings, and explanatory report']
      },
      {
        id: 'drone-search-grid',
        title: 'Drone Search Grid',
        kind: 'Search graphic',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the visible graphic',
        href: './media/plunder/Drone-Search-Grid.jpg',
        summary: 'A released drone-search grid image associated with the MDMR case-file materials. The image documents a planned or displayed search area; native flight records remain unavailable.',
        contents: ['Search-grid image', 'Visible coordinates and area context'],
        referencedEvents: ['drone-searches-1240'],
        missingCompanions: ['Native flight logs', 'Drone imagery and operator report']
      },
      {
        id: 'letters-administration',
        title: 'Letters of Administration · Nolan Wells Estate',
        kind: 'Court record',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High for the filed court record',
        href: './documents/plunder/Nolan-Wells-Letters-of-Administration.pdf',
        summary: 'A one-page court order concerning administration of Nolan Wells’s estate, released in the July 28, 2026 PLUNDER source post.',
        contents: ['Court caption', 'Appointment order', 'Filing context'],
        referencedEvents: [],
        missingCompanions: ['Complete public docket and later filings']
      },
      {
        id: 'master-notes',
        title: 'Master Investigation Notes · Version 2.3',
        kind: 'Working evidence synthesis',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'Working document',
        href: './documents/master-investigation-notes.html',
        summary: 'The canonical editorial record controlling the site’s claims, evidence classifications, confidence levels, and unresolved questions.',
        contents: ['Defensible reconstruction', 'Critical overlap', 'Nearshore photo and offshore coordinate comparison', 'August 3 UCN image release and pre-4:31 repositioning finding', 'Sea Tow and Garmin coordinate comparison', 'July 4 late-night reporting', 'July 5 search chronology', 'July 6 recovery chronology', 'GPS limits', 'Boat distinctions', 'Witness notes', 'Expanded social-source review', 'Narrative formation ledger', 'Cover-up hypothesis test', 'Anti-lock-in protocol', 'Evidence gaps'],
        referencedEvents: ['critical-overlap', 'seatow-anchor-overlap', 'horn-island-overnight-presence', 'family-contacted', 'mdmr-missing-cad-1145', 'jcso-working-assumption-0138', 'overnight-response-gap', 'family-private-search-0600', 'official-search', 'drone-request-and-failures', 'female-lead-1155', 'coast-guard-public-activation', 'drone-searches-1240', 'anchor-position-1630', 'command-post-sonar', 'sar-model-request-2152', 'overnight-search-mobilization', 'ucn-aircraft-boats', 'body-found', 'recovery-cad-entries', 'coroner-family-confirmation', 'accounts-nolan-stays', 'viral-video', 'katie-five-oclock-message', 'faith-lauren-reporting-intent'],
        missingCompanions: ['Future revisions when stronger primary evidence becomes public']
      },
      {
        id: 'social-comment-ledger',
        title: 'July 2026 Social Post, Comment & Media Ledger',
        kind: 'Source-preservation ledger',
        status: 'Obtained public copies',
        availability: 'Public on this site',
        confidence: 'Claim-specific',
        href: './social-source-ledger.html',
        summary: 'Preserves case-related material from five July 5–7 Facebook threads plus public posts containing screenshots attributed to Katie Hudson Seymour and Faith Lauren, with visible times, permalinks, local copies, hashes, and claim-level assessments.',
        contents: ['Attributed Faith Lauren witness and reporting-intent screenshots', 'Attributed Katie Hudson Seymour message screenshots and 5:00 PM claim', 'East Tip scene submissions', 'Lucas Aviz apparent last-contact screenshot', 'Stephen Ray tentative sighting', 'Anna C. Moore clarification', 'Ivy Elizabeth direct reply', 'Katelynn Brochard ambiguous timing reply', 'Matthew Lamp passenger-account screenshots', 'Search-participation reports', 'Machine-readable JSON ledger', 'SHA-256 hashes'],
        referencedEvents: ['faith-lauren-reporting-intent', 'katie-five-oclock-message', 'lucas-aviz-last-contact', 'stephen-ray-east-end-sighting', 'ivy-video-account', 'katelynn-nearby-boats-account', 'lamp-passenger-account', 'east-tip-photo-submission', 'family-private-search-0600', 'official-search', 'anna-clarification'],
        missingCompanions: ['Authenticated Faith Lauren statement, native message export, original footage, and police evidence receipt', 'Authenticated export of the attributed Katie Hudson Seymour conversation', 'Forensic export of every comment and reply', 'Direct July 2026 JCSO and Mississippi NAACP Facebook post permalinks', 'Original device files and metadata', 'Original Matthew Lamp and Lucas Aviz parent threads', 'Direct statements from the unnamed Matthew Lamp passengers']
      },
      {
        id: 'sea-tow-call',
        title: 'Released Sea Tow / Dispatch Call',
        kind: 'Released official audio publication',
        status: 'Obtained',
        availability: 'Public audio and transcript',
        confidence: 'High for audible contents',
        href: './transcripts/seatow-audio.html#audio-analysis',
        summary: 'The released call records water ingress, bilge-pump failure, approximately seven people aboard, the caller’s current coordinate west of Horn Island, and later cancellation after private help was arranged.',
        contents: ['Full 9:46 publication', 'First 3:21 stereo excerpt', 'Caller/boat channel', 'Dispatcher channel', 'Spoken coordinate', 'Transcript'],
        referencedEvents: ['sea-tow-call', 'seatow-anchor-overlap', 'private-assistance', 'critical-overlap', 'gps-movement-431'],
        missingCompanions: ['Original Sea Tow machine export', 'Authenticated call-start metadata', 'Contemporaneous position log', 'Complete participant identification']
      },
      {
        id: 'viral-video',
        title: 'Circulated Horn Island Video',
        kind: 'Public media',
        status: 'Obtained copy',
        availability: 'Public on this site',
        confidence: 'Medium',
        href: './media/2026-07-04-tracetin-fighting.mp4',
        summary: 'The circulated clip is public, but the project has not obtained the original device file or authenticated its reported 4:01 PM capture time.',
        contents: ['Circulated video copy', 'Public X provenance', 'TMZ owner account', 'Tracestin voice identification'],
        referencedEvents: ['viral-video', 'anna-videographer-attribution', 'altercation', 'critical-overlap'],
        missingCompanions: ['Original device file', 'Native metadata', 'Unedited adjacent footage', 'Complete visual and voice identifications']
      },
      {
        id: 'gps-0956',
        title: '9:56 AM GPS Graphic · MI4088BU',
        kind: 'Published GPS graphic',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High when read with MDMR report',
        href: './media/0956-MI4088BU-depart-from-El-Camino-Real-Rd.png',
        summary: 'Graphic depicting the tracked vessel’s 9:56 AM mainland departure.',
        contents: ['Timestamp', 'Vessel label', 'Departure context'],
        referencedEvents: ['gps-departure'],
        missingCompanions: ['Native export and extraction methodology']
      },
      {
        id: 'gps-1114',
        title: '11:14 AM GPS Graphic · MI4088BU',
        kind: 'Published GPS graphic',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'High when read with MDMR report',
        href: './media/1114-MI4088BU-arrives-at-West-Tip-of-Horn-Island.png',
        summary: 'Graphic depicting the tracked vessel’s 11:14 AM arrival at the west tip of Horn Island.',
        contents: ['Timestamp', 'Vessel label', 'Arrival context'],
        referencedEvents: ['gps-arrival'],
        missingCompanions: ['Native export and extraction methodology']
      },
      {
        id: 'nolan-boat-photo',
        title: 'Nolan on Boat · July 4, 2026',
        kind: 'Circulated photograph',
        status: 'Obtained copy',
        availability: 'Public on this site',
        confidence: 'Medium',
        href: './media/2026-07-04-Nolan-on-boat-with-bros.png',
        summary: 'A circulated image places Nolan with friends during the Horn Island gathering, but its exact capture time is not authenticated.',
        contents: ['Visible people and boat context'],
        referencedEvents: ['early-afternoon'],
        missingCompanions: ['Original file', 'EXIF metadata', 'Photographer statement', 'Vessel identification']
      },
      {
        id: 'warren-interviews',
        title: 'Warren Interview · Parts 1–4',
        kind: 'Named public interview',
        status: 'Obtained transcript',
        availability: 'Public on this site',
        confidence: 'Medium',
        href: './transcripts/warren-part-1.html',
        summary: 'Four transcript sections covering the trip, reported last sighting, departure accounts, phone, keys, and follow-up.',
        contents: ['Part 1 · trip and departure', 'Part 2 · Horn Island standup', 'Part 3 · departure questions', 'Part 4 · phone and keys'],
        referencedEvents: ['warren-last-sighting', 'accounts-nolan-stays', 'phone-and-passenger-account', 'family-contacted'],
        missingCompanions: ['Complete unedited source interview and original recording metadata']
      },
      {
        id: 'tracestin-interview',
        title: 'Tracestin Interview · Part 5',
        kind: 'Named public interview',
        status: 'Obtained transcript',
        availability: 'Public on this site',
        confidence: 'Medium',
        href: './transcripts/tracestin-part-5.html',
        summary: 'Transcript covering anchoring, time with Nolan, the altercation, being forced aboard, departure, and later search activity.',
        contents: ['Anchoring account', 'Daytime account', 'Altercation sequence', 'Departure account', 'Search account'],
        referencedEvents: ['anchoring-calls', 'altercation', 'forced-aboard', 'nolan-nearby-account', 'viral-video', 'tracestin-leaves'],
        missingCompanions: ['Complete unedited source interview and original recording metadata']
      }
    ],

    people: [
      {
        id: 'nolan',
        name: 'Nolan Wells',
        role: 'Subject of the timeline',
        summary: 'The evidence file follows Nolan’s departure from home on July 3, 2026, the Horn Island trip on July 4, 2026, his disappearance, the search, and his recovery on July 6, 2026.',
        eventIds: ['last-evening-home', 'gps-departure', 'anchoring-calls', 'gps-arrival', 'early-afternoon', 'warren-last-sighting', 'nolan-nearby-account', 'accounts-nolan-stays', 'phone-and-passenger-account', 'family-contacted', 'mdmr-missing-cad-1145', 'jcso-working-assumption-0138', 'family-private-search-0600', 'official-search', 'body-found', 'coroner-family-confirmation'],
        interviews: [],
        questions: ['What is the last independently corroborated sighting?', 'What were Nolan’s exact last words and who heard them?', 'What return plan did Nolan understand?']
      },
      {
        id: 'christine-wonsley',
        name: 'Christine Wonsley',
        role: 'Nolan’s mother and public appeal source',
        summary: 'Wonsley published the July 5, 2026 missing-person appeal reviewed by this archive. Public records and contemporaneous reporting identify her as Nolan’s mother; her appeal became a central source for search updates and submitted media.',
        eventIds: ['family-contacted', 'mdmr-missing-cad-1145', 'late-night-family-search', 'family-private-search-0600', 'official-search', 'east-tip-photo-submission', 'body-found', 'coroner-family-confirmation'],
        interviews: [
          { label: 'July 5 public appeal and source audit', href: './social-source-ledger.html#parent-heading' },
          { label: 'Public Facebook profile', href: 'https://www.facebook.com/christine.wonsley' }
        ],
        questions: ['What is the exact authenticated family-notification time?', 'Which original media files and messages were submitted directly to the appeal?', 'Which search updates were independently confirmed before publication?'],
        recordStatus: 'Named family and public source'
      },
      {
        id: 'warren',
        name: 'Warren',
        role: 'Friend and public witness',
        summary: 'Warren publicly discusses the trip, his reported last personal sighting, efforts to get Nolan to leave, and the phone and keys.',
        eventIds: ['warren-last-sighting', 'accounts-nolan-stays', 'phone-and-passenger-account', 'family-contacted', 'late-night-family-search'],
        interviews: [
          { label: 'Part 1', href: './transcripts/warren-part-1.html' },
          { label: 'Part 2', href: './transcripts/warren-part-2.html' },
          { label: 'Part 3', href: './transcripts/warren-part-3.html' },
          { label: 'Part 4', href: './transcripts/warren-part-4.html' }
        ],
        questions: ['What was Warren’s exact last visual contact?', 'What exact words did Nolan use about staying?', 'Who else heard the same exchange?']
      },
      {
        id: 'tracestin',
        name: 'Tracestin Shepherd',
        role: 'Friend and public witness',
        summary: 'Tracestin describes helping with anchoring, spending much of the day with the group, the altercation, being forced aboard, leaving, and later search activity.',
        eventIds: ['anchoring-calls', 'altercation', 'forced-aboard', 'nolan-nearby-account', 'viral-video', 'tracestin-leaves'],
        interviews: [{ label: 'Interview · Part 5', href: './transcripts/tracestin-part-5.html' }],
        questions: ['What was the exact time of the altercation?', 'When did his family boat depart?', 'Who can independently corroborate Nolan’s reported nearby position?']
      },
      {
        id: 'katie',
        name: 'Katie',
        role: 'Reported island witness',
        summary: 'Public accounts place Nolan interacting with Katie; reporting also says she believed he was returning on his original boat.',
        eventIds: ['warren-last-sighting', 'accounts-nolan-stays'],
        interviews: [],
        questions: ['What was their complete conversation?', 'What was their last contact time?', 'Why did she believe Nolan was returning on his original boat?']
      },
      {
        id: 'anna-moore',
        name: 'Anna C. Moore',
        role: 'Original videographer / uploader',
        summary: 'Moore is identified as the owner of the circulated Horn Island video. In a direct July 7 clarification, she says she never saw Nolan and never claimed the recorded argument involved him.',
        eventIds: ['viral-video', 'anna-videographer-attribution', 'anna-clarification'],
        interviews: [
          { label: 'Supplied Facebook profile', href: 'https://www.facebook.com/share/19EttKhMgq/?mibextid=wwXIfr' },
          { label: 'Direct July 7 clarification', href: 'https://www.facebook.com/anna.grace.cooper/posts/pfbid02bimdnAUwCFJCZJdYb8Mm5s1uqGqcMjYiA1G6yLdYnPMA8Mm8jEJYu1zoxcPVkeYdl' },
          { label: 'Original X post', href: 'https://x.com/RIPTWITTA/status/2074205423608246317' },
          { label: 'TMZ owner account', href: 'https://www.tmz.com/2026/07/10/photographer-who-took-viral-nolan-wells-video-says-he-didnt-fight/' }
        ],
        questions: ['What is the original file metadata?', 'What vessel and position was she recording from?', 'What footage exists immediately before and after?']
      },
      {
        id: 'wyatt',
        name: 'Wyatt',
        role: 'Person associated with the distressed Triton in public accounts',
        summary: 'The public record discussed by this project leaves Wyatt’s complete timeline, last interaction with Nolan, and passenger details incomplete.',
        eventIds: ['sea-tow-call', 'private-assistance', 'gps-movement-431'],
        interviews: [],
        questions: ['What was Wyatt’s last interaction with Nolan?', 'Who was aboard at each stage?', 'Who arranged private assistance?']
      },
      {
        id: 'bart',
        name: 'Bart',
        role: 'Boat owner / witness named in the working record',
        summary: 'Bart’s vessel MI1295CB appears through waypoints in the obtained packet, but the project does not have a continuous track or complete passenger account.',
        eventIds: ['early-afternoon', 'gps-movement-431'],
        interviews: [],
        questions: ['What was Bart’s complete July 4, 2026 timeline?', 'Who occupied MI1295CB?', 'What do the individual waypoints represent?']
      },
      {
        id: 'morgan-seymour',
        name: 'Morgan Seymour',
        role: 'Reported friend; July 4 attendance unresolved',
        summary: 'Atlanta Black Star identifies Seymour among Nolan’s friends and says its reporter sought comment from him. Jack Jordan’s visible Facebook friends page also listed Seymour’s supplied profile. Neither source independently establishes that Seymour was aboard a July 4 vessel or present at Horn Island.',
        eventIds: [],
        interviews: [
          { label: 'Atlanta Black Star reporting', href: 'https://atlantablackstar.com/2026/07/07/nolan-wells-grandfather-heightens-suspicions-about-foul-play-with-cryptic-social-media-posts/' },
          { label: 'Public Facebook profile', href: 'https://www.facebook.com/profile.php?id=61559199283116' },
          { label: 'Jack Jordan friends-page source', href: 'https://www.facebook.com/jack.jordan.650551/friends_all' }
        ],
        questions: ['Was Seymour aboard any vessel traveling to or from Horn Island on July 4, 2026?', 'Which boat, departure, or passenger source establishes his location?', 'Is he visible in authenticated July 4 media?', 'Did he provide a statement to investigators or news media?'],
        recordStatus: 'Reported friend; attendance unverified'
      },
      {
        id: 'lucas-aviz',
        name: 'Lucas Aviz',
        role: 'Screenshot-preserved source claimant',
        summary: 'A derivative screenshot attributes to Aviz an apparent firsthand conversation with Nolan and a later boat sighting around 2:00–2:30 PM. The parent post and direct comment permalink have not been recovered.',
        eventIds: ['lucas-aviz-last-contact'],
        interviews: [{ label: 'Preserved source record', href: './social-source-ledger.html#lucas-aviz-last-contact' }],
        questions: ['Can the original parent thread and direct comment be recovered?', 'Which white center-console boat did he describe?', 'Who else heard or saw the reported interaction?'],
        recordStatus: 'Low-confidence public lead'
      },
      {
        id: 'stephen-ray',
        name: 'Stephen Ray',
        role: 'Screenshot-preserved source claimant',
        summary: 'A derivative screenshot preserves Ray’s expressly tentative statement that “we” may have seen Nolan on an east-end sand dune. It contains no exact time or independent identification.',
        eventIds: ['stephen-ray-east-end-sighting'],
        interviews: [{ label: 'Preserved source record', href: './social-source-ledger.html#stephen-ray-sighting' }],
        questions: ['Who did “we” refer to?', 'What was the time and precise location?', 'What observation supported the identification?'],
        recordStatus: 'Low-confidence public lead'
      },
      {
        id: 'ivy-elizabeth',
        name: 'Ivy Elizabeth',
        role: 'Named public source claimant',
        summary: 'In a direct public reply, Ivy describes the altercation-video sequence, says she and her husband appear on a boat, and makes an explicitly uncertain identification of a background figure resembling Nolan.',
        eventIds: ['ivy-video-account'],
        interviews: [{ label: 'Direct reply and assessment', href: './social-source-ledger.html#ivy-video-account' }],
        questions: ['Which vessel was she aboard?', 'Who was the background figure?', 'Can the original media metadata authenticate the sequence and time?'],
        recordStatus: 'Named firsthand account'
      },
      {
        id: 'katelynn-brochard',
        name: 'Katelynn Brochard',
        role: 'Named public source claimant',
        summary: 'A direct public reply mentions nearby boats, approximately 5:00 PM, and 7:30 PM, but does not identify the vessel, location, or pronoun referents. It is retained as context—not a Nolan sighting.',
        eventIds: ['katelynn-nearby-boats-account'],
        interviews: [{ label: 'Direct reply and assessment', href: './social-source-ledger.html#katelynn-boats-account' }],
        questions: ['What boat and location did “we” refer to?', 'Who did “they” refer to?', 'What did “where he was” mean?'],
        recordStatus: 'Ambiguous firsthand context'
      },
      {
        id: 'matthew-lamp',
        name: 'Matthew Lamp',
        role: 'Secondhand public source claimant',
        summary: 'Screenshots attribute to Lamp a secondhand account from unnamed passengers about an “almost” fight and a separate boat departure. The original thread and direct passenger statements are not in the archive.',
        eventIds: ['lamp-passenger-account'],
        interviews: [{ label: 'Preserved source record', href: './social-source-ledger.html#matthew-lamp-lead' }],
        questions: ['Who were the unnamed passengers?', 'What vessel were they on?', 'Can the original thread and exact event time be authenticated?'],
        recordStatus: 'Low-confidence secondhand lead'
      }
    ],

    entityGraph: {
      updated: 'July 30, 2026',
      entities: [
        { id: 'mi4088bu', name: 'MI4088BU', type: 'vessel', detail: 'GPS-tracked Triton', href: './boat.html?id=mi4088bu' },
        { id: 'mi1295cb', name: 'MI1295CB', type: 'vessel', detail: 'Waypoint-only vessel record', href: './boat.html?id=mi1295cb' },
        { id: 'family-boat', name: 'Family boat', type: 'vessel', detail: 'Tracestin’s witness-described vessel', href: './boat.html?id=tracestin-family-boat' },
        { id: 'viral-video-record', name: 'Viral video', type: 'media', detail: 'Circulated Horn Island clip', href: './document.html?id=viral-video' },
        { id: 'mdmr', name: 'MDMR', type: 'agency', detail: 'Official marine-resources record', href: './document.html?id=mdmr-report' },
        { id: 'sea-tow', name: 'Sea Tow call', type: 'record', detail: 'Released distress-call publication', href: './document.html?id=sea-tow-call' },
        { id: 'horn-island', name: 'Horn Island', type: 'location', detail: 'July 4 gathering and search area', href: './coordinates.html' }
      ],
      relationships: [
        { id: 'nolan-warren', from: 'nolan', to: 'warren', label: 'Friends / same trip group', status: 'firsthand', confidence: 'Medium', claim: 'Warren publicly describes traveling with Nolan and his own interactions with him.', sourceLabel: 'Warren interview · Part 1', source: './transcripts/warren-part-1.html' },
        { id: 'nolan-christine', from: 'nolan', to: 'christine-wonsley', label: 'Mother / public appeal source', status: 'firsthand', confidence: 'High', claim: 'The public appeal and source record identify Wonsley as Nolan’s mother and document her role publishing the July 5 missing-person appeal.', sourceLabel: 'Christine Wonsley appeal audit', source: './social-source-ledger.html#parent-heading' },
        { id: 'nolan-morgan', from: 'nolan', to: 'morgan-seymour', label: 'Reported friend', status: 'reported', confidence: 'Medium', claim: 'Atlanta Black Star identifies Morgan Seymour among Nolan’s friends and says its reporter sought comment; the report does not establish July 4 boat or island attendance.', sourceLabel: 'Atlanta Black Star · July 7', source: 'https://atlantablackstar.com/2026/07/07/nolan-wells-grandfather-heightens-suspicions-about-foul-play-with-cryptic-social-media-posts/' },
        { id: 'nolan-tracestin', from: 'nolan', to: 'tracestin', label: 'Friends / island contact', status: 'firsthand', confidence: 'Medium', claim: 'Tracestin publicly describes anchoring calls and spending much of July 4 with Nolan.', sourceLabel: 'Tracestin interview · Part 5', source: './transcripts/tracestin-part-5.html' },
        { id: 'nolan-katie', from: 'nolan', to: 'katie', label: 'Reported afternoon interaction', status: 'reported', confidence: 'Low', claim: 'Public accounts place Nolan interacting with Katie; their exact conversation and last-contact time remain unresolved.', sourceLabel: 'Master notes · Katie', source: './documents/master-investigation-notes.html#katie' },
        { id: 'nolan-mi4088bu', from: 'nolan', to: 'mi4088bu', label: 'Reported outbound passenger', status: 'reported', confidence: 'Medium', claim: 'Witness and official-summary material associate Nolan with the outbound boat; GPS alone does not identify passengers.', sourceLabel: 'Master notes · GPS limits', source: './documents/master-investigation-notes.html#what-gps-does-not-tell-us' },
        { id: 'warren-mi4088bu', from: 'warren', to: 'mi4088bu', label: 'Publicly described trip vessel', status: 'firsthand', confidence: 'Medium', claim: 'Warren’s public interview associates his July 4 travel account with Nolan’s original boat group.', sourceLabel: 'Warren interview · Part 1', source: './transcripts/warren-part-1.html' },
        { id: 'tracestin-family-boat', from: 'tracestin', to: 'family-boat', label: 'Reported family travel vessel', status: 'firsthand', confidence: 'Medium', claim: 'Tracestin says he traveled with family on his uncle’s separate vessel and left on it.', sourceLabel: 'Tracestin interview · Part 5', source: './transcripts/tracestin-part-5.html' },
        { id: 'tracestin-video', from: 'tracestin', to: 'viral-video-record', label: 'Identifies his yelling voice', status: 'firsthand', confidence: 'Medium', claim: 'Tracestin publicly identifies himself as the person yelling in the circulated clip.', sourceLabel: 'Viral-video evidence record', source: './event-timeline.html#viral-video' },
        { id: 'anna-video', from: 'anna-moore', to: 'viral-video-record', label: 'Recorded / supplied clip', status: 'firsthand', confidence: 'High', claim: 'Moore’s direct clarification establishes her ownership and handling of the clip while denying that she saw Nolan.', sourceLabel: 'Anna C. Moore clarification', source: './social-source-ledger.html#anna-clarification' },
        { id: 'ivy-video', from: 'ivy-elizabeth', to: 'viral-video-record', label: 'Describes scene and occupants', status: 'firsthand', confidence: 'Medium', claim: 'Ivy says she and her husband appear on a boat in the scene and describes the post-altercation sequence.', sourceLabel: 'Ivy direct reply', source: './social-source-ledger.html#ivy-video-account' },
        { id: 'wyatt-mi4088bu', from: 'wyatt', to: 'mi4088bu', label: 'Associated with distressed vessel', status: 'reported', confidence: 'Medium', claim: 'Public accounts associate Wyatt with the distressed Triton; the complete passenger record is not public.', sourceLabel: 'Sea Tow evidence section', source: './event-timeline.html#sea-tow-call' },
        { id: 'bart-mi1295cb', from: 'bart', to: 'mi1295cb', label: 'Named vessel owner', status: 'official', confidence: 'High', claim: 'The working official record associates Bart with MI1295CB waypoints; it does not supply a continuous track.', sourceLabel: 'MDMR report', source: './documents/MDMR-MP2607-0016-report.pdf' },
        { id: 'lucas-nolan', from: 'lucas-aviz', to: 'nolan', label: 'Claims conversation / sighting', status: 'lead', confidence: 'Low', claim: 'A derivative screenshot attributes a 2:00–2:30 PM conversation and boat sighting to Aviz.', sourceLabel: 'Preserved Lucas Aviz record', source: './social-source-ledger.html#lucas-aviz-last-contact' },
        { id: 'stephen-nolan', from: 'stephen-ray', to: 'nolan', label: 'Tentative sighting claim', status: 'lead', confidence: 'Low', claim: 'A screenshot preserves an expressly tentative east-end sighting statement.', sourceLabel: 'Preserved Stephen Ray record', source: './social-source-ledger.html#stephen-ray-sighting' },
        { id: 'matthew-horn-island', from: 'matthew-lamp', to: 'horn-island', label: 'Relays unnamed-passenger account', status: 'lead', confidence: 'Low', claim: 'Lamp relays an account attributed to unnamed passengers; this does not establish his own attendance.', sourceLabel: 'Preserved Matthew Lamp record', source: './social-source-ledger.html#matthew-lamp-lead' },
        { id: 'katelynn-horn-island', from: 'katelynn-brochard', to: 'horn-island', label: 'Describes nearby-boats context', status: 'lead', confidence: 'Low', claim: 'Her wording suggests relevant nearby-boats context, but exact vessel, location, and referents are unresolved.', sourceLabel: 'Katelynn direct reply', source: './social-source-ledger.html#katelynn-boats-account' },
        { id: 'mdmr-mi4088bu', from: 'mdmr', to: 'mi4088bu', label: 'Official GPS chronology', status: 'official', confidence: 'High', claim: 'The MDMR report publishes summarized GPS milestones for MI4088BU.', sourceLabel: 'MDMR report · pages 5 and 7', source: './documents/MDMR-MP2607-0016-report.pdf#page=5' },
        { id: 'seatow-mi4088bu', from: 'sea-tow', to: 'mi4088bu', label: 'Distress-call vessel', status: 'official', confidence: 'High', claim: 'The released call concerns the distressed vessel and reports water ingress, pump failure, and private help.', sourceLabel: 'Sea Tow call and transcript', source: './transcripts/seatow-audio.html' }
      ]
    },

    socialContext: {
      updated: 'July 30, 2026',
      sourceLabel: 'Jack Jordan · visible Facebook friends page',
      source: 'https://www.facebook.com/jack.jordan.650551/friends_all',
      hub: {
        id: 'jack-jordan',
        name: 'Jack Jordan',
        profile: 'https://www.facebook.com/jack.jordan.650551'
      },
      connections: [
        { personId: 'christine-wonsley', displayName: 'Christine Wonsley', profile: 'https://www.facebook.com/christine.wonsley' },
        { personId: 'tracestin', displayName: 'Tracestin Shepherd', profile: 'https://www.facebook.com/tracestin.shepherd' },
        { personId: 'nolan', displayName: 'Nolan Wells', profile: 'https://www.facebook.com/nolan.wells.750' },
        { personId: 'katie', displayName: 'Katie McCormack', profile: 'https://www.facebook.com/katie.mccormack.8' },
        { personId: 'warren', displayName: 'Warren Hudson', profile: 'https://www.facebook.com/warren.hudson.230364' },
        { personId: 'wyatt', displayName: 'Wyatt Pyron', profile: 'https://www.facebook.com/profile.php?id=100079782690124' },
        { personId: 'bart', displayName: 'Bart Edmiston', profile: 'https://www.facebook.com/bart.edmiston.1' },
        { personId: 'morgan-seymour', displayName: 'Morgan Seymour', profile: 'https://www.facebook.com/profile.php?id=61559199283116' }
      ]
    },

    boats: [
      {
        id: 'mi4088bu',
        name: 'Triton · MI4088BU',
        status: 'Official GPS chronology obtained in summarized form',
        summary: 'The vessel tied to the official 9:56, 11:14, 4:31, 5:25, and 5:44 milestones.',
        eventIds: ['gps-departure', 'gps-arrival', 'sea-tow-call', 'seatow-anchor-overlap', 'private-assistance', 'gps-movement-431', 'gps-normal-525', 'gps-return-544'],
        passengers: 'GPS does not establish a complete passenger manifest at any moment.',
        evidence: ['MDMR RMS report', '9:56 GPS graphic', '11:14 GPS graphic', 'Released Sea Tow call', 'Nearshore photographs and witness descriptions', 'Sea Tow / Garmin coordinate comparison'],
        questions: ['How should the nearshore photograph context be reconciled with the later coordinate records?', 'Who was aboard at 4:31 PM?', 'Which vessel provided assistance?', 'Was the slow movement a tow, and if so how was it configured?']
      },
      {
        id: 'mi1295cb',
        name: 'Bart’s boat · MI1295CB',
        status: 'Waypoints obtained; no continuous track',
        summary: 'The obtained material includes MI1295CB waypoints but does not support drawing a continuous vessel route.',
        eventIds: ['early-afternoon', 'critical-overlap'],
        passengers: 'Passenger assignments remain incomplete.',
        evidence: ['MDMR waypoint references'],
        questions: ['What do the individual waypoints represent?', 'Who was aboard?', 'Is a native GPX or track file available?']
      },
      {
        id: 'tracestin-family-boat',
        name: 'Tracestin’s family boat',
        status: 'Witness-described vessel',
        summary: 'Tracestin says he traveled with family on his uncle’s separate vessel and was made to leave after the altercation.',
        eventIds: ['forced-aboard', 'tracestin-leaves'],
        passengers: 'Public accounts place Tracestin and family on this vessel; a complete passenger list is not authenticated.',
        evidence: ['Tracestin interview'],
        questions: ['Exact departure time?', 'Exact route?', 'Who can independently confirm the passenger list and sequence?']
      },
      {
        id: 'assisting-vessel',
        name: 'Private assisting vessel',
        status: 'Identity unresolved in the public record used here',
        summary: 'The released call says private assistance was arranged; the complete identity, track, and participant list of the assisting vessel remain unresolved.',
        eventIds: ['sea-tow-call', 'seatow-anchor-overlap', 'private-assistance', 'gps-movement-431', 'gps-normal-525'],
        passengers: 'Unknown.',
        evidence: ['Released Sea Tow call', 'MDMR GPS speed summary'],
        questions: ['Which vessel assisted?', 'Was a tow line used?', 'Did anyone transfer between vessels?']
      }
    ],

    lastContacts: [
      { witness: 'Lucas Aviz · screenshot-preserved', lastSeen: 'Says he last saw Nolan board an unidentified white center-console boat', lastWords: '“I have to leave”', time: 'Probably 2:00–2:30 PM', confidence: 'Low', heardBy: 'Lucas Aviz; direct comment and parent thread not recovered', source: './social-source-ledger.html#lucas-aviz-last-contact' },
      { witness: 'Warren', lastSeen: 'About 3:00 PM, by his later account', lastWords: 'No authenticated exact quote', time: 'Around 3:00 PM', confidence: 'Medium', heardBy: 'Warren; corroborating listeners not fully identified', source: './transcripts/warren-part-2.html' },
      { witness: 'Katie', lastSeen: 'Reported interaction during the afternoon', lastWords: 'Complete conversation not public', time: 'Afternoon · exact time unresolved', confidence: 'Low', heardBy: 'Unknown', source: './documents/master-investigation-notes.html#katie' },
      { witness: 'Tracestin Shepherd', lastSeen: 'Places Nolan in the water nearby during the altercation period', lastWords: 'No exact last words preserved', time: 'Same general period · exact time unresolved', confidence: 'Low', heardBy: 'Corroboration incomplete', source: './transcripts/tracestin-part-5.html' },
      { witness: 'Stephen Ray · screenshot-preserved', lastSeen: 'Tentatively says they saw Nolan on an east-end sand dune', lastWords: 'None stated', time: 'July 4 · exact time not stated', confidence: 'Low', heardBy: 'Plural “we” not identified', source: './social-source-ledger.html#stephen-ray-sighting' },
      { witness: 'Friends urging departure', lastSeen: 'Accounts place Nolan at Horn Island before MI4088BU left', lastWords: 'Later summaries say Nolan chose to remain; exact words unknown', time: 'Before 4:31 PM', confidence: 'Low', heardBy: 'Complete listener list not public', source: './documents/MDMR-MP2607-0016-report.pdf#page=3' }
    ],

    contradictions: [
      {
        id: 'chose-to-stay',
        narrative: 'Nolan chose to stay on Horn Island.',
        supporting: ['The MDMR report preserves a police summary that friends said Nolan remained with an unknown woman.', 'Warren publicly says friends urged Nolan to leave and that he declined.'],
        contradicting: ['Katie reportedly believed Nolan was returning on his original boat.'],
        unknown: ['Nolan’s exact words', 'Who personally heard them', 'Exact time', 'Which return boat Nolan expected']
      },
      {
        id: 'video-fight',
        narrative: 'The viral video shows Nolan fighting.',
        supporting: ['The original X post publicly asked whether Nolan was arguing.'],
        contradicting: ['Tracestin says the yelling voice is his and Nolan is not visible.', 'TMZ reports the owner says the clip does not show the reported altercation.'],
        unknown: ['Original file and metadata', 'Complete identifications', 'Events before and after the clip']
      },
      {
        id: 'video-time',
        narrative: 'The viral video was recorded at 4:01 PM.',
        supporting: ['A circulated or reposted label uses approximately 4:01 PM.'],
        contradicting: [],
        unknown: ['Original device metadata', 'Authenticated timezone and clock source', 'Whether the label reflects capture, upload, or repost time']
      },
      {
        id: 'sea-tow-time',
        narrative: 'The Sea Tow call began at a precise publicly reported time.',
        supporting: ['The raw publication label uses 3:48 PM.', 'WLOX describes the call as occurring around 4:00 PM.'],
        contradicting: [],
        unknown: ['Original system timestamp', 'Whether public labels use call start, transfer, or publication timing']
      },
      {
        id: 'five-oclock-boarding-request',
        narrative: 'Wyatt asked Nolan to board at 5:00 PM when it was time to leave.',
        supporting: ['Four public screenshots show a conversation labeled Katie Hudson Seymour in which the sender uses the words “at five when it was time to leave.”'],
        contradicting: ['The official GPS summary records MI4088BU beginning movement at 4:31 PM and continuing slowly through 5:24 PM.'],
        unknown: ['Whether the sender is authenticated', 'Whether “at five” is rounded or recalled', 'Who directly heard the requests', 'Whether the statement refers to the same vessel movement']
      },
      {
        id: 'faith-police-receipt',
        narrative: 'Police had the alleged Faith Lauren witness information by July 7, 2026 at 1:08 AM.',
        supporting: ['A public screenshot marked July 7 at 1:08 AM shows a written allegation and the sender’s intention to go to police.', 'The later public-post caption says the account and footage were taken to police.'],
        contradicting: ['The 1:08 AM message uses future-tense wording about going to police and submitting information.', 'A separate displayed statement ambiguously says the account was provided, or would be provided, to investigators.'],
        unknown: ['Whether police received the account or footage', 'Which agency, recipient, date, and time', 'Whether an evidence receipt, report supplement, CAD entry, or native submission exists', 'Whether the displayed sender and account are authentic']
      }
    ],

    missingEvidence: [
      { item: '15-page MDMR RMS report', status: 'Found', public: 'Yes', request: 'Obtained', priority: 'Core', href: './documents/MDMR-MP2607-0016-report.pdf' },
      { item: 'GPS extraction summary', status: 'Found', public: 'Yes', request: 'Obtained through PLUNDER source archive', priority: 'Critical', href: './documents/plunder/MI4088BU-GPS-Extraction-Summary-Redacted.pdf' },
      { item: 'Native Garmin ADM / GPX / track files', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'MI1295CB continuous track', status: 'Not established to exist in obtained packet', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'USCG particle-drift file', status: 'Released image found; native model missing', public: 'Partial', request: 'Obtained through PLUNDER source archive', priority: 'Critical', href: './media/plunder/USCG-Particle-Drift.png' },
      { item: 'Drone search grid and native flight records', status: 'Released grid image found; native flight records missing', public: 'Partial', request: 'Obtained through PLUNDER source archive', priority: 'High', href: './media/plunder/Drone-Search-Grid.jpg' },
      { item: 'MDMR-to-USCG email', status: 'Found', public: 'Yes', request: 'Obtained through PLUNDER source archive', priority: 'High', href: './documents/plunder/MP2607-0016-MDMR-to-USCG-SAR-Email.pdf' },
      { item: 'Permission-to-search record', status: 'Obtained in source collection', public: 'Source index only', request: 'Obtained through PLUNDER source archive', priority: 'High', href: './plunder-archive.html#additional-files' },
      { item: 'Strickland supplement', status: 'Found', public: 'Yes', request: 'Obtained through PLUNDER source archive', priority: 'Medium', href: './documents/plunder/MP2607-0016-Strickland-Supplement.pdf' },
      { item: 'Original Sea Tow machine export and metadata', status: 'Released publication found; original metadata missing', public: 'Partial', request: 'Not documented', priority: 'Critical', href: './transcripts/seatow-audio.html' },
      { item: 'July 4 late-night Coast Guard intake call and log', status: 'Call publicly acknowledged; caller and complete recording missing', public: 'Partial', request: 'Not documented', priority: 'Critical' },
      { item: 'NPS ranger discovery and recovery report', status: 'Referenced in public authority timeline; not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'Overnight Horn Island camper and remaining-vessel accounts', status: 'Potential witnesses described publicly; direct accounts missing', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'Original viral-video file and metadata', status: 'Circulated copy found; original missing', public: 'Partial', request: 'Not documented', priority: 'Critical', href: './media/2026-07-04-tracetin-fighting.mp4' },
      { item: 'Authenticated Katie Hudson Seymour message export', status: 'Four public screenshots found; authenticated export missing', public: 'Partial', request: 'Not documented', priority: 'High', href: './social-source-ledger.html#katie-hudson-seymour-messages' },
      { item: 'Authenticated Faith Lauren statement, original footage, and police receipt', status: 'Five public-post attachments found; identity, native records, footage, submission, and agency receipt missing', public: 'Partial', request: 'Not documented', priority: 'Critical', href: './social-source-ledger.html#faith-lauren-source' },
      { item: 'Complete Katie interview', status: 'Not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'Complete Wyatt and Bart interviews', status: 'Not obtained', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'Verified passenger manifests by vessel and time', status: 'Not obtained', public: 'No', request: 'Not documented', priority: 'Critical' }
    ],

    questions: [
      { id: 1, question: 'What were Nolan’s exact last words, and who personally heard them?', status: 'Open', evidence: 'Police summary and Warren’s public account', needed: 'Direct statements, original interview audio, and contemporaneous messages' },
      { id: 2, question: 'What is the last independently corroborated sighting of Nolan?', status: 'Open', evidence: 'Warren, Tracestin, Katie-related accounts, and circulated media', needed: 'Complete witness matrix and original timestamped media' },
      { id: 3, question: 'What is the exact Sea Tow call-start time?', status: 'Open', evidence: '3:48 PM publication label and WLOX’s “around 4 PM” description', needed: 'Original Sea Tow system export and metadata' },
      { id: 4, question: 'What is the viral video’s original capture time?', status: 'Open', evidence: 'Reported approximately 4:01 PM label', needed: 'Original device file and native metadata' },
      { id: 5, question: 'Who was aboard each vessel at 4:31 PM?', status: 'Open', evidence: 'GPS movement and incomplete public passenger accounts', needed: 'Direct passenger statements and verified manifests' },
      { id: 6, question: 'Which vessel provided private assistance to MI4088BU?', status: 'Open', evidence: 'Released call and slow GPS movement', needed: 'Assisting-vessel statement, track, and tow documentation' },
      { id: 7, question: 'What is the evidentiary basis for the 6:00 PM July 4 incident time?', status: 'Partially answered', evidence: 'The 9:52 PM MDMR-to-USCG email uses 6:00 PM as a SAR-model input; the record does not authenticate it as an event time', needed: 'Source and rationale for selecting the modeling input plus complete USCG SAR case file' },
      { id: 8, question: 'What search coordinates and drift assumptions guided July 5, 2026 operations?', status: 'Partially answered', evidence: 'Released USCG particle-drift and drone-grid graphics plus the MDMR-to-USCG SAR email are now public', needed: 'Native drift-model inputs and output, complete USCG response, drone flight logs, imagery, and operator report' },
      { id: 9, question: 'Did investigators receive the alleged Faith Lauren account or footage, and if so when?', status: 'Open', evidence: 'A July 7 at 1:08 AM screenshot records intent to report; a later caption claims police submission, but no receipt is preserved', needed: 'Agency evidence receipt, case supplement, CAD entry, authenticated message export, direct witness statement, and original footage' },
      { id: 10, question: 'Who made the approximately 11:00 PM Coast Guard call, and was that caller Warren?', status: 'Open', evidence: 'WLOX reports a friend call around 11:00 PM; Christine separately places Warren’s call around 11:07 PM', needed: 'Coast Guard intake audio, call log, caller identification, and call-detail records' },
      { id: 11, question: 'Who remained overnight on Horn Island, and what could they see or hear?', status: 'Open', evidence: 'Phillip Elmore reports a family stayed overnight and two boats remained docked', needed: 'Direct statements, vessel identification and locations, photographs, and lines-of-sight analysis' },
      { id: 12, question: 'What was the exact discovery and recovery sequence on July 6, 2026?', status: 'Open', evidence: 'Sheriff timeline uses around 8:45 AM notification; later MDMR CAD entries and differing water/beach descriptions are public', needed: 'NPS ranger report, dispatch audio, recovery narrative, authenticated coordinate, and scene record' },
      { id: 13, question: 'When, how far, and along what path did MI4088BU reposition before the 4:31 PM sustained departure?', status: 'Partially answered', evidence: 'The UCN-released configuration places the Triton in the nearshore gathering; the later Sea Tow call gives its offshore position; the separate Sea Tow and Garmin coordinate records are approximately 916 feet apart', needed: 'Direct report download or attachment permalink, native photo and video metadata, raw Garmin GPX/ADM point sequence, complete PowerPoint source set, and a point-by-point reconstruction' }
    ],

    fileTree: [
      { depth: 0, name: 'MP2607-0016', kind: 'Case root', status: 'Obtained in part' },
      { depth: 1, name: 'RMS report · 15 pages', kind: 'PDF', status: 'Obtained' },
      { depth: 1, name: 'GPS', kind: 'Folder / record family', status: 'Referenced' },
      { depth: 2, name: 'ADM / native Garmin data', kind: 'Native data', status: 'Not obtained' },
      { depth: 2, name: 'GPX / tracks / routes', kind: 'Native data', status: 'Not obtained' },
      { depth: 2, name: 'PowerPoint / GPS graphics', kind: 'Presentation / images', status: 'Two graphics obtained' },
      { depth: 2, name: 'Extraction Summary', kind: 'Summary', status: 'Obtained · redacted' },
      { depth: 1, name: 'USCG particle drift', kind: 'Search analysis', status: 'Released image obtained' },
      { depth: 1, name: 'Drone grid / flight records', kind: 'Search data', status: 'Grid obtained · native records missing' },
      { depth: 1, name: 'MDMR → USCG email', kind: 'Communication', status: 'Obtained' },
      { depth: 1, name: 'Permission to search', kind: 'Authorization', status: 'Obtained · public redaction pending' },
      { depth: 1, name: 'Strickland supplement', kind: 'Supplement', status: 'Obtained' }
    ]
  };
})();
