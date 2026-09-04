import { Badge } from "@/components/ui/Badge";
import { CtaLink } from "@/components/ui/CtaLink";

type InternalPageHeroProps = {
  eyebrow?: string;
  title: string;
  intro?: string;
  image: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function InternalPageHero({
  eyebrow,
  title,
  intro,
  image,
  primary,
  secondary,
}: InternalPageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-green-deep px-4 pb-16 pt-32 text-cream sm:pb-24 sm:pt-40">
      <div className="pointer-events-none absolute inset-0 opacity-30">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-green-deep via-green-deep/90 to-green-deep/25" />
      </div>
      <div className="container-page relative z-10">
        <div className="max-w-4xl">
          {eyebrow && <Badge tone="green">{eyebrow}</Badge>}
          <h1 className="font-display mt-4 text-6xl font-bold uppercase leading-[0.88] tracking-tight sm:text-8xl lg:text-[8.5rem]">
            {title}
          </h1>
          {intro && (
            <p className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 sm:text-lg">
              {intro}
            </p>
          )}
          {(primary || secondary) && (
            <div className="mt-9 flex flex-wrap gap-3">
              {primary && (
                <CtaLink href={primary.href}>{primary.label}</CtaLink>
              )}
              {secondary && (
                <CtaLink href={secondary.href} variant="light">
                  {secondary.label}
                </CtaLink>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

