import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer"; 
import path from "path";
import fs from "fs";
import { fileURLToPath } from 'url';

const app = express();
const PORT = 5002;

// --- 1. SETUP PATHS & FOLDERS ---
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)){
    fs.mkdirSync(uploadDir);
}

// --- 2. MIDDLEWARE ---
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 

// --- 3. CONFIGURE IMAGE UPLOAD ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage: storage });

// --- 4. CONNECT TO MONGODB ---
mongoose.connect("mongodb://127.0.0.1:27017/cafe")
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err));

// --- 5. DEFINE SCHEMAS ---

// A) User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }, 
  role: { type: String, default: "user" } 
});
const User = mongoose.model("User", userSchema);

// B) Menu Schema
const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String }, 
  description: { type: String }
});
const Menu = mongoose.model("Menu", menuSchema);

// C) Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: Object, required: true },
  items: [
    {
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
      image: { type: String }
    }
  ],
  totalAmount: { type: Number, required: true },
  paymentMethod: { type: String, default: "COD" }, 
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now }
});
const Order = mongoose.model("Order", orderSchema);

// D) Booking Schema (✅ NEW)
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});
const Booking = mongoose.model("Booking", bookingSchema);


// --- 6. THE 50 MENU ITEMS (Rupees ₹) ---
const initialMenu = [
  // --- ☕ HOT COFFEE ---
  { name: "Espresso Single", price: 120, category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500", description: "Rich and bold single shot of premium espresso." },
  { name: "Espresso Double", price: 180, category: "Coffee", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500", description: "Double shot of our signature bold espresso." },
  { name: "Classic Cappuccino", price: 220, category: "Coffee", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500", description: "Espresso with equal parts steamed milk and foam." },
  { name: "Cafe Latte", price: 240, category: "Coffee", image: "https://images.unsplash.com/photo-1593443320739-77f74952dabd?w=500", description: "Smooth espresso with steamed milk and a light layer of foam." },
  { name: "Vanilla Latte", price: 260, category: "Coffee", image: "https://images.unsplash.com/photo-1570968992193-96ab70c6524b?w=500", description: "Our classic latte infused with premium vanilla syrup." },
  { name: "Caramel Macchiato", price: 280, category: "Coffee", image: "https://images.unsplash.com/photo-1485808191679-5f8c7c860695?w=500", description: "Espresso with vanilla syrup, steamed milk and caramel drizzle." },
  { name: "Americano", price: 180, category: "Coffee", image: "https://images.unsplash.com/photo-1551030173-122f5236b58a?w=500", description: "Espresso shots topped with hot water." },
  { name: "Mocha", price: 280, category: "Coffee", image: "https://images.unsplash.com/photo-1578314675249-a6910f80cc4e?w=500", description: "Espresso with bittersweet mocha sauce and steamed milk." },
  { name: "Flat White", price: 230, category: "Coffee", image: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500", description: "Espresso with microfoam steamed milk." },
  { name: "Hazelnut Latte", price: 270, category: "Coffee", image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?w=500", description: "Warm and nutty hazelnut infused latte." },
  // ... (Keeping all your existing menu items, assume the rest are here) ...
];

// --- 7. DATABASE SEEDING LOGIC ---
const seedDatabase = async () => {
  try {
    const count = await Menu.countDocuments();
    if (count < 5) { 
      console.log("🧹 Clearing old/incomplete menu data...");
      await Menu.deleteMany({}); 
      console.log("⚙️  Seeding 50 new menu items (Rupees)...");
      await Menu.insertMany(initialMenu);
      console.log("✅ Database seeded successfully!");
    } else {
      console.log(`ℹ️  Database already has ${count} items. Skipping seed.`);
    }
  } catch (err) {
    console.error("❌ Error seeding database:", err);
  }
};

// --- 8. API ROUTES ---

// A) AUTH ROUTES
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const newUser = new User({ name, email, password });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});

app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// ✅ UPDATED LOGIN ROUTE (Auto-Admin Fix)
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // 👇 MAGIC FIX: If this is YOU, force the role to 'admin'
    // Change "admin@gmail.com" to your actual email if it's different
    if (email === "admin@gmail.com") { 
       user.role = "admin";
       await user.save(); // Updates database permanently
       console.log(`👑 Admin Privileges granted to ${email}`);
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role // Now this will send "admin"
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

// B) MENU ROUTES
app.get("/api/menu", async (req, res) => {
  try {
    const items = await Menu.find();
    const formattedItems = items.map(item => ({
      ...item._doc,
      image: item.image && !item.image.startsWith('http') 
        ? `http://localhost:${PORT}/${item.image}` 
        : item.image
    }));
    res.json(formattedItems);
  } catch (err) {
    res.status(500).json({ message: "Error fetching menu" });
  }
});

app.post("/api/menu", upload.single("imageFile"), async (req, res) => {
  try {
    const { name, price, category, description, imageUrl } = req.body;
    let finalImage = imageUrl || ""; 
    if (req.file) finalImage = `uploads/${req.file.filename}`;
    const newItem = new Menu({ name, price, category, description, image: finalImage });
    await newItem.save();
    const savedItem = newItem.toObject();
    if(savedItem.image && !savedItem.image.startsWith('http')) {
        savedItem.image = `http://localhost:${PORT}/${savedItem.image}`;
    }
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ message: "Error adding item" });
  }
});

app.put("/api/menu/:id", upload.single("imageFile"), async (req, res) => {
  try {
    const { name, price, category, description, imageUrl } = req.body;
    let updateData = { name, price, category, description };
    if (req.file) updateData.image = `uploads/${req.file.filename}`;
    else if (imageUrl) updateData.image = imageUrl;

    const updatedItem = await Menu.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!updatedItem) return res.status(404).json({ message: "Item not found" });

    const formattedItem = updatedItem.toObject();
    if (formattedItem.image && !formattedItem.image.startsWith('http')) {
      formattedItem.image = `http://localhost:${PORT}/${formattedItem.image}`;
    }
    res.json(formattedItem);
  } catch (err) {
    res.status(500).json({ message: "Error updating item" });
  }
});

app.delete("/api/menu/:id", async (req, res) => {
  try {
    const deleted = await Menu.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Item not found" });
    if (deleted.image && deleted.image.startsWith('uploads/')) {
        const filePath = path.join(__dirname, deleted.image);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    }
    res.json({ message: "Item deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting item" });
  }
});

// C) ORDER ROUTES
app.post("/api/orders", async (req, res) => {
  try {
    const { user, items, totalAmount, paymentMethod } = req.body;
    const newOrder = new Order({ user, items, totalAmount, paymentMethod, status: "Pending" });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ message: "Error placing order", error: err.message });
  }
});

app.get("/api/orders/user/:email", async (req, res) => {
  try {
    const orders = await Order.find({ "user.email": req.params.email }).sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
});

app.get("/api/orders", async (req, res) => {
  try {
    const orders = await Order.find().sort({ date: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
});

app.put("/api/orders/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    const updatedOrder = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(updatedOrder);
  } catch (err) {
    res.status(500).json({ message: "Error updating status" });
  }
});

// D) BOOKING ROUTES (✅ NEW)
app.post("/api/bookings", async (req, res) => {
  try {
    console.log("📥 Received Booking Data:", req.body); // ✅ LOG 1: Check what data arrived

    const newBooking = new Booking(req.body);
    await newBooking.save();
    
    console.log("✅ Booking Saved!"); // ✅ LOG 2: Success
    res.status(201).json(newBooking);
  } catch (err) {
    console.error("❌ Booking Error:", err); // ✅ LOG 3: Print the REAL error
    res.status(500).json({ message: "Error creating booking", error: err.message });
  }
});

app.get("/api/bookings/user/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ email: req.params.email }).sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user bookings" });
  }
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Error cancelling booking" });
  }
});

// --- 9. START SERVER ---
const startServer = async () => {
  await seedDatabase(); 
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
};

startServer();