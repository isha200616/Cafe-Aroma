import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_BASE_URL from "../config";
import { FaTrash, FaArrowLeft, FaPhone, FaEnvelope, FaCalendarCheck } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/bookings`);
      const data = await res.json();
      setBookings(data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    if(!window.confirm("Delete this reservation?")) return;
    await fetch(`${API_BASE_URL}/bookings/${id}`, { method: "DELETE" });
    toast.success("Deleted");
    setBookings(bookings.filter(b => b._id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin-dashboard" className="text-amber-600 text-xl"><FaArrowLeft /></Link>
        <h1 className="text-3xl font-bold">Reservations</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {bookings.map(b => (
          <div key={b._id} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border dark:border-gray-700 relative">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-bold text-xl text-amber-600">{b.name}</h3>
                <p className="text-sm text-gray-500 flex items-center gap-2"><FaEnvelope /> {b.email}</p>
                <p className="text-sm text-gray-500 flex items-center gap-2"><FaPhone /> {b.phone}</p>
              </div>
              <button onClick={() => deleteBooking(b._id)} className="text-red-500 hover:text-red-700 p-2"><FaTrash /></button>
            </div>
            
            <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg flex justify-between items-center">
              <div className="text-center">
                <span className="block text-xs text-gray-400 uppercase">Date</span>
                <span className="font-bold">{b.date}</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-gray-400 uppercase">Time</span>
                <span className="font-bold">{b.time}</span>
              </div>
              <div className="text-center">
                <span className="block text-xs text-gray-400 uppercase">Guests</span>
                <span className="font-bold text-lg text-amber-500">{b.guests}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBookings;