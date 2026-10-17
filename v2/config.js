/* ============================================================
   LOVE PUMP — CONFIG DE CONTEÚDO
   Tudo o que muda com frequência fica aqui: links, formulário, agenda.
   Sem build: editar, salvar, publicar.
   ============================================================ */

window.LP_CONFIG = {
  /* ----------------------------------------------------------
     MIXES (Mixcloud)
     O Mixcloud licencia a música dos DJ mixes: sem takedowns.
     - user:  nome da conta (mixcloud.com/<user>/) → entram os mixes
              mais recentes sozinhos. Vazio = só a lista de baixo.
     - mixes: URLs de mixes, na ordem desejada (aparecem primeiro).
              Serve para destacar sets ou para mixes noutras contas.
     - profile: link "Tudo no Mixcloud". Vazio = "Abrir no Mixcloud"
              (abre o mix atual).
     ---------------------------------------------------------- */
  mixcloud: {
    user: '',
    // ⚠️ MIX DE TESTE (não é da Love Pump) — substituir pelos dela
    mixes: [
      'https://www.mixcloud.com/egpodcast/ege420-pau-grossi/'
    ],
    profile: '',
    limit: 8 // máximo de mixes na lista
  },

  soundcloud: {
    // Só para os links de contacto/rodapé (o perfil não tem faixas públicas)
    profile: 'https://soundcloud.com/liliana-palanca'
  },

  contact: {
    email: 'booking@lovepump.no',
    instagram: 'https://instagram.com/love_pump',
    // Backend do formulário (Formspree, Getform, Basin, API própria…).
    // Recebe um POST em JSON. Se ficar vazio, o formulário abre o app de
    // email do visitante com a mensagem preenchida (fallback mailto).
    // Ex.: 'https://formspree.io/f/xxxxxxx'
    formEndpoint: ''
  },

  /* ----------------------------------------------------------
     GALERIA (15 fotos a flutuar)
     src: URL pública ou caminho local. As URLs externas passam pelo
     wsrv.nl (proxy de imagens grátis) que as reduz na hora — algumas
     originais têm 5–12MB. credit: aparece no visualizador.
     ⚠️ Fotos tiradas de páginas públicas (imprensa/eventos): confirmar
     com a Love Pump que pode usá-las, ou trocar pelas dela.
     ---------------------------------------------------------- */
  gallery: [
    { src: 'v2/img/lovepump-1400.jpg', alt: 'Love Pump at the decks in red and violet light', credit: 'Love Pump' },
    { src: 'https://osloworld.no/assets/6G8A9688-1.jpg', alt: 'Portrait of Love Pump by the water', credit: 'Oslo World' },
    { src: 'https://ucarecdn.com/227d36f6-f862-4d8c-ac63-d678db2f41f1/DJ-Love-Pump_crescat.jpg', alt: 'Love Pump playing a set in front of a LOVE PUMP banner', credit: 'Borealis' },
    { src: 'assets/img/488536422_9898525080226251_730964977974366166_n.jpg', alt: 'Jungelfest poster with Love Pump', credit: 'Jungelfest' },
    { src: 'https://www.kunsthall.no/media/bkh_web_2026_klubbdiaspora_march.jpg', alt: 'Klubb Diaspora poster — MultiTati & Love Pump', credit: 'Bergen Kunsthall' },
    { src: 'assets/img/DJ+Love+Pump.webp', alt: 'Love Pump in a checked outfit and white sunglasses', credit: '' },
    { src: 'https://static.wixstatic.com/media/991482_2c3fd35127ac41a2900501d15da71fb1~mv2.jpg', alt: 'Klubb Diaspora in a record shop', credit: 'Sondre Horvei / Nattjazz' },
    { src: 'assets/img/6G8A0017-50.webp', alt: 'Three women from the Klubb Diaspora crew', credit: '' },
    { src: 'https://api.ekko.no//uploads/photos/events/_optimised/Skjermbilde-2024-09-19-kl.-11.11.56.png', alt: 'Klubb Diaspora poster at Østre', credit: 'Østre' },
    { src: 'assets/img/Vi-gleder-oss-til-a-spille-for-dere-pa-lordagen-Haper-dere-er-klar-billetter-i-bio-@sondreehorvei.avif', alt: 'MultiTati and Love Pump', credit: 'Sondre Horvei' },
    { src: 'https://api.ekko.no//uploads/photos/artists/_optimised/Skjermbilde-2024-09-19-kl.-12.54.39.png', alt: 'Klubb Diaspora portrait', credit: 'Østre' },
    { src: 'https://www.kunsthall.no/media/2019_9_lm_september19_diaspora.jpg', alt: 'Diaspora poster, Landmark 2019', credit: 'Bergen Kunsthall' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Tresor_Nightclub_Berlin_DJ_Beatmatching.jpg', alt: 'DJ hands on a turntable in red light', credit: 'Angie Linder · CC BY-SA 2.0', href: 'https://commons.wikimedia.org/wiki/File:Tresor_Nightclub_Berlin_DJ_Beatmatching.jpg' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Bryggen_Hanseatic_wharf_at_night_Bergen_Norway.jpg', alt: 'Bryggen in Bergen at night', credit: 'Smtunli · CC BY-SA 4.0', href: 'https://commons.wikimedia.org/wiki/File:Bryggen_Hanseatic_wharf_at_night_Bergen_Norway.jpg' },
    { src: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/DJ_booth_with_NI_Traktor_Kontrol_S4_%282015-03-13_17.33.34_by_nikkolodeon_%40pixabay_688549%29.jpg', alt: 'DJ booth with a controller', credit: 'nikkolodeon · CC0', href: 'https://commons.wikimedia.org/wiki/File:DJ_booth_with_NI_Traktor_Kontrol_S4_(2015-03-13_17.33.34_by_nikkolodeon_@pixabay_688549).jpg' }
  ],

  /* ----------------------------------------------------------
     AGENDA
     date: 'AAAA-MM-DD'. Datas passadas vão sozinhas para o arquivo.
     status: '' | 'soldout' | 'free'
     url: bilhetes / página do evento (opcional)

     ⚠️ DATAS DE EXEMPLO — substituir pela agenda real antes de publicar.
     ---------------------------------------------------------- */
  events: [
    { date: '2026-10-17', title: 'Klubb Diaspora', venue: 'Landmark', city: 'Bergen', country: 'NO', url: '', status: '' },
    { date: '2026-10-31', title: 'Hot Hot Hot', venue: 'TBA', city: 'Oslo', country: 'NO', url: '', status: '' },
    { date: '2026-11-21', title: 'Late Night Session', venue: 'Jaeger', city: 'Oslo', country: 'NO', url: '', status: 'soldout' },
    { date: '2026-12-12', title: 'Diaspora Sounds', venue: 'TBA', city: 'København', country: 'DK', url: '', status: '' },
    { date: '2027-03-06', title: 'Borealis', venue: 'Borealis Festival', city: 'Bergen', country: 'NO', url: '', status: '' },

    { date: '2026-08-14', title: 'Øya Festival', venue: 'Tøyenparken', city: 'Oslo', country: 'NO', url: '', status: '' },
    { date: '2026-06-20', title: 'Club Night', venue: 'TBA', city: 'London', country: 'UK', url: '', status: '' },
    { date: '2026-05-09', title: 'Club Night', venue: 'TBA', city: 'Montpellier', country: 'FR', url: '', status: '' }
  ],

  // Palcos / festivais onde já tocou (faixa "Played at")
  stages: ['Øya Festival', 'Borealis', 'Hot Hot Hot', 'Landmark', 'Jaeger', 'London', 'Montpellier', 'København', 'Klubb Diaspora']
};
