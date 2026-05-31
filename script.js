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
        // Replace the original micro-insurance focus article with the dematerialisation piece
        { id: 'focus-0', title: { fr: "Expérience client et dématérialisation de l'assurance auto", en: "Customer experience and dematerialisation of auto insurance" } },
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
        // Update the first job profile to focus on the technical manager
        { id: 'metiers-1', title: { fr: "Le responsable technique", en: "The Technical Manager" } },
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
  // Updated content for the Focus article about customer experience and dematerialisation of auto insurance
  'focus-0': {
      lead: {
        fr: "La dématérialisation de l’assurance automobile au Cameroun marque un tournant majeur pour l’expérience client. L’objectif principal est de simplifier l’expérience des assurés en digitalisant les services et en modernisant la relation client.",
        en: "The dematerialisation of automobile insurance in Cameroon marks a major turning point for customer experience. The main goal is to simplify policyholders' journeys by digitising services and modernising customer relationships.",
      },
      paragraphs: {
        fr: [
          "La digitalisation des services d'assurance permet de réduire les longues procédures administratives, les déplacements en agence et les délais de traitement, offrant ainsi un gain de temps considérable et une meilleure accessibilité pour les assurés.",
          "Elle contribue également à renforcer la confiance en réduisant la fraude documentaire grâce à une meilleure traçabilité des contrats.",
        ],
        en: [
          "The digitisation of insurance services reduces long administrative procedures, branch visits and processing times, providing considerable time savings and better accessibility for policyholders.",
          "It also helps to strengthen trust by reducing document fraud through better contract traceability.",
        ],
      },
      sections: {
        fr: [
          { h: "Un mouvement inspiré d'ailleurs", p: "L’expérience ivoirienne montre que la digitalisation facilite la vérification des contrats et réduit les fraudes, améliorant ainsi la fluidité des services et la confiance des clients." },
          { h: "Accompagner tous les assurés", p: "Le succès de cette transformation passe par un accompagnement personnalisé, car certains clients éprouvent des difficultés avec les outils numériques. La proximité humaine reste essentielle, notamment lors des sinistres." },
          { h: "Une opportunité pour le secteur", p: "En modernisant l’assurance automobile, la dématérialisation améliorera l’expérience client, renforcera la confiance et rapprochera davantage les compagnies d’assurance de leurs clients, contribuant à l’essor du secteur au Cameroun." },
        ],
        en: [
          { h: "A movement inspired elsewhere", p: "The Ivorian experience shows that digitisation makes it easier to verify contracts and reduces fraud, thus improving service fluidity and customer trust." },
          { h: "Supporting all policyholders", p: "The success of this transformation depends on personalised support, as some customers find digital tools challenging. Human proximity remains essential, especially when dealing with claims." },
          { h: "An opportunity for the sector", p: "By modernising automobile insurance, dematerialisation will improve customer experience, strengthen trust and bring insurance companies closer to their customers, contributing to the growth of the sector in Cameroon." },
        ],
      },
      // Use the same featured image as the original focus category
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1600&q=85&auto=format&fit=crop',
    },

    // New article body for the technical manager profile in the "métiers" section
    'metiers-1': {
      lead: {
        fr: "Longtemps considérés comme les solitaires des chiffres, les responsables techniques occupent aujourd'hui un rôle central dans un environnement économique et climatique changeant. Ils ne se contentent plus de calculer le risque, mais donnent un sens aux chiffres pour orienter l'entreprise.",
        en: "Long seen as solitary number crunchers, technical managers now play a central role in a changing economic and climatic environment. They no longer just calculate risk but give meaning to the figures to guide the company.",
      },
      paragraphs: {
        fr: [
          "Le responsable technique jongle entre les lignes Vie et Dommages, tel un sprinteur et un marathonien dans la même journée. En Dommages, il doit réagir rapidement aux tendances d'accidentologie et ajuster les tarifs ; en Vie, il s'engage sur le long terme pour garantir les promesses faites aux clients.",
          "Au-delà des chiffres, il doit savoir communiquer et vulgariser des concepts techniques afin de devenir un véritable partenaire pour les autres départements et convaincre que la rigueur protège véritablement le client.",
        ],
        en: [
          "The technical manager juggles between Life and Non‑Life lines, like both a sprinter and a marathon runner in the same day. In Non‑Life, he must react quickly to accident trends and adjust rates; in Life, he commits for the long term to ensure the promises made to clients.",
          "Beyond numbers, he must know how to communicate and simplify technical concepts to become a true partner to other departments and convince that rigour genuinely protects the customer.",
        ],
      },
      sections: {
        fr: [
          { h: "Une mission d’équilibriste", p: "Faire de la Vie et du Dommages simultanément exige des compétences multiples : réflexes pour le court terme et vision pour le long terme." },
          { h: "Un rôle de pédagogue", p: "Convaincre les équipes que la technique n'est pas un frein mais une garantie pour les assurés est devenu essentiel ; le responsable technique doit partager ses convictions et vulgariser des concepts complexes." },
          { h: "Engagement et convictions", p: "Ce métier repose sur la conviction de protéger des familles et des jeunes : au-delà des probabilités, il s'agit d'un engagement à assurer leur tranquillité d'esprit." },
        ],
        en: [
          { h: "A tightrope mission", p: "Handling both Life and Non‑Life simultaneously requires multiple skills: quick reflexes for the short term and vision for the long term." },
          { h: "An educational role", p: "Convincing teams that technical rigor is not a hindrance but a guarantee for policyholders has become essential; the technical manager must share his convictions and simplify complex concepts." },
          { h: "Commitment and convictions", p: "This profession is based on the conviction of protecting families and youth: beyond probabilities, it's a commitment to ensure their peace of mind." },
        ],
      },
      // Use the same illustrative image as the metiers category
      image: 'https://images.unsplash.com/photo-1521119989659-a83eee488004?w=1600&q=85&auto=format&fit=crop',
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
      // Update the rights line to include the agency credit
      allRights: 'Tous droits réservés – Made by MW DDB Cameroon',
      exploreAll: 'Explorer tous les articles',
      downloadMagazine: 'Télécharger le magazine',
      contributors: 'Ont collaboré',
    },
    en: {
      menuLabel: 'Contents',
      heroSub: "The Magazine of the Association of Insurance Companies of Cameroon",
      scroll: 'Scroll',
      readMore: 'Read article',
      editionLabel: 'Issue',
      // Include agency credit in the English rights string
      allRights: 'All rights reserved – Made by MW DDB Cameroon',
      exploreAll: 'Explore all articles',
      downloadMagazine: 'Download the magazine',
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
    // Only adjust body height when there are panels on the page. On
    // dedicated article pages, panels is empty and we let the natural
    // document height flow.
    if (!panels || panels.length === 0) return;
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
    requestAnimationFrame(updateNavFrost);
  }

  function onResize() {
    setupHomeHeight();
    updatePanels();
    updateNavFrost();
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
    // Prevent the page from scrolling when the menu is open
    // Save the current scroll position and lock the page
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.dataset.scrollY = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
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
    // Restore scroll position and unlock the page
    const y = parseInt(document.body.dataset.scrollY || '0', 10);
    document.body.classList.remove('no-scroll');
    document.documentElement.classList.remove('no-scroll');
    document.body.style.top = '';
    window.scrollTo(0, y);
    delete document.body.dataset.scrollY;
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
    const scrollY = window.scrollY || window.pageYOffset;
    document.body.dataset.scrollY = scrollY;
    document.body.style.top = `-${scrollY}px`;
    document.body.classList.add('no-scroll');
    document.documentElement.classList.add('no-scroll');
    overlay.scrollTop = 0;
  }

  function closeCategory() {
    state.isCategoryOpen = false;
    const overlay = document.getElementById('category');
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    if (!state.isMenuOpen) {
      const y = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, y);
      delete document.body.dataset.scrollY;
    }
  }

  /* ---------- ARTICLE MODAL ---------- */
  function openArticle(articleId, categoryId) {
    // Instead of opening a modal, redirect to a dedicated article page.
    // Compose a URL to the article page with query parameters for the id,
    // category and current language. Using the URL constructor ensures
    // relative paths resolve correctly regardless of deployment environment.
    const url = new URL('article.html', window.location.href);
    url.searchParams.set('id', articleId);
    url.searchParams.set('cat', categoryId);
    url.searchParams.set('lang', state.lang);
    // When navigating away from the overlay we should close any open
    // menu or category panels to reset the page state. This prevents
    // locked scrolling on the destination page.
    closeArticle();
    closeCategory();
    closeMenu();
    window.location.href = url.toString();
  }

  function closeArticle() {
    const modal = document.getElementById('articleModal');
    state.isArticleOpen = false;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    if (!state.isMenuOpen && !state.isCategoryOpen) {
      const y = parseInt(document.body.dataset.scrollY || '0', 10);
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
      document.body.style.top = '';
      window.scrollTo(0, y);
      delete document.body.dataset.scrollY;
    }
  }

  /* ---------- ARTICLE PAGE RENDERING ---------- */
  /**
   * If this script is running on the dedicated article page, build the
   * article content dynamically based on the query parameters. The
   * expected query string includes an `id` (article id), an optional
   * `cat` (category id) and an optional `lang` which sets the
   * language. If no category is provided, the function searches all
   * categories for an article with the given id. The page must
   * contain an element with id `articlePage` to receive the output.
   */
  function renderArticlePage() {
    const container = document.getElementById('articlePage');
    if (!container) return;
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('id');
    let categoryId = params.get('cat');
    const langParam = params.get('lang');
    if (langParam && (langParam === 'fr' || langParam === 'en')) {
      state.lang = langParam;
    }
    // Attempt to find the category by id; if not found search for the article
    let cat = CATEGORIES.find((c) => c.id === categoryId);
    if (!cat) {
      for (const c of CATEGORIES) {
        if (c.articles.some((a) => a.id === articleId)) {
          cat = c;
          categoryId = c.id;
          break;
        }
      }
    }
    if (!cat) return;
    const article = cat.articles.find((a) => a.id === articleId);
    if (!article) return;
    // Set the language buttons to the appropriate state
    applyLang();
    const body = ARTICLE_BODIES[articleId] || makeGenericBody(article, cat);
    const heroImg = body.image || cat.image;
    const lead = body.lead[state.lang];
    const paragraphs = body.paragraphs[state.lang];
    const sections = body.sections[state.lang];
    // Compose HTML for the article page. We use semantic elements for
    // better accessibility and SEO. The hero section contains the
    // background image with an overlay; the body section holds the
    // article metadata and content.
    const heroHtml = `
      <section class="article-page__hero" style="background-image:url('${heroImg}')">
        <div class="article-page__hero-overlay"></div>
        <div class="article-page__hero-content">
          <span class="article-page__cat">${escapeHtml(cat.name[state.lang])}</span>
          <h1 class="article-page__title">${escapeHtml(article.title[state.lang])}</h1>
          <div class="article-page__meta">
            <span>${state.lang === 'fr' ? 'Juin 2026' : 'June 2026'}</span>
            <span>${state.lang === 'fr' ? '6 min de lecture' : '6 min read'}</span>
          </div>
        </div>
      </section>
    `;
    const bodyHtml = `
      <section class="article-page__body">
        <p class="article-page__lead">${escapeHtml(lead)}</p>
        ${paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join('')}
        <div class="article-page__image" style="background-image:url('${cat.image}')"></div>
        ${sections.map((s) => `<h3>${escapeHtml(s.h)}</h3><p>${escapeHtml(s.p)}</p>`).join('')}
      </section>
    `;
    container.innerHTML = heroHtml + bodyHtml;
    // Ensure the nav is scrolled to top on page load
    window.scrollTo(0, 0);
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

  /**
   * Update the frosted state of the fixed navigation bar. When the
   * visitor scrolls down on the home page or the menu overlay, the
   * nav should gain a translucent background with blur to remain
   * legible. This function checks both the global scroll position
   * and the menu scroll. If the menu is open, we base the decision
   * on the menu's scrollTop. Otherwise, we look at the window's
   * scrollY. It is called from the global scroll handler and the
   * menu scroll listener.
   */
  function updateNavFrost() {
    const nav = document.getElementById('nav');
    const menu = document.getElementById('menu');
    if (!nav) return;
    // Determine how far the user has scrolled. When the menu is open
    // we base the ratio on the menu's scrollTop; otherwise we use
    // window.scrollY. The ratio is clamped between 0 and 1 over the
    // first 100 pixels of scroll. As the ratio increases the nav
    // becomes more opaque and the blur becomes stronger, creating a
    // progressive frosted effect.
    let scrollPos = 0;
    if (state.isMenuOpen && menu) {
      scrollPos = menu.scrollTop;
    } else {
      scrollPos = window.scrollY;
    }
    const ratio = Math.min(1, Math.max(0, scrollPos / 100));
    if (ratio > 0) {
      nav.classList.add('is-frosted');
      // Compute opacity and blur based on ratio. Use different base
      // colours depending on dark/light context (nav.is-dark is set
      // when the menu is open).
      if (nav.classList.contains('is-dark')) {
        const alpha = 0.85 * ratio;
        nav.style.background = `rgba(246, 244, 239, ${alpha.toFixed(3)})`;
      } else {
        const alpha = 0.6 * ratio;
        nav.style.background = `rgba(10, 10, 10, ${alpha.toFixed(3)})`;
      }
      const blur = 2 + ratio * 8;
      nav.style.backdropFilter = `blur(${blur.toFixed(2)}px) saturate(1.2)`;
      nav.style.webkitBackdropFilter = `blur(${blur.toFixed(2)}px) saturate(1.2)`;
      nav.style.boxShadow = nav.classList.contains('is-dark')
        ? '0 2px 6px rgba(0, 0, 0, 0.05)'
        : '0 2px 6px rgba(0, 0, 0, 0.4)';
    } else {
      nav.classList.remove('is-frosted');
      nav.style.background = '';
      nav.style.backdropFilter = '';
      nav.style.webkitBackdropFilter = '';
      nav.style.boxShadow = '';
    }
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

    // When the content menu scrolls, update the nav frosted state.
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.addEventListener('scroll', () => {
        updateNavFrost();
      });
    }

    // Category close (only attach if the element exists)
    const categoryCloseBtn = document.getElementById('categoryClose');
    if (categoryCloseBtn) {
      categoryCloseBtn.addEventListener('click', closeCategory);
    }
    // Article modal close buttons are only present on the home page; guard for their presence
    const articleCloseBtn = document.getElementById('articleClose');
    if (articleCloseBtn) {
      articleCloseBtn.addEventListener('click', closeArticle);
    }
    const articleBackdrop = document.getElementById('articleBackdrop');
    if (articleBackdrop) {
      articleBackdrop.addEventListener('click', closeArticle);
    }

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
    // On every page, attempt to render an article. If the page does not
    // contain an #articlePage element this call does nothing. The
    // language parameter in the URL (if present) is applied to state.lang.
    renderArticlePage();

    // The stacked panel and menu functionality is only relevant on
    // the home page (index.html). The following calls will have no
    // adverse effect on other pages because they gracefully handle
    // missing elements.
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
