import { medals, type MedalId } from "@/lib/medals";

type MedalRowProps = {
  ids: readonly MedalId[];
  /** Hauteur des médailles en pixels. */
  height?: number;
  className?: string;
};

/** Médailles obtenues par la bière, telles que fournies par le client. */
export function MedalRow({ ids, height = 40, className = "" }: MedalRowProps) {
  if (ids.length === 0) return null;

  return (
    <ul
      className={`flex flex-wrap items-center gap-2 ${className}`}
      aria-label="Médailles"
    >
      {ids.map((id, index) => {
        const medal = medals[id];
        return (
          <li key={`${id}-${index}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={medal.src}
              alt={medal.alt}
              title={medal.alt}
              style={{ height }}
              className="w-auto"
            />
          </li>
        );
      })}
    </ul>
  );
}
