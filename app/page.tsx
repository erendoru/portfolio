import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { FaHome } from "react-icons/fa";
import { LinkPreviewDemo } from "@/components/Preview";
import { HeroParallax } from "@/components/ui/hero-parallax";
import { projects } from "@/data";
import { navItems } from "@/data";

export default function Home() {
  const products = [];

  return (
    <main className="relative  bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
      <div className="max-w-7xl w-full ">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <LinkPreviewDemo />
        <HeroParallax products={projects} />
        <h1>sa</h1>
      </div>
    </main>
  );
}
