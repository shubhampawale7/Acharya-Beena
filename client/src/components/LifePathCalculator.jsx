import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SparklesIcon,
  CalendarDaysIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/solid";
import AnimatedNumber from "./common/AnimatedNumber";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import "react-day-picker/dist/style.css";

const interpretations = {
  1: "As a natural leader, you are independent, ambitious, and a pioneer charting new paths.",
  2: "As a peacemaker, you are diplomatic, intuitive, and possess a unique ability to create harmony.",
  3: "As a vibrant communicator, you are creative, social, and gifted with joyful self-expression.",
  4: "As a master builder, you are practical, organized, and dedicated to creating lasting, stable foundations.",
  5: "As a spirited adventurer, you are a freedom-lover who thrives on change, travel, and new experiences.",
  6: "As a compassionate nurturer, you are responsible, loving, and a true caretaker for your community.",
  7: "As a wise seeker, you are analytical, spiritual, and driven by a deep desire for truth and knowledge.",
  8: "As a powerful force, you are ambitious, business-minded, and possess formidable leadership skills.",
  9: "As a selfless humanitarian, you are compassionate, idealistic, and dedicated to serving the greater good.",
  11: "As The Illuminator (Master Number), you possess heightened intuition, spiritual insight, and are a channel for higher wisdom.",
  22: "As The Master Builder (Master Number), you have the immense power to turn grand, ambitious dreams into tangible reality.",
  33: "As The Master Teacher (Master Number), you are a profound source of healing, compassion, and loving guidance for all.",
};

const LifePathCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isPickerOpen, setIsPickerOpen] = useState(false);
  const [lifePathNumber, setLifePathNumber] = useState(null);
  const [error, setError] = useState("");
  const pickerRef = useRef(null);

  const calculateLifePath = (dateString) => {
    if (!dateString) return null;
    const digits = dateString.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((acc, digit) => acc + digit, 0);
    if ([11, 22, 33].includes(sum)) return sum;
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .map(Number)
        .reduce((acc, digit) => acc + digit, 0);
      if ([11, 22, 33].includes(sum)) return sum;
    }
    return sum;
  };

  const handleSelectDate = (date) => {
    setSelectedDate(date);
    setIsPickerOpen(false);
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedDate) {
      setError("Please select your date of birth.");
      setLifePathNumber(null);
      return;
    }
    setError("");
    const dateString = format(selectedDate, "yyyy-MM-dd");
    const number = calculateLifePath(dateString);
    setLifePathNumber(number);
  };

  const handleReset = () => {
    setLifePathNumber(null);
    setSelectedDate(null);
    setError("");
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const toolVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: 0.2 },
    },
  };

  const formContentVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
  };

  return (
    // The main container is now transparent
    <div className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 items-center">
          <motion.div
            variants={contentVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <h2 className="font-serif text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl">
              Your Life Path Number is Your Cosmic Key
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Calculated from your date of birth, your Life Path Number reveals
              the central theme of your life's journey. It illuminates your core
              personality, highlights your innate gifts, and points toward the
              lessons you are here to learn.
            </p>
            <AnimatePresence>
              {lifePathNumber !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    transition: { delay: 0.5, duration: 0.6 },
                  }}
                  exit={{ opacity: 0 }}
                  className="mt-8 p-6 rounded-2xl bg-slate-100 dark:bg-black/10 backdrop-blur-sm"
                >
                  <h3 className="font-serif text-2xl font-semibold text-nebula-purple">
                    Interpretation
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {interpretations[lifePathNumber]}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={toolVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="relative p-8 rounded-3xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-xl dark:shadow-2xl min-h-[350px]"
          >
            <AnimatePresence mode="wait">
              {lifePathNumber === null ? (
                <motion.div
                  key="form"
                  variants={formContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center text-center h-full"
                >
                  <SparklesIcon className="h-10 w-10 text-nebula-purple" />
                  <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-starlight">
                    Unlock Your Number
                  </h3>
                  <div className="relative mt-6" ref={pickerRef}>
                    <button
                      type="button"
                      onClick={() => setIsPickerOpen(!isPickerOpen)}
                      className="flex items-center gap-x-2 rounded-full border-0 px-5 py-3 bg-white/50 dark:bg-white/10 text-gray-800 dark:text-starlight shadow-sm ring-1 ring-inset ring-black/10 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
                    >
                      <CalendarDaysIcon className="h-5 w-5 text-gray-400" />
                      <span
                        className={
                          selectedDate
                            ? "text-gray-900 dark:text-starlight"
                            : "text-gray-500 dark:text-gray-400"
                        }
                      >
                        {selectedDate
                          ? format(selectedDate, "PPP")
                          : "Select your date of birth"}
                      </span>
                    </button>

                    <AnimatePresence>
                      {isPickerOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute top-full mt-2 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md rounded-2xl shadow-2xl p-4 ring-1 ring-black/10 dark:ring-white/10"
                        >
                          <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleSelectDate}
                            captionLayout="dropdown-buttons"
                            fromYear={1920}
                            toYear={new Date().getFullYear()}
                            initialFocus
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    type="button"
                    onClick={handleSubmit}
                    className="mt-6 rounded-full bg-nebula-purple px-10 py-3 font-semibold text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nebula-purple"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Reveal
                  </motion.button>
                  {error && (
                    <p className="mt-4 text-sm text-red-500 dark:text-red-400">
                      {error}
                    </p>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="result"
                  variants={formContentVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="flex flex-col items-center justify-center text-center h-full"
                >
                  <div className="relative flex h-48 w-48 items-center justify-center rounded-full bg-gradient-to-br from-nebula-purple/10 to-transparent dark:from-nebula-purple/20 dark:to-deep-space/30 ring-1 ring-black/5 dark:ring-white/20 shadow-xl dark:shadow-2xl">
                    <div className="absolute inset-0 rounded-full animate-pulse bg-nebula-purple/10 dark:bg-nebula-purple/20 blur-xl"></div>
                    <span className="relative text-8xl font-bold text-gray-900 dark:text-starlight">
                      <AnimatedNumber value={lifePathNumber} />
                    </span>
                  </div>
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: { delay: 1, duration: 0.5 },
                    }}
                    onClick={handleReset}
                    className="mt-8 group inline-flex items-center gap-x-2 rounded-full px-5 py-2 text-sm font-semibold leading-6 text-gray-700 dark:text-gray-300 hover:bg-black/5 dark:hover:bg-white/10 transition"
                  >
                    <ArrowPathIcon className="h-5 w-5 transition-transform group-hover:rotate-[-180deg]" />
                    Calculate Again
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LifePathCalculator;
