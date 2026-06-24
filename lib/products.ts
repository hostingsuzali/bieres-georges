export type BeerRange = "GMS" | "CHR";

export type BeerCollection =
  | "Les Originales"
  | "Les Spéciales";

export type Beer = {
  slug: string;
  name: string;
  style: string;
  /** Short pitch — the "Cette bière est une X..." line */
  description: string;
  /** Tasting note — the second, shorter sensory line */
  tastingNote: string;
  ranges: BeerRange[];
  collection: BeerCollection;
  formats: string[];
  image: string;
  fermentation: string; // e.g. "Haute (Ale)" / "Basse (Lager)"
  abv: number;           // Alcohol %
  ibu: number;            // Amertume, /5
  ebc: number;            // Couleur, /5
  ingredients: string[];
};

const gmsBase =
  "/assets/gammes/GAMME GMS - Visuels/Version BLACKTHORNS/Bouteilles 33CL";
const chrBase = "/assets/gammes/GAMME CHR - Visuels";

export const beers: Beer[] = [
  {
    slug: "pils",
    name: "Pils",
    style: "Pils",
    description:
      "Cette bière est une Pils : née en Tchéquie en 1842, elle est devenue la bière la plus brassée au monde. La star des bières.",
    tastingNote:
      "Légère, finement amère, précise. Elle se boit très fraîche, en toute simplicité.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Canette 44 cl", "Bouteille 75 cl", "Fût Inox 20L / 30L"],
    image: `${gmsBase}/BG_PILS_33CL.png`,
    fermentation: "Basse (Lager)",
    abv: 4.2,
    ibu: 2,
    ebc: 1,
    ingredients: ["Malts d'orge (Pils, Munich)", "Houblons (Strisselspalt, Magnum)", "Levure (Crisp Lager)", "CO₂"],
  },
  {
    slug: "pale-ale",
    name: "Pale Ale",
    style: "Pale Ale",
    description:
      "Cette bière est une Pale Ale : les Britanniques l'ont inventée, nous l'avons apprivoisée. Deux malts, deux houblons, zéro compromis.",
    tastingNote:
      "Amertume délicate et arômes subtils d'agrumes. Elle est rafraîchissante, avec du caractère.",
    ranges: ["GMS"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_PALE-ALE_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 5.4,
    ibu: 2,
    ebc: 1,
    ingredients: ["Malts d'orge (Pils, Munich)", "Houblons (Cascade, Magnum)", "Levure (AY4)", "CO₂"],
  },
  {
    slug: "witbier",
    name: "Witbier",
    style: "Witbier",
    description:
      "Cette bière est une Witbier : les moines belges l'ont créée au Moyen-Âge. Gingembre, coriandre, zestes d'agrumes. Un savant mélange.",
    tastingNote:
      "Ronde, légèrement épicée, désaltérante. Elle est tonique et rafraîchissante.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_WITBIER_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 4.5,
    ibu: 1,
    ebc: 2,
    ingredients: [
      "Malt d'orge (Pils)",
      "Malt de blé",
      "Flocons d'avoine",
      "Gingembre",
      "Zestes d'orange et de citron",
      "Épices (coriandre)",
      "Houblons (Magnum)",
      "Levure (BW-20)",
      "CO₂",
    ],
  },
  {
    slug: "hefeweizen",
    name: "Hefeweizen",
    style: "Hefeweizen",
    description:
      "Cette bière est une Hefeweizen : la Bavière dans un verre, avec sa robe orangée et trouble, sa mousse blanche et abondante. Elle ne ressemble à aucune autre bière.",
    tastingNote:
      "Notes subtiles de banane et d'épices, ronde et soyeuse. Elle est ample et douce.",
    ranges: ["GMS"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_HEFEWEIZEN_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 5.4,
    ibu: 1,
    ebc: 2,
    ingredients: ["Malts d'orge (Pils)", "Malt de blé", "Houblons (Strisselspalt, Herkules)", "Levure (Banana)", "CO₂"],
  },
  {
    slug: "silky-weiss",
    name: "Silky Weiss",
    style: "Hefeweizen",
    description:
      "Cette bière est une Hefeweizen : la Bavière dans un verre, avec sa robe orangée et trouble, sa mousse blanche et abondante. Elle ne ressemble à aucune autre bière.",
    tastingNote:
      "Notes subtiles de banane et d'épices, ronde et soyeuse. Elle est ample et douce.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/SILKY WEISS 33CL 3760268370020.png`,
    fermentation: "Haute (Ale)",
    abv: 5.4,
    ibu: 1,
    ebc: 2,
    ingredients: ["Malts d'orge (Pils)", "Malt de blé", "Houblons (Strisselspalt, Herkules)", "Levure (Banana)", "CO₂"],
  },
  {
    slug: "ambree",
    name: "Ambrée",
    style: "Bitter",
    description:
      "Cette bière est une Bitter : les Anglais l'appellent « Real Ale » : la vraie bière. Ils la servent à partir du « Cask », le fût en bois utilisé pour la fermentation. La pure tradition.",
    tastingNote:
      "Arômes de biscuit et de caramel, amertume sèche et franche. Elle affirme son caractère sans concession.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_AMBREE_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 4.5,
    ibu: 4,
    ebc: 4,
    ingredients: ["Malt d'orge (Pils, Cara amber)", "Houblons (East Kent Goldings, Magnum)", "Levure (AY4)", "CO₂"],
  },
  {
    slug: "triple",
    name: "Triple",
    style: "Tripel",
    description:
      "Cette bière est une Triple : au Moyen-Âge, les moines réservaient leur bière la plus forte aux hôtes les plus considérés. Nous perpétuons la tradition.",
    tastingNote: "Arômes de miel et de fruits mûrs. Elle est puissante et élégante.",
    ranges: ["GMS"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_TRIPLE_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 9,
    ibu: 1,
    ebc: 3,
    ingredients: ["Malts d'orge (Pils, Munich)", "Sucre", "Houblons (Strisselspalt, Magnum)", "Levure (Bel Abbey)", "CO₂"],
  },
  {
    slug: "brune",
    name: "Brune",
    style: "Porter",
    description:
      "Cette bière est une Porter : née à Londres au XVIIIème siècle, elle était la préférée des porteurs de fardeaux. Ils avaient plutôt bon goût.",
    tastingNote: "Arômes toastés et chocolatés, des airs de cappuccino. Elle est généreuse et réconfortante.",
    ranges: ["GMS"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_BRUNE_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 7,
    ibu: 3,
    ebc: 5,
    ingredients: ["Malts d'orge (Pils, Cara amber, Cara vienna, Chocolat)", "Sucre", "Lactose", "Houblons (Cascade, Herkules)", "CO₂"],
  },
  {
    slug: "ipa",
    name: "IPA",
    style: "India Pale Ale",
    description:
      "Cette bière est une IPA : les Anglais l'ont inventée pour qu'elle survive à la longue traversée jusqu'aux Indes. Elle n'a pas fait tout ce chemin pour passer inaperçue.",
    tastingNote: "Amertume franche, arômes d'agrumes, belle rondeur. Elle est parfaitement équilibrée.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Canette 44 cl", "Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/IPA 33CL 3760268370136.png`,
    fermentation: "Haute (Ale)",
    abv: 5.5,
    ibu: 4,
    ebc: 2,
    ingredients: ["Malts d'orge (Pils, Carapils)", "Malt de blé", "Houblons (Triskel, Mistral, Magnum)", "Levure (AY4)", "CO₂"],
  },
  {
    slug: "neipa",
    name: "NEIPA",
    style: "New England India Pale Ale",
    description:
      "Cette bière est une NEIPA : née il y a seulement quelques années en Nouvelle-Angleterre, elle a séduit par ses arômes explosifs et sa douceur. Une belle harmonie.",
    tastingNote: "Arômes intenses de fruits blancs, rondeur veloutée, aucune amertume. Elle surprend par sa délicatesse.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Canette 44 cl", "Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/NEIPA 33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 5,
    ibu: 1,
    ebc: 3,
    ingredients: ["Malts d'orge (Pils, Munich, Caravienna)", "Flocons d'avoine", "Houblons (Motueka, Rakau)", "Levure (Saturated)", "CO₂"],
  },
  {
    slug: "more-is-bitter",
    name: "More is Bitter",
    style: "Bitter",
    description:
      "Cette bière est une Bitter : les Anglais l'appellent « Real Ale » : la vraie bière. Ils la servent à partir du « Cask », le fût en bois utilisé pour la fermentation. La pure tradition.",
    tastingNote: "Arômes de biscuit et de caramel, amertume sèche et franche. Elle affirme son caractère sans concession.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/MORE IS BITTER 33CL 3760268370044.png`,
    fermentation: "Haute (Ale)",
    abv: 4.5,
    ibu: 4,
    ebc: 4,
    ingredients: ["Malt d'orge (Pils, Cara amber)", "Houblons (East Kent Goldings, Magnum)", "Levure (AY4)", "CO₂"],
  },
  {
    slug: "neipa-exotic",
    name: "NEIPA Exotic",
    style: "NEIPA fruitée",
    description:
      "Cette bière est une NEIPA au caractère exotique : ses houblons ont été sélectionnés pour vous transporter tout en douceur. Georges avait l'esprit voyageur. Cette bière aussi.",
    tastingNote: "Explosion de fruits exotiques, rondeur veloutée, sans amertume. Elle ouvre de nouveaux horizons.",
    ranges: ["GMS", "CHR"],
    collection: "Les Spéciales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_NEIPA-EXOTIC_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 4,
    ibu: 1,
    ebc: 1,
    ingredients: ["Malt d'orge", "Flocons d'avoine", "Houblons", "Levure", "CO₂"],
  },
  {
    slug: "ipa-exotic",
    name: "IPA Exotic",
    style: "IPA fruitée",
    description:
      "Cette bière est une IPA au caractère exotique : ses houblons ont été choisis pour vous proposer une aventure inédite. Georges était intrépide. Cette bière vous emmène encore plus loin.",
    tastingNote: "Fruits exotiques intenses, amertume franche. Elle conduit vers l'inattendu.",
    ranges: ["GMS", "CHR"],
    collection: "Les Spéciales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${gmsBase}/BG_IPA-EXOTIC_33CL.png`,
    fermentation: "Haute (Ale)",
    abv: 3.8,
    ibu: 3,
    ebc: 2,
    ingredients: ["Malts d'orge", "Houblons", "Levure", "CO₂"],
  },
  {
    slug: "very-good-triple",
    name: "Very Good Triple",
    style: "Tripel",
    description:
      "Cette bière est une Triple : au Moyen-Âge, les moines réservaient leur bière la plus forte aux hôtes les plus considérés. Nous perpétuons la tradition.",
    tastingNote: "Arômes de miel et de fruits mûrs. Elle est puissante et élégante.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/VERY GOOD TRIPLE 33CL 3760268370372.png`,
    fermentation: "Haute (Ale)",
    abv: 9,
    ibu: 1,
    ebc: 3,
    ingredients: ["Malts d'orge (Pils, Munich)", "Sucre", "Houblons (Strisselspalt, Magnum)", "Levure (Bel Abbey)", "CO₂"],
  },
  {
    slug: "munica",
    name: "Munica Brune²",
    style: "Porter",
    description:
      "Cette bière est une Porter : née à Londres au XVIIIème siècle, elle était la préférée des porteurs de fardeaux. Ils avaient plutôt bon goût.",
    tastingNote: "Arômes toastés et chocolatés, des airs de cappuccino. Elle est généreuse et réconfortante.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/MUNICA BRUNE² 33CL 3760268370068.png`,
    fermentation: "Haute (Ale)",
    abv: 7,
    ibu: 3,
    ebc: 5,
    ingredients: ["Malts d'orge (Pils, Cara amber, Cara vienna, Chocolat)", "Sucre", "Lactose", "Houblons (Cascade, Herkules)", "CO₂"],
  },
  {
    slug: "princesse",
    name: "Princesse Pale Ale",
    style: "Pale Ale",
    description:
      "Cette bière est une Pale Ale : les Britanniques l'ont inventée, nous l'avons apprivoisée. Deux malts, deux houblons, zéro compromis.",
    tastingNote: "Amertume délicate et arômes subtils d'agrumes. Elle est rafraîchissante, avec du caractère.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl", "Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/PRINCESSE PALE ALE 33CL 3760268370006.png`,
    fermentation: "Haute (Ale)",
    abv: 5.4,
    ibu: 2,
    ebc: 1,
    ingredients: ["Malts d'orge (Pils, Munich)", "Houblons (Cascade, Magnum)", "Levure (AY4)", "CO₂"],
  },
  {
    slug: "framboise",
    name: "Framboise",
    style: "Bière fruitée",
    description:
      "Cette bière est une fruitée : les framboises sont ajoutées durant la fermentation. Pas d'arôme artificiel, pas de sucre, pas de raccourci.",
    tastingNote: "Goût naturel de framboise, robe rosée, fraîcheur acidulée. Elle ne triche pas.",
    ranges: ["GMS", "CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 75 cl", "Fût Inox 20L"],
    image: `${chrBase}/Visuel - FRAMBOISE 33CL - 3760268370471.png`,
    fermentation: "Haute (Ale)",
    abv: 5,
    ibu: 0,
    ebc: 2,
    ingredients: ["Malts d'orge (Pils)", "Malt de blé", "Purée de framboise (100 g/L)", "Houblons (Strisselspalt, Magnum)", "Levure (Banana)", "CO₂"],
  },
  {
    slug: "abricot",
    name: "Abricot",
    style: "Bière fruitée",
    description: "Une recette solaire et gourmande autour de l'abricot.",
    tastingNote: "Goût naturel d'abricot, fraîcheur acidulée, robe dorée.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl"],
    image: `${chrBase}/ABRICOT 33CL 3760268370846.png`,
    fermentation: "Haute (Ale)",
    abv: 4.2,
    ibu: 1,
    ebc: 1,
    ingredients: ["Malt d'orge Pilsner", "Purée d'abricots de la Drôme", "Houblon Saaz", "Levure neutre"],
  },
  {
    slug: "hiver",
    name: "Bière d'Hiver",
    style: "Bière saisonnière",
    description: "Un brassin réconfortant aux notes épicées et maltées.",
    tastingNote: "Arômes de cannelle, muscade et gingembre, corps rond et chaleureux.",
    ranges: ["CHR"],
    collection: "Les Originales",
    formats: ["Bouteille 33 cl", "Bouteille 75 cl"],
    image: `${chrBase}/HIVER 33CL 3760268370495.png`,
    fermentation: "Haute (Ale)",
    abv: 7.2,
    ibu: 2,
    ebc: 4,
    ingredients: ["Malts Munich, Crystal & Spécial B", "Épices (cannelle, muscade, gingembre)", "Miel"],
  },
];

export const beerCollections: BeerCollection[] = [
  "Les Originales",
  "Les Spéciales",
];
