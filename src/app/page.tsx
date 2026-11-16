import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Projects from "@/sections/Projects/Projects";
import Technologies from "@/sections/Technologies/Technologies";
import Process from "@/sections/Process/Process";
import Contact from "@/sections/Contact/Contact";
import Marquee from "@/components/Marquee/Marquee";

const MARQUEE_TOP = ["Desenvolvimento Web", "Hardware", "Automação", "Full Stack", "Arduino & ESP32"];
const MARQUEE_BOTTOM = ["Ideia", "Protótipo", "Código", "Teste", "Evolução"];

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={MARQUEE_TOP} />
      <About />
      <Projects />
      <Marquee items={MARQUEE_BOTTOM} baseVelocity={2} />
      <Technologies />
      <Process />
      <Contact />
    </main>
  );
}
