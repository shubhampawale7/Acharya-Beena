import React from "react";
import { Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { Constellation } from "./common/Constellation";

const highlights = [
  {
    name: "Certified Expertise",
    description: "Holding certifications in various astrological disciplines.",
  },
  {
    name: "Personalized Approach",
    description: "Every reading is tailored to your unique life circumstances.",
  },
  {
    name: "Holistic Guidance",
    description: "Combining ancient wisdom with practical, modern advice.",
  },
];

const AboutSnippet = () => {
  return (
    <div className="relative bg-white dark:bg-transparent py-16 sm:py-24 overflow-hidden">
      <Constellation className="absolute top-0 right-0 w-96 h-96 text-gray-200/50 dark:text-nebula-purple/10 transform -translate-y-1/4 translate-x-1/4" />

      <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-24 lg:items-center">
        <div className="relative sm:py-16 lg:py-0">
          <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0 lg:max-w-none lg:py-20">
            {/* Image placeholder */}
            <div className="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden ring-1 ring-black/5 dark:ring-white/10">
              <img
                className="absolute inset-0 h-full w-full object-cover"
                src="//images.unsplash.com/photo-1678082309527-7c47ac57d738?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="A representation of astrology and wisdom with constellations"
              />
            </div>
          </div>
        </div>

        <div className="relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0">
          {/* Content area */}
          <div className="pt-12 sm:pt-16 lg:pt-20">
            <h2 className="text-3xl text-gray-900 dark:text-starlight font-extrabold tracking-tight sm:text-4xl">
              Meet Acharya Beena
            </h2>
            <div className="mt-6 text-gray-500 dark:text-gray-300 space-y-6">
              <p className="text-lg">
                With a deep passion for the cosmic sciences, I am dedicated to
                helping individuals find clarity and purpose. My journey into
                astrology was driven by a desire to understand the deeper
                currents that shape our lives.
              </p>
              <p className="text-base leading-7">
                Today, I use this sacred knowledge to offer guidance, support,
                and empowerment to my clients, helping them navigate challenges
                and embrace their true potential.
              </p>
            </div>
            <div className="mt-10">
              <dl className="space-y-4">
                {highlights.map((highlight) => (
                  <div key={highlight.name} className="relative">
                    <dt>
                      <CheckBadgeIcon
                        className="absolute h-6 w-6 text-indigo-600 dark:text-nebula-purple"
                        aria-hidden="true"
                      />
                      <p className="ml-9 text-lg leading-6 font-medium text-gray-900 dark:text-starlight">
                        {highlight.name}
                      </p>
                    </dt>
                    <dd className="mt-1 ml-9 text-base text-gray-500 dark:text-gray-400">
                      {highlight.description}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-10">
                <Link
                  to="/about"
                  className="text-base font-medium text-indigo-600 dark:text-nebula-purple hover:underline"
                >
                  Learn more about my journey{" "}
                  <span aria-hidden="true">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutSnippet;
