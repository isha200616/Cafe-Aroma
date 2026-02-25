import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Reviews = () => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");

  useEffect(() => {
    // Mock reviews for now (can later fetch from backend)
    setReviews([
      { id: 1, name: "Alice", text: "Loved the coffee and cozy vibe!" },
      { id: 2, name: "Bob", text: "Best cappuccino in town!" },
    ]);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newReview.trim()) return;

    const newEntry = {
      id: Date.now(),
      name: user?.name || "Guest",
      text: newReview,
    };

    setReviews([...reviews, newEntry]);
    setNewReview("");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-20 px-6 md:px-20 transition-all duration-500">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold text-center text-amber-600 dark:text-amber-400 mb-10"
      >
        Customer Reviews
      </motion.h1>

      <div className="max-w-3xl mx-auto">
        {/* Reviews List */}
        {reviews.map((review) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="p-6 mb-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md"
          >
            <h3 className="font-semibold text-amber-600 dark:text-amber-400">
              {review.name}
            </h3>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{review.text}</p>
          </motion.div>
        ))}

        {/* Add Review Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-10 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md"
        >
          <h3 className="text-lg font-semibold mb-2">Add Your Review</h3>
          <textarea
            value={newReview}
            onChange={(e) => setNewReview(e.target.value)}
            className="w-full p-3 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-none focus:ring-2 focus:ring-amber-600"
            rows="3"
            placeholder="Share your thoughts..."
          />
          <button
            type="submit"
            className="mt-3 bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-lg"
          >
            Submit Review
          </button>
        </motion.form>
      </div>
    </div>
  );
};

export default Reviews;
