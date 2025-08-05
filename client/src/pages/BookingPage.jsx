import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import DatePicker from "react-datepicker";
import Meta from "../components/common/Meta";

// Using the same hard-coded services from our ServicesPage
const servicesList = [
  { name: "Vedic Horoscope Reading", price: 2500 },
  { name: "Vastu Shastra Consultation", price: 5100 },
  { name: "Numerology Report", price: 1500 },
  { name: "Yearly Forecast (Varshaphala)", price: 2100 },
  { name: "Relationship Compatibility", price: 3100 },
  { name: "Career & Business Astrology", price: 2500 },
];

const BookingPage = () => {
  const [service, setService] = useState(servicesList[0].name);
  const [appointmentDate, setAppointmentDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { userInfo } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const selectedService = servicesList.find((s) => s.name === service);

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({
          serviceName: selectedService.name,
          servicePrice: selectedService.price,
          appointmentDate,
          clientNotes: notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "Failed to create appointment.");
      }

      toast.success("Appointment created. Proceed to payment.");
      navigate(`/payment/${data._id}`); // Redirect to the payment page with the new booking ID
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Meta title="Book a Consultation | Acharya Beena" />
      <div className="bg-gray-50 dark:bg-transparent py-12 sm:py-16">
        <div className="mx-auto max-w-2xl px-4 lg:px-0">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-starlight sm:text-3xl">
            Book a Consultation
          </h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Select a service and choose a date and time for your consultation.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-8 bg-white dark:bg-deep-space/50 dark:backdrop-blur-sm shadow-md rounded-lg p-8 ring-1 ring-black/5 dark:ring-white/10"
          >
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="service"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Select Service
                </label>
                <select
                  id="service"
                  name="service"
                  value={service}
                  onChange={(e) => setService(e.target.value)}
                  className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                >
                  {servicesList.map((s) => (
                    <option
                      key={s.name}
                      value={s.name}
                      className="bg-white dark:bg-deep-space"
                    >
                      {s.name} - ₹{s.price}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="appointmentDate"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Choose Date & Time
                </label>
                <div className="mt-2">
                  <DatePicker
                    selected={appointmentDate}
                    onChange={(date) => setAppointmentDate(date)}
                    showTimeSelect
                    dateFormat="MMMM d, yyyy h:mm aa"
                    minDate={new Date()}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="notes"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-starlight"
                >
                  Notes (Optional)
                </label>
                <div className="mt-2">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={4}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Include any specific questions or details, like your birth date and time."
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:bg-slate-800/50 dark:text-starlight shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-white/20 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-nebula-purple"
                  />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-indigo-600 dark:bg-nebula-purple px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 dark:hover:bg-purple-600 disabled:bg-indigo-400"
              >
                {isSubmitting ? "Proceeding..." : "Confirm & Proceed to Pay"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default BookingPage;
