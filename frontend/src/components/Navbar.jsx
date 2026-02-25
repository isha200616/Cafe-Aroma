import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-zinc-900 text-white p-4 flex justify-between items-center">
      <h2 className="text-2xl font-bold">☕ Cafe</h2>
      
      <button 
        className="md:hidden text-white text-2xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      <div className={`${isOpen ? "block" : "hidden"} md:flex gap-6 absolute md:relative top-16 md:top-0 left-0 md:left-0 w-full md:w-auto bg-zinc-900 md:bg-transparent p-4 md:p-0`}>
        <Link to="/" className="block md:inline hover:text-amber-500 transition">Home</Link>
        <Link to="/menu" className="block md:inline hover:text-amber-500 transition">Menu</Link>
        <a href="#about" className="block md:inline hover:text-amber-500 transition">About Us</a>
        <a href="#contact" className="block md:inline hover:text-amber-500 transition">Contact Us</a>
        <Link to="/login" className="block md:inline hover:text-amber-500 transition">Login/Sign Up</Link>
        <Link to="/cart" className="block md:inline hover:text-amber-500 transition">Cart</Link>
      </div>
    </nav>
  );
}

export default Navbar;
