import React from "react";
import { Link } from "react-router-dom";
import {
  LazyMotion,
  domAnimation,
  m as motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Meta from "../components/common/Meta";
import {
  BookOpenIcon,
  HomeModernIcon,
  SparklesIcon,
  CalendarDaysIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const servicesList = [
  {
    name: "Vedic Horoscope Reading",
    description:
      "A comprehensive analysis of your birth chart (Kundli) to reveal life patterns, strengths, and challenges.",
    price: "₹2500",
    duration: "60-minute session",
    icon: BookOpenIcon,
    href: "/book-consultation",
  },
  {
    name: "Vastu Shastra Consultation",
    description:
      "Harmonize the energy of your home or office to promote prosperity, health, and happiness.",
    price: "Starting at ₹5100",
    duration: "Per property",
    icon: HomeModernIcon,
    href: "/book-consultation",
  },
  {
    name: "Numerology Report",
    description:
      "Discover the vibrational meaning of your name and birth date to understand your life path and destiny numbers.",
    price: "₹1500",
    duration: "Detailed PDF Report",
    icon: SparklesIcon,
    href: "/book-consultation",
  },
  {
    name: "Yearly Forecast (Varshaphala)",
    description:
      "Understand the key themes, opportunities, and challenges for the next 12 months.",
    price: "₹2100",
    duration: "45-minute session + Report",
    icon: CalendarDaysIcon,
    href: "/book-consultation",
  },
  {
    name: "Relationship Compatibility",
    description:
      "Synastry analysis to understand the dynamics, strengths, and potential challenges between two individuals.",
    price: "₹3100",
    duration: "75-minute session",
    icon: HeartIcon,
    href: "/book-consultation",
  },
  {
    name: "Career & Business Astrology",
    description:
      "Gain insights into your ideal career path, business timing, and strategies for professional growth.",
    price: "₹2500",
    duration: "60-minute session",
    icon: ChartBarIcon,
    href: "/book-consultation",
  },
];

const ServiceCard = ({ service }) => {
  const cardRef = React.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-200, 200], [10, -10]);
  const rotateY = useTransform(x, [-200, 200], [-10, 10]);

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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
        willChange: "transform",
      }}
      className="relative flex flex-col h-full p-8 rounded-3xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-md ring-1 ring-black/5 dark:ring-white/10 shadow-lg dark:shadow-xl"
    >
      <div
        style={{ transform: "translateZ(40px)", transformStyle: "preserve-3d" }}
        className="flex flex-col flex-auto"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-nebula-purple/10 ring-1 ring-nebula-purple/30">
          <service.icon
            className="h-8 w-8 text-nebula-purple z-10"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-6 font-serif text-2xl font-semibold leading-8 text-gray-900 dark:text-starlight">
          {service.name}
        </h3>
        <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-gray-300">
          {service.description}
        </p>
        <div className="mt-6 pt-6 border-t border-black/10 dark:border-white/10 flex items-baseline justify-between">
          <div>
            <p className="text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight">
              {service.price}
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {service.duration}
            </p>
          </div>
        </div>
        <div className="mt-8">
          <Link to={service.href}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full rounded-full bg-nebula-purple px-4 py-3 text-sm font-semibold text-white shadow-md hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-nebula-purple"
            >
              Book Now
            </motion.button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesPage = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, {
    once: true,
    amount: 0.2,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut" },
    },
  };

  return (
    <>
      <Meta
        title="Our Services | Acharya Beena"
        description="Explore a range of astrological services including Vedic Horoscope readings, Vastu Shastra consultations, Numerology reports, and more."
      />
      <div className="bg-transparent py-24 sm:py-32">
        <div ref={ref} className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <LazyMotion features={domAnimation}>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center"
            >
              <h2 className="text-base font-semibold leading-7 text-nebula-purple">
                Our Offerings
              </h2>
              <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
                Services to Guide Your Way
              </p>
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-300">
                Choose from a range of authentic astrological services designed
                to bring you clarity, purpose, and cosmic insight.
              </p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
            >
              {servicesList.map((service) => (
                <motion.div key={service.name} variants={itemVariants}>
                  <ServiceCard service={service} />
                </motion.div>
              ))}
            </motion.div>
          </LazyMotion>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
