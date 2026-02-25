import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

function Success() {
  const navigate = useNavigate();
  const { clearCart } = useCart();

  useEffect(() => {
    // Clear cart after successful payment
    clearCart();

    // Redirect to home after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, clearCart]);

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="text-8xl mb-6"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
        >
          ✅
        </motion.div>

        <h1 className="text-4xl font-bold text-green-500 mb-4">
          Payment Successful!
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Thank you for your order. Your coffee is being prepared! 🍵
        </p>

        <div className="bg-zinc-900 p-6 rounded-lg mb-8 inline-block">
          <p className="text-gray-400 mb-2">Order Confirmation</p>
          <p className="text-2xl font-bold text-amber-500">Order #{'#' + Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
          <p className="text-sm text-gray-500 mt-2">Redirecting home...</p>
        </div>

        <a
          href="/"
          className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
        >
          🏠 Back to Home
        </a>
      </motion.div>
    </div>
  );
}

export default Success;
