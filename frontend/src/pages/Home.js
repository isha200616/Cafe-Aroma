import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, Link } from "react-router-dom";
import { FaArrowRight, FaCoffee, FaUsers, FaStar, FaRupeeSign } from "react-icons/fa"; 
import hero from "../assets/hero.png";

const Home = () => {
  const navigate = useNavigate();
  const [darkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      
      {/* --- HERO SECTION --- */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative h-screen bg-cover bg-center flex flex-col justify-center items-center text-center overflow-hidden"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-black/50 dark:bg-black/60 transition-colors duration-300"></div>
        <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="relative z-10 text-white max-w-3xl px-6">
          <motion.h1 className="text-6xl md:text-7xl font-bold mb-6 drop-shadow-lg" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
            Welcome to Cafe Aroma ☕
          </motion.h1>
          <motion.p className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 drop-shadow-md font-light" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.8 }}>
            Savor freshly brewed coffee, cozy ambiance, and delicious food made with love
          </motion.p>
          <motion.div className="flex justify-center gap-4 flex-wrap" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/menu")} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 shadow-lg transition-all">
              View Menu <FaArrowRight />
            </motion.button>
            <Link to="/book-table">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-lg font-semibold backdrop-blur-sm border-2 border-white transition-all">
                Book a Table
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* --- ✅ CLICKABLE ABOUT SECTION (ANIMATED) --- */}
      <motion.section 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, amount: 0.2 }} 
        className="py-24 px-6 md:px-20 bg-amber-50 dark:bg-gray-800 transition-colors duration-300 flex flex-col md:flex-row items-center gap-12"
      >
        {/* Image Side - Slides in from Left */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2"
        >
           <img 
             src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80" 
             alt="Cafe Interior" 
             className="rounded-2xl shadow-2xl hover:scale-105 transition-transform duration-500 w-full object-cover h-[400px]"
           />
        </motion.div>

        {/* Text Side - Slides in from Right */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-6">Our Story 📜</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
            At Cafe Aroma, we believe coffee is more than just a drink—it’s an experience. 
            Founded in 2015, our journey began with a simple mission: to serve the finest 
            hand-roasted coffee in a space that feels like home.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 italic">
            "Where every cup tells a story."
          </p>
          
          <motion.button 
            whileHover={{ scale: 1.05 }} 
            whileTap={{ scale: 0.95 }} 
            onClick={() => navigate("/about")} 
            className="bg-transparent border-2 border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 px-8 py-3 rounded-lg font-bold hover:bg-amber-600 hover:text-white dark:hover:bg-amber-400 dark:hover:text-gray-900 transition-all"
          >
            Read More About Us
          </motion.button>
        </motion.div>
      </motion.section>

      {/* --- FEATURED ITEMS SECTION --- */}
      <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-24 px-6 md:px-20 bg-white dark:bg-gray-900 transition-colors duration-300">
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-amber-700 dark:text-amber-400 mb-4">✨ Featured Favorites</h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">Handpicked selections loved by our guests</p>
        </motion.div>

        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12" variants={containerVariants}>
          {[
            { icon: "☕", name: "Cappuccino", desc: "Rich & creamy perfection", price: 150 },
            { icon: "⚡", name: "Espresso", desc: "Bold, strong, and energizing", price: 100 },
            { icon: "🧁", name: "Blueberry Muffin", desc: "Soft, fresh, and baked daily", price: 180 },
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ y: -10, boxShadow: "0 20px 40px rgba(0,0,0,0.1)" }} className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-amber-100 dark:border-gray-700">
              <div className="text-5xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-400 mb-2">{item.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.desc}</p>
              
              <p className="text-2xl font-bold text-amber-600 dark:text-amber-300 flex items-center gap-1">
                <FaRupeeSign size={20} /> {item.price}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className="text-center" variants={itemVariants}>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/menu")} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all">
            Explore Full Menu
          </motion.button>
        </motion.div>
      </motion.section>

      {/* --- WHY CHOOSE US --- */}
      <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} className="py-24 px-6 md:px-20 bg-amber-50 dark:bg-gray-800 transition-colors duration-300">
        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold text-center text-amber-700 dark:text-amber-400 mb-16">Why Choose Us? 🌟</motion.h2>
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-8" variants={containerVariants}>
          {[
            { icon: <FaCoffee className="text-4xl text-amber-600 dark:text-amber-400" />, title: "Premium Quality", desc: "Freshly sourced, high-quality coffee beans" },
            { icon: <FaUsers className="text-4xl text-amber-600 dark:text-amber-400" />, title: "Cozy Ambiance", desc: "Warm, welcoming space perfect for work" },
            { icon: <FaStar className="text-4xl text-amber-600 dark:text-amber-400" />, title: "Exceptional Service", desc: "Friendly staff dedicated to your satisfaction" },
          ].map((item, index) => (
            <motion.div key={index} variants={itemVariants} whileHover={{ scale: 1.05 }} className="text-center p-8 rounded-2xl bg-white dark:bg-gray-700 border border-amber-200 dark:border-gray-600 transition-all duration-300 shadow-lg">
              <div className="flex justify-center mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{item.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* --- CTA SECTION --- */}
      <motion.section initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }} className="py-20 px-6 md:px-20 bg-white dark:bg-gray-900 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">Ready to Experience Cafe Aroma? ☕</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">Whether you're stopping by for your morning brew or planning a special event, we can't wait to welcome you!</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => navigate("/menu")} className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-4 rounded-lg font-semibold shadow-lg transition-all">View Menu</motion.button>
          <Link to="/book-table">
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="border-2 border-amber-600 text-amber-600 dark:text-amber-400 dark:border-amber-400 hover:bg-amber-50 dark:hover:bg-gray-800 px-8 py-4 rounded-lg font-semibold transition-all">Book a Table</motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
};

export default Home;