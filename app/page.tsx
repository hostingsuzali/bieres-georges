import { SiteShell } from "@/components/layout/SiteShell";
import { BeerCollectionsSection } from "@/components/sections/BeerCollectionsSection";
import { BrasserieSection } from "@/components/sections/BrasserieSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { PartnersSection } from "@/components/sections/PartnersSection";
import { StoreLocatorSection } from "@/components/sections/StoreLocatorSection";
import { TireuseSection } from "@/components/sections/TireuseSection";

export default function Home() {
  return (
    <SiteShell>
      <HeroSection />
      <BeerCollectionsSection />
      <BrasserieSection />
      <StoreLocatorSection />
      <TireuseSection />
      <PartnersSection />
    </SiteShell>
  );
}
