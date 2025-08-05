import React from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { testimonials } from "../data/testimonials";

const TestimonialsSnippet = () => {
  return (
    <div className="bg-white dark:bg-transparent py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl">
            Words of Trust from My Clients
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Discover how cosmic guidance has illuminated the paths of others on
            their journey.
          </p>
        </div>
        <div className="mx-auto mt-16 flow-root sm:mt-20">
          <div className="-m-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 p-4">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="p-8 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-lg rounded-2xl ring-1 ring-black/5 dark:ring-white/10"
                >
                  <div className="flex items-center">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="mt-6 text-base text-gray-600 dark:text-gray-300">
                    "{testimonial.comment}"
                  </p>
                  <div className="mt-6 flex items-center gap-x-4">
                    <img
                      className="h-10 w-10 rounded-full bg-gray-50"
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <div>
                      <div className="font-semibold text-gray-900 dark:text-starlight">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400">
                        {testimonial.location}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSnippet;
