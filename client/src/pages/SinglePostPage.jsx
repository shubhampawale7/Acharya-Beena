import React from "react";
import { useParams, Link } from "react-router-dom";
import { posts } from "../data/blogPosts";
import Meta from "../components/common/Meta";

const SinglePostPage = () => {
  const { slug } = useParams();
  const post = posts.find((p) => p.slug === slug);

  if (!post) {
    return (
      <>
        <Meta title="Post Not Found | Acharya Beena" />
        <div className="text-center py-20 bg-white dark:bg-transparent">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-starlight">
            Post not found
          </h1>
          <p className="mt-4 text-gray-600 dark:text-gray-300">
            Sorry, we couldn't find the post you're looking for.
          </p>
          <Link
            to="/blog"
            className="mt-6 inline-block rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 dark:hover:bg-purple-600"
          >
            &larr; Back to Blog
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Meta
        title={`${post.title} | Acharya Beena`}
        description={post.excerpt}
      />
      <div className="bg-white dark:bg-transparent px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700 dark:text-gray-300">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-nebula-purple">
            {new Date(post.datetime).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
            {post.title}
          </h1>
          <div className="mt-6">
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full rounded-2xl shadow-lg ring-1 ring-black/5 dark:ring-white/10"
            />
          </div>
          <div
            className="mt-10 max-w-2xl prose prose-lg prose-indigo dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-white/20">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Posted by{" "}
              <span className="font-semibold text-gray-900 dark:text-starlight">
                {post.author.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SinglePostPage;
