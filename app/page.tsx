import HeroSection from "./components/HeroSection";
import ExplodedSection from "./components/ExplodedSection";
import CraftsmanshipSection from "./components/CraftsmanshipSection";
import StorySection from "./components/StorySection";
import ShowcaseSection from "./components/ShowcaseSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <ExplodedSection />
      <CraftsmanshipSection />
      <StorySection />
      <ShowcaseSection />
      <Footer />
    </main>
  );
}
