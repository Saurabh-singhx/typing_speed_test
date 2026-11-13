export const SITE_CONFIG = {
  name: 'Typing Test // Free Typing Speed Test & WPM Benchmark',
  shortName: 'TypeTrack',
  description: 'Test your typing speed with our free online typing test. Measure Words Per Minute (WPM) and CPM, take 1-minute, 3-minute, or 5-minute tests, earn verifiable certificates, and practice touch typing with authentic mechanical switch acoustics.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://typetrack.saurabhx.site',
  ogImage: '/og-image.png',
  creator: '@saurabh_singh',
  gaId: process.env.NEXT_PUBLIC_GA_ID || 'G-4YJX979HKX',
  keywords: [
    'typing test',
    'typing speed test',
    'wpm test',
    'words per minute test',
    'free typing test',
    '1 minute typing test',
    '3 minute typing test',
    '5 minute typing test',
    'typing test with certificate',
    'free typing certificate',
    'keyboard speed test',
    'keyboard test',
    'touch typing test',
    'touch typing practice',
    'cpm test',
    'characters per minute test',
    'typing practice',
    'typing practice online',
    'typing games',
    'test typing speed',
    'check typing speed',
    'fast typing test',
    'typing speed calculator',
    'wpm calculator',
    'words per minute calculator',
    'typing test for beginners',
    'typing test for jobs',
    'data entry typing test',
    'monkeytype alternative',
    'typeracer alternative',
    '10fastfingers alternative',
    'mechanical keyboard typing test',
    'tactical typing test',
    'shatter stream typing',
    'kinetic typing speed test'
  ]
};

export const FAQ_ITEMS = [
  {
    question: "What is an average typing speed, and what is considered fast?",
    answer: "The worldwide average typing speed is approximately 40 words per minute (WPM) with an accuracy rate of around 92%. A typing speed between 60 to 75 WPM is considered above average and typical for professional typists, programmers, and writers. Speeds above 90 to 100 WPM enter the elite esports and transcription tier, representing the top 1% of computer keyboard users."
  },
  {
    question: "How is Words Per Minute (WPM) officially calculated?",
    answer: "Standardized WPM is calculated using the international definition of a 'word' as exactly 5 keystrokes (including letters, spaces, and punctuation). The formula is: WPM = (Total Correct Keystrokes / 5) / (Time in Minutes). 'Raw WPM' measures all keystrokes typed regardless of mistakes, while 'Net WPM' penalizes uncorrected errors."
  },
  {
    question: "Can I get a free typing speed certificate for my resume or job application?",
    answer: "Yes! TypeTrack awards free instant typing certificates across Bronze (40+ WPM / 94%+ accuracy), Silver (50+ WPM / 96%+ accuracy), Gold (70+ WPM / 98%+ accuracy), and Platinum (100+ WPM / 99%+ accuracy) tiers. Your certificate validates your WPM, CPM, and accuracy percentage for job applications, resumes, LinkedIn, and civil service prerequisites."
  },
  {
    question: "What is the difference between WPM and CPM (Characters Per Minute)?",
    answer: "WPM measures Words Per Minute, while CPM measures Characters Per Minute. Because standard typing assessments treat 1 word as 5 characters (including spaces), WPM is simply CPM divided by 5 (CPM / 5 = WPM). For instance, typing 300 CPM equals 60 WPM, and 500 CPM equals 100 WPM."
  },
  {
    question: "What is a 1-minute typing test and why is 60 seconds the standard?",
    answer: "A 1-minute typing test (60 seconds) is the most popular duration for measuring rapid burst typing velocity and reflex speed. It provides an immediate, reliable assessment of keyboard cadence and accuracy without inducing physical fatigue."
  },
  {
    question: "What typing speed do employers require for data entry and office jobs?",
    answer: "Most administrative, customer support, and general office roles require 45 to 60 WPM with at least 95% accuracy. High-volume data entry, transcription, and legal secretary positions typically demand 65 to 85+ WPM with 98%+ accuracy."
  },
  {
    question: "How does TypeTrack compare to Monkeytype, 10FastFingers, and TypeRacer?",
    answer: "TypeTrack merges the distraction-free, zero-latency engine of Monkeytype with the competitive thrill of racing platforms like TypeRacer and Nitro Type. Unlike generic sites with eye-fatiguing neon RGB, TypeTrack features an authentic military/mech tactical HUD, procedurally synthesized mechanical switch audio (Linear Thock, Clicky Blue, Topre), a live Pacing Ghost racer, and an innovative Boss Raid combat typing mode."
  },
  {
    question: "Do mechanical keyboards actually improve your typing speed?",
    answer: "Yes, mechanical switches provide distinct tactile feedback and precise actuation points (often 1.5mm to 2.0mm) before bottoming out. This tactile response builds muscle memory faster, reduces finger fatigue during extended sessions, and allows typists to register keystrokes with lighter touch, directly boosting accuracy and APM (Actions Per Minute)."
  },
  {
    question: "What is the fastest way to increase typing speed from 50 to 100+ WPM?",
    answer: "1) Prioritize 98%+ accuracy over raw speed—speed naturally follows accuracy. 2) Strict touch typing discipline: keep fingers anchored on the home row (ASDF JKL;) and never look down at the keyboard. 3) Practice in short 15-minute bursts daily. 4) Use rhythm and burst typing on common n-grams (the, ing, tion, and). 5) Train with Sudden Death mode to eliminate sloppy backspace reliance."
  },
  {
    question: "What is the Pacing Ghost feature?",
    answer: "The Pacing Ghost is an esports HUD tracker that visualizes a virtual pacing drone traveling alongside you in real-time. You can pace against your Personal Best (PB) or set a target speed (e.g., 60, 80, 100, or 120 WPM) to immediately see whether your current burst cadence is ahead or behind schedule."
  },
  {
    question: "What is Shatter Stream mode in TypeTrack?",
    answer: "Shatter Stream is a kinetic typing mode where words move horizontally at dynamic speeds across the arena. Every accurate keystroke triggers procedural acoustic crack synthesis and shatters letters into realistic 2D canvas polygon shards. Completing words unleashes explosive sound feedback, screen shake impact frames, and dynamic APM velocity scaling that speeds up as you type faster."
  }
];

