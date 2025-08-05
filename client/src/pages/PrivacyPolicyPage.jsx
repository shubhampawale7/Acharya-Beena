import React from "react";
import { motion } from "framer-motion";
import Meta from "../components/common/Meta";
import {
  ShieldCheckIcon,
  UserGroupIcon,
  ServerIcon,
  KeyIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/solid";

const PrivacyPolicyPage = () => {
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  const contentSectionVariants = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    viewport: { once: true, amount: 0.3 },
  };

  return (
    <>
      <Meta
        title="Privacy Policy | Acharya Beena"
        description="Read the Privacy Policy for Acharya Beena's website to understand how we collect, use, and protect your personal information."
      />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="bg-transparent py-24 sm:py-32"
      >
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          {/* Page Header */}
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-nebula-purple/70" />
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
              Privacy Policy
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Your trust and privacy are of the utmost importance to us. This
              policy outlines how we handle and protect your data.
            </p>
          </motion.div>

          {/* Floating Content Panel */}
          <motion.div
            variants={itemVariants}
            className="mt-16 p-8 sm:p-12 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl"
          >
            <div className="prose prose-lg prose-indigo dark:prose-invert max-w-none">
              <p className="lead text-gray-600 dark:text-gray-300 !mt-0">
                Last updated: August 5, 2025
              </p>
              <p>
                Welcome to Acharya Beena's website. We respect your privacy and
                are committed to protecting your personal data. This privacy
                policy will inform you as to how we look after your personal
                data when you visit our website and tell you about your privacy
                rights.
              </p>

              <motion.div {...contentSectionVariants}>
                <h2 className="flex items-center gap-x-3">
                  <UserGroupIcon className="h-6 w-6 flex-shrink-0" />
                  1. Information We Collect
                </h2>
                <p>
                  We may collect, use, store, and transfer different kinds of
                  personal data about you which we have grouped together as
                  follows:
                </p>
                <ul>
                  <li>
                    <strong>Identity Data:</strong> includes first name, last
                    name, and date of birth.
                  </li>
                  <li>
                    <strong>Contact Data:</strong> includes billing address,
                    email address, and telephone numbers.
                  </li>
                  <li>
                    <strong>Financial Data:</strong> includes payment card
                    details (processed securely by our payment provider).
                  </li>
                  <li>
                    <strong>Transaction Data:</strong> includes details about
                    payments to and from you and other details of services you
                    have purchased from us.
                  </li>
                  <li>
                    <strong>Technical Data:</strong> includes internet protocol
                    (IP) address, your login data, browser type and version.
                  </li>
                </ul>
              </motion.div>

              <motion.div {...contentSectionVariants}>
                <h2 className="flex items-center gap-x-3">
                  <ServerIcon className="h-6 w-6 flex-shrink-0" />
                  2. How We Use Your Information
                </h2>
                <p>
                  We will only use your personal data when the law allows us to.
                  Most commonly, we will use your personal data to process and
                  deliver your requested services, including managing payments,
                  fees, and charges, and to manage our relationship with you.
                </p>
              </motion.div>

              <motion.div {...contentSectionVariants}>
                <h2 className="flex items-center gap-x-3">
                  <ShieldCheckIcon className="h-6 w-6 flex-shrink-0" />
                  3. Data Security
                </h2>
                <p>
                  We have put in place appropriate security measures to prevent
                  your personal data from being accidentally lost, used, or
                  accessed in an unauthorized way. We limit access to your
                  personal data to those employees and other third parties who
                  have a business need to know.
                </p>
              </motion.div>

              <motion.div {...contentSectionVariants}>
                <h2 className="flex items-center gap-x-3">
                  <KeyIcon className="h-6 w-6 flex-shrink-0" />
                  4. Your Legal Rights
                </h2>
                <p>
                  Under certain circumstances, you have rights under data
                  protection laws in relation to your personal data, including
                  the right to request access, correction, or erasure of your
                  personal data.
                </p>
              </motion.div>

              <motion.div {...contentSectionVariants}>
                <h2 className="flex items-center gap-x-3">
                  <EnvelopeIcon className="h-6 w-6 flex-shrink-0" />
                  5. Contact Us
                </h2>
                <p>
                  If you have any questions about this privacy policy, please
                  contact us using the details on our Contact page.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicyPage;
