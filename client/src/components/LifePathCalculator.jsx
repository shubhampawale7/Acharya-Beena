import React, { useState } from "react";
import { SparklesIcon } from "@heroicons/react/24/solid";

// This data can be expanded with more detailed interpretations
const interpretations = {
  1: "A natural leader, you are independent, ambitious, and pioneering.",
  2: "A peacemaker, you are diplomatic, intuitive, and value harmony.",
  3: "A communicator, you are creative, social, and have a gift for self-expression.",
  4: "A builder, you are practical, organized, and dedicated to creating lasting foundations.",
  5: "An adventurer, you are a freedom-lover who thrives on change, travel, and new experiences.",
  6: "A nurturer, you are responsible, compassionate, and a caretaker for your community.",
  7: "A seeker, you are analytical, spiritual, and have a deep desire for truth and knowledge.",
  8: "A powerhouse, you are ambitious, business-minded, and have strong leadership skills.",
  9: "A humanitarian, you are compassionate, idealistic, and dedicated to serving the greater good.",
  11: "An illuminator (Master Number), you possess heightened intuition and spiritual insight.",
  22: "A Master Builder (Master Number), you have the ability to turn grand dreams into reality.",
  33: "A Master Teacher (Master Number), you are a source of healing and compassionate guidance.",
};

const LifePathCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [lifePathNumber, setLifePathNumber] = useState(null);
  const [error, setError] = useState("");

  const calculateLifePath = (dateString) => {
    if (!dateString) return null;

    const digits = dateString.replace(/-/g, "").split("").map(Number);
    let sum = digits.reduce((acc, digit) => acc + digit, 0);

    // Check for Master Numbers before final reduction
    if (sum === 11 || sum === 22 || sum === 33) {
      return sum;
    }

    // Reduce sum to a single digit
    while (sum > 9) {
      sum = sum
        .toString()
        .split("")
        .map(Number)
        .reduce((acc, digit) => acc + digit, 0);
      // Check for Master Numbers again during reduction
      if (sum === 11 || sum === 22 || sum === 33) {
        return sum;
      }
    }
    return sum;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!birthDate) {
      setError("Please select a valid date.");
      setLifePathNumber(null);
      return;
    }
    setError("");
    const number = calculateLifePath(birthDate);
    setLifePathNumber(number);
  };

  return (
    <div className="bg-white dark:bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="relative isolate overflow-hidden bg-gray-50 dark:bg-deep-space/50 dark:backdrop-blur-sm px-6 py-20 text-center shadow-2xl rounded-3xl ring-1 ring-black/5 dark:ring-white/10 sm:px-16">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
            Discover Your Life Path Number
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-gray-600 dark:text-gray-300">
            Enter your date of birth to reveal your unique numerological
            blueprint and its meaning.
          </p>
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="rounded-md border-0 px-3.5 py-2.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple sm:text-sm sm:leading-6"
            />
            <button
              type="submit"
              className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Calculate
            </button>
          </form>

          {error && <p className="mt-4 text-red-500">{error}</p>}

          {lifePathNumber !== null && (
            <div className="mt-10 p-6 bg-indigo-50 dark:bg-deep-space/70 rounded-xl max-w-xl mx-auto ring-1 ring-indigo-200 dark:ring-nebula-purple/50">
              <div className="flex items-center justify-center gap-x-3">
                <SparklesIcon className="h-8 w-8 text-indigo-600 dark:text-nebula-purple" />
                <p className="text-gray-700 dark:text-gray-300">
                  Your Life Path Number is:
                </p>
                <p className="text-5xl font-bold text-gray-900 dark:text-starlight">
                  {lifePathNumber}
                </p>
              </div>
              <p className="mt-4 text-center text-gray-600 dark:text-gray-300">
                {interpretations[lifePathNumber]}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LifePathCalculator;
