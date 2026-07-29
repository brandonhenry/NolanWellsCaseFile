(function () {
  'use strict';

  const master = './documents/master-investigation-notes.html';
  const report = './documents/MDMR-MP2607-0016-report.pdf';

  window.NOLAN_EVIDENCE = {
    meta: {
      title: 'Nolan Wells',
      range: 'July 3–6, 2026',
      description: 'Nolan Wells, 18, was reported missing after a gathering at Horn Island on July 4, 2026. His body was recovered near the island’s northwest tip on the morning of July 6, 2026. This timeline follows the official GPS record, search activity, witness accounts, and the unresolved period before his boat left the island.',
      opening: {
        location: 'recovery',
        zoom: 15,
        markerLabel: 'Body found · ~8:40 AM',
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
              { time: '11:14 AM', label: 'MI4088BU reaches Horn Island', eventId: 'gps-arrival' }
            ]
          },
          {
            hour: '4 PM',
            entries: [
              { time: '4:31 PM', label: 'MI4088BU begins slow movement', eventId: 'gps-movement-431' }
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
              { time: '11:45:14 PM', label: 'MDMR CAD entry is recorded', eventId: 'family-contacted' }
            ]
          }
        ]
      },
      {
        date: 'July 5, 2026',
        hours: [
          {
            hour: '8 AM',
            entries: [
              { time: '~8:00 AM', label: 'MDMR patrol vessel launches', eventId: 'official-search' }
            ]
          },
          {
            hour: '9 AM',
            entries: [
              { time: '~9:00 AM', label: 'Drone assistance is requested', eventId: 'official-search' }
            ]
          },
          {
            hour: '12 PM',
            entries: [
              { time: '12:40 PM', label: 'Recorded drone flights begin', eventId: 'official-search' }
            ]
          },
          {
            hour: '6 PM',
            entries: [
              { time: '6:00 PM', label: 'East Tip image is submitted to the family appeal', eventId: 'east-tip-photo-submission' }
            ]
          }
        ]
      },
      {
        date: 'July 6, 2026',
        hours: [
          {
            hour: '8 AM',
            entries: [
              { time: '~8:40 AM', label: 'Recovery is publicly reported', eventId: 'body-found' }
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
        claims: ['The boat remains stationary in the GPS summary from approximately 11:15 AM until 4:30 PM.'],
        media: { type: 'image', src: './media/1114-MI4088BU-arrives-at-West-Tip-of-Horn-Island.png', alt: 'GPS image showing MI4088BU arriving at the west tip of Horn Island at 11:14 AM', caption: 'GPS · MI4088BU arrival · 11:14 AM' },
        sources: [
          { label: 'MDMR report · page 5', href: `${report}#page=5` },
          { label: 'Master GPS notes', href: `${master}#official-gps-timeline` }
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
        title: 'Sea Tow receives a distress call', type: 'verified', confidence: 'High', masterAnchor: 'sea-tow', location: 'hornIsland',
        summary: 'Released audio establishes a call about a boat taking on water after bilge-pump failure, with approximately seven people reported aboard.',
        claims: ['The caller reports that everyone aboard is okay.', 'Public labels of 3:48 PM or approximately 4:00 PM are not authenticated by released original metadata.'],
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
        summary: 'Anna C. Moore is identified as the owner of the circulated recording. TMZ reports that the original owner was on Horn Island and posted the clip hoping someone might identify Nolan.',
        claims: [
          'The supplied Facebook profile confirms the videographer’s identity as Anna C. Moore.',
          'The original X post asks whether Nolan was arguing, establishing the uploader’s question—not that Nolan appears in the recording.',
          'TMZ reports that the owner recorded the clip to send to a spouse and later posted it after learning Nolan was missing.',
          'The public source chain establishes Moore’s presence on Horn Island and her belief that Nolan might be identifiable in the recording; it does not authenticate the 4:01 PM recording time or establish that Nolan appears.'
        ],
        sources: [
          { label: 'Anna C. Moore · supplied Facebook profile', href: 'https://www.facebook.com/share/19EttKhMgq/?mibextid=wwXIfr' },
          { label: 'Original public X post · July 6, 2026', href: 'https://x.com/RIPTWITTA/status/2074205423608246317' },
          { label: 'TMZ · original owner’s account', href: 'https://www.tmz.com/2026/07/10/photographer-who-took-viral-nolan-wells-video-says-he-didnt-fight/' },
          { label: 'Master Anna notes', href: `${master}#anna` }
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
        title: 'MI4088BU begins slow movement', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'slowTow',
        summary: 'The tracked Triton begins moving north from the west tip at approximately 0.06–4.2 knots.',
        claims: ['MDMR summarizes approximately 2.75 miles of slow movement through 5:24 PM.', 'GPS does not reveal who was aboard, where Nolan was, or whether passengers transferred.'],
        sources: [
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
        id: 'gps-normal-525', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: '5:25 PM', precision: 'Minute-level GPS timestamp',
        title: 'MI4088BU regains normal operation', type: 'verified', confidence: 'High', masterAnchor: 'official-gps-timeline', location: 'northSound', route: 'return',
        summary: 'MDMR reports that the tracked vessel accelerates to approximately 30–35 knots after the period of slow movement.',
        claims: ['The slow-movement interval lasted about 53 minutes.'],
        sources: [
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
          { label: 'MDMR report · pages 2 and 5', href: `${report}#page=2` },
          { label: 'Master boat distinction', href: `${master}#boats` }
        ]
      },
      {
        id: 'family-contacted', date: 'July 4, 2026', dateLong: 'Saturday · July 4, 2026', time: 'Around 11:00 PM', precision: 'Approximate witness time',
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
        id: 'official-search', date: 'July 5, 2026', dateLong: 'Sunday · July 5, 2026', time: 'Morning onward', precision: 'Mixed exact and approximate operational times',
        title: 'The official search expands', type: 'verified', confidence: 'High', masterAnchor: 'reconstruction', location: 'searchArea',
        summary: 'MDMR narratives and CAD records document patrol-vessel, drone, and multi-agency search activity on July 5, 2026.',
        claims: ['The obtained packet records an MDMR patrol-vessel launch around 8:00 AM, a drone request around 9:00 AM, and drone flights beginning at 12:40 PM.'],
        sources: [
          { label: 'MDMR report · pages 4, 10 and 12', href: `${report}#page=10` },
          { label: 'Master reconstruction', href: `${master}#reconstruction` }
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
        id: 'body-found', date: 'July 6, 2026', dateLong: 'Monday · July 6, 2026', time: 'Around 8:40 AM', precision: 'Approximate public official time',
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
      unknowns: ['Exact call-start time, original machine metadata, and the identity of every voice or passenger.'],
      needed: ['Original Sea Tow system export, call metadata, and the complete dispatch record.'],
      sourceViews: [
        { source: 'Released call', position: 'Supports bilge-pump failure, water ingress, approximately seven aboard, and later cancellation.' },
        { source: 'WLOX', position: 'Describes the call as occurring around 4:00 PM.' },
        { source: 'Raw publication label', position: 'Uses 3:48 PM; original machine metadata has not authenticated that label.' }
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
        { source: 'Witness accounts', position: 'Publicly place Nolan off the boat; GPS itself cannot confirm that.' },
        { source: 'Open question', position: 'The assisting vessel and all passenger assignments remain incomplete.' }
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
      confidenceReason: 'The claim is preserved in two screenshots of one public thread, but Matthew Lamp relays unnamed passengers rather than claiming a personal sighting. Duplicate screenshots do not create independent corroboration.',
      unknowns: ['The unnamed passengers’ identities and direct words, the original post and full thread, the precise time and location, which group was involved, the blue-top Bertram’s identity, and whether this describes the same altercation reported earlier.'],
      needed: ['Direct statements from the three passengers, the original Matthew Lamp post and images, native timestamps, and vessel identification.'],
      sourceViews: [
        { source: 'Matthew Lamp screenshot', position: 'Relays that one passenger was “pretty certain” Nolan was part of an almost-fight around 5 PM and that three passengers described it as among the group.' },
        { source: 'Two reposts', position: 'Preserve the same thread in different screenshots; they are one source chain, not two witnesses.' },
        { source: 'Official GPS', position: 'MI4088BU began slow movement at 4:31 PM; the approximate 5 PM claim is not reconciled to that vessel movement.' },
        { source: 'Open conflict', position: 'The reported time may be approximate, may describe another vessel or group, or may be inaccurate. The public record cannot choose among those possibilities.' }
      ]
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
      unknowns: ['Exact first realization time, who made the first family contact, and the complete communication sequence.'],
      needed: ['Call logs, messages, CAD intake audio, and direct statements.'],
      sourceViews: [
        { source: 'Witness account', position: 'Places family contact around 11:00 PM.' },
        { source: 'MDMR CAD', position: 'Records an official entry at 11:45:14 PM.' },
        { source: 'Open interval', position: 'The sequence between first realization, family contact, and official reporting is incomplete.' }
      ]
    },
    'official-search': {
      unknowns: ['Complete search grids, all aircraft and vessel tracks, and the full interagency decision log.'],
      needed: ['Drone grid, USCG particle drift, vessel tracks, emails, and permission-to-search records.']
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
      unknowns: ['The obtained packet does not contain the complete recovery narrative or a fully authenticated public recovery coordinate.'],
      needed: ['Recovery report, scene photographs, original coordinates, and complete coroner or law-enforcement narrative.']
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
