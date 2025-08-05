import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Meta from "../components/common/Meta";
// Assuming you have this data file.
import { glossaryTerms } from "../data/glossaryData";
import { BookOpenIcon } from "@heroicons/react/24/solid";

const GlossaryPage = () => {
  const [selectedTerm, setSelectedTerm] = useState(glossaryTerms[0]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeLetter, setActiveLetter] = useState("All");

  const alphabet = ["All", ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];

  const filteredTerms = useMemo(() => {
    return glossaryTerms.filter((item) => {
      const matchesLetter =
        activeLetter === "All" ||
        item.term.toUpperCase().startsWith(activeLetter);
      const matchesSearch = item.term
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesLetter && matchesSearch;
    });
  }, [searchTerm, activeLetter, glossaryTerms]);

  // This useEffect handles the selection logic when filters change.
  React.useEffect(() => {
    const isSelectedTermInFilteredList =
      selectedTerm && filteredTerms.some((t) => t.term === selectedTerm.term);

    if (filteredTerms.length > 0 && !isSelectedTermInFilteredList) {
      // If the current selection is not in the new list, select the first item of the new list.
      setSelectedTerm(filteredTerms[0]);
    } else if (filteredTerms.length === 0) {
      // If there are no results, clear the selection.
      setSelectedTerm(null);
    }
  }, [filteredTerms, selectedTerm]);

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <Meta
        title="Astrology Glossary | Acharya Beena"
        description="Understand key astrological terms like Ascendant, Retrograde, and Transit with our comprehensive glossary."
      />
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="bg-transparent py-24 sm:py-32"
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            variants={itemVariants}
            className="mx-auto max-w-3xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-5xl font-serif">
              Glossary of the Cosmos
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
              A helpful guide to demystify the language of the stars and deepen
              your understanding of astrology.
            </p>
          </motion.div>

          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-12 gap-y-12 lg:max-w-none lg:grid-cols-4">
            {/* Left Column: Term List & Filters */}
            <motion.aside variants={itemVariants} className="lg:col-span-1">
              <input
                type="text"
                placeholder="Search terms..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-full border-0 px-4 py-2.5 bg-gray-100 dark:bg-deep-space/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
              />

              <div className="mt-6 flex flex-wrap gap-1">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => setActiveLetter(letter)}
                    className={`w-8 h-8 rounded-full text-xs font-bold transition-colors ${
                      activeLetter === letter
                        ? "bg-nebula-purple text-white"
                        : "bg-gray-200/50 dark:bg-deep-space/50 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-deep-space"
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>

              <div className="mt-6 h-96 overflow-y-auto pr-2 space-y-1">
                {filteredTerms.length > 0 ? (
                  filteredTerms.map((item) => (
                    <button
                      key={item.term}
                      onClick={() => setSelectedTerm(item)}
                      className={`w-full text-left p-3 rounded-lg text-sm transition-colors duration-200 ${
                        selectedTerm?.term === item.term
                          ? "bg-nebula-purple text-white font-semibold"
                          : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-deep-space/50"
                      }`}
                    >
                      {item.term}
                    </button>
                  ))
                ) : (
                  <p className="p-3 text-sm text-gray-500 dark:text-gray-400">
                    No terms found.
                  </p>
                )}
              </div>
            </motion.aside>

            {/* Right Column: Definition Display */}
            <motion.main variants={itemVariants} className="lg:col-span-3">
              <AnimatePresence mode="wait">
                {selectedTerm ? (
                  <motion.div
                    key={selectedTerm.term}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="p-8 sm:p-10 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-xl min-h-[26rem]"
                  >
                    <div className="flex items-center gap-x-4">
                      <div className="p-3 rounded-full bg-nebula-purple/10">
                        <BookOpenIcon className="h-6 w-6 text-nebula-purple" />
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-starlight font-serif">
                        {selectedTerm.term}
                      </h3>
                    </div>
                    <p className="mt-6 text-base leading-7 text-gray-600 dark:text-gray-300">
                      {selectedTerm.definition}
                    </p>
                  </motion.div>
                ) : (
                  <div className="flex items-center justify-center h-full p-8 rounded-3xl bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl ring-1 ring-black/5 dark:ring-white/10 shadow-xl min-h-[26rem]">
                    <p className="text-gray-500 dark:text-gray-400">
                      Select a term or adjust your filters.
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.main>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default GlossaryPage;
