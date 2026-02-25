import React from "react";
import { useCart } from "../context/CartContext";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash, FaArrowLeft, FaRupeeSign, FaShoppingBag } from "react-icons/fa";
import { motion } from "framer-motion";

const Cart = () => {
  const { cart, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  // Calculate Total
  const totalAmount = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
        <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
        <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
        <p className="text-gray-500 mb-8">Looks like you haven't added any treats yet.</p>
        <Link to="/menu" className="bg-amber-600 text-white px-8 py-3 rounded-full font-bold hover:bg-amber-700 transition">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white p-6 md:p-10 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <Link to="/menu" className="flex items-center gap-2 text-amber-600 mb-6 font-semibold hover:underline">
          <FaArrowLeft /> Back to Menu
        </Link>

        <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
          Your Cart <span className="text-lg font-normal text-gray-500">({cart.length} items)</span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Cart Items List */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item, index) => (
              <motion.div 
                key={`${item._id}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700"
              >
                <img 
                  src={item.image || "https://via.placeholder.com/100"} 
                  alt={item.name} 
                  className="w-20 h-20 object-cover rounded-lg bg-gray-100"
                />
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-gray-500 text-sm">{item.category}</p>
                  
                  {/* ✅ Price in Rupees */}
                  <div className="flex items-center gap-1 font-bold text-amber-600 mt-1">
                    <FaRupeeSign size={12} /> {item.price} x {item.quantity}
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-bold text-lg mb-2 flex items-center justify-end">
                    <FaRupeeSign size={14} /> {item.price * item.quantity}
                  </p>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-red-500 hover:bg-red-50 p-2 rounded-full transition-colors"
                  >
                    <FaTrash />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bill Summary */}
          <div className="md:col-span-1">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 sticky top-24">
              <h3 className="text-xl font-bold mb-4">Order Summary</h3>
              
              <div className="flex justify-between mb-2 text-gray-600 dark:text-gray-400">
                <span>Subtotal</span>
                <span className="flex items-center"><FaRupeeSign size={12}/> {totalAmount}</span>
              </div>
              <div className="flex justify-between mb-4 text-gray-600 dark:text-gray-400">
                <span>Tax (5%)</span>
                <span className="flex items-center"><FaRupeeSign size={12}/> {(totalAmount * 0.05).toFixed(0)}</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>
              
              <div className="flex justify-between text-2xl font-bold mb-6">
                <span>Total</span>
                <span className="flex items-center text-amber-600">
                  <FaRupeeSign size={20}/> {(totalAmount * 1.05).toFixed(0)}
                </span>
              </div>

              <button 
                onClick={() => navigate("/payment")}
                className="w-full bg-amber-600 hover:bg-amber-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-95"
              >
                Proceed to Pay
              </button>
              
              <button 
                onClick={clearCart}
                className="w-full mt-3 text-red-500 font-semibold hover:underline text-sm"
              >
                Clear Cart
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;