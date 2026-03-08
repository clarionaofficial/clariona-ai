import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => any;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('en');

  // Simple translation helper
  const t = (key: string) => {
    const keys = key.split('.');
    let result: any = translations[language];
    for (const k of keys) {
      if (result && result[k]) {
        result = result[k];
      } else {
        return key;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations: any = {
  en: {
    nav: {
      services: 'Services',
      websites: 'Websites',
      gmb: 'GMB Ranking',
      voice: 'Voice Agents',
      about: 'About',
      contact: 'Contact',
      cta: 'Book a Free Consultation'
    },
    hero: {
      badge: 'The Future of Digital Growth',
      title: 'Websites, Local Ranking, and AI Voice Agents — built to grow.',
      subtitle: 'We combine cutting-edge design with local SEO dominance and AI automation to help your business scale faster and smarter.',
      ctaPrimary: 'Book a Free Consultation',
      ctaSecondary: 'Explore Services',
      agentStatus: 'Agent Online',
      activeAgent: 'Active Agent',
      agentName: 'Clariona Voice Assistant',
      agentDesc: 'Ready to handle your inbound leads, book appointments, and provide 24/7 support with human-like natural speech.',
      onlineNow: 'Online Now',
      accuracy: '98% Accuracy',
      demo: 'Try Live Demo',
      successBadge: 'Customer Review',
      successText: '"Clariona has been a game changer. We haven\'t missed a single call since we started!"'
    },
    voiceAgent: {
      button: 'Talk to Clariona AI',
      modalTitle: 'Clariona AI Agent',
      idleDesc: 'Click start to begin a conversation with our AI agent.',
      poweredBy: 'Powered by Clariona Voice Engine',
      status: {
        idle: 'Online',
        listening: 'Listening',
        speaking: 'Talking'
      }
    },
    activity: {
      call: 'New call connected',
      appointment: 'Appointment booked',
      lead: 'Lead qualified',
      ago: 'min ago'
    },
    servicesOverview: {
      title: 'Our Core Services',
      subtitle: 'Specialized solutions designed to cover every aspect of your digital presence and operational efficiency.',
      learnMore: 'Learn more'
    },
    howWeWork: {
      title: 'How We Work',
      subtitle: 'A streamlined, transparent process designed to deliver exceptional results with zero friction.'
    },
    faq: {
      title: 'Frequently Asked Questions',
      subtitle: 'Everything you need to know about our services and process.'
    },
    audit: {
      title: 'Get a free website + GMB + automation audit',
      subtitle: 'We\'ll analyze your current digital presence and provide a custom growth roadmap. No strings attached.',
      feature1: 'SEO Analysis',
      feature2: 'Conversion Audit',
      feature3: 'Automation Strategy',
      cta: 'Claim Your Free Audit'
    },
    footer: {
      desc: 'Empowering businesses with high-performance websites, local search dominance, and intelligent AI voice automation.',
      services: 'Services',
      allServices: 'All Services',
      company: 'Company',
      privacy: 'Privacy Policy',
      terms: 'Terms of Service',
      contactUs: 'Contact Us',
      address: 'Digital First Agency\nGlobal Support',
      rights: 'All rights reserved.'
    },
    stats: {
      growth: 'Client Growth',
      projects: 'Projects Delivered',
      rankings: 'Local Rankings',
      uptime: 'Support Uptime'
    },
    servicesPage: {
      title: 'Our Expertise',
      subtitle: 'Comprehensive digital services tailored to your business needs.'
    },
    about: {
      hero: {
        title: 'We are Clariona AI.',
        subtitle: 'A team of designers, engineers, and SEO specialists dedicated to helping businesses leverage the power of modern technology to achieve sustainable growth.'
      },
      mission: {
        title: 'Our Mission',
        p1: 'In a rapidly evolving digital landscape, many businesses struggle to keep up with the latest tools and strategies. Our mission is to bridge that gap by providing premium, accessible, and high-impact digital solutions.',
        p2: 'We don\'t just build websites or set up AI agents; we build growth engines that work for you while you focus on what you do best—running your business.'
      },
      values: {
        client: { title: 'Client First', text: 'Your success is our primary metric.' },
        data: { title: 'Data Driven', text: 'Decisions based on real analytics.' },
        innovation: { title: 'Innovation', text: 'Always at the cutting edge.' },
        integrity: { title: 'Integrity', text: 'Transparent and honest partnership.' }
      }
    },
    contact: {
      hero: {
        title: 'Let\'s build something extraordinary.',
        subtitle: 'Ready to scale your business with premium digital solutions? Book a call or send us a message and we\'ll get back to you within 24 hours.'
      },
      info: {
        email: 'Email Us',
        call: 'Call Us',
        visit: 'Visit Us'
      },
      booking: {
        title: 'Book a Strategy Call',
        subtitle: 'Skip the back-and-forth. Pick a time that works for you and let\'s discuss your growth strategy.',
        cta: 'Schedule on Calendly'
      },
      form: {
        name: 'Full Name',
        email: 'Email Address',
        company: 'Company Name',
        service: 'Service Interested In',
        audit: 'Full Digital Audit',
        message: 'Your Message',
        messagePlaceholder: 'Tell us about your project...',
        submit: 'Send Message'
      },
      success: {
        title: 'Message Sent!',
        subtitle: 'Thank you for reaching out. One of our experts will contact you shortly.',
        cta: 'Send Another Message'
      }
    },
    serviceTemplate: {
      getStarted: 'Get Started Today',
      benefits: 'Key Benefits',
      includes: 'What\'s Included',
      process: 'Our Process'
    },
    services: {
      websites: {
        title: 'Website Building',
        subtitle: 'High-Performance Design',
        desc: 'We build lightning-fast, conversion-optimized websites that serve as your 24/7 sales machine.',
        benefits: [
          'Convert more visitors into paying customers with psychological design principles.',
          'Rank higher on search engines with built-in technical SEO and speed optimization.',
          'Provide a seamless experience across all devices with mobile-first architecture.'
        ],
        includes: [
          'Custom UI/UX Design', 'Responsive Development', 'Speed Optimization', 'SEO Setup',
          'CMS Integration', 'Analytics Dashboard', 'Copywriting', 'Hosting Support'
        ],
        processSteps: [
          { title: 'Strategy & Wireframing', text: 'We map out the user journey and conversion paths before a single pixel is designed.' },
          { title: 'Design & Development', text: 'Our team crafts a unique visual identity and builds it with clean, modern code.' },
          { title: 'Testing & Launch', text: 'Rigorous performance testing ensures a perfect launch on all browsers and devices.' }
        ]
      },
      gmb: {
        title: 'GMB Ranking',
        subtitle: 'Dominate Local Search',
        desc: 'Get found by local customers exactly when they are searching for your services.',
        benefits: [
          'Increase foot traffic and phone calls with top-3 map pack visibility.',
          'Build trust with a managed review strategy and professional GMB profile.',
          'Outperform local competitors by dominating high-intent local keywords.'
        ],
        includes: [
          'GMB Optimization', 'Local Citation Building', 'Review Management', 'Keyword Research',
          'Competitor Analysis', 'Monthly Reporting', 'GMB Post Creation', 'Map Pack Tracking'
        ],
        processSteps: [
          { title: 'Audit & Analysis', text: 'We analyze your current local standing and identify the biggest growth opportunities.' },
          { title: 'Optimization & Citations', text: 'We clean up your digital footprint and optimize every aspect of your GMB profile.' },
          { title: 'Ongoing Dominance', text: 'Regular posts, review management, and citation updates keep you at the top.' }
        ]
      },
      voice: {
        title: 'AI Voice Agents',
        subtitle: '24/7 Automated Support',
        desc: 'Never miss a lead again. Our AI voice agents handle inbound calls and book appointments.',
        benefits: [
          'Save thousands on staffing costs with automated 24/7 customer interaction.',
          'Instantly qualify leads and sync them directly to your CRM without human intervention.',
          'Provide immediate responses to every caller, increasing customer satisfaction.'
        ],
        includes: [
          'Natural Speech Synthesis', 'Custom Knowledge Base', 'CRM Integration', 'Appointment Booking',
          'Lead Qualification', 'Call Recording/Transcripts', 'Multi-language Support', 'Real-time Analytics'
        ],
        processSteps: [
          { title: 'Knowledge Mapping', text: 'We train the AI on your business data, FAQs, and specific sales scripts.' },
          { title: 'Integration & Testing', text: 'We connect the agent to your phone lines and CRM, ensuring seamless data flow.' },
          { title: 'Deployment & Tuning', text: 'The agent goes live, and we continuously refine its performance based on real calls.' }
        ]
      }
    },
    faqs: [
      {
        question: 'How long does it take to build a website?',
        answer: 'A standard one-page site typically takes 1-2 weeks, while more complex multi-page sites take 3-5 weeks depending on requirements.'
      },
      {
        question: 'Do you offer ongoing support?',
        answer: 'Yes, we provide monthly maintenance and optimization packages to ensure your site and local rankings stay ahead of the competition.'
      },
      {
        question: 'Can the AI voice agent handle complex queries?',
        answer: 'Absolutely. Our agents are trained on your specific business data and can handle common FAQs, booking requests, and lead qualification.'
      },
      {
        question: 'How do you improve GMB rankings?',
        answer: 'We use a combination of on-page local SEO, citation building, review optimization, and regular GMB posts to boost your visibility.'
      }
    ],
    process: [
      { title: 'Discover', description: 'We dive deep into your business goals and target audience.' },
      { title: 'Build', description: 'Our experts craft your custom solution with precision.' },
      { title: 'Launch', description: 'We deploy your new assets to the world with a clear strategy.' },
      { title: 'Optimize', description: 'Continuous monitoring and data-driven improvements.' },
      { title: 'Support', description: 'Ongoing partnership to ensure long-term growth.' }
    ]
  },
  de: {
    nav: {
      services: 'Dienstleistungen',
      websites: 'Webseiten',
      gmb: 'GMB Ranking',
      voice: 'Voice-Agenten',
      about: 'Über uns',
      contact: 'Kontakt',
      cta: 'Kostenlose Beratung buchen'
    },
    hero: {
      badge: 'Die Zukunft des digitalen Wachstums',
      title: 'Webseiten, lokales Ranking und AI-Voice-Agenten – bereit für Wachstum.',
      subtitle: 'Wir kombinieren modernstes Design mit lokaler SEO-Dominanz und AI-Automatisierung, damit Ihr Unternehmen schneller und intelligenter skalieren kann.',
      ctaPrimary: 'Kostenlose Beratung buchen',
      ctaSecondary: 'Dienstleistungen entdecken',
      agentStatus: 'Agent ist online',
      activeAgent: 'Aktiver Agent',
      agentName: 'Clariona Voice-Assistent',
      agentDesc: 'Bereit, Ihre eingehenden Leads zu bearbeiten, Termine zu buchen und 24/7-Support mit menschenähnlicher Sprache zu bieten.',
      onlineNow: 'Jetzt Online',
      accuracy: '98% Genauigkeit',
      demo: 'Live-Demo testen',
      successBadge: 'Kundenbewertung',
      successText: '"Clariona war ein Game-Changer. Seit wir angefangen haben, haben wir keinen einzigen Anruf mehr verpasst!"'
    },
    voiceAgent: {
      button: 'Mit Clariona AI sprechen',
      modalTitle: 'Clariona AI-Agent',
      idleDesc: 'Klicken Sie auf Start, um ein Gespräch mit unserem AI-Agenten zu beginnen.',
      poweredBy: 'Unterstützt von der Clariona Voice Engine',
      status: {
        idle: 'Online',
        listening: 'Zuhören',
        speaking: 'Sprechen'
      }
    },
    activity: {
      call: 'Neuer Anruf verbunden',
      appointment: 'Termin gebucht',
      lead: 'Lead qualifiziert',
      ago: 'Min. her'
    },
    servicesOverview: {
      title: 'Unsere Kernleistungen',
      subtitle: 'Spezialisierte Lösungen, die jeden Aspekt Ihrer digitalen Präsenz und betrieblichen Effizienz abdecken.',
      learnMore: 'Mehr erfahren'
    },
    howWeWork: {
      title: 'Wie wir arbeiten',
      subtitle: 'Ein optimierter, transparenter Prozess, der darauf ausgelegt ist, außergewöhnliche Ergebnisse ohne Reibungsverluste zu liefern.'
    },
    faq: {
      title: 'Häufig gestellte Fragen',
      subtitle: 'Alles, was Sie über unsere Dienstleistungen und unseren Prozess wissen müssen.'
    },
    audit: {
      title: 'Holen Sie sich ein kostenloses Website- + GMB- + Automatisierungs-Audit',
      subtitle: 'Wir analysieren Ihre aktuelle digitale Präsenz und erstellen einen individuellen Wachstumsfahrplan. Unverbindlich.',
      feature1: 'SEO-Analyse',
      feature2: 'Konversions-Audit',
      feature3: 'Automatisierungsstrategie',
      cta: 'Kostenloses Audit anfordern'
    },
    footer: {
      desc: 'Unternehmen mit leistungsstarken Webseiten, lokaler Suchdominanz und intelligenter AI-Voice-Automatisierung stärken.',
      services: 'Leistungen',
      allServices: 'Alle Leistungen',
      company: 'Unternehmen',
      privacy: 'Datenschutz',
      terms: 'Nutzungsbedingungen',
      contactUs: 'Kontaktieren Sie uns',
      address: 'Digital First Agency\nGlobaler Support',
      rights: 'Alle Rechte vorbehalten.'
    },
    stats: {
      growth: 'Kundenwachstum',
      projects: 'Abgeschlossene Projekte',
      rankings: 'Lokale Rankings',
      uptime: 'Support-Uptime'
    },
    servicesPage: {
      title: 'Unsere Expertise',
      subtitle: 'Umfassende digitale Dienstleistungen, die auf Ihre geschäftlichen Anforderungen zugeschnitten sind.'
    },
    about: {
      hero: {
        title: 'Wir sind Clariona AI.',
        subtitle: 'Ein Team von Designern, Ingenieuren und SEO-Spezialisten, das sich darauf konzentriert, Unternehmen dabei zu helfen, die Kraft moderner Technologie für nachhaltiges Wachstum zu nutzen.'
      },
      mission: {
        title: 'Unsere Mission',
        p1: 'In einer sich schnell entwickelnden digitalen Landschaft fällt es vielen Unternehmen schwer, mit den neuesten Tools und Strategien Schritt zu halten. Unsere Mission ist es, diese Lücke zu schließen, indem wir erstklassige, zugängliche und wirkungsvolle digitale Lösungen anbieten.',
        p2: 'Wir bauen nicht nur Webseiten oder richten AI-Agenten ein; wir bauen Wachstumsmaschinen, die für Sie arbeiten, während Sie sich auf das konzentrieren, was Sie am besten können – Ihr Unternehmen führen.'
      },
      values: {
        client: { title: 'Kunde zuerst', text: 'Ihr Erfolg ist unser wichtigster Maßstab.' },
        data: { title: 'Datengesteuert', text: 'Entscheidungen basierend auf echten Analysen.' },
        innovation: { title: 'Innovation', text: 'Immer am Puls der Zeit.' },
        integrity: { title: 'Integrität', text: 'Transparente und ehrliche Partnerschaft.' }
      }
    },
    contact: {
      hero: {
        title: 'Lassen Sie uns etwas Außergewöhnliches schaffen.',
        subtitle: 'Bereit, Ihr Unternehmen mit erstklassigen digitalen Lösungen zu skalieren? Buchen Sie einen Anruf oder senden Sie uns eine Nachricht, und wir melden uns innerhalb von 24 Stunden bei Ihnen.'
      },
      info: {
        email: 'E-Mail schreiben',
        call: 'Rufen Sie uns an',
        visit: 'Besuchen Sie uns'
      },
      booking: {
        title: 'Strategiegespräch buchen',
        subtitle: 'Sparen Sie sich das Hin und Her. Wählen Sie einen Termin, der für Sie passt, und lassen Sie uns Ihre Wachstumsstrategie besprechen.',
        cta: 'Termin auf Calendly vereinbaren'
      },
      form: {
        name: 'Vollständiger Name',
        email: 'E-Mail-Adresse',
        company: 'Unternehmensname',
        service: 'Interessiert an',
        audit: 'Vollständiges digitales Audit',
        message: 'Ihre Nachricht',
        messagePlaceholder: 'Erzählen Sie uns von Ihrem Projekt...',
        submit: 'Nachricht senden'
      },
      success: {
        title: 'Nachricht gesendet!',
        subtitle: 'Vielen Dank für Ihre Kontaktaufnahme. Einer unserer Experten wird sich in Kürze bei Ihnen melden.',
        cta: 'Weitere Nachricht senden'
      }
    },
    serviceTemplate: {
      getStarted: 'Heute starten',
      benefits: 'Hauptvorteile',
      includes: 'Was enthalten ist',
      process: 'Unser Prozess'
    },
    services: {
      websites: {
        title: 'Webseiten-Erstellung',
        subtitle: 'Hochleistungs-Design',
        desc: 'Wir bauen blitzschnelle, konversionsoptimierte Webseiten, die als Ihre 24/7-Verkaufsmaschine dienen.',
        benefits: [
          'Verwandeln Sie mehr Besucher in zahlende Kunden mit psychologischen Designprinzipien.',
          'Ranken Sie höher in Suchmaschinen mit integriertem technischem SEO und Geschwindigkeitsoptimierung.',
          'Bieten Sie eine nahtlose Erfahrung auf allen Geräten mit Mobile-First-Architektur.'
        ],
        includes: [
          'Individuelles UI/UX Design', 'Responsive Entwicklung', 'Geschwindigkeitsoptimierung', 'SEO-Setup',
          'CMS-Integration', 'Analyse-Dashboard', 'Copywriting', 'Hosting-Support'
        ],
        processSteps: [
          { title: 'Strategie & Wireframing', text: 'Wir planen die User Journey und Konversionspfade, bevor ein einziger Pixel entworfen wird.' },
          { title: 'Design & Entwicklung', text: 'Unser Team entwirft eine einzigartige visuelle Identität und baut sie mit sauberem, modernem Code.' },
          { title: 'Testen & Launch', text: 'Strenge Leistungstests garantieren einen perfekten Start in allen Browsern und auf allen Geräten.' }
        ]
      },
      gmb: {
        title: 'GMB-Ranking',
        subtitle: 'Lokale Suche dominieren',
        desc: 'Werden Sie von lokalen Kunden genau dann gefunden, wenn sie nach Ihren Dienstleistungen suchen.',
        benefits: [
          'Steigern Sie die Kundenfrequenz und Anrufe mit Top-3-Sichtbarkeit im Map Pack.',
          'Schaffen Sie Vertrauen mit einer verwalteten Bewertungsstrategie und einem professionellen GMB-Profil.',
          'Übertreffen Sie lokale Wettbewerber, indem Sie lokale Keywords mit hoher Kaufabsicht dominieren.'
        ],
        includes: [
          'GMB-Optimierung', 'Lokaler Zitat-Aufbau', 'Bewertungsmanagement', 'Keyword-Recherche',
          'Wettbewerbsanalyse', 'Monatliches Reporting', 'GMB-Post-Erstellung', 'Map Pack Tracking'
        ],
        processSteps: [
          { title: 'Audit & Analyse', text: 'Wir analysieren Ihren aktuellen lokalen Stand und identifizieren die größten Wachstumschancen.' },
          { title: 'Optimierung & Zitate', text: 'Wir bereinigen Ihren digitalen Fußabdruck und optimieren jeden Aspekt Ihres GMB-Profils.' },
          { title: 'Laufende Dominanz', text: 'Regelmäßige Posts, Bewertungsmanagement und Zitat-Updates halten Sie an der Spitze.' }
        ]
      },
      voice: {
        title: 'AI-Voice-Agenten',
        subtitle: '24/7 Automatisierter Support',
        desc: 'Verpassen Sie nie wieder einen Lead. Unsere AI-Voice-Agenten bearbeiten eingehende Anrufe und buchen Termine.',
        benefits: [
          'Sparen Sie Tausende an Personalkosten durch automatisierte 24/7-Kundeninteraktion.',
          'Qualifizieren Sie Leads sofort und synchronisieren Sie sie ohne menschliches Eingreifen direkt mit Ihrem CRM.',
          'Bieten Sie jedem Anrufer sofortige Antworten und steigern Sie so die Kundenzufriedenheit.'
        ],
        includes: [
          'Natürliche Sprachsynthese', 'Individuelle Wissensdatenbank', 'CRM-Integration', 'Terminbuchung',
          'Lead-Qualifizierung', 'Anrufaufzeichnung/Transkripte', 'Mehrsprachiger Support', 'Echtzeit-Analysen'
        ],
        processSteps: [
          { title: 'Wissens-Mapping', text: 'Wir trainieren die AI auf Ihre Geschäftsdaten, FAQs und spezifischen Verkaufsskripte.' },
          { title: 'Integration & Tests', text: 'Wir verbinden den Agenten mit Ihren Telefonleitungen und Ihrem CRM und sorgen für einen nahtlosen Datenfluss.' },
          { title: 'Bereitstellung & Tuning', text: 'Der Agent geht live, und wir verfeinern seine Leistung kontinuierlich basierend auf echten Anrufen.' }
        ]
      }
    },
    faqs: [
      {
        question: 'Wie lange dauert es, eine Webseite zu erstellen?',
        answer: 'Eine Standard-One-Page-Seite dauert in der Regel 1-2 Wochen, während komplexere mehrseitige Seiten je nach Anforderungen 3-5 Wochen dauern.'
      },
      {
        question: 'Bieten Sie laufenden Support an?',
        answer: 'Ja, wir bieten monatliche Wartungs- und Optimierungspakete an, um sicherzustellen, dass Ihre Seite und Ihr lokales Ranking der Konkurrenz vorausbleiben.'
      },
      {
        question: 'Kann der AI-Voice-Agent komplexe Anfragen bearbeiten?',
        answer: 'Absolut. Unsere Agenten werden auf Ihren spezifischen Geschäftsdaten trainiert und können häufige Fragen, Buchungsanfragen und Lead-Qualifizierungen bearbeiten.'
      },
      {
        question: 'Wie verbessern Sie das GMB-Ranking?',
        answer: 'Wir verwenden eine Kombination aus lokalem On-Page-SEO, Citation-Building, Bewertungsoptimierung und regelmäßigen GMB-Posts, um Ihre Sichtbarkeit zu erhöhen.'
      }
    ],
    process: [
      { title: 'Entdecken', description: 'Wir tauchen tief in Ihre Geschäftsziele und Zielgruppe ein.' },
      { title: 'Erstellen', description: 'Unsere Experten fertigen Ihre individuelle Lösung mit Präzision.' },
      { title: 'Starten', description: 'Wir stellen Ihre neuen Assets mit einer klaren Strategie bereit.' },
      { title: 'Optimieren', description: 'Kontinuierliche Überwachung und datengesteuerte Verbesserungen.' },
      { title: 'Unterstützen', description: 'Laufende Partnerschaft zur Sicherstellung langfristigen Wachstums.' }
    ]
  }
};
