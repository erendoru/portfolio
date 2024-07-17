import { workExperience } from "@/data";
import React from "react";
import { Button } from "./ui/MovingBorders";

const Experience = () => {
  return (
    <div>
      <div className="py-[-24]  mb-10" id="testimonials">
        <div className=" text-center text-5xl ">
          <h1 className="heading">
            My
            <span className="text-purple"> Skills</span>
          </h1>
        </div>
        <div className="w-full mt-12 grid lg:grid-cols-4 sm:grid-cols-1 gap-10 ">
          {workExperience.map((card) => (
            <Button
              key={card.id}
              className="flex-1 sm:align-middle justify-center text-white border-neutral-200 dark:border-slate-800"
              duration={Math.floor(Math.random() * 10000) + 10000}
            >
              <div className="flex lg:flex-row flex-col lg:items-center sm:items-center  p-5 py-6 md:p-5 lg:p-10 gap-2">
                <img
                  src={card.thumbnail}
                  alt={card.thumbnail}
                  className="lg:w-32 md:w-20 w-16"
                />
                <div className=" lg:ms-15 md:max-w-[700px]">
                  <h1 className="text-start text-xl md:text-2xl sm:text-center font-bold">
                    {card.title}
                  </h1>
                  <p className="text-start text-white-100 mt-3 sm:text-center font-semibold ">
                    {card.desc}
                  </p>
                </div>
              </div>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
