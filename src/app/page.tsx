import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Dock from "@/components/Dock";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="portfolio-shell min-h-screen text-white">
      <Hero />
      <Projects />
      <Skills />
      <Contact />
      <Dock />
    </main>
  );
}
