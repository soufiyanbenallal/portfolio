import { AdvancedShell } from "./components/advanced-shell";
import { CapabilitiesSection } from "./components/sections/capabilities-section";
import { ContactSection } from "./components/sections/contact-section";
import { ExperienceSection } from "./components/sections/experience-section";
import { HeroSection } from "./components/sections/hero-section";
import { LabSection } from "./components/sections/lab-section";
import { ProcessSection } from "./components/sections/process-section";
import { WorkSection } from "./components/sections/work-section";

export default function Home() {
  return (
    <AdvancedShell>
      <HeroSection />
      <WorkSection />
      <ProcessSection />
      <ExperienceSection />
      <CapabilitiesSection />
      <LabSection />
      <ContactSection />
    </AdvancedShell>
  );
}
