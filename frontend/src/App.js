import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

// --- COMPONENTS ---
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// --- PAGES (PUBLIC) ---
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminLogin from "./pages/AdminLogin";

// --- PAGES (USER) ---
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import Orders from "./pages/Orders";       // ✅ Handles both Orders & Bookings now
import TableBooking from "./pages/TableBooking"; // ✅ The Booking Form

// --- PAGES (ADMIN) ---
import AdminDashboard from "./pages/AdminDashboard";
import AdminMenuManagement from "./pages/AdminMenuManagement";
import AdminOrders from "./pages/AdminOrders";
import AdminBookings from "./pages/AdminBookings"; // ✅ Admin Booking View

// --- CONTEXT ---
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          {/* ✅ Notification Popup System */}
          <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
          
          <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
            <Navbar />
            
            <div className="flex-grow pt-16">
              <Routes>
                {/* ================= PUBLIC ROUTES ================= */}
                <Route path="/" element={<Home />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin-login" element={<AdminLogin />} />

                {/* ================= USER ROUTES (Protected) ================= */}
                <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                
                {/* ✅ Combined User History Page */}
                <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                
                {/* ✅ Redirect old /my-bookings link to Orders page (Smart Fix) */}
                <Route path="/my-bookings" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
                
                {/* ✅ Booking Form */}
                <Route path="/book-table" element={<ProtectedRoute><TableBooking /></ProtectedRoute>} />

                {/* ================= ADMIN ROUTES (Protected) ================= */}
                <Route path="/admin-dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin-menu" element={<ProtectedRoute adminOnly={true}><AdminMenuManagement /></ProtectedRoute>} />
                <Route path="/admin-orders" element={<ProtectedRoute adminOnly={true}><AdminOrders /></ProtectedRoute>} />
                
                {/* ✅ Admin Reservations View */}
                <Route path="/admin-bookings" element={<ProtectedRoute adminOnly={true}><AdminBookings /></ProtectedRoute>} />
              </Routes>
            </div>
            
            <Footer />
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;