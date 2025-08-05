import React from "react";
import { Link } from "react-router-dom";

const CtaBanner = () => {
  return (
    <div className="bg-indigo-600 dark:bg-nebula-purple/80 dark:backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white dark:text-starlight sm:text-4xl">
            Ready to Discover Your Path?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-indigo-200 dark:text-purple-200">
            A personalized reading can provide the clarity and confidence you're
            searching for. Let's begin your journey together.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/book-consultation"
              className="rounded-md bg-white px-5 py-3 text-base font-semibold text-indigo-600 dark:text-nebula-purple shadow-sm hover:bg-purple-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Book a Consultation Now
            </Link>
            <Link
              to="/contact"
              className="text-base font-semibold leading-6 text-white dark:text-starlight"
            >
              Ask a Question <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CtaBanner;
