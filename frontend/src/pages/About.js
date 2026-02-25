import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaHeart, FaUsers, FaArrowRight } from "react-icons/fa";
import hero from "../assets/hero.png";

const About = () => {
  const navigate = useNavigate();
  const [darkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  // Sync dark mode state
  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60 transition-colors duration-300"></div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative z-10 text-white max-w-3xl px-6"
        >
          <motion.h1
            className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            About Cafe Aroma
          </motion.h1>
          
          <motion.p
            className="text-xl md:text-2xl max-w-2xl mx-auto drop-shadow-md font-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Where great taste meets comfort and connection ☕
          </motion.p>
        </motion.div>
      </motion.section>

      {/* Our Story */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6 md:px-20 bg-gradient-to-b from-white to-amber-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300"
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-6">
            Our Story 📖
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
            Founded in 2020, Cafe Aroma started as a small dream to create a sanctuary where
            coffee enthusiasts, creatives, and friends could gather. What began with a single
            espresso machine and genuine passion has blossomed into a beloved community space.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Every cup we serve tells a story—of farmers who cultivated the beans, of roasters
            who perfected their craft, and of baristas who put their hearts into every pour.
            It's not just coffee; it's a connection to something greater.
          </p>
        </motion.div>
      </motion.section>

      {/* Our Values */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6 md:px-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <motion.h2
          variants={itemVariants}
          className="text-4xl md:text-5xl font-bold text-center text-amber-700 dark:text-amber-400 mb-16"
        >
          Our Core Values ✨
        </motion.h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              icon: <FaLeaf className="text-4xl text-amber-600 dark:text-amber-400" />,
              title: "Quality & Sustainability",
              desc: "We source only the finest, ethically-grown coffee beans and commit to sustainable practices.",
            },
            {
              icon: <FaHeart className="text-4xl text-amber-600 dark:text-amber-400" />,
              title: "Passion & Care",
              desc: "Every drink is crafted with love, attention to detail, and a commitment to excellence.",
            },
            {
              icon: <FaUsers className="text-4xl text-amber-600 dark:text-amber-400" />,
              title: "Community & Connection",
              desc: "We create a welcoming space where people connect, create, and feel at home.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100 dark:from-gray-800 dark:to-gray-700 border border-amber-200 dark:border-gray-600 transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                {value.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {value.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* The Cafe Experience */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6 md:px-20 bg-gradient-to-b from-amber-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300"
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-6">
            The Cafe Experience 🏠
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Walk into Cafe Aroma and leave the outside world behind. Whether you're looking for
            a quiet corner to work, a warm spot to meet friends, or simply a moment of peace,
            our cafe welcomes you with open arms.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          variants={containerVariants}
        >
          {[
            {
              emoji: "☕",
              title: "Expertly Crafted Beverages",
              desc: "From classic cappuccinos to innovative seasonal specials, each drink is a masterpiece.",
            },
            {
              emoji: "🥐",
              title: "Fresh, Homemade Pastries",
              desc: "Baked fresh daily, our pastries complement every coffee perfectly.",
            },
            {
              emoji: "🎵",
              title: "Curated Ambiance",
              desc: "Carefully selected music and warm lighting create the perfect atmosphere.",
            },
            {
              emoji: "👥",
              title: "Friendly Community",
              desc: "Meet fellow coffee lovers, artists, students, and inspiring individuals.",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-amber-100 dark:border-gray-700"
            >
              <div className="text-4xl mb-4">{item.emoji}</div>
              <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="py-24 px-6 md:px-20 bg-white dark:bg-gray-900 transition-colors duration-300"
      >
        <motion.div variants={itemVariants} className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-6">
            Meet Our Team 👋
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Our baristas are not just staff—they're passionate coffee artists who take pride in
            every interaction. They're here to make your visit memorable, one cup at a time.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/contact")}
            className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold inline-flex items-center gap-2 shadow-lg transition-all"
          >
            Get in Touch <FaArrowRight />
          </motion.button>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-amber-700 to-amber-900 dark:from-amber-900 dark:to-amber-950 text-white py-20 px-6 text-center"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Visit Us Today ☕</h2>
        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
          Experience the warmth, passion, and community that make Cafe Aroma special. We can't wait to serve you!
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/book-table")}
          className="bg-white hover:bg-amber-50 text-amber-700 px-8 py-4 rounded-lg font-semibold transition-all shadow-lg"
        >
          Book a Table Now
        </motion.button>
      </motion.section>
    </div>
  );
};

export default About;
