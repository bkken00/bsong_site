import { AnimatedBackground } from "@/components/animated-background";
import { FloatingParticles } from "@/components/floating-particles";
import { MouseFollower } from "@/components/mouse-follower";
import { FloatingNav } from "@/components/floating-nav";
import { HeroSection } from "@/components/hero-section";
import { SectionDivider } from "@/components/section-divider";
import { IdentitySection } from "@/components/identity-section";
import { JourneySection } from "@/components/journey-section";
import { ArchiveSection } from "@/components/archive-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <AnimatedBackground />
      <FloatingParticles />
      <MouseFollower />
      <FloatingNav />
      <main>
        <HeroSection />
        <SectionDivider variant="wave" />
        <IdentitySection />
        <SectionDivider variant="dots" />
        <JourneySection />
        <SectionDivider variant="gradient" />
        <ArchiveSection />
      </main>
      <Footer />
    </>
  );
}
