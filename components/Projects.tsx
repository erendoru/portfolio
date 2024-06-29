import React from "react";
import { HeroParallax } from "./ui/hero-parallax";
import { projects } from "@/data";
const Projects = () => {
  return (
    <div className="h-auto">
      <HeroParallax products={projects} />
    </div>
  );
};

export default Projects;
