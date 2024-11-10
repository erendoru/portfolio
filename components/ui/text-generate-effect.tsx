"use client";
import { useEffect } from "react";
import { motion, useAnimate, AnimationSequence } from "framer-motion";
import { cn } from "@/utils/cn";

export const TextGenerateEffect = ({
  words,
  className,
}: {
  words: string;
  className?: string;
}) => {
  const [scope, animate] = useAnimate();
  let wordsArray = words.split(" ");

  useEffect(() => {
    if (scope.current) {
      const animationSequence: AnimationSequence = [];

      // Her kelime için animasyon ekle
      wordsArray.forEach((_, index) => {
        animationSequence.push([
          `span:nth-child(${index + 1})`,
          { opacity: 1 },
          { duration: 0.1, delay: index * 0.1 },
        ]);
      });

      animate(animationSequence);
    }
  }, [animate, scope, wordsArray]);

  const renderWords = () => {
    return (
      <motion.div ref={scope}>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className={cn(
                `${idx > 3 ? "text-purple" : "text-white"}`,
                "opacity-0 inline-block"
              )}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
