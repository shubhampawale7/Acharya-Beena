import React, { useState } from "react";
import Meta from "../components/common/Meta";
import { horoscopeData } from "../data/horoscopeData";
import { ZodiacIcon } from "../components/common/ZodiacIcon"; // We will create this next

const HoroscopePage = () => {
  const [selectedSign, setSelectedSign] = useState(horoscopeData[0]); // Default to Aries

  return (
    <>
      <Meta
        title="Today's Horoscope | Acharya Beena"
        description="Get your free daily horoscope readings for all 12 zodiac signs. Find out what the stars have in store for you today."
      />
      <div className="bg-white dark:bg-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
              Today's Horoscope
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              Select your zodiac sign to reveal your cosmic guidance for the
              day.
            </p>
          </div>

          {/* Zodiac Sign Selector Grid */}
          <div className="mt-16 grid grid-cols-3 md:grid-cols-6 lg:grid-cols-12 gap-4">
            {horoscopeData.map((sign) => (
              <button
                key={sign.id}
                onClick={() => setSelectedSign(sign)}
                className={`flex flex-col items-center p-4 rounded-xl transition-all duration-300 ${
                  selectedSign.id === sign.id
                    ? "bg-indigo-100 dark:bg-nebula-purple/50 ring-2 ring-indigo-500 dark:ring-nebula-purple"
                    : "bg-gray-50 dark:bg-deep-space/50 hover:bg-gray-100 dark:hover:bg-deep-space"
                }`}
              >
                <ZodiacIcon
                  signName={sign.sign}
                  className="h-8 w-8 text-gray-700 dark:text-starlight"
                />
                <span className="mt-2 text-xs font-semibold text-gray-800 dark:text-gray-300">
                  {sign.sign}
                </span>
              </button>
            ))}
          </div>

          {/* Result Display */}
          {selectedSign && (
            <div className="mt-16 mx-auto max-w-4xl">
              <div className="bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-xl rounded-2xl ring-1 ring-black/5 dark:ring-white/10 p-8">
                <div className="flex flex-col sm:flex-row items-center text-center sm:text-left">
                  <div className="flex-shrink-0">
                    <div className="p-4 bg-indigo-100 dark:bg-nebula-purple/20 rounded-full">
                      <ZodiacIcon
                        signName={selectedSign.sign}
                        className="h-16 w-16 text-indigo-600 dark:text-nebula-purple"
                      />
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-0 sm:ml-6">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-starlight">
                      {selectedSign.sign}
                    </h3>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {selectedSign.dateRange}
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-lg text-gray-700 dark:text-gray-300 text-center">
                  {selectedSign.prediction}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HoroscopePage;
