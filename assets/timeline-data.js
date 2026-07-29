(function () {
  'use strict';

  const master = './documents/master-investigation-notes.html';
  const report = './documents/MDMR-MP2607-0016-report.pdf';

  window.NOLAN_EVIDENCE = {
    meta: {
      title: 'Nolan Wells',
      range: 'July 3–6, 2026',
      description: 'A sourced reconstruction that separates official records, firsthand accounts, secondhand summaries, and hypotheses.',
      referenceCommit: '3f5771b37259c6990badfc5a2d42a2471656e4f6'
    },
    types: {
      verified: { label: 'Verified', short: 'Verified', color: '#72a860', description: 'Official record, GPS, released official audio, or authenticated media.' },
      firsthand: { label: 'Firsthand witness', short: 'Witness', color: '#d4a574', description: 'A named person’s public account of what they personally saw or heard.' },
      secondhand: { label: 'Secondhand', short: 'Secondhand', color: '#c9956a', description: 'A person or official record relaying another person’s account.' },
      hypothesis: { label: 'Hypothesis', short: 'Hypothesis', color: '#c04e01', description: 'An analytical placement, open question, or unresolved reconstruction.' }
    },
    locations: {
      overview: { lat: 30.242014, lng: -88.778409, zoom: 11, label: 'Northwest Horn Island' },
      elCamino: { lat: 30.433343, lng: -88.848426, zoom: 13, label: 'El Camino Real Road' },
      hornIsland: { lat: 30.243508, lng: -88.777755, zoom: 13, label: 'Horn Island · west tip' },
      northSound: { lat: 30.288414, lng: -88.790442, zoom: 12, label: 'MI4088BU slow movement' },
      searchArea: { lat: 30.252, lng: -88.75, zoom: 11, label: 'Horn Island search area' },
      recovery: { lat: 30.242014, lng: -88.778409, zoom: 14, label: 'Recovery area · northwest tip' }
    },
    routes: {
      outbound: {
        label: 'MI4088BU outbound · schematic',
        color: '#d4a574',
        coords: [[30.433343, -88.848426], [30.365008, -88.812259], [30.243717, -88.777619]]
      },
      slowTow: {
        label: 'MI4088BU slow movement · schematic',
        color: '#c04e01',
        coords: [[30.243508, -88.777755], [30.288414, -88.790442]]
      },
      return: {
        label: 'MI4088BU return · schematic',
        color: '#4a8a7c',
        coords: [[30.288414, -88.790442], [30.364176, -88.815552], [30.423502, -88.856538], [30.433595, -88.848686]]
      }
    },
    transcripts: [
      { label: 'Sea Tow / Coast Guard call', meta: 'Released distress-call transcript', href: './transcripts/seatow-audio.html' },
      { label: 'Warren · Part 1', meta: 'Relationship, trip, and departure account', href: './transcripts/warren-part-1.html' },
      { label: 'Warren · Part 2', meta: 'Horn Island standup', href: './transcripts/warren-part-2.html' },
      { label: 'Warren · Part 3', meta: 'Departure questions', href: './transcripts/warren-part-3.html' },
      { label: 'Warren · Part 4', meta: 'Phone, keys, and follow-up', href: './transcripts/warren-part-4.html' },
      { label: 'Tracestin · Part 5', meta: 'Island, altercation, and search account', href: './transcripts/tracestin-part-5.html' }
    ],
    boats: [
      {
        name: 'Triton · MI4088BU',
        status: 'Official GPS track summarized by MDMR',
        note: 'The verified timestamps below refer to this vessel. GPS alone does not establish who was aboard at any moment.'
      },
      {
        name: 'Bart’s boat · MI1295CB',
        status: 'Waypoints only; no continuous track in the obtained packet',
        note: 'This site does not draw a route for MI1295CB. A waypoint must not be represented as a vessel track.'
      },
      {
        name: 'Other vessels',
        status: 'Passenger assignments remain incomplete',
        note: 'Unsupported passenger lists and inferred transfers are intentionally omitted.'
      }
    ],
    events: [
      {
        id: 'last-evening-home', date: 'July 3', dateLong: 'Friday · July 3, 2026', time: 'Evening', precision: 'No exact public time',
        title: 'Nolan leaves home before the trip', type: 'firsthand', confidence: 'Medium', masterAnchor: 'reconstruction', location: 'overview',
        summary: 'Family accounts place Nolan leaving home and staying with friends before the Horn Island trip.',
        claims: ['Nolan made dinner for his parents, hugged his mother, and left to spend the night with friends.'],
        sources: [
          { label: 'Master reconstruction', href: `${master}#reconstruction` },
          { label: 'Family-account source notes', href: `${master}#current-best-sources` }
        ]
      },
      {
        id: 'gps-departure', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '9:56 AM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU departs the mainland', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'elCamino', route: 'outbound',
        summary: 'The official MDMR Garmin extraction summary places the tracked Triton leaving El Camino Real Road at 9:56 AM.',
        claims: ['The vessel identity is MI4088BU.', 'The GPS record establishes vessel movement, not the identity of every passenger.'],
        media: { type: 'image', src: './media/0956-MI4088BU-depart-from-El-Camino-Real-Rd.png', alt: 'GPS image showing MI4088BU departure from El Camino Real Road at 9:56 AM', caption: 'GPS · MI4088BU departure · 9:56 AM' },
        sources: [
          { label: 'MDMR report · pages 5 and 7', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'anchoring-calls', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Around 11:00 AM', precision: 'Approximate witness time',
        title: 'Nolan calls Tracestin about anchoring', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he was already at Horn Island when Nolan called for help finding where the group should anchor.',
        claims: ['The time is approximate and comes from Tracestin’s public account, not released call metadata.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'gps-arrival', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '11:14 AM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU arrives at Horn Island', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'hornIsland', route: 'outbound',
        summary: 'The official GPS summary places the tracked Triton at the west tip of Horn Island at 11:14 AM.',
        claims: ['The boat remains stationary in the GPS summary from approximately 11:15 AM until 4:30 PM.'],
        media: { type: 'image', src: './media/1114-MI4088BU-arrives-at-West-Tip-of-Horn-Island.png', alt: 'GPS image showing MI4088BU arriving at the west tip of Horn Island at 11:14 AM', caption: 'GPS · MI4088BU arrival · 11:14 AM' },
        sources: [
          { label: 'MDMR report · page 5', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'early-afternoon', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Early afternoon', precision: 'Broad witness placement',
        title: 'Nolan socializes among the boats', type: 'firsthand', confidence: 'Medium', masterAnchor: 'reconstruction', location: 'hornIsland',
        summary: 'Public witness accounts and circulated media place Nolan swimming and socializing with the larger group during the early afternoon.',
        claims: ['The available image does not authenticate an exact capture time.'],
        media: { type: 'image', src: './media/2026-07-04-Nolan-on-boat-with-bros.png', alt: 'Nolan with friends on a boat on July 4', caption: 'Circulated image · exact capture time not authenticated' },
        sources: [
          { label: 'Master reconstruction', href: `${master}#reconstruction` },
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' }
        ]
      },
      {
        id: 'warren-last-sighting', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Around 3:00 PM', precision: 'Approximate witness recollection',
        title: 'Warren’s reported last personal sighting', type: 'firsthand', confidence: 'Medium', masterAnchor: 'warren', location: 'hornIsland',
        summary: 'Warren later placed his own last sighting of Nolan at about 3:00 PM and described Nolan interacting with Katie.',
        claims: ['This is Warren’s last sighting, not necessarily Nolan’s final confirmed sighting by anyone.'],
        sources: [
          { label: 'Warren interview · Part 2', href: './transcripts/warren-part-2.html' },
          { label: 'Master Warren notes', href: `${master}#warren` }
        ]
      },
      {
        id: 'altercation', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Around 3:30 PM', precision: 'Approximate witness reconstruction',
        title: 'Tracestin describes an altercation', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he became involved in an altercation with another man on the island.',
        claims: ['The exact start time has not been independently authenticated.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'forced-aboard', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Immediately afterward', precision: 'Sequence reported by witness; no objective time',
        title: 'Tracestin says his uncle forced him aboard', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says his uncle required him to return to the family boat after the altercation.',
        claims: ['The available public record does not establish an exact minute for this transition.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'nolan-nearby-account', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Reportedly nearby', precision: 'Witness placement only',
        title: 'Tracestin places Nolan nearby', type: 'firsthand', confidence: 'Low', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin has said Nolan was in the water nearby during this general period but was not visible in the viral video.',
        claims: ['No released objective timestamp independently fixes Nolan’s position during the altercation.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin questions', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'sea-tow-call', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Around 4:00 PM', precision: 'Call occurred before 4:31 PM; exact start unresolved',
        title: 'Sea Tow receives a distress call', type: 'verified', confidence: 'High', masterAnchor: 'sea-tow', location: 'hornIsland',
        summary: 'Released audio establishes a call about a boat taking on water after bilge-pump failure, with approximately seven people reported aboard.',
        claims: ['The caller reports that everyone aboard is okay.', 'Public labels of 3:48 PM or approximately 4:00 PM are not authenticated by released original metadata.'],
        media: { type: 'video', src: './media/2026-07-04-full-dispatch-call.mp4', alt: 'Released Sea Tow and dispatch call media', caption: 'Released distress-call media · exact original timestamp unresolved' },
        sources: [
          { label: 'Sea Tow call transcript', href: './transcripts/seatow-audio.html' },
          { label: 'Master Sea Tow notes', href: `${master}#sea-tow` },
          { label: 'MDMR report · page 5', href: `${report}#page=5` }
        ]
      },
      {
        id: 'viral-video', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Reported around 4:01 PM', precision: 'Reposted label; original metadata not obtained',
        title: 'The circulated altercation video', type: 'firsthand', confidence: 'Medium', masterAnchor: 'viral-video', location: 'hornIsland',
        summary: 'Tracestin publicly identifies himself as the person yelling in the circulated clip and says Nolan is not visible in it.',
        claims: ['The clip’s contents are public; the reported 4:01 PM timestamp remains unauthenticated.', 'The video does not establish Nolan’s location.'],
        media: { type: 'video', src: './media/2026-07-04-tracetin-fighting.mp4', alt: 'Circulated altercation video from Horn Island', caption: 'Circulated video · reported time not authenticated' },
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master viral-video notes', href: `${master}#viral-video` }
        ]
      },
      {
        id: 'tracestin-leaves', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Shortly afterward', precision: 'Witness sequence; exact minute unresolved',
        title: 'Tracestin says he leaves the island', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he departed with his family after being forced back onto their boat.',
        claims: ['The exact relationship between this departure, the video, and the Sea Tow call is not independently established.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
        ]
      },
      {
        id: 'accounts-nolan-stays', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Before 4:31 PM', precision: 'No authenticated exact time',
        title: 'Accounts say Nolan chose to remain', type: 'secondhand', confidence: 'Low', masterAnchor: 'warren', location: 'hornIsland',
        summary: 'The official report records a police summary that friends said Nolan remained with an unknown woman; Warren has also publicly said friends urged Nolan to leave.',
        claims: ['The obtained report does not identify each speaker, preserve Nolan’s exact words, or timestamp the alleged decision.', 'Katie has reportedly said she believed Nolan was returning on his original boat.'],
        sources: [
          { label: 'MDMR report · page 3', href: `${report}#page=3` },
          { label: 'Warren interview · Part 1', href: './transcripts/warren-part-1.html' },
          { label: 'Warren interview · Part 3', href: './transcripts/warren-part-3.html' },
          { label: 'Master Warren and Katie notes', href: `${master}#warren` }
        ]
      },
      {
        id: 'private-assistance', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Before departure', precision: 'Established sequence; exact minute unresolved',
        title: 'Private assistance replaces Sea Tow response', type: 'verified', confidence: 'High', masterAnchor: 'sea-tow', location: 'hornIsland',
        summary: 'The released call records that private assistance had been arranged and the Sea Tow response was canceled.',
        claims: ['The public call does not itself authenticate the later tow’s full participant list.'],
        sources: [
          { label: 'Sea Tow call transcript', href: './transcripts/seatow-audio.html' },
          { label: 'Master Sea Tow notes', href: `${master}#sea-tow` }
        ]
      },
      {
        id: 'gps-movement-431', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '4:31 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU begins slow movement', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'slowTow',
        summary: 'The tracked Triton begins moving north from the west tip at approximately 0.06–4.2 knots.',
        claims: ['MDMR summarizes approximately 2.75 miles of slow movement through 5:24 PM.', 'GPS does not reveal who was aboard, where Nolan was, or whether passengers transferred.'],
        sources: [
          { label: 'MDMR report · pages 5 and 7', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'phone-and-passenger-account', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'At departure', precision: 'Witness and secondhand accounts',
        title: 'Accounts place Nolan off the departing boat', type: 'secondhand', confidence: 'Medium', masterAnchor: 'what-gps-does-not-tell-us', location: 'hornIsland',
        summary: 'Public accounts say MI4088BU left without Nolan and carried his phone back to the mainland.',
        claims: ['This conclusion does not come from GPS.', 'The obtained official packet does not independently establish every passenger aboard at departure.'],
        sources: [
          { label: 'MDMR report · page 3', href: `${report}#page=3` },
          { label: 'Warren interview · Part 4', href: './transcripts/warren-part-4.html' },
          { label: 'Master GPS limits', href: `${master}#what-gps-does-not-tell-us` }
        ]
      },
      {
        id: 'critical-overlap', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '3:45–4:31 PM', precision: 'Analytical window; ordering remains unresolved',
        title: 'The critical unresolved window', type: 'hypothesis', confidence: 'Medium', masterAnchor: 'critical-overlap', location: 'hornIsland',
        summary: 'This is the narrow period in which the public accounts of the altercation, viral video, distress call, Tracestin’s departure, Nolan remaining, and MI4088BU’s departure converge.',
        claims: ['The available public evidence does not establish the exact minute-by-minute ordering of the fight, video, and Sea Tow call.', 'This window is an analytical focus, not proof of a theory.'],
        sources: [
          { label: 'Master critical-overlap analysis', href: `${master}#critical-overlap` },
          { label: 'Master unresolved gaps', href: `${master}#major-timeline-gaps` }
        ]
      },
      {
        id: 'gps-normal-525', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '5:25 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU regains normal operation', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'return',
        summary: 'MDMR reports that the tracked vessel accelerates to approximately 30–35 knots after the period of slow movement.',
        claims: ['The slow-movement interval lasted about 53 minutes.'],
        sources: [
          { label: 'MDMR report · page 5', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'gps-return-544', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: '5:44 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU reaches El Camino Real Road', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'elCamino', route: 'return',
        summary: 'The official report places the tracked Triton back at El Camino Real Road at 5:44 PM.',
        claims: ['This site does not use the upstream 5:44 graphic because its vessel label conflicts with the obtained report.'],
        sources: [
          { label: 'MDMR report · pages 2 and 5', href: `${report}#page=2` },
          { label: 'Master boat distinction', href: `${master}#boats` }
        ]
      },
      {
        id: 'family-contacted', date: 'July 4', dateLong: 'Saturday · July 4, 2026', time: 'Around 11:00 PM', precision: 'Approximate witness time',
        title: 'Friends realize Nolan has not returned', type: 'firsthand', confidence: 'Medium', masterAnchor: 'reconstruction', location: 'overview',
        summary: 'Public accounts place friends contacting Nolan’s family after realizing that he had not returned from Horn Island.',
        claims: ['The MDMR CAD entry is separately timestamped at 11:45:14 PM.'],
        sources: [
          { label: 'MDMR CAD · page 13', href: `${report}#page=13` },
          { label: 'Warren interview · Part 1', href: './transcripts/warren-part-1.html' },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
        ]
      },
      {
        id: 'official-search', date: 'July 5', dateLong: 'Sunday · July 5, 2026', time: 'Morning onward', precision: 'Mixed exact and approximate operational times',
        title: 'The official search expands', type: 'verified', confidence: 'High', masterAnchor: 'reconstruction', location: 'searchArea',
        summary: 'MDMR narratives and CAD records document patrol-vessel, drone, and multi-agency search activity on July 5.',
        claims: ['The obtained packet records an MDMR patrol-vessel launch around 8:00 AM, a drone request around 9:00 AM, and drone flights beginning at 12:40 PM.'],
        sources: [
          { label: 'MDMR report · pages 4, 10 and 12', href: `${report}#page=10` },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
        ]
      },
      {
        id: 'body-found', date: 'July 6', dateLong: 'Monday · July 6, 2026', time: 'Around 8:40 AM', precision: 'Approximate public official time',
        title: 'Nolan’s body is found near the northwest tip', type: 'verified', confidence: 'High', masterAnchor: 'reconstruction', location: 'recovery',
        summary: 'Public official reporting places the recovery in the water near the northwestern end of Horn Island.',
        claims: ['The available 15-page MDMR packet contains the later deceased-person CAD event but not the full recovery narrative.'],
        sources: [
          { label: 'MDMR report · page 15', href: `${report}#page=15` },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
        ]
      }
    ]
  };
})();
