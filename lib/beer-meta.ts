export type FormatKind = "bottle" | "can" | "keg";

export type FormatItem = {
  kind: FormatKind;
  /** « 33 cl », « 44 cl », « 20 L »… */
  size: string;
  /** Libellé complet pour les lecteurs d'écran */
  label: string;
};

const kindLabel: Record<FormatKind, string> = {
  bottle: "Bouteille",
  can: "Canette",
  keg: "Fût",
};

/**
 * Transforme les libellés de conditionnement (« Bouteille 33 cl »,
 * « Fût Inox 20L / 30L »…) en éléments typés pour les pictogrammes.
 */
export function parseFormats(formats: readonly string[]): FormatItem[] {
  const items: FormatItem[] = [];

  for (const format of formats) {
    const unit = /(\d+)\s*cl/i.exec(format);
    if (/canette/i.test(format) && unit) {
      items.push({ kind: "can", size: `${unit[1]} cl`, label: `Canette ${unit[1]} cl` });
    } else if (/bouteille/i.test(format) && unit) {
      items.push({
        kind: "bottle",
        size: `${unit[1]} cl`,
        label: `Bouteille ${unit[1]} cl`,
      });
    } else if (/f[ûu]t/i.test(format)) {
      const volumes = [...format.matchAll(/(\d+)\s*L/gi)].map((match) => match[1]);
      for (const volume of volumes) {
        items.push({
          kind: "keg",
          size: `${volume} L`,
          label: `${kindLabel.keg} ${volume} L`,
        });
      }
    }
  }

  return items;
}

export type IngredientGroupKey = "malt" | "hops" | "yeast" | "other";

export type IngredientGroup = {
  key: IngredientGroupKey;
  label: string;
  items: string[];
};

const groupLabels: Record<IngredientGroupKey, string> = {
  malt: "Malts",
  hops: "Houblons",
  yeast: "Levures",
  other: "Autres",
};

const groupOrder: IngredientGroupKey[] = ["malt", "hops", "yeast", "other"];

function groupOf(ingredient: string): IngredientGroupKey {
  if (/^malt/i.test(ingredient)) return "malt";
  if (/^houblon/i.test(ingredient)) return "hops";
  if (/^levure/i.test(ingredient)) return "yeast";
  return "other";
}

/** Regroupe les ingrédients par famille : malts, houblons, levures, autres. */
export function groupIngredients(ingredients: readonly string[]): IngredientGroup[] {
  const buckets: Record<IngredientGroupKey, string[]> = {
    malt: [],
    hops: [],
    yeast: [],
    other: [],
  };

  for (const ingredient of ingredients) {
    buckets[groupOf(ingredient)].push(ingredient);
  }

  return groupOrder
    .filter((key) => buckets[key].length > 0)
    .map((key) => ({ key, label: groupLabels[key], items: buckets[key] }));
}

/** « 4,2 % » — ou la mention du tableau client quand elle est donnée (« 4-5 % »). */
export function formatAbv(abv: number | undefined, abvLabel?: string): string {
  if (abvLabel) return abvLabel;
  if (abv === undefined) return "À confirmer";
  return `${String(abv).replace(".", ",")} %`;
}
