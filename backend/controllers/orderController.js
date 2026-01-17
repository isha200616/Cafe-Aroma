import Order from "../models/Order.js";

export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    const order = await Order.create({
      user: req.user._id,
      items,
      paymentMethod,
      status: "Pending",
    });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};
