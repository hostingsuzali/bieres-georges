export type NavLink = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

export const navLinks: readonly NavLink[] = [
  { label: "Brasserie audacieuse", href: "/#brasserie" },
  { label: "Bières emblématiques", href: "/toutes-les-bieres" },
  { label: "Trouver les Bières Georges", href: "/trouver" },
  { label: "Louer une tireuse", href: "/louer-une-tireuse" },
  { label: "Travailler avec les Bières Georges", href: "/travailler-avec-nous" },
  { label: "Blog", href: "/#journal" },
  { label: "Contact", href: "mailto:bonjour@bieresgeorges.fr" },
];

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
  {
    label: "Travaillons Ensemble",
    href: "#partenaires",
  },
] as const;

export const founderValues = [
  {
    title: "L'audace du fondateur",
    description: "Nous portons l'audace de Georges Hoffherr comme un flambeau, pas comme une relique.",
    icon: "heritage",
  },
  {
    title: "L'exigence du maître",
    description: "Nous brassons chaque bière comme si notre nom était gravé sur chaque bouteille.",
    icon: "savoirFaire",
  },
  {
    title: "La simplicité élégante",
    description: "Nous visons la précision juste : celle qui révèle l'essentiel sans artifice.",
    icon: "caractere",
  },
  {
    title: "L'énergie conquérante",
    description: "Nous cultivons l'ambition pour nourrir notre développement.",
    icon: "generosite",
  },
  {
    title: "La fierté fédératrice",
    description: "Nous partageons notre amour pour Lyon et notre passion pour la bière.",
    icon: "heritage",
  },
] as const;

export const collections = [
  {
    name: "Les Originales",
    description:
      "Pils, Pale Ale, Witbier, Hefeweizen, IPA, NEIPA, Bitter, Triple, Porter, Framboise — les bières emblématiques des styles.",
    mainBeer: "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_PALE-ALE_33CL.png",
    companionBeers: [
      "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_PILS_33CL.png",
      "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_IPA_33CL.png",
    ],
  },
  {
    name: "Les Spéciales",
    description:
      "NEIPA Exotic, IPA Exotic, Red Ale, Brut — des éditions limitées audacieuses et créatives.",
    mainBeer: "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_NEIPA-EXOTIC_33CL.png",
    companionBeers: [
      "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL/BG_IPA-EXOTIC_33CL.png",
      "/assets/gammes/GAMME CHR - Visuels/VERY GOOD TRIPLE 33CL 3760268370372.png",
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
    image: "/assets/bieres.jpg",
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
  "Audace",
  "Exigence",
  "Simplicité",
  "Énergie",
  "Fierté",
] as const;

// Historical milestones shown in the "L'audace depuis 1836" section.
export const historyMilestones = [
  {
    year: "1836",
    title: "Fondation",
    line: "Georges Hoffherr fonde la brasserie à Lyon.",
    image: "/Charte Graphique_Dossier/Links/Biere Georges Montée Choulans.jpg",
  },
  {
    year: "1936",
    title: "Le grand essor",
    line: "Un siècle plus tard, la maison s'impose dans toute la région.",
    image: "/Charte Graphique_Dossier/Links/Bière georges anacronique.jpg",
  },
  {
    year: "Aujourd'hui",
    title: "Libres et exigeants",
    line: "La maison crée son propre rythme, sans suivre les modes.",
    image: "/Charte Graphique_Dossier/Links/BIERES GEORGES-9084 HD (2).jpg",
  },
] as const;

export const footerColumns = [
  {
    title: "Découvrir",
    links: ["Bières emblématiques", "Brasserie audacieuse", "Savoir-faire", "Journal"],
  },
  {
    title: "La Maison",
    links: ["Trouver les Bières Georges", "Travailler avec nous", "Nous contacter"],
  },
  {
    title: "Mentions légales",
    links: ["CGV", "Mentions légales", "Confidentialité"],
  },
];
