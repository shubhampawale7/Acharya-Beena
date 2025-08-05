import React from "react";
import { Link } from "react-router-dom";
import { posts } from "../data/blogPosts";
import Meta from "../components/common/Meta";

const BlogPage = () => {
  return (
    <>
      <Meta
        title="Astrology Blog | Acharya Beena"
        description="Read insightful articles on Vedic astrology, Vastu, numerology, and cosmic wisdom from Acharya Beena's blog."
      />
      <div className="bg-white dark:bg-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
              From the Cosmos
            </h2>
            <p className="mt-2 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Insights and wisdom to help you navigate your life's journey.
            </p>
          </div>
          <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <article
                key={post.id}
                className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 dark:ring-1 dark:ring-white/10 hover:dark:ring-nebula-purple transition-all duration-300"
              >
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                  <time dateTime={post.datetime} className="mr-8">
                    {post.date}
                  </time>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg
                      viewBox="0 0 2 2"
                      className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img
                        src="https://i.pravatar.cc/40?u=acharya-beena"
                        alt="Author"
                        className="h-6 w-6 flex-none rounded-full bg-white/10"
                      />
                      {post.author.name}
                    </div>
                  </div>
                </div>
                <h3 className="mt-3 text-lg font-semibold leading-6 text-white">
                  <Link to={post.href}>
                    <span className="absolute inset-0" />
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 text-sm leading-6 text-gray-300/80">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPage;
