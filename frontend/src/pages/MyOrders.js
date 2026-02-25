import { useEffect, useState } from "react";
import axios from "axios";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/api/orders/user")
      .then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="min-h-screen bg-black text-white px-6 py-16">
      <h2 className="text-4xl font-bold text-center mb-10">
        My Orders 📦
      </h2>

      <div className="max-w-4xl mx-auto space-y-6">
        {orders.map((o) => (
          <div key={o._id} className="bg-zinc-900 p-6 rounded-xl">
            <p>Order ID: {o._id}</p>
            <p>Status: {o.status}</p>
            <p className="text-amber-400">
              ₹{o.totalAmount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
