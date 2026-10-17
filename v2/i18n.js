/* ============================================================
   i18n — English / Norsk / Português
   Elementos com data-i18n="chave" recebem o texto (aceita HTML).
   data-i18n-attr="aria-label:chave;placeholder:chave" para atributos.
   ============================================================ */

window.LP_I18N = (() => {
  const dict = {
    en: {
      'skip': 'Skip to content',
      'nav.mixes': 'Mixes',
      'nav.agenda': 'Agenda',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'nav.book': 'Booking',
      'nav.intro': 'Intro',
      'nav.menu': 'Menu',
      'nav.close': 'Close',

      'hero.role': 'DJ & Selecta',
      'hero.based': 'Based in Bergen',
      'hero.line': 'The sound of the diaspora — carried from Lisboa and Luanda to the far north.',
      'hero.listen': 'Listen',
      'hero.book': 'Booking',
      'hero.scroll': 'Scroll',

      'manifesto.label': 'Statement',
      'manifesto.text': 'Club music from <em>Lisboa</em> and <em>Luanda</em>, carried north to <em>Bergen</em>. Kuduro, kizomba, baile funk, amapiano, gqom — rhythms that settle in the hips and stay there.',

      'mixes.label': 'Mixes',
      'mixes.title': 'Selected <em>sounds</em>',
      'mixes.all': 'All on Mixcloud',
      'mixes.open': 'Open on Mixcloud',
      'mixes.loading': 'Loading mixes from Mixcloud…',
      'mixes.error': 'The player could not load here. Listen directly on Mixcloud.',
      'mixes.soon': 'Coming soon',
      'mixes.empty': 'New mixes are on the way. Follow on Instagram to hear them first.',
      'mixes.idle': 'Pick a record',
      'mixes.now': 'Now playing',
      'mixes.paused': 'Paused',
      'mixes.play': 'Play',
      'mixes.pause': 'Pause',
      'mixes.prev': 'Previous track',
      'mixes.next': 'Next track',
      'mixes.seek': 'Seek',
      'mixes.side': 'Side',

      'agenda.label': 'Agenda',
      'agenda.title': 'Upcoming <em>dates</em>',
      'agenda.empty': 'No public dates right now — new ones are on the way.',
      'agenda.past_show': 'Past dates',
      'agenda.past_hide': 'Hide past dates',
      'agenda.tickets': 'Tickets',
      'agenda.soldout': 'Sold out',
      'agenda.free': 'Free entry',
      'agenda.info': 'Info',
      'agenda.book': 'Want Love Pump at your venue?',

      'stages.label': 'Played at',

      'about.label': 'About',
      'about.title': 'Roots & <em>rhythm</em>',
      'about.p1': 'Love Pump was born in Portugal to Angolan parents and grew up in Bergen. Her sets draw on the club cultures of Lisboa and Luanda — and on everything in between.',
      'about.p2': 'In 2018 she founded Klubb Diaspora with her sister Miss Tati: a multicultural club night built around the sound of the diaspora.',
      'about.p3': 'She has played Øya Festival, Borealis, Hot Hot Hot, Landmark and Jaeger, and stages in London, Montpellier and Copenhagen — and is today one of the most influential DJs in Bergen.',
      'about.f.based': 'Based in',
      'about.f.based.v': 'Bergen, Norway',
      'about.f.roots': 'Roots',
      'about.f.crew': 'Co-founder',
      'about.f.crew.v': 'Klubb Diaspora, 2018 — with Miss Tati',
      'about.f.sound': 'Sound',
      'about.caption': 'Love Pump behind the decks',


      'contact.label': 'Contact',
      'contact.title': 'Get in <em>touch</em>',
      'contact.intro': 'Tell us about the night, the project or the idea.',
      'contact.direct': 'Direct',
      'form.type': 'What is it about?',
      'form.type.booking': 'Booking',
      'form.type.partnership': 'Partnership',
      'form.type.press': 'Press',
      'form.type.other': 'Other',
      'form.name': 'Name',
      'form.email': 'Email',
      'form.org': 'Organisation / venue',
      'form.date': 'Event date',
      'form.location': 'City',
      'form.message': 'Message',
      'form.optional': 'optional',
      'form.send': 'Send enquiry',
      'form.sending': 'Sending…',
      'form.success': 'Thank you — your message is on its way. We\'ll be in touch soon.',
      'form.error': 'Something went wrong. Please try again, or write to booking@lovepump.no.',
      'form.mailto': 'Your email app should open with the message ready. If it doesn\'t, write to booking@lovepump.no.',
      'form.privacy': 'Your details are only used to reply to your enquiry.',
      'form.err.required': 'This field is required',
      'form.err.email': 'Please enter a valid email',

      'nav.gallery': 'Gallery',
      'gallery.label': 'Gallery',
      'gallery.title': 'On the <em>floor</em>',
      'gallery.hint': 'Click a photo to open',
      'gallery.photo': 'Photo',
      'lb.prev': 'Previous photo',
      'lb.next': 'Next photo',
      'lb.close': 'Close',
      'lb.play': 'Play · 3s',
      'lb.pause': 'Pause',

      'player.label': 'Player',
      'footer.rights': 'All rights reserved.',
      'footer.top': 'Back to top'
    },

    no: {
      'skip': 'Hopp til innhold',
      'nav.mixes': 'Mikser',
      'nav.agenda': 'Agenda',
      'nav.about': 'Om',
      'nav.contact': 'Kontakt',
      'nav.book': 'Booking',
      'nav.intro': 'Intro',
      'nav.menu': 'Meny',
      'nav.close': 'Lukk',

      'hero.role': 'DJ & Selecta',
      'hero.based': 'Basert i Bergen',
      'hero.line': 'Diasporaens lyd — båret fra Lisboa og Luanda helt til det høye nord.',
      'hero.listen': 'Lytt',
      'hero.book': 'Booking',
      'hero.scroll': 'Scroll',

      'manifesto.label': 'Manifest',
      'manifesto.text': 'Klubbmusikk fra <em>Lisboa</em> og <em>Luanda</em>, båret nordover til <em>Bergen</em>. Kuduro, kizomba, baile funk, amapiano, gqom — rytmer som setter seg i hoftene og blir der.',

      'mixes.label': 'Mikser',
      'mixes.title': 'Utvalgte <em>lyder</em>',
      'mixes.all': 'Alt på Mixcloud',
      'mixes.open': 'Åpne på Mixcloud',
      'mixes.loading': 'Laster mikser fra Mixcloud…',
      'mixes.error': 'Spilleren kunne ikke lastes her. Lytt direkte på Mixcloud.',
      'mixes.soon': 'Kommer snart',
      'mixes.empty': 'Nye mikser er på vei. Følg på Instagram for å høre dem først.',
      'mixes.idle': 'Velg en plate',
      'mixes.now': 'Spilles nå',
      'mixes.paused': 'Pause',
      'mixes.play': 'Spill',
      'mixes.pause': 'Pause',
      'mixes.prev': 'Forrige spor',
      'mixes.next': 'Neste spor',
      'mixes.seek': 'Spol',
      'mixes.side': 'Side',

      'agenda.label': 'Agenda',
      'agenda.title': 'Kommende <em>datoer</em>',
      'agenda.empty': 'Ingen offentlige datoer akkurat nå — nye er på vei.',
      'agenda.past_show': 'Tidligere datoer',
      'agenda.past_hide': 'Skjul tidligere datoer',
      'agenda.tickets': 'Billetter',
      'agenda.soldout': 'Utsolgt',
      'agenda.free': 'Gratis inngang',
      'agenda.info': 'Info',
      'agenda.book': 'Vil du ha Love Pump på ditt sted?',

      'stages.label': 'Har spilt på',

      'about.label': 'Om',
      'about.title': 'Røtter & <em>rytme</em>',
      'about.p1': 'Love Pump er født i Portugal av angolanske foreldre og vokste opp i Bergen. Settene hennes henter næring fra klubbkulturen i Lisboa og Luanda — og alt som ligger imellom.',
      'about.p2': 'I 2018 startet hun Klubb Diaspora sammen med søsteren Miss Tati: en multikulturell klubbkveld bygget rundt diasporaens lyd.',
      'about.p3': 'Hun har spilt på Øyafestivalen, Borealis, Hot Hot Hot, Landmark og Jaeger, og på scener i London, Montpellier og København — og er i dag en av Bergens mest innflytelsesrike DJ-er.',
      'about.f.based': 'Basert i',
      'about.f.based.v': 'Bergen, Norge',
      'about.f.roots': 'Røtter',
      'about.f.crew': 'Medgrunnlegger',
      'about.f.crew.v': 'Klubb Diaspora, 2018 — med Miss Tati',
      'about.f.sound': 'Lyd',
      'about.caption': 'Love Pump bak spillerne',


      'contact.label': 'Kontakt',
      'contact.title': 'Ta <em>kontakt</em>',
      'contact.intro': 'Fortell oss om kvelden, prosjektet eller ideen.',
      'contact.direct': 'Direkte',
      'form.type': 'Hva gjelder det?',
      'form.type.booking': 'Booking',
      'form.type.partnership': 'Samarbeid',
      'form.type.press': 'Presse',
      'form.type.other': 'Annet',
      'form.name': 'Navn',
      'form.email': 'E-post',
      'form.org': 'Organisasjon / sted',
      'form.date': 'Dato for arrangement',
      'form.location': 'By',
      'form.message': 'Melding',
      'form.optional': 'valgfritt',
      'form.send': 'Send forespørsel',
      'form.sending': 'Sender…',
      'form.success': 'Takk — meldingen din er sendt. Vi tar kontakt snart.',
      'form.error': 'Noe gikk galt. Prøv igjen, eller skriv til booking@lovepump.no.',
      'form.mailto': 'E-postappen din skal åpne seg med meldingen klar. Hvis ikke, skriv til booking@lovepump.no.',
      'form.privacy': 'Opplysningene dine brukes kun til å svare på henvendelsen.',
      'form.err.required': 'Dette feltet er påkrevd',
      'form.err.email': 'Skriv inn en gyldig e-postadresse',

      'nav.gallery': 'Galleri',
      'gallery.label': 'Galleri',
      'gallery.title': 'På <em>gulvet</em>',
      'gallery.hint': 'Klikk på et bilde for å åpne',
      'gallery.photo': 'Foto',
      'lb.prev': 'Forrige bilde',
      'lb.next': 'Neste bilde',
      'lb.close': 'Lukk',
      'lb.play': 'Spill · 3s',
      'lb.pause': 'Pause',

      'player.label': 'Spiller',
      'footer.rights': 'Alle rettigheter reservert.',
      'footer.top': 'Til toppen'
    },

    pt: {
      'skip': 'Saltar para o conteúdo',
      'nav.mixes': 'Mixes',
      'nav.agenda': 'Agenda',
      'nav.about': 'Sobre',
      'nav.contact': 'Contacto',
      'nav.book': 'Booking',
      'nav.intro': 'Intro',
      'nav.menu': 'Menu',
      'nav.close': 'Fechar',

      'hero.role': 'DJ & Selecta',
      'hero.based': 'Baseada em Bergen',
      'hero.line': 'O som da diáspora — levado de Lisboa e Luanda até ao extremo norte.',
      'hero.listen': 'Ouvir',
      'hero.book': 'Booking',
      'hero.scroll': 'Scroll',

      'manifesto.label': 'Manifesto',
      'manifesto.text': 'Música de clube de <em>Lisboa</em> e <em>Luanda</em>, levada para norte até <em>Bergen</em>. Kuduro, kizomba, baile funk, amapiano, gqom — ritmos que se instalam nas ancas e ficam.',

      'mixes.label': 'Mixes',
      'mixes.title': 'Sons <em>escolhidos</em>',
      'mixes.all': 'Tudo no Mixcloud',
      'mixes.open': 'Abrir no Mixcloud',
      'mixes.loading': 'A carregar mixes do Mixcloud…',
      'mixes.error': 'O player não carregou aqui. Ouve diretamente no Mixcloud.',
      'mixes.soon': 'Em breve',
      'mixes.empty': 'Há mixes novos a caminho. Segue no Instagram para os ouvires primeiro.',
      'mixes.idle': 'Escolhe um disco',
      'mixes.now': 'A tocar',
      'mixes.paused': 'Em pausa',
      'mixes.play': 'Tocar',
      'mixes.pause': 'Pausa',
      'mixes.prev': 'Faixa anterior',
      'mixes.next': 'Próxima faixa',
      'mixes.seek': 'Avançar',
      'mixes.side': 'Lado',

      'agenda.label': 'Agenda',
      'agenda.title': 'Próximas <em>datas</em>',
      'agenda.empty': 'Sem datas públicas de momento — novas a caminho.',
      'agenda.past_show': 'Datas passadas',
      'agenda.past_hide': 'Esconder datas passadas',
      'agenda.tickets': 'Bilhetes',
      'agenda.soldout': 'Esgotado',
      'agenda.free': 'Entrada livre',
      'agenda.info': 'Info',
      'agenda.book': 'Queres a Love Pump no teu espaço?',

      'stages.label': 'Já tocou em',

      'about.label': 'Sobre',
      'about.title': 'Raízes & <em>ritmo</em>',
      'about.p1': 'A Love Pump nasceu em Portugal, filha de pais angolanos, e cresceu em Bergen. Os seus sets bebem das culturas de clube de Lisboa e Luanda — e de tudo o que existe entre elas.',
      'about.p2': 'Em 2018 fundou o Klubb Diaspora com a irmã, Miss Tati: uma noite de clube multicultural construída à volta do som da diáspora.',
      'about.p3': 'Já passou pelo Øya Festival, Borealis, Hot Hot Hot, Landmark e Jaeger, e por palcos em Londres, Montpellier e Copenhaga — e é hoje uma das DJs mais influentes de Bergen.',
      'about.f.based': 'Baseada em',
      'about.f.based.v': 'Bergen, Noruega',
      'about.f.roots': 'Raízes',
      'about.f.crew': 'Co-fundadora',
      'about.f.crew.v': 'Klubb Diaspora, 2018 — com Miss Tati',
      'about.f.sound': 'Som',
      'about.caption': 'Love Pump nos pratos',


      'contact.label': 'Contacto',
      'contact.title': 'Vamos <em>falar</em>',
      'contact.intro': 'Conta-nos sobre a noite, o projeto ou a ideia.',
      'contact.direct': 'Direto',
      'form.type': 'Sobre o que é?',
      'form.type.booking': 'Booking',
      'form.type.partnership': 'Parceria',
      'form.type.press': 'Imprensa',
      'form.type.other': 'Outro',
      'form.name': 'Nome',
      'form.email': 'Email',
      'form.org': 'Organização / espaço',
      'form.date': 'Data do evento',
      'form.location': 'Cidade',
      'form.message': 'Mensagem',
      'form.optional': 'opcional',
      'form.send': 'Enviar pedido',
      'form.sending': 'A enviar…',
      'form.success': 'Obrigada — a tua mensagem foi enviada. Respondemos em breve.',
      'form.error': 'Algo correu mal. Tenta de novo ou escreve para booking@lovepump.no.',
      'form.mailto': 'A tua app de email deve abrir com a mensagem pronta. Se não abrir, escreve para booking@lovepump.no.',
      'form.privacy': 'Os teus dados só são usados para responder ao teu pedido.',
      'form.err.required': 'Campo obrigatório',
      'form.err.email': 'Introduz um email válido',

      'nav.gallery': 'Galeria',
      'gallery.label': 'Galeria',
      'gallery.title': 'Na <em>pista</em>',
      'gallery.hint': 'Clica numa foto para abrir',
      'gallery.photo': 'Foto',
      'lb.prev': 'Foto anterior',
      'lb.next': 'Próxima foto',
      'lb.close': 'Fechar',
      'lb.play': 'Tocar · 3s',
      'lb.pause': 'Pausa',

      'player.label': 'Player',
      'footer.rights': 'Todos os direitos reservados.',
      'footer.top': 'Voltar ao topo'
    }
  };

  const SUPPORTED = ['en', 'no', 'pt'];
  const LOCALES = { en: 'en-GB', no: 'nb-NO', pt: 'pt-PT' };
  const HTML_LANG = { en: 'en', no: 'nb', pt: 'pt' };
  const subscribers = [];

  function detect() {
    try {
      const saved = localStorage.getItem('lp-lang');
      if (SUPPORTED.includes(saved)) return saved;
    } catch (_) { /* storage bloqueado */ }
    const nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
    if (['nb', 'nn', 'no'].includes(nav)) return 'no';
    if (nav === 'pt') return 'pt';
    return 'en';
  }

  let lang = detect();

  function t(key) {
    const v = dict[lang][key];
    return v !== undefined ? v : (dict.en[key] !== undefined ? dict.en[key] : key);
  }

  function apply() {
    document.documentElement.lang = HTML_LANG[lang];

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      el.innerHTML = t(el.dataset.i18n);
    });

    document.querySelectorAll('[data-i18n-attr]').forEach((el) => {
      el.dataset.i18nAttr.split(';').forEach((pair) => {
        const [attr, key] = pair.split(':').map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    document.querySelectorAll('[data-set-lang]').forEach((btn) => {
      btn.setAttribute('aria-pressed', String(btn.dataset.setLang === lang));
    });
  }

  function set(next) {
    if (!SUPPORTED.includes(next) || next === lang) return;
    lang = next;
    try { localStorage.setItem('lp-lang', lang); } catch (_) { /* ignora */ }
    apply();
    subscribers.forEach((fn) => fn(lang));
  }

  document.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-set-lang]');
    if (btn) set(btn.dataset.setLang);
  });

  apply();

  return {
    t,
    set,
    get lang() { return lang; },
    get locale() { return LOCALES[lang]; },
    onChange: (fn) => subscribers.push(fn)
  };
})();
