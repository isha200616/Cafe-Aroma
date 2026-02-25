import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the hook
import { FaUserShield, FaLock } from "react-icons/fa";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // Get the login function

  const handleLogin = (e) => {
    e.preventDefault();

    // HARDCODED CHECK (Replace this with your real API call later)
    // currently checking if email is "admin@gmail.com" and password "admin123"
    if (email === "admin@gmail.com" && password === "admin123") {
      
      // THIS IS THE FIX: We explicitly create an admin user object
      const adminUser = {
        name: "Administrator",
        email: email,
        role: "admin", // <--- CRITICAL: This allows you to pass ProtectedRoute
        token: "dummy-admin-token"
      };

      login(adminUser); // Save to context
      navigate("/admin-dashboard"); // Go to dashboard
    } else {
      setError("Invalid Admin Credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96 border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-6 text-red-500">
          <FaUserShield className="inline-block mr-2" /> Admin Panel
        </h2>
        
        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4 text-sm text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-gray-400 mb-1">Admin Email</label>
            <input
              type="email"
              className="w-full p-2 rounded bg-gray-700 border border-gray-600 focus:border-red-500 outline-none text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@gmail.com"
            />
          </div>
          <div>
            <label className="block text-gray-400 mb-1">Password</label>
            <div className="flex items-center bg-gray-700 rounded border border-gray-600 focus-within:border-red-500">
              <FaLock className="ml-3 text-gray-400" />
              <input
                type="password"
                className="w-full p-2 bg-transparent outline-none text-white"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="admin123"
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded transition"
          >
            Access Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;