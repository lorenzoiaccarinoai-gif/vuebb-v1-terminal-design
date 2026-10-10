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
      "legal.cookie": "Informativa cookie",
      "legal.manage": "Gestisci cookie",
      "legal.copy": "Tutti i diritti riservati.",
      "legal.back": "Torna al sito",
      "cookie.title": "Chiarezza sull'utilizzo dei cookie.",
      "cookie.text": "Salviamo solo la tua preferenza; non raccogliamo alcun dato prima della tua autorizzazione. <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Informativa cookie</a>",
      "cookie.reject": "Solo necessari",
      "cookie.accept": "Accetto",
      "book.label": "Prenotazione",
      "book.desc": "30 minuti. Nessun impegno — solo ascolto e chiarezza.",
      "book.legal": "Il form è di Google Calendar. <a href=\"privacy-policy.html\" target=\"_blank\" rel=\"noopener\">Informativa privacy</a> · <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Informativa cookie</a>",
      "pp.label": "Informativa",
      "pp.title": "Informativa privacy",
      "pp.lead": "Come trattiamo i dati quando ci scrivi via e-mail o WhatsApp, o quando prenoti una call dal popup. Art. 13 GDPR.",
      "pp.holder.t": "Titolare",
      "pp.holder.p": "Lorenzo Iaccarino — Vuebb.<br>tecnologiasumisura.info@gmail.com · +39 333 458 5718",
      "pp.when.t": "Quando si applica",
      "pp.when.p": "Quando ci contatti dal sito: e-mail, WhatsApp, oppure il popup «Prenota Call Demo». Il popup apre Google Calendar Appointment Scheduling, con un mini form di contatto (nome, e-mail e, se lo chiedi, telefono e note) e la scelta di data e ora.",
      "pp.data.t": "Quali dati",
      "pp.data.p1": "<strong>E-mail e WhatsApp.</strong> Numero, indirizzo e-mail, nome e contenuto del messaggio, più i metadati del canale (data, stato di consegna).",
      "pp.data.p2": "<strong>Prenotazione call.</strong> Nome, e-mail, eventuale telefono e note, slot scelto, conferma dell’appuntamento e metadati tecnici del calendario (fuso, lingua, stato della prenotazione). Non chiediamo dati eccedenti rispetto alla call.",
      "pp.why.t": "Perché",
      "pp.why.p": "Per risponderti, fissare la call conoscitiva e demo, capire il progetto e, se lo chiedi, avviare un rapporto di lavoro. Non usiamo questi recapiti per marketing automatico né li cediamo a terzi per profilazione.",
      "pp.basis.t": "Base giuridica",
      "pp.basis.p": "Art. 6, par. 1, lett. b) GDPR: misure precontrattuali su tua richiesta (messaggio o prenotazione dello slot). Se il contatto resta informale, art. 6, par. 1, lett. f): legittimo interesse a dare seguito.",
      "pp.duty.t": "Obbligo",
      "pp.duty.p": "Conferire i dati non è obbligatorio. Senza un recapito o senza completare il form del calendario non possiamo risponderti né confermare la call.",
      "pp.keep.t": "Conservazione",
      "pp.keep.p": "Per il tempo necessario a evadere la richiesta o a tenere la call, e, se nasce un incarico, per la durata del rapporto. L’appuntamento resta sul calendario fino allo slot e al follow-up utile. Altrimenti non oltre 24 mesi dall’ultimo contatto, salvo obblighi di legge.",
      "pp.who.t": "Chi li tratta",
      "pp.who.p": "Il titolare. Fornitori del canale che usi tu: Google Ireland Ltd. (Gmail e Google Calendar Appointment Scheduling, incluso il mini form nel popup) e WhatsApp Ireland Ltd. (gruppo Meta).",
      "pp.xfer.t": "Trasferimenti",
      "pp.xfer.p": "Google e Meta possono trattare dati anche fuori UE, con clausole contrattuali standard. Aprendo Gmail, WhatsApp o il calendario di prenotazione valgono anche le loro informative (in particolare <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Privacy Policy di Google</a>).",
      "pp.rights.t": "Diritti",
      "pp.rights.p": "Accesso, rettifica, cancellazione, limitazione, opposizione, portabilità e reclamo al Garante Privacy. Scrivi a tecnologiasumisura.info@gmail.com. Per uno slot già prenotato puoi anche usare il link di gestione che Google invia via e-mail.",
      "pp.updated": "Aggiornata il 17 settembre 2026.",
      "cp.label": "Informativa",
      "cp.title": "Informativa cookie",
      "cp.lead": "Quali cookie usa questo sito, incluso il popup di prenotazione call, e come sceglierli.",
      "cp.holder.t": "Titolare",
      "cp.holder.p": "Lorenzo Iaccarino — Vuebb.<br>tecnologiasumisura.info@gmail.com",
      "cp.use.t": "Cosa usiamo",
      "cp.use.p": "Cookie tecnici, cookie analitici (solo con il tuo consenso) e, se apri il popup «Prenota Call Demo», cookie e storage di Google Calendar necessari al form di prenotazione. La lingua del sito è uno storage tecnico locale e non passa dal consenso agli analitici.",
      "cp.tech.t": "Cookie tecnici (necessari)",
      "cp.tech.p1": "Memorizzano la tua scelta sul banner (accetta / rifiuta). Durata: 6 mesi. Base giuridica: art. 122 Codice Privacy e legittimo interesse all’erogazione del servizio. Non richiedono consenso.",
      "cp.tech.p2": "Salviamo anche la lingua del sito (IT/EN) nello storage locale del browser (<code>vuebb-lang</code>), sul tuo dispositivo. Serve solo a mostrare il sito nella lingua giusta alle visite successive. Non è un cookie di profilazione, non viene usato per statistica o pubblicità e non passa dal banner di consenso.",
      "cp.ana.t": "Cookie analitici",
      "cp.ana.p": "Fornitore: Google Ireland Ltd. Finalità: misurare visite e uso del sito, in forma aggregata, con IP anonimizzato. Cookie tipici: <code>_ga</code> (24 mesi), <code>_ga_*</code> (24 mesi). Base giuridica: consenso. Vengono installati solo dopo «Accetta».",
      "cp.cal.t": "Prenotazione call (Google Calendar)",
      "cp.cal.p1": "Il pulsante «Prenota Call Demo» apre un popup con un iframe di Google Calendar Appointment Scheduling. Lì trovi il calendario e un mini form (nome, e-mail, eventuali recapiti e note). Lo iframe parte solo dopo il click: prima Google Calendar non viene caricato.",
      "cp.cal.p2": "Fornitore: Google Ireland Ltd. Cookie e storage del dominio <code>calendar.google.com</code> servono a mostrare gli slot, inviare il form e confermare l’appuntamento. Sono cookie tecnici del servizio che hai chiesto tu (art. 122 Codice Privacy). Se sei già loggato su Google, valgono anche i cookie del tuo account, secondo le regole di Google.",
      "cp.font.t": "Font",
      "cp.font.p": "I caratteri (Geist Sans) sono ospitati su questo sito. Non vengono richieste risorse a Google Fonts né ad altri CDN di terze parti per la tipografia.",
      "cp.xfer.t": "Trasferimenti",
      "cp.xfer.p": "Se accetti gli analitici, o se apri il popup di prenotazione, Google può trattare dati anche fuori UE secondo le proprie clausole contrattuali standard. Dettagli: <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Privacy Policy di Google</a> e <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">cookie di Google</a>. I font non comportano trasferimenti.",
      "cp.manage.t": "Come gestire il consenso",
      "cp.manage.p1": "Analitici: accetta o rifiuta dal banner; puoi cambiare idea da «Gestisci cookie» in fondo al sito. Il rifiuto non pregiudica la navigazione. Se rifiuti dopo aver accettato, i cookie Analytics vengono cancellati e lo script non viene più caricato.",
      "cp.manage.p2": "Prenotazione call: non passa dal banner. Si attiva solo se apri il popup. Per non caricare Google Calendar, non usare «Prenota Call Demo» e scrivici via e-mail o WhatsApp.",
      "cp.rights.t": "Diritti",
      "cp.rights.p": "Accesso, rettifica, cancellazione, limitazione, opposizione, portabilità e reclamo al Garante Privacy. Scrivi a tecnologiasumisura.info@gmail.com.",
      "cp.updated": "Aggiornata il 17 settembre 2026.",
      "page.privacy": "Informativa privacy — Vuebb",
      "page.cookie": "Informativa cookie — Vuebb"
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
      "legal.cookie": "Cookie notice",
      "legal.manage": "Manage cookies",
      "legal.copy": "All rights reserved.",
      "legal.back": "Back to site",
      "cookie.title": "Clear language on cookies.",
      "cookie.text": "We only save your preference; we collect no data before you choose. <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookie notice</a>",
      "cookie.reject": "Necessary only",
      "cookie.accept": "Accept",
      "book.label": "Booking",
      "book.desc": "30 minutes. No commitment — just listening and clarity.",
      "book.legal": "The form is Google Calendar. <a href=\"privacy-policy.html\" target=\"_blank\" rel=\"noopener\">Privacy notice</a> · <a href=\"cookie-policy.html\" target=\"_blank\" rel=\"noopener\">Cookie notice</a>",
      "pp.label": "Notice",
      "pp.title": "Privacy notice",
      "pp.lead": "How we handle your data when you email us, write on WhatsApp, or book a call from the popup. Art. 13 GDPR.",
      "pp.holder.t": "Controller",
      "pp.holder.p": "Lorenzo Iaccarino — Vuebb.<br>tecnologiasumisura.info@gmail.com · +39 333 458 5718",
      "pp.when.t": "When it applies",
      "pp.when.p": "When you contact us from the site: email, WhatsApp, or the “Book Demo Call” popup. The popup opens Google Calendar Appointment Scheduling, with a short contact form (name, email and, if you add them, phone and notes) and a date and time picker.",
      "pp.data.t": "What data",
      "pp.data.p1": "<strong>Email and WhatsApp.</strong> Phone number, email address, name and message content, plus channel metadata (date, delivery status).",
      "pp.data.p2": "<strong>Call booking.</strong> Name, email, optional phone and notes, chosen slot, appointment confirmation and technical calendar metadata (timezone, language, booking status). We do not ask for more than the call requires.",
      "pp.why.t": "Why",
      "pp.why.p": "To reply, book the intro and demo call, understand the project and, if you ask, start a working relationship. We do not use these contacts for automated marketing or share them with third parties for profiling.",
      "pp.basis.t": "Legal basis",
      "pp.basis.p": "Art. 6(1)(b) GDPR: pre-contractual steps at your request (a message or booking a slot). If the contact stays informal, Art. 6(1)(f): legitimate interest in following up.",
      "pp.duty.t": "Is it required?",
      "pp.duty.p": "Providing data is not mandatory. Without a contact detail or without completing the calendar form we cannot reply or confirm the call.",
      "pp.keep.t": "Retention",
      "pp.keep.p": "For as long as needed to handle the request or hold the call and, if work starts, for the life of the engagement. The appointment stays on the calendar until the slot and useful follow-up. Otherwise no longer than 24 months from the last contact, unless the law requires more.",
      "pp.who.t": "Who processes it",
      "pp.who.p": "The controller. Providers of the channel you use: Google Ireland Ltd. (Gmail and Google Calendar Appointment Scheduling, including the mini form in the popup) and WhatsApp Ireland Ltd. (Meta group).",
      "pp.xfer.t": "Transfers",
      "pp.xfer.p": "Google and Meta may also process data outside the EU, under standard contractual clauses. Opening Gmail, WhatsApp or the booking calendar also means their own notices apply (in particular <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Google’s Privacy Policy</a>).",
      "pp.rights.t": "Your rights",
      "pp.rights.p": "Access, rectification, erasure, restriction, objection, portability and a complaint to the Italian Data Protection Authority (Garante). Write to tecnologiasumisura.info@gmail.com. For a slot already booked you can also use the management link Google sends by email.",
      "pp.updated": "Updated 17 September 2026.",
      "cp.label": "Notice",
      "cp.title": "Cookie notice",
      "cp.lead": "Which cookies this site uses, including the call-booking popup, and how to choose them.",
      "cp.holder.t": "Controller",
      "cp.holder.p": "Lorenzo Iaccarino — Vuebb.<br>tecnologiasumisura.info@gmail.com",
      "cp.use.t": "What we use",
      "cp.use.p": "Technical cookies, analytics cookies (only with your consent) and, if you open the “Book Demo Call” popup, Google Calendar cookies and storage needed for the booking form. Site language is local technical storage and does not go through analytics consent.",
      "cp.tech.t": "Technical cookies (necessary)",
      "cp.tech.p1": "They store your banner choice (accept / reject). Duration: 6 months. Legal basis: Art. 122 of the Italian Privacy Code and legitimate interest in providing the service. They do not require consent.",
      "cp.tech.p2": "We also save the site language (IT/EN) in the browser’s local storage (<code>vuebb-lang</code>), on your device. It only shows the site in the right language on later visits. It is not a profiling cookie, is not used for analytics or ads, and does not go through the consent banner.",
      "cp.ana.t": "Analytics cookies",
      "cp.ana.p": "Provider: Google Ireland Ltd. Purpose: measure visits and site use, in aggregate, with anonymised IP. Typical cookies: <code>_ga</code> (24 months), <code>_ga_*</code> (24 months). Legal basis: consent. They are set only after “Accept”.",
      "cp.cal.t": "Call booking (Google Calendar)",
      "cp.cal.p1": "The “Book Demo Call” button opens a popup with a Google Calendar Appointment Scheduling iframe. There you find the calendar and a short form (name, email, optional contacts and notes). The iframe starts only after the click: Google Calendar is not loaded before that.",
      "cp.cal.p2": "Provider: Google Ireland Ltd. Cookies and storage on <code>calendar.google.com</code> show slots, submit the form and confirm the appointment. They are technical cookies of the service you asked for (Art. 122 Italian Privacy Code). If you are already signed in to Google, your account cookies also apply under Google’s rules.",
      "cp.font.t": "Fonts",
      "cp.font.p": "The typefaces (Geist Sans) are hosted on this site. No requests are made to Google Fonts or other third-party font CDNs.",
      "cp.xfer.t": "Transfers",
      "cp.xfer.p": "If you accept analytics, or if you open the booking popup, Google may also process data outside the EU under its standard contractual clauses. Details: <a href=\"https://policies.google.com/privacy\" target=\"_blank\" rel=\"noopener\">Google Privacy Policy</a> and <a href=\"https://policies.google.com/technologies/cookies\" target=\"_blank\" rel=\"noopener\">Google cookies</a>. Fonts do not involve transfers.",
      "cp.manage.t": "How to manage consent",
      "cp.manage.p1": "Analytics: accept or reject from the banner; you can change your mind from “Manage cookies” at the bottom of the site. Refusal does not affect browsing. If you refuse after accepting, Analytics cookies are deleted and the script is no longer loaded.",
      "cp.manage.p2": "Call booking: it does not go through the banner. It starts only if you open the popup. To avoid loading Google Calendar, do not use “Book Demo Call” and write to us by email or WhatsApp.",
      "cp.rights.t": "Your rights",
      "cp.rights.p": "Access, rectification, erasure, restriction, objection, portability and a complaint to the Italian Data Protection Authority (Garante). Write to tecnologiasumisura.info@gmail.com.",
      "cp.updated": "Updated 17 September 2026.",
      "page.privacy": "Privacy notice — Vuebb",
      "page.cookie": "Cookie notice — Vuebb"
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
      flagEl.innerHTML = lang === "it" ? '<svg viewBox="0 0 3 2" width="18" height="12" aria-hidden="true"><rect width="1" height="2" fill="#009246"/><rect x="1" width="1" height="2" fill="#fff"/><rect x="2" width="1" height="2" fill="#ce2b37"/></svg>' : '<svg viewBox="0 0 60 30" width="18" height="12" aria-hidden="true"><clipPath id="c"><path d="M0,0v30h60V0z"/></clipPath><path d="M0,0v30h60V0z" fill="#012169"/><path d="M0,0l60,30M60,0L0,30" stroke="#fff" stroke-width="6"/><path d="M0,0l60,30M60,0L0,30" stroke="#C8102E" stroke-width="4"/><path d="M30,0v30M0,15h60" stroke="#fff" stroke-width="10"/><path d="M30,0v30M0,15h60" stroke="#C8102E" stroke-width="6"/></svg>';
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

    const pageKey = document.body.getAttribute("data-page");
    if (pageKey && translations[lang][pageKey]) {
      document.title = translations[lang][pageKey];
    }
    const meta = document.querySelector('meta[name="description"]');
    const descKey = document.body.getAttribute("data-desc");
    if (meta && descKey && translations[lang][descKey]) {
      meta.setAttribute("content", translations[lang][descKey]);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    let start = "en";
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
