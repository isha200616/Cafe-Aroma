import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function OrderSuccess() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-zinc-900 p-10 rounded-xl text-center max-w-md"
      >
        <h1 className="text-4xl font-bold text-amber-400 mb-4">
          Order Placed 🎉
        </h1>

        <p className="text-gray-300 mb-6">
          Thank you for ordering from Café Aroma ☕  
          Your food will be prepared shortly.
        </p>

        <Link
          to="/menu"
          className="bg-amber-500 px-6 py-3 rounded-lg text-black font-semibold hover:bg-amber-600"
        >
          Order More
        </Link>
      </motion.div>
    </div>
  );
}
