function MenuCard({ item, addToCart }) {
  return (
    <div className="bg-gray-800 text-white p-4 rounded-lg shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold">{item.name}</h3>
      <p className="text-gray-300">₹{item.price}</p>
      <button
        onClick={() => addToCart(item)}
        className="mt-2 bg-yellow-500 text-black px-4 py-1 rounded hover:bg-yellow-400"
      >
        Add to Cart
      </button>
    </div>
  );
}

export default MenuCard;
