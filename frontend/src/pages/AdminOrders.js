import React, { useState, useEffect } from "react";
import API_BASE_URL from "../config";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await fetch(`${API_BASE_URL}/orders`);
    const data = await res.json();
    setOrders(data);
  };

  const updateStatus = async (id, newStatus) => {
    await fetch(`${API_BASE_URL}/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchOrders(); // Refresh list
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-10">
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin-dashboard" className="text-amber-600 text-xl"><FaArrowLeft /></Link>
        <h1 className="text-3xl font-bold">Order Management</h1>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b dark:border-gray-700 text-gray-500 text-sm">
              <th className="p-4">Order ID</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Items</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id} className="border-b dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800 transition">
                <td className="p-4 font-mono text-sm">#{order._id.slice(-6)}</td>
                <td className="p-4">
                  <p className="font-bold">{order.user.name}</p>
                  <p className="text-xs text-gray-500">{order.user.email}</p>
                </td>
                <td className="p-4 text-sm max-w-xs">
                  {order.items.map(i => `${i.quantity}x ${i.name}`).join(", ")}
                </td>
                <td className="p-4 font-bold text-amber-600">₹{order.totalAmount}</td>
                <td className="p-4">
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className={`p-2 rounded-lg font-bold text-sm outline-none cursor-pointer ${
                      order.status === "Delivered" ? "bg-green-100 text-green-700" :
                      order.status === "Pending" ? "bg-yellow-100 text-yellow-800" :
                      "bg-blue-100 text-blue-700"
                    }`}
                  >
                    <option>Pending</option>
                    <option>Preparing</option>
                    <option>Out for Delivery</option>
                    <option>Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;