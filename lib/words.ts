// Curated words optimized for touch-typing rhythm and muscle memory
export const COMMON_WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it",
  "that", "for", "they", "with", "as", "not", "on", "she", "at", "by",
  "this", "we", "you", "do", "but", "his", "from", "they", "say", "her",
  "she", "or", "an", "will", "my", "one", "all", "would", "there", "their",
  "what", "so", "up", "out", "if", "about", "who", "get", "which", "go",
  "me", "when", "make", "can", "like", "time", "no", "just", "him", "know",
  "take", "people", "into", "year", "your", "good", "some", "could", "them", "see",
  "other", "than", "then", "now", "look", "only", "come", "its", "over", "think",
  "also", "back", "after", "use", "two", "how", "our", "work", "first", "well",
  "way", "even", "new", "want", "because", "any", "these", "give", "day", "most",
  "us", "system", "command", "signal", "power", "control", "target", "focus", "speed",
  "matrix", "vector", "data", "status", "action", "point", "rapid", "shift", "pulse",
  "armor", "radar", "squad", "shield", "sector", "strike", "lock", "drive", "core",
  "prime", "switch", "sensor", "input", "output", "stream", "frame", "trace", "pilot",
  "tactical", "kinetic", "stealth", "cipher", "breach", "deploy", "orbit", "vanguard",
  "payload", "quantum", "nexus", "override", "protocol", "telemetry", "frequency",
  "firewall", "module", "circuit", "node", "relay", "beacon", "grid", "terminal",
  "uplink", "downlink", "synapse", "glitch", "zero", "echo", "phase", "overdrive",
  "impact", "engine", "boost", "thrust", "trigger", "burst", "charge", "reflex",
  "shadow", "optic", "recon", "apex", "titan", "havoc", "horizon", "vortex"
];

export const TACTICAL_QUOTES = [
  {
    text: "The sky above the port was the color of television, tuned to a dead channel.",
    source: "William Gibson, Neuromancer"
  },
  {
    text: "Speed is a byproduct of precision. Do not rush the strike; execute the sequence cleanly.",
    source: "Tactical Manual, V-04"
  },
  {
    text: "Talk is cheap. Show me the code.",
    source: "Linus Torvalds"
  },
  {
    text: "The right man in the wrong place can make all the difference in the world.",
    source: "G-Man, Half-Life 2"
  },
  {
    text: "A delayed game is eventually good, but a rushed game is forever bad.",
    source: "Shigeru Miyamoto"
  },
  {
    text: "In the middle of difficulty lies opportunity. Keep keystrokes fluid and posture stable.",
    source: "Ergonomics Codex"
  },
  {
    text: "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away.",
    source: "Antoine de Saint-Exupéry"
  },
  {
    text: "Stand in the ashes of a trillion dead souls and ask the ghosts if honor matters. The silence is your answer.",
    source: "Javik, Mass Effect 3"
  }
];

export function getRandomWords(count: number, options?: { punctuation?: boolean; numbers?: boolean }): string[] {
  const result: string[] = [];
  const punctuationMarks = [".", ",", "!", "?", ";", ":", "-", "'"];

  for (let i = 0; i < count; i++) {
    // Pick random word
    let word = COMMON_WORDS[Math.floor(Math.random() * COMMON_WORDS.length)];

    // Inject numbers occasionally if enabled
    if (options?.numbers && Math.random() < 0.15) {
      if (Math.random() < 0.5) {
        word = Math.floor(Math.random() * 999 + 1).toString();
      } else {
        word = `${Math.floor(Math.random() * 20 + 2020)}`;
      }
    }

    // Capitalize occasionally or if following punctuation
    if (options?.punctuation && (i === 0 || result[i - 1]?.endsWith(".") || result[i - 1]?.endsWith("!"))) {
      word = word.charAt(0).toUpperCase() + word.slice(1);
    }

    // Append punctuation if enabled
    if (options?.punctuation && i < count - 1 && Math.random() < 0.22) {
      const p = punctuationMarks[Math.floor(Math.random() * punctuationMarks.length)];
      if (p === "'") {
        word = `${word}'s`;
      } else {
        word = `${word}${p}`;
      }
    }

    result.push(word);
  }

  // Ensure last word has a period if punctuation is enabled
  if (options?.punctuation && result.length > 0) {
    const lastIdx = result.length - 1;
    if (!result[lastIdx].endsWith(".") && !result[lastIdx].endsWith("!")) {
      result[lastIdx] = `${result[lastIdx]}.`;
    }
  }

  return result;
}

export function getRandomQuote(): { text: string; source: string } {
  return TACTICAL_QUOTES[Math.floor(Math.random() * TACTICAL_QUOTES.length)];
}
