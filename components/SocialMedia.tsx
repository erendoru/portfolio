import { socialMedia } from "../data";
import Link from "next/link";
import React from "react";
import AnimatedButton from "./animated-button";
import Image from "next/image";

const SocialMedia = () => {
  return (
    <div className="flex justify-center sm:justify-end mr-14">
      <div className="flex items-center justify-end md:gap-3 gap-6 my-3">
        <AnimatedButton />
        {socialMedia.map((info) => (
          <div
            key={info.id}
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
          >
            <Link rel="stylesheet" href={info.link} target="_blank">
              <Image
                src={info.img}
                alt="Social Media Icon"
                width={24}
                height={24}
                className="your-classes"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
