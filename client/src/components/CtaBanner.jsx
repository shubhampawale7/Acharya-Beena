// src/components/CtaBanner.jsx

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const CtaBanner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.3, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <div ref={ref} className="bg-deep-space">
      <div className="relative isolate overflow-hidden px-6 py-24 text-center shadow-2xl sm:px-16 sm:py-32">
        {/* Animated Background Orbs */}
        <motion.div
          initial={{ scale: 1.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute -top-24 left-1/2 -z-10 h-[40rem] w-[40rem] -translate-x-1/2"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-nebula-purple/40 to-starlight/20 opacity-60 blur-3xl" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto max-w-2xl"
        >
          <motion.h2
            variants={itemVariants}
            className="font-serif text-3xl font-bold tracking-tight text-white sm:text-5xl"
          >
            Unlock Your Cosmic Blueprint
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-200"
          >
            A personalized reading can provide the clarity and confidence you're
            searching for. Let's illuminate your path and begin your journey of
            self-discovery together.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="mt-10 flex items-center justify-center gap-x-6"
          >
            {/* Primary CTA Button with Shimmer Effect */}
            <Link to="/book-consultation">
              <motion.button
                className="relative inline-block overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#A855F7_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-900/95 px-6 py-3 text-base font-semibold text-white backdrop-blur-sm">
                  Book a Consultation
                </span>
              </motion.button>
            </Link>

            {/* Secondary CTA Button */}
            <Link to="/contact">
              <motion.button
                className="group inline-flex items-center justify-center gap-x-2 rounded-full px-5 py-3 text-base font-semibold leading-6 text-white transition"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="group-hover:text-nebula-purple transition-colors">
                  Ask a Question
                </span>
                <span className="transition-transform group-hover:translate-x-1 group-hover:text-nebula-purple motion-reduce:transform-none">
                  &rarr;
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CtaBanner;
