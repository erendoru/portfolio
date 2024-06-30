import { socialMedia } from "../data";
import Link from "next/link";
import React from "react";

const SocialMedia = () => {
  return (
    <div className="flex justify-center sm:justify-end">
      <div className="flex items-center justify-end md:gap-3 gap-6 my-3">
        {socialMedia.map((info) => (
          <div
            key={info.id}
            className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
          >
            <Link rel="stylesheet" href={info.link} target="_blank">
              <img src={info.img} alt="icons" width={20} height={20} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SocialMedia;
