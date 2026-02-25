import express from "express";
import Booking from "../models/Booking.js";

const router = express.Router();

// POST booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ message: "Booking saved!", booking });
  } catch (err) {
    res.status(500).json({ error: "Booking failed", details: err.message });
  }
});

// GET all bookings (for admin)
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

export default router;
