import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaBoxOpen, FaUtensils, FaSignOutAlt, FaChartLine, FaClipboardList, FaUsers } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import API_BASE_URL from "../config";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  
  // Stats State
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalMenuItems: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const ordersRes = await fetch(`${API_BASE_URL}/orders`);
        const orders = await ordersRes.json();
        const menuRes = await fetch(`${API_BASE_URL}/menu`);
        const menu = await menuRes.json();

        const revenue = orders.reduce((acc, order) => acc + (order.totalAmount || 0), 0);
        
        setStats({
          totalOrders: orders.length,
          totalRevenue: revenue,
          totalMenuItems: menu.length
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      }
    };
    fetchData();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-10">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-bold text-amber-600">Admin Dashboard</h1>
          <p className="text-gray-500">Welcome back, {user?.name || "Admin"}!</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-red-100 dark:bg-red-900/30 text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-200 transition">
          <FaSignOutAlt /> Logout
        </button>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-full text-2xl"><FaChartLine /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h3 className="text-2xl font-bold">₹{stats.totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full text-2xl"><FaClipboardList /></div>
          <div>
            <p className="text-gray-500 text-sm">Total Orders</p>
            <h3 className="text-2xl font-bold">{stats.totalOrders}</h3>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow border border-gray-100 dark:border-gray-700 flex items-center gap-4">
          <div className="p-4 bg-amber-100 text-amber-600 rounded-full text-2xl"><FaUtensils /></div>
          <div>
            <p className="text-gray-500 text-sm">Menu Items</p>
            <h3 className="text-2xl font-bold">{stats.totalMenuItems}</h3>
          </div>
        </div>
      </div>

      {/* --- QUICK ACTIONS --- */}
      <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Manage Menu */}
        <Link to="/admin-menu" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center gap-4 group border border-gray-200 dark:border-gray-700">
          <div className="bg-amber-100 dark:bg-amber-900 p-4 rounded-full group-hover:scale-110 transition-transform">
            <FaUtensils className="text-4xl text-amber-600" />
          </div>
          <h2 className="text-xl font-bold">Manage Menu</h2>
          <p className="text-gray-500 text-center text-sm">Add, edit, or delete items.</p>
        </Link>

        {/* Manage Orders */}
        <Link to="/admin-orders" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center gap-4 group border border-gray-200 dark:border-gray-700">
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-full group-hover:scale-110 transition-transform">
            <FaBoxOpen className="text-4xl text-blue-600" />
          </div>
          <h2 className="text-xl font-bold">Manage Orders</h2>
          <p className="text-gray-500 text-center text-sm">Update order status & view details.</p>
        </Link>

        {/* ✅ NEW: Manage Reservations Button */}
        <Link to="/admin-bookings" className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all flex flex-col items-center gap-4 group border border-gray-200 dark:border-gray-700">
          <div className="bg-purple-100 dark:bg-purple-900 p-4 rounded-full group-hover:scale-110 transition-transform">
            <FaUsers className="text-4xl text-purple-600" />
          </div>
          <h2 className="text-xl font-bold">Reservations</h2>
          <p className="text-gray-500 text-center text-sm">View and manage table bookings.</p>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;