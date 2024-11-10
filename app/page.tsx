import Grid from "@/components/Grid";
import Hero from "@/components/Hero";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { LinkPreviewDemo } from "@/components/Preview";
import { navItems } from "@/data";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Footer from "@/components/Footer";
import SocialMedia from "@/components/SocialMedia";

export default function Home() {
  const products = [];

  return (
    <main className=" relative  bg-black-100 flex justify-center items-center flex-col  mx-auto sm:px-10 px-5 overflow-clip">
      <div className="max-w-7xl w-full ">
        <FloatingNav navItems={navItems} />
        <Hero />
        <Grid />
        <LinkPreviewDemo />
        {/* <Projects /> */}
        {/* <Experience /> */}
        <Footer />
      </div>
    </main>
  );
}
