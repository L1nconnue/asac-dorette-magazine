/**
 * PLACEHOLDER CONTENT.
 * Every record below is invented so the sections can be reviewed and tested.
 * Replace with real listings (or a sheet tab) before the platform leaves preview.
 */

export type CatalogueItem = {
  id: string;
  name: string;
  city: string;
  phone?: string;
  tags: string[];
  tagsFr?: string[];
  facts: { label: string; value: string; labelFr?: string; valueFr?: string }[];
  blurb: string;
  blurbFr?: string;
};

export const PLACEHOLDER_NOTICE =
  "Placeholder listings. These records are examples for layout review, not verified inventory.";

export const PRINTERS: CatalogueItem[] = [
  {
    id: "PR-01",
    name: "Atelier Wouri Print",
    city: "Douala",
    phone: "+237 699 000 101",
    tags: ["Large format", "Bâches", "48h"],
    tagsFr: ["Grand format", "Bâches", "48h"],
    facts: [
      { label: "Services", value: "Bâche, vinyle, adhésif" },
      { label: "Max width", value: "3.2 m" },
      { label: "Delivery", value: "Douala, Édéa" },
      { label: "Price range", value: "5 000 – 9 000 FCFA / m²" },
      { label: "Availability", value: "Open" },
    ],
    blurb: "Roll-to-roll large format shop working mostly with OOH régies.",
    blurbFr: "Atelier grand format roll-to-roll, principalement orienté régies d'affichage.",
  },
  {
    id: "PR-02",
    name: "Imprimerie Akwa Nord",
    city: "Douala",
    phone: "+237 699 000 102",
    tags: ["Offset", "Magazines", "Volume"],
    tagsFr: ["Offset", "Magazines", "Volume"],
    facts: [
      { label: "Services", value: "Offset, brochures, magazines" },
      { label: "Max format", value: "A1" },
      { label: "Delivery", value: "National" },
      { label: "Price range", value: "On quotation" },
      { label: "Availability", value: "Booked to end of month" },
    ],
    blurb: "Offset house used for periodicals and annual reports.",
    blurbFr: "Imprimerie offset adaptée aux périodiques, brochures et rapports annuels.",
  },
  {
    id: "PR-03",
    name: "Studio Bastos Sérigraphie",
    city: "Yaoundé",
    phone: "+237 699 000 103",
    tags: ["Screen print", "PLV", "Textile"],
    tagsFr: ["Sérigraphie", "PLV", "Textile"],
    facts: [
      { label: "Services", value: "Sérigraphie, PLV, textile" },
      { label: "Max format", value: "1.5 x 2 m" },
      { label: "Delivery", value: "Yaoundé, Centre" },
      { label: "Price range", value: "3 000 – 7 000 FCFA / unit" },
      { label: "Availability", value: "Open" },
    ],
    blurb: "Activation and merchandising print for field campaigns.",
    blurbFr: "Impression d'activation et de merchandising pour opérations terrain.",
  },
  {
    id: "PR-04",
    name: "Littoral Signalétique",
    city: "Douala",
    phone: "+237 699 000 104",
    tags: ["Signage", "Installation", "Metal"],
    tagsFr: ["Signalétique", "Installation", "Métal"],
    facts: [
      { label: "Services", value: "Enseignes, habillage, pose" },
      { label: "Equipment", value: "CNC, laser, atelier soudure" },
      { label: "Delivery", value: "Douala" },
      { label: "Price range", value: "On quotation" },
      { label: "Availability", value: "Open" },
    ],
    blurb: "Fabrication and installation for shopfronts and billboard frames.",
    blurbFr: "Fabrication et pose pour enseignes, façades commerciales et supports d'affichage.",
  },
];

