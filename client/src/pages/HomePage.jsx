import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

// Common Components
import Meta from "../components/common/Meta";
import MoonPhase from "../components/common/MoonPhase";
import ZodiacWheel from "../components/common/ZodiacWheel";

// Redesigned Page Sections
import ServicesOverview from "../components/ServicesOverview";
import AboutSnippet from "../components/AboutSnippet";
import CtaBanner from "../components/CtaBanner";
import TestimonialsSnippet from "../components/TestimonialSnippet";
import LifePathCalculator from "../components/LifePathCalculator";
import acharyaBeenaImg from "../assets/images/acharya-beena.png"; // Make sure to have a professional photo

const HomePage = () => {
  return (
    <>
      <Meta
        title="Welcome to Acharya Beena | Expert Astrologer"
        description="Get personalized astrological readings and guidance from Acharya Beena. Explore Vedic astrology, Vastu, and Numerology to illuminate your path."
      />

      {/* --- NEW "Celestial Dashboard" Hero Section --- */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent py-24 px-6">
        <div className="absolute -bottom-40 -left-40 w-[30rem] h-[30rem] opacity-40 lg:opacity-100">
          <ZodiacWheel />
        </div>

        {/* Main Content Grid */}
        <div className="relative z-10 mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          {/* Left side spacer */}
          <div className="lg:col-span-1"></div>

          {/* Center Content Panel */}
          <motion.div
            className="lg:col-span-3 p-8 rounded-3xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          >
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-6xl font-serif">
              Guidance from the Stars
            </h1>
            <p className="mt-6 text-lg max-w-2xl mx-auto leading-8 text-gray-600 dark:text-gray-300">
              Unlock your potential and navigate life's journey with cosmic
              wisdom. Acharya Beena offers personalized astrological readings to
              illuminate your path.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link to="/book-consultation">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="rounded-full bg-nebula-purple px-6 py-3 text-base font-semibold text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nebula-purple"
                >
                  Book a Consultation
                </motion.button>
              </Link>
              <Link to="/services">
                <motion.div
                  className="group inline-flex items-center gap-x-2 text-base font-semibold text-gray-800 dark:text-starlight"
                  whileHover={{ gap: "1rem" }}
                >
                  View Services
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right side widgets */}
          <div className="lg:col-span-1 flex flex-col gap-8 items-center lg:items-start">
            <MoonPhase />
            <motion.div
              className="flex items-center gap-4 p-4 rounded-2xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.8 }}
            >
              <img
                src={acharyaBeenaImg}
                alt="Acharya Beena"
                className="h-16 w-16 rounded-full object-cover ring-2 ring-nebula-purple/50"
              />
              <div>
                <p className="font-bold text-gray-900 dark:text-starlight">
                  Acharya Beena
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Your Cosmic Guide
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- Page Content Sections in Improved Narrative Order --- */}
      <ServicesOverview />
      <LifePathCalculator />
      <AboutSnippet />
      <TestimonialsSnippet />
      <CtaBanner />
    </>
  );
};

export default HomePage;
