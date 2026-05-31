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
        { id: 'edito-1', title: { fr: "Le mot du Directeur de Publication", en: "A word from the Publisher" } },
        { id: 'edito-2', title: { fr: "Bâtir la confiance, ensemble", en: "Building trust together" } },
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
        { id: 'focus-0', title: { fr: "La micro-assurance, levier d'inclusion financière au Cameroun", en: "Micro-insurance, a lever for financial inclusion in Cameroon" } },
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
        { id: 'metiers-1', title: { fr: "Portrait : l'actuaire, ce stratège discret", en: "Profile: the actuary, a quiet strategist" } },
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
      lead: {
        fr: "Avec un taux de pénétration encore modeste, l'assurance au Cameroun cherche sa voie populaire. La micro-assurance s'impose progressivement comme une réponse adaptée aux réalités sociales et économiques du pays.",
        en: "With a still modest penetration rate, insurance in Cameroon is searching for a popular path. Micro-insurance is gradually emerging as a fit response to the country's social and economic realities.",
      },
      paragraphs: {
        fr: [
          "Dans un pays où plus de 70% de la population active évolue dans le secteur informel, l'idée même de souscrire une police d'assurance peut paraître lointaine. Pourtant, les besoins sont là, criants : protéger une récolte, sécuriser une moto-taxi, couvrir les frais médicaux d'une famille. Et c'est précisément à cette demande latente que la micro-assurance tente de répondre.",
          "Les acteurs du secteur l'ont bien compris. En multipliant les partenariats avec les coopératives, les associations communautaires et les opérateurs de téléphonie mobile, ils ont rapproché l'assurance des populations rurales et péri-urbaines. Le résultat ? Des produits simples, abordables, payables au mois ou même à la journée.",
        ],
        en: [
          "In a country where more than 70% of the active workforce operates in the informal sector, the very idea of subscribing to an insurance policy can feel remote. Yet the needs are pressing: protecting a harvest, securing a motorbike-taxi, covering a family's medical costs. Micro-insurance aims precisely at this latent demand.",
          "Industry players have understood this. By multiplying partnerships with cooperatives, community associations and mobile operators, they have brought insurance closer to rural and peri-urban populations. The result: simple, affordable products, payable monthly or even daily.",
        ],
      },
      sections: {
        fr: [
          { h: "Une révolution silencieuse", p: "Loin des projecteurs, des entrepreneurs camerounais réinventent les modèles de distribution. À Douala, Yaoundé, Bafoussam ou Garoua, des plateformes mobiles permettent désormais de souscrire un contrat en quelques minutes, depuis un simple téléphone. Cette accessibilité change profondément le rapport à l'assurance : elle n'est plus un produit réservé à l'élite urbaine, mais un outil du quotidien." },
          { h: "Les défis qui restent", p: "Le chemin reste cependant long. La culture du risque doit encore être travaillée, la confiance regagnée, les processus de remboursement simplifiés. Mais les premiers résultats sont encourageants : selon les chiffres du secteur, le nombre de micro-assurés a doublé en cinq ans, et plusieurs études anticipent une croissance soutenue à l'horizon 2030." },
        ],
        en: [
          { h: "A quiet revolution", p: "Far from the spotlight, Cameroonian entrepreneurs are reinventing distribution models. In Douala, Yaoundé, Bafoussam or Garoua, mobile platforms now make it possible to take out a contract within minutes, from a simple phone. This accessibility profoundly changes the relationship with insurance: it is no longer a product reserved for the urban elite, but a tool of daily life." },
          { h: "Challenges that remain", p: "The road ahead is still long. Risk culture must be cultivated, trust regained, claims simplified. But early results are encouraging: according to industry figures, the number of micro-insured customers has doubled in five years, and several studies anticipate sustained growth through 2030." },
        ],
      },
      image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1600&q=85&auto=format&fit=crop',
    },
  };

  /* ---------- STATE ---------- */
  const state = {
    lang: 'fr',
    panelIndex: 0,
    isMenuOpen: false,
    isCategoryOpen: false,
    isArticleOpen: false,
  };

  /* ---------- I18N ---------- */
  const I18N = {
    fr: {
      menuLabel: 'Sommaire',
      heroSub: "Le Magazine de l'Association des Sociétés d'Assurance du Cameroun",
      scroll: 'Faites défiler',
      readMore: "Lire l'article",
      editionLabel: 'Édition',
      allRights: 'Tous droits réservés',
      exploreAll: 'Explorer tous les articles',
      contributors: 'Ont collaboré',
    },
    en: {
      menuLabel: 'Contents',
      heroSub: "The Magazine of the Association of Insurance Companies of Cameroon",
      scroll: 'Scroll',
      readMore: 'Read article',
      editionLabel: 'Issue',
      allRights: 'All rights reserved',
      exploreAll: 'Explore all articles',
      contributors: 'Also contributed',
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
    if (state.isCategoryOpen) {
      const curr = document.getElementById('category').dataset.current;
      if (curr) openCategory(curr, true);
    }
  }

  /* ---------- LOADER ---------- */
  function hideLoader() {
    const l = document.getElementById('loader');
    setTimeout(() => l.classList.add('is-hidden'), 1400);
    setTimeout(() => l.remove(), 2200);
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
    });

    // Determine active panel index for nav state, scroll progress, etc.
    const idx = Math.min(panels.length - 1, Math.floor(scrollY / vh + 0.5));
    if (idx !== state.panelIndex) {
      state.panelIndex = idx;
    }
  }

  function onScroll() {
    requestAnimationFrame(updatePanels);
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

  function openMenu() {
    state.isMenuOpen = true;
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menu.classList.add('is-open');
    menu.setAttribute('aria-hidden', 'false');
    btn.classList.add('is-open');
    nav.classList.add('is-dark');
    document.body.classList.add('no-scroll');
    menu.scrollTop = 0;
  }

  function closeMenu() {
    state.isMenuOpen = false;
    const menu = document.getElementById('menu');
    const btn = document.getElementById('menuBtn');
    const nav = document.getElementById('nav');
    menu.classList.remove('is-open');
    menu.setAttribute('aria-hidden', 'true');
    btn.classList.remove('is-open');
    nav.classList.remove('is-dark');
    document.body.classList.remove('no-scroll');
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
        openArticle(el.dataset.art, el.dataset.cat);
      });
    });

    state.isCategoryOpen = true;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    overlay.scrollTop = 0;
  }

  function closeCategory() {
    state.isCategoryOpen = false;
    const overlay = document.getElementById('category');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (!state.isMenuOpen) document.body.classList.remove('no-scroll');
  }

  /* ---------- ARTICLE MODAL ---------- */
  function openArticle(articleId, categoryId) {
    const cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) return;
    const article = cat.articles.find((a) => a.id === articleId);
    if (!article) return;

    const body = ARTICLE_BODIES[articleId] || makeGenericBody(article, cat);
    const heroImg = body.image || cat.image;
    const lead = body.lead[state.lang];
    const paragraphs = body.paragraphs[state.lang];
    const sections = body.sections[state.lang];

    const content = document.getElementById('articleContent');
    const bodyHtml = `
      <span class="article__cat">${escapeHtml(cat.name[state.lang])}</span>
      <h1 class="article__title">${escapeHtml(article.title[state.lang])}</h1>
      <div class="article__meta">
        <span>${state.lang === 'fr' ? 'Mars 2025' : 'March 2025'}</span>
        <span>${state.lang === 'fr' ? '6 min de lecture' : '6 min read'}</span>
      </div>
      <p class="article__lead">${escapeHtml(lead)}</p>
      ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
      <div class="article__image" style="background-image:url('${cat.image}')"></div>
      ${sections.map((s) => `<h3>${escapeHtml(s.h)}</h3><p>${escapeHtml(s.p)}</p>`).join('')}
    `;
    content.innerHTML = `
      <div class="article__hero" style="background-image:url('${heroImg}')"></div>
      <div class="article__body">${bodyHtml}</div>
    `;

    // Move children up out of nested wrappers for the stagger to work on each piece
    // (We keep the structure; the CSS stagger targets direct children, but our structure here
    //  already has hero + body as direct children, which is fine.)

    const modal = document.getElementById('articleModal');
    state.isArticleOpen = true;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('no-scroll');
    const inner = modal.querySelector('.article-modal__inner');
    inner.scrollTop = 0;
  }

  function closeArticle() {
    const modal = document.getElementById('articleModal');
    state.isArticleOpen = false;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!state.isMenuOpen && !state.isCategoryOpen) {
      document.body.classList.remove('no-scroll');
    }
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

  /* ---------- EVENT WIRING ---------- */
  function bindEvents() {
    // Language switching
    document.querySelectorAll('.lang-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        state.lang = btn.dataset.lang;
        applyLang();
      });
    });

    // Menu button
    document.getElementById('menuBtn').addEventListener('click', toggleMenu);

    // Logo - go home
    document.querySelectorAll('[data-action="home"]').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        closeArticle();
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

    // Home featured panels click -> open article directly
    document.querySelectorAll('.panel__content--feature').forEach((el) => {
      el.addEventListener('click', () => {
        const artId = el.dataset.article;
        // Find category by article id
        const cat = CATEGORIES.find((c) => c.articles.some((a) => a.id === artId));
        if (cat) openArticle(artId, cat.id);
      });
    });

    // Category close
    document.getElementById('categoryClose').addEventListener('click', closeCategory);

    // Article close
    document.getElementById('articleClose').addEventListener('click', closeArticle);
    document.getElementById('articleBackdrop').addEventListener('click', closeArticle);

    // ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.isArticleOpen) return closeArticle();
        if (state.isCategoryOpen) return closeCategory();
        if (state.isMenuOpen) return closeMenu();
      }
    });

    // Scroll
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  }

  /* ---------- INIT ---------- */
  function init() {
    renderMenuGrid();
    setupHomeHeight();
    bindEvents();
    updatePanels();
    initCursor();
    hideLoader();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
