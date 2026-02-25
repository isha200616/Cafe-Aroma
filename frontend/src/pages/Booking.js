import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Booking = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 1,
  });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch("http://localhost:5001/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/order-success");
      }, 2000);
    } else {
      alert("Failed to book a table. Please try again.");
    }
  } catch (err) {
    console.error("Booking error:", err);
    alert("Error connecting to server.");
  }
};


  return (
    <div
      className={`min-h-screen flex items-center justify-center px-6 md:px-10 py-20 ${
        darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center text-amber-600 dark:text-amber-400 mb-6">
          Book a Table
        </h1>

        {!success ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            {[
              { label: "Full Name", name: "name", type: "text" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone Number", name: "phone", type: "tel" },
            ].map((field) => (
              <div key={field.name}>
                <label className="block mb-1">{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  required
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-amber-500"
                />
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                />
              </div>
            </div>

            <div>
              <label className="block mb-1">Guests</label>
              <input
                type="number"
                name="guests"
                min="1"
                max="10"
                value={formData.guests}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2 rounded-lg transition-all"
            >
              Confirm Booking
            </button>
          </form>
        ) : (
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-2xl font-bold text-green-500 mb-2">
              Table Booked Successfully!
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              We look forward to serving you at Cafe Aroma ☕
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Booking;
