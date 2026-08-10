import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/sections/HeroSection";
import { SkillsSection } from "@/sections/SkillsSection";
import { TechStackSection } from "@/sections/TechStackSection";
import { ServicesSection } from "@/sections/ServicesSection";
import { ProjectsSection } from "@/sections/ProjectsSection";
import { TestimonialsSection } from "@/sections/TestimonialsSection";
import { AboutSection } from "@/sections/AboutSection";
import { ContactSection } from "@/sections/ContactSection";
import { Footer } from "@/sections/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <TechStackSection />
      <ServicesSection />
      <ProjectsSection />
      <TestimonialsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
