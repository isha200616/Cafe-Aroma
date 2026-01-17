import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

export const createReview = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    if (!comment) return res.status(400).json({ message: "Comment required" });

    const review = new Review({
      user: req.user._id,
      name: req.user.name,
      comment,
      rating,
    });
    const saved = await review.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to add review" });
  }
};
