import { LanguageCode } from './types';

export interface LocalizedHeader {
  headline: string;
  subheadline: string;
  badgeText: string;
}

export const HEADER_BY_LANG: Record<LanguageCode, LocalizedHeader> = {
  en: {
    headline: "Typing Speed Test",
    subheadline: "Test how fast and accurate you type with real-time WPM, CPM, and accuracy tracking.",
    badgeText: "ONLINE TYPING TEST",
  },
  es: {
    headline: "Test de Velocidad de Mecanografía",
    subheadline: "Pon a prueba tu velocidad y precisión al escribir con métricas en tiempo real.",
    badgeText: "TEST DE MECANOGRAFÍA ONLINE",
  },
  de: {
    headline: "Tipptest – Schreibgeschwindigkeit Testen",
    subheadline: "Teste deine Schreibgeschwindigkeit und Genauigkeit mit Echtzeit-WPM.",
    badgeText: "ONLINE TIPPTEST",
  },
  fr: {
    headline: "Test de Vitesse de Frappe",
    subheadline: "Testez votre vitesse de frappe et votre précision avec des statistiques en direct.",
    badgeText: "TEST DE FRAPPE EN LIGNE",
  },
  pt: {
    headline: "Teste de Velocidade de Digitação",
    subheadline: "Teste sua velocidade e precisão de digitação com métricas em tempo real.",
    badgeText: "TESTE DE DIGITAÇÃO ONLINE",
  },
  ru: {
    headline: "Тест Скорости Печати",
    subheadline: "Проверьте свою скорость и точность слепой печати в реальном времени.",
    badgeText: "ОНЛАЙН ТЕСТ ПЕЧАТИ",
  },
  hi: {
    headline: "हिंदी टाइपिंग स्पीड टेस्ट",
    subheadline: "सरकारी परीक्षा, मंगल फॉन्ट व इनस्क्रिप्ट लेआउट के लिए टाइपिंग गति जांचें।",
    badgeText: "हिंदी टाइपिंग टेस्ट",
  },
  it: {
    headline: "Test di Velocità di Battitura",
    subheadline: "Metti alla prova la velocità e la precisione della tua digitazione in tempo reale.",
    badgeText: "TEST DI BATTITURA ONLINE",
  },
};

export function getLocalizedHeader(lang: LanguageCode = 'en'): LocalizedHeader {
  return HEADER_BY_LANG[lang] || HEADER_BY_LANG.en;
}
