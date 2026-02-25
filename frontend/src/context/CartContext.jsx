import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    const exist = cart.find((i) => i._id === item._id);

    if (exist) {
      setCart(
        cart.map((i) =>
          i._id === item._id ? { ...i, qty: i.qty + 1 } : i
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(cart.map(i =>
      i._id === id ? { ...i, qty: i.qty + 1 } : i
    ));
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map(i =>
          i._id === id ? { ...i, qty: i.qty - 1 } : i
        )
        .filter(i => i.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(i => i._id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, increaseQty, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
