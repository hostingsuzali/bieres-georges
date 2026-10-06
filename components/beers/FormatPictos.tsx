import { FormatIcon } from "@/components/beers/Pictograms";
import { parseFormats } from "@/lib/beer-meta";

type FormatPictosProps = {
  formats: readonly string[];
  /** « light » : texte crème, pour les fonds verts. « dark » : texte vert, pour les fonds crème. */
  tone?: "light" | "dark";
  size?: "sm" | "md";
};

/**
 * Conditionnements en pictogrammes : bouteille 33 cl / 75 cl, canette 44 cl,
 * fût 20 L / 30 L (slides 26 et 27 de la présentation client).
 */
export function FormatPictos({
  formats,
  tone = "dark",
  size = "md",
}: FormatPictosProps) {
  const items = parseFormats(formats);
  if (items.length === 0) return null;

  const toneClass =
    tone === "light"
      ? "border-cream/15 bg-cream/5 text-cream/85"
      : "border-green/15 bg-cream text-green/80";
  const iconHeight = {
    sm: { bottle33: "h-5", bottle75: "h-6", other: "h-5" },
    md: { bottle33: "h-6", bottle75: "h-8", other: "h-6" },
  }[size];

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => {
        const height =
          item.kind === "bottle"
            ? item.size === "75 cl"
              ? iconHeight.bottle75
              : iconHeight.bottle33
            : iconHeight.other;
        return (
          <li
            key={item.label}
            className={`inline-flex items-center gap-2 rounded-sm border px-2.5 py-1.5 ${toneClass}`}
          >
            <FormatIcon
              kind={item.kind}
              className={`${height} w-auto shrink-0 text-orange`}
            />
            <span className="text-xs font-bold uppercase tracking-wide">
              {item.size}
            </span>
            <span className="sr-only">{item.label}</span>
          </li>
        );
      })}
    </ul>
  );
}
