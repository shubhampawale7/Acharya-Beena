import React from "react";
import { Link } from "react-router-dom";
import Meta from "../components/common/Meta";
import {
  BookOpenIcon,
  HomeModernIcon,
  SparklesIcon,
  CalendarDaysIcon,
  HeartIcon,
  ChartBarIcon,
} from "@heroicons/react/24/outline";

const servicesList = [
  {
    name: "Vedic Horoscope Reading",
    description:
      "A comprehensive analysis of your birth chart (Kundli) to reveal life patterns, strengths, and challenges.",
    price: "₹2500",
    duration: "60-minute session",
    icon: BookOpenIcon,
    href: "/book-consultation",
  },
  {
    name: "Vastu Shastra Consultation",
    description:
      "Harmonize the energy of your home or office to promote prosperity, health, and happiness.",
    price: "Starting at ₹5100",
    duration: "Per property",
    icon: HomeModernIcon,
    href: "/book-consultation",
  },
  {
    name: "Numerology Report",
    description:
      "Discover the vibrational meaning of your name and birth date to understand your life path and destiny numbers.",
    price: "₹1500",
    duration: "Detailed PDF Report",
    icon: SparklesIcon,
    href: "/book-consultation",
  },
  {
    name: "Yearly Forecast (Varshaphala)",
    description:
      "Understand the key themes, opportunities, and challenges for the next 12 months.",
    price: "₹2100",
    duration: "45-minute session + Report",
    icon: CalendarDaysIcon,
    href: "/book-consultation",
  },
  {
    name: "Relationship Compatibility",
    description:
      "Synastry analysis to understand the dynamics, strengths, and potential challenges between two individuals.",
    price: "₹3100",
    duration: "75-minute session",
    icon: HeartIcon,
    href: "/book-consultation",
  },
  {
    name: "Career & Business Astrology",
    description:
      "Gain insights into your ideal career path, business timing, and strategies for professional growth.",
    price: "₹2500",
    duration: "60-minute session",
    icon: ChartBarIcon,
    href: "/book-consultation",
  },
];

const ServicesPage = () => {
  return (
    <>
      <Meta
        title="Our Services | Acharya Beena"
        description="Explore a range of astrological services including Vedic Horoscope readings, Vastu Shastra consultations, Numerology reports, and more."
      />
      <div className="bg-gray-100 dark:bg-transparent">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <h1 className="text-base font-semibold text-indigo-600 dark:text-nebula-purple">
              Our Offerings
            </h1>
            <p className="mt-1 text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl">
              Services to Guide Your Way
            </p>
            <p className="mx-auto mt-5 max-w-xl text-xl text-gray-500 dark:text-gray-300">
              Choose from a range of authentic astrological services designed to
              bring you clarity and insight.
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((service) => (
              <div
                key={service.name}
                className="flex flex-col rounded-2xl bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-xl ring-1 ring-black/5 dark:ring-white/10"
              >
                <div className="flex flex-1 flex-col justify-between p-6 lg:p-8">
                  <div>
                    <div className="flex items-center gap-x-4">
                      <service.icon
                        className="h-8 w-8 text-indigo-600 dark:text-nebula-purple"
                        aria-hidden="true"
                      />
                      <h3 className="text-xl font-semibold leading-8 text-gray-900 dark:text-starlight">
                        {service.name}
                      </h3>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {service.description}
                    </p>
                    <div className="mt-6">
                      <p className="text-lg font-semibold text-gray-900 dark:text-starlight">
                        {service.price}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {service.duration}
                      </p>
                    </div>
                  </div>
                  <div className="mt-8">
                    <Link
                      to={service.href}
                      className="block w-full rounded-md bg-indigo-600 dark:bg-nebula-purple px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Book This Service
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServicesPage;
