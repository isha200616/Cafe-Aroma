import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaEnvelope, FaClock, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  const [darkMode] = useState(localStorage.getItem("darkMode") === "true");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const validateForm = () => {
    if (!form.name.trim()) return "Please enter your name";
    if (!form.email.trim()) return "Please enter your email";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Please enter a valid email";
    if (!form.message.trim()) return "Please enter your message";
    if (form.message.length < 10) return "Message should be at least 10 characters";
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
      setLoading(false);
      setTimeout(() => setSuccess(false), 3000);
    }, 1000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 py-12 px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto mb-12"
      >
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 mb-8 transition-colors"
        >
          <FaArrowLeft /> Back
        </button>

        <div className="text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-amber-700 dark:text-amber-400 mb-4">
            Get in Touch 💬
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Have questions, feedback, or special requests? We'd love to hear from you!
          </p>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
        {/* Contact Information */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl font-bold text-amber-700 dark:text-amber-400 mb-8"
          >
            Contact Information
          </motion.h2>

          {[
            {
              icon: <FaMapMarkerAlt className="text-2xl text-amber-600 dark:text-amber-400" />,
              title: "Visit Us",
              details: ["123 Coffee Street", "Aroma City, AC 12345"],
            },
            {
              icon: <FaPhone className="text-2xl text-amber-600 dark:text-amber-400" />,
              title: "Call Us",
              details: ["+91 98765 43210", "Mon-Sun, 9 AM - 9 PM"],
            },
            {
              icon: <FaEnvelope className="text-2xl text-amber-600 dark:text-amber-400" />,
              title: "Email Us",
              details: ["hello@cafearoma.com", "support@cafearoma.com"],
            },
            {
              icon: <FaClock className="text-2xl text-amber-600 dark:text-amber-400" />,
              title: "Hours",
              details: ["Mon-Fri: 8 AM - 10 PM", "Sat-Sun: 9 AM - 11 PM"],
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ x: 10 }}
              className="flex gap-4 p-6 bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-amber-200 dark:border-gray-600 transition-all"
            >
              <div className="flex-shrink-0">
                {item.icon}
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                {item.details.map((detail, idx) => (
                  <p key={idx} className="text-gray-700 dark:text-gray-300">
                    {detail}
                  </p>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center"
        >
          <motion.form
            onSubmit={handleSubmit}
            className="bg-gradient-to-br from-amber-700 to-amber-900 dark:from-amber-900 dark:to-amber-950 p-8 rounded-2xl shadow-xl"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded"
              >
                <p className="text-red-700 dark:text-red-200 font-semibold">❌ {error}</p>
              </motion.div>
            )}

            {/* Success Message */}
            {success && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mb-4 p-4 bg-green-100 dark:bg-green-900 border-l-4 border-green-500 rounded"
              >
                <p className="text-green-700 dark:text-green-200 font-semibold">
                  ✅ Thank you for your message! We'll get back to you soon.
                </p>
              </motion.div>
            )}

            <div className="space-y-4">
              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                type="text"
                name="name"
                placeholder="Your Name"
                value={form.name}
                onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg bg-amber-100 text-gray-900 placeholder-gray-600 border-2 border-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400 transition-all"
                required
              />

              <motion.input
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                type="email"
                name="email"
                placeholder="Your Email"
                value={form.email}
                onChange={handleChange}
                className="w-full px-6 py-3 rounded-lg bg-amber-100 text-gray-900 placeholder-gray-600 border-2 border-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400 transition-all"
                required
              />

              <motion.textarea
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                name="message"
                placeholder="Your Message (at least 10 characters)"
                value={form.message}
                onChange={handleChange}
                rows="5"
                className="w-full px-6 py-3 rounded-lg bg-amber-100 text-gray-900 placeholder-gray-600 border-2 border-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400 transition-all resize-none"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-white hover:bg-amber-50 text-amber-700 font-bold py-4 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? "Sending..." : <>Send Message <FaArrowRight /></>}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>

      {/* Map & FAQ */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-6xl mx-auto mb-12"
      >
        <motion.h2
          variants={itemVariants}
          className="text-3xl font-bold text-center text-amber-700 dark:text-amber-400 mb-8"
        >
          Frequently Asked Questions ❓
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
        >
          {[
            {
              q: "Do you offer WiFi?",
              a: "Yes! Free high-speed WiFi is available for all guests.",
            },
            {
              q: "Are you open for events?",
              a: "Absolutely! We offer private events and group bookings.",
            },
            {
              q: "Do you have vegetarian options?",
              a: "Yes, we have a full range of vegetarian and vegan pastries.",
            },
            {
              q: "How do I book a table?",
              a: "Use our 'Book a Table' feature or call us directly for reservations.",
            },
          ].map((faq, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all border border-amber-100 dark:border-gray-700"
            >
              <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                {faq.q}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {faq.a}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-900 dark:to-amber-950 text-white py-16 px-6 rounded-2xl text-center"
      >
        <h2 className="text-4xl font-bold mb-4">Ready to Visit? ☕</h2>
        <p className="text-lg mb-8 opacity-90">
          Come experience the Cafe Aroma difference!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/book-table")}
          className="bg-white hover:bg-amber-50 text-amber-700 px-8 py-4 rounded-lg font-semibold shadow-lg transition-all"
        >
          Book a Table Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Contact;
