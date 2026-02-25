import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    customerName: { type: String },
    customerEmail: { type: String },
    customerPhone: { type: String },
    deliveryAddress: { type: String },
    items: [
      {
        name: String,
        price: Number,
        quantity: Number,
      },
    ],
    totalAmount: { type: Number, default: 0 },
    paymentMethod: { type: String, enum: ["COD", "Online"], default: "COD" },
    status: { type: String, enum: ["Pending", "Preparing", "Ready", "Delivered"], default: "Pending" },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
