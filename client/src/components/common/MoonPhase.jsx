import React from "react";
import { motion } from "framer-motion";

// Moon Phase SVG Icons (a simplified set)
const MOON_ICONS = {
  "New Moon": () => (
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.1" />
  ),
  "Waxing Crescent": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-2.5 10a7.5 7.5 0 1 1 5 0 7.5 7.5 0 0 1-5 0z"
      fill="currentColor"
    />
  ),
  "First Quarter": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 2v20a10 10 0 0 0 0-20z"
      fill="currentColor"
    />
  ),
  "Waxing Gibbous": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-5 10a7.5 7.5 0 1 1 10 0 7.5 7.5 0 0 1-10 0zM12 2a7.5 7.5 0 0 1 0 20"
      fill="currentColor"
    />
  ),
  "Full Moon": () => <circle cx="12" cy="12" r="10" fill="currentColor" />,
  "Waning Gibbous": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm-5 10a7.5 7.5 0 1 1 10 0 7.5 7.5 0 0 1-10 0zM12 2a7.5 7.5 0 0 0 0 20"
      fill="currentColor"
    />
  ),
  "Third Quarter": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 2v20a10 10 0 0 1 0-20z"
      fill="currentColor"
    />
  ),
  "Waning Crescent": () => (
    <path
      d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zm2.5 10a7.5 7.5 0 1 1-5 0 7.5 7.5 0 0 1 5 0z"
      fill="currentColor"
    />
  ),
};

const getMoonPhase = (date) => {
  const LUNAR_CYCLE = 29.530588853;
  // A known new moon date (e.g., July 25, 2025)
  const knownNewMoon = new Date("2025-07-25T19:02:00Z");
  const daysSinceNewMoon = (date - knownNewMoon) / (1000 * 60 * 60 * 24);
  const currentPhase = (daysSinceNewMoon % LUNAR_CYCLE) / LUNAR_CYCLE;

  if (currentPhase < 0.03 || currentPhase >= 0.97) return "New Moon";
  if (currentPhase < 0.22) return "Waxing Crescent";
  if (currentPhase < 0.28) return "First Quarter";
  if (currentPhase < 0.47) return "Waxing Gibbous";
  if (currentPhase < 0.53) return "Full Moon";
  if (currentPhase < 0.72) return "Waning Gibbous";
  if (currentPhase < 0.78) return "Third Quarter";
  return "Waning Crescent";
};

const MoonPhase = () => {
  const today = new Date(); // Use new Date() for the real current date
  // const today = new Date('2025-08-05T12:00:00Z'); // For testing with your provided date
  const phaseName = getMoonPhase(today);
  const Icon = MOON_ICONS[phaseName];

  return (
    <motion.div
      className="p-4 rounded-2xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
    >
      <div className="flex items-center gap-4">
        <div className="text-gray-800 dark:text-starlight">
          <svg width="40" height="40" viewBox="0 0 24 24">
            <Icon />
          </svg>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Moon Phase
          </p>
          <p className="text-lg font-bold text-gray-900 dark:text-starlight">
            {phaseName}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default MoonPhase;
