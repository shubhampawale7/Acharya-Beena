import React from "react";
import { Link } from "react-router-dom";
import {
  BookOpenIcon,
  HomeModernIcon,
  SparklesIcon,
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

const ServicesOverview = () => {
  return (
    <div className="bg-gray-50 dark:bg-transparent py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 dark:text-nebula-purple">
            Our Services
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
            Everything You Need to Know
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            From detailed birth chart readings to harmonizing your home, we
            offer a range of services to guide you.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {services.map((service) => (
              <div
                key={service.name}
                className="flex flex-col p-6 rounded-2xl bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md hover:shadow-xl transition-shadow duration-300 ring-1 ring-black/5 dark:ring-white/10"
              >
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900 dark:text-starlight">
                  <service.icon
                    className="h-8 w-8 flex-none text-indigo-600 dark:text-nebula-purple"
                    aria-hidden="true"
                  />
                  {service.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600 dark:text-gray-300">
                  <p className="flex-auto">{service.description}</p>
                  <p className="mt-6">
                    <Link
                      to={"/services"}
                      className="text-sm font-semibold leading-6 text-indigo-600 dark:text-nebula-purple hover:underline"
                    >
                      Learn more <span aria-hidden="true">→</span>
                    </Link>
                  </p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ServicesOverview;
