import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { FaUser, FaLock, FaSignInAlt, FaUserPlus, FaSpinner } from "react-icons/fa";
import { useAuth } from "../context/AuthContext"; 
import hero from "../assets/hero.png"; 

const AuthPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, user } = useAuth(); // Get login function and current user status
  
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });

  // If user is already logged in, kick them out of this page immediately
  useEffect(() => {
    if (user) {
      navigate("/menu");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear errors when typing
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API Call delay (Remove this setTimeout in real backend integration)
    setTimeout(() => {
      // SIMPLE VALIDATION
      if (!formData.email || !formData.password) {
        setError("Please fill in all fields");
        setIsLoading(false);
        return;
      }

      // --- LOGIN SUCCESS ---
      // This creates a fake user object. 
      // Replace this object with the real response from your backend (axios.post...)
      const fakeUserResponse = { 
        name: formData.name || "Cafe Guest", 
        email: formData.email, 
        role: "user" 
      };

      // 1. Update Context
      login(fakeUserResponse);
      
      // 2. Redirect
      // If they tried to go to /cart before login, send them there. Otherwise /menu
      const from = location.state?.from?.pathname || "/menu";
      navigate(from, { replace: true });
      
      setIsLoading(false);
    }, 1000); 
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      
      {/* Background Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{ backgroundImage: `url(${hero})` }}
      >
        <div className="absolute inset-0 bg-black/60 transition-colors duration-300"></div>
      </motion.div>

      {/* Form Container */}
      <div className="relative z-10 min-h-screen flex flex-col justify-center items-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-md border border-white/20 p-8 md:p-12 rounded-2xl shadow-2xl max-w-md w-full text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">
            {isLogin ? "Welcome Back" : "Join the Family"} ☕
          </h2>
          <p className="text-gray-200 mb-6 font-light">
            {isLogin ? "Sign in to access our menu" : "Create an account to get started"}
          </p>

          {/* Error Message Display */}
          {error && (
            <div className="bg-red-500/80 text-white text-sm p-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6 text-left">
            {!isLogin && (
              <div className="bg-black/30 rounded-lg flex items-center p-3 border border-white/10 focus-within:border-amber-500">
                <FaUser className="text-gray-400 mr-3" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  onChange={handleChange}
                  className="bg-transparent w-full text-white outline-none"
                />
              </div>
            )}

            <div className="bg-black/30 rounded-lg flex items-center p-3 border border-white/10 focus-within:border-amber-500">
              <FaUser className="text-gray-400 mr-3" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                onChange={handleChange}
                className="bg-transparent w-full text-white outline-none"
              />
            </div>

            <div className="bg-black/30 rounded-lg flex items-center p-3 border border-white/10 focus-within:border-amber-500">
              <FaLock className="text-gray-400 mr-3" />
              <input
                type="password"
                name="password"
                placeholder="Password"
                onChange={handleChange}
                className="bg-transparent w-full text-white outline-none"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-lg shadow-lg flex justify-center items-center gap-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>Logging in... <FaSpinner className="animate-spin" /></>
              ) : (
                <>
                  {isLogin ? "Sign In" : "Sign Up"} 
                  {isLogin ? <FaSignInAlt /> : <FaUserPlus />}
                </>
              )}
            </motion.button>
          </form>

          <div className="mt-6 text-gray-300">
            <button 
              onClick={() => { setIsLogin(!isLogin); setError(""); }}
              className="text-amber-400 font-semibold hover:underline"
            >
              {isLogin ? "Create an account" : "I have an account"}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;