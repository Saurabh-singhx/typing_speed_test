import { LanguageCode } from './types';

export interface LocalizedHeader {
  headline: string;
  subheadline: string;
  badgeText: string;
}

export const HEADER_BY_LANG: Record<LanguageCode, LocalizedHeader> = {
  en: {
    headline: "Tactical Typing Speed Test & APM Telemetry",
    subheadline: "Precision mechanical switch acoustics, kinetic shatter stream destruction mode, zero-latency caret telemetry, and pacing ghost racer.",
    badgeText: "PRO TELEMETRY // 0-LATENCY HUD",
  },
  es: {
    headline: "Test de Mecanografía Táctico y Medidor de Velocidad PPM",
    subheadline: "Acústica de switches mecánicos, modo cinético Shatter Stream, telemetría sin latencia y drone pacer fantasma.",
    badgeText: "TELEMETRÍA PROFESIONAL // LATENCIA CERO",
  },
  de: {
    headline: "Taktischer 10-Finger-Tipptest & APM Benchmark",
    subheadline: "Echte mechanische Switch-Akustik, latenzfreie Cursor-Telemetrie, Pacing-Ghost-Racer und Boss-Raid-Modus.",
    badgeText: "PROFI-TELEMETRIE // 0-LATENZ-HUD",
  },
  fr: {
    headline: "Test de Vitesse de Frappe et Dactylographie Tactique",
    subheadline: "Sons authentiques de switches mécaniques, télémétrie zéro latence, drone lièvre et mode combat de boss.",
    badgeText: "TÉLÉMÉTRIE PRO // LATENCE ZÉRO",
  },
  pt: {
    headline: "Teste de Digitação Tático e Medidor de Velocidade PPM",
    subheadline: "Sons de switches mecânicos reais, telemetria com latência zero, pacing ghost piloto e modo boss raid.",
    badgeText: "TELEMETRIA PRO // LATÊNCIA ZERO",
  },
  ru: {
    headline: "Тактический Тест Слепой Печати и Бенчмарк APM",
    subheadline: "Акустика механических клавиш, нулевая задержка каретки, дрон-пейсер и боевой режим рейда на босса.",
    badgeText: "ПРО-ТЕЛЕМЕТРИЯ // НУЛЕВАЯ ЗАДЕРЖКА",
  },
  hi: {
    headline: "हिंदी टाइपिंग स्पीड टेस्ट // सरकारी परीक्षा व APM टेलीमेट्री",
    subheadline: "SSC, CPCT, High Court व अन्य सरकारी परीक्षाओं के लिए मंगल फॉन्ट, इनस्क्रिप्ट और रेमिंगटन लेआउट अभ्यास।",
    badgeText: "सरकारी परीक्षा विशेष // मंगल व इनस्क्रिप्ट",
  },
  it: {
    headline: "Test Tattico di Battitura e Benchmark Velocità Tastiera",
    subheadline: "Acustica autentica degli switch meccanici, telemetria a latenza zero, drone pacer e modalità boss raid.",
    badgeText: "TELEMETRIA PRO // ZERO LATENZA",
  },
};

export function getLocalizedHeader(lang: LanguageCode = 'en'): LocalizedHeader {
  return HEADER_BY_LANG[lang] || HEADER_BY_LANG.en;
}
