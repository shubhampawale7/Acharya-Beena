import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  BuildingOffice2Icon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ChatBubbleBottomCenterTextIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import Meta from "../components/common/Meta";
import toast from "react-hot-toast";
import Spinner from "../components/common/Spinner"; // Import the custom spinner

// A reusable component for the floating contact info cards
const ContactInfoCard = ({ icon: Icon, title, lines, href, delay }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, scale: 0.8, y: 50 },
      visible: { opacity: 1, scale: 1, y: 0 },
    }}
    transition={{ duration: 0.6, ease: "easeOut", delay }}
    className="p-6 rounded-2xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-lg ring-1 ring-black/5 dark:ring-white/10 shadow-xl"
  >
    <div className="flex items-center gap-x-4">
      <div className="flex-shrink-0 p-3 rounded-full bg-nebula-purple/10">
        <Icon className="h-6 w-6 text-nebula-purple" aria-hidden="true" />
      </div>
      <div>
        <h3 className="text-base font-semibold text-gray-900 dark:text-starlight">
          {title}
        </h3>
        <a
          href={href}
          className="text-sm text-gray-600 dark:text-gray-300 hover:text-nebula-purple dark:hover:text-nebula-purple transition-colors"
        >
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </a>
      </div>
    </div>
  </motion.div>
);

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // This is a mock API call for demonstration.
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      // Replace with your actual API endpoint logic
      // const res = await fetch("/api/contact", { ... });
      console.log("Form Data Submitted:", formData);
      toast.success("Your message has been sent successfully!");
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  return (
    <>
      <Meta
        title="Contact Us | Acharya Beena"
        description="Get in touch with Acharya Beena for questions, inquiries, or to schedule a consultation."
      />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="bg-transparent py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={{
              hidden: { opacity: 0, y: -30 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
              Connect with the Cosmos
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Have a question or need to discuss something specific? Fill out
              the form below. I look forward to connecting with you.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Cards */}
            <div className="relative lg:col-span-1 space-y-8">
              <ContactInfoCard
                icon={BuildingOffice2Icon}
                title="Location"
                lines={["Pune, Maharashtra", "India"]}
                delay={0.3}
              />
              <ContactInfoCard
                icon={PhoneIcon}
                title="Telephone"
                lines={["+91 12345 67890"]}
                href="tel:+911234567890"
                delay={0.4}
              />
              <ContactInfoCard
                icon={EnvelopeIcon}
                title="Email"
                lines={["hello@acharyabeena.com"]}
                href="mailto:hello@acharyabeena.com"
                delay={0.5}
              />
            </div>

            {/* Contact Form */}
            <motion.form
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              onSubmit={handleSubmit}
              className="lg:col-span-2 p-8 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-2xl"
            >
              <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                {/* Reusable input fields can be made into a component for larger forms */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-starlight"
                  >
                    Full Name
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-starlight"
                  >
                    Email
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-starlight"
                  >
                    Subject
                  </label>
                  <div className="mt-2.5">
                    <input
                      type="text"
                      name="subject"
                      id="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="message"
                    className="block text-sm font-semibold leading-6 text-gray-900 dark:text-starlight"
                  >
                    Message
                  </label>
                  <div className="mt-2.5">
                    <textarea
                      name="message"
                      id="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      className="block w-full rounded-md border-0 px-3.5 py-2 bg-white/50 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple sm:text-sm sm:leading-6 transition"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: !isLoading ? 1.05 : 1 }}
                  whileTap={{ scale: !isLoading ? 0.95 : 1 }}
                  className="inline-flex items-center gap-x-2 rounded-full bg-nebula-purple px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nebula-purple disabled:opacity-60"
                >
                  {isLoading ? (
                    <Spinner size="sm" />
                  ) : (
                    <PaperAirplaneIcon className="h-5 w-5" />
                  )}
                  {isLoading ? "Sending..." : "Send Message"}
                </motion.button>
              </div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ContactPage;
