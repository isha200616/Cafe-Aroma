import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import API_BASE_URL from "../config";
import { FaCalendarAlt, FaClock, FaUser, FaPhone, FaUsers } from "react-icons/fa";

const TableBooking = () => {
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
      setFormData(prev => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const toastId = toast.loading("Booking your table...");

    try {
      const res = await fetch(`${API_BASE_URL}/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Table Booked Successfully!", { id: toastId });
        navigate("/my-bookings"); 
      } else {
        toast.error("Failed to book.", { id: toastId });
      }
    } catch (error) {
      toast.error("Server Error", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white flex justify-center items-center p-6">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-lg border dark:border-gray-700">
        <h2 className="text-3xl font-bold text-center text-amber-600 mb-6">Book A Table</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaUser className="absolute left-3 top-3.5 text-gray-400" />
              <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" required className="w-full pl-10 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="relative">
              <FaPhone className="absolute left-3 top-3.5 text-gray-400" />
              <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" required className="w-full pl-10 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>

          <div className="relative">
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required readOnly={!!user} className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <FaCalendarAlt className="absolute left-3 top-3.5 text-gray-400" />
              <input type="date" name="date" value={formData.date} onChange={handleChange} required className="w-full pl-10 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
            <div className="relative">
              <FaClock className="absolute left-3 top-3.5 text-gray-400" />
              <input type="time" name="time" value={formData.time} onChange={handleChange} required className="w-full pl-10 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600" />
            </div>
          </div>

          <div className="relative">
            <FaUsers className="absolute left-3 top-3.5 text-gray-400" />
            <select name="guests" value={formData.guests} onChange={handleChange} className="w-full pl-10 p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600">
              {[2,3,4,5,6,8,10].map(n => <option key={n} value={n}>{n} People</option>)}
            </select>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-3 rounded-lg transition-all disabled:opacity-50">
            {loading ? "Booking..." : "Confirm Reservation"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default TableBooking;