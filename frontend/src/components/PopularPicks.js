import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PopularPicks({ items }) {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-black text-white">
      <h2 className="text-4xl font-bold text-center mb-12">
        Our Popular Picks ☕
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {items.slice(0, 3).map((item) => (
          <motion.div
            key={item._id}
            whileHover={{ scale: 1.05 }}
            className="bg-zinc-900 p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="text-gray-400">{item.description}</p>
            <p className="text-amber-400 font-bold mt-2">
              ₹{item.price}
            </p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <button
          onClick={() => navigate("/menu")}
          className="bg-amber-500 px-6 py-3 rounded-lg text-black font-semibold hover:bg-amber-600"
        >
          View Full Menu
        </button>
      </div>
    </section>
  );
}