export const STATIONS: CatalogueItem[] = [
  {
    id: "TR-01",
    name: "Canal Littoral TV",
    city: "Douala",
    phone: "+237 699 000 201",
    tags: ["TV", "French", "General"],
    tagsFr: ["TV", "Français", "Généraliste"],
    facts: [
      { label: "Media type", value: "Television" },
      { label: "Coverage", value: "Douala, Littoral" },
      { label: "Audience", value: "Urban 25–54" },
      { label: "Languages", value: "French" },
      { label: "Ad formats", value: "Spot 30s, sponsoring, bandeau" },
    ],
    blurb: "Generalist channel with a strong evening news block.",
    blurbFr: "Chaîne généraliste avec un bloc journal du soir particulièrement fort.",
  },
  {
    id: "TR-02",
    name: "Radio Wouri FM",
    city: "Douala",
    phone: "+237 699 000 202",
    tags: ["Radio", "Music", "Bilingual"],
    tagsFr: ["Radio", "Musique", "Bilingue"],
    facts: [
      { label: "Media type", value: "Radio" },
      { label: "Coverage", value: "Douala metro" },
      { label: "Audience", value: "18–34" },
      { label: "Languages", value: "French, English" },
      { label: "Ad formats", value: "Spot 20s/30s, live read, jeu antenne" },
    ],
    blurb: "Music and drive-time talk, high commuter reach.",
    blurbFr: "Radio musicale et talk de mobilité, forte audience aux heures de trajet.",
  },
  {
    id: "TR-03",
    name: "Centre Info Radio",
    city: "Yaoundé",
    phone: "+237 699 000 203",
    tags: ["Radio", "News", "French"],
    tagsFr: ["Radio", "Information", "Français"],
    facts: [
      { label: "Media type", value: "Radio" },
      { label: "Coverage", value: "Yaoundé, Centre" },
      { label: "Audience", value: "30–60" },
      { label: "Languages", value: "French" },
      { label: "Ad formats", value: "Spot 30s, chronique sponsorisée" },
    ],
    blurb: "News-led station with institutional and B2B listeners.",
    blurbFr: "Station orientée information, avec une audience institutionnelle et B2B.",
  },
  {
    id: "TR-04",
    name: "Sawa Sports TV",
    city: "Douala",
    phone: "+237 699 000 204",
    tags: ["TV", "Sport", "Bilingual"],
    tagsFr: ["TV", "Sport", "Bilingue"],
    facts: [
      { label: "Media type", value: "Television" },
      { label: "Coverage", value: "National cable" },
      { label: "Audience", value: "Male 18–44" },
      { label: "Languages", value: "French, English" },
      { label: "Ad formats", value: "Spot, billboard sponsoring, halftime" },
    ],
    blurb: "Sport programming with weekend peaks.",
    blurbFr: "Programmation sportive avec des pics d'audience le week-end.",
  },
];

export const MAGAZINES: CatalogueItem[] = [
  {
    id: "MG-01",
    name: "Douala Business Review",
    city: "Douala",
    phone: "+237 699 000 301",
    tags: ["Business", "Monthly"],
    tagsFr: ["Business", "Mensuel"],
    facts: [
      { label: "Category", value: "Business" },
      { label: "Frequency", value: "Monthly" },
      { label: "Distribution", value: "Douala, Yaoundé" },
      { label: "Audience", value: "Executives, SME owners" },
      { label: "Ad formats", value: "Full page, double page, cover 4" },
    ],
    blurb: "Monthly business title distributed in offices and lounges.",
    blurbFr: "Magazine business mensuel distribué dans les bureaux et salons professionnels.",
  },
  {
    id: "MG-02",
    name: "Kamer Lifestyle",
    city: "Douala",
    phone: "+237 699 000 302",
    tags: ["Lifestyle", "Quarterly"],
    tagsFr: ["Lifestyle", "Trimestriel"],
    facts: [
      { label: "Category", value: "Lifestyle" },
      { label: "Frequency", value: "Quarterly" },
      { label: "Distribution", value: "Retail, hotels" },
      { label: "Audience", value: "Urban 25–45" },
      { label: "Ad formats", value: "Full page, advertorial" },
    ],
    blurb: "Consumer title with fashion, food and travel sections.",
    blurbFr: "Titre grand public autour de la mode, de la restauration et du voyage.",
  },
  {
    id: "MG-03",
    name: "Agro Cameroun",
    city: "Yaoundé",
    phone: "+237 699 000 303",
    tags: ["Sector", "Bimonthly"],
    tagsFr: ["Sectoriel", "Bimestriel"],
    facts: [
      { label: "Category", value: "Agriculture" },
      { label: "Frequency", value: "Bimonthly" },
      { label: "Distribution", value: "National, institutions" },
      { label: "Audience", value: "Producers, institutions" },
      { label: "Ad formats", value: "Full page, insert" },
    ],
    blurb: "Sector publication reaching cooperatives and public bodies.",
    blurbFr: "Publication sectorielle touchant coopératives, institutions et acteurs agricoles.",
  },
];
