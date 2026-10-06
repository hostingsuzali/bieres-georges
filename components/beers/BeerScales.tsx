import { HopIcon } from "@/components/beers/Pictograms";

/** Teintes de la plus claire (1/5) à la plus foncée (5/5) — échelle EBC du client. */
const ebcPalette = ["#f2d27a", "#e0a43c", "#c4692a", "#7c3b1d", "#2e1810"];

/** Teinte de la bière d'après sa couleur /5 — pour les halos derrière les bouteilles. */
export function ebcColour(value?: number): string | undefined {
  if (value === undefined) return undefined;
  const index = Math.min(Math.max(Math.round(value), 1), 5) - 1;
  return ebcPalette[index];
}

type ScaleProps = {
  value?: number;
  size?: "sm" | "md";
  /** « light » sur fond vert, « dark » sur fond crème. */
  tone?: "light" | "dark";
};

function Pending({ tone }: { tone: "light" | "dark" }) {
  return (
    <span
      className={`text-xs font-semibold uppercase tracking-wider ${
        tone === "light" ? "text-cream/55" : "text-green/50"
      }`}
    >
      À confirmer
    </span>
  );
}

/** Amertume /5 en cônes de houblon. */
export function BitternessScale({ value, size = "md", tone = "dark" }: ScaleProps) {
  if (value === undefined) return <Pending tone={tone} />;

  const iconSize = size === "sm" ? "h-4 w-4" : "h-5 w-5";
  const off = tone === "light" ? "text-cream/20" : "text-green/20";

  return (
    <span
      role="img"
      aria-label={`Amertume ${value} sur 5`}
      className="inline-flex items-center gap-0.5"
    >
      {Array.from({ length: 5 }, (_, index) => (
        <HopIcon
          key={index}
          className={`${iconSize} ${index < value ? "text-orange" : off}`}
        />
      ))}
    </span>
  );
}

/** Couleur /5 en pastilles, de la blonde à la brune. */
export function ColourScale({ value, size = "md", tone = "dark" }: ScaleProps) {
  if (value === undefined) return <Pending tone={tone} />;

  const active = Math.min(Math.max(Math.round(value), 1), 5) - 1;
  const dot = size === "sm" ? "h-3 w-3" : "h-4 w-4";
  const ringOffset =
    tone === "light" ? "ring-offset-green-deep" : "ring-offset-cream";

  return (
    <span
      role="img"
      aria-label={`Couleur ${value} sur 5`}
      className="inline-flex items-center gap-1.5"
    >
      {ebcPalette.map((colour, index) => (
        <span
          key={colour}
          style={{ backgroundColor: colour }}
          className={`${dot} rounded-full transition-opacity ${
            index === active
              ? `ring-2 ring-orange ring-offset-2 ${ringOffset}`
              : "opacity-30"
          }`}
        />
      ))}
    </span>
  );
}
