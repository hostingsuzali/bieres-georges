export type NavLink = {
  label: string;
  href: string;
  children?: readonly { label: string; href: string }[];
};

export const navLinks: readonly NavLink[] = [
  { label: "Brasserie audacieuse", href: "/brasserie-audacieuse" },
  { label: "Bières emblématiques", href: "/toutes-les-bieres" },
  { label: "Trouver les Bières Georges", href: "/trouver" },
  { label: "Louer une tireuse", href: "/louer-une-tireuse" },
  { label: "Travailler avec les Bières Georges", href: "/travailler-avec-nous" },
  { label: "Actualités", href: "/actualites" },
  { label: "Contact", href: "/contact" },
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

// Full article set for the "/actualites" journal page.
export const blogArticles = [
  {
    slug: "art-du-brassage-georges",
    category: "Brasserie",
    date: "12 juin 2026",
    title: "L'art du brassage : comment naît une Bières Georges",
    excerpt:
      "De la sélection des houblons à la mise en fût, plongez dans les coulisses de notre processus de brassage artisanal.",
    image: "/assets/images/BRASSERIE.jpg",
    readTime: "5 min",
  },
  {
    slug: "histoire-brasserie-depuis-1836",
    category: "Histoire",
    date: "3 mai 2026",
    title: "1836 : la maison qui refusait de disparaître",
    excerpt:
      "Deux siècles de caractère ne s'inventent pas. Retour sur les tournants qui ont forgé l'identité des Bières Georges.",
    image: "/assets/images/1860-1.jpeg",
    readTime: "8 min",
  },
  {
    slug: "accords-bieres-gastronomie",
    category: "Gastronomie",
    date: "18 avr. 2026",
    title: "Accords bières & cuisine : nos trois duos incontournables",
    excerpt:
      "Nos brasseurs partagent leurs associations préférées entre les Originales, les Spéciales et les plats de saison.",
    image: "/assets/images/verres 3 bières.jpg",
    readTime: "4 min",
  },
  {
    slug: "dans-lombre-des-cuves",
    category: "Coulisses",
    date: "12 mai 2024",
    title: "Dans l'ombre des cuves",
    excerpt:
      "Une immersion dans les gestes, les temps longs et les détails qui façonnent chaque brassin.",
    image: "/assets/images/pression_bar.jpg",
    readTime: "6 min",
  },
  {
    slug: "lyon-ville-de-caractere",
    category: "Terroir",
    date: "5 mai 2024",
    title: "Lyon, ville de caractère",
    excerpt:
      "Entre tradition, gastronomie et convivialité, Lyon inspire depuis toujours l'esprit Georges.",
    image: "/assets/images/trinquent.jpg",
    readTime: "5 min",
  },
  {
    slug: "le-gout-du-temps-long",
    category: "Savoir-faire",
    date: "28 avril 2024",
    title: "Le goût du temps long",
    excerpt:
      "Pourquoi certaines bières se construisent avec patience, exigence et simplicité.",
    image: "/assets/bieres.jpg",
    readTime: "5 min",
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

// ---------------------------------------------------------------------------
// Brasserie Audacieuse page data
// ---------------------------------------------------------------------------

export type TeamDepartment =
  | "Souverain"
  | "Management"
  | "Production"
  | "Administratif"
  | "Logistique"
  | "Commerce GMS"
  | "Commerce CHR";

export type TeamMember = {
  name: string;
  role: string;
  department: TeamDepartment;
};

export const teamMembers: readonly TeamMember[] = [
  { name: "Georges", role: "Fondateur", department: "Souverain" },
  { name: "Julien", role: "Dirigeant", department: "Management" },
  { name: "Marc-Antoine", role: "Responsable Production", department: "Production" },
  { name: "Nicolas", role: "Responsable Brassage", department: "Production" },
  { name: "Tristan", role: "Responsable Conditionnement", department: "Production" },
  { name: "Léa", role: "Opératrice Production", department: "Production" },
  { name: "Laure", role: "Assistante ADV/ADM", department: "Administratif" },
  { name: "Yohan", role: "Chauffeur/livreur", department: "Logistique" },
  { name: "Audrey", role: "Responsable Secteur", department: "Commerce GMS" },
  { name: "Nader", role: "Commercial 01, 69, 73, 74", department: "Commerce GMS" },
  { name: "Eddy", role: "Commercial 07, 26, 38, 42, 43, 69", department: "Commerce GMS" },
  { name: "Lucas", role: "Responsable Commercial", department: "Commerce CHR" },
] as const;

export const departmentColors: Record<TeamDepartment, string> = {
  Souverain: "bg-orange text-cream",
  Management: "bg-green text-cream",
  Production: "bg-green-deep text-cream",
  Administratif: "bg-cream-dark text-green",
  Logistique: "bg-orange-soft text-cream",
  "Commerce GMS": "bg-green text-cream",
  "Commerce CHR": "bg-orange text-cream",
};

/**
 * Histoire — 12 jalons fournis par le client (slides « HISTOIRE - MAQUETTE »).
 * `era` pilote le traitement graphique uniforme des visuels :
 *   - "heritage"  → 1795 – 1939 (archives, duotone vert/sépia)
 *   - "renouveau" → 2004 – 2026 (photos actuelles, couleur)
 * Les visuels ci-dessous sont les meilleurs disponibles dans le repo ;
 * les archives originales du deck restent à fournir par Julien.
 */
export type HistoryEra = "heritage" | "renouveau";

export type HistoryMilestone = {
  year: string;
  title: string;
  text: string;
  image: string;
  era: HistoryEra;
};

export const historyTimeline: readonly HistoryMilestone[] = [
  {
    year: "1795",
    title: "Le pionnier",
    text: "Georges Hoffherr naît à Schiltigheim en Alsace. Il est issu d'une lignée d'agriculteurs et de brasseurs alsaciens. Ainsi, il suit le même chemin et exploite la brasserie Sternenberg puis celle de Volgelsang. Mais le destin s'en mêle. Son épouse décède soudainement le laissant seul avec 6 enfants.",
    image: "/assets/logos/georges-hofherr.png",
    era: "heritage",
  },
  {
    year: "1836",
    title: "Le début de l'histoire",
    text: "Georges n'a que quarante ans. Il décide de changer de vie et quitte son Alsace natale pour s'installer à Lyon. Ce n'est pas un hasard. Lyon est en pleine expansion et une ville où l'on brasse ! Georges est audacieux et cela se voit. Il installe sa brasserie dans un imposant bâtiment dans le cœur du quartier de Perrache. Le succès ne se fera pas attendre.",
    image: "/assets/images/BRASSERIE.jpg",
    era: "heritage",
  },
  {
    year: "1860",
    title: "Le succès",
    text: "La bière coule à flots et 3000 hectolitres sont vendus en 1860. Georges développe son affaire et prépare la relève en formant ses enfants et en associant ses deux gendres Mathieu Umdenstock et Jean Lutzius. La nouvelle génération a, elle aussi, de l'ambition. La brasserie devient une petite usine.",
    image: "/history/history-1.jpg",
    era: "heritage",
  },
  {
    year: "1873",
    title: "Une affaire de famille",
    text: "Georges s'éteint. Sa fille Sophie et son gendre Mathieu Umdenstock deviennent les nouveaux propriétaires de la Brasserie Georges. Mathieu, alsacien et brasseur, n'en reste pas là. Il ouvre des établissements aux quatre coins de Lyon dans l'objectif de faire croître les Bières Georges. L'un des fils de Georges, Fritz, fait de même. Les Bières Georges sont servies dans les brasseries du Parc, de l'Alhambra, Dupuis, Thomassin mais aussi dans la vallée du Rhône et même en Algérie et en Tunisie.",
    image: "/history/history-3.jpg",
    era: "heritage",
  },
  {
    year: "1880",
    title: "L'audace",
    text: "Lyon dispose de tous les atouts pour devenir la capitale de la bière : l'eau puisée dans les nappes souterraines est d'excellente qualité et les régions voisines approvisionnent, par le chemin de fer, l'orge et le houblon. La demande est de plus en plus importante. Mathieu établit une nouvelle usine, dans la Montée de Choulans, dotée d'outils modernes et poursuit le développement. 10 000 hectolitres sont produits en 1880. 15 000 hectolitres en 1890.",
    image: "/Charte Graphique_Dossier/Links/Biere Georges Montée Choulans.jpg",
    era: "heritage",
  },
  {
    year: "1936",
    title: "Une fin amère",
    text: "Le temps passe… La Brasserie Georges fête ses 100 ans et Lyon s'affirme comme le second centre brassicole français. Mais le secteur d'activité est affecté par les pénuries de l'après-guerre et de nombreuses brasseries sont confrontées à des difficultés financières. Certaines se regroupent pour résister. La brasserie Georges survit mais l'usine et la marque Bières Georges disparaissent en 1939.",
    image: "/history/history-2.jpg",
    era: "heritage",
  },
  {
    year: "2004",
    title: "Une nouvelle ère",
    text: "La Brasserie Georges sera exploitée par la famille Rinck de 1939 à 2002 en tant que lieu de restauration puis sera reprise en 2002 par Christian Lameloise qui installe une micro-brasserie pour reprendre la fabrication des Bières Georges. 625 hl sont produits la première année.",
    image: "/Charte Graphique_Dossier/Links/brasserie nuit.jpg",
    era: "renouveau",
  },
  {
    year: "2017",
    title: "La genèse d'un projet audacieux",
    text: "Le projet naît dans l'esprit de plusieurs entrepreneurs : les Bières Georges doivent franchir les murs de la Brasserie Georges. Elles sont servies de la cuve au verre aux amateurs de « Bonne Bière et bonne chère » qui viennent s'attabler au restaurant. Elles doivent maintenant devenir accessibles à tous, dans les magasins et les établissements de la région.",
    image: "/assets/images/trinquent.jpg",
    era: "renouveau",
  },
  {
    year: "2018",
    title: "La naissance d'une brasserie indépendante",
    text: "La Fabrique du Faubourg est créée en 2018 et s'installe à Lyon pour fabriquer, conditionner et distribuer les Bières Georges dans la région Auvergne-Rhône-Alpes. Elle abrite un outil de production qui permet de brasser des bières, avec l'exigence du maître fondateur, dans des volumes importants, pour servir l'ambition de ses successeurs.",
    image: "/assets/logos/logo-ff-brique.png",
    era: "renouveau",
  },
  {
    year: "2019",
    title: "Le développement",
    text: "Les Bières Georges sont commercialisées dans les établissements de Lyon et sa région grâce à des partenariats noués avec des distributeurs de boissons. Elles s'invitent en 2021 dans les rayons des magasins de la grande distribution. La Fabrique du Faubourg est en croissance et compte plus de 10 collaborateurs.",
    image: "/assets/images/fabrique-aujourdhui.webp",
    era: "renouveau",
  },
  {
    year: "2025",
    title: "Une nouvelle dimension",
    text: "Quatre entrepreneurs entrent au capital pour doter l'entreprise des ressources financières nécessaires à son accélération. Le plan de développement est ambitieux et s'articule autour de 3 axes : faire vivre la marque Bières Georges, moderniser le process et l'outil de production et développer la distribution. La question n'est plus « comment vivre » mais « comment conquérir ».",
    image: "/assets/logos/logo-classique-brique.png",
    era: "renouveau",
  },
  {
    year: "2026",
    title: "L'accélération",
    text: "L'équipe est renforcée avec l'intégration de personnes clés notamment en production et au commerce. Les innovations sont nombreuses et concernent les formats, tels que la canette 44CL et les produits, comme la Pils (bière blonde désaltérante) et la Witbier (bière blanche au gingembre et citron vert).",
    image: "/assets/images/bieres.jpg",
    era: "renouveau",
  },
] as const;

export const manifestoContent = {
  headline: "Faire une bière de caractère, pas une bière de décor.",
  philosophy: {
    title: "Notre philosophie",
    text: "Nous sommes les héritiers de l'audacieux Georges. Nous brassons bien plus qu'une bière : nous poursuivons l'histoire des Bières Georges nées à Lyon en 1836.",
  },
  vision: {
    title: "Notre vision pour le futur",
    text: "Nous sommes les conquérants de la bière. Nous puisons dans notre héritage et notre époque pour que Bières Georges soit incontournable en région Auvergne-Rhône-Alpes.",
  },
  engagements: {
    title: "Nos engagements",
    text: "Nous conjuguons notre histoire au présent. Nous brassons, avec une exigence sans concession, des bières emblématiques et nous créons, avec une audace parfois impertinente, des bières originales.",
    items: [
      "Brasser avec exigence et transparence",
      "Porter l'identité lyonnaise avec fierté",
      "Innover sans trahir l'héritage",
      "Rendre la bière accessible et généreuse",
    ],
  },
} as const;

export const savoirFaireBlocks = [
  {
    eyebrow: "Maîtrise artisanale",
    title: "Le maître signe son œuvre. Nous signons chaque bière",
    body: "Un maître brasseur ne triche jamais. Il connaît ses matières premières, maîtrise ses process, ajuste au millimètre. Notre exigence commence par le choix des ingrédients et ne s'arrête qu'au moment où le client savoure sa bière.",
    expanded:
      "Nous sommes intransigeants sur la qualité, patients dans l'élaboration, méticuleux dans le contrôle. Cette rigueur n'est pas une contrainte, c'est notre fierté. Elle se voit dans le geste du brasseur qui prend soin de son outil de production, qui améliore continuellement son process de fabrication et qui goûte perpétuellement sa bière.\n\nLe maître signe son œuvre. Nous signons chaque bière de notre exigence.",
    image: "/Charte Graphique_Dossier/Links/brasserie jour.jpg",
    highlights: [
      "Sélection rigoureuse des matières premières",
      "Process de brassage maîtrisé au millimètre",
      "Contrôle qualité à chaque étape",
      "Amélioration continue de la production",
      "Suivi personnalisé de chaque brassin",
      "Équipement dimensionné pour la précision",
    ],
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
