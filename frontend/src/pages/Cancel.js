import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Cancel() {
  const navigate = useNavigate();

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
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 1 }}
        >
          ❌
        </motion.div>

        <h1 className="text-4xl font-bold text-red-500 mb-4">
          Payment Cancelled
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Your payment was not processed. Your items are still in your cart.
        </p>

        <div className="space-y-4">
          <button
            onClick={() => navigate("/cart")}
            className="inline-block bg-amber-500 hover:bg-amber-600 text-black font-bold py-3 px-8 rounded-lg transition transform hover:scale-105 mr-4"
          >
            🛒 Back to Cart
          </button>
          <button
            onClick={() => navigate("/")}
            className="inline-block bg-zinc-700 hover:bg-zinc-600 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            🏠 Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default Cancel;
