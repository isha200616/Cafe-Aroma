import express from "express";
import Order from "../models/Order.js";

const router = express.Router();

// POST order
router.post("/", async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: "Order saved!", order });
  } catch (err) {
    res.status(500).json({ error: "Order failed", details: err.message });
  }
});

// GET all orders (admin only)
router.get("/", async (req, res) => {
  try {
    const orders = await Order.find().populate("user").sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders", details: err.message });
  }
});

// GET user's orders
router.get("/my-orders", async (req, res) => {
  try {
    const userId = req.headers.userid;
    const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch orders", details: err.message });
  }
});

// GET single order
router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user");
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order", details: err.message });
  }
});

// UPDATE order status (admin only)
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).populate("user");
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: "Failed to update order", details: err.message });
  }
});

// DELETE order (admin only)
router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: "Order deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete order", details: err.message });
  }
});

export default router;
