import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API_BASE_URL from "../config";

export default function TableBooking() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: 2
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please login to book a table");
      navigate("/login");
      return;
    }

    setLoading(true);
    const toastId = toast.loading("Booking your table...");

    // ✅ FIX 1: Ensure guests is a Number, not a string
    const bookingData = {
      ...formData,
      guests: Number(formData.guests) 
    };

    console.log("📤 Sending Data:", bookingData); // Check Console for this

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("🎉 Table Booked!", { id: toastId });
        setFormData({ name: "", email: "", phone: "", date: "", time: "", guests: 2 });
        setTimeout(() => navigate("/my-bookings"), 1500);
      } else {
        // ✅ FIX 2: Log the exact error to console
        console.error("❌ Server Error Details:", data); 
        toast.error(data.message || "Failed to book", { id: toastId });
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      toast.error("Network Error. Is server running?", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-4 pt-20">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-zinc-900 p-10 rounded-xl text-white shadow-2xl w-full max-w-2xl border border-zinc-800"
      >
        <h3 className="text-3xl font-bold mb-2 text-center text-amber-500">
          Book a Table 🍽️
        </h3>
        <p className="text-center text-zinc-400 mb-8">Reserve your spot at Cafe Aroma</p>

        <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4">
          <input 
            className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none" 
            placeholder="Name" name="name" value={formData.name} onChange={handleChange} required
          />

          <input 
            className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none" 
            placeholder="Email" name="email" type="email" value={formData.email} onChange={handleChange} required readOnly={!!user}
          />

          <input 
            className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none" 
            placeholder="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} required
          />

          <select 
            className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none"
            name="guests" value={formData.guests} onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 8, 10].map(num => (
              <option key={num} value={num}>{num} Guests</option>
            ))}
          </select>

          <input 
            type="date" className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none" 
            name="date" value={formData.date} onChange={handleChange} required
          />

          <input 
            type="time" className="p-3 bg-zinc-800 rounded border border-zinc-700 focus:border-amber-500 focus:outline-none" 
            name="time" value={formData.time} onChange={handleChange} required
          />

          <button 
            type="submit" disabled={loading}
            className="md:col-span-2 bg-amber-500 py-3 rounded font-semibold text-black hover:bg-amber-600 transition-all disabled:opacity-50"
          >
            {loading ? "Confirming..." : "Book Table"}
          </button>
        </form>
      </motion.section>
    </div>
  );
}