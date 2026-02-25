import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AboutPreview() {
  const navigate = useNavigate();

  return (
    <motion.section
      whileHover={{ scale: 1.02 }}
      onClick={() => navigate("/about")}
      className="cursor-pointer bg-black text-white py-20 text-center"
    >
      <h2 className="text-4xl font-bold mb-4">About Us</h2>
      <p className="text-gray-400 max-w-3xl mx-auto">
        We are a cozy café serving handcrafted coffee, fresh food, and
        unforgettable moments.
      </p>
      <p className="text-amber-400 mt-4">Click to know more →</p>
    </motion.section>
  );
}
