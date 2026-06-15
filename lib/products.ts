export type BeerRange = "GMS" | "CHR";

export type BeerCollection =
  | "Les Intemporelles"
  | "Les Audacieuses"
  | "Les Saisonnières"
  | "Les Explorations";

export type Beer = {
  slug: string;
  name: string;
  style: string;
  description: string;
  ranges: BeerRange[];
  collection: BeerCollection;
  formats: string[];
  image: string;
};

const gmsBase =
  "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL";
const chrBase = "/assets/gammes/GAMME CHR - Visuels";

export const beers: Beer[] = [
  {
    slug: "pils",
    name: "Pils",
    style: "Blonde légère",
    description: "Une bière vive, fraîche et désaltérante, au profil net.",
    ranges: ["GMS"],
    collection: "Les Intemporelles",
    formats: ["33 cl", "44 cl", "75 cl"],
    image: `${gmsBase}/BG_PILS_33CL.png`,
  },
  {
    slug: "pale-ale",
    name: "Pale Ale",
    style: "Blonde houblonnée",
    description: "Une blonde expressive, équilibrée entre céréales et houblons.",
    ranges: ["GMS", "CHR"],
    collection: "Les Intemporelles",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_PALE-ALE_33CL.png`,
  },
  {
    slug: "witbier",
    name: "Witbier",
    style: "Blanche",
    description: "Une blanche souple et aromatique aux notes fraîches d'agrumes.",
    ranges: ["GMS"],
    collection: "Les Intemporelles",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_WITBIER_33CL.png`,
  },
  {
    slug: "hefeweizen",
    name: "Hefeweizen",
    style: "Blanche de blé",
    description: "Une bière de blé généreuse, ronde et naturellement trouble.",
    ranges: ["GMS"],
    collection: "Les Intemporelles",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_HEFEWEIZEN_33CL.png`,
  },
  {
    slug: "ambree",
    name: "Ambrée",
    style: "Ambrée maltée",
    description: "Une bière ronde aux notes de caramel et de pain légèrement grillé.",
    ranges: ["GMS"],
    collection: "Les Intemporelles",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_AMBREE_33CL.png`,
  },
  {
    slug: "ipa",
    name: "IPA",
    style: "India Pale Ale",
    description: "Une IPA franche, aromatique et amère, avec une finale persistante.",
    ranges: ["GMS", "CHR"],
    collection: "Les Audacieuses",
    formats: ["33 cl", "44 cl", "75 cl", "Fût"],
    image: `${chrBase}/IPA 33CL 3760268370136.png`,
  },
  {
    slug: "neipa",
    name: "NEIPA",
    style: "IPA trouble",
    description: "Une bière juteuse et intensément aromatique, à l'amertume douce.",
    ranges: ["GMS", "CHR"],
    collection: "Les Audacieuses",
    formats: ["33 cl", "44 cl", "75 cl", "Fût"],
    image: `${chrBase}/NEIPA 33CL.png`,
  },
  {
    slug: "more-is-bitter",
    name: "More is Bitter",
    style: "Bitter",
    description: "Une amertume assumée portée par un corps sec et élégant.",
    ranges: ["CHR"],
    collection: "Les Audacieuses",
    formats: ["33 cl", "75 cl", "Fût"],
    image: `${chrBase}/MORE IS BITTER 33CL 3760268370044.png`,
  },
  {
    slug: "neipa-exotic",
    name: "NEIPA Exotic",
    style: "NEIPA fruitée",
    description: "Une création généreuse aux accents de fruits tropicaux.",
    ranges: ["GMS"],
    collection: "Les Explorations",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_NEIPA-EXOTIC_33CL.png`,
  },
  {
    slug: "ipa-exotic",
    name: "IPA Exotic",
    style: "IPA fruitée",
    description: "Une IPA exotique, expressive et résolument contemporaine.",
    ranges: ["GMS"],
    collection: "Les Explorations",
    formats: ["33 cl", "75 cl"],
    image: `${gmsBase}/BG_IPA-EXOTIC_33CL.png`,
  },
  {
    slug: "very-good-triple",
    name: "Very Good Triple",
    style: "Triple",
    description: "Une triple ample et chaleureuse, à la finale longue.",
    ranges: ["CHR"],
    collection: "Les Explorations",
    formats: ["33 cl", "75 cl"],
    image: `${chrBase}/VERY GOOD TRIPLE 33CL 3760268370372.png`,
  },
  {
    slug: "munica",
    name: "Munica Brune²",
    style: "Brune",
    description: "Une brune profonde aux notes torréfiées et chocolatées.",
    ranges: ["CHR"],
    collection: "Les Explorations",
    formats: ["33 cl", "75 cl"],
    image: `${chrBase}/MUNICA BRUNE² 33CL 3760268370068.png`,
  },
  {
    slug: "princesse",
    name: "Princesse Pale Ale",
    style: "Pale Ale",
    description: "Une pale ale fine, florale et délicatement amère.",
    ranges: ["CHR"],
    collection: "Les Explorations",
    formats: ["33 cl", "75 cl"],
    image: `${chrBase}/PRINCESSE PALE ALE 33CL 3760268370006.png`,
  },
  {
    slug: "framboise",
    name: "Framboise",
    style: "Bière fruitée",
    description: "Une bière fruitée, fraîche et acidulée, sans lourdeur.",
    ranges: ["GMS", "CHR"],
    collection: "Les Saisonnières",
    formats: ["33 cl", "75 cl"],
    image: `${chrBase}/Visuel - FRAMBOISE 33CL - 3760268370471.png`,
  },
  {
    slug: "abricot",
    name: "Abricot",
    style: "Bière fruitée",
    description: "Une recette solaire et gourmande autour de l'abricot.",
    ranges: ["CHR"],
    collection: "Les Saisonnières",
    formats: ["33 cl"],
    image: `${chrBase}/ABRICOT 33CL 3760268370846.png`,
  },
  {
    slug: "hiver",
    name: "Bière d'Hiver",
    style: "Bière saisonnière",
    description: "Un brassin réconfortant aux notes épicées et maltées.",
    ranges: ["CHR"],
    collection: "Les Saisonnières",
    formats: ["33 cl", "75 cl"],
    image: `${chrBase}/HIVER 33CL 3760268370495.png`,
  },
];

export const beerCollections: BeerCollection[] = [
  "Les Intemporelles",
  "Les Audacieuses",
  "Les Saisonnières",
  "Les Explorations",
];

