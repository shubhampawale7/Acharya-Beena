import React from "react";
import { motion } from "framer-motion";

const Starburst = () => {
  const numParticles = 50;
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
      {Array.from({ length: numParticles }).map((_, i) => {
        const angle = (i / numParticles) * 360;
        const distance = Math.random() * 200 + 150;
        const duration = Math.random() * 0.5 + 0.5;

        return (
          <motion.div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-yellow-400"
            initial={{ scale: 0, x: 0, y: 0 }}
            animate={{
              scale: [0, 1, 0],
              x: Math.cos(angle * (Math.PI / 180)) * distance,
              y: Math.sin(angle * (Math.PI / 180)) * distance,
            }}
            transition={{ duration, ease: "easeOut" }}
          />
        );
      })}
    </div>
  );
};

export default Starburst;
