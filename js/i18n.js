(function () {
  'use strict';

  const translations = {
    it: {
      "nav.filosofia": "Filosofia",
      "nav.servizi": "Servizi",
      "nav.portfolio": "Portfolio",
      "nav.metodo": "Metodo",
      "nav.perchi": "Per chi",
      "nav.prezzi": "Prezzi",
      "nav.contatti": "Contattaci",
      "cta.book": "Prenota Call Demo",
      "hero.chip": "Boutique web",
      "hero.tagline": "Siti, web app ed e-commerce ultra personalizzati. Interfacce che coinvolgono e convertono.",
      "hero.services": "Vedi i servizi",
      "filo.title": "Non siamo un’agenzia.<br>Siamo una boutique web.",
      "filo.desc": "Vuebb nasce dall’idea che il web debba adattarsi alle persone e al brand, non il contrario. Nessun template. Solo pezzi unici.",
      "filo.s1.title": "Ascolto prima del codice",
      "filo.s1.desc": "Come un sarto confeziona un abito su misura, progettiamo siti boutique, web app e negozi online che rispettano l’unicità di ogni attività.",
      "filo.s2.title": "Zero soluzioni pronte",
      "filo.s2.desc": "Nessuna soluzione “pronta all’uso”. Lavoro artigianale, attenzione maniacale ai dettagli e risultati che parlano da soli.",
      "filo.s3.title": "L’unicità non è un optional",
      "filo.s3.desc": "È il punto di partenza. Ogni pixel è pensato per il vostro posizionamento, non per un modello generico.",
      "serv.title": "Tre strumenti.<br>Un’unica firma.",
      "serv.desc": "Ogni progetto nasce da un dialogo profondo e si costruisce come un pezzo unico.",
      "serv.web.title": "Siti Web Boutique",
      "serv.web.desc": "Presenze digitali curate e convertenti. Ogni pixel è pensato per rappresentare il vostro posizionamento con eleganza ed efficacia.",
      "serv.app.title": "Web App",
      "serv.app.desc": "Applicazioni Web per i vostri processi reali. Interfacce chiare, flussi su misura, controllo senza forzature.",
      "serv.ecom.title": "E-commerce",
      "serv.ecom.desc": "Negozi online su misura: catalogo, checkout e ordini costruiti intorno al vostro modo di vendere.",
      "feat.mobile": "Ottimizzazione mobile",
      "feat.seo": "Ottimizzazione SEO / AI",
      "feat.brand": "Personal branding",
      "feat.corp": "Corporate",
      "feat.landing": "Landing ad alta conversione",
      "feat.edit": "Editoriali e portfolio",
      "feat.dash": "Dashboard e aree riservate",
      "feat.portali": "Portali clienti e fornitori",
      "feat.internal": "Strumenti interni",
      "feat.book": "Prenotazioni e flussi",
      "feat.store": "Store boutique",
      "feat.checkout": "Checkout e pagamenti",
      "feat.stock": "Scorte e catalogo",
      "feat.sales": "Integrazioni di vendita",
      "port.title": "I nostri lavori.<br>Pezzi unici, dal vivo.",
      "port.desc": "Siti attualmente in lavorazione. Clicca per aprire l’anteprima.",
      "port.wip": "In lavorazione",
      "port.wip.desc": "Progetti boutique in corso. Apri il blocco per le anteprime.",
      "cap.emozioni": "Emozioni Capresi — Villa per Vacanze. In lavorazione.",
      "cap.emozioniCasa": "Emozioni Capresi — Villa per Vacanze. In lavorazione.",
      "cap.moonlight": "Moonlight — Ristorante di Pesce dal 1980. In lavorazione.",
      "cap.rever": "Studio Rever — Formazione Personal Trainer. In lavorazione.",
      "cap.montano": "Il Montano — Eco Bistrot & Cocktail Bar. In lavorazione.",
      "met.title": "Dal brief al live,<br>senza rumore.",
      "met.desc": "Un percorso chiaro, dal primo ascolto al sito, alla web app o allo store online. Ogni progetto nasce già pensato per il mobile: interfacce fluide ed esperienza ottimizzata per smartphone e tablet.",
      "met.founder": "Fondatore di Vuebb",
      "met.about": "Anni al fianco di start-up innovative per professionisti: così si è sviluppato l'approccio Vuebb. L'obiettivo è supportare i clienti nel raggiungimento del massimo potenziale.",
      "met.s1.title": "Ascolto",
      "met.s1.desc": "Partiamo da voi. Comprendiamo brand, obiettivi e ambizioni digitali. Nessuna soluzione prima di una diagnosi precisa.",
      "met.s2.title": "Progettazione",
      "met.s2.desc": "Definiamo architettura, flussi e interfacce. Ogni decisione è condivisa e motivata.",
      "met.s3.title": "Realizzazione",
      "met.s3.desc": "Sviluppo iterativo, test continui, attenzione ossessiva alla qualità. Niente sorprese.",
      "met.s4.title": "Affiancamento",
      "met.s4.desc": "Consegna non significa abbandono. Formazione, supporto ed evoluzione fanno parte del lavoro.",
      "who.title": "Per chi non si accontenta del “già fatto”.",
      "who.p.title": "Professionisti",
      "who.p.desc": "Studi, consulenti, creativi. Chi gestisce relazioni di alto valore e ha bisogno di un web all’altezza della propria professionalità.",
      "who.m.title": "Micro-Imprese",
      "who.m.desc": "Realtà agili che vogliono crescere senza perdere identità. Un web che scala con voi, non che vi impone modelli estranei.",
      "who.s.title": "PMI",
      "who.s.desc": "Aziende strutturate che cercano siti boutique, web app ed e-commerce verticali, e un partner che parla il linguaggio del business.",
      "price.label": "Investimento",
      "price.title": "Prezzi su misura.<br>Valore senza compromessi.",
      "price.desc": "Canone mensile, senza costo iniziale. Prezzi IVA inclusa.",
      "price.from": "a partire da",
      "price.month": " / mese",
      "price.iva": "IVA inclusa · costo iniziale 0",
      "price.web.note": "Pagine, funzionalità e personal branding.",
      "price.app.note": "Flussi, integrazioni e requisiti specifici.",
      "price.ecom.note": "Catalogo, pagamenti e logistica.",
      "price.include": "Il canone include: manutenzione, hosting, dominio proprietario, informativa privacy e cookie.",
      "price.extra": "Extra da quotare: produzione editoriale di contenuti ottimizzati SEO e AI, reportistica mensile sul traffico web, aggiornamenti successivi alla prima release ufficiale del sito web.",
      "cta.label": "Iniziamo",
      "cta.title": "Raccontateci il vostro progetto.",
      "cta.desc": "Ogni collaborazione inizia con una conversazione. Nessun impegno, solo ascolto e chiarezza.",
      "cta.mail": "Scrivici una mail",
      "cta.reply": "Risposta entro due giorni lavorativi",
      "legal.privacy": "Informativa privacy",
      "legal.cookie": "Cookie policy",
      "legal.manage": "Gestisci cookie",
      "legal.copy": "Tutti i diritti riservati.",
      "legal.back": "Torna al sito",
      "cookie.title": "Chiarezza sull'utilizzo dei cookie.",
      "cookie.text": "Salviamo solo la tua preferenza; non raccogliamo alcun dato prima della tua autorizzazione. <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookie policy</a>",
      "cookie.reject": "Solo necessari",
      "cookie.accept": "Accetto",
      "book.label": "Prenotazione",
      "book.desc": "30 minuti. Nessun impegno — solo ascolto e chiarezza.",
      "book.legal": "Il form è di Google Calendar. <a href=\"privacy-policy.html\" target=\"_blank\" rel=\"noopener\">Informativa privacy</a> · <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookie</a>"
    },
    en: {
      "nav.filosofia": "Philosophy",
      "nav.servizi": "Services",
      "nav.portfolio": "Work",
      "nav.metodo": "Method",
      "nav.perchi": "Who it's for",
      "nav.prezzi": "Pricing",
      "nav.contatti": "Contact",
      "cta.book": "Book a demo call",
      "hero.chip": "Web boutique",
      "hero.tagline": "Ultra-custom websites, web apps and e-commerce. Interfaces that engage and convert.",
      "hero.services": "See services",
      "filo.title": "We are not an agency.<br>We are a web boutique.",
      "filo.desc": "Vuebb starts from the idea that the web should adapt to people and the brand, not the other way around. No templates. Only one-offs.",
      "filo.s1.title": "Listening before code",
      "filo.s1.desc": "Like a tailor cutting a suit to measure, we design boutique sites, web apps and online stores that respect what makes each business unique.",
      "filo.s2.title": "No off-the-shelf solutions",
      "filo.s2.desc": "Nothing “ready to use”. Craft work, obsessive attention to detail, and results that speak for themselves.",
      "filo.s3.title": "Uniqueness is not optional",
      "filo.s3.desc": "It is the starting point. Every pixel is designed for your positioning, not for a generic template.",
      "serv.title": "Three tools.<br>One signature.",
      "serv.desc": "Every project starts with a real conversation and is built as a one-off piece.",
      "serv.web.title": "Boutique websites",
      "serv.web.desc": "Curated, converting digital presence. Every pixel is meant to represent your positioning with elegance and impact.",
      "serv.app.title": "Web apps",
      "serv.app.desc": "Web applications for your real processes. Clear interfaces, tailored flows, control without force-fits.",
      "serv.ecom.title": "E-commerce",
      "serv.ecom.desc": "Made-to-measure online stores: catalogue, checkout and orders built around how you sell.",
      "feat.mobile": "Mobile optimisation",
      "feat.seo": "SEO / AI optimisation",
      "feat.brand": "Personal branding",
      "feat.corp": "Corporate",
      "feat.landing": "High-conversion landing pages",
      "feat.edit": "Editorial and portfolio",
      "feat.dash": "Dashboards and private areas",
      "feat.portali": "Client and supplier portals",
      "feat.internal": "Internal tools",
      "feat.book": "Bookings and flows",
      "feat.store": "Boutique store",
      "feat.checkout": "Checkout and payments",
      "feat.stock": "Stock and catalogue",
      "feat.sales": "Sales integrations",
      "port.title": "Our work.<br>One-offs, live.",
      "port.desc": "Sites currently in progress. Click to open the preview.",
      "port.wip": "In progress",
      "port.wip.desc": "Boutique projects underway. Open the block for previews.",
      "cap.emozioni": "Emozioni Capresi — Holiday villa. In progress.",
      "cap.emozioniCasa": "Emozioni Capresi — Holiday villa. In progress.",
      "cap.moonlight": "Moonlight — Seafood restaurant since 1980. In progress.",
      "cap.rever": "Studio Rever — Personal trainer training. In progress.",
      "cap.montano": "Il Montano — Eco Bistrot & Cocktail Bar. In progress.",
      "met.title": "From brief to live,<br>without noise.",
      "met.desc": "A clear path from the first conversation to the site, web app or store. Every project is mobile-first: fluid interfaces and an experience built for phones and tablets.",
      "met.founder": "Founder of Vuebb",
      "met.about": "Years alongside innovative professional start-ups shaped the Vuebb approach. The aim is to help clients reach their full potential.",
      "met.s1.title": "Listen",
      "met.s1.desc": "We start with you. We understand brand, goals and digital ambition. No solution before a precise diagnosis.",
      "met.s2.title": "Design",
      "met.s2.desc": "We define architecture, flows and interfaces. Every decision is shared and reasoned.",
      "met.s3.title": "Build",
      "met.s3.desc": "Iterative development, continuous testing, obsessive quality. No surprises.",
      "met.s4.title": "Stay with you",
      "met.s4.desc": "Handover is not abandonment. Training, support and evolution are part of the work.",
      "who.title": "For those who will not settle for “already done”.",
      "who.p.title": "Professionals",
      "who.p.desc": "Studios, consultants, creatives. Anyone managing high-value relationships who needs a web presence that matches their work.",
      "who.m.title": "Micro-businesses",
      "who.m.desc": "Agile teams that want to grow without losing identity. A web that scales with you, instead of imposing someone else’s model.",
      "who.s.title": "SMEs",
      "who.s.desc": "Structured companies looking for boutique sites, vertical web apps and e-commerce, and a partner who speaks the language of business.",
      "price.label": "Investment",
      "price.title": "Tailored pricing.<br>Value without compromise.",
      "price.desc": "Monthly retainer, no upfront fee. Prices include VAT.",
      "price.from": "from",
      "price.month": " / month",
      "price.iva": "VAT included · no setup fee",
      "price.web.note": "Pages, features and personal branding.",
      "price.app.note": "Flows, integrations and specific requirements.",
      "price.ecom.note": "Catalogue, payments and logistics.",
      "price.include": "The retainer includes: maintenance, hosting, your own domain, privacy notice and cookies.",
      "price.extra": "Quoted separately: SEO and AI editorial content, monthly traffic reporting, updates after the first official site release.",
      "cta.label": "Let’s start",
      "cta.title": "Tell us about your project.",
      "cta.desc": "Every collaboration starts with a conversation. No commitment — just listening and clarity.",
      "cta.mail": "Email us",
      "cta.reply": "Reply within two working days",
      "legal.privacy": "Privacy notice",
      "legal.cookie": "Cookie policy",
      "legal.manage": "Manage cookies",
      "legal.copy": "All rights reserved.",
      "legal.back": "Back to site",
      "cookie.title": "Clear language on cookies.",
      "cookie.text": "We only save your preference; we collect no data before you choose. <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookie policy</a>",
      "cookie.reject": "Necessary only",
      "cookie.accept": "Accept",
      "book.label": "Booking",
      "book.desc": "30 minutes. No commitment — just listening and clarity.",
      "book.legal": "The form is Google Calendar. <a href=\"privacy-policy.html\" target=\"_blank\" rel=\"noopener\">Privacy notice</a> · <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookies</a>"
    }
  };

  let currentLang = "it";

  function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;
    try { localStorage.setItem("vuebb-lang", lang); } catch (e) {}

    const flagEl = document.getElementById("langFlag");
    const codeEl = document.getElementById("langCode");
    if (flagEl && codeEl) {
      flagEl.textContent = lang === "it" ? "🇮🇹" : "🇬🇧";
      codeEl.textContent = lang === "it" ? "IT" : "EN";
    }

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const text = translations[lang][key];
      if (text === undefined) return;
      if (text.includes("<")) el.innerHTML = text;
      else el.textContent = text;
    });

    document.querySelectorAll("[data-i18n-caption]").forEach((el) => {
      const key = el.getAttribute("data-i18n-caption");
      const text = translations[lang][key];
      if (text) el.setAttribute("data-caption", text);
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    let start = "it";
    try {
      const saved = localStorage.getItem("vuebb-lang");
      if (saved === "en" || saved === "it") start = saved;
      else {
        const codes = [navigator.language, ...(navigator.languages || [])];
        for (const c of codes) {
          const l = String(c || "").toLowerCase();
          if (l.startsWith("it")) { start = "it"; break; }
          if (l.startsWith("en")) { start = "en"; break; }
        }
      }
    } catch (e) {}
    setLanguage(start);

    const toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.addEventListener("click", () => {
        setLanguage(currentLang === "it" ? "en" : "it");
      });
    }
  });
})();
