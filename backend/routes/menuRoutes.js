const express = require("express");
const Menu = require("../models/Menu");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// GET all menu items
router.get("/", async (req, res) => {
  const items = await Menu.find();
  res.json(items);
});

// ADD new menu item (admin only)
router.post("/", adminMiddleware, async (req, res) => {
  const { name, price } = req.body;
  const item = new Menu({ name, price });
  await item.save();
  res.json(item);
});

// UPDATE menu item (admin only)
router.put("/:id", adminMiddleware, async (req, res) => {
  const item = await Menu.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(item);
});

// DELETE menu item (admin only)
router.delete("/:id", adminMiddleware, async (req, res) => {
  await Menu.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
});

module.exports = router;
