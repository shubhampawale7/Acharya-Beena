import React, { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Meta from "../components/common/Meta";

// --- Import the 6 unique certificate images ---
import certNakshatra from "../assets/images/certificates/nakshatra-mastery.png";
import certMysticalTriangle from "../assets/images/certificates/mystical-triangle.png";
import certLalKitab from "../assets/images/certificates/lal-kitab.png";
import certAnkJyotish from "../assets/images/certificates/ank-jyotish.png";
import certRudraksha from "../assets/images/certificates/rudraksha.png";
import certPanchPakshi from "../assets/images/certificates/panch-pakshi.png";

// --- Create an array for the 6 certificates ---
const certificates = [
  { img: certNakshatra, title: "Nakshatra Mastery Program" },
  { img: certMysticalTriangle, title: "Certified Mystical Triangle Expert" },
  { img: certLalKitab, title: "Certified Lal Kitab Expert" },
  { img: certAnkJyotish, title: "Certified Ank Jyotish" },
  { img: certRudraksha, title: "Rudraksha Foundations" },
  { img: certPanchPakshi, title: "Certified Panch Pakshi Shastra Expert" },
];

const AboutPage = () => {
  // State for the modal
  const [selectedCert, setSelectedCert] = useState(null);

  return (
    <>
      <Meta
        title="About Acharya Beena | My Astrological Journey & Credentials"
        description="Learn about Acharya Beena's journey into Vedic astrology, her philosophy, her credentials, and her commitment to guiding clients."
      />
      <div className="bg-white dark:bg-transparent">
        <main className="isolate">
          {/* Hero section */}
          <div className="relative isolate -z-10">
            <div className="overflow-hidden">
              <div className="mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32">
                <div className="mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center">
                  <div className="w-full max-w-xl lg:shrink-0 xl:max-w-2xl">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-6xl">
                      Guiding Your Path with Cosmic Wisdom
                    </h1>
                    <p className="relative mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300 sm:max-w-md lg:max-w-none">
                      Welcome! I am Acharya Beena, a certified astrologer
                      dedicated to illuminating the path of others through the
                      sacred science of the stars. My journey has been one of
                      deep study and a profound calling to help individuals find
                      clarity, purpose, and harmony in their lives. Here, I
                      share my story and my commitment to you.
                    </p>
                  </div>
                  <div className="mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0">
                    <div className="ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=911&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Astrology chart and crystals"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 dark:bg-deep-space/50 object-cover shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                        />
                      </div>
                    </div>
                    <div className="mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1729335511883-29eade10006b?q=80&w=893&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Ancient astrological text"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 dark:bg-deep-space/50 object-cover shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                        />
                      </div>
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1698732308311-98592dadedcc?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Hands holding a glowing object"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 dark:bg-deep-space/50 object-cover shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                        />
                      </div>
                    </div>
                    <div className="w-44 flex-none space-y-8 pt-32 sm:pt-0">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1737317313279-1d09a49b9f29?q=80&w=993&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                          alt="Constellation map"
                          className="aspect-[2/3] w-full rounded-xl bg-gray-900/5 dark:bg-deep-space/50 object-cover shadow-lg ring-1 ring-black/5 dark:ring-white/10"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Philosophy / Content Section */}
          <div className="mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 pb-16">
            <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
                My Philosophy
              </h2>
              <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
                <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
                  <p className="text-xl leading-8 text-gray-600 dark:text-gray-300">
                    I believe astrology is not about predicting a fixed destiny,
                    but about understanding the cosmic energies you were born
                    with. It is a profound tool for self-awareness, empowerment,
                    and making conscious choices that align with your highest
                    potential.
                  </p>
                  <div className="mt-10 max-w-xl text-base leading-7 text-gray-700 dark:text-gray-400">
                    <p>
                      My approach is rooted in the timeless wisdom of Vedic
                      traditions, combined with a practical understanding of the
                      challenges and opportunities of modern life. In our
                      sessions, we go beyond simple predictions. We create a
                      sacred, confidential space to explore your life's
                      patterns, uncover your innate strengths, and develop
                      strategies to navigate your journey with greater
                      confidence and grace.
                    </p>
                    <p className="mt-8">
                      My ultimate goal is to empower you. By understanding your
                      unique astrological blueprint, you can overcome obstacles,
                      heal, and create a life of purpose, joy, and fulfillment.
                    </p>
                  </div>
                </div>
                <div className="lg:flex lg:flex-auto lg:justify-center">
                  <dl className="w-64 space-y-8 xl:w-80">
                    <div className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
                        A foundation of certified learning and continuous study.
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-starlight">
                        Expertise
                      </dd>
                    </div>
                    <div className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
                        A genuine commitment to the practice and its traditions.
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-starlight">
                        Dedication
                      </dd>
                    </div>
                    <div className="flex flex-col-reverse gap-y-4">
                      <dt className="text-base leading-7 text-gray-600 dark:text-gray-300">
                        A supportive and non-judgmental approach for every
                        client.
                      </dt>
                      <dd className="text-5xl font-semibold tracking-tight text-gray-900 dark:text-starlight">
                        Compassion
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </div>

          {/* Certification Section */}
          <div className="bg-gray-50 dark:bg-deep-space/40 dark:backdrop-blur-sm ring-1 ring-black/5 dark:ring-white/10">
            <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-24">
              <div className="mx-auto max-w-2xl lg:text-center">
                <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
                  My Credentials & Certifications
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
                  A commitment to professional standards and continuous learning
                  in the sacred cosmic sciences. Click any certificate to view
                  it in detail.
                </p>
              </div>
              <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-8">
                {certificates.map((cert, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedCert(cert.img)}
                    className="cursor-pointer rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 group bg-gray-200 dark:bg-slate-800/50"
                  >
                    <img
                      src={cert.img}
                      alt={`${cert.title} Certificate`}
                      className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Lightbox/Modal for Viewing a Certificate */}
      {selectedCert && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-[100] p-4"
          onClick={() => setSelectedCert(null)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedCert(null)}
              className="absolute -top-4 -right-4 bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 z-10"
              aria-label="Close certificate view"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
            <img
              src={selectedCert}
              alt="Selected certificate"
              className="w-auto h-auto max-h-[90vh] rounded-lg shadow-2xl"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutPage;
