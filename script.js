/* ============================================
   ASAC — Assurances et Sécurité
   Magazine Interactions
   ============================================ */

(() => {
  'use strict';

  /* ---------- DATA ---------- */
  const CATEGORIES = [
    {
      id: 'editorial',
      name: { fr: 'Éditorial', en: 'Editorial' },
      image: 'https://images.unsplash.com/photo-1542178243-bc20204b769f?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'edito-1', title: { fr: "La sentinelle et l'architecte", en: "The sentinel and the architect" } },
        { id: 'edito-2', title: { fr: "On ne pilote pas une compagnie avec une calculatrice", en: "You don't run a company with a calculator" } },
      ],
    },
    {
      id: 'actualite',
      name: { fr: 'Actualité', en: 'News' },
      image: 'https://images.unsplash.com/photo-1507152832244-10d45c7eda7d?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'actualite-0', title: { fr: "CIMA : Les nouvelles directives pour 2025", en: "CIMA: New 2025 guidelines" } },
        { id: 'actualite-1', title: { fr: "L'assurance santé en pleine mutation", en: "Health insurance is transforming" } },
        { id: 'actualite-2', title: { fr: "Réformes majeures du secteur", en: "Major reforms in the sector" } },
      ],
    },
    {
      id: 'evenement',
      name: { fr: 'Évènement', en: 'Event' },
      image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'evt-1', title: { fr: "Journée Africaine de l'Assurance 2025", en: "African Insurance Day 2025" } },
        { id: 'evt-2', title: { fr: "Forum National des Assureurs : retour sur l'édition 2024", en: "National Insurers Forum: 2024 recap" } },
      ],
    },
    {
      id: 'focus',
      name: { fr: 'Focus', en: 'Focus' },
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'focus-0', title: { fr: "La dématérialisation de l'assurance automobile au Cameroun : un tournant majeur pour l'expérience client", en: "The dematerialization of motor insurance in Cameroon: a major turning point for the customer experience" } },
        { id: 'focus-1', title: { fr: "L'assurance agricole face aux défis climatiques", en: "Agricultural insurance and climate challenges" } },
      ],
    },
    {
      id: 'vie-asac',
      name: { fr: "Vie de l'ASAC", en: "ASAC Life" },
      image: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'vie-1', title: { fr: "Assemblée Générale 2025 : les temps forts", en: "2025 General Assembly: highlights" } },
        { id: 'vie-2', title: { fr: "Nos commissions à l'œuvre", en: "Our commissions at work" } },
      ],
    },
    {
      id: 'cabouge',
      name: { fr: 'Ça bouge !', en: 'Moving forward!' },
      image: 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'cabouge-0', title: { fr: "Innovation : la digitalisation accélère le secteur", en: "Innovation: digital is reshaping the sector" } },
        { id: 'cabouge-1', title: { fr: "Insurtech : les startups qui transforment le marché", en: "Insurtech: startups changing the market" } },
      ],
    },
    {
      id: 'avis',
      name: { fr: 'Votre avis compte', en: 'Your voice matters' },
      image: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'avis-1', title: { fr: "Sondage : la perception de l'assurance au Cameroun", en: "Survey: the perception of insurance in Cameroon" } },
        { id: 'avis-2', title: { fr: "Témoignages d'assurés", en: "Policyholder stories" } },
      ],
    },
    {
      id: 'metiers',
      name: { fr: "Les métiers de l'assurance", en: "Insurance careers" },
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'metiers-1', title: { fr: "Le Responsable Technique : on sort enfin de l'ombre", en: "The Technical Manager: finally stepping out of the shadows" } },
        { id: 'metiers-2', title: { fr: "Devenir souscripteur : parcours et compétences", en: "Becoming an underwriter: paths and skills" } },
      ],
    },
    {
      id: 'emploi',
      name: { fr: 'Emploi', en: 'Careers' },
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'emploi-0', title: { fr: "Les nouveaux visages de l'assurance camerounaise", en: "The new faces of Cameroonian insurance" } },
        { id: 'emploi-1', title: { fr: "Recrutement : les compétences les plus recherchées", en: "Hiring: the most sought-after skills" } },
      ],
    },
    {
      id: 'fun',
      name: { fr: 'Instant fun / Jeu', en: 'Fun & Games' },
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'fun-1', title: { fr: "Le grand quiz de l'assurance", en: "The big insurance quiz" } },
        { id: 'fun-2', title: { fr: "Mots croisés : à vos crayons !", en: "Crossword: grab your pencils!" } },
      ],
    },
    {
      id: 'membres',
      name: { fr: "Membres de l'ASAC", en: "ASAC Members" },
      image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=1600&q=85&auto=format&fit=crop',
      articles: [
        { id: 'membres-1', title: { fr: "Annuaire des sociétés membres", en: "Directory of member companies" } },
        { id: 'membres-2', title: { fr: "Les nouveaux membres de l'année", en: "This year's new members" } },
      ],
    },
  ];

  // Article bodies (a few are filled out; others use a generic template)
  const ARTICLE_BODIES = {
    'focus-0': {
      author: { fr: 'NKEN Martin Olivier', en: 'NKEN Martin Olivier' },
      role: {
        fr: "Expert en Relation Client et centres — Responsable Centre Relation Client chez SUNU Assurances Cameroun",
        en: "Customer Relations & Contact Centres Expert — Head of Customer Relations Centre at SUNU Assurances Cameroon",
      },
      lead: {
        fr: "Le secteur de l'assurance automobile au Cameroun entre progressivement dans une nouvelle ère marquée par la digitalisation des services et la modernisation de la relation client. Longtemps confronté à des problématiques telles que les longues procédures administratives, les déplacements en agence, les délais de traitement ou encore la fraude documentaire, le marché camerounais amorce aujourd'hui une transformation qui place davantage le client au centre des préoccupations.",
        en: "Cameroon's motor insurance sector is gradually entering a new era marked by the digitalization of services and the modernization of customer relations. Long faced with issues such as lengthy administrative procedures, branch visits, processing delays and document fraud, the Cameroonian market is now embarking on a transformation that places the customer at the heart of its priorities.",
      },
      paragraphs: {
        fr: [
          "L'objectif principal de cette dématérialisation est de simplifier l'expérience des assurés. Grâce aux outils numériques, certaines opérations comme la souscription, le renouvellement des contrats, la transmission des documents ou les paiements peuvent désormais être réalisées plus rapidement et avec moins de contraintes. Pour les clients, cela représente un gain de temps considérable, une meilleure accessibilité des services et une relation plus fluide avec leur compagnie d'assurance.",
          "Cette transformation répond également à un enjeu majeur de confiance. Au Cameroun, la circulation de fausses attestations d'assurance automobile a longtemps fragilisé la crédibilité du secteur. La digitalisation permet ainsi d'améliorer la traçabilité des contrats et de renforcer les dispositifs de contrôle afin de sécuriser davantage les assurés.",
          "L'expérience ivoirienne constitue d'ailleurs un exemple intéressant pour le marché camerounais. En Côte d'Ivoire, plusieurs avancées ont été réalisées dans la digitalisation de l'assurance automobile, notamment avec la mise en place de solutions numériques facilitant la vérification des contrats et la réduction des fraudes. Cette modernisation a permis d'améliorer la fluidité des services tout en renforçant la confiance des clients envers les assureurs.",
        ],
        en: [
          "The main goal of this dematerialization is to simplify the policyholder experience. Thanks to digital tools, operations such as subscribing to a policy, renewing contracts, transmitting documents or making payments can now be carried out faster and with fewer constraints. For customers, this means significant time savings, better access to services and a smoother relationship with their insurer.",
          "This transformation also addresses a major trust issue. In Cameroon, the circulation of fake motor insurance certificates has long undermined the sector's credibility. Digitalization makes it possible to improve contract traceability and strengthen control mechanisms in order to better protect policyholders.",
          "The Ivorian experience offers a compelling example for the Cameroonian market. In Côte d'Ivoire, several advances have been made in the digitalization of motor insurance, including digital solutions that ease contract verification and reduce fraud. This modernization has improved the fluidity of services while strengthening customer trust in insurers.",
        ],
      },
      sections: {
        fr: [
          { h: "Accompagner sans exclure", p: "Cependant, la réussite d'une telle transformation ne dépend pas uniquement de la technologie. Elle nécessite également un important travail d'accompagnement des clients. Tous les assurés ne maîtrisent pas forcément les outils numériques, et certains peuvent éprouver des difficultés face à des procédures entièrement digitalisées. Le risque serait alors de créer une nouvelle forme de frustration ou d'exclusion pour une partie de la clientèle." },
          { h: "Le digital au service de l'humain", p: "Par ailleurs, dans le domaine des assurances, le besoin de proximité humaine reste essentiel. Même à l'ère du digital, les clients souhaitent continuer à être conseillés, rassurés et accompagnés, notamment dans des situations sensibles comme les sinistres ou les réclamations. La digitalisation ne doit donc pas remplacer la relation humaine, mais plutôt la renforcer en rendant les échanges plus simples et plus efficaces." },
          { h: "Une opportunité durable", p: "La dématérialisation de l'assurance automobile représente ainsi une véritable opportunité pour améliorer durablement l'expérience client au Cameroun. Elle contribuera à moderniser l'image du secteur, renforcer la confiance des consommateurs et rapprocher davantage les compagnies d'assurances de leurs clients." },
        ],
        en: [
          { h: "Supporting without excluding", p: "However, the success of such a transformation does not depend on technology alone. It also requires substantial work to support customers. Not all policyholders are comfortable with digital tools, and some may struggle with fully digital procedures. The risk would be to create a new form of frustration or exclusion for part of the customer base." },
          { h: "Digital in service of the human", p: "Moreover, in insurance, the need for human proximity remains essential. Even in a digital era, customers want to continue being advised, reassured and supported, particularly in sensitive situations such as claims or complaints. Digitalization should therefore not replace the human relationship, but rather reinforce it by making exchanges simpler and more effective." },
          { h: "A lasting opportunity", p: "The dematerialization of motor insurance thus represents a genuine opportunity to sustainably improve the customer experience in Cameroon. It will help modernize the sector's image, strengthen consumer trust and bring insurance companies closer to their customers." },
        ],
      },
      sources: [
        { label: "ASAC Cameroun", url: "https://www.asac-cameroun.org" },
        { label: "Financial Afrik — Digitalisation des assurances en Afrique", url: "https://www.financialafrik.com/2018/02/26/cameroun-les-assureurs-plaident-pour-une-digitalisation-du-secteur/" },
        { label: "Atlas Magazine — Assurance automobile en zone CIMA", url: "https://www.atlas-mag.net" },
      ],
      image: 'https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1600&q=85&auto=format&fit=crop',
    },

    'metiers-1': {
      author: { fr: 'Mispa MBONDI', en: 'Mispa MBONDI' },
      role: {
        fr: "Responsable Technique",
        en: "Technical Manager",
      },
      lead: {
        fr: "On a longtemps été vus comme les « solitaires des chiffres », ceux qui vivent dans des classeurs Excel avec la clim à fond. Mais aujourd'hui, avec le climat qui s'emballe et l'économie qui joue aux montagnes russes, on est devenus ceux qui tiennent le volant. On ne se contente plus de calculer le risque, on essaie de lui donner un sens pour que la boîte sache où elle va.",
        en: "We've long been seen as the \"loners of numbers,\" the ones who live in Excel spreadsheets with the AC on full blast. But today, with a climate going wild and an economy on a rollercoaster, we've become the ones holding the wheel. We no longer just calculate risk — we try to give it meaning so the company knows where it's going.",
      },
      paragraphs: {
        fr: [],
        en: [],
      },
      sections: {
        fr: [
          { h: "Le grand écart de tous les jours", p: "Faire de la Vie et du Dommages en même temps, c'est un peu comme être sprinteur et marathonien dans la même journée. En Dommages (Auto, Habitation), c'est l'adrénaline. On est dans le concret, l'immédiat. Pourquoi les accidents augmentent sur telle zone ? Comment rester juste dans nos prix sans perdre tout le monde ? C'est une question de réflexes et d'instinct. En Vie, on s'inscrit dans le temps long. On signe des contrats pour les trente prochaines années. C'est une responsabilité immense : s'assurer qu'on pourra honorer nos promesses dans une génération, quoi qu'il arrive." },
          { h: "Parler le même langage que les autres", p: "C'est peut-être le plus gros changement : on n'est plus les « rabat-joie » qui disent non aux commerciaux. On est devenus des partenaires. Notre défi, c'est de réussir à expliquer des trucs super compliqués avec des mots simples. Convaincre qu'être rigoureux sur les chiffres, ce n'est pas être méchant, c'est juste s'assurer que le client sera vraiment protégé le jour où il en aura besoin." },
          { h: "Au fond, c'est une question de convictions", p: "On ne fait pas ce métier par amour des probabilités. On le fait parce qu'en équilibrant un contrat, on protège une famille qui vient de tout perdre ou un jeune qui prépare son avenir. C'est un métier de rigueur, c'est vrai, mais c'est surtout un métier d'engagement. On est les gardiens d'une certaine tranquillité d'esprit." },
        ],
        en: [
          { h: "The daily balancing act", p: "Working in both Life and Non-Life at the same time is a bit like being a sprinter and a marathon runner in the same day. In Non-Life (Motor, Home), it's adrenaline. We deal with the concrete and the immediate. Why are accidents rising in this zone? How do we stay fair on pricing without losing everyone? It's a matter of reflexes and instinct. In Life, we operate on the long horizon. We sign contracts for the next thirty years. It's an immense responsibility: making sure we can keep our promises a generation from now, whatever happens." },
          { h: "Speaking the same language as the rest", p: "This may be the biggest shift: we're no longer the \"killjoys\" who say no to the sales team. We've become partners. Our challenge is explaining hugely complex things in simple words. Convincing people that being rigorous on numbers isn't being mean — it's just making sure the client will be genuinely protected the day they need it." },
          { h: "Ultimately, it's about conviction", p: "We don't do this job out of love for probabilities. We do it because by balancing a contract, we protect a family that has just lost everything, or a young person building their future. It's a job of rigour, true — but above all it's a job of commitment. We are the guardians of a certain peace of mind." },
        ],
      },
      pullQuote: {
        fr: "On ne se contente plus de calculer le risque : on lui donne un sens.",
        en: "We no longer just calculate risk — we give it meaning.",
      },
      image: 'https://images.unsplash.com/photo-1573497019418-b400bb3ab074?w=1600&q=85&auto=format&fit=crop',
    },

    'edito-1': {
      author: { fr: 'Mispa MBONDI', en: 'Mispa MBONDI' },
      role: { fr: 'Éditorial — Le Responsable Technique', en: 'Editorial — The Technical Manager' },
      lead: {
        fr: "On imagine souvent le Responsable Technique comme l'homme ou la femme des chiffres, enfermé dans une forteresse de statistiques et de probabilités. Un gardien du temple, garant d'une rigueur froide et nécessaire. Mais si l'on regarde de plus près, la réalité du terrain raconte une tout autre histoire.",
        en: "The Technical Manager is often pictured as a person of numbers, locked inside a fortress of statistics and probabilities. A keeper of the temple, the guarantor of a cold, necessary rigour. But look closer, and the reality on the ground tells a very different story.",
      },
      paragraphs: {
        fr: [
          "Dans un monde où l'imprévisible est devenu la norme — entre caprices climatiques, mutations technologiques et soubresauts économiques — le Responsable Technique est bien plus qu'un analyste. Il est une boussole.",
          "Qu'il s'agisse de l'assurance Dommages, où il faut réagir avec l'agilité d'un pilote face à l'urgence d'un sinistre, ou de l'assurance Vie, où il faut cultiver la patience d'un bâtisseur de cathédrales pour garantir les promesses de demain, sa mission est fondamentalement humaine. Pourquoi ? Parce que derrière chaque ligne de provisionnement, derrière chaque ajustement tarifaire, il y a une famille que l'on protège, une entreprise que l'on sauve ou une retraite que l'on sécurise.",
        ],
        en: [
          "In a world where the unpredictable has become the norm — between climate volatility, technological shifts and economic tremors — the Technical Manager is far more than an analyst. They are a compass.",
          "Whether in non-life insurance, where one must react with a pilot's agility to the urgency of a claim, or in life insurance, where one must cultivate the patience of a cathedral builder to guarantee tomorrow's promises, the role is fundamentally human. Why? Because behind every provisioning line, behind every pricing adjustment, there is a family being protected, a business being saved, or a retirement being secured.",
        ],
      },
      sections: {
        fr: [
          { h: "Lever le voile sur un métier pivot", p: "Dans ce dossier, nous avons voulu lever le voile sur ce métier pivot, souvent méconnu. Vous découvrirez comment, à l'heure de l'intelligence artificielle et du déluge de données, le Responsable Technique réinvente son rôle. Non plus seulement pour calculer le risque, mais pour lui donner du sens." },
          { h: "Entre intuition et équations", p: "Bienvenue dans les coulisses d'un métier où la technique n'est que l'outil, et la protection, la véritable destination." },
        ],
        en: [
          { h: "Lifting the veil on a pivotal role", p: "In this feature, we wanted to lift the veil on this pivotal, often underappreciated role. You'll discover how, in the age of artificial intelligence and a deluge of data, the Technical Manager is reinventing what they do — no longer just to calculate risk, but to give it meaning." },
          { h: "Between intuition and equations", p: "Welcome behind the scenes of a profession where technique is merely the tool, and protection is the true destination." },
        ],
      },
      pullQuote: {
        fr: "Le Responsable Technique n'est plus seulement un analyste. Il est une boussole.",
        en: "The Technical Manager is no longer just an analyst. They are a compass.",
      },
      image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=85&auto=format&fit=crop',
    },

    'edito-2': {
      author: { fr: 'Mispa MBONDI', en: 'Mispa MBONDI' },
      role: { fr: 'Éditorial — Le métier au-delà des chiffres', en: 'Editorial — The job beyond the numbers' },
      lead: {
        fr: "Si vous dites à un dîner que vous êtes Responsable Technique en assurance, il y a de fortes chances que votre interlocuteur change de sujet. On nous imagine souvent comme des « machines à calculer », perdus dans des fichiers Excel interminables, déconnectés de la vraie vie. Pourtant, la réalité de notre métier, c'est tout le contraire.",
        en: "Tell someone at a dinner that you're a Technical Manager in insurance and there's a good chance the conversation will move on. We're often imagined as \"calculating machines,\" lost in endless Excel files, disconnected from real life. The reality of our work is the exact opposite.",
      },
      paragraphs: {
        fr: [
          "Être Responsable Technique aujourd'hui, c'est avoir le cœur qui bat un peu plus vite quand l'orage gronde, parce qu'on sait ce que ça signifie pour nos assurés et pour nos équilibres en Dommages. C'est aussi avoir la tête froide quand les taux s'affolent, pour s'assurer que les économies d'une vie entière sont à l'abri en Assurance Vie.",
          "On ne fait pas que des mathématiques. On fait des choix. C'est un métier de doute, de discussions passionnées avec les commerciaux, et de décisions parfois solitaires. On est ceux qui doivent dire « attention » quand tout le monde veut accélérer, mais aussi ceux qui cherchent des solutions pour que l'assurance reste accessible, même quand le monde devient imprévisible.",
        ],
        en: [
          "Being a Technical Manager today means your heart beats a little faster when a storm rolls in, because you know what it means for your policyholders and for non-life balance sheets. It also means keeping a cool head when interest rates lurch around, to make sure a lifetime of savings stays safe on the life side.",
          "We don't just do maths. We make choices. It's a job of doubt, of impassioned discussions with sales teams, and sometimes of lonely decisions. We're the ones who have to say \"careful\" when everyone wants to accelerate — but also the ones searching for solutions so that insurance stays accessible, even when the world becomes unpredictable.",
        ],
      },
      sections: {
        fr: [
          { h: "L'IA et la data, des outils — pas des substituts", p: "L'IA et la data ? Ce sont de super outils, certes. Mais ils ne remplaceront jamais notre flair, notre expérience et cette petite voix qui nous dit qu'un chiffre ne raconte pas toute l'histoire." },
          { h: "Hommage à un métier de l'ombre", p: "Dans ce numéro, on a voulu rendre hommage à ce métier de l'ombre. Un métier qui demande de la rigueur, bien sûr, mais surtout beaucoup d'empathie et de bon sens. Parce qu'au final, derrière nos algorithmes, il n'y a rien de plus humain que la volonté de protéger les autres." },
        ],
        en: [
          { h: "AI and data — tools, not substitutes", p: "AI and data? Sure, they're great tools. But they will never replace our instinct, our experience and that little voice telling us a number doesn't tell the whole story." },
          { h: "A tribute to a job lived in the shadows", p: "In this issue, we wanted to pay tribute to this job lived in the shadows. A job that demands rigour, of course, but above all empathy and common sense. Because in the end, behind our algorithms, there is nothing more human than the will to protect others." },
        ],
      },
      pullQuote: {
        fr: "On ne fait pas que des mathématiques. On fait des choix.",
        en: "We don't just do maths. We make choices.",
      },
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1600&q=85&auto=format&fit=crop',
    },
  };

  /* ---------- STATE ---------- */
  const state = {
    lang: 'fr',
    panelIndex: 0,
    isMenuOpen: false,
    isCategoryOpen: false,
    currentCategoryId: null,
  };

  /* ---------- SCROLL LOCK (robust: html + body, restores Y on unlock) ---------- */
  let lockCount = 0;
  let savedScrollY = 0;
  function lockScroll() {
    if (lockCount === 0) {
      savedScrollY = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = `-${savedScrollY}px`;
      document.documentElement.classList.add('no-scroll');
      document.body.classList.add('no-scroll');
    }
    lockCount++;
  }
  function unlockScroll() {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) {
      document.documentElement.classList.remove('no-scroll');
      document.body.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, savedScrollY);
    }
  }

  /* ---------- I18N ---------- */
  const I18N = {
    fr: {
      menuLabel: 'Sommaire',
      heroSub: "Le Magazine de l'Association des Sociétés d'Assurance du Cameroun",
      issueMonth: 'Juin 2026',
      scroll: 'Faites défiler',
      readMore: "Lire l'article",
      editionLabel: 'Édition',
      allRights: 'Tous droits réservés',
      exploreAll: 'Explorer tous les articles',
      contributors: 'Ont collaboré',
      by: 'Par',
      sourcesLabel: 'Sources',
      downloadIssue: "Télécharger le magazine en PDF",
      downloadIssueShort: "Télécharger l'édition",
      preparingPdf: "Préparation du PDF…",
      readTime: 'min de lecture',
      contentsTitle: 'Sommaire',
      issuePrefix: 'Édition',
      backToMenu: 'Retour au sommaire',
      mastheadTitle: 'Équipe du Journal',
    },
    en: {
      menuLabel: 'Contents',
      heroSub: "The Magazine of the Association of Insurance Companies of Cameroon",
      issueMonth: 'June 2026',
      scroll: 'Scroll',
      readMore: 'Read article',
      editionLabel: 'Issue',
      allRights: 'All rights reserved',
      exploreAll: 'Explore all articles',
      contributors: 'Also contributed',
      by: 'By',
      sourcesLabel: 'Sources',
      downloadIssue: 'Download the magazine as PDF',
      downloadIssueShort: 'Download issue',
      preparingPdf: 'Preparing the PDF…',
      readTime: 'min read',
      contentsTitle: 'Contents',
      issuePrefix: 'Issue',
      backToMenu: 'Back to contents',
      mastheadTitle: 'Editorial Team',
    },
  };

  function applyLang() {
    document.documentElement.setAttribute('lang', state.lang);
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const k = el.getAttribute('data-i18n');
      if (I18N[state.lang][k]) el.textContent = I18N[state.lang][k];
    });
    // Update language buttons state
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.lang === state.lang);
    });

    // Re-render category cards & list if needed
    renderMenuGrid();
    syncHomePanelText();
    if (state.isCategoryOpen) {
      const curr = document.getElementById('category').dataset.current;
      if (curr) openCategory(curr, true);
    }
  }

  // Update the hardcoded panel category labels + article titles on the home page
  // whenever the language flips. Works against either baked or CMS-hydrated CATEGORIES.
  function syncHomePanelText() {
    document.querySelectorAll('.panel__content--feature').forEach((el) => {
      const artId = el.dataset.article;
      if (!artId) return;
      const cat = CATEGORIES.find((c) => c.articles.some((a) => a.id === artId));
      if (!cat) return;
      const article = cat.articles.find((a) => a.id === artId);
      const catEl = el.querySelector('.panel__cat');
      const titleEl = el.querySelector('.panel__title');
      if (catEl && cat.name && cat.name[state.lang]) catEl.textContent = cat.name[state.lang];
      if (titleEl && article && article.title && article.title[state.lang]) {
        titleEl.textContent = article.title[state.lang];
      }
    });
  }

  /* ---------- LOADER ---------- */
  function hideLoader() {
    const l = document.getElementById('loader');
    if (!l) return;
    setTimeout(() => { if (l) l.classList.add('is-hidden'); }, 1400);
    setTimeout(() => { if (l && l.parentNode) l.remove(); }, 2200);
  }

  /* ---------- CUSTOM CURSOR ---------- */
  function initCursor() {
    const c = document.getElementById('cursor');
    const d = document.getElementById('cursorDot');
    if (!c || !d) return;

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    let dx = mx, dy = my;

    document.addEventListener('mousemove', (e) => {
      mx = e.clientX;
      my = e.clientY;
      document.body.classList.add('cursor-ready');
    }, { passive: true });

    function tick() {
      cx += (mx - cx) * 0.15;
      cy += (my - cy) * 0.15;
      dx += (mx - dx) * 0.5;
      dy += (my - dy) * 0.5;
      c.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      d.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    }
    tick();

    // hover state for interactive elements
    const hoverSel = 'a, button, .panel__content--feature, .menu__card, .category__item';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(hoverSel)) c.classList.add('is-hover');
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(hoverSel)) c.classList.remove('is-hover');
    });
  }

  /* ---------- STACKED SCROLL PANELS ---------- */
  const panels = Array.from(document.querySelectorAll('.panel'));

  function setupHomeHeight() {
    // Total scrollable height = panels.length * 100vh (one extra to scroll past the last)
    const vh = window.innerHeight;
    // Each subsequent panel needs one viewport of scroll to fully come up
    const totalScroll = (panels.length) * vh;
    document.body.style.height = `${totalScroll}px`;

    // Set z-index so later panels stack on top
    panels.forEach((p, i) => {
      p.style.zIndex = String(i + 1);
    });
  }

  function easeInOutCubic(t) {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  let lastScroll = -1;
  function updatePanels() {
    if (state.isMenuOpen || state.isCategoryOpen) return;
    const scrollY = window.scrollY;
    if (scrollY === lastScroll) return;
    lastScroll = scrollY;
    const vh = window.innerHeight;

    panels.forEach((panel, i) => {
      if (i === 0) {
        // Hero stays. Small parallax: slight scale + dim as next panel covers
        const next = Math.min(1, Math.max(0, scrollY / vh));
        panel.style.transform = `translate3d(0, ${-next * 8}%, 0)`;
        return;
      }
      const start = (i - 1) * vh;
      const end = i * vh;
      let p = (scrollY - start) / (end - start);
      p = Math.max(0, Math.min(1, p));
      const eased = easeInOutCubic(p);
      const ty = (1 - eased) * 100; // 100 -> 0
      panel.style.transform = `translate3d(0, ${ty}%, 0)`;
      // Promote to a compositor layer only while mid-transition (0 < p < 1).
      // Idle panels (fully covered or fully hidden) release their GPU layer.
      const animating = p > 0 && p < 1;
      if (animating) {
        if (!panel.classList.contains('is-animating')) panel.classList.add('is-animating');
      } else if (panel.classList.contains('is-animating')) {
        panel.classList.remove('is-animating');
      }
    });

    // Determine active panel index for nav state, scroll progress, etc.
    const idx = Math.min(panels.length - 1, Math.floor(scrollY / vh + 0.5));
    if (idx !== state.panelIndex) {
      state.panelIndex = idx;
    }
  }

  let scrollRafPending = false;
  let lastScrollY = -1;
  function onScroll() {
    if (scrollRafPending) return;
    scrollRafPending = true;
    requestAnimationFrame(() => {
      scrollRafPending = false;
      const y = window.scrollY;
      // Skip work when the scroll position hasn't changed (covers iOS rubber-band)
      if (y === lastScrollY) return;
      lastScrollY = y;
      updatePanels();
    });
  }

  function onResize() {
    setupHomeHeight();
    updatePanels();
  }

  /* ---------- MENU ---------- */
  function renderMenuGrid() {
    const grid = document.getElementById('menuGrid');
    if (!grid) return;
    grid.innerHTML = CATEGORIES.map((cat, i) => {
      const articles = cat.articles
        .map((a) => `<li>${escapeHtml(a.title[state.lang])}</li>`)
        .join('');
      return `
        <div class="menu__card" data-cat="${cat.id}" style="transition-delay:${0.2 + i * 0.05}s">
          <div class="menu__card-bg" style="background-image:url('${cat.image}')"></div>
          <div class="menu__card-overlay"></div>
          <div class="menu__card-arrow">
            <img class="arrow-red" src="assets/arrow_red.svg" alt="" />
            <img class="arrow-white" src="assets/arrow_white.svg" alt="" />
          </div>
          <div class="menu__card-content">
            <span class="menu__card-cat">${escapeHtml(cat.name[state.lang])}</span>
            <ul class="menu__card-articles">${articles}</ul>
          </div>
        </div>
      `;
    }).join('');

    grid.querySelectorAll('.menu__card').forEach((card) => {
      card.addEventListener('click', () => {
        const id = card.dataset.cat;
        openCategory(id);
      });
    });
  }

  let menuScrollHandler = null;
  function applyMenuFrost(menu, nav) {
    const y = menu.scrollTop || 0;
    const p = Math.max(0, Math.min(1, y / 200));
    nav.style.setProperty('--frost-p', String(p));
    nav.classList.toggle('is-frost-on', p > 0.02);
  }

  function openMenu() {
    state.isMenuOpen = true;
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.classList.add('is-open');
    nav.classList.add('is-dark', 'nav--frostable');
    lockScroll();
    menu.scrollTop = 0;
    // Frost on scroll inside the menu overlay
    menuScrollHandler = () => applyMenuFrost(menu, nav);
    menu.addEventListener('scroll', menuScrollHandler, { passive: true });
    applyMenuFrost(menu, nav);
  }

  function closeMenu() {
    state.isMenuOpen = false;
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.classList.remove('is-open');
    nav.classList.remove('is-dark', 'nav--frostable', 'is-frost-on');
    nav.style.removeProperty('--frost-p');
    if (menuScrollHandler) { menu.removeEventListener('scroll', menuScrollHandler); menuScrollHandler = null; }
    unlockScroll();
  }

  function toggleMenu() {
    if (state.isMenuOpen) closeMenu(); else openMenu();
  }

  /* ---------- CATEGORY (LIST) ---------- */
  function openCategory(id, isRefresh = false) {
    const cat = CATEGORIES.find((c) => c.id === id);
    if (!cat) return;
    const overlay = document.getElementById('category');
    const list = document.getElementById('categoryList');
    const label = document.getElementById('categoryLabel');
    overlay.dataset.current = id;
    label.textContent = cat.name[state.lang];

    list.innerHTML = cat.articles.map((a, i) => `
      <a class="category__item" data-art="${a.id}" data-cat="${cat.id}" style="transition-delay:${0.1 + i * 0.08}s">
        <div class="category__item-img" style="background-image:url('${cat.image}')"></div>
        <div class="category__item-overlay"></div>
        <div class="category__item-content">
          <h3 class="category__item-title">${escapeHtml(a.title[state.lang])}</h3>
          <div class="category__item-meta">
            <span>${state.lang === 'fr' ? "Lire l'article" : 'Read article'}</span>
            <i class="category__item-meta-arrow"></i>
          </div>
        </div>
      </a>
    `).join('');

    list.querySelectorAll('.category__item').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToArticle(el.dataset.art, el.dataset.cat);
      });
    });

    state.isCategoryOpen = true;
    state.currentCategoryId = id;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    lockScroll();
    overlay.scrollTop = 0;
  }

  function closeCategory() {
    state.isCategoryOpen = false;
    const overlay = document.getElementById('category');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (!state.isMenuOpen) unlockScroll();
  }

  /* ---------- ARTICLE NAVIGATION (real page, no modal) ---------- */
  function navigateToArticle(articleId, categoryId) {
    // Persist last menu state so back from article reopens it
    try {
      sessionStorage.setItem('asac:returnTo', JSON.stringify({
        menu: state.isMenuOpen, category: state.isCategoryOpen ? state.currentCategoryId : null,
      }));
    } catch (e) {}
    window.location.href = `article.html?id=${encodeURIComponent(articleId)}&cat=${encodeURIComponent(categoryId)}`;
  }

  function makeGenericBody(article, cat) {
    const titleFr = article.title.fr;
    const titleEn = article.title.en;
    return {
      lead: {
        fr: `Plongée dans l'univers de l'assurance camerounaise à travers le prisme de cet article: "${titleFr}". Une lecture éclairante pour comprendre les évolutions actuelles du secteur.`,
        en: `An immersion in the world of Cameroonian insurance through this article: "${titleEn}". An illuminating read to understand the sector's current evolutions.`,
      },
      paragraphs: {
        fr: [
          "Le paysage de l'assurance au Cameroun connaît actuellement de profondes mutations. Entre exigences réglementaires renforcées, attentes nouvelles des consommateurs et émergence de technologies disruptives, le secteur se transforme à grande vitesse. Les acteurs historiques composent avec ces nouvelles donnes pour maintenir leur position tout en explorant de nouveaux territoires.",
          "Cette dynamique se traduit notamment par une digitalisation accélérée des processus. Les contrats peuvent désormais être souscrits en ligne, les sinistres déclarés via une application mobile, les indemnisations versées par mobile money. Cette modernisation n'est pas qu'esthétique : elle répond à une demande forte d'une clientèle de plus en plus connectée.",
          "Au-delà des outils, c'est toute la chaîne de valeur qui se réinvente. De nouveaux profils de talents intègrent le secteur — data scientists, designers, experts UX — apportant avec eux une culture du produit centrée sur l'utilisateur. Cette transformation, bien que progressive, redessine durablement les contours d'un marché en pleine effervescence.",
        ],
        en: [
          "Cameroon's insurance landscape is undergoing profound changes. Between strengthened regulatory requirements, new consumer expectations and the emergence of disruptive technologies, the sector is transforming rapidly. Historic players are dealing with these new realities to maintain their position while exploring new territories.",
          "This momentum is reflected in the accelerated digitalization of processes. Contracts can now be subscribed online, claims declared via mobile applications, payouts made through mobile money. This modernization is not just cosmetic: it responds to a strong demand from an increasingly connected clientele.",
          "Beyond tools, the entire value chain is reinventing itself. New talent profiles are joining the sector — data scientists, designers, UX experts — bringing with them a user-centered product culture. This transformation, though gradual, is reshaping the contours of a market in full effervescence.",
        ],
      },
      sections: {
        fr: [
          { h: "Un secteur en transformation", p: "Les chiffres parlent d'eux-mêmes. La pénétration de l'assurance progresse, lentement mais sûrement, portée par des produits mieux adaptés aux réalités du terrain et une meilleure éducation financière des consommateurs. Les compagnies les plus innovantes s'emparent de ce momentum pour conquérir de nouveaux segments de marché." },
          { h: "Les perspectives à venir", p: "Les prochaines années s'annoncent décisives. Avec l'intégration progressive de l'intelligence artificielle dans la tarification et la gestion des sinistres, mais aussi l'arrivée de nouveaux entrants — notamment des fintechs et insurtechs — le marché camerounais devrait continuer à se réinventer pour répondre aux défis du 21e siècle." },
        ],
        en: [
          { h: "A sector in transformation", p: "The numbers speak for themselves. Insurance penetration is progressing, slowly but surely, driven by products better adapted to ground realities and improved financial education of consumers. The most innovative companies are seizing this momentum to conquer new market segments." },
          { h: "What lies ahead", p: "The coming years will be decisive. With the progressive integration of artificial intelligence in pricing and claims management, as well as the arrival of new entrants — notably fintechs and insurtechs — the Cameroonian market should continue to reinvent itself to meet 21st century challenges." },
        ],
      },
      image: cat.image,
    };
  }

  /* ---------- HELPERS ---------- */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
  function escapeAttr(str) { return escapeHtml(str); }

  /* ---------- EVENT WIRING ---------- */
  function bindEvents() {
    // Language switching
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        if (state.lang === btn.dataset.lang) return;
        state.lang = btn.dataset.lang;
        applyLang();
        const page = document.body.dataset.page || 'home';
        if (page === 'home') {
          renderMenuGrid();
          // Re-hydrate translated titles + cover images in background
          hydrateFromCms().then((didHydrate) => {
            if (didHydrate) { renderMenuGrid(); syncHomePanelImages(); syncHomePanelText(); }
          }).catch(() => {});
        } else if (page === 'article') {
          renderArticlePage();
        }
      });
    });

    // Menu button (home page only)
    const menuBtn = document.getElementById('menuBtn');
    if (menuBtn) menuBtn.addEventListener('click', toggleMenu);

    // Nav close (article page only) -> go back
    const navClose = document.getElementById('navClose');
    if (navClose) {
      navClose.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.history.length > 1) window.history.back();
        else window.location.href = '/';
      });
    }

    // Logo - go home
    document.querySelectorAll('[data-action="home"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeCategory();
        closeMenu();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    });

    // Footer "explore all" -> open menu
    document.querySelectorAll('[data-action="menu"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        openMenu();
      });
    });

    // Download magazine action (home footer + menu footer)
    document.querySelectorAll('[data-action="download"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        generateMagazinePdf(el);
      });
    });

    // Home featured panels click -> navigate to article page
    document.querySelectorAll('.panel__content--feature').forEach((el) => {
      el.addEventListener('click', () => {
        const artId = el.dataset.article;
        const cat = CATEGORIES.find((c) => c.articles.some((a) => a.id === artId));
        if (cat) navigateToArticle(artId, cat.id);
      });
    });

    // Category close
    const categoryClose = document.getElementById('categoryClose');
    if (categoryClose) categoryClose.addEventListener('click', closeCategory);

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.isCategoryOpen) return closeCategory();
        if (state.isMenuOpen) return closeMenu();
      }
    });

    // Scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  /* ---------- PDF GENERATION ----------
     Builds the whole magazine as a PDF, page by page:
       Page 1: cover (no buttons) — issue badge, title, subtitle, edition
       Page 2: contents — every category + its article titles
       Pages 3+: each article styled like the site (cat label, title, byline, lead, body, sections, sources)
     Uses jsPDF (loaded via CDN in index.html). Helvetica is jsPDF's built-in;
     it stands in for Bebas Neue (uppercased + letter-spaced for similar feel)
     and for Poppins on body copy. Images are fetched via fetch() → blob → dataURL
     so they embed cleanly (Unsplash sends CORS headers, so this works in production).
  */

  // Color palette — must mirror the CSS vars
  const PDF_COLORS = {
    blue: [30, 79, 168],
    red: [230, 34, 37],
    ink: [10, 10, 10],
    paper: [246, 244, 239],
    paperDark: [232, 228, 218],
    grey: [120, 120, 120],
    greyLight: [210, 210, 210],
    white: [255, 255, 255],
  };

  // A4 portrait dimensions in mm
  const PDF_W = 210;
  const PDF_H = 297;
  const PDF_MARGIN_X = 18;
  const PDF_MARGIN_TOP = 24;
  const PDF_MARGIN_BOTTOM = 22;

  async function fetchImageAsDataURL(url) {
    try {
      const res = await fetch(url, { mode: 'cors', cache: 'force-cache' });
      if (!res.ok) throw new Error('fetch failed: ' + res.status);
      const blob = await res.blob();
      return await new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr.result);
        fr.onerror = () => reject(fr.error);
        fr.readAsDataURL(blob);
      });
    } catch (err) {
      console.warn('image load failed', url, err);
      return null;
    }
  }

  // Returns image natural dimensions from data URL (for aspect-ratio cropping)
  function getDataUrlSize(dataUrl) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve({ w: img.naturalWidth, h: img.naturalHeight });
      img.onerror = () => resolve({ w: 16, h: 9 });
      img.src = dataUrl;
    });
  }

  // Compute image dimensions that COVER a box (fill it, cropping overflow)
  // — used for hero strips where we want full-bleed art with no whitespace.
  function fitCover(srcW, srcH, boxW, boxH) {
    const srcRatio = srcW / srcH;
    const boxRatio = boxW / boxH;
    if (srcRatio > boxRatio) {
      // Source is wider — match box height, crop sides
      const h = boxH;
      const w = h * srcRatio;
      return { x: (boxW - w) / 2, y: 0, w, h };
    }
    // Source is taller — match box width, crop top/bottom
    const w = boxW;
    const h = w / srcRatio;
    return { x: 0, y: (boxH - h) / 2, w, h };
  }

  // Compute image dimensions that CONTAIN within a box (whole image visible, may leave whitespace)
  // — used for inline body images where we don't want cropping.
  function fitContain(srcW, srcH, boxW, boxH) {
    const srcRatio = srcW / srcH;
    const boxRatio = boxW / boxH;
    if (srcRatio > boxRatio) {
      const w = boxW;
      const h = w / srcRatio;
      return { x: 0, y: (boxH - h) / 2, w, h };
    }
    const h = boxH;
    const w = h * srcRatio;
    return { x: (boxW - w) / 2, y: 0, w, h };
  }

  // Add an image to the doc using "cover" semantics inside a box at (x, y, w, h).
  // Uses jsPDF's clipping so the cropped portions don't bleed into surrounding content.
  function addImageCover(doc, dataUrl, x, y, boxW, boxH) {
    if (!dataUrl) return;
    try {
      const props = doc.getImageProperties(dataUrl);
      const fit = fitCover(props.width, props.height, boxW, boxH);
      // jsPDF doesn't natively support clipping rect on images, so we use saveGraphicsState + clip
      doc.saveGraphicsState();
      doc.rect(x, y, boxW, boxH).clip().discardPath();
      doc.addImage(dataUrl, undefined, x + fit.x, y + fit.y, fit.w, fit.h, undefined, 'FAST');
      doc.restoreGraphicsState();
    } catch (e) { console.warn('addImageCover failed', e); }
  }

  // Add an image preserving aspect ratio inside the given box, returns the height actually used.
  // The height is clipped to the remaining space on the page so an image never overlaps the footer.
  function addImageContain(doc, dataUrl, x, y, boxW, maxH) {
    if (!dataUrl) return 0;
    try {
      const props = doc.getImageProperties(dataUrl);
      const ratio = props.width / props.height;
      const roomBelow = PDF_H - PDF_MARGIN_BOTTOM - y;
      const cap = Math.max(20, Math.min(maxH, roomBelow));
      let w = boxW;
      let h = w / ratio;
      if (h > cap) { h = cap; w = h * ratio; }
      const offsetX = (boxW - w) / 2 + x;
      doc.addImage(dataUrl, undefined, offsetX, y, w, h, undefined, 'FAST');
      return h;
    } catch (e) { console.warn('addImageContain failed', e); return 0; }
  }

  // Approximates uppercase Bebas with Helvetica Bold + letter-spacing via spaced chars
  function setDisplay(doc, sizePt) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(sizePt);
  }
  function setBody(doc, sizePt, style = 'normal') {
    doc.setFont('helvetica', style);
    doc.setFontSize(sizePt);
  }

  function rgb(doc, c, mode = 'fill') {
    if (mode === 'fill') doc.setFillColor(c[0], c[1], c[2]);
    else if (mode === 'text') doc.setTextColor(c[0], c[1], c[2]);
    else if (mode === 'draw') doc.setDrawColor(c[0], c[1], c[2]);
  }

  // Wraps a paragraph and writes it, returns the new y position
  function writeWrapped(doc, text, x, y, maxW, lineH) {
    const lines = doc.splitTextToSize(text, maxW);
    for (const line of lines) {
      if (y > PDF_H - PDF_MARGIN_BOTTOM) {
        doc.addPage();
        y = PDF_MARGIN_TOP;
      }
      doc.text(line, x, y);
      y += lineH;
    }
    return y;
  }

  // Letter-spaced uppercase title (mimics Bebas) — wraps across lines
  function writeDisplayTitle(doc, text, x, y, maxW, sizePt, color, lineH) {
    setDisplay(doc, sizePt);
    rgb(doc, color, 'text');
    doc.setCharSpace(0.4);
    const lines = doc.splitTextToSize(text.toUpperCase(), maxW);
    for (const line of lines) {
      if (y > PDF_H - PDF_MARGIN_BOTTOM) {
        doc.addPage();
        y = PDF_MARGIN_TOP;
      }
      doc.text(line, x, y);
      y += lineH;
    }
    doc.setCharSpace(0);
    return y;
  }

  // Small uppercase label with letter-spacing (used for "Édition", "Sources", category labels, etc.)
  function writeLabel(doc, text, x, y, sizePt, color, charSpace = 1.2) {
    setBody(doc, sizePt, 'bold');
    rgb(doc, color, 'text');
    doc.setCharSpace(charSpace);
    doc.text(text.toUpperCase(), x, y);
    doc.setCharSpace(0);
  }

  // Pill-style category label box (blue background, white text)
  function drawCategoryPill(doc, text, x, y) {
    setBody(doc, 8.5, 'bold');
    const charSpace = 1.4;
    doc.setCharSpace(charSpace);
    const upper = text.toUpperCase();
    // getTextWidth doesn't include character spacing, so add (n-1) * charSpace manually.
    // Pad by 8 horizontally so the box visibly contains the text.
    const textW = doc.getTextWidth(upper) + Math.max(0, upper.length - 1) * charSpace;
    const w = textW + 8;
    const h = 5.8;
    rgb(doc, PDF_COLORS.blue, 'fill');
    doc.rect(x, y - h + 1.6, w, h, 'F');
    rgb(doc, PDF_COLORS.white, 'text');
    doc.text(upper, x + 4, y);
    doc.setCharSpace(0);
    return y + 4;
  }

  // Renders the cover page (page 1)
  async function renderCoverPage(doc, coverImg, logoDataUrl) {
    // Solid dark background
    rgb(doc, PDF_COLORS.ink, 'fill');
    doc.rect(0, 0, PDF_W, PDF_H, 'F');

    // Background image — cover-fit (no stretching), then very dark overlay
    if (coverImg && coverImg.data) {
      addImageCover(doc, coverImg.data, 0, 0, PDF_W, PDF_H);
      doc.setFillColor(10, 10, 10);
      doc.setGState(new doc.GState({ opacity: 0.72 }));
      doc.rect(0, 0, PDF_W, PDF_H, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    }

    // ASAC logo top-left (white version, on the dark cover)
    if (logoDataUrl) {
      try {
        const props = doc.getImageProperties(logoDataUrl);
        const logoH = 11;
        const logoW = (props.width / props.height) * logoH;
        doc.addImage(logoDataUrl, undefined, PDF_MARGIN_X, 16, logoW, logoH, undefined, 'FAST');
      } catch (e) { console.warn('logo add failed', e); }
    } else {
      // Fallback: text wordmark if logo image failed to load
      setBody(doc, 11, 'bold');
      rgb(doc, PDF_COLORS.white, 'text');
      doc.setCharSpace(1.8);
      doc.text('ASAC', PDF_MARGIN_X, 22);
      doc.setCharSpace(0);
    }

    // Issue badge (red rectangle) — Poppins-ish small caps
    const t = I18N[state.lang];
    const badgeY = PDF_H / 2 - 50;
    const badgeText = `N°46  ·  ${t.issueMonth.toUpperCase()}`;
    setBody(doc, 9, 'bold');
    const badgeCharSpace = 1.6;
    doc.setCharSpace(badgeCharSpace);
    const badgeTextW = doc.getTextWidth(badgeText) + Math.max(0, badgeText.length - 1) * badgeCharSpace;
    const badgeW = badgeTextW + 14;
    const badgeH = 8;
    rgb(doc, PDF_COLORS.red, 'fill');
    doc.rect(PDF_MARGIN_X, badgeY, badgeW, badgeH, 'F');
    rgb(doc, PDF_COLORS.white, 'text');
    doc.text(badgeText, PDF_MARGIN_X + 7, badgeY + 5.6);
    doc.setCharSpace(0);

    // Big title
    const titleY = badgeY + 24;
    writeDisplayTitle(
      doc,
      'Assurances\n& Sécurité',
      PDF_MARGIN_X,
      titleY,
      PDF_W - 2 * PDF_MARGIN_X,
      48,
      PDF_COLORS.white,
      16,
    );

    // Subtitle
    setBody(doc, 10, 'normal');
    rgb(doc, [220, 220, 220], 'text');
    const sub = t.heroSub;
    const subLines = doc.splitTextToSize(sub, PDF_W - 2 * PDF_MARGIN_X - 40);
    let subY = titleY + 24;
    for (const line of subLines) {
      doc.text(line, PDF_MARGIN_X, subY);
      subY += 5.5;
    }

    // No edition label, no footer text — keep the cover clean.
  }

  // Renders the contents page (page 2)
  function renderContentsPage(doc, articleStarts) {
    doc.addPage();
    rgb(doc, PDF_COLORS.paper, 'fill');
    doc.rect(0, 0, PDF_W, PDF_H, 'F');

    const t = I18N[state.lang];

    // Top-left small ASAC label
    setBody(doc, 9, 'bold');
    rgb(doc, PDF_COLORS.blue, 'text');
    doc.setCharSpace(1.8);
    doc.text('ASAC', PDF_MARGIN_X, 18);
    doc.setCharSpace(0);

    // Top-right page number
    setBody(doc, 8, 'normal');
    rgb(doc, PDF_COLORS.grey, 'text');
    doc.setCharSpace(1.4);
    doc.text('— 02 —', PDF_W - PDF_MARGIN_X - 14, 18);
    doc.setCharSpace(0);

    // Big Contents title
    writeDisplayTitle(
      doc,
      t.contentsTitle,
      PDF_MARGIN_X,
      48,
      PDF_W - 2 * PDF_MARGIN_X,
      40,
      PDF_COLORS.blue,
      14,
    );

    // Red thin line
    rgb(doc, PDF_COLORS.red, 'fill');
    doc.rect(PDF_MARGIN_X, 56, 30, 1.2, 'F');

    // Two-column list of categories + articles
    let colY = 70;
    const colX = PDF_MARGIN_X;
    const colW = PDF_W - 2 * PDF_MARGIN_X;
    const lang = state.lang;

    for (const cat of CATEGORIES) {
      // Category name in blue + small caps
      if (colY > PDF_H - 50) {
        doc.addPage();
        rgb(doc, PDF_COLORS.paper, 'fill');
        doc.rect(0, 0, PDF_W, PDF_H, 'F');
        colY = PDF_MARGIN_TOP;
      }
      setBody(doc, 9, 'bold');
      rgb(doc, PDF_COLORS.blue, 'text');
      doc.setCharSpace(1.6);
      doc.text(cat.name[lang].toUpperCase(), colX, colY);
      doc.setCharSpace(0);
      colY += 4;

      // Hairline under
      rgb(doc, PDF_COLORS.greyLight, 'draw');
      doc.setLineWidth(0.2);
      doc.line(colX, colY, colX + colW, colY);
      colY += 4;

      // Articles
      for (const a of cat.articles) {
        if (colY > PDF_H - 30) {
          doc.addPage();
          rgb(doc, PDF_COLORS.paper, 'fill');
          doc.rect(0, 0, PDF_W, PDF_H, 'F');
          colY = PDF_MARGIN_TOP;
        }
        setBody(doc, 10, 'normal');
        rgb(doc, PDF_COLORS.ink, 'text');
        const titleLines = doc.splitTextToSize(a.title[lang], colW - 20);
        for (const line of titleLines) {
          doc.text(line, colX, colY);
          colY += 5;
        }
        // Page indicator (we'll fill these in with articleStarts map)
        if (articleStarts && articleStarts[a.id]) {
          setBody(doc, 9, 'bold');
          rgb(doc, PDF_COLORS.red, 'text');
          doc.setCharSpace(0.8);
          const pageStr = String(articleStarts[a.id]).padStart(2, '0');
          const w = doc.getTextWidth(pageStr);
          doc.text(pageStr, colX + colW - w, colY - 5);
          doc.setCharSpace(0);
        }
        colY += 1;
      }
      colY += 6;
    }

    // Footer
    setBody(doc, 7.5, 'normal');
    doc.setCharSpace(1.2);
    rgb(doc, PDF_COLORS.grey, 'text');
    doc.text(`N°46  ·  ${t.issueMonth.toUpperCase()}  ·  ASAC`, PDF_MARGIN_X, PDF_H - 12);
    doc.setCharSpace(0);
  }

  // Renders one article — handles multi-page flow
  async function renderArticlePdfPage(doc, article, cat, body, heroImgDataUrl, pageNum, totalPages) {
    doc.addPage();
    rgb(doc, PDF_COLORS.paper, 'fill');
    doc.rect(0, 0, PDF_W, PDF_H, 'F');

    const lang = state.lang;
    const t = I18N[lang];

    // ===== HERO =====
    // Exactly one quarter of the A4 page, never stretched.
    const heroH = PDF_H / 4; // ≈ 74.25mm
    if (heroImgDataUrl) {
      addImageCover(doc, heroImgDataUrl, 0, 0, PDF_W, heroH);
      // Dark gradient: heavier at bottom so the white title stays legible
      doc.setGState(new doc.GState({ opacity: 0.35 }));
      doc.setFillColor(10, 10, 10);
      doc.rect(0, 0, PDF_W, heroH, 'F');
      doc.setGState(new doc.GState({ opacity: 0.55 }));
      doc.rect(0, heroH * 0.45, PDF_W, heroH * 0.55, 'F');
      doc.setGState(new doc.GState({ opacity: 1 }));
    } else {
      rgb(doc, PDF_COLORS.ink, 'fill');
      doc.rect(0, 0, PDF_W, heroH, 'F');
    }

    // Top corner — ASAC wordmark + page number (white on hero)
    setBody(doc, 8, 'bold');
    rgb(doc, PDF_COLORS.white, 'text');
    doc.setCharSpace(1.8);
    doc.text('ASAC', PDF_MARGIN_X, 12);
    doc.text(`— ${String(pageNum).padStart(2, '0')} —`, PDF_W - PDF_MARGIN_X - 14, 12);
    doc.setCharSpace(0);

    // Title (white) anchored to the BOTTOM of the hero. We size it down for very
    // long titles so it never overlaps the top wordmark.
    const titleMaxW = PDF_W - 2 * PDF_MARGIN_X;
    const titleChoices = [22, 19, 16, 14]; // pt — pick the largest that fits in ≤4 lines
    let chosenSize = 14;
    let chosenLines = [];
    for (const sz of titleChoices) {
      setDisplay(doc, sz);
      doc.setCharSpace(0.4);
      const lines = doc.splitTextToSize((article.title[lang] || '').toUpperCase(), titleMaxW);
      doc.setCharSpace(0);
      // mm per line at ~0.95 line-height: pt / 2.835 * 0.95
      const lineHmm = sz / 2.835 * 0.95;
      const totalH = lines.length * lineHmm;
      // Reserve room for: top wordmark (≈18mm), category pill (8mm), gap (4mm), bottom padding (8mm)
      if (totalH <= heroH - 38 || sz === titleChoices[titleChoices.length - 1]) {
        chosenSize = sz;
        chosenLines = lines;
        break;
      }
    }
    const lineHmm = chosenSize / 2.835 * 0.95;
    const titleBlockH = chosenLines.length * lineHmm;
    const titleBottomY = heroH - 10;            // 10mm padding from hero bottom
    const titleTopY = titleBottomY - titleBlockH;

    // Category pill — just above the title
    const pillY = titleTopY - 4;
    drawCategoryPill(doc, cat.name[lang], PDF_MARGIN_X, pillY);

    // Title lines (white, Bebas-style)
    setDisplay(doc, chosenSize);
    rgb(doc, PDF_COLORS.white, 'text');
    doc.setCharSpace(0.4);
    let ty = titleTopY + lineHmm * 0.85; // first line baseline
    for (const line of chosenLines) {
      doc.text(line, PDF_MARGIN_X, ty);
      ty += lineHmm;
    }
    doc.setCharSpace(0);

    // ===== BODY (paper background, starts below hero) =====
    let y = heroH + 12;

    // Byline (author + role)
    if (body.author) {
      setBody(doc, 8, 'bold');
      doc.setCharSpace(1.6);
      rgb(doc, PDF_COLORS.grey, 'text');
      doc.text(t.by.toUpperCase(), PDF_MARGIN_X, y);
      const byW = doc.getTextWidth(t.by.toUpperCase()) + 3;
      doc.setCharSpace(0);

      setBody(doc, 9.5, 'bold');
      rgb(doc, PDF_COLORS.blue, 'text');
      doc.text(body.author[lang], PDF_MARGIN_X + byW, y);
      y += 5;

      if (body.role) {
        setBody(doc, 8.5, 'italic');
        rgb(doc, PDF_COLORS.grey, 'text');
        const roleLines = doc.splitTextToSize(body.role[lang], PDF_W - 2 * PDF_MARGIN_X);
        for (const line of roleLines) {
          doc.text(line, PDF_MARGIN_X, y);
          y += 4.2;
        }
      }
      y += 3;
    }

    // Thin separator
    rgb(doc, PDF_COLORS.greyLight, 'draw');
    doc.setLineWidth(0.3);
    doc.line(PDF_MARGIN_X, y, PDF_W - PDF_MARGIN_X, y);
    y += 7;

    // Lead paragraph (left-bordered, slightly larger)
    if (body.lead) {
      // Blue left bar
      rgb(doc, PDF_COLORS.blue, 'fill');
      const leadX = PDF_MARGIN_X + 3;
      const leadStartY = y;
      setBody(doc, 11, 'normal');
      rgb(doc, PDF_COLORS.ink, 'text');
      const leadLines = doc.splitTextToSize(body.lead[lang], PDF_W - 2 * PDF_MARGIN_X - 6);
      let leadY = y + 4;
      for (const line of leadLines) {
        if (leadY > PDF_H - PDF_MARGIN_BOTTOM) {
          doc.addPage();
          rgb(doc, PDF_COLORS.paper, 'fill');
          doc.rect(0, 0, PDF_W, PDF_H, 'F');
          leadY = PDF_MARGIN_TOP;
        }
        doc.text(line, leadX + 4, leadY);
        leadY += 5.4;
      }
      // Draw the blue bar over the lead height
      doc.rect(leadX, leadStartY + 1, 1.4, leadY - leadStartY - 4, 'F');
      y = leadY + 5;
    }

    // Body paragraphs
    setBody(doc, 10, 'normal');
    rgb(doc, [40, 40, 40], 'text');
    const paragraphs = (body.paragraphs && body.paragraphs[lang]) || [];
    for (const p of paragraphs) {
      if (y > PDF_H - PDF_MARGIN_BOTTOM - 10) {
        doc.addPage();
        rgb(doc, PDF_COLORS.paper, 'fill');
        doc.rect(0, 0, PDF_W, PDF_H, 'F');
        y = PDF_MARGIN_TOP;
      }
      y = writeWrapped(doc, p, PDF_MARGIN_X, y, PDF_W - 2 * PDF_MARGIN_X, 5.2);
      y += 3.5;
    }

    // Inline article image (mirrors the live site placement: after paragraphs)
    // For CMS docs we may have several images in body.inlineImages; render the first
    // here and any remainder between sections below.
    const inlineImages = (body.inlineImages || []).slice();
    if (paragraphs.length > 0 && (inlineImages[0] || heroImgDataUrl)) {
      const imgData = inlineImages.shift() || heroImgDataUrl;
      // Full A4 page width, never stretched. Height computed from aspect ratio.
      const imgW = PDF_W;
      const maxH = 110;
      if (y + 16 > PDF_H - PDF_MARGIN_BOTTOM - 60) {
        doc.addPage();
        rgb(doc, PDF_COLORS.paper, 'fill');
        doc.rect(0, 0, PDF_W, PDF_H, 'F');
        y = PDF_MARGIN_TOP;
      }
      y += 6;
      const usedH = addImageContain(doc, imgData, 0, y, imgW, maxH);
      if (usedH > 0) y += usedH + 10;
    }

    // Sections (h3 + p)
    const sections = (body.sections && body.sections[lang]) || [];
    for (let i = 0; i < sections.length; i++) {
      const s = sections[i];
      if (y > PDF_H - PDF_MARGIN_BOTTOM - 20) {
        doc.addPage();
        rgb(doc, PDF_COLORS.paper, 'fill');
        doc.rect(0, 0, PDF_W, PDF_H, 'F');
        y = PDF_MARGIN_TOP;
      }
      y += 5;
      // h3 in blue, Bebas-style
      y = writeDisplayTitle(
        doc, s.h, PDF_MARGIN_X, y, PDF_W - 2 * PDF_MARGIN_X, 14, PDF_COLORS.blue, 6.5,
      );
      y += 2;
      setBody(doc, 10, 'normal');
      rgb(doc, [40, 40, 40], 'text');
      y = writeWrapped(doc, s.p, PDF_MARGIN_X, y, PDF_W - 2 * PDF_MARGIN_X, 5.2);
      y += 3;

      // Drop pull quote roughly in the middle
      if (body.pullQuote && i === Math.floor(sections.length / 2) - 1) {
        if (y > PDF_H - PDF_MARGIN_BOTTOM - 40) {
          doc.addPage();
          rgb(doc, PDF_COLORS.paper, 'fill');
          doc.rect(0, 0, PDF_W, PDF_H, 'F');
          y = PDF_MARGIN_TOP;
        }
        y += 4;
        rgb(doc, PDF_COLORS.red, 'fill');
        doc.rect(PDF_MARGIN_X, y, 2, 18, 'F');
        y = writeDisplayTitle(
          doc, '"' + body.pullQuote[lang] + '"', PDF_MARGIN_X + 6, y + 6,
          PDF_W - 2 * PDF_MARGIN_X - 6, 16, PDF_COLORS.ink, 7,
        );
        y += 6;
      }

      // Drop the next inline image between sections if any are left
      if (inlineImages.length && i < sections.length - 1) {
        if (y > PDF_H - PDF_MARGIN_BOTTOM - 60) {
          doc.addPage();
          rgb(doc, PDF_COLORS.paper, 'fill');
          doc.rect(0, 0, PDF_W, PDF_H, 'F');
          y = PDF_MARGIN_TOP;
        }
        y += 6;
        const usedH = addImageContain(doc, inlineImages.shift(), 0, y, PDF_W, 100);
        if (usedH > 0) y += usedH + 10;
      }
    }

    // Sources
    if (body.sources && body.sources.length) {
      if (y > PDF_H - PDF_MARGIN_BOTTOM - 30) {
        doc.addPage();
        rgb(doc, PDF_COLORS.paper, 'fill');
        doc.rect(0, 0, PDF_W, PDF_H, 'F');
        y = PDF_MARGIN_TOP;
      }
      y += 6;
      rgb(doc, PDF_COLORS.greyLight, 'draw');
      doc.line(PDF_MARGIN_X, y, PDF_W - PDF_MARGIN_X, y);
      y += 6;
      writeLabel(doc, t.sourcesLabel, PDF_MARGIN_X, y, 8, PDF_COLORS.grey, 1.8);
      y += 5;
      setBody(doc, 9, 'normal');
      rgb(doc, PDF_COLORS.blue, 'text');
      for (const src of body.sources) {
        if (y > PDF_H - PDF_MARGIN_BOTTOM) {
          doc.addPage();
          rgb(doc, PDF_COLORS.paper, 'fill');
          doc.rect(0, 0, PDF_W, PDF_H, 'F');
          y = PDF_MARGIN_TOP;
        }
        const lines = doc.splitTextToSize('· ' + src.label, PDF_W - 2 * PDF_MARGIN_X);
        for (const line of lines) {
          doc.textWithLink(line, PDF_MARGIN_X, y, { url: src.url });
          y += 4.5;
        }
      }
    }

    // Footer
    setBody(doc, 7.5, 'normal');
    doc.setCharSpace(1.2);
    rgb(doc, PDF_COLORS.grey, 'text');
    doc.text(`ASAC  ·  N°46  ·  ${t.issueMonth.toUpperCase()}`, PDF_MARGIN_X, PDF_H - 10);
    doc.text(String(pageNum).padStart(2, '0'), PDF_W - PDF_MARGIN_X - 6, PDF_H - 10);
    doc.setCharSpace(0);
  }

  // Lazily inject jsPDF only when the user requests a PDF. Keeps it off the
  // critical path so it can never block page load on slow connections.
  let _jspdfPromise = null;

  // Resolve a relative URL (e.g. "/api/image?id=…") to an absolute one for
  // fetchImageAsDataURL on Vercel previews and local dev.
  function absUrl(u) {
    if (!u) return u;
    if (/^https?:\/\//i.test(u)) return u;
    return new URL(u, window.location.origin).toString();
  }

  // Convert a CMS API response (rendered HTML) into the same {lead, paragraphs,
  // sections, pullQuote} shape that ARTICLE_BODIES uses — so the PDF renderer
  // can produce a consistent layout for both kinds of articles.
  function bodyFromCms(cms, lang) {
    const tmp = document.createElement('div');
    tmp.innerHTML = cms.html || '';
    const lead = { fr: '', en: '' };
    const paragraphs = { fr: [], en: [] };
    const sections = { fr: [], en: [] };
    let pullQuote = null;
    let currentH = null;
    let leadFound = false;
    const text = (el) => (el.textContent || '').trim();
    for (const node of Array.from(tmp.children)) {
      const tag = node.tagName.toLowerCase();
      if (tag === 'h1') continue; // title is already shown separately
      if (tag === 'h3') {
        currentH = text(node);
        sections[lang].push({ h: currentH, p: '' });
      } else if (/^h[2-6]$/.test(tag)) {
        // Treat as section header too
        currentH = text(node);
        sections[lang].push({ h: currentH, p: '' });
      } else if (tag === 'blockquote' && node.classList.contains('pull')) {
        if (!pullQuote) pullQuote = { fr: text(node), en: text(node) };
        pullQuote[lang] = text(node);
      } else if (tag === 'p' || tag === 'blockquote' || tag === 'ul' || tag === 'ol') {
        const t = text(node);
        if (!t) continue;
        if (!leadFound && tag === 'p' && !currentH) {
          lead[lang] = t;
          leadFound = true;
          continue;
        }
        if (currentH && sections[lang].length) {
          const last = sections[lang][sections[lang].length - 1];
          last.p = last.p ? last.p + '\n\n' + t : t;
        } else {
          paragraphs[lang].push(t);
        }
      }
      // <img>, <hr>, <figure> are skipped here — inline images are passed separately
    }
    return { lead, paragraphs, sections, pullQuote };
  }

  function loadJsPDF() {
    if (window.jspdf && window.jspdf.jsPDF) return Promise.resolve(true);
    if (_jspdfPromise) return _jspdfPromise;
    _jspdfPromise = new Promise((resolve, reject) => {
      const s = document.createElement('script');
      s.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      s.async = true;
      s.onload = () => resolve(true);
      s.onerror = () => { _jspdfPromise = null; reject(new Error('Could not load the PDF library. Check your connection and try again.')); };
      document.head.appendChild(s);
    });
    return _jspdfPromise;
  }

  async function generateMagazinePdf(triggerBtn) {
    const t = I18N[state.lang];
    const originalLabel = triggerBtn ? triggerBtn.textContent : '';
    const setBtnState = (text, disabled) => {
      if (!triggerBtn) return;
      triggerBtn.classList.toggle('is-loading', !!disabled);
      if (triggerBtn.tagName === 'BUTTON') triggerBtn.disabled = disabled;
      else if (disabled) triggerBtn.setAttribute('aria-disabled', 'true');
      else triggerBtn.removeAttribute('aria-disabled');
      triggerBtn.textContent = text;
    };

    try {
      setBtnState(t.preparingPdf, true);

      // Lazy-load the PDF library now (kept off the page's critical path)
      await loadJsPDF();

      // 1. Collect all images needed up-front, fetch in parallel
      const heroUrl = CATEGORIES[0].image; // first category image as cover
      const LOGO_URL = 'assets/logo-white.png';
      const allImageUrls = new Set();
      allImageUrls.add(LOGO_URL);
      allImageUrls.add(heroUrl);
      for (const cat of CATEGORIES) allImageUrls.add(cat.image);
      // Also collect any extra inline images per article body
      for (const id of Object.keys(ARTICLE_BODIES)) {
        const ab = ARTICLE_BODIES[id];
        if (ab.image) allImageUrls.add(ab.image);
        if (Array.isArray(ab.inlineImages)) ab.inlineImages.forEach((u) => allImageUrls.add(u));
      }
      const urls = Array.from(allImageUrls);
      const dataUrls = await Promise.all(urls.map(fetchImageAsDataURL));
      const imgMap = {};
      urls.forEach((u, i) => { imgMap[u] = dataUrls[i]; });

      // 1b. For any article whose id is a Google Doc id, fetch its /api/article
      //     response so we can embed its inline images in the PDF too.
      const cmsArticleData = {};
      const cmsFetches = [];
      for (const cat of CATEGORIES) {
        for (const a of cat.articles) {
          if (looksLikeDocId(a.id)) {
            cmsFetches.push(
              fetchArticleFromCms(a.id).then((data) => { if (data) cmsArticleData[a.id] = data; })
            );
          }
        }
      }
      await Promise.all(cmsFetches);
      // Fetch any CMS image data URLs we didn't already grab
      const extraCmsImages = new Set();
      for (const data of Object.values(cmsArticleData)) {
        for (const url of data.images || []) extraCmsImages.add(absUrl(url));
      }
      const extraList = Array.from(extraCmsImages).filter((u) => !imgMap[u]);
      const extraData = await Promise.all(extraList.map(fetchImageAsDataURL));
      extraList.forEach((u, i) => { imgMap[u] = extraData[i]; });

      // 2. Build doc
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait', compress: true });

      const articleList = [];
      for (const cat of CATEGORIES) {
        for (const a of cat.articles) {
          articleList.push({ cat, article: a });
        }
      }

      // Cover page (page 1) — pass the logo so we can render it instead of "ASAC" text
      await renderCoverPage(doc, { data: imgMap[heroUrl] }, imgMap[LOGO_URL]);

      // Reserve contents page (we'll fill it after we know article page numbers)
      doc.addPage();
      const contentsPageIndex = doc.internal.getNumberOfPages(); // = 2

      // Render each article, tracking start pages
      const articleStarts = {};
      for (const { cat, article } of articleList) {
        // For CMS articles, build a "synthetic" body from the API HTML so the
        // PDF renderer can show paragraphs, sections AND inline images.
        let body;
        let heroDataUrl;
        if (cmsArticleData[article.id]) {
          body = bodyFromCms(cmsArticleData[article.id], state.lang);
          // Inline images become absolute URLs we've already fetched
          body.inlineImages = (cmsArticleData[article.id].images || [])
            .map((u) => imgMap[absUrl(u)])
            .filter(Boolean);
          heroDataUrl = body.inlineImages[0] || imgMap[cat.image];
        } else {
          body = ARTICLE_BODIES[article.id] || makeGenericBody(article, cat);
          heroDataUrl = imgMap[body.image] || imgMap[cat.image];
          // Resolve inline image URLs (if a baked article specified any) to data URLs
          if (Array.isArray(body.inlineImages)) {
            body.inlineImages = body.inlineImages.map((u) => imgMap[u]).filter(Boolean);
          }
        }
        const pageBefore = doc.internal.getNumberOfPages();
        await renderArticlePdfPage(
          doc, article, cat, body, heroDataUrl,
          pageBefore + 1, 0,
        );
        articleStarts[article.id] = pageBefore + 1;
      }

      // Now fill the contents page: switch to that page and draw
      doc.setPage(contentsPageIndex);
      // Re-render contents content on already-existing page (renderContentsPage adds its own page,
      // so we adapt by inlining the content here without addPage):
      drawContentsOntoCurrentPage(doc, articleStarts);

      // 3. Save
      const fname = `ASAC-Magazine-N46-Juin-2026.pdf`;
      doc.save(fname);
      setBtnState(originalLabel || t.downloadIssue, false);
    } catch (err) {
      console.error('PDF generation failed', err);
      alert('PDF generation failed: ' + (err && err.message ? err.message : err));
      setBtnState(originalLabel || t.downloadIssue, false);
    }
  }

  function drawContentsOntoCurrentPage(doc, articleStarts) {
    const t = I18N[state.lang];
    rgb(doc, PDF_COLORS.paper, 'fill');
    doc.rect(0, 0, PDF_W, PDF_H, 'F');

    setBody(doc, 9, 'bold');
    rgb(doc, PDF_COLORS.blue, 'text');
    doc.setCharSpace(1.8);
    doc.text('ASAC', PDF_MARGIN_X, 18);
    doc.setCharSpace(0);

    setBody(doc, 8, 'normal');
    rgb(doc, PDF_COLORS.grey, 'text');
    doc.setCharSpace(1.4);
    doc.text('— 02 —', PDF_W - PDF_MARGIN_X - 14, 18);
    doc.setCharSpace(0);

    writeDisplayTitle(
      doc, t.contentsTitle, PDF_MARGIN_X, 48,
      PDF_W - 2 * PDF_MARGIN_X, 40, PDF_COLORS.blue, 14,
    );
    rgb(doc, PDF_COLORS.red, 'fill');
    doc.rect(PDF_MARGIN_X, 56, 30, 1.2, 'F');

    let y = 72;
    const colX = PDF_MARGIN_X;
    const colW = PDF_W - 2 * PDF_MARGIN_X;
    const lang = state.lang;

    for (const cat of CATEGORIES) {
      if (y > PDF_H - 50) break; // simple cap: contents stays on one page
      setBody(doc, 9, 'bold');
      rgb(doc, PDF_COLORS.blue, 'text');
      doc.setCharSpace(1.6);
      doc.text(cat.name[lang].toUpperCase(), colX, y);
      doc.setCharSpace(0);
      y += 3.5;
      rgb(doc, PDF_COLORS.greyLight, 'draw');
      doc.setLineWidth(0.2);
      doc.line(colX, y, colX + colW, y);
      y += 4;

      for (const a of cat.articles) {
        if (y > PDF_H - 30) break;
        setBody(doc, 9.5, 'normal');
        rgb(doc, PDF_COLORS.ink, 'text');
        const titleLines = doc.splitTextToSize(a.title[lang], colW - 14);
        for (const line of titleLines) {
          doc.text(line, colX, y);
          y += 4.6;
        }
        if (articleStarts && articleStarts[a.id]) {
          setBody(doc, 9, 'bold');
          rgb(doc, PDF_COLORS.red, 'text');
          doc.setCharSpace(0.8);
          const pageStr = String(articleStarts[a.id]).padStart(2, '0');
          const w = doc.getTextWidth(pageStr);
          doc.text(pageStr, colX + colW - w, y - 4.6);
          doc.setCharSpace(0);
        }
        y += 1.5;
      }
      y += 4;
    }

    setBody(doc, 7.5, 'normal');
    doc.setCharSpace(1.2);
    rgb(doc, PDF_COLORS.grey, 'text');
    doc.text(`N°46  ·  ${t.issueMonth.toUpperCase()}  ·  ASAC`, PDF_MARGIN_X, PDF_H - 12);
    doc.setCharSpace(0);
  }

  /* ---------- FROST-ON-SCROLL NAV (menu page + article page) ---------- */
  function setupFrostNav() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const update = () => {
      // On article page: progress based on window scroll
      // On home page (menu open): no frost — menu has its own background
      const y = window.scrollY || 0;
      const p = Math.max(0, Math.min(1, y / 220));
      nav.style.setProperty('--frost-p', String(p));
      nav.classList.toggle('is-frost-on', p > 0.02);
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // After CMS hydration, swap the hero + feature-panel background images
  // and the menu-grid card backgrounds to use whatever the API returned.
  function syncHomePanelImages() {
    try {
      // Hero (panel 0)
      if (state.cmsHeroImage) {
        const heroImg = document.querySelector('.panel[data-panel="0"] .panel__img');
        if (heroImg) heroImg.style.backgroundImage = `url('${state.cmsHeroImage}')`;
      }
      // Featured panels — match by their data-category attribute against the slugified id
      document.querySelectorAll('.panel--feature').forEach((p) => {
        const wanted = (p.dataset.category || '').toLowerCase();
        const cat = CATEGORIES.find((c) =>
          c.name.fr.toLowerCase() === wanted ||
          c.name.en.toLowerCase() === wanted ||
          c.id === slugifyLite(wanted)
        );
        if (cat && cat.image) {
          const img = p.querySelector('.panel__img');
          if (img) img.style.backgroundImage = `url('${cat.image}')`;
          // Also update the first article id so clicks go to the right doc
          const featContent = p.querySelector('.panel__content--feature');
          if (featContent && cat.articles[0]) {
            featContent.dataset.article = cat.articles[0].id;
          }
        }
      });
    } catch (err) {
      console.warn('[asac] panel sync failed', err);
    }
  }
  function slugifyLite(s) {
    return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '')
      .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }

  /* ---------- CMS HYDRATION (Google Drive layer) ----------
     If /api/categories responds successfully, replace the in-file CATEGORIES
     with the live folder contents. Articles whose `id` looks like a Google
     Doc ID (44 chars, /[A-Za-z0-9_-]/) trigger a fetch to /api/article on
     the article page. Both endpoints are optional: if they 404 or error,
     the site falls back to the static data baked into this file.

     Frontend i18n names for categories come from CATEGORY_NAME_OVERRIDES
     keyed by the slugified folder name so French folder names like
     "Éditorial" still get English labels at runtime.
  */
  const CATEGORY_NAME_OVERRIDES = {
    'editorial': { fr: 'Éditorial', en: 'Editorial' },
    'actualite': { fr: 'Actualité', en: 'News' },
    'evenement': { fr: 'Évènement', en: 'Event' },
    'focus': { fr: 'Focus', en: 'Focus' },
    'vie-de-l-asac': { fr: "Vie de l'ASAC", en: 'ASAC Life' },
    'ca-bouge': { fr: 'Ça bouge !', en: 'Moving forward!' },
    'votre-avis-compte': { fr: 'Votre avis compte', en: 'Your voice matters' },
    'les-metiers-de-l-assurance': { fr: "Les métiers de l'assurance", en: 'Insurance careers' },
    'emploi': { fr: 'Emploi', en: 'Careers' },
    'instant-fun-jeu': { fr: 'Instant fun / Jeu', en: 'Fun break / Game' },
    'membres-de-l-asac': { fr: "Membres de l'ASAC", en: 'ASAC Members' },
  };

  // Replace CATEGORIES in place when the live data is available.
  async function hydrateFromCms() {
    try {
      const controller = new AbortController();
      const tid = setTimeout(() => controller.abort(), 4000);
      const r = await fetch(`/api/categories?lang=${encodeURIComponent(state.lang)}`, {
        headers: { Accept: 'application/json' },
        signal: controller.signal,
      });
      clearTimeout(tid);
      if (!r.ok) throw new Error('categories endpoint returned ' + r.status);
      const data = await r.json();
      if (!Array.isArray(data.categories) || !data.categories.length) return false;

      // Build a fresh CATEGORIES-shaped array
      const fresh = data.categories.map((c) => {
        const override = CATEGORY_NAME_OVERRIDES[c.id];
        const name = override || c.name || { fr: c.id, en: c.id };
        // Priority for the cover image: 1) Drive cover.jpg in folder
        //                                2) image baked into script.js
        //                                3) generic fallback
        const cmsCover = c.coverImage || null;
        const bakedImg = (CATEGORIES.find((x) => x.id === c.id) || {}).image;
        const image = cmsCover || bakedImg
          || 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=1600&q=85&auto=format&fit=crop';
        return {
          id: c.id,
          name,
          image,
          count: c.count,
          articles: (c.articles || []).map((a) => ({
            id: a.docId || a.id,
            docId: a.docId || a.id,
            title: a.title,
          })),
        };
      });

      // Hot-swap the array contents (keep the reference stable so other code keeps working)
      CATEGORIES.length = 0;
      fresh.forEach((c) => CATEGORIES.push(c));
      // Store issue info if returned
      if (data.issue) {
        I18N.fr.issueMonth = data.issue.month.fr || I18N.fr.issueMonth;
        I18N.en.issueMonth = data.issue.month.en || I18N.en.issueMonth;
        // Stash hero image on a global so the home page can swap it in
        if (data.issue.heroImage) state.cmsHeroImage = data.issue.heroImage;
      }
      return true;
    } catch (err) {
      // CMS not configured / network blocked / dev mode -> use baked data
      console.info('[asac] using baked content (CMS not available):', err.message);
      return false;
    }
  }

  // Fetch one article from /api/article — returns rendered HTML or null.
  async function fetchArticleFromCms(docId) {
    try {
      const controller2 = new AbortController();
      const tid2 = setTimeout(() => controller2.abort(), 8000);
      const r = await fetch(`/api/article?id=${encodeURIComponent(docId)}&lang=${encodeURIComponent(state.lang)}`, {
        headers: { Accept: 'application/json' },
        signal: controller2.signal,
      });
      clearTimeout(tid2);
      if (!r.ok) return null;
      const data = await r.json();
      return data;
    } catch (err) {
      return null;
    }
  }

  // A Google Doc ID is 28–44 chars of [A-Za-z0-9_-]
  function looksLikeDocId(s) {
    return typeof s === 'string' && /^[A-Za-z0-9_-]{20,}$/.test(s) && !/^(edito|focus|metiers|emploi|cabouge|vie|avis|actualite|evt|fun|membres)-/.test(s);
  }

  /* ---------- ARTICLE PAGE RENDER (article.html) ---------- */
  async function renderArticlePage() {
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    const categoryId = params.get('cat');

    const titleEl = document.getElementById('articleTitle');
    const catEl = document.getElementById('articleCat');
    const metaEl = document.getElementById('articleMeta');
    const heroImgEl = document.getElementById('articleHeroImg');
    const contentEl = document.getElementById('articleContent');

    if (!articleId || !categoryId) {
      contentEl.innerHTML = '<p style="text-align:center;padding:60px 20px;color:var(--grey-3)">Article introuvable.</p>';
      return;
    }

    const cat = CATEGORIES.find((c) => c.id === categoryId);
    const article = cat && cat.articles.find((a) => a.id === articleId);
    if (!cat || !article) {
      // It's possible the user landed here before CATEGORIES was hydrated from the CMS,
      // OR the id is a Google Doc id from the live folder. Try the CMS path.
      if (looksLikeDocId(articleId)) {
        const cms = await fetchArticleFromCms(articleId);
        if (cms) return renderCmsArticle(cms, cat || { id: categoryId, name: { fr: categoryId, en: categoryId }, image: '' });
      }
      contentEl.innerHTML = '<p style="text-align:center;padding:60px 20px;color:var(--grey-3)">Article introuvable.</p>';
      return;
    }

    // If the article id IS a Doc ID, prefer the live content over any baked version.
    if (looksLikeDocId(articleId)) {
      const cms = await fetchArticleFromCms(articleId);
      if (cms) return renderCmsArticle(cms, cat);
    }

    const body = ARTICLE_BODIES[articleId] || makeGenericBody(article, cat);
    const lang = state.lang;
    const t = I18N[lang];
    const heroImg = body.image || cat.image;
    const lead = body.lead[lang];
    const paragraphs = (body.paragraphs && body.paragraphs[lang]) || [];
    const sections = (body.sections && body.sections[lang]) || [];
    const author = body.author ? body.author[lang] : null;
    const role = body.role ? body.role[lang] : null;
    const pullQuote = body.pullQuote ? body.pullQuote[lang] : null;
    const sources = body.sources || null;
    const wordCount = [lead, ...paragraphs, ...sections.map((s) => s.p), ...sections.map((s) => s.h)]
      .join(' ').split(/\s+/).filter(Boolean).length;
    const readTime = Math.max(3, Math.round(wordCount / 220));

    // Update <title> dynamically
    document.title = `${article.title[lang]} — ASAC Magazine`;

    // Hero
    heroImgEl.style.backgroundImage = `url('${heroImg}')`;
    catEl.textContent = cat.name[lang];
    titleEl.textContent = article.title[lang];
    metaEl.innerHTML = `
      <span>${escapeHtml(t.issueMonth)}</span>
      <span class="article-page__meta-sep">·</span>
      <span>${readTime} ${escapeHtml(t.readTime)}</span>
    `;

    // Body
    const authorBlock = author ? `
      <div class="article-page__byline">
        <span class="article-page__byline-by">${escapeHtml(t.by)}</span>
        <span class="article-page__byline-name">${escapeHtml(author)}</span>
        ${role ? `<span class="article-page__byline-role">${escapeHtml(role)}</span>` : ''}
      </div>` : '';

    const sectionsHtml = sections.map((s, idx) => {
      const block = `<h3>${escapeHtml(s.h)}</h3><p>${escapeHtml(s.p)}</p>`;
      if (pullQuote && idx === Math.floor(sections.length / 2) - 1) {
        return block + `<blockquote class="article-page__pull">${escapeHtml(pullQuote)}</blockquote>`;
      }
      return block;
    }).join('');

    const sourcesHtml = sources && sources.length ? `
      <aside class="article-page__sources">
        <span class="article-page__sources-label">${escapeHtml(t.sourcesLabel)}</span>
        <ul>${sources.map((s) => `<li><a href="${escapeAttr(s.url)}" target="_blank" rel="noopener">${escapeHtml(s.label)}</a></li>`).join('')}</ul>
      </aside>` : '';

    contentEl.innerHTML = `
      ${authorBlock}
      <p class="article-page__lead">${escapeHtml(lead)}</p>
      ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      ${paragraphs.length > 0 ? `<div class="article-page__inline-img" style="background-image:url('${escapeAttr(cat.image)}')"></div>` : ''}
      ${sectionsHtml}
      ${sourcesHtml}
    `;

    // Localize back link
    const backLink = document.querySelector('.article-page__back-link span:last-child');
    if (backLink) backLink.textContent = t.backToMenu;
  }

  // Render an article whose body comes from /api/article (live Google Doc).
  // The API has already given us clean semantic HTML; we just slot it into
  // the article page chrome (hero, title, byline, content).
  function renderCmsArticle(cms, cat) {
    const lang = state.lang;
    const t = I18N[lang];
    const titleEl = document.getElementById('articleTitle');
    const catEl = document.getElementById('articleCat');
    const metaEl = document.getElementById('articleMeta');
    const heroImgEl = document.getElementById('articleHeroImg');
    const contentEl = document.getElementById('articleContent');

    document.title = `${cms.title} — ASAC Magazine`;
    catEl.textContent = (cat && cat.name && cat.name[lang]) || '';
    titleEl.textContent = cms.title;
    metaEl.innerHTML = `<span>${escapeHtml(t.issueMonth)}</span>`;
    heroImgEl.style.backgroundImage = `url('${(cms.images && cms.images[0]) || (cat && cat.image) || ''}')`;

    contentEl.innerHTML = cms.html || '<p>(empty document)</p>';
    // Re-localize the back link
    const backLink = document.querySelector('.article-page__back-link span:last-child');
    if (backLink) backLink.textContent = t.backToMenu;
  }

  /* ---------- INIT ---------- */
  function init() {
    // Hide the loader FIRST — before anything that could throw — so the page
    // can never get stuck on the loading screen.
    hideLoader();

    try {
      const page = document.body.dataset.page || 'home';
      initCursor();

      if (page === 'home') {
        // Render immediately with baked content — never block on network
        renderMenuGrid();
        setupHomeHeight();
        bindEvents();
        updatePanels();
        // Try CMS in background; if it returns data, refresh the menu + panels
        hydrateFromCms().then((didHydrate) => {
          if (didHydrate) {
            renderMenuGrid();
            syncHomePanelImages();
            syncHomePanelText();
          }
        }).catch(() => {});
      } else if (page === 'article') {
        bindEvents();
        renderArticlePage();
        setupFrostNav();
      }
    } catch (err) {
      // Never let a JS error leave the page stuck behind the loader
      console.error('[asac] init error:', err);
      const l = document.getElementById('loader');
      if (l && l.parentNode) l.remove();
    }
  }

  // Failsafe: whatever happens, the loader is gone within 3s of the page
  // becoming interactive (covers any unforeseen mobile-browser edge case).
  setTimeout(() => {
    const l = document.getElementById('loader');
    if (l && l.parentNode) l.remove();
  }, 3000);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
