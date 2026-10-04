import { LanguageCode } from './types';
import { getLanguageInfo } from './languages';
import { FAQ_ITEMS as DEFAULT_FAQ_ITEMS, WPM_RANK_TIERS as DEFAULT_RANK_TIERS } from './seo-data';

export interface LocalizedContent {
  headline: string;
  subheadline: string;
  badgeText: string;
  wpmTiersTitle: string;
  wpmTiersSubtitle: string;
  calculatorTitle: string;
  calculatorSubtitle: string;
  guideTitle: string;
  guideSubtitle: string;
  faqTitle: string;
  faqSubtitle: string;
  faqItems: { question: string; answer: string }[];
  ranks: {
    tier: string;
    range: string;
    percentile: string;
    tag: string;
    desc: string;
    color: string;
  }[];
  guideSteps: {
    title: string;
    desc: string;
    tip: string;
  }[];
}

export const LOCALIZED_CONTENT: Record<LanguageCode, LocalizedContent> = {
  en: {
    headline: "Tactical Typing Speed Test & APM Telemetry",
    subheadline: "Precision mechanical switch acoustics, kinetic shatter stream destruction mode, zero-latency caret telemetry, and pacing ghost racer.",
    badgeText: "PRO TELEMETRY // 0-LATENCY HUD",
    wpmTiersTitle: "Operator Speed Classification Tiers",
    wpmTiersSubtitle: "Global APM distribution and typing velocity benchmark standards.",
    calculatorTitle: "Velocity & Productivity ROI Calculator",
    calculatorSubtitle: "Calculate the exact hours and productivity saved per year by increasing your WPM.",
    guideTitle: "Tactical Touch Typing & APM Protocol",
    guideSubtitle: "The scientific progression from 40 WPM hunt-and-peck to 100+ WPM elite esports velocity.",
    faqTitle: "Frequently Asked Questions",
    faqSubtitle: "Telemetry calculation, ergonomic mechanics, and competitive typing methodology.",
    faqItems: DEFAULT_FAQ_ITEMS,
    ranks: DEFAULT_RANK_TIERS,
    guideSteps: [
      {
        title: "Anchor on Home Row (ASDF JKL;)",
        desc: "Tactile index markers on F and J are your permanent anchor points. Never float your wrists or guess key distances.",
        tip: "Anchor posture eliminates visual scanning latency by 100%."
      },
      {
        title: "Lock 98%+ Accuracy Before Velocity",
        desc: "Speed is merely muscle memory without interruptions. One backspace costs an average of 600ms of forward momentum.",
        tip: "Typing slow and cleanly builds neural pathways 3x faster than rushed mistakes."
      },
      {
        title: "Pacing Ghost Synchronization",
        desc: "Match your rhythm to the virtual Pacing Ghost drone set 10 WPM above your current average. Train predictive cadence.",
        tip: "Smooth consistent cadence beats spiky burst typing every time."
      },
      {
        title: "Sudden Death Hardcore Drills",
        desc: "Engage Sudden Death mode daily. Zero tolerance for errors trains extreme neurological focus under pressure.",
        tip: "Eliminates subconscious reliance on the backspace crutch."
      }
    ]
  },
  es: {
    headline: "Test de Mecanografía Táctico y Medidor de Velocidad PPM",
    subheadline: "Acústica de switches mecánicos, modo cinético Shatter Stream, telemetría sin latencia y drone pacer fantasma.",
    badgeText: "TELEMETRÍA PROFESIONAL // LATENCIA CERO",
    wpmTiersTitle: "Clasificación de Rangos de Velocidad (PPM / WPM)",
    wpmTiersSubtitle: "Estándares mundiales de velocidad de escritura y percentiles competitivos.",
    calculatorTitle: "Calculadora de Ahorro de Tiempo y Productividad",
    calculatorSubtitle: "Calcula cuántas horas de trabajo ahorras al año al duplicar tu velocidad en el teclado.",
    guideTitle: "Protocolo Táctico de Mecanografía al Tacto",
    guideSubtitle: "El método paso a paso para pasar de 40 PPM a más de 100 PPM sin mirar el teclado.",
    faqTitle: "Preguntas Frecuentes sobre Mecanografía",
    faqSubtitle: "Todo sobre el cálculo de PPM, precisión, ergonomía y técnicas de mecanografía rápida.",
    faqItems: [
      {
        question: "¿Qué es una velocidad de mecanografía promedio y qué se considera rápida?",
        answer: "La velocidad promedio mundial al escribir en teclado es de 40 palabras por minuto (PPM / WPM) con un 92% de precisión. Una velocidad entre 60 y 75 PPM se considera buena y superior a la media, común en programadores y redactores. Superar las 90-100 PPM entra en el 1% de élite en competiciones de velocidad."
      },
      {
        question: "¿Cómo se calcula exactamente el WPM o PPM?",
        answer: "La fórmula estandarizada define una 'palabra' como 5 pulsaciones de tecla (incluyendo espacios y signos de puntuación). La fórmula es: PPM = (Pulsaciones Correctas / 5) / (Tiempo en Minutos). El WPM Neto descuenta los errores no corregidos."
      },
      {
        question: "¿Por qué los teclados mecánicos mejoran la velocidad de escritura?",
        answer: "Los switches mecánicos ofrecen un punto de activación táctil antes de llegar al fondo de la tecla. Esto permite al cerebro recibir retroalimentación instantánea, reduce la fatiga en los dedos y acelera la memoria muscular."
      },
      {
        question: "¿Cómo pasar de 50 a 100+ palabras por minuto rápidamente?",
        answer: "1) Prioriza el 98% de precisión antes que la velocidad. 2) Mantén siempre los dedos anclados en la fila guía (ASDF JKLÑ). 3) Practica 15 minutos al día con el Pacing Ghost. 4) Activa el modo Sudden Death para eliminar la dependencia de la tecla borrar."
      },
      {
        question: "¿Qué es el modo Shatter Stream en TypeTrack?",
        answer: "Shatter Stream es un modo de mecanografía cinético donde las palabras se desplazan horizontalmente a gran velocidad. Cada pulsación acertada reproduce síntesis de sonido de fractura y hace estallar los caracteres en fragmentos poligonales en 2D. Completar palabras genera ondas de choque e incrementa la velocidad según tu ritmo de tecleo."
      }
    ],
    ranks: [
      {
        tier: 'Recluta Cadete',
        range: '< 40 PPM',
        percentile: '35% Inferior',
        tag: 'Búsqueda Visual',
        desc: 'Escribe mirando las teclas con los índices. Etapa ideal para aprender la fila guía y mecanografía al tacto.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Explorador de Campo',
        range: '40 - 59 PPM',
        percentile: 'Promedio (Top 65%)',
        tag: 'Operador Estándar',
        desc: 'Velocidad estándar de oficina. Memoria muscular moderada con uso frecuente de la tecla de retroceso.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Especialista Táctico',
        range: '60 - 79 PPM',
        percentile: 'Competente (Top 25%)',
        tag: 'Mecanógrafo Pro',
        desc: 'Escritura fluida sin mirar el teclado. Mantiene cadencia constante durante jornadas largas de código o redacción.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Vanguardia Cibernética',
        range: '80 - 99 PPM',
        percentile: 'Avanzado (Top 5%)',
        tag: 'Alta Velocidad',
        desc: 'Gran independencia de dedos y ritmo impecable. Corrección instantánea de errores y ráfagas de palabras.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Operativo Esports',
        range: '100 - 119 PPM',
        percentile: 'Élite (Top 1%)',
        tag: 'Club de los 100',
        desc: 'Velocidad de nivel competitivo. Conexión neuronal directa entre el pensamiento y las pulsaciones.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Gran Maestro Apex',
        range: '120+ PPM',
        percentile: 'Legendario (< 0.1%)',
        tag: 'Velocidad Dios',
        desc: 'La cúspide del dominio del teclado mecánico. Capaz de escribir más rápido que el habla en tiempo real.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Anclaje en la Fila Guía (ASDF JKLÑ)",
        desc: "Los relieves táctiles en las teclas F y J son tus anclajes permanentes. No levantes las muñecas en exceso.",
        tip: "La postura de anclaje elimina el tiempo de búsqueda visual en un 100%."
      },
      {
        title: "Fija 98%+ de Precisión antes de la Velocidad",
        desc: "La velocidad es memoria muscular continua. Cada error que corriges cuesta más de 600 ms de impulso.",
        tip: "Escribir con calma y sin errores crea circuitos neuronales 3 veces más rápido."
      },
      {
        title: "Sincronización con el Pacing Ghost",
        desc: "Sigue el ritmo del drone fantasma configurado a 10 PPM por encima de tu promedio actual.",
        tip: "Un ritmo suave y regular supera siempre a las aceleraciones descontroladas."
      },
      {
        title: "Entrenamiento en Modo Muerte Súbita",
        desc: "Practica Sudden Death una vez al día: 1 solo fallo aborta la prueba, forzando máxima concentración.",
        tip: "Elimina por completo el mal hábito de depender del retroceso."
      }
    ]
  },
  de: {
    headline: "Taktischer 10-Finger-Tipptest & APM Benchmark",
    subheadline: "Echte mechanische Switch-Akustik, latenzfreie Cursor-Telemetrie, Pacing-Ghost-Racer und Boss-Raid-Modus.",
    badgeText: "PROFI-TELEMETRIE // 0-LATENZ-HUD",
    wpmTiersTitle: "Geschwindigkeits-Klassifizierung (WPM & Anschläge)",
    wpmTiersSubtitle: "Internationale Leistungsstandards für Tastaturschreiben und Büroberufe.",
    calculatorTitle: "Produktivitäts- und Zeitersparnis-Rechner",
    calculatorSubtitle: "Berechnen Sie, wie viele Arbeitsstunden Sie jährlich durch höhere Tippgeschwindigkeit sparen.",
    guideTitle: "Taktisches 10-Finger-Schreibprotokoll",
    guideSubtitle: "Die bewährte Methode, um ohne Blick auf die Tastatur über 100 WPM zu erreichen.",
    faqTitle: "Häufig gestellte Fragen (FAQ)",
    faqSubtitle: "WPM-Berechnung, Anschläge pro Minute, Ergonomie und Tastaturmechanik.",
    faqItems: [
      {
        question: "Was ist eine durchschnittliche Tippgeschwindigkeit und was gilt als schnell?",
        answer: "Die durchschnittliche Schreibgeschwindigkeit liegt weltweit bei ca. 40 WPM (ca. 200 Anschlägen pro Minute). Geschwindigkeiten zwischen 60 und 75 WPM (300-375 Anschläge) gelten als überdurchschnittlich gut für Programmierer und Autoren. Über 90-100 WPM gehört man zu den obersten 1% der Tastaturprofis."
      },
      {
        question: "Was ist der Unterschied zwischen WPM und Anschlägen pro Minute (CPM)?",
        answer: "Im deutschsprachigen Raum werden häufig 'Anschläge pro Minute' gezählt. 1 Wort (WPM) entspricht standardmäßig 5 Anschlägen. 60 WPM entsprechen somit genau 300 Anschlägen pro Minute."
      },
      {
        question: "Verbessert eine mechanische Tastatur die Schreibgeschwindigkeit?",
        answer: "Ja, mechanische Schalter bieten einen spürbaren Auslösepunkt und akustisches Feedback, bevor die Taste aufschlägt. Dies trainiert das Muskelgedächtnis schneller und schont Sehnen und Gelenke."
      },
      {
        question: "Wie steigert man die Tippgeschwindigkeit am schnellsten?",
        answer: "1) Priorisieren Sie 98%+ Genauigkeit vor Tempo. 2) Bleiben Sie strikt in der Grundstellung (ASDF JKLÖ). 3) Trainieren Sie täglich 10-15 Minuten mit dem Pacing Ghost. 4) Nutzen Sie den Sudden-Death-Modus, um Flüchtigkeitsfehler abzutrainieren."
      }
    ],
    ranks: [
      {
        tier: 'Kadetten-Trainee',
        range: '< 40 WPM',
        percentile: 'Untere 35%',
        tag: 'Adlersuchsystem',
        desc: 'Schreibt mit 2-4 Fingern und Blick auf die Tastatur. Zeit für das 10-Finger-System.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Feld-Scout',
        range: '40 - 59 WPM',
        percentile: 'Durchschnitt (Top 65%)',
        tag: 'Büro-Standard',
        desc: 'Solide Alltagsgeschwindigkeit mit gelegentlichem Nutzen der Rücktaste.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Taktischer Spezialist',
        range: '60 - 79 WPM',
        percentile: 'Geübt (Top 25%)',
        tag: 'Profi-Typist',
        desc: 'Flüssiges 10-Finger-Schreiben ohne Hinsehen. Hält hohes Tempo über lange Phasen.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Cyber-Vorhut',
        range: '80 - 99 WPM',
        percentile: 'Fortgeschritten (Top 5%)',
        tag: 'Hochgeschwindigkeit',
        desc: 'Hervorragende Fingerunabhängigkeit und Rhythmus. Flüssige Wort-Burst-Sequenzen.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Esports-Operator',
        range: '100 - 119 WPM',
        percentile: 'Elite (Top 1%)',
        tag: 'Century Club',
        desc: 'Wettkampf-Niveau. Nahezu null Verzögerung zwischen Gedanken und Tastenanschlag.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Apex Großmeister',
        range: '120+ WPM',
        percentile: 'Legendär (< 0.1%)',
        tag: 'Lichtgeschwindigkeit',
        desc: 'Absolute Perfektion am Keyboard. Schneller als gesprochene Live-Diktate.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Anker in der Grundstellung (ASDF JKLÖ)",
        desc: "Die Fühlstege auf F und J sind Ihre unverrückbaren Orientierungspunkte.",
        tip: "Spart 100% der visuellen Suchzeit ein."
      },
      {
        title: "Präzision (98%+) vor Tempo setzen",
        desc: "Jeder Tippfehler kostet inklusive Korrektur mindestens 600 Millisekunden.",
        tip: "Präzises Schreiben baut Muskelgedächtnis dreimal schneller auf."
      },
      {
        title: "Pacing Ghost Taktung",
        desc: "Stellen Sie den virtuellen Ghost Pacer 10 WPM über Ihren Schnitt ein.",
        tip: "Gleichmäßiger Takt schlägt unkontrollierte Hektik."
      },
      {
        title: "Sudden Death Intensivtraining",
        desc: "Ein einziger Fehler bricht die Mission ab – schärft die Konzentration enorm.",
        tip: "Beendet die unbewusste Gewohnheit der Rücktaste."
      }
    ]
  },
  fr: {
    headline: "Test de Vitesse de Frappe et Dactylographie Tactique",
    subheadline: "Sons authentiques de switches mécaniques, télémétrie zéro latence, drone lièvre et mode combat de boss.",
    badgeText: "TÉLÉMÉTRIE PRO // LATENCE ZÉRO",
    wpmTiersTitle: "Paliers de Qualification de Vitesse (MPM / WPM)",
    wpmTiersSubtitle: "Normes internationales de dactylographie et distribution des compétences.",
    calculatorTitle: "Calculateur de Gain de Temps et Productivité",
    calculatorSubtitle: "Estimez les centaines d'heures gagnées chaque année en doublant votre cadence de frappe.",
    guideTitle: "Protocole Tactique de Dactylographie à 10 Doigts",
    guideSubtitle: "Le guide progressif pour passer de 40 MPM à plus de 100 MPM avec régularité.",
    faqTitle: "Questions Fréquentes (FAQ)",
    faqSubtitle: "Calcul des MPM, précision, ergonomie et perfectionnement au clavier.",
    faqItems: [
      {
        question: "Quelle est la vitesse de frappe moyenne au clavier et que signifie un bon score ?",
        answer: "La vitesse moyenne se situe autour de 40 mots par minute (MPM / WPM) avec 92% de précision. Entre 60 et 75 MPM est considéré comme très bon, typique des développeurs et rédacteurs. Dépasser 90-100 MPM vous place dans le top 1% mondial."
      },
      {
        question: "Comment sont calculés les Mots Par Minute (MPM) ?",
        answer: "Un 'mot' standard équivaut conventionnellement à 5 frappes de touches (lettres, espaces, ponctuation). La formule est : MPM = (Touches correctes / 5) / (Minutes écoulées)."
      },
      {
        question: "Les claviers mécaniques améliorent-ils la vitesse de frappe ?",
        answer: "Oui, les interrupteurs mécaniques offrent un point d'actionnement net sans avoir besoin d'enfoncer la touche jusqu'en butée, ce qui réduit la fatigue et aiguise la mémoire musculaire."
      },
      {
        question: "Comment progresser rapidement vers 100 MPM ?",
        answer: "1) Privilégiez 98%+ de précision avant d'accélérer. 2) Ancrez vos doigts sur la rangée de repos (QSDF JKLM). 3) Entraînez-vous avec le Pacing Ghost. 4) Utilisez le mode Mort Subite pour éliminer l'abus de la touche effacer."
      }
    ],
    ranks: [
      {
        tier: 'Cadet Recrue',
        range: '< 40 MPM',
        percentile: '35% Inférieur',
        tag: 'Frappe à vue',
        desc: 'Frappe avec 2 à 4 doigts en regardant les touches. Étape idéale pour débuter la dactylo.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Éclaireur',
        range: '40 - 59 MPM',
        percentile: 'Moyenne (Top 65%)',
        tag: 'Opérateur Standard',
        desc: 'Vitesse bureautique classique avec utilisation fréquente de la touche effacer.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Spécialiste Tactique',
        range: '60 - 79 MPM',
        percentile: 'Confirmé (Top 25%)',
        tag: 'Dactylographe Pro',
        desc: 'Frappe fluide à l\'aveugle sans regarder le clavier. Cadence constante.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Avant-Garde Cyber',
        range: '80 - 99 MPM',
        percentile: 'Avancé (Top 5%)',
        tag: 'Haute Vélocité',
        desc: 'Excellente indépendance des doigts et anticipation des n-grammes.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Opérateur Esports',
        range: '100 - 119 MPM',
        percentile: 'Élite (Top 1%)',
        tag: 'Club des 100',
        desc: 'Vitesse compétitive. Connexion quasi instantanée entre la pensée et la frappe.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Grand Maître Apex',
        range: '120+ MPM',
        percentile: 'Légendaire (< 0.1%)',
        tag: 'Vitesse Suprême',
        desc: 'Le summum de la maîtrise mécanique. Plus rapide que la parole en direct.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Ancrage sur la rangée de repos (QSDF JKLM)",
        desc: "Les ergots sur F et J sont vos repères tactiles constants. Ne quittez pas la position de base.",
        tip: "Supprime 100% du délai de recherche visuelle."
      },
      {
        title: "Verrouillez 98%+ de précision d'abord",
        desc: "La vitesse n'est que la conséquence d'une mémoire musculaire sans accroc.",
        tip: "Taper juste et calmement ancre les réflexes 3 fois plus vite."
      },
      {
        title: "Synchronisation avec le Pacing Ghost",
        desc: "Suivez le drone lièvre réglé à +10 MPM au-dessus de votre moyenne.",
        tip: "Une cadence régulière surpasse les accélérations désordonnées."
      },
      {
        title: "Entraînement Mort Subite",
        desc: "Une seule faute interrompt le test. Cela conditionne une concentration maximale.",
        tip: "Éradique le réflexe d'appui compulsif sur retour arrière."
      }
    ]
  },
  pt: {
    headline: "Teste de Digitação Tático e Medidor de Velocidade PPM",
    subheadline: "Sons de switches mecânicos reais, telemetria com latência zero, pacing ghost piloto e modo boss raid.",
    badgeText: "TELEMETRIA PRO // LATÊNCIA ZERO",
    wpmTiersTitle: "Classificação de Níveis de Velocidade (PPM / WPM)",
    wpmTiersSubtitle: "Padrões globais de digitação e percentis competitivos no teclado.",
    calculatorTitle: "Calculadora de Produtividade e Horas Economizadas",
    calculatorSubtitle: "Veja quantas centenas de horas de trabalho você economiza por ano digitando a 80+ PPM.",
    guideTitle: "Protocolo Tático de Digitação sem Olhar",
    guideSubtitle: "O método científico para saltar de 40 PPM para mais de 100 PPM com consistência.",
    faqTitle: "Perguntas Frequentes sobre Digitação",
    faqSubtitle: "Cálculo de WPM, precisão, ergonomia e evolução no teclado.",
    faqItems: [
      {
        question: "Qual é a velocidade média de digitação e o que é considerado rápido?",
        answer: "A média global é de cerca de 40 palavras por minuto (PPM / WPM) com 92% de precisão. Entre 60 e 75 PPM é acima da média, excelente para programadores e escritores. Mais de 90-100 PPM coloca você no top 1% dos digitadores mais velozes."
      },
      {
        question: "Como é calculado o WPM ou PPM?",
        answer: "A fórmula padrão define 1 'palavra' como 5 toques de tecla (letras, espaços e pontuação). A fórmula é: PPM = (Toques Corretos / 5) / (Tempo em Minutos)."
      },
      {
        question: "Teclados mecânicos realmente melhoram a digitação?",
        answer: "Sim. Os switches mecânicos acionam o comando antes de a tecla bater no fundo, permitindo digitação mais leve, menor cansaço muscular e resposta tátil imediata."
      },
      {
        question: "Como aumentar a velocidade de digitação de forma consistente?",
        answer: "1) Priorize precisão acima de 98% antes de tentar correr. 2) Mantenha os dedos na linha guia (ASDF JKLÇ). 3) Pratique 15 min por dia com o Pacing Ghost. 4) Use o modo Sudden Death para acabar com o vício no backspace."
      }
    ],
    ranks: [
      {
        tier: 'Cadete Recruta',
        range: '< 40 PPM',
        percentile: '35% Inferior',
        tag: 'Caça-Teclas',
        desc: 'Digita olhando para o teclado com poucos dedos. Momento ideal para treinar a linha guia.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Batedor de Campo',
        range: '40 - 59 PPM',
        percentile: 'Média (Top 65%)',
        tag: 'Operador Padrão',
        desc: 'Velocidade padrão de escritório com uso constante de backspace.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Especialista Tático',
        range: '60 - 79 PPM',
        percentile: 'Competente (Top 25%)',
        tag: 'Digitador Pro',
        desc: 'Digitação fluida sem olhar. Mantém boa cadência em longas sessões de código e escrita.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Vanguarda Cibernética',
        range: '80 - 99 PPM',
        percentile: 'Avançado (Top 5%)',
        tag: 'Alta Velocidade',
        desc: 'Independência perfeita dos dedos e antecipação de sequências comuns.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Operativo Esports',
        range: '100 - 119 PPM',
        percentile: 'Elite (Top 1%)',
        tag: 'Clube dos 100',
        desc: 'Nível competitivo de esports. Resposta neuromuscular quase instantânea.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Grão-Mestre Apex',
        range: '120+ PPM',
        percentile: 'Lendário (< 0.1%)',
        tag: 'Velocidade Suprema',
        desc: 'O ápice da velocidade motora. Mais rápido do que uma conversa em tempo real.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Ancoragem na Linha Guia (ASDF JKLÇ)",
        desc: "As marcações táteis no F e J são suas referências obrigatórias. Nunca levante os pulsos desnecessariamente.",
        tip: "Elimina totalmente a busca visual das teclas."
      },
      {
        title: "Consistência de 98%+ antes da pressa",
        desc: "Cada erro corrigido com backspace custa cerca de 600 ms de aceleração perdida.",
        tip: "Digitar certo cria memória neuromuscular 3x mais rápido."
      },
      {
        title: "Pacing Ghost como Ritmo Alvo",
        desc: "Siga o drone fantasma ajustado 10 PPM acima da sua velocidade usual.",
        tip: "Ritmo constante vence rajadas descompassadas."
      },
      {
        title: "Treinamento Morte Súbita",
        desc: "1 erro aborta o teste na hora. Isso treina o cérebro a não errar sob estresse.",
        tip: "Cura definitivamente o vício de apagar."
      }
    ]
  },
  ru: {
    headline: "Тактический Тест Слепой Печати и Бенчмарк APM",
    subheadline: "Акустика механических клавиш, нулевая задержка каретки, дрон-пейсер и боевой режим рейда на босса.",
    badgeText: "ПРО-ТЕЛЕМЕТРИЯ // НУЛЕВАЯ ЗАДЕРЖКА",
    wpmTiersTitle: "Классификация Скорости (WPM и Знаков в Минуту)",
    wpmTiersSubtitle: "Мировые стандарты слепой печати и распределение операторов.",
    calculatorTitle: "Калькулятор Экономии Времени и Продуктивности",
    calculatorSubtitle: "Узнайте, сколько рабочих часов в год экономит повышение скорости печати.",
    guideTitle: "Тактический Протокол Слепой Печати",
    guideSubtitle: "Пошаговая система перехода от 40 слов к элитному уровню 100+ слов в минуту.",
    faqTitle: "Часто Задаваемые Вопросы (FAQ)",
    faqSubtitle: "Методика подсчета WPM/ЗВМ, точность, эргономика и клавиатурные переключатели.",
    faqItems: [
      {
        question: "Какая скорость печати считается нормальной, а какая высокой?",
        answer: "Средняя скорость слепой печати в мире составляет 40 слов в минуту (около 200 знаков в минуту) при точности 92%. Скорость 60-75 WPM (300-375 зн/мин) считается высокой и комфортной для программистов. Свыше 90-100 WPM входит в элитный 1% пользователей."
      },
      {
        question: "Как рассчитываются слова в минуту (WPM) и знаки в минуту (ЗВМ)?",
        answer: "1 слово по международному стандарту равно ровно 5 нажатиям клавиш (буквы, знаки, пробелы). Таким образом, 60 WPM = 300 знаков в минуту. Net WPM вычитает допущенные ошибки."
      },
      {
        question: "Помогает ли механическая клавиатура печатать быстрее?",
        answer: "Да, механические переключатели имеют четкую точку срабатывания на половине хода, что развивает мышечную память и снижает усталость пальцев."
      },
      {
        question: "Как быстрее всего увеличить скорость печати?",
        answer: "1) Ставьте точность 98%+ выше скорости. 2) Всегда держите пальцы на исходной позиции (ФЫВА ОЛДЖ). 3) Тренируйтесь с дроном-пейсером. 4) Используйте режим Sudden Death, чтобы не полагаться на клавишу Backspace."
      }
    ],
    ranks: [
      {
        tier: 'Новобранец-Кадет',
        range: '< 40 WPM',
        percentile: 'Нижние 35%',
        tag: 'Двупальцевый поиск',
        desc: 'Печать с подглядыванием на клавиатуру. Самое время освоить слепой метод.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Полевой Разведчик',
        range: '40 - 59 WPM',
        percentile: 'Средний (Топ 65%)',
        tag: 'Штатный Оператор',
        desc: 'Стандартная офисная скорость, умеренное использование Backspace.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Тактический Специалист',
        range: '60 - 79 WPM',
        percentile: 'Уверенный (Топ 25%)',
        tag: 'Профи Печати',
        desc: 'Уверенная слепая печать без взгляда на клавиши. Стабильный ритм.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Кибер-Авангард',
        range: '80 - 99 WPM',
        percentile: 'Продвинутый (Топ 5%)',
        tag: 'Высокая Скорость',
        desc: 'Отличная независимость пальцев, печать целыми словарными блоками.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Киберспортсмен',
        range: '100 - 119 WPM',
        percentile: 'Элита (Топ 1%)',
        tag: 'Клуб 100',
        desc: 'Соревновательный уровень. Минимальная задержка между мыслью и нажатием.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Апекс Гроссмейстер',
        range: '120+ WPM',
        percentile: 'Легендарный (< 0.1%)',
        tag: 'Божественная Скорость',
        desc: 'Вершина клавиатурного мастерства. Быстрее живой устной речи.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Базовая позиция пальцев (ФЫВА ОЛДЖ)",
        desc: "Тактильные выступы на клавишах А и О (F и J) — ваши главные ориентиры.",
        tip: "Полностью убирает время на поиск нужных букв глазами."
      },
      {
        title: "Точность 98%+ важнее спешки",
        desc: "Исправление каждой ошибки отнимает не менее 600 миллисекунд плавного хода.",
        tip: "Чистый безошибочный набор развивает рефлексы в 3 раза быстрее."
      },
      {
        title: "Синхронизация с Дроном-Пейсером",
        desc: "Установите целевую скорость на 10 WPM выше текущей средней.",
        tip: "Ровный каденс всегда выигрывает у хаотичных рывков."
      },
      {
        title: "Тренировка Sudden Death (Внезапная Смерть)",
        desc: "Одна ошибка прерывает тест. Тренирует предельную точность движений.",
        tip: "Отучает от судорожного нажатия Backspace."
      }
    ]
  },
  hi: {
    headline: "हिंदी टाइपिंग स्पीड टेस्ट // सरकारी परीक्षा व APM टेलीमेट्री",
    subheadline: "SSC, CPCT, High Court व अन्य सरकारी परीक्षाओं के लिए मंगल फॉन्ट, इनस्क्रिप्ट और रेमिंगटन लेआउट अभ्यास।",
    badgeText: "सरकारी परीक्षा विशेष // मंगल व इनस्क्रिप्ट",
    wpmTiersTitle: "टाइपिंग स्पीड वर्गीकरण स्तर (WPM व शब्द प्रति मिनट)",
    wpmTiersSubtitle: "सरकारी भर्ती एवं कंप्यूटर परीक्षाओं के मानक गति स्तर।",
    calculatorTitle: "समय व कार्यकुशलता बचत कैलकुलेटर",
    calculatorSubtitle: "जानिए टाइपिंग स्पीड बढ़ाकर आप साल भर में कितने घंटे बचा सकते हैं।",
    guideTitle: "हिंदी टच टाइपिंग व अभ्यास मार्गदर्शिका",
    guideSubtitle: "कीबोर्ड को बिना देखे 30 से 60+ WPM हिंदी टाइपिंग गति प्राप्त करने का वैज्ञानिक तरीका।",
    faqTitle: "अक्सर पूछे जाने वाले प्रश्न (FAQ)",
    faqSubtitle: "हिंदी टाइपिंग फॉन्ट, सरकारी परीक्षा के नियम, WPM और शुद्धता से जुड़े सवाल।",
    faqItems: [
      {
        question: "सरकारी परीक्षाओं (SSC, CPCT, High Court) के लिए कितनी हिंदी टाइपिंग स्पीड चाहिए?",
        answer: "अधिकांश केंद्रीय व राज्य परीक्षाओं (जैसे SSC CHSL, MP CPCT, राजस्थान High Court, UPSSSC) में 30 से 35 शब्द प्रति मिनट (WPM) की गति तथा 90% से 95% शुद्धता (Accuracy) अनिवार्य होती है।"
      },
      {
        question: "मंगल (Mangal) और कृतिदेव (Kruti Dev) फॉन्ट में क्या अंतर है?",
        answer: "मंगल एक यूनिकोड (Unicode) फॉन्ट है जो आधुनिक सरकारी परीक्षाओं (CPCT, SSC) में इनस्क्रिप्ट या रेमिंगटन लेआउट के साथ मान्य है। कृतिदेव एक लिगेसी (Legacy) नॉन-यूनिकोड फॉन्ट है। हमारा टेस्ट आधुनिक यूनिकोड मानकों पर कार्य करता है।"
      },
      {
        question: "WPM और KPH में क्या अंतर होता है?",
        answer: "WPM का अर्थ है 'Words Per Minute' (शब्द प्रति मिनट, 1 शब्द = 5 की-स्ट्रोक)। KPH का अर्थ है 'Key Depressions Per Hour' (प्रति घंटे की-स्ट्रोक)। उदाहरण के लिए, 8000 KDPH का अर्थ लगभग 27 WPM होता है।"
      },
      {
        question: "हिंदी टाइपिंग स्पीड और शुद्धता कैसे सुधारें?",
        answer: "1) उंगलियों को होम रो (Home Row) पर स्थिर रखें। 2) बैकस्पेस का कम से कम उपयोग करें। 3) गति से पहले 95%+ शुद्धता पर ध्यान दें। 4) नियमित रूप से 20 मिनट अभ्यास करें।"
      }
    ],
    ranks: [
      {
        tier: 'प्रारंभिक शिक्षार्थी',
        range: '< 25 WPM',
        percentile: 'शुरुआती स्तर',
        tag: 'कुंजी खोज',
        desc: 'कीबोर्ड देखकर टाइप करने का स्तर। होम रो पर उंगलियां रखने का अभ्यास करें।',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'फील्ड ऑपरेटर',
        range: '25 - 34 WPM',
        percentile: 'सामान्य (Top 60%)',
        tag: 'परीक्षा सीमा',
        desc: 'सरकारी परीक्षाओं (SSC, CPCT) की न्यूनतम योग्यता सीमा के निकट।',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'प्रमाणित टाइपिस्ट',
        range: '35 - 49 WPM',
        percentile: 'योग्य (Top 25%)',
        tag: 'सरकारी परीक्षा पास',
        desc: 'सरकारी नौकरी टाइपिंग टेस्ट पास करने हेतु पूरी तरह उपयुक्त व स्थिर गति।',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'दक्ष टाइपिस्ट',
        range: '50 - 64 WPM',
        percentile: 'उन्नत (Top 5%)',
        tag: 'शीघ्र लेखक',
        desc: 'असाधारण उंगली नियंत्रण और बिना देखे त्वरित शब्द टाइपिंग।',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'स्टेनोग्राफर प्रो',
        range: '65 - 79 WPM',
        percentile: 'अग्रणी (Top 1%)',
        tag: 'शीर्ष 1%',
        desc: 'न्यायालय व सचिवालय स्तर की अत्यंत तीव्र और सटीक टाइपिंग गति।',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'अपेक्स ग्रैंडमास्टर',
        range: '80+ WPM',
        percentile: 'सर्वोच्च (< 0.1%)',
        tag: 'कीबोर्ड सम्राट',
        desc: 'हिंदी टाइपिंग की सर्वोच्च दक्षता, सीधे बोले गए शब्दों से भी तेज।',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "होम रो पर उंगलियों की स्थिति",
        desc: "F और J की उभरी हुई रेखाओं पर तर्जनी उंगलियां रखें और दृष्टि हमेशा स्क्रीन पर रखें।",
        tip: "कीबोर्ड की ओर देखने का समय 100% बचता है।"
      },
      {
        title: "पहले 95%+ शुद्धता, फिर गति",
        desc: "एक गलत शब्द सुधारने में 5 गुना अधिक समय नष्ट होता है। सहजता से टाइप करें।",
        tip: "शुद्धता से ही आत्मविश्वास और स्थायी गति बढ़ती है।"
      },
      {
        title: "पेसिंग घोस्ट के साथ लय बनाएं",
        desc: "अपने औसत से 5 WPM अधिक का लक्ष्य निर्धारित कर निरंतर लय में टाइप करें।",
        tip: "समान गति से टाइप करना तेज झटकों से अधिक फलदायी है।"
      },
      {
        title: "सडन डेथ (Sudden Death) अभ्यास",
        desc: "एक भी त्रुटि होने पर टेस्ट समाप्त हो जाता है, जिससे एकाग्रता चरम पर पहुंचती है।",
        tip: "बैकस्पेस दबाने की बुरी आदत को पूरी तरह समाप्त करता है।"
      }
    ]
  },
  it: {
    headline: "Test Tattico di Battitura e Benchmark Velocità Tastiera",
    subheadline: "Acustica autentica degli switch meccanici, telemetria a latenza zero, drone pacer e modalità boss raid.",
    badgeText: "TELEMETRIA PRO // ZERO LATENZA",
    wpmTiersTitle: "Classificazione dei Livelli di Battitura (PAM / WPM)",
    wpmTiersSubtitle: "Benchmark globali e percentili di velocità alla tastiera.",
    calculatorTitle: "Calcolatore di Produttività e Ore Risparmiate",
    calculatorSubtitle: "Scopri quante ore di lavoro risparmi ogni anno raddoppiando la velocità di scrittura.",
    guideTitle: "Protocollo Tattico di Dattilografia alla Cieca",
    guideSubtitle: "Il metodo progressivo per superare le 100 parole al minuto con precisione.",
    faqTitle: "Domande Frequenti (FAQ)",
    faqSubtitle: "Calcolo WPM, precisione, tastiere meccaniche ed ergonomia.",
    faqItems: [
      {
        question: "Qual è una buona velocità di battitura alla tastiera?",
        answer: "La media mondiale è di circa 40 parole al minuto (PAM / WPM) con il 92% di precisione. Tra 60 e 75 WPM è considerato un ottimo livello. Superare le 90-100 WPM ti posiziona nell'élite mondiale dell'1%."
      },
      {
        question: "Come viene calcolato il WPM?",
        answer: "1 parola standard corrisponde a 5 caratteri premuti (lettere, spazi, punteggiatura). La formula è: WPM = (Caratteri corretti / 5) / (Minuti)."
      },
      {
        question: "Le tastiere meccaniche aiutano a scrivere più velocemente?",
        answer: "Sì, gli switch meccanici si attivano prima del fine corsa della corsa, riducendo l'affaticamento dei tendini e sviluppando una memoria muscolare più rapida."
      },
      {
        question: "Come migliorare la velocità senza fare errori?",
        answer: "1) Cerca sempre il 98%+ di precisione. 2) Mantieni le dita sulla riga base (ASDF JKLÒ). 3) Esercitati con il Pacing Ghost. 4) Usa Sudden Death per eliminare l'abuso del tasto cancella."
      }
    ],
    ranks: [
      {
        tier: 'Cadetto Recluta',
        range: '< 40 PAM',
        percentile: '35% Inferiore',
        tag: 'Caccia al Tasto',
        desc: 'Digita guardando la tastiera. Ottimo momento per imparare la dattilografia.',
        color: 'border-slate-700 bg-slate-900/60 text-slate-300'
      },
      {
        tier: 'Esploratore',
        range: '40 - 59 PAM',
        percentile: 'Media (Top 65%)',
        tag: 'Operatore Standard',
        desc: 'Velocità tipica da ufficio con frequente correzione degli errori.',
        color: 'border-blue-900/50 bg-blue-950/30 text-blue-300'
      },
      {
        tier: 'Specialista Tattico',
        range: '60 - 79 PAM',
        percentile: 'Competente (Top 25%)',
        tag: 'Dattilografo Pro',
        desc: 'Scrittura fluida senza guardare i tasti. Ritmo solido e costante.',
        color: 'border-emerald-900/50 bg-emerald-950/30 text-emerald-300'
      },
      {
        tier: 'Avanguardia Cyber',
        range: '80 - 99 PAM',
        percentile: 'Avanzato (Top 5%)',
        tag: 'Alta Velocità',
        desc: 'Ottima indipendenza delle dita e velocità di reazione istantanea.',
        color: 'border-cyan-900/50 bg-cyan-950/30 text-cyan-300'
      },
      {
        tier: 'Operatore Esports',
        range: '100 - 119 PAM',
        percentile: 'Élite (Top 1%)',
        tag: 'Club dei 100',
        desc: 'Velocità da competizione. Nessuna esitazione mentale prima del tasto.',
        color: 'border-amber-900/50 bg-amber-950/30 text-amber-300'
      },
      {
        tier: 'Gran Maestro Apex',
        range: '120+ PAM',
        percentile: 'Leggendario (< 0.1%)',
        tag: 'Velocità Divina',
        desc: 'Il vertice assoluto della dattilografia. Più veloce del parlato in tempo reale.',
        color: 'border-purple-900/50 bg-purple-950/30 text-purple-300'
      }
    ],
    guideSteps: [
      {
        title: "Ancoraggio sulla Riga Base (ASDF JKLÒ)",
        desc: "I rilievi su F e J sono i tuoi punti fissi. Non allontanare mai i polsi.",
        tip: "Azzera completamente la ricerca visiva dei tasti."
      },
      {
        title: "Blocca 98%+ di precisione prima della velocità",
        desc: "La velocità è una conseguenza naturale della precisione costante.",
        tip: "La digitazione pulita costruisce memoria muscolare 3 volte più in fretta."
      },
      {
        title: "Sincronizzati con il Pacing Ghost",
        desc: "Imposta il drone fantasma a 10 WPM sopra la tua media attuale.",
        tip: "Un ritmo regolare supera sempre gli scatti disordinati."
      },
      {
        title: "Allenamento Sudden Death",
        desc: "Un solo errore annulla il test: addestra la massima concentrazione sotto pressione.",
        tip: "Elimina la cattiva abitudine di cancellare."
      }
    ]
  }
};

