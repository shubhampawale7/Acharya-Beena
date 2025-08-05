import React from "react";
import { motion } from "framer-motion";
import { ZodiacIcon } from "./ZodiacIcon"; // Assuming ZodiacIcon is in the same folder

const signs = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

const ZodiacWheel = () => {
  const radius = 120; // The radius of the circle on which icons are placed
  return (
    <motion.div
      className="relative w-80 h-80 sm:w-96 sm:h-96"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
    >
      <motion.div
        className="w-full h-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, ease: "linear", repeat: Infinity }}
      >
        {signs.map((sign, i) => {
          const angle = (i / signs.length) * 2 * Math.PI;
          const x = radius * Math.cos(angle);
          const y = radius * Math.sin(angle);
          return (
            <div
              key={sign}
              className="absolute top-1/2 left-1/2 w-16 h-16 -m-8"
              style={{ transform: `translate(${x}px, ${y}px)` }}
            >
              <ZodiacIcon signName={sign} className="w-full h-full" />
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default ZodiacWheel;
