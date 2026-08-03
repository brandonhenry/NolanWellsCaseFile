(function () {
  'use strict';

  const master = './documents/master-investigation-notes.html';
  const report = './documents/MDMR-MP2607-0016-report.pdf';
  const gpsSummary = './documents/plunder/MI4088BU-GPS-Extraction-Summary-Redacted.pdf';
  const sarEmail = './documents/plunder/MP2607-0016-MDMR-to-USCG-SAR-Email.pdf';
  const stricklandSupplement = './documents/plunder/MP2607-0016-Strickland-Supplement.pdf';
  const particleDrift = './media/plunder/USCG-Particle-Drift.png';
  const droneGrid = './media/plunder/Drone-Search-Grid.jpg';
  const wloxTimeline = 'https://www.wlox.com/2026/07/07/timeline-heres-what-we-know-about-disappearance-death-18-year-old-nolan-wells/';
  const wloxPressConference = 'https://www.wlox.com/2026/07/10/new-details-revealed-press-conference-with-nolan-wells-family-ben-crump-rev-al-sharpton/';

  window.NOLAN_EVIDENCE = {
    meta: {
      title: 'Nolan Wells',
      range: 'July 3–7, 2026',
      description: 'Nolan Wells, 18, was reported missing after a gathering at Horn Island on July 4, 2026. His body was recovered near the island’s northwest tip on the morning of July 6, 2026. This timeline follows the official GPS record, search activity, witness accounts, and the unresolved period before his boat left the island.',
      opening: {
        location: 'recovery',
        zoom: 15,
        markerLabel: 'Body reported found · ~8:45 AM',
        markerColor: '#c04e01',
        tooltipDirection: 'left',
        mapPlacement: 'below-intro'
      },
      referenceCommit: '3f5771b37259c6990badfc5a2d42a2471656e4f6'
    },
    types: {
      verified: { label: 'Verified', short: 'Verified', color: '#72a860', description: 'Official record, GPS, released official audio, or authenticated media.' },
      firsthand: { label: 'Firsthand witness', short: 'Witness', color: '#6ea7c9', description: 'A named person’s public account of what they personally saw or heard.' },
      secondhand: { label: 'Secondhand', short: 'Secondhand', color: '#8aa0b3', description: 'A person or official record relaying another person’s account.' },
      media: { label: 'Media record', short: 'Media', color: '#d36d2a', description: 'A public image, recording, or publication whose contents are available but whose metadata may be incomplete.' },
      unknown: { label: 'Unresolved', short: 'Unknown', color: '#9b7bb6', description: 'A documented gap or analytical window that the available evidence does not resolve.' },
      hypothesis: { label: 'Hypothesis', short: 'Hypothesis', color: '#7d858b', description: 'An interpretation or reconstruction that is not itself a verified event.' }
    },
    locations: {
      overview: { lat: 30.242014, lng: -88.778409, zoom: 11, label: 'Northwest Horn Island' },
      elCamino: { lat: 30.433343, lng: -88.848426, zoom: 13, label: 'El Camino Real Road' },
      hornIsland: { lat: 30.243508, lng: -88.777755, zoom: 13, label: 'Horn Island · west tip' },
      northSound: { lat: 30.288414, lng: -88.790442, zoom: 12, label: 'MI4088BU slow movement' },
      searchArea: { lat: 30.252, lng: -88.75, zoom: 11, label: 'Horn Island search area' },
      anchorPosition: { lat: 30.2437667, lng: -88.77715, zoom: 15, label: 'Garmin anchor coordinate' },
      seaTowCoordinate: { lat: 30.2447333, lng: -88.7798333, zoom: 16, label: 'Sea Tow caller coordinate' },
      droneLaunchOne: { lat: 30.2433833, lng: -88.7737833, zoom: 15, label: 'First recorded drone launch' },
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
    confirmedTimes: [
      {
        date: 'July 3, 2026',
        note: 'No confirmed public clock time is available.',
        hours: []
      },
      {
        date: 'July 4, 2026',
        hours: [
          {
            hour: '9 AM',
            entries: [
              { time: '9:56 AM', label: 'MI4088BU leaves the mainland', eventId: 'gps-departure' }
            ]
          },
          {
            hour: '11 AM',
            entries: [
              { time: '11:14 AM', label: 'MI4088BU reaches Horn Island', eventId: 'gps-arrival' },
              { time: '11:15 AM–4:30 PM', label: 'At least one Triton positional change occurs', eventId: 'triton-pre-430-repositioning' }
            ]
          },
          {
            hour: '4 PM',
            entries: [
              { time: '~4:00 PM', label: 'Sea Tow caller provides the vessel coordinate', eventId: 'sea-tow-call' },
              { time: '4:31 PM', label: 'Published sustained northbound segment begins', eventId: 'gps-movement-431' }
            ]
          },
          {
            hour: '5 PM',
            entries: [
              { time: '5:25 PM', label: 'MI4088BU resumes normal speed', eventId: 'gps-normal-525' },
              { time: '5:44 PM', label: 'MI4088BU reaches the mainland', eventId: 'gps-return-544' }
            ]
          },
          {
            hour: '11 PM',
            entries: [
              { time: '~11:00 PM', label: 'Friend contacts the Coast Guard', eventId: 'family-contacted' },
              { time: '~11:07 PM', label: 'Warren contacts Nolan’s mother', eventId: 'family-contacted' },
              { time: '11:45:14 PM', label: 'MDMR missing-person CAD call is created', eventId: 'mdmr-missing-cad-1145' },
              { time: '11:49 PM', label: 'MDMR lieutenant is advised Nolan is missing', eventId: 'mdmr-missing-cad-1145' }
            ]
          }
        ]
      },
      {
        date: 'July 5, 2026',
        hours: [
          {
            hour: '1 AM',
            entries: [
              { time: '1:38 AM', label: 'MDMR records the JCSO working explanation', eventId: 'jcso-working-assumption-0138' }
            ]
          },
          {
            hour: '8 AM',
            entries: [
              { time: '~8:00 AM', label: 'MDMR patrol vessel launches', eventId: 'official-search' }
            ]
          },
          {
            hour: '9 AM',
            entries: [
              { time: '~9:00 AM', label: 'Drone assistance is requested', eventId: 'drone-request-and-failures' },
              { time: '9:08:22 AM', label: 'MDMR port-check CAD call is created', eventId: 'drone-request-and-failures' }
            ]
          },
          {
            hour: '10 AM',
            entries: [
              { time: '~10:00 AM', label: 'Three drone launches fail', eventId: 'drone-request-and-failures' },
              { time: '10:05:53 AM', label: 'MDMR assistance CAD call is created', eventId: 'drone-request-and-failures' },
              { time: '~10:30 AM', label: 'Additional drone help is requested', eventId: 'drone-request-and-failures' }
            ]
          },
          {
            hour: '11 AM',
            entries: [
              { time: '11:55 AM', label: 'MDMR follows up on a reported female lead', eventId: 'female-lead-1155' }
            ]
          },
          {
            hour: '12 PM',
            entries: [
              { time: '12:26 PM', label: 'Coast Guard receives JCSO assistance request', eventId: 'coast-guard-public-activation' },
              { time: '12:31 PM', label: 'JCSO publishes missing-person notice', eventId: 'coast-guard-public-activation' },
              { time: '12:40 PM', label: 'First successful drone flight begins', eventId: 'drone-searches-1240' }
            ]
          },
          {
            hour: '1 PM',
            entries: [
              { time: '1:22 PM', label: 'Second recorded drone flight begins', eventId: 'drone-searches-1240' },
              { time: '1:52 PM', label: 'MDMR records drone flights complete', eventId: 'drone-searches-1240' }
            ]
          },
          {
            hour: '4 PM',
            entries: [
              { time: '~4:30 PM', label: 'MDMR obtains consent to view the Garmin', eventId: 'anchor-position-1630' },
              { time: '4:50 PM', label: 'GPS is powered on for a coordinate photo', eventId: 'anchor-position-1630' }
            ]
          },
          {
            hour: '5 PM',
            entries: [
              { time: '5:54 PM', label: 'JCSO command post is reported at Lake Mars', eventId: 'command-post-sonar' }
            ]
          },
          {
            hour: '6 PM',
            entries: [
              { time: '~6:00 PM', label: 'MDMR deploys a sonar vessel near the northwest tip', eventId: 'command-post-sonar' },
              { time: '6:00 PM', label: 'East Tip image is submitted to the family appeal', eventId: 'east-tip-photo-submission' }
            ]
          },
          {
            hour: '9 PM',
            entries: [
              { time: '9:52 PM', label: 'MDMR requests Coast Guard SAR modeling data', eventId: 'sar-model-request-2152' }
            ]
          }
        ]
      },
      {
        date: 'July 6, 2026',
        hours: [
          {
            hour: '6 AM',
            entries: [
              { time: 'Before 6:00 AM', label: 'United Cajun Navy aircraft is reported airborne', eventId: 'ucn-aircraft-boats' }
            ]
          },
          {
            hour: '8 AM',
            entries: [
              { time: 'Before 8:00 AM', label: 'United Cajun Navy boats finish redeploying', eventId: 'ucn-aircraft-boats' },
              { time: '~8:45 AM', label: 'Authorities receive report that Nolan was found', eventId: 'body-found' }
            ]
          },
          {
            hour: '9 AM',
            entries: [
              { time: '9:11:09 AM', label: 'MDMR assistance CAD call is created', eventId: 'recovery-cad-entries' }
            ]
          },
          {
            hour: '10 AM',
            entries: [
              { time: '10:07:36 AM', label: 'MDMR deceased-person CAD call is created', eventId: 'recovery-cad-entries' }
            ]
          },
          {
            hour: '11 AM',
            entries: [
              { time: 'Just after 11:00 AM', label: 'Nolan’s body reaches the coroner', eventId: 'coroner-family-confirmation' }
            ]
          },
          {
            hour: '12 PM',
            entries: [
              { time: 'Before 1:00 PM', label: 'Family publicly confirms Nolan’s death', eventId: 'coroner-family-confirmation' }
            ]
          }
        ]
      }
    ],
    events: [
      {
        id: 'last-evening-home', date: 'July 3, 2026', dateLong: 'Friday · July 3, 2026', time: 'Evening', precision: 'No exact public time',
        title: 'Nolan leaves home before the trip', type: 'firsthand', confidence: 'Medium', masterAnchor: 'reconstruction', location: 'overview',
        summary: 'Family accounts place Nolan leaving home and staying with friends before the Horn Island trip.',
        claims: ['Nolan made dinner for his parents, hugged his mother, and left to spend the night with friends.'],
        sources: [
          { label: 'Master reconstruction', href: `${master}#reconstruction` },
          { label: 'Family-account source notes', href: `${master}#current-best-sources` }
        ]
      },
      {
        id: 'gps-departure', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '9:56 AM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU departs the mainland', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'elCamino', route: 'outbound',
        summary: 'The official MDMR Garmin extraction summary places the tracked Triton leaving El Camino Real Road at 9:56 AM.',
        claims: ['The vessel identity is MI4088BU.', 'The GPS record establishes vessel movement, not the identity of every passenger.'],
        media: { type: 'image', src: './media/0956-MI4088BU-depart-from-El-Camino-Real-Rd.png', alt: 'GPS image showing MI4088BU departure from El Camino Real Road at 9:56 AM', caption: 'GPS · MI4088BU departure · 9:56 AM' },
        sources: [
          { label: 'Redacted GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'MDMR report · pages 5 and 7', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'anchoring-calls', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 11:00 AM', precision: 'Approximate witness time',
        title: 'Nolan calls Tracestin about anchoring', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he was already at Horn Island when Nolan called for help finding where the group should anchor.',
        claims: ['The time is approximate and comes from Tracestin’s public account, not released call metadata.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'gps-arrival', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '11:14 AM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU arrives at Horn Island', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'hornIsland', route: 'outbound',
        summary: 'The official GPS summary places the tracked Triton at the west tip of Horn Island at 11:14 AM.',
        claims: ['MDMR characterizes the 11:15 AM–4:30 PM GPS point pattern as “consistent with a stationary position.” The UCN-released nearshore configuration and later Sea Tow offshore coordinate establish at least one positional change inside that interval, so the phrase cannot accurately mean the vessel remained fixed at one location. The released GPS summary does not provide the point table needed to reconstruct that earlier movement.'],
        media: { type: 'image', src: './media/1114-MI4088BU-arrives-at-West-Tip-of-Horn-Island.png', alt: 'GPS image showing MI4088BU arriving at the west tip of Horn Island at 11:14 AM', caption: 'GPS · MI4088BU arrival · 11:14 AM' },
        sources: [
          { label: 'Redacted GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'MDMR report · page 5', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'triton-pre-430-repositioning', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Between 11:14 AM and 4:31 PM', precision: 'Bounded interval; exact movement time and number of movements unresolved',
        title: 'Triton changes position at least once', type: 'verified', confidence: 'High', masterAnchor: 'ucn-august-3-release', location: 'seaTowCoordinate',
        summary: 'The nearshore boat configuration and the Triton’s later Sea Tow coordinate establish that MI4088BU repositioned at least once before 4:30 PM, inside the interval MDMR described as “consistent with a stationary position.”',
        claims: ['The vessel did not remain fixed at one location throughout the 11:15 AM–4:30 PM interval.', 'The map marker uses the Sea Tow caller’s stated current GPS position: 30°14.684′ N, 88°46.790′ W.', 'The evidence establishes one or more positional changes but does not determine the exact minute, route, distance traveled, number of movements, or whether each movement occurred under the Triton’s own power or assistance. No connecting route is drawn.', 'MDMR’s 4:31 PM marker is the start of the published sustained northbound departure segment, not the vessel’s first positional change after arriving at Horn Island.'],
        media: { type: 'image', src: './media/ucn-release-2026-08-03/04-comparative-configuration-slide.jpg', alt: 'Released comparative configuration slide showing the Triton among the nearshore boat gathering at Horn Island', caption: 'UCN-distributed comparative configuration · nearshore placement · exact capture minute unresolved' },
        sources: [
          { label: 'Master analysis and complete four-image gallery', href: `${master}#ucn-august-3-release` },
          { label: 'Sea Tow coordinate transcript', href: './transcripts/seatow-audio.html#audio-analysis' },
          { label: 'Redacted GPS extraction summary · page 1', href: `${gpsSummary}#page=1` },
          { label: 'MDMR report · page 5', href: `${report}#page=5` }
        ]
      },
      {
        id: 'early-afternoon', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Early afternoon', precision: 'Broad witness placement',
        title: 'Nolan socializes among the boats', type: 'firsthand', confidence: 'Medium', masterAnchor: 'reconstruction', location: 'hornIsland',
        summary: 'Public witness accounts and circulated media place Nolan swimming and socializing with the larger group during the early afternoon.',
        claims: ['The available image does not authenticate an exact capture time.'],
        media: { type: 'image', src: './media/2026-07-04-Nolan-on-boat-with-bros.png', alt: 'Nolan with friends on a boat on July 4, 2026', caption: 'Circulated image · exact capture time not authenticated' },
        sources: [
          { label: 'Master reconstruction', href: `${master}#reconstruction` },
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' }
        ]
      },
      {
        id: 'lucas-aviz-last-contact', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Probably 2:00–2:30 PM', precision: 'Apparent firsthand statement preserved only in a derivative screenshot',
        title: 'Lucas Aviz describes a conversation and white center-console boat', type: 'firsthand', confidence: 'Low', masterAnchor: 'social-source-review', location: null,
        summary: 'A screenshot attributes to Lucas Aviz that Nolan said “I have to leave” around 2:00–2:30 PM and that Aviz last saw him get onto an unidentified white center-console boat.',
        claims: ['The screenshot reads as Aviz describing his own conversation and sighting.', 'The cropped parent post and direct Lucas comment permalink were not recovered.', 'The boat is unidentified and must not be equated with MI4088BU.'],
        media: { type: 'image', src: './media/social-source-audit/2026-07-06-tonya-lucas-aviz-last-contact.jpg', alt: 'Screenshot preserving a Lucas Aviz comment about a conversation and a white center-console boat around 2 to 2:30 PM', caption: 'Derivative screenshot · apparent firsthand lead · parent post unrecovered' },
        sources: [
          { label: 'Source-level social ledger', href: './social-source-ledger.html#lucas-aviz-last-contact' },
          { label: 'Preserving Facebook comment · July 6', href: 'https://www.facebook.com/reel/895769156900111/?comment_id=2512277019214890' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'stephen-ray-east-end-sighting', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Time not stated', precision: 'Tentative apparent firsthand recollection preserved in a screenshot',
        title: 'Tentative east-end sand-dune sighting', type: 'firsthand', confidence: 'Low', masterAnchor: 'social-source-review', location: null,
        summary: 'A screenshot preserves Stephen Ray writing that he felt they had seen Nolan at the east end standing on a sand dune on July 4.',
        claims: ['The wording is expressly tentative.', 'No exact time, precise position, image of Nolan, or independent confirmation is provided.'],
        media: { type: 'image', src: './media/social-source-audit/2026-07-06-sherida-stephen-ray-east-end-sighting.jpg', alt: 'Screenshot preserving Stephen Ray’s tentative east-end sighting comment', caption: 'Derivative screenshot · tentative sighting · exact time unknown' },
        sources: [
          { label: 'Source-level social ledger', href: './social-source-ledger.html#stephen-ray-sighting' },
          { label: 'Preserving Facebook comment · July 6', href: 'https://www.facebook.com/reel/895769156900111/?comment_id=1317849450563956' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'warren-last-sighting', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 3:00 PM', precision: 'Approximate witness recollection',
        title: 'Warren’s reported last personal sighting', type: 'firsthand', confidence: 'Medium', masterAnchor: 'warren', location: 'hornIsland',
        summary: 'Warren later placed his own last sighting of Nolan at about 3:00 PM and described Nolan interacting with Katie.',
        claims: ['This is Warren’s last sighting, not necessarily Nolan’s final confirmed sighting by anyone.'],
        sources: [
          { label: 'Warren interview · Part 2', href: './transcripts/warren-part-2.html' },
          { label: 'Master Warren notes', href: `${master}#warren` }
        ]
      },
      {
        id: 'altercation', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 3:30 PM', precision: 'Approximate witness reconstruction',
        title: 'Tracestin describes an altercation', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he became involved in an altercation with another man on the island.',
        claims: ['The exact start time has not been independently authenticated.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'forced-aboard', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Immediately afterward', precision: 'Sequence reported by witness; no objective time',
        title: 'Tracestin says his uncle forced him aboard', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says his uncle required him to return to the family boat after the altercation.',
        claims: ['The available public record does not establish an exact minute for this transition.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin notes', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'nolan-nearby-account', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Reportedly nearby', precision: 'Witness placement only',
        title: 'Tracestin places Nolan nearby', type: 'firsthand', confidence: 'Low', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin has said Nolan was in the water nearby during this general period but was not visible in the viral video.',
        claims: ['No released objective timestamp independently fixes Nolan’s position during the altercation.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master Tracestin questions', href: `${master}#tracestin` }
        ]
      },
      {
        id: 'sea-tow-call', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 4:00 PM', precision: 'Call occurred before 4:31 PM; exact start unresolved',
        title: 'Sea Tow receives a distress call from west of Horn Island', type: 'verified', confidence: 'High', masterAnchor: 'sea-tow', location: 'seaTowCoordinate',
        summary: 'Released audio establishes a call from 30°14.684′ N, 88°46.790′ W about a boat taking on water after bilge-pump failure, with approximately seven people reported aboard.',
        claims: ['The caller reports that everyone aboard is okay.', 'The caller says the vessel is not aground and asks for it to be kept afloat and towed back.', 'The spoken coordinate is verified from the released call; its precision and the exact call-start time remain separate questions.', 'Public labels of 3:48 PM or approximately 4:00 PM are not authenticated by released original metadata.'],
        media: { type: 'audio', src: './media/2026-07-04-full-dispatch-call.mp4', alt: 'Full released Sea Tow and dispatch call audio', caption: 'Full released call · 9:46 · exact original timestamp unresolved' },
        audioTracks: [
          {
            label: 'Caller and boat channel — enhanced',
            src: './media/audio/03-caller-and-boat-channel-enhanced.mp3',
            note: 'Recommended first listen · altered for clarity'
          },
          {
            label: 'Caller and boat channel — unaltered',
            src: './media/audio/02-caller-and-boat-channel-only.mp3',
            note: 'Isolated source channel · no clarity processing'
          },
          {
            label: 'Original stereo excerpt',
            src: './media/audio/01-official-call-first-201s-stereo.mp3',
            note: 'First 3:21 · both original channels'
          },
          {
            label: 'Dispatcher channel only',
            src: './media/audio/04-dispatcher-channel-only.mp3',
            note: 'Isolated source channel'
          }
        ],
        sources: [
          { label: 'Audio analysis and transcript', href: './transcripts/seatow-audio.html#audio-analysis' },
          { label: 'Master Sea Tow notes', href: `${master}#sea-tow` },
          { label: 'MDMR report · page 5', href: `${report}#page=5` }
        ]
      },
      {
        id: 'seatow-anchor-overlap', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 4:00–4:31 PM', precision: 'Coordinate comparison and sequence inference; exact call and tow-start times unresolved',
        title: 'Sea Tow and Garmin references converge offshore', type: 'hypothesis', confidence: 'Medium', masterAnchor: 'anchor-coordinate-overlap', location: 'seaTowCoordinate',
        summary: 'The coordinate spoken during the Sea Tow call and the Garmin point MDMR later recorded as the vessel’s last known anchor reference are approximately 916 feet (279 meters) apart, placing both records in the same general offshore area west of Horn Island.',
        claims: ['Sea Tow coordinate: 30°14.684′ N, 88°46.790′ W.', 'Later-recorded Garmin reference: 30°14.626′ N, 88°46.629′ W.', 'The straight-line separation is approximately 916 feet; the points are close but not identical.', 'The combined sequence strongly supports the final anchorage, distress call, and start of private assistance occurring in the same general area.', 'The released packet does not identify the exact point where a tow line was attached or explicitly assign the Garmin coordinate to 4:30 PM on July 4.'],
        sources: [
          { label: 'Sea Tow call transcript', href: './transcripts/seatow-audio.html#audio-analysis' },
          { label: 'MDMR report · pages 4 and 9', href: `${report}#page=4` },
          { label: 'Redacted GPS extraction summary', href: `${gpsSummary}#page=1` },
          { label: 'Master coordinate analysis', href: `${master}#anchor-coordinate-overlap` }
        ]
      },
      {
        id: 'viral-video', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Reported around 4:01 PM', precision: 'Reposted label; original metadata not obtained',
        title: 'The circulated altercation video', type: 'media', confidence: 'Medium', masterAnchor: 'viral-video', location: 'hornIsland',
        summary: 'Tracestin publicly identifies himself as the person yelling in the circulated clip and says Nolan is not visible in it.',
        claims: ['The clip’s contents are public; the reported 4:01 PM timestamp remains unauthenticated.', 'The video does not establish Nolan’s location.'],
        media: { type: 'video', src: './media/2026-07-04-tracetin-fighting.mp4', alt: 'Circulated altercation video from Horn Island', caption: 'Circulated video · reported time not authenticated' },
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Original public X post · July 6, 2026', href: 'https://x.com/RIPTWITTA/status/2074205423608246317' },
          { label: 'TMZ · original owner’s account', href: 'https://www.tmz.com/2026/07/10/photographer-who-took-viral-nolan-wells-video-says-he-didnt-fight/' },
          { label: 'Master viral-video notes', href: `${master}#viral-video` }
        ]
      },
      {
        id: 'anna-videographer-attribution', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Reported around 4:01 PM', precision: 'Identity confirmed from the supplied profile; recording time remains unauthenticated',
        title: 'Anna C. Moore records the circulated video', type: 'firsthand', confidence: 'Medium', masterAnchor: 'anna', location: 'hornIsland',
        summary: 'Anna C. Moore is identified as the owner of the circulated recording. Her direct clarification says she never saw Nolan and never said the recorded argument involved him.',
        claims: [
          'The supplied Facebook profile confirms the videographer’s identity as Anna C. Moore.',
          'The original X post asks whether Nolan was arguing, establishing the uploader’s question—not that Nolan appears in the recording.',
          'Moore says a friend prompted her to review Snapchat, that she sent the clip to authorities and Nolan’s mother, and that she posted it publicly on July 6.',
          'The public source chain establishes Moore’s presence on Horn Island and reason for reviewing the footage; it does not authenticate the 4:01 PM recording time or establish that Nolan appears.'
        ],
        sources: [
          { label: 'Anna C. Moore · supplied Facebook profile', href: 'https://www.facebook.com/share/19EttKhMgq/?mibextid=wwXIfr' },
          { label: 'Anna C. Moore · direct July 7 clarification', href: 'https://www.facebook.com/anna.grace.cooper/posts/pfbid02bimdnAUwCFJCZJdYb8Mm5s1uqGqcMjYiA1G6yLdYnPMA8Mm8jEJYu1zoxcPVkeYdl' },
          { label: 'Original public X post · July 6, 2026', href: 'https://x.com/RIPTWITTA/status/2074205423608246317' },
          { label: 'TMZ · original owner’s account', href: 'https://www.tmz.com/2026/07/10/photographer-who-took-viral-nolan-wells-video-says-he-didnt-fight/' },
          { label: 'Master Anna notes', href: `${master}#anna` }
        ]
      },
      {
        id: 'ivy-video-account', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Reported 4:01 PM', precision: 'Witness-reported time; native video metadata not public',
        title: 'Ivy Elizabeth explains the video sequence', type: 'firsthand', confidence: 'Medium', masterAnchor: 'social-source-review', location: 'hornIsland',
        summary: 'Ivy says she and her husband appear on the boat, that the yelling happened after a fight had been broken up, and that DMR arrived shortly afterward.',
        claims: ['Ivy says a background figure resembled Nolan but explicitly says they were not 100% certain.', 'She says Nolan was not involved in the altercation she described.', 'Her 4:01 time is not authenticated by publicly available native metadata.'],
        sources: [
          { label: 'Ivy Elizabeth · direct Facebook reply', href: 'https://www.facebook.com/anna.grace.cooper/posts/pfbid02bimdnAUwCFJCZJdYb8Mm5s1uqGqcMjYiA1G6yLdYnPMA8Mm8jEJYu1zoxcPVkeYdl?comment_id=2130380197901966&reply_comment_id=2071292096804541' },
          { label: 'Source-level social ledger', href: './social-source-ledger.html#ivy-video-account' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'tracestin-leaves', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Shortly afterward', precision: 'Witness sequence; exact minute unresolved',
        title: 'Tracestin says he leaves the island', type: 'firsthand', confidence: 'Medium', masterAnchor: 'tracestin', location: 'hornIsland',
        summary: 'Tracestin says he departed with his family after being forced back onto their boat.',
        claims: ['The exact relationship between this departure, the video, and the Sea Tow call is not independently established.'],
        sources: [
          { label: 'Tracestin interview · Part 5', href: './transcripts/tracestin-part-5.html' },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
        ]
      },
      {
        id: 'accounts-nolan-stays', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Before 4:31 PM', precision: 'No authenticated exact time',
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
        id: 'private-assistance', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Before departure', precision: 'Established sequence; exact minute unresolved',
        title: 'Private assistance replaces Sea Tow response', type: 'verified', confidence: 'High', masterAnchor: 'sea-tow', location: 'hornIsland',
        summary: 'The released call records that private assistance had been arranged and the Sea Tow response was canceled.',
        claims: ['The public call does not itself authenticate the later tow’s full participant list.'],
        sources: [
          { label: 'Sea Tow call transcript', href: './transcripts/seatow-audio.html' },
          { label: 'Master Sea Tow notes', href: `${master}#sea-tow` }
        ]
      },
      {
        id: 'gps-movement-431', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '4:31 PM', precision: 'Minute-level GPS timestamp',
        title: 'Published sustained northbound segment begins', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'slowTow',
        summary: 'At 4:31 PM, MDMR’s released chronology begins a sustained northbound segment from the west tip at approximately 0.06–4.2 knots. When read with the distress call and its later cancellation after private help was arranged, this is most likely the private-assistance or tow segment.',
        claims: ['MDMR verifies approximately 2.75 miles of slow movement through 5:24 PM.', 'The UCN-released nearshore configuration and Sea Tow position establish earlier repositioning; 4:31 PM marks the published sustained departure segment, not first positional change.', 'The interpretation that this was the assistance or tow phase is strongly supported by sequence and speed, but GPS alone does not prove a tow line, towing configuration, or assisting vessel.', 'GPS does not reveal who was aboard, where Nolan was, or whether passengers transferred.'],
        sources: [
          { label: 'Redacted GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'MDMR report · pages 5 and 7', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'phone-and-passenger-account', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'At departure', precision: 'Witness and secondhand accounts',
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
        id: 'horn-island-overnight-presence', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '4:31 PM through the night', precision: 'Next-morning firsthand observation; exact arrival and departure times unavailable',
        title: 'Horn Island was not necessarily deserted after the group left', type: 'firsthand', confidence: 'Medium', masterAnchor: 'overnight-island-presence', location: 'hornIsland',
        summary: 'Attorney Phillip Elmore says that when he reached Horn Island the next morning, he saw a family that had stayed overnight and two boats still docked there.',
        claims: ['The account challenges a blanket description of Horn Island as deserted after MI4088BU left.', 'It does not establish that the campers or boat occupants were near Nolan, could see him, or observed him alive after 4:31 PM.'],
        sources: [
          { label: 'WLOX · July 10 family press conference', href: wloxPressConference },
          { label: 'Master overnight-presence analysis', href: `${master}#overnight-island-presence` }
        ]
      },
      {
        id: 'critical-overlap', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '3:45–4:31 PM', precision: 'Analytical window; ordering remains unresolved',
        title: 'The critical unresolved window', type: 'unknown', confidence: 'Medium', masterAnchor: 'critical-overlap', location: 'hornIsland',
        summary: 'This is the narrow period in which the public accounts of the altercation, viral video, distress call, Tracestin’s departure, Nolan remaining, and MI4088BU’s departure converge.',
        claims: ['The available public evidence does not establish the exact minute-by-minute ordering of the fight, video, and Sea Tow call.', 'This window is an analytical focus, not proof of a theory.'],
        sources: [
          { label: 'Master critical-overlap analysis', href: `${master}#critical-overlap` },
          { label: 'Master unresolved gaps', href: `${master}#major-timeline-gaps` }
        ]
      },
      {
        id: 'katie-five-oclock-message', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 5:00 PM (reported)', precision: 'Approximate wording in attributed screenshots; not an authenticated event time',
        title: 'Attributed message says Wyatt asked Nolan to board “at five”', type: 'secondhand', confidence: 'Low', masterAnchor: 'katie-message-source', location: 'hornIsland',
        summary: 'Four screenshots in a public Boogie LowDown post show a conversation labeled Katie Hudson Seymour in which the sender says Wyatt repeatedly asked Nolan to board “at five when it was time to leave,” but Nolan wanted to stay with a girl.',
        claims: ['The sender says the girl’s boat was parked next to Wyatt’s and that other people heard Wyatt ask Nolan several times.', 'The sender says Wyatt’s boat began filling with water, later broke down, and was towed.', 'The sender says Warren was not on Wyatt’s boat, later noticed Nolan was missing, and contacted Nolan’s mother, the Coast Guard, and the sheriff’s office.', 'The screenshots do not independently authenticate the sender, completeness, message date, or the underlying account. The five-o’clock wording is not reconciled with MI4088BU’s verified 4:31 PM movement.'],
        media: { type: 'image', src: './media/social-source-audit/2026-07-05-katie-hudson-seymour-message-1.jpg', alt: 'First of four public screenshots showing a Messenger conversation labeled Katie Hudson Seymour', caption: 'Publicly posted attributed message screenshots · sender and event time not independently authenticated' },
        sources: [
          { label: 'Four-image social-source record', href: './social-source-ledger.html#katie-hudson-seymour-messages' },
          { label: 'Original Boogie LowDown post', href: 'https://www.facebook.com/marcust.hughes.7/posts/warren-hudsons-mother-katie-hudson-seymour-reached-out-to-me-on-7526-at-around-1/1669989390895030/' },
          { label: 'Master source assessment', href: `${master}#katie-message-source` },
          { label: 'MDMR GPS summary · page 5', href: `${report}#page=5` }
        ]
      },
      {
        id: 'lamp-passenger-account', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 5:00 PM', precision: 'Approximate secondhand account preserved in screenshots',
        title: 'Passenger account describes an “almost” fight', type: 'secondhand', confidence: 'Low', masterAnchor: 'social-source-review', location: 'hornIsland',
        summary: 'A screenshot of a public Matthew Lamp thread says an unnamed passenger was “pretty certain” Nolan was part of a group that was almost fighting around 5:00 PM; Lamp later says three people on his boat described it as among the group.',
        claims: ['Lamp also wrote that a blue-top Bertram left shortly afterward and “pretty fast.”', 'The claim is not a direct statement from the unnamed passengers and the original thread has not been recovered.', 'The approximate time is not reconciled with the separate 4:31 PM GPS movement of MI4088BU and must not be treated as a verified sequence.'],
        media: { type: 'image', src: './media/social-july-5-comments/2026-07-06-racquel-matthew-lamp-thread.jpg', alt: 'Screenshot preserving a Matthew Lamp Facebook thread about an unnamed passenger account of an almost-fight around 5 PM', caption: 'Public screenshot · secondhand passenger account · exact time and original thread unverified' },
        sources: [
          { label: 'Source-level social ledger', href: './social-source-ledger.html#matthew-lamp-lead' },
          { label: 'Latasha A Manuel comment · July 6', href: 'https://www.facebook.com/christine.wonsley/posts/pfbid0C4exFqFakf7SW625QkonBCrCjqfzKhPW71ZRG2A7cCPuZnUa3DvwVK436aDBEYEbl?comment_id=1758629241845860' },
          { label: 'RaćQuel Kirsten comment · July 6', href: 'https://www.facebook.com/christine.wonsley/posts/pfbid0C4exFqFakf7SW625QkonBCrCjqfzKhPW71ZRG2A7cCPuZnUa3DvwVK436aDBEYEbl?comment_id=1802007094509647' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'katelynn-nearby-boats-account', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 5:00 PM / until 7:30 PM', precision: 'Ambiguous firsthand reply; referents and vessel not identified',
        title: 'Nearby-boats reply leaves its 5:00 and 7:30 referents unresolved', type: 'firsthand', confidence: 'Low', masterAnchor: 'social-source-review', location: null,
        summary: 'Katelynn Brochard says “we were out there next to where he was until 7:30” and “they did leave around 5,” but the boat, location, and pronouns are not identified.',
        claims: ['The reply may describe a nearby boat’s continued presence and a different boat’s departure.', 'It cannot responsibly be converted into a Nolan sighting at 5:00 or 7:30 PM.'],
        sources: [
          { label: 'Katelynn Brochard · direct Facebook reply', href: 'https://www.facebook.com/anna.grace.cooper/posts/pfbid02bimdnAUwCFJCZJdYb8Mm5s1uqGqcMjYiA1G6yLdYnPMA8Mm8jEJYu1zoxcPVkeYdl?comment_id=1365918772272100&reply_comment_id=1052428337137392' },
          { label: 'Source-level social ledger', href: './social-source-ledger.html#katelynn-boats-account' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'gps-normal-525', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '5:25 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU regains normal operation', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'return',
        summary: 'MDMR reports that the tracked vessel accelerates to approximately 30–35 knots after the period of slow movement.',
        claims: ['The slow-movement interval lasted about 53 minutes.'],
        sources: [
          { label: 'Redacted GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'MDMR report · page 5', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
        ]
      },
      {
        id: 'gps-return-544', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '5:44 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU reaches El Camino Real Road', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'elCamino', route: 'return',
        summary: 'The official report places the tracked Triton back at El Camino Real Road at 5:44 PM.',
        claims: ['This site does not use the upstream 5:44 graphic because its vessel label conflicts with the obtained report.'],
        sources: [
          { label: 'Redacted GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'MDMR report · pages 2 and 5', href: `${report}#page=2` },
          { label: 'Master boat distinction', href: `${master}#boats` }
        ]
      },
      {
        id: 'family-contacted', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 11:00–11:07 PM', precision: 'Two approximate publicly reported times; callers may be different people',
        title: 'Coast Guard and family contacts are reported', type: 'firsthand', confidence: 'Medium', masterAnchor: 'late-night-july-4', location: 'overview',
        summary: 'WLOX reports that a friend contacted the Coast Guard around 11:00 PM. Christine Wonsley says Warren called her around 11:07 PM, when Life360 placed Nolan’s phone back on the mainland.',
        claims: ['The public record does not establish whether the Coast Guard caller and Warren were the same person.', 'The Coast Guard later told WLOX that the initial call did not require Coast Guard assistance; the caller’s identity and full recording remain unreleased.', 'Life360’s phone location did not establish Nolan’s location.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'WLOX · July 10 family press conference', href: wloxPressConference },
          { label: 'Master late-night chronology', href: `${master}#late-night-july-4` }
        ]
      },
      {
        id: 'mdmr-missing-cad-1145', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '11:45:14–11:49 PM', precision: 'Exact CAD creation time; minute-level narrative time',
        title: 'MDMR receives the missing-person report', type: 'verified', confidence: 'High', masterAnchor: 'late-night-july-4', location: 'overview',
        summary: 'MDMR CAD call 2607-0196 was created at 11:45:14 PM. At 11:49 PM, Lt. Patrick Carron recorded that Christine Wonsley had reported Nolan missing.',
        claims: ['The report relays that Nolan was last seen around 3:00 PM, his phone was in a friend’s truck, and his friends had returned.', 'Carron directed the family to JCSO and recorded that the Coast Guard had already been notified.', 'The CAD disposition “clear without a report” describes the CAD record; it does not mean the missing-person concern had been resolved.'],
        sources: [
          { label: 'MDMR report · pages 3 and 13', href: `${report}#page=13` },
          { label: 'Master late-night chronology', href: `${master}#late-night-july-4` }
        ]
      },
      {
        id: 'late-night-family-search', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Late night', precision: 'Firsthand family sequence; exact clock times incomplete',
        title: 'Family members try to locate Nolan and recover his belongings', type: 'firsthand', confidence: 'Medium', masterAnchor: 'late-night-july-4', location: 'overview',
        summary: 'Family accounts describe attempts to locate Nolan and retrieve his phone and keys after the 11:07 PM call.',
        claims: ['The phone’s return to the mainland did not establish Nolan’s location.', 'The public record does not prove deletion or alteration of phone data; that would require forensic extraction records.'],
        sources: [
          { label: 'WLOX · July 10 family press conference', href: wloxPressConference },
          { label: 'Master late-night chronology', href: `${master}#late-night-july-4` }
        ]
      },
      {
        id: 'jcso-working-assumption-0138', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '1:38 AM', precision: 'Minute-level official narrative time',
        title: 'MDMR records JCSO’s working explanation', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'overview',
        summary: 'Carron recorded speaking with Ocean Springs Police and JCSO Lt. Odom. The report says JCSO had spoken with friends and understood that Nolan stayed with an unknown woman and returned on another vessel.',
        claims: ['The report says officials did not identify a water-related exigency at that time and MDMR took no further action during the shift.', 'This is proof of what officials were told and how the situation was assessed—not proof that Nolan was with a woman or returned safely.'],
        sources: [
          { label: 'MDMR report · page 3', href: `${report}#page=3` },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'overnight-response-gap', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '1:38 AM to dawn', precision: 'Documented gap in the obtained MDMR record',
        title: 'The obtained MDMR record shows an overnight response gap', type: 'unknown', confidence: 'High', masterAnchor: 'search-july-5', location: 'overview',
        summary: 'After the 1:38 AM communication, the obtained MDMR narrative says its shift took no further action until the next morning’s search response.',
        claims: ['This documents the MDMR packet’s own response sequence.', 'It does not prove that family members, friends, JCSO, the Coast Guard, or every other person took no action during the same hours.'],
        sources: [
          { label: 'MDMR report · page 3', href: `${report}#page=3` },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'family-private-search-0600', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: 'Around 6:00–8:00 AM', precision: 'Approximate family account, corroborated in part by the MDMR narrative',
        title: 'Family and private searchers reach Horn Island before the main MDMR operation', type: 'firsthand', confidence: 'Medium', masterAnchor: 'search-july-5', location: 'searchArea',
        summary: 'Phillip Elmore says he and former coach Les George searched the island and shoreline from a boat beginning around 6:00 AM. MDMR later recorded that they and other private citizens had already searched the northwest tip.',
        claims: ['The exact 6:00 AM start comes from the family’s public account.', 'The MDMR narrative independently places private searchers at the northwest tip when its patrol vessel approached around 8:00 AM.'],
        sources: [
          { label: 'WLOX · July 10 family press conference', href: wloxPressConference },
          { label: 'MDMR report · page 10', href: `${report}#page=10` },
          { label: 'Social ledger · search participation', href: './social-source-ledger.html#search-participation' },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'official-search', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: 'Around 8:00 AM', precision: 'Approximate official narrative time',
        title: 'MDMR launches the Admiral Dewey and begins shoreline and water searches', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'searchArea',
        summary: 'MDMR launched the patrol vessel Admiral Dewey, searched the southwest shoreline and dunes, and worked the waters near Horn Island’s northwest tip.',
        claims: ['The MDMR narrative records other agencies and private vessels in the area.', 'The available packet does not provide a complete unified track or participant list for every search asset.'],
        sources: [
          { label: 'MDMR report · page 10', href: `${report}#page=10` },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'drone-request-and-failures', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '9:00–10:30 AM', precision: 'Mixed approximate narrative times and exact CAD creation times',
        title: 'Drone assistance is requested, but early launch attempts fail', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'searchArea',
        summary: 'MDMR requested drone assistance around 9:00 AM. Around 10:00 AM, three launch attempts failed because of software problems, prompting a request for additional drone support around 10:30 AM.',
        claims: ['CAD entries at 9:08:22 AM and 10:05:53 AM are call-creation times, not necessarily the exact start of field activity.', 'The failed attempts did not produce an aerial clearance of the area.'],
        sources: [
          { label: 'MDMR report · pages 4, 12 and 13', href: `${report}#page=4` },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'female-lead-1155', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '11:55 AM', precision: 'Minute-level official narrative time',
        title: 'MDMR follows up on a reported female lead', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'overview',
        summary: 'Officer Strickland contacted Laney Naquin, who said she had been on Petit Bois Island, not Horn Island, and had not seen or spoken with Nolan in more than a year.',
        claims: ['Naquin also denied contact with Jacob Woods and Drew Johnson.', 'The record does not establish that Naquin was the same person described earlier only as an “unknown female.”'],
        sources: [
          { label: 'MDMR report · page 9', href: `${report}#page=9` },
          { label: 'Strickland supplement', href: stricklandSupplement },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'coast-guard-public-activation', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '12:26–12:31 PM', precision: 'Minute-level agency and publication times reported by WLOX',
        title: 'Coast Guard response and public missing-person notice begin', type: 'media', confidence: 'High', masterAnchor: 'search-july-5', location: 'searchArea',
        summary: 'WLOX reports that Coast Guard Sector Mobile received JCSO’s assistance request at 12:26 PM, issued an urgent marine information broadcast, and launched a helicopter. JCSO published its missing-person notice at 12:31 PM.',
        claims: ['These times mark the documented federal request and public notice, not the first moment any person searched.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'drone-searches-1240', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '12:40–1:52 PM', precision: 'Minute-level official narrative and CAD times',
        title: 'Two recorded drone searches cover limited grids', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'droneLaunchOne',
        summary: 'The first successful flight launched at 12:40 PM from 30°14.603′ N, 88°46.427′ W. A second launched at 1:22 PM from 30°14.454′ N, 88°45.966′ W.',
        claims: ['Each flight covered a recorded 0.1-square-mile parallel grid.', 'The second ended after a heat-swollen battery separated; further flights were canceled and Nolan was not found.', 'The CAD record marks the flights complete at 1:52 PM; these limited grids do not establish that every part of the island was visually cleared.', 'The report later depicts the flight areas in relation to the vessel’s last known anchor position, but it does not establish that MDMR had the Garmin coordinate before these flights or used it prospectively to plan them.'],
        media: { type: 'image', src: droneGrid, alt: 'Released MDMR drone search grid near Horn Island', caption: 'Released search grid · coverage must not be generalized beyond the recorded flights' },
        sources: [
          { label: 'MDMR report · pages 4 and 12', href: `${report}#page=4` },
          { label: 'Released drone search grid', href: droneGrid },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'anchor-position-1630', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: 'Around 4:30–4:50 PM', precision: 'Approximate contact time and exact GPS power-on time',
        title: 'MDMR records the Garmin anchor coordinate', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'anchorPosition',
        summary: 'Around 4:30 PM, MDMR obtained consent to view the Garmin on MI4088BU. The extraction timeline records the GPS being powered on at 4:50 PM for a photograph of the search coordinate.',
        claims: ['The displayed anchor coordinate was 30°14.626′ N, 88°46.629′ W.', 'That point is approximately 916 feet (279 meters) from the coordinate spoken during the Sea Tow call, supporting the same general offshore-area relationship.', 'The 4:30 PM narrative contact and 4:50 PM device power-on are different actions and should not be collapsed into one exact timestamp.', 'The public packet does not explicitly assign this exact point to 4:30 PM on July 4 or identify it as the tow-line attachment point.'],
        sources: [
          { label: 'MDMR report · page 9', href: `${report}#page=9` },
          { label: 'GPS extraction summary · page 2', href: `${gpsSummary}#page=2` },
          { label: 'Strickland supplement', href: stricklandSupplement },
          { label: 'Master coordinate analysis', href: `${master}#anchor-coordinate-overlap` }
        ]
      },
      {
        id: 'command-post-sonar', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '5:54 PM through evening', precision: 'Reported command-post time; approximate sonar deployment time',
        title: 'Command post and sonar search operate into the evening', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'searchArea',
        summary: 'WLOX reported the JCSO command post at Lake Mars at 5:54 PM. Around 6:00 PM, MDMR sent a patrol vessel to conduct sonar work near the northwest tip.',
        claims: ['MDMR described the sonar results as inconclusive and said the work stopped because of adverse weather.', 'An inconclusive sonar run is not a clearance of the area.'],
        sources: [
          { label: 'MDMR report · page 3', href: `${report}#page=3` },
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'east-tip-photo-submission', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '6:00 PM', precision: 'Visible Facebook publication time; image capture time unauthenticated',
        title: 'East Tip image is submitted to the family appeal', type: 'media', confidence: 'Medium', masterAnchor: 'social-source-review', location: 'overview',
        summary: 'Ashton Beach Jennings publicly responds to Christine Wonsley’s missing-person appeal with a photograph captioned “East Tip. July 4.”',
        claims: ['The image shows boats, a personal watercraft, and people in shallow water.', 'It does not identify Nolan, authenticate its capture time, or depict the northwest search and recovery area.', 'It may help identify vessels or witnesses who were at Horn Island’s east end.'],
        media: { type: 'image', src: './media/social-july-5-comments/2026-07-05-ashton-east-tip.jpg', alt: 'Boats, a personal watercraft, and people in shallow water in an image labeled East Tip, July 4', caption: 'Public Facebook submission · posted July 5 at 6:00 PM · capture metadata unavailable' },
        sources: [
          { label: 'Original Facebook comment', href: 'https://www.facebook.com/christine.wonsley/posts/pfbid0C4exFqFakf7SW625QkonBCrCjqfzKhPW71ZRG2A7cCPuZnUa3DvwVK436aDBEYEbl?comment_id=1602711797954891' },
          { label: 'Source-level social ledger', href: './social-source-ledger.html#ashton-east-tip' },
          { label: 'Master social-source review', href: `${master}#social-source-review` }
        ]
      },
      {
        id: 'sar-model-request-2152', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: '9:52 PM', precision: 'Exact email timestamp',
        title: 'MDMR requests Coast Guard search-and-rescue modeling data', type: 'verified', confidence: 'High', masterAnchor: 'search-july-5', location: 'anchorPosition',
        summary: 'MDMR emailed the Coast Guard for SAR data to guide additional sonar planning, supplying a modeled incident time, anchor coordinate, subject description, clothing, and alcohol-use input.',
        claims: ['The supplied 6:00 PM July 4 incident time was a modeling input, not a verified last-seen or disappearance time.', 'The word “Heavy” under alcohol was an operational input, not a toxicology result.', 'The released particle graphic models possible drift; it is not Nolan’s observed path.'],
        media: { type: 'image', src: particleDrift, alt: 'Released Coast Guard particle-drift model for search planning', caption: 'Search-planning model · not an observed path' },
        sources: [
          { label: 'MDMR email requesting USCG SAR data', href: sarEmail },
          { label: 'Released USCG particle-drift graphic', href: particleDrift },
          { label: 'Master July 5 search chronology', href: `${master}#search-july-5` }
        ]
      },
      {
        id: 'overnight-search-mobilization', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: 'Overnight into July 6', precision: 'Publicly reported operational sequence; complete logs not obtained',
        title: 'Search organizations prepare overnight air and boat operations', type: 'media', confidence: 'Medium', masterAnchor: 'recovery-july-6', location: 'searchArea',
        summary: 'Public reporting describes United Cajun Navy and other search assets preparing aircraft and boats for renewed operations before dawn on July 6.',
        claims: ['The available public record is not a complete overnight activity log for every agency and volunteer asset.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'Master July 6 recovery chronology', href: `${master}#recovery-july-6` }
        ]
      },
      {
        id: 'ucn-aircraft-boats', date: 'July 6, 2026', dateLong: 'Monday · July 6, 2026', time: 'Before 6:00–8:00 AM', precision: 'Approximate times reported in the public operational timeline',
        title: 'Air and boat search assets redeploy before dawn', type: 'media', confidence: 'High', masterAnchor: 'recovery-july-6', location: 'searchArea',
        summary: 'WLOX reports that a United Cajun Navy aircraft was airborne just before 6:00 AM and that the organization’s last boat left to search before 8:00 AM.',
        claims: ['The available reporting establishes a renewed search sequence but is not a complete flight or vessel log.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'Master July 6 recovery chronology', href: `${master}#recovery-july-6` }
        ]
      },
      {
        id: 'body-found', date: 'July 6, 2026', dateLong: 'Monday · July 6, 2026', time: 'Around 8:45 AM', precision: 'Approximate authority-notification time; exact discovery minute not publicly fixed',
        title: 'Authorities receive a report that Nolan was found near the northwest tip', type: 'verified', confidence: 'High', masterAnchor: 'recovery-july-6', location: 'recovery',
        summary: 'The sheriff’s public timeline says authorities received a call around 8:45 AM that a National Park Service ranger had found Nolan near Horn Island’s northwest tip.',
        claims: ['Around 8:45 AM is a reported notification time, not necessarily the exact minute of discovery.', 'Public descriptions alternately say the body was in the water and later “on the beach”; the difference may reflect discovery, observation, or recovery stages but remains unresolved without the ranger report and exact coordinate.', 'The 15-page MDMR packet contains later CAD entries but not a complete recovery narrative.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'MDMR report · page 15', href: `${report}#page=15` },
          { label: 'Master July 6 recovery chronology', href: `${master}#recovery-july-6` }
        ]
      },
      {
        id: 'recovery-cad-entries', date: 'July 6, 2026', dateLong: 'Monday · July 6, 2026', time: '9:11:09–10:07:36 AM', precision: 'Exact CAD call-creation times',
        title: 'MDMR creates assistance and deceased-person CAD calls', type: 'verified', confidence: 'High', masterAnchor: 'recovery-july-6', location: 'recovery',
        summary: 'MDMR CAD records show an assist-another-agency call created at 9:11:09 AM and a deceased-person call created at 10:07:36 AM.',
        claims: ['These timestamps document when CAD calls were entered or created; they are not the discovery time and should not replace the sheriff’s approximately 8:45 AM notification sequence.'],
        sources: [
          { label: 'MDMR report · page 15', href: `${report}#page=15` },
          { label: 'Master July 6 recovery chronology', href: `${master}#recovery-july-6` }
        ]
      },
      {
        id: 'coroner-family-confirmation', date: 'July 6, 2026', dateLong: 'Monday · July 6, 2026', time: 'Just after 11:00 AM–before 1:00 PM', precision: 'Approximate public reporting times',
        title: 'Nolan is transferred to the coroner and his family confirms his death', type: 'media', confidence: 'High', masterAnchor: 'recovery-july-6', location: 'overview',
        summary: 'WLOX reports that Nolan’s body arrived at the coroner’s office in Pascagoula just after 11:00 AM. His family publicly confirmed his death shortly before 1:00 PM.',
        claims: ['Formal dental identification was reported the following day, July 7, around 2:00 PM.', 'Public family confirmation and formal forensic identification are different milestones.'],
        sources: [
          { label: 'WLOX · complete public timeline', href: wloxTimeline },
          { label: 'Master July 6 recovery chronology', href: `${master}#recovery-july-6` }
        ]
      },
      {
        id: 'faith-lauren-reporting-intent', date: 'July 7, 2026', dateLong: 'Tuesday · July 7, 2026', time: '1:08 AM (displayed)', precision: 'Screenshot-displayed time; year inferred from 2026 case context; identity, delivery, and native metadata unauthenticated',
        title: 'Screenshot records an alleged witness’s intent to report', type: 'media', confidence: 'Low', masterAnchor: 'faith-lauren-source', location: null,
        summary: 'A public-post attachment displays a July 7 at 1:08 AM message in which the sender says she witnessed an argument from another boat, had limited footage with her husband, and intended to take information to police.',
        claims: ['A separate displayed first-person statement alleges a phone dispute, an argument continuing ashore, a physical confrontation involving multiple people, and a young woman asking them to stop.', 'The 1:08 AM message uses future-tense language about going to police and submitting information; it does not prove an agency had received the account or footage.', 'The displayed account, sender, recipient, message delivery, year label, underlying allegations, and footage provenance are not independently authenticated.'],
        media: { type: 'image', src: './media/social-source-audit/2026-07-07-faith-lauren-erick-message-0108.jpg', alt: 'Publicly posted screenshot displaying July 7 at 1:08 AM and an alleged witness’s stated intention to report information', caption: 'Displayed July 7 · 1:08 AM · reporting intent preserved; police receipt unverified' },
        sources: [
          { label: 'Five-image social-source record', href: './social-source-ledger.html#faith-lauren-source' },
          { label: 'Original Natalya King public post', href: 'https://www.facebook.com/richedreams/posts/pfbid0cunvci1mCDcYCTVXG3smk2jQXYDR24hRV5LunmQ6kggV5UBitH9e8Dx9aPmLbopPl' },
          { label: 'Master source assessment', href: `${master}#faith-lauren-source` }
        ]
      },
      {
        id: 'anna-clarification', date: 'July 7, 2026', dateLong: 'Tuesday · July 7, 2026', time: '8:19 AM', precision: 'Visible Facebook publication time; refers to earlier media',
        title: 'Anna C. Moore publishes a direct clarification', type: 'firsthand', confidence: 'High', masterAnchor: 'anna', location: null,
        summary: 'Moore directly states that she never saw Nolan and never said the argument heard in her recording involved him.',
        claims: ['She says a friend prompted her to check the Snapchat footage.', 'She says the clip was sent to authorities and Nolan’s mother before public posting.', 'Her clarification does not authenticate the video’s capture time or identify Nolan in the image.'],
        media: { type: 'image', src: './media/social-source-audit/2026-07-07-anna-source-scene-still.jpg', alt: 'Horn Island scene still preserved from Anna C. Moore’s clarification post', caption: 'Source still preserved from direct July 7 clarification · capture metadata unavailable' },
        sources: [
          { label: 'Anna C. Moore · direct clarification', href: 'https://www.facebook.com/anna.grace.cooper/posts/pfbid02bimdnAUwCFJCZJdYb8Mm5s1uqGqcMjYiA1G6yLdYnPMA8Mm8jEJYu1zoxcPVkeYdl' },
          { label: 'Source-level social ledger', href: './social-source-ledger.html#anna-clarification' },
          { label: 'Master Anna notes', href: `${master}#anna` }
        ]
      }
    ]
  };

  const depthByType = {
    verified: {
      confidenceReason: 'An official record, GPS summary, released official audio, or authenticated operational record supports the core event.',
      unknowns: ['The source establishes only the facts stated here; it does not answer every passenger, intent, or sequence question.'],
      needed: ['Underlying native records and metadata, where they have not been publicly released.']
    },
    firsthand: {
      confidenceReason: 'A named witness publicly describes this event, but recollection and exact timing are not independently fixed.',
      unknowns: ['Exact time, exact wording, and independent corroboration remain incomplete unless stated otherwise.'],
      needed: ['Original interview or statement, contemporaneous device records, and corroborating witness accounts.']
    },
    secondhand: {
      confidenceReason: 'The claim is preserved through a later summary or another person’s account rather than a direct contemporaneous record.',
      unknowns: ['Original speaker, exact words, exact time, and full context remain unresolved.'],
      needed: ['A direct statement, contemporaneous message, or authenticated recording from the original source.']
    },
    media: {
      confidenceReason: 'The recording is publicly available, but its original metadata and the identity or location of every person in it are incomplete.',
      unknowns: ['Original capture metadata, unedited context, and complete visual or voice identifications remain unresolved.'],
      needed: ['Original device file, native metadata, and any adjacent footage.']
    },
    unknown: {
      confidenceReason: 'This is a documented evidence gap. Its boundaries are supported, but the events inside it are not resolved minute by minute.',
      unknowns: ['The exact sequence, participant positions, and transitions inside this window remain unresolved.'],
      needed: ['Original timestamped media, complete witness interviews, vessel records, and communications.']
    },
    hypothesis: {
      confidenceReason: 'This is an analytical interpretation, not an independently verified occurrence.',
      unknowns: ['The available record does not prove this interpretation.'],
      needed: ['Independent primary evidence capable of testing the interpretation.']
    }
  };

  const eventDepth = {
    'last-evening-home': {
      unknowns: ['Exact departure time, where Nolan stayed, and any contemporaneous messages about the trip.'],
      needed: ['Contemporaneous texts, call logs, or a direct family statement with a clock time.']
    },
    'gps-departure': {
      unknowns: ['The GPS does not identify every passenger or establish who controlled the vessel.'],
      needed: ['Native Garmin export, extraction summary, and a verified passenger manifest.']
    },
    'anchoring-calls': {
      unknowns: ['Exact call time, duration, device records, and the precise anchoring location discussed.'],
      needed: ['Call-detail records or device screenshots and the original complete interview.']
    },
    'gps-arrival': {
      unknowns: ['The arrival point does not establish when or where each passenger went ashore.'],
      needed: ['Native Garmin export, extraction summary, and contemporaneous photos or videos.']
    },
    'triton-pre-430-repositioning': {
      confidenceReason: 'The released nearshore configuration and the distressed Triton’s later Sea Tow coordinate cannot both describe the vessel’s position without an intervening positional change. The sources bound the movement to the period before 4:30 PM but do not reveal its exact minute or path.',
      known: ['MI4088BU arrived at Horn Island at 11:14 AM.', 'Released configuration evidence places the Triton in the nearshore boat gathering.', 'The Sea Tow caller later gave the distressed Triton’s current offshore coordinate as 30°14.684′ N, 88°46.790′ W before 4:30 PM.', 'The repositioning card’s map marker uses that Sea Tow coordinate.', 'At least one positional change therefore occurred before MDMR’s 4:31 PM sustained departure marker.'],
      unknowns: ['The exact movement time, path, distance from the shoreline, number of repositionings, propulsion or assistance used, and passenger configuration during each change.'],
      needed: ['Native Garmin ADM/GPX point sequence, the complete PowerPoint route slides, original image metadata, and any assisting-vessel track or statement.'],
      sourceViews: [
        { source: 'UCN-distributed configuration', position: 'Places the Triton within the nearshore Horn Island boat gathering; the exact capture minute remains unresolved.' },
        { source: 'Released Sea Tow call', position: 'Provides the distressed Triton’s later current offshore coordinate before 4:30 PM.' },
        { source: 'MDMR GPS summary', position: 'Labels 11:15 AM–4:30 PM “consistent with a stationary position,” but does not publish the underlying point table.' },
        { source: 'Combined finding', position: 'The shoreline and later offshore placements establish at least one intervening positional change; they do not establish a point-by-point route.' }
      ]
    },
    'early-afternoon': {
      unknowns: ['Exact capture times, Nolan’s movements between boats, and the complete set of available media.'],
      needed: ['Original photos and videos with metadata and witness identification of each vessel.']
    },
    'warren-last-sighting': {
      unknowns: ['Warren’s exact last visual contact, Nolan’s words, and who else observed the interaction.'],
      needed: ['Complete original interview, contemporaneous messages, and corroborating accounts.']
    },
    'altercation': {
      unknowns: ['Exact start and end, the complete participant list, and whether the circulated clip overlaps the dispute.'],
      needed: ['Original video with metadata and complete statements from direct witnesses.']
    },
    'forced-aboard': {
      unknowns: ['Exact minute, vessel position, and how long elapsed before departure.'],
      needed: ['Statements from the uncle and other passengers plus original timestamped media.']
    },
    'nolan-nearby-account': {
      unknowns: ['Nolan’s precise position, whether anyone else saw him there, and the exact time of the sighting.'],
      needed: ['Corroborating witness accounts and original media showing the surrounding area.']
    },
    'sea-tow-call': {
      unknowns: ['Exact call-start time, original machine metadata, coordinate accuracy or rounding, and the identity of every voice or passenger.'],
      needed: ['Original Sea Tow system export, call metadata, complete dispatch record, and any contemporaneous position log.'],
      sourceViews: [
        { source: 'Released call', position: 'Supports bilge-pump failure, water ingress, approximately seven aboard, the spoken coordinate, the statement that the vessel was not aground, and later cancellation.' },
        { source: 'WLOX', position: 'Describes the call as occurring around 4:00 PM.' },
        { source: 'Raw publication label', position: 'Uses 3:48 PM; original machine metadata has not authenticated that label.' }
      ]
    },
    'seatow-anchor-overlap': {
      confidenceReason: 'Both coordinates are preserved in released records and their approximately 916-foot separation is reproducible. Treating them as the same general final-anchor and assistance area is an inference because the packet never explicitly joins the point, time, vessel position, and tow attachment in one statement.',
      unknowns: ['Exact call-start time, the time represented by the later Garmin reference, any pre-4:31 point-to-point changes, coordinate accuracy and rounding, tow-line attachment point, assisting vessel, and any passenger transfers.'],
      needed: ['Native Garmin GPX/ADM export, original Sea Tow metadata, assisting-vessel track and statement, and complete passenger accounts.'],
      sourceViews: [
        { source: 'Released call', position: 'Provides 30°14.684′ N, 88°46.790′ W as the caller’s current coordinate.' },
        { source: 'Official MDMR record', position: 'Later records 30°14.626′ N, 88°46.629′ W near the west tip as the Garmin reference.' },
        { source: 'Coordinate comparison', position: 'The two points are approximately 916 feet (279 meters) apart.' },
        { source: 'Limit', position: 'The public packet does not prove the exact tow-attachment point or explicitly timestamp the Garmin coordinate at 4:30 PM on July 4.' }
      ]
    },
    'viral-video': {
      unknowns: ['Whether Nolan appears or can be heard, the original capture time, and what occurred immediately before and after the clip.'],
      needed: ['Original device file, native metadata, unedited adjacent footage, and complete witness identifications.'],
      sourceViews: [
        { source: 'Original X post', position: 'Asks whether Nolan was arguing; it does not establish that he was.' },
        { source: 'Tracestin', position: 'Identifies himself as the yelling voice and says Nolan is not visible.' },
        { source: 'TMZ owner account', position: 'Says the video does not show the reported altercation.' },
        { source: 'Official', position: 'Investigators reviewed the clip; no public finding identifies Nolan in it.' }
      ]
    },
    'anna-videographer-attribution': {
      unknowns: ['Original capture metadata, exact vessel position, complete surrounding footage, and whether Nolan appears.'],
      needed: ['Original device file and an authenticated export preserving metadata.'],
      sourceViews: [
        { source: 'Anna C. Moore profile', position: 'Confirms the supplied identity of the videographer.' },
        { source: 'TMZ owner account', position: 'Reports presence on Horn Island, purpose for recording, and later publication.' },
        { source: 'Original X post', position: 'Shows the public question about whether Nolan was in the clip.' }
      ]
    },
    'tracestin-leaves': {
      unknowns: ['Exact departure time, route, passengers, and relationship to the Sea Tow call and video.'],
      needed: ['Complete statements from the uncle and passengers plus vessel or device-location records.']
    },
    'accounts-nolan-stays': {
      confidenceReason: 'The core claim is a later police and witness summary; Nolan’s exact words and the original listener are not preserved.',
      unknowns: ['Who personally heard Nolan, his exact words, the exact time, and which boat he expected to use.'],
      needed: ['Direct statements from every listener, contemporaneous messages, and original interview recordings.'],
      sourceViews: [
        { source: 'Official summary', position: 'Records that friends said Nolan remained with an unknown woman.' },
        { source: 'Warren', position: 'Says friends urged Nolan to leave and that he declined.' },
        { source: 'Katie', position: 'Reportedly believed Nolan was returning on his original boat.' },
        { source: 'Open conflict', position: 'The exact words, speaker chain, time, and intended return boat remain unresolved.' }
      ]
    },
    'private-assistance': {
      unknowns: ['Who arranged the assistance, the assisting vessel, complete passenger transfers, and exact cancellation time.'],
      needed: ['Full Sea Tow metadata, assisting-vessel statement, and passenger accounts.']
    },
    'gps-movement-431': {
      unknowns: ['GPS cannot establish who was aboard, whether a tow line was attached, or where Nolan was.'],
      needed: ['Native track, extraction summary, tow-vessel identification, and verified passenger statements.'],
      sourceViews: [
        { source: 'Official GPS', position: 'Supports movement beginning at 4:31 PM and the speed range through 5:24 PM.' },
        { source: 'Sequence inference', position: 'The preceding distress call and cancellation after private help was arranged make an assistance or tow phase the strongest current explanation for the slow segment.' },
        { source: 'Witness accounts', position: 'Publicly place Nolan off the boat; GPS itself cannot confirm that.' },
        { source: 'Open question', position: 'GPS alone cannot prove a tow line or configuration; the assisting vessel and all passenger assignments remain incomplete.' }
      ]
    },
    'phone-and-passenger-account': {
      unknowns: ['Who physically had the phone, when possession changed, and the complete passenger list at departure.'],
      needed: ['Phone extraction, chain-of-possession statements, and direct passenger interviews.']
    },
    'critical-overlap': {
      unknowns: ['The minute-by-minute order of the altercation, video, Sea Tow call, departures, and Nolan’s last movements.'],
      needed: ['Original timestamped media, Sea Tow metadata, complete witness statements, and vessel-location records.'],
      sourceViews: [
        { source: 'Official GPS', position: 'Fixes MI4088BU movement at 4:31 PM.' },
        { source: 'Released call', position: 'Places the distress and cancellation before that departure, but not at an authenticated exact minute.' },
        { source: 'Witness accounts', position: 'Place the altercation, Tracestin’s departure, and Nolan remaining in the same general period.' },
        { source: 'Media', position: 'A reposted label places the viral clip around 4:01 PM; original metadata is absent.' }
      ],
      gap: [
        { time: '3:45 PM', state: 'Unknown window opens', known: false },
        { time: '~4:01 PM', state: 'Video time reported, not authenticated', known: false },
        { time: '4:31 PM', state: 'MI4088BU movement begins', known: true }
      ]
    },
    'lamp-passenger-account': {
      confidenceReason: 'The claim is preserved in three screenshots of one public thread, but Matthew Lamp relays unnamed passengers rather than claiming a personal sighting. Duplicate screenshots do not create independent corroboration.',
      unknowns: ['The unnamed passengers’ identities and direct words, the original post and full thread, the precise time and location, which group was involved, the blue-top Bertram’s identity, and whether this describes the same altercation reported earlier.'],
      needed: ['Direct statements from the three passengers, the original Matthew Lamp post and images, native timestamps, and vessel identification.'],
      sourceViews: [
        { source: 'Matthew Lamp screenshot', position: 'Relays that one passenger was “pretty certain” Nolan was part of an almost-fight around 5 PM and that three passengers described it as among the group.' },
        { source: 'Three reposts', position: 'Preserve the same thread in different screenshots; they are one source chain, not three witnesses.' },
        { source: 'Official GPS', position: 'MI4088BU began slow movement at 4:31 PM; the approximate 5 PM claim is not reconciled to that vessel movement.' },
        { source: 'Open conflict', position: 'The reported time may be approximate, may describe another vessel or group, or may be inaccurate. The public record cannot choose among those possibilities.' }
      ]
    },
    'katie-five-oclock-message': {
      confidenceReason: 'The four screenshots preserve one continuous message chain and the public poster’s attribution, but screenshots alone do not authenticate the sender or establish that the sender personally witnessed the reported five-o’clock exchange.',
      unknowns: ['Whether the displayed account sent the messages, whether the sequence is complete, who directly witnessed Wyatt’s requests, whether “at five” is approximate, which vessel and girl are described, and why the wording differs from MI4088BU’s verified 4:31 PM movement.'],
      needed: ['Authenticated message export with metadata, direct statement from the displayed sender, direct statements from Wyatt and the people said to have heard the requests, and reconciliation with the official vessel track.'],
      sourceViews: [
        { source: 'Attributed screenshots', position: 'Show the sender saying Wyatt repeatedly asked Nolan to board at five and that Nolan wanted to stay with a girl.' },
        { source: 'Public poster', position: 'Identifies the displayed sender as Katie Hudson Seymour and dates the conversation to July 5 around 11:30 PM.' },
        { source: 'Official GPS', position: 'Records MI4088BU beginning movement at 4:31 PM, so the reported five-o’clock wording cannot presently be treated as a precise departure time.' },
        { source: 'Open conflict', position: 'The time may be rounded, recalled inaccurately, refer to a different moment or vessel, or otherwise lack context; the public record cannot choose among those explanations.' }
      ]
    },
    'lucas-aviz-last-contact': {
      confidenceReason: 'The words appear to be a named witness’s firsthand account, but only a cropped derivative screenshot is preserved and the parent post and direct Lucas permalink were not recovered.',
      unknowns: ['The original comment context, exact conversation time, Nolan’s meaning, the white center-console boat’s identity, its occupants, and where it went.'],
      needed: ['Direct Lucas Aviz statement, original parent thread, native post data, vessel identification, and corroborating witnesses.'],
      sourceViews: [
        { source: 'Lucas Aviz screenshot', position: 'Describes speaking with Nolan around 2:00–2:30 PM and last seeing him board a white center-console boat.' },
        { source: 'Source limitation', position: 'Only a screenshot repost is preserved; the cropped parent post and direct Lucas permalink are unavailable.' },
        { source: 'Official GPS', position: 'Does not identify the white boat or establish that it was MI4088BU.' }
      ]
    },
    'stephen-ray-east-end-sighting': {
      confidenceReason: 'The apparent witness uses tentative language, and the screenshot provides no exact time or corroborating image.',
      unknowns: ['Exact time, precise dune, viewing distance, identification basis, companions, and whether the person was Nolan.'],
      needed: ['Direct witness interview, original comment context, exact location and time, and corroborating media or witnesses.']
    },
    'ivy-video-account': {
      confidenceReason: 'A named participant directly identifies herself in the scene and describes the sequence, while expressly limiting the possible Nolan identification.',
      unknowns: ['Native video metadata, identities of all participants, exact DMR arrival time, and whether the background figure was Nolan.'],
      needed: ['Original device file, adjacent footage, DMR time record, and complete witness statements.'],
      sourceViews: [
        { source: 'Ivy Elizabeth', position: 'Says the clip follows the fight, identifies herself and her husband in the boat, and says a background figure only resembled Nolan.' },
        { source: 'Anna C. Moore', position: 'Says she never saw Nolan and never claimed the recorded argument involved him.' },
        { source: 'Open limit', position: 'Neither account authenticates the clip’s native capture time or identifies Nolan with certainty.' }
      ]
    },
    'katelynn-nearby-boats-account': {
      confidenceReason: 'The writer appears to speak from personal presence, but the pronouns, boat, position, and relationship between the stated times are unresolved.',
      unknowns: ['Who “we” and “they” were, which vessel left around 5:00 PM, the exact position, and what “where he was” meant.'],
      needed: ['Clarifying statement, boat identification, source images, coordinates, and corroborating accounts.']
    },
    'faith-lauren-reporting-intent': {
      confidenceReason: 'The public post and five attachments preserve the displayed statements and 1:08 AM interface label, but they do not authenticate the account owner, participants, delivery, underlying events, footage, or police receipt.',
      unknowns: ['Who controlled the displayed account and sent the message', 'Whether the recipient received or responded to it', 'Whether and when any law-enforcement agency received the account or footage', 'The original footage, native message export, metadata, and complete conversation', 'The identities of the people allegedly involved and the exact time and location of the described altercation'],
      needed: ['An authenticated direct statement from the displayed speaker', 'Police evidence receipt, report supplement, CAD entry, or submission confirmation', 'Native message export preserving sender, recipient, year, delivery, and timestamps', 'Original video with metadata and complete surrounding footage', 'Corroborating witness interviews'],
      sourceViews: [
        { source: 'July 7 · 1:08 AM screenshot', position: 'Shows a sender expressing an intention to report and claiming that she and her husband had limited footage; future-tense wording does not prove submission.' },
        { source: 'Displayed faithlaurennx statement', position: 'Presents the altercation allegations as personal observation but uses ambiguous wording about whether an account had been or would be provided to investigators.' },
        { source: 'Natalya King caption', position: 'Summarizes the screenshots and says footage was taken to police; that later derivative claim is not a receipt record.' },
        { source: 'Obtained official packet', position: 'The records currently bundled on this site do not establish receipt of this alleged witness account or footage.' },
        { source: 'Open status', position: 'By the displayed time, the allegation and intent to report existed in written form; actual police possession remains unresolved.' }
      ]
    },
    'anna-clarification': {
      confidenceReason: 'This is Anna C. Moore’s direct public statement about what she did and did not claim; it does not independently prove the earlier scene.',
      unknowns: ['Original capture metadata, full adjacent footage, exact boat position, and whether Nolan appears.'],
      needed: ['Original device export, metadata, full footage, and witness identifications.']
    },
    'gps-normal-525': {
      unknowns: ['What resolved the slow movement and the identity of any assisting vessel.'],
      needed: ['Native track, tow statement, and mechanical records.']
    },
    'gps-return-544': {
      unknowns: ['Complete passenger list at return and the precise sequence immediately after arrival.'],
      needed: ['Passenger statements, dock media, and native Garmin records.']
    },
    'family-contacted': {
      unknowns: ['The Coast Guard caller’s identity, whether that caller was Warren, the complete first-call recording, and the exact relationship between the 11:00 and 11:07 accounts.'],
      needed: ['Coast Guard intake audio and log, call-detail records, messages, and direct statements from both callers.'],
      sourceViews: [
        { source: 'Coast Guard via WLOX', position: 'Confirms an around-11:00 PM friend call and says it did not require Coast Guard assistance.' },
        { source: 'Christine Wonsley', position: 'Places Warren’s call to her around 11:07 PM and Nolan’s phone on the mainland.' },
        { source: 'Open interval', position: 'The public record does not establish whether these were the same caller or two separate contacts.' }
      ]
    },
    'horn-island-overnight-presence': {
      confidenceReason: 'Elmore describes what he says he personally observed the next morning; no full camper or boat-occupant account is public.',
      unknowns: ['The campers’ and boat occupants’ identities, their precise positions and times, their lines of sight, and whether they observed Nolan.'],
      needed: ['Direct statements from the overnight campers and boat occupants, photographs, vessel records, and coordinates.'],
      sourceViews: [
        { source: 'Phillip Elmore', position: 'Reports seeing a family that stayed overnight and two boats docked the next morning.' },
        { source: 'What it supports', position: 'Some people and vessels remained on or near Horn Island overnight.' },
        { source: 'What it does not support', position: 'It does not place Nolan alive after 4:31 PM or show that anyone could see him.' }
      ]
    },
    'mdmr-missing-cad-1145': {
      unknowns: ['The complete intake audio, precise source of every relayed detail, and actions taken by other agencies before 1:38 AM.'],
      needed: ['CAD audio, Coast Guard and JCSO call logs, dispatch notes, and original caller statements.']
    },
    'late-night-family-search': {
      unknowns: ['Exact route and times, who possessed each item, and the phone’s condition and data at handoff.'],
      needed: ['Contemporaneous messages, call logs, Life360 export, and forensic chain-of-custody records.']
    },
    'jcso-working-assumption-0138': {
      confidenceReason: 'The official report reliably records the interagency communication and working explanation, but it does not authenticate the underlying friends’ account.',
      unknowns: ['Which friends were interviewed, their exact words, who originated the unknown-female theory, and why a safe return was assumed.'],
      needed: ['JCSO interview recordings, CAD audio, officer notes, and Coast Guard communications.'],
      sourceViews: [
        { source: 'MDMR official narrative', position: 'Records the working explanation and no perceived water-related exigency.' },
        { source: 'Underlying account', position: 'The friends’ original statements are not included in the obtained packet.' },
        { source: 'Evidentiary limit', position: 'The record proves the assessment existed, not that Nolan returned on another vessel.' }
      ]
    },
    'overnight-response-gap': {
      unknowns: ['The complete actions of JCSO, the Coast Guard, family, friends, and other agencies between 1:38 AM and dawn.'],
      needed: ['Every agency’s CAD log, call audio, dispatch notes, search tracks, and family communications.'],
      gap: [
        { time: '1:38 AM', state: 'MDMR records no further shift action', known: true },
        { time: 'Overnight', state: 'Complete multi-agency activity remains unresolved', known: false },
        { time: '~6:00 AM', state: 'Family search reportedly begins', known: false },
        { time: '~8:00 AM', state: 'MDMR patrol vessel launches', known: true }
      ]
    },
    'family-private-search-0600': {
      unknowns: ['Exact launch time, full route, every participant, and what areas were visible from the boat versus searched on foot.'],
      needed: ['GPS tracks, photographs, direct participant statements, and a unified search map.']
    },
    'official-search': {
      unknowns: ['Complete search grids, all aircraft and vessel tracks, and the full interagency decision log.'],
      needed: ['Admiral Dewey track, agency vessel tracks, unified search assignments, radio traffic, and daily activity logs.']
    },
    'drone-request-and-failures': {
      unknowns: ['Software version, detailed failure logs, planned launch coordinates, and whether other agencies flew during the same interval.'],
      needed: ['Drone mission logs, software error records, operator notes, and interagency flight logs.']
    },
    'female-lead-1155': {
      confidenceReason: 'The official supplement establishes that MDMR contacted Naquin and records her response; it does not connect her to the earlier unnamed-woman account.',
      unknowns: ['Who identified Naquin as a lead, whether she was intended to be the unknown woman, and what other female leads were investigated.'],
      needed: ['Source tip, JCSO interviews, call logs, and complete lead-disposition records.']
    },
    'coast-guard-public-activation': {
      confidenceReason: 'A dated local-news timeline attributes these specific operational times to the Coast Guard and JCSO public notice.',
      unknowns: ['The full request content, UMIB transmission log, helicopter mission timeline, and relationship to the prior-night call.'],
      needed: ['Coast Guard case file, audio, UMIB log, aircraft track, and JCSO request record.']
    },
    'drone-searches-1240': {
      unknowns: ['Complete flight logs and imagery, actual visibility conditions, unflown planned grids, independent review of every frame, and whether the Garmin coordinate was available before either flight.'],
      needed: ['Native flight telemetry, original imagery, operator logs, weather, the complete planned-versus-flown map, and contemporaneous search-planning records.']
    },
    'anchor-position-1630': {
      unknowns: ['Native Garmin export, who operated the device before seizure, whether the displayed anchor point was the only relevant saved location, and the exact July 4 timestamp represented by the coordinate.'],
      needed: ['Forensic image, native GPX/ADM files, photograph metadata, chain of custody, examiner notes, and the original point-by-point track.'],
      sourceViews: [
        { source: 'Official narrative', position: 'Records MDMR viewing the Garmin around 4:30 PM on July 5 and observing a July 4 point near the west tip.' },
        { source: 'Search graphic', position: 'The report later represents drone flight areas in relation to the vessel’s last known anchor position.' },
        { source: 'Timing limit', position: 'The public packet does not establish that the Garmin coordinate was available before the earlier drone flights or used prospectively to plan them.' },
        { source: 'Coordinate overlap', position: 'The recorded Garmin point is approximately 916 feet from the coordinate spoken in the Sea Tow call.' }
      ]
    },
    'command-post-sonar': {
      unknowns: ['Sonar vessel track, equipment settings, coverage, weather cutoff time, and interpretation of every return.'],
      needed: ['Sonar files, operator report, track log, weather data, and rescan plan.']
    },
    'sar-model-request-2152': {
      confidenceReason: 'The official 9:52 PM email and released model establish the request and inputs; the model does not validate those inputs or depict an observed path.',
      unknowns: ['Who selected the 6:00 PM incident time and alcohol input, what environmental data and model settings were used, and whether later runs changed the assumptions.'],
      needed: ['Full Coast Guard SAR case file, input rationale, model configuration, all run outputs, and analyst notes.'],
      sourceViews: [
        { source: 'MDMR email', position: 'Records the 9:52 PM request and supplied search-model inputs.' },
        { source: 'Particle graphic', position: 'Shows modeled possible movement under assumptions; it is not an observed track.' },
        { source: 'Open issue', position: 'The public record does not authenticate 6:00 PM as an event time or “Heavy” as a toxicology finding.' }
      ]
    },
    'overnight-search-mobilization': {
      unknowns: ['Complete overnight tasking, exact departure times, all participating assets, and any areas searched before dawn.'],
      needed: ['United Cajun Navy logs, agency incident action plans, aircraft and vessel tracks, and radio traffic.']
    },
    'ucn-aircraft-boats': {
      unknowns: ['Exact airborne and boat-departure times, routes, sensor use, and full participant list.'],
      needed: ['Aircraft and vessel tracks, mission logs, images, and direct operator statements.']
    },
    'east-tip-photo-submission': {
      confidenceReason: 'The Facebook post and visible 6:00 PM publication time are directly preserved. The commenter’s location/date caption is a media lead, not authenticated capture metadata.',
      unknowns: ['Original file and EXIF data, exact capture time and coordinates, photographer position, identities of people and vessels, and whether any depicted person had contact with Nolan.'],
      needed: ['Original device file, photographer statement, vessel identifications, and direct accounts from people shown.'],
      sourceViews: [
        { source: 'Ashton Beach Jennings', position: 'Labels the submitted image “East Tip. July 4.”' },
        { source: 'Visible image', position: 'Shows boats, a personal watercraft, and people in shallow water; it does not visibly establish Nolan’s presence.' },
        { source: 'Geographic limit', position: 'The caption says east tip, while the family appeal requested northwest-tip media and the recovery was near the northwest end.' }
      ]
    },
    'body-found': {
      unknowns: ['Exact discovery minute and coordinate, whether the first observation was in water or on shore, and the sequence from discovery through recovery.'],
      needed: ['National Park Service ranger report, dispatch audio, original coordinates, scene record, and complete coroner and law-enforcement narratives.'],
      sourceViews: [
        { source: 'Sheriff timeline via WLOX', position: 'Places authority notification around 8:45 AM and attributes the find to an NPS ranger.' },
        { source: 'MDMR CAD', position: 'Shows later 9:11:09 and 10:07:36 call-creation times.' },
        { source: 'Open discrepancy', position: 'Public “in the water” and “on the beach” descriptions cannot yet be ordered into discovery and recovery stages.' }
      ]
    },
    'recovery-cad-entries': {
      unknowns: ['What each call’s internal event time was, when MDMR was first notified, and the complete disposition narrative.'],
      needed: ['CAD detail, dispatch audio, officer supplements, and NPS notification record.']
    },
    'coroner-family-confirmation': {
      unknowns: ['Exact transfer and public-statement times and the complete identification process before July 7.'],
      needed: ['Coroner intake record, chain of custody, family statement archive, and dental-identification report.']
    }
  };

  window.NOLAN_EVIDENCE.events.forEach(event => {
    const defaults = depthByType[event.type] || depthByType.hypothesis;
    const depth = eventDepth[event.id] || {};
    event.confidenceReason = depth.confidenceReason || defaults.confidenceReason;
    event.known = depth.known || [event.summary, ...event.claims];
    event.unknowns = depth.unknowns || defaults.unknowns;
    event.needed = depth.needed || defaults.needed;
    event.sourceViews = depth.sourceViews || [
      { source: 'Primary basis', position: `${window.NOLAN_EVIDENCE.types[event.type].label}: ${event.sources.map(source => source.label).join('; ')}.` },
      { source: 'Agreement / conflict', position: 'No additional source comparison is documented beyond the linked evidence and stated unknowns.' }
    ];
    if (depth.gap) event.gap = depth.gap;
  });
})();
