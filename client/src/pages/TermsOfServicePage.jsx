import React from "react";
import Meta from "../components/common/Meta";
import { motion } from "framer-motion";
import { ScaleIcon } from "@heroicons/react/24/outline";

const TermsOfServicePage = () => {
  // Animation variants for a consistent feel with other pages
  const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <>
      <Meta
        title="Terms of Service | Acharya Beena"
        description="Please read our Terms of Service carefully before using the services offered by Acharya Beena."
      />
      {/* Added a subtle gradient background for aesthetic appeal */}
      <div className="min-h-screen bg-transparent py-20 sm:py-28 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-100/30 via-transparent to-transparent dark:from-purple-900/20">
        <motion.div
          variants={pageVariants}
          initial="hidden"
          animate="visible"
          className="mx-auto max-w-4xl px-6 lg:px-8"
        >
          {/* Main content container with glassmorphism effect */}
          <div className="bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl shadow-2xl rounded-3xl ring-1 ring-black/5 dark:ring-white/10 p-8 sm:p-12">
            <motion.div variants={itemVariants} className="text-center mb-10">
              <div className="flex justify-center">
                <div className="p-4 bg-nebula-purple/10 rounded-full inline-block">
                  <ScaleIcon className="h-10 w-10 text-nebula-purple" />
                </div>
              </div>
              <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900 dark:text-starlight font-serif">
                Terms of Service
              </h1>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Last updated: August 5, 2025
              </p>
            </motion.div>

            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none space-y-8">
              <motion.section variants={itemVariants}>
                <h2>1. Agreement to Terms</h2>
                <p>
                  By accessing our site and using our services, you agree to be
                  bound by these Terms of Service. If you disagree with any part
                  of the terms, then you may not access the service.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2>2. Services Disclaimer</h2>
                <p>
                  The astrological consultations and content provided on this
                  website are for guidance and entertainment purposes only.
                  Information provided should not be used as a substitute for
                  professional, legal, financial, or medical advice. Acharya
                  Beena is not responsible for any decisions made by clients
                  based on the consultations.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2>3. User Accounts</h2>
                <p>
                  When you create an account with us, you must provide us with
                  information that is accurate, complete, and current at all
                  times. You are responsible for safeguarding the password that
                  you use to access the service.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2>4. Bookings and Payments</h2>
                <p>
                  All bookings are subject to confirmation. Payment must be made
                  in full prior to the consultation. We reserve the right to
                  refuse or cancel your booking at any time for certain reasons
                  including but not limited to service availability or errors in
                  the description or price of the service.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2>5. Limitation of Liability</h2>
                <p>
                  In no event shall Acharya Beena, nor her partners, agents, or
                  affiliates, be liable for any indirect, incidental, special,
                  consequential or punitive damages resulting from your access
                  to or use of, or inability to access or use, the service.
                </p>
              </motion.section>

              <motion.section variants={itemVariants}>
                <h2>6. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with
                  the laws of India, without regard to its conflict of law
                  provisions.
                </p>
              </motion.section>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default TermsOfServicePage;
