import React, { useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { posts } from "../data/blogPosts"; // Make sure your posts data has slug, content, and category
import Meta from "../components/common/Meta";
import { ArrowLeftIcon } from "@heroicons/react/24/solid";

const SinglePostPage = () => {
  const { slug } = useParams();
  // Ensure your post data has a unique 'slug' field to find the post
  const post = posts.find((p) => p.href === `/blog/${slug}`);

  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Creates the parallax effect on the header image
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "150%"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // "Not Found" Page
  if (!post) {
    return (
      <>
        <Meta title="Post Not Found | Acharya Beena" />
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-6 bg-transparent">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h1 className="text-4xl font-bold text-gray-900 dark:text-starlight font-serif">
              Post Not Found
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Sorry, we couldn't find the cosmic wisdom you're looking for.
            </p>
            <Link to="/blog">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 inline-flex items-center gap-x-2 rounded-full bg-nebula-purple px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-opacity-90"
              >
                <ArrowLeftIcon className="h-4 w-4" />
                Back to Blog
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </>
    );
  }

  // Main Post Page
  return (
    <>
      <Meta
        title={`${post.title} | Acharya Beena`}
        description={post.excerpt}
      />
      <div ref={targetRef} className="bg-transparent">
        {/* Parallax Header */}
        <header className="relative h-[60vh] overflow-hidden">
          <motion.div className="absolute inset-0 z-0" style={{ y: imageY }}>
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>

          <motion.div
            style={{ y: textY, opacity: textOpacity }}
            className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white p-6"
          >
            {post.category && (
              <span
                className={`rounded-full px-4 py-1.5 text-xs font-medium ring-1 ring-inset ${post.category.color} bg-opacity-80`}
              >
                {post.category.title}
              </span>
            )}
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl font-serif max-w-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg font-medium text-gray-300">
              {new Date(post.datetime).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </motion.div>
        </header>

        {/* Floating Article Body */}
        <motion.article
          className="relative z-20 -mt-24 sm:-mt-32 pb-24 sm:pb-32 px-6 lg:px-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-white dark:bg-gray-900/95 backdrop-blur-md shadow-2xl ring-1 ring-black/5 dark:ring-white/10">
            <div className="p-8 md:p-12">
              <div
                className="prose prose-lg prose-indigo dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 prose-headings:font-serif prose-headings:dark:text-starlight"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/10">
                <div className="flex items-center gap-x-4">
                  <img
                    src="https://i.pravatar.cc/150?u=acharya-beena"
                    alt="Author"
                    className="h-12 w-12 flex-none rounded-full bg-gray-50"
                  />
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Posted by
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-starlight">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </>
  );
};

export default SinglePostPage;
