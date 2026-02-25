import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getAllOrders,
  updateOrderStatus,
  getAnalytics,
} from "../controllers/adminController.js";

const router = express.Router();

// All admin endpoints are protected + admin-only
router.get("/orders", protect, adminOnly, getAllOrders);
router.put("/orders/:id", protect, adminOnly, updateOrderStatus);
router.get("/analytics", protect, adminOnly, getAnalytics);

export default router;