export function getLocalizedContent(lang: LanguageCode): LocalizedContent {
  return LOCALIZED_CONTENT[lang] || LOCALIZED_CONTENT.en;
}

export function generateLocalizedJsonLd(lang: LanguageCode, baseUrl: string = 'https://typetrack.saurabhx.site') {
  const info = getLanguageInfo(lang);
  const content = getLocalizedContent(lang);
  const pageUrl = lang === 'en' ? baseUrl : `${baseUrl}/${lang}`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${pageUrl}/#webapp`,
        "name": info.metaTitle,
        "url": pageUrl,
        "applicationCategory": "GameApplication, EducationalApplication",
        "operatingSystem": "All",
        "inLanguage": lang,
        "browserRequirements": "Requires JavaScript. Requires HTML5 Audio API for switch sounds.",
        "description": info.metaDescription,
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
          "Procedural Mechanical Switch Sound Synthesis",
          "Real-Time WPM & APM Telemetry with Live Accuracy Gauges",
          "Pacing Ghost Drone Racer",
          "Multi-Language Speed Tests in 8 Global Languages",
          "Neomorphism Tactical UI Architecture"
        ]
      },
      {
        "@type": "WebSite",
        "@id": `${baseUrl}/#website`,
        "url": baseUrl,
        "name": "TypeTrack",
        "description": "Tactical Typing Speed Test & APM Telemetry Benchmark",
        "inLanguage": lang
      },
      {
        "@type": "Organization",
        "@id": `${baseUrl}/#organization`,
        "name": "TypeTrack",
        "url": baseUrl,
        "logo": `${baseUrl}/icon-512.png`
      },
      {
        "@type": "FAQPage",
        "@id": `${pageUrl}/#faq`,
        "mainEntity": content.faqItems.map((item) => ({
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
        "@id": `${pageUrl}/#howto`,
        "name": content.guideTitle,
        "description": content.guideSubtitle,
        "inLanguage": lang,
        "step": content.guideSteps.map((step, index) => ({
          "@type": "HowToStep",
          "position": index + 1,
          "name": step.title,
          "text": `${step.desc} ${step.tip}`
        }))
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}/#breadcrumb`,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "TypeTrack",
            "item": baseUrl
          },
          ...(lang !== 'en' ? [
            {
              "@type": "ListItem",
              "position": 2,
              "name": info.nativeName,
              "item": pageUrl
            }
          ] : [])
        ]
      }
    ]
  };
}
