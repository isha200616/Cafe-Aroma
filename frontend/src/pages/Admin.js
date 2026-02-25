export default function Admin() {
  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <p className="text-gray-400">
        Welcome Admin 👑
      </p>

      <button
        onClick={() => {
          localStorage.removeItem("admin");
          window.location.href = "/admin-login";
        }}
        className="mt-6 bg-red-500 px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
