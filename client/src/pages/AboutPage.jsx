import React, { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { XMarkIcon, StarIcon } from "@heroicons/react/24/solid";
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

const ValuePillar = ({ icon, title, children }) => {
  return (
    <motion.div
      whileHover={{ y: -8, transition: { duration: 0.2 } }}
      className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white/60 dark:bg-deep-space/40 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 transition-shadow duration-300 shadow-md hover:shadow-xl dark:hover:shadow-2xl dark:hover:shadow-nebula-purple/30"
    >
      <div className="flex-shrink-0 mb-4">
        <div className="flex items-center justify-center h-14 w-14 rounded-full bg-nebula-purple/10 text-nebula-purple group-hover:bg-nebula-purple/20 transition-colors duration-300">
          {icon}
        </div>
      </div>
      <h3 className="text-2xl font-serif text-gray-900 dark:text-starlight mb-3">
        {title}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-sm">
        {children}
      </p>
    </motion.div>
  );
};

const CertificateCard3D = ({ cert, onClick }) => {
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);

  const handleMouseMove = (event) => {
    const rect = cardRef.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  };
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      className="cursor-pointer rounded-xl group relative shadow-lg bg-gray-100/80 dark:bg-slate-900/50 backdrop-blur-sm"
    >
      <div style={{ transform: "translateZ(20px)" }}>
        <img
          src={cert.img}
          alt={`${cert.title} Certificate`}
          className="w-full h-auto object-contain rounded-xl"
        />
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
          <p className="text-starlight text-center font-serif text-lg p-4">
            {cert.title}
          </p>
        </div>
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{
            background: useTransform(
              [rotateX, rotateY],
              ([latestX, latestY]) =>
                `radial-gradient(circle at ${50 - latestY * 2}% ${
                  50 + latestX * 2
                }%, rgba(255, 255, 255, 0.4), transparent 40%)`
            ),
            opacity: useTransform([x, y], ([latestX, latestY]) =>
              Math.max(Math.abs(latestX), Math.abs(latestY)) > 0 ? 1 : 0
            ),
            mixBlendMode: "soft-light",
          }}
        />
      </div>
    </motion.div>
  );
};

const AboutPage = () => {
  const [selectedCert, setSelectedCert] = useState(null);
  const journeyRef = useRef(null);
  const journeyInView = useInView(journeyRef, { once: true, amount: 0.2 });
  const certsRef = useRef(null);
  const certsInView = useInView(certsRef, { once: true, amount: 0.1 });
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <Meta
        title="About Acharya Beena | My Astrological Journey & Credentials"
        description="Discover the story, philosophy, and credentials of Acharya Beena. Learn about her commitment to guiding clients with cosmic wisdom and compassion."
      />
      {/* The main container is now transparent to let the background show through */}
      <div className="bg-transparent overflow-x-hidden">
        <main className="isolate">
          <section className="relative min-h-screen flex items-center justify-center px-6 lg:px-8 py-24">
            {/* Background elements are now part of the global CelestialBackground */}

            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto z-10"
            >
              <motion.div
                variants={itemVariants}
                className="text-center lg:text-left"
              >
                <h1 className="text-5xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-7xl font-serif">
                  A Cosmic Calling
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Welcome. I am Acharya Beena. My life's work is to act as a
                  bridge between the ancient wisdom of the cosmos and your
                  modern-day journey. Here, you will not find rigid predictions,
                  but a guiding light to help you understand your unique
                  energetic blueprint, navigate challenges, and consciously
                  create a life aligned with your soul's true purpose.
                </p>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex justify-center"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 1,
                    delay: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="w-[300px] h-[400px] lg:w-[380px] lg:h-[500px] rounded-3xl overflow-hidden shadow-xl dark:shadow-2xl dark:shadow-nebula-purple/20 ring-1 ring-black/5 dark:ring-white/10"
                >
                  <img
                    src="https://images.unsplash.com/photo-1544717297-fa95b9ee9643?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Acharya Beena"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </section>

          <section ref={journeyRef} className="py-24 sm:py-32 px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={journeyInView ? { opacity: 1 } : {}}
              transition={{ duration: 1 }}
              className="mx-auto max-w-7xl grid lg:grid-cols-3 gap-16 items-start"
            >
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif mb-8">
                  My Story and Philosophy
                </h2>
                <div className="prose prose-lg dark:prose-invert text-gray-600 dark:text-gray-300 max-w-none space-y-6">
                  <p>
                    My journey into the profound world of Vedic astrology was
                    not a choice, but a calling—a deep-seated pull towards the
                    language of the stars. It began as a personal quest for
                    answers, a way to understand the deeper currents that shape
                    our lives. The more I learned, the more I realized that the
                    celestial map we are born with is not a pre-written destiny,
                    but a guide to our highest potential.
                  </p>
                  <p>
                    This realization transformed my practice from a simple study
                    into a sacred mission: to empower others. I believe
                    astrology is a dynamic, collaborative process. In our
                    sessions, we work together in a confidential, compassionate
                    space to translate the whispers of the cosmos into
                    practical, actionable wisdom. We uncover your innate
                    strengths, illuminate patterns, and develop strategies to
                    help you move forward with clarity and confidence.
                  </p>
                </div>
              </div>

              <div className="space-y-8 lg:pt-16">
                <ValuePillar
                  title="Certified Expertise"
                  icon={<StarIcon className="w-7 h-7" />}
                >
                  My practice is built upon a foundation of rigorous study and
                  certified mastery in multiple astrological disciplines,
                  ensuring guidance that is both authentic and profound.
                </ValuePillar>
                <ValuePillar
                  title="Compassionate Dedication"
                  icon={<StarIcon className="w-7 h-7" />}
                >
                  I am deeply committed to creating a supportive, non-judgmental
                  space where your story is heard, respected, and honored,
                  fostering trust and genuine connection.
                </ValuePillar>
                <ValuePillar
                  title="Personal Empowerment"
                  icon={<StarIcon className="w-7 h-7" />}
                >
                  My ultimate goal is not to predict the future, but to empower
                  you with the self-awareness to master your present and
                  consciously create a life of purpose and joy.
                </ValuePillar>
              </div>
            </motion.div>
          </section>

          {/* This section now uses a semi-transparent overlay to ensure readability */}
          <section
            ref={certsRef}
            className="py-24 sm:py-32 px-6 lg:px-8 bg-gray-500/5 dark:bg-black/20 backdrop-blur-sm"
          >
            <div className="mx-auto max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={certsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="mx-auto max-w-2xl lg:text-center"
              >
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
                  A Commitment to Mastery
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Continuous learning is the cornerstone of my practice. These
                  credentials represent a dedication to professional standards
                  and a mastery of the sacred cosmic sciences.
                </p>
              </motion.div>

              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={certsInView ? "visible" : "hidden"}
                className="mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3"
              >
                {certificates.map((cert) => (
                  <motion.div key={cert.title} variants={itemVariants}>
                    <CertificateCard3D
                      cert={cert}
                      onClick={() => setSelectedCert(cert.img)}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </section>
        </main>
      </div>

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
                {" "}
                <XMarkIcon className="h-6 w-6" />{" "}
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
