(function () {
  'use strict';

  window.NOLAN_ARCHIVE = {
    sections: [
      { id: 'case-summary', title: 'Case Summary', description: 'Start with a sourced, plain-language account of what happened, what official GPS establishes, and what remains unresolved.', href: './case-summary.html', tone: 'verified' },
      { id: 'search', title: 'Search everything', description: 'Search events, transcript lines, documents, people, boats, questions, contradictions, and master-note sections.', href: './search.html', tone: 'verified' },
      { id: 'documents', title: 'Documents', description: 'Open every obtained source as a record with its status, contents, references, and missing companion files.', href: './documents.html', tone: 'media' },
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
        referencedEvents: ['gps-departure', 'gps-arrival', 'gps-movement-431', 'gps-normal-525', 'gps-return-544', 'family-contacted', 'official-search', 'body-found'],
        missingCompanions: ['Native Garmin export', 'GPS extraction summary', 'USCG particle-drift file', 'Drone grid', 'MDMR-to-USCG email', 'Permission-to-search record', 'Strickland supplement']
      },
      {
        id: 'master-notes',
        title: 'Master Investigation Notes · Version 1.3',
        kind: 'Working evidence synthesis',
        status: 'Obtained',
        availability: 'Public on this site',
        confidence: 'Working document',
        href: './documents/master-investigation-notes.html',
        summary: 'The canonical editorial record controlling the site’s claims, evidence classifications, confidence levels, and unresolved questions.',
        contents: ['Defensible reconstruction', 'Critical overlap', 'GPS limits', 'Boat distinctions', 'Witness notes', 'Narrative formation ledger', 'Cover-up hypothesis test', 'Anti-lock-in protocol', 'Evidence gaps'],
        referencedEvents: ['critical-overlap', 'accounts-nolan-stays', 'viral-video'],
        missingCompanions: ['Future revisions when stronger primary evidence becomes public']
      },
      {
        id: 'sea-tow-call',
        title: 'Released Sea Tow / Dispatch Call',
        kind: 'Released official audio publication',
        status: 'Obtained',
        availability: 'Public audio and transcript',
        confidence: 'High for audible contents',
        href: './transcripts/seatow-audio.html#audio-analysis',
        summary: 'The released call records water ingress, bilge-pump failure, approximately seven people aboard, and later cancellation after private help was arranged.',
        contents: ['Full 9:46 publication', 'First 3:21 stereo excerpt', 'Caller/boat channel', 'Dispatcher channel', 'Transcript'],
        referencedEvents: ['sea-tow-call', 'private-assistance', 'critical-overlap'],
        missingCompanions: ['Original Sea Tow machine export', 'Authenticated call-start metadata', 'Complete participant identification']
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
        eventIds: ['last-evening-home', 'gps-departure', 'anchoring-calls', 'gps-arrival', 'early-afternoon', 'warren-last-sighting', 'nolan-nearby-account', 'accounts-nolan-stays', 'phone-and-passenger-account', 'body-found'],
        interviews: [],
        questions: ['What is the last independently corroborated sighting?', 'What were Nolan’s exact last words and who heard them?', 'What return plan did Nolan understand?']
      },
      {
        id: 'warren',
        name: 'Warren',
        role: 'Friend and public witness',
        summary: 'Warren publicly discusses the trip, his reported last personal sighting, efforts to get Nolan to leave, and the phone and keys.',
        eventIds: ['warren-last-sighting', 'accounts-nolan-stays', 'phone-and-passenger-account', 'family-contacted'],
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
        summary: 'Moore is identified as the owner of the circulated Horn Island video. TMZ reports that the owner recorded it for a spouse and later posted it hoping Nolan might be identifiable.',
        eventIds: ['viral-video', 'anna-videographer-attribution'],
        interviews: [
          { label: 'Supplied Facebook profile', href: 'https://www.facebook.com/share/19EttKhMgq/?mibextid=wwXIfr' },
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
      }
    ],

    boats: [
      {
        id: 'mi4088bu',
        name: 'Triton · MI4088BU',
        status: 'Official GPS chronology obtained in summarized form',
        summary: 'The vessel tied to the official 9:56, 11:14, 4:31, 5:25, and 5:44 milestones.',
        eventIds: ['gps-departure', 'gps-arrival', 'sea-tow-call', 'private-assistance', 'gps-movement-431', 'gps-normal-525', 'gps-return-544'],
        passengers: 'GPS does not establish a complete passenger manifest at any moment.',
        evidence: ['MDMR RMS report', '9:56 GPS graphic', '11:14 GPS graphic', 'Released Sea Tow call'],
        questions: ['Who was aboard at 4:31 PM?', 'Which vessel provided assistance?', 'Was the slow movement a tow, and if so how was it configured?']
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
        eventIds: ['private-assistance', 'gps-movement-431', 'gps-normal-525'],
        passengers: 'Unknown.',
        evidence: ['Released Sea Tow call', 'MDMR GPS speed summary'],
        questions: ['Which vessel assisted?', 'Was a tow line used?', 'Did anyone transfer between vessels?']
      }
    ],

    lastContacts: [
      { witness: 'Warren', lastSeen: 'About 3:00 PM, by his later account', lastWords: 'No authenticated exact quote', time: 'Around 3:00 PM', confidence: 'Medium', heardBy: 'Warren; corroborating listeners not fully identified', source: './transcripts/warren-part-2.html' },
      { witness: 'Katie', lastSeen: 'Reported interaction during the afternoon', lastWords: 'Complete conversation not public', time: 'Afternoon · exact time unresolved', confidence: 'Low', heardBy: 'Unknown', source: './documents/master-investigation-notes.html#katie' },
      { witness: 'Tracestin Shepherd', lastSeen: 'Places Nolan in the water nearby during the altercation period', lastWords: 'No exact last words preserved', time: 'Same general period · exact time unresolved', confidence: 'Low', heardBy: 'Corroboration incomplete', source: './transcripts/tracestin-part-5.html' },
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
      }
    ],

    missingEvidence: [
      { item: '15-page MDMR RMS report', status: 'Found', public: 'Yes', request: 'Obtained', priority: 'Core', href: './documents/MDMR-MP2607-0016-report.pdf' },
      { item: 'GPS extraction summary', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'Native Garmin ADM / GPX / track files', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'MI1295CB continuous track', status: 'Not established to exist in obtained packet', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'USCG particle-drift file', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'Critical' },
      { item: 'Drone search grid and native flight records', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'MDMR-to-USCG email', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'Permission-to-search record', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'High' },
      { item: 'Strickland supplement', status: 'Referenced · not obtained', public: 'No', request: 'Not documented', priority: 'Medium' },
      { item: 'Original Sea Tow machine export and metadata', status: 'Released publication found; original metadata missing', public: 'Partial', request: 'Not documented', priority: 'Critical', href: './transcripts/seatow-audio.html' },
      { item: 'Original viral-video file and metadata', status: 'Circulated copy found; original missing', public: 'Partial', request: 'Not documented', priority: 'Critical', href: './media/2026-07-04-tracetin-fighting.mp4' },
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
      { id: 7, question: 'What is the evidentiary basis for any 6:00 PM claim?', status: 'Open', evidence: 'No authenticated basis identified in the obtained core record', needed: 'Source publication, original timestamp, or USCG record supporting the time' },
      { id: 8, question: 'What search coordinates and drift assumptions guided July 5, 2026 operations?', status: 'Open', evidence: 'MDMR narratives reference search and drone activity', needed: 'USCG particle drift, drone grid, flight logs, and interagency emails' }
    ],

    fileTree: [
      { depth: 0, name: 'MP2607-0016', kind: 'Case root', status: 'Obtained in part' },
      { depth: 1, name: 'RMS report · 15 pages', kind: 'PDF', status: 'Obtained' },
      { depth: 1, name: 'GPS', kind: 'Folder / record family', status: 'Referenced' },
      { depth: 2, name: 'ADM / native Garmin data', kind: 'Native data', status: 'Not obtained' },
      { depth: 2, name: 'GPX / tracks / routes', kind: 'Native data', status: 'Not obtained' },
      { depth: 2, name: 'PowerPoint / GPS graphics', kind: 'Presentation / images', status: 'Two graphics obtained' },
      { depth: 2, name: 'Extraction Summary', kind: 'Summary', status: 'Referenced · not obtained' },
      { depth: 1, name: 'USCG particle drift', kind: 'Search analysis', status: 'Referenced · not obtained' },
      { depth: 1, name: 'Drone grid / flight records', kind: 'Search data', status: 'Referenced · not obtained' },
      { depth: 1, name: 'MDMR → USCG email', kind: 'Communication', status: 'Referenced · not obtained' },
      { depth: 1, name: 'Permission to search', kind: 'Authorization', status: 'Referenced · not obtained' },
      { depth: 1, name: 'Strickland supplement', kind: 'Supplement', status: 'Referenced · not obtained' }
    ]
  };
})();
