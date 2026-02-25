import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTrash, FaPlus, FaArrowLeft, FaEdit, FaSave, FaTimes, FaCloudUploadAlt, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import API_BASE_URL from "../config";

const AdminMenuManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  
  // State for form fields
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Coffee");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState(""); 
  const [imageFile, setImageFile] = useState(null); 

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/menu`);
      if (!res.ok) throw new Error("Failed to load menu");
      const data = await res.json();
      setItems(data);
    } catch (error) {
      console.error("Error loading menu:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item._id);
    setName(item.name);
    setPrice(item.price);
    setCategory(item.category);
    setDescription(item.description || "");
    setImageUrl(item.image || ""); 
    setImageFile(null); 
    // Scroll to form on mobile
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setName(""); setPrice(""); setCategory("Coffee"); setDescription(""); setImageUrl(""); setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    
    if (imageUrl) formData.append("imageUrl", imageUrl);
    if (imageFile) formData.append("imageFile", imageFile);

    const url = editingId 
      ? `${API_BASE_URL}/menu/${editingId}`
      : `${API_BASE_URL}/menu`;

    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method: method,
        body: formData, 
      });

      if (res.ok) {
        const resultItem = await res.json();
        
        if (editingId) {
          setItems(items.map(i => i._id === editingId ? resultItem : i));
          alert("Item updated successfully!");
          handleCancelEdit();
        } else {
          setItems([...items, resultItem]);
          alert("Item added successfully!");
          setName(""); setPrice(""); setCategory("Coffee"); setDescription(""); setImageUrl(""); setImageFile(null);
        }
      } else {
        alert("Failed to save item");
      }
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await fetch(`${API_BASE_URL}/menu/${id}`, { method: "DELETE" });
      setItems(items.filter((item) => item._id !== id));
      if (editingId === id) handleCancelEdit();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      
      {/* Header with better mobile padding */}
      <div className="p-4 md:p-8 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-20 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link to="/admin-dashboard" className="text-amber-600 hover:text-amber-700 text-xl p-2 -ml-2">
            <FaArrowLeft />
          </Link>
          <h1 className="text-2xl md:text-3xl font-bold text-amber-600 dark:text-amber-400 truncate">
            Menu Manager
          </h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* --- FORM SECTION (Responsive Sticky) --- */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="lg:col-span-1 bg-white dark:bg-gray-800 p-5 md:p-6 rounded-2xl shadow-lg h-fit lg:sticky lg:top-24 border border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-xl font-bold mb-5 flex items-center gap-2 border-b border-gray-100 dark:border-gray-700 pb-3">
              {editingId ? <><FaEdit className="text-blue-500" /> Edit Item</> : <><FaPlus className="text-amber-500" /> Add Item</>}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Item Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 outline-none transition-all"
                  placeholder="e.g. Masala Chai" 
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Price (₹)</label>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-gray-500"><FaRupeeSign size={12}/></span>
                    <input 
                      type="number" 
                      value={price} 
                      onChange={e => setPrice(e.target.value)} 
                      required 
                      className="w-full p-3 pl-8 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 outline-none"
                      placeholder="150" 
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Category</label>
                  <select 
                    value={category} 
                    onChange={e => setCategory(e.target.value)} 
                    className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 outline-none appearance-none"
                  >
                    <option>Coffee</option><option>Cold Coffee</option><option>Bakery</option><option>Food</option><option>Dessert</option><option>Tea</option><option>Smoothies</option><option>Drinks</option>
                  </select>
                </div>
              </div>

              {/* Image Input */}
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 hover:border-amber-400 transition-colors">
                <p className="text-xs font-bold mb-3 text-gray-500 uppercase tracking-wide">Image Source</p>
                
                <div className="mb-3">
                  <input 
                    type="text" 
                    value={imageUrl} 
                    onChange={e => { setImageUrl(e.target.value); setImageFile(null); }} 
                    placeholder="Paste Image URL..." 
                    className="w-full p-2 text-sm rounded bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:outline-none" 
                  />
                </div>
                
                <div className="text-center text-gray-400 text-xs my-2 font-medium">OR</div>

                <label className="flex items-center justify-center gap-2 cursor-pointer bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 p-3 rounded-lg text-sm transition-all text-gray-700 dark:text-gray-200">
                  <FaCloudUploadAlt size={16} /> 
                  <span className="truncate max-w-[150px]">{imageFile ? imageFile.name : "Upload File"}</span>
                  <input type="file" accept="image/*" onChange={e => { setImageFile(e.target.files[0]); setImageUrl(""); }} className="hidden" />
                </label>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Description</label>
                <textarea 
                  value={description} 
                  onChange={e => setDescription(e.target.value)} 
                  rows="2" 
                  className="w-full p-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:ring-2 focus:ring-amber-500 outline-none"
                  placeholder="Short description..."
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  className={`flex-1 font-bold py-3.5 rounded-xl shadow-lg text-white flex justify-center items-center gap-2 transition-transform active:scale-95 ${editingId ? "bg-blue-600 hover:bg-blue-700" : "bg-amber-600 hover:bg-amber-700"}`}
                >
                  {editingId ? <><FaSave /> Update</> : <><FaPlus /> Add Item</>}
                </button>
                {editingId && (
                  <button type="button" onClick={handleCancelEdit} className="px-5 bg-gray-500 hover:bg-gray-600 text-white rounded-xl transition-transform active:scale-95">
                    <FaTimes />
                  </button>
                )}
              </div>
            </form>
          </motion.div>

          {/* --- LIST SECTION --- */}
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Menu Items</h2>
              <span className="text-sm bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded-md">{items.length} items</span>
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-amber-600 mb-4"></div>
                <p>Loading menu...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {items.length === 0 ? (
                  <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-xl border border-dashed border-gray-300 dark:border-gray-700">
                    <p className="text-gray-500">No items found. Use the form to add one!</p>
                  </div>
                ) : (
                  items.map((item) => (
                    <motion.div 
                      key={item._id} 
                      layout 
                      initial={{ opacity: 0, y: 10 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className={`flex flex-row items-center gap-3 md:gap-5 bg-white dark:bg-gray-800 p-3 md:p-4 rounded-xl shadow-sm border transition-all ${editingId === item._id ? "border-blue-500 ring-1 ring-blue-500 bg-blue-50 dark:bg-blue-900/20" : "border-gray-200 dark:border-gray-700 hover:shadow-md"}`}
                    >
                      {/* Image */}
                      <div className="flex-shrink-0">
                        <img 
                          src={item.image || "https://via.placeholder.com/150"} 
                          alt={item.name} 
                          className="w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg bg-gray-100" 
                        />
                      </div>
                      
                      {/* Text Info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-base md:text-lg truncate text-gray-900 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-0.5">
                          {item.category}
                        </p>
                        <p className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                          <FaRupeeSign size={12}/> {item.price}
                        </p>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button 
                          onClick={() => handleEditClick(item)} 
                          className="p-2.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-100 transition-colors"
                          title="Edit"
                        >
                          <FaEdit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDelete(item._id)} 
                          className="p-2.5 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-100 transition-colors"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminMenuManagement;