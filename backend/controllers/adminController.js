import Order from "../models/Order.js";

// Get all orders for admin
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// Update order status
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json({ message: "Status updated", order });
  } catch (err) {
    res.status(500).json({ message: "Failed to update status" });
  }
};

// Analytics summary
export const getAnalytics = async (req, res) => {
  try {
    const total = await Order.countDocuments();
    const delivered = await Order.countDocuments({ status: "Delivered" });
    const pending = await Order.countDocuments({ status: "Pending" });
    const revenueAgg = await Order.aggregate([
      { $unwind: "$items" },
      { $group: { _id: null, total: { $sum: "$items.price" } } },
    ]);
    const revenue = revenueAgg[0]?.total || 0;

    res.json({ total, delivered, pending, revenue });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch analytics" });
  }
};
