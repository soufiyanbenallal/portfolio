import {
  ContactSection,
  DetailsSection,
  ExperienceSection,
  ExpertiseSection,
  HeroSection,
  WorkSection,
} from "./components/portfolio-sections";
import { PortfolioShell } from "./components/portfolio-shell";

export default function Home() {
  return (
    <PortfolioShell>
      <HeroSection />
      <WorkSection />
      <ExperienceSection />
      <ExpertiseSection />
      <DetailsSection />
      <ContactSection />
    </PortfolioShell>
  );
}
