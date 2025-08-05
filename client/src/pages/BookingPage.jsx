import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; // Base styles for datepicker
import Meta from "../components/common/Meta";
import Spinner from "../components/common/Spinner";

const servicesList = [
  { name: "Vedic Horoscope Reading", price: 2500 },
  { name: "Vastu Shastra Consultation", price: 5100 },
  { name: "Numerology Report", price: 1500 },
  { name: "Yearly Forecast (Varshaphala)", price: 2100 },
  { name: "Relationship Compatibility", price: 3100 },
  { name: "Career & Business Astrology", price: 2500 },
];

const BookingPage = () => {
  const [selectedService, setSelectedService] = useState(servicesList[0]);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API Call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    try {
      const newBookingId = Math.floor(Math.random() * 100000); // Mock ID
      toast.success("Appointment created. Proceed to payment.");
      navigate(`/payment/${newBookingId}`);
    } catch (error) {
      toast.error("Failed to create appointment.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <>
      <Meta title="Book a Consultation | Acharya Beena" />
      <motion.div
        variants={pageVariants}
        initial="hidden"
        animate="visible"
        className="bg-transparent py-24 sm:py-32"
      >
        <div className="mx-auto max-w-3xl px-4 lg:px-0">
          <motion.div variants={itemVariants} className="text-center">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-4xl font-serif">
              Book a Consultation
            </h1>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
              Begin your journey of cosmic discovery in three simple steps.
            </p>
          </motion.div>

          <motion.form
            variants={itemVariants}
            onSubmit={handleSubmit}
            className="mt-12 bg-white/60 dark:bg-deep-space/50 backdrop-blur-xl shadow-2xl rounded-3xl ring-1 ring-black/5 dark:ring-white/10"
          >
            <div className="p-8 sm:p-10 space-y-8">
              {/* Step 1: Select Service */}
              <div>
                <h2 className="text-xl font-semibold leading-6 text-gray-900 dark:text-starlight">
                  <span className="text-nebula-purple font-bold">1.</span>{" "}
                  Select Your Service
                </h2>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {servicesList.map((service) => (
                    <motion.button
                      type="button"
                      key={service.name}
                      onClick={() => setSelectedService(service)}
                      className={`relative text-left p-4 rounded-xl transition-all duration-200 ring-2
                                ${
                                  selectedService.name === service.name
                                    ? "bg-white dark:bg-deep-space ring-nebula-purple shadow-lg"
                                    : "bg-white/50 dark:bg-deep-space/50 ring-transparent hover:ring-nebula-purple/50"
                                }`}
                      whileHover={{ y: -5 }}
                    >
                      <p className="font-semibold text-gray-900 dark:text-starlight">
                        {service.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        ₹{service.price}
                      </p>
                      {selectedService.name === service.name && (
                        <motion.div
                          layoutId="selected-service-indicator"
                          className="absolute -top-2 -right-2 h-5 w-5 bg-nebula-purple rounded-full border-2 border-white dark:border-deep-space"
                        />
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Step 2: Choose Date & Time */}
              <div>
                <label
                  htmlFor="appointmentDate"
                  className="block text-xl font-semibold leading-6 text-gray-900 dark:text-starlight"
                >
                  <span className="text-nebula-purple font-bold">2.</span>{" "}
                  Choose Date & Time
                </label>
                <div className="mt-4">
                  <DatePicker
                    selected={appointmentDate}
                    onChange={(date) => setAppointmentDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    className="custom-datepicker-input" // Use the custom class for styling
                    calendarClassName="font-sans"
                  />
                </div>
              </div>

              {/* Step 3: Add Notes */}
              <div>
                <label
                  htmlFor="notes"
                  className="block text-xl font-semibold leading-6 text-gray-900 dark:text-starlight"
                >
                  <span className="text-nebula-purple font-bold">3.</span> Add
                  Notes{" "}
                  <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                    (Optional)
                  </span>
                </label>
                <div className="mt-4">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Include any specific questions or details, like your birth date and time, if you have them."
                    className="block w-full rounded-md border-0 p-3.5 bg-white/80 dark:bg-slate-800/50 text-gray-900 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-nebula-purple transition"
                  />
                </div>
              </div>
            </div>

            {/* Submission Area */}
            <div className="p-8 bg-gray-50 dark:bg-deep-space/50 rounded-b-3xl mt-4 flex justify-between items-center">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Total Price
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-starlight">
                  ₹{selectedService.price}
                </p>
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: !isSubmitting ? 1.05 : 1 }}
                whileTap={{ scale: !isSubmitting ? 0.95 : 1 }}
                className="inline-flex items-center justify-center w-52 h-12 rounded-full bg-nebula-purple px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/40 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <Spinner size="sm" />
                ) : (
                  "Confirm & Proceed to Pay"
                )}
              </motion.button>
            </div>
          </motion.form>
        </div>
      </motion.div>
    </>
  );
};

export default BookingPage;
