import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/common/Meta";
import ServicesOverview from "../components/ServicesOverview";
import AboutSnippet from "../components/AboutSnippet";
import CtaBanner from "../components/CtaBanner";
import TestimonialsSnippet from "../components/TestimonialSnippet";
import LifePathCalculator from "../components/LifePathCalculator";

const HomePage = () => {
  return (
    <>
      <Meta
        title="Welcome to Acharya Beena | Expert Astrologer"
        description="Get personalized astrological readings and guidance from Acharya Beena. Explore Vedic astrology, Vastu, and Numerology to illuminate your path."
      />

      {/* --- Hero Section --- */}
      <div className="bg-white dark:bg-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="relative isolate overflow-hidden pt-12 lg:pt-0">
            <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
              <div className="mx-auto max-w-xl lg:mx-0 lg:max-w-lg lg:flex-shrink-0 lg:pt-8">
                <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-6xl">
                  Guidance from the Stars
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  Unlock your potential and navigate life's journey with cosmic
                  wisdom. Acharya Beena offers personalized astrological
                  readings to illuminate your path.
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <Link
                    to="/book-consultation"
                    className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Book a Consultation
                  </Link>
                  <Link
                    to="/services"
                    className="text-sm font-semibold leading-6 text-gray-900 dark:text-starlight"
                  >
                    View Services <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
              <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
                <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none">
                  <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-gray-400/10 dark:ring-white/10">
                    <div className="absolute inset-0 bg-gray-900/30"></div>
                    <img
                      src="https://images.unsplash.com/photo-1533294455009-a77b7557d2d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Celestial representation of astrology"
                      className="w-[40rem] relative"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LifePathCalculator />
      <ServicesOverview />
      <AboutSnippet />
      <CtaBanner />
      <TestimonialsSnippet />
    </>
  );
};

export default HomePage;
