import { AnimatedBackground } from "@/components/animated-background";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/hero-section";
import { IdentitySection } from "@/components/identity-section";
import { JourneySection } from "@/components/journey-section";
import { ArchiveSection } from "@/components/archive-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <FloatingNav />
      <main>
        <HeroSection />
        <IdentitySection />
        <JourneySection />
        <ArchiveSection />
      </main>
      <Footer />
    </>
  );
}
