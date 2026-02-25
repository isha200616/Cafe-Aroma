import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

function Menu() {
  const [menu, setMenu] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    axios.get("http://localhost:5002/api/menu")
      .then(res => setMenu(res.data));
  }, []);

  return (
    <div className="page">
      <h1>Menu</h1>
      {menu.map(item => (
        <div className="card" key={item._id}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
          <button onClick={() => addToCart(item)}>Add</button>
        </div>
      ))}
    </div>
  );
}

export default Menu;
