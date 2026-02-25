import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaSearch, FaRupeeSign } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import API_BASE_URL from "../config";

const Menu = () => {
  const { addToCart } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/menu`);
        if (!res.ok) throw new Error("Failed to load menu");
        const data = await res.json();
        setMenuItems(data);
        setFilteredItems(data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    let result = menuItems;
    if (activeCategory !== "All") {
      result = result.filter((item) => item.category === activeCategory);
    }
    if (searchTerm) {
      result = result.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredItems(result);
  }, [activeCategory, searchTerm, menuItems]);

  const categories = ["All", ...new Set(menuItems.map((item) => item.category))];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Hero Header */}
      <div className="bg-amber-700 py-20 px-6 text-center text-white shadow-lg relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <motion.h1 initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl font-bold mb-4">
            Our Menu ☕
          </motion.h1>
          <p className="text-xl text-amber-100">Handcrafted coffee & delicious meals.</p>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-6 py-8 sticky top-16 z-30 bg-gray-50/95 dark:bg-gray-900/95 backdrop-blur-sm border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full font-semibold transition-all whitespace-nowrap ${
                  activeCategory === cat
                    ? "bg-amber-600 text-white shadow-md"
                    : "bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-gray-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full md:w-64">
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        {loading ? (
          <div className="text-center py-20 text-xl text-gray-500">Brewing the menu... ☕</div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  key={item._id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-full border border-gray-100 dark:border-gray-700 group"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{item.name}</h3>
                      
                      {/* ✅ UPDATED CURRENCY */}
                      <span className="text-amber-600 dark:text-amber-400 font-bold text-lg flex items-center">
                        <FaRupeeSign size={14} />{item.price}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 flex-grow line-clamp-2">
                      {item.description || "Freshly made with premium ingredients."}
                    </p>
                    <button
                      onClick={() => addToCart({ ...item, quantity: 1 })}
                      className="w-full bg-gray-100 dark:bg-gray-700 hover:bg-amber-600 hover:text-white text-gray-900 dark:text-white font-semibold py-3 rounded-xl transition-colors flex justify-center items-center gap-2"
                    >
                      <FaShoppingCart /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;