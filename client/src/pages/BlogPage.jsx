import React from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";
import { posts } from "../data/blogPosts"; // Assuming you have this data file
import Meta from "../components/common/Meta";

const BlogPage = () => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <>
      <Meta
        title="Astrology Blog | Acharya Beena"
        description="Read insightful articles on Vedic astrology, Vastu, numerology, and cosmic wisdom from Acharya Beena's blog."
      />
      <div className="bg-transparent py-24 sm:py-32">
        <div ref={ref} className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
              From the Cosmos
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Insights and wisdom to help you navigate your life's journey.
              Explore articles on Vedic astrology, Vastu, numerology, and more.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3"
          >
            {posts.map((post, index) => (
              <motion.article
                key={post.id}
                variants={itemVariants}
                className={`group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 shadow-xl
                  ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2 h-auto" : "h-96"
                  }`}
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 -z-10 h-full w-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/40" />

                <div className="p-6 md:p-8 flex flex-col justify-end h-full">
                  <div className="z-10 text-white">
                    <div className="flex items-center gap-x-4 text-xs">
                      <time dateTime={post.datetime} className="text-gray-300">
                        {post.date}
                      </time>

                      {/* --- FIXED: Added a check to ensure post.category exists before trying to render it --- */}
                      {post.category && (
                        <div
                          className={`relative z-10 rounded-full px-3 py-1.5 font-medium text-xs ring-1 ring-inset ${post.category.color}`}
                        >
                          {post.category.title}
                        </div>
                      )}
                    </div>
                    <h3
                      className={`mt-3 font-semibold leading-6 text-white font-serif ${
                        index === 0 ? "text-2xl md:text-3xl" : "text-lg"
                      }`}
                    >
                      <Link to={post.href}>
                        <span className="absolute inset-0" />
                        {post.title}
                      </Link>
                    </h3>
                    <p
                      className={`mt-2 leading-6 text-gray-300/80 ${
                        index === 0 ? "text-base" : "text-sm"
                      }`}
                    >
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
