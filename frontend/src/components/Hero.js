import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import heroImg from "../assets/hero.png";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="relative h-[90vh] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${heroImg})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center bg-black/70 p-10 rounded-xl"
      >
        <h1 className="text-5xl font-bold text-white mb-4">
          Café Aroma ☕
        </h1>
        <p className="text-gray-300 mb-6">
          Fresh brews • Cozy vibes • Online ordering
        </p>

        <button
          onClick={() => navigate("/menu")}
          className="bg-amber-500 px-6 py-3 rounded-lg font-semibold text-black hover:bg-amber-600 transition"
        >
          Explore Menu
        </button>
      </motion.div>
    </section>
  );
}
