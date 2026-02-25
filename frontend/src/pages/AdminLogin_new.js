import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaLock, FaShieldAlt } from "react-icons/fa";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [darkMode] = useState(localStorage.getItem("darkMode") === "true");
  const navigate = useNavigate();

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (password === "admin123") {
        localStorage.setItem("admin", "true");
        navigate("/admin-dashboard");
      } else {
        setError("Invalid admin password. Please try again.");
      }
      setLoading(false);
    }, 500);
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300 flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <FaShieldAlt className="text-4xl text-amber-600 dark:text-amber-400" />
            <h1 className="text-3xl md:text-4xl font-bold text-amber-700 dark:text-amber-400">
              Admin Access
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400">
            Restricted area - Admin login required
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.form
          onSubmit={handleLogin}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-amber-700 to-amber-900 dark:from-amber-900 dark:to-amber-950 p-8 rounded-2xl shadow-xl"
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">
            Enter Admin Password
          </h2>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 rounded"
            >
              <p className="text-red-700 dark:text-red-200 font-semibold">
                ❌ {error}
              </p>
            </motion.div>
          )}

          {/* Password Input */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <label className="block text-amber-100 font-semibold mb-2 flex items-center gap-2">
              <FaLock /> Password
            </label>
            <input
              type="password"
              placeholder="Enter admin password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              className="w-full px-6 py-3 rounded-lg bg-amber-100 text-gray-900 placeholder-gray-600 border-2 border-amber-200 focus:outline-none focus:border-amber-300 focus:ring-2 focus:ring-amber-400 transition-all"
              disabled={loading}
            />
          </motion.div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-white hover:bg-amber-50 text-amber-700 font-bold py-4 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying..." : "🔐 Login to Admin Panel"}
          </motion.button>

          <p className="text-center text-amber-100 text-sm mt-4">
            Only administrators can access this area
          </p>
        </motion.form>

        {/* Security Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8 p-6 bg-amber-50 dark:bg-gray-800 rounded-2xl border border-amber-200 dark:border-gray-700"
        >
          <h3 className="font-bold text-amber-700 dark:text-amber-400 mb-3">
            🛡️ Security Notice
          </h3>
          <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
            <li>✓ Never share your admin password</li>
            <li>✓ Always log out after your session</li>
            <li>✓ Use a strong, secure password</li>
            <li>✓ This is a restricted admin area</li>
          </ul>
        </motion.div>
      </motion.div>
    </div>
  );
}
