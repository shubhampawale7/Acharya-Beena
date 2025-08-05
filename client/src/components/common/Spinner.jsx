import React from "react";
import { motion } from "framer-motion";

const Spinner = ({ size = "md" }) => {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className="flex justify-center items-center">
      <div className={`relative ${sizeClasses[size]}`}>
        {/* The main rotating container */}
        <motion.div
          className="w-full h-full"
          animate={{ rotate: 360 }}
          transition={{
            loop: Infinity,
            ease: "linear",
            duration: 2,
          }}
        >
          {/* Celestial Orb 1 (Large, Faint) */}
          <motion.div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-1/3 bg-indigo-600/50 dark:bg-nebula-purple/50 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{
              loop: Infinity,
              ease: "easeInOut",
              duration: 1.5,
              delay: 0.2,
            }}
          />

          {/* Celestial Orb 2 (Medium) */}
          <motion.div
            className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-600/70 dark:bg-nebula-purple/70 rounded-full"
            style={{ transformOrigin: "150% 50%" }}
            animate={{ scale: [1, 0.8, 1] }}
            transition={{
              loop: Infinity,
              ease: "easeInOut",
              duration: 1.5,
              delay: 0.5,
            }}
          />

          {/* Celestial Orb 3 (Small, Bright) */}
          <motion.div
            className="absolute bottom-0 right-0 w-1/5 h-1/5 bg-indigo-600 dark:bg-nebula-purple rounded-full"
            style={{ transformOrigin: "-50% -50%" }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{
              loop: Infinity,
              ease: "easeInOut",
              duration: 1.5,
              delay: 0.8,
            }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default Spinner;
