import type { ReactNode, SVGProps } from "react";

import type { FormatKind, IngredientGroupKey } from "@/lib/beer-meta";

type PictoProps = Omit<SVGProps<SVGSVGElement>, "children">;

function Svg({ children, ...props }: PictoProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function BottleIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <path d="M10 2.5h4v4.2c0 1.1 2.2 2.1 2.2 5.1v8.7a1.5 1.5 0 0 1-1.5 1.5H9.3a1.5 1.5 0 0 1-1.5-1.5v-8.7c0-3 2.2-4 2.2-5.1z" />
      <path d="M7.8 14h8.4" />
    </Svg>
  );
}

export function CanIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <path d="M7 5.5v13c0 1.1 2.2 2 5 2s5-.9 5-2v-13" />
      <ellipse cx="12" cy="5.5" rx="5" ry="2" />
      <path d="M7 10h10" />
    </Svg>
  );
}

export function KegIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <rect x="5.5" y="4.5" width="13" height="16" rx="2.5" />
      <path d="M5.5 9h13M5.5 16h13" />
      <path d="M12 4.5V2.5h3" />
    </Svg>
  );
}

export function MaltIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <path d="M12 22V9" />
      <path d="M12 2.5c-1.6 1.4-1.6 3.4 0 4.8 1.6-1.4 1.6-3.4 0-4.8z" />
      <path d="M12 9c-2.4-.2-3.9-1.8-4-4 2.4.2 3.9 1.8 4 4zM12 9c2.4-.2 3.9-1.8 4-4-2.4.2-3.9 1.8-4 4z" />
      <path d="M12 14.5c-2.4-.2-3.9-1.8-4-4 2.4.2 3.9 1.8 4 4zM12 14.5c2.4-.2 3.9-1.8 4-4-2.4.2-3.9 1.8-4 4z" />
    </Svg>
  );
}

export function HopIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <path d="M12 1.5v2.5" />
      <path d="M12 4c-3 0-5.2 2-5.2 5 0 3.2 2.2 5.4 5.2 9.5 3-4.1 5.2-6.3 5.2-9.5 0-3-2.2-5-5.2-5z" />
      <path d="M9 8.5l3 2.7 3-2.7M10 13l2 1.8 2-1.8" />
    </Svg>
  );
}

export function YeastIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <circle cx="9" cy="9.5" r="3.5" />
      <circle cx="17" cy="8" r="2.2" />
      <circle cx="14.5" cy="16" r="3.2" />
      <circle cx="6.5" cy="17.5" r="1.6" />
    </Svg>
  );
}

export function OtherIcon(props: PictoProps) {
  return (
    <Svg {...props}>
      <path d="M10 3h4M11 3v6l-5.5 9.3A2 2 0 0 0 7.2 21h9.6a2 2 0 0 0 1.7-2.7L13 9V3" />
      <path d="M8.5 15h7" />
    </Svg>
  );
}

export function FormatIcon({
  kind,
  ...props
}: PictoProps & { kind: FormatKind }) {
  if (kind === "can") return <CanIcon {...props} />;
  if (kind === "keg") return <KegIcon {...props} />;
  return <BottleIcon {...props} />;
}

export function IngredientIcon({
  group,
  ...props
}: PictoProps & { group: IngredientGroupKey }) {
  if (group === "malt") return <MaltIcon {...props} />;
  if (group === "hops") return <HopIcon {...props} />;
  if (group === "yeast") return <YeastIcon {...props} />;
  return <OtherIcon {...props} />;
}
