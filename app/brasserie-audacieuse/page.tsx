import type { Metadata } from "next";

import { SiteShell } from "@/components/layout/SiteShell";
import { EquipeSection } from "@/components/sections/brasserie/EquipeSection";
import { HistoireSection } from "@/components/sections/brasserie/HistoireSection";
import { ManifestoSection } from "@/components/sections/brasserie/ManifestoSection";
import { SavoirFaireSection } from "@/components/sections/brasserie/SavoirFaireSection";
import { ValeursSection } from "@/components/sections/brasserie/ValeursSection";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";
import { InternalPageHero } from "@/components/ui/InternalPageHero";
import { KeywordsMarquee } from "@/components/ui/KeywordsMarquee";
import { VersionSwitcher } from "@/components/ui/VersionSwitcher";

export const metadata: Metadata = {
  title: "Brasserie audacieuse | Bières Georges",
  description:
    "L'histoire, le manifeste, les valeurs, l'équipe et le savoir-faire des Bières Georges, brasserie lyonnaise audacieuse depuis 1836.",
};

export default function BrasserieAudacieusePage() {
  return (
    <SiteShell>
      <InternalPageHero
        title="Brasserie audacieuse"
        image="/assets/images/BRASSERIE.jpg"
      />

      {/* ── Histoire — slider des 12 jalons ── */}
      <HistoireSection />

      {/* ── Divider ── */}
      <FilmStripDivider />

      {/* ── Manifeste ── */}
      <ManifestoSection />

      {/* ── Keywords marquee ── */}
      <KeywordsMarquee />

      {/* ── Valeurs ── */}
      <ValeursSection />

      {/* ── Divider ── */}
      <FilmStripDivider />

      {/* ── Équipe ── */}
      <EquipeSection />

      {/* ── Savoir-faire ── */}
      <SavoirFaireSection />

      <VersionSwitcher href="/brasserie-audacieuse/v2" targetVersion="V2" />
    </SiteShell>
  );
}
