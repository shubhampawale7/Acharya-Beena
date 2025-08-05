// src/components/AboutSnippet.jsx

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import {
  AcademicCapIcon,
  SparklesIcon,
  UserCircleIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

// Updated highlights with more thematic icons
const highlights = [
  {
    name: "Verified Expertise",
    description: "Certified in multiple astrological disciplines.",
    icon: AcademicCapIcon,
  },
  {
    name: "Personalized Guidance",
    description: "Readings tailored to your unique soul blueprint.",
    icon: UserCircleIcon,
  },
  {
    name: "Holistic Empowerment",
    description: "Ancient wisdom for modern challenges.",
    icon: SparklesIcon,
  },
];

// Main Redesigned Component
const AboutSnippet = () => {
  const ref = useRef(null);
  // The 'amount: 0.3' means the animation will trigger when 30% of the component is visible
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // Animation variants for staggering the children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  // Animation for individual items sliding up and fading in
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div
      ref={ref}
      className="relative bg-white dark:bg-deep-space py-24 sm:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Decorative background gradient */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[120%] h-[80%] bg-gradient-to-t from-deep-space via-deep-space/80 to-transparent dark:bg-gradient-to-t dark:from-black/50 dark:via-deep-space/50 dark:to-transparent rounded-full blur-[80px] opacity-40"></div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12 lg:items-center"
        >
          {/* LEFT COLUMN: Content */}
          <div className="relative z-10">
            <motion.h2
              variants={itemVariants}
              className="font-serif text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl"
            >
              Guiding You With <br />
              <span className="text-nebula-purple">Cosmic Clarity</span>
            </motion.h2>

            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300"
            >
              I am Acharya Beena, a certified astrologer dedicated to
              translating the profound wisdom of the stars into practical,
              empowering guidance. My mission is to help you uncover your innate
              strengths and navigate your life's path with confidence and
              purpose.
            </motion.p>

            {/* Highlights Section */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex gap-x-8 gap-y-6 flex-wrap"
            >
              {highlights.map((highlight) => (
                <motion.div
                  key={highlight.name}
                  whileHover={{ scale: 1.1, rotate: 3 }}
                  className="flex items-center gap-3"
                >
                  <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-nebula-purple/10 text-nebula-purple">
                    <highlight.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <span className="font-semibold text-gray-800 dark:text-starlight">
                    {highlight.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

            {/* Call-to-Action Button */}
            <motion.div variants={itemVariants} className="mt-12">
              <Link to="/about">
                <motion.button
                  className="relative inline-flex items-center gap-x-3 rounded-full bg-nebula-purple px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-nebula-purple/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-nebula-purple focus:ring-offset-deep-space"
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0px 10px 30px rgba(168, 85, 247, 0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                >
                  Discover My Journey
                  <ArrowRightIcon className="h-5 w-5" />
                </motion.button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT COLUMN: Image */}
          <motion.div
            variants={{
              hidden: { opacity: 0, scale: 0.8, x: 50 },
              visible: {
                opacity: 1,
                scale: 1,
                x: 0,
                transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
              },
            }}
            className="w-full max-w-md mx-auto lg:max-w-none"
          >
            <div className="relative rounded-3xl p-2 bg-gradient-to-br from-nebula-purple/50 to-deep-space/30 shadow-2xl shadow-deep-space/50">
              <div className="rounded-[18px] overflow-hidden">
                <img
                  className="w-full h-full object-cover aspect-[4/5]"
                  src="//images.unsplash.com/photo-1678082309527-7c47ac57d738?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="A representation of astrology and wisdom with constellations"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSnippet;
