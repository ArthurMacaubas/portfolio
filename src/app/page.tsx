import Hero from "@/sections/Hero/Hero";
import About from "@/sections/About/About";
import Projects from "@/sections/Projects/Projects";
import Technologies from "@/sections/Technologies/Technologies";
import Process from "@/sections/Process/Process";
import GithubCTA from "@/sections/GithubCTA/GithubCTA";
import Contact from "@/sections/Contact/Contact";

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Projects />
      <Technologies />
      <Process />
      <GithubCTA />
      <Contact />
    </main>
  );
}
