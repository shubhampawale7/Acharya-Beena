import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "../components/common/Meta";
import { horoscopeData } from "../data/horoscopeData";
import { ZodiacIcon } from "../components/common/ZodiacIcon";
import {
  FireIcon,
  BeakerIcon,
  GlobeAltIcon,
  HashtagIcon,
  SwatchIcon,
  StarIcon,
} from "@heroicons/react/24/solid";

const HoroscopePage = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedSign = horoscopeData[selectedIndex];

  const handleSelectSign = (index) => {
    setSelectedIndex(index);
  };

  const rotation = -selectedIndex * (360 / horoscopeData.length);

  const elementInfo = {
    Fire: { icon: FireIcon, color: "text-red-500" },
    Earth: { icon: GlobeAltIcon, color: "text-green-500" },
    Air: { icon: BeakerIcon, color: "text-yellow-400" },
    Water: { icon: SwatchIcon, color: "text-blue-500" },
  };
  const ElementIcon = elementInfo[selectedSign.element]?.icon || StarIcon;

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <>
      <Meta
        title="Today's Horoscope | Acharya Beena"
        description="Get your free daily horoscope readings for all 12 zodiac signs. Find out what the stars have in store for you today."
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="bg-transparent py-24 sm:py-32 overflow-hidden min-h-screen"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
              Today's Cosmic Forecast
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Select your zodiac sign from the celestial ring to reveal its
              guidance for the day.
            </p>
          </motion.div>

          {/* --- The Grand Orrery Section --- */}
          <motion.div
            variants={itemVariants}
            className="mt-16 relative h-[26rem] sm:h-[32rem] w-full flex items-center justify-center"
          >
            {/* Decorative Orbital Ring */}
            <div className="absolute w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem] rounded-full border border-dashed border-gray-300 dark:border-white/10 animate-[spin_120s_linear_infinite]"></div>
            <div className="absolute w-[22rem] h-[22rem] sm:w-[30rem] sm:h-[30rem] rounded-full border border-gray-300 dark:border-white/10 animate-[spin_90s_linear_infinite_reverse]"></div>

            {/* The Rotating Sign Selector */}
            <motion.div
              className="absolute w-full h-full"
              animate={{ rotate: rotation }}
              transition={{ type: "spring", stiffness: 70, damping: 20 }}
            >
              {horoscopeData.map((sign, index) => {
                const angle =
                  (index / horoscopeData.length) * 2 * Math.PI - Math.PI / 2;
                const radius = window.innerWidth > 640 ? 220 : 150;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);

                return (
                  <motion.button
                    key={sign.id}
                    onClick={() => handleSelectSign(index)}
                    className="absolute top-1/2 left-1/2 w-20 h-20 -m-10 p-2 flex flex-col items-center justify-center rounded-full"
                    style={{ x, y }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                      scale: 1,
                      opacity: 1,
                      transition: { delay: 0.5 + index * 0.05 },
                    }}
                    whileHover={{ scale: 1.15 }}
                  >
                    <AnimatePresence>
                      {selectedIndex !== index && (
                        <motion.div
                          layoutId={`zodiac-icon-${sign.id}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 0.7 }}
                          exit={{ opacity: 0 }}
                          className="hover:!opacity-100 transition-opacity"
                        >
                          <ZodiacIcon
                            signName={sign.sign}
                            className="w-12 h-12"
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                );
              })}
            </motion.div>

            {/* The Central Selected Icon */}
            <div className="relative w-32 h-32 sm:w-40 sm:h-40">
              <AnimatePresence>
                <motion.div
                  key={selectedSign.id}
                  layoutId={`zodiac-icon-${selectedSign.id}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 200,
                    damping: 20,
                    duration: 0.5,
                  }}
                  className="absolute inset-0"
                >
                  <ZodiacIcon
                    signName={selectedSign.sign}
                    className="w-full h-full"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* --- The Cosmic Insight Card Section --- */}
          <div className="mt-12 mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSign.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.2, duration: 0.5, ease: "easeOut" },
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  transition: { duration: 0.3, ease: "easeIn" },
                }}
                className="p-8 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-starlight font-serif">
                      {selectedSign.sign}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {selectedSign.dateRange}
                    </p>
                    <p className="mt-4 text-base text-gray-700 dark:text-gray-300">
                      {selectedSign.prediction}
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <ElementIcon
                        className={`h-8 w-8 flex-shrink-0 p-1 rounded-full bg-black/5 dark:bg-white/5 ${
                          elementInfo[selectedSign.element]?.color ||
                          "text-gray-500"
                        }`}
                      />
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Element
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-starlight">
                          {selectedSign.element}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <SwatchIcon
                        className="h-8 w-8 flex-shrink-0 p-1 rounded-full bg-black/5 dark:bg-white/5"
                        style={{ color: selectedSign.colorHex }}
                      />
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Lucky Color
                        </p>
                        <p
                          className="text-sm font-bold"
                          style={{ color: selectedSign.colorHex }}
                        >
                          {selectedSign.luckyColor}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <HashtagIcon className="h-8 w-8 flex-shrink-0 p-1 rounded-full bg-black/5 dark:bg-white/5 text-gray-500 dark:text-gray-400" />
                      <div>
                        <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          Lucky Number
                        </p>
                        <p className="text-sm font-bold text-gray-900 dark:text-starlight">
                          {selectedSign.luckyNumber}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default HoroscopePage;
