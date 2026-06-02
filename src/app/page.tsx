import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Showreel from "@/components/Showreel";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Gallery from "@/components/Gallery";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import IntroAnimation from "@/components/IntroAnimation";
import Cursor from "@/components/Cursor";

export default function Home() {
  return (
    <>
      <Cursor />
      <IntroAnimation />
      <Navbar />
      <main>
        <Hero />
        <Showreel />
        <About />
        <Projects />
        <Gallery />
        <Experience />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
