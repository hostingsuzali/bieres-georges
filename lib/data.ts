export const navLinks = [
  { label: "Notre Brasserie", href: "#brasserie" },
  { label: "Nos bières", href: "#emblematiques" },
  { label: "Où nous trouver ?", href: "#locator" },
  { label: "Location de tireuse", href: "#tireuse" },
  { label: "Blog", href: "#journal" },
  { label: "Contact", href: "mailto:bonjour@bieresgeorges.fr" },
] as const;

export const brasseriePillars = [
  {
    keyword: "Héritage",
    line: "Notre héritage lyonnais nourrit chaque recette.",
    icon: "heritage",
  },
  {
    keyword: "Savoir-faire",
    line: "Notre savoir-faire guide chaque brassin.",
    icon: "savoirFaire",
  },
  {
    keyword: "Caractère",
    line: "Notre caractère donne du relief à chaque dégustation.",
    icon: "caractere",
  },
  {
    keyword: "Générosité",
    line: "Notre générosité se partage autour de chaque table.",
    icon: "generosite",
  },
] as const;

export const founderValues = [
  {
    title: "Savoir-faire",
    description: "Un brassage maîtrisé, des techniques éprouvées, jamais figées.",
    icon: "savoirFaire",
  },
  {
    title: "Héritage",
    description: "Un héritage perpétué, un esprit transmis depuis 1836.",
    icon: "heritage",
  },
  {
    title: "Caractère",
    description: "Du goût, du caractère, jamais de compromis sur la qualité.",
    icon: "caractere",
  },
  {
    title: "Générosité",
    description: "Des bières généreuses à partager, sans modération de plaisir.",
    icon: "generosite",
  },
] as const;

export const collections = [
  {
    name: "Les Intemporelles",
    description:
      "Les recettes essentielles de Bières Georges. Des bières franches, accessibles et fidèles à l’esprit de la maison.",
    mainBeer: "/assets/products/GMS_PALEALE_33CL.png",
    companionBeers: [
      "/assets/products/GMS_HEFE_33CL.png",
      "/assets/products/GMS_BITTER_33CL.png",
    ],
  },
  {
    name: "Les Audacieuses",
    description:
      "Des créations plus expressives, pensées pour explorer de nouveaux accords, de nouvelles intensités et de nouveaux caractères.",
    mainBeer: "/assets/products/CHR_IPA_33CL.png",
    companionBeers: [
      "/assets/products/CHR_NEIPA_33CL.png",
      "/assets/products/CHR_MOREISBITTER_33CL.png",
    ],
  },
  {
    name: "Les Saisonnières",
    description:
      "Des brassins éphémères, inspirés par le rythme des saisons et l’envie de proposer des expériences renouvelées.",
    mainBeer: "/assets/products/CHR_BIERE%20D_HIVER_33CL_chevalet.png",
    companionBeers: [
      "/assets/products/CHR_FRAMBOISE_33CL.png",
      "/assets/products/GMS_BIERE%20D_HIVER_33CL.png",
    ],
  },
  {
    name: "Les Explorations",
    description:
      "Des recettes libres, créatives, parfois inattendues, qui ouvrent le champ des possibles autour de la bière.",
    mainBeer: "/assets/products/CHR_VERYGOODTRIPLE_33CL.png",
    companionBeers: [
      "/assets/products/CHR_MUNICA_33CL.png",
      "/assets/products/CHR_PRINCESSE_33CL.png",
    ],
  },
] as const;

export const stores = [
  {
    name: "Le PMU",
    address: "Quai Saint-Antoine, 69002 Lyon",
    image: "/assets/images/store-1.jpg",
  },
  {
    name: "La Cave Place Lyon",
    address: "Place des Terreaux, 69001 Lyon",
    image: "/assets/images/store-2.jpg",
  },
  {
    name: "Brasserie Georges",
    address: "30 Cours de Verdun, 69002 Lyon",
    image: "/assets/images/store-3.jpg",
  },
  {
    name: "La Fabrique du Faubourg",
    address: "12 Rue Burdeau, 69001 Lyon",
    image: "/assets/images/store-4.jpg",
  },
];

export const partnershipTypes = [
  { label: "Bar", icon: "bar" },
  { label: "Caviste", icon: "caviste" },
  { label: "Grande distribution", icon: "distribution" },
  { label: "Événement", icon: "evenement" },
] as const;

export const proPoints = [
  {
    title: "Savoir-faire",
    description:
      "Des recettes maîtrisées, issues d'une tradition brassicole lyonnaise.",
  },
  {
    title: "Héritage",
    description: "Une maison fondée en 1836, porteuse d'une histoire forte.",
  },
  {
    title: "Caractère",
    description: "Des bières reconnaissables, franches et mémorables.",
  },
  {
    title: "Générosité",
    description: "Une marque conviviale, pensée pour être partagée.",
  },
];

