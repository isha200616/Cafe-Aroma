import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";
import { FaBoxOpen, FaCalendarCheck, FaClock, FaCheckCircle, FaRupeeSign, FaTrash, FaUtensils, FaChair } from "react-icons/fa";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const Orders = () => {
  const { user } = useAuth();
  
  // State for Data
  const [orders, setOrders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Tabs ('orders' or 'bookings')
  const [activeTab, setActiveTab] = useState("orders");

  useEffect(() => {
    if (user?.email) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch Orders
      const orderRes = await fetch(`${API_BASE_URL}/orders/user/${user.email}`);
      const orderData = await orderRes.json();
      setOrders(orderData);

      // 2. Fetch Bookings
      const bookingRes = await fetch(`${API_BASE_URL}/bookings/user/${user.email}`);
      const bookingData = await bookingRes.json();
      setBookings(bookingData);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  const cancelBooking = async (id) => {
    if(!window.confirm("Are you sure you want to cancel this reservation?")) return;
    try {
      await fetch(`${API_BASE_URL}/bookings/${id}`, { method: "DELETE" });
      toast.success("Booking Cancelled");
      // Remove from UI instantly
      setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
      toast.error("Failed to cancel");
    }
  };

  if (!user) return <div className="text-center py-20 text-xl">Please login to view your activity.</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-10 transition-colors duration-300">
      
      <h1 className="text-3xl font-bold mb-8 text-center md:text-left text-amber-600">My Activity 📜</h1>

      {/* --- TABS --- */}
      <div className="flex justify-center md:justify-start gap-4 mb-8">
        <button 
          onClick={() => setActiveTab("orders")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === "orders" 
              ? "bg-amber-600 text-white shadow-lg scale-105" 
              : "bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <FaUtensils /> Food Orders
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">{orders.length}</span>
        </button>

        <button 
          onClick={() => setActiveTab("bookings")}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
            activeTab === "bookings" 
              ? "bg-purple-600 text-white shadow-lg scale-105" 
              : "bg-white dark:bg-gray-800 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700"
          }`}
        >
          <FaChair /> Table Bookings
          <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">{bookings.length}</span>
        </button>
      </div>

      {loading ? (
        <div className="text-center mt-20 text-gray-500">Loading your history...</div>
      ) : (
        <>
          {/* --- ORDERS LIST --- */}
          {activeTab === "orders" && (
            <div className="space-y-6">
              {orders.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700">
                  <FaBoxOpen className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">No food orders yet. Go to Menu!</p>
                </div>
              ) : (
                orders.map((order) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    key={order._id} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-sm text-gray-500 font-mono">Order #{order._id.slice(-6)}</p>
                        <p className="text-xs text-gray-400">{new Date(order.date).toLocaleString()}</p>
                      </div>
                      
                      {/* Status Badge */}
                      <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        order.status === "Delivered" ? "bg-green-100 text-green-700 border border-green-200" :
                        order.status === "Pending" ? "bg-yellow-100 text-yellow-700 border border-yellow-200" :
                        "bg-blue-100 text-blue-700 border border-blue-200"
                      }`}>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 border-b dark:border-gray-700 pb-4">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-sm">
                          <span className="text-gray-700 dark:text-gray-300">{item.quantity} x {item.name}</span>
                          <span className="font-medium">₹{item.price * item.quantity}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-between font-bold text-lg items-center">
                      <span>Total</span>
                      <span className="flex items-center text-amber-600"><FaRupeeSign size={14}/> {order.totalAmount}</span>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          )}

          {/* --- BOOKINGS LIST --- */}
          {activeTab === "bookings" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bookings.length === 0 ? (
                <div className="col-span-full text-center py-20 bg-white dark:bg-gray-800 rounded-2xl border dark:border-gray-700">
                  <FaCalendarCheck className="mx-auto text-4xl text-gray-300 mb-4" />
                  <p className="text-gray-500">No table reservations found.</p>
                </div>
              ) : (
                bookings.map((booking) => (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                    key={booking._id} 
                    className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow border border-gray-100 dark:border-gray-700 relative overflow-hidden"
                  >
                    {/* Decorative Top Bar */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500"></div>

                    <div className="flex items-center gap-4 mb-6">
                      <div className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 p-4 rounded-full">
                         <FaCalendarCheck size={24} />
                      </div>
                      <div>
                        <p className="font-bold text-xl">{booking.date}</p>
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <FaClock size={12} /> {booking.time}
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg mb-6">
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-500">Guests</span>
                        <span className="font-bold">{booking.guests} People</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">Name</span>
                        <span className="font-bold">{booking.name}</span>
                      </div>
                    </div>

                    <button 
                      onClick={() => cancelBooking(booking._id)}
                      className="w-full flex items-center justify-center gap-2 border border-red-200 text-red-500 py-2.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition font-semibold text-sm"
                    >
                      <FaTrash /> Cancel Reservation
                    </button>
                  </motion.div>
                ))
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Orders;