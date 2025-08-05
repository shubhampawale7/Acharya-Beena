import React, { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  StarIcon,
  ChatBubbleLeftRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from "@heroicons/react/24/solid";

// Assuming you have a testimonials data file, e.g., src/data/testimonials.js
// Make sure the avatar URLs are correct. I'm using placeholders.
const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai, India",
    rating: 5,
    comment:
      "The clarity I received from my birth chart reading was life-changing. I finally understand my strengths and feel empowered to move forward with confidence. Truly a guiding light!",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    name: "Rajesh Kumar",
    location: "Delhi, India",
    rating: 5,
    comment:
      "I was skeptical about Vastu, but the changes suggested have brought an incredible sense of peace and positivity to my home. The energy is completely different. Highly recommended!",
    avatar: "https://randomuser.me/api/portraits/men/46.jpg",
  },
  {
    name: "Ananya Reddy",
    location: "Bangalore, India",
    rating: 5,
    comment:
      "The numerology consultation was fascinating and so accurate. It gave me a new perspective on my life's challenges and opportunities. I feel more aligned with my purpose now.",
    avatar: "https://randomuser.me/api/portraits/women/47.jpg",
  },
  {
    name: "Vikram Singh",
    location: "Pune, India",
    rating: 5,
    comment:
      "An incredibly insightful and compassionate reading. Acharya Beena doesn't just predict; she empowers you with wisdom. I have actionable steps and a much clearer mind.",
    avatar: "https://randomuser.me/api/portraits/men/48.jpg",
  },
];

const TestimonialsSnippet = () => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cycleTestimonial = (direction) => {
    if (direction === "next") {
      setIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    } else {
      setIndex(
        (prevIndex) =>
          (prevIndex - 1 + testimonials.length) % testimonials.length
      );
    }
  };

  const cardVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      zIndex: 0,
      x: -300,
      opacity: 0,
      scale: 0.8,
    },
  };

  return (
    <div ref={ref} className="relative bg-transparent py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Header */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
              Words of Trust From My Clients
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Discover how cosmic guidance has illuminated the paths of others
              on their journey. These are the stories of transformation and
              clarity from those I've had the privilege to guide.
            </p>
            <div className="mt-8 flex items-center gap-x-4">
              <button
                onClick={() => cycleTestimonial("prev")}
                className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10 hover:bg-white dark:hover:bg-white/20 transition"
              >
                <ArrowLeftIcon className="h-6 w-6 text-gray-800 dark:text-starlight" />
              </button>
              <button
                onClick={() => cycleTestimonial("next")}
                className="p-3 rounded-full bg-white/60 dark:bg-white/10 backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10 hover:bg-white dark:hover:bg-white/20 transition"
              >
                <ArrowRightIcon className="h-6 w-6 text-gray-800 dark:text-starlight" />
              </button>
            </div>
          </motion.div>

          {/* Right Column: Interactive Card Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative h-96 w-full"
          >
            <AnimatePresence initial={false}>
              <motion.div
                key={index}
                variants={cardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute flex flex-col h-full w-full p-8 rounded-3xl bg-white/60 dark:bg-gray-500/10 backdrop-blur-2xl ring-1 ring-black/5 dark:ring-white/10 shadow-xl dark:shadow-2xl"
              >
                <div className="flex items-center gap-x-1">
                  {[...Array(testimonials[index].rating)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                  ))}
                </div>
                <blockquote className="mt-6 flex-grow text-gray-800 dark:text-starlight text-lg font-serif italic">
                  "{testimonials[index].comment}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-x-4">
                  <img
                    className="h-12 w-12 rounded-full bg-gray-50 object-cover"
                    src={testimonials[index].avatar}
                    alt={testimonials[index].name}
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-starlight">
                      {testimonials[index].name}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {testimonials[index].location}
                    </div>
                  </div>
                </figcaption>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSnippet;