export const articles = [
  {
    index: "01",
    category: "Coulisses",
    date: "12 mai 2024",
    title: "Dans l'ombre des cuves",
    excerpt:
      "Une immersion dans les gestes, les temps longs et les détails qui façonnent chaque brassin.",
    tone: "orange",
    image: "/assets/images/BRASSERIE.jpg",
  },
  {
    index: "02",
    category: "Terroir",
    date: "5 mai 2024",
    title: "Lyon, ville de caractère",
    excerpt:
      "Entre tradition, gastronomie et convivialité, Lyon inspire depuis toujours l'esprit Georges.",
    tone: "cream",
    image: "/assets/images/trinquent.jpg",
  },
  {
    index: "03",
    category: "Savoir-faire",
    date: "28 avril 2024",
    title: "Le goût du temps long",
    excerpt:
      "Pourquoi certaines bières se construisent avec patience, exigence et simplicité.",
    tone: "green",
    image: "/assets/images/verres 3 bières.jpg",
  },
] as const;

export const partners = [
  "Brasserie des Voûtes",
  "Café des Négociants",
  "Le Petit Glouton",
  "Caves Hoffmann",
  "Auberge Quai 7",
  "Maison Pradel",
  "Bar L'Antichambre",
  "Halles Paul Bocuse",
] as const;

export const tastingSteps = [
  {
    step: "01",
    title: "Servir",
    line: "À 6° dans un verre tulipe propre, incliné, pour laisser la mousse se former.",
  },
  {
    step: "02",
    title: "Observer",
    line: "La robe, l'éclat, la tenue du col — chaque bière raconte déjà son brassin.",
  },
  {
    step: "03",
    title: "Sentir",
    line: "Faites tourner le verre, approchez le nez, laissez les arômes s'installer.",
  },
  {
    step: "04",
    title: "Déguster",
    line: "Une gorgée franche, attention à l'attaque, au milieu de bouche, à la finale.",
  },
] as const;

// Four signature styles featured in the "Nos bières emblématiques" overview.
export const emblematicBeers = [
  {
    name: "Blonde",
    description:
      "Une bière équilibrée, lumineuse et rafraîchissante.",
    profile: "Légère, florale, désaltérante.",
    image: "/assets/images/verres%203%20bie%CC%80res.jpg",
    accent: "cream",
  },
  {
    name: "Blanche",
    description:
      "Une bière douce et aromatique, aux notes fraîches et délicates.",
    profile: "Agrumes, céréales, fraîcheur.",
    image: "/assets/images/pression_bar.jpg",
    accent: "orange",
  },
  {
    name: "Ambrée",
    description:
      "Une bière ronde et expressive, marquée par des notes maltées.",
    profile: "Caramel, pain grillé, longueur.",
    image: "/assets/images/BRASSERIE.jpg",
    accent: "cream",
  },
  {
    name: "Audacieuse",
    description:
      "Une bière plus affirmée, pensée pour surprendre sans dénaturer.",
    profile: "Caractère, intensité, créativité.",
    image: "/assets/images/trinquent.jpg",
    accent: "green",
  },
] as const;

// Five-word marquee inside the Brasserie section.
export const brasserieKeywords = [
  "Héritage",
  "Savoir-faire",
  "Caractère",
  "Générosité",
  "Audace",
] as const;

// Historical milestones shown in the "L'audace depuis 1836" section.
export const historyMilestones = [
  {
    year: "1836",
    title: "Fondation",
    line: "Georges Hoffherr fonde la brasserie à Lyon.",
    image: "/assets/images/1860-1.jpeg",
  },
  {
    year: "1936",
    title: "Le grand essor",
    line: "Un siècle plus tard, la maison s'impose dans toute la région.",
    image: "/assets/images/1936.jpg",
  },
  {
    year: "Aujourd'hui",
    title: "Libres et exigeants",
    line: "La maison crée son propre rythme, sans suivre les modes.",
    image: "/assets/images/camions livraison historiques.jpeg",
  },
] as const;

export const footerColumns = [
  {
    title: "Découvrir",
    links: ["Nos bières", "Maison Georges", "Savoir-faire", "Journal"],
  },
  {
    title: "La Maison",
    links: ["Points de vente", "Professionnels", "Nous contacter"],
  },
  {
    title: "Mentions légales",
    links: ["CGV", "Mentions légales", "Confidentialité"],
  },
];
