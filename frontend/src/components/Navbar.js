import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaShoppingCart, FaBars, FaTimes, FaUser, FaShieldAlt, FaTachometerAlt } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const { cart } = useCart();

  const [menuOpen, setMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    localStorage.setItem("darkMode", darkMode);
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  const totalItems = cart?.reduce((sum, item) => sum + item.quantity, 0) || 0;

  // ✅ 1. Define Public Links
  const publicLinks = [
    { name: "Home", path: "/" },
    { name: "Menu", path: "/menu" },
    { name: "Book Table", path: "/book-table" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // ✅ 2. Define User Links
  const userLinks = [
    { name: "My Orders", path: "/orders" },
  ];

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed w-full z-50 top-0 shadow-md transition-colors duration-300 ${
        darkMode ? "bg-gray-900 text-white shadow-gray-800" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        
        {/* --- LOGO --- */}
        <Link to="/" className="text-2xl font-bold text-amber-600 hover:text-amber-700 flex items-center gap-2">
          ☕ Cafe Aroma
        </Link>

        {/* --- DESKTOP MENU --- */}
        <div className="hidden md:flex space-x-6 items-center">
          
          {/* 1. Public Links */}
          {publicLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-amber-600 transition font-medium ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* 2. User Links (My Orders) */}
          {user && userLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`hover:text-amber-600 transition font-medium ${
                darkMode ? "text-white" : "text-gray-700"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* 3. ✅ ADMIN PANEL LINK (Visible only to Admin) */}
          {user && user.role === "admin" && (
            <Link
              to="/admin-dashboard"
              className="flex items-center gap-1 text-red-600 font-bold border border-red-200 bg-red-50 dark:bg-red-900/20 px-3 py-1 rounded hover:bg-red-100 transition"
            >
              <FaTachometerAlt /> Dashboard
            </Link>
          )}

          {/* 4. Cart Icon */}
          {user && (
            <Link to="/cart" className="relative hover:text-amber-600 transition flex items-center">
              <FaShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-3 bg-amber-500 text-white text-xs px-1.5 py-0.5 rounded-full font-bold">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {/* 5. Admin Login (Visible only if NOT logged in) */}
          {!user && (
            <Link
              to="/admin-login"
              className="flex items-center gap-1 text-red-500 hover:text-red-600 transition font-semibold text-sm"
              title="Admin Panel"
            >
              <FaShieldAlt /> Admin
            </Link>
          )}

          {/* 6. Auth Buttons */}
          {!user ? (
            <div className="relative group">
              <button className="flex items-center gap-2 bg-amber-600 text-white px-4 py-2 rounded-full hover:bg-amber-700 transition font-medium">
                <FaUser /> Login
              </button>
              {/* Dropdown */}
              <div className="absolute right-0 hidden group-hover:block bg-white dark:bg-gray-800 rounded-md shadow-xl mt-0 py-2 w-40 text-center border dark:border-gray-700">
                <Link to="/login" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Login</Link>
                <Link to="/signup" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700">Signup</Link>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-3 ml-2">
              <span className="font-medium text-amber-600">Hi, {user.name}</span>
              <button onClick={handleLogout} className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 px-3 py-1 rounded text-sm transition">
                Logout
              </button>
            </div>
          )}

          {/* Dark Mode Toggle */}
          <button onClick={() => setDarkMode(!darkMode)} className="ml-2 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>

        {/* --- MOBILE MENU ICON --- */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-full text-sm">
            {darkMode ? "☀️" : "🌙"}
          </button>
          <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* --- MOBILE DROPDOWN --- */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className={`md:hidden flex flex-col space-y-3 px-6 pb-6 pt-2 border-t dark:border-gray-700 ${
              darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"
            }`}
          >
            {/* Mobile Public Links */}
            {publicLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setMenuOpen(false)} className="hover:text-amber-600 py-1">
                {link.name}
              </Link>
            ))}

            {/* Mobile User Links */}
            {user && userLinks.map((link) => (
              <Link key={link.name} to={link.path} onClick={() => setMenuOpen(false)} className="hover:text-amber-600 py-1">
                {link.name}
              </Link>
            ))}

            {/* ✅ Mobile Admin Link */}
            {user && user.role === "admin" && (
              <Link 
                to="/admin-dashboard" 
                onClick={() => setMenuOpen(false)}
                className="text-red-500 font-bold py-1 flex items-center gap-2"
              >
                 <FaTachometerAlt /> Admin Dashboard
              </Link>
            )}

            {/* Mobile Cart */}
            {user && (
              <Link to="/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-amber-600 py-1">
                <FaShoppingCart /> Cart 
                {totalItems > 0 && <span className="bg-amber-500 text-white text-xs px-2 rounded-full">{totalItems}</span>}
              </Link>
            )}

            {/* Mobile Auth */}
            {!user ? (
              <div className="flex flex-col gap-2 mt-2">
                <Link to="/admin-login" onClick={() => setMenuOpen(false)} className="text-red-500 text-sm font-semibold mb-2">Admin Login</Link>
                <Link to="/login" onClick={() => setMenuOpen(false)} className="bg-amber-600 text-white text-center py-2 rounded">Login</Link>
                <Link to="/signup" onClick={() => setMenuOpen(false)} className="bg-gray-200 dark:bg-gray-700 text-center py-2 rounded">Signup</Link>
              </div>
            ) : (
              <div className="pt-2 border-t dark:border-gray-700 mt-2">
                <p className="text-sm text-gray-500 mb-2">Signed in as {user.name}</p>
                <button onClick={handleLogout} className="w-full text-left text-red-500 font-semibold">Logout</button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;