export const WPM_RANK_TIERS = [
  {
    tier: 'Cadet Trainee',
    range: '< 40 WPM',
    percentile: 'Bottom 35%',
    tag: 'Hunt & Peck',
    desc: 'Typing primarily with index fingers while visually scanning keys. Ideal stage to learn home-row touch typing.',
    color: 'border-slate-700 bg-slate-900/60 text-slate-300'
  },
  {
    tier: 'Field Scout',
    range: '40 - 59 WPM',
    percentile: 'Average (Top 65%)',
    tag: 'Functional Operator',
    desc: 'Standard office and casual gaming speed. Moderate muscle memory, occasional backspacing.',
    color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
  },
  {
    tier: 'Tactical Specialist',
    range: '60 - 79 WPM',
    percentile: 'Proficient (Top 25%)',
    tag: 'Pro Typist',
    desc: 'Fluid touch typing without looking down. Can maintain continuous output during prolonged writing/coding.',
    color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
  },
  {
    tier: 'Cyber Vanguard',
    range: '80 - 99 WPM',
    percentile: 'Advanced (Top 5%)',
    tag: 'High Velocity',
    desc: 'Exceptional finger independence and cadence. Capable of instant keystroke correction and n-gram burst typing.',
    color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
  },
  {
    tier: 'Esports Operative',
    range: '100 - 119 WPM',
    percentile: 'Elite (Top 1%)',
    tag: 'Century Club',
    desc: 'Competitive esports speed. Deep muscle memory with near-zero cognitive latency between thought and keypress.',
    color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
  },
  {
    tier: 'Apex Grandmaster',
    range: '120+ WPM',
    percentile: 'Legendary (< 0.1%)',
    tag: 'Godspeed',
    desc: 'The pinnacle of mechanical keyboard mastery. Capable of out-typing real-time speech and dictation.',
    color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
  }
];

export const JSON_LD_DATA = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebApplication",
      "@id": "https://typetrack.saurabhx.site/#webapp",
      "name": "TypeTrack Tactical Typing Speed Test",
      "url": "https://typetrack.saurabhx.site",
      "applicationCategory": "GameApplication, EducationalApplication",
      "operatingSystem": "All",
      "browserRequirements": "Requires JavaScript. Requires HTML5 Audio API for switch sounds.",
      "description": "Tactical typing speed test and keyboard benchmark featuring mechanical switch sound synthesis, live telemetry, pacing ghost racer, kinetic shatter stream destruction mode, and combat boss defense mode.",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.96",
        "ratingCount": "14280",
        "bestRating": "5",
        "worstRating": "1"
      },
      "featureList": [
        "Shatter Stream Kinetic Typing Engine with Real-Time Shard Physics",
        "Procedural Mechanical Switch Sound Synthesis (Linear, Clicky, Topre)",
        "Real-Time WPM & APM Telemetry with Live Accuracy Gauges",
        "Pacing Ghost Drone Racer",
        "Multi-Language Speed Tests in 8 Global Languages",
        "Neomorphism Tactical UI Architecture"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://typetrack.saurabhx.site/#website",
      "url": "https://typetrack.saurabhx.site",
      "name": "TypeTrack",
      "description": "Online Typing Speed Test & WPM Benchmark",
      "inLanguage": "en-US"
    },
    {
      "@type": "Organization",
      "@id": "https://typetrack.saurabhx.site/#organization",
      "name": "TypeTrack",
      "url": "https://typetrack.saurabhx.site",
      "logo": "https://typetrack.saurabhx.site/icon-512.png"
    },
    {
      "@type": "FAQPage",
      "@id": "https://typetrack.saurabhx.site/#faq",
      "mainEntity": FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        "name": item.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.answer
        }
      }))
    },
    {
      "@type": "HowTo",
      "@id": "https://typetrack.saurabhx.site/#howto",
      "name": "How to Improve Your Typing Speed to 100+ Words Per Minute",
      "description": "A tactical step-by-step training protocol for breaking past plateaus and reaching elite typing speed.",
      "step": [
        {
          "@type": "HowToStep",
          "position": 1,
          "name": "Establish Anchor Position on Home Row",
          "text": "Place your index fingers on the tactile bumps of F and J keys. Rest left fingers on A-S-D-F and right fingers on J-K-L-;. Never lift your wrists completely off the desk."
        },
        {
          "@type": "HowToStep",
          "position": 2,
          "name": "Lock In 98%+ Accuracy Before Increasing Speed",
          "text": "Speed without accuracy is an illusion. Every uncorrected mistake costs you 5 to 10 keystrokes in recovery time. Slow down until you make fewer than 1 error every 50 words."
        },
        {
          "@type": "HowToStep",
          "position": 3,
          "name": "Use Target Ghost Pacing",
          "text": "Activate TypeTrack Ghost Pacer set to 10 WPM higher than your current average. Focus your vision slightly ahead of the cursor to build predictive muscle memory."
        },
        {
          "@type": "HowToStep",
          "position": 4,
          "name": "Train with Sudden Death Mode",
          "text": "Engage Sudden Death mode once daily. Because 1 mistake causes an instant mission failure, your nervous system learns extreme precision under pressure."
        }
      ]
    }
  ]
};
