import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";

const footerSections = {
  services: [
    { name: "Vedic Horoscope", href: "/services/vedic-horoscope" },
    { name: "Vastu Shastra", href: "/services/vastu-shastra" },
    { name: "Numerology", href: "/services/numerology" },
    { name: "Tarot Reading", href: "/services/tarot-reading" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Blog", href: "/blog" },
    { name: "Contact Us", href: "/contact" },
    { name: "Glossary", href: "/glossary" },
    { name: "Testimonials", href: "/testimonials" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy-policy" },
    { name: "Terms of Service", href: "/terms-of-service" },
    { name: "Disclaimer", href: "/disclaimer" },
  ],
};

const socialLinks = [
  {
    name: "Facebook",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "#",
    icon: (props) => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.664-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919.058-1.265.07-1.644.07-4.849h.001zm0 2.88c-3.116 0-3.488.013-4.71.068-2.633.12-3.945 1.432-4.065 4.065-.055 1.22-.068 1.59-.068 4.71s.013 3.49.068 4.71c.12 2.633 1.432 3.945 4.065 4.065 1.22.055 1.59.068 4.71.068s3.49-.013 4.71-.068c2.633-.12 3.945-1.432 4.065-4.065.055-1.22.068-1.59.068-4.71s-.013-3.49-.068-4.71c-.12-2.633-1.432-3.945-4.065-4.065-1.22-.055-1.59-.068-4.71-.068zm0 8.162c-1.933 0-3.5 1.567-3.5 3.5s1.567 3.5 3.5 3.5 3.5-1.567 3.5-3.5-1.567-3.5-3.5-3.5zm0 5.682c-1.196 0-2.182-.986-2.182-2.182s.986-2.182 2.182-2.182 2.182.986 2.182 2.182-.986 2.182-2.182 2.182zm4.632-6.78c-.537 0-.97.433-.97.97s.433.97.97.97.97-.433.97.97c-.001-.537-.433-.97-.97-.97z" />
      </svg>
    ),
  },
];

const Footer = () => {
  return (
    <footer
      className="bg-gray-100/80 backdrop-blur-sm dark:bg-deep-space/70 dark:backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="mx-auto max-w-7xl px-6 pb-8 pt-16 sm:pt-24 lg:px-8 lg:pt-32">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <div className="flex items-center">
              <img
                className="h-10 w-auto"
                src={logo}
                alt="Acharya Beena Logo"
              />
              <span className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">
                Acharya Beena
              </span>
            </div>
            <p className="text-sm leading-6 text-gray-600 dark:text-gray-300">
              Guiding you through life's journey with the wisdom of the cosmos.
            </p>
            <div className="flex space-x-6">
              {socialLinks.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-500 hover:text-gray-600 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Services
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections.services.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Company
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-1 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-6 space-y-4">
                  {footerSections.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.href}
                        className="text-sm leading-6 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-16 border-t border-gray-900/10 dark:border-white/10 pt-8 sm:mt-20 lg:mt-24">
          <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Acharya Beena. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
