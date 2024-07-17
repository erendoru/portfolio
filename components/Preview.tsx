"use client";
import React from "react";
import { motion } from "framer-motion";
import { LinkPreview } from "@/components/ui/link-preview";

export function LinkPreviewDemo() {
  return (
    <div
      className=" flex justify-center items-center  mb-32 flex-col my-8"
      id="aboutme"
    >
      <h1 className=" left-12 text-5xl mb-8 text-purple">ABOUT ME</h1>
      <p className="text-neutral-500 dark:text-neutral-400 text-xl max-w-3xl mx-auto">
        From the age of 7 to 19, I played ice hockey at the national team level.
        At 19, I followed my passion for technology, leaving physical education
        behind. I completed a two-year degree in computer programming and began
        studying computer engineering.
        <br /> <br />I started coding with Unity and C# for game development and
        created a game called{" "}
        <LinkPreview
          url="https://www.apkmonk.com/app/com.erendoru.MuskLife/#google_vignette"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500 "
        >
          Musklife.
        </LinkPreview>{" "}
        I also had a strong interest in starting my own businesses. Realizing my
        ideas were focused on web applications, I developed my skills in
        JavaScript and specialized in frontend development.
        <br />
        <br /> I launched two e-commerce ventures,{" "}
        <LinkPreview
          url="https://www.pufero.com/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          {" "}
          Pufero{" "}
        </LinkPreview>{" "}
        and{" "}
        <LinkPreview
          url="https://onwooden.com/"
          className="font-bold bg-clip-text text-transparent bg-gradient-to-br from-purple-500 to-pink-500"
        >
          {" "}
          Onwooden{" "}
        </LinkPreview>{" "}
        , both of which continue to operate. Currently, I am advancing my
        software development career while working on new technological projects
        beyond e-commerce.
        <br />
        <br /> This journey has taught me resilience, adaptability, and the
        power of technology to innovate. I am excited to bring these experiences
        to new challenges.
      </p>
    </div>
  );
}
