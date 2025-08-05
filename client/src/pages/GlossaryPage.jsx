import React, { useState } from "react";
import Meta from "../components/common/Meta";
import { glossaryTerms } from "../data/glossaryData";

const GlossaryPage = () => {
  // Set the first term as the default selected term on page load
  const [selectedTerm, setSelectedTerm] = useState(glossaryTerms[0]);

  return (
    <>
      <Meta
        title="Astrology Glossary | Acharya Beena"
        description="Understand key astrological terms like Ascendant, Retrograde, and Transit with our comprehensive glossary. A resource for beginners and enthusiasts."
      />
      <div className="bg-white dark:bg-transparent py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
              Glossary of Astrological Terms
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              A helpful guide to demystify the language of the cosmos and deepen
              your understanding of astrology.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {/* Left Column: Term List */}
            <aside className="lg:col-span-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-starlight mb-4">
                Terms
              </h3>
              <ul className="space-y-2">
                {glossaryTerms.map((item) => (
                  <li key={item.term}>
                    <button
                      onClick={() => setSelectedTerm(item)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors duration-200 ${
                        selectedTerm.term === item.term
                          ? "bg-indigo-600 dark:bg-nebula-purple text-white"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-space/50"
                      }`}
                    >
                      {item.term}
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            {/* Right Column: Definition Display */}
            <main className="lg:col-span-3">
              {selectedTerm && (
                <div className="p-8 bg-gray-50 dark:bg-deep-space/50 dark:backdrop-blur-sm rounded-2xl ring-1 ring-black/5 dark:ring-white/10">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-starlight">
                    {selectedTerm.term}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-gray-600 dark:text-gray-300">
                    {selectedTerm.definition}
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default GlossaryPage;
