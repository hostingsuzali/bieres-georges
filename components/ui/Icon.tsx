import type { ReactElement, SVGProps } from "react";

type IconName =
  | "savoirFaire"
  | "heritage"
  | "caractere"
  | "generosite"
  | "bar"
  | "caviste"
  | "distribution"
  | "evenement"
  | "arrowRight"
  | "arrowLeft"
  | "search"
  | "pin"
  | "check"
  | "menu"
  | "close"
  | "instagram"
  | "facebook"
  | "linkedin"
  | "diamond";

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

const paths: Record<IconName, ReactElement> = {
  savoirFaire: (
    <>
      <path d="M12 3v18" />
      <path d="M12 7c-1.6-2-3.6-2.4-5-2 .4 1.6 1.6 3.2 3.6 3.6" />
      <path d="M12 7c1.6-2 3.6-2.4 5-2-.4 1.6-1.6 3.2-3.6 3.6" />
      <path d="M12 12c-1.6-2-3.6-2.4-5-2 .4 1.6 1.6 3.2 3.6 3.6" />
      <path d="M12 12c1.6-2 3.6-2.4 5-2-.4 1.6-1.6 3.2-3.6 3.6" />
    </>
  ),
  heritage: (
    <>
      <path d="M6 3h12v15l-6 3-6-3V3Z" />
      <path d="M9 8h6" />
      <path d="M9 12h6" />
    </>
  ),
  caractere: (
    <>
      <circle cx="12" cy="10" r="6" />
      <path d="M9 15.5 8 21l4-2 4 2-1-5.5" />
      <path d="M12 7v6M9 10h6" />
    </>
  ),
  generosite: (
    <>
      <path d="M12 20s-7-4.3-7-9a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 4.7-7 9-7 9Z" />
    </>
  ),
  bar: (
    <>
      <path d="M5 4h14l-6 7v6" />
      <path d="M9 21h6" />
      <path d="M7 8h10" />
    </>
  ),
  caviste: (
    <>
      <path d="M9 3h6l-1 8a3 3 0 0 1-4 0L9 3Z" />
      <path d="M12 11v7" />
      <path d="M9 21h6" />
    </>
  ),
  distribution: (
    <>
      <path d="M3 7h13v8H3z" />
      <path d="M16 10h3l2 3v2h-5z" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17" cy="18" r="1.6" />
    </>
  ),
  evenement: (
    <>
      <path d="M12 3v4" />
      <path d="M7 7h10l-1.5 5.5a4 4 0 0 1-7 0L7 7Z" />
      <path d="M12 12.5V18" />
      <path d="M8 21h8" />
      <path d="m9 3 1 2M15 3l-1 2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 6-6 6 6 6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  check: (
    <>
      <path d="m5 12 4.5 4.5L19 7" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </>
  ),
  close: (
    <>
      <path d="m6 6 12 12" />
      <path d="m18 6-12 12" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  facebook: (
    <>
      <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V8.5c0-.3.2-.5.5-.5H14Z" />
    </>
  ),
  linkedin: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M8 10v7M8 7v.01M12 17v-4a2 2 0 0 1 4 0v4" />
    </>
  ),
  diamond: (
    <>
      <path d="M12 3 21 12l-9 9-9-9 9-9Z" />
    </>
  ),
};

export function Icon({ name, size = 24, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name]}
    </svg>
  );
}

export type { IconName };
