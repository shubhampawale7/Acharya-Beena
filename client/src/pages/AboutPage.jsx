import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  XMarkIcon,
  StarIcon,
  BookOpenIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import Meta from "../components/common/Meta";

// --- Import your certificate images ---
import certNakshatra from "../assets/images/certificates/nakshatra-mastery.png";
import certMysticalTriangle from "../assets/images/certificates/mystical-triangle.png";
import certLalKitab from "../assets/images/certificates/lal-kitab.png";
import certAnkJyotish from "../assets/images/certificates/ank-jyotish.png";
import certRudraksha from "../assets/images/certificates/rudraksha.png";
import certPanchPakshi from "../assets/images/certificates/panch-pakshi.png";

const certificates = [
  { img: certNakshatra, title: "Nakshatra Mastery Program" },
  { img: certMysticalTriangle, title: "Certified Mystical Triangle Expert" },
  { img: certLalKitab, title: "Certified Lal Kitab Expert" },
  { img: certAnkJyotish, title: "Certified Ank Jyotish" },
  { img: certRudraksha, title: "Rudraksha Foundations" },
  { img: certPanchPakshi, title: "Certified Panch Pakshi Shastra Expert" },
];

const AboutPage = () => {
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <Meta
        title="About Acharya Beena | My Astrological Journey & Credentials"
        description="Discover the story, philosophy, and credentials of Acharya Beena. Learn about her commitment to guiding clients with cosmic wisdom and compassion."
      />
      <div className="bg-white dark:bg-transparent overflow-x-hidden">
        <main>
          {/* Section 1: Hero */}
          <section className="relative h-[60vh] flex items-center justify-center text-center px-6">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1600686067402-995d22a7aabc?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Serene cosmic background"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent dark:from-deep-space dark:via-deep-space/80 to-transparent"></div>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative z-10"
            >
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-7xl font-serif">
                My Sacred Journey
              </h1>
              <p className="mt-6 mx-auto max-w-3xl text-xl leading-8 text-gray-200">
                Unraveling the language of the stars to illuminate the path for
                others.
              </p>
            </motion.div>
          </section>

          {/* Section 2: Introduction */}
          <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
                  A Calling to Guide
                </h2>
                <div className="mt-6 prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none">
                  <p>
                    My path into the profound world of Vedic astrology was not a
                    choice, but a calling. It began as a personal quest to
                    understand the deeper currents that shape our lives. This
                    journey transformed into a sacred mission: to use this
                    timeless wisdom to empower you.
                  </p>
                  <p>
                    I believe astrology is a tool for self-awareness and
                    conscious creation. My practice is a confidential,
                    compassionate space where we work together to translate
                    cosmic whispers into practical, actionable guidance for your
                    modern life.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="rounded-3xl overflow-hidden aspect-[4/5] shadow-2xl dark:shadow-nebula-purple/20 ring-1 ring-black/5 dark:ring-white/10"
              >
                <img
                  src="https://images.unsplash.com/photo-1543900399-7dfc31ca0dd2?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Portrait of Acharya Beena"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </section>

          {/* Section 3: Core Values */}
          <section className="py-24 sm:py-32 bg-gray-50 dark:bg-deep-space/80">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
                  My Guiding Principles
                </h2>
              </div>
              <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-nebula-purple/10 text-indigo-600 dark:text-nebula-purple">
                    <StarIcon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-gray-900 dark:text-starlight font-serif">
                    Authenticity
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    Guidance rooted in certified knowledge and the sacred
                    traditions of Vedic wisdom.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-nebula-purple/10 text-indigo-600 dark:text-nebula-purple">
                    <HeartIcon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-gray-900 dark:text-starlight font-serif">
                    Compassion
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    A supportive and non-judgmental space where your story is
                    heard, respected, and honored.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-100 dark:bg-nebula-purple/10 text-indigo-600 dark:text-nebula-purple">
                    <BookOpenIcon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-gray-900 dark:text-starlight font-serif">
                    Empowerment
                  </h3>
                  <p className="mt-2 text-base leading-7 text-gray-600 dark:text-gray-300">
                    My goal is to provide you with the self-awareness to master
                    your present and consciously create your future.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Credentials */}
          <section className="py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
                  A Commitment to Mastery
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Continuous learning is the cornerstone of my practice. These
                  credentials represent a dedication to professional standards
                  and a mastery of the sacred cosmic sciences.
                </p>
              </div>
              <div className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                {certificates.map((cert, index) => (
                  <motion.div
                    key={index}
                    onClick={() => setSelectedCert(cert.img)}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="cursor-pointer group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl dark:hover:shadow-nebula-purple/20 transition-all duration-300"
                  >
                    <img
                      src={cert.img}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>

      {/* Lightbox/Modal for Viewing a Certificate */}
      <AnimatePresence>
        {selectedCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-[100] p-4"
            onClick={() => setSelectedCert(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 25 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCert(null)}
                className="absolute -top-3 -right-3 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 z-10 transition-colors"
                aria-label="Close certificate view"
              >
                <XMarkIcon className="h-6 w-6" />
              </button>
              <img
                src={selectedCert}
                alt="Selected certificate"
                className="w-auto h-auto max-h-[90vh] rounded-lg shadow-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AboutPage;
