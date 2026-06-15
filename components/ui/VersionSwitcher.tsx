import Link from "next/link";

import { Icon } from "@/components/ui/Icon";

type VersionSwitcherProps = {
  href: string;
  targetVersion: "V1" | "V2";
};

export function VersionSwitcher({
  href,
  targetVersion,
}: VersionSwitcherProps) {
  return (
    <section className="border-t border-green/10 bg-cream px-4 py-10">
      <div className="container-page flex justify-center">
        <Link
          href={href}
          className="group flex items-center gap-4 rounded-full border border-green/20 bg-cream-dark px-6 py-3 text-green transition-colors hover:border-orange hover:text-orange"
        >
          <span className="eyebrow">Basculer vers {targetVersion}</span>
          <span className="transition-transform group-hover:translate-x-1">
            <Icon name="arrowRight" size={17} />
          </span>
        </Link>
      </div>
    </section>
  );
}

