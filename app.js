/* ============================================
   ASAC MAGAZINE — app.js
   State-machine navigation, bilingual, no overlaps.
============================================ */

const ARTICLES = {
  editorial: [{
    // Updated editorial with a welcoming note from the editors.  The
    // accompanying image depicts professionals collaborating to
    // symbolise the collective effort behind the insurance sector.
    title_fr: "Édito : Éclairage sur notre secteur",
    title_en: "Editorial: Shedding light on our sector",
    img: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80",
    content_fr: `<p>Chers lecteurs,</p>
    <p>Au fil des décennies, notre marché des assurances a changé de visage. Les défis restent nombreux mais une conviction demeure : l'assurance est un pilier indispensable au développement de notre pays.</p>
    <p>Dans ce numéro anniversaire, nous mettons en lumière les hommes et les femmes qui œuvrent dans l'ombre pour sécuriser nos vies et nos biens. De la technicité des métiers aux innovations digitales, plongez au cœur d'un secteur en pleine mutation.</p>
    <p>Bonne lecture !</p>
    <p><em>La Rédaction</em></p>`,
    content_en: `<p>Dear readers,</p>
    <p>Over the decades our insurance market has changed face. Challenges abound but one conviction remains: insurance is an essential pillar of our country’s development.</p>
    <p>In this anniversary issue we shine a light on the men and women who work behind the scenes to secure our lives and property. From the technical professions to digital innovations, dive into a sector in full transformation.</p>
    <p>Happy reading!</p>
    <p><em>The Editorial Team</em></p>`
  }],
  actualite: [
    { title_fr: "Fusion approuvée pour Sanlam et Allianz", title_en: "Merger approved for Sanlam and Allianz", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
      content_fr: `<p>Les autorités de régulation de Côte d'Ivoire et du Sénégal ont approuvé la fusion des filiales d'assurance de Sanlam et d'Allianz. Cette opération crée l'un des plus grands groupes d'assurance de la sous-région.</p><p><strong>Cette fusion représente une étape majeure dans la consolidation du marché des assurances en Afrique subsaharienne.</strong></p>`,
      content_en: `<p>Regulatory authorities in Côte d'Ivoire and Senegal have approved the merger of Sanlam and Allianz insurance subsidiaries, creating one of the largest groups in the sub-region.</p>` },
    { title_fr: "Les assureurs célèbrent la Journée des droits des femmes", title_en: "Insurers celebrate International Women's Rights Day", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80",
      content_fr: `<p>Le secteur des assurances au Cameroun a célébré la Journée internationale des droits des femmes. De nombreuses compagnies ont organisé des événements pour mettre en valeur le rôle des femmes dans l'industrie.</p>`,
      content_en: `<p>The Cameroonian insurance sector celebrated International Women's Rights Day with special events highlighting women's role in the industry.</p>` }
  ],
  evenement: [{ title_fr: "48ème Assemblée Générale de la FANAF à Nouakchott", title_en: "48th General Assembly of FANAF in Nouakchott", img: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
    content_fr: `<p>La 48ème Assemblée Générale de la FANAF s'est tenue à Nouakchott, en Mauritanie, réunissant des professionnels de toute la zone francophone.</p><p><strong>Les thèmes incluaient la digitalisation, l'inclusion financière et les défis réglementaires.</strong></p>`,
    content_en: `<p>The 48th FANAF General Assembly in Nouakchott brought together insurance professionals from across the French-speaking zone.</p>` }],
  focus: [{
    title_fr: "La dématérialisation de l’assurance automobile au Cameroun",
    title_en: "Digitalisation of auto insurance in Cameroon",
    // Use a relevant image illustrating digitalisation of auto insurance
    img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80",
    content_fr: `<p>Le secteur de l’assurance automobile au Cameroun entre progressivement dans une nouvelle ère marquée par la digitalisation des services et la modernisation de la relation client. Longtemps confronté à des problématiques telles que les longues procédures administratives, les déplacements en agence, les délais de traitement ou encore la fraude documentaire, le marché camerounais amorce aujourd’hui une transformation qui place davantage le client au centre des préoccupations.</p>
    <p>L’objectif principal de cette dématérialisation est de simplifier l’expérience des assurés. Grâce aux outils numériques, certaines opérations comme la souscription, le renouvellement des contrats, la transmission des documents ou les paiements peuvent désormais être réalisés plus rapidement et avec moins de contraintes. Pour les clients, cela représente un gain de temps considérable, une meilleure accessibilité des services et une relation plus fluide avec leur compagnie d’assurance.</p>
    <p>Cette transformation répond également à un enjeu majeur de confiance. Au Cameroun, la circulation de fausses attestations d’assurance automobile a longtemps fragilisé la crédibilité du secteur. La digitalisation permet ainsi d’améliorer la traçabilité des contrats et de renforcer les dispositifs de contrôle afin de sécuriser davantage les assurés.</p>
    <p>L’expérience ivoirienne constitue d’ailleurs un exemple intéressant pour le marché camerounais. En Côte d’Ivoire, plusieurs avancées ont été réalisées dans la digitalisation de l’assurance automobile, notamment avec la mise en place de solutions numériques facilitant la vérification des contrats et la réduction des fraudes. Cette modernisation a permis d’améliorer la fluidité des services tout en renforçant la confiance des clients envers les assureurs.</p>
    <p>Cependant, la réussite d’une telle transformation ne dépend pas uniquement de la technologie. Elle nécessite également un important travail d’accompagnement des clients. Tous les assurés ne maîtrisent pas forcément les outils numériques, et certains peuvent éprouver des difficultés face à des procédures entièrement digitalisées. Le risque serait alors de créer une nouvelle forme de frustration ou d’exclusion pour une partie de la clientèle.</p>
    <p>Par ailleurs, dans le domaine des assurances, le besoin de proximité humaine reste essentiel. Même à l’ère du digital, les clients souhaitent continuer à être conseillés, rassurés et accompagnés, notamment dans des situations sensibles comme les sinistres ou les réclamations. La digitalisation ne doit donc pas remplacer la relation humaine, mais plutôt la renforcer en rendant les échanges plus simples et plus efficaces.</p>
    <p>La dématérialisation de l’assurance automobile représente ainsi une véritable opportunité pour améliorer durablement l’expérience client au Cameroun. Elle contribuera à moderniser l’image du secteur, renforcer la confiance des consommateurs et rapprocher davantage les compagnies d’assurances de leurs clients.</p>
    <p><em>Sources : ASAC Cameroun ; Financial Afrik – Digitalisation des assurances en Afrique ; Atlas Magazine – Assurance automobile en zone CIMA.</em></p>`,
    content_en: `<p>The automotive insurance sector in Cameroon is gradually entering a new era marked by digitalisation of services and modernised customer relations. Long plagued by long procedures, visits to branches, processing delays and document fraud, the market is embarking on a transformation that puts the customer at the centre of its concerns.</p>
    <p>The main objective of this dematerialisation is to simplify the policyholder experience. Thanks to digital tools, operations such as subscribing, renewing policies, submitting documents and making payments can now be carried out more quickly and with fewer constraints. For customers, this means considerable time savings, better access to services and a smoother relationship with their insurer.</p>
    <p>This transformation also addresses a major issue of trust. In Cameroon, the circulation of fake auto insurance certificates has long undermined the credibility of the sector. Digitalisation therefore improves contract traceability and strengthens control measures to better secure policyholders.</p>
    <p>The Ivorian experience also provides an interesting example for the Cameroonian market. In Côte d’Ivoire, several advances have been made in the digitalisation of auto insurance, notably with the implementation of solutions that facilitate contract verification and reduce fraud. This modernisation has improved service fluidity while increasing customer trust in insurers.</p>
    <p>However, the success of such a transformation does not depend solely on technology. It also requires extensive support for customers. Not all policyholders necessarily master digital tools, and some may find fully digital procedures difficult. The risk would then be to create a new form of frustration or exclusion for part of the clientele.</p>
    <p>Furthermore, in the field of insurance, the need for human proximity remains essential. Even in the digital age, customers still want to be advised, reassured and accompanied, particularly in sensitive situations such as claims or complaints. Digitalisation must therefore not replace human relations, but rather strengthen them by making exchanges simpler and more efficient.</p>
    <p>Dematerialising auto insurance thus represents a genuine opportunity to sustainably improve the customer experience in Cameroon. It will help modernise the sector’s image, strengthen consumer trust and bring insurance companies closer to their clients.</p>
    <p><em>Sources: ASAC Cameroon; Financial Afrik – Digitalisation des assurances en Afrique; Atlas Magazine – Assurance automobile en zone CIMA.</em></p>`
  }],
  vie: [{ title_fr: "Renforcer la gouvernance du secteur", title_en: "Strengthening sector governance", img: "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80",
    content_fr: `<p>L'ASAC poursuit ses efforts pour renforcer la gouvernance des assurances au Cameroun avec de nouvelles initiatives pour la transparence et la protection des assurés.</p>`,
    content_en: `<p>ASAC continues its efforts to strengthen insurance governance in Cameroon with new transparency initiatives.</p>` }],
  bouge: [
    { title_fr: "Nouvelles nominations au sein du secteur", title_en: "New appointments in the sector", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      content_fr: `<p>Le secteur enregistre plusieurs nominations importantes reflétant le dynamisme des équipes dirigeantes.</p>`, content_en: `<p>The sector records several important appointments reflecting management dynamism.</p>` },
    { title_fr: "Lancement de nouveaux produits d'assurance vie", title_en: "Launch of new life insurance products", img: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
      content_fr: `<p>Plusieurs compagnies ont lancé de nouveaux produits d'assurance vie innovants.</p>`, content_en: `<p>Several companies launched innovative new life insurance products.</p>` }
  ],
  avis: [{ title_fr: "Ce que pensent vraiment les assurés", title_en: "What policyholders really think", img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80",
    content_fr: `<p>Notre enquête annuelle révèle un tableau nuancé de la perception du secteur par le grand public.</p><p><strong>Les assurés souhaitent des procédures de sinistres plus rapides et une meilleure communication.</strong></p>`,
    content_en: `<p>Our annual survey reveals a nuanced picture of public perception of the sector.</p>` }],
  metiers: [{
    title_fr: "Le responsable technique : on sort enfin de l'ombre",
    title_en: "The Technical Director: coming out of the shadows",
    // Use a representative image of an insurance professional for the metiers article
    img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    content_fr: `<p>On a longtemps été vus comme les « solitaires des chiffres », ceux qui vivent dans des classeurs Excel avec la climatisation à fond. Mais aujourd'hui, avec le climat qui s'emballe et l'économie qui joue aux montagnes russes, nous sommes devenus ceux qui tiennent le volant. On ne se contente plus de calculer le risque : on essaie de lui donner un sens pour que l'entreprise sache où elle va.</p>
    <p><strong>Le grand écart de tous les jours :</strong></p>
    <p>Faire de la Vie et du Dommages en même temps, c'est un peu comme être sprinteur et marathonien dans la même journée :</p>
    <p><em>En Dommages (Auto, Habitation)</em> : c’est l’adrénaline. On est dans le concret, l'immédiat. Pourquoi les accidents augmentent‑ils sur telle zone ? Comment rester justes dans nos prix sans perdre tout le monde ? C'est une question de réflexes et d'instinct.</p>
    <p><em>En Vie</em> : on s'inscrit dans le temps long. On signe des contrats pour les trente prochaines années. C’est une responsabilité immense : s’assurer qu’on pourra honorer nos promesses dans une génération, quoi qu’il arrive.</p>
    <p><strong>Parler le même langage que les autres</strong></p>
    <p>C’est peut‑être le plus gros changement : on n'est plus les « rabat‑joie » qui disent non aux commerciaux. Nous sommes devenus des partenaires. Notre défi, c'est de réussir à expliquer des choses très complexes avec des mots simples. Être rigoureux sur les chiffres, ce n'est pas être méchant ; c'est juste s'assurer que le client sera vraiment protégé le jour où il en aura besoin.</p>
    <p><strong>Au fond, une question de convictions</strong></p>
    <p>On ne fait pas ce métier par amour des probabilités. On le fait parce qu'en équilibrant un contrat, on protège une famille qui vient de tout perdre ou un jeune qui prépare son avenir. C'est un métier de rigueur, c'est vrai, mais c'est surtout un métier d'engagement. Nous sommes les gardiens d'une certaine tranquillité d'esprit.</p>
    <p>Mispa MBONDI</p>`,
    content_en: `<p>For a long time we were seen as solitary number crunchers, holed up with spreadsheets and air‑conditioning. But today, as the climate heats up and the economy rides a roller coaster, we’ve become the ones at the wheel. We no longer just calculate risk – we try to give it meaning so that the company knows where it’s heading.</p>
    <p><strong>The daily balancing act:</strong></p>
    <p>Handling both life and general insurance is a bit like being a sprinter and a marathon runner in the same day:</p>
    <p><em>In Property & Casualty (Auto, Home)</em>: it’s about adrenaline and immediacy. Why are accidents increasing in a given area? How can we keep premiums fair without losing everyone? It’s a question of reflexes and instinct.</p>
    <p><em>In Life insurance</em>: we’re in it for the long haul. We sign contracts for the next thirty years. It’s a huge responsibility to ensure we can honour our promises a generation from now, whatever happens.</p>
    <p><strong>Speaking the same language</strong></p>
    <p>Perhaps the biggest change is that we are no longer the killjoys who say no to the sales team. We’ve become partners. Our challenge is to explain very complex matters in simple words. Being rigorous with numbers isn’t being mean; it’s about making sure the client is truly protected when they need it.</p>
    <p><strong>Ultimately, a question of conviction</strong></p>
    <p>We don’t do this job out of love for probabilities. We do it because balancing a contract protects a family that has just lost everything or a young person preparing for their future. It’s a job of rigour, yes, but above all a job of commitment. We are guardians of peace of mind.</p>
    <p>Mispa MBONDI</p>`
  }],
  emploi: [
    { title_fr: "Responsable Actuariat — Yaoundé", title_en: "Actuarial Manager — Yaoundé", img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80",
      content_fr: `<p><strong>Compagnie d'Assurances du Cameroun</strong> · Yaoundé · CDI</p><p>Missions : modélisation des risques, provisions techniques, reporting CIMA.</p>`,
      content_en: `<p><strong>Insurance Company of Cameroon</strong> · Yaoundé · Permanent</p>` },
    { title_fr: "Chargé de Sinistres — Douala", title_en: "Claims Officer — Douala", img: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
      content_fr: `<p><strong>Activa Assurances</strong> · Douala · CDI</p><p>Gestion des sinistres de l'ouverture à la clôture.</p>`,
      content_en: `<p><strong>Activa Assurances</strong> · Douala · Permanent</p>` }
  ],
  fun: [{ title_fr: "Quiz : Testez vos connaissances !", title_en: "Quiz: Test your knowledge!", img: "https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&q=80",
    content_fr: `<p>🎯 <strong>Quiz Assurance du mois</strong></p><p><strong>Q1 :</strong> Durée de prescription en assurance selon le Code CIMA ?<br>A) 1 an · B) 2 ans · C) 5 ans · D) 10 ans</p><p><em>Réponses dans le prochain numéro !</em></p>`,
    content_en: `<p>🎯 <strong>Monthly Insurance Quiz</strong></p><p><strong>Q1:</strong> Statute of limitations under CIMA Code?<br>A) 1 yr · B) 2 yrs · C) 5 yrs · D) 10 yrs</p>` }],
  membres: [
    { title_fr: "Activa Assurances", title_en: "Activa Assurances", img: "https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80", content_fr: `<p>L'une des principales compagnies au Cameroun, produits vie et non-vie. Fondée en 1999.</p>`, content_en: `<p>One of Cameroon's leading insurers. Founded in 1999.</p>` },
    { title_fr: "Chanas Assurances", title_en: "Chanas Assurances", img: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80", content_fr: `<p>Reconnue pour la qualité de ses services dans les branches auto, habitation, santé et vie.</p>`, content_en: `<p>Recognized for quality service in auto, home, health and life.</p>` },
    { title_fr: "Allianz Cameroun", title_en: "Allianz Cameroun", img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80", content_fr: `<p>Filiale du groupe Allianz, expertise internationale adaptée au marché local.</p>`, content_en: `<p>Part of the global Allianz group with local expertise.</p>` },
    { title_fr: "NSIA Cameroun", title_en: "NSIA Cameroun", img: "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=800&q=80", content_fr: `<p>Groupe panafricain d'assurance avec des solutions innovantes pour les Camerounais.</p>`, content_en: `<p>Pan-African group with innovative solutions for Cameroonians.</p>` }
  ]
};

const CAT = {
  editorial:{ fr:"ÉDITORIAL", en:"EDITORIAL", img:"https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800&q=80" },
  actualite:{ fr:"ACTUALITÉ", en:"NEWS",      img:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80" },
  evenement:{ fr:"ÉVÈNEMENT", en:"EVENT",      img:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80" },
  focus:    { fr:"FOCUS",     en:"FOCUS",      img:"https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80" },
  vie:      { fr:"VIE DE L'ASAC", en:"ASAC LIFE", img:"https://images.unsplash.com/photo-1556761175-4b46a572b786?w=800&q=80" },
  bouge:    { fr:"ÇA BOUGE !",    en:"ON THE MOVE!", img:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  avis:     { fr:"VOTRE AVIS COMPTE", en:"YOUR OPINION MATTERS", img:"https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&q=80" },
  metiers:  { fr:"LES MÉTIERS",    en:"INSURANCE CAREERS", img:"https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80" },
  emploi:   { fr:"EMPLOI",        en:"EMPLOYMENT", img:"https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=80" },
  fun:      { fr:"INSTANT FUN",   en:"FUN TIME",   img:"https://images.unsplash.com/photo-1509869175650-a1d97972541a?w=800&q=80" },
  membres:  { fr:"MEMBRES",       en:"MEMBERS",    img:"https://images.unsplash.com/photo-1560472355-536de3962603?w=800&q=80" },
};

// ─── STATE ──────────────
let lang = 'fr';
let stack = ['home'];
const P = {
  home:     document.getElementById('homePage'),
  menu:     document.getElementById('menuPage'),
  article:  document.getElementById('articlePage'),
  category: document.getElementById('categoryPage'),
};

function render() {
  const top = stack[stack.length - 1];
  const sec = stack.length > 1 ? stack[stack.length - 2] : null;
  Object.entries(P).forEach(([k, el]) => {
    el.classList.remove('active', 'behind');
    if (k === top) el.classList.add('active');
    else if (k === sec) el.classList.add('behind');
  });

  // Show or hide the fixed top bar depending on which page is active. The
  // top bar is only visible on the home page; other pages (menu, article,
  // category) have their own navigation controls.  We also reset the
  // hamburger state when leaving the menu.
  const tb = document.getElementById('topBar');
  if (tb) {
    if (top === 'home') {
      tb.style.display = 'flex';
    } else {
      tb.style.display = 'none';
    }
  }
}

// ─── NAV ──────────────
function showHome() {
  stack = ['home'];
  document.getElementById('hamburger').classList.remove('open');
  render();
  P.home.scrollTop = 0;
}

function toggleMenu() {
  const h = document.getElementById('hamburger');
  if (stack[stack.length - 1] === 'menu') {
    stack.pop();
    h.classList.remove('open');
    resetAnim();
  } else {
    if (!stack.includes('menu')) stack.push('menu');
    h.classList.add('open');
    requestAnimationFrame(() => { P.menu.classList.add('active'); resetAnim(); });
  }
  render();
}

function resetAnim() {
  document.querySelectorAll('#menuPage .m-card').forEach(c => {
    c.style.animation = 'none'; void c.offsetHeight; c.style.animation = '';
  });
}

function openCategory(key) {
  const m = CAT[key], arts = ARTICLES[key] || [];
  document.getElementById('catPageLabel').textContent = m[lang] || m.fr;
  document.getElementById('catHeroImg').src = m.img;
  document.getElementById('catHeroText').innerHTML = '<h2>' + (m[lang] || m.fr) + '</h2>';

  const list = document.getElementById('categoryList');
  list.innerHTML = '';
  arts.forEach((a, i) => {
    const t = a['title_' + lang] || a.title_fr;
    const s = trunc(strip(a['content_' + lang] || a.content_fr), 80);
    const d = document.createElement('div');
    d.className = 'cat-item'; d.onclick = () => openArticle(key, i);
    d.innerHTML = `<div class="cat-thumb"><img src="${a.img}" alt="" loading="lazy"/></div>
      <div class="cat-info"><strong>${t}</strong><p>${s}</p></div>
      <span class="cat-arrow"><img src="arrow_red.svg" alt="→"/></span>`;
    list.appendChild(d);
  });

  if (stack[stack.length - 1] === 'menu') {
    stack[stack.length - 1] = 'category';
    document.getElementById('hamburger').classList.remove('open');
  } else { stack.push('category'); }
  render(); P.category.scrollTop = 0;
}
function closeCategory() { stack.pop(); render(); }

function openArticle(key, i) {
  const m = CAT[key], a = (ARTICLES[key] || [])[i]; if (!a) return;
  document.getElementById('articleCatLabel').textContent = m[lang] || m.fr;
  document.getElementById('articleHeroImg').src = a.img;
  document.getElementById('articleTitle').textContent = a['title_' + lang] || a.title_fr;
  document.getElementById('articleContent').innerHTML = a['content_' + lang] || a.content_fr;
  const arts = ARTICLES[key] || [];
  document.getElementById('articleNextImg').src = (arts[(i+1)%arts.length] || a).img;
  if (stack[stack.length - 1] !== 'article') stack.push('article');
  render(); P.article.scrollTop = 0;
}
function closeArticle() { stack.pop(); render(); }

// ─── LANG ──────────────
function toggleLang() {
  lang = lang === 'fr' ? 'en' : 'fr';
  document.getElementById('langFR').classList.toggle('active', lang === 'fr');
  document.getElementById('langEN').classList.toggle('active', lang === 'en');
  applyLang();
}
function applyLang() {
  document.querySelectorAll('[data-fr]').forEach(el => {
    const v = el.getAttribute('data-' + lang);
    if (v !== null) el.innerHTML = v;
  });
}

// ─── UTILS ──────────────
function strip(h) { const d = document.createElement('div'); d.innerHTML = h; return d.textContent || ''; }
function trunc(s, n) { return s.length > n ? s.slice(0, n).trimEnd() + '…' : s; }

// ─── INIT ──────────────
document.addEventListener('DOMContentLoaded', () => {
  // Apply the currently selected language to all data-* attributes.
  applyLang();
  // Render the initial page state.
  render();
  // We no longer toggle a scrolled state on the top bar.  The top bar
  // remains transparent at all times.  Therefore we deliberately do
  // nothing here.

  // Initialize the hero slider on the home page.  The slider cycles
  // horizontally through each slide and updates the navigation dots.
  const slider = document.getElementById('homeSlider');
  if (slider) {
    const slidesContainer = slider.querySelector('.slides');
    const slides = slider.querySelectorAll('.slide');
    const dots = slider.querySelectorAll('.dot');
    let currentSlide = 0;
    function showSlide(i) {
      if (!slidesContainer) return;
      slidesContainer.style.transform = `translateX(-${i * 100}%)`;
      dots.forEach((dot, idx) => dot.classList.toggle('active', idx === i));
      slides.forEach((slide, idx) => {
        slide.classList.toggle('active', idx === i);
      });
      currentSlide = i;
    }
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const i = parseInt(dot.getAttribute('data-index'));
        showSlide(i);
        resetInterval();
      });
    });
    let sliderInterval = setInterval(() => {
      showSlide((currentSlide + 1) % slides.length);
    }, 6000);
    function resetInterval() {
      clearInterval(sliderInterval);
      sliderInterval = setInterval(() => {
        showSlide((currentSlide + 1) % slides.length);
      }, 6000);
    }
    // Kick off initial slide
    showSlide(0);

    // Expose slider controls globally so that arrow buttons can invoke them.
    window.nextSlide = function() {
      showSlide((currentSlide + 1) % slides.length);
      resetInterval();
    };
    window.prevSlide = function() {
      showSlide((currentSlide - 1 + slides.length) % slides.length);
      resetInterval();
    };
  }
});
