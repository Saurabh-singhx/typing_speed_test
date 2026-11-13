import React from 'react';
import Link from 'next/link';
import { 
  Clock, 
  Award, 
  Zap, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Flame
} from 'lucide-react';

export type LandingIntentType = 
  | '1-minute' 
  | '3-minute' 
  | '5-minute' 
  | 'certificate' 
  | 'wpm-test' 
  | 'practice' 
  | 'games';

interface LandingIntentSectionProps {
  intent: LandingIntentType;
}

export const LandingIntentSection: React.FC<LandingIntentSectionProps> = ({ intent }) => {
  switch (intent) {
    case '1-minute':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          {/* Header */}
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#16a34a]/15 text-[#16a34a] text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>60-Second Speed Benchmark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              1 Minute Typing Test: The Universal Standard for Speed & Accuracy
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              The 1-minute typing test is the worldwide gold standard for measuring quick-twitch keyboard cadence, raw WPM (Words Per Minute), and accuracy. In just 60 seconds, you can benchmark your typing velocity, discover muscle memory bottlenecks, and earn a verified typing badge without hand fatigue.
            </p>
          </div>

          {/* Benchmark Table */}
          <div className="tw-card p-6 rounded-2xl space-y-4">
            <h3 className="text-lg font-black text-[var(--text-main)] flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[var(--accent-tactical)]" />
              <span>1-Minute Typing Test Score Breakdown</span>
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[var(--border-subtle)] text-[var(--text-dim)] uppercase tracking-wider">
                    <th className="py-2.5 px-3">Typing Tier</th>
                    <th className="py-2.5 px-3">Speed (WPM)</th>
                    <th className="py-2.5 px-3">Speed (CPM)</th>
                    <th className="py-2.5 px-3">Percentile</th>
                    <th className="py-2.5 px-3">Profile</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border-subtle)] text-[var(--text-main)]">
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-slate-400">Beginner</td>
                    <td className="py-2.5 px-3 font-mono font-bold">&lt; 35 WPM</td>
                    <td className="py-2.5 px-3 font-mono">&lt; 175 CPM</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Bottom 25%</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Hunt-and-peck typists looking at keyboard</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-blue-400">Average</td>
                    <td className="py-2.5 px-3 font-mono font-bold">40 - 55 WPM</td>
                    <td className="py-2.5 px-3 font-mono">200 - 275 CPM</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Top 65%</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Standard office typists, email, web browsing</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-emerald-400">Proficient</td>
                    <td className="py-2.5 px-3 font-mono font-bold">60 - 75 WPM</td>
                    <td className="py-2.5 px-3 font-mono">300 - 375 CPM</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Top 25%</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Professional writers, programmers, assistants</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-cyan-400">Advanced</td>
                    <td className="py-2.5 px-3 font-mono font-bold">80 - 95 WPM</td>
                    <td className="py-2.5 px-3 font-mono">400 - 475 CPM</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Top 5%</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">High-velocity touch typists, medical transcriptionists</td>
                  </tr>
                  <tr>
                    <td className="py-2.5 px-3 font-bold text-amber-400">Elite / Esports</td>
                    <td className="py-2.5 px-3 font-mono font-bold">100+ WPM</td>
                    <td className="py-2.5 px-3 font-mono">500+ CPM</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Top 1%</td>
                    <td className="py-2.5 px-3 text-[var(--text-dim)]">Competitive typing athletes & keyboard enthusiasts</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Strategy Guide */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="tw-card p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-xl bg-[#5911f0]/15 text-[#5911f0] flex items-center justify-center font-black text-sm">
                01
              </div>
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Protect 98%+ Accuracy
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                In a 60-second test, one error costs ~600ms to backspace and correct. Typing cleanly at 70 WPM beats rushing at 85 WPM with 5 typos every single time.
              </p>
            </div>

            <div className="tw-card p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-500 flex items-center justify-center font-black text-sm">
                02
              </div>
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Anticipate the Next Word
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Train your peripheral vision to read one word ahead of your current keystroke. This eliminates cognitive stutter between word spaces.
              </p>
            </div>

            <div className="tw-card p-5 rounded-2xl space-y-2">
              <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-500 flex items-center justify-center font-black text-sm">
                03
              </div>
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Sync with the Ghost Pacer
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Turn on TypeTrack&apos;s Ghost Pacer at 10 WPM above your usual score. Match the drone&apos;s rhythm to lock in a smooth, effortless typing cadence.
              </p>
            </div>
          </div>

          {/* Quick links to other test durations */}
          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-[var(--text-main)]">Try Other Test Formats:</span>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/3-minute-typing-test" className="text-[var(--accent-tactical)] hover:underline font-semibold flex items-center gap-1">
                <span>3 Minute Typing Test</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/5-minute-typing-test" className="text-[var(--accent-tactical)] hover:underline font-semibold flex items-center gap-1">
                <span>5 Minute Typing Test</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/typing-test-with-certificate" className="text-[var(--accent-tactical)] hover:underline font-semibold flex items-center gap-1">
                <span>Typing Test with Certificate</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      );

    case '3-minute':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 text-cyan-600 dark:text-cyan-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Clock className="w-3.5 h-3.5" />
              <span>180-Second Stamina Benchmark</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              3 Minute Typing Test: Sustained Speed & Cadence Consistency
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              While a 1-minute test captures maximum burst velocity, a 3-minute typing test evaluates your true endurance and consistency. It eliminates short-burst anomalies, measures how smoothly you maintain 95%+ accuracy under continuous flow, and builds muscle resilience for prolonged writing and coding sessions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)] flex items-center gap-2">
                <Target className="w-5 h-5 text-emerald-500" />
                <span>Why 3 Minutes Reveals Your True WPM</span>
              </h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                In 60 seconds, an easy word sequence can artificially inflate your score by 15-20%. Over 180 seconds, variance averages out across varied vocabulary, n-grams, and syllable structures. Your 3-minute score is the most accurate reflection of your everyday typing capability.
              </p>
            </div>

            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-500" />
                <span>Ergonomics & Fatigue Prevention</span>
              </h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Maintain neutral wrist angles and avoid resting heavy wrist weight on the desk edge. Light, tactile actuation switches (such as 45g Linear or Topre) help keep fingers relaxed and free from tendon strain across the entire 180 seconds.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-[var(--text-main)]">Explore Other Durations:</span>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/1-minute-typing-test" className="text-[var(--accent-tactical)] hover:underline font-semibold flex items-center gap-1">
                <span>1 Minute Typing Test</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
              <Link href="/5-minute-typing-test" className="text-[var(--accent-tactical)] hover:underline font-semibold flex items-center gap-1">
                <span>5 Minute Typing Test</span>
                <ChevronRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>
      );

    case '5-minute':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Official 300-Second Assessment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              5 Minute Typing Test: The Standard for Jobs, Civil Service & Exams
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              The 5-minute typing test is mandatory for government examinations (SSC, CPCT, High Court typing tests), civil service certifications, court reporting, and corporate data entry recruitment. It tests mental focus, continuous error management, and stamina across a sustained 300-second testing window.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="tw-card p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Civil Service & Government Exams
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Most government typing exams require 35 to 45 Net WPM with 90-95% accuracy over a full 5-minute duration.
              </p>
            </div>
            <div className="tw-card p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Net WPM Formula Penalties
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Uncorrected mistakes deduct heavily from your final score: Net WPM = (Gross Words - Uncorrected Errors) / 5. Accuracy is paramount.
              </p>
            </div>
            <div className="tw-card p-5 rounded-2xl space-y-2">
              <h4 className="font-extrabold text-sm text-[var(--text-main)]">
                Pacing Endurance Strategy
              </h4>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Start at 85% of your maximum speed for the first 90 seconds. Once your rhythm is established, accelerate steadily without panic.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[var(--bg-panel)] border border-[var(--border-subtle)] flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="font-bold text-[var(--text-main)]">Need a Certification Document?</span>
            <Link href="/typing-test-with-certificate" className="text-[var(--accent-tactical)] hover:underline font-bold flex items-center gap-1">
              <span>View Free Typing Test Certificates</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      );

    case 'certificate':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Official Skill Verification</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              Free Typing Speed Test with Certificate for Resumes & Jobs
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              Validate your keyboard proficiency with an official TypeTrack typing certificate. Whether you are applying for administrative positions, medical transcription, customer support, or freelance data entry, our verified badges provide verifiable proof of your WPM, CPM, and accuracy percentage.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="tw-card p-5 rounded-2xl border-t-4 border-amber-700/60 space-y-2">
              <div className="text-amber-700 dark:text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                Bronze Tier
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">40+ WPM</div>
              <div className="text-xs text-[var(--text-dim)] font-semibold">94%+ Accuracy Required</div>
              <p className="text-xs text-[var(--text-dim)] pt-2 border-t border-[var(--border-subtle)]">
                Suitable for general office clerks, email correspondence, and entry-level support roles.
              </p>
            </div>

            <div className="tw-card p-5 rounded-2xl border-t-4 border-slate-400 space-y-2">
              <div className="text-slate-400 font-extrabold text-sm uppercase tracking-wider">
                Silver Tier
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">50+ WPM</div>
              <div className="text-xs text-[var(--text-dim)] font-semibold">96%+ Accuracy Required</div>
              <p className="text-xs text-[var(--text-dim)] pt-2 border-t border-[var(--border-subtle)]">
                Standard benchmark for administrative assistants, receptionists, and corporate data entry.
              </p>
            </div>

            <div className="tw-card p-5 rounded-2xl border-t-4 border-amber-400 space-y-2">
              <div className="text-amber-400 font-extrabold text-sm uppercase tracking-wider">
                Gold Tier
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">70+ WPM</div>
              <div className="text-xs text-[var(--text-dim)] font-semibold">98%+ Accuracy Required</div>
              <p className="text-xs text-[var(--text-dim)] pt-2 border-t border-[var(--border-subtle)]">
                Required for executive assistants, paralegals, medical transcriptionists, and writers.
              </p>
            </div>

            <div className="tw-card p-5 rounded-2xl border-t-4 border-purple-500 space-y-2">
              <div className="text-purple-400 font-extrabold text-sm uppercase tracking-wider">
                Platinum Tier
              </div>
              <div className="text-2xl font-black text-[var(--text-main)]">100+ WPM</div>
              <div className="text-xs text-[var(--text-dim)] font-semibold">99%+ Accuracy Required</div>
              <p className="text-xs text-[var(--text-dim)] pt-2 border-t border-[var(--border-subtle)]">
                Elite transcription, live court reporting, and esports keyboard mastery (Top 1%).
              </p>
            </div>
          </div>

          <div className="tw-card p-6 rounded-2xl space-y-4">
            <h3 className="text-base font-extrabold text-[var(--text-main)] flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-[#16a34a]" />
              <span>How to Add a Typing Certificate to Your Resume</span>
            </h3>
            <p className="text-xs text-[var(--text-dim)] leading-relaxed">
              Under your <strong>Skills</strong> or <strong>Certifications</strong> section on your resume or CV, list:
            </p>
            <div className="p-4 rounded-xl bg-[var(--bg-input)] font-mono text-xs text-[var(--text-main)] border border-[var(--border-subtle)]">
              &quot;Certified Typing Speed: 74 WPM / 370 CPM with 98.4% Accuracy (Gold Certificate - TypeTrack)&quot;
            </div>
          </div>
        </div>
      );

    case 'wpm-test':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#5911f0]/15 text-[#5911f0] text-xs font-bold uppercase tracking-wider mb-2">
              <Zap className="w-3.5 h-3.5" />
              <span>Velocity Telemetry</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              WPM Test: Words Per Minute & Characters Per Minute Calculator
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              Words Per Minute (WPM) is the universal metric for evaluating typing velocity. Standardized typing engines normalize words to 5 keystrokes to ensure fair benchmarking across complex and simple vocabulary. Calculate your raw WPM, Net WPM, and CPM in real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)]">
                The Standard WPM Formula
              </h3>
              <div className="p-3.5 rounded-xl bg-[var(--bg-input)] font-mono text-xs text-[var(--accent-tactical)]">
                WPM = (Total Correct Keystrokes / 5) / Time in Minutes
              </div>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Every 5 characters (including letters, spaces, numbers, and punctuation) count as 1 standard word. A user typing 300 correct characters in 1 minute achieves exactly 60 WPM.
              </p>
            </div>

            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)]">
                Gross WPM vs Net WPM
              </h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                <strong>Gross (Raw) WPM:</strong> Measures your overall typing speed regardless of how many mistakes were made.
              </p>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                <strong>Net WPM:</strong> Penalizes uncorrected errors to reflect true usable productivity: Net WPM = Raw WPM - (Uncorrected Errors / Minutes).
              </p>
            </div>
          </div>
        </div>
      );

    case 'practice':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 text-[#16a34a] text-xs font-bold uppercase tracking-wider mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Touch Typing Academy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              Touch Typing Practice: Master the 10-Finger Home Row System
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              Touch typing allows you to write effortlessly without ever looking down at the keyboard. By anchoring your fingers on the tactile home row markers and developing subconscious motor memory, you can double your typing speed and reduce neck and wrist strain.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)]">
                Home Row Finger Placement (QWERTY)
              </h3>
              <ul className="text-xs space-y-2 text-[var(--text-dim)]">
                <li><strong className="text-[var(--text-main)]">Left Hand:</strong> A (Pinky), S (Ring), D (Middle), F (Index with tactile bump)</li>
                <li><strong className="text-[var(--text-main)]">Right Hand:</strong> J (Index with tactile bump), K (Middle), L (Ring), ; (Pinky)</li>
                <li><strong className="text-[var(--text-main)]">Thumbs:</strong> Rest naturally on the Spacebar</li>
              </ul>
            </div>

            <div className="tw-card p-6 rounded-2xl space-y-3">
              <h3 className="font-black text-base text-[var(--text-main)]">
                The 4 Golden Rules of Practice
              </h3>
              <ul className="text-xs space-y-1.5 text-[var(--text-dim)]">
                <li>1. Never look at the keyboard, even when you make a mistake.</li>
                <li>2. Accuracy first: Slow down until you make zero errors.</li>
                <li>3. Return all fingers to the home row after every key strike.</li>
                <li>4. Practice for 15 minutes daily rather than 2 hours once a week.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 'games':
      return (
        <div className="w-full max-w-5xl mx-auto space-y-12 font-sans">
          <div className="pb-4 border-b border-[var(--border-subtle)]">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Flame className="w-3.5 h-3.5" />
              <span>Arcade APM Arena</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--text-main)]">
              Free Online Typing Games: Kinetic Shatter Stream & Boss Raid
            </h2>
            <p className="text-sm text-[var(--text-dim)] mt-2 leading-relaxed">
              Transform mundane typing practice into high-adrenaline arcade gameplay. TypeTrack features real-time 2D canvas particle physics, procedural switch sound design, and kinetic time-pressure challenges engineered to skyrocket your Actions Per Minute (APM).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="tw-card p-6 rounded-2xl space-y-3">
              <div className="inline-block px-2.5 py-1 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 text-[11px] font-bold uppercase">
                Arcade Physics
              </div>
              <h3 className="font-black text-lg text-[var(--text-main)]">Shatter Stream Mode</h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Words glide horizontally across the arena under kinetic momentum. Every accurate keystroke fractures letters into explosive polygon shards with procedural acoustic crack sound synthesis. Supports Survival mode with 5 breach lives.
              </p>
            </div>

            <div className="tw-card p-6 rounded-2xl space-y-3">
              <div className="inline-block px-2.5 py-1 rounded-full bg-rose-500/15 text-rose-600 dark:text-rose-400 text-[11px] font-bold uppercase">
                Combat Survival
              </div>
              <h3 className="font-black text-lg text-[var(--text-main)]">Boss Raid Arena</h3>
              <p className="text-xs text-[var(--text-dim)] leading-relaxed">
                Take on rogue AI bosses with real HP and shield bars. Build critical attack multipliers through uninterrupted flawless typing streaks to break enemy shields before the raid timer expires.
              </p>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
};
