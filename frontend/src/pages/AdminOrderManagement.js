import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {  FaBox } from "react-icons/fa";
import axios from "axios";

const API_BASE_URL = "http://localhost:5001/api";

export default function AdminOrderManagement() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [error, setError] = useState("");

  const statusColors = {
    Pending: "bg-yellow-900/30 text-yellow-400 border-yellow-700",
    Preparing: "bg-blue-900/30 text-blue-400 border-blue-700",
    Ready: "bg-green-900/30 text-green-400 border-green-700",
    Delivered: "bg-emerald-900/30 text-emerald-400 border-emerald-700",
  };

  const statusOrder = ["Pending", "Preparing", "Ready", "Delivered"];

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(response.data);
      setLoading(false);
    } catch (err) {
      setError("Failed to load orders");
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, {
        status: newStatus,
      });
      setOrders(orders.map((order) => (order._id === orderId ? response.data : order)));
      if (selectedOrder?._id === orderId) {
        setSelectedOrder(response.data);
      }
      setError("");
    } catch (err) {
      setError("Failed to update order status");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-amber-400 text-xl">Loading orders...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent mb-8">
          Order Management
        </h1>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-200 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="bg-gray-800/50 backdrop-blur border border-amber-500/30 rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Orders ({orders.length})</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {orders.length === 0 ? (
                  <p className="text-gray-400">No orders found</p>
                ) : (
                  orders.map((order) => (
                    <motion.button
                      key={order._id}
                      whileHover={{ x: 5 }}
                      onClick={() => setSelectedOrder(order)}
                      className={`w-full p-4 rounded-lg text-left border-2 transition ${
                        selectedOrder?._id === order._id
                          ? "bg-amber-500/20 border-amber-500"
                          : "bg-gray-700 border-gray-600 hover:border-amber-500/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-semibold text-amber-400">
                          Order #{order._id.slice(-6).toUpperCase()}
                        </span>
                        <span
                          className={`text-xs px-2 py-1 rounded border ${
                            statusColors[order.status]
                          }`}
                        >
                          {order.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-300">
                        ₹{order.totalAmount}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </motion.div>

          {/* Order Details */}
          {selectedOrder ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="lg:col-span-2"
            >
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-amber-500/30 rounded-lg p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-3xl font-bold mb-2">
                      Order #{selectedOrder._id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-gray-400">
                      {new Date(selectedOrder.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          weekday: "long",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </p>
                  </div>
                  <span
                    className={`text-lg px-4 py-2 rounded-full border-2 font-semibold ${
                      statusColors[selectedOrder.status]
                    }`}
                  >
                    {selectedOrder.status}
                  </span>
                </div>

                {/* Status Update Buttons */}
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <p className="text-sm font-semibold mb-3">Update Status:</p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {statusOrder.map((status) => (
                      <button
                        key={status}
                        onClick={() => updateOrderStatus(selectedOrder._id, status)}
                        disabled={
                          statusOrder.indexOf(status) <
                          statusOrder.indexOf(selectedOrder.status)
                        }
                        className={`py-2 px-3 rounded font-semibold transition text-sm ${
                          status === selectedOrder.status
                            ? "bg-amber-500 text-black"
                            : statusOrder.indexOf(status) <
                              statusOrder.indexOf(selectedOrder.status)
                            ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                            : "bg-gray-600 hover:bg-gray-500 text-white"
                        }`}
                      >
                        {status}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-3 text-amber-400">
                    Customer Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Name</p>
                      <p className="font-semibold">
                        {selectedOrder.customerName || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Email</p>
                      <p className="font-semibold">
                        {selectedOrder.customerEmail || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Phone</p>
                      <p className="font-semibold">
                        {selectedOrder.customerPhone || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Address</p>
                      <p className="font-semibold">
                        {selectedOrder.deliveryAddress || "Pickup"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="bg-gray-700/30 rounded-lg p-4 mb-6">
                  <h3 className="font-bold mb-4 text-amber-400">Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.items && selectedOrder.items.length > 0 ? (
                      selectedOrder.items.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex justify-between items-center pb-3 border-b border-gray-600 last:border-0"
                        >
                          <div className="flex-1">
                            <p className="font-semibold">{item.name}</p>
                            <p className="text-sm text-gray-400">
                              Qty: {item.quantity}
                            </p>
                          </div>
                          <p className="font-bold text-amber-400">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </motion.div>
                      ))
                    ) : (
                      <p className="text-gray-400">No items in this order</p>
                    )}
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/50 rounded-lg p-4">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-gray-300">Subtotal:</span>
                    <span className="font-semibold">
                      ₹{selectedOrder.totalAmount}
                    </span>
                  </div>
                  <div className="flex justify-between items-center border-t border-amber-500/30 pt-3">
                    <span className="text-lg font-bold text-amber-400">
                      Total Amount:
                    </span>
                    <span className="text-2xl font-bold text-amber-400">
                      ₹{selectedOrder.totalAmount}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="lg:col-span-2 flex items-center justify-center"
            >
              <div className="text-center">
                <FaBox className="text-6xl text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">
                  Select an order to view details
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
