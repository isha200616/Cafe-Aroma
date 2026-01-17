import Booking from "../models/Booking.js";

// @desc Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { name, email, phone, date, time, guests } = req.body;

    if (!name || !email || !phone || !date || !time) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const booking = new Booking({ name, email, phone, date, time, guests });
    const saved = await booking.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: "Failed to create booking." });
  }
};

// @desc Get all bookings (admin)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings." });
  }
};
