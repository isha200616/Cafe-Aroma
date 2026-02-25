import { useState } from "react";
import axios from "axios";

function Admin() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    axios.post("http://localhost:5002/api/menu", { name, price })
      .then(() => alert("Item added"));
  };

  return (
    <div className="page">
      <h1>Admin Panel</h1>
      <input placeholder="Item name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <button onClick={addItem}>Add Item</button>
    </div>
  );
}

export default Admin;
