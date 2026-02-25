import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaRupeeSign, FaWallet, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion"; // For button animation
import toast from "react-hot-toast"; // ✅ Import Toast
import API_BASE_URL from "../config";

const Payment = () => {
  const { cart, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  // Calculate Total
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const finalTotal = (totalAmount * 1.05).toFixed(0); 

  const handlePlaceOrder = async () => {
    // 1. Check if user is logged in
    if (!user) {
      toast.error("Please login to place an order!"); // ✅ Animated Error
      navigate("/login");
      return;
    }

    setLoading(true);
    const loadingToast = toast.loading("Processing Order..."); // ✅ Show Loading Spinner

    // 2. Prepare Data
    const orderData = {
      user: { 
        name: user.name || "Guest User", 
        email: user.email || "No Email" 
      },
      items: cart.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || ""
      })),
      totalAmount: Number(finalTotal),
      paymentMethod: "COD"
    };

    try {
      const res = await fetch(`${API_BASE_URL}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();

      if (res.ok) {
        toast.dismiss(loadingToast); // Remove loading spinner
        toast.success("🎉 Order Placed Successfully!"); // ✅ Animated Success
        
        clearCart();
        
        // Wait 1.5 seconds so user sees the success message before moving
        setTimeout(() => {
          navigate("/orders");
        }, 1500);

      } else {
        toast.dismiss(loadingToast);
        console.error("Server Error:", data);
        toast.error(data.message || "Failed to place order"); // ✅ Animated Error
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      console.error("Network Error:", error);
      toast.error("Server connection failed. Is it running?");
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) return <div className="text-center mt-20 text-xl font-bold text-gray-500">Your Cart is empty! 🛒</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 flex justify-center items-center transition-colors duration-300">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl max-w-md w-full border border-gray-100 dark:border-gray-700"
      >
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-2 text-amber-600">
          <FaWallet /> Payment Details
        </h2>

        {/* Bill Summary */}
        <div className="space-y-3 mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>₹{totalAmount}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
            <span>Tax (5%)</span>
            <span>₹{(totalAmount * 0.05).toFixed(0)}</span>
          </div>
          <div className="border-t border-gray-300 dark:border-gray-600 my-2"></div>
          <div className="flex justify-between font-bold text-xl text-amber-600 dark:text-amber-400">
            <span>Total to Pay</span>
            <span className="flex items-center"><FaRupeeSign size={16} />{finalTotal}</span>
          </div>
        </div>

        {/* COD Option */}
        <div className="mb-6">
          <label className="flex items-center gap-3 p-4 border-2 border-amber-600 bg-amber-50 dark:bg-amber-900/20 rounded-xl cursor-pointer">
            <input type="radio" checked readOnly className="w-5 h-5 text-amber-600 accent-amber-600" />
            <span className="font-bold flex-1">Cash on Delivery</span>
            <FaCheckCircle className="text-amber-600 text-xl" />
          </label>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
        >
          {loading ? (
            <>Processing...</> 
          ) : (
            <>Confirm Order (₹{finalTotal})</>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Payment;