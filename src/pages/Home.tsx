import { Navbar } from "../components/Navbar";
// import { ThemeToggle } from "../components/ThemeToggle";
import { StarBackground } from "@/components/StarBackground";
import { SkyBackground } from "@/components/SkyBackground";
import { HeroSection } from "../components/HeroSection";
import { AboutSection } from "../components/AboutSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { SkillsSection } from "../components/SkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { ContactSection } from "../components/ContactSection";
import { Footer } from "../components/Footer";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

export const Home = () => {
  const [isLightMode, setIsLightMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "light") {
      setIsLightMode(true);
    } else {
      setIsLightMode(false);
    }

    const observer = new MutationObserver(() => {
      setIsLightMode(document.documentElement.classList.contains("light"));
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Helmet>
        <title>Gia Hung Pham | Full-Stack Developer Portfolio</title>
        <meta
          name="description"
          content="Portfolio of Gia Hung Pham (Phạm Trần Gia Hưng) - a software engineer and full-stack developer building web apps with React, TypeScript, Node.js, and Spring Boot, and exploring ML/NLP."
        />
        <link rel="canonical" href="https://giahung-portfolio.vercel.app/" />
      </Helmet>

      {/* Background Effects */}
      {isLightMode ? <SkyBackground /> : <StarBackground />}

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main>
        <HeroSection />
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};