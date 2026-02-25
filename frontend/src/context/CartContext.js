import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import API_BASE_URL from "../config";
import { useAuth } from "./AuthContext"; // ✅ Changed to useAuth hook

export const CartContext = createContext();

// Create the hook for Cart
export const useCart = () => useContext(CartContext); 

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user } = useAuth(); // ✅ Using the hook

  const addToCart = (item) => setCart((prev) => [...prev, item]);
  const removeFromCart = (id) => setCart((prev) => prev.filter((i) => i._id !== id));
  const clearCart = () => setCart([]);

  const placeOrder = async (paymentMethod = "COD") => {
    if (!user) return alert("Login first!");
    try {
      const res = await axios.post(
        `${API_BASE_URL}/orders`,
        { items: cart, paymentMethod },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      clearCart();
      return res.data;
    } catch (err) {
      alert(err.response?.data?.message || "Order failed");
    }
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, placeOrder }}>
      {children}
    </CartContext.Provider>
  );
};