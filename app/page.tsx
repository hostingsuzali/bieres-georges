import { SiteShell } from "@/components/layout/SiteShell";
import { BeerCollectionsSection } from "@/components/sections/BeerCollectionsSection";
import { BrasserieSection } from "@/components/sections/BrasserieSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { ProductBannerSection } from "@/components/sections/ProductBannerSection";
import { RitualSection } from "@/components/sections/RitualSection";
import { StoreLocatorSection } from "@/components/sections/StoreLocatorSection";
import { TireuseSection } from "@/components/sections/TireuseSection";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";
import { PartnersSection } from "@/components/sections/PartnersSection";
export default function Home() {
  return (
    <SiteShell>
        <HeroSection />
        <FilmStripDivider />
        <BeerCollectionsSection />
        <FilmStripDivider />
        <RitualSection />
        <FilmStripDivider />
        <BrasserieSection />
        <ProductBannerSection />
        <FilmStripDivider />
        <StoreLocatorSection />
        <TireuseSection />
        <PartnersSection />
        <FilmStripDivider />
        <JournalSection />
    </SiteShell>
  );
}
