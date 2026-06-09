import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { BeerCollectionsSection } from "@/components/sections/BeerCollectionsSection";
import { BrasserieSection } from "@/components/sections/BrasserieSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { JournalSection } from "@/components/sections/JournalSection";
import { ProductBannerSection } from "@/components/sections/ProductBannerSection";
import { RitualSection } from "@/components/sections/RitualSection";
import { StoreLocatorSection } from "@/components/sections/StoreLocatorSection";
import { TireuseSection } from "@/components/sections/TireuseSection";
import { FilmStripDivider } from "@/components/ui/FilmStripDivider";

export default function Home() {
  return (
    <>
      <Header />
      <main>
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
        <FilmStripDivider />
        <JournalSection />
      </main>
      <Footer />
    </>
  );
}
