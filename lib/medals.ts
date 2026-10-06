export type Competition =
  | "Concours de Lyon"
  | "World Beer Awards"
  | "Autres concours";

export type Medal = {
  src: string;
  alt: string;
  competition: Competition;
};

const medal = (n: number) => `/assets/medals/medal-${n}.png`;

const lyonArgent = {
  alt: "Médaille d'argent — Concours de Lyon",
  competition: "Concours de Lyon",
} as const;
const lyonOr = {
  alt: "Médaille d'or — Concours de Lyon",
  competition: "Concours de Lyon",
} as const;
const wba = (level: string) =>
  ({
    alt: `World Beer Awards — France ${level}`,
    competition: "World Beer Awards",
  }) as const;
const other = (alt: string) =>
  ({ alt, competition: "Autres concours" }) as const;

/**
 * Médailles extraites de la présentation client (slides 29–41). Les clés
 * reprennent le numéro de l'image dans le PPTX pour pouvoir les retrouver.
 * Les visuels fournis sont petits (40–60 px) : à remplacer par les originaux
 * haute définition dès que le client les envoie.
 */
export const medals = {
  m42: { src: medal(42), ...lyonArgent },
  m49: { src: medal(49), ...lyonArgent },
  m52: { src: medal(52), ...lyonArgent },
  m54: { src: medal(54), ...lyonArgent },
  m61: { src: medal(61), ...lyonArgent },
  m76: { src: medal(76), ...lyonArgent },
  m80: { src: medal(80), ...lyonArgent },
  m85: { src: medal(85), ...lyonArgent },
  m89: { src: medal(89), ...lyonArgent },
  m63: { src: medal(63), ...lyonOr },
  m65: { src: medal(65), ...lyonOr },
  m67: { src: medal(67), ...lyonOr },
  m70: { src: medal(70), ...lyonOr },
  m75: { src: medal(75), ...lyonOr },
  m81: { src: medal(81), ...lyonOr },
  m46: { src: medal(46), ...wba("Gold") },
  m47: { src: medal(47), ...wba("Winner") },
  m74: { src: medal(74), ...wba("Winner") },
  m58: { src: medal(58), ...wba("Silver") },
  m73: { src: medal(73), ...wba("Bronze") },
  m64: { src: medal(64), ...other("Médaille d'or") },
  m68: { src: medal(68), ...other("Médaille d'argent") },
  m78: { src: medal(78), ...other("Médaille d'argent") },
  m71: { src: medal(71), ...other("Médaille") },
} as const satisfies Record<string, Medal>;

export type MedalId = keyof typeof medals;

const competitionOrder: Competition[] = [
  "Concours de Lyon",
  "World Beer Awards",
  "Autres concours",
];

/** « 9 médailles · Concours de Lyon (4) · World Beer Awards (1) · … » */
export function summarizeMedals(ids: readonly MedalId[]): string {
  if (ids.length === 0) return "";

  const counts = new Map<Competition, number>();
  for (const id of ids) {
    const { competition } = medals[id];
    counts.set(competition, (counts.get(competition) ?? 0) + 1);
  }

  const parts = competitionOrder
    .filter((competition) => counts.has(competition))
    .map((competition) => `${competition} (${counts.get(competition)})`);

  const total = `${ids.length} médaille${ids.length > 1 ? "s" : ""}`;
  return [total, ...parts].join(" · ");
}
