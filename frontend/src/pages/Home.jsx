import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        className="text-center py-20 px-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-amber-500">
          ☕ Welcome to Our Cafe
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-8">
          Fresh Coffee & Delicious Snacks
        </p>

        {/* Admin Link - Only visible to admins */}
        {user?.isAdmin && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              to="/admin"
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              📊 Admin Panel
            </Link>
            <p className="text-sm text-gray-400 mt-2">
              (Admin access only)
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <div className="flex gap-4 justify-center flex-wrap">
          <Link
            to="/menu"
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            🍰 View Menu
          </Link>
          {user ? (
            <Link
              to="/cart"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              🛒 Your Cart
            </Link>
          ) : (
            <Link
              to="/auth"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
            >
              🔐 Login to Order
            </Link>
          )}
        </div>
      </motion.div>

      {/* Features Section */}
      <div className="bg-zinc-900 py-16 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-500 mb-2">🌟 Quality</h3>
            <p className="text-gray-400">Premium coffee beans & fresh ingredients</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-500 mb-2">⚡ Fast</h3>
            <p className="text-gray-400">Quick service & secure checkout</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-amber-500 mb-2">💳 Secure</h3>
            <p className="text-gray-400">Safe payments with Stripe integration</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
