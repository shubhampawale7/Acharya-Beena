import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform, useInView } from "framer-motion";
import {
  BookOpenIcon,
  HomeModernIcon,
  SparklesIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/outline";

const services = [
  {
    name: "Vedic Horoscope",
    description:
      "In-depth analysis of your birth chart for insights into your life path, career, and relationships.",
    icon: BookOpenIcon,
    href: "/services/vedic-horoscope",
  },
  {
    name: "Vastu Shastra",
    description:
      "Harmonize your living or workspace for better energy flow, prosperity, and well-being.",
    icon: HomeModernIcon,
    href: "/services/vastu-shastra",
  },
  {
    name: "Numerology",
    description:
      "Discover the hidden meaning of numbers in your life to understand your strengths and destiny.",
    icon: SparklesIcon,
    href: "/services/numerology",
  },
];

const ServiceCard = ({ service }) => {
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
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      className="relative flex flex-col p-8 rounded-3xl bg-white/50 dark:bg-gray-500/10 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-lg dark:shadow-2xl"
    >
      <div
        style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}
        className="flex flex-auto flex-col"
      >
        <div className="relative flex h-16 w-16 items-center justify-center rounded-2xl bg-nebula-purple/10 ring-1 ring-nebula-purple/30">
          <div className="absolute inset-0 rounded-2xl bg-nebula-purple/20 blur-xl animate-pulse"></div>
          <service.icon
            className="h-8 w-8 text-nebula-purple"
            aria-hidden="true"
          />
        </div>

        <h3 className="mt-6 font-serif text-2xl font-semibold leading-7 text-gray-900 dark:text-starlight">
          {service.name}
        </h3>
        <p className="mt-4 flex-auto text-base leading-7 text-gray-600 dark:text-gray-300">
          {service.description}
        </p>
        <div className="mt-6">
          <Link to={service.href}>
            <motion.div
              className="group inline-flex items-center gap-x-2 text-base font-semibold text-nebula-purple"
              whileHover="hover"
            >
              Learn more
              <motion.span
                variants={{ hover: { x: 4 } }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <ArrowRightIcon className="h-4 w-4" />
              </motion.span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ServicesOverview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
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
    // The main container is now transparent
    <div className="relative bg-transparent py-24 sm:py-32">
      <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-2xl lg:text-center"
        >
          <h2 className="text-base font-semibold leading-7 text-nebula-purple">
            Our Cosmic Services
          </h2>
          <p className="mt-2 font-serif text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl">
            Guidance for Every Aspect of Life
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From detailed birth chart readings to harmonizing your home, we
            offer a range of sacred services designed to bring clarity, balance,
            and empowerment to your journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none"
        >
          <div className="grid max-w-xl grid-cols-1 gap-12 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <motion.div key={service.name} variants={itemVariants}>
                <ServiceCard service={service} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesOverview;
