export type Medal = {
  src: string;
  alt: string;
};

const lyonArgent = "Médaille d'argent — Concours de Lyon";
const lyonOr = "Médaille d'or — Concours de Lyon";
const medal = (n: number) => `/assets/medals/medal-${n}.png`;

/**
 * Médailles extraites de la présentation client (slides 29–41). Les clés
 * reprennent le numéro de l'image dans le PPTX pour pouvoir les retrouver.
 * Les visuels fournis sont petits (40–60 px) : à remplacer par les originaux
 * haute définition dès que le client les envoie.
 */
export const medals = {
  m42: { src: medal(42), alt: lyonArgent },
  m49: { src: medal(49), alt: lyonArgent },
  m52: { src: medal(52), alt: lyonArgent },
  m54: { src: medal(54), alt: lyonArgent },
  m61: { src: medal(61), alt: lyonArgent },
  m76: { src: medal(76), alt: lyonArgent },
  m80: { src: medal(80), alt: lyonArgent },
  m85: { src: medal(85), alt: lyonArgent },
  m89: { src: medal(89), alt: lyonArgent },
  m63: { src: medal(63), alt: lyonOr },
  m65: { src: medal(65), alt: lyonOr },
  m67: { src: medal(67), alt: lyonOr },
  m70: { src: medal(70), alt: lyonOr },
  m75: { src: medal(75), alt: lyonOr },
  m81: { src: medal(81), alt: lyonOr },
  m46: { src: medal(46), alt: "World Beer Awards — France Gold" },
  m47: { src: medal(47), alt: "World Beer Awards — France Winner" },
  m74: { src: medal(74), alt: "World Beer Awards — France Winner" },
  m58: { src: medal(58), alt: "World Beer Awards — France Silver" },
  m73: { src: medal(73), alt: "World Beer Awards — France Bronze" },
  m64: { src: medal(64), alt: "Médaille d'or" },
  m68: { src: medal(68), alt: "Médaille d'argent" },
  m78: { src: medal(78), alt: "Médaille d'argent" },
  m71: { src: medal(71), alt: "Médaille" },
} as const satisfies Record<string, Medal>;

export type MedalId = keyof typeof medals;